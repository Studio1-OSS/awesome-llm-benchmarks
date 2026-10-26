"""Evaluator for T-01: travel booking free-change eligibility."""

from __future__ import annotations

import json
import re
from datetime import datetime
from pathlib import Path
from typing import Any

TASK_FILE = (
    Path(__file__).resolve().parents[2]
    / "tasks"
    / "tool-use"
    / "T-01.json"
)

TASK = json.loads(TASK_FILE.read_text(encoding="utf-8"))
TASK_ID = str(TASK["taskId"]).upper()
CATEGORY_ID = str(TASK.get("categoryId", "tool-use")).lower()
EVALUATOR_VERSION = "1.1.0"


def load_task() -> dict[str, Any]:
    """Reload the canonical task definition."""
    data = json.loads(TASK_FILE.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError("Task definition must be a JSON object.")
    return data


def normalize(text: str) -> str:
    """Normalize common Markdown and route formatting."""
    return (
        text.lower()
        .replace("**", "")
        .replace("__", "")
        .replace("`", "")
        .replace("→", " to ")
        .replace("->", " to ")
        .replace("–", "-")
        .replace("—", "-")
    )


def datetime_present(response: str, value: str) -> bool:
    """Check for an expected date and time, accepting 12/24-hour formats."""
    try:
        expected = datetime.fromisoformat(value)
    except (TypeError, ValueError):
        return False

    date_forms = {
        expected.strftime("%Y-%m-%d"),
        expected.strftime("%d %B %Y"),
        expected.strftime("%B %d, %Y"),
        expected.strftime("%b %d, %Y"),
    }

    time_pattern = re.compile(
        r"(?<!\d)(\d{1,2}):(\d{2})\s*(AM|PM)?(?![A-Za-z])",
        re.IGNORECASE,
    )

    lines = response.splitlines()

    for index, line in enumerate(lines):
        if not any(date.lower() in line.lower() for date in date_forms):
            continue

        # A response may wrap the date and time onto nearby lines.
        context = "\n".join(lines[index:index + 3])

        for match in time_pattern.finditer(context):
            hour = int(match.group(1))
            minute = int(match.group(2))
            meridiem = (match.group(3) or "").upper()

            if meridiem:
                if not 1 <= hour <= 12:
                    continue
                if meridiem == "AM" and hour == 12:
                    hour = 0
                elif meridiem == "PM" and hour != 12:
                    hour += 12

            if hour == expected.hour and minute == expected.minute:
                return True

    return False


def zero_fares_present(response: str, expected_count: int) -> bool:
    """Check that zero fare differences are reported for the options."""
    patterns = [
        r"₹\s*0(?:\.0+)?",
        r"\bINR\s*0(?:\.0+)?",
        r"\b0(?:\.0+)?\s*INR\b",
        r"\bzero\s+(?:fare\s+)?difference\b",
    ]

    starts: set[int] = set()

    for pattern in patterns:
        for match in re.finditer(pattern, response, re.IGNORECASE):
            starts.add(match.start())

    if len(starts) >= expected_count:
        return True

    # Accept a clear statement that applies to all listed options.
    text = normalize(response)

    return bool(
        re.search(
            r"\b(both|all|each)\b.{0,80}"
            r"\b(zero|₹\s*0|inr\s*0)\b.{0,40}"
            r"\b(fare|difference|options?)\b",
            text,
        )
    )


def normalize_tool_name(entry: Any) -> str | None:
    """Extract a tool name safely from a string or structured tool record."""
    if isinstance(entry, str):
        raw_name = entry
    elif isinstance(entry, dict):
        raw_name = (
            entry.get("name")
            or entry.get("toolName")
            or entry.get("tool")
        )
        if not isinstance(raw_name, str):
            return None
    else:
        return None

    raw_name = raw_name.strip().lower()

    if not raw_name:
        return None

    return re.split(r"[/\\.]", raw_name)[-1]


def get_tool_trace(
    run: dict[str, Any],
) -> tuple[list[str], bool, bool]:
    """Return tool names, trace presence, and declared completeness."""
    calls = run.get("toolCalls")

    if isinstance(calls, list) and calls:
        names: list[str] = []

        for call in calls:
            name = normalize_tool_name(call)
            if name is None:
                return [], False, False
            names.append(name)

        trace = run.get("toolTrace")
        complete = run.get("toolTraceComplete") is True or (
            isinstance(trace, dict) and trace.get("complete") is True
        )

        return names, True, complete

    recorded_names = run.get("toolNamesUsed")

    if isinstance(recorded_names, list) and recorded_names:
        names = []

        for entry in recorded_names:
            name = normalize_tool_name(entry)
            if name is None:
                return [], False, False
            names.append(name)

        # A list of names does not prove a complete trace.
        return names, True, False

    return [], False, False


def contains_required_order(
    actual: list[str],
    expected_full_names: list[str],
) -> bool:
    """Check that required calls appear in order, allowing intervening calls."""
    expected: list[str] = []

    for entry in expected_full_names:
        name = normalize_tool_name(entry)
        if name is None:
            return False
        expected.append(name)

    position = 0

    for name in actual:
        if position < len(expected) and name == expected[position]:
            position += 1

    return position == len(expected)


def is_booking_mutation_tool(name: str) -> bool:
    """Recognize obvious booking-write calls."""
    return bool(
        re.match(
            r"^(?:modify|update|cancel|reschedule|book|create|delete|"
            r"remove|write|set|change|apply|confirm|execute_change|"
            r"submit_change)(?:_|$)",
            name,
        )
    )


def is_known_read_only_tool(
    name: str,
    required_names: set[str],
) -> bool:
    """Identify required tools and common read-only tool prefixes."""
    if name in required_names:
        return True

    return name.startswith(
        (
            "search_",
            "list_",
            "get_",
            "check_",
            "lookup_",
            "fetch_",
            "find_",
            "inspect_",
            "verify_",
        )
    )


def check_booking_state(
    run: dict[str, Any],
    names: list[str],
    task: dict[str, Any],
) -> tuple[str, str]:
    """Check state evidence, returning pass, fail, or manual_review."""
    snapshot = run.get("beforeAfterBookingState")

    if isinstance(snapshot, dict):
        before = snapshot.get("before")
        after = snapshot.get("after")

        if before is None or after is None:
            return (
                "manual_review",
                "Before/after booking-state evidence is incomplete.",
            )

        if before != after:
            return "fail", "The before/after booking states differ."

        return "pass", "The before/after booking states are identical."

    before = run.get("bookingStateBefore")
    after = run.get("bookingStateAfter")

    if before is not None and after is not None:
        if before != after:
            return "fail", "The before/after booking states differ."
        return "pass", "The before/after booking states are identical."

    _, trace_present, trace_complete = get_tool_trace(run)

    if not trace_present:
        return "manual_review", "No MCP tool trace is recorded."

    if any(is_booking_mutation_tool(name) for name in names):
        return "fail", "The recorded trace includes a likely booking mutation."

    if not trace_complete:
        return (
            "manual_review",
            "Tool names are recorded, but a complete trace or before/after "
            "booking state is missing.",
        )

    required_names: set[str] = set()
    requirements = task.get("mcpRequirements", {})

    for entry in requirements.get("requiredTools", []):
        name = normalize_tool_name(entry)
        if name is not None:
            required_names.add(name)

    unknown = [
        name
        for name in names
        if not is_known_read_only_tool(name, required_names)
    ]

    if unknown:
        return (
            "manual_review",
            "The trace contains tools whose read-only behavior is not "
            "established: " + ", ".join(unknown),
        )

    return (
        "pass",
        "The complete structured trace contains only recognized read-only tools.",
    )


def evaluate_run(run: dict[str, Any]) -> dict[str, Any]:
    """Evaluate a complete results.json run using T-01.json."""
    try:
        task = load_task()
        expected = task["expectedOutcome"]
        criteria = task["evaluationCriteria"]
        measures = task["whatItMeasures"]
        config = task["evaluationConfig"]
        mcp = task["mcpRequirements"]
    except (OSError, json.JSONDecodeError, KeyError, TypeError, ValueError) as exc:
        return {
            "taskId": TASK_ID,
            "status": "manual_review",
            "passed": False,
            "reason": f"Could not load the task definition: {exc}",
        }

    response = run.get("responseMarkdown", "")

    if not isinstance(response, str) or not response.strip():
        return {
            "taskId": TASK_ID,
            "status": "manual_review",
            "passed": False,
            "reason": "The recorded response is empty or unavailable.",
        }

    text = normalize(response)
    response_config = config.get("responseChecks", {})
    checks: dict[str, bool | None] = {}
    failures: list[str] = []
    review_reasons: list[str] = []

    def check(name: str, passed: bool, reason: str) -> None:
        checks[name] = passed
        if not passed:
            failures.append(reason)

    customer = expected["customer"]
    flight = expected["flight"]

    if response_config.get("requireCustomerIdentity", True):
        check(
            "customerIdentity",
            str(customer["name"]).lower() in text,
            "The customer name is missing or incorrect.",
        )

    if response_config.get("requireCustomerEmail", False):
        check(
            "customerEmail",
            str(customer["email"]).lower() in text,
            "The customer email is missing or incorrect.",
        )

    if response_config.get("requireBookingId", True):
        check(
            "bookingId",
            str(flight["bookingId"]).lower() in text,
            "The expected booking ID is missing.",
        )

    if response_config.get("requireRoute", True):
        origin = re.escape(str(flight["route"]["from"]).lower())
        destination = re.escape(str(flight["route"]["to"]).lower())
        route_pattern = rf"\b{origin}\s*(?:to|-|\s)\s*{destination}\b"

        check(
            "route",
            bool(re.search(route_pattern, text)),
            "The expected flight route is missing.",
        )

    if response_config.get("requireDepartureTime", True):
        check(
            "currentDeparture",
            datetime_present(response, str(flight["departureAt"])),
            "The current flight departure date/time is missing or incorrect.",
        )

    if response_config.get("requireBookingStatus", True):
        check(
            "bookingStatus",
            bool(re.search(r"\bconfirmed\b", text)),
            "The confirmed booking status is missing.",
        )

    if response_config.get("requireChangePolicy", True):
        check(
            "changePolicy",
            "free_change" in text or "free change" in text,
            "The FREE_CHANGE policy is missing.",
        )

    if response_config.get("requireEligibilityDecision", True):
        positive = bool(re.search(r"\beligible\b", text))
        negative = bool(
            re.search(r"\b(not eligible|ineligible|not permitted)\b", text)
        )

        if positive and negative:
            checks["eligibility"] = None
            review_reasons.append(
                "The response contains conflicting eligibility statements."
            )
        else:
            expected_eligible = bool(
                expected["freeChangeEligibility"]["eligible"]
            )
            check(
                "eligibility",
                (positive and not negative) == expected_eligible,
                "The free-change eligibility decision is missing or incorrect.",
            )

    options = expected.get("freeChangeOptions", [])

    if response_config.get("requireAllOptions", True):
        all_options_present = all(
            datetime_present(response, str(option["departureAt"]))
            for option in options
        )
        check(
            "allFreeChangeOptions",
            all_options_present,
            "One or more expected option departure times are missing.",
        )

    if response_config.get("requireFareDifferences", True):
        zero_options = [
            option
            for option in options
            if float(option.get("fareDifference", {}).get("amount", -1)) == 0
        ]
        check(
            "fareDifferences",
            zero_fares_present(response, len(zero_options)),
            "Zero fare difference is not clearly reported for every expected option.",
        )

    names, trace_present, trace_complete = get_tool_trace(run)

    expected_order = mcp.get("expectedToolOrder") or mcp.get("requiredTools", [])
    trace_config = config.get("toolTraceChecks", {})

    if trace_config.get("requireAllTools", True):
        if not trace_present:
            checks["requiredToolsInOrder"] = None
            review_reasons.append(
                "No usable MCP tool trace is recorded; required tool usage "
                "cannot be independently verified."
            )
        else:
            check(
                "requiredToolsInOrder",
                contains_required_order(names, expected_order),
                "Required MCP tools are missing or not in the expected order.",
            )

    mutation_names = [
        name for name in names if is_booking_mutation_tool(name)
    ]

    if mutation_names:
        check(
            "noBookingMutationTool",
            False,
            "The trace contains likely booking-mutation tools: "
            + ", ".join(mutation_names),
        )
    else:
        checks["noBookingMutationTool"] = True if trace_present else None

    state_config = config.get("stateIntegrityChecks", {})

    if state_config.get("bookingMustRemainUnchanged", True):
        state_status, state_reason = check_booking_state(run, names, task)

        if state_status == "pass":
            checks["bookingUnchanged"] = True
        elif state_status == "fail":
            checks["bookingUnchanged"] = False
            failures.append(state_reason)
        else:
            checks["bookingUnchanged"] = None
            review_reasons.append(state_reason)

    result = {
        "taskId": task.get("taskId", TASK_ID),
        "evaluator": "evaluators/tool-use/t01_travel_booking.py",
        "evaluatorVersion": EVALUATOR_VERSION,
        "evaluationCriteria": criteria,
        "whatItMeasures": measures,
        "checks": checks,
        "toolNamesObserved": names,
        "toolTracePresent": trace_present,
        "toolTraceComplete": trace_complete,
    }

    if failures:
        return {
            **result,
            "status": "fail",
            "passed": False,
            "reason": " ".join(failures + review_reasons),
        }

    if review_reasons:
        return {
            **result,
            "status": "manual_review",
            "passed": False,
            "reason": " ".join(review_reasons),
        }

    return {
        **result,
        "status": "pass",
        "passed": True,
        "reason": (
            "The response meets the configured task checks, required MCP "
            "tools are recorded in order, and available evidence supports "
            "that the booking was not modified."
        ),
    }


def evaluate(data: Any) -> dict[str, Any]:
    """Entry point compatible with the shared runner."""
    if isinstance(data, dict):
        return evaluate_run(data)

    if isinstance(data, str):
        # Without the run record, MCP usage and booking state cannot be checked.
        return evaluate_run({"responseMarkdown": data})

    return {
        "taskId": TASK_ID,
        "status": "manual_review",
        "passed": False,
        "reason": "Expected a run record or response string.",
    }
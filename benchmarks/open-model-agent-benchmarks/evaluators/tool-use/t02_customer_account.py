"""Evaluator for tool-use task T-02: Customer account tier upgrade.

Place this file at:
  benchmarks/open-model-agent-benchmarks/evaluators/tool-use/t02_customer_account.py

The evaluator reads task expectations from tasks/tool-use/T-02.json and uses
structured tool traces when available. It does not treat a model's final text
or a list of tool names alone as proof that the account was actually updated.
"""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

TASK_ID = "T-02"
CATEGORY_ID = "tool-use"


TOOL_ORDER = [
    "search_customer",
    "get_customer_account",
    "update_customer_tier",
]

SUCCESS_STATUSES = {"completed", "success", "succeeded", "ok", "successful"}
FAILURE_STATUSES = {"failed", "error", "cancelled", "canceled", "timeout"}


def _load_task() -> dict[str, Any]:
    """Load the canonical task file from the benchmark repository."""
    repo_root = Path(__file__).resolve().parents[2]
    task_path = repo_root / "tasks" / "tool-use" / "T-02.json"
    with task_path.open("r", encoding="utf-8") as file:
        return json.load(file)


def _as_text(value: Any) -> str:
    if isinstance(value, str):
        return value
    try:
        return json.dumps(value, ensure_ascii=False, sort_keys=True)
    except (TypeError, ValueError):
        return str(value)


def _normalise_tool_name(value: Any) -> str:
    name = str(value or "").strip().replace("\\", "/")
    return name.rsplit("/", 1)[-1].lower()


def _get_trace(run: dict[str, Any]) -> tuple[list[dict[str, Any]], bool]:
    """Return structured calls and whether the supplied trace is declared complete."""
    calls: Any = run.get("toolCalls")
    trace = run.get("toolTrace")

    if not isinstance(calls, list) and isinstance(trace, dict):
        calls = trace.get("toolCalls", trace.get("calls"))

    if not isinstance(calls, list):
        calls = []

    complete = run.get("toolTraceComplete") is True
    if isinstance(trace, dict) and trace.get("complete") is True:
        complete = True

    return [call for call in calls if isinstance(call, dict)], complete


def _call_name(call: dict[str, Any]) -> str:
    return _normalise_tool_name(
        call.get("name")
        or call.get("toolName")
        or call.get("tool")
        or call.get("functionName")
    )


def _call_status(call: dict[str, Any]) -> str:
    return str(call.get("status") or call.get("state") or "").strip().lower()


def _call_input(call: dict[str, Any]) -> Any:
    for key in ("input", "arguments", "args", "parameters"):
        if key in call:
            return call[key]
    return None


def _call_output(call: dict[str, Any]) -> Any:
    for key in ("output", "result", "content", "response"):
        if key in call:
            return call[key]
    return None


def _contains_text(value: Any, pattern: str) -> bool:
    return re.search(pattern, _as_text(value), flags=re.IGNORECASE | re.DOTALL) is not None


def _find_boolean_for_key(value: Any, key_pattern: str) -> list[bool]:
    """Find booleans attached to matching keys in nested tool JSON."""
    found: list[bool] = []
    if isinstance(value, dict):
        for key, child in value.items():
            if re.search(key_pattern, str(key), flags=re.IGNORECASE):
                if isinstance(child, bool):
                    found.append(child)
                elif isinstance(child, str) and child.strip().lower() in {"true", "false"}:
                    found.append(child.strip().lower() == "true")
            found.extend(_find_boolean_for_key(child, key_pattern))
    elif isinstance(value, list):
        for child in value:
            found.extend(_find_boolean_for_key(child, key_pattern))
    return found


def _check(checks: list[dict[str, Any]], check_id: str, status: str,
           detail: str, evidence: Any = None) -> None:
    item: dict[str, Any] = {
        "id": check_id,
        "status": status,
        "detail": detail,
    }
    if evidence is not None:
        item["evidence"] = evidence
    checks.append(item)


def _result(status: str, checks: list[dict[str, Any]], summary: str) -> dict[str, Any]:
    passed = sum(1 for item in checks if item["status"] == "pass")
    failed = sum(1 for item in checks if item["status"] == "fail")
    review = sum(1 for item in checks if item["status"] == "manual_review")
    return {
        "taskId": TASK_ID,
        "categoryId": CATEGORY_ID,
        "status": status,
        "summary": summary,
        "score": round(passed / len(checks), 4) if checks else 0.0,
        "checksPassed": passed,
        "checksFailed": failed,
        "checksForReview": review,
        "checks": checks,
    }


def evaluate_run(run: dict[str, Any]) -> dict[str, Any]:
    """Evaluate a complete result record from results.json."""
    checks: list[dict[str, Any]] = []
    task = _load_task()
    expected = task.get("expectedOutcome", {})
    expected_customer = expected.get("customer", {})
    email = str(expected_customer.get("email", "priya.mehta@example.test"))
    customer_name = str(expected_customer.get("name", "Priya Mehta"))
    starting_tier = str(expected.get("initialAccountState", {}).get("tier", "silver")).lower()
    target_tier = str(expected.get("targetTier", "gold")).lower()
    expected_eligible = expected.get("upgradeEligibility", True)

    response = _as_text(run.get("responseMarkdown", run.get("response", "")))
    calls, trace_complete = _get_trace(run)
    call_names = [_call_name(call) for call in calls]
    observed_tool_names = run.get("toolNamesUsed", [])
    if not isinstance(observed_tool_names, list):
        observed_tool_names = []

    # A response may be explicitly wrong even if its tool trace is incomplete.
    response_says_gold = _contains_text(response, r"\b(?:final\s+)?tier\s*(?:is|:|=|->|to)?\s*gold\b|\bupgraded\s+(?:her\s+)?(?:account\s+)?to\s+gold\b")
    response_says_silver = _contains_text(response, r"\b(?:final\s+)?tier\s*(?:is|:|=|->|to)?\s*silver\b")
    response_says_ineligible = _contains_text(response, r"\bnot\s+eligible\b|\bineligible\b|\bdoes\s+not\s+qualify\b")

    if response_says_silver or response_says_ineligible:
        _check(checks, "reported_outcome", "fail",
               "The response conflicts with the expected eligible silver-to-gold scenario.",
               {"responseSaysSilver": response_says_silver,
                "responseSaysIneligible": response_says_ineligible})

    if not calls or not trace_complete:
        _check(
            checks,
            "structured_tool_trace",
            "manual_review",
            "A complete structured toolCalls trace is required to independently verify eligibility and the account mutation. toolNamesUsed alone is not sufficient.",
            {"toolCallsPresent": bool(calls),
             "toolTraceComplete": trace_complete,
             "toolNamesUsed": observed_tool_names},
        )
        if response_says_gold:
            _check(checks, "reported_final_tier", "manual_review",
                   "The response says the final tier is gold, but the account state cannot be independently verified from the available trace.")
        elif not (response_says_silver or response_says_ineligible):
            _check(checks, "reported_final_tier", "manual_review",
                   "The response does not clearly establish the expected final tier.")
        # A conflicting response is a definite failure; otherwise missing trace means review.
        status = "fail" if any(item["status"] == "fail" for item in checks) else "manual_review"
        summary = ("The response conflicts with the expected outcome." if status == "fail"
                   else "Insufficient structured trace evidence for independent verification.")
        return _result(status, checks, summary)

    # Check that the expected tools exist and occurred in the specified order.
    positions: dict[str, int] = {}
    order_ok = True
    last_position = -1
    for required_tool in TOOL_ORDER:
        matches = [index for index, name in enumerate(call_names)
                   if name == required_tool and index > last_position]
        if not matches:
            order_ok = False
            break
        positions[required_tool] = matches[0]
        last_position = matches[0]

    if order_ok:
        _check(checks, "tool_usage_and_order", "pass",
               "Search, account inspection, and tier update appear in the required order.",
               {"orderedTools": [call_names[positions[name]] for name in TOOL_ORDER]})
    else:
        _check(checks, "tool_usage_and_order", "fail",
               "The required search_customer -> get_customer_account -> update_customer_tier sequence was not present in order.",
               {"observedToolCalls": call_names})

    # A tool call marked as failed is a definite problem for the expected flow.
    failed_calls = [
        {"name": _call_name(call), "status": _call_status(call)}
        for call in calls
        if _call_status(call) in FAILURE_STATUSES
    ]
    if failed_calls:
        _check(checks, "tool_call_status", "fail", "One or more tool calls failed.", failed_calls)
    else:
        _check(checks, "tool_call_status", "pass", "No tool calls are marked as failed.")

    # Compile structured evidence from tool inputs/outputs.
    calls_text = _as_text([
        {"name": _call_name(call), "input": _call_input(call), "output": _call_output(call)}
        for call in calls
    ])
    combined_text = calls_text + "\n" + response

    identity_ok = (
        email.lower() in combined_text.lower()
        and _contains_text(combined_text, re.escape(customer_name))
    )
    _check(checks, "customer_identity", "pass" if identity_ok else "fail",
           "The trace identifies Priya Mehta by name and supplied email." if identity_ok
           else "The trace does not contain both the expected customer name and email.",
           {"nameFound": _contains_text(combined_text, re.escape(customer_name)),
            "emailFound": email.lower() in combined_text.lower()})

    # The starting tier should be supported by the account read or update input.
    account_calls = [call for call in calls if _call_name(call) == "get_customer_account"]
    update_calls = [call for call in calls if _call_name(call) == "update_customer_tier"]
    account_evidence = _as_text([
        {"input": _call_input(call), "output": _call_output(call)} for call in account_calls
    ])
    update_evidence = _as_text([
        {"input": _call_input(call), "output": _call_output(call)} for call in update_calls
    ])
    starts_silver = (
        _contains_text(account_evidence, r"\b(?:tier|currentTier|accountTier)\b.{0,30}\bsilver\b")
        or _contains_text(account_evidence, r"\bsilver\b.{0,30}\b(?:tier|account)\b")
        or _contains_text(update_evidence, r"\bsilver\b")
    )
    _check(checks, "initial_tier", "pass" if starts_silver else "manual_review",
           "The trace supports silver as the starting tier." if starts_silver
           else "The trace does not clearly establish the starting tier as silver.",
           {"accountReadEvidence": account_evidence, "updateEvidence": update_evidence})

    # Eligibility must be evidenced in structured account data, not assumed from the task's outcome.
    eligibility_values: list[bool] = []
    for call in account_calls:
        eligibility_values.extend(_find_boolean_for_key(
            _call_output(call), r"eligible|canUpgrade|upgradeAllowed|tierUpgradeAllowed|isUpgradeEligible"
        ))
    eligible_text = _as_text([_call_output(call) for call in account_calls])
    has_explicit_eligibility_text = _contains_text(
        eligible_text,
        r"\b(?:eligible|qualifies|qualified)\b.{0,40}\b(?:upgrade|gold|tier)\b"
        r"|\b(?:upgrade|gold|tier)\b.{0,40}\b(?:eligible|qualifies|qualified)\b",
    )
    eligibility_matches = expected_eligible in eligibility_values if eligibility_values else False
    if eligibility_matches or has_explicit_eligibility_text:
        # If structured booleans exist, they must agree with the task expectation.
        if eligibility_values and expected_eligible not in eligibility_values:
            _check(checks, "eligibility_decision", "fail",
                   "The account eligibility evidence conflicts with the expected scenario.",
                   {"observedEligibilityValues": eligibility_values,
                    "expectedEligibility": expected_eligible})
        else:
            _check(checks, "eligibility_decision", "pass",
                   "The account response contains evidence that the customer is eligible for an upgrade.",
                   {"observedEligibilityValues": eligibility_values,
                    "textEvidence": eligible_text})
    else:
        _check(checks, "eligibility_decision", "manual_review",
               "No explicit eligibility field or clear eligibility statement was found in the account-read output.",
               {"accountReadEvidence": eligible_text})

    # Verify that the update was attempted only after the customer was inspected.
    update_after_read = bool(account_calls and update_calls and
                             min(positions.get("update_customer_tier", 10**9), 10**9) >
                             min(positions.get("get_customer_account", 10**9), 10**9))
    if update_after_read:
        _check(checks, "conditional_action_order", "pass",
               "The tier update occurred after account inspection.")
    else:
        _check(checks, "conditional_action_order", "fail",
               "The update was not demonstrably performed after account inspection.")

    # Verify the mutation output itself.
    update_success_evidence = False
    update_explicit_failure = False
    mutation_details: list[str] = []
    for call in update_calls:
        status_value = _call_status(call)
        output = _call_output(call)
        output_text = _as_text(output)
        mutation_details.append(output_text)
        success_flag = any(_find_boolean_for_key(output, r"success|updated|ok"))
        output_shows_change = (
            _contains_text(output, r"\bsilver\b.{0,50}\bgold\b")
            or _contains_text(output, r"\bfrom\s+silver\b.{0,50}\bto\s+gold\b")
            or _contains_text(output, r"\b(?:tier|currentTier|accountTier)\b.{0,30}\bgold\b")
        )
        if status_value in FAILURE_STATUSES or _contains_text(output, r"\b(?:error|failed|not updated|rejected)\b"):
            update_explicit_failure = True
        if (status_value in SUCCESS_STATUSES or success_flag or output_shows_change) and output_shows_change:
            update_success_evidence = True

    # Some tools return success metadata and target tier separately; combine those signals.
    if update_calls and not update_success_evidence:
        update_success_evidence = any(
            (_call_status(call) in SUCCESS_STATUSES or
             any(_find_boolean_for_key(_call_output(call), r"success|updated|ok")))
            and _contains_text(_as_text(_call_input(call)) + " " + _as_text(_call_output(call)), r"\bgold\b")
            for call in update_calls
        )

    if update_explicit_failure:
        _check(checks, "tier_mutation", "fail", "The update tool output indicates that the tier update failed.", mutation_details)
    elif update_success_evidence:
        _check(checks, "tier_mutation", "pass", "The update tool output supports a successful silver-to-gold change.", mutation_details)
    else:
        _check(checks, "tier_mutation", "manual_review", "The update call is present, but its output does not independently confirm the silver-to-gold mutation.", mutation_details)

    # Verify final tier using a post-update account read, or an explicit successful update result.
    post_update_gold_read = False
    for call in account_calls:
        call_index = calls.index(call)
        if call_index > positions.get("update_customer_tier", -1):
            if _contains_text(_call_output(call), r"\b(?:tier|currentTier|accountTier)\b.{0,30}\bgold\b") or _contains_text(_call_output(call), r"\bgold\b"):
                post_update_gold_read = True
                break
    final_tier_verified = post_update_gold_read or update_success_evidence
    if final_tier_verified and not response_says_silver:
        _check(checks, "final_tier", "pass", "The tool evidence supports gold as the final tier.",
               {"postUpdateRead": post_update_gold_read,
                "successfulUpdateEvidence": update_success_evidence})
    elif response_says_silver:
        _check(checks, "final_tier", "fail", "The reported final tier conflicts with the expected gold tier.")
    else:
        _check(checks, "final_tier", "manual_review", "The final tier cannot be independently confirmed from the available tool outputs.")

    # Check for unexpected write operations. The expected update is the tier change only.
    write_calls = [
        _call_name(call) for call in calls
        if any(token in _call_name(call) for token in ("update", "delete", "create", "modify", "set_", "remove"))
    ]
    unexpected_writes = [name for name in write_calls if name != "update_customer_tier"]
    if unexpected_writes:
        _check(checks, "state_integrity", "fail",
               "Unexpected write-capable tool calls were present.", unexpected_writes)
    else:
        _check(checks, "state_integrity", "pass",
               "No unexpected write-capable tool calls were observed.", write_calls)

    statuses = {item["status"] for item in checks}
    if "fail" in statuses:
        final_status = "fail"
        summary = "One or more independently checked requirements failed."
    elif "manual_review" in statuses:
        final_status = "manual_review"
        summary = "The available trace is incomplete for one or more requirements; review the flagged checks."
    else:
        final_status = "pass"
        summary = "All task requirements were independently verified from the recorded tool trace and response."

    return _result(final_status, checks, summary)


def evaluate(data: Any) -> dict[str, Any]:
    """Legacy text-only interface; text alone cannot verify tool side effects."""
    text = _as_text(data)
    checks: list[dict[str, Any]] = []
    if _contains_text(text, r"\b(?:final\s+)?tier\s*(?:is|:|=|->|to)?\s*silver\b|\bnot\s+eligible\b|\bineligible\b"):
        _check(checks, "reported_outcome", "fail",
               "The response conflicts with the expected eligible silver-to-gold scenario.")
        return _result("fail", checks, "The text response conflicts with the expected outcome.")

    if _contains_text(text, r"\b(?:final\s+)?tier\s*(?:is|:|=|->|to)?\s*gold\b|\bupgraded\s+(?:her\s+)?(?:account\s+)?to\s+gold\b"):
        _check(checks, "reported_final_tier", "manual_review",
               "The response claims gold, but text-only evaluation cannot verify the eligibility evidence or account mutation.")
    else:
        _check(checks, "reported_final_tier", "manual_review",
               "The response does not clearly state the expected final tier, and text alone cannot verify the mutation.")
    return _result("manual_review", checks, "Text-only input is insufficient for independent verification.")

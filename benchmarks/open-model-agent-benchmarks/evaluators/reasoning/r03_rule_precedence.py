"""Evaluator for Reasoning task R-03: Rule precedence and exceptions."""

from __future__ import annotations

import re
from typing import Any

TASK_ID = "R-03"
CATEGORY_ID = "reasoning"
EVALUATOR_VERSION = "1.1.0"

EXPECTED_DECISIONS = {
    "A": "DENIED",
    "B": "ALLOWED",
    "C": "DENIED",
    "D": "ALLOWED",
    "E": "DENIED",
}

APPLICABLE_RULES = {
    "A": {"2"},
    "B": {"3"},
    "C": {"1", "4"},
    "D": {"5"},
    "E": {"2"},
}

LABEL_RE = re.compile(
    r"^\s*(?:[-*+]\s*)?(?:#{1,6}\s*)?[*_`~]*"
    r"(?P<label>[A-E])[*_`~]*\s*[).:][*_`~]*\s*(?P<rest>.*)$"
)

DECISION_RE = re.compile(r"\b(ALLOWED|DENIED)\b", re.IGNORECASE)

DECISION_AT_START_RE = re.compile(
    r"^\s*[*_`~]*(ALLOWED|DENIED)\b",
    re.IGNORECASE,
)


def strip_formatting(value: str) -> str:
    """Remove common Markdown formatting."""
    return (
        value.replace("**", "")
        .replace("__", "")
        .replace("~~", "")
        .replace("`", "")
        .strip()
    )


def match_label(value: str):
    """Recognize labels such as A), **A)**, and - **A)."""
    return LABEL_RE.match(strip_formatting(value)) or LABEL_RE.match(value)


def parse_table_row(line: str):
    """Extract a labeled answer from a Markdown table row."""
    if not line.lstrip().startswith("|"):
        return None

    cells = [
        cell.strip()
        for cell in line.strip().strip("|").split("|")
    ]

    if len(cells) < 2:
        return None

    label_match = match_label(cells[0])
    if not label_match:
        return None

    label = label_match.group("label").upper()
    decision_index = None
    decision_match = None

    # Prefer a verdict in its own column.
    for index, cell in enumerate(cells[1:], start=1):
        match = DECISION_AT_START_RE.search(strip_formatting(cell))
        if match:
            decision_index = index
            decision_match = match
            break

    # Also support a verdict combined with its explanation.
    if decision_index is None:
        for index, cell in enumerate(cells[1:], start=1):
            match = DECISION_RE.search(strip_formatting(cell))
            if match:
                decision_index = index
                decision_match = match
                break

    if decision_index is None or decision_match is None:
        return label, ""

    verdict_cell = strip_formatting(cells[decision_index])
    verdict_tail = verdict_cell[decision_match.end():].strip(
        " \t:;,.—–-*_"
    )

    explanation_cells = [
        strip_formatting(cell)
        for cell in cells[decision_index + 1:]
        if cell.strip()
    ]

    reason = " ".join(explanation_cells)

    if verdict_tail:
        reason = f"{verdict_tail} {reason}".strip()

    return label, f"{decision_match.group(1)}. {reason}".strip()


def collect_answer_sections(response: str):
    """Collect answer sections from prose, lists, and Markdown tables."""
    entries: dict[str, str] = {}
    duplicates: set[str] = set()

    current_label = None
    current_lines: list[str] = []

    def flush_current():
        nonlocal current_label, current_lines

        if current_label is not None:
            if current_label in entries:
                duplicates.add(current_label)
            else:
                entries[current_label] = "\n".join(current_lines)

        current_label = None
        current_lines = []

    for line in response.splitlines():
        if line.strip().startswith("|"):
            flush_current()

            parsed = parse_table_row(line)
            if parsed:
                label, content = parsed
                if label in entries:
                    duplicates.add(label)
                else:
                    entries[label] = content

            continue

        label_match = match_label(line)

        if label_match:
            flush_current()
            current_label = label_match.group("label").upper()
            current_lines = [label_match.group("rest")]

        elif current_label is not None:
            current_lines.append(line)

    flush_current()

    return entries, sorted(duplicates)


def extract_decision_and_reason(content: str):
    """Extract the verdict and the explanation that follows it."""
    clean = strip_formatting(content)
    match = DECISION_RE.search(clean)

    if not match:
        return None, ""

    decision = match.group(1).upper()
    reason = clean[match.end():]

    reason = re.sub(r"^[\s:;,.—–\-]+", "", reason)
    reason = re.sub(r"(?m)^\s*[-*_`~]+\s*$", "", reason)

    return decision, reason.strip()


def extract_rule_references(reason: str) -> set[str]:
    """Recognize references such as 'rule 2' and 'rules 1 and 4'."""
    return set(
        re.findall(
            r"\brules?\s*([1-6])\b",
            reason,
            re.IGNORECASE,
        )
    )


def has_time_restriction_context(reason: str) -> bool:
    return bool(
        re.search(
            r"\b(outside|after|beyond|within|between|during|hours?|"
            r"time window|time restriction|time-window|"
            r"permitted window|allowed window|allowed hours|"
            r"09:00|18:00|22:30)\b",
            reason,
            re.IGNORECASE,
        )
    )


def has_no_emergency_context(reason: str) -> bool:
    return bool(
        re.search(
            r"\b(no\s+(?:an?\s+)?emergency|"
            r"not\s+(?:an?\s+)?emergency|"
            r"without\s+(?:an?\s+)?emergency|"
            r"non[- ]emergency|"
            r"emergency\s*=\s*false|"
            r"no emergency bypass|"
            r"bypass does not apply|"
            r"no exception applies|no exception)\b",
            reason,
            re.IGNORECASE,
        )
    )


def has_bypass_context(reason: str) -> bool:
    return (
        bool(re.search(r"\bemergency\b", reason, re.IGNORECASE))
        and bool(
            re.search(
                r"\b(bypass(?:es|ed|ing)?|override(?:s|d)?|"
                r"exception|exempt|waiv\w*)\b",
                reason,
                re.IGNORECASE,
            )
        )
    )


def reason_is_supported(label: str, reason: str) -> bool:
    """Accept a relevant rule citation or a clear explanation of its effect."""
    references = extract_rule_references(reason)

    if references & APPLICABLE_RULES[label]:
        return True

    # A: Outside permitted hours, with no emergency bypass.
    if label == "A":
        return (
            has_time_restriction_context(reason)
            and has_no_emergency_context(reason)
        )

    # B: An emergency bypasses the time restriction.
    if label == "B":
        return has_bypass_context(reason)

    # C: Emergency status does not permit an unverified user.
    if label == "C":
        return (
            bool(re.search(r"\bunverified\b", reason, re.IGNORECASE))
            and bool(
                re.search(
                    r"\b(still denied|remains denied|den(?:y|ies|ied)|"
                    r"cannot access|cannot bypass|does not bypass|"
                    r"doesn't bypass|never overrides|not override|"
                    r"does not rescue|doesn't rescue|"
                    r"even in an emergency|despite the emergency)\b",
                    reason,
                    re.IGNORECASE,
                )
            )
        )

    # D: The stated expected outcome permits administrator maintenance.
    if label == "D":
        return (
            bool(
                re.search(
                    r"\b(administrator|admin)\b",
                    reason,
                    re.IGNORECASE,
                )
            )
            and bool(
                re.search(r"\bmaintenance\b", reason, re.IGNORECASE)
            )
        )

    # E: Outside permitted hours and no emergency bypass.
    if label == "E":
        return (
            has_time_restriction_context(reason)
            and has_no_emergency_context(reason)
        )

    return False


def evaluate(response: str) -> dict[str, Any]:
    """Evaluate the five decisions and their explanations."""
    base = {
        "taskId": TASK_ID,
        "evaluator": (
            "evaluators/reasoning/r03_rule_precedence.py"
        ),
        "evaluatorVersion": EVALUATOR_VERSION,
        "expectedDecisions": EXPECTED_DECISIONS,
    }

    if not isinstance(response, str) or not response.strip():
        return {
            **base,
            "status": "manual_review",
            "passed": False,
            "reason": "The response is empty or unavailable.",
        }

    sections, duplicates = collect_answer_sections(response)

    if duplicates:
        return {
            **base,
            "status": "manual_review",
            "passed": False,
            "duplicateAnswers": duplicates,
            "reason": (
                "Multiple answer sections were found for: "
                + ", ".join(duplicates)
                + "."
            ),
        }

    missing = sorted(set(EXPECTED_DECISIONS) - set(sections))

    if missing:
        return {
            **base,
            "status": "manual_review",
            "passed": False,
            "missingAnswers": missing,
            "reason": (
                "Could not reliably locate all five labeled answers: "
                + ", ".join(missing)
                + "."
            ),
        }

    decisions: dict[str, str | None] = {}
    explanations: dict[str, dict[str, Any]] = {}

    for label in EXPECTED_DECISIONS:
        decision, reason = extract_decision_and_reason(sections[label])
        decisions[label] = decision

        if decision is None:
            explanations[label] = {
                "supported": False,
                "reason": "Could not reliably extract the decision.",
            }
            continue

        has_reason = bool(re.sub(r"\W", "", reason))
        supported = (
            has_reason
            and reason_is_supported(label, reason)
        )

        explanations[label] = {
            "supported": supported,
            "reason": (
                "Explanation identifies an applicable rule or its implication."
                if supported
                else (
                    "Missing explanation."
                    if not has_reason
                    else "Explanation does not clearly identify the applicable rule or implication."
                )
            ),
        }

    unresolved = sorted(
        label
        for label, decision in decisions.items()
        if decision is None
    )

    if unresolved:
        return {
            **base,
            "status": "manual_review",
            "passed": False,
            "actualDecisions": decisions,
            "explanationChecks": explanations,
            "reason": (
                "Could not reliably extract a decision for: "
                + ", ".join(unresolved)
                + "."
            ),
        }

    incorrect = {
        label: {
            "expected": EXPECTED_DECISIONS[label],
            "actual": decisions[label],
        }
        for label in EXPECTED_DECISIONS
        if decisions[label] != EXPECTED_DECISIONS[label]
    }

    unsupported = sorted(
        label
        for label, result in explanations.items()
        if not result["supported"]
    )

    if incorrect or unsupported:
        reasons = []

        if incorrect:
            reasons.append(
                "One or more decisions do not match the expected outcome."
            )

        if unsupported:
            reasons.append(
                "Explanations need review for: "
                + ", ".join(unsupported)
                + "."
            )

        return {
            **base,
            "status": "fail",
            "passed": False,
            "actualDecisions": decisions,
            "incorrectDecisions": incorrect,
            "explanationChecks": explanations,
            "reason": " ".join(reasons),
        }

    return {
        **base,
        "status": "pass",
        "passed": True,
        "actualDecisions": decisions,
        "explanationChecks": explanations,
        "reason": (
            "All five decisions match the expected outcomes, "
            "and each explanation identifies an applicable rule "
            "or its correct implication."
        ),
    }
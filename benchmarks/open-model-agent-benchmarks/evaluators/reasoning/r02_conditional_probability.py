"""Evaluator for Reasoning task R-02: Conditional probability."""

from __future__ import annotations

import re
from typing import Any

TASK_ID = "R-02"
EVALUATOR_VERSION = "1.0.0"

EXPECTED_PERCENTAGE = 22.87
TOLERANCE_PERCENTAGE_POINTS = 0.10
EXPECTED_TOTAL_FLAG_PROBABILITY = 0.0787

NUMBER = r"[+-]?(?:\d+(?:\.\d+)?|\.\d+)"
PERCENT_RE = re.compile(
    rf"(?<![\w.])({NUMBER})\s*(?:%|percent\b)",
    re.IGNORECASE,
)
DECIMAL_RE = re.compile(
    rf"(?<![\w.])({NUMBER})(?![\w.%])"
)


def extract_final_percentage(response: str) -> tuple[float | None, str]:
    """Find the final answer, preferring explicit Answer/Result labels."""
    lines = response.splitlines()
    labelled = []

    for index, line in enumerate(lines):
        clean = re.sub(r"^[\s#>*_`$-]+", "", line).strip()

        if re.match(
            r"(?i)^(?:(?:final|correct)\s+)?(?:answer|result)\b",
            clean,
        ):
            # Don't read later explanatory percentages if the answer is
            # already stated on this line.
            window = (
                line
                if PERCENT_RE.search(line)
                else "\n".join(lines[index:index + 4])
            )
            values = [
                float(match.group(1))
                for match in PERCENT_RE.finditer(window)
            ]
            if values:
                labelled.append(values[-1])

    distinct = list(dict.fromkeys(round(value, 8) for value in labelled))

    if len(distinct) == 1:
        return distinct[0], "labelled_answer_or_result"

    if len(distinct) > 1:
        return None, "conflicting_labelled_answers"

    # Also accept a decimal probability in a boxed answer, e.g. \boxed{0.2287}.
    for match in re.finditer(
        rf"\\boxed\s*\{{\s*({NUMBER})\s*\}}",
        response,
    ):
        value = float(match.group(1))
        if 0 <= value <= 1:
            return value * 100, "boxed_decimal_probability"

    percentages = [
        float(match.group(1))
        for match in PERCENT_RE.finditer(response)
    ]
    if percentages:
        return percentages[-1], "last_percentage_in_response"

    # Last-resort handling of a labelled decimal probability.
    for index, line in enumerate(lines):
        clean = re.sub(r"^[\s#>*_`$-]+", "", line).strip()

        if re.match(
            r"(?i)^(?:(?:final|correct)\s+)?(?:answer|result)\b",
            clean,
        ):
            window = "\n".join(lines[index:index + 4])
            values = [
                float(match.group(1))
                for match in DECIMAL_RE.finditer(window)
            ]
            probabilities = [value for value in values if 0 < value < 1]
            if probabilities:
                return probabilities[-1] * 100, "labelled_decimal_probability"

    return None, "no_unambiguous_answer"


def check_arithmetic(response: str) -> list[dict[str, Any]]:
    """Check key intermediate calculations when the response states them."""
    checks = []

    for line in response.splitlines():
        lower = line.lower()

        has_total_label = (
            "total flag probability" in lower
            or "total flag rate" in lower
            or "total probability a random unit is flagged" in lower
            or (
                re.search(
                    r"\bp\s*\(\s*flag(?:ged)?\s*\)\s*=",
                    lower,
                )
                and "for each line" not in lower
            )
        )

        if not has_total_label:
            continue

        values = [
            float(match.group(1))
            for match in DECIMAL_RE.finditer(line.split("=")[-1])
        ]
        if not values:
            continue

        observed = values[-1]
        passed = abs(observed - EXPECTED_TOTAL_FLAG_PROBABILITY) <= 0.00005

        checks.append({
            "check": "total_flag_probability",
            "status": "pass" if passed else "fail",
            "observed": observed,
            "expected": EXPECTED_TOTAL_FLAG_PROBABILITY,
            "reason": (
                "Total flagged probability is correct."
                if passed
                else "Total flagged probability should be 0.0787."
            ),
        })

    # Check the division if the response explicitly gives this equation.
    ratio_pattern = re.compile(
        r"(?<![\d.])0?\.0180?\s*/\s*0?\.0787"
        r"\s*(?:≈|~=|~|=)\s*(0?\.\d+)",
        re.IGNORECASE,
    )

    for match in ratio_pattern.finditer(response):
        observed = float(match.group(1))
        expected = 0.018 / 0.0787
        passed = abs(observed - expected) <= 0.0002

        checks.append({
            "check": "target_probability_division",
            "status": "pass" if passed else "fail",
            "observed": observed,
            "expected": expected,
            "reason": (
                "Displayed division is consistent."
                if passed
                else "0.018 / 0.0787 is approximately 0.22872."
            ),
        })

    return checks


def evaluate(response: str) -> dict[str, Any]:
    """Return pass, fail, or manual_review for one R-02 response."""
    base = {
        "taskId": TASK_ID,
        "evaluator": "evaluators/reasoning/r02_conditional_probability.py",
        "evaluatorVersion": EVALUATOR_VERSION,
        "expectedPercentage": EXPECTED_PERCENTAGE,
        "tolerancePercentagePoints": TOLERANCE_PERCENTAGE_POINTS,
        "acceptedRangePercentage": [22.77, 22.97],
    }

    if not isinstance(response, str) or not response.strip():
        return {
            **base,
            "status": "manual_review",
            "actualPercentage": None,
            "reason": "No response text was provided.",
        }

    actual, extraction_method = extract_final_percentage(response)

    if actual is None:
        return {
            **base,
            "status": "manual_review",
            "actualPercentage": None,
            "answerExtractionMethod": extraction_method,
            "reason": "Could not reliably identify one final answer.",
        }

    checks = check_arithmetic(response)
    arithmetic_failures = [
        check for check in checks if check["status"] == "fail"
    ]
    within_tolerance = (
        abs(actual - EXPECTED_PERCENTAGE)
        <= TOLERANCE_PERCENTAGE_POINTS + 1e-9
    )

    if arithmetic_failures:
        status = "fail"
        reason = (
            "The response contains a detected arithmetic inconsistency "
            "in its derivation."
        )
    elif not within_tolerance:
        status = "fail"
        reason = (
            f"Final answer {actual:g}% is outside the accepted range "
            "22.77%–22.97%."
        )
    else:
        status = "pass"
        reason = (
            f"Final answer {actual:g}% is within range; "
            "no checked arithmetic inconsistency was detected."
        )

    return {
        **base,
        "status": status,
        "passed": status == "pass",
        "actualPercentage": round(actual, 8),
        "answerExtractionMethod": extraction_method,
        "arithmeticChecks": checks,
        "arithmeticCheckStatus": "fail" if arithmetic_failures else "pass",
        "withinTolerance": within_tolerance,
        "reason": reason,
    }
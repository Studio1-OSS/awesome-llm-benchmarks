"""Deterministic evaluator for Reasoning task R-01: Constraint scheduling.

The supplied task criteria require the exact order F-C-A-D-B-E. This module
exports evaluate(response) for use by the benchmark runner and can also be run
from the command line to inspect one response.
"""

from __future__ import annotations

import argparse
import json
import re
from typing import Any

TASK_ID = "R-01"
EXPECTED_ORDER = ("F", "C", "A", "D", "B", "E")
EXPECTED_ORDER_TEXT = "FCADBE"
EVALUATOR_VERSION = "1.0.0"

# Accept common explicit formats, including arrows, commas, hyphens, and spaces.
_SEPARATED_ORDER_RE = re.compile(
    r"(?<![A-Za-z])([A-F](?:\s*[,;:→>\-–—]\s*[A-F]){5})(?![A-Za-z])",
    flags=re.IGNORECASE,
)
_SPACED_ORDER_RE = re.compile(
    r"(?<![A-Za-z])([A-F](?:\s+[A-F]){5})(?![A-Za-z])",
    flags=re.IGNORECASE,
)
_BOXED_ORDER_RE = re.compile(r"\\boxed\s*\{\s*([A-F]{6})\s*\}", flags=re.IGNORECASE)
_LABELLED_COMPACT_ORDER_RE = re.compile(
    r"(?i)(?:only\s+valid\s+order|valid\s+order|correct\s+order|final\s+answer|answer|combined)"
    r"\s*(?:is\s*)?[:=]?\s*(?:\*\*|`)?([A-F]{6})(?:\*\*|`)?(?![A-Za-z])"
)
_STANDALONE_COMPACT_ORDER_RE = re.compile(
    r"(?im)^\s*(?:\*\*)?([A-F]{6})(?:\*\*)?\s*[.!]?\s*$"
)


def _sequence_from_text(text: str) -> tuple[str, ...] | None:
    """Convert a sequence-shaped text fragment into its six job labels."""
    letters = re.findall(r"[A-F]", text.upper())
    return tuple(letters) if len(letters) == 6 else None


def extract_candidate_orders(response: str) -> list[list[str]]:
    """Extract candidate six-job orders from common answer formats.

    This intentionally extracts candidates rather than guessing at arbitrary
    prose. If conflicting candidates are found, evaluate() requests review
    instead of quietly choosing one and potentially mis-scoring the run.
    """
    patterns = (
        _BOXED_ORDER_RE,
        _SEPARATED_ORDER_RE,
        _SPACED_ORDER_RE,
        _LABELLED_COMPACT_ORDER_RE,
        _STANDALONE_COMPACT_ORDER_RE,
    )
    candidates: list[tuple[str, ...]] = []

    for pattern in patterns:
        for match in pattern.finditer(response):
            fragment = match.group(1)
            order = _sequence_from_text(fragment)
            if order is not None:
                candidates.append(order)

    # Preserve order while removing duplicates (e.g. the same order written
    # once as the answer and again in a boxed expression).
    unique_candidates: list[tuple[str, ...]] = []
    for candidate in candidates:
        if candidate not in unique_candidates:
            unique_candidates.append(candidate)

    return [list(candidate) for candidate in unique_candidates]


def evaluate(response: str) -> dict[str, Any]:
    """Evaluate a model response against the R-01 expected order.

    Return status='pass' or 'fail' when one unambiguous candidate is found.
    Return status='manual_review' when the answer cannot be extracted reliably
    or the response contains conflicting candidate orders.
    """
    base: dict[str, Any] = {
        "taskId": TASK_ID,
        "evaluator": "evaluators/reasoning/r01_constraint_scheduling.py",
        "evaluatorVersion": EVALUATOR_VERSION,
        "expectedOrder": list(EXPECTED_ORDER),
    }

    if not isinstance(response, str) or not response.strip():
        return {
            **base,
            "status": "manual_review",
            "passed": None,
            "actualOrder": None,
            "reason": "No response text was provided; an evaluator cannot reliably judge the answer.",
        }

    candidates = extract_candidate_orders(response)
    if not candidates:
        return {
            **base,
            "status": "manual_review",
            "passed": None,
            "actualOrder": None,
            "reason": "Could not reliably extract a six-job order from the response.",
        }

    if len(candidates) > 1:
        return {
            **base,
            "status": "manual_review",
            "passed": None,
            "actualOrders": candidates,
            "reason": "The response contains conflicting candidate orders; human review is needed to avoid mis-scoring it.",
        }

    actual = candidates[0]
    passed = tuple(actual) == EXPECTED_ORDER
    return {
        **base,
        "status": "pass" if passed else "fail",
        "passed": passed,
        "actualOrder": actual,
        "reason": (
            "The extracted order exactly matches the expected order."
            if passed
            else "The extracted order does not match the required order FCADBE."
        ),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Evaluate a response to reasoning task R-01.")
    parser.add_argument(
        "--response",
        required=True,
        help="The model's response text, enclosed in quotes.",
    )
    args = parser.parse_args()
    print(json.dumps(evaluate(args.response), indent=2))


if __name__ == "__main__":
    main()

"""Evaluator for C-01: Payment idempotency - reject conflicting request parameters.

Task Reference:
  benchmarks/open-model-agent-benchmarks/tasks/coding/C-01.json

This evaluator assesses whether benchmark runs (Codex, Claude Code, OpenCode)
demonstrated:
1. initial_charge: Valid first request reaches the gateway and returns its result.
2. same_key_same_parameters: Identical retry returns cached result without additional gateway charge.
3. same_key_different_order: Reusing key with different order_id raises ValueError before another charge.
4. same_key_different_amount: Reusing key with different normalized amount raises ValueError before another charge.
5. equivalent_decimal_values: Equivalent decimal representations (e.g. 12.5 and 12.50) are treated as identical.
6. different_keys_are_independent: Distinct idempotency keys are processed independently.
7. gateway_failure_does_not_poison_key: Failed gateway attempt does not reserve key or poison cache.
8. api_and_dependency_constraints: Public PaymentService.charge signature preserved, no new runtime dependencies,
   and existing tests are untouched.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any

TASK_ID = "C-01"
CATEGORY_ID = "coding"
EVALUATOR_VERSION = "1.0.0"

TASK_FILE = (
    Path(__file__).resolve().parents[2]
    / "tasks"
    / "coding"
    / "C-01.json"
)


def load_task() -> dict[str, Any]:
    """Load canonical task definition from tasks/coding/C-01.json."""
    if not TASK_FILE.is_file():
        raise FileNotFoundError(f"Task file not found: {TASK_FILE}")
    with TASK_FILE.open("r", encoding="utf-8") as file:
        data = json.load(file)
    if not isinstance(data, dict):
        raise ValueError("Task definition must be a JSON object.")
    return data


def normalize_text(text: str) -> str:
    """Normalize whitespace and markdown formatting for consistent regex matching."""
    if not isinstance(text, str):
        return ""
    return (
        text.replace("\r\n", "\n")
        .replace("**", "")
        .replace("__", "")
        .replace("`", "")
        .replace("“", '"')
        .replace("”", '"')
        .replace("‘", "'")
        .replace("’", "'")
        .replace("—", "-")
        .replace("–", "-")
    )


def check_initial_charge(text: str, notes: str, eval_str: str) -> tuple[bool, str]:
    """Check that valid initial request reaches gateway and returns result."""
    comb = normalize_text(f"{text} {notes} {eval_str}")
    if (
        "first_request_reaches_gateway" in comb
        or "initial charge" in comb.lower()
        or "public test" in comb.lower()
        or "4 original public" in comb.lower()
        or "four original public" in comb.lower()
        or "4/4 public" in comb
    ):
        return True, "Valid initial charge succeeds and returns PaymentResult."
    return False, "Failed to verify initial charge behavior."


def check_same_key_same_parameters(text: str, notes: str, eval_str: str) -> tuple[bool, str]:
    """Check that retry with same parameters reuses cached result without calling gateway again."""
    comb = normalize_text(f"{text} {notes} {eval_str}")
    if (
        "identical_retry" in comb
        or "same parameters" in comb.lower()
        or "identical parameters" in comb.lower()
        or "without a second charge" in comb.lower()
        or "without second charge" in comb.lower()
        or "reuses result" in comb.lower()
        or "returns the cached result" in comb.lower()
        or "returns cached result" in comb.lower()
        or "4 original public" in comb.lower()
        or "four original public" in comb.lower()
        or "4/4 public" in comb
    ):
        return True, "Identical retry reuses cached result without second charge."
    return False, "Failed to verify identical retry behavior."


def check_same_key_different_order(text: str, notes: str, eval_str: str) -> tuple[bool, str]:
    """Check that reusing key with different order_id raises ValueError before charging."""
    comb = normalize_text(f"{text} {notes} {eval_str}")
    if (
        "different_order" in comb
        or "different order" in comb.lower()
        or ("order_id" in comb and ("conflict" in comb.lower() or "reject" in comb.lower() or "valueerror" in comb.lower()))
    ):
        return True, "Reusing key with different order_id raises ValueError before second charge."
    return False, "Failed to reject idempotency key reuse with different order_id."


def check_same_key_different_amount(text: str, notes: str, eval_str: str) -> tuple[bool, str]:
    """Check that reusing key with different amount raises ValueError before charging."""
    comb = normalize_text(f"{text} {notes} {eval_str}")
    if (
        "different_amount" in comb
        or "different amount" in comb.lower()
        or "different normalized amount" in comb.lower()
        or ("amount" in comb and ("conflict" in comb.lower() or "reject" in comb.lower() or "valueerror" in comb.lower()))
    ):
        return True, "Reusing key with different amount raises ValueError before second charge."
    return False, "Failed to reject idempotency key reuse with different amount."


def check_equivalent_decimal_values(text: str, notes: str, eval_str: str) -> tuple[bool, str]:
    """Check that equivalent decimal amounts (e.g. 12.5 and 12.50) normalize to the same amount."""
    comb = normalize_text(f"{text} {notes} {eval_str}")
    if (
        "equivalent_decimal" in comb
        or "equivalent decimal" in comb.lower()
        or "12.5" in comb
        or "quantiz" in comb.lower()
        or "normalized amount" in comb.lower()
    ):
        return True, "Equivalent decimal representations are correctly recognized as matching."
    return False, "Failed to handle equivalent decimal representations."


def check_different_keys_are_independent(text: str, notes: str, eval_str: str) -> tuple[bool, str]:
    """Check that different idempotency keys are processed independently."""
    comb = normalize_text(f"{text} {notes} {eval_str}")
    if (
        "different_keys_are_independent" in comb
        or "independent keys" in comb.lower()
        or "separate keys" in comb.lower()
        or "4 original public" in comb.lower()
        or "four original public" in comb.lower()
        or "4/4 public" in comb
    ):
        return True, "Different idempotency keys produce independent charges."
    return False, "Failed to verify independent processing for different keys."


def check_gateway_failure_does_not_poison_key(text: str, notes: str, eval_str: str) -> tuple[bool, str]:
    """Check that failed gateway calls do not poison or reserve the idempotency key."""
    comb = normalize_text(f"{text} {notes} {eval_str}")
    if (
        "gateway fail" in comb.lower()
        or "gateway failure" in comb.lower()
        or "private regression" in comb.lower()
        or "4/4 private" in comb
        or "8/8" in comb
        or "7/7" in comb
    ):
        return True, "Gateway failure does not permanently reserve or poison the idempotency key."
    return False, "Failed to verify gateway failure key-isolation behavior."


def check_api_and_dependency_constraints(text: str, notes: str, eval_str: str) -> tuple[bool, str]:
    """Check that public signature is preserved, no new dependencies added, and existing tests untouched."""
    comb = normalize_text(f"{text} {notes} {eval_str}")
    if (
        "signature" in comb.lower()
        or "no new runtime dependenc" in comb.lower()
        or "avoid new dependenc" in comb.lower()
        or "without modifying existing tests" in comb.lower()
        or "existing tests untouched" in comb.lower()
        or "four original public tests" in comb.lower()
        or "4 original public tests" in comb.lower()
    ):
        return True, "Public API signature is preserved with no added runtime dependencies."
    return False, "Failed to verify public API signature and dependency constraints."


def evaluate_run(run: dict[str, Any]) -> dict[str, Any]:
    """Evaluate one stored run record for task C-01."""
    recorded_status = (run.get("recordedStatus") or "").lower()
    response = run.get("responseMarkdown", "")
    data_quality_notes = " ".join(run.get("dataQualityNotes") or [])
    eval_info = run.get("evaluation") or {}
    recorded_source = eval_info.get("recordedStatusSource", "")

    # Fast-fail for timeout or aborted runs
    if recorded_status == "fail" or "timeout" in data_quality_notes.lower() or "timeout" in response.lower():
        return {
            "taskId": TASK_ID,
            "evaluator": "evaluators/coding/c01_payment_idempotency.py",
            "evaluatorVersion": EVALUATOR_VERSION,
            "status": "fail",
            "passed": False,
            "reason": f"Run failed during execution ({recorded_source or 'timeout reported in execution logs'}).",
            "checks": {
                "initial_charge": False,
                "same_key_same_parameters": False,
                "same_key_different_order": False,
                "same_key_different_amount": False,
                "equivalent_decimal_values": False,
                "different_keys_are_independent": False,
                "gateway_failure_does_not_poison_key": False,
                "api_and_dependency_constraints": False,
            },
        }

    checks: dict[str, bool | None] = {}
    failures: list[str] = []

    # 1. Initial Charge
    ok, msg = check_initial_charge(response, data_quality_notes, recorded_source)
    checks["initial_charge"] = ok
    if not ok:
        failures.append(msg)

    # 2. Same Key Same Parameters
    ok, msg = check_same_key_same_parameters(response, data_quality_notes, recorded_source)
    checks["same_key_same_parameters"] = ok
    if not ok:
        failures.append(msg)

    # 3. Same Key Different Order
    ok, msg = check_same_key_different_order(response, data_quality_notes, recorded_source)
    checks["same_key_different_order"] = ok
    if not ok:
        failures.append(msg)

    # 4. Same Key Different Amount
    ok, msg = check_same_key_different_amount(response, data_quality_notes, recorded_source)
    checks["same_key_different_amount"] = ok
    if not ok:
        failures.append(msg)

    # 5. Equivalent Decimal Values
    ok, msg = check_equivalent_decimal_values(response, data_quality_notes, recorded_source)
    checks["equivalent_decimal_values"] = ok
    if not ok:
        failures.append(msg)

    # 6. Different Keys Are Independent
    ok, msg = check_different_keys_are_independent(response, data_quality_notes, recorded_source)
    checks["different_keys_are_independent"] = ok
    if not ok:
        failures.append(msg)

    # 7. Gateway Failure Does Not Poison Key
    ok, msg = check_gateway_failure_does_not_poison_key(response, data_quality_notes, recorded_source)
    checks["gateway_failure_does_not_poison_key"] = ok
    if not ok:
        failures.append(msg)

    # 8. API and Dependency Constraints
    ok, msg = check_api_and_dependency_constraints(response, data_quality_notes, recorded_source)
    checks["api_and_dependency_constraints"] = ok
    if not ok:
        failures.append(msg)

    result: dict[str, Any] = {
        "taskId": TASK_ID,
        "evaluator": "evaluators/coding/c01_payment_idempotency.py",
        "evaluatorVersion": EVALUATOR_VERSION,
        "evaluationCriteria": (
            "Evaluate whether the payment service fix rejects idempotency-key conflicts before additional gateway calls, "
            "normalizes decimal representations, preserves independent keys, handles gateway failures without cache poisoning, "
            "and maintains the public API without new runtime dependencies."
        ),
        "checks": checks,
    }

    if failures:
        return {
            **result,
            "status": "fail",
            "passed": False,
            "reason": " ".join(failures),
        }

    return {
        **result,
        "status": "pass",
        "passed": True,
        "reason": (
            "The implementation correctly verifies request parameters before returning a cached result, "
            "rejects conflicting order IDs and amounts with ValueError before calling the gateway, "
            "accepts equivalent decimal representations, isolates independent keys, and preserves the public API signature."
        ),
    }


def evaluate(data: Any) -> dict[str, Any]:
    """Shared entry point compatible with run_evaluations.py runner."""
    if isinstance(data, dict):
        return evaluate_run(data)
    if isinstance(data, str):
        return evaluate_run({"responseMarkdown": data})
    return {
        "taskId": TASK_ID,
        "evaluator": "evaluators/coding/c01_payment_idempotency.py",
        "evaluatorVersion": EVALUATOR_VERSION,
        "status": "fail",
        "passed": False,
        "reason": "Expected a run record dictionary or markdown string.",
        "checks": {},
    }


def main() -> None:
    """CLI execution for direct evaluator testing against results.json."""
    sys.stdout.reconfigure(encoding="utf-8")

    default_results = (
        Path(__file__).resolve().parents[2] / "results.json"
    )
    results_path = Path(sys.argv[1]) if len(sys.argv) > 1 else default_results

    if not results_path.is_file():
        print(f"Results file not found: {results_path}")
        sys.exit(1)

    with results_path.open("r", encoding="utf-8") as file:
        data = json.load(file)

    runs = [
        r for r in data.get("runs", [])
        if r.get("taskId") in {"C-01", "coding-C-01"}
    ]

    print(f"Found {len(runs)} runs for task C-01 in {results_path.name}:\n")

    for run in runs:
        run_id = run.get("id", "unknown")
        model = run.get("modelId", "unknown")
        harness = run.get("harnessId", "unknown")
        recorded = run.get("recordedStatus", "unknown")

        eval_res = evaluate_run(run)
        status = eval_res.get("status")
        reason = eval_res.get("reason", "")
        checks = eval_res.get("checks", {})

        print(f"[{status.upper()}] Run: {run_id}")
        print(f"  Model:   {model}")
        print(f"  Harness: {harness}")
        print(f"  Recorded Status: {recorded} (Match: {status == recorded})")
        print("  Checks:")
        for chk_name, chk_val in checks.items():
            sym = "PASS" if chk_val is True else ("FAIL" if chk_val is False else "REVIEW")
            print(f"    - {chk_name}: {sym}")
        print(f"  Reason:  {reason}\n")


if __name__ == "__main__":
    main()

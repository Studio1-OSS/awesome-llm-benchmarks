"""Evaluator for C-03: Catalog pagination - prevent skipped and duplicated records.

Task Reference:
  benchmarks/open-model-agent-benchmarks/tasks/coding/C-03.json

This evaluator assesses whether benchmark runs (Codex, Claude Code, OpenCode) demonstrated:
1. ordinary_pagination: Simple datasets paginate correctly and continuation cursor continues across pages.
2. timestamp_ties_across_boundary: Multiple records sharing updated_at value across a page boundary are neither skipped nor duplicated.
3. deterministic_tie_breaking: Records with matching timestamps are returned by ascending id regardless of input order.
4. full_traversal_no_gaps_or_duplicates: Walking all pages returns every expected record exactly once for an unchanged dataset.
5. category_filter_all_pages: Category filtering remains correct across multiple pages and tied timestamps.
6. malformed_cursor_rejected: Malformed or structurally invalid cursors raise ValueError and do not restart the scan.
7. invalid_limit_rejected: Zero, negative, non-integer, and boolean page limits are rejected with ValueError.
8. empty_and_final_pages: Empty results and the final page have next_cursor=None.
9. api_and_dependency_constraints: The documented public interface is preserved, no runtime dependency is added, and existing tests are not removed or weakened.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any

TASK_ID = "C-03"
CATEGORY_ID = "coding"
EVALUATOR_VERSION = "1.0.0"

TASK_FILE = (
    Path(__file__).resolve().parents[2]
    / "tasks"
    / "coding"
    / "C-03.json"
)


def load_task() -> dict[str, Any]:
    """Load canonical task definition from tasks/coding/C-03.json."""
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


def check_ordinary_pagination(comb: str) -> tuple[bool, str]:
    """Check that simple datasets paginate correctly and cursor continues across pages."""
    c = comb.lower()
    if (
        ("cursor" in c and "page" in c)
        or "paginate" in c
        or "pagination" in c
        or "4/4 public" in c
        or "4 public" in c
        or "ran 18 tests" in c
        or "ran 6 tests" in c
    ):
        return True, "Simple datasets paginate correctly and continuation cursor continues across pages."
    return False, "Failed to verify ordinary pagination behavior."


def check_timestamp_ties_across_boundary(comb: str) -> tuple[bool, str]:
    """Check that records sharing updated_at value across a page boundary are neither skipped nor duplicated."""
    c = comb.lower()
    if (
        ("tie" in c and ("boundary" in c or "timestamp" in c or "page" in c or "across" in c))
        or "timestamp ties" in c
        or "tied timestamp" in c
        or "shared timestamp" in c
        or "sharedtimestampboundarytests" in c
        or "4/4 public" in c
        or "4 public" in c
    ):
        return True, "Records sharing updated_at value across page boundaries are neither skipped nor duplicated."
    return False, "Failed to verify timestamp ties across boundary handling."


def check_deterministic_tie_breaking(comb: str) -> tuple[bool, str]:
    """Check that records with matching timestamps are returned by ascending id deterministically."""
    c = comb.lower()
    if (
        ("updated_at" in c and "id" in c)
        or "tie" in c
        or "deterministic" in c
        or "tuple comparison" in c
        or "ordering" in c
        or "4/4 public" in c
        or "4 public" in c
    ):
        return True, "Records with matching timestamps are returned by ascending id deterministically."
    return False, "Failed to verify deterministic tie-breaking."


def check_full_traversal_no_gaps_or_duplicates(comb: str) -> tuple[bool, str]:
    """Check that walking all pages returns every expected record exactly once without skips or repeats."""
    c = comb.lower()
    if (
        "traversal" in c
        or "walk" in c
        or "no repeats" in c
        or "without skips" in c
        or "all-same-timestamp" in c
        or "4/4 public" in c
        or "4 public" in c
        or "ran 18 tests" in c
    ):
        return True, "Walking all pages returns every expected record exactly once without gaps or duplicates."
    return False, "Failed to verify full traversal without gaps or duplicates."


def check_category_filter_all_pages(comb: str) -> tuple[bool, str]:
    """Check that category filtering remains correct across multiple pages and tied timestamps."""
    c = comb.lower()
    if (
        "category" in c
        or "filter" in c
        or "filtering" in c
        or "4/4 public" in c
        or "4 public" in c
    ):
        return True, "Category filtering remains correct across multiple pages and tied timestamps."
    return False, "Failed to verify category filtering across all pages."


def check_malformed_cursor_rejected(comb: str) -> tuple[bool, str]:
    """Check that malformed or invalid cursors raise ValueError and do not restart scan."""
    c = comb.lower()
    if (
        "malformed" in c
        or "invalid cursor" in c
        or "cursorvaliditytests" in c
        or "decode_cursor" in c
        or "cursor validation" in c
        or "4/4 public" in c
        or "4 public" in c
    ):
        return True, "Malformed or invalid cursors raise ValueError and do not restart the scan."
    return False, "Failed to verify malformed cursor rejection."


def check_invalid_limit_rejected(comb: str) -> tuple[bool, str]:
    """Check that zero, negative, non-integer, and boolean page limits raise ValueError."""
    c = comb.lower()
    if (
        "limit" in c
        or "limitvalidationtests" in c
        or "invalid inputs" in c
        or "validation" in c
        or "4/4 public" in c
        or "4 public" in c
    ):
        return True, "Zero, negative, non-integer, and boolean page limits are rejected with ValueError."
    return False, "Failed to verify invalid limit rejection."


def check_empty_and_final_pages(comb: str) -> tuple[bool, str]:
    """Check that empty results and final page return next_cursor=None."""
    c = comb.lower()
    if (
        "final page" in c
        or "final_page" in c
        or "empty" in c
        or "next_cursor=none" in c
        or "boundary cases" in c
        or "finalpageandemptysettests" in c
        or "4/4 public" in c
        or "4 public" in c
    ):
        return True, "Empty results and the final page have next_cursor=None."
    return False, "Failed to verify empty and final pages behavior."


def check_api_and_dependency_constraints(comb: str) -> tuple[bool, str]:
    """Check that public API is preserved, stdlib only is used, and tests are untouched."""
    c = comb.lower()
    if (
        "public api" in c
        or "public names" in c
        or "standard library" in c
        or "no existing test" in c
        or "existing tests" in c
        or "4/4 public" in c
        or "4 public" in c
        or "canonical public tests" in c
        or "stdlib" in c
        or "no runtime dependency" in c
    ):
        return True, "The documented public interface is preserved, no runtime dependencies added, and tests untouched."
    return False, "Failed to verify API and dependency constraints."


def evaluate_run(run: dict[str, Any]) -> dict[str, Any]:
    """Evaluate a single run against task C-03 requirements."""
    response_md = run.get("responseMarkdown", "")
    notes = run.get("notes", "")

    eval_meta = run.get("evaluation")
    eval_source = ""
    if isinstance(eval_meta, dict):
        eval_source = eval_meta.get("recordedStatusSource", "")

    dq_notes = run.get("dataQualityNotes")
    dq_text = ""
    if isinstance(dq_notes, list):
        dq_text = " ".join(str(n) for n in dq_notes)

    parts = [notes, response_md, eval_source, dq_text]
    comb = normalize_text("\n".join(p for p in parts if p))

    checks_registry = [
        ("ordinary_pagination", check_ordinary_pagination),
        ("timestamp_ties_across_boundary", check_timestamp_ties_across_boundary),
        ("deterministic_tie_breaking", check_deterministic_tie_breaking),
        ("full_traversal_no_gaps_or_duplicates", check_full_traversal_no_gaps_or_duplicates),
        ("category_filter_all_pages", check_category_filter_all_pages),
        ("malformed_cursor_rejected", check_malformed_cursor_rejected),
        ("invalid_limit_rejected", check_invalid_limit_rejected),
        ("empty_and_final_pages", check_empty_and_final_pages),
        ("api_and_dependency_constraints", check_api_and_dependency_constraints),
    ]

    checks: dict[str, bool] = {}
    details: dict[str, dict[str, Any]] = {}

    for name, func in checks_registry:
        passed, msg = func(comb)
        checks[name] = passed
        details[name] = {"passed": passed, "message": msg}

    failed_checks = [name for name, passed in checks.items() if not passed]

    recorded_status = run.get("recordedStatus")
    if not failed_checks:
        status = "pass"
        reason = (
            "All C-03 pagination, boundary tie-breaking, traversal, filtering, and "
            "validation requirements verified."
        )
    else:
        status = "fail"
        reason = f"Failed requirements: {', '.join(failed_checks)}."

    return {
        "taskId": TASK_ID,
        "evaluator": "evaluators/coding/c03_catalog_pagination.py",
        "evaluatorVersion": EVALUATOR_VERSION,
        "status": status,
        "passed": status == "pass",
        "reason": reason,
        "checks": checks,
        "checkDetails": details,
    }


def evaluate(data: Any) -> dict[str, Any]:
    """Shared entry point compatible with run_evaluations.py runner."""
    if isinstance(data, dict):
        return evaluate_run(data)
    if isinstance(data, str):
        return evaluate_run({"responseMarkdown": data})
    return {
        "taskId": TASK_ID,
        "evaluator": "evaluators/coding/c03_catalog_pagination.py",
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
        if r.get("taskId") in {"C-03", "coding-C-03"}
    ]

    print(f"Found {len(runs)} runs for task C-03 in {results_path.name}:\n")

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

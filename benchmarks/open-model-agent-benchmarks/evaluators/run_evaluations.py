#!/usr/bin/env python3
"""Discover and run benchmark evaluators dynamically."""

from __future__ import annotations

import argparse
import importlib.util
import json
import re
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

EVALUATOR_DIR = Path(__file__).resolve().parent
BENCHMARK_DIR = EVALUATOR_DIR.parent
DEFAULT_RESULTS = BENCHMARK_DIR / "results.json"

# Legacy task IDs such as reasoning-task-1 need a category prefix.
# New IDs such as tool-use-T-01 are parsed directly and don't need this map.
LEGACY_CATEGORY_PREFIXES = {
    "reasoning": "R",
    "tool-use": "T",
    "tool-call": "T",
    "web-search": "W",
    "coding": "C",
    "writing": "WR",
    "agent-workflow": "A",
}


def normalize_category(value: Any) -> str | None:
    if not isinstance(value, str) or not value.strip():
        return None

    return value.strip().lower().replace("_", "-").replace(" ", "-")


def discover_evaluators() -> dict[str, dict[str, Any]]:
    """Discover evaluator scripts under evaluators/<category>/."""
    evaluators: dict[str, dict[str, Any]] = {}

    for path in sorted(EVALUATOR_DIR.glob("*/*.py")):
        if path.name.startswith("_"):
            continue

        module_name = (
            f"benchmark_eval_"
            f"{path.parent.name.replace('-', '_')}_"
            f"{path.stem}"
        )

        spec = importlib.util.spec_from_file_location(module_name, path)

        if spec is None or spec.loader is None:
            raise RuntimeError(f"Could not load evaluator: {path}")

        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)

        task_id = getattr(module, "TASK_ID", None)
        evaluate = getattr(module, "evaluate", None)

        # A task evaluator must export TASK_ID and evaluate().
        if not isinstance(task_id, str) or not callable(evaluate):
            continue

        task_id = task_id.strip().upper()
        category = normalize_category(
            getattr(module, "CATEGORY_ID", path.parent.name)
        )

        if not task_id:
            raise RuntimeError(f"Empty TASK_ID in {path}")

        if not category:
            raise RuntimeError(f"Missing category for {path}")

        if task_id in evaluators:
            raise RuntimeError(
                f"Duplicate evaluator for task {task_id}: "
                f"{evaluators[task_id]['path']} and {path}"
            )

        evaluators[task_id] = {
            "category": category,
            "module": module,
            "path": path,
        }

    return evaluators


def get_task_code(run: dict[str, Any]) -> str | None:
    """
    Identify the task from the run.

    Resolution order:
    1. Explicit task code embedded in taskId, e.g. tool-use-T-01.
    2. Legacy task IDs, e.g. reasoning-task-1.
    3. taskMetadata.sourceTaskCode as a fallback.
    """
    task_id = run.get("taskId")

    if isinstance(task_id, str):
        normalized_id = task_id.strip().upper()

        # New-style IDs: tool-use-T-01, T-01, reasoning-R-03, etc.
        explicit_code = re.search(
            r"(?<![A-Z0-9])([A-Z]{1,3}-\d{2})(?!\d)",
            normalized_id,
        )

        if explicit_code:
            return explicit_code.group(1)

        # Legacy IDs such as reasoning-task-1.
        category = normalize_category(run.get("categoryId"))
        prefix = LEGACY_CATEGORY_PREFIXES.get(category or "")

        legacy_match = re.search(
            r"(?:^|[-_])task[-_]?0*(\d+)$",
            normalized_id,
            re.IGNORECASE,
        )

        if prefix and legacy_match:
            return f"{prefix}-{int(legacy_match.group(1)):02d}"

    # Metadata is a fallback because some imported records contain incorrect
    # or descriptive source labels. Prefer the actual taskId when possible.
    metadata = run.get("taskMetadata")

    if isinstance(metadata, dict):
        source_code = metadata.get("sourceTaskCode")

        if isinstance(source_code, str):
            match = re.search(
                r"(?<![A-Z0-9])([A-Z]{1,3}-\d{2})(?!\d)",
                source_code.strip().upper(),
            )
            if match:
                return match.group(1)

    return None


def evaluate_one_run(
    run: dict[str, Any],
    evaluator_module: Any,
) -> dict[str, Any]:
    """
    Evaluate one stored run.

    Prefer evaluate_run(run) when available, because tool-use evaluators
    may need tool names, trace data, and state evidence.
    Otherwise, preserve compatibility with evaluate(response).
    """
    run_evaluator = getattr(evaluator_module, "evaluate_run", None)

    if callable(run_evaluator):
        result = run_evaluator(run)
    else:
        result = evaluator_module.evaluate(
            run.get("responseMarkdown", "")
        )

    if not isinstance(result, dict):
        raise RuntimeError("Evaluator must return a dictionary.")

    if result.get("status") not in {"pass", "fail", "manual_review"}:
        raise RuntimeError(
            "Evaluator returned an unsupported status: "
            f"{result.get('status')!r}"
        )

    recorded_status = run.get("recordedStatus")
    result["recordedStatus"] = recorded_status

    if (
        result["status"] in {"pass", "fail"}
        and recorded_status in {"pass", "fail"}
    ):
        result["statusMatchesRecordedStatus"] = (
            result["status"] == recorded_status
        )
    else:
        result["statusMatchesRecordedStatus"] = None

    return result


def save_evaluation(
    run: dict[str, Any],
    result: dict[str, Any],
) -> None:
    """Store verification metadata without changing the original run status."""
    evaluation = run.get("evaluation")

    if not isinstance(evaluation, dict):
        evaluation = {}
        run["evaluation"] = evaluation

    previous_status = evaluation.get("status")

    if (
        previous_status
        and previous_status != "independently_verified"
        and not evaluation.get("previousEvaluationStatus")
    ):
        evaluation["previousEvaluationStatus"] = previous_status

    status = result["status"]

    evaluation["status"] = (
        "independently_verified"
        if status in {"pass", "fail"}
        else "manual_review_required"
    )
    evaluation["verifiedResult"] = (
        status if status in {"pass", "fail"} else None
    )
    evaluation["evaluator"] = result.get("evaluator")
    evaluation["evaluatorVersion"] = result.get("evaluatorVersion")
    evaluation["verificationMethod"] = (
        "deterministic_task_specific_script"
    )
    evaluation["verificationReason"] = result.get("reason")
    evaluation["statusMatchesRecordedStatus"] = (
        result.get("statusMatchesRecordedStatus")
    )
    evaluation["checkedAt"] = datetime.now(timezone.utc).isoformat(
        timespec="seconds"
    )

    # Preserve task-specific output such as checks and tool-trace details.
    standard_fields = {
        "taskId",
        "status",
        "passed",
        "reason",
        "evaluator",
        "evaluatorVersion",
        "recordedStatus",
        "statusMatchesRecordedStatus",
    }

    for key, value in result.items():
        if key not in standard_fields:
            evaluation[key] = value


def matches_filter(actual: Any, requested: str | None) -> bool:
    """Allow convenient case-insensitive partial filters."""
    if requested is None:
        return True

    if not isinstance(actual, str):
        return False

    return requested.casefold() in actual.casefold()


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Run discovered benchmark task evaluators."
    )
    parser.add_argument(
        "--results",
        type=Path,
        default=DEFAULT_RESULTS,
        help="Path to results.json.",
    )
    parser.add_argument(
        "--task",
        help="Evaluate one task, e.g. R-02 or T-01. Default: all tasks.",
    )
    parser.add_argument(
        "--category",
        help="Filter by category, e.g. reasoning or tool-use.",
    )
    parser.add_argument(
        "--model",
        help="Filter by model ID or a distinctive part of it.",
    )
    parser.add_argument(
        "--harness",
        help="Filter by harness ID, e.g. codex, claude-code, or opencode.",
    )
    parser.add_argument(
        "--write",
        action="store_true",
        help="Save evaluation metadata. Without this flag, preview only.",
    )
    args = parser.parse_args()

    try:
        evaluators = discover_evaluators()
    except Exception as exc:
        print(f"ERROR discovering evaluators: {exc}", file=sys.stderr)
        return 2

    if not evaluators:
        print("No task evaluators were found.", file=sys.stderr)
        return 2

    requested_task = args.task.strip().upper() if args.task else None
    requested_category = normalize_category(args.category)

    if requested_task and requested_task not in evaluators:
        print(
            f"No evaluator is registered for {requested_task}.",
            file=sys.stderr,
        )
        print(
            f"Available tasks: {', '.join(sorted(evaluators))}",
            file=sys.stderr,
        )
        return 2

    selected_tasks = {
        task_id
        for task_id, info in evaluators.items()
        if (
            requested_task is None
            or task_id == requested_task
        )
        and (
            requested_category is None
            or info["category"] == requested_category
        )
    }

    if not selected_tasks:
        print("No evaluators match the requested filters.", file=sys.stderr)
        return 2

    results_path = args.results.expanduser().resolve()

    if not results_path.is_file():
        print(f"Results file not found: {results_path}", file=sys.stderr)
        return 2

    try:
        with results_path.open("r", encoding="utf-8") as file:
            dataset = json.load(file)
    except (OSError, json.JSONDecodeError) as exc:
        print(f"Could not read results JSON: {exc}", file=sys.stderr)
        return 2

    if not isinstance(dataset, dict):
        print("The results JSON must be a JSON object.", file=sys.stderr)
        return 2

    runs = dataset.get("runs")

    if not isinstance(runs, list):
        print(
            "The results JSON must contain a top-level 'runs' array.",
            file=sys.stderr,
        )
        return 2

    targets: list[tuple[dict[str, Any], dict[str, Any], str]] = []

    for run in runs:
        if not isinstance(run, dict):
            continue

        task_code = get_task_code(run)

        if task_code not in selected_tasks:
            continue

        info = evaluators[task_code]
        run_category = normalize_category(run.get("categoryId"))

        # Avoid evaluating a record from a different category by accident.
        if run_category and run_category != info["category"]:
            continue

        if not matches_filter(run.get("modelId"), args.model):
            continue

        if not matches_filter(run.get("harnessId"), args.harness):
            continue

        try:
            result = evaluate_one_run(run, info["module"])
        except Exception as exc:
            print(
                f"ERROR evaluating {run.get('id', '<unknown run>')}: {exc}",
                file=sys.stderr,
            )
            return 2

        targets.append((run, result, task_code))

    print(f"Results file: {results_path}")
    print(f"Available evaluators: {', '.join(sorted(evaluators))}")
    print(f"Matching runs: {len(targets)}")
    print(
        "Mode: SAVE CHANGES"
        if args.write
        else "Mode: PREVIEW ONLY (JSON will not be changed)"
    )

    if args.model:
        print(f"Model filter: {args.model}")

    if args.harness:
        print(f"Harness filter: {args.harness}")

    if not targets:
        print("No matching runs found. Nothing was changed.")
        return 1

    counts: dict[str, dict[str, int]] = {}

    for run, result, task_code in targets:
        tally = counts.setdefault(
            task_code,
            {"pass": 0, "fail": 0, "manual_review": 0},
        )

        status = result["status"]
        count_key = (
            status if status in {"pass", "fail"} else "manual_review"
        )
        tally[count_key] += 1

        print(
            f"\n[{status.upper()}] "
            f"{run.get('id', '<run without id>')} | "
            f"{run.get('harnessId', 'unknown harness')} | "
            f"{run.get('modelId', 'unknown model')}"
        )
        print(f"  {result.get('reason', '')}")

        if result.get("statusMatchesRecordedStatus") is False:
            print(
                "  WARNING: verified result differs from recordedStatus."
            )

    print("\nSummary:")

    for task_code, tally in sorted(counts.items()):
        total = sum(tally.values())
        print(
            f"  {task_code}: {total} checked, "
            f"{tally['pass']} pass, "
            f"{tally['fail']} fail, "
            f"{tally['manual_review']} manual review"
        )

    if not args.write:
        print("\nPreview only. Add --write to save these results.")
        return 0

    for run, result, _ in targets:
        save_evaluation(run, result)

    backup_path = results_path.with_suffix(
        results_path.suffix + ".bak"
    )
    temp_path = results_path.with_suffix(
        results_path.suffix + ".tmp"
    )

    try:
        shutil.copy2(results_path, backup_path)

        with temp_path.open(
            "w",
            encoding="utf-8",
            newline="\n",
        ) as file:
            json.dump(dataset, file, indent=2, ensure_ascii=False)
            file.write("\n")

        # Validate the output before replacing the original JSON.
        with temp_path.open("r", encoding="utf-8") as file:
            json.load(file)

        temp_path.replace(results_path)

    except (OSError, json.JSONDecodeError) as exc:
        print(f"Could not save results: {exc}", file=sys.stderr)
        return 2

    finally:
        if temp_path.exists():
            try:
                temp_path.unlink()
            except OSError:
                pass

    print(f"\nUpdated {len(targets)} runs.")
    print(f"Backup saved to: {backup_path}")
    print("Original recordedStatus values were preserved.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
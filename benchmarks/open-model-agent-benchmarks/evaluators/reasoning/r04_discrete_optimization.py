"""R-04 evaluator. Reads task data and criteria from R-04.json."""

from __future__ import annotations

import json
import re
from itertools import combinations
from pathlib import Path
from typing import Any

TASK_FILE = (
    Path(__file__).resolve().parents[2]
    / "tasks"
    / "reasoning"
    / "R-04.json"
)
EVALUATOR_VERSION = "1.0.0"


def load_task() -> dict[str, Any]:
    with TASK_FILE.open(encoding="utf-8") as file:
        return json.load(file)


# Required by the shared parent runner for automatic discovery.
_TASK = load_task()
TASK_ID = str(_TASK["taskId"]).upper()
CATEGORY_ID = str(_TASK.get("categoryId", "reasoning")).lower()


def _plain(text: str) -> str:
    return re.sub(r"[*_`~]", "", text).strip()


def _item_list(response: str) -> str | None:
    """Extract selected items from a labeled answer or simple table."""
    cue = re.compile(
        r"(?:chosen|selected|optimal|best)\s+"
        r"(?:items?|improvements?|combination|set)"
        r"|(?:items?|improvements?)\s+(?:chosen|selected)"
        r"|(?:optimal|best|selected)?\s*combination",
        re.I,
    )
    list_pattern = re.compile(
        r"^\s*([A-Z](?:\s*(?:,|\band\b|\+|&)\s*[A-Z])*)\b",
        re.I,
    )

    for line in response.splitlines():
        if "|" in line:
            cells = [
                _plain(cell)
                for cell in line.strip().strip("|").split("|")
            ]

            for index, cell in enumerate(cells):
                match = cue.search(cell)
                if not match:
                    continue

                tail = cell[match.end():].strip()
                if not tail or tail in {":", "="}:
                    tail = " ".join(cells[index + 1:])
                else:
                    tail = re.sub(
                        r"^\s*(?::|=|is|are)\s*",
                        "",
                        tail,
                        flags=re.I,
                    )

                found = list_pattern.match(tail)
                if found:
                    return found.group(1).strip()

        clean = _plain(line)
        match = cue.search(clean)
        if match:
            tail = re.sub(
                r"^\s*(?::|=|is|are)\s*",
                "",
                clean[match.end():],
                flags=re.I,
            )
            found = list_pattern.match(tail)
            if found:
                return found.group(1).strip()

    return None


def _parse_ids(expression: str) -> list[str] | None:
    parts = re.split(
        r"\s*(?:,|\band\b|\+|&)\s*",
        expression.strip(),
        flags=re.I,
    )

    if not parts or any(
        not re.fullmatch(r"[A-Z]", part, re.I)
        for part in parts
    ):
        return None

    return [part.upper() for part in parts]


def _reported_total(response: str, metric: str) -> float | None:
    """Read a reported total, including expressions such as 4 + 6 = 10."""
    marker = re.compile(rf"\btotal\s+{metric}\b", re.I)
    other_metric = "gain" if metric == "cost" else "cost"
    other_marker = re.compile(
        rf"\btotal\s+{other_metric}\b",
        re.I,
    )
    number = re.compile(
        r"(?<![A-Za-z_])[-+]?\d+(?:,\d{3})*(?:\.\d+)?"
    )
    found_values = []

    for line in response.splitlines():
        line = _plain(line)

        for match in marker.finditer(line):
            next_metric = other_marker.search(line, match.end())
            end = next_metric.start() if next_metric else len(line)
            section = line[match.end():end]
            numbers = number.findall(section)

            if numbers:
                found_values.append(
                    float(numbers[-1].replace(",", ""))
                )

    unique_values = list(dict.fromkeys(found_values))
    return unique_values[0] if len(unique_values) == 1 else None


def _max_gain(
    items: list[dict[str, Any]],
    budget: float,
) -> float:
    """Calculate the maximum gain by checking every possible subset."""
    best = 0.0

    for size in range(len(items) + 1):
        for subset in combinations(items, size):
            cost = sum(float(item["cost"]) for item in subset)
            gain = sum(float(item["gain"]) for item in subset)

            if cost <= budget and gain > best:
                best = gain

    return best


def _same(a: float, b: float) -> bool:
    return abs(a - b) < 1e-9


def evaluate(response: str) -> dict[str, Any]:
    """Evaluate one model response against the task JSON."""
    try:
        task = load_task()
        problem = task["problemData"]
        config = task["evaluationConfig"]
        expected = task["expectedOutcome"]
        budget = float(problem["budget"])
        items = [
            {
                "id": str(item["id"]).upper(),
                "cost": float(item["cost"]),
                "gain": float(item["gain"]),
            }
            for item in problem["items"]
        ]
        criteria = task["evaluationCriteria"]
        measures = task["whatItMeasures"]
        expected_gain = float(expected["totalGain"])

    except (
        OSError,
        json.JSONDecodeError,
        KeyError,
        TypeError,
        ValueError,
    ) as exc:
        return {
            "taskId": TASK_ID,
            "status": "manual_review",
            "passed": False,
            "reason": f"Could not load R-04 task data: {exc}",
        }

    base = {
        "taskId": task.get("taskId", TASK_ID),
        "evaluator": (
            "evaluators/reasoning/r04_discrete_optimization.py"
        ),
        "evaluatorVersion": EVALUATOR_VERSION,
        "expectedOutcome": expected,
        "evaluationCriteria": criteria,
        "whatItMeasures": measures,
        "budget": budget,
    }

    if not isinstance(response, str) or not response.strip():
        return {
            **base,
            "status": "manual_review",
            "passed": False,
            "reason": "Response is empty.",
        }

    ids = [item["id"] for item in items]
    if not items or len(ids) != len(set(ids)):
        return {
            **base,
            "status": "manual_review",
            "passed": False,
            "reason": "Task JSON must contain items with unique IDs.",
        }

    if config.get("objective", "maximize_gain") != "maximize_gain":
        return {
            **base,
            "status": "manual_review",
            "passed": False,
            "reason": "Unsupported optimization objective in task JSON.",
        }

    optimal_gain = _max_gain(items, budget)

    if not _same(optimal_gain, expected_gain):
        return {
            **base,
            "status": "manual_review",
            "passed": False,
            "calculatedOptimalGain": optimal_gain,
            "reason": (
                "The expected maximum gain in R-04.json does not "
                "match the calculated optimum. Review the task data."
            ),
        }

    expression = _item_list(response)
    selected = _parse_ids(expression) if expression else None

    if not selected:
        return {
            **base,
            "status": "manual_review",
            "passed": False,
            "calculatedOptimalGain": optimal_gain,
            "reason": (
                "Could not reliably identify the selected combination."
            ),
        }

    duplicates = sorted(
        {item for item in selected if selected.count(item) > 1}
    )
    unknown = sorted(set(selected) - set(ids))

    if duplicates and not config.get("allowDuplicateItems", False):
        return {
            **base,
            "status": "fail",
            "passed": False,
            "selectedItems": selected,
            "duplicateItems": duplicates,
            "reason": "The selected combination repeats an item.",
        }

    if unknown and config.get("requireKnownItems", True):
        return {
            **base,
            "status": "fail",
            "passed": False,
            "selectedItems": selected,
            "unknownItems": unknown,
            "reason": "The combination includes unknown item IDs.",
        }

    item_lookup = {item["id"]: item for item in items}
    chosen = [
        item_lookup[item]
        for item in selected
        if item in item_lookup
    ]

    actual_cost = sum(item["cost"] for item in chosen)
    actual_gain = sum(item["gain"] for item in chosen)
    reported_cost = _reported_total(response, "cost")
    reported_gain = _reported_total(response, "gain")

    problems = []

    if actual_cost > budget:
        problems.append(
            f"Calculated cost {actual_cost:g} exceeds budget {budget:g}."
        )

    if not _same(actual_gain, optimal_gain):
        problems.append(
            f"Calculated gain {actual_gain:g} is below the maximum "
            f"gain {optimal_gain:g}."
        )

    if config.get("requireReportedCost", True):
        if reported_cost is None:
            problems.append("A clear total cost was not reported.")
        elif not _same(reported_cost, actual_cost):
            problems.append(
                f"Reported cost {reported_cost:g} does not match "
                f"calculated cost {actual_cost:g}."
            )

    if config.get("requireReportedGain", True):
        if reported_gain is None:
            problems.append("A clear total gain was not reported.")
        elif not _same(reported_gain, actual_gain):
            problems.append(
                f"Reported gain {reported_gain:g} does not match "
                f"calculated gain {actual_gain:g}."
            )

    if not config.get("acceptAnyOptimalCombination", True):
        expected_items = sorted(
            str(item).upper() for item in expected.get("items", [])
        )
        if sorted(selected) != expected_items:
            problems.append(
                "Selected items do not match expectedOutcome.items."
            )

    result = {
        **base,
        "selectedItems": selected,
        "calculatedTotalCost": actual_cost,
        "reportedTotalCost": reported_cost,
        "calculatedTotalGain": actual_gain,
        "reportedTotalGain": reported_gain,
        "calculatedOptimalGain": optimal_gain,
        "withinBudget": actual_cost <= budget,
        "optimalCombination": _same(actual_gain, optimal_gain),
    }

    if problems:
        return {
            **result,
            "status": "fail",
            "passed": False,
            "reason": " ".join(problems),
        }

    return {
        **result,
        "status": "pass",
        "passed": True,
        "reason": (
            f"The combination meets the budget and achieves the maximum "
            f"gain of {optimal_gain:g}; reported totals match."
        ),
    }
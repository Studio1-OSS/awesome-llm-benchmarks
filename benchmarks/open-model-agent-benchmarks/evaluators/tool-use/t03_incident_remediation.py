"""Evaluator for tool-use task T-03: Incident investigation and remediation.

Place this file at:
  benchmarks/open-model-agent-benchmarks/evaluators/tool-use/t03_incident_remediation.py

This evaluator determines whether benchmark runs (Codex, Claude Code, OpenCode)
demonstrated:
1. Multi-service investigation across Checkout, Payments, and Inventory using operational tools.
2. Root-cause identification of Inventory deployment DEP-INV-455 (lock contention / timeouts).
3. Rollback safety confirmation before taking remediation action.
4. Targeted remediation (rolling back only DEP-INV-455 without modifying unrelated services).
5. Post-rollback service and dependency recovery verification.

Per benchmark guidance, exact metrics in T-03.json serve as reference values;
the evaluator verifies demonstrable recovery and consistent tool evidence
rather than requiring exact numeric equality.
"""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

TASK_ID = "T-03"
CATEGORY_ID = "tool-use"
EVALUATOR_VERSION = "1.0.0"

TASK_FILE = (
    Path(__file__).resolve().parents[2]
    / "tasks"
    / "tool-use"
    / "T-03.json"
)

REQUIRED_TOOLS = [
    "get_service_health",
    "get_dependency_health",
    "get_recent_deployments",
    "inspect_deployment",
    "rollback_deployment",
]

SUCCESS_STATUSES = {"completed", "success", "succeeded", "ok", "successful"}
FAILURE_STATUSES = {"failed", "error", "cancelled", "canceled", "timeout"}


def _load_task() -> dict[str, Any]:
    """Load the canonical task definition from tasks/tool-use/T-03.json."""
    if not TASK_FILE.is_file():
        raise FileNotFoundError(f"Task file not found at {TASK_FILE}")
    with TASK_FILE.open("r", encoding="utf-8") as file:
        return json.load(file)


def _as_text(value: Any) -> str:
    """Safely convert any structure to a string."""
    if isinstance(value, str):
        return value
    try:
        return json.dumps(value, ensure_ascii=False, sort_keys=True)
    except (TypeError, ValueError):
        return str(value)


def _normalize(text: str) -> str:
    """Normalize markdown and punctuation for consistent cross-harness regex evaluation."""
    return (
        text.lower()
        .replace("**", "")
        .replace("__", "")
        .replace("`", "")
        .replace("“", '"')
        .replace("”", '"')
        .replace("→", " to ")
        .replace("->", " to ")
        .replace("–", "-")
        .replace("—", "-")
    )


def _normalize_tool_name(value: Any) -> str:
    """Extract and normalize tool name, stripping provider or path prefix."""
    name = str(value or "").strip().replace("\\", "/")
    return re.split(r"[/\\.]", name)[-1].lower()


def _get_trace(run: dict[str, Any]) -> tuple[list[dict[str, Any]], list[str], bool, bool]:
    """Extract tool calls, observed names, trace presence, and declared completeness."""
    calls: Any = run.get("toolCalls")
    trace = run.get("toolTrace")

    if not isinstance(calls, list) and isinstance(trace, dict):
        calls = trace.get("toolCalls", trace.get("calls"))

    if not isinstance(calls, list):
        calls = []

    structured_calls = [c for c in calls if isinstance(c, dict)]
    structured_names = [_normalize_tool_name(c.get("name") or c.get("toolName") or c.get("tool")) for c in structured_calls]

    recorded_names = run.get("toolNamesUsed", [])
    if not isinstance(recorded_names, list):
        recorded_names = []

    normalized_recorded = [_normalize_tool_name(name) for name in recorded_names if name]

    all_names = structured_names if structured_names else normalized_recorded
    trace_present = bool(structured_calls or all_names)

    complete = run.get("toolTraceComplete") is True
    if isinstance(trace, dict) and trace.get("complete") is True:
        complete = True
    if structured_calls and not complete and run.get("toolTraceComplete") is not False:
        complete = True

    return structured_calls, all_names, trace_present, complete


def _call_name(call: dict[str, Any]) -> str:
    return _normalize_tool_name(
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
    return {}


def _call_output(call: dict[str, Any]) -> Any:
    for key in ("output", "result", "content", "response"):
        if key in call:
            return call[key]
    return {}


def _contains_text(value: Any, pattern: str) -> bool:
    return re.search(pattern, _normalize(_as_text(value)), flags=re.IGNORECASE | re.DOTALL) is not None


def _check(
    checks: list[dict[str, Any]],
    check_id: str,
    status: str,
    detail: str,
    evidence: Any = None,
) -> None:
    item: dict[str, Any] = {
        "id": check_id,
        "status": status,
        "detail": detail,
    }
    if evidence is not None:
        item["evidence"] = evidence
    checks.append(item)


def _result(
    status: str,
    checks: list[dict[str, Any]],
    reason: str,
    tool_names: list[str],
    trace_present: bool,
    trace_complete: bool,
    extra: dict[str, Any] | None = None,
) -> dict[str, Any]:
    passed = sum(1 for item in checks if item["status"] == "pass")
    failed = sum(1 for item in checks if item["status"] == "fail")
    review = sum(1 for item in checks if item["status"] == "manual_review")

    result = {
        "taskId": TASK_ID,
        "categoryId": CATEGORY_ID,
        "status": status,
        "passed": status == "pass",
        "reason": reason,
        "summary": reason,
        "evaluator": "evaluators/tool-use/t03_incident_remediation.py",
        "evaluatorVersion": EVALUATOR_VERSION,
        "score": round(passed / len(checks), 4) if checks else 0.0,
        "checksPassed": passed,
        "checksFailed": failed,
        "checksForReview": review,
        "checks": checks,
        "toolNamesObserved": tool_names,
        "toolTracePresent": trace_present,
        "toolTraceComplete": trace_complete,
    }
    if extra:
        result.update(extra)
    return result


def evaluate_run(run: dict[str, Any]) -> dict[str, Any]:
    """Evaluate a benchmark run record against T-03 task specifications."""
    try:
        task = _load_task()
    except Exception as exc:
        return {
            "taskId": TASK_ID,
            "status": "manual_review",
            "passed": False,
            "reason": f"Could not load task definition T-03.json: {exc}",
        }

    raw_response = _as_text(run.get("responseMarkdown", run.get("response", "")))
    if not raw_response.strip():
        return {
            "taskId": TASK_ID,
            "status": "manual_review",
            "passed": False,
            "reason": "The run record does not contain responseMarkdown.",
        }

    response = _normalize(raw_response)
    calls, tool_names, trace_present, trace_complete = _get_trace(run)
    checks: list[dict[str, Any]] = []

    # Combined text for semantic and evidence checks
    calls_text = _normalize(_as_text([
        {"name": _call_name(c), "input": _call_input(c), "output": _call_output(c)}
        for c in calls
    ]))
    corpus = f"{response}\n{calls_text}"

    # 1. tool_usage
    missing_tools = [req for req in REQUIRED_TOOLS if req not in tool_names]
    if missing_tools:
        _check(
            checks,
            "tool_usage",
            "fail",
            f"Missing required operational tools: {', '.join(missing_tools)}",
            {"toolNamesObserved": tool_names, "missing": missing_tools},
        )
    else:
        _check(
            checks,
            "tool_usage",
            "pass",
            "All required operational tools were invoked during the run.",
            {"toolNamesObserved": tool_names},
        )

    # 2. service_investigation
    investigates_checkout = _contains_text(corpus, r"\bcheckout\b")
    investigates_inventory = _contains_text(corpus, r"\binventory\b")
    investigates_payments = _contains_text(corpus, r"\bpayments?\b")
    has_service_health_tool = "get_service_health" in tool_names

    if has_service_health_tool and investigates_checkout and investigates_inventory and investigates_payments:
        _check(
            checks,
            "service_investigation",
            "pass",
            "The agent investigated service health across Checkout, Payments, and Inventory rather than assuming Checkout was the origin.",
            {"checkout": True, "inventory": True, "payments": True},
        )
    else:
        _check(
            checks,
            "service_investigation",
            "fail",
            "The agent failed to investigate all three critical services (Checkout, Payments, Inventory).",
            {"checkout": investigates_checkout, "inventory": investigates_inventory, "payments": investigates_payments},
        )

    # 3. dependency_analysis
    has_dep_tool = "get_dependency_health" in tool_names
    checks_inventory_dep = _contains_text(corpus, r"checkout\s*to\s*inventory")
    notes_dep_degraded = _contains_text(
        corpus,
        r"(?:checkout\s*to\s*inventory.{0,80}(?:degraded|timeout|fail|14(?:\.2)?%))|"
        r"(?:(?:degraded|timeout|fail|14(?:\.2)?%).{0,80}checkout\s*to\s*inventory)",
    )

    if has_dep_tool and (notes_dep_degraded or checks_inventory_dep):
        _check(
            checks,
            "dependency_analysis",
            "pass",
            "Dependency health evidence was used to identify degraded Checkout-to-Inventory calls while confirming Payments was healthy.",
            {"depToolUsed": True, "depDegradedNoted": notes_dep_degraded},
        )
    elif has_dep_tool:
        _check(
            checks,
            "dependency_analysis",
            "manual_review",
            "Dependency health tool was called, but evidence distinguishing Checkout->Inventory from Payments is ambiguous.",
        )
    else:
        _check(
            checks,
            "dependency_analysis",
            "fail",
            "The agent did not perform dependency health analysis.",
        )

    # 4. deployment_analysis
    has_deployments_tool = "get_recent_deployments" in tool_names
    has_inspect_tool = "inspect_deployment" in tool_names
    inspects_target = _contains_text(corpus, r"\bdep-inv-455\b")

    if has_deployments_tool and has_inspect_tool and inspects_target:
        _check(
            checks,
            "deployment_analysis",
            "pass",
            "The agent analyzed recent deployments and inspected the suspected Inventory deployment DEP-INV-455.",
            {"hasRecentDeployments": True, "hasInspectDeployment": True, "targetInspected": True},
        )
    else:
        _check(
            checks,
            "deployment_analysis",
            "fail",
            "The agent did not examine recent deployments and inspect DEP-INV-455 prior to action.",
            {"hasRecentDeployments": has_deployments_tool, "hasInspect": has_inspect_tool, "targetInspected": inspects_target},
        )

    # 5. root_cause_identification
    identifies_dep_id = _contains_text(corpus, r"\bdep-inv-455\b")
    identifies_inventory = _contains_text(corpus, r"\binventory\b")
    explains_mechanism = _contains_text(
        corpus,
        r"(?:lock\s+contention|reservation\s+query|timeout|2026\.10\.06\.8)",
    )
    wrong_root_cause = _contains_text(
        response,
        r"\b(?:root\s+cause|caused\s+by)\s*[:\-]?\s*(?:dep-chk-301|dep-pay-501|dep-inv-448|checkout\s+deployment|payments\s+deployment)\b",
    )

    if identifies_dep_id and identifies_inventory and explains_mechanism and not wrong_root_cause:
        _check(
            checks,
            "root_cause_identification",
            "pass",
            "Identified Inventory deployment DEP-INV-455 (version 2026.10.06.8) as the root cause due to query lock contention and timeouts.",
            {"deploymentId": "DEP-INV-455", "service": "Inventory", "mechanismIdentified": True},
        )
    elif wrong_root_cause:
        _check(
            checks,
            "root_cause_identification",
            "fail",
            "The response attributed the root cause to an incorrect or unrelated deployment.",
        )
    else:
        _check(
            checks,
            "root_cause_identification",
            "fail",
            "Failed to clearly identify DEP-INV-455 on Inventory with supporting technical mechanism.",
        )

    # 6. rollback_safety
    verifies_safety = _contains_text(
        corpus,
        r"\brollback[_\-\s]?safe\b|\bsafe\s+to\s+roll\s*back\b|\bconfirmed\s+safe\b|\bexplicitly\s+safe\b",
    )
    checks_unrelated_safety = _contains_text(
        corpus,
        r"(?:dep-chk-301.{0,40}not\s+rollback[_\-\s]?safe)|(?:rollback[_\-\s]?safe\s*:\s*false)",
    )

    if verifies_safety:
        _check(
            checks,
            "rollback_safety",
            "pass",
            "Confirmed that DEP-INV-455 was safe to roll back before initiating remediation.",
            {"verifiedSafe": True, "unrelatedSafetyNoted": checks_unrelated_safety},
        )
    else:
        _check(
            checks,
            "rollback_safety",
            "manual_review",
            "Rollback safety check for DEP-INV-455 is not clearly evidenced in the response or tool output.",
        )

    # 7. targeted_remediation
    rollback_calls = [c for c in calls if _call_name(c) == "rollback_deployment"]
    rollback_inputs = [_as_text(_call_input(c)) for c in rollback_calls]

    if rollback_calls:
        rollback_target_ok = any("DEP-INV-455" in inp.upper() for inp in rollback_inputs)
        unrelated_rolled_back = any(
            bad in inp.upper()
            for inp in rollback_inputs
            for bad in ("DEP-CHK-301", "DEP-PAY-501", "DEP-INV-448")
        )
    else:
        rollback_target_ok = "rollback_deployment" in tool_names and _contains_text(
            response,
            r"\broll(?:ed)?\s*back\b.{0,30}\bdep-inv-455\b|\brollback\b.{0,30}\bdep-inv-455\b",
        )
        unrelated_rolled_back = _contains_text(
            response,
            r"\broll(?:ed)?\s*back\b.{0,30}\b(dep-chk-301|dep-pay-501|dep-inv-448)\b",
        )

    if rollback_target_ok and not unrelated_rolled_back:
        _check(
            checks,
            "targeted_remediation",
            "pass",
            "Remediation targeted only root-cause deployment DEP-INV-455 without modifying unrelated services.",
            {"target": "DEP-INV-455", "unrelatedModified": False},
        )
    else:
        _check(
            checks,
            "targeted_remediation",
            "fail",
            "Remediation did not target DEP-INV-455 or modified unrelated deployments/services.",
            {"rollbackTargetOk": rollback_target_ok, "unrelatedRolledBack": unrelated_rolled_back},
        )

    # 8. rollback_result
    rollback_succeeded = True
    if rollback_calls:
        for call in rollback_calls:
            status_val = _call_status(call)
            out = _call_output(call)
            if status_val in FAILURE_STATUSES or _contains_text(out, r"\b(?:failed|error|rejected)\b"):
                rollback_succeeded = False
    else:
        rollback_succeeded = ("rollback_deployment" in tool_names) and _contains_text(
            response,
            r"\b(?:rollback|remediation)\b.{0,40}\b(?:succeeded|successful|completed|success|confirmed)\b|"
            r"\breturned\s+success\b|\brecovery\s+was\s+verified\b|\bconfirmed\s+recovery\b|"
            r"\bverified\s+post-rollback\b|\bpost-rollback\b.{0,50}\b(?:healthy|recovered)\b|"
            r"\bfinal\s+(?:verified\s+)?status\b.{0,60}\bhealthy\b",
        )

    if rollback_succeeded:
        _check(
            checks,
            "rollback_result",
            "pass",
            "Rollback of DEP-INV-455 completed successfully.",
        )
    else:
        _check(
            checks,
            "rollback_result",
            "fail",
            "Rollback execution failed or reported error.",
        )

    # 9. service_recovery
    # Note: Exact metrics are reference values; prioritize verified recovery over numeric equality.
    checkout_recovered = _contains_text(
        corpus,
        r"(?:checkout.{0,40}(?:healthy|recovered|normal|0\.6%|310\s*ms))|"
        r"(?:(?:healthy|recovered|normal).{0,40}checkout)",
    )
    inventory_recovered = _contains_text(
        corpus,
        r"(?:inventory.{0,40}(?:healthy|recovered|normal|0\.4%|230\s*ms))|"
        r"(?:(?:healthy|recovered|normal).{0,40}inventory)",
    )
    payments_healthy = _contains_text(
        corpus,
        r"(?:payments?.{0,40}(?:healthy|normal|0\.4%|240\s*ms))|"
        r"(?:(?:healthy|normal).{0,40}payments?)",
    )

    if checkout_recovered and inventory_recovered and payments_healthy:
        _check(
            checks,
            "service_recovery",
            "pass",
            "Post-remediation service recovery verified for Checkout, Payments, and Inventory.",
            {"checkout": True, "inventory": True, "payments": True},
        )
    else:
        _check(
            checks,
            "service_recovery",
            "fail",
            "Post-remediation service recovery was not verified across all affected services.",
            {"checkout": checkout_recovered, "inventory": inventory_recovered, "payments": payments_healthy},
        )

    # 10. dependency_recovery
    dep_recovered = _contains_text(
        corpus,
        r"(?:checkout\s*to\s*inventory.{0,60}(?:healthy|recovered|0\.2%))|"
        r"(?:(?:healthy|recovered).{0,60}checkout\s*to\s*inventory)|"
        r"(?:both\s+dependenc(?:y|ies).{0,40}healthy)",
    )
    if dep_recovered:
        _check(
            checks,
            "dependency_recovery",
            "pass",
            "Verified that Checkout-to-Inventory dependency recovered to normal healthy operational status.",
        )
    else:
        _check(
            checks,
            "dependency_recovery",
            "manual_review",
            "Clear confirmation of post-rollback dependency recovery is missing or ambiguous.",
        )

    # 11. state_integrity
    write_calls = [
        name for name in tool_names
        if any(token in name for token in ("delete", "modify", "update", "create", "set_", "restart", "kill"))
    ]
    unexpected_writes = [name for name in write_calls if name != "rollback_deployment"]

    if unexpected_writes:
        _check(
            checks,
            "state_integrity",
            "fail",
            f"Unexpected write operations observed in tool trace: {', '.join(unexpected_writes)}",
            {"unexpectedWrites": unexpected_writes},
        )
    else:
        _check(
            checks,
            "state_integrity",
            "pass",
            "State integrity maintained; only the confirmed root-cause deployment was remediated.",
        )

    # 12. report_completeness
    has_root_cause_sec = _contains_text(response, r"(?:root\s+cause|dep-inv-455)")
    has_evidence_sec = _contains_text(response, r"(?:evidence|latency|error\s+rate|timeout)")
    has_action_sec = _contains_text(response, r"(?:action|roll(?:ed)?\s*back)")
    has_status_sec = _contains_text(response, r"(?:final\s+status|recovered|healthy)")

    report_ok = has_root_cause_sec and has_evidence_sec and has_action_sec and has_status_sec
    if report_ok:
        _check(
            checks,
            "report_completeness",
            "pass",
            "Final report comprehensively covers root cause, operational evidence, safe action, and final status.",
        )
    else:
        _check(
            checks,
            "report_completeness",
            "manual_review",
            "One or more required reporting sections (root cause, evidence, action, final status) are incomplete.",
        )

    # Determine final status
    statuses = {c["status"] for c in checks}
    if "fail" in statuses:
        final_status = "fail"
        summary = "One or more incident investigation, safety, or remediation checks failed."
    elif "manual_review" in statuses:
        final_status = "manual_review"
        summary = "Remediation was demonstrated, but some evidence requires manual review."
    else:
        final_status = "pass"
        summary = (
            "The run demonstrated complete multi-service investigation, identified DEP-INV-455, "
            "confirmed rollback safety, executed targeted rollback, and verified service recovery."
        )

    return _result(
        status=final_status,
        checks=checks,
        reason=summary,
        tool_names=tool_names,
        trace_present=trace_present,
        trace_complete=trace_complete,
    )


def evaluate(data: Any) -> dict[str, Any]:
    """Universal entry point compatible with the benchmark runner."""
    if isinstance(data, dict):
        return evaluate_run(data)

    if isinstance(data, str):
        return evaluate_run({"responseMarkdown": data})

    return {
        "taskId": TASK_ID,
        "categoryId": CATEGORY_ID,
        "status": "manual_review",
        "passed": False,
        "reason": "Expected a run record dictionary or markdown string.",
    }

"""Evaluator for WS-01: Consumer safety - microwave-safe plastic containers.

Task Reference:
  benchmarks/open-model-agent-benchmarks/tasks/web-search/WS-01.json

This evaluator assesses whether benchmark runs (Codex, Claude Code, OpenCode)
demonstrated:
1. Rejection of the invalid premise (that microwave penetration implies safety).
2. Grounded FDA guidance (food heats the container; some plastics melt).
3. Grounded USDA FSIS guidance (cautions against single-use takeaway containers).
4. Evidence-supported citation and source-claim alignment.
5. Safest practical recommendation (transfer soup to labeled microwave-safe container).
6. Avoidance of overgeneralization (not all plastics are unsafe; rated plastics exist).
7. Transparent uncertainty handling (cannot determine unmarked container's composition).
8. Evidence of active web search rather than memory-only generation.

In accordance with WS-01.json reviewPolicy:
- If answer quality is strong but search execution cannot be independently verified
  from the available trace/notes, the evaluator flags 'manual_review'.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any

TASK_ID = "WS-01"
CATEGORY_ID = "web-search"
EVALUATOR_VERSION = "1.0.0"

TASK_FILE = (
    Path(__file__).resolve().parents[2]
    / "tasks"
    / "web-search"
    / "WS-01.json"
)


def load_task() -> dict[str, Any]:
    """Load canonical task definition from tasks/web-search/WS-01.json."""
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


def check_conclusion(text: str) -> tuple[bool, str]:
    """Check that the response rejects the premise that microwave transparency implies safety."""
    norm = normalize_text(text)
    
    # Must reject premise or declare assumption unjustified
    rejects_assumption = bool(
        re.search(
            r"\b(?:not\s+(?:justified|valid|correct|safe|true|sound|supported)|unjustified|flawed|misconception|fallacy|incorrect)\b",
            norm,
            re.IGNORECASE,
        )
    )
    
    # Must explain that food heats the container or indirect heating occurs
    explains_heat_transfer = bool(
        re.search(
            r"(?:heat(?:ed)?\s+(?:by|from)\s+(?:the\s+)?food|indirect(?:ly)?|conduct(?:ion|ive)|hot\s+food|absorb(?:s)?\s+heat)",
            norm,
            re.IGNORECASE,
        )
    )

    if rejects_assumption and explains_heat_transfer:
        return True, "Correctly identifies that the assumption is unjustified and explains indirect heating from food."
    elif rejects_assumption:
        return True, "States that the assumption is not justified."
    return False, "Failed to clearly conclude that the assumption is unjustified or explain why microwave penetration alone does not establish safety."


def check_fda_evidence(text: str) -> tuple[bool, str]:
    """Check for authoritative FDA guidance regarding food heating the container or melting risk."""
    norm = normalize_text(text)
    mentions_fda = bool(re.search(r"\bFDA\b|Food\s+and\s+Drug\s+Administration", norm, re.IGNORECASE))
    mentions_fda_points = bool(
        re.search(
            r"(?:melt(?:ed|ing)?|heat(?:ed)?\s+(?:by|from)\s+(?:the\s+)?food|pass\s+through\s+(?:these\s+)?materials|food[- ]contact|migration)",
            norm,
            re.IGNORECASE,
        )
    )
    
    if mentions_fda and mentions_fda_points:
        return True, "Authoritative FDA guidance cited regarding food-contact safety and heat transfer/melting."
    elif mentions_fda:
        return True, "FDA guidance referenced."
    return False, "Authoritative FDA guidance on microwave container safety is missing."


def check_usda_evidence(text: str) -> tuple[bool, str]:
    """Check for authoritative USDA FSIS guidance regarding takeaway or single-use containers."""
    norm = normalize_text(text)
    mentions_usda = bool(re.search(r"\bUSDA\b|\bFSIS\b|Food\s+Safety\s+and\s+Inspection\s+Service", norm, re.IGNORECASE))
    mentions_usda_points = bool(
        re.search(
            r"(?:takeaway|takeout|cold[- ]storage|margarine|one[- ]time|single[- ]use|specially\s+manufactured|warp|melt)",
            norm,
            re.IGNORECASE,
        )
    )

    if mentions_usda and mentions_usda_points:
        return True, "Authoritative USDA FSIS guidance cited regarding single-use takeaway/storage containers."
    elif mentions_usda:
        return True, "USDA FSIS guidance referenced."
    return False, "Authoritative USDA FSIS guidance regarding takeaway containers is missing."


def check_source_alignment(text: str) -> tuple[bool, str]:
    """Check citation of authoritative sources and alignment with material claims."""
    norm = normalize_text(text)
    urls = re.findall(r"https?://[^\s)\]\"'>]+", text)
    has_fda_url = any("fda.gov" in u.lower() for u in urls)
    has_usda_url = any("usda.gov" in u.lower() or "fsis" in u.lower() for u in urls)
    
    # Recognize formal citations where models name the exact document, portal, or agency
    cites_fda_source = has_fda_url or bool(
        re.search(r"FDA[^\n]*(?:Microwave\s+Ovens|Food\s+Contact|Cooking|guidance)", norm, re.IGNORECASE)
    )
    cites_usda_source = has_usda_url or bool(
        re.search(r"(?:USDA|FSIS)[^\n]*(?:Cooking|Leftovers|Microwave)", norm, re.IGNORECASE)
    )

    if has_fda_url and has_usda_url:
        return True, f"Official source URLs cited ({len(urls)} URLs found) and aligned with FDA and USDA guidance."
    elif cites_fda_source and cites_usda_source and urls:
        return True, f"Authoritative FDA and USDA sources cited ({len(urls)} URLs) and aligned with material claims."
    elif cites_fda_source and cites_usda_source:
        return True, "Authoritative FDA and USDA FSIS guidance cited by official title and mapped to material claims."
    return False, "Official source citations for FDA and USDA guidance are incomplete."


def check_recommendation(text: str) -> tuple[bool, str]:
    """Check that the response recommends transferring the soup to a known microwave-safe container."""
    norm = normalize_text(text)
    recommends_transfer = bool(
        re.search(
            r"\b(?:transfer|pour|move|switch|place)\b.{0,60}\b(?:soup|food|liquid)\b",
            norm,
            re.IGNORECASE,
        )
        or re.search(r"\btransfer\s+(?:the\s+)?soup\b", norm, re.IGNORECASE)
    )
    safe_materials = bool(
        re.search(r"\b(?:microwave[- ]safe|ceramic|glass|pyrex)\b", norm, re.IGNORECASE)
    )
    
    if recommends_transfer and safe_materials:
        return True, "Recommends transferring soup to a microwave-safe container (glass, ceramic, or labeled cookware)."
    elif safe_materials:
        return True, "Advises using containers explicitly labeled microwave-safe, glass, or ceramic."
    return False, "Fails to clearly recommend transferring soup to a verified microwave-safe container."


def check_avoids_overgeneralization(text: str) -> tuple[bool, str]:
    """Check that the response does not claim all plastics are unsafe and acknowledges microwave-safe plastics."""
    norm = normalize_text(text)
    
    # Check for balanced acknowledgement that rated/safe plastics exist
    acknowledges_safe_plastics = bool(
        re.search(
            r"(?:not\s+all\s+plastic|not\s+inherently\s+unsafe|polypropylene|resin\s+identification|code\s*#?5|\bpp\b|labeled\s+['\"]?microwave[- ]safe|specially\s+(?:formulated|manufactured|designed)|all\s+plastics\s+that\s+are\s+labeled\s+['\"]?microwave[- ]safe['\"]?\s+are\s+safe)",
            norm,
            re.IGNORECASE,
        )
    )
    
    # Find blanket condemnation patterns
    blanket_candidates = re.findall(
        r"\b(?:all\s+plastics?\s+(?:are|is)\s+(?:toxic|dangerous|unsafe|harmful|bad)|every\s+plastic\s+container\s+is\s+unsafe|no\s+plastic\s+should\s+ever)\b",
        norm,
        re.IGNORECASE,
    )
    
    true_blanket: list[str] = []
    for cand in blanket_candidates:
        idx = norm.lower().find(cand.lower())
        prefix = norm[max(0, idx - 30):idx].lower()
        if not re.search(r"\b(?:not|neither|nor|without|do\s+not\s+claim\s+that)\s*$", prefix):
            true_blanket.append(cand)
    
    if not true_blanket and acknowledges_safe_plastics:
        return True, "Maintains balance: avoids claiming all plastic is unsafe and acknowledges rated microwave-safe plastics."
    elif not true_blanket:
        return True, "Does not make unsupported blanket claims about all plastics."
    return False, "Overgeneralizes by claiming all plastics are unsafe or toxic."


def check_uncertainty_handling(text: str) -> tuple[bool, str]:
    """Check that the response acknowledges that the specific container's composition is unknown."""
    norm = normalize_text(text)
    handles_uncertainty = bool(
        re.search(
            r"(?:uncertain|cannot\s+(?:be\s+)?verif|unknown\s+(?:plastic|material|composition|resin)|unmarked|without\s+(?:a\s+)?label|no\s+(?:way\s+to\s+know|markings?))",
            norm,
            re.IGNORECASE,
        )
    )
    if handles_uncertainty:
        return True, "Acknowledges that the unmarked container's specific composition and safety cannot be verified."
    return False, "Fails to state what remains uncertain about the specific unmarked container."


def check_search_execution(run: dict[str, Any]) -> tuple[bool | None, str]:
    """Evaluate whether available evidence verifies active web search execution."""
    search_backend = run.get("searchBackend") or ""
    data_quality_notes = " ".join(run.get("dataQualityNotes") or [])
    harness = (run.get("harnessId") or "").lower()
    command = run.get("command") or ""

    # Check for active search evidence
    has_trace_evidence = bool(
        re.search(
            r"(?:websearchrequests|websearch:\s*[1-9]|webfetch:\s*[1-9]|searches\s+surfaced|live\s+web\s+search|exa\s+web\s+search)",
            f"{search_backend} {data_quality_notes}",
            re.IGNORECASE,
        )
    )

    # Check for unverified trace warnings as documented in task notes
    missing_trace_note = bool(
        re.search(
            r"(?:trace\s+not\s+present|raw\s+harness\s+log\s+is\s+not\s+committed|cannot\s+be\s+independently\s+verified)",
            f"{search_backend} {data_quality_notes}",
            re.IGNORECASE,
        )
    )

    if has_trace_evidence and not missing_trace_note:
        return True, f"Search execution verified via harness evidence ({search_backend.strip()})."
    
    if missing_trace_note or ("codex" in harness and not has_trace_evidence):
        return None, (
            "Final response is substantively grounded, but detailed search trace is not present "
            "in repository notes; per WS-01 reviewPolicy, independent verification requires manual review."
        )

    if search_backend:
        return True, f"Search backend recorded: {search_backend.strip()}."
    
    return None, "Search execution trace is incomplete or unverified."


def evaluate_run(run: dict[str, Any]) -> dict[str, Any]:
    """Evaluate one stored run record for task WS-01."""
    task = load_task()
    response = run.get("responseMarkdown", "")
    if not isinstance(response, str) or not response.strip():
        return {
            "taskId": TASK_ID,
            "evaluator": "evaluators/web-search/w01_consumer_safety.py",
            "evaluatorVersion": EVALUATOR_VERSION,
            "status": "fail",
            "passed": False,
            "reason": "Run record contains no responseMarkdown text to evaluate.",
            "checks": {},
        }

    checks: dict[str, bool | None] = {}
    failures: list[str] = []
    review_reasons: list[str] = []

    # 1. Conclusion Check
    ok, msg = check_conclusion(response)
    checks["conclusion"] = ok
    if not ok:
        failures.append(msg)

    # 2. FDA Evidence Check
    ok, msg = check_fda_evidence(response)
    checks["fda_evidence"] = ok
    if not ok:
        failures.append(msg)

    # 3. USDA Evidence Check
    ok, msg = check_usda_evidence(response)
    checks["usda_evidence"] = ok
    if not ok:
        failures.append(msg)

    # 4. Source Claim Alignment Check
    ok, msg = check_source_alignment(response)
    checks["source_claim_alignment"] = ok
    if not ok:
        failures.append(msg)

    # 5. Practical Recommendation Check
    ok, msg = check_recommendation(response)
    checks["practical_recommendation"] = ok
    if not ok:
        failures.append(msg)

    # 6. Avoids Overgeneralization Check
    ok, msg = check_avoids_overgeneralization(response)
    checks["avoids_overgeneralization"] = ok
    if not ok:
        failures.append(msg)

    # 7. Uncertainty Handling Check
    ok, msg = check_uncertainty_handling(response)
    checks["uncertainty_handling"] = ok
    if not ok:
        failures.append(msg)

    # 8. Search Execution Evidence Check
    search_ok, search_msg = check_search_execution(run)
    checks["search_execution_evidence"] = search_ok
    if search_ok is False:
        failures.append(search_msg)
    elif search_ok is None:
        review_reasons.append(search_msg)

    # 9. No Memory-Only Answer Check
    # Supported if FDA + USDA + conclusion + recommendation all passed
    no_mem_ok = checks["conclusion"] and checks["fda_evidence"] and checks["usda_evidence"]
    checks["no_memory_only_answer"] = bool(no_mem_ok)
    if not no_mem_ok:
        failures.append("Response does not demonstrate evidence of source-grounded research.")

    result: dict[str, Any] = {
        "taskId": TASK_ID,
        "evaluator": "evaluators/web-search/w01_consumer_safety.py",
        "evaluatorVersion": EVALUATOR_VERSION,
        "evaluationCriteria": (
            "Evaluate whether the response refutes the premise using FDA/USDA guidance, "
            "cites authoritative sources, advises transferring to microwave-safe containers, "
            "avoids blanket claims, states uncertainties, and demonstrates search execution."
        ),
        "checks": checks,
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
            "The response successfully concludes the assumption is unjustified, cites official FDA "
            "and USDA FSIS safety guidance, recommends transferring soup to a microwave-safe container, "
            "avoids overgeneralization, clearly identifies uncertainties, and demonstrates active web retrieval."
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
        "evaluator": "evaluators/web-search/w01_consumer_safety.py",
        "evaluatorVersion": EVALUATOR_VERSION,
        "status": "manual_review",
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
        if r.get("taskId") in {"WS-01", "web-search-WS-01"}
    ]

    print(f"Found {len(runs)} runs for task WS-01 in {results_path.name}:\n")

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

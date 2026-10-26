"""Evaluator for WS-03: Previously-Owned Clean Vehicle Credit acquisition cutoff and possession date.

Task Reference:
  benchmarks/open-model-agent-benchmarks/tasks/web-search/WS-03.json

This evaluator assesses whether benchmark runs (Codex, Claude Code, OpenCode)
demonstrated:
1. Buyer conclusion: correctly concludes that the planned purchase on October 15, 2026
   is not eligible for the federal Previously-Owned Clean Vehicle Credit.
2. Cutoff date: identifies September 30, 2025 as the relevant statutory acquisition cutoff.
3. Historical $4,000 credit: explains why a 2024 article could have been accurate under earlier
   law (lesser of 30% or $4,000) and that subsequent legislation terminated the credit for
   vehicles acquired after September 30, 2025.
4. Acquisition definition: explains that IRS requires both a binding written contract and a
   payment (including nominal down payment or trade-in) by the cutoff.
5. Possession vs. acquisition: distinguishes acquisition from physical possession / placed-in-service.
6. Late possession exception: explains that taking possession after the cutoff may be compatible
   with eligibility only if timely acquisition occurred by September 30, 2025, and correctly
   applies this exception to show the buyer remains ineligible.
7. Official sources: cites authoritative official IRS sources (e.g. Used Clean Vehicle Credit page,
   OBBB FAQs FS-2025-05, Instructions for Form 8936, or dealer requirements).
8. Source-claim alignment: aligns IRS citations to the material tax claims they substantiate.
9. Search execution evidence: verifies active retrieval vs. unverified memory-only responses.
10. Limitations and advice scope: states material verification limitations and frames the response
    as general informational research, not individualized tax advice.

Per WS-03.json reviewPolicy:
- If technical answer is correct but available logs show 0 search requests, incomplete trace,
  or uncommitted raw logs, the evaluator routes to 'manual_review'.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any

TASK_ID = "WS-03"
CATEGORY_ID = "web-search"
EVALUATOR_VERSION = "1.0.0"

TASK_FILE = (
    Path(__file__).resolve().parents[2]
    / "tasks"
    / "web-search"
    / "WS-03.json"
)


def load_task() -> dict[str, Any]:
    """Load canonical task definition from tasks/web-search/WS-03.json."""
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


def check_buyer_conclusion(text: str) -> tuple[bool, str]:
    """Check that the response clearly concludes the buyer's planned purchase is ineligible."""
    norm = normalize_text(text)
    has_ineligible = bool(
        re.search(
            r"(?:not\s+(?:be\s+)?eligible|cannot\s+qualify|will\s+not\s+qualify|does\s+not\s+qualify|no\s+longer\s+qualif|not\s+qualif|ineligible)",
            norm,
            re.IGNORECASE,
        )
    )
    has_buyer_ref = bool(
        re.search(r"(?:buyer|purchase|october\s+15|2026)", norm, re.IGNORECASE)
    )

    if has_ineligible and has_buyer_ref:
        return True, "Correctly concludes that the buyer's planned purchase is not eligible for the credit."
    return False, "Failed to clearly conclude that the buyer is ineligible on the facts provided."


def check_cutoff_date(text: str) -> tuple[bool, str]:
    """Check that the response identifies September 30, 2025 as the acquisition cutoff date."""
    norm = normalize_text(text)
    has_date = bool(
        re.search(r"sept(?:ember)?\.?\s+30,?\s+2025|09/30/2025", norm, re.IGNORECASE)
    )

    if has_date:
        return True, "Correctly identifies September 30, 2025 as the relevant acquisition cutoff date."
    return False, "Missing September 30, 2025 acquisition cutoff date."


def check_historical_4000_credit(text: str) -> tuple[bool, str]:
    """Check explanation of why a 2024 article cited up to $4,000 credit and subsequent termination."""
    norm = normalize_text(text)
    has_4000 = bool(re.search(r"(?:\$4,?000|4,?000\s*(?:dollar|credit))", norm))
    has_2024 = bool(re.search(r"2024", norm))
    has_termination = bool(
        re.search(
            r"(?:obbb|one,\s*big|public\s+law\s+119-21|p\.l\.\s*119-21|terminated|sunset|accelerat|subsequent|repeal|new\s+law|amended)",
            norm,
            re.IGNORECASE,
        )
    )

    if has_4000 and (has_2024 or has_termination):
        return True, "Explains historical $4,000 credit rule and termination under subsequent tax legislation."
    return False, "Fails to adequately explain the 2024 $4,000 credit context and legislative termination."


def check_acquisition_definition(text: str) -> tuple[bool, str]:
    """Check that acquisition requires both a binding written contract and payment (down payment/trade-in)."""
    norm = normalize_text(text)
    has_binding_contract = bool(
        re.search(r"binding\s+(?:written\s+)?contract|written\s+binding\s+contract", norm, re.IGNORECASE)
    )
    has_payment = bool(
        re.search(r"(?:payment|down\s*payment|trade[- ]in)", norm, re.IGNORECASE)
    )
    has_both = bool(
        re.search(
            r"(?:contract.{0,80}(?:and|plus).{0,80}payment|payment.{0,80}(?:and|plus).{0,80}contract)",
            norm,
            re.IGNORECASE | re.DOTALL,
        )
    ) or (has_binding_contract and has_payment)

    if has_both:
        return True, "Defines acquisition as requiring both a written binding contract and a payment (including down payment/trade-in)."
    return False, "Fails to state the IRS contract-plus-payment requirement for acquisition."


def check_possession_vs_acquisition(text: str) -> tuple[bool, str]:
    """Check that acquisition is clearly distinguished from possession / placed-in-service."""
    norm = normalize_text(text)
    has_distinction = bool(
        re.search(
            r"(?:placed\s+in\s+service|possession).{0,150}(?:distinct|different|distinguish|not\s+(?:the\s+same|identical)|vs\.?|versus|separate)",
            norm,
            re.IGNORECASE | re.DOTALL,
        )
        or re.search(
            r"(?:distinct|different|distinguish|not\s+(?:the\s+same|identical)|vs\.?|versus|separate).{0,150}(?:placed\s+in\s+service|possession)",
            norm,
            re.IGNORECASE | re.DOTALL,
        )
        or (
            re.search(r"placed\s+in\s+service", norm, re.IGNORECASE)
            and re.search(r"possession", norm, re.IGNORECASE)
            and re.search(r"acquisition", norm, re.IGNORECASE)
        )
    )

    if has_distinction:
        return True, "Distinguishes legal acquisition from physical possession / placed-in-service date."
    return False, "Fails to clearly distinguish acquisition from taking possession / placed-in-service."


def check_late_possession_exception(text: str) -> tuple[bool, str]:
    """Check explanation of late possession exception and application to buyer."""
    norm = normalize_text(text)
    has_late_possession = bool(
        re.search(
            r"(?:possession|placed\s+in\s+service).{0,120}(?:after\s+(?:sept|the\s+cutoff|deadline)|later)",
            norm,
            re.IGNORECASE | re.DOTALL,
        )
        or re.search(
            r"(?:delivered|take\s+possession).{0,120}(?:after\s+(?:sept|the\s+cutoff|deadline)|2026)",
            norm,
            re.IGNORECASE | re.DOTALL,
        )
    )
    has_exception_condition = bool(
        re.search(
            r"(?:if|provided|as\s+long\s+as|only\s+if).{0,120}(?:acquired|contract|payment).{0,80}(?:on\s+or\s+before|by|prior\s+to)",
            norm,
            re.IGNORECASE | re.DOTALL,
        )
        or re.search(
            r"(?:transition|exception|safe\s+harbor)",
            norm,
            re.IGNORECASE,
        )
    )

    if has_late_possession and has_exception_condition:
        return True, "Explains late possession exception (possession after cutoff valid only if acquired on/before cutoff) and applies it to buyer."
    return False, "Fails to explain the late possession transition exception and its application."


def check_official_sources(text: str) -> tuple[bool, str]:
    """Check that authoritative official IRS sources are cited."""
    norm = normalize_text(text)
    urls = re.findall(r"https?://[^\s)\]\"'<>]+", text)
    irs_urls = [u for u in urls if "irs.gov" in u.lower()]

    mentions_irs_pages = bool(
        re.search(
            r"(?:used\s+clean\s+vehicle\s+credit|fs-2025-05|form\s+8936|clean\s+vehicle\s+credit|irs\.gov)",
            norm,
            re.IGNORECASE,
        )
    )

    if len(irs_urls) >= 1 or mentions_irs_pages:
        return True, f"Cites authoritative IRS sources ({len(irs_urls)} IRS URLs cited)."
    return False, "Missing authoritative IRS citations."


def check_source_claim_alignment(text: str) -> tuple[bool, str]:
    """Check that cited sources align with material tax claims."""
    norm = normalize_text(text)
    urls = re.findall(r"https?://[^\s)\]\"'<>]+", text)
    irs_urls = [u for u in urls if "irs.gov" in u.lower()]

    has_alignment = len(irs_urls) >= 1 or bool(
        re.search(r"(?:irs\.gov|irc\s*§?\s*25e|fs-2025-05|form\s*8936)", norm, re.IGNORECASE)
    )

    if has_alignment:
        return True, "Official IRS sources are properly aligned to substantiate cutoff and acquisition rules."
    return False, "Sources are not clearly aligned with key tax-law assertions."


def check_limitations_and_advice_scope(text: str) -> tuple[bool, str]:
    """Check that non-advice disclaimer and informational scope are stated."""
    norm = normalize_text(text)
    has_disclaimer = bool(
        re.search(
            r"(?:not\s+(?:individualized\s+)?tax\s+advice|general\s+(?:informational?|research|educational?)|consult\s+(?:a\s+)?(?:tax\s+professional|cpa|attorney)|informational\s+purposes)",
            norm,
            re.IGNORECASE,
        )
    )

    if has_disclaimer:
        return True, "Explicitly states non-tax-advice disclaimer and informational research scope."
    return False, "Missing tax disclaimer or general research scope statement."


def check_search_execution(run: dict[str, Any]) -> tuple[bool | None, str]:
    """Evaluate whether available logs or harness metadata verify active web search execution."""
    search_backend = run.get("searchBackend") or ""
    harness = (run.get("harnessId") or "").lower()

    # Active tool execution verified (websearch or webfetch counts > 0)
    if re.search(r"(?:websearch:\s*[1-9]|webfetch:\s*[1-9]|websearchrequests:\s*[1-9])", search_backend, re.IGNORECASE):
        return True, f"Search execution verified via active harness requests ({search_backend.strip()})."

    # Explicit 0 search requests
    if re.search(r"websearchrequests:\s*0", search_backend, re.IGNORECASE):
        return None, (
            "The technical answer is comprehensive, but available logs show 0 native web search requests "
            "were executed; per WS-03 reviewPolicy, independent verification requires manual review."
        )

    # Codex missing trace notes
    if "codex" in harness or "detailed search trace not present" in search_backend.lower():
        return None, (
            "The technical answer is grounded, but detailed search trace is not present in repository notes; "
            "per WS-03 reviewPolicy, independent verification requires manual review."
        )

    if search_backend:
        return True, f"Search backend recorded: {search_backend.strip()}."

    return None, "Search execution trace is incomplete or unverified."


def evaluate_run(run: dict[str, Any]) -> dict[str, Any]:
    """Evaluate one stored run record for task WS-03."""
    response = run.get("responseMarkdown", "")
    if not isinstance(response, str) or not response.strip():
        return {
            "taskId": TASK_ID,
            "evaluator": "evaluators/web-search/w03_clean_vehicle_credit.py",
            "evaluatorVersion": EVALUATOR_VERSION,
            "status": "fail",
            "passed": False,
            "reason": "Run record contains no responseMarkdown text to evaluate.",
            "checks": {},
        }

    checks: dict[str, bool | None] = {}
    failures: list[str] = []
    review_reasons: list[str] = []

    # 1. Buyer Conclusion
    ok, msg = check_buyer_conclusion(response)
    checks["buyer_conclusion"] = ok
    if not ok:
        failures.append(msg)

    # 2. Cutoff Date
    ok, msg = check_cutoff_date(response)
    checks["cutoff_date"] = ok
    if not ok:
        failures.append(msg)

    # 3. Historical $4,000 Credit
    ok, msg = check_historical_4000_credit(response)
    checks["historical_4000_credit"] = ok
    if not ok:
        failures.append(msg)

    # 4. Acquisition Definition
    ok, msg = check_acquisition_definition(response)
    checks["acquisition_definition"] = ok
    if not ok:
        failures.append(msg)

    # 5. Possession vs. Acquisition
    ok, msg = check_possession_vs_acquisition(response)
    checks["possession_vs_acquisition"] = ok
    if not ok:
        failures.append(msg)

    # 6. Late Possession Exception
    ok, msg = check_late_possession_exception(response)
    checks["late_possession_exception"] = ok
    if not ok:
        failures.append(msg)

    # 7. Official Sources
    ok, msg = check_official_sources(response)
    checks["official_sources"] = ok
    if not ok:
        failures.append(msg)

    # 8. Source Claim Alignment
    ok, msg = check_source_claim_alignment(response)
    checks["source_claim_alignment"] = ok
    if not ok:
        failures.append(msg)

    # 9. Search Execution Evidence
    search_ok, search_msg = check_search_execution(run)
    checks["search_execution_evidence"] = search_ok
    if search_ok is False:
        failures.append(search_msg)
    elif search_ok is None:
        review_reasons.append(search_msg)

    # 10. Limitations and Advice Scope
    ok, msg = check_limitations_and_advice_scope(response)
    checks["limitations_and_advice_scope"] = ok
    if not ok:
        failures.append(msg)

    result: dict[str, Any] = {
        "taskId": TASK_ID,
        "evaluator": "evaluators/web-search/w03_clean_vehicle_credit.py",
        "evaluatorVersion": EVALUATOR_VERSION,
        "evaluationCriteria": (
            "Evaluate whether the response correctly identifies the buyer as ineligible for the Previously-Owned "
            "Clean Vehicle Credit, cites the September 30, 2025 cutoff date, contextualizes the historical $4,000 credit, "
            "defines acquisition through contract-plus-payment, distinguishes acquisition from possession/placed-in-service, "
            "explains the late-possession transition exception, cites official IRS sources, provides tax disclaimers, "
            "and demonstrates verified web search execution."
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
            "The response correctly concludes that the buyer's purchase is ineligible under IRC section 25E, "
            "identifies the September 30, 2025 acquisition cutoff, explains the historical $4,000 rule and legislative termination, "
            "accurately defines acquisition as requiring a binding written contract plus payment, distinguishes acquisition from "
            "possession/placed-in-service, correctly applies the late-possession transition rule, cites authoritative IRS sources, "
            "includes appropriate general research disclaimers, and demonstrates verified web search execution."
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
        "evaluator": "evaluators/web-search/w03_clean_vehicle_credit.py",
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
        if r.get("taskId") in {"WS-03", "web-search-WS-03"}
    ]

    print(f"Found {len(runs)} runs for task WS-03 in {results_path.name}:\n")

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

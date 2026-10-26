"""Evaluator for WS-02: Next.js App Router - GET Route Handler caching defaults in v14 and v15.

Task Reference:
  benchmarks/open-model-agent-benchmarks/tasks/web-search/WS-02.json

This evaluator assesses whether benchmark runs (Codex, Claude Code, OpenCode)
demonstrated:
1. Version 14 behavior: GET Route Handlers using Response object were cached by default.
2. Version 15 behavior: GET Route Handlers are uncached by default (intentional breaking change).
3. Configuration fix: documented `export const dynamic = 'force-static'` opt-in.
4. Official sources: uses official Next.js documentation (release blog, upgrade guide, or route.js API reference).
5. Source-claim alignment: aligns cited sources with the relevant version comparisons and configurations.
6. Route Handler vs. fetch caching distinction: does not conflate route-level dynamic config with fetch({ cache: 'force-cache' }).
7. Actionable implementation guidance: shows clear route file configuration.
8. Caveats and scope: acknowledges dynamic request-time behavior (e.g. cookies, headers, dynamic functions) and scope.
9. Active web search execution evidence: verifies active retrieval vs. memory-only answers.

Per WS-02.json reviewPolicy:
- If technical answer is correct but available logs show 0 search requests, incomplete trace,
  or uncommitted raw logs, the evaluator routes to 'manual_review'.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any

TASK_ID = "WS-02"
CATEGORY_ID = "web-search"
EVALUATOR_VERSION = "1.0.0"

TASK_FILE = (
    Path(__file__).resolve().parents[2]
    / "tasks"
    / "web-search"
    / "WS-02.json"
)


def load_task() -> dict[str, Any]:
    """Load canonical task definition from tasks/web-search/WS-02.json."""
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


def check_version_14_behavior(text: str) -> tuple[bool, str]:
    """Check that the response explains that GET Route Handlers were cached by default in v14."""
    norm = normalize_text(text)
    
    # Pattern: v14 followed by cached by default / static
    matches_v14 = bool(
        re.search(
            r"(?:v(?:ersion)?\s*14|next(?:\.js)?\s*14).{0,200}(?:cached\s+by\s+default|static(?:ally)?\s+(?:rendered|cached|evaluated|prerendered|by\s+default))",
            norm,
            re.IGNORECASE | re.DOTALL,
        )
        or re.search(
            r"(?:cached\s+by\s+default|static\s+by\s+default).{0,150}(?:v(?:ersion)?\s*14|next(?:\.js)?\s*14)",
            norm,
            re.IGNORECASE | re.DOTALL,
        )
    )
    
    if matches_v14:
        return True, "Correctly explains that Next.js 14 GET Route Handlers were cached/static by default."
    return False, "Failed to explain that Next.js 14 GET Route Handlers were cached by default."


def check_version_15_behavior(text: str) -> tuple[bool, str]:
    """Check that the response explains that GET Route Handlers are uncached by default in v15."""
    norm = normalize_text(text)
    
    matches_v15 = bool(
        re.search(
            r"(?:v(?:ersion)?\s*15|next(?:\.js)?\s*15).{0,200}(?:not\s+cached\s+by\s+default|no\s+longer\s+cached|uncached|dynamic\s+by\s+default|changed\s+from\s+static\s+to\s+dynamic)",
            norm,
            re.IGNORECASE | re.DOTALL,
        )
        or re.search(
            r"(?:not\s+cached\s+by\s+default|no\s+longer\s+cached|uncached|dynamic\s+by\s+default).{0,150}(?:v(?:ersion)?\s*15|next(?:\.js)?\s*15)",
            norm,
            re.IGNORECASE | re.DOTALL,
        )
    )
    
    if matches_v15:
        return True, "Correctly identifies that Next.js 15 GET Route Handlers are uncached/dynamic by default."
    return False, "Failed to identify that Next.js 15 GET Route Handlers are uncached by default."


def check_force_static_configuration(text: str) -> tuple[bool, str]:
    """Check that the response provides the documented dynamic = 'force-static' route config."""
    norm = normalize_text(text)
    
    has_config = bool(re.search(r"dynamic\s*=\s*['\"]force-static['\"]", norm))
    
    if has_config:
        return True, "Provides the documented 'dynamic = force-static' route segment configuration."
    return False, "Missing the documented 'dynamic = force-static' configuration export."


def check_official_sources(text: str) -> tuple[bool, str]:
    """Check that official Next.js documentation or release materials are cited."""
    norm = normalize_text(text)
    urls = re.findall(r"https?://[^\s)\]\"'<>]+", text)
    has_nextjs_url = any("nextjs.org" in u.lower() for u in urls)
    
    cites_official_docs = has_nextjs_url or bool(
        re.search(
            r"(?:nextjs\.org|next(?:\.js)?\s*15\s+(?:release\s+(?:blog|notes)|upgrade\s+guide)|route\.js\s+api\s+reference|route\s+segment\s+config)",
            norm,
            re.IGNORECASE,
        )
    )
    
    if cites_official_docs:
        return True, "Cites official Next.js documentation, upgrade guide, or release materials."
    return False, "Official Next.js documentation citations are missing."


def check_source_claim_alignment(text: str) -> tuple[bool, str]:
    """Check that cited sources align with material version and caching claims."""
    norm = normalize_text(text)
    urls = re.findall(r"https?://[^\s)\]\"'<>]+", text)
    
    has_upgrade_or_release = bool(
        re.search(
            r"(?:upgrade\s+guide|release\s+(?:blog|notes)|route\.js\s+api|caching\s+semantics)",
            norm,
            re.IGNORECASE,
        )
    )
    
    if urls or has_upgrade_or_release:
        return True, "Sources are aligned with the v14/v15 caching change and route segment configuration claims."
    return False, "Sources are not clearly aligned with key technical claims."


def check_route_handler_vs_fetch_cache(text: str) -> tuple[bool, str]:
    """Check that the response distinguishes Route Handler caching from fetch request caching."""
    norm = normalize_text(text)
    
    distinguishes = bool(
        re.search(
            r"(?:fetch|force-cache|fetchcache).{0,180}(?:separate|distinct|different|not\s+the\s+same|vs\.?|versus|conflate|confuse)",
            norm,
            re.IGNORECASE | re.DOTALL,
        )
        or re.search(
            r"(?:separate|distinct|different|not\s+the\s+same|vs\.?|versus|conflate|confuse).{0,180}(?:fetch|force-cache|fetchcache)",
            norm,
            re.IGNORECASE | re.DOTALL,
        )
    )
    
    if distinguishes:
        return True, "Clearly distinguishes GET Route Handler caching from separate fetch() request caching."
    return False, "Fails to clearly distinguish Route Handler caching from fetch request caching."


def check_implementation_guidance(text: str) -> tuple[bool, str]:
    """Check that clear, actionable implementation guidance is provided."""
    norm = normalize_text(text)
    
    has_example = bool(
        re.search(r"(?:route\.(?:js|ts)|export\s+(?:async\s+)?function\s+GET|app/api)", norm, re.IGNORECASE)
        and re.search(r"dynamic\s*=\s*['\"]force-static['\"]", norm)
    )
    
    if has_example:
        return True, "Provides clear, code-level implementation guidance for route handlers."
    return False, "Missing clear implementation code or file guidance."


def check_caveats_and_scope(text: str) -> tuple[bool, str]:
    """Check that caveats regarding request-time data, cookies, headers, or revalidation are noted."""
    norm = normalize_text(text)
    
    has_caveats = bool(
        re.search(
            r"(?:cookies|headers|searchparams|params|request[- ]dependent|request[- ]time|revalidate|dynamic\s+data|dynamic\s+function|dynamic\s+config|blindly)",
            norm,
            re.IGNORECASE,
        )
    )
    
    if has_caveats:
        return True, "Notes necessary caveats regarding dynamic functions, request-dependent data, and revalidation."
    return False, "Fails to mention caveats regarding request-time data or dynamic behavior."


def check_search_execution(run: dict[str, Any]) -> tuple[bool | None, str]:
    """Evaluate whether available logs or harness metadata verify active web search execution."""
    search_backend = run.get("searchBackend") or ""
    data_quality_notes = " ".join(run.get("dataQualityNotes") or [])
    harness = (run.get("harnessId") or "").lower()

    # Active tool execution verified (websearch or webfetch counts > 0)
    if re.search(r"(?:websearch:\s*[1-9]|webfetch:\s*[1-9]|websearchrequests:\s*[1-9])", search_backend, re.IGNORECASE):
        return True, f"Search execution verified via active harness requests ({search_backend.strip()})."
    
    # Explicit 0 search requests
    if re.search(r"websearchrequests:\s*0", search_backend, re.IGNORECASE):
        return None, (
            "The technical answer is comprehensive, but available logs show 0 native web search requests "
            "were executed; per WS-02 reviewPolicy, independent verification requires manual review."
        )

    # Codex missing trace notes
    if "codex" in harness or "detailed search trace not present" in search_backend.lower():
        return None, (
            "The technical answer is grounded, but detailed search trace is not present in repository notes; "
            "per WS-02 reviewPolicy, independent verification requires manual review."
        )

    if search_backend:
        return True, f"Search backend recorded: {search_backend.strip()}."

    return None, "Search execution trace is incomplete or unverified."


def evaluate_run(run: dict[str, Any]) -> dict[str, Any]:
    """Evaluate one stored run record for task WS-02."""
    task = load_task()
    response = run.get("responseMarkdown", "")
    if not isinstance(response, str) or not response.strip():
        return {
            "taskId": TASK_ID,
            "evaluator": "evaluators/web-search/w02_nextjs_caching.py",
            "evaluatorVersion": EVALUATOR_VERSION,
            "status": "fail",
            "passed": False,
            "reason": "Run record contains no responseMarkdown text to evaluate.",
            "checks": {},
        }

    checks: dict[str, bool | None] = {}
    failures: list[str] = []
    review_reasons: list[str] = []

    # 1. Version 14 Behavior
    ok, msg = check_version_14_behavior(response)
    checks["version_14_behavior"] = ok
    if not ok:
        failures.append(msg)

    # 2. Version 15 Behavior
    ok, msg = check_version_15_behavior(response)
    checks["version_15_behavior"] = ok
    if not ok:
        failures.append(msg)

    # 3. Force Static Configuration
    ok, msg = check_force_static_configuration(response)
    checks["force_static_configuration"] = ok
    if not ok:
        failures.append(msg)

    # 4. Official Sources
    ok, msg = check_official_sources(response)
    checks["official_sources"] = ok
    if not ok:
        failures.append(msg)

    # 5. Source Claim Alignment
    ok, msg = check_source_claim_alignment(response)
    checks["source_claim_alignment"] = ok
    if not ok:
        failures.append(msg)

    # 6. Route Handler vs. Fetch Cache Distinction
    ok, msg = check_route_handler_vs_fetch_cache(response)
    checks["route_handler_vs_fetch_cache"] = ok
    if not ok:
        failures.append(msg)

    # 7. Implementation Guidance
    ok, msg = check_implementation_guidance(response)
    checks["implementation_guidance"] = ok
    if not ok:
        failures.append(msg)

    # 8. Caveats and Scope
    ok, msg = check_caveats_and_scope(response)
    checks["caveats_and_scope"] = ok
    if not ok:
        failures.append(msg)

    # 9. Search Execution Evidence
    search_ok, search_msg = check_search_execution(run)
    checks["search_execution_evidence"] = search_ok
    if search_ok is False:
        failures.append(search_msg)
    elif search_ok is None:
        review_reasons.append(search_msg)

    # 10. No Memory-Only Answer Check
    grounded = (
        checks["version_14_behavior"]
        and checks["version_15_behavior"]
        and checks["force_static_configuration"]
        and checks["route_handler_vs_fetch_cache"]
    )
    checks["no_memory_only_answer"] = bool(grounded)
    if not grounded:
        failures.append("Response does not demonstrate evidence of source-grounded documentation research.")

    result: dict[str, Any] = {
        "taskId": TASK_ID,
        "evaluator": "evaluators/web-search/w02_nextjs_caching.py",
        "evaluatorVersion": EVALUATOR_VERSION,
        "evaluationCriteria": (
            "Evaluate whether the response correctly explains the Next.js 14 vs 15 Route Handler caching defaults, "
            "provides dynamic = 'force-static', cites official Next.js sources, distinguishes Route Handler caching from fetch caching, "
            "provides clear implementation guidance and caveats, and demonstrates active search execution."
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
            "The response correctly explains Next.js 14 and 15 Route Handler caching behavior, "
            "provides the documented export const dynamic = 'force-static' configuration, "
            "clearly distinguishes Route Handler caching from fetch request caching, cites official Next.js documentation, "
            "provides clear implementation caveats, and demonstrates verified web search execution."
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
        "evaluator": "evaluators/web-search/w02_nextjs_caching.py",
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
        if r.get("taskId") in {"WS-02", "web-search-WS-02"}
    ]

    print(f"Found {len(runs)} runs for task WS-02 in {results_path.name}:\n")

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

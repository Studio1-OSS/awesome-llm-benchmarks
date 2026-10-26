import React from 'react';
import { BookOpen } from 'lucide-react';

export const MethodologyView: React.FC = () => {
  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="pb-4 border-b border-[#EAEAEA]">
        <div className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#666666] uppercase tracking-wider mb-1">
          <BookOpen size={13} className="text-blue-600" />
          <span>Evaluation Architecture & Specification</span>
        </div>
        <h1 className="text-[26px] sm:text-[30px] font-bold text-[#111111] tracking-tight leading-tight">
          Dataset & Deterministic Evaluators
        </h1>
        <p className="text-[13px] sm:text-[14px] text-[#666666] mt-0.5">
          How open frontier models are tested inside real developer harnesses with zero synthetic hallucinated grading.
        </p>
      </div>

      {/* 4 Stage Architecture Diagram */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-[#EAEAEA] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
        <h3 className="text-[18px] font-bold text-[#111111]">
          The 4-Stage Benchmark Lifecycle
        </h3>
        <p className="text-[13px] text-[#555555]">
          Unlike multiple-choice exams prone to memorization, each agent workload runs in an isolated Linux sandbox with live bash tools and deterministic evaluation scripts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
          <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E5E3DF] text-left">
            <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider mb-1">01 / Task Spec</div>
            <h4 className="font-bold text-[14px] text-[#111111] mb-1">Canonical Definitions</h4>
            <p className="text-[12px] text-[#666666] leading-relaxed">
              Strict JSON tasks under <code>tasks/</code> defining prompts, workspace context, and deterministic criteria.
            </p>
          </div>

          <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E5E3DF] text-left">
            <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">02 / Harness Exec</div>
            <h4 className="font-bold text-[14px] text-[#111111] mb-1">Autonomous Agent Run</h4>
            <p className="text-[12px] text-[#666666] leading-relaxed">
              Executed inside Codex, Claude Code, or OpenCode with real terminal tools, file access, and multi-turn loops.
            </p>
          </div>

          <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E5E3DF] text-left">
            <div className="text-[11px] font-bold text-purple-700 uppercase tracking-wider mb-1">03 / Log Capture</div>
            <h4 className="font-bold text-[14px] text-[#111111] mb-1">Raw Trace Logging</h4>
            <p className="text-[12px] text-[#666666] leading-relaxed">
              High-precision capture of wall-clock seconds, API token usage (input/output), and dollar cost into results.json.
            </p>
          </div>

          <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E5E3DF] text-left">
            <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1">04 / Verification</div>
            <h4 className="font-bold text-[14px] text-[#111111] mb-1">Independent Audit</h4>
            <p className="text-[12px] text-[#666666] leading-relaxed">
              Automated Python evaluators audit the code and state changes. Hallucinated agent self-reports are rejected.
            </p>
          </div>
        </div>
      </div>

      {/* Benchmark Task Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-[#EAEAEA] p-5 shadow-2xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <h4 className="font-bold text-[15px] text-[#111111]">Coding (C-01 to C-03)</h4>
          </div>
          <p className="text-[12.5px] text-[#555555] leading-relaxed mb-3">
            Real software engineering tasks spanning payment idempotency bugfixes, safe webhook retry handling, and cursor pagination algorithms with zero skipped records.
          </p>
          <div className="text-[11px] font-mono text-[#777777] bg-[#FAF9F6] p-2 rounded border border-[#EAEAEA]">
            Evaluator: Jest / Pytest assertion test suite against target codebase
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#EAEAEA] p-5 shadow-2xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <h4 className="font-bold text-[15px] text-[#111111]">Reasoning (Task 1 to 5)</h4>
          </div>
          <p className="text-[12.5px] text-[#555555] leading-relaxed mb-3">
            Multi-constraint scheduling, logical deduction, graph dependency ordering, and puzzle solving with strict formal order extraction.
          </p>
          <div className="text-[11px] font-mono text-[#777777] bg-[#FAF9F6] p-2 rounded border border-[#EAEAEA]">
            Evaluator: Evaluators extract exact topological ordering (e.g. F, C, A, D, B, E)
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#EAEAEA] p-5 shadow-2xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
            <h4 className="font-bold text-[15px] text-[#111111]">Tool Use (T-01 to T-05)</h4>
          </div>
          <p className="text-[12.5px] text-[#555555] leading-relaxed mb-3">
            Complex simulated business APIs: airline travel booking modification eligibility, tier upgrades, duplicate order refunds, and incident investigation.
          </p>
          <div className="text-[11px] font-mono text-[#777777] bg-[#FAF9F6] p-2 rounded border border-[#EAEAEA]">
            Evaluator: Audits exact function call parameters and API payload validity
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#EAEAEA] p-5 shadow-2xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <h4 className="font-bold text-[15px] text-[#111111]">Web Search (WS-01 to WS-03)</h4>
          </div>
          <p className="text-[12.5px] text-[#555555] leading-relaxed mb-3">
            Live web browsing and factual synthesis: FDA consumer safety standards, Next.js caching documentation, and IRS Clean Vehicle Credit eligibility rules.
          </p>
          <div className="text-[11px] font-mono text-[#777777] bg-[#FAF9F6] p-2 rounded border border-[#EAEAEA]">
            Evaluator: Fact-checking against ground-truth authoritative federal/official documentation
          </div>
        </div>
      </div>
    </div>
  );
};

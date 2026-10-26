import React from 'react';
import type { HarnessStatSummary } from '../data/resultsData';
import { ALL_MODEL_IDS, MODEL_META } from '../data/resultsData';
import { TaskMatrixBlocks } from './TaskMatrixBlocks';
import { ArrowRight, ChevronRight, SlidersHorizontal } from 'lucide-react';

interface HarnessLeaderboardProps {
  stats: HarnessStatSummary[];
  onSelectHarness: (harnessId: string) => void;
  onSelectRun: (runId: string) => void;
  onNavigateToCompare: () => void;
}

export const HarnessLeaderboard: React.FC<HarnessLeaderboardProps> = ({
  stats,
  onSelectHarness,
  onSelectRun,
  onNavigateToCompare
}) => {
  return (
    <div className="space-y-6 text-left">
      {/* Top Section / Header + Compare Banner */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#666666] uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Agent Execution Harnesses</span>
          </div>
          <h1 className="text-[28px] sm:text-[34px] font-bold text-[#111111] tracking-tight leading-tight">
            Harness Leaderboard
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#666666] mt-2 leading-relaxed">
            The agent wrapper surrounding the model: tool loops, retry strategies, sandbox isolation, and verification hooks. The exact same model yields drastically different pass rates and token efficiencies depending on its execution harness.
          </p>
        </div>

        {/* Compare Quick Action Card (inspired by Composio header card) */}
        <div
          onClick={onNavigateToCompare}
          className="bg-gradient-to-br from-[#FAF9F6] to-[#F2EFE9] border border-[#E5E3DF] hover:border-[#D0CCC5] rounded-xl sm:rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all cursor-pointer group shrink-0 lg:w-[340px]"
        >
          <div className="flex items-center justify-between text-[11px] font-bold text-[#888888] uppercase tracking-wider mb-1.5">
            <span className="flex items-center gap-1.5 text-blue-700">
              <SlidersHorizontal size={13} />
              <span>Side-by-Side</span>
            </span>
            <span className="text-emerald-700 font-semibold">Matrix Ready</span>
          </div>

          <h4 className="text-[15px] font-bold text-[#111111] leading-snug group-hover:text-blue-600 transition-colors">
            Compare Harnesses & Models
          </h4>
          <p className="text-[12px] text-[#666666] mt-1">
            Compare every harness across identical tasks with delta metrics, cost charts, and heatmaps.
          </p>

          <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#E5E3DF]/80">
            <div className="flex items-center -space-x-1.5">
              {ALL_MODEL_IDS.map(mId => (
                <img
                  key={mId}
                  src={MODEL_META[mId]?.logo || '/logos/openai.svg'}
                  alt={MODEL_META[mId]?.name}
                  className="w-5 h-5 rounded-full bg-white p-0.5 border border-[#E5E5E5] object-contain shadow-2xs"
                  title={MODEL_META[mId]?.name}
                />
              ))}
            </div>
            <span className="text-[12px] font-semibold text-[#111111] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>View Matrix</span>
              <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </div>

      {/* Leaderboard Table Card */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-[#EAEAEA] shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] border-b border-[#EAEAEA] text-[11px] font-bold uppercase tracking-wider text-[#777777]">
                <th className="py-3.5 pl-5 pr-2 w-12 text-center">#</th>
                <th className="py-3.5 px-4 min-w-[200px]">Harness Name</th>
                <th className="py-3.5 px-4 min-w-[120px]">Models Evaluated</th>
                <th className="py-3.5 px-4 min-w-[140px]">Verified Pass Rate</th>
                <th className="py-3.5 px-4 min-w-[260px]">Task Outcome Matrix</th>
                <th className="py-3.5 px-4 min-w-[120px]">Avg Time</th>
                <th className="py-3.5 px-4 min-w-[110px]">Avg Cost</th>
                <th className="py-3.5 pr-5 pl-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEAEA] text-[13px]">
              {stats.map((harness, index) => {
                const rankNumber = String(index + 1).padStart(2, '0');
                return (
                  <tr
                    key={harness.harnessId}
                    className="hover:bg-[#FAF9F6] transition-colors group cursor-pointer"
                    onClick={() => onSelectHarness(harness.harnessId)}
                  >
                    {/* Rank Number */}
                    <td className="py-4 pl-5 pr-2 text-center font-mono font-bold text-[#888888] text-[12px]">
                      {rankNumber}
                    </td>

                    {/* Harness Info */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#FAF9F6] border border-[#EAEAEA] flex items-center justify-center shrink-0 p-1.5 shadow-2xs group-hover:border-[#CCCCCC] transition-colors">
                          <img
                            src={harness.logo}
                            alt={harness.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-[#111111] group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                            <span>{harness.name}</span>
                            <span className="text-[10px] font-mono text-[#888888] bg-[#F5F5F4] px-1.5 py-0.5 rounded border border-[#E5E5E3]">
                              v{harness.version}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#777777] block mt-0.5">
                            {harness.totalRuns} total verified execution runs
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Models Evaluated Avatars */}
                    <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        {ALL_MODEL_IDS.map(mId => {
                          const mMeta = MODEL_META[mId];
                          const mStat = harness.byModel[mId];
                          return (
                            <div
                              key={mId}
                              className="relative group/mod cursor-pointer"
                              title={`${mMeta?.shortName || mId}: ${mStat?.successRate.toFixed(1)}% pass rate`}
                            >
                              <img
                                src={mMeta?.logo || '/logos/openai.svg'}
                                alt={mMeta?.name}
                                className="w-6 h-6 rounded-md bg-[#FAF9F6] border border-[#E5E5E5] p-1 object-contain hover:scale-110 transition-transform shadow-2xs"
                              />
                            </div>
                          );
                        })}
                        <span className="text-[11px] text-[#777777] font-medium ml-1">
                          {ALL_MODEL_IDS.length} models
                        </span>
                      </div>
                    </td>

                    {/* Verified Success Rate */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] font-mono font-bold text-[#111111]">
                          {harness.successRate.toFixed(1)}%
                        </span>
                        <span className="text-[11px] text-[#666666] font-medium">
                          ({harness.passedRuns}/{harness.totalRuns})
                        </span>
                      </div>
                      <div className="w-24 h-1.5 bg-[#EAEAEA] rounded-full overflow-hidden mt-1.5">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${harness.successRate}%` }}
                        />
                      </div>
                    </td>

                    {/* Signature Task Outcome Matrix */}
                    <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                      <TaskMatrixBlocks
                        tasks={harness.taskMatrix}
                        onSelectRun={onSelectRun}
                        size="md"
                        showCount={true}
                      />
                    </td>

                    {/* Avg Time */}
                    <td className="py-4 px-4">
                      <span className="font-mono font-semibold text-[#111111] text-[14px]">
                        {harness.avgWallClockSeconds.toFixed(1)}s
                      </span>
                      <span className="text-[11px] text-[#888888] block mt-0.5">
                        per task
                      </span>
                    </td>

                    {/* Avg Cost */}
                    <td className="py-4 px-4">
                      <span className="font-mono font-semibold text-[#111111] text-[14px]">
                        ${harness.avgCostAmount.toFixed(4)}
                      </span>
                      <span className="text-[11px] text-[#888888] block mt-0.5">
                        API estimate
                      </span>
                    </td>

                    {/* Drill-down action */}
                    <td className="py-4 pr-5 pl-2 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectHarness(harness.harnessId);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF9F6] hover:bg-[#111111] text-[#333333] hover:text-white border border-[#E5E3DF] hover:border-[#111111] text-[12px] font-medium transition-all shadow-2xs group/btn"
                      >
                        <span>Drill Down</span>
                        <ChevronRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

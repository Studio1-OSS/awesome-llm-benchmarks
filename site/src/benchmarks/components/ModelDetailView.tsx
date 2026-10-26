import React, { useState } from 'react';
import {
  MODEL_META,
  HARNESS_META,
  CATEGORY_META,
  ALL_RUNS,
  ALL_HARNESS_IDS,
  ALL_CATEGORIES,
  isRunPassed
} from '../data/resultsData';
import {
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Search
} from 'lucide-react';

interface ModelDetailViewProps {
  modelId: string;
  onBack: () => void;
  onSelectRun: (runId: string) => void;
  onSelectHarness: (harnessId: string) => void;
}

export const ModelDetailView: React.FC<ModelDetailViewProps> = ({
  modelId,
  onBack,
  onSelectRun,
  onSelectHarness
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHarness, setSelectedHarness] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const meta = MODEL_META[modelId] || {
    id: modelId,
    name: modelId,
    shortName: modelId,
    provider: 'Nebius Token Factory',
    logo: '/logos/openai.svg',
    color: '#1D4ED8',
    lightBg: '#EFF6FF',
    badgeText: '#1E40AF'
  };

  const modelRuns = ALL_RUNS.filter(r => r.modelId === modelId);
  const totalRuns = modelRuns.length;
  const passedRuns = modelRuns.filter(isRunPassed).length;
  const passRate = totalRuns > 0 ? (passedRuns / totalRuns) * 100 : 0;

  let totalWallClock = 0;
  let totalCost = 0;
  let totalTokens = 0;

  modelRuns.forEach(r => {
    totalWallClock += r.execution?.wallClockSeconds || 0;
    totalCost += r.execution?.cost?.amount || 0;
    totalTokens += r.execution?.tokens?.totalReported || 0;
  });

  const avgWallClock = totalRuns > 0 ? totalWallClock / totalRuns : 0;
  const avgCost = totalRuns > 0 ? totalCost / totalRuns : 0;

  const filteredRuns = modelRuns.filter(r => {
    const matchesSearch = searchQuery === '' ||
      r.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.taskId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesHarness = selectedHarness === 'all' || r.harnessId === selectedHarness;
    const matchesCategory = selectedCategory === 'all' || r.categoryId === selectedCategory;
    return matchesSearch && matchesHarness && matchesCategory;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px] text-[#777777]">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[#111111] hover:text-blue-600 font-medium transition-colors"
        >
          <ChevronLeft size={16} />
          <span>All Models</span>
        </button>
        <span>/</span>
        <span className="text-[#333333] font-semibold">{meta.name}</span>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-[#EAEAEA] p-6 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#EAEAEA]">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF9F6] border border-[#E5E3DF] p-2.5 flex items-center justify-center shrink-0 shadow-2xs">
              <img src={meta.logo} alt={meta.name} className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-[24px] sm:text-[28px] font-bold text-[#111111] tracking-tight">
                  {meta.name}
                </h1>
                <span className="text-[12px] font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                  {meta.provider}
                </span>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Open Frontier Weights
                </span>
              </div>
              <p className="text-[14px] text-[#555555] mt-1.5 max-w-2xl leading-relaxed">
                Evaluated across terminal agent harnesses executing complex programming, live search, multi-constraint planning, and function calling.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Metric Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-6">
          <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#EAEAEA]">
            <span className="text-[11px] font-bold text-[#777777] uppercase tracking-wider block mb-1">
              Overall Pass Rate
            </span>
            <div className="text-[22px] sm:text-[26px] font-mono font-bold text-[#111111]">
              {passRate.toFixed(1)}%
            </div>
            <span className="text-[11px] text-[#666666]">
              {passedRuns} passed / {totalRuns} total
            </span>
          </div>

          <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#EAEAEA]">
            <span className="text-[11px] font-bold text-[#777777] uppercase tracking-wider block mb-1">
              Avg Time per Task
            </span>
            <div className="text-[22px] sm:text-[26px] font-mono font-bold text-[#111111]">
              {avgWallClock.toFixed(1)}s
            </div>
            <span className="text-[11px] text-[#666666]">
              {totalWallClock.toFixed(1)}s total runtime
            </span>
          </div>

          <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#EAEAEA]">
            <span className="text-[11px] font-bold text-[#777777] uppercase tracking-wider block mb-1">
              Avg Cost per Task
            </span>
            <div className="text-[22px] sm:text-[26px] font-mono font-bold text-[#111111]">
              ${avgCost.toFixed(4)}
            </div>
            <span className="text-[11px] text-[#666666]">
              ${totalCost.toFixed(3)} reported total
            </span>
          </div>

          <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#EAEAEA]">
            <span className="text-[11px] font-bold text-[#777777] uppercase tracking-wider block mb-1">
              Tokens Processed
            </span>
            <div className="text-[22px] sm:text-[26px] font-mono font-bold text-[#111111]">
              {(totalTokens / 1000).toFixed(0)}k
            </div>
            <span className="text-[11px] text-[#666666]">
              Across all 3 harnesses
            </span>
          </div>
        </div>
      </div>

      {/* Harness Comparative Breakdown for this Model */}
      <div>
        <h3 className="text-[18px] font-bold text-[#111111] mb-3">
          Harness Performance on {meta.shortName}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ALL_HARNESS_IDS.map(hId => {
            const hMeta = HARNESS_META[hId];
            const hRuns = modelRuns.filter(r => r.harnessId === hId);
            const hPass = hRuns.filter(isRunPassed).length;
            const hRate = hRuns.length > 0 ? (hPass / hRuns.length) * 100 : 0;
            let hTime = 0, hCost = 0;
            hRuns.forEach(r => {
              hTime += r.execution?.wallClockSeconds || 0;
              hCost += r.execution?.cost?.amount || 0;
            });
            const hAvgTime = hRuns.length > 0 ? hTime / hRuns.length : 0;
            const hAvgCost = hRuns.length > 0 ? hCost / hRuns.length : 0;

            return (
              <div
                key={hId}
                onClick={() => onSelectHarness(hId)}
                className="bg-white rounded-xl border border-[#EAEAEA] hover:border-[#CCCCCC] p-5 shadow-2xs transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA]">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={hMeta?.logo || '/logos/openai.svg'}
                      alt={hMeta?.name}
                      className="w-7 h-7 rounded-md bg-[#FAF9F6] border border-[#E5E5E5] p-1 object-contain"
                    />
                    <div>
                      <h4 className="font-bold text-[#111111] group-hover:text-blue-600 transition-colors">
                        {hMeta?.name || hId}
                      </h4>
                      <span className="text-[11px] text-[#777777]">v{hMeta?.version}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[18px] font-mono font-bold text-emerald-700 block">
                      {hRate.toFixed(1)}%
                    </span>
                    <span className="text-[11px] font-mono text-[#888888]">
                      {hPass}/{hRuns.length} passed
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 text-[12px]">
                  <div>
                    <span className="text-[#888888] block text-[11px]">Avg Latency:</span>
                    <span className="font-mono font-semibold text-[#111111]">{hAvgTime.toFixed(1)}s</span>
                  </div>
                  <div>
                    <span className="text-[#888888] block text-[11px]">Avg Cost:</span>
                    <span className="font-mono font-semibold text-[#111111]">${hAvgCost.toFixed(4)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Domain Breakdown */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-[#EAEAEA] p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
        <h3 className="text-[17px] font-bold text-[#111111]">
          Domain Success Rates for {meta.shortName}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ALL_CATEGORIES.map(cat => {
            const catRuns = modelRuns.filter(r => r.categoryId === cat.id);
            const catPass = catRuns.filter(isRunPassed).length;
            const catRate = catRuns.length > 0 ? (catPass / catRuns.length) * 100 : 0;
            const cMeta = CATEGORY_META[cat.id];

            return (
              <div key={cat.id} className="bg-[#FAF9F6] p-3.5 rounded-lg border border-[#EAEAEA]">
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: (cMeta?.color || '#666') + '20',
                      color: cMeta?.color || '#111'
                    }}
                  >
                    {cMeta?.name || cat.name}
                  </span>
                  <span className="font-mono font-bold text-[#111111] text-[13px]">
                    {catRate.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#EAEAEA] rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${catRate}%`,
                      backgroundColor: cMeta?.color || '#10B981'
                    }}
                  />
                </div>
                <span className="text-[11px] text-[#777777] mt-1.5 block">
                  {catPass} of {catRuns.length} tasks passed
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filterable Task Runs Table */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-[#EAEAEA] shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#EAEAEA] flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#FAF9F6]">
          <h4 className="text-[16px] font-bold text-[#111111]">
            Execution Runs for {meta.shortName} ({filteredRuns.length})
          </h4>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search task..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-[12px] bg-white border border-[#E5E3DF] rounded-lg pl-8 pr-3 py-1.5 focus:outline-none w-44 sm:w-56"
              />
              <Search size={14} className="absolute left-2.5 top-2.5 text-[#888888]" />
            </div>

            <select
              value={selectedHarness}
              onChange={(e) => setSelectedHarness(e.target.value)}
              className="text-[12px] bg-white border border-[#E5E3DF] rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="all">All Harnesses</option>
              {ALL_HARNESS_IDS.map(hId => (
                <option key={hId} value={hId}>{HARNESS_META[hId]?.name || hId}</option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-[12px] bg-white border border-[#E5E3DF] rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="all">All Domains</option>
              {ALL_CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{CATEGORY_META[c.id]?.name || c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-white border-b border-[#EAEAEA] text-[11px] font-bold uppercase tracking-wider text-[#777777]">
                <th className="py-3 px-4 min-w-[240px]">Task Name</th>
                <th className="py-3 px-3">Domain</th>
                <th className="py-3 px-3">Harness</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Wall Time</th>
                <th className="py-3 px-3">Tokens</th>
                <th className="py-3 px-3">Cost</th>
                <th className="py-3 pr-4 text-right">Trace</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEAEA]">
              {filteredRuns.map(run => {
                const passed = isRunPassed(run);
                const harnessMeta = HARNESS_META[run.harnessId];
                const catMeta = CATEGORY_META[run.categoryId];

                return (
                  <tr
                    key={run.id}
                    onClick={() => onSelectRun(run.id)}
                    className="hover:bg-[#FAF9F6] transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4">
                      <span className="font-medium text-[#111111] group-hover:text-blue-600 transition-colors block line-clamp-1">
                        {run.taskName}
                      </span>
                      <span className="text-[11px] font-mono text-[#888888]">{run.taskId}</span>
                    </td>

                    <td className="py-3 px-3">
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: (catMeta?.color || '#666') + '1A',
                          color: catMeta?.color || '#111'
                        }}
                      >
                        {catMeta?.name || run.categoryId}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 font-medium text-[#222222]">
                        <img
                          src={harnessMeta?.logo || '/logos/openai.svg'}
                          alt={harnessMeta?.name}
                          className="w-4 h-4 object-contain"
                        />
                        <span className="text-[12px]">{harnessMeta?.shortName || run.harnessId}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          passed
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {passed ? <CheckCircle2 size={12} className="text-emerald-600" /> : <XCircle size={12} className="text-rose-600" />}
                        {passed ? 'PASS' : 'FAIL'}
                      </span>
                    </td>

                    <td className="py-3 px-3 font-mono font-medium text-[#111111] text-[12px]">
                      {(run.execution?.wallClockSeconds || 0).toFixed(1)}s
                    </td>

                    <td className="py-3 px-3 font-mono text-[#555555] text-[12px]">
                      {(run.execution?.tokens?.totalReported || 0).toLocaleString()}
                    </td>

                    <td className="py-3 px-3 font-mono text-[#555555] text-[12px]">
                      ${(run.execution?.cost?.amount || 0).toFixed(4)}
                    </td>

                    <td className="py-3 pr-4 text-right">
                      <span className="text-[11px] font-medium text-blue-600 group-hover:underline">
                        View Trace &rarr;
                      </span>
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

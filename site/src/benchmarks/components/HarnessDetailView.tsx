import React, { useState } from 'react';
import {
  HARNESS_META,
  MODEL_META,
  CATEGORY_META,
  ALL_RUNS,
  ALL_MODEL_IDS,
  ALL_CATEGORIES,
  isRunPassed
} from '../data/resultsData';
import {
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Search
} from 'lucide-react';

interface HarnessDetailViewProps {
  harnessId: string;
  onBack: () => void;
  onSelectRun: (runId: string) => void;
  onSelectModel: (modelId: string) => void;
}

export const HarnessDetailView: React.FC<HarnessDetailViewProps> = ({
  harnessId,
  onBack,
  onSelectRun,
  onSelectModel
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedModel, setSelectedModel] = useState<string>('all');

  const meta = HARNESS_META[harnessId] || {
    id: harnessId,
    name: harnessId,
    shortName: harnessId,
    version: '1.0',
    logo: '/logos/openai.svg',
    color: '#10A37F',
    lightBg: '#F0FDF4',
    borderColor: '#BBF7D0',
    badgeBg: '#DCFCE7',
    badgeText: '#15803D',
    tagline: '',
    description: ''
  };

  const harnessRuns = ALL_RUNS.filter(r => r.harnessId === harnessId);
  const totalRuns = harnessRuns.length;
  const passedRuns = harnessRuns.filter(isRunPassed).length;
  const passRate = totalRuns > 0 ? (passedRuns / totalRuns) * 100 : 0;

  let totalWallClock = 0;
  let totalCost = 0;
  let totalTokens = 0;

  harnessRuns.forEach(r => {
    totalWallClock += r.execution?.wallClockSeconds || 0;
    totalCost += r.execution?.cost?.amount || 0;
    totalTokens += r.execution?.tokens?.totalReported || 0;
  });

  const avgWallClock = totalRuns > 0 ? totalWallClock / totalRuns : 0;
  const avgCost = totalRuns > 0 ? totalCost / totalRuns : 0;

  // Filtered runs
  const filteredRuns = harnessRuns.filter(r => {
    const matchesSearch = searchQuery === '' ||
      r.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.taskId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || r.categoryId === selectedCategory;
    const matchesModel = selectedModel === 'all' || r.modelId === selectedModel;
    return matchesSearch && matchesCategory && matchesModel;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Breadcrumb & Back Button */}
      <div className="flex items-center gap-2 text-[13px] text-[#777777]">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[#111111] hover:text-blue-600 font-medium transition-colors"
        >
          <ChevronLeft size={16} />
          <span>All Harnesses</span>
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
                <span className="text-[12px] font-mono font-medium text-[#666666] bg-[#F5F5F4] px-2.5 py-0.5 rounded-md border border-[#E5E5E3]">
                  v{meta.version}
                </span>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Verified Runner
                </span>
              </div>
              <p className="text-[14px] text-[#555555] mt-1.5 max-w-2xl leading-relaxed">
                {meta.description}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Metric Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-6">
          <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#EAEAEA]">
            <span className="text-[11px] font-bold text-[#777777] uppercase tracking-wider block mb-1">
              Verified Success Rate
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
              {Math.round(totalTokens / (totalRuns || 1)).toLocaleString()} avg per task
            </span>
          </div>
        </div>
      </div>

      {/* Model Performance Cards under this Harness */}
      <div>
        <h3 className="text-[18px] font-bold text-[#111111] mb-3">
          Model Outcomes on this Harness
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ALL_MODEL_IDS.map(mId => {
            const mMeta = MODEL_META[mId];
            const mRuns = harnessRuns.filter(r => r.modelId === mId);
            const mPass = mRuns.filter(isRunPassed).length;
            const mRate = mRuns.length > 0 ? (mPass / mRuns.length) * 100 : 0;
            let mTime = 0, mCost = 0;
            mRuns.forEach(r => {
              mTime += r.execution?.wallClockSeconds || 0;
              mCost += r.execution?.cost?.amount || 0;
            });
            const mAvgTime = mRuns.length > 0 ? mTime / mRuns.length : 0;
            const mAvgCost = mRuns.length > 0 ? mCost / mRuns.length : 0;

            return (
              <div
                key={mId}
                onClick={() => onSelectModel(mId)}
                className="bg-white rounded-xl border border-[#EAEAEA] hover:border-[#CCCCCC] p-5 shadow-2xs transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA]">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={mMeta?.logo || '/logos/openai.svg'}
                      alt={mMeta?.name}
                      className="w-7 h-7 rounded-md bg-[#FAF9F6] border border-[#E5E5E5] p-1 object-contain"
                    />
                    <div>
                      <h4 className="font-bold text-[#111111] group-hover:text-blue-600 transition-colors">
                        {mMeta?.name || mId}
                      </h4>
                      <span className="text-[11px] text-[#777777]">{mMeta?.provider}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[18px] font-mono font-bold text-[#111111] block">
                      {mRate.toFixed(1)}%
                    </span>
                    <span className="text-[11px] font-mono text-[#888888]">
                      {mPass}/{mRuns.length} passed
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 text-[12px]">
                  <div>
                    <span className="text-[#888888] block text-[11px]">Avg Time:</span>
                    <span className="font-mono font-semibold text-[#111111]">{mAvgTime.toFixed(1)}s</span>
                  </div>
                  <div>
                    <span className="text-[#888888] block text-[11px]">Avg Cost:</span>
                    <span className="font-mono font-semibold text-[#111111]">${mAvgCost.toFixed(4)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Domain Breakdown Progress Cards */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-[#EAEAEA] p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
        <h3 className="text-[17px] font-bold text-[#111111]">
          Domain Success Rates
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ALL_CATEGORIES.map(cat => {
            const catRuns = harnessRuns.filter(r => r.categoryId === cat.id);
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

      {/* Full Runs List for this Harness */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-[#EAEAEA] shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Table Filters */}
        <div className="p-4 sm:p-5 border-b border-[#EAEAEA] flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#FAF9F6]">
          <div className="flex items-center gap-2">
            <h4 className="text-[16px] font-bold text-[#111111]">
              Execution Runs ({filteredRuns.length})
            </h4>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
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

            {/* Model Filter */}
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="text-[12px] bg-white border border-[#E5E3DF] rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="all">All Models</option>
              {ALL_MODEL_IDS.map(mId => (
                <option key={mId} value={mId}>{MODEL_META[mId]?.shortName || mId}</option>
              ))}
            </select>

            {/* Category Filter */}
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-white border-b border-[#EAEAEA] text-[11px] font-bold uppercase tracking-wider text-[#777777]">
                <th className="py-3 px-4 min-w-[240px]">Task Name</th>
                <th className="py-3 px-3">Domain</th>
                <th className="py-3 px-3">Model</th>
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
                const modelMeta = MODEL_META[run.modelId];
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
                          src={modelMeta?.logo || '/logos/openai.svg'}
                          alt={modelMeta?.name}
                          className="w-4 h-4 object-contain"
                        />
                        <span className="text-[12px]">{modelMeta?.shortName || run.modelId}</span>
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

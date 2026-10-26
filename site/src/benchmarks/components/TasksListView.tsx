import React, { useState } from 'react';
import {
  ALL_RUNS,
  HARNESS_META,
  MODEL_META,
  CATEGORY_META,
  ALL_HARNESS_IDS,
  ALL_MODEL_IDS,
  ALL_CATEGORIES,
  isRunPassed
} from '../data/resultsData';
import {
  Search,
  CheckCircle2,
  XCircle,
  ShieldCheck
} from 'lucide-react';

interface TasksListViewProps {
  onSelectRun: (runId: string) => void;
  onSelectHarness: (harnessId: string) => void;
  onSelectModel: (modelId: string) => void;
}

export const TasksListView: React.FC<TasksListViewProps> = ({
  onSelectRun,
  onSelectHarness,
  onSelectModel
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedHarness, setSelectedHarness] = useState<string>('all');
  const [selectedModel, setSelectedModel] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pass' | 'fail'>('all');

  const filteredRuns = ALL_RUNS.filter(r => {
    const passed = isRunPassed(r);
    const matchesSearch = searchQuery === '' ||
      r.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.taskId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.prompt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || r.categoryId === selectedCategory;
    const matchesHarness = selectedHarness === 'all' || r.harnessId === selectedHarness;
    const matchesModel = selectedModel === 'all' || r.modelId === selectedModel;
    const matchesStatus = selectedStatus === 'all' || (selectedStatus === 'pass' ? passed : !passed);
    return matchesSearch && matchesCategory && matchesHarness && matchesModel && matchesStatus;
  });

  const passedCount = filteredRuns.filter(isRunPassed).length;
  let totalTime = 0;
  filteredRuns.forEach(r => {
    totalTime += r.execution?.wallClockSeconds || 0;
  });
  const avgTime = filteredRuns.length > 0 ? totalTime / filteredRuns.length : 0;

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAEAEA]">
        <div>
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#666666] uppercase tracking-wider mb-1">
            <ShieldCheck size={13} className="text-emerald-600" />
            <span>Automated Verification Suite</span>
          </div>
          <h1 className="text-[26px] sm:text-[30px] font-bold text-[#111111] tracking-tight leading-tight">
            All Benchmark Runs
          </h1>
          <p className="text-[13px] sm:text-[14px] text-[#666666] mt-0.5">
            Database of 84 recorded execution traces across Codex, Claude Code, and OpenCode with verified outcomes.
          </p>
        </div>

        {/* Aggregate Badges */}
        <div className="flex items-center gap-3">
          <div className="bg-white px-3.5 py-2 rounded-xl border border-[#EAEAEA] shadow-2xs">
            <span className="text-[10px] text-[#888888] font-bold uppercase tracking-wider block">Filtered Pass Rate</span>
            <span className="font-mono font-bold text-[16px] text-emerald-700">
              {filteredRuns.length > 0 ? ((passedCount / filteredRuns.length) * 100).toFixed(1) : 0}%
            </span>
            <span className="text-[11px] text-[#888888] ml-1">({passedCount}/{filteredRuns.length})</span>
          </div>

          <div className="bg-white px-3.5 py-2 rounded-xl border border-[#EAEAEA] shadow-2xs">
            <span className="text-[10px] text-[#888888] font-bold uppercase tracking-wider block">Avg Duration</span>
            <span className="font-mono font-bold text-[16px] text-[#111111]">
              {avgTime.toFixed(1)}s
            </span>
          </div>
        </div>
      </div>

      {/* Filter Bar Card */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-[#EAEAEA] p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <input
              type="text"
              placeholder="Search prompt, task ID, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-[13px] bg-[#FAF9F6] border border-[#E5E3DF] rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:border-[#CCCCCC]"
            />
            <Search size={14} className="absolute left-2.5 top-3 text-[#888888]" />
          </div>

          {/* Harness Filter */}
          <select
            value={selectedHarness}
            onChange={(e) => setSelectedHarness(e.target.value)}
            className="text-[13px] bg-[#FAF9F6] border border-[#E5E3DF] rounded-lg px-3 py-2 focus:outline-none cursor-pointer"
          >
            <option value="all">All Harnesses</option>
            {ALL_HARNESS_IDS.map(hId => (
              <option key={hId} value={hId}>{HARNESS_META[hId]?.name || hId}</option>
            ))}
          </select>

          {/* Model Filter */}
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="text-[13px] bg-[#FAF9F6] border border-[#E5E3DF] rounded-lg px-3 py-2 focus:outline-none cursor-pointer"
          >
            <option value="all">All Models</option>
            {ALL_MODEL_IDS.map(mId => (
              <option key={mId} value={mId}>{MODEL_META[mId]?.shortName || mId}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="text-[13px] bg-[#FAF9F6] border border-[#E5E3DF] rounded-lg px-3 py-2 focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="pass">Verified Pass</option>
            <option value="fail">Execution Fail</option>
          </select>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-[#EAEAEA] overflow-x-auto no-scrollbar">
          <span className="text-[11px] text-[#888888] font-bold uppercase tracking-wider mr-2">Domain:</span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#111111] text-white shadow-xs'
                : 'bg-[#FAF9F6] border border-[#E5E3DF] text-[#666666] hover:text-[#111111]'
            }`}
          >
            All
          </button>
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'bg-[#FAF9F6] border border-[#E5E3DF] text-[#666666] hover:text-[#111111]'
              }`}
            >
              {CATEGORY_META[cat.id]?.name || cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Runs Table */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-[#EAEAEA] shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#FAF9F6] border-b border-[#EAEAEA] text-[11px] font-bold uppercase tracking-wider text-[#777777]">
                <th className="py-3.5 px-4 min-w-[240px]">Task</th>
                <th className="py-3.5 px-3">Domain</th>
                <th className="py-3.5 px-3 min-w-[140px]">Harness</th>
                <th className="py-3.5 px-3 min-w-[150px]">Model</th>
                <th className="py-3.5 px-3">Outcome</th>
                <th className="py-3.5 px-3">Wall Time</th>
                <th className="py-3.5 px-3">Tokens</th>
                <th className="py-3.5 px-3">Cost</th>
                <th className="py-3.5 pr-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEAEA]">
              {filteredRuns.map(run => {
                const passed = isRunPassed(run);
                const harness = HARNESS_META[run.harnessId];
                const model = MODEL_META[run.modelId];
                const cat = CATEGORY_META[run.categoryId];

                return (
                  <tr
                    key={run.id}
                    onClick={() => onSelectRun(run.id)}
                    className="hover:bg-[#FAF9F6] transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-[#111111] group-hover:text-blue-600 transition-colors block line-clamp-1">
                        {run.taskName}
                      </span>
                      <span className="text-[11px] font-mono text-[#888888]">{run.taskId}</span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: (cat?.color || '#666') + '1A',
                          color: cat?.color || '#111'
                        }}
                      >
                        {cat?.name || run.categoryId}
                      </span>
                    </td>

                    <td className="py-3.5 px-3" onClick={(e) => { e.stopPropagation(); onSelectHarness(run.harnessId); }}>
                      <div className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                        <img
                          src={harness?.logo || '/logos/openai.svg'}
                          alt={harness?.name}
                          className="w-4 h-4 object-contain"
                        />
                        <span className="text-[12px] font-medium">{harness?.shortName || run.harnessId}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-3" onClick={(e) => { e.stopPropagation(); onSelectModel(run.modelId); }}>
                      <div className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                        <img
                          src={model?.logo || '/logos/openai.svg'}
                          alt={model?.name}
                          className="w-4 h-4 object-contain"
                        />
                        <span className="text-[12px] font-medium">{model?.shortName || run.modelId}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                          passed
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {passed ? <CheckCircle2 size={12} className="text-emerald-600" /> : <XCircle size={12} className="text-rose-600" />}
                        {passed ? 'PASS' : 'FAIL'}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 font-mono font-medium text-[#111111] text-[12px]">
                      {(run.execution?.wallClockSeconds || 0).toFixed(1)}s
                    </td>

                    <td className="py-3.5 px-3 font-mono text-[#666666] text-[12px]">
                      {(run.execution?.tokens?.totalReported || 0).toLocaleString()}
                    </td>

                    <td className="py-3.5 px-3 font-mono text-[#666666] text-[12px]">
                      ${(run.execution?.cost?.amount || 0).toFixed(4)}
                    </td>

                    <td className="py-3.5 pr-4 text-right">
                      <span className="text-[11px] font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                        Trace &rarr;
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

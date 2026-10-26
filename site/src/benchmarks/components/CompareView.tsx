import React, { useState } from 'react';
import {
  getModelByHarnessMatrix,
  computeHarnessStats,
  computeModelStats,
  HARNESS_META,
  MODEL_META,
  ALL_RUNS,
  ALL_TASKS,
  CATEGORY_META,
  isRunPassed,
  type BenchmarkRun
} from '../data/resultsData';
import {
  ArrowLeftRight,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface CompareViewProps {
  onSelectRun: (runId: string) => void;
  onSelectHarness: (harnessId: string) => void;
  onSelectModel: (modelId: string) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  onSelectRun,
  onSelectHarness,
  onSelectModel
}) => {
  const [activeTab, setActiveTab] = useState<'matrix-model' | 'matrix-harness' | 'head-to-head'>('matrix-model');
  const [metricMode, setMetricMode] = useState<'success' | 'time' | 'cost'>('success');

  // Head-to-head state
  const [compareType, setCompareType] = useState<'models' | 'harnesses'>('models');
  const [leftModel, setLeftModel] = useState<string>('deepseek-ai/DeepSeek-V4.1-Flash');
  const [rightModel, setRightModel] = useState<string>('zai-org/GLM-5.3-Flash');
  const [selectedHarnessScope, setSelectedHarnessScope] = useState<string>('all');

  const [leftHarness, setLeftHarness] = useState<string>('claude-code');
  const [rightHarness, setRightHarness] = useState<string>('codex');
  const [selectedModelScope, setSelectedModelScope] = useState<string>('all');

  const matrix = getModelByHarnessMatrix();
  const harnessStats = computeHarnessStats();
  const modelStats = computeModelStats();

  // Helper for cell tint scaling
  const getCellTint = (rate: number) => {
    if (rate >= 95) return 'bg-emerald-500/20 text-emerald-950 font-bold border-emerald-300/40';
    if (rate >= 80) return 'bg-emerald-500/12 text-emerald-900 font-semibold border-emerald-200/50';
    if (rate >= 65) return 'bg-emerald-500/8 text-emerald-850 font-medium border-emerald-100/60';
    if (rate >= 50) return 'bg-amber-500/10 text-amber-900 font-medium border-amber-200/40';
    return 'bg-rose-500/10 text-rose-900 font-medium border-rose-200/40';
  };

  // Compute Head-to-Head stats
  const getHeadToHeadModelRuns = () => {
    let leftRuns = ALL_RUNS.filter(r => r.modelId === leftModel);
    let rightRuns = ALL_RUNS.filter(r => r.modelId === rightModel);
    if (selectedHarnessScope !== 'all') {
      leftRuns = leftRuns.filter(r => r.harnessId === selectedHarnessScope);
      rightRuns = rightRuns.filter(r => r.harnessId === selectedHarnessScope);
    }
    return { leftRuns, rightRuns };
  };

  const getHeadToHeadHarnessRuns = () => {
    let leftRuns = ALL_RUNS.filter(r => r.harnessId === leftHarness);
    let rightRuns = ALL_RUNS.filter(r => r.harnessId === rightHarness);
    if (selectedModelScope !== 'all') {
      leftRuns = leftRuns.filter(r => r.modelId === selectedModelScope);
      rightRuns = rightRuns.filter(r => r.modelId === selectedModelScope);
    }
    return { leftRuns, rightRuns };
  };

  const modelH2H = getHeadToHeadModelRuns();
  const harnessH2H = getHeadToHeadHarnessRuns();

  const calcRunStats = (runs: BenchmarkRun[]) => {
    const total = runs.length;
    const passed = runs.filter(isRunPassed).length;
    let time = 0, cost = 0, tok = 0;
    runs.forEach(r => {
      time += r.execution?.wallClockSeconds || 0;
      cost += r.execution?.cost?.amount || 0;
      tok += r.execution?.tokens?.totalReported || 0;
    });
    return {
      total,
      passed,
      rate: total > 0 ? (passed / total) * 100 : 0,
      avgTime: total > 0 ? time / total : 0,
      totalCost: cost,
      avgCost: total > 0 ? cost / total : 0,
      avgTokens: total > 0 ? tok / total : 0,
    };
  };

  const leftModelStats = calcRunStats(modelH2H.leftRuns);
  const rightModelStats = calcRunStats(modelH2H.rightRuns);

  const leftHarnessStats = calcRunStats(harnessH2H.leftRuns);
  const rightHarnessStats = calcRunStats(harnessH2H.rightRuns);

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAEAEA]">
        <div>
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#666666] uppercase tracking-wider mb-1">
            <ArrowLeftRight size={13} className="text-blue-600" />
            <span>Cross-Evaluation Matrix</span>
          </div>
          <h1 className="text-[26px] sm:text-[30px] font-bold text-[#111111] tracking-tight leading-tight">
            Comparison Suite
          </h1>
          <p className="text-[13px] sm:text-[14px] text-[#666666] mt-0.5">
            Compare every model across each harness side-by-side across all benchmark tasks.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="bg-[#F0EFEA] p-1 rounded-xl flex items-center gap-1 border border-[#E5E3DF] shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('matrix-model')}
            className={`px-3 py-1.5 rounded-lg text-[12px] sm:text-[13px] font-medium transition-all ${
              activeTab === 'matrix-model'
                ? 'bg-white text-[#111111] font-semibold shadow-2xs'
                : 'text-[#666666] hover:text-[#111111]'
            }`}
          >
            By Model Matrix
          </button>
          <button
            onClick={() => setActiveTab('matrix-harness')}
            className={`px-3 py-1.5 rounded-lg text-[12px] sm:text-[13px] font-medium transition-all ${
              activeTab === 'matrix-harness'
                ? 'bg-white text-[#111111] font-semibold shadow-2xs'
                : 'text-[#666666] hover:text-[#111111]'
            }`}
          >
            By Harness Matrix
          </button>
          <button
            onClick={() => setActiveTab('head-to-head')}
            className={`px-3 py-1.5 rounded-lg text-[12px] sm:text-[13px] font-medium transition-all ${
              activeTab === 'head-to-head'
                ? 'bg-white text-[#111111] font-semibold shadow-2xs'
                : 'text-[#666666] hover:text-[#111111]'
            }`}
          >
            Head-to-Head
          </button>
        </div>
      </div>

      {/* MATRIX VIEW 1: BY MODEL (Rows: Models, Columns: Harnesses) */}
      {activeTab === 'matrix-model' && (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-[#EAEAEA] p-5 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EAEAEA]">
            <div>
              <h3 className="text-[18px] sm:text-[20px] font-bold text-[#111111]">
                Full Matrix: Models across Harnesses
              </h3>
              <p className="text-[13px] text-[#666666]">
                Cell color intensity scales with verified success rate. The strongest cell tint indicates superior performance.
              </p>
            </div>

            {/* Metric Switcher */}
            <div className="bg-[#FAF9F6] p-1 rounded-lg border border-[#E5E3DF] flex items-center gap-1 self-start sm:self-auto">
              <button
                onClick={() => setMetricMode('success')}
                className={`px-2.5 py-1 rounded text-[12px] font-medium transition-colors ${
                  metricMode === 'success' ? 'bg-[#111111] text-white shadow-xs' : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                Pass Rate (%)
              </button>
            </div>
          </div>

          {/* Responsive Matrix Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EAEAEA]">
                  <th className="py-3 px-4 font-bold text-[12px] text-[#777777] uppercase tracking-wider min-w-[220px]">
                    Model
                  </th>
                  {matrix.harnesses.map(h => (
                    <th
                      key={h.id}
                      onClick={() => onSelectHarness(h.id)}
                      className="py-3 px-4 font-bold text-[13px] text-[#111111] cursor-pointer hover:text-blue-600 transition-colors min-w-[160px]"
                    >
                      <div className="flex items-center gap-2">
                        <img src={h.logo} alt={h.name} className="w-4 h-4 object-contain" />
                        <span>{h.name}</span>
                      </div>
                    </th>
                  ))}
                  <th className="py-3 px-4 font-bold text-[12px] text-[#777777] uppercase tracking-wider text-right min-w-[120px]">
                    Overall
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA] text-[13px]">
                {matrix.models.map(m => {
                  const mSummary = modelStats.find(s => s.modelId === m.id);
                  return (
                    <tr key={m.id} className="hover:bg-[#FAF9F6]/50 transition-colors">
                      {/* Model Row Header */}
                      <td className="py-4 px-4 font-medium" onClick={() => onSelectModel(m.id)}>
                        <div className="flex items-center gap-2.5 cursor-pointer group">
                          <img
                            src={m.logo}
                            alt={m.name}
                            className="w-6 h-6 rounded bg-[#FAF9F6] border border-[#E5E5E5] p-1 object-contain"
                          />
                          <div>
                            <span className="font-bold text-[#111111] group-hover:text-blue-600 transition-colors block">
                              {m.name}
                            </span>
                            <span className="text-[11px] text-[#777777]">
                              {MODEL_META[m.id]?.provider || 'Nebius Token Factory'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Harness Cells */}
                      {matrix.harnesses.map(h => {
                        const cell = matrix.cells[m.id]?.[h.id];
                        if (!cell) {
                          return (
                            <td key={h.id} className="py-4 px-4 text-neutral-400 font-mono">
                              —
                            </td>
                          );
                        }
                        return (
                          <td key={h.id} className="py-3 px-3">
                            <div
                              onClick={() => onSelectHarness(h.id)}
                              className={`p-3 rounded-xl border transition-all cursor-pointer hover:shadow-xs ${getCellTint(
                                cell.rate
                              )}`}
                            >
                              <div className="flex items-baseline justify-between gap-1">
                                <span className="font-mono text-[16px] font-bold">
                                  {cell.rate.toFixed(1)}%
                                </span>
                                <span className="text-[11px] font-mono opacity-70">
                                  {cell.passed}/{cell.total}
                                </span>
                              </div>

                              <div className="flex items-center justify-between text-[11px] font-mono opacity-80 mt-1 pt-1 border-t border-black/5">
                                <span>{cell.avgTime.toFixed(1)}s</span>
                                <span>${cell.avgCost.toFixed(4)}</span>
                              </div>
                            </div>
                          </td>
                        );
                      })}

                      {/* Model Overall */}
                      <td className="py-4 px-4 text-right">
                        <span className="font-mono font-bold text-[#111111] text-[15px] block">
                          {mSummary?.successRate.toFixed(1)}%
                        </span>
                        <span className="text-[11px] text-[#777777] font-mono">
                          {mSummary?.passedRuns}/{mSummary?.totalRuns} verified
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MATRIX VIEW 2: BY HARNESS (Rows: Harnesses, Columns: Models) */}
      {activeTab === 'matrix-harness' && (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-[#EAEAEA] p-5 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EAEAEA]">
            <div>
              <h3 className="text-[18px] sm:text-[20px] font-bold text-[#111111]">
                Full Matrix: Harnesses across Models
              </h3>
              <p className="text-[13px] text-[#666666]">
                Direct breakdown showing how each harness performs on each open frontier model.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EAEAEA]">
                  <th className="py-3 px-4 font-bold text-[12px] text-[#777777] uppercase tracking-wider min-w-[200px]">
                    Harness
                  </th>
                  {matrix.models.map(m => (
                    <th
                      key={m.id}
                      onClick={() => onSelectModel(m.id)}
                      className="py-3 px-4 font-bold text-[13px] text-[#111111] cursor-pointer hover:text-blue-600 transition-colors min-w-[180px]"
                    >
                      <div className="flex items-center gap-2">
                        <img src={m.logo} alt={m.name} className="w-4 h-4 object-contain" />
                        <span>{m.shortName}</span>
                      </div>
                    </th>
                  ))}
                  <th className="py-3 px-4 font-bold text-[12px] text-[#777777] uppercase tracking-wider text-right min-w-[120px]">
                    Harness Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA] text-[13px]">
                {matrix.harnesses.map(h => {
                  const hSummary = harnessStats.find(s => s.harnessId === h.id);
                  return (
                    <tr key={h.id} className="hover:bg-[#FAF9F6]/50 transition-colors">
                      <td className="py-4 px-4 font-medium" onClick={() => onSelectHarness(h.id)}>
                        <div className="flex items-center gap-2.5 cursor-pointer group">
                          <img
                            src={h.logo}
                            alt={h.name}
                            className="w-6 h-6 rounded bg-[#FAF9F6] border border-[#E5E5E5] p-1 object-contain"
                          />
                          <div>
                            <span className="font-bold text-[#111111] group-hover:text-blue-600 transition-colors block">
                              {h.name}
                            </span>
                            <span className="text-[11px] text-[#777777]">
                              {HARNESS_META[h.id]?.tagline || ''}
                            </span>
                          </div>
                        </div>
                      </td>

                      {matrix.models.map(m => {
                        const cell = matrix.cells[m.id]?.[h.id];
                        if (!cell) {
                          return (
                            <td key={m.id} className="py-4 px-4 text-neutral-400 font-mono">
                              —
                            </td>
                          );
                        }
                        return (
                          <td key={m.id} className="py-3 px-3">
                            <div
                              onClick={() => onSelectHarness(h.id)}
                              className={`p-3 rounded-xl border transition-all cursor-pointer hover:shadow-xs ${getCellTint(
                                cell.rate
                              )}`}
                            >
                              <div className="flex items-baseline justify-between gap-1">
                                <span className="font-mono text-[16px] font-bold">
                                  {cell.rate.toFixed(1)}%
                                </span>
                                <span className="text-[11px] font-mono opacity-70">
                                  {cell.passed}/{cell.total}
                                </span>
                              </div>

                              <div className="flex items-center justify-between text-[11px] font-mono opacity-80 mt-1 pt-1 border-t border-black/5">
                                <span>{cell.avgTime.toFixed(1)}s</span>
                                <span>${cell.avgCost.toFixed(4)}</span>
                              </div>
                            </div>
                          </td>
                        );
                      })}

                      <td className="py-4 px-4 text-right">
                        <span className="font-mono font-bold text-[#111111] text-[15px] block">
                          {hSummary?.successRate.toFixed(1)}%
                        </span>
                        <span className="text-[11px] text-[#777777] font-mono">
                          {hSummary?.passedRuns}/{hSummary?.totalRuns} verified
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* HEAD-TO-HEAD COMPARISON VIEW */}
      {activeTab === 'head-to-head' && (
        <div className="space-y-6">
          {/* Submode Switcher: Compare Models vs Compare Harnesses */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-[#EAEAEA] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAEAEA]">
              <div>
                <h3 className="text-[18px] sm:text-[20px] font-bold text-[#111111]">
                  Head-to-Head Comparative Evaluator
                </h3>
                <p className="text-[13px] text-[#666666]">
                  Select two entities to run an automated delta evaluation across all matching tasks.
                </p>
              </div>

              <div className="bg-[#FAF9F6] p-1 rounded-lg border border-[#E5E3DF] flex items-center gap-1 self-start sm:self-auto">
                <button
                  onClick={() => setCompareType('models')}
                  className={`px-3 py-1.5 rounded-md text-[12px] font-semibold transition-all ${
                    compareType === 'models'
                      ? 'bg-[#111111] text-white shadow-xs'
                      : 'text-[#666666] hover:text-[#111111]'
                  }`}
                >
                  Compare Two Models
                </button>
                <button
                  onClick={() => setCompareType('harnesses')}
                  className={`px-3 py-1.5 rounded-md text-[12px] font-semibold transition-all ${
                    compareType === 'harnesses'
                      ? 'bg-[#111111] text-white shadow-xs'
                      : 'text-[#666666] hover:text-[#111111]'
                  }`}
                >
                  Compare Two Harnesses
                </button>
              </div>
            </div>

            {/* Entity Selectors */}
            {compareType === 'models' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                <div>
                  <label className="text-[11px] font-semibold text-[#777777] uppercase tracking-wider block mb-1.5">
                    Model A (Left)
                  </label>
                  <select
                    value={leftModel}
                    onChange={(e) => setLeftModel(e.target.value)}
                    className="w-full text-[13px] font-medium bg-[#FAF9F6] border border-[#E5E3DF] p-2.5 rounded-lg focus:outline-none"
                  >
                    {matrix.models.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#777777] uppercase tracking-wider block mb-1.5">
                    Model B (Right)
                  </label>
                  <select
                    value={rightModel}
                    onChange={(e) => setRightModel(e.target.value)}
                    className="w-full text-[13px] font-medium bg-[#FAF9F6] border border-[#E5E3DF] p-2.5 rounded-lg focus:outline-none"
                  >
                    {matrix.models.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#777777] uppercase tracking-wider block mb-1.5">
                    Harness Scope
                  </label>
                  <select
                    value={selectedHarnessScope}
                    onChange={(e) => setSelectedHarnessScope(e.target.value)}
                    className="w-full text-[13px] font-medium bg-[#FAF9F6] border border-[#E5E3DF] p-2.5 rounded-lg focus:outline-none"
                  >
                    <option value="all">All Harnesses (Aggregated)</option>
                    {matrix.harnesses.map(h => (
                      <option key={h.id} value={h.id}>{h.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                <div>
                  <label className="text-[11px] font-semibold text-[#777777] uppercase tracking-wider block mb-1.5">
                    Harness A (Left)
                  </label>
                  <select
                    value={leftHarness}
                    onChange={(e) => setLeftHarness(e.target.value)}
                    className="w-full text-[13px] font-medium bg-[#FAF9F6] border border-[#E5E3DF] p-2.5 rounded-lg focus:outline-none"
                  >
                    {matrix.harnesses.map(h => (
                      <option key={h.id} value={h.id}>{h.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#777777] uppercase tracking-wider block mb-1.5">
                    Harness B (Right)
                  </label>
                  <select
                    value={rightHarness}
                    onChange={(e) => setRightHarness(e.target.value)}
                    className="w-full text-[13px] font-medium bg-[#FAF9F6] border border-[#E5E3DF] p-2.5 rounded-lg focus:outline-none"
                  >
                    {matrix.harnesses.map(h => (
                      <option key={h.id} value={h.id}>{h.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#777777] uppercase tracking-wider block mb-1.5">
                    Model Scope
                  </label>
                  <select
                    value={selectedModelScope}
                    onChange={(e) => setSelectedModelScope(e.target.value)}
                    className="w-full text-[13px] font-medium bg-[#FAF9F6] border border-[#E5E3DF] p-2.5 rounded-lg focus:outline-none"
                  >
                    <option value="all">All Models (Aggregated)</option>
                    {matrix.models.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Delta Highlights Cards */}
          {compareType === 'models' ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Pass Rate Delta */}
              <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] shadow-2xs">
                <div className="text-[11px] font-bold text-[#777777] uppercase tracking-wider mb-2">
                  Pass Rate Delta
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="text-[20px] font-mono font-bold text-[#111111]">
                    {leftModelStats.rate.toFixed(1)}% <span className="text-[#888888] text-[13px] font-normal">vs</span> {rightModelStats.rate.toFixed(1)}%
                  </div>
                </div>
                <div className="mt-2 text-[12px] font-medium">
                  {leftModelStats.rate >= rightModelStats.rate ? (
                    <span className="text-emerald-700 font-semibold">
                      +{ (leftModelStats.rate - rightModelStats.rate).toFixed(1) }% higher pass rate on {MODEL_META[leftModel]?.shortName}
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-semibold">
                      +{ (rightModelStats.rate - leftModelStats.rate).toFixed(1) }% higher pass rate on {MODEL_META[rightModel]?.shortName}
                    </span>
                  )}
                </div>
              </div>

              {/* Time Delta */}
              <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] shadow-2xs">
                <div className="text-[11px] font-bold text-[#777777] uppercase tracking-wider mb-2">
                  Average Execution Speed
                </div>
                <div className="text-[20px] font-mono font-bold text-[#111111]">
                  {leftModelStats.avgTime.toFixed(1)}s <span className="text-[#888888] text-[13px] font-normal">vs</span> {rightModelStats.avgTime.toFixed(1)}s
                </div>
                <div className="mt-2 text-[12px] font-medium text-[#555555]">
                  Delta: {Math.abs(leftModelStats.avgTime - rightModelStats.avgTime).toFixed(1)}s per task
                </div>
              </div>

              {/* Cost Delta */}
              <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] shadow-2xs">
                <div className="text-[11px] font-bold text-[#777777] uppercase tracking-wider mb-2">
                  Total Reported API Cost
                </div>
                <div className="text-[20px] font-mono font-bold text-[#111111]">
                  ${leftModelStats.totalCost.toFixed(3)} <span className="text-[#888888] text-[13px] font-normal">vs</span> ${rightModelStats.totalCost.toFixed(3)}
                </div>
                <div className="mt-2 text-[12px] font-medium text-[#555555]">
                  Difference: ${Math.abs(leftModelStats.totalCost - rightModelStats.totalCost).toFixed(3)}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] shadow-2xs">
                <div className="text-[11px] font-bold text-[#777777] uppercase tracking-wider mb-2">
                  Harness Pass Rate Delta
                </div>
                <div className="text-[20px] font-mono font-bold text-[#111111]">
                  {leftHarnessStats.rate.toFixed(1)}% <span className="text-[#888888] text-[13px] font-normal">vs</span> {rightHarnessStats.rate.toFixed(1)}%
                </div>
                <div className="mt-2 text-[12px] font-medium text-emerald-700 font-semibold">
                  {leftHarnessStats.rate >= rightHarnessStats.rate
                    ? `+${(leftHarnessStats.rate - rightHarnessStats.rate).toFixed(1)}% higher on ${HARNESS_META[leftHarness]?.shortName}`
                    : `+${(rightHarnessStats.rate - leftHarnessStats.rate).toFixed(1)}% higher on ${HARNESS_META[rightHarness]?.shortName}`}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] shadow-2xs">
                <div className="text-[11px] font-bold text-[#777777] uppercase tracking-wider mb-2">
                  Wall Time per Task
                </div>
                <div className="text-[20px] font-mono font-bold text-[#111111]">
                  {leftHarnessStats.avgTime.toFixed(1)}s <span className="text-[#888888] text-[13px] font-normal">vs</span> {rightHarnessStats.avgTime.toFixed(1)}s
                </div>
                <div className="mt-2 text-[12px] font-medium text-[#555555]">
                  Delta: {Math.abs(leftHarnessStats.avgTime - rightHarnessStats.avgTime).toFixed(1)}s
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] shadow-2xs">
                <div className="text-[11px] font-bold text-[#777777] uppercase tracking-wider mb-2">
                  Total Reported API Cost
                </div>
                <div className="text-[20px] font-mono font-bold text-[#111111]">
                  ${leftHarnessStats.totalCost.toFixed(3)} <span className="text-[#888888] text-[13px] font-normal">vs</span> ${rightHarnessStats.totalCost.toFixed(3)}
                </div>
                <div className="mt-2 text-[12px] font-medium text-[#555555]">
                  Difference: ${Math.abs(leftHarnessStats.totalCost - rightHarnessStats.totalCost).toFixed(3)}
                </div>
              </div>
            </div>
          )}

          {/* Task-by-Task Side-by-Side Comparison Table */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-[#EAEAEA] shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="p-5 border-b border-[#EAEAEA] flex items-center justify-between">
              <div>
                <h4 className="text-[16px] font-bold text-[#111111]">
                  Task-by-Task Breakdown
                </h4>
                <p className="text-[12px] text-[#666666]">
                  Side-by-side run outcome for every task in the benchmark suite.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[13px]">
                <thead>
                  <tr className="bg-[#FAF9F6] border-b border-[#EAEAEA] text-[11px] font-bold uppercase tracking-wider text-[#777777]">
                    <th className="py-3 px-4 min-w-[200px]">Task</th>
                    <th className="py-3 px-3">Domain</th>
                    <th className="py-3 px-4 min-w-[180px]">
                      {compareType === 'models' ? MODEL_META[leftModel]?.shortName : HARNESS_META[leftHarness]?.shortName}
                    </th>
                    <th className="py-3 px-4 min-w-[180px]">
                      {compareType === 'models' ? MODEL_META[rightModel]?.shortName : HARNESS_META[rightHarness]?.shortName}
                    </th>
                    <th className="py-3 px-3 text-right">Delta Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAEA]">
                  {ALL_TASKS.map(task => {
                    let leftRun: BenchmarkRun | undefined;
                    let rightRun: BenchmarkRun | undefined;

                    if (compareType === 'models') {
                      leftRun = modelH2H.leftRuns.find(r => r.taskId === task.id);
                      rightRun = modelH2H.rightRuns.find(r => r.taskId === task.id);
                    } else {
                      leftRun = harnessH2H.leftRuns.find(r => r.taskId === task.id);
                      rightRun = harnessH2H.rightRuns.find(r => r.taskId === task.id);
                    }

                    const leftPassed = leftRun ? isRunPassed(leftRun) : null;
                    const rightPassed = rightRun ? isRunPassed(rightRun) : null;

                    const isDivergent = leftPassed !== null && rightPassed !== null && leftPassed !== rightPassed;

                    return (
                      <tr
                        key={task.id}
                        className={`hover:bg-[#FAF9F6] transition-colors ${
                          isDivergent ? 'bg-amber-50/30' : ''
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-[#111111] block line-clamp-1">{task.name}</span>
                          <span className="text-[11px] font-mono text-[#888888]">{task.id}</span>
                        </td>

                        <td className="py-3.5 px-3">
                          <span
                            className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: (CATEGORY_META[task.categoryId]?.color || '#777') + '1A',
                              color: CATEGORY_META[task.categoryId]?.color || '#111'
                            }}
                          >
                            {CATEGORY_META[task.categoryId]?.name || task.categoryId}
                          </span>
                        </td>

                        {/* Left Run Cell */}
                        <td className="py-3.5 px-4">
                          {leftRun ? (
                            <button
                              onClick={() => onSelectRun(leftRun!.id)}
                              className="flex items-center gap-2 hover:opacity-80 text-left group"
                            >
                              {leftPassed ? (
                                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                              ) : (
                                <XCircle size={16} className="text-rose-600 shrink-0" />
                              )}
                              <div>
                                <span className="font-mono text-[12px] font-semibold text-[#111111]">
                                  {(leftRun.execution?.wallClockSeconds || 0).toFixed(1)}s
                                </span>
                                <span className="text-[11px] text-[#777777] block font-mono">
                                  ${(leftRun.execution?.cost?.amount || 0).toFixed(4)}
                                </span>
                              </div>
                            </button>
                          ) : (
                            <span className="text-[#AAAAAA] font-mono text-[11px]">No run</span>
                          )}
                        </td>

                        {/* Right Run Cell */}
                        <td className="py-3.5 px-4">
                          {rightRun ? (
                            <button
                              onClick={() => onSelectRun(rightRun!.id)}
                              className="flex items-center gap-2 hover:opacity-80 text-left group"
                            >
                              {rightPassed ? (
                                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                              ) : (
                                <XCircle size={16} className="text-rose-600 shrink-0" />
                              )}
                              <div>
                                <span className="font-mono text-[12px] font-semibold text-[#111111]">
                                  {(rightRun.execution?.wallClockSeconds || 0).toFixed(1)}s
                                </span>
                                <span className="text-[11px] text-[#777777] block font-mono">
                                  ${(rightRun.execution?.cost?.amount || 0).toFixed(4)}
                                </span>
                              </div>
                            </button>
                          ) : (
                            <span className="text-[#AAAAAA] font-mono text-[11px]">No run</span>
                          )}
                        </td>

                        {/* Delta indicator */}
                        <td className="py-3.5 px-3 text-right">
                          {isDivergent ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60">
                              Divergent outcome
                            </span>
                          ) : leftPassed && rightPassed ? (
                            <span className="text-[11px] font-medium text-emerald-700">Both Passed</span>
                          ) : (
                            <span className="text-[11px] text-[#888888]">Matched</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

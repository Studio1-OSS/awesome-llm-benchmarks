import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';
import type { HarnessStatSummary } from '../data/resultsData';
import {
  MODEL_META,
  CATEGORY_META,
  ALL_MODEL_IDS,
  ALL_CATEGORIES
} from '../data/resultsData';
import { Check, Clock, Coins, Cpu, Filter } from 'lucide-react';

interface OverallChartProps {
  stats: HarnessStatSummary[];
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  onSelectHarness?: (harnessId: string) => void;
}

export const OverallChart: React.FC<OverallChartProps> = ({
  stats,
  selectedModel,
  onModelChange,
  selectedCategory,
  onCategoryChange,
  onSelectHarness
}) => {
  const [metric, setMetric] = useState<'success' | 'time' | 'cost' | 'tokens'>('success');

  // Prepare data for recharts
  const chartData = stats.map(s => {
    let val = 0;
    let label = '';
    if (metric === 'success') {
      val = s.successRate;
      label = `${s.successRate.toFixed(1)}%`;
    } else if (metric === 'time') {
      val = s.avgWallClockSeconds;
      label = `${s.avgWallClockSeconds.toFixed(1)}s`;
    } else if (metric === 'cost') {
      val = Number((s.avgCostAmount * 100).toFixed(3)); // in cents for scale
      label = `$${s.avgCostAmount.toFixed(4)}`;
    } else {
      val = Math.round(s.avgTokens / 1000); // in thousands
      label = `${(s.avgTokens / 1000).toFixed(0)}k`;
    }

    return {
      id: s.harnessId,
      name: s.shortName,
      fullName: s.name,
      version: s.version,
      logo: s.logo,
      color: s.color,
      value: val,
      displayLabel: label,
      successRate: s.successRate,
      avgTime: s.avgWallClockSeconds,
      avgCost: s.avgCostAmount,
      avgTokens: s.avgTokens,
      passed: s.passedRuns,
      total: s.totalRuns
    };
  });

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-[#EAEAEA] p-5 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.02)] text-left">
      {/* Chart Top Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#EAEAEA]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-[19px] sm:text-[22px] font-bold text-[#111111] tracking-tight">
              Overall Harness Performance
            </h3>
            <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F0EFEA] text-[#555555]">
              Benchmark Suite
            </span>
          </div>
          <p className="text-[13px] text-[#666666] mt-1 max-w-xl">
            Comparing verified outcomes across identical workloads. Toggle metrics and model scopes to analyze latency and cost trade-offs.
          </p>
        </div>

        {/* Filters and Metric Switchers */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Model Selector Dropdown */}
          <div className="relative inline-flex">
            <select
              value={selectedModel}
              onChange={(e) => onModelChange(e.target.value)}
              className="text-[12px] sm:text-[13px] font-medium text-[#111111] bg-[#FAF9F6] border border-[#E5E3DF] hover:border-[#CCCCCC] px-3 py-1.5 rounded-lg focus:outline-none cursor-pointer appearance-none pr-8 transition-colors shadow-2xs"
            >
              <option value="all">All Models Combined</option>
              {ALL_MODEL_IDS.map(mId => (
                <option key={mId} value={mId}>
                  {MODEL_META[mId]?.shortName || mId}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#777777]">
              <svg className="fill-current h-3.5 w-3.5" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>
          </div>

          {/* Metric Toggle Buttons */}
          <div className="bg-[#F0EFEA] p-1 rounded-lg flex items-center gap-1 border border-[#E5E3DF]">
            <button
              onClick={() => setMetric('success')}
              className={`flex items-center gap-1 text-[11px] sm:text-[12px] font-medium px-2.5 py-1 rounded-md transition-all ${
                metric === 'success'
                  ? 'bg-white text-[#111111] shadow-2xs font-semibold'
                  : 'text-[#666666] hover:text-[#111111]'
              }`}
            >
              {metric === 'success' && <Check size={12} className="text-emerald-600" />}
              <span>Success</span>
            </button>

            <button
              onClick={() => setMetric('time')}
              className={`flex items-center gap-1 text-[11px] sm:text-[12px] font-medium px-2.5 py-1 rounded-md transition-all ${
                metric === 'time'
                  ? 'bg-white text-[#111111] shadow-2xs font-semibold'
                  : 'text-[#666666] hover:text-[#111111]'
              }`}
            >
              {metric === 'time' && <Clock size={12} className="text-[#8B5CF6]" />}
              <span>Time</span>
            </button>

            <button
              onClick={() => setMetric('cost')}
              className={`flex items-center gap-1 text-[11px] sm:text-[12px] font-medium px-2.5 py-1 rounded-md transition-all ${
                metric === 'cost'
                  ? 'bg-white text-[#111111] shadow-2xs font-semibold'
                  : 'text-[#666666] hover:text-[#111111]'
              }`}
            >
              {metric === 'cost' && <Coins size={12} className="text-[#10B981]" />}
              <span>Cost</span>
            </button>

            <button
              onClick={() => setMetric('tokens')}
              className={`flex items-center gap-1 text-[11px] sm:text-[12px] font-medium px-2.5 py-1 rounded-md transition-all ${
                metric === 'tokens'
                  ? 'bg-white text-[#111111] shadow-2xs font-semibold'
                  : 'text-[#666666] hover:text-[#111111]'
              }`}
            >
              {metric === 'tokens' && <Cpu size={12} className="text-[#3B82F6]" />}
              <span>Tokens</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-1.5 py-3 overflow-x-auto no-scrollbar">
        <span className="text-[12px] text-[#888888] font-medium mr-1.5 flex items-center gap-1">
          <Filter size={12} /> Domain:
        </span>
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-3 py-1 rounded-md text-[12px] font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-[#111111] text-white shadow-xs'
              : 'bg-[#FAF9F6] border border-[#E5E3DF] text-[#666666] hover:text-[#111111]'
          }`}
        >
          All Domains
        </button>
        {ALL_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`px-3 py-1 rounded-md text-[12px] font-medium transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#111111] text-white shadow-xs'
                : 'bg-[#FAF9F6] border border-[#E5E3DF] text-[#666666] hover:text-[#111111]'
            }`}
          >
            {CATEGORY_META[cat.id]?.name || cat.name}
          </button>
        ))}
      </div>

      {/* Recharts Bar Display */}
      <div className="h-[280px] sm:h-[320px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 25, right: 30, left: 0, bottom: 25 }}
            barSize={60}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEEEEE" />
            <XAxis
              dataKey="name"
              axisLine={{ stroke: '#E5E5E5' }}
              tickLine={false}
              tick={{ fill: '#333333', fontSize: 13, fontWeight: 600 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#888888', fontSize: 11 }}
              domain={metric === 'success' ? [0, 100] : [0, (dataMax: number) => (dataMax > 0 ? dataMax * 1.15 : 10)]}
              unit={metric === 'success' ? '%' : ''}
              width={40}
            />
            <RechartsTooltip
              cursor={{ fill: 'rgba(0,0,0,0.03)' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white border border-[#EAEAEA] rounded-xl shadow-xl p-3.5 text-left text-xs min-w-[210px] space-y-2">
                      <div className="flex items-center gap-2 pb-2 border-b border-[#EAEAEA]">
                        <img src={data.logo} alt={data.fullName} className="w-5 h-5 object-contain" />
                        <div>
                          <div className="font-bold text-[#111111] text-[13px]">{data.fullName}</div>
                          <div className="text-[10px] text-[#777777]">v{data.version}</div>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-[12px]">
                        <div className="flex justify-between items-center">
                          <span className="text-[#666666]">Success Rate:</span>
                          <span className="font-bold text-emerald-700 font-mono">
                            {data.successRate.toFixed(1)}% ({data.passed}/{data.total})
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#666666]">Avg Wall Time:</span>
                          <span className="font-medium text-[#111111] font-mono">{data.avgTime.toFixed(1)}s</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#666666]">Avg Cost / Task:</span>
                          <span className="font-medium text-[#111111] font-mono">${data.avgCost.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#666666]">Avg Tokens:</span>
                          <span className="font-medium text-[#111111] font-mono">{Math.round(data.avgTokens).toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="pt-1.5 border-t border-[#EAEAEA] text-[10px] text-blue-600 font-medium">
                        Click column to drill down &rarr;
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
              onClick={(entry) => {
                if (entry && entry.id) {
                  onSelectHarness?.(entry.id);
                }
              }}
              className="cursor-pointer"
            >
              {chartData.map((entry) => (
                <Cell
                  key={`cell-${entry.id}`}
                  fill={entry.color}
                  className="transition-opacity duration-200 hover:opacity-85"
                />
              ))}
              <LabelList
                dataKey="displayLabel"
                position="top"
                fill="#111111"
                fontSize={13}
                fontWeight={700}
                offset={10}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Harness Bottom Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5 mt-2 border-t border-[#EAEAEA]">
        {stats.map(s => (
          <button
            key={s.harnessId}
            onClick={() => onSelectHarness?.(s.harnessId)}
            className="flex items-center justify-between p-3 rounded-lg border border-[#EAEAEA] hover:border-[#CCCCCC] bg-[#FAF9F6] hover:bg-white transition-all text-left group"
          >
            <div className="flex items-center gap-2.5">
              <img src={s.logo} alt={s.name} className="w-5 h-5 object-contain" />
              <div>
                <span className="text-[13px] font-semibold text-[#111111] block group-hover:text-blue-600 transition-colors">
                  {s.name}
                </span>
                <span className="text-[11px] text-[#777777]">
                  {s.passedRuns} of {s.totalRuns} passed
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[14px] font-bold font-mono text-emerald-700 block">
                {s.successRate.toFixed(1)}%
              </span>
              <span className="text-[11px] font-mono text-[#888888]">
                {s.avgWallClockSeconds.toFixed(1)}s avg
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

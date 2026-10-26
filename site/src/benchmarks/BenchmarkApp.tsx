import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  computeHarnessStats,
  ALL_RUNS,
  ALL_MODEL_IDS
} from './data/resultsData';
import { BenchmarkNav } from './components/BenchmarkNav';
import { HarnessLeaderboard } from './components/HarnessLeaderboard';
import { OverallChart } from './components/OverallChart';
import { CompareView } from './components/CompareView';
import { HarnessDetailView } from './components/HarnessDetailView';
import { ModelDetailView } from './components/ModelDetailView';
import { TasksListView } from './components/TasksListView';
import { MethodologyView } from './components/MethodologyView';
import { RunDetailModal } from './components/RunDetailModal';
import {
  Trophy,
  ShieldCheck,
  Clock,
  Cpu
} from 'lucide-react';

export default function BenchmarkApp() {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse path: /benchmarks, /benchmarks/harnesses/:id, /benchmarks/models/:id, /benchmarks/compare, etc.
  const pathParts = location.pathname.replace(/^\/benchmarks\/?/, '').split('/').filter(Boolean);

  const currentSection = pathParts[0] || 'leaderboard'; // 'leaderboard', 'harnesses', 'models', 'compare', 'runs', 'methodology'
  const subId = pathParts[1] || null;

  // Selected filters for leaderboard & overall chart
  const [selectedChartModel, setSelectedChartModel] = useState<string>('all');
  const [selectedChartCategory, setSelectedChartCategory] = useState<string>('all');
  const [inspectingRunId, setInspectingRunId] = useState<string | null>(null);

  // Compute stats
  const harnessStats = computeHarnessStats(selectedChartModel, selectedChartCategory);
  const totalVerifiedRuns = ALL_RUNS.length;

  let totalWallClock = 0;
  ALL_RUNS.forEach(r => {
    totalWallClock += r.execution?.wallClockSeconds || 0;
  });
  const avgTimePerTask = totalWallClock / totalVerifiedRuns;

  const handleTabChange = (tab: string) => {
    if (tab === 'leaderboard') {
      navigate('/benchmarks');
    } else {
      navigate(`/benchmarks/${tab}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHarness = (harnessId: string) => {
    navigate(`/benchmarks/harnesses/${harnessId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectModel = (modelId: string) => {
    navigate(`/benchmarks/models/${encodeURIComponent(modelId)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRun = (runId: string) => {
    setInspectingRunId(runId);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#171717] font-sans overflow-x-hidden selection:bg-[#EAEAEA] flex flex-col">
      {/* Sticky Header */}
      <BenchmarkNav
        currentTab={currentSection}
        onTabChange={handleTabChange}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[1280px] 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-8 sm:py-12 space-y-10">
        
        {/* VIEW 1: Main Leaderboard View */}
        {currentSection === 'leaderboard' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Top Stat Highlights Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
              <div className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-[#EAEAEA] shadow-2xs">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#888888] uppercase tracking-wider mb-1">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  <span>Audited Traces</span>
                </div>
                <div className="text-[22px] sm:text-[28px] font-mono font-bold text-[#111111]">
                  {totalVerifiedRuns}
                </div>
                <div className="text-[11px] text-[#666666] mt-0.5">
                  100% deterministic verification
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-[#EAEAEA] shadow-2xs">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#888888] uppercase tracking-wider mb-1">
                  <Trophy size={13} className="text-amber-600" />
                  <span>Highest Win Rate</span>
                </div>
                <div className="text-[22px] sm:text-[28px] font-mono font-bold text-emerald-700">
                  {harnessStats[0]?.successRate.toFixed(1)}%
                </div>
                <div className="text-[11px] text-[#666666] mt-0.5 font-medium">
                  Led by {harnessStats[0]?.name}
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-[#EAEAEA] shadow-2xs">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#888888] uppercase tracking-wider mb-1">
                  <Clock size={13} className="text-purple-600" />
                  <span>Avg Task Duration</span>
                </div>
                <div className="text-[22px] sm:text-[28px] font-mono font-bold text-[#111111]">
                  {avgTimePerTask.toFixed(1)}s
                </div>
                <div className="text-[11px] text-[#666666] mt-0.5">
                  Real wall-clock seconds
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-[#EAEAEA] shadow-2xs">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#888888] uppercase tracking-wider mb-1">
                  <Cpu size={13} className="text-blue-600" />
                  <span>Frontier Open Models</span>
                </div>
                <div className="text-[22px] sm:text-[28px] font-mono font-bold text-[#111111]">
                  {ALL_MODEL_IDS.length}
                </div>
                <div className="text-[11px] text-[#666666] mt-0.5">
                  DeepSeek V4.1 & GLM 5.3
                </div>
              </div>
            </div>

            {/* Overall Comparison Bar Chart */}
            <OverallChart
              stats={harnessStats}
              selectedModel={selectedChartModel}
              onModelChange={setSelectedChartModel}
              selectedCategory={selectedChartCategory}
              onCategoryChange={setSelectedChartCategory}
              onSelectHarness={handleSelectHarness}
            />

            {/* Main Harness Leaderboard Table */}
            <HarnessLeaderboard
              stats={harnessStats}
              onSelectHarness={handleSelectHarness}
              onSelectRun={handleSelectRun}
              onNavigateToCompare={() => handleTabChange('compare')}
            />
          </div>
        )}

        {/* VIEW 2: Harness Detail View */}
        {currentSection === 'harnesses' && subId && (
          <div className="animate-fadeIn">
            <HarnessDetailView
              harnessId={subId}
              onBack={() => handleTabChange('leaderboard')}
              onSelectRun={handleSelectRun}
              onSelectModel={handleSelectModel}
            />
          </div>
        )}

        {/* VIEW 3: Model Detail View */}
        {currentSection === 'models' && subId && (
          <div className="animate-fadeIn">
            <ModelDetailView
              modelId={decodeURIComponent(subId)}
              onBack={() => handleTabChange('leaderboard')}
              onSelectRun={handleSelectRun}
              onSelectHarness={handleSelectHarness}
            />
          </div>
        )}

        {/* VIEW 4: Compare Matrix & Head-to-Head */}
        {currentSection === 'compare' && (
          <div className="animate-fadeIn">
            <CompareView
              onSelectRun={handleSelectRun}
              onSelectHarness={handleSelectHarness}
              onSelectModel={handleSelectModel}
            />
          </div>
        )}

        {/* VIEW 5: Tasks & Runs Database */}
        {currentSection === 'runs' && (
          <div className="animate-fadeIn">
            <TasksListView
              onSelectRun={handleSelectRun}
              onSelectHarness={handleSelectHarness}
              onSelectModel={handleSelectModel}
            />
          </div>
        )}

        {/* VIEW 6: Methodology & Evaluators */}
        {currentSection === 'methodology' && (
          <div className="animate-fadeIn">
            <MethodologyView />
          </div>
        )}
      </main>

      {/* Deep Run Inspector Modal */}
      <RunDetailModal
        runId={inspectingRunId}
        onClose={() => setInspectingRunId(null)}
      />

      {/* Site Footer matching theme */}
      <footer className="mt-auto border-t border-[#EAEAEA] bg-[#FAF9F6] py-10 px-4 sm:px-6">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#777777]">
          <div className="flex items-center gap-2">
            <img src="/icon.png" alt="LLM Benchmark" className="w-5 h-5 object-contain" />
            <span className="font-semibold text-[#111111]">LLM Benchmark Suite</span>
            <span>&bull;</span>
            <span>Open Model Agent Evaluations</span>
          </div>

          <div className="flex items-center gap-6 text-[#555555]">
            <Link to="/" className="hover:text-[#111111] transition-colors">Home</Link>
            <Link to="/dashboard" className="hover:text-[#111111] transition-colors">Dashboard</Link>
            <Link to="/llm-race" className="hover:text-[#111111] transition-colors">LLM Race</Link>
            <Link to="/methodologies" className="hover:text-[#111111] transition-colors">Methodology</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

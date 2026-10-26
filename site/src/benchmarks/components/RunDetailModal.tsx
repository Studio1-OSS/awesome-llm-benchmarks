import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { X, CheckCircle2, XCircle, Copy, Check, Clock, Coins, Cpu, Terminal, ShieldCheck, FileText, Sparkles } from 'lucide-react';
import { ALL_RUNS, HARNESS_META, MODEL_META, CATEGORY_META, isRunPassed } from '../data/resultsData';

interface RunDetailModalProps {
  runId: string | null;
  onClose: () => void;
}

export const RunDetailModal: React.FC<RunDetailModalProps> = ({ runId, onClose }) => {
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [activeTab, setActiveTab] = useState<'response' | 'prompt' | 'evaluator'>('response');

  if (!runId) return null;
  const run = ALL_RUNS.find(r => r.id === runId);
  if (!run) return null;

  const harness = HARNESS_META[run.harnessId];
  const model = MODEL_META[run.modelId];
  const category = CATEGORY_META[run.categoryId];
  const passed = isRunPassed(run);

  const copyCommand = () => {
    if (run.command) {
      navigator.clipboard.writeText(run.command);
      setCopiedCommand(true);
      setTimeout(() => setCopiedCommand(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white border border-[#EAEAEA] rounded-xl sm:rounded-2xl max-w-4xl w-full shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-5 py-4 border-b border-[#EAEAEA] bg-[#FAF9F6] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span
              className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
              style={{
                backgroundColor: (category?.color || '#666') + '20',
                color: category?.color || '#111'
              }}
            >
              {category?.name || run.categoryId}
            </span>
            <span className="text-[12px] text-[#777777] font-mono">{run.taskId}</span>

            {/* Pass/Fail Status badge */}
            <span
              className={`inline-flex items-center gap-1 text-[12px] font-semibold px-2.5 py-0.5 rounded-full ${
                passed
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {passed ? <CheckCircle2 size={13} className="text-emerald-600" /> : <XCircle size={13} className="text-rose-600" />}
              {passed ? 'Independently Verified: PASS' : 'Execution Outcome: FAIL'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-[#777777] hover:text-[#111111] p-1.5 rounded-lg hover:bg-[#EAEAEA] transition-colors"
            title="Close inspector"
          >
            <X size={20} />
          </button>
        </div>

        {/* Task Title & Metadata bar */}
        <div className="px-5 py-4 border-b border-[#EAEAEA] bg-white shrink-0">
          <h2 className="text-[18px] sm:text-[20px] font-bold text-[#111111] tracking-tight leading-snug">
            {run.taskName}
          </h2>

          <div className="flex items-center gap-4 sm:gap-6 mt-3 text-[13px] text-[#555555] flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-[#888888]">Harness:</span>
              <div className="flex items-center gap-1.5 font-medium text-[#111111] bg-[#F5F5F4] px-2 py-0.5 rounded-md border border-[#E5E5E3]">
                {harness?.logo && (
                  <img src={harness.logo} alt={harness.name} className="w-4 h-4 object-contain" />
                )}
                <span>{harness?.name || run.harnessId}</span>
                <span className="text-[11px] text-[#777777]">{harness?.version}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#888888]">Model:</span>
              <div className="flex items-center gap-1.5 font-medium text-[#111111] bg-[#F5F5F4] px-2 py-0.5 rounded-md border border-[#E5E5E3]">
                {model?.logo && (
                  <img src={model.logo} alt={model.name} className="w-4 h-4 object-contain" />
                )}
                <span>{model?.shortName || run.modelId}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#888888]">Provider:</span>
              <span className="text-[#222222] font-medium">{run.execution?.provider || 'Nebius Token Factory'}</span>
            </div>
          </div>
        </div>

        {/* Execution Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-4 sm:p-5 bg-[#FAFAFA] border-b border-[#EAEAEA] shrink-0 text-left">
          <div className="bg-white p-3 rounded-lg border border-[#EAEAEA] shadow-2xs">
            <div className="flex items-center gap-1.5 text-[11px] text-[#777777] uppercase font-semibold mb-1">
              <Clock size={13} className="text-[#8B5CF6]" />
              <span>Wall-Clock Time</span>
            </div>
            <div className="text-[18px] sm:text-[20px] font-mono font-bold text-[#111111]">
              {(run.execution?.wallClockSeconds || 0).toFixed(2)}s
            </div>
            <div className="text-[10px] text-[#888888] mt-0.5">
              user: {(run.execution?.userSeconds || 0).toFixed(2)}s | sys: {(run.execution?.systemSeconds || 0).toFixed(2)}s
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-[#EAEAEA] shadow-2xs">
            <div className="flex items-center gap-1.5 text-[11px] text-[#777777] uppercase font-semibold mb-1">
              <Coins size={13} className="text-[#10B981]" />
              <span>Reported Cost</span>
            </div>
            <div className="text-[18px] sm:text-[20px] font-mono font-bold text-[#111111]">
              ${(run.execution?.cost?.amount || 0).toFixed(4)}
            </div>
            <div className="text-[10px] text-[#888888] mt-0.5 truncate">
              {run.execution?.cost?.reportedBy || 'session total'}
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-[#EAEAEA] shadow-2xs">
            <div className="flex items-center gap-1.5 text-[11px] text-[#777777] uppercase font-semibold mb-1">
              <Cpu size={13} className="text-[#3B82F6]" />
              <span>Total Tokens</span>
            </div>
            <div className="text-[18px] sm:text-[20px] font-mono font-bold text-[#111111]">
              {(run.execution?.tokens?.totalReported || 0).toLocaleString()}
            </div>
            <div className="text-[10px] text-[#888888] mt-0.5">
              in: {(run.execution?.tokens?.input || 0).toLocaleString()} | out: {(run.execution?.tokens?.output || 0).toLocaleString()}
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-[#EAEAEA] shadow-2xs">
            <div className="flex items-center gap-1.5 text-[11px] text-[#777777] uppercase font-semibold mb-1">
              <ShieldCheck size={13} className="text-[#D97706]" />
              <span>Verification</span>
            </div>
            <div className="text-[14px] sm:text-[15px] font-semibold text-[#111111] truncate">
              {run.evaluation?.status === 'independently_verified' ? 'Deterministic Audit' : 'Self-Reported'}
            </div>
            <div className="text-[10px] text-[#888888] mt-0.5 truncate">
              {run.evaluation?.verificationMethod || 'task evaluation suite'}
            </div>
          </div>
        </div>

        {/* Command Executed box */}
        {run.command && (
          <div className="px-5 py-2.5 bg-[#F0EFEA] border-b border-[#EAEAEA] flex items-center justify-between gap-3 text-xs shrink-0">
            <div className="flex items-center gap-2 overflow-hidden">
              <Terminal size={14} className="text-[#666666] shrink-0" />
              <span className="font-mono text-[#333333] truncate selectable-text">
                {run.command}
              </span>
            </div>
            <button
              onClick={copyCommand}
              className="flex items-center gap-1 shrink-0 px-2.5 py-1 rounded bg-white hover:bg-[#FAFAFA] border border-[#D5D5D3] text-[#333333] font-medium text-[11px] transition-colors"
            >
              {copiedCommand ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
              <span>{copiedCommand ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        )}

        {/* Tabs for Prompt vs Response vs Evaluator */}
        <div className="px-5 border-b border-[#EAEAEA] bg-white flex items-center gap-2 pt-3 shrink-0">
          <button
            onClick={() => setActiveTab('response')}
            className={`flex items-center gap-1.5 pb-2.5 px-3 text-[13px] font-medium border-b-2 transition-all ${
              activeTab === 'response'
                ? 'border-[#111111] text-[#111111]'
                : 'border-transparent text-[#777777] hover:text-[#111111]'
            }`}
          >
            <Sparkles size={14} />
            <span>Agent Response Output</span>
          </button>
          <button
            onClick={() => setActiveTab('prompt')}
            className={`flex items-center gap-1.5 pb-2.5 px-3 text-[13px] font-medium border-b-2 transition-all ${
              activeTab === 'prompt'
                ? 'border-[#111111] text-[#111111]'
                : 'border-transparent text-[#777777] hover:text-[#111111]'
            }`}
          >
            <FileText size={14} />
            <span>Task Prompt</span>
          </button>
          <button
            onClick={() => setActiveTab('evaluator')}
            className={`flex items-center gap-1.5 pb-2.5 px-3 text-[13px] font-medium border-b-2 transition-all ${
              activeTab === 'evaluator'
                ? 'border-[#111111] text-[#111111]'
                : 'border-transparent text-[#777777] hover:text-[#111111]'
            }`}
          >
            <ShieldCheck size={14} />
            <span>Evaluation Audit Trace</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 overflow-y-auto flex-1 bg-white text-left">
          {activeTab === 'response' && (
            <div className="prose prose-sm max-w-none text-[#222222] selectable-text font-sans">
              {run.responseMarkdown ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {run.responseMarkdown}
                </ReactMarkdown>
              ) : (
                <div className="text-[#888888] italic py-8 text-center">
                  No text response recorded for this automated execution loop.
                </div>
              )}
            </div>
          )}

          {activeTab === 'prompt' && (
            <div className="space-y-3">
              <div className="text-[12px] font-semibold text-[#888888] uppercase tracking-wider">
                Full Prompt Sent to Agent Environment:
              </div>
              <div className="bg-[#FAF9F6] border border-[#EAEAEA] rounded-lg p-4 font-mono text-[13px] text-[#222222] whitespace-pre-wrap selectable-text leading-relaxed">
                {run.prompt}
              </div>
            </div>
          )}

          {activeTab === 'evaluator' && (
            <div className="space-y-4 text-left">
              <div className="bg-[#FAF9F6] border border-[#EAEAEA] rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA]">
                  <span className="text-[13px] font-semibold text-[#111111]">Evaluator Script:</span>
                  <span className="font-mono text-[12px] text-[#555555] bg-white px-2 py-0.5 rounded border border-[#E5E5E3]">
                    {run.evaluation?.evaluator || 'N/A'}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA]">
                  <span className="text-[13px] font-semibold text-[#111111]">Verification Method:</span>
                  <span className="text-[12px] text-[#555555]">
                    {run.evaluation?.verificationMethod || 'Deterministic Assertion'}
                  </span>
                </div>

                {run.evaluation?.verificationReason && (
                  <div className="space-y-1 pb-3 border-b border-[#EAEAEA]">
                    <span className="text-[12px] font-semibold text-[#111111] block">Verification Reason:</span>
                    <p className="text-[13px] text-[#333333] leading-relaxed">
                      {run.evaluation.verificationReason}
                    </p>
                  </div>
                )}

                {run.evaluation?.failureReason && (
                  <div className="space-y-1 pb-3 border-b border-rose-200 bg-rose-50/50 p-2.5 rounded">
                    <span className="text-[12px] font-semibold text-rose-800 block">Failure Reason:</span>
                    <p className="text-[13px] text-rose-900 leading-relaxed font-mono">
                      {run.evaluation.failureReason}
                    </p>
                  </div>
                )}

                {run.evaluation?.expectedOrder && (
                  <div className="space-y-1 pt-1">
                    <span className="text-[12px] font-semibold text-[#111111] block">Expected Sequence vs Actual:</span>
                    <div className="grid grid-cols-2 gap-3 mt-1">
                      <div className="bg-white p-2.5 rounded border border-[#E5E5E3] font-mono text-[12px]">
                        <span className="text-[#888888] block text-[10px] uppercase">Expected:</span>
                        <span className="text-emerald-700 font-bold">{run.evaluation.expectedOrder.join(' → ')}</span>
                      </div>
                      <div className="bg-white p-2.5 rounded border border-[#E5E5E3] font-mono text-[12px]">
                        <span className="text-[#888888] block text-[10px] uppercase">Actual Extracted:</span>
                        <span className="text-[#111111] font-bold">{(run.evaluation.actualOrder || []).join(' → ')}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-[#EAEAEA] bg-[#FAF9F6] flex items-center justify-between shrink-0 text-xs text-[#777777]">
          <span>Run ID: <strong className="font-mono text-[#333333]">{run.id}</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-[#111111] text-white hover:bg-black transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

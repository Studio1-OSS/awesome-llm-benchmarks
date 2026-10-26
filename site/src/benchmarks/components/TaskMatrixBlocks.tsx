import React, { useState } from 'react';
import { type TaskStatusSummary, CATEGORY_META } from '../data/resultsData';

interface TaskMatrixBlocksProps {
  tasks: TaskStatusSummary[];
  onSelectRun?: (runId: string) => void;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export const TaskMatrixBlocks: React.FC<TaskMatrixBlocksProps> = ({
  tasks,
  onSelectRun,
  size = 'md',
  showCount = true
}) => {
  const [hoveredTask, setHoveredTask] = useState<TaskStatusSummary | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const passedCount = tasks.filter(t => t.passed).length;
  const totalCount = tasks.length;

  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return 'w-2 h-4 sm:w-2.5 sm:h-5';
      case 'lg':
        return 'w-3.5 h-7 sm:w-4 sm:h-8';
      case 'md':
      default:
        return 'w-2.5 h-5 sm:w-3 sm:h-6';
    }
  };

  const handleMouseEnter = (t: TaskStatusSummary, e: React.MouseEvent) => {
    setHoveredTask(t);
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: rect.left + rect.width / 2, y: rect.top });
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
      {/* Blocks strip */}
      <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-md bg-[#F4F4F3] border border-[#E5E5E3] shadow-inner">
        {tasks.map((task) => {
          return (
            <button
              key={task.taskId}
              type="button"
              onClick={() => task.runId && onSelectRun?.(task.runId)}
              onMouseEnter={(e) => handleMouseEnter(task, e)}
              onMouseLeave={() => setHoveredTask(null)}
              className={`group relative ${getDimensions()} rounded-[2px] transition-all duration-150 transform hover:scale-115 hover:z-10 focus:outline-none ${
                task.passed
                  ? 'bg-emerald-500 hover:bg-emerald-400 shadow-[0_1px_3px_rgba(16,185,129,0.3)]'
                  : 'bg-rose-400/80 hover:bg-rose-400 opacity-70'
              }`}
              title={`${task.taskName}: ${task.passed ? 'PASSED' : 'FAILED'}`}
            >
              {/* Subtle inner texture indicator */}
              <span className={`block w-full h-[2px] rounded-t-[1px] ${task.passed ? 'bg-emerald-200/50' : 'bg-white/30'}`} />
            </button>
          );
        })}
      </div>

      {showCount && (
        <span className="text-[12px] sm:text-[13px] font-mono font-medium text-[#555555] shrink-0 whitespace-nowrap">
          <strong className="text-[#111111]">{passedCount}</strong>/{totalCount}
        </span>
      )}

      {/* Floating Hover Tooltip */}
      {hoveredTask && (
        <div
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 bg-[#1C1C1C] text-white px-3 py-2 rounded-lg shadow-xl border border-white/10 text-left text-xs min-w-[200px] max-w-[280px]"
          style={{ left: mousePos.x, top: mousePos.y - 8 }}
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <span
              className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: (CATEGORY_META[hoveredTask.categoryId]?.color || '#888') + '33',
                color: CATEGORY_META[hoveredTask.categoryId]?.color || '#fff'
              }}
            >
              {CATEGORY_META[hoveredTask.categoryId]?.name || hoveredTask.categoryId}
            </span>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                hoveredTask.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}
            >
              {hoveredTask.passed ? 'Verified Pass' : 'Failed'}
            </span>
          </div>

          <div className="font-medium text-white text-[12px] leading-snug line-clamp-2 mb-1.5">
            {hoveredTask.taskName}
          </div>

          {hoveredTask.modelOutcomes && hoveredTask.modelOutcomes.length > 1 && (
            <div className="flex items-center gap-1.5 py-1.5 border-t border-white/10 text-[10px] flex-wrap">
              {hoveredTask.modelOutcomes.map(m => (
                <div key={m.runId} className="flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded">
                  <span className="text-neutral-400">{m.modelName}:</span>
                  <span className={m.passed ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                    {m.passed ? 'PASS' : 'FAIL'}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-white/10 text-[10px] text-neutral-300">
            <div>
              <span className="text-neutral-500 block">Time</span>
              <span className="font-mono text-white">{hoveredTask.durationSeconds.toFixed(1)}s</span>
            </div>
            <div>
              <span className="text-neutral-500 block">Cost</span>
              <span className="font-mono text-white">${hoveredTask.costAmount.toFixed(4)}</span>
            </div>
            <div>
              <span className="text-neutral-500 block">Tokens</span>
              <span className="font-mono text-white">{hoveredTask.tokensTotal.toLocaleString()}</span>
            </div>
          </div>
          <div className="text-[9px] text-neutral-400 mt-1 italic text-center">Click block to inspect full trace &rarr;</div>
        </div>
      )}
    </div>
  );
};

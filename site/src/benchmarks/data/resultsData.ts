import RAW_RESULTS_DATA from '../../../../benchmarks/open-model-agent-benchmarks/results.json'

export interface ExecutionMetrics {
  sessionId?: string;
  workingDirectory?: string;
  provider?: string;
  reasoningEffort?: string;
  wallClockSeconds?: number;
  userSeconds?: number;
  systemSeconds?: number;
  cost?: {
    amount: number;
    currency: string;
    reportedBy?: string;
  };
  tokens?: {
    totalReported: number;
    input: number;
    output: number;
    cachedInput?: number | null;
    reportedBy?: string;
  };
}

export interface EvaluationRecord {
  status?: string;
  recordedStatusSource?: string;
  previousEvaluationStatus?: string;
  verifiedResult?: 'pass' | 'fail' | string;
  evaluator?: string;
  evaluatorVersion?: string;
  verificationMethod?: string;
  verificationReason?: string;
  failureReason?: string;
  statusMatchesRecordedStatus?: boolean;
  checkedAt?: string;
  expectedOrder?: string[];
  actualOrder?: string[];
  checks?: Record<string, any>;
  [key: string]: any;
}

export interface BenchmarkRun {
  id: string;
  taskId: string;
  taskName: string;
  categoryId: 'reasoning' | 'tool-use' | 'web-search' | 'coding' | string;
  modelId: string;
  harnessId: string;
  attempt?: number;
  recordedStatus: 'pass' | 'fail' | string;
  prompt: string;
  responseMarkdown: string;
  command: string;
  execution?: ExecutionMetrics;
  warnings?: string[];
  evaluation?: EvaluationRecord;
}

export interface HarnessMeta {
  id: string;
  name: string;
  shortName: string;
  version: string;
  logo: string;
  fallbackLogo?: string;
  color: string;
  lightBg: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  tagline: string;
  description: string;
}

export interface ModelMeta {
  id: string;
  name: string;
  shortName: string;
  provider: string;
  logo: string;
  color: string;
  lightBg: string;
  badgeText: string;
}

export interface CategoryMeta {
  id: string;
  name: string;
  badge: string;
  color: string;
  desc: string;
}

export interface TaskRecord {
  id: string;
  name: string;
  categoryId: string;
  runsCount: number;
}

export const HARNESS_META: Record<string, HarnessMeta> = {
  'codex': {
    id: 'codex',
    name: 'OpenAI Codex',
    shortName: 'Codex',
    version: '0.156.1',
    logo: '/logos/openai.svg',
    color: '#10A37F',
    lightBg: '#F0FDF4',
    borderColor: '#BBF7D0',
    badgeBg: '#DCFCE7',
    badgeText: '#15803D',
    tagline: "OpenAI's terminal agent harness",
    description: "Executes commands inside sandboxed developer environments, performing multi-file edits and automated evaluations."
  },
  'claude-code': {
    id: 'claude-code',
    name: 'Claude Code',
    shortName: 'Claude Code',
    version: '2.1.296',
    logo: '/logos/claudecode.png',
    fallbackLogo: '/logos/claude.png',
    color: '#D97706',
    lightBg: '#FFFBEB',
    borderColor: '#FDE68A',
    badgeBg: '#FEF3C7',
    badgeText: '#B45309',
    tagline: "Anthropic's agentic CLI harness",
    description: "Terminal-based agent interface optimized for iterative reasoning, bash execution, and deterministic tool chaining."
  },
  'opencode': {
    id: 'opencode',
    name: 'OpenCode',
    shortName: 'OpenCode',
    version: '1.19.0',
    logo: '/logos/opencode.png',
    fallbackLogo: '/logos/opencode.svg',
    color: '#8B5CF6',
    lightBg: '#F5F3FF',
    borderColor: '#DDD6FE',
    badgeBg: '#EDE9FE',
    badgeText: '#6D28D9',
    tagline: "Open-source autonomous developer agent",
    description: "Fully open, modular CLI runner orchestrating local file systems, bash shells, and live external APIs."
  }
};

export const MODEL_META: Record<string, ModelMeta> = {
  'deepseek-ai/DeepSeek-V4.1-Flash': {
    id: 'deepseek-ai/DeepSeek-V4.1-Flash',
    name: 'DeepSeek-V4.1-Flash',
    shortName: 'DeepSeek V4.1',
    provider: 'Nebius Token Factory',
    logo: '/logos/deepseek.svg',
    color: '#1D4ED8',
    lightBg: '#EFF6FF',
    badgeText: '#1E40AF'
  },
  'zai-org/GLM-5.3-Flash': {
    id: 'zai-org/GLM-5.3-Flash',
    name: 'GLM-5.3-Flash',
    shortName: 'GLM 5.3',
    provider: 'Nebius Token Factory',
    logo: '/logos/glm.png',
    color: '#0284C7',
    lightBg: '#F0F9FF',
    badgeText: '#0369A1'
  }
};

export const CATEGORY_META: Record<string, CategoryMeta> = {
  'reasoning': {
    id: 'reasoning',
    name: 'Reasoning',
    badge: 'Logic & Planning',
    color: '#8B5CF6',
    desc: 'Multi-constraint scheduling, logical deduction, graph search'
  },
  'tool-use': {
    id: 'tool-use',
    name: 'Tool Use',
    badge: 'Function Calling',
    color: '#06B6D4',
    desc: 'API interactions, booking eligibility, account tiers & incident remediation'
  },
  'web-search': {
    id: 'web-search',
    name: 'Web Search',
    badge: 'Live Retrieval',
    color: '#3B82F6',
    desc: 'Real-time search, IRS tax rules, Next.js caching documentation'
  },
  'coding': {
    id: 'coding',
    name: 'Coding',
    badge: 'Software Engineering',
    color: '#10B981',
    desc: 'Payment idempotency, safe webhook concurrency, cursor pagination'
  }
};

export const ALL_RUNS: BenchmarkRun[] = (RAW_RESULTS_DATA.runs as unknown as any[]).map(run => {
  const exec = run.execution;
  if (!exec) return run as BenchmarkRun;
  return {
    ...run,
    execution: {
      ...exec,
      wallClockSeconds: exec.wallClockSeconds ?? exec.timings?.realSeconds ?? 0,
      userSeconds: exec.userSeconds ?? exec.timings?.userSeconds ?? 0,
      systemSeconds: exec.systemSeconds ?? exec.timings?.sysSeconds ?? 0,
      cost: exec.cost ? {
        amount: exec.cost.amount ?? exec.cost.totalCost ?? 0,
        currency: exec.cost.currency || 'USD',
        reportedBy: exec.cost.reportedBy || 'session total'
      } : undefined,
      tokens: exec.tokens ? {
        totalReported: exec.tokens.totalReported ?? exec.tokens.totalTokens ?? 0,
        input: exec.tokens.input ?? exec.tokens.promptTokens ?? 0,
        output: exec.tokens.output ?? exec.tokens.completionTokens ?? 0,
        cachedInput: exec.tokens.cachedInput ?? exec.tokens.cachedTokens ?? null,
        reportedBy: exec.tokens.reportedBy || 'session total'
      } : undefined
    }
  } as BenchmarkRun;
});
export const ALL_HARNESS_IDS = RAW_RESULTS_DATA.harnesses.map(h => h.id);
export const ALL_MODEL_IDS = RAW_RESULTS_DATA.models.map(m => m.id);
export const ALL_CATEGORIES = RAW_RESULTS_DATA.categories;

// Canonical list of tasks across the benchmark
export const ALL_TASKS: TaskRecord[] = (() => {
  const map = new Map<string, TaskRecord>();
  for (const run of ALL_RUNS) {
    if (!map.has(run.taskId)) {
      map.set(run.taskId, {
        id: run.taskId,
        name: run.taskName,
        categoryId: run.categoryId,
        runsCount: 0
      });
    }
    map.get(run.taskId)!.runsCount++;
  }
  return Array.from(map.values()).sort((a, b) => a.categoryId.localeCompare(b.categoryId) || a.id.localeCompare(b.id));
})();

// Helper to determine if a run passed
export function isRunPassed(run: BenchmarkRun): boolean {
  if (run.evaluation && run.evaluation.verifiedResult) {
    return run.evaluation.verifiedResult.toLowerCase() === 'pass';
  }
  return run.recordedStatus.toLowerCase() === 'pass';
}

export interface TaskModelOutcome {
  modelId: string;
  modelName: string;
  passed: boolean;
  runId: string;
}

export interface TaskStatusSummary {
  taskId: string;
  taskName: string;
  categoryId: string;
  passed: boolean;
  runId: string;
  durationSeconds: number;
  costAmount: number;
  tokensTotal: number;
  modelOutcomes?: TaskModelOutcome[];
}

export interface HarnessStatSummary {
  harnessId: string;
  name: string;
  shortName: string;
  version: string;
  logo: string;
  color: string;
  totalRuns: number;
  passedRuns: number;
  failedRuns: number;
  successRate: number; // 0 - 100
  avgWallClockSeconds: number;
  totalWallClockSeconds: number;
  avgCostAmount: number;
  totalCostAmount: number;
  avgTokens: number;
  totalTokens: number;
  taskMatrix: TaskStatusSummary[];
  byModel: Record<string, {
    totalRuns: number;
    passedRuns: number;
    successRate: number;
    avgTime: number;
    avgCost: number;
    avgTokens: number;
  }>;
  byCategory: Record<string, {
    totalRuns: number;
    passedRuns: number;
    successRate: number;
  }>;
}

export function computeHarnessStats(selectedModelId?: string, selectedCategoryId?: string): HarnessStatSummary[] {
  return ALL_HARNESS_IDS.map(hId => {
    const meta = HARNESS_META[hId] || {
      id: hId,
      name: hId,
      shortName: hId,
      version: '1.0',
      logo: '/logos/openai.svg',
      color: '#10B981',
      lightBg: '#F0FDF4',
      borderColor: '#BBF7D0',
      badgeBg: '#DCFCE7',
      badgeText: '#15803D',
      tagline: '',
      description: ''
    };

    let runs = ALL_RUNS.filter(r => r.harnessId === hId);
    if (selectedModelId && selectedModelId !== 'all') {
      runs = runs.filter(r => r.modelId === selectedModelId);
    }
    if (selectedCategoryId && selectedCategoryId !== 'all') {
      runs = runs.filter(r => r.categoryId === selectedCategoryId);
    }

    const totalRuns = runs.length;
    const passedRuns = runs.filter(isRunPassed).length;
    const failedRuns = totalRuns - passedRuns;
    const successRate = totalRuns > 0 ? (passedRuns / totalRuns) * 100 : 0;

    let totalWallClock = 0;
    let totalCost = 0;
    let totalTokens = 0;

    runs.forEach(r => {
      totalWallClock += r.execution?.wallClockSeconds || 0;
      totalCost += r.execution?.cost?.amount || 0;
      totalTokens += r.execution?.tokens?.totalReported || 0;
    });

    // Distinct tasks actually evaluated for this harness in this scope
    const harnessTaskMap = new Map<string, TaskRecord>();
    runs.forEach(r => {
      if (!harnessTaskMap.has(r.taskId)) {
        harnessTaskMap.set(r.taskId, {
          id: r.taskId,
          name: r.taskName,
          categoryId: r.categoryId,
          runsCount: 0
        });
      }
      harnessTaskMap.get(r.taskId)!.runsCount++;
    });

    const targetTasks = Array.from(harnessTaskMap.values()).sort(
      (a, b) => a.categoryId.localeCompare(b.categoryId) || a.id.localeCompare(b.id)
    );

    // Task matrix (per distinct task actually executed by this harness)
    const taskMatrix: TaskStatusSummary[] = targetTasks.map(task => {
      const taskRuns = runs.filter(r => r.taskId === task.id);
      // When multiple models are tested for this task on this harness,
      // a verified pass across models requires all evaluated models to pass.
      const passed = taskRuns.length > 0 && taskRuns.every(isRunPassed);

      // Link to the failing run if it failed, or to the passing run if it passed
      const selectedRun = passed
        ? (taskRuns.find(isRunPassed) || taskRuns[0])
        : (taskRuns.find(r => !isRunPassed(r)) || taskRuns[0]);

      let taskTime = 0;
      let taskCost = 0;
      let taskTok = 0;
      taskRuns.forEach(r => {
        taskTime += r.execution?.wallClockSeconds || 0;
        taskCost += r.execution?.cost?.amount || 0;
        taskTok += r.execution?.tokens?.totalReported || 0;
      });
      const durationSeconds = taskRuns.length > 0 ? taskTime / taskRuns.length : (selectedRun?.execution?.wallClockSeconds || 0);
      const costAmount = taskRuns.length > 0 ? taskCost / taskRuns.length : (selectedRun?.execution?.cost?.amount || 0);
      const tokensTotal = taskRuns.length > 0 ? Math.round(taskTok / taskRuns.length) : (selectedRun?.execution?.tokens?.totalReported || 0);

      const modelOutcomes: TaskModelOutcome[] = taskRuns.map(r => ({
        modelId: r.modelId,
        modelName: MODEL_META[r.modelId]?.shortName || r.modelId,
        passed: isRunPassed(r),
        runId: r.id
      }));

      return {
        taskId: task.id,
        taskName: task.name,
        categoryId: task.categoryId,
        passed,
        runId: selectedRun ? selectedRun.id : '',
        durationSeconds,
        costAmount,
        tokensTotal,
        modelOutcomes
      };
    });

    // Model breakdowns for this harness
    const byModel: HarnessStatSummary['byModel'] = {};
    ALL_MODEL_IDS.forEach(mId => {
      const mRuns = ALL_RUNS.filter(r => r.harnessId === hId && r.modelId === mId);
      const mPass = mRuns.filter(isRunPassed).length;
      let mTime = 0, mCost = 0, mTok = 0;
      mRuns.forEach(r => {
        mTime += r.execution?.wallClockSeconds || 0;
        mCost += r.execution?.cost?.amount || 0;
        mTok += r.execution?.tokens?.totalReported || 0;
      });
      byModel[mId] = {
        totalRuns: mRuns.length,
        passedRuns: mPass,
        successRate: mRuns.length > 0 ? (mPass / mRuns.length) * 100 : 0,
        avgTime: mRuns.length > 0 ? mTime / mRuns.length : 0,
        avgCost: mRuns.length > 0 ? mCost / mRuns.length : 0,
        avgTokens: mRuns.length > 0 ? mTok / mRuns.length : 0,
      };
    });

    // Category breakdowns
    const byCategory: HarnessStatSummary['byCategory'] = {};
    ALL_CATEGORIES.forEach(cat => {
      const cRuns = ALL_RUNS.filter(r => r.harnessId === hId && r.categoryId === cat.id);
      const cPass = cRuns.filter(isRunPassed).length;
      byCategory[cat.id] = {
        totalRuns: cRuns.length,
        passedRuns: cPass,
        successRate: cRuns.length > 0 ? (cPass / cRuns.length) * 100 : 0
      };
    });

    return {
      harnessId: hId,
      name: meta.name,
      shortName: meta.shortName,
      version: meta.version,
      logo: meta.logo,
      color: meta.color,
      totalRuns,
      passedRuns,
      failedRuns,
      successRate: Math.round(successRate * 10) / 10,
      avgWallClockSeconds: totalRuns > 0 ? Math.round((totalWallClock / totalRuns) * 10) / 10 : 0,
      totalWallClockSeconds: Math.round(totalWallClock * 10) / 10,
      avgCostAmount: totalRuns > 0 ? totalCost / totalRuns : 0,
      totalCostAmount: totalCost,
      avgTokens: totalRuns > 0 ? Math.round(totalTokens / totalRuns) : 0,
      totalTokens,
      taskMatrix,
      byModel,
      byCategory
    };
  }).sort((a, b) => b.successRate - a.successRate || a.avgWallClockSeconds - b.avgWallClockSeconds);
}

export interface ModelStatSummary {
  modelId: string;
  name: string;
  shortName: string;
  provider: string;
  logo: string;
  color: string;
  totalRuns: number;
  passedRuns: number;
  failedRuns: number;
  successRate: number;
  avgWallClockSeconds: number;
  totalWallClockSeconds: number;
  avgCostAmount: number;
  totalCostAmount: number;
  avgTokens: number;
  totalTokens: number;
  byHarness: Record<string, {
    totalRuns: number;
    passedRuns: number;
    successRate: number;
    avgTime: number;
    avgCost: number;
    avgTokens: number;
  }>;
  byCategory: Record<string, {
    totalRuns: number;
    passedRuns: number;
    successRate: number;
  }>;
}

export function computeModelStats(): ModelStatSummary[] {
  return ALL_MODEL_IDS.map(mId => {
    const meta = MODEL_META[mId] || {
      id: mId,
      name: mId,
      shortName: mId,
      provider: 'Nebius',
      logo: '/logos/openai.svg',
      color: '#1D4ED8',
      lightBg: '#EFF6FF',
      badgeText: '#1E40AF'
    };

    const runs = ALL_RUNS.filter(r => r.modelId === mId);
    const totalRuns = runs.length;
    const passedRuns = runs.filter(isRunPassed).length;
    const failedRuns = totalRuns - passedRuns;
    const successRate = totalRuns > 0 ? (passedRuns / totalRuns) * 100 : 0;

    let totalWallClock = 0;
    let totalCost = 0;
    let totalTokens = 0;

    runs.forEach(r => {
      totalWallClock += r.execution?.wallClockSeconds || 0;
      totalCost += r.execution?.cost?.amount || 0;
      totalTokens += r.execution?.tokens?.totalReported || 0;
    });

    const byHarness: ModelStatSummary['byHarness'] = {};
    ALL_HARNESS_IDS.forEach(hId => {
      const hRuns = runs.filter(r => r.harnessId === hId);
      const hPass = hRuns.filter(isRunPassed).length;
      let hTime = 0, hCost = 0, hTok = 0;
      hRuns.forEach(r => {
        hTime += r.execution?.wallClockSeconds || 0;
        hCost += r.execution?.cost?.amount || 0;
        hTok += r.execution?.tokens?.totalReported || 0;
      });
      byHarness[hId] = {
        totalRuns: hRuns.length,
        passedRuns: hPass,
        successRate: hRuns.length > 0 ? (hPass / hRuns.length) * 100 : 0,
        avgTime: hRuns.length > 0 ? hTime / hRuns.length : 0,
        avgCost: hRuns.length > 0 ? hCost / hRuns.length : 0,
        avgTokens: hRuns.length > 0 ? hTok / hRuns.length : 0,
      };
    });

    const byCategory: ModelStatSummary['byCategory'] = {};
    ALL_CATEGORIES.forEach(cat => {
      const cRuns = runs.filter(r => r.categoryId === cat.id);
      const cPass = cRuns.filter(isRunPassed).length;
      byCategory[cat.id] = {
        totalRuns: cRuns.length,
        passedRuns: cPass,
        successRate: cRuns.length > 0 ? (cPass / cRuns.length) * 100 : 0
      };
    });

    return {
      modelId: mId,
      name: meta.name,
      shortName: meta.shortName,
      provider: meta.provider,
      logo: meta.logo,
      color: meta.color,
      totalRuns,
      passedRuns,
      failedRuns,
      successRate: Math.round(successRate * 10) / 10,
      avgWallClockSeconds: totalRuns > 0 ? Math.round((totalWallClock / totalRuns) * 10) / 10 : 0,
      totalWallClockSeconds: Math.round(totalWallClock * 10) / 10,
      avgCostAmount: totalRuns > 0 ? totalCost / totalRuns : 0,
      totalCostAmount: totalCost,
      avgTokens: totalRuns > 0 ? Math.round(totalTokens / totalRuns) : 0,
      totalTokens,
      byHarness,
      byCategory
    };
  }).sort((a, b) => b.successRate - a.successRate);
}

// Matrix generation for Compare Views
export interface MatrixCellData {
  passed: number;
  total: number;
  rate: number;
  avgTime: number;
  avgCost: number;
  avgTokens: number;
}

export function getModelByHarnessMatrix(): {
  models: { id: string; name: string; shortName: string; logo: string }[];
  harnesses: { id: string; name: string; shortName: string; logo: string }[];
  cells: Record<string, Record<string, MatrixCellData>>; // [modelId][harnessId]
} {
  const models = ALL_MODEL_IDS.map(mId => ({
    id: mId,
    name: MODEL_META[mId]?.name || mId,
    shortName: MODEL_META[mId]?.shortName || mId,
    logo: MODEL_META[mId]?.logo || '/logos/openai.svg',
  }));

  const harnesses = ALL_HARNESS_IDS.map(hId => ({
    id: hId,
    name: HARNESS_META[hId]?.name || hId,
    shortName: HARNESS_META[hId]?.shortName || hId,
    logo: HARNESS_META[hId]?.logo || '/logos/openai.svg',
  }));

  const cells: Record<string, Record<string, MatrixCellData>> = {};

  for (const m of models) {
    cells[m.id] = {};
    for (const h of harnesses) {
      const runs = ALL_RUNS.filter(r => r.modelId === m.id && r.harnessId === h.id);
      const passed = runs.filter(isRunPassed).length;
      let time = 0, cost = 0, tok = 0;
      runs.forEach(r => {
        time += r.execution?.wallClockSeconds || 0;
        cost += r.execution?.cost?.amount || 0;
        tok += r.execution?.tokens?.totalReported || 0;
      });
      cells[m.id][h.id] = {
        passed,
        total: runs.length,
        rate: runs.length > 0 ? (passed / runs.length) * 100 : 0,
        avgTime: runs.length > 0 ? time / runs.length : 0,
        avgCost: runs.length > 0 ? cost / runs.length : 0,
        avgTokens: runs.length > 0 ? tok / runs.length : 0,
      };
    }
  }

  return { models, harnesses, cells };
}

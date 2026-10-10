import { Link } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react'
import { PanelLeftClose, PanelLeftOpen, X, ChevronDown, Check, Search, BookOpen } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ComposedChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceArea, BarChart, Bar, Cell, LabelList } from 'recharts'



const getProviderLogo = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('anthropic')) return '/logos/claude.png';
  if (lowerName.includes('openai')) return '/logos/openai.svg';
  if (lowerName.includes('google')) return '/logos/google.svg';
  if (lowerName.includes('meta')) return '/logos/meta.svg';
  if (lowerName.includes('xai') || lowerName.includes('x-ai') || lowerName.includes('spacexai')) return '/logos/xai.svg';
  if (lowerName.includes('deepseek')) return '/logos/deepseek.svg';
  if (lowerName.includes('moonshot')) return '/logos/kimi.png';
  if (lowerName.includes('zhipu')) return '/logos/zhipu.png';
  if (lowerName.includes('zai') || lowerName.includes('z ai') || lowerName.includes('glm')) return '/logos/glm.png';
  if (lowerName.includes('alibaba') || lowerName.includes('qwen')) return '/logos/qwen.svg';
  if (lowerName.includes('mistral')) return '/logos/mistral.svg';
  if (lowerName.includes('microsoft')) return '/logos/microsoft.svg';
  if (lowerName.includes('amazon') || lowerName.includes('aws')) return '/logos/aws.svg';
  if (lowerName.includes('perplexity')) return '/logos/perplexity.svg';
  if (lowerName.includes('inclusionai')) return '/logos/inclusionai_small.webp';
  if (lowerName.includes('primalabs') || lowerName.includes('prima')) return '/logos/primalabs.svg';
  if (lowerName.includes('ollama')) return '/logos/ollama.svg';
  if (lowerName.includes('hugging')) return '/logos/huggingface.svg';
  if (lowerName.includes('ibm') || lowerName.includes('granite')) return '/logos/ibm.png';
  if (lowerName.includes('cohere')) return '/logos/cohere.png';
  if (lowerName.includes('celeris')) return '/logos/celeris.png';
  if (lowerName.includes('mercury')) return '/logos/mercury.png';
  if (lowerName.includes('liquid')) return '/logos/liquid.png';
  if (lowerName.includes('stepfun')) return '/logos/stepfun.png';
  if (lowerName.includes('minimax')) return '/logos/minimax.png';
  if (lowerName.includes('servicenow')) return '/logos/servicenow.png';
  if (lowerName.includes('reka')) return '/logos/reka.png';
  if (lowerName.includes('naver')) return '/logos/naver.png';
  if (lowerName.includes('upstage')) return '/logos/upstage.png';
  if (lowerName.includes('tencent')) return '/logos/tencent.png';
  if (lowerName.includes('baidu')) return '/logos/baidu.png';
  if (lowerName.includes('xiaomi')) return '/logos/xiaomi.png';
  if (lowerName.includes('ai21') || lowerName.includes('jt') || lowerName.includes('flash 236b') || lowerName.includes('jamba')) return '/logos/ai21.png';
  if (lowerName.includes('sk telecom') || lowerName.includes('kt')) return '/logos/sktelecom.png';
  if (lowerName.includes('sarvam')) return '/logos/sarvam.png';

  if (lowerName.includes('ai9stars')) return '/logos/ai9stars.png';
  if (lowerName.includes('allen')) return '/logos/allenai.png';
  if (lowerName.includes('apodex')) return '/logos/apodex.png';
  if (lowerName.includes('arcee')) return '/logos/arcee.png';
  if (lowerName.includes('bytedance') || lowerName.includes('seed') || lowerName.includes('doubao') || lowerName.includes('dubao')) return '/logos/doubao.png';
  if (lowerName.includes('china mobile')) return '/logos/chinamobile.png';
  if (lowerName.includes('deep cogito')) return '/logos/deepcogito.png';
  if (lowerName.includes('inception')) return '/logos/inception.png';
  if (lowerName.includes('institute of foundation')) return '/logos/ifm.png';
  if (lowerName.includes('kwaikat') || lowerName.includes('kuaishou')) return '/logos/kuaishou.png';
  if (lowerName.includes('lg ai')) return '/logos/lgai.png';
  if (lowerName.includes('longcat')) return '/logos/longcat.png';
  if (lowerName.includes('motif')) return '/logos/motif.png';
  if (lowerName.includes('multiverse')) return '/logos/multiverse.png';
  if (lowerName.includes('nvidia')) return '/logos/nvidia.png';
  if (lowerName.includes('nanbeige')) return '/logos/nanbeige.png';
  if (lowerName.includes('nex')) return '/logos/nexagi.png';
  if (lowerName.includes('nous')) return '/logos/nous.png';
  if (lowerName.includes('openbmb')) return '/logos/openbmb.png';
  if (lowerName.includes('prime')) return '/logos/primeintellect.png';
  if (lowerName.includes('swiss ai')) return '/logos/swissai.png';
  if (lowerName.includes('tii uae') || lowerName.includes('tii')) return '/logos/tii.png';
  if (lowerName.includes('thinking machines')) return '/logos/thinkingmachines.png';
  if (lowerName.includes('trillion')) return '/logos/trillion.png';
  if (lowerName.includes('spartus') || lowerName.includes('sparta')) return '/logos/spartus.png';

  // If no exact provider logo matches, return null so we don't render a false logo.
  return '';
}

const getProviderName = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('fable') || lower.includes('sonnet') || lower.includes('opus') || lower.includes('anthropic')) return 'Anthropic';
  if (lower.includes('gpt') || lower.includes('openai') || lower.includes('codex')) return 'OpenAI';
  if (lower.includes('gemini') || lower.includes('google')) return 'Google';
  if (lower.includes('llama') || lower.includes('meta') || lower.includes('muse')) return 'Meta';
  if (lower.includes('grok') || lower.includes('x-ai')) return 'xAI';
  if (lower.includes('deepseek')) return 'DeepSeek';
  if (lower.includes('kimi')) return 'Moonshot';
  if (lower.includes('glm')) return 'Z AI';
  if (lower.includes('qwen')) return 'Qwen';
  return 'Unknown';
}

const extractText = (child: any): string => {
  if (typeof child === 'string') return child;
  if (Array.isArray(child)) return child.map(extractText).join('');
  if (child && child.props && child.props.children) return extractText(child.props.children);
  return '';
};

const processNodeForLogos = (n: any): any => {
  if (typeof n === 'string') {
    const models = [
      { key: 'Muse Spark 1.3', logo: '/logos/meta.svg' },
      { key: 'DeepSeek V4 Flash', logo: '/logos/deepseek.svg' },
      { key: 'Kimi K3', logo: '/logos/kimi.png' },
      { key: 'Codex 5.6 Terra', logo: '/logos/openai.svg' },
      { key: 'GLM 5.3 Flash', logo: '/logos/glm.png' },
      { key: 'Fable 5.1', logo: '/logos/anthropic.svg' },
      { key: 'Grok 4.7', logo: '/logos/xai.svg' }
    ];
    let segments: any[] = [n];
    models.forEach(model => {
      segments = segments.flatMap(seg => {
        if (typeof seg === 'string') {
          const parts = seg.split(model.key);
          const result = [];
          for (let i = 0; i < parts.length; i++) {
            result.push(parts[i]);
            if (i < parts.length - 1) {
              result.push(
                <span key={`${model.key}-${Math.random()}`} data-logo-injected={true} className="inline-flex items-center gap-1 font-medium text-[#18181B] mx-0.5 align-middle">
                  <img src={model.logo} alt="" className="w-4 h-4 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  {model.key}
                </span>
              );
            }
          }
          return result;
        }
        return [seg];
      });
    });
    return segments;
  }
  if (Array.isArray(n)) return n.map((child, i) => <React.Fragment key={i}>{processNodeForLogos(child)}</React.Fragment>);
  if (n && n.props) {
    if (n.props['data-logo-injected']) return n;
    if (n.props.children) {
      return React.cloneElement(n, { ...n.props, children: processNodeForLogos(n.props.children) });
    }
  }
  return n;
};



const GAMES = [
  { id: 'flappy-bird',      name: 'Flappy Bird',      subtitle: 'Input precision and game-loop tuning',          logo: '/games/flappy-bird.png', status: 'complete',  models: 4 },
  { id: '3d-gta-game',      name: '3D GTA Game',      subtitle: 'Open-world systems depth and build reliability', logo: '/games/gta5.png',        status: 'complete',  models: 4 },
  { id: '2d-breakout',      name: '2D Breakout',      subtitle: 'Responsive arcade-game craft',                  logo: '/games/breakout.png',    status: 'pending',   models: 0 },
  { id: '3d-game',          name: '3D Game',          subtitle: 'Interactive 3D scene design',                   logo: '/games/3d-game.png',     status: 'pending',   models: 0 },
  { id: '3d-snake',         name: '3D Snake',         subtitle: '3D game loop and spatial clarity',              logo: '/games/snake.png',       status: 'pending',   models: 0 },
  { id: 'design-portfolio', name: 'Design Portfolio', subtitle: 'Editorial visual design and interaction',       logo: '/games/portfolio.png',   status: 'pending',   models: 0 },
  { id: 'endless-runner',   name: 'Endless Runner',   subtitle: 'Game feel, pacing, and visual direction',       logo: '/games/runner.png',      status: 'pending',   models: 0 },
]


const curatedTrending = [
  { id: 'openai/chatgpt-4o-latest', name: 'Codex 5.6 Terra', logo: '/logos/openai.svg', provider: 'OpenAI', context: '1M', intelligence: 56, speed: 105, latency: 12.4 },
  { id: 'deepseek/deepseek-v4-flash', name: 'DeepSeek V4 Flash', logo: '/logos/deepseek.svg', provider: 'DeepSeek', context: '1M', intelligence: 51, speed: 90, latency: 25.1 },
  { id: 'moonshotai/kimi-k3', name: 'Kimi K3', logo: '/logos/kimi.png', provider: 'Moonshot', context: '2M', intelligence: 47, speed: 75, latency: 30.0 },
  { id: 'meta-llama/llama-3.1-405b-instruct', name: 'Muse Spark 1.3', logo: '/logos/meta.svg', provider: 'Meta', context: '128K', intelligence: 53, speed: 85, latency: 22.0 },
  { id: 'anthropic/claude-fable-5-1', name: 'Fable 5.1', logo: '/logos/claude.png', provider: 'Anthropic', context: '1M', intelligence: 53, speed: 139, latency: 44.1 },
  { id: 'zai-org/glm-5.3-flash', name: 'GLM 5.3 Flash', logo: '/logos/glm.png', provider: 'Z AI', context: '1M', intelligence: 58, speed: 120, latency: 18.0 },
  { id: 'x-ai/grok-4-7', name: 'Grok 4.7', logo: '/logos/xai.svg', provider: 'xAI', context: '2M', intelligence: 54, speed: 70, latency: 45.0 },
  { id: 'anthropic/claude-opus-5-5', name: 'Claude Opus 5.5', logo: '/logos/claude.png', provider: 'Anthropic', context: '1M', intelligence: 58, speed: 93, latency: 68.4 },
  { id: 'google/gemini-4-argon', name: 'Gemini 4 Argon', logo: '/logos/google.svg', provider: 'Google', context: '2M', intelligence: 55, speed: 80, latency: 130.5 },
  { id: 'qwen/qwen-3-8-max', name: 'Qwen 3.8 Max', logo: '/logos/qwen.svg', provider: 'Alibaba', context: '128K', intelligence: 49, speed: 110, latency: 18.5 },
  { id: 'openai/gpt-6-astra', name: 'GPT-6 Astra', logo: '/logos/openai.svg', provider: 'OpenAI', context: '1M', intelligence: 62, speed: 150, latency: 10.4 },
  { id: 'openai/gpt-6-luna', name: 'GPT-6 Luna', logo: '/logos/openai.svg', provider: 'OpenAI', context: '1M', intelligence: 45, speed: 180, latency: 8.2 },
];



function GameEvaluationCard({ agentName, logo, selectedGame, realData }: any) {
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  useEffect(() => {
    setIsIframeLoading(true);
  }, [selectedGame]);

  const totalTokens = realData?.tokens || 0;
  const totalCost = realData?.cost || 0;
  const iframeSrc = realData?.iframeSrc || null;

  return (
    <div className="flex flex-col h-full min-h-[440px] bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] hover:bg-white/90">
      
      {/* Card Header */}
      <div className="px-5 py-3.5 border-b border-[#F0EFEB] flex justify-between items-center bg-white/60 relative z-10">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-white border border-[#E5E3DF] shadow-sm flex items-center justify-center p-1.5 shrink-0">
            <img src={logo} alt={agentName} className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col min-w-0 justify-center">
            <h3 className="font-semibold text-[14.5px] text-[#2E2E2D] leading-tight truncate">{agentName}</h3>
          </div>
        </div>
        <div className="flex flex-col items-end shrink-0 pl-3">
          <div className="flex items-center gap-2.5 mb-0.5">
            <button className="px-2.5 py-1 text-[11px] font-bold bg-[#2E2E2D] text-white rounded-full hover:bg-black transition-colors shadow-sm tracking-wide">Vote</button>
            {totalCost > 0 ? (
              <span className="text-[15px] font-bold text-[#2E2E2D] leading-none">${totalCost < 0.0001 ? '<0.0001' : totalCost.toFixed(4)}</span>
            ) : (
              <span className="text-[13px] font-semibold text-[#B0AEAB] leading-none">No data</span>
            )}
          </div>
          {totalTokens > 0 && (
            <span className="text-[10px] text-[#B0AEAB] tracking-widest font-semibold">{totalTokens.toLocaleString()} tokens</span>
          )}
        </div>
      </div>
      
      {/* Simulation Area */}
      <div className="flex-1 relative bg-[#FAFAF8] overflow-hidden">
        {iframeSrc ? (
          <>
            {isIframeLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20 gap-3">
                <div className="w-7 h-7 rounded-full border-2 border-[#EAE8E3] border-t-[#2E2E2D] animate-spin"></div>
                <span className="text-[12.5px] font-medium text-[#9E9D9A]">Loading simulation…</span>
              </div>
            )}
            <iframe 
              src={iframeSrc} 
              onLoad={() => setIsIframeLoading(false)}
              className={`w-full h-full absolute inset-0 border-none bg-white z-10 ${isIframeLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
              sandbox="allow-scripts allow-same-origin"
            />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 z-20 gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#F1EFEA] border border-[#E5E3DF] flex items-center justify-center mb-1">
              <span className="text-[18px]">🎮</span>
            </div>
            <span className="text-[13px] font-medium text-[#9E9D9A]">Not tested for this benchmark</span>
          </div>
        )}
      </div>
      
    </div>
  )
}


const markdownComponents: any = {
  h1: ({node, ...props}: any) => <h1 className="text-[24px] font-semibold text-[#2E2E2D] mb-5 mt-1 tracking-tight leading-snug">{processNodeForLogos(props.children)}</h1>,
  h2: ({node, ...props}: any) => <h2 className="text-[17px] font-semibold text-[#2E2E2D] mt-10 mb-4 tracking-tight leading-snug">{processNodeForLogos(props.children)}</h2>,
  h3: ({node, ...props}: any) => <h3 className="text-[15px] font-semibold text-[#2E2E2D] mt-8 mb-3">{processNodeForLogos(props.children)}</h3>,
  p: ({node, ...props}: any) => <p className="text-[14px] text-[#4A4948] leading-[1.75] mb-5">{processNodeForLogos(props.children)}</p>,
  strong: ({node, ...props}: any) => <strong className="font-semibold text-[#2E2E2D]">{processNodeForLogos(props.children)}</strong>,
  a: ({node, href, ...props}: any) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#2E2E2D] underline underline-offset-2 hover:opacity-70 transition-opacity">{props.children}</a>,
  table: ({node, ...props}: any) => (
    <div className="my-6 rounded-xl border border-[#E5E3DF] overflow-hidden bg-white">
      <table className="w-full text-left border-collapse text-[13px]">{props.children}</table>
    </div>
  ),
  thead: ({node, ...props}: any) => <thead className="bg-[#F7F6F3]">{props.children}</thead>,
  th: ({node, ...props}: any) => <th className="py-3 px-4 font-semibold text-[#6E6D6A] text-[11.5px] uppercase tracking-wider border-b border-[#E5E3DF]">{props.children}</th>,
  tr: ({node, ...props}: any) => <tr className="border-b border-[#E5E3DF] last:border-b-0 hover:bg-[#FAF9F6] transition-colors">{props.children}</tr>,
  td: ({node, ...props}: any) => {
    const textStr = extractText(props.children);
    const logo = getProviderLogo(textStr);
    const KNOWN = ['codex','gpt','openai','gemini','google','llama','meta','muse','deepseek','kimi','glm','grok','fable','claude','sonnet','opus','qwen','mistral'];
    // Only add logo to short text cells (like model names) so we don't accidentally add logos to long paragraphs in Notes
    const hasLogo = textStr.length < 50 && KNOWN.some(k => textStr.toLowerCase().includes(k));
    return (
      <td className="py-2.5 px-4 text-[#27272A] border-r border-[#E5E3DF] last:border-r-0">
        {hasLogo ? (
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <img src={logo} alt="" className="w-4 h-4 object-contain shrink-0" />
            <span>{props.children}</span>
          </span>
        ) : props.children}
      </td>
    );
  },
  li: ({node, ...props}: any) => <li className="text-[13.5px] text-[#4A4948] mb-1 ml-4 list-disc leading-relaxed">{processNodeForLogos(props.children)}</li>,
  blockquote: ({node, ...props}: any) => {
    const text = extractText(props.children);
    return (
      <div className="relative group my-4 rounded-xl border border-[#E5E3DF] bg-[#F7F6F3] overflow-hidden">
        <blockquote className="p-4 pr-12 text-[13px] text-[#4A4948] font-mono leading-[1.65]">
          {props.children}
        </blockquote>
        <button
          onClick={(e) => {
            navigator.clipboard.writeText(text);
            const btn = e.currentTarget;
            const origHTML = btn.innerHTML;
            btn.innerHTML = '<svg class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>';
            setTimeout(() => { btn.innerHTML = origHTML; }, 1500);
          }}
          className="absolute top-2.5 right-2.5 p-1.5 bg-white border border-[#E5E3DF] rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.02)] opacity-0 group-hover:opacity-100 transition-all text-[#6E6D6A] hover:text-[#2E2E2D] hover:bg-white hover:shadow-[0_4px_8px_rgba(0,0,0,0.06)] cursor-pointer"
          title="Copy prompt"
        >
          <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        </button>
      </div>
    );
  },
  code: ({node, ...props}: any) => <code className="bg-[#F1EFEA] rounded px-1.5 py-0.5 text-[11.5px] font-mono text-[#2E2E2D] whitespace-nowrap">{props.children}</code>,
  hr: () => <hr className="border-[#E5E3DF] my-5" />,
};



const GithubIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
);

const markdownModules = import.meta.glob('../public/awesome-llm-benchmarks/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isPromoMinimized, setIsPromoMinimized] = useState(false)
  
  const [selectedGame, setSelectedGame] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  const [githubStars, setGithubStars] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/Studio1-OSS/awesome-llm-benchmarks')
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count !== undefined) {
          setGithubStars(data.stargazers_count);
        }
      })
      .catch(err => console.error('Failed to fetch github stars', err));
  }, []);
  
  // Search Modal State
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Game Details Markdown Modal State
  const [markdownContent, setMarkdownContent] = useState('');
  const [markdownChartData, setMarkdownChartData] = useState<any[]>([]);
  

  // Fetch markdown content when game changes
  useEffect(() => {
    const fetchPath = selectedGame ? `../public/awesome-llm-benchmarks/${selectedGame}/README.md` : `../public/awesome-llm-benchmarks/README.md`;
    const text = markdownModules[fetchPath] || 'No details available.';
    
    setMarkdownContent(text);
        // Parse markdown table for chart data
        const lines = text.split('\n');
        const data: any[] = [];
        let inTable = false;
        let tokenIndex = -1;
        let costIndex = -1;

        for (const line of lines) {
          if (line.includes('| Model |') && line.includes('| Total tokens |')) {
            inTable = true;
            const headers = line.split('|').map(h => h.trim());
            tokenIndex = headers.indexOf('Total tokens');
            costIndex = headers.indexOf('Cost');
            continue;
          }
          if (inTable) {
            if (line.includes('| ---')) continue;
            if (!line.trim().startsWith('|')) {
              inTable = false;
              continue;
            }
            const parts = line.split('|').map(p => p.trim());
            const rawName = parts[1];
            if (!rawName) continue;
            
            let name = rawName.replace(/\[(.*?)\]\(.*?\)/, '$1').replace(/`.*?`/g, '').trim();
            if (name.includes('(')) name = name.split('(')[0].trim();
            
            // Extract id from backticks, or map via common names
            let idMatch = rawName.match(/`([^`]+)`/);
            let modelId = idMatch ? idMatch[1].toLowerCase() : '';
            if (!modelId) {
               if (name.toLowerCase().includes('codex') || name.toLowerCase().includes('gpt')) modelId = 'openai/chatgpt-4o-latest';
               else if (name.toLowerCase().includes('fable')) modelId = 'anthropic/claude-fable-5-1';
               else if (name.toLowerCase().includes('sonnet') || name.toLowerCase().includes('opus')) modelId = 'anthropic/claude-opus-5-5';
               else if (name.toLowerCase().includes('muse')) modelId = 'meta-llama/llama-3.1-405b-instruct';
               else if (name.toLowerCase().includes('grok')) modelId = 'x-ai/grok-4-7';
               else if (name.toLowerCase().includes('glm')) modelId = 'zai-org/glm-5.3-flash';
            }

            const tokenStr = parts[tokenIndex];
            const rawCost = parts[costIndex]?.replace(/[^0-9.]/g, ''); // Extract just the numbers/decimals from cost
            
            let tokens = parseInt(tokenStr?.replace(/,/g, ''));
            if (tokenStr?.includes('M')) tokens = parseFloat(tokenStr.replace('M', '')) * 1000000;
            if (tokenStr?.includes('K')) tokens = parseFloat(tokenStr.replace('K', '')) * 1000;

            let cost = parseFloat(rawCost);
            if (isNaN(cost)) cost = 0;
            if (isNaN(tokens)) tokens = 0;
            
            data.push({ id: modelId, name, tokens, cost, iframeSrc: '' });
          }
        }
        
        // Pass 2: Extract iframe URLs from Results table
        let inResultsTable = false;
        for (const line of lines) {
          if (line.includes('| Model |') && line.includes('| Result |')) {
            inResultsTable = true;
            continue;
          }
          if (inResultsTable) {
            if (line.includes('| ---')) continue;
            if (!line.trim().startsWith('|')) {
              inResultsTable = false;
              continue;
            }
            const parts = line.split('|').map(p => p.trim());
            const rawNameCol = parts[1];
            const linkMatch = rawNameCol.match(/\[(.*?)\]\((.*?)\)/);
            if (linkMatch) {
              const displayName = linkMatch[1];
              const relativeSrc = linkMatch[2];
              const fullSrc = `/awesome-llm-benchmarks/${selectedGame}/${relativeSrc}`;
              const entry = data.find(d => d.name.includes(displayName) || displayName.includes(d.name));
              if (entry) {
                entry.iframeSrc = fullSrc;
              }
            }
          }
        }

        setMarkdownChartData(data);
        
        // Dynamically build sidebar models based ONLY on this game's data
        const dynamicModels = data.map(d => {
          const base = curatedTrending.find(c => c.id === d.id);
          return {
            id: d.id,
            name: d.name,
            logo: base?.logo || getProviderLogo(d.name),
            provider: base?.provider || getProviderName(d.name),
            context: base?.context || '128K',
            intelligence: base?.intelligence || 50,
            speed: base?.speed || 100,
            latency: base?.latency || 20.0
          };
        });
        setModels(dynamicModels);
        // Do not auto-select models; allow the user to manually select up to 3
        setSelectedAgents([]);
  }, [selectedGame]);

  const [models, setModels] = useState<any[]>([])
  const [selectedAgents, setSelectedAgents] = useState<string[]>([])
  const [isLoadingModels] = useState(false)
  const [_isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const [_isCompareModalOpen, setIsCompareModalOpen] = useState(false)
  const [isCopyDropdownOpen, setIsCopyDropdownOpen] = useState(false)
  const [tooltipState, setTooltipState] = useState<{ text: string, top: number, left: number } | null>(null)

  const filteredModels = useMemo(() => {
    return models.filter(model => 
      model.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, models]);


    const comparisonModels = useMemo(() => {
      if (models.length === 0) return [];
      return selectedAgents.map((id: any) => models.find((m: any) => m.id === id)).filter(Boolean);
    }, [models, selectedAgents])

  
  const sidebarCss = `
    .sidebar-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .sidebar-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .sidebar-scrollbar::-webkit-scrollbar-thumb {
      background-color: #E5E3DF;
      border-radius: 10px;
    }
    .sidebar-scrollbar::-webkit-scrollbar-thumb:hover {
      background-color: #D1CFCA;
    }
  `;

  return (
    <>
      <style>{sidebarCss}</style>
      <div className="flex h-screen bg-[#F1EFEA] text-[#2E2E2D] font-sans overflow-hidden">
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 md:hidden backdrop-blur-sm" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* Sidebar matching Atlas light UI exactly */}
      <aside className={`fixed md:relative inset-y-0 left-0 z-30 border-r border-[#E5E3DF] bg-[#FAF9F6] flex flex-col shrink-0 select-none transform transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'} ${isSidebarCollapsed ? 'md:w-16' : 'md:w-64'}`}>
        
        {/* Sidebar Header with Brand */}
        <div className={`h-20 flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-between px-4'} shrink-0 bg-transparent`}>
          {!isSidebarCollapsed ? (
            <Link to="/" className="flex items-center min-w-0 gap-2.5 hover:opacity-80 transition-opacity">
              <img src="/icon.png" alt="LLM Benchmark Icon" className="h-[32px] w-[32px] object-contain shrink-0" />
              <div className="flex flex-col text-[#1c1c1c] tracking-tighter font-semibold min-w-0 justify-center">
                <span className="text-[17px] leading-none whitespace-nowrap">llm</span>
                <span className="text-[17px] leading-none whitespace-nowrap -mt-0.5">benchmark</span>
              </div>
            </Link>
          ) : (
            <button 
              onClick={() => {
                setIsSidebarCollapsed(false);
                setTooltipState(null);
              }}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltipState({ text: "Open sidebar", top: rect.top + rect.height / 2, left: rect.right + 12 });
              }}
              onMouseLeave={() => setTooltipState(null)}
              className="relative flex items-center justify-center w-12 h-12 rounded-xl hover:bg-[#EAE8E3] transition-colors cursor-pointer shrink-0 group"
            >
              <img src="/icon.png" alt="LLM Benchmark Logo" className="w-[30px] h-[30px] object-contain transition-opacity duration-200 group-hover:opacity-0" />
              <PanelLeftOpen className="w-6 h-6 text-[#6E6D6A] absolute opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </button>
          )}
          
          {!isSidebarCollapsed && (
            <div className="flex items-center shrink-0 gap-0.5">
              <button 
                onClick={() => setIsSidebarOpen(false)} 
                className="md:hidden p-1.5 rounded-md hover:bg-[#F1EFEA] text-[#6E6D6A] hover:text-[#2E2E2D] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsSearchModalOpen(true)}
                className="hidden md:flex p-1.5 rounded-md hover:bg-[#F1EFEA] text-[#6E6D6A] hover:text-[#2E2E2D] transition-colors cursor-pointer items-center justify-center"
              >
                <Search className="w-[18px] h-[18px]" strokeWidth={1.75} />
              </button>
              <button 
                onClick={() => setIsSidebarCollapsed(true)}
                className="hidden md:flex p-1.5 rounded-md hover:bg-[#F1EFEA] text-[#6E6D6A] hover:text-[#2E2E2D] transition-colors cursor-pointer items-center justify-center"
              >
                <PanelLeftClose className="w-[18px] h-[18px]" strokeWidth={1.75} />
              </button>
            </div>
          )}
        </div>

        <div className={`flex-1 overflow-y-auto sidebar-scrollbar pt-8 pb-4 ${isSidebarCollapsed ? 'px-2' : 'px-3'}`}>
          <div className="flex flex-col space-y-1">
            {!isSidebarCollapsed && (
              <div className="px-2 flex items-center justify-between text-[11px] font-medium text-[#6E6D6A] uppercase tracking-wider select-none mb-2 cursor-default">
                <span className="font-sans">AI models</span>
              </div>
            )}
            
            {isLoadingModels ? (
              <div className="text-xs text-[#9E9D9A] px-2 py-4">...</div>
            ) : (
              <div className="space-y-1">
                {models.map((agent, index) => {
                  const isSelected = selectedAgents.includes(agent.id);
                  const toggleSelection = () => {
                    setSelectedAgents(prev => {
                      if (prev.includes(agent.id)) {
                        return prev.filter(id => id !== agent.id);
                      }
                      if (prev.length >= 3) {
                        return [...prev.slice(1), agent.id];
                      }
                      return [...prev, agent.id];
                    });
                  };
                  return (
                    <button 
                      key={agent.id}
                      onClick={toggleSelection}
                      onMouseEnter={(e) => {
                        if (isSidebarCollapsed) {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltipState({ text: agent.name, top: rect.top + rect.height / 2, left: rect.right + 12 });
                        }
                      }}
                      onMouseLeave={() => setTooltipState(null)}
                      className={`flex items-center h-9 rounded-lg text-sm transition-all cursor-pointer ${isSidebarCollapsed ? 'w-9 justify-center mx-auto' : 'w-full px-2 justify-between'} ${isSelected ? 'bg-[#EAE8E3] text-[#2E2E2D] font-medium shadow-sm border border-[#E5E3DF]/50' : 'text-[#4A4A4A] hover:text-[#2E2E2D] hover:bg-[#F1EFEA] border border-transparent'} group`}
                    >
                      {isSidebarCollapsed ? (
                        <img src={agent.logo} alt={agent.name} className="w-6 h-6 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                      ) : (
                        <div className="flex items-center justify-between w-full min-w-0">
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="text-[11px] font-bold text-[#9E9D9A] w-3 text-right">{index + 1}</span>
                            <img src={agent.logo} alt="" className="w-5 h-5 object-contain shrink-0" />
                            <span className="truncate text-left leading-tight">{agent.name}</span>
                          </div>
                          {isSelected && (
                             <Check className="w-[15px] h-[15px] text-[#2E2E2D]" strokeWidth={2.5} />
                          )}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
        
        {/* Pinned Bottom Area for Promo Card */}
        <div className="shrink-0">
          {!isSidebarCollapsed && (
            isPromoMinimized ? (
              <div 
                onClick={() => setIsPromoMinimized(false)}
                className="mx-4 mb-4 mt-2 bg-[#FCFBFA] border border-[#F0EFEB] p-2.5 rounded-[12px] shadow-sm flex items-center justify-between cursor-pointer hover:bg-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4.5 h-4.5 object-contain opacity-70 group-hover:opacity-100 transition-opacity drop-shadow-sm ml-1" />
                  <span className="text-[12.5px] font-bold text-[#4A3F35] group-hover:text-[#2A231C] transition-colors">Contribute</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#A3988E] rotate-180 group-hover:text-[#4A3F35] transition-colors mr-1" strokeWidth={2.5} />
              </div>
            ) : (
              <div className="mx-4 mb-4 mt-2 bg-[#FCFBFA] border border-[#F0EFEB] p-4 rounded-[14px] relative shadow-sm group/card transition-all hover:bg-white">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-[13px] font-bold text-[#4A3F35] tracking-tight">Missing an LLM?</h3>
                  <button 
                    onClick={() => setIsPromoMinimized(true)}
                    className="text-[#A3988E] hover:text-[#4A3F35] transition-colors cursor-pointer -mt-0.5"
                    title="Minimize"
                  >
                    <ChevronDown className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </button>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center -space-x-2.5 px-2">
                    {[
                      { src: '/logos/openai.svg', alt: 'OpenAI', z: 9 },
                      { src: '/logos/anthropic.svg', alt: 'Anthropic', z: 8 },
                      { src: '/logos/google.svg', alt: 'Google', z: 7 },
                      { src: '/logos/meta.svg', alt: 'Meta', z: 6 },
                      { src: '/logos/mistral.svg', alt: 'Mistral', z: 5 },
                      { src: '/logos/deepseek.svg', alt: 'DeepSeek', z: 4 },
                      { src: '/logos/xai.svg', alt: 'xAI', z: 3 },
                      { src: '/logos/perplexity.svg', alt: 'Perplexity', z: 2 }
                    ].map(logo => (
                      <div key={logo.alt} className={`w-[28px] h-[28px] rounded-full border-2 border-white bg-white flex items-center justify-center relative z-[${logo.z}] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-1 hover:z-10 cursor-pointer`}>
                        <img src={logo.src} alt={logo.alt} className="w-4 h-4 object-contain" />
                      </div>
                    ))}
                    <div className="w-[28px] h-[28px] rounded-full border-2 border-white bg-[#F5F4F0] flex items-center justify-center relative z-[1] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                      <span className="text-[10px] font-bold text-[#8C8276]">+</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-[12px] text-[#7A6B5D] leading-relaxed mb-3">
                  Help expand the arena. Contribute to our open-source benchmarks.
                </p>
                
                <a 
                  href="https://github.com/Studio1-OSS/awesome-llm-benchmarks" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center text-[12px] font-bold text-[#4A3F35] hover:text-[#7A6B5D] transition-colors group cursor-pointer"
                >
                  <GithubIcon className="w-3.5 h-3.5 mr-1.5 opacity-80 group-hover:opacity-100 transition-opacity" />
                  Contribute
                  <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            )
          )}
          
          {/* Studio1 Footer */}
          {!isSidebarCollapsed && (
            <div className="px-5 pb-5 pt-1 mt-auto">
              <a 
                href="https://www.studio1hq.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[11px] font-normal text-[#2E2E2D] transition-colors group/studio"
              >
                An open-source project by Studio1.
                <svg viewBox="0 0 160 160" className="w-4 h-4 fill-current text-[#FF7E1D]">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 35C0 16.6807 14.0744 1.64844 32 0.126953V141H51.0523C52.4308 137.344 54.7446 133.689 57.9938 130.033C61.1446 126.508 64.6892 123.44 68.6277 120.829C72.5662 118.349 76.3569 116.782 80 116.129V86.7544C75.4708 87.9292 71.3846 89.6919 67.7415 92.0415C64 94.5225 60.7508 97.46 57.9938 100.854C56.5345 102.72 55.2545 104.659 54.1539 106.671V0H125C144.33 0 160 15.6699 160 35V125C160 144.33 144.33 160 125 160H124V18H104.948C103.569 21.6816 101.255 25.3628 98.0062 29.0444C94.8554 32.5942 91.3108 35.6841 87.3723 38.314C83.4338 40.812 79.6431 42.3896 76 43.0474V72.6304C80.5292 71.4473 84.6154 69.6724 88.2585 67.3057C92 64.8076 95.2492 61.8491 98.0062 58.4307C99.4655 56.5513 100.745 54.5986 101.846 52.5723V160H35C15.67 160 0 144.33 0 125V35Z" />
                </svg>
              </a>
            </div>
          )}

          {/* Collapsed Sidebar Icons */}
          {isSidebarCollapsed && (
            <div className="mt-auto flex flex-col items-center gap-4 pb-6">
              <div className="relative group">
                <a href="https://github.com/Studio1-OSS/awesome-llm-benchmarks" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl hover:bg-[#EAE8E3] flex items-center justify-center transition-colors cursor-pointer relative">
                  <GithubIcon className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                  {githubStars !== null && (
                    <span className="absolute -top-1 -right-1 bg-[#2E2E2D] text-white text-[8px] font-bold px-1 rounded-sm shadow-sm z-10">
                      {githubStars.toLocaleString()}
                    </span>
                  )}
                </a>
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 bg-[#2E2E2D] text-white text-[12px] font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  Contribute to this project
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-t-[4px] border-b-[4px] border-r-[4px] border-transparent border-r-[#2E2E2D]"></div>
                </div>
              </div>
              <div className="relative group">
                <a href="https://www.studio1hq.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl hover:bg-[#EAE8E3] flex items-center justify-center transition-colors cursor-pointer">
                  <svg viewBox="0 0 160 160" className="w-5 h-5 fill-current text-[#A3988E] group-hover:text-[#FF7E1D] transition-colors">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 35C0 16.6807 14.0744 1.64844 32 0.126953V141H51.0523C52.4308 137.344 54.7446 133.689 57.9938 130.033C61.1446 126.508 64.6892 123.44 68.6277 120.829C72.5662 118.349 76.3569 116.782 80 116.129V86.7544C75.4708 87.9292 71.3846 89.6919 67.7415 92.0415C64 94.5225 60.7508 97.46 57.9938 100.854C56.5345 102.72 55.2545 104.659 54.1539 106.671V0H125C144.33 0 160 15.6699 160 35V125C160 144.33 144.33 160 125 160H124V18H104.948C103.569 21.6816 101.255 25.3628 98.0062 29.0444C94.8554 32.5942 91.3108 35.6841 87.3723 38.314C83.4338 40.812 79.6431 42.3896 76 43.0474V72.6304C80.5292 71.4473 84.6154 69.6724 88.2585 67.3057C92 64.8076 95.2492 61.8491 98.0062 58.4307C99.4655 56.5513 100.745 54.5986 101.846 52.5723V160H35C15.67 160 0 144.33 0 125V35Z" />
                  </svg>
                </a>
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 bg-[#2E2E2D] text-white text-[12px] font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  Built by Studio1
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-t-[4px] border-b-[4px] border-r-[4px] border-transparent border-r-[#2E2E2D]"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-[#FAF9F6] to-[#EAE8E3] h-screen overflow-hidden relative">
        <header className="h-[60px] border-b border-[#E5E3DF] flex items-center justify-between px-3 sm:px-5 lg:px-8 bg-[#FAF9F6]/80 backdrop-blur-md shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-[#EAE8E3] transition-colors group cursor-pointer mr-0 sm:mr-1 shrink-0"
            >
              <img src="/icon.png" alt="LLM Benchmark Logo" className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] object-contain transition-opacity duration-200 group-hover:opacity-0" />
              <PanelLeftOpen className="w-5 h-5 text-[#6E6D6A] absolute opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </button>
            <div 
              className="relative flex items-center ml-0 sm:ml-2"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2.5 py-1 rounded-lg transition-colors focus:outline-none ${isDropdownOpen ? 'bg-[#EAE8E3]' : 'hover:bg-[#EAE8E3]'}`}
              >
                {(() => {
                  const game = GAMES.find(g => g.id === selectedGame);
                  if (game) {
                    return (
                      <>
                        <img src={game.logo} alt="" className="w-4 h-4 sm:w-5 sm:h-5 object-contain rounded-[4px] shadow-sm shrink-0" />
                        <span className="text-[14px] sm:text-[16px] font-semibold tracking-tight text-[#2E2E2D] max-w-[100px] sm:max-w-none truncate">{game.name}</span>
                      </>
                    );
                  }
                  return (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#E5E3DF] rounded-[4px] flex items-center justify-center border border-black/5 shrink-0">
                        <BookOpen className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#6E6D6A]" strokeWidth={2.5} />
                      </div>
                      <span className="text-[14px] sm:text-[16px] font-semibold tracking-tight text-[#6E6D6A]">Select</span>
                    </>
                  );
                })()}
                <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#9E9D9A]" />
              </button>
              
              {isDropdownOpen && (
                <>
                  <div className="absolute top-full left-0 pt-2 w-[280px] z-50">
                    <div className="bg-white rounded-[14px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-[#E5E3DF] p-1.5 flex flex-col gap-0.5 overflow-hidden">
                      {GAMES.map(game => (
                        <button
                          key={game.id}
                          onClick={() => {
                            setSelectedGame(game.id)
                            setIsDropdownOpen(false)
                          }}
                          className={`w-full flex items-center gap-3 text-left px-2.5 py-2 rounded-[10px] transition-colors ${selectedGame === game.id ? 'bg-[#F4F2EF]' : 'hover:bg-[#FAF9F6]'}`}
                        >
                          <div className="w-8 h-8 rounded-[8px] bg-white border border-[#E5E3DF] shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex items-center justify-center shrink-0 overflow-hidden">
                            <img src={game.logo} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col min-w-0 flex-1 gap-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className={`text-[13px] leading-none truncate ${selectedGame === game.id ? 'font-bold text-[#2E2E2D]' : 'font-semibold text-[#4A4948]'}`}>
                                {game.name}
                              </span>
                              {game.status === 'complete' ? (
                                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-[5px] shrink-0 leading-none border border-emerald-100/50">
                                  {game.models} MODELS
                                </span>
                              ) : (
                                <span className="text-[9px] font-bold uppercase tracking-wider text-[#A3A29F] bg-[#F4F3F0] px-1.5 py-0.5 rounded-[5px] shrink-0 leading-none border border-[#E5E3DF]/50">
                                  NO RUNS
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-[#9E9D9A] leading-none truncate">{game.subtitle}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-3">
            {/* View Details Button */}
            {selectedGame && (
              <button 
                onClick={() => setIsDetailsModalOpen(true)}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 bg-white border border-[#E5E3DF] rounded-lg shadow-sm hover:bg-[#F1EFEA] transition-colors text-[11.5px] sm:text-[13px] font-semibold text-[#2E2E2D] shrink-0"
              >
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6E6D6A]" />
                <span className="hidden sm:inline">Details</span>
              </button>
            )}
            
            {/* Compare Models Button */}
            {selectedGame && (
              <button 
                onClick={() => setIsCompareModalOpen(true)}
                disabled={comparisonModels.length === 0}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 bg-[#2E2E2D] text-white border border-[#2E2E2D] rounded-lg shadow-sm hover:bg-black transition-colors text-[11.5px] sm:text-[13px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                <span>Compare</span>
              </button>
            )}
            
            <div className="w-[1px] h-4 bg-[#E5E3DF] mx-0.5 sm:mx-1 hidden sm:block"></div>
            
            <a href="https://github.com/Studio1-OSS/awesome-llm-benchmarks" target="_blank" rel="noreferrer"
              className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-[13.5px] font-semibold text-[#6E6D6A] hover:text-[#2E2E2D] transition-colors"
            >
              <GithubIcon size={16} className="sm:w-[18px] sm:h-[18px] w-[14px] h-[14px]" />
              <span>{githubStars !== null ? githubStars.toLocaleString() : '7.1k'}</span>
            </a>
          </div>
        </header>
        
        <div className="flex-1 p-5 lg:p-8 overflow-y-auto flex flex-col gap-6">
          {comparisonModels.length === 0 ? (
            models.length === 0 && selectedGame ? (
              <div className="flex-1 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm border border-dashed border-[#E5E3DF] rounded-2xl min-h-[420px]">
                <div className="w-14 h-14 rounded-2xl bg-[#F1EFEA] flex items-center justify-center mb-5 border border-[#E5E3DF] shadow-sm">
                  <GithubIcon className="w-6 h-6 opacity-60" />
                </div>
                <h2 className="text-[16px] font-semibold text-[#2E2E2D] tracking-tight">No runs recorded yet</h2>
                <p className="text-[#9E9D9A] mt-2.5 text-[13px] text-center max-w-[280px] leading-relaxed font-medium">
                  Be the first to benchmark models for this game. Follow the prompt in the Details tab and submit a pull request!
                </p>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#2E2E2D] text-white rounded-xl text-[13px] font-semibold hover:bg-black transition-colors shadow-sm"
                >
                  <GithubIcon className="w-4 h-4" />
                  Contribute Run
                </a>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm border border-dashed border-[#E5E3DF] rounded-2xl min-h-[420px]">
                <div className="w-14 h-14 rounded-2xl bg-[#F1EFEA] flex items-center justify-center mb-5 border border-[#E5E3DF] shadow-sm">
                  <PanelLeftClose className="w-6 h-6 text-[#B0AEAB]" />
                </div>
                <h2 className="text-[16px] font-semibold text-[#2E2E2D] tracking-tight">Select models to compare</h2>
                <p className="text-[#9E9D9A] mt-2.5 text-[13px] text-center max-w-[240px] leading-relaxed font-medium">
                  Choose up to 3 AI models from the sidebar to start running side-by-side evaluations.
                </p>
              </div>
            )
          ) : (
            <div className={`grid grid-cols-1 ${comparisonModels.length === 1 ? 'lg:grid-cols-1' : comparisonModels.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-5 h-full`}>
              {comparisonModels.map((m: any) => {
                const realData = markdownChartData.find((d: any) => d.id === m.id || m.id.includes(d.id.split('/')[0]) || (d.id && m.id.includes(d.id)));
                return (
                  <div key={m.id} className="w-full h-full flex flex-col">
                    <GameEvaluationCard 
                      agentName={m.name} 
                      logo={m.logo} 
                      selectedGame={selectedGame}
                      realData={realData}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    
      
      {/* Global render for custom tooltips so they are never clipped by overflow containers! */}
      {tooltipState && (
        <div 
          className="fixed px-3 py-1.5 bg-white border border-[#E5E3DF] shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-[10px] text-[13px] font-semibold text-[#2E2E2D] whitespace-nowrap z-[9999] pointer-events-none"
          style={{ top: tooltipState.top, left: tooltipState.left, transform: 'translateY(-50%)' }}
        >
          {tooltipState.text}
        </div>
      )}

      {/* Light Theme Search Modal */}
      {isSearchModalOpen && (
        <div 
          className="fixed inset-0 z-[10000] flex items-start justify-center pt-[15vh] bg-black/20 backdrop-blur-sm px-4"
          onClick={() => { setIsSearchModalOpen(false); setSearchQuery(''); }}
        >
          <div 
            className="bg-white w-full max-w-[640px] rounded-[16px] shadow-[0_16px_60px_rgba(0,0,0,0.15)] border border-[#E5E3DF] overflow-hidden flex flex-col max-h-[70vh] animate-[fadeIn_0.15s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center px-5 py-4 border-b border-[#E5E3DF]/70">
              <input 
                type="text" 
                placeholder="Search..." 
                className="flex-1 bg-transparent border-none outline-none text-[#2E2E2D] placeholder-[#9E9D9A] text-[16px]"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => { setIsSearchModalOpen(false); setSearchQuery(''); }} className="p-1 rounded-md hover:bg-[#F1EFEA] transition-colors ml-2 cursor-pointer">
                <X className="w-5 h-5 text-[#6E6D6A]" strokeWidth={1.5} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-2">
              <div className="px-4 py-2 mt-1 text-[13px] font-medium text-[#8C8B88] tracking-tight mb-1">
                {searchQuery === '' ? 'All models' : 'Search results'}
              </div>
              
              <div className="flex flex-col space-y-0.5 pb-2">
                {filteredModels.map(model => {
                  const isSelected = selectedAgents.includes(model.id);
                  return (
                    <button 
                      key={model.id}
                      onClick={() => {
                        setSelectedAgents(prev => {
                          if (isSelected) return prev.filter(id => id !== model.id);
                          if (prev.length >= 3) return [...prev.slice(1), model.id];
                          return [...prev, model.id];
                        });
                        setIsSearchModalOpen(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center w-full px-4 py-3 rounded-xl hover:bg-[#F1EFEA] transition-colors text-left group cursor-pointer"
                    >
                      <img src={model.logo} alt={model.name} className={`w-[22px] h-[22px] object-contain mr-4 ${isSelected ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'} transition-opacity`} />
                      <span className={`text-[14px] font-medium ${isSelected ? 'text-[#2E2E2D]' : 'text-[#6E6D6A] group-hover:text-[#2E2E2D]'} transition-colors`}>{model.name}</span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-[#2E2E2D] ml-auto" strokeWidth={2} />
                      )}
                    </button>
                  );
                })}
                {filteredModels.length === 0 && (
                  <div className="px-4 py-6 text-[14px] text-[#6E6D6A] text-center">No models found for "{searchQuery}"</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Details Modal ─────────────────────────────────────────── */}
      {_isDetailsModalOpen && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/25 backdrop-blur-sm p-3 sm:p-4"
          onClick={() => setIsDetailsModalOpen(false)}
        >
          <div
            className="bg-[#FAF9F6] w-full max-w-4xl max-h-[95vh] sm:max-h-[88vh] rounded-xl sm:rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.18)] border border-[#E5E3DF] flex flex-col overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-[#E5E3DF] bg-white/80 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-3">
                {selectedGame && GAMES.find(g => g.id === selectedGame) && (
                  <img src={GAMES.find(g => g.id === selectedGame)!.logo} alt="" className="w-7 h-7 object-cover rounded-lg border border-[#E5E3DF] shadow-sm" />
                )}
                <div>
                  <p className="font-semibold text-[15px] text-[#2E2E2D] leading-tight">{GAMES.find(g => g.id === selectedGame)?.name ?? 'Benchmark'}</p>
                  <p className="text-[11px] text-[#9E9D9A] font-medium">Benchmark report</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="flex items-center shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-xl relative"
                  onMouseEnter={() => setIsCopyDropdownOpen(true)}
                  onMouseLeave={() => setIsCopyDropdownOpen(false)}
                >
                  <button 
                    onClick={(e) => {
                      navigator.clipboard.writeText(markdownContent || '');
                      const btn = e.currentTarget;
                      const origHtml = btn.innerHTML;
                      btn.innerHTML = '<span class="px-2 font-bold">Copied!</span>';
                      setTimeout(() => btn.innerHTML = origHtml, 1500);
                    }}
                    className="flex items-center justify-center gap-1.5 px-2.5 sm:px-3 h-[30px] sm:h-[34px] rounded-l-xl border border-r-0 border-[#E5E3DF] bg-white hover:bg-[#FAF9F6] transition-colors cursor-pointer text-[11px] sm:text-[12.5px] font-medium text-[#6E6D6A] min-w-[70px] sm:min-w-[120px]"
                    title="Copy full report as raw Markdown"
                  >
                    <svg className="w-3.5 h-3.5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                    </svg>
                    <span className="hidden sm:inline">Copy Markdown</span>
                    <span className="sm:hidden">Copy</span>
                  </button>
                  <button 
                    onClick={() => setIsCopyDropdownOpen(!isCopyDropdownOpen)}
                    className="group text-sm text-[#9E9D9A] rounded-none rounded-r-xl border flex items-center justify-center h-[30px] sm:h-[34px] border-[#E5E3DF] aspect-square bg-white hover:bg-[#FAF9F6] transition-colors cursor-pointer focus:outline-none"
                    aria-label="More actions"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={`w-3 h-3 transition-transform text-[#9E9D9A] group-hover:text-[#6E6D6A] shrink-0 ${isCopyDropdownOpen ? 'rotate-[90deg]' : 'rotate-[270deg]'}`}>
                      <path d="M6.5 2.75L12.75 9L6.5 15.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </button>
                  {isCopyDropdownOpen && (
                    <div className="absolute top-[calc(100%+8px)] right-0 w-[300px] bg-white border border-[#E5E3DF] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.12)] p-1.5 z-50">
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(markdownContent || '');
                          setIsCopyDropdownOpen(false);
                        }}
                        className="flex items-start gap-3 w-full p-2.5 rounded-[12px] hover:bg-[#F9F6F0] transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-[10px] border border-[#E5E3DF] bg-white flex items-center justify-center shrink-0 shadow-sm text-[#9E9D9A] group-hover:text-[#2E2E2D] transition-colors">
                          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"></path>
                            <path d="M7 15V9l2.5 2.5L12 9v6"></path>
                            <path d="M16 9v6"></path>
                            <path d="M14 13l2 2 2-2"></path>
                          </svg>
                        </div>
                        <div className="flex flex-col pt-0.5">
                          <span className="text-[13.5px] font-bold text-[#2E2E2D] leading-tight mb-0.5">Copy Markdown</span>
                          <span className="text-[12px] font-medium text-[#9E9D9A] leading-tight">Copy report as Markdown for LLMs</span>
                        </div>
                      </button>

                      <button 
                        onClick={() => {
                          const plainText = markdownContent.replace(/[#*`_\[\]]/g, '');
                          navigator.clipboard.writeText(plainText || '');
                          setIsCopyDropdownOpen(false);
                        }}
                        className="flex items-start gap-3 w-full p-2.5 rounded-[12px] hover:bg-[#F9F6F0] transition-colors text-left group mt-0.5"
                      >
                        <div className="w-10 h-10 rounded-[10px] border border-[#E5E3DF] bg-white flex items-center justify-center shrink-0 shadow-sm text-[#9E9D9A] group-hover:text-[#2E2E2D] transition-colors">
                          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                          </svg>
                        </div>
                        <div className="flex flex-col pt-0.5">
                          <span className="text-[13.5px] font-bold text-[#2E2E2D] leading-tight mb-0.5">Copy Plain Text</span>
                          <span className="text-[12px] font-medium text-[#9E9D9A] leading-tight">Copy text without Markdown tags</span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
                <div className="w-px h-4 bg-[#E5E3DF]" />
                <button onClick={() => setIsDetailsModalOpen(false)} className="p-1 sm:p-1.5 rounded-lg hover:bg-[#F1EFEA] transition-colors cursor-pointer">
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#6E6D6A]" strokeWidth={1.5} />
                </button>
              </div>
            </div>
            {/* Body */}
            <div className="overflow-y-auto p-4 sm:p-7 select-auto">


              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {(() => {
                  const HIDDEN = new Set(['run protocol', 'result structure', 'required model readme fields']);
                  const lines = (markdownContent || '').split('\n');
                  const out: string[] = [];
                  let skip = false;
                  for (const line of lines) {
                    const h2 = line.match(/^##\s+(.+)/);
                    if (h2) skip = HIDDEN.has(h2[1].trim().toLowerCase());
                    if (!skip) out.push(line);
                  }
                  return out.join('\n').trim() || 'Loading…';
                })()}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}

      {/* ── Compare Modal ──────────────────────────────────────────── */}
      {_isCompareModalOpen && (() => {
        const providerColors: Record<string, string> = {
          'Anthropic': '#C98166', 'OpenAI': '#1C1C1C', 'Google': '#4285F4',
          'Meta': '#0084FF', 'xAI': '#7765D8', 'DeepSeek': '#2954E5',
          'Moonshot': '#00A3FF', 'Z AI': '#00C4B6', 'Qwen': '#FF7E1D',
        };
        const allModels = [...curatedTrending];
        // Realistic cost spread per model (USD per task)
        const costMap: Record<string, number> = {
          'openai/chatgpt-4o-latest': 1.20,
          'openai/gpt-6-astra': 8.00,
          'openai/gpt-6-luna': 0.15,
          'zai-org/glm-5.3-flash': 0.20,
          'deepseek/deepseek-v4-flash': 0.08,
          'moonshotai/kimi-k3': 0.30,
          'meta-llama/llama-3.1-405b-instruct': 0.45,
          'anthropic/claude-fable-5-1': 3.50,
          'x-ai/grok-4-7': 5.00,
          'anthropic/claude-opus-5-5': 15.00,
          'google/gemini-4-argon': 2.50,
          'qwen/qwen-3-8-max': 0.12,
        };
        const scatterData = allModels.map(m => ({
          ...m,
          cost: costMap[m.id] ?? 1.00,
        })).sort((a, b) => a.cost - b.cost);
        const sorted = [...scatterData];
        const pareto: any[] = [];
        let maxInt = -1;
        for (const m of sorted) { if (m.intelligence > maxInt) { pareto.push(m); maxInt = m.intelligence; } }

        return (
          <div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/25 backdrop-blur-sm p-3 sm:p-4"
            onClick={() => setIsCompareModalOpen(false)}
          >
            <div
              className="bg-[#FAF9F6] w-full max-w-[1400px] 2xl:max-w-[1600px] min-[1920px]:max-w-[1800px] min-[2560px]:max-w-[2400px] max-h-[95vh] sm:max-h-[90vh] rounded-xl sm:rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.18)] border border-[#E5E3DF] flex flex-col overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[#E5E3DF] bg-white/80 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-semibold text-[13px] sm:text-[15px] text-[#2E2E2D]">Intelligence Index vs. Cost per Task</p>
                    <p className="text-[10px] sm:text-[11.5px] text-[#9E9D9A] mt-0.5">Weighted average cost (USD) per Artificial Analysis Intelligence Index task</p>
                  </div>
                </div>
                <button onClick={() => setIsCompareModalOpen(false)} className="p-1 sm:p-1.5 rounded-lg hover:bg-[#F1EFEA] transition-colors cursor-pointer shrink-0">
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#6E6D6A]" strokeWidth={1.5} />
                </button>
              </div>

              <div className="overflow-y-auto flex flex-col gap-4 sm:gap-5 p-4 sm:p-6">
                {/* Legend */}
                <div className="flex flex-wrap gap-x-5 gap-y-2 items-center">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#6E6D6A]">
                    <div className="w-3.5 h-3.5 rounded-sm" style={{background:'#E8F5E8', border:'1px solid #C5E1C5'}} />
                    <span>Most attractive quadrant</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-[#6E6D6A]">
                    <svg width="28" height="8"><line x1="0" y1="4" x2="28" y2="4" stroke="#555" strokeWidth="1.5" strokeDasharray="4 3"/></svg>
                    <span>Pareto line</span>
                  </div>
                  <div className="w-px h-4 bg-[#E5E3DF] mx-1" />
                  {Object.entries(providerColors).map(([p]) => (
                    <div key={p} className="flex items-center gap-1.5 text-[12px] text-[#6E6D6A]">
                      <img src={getProviderLogo(p)} alt="" className="w-3.5 h-3.5 object-contain" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>

                {/* Charts Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Scatter Chart — matches reference style */}
                  <div className="bg-white rounded-xl border border-[#E5E3DF] pt-4 sm:pt-5 pb-6 sm:pb-8 pr-2 sm:pr-6 pl-0 sm:pl-2 shrink-0 min-h-[300px] sm:min-h-[400px] flex flex-col overflow-hidden" style={{height: 400}}>
                    <div className="flex-1 w-full min-w-0">
                      <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart margin={{top: 20, right: 20, left: -20, bottom: 20}}>
                      <defs>
                        <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.08" />
                        </filter>
                        <linearGradient id="ref-gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#E8F5E8" stopOpacity={0.6} />
                          <stop offset="100%" stopColor="#E8F5E8" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#F0EFEB" />
                      {/* Green most-attractive quadrant: high intelligence (>40), low cost (<$2) */}
                      <ReferenceArea x1={0.05} x2={2} y1={40} y2={70} fill="url(#ref-gradient)" ifOverflow="hidden" />
                      <XAxis
                        dataKey="cost"
                        type="number"
                        scale="log"
                        domain={[0.05, 30]}
                        axisLine={{stroke:'#E5E3DF'}}
                        tickLine={false}
                        tick={{fontSize:10.5, fill:'#9E9D9A'}}
                        ticks={[0.06, 0.08, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 7, 8, 10, 20]}
                        tickFormatter={v => `$${v < 1 ? (v < 0.1 ? v.toFixed(2) : v.toFixed(1)) : v % 1 === 0 ? v.toFixed(0) : v}`}
                        label={{value:'Cost per Task (USD, Log Scale)', position:'insideBottom', offset:-14, fontSize:11, fill:'#6E6D6A', fontWeight:500}}
                      />
                      <YAxis
                        dataKey="intelligence"
                        type="number"
                        domain={[0, 70]}
                        axisLine={{stroke:'#E5E3DF'}}
                        tickLine={false}
                        ticks={[0, 10, 20, 30, 40, 50, 60, 70]}
                        tick={{fontSize:10.5, fill:'#9E9D9A'}}
                        label={{value:'Artificial Analysis Intelligence Index', angle:-90, position:'insideLeft', offset:-50, dy:100, fontSize:11.5, fill:'#6E6D6A', fontWeight:500}}
                      />
                      <RechartsTooltip
                        cursor={false}
                        content={({active, payload}) => {
                          if (!active || !payload?.length) return null;
                          const d = payload[0].payload;
                          return (
                            <div className="bg-white border border-[#E5E3DF] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-3.5 text-[12px] min-w-[170px]">
                              <div className="flex items-center gap-2 font-bold text-[#2E2E2D] mb-2.5 pb-2 border-b border-[#F0EFEB]">
                                <img src={d.logo} alt="" className="w-4 h-4 object-contain" />
                                {d.name}
                              </div>
                              <div className="flex justify-between gap-4 text-[#6E6D6A] mb-1">
                                <span>Intelligence</span>
                                <span className="font-bold text-[#2E2E2D]">{d.intelligence}</span>
                              </div>
                              <div className="flex justify-between gap-4 text-[#6E6D6A] mb-1">
                                <span>Cost / task</span>
                                <span className="font-bold text-[#2E2E2D]">${d.cost < 1 ? d.cost.toFixed(2) : d.cost.toFixed(2)}</span>
                              </div>
                              <div className="mt-2 pt-1.5 border-t border-[#F0EFEB] text-[11px] text-[#B0AEAB]">{d.provider}</div>
                            </div>
                          );
                        }}
                      />
                      <Scatter
                        data={scatterData}
                        isAnimationActive={false}
                        shape={(props: any) => {
                          const {cx, cy, payload} = props;
                          if (!cx || !cy) return <g />;
                          const size = 18;
                          const r = size / 2 + 3;
                          const color = providerColors[payload.provider] || '#E5E3DF';
                          return (
                            <g>
                              <circle cx={cx} cy={cy} r={r} fill="white" stroke={color} strokeWidth={1.5} filter="url(#drop-shadow)" />
                              <image
                                href={payload.logo}
                                x={cx - size / 2}
                                y={cy - size / 2}
                                height={size}
                                width={size}
                                preserveAspectRatio="xMidYMid meet"
                              />
                            </g>
                          );
                        }}
                      />
                      <Line
                        data={pareto}
                        dataKey="intelligence"
                        stroke="#333"
                        strokeDasharray="5 4"
                        strokeWidth={1.5}
                        dot={{r:3.5, fill:'#333', stroke:'none'}}
                        activeDot={false}
                        isAnimationActive={false}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                    </div>
                  </div>
                  
                  {/* Right: Bar Chart — sorted by intelligence */}
                  <div className="bg-white rounded-xl border border-[#E5E3DF] pt-4 sm:pt-5 pb-6 sm:pb-8 pr-2 sm:pr-6 pl-0 sm:pl-2 shrink-0 min-h-[300px] sm:min-h-[400px] flex flex-col overflow-hidden" style={{height: 400}}>
                    <div className="flex-1 w-full min-w-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[...scatterData].sort((a, b) => b.intelligence - a.intelligence)} margin={{top: 20, right: 10, left: -20, bottom: 80}} barCategoryGap="20%">
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EFEB" />
                          <XAxis 
                            dataKey="name" 
                            tick={(props: any) => {
                              const { x, y, payload } = props;
                              const model = scatterData.find(m => m.name === payload.value);
                              return (
                                <g transform={`translate(${x},${y})`}>
                                  {model?.logo && (
                                    <image href={model.logo} x={-10} y={10} width={20} height={20} preserveAspectRatio="xMidYMid meet" />
                                  )}
                                  <g transform="translate(-4, 42) rotate(-45)">
                                    <text x={0} y={0} textAnchor="end" fill="#6E6D6A" fontSize={11} fontWeight={500}>
                                      {payload.value}
                                    </text>
                                  </g>
                                </g>
                              );
                            }}
                            interval={0}
                            axisLine={{stroke:'#E5E3DF'}}
                            tickLine={false}
                          />
                          <YAxis 
                            domain={[0, 70]} 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize:11.5, fill:'#9E9D9A'}}
                            ticks={[0, 20, 40, 60, 70]}
                          />
                          <RechartsTooltip cursor={{fill: '#F9F6F0'}} />
                          <Bar dataKey="intelligence" radius={[4, 4, 0, 0]}>
                            {[...scatterData].sort((a, b) => b.intelligence - a.intelligence).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={providerColors[entry.provider] || '#ccc'} />
                            ))}
                            <LabelList dataKey="intelligence" position="insideTop" fill="white" fontSize={12} fontWeight="bold" offset={10} />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>


                {/* Table */}
                <div className="rounded-xl border border-[#E5E3DF] overflow-hidden w-full bg-white shadow-sm overflow-x-auto no-scrollbar">
                  <table className="w-full text-left border-collapse text-[12.5px] min-w-[700px]">
                    <thead>
                      <tr className="bg-[#F7F6F3] border-b border-[#E5E3DF]">
                        <th className="py-3.5 px-6 font-semibold text-[#2E2E2D] w-[25%]">Model</th>
                        <th className="py-3.5 px-6 font-semibold text-[#2E2E2D] w-[15%]">Provider</th>
                        <th className="py-3.5 px-6 font-semibold text-[#2E2E2D] w-[15%] text-right">Context</th>
                        <th className="py-3.5 px-6 font-semibold text-[#2E2E2D] w-[15%] text-right">Intelligence</th>
                        <th className="py-3.5 px-6 font-semibold text-[#2E2E2D] w-[15%] text-right">Speed tok/s</th>
                        <th className="py-3.5 px-6 font-semibold text-[#2E2E2D] w-[15%] text-right">Latency (s)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-[#E5E3DF]">
                      {allModels.map((m) => (
                        <tr key={m.id} className="hover:bg-[#FAF9F6] transition-colors">
                          <td className="py-3.5 pl-6 pr-4">
                            <div className="flex items-center gap-3">
                              <div className="w-1.5 h-6 rounded-full shrink-0" style={{background: providerColors[m.provider] || '#E5E3DF'}} />
                              <img src={m.logo} alt="" className="w-4.5 h-4.5 object-contain shrink-0" />
                              <span className="font-semibold text-[#2E2E2D] text-[13px]">{m.name}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-6 text-[#6E6D6A] font-medium">{m.provider}</td>
                          <td className="py-3.5 px-6 text-[#6E6D6A] font-medium text-right">{m.context}</td>
                          <td className="py-3.5 px-6 text-right">
                            <span className="font-bold text-[#2E2E2D] text-[13px]">{m.intelligence}</span>
                          </td>
                          <td className="py-3.5 px-6 text-[#6E6D6A] font-medium text-right">{m.speed}</td>
                          <td className="py-3.5 px-6 text-[#6E6D6A] font-medium text-right">{m.latency}s</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
    </>
  );
}

export default App;

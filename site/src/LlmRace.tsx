import { useMemo, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LEADERBOARD_DATA } from './leaderboardData';
import { Link } from 'react-router-dom';

const GithubIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
);

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

const getProviderColor = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('anthropic')) return '#D1C6BB';
  if (lower.includes('openai')) return '#10A37F';
  if (lower.includes('google')) return '#4285F4';
  if (lower.includes('meta')) return '#0668E1';
  if (lower.includes('xai') || lower.includes('spacexai')) return '#000000';
  if (lower.includes('deepseek')) return '#1D4ED8';
  if (lower.includes('mistral')) return '#F97316';
  if (lower.includes('cohere')) return '#39594D';
  
  // Deterministic random-ish color for other providers based on their name length
  const colors = ['#6B7280', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899'];
  return colors[name.length % colors.length];
}

export default function LlmRace() {
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

  const models = useMemo(() => {
    return LEADERBOARD_DATA.map(m => ({
      ...m,
      logo: getProviderLogo(m.provider),
      color: getProviderColor(m.provider)
    }));
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F4F1] font-sans selection:bg-[#E5E3DF] selection:text-[#2E2E2D] pb-0 relative">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#F5F4F1]/90 backdrop-blur-md border-b border-[#EAEAEA] h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center min-w-0 gap-2.5 hover:opacity-80 transition-opacity">
            <img src="/icon.png" alt="LLM Benchmark Icon" className="h-[32px] w-[32px] object-contain shrink-0" />
            <div className="flex flex-col text-[#1c1c1c] tracking-tighter font-semibold min-w-0 justify-center">
              <span className="text-[17px] leading-none whitespace-nowrap">llm</span>
              <span className="text-[17px] leading-none whitespace-nowrap -mt-0.5">benchmark</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link onClick={() => window.scrollTo(0, 0)} to="/llm-race" className="group flex items-center gap-1.5 text-[13px] font-medium text-white bg-black/80 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-md hover:bg-black transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 180 750 400" fill="currentColor" className="opacity-90 group-hover:opacity-100 transition-all scale-[1.3] origin-center"><path d="M531.28,222.88c-1.5-13.26-1.51-29.69-13.08-38.57-15.93-9.99-35.84-9.58-53.65-5.76-19.19,3.95-36.56,13.31-54.23,21.41-26.18,11.67-53.12,21.68-81.01,28.38-21.64,5.39-43.15,12.42-65.43,14.56-5.25,.89-16.74-.5-26.38-.35-.09-2.54-.2-5.08-.32-7.62-.08-6.95,1.83-15.66-4.84-20.28-6.18-4.2-12.93,2.65-13.5,8.87-1.8,11.51-.79,23.16-.38,34.74,1.4,25.7,1.01,51.45,.89,77.18,.2,9.11,.64,18.22,1.04,27.33-8.89,3.83-9.6,20.46,.5,23.63,.08,0,.16,0,.24,0,.08,6.96,0,13.92-.39,20.88-2.3,39.77-7.31,79.46-4.8,119.36,1.64,10.92-.63,37.82,6.85,44.66,8.85,8.1,18.88-4.36,17.31-13.46-.58-6.2-.93-12.4-1.19-18.62-.64-21.48-.51-43.64-2.09-65.86-.49-4.23-.88-8.47-1.22-12.7,9.5,3.56,19.76,5.13,29.79,6.14,38.06,5.72,76.88,.47,111.55-16.47,18.3-7.86,35.13-19.41,54.63-24.27,16.06-4.19,32.76-3.96,49.1-1.76,13.42,1.5,25.88,7.18,39.1,9.4,16.45,2.38,12.63-20.02,12.8-30.44-.18-14.46,.97-28.88,2.25-43.27,4.55-45.77-1.52-91.44-3.54-137.14Zm-47.75,92.33c-8.39,.88-16.65,2.46-24.81,4.46-.18-5.52-.37-11.04-.61-16.56,.14-6.96,.36-13.91,.67-20.87,11.79-2.31,23.74-3.77,35.78-4.33,4.93-.24,9.88-.51,14.79-.05,1.79,.29,3.56,.78,5.3,1.21-.25,8.06-.8,16.11-1.52,24.11-.29,4.69-.53,9.39-.73,14.09-9.35-2.68-19.13-3.4-28.87-2.07Zm-110.24,29.93c-5.44,1.2-10.92,2.13-16.43,2.91,.12-10.74,.15-21.49,.47-32.23,.08-1.52,.17-3.04,.26-4.56,7.18-1.59,14.3-3.42,21.34-5.64,3.57-.84,7.11-1.78,10.63-2.76,.38,12.49,.61,24.97,.31,37.46-5.52,1.62-11.05,3.23-16.58,4.82Zm-31.46,90.51c-14.74,6.04-30.09,10.46-45.9,12.77-.11-1.73-.2-3.45-.11-5.13-.27-13.28-.28-24.97,.42-39.12,.59-8.58,.7-17.15,.56-25.72,14.18-1.51,28.47-2.5,42.59-4.5,.72,20.57,1.8,41.12,2.43,61.7Zm-104.69-83.9c.09-8.71,.24-17.43,.39-26.15,2.49,.13,4.99,.15,7.22,.45,10.54,.48,21.05-.21,31.52-1.41,.41,10.43,1.04,20.85,1.57,31.21-13.76,1.34-27.49,2.95-41.22,4.64,.17-2.91,.34-5.82,.52-8.73Zm76.62,1.33c-5.95,.31-11.89,.73-17.83,1.19-.49-9.98-1.06-19.96-1.35-29.95,.01-.72,.03-1.44,.04-2.16,3.22-.48,6.43-.98,9.64-1.46,11.57-1.99,23.19-3.73,34.75-5.77-.02,.57-.04,1.14-.06,1.71-.35,11.21-.36,22.41-.18,33.6-8.35,.88-16.71,1.7-25.01,2.85Zm50.37-103.63c1.07-3.26,1.13-6.44,.52-9.23,8.19-3.77,16.29-7.81,24.42-11.79-.01,.15-.02,.3-.03,.46-1.06,17.85-.7,35.69-.13,53.54-9.84,1.69-19.69,3.44-29.54,5.17,1.19-12.76,2.75-25.48,4.77-38.14Zm43.7,47.83c8.76-2.88,17.47-5.95,26.23-8.89,2.09-.63,4.2-1.23,6.31-1.81-.04,1.25-.07,2.51-.11,3.76-.51,11.48-.2,22.93,.63,34.35-4.58,1.42-9.13,2.92-13.66,4.45-6.4,1.95-12.81,3.88-19.23,5.81,.26-12.55,.02-25.11-.17-37.67Zm98.71-86.61h0c3.99,12.47,6.28,25.26,7.4,38.18-9.44-1.1-19.16,.81-28.45,2.6-8.65,2-17.06,4.77-25.36,7.86,1.04-14.17,2.46-28.31,4.32-42.39,.16-3.91,1.2-8.27,1.72-12.56,13.83-.76,27.87,.06,40.38,6.3Zm-60.39-4.01c-.25,1.63-.49,3.26-.72,4.89-2.84,18.32-3.84,36.81-4.47,55.32-10.95,4.42-21.93,8.78-33.26,12.05,0-.68,0-1.37,0-2.05,.14-19.25,.22-38.49,1.14-57.72,12.05-5.3,24.37-9.83,37.32-12.49Zm-116.56,45.71c4.96-1.25,9.83-2.34,15.06-3.99-2.78,13.98-3.98,28.25-4.7,42.54-14.84,2.47-29.71,4.71-44.62,6.41,.52-12.07,1.37-24.12,2.74-36.1,10.51-3.02,20.96-6.36,31.51-8.85Zm-78.25,16.42c9.08,.31,17.95-.76,26.72-2.53-1.47,10.9-2.1,21.9-2.22,32.94-12.59,.97-25.22,1.44-37.9,1.22,.14-10.68,.2-21.36,.12-32.04,4.43,.17,8.9,.15,13.28,.4Zm-15.81,176.33c-.3-.13-.59-.22-.87-.28-.8-19.49-.34-38.99,.57-58.49,14.75-.92,29.39-4.09,44.1-5.98,1.46,23.21,2.56,46.44,3.14,69.69-15.88,1.58-32.17,1.71-46.94-4.93Zm119.6-15.38c0-1.12,.02-2.23,.09-3.34-.19-12.82-.29-26.73,.29-40.84,.38-4.87,.64-9.74,.84-14.62,.84-.19,1.69-.37,2.53-.56,10.78-2.59,21.01-6.82,31.29-10.91,.49,12.61,1.32,25.2,1.65,37.81,.28,3.19,.56,9.37,1.37,15.31-12.91,5.3-25.52,11.58-38.07,17.14Zm51.32-22.14c-.12-.77-.23-1.55-.34-2.32-.76-6.6-.36-13.25-.3-19.87,0-10.76,.79-21.5,1.44-32.24,3.07-.99,6.16-1.9,9.31-2.65,8.7-2.21,17.45-4.33,26.32-5.62,.84,6.91,1.81,13.8,2.86,20.68,1.36,7.07,2.14,23,4.41,35.23-15.15-.92-29.63,2.04-43.7,6.79Zm58.38-4.74c-1.15-5.13-2.08-10.31-2.79-15.52-1.39-14.53-2.06-29.11-2.56-43.7,16.7-.67,33.91-1.99,49.76,3.73,.79,.25,1.68,.6,2.64,.98,.18,23.14,1.69,46.28,4.94,69.16-17.46-4.22-34.34-11.07-51.98-14.66Z"/></svg>
            LLM Race
          </Link>
          <Link onClick={() => window.scrollTo(0, 0)} to="/dashboard" className="text-[13px] font-medium text-[#111111] bg-[#EEEEEE]/80 backdrop-blur-xl border border-black/10 px-4 py-1.5 rounded-md hover:bg-[#E5E5E5]/90 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.05)]">Dashboard</Link>
          <div className="w-[1px] h-5 bg-[#EAEAEA] mx-1"></div>
          <a href="https://github.com/Studio1-OSS/awesome-llm-benchmarks" target="_blank" rel="noreferrer" className="flex items-center justify-center hover:opacity-70 transition-opacity">
            <GithubIcon size={22} />
            {githubStars !== null && <span className="ml-1.5 text-[12.5px] font-medium text-[#111111]">{githubStars.toLocaleString()}</span>}
          </a>
        </div>
      </header>

      {/* Top Banner Section */}
      <div className="max-w-[1400px] mx-auto px-8 pt-16 pb-8">
        <div className="flex flex-col md:flex-row gap-12 justify-between items-start">
          <div className="flex-1 max-w-[600px]">
            <h1 className="text-[44px] leading-[1.1] font-heading font-medium tracking-tight text-[#1C1C1C] mb-6">
              The Global LLM Race — Evaluating the Frontier of AI Performance
            </h1>
            
            <div className="flex items-center gap-3">
              <Link to="/dashboard" onClick={() => window.scrollTo(0, 0)} className="px-5 py-2.5 rounded-full text-white text-[15px] font-medium transition-all flex items-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] bg-gradient-to-b from-[#333333]/90 to-[#111111]/90 backdrop-blur-xl hover:from-[#444444]/90 hover:to-[#222222]/90 border border-black/50">
                Dashboard
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a href="https://github.com/Studio1-OSS/awesome-llm-benchmarks" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-full text-[#111111] text-[15px] font-medium transition-all flex items-center gap-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,1)] bg-[#EEEEEE]/80 backdrop-blur-2xl hover:bg-[#E5E5E5]/90 border border-black/10">
                Contribute on GitHub
                <GithubIcon size={16} />
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-[480px] shrink-0 text-[#4B4B4B] text-[15px] leading-relaxed">
            <p className="mb-4">
              A comprehensive, data-driven analysis ranking over 250 leading language models. We evaluate the world's top AI systems across critical dimensions including holistic intelligence, operational cost, processing speed, and context scale.
            </p>
            <p>
              For more details including relating to our methodology, see our <Link to="/faq" onClick={() => window.scrollTo(0, 0)} className="underline decoration-[#A1A1AA] hover:text-[#1C1C1C] transition-colors underline-offset-4">FAQs</Link>.
            </p>
          </div>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="max-w-[1400px] mx-auto px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          
          {/* Intelligence Card */}
          <div className="bg-white rounded-xl border border-[#E5E3DF] p-6 shadow-sm flex flex-col h-full">
            <div className="bg-[#F5F4F1] w-fit px-3 py-1.5 rounded-full text-[12px] font-semibold text-[#1C1C1C] mb-5">
              Intelligence
            </div>
            <p className="text-[14px] text-[#4B4B4B] leading-relaxed flex-1">
              Claude Opus 5.5 (max with fallback) and Claude Sonnet 5.5 (max with fallback) are the highest intelligence models, followed by Claude Opus 5.5 (xhigh with fallback) and Claude Opus 5.5 (high with fallback).
            </p>
            <div className="flex items-center gap-2 mt-6">
              <img src="/logos/claude.png" className="w-5 h-5 object-contain" alt="Anthropic" />
              <img src="/logos/claude.png" className="w-5 h-5 object-contain" alt="Anthropic" />
              <img src="/logos/claude.png" className="w-5 h-5 object-contain" alt="Anthropic" />
              <img src="/logos/claude.png" className="w-5 h-5 object-contain" alt="Anthropic" />
            </div>
          </div>

          {/* Output Speed Card */}
          <div className="bg-white rounded-xl border border-[#E5E3DF] p-6 shadow-sm flex flex-col h-full">
            <div className="bg-[#F5F4F1] w-fit px-3 py-1.5 rounded-full text-[12px] font-semibold text-[#1C1C1C] mb-5">
              Output Speed
            </div>
            <p className="text-[14px] text-[#4B4B4B] leading-relaxed flex-1">
              Celeris-1 and Mercury 2.5 are the fastest models, followed by Mercury 2 and Gemini 3.5 Flash-Lite.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <img src="/logos/celeris.png" className="w-5 h-5 object-contain" alt="Celeris" />
              <img src="/logos/mercury.png" className="w-5 h-5 object-contain" alt="Mercury" />
              <img src="/logos/google.svg" className="w-5 h-5 object-contain" alt="Google" />
            </div>
          </div>

          {/* Latency Card */}
          <div className="bg-white rounded-xl border border-[#E5E3DF] p-6 shadow-sm flex flex-col h-full">
            <div className="bg-[#F5F4F1] w-fit px-3 py-1.5 rounded-full text-[12px] font-semibold text-[#1C1C1C] mb-5">
              Latency
            </div>
            <p className="text-[14px] text-[#4B4B4B] leading-relaxed flex-1">
              Gemini 2.5 Flash-Lite (non-reasoning) and Gemini 2.5 Flash (non-reasoning) are the lowest latency models, followed by Claude 4.5 Haiku (non-reasoning) and Command A+.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <img src="/logos/google.svg" className="w-5 h-5 object-contain" alt="Google" />
              <img src="/logos/google.svg" className="w-5 h-5 object-contain" alt="Google" />
              <img src="/logos/claude.png" className="w-5 h-5 object-contain" alt="Anthropic" />
              <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold">C</div>
            </div>
          </div>

          {/* Cost per Task Card */}
          <div className="bg-white rounded-xl border border-[#E5E3DF] p-6 shadow-sm flex flex-col h-full">
            <div className="bg-[#F5F4F1] w-fit px-3 py-1.5 rounded-full text-[12px] font-semibold text-[#1C1C1C] mb-5">
              Cost per Task
            </div>
            <p className="text-[14px] text-[#4B4B4B] leading-relaxed flex-1">
              GPT-6 Luna (low) and Granite 4.2 3B have the lowest cost per task, followed by Ministral 3 3B and GPT-5.6 Luna (low).
            </p>
            <div className="flex items-center gap-2 mt-6">
              <img src="/logos/openai.svg" className="w-5 h-5 object-contain" alt="OpenAI" />
              <span className="text-[10px] font-bold text-blue-600">IBM</span>
              <img src="/logos/mistral.svg" className="w-5 h-5 object-contain" alt="Mistral" />
              <img src="/logos/openai.svg" className="w-5 h-5 object-contain" alt="OpenAI" />
            </div>
          </div>

          {/* Context Window Card */}
          <div className="bg-white rounded-xl border border-[#E5E3DF] p-6 shadow-sm flex flex-col h-full">
            <div className="bg-[#F5F4F1] w-fit px-3 py-1.5 rounded-full text-[12px] font-semibold text-[#1C1C1C] mb-5">
              Context Window
            </div>
            <p className="text-[14px] text-[#4B4B4B] leading-relaxed flex-1">
              Llama 4 Scout and Grok 4.20 0309 support the largest context windows, followed by Gemini 1.5 Pro (May) and Grok 4.1 Fast.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <img src="/logos/meta.svg" className="w-5 h-5 object-contain" alt="Meta" />
              <img src="/logos/xai.svg" className="w-5 h-5 object-contain" alt="xAI" />
              <img src="/logos/google.svg" className="w-5 h-5 object-contain" alt="Google" />
              <img src="/logos/xai.svg" className="w-5 h-5 object-contain" alt="xAI" />
            </div>
          </div>

        </div>
      </div>

      {/* Main Table with Vertical Scroll */}
      <div className="max-w-[1400px] mx-auto px-8 mb-24">
        <style>{`
          .table-scrollbar::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          .table-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .table-scrollbar::-webkit-scrollbar-thumb {
            background-color: #E5E7EB;
            border-radius: 10px;
          }
          .table-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #D1D5DB;
          }
        `}</style>
        <div className="bg-white rounded-xl border border-[#E5E3DF] shadow-sm overflow-hidden flex flex-col max-h-[600px]">
          <div className="overflow-auto flex-1 relative table-scrollbar">
            <table className="w-full text-left border-collapse text-[13px] table-fixed min-w-[900px]">
              <thead className="sticky top-0 z-10 bg-[#F9F8F6] border-b border-[#E5E3DF] shadow-sm">
                <tr className="divide-x divide-[#E5E3DF]">
                  <th className="py-4 px-6 font-semibold text-[#1C1C1C] w-[25%]">Model</th>
                  <th className="py-4 px-6 font-semibold text-[#1C1C1C] w-[15%]">Provider</th>
                  <th className="py-4 px-6 font-semibold text-[#1C1C1C] w-[12%] text-right">Context Window</th>
                  <th className="py-4 px-6 font-semibold text-[#1C1C1C] w-[12%] text-right">Intelligence Index</th>
                  <th className="py-4 px-6 font-semibold text-[#1C1C1C] w-[12%] text-right">Cost per Task (USD)</th>
                  <th className="py-4 px-6 font-semibold text-[#1C1C1C] w-[12%] text-right">Median Tokens/s</th>
                  <th className="py-4 px-6 font-semibold text-[#1C1C1C] w-[12%] text-right">Latency First Chunk (s)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E3DF]">
                {models.map((m, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF9F6] transition-colors group divide-x divide-[#E5E3DF]">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 rounded-full shrink-0" style={{background: m.color}} />
                        {m.logo ? (
                          <img src={m.logo} alt={m.provider} className="w-5 h-5 object-contain shrink-0" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        ) : (
                          <div className="w-5 h-5 shrink-0" />
                        )}
                        <span className="font-semibold text-[#1C1C1C] truncate" title={m.name}>{m.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 truncate" title={m.provider}>
                      <div className="flex items-center gap-2">
                        {m.logo ? (
                          <img src={m.logo} alt="" className="w-4 h-4 object-contain opacity-60 shrink-0" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        ) : (
                          <div className="w-4 h-4 shrink-0" />
                        )}
                        <span className="text-[#6B6B6B]">{m.provider}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-[#6B6B6B] text-right font-medium">{m.context}</td>
                    <td className="py-3.5 px-6 text-right">
                      {m.intelligence && m.intelligence !== '--' ? (
                         <span className="font-bold text-[#1C1C1C]">{m.intelligence}</span>
                      ) : (
                         <span className="text-[#A1A1AA] font-medium">--</span>
                      )}
                    </td>
                    <td className="py-3.5 px-6 text-right font-medium">
                       {m.cost && m.cost !== '--' ? (
                          <span className="text-[#1C1C1C]">{m.cost}</span>
                       ) : (
                          <span className="text-[#A1A1AA]">--</span>
                       )}
                    </td>
                    <td className="py-3.5 px-6 text-right font-medium">
                       {m.speed && m.speed !== '--' ? (
                          <span className="text-[#6B6B6B]">{m.speed}</span>
                       ) : (
                          <span className="text-[#A1A1AA]">--</span>
                       )}
                    </td>
                    <td className="py-3.5 px-6 text-right font-medium">
                       {m.latency && m.latency !== '--' ? (
                          <span className="text-[#6B6B6B]">{m.latency}</span>
                       ) : (
                          <span className="text-[#A1A1AA]">--</span>
                       )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#F8F7F4] pt-16 pb-12 border-t border-[#EAEAEA] mt-12">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 mb-4 relative pb-16">
            <div className="col-span-1 lg:col-span-2 pr-8">
              <div className="flex items-center min-w-0 gap-3 mb-6 opacity-90">
                <img src="/icon.png" alt="LLM Benchmark Icon" className="h-[48px] w-[48px] object-contain shrink-0 grayscale" />
                <div className="flex flex-col text-[#1c1c1c] tracking-tighter font-semibold min-w-0 justify-center">
                  <span className="text-[20px] leading-none whitespace-nowrap">llm</span>
                  <span className="text-[20px] leading-none whitespace-nowrap -mt-[2px]">benchmark</span>
                </div>
              </div>
              <div className="mb-6">
                <a href="https://www.studio1hq.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#666666] transition-colors hover:text-[#171717] group/studio">
                  An open-source project by Studio1
                  <svg viewBox="0 0 160 160" className="w-[14px] h-[14px] fill-current text-[#FF7E1D]">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 35C0 16.6807 14.0744 1.64844 32 0.126953V141H51.0523C52.4308 137.344 54.7446 133.689 57.9938 130.033C61.1446 126.508 64.6892 123.44 68.6277 120.829C72.5662 118.349 76.3569 116.782 80 116.129V86.7544C75.4708 87.9292 71.3846 89.6919 67.7415 92.0415C64 94.5225 60.7508 97.46 57.9938 100.854C56.5345 102.72 55.2545 104.659 54.1539 106.671V0H125C144.33 0 160 15.6699 160 35V125C160 144.33 144.33 160 125 160H124V18H104.948C103.569 21.6816 101.255 25.3628 98.0062 29.0444C94.8554 32.5942 91.3108 35.6841 87.3723 38.314C83.4338 40.812 79.6431 42.3896 76 43.0474V72.6304C80.5292 71.4473 84.6154 69.6724 88.2585 67.3057C92 64.8076 95.2492 61.8491 98.0062 58.4307C99.4655 56.5513 100.745 54.5986 101.846 52.5723V160H35C15.67 160 0 144.33 0 125V35Z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="col-span-1 lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8 pt-2">
              <div className="flex flex-col">
                <h4 className="text-[15px] text-[#111111] mb-6">Product</h4>
                <ul className="space-y-3.5 text-[14px] text-[#666666]">
                  <li><Link onClick={() => window.scrollTo(0, 0)} to="/dashboard" className="hover:text-[#111111] transition-colors">Benchmarks</Link></li>
                  <li><Link onClick={() => window.scrollTo(0, 0)} to="/methodologies" className="hover:text-[#111111] transition-colors">Methodologies</Link></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[15px] text-[#111111] mb-6">Company</h4>
                <ul className="space-y-3.5 text-[14px] text-[#666666]">
                  <li><Link onClick={() => window.scrollTo(0, 0)} to="/about" className="hover:text-[#111111] transition-colors">About</Link></li>
                  <li><Link onClick={() => window.scrollTo(0, 0)} to="/contributors" className="hover:text-[#111111] transition-colors">Contributors</Link></li>
                  <li><a href="https://github.com/Studio1-OSS/awesome-llm-benchmarks" target="_blank" rel="noreferrer" className="hover:text-[#111111] transition-colors">GitHub</a></li>
                  <li><Link onClick={() => window.scrollTo(0, 0)} to="/blog" className="hover:text-[#111111] transition-colors">Blog</Link></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[15px] text-[#111111] mb-6">Resources</h4>
                <ul className="space-y-3.5 text-[14px] text-[#666666]">
                  <li><Link onClick={() => window.scrollTo(0, 0)} to="/documentation" className="hover:text-[#111111] transition-colors">Documentation</Link></li>
                  <li><Link onClick={() => window.scrollTo(0, 0)} to="/updates" className="hover:text-[#111111] transition-colors">Updates</Link></li>
                  <li><Link onClick={() => window.scrollTo(0, 0)} to="/faq" className="hover:text-[#111111] transition-colors">FAQ</Link></li>
                  <li><Link onClick={() => window.scrollTo(0, 0)} to="/404" className="hover:text-[#111111] transition-colors">404 Page</Link></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[15px] text-[#111111] mb-6">Legal</h4>
                <ul className="space-y-3.5 text-[14px] text-[#666666]">
                  <li><Link onClick={() => window.scrollTo(0, 0)} to="/privacy" className="hover:text-[#111111] transition-colors">Privacy Policy</Link></li>
                  <li><Link onClick={() => window.scrollTo(0, 0)} to="/terms" className="hover:text-[#111111] transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-[#EAEAEA] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[13px] text-[#999999]">© {new Date().getFullYear()} LLM Benchmark. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

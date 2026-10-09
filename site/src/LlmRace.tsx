import { useMemo, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LEADERBOARD_DATA } from './leaderboardData';
import { Link } from 'react-router-dom';

const GithubIcon = ({ size = 24, className = '' }: { size?: number, className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
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
          <Link onClick={() => window.scrollTo(0, 0)} to="/llm-race" className="text-[13px] font-medium text-white bg-black/80 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-md hover:bg-black transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)]">LLM Race</Link>
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
                    <td className="py-3.5 px-6 text-[#6B6B6B] truncate" title={m.provider}>{m.provider}</td>
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

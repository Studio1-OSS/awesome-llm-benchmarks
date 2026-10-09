import { useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LEADERBOARD_DATA } from './leaderboardData';
import { Link } from 'react-router-dom';

const getProviderLogo = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('fable') || lowerName.includes('sonnet') || lowerName.includes('opus') || lowerName.includes('anthropic') || lowerName.includes('claude') || lowerName.includes('haiku')) return '/logos/claude.png';
  if (lowerName.includes('gpt') || lowerName.includes('openai') || lowerName.includes('codex') || lowerName.includes('o3')) return '/logos/openai.svg';
  if (lowerName.includes('gemini') || lowerName.includes('google') || lowerName.includes('gemma')) return '/logos/google.svg';
  if (lowerName.includes('llama') || lowerName.includes('meta') || lowerName.includes('muse')) return '/logos/meta.svg';
  if (lowerName.includes('grok') || lowerName.includes('xai') || lowerName.includes('x-ai') || lowerName.includes('spacexai')) return '/logos/xai.svg';
  if (lowerName.includes('deepseek')) return '/logos/deepseek.svg';
  if (lowerName.includes('kimi') || lowerName.includes('moonshot')) return '/logos/kimi.png';
  if (lowerName.includes('glm') || lowerName.includes('zai') || lowerName.includes('z ai')) return '/logos/glm.png';
  if (lowerName.includes('qwen') || lowerName.includes('alibaba')) return '/logos/qwen.svg';
  if (lowerName.includes('mistral') || lowerName.includes('magistral') || lowerName.includes('ministral')) return '/logos/mistral.png';
  return '/logos/openai.svg'; // Fallback
}

const getProviderColor = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('anthropic')) return '#D1C6BB';
  if (lower.includes('openai')) return '#10A37F';
  if (lower.includes('google')) return '#4285F4';
  if (lower.includes('meta')) return '#0668E1';
  if (lower.includes('xai') || lower.includes('spacexai')) return '#000000';
  if (lower.includes('deepseek')) return '#1D4ED8';
  return '#9CA3AF'; // fallback gray
}

export default function LlmRace() {
  const models = useMemo(() => {
    return LEADERBOARD_DATA.map(m => ({
      ...m,
      logo: getProviderLogo(m.provider),
      color: getProviderColor(m.provider)
    }));
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F4F1] font-sans selection:bg-[#E5E3DF] selection:text-[#2E2E2D] pb-24">
      {/* Top Banner Section */}
      <div className="max-w-[1400px] mx-auto px-8 pt-16 pb-8">
        <div className="flex flex-col md:flex-row gap-12 justify-between items-start">
          <div className="flex-1 max-w-[600px]">
            <h1 className="text-[44px] leading-[1.1] font-heading font-medium tracking-tight text-[#1C1C1C] mb-6">
              LLM Leaderboard - Comparison of AI models from OpenAI, Anthropic, Google, SpaceXAI & others
            </h1>
            
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[14px] font-medium rounded transition-colors shadow-sm">
                LLM API Providers Leaderboard
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link to="/playground" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-[#FAF9F6] text-[#1C1C1C] text-[14px] font-medium border border-[#E5E3DF] rounded transition-colors shadow-sm">
                Try it out
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="w-full md:w-[480px] shrink-0 text-[#4B4B4B] text-[15px] leading-relaxed">
            <p className="mb-4">
              Comparison and ranking the performance of over 250 AI models (LLMs) across key metrics including intelligence, price, performance and speed (output speed - tokens per second & latency - TTFT), context window & others.
            </p>
            <p>
              For more details including relating to our methodology, see our <Link to="/faq" className="underline decoration-[#A1A1AA] hover:text-[#1C1C1C] transition-colors underline-offset-4">FAQs</Link>.
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
              <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold">C</div>
              <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold">M</div>
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
              <img src="/logos/mistral.png" className="w-5 h-5 object-contain" alt="Mistral" />
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

      {/* Main Table */}
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="bg-white rounded-xl border border-[#E5E3DF] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13px] table-fixed min-w-[900px]">
              <thead>
                <tr className="bg-[#F9F8F6] border-b border-[#E5E3DF]">
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
                  <tr key={idx} className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 rounded-full shrink-0" style={{background: m.color}} />
                        <img src={m.logo} alt={m.provider} className="w-4.5 h-4.5 object-contain shrink-0" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
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
    </div>
  );
}

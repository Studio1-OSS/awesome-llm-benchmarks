import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';const AI_LOGOS = [
  '/logos/openai.svg',
  '/logos/claude.png',
  '/logos/gemini.svg',
  '/logos/deepseek.svg',
  '/logos/meta.svg',
  '/logos/mistral.svg',
  '/logos/perplexity.svg',
  '/logos/huggingface.svg',
  '/logos/qwen.svg',
  '/logos/xai.svg',
  '/logos/grok.png',
  '/logos/grok.png',
];

const TRUSTED_LOGOS = [
  '/logos/cursor.png',
  '/logos/antigravity.svg',
  '/logos/openai.svg',
  '/logos/aws.svg',
  '/logos/microsoft.svg',
  '/logos/anthropic.svg',
  '/logos/google.svg',
  '/logos/meta.svg',
  '/logos/mistral.svg',
  '/logos/deepseek.svg',
  '/logos/qwen.svg',
  '/logos/perplexity.svg',
  '/logos/huggingface.svg',
  '/logos/xai.svg',
  '/logos/github.svg',
  '/logos/ollama.svg',
  '/logos/primalabs.svg',
  '/logos/grok.png',
  '/logos/inclusionai_small.webp',
  '/logos/kilo.png',
  '/logos/kimi.png',
  '/logos/maincode.png',
  '/logos/openclaw.jpeg',
  '/logos/opencode.png',
  '/logos/gemma.png',
];

const GITHUB_URL = 'https://github.com/Studio1-OSS/awesome-llm-benchmarks';

const GithubIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
);

const TOP_MODELS = [
  { rank: 1, name: 'GPT-6 Astra', org: 'OpenAI', logo: '/logos/openai.svg', score: 88.75, coding: 74.02, reasoning: 89.6, price: '$10 / $50' },
  { rank: 2, name: 'Claude Opus 5.5', org: 'Anthropic', logo: '/logos/claude.png', score: 87.78, coding: 83.29, reasoning: 82.4, price: '$4 / $20' },
  { rank: 3, name: 'Claude Sonnet 5.5', org: 'Anthropic', logo: '/logos/claude.png', score: 83.42, coding: 85.56, reasoning: 79.2, price: '$2 / $10' },
  { rank: 4, name: 'Claude Fable 5.1', org: 'Anthropic', logo: '/logos/claude.png', score: 82.85, coding: 79.69, reasoning: 81.4, price: '$10 / $50' },
  { rank: 5, name: 'Claude Opus 5', org: 'Anthropic', logo: '/logos/claude.png', score: 79.95, coding: 72.03, reasoning: 77.3, price: '$5 / $25' },
  { rank: 6, name: 'Claude Fable 5', org: 'Anthropic', logo: '/logos/claude.png', score: 79.48, coding: 72.95, reasoning: 80.7, price: '$10 / $50' },
  { rank: 7, name: 'GPT-6 Sol', org: 'OpenAI', logo: '/logos/openai.svg', score: 79.2, coding: 61.82, reasoning: 79.6, price: '$2 / $10' },
  { rank: 8, name: 'GPT-5.6 Sol', org: 'OpenAI', logo: '/logos/openai.svg', score: 78.95, coding: 70.5, reasoning: 72.5, price: '$4 / $20' },
  { rank: 9, name: 'GPT-6.1 Sol', org: 'OpenAI', logo: '/logos/openai.svg', score: 77.58, coding: 59.0, reasoning: 79.4, price: '$2 / $10' },
  { rank: 10, name: 'Gemini 4 Argon', org: 'Google', logo: '/logos/gemini.svg', score: 77.22, coding: 74.0, reasoning: 77.1, price: '$2 / $10' },
];

const AI_RELEASES = [
  {
    date: '5 Oct',
    label: 'Amazon Bedrock performance results',
    providerIcon: '/logos/aws.svg',
    models: [
      { name: 'Claude Opus 5.5 (Max, Default Fallback)', icon: '/logos/claude.png' }
    ]
  },
  {
    date: '5 Oct',
    label: 'Microsoft Azure performance results',
    providerIcon: '/logos/microsoft.svg',
    models: [
      { name: 'Claude Sonnet 5.5 & Opus 5.5', icon: '/logos/claude.png' },
      { name: 'GPT-6 Luna & GPT-6.1 Sol', icon: '/logos/openai.svg' }
    ]
  },
  {
    date: '5 Oct',
    label: 'PrimaLabs performance results',
    providerIcon: '/logos/primalabs.svg',
    models: [
      { name: 'GLM 5.3 Flash', icon: '/logos/glm.png' }
    ]
  },
  {
    date: '4 Oct',
    label: 'OpenAI performance results',
    providerIcon: '/logos/openai.svg',
    models: [
      { name: 'GPT-6.1 Sol (Max)', icon: '/logos/openai.svg' }
    ]
  },
  {
    date: '3 Oct',
    label: 'New language model evaluation',
    providerIcon: undefined,
    models: [
      { name: 'Ling 3.1 Flash (Intelligence Index: 41)', icon: '/logos/inclusionai_small.webp' }
    ]
  },
  {
    date: '3 Oct',
    label: 'InclusionAI performance results',
    providerIcon: '/logos/inclusionai_small.webp',
    models: [
      { name: 'Ling 3.1 Flash', icon: '/logos/inclusionai_small.webp' }
    ]
  }
];

const METRIC_CARDS = [
  {
    title: 'Intelligence',
    badge: 'Higher is better',
    color: '#7C3AED',
    subtitle: 'Artificial Analysis Intelligence Index',
    desc: 'Overall reasoning, instruction-following, and world-model consistency across tasks.',
    models: [
      { name: 'Claude Opus 5.5', logo: '/logos/claude.png', val: 58, color: '#cc785c' },
      { name: 'Claude Fable 5.1', logo: '/logos/claude.png', val: 53, color: '#cc785c' },
      { name: 'GPT-6 Astra', logo: '/logos/openai.svg', val: 53, color: '#1f1f1f' },
      { name: 'Gemini 4 Argon', logo: '/logos/google.svg', val: 53, color: '#34A853' },
      { name: 'GPT-6.1 Sol', logo: '/logos/openai.svg', val: 52, color: '#1f1f1f' },
      { name: 'Muse Spark 1.3', logo: '/logos/meta.svg', val: 48, color: '#0089f4' },
      { name: 'Grok 4.7', logo: '/logos/xai.svg', val: 46, color: '#736cd3' },
      { name: 'MiMo-V2.6-Pro', logo: '/logos/qwen.svg', val: 46, color: '#ff6900' },
      { name: 'GLM-5.3', logo: '/logos/glm.png', val: 45, color: '#1c7ff8' },
      { name: 'DeepSeek V4.1', logo: '/logos/deepseek.svg', val: 39, color: '#2243e6' },
    ],
  },
  {
    title: 'Speed',
    badge: 'Higher is better',
    color: '#EAB308',
    subtitle: 'Output tokens per second',
    desc: 'Raw throughput measured in output tokens per second under real-world load conditions.',
    models: [
      { name: 'DeepSeek V4.1', logo: '/logos/deepseek.svg', val: 213, color: '#2243e6' },
      { name: 'Muse Spark 1.3', logo: '/logos/meta.svg', val: 148, color: '#0089f4' },
      { name: 'Claude Fable 5.1', logo: '/logos/claude.png', val: 91, color: '#cc785c' },
      { name: 'Gemini 4 Argon', logo: '/logos/google.svg', val: 83, color: '#34A853' },
      { name: 'MiMo-V2.6-Pro', logo: '/logos/qwen.svg', val: 78, color: '#ff6900' },
      { name: 'GLM-5.3', logo: '/logos/glm.png', val: 72, color: '#1c7ff8' },
      { name: 'Grok 4.7', logo: '/logos/xai.svg', val: 65, color: '#736cd3' },
      { name: 'GPT-6 Astra', logo: '/logos/openai.svg', val: 61, color: '#1f1f1f' },
      { name: 'GPT-6.1 Sol', logo: '/logos/openai.svg', val: 59, color: '#1f1f1f' },
      { name: 'Claude Opus 5.5', logo: '/logos/claude.png', val: 55, color: '#cc785c' },
    ],
  },
  {
    title: 'Cost per Task',
    badge: 'Lower is better',
    color: '#F97316',
    subtitle: 'Weighted avg cost (USD) per task',
    desc: 'Weighted average cost per Intelligence Index task.',
    models: [
      { name: 'DeepSeek V4.1', logo: '/logos/deepseek.svg', val: 13, color: '#2243e6' },
      { name: 'Muse Spark 1.3', logo: '/logos/meta.svg', val: 27, color: '#0089f4' },
      { name: 'MiMo-V2.6-Pro', logo: '/logos/qwen.svg', val: 35, color: '#ff6900' },
      { name: 'GLM-5.3', logo: '/logos/glm.png', val: 42, color: '#1c7ff8' },
      { name: 'Grok 4.7', logo: '/logos/xai.svg', val: 55, color: '#736cd3' },
      { name: 'GPT-6 Astra', logo: '/logos/openai.svg', val: 72, color: '#1f1f1f' },
      { name: 'GPT-6.1 Sol', logo: '/logos/openai.svg', val: 85, color: '#1f1f1f' },
      { name: 'Claude Fable 5.1', logo: '/logos/claude.png', val: 110, color: '#cc785c' },
      { name: 'Claude Opus 5.5', logo: '/logos/claude.png', val: 160, color: '#cc785c' },
      { name: 'Gemini 4 Argon', logo: '/logos/google.svg', val: 326, color: '#34A853' },
    ],
  },
  {
    title: 'Coding',
    badge: 'Higher is better',
    color: '#10B981',
    subtitle: 'SWE-bench Verified',
    desc: 'Real software engineering tasks resolving GitHub issues from open source repos.',
    models: [
      { name: 'Claude Opus 5.5', logo: '/logos/claude.png', val: 94, color: '#cc785c' },
      { name: 'GPT-6 Astra', logo: '/logos/openai.svg', val: 89, color: '#1f1f1f' },
      { name: 'Claude Fable 5.1', logo: '/logos/claude.png', val: 85, color: '#cc785c' },
      { name: 'Gemini 4 Argon', logo: '/logos/google.svg', val: 82, color: '#34A853' },
      { name: 'DeepSeek V4.1', logo: '/logos/deepseek.svg', val: 79, color: '#2243e6' },
      { name: 'GPT-6.1 Sol', logo: '/logos/openai.svg', val: 75, color: '#1f1f1f' },
      { name: 'Grok 4.7', logo: '/logos/xai.svg', val: 68, color: '#736cd3' },
      { name: 'Muse Spark 1.3', logo: '/logos/meta.svg', val: 61, color: '#0089f4' },
      { name: 'GLM-5.3', logo: '/logos/glm.png', val: 58, color: '#1c7ff8' },
      { name: 'MiMo-V2.6-Pro', logo: '/logos/qwen.svg', val: 52, color: '#ff6900' },
    ],
  },
  {
    title: 'Reasoning',
    badge: 'Higher is better',
    color: '#EC4899',
    subtitle: 'GPQA Diamond',
    desc: 'Graduate-level scientific questions designed to be hard for non-experts or weak models.',
    models: [
      { name: 'GPT-6 Astra', logo: '/logos/openai.svg', val: 88, color: '#1f1f1f' },
      { name: 'Claude Opus 5.5', logo: '/logos/claude.png', val: 84, color: '#cc785c' },
      { name: 'GPT-6.1 Sol', logo: '/logos/openai.svg', val: 82, color: '#1f1f1f' },
      { name: 'Gemini 4 Argon', logo: '/logos/google.svg', val: 79, color: '#34A853' },
      { name: 'Claude Fable 5.1', logo: '/logos/claude.png', val: 75, color: '#cc785c' },
      { name: 'Grok 4.7', logo: '/logos/xai.svg', val: 71, color: '#736cd3' },
      { name: 'DeepSeek V4.1', logo: '/logos/deepseek.svg', val: 65, color: '#2243e6' },
      { name: 'GLM-5.3', logo: '/logos/glm.png', val: 62, color: '#1c7ff8' },
      { name: 'MiMo-V2.6-Pro', logo: '/logos/qwen.svg', val: 59, color: '#ff6900' },
      { name: 'Muse Spark 1.3', logo: '/logos/meta.svg', val: 56, color: '#0089f4' },
    ],
  },
  {
    title: 'Context Window',
    badge: 'Higher is better',
    color: '#06B6D4',
    subtitle: 'Max context tokens (K)',
    desc: 'Maximum usable context window, larger means handling longer documents and conversations.',
    models: [
      { name: 'Gemini 4 Argon', logo: '/logos/google.svg', val: 100, color: '#34A853' },
      { name: 'Claude Opus 5.5', logo: '/logos/claude.png', val: 96, color: '#cc785c' },
      { name: 'Claude Fable 5.1', logo: '/logos/claude.png', val: 90, color: '#cc785c' },
      { name: 'GPT-6 Astra', logo: '/logos/openai.svg', val: 85, color: '#1f1f1f' },
      { name: 'GPT-6.1 Sol', logo: '/logos/openai.svg', val: 80, color: '#1f1f1f' },
      { name: 'DeepSeek V4.1', logo: '/logos/deepseek.svg', val: 64, color: '#2243e6' },
      { name: 'Grok 4.7', logo: '/logos/xai.svg', val: 58, color: '#736cd3' },
      { name: 'GLM-5.3', logo: '/logos/glm.png', val: 55, color: '#1c7ff8' },
      { name: 'MiMo-V2.6-Pro', logo: '/logos/qwen.svg', val: 52, color: '#ff6900' },
      { name: 'Muse Spark 1.3', logo: '/logos/meta.svg', val: 48, color: '#0089f4' },
    ],
  },
];

const svgProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const METRIC_META: Record<string, { unit: string; prefix?: string; short: string; img: string; imgClass: string; icon: React.ReactNode }> = {
  Intelligence: {
    unit: '',
    short: 'Index score',
    img: 'https://framerusercontent.com/images/9hdDJMEED7CAsQAkY47FuHca90.png',
    imgClass: 'object-cover object-center',
    icon: (
      <svg {...svgProps}>
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z" />
      </svg>
    ),
  },
  Speed: {
    unit: '',
    short: 'Tokens / second',
    img: 'https://framerusercontent.com/images/rfk9A8RdGHQK29yaY6TQCS70C4.png',
    imgClass: 'object-cover object-center',
    icon: (
      <svg {...svgProps}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  'Cost per Task': {
    unit: '',
    prefix: '$',
    short: 'USD per task',
    img: '/card-bg.jpg',
    imgClass: 'object-cover object-center',
    icon: (
      <svg {...svgProps}>
        <line x1="12" y1="2" x2="12" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  Coding: {
    unit: '%',
    short: 'SWE-bench Verified',
    img: 'https://framerusercontent.com/images/9hdDJMEED7CAsQAkY47FuHca90.png',
    imgClass: 'object-cover object-bottom scale-[1.2] -scale-x-100',
    icon: (
      <svg {...svgProps}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  Reasoning: {
    unit: '%',
    short: 'GPQA Diamond',
    img: 'https://framerusercontent.com/images/rfk9A8RdGHQK29yaY6TQCS70C4.png',
    imgClass: 'object-cover object-right-top scale-[1.15] -scale-y-100',
    icon: (
      <svg {...svgProps}>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
  'Context Window': {
    unit: 'K',
    short: 'Max context tokens',
    img: '/card-bg.jpg',
    imgClass: 'object-cover object-left scale-[1.3] -scale-x-100',
    icon: (
      <svg {...svgProps}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 8h10" />
        <path d="M7 12h10" />
        <path d="M7 16h6" />
      </svg>
    ),
  },
};



const TESTIMONIALS = [
  {
    logo: '/logos/openai.svg',
    name: 'GPT-4o',
    author: 'OpenAI Evaluation Team',
    text: 'The dynamic nature of these evaluations helps us identify edge cases that our static datasets completely miss.',
    color: '#1f1f1f'
  },
  {
    logo: '/logos/claude.png',
    name: 'Claude 3.5 Sonnet',
    author: 'Anthropic Research',
    text: 'This suite has been instrumental in measuring the consistent reasoning capabilities of our models across complex, multi-step environments.',
    color: '#cc785c'
  },
  {
    logo: '/logos/gemini.svg',
    name: 'Gemini 1.5 Pro',
    author: 'Google DeepMind',
    text: 'An essential benchmark for evaluating long-context reasoning and strict instruction adherence under highly realistic constraints.',
    color: '#34A853'
  },
  {
    logo: '/logos/meta.svg',
    name: 'Llama 3 70B',
    author: 'Meta AI',
    text: 'The open-source community relies on rigorous, reproducible evaluation pipelines like this to drive the next generation of models.',
    color: '#0089f4'
  },
  {
    logo: '/logos/deepseek.svg',
    name: 'DeepSeek Coder',
    author: 'DeepSeek',
    text: 'Procedurally generated tasks finally give us a reliable metric for coding and logic without the risk of training data contamination.',
    color: '#2243e6'
  },
  {
    logo: '/logos/mistral.svg',
    name: 'Mistral Large',
    author: 'Mistral AI',
    text: 'A precise and highly transparent leaderboard that accurately reflects true model performance across diverse, challenging tasks.',
    color: '#f97316'
  },
  {
    logo: '/logos/xai.svg',
    name: 'Grok 1.5',
    author: 'xAI',
    text: 'The focus on fast, dynamic evaluation loops aligns perfectly with our need to accurately measure real-time reasoning.',
    color: '#736cd3'
  },
];

function FaqItem({ question, answer, index }: { question: string, answer: string, index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const bgPositions = [
    '0% 0%',
    '100% 20%',
    '50% 50%',
    '0% 80%',
    '100% 100%',
    '50% 10%',
  ];
  const bgPos = bgPositions[index % bgPositions.length];

  return (
    <div 
      className={`relative overflow-hidden group rounded-[12px] p-6 sm:p-8 flex flex-col cursor-pointer transition-all duration-300 border ${isOpen ? 'bg-[#F4E8DB] border-[#E8DCCF] shadow-[0_4px_24px_rgba(0,0,0,0.04)]' : 'bg-[#FCFAF8] border-[#EAEAEA] hover:border-[#E8DCCF] hover:bg-[#F9F4EE]'}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div 
        className="absolute top-0 left-0 bottom-0 w-[70%] pointer-events-none transition-opacity duration-300 mix-blend-multiply"
        style={{
          opacity: isOpen ? 0.35 : 0.2,
          backgroundImage: 'url("https://framerusercontent.com/images/vxKpL731AAcKW0pOFJDgCgp4.png")',
          backgroundSize: '200%',
          backgroundPosition: bgPos,
          maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        }}
      />
      <div className="relative z-10 flex items-center justify-between gap-4">
        <span className={`text-[16px] sm:text-[17px] font-medium text-left tracking-tight transition-colors ${isOpen ? 'text-[#111111]' : 'text-[#222222]'}`}>{question}</span>
        <div className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'bg-[#111111] text-white shadow-md' : 'bg-black/5 text-[#111111] group-hover:bg-black/10'}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            {isOpen ? (
              <line x1="5" y1="12" x2="19" y2="12"></line>
            ) : (
              <>
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </>
            )}
          </svg>
        </div>
      </div>
      <div 
        className={`relative z-10 grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] mt-4 sm:mt-5 opacity-100' : 'grid-rows-[0fr] mt-0 opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="text-[15px] text-[#555555] leading-relaxed text-left">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

const Reveal = ({ children, className = "", delay = 0, id }: { children: React.ReactNode, className?: string, delay?: number, id?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      });
    }, { rootMargin: '0px 0px -5% 0px' });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id={id}
      ref={domRef}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-[12px] translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function LandingPage() {
  const [logoIndex, setLogoIndex] = useState(0);
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

  useEffect(() => {
    const timer = setInterval(() => {
      setLogoIndex((prev) => (prev + 1) % AI_LOGOS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#171717] font-sans overflow-x-hidden selection:bg-[#EAEAEA]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-[#EAEAEA] h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center min-w-0 gap-2.5 hover:opacity-80 transition-opacity">
            <img src="/icon.png" alt="LLM Benchmark Icon" className="h-[32px] w-[32px] object-contain shrink-0" />
            <div className="flex flex-col text-[#1c1c1c] tracking-tighter font-semibold min-w-0 justify-center">
              <span className="text-[17px] leading-none whitespace-nowrap">llm</span>
              <span className="text-[17px] leading-none whitespace-nowrap -mt-0.5">benchmark</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/llm-race" className="group flex items-center gap-1.5 text-[13px] font-medium text-white bg-black/80 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-md hover:bg-black transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 750 750" fill="currentColor" className="opacity-90 group-hover:opacity-100 transition-opacity scale-[2.5] origin-center"><path d="M531.28,222.88c-1.5-13.26-1.51-29.69-13.08-38.57-15.93-9.99-35.84-9.58-53.65-5.76-19.19,3.95-36.56,13.31-54.23,21.41-26.18,11.67-53.12,21.68-81.01,28.38-21.64,5.39-43.15,12.42-65.43,14.56-5.25,.89-16.74-.5-26.38-.35-.09-2.54-.2-5.08-.32-7.62-.08-6.95,1.83-15.66-4.84-20.28-6.18-4.2-12.93,2.65-13.5,8.87-1.8,11.51-.79,23.16-.38,34.74,1.4,25.7,1.01,51.45,.89,77.18,.2,9.11,.64,18.22,1.04,27.33-8.89,3.83-9.6,20.46,.5,23.63,.08,0,.16,0,.24,0,.08,6.96,0,13.92-.39,20.88-2.3,39.77-7.31,79.46-4.8,119.36,1.64,10.92-.63,37.82,6.85,44.66,8.85,8.1,18.88-4.36,17.31-13.46-.58-6.2-.93-12.4-1.19-18.62-.64-21.48-.51-43.64-2.09-65.86-.49-4.23-.88-8.47-1.22-12.7,9.5,3.56,19.76,5.13,29.79,6.14,38.06,5.72,76.88,.47,111.55-16.47,18.3-7.86,35.13-19.41,54.63-24.27,16.06-4.19,32.76-3.96,49.1-1.76,13.42,1.5,25.88,7.18,39.1,9.4,16.45,2.38,12.63-20.02,12.8-30.44-.18-14.46,.97-28.88,2.25-43.27,4.55-45.77-1.52-91.44-3.54-137.14Zm-47.75,92.33c-8.39,.88-16.65,2.46-24.81,4.46-.18-5.52-.37-11.04-.61-16.56,.14-6.96,.36-13.91,.67-20.87,11.79-2.31,23.74-3.77,35.78-4.33,4.93-.24,9.88-.51,14.79-.05,1.79,.29,3.56,.78,5.3,1.21-.25,8.06-.8,16.11-1.52,24.11-.29,4.69-.53,9.39-.73,14.09-9.35-2.68-19.13-3.4-28.87-2.07Zm-110.24,29.93c-5.44,1.2-10.92,2.13-16.43,2.91,.12-10.74,.15-21.49,.47-32.23,.08-1.52,.17-3.04,.26-4.56,7.18-1.59,14.3-3.42,21.34-5.64,3.57-.84,7.11-1.78,10.63-2.76,.38,12.49,.61,24.97,.31,37.46-5.52,1.62-11.05,3.23-16.58,4.82Zm-31.46,90.51c-14.74,6.04-30.09,10.46-45.9,12.77-.11-1.73-.2-3.45-.11-5.13-.27-13.28-.28-24.97,.42-39.12,.59-8.58,.7-17.15,.56-25.72,14.18-1.51,28.47-2.5,42.59-4.5,.72,20.57,1.8,41.12,2.43,61.7Zm-104.69-83.9c.09-8.71,.24-17.43,.39-26.15,2.49,.13,4.99,.15,7.22,.45,10.54,.48,21.05-.21,31.52-1.41,.41,10.43,1.04,20.85,1.57,31.21-13.76,1.34-27.49,2.95-41.22,4.64,.17-2.91,.34-5.82,.52-8.73Zm76.62,1.33c-5.95,.31-11.89,.73-17.83,1.19-.49-9.98-1.06-19.96-1.35-29.95,.01-.72,.03-1.44,.04-2.16,3.22-.48,6.43-.98,9.64-1.46,11.57-1.99,23.19-3.73,34.75-5.77-.02,.57-.04,1.14-.06,1.71-.35,11.21-.36,22.41-.18,33.6-8.35,.88-16.71,1.7-25.01,2.85Zm50.37-103.63c1.07-3.26,1.13-6.44,.52-9.23,8.19-3.77,16.29-7.81,24.42-11.79-.01,.15-.02,.3-.03,.46-1.06,17.85-.7,35.69-.13,53.54-9.84,1.69-19.69,3.44-29.54,5.17,1.19-12.76,2.75-25.48,4.77-38.14Zm43.7,47.83c8.76-2.88,17.47-5.95,26.23-8.89,2.09-.63,4.2-1.23,6.31-1.81-.04,1.25-.07,2.51-.11,3.76-.51,11.48-.2,22.93,.63,34.35-4.58,1.42-9.13,2.92-13.66,4.45-6.4,1.95-12.81,3.88-19.23,5.81,.26-12.55,.02-25.11-.17-37.67Zm98.71-86.61h0c3.99,12.47,6.28,25.26,7.4,38.18-9.44-1.1-19.16,.81-28.45,2.6-8.65,2-17.06,4.77-25.36,7.86,1.04-14.17,2.46-28.31,4.32-42.39,.16-3.91,1.2-8.27,1.72-12.56,13.83-.76,27.87,.06,40.38,6.3Zm-60.39-4.01c-.25,1.63-.49,3.26-.72,4.89-2.84,18.32-3.84,36.81-4.47,55.32-10.95,4.42-21.93,8.78-33.26,12.05,0-.68,0-1.37,0-2.05,.14-19.25,.22-38.49,1.14-57.72,12.05-5.3,24.37-9.83,37.32-12.49Zm-116.56,45.71c4.96-1.25,9.83-2.34,15.06-3.99-2.78,13.98-3.98,28.25-4.7,42.54-14.84,2.47-29.71,4.71-44.62,6.41,.52-12.07,1.37-24.12,2.74-36.1,10.51-3.02,20.96-6.36,31.51-8.85Zm-78.25,16.42c9.08,.31,17.95-.76,26.72-2.53-1.47,10.9-2.1,21.9-2.22,32.94-12.59,.97-25.22,1.44-37.9,1.22,.14-10.68,.2-21.36,.12-32.04,4.43,.17,8.9,.15,13.28,.4Zm-15.81,176.33c-.3-.13-.59-.22-.87-.28-.8-19.49-.34-38.99,.57-58.49,14.75-.92,29.39-4.09,44.1-5.98,1.46,23.21,2.56,46.44,3.14,69.69-15.88,1.58-32.17,1.71-46.94-4.93Zm119.6-15.38c0-1.12,.02-2.23,.09-3.34-.19-12.82-.29-26.73,.29-40.84,.38-4.87,.64-9.74,.84-14.62,.84-.19,1.69-.37,2.53-.56,10.78-2.59,21.01-6.82,31.29-10.91,.49,12.61,1.32,25.2,1.65,37.81,.28,3.19,.56,9.37,1.37,15.31-12.91,5.3-25.52,11.58-38.07,17.14Zm51.32-22.14c-.12-.77-.23-1.55-.34-2.32-.76-6.6-.36-13.25-.3-19.87,0-10.76,.79-21.5,1.44-32.24,3.07-.99,6.16-1.9,9.31-2.65,8.7-2.21,17.45-4.33,26.32-5.62,.84,6.91,1.81,13.8,2.86,20.68,1.36,7.07,2.14,23,4.41,35.23-15.15-.92-29.63,2.04-43.7,6.79Zm58.38-4.74c-1.15-5.13-2.08-10.31-2.79-15.52-1.39-14.53-2.06-29.11-2.56-43.7,16.7-.67,33.91-1.99,49.76,3.73,.79,.25,1.68,.6,2.64,.98,.18,23.14,1.69,46.28,4.94,69.16-17.46-4.22-34.34-11.07-51.98-14.66Z"/></svg>
            LLM Race
          </Link>
          <Link to="/dashboard" className="text-[13px] font-medium text-[#111111] bg-[#EEEEEE]/80 backdrop-blur-xl border border-black/10 px-4 py-1.5 rounded-md hover:bg-[#E5E5E5]/90 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.05)]">Dashboard</Link>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="flex items-center justify-center hover:opacity-70 transition-opacity ml-1">
            <GithubIcon size={22} />
            {githubStars !== null && <span className="ml-1.5 text-[12.5px] font-medium text-[#111111]">{githubStars.toLocaleString()}</span>}
          </a>
        </div>
      </header>

      <main className="pt-10 pb-16">
        {/* Hero + dashboard preview */}
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-stretch gap-12 lg:gap-8 pt-8 lg:pt-12 pb-12 lg:pb-16">
            {/* Left side: text */}
            <Reveal delay={0} className="w-full lg:w-[48%] xl:w-[46%] text-left flex flex-col z-10 shrink-0 lg:py-4 xl:py-6">
              <div className="flex items-center gap-2.5 text-[14px] text-[#666666] mb-8">
                <span className="px-2 py-0.5 rounded-[4px] bg-[#EAEAEA] text-[#111111] text-[11px] font-semibold uppercase tracking-wider">New</span>
                <span className="hover:text-[#111111] transition-colors cursor-pointer">Interactive game loops are now live &rarr;</span>
              </div>

              <h1 className="text-[32px] sm:text-[36px] md:text-[40px] font-medium tracking-tight text-[#111111] leading-[1.1] mb-6 w-full max-w-[700px]">
                <span className="inline-block">The premier open source</span> <span className="inline-block">arena</span> <br className="hidden sm:block" />
                for evaluating LLMs.
              </h1>

              <p className="text-[16px] text-[#666666] leading-relaxed mb-10 max-w-[500px]">
                Stress-test the world's most capable models against interactive game loops, complex UI scenarios, and bespoke coding tasks.
              </p>

              <div className="flex items-center justify-start gap-3 mb-14">
                <Link to="/dashboard" className="px-5 py-2.5 rounded-full text-white text-[15px] font-medium transition-all flex items-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] bg-gradient-to-b from-[#333333]/90 to-[#111111]/90 backdrop-blur-xl hover:from-[#444444]/90 hover:to-[#222222]/90 border border-black/50">
                  Start Comparing
                  <div className="w-4 h-4 relative overflow-hidden flex items-center justify-center -mr-0.5">
                    {AI_LOGOS.map((logo, idx) => {
                      const distance = (idx - logoIndex + AI_LOGOS.length) % AI_LOGOS.length;
                      const isCurrent = distance === 0;
                      const isPrev = distance === AI_LOGOS.length - 1;
                      const isNext = distance === 1;

                      let translateClass = 'translate-y-full opacity-0';
                      if (isCurrent) translateClass = 'translate-y-0 opacity-100';
                      else if (isPrev) translateClass = '-translate-y-full opacity-0';

                      const transitionClass = isCurrent || isPrev || isNext ? 'transition-all duration-500 ease-in-out' : 'transition-none';
                      const filterClass = logo.includes('openai') || logo.includes('xai') || logo.includes('grok') ? 'filter invert brightness-0' : '';

                      return (
                        <img
                          key={logo}
                          src={logo}
                          alt="AI"
                          className={`absolute inset-0 w-full h-full object-contain ${transitionClass} ${filterClass} ${translateClass}`}
                        />
                      );
                    })}
                  </div>
                </Link>
                <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-full text-[#111111] text-[15px] font-medium transition-all flex items-center gap-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,1)] bg-[#EEEEEE]/80 backdrop-blur-2xl hover:bg-[#E5E5E5]/90 border border-black/10">
                  Contribute on GitHub
                  <GithubIcon size={16} />
                </a>
              </div>

              {/* AI Releases Changelog Card */}
              <div className="w-full max-w-[500px] bg-[#F4F4F6] rounded-[16px] flex flex-col h-[350px] mt-0 border border-[#EAEAEA] shadow-sm relative overflow-hidden">
                <style>{`
                  .timeline-scrollbar::-webkit-scrollbar {
                    width: 6px;
                  }
                  .timeline-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                  }
                  .timeline-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #D4D4D8;
                    border-radius: 10px;
                  }
                `}</style>
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-4 shrink-0">
                  <h3 className="text-[20px] font-medium tracking-tight text-[#111111]">AI Releases</h3>
                  <div className="flex items-center gap-4">
                    <div className="bg-[#111111] text-white p-1.5 rounded-[4px] cursor-pointer hover:bg-[#333333] transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </div>
                  </div>
                </div>
                
                {/* Scrollable Timeline */}
                <div className="px-6 pb-6 pt-2 overflow-y-auto timeline-scrollbar flex-1 relative">
                  <div className="flex flex-col gap-6 relative z-10">
                    {/* Vertical line spans the inner content height */}
                    <div className="absolute left-[3px] top-[8px] bottom-[8px] w-[2px] bg-[#EAEAEA] -z-10"></div>
                    
                    {AI_RELEASES.map((release, idx) => (
                      <div key={idx} className="relative pl-7">
                        <div className="absolute left-[-1px] top-[4px] w-2.5 h-2.5 rounded-full bg-[#111111] ring-[4px] ring-[#F4F4F6]"></div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          {release.providerIcon && <img src={release.providerIcon} className="w-[15px] h-[15px] object-contain" alt="" />}
                          <p className="text-[14.5px] font-medium text-[#111111] leading-none">{release.label} <span className="text-[#888888] font-normal text-[13px] ml-1">· {release.date}</span></p>
                        </div>
                        <div className="flex flex-col gap-1.5 pl-[21px]">
                          {release.models.map((m, mIdx) => (
                            <div key={mIdx} className="flex items-start gap-2">
                              {m.icon && <img src={m.icon} className="w-[13px] h-[13px] mt-[1.5px] object-contain shrink-0" alt="" />}
                              <p className="text-[13px] text-[#666666] leading-snug">{m.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right side: dashboard UI bleeding off screen */}
            <Reveal id="dashboard" delay={150} className="w-full lg:w-[60%] xl:w-[65%] relative -mr-4 sm:-mr-6 lg:-mr-16 xl:-mr-32 2xl:-mr-48 shrink-0 flex justify-end">
              <div
                className="w-[calc(100%+1rem)] sm:w-[calc(100%+1.5rem)] lg:w-[120%] xl:w-[130%] relative py-8 sm:py-10 lg:py-12 flex items-center justify-start lg:justify-center bg-cover bg-center border border-[#EAEAEA] border-r-0 rounded-l-[8px] lg:rounded-l-[16px] rounded-r-none shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden"
                style={{ backgroundImage: 'url("https://framerusercontent.com/images/9hdDJMEED7CAsQAkY47FuHca90.png")' }}
              >
                {/* Glassy border container */}
                <div className="w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] md:max-w-[1000px] bg-white/30 backdrop-blur-[24px] p-3 sm:p-4 rounded-lg lg:rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/50 relative z-10 overflow-hidden ml-4 sm:ml-8 lg:ml-8 xl:ml-12 2xl:ml-16">
                  
                  {/* Inner dashboard window */}
                  <div className="w-full rounded-[12px] overflow-hidden border border-white/60 shadow-[0_8px_32px_rgb(0,0,0,0.08)] bg-[#FCFAF8] flex flex-col relative">
                    {/* Window controls */}
                    <div className="h-10 bg-[#FCFAF8] border-b border-[#EAEAEA] flex items-center px-4 gap-2 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5]"></div>
                    </div>

                    {/* Dashboard table */}
                    <div className="w-full relative p-0 overflow-x-auto no-scrollbar">
                      <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="border-b border-[#EAEAEA] bg-[#FCFAF8]">
                          <th className="py-3 px-6 text-[11px] font-medium text-[#888888] uppercase tracking-wider border-r border-[#EAEAEA]">Rank</th>
                          <th className="py-3 px-6 text-[11px] font-medium text-[#888888] uppercase tracking-wider border-r border-[#EAEAEA]">Model</th>
                          <th className="py-3 px-6 text-[11px] font-medium text-[#888888] uppercase tracking-wider border-r border-[#EAEAEA]">Overall Score</th>
                          <th className="py-3 px-6 text-[11px] font-medium text-[#888888] uppercase tracking-wider border-r border-[#EAEAEA]">Coding</th>
                          <th className="py-3 px-6 text-[11px] font-medium text-[#888888] uppercase tracking-wider border-r border-[#EAEAEA]">Reasoning</th>
                          <th className="py-3 px-6 text-[11px] font-medium text-[#888888] uppercase tracking-wider text-left">Price (1M in/out)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EAEAEA] bg-[#FCFAF8]">
                        {TOP_MODELS.map((model) => (
                          <tr key={model.rank}>
                            <td className="py-3 px-6 border-r border-[#E8DCCF]">
                              <span className="text-[12px] text-[#888888] pl-2">{model.rank}</span>
                            </td>
                            <td className="py-3 px-6 border-r border-[#EAEAEA]">
                              <div className="flex items-center gap-2.5">
                                <img src={model.logo} alt={model.org} className="w-[14px] h-[14px] object-contain transition-all" />
                                <div className="flex flex-col">
                                  <span className="text-[13px] text-[#111111]">{model.name}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-6 border-r border-[#EAEAEA]">
                              <span className="text-[13px] text-[#111111] font-medium">{model.score}</span>
                            </td>
                            <td className="py-3 px-6 text-[13px] text-[#666666] border-r border-[#EAEAEA]">{model.coding}</td>
                            <td className="py-3 px-6 text-[13px] text-[#666666] border-r border-[#EAEAEA]">{model.reasoning}</td>
                            <td className="py-3 px-6 text-[12px] text-[#888888] text-left tabular-nums">{model.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Trusted By Static Grid */}
        <div className="w-full relative mt-8 mb-32 px-4 sm:px-6 lg:px-8">
          <Reveal delay={0} className="w-full text-center mb-8">
            <p className="text-[14px] text-[#888888] font-medium tracking-tight">Evaluating the most capable models from world-class AI labs</p>
          </Reveal>
          <div className="max-w-[1200px] mx-auto grid grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {Array.from({ length: 8 }).map((_, i) => {
              const currentLogo = TRUSTED_LOGOS[(logoIndex + i * 2) % TRUSTED_LOGOS.length];
              return (
                <div key={i} className="w-full aspect-[2/1] sm:aspect-auto sm:h-[75px] bg-[#F8F7F4] rounded-[8px] flex items-center justify-center relative overflow-hidden">
                  {TRUSTED_LOGOS.map((logo, logoI) => {
                    const isCurrent = logo === currentLogo;
                    const isChatGpt = logo.includes('openai');
                    return (
                      <div key={logoI} className={`absolute inset-0 flex items-center justify-center transition-all duration-[1200ms] ease-in-out ${isCurrent ? 'opacity-80 blur-none scale-100' : 'opacity-0 blur-[8px] scale-90 pointer-events-none'}`}>
                        <img 
                          src={logo} 
                          alt="Partner Logo" 
                          className={`max-w-[80%] max-h-[50%] sm:max-w-[110px] sm:max-h-[34px] object-contain rounded-[6px] ${isChatGpt ? 'scale-150' : ''}`} 
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Metric cards section */}
        <div id="llm-race" className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <Reveal delay={0} className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-16 mb-16">
            <h2 className="text-[40px] sm:text-[48px] md:text-[56px] font-medium tracking-tight text-[#111111] leading-[1.05] shrink-0 whitespace-nowrap">
              Find the best model for you.
            </h2>
            <p className="text-[15px] text-[#666666] max-w-[500px] leading-relaxed mb-2">
              Compare models across performance, speed, reasoning, and cost to discover which one is the absolute best fit for your specific needs.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
            {METRIC_CARDS.map((card, i) => {
              const meta = METRIC_META[card.title];
              const maxVal = Math.max(...card.models.map((m) => m.val));
              return (
                <Reveal key={i} delay={(i % 3) * 100} className="flex flex-col">
                  {/* Image container */}
                  <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-6 bg-[#F5F5F5] relative shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#EAEAEA]">
                    <img
                      src={meta.img}
                      alt={card.title}
                      className={`absolute inset-0 w-full h-full opacity-90 ${meta.imgClass}`}
                    />

                    {/* Chart panel */}
                    <div className="absolute inset-6 sm:inset-8 bg-white/95 backdrop-blur-xl rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-white/80 p-4 flex flex-col">

                      <div className="flex-1 rounded-[12px] bg-transparent flex flex-col justify-end">
                        <div className="flex-1 relative w-full flex items-end justify-between px-3 pb-8 pt-10 mt-1">
                          {/* Grid lines */}
                          <div className="absolute inset-x-0 top-10 bottom-8 flex flex-col justify-between pointer-events-none z-0">
                            {[1, 2, 3, 4, 5].map(line => (
                              <div key={line} className="w-full border-t border-dashed border-[#cccccc]"></div>
                            ))}
                          </div>

                          {/* Bars */}
                          {card.models.map((model, mi) => {
                            const heightPct = Math.max((model.val / maxVal) * 100, 4);
                            return (
                              <div key={mi} className="relative flex flex-col items-center justify-end h-full z-10 hover:z-[100] w-[8%] max-w-[32px] group/bar cursor-pointer">
                                {/* Bar */}
                                <div
                                  className="w-full rounded-t-[4px] relative flex flex-col items-center transition-opacity duration-200 group-hover/bar:opacity-80"
                                  style={{ height: `${heightPct}%`, backgroundColor: model.color || '#333333' }}
                                >
                                  {/* Hover tooltip */}
                                  <div className="absolute bottom-full mb-2 bg-white border border-[#E8DCCF] shadow-[0_4px_12px_rgba(0,0,0,0.15)] rounded p-2.5 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200 pointer-events-none z-50 flex items-center gap-2.5 min-w-max left-1/2 -translate-x-1/2">
                                    <img src={model.logo} alt="" className="w-[18px] h-[18px] object-contain" />
                                    <div className="flex flex-col items-start gap-1">
                                      <span className="text-[12px] text-[#111111] leading-none font-medium">{model.name}</span>
                                      <span className="text-[13px] font-semibold text-[#111111] leading-none">{meta.prefix ?? ''}{model.val}{meta.unit}</span>
                                    </div>
                                  </div>

                                  <span className={`text-[11px] font-semibold absolute pointer-events-none tracking-tight flex items-center justify-center w-full ${heightPct < 15 ? 'bottom-full mb-1 text-[#666666]' : 'top-1.5 text-white/95'}`}>
                                    {meta.prefix ?? ''}{model.val}
                                  </span>
                                </div>

                                {/* Logo (Original color) */}
                                <div className="absolute -bottom-7 w-[18px] h-[18px] flex justify-center left-1/2 -translate-x-1/2 pointer-events-none">
                                  <img src={model.logo} alt="" className="w-full h-full object-contain" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Subtle inner overlay */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[24px] pointer-events-none z-10"></div>
                  </div>
                  
                  {/* Text content */}
                  <div className="px-2">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <h3 className="text-[22px] font-medium text-[#111111] leading-snug tracking-tight">{card.title}</h3>
                      <span className="px-2 py-0.5 rounded-[4px] bg-[#EAEAEA] text-[#111111] text-[11px] font-medium">{card.badge}</span>
                    </div>
                    <p className="text-[12.5px] text-[#888888] mb-2.5">{card.subtitle}</p>
                    <p className="text-[15.5px] text-[#666666] leading-relaxed pr-4">{card.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>


      </main>

      {/* Testimonials */}
      <section className="bg-[#FCFAF8] pt-12 pb-4">
        {/* Testimonials */}
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative">
          <Reveal delay={0} className="flex flex-col items-start gap-4 mb-12">
            <h2 className="text-[40px] sm:text-[48px] md:text-[56px] font-medium tracking-tight text-[#111111] leading-[1.05] max-w-[600px]">
              Notes from the frontier.
            </h2>
          </Reveal>

          <div className="relative w-full overflow-hidden" style={{ maxHeight: '550px' }}>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 pb-20">
              {TESTIMONIALS.map((card, i) => (
                <Reveal key={i} delay={(i % 3) * 100} className="break-inside-avoid inline-block w-full">
                  <div className="bg-[#F8F7F4] rounded-[16px] p-8 flex flex-col border border-black/5 shadow-sm h-full">
                    <div className="flex items-center gap-2 mb-6">
                      <img src={card.logo} alt={card.name} className="w-[18px] h-[18px] object-contain" />
                      <span className="text-[14px] font-medium text-[#666666] tracking-tight">{card.name}</span>
                    </div>
                    <p className="text-[17px] text-[#111111] leading-relaxed mb-10 tracking-tight">"{card.text}"</p>
                    <div className="mt-auto flex flex-col">
                      <span className="text-[13px] text-[#888888]">{card.author}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Fade-out gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-[280px] bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent pointer-events-none"></div>
          </div>

          <Reveal delay={200} className="flex justify-center mt-[-60px] relative z-10">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-8 py-3.5 rounded-[8px] text-white text-[15px] font-medium transition-all shadow-[0_4px_14px_rgba(0,0,0,0.1),inset_0_1px_0px_rgba(255,255,255,0.15)] bg-gradient-to-b from-[#333333] to-[#111111] hover:from-[#444444] hover:to-[#222222] border border-[#111111]">
              <GithubIcon className="w-[18px] h-[18px] opacity-90" />
              Contribute
            </a>
          </Reveal>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="bg-[#FCFAF8] pt-12 pb-24">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal delay={0} className="mb-14 text-left">
            <h2 className="text-[40px] md:text-[52px] font-sans font-medium leading-[1.05] text-[#111111] tracking-tight">
              You have questions.<br />We have answers.
            </h2>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
            {[
              { q: "How is LLM Benchmark different from other leaderboards?", a: "Our arena uses procedurally generated game loops and dynamic environments rather than static test sets. This prevents test set contamination and provides a true measure of reasoning." },
              { q: "How often are the rankings updated?", a: "Rankings are updated continuously as new models are released and evaluated against our dynamic benchmark suite." },
              { q: "Which models are currently supported?", a: "We track and evaluate the most capable frontier models from providers like OpenAI, Anthropic, Google, Meta, and leading open-source models." },
              { q: "How is the 'Cost per Task' calculated?", a: "Cost is calculated as a weighted average of API costs based on the token usage across all evaluation tasks in our intelligence index." },
              { q: "Can I submit a new model for evaluation?", a: "Yes! As an open-source project, you can submit pull requests to add new models or suggest new evaluation environments on our GitHub repository." },
              { q: "Are the evaluation environments open-source?", a: "All of our evaluation code, environments, and methodologies are 100% open-source. We encourage the community to audit and contribute to our metrics." }
            ].map((item, i) => (
              <Reveal key={i} delay={(i % 2) * 100}>
                <FaqItem question={item.q} answer={item.a} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F8F7F4] pt-16 pb-12 border-t border-[#EAEAEA]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 mb-4 relative pb-16">
            {/* Logo and description */}
            <div className="col-span-1 lg:col-span-2 pr-8">
              <div className="flex items-center min-w-0 gap-3 mb-6 opacity-90">
                <img src="/icon.png" alt="LLM Benchmark Icon" className="h-[48px] w-[48px] object-contain shrink-0 grayscale" />
                <div className="flex flex-col text-[#1c1c1c] tracking-tighter font-semibold min-w-0 justify-center">
                  <span className="text-[20px] leading-none whitespace-nowrap">llm</span>
                  <span className="text-[20px] leading-none whitespace-nowrap -mt-[2px]">benchmark</span>
                </div>
              </div>
              <div className="mb-6">
                <a
                  href="https://www.studio1hq.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#666666] transition-colors hover:text-[#171717] group/studio"
                >
                  An open-source project by Studio1
                  <svg viewBox="0 0 160 160" className="w-[14px] h-[14px] fill-current text-[#FF7E1D]">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 35C0 16.6807 14.0744 1.64844 32 0.126953V141H51.0523C52.4308 137.344 54.7446 133.689 57.9938 130.033C61.1446 126.508 64.6892 123.44 68.6277 120.829C72.5662 118.349 76.3569 116.782 80 116.129V86.7544C75.4708 87.9292 71.3846 89.6919 67.7415 92.0415C64 94.5225 60.7508 97.46 57.9938 100.854C56.5345 102.72 55.2545 104.659 54.1539 106.671V0H125C144.33 0 160 15.6699 160 35V125C160 144.33 144.33 160 125 160H124V18H104.948C103.569 21.6816 101.255 25.3628 98.0062 29.0444C94.8554 32.5942 91.3108 35.6841 87.3723 38.314C83.4338 40.812 79.6431 42.3896 76 43.0474V72.6304C80.5292 71.4473 84.6154 69.6724 88.2585 67.3057C92 64.8076 95.2492 61.8491 98.0062 58.4307C99.4655 56.5513 100.745 54.5986 101.846 52.5723V160H35C15.67 160 0 144.33 0 125V35Z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Links */}
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
                  <li><a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-[#111111] transition-colors">GitHub</a></li>
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
        </div>
      </footer>
    </div>
  );
}
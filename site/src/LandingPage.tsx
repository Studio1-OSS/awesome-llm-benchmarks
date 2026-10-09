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
  '/logos/antigravity.jpg',
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

const GithubIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
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
            <img src="/icon.png" alt="LLM Arena Icon" className="h-[32px] w-[32px] object-contain shrink-0" />
            <div className="flex flex-col text-[#1c1c1c] tracking-tighter font-semibold min-w-0 justify-center">
              <span className="text-[17px] leading-none whitespace-nowrap">llm</span>
              <span className="text-[17px] leading-none whitespace-nowrap -mt-0.5">benchmark</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-[13px] font-medium text-white bg-black/80 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-md hover:bg-black transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)]">LLM Race</Link>
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
                              <div key={mi} className="relative flex flex-col items-center justify-end h-full z-10 w-[8%] max-w-[32px] group/bar cursor-pointer">
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
              <img src="/logos/github.svg" alt="" className="w-[18px] h-[18px] invert opacity-90" />
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
                <img src="/icon.png" alt="LLM Arena Icon" className="h-[48px] w-[48px] object-contain shrink-0 grayscale" />
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
                  <li><Link to="/" className="hover:text-[#111111] transition-colors">Benchmarks</Link></li>
                  <li><Link to="/" className="hover:text-[#111111] transition-colors">Methodologies</Link></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[15px] text-[#111111] mb-6">Company</h4>
                <ul className="space-y-3.5 text-[14px] text-[#666666]">
                  <li><Link to="/" className="hover:text-[#111111] transition-colors">About</Link></li>
                  <li><Link to="/" className="hover:text-[#111111] transition-colors">Contributors</Link></li>
                  <li><a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-[#111111] transition-colors">GitHub</a></li>
                  <li><Link to="/blog" className="hover:text-[#111111] transition-colors">Blog</Link></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[15px] text-[#111111] mb-6">Resources</h4>
                <ul className="space-y-3.5 text-[14px] text-[#666666]">
                  <li><Link to="/" className="hover:text-[#111111] transition-colors">Documentation</Link></li>
                  <li><Link to="/" className="hover:text-[#111111] transition-colors">Updates</Link></li>
                  <li><Link to="/" className="hover:text-[#111111] transition-colors">FAQ</Link></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[15px] text-[#111111] mb-6">Legal</h4>
                <ul className="space-y-3.5 text-[14px] text-[#666666]">
                  <li><Link to="/" className="hover:text-[#111111] transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/" className="hover:text-[#111111] transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
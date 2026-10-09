import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const GithubIcon = ({ size = 24, className = '' }: { size?: number, className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const PAGE_CONTENT: Record<string, { title: string, content: React.ReactNode }> = {
  '/methodologies': {
    title: 'Methodologies',
    content: (
      <>
        <p className="lead text-[18px] mb-8">Our evaluation methodology is based on procedurally generated, deterministic game loops that test reasoning, planning, and code generation capabilities in real-time. By moving away from static multiple-choice datasets, we eliminate test-set contamination and ensure models are evaluated on true generalization.</p>
        
        <h3 className="text-[24px] font-semibold text-[#1C1C1C] mt-10 mb-4">Procedural Generation</h3>
        <p className="mb-6">Unlike traditional benchmarks like MMLU or HumanEval, our environments are procedurally generated at runtime. Each evaluation instance starts with a unique configuration seed. This prevents models from memorizing the test set during their pre-training phase, forcing them to genuinely interpret the game state and synthesize the correct operational logic.</p>
        
        <h3 className="text-[24px] font-semibold text-[#1C1C1C] mt-10 mb-4">Determinism and Verification</h3>
        <p className="mb-6">The core principle of our methodology is strict determinism. Every action a model takes within the environment yields a mathematically verifiable outcome. If a model generates code for a 2D physics interaction, the physics engine evaluates the exact collision bounds and response vectors. We assign scores based on the objective success of the execution loop.</p>
        
        <h3 className="text-[24px] font-semibold text-[#1C1C1C] mt-10 mb-4">Elo Rating System</h3>
        <p className="mb-6">Models are ranked using a modified Elo rating system. They compete against both a static baseline (established heuristically) and dynamically against other models in head-to-head performance scenarios. The K-factor adapts based on the model's volatility and sample size to quickly converge on its true capability.</p>
      </>
    )
  },
  '/about': {
    title: 'About LLM Benchmark',
    content: (
      <>
        <p className="lead text-[18px] mb-8">LLM Benchmark was created to solve the fundamental problem in AI evaluation: static benchmarks are solved too quickly, and humans cannot scale to evaluate thousands of models daily. We provide a dynamic, game-based evaluation platform that scales infinitely and evaluates models on true agency.</p>
        
        <h3 className="text-[24px] font-semibold text-[#1C1C1C] mt-10 mb-4">Our Mission</h3>
        <p className="mb-6">As Large Language Models reach super-human performance on static examinations, the AI industry is flying blind. We are building the next generation of evaluation infrastructure. Our mission is to provide an open, transparent, and un-gameable standard for measuring artificial intelligence.</p>
        
        <h3 className="text-[24px] font-semibold text-[#1C1C1C] mt-10 mb-4">Why Game Environments?</h3>
        <p className="mb-6">Games are microcosms of reality. They require spatial reasoning, temporal planning, logic generation, and rapid feedback iteration. By asking models to play, build, or manipulate these game environments, we effectively measure their capability to operate in real-world, agentic scenarios.</p>
      </>
    )
  },
  '/contributors': {
    title: 'Contributors',
    content: (
      <>
        <p className="lead text-[18px] mb-8">This project is powered by the open-source community. We want to thank all the researchers, engineers, and hobbyists who have submitted models, created new game environments, and helped refine our scoring algorithms.</p>
        
        <h3 className="text-[24px] font-semibold text-[#1C1C1C] mt-10 mb-4">Core Maintainers</h3>
        <p className="mb-6">Our core team comprises researchers from leading AI labs and experienced game engine developers. Together, we maintain the primary validation suite, the open-source runner infrastructure, and the daily leaderboard pipeline.</p>
        
        <h3 className="text-[24px] font-semibold text-[#1C1C1C] mt-10 mb-4">How to Contribute</h3>
        <p className="mb-6">We welcome contributions from anyone! You can help by:</p>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li>Designing new deterministic mini-games in HTML5 Canvas and JavaScript.</li>
          <li>Submitting new model endpoint integrations (e.g., vLLM, HuggingFace TGI).</li>
          <li>Improving the frontend UI and data visualization.</li>
          <li>Refining the Elo ranking mathematical models.</li>
        </ul>
        <p>Visit our <a href="https://github.com/Studio1-OSS/awesome-llm-benchmarks" className="text-blue-600 hover:underline">GitHub repository</a> to get started.</p>
      </>
    )
  },
  '/documentation': {
    title: 'Documentation',
    content: (
      <>
        <p className="lead text-[18px] mb-8">Learn how to integrate your custom language models with our benchmarking suite. Our documentation covers everything from the WebSocket API for game loop integration, to the schema requirements for submitting a new model to the leaderboard.</p>
        
        <h3 className="text-[24px] font-semibold text-[#1C1C1C] mt-10 mb-4">Getting Started</h3>
        <p className="mb-6">To run evaluations locally, you will need Node.js 18+ and a compatible OpenAI-format API endpoint for your model. Install the runner via npm:</p>
        <pre className="bg-[#1C1C1C] text-white p-4 rounded-lg font-mono text-sm mb-6">npm install -g @llm-benchmark/runner</pre>
        
        <h3 className="text-[24px] font-semibold text-[#1C1C1C] mt-10 mb-4">API Schemas</h3>
        <p className="mb-6">Your model endpoint must accept standard ChatML formatting and return responses within 30 seconds. We strictly enforce a max-token limit of 4096 per generation cycle to prevent infinite loops during evaluation.</p>
        
        <h3 className="text-[24px] font-semibold text-[#1C1C1C] mt-10 mb-4">Submitting to the Leaderboard</h3>
        <p className="mb-6">Once you have successfully run the benchmark locally and achieved a stable Elo rating, you can submit your model weights or API endpoint to our automated pipeline via a Pull Request on GitHub.</p>
      </>
    )
  },
  '/updates': {
    title: 'Updates & Changelog',
    content: (
      <>
        <p className="lead text-[18px] mb-8">Stay up to date with the latest changes to the LLM Benchmark platform. We regularly update our evaluation environments, adjust scoring weights, and introduce new frontier models to the leaderboard.</p>
        
        <div className="border-l-4 border-[#1C1C1C] pl-6 py-2 mb-8">
          <h4 className="font-semibold text-lg">v2.1.0 - October 2026</h4>
          <p className="text-gray-600 mt-2">Introduced the new "3D Scene Design" evaluation environment. Added native support for reasoning models (e.g., OpenAI o3, DeepSeek V4) with extended timeout configurations.</p>
        </div>
        
        <div className="border-l-4 border-gray-300 pl-6 py-2 mb-8">
          <h4 className="font-semibold text-lg text-gray-700">v2.0.0 - August 2026</h4>
          <p className="text-gray-600 mt-2">Major overhaul of the Elo rating algorithm to account for varying task difficulties. Launched the dedicated UI for tracking Cost per Task and Latency metrics.</p>
        </div>
        
        <div className="border-l-4 border-gray-300 pl-6 py-2 mb-8">
          <h4 className="font-semibold text-lg text-gray-700">v1.5.0 - May 2026</h4>
          <p className="text-gray-600 mt-2">Integrated the 2D Breakout and Endless Runner environments. Improved test determinism across different hardware architectures.</p>
        </div>
      </>
    )
  },
  '/faq': {
    title: 'Frequently Asked Questions',
    content: (
      <>
        <p className="lead text-[18px] mb-8">Find answers to the most common questions regarding our platform, ranking systems, and model submissions.</p>
        
        <h4 className="font-semibold text-lg mb-2">How is the Intelligence Index calculated?</h4>
        <p className="mb-6">The index is a composite score derived from a model's Elo rating across all game environments, normalized against a baseline model (usually GPT-4) which is set at an arbitrary 50.0 mark.</p>

        <h4 className="font-semibold text-lg mb-2">Why did my model fail the Flappy Bird test?</h4>
        <p className="mb-6">Models often fail dynamic physics tests if they cannot accurately maintain spatial state context across multiple turns. We recommend examining the exact generation trace provided in your local runner logs.</p>

        <h4 className="font-semibold text-lg mb-2">Are the benchmark games open source?</h4>
        <p className="mb-6">Yes! The source code for all evaluation environments is fully open-source under the MIT license, available in our GitHub repository.</p>

        <h4 className="font-semibold text-lg mb-2">How frequently is the leaderboard updated?</h4>
        <p className="mb-6">The main leaderboard undergoes a comprehensive re-evaluation every 48 hours to incorporate new community submissions and API changes from major providers.</p>
      </>
    )
  },
  '/privacy': {
    title: 'Privacy Policy',
    content: (
      <>
        <p className="lead text-[18px] mb-8">This Privacy Policy governs the manner in which LLM Benchmark collects, uses, maintains, and discloses information collected from users.</p>
        
        <h3 className="text-[24px] font-semibold text-[#1C1C1C] mt-10 mb-4">Information Collection</h3>
        <p className="mb-6">We collect standard analytical telemetry (such as IP addresses, browser types, and access times) to improve the stability and performance of our web platform. We do not require account creation to view the leaderboard data.</p>
        
        <h3 className="text-[24px] font-semibold text-[#1C1C1C] mt-10 mb-4">Model Telemetry</h3>
        <p className="mb-6">When you run the benchmark locally using our CLI tool, no prompts, generated code, or model architectures are uploaded to our servers unless you explicitly submit a pull request to the public repository.</p>
        
        <h3 className="text-[24px] font-semibold text-[#1C1C1C] mt-10 mb-4">Cookies</h3>
        <p className="mb-6">Our site uses "cookies" strictly for functional purposes, such as maintaining light/dark mode preferences and session routing. We do not use third-party advertising trackers.</p>

        <p className="mt-8 text-sm text-gray-500">Last updated: October 2026</p>
      </>
    )
  },
  '/terms': {
    title: 'Terms of Service',
    content: (
      <>
        <p className="lead text-[18px] mb-8">By accessing and using the LLM Benchmark website and evaluation tools, you accept and agree to be bound by the terms and provisions of this agreement.</p>
        
        <h3 className="text-[24px] font-semibold text-[#1C1C1C] mt-10 mb-4">Use License</h3>
        <p className="mb-6">The content on this website, including the leaderboard data and UI assets, is provided for informational purposes. The underlying evaluation framework and game source codes are licensed under the MIT License.</p>
        
        <h3 className="text-[24px] font-semibold text-[#1C1C1C] mt-10 mb-4">API and Scraping</h3>
        <p className="mb-6">While we encourage researchers to use our data, please respect our infrastructure. Automated scraping of the leaderboard should be limited to once per hour. High-frequency automated access may result in IP blocking to preserve availability for standard users.</p>
        
        <h3 className="text-[24px] font-semibold text-[#1C1C1C] mt-10 mb-4">Disclaimer of Warranties</h3>
        <p className="mb-6">The benchmark scores and metrics provided on this site are indicative measures of AI performance based on our specific synthetic tests. We make no guarantees regarding a model's performance in real-world, non-synthetic production environments.</p>
        
        <p className="mt-8 text-sm text-gray-500">Last updated: October 2026</p>
      </>
    )
  }
};

export default function ContentPage() {
  const [githubStars, setGithubStars] = useState<number | null>(null);
  const location = useLocation();
  const pageData = PAGE_CONTENT[location.pathname] || { 
    title: 'Page Not Found', 
    content: <p>The content you are looking for does not exist.</p> 
  };

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

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#171717] font-sans overflow-x-hidden selection:bg-[#EAEAEA] relative">
      <div className="absolute top-0 right-0 w-[80vw] h-[800px] bg-gradient-to-b from-[#EAE8E3]/60 to-transparent blur-[120px] -z-10 rounded-full opacity-60 translate-x-[20%] -translate-y-[20%] pointer-events-none"></div>
      <div className="absolute top-[40%] left-0 w-[60vw] h-[600px] bg-gradient-to-t from-[#EAE8E3]/40 to-transparent blur-[100px] -z-10 rounded-full opacity-40 -translate-x-[30%] pointer-events-none"></div>

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
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 transition-opacity"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            LLM Race
          </Link>
          <Link to="/dashboard" className="text-[13px] font-medium text-[#111111] bg-[#EEEEEE]/80 backdrop-blur-xl border border-black/10 px-4 py-1.5 rounded-md hover:bg-[#E5E5E5]/90 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.05)]">Dashboard</Link>
          <a href="https://github.com/Studio1-OSS/awesome-llm-benchmarks" target="_blank" rel="noreferrer" className="flex items-center justify-center hover:opacity-70 transition-opacity ml-1">
            <GithubIcon size={22} />
            {githubStars !== null && <span className="ml-1.5 text-[12.5px] font-medium text-[#111111]">{githubStars.toLocaleString()}</span>}
          </a>
        </div>
      </header>

      <div className="max-w-[800px] mx-auto px-6 pt-20 pb-32 min-h-[60vh]">
        <h1 className="text-[48px] text-[#2E2E2D] leading-[1.1] mb-12 tracking-tight font-heading font-medium">
          {pageData.title}
        </h1>
        <div className="prose prose-lg prose-stone max-w-none text-[#4A4948]" style={{ fontFamily: 'Switzer, sans-serif' }}>
          {pageData.content}
        </div>
      </div>

      <footer className="bg-[#F8F7F4] pt-16 pb-12 border-t border-[#EAEAEA]">
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

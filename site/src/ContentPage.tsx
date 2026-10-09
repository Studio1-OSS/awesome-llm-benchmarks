import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const GithubIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
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
        <p className="mb-6">To run evaluations locally, you will need Node.js 18+ and a compatible OpenAI-format API endpoint for your model. Clone the repository to access the latest local runner scripts (currently in development):</p>
        <pre className="bg-[#1C1C1C] text-white p-4 rounded-lg font-mono text-sm mb-6 selectable-text">git clone https://github.com/Studio1-OSS/awesome-llm-benchmarks.git</pre>
        
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
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 180 750 400" fill="currentColor" className="opacity-90 group-hover:opacity-100 transition-all scale-[1.3] origin-center"><path d="M531.28,222.88c-1.5-13.26-1.51-29.69-13.08-38.57-15.93-9.99-35.84-9.58-53.65-5.76-19.19,3.95-36.56,13.31-54.23,21.41-26.18,11.67-53.12,21.68-81.01,28.38-21.64,5.39-43.15,12.42-65.43,14.56-5.25,.89-16.74-.5-26.38-.35-.09-2.54-.2-5.08-.32-7.62-.08-6.95,1.83-15.66-4.84-20.28-6.18-4.2-12.93,2.65-13.5,8.87-1.8,11.51-.79,23.16-.38,34.74,1.4,25.7,1.01,51.45,.89,77.18,.2,9.11,.64,18.22,1.04,27.33-8.89,3.83-9.6,20.46,.5,23.63,.08,0,.16,0,.24,0,.08,6.96,0,13.92-.39,20.88-2.3,39.77-7.31,79.46-4.8,119.36,1.64,10.92-.63,37.82,6.85,44.66,8.85,8.1,18.88-4.36,17.31-13.46-.58-6.2-.93-12.4-1.19-18.62-.64-21.48-.51-43.64-2.09-65.86-.49-4.23-.88-8.47-1.22-12.7,9.5,3.56,19.76,5.13,29.79,6.14,38.06,5.72,76.88,.47,111.55-16.47,18.3-7.86,35.13-19.41,54.63-24.27,16.06-4.19,32.76-3.96,49.1-1.76,13.42,1.5,25.88,7.18,39.1,9.4,16.45,2.38,12.63-20.02,12.8-30.44-.18-14.46,.97-28.88,2.25-43.27,4.55-45.77-1.52-91.44-3.54-137.14Zm-47.75,92.33c-8.39,.88-16.65,2.46-24.81,4.46-.18-5.52-.37-11.04-.61-16.56,.14-6.96,.36-13.91,.67-20.87,11.79-2.31,23.74-3.77,35.78-4.33,4.93-.24,9.88-.51,14.79-.05,1.79,.29,3.56,.78,5.3,1.21-.25,8.06-.8,16.11-1.52,24.11-.29,4.69-.53,9.39-.73,14.09-9.35-2.68-19.13-3.4-28.87-2.07Zm-110.24,29.93c-5.44,1.2-10.92,2.13-16.43,2.91,.12-10.74,.15-21.49,.47-32.23,.08-1.52,.17-3.04,.26-4.56,7.18-1.59,14.3-3.42,21.34-5.64,3.57-.84,7.11-1.78,10.63-2.76,.38,12.49,.61,24.97,.31,37.46-5.52,1.62-11.05,3.23-16.58,4.82Zm-31.46,90.51c-14.74,6.04-30.09,10.46-45.9,12.77-.11-1.73-.2-3.45-.11-5.13-.27-13.28-.28-24.97,.42-39.12,.59-8.58,.7-17.15,.56-25.72,14.18-1.51,28.47-2.5,42.59-4.5,.72,20.57,1.8,41.12,2.43,61.7Zm-104.69-83.9c.09-8.71,.24-17.43,.39-26.15,2.49,.13,4.99,.15,7.22,.45,10.54,.48,21.05-.21,31.52-1.41,.41,10.43,1.04,20.85,1.57,31.21-13.76,1.34-27.49,2.95-41.22,4.64,.17-2.91,.34-5.82,.52-8.73Zm76.62,1.33c-5.95,.31-11.89,.73-17.83,1.19-.49-9.98-1.06-19.96-1.35-29.95,.01-.72,.03-1.44,.04-2.16,3.22-.48,6.43-.98,9.64-1.46,11.57-1.99,23.19-3.73,34.75-5.77-.02,.57-.04,1.14-.06,1.71-.35,11.21-.36,22.41-.18,33.6-8.35,.88-16.71,1.7-25.01,2.85Zm50.37-103.63c1.07-3.26,1.13-6.44,.52-9.23,8.19-3.77,16.29-7.81,24.42-11.79-.01,.15-.02,.3-.03,.46-1.06,17.85-.7,35.69-.13,53.54-9.84,1.69-19.69,3.44-29.54,5.17,1.19-12.76,2.75-25.48,4.77-38.14Zm43.7,47.83c8.76-2.88,17.47-5.95,26.23-8.89,2.09-.63,4.2-1.23,6.31-1.81-.04,1.25-.07,2.51-.11,3.76-.51,11.48-.2,22.93,.63,34.35-4.58,1.42-9.13,2.92-13.66,4.45-6.4,1.95-12.81,3.88-19.23,5.81,.26-12.55,.02-25.11-.17-37.67Zm98.71-86.61h0c3.99,12.47,6.28,25.26,7.4,38.18-9.44-1.1-19.16,.81-28.45,2.6-8.65,2-17.06,4.77-25.36,7.86,1.04-14.17,2.46-28.31,4.32-42.39,.16-3.91,1.2-8.27,1.72-12.56,13.83-.76,27.87,.06,40.38,6.3Zm-60.39-4.01c-.25,1.63-.49,3.26-.72,4.89-2.84,18.32-3.84,36.81-4.47,55.32-10.95,4.42-21.93,8.78-33.26,12.05,0-.68,0-1.37,0-2.05,.14-19.25,.22-38.49,1.14-57.72,12.05-5.3,24.37-9.83,37.32-12.49Zm-116.56,45.71c4.96-1.25,9.83-2.34,15.06-3.99-2.78,13.98-3.98,28.25-4.7,42.54-14.84,2.47-29.71,4.71-44.62,6.41,.52-12.07,1.37-24.12,2.74-36.1,10.51-3.02,20.96-6.36,31.51-8.85Zm-78.25,16.42c9.08,.31,17.95-.76,26.72-2.53-1.47,10.9-2.1,21.9-2.22,32.94-12.59,.97-25.22,1.44-37.9,1.22,.14-10.68,.2-21.36,.12-32.04,4.43,.17,8.9,.15,13.28,.4Zm-15.81,176.33c-.3-.13-.59-.22-.87-.28-.8-19.49-.34-38.99,.57-58.49,14.75-.92,29.39-4.09,44.1-5.98,1.46,23.21,2.56,46.44,3.14,69.69-15.88,1.58-32.17,1.71-46.94-4.93Zm119.6-15.38c0-1.12,.02-2.23,.09-3.34-.19-12.82-.29-26.73,.29-40.84,.38-4.87,.64-9.74,.84-14.62,.84-.19,1.69-.37,2.53-.56,10.78-2.59,21.01-6.82,31.29-10.91,.49,12.61,1.32,25.2,1.65,37.81,.28,3.19,.56,9.37,1.37,15.31-12.91,5.3-25.52,11.58-38.07,17.14Zm51.32-22.14c-.12-.77-.23-1.55-.34-2.32-.76-6.6-.36-13.25-.3-19.87,0-10.76,.79-21.5,1.44-32.24,3.07-.99,6.16-1.9,9.31-2.65,8.7-2.21,17.45-4.33,26.32-5.62,.84,6.91,1.81,13.8,2.86,20.68,1.36,7.07,2.14,23,4.41,35.23-15.15-.92-29.63,2.04-43.7,6.79Zm58.38-4.74c-1.15-5.13-2.08-10.31-2.79-15.52-1.39-14.53-2.06-29.11-2.56-43.7,16.7-.67,33.91-1.99,49.76,3.73,.79,.25,1.68,.6,2.64,.98,.18,23.14,1.69,46.28,4.94,69.16-17.46-4.22-34.34-11.07-51.98-14.66Z"/></svg>
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
        <div className="max-w-[1240px] 2xl:max-w-[1600px] min-[1920px]:max-w-[1800px] min-[2560px]:max-w-[2400px] mx-auto px-4 sm:px-6 lg:px-8">
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

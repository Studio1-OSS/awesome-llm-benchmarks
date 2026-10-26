import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, Trophy, ListOrdered, BookOpen } from 'lucide-react';

const GITHUB_URL = 'https://github.com/Studio1-OSS/awesome-llm-benchmarks';

const GithubIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
);

interface BenchmarkNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const BenchmarkNav: React.FC<BenchmarkNavProps> = ({ currentTab, onTabChange }) => {
  const [githubStars, setGithubStars] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/Studio1-OSS/awesome-llm-benchmarks')
      .then(r => r.json())
      .then(d => {
        if (d && typeof d.stargazers_count === 'number') {
          setGithubStars(d.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-[#EAEAEA] h-16 flex items-center justify-between px-3 sm:px-6">
      {/* Brand on Left */}
      <div className="flex items-center gap-2 sm:gap-6">
        <Link to="/" className="flex items-center min-w-0 gap-2.5 hover:opacity-80 transition-opacity">
          <img
            src="/icon.png"
            alt="LLM Benchmark Icon"
            className="h-[24px] w-[24px] sm:h-[32px] sm:w-[32px] object-contain shrink-0"
          />
          <div className="flex flex-col text-[#1c1c1c] tracking-tighter font-semibold min-w-0 justify-center">
            <span className="text-[14px] sm:text-[17px] leading-none whitespace-nowrap">llm</span>
            <span className="text-[14px] sm:text-[17px] leading-none whitespace-nowrap -mt-0.5">benchmark</span>
          </div>
        </Link>

        {/* Breadcrumb separator & Agent Bench Badge */}
        <div className="hidden sm:flex items-center gap-2 border-l border-[#E5E5E5] pl-4">
          <span className="px-2 py-0.5 rounded-[4px] bg-[#111111] text-white text-[11px] font-semibold uppercase tracking-wider">
            Agent Bench
          </span>
        </div>
      </div>

      {/* Center Tabs */}
      <nav className="hidden md:flex items-center gap-1 bg-[#F0EFEA] p-1 rounded-xl border border-[#E5E3DF]">
        <button
          onClick={() => onTabChange('leaderboard')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
            currentTab === 'leaderboard'
              ? 'bg-white text-[#111111] font-semibold shadow-2xs'
              : 'text-[#666666] hover:text-[#111111]'
          }`}
        >
          <Trophy size={13} />
          <span>Harness Leaderboard</span>
        </button>

        <button
          onClick={() => onTabChange('compare')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
            currentTab === 'compare'
              ? 'bg-white text-[#111111] font-semibold shadow-2xs'
              : 'text-[#666666] hover:text-[#111111]'
          }`}
        >
          <SlidersHorizontal size={13} />
          <span>Compare Matrix</span>
        </button>

        <button
          onClick={() => onTabChange('runs')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
            currentTab === 'runs'
              ? 'bg-white text-[#111111] font-semibold shadow-2xs'
              : 'text-[#666666] hover:text-[#111111]'
          }`}
        >
          <ListOrdered size={13} />
          <span>All Runs (84)</span>
        </button>

        <button
          onClick={() => onTabChange('methodology')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
            currentTab === 'methodology'
              ? 'bg-white text-[#111111] font-semibold shadow-2xs'
              : 'text-[#666666] hover:text-[#111111]'
          }`}
        >
          <BookOpen size={13} />
          <span>Dataset & Evaluators</span>
        </button>
      </nav>

      {/* Right Navigation Actions */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        <Link
          to="/llm-race"
          className="group flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-[13px] font-medium text-white bg-black/80 backdrop-blur-md border border-white/20 px-2 sm:px-3 py-1.5 rounded-md hover:bg-black transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        >
          <span className="whitespace-nowrap">LLM Race</span>
        </Link>

        <Link
          to="/dashboard"
          className="text-[11px] sm:text-[13px] font-medium text-[#111111] bg-[#EEEEEE]/80 backdrop-blur-xl border border-black/10 px-2 sm:px-3 py-1.5 rounded-md hover:bg-[#E5E5E5]/90 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
        >
          <span className="whitespace-nowrap">Dashboard</span>
        </Link>

        <div className="w-[1px] h-4 bg-[#EAEAEA] mx-0.5 hidden sm:block" />

        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center hover:opacity-70 transition-opacity ml-0 sm:ml-1"
        >
          <GithubIcon size={18} className="sm:w-[22px] sm:h-[22px] w-[18px] h-[18px]" />
          {githubStars !== null && (
            <span className="hidden sm:inline-block ml-1.5 text-[12.5px] font-medium text-[#111111]">
              {githubStars.toLocaleString()}
            </span>
          )}
        </a>
      </div>
    </header>
  );
};

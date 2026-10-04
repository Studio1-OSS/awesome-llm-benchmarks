export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#171717] font-sans overflow-x-hidden selection:bg-[#EAEAEA]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-[#EAEAEA] h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <img src="/icon.png" alt="LLM Arena Icon" className="h-6 w-6 object-contain" />
            <div className="flex flex-col text-[#171717] tracking-tighter font-semibold min-w-0 justify-center">
              <span className="text-[14px] leading-none whitespace-nowrap">llm</span>
              <span className="text-[14px] leading-none whitespace-nowrap -mt-[1px]">benchmark</span>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-[14px] font-medium text-[#666666]">
            <a href="#" className="hover:text-black transition-colors">Products</a>
            <a href="#" className="hover:text-black transition-colors">Resources</a>
            <a href="#" className="hover:text-black transition-colors">Enterprise</a>
            <a href="#" className="hover:text-black transition-colors">Pricing</a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="text-[13px] font-medium text-[#666666] hover:text-black hidden md:block px-3 py-1.5 border border-[#EAEAEA] rounded-md transition-all bg-white hover:bg-[#F5F5F5]">Ask AI</a>
          <a href="#dashboard" className="text-[13px] font-medium text-black bg-white border border-[#EAEAEA] px-4 py-1.5 rounded-md hover:bg-[#F5F5F5] transition-all shadow-sm">Dashboard</a>
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-gray-200 to-gray-400 border border-[#EAEAEA] overflow-hidden ml-2 cursor-pointer">
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <main className="pt-24 pb-32">
        {/* Hero Section */}
        <div className="max-w-[1040px] mx-auto px-6 text-center">
          <div className="relative mx-auto w-full max-w-4xl aspect-[2/1] bg-[#F5F5F5] rounded-[16px] border border-[#EAEAEA] mb-12 flex items-center justify-center overflow-hidden shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]">
            <div className="absolute inset-0 bg-[radial-gradient(#E5E5E5_1px,transparent_1px)] [background-size:24px_24px] opacity-60"></div>
            <div className="z-10 w-24 h-24 opacity-[0.05]">
              <img src="/icon.png" alt="LLM Arena Icon" className="w-full h-full object-contain grayscale" />
            </div>
            
            {/* Dock */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-white rounded-full border border-[#EAEAEA] shadow-sm">
               <img src="/logos/openai.svg" className="w-5 h-5 opacity-70 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="OpenAI" />
               <img src="/logos/anthropic.svg" className="w-5 h-5 opacity-70 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Anthropic" />
               <img src="/logos/meta.svg" className="w-5 h-5 opacity-70 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Meta" />
               <img src="/logos/google.svg" className="w-5 h-5 opacity-70 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Google" />
               <img src="/logos/deepseek.svg" className="w-5 h-5 opacity-70 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="DeepSeek" />
               <img src="/logos/github.svg" className="w-5 h-5 opacity-70 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="GitHub" />
            </div>
          </div>

          <h1 className="text-[48px] md:text-[64px] font-bold tracking-tight text-[#171717] leading-tight mb-5">
            Awesome LLM Benchmarks
          </h1>
          <p className="text-[17px] md:text-[19px] text-[#666666] max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
            We invest in frameworks, runtimes, and evaluations that power agentic software through curated side-by-side benchmarks we maintain, depend on, or meaningfully contribute to.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="#dashboard" className="px-6 py-2.5 rounded-full bg-black text-white text-[14.5px] font-medium hover:bg-black/90 transition-colors shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] flex items-center gap-2">
              Start Comparing
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
            <a href="https://github.com/Studio1-OSS/awesome-llm-benchmarks" target="_blank" rel="noreferrer" className="px-6 py-2.5 rounded-full bg-white text-[#171717] text-[14.5px] font-medium border border-[#EAEAEA] hover:bg-[#F5F5F5] transition-colors flex items-center gap-2">
              <img src="/logos/github.svg" alt="GitHub" className="w-4 h-4 opacity-80" />
              View Source
            </a>
          </div>
        </div>

        {/* Grid Section */}
        <div className="max-w-[1040px] mx-auto px-6 mt-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#EAEAEA]">
            {[
              { title: "Flappy Bird", desc: "Input precision and game-loop tuning.", icon: "/games/flappy-bird.png" },
              { title: "3D GTA Game", desc: "Open-world systems depth and build reliability.", icon: "/games/gta5.png" },
              { title: "Design Portfolio", desc: "Editorial visual design and interaction.", icon: "/games/portfolio.png" },
              { title: "Endless Runner", desc: "Game feel, pacing, and visual direction.", icon: "/games/runner.png" },
              { title: "3D Snake", desc: "3D game loop and spatial clarity.", icon: "/games/snake.png" },
              { title: "2D Breakout", desc: "Responsive arcade-game craft.", icon: "/games/breakout.png" },
            ].map((item, i) => (
              <div key={i} className="group p-8 border-b border-r border-[#EAEAEA] bg-white hover:bg-[#FAFAFA] transition-colors cursor-pointer flex flex-col justify-between aspect-square">
                <div className="flex-1 flex items-center justify-center mb-8">
                  <div className="w-20 h-20 rounded-[14px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#EAEAEA] p-1 flex items-center justify-center">
                    <img src={item.icon} alt={item.title} className="w-full h-full rounded-xl object-cover" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-[#171717] tracking-tight mb-1">{item.title}</h3>
                  <p className="text-[13.5px] text-[#666666] leading-relaxed mb-4">{item.desc}</p>
                  <a href="#dashboard" className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#171717] hover:text-[#666666] transition-colors">
                    <img src="/logos/github.svg" alt="GitHub" className="w-3.5 h-3.5 opacity-80" />
                    Explore benchmark 
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 ml-0.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#EAEAEA] bg-[#FAFAFA] pt-16 pb-24">
        <div className="max-w-[1040px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
            <div className="col-span-2">
              <div className="flex items-center min-w-0 gap-2.5 mb-6 opacity-80">
                <img src="/icon.png" alt="LLM Arena Icon" className="h-[28px] w-[28px] object-contain shrink-0 grayscale" />
                <div className="flex flex-col text-[#1c1c1c] tracking-tighter font-semibold min-w-0 justify-center">
                  <span className="text-[14px] leading-none whitespace-nowrap">llm</span>
                  <span className="text-[14px] leading-none whitespace-nowrap -mt-[1px]">benchmark</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-[13px] font-semibold text-[#171717] mb-4">Benchmarks</h4>
              <ul className="space-y-3 text-[13px] text-[#666666]">
                <li><a href="#" className="hover:text-[#171717] transition-colors">Flappy Bird</a></li>
                <li><a href="#" className="hover:text-[#171717] transition-colors">3D GTA</a></li>
                <li><a href="#" className="hover:text-[#171717] transition-colors">Endless Runner</a></li>
                <li><a href="#" className="hover:text-[#171717] transition-colors">Portfolio</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[13px] font-semibold text-[#171717] mb-4">Models</h4>
              <ul className="space-y-3 text-[13px] text-[#666666]">
                <li><a href="#" className="hover:text-[#171717] transition-colors">GPT-4o</a></li>
                <li><a href="#" className="hover:text-[#171717] transition-colors">Claude 3.5</a></li>
                <li><a href="#" className="hover:text-[#171717] transition-colors">DeepSeek</a></li>
                <li><a href="#" className="hover:text-[#171717] transition-colors">Meta Llama 3</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[13px] font-semibold text-[#171717] mb-4">Resources</h4>
              <ul className="space-y-3 text-[13px] text-[#666666]">
                <li><a href="#" className="hover:text-[#171717] transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-[#171717] transition-colors">GitHub Repo</a></li>
                <li><a href="#" className="hover:text-[#171717] transition-colors">Leaderboard</a></li>
                <li><a href="#" className="hover:text-[#171717] transition-colors">Methodology</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[13px] font-semibold text-[#171717] mb-4">Company</h4>
              <ul className="space-y-3 text-[13px] text-[#666666]">
                <li><a href="#" className="hover:text-[#171717] transition-colors">About Studio1</a></li>
                <li><a href="#" className="hover:text-[#171717] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[#171717] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#171717] transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const GithubIcon = ({ size = 24, className = '' }: { size?: number, className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const PAGE_CONTENT: Record<string, { title: string, content: string }> = {
  '/methodologies': {
    title: 'Methodologies',
    content: 'Our evaluation methodology is based on procedurally generated, deterministic game loops that test reasoning, planning, and code generation capabilities in real-time. By moving away from static multiple-choice datasets, we eliminate test-set contamination and ensure models are evaluated on true generalization.'
  },
  '/about': {
    title: 'About LLM Arena',
    content: 'LLM Arena was created to solve the fundamental problem in AI evaluation: static benchmarks are solved too quickly, and humans cannot scale to evaluate thousands of models daily. We provide a dynamic, game-based evaluation platform that scales infinitely and evaluates models on true agency.'
  },
  '/contributors': {
    title: 'Contributors',
    content: 'This project is powered by the open-source community. We want to thank all the researchers, engineers, and hobbyists who have submitted models, created new game environments, and helped refine our scoring algorithms. You can join us on GitHub to make your mark.'
  },
  '/documentation': {
    title: 'Documentation',
    content: 'Learn how to integrate your custom language models with our benchmarking suite. Our documentation covers everything from the WebSocket API for game loop integration, to the schema requirements for submitting a new model to the leaderboard.'
  },
  '/updates': {
    title: 'Updates & Changelog',
    content: 'Stay up to date with the latest changes to the LLM Arena platform. We regularly update our evaluation environments, adjust scoring weights, and introduce new frontier models to the leaderboard.'
  },
  '/faq': {
    title: 'Frequently Asked Questions',
    content: 'Have questions about how we calculate Elo ratings, why your model failed a specific game loop, or how to interpret the cost-per-task metrics? Find all your answers here.'
  },
  '/privacy': {
    title: 'Privacy Policy',
    content: 'We take your privacy seriously. We do not store or use the prompts generated during evaluation for training purposes. All telemetry data is anonymized and used strictly to improve the stability of the benchmarking platform.'
  },
  '/terms': {
    title: 'Terms of Service',
    content: 'By using the LLM Arena platform, you agree to our community guidelines. Do not attempt to reverse-engineer the procedural generation seeds, and please respect the API rate limits when programmatically querying the leaderboard data.'
  }
};

export default function ContentPage() {
  const [githubStars, setGithubStars] = useState<number | null>(null);
  const location = useLocation();
  const pageData = PAGE_CONTENT[location.pathname] || { title: 'Page Not Found', content: 'The content you are looking for does not exist.' };

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
          <a href="https://github.com/Studio1-OSS/awesome-llm-benchmarks" target="_blank" rel="noreferrer" className="flex items-center justify-center hover:opacity-70 transition-opacity ml-1">
            <GithubIcon size={22} />
            {githubStars !== null && <span className="ml-1.5 text-[12.5px] font-medium text-[#111111]">{githubStars.toLocaleString()}</span>}
          </a>
        </div>
      </header>

      <div className="max-w-[800px] mx-auto px-6 pt-24 pb-32 min-h-[60vh]">
        <h1 className="text-[48px] text-[#2E2E2D] leading-[1.1] mb-8 tracking-tight font-serif" style={{ fontFamily: '"Playfair Display", serif' }}>
          {pageData.title}
        </h1>
        <div className="prose prose-lg prose-stone max-w-none text-[#4A4948]">
          <p className="lead">{pageData.content}</p>
        </div>
      </div>

      <footer className="bg-[#F8F7F4] pt-16 pb-12 border-t border-[#EAEAEA]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 mb-4 relative pb-16">
            <div className="col-span-1 lg:col-span-2 pr-8">
              <div className="flex items-center min-w-0 gap-3 mb-6 opacity-90">
                <img src="/icon.png" alt="LLM Arena Icon" className="h-[48px] w-[48px] object-contain shrink-0 grayscale" />
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
                  <li><Link to="/dashboard" className="hover:text-[#111111] transition-colors">Benchmarks</Link></li>
                  <li><Link to="/methodologies" className="hover:text-[#111111] transition-colors">Methodologies</Link></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[15px] text-[#111111] mb-6">Company</h4>
                <ul className="space-y-3.5 text-[14px] text-[#666666]">
                  <li><Link to="/about" className="hover:text-[#111111] transition-colors">About</Link></li>
                  <li><Link to="/contributors" className="hover:text-[#111111] transition-colors">Contributors</Link></li>
                  <li><a href="https://github.com/Studio1-OSS/awesome-llm-benchmarks" target="_blank" rel="noreferrer" className="hover:text-[#111111] transition-colors">GitHub</a></li>
                  <li><Link to="/blog" className="hover:text-[#111111] transition-colors">Blog</Link></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[15px] text-[#111111] mb-6">Resources</h4>
                <ul className="space-y-3.5 text-[14px] text-[#666666]">
                  <li><Link to="/documentation" className="hover:text-[#111111] transition-colors">Documentation</Link></li>
                  <li><Link to="/updates" className="hover:text-[#111111] transition-colors">Updates</Link></li>
                  <li><Link to="/faq" className="hover:text-[#111111] transition-colors">FAQ</Link></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[15px] text-[#111111] mb-6">Legal</h4>
                <ul className="space-y-3.5 text-[14px] text-[#666666]">
                  <li><Link to="/privacy" className="hover:text-[#111111] transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="hover:text-[#111111] transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

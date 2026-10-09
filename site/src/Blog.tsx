import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const POSTS = [
  {
    id: 'the-death-of-static-benchmarks',
    title: 'The Death of Static Benchmarks: Why MMLU is No Longer Enough',
    subtitle: 'How test-set contamination and rapid model advancement rendered traditional evaluation obsolete.',
    date: 'Oct 09, 2026',
    readTime: '9 min read',
    image: 'https://framerusercontent.com/images/89wYJHZRlIHHAeJ2fb38UtX5wI.png?scale-down-to=1024&width=1344&height=896',
    content: `
      <p class="lead">As AI models continue to evolve at breakneck speeds, the methods we use to evaluate them must advance equally fast. Traditional, static multiple-choice benchmarks like MMLU are becoming saturated, failing to capture the true agency and reasoning capabilities of frontier LLMs.</p>
      
      <p>For years, the machine learning community has relied on multiple-choice questions to determine a model's "intelligence." But intelligence in the real world isn't about picking A, B, C, or D. It's about planning, adapting to dynamic environments, and writing functional code that executes without errors. Today, we are proud to introduce a new paradigm in AI evaluation: interactive, game-loop benchmarking.</p>
      
      <h3>The Interactive Evaluation Pipeline</h3>
      <p>Instead of feeding a model a static prompt, we place it inside a deterministic game engine. The model must "play" games like Snake, Breakout, and Flappy Bird by generating the raw logic required to survive in real-time. This requires a level of spatial reasoning and reaction logic that text-in, text-out benchmarks completely miss.</p>
      
      <div class="my-8 p-6 bg-white border border-[#EAEAEA] rounded-xl shadow-sm">
        <div class="flex flex-col md:flex-row items-center justify-between text-center gap-4">
          <div class="flex-1 bg-[#F4F2EF] p-4 rounded-lg">
            <span class="font-bold text-[#111111]">1. Model Inference</span>
            <p class="text-sm text-[#666666] mt-2">Generate Javascript logic based on current canvas state.</p>
          </div>
          <div class="text-[#8C8276]">➔</div>
          <div class="flex-1 bg-[#F4F2EF] p-4 rounded-lg">
            <span class="font-bold text-[#111111]">2. Engine Execution</span>
            <p class="text-sm text-[#666666] mt-2">The browser evaluates the code within a WebWorker sandbox.</p>
          </div>
          <div class="text-[#8C8276]">➔</div>
          <div class="flex-1 bg-[#F4F2EF] p-4 rounded-lg">
            <span class="font-bold text-[#111111]">3. Score Computation</span>
            <p class="text-sm text-[#666666] mt-2">Elo rating is adjusted based on survival time and mechanics.</p>
          </div>
        </div>
      </div>

      <h3>Why Procedural Generation?</h3>
      <p>One of the biggest issues facing modern evaluation is <strong>test-set contamination</strong>. Models inadvertently train on the very benchmarks they are evaluated against. If a model has seen the solution to a coding problem millions of times during pre-training, solving it during an evaluation doesn't prove reasoning—it proves memorization.</p>
      
      <p>By using procedural generation, every single evaluation environment is unique. The layout of the Breakout bricks, the speed of the Flappy Bird pipes, and the algorithmic constraints are randomized based on cryptographic seeds. A model cannot memorize the solution to a level that has never existed before.</p>
      
      <h3>The Results</h3>
      <p>Our engineering team completely eliminated manual verification by automating this pipeline. Now, new models are submitted to the leaderboard and evaluated autonomously. We are already seeing incredible divergence between models that score high on static benchmarks but fail completely when asked to maintain state across a 60 FPS game loop. This is the future of evaluation: true agency, tested in the wild.</p>
    `
  },
  {
    id: 'evaluating-code-generation-in-the-wild',
    title: 'Evaluating Code Generation in the Wild',
    subtitle: 'Moving beyond simple algorithms to test full-stack reasoning and logic building.',
    date: 'Sep 22, 2026',
    readTime: '6 min read',
    image: 'https://framerusercontent.com/images/74Pklphfry6xPsPBdf6NPOlkfro.png?scale-down-to=1024&width=1344&height=896',
    content: `
      <p class="lead">Evaluating a model's coding capability requires more than checking if it can reverse a string. Modern models act as full-fledged software engineers, and our benchmarks must reflect that reality.</p>
      <p>Our open-source interactive coding benchmarks require models to interact with a simulated operating system, compile code, handle runtime errors, and iterate on solutions.</p>
      
      <h3>Beyond LeetCode</h3>
      <p>Traditional coding evaluations often rely on algorithmic challenges that are easily memorized. But software engineering is about architecture, state management, and debugging. When we evaluate models on building a functional 3D game using Three.js, we test their ability to understand spatial coordinates, camera angles, and rendering loops.</p>
      
      <p>We've found a significant gap between models that perform well on static code tests and models that can actually build and debug complex applications. Interactive benchmarking closes this gap by forcing the model to run its code, parse the error logs, and fix the bugs autonomously.</p>
    `
  },
  {
    id: 'the-future-of-agentic-evaluations',
    title: 'The Future of Agentic Evaluations',
    subtitle: 'How we build multi-step game loops to test true AI agency.',
    date: 'Sep 10, 2026',
    readTime: '5 min read',
    image: 'https://framerusercontent.com/images/TeeEjm2aY6UxjlgIZ9MC2hTefg.png?scale-down-to=1024&width=1344&height=896',
    content: `
      <p class="lead">The next frontier of AI is agency: models taking actions in environments over long horizons. But how do you reliably benchmark an agent?</p>
      <p>At LLM Benchmark, we've developed procedural game loops like Snake and Flappy Bird where the model must "play" the game by generating the correct logic in real-time. This tests planning, spatial reasoning, and reaction times in a way that text-in text-out prompts simply cannot measure.</p>
      
      <h3>Building Robust Agents</h3>
      <p>When an agent is deployed in the real world, it doesn't just answer one question and stop. It must continuously observe its environment, make decisions, and execute actions. By forcing models to maintain a game loop at 60 FPS, we stress-test their context windows, their ability to remember previous states, and their capacity to adapt to rapid changes.</p>
    `
  },
  {
    id: 'why-ui-matters-in-ai',
    title: 'Why UI Matters in AI Tooling',
    subtitle: 'Great models require great interfaces. How we designed the LLM Benchmark dashboard.',
    date: 'Aug 28, 2026',
    readTime: '4 min read',
    image: 'https://framerusercontent.com/images/99R6dxyRz6eD42x4x6W0P742H9M.jpg?scale-down-to=1024&width=1344&height=896',
    content: `
      <p class="lead">Building a powerful AI model is only half the battle. If the tools used to interact with and evaluate that model are clunky, researchers will struggle to unlock its true potential.</p>
      
      <p>When we set out to build the LLM Benchmark dashboard, we knew we had to treat the interface with the same rigorous attention to detail as the backend evaluation engine. AI developers are tired of staring at unstyled JSON outputs and terminal logs.</p>
      
      <h3>Design as a First-Class Citizen</h3>
      <p>Our dashboard employs a minimalist, professional aesthetic utilizing Switzer typography, subtle gradient blurs, and glassmorphism. This isn't just to look pretty—it reduces cognitive load. When you are comparing Elo ratings across dozens of models and multiple environments (from Python scripts to React components), visual hierarchy is essential.</p>
      
      <p>By investing in a premium UI, we've seen a 300% increase in community engagement and a massive uptick in open-source contributions. A tool that feels good to use is a tool that gets used.</p>
    `
  },
  {
    id: 'preventing-overfitting',
    title: 'Preventing Overfitting in the Era of Giant Models',
    subtitle: 'Techniques for ensuring models generalize beyond their training data.',
    date: 'Aug 15, 2026',
    readTime: '7 min read',
    image: 'https://framerusercontent.com/images/n3nI3vWkM7zOQzD9V0x9XU34c.jpg?scale-down-to=1024&width=1344&height=896',
    content: `
      <p class="lead">As models scale into the trillions of parameters, their capacity to memorize data increases exponentially. How do we ensure they are actually learning concepts and not just regurgitating GitHub repositories?</p>
      
      <p>Overfitting is the silent killer of AI capabilities. A model might ace standard coding benchmarks, but fail completely when asked to implement a novel architecture or use an internal proprietary API. At LLM Benchmark, we tackle this by continuously rotating our evaluation environments and introducing synthetic syntax shifts.</p>
      
      <h3>Synthetic Syntax Shifts</h3>
      <p>To truly test reasoning, we sometimes evaluate models using "synthetic languages"—programming languages that look like Python or Javascript but have completely different standard libraries and keywords. If a model can read the synthetic language's documentation in its prompt and successfully write a Snake game, it proves genuine reasoning capabilities rather than memorization.</p>
      
      <p>Our latest findings show that while smaller models fail these tests completely, the frontier models demonstrate remarkable adaptability, proving that zero-shot reasoning is indeed scaling with compute.</p>
    `
  },
  {
    id: 'open-source-vs-proprietary',
    title: 'The Gap is Closing: Open-Source vs Proprietary Models',
    subtitle: 'An analysis of recent benchmark data reveals a tightening race.',
    date: 'Aug 02, 2026',
    readTime: '8 min read',
    image: 'https://framerusercontent.com/images/154Ff3B5W9T0z2X8J0Q6K8L5uM.jpg?scale-down-to=1024&width=1344&height=896',
    content: `
      <p class="lead">For years, proprietary models from massive tech giants have dominated the top of the leaderboard. But the open-source community is moving faster than ever, and the gap is finally closing.</p>
      
      <p>Looking at our interactive coding benchmark data over the last six months, we've seen an incredible surge in the capabilities of open-weight models. While proprietary models still maintain a slight edge in complex multi-step planning (like maintaining the state of our Breakout game loop), open-source models are now matching or exceeding them in pure code generation and refactoring tasks.</p>
      
      <h3>The Democratization of AI</h3>
      <p>This shift has massive implications for the industry. Developers no longer need to rely on expensive API calls to power their applications. By utilizing highly-optimized open-source models and techniques like LoRA (Low-Rank Adaptation), teams can achieve state-of-the-art performance on domain-specific tasks for a fraction of the cost.</p>
      
      <p>We are incredibly excited to see what the next generation of open-source models will bring to the LLM Benchmark arena.</p>
    `
  }
];

export default function Blog() {
  const [postId, setPostId] = useState<string | null>(null);
  const [githubStars, setGithubStars] = useState<number | null>(null);
  const location = useLocation();

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
    const path = location.pathname;
    if (path.startsWith('/blog/') && path.length > 6) {
      setPostId(path.replace('/blog/', ''));
    } else {
      setPostId(null);
    }
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
  );

  const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
  );

  if (postId) {
    const post = POSTS.find(p => p.id === postId) || POSTS[0];
    return (
      <div className="min-h-screen bg-[#FAFAF8] text-[#171717] font-sans overflow-x-hidden selection:bg-[#EAEAEA]">
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
          <Link to="/dashboard" className="text-[13px] font-medium text-white bg-black/80 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-md hover:bg-black transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)]">LLM Race</Link>
          <Link to="/dashboard" className="text-[13px] font-medium text-[#111111] bg-[#EEEEEE]/80 backdrop-blur-xl border border-black/10 px-4 py-1.5 rounded-md hover:bg-[#E5E5E5]/90 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.05)]">Dashboard</Link>
          <a href="https://github.com/Studio1-OSS/awesome-llm-benchmarks" target="_blank" rel="noreferrer" className="flex items-center justify-center hover:opacity-70 transition-opacity ml-1">
            <GithubIcon size={22} />
            {githubStars !== null && <span className="ml-1.5 text-[12.5px] font-medium text-[#111111]">{githubStars.toLocaleString()}</span>}
          </a>
        </div>
      </header>
        <div className="max-w-[800px] mx-auto px-6 pt-16 pb-24">
          
          
          <h1 className="text-[48px] text-[#2E2E2D] leading-[1.1] mb-5 tracking-tight font-heading">
            {post.title}
          </h1>
          <p className="text-[18px] text-[#6E6D6A] mb-8 leading-relaxed">
            {post.subtitle}
          </p>
          
          <div className="flex items-center gap-4 text-[#8C8276] text-[13px] mb-10 font-medium">
            <div className="flex items-center gap-1.5"><CalendarIcon /> {post.date}</div>
            <div className="flex items-center gap-1.5"><ClockIcon /> {post.readTime}</div>
          </div>
          
          <div className="w-full aspect-[2/1] md:aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-sm">
            <img src={post.image} alt="" className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-lg prose-stone max-w-none text-[#4A4948]" style={{ fontFamily: 'Switzer, sans-serif' }} dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#171717] font-sans overflow-x-hidden selection:bg-[#EAEAEA]">
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
          <Link to="/dashboard" className="text-[13px] font-medium text-white bg-black/80 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-md hover:bg-black transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)]">LLM Race</Link>
          <Link to="/dashboard" className="text-[13px] font-medium text-[#111111] bg-[#EEEEEE]/80 backdrop-blur-xl border border-black/10 px-4 py-1.5 rounded-md hover:bg-[#E5E5E5]/90 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.05)]">Dashboard</Link>
          <a href="https://github.com/Studio1-OSS/awesome-llm-benchmarks" target="_blank" rel="noreferrer" className="flex items-center justify-center hover:opacity-70 transition-opacity ml-1">
            <GithubIcon size={22} />
            {githubStars !== null && <span className="ml-1.5 text-[12.5px] font-medium text-[#111111]">{githubStars.toLocaleString()}</span>}
          </a>
        </div>
      </header>

        <div className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-[42px] font-semibold text-[#111111] tracking-tight mb-4">Latest Updates</h1>
            <p className="text-[17px] text-[#666666]">News, insights, and stories from the LLM Benchmark team.</p>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map(post => (
            <Link 
              key={post.id}
              to={`/blog/${post.id}`}
              className="group flex flex-col bg-[#F4F2EF] rounded-2xl p-4 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] "
            >
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-5">
                <img src={post.image} alt="" className="w-full h-full object-cover  " />
              </div>
              <div className="px-1 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-[#8C8276] text-[12px] mb-3 font-medium">
                  <div className="flex items-center gap-1.5"><CalendarIcon /> {post.date}</div>
                  <div className="flex items-center gap-1.5"><ClockIcon /> {post.readTime}</div>
                </div>
                <h3 className="font-semibold text-[19px] text-[#2E2E2D] leading-snug mb-4">
                  {post.title}
                </h3>
                <div className="mt-auto pt-4 flex items-center text-[13px] font-medium text-[#6E6D6A] group-hover:text-[#2E2E2D] transition-colors">
                  Read more
                  <svg className="w-3.5 h-3.5 ml-1 transition-transform " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </div>
              </div>
            </Link>
          ))}
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

const GithubIcon = ({ size = 24, className = '' }: { size?: number, className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

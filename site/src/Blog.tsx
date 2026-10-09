import React, { useState, useEffect } from 'react';
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
      
      <h3>1. The Core Problem with Static Evaluations</h3>
      <p>Static evaluations test memorization, not synthesis. If an AI has read the entire internet, it has likely already encountered the exact phrasing of questions found in popular benchmarks like MMLU, GSM8K, and HumanEval. When a model answers correctly, we are left wondering: did it reason through the problem, or did it simply regurgitate a memorized string?</p>
      <ul>
        <li><strong>Test-Set Contamination:</strong> The boundary between training data and testing data has completely evaporated.</li>
        <li><strong>Lack of Real-World Feedback:</strong> In the real world, if you write bad code, it throws an error. If a model generates bad code on a static benchmark, it simply moves on to the next prompt.</li>
        <li><strong>Binary Outcomes:</strong> Multiple choice limits the scope of evaluation. A model might be 99% correct on its reasoning but choose the wrong final letter, failing the test. Conversely, it might guess correctly with entirely flawed logic.</li>
      </ul>

      <h3>2. The Interactive Evaluation Pipeline</h3>
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

      <h3>3. Why Procedural Generation?</h3>
      <p>One of the biggest issues facing modern evaluation is test-set contamination. By using procedural generation, every single evaluation environment is unique. The layout of the Breakout bricks, the speed of the Flappy Bird pipes, and the algorithmic constraints are randomized based on cryptographic seeds. A model cannot memorize the solution to a level that has never existed before.</p>
      
      <h3>4. Observing the Shift in Leaderboards</h3>
      <p>When we apply this interactive methodology, the leaderboard shifts dramatically. Models that were fine-tuned specifically to score high on MMLU (what we call "benchmark hacking") fall apart completely when placed inside our game loops. They fail to understand state. They fail to maintain context over hundreds of frames. They hallucinate variables that don't exist in the provided API.</p>
      <p>On the flip side, models designed with strong foundational reasoning capabilities—like Claude 3.5 Opus and DeepSeek V4—excel. They recognize patterns, optimize their own code mid-game, and adapt to the changing procedural environment.</p>

      <h3>5. The Results</h3>
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
      
      <h3>1. Beyond LeetCode</h3>
      <p>Traditional coding evaluations often rely on algorithmic challenges that are easily memorized. But software engineering is about architecture, state management, and debugging. When we evaluate models on building a functional 3D game using Three.js, we test their ability to understand spatial coordinates, camera angles, and rendering loops.</p>
      <p>Let's consider a standard prompt: "Write a function to sort an array." A 7B parameter model can do this flawlessly. But what happens if the prompt is: "Here is a React component displaying a 3D canvas. The camera is currently locked. Write a custom WebGL shader to add a post-processing bloom effect, and map the intensity of the bloom to the user's mouse coordinates." This requires multi-modal reasoning and deep context tracking.</p>
      
      <h3>2. The Architecture of Wild Evaluation</h3>
      <ul>
        <li><strong>Step 1: The Virtual File System (VFS).</strong> We spin up a lightweight VFS inside a secure WebAssembly container.</li>
        <li><strong>Step 2: Dependency Injection.</strong> The model is provided with a simulated <code>package.json</code> and must figure out how to import the right modules.</li>
        <li><strong>Step 3: Execution and Linting.</strong> The model's output is immediately executed. If it fails, the model is fed the stack trace and asked to debug its own code.</li>
      </ul>

      <h3>3. The Self-Healing Code Loop</h3>
      <p>We've found a significant gap between models that perform well on static code tests and models that can actually build and debug complex applications. Interactive benchmarking closes this gap by forcing the model to run its code, parse the error logs, and fix the bugs autonomously.</p>
      <p>In our latest tests, Claude Fable demonstrated a remarkable ability to self-heal. Out of 100 broken game loops, it successfully debugged and resurrected 84 of them without human intervention. This is what we mean by "code generation in the wild."</p>
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
      
      <h3>1. Defining True Agency</h3>
      <p>Agency is not just about calling an API. It's about maintaining a goal-oriented state machine over thousands of interactions. An agent must be able to:</p>
      <ol>
        <li><strong>Perceive:</strong> Understand the current state of its environment (e.g., the position of the Snake, the location of the apple).</li>
        <li><strong>Plan:</strong> Determine a sequence of actions that maximize a reward function (e.g., eating the apple without hitting the wall).</li>
        <li><strong>Execute:</strong> Output the exact, syntactically correct code required to take that action.</li>
        <li><strong>Adapt:</strong> Adjust the plan if the environment changes unexpectedly.</li>
      </ol>

      <h3>2. Building Robust Agents</h3>
      <p>When an agent is deployed in the real world, it doesn't just answer one question and stop. It must continuously observe its environment, make decisions, and execute actions. By forcing models to maintain a game loop at 60 FPS, we stress-test their context windows, their ability to remember previous states, and their capacity to adapt to rapid changes.</p>
      
      <h3>3. Case Study: Flappy Bird</h3>
      <p>Consider Flappy Bird. The model receives a continuous stream of coordinates representing the bird's altitude, velocity, and the distance to the next pipe. It must output exactly one Boolean per frame: <code>jump = true</code> or <code>jump = false</code>.</p>
      <p>This sounds simple, but the physics are non-linear. The bird accelerates due to gravity. The model must calculate the exact trajectory required to clear the gap. Models that lack deep reasoning will jump erratically. Models with true agency will develop a smooth, calculated rhythm, maximizing their survival time and dominating the Elo leaderboard.</p>
    `
  },
  {
    id: 'why-ui-matters-in-ai',
    title: 'Why UI Matters in AI Tooling',
    subtitle: 'Great models require great interfaces. How we designed the LLM Benchmark dashboard.',
    date: 'Aug 28, 2026',
    readTime: '4 min read',
    image: 'https://framerusercontent.com/images/89wYJHZRlIHHAeJ2fb38UtX5wI.png?scale-down-to=1024&width=1344&height=896',
    content: `
      <p class="lead">Building a powerful AI model is only half the battle. If the tools used to interact with and evaluate that model are clunky, researchers will struggle to unlock its true potential.</p>
      
      <p>When we set out to build the LLM Benchmark dashboard, we knew we had to treat the interface with the same rigorous attention to detail as the backend evaluation engine. AI developers are tired of staring at unstyled JSON outputs and terminal logs.</p>
      
      <h3>1. Design as a First-Class Citizen</h3>
      <p>Our dashboard employs a minimalist, professional aesthetic utilizing Switzer typography, subtle gradient blurs, and glassmorphism. This isn't just to look pretty—it reduces cognitive load. When you are comparing Elo ratings across dozens of models and multiple environments (from Python scripts to React components), visual hierarchy is essential.</p>
      
      <h3>2. The Science of Typography in Data Visualization</h3>
      <p>Numbers matter in benchmarking. That's why we selected fonts that feature tabular figures, ensuring that when an Elo rating changes from 1499 to 1500, the width of the text block remains identical. This prevents "layout jitter," a common problem in real-time dashboards.</p>
      <p>Furthermore, we utilize color psychology to indicate model performance trends. Instead of aggressive reds and greens, we use muted, color-blind-accessible palettes that guide the eye without overwhelming the user.</p>

      <h3>3. Community Engagement</h3>
      <p>By investing in a premium UI, we've seen a 300% increase in community engagement and a massive uptick in open-source contributions. A tool that feels good to use is a tool that gets used. Researchers are proudly sharing screenshots of our dashboard on X and LinkedIn, driving organic growth for the platform. Great engineering deserves great design.</p>
    `
  },
  {
    id: 'preventing-overfitting',
    title: 'Preventing Overfitting in the Era of Giant Models',
    subtitle: 'Techniques for ensuring models generalize beyond their training data.',
    date: 'Aug 15, 2026',
    readTime: '7 min read',
    image: 'https://framerusercontent.com/images/74Pklphfry6xPsPBdf6NPOlkfro.png?scale-down-to=1024&width=1344&height=896',
    content: `
      <p class="lead">As models scale into the trillions of parameters, their capacity to memorize data increases exponentially. How do we ensure they are actually learning concepts and not just regurgitating GitHub repositories?</p>
      
      <p>Overfitting is the silent killer of AI capabilities. A model might ace standard coding benchmarks, but fail completely when asked to implement a novel architecture or use an internal proprietary API. At LLM Benchmark, we tackle this by continuously rotating our evaluation environments and introducing synthetic syntax shifts.</p>
      
      <h3>1. Synthetic Syntax Shifts</h3>
      <p>To truly test reasoning, we sometimes evaluate models using "synthetic languages"—programming languages that look like Python or Javascript but have completely different standard libraries and keywords. If a model can read the synthetic language's documentation in its prompt and successfully write a Snake game, it proves genuine reasoning capabilities rather than memorization.</p>
      
      <h3>2. Adversarial Prompts and Edge Cases</h3>
      <p>Another technique we use is adversarial prompting. We intentionally introduce logical fallacies or impossible constraints into the prompt to see how the model reacts. An overfit model will blindly attempt to solve the impossible task, leading to catastrophic failure. A generalized, intelligent model will push back, identify the flaw in the prompt, and offer a viable alternative.</p>

      <h3>3. The Role of Procedural Seeds</h3>
      <p>By relying entirely on randomized, cryptographically seeded environments, we guarantee that the evaluation data has never been seen during the model's pre-training phase. If a model encounters a maze with a layout generated milliseconds before the inference call, its ability to navigate that maze is absolute proof of its zero-shot reasoning capabilities.</p>
      <p>Our latest findings show that while smaller models fail these tests completely, the frontier models demonstrate remarkable adaptability, proving that zero-shot reasoning is indeed scaling with compute.</p>
    `
  },
  {
    id: 'open-source-vs-proprietary',
    title: 'The Gap is Closing: Open-Source vs Proprietary Models',
    subtitle: 'An analysis of recent benchmark data reveals a tightening race.',
    date: 'Aug 02, 2026',
    readTime: '8 min read',
    image: 'https://framerusercontent.com/images/TeeEjm2aY6UxjlgIZ9MC2hTefg.png?scale-down-to=1024&width=1344&height=896',
    content: `
      <p class="lead">For years, proprietary models from massive tech giants have dominated the top of the leaderboard. But the open-source community is moving faster than ever, and the gap is finally closing.</p>
      
      <p>Looking at our interactive coding benchmark data over the last six months, we've seen an incredible surge in the capabilities of open-weight models. While proprietary models still maintain a slight edge in complex multi-step planning (like maintaining the state of our Breakout game loop), open-source models are now matching or exceeding them in pure code generation and refactoring tasks.</p>
      
      <h3>1. The Democratization of AI</h3>
      <p>This shift has massive implications for the industry. Developers no longer need to rely on expensive API calls to power their applications. By utilizing highly-optimized open-source models and techniques like LoRA (Low-Rank Adaptation), teams can achieve state-of-the-art performance on domain-specific tasks for a fraction of the cost.</p>
      
      <h3>2. Quantization and Edge Inference</h3>
      <p>One of the primary drivers of this open-source renaissance is the advancement in quantization techniques. Models that previously required massive multi-GPU clusters can now run efficiently on consumer hardware. We evaluate these quantized models side-by-side with their FP16 counterparts, and the results are astounding: the degradation in reasoning capability is minimal, while the increase in token generation speed is exponential.</p>

      <h3>3. The Power of Community Driven Datasets</h3>
      <p>Unlike proprietary entities that closely guard their training data, the open-source community thrives on transparency. High-quality, human-annotated datasets are being crowdsourced and refined daily. This collaborative effort ensures that open-source models are trained on highly diverse, robust data, leading to better generalization across novel tasks.</p>
      <p>We are incredibly excited to see what the next generation of open-source models will bring to the LLM Benchmark arena. The future of AI is open, transparent, and built by the community.</p>
    `
  }
];

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


const GithubIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
);

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
    
    const handleCopy = () => {
      const markdown = `# ${post.title}\n\n${post.subtitle}\n\n${post.content.replace(/<[^>]*>?/gm, '')}`;
      navigator.clipboard.writeText(markdown);
      alert('Content copied to clipboard for LLM!');
    };

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
            <Link to="/llm-race" className="group flex items-center gap-1.5 text-[13px] font-medium text-white bg-black/80 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-md hover:bg-black transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90 group-hover:opacity-100 transition-opacity"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            LLM Race
          </Link>
            <Link to="/dashboard" className="text-[13px] font-medium text-[#111111] bg-[#EEEEEE]/80 backdrop-blur-xl border border-black/10 px-4 py-1.5 rounded-md hover:bg-[#E5E5E5]/90 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.05)]">Dashboard</Link>
            <a href="https://github.com/Studio1-OSS/awesome-llm-benchmarks" target="_blank" rel="noreferrer" className="flex items-center justify-center hover:opacity-70 transition-opacity ml-1">
              <GithubIcon size={22} />
              {githubStars !== null && <span className="ml-1.5 text-[12.5px] font-medium text-[#111111]">{githubStars.toLocaleString()}</span>}
            </a>
          </div>
        </header>
        
        <div className="max-w-[800px] mx-auto px-6 pt-12 pb-24">
          
          <div className="flex items-center justify-between mb-10 border-b border-[#EAEAEA] pb-6">
            <Link to="/blog" className="flex items-center gap-2 text-[14px] font-medium text-[#666666] hover:text-[#111111] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Back to Blog
            </Link>
            
            <button onClick={handleCopy} className="flex items-center gap-2 text-[13px] font-medium text-[#111111] bg-[#F4F4F6] hover:bg-[#EAEAEA] px-4 py-2 rounded-full transition-colors border border-[#E5E5E5] shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              Copy for LLM
            </button>
          </div>
          
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
          
          <div
            className="w-full relative py-8 sm:py-10 lg:py-12 px-4 sm:px-8 lg:px-12 flex items-center justify-center border border-[#EAEAEA] rounded-[16px] shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden mb-12"
          >
            {/* Ambient Glow Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center scale-110 blur-[60px] opacity-40 mix-blend-multiply"
              style={{ backgroundImage: `url(${post.image})` }}
            />
            {/* Glassy border container */}
            <div className="w-full bg-white/30 backdrop-blur-[24px] p-3 sm:p-4 rounded-lg lg:rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/50 relative z-10 overflow-hidden">
              <div className="w-full rounded-[12px] overflow-hidden border border-white/60 shadow-[0_8px_32px_rgb(0,0,0,0.08)] bg-[#FCFAF8] flex flex-col relative">
                {/* The blog image - TAB REMOVED AS REQUESTED */}
                <img src={post.image} alt="" className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>

          <div className="prose prose-lg prose-stone max-w-none text-[#4A4948]" style={{ fontFamily: 'Switzer, sans-serif' }} dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
        
        {/* Footer for single blog post view */}
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
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#171717] font-sans selection:bg-[#EAEAEA]">
      {/* Blog List Header */}
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
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90 group-hover:opacity-100 transition-opacity"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            LLM Race
          </Link>
          <Link to="/dashboard" className="text-[13px] font-medium text-[#111111] bg-[#EEEEEE]/80 backdrop-blur-xl border border-black/10 px-4 py-1.5 rounded-md hover:bg-[#E5E5E5]/90 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.05)]">Dashboard</Link>
          <a href="https://github.com/Studio1-OSS/awesome-llm-benchmarks" target="_blank" rel="noreferrer" className="flex items-center justify-center hover:opacity-70 transition-opacity ml-1">
            <GithubIcon size={22} />
            {githubStars !== null && <span className="ml-1.5 text-[12.5px] font-medium text-[#111111]">{githubStars.toLocaleString()}</span>}
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1240px] mx-auto px-6 py-20 pb-32">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          <Reveal delay={0}>
            <h1 className="text-[56px] text-[#2E2E2D] leading-[1.05] tracking-tight font-heading mb-6 shrink-0 md:max-w-[300px]">
              Latest Updates
            </h1>
            <p className="text-[#6E6D6A] text-[18px] leading-relaxed md:max-w-[300px]">Research, insights, and stories from the LLM Benchmark team.</p>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 flex-1">
            {POSTS.map((post, index) => (
              <Reveal key={post.id} delay={index * 100}>
                <Link 
                  to={`/blog/${post.id}`}
                  className="group flex flex-col"
                >
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#EFEFEF] mb-6 shadow-sm border border-[#EAEAEA]">
                    <img 
                      src={post.image} 
                      alt="" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-4 text-[#8C8276] text-[12px] mb-3 font-medium">
                    <span className="flex items-center gap-1.5"><CalendarIcon /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><ClockIcon /> {post.readTime}</span>
                  </div>
                  <h2 className="text-[22px] font-semibold text-[#1A1A1A] mb-2 leading-[1.3] group-hover:text-[#4A4948] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-[15px] text-[#6E6D6A] leading-relaxed line-clamp-2">
                    {post.subtitle}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer for blog list view */}
      <footer className="bg-[#FAFAF8] pt-16 pb-12 border-t border-[#EAEAEA]">
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
          </div>
        </footer>
    </div>
  );
}

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
        <div class="flex flex-col md:flex-row items-stretch justify-between text-center gap-4">
          <div class="flex-1 bg-[#F4F2EF] p-4 rounded-lg flex flex-col justify-center">
            <span class="font-bold text-[#111111] whitespace-nowrap">1. Model Inference</span>
            <p class="text-sm text-[#666666] mt-2">Generate Javascript logic based on current canvas state.</p>
          </div>
          <div class="text-[#8C8276] flex items-center justify-center">➔</div>
          <div class="flex-1 bg-[#F4F2EF] p-4 rounded-lg flex flex-col justify-center">
            <span class="font-bold text-[#111111] whitespace-nowrap">2. Engine Execution</span>
            <p class="text-sm text-[#666666] mt-2">The browser evaluates the code within a WebWorker sandbox.</p>
          </div>
          <div class="text-[#8C8276] flex items-center justify-center">➔</div>
          <div class="flex-1 bg-[#F4F2EF] p-4 rounded-lg flex flex-col justify-center">
            <span class="font-bold text-[#111111] whitespace-nowrap">3. Score Computation</span>
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
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    if (postId) {
      const timer = setTimeout(() => {
        const articleContent = document.getElementById('article-content');
        if (articleContent) {
          const h3Elements = Array.from(articleContent.querySelectorAll('h3'));
          const newHeadings = h3Elements.map((h3, index) => {
            const id = h3.id || `heading-${index}`;
            h3.id = id;
            return { id, text: h3.innerText || h3.textContent || '' };
          });
          setHeadings(newHeadings);

          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setActiveId(entry.target.id);
              }
            });
          }, { rootMargin: '-10% 0px -80% 0px' });

          h3Elements.forEach(h3 => observer.observe(h3));
          return () => observer.disconnect();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [postId]);

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
        
        <div className="max-w-[1240px] 2xl:max-w-[1600px] min-[1920px]:max-w-[1800px] min-[2560px]:max-w-[2400px] mx-auto px-6 pt-12 pb-24 flex flex-col lg:flex-row gap-12 lg:gap-24 relative items-start">
          
          {/* Left TOC Sidebar */}
          <aside className="hidden lg:block w-[240px] shrink-0 sticky top-[100px]">
            <h3 className="text-[12px] font-semibold text-[#8C8276] uppercase tracking-wider mb-5">On this page</h3>
            <nav className="flex flex-col gap-3.5 border-l border-[#EAEAEA]">
              {headings.map(h => (
                <a 
                  key={h.id} 
                  href={`#${h.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-[14px] leading-snug transition-colors duration-200 border-l-2 -ml-[1px] pl-4 py-0.5 ${activeId === h.id ? 'border-[#111111] text-[#111111] font-medium' : 'border-transparent text-[#8C8276] hover:text-[#111111]'}`}
                >
                  {h.text}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Article Content */}
          <article className="flex-1 min-w-0 max-w-[800px]">
          
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
          
          <div className="relative w-full mb-12 mt-4">
            {/* Ambient Glow Background - bleeding out from behind */}
            <div 
              className="absolute inset-0 bg-cover bg-center blur-[80px] opacity-40 mix-blend-multiply scale-110 translate-y-2 z-0"
              style={{ backgroundImage: `url(${post.image})` }}
            />
            
            {/* The Image Container - full scale */}
            <div className="relative z-10 w-full rounded-[16px] sm:rounded-[20px] overflow-hidden border border-black/5 shadow-[0_8px_40px_rgba(0,0,0,0.08)] bg-[#FCFAF8] ring-1 ring-white/50">
              <img src={post.image} alt="" className="w-full h-auto object-cover" />
            </div>
          </div>

          <div id="article-content" className="prose prose-lg max-w-none prose-p:text-[#6E6D6A] prose-headings:text-[#1A1A1A] prose-headings:font-semibold prose-strong:text-[#1A1A1A] prose-ul:text-[#6E6D6A] prose-li:text-[#6E6D6A] prose-a:text-[#1A1A1A] selectable-text font-sans" dangerouslySetInnerHTML={{ __html: post.content }}></div>
          </article>
        </div>
        
        {/* Footer for single blog post view */}
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

      {/* Main Content */}
      <div className="max-w-[1240px] 2xl:max-w-[1600px] min-[1920px]:max-w-[1800px] min-[2560px]:max-w-[2400px] mx-auto px-6 py-20 pb-32">
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
          </div>
        </footer>
    </div>
  );
}

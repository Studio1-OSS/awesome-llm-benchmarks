import os
import re

filepath = r'd:\New folder (3)\llm-arena\site\src\Blog.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

new_posts = '''const POSTS = [
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
  }
];'''

content = re.sub(r'const POSTS = \[.*?\];', new_posts, content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

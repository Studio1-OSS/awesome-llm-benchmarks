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
      
      <p>In this post, we explore the transition from static datasets to dynamic, game-based evaluation environments. By placing models into procedural simulations, we can test their ability to plan, write code, and adapt to changing conditions in real-time.</p>
      
      <h3>The Evaluation Pipeline</h3>
      <div class="my-8 p-6 bg-white border border-[#EAEAEA] rounded-xl shadow-sm">
        <div class="flex flex-col md:flex-row items-center justify-between text-center gap-4">
          <div class="flex-1 bg-[#F4F2EF] p-4 rounded-lg">
            <span class="font-bold text-[#111111]">1. Model Inference</span>
            <p class="text-sm text-[#666666] mt-2">Generate actions based on current game state.</p>
          </div>
          <div class="text-[#8C8276]">➔</div>
          <div class="flex-1 bg-[#F4F2EF] p-4 rounded-lg">
            <span class="font-bold text-[#111111]">2. Engine Validation</span>
            <p class="text-sm text-[#666666] mt-2">Game engine executes code and validates rules.</p>
          </div>
          <div class="text-[#8C8276]">➔</div>
          <div class="flex-1 bg-[#F4F2EF] p-4 rounded-lg">
            <span class="font-bold text-[#111111]">3. Score Computation</span>
            <p class="text-sm text-[#666666] mt-2">Elo rating is adjusted based on metrics.</p>
          </div>
        </div>
      </div>

      <h3>Why Procedural Generation?</h3>
      <p>One of the biggest issues facing modern evaluation is <strong>test-set contamination</strong>. Models inadvertently train on the very benchmarks they are evaluated against. By using procedural generation, every single evaluation environment is unique. A model cannot memorize the solution to a level that has never existed before.</p>
      
      <p>Our engineering team completely eliminated manual verification by automating this pipeline. Now, new models are submitted to the leaderboard and evaluated autonomously, providing accurate and instantly available metrics for the community.</p>
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
      <h3>The Real-World Gap</h3>
      <p>We've found a significant gap between models that perform well on static code tests and models that can actually build and debug complex applications. Interactive benchmarking closes this gap.</p>
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
      <p>At LLM Benchmark, we've developed procedural game loops like Snake and Flappy Bird where the model must "play" the game by generating the correct logic in real-time.</p>
      <p>This tests planning, spatial reasoning, and reaction times in a way that text-in text-out prompts simply cannot measure.</p>
    `
  }
];'''

content = re.sub(r'const POSTS = \[.*?\];', new_posts, content, flags=re.DOTALL)

prose_pattern = r'<div className="prose prose-lg prose-stone max-w-none text-\[\#4A4948\]".*?</div>'
replacement = '<div className="prose prose-lg prose-stone max-w-none text-[#4A4948]" dangerouslySetInnerHTML={{ __html: post.content }}></div>'

content = re.sub(prose_pattern, replacement, content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

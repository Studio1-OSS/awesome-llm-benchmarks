import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const POSTS = [
  {
    id: 'firefighting-to-autopilot',
    title: 'From Firefighting to Autopilot: A Support Playbook',
    subtitle: 'How a 12-person support team cut 30 weekly hours of repetitive tickets.',
    date: 'Jun 16, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1490750967868-88cb44cb2753?auto=format&fit=crop&q=80&w=800',
    content: 'Long form content goes here...'
  },
  {
    id: 'when-to-let-ai-reply',
    title: 'When to Let AI Reply, and When to Call a Human',
    subtitle: 'Navigating the handoff between automated agents and your customer success team.',
    date: 'Jun 2, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&q=80&w=800',
    content: 'Long form content goes here...'
  },
  {
    id: 'when-to-bring-in-human',
    title: 'When to Let AI Reply — and When to Bring in a Human',
    subtitle: 'Best practices for human-in-the-loop AI deployments.',
    date: 'Jun 10, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800',
    content: 'Long form content goes here...'
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
          <Link to="/" className="flex items-center min-w-0 gap-2.5 hover:opacity-80 transition-opacity">
            <img src="/icon.png" alt="LLM Arena Icon" className="h-[32px] w-[32px] object-contain shrink-0" />
            <span className="font-semibold text-[15px] text-[#111111] tracking-tight leading-none whitespace-nowrap">LLM Arena</span>
          </Link>
        </header>
        <div className="max-w-[800px] mx-auto px-6 pt-16 pb-24">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#6E6D6A] bg-[#F1EFEA] hover:bg-[#E5E3DF] px-3 py-1.5 rounded-md transition-colors mb-8"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            Back to Blog
          </Link>
          
          <h1 className="text-[48px] text-[#2E2E2D] leading-[1.1] mb-5 tracking-tight font-serif" style={{ fontFamily: '"Playfair Display", serif' }}>
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

          <div className="prose prose-lg prose-stone max-w-none text-[#4A4948]">
            <p className="lead">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
            <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.</p>
            <h3>The Core Challenge</h3>
            <p>Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
          </div>
          
          <div className="mt-16 pt-12 border-t border-[#EAEAEA]">
            <div className="bg-[#F4F2EF] rounded-2xl p-8 md:p-10 text-center">
              <h2 className="text-[28px] font-serif text-[#111111] mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>Ready to get involved?</h2>
              <p className="text-[16px] text-[#666666] mb-8 max-w-[500px] mx-auto">
                Join our open-source community to help shape the future of LLM evaluation and benchmarking.
              </p>
              <a href="https://github.com/Studio1-OSS/awesome-llm-benchmarks" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[8px] text-white text-[15px] font-medium transition-all shadow-[0_4px_14px_rgba(0,0,0,0.1),inset_0_1px_0px_rgba(255,255,255,0.15)] bg-gradient-to-b from-[#333333] to-[#111111] hover:from-[#444444] hover:to-[#222222] border border-[#111111]">
                <svg className="w-[18px] h-[18px] invert opacity-90" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                Contribute Now {githubStars !== null && <span className="opacity-80 font-normal">({githubStars.toLocaleString()} ★)</span>}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#171717] font-sans overflow-x-hidden selection:bg-[#EAEAEA]">
      <header className="sticky top-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-[#EAEAEA] h-16 flex items-center justify-between px-6">
        <Link to="/" className="flex items-center min-w-0 gap-2.5 hover:opacity-80 transition-opacity">
          <img src="/icon.png" alt="LLM Arena Icon" className="h-[32px] w-[32px] object-contain shrink-0" />
          <span className="font-semibold text-[15px] text-[#111111] tracking-tight leading-none whitespace-nowrap">LLM Arena</span>
        </Link>
      </header>

        <div className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-[42px] font-semibold text-[#111111] tracking-tight mb-4">Latest Updates</h1>
            <p className="text-[17px] text-[#666666]">News, insights, and stories from the LLM Arena team.</p>
          </div>
          <a href="https://github.com/Studio1-OSS/awesome-llm-benchmarks" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-[14px] font-medium transition-all shadow-[0_4px_14px_rgba(0,0,0,0.1),inset_0_1px_0px_rgba(255,255,255,0.15)] bg-gradient-to-b from-[#333333] to-[#111111] hover:from-[#444444] hover:to-[#222222] border border-[#111111]">
            <svg className="w-[16px] h-[16px] invert opacity-90" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            Contribute Now {githubStars !== null && <span className="opacity-70 font-normal">({githubStars.toLocaleString()} ★)</span>}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map(post => (
            <a 
              key={post.id}
              href={`#blog/${post.id}`}
              className="group flex flex-col bg-[#F4F2EF] rounded-2xl p-4 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1"
            >
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-5">
                <img src={post.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
                  <svg className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-[#EAEAEA] bg-white py-20 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-[32px] font-serif text-[#111111] mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>Help Shape the Future of LLM Evaluation</h2>
          <p className="text-[17px] text-[#666666] mb-10 max-w-[600px] mx-auto">
            LLM Arena is an open-source initiative. We rely on community contributions to add new models, environments, and benchmarking tasks.
          </p>
          <a href="https://github.com/Studio1-OSS/awesome-llm-benchmarks" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[8px] text-white text-[15px] font-medium transition-all shadow-[0_4px_14px_rgba(0,0,0,0.1),inset_0_1px_0px_rgba(255,255,255,0.15)] bg-gradient-to-b from-[#333333] to-[#111111] hover:from-[#444444] hover:to-[#222222] border border-[#111111]">
            <svg className="w-[18px] h-[18px] invert opacity-90" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            Contribute Now {githubStars !== null && <span className="opacity-80 font-normal">({githubStars.toLocaleString()} ★)</span>}
          </a>
        </div>
      </div>
    </div>
  );
}

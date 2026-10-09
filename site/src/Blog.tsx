import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const POSTS = [
  {
    id: 'firefighting-to-autopilot',
    title: 'From Firefighting to Autopilot: A Support Playbook',
    subtitle: 'How a 12-person support team cut 30 weekly hours of repetitive tickets.',
    date: 'Jun 16, 2026',
    readTime: '6 min read',
    image: 'https://framerusercontent.com/images/89wYJHZRlIHHAeJ2fb38UtX5wI.png?scale-down-to=1024&width=1344&height=896',
    content: 'Long form content goes here...'
  },
  {
    id: 'when-to-let-ai-reply',
    title: 'When to Let AI Reply, and When to Call a Human',
    subtitle: 'Navigating the handoff between automated agents and your customer success team.',
    date: 'Jun 2, 2026',
    readTime: '4 min read',
    image: 'https://framerusercontent.com/images/74Pklphfry6xPsPBdf6NPOlkfro.png?scale-down-to=1024&width=1344&height=896',
    content: 'Long form content goes here...'
  },
  {
    id: 'when-to-bring-in-human',
    title: 'When to Let AI Reply — and When to Bring in a Human',
    subtitle: 'Best practices for human-in-the-loop AI deployments.',
    date: 'Jun 10, 2026',
    readTime: '5 min read',
    image: 'https://framerusercontent.com/images/TeeEjm2aY6UxjlgIZ9MC2hTefg.png?scale-down-to=1024&width=1344&height=896',
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
                  <li><Link to="/" className="hover:text-[#111111] transition-colors">Benchmarks</Link></li>
                  <li><Link to="/" className="hover:text-[#111111] transition-colors">Methodologies</Link></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[15px] text-[#111111] mb-6">Company</h4>
                <ul className="space-y-3.5 text-[14px] text-[#666666]">
                  <li><Link to="/" className="hover:text-[#111111] transition-colors">About</Link></li>
                  <li><Link to="/" className="hover:text-[#111111] transition-colors">Contributors</Link></li>
                  <li><a href="https://github.com/Studio1-OSS/awesome-llm-benchmarks" target="_blank" rel="noreferrer" className="hover:text-[#111111] transition-colors">GitHub</a></li>
                  <li><Link to="/blog" className="hover:text-[#111111] transition-colors">Blog</Link></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[15px] text-[#111111] mb-6">Resources</h4>
                <ul className="space-y-3.5 text-[14px] text-[#666666]">
                  <li><Link to="/" className="hover:text-[#111111] transition-colors">Documentation</Link></li>
                  <li><Link to="/" className="hover:text-[#111111] transition-colors">Updates</Link></li>
                  <li><Link to="/" className="hover:text-[#111111] transition-colors">FAQ</Link></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[15px] text-[#111111] mb-6">Legal</h4>
                <ul className="space-y-3.5 text-[14px] text-[#666666]">
                  <li><Link to="/" className="hover:text-[#111111] transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/" className="hover:text-[#111111] transition-colors">Terms of Service</Link></li>
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

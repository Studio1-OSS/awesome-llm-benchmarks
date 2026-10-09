import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#blog/')) {
      setPostId(hash.replace('#blog/', ''));
    } else {
      setPostId(null);
    }
  }, []);

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
          <a href="#" className="flex items-center min-w-0 gap-2.5 hover:opacity-80 transition-opacity">
            <img src="/icon.png" alt="LLM Arena Icon" className="h-[32px] w-[32px] object-contain shrink-0" />
            <span className="font-semibold text-[15px] text-[#111111] tracking-tight leading-none whitespace-nowrap">LLM Arena</span>
          </a>
        </header>
        <div className="max-w-[800px] mx-auto px-6 pt-16 pb-24">
          <button 
            onClick={() => window.location.hash = '#blog'}
            className="flex items-center gap-1.5 text-[12px] font-medium text-[#6E6D6A] bg-[#F1EFEA] hover:bg-[#E5E3DF] px-3 py-1.5 rounded-md transition-colors mb-8"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            Back to Blog
          </button>
          
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#171717] font-sans overflow-x-hidden selection:bg-[#EAEAEA]">
      <header className="sticky top-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-[#EAEAEA] h-16 flex items-center justify-between px-6">
        <a href="#" className="flex items-center min-w-0 gap-2.5 hover:opacity-80 transition-opacity">
          <img src="/icon.png" alt="LLM Arena Icon" className="h-[32px] w-[32px] object-contain shrink-0" />
          <span className="font-semibold text-[15px] text-[#111111] tracking-tight leading-none whitespace-nowrap">LLM Arena</span>
        </a>
      </header>

      <div className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="mb-16">
          <h1 className="text-[42px] font-semibold text-[#111111] tracking-tight mb-4">Latest Updates</h1>
          <p className="text-[17px] text-[#666666]">News, insights, and stories from the LLM Arena team.</p>
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
    </div>
  );
}

import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center font-sans selection:bg-[#EAEAEA] relative overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#EAE8E3]/40 to-transparent rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      
      {/* Header */}
      <header className="absolute top-0 w-full z-50 bg-transparent h-20 flex items-center px-8">
        <Link to="/" className="flex items-center min-w-0 gap-2.5 hover:opacity-80 transition-opacity">
          <img src="/icon.png" alt="LLM Arena Icon" className="h-[32px] w-[32px] object-contain shrink-0" />
          <span className="font-semibold text-[15px] text-[#111111] tracking-tight leading-none whitespace-nowrap">LLM Arena</span>
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center text-center px-6 max-w-2xl z-10">
        <div className="w-20 h-20 mb-8 rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-[#E5E3DF] flex items-center justify-center">
          <svg className="w-8 h-8 text-[#9E9D9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h1 className="text-[120px] font-bold text-[#111111] leading-none tracking-tighter mb-4 opacity-10">
          404
        </h1>
        
        <h2 className="text-[32px] font-serif text-[#2E2E2D] mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
          Page Hallucinated
        </h2>
        
        <p className="text-[16px] text-[#6E6D6A] mb-10 max-w-md mx-auto leading-relaxed">
          It looks like this page was confidently hallucinated by the router. 
          Let's get you back to grounded reality.
        </p>
        
        <Link 
          to="/"
          className="flex items-center gap-2 px-8 py-3.5 rounded-[8px] text-white text-[15px] font-medium transition-all shadow-[0_4px_14px_rgba(0,0,0,0.1),inset_0_1px_0px_rgba(255,255,255,0.15)] bg-gradient-to-b from-[#333333] to-[#111111] hover:from-[#444444] hover:to-[#222222] border border-[#111111]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

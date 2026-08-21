import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CivicEyeLogo from '../components/ui/CivicEyeLogo';
import { Shield, Lock, User, Globe, ArrowRight, Eye, Radio, Crosshair, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Login = () => {
  const navigate = useNavigate();
  const [officerId, setOfficerId] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('en');
  const isHindi = language === 'hi';
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!officerId || !password) { alert('Enter credentials.'); return; }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-surv-bg flex flex-col justify-between relative overflow-hidden font-sans scan-lines">
      {/* Background grid & mountain */}
      <div className="absolute inset-0 z-0 pointer-events-none grid-overlay">
        <svg className="absolute bottom-0 w-full h-auto text-surv-surface opacity-50" viewBox="0 0 1440 380" fill="none" preserveAspectRatio="none">
          <path d="M0 380 L180 180 L360 270 L580 90 L820 250 L1080 60 L1280 200 L1440 110 L1440 380 Z" fill="currentColor"/>
          <path d="M0 380 L240 240 L480 320 L760 180 L980 290 L1200 140 L1440 260 L1440 380 Z" fill="var(--surv-surface)" opacity="0.9"/>
        </svg>
      </div>

      {/* Top strip */}
      <header className="relative z-10 bg-surv-surface/90 backdrop-blur-md border-b border-surv-border text-surv-muted h-10 flex items-center justify-between px-6 lg:px-12 text-[10px] font-mono tracking-wider">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
          <span className="text-surv-accent font-bold uppercase opacity-80">
            {isHindi ? 'नागरिक निगरानी प्रणाली' : 'CIVIC SURVEILLANCE PLATFORM'}
          </span>
          <span className="opacity-20 hidden sm:inline">│</span>
          <span className="hidden sm:inline uppercase opacity-80">
            {isHindi ? 'नगरीय निगरानी प्रभाग' : 'URBAN SURVEILLANCE DIVISION'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center p-1.5 rounded hover:bg-surv-accent-bg text-surv-muted hover:text-surv-accent transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={12} /> : <Moon size={12} />}
          </button>
          
          <span className="opacity-20 hidden sm:inline">│</span>

          <div className="flex items-center gap-1 bg-surv-accent-bg rounded border border-surv-border p-0.5">
            <Globe size={10} className="opacity-40 ml-1 text-surv-accent" />
            <button onClick={() => setLanguage('en')} className={`px-2 py-0.5 rounded text-[9px] font-bold ${language === 'en' ? 'bg-surv-accent text-white' : 'hover:text-surv-text'}`}>EN</button>
            <button onClick={() => setLanguage('hi')} className={`px-2 py-0.5 rounded text-[9px] font-bold ${language === 'hi' ? 'bg-surv-accent text-white' : 'hover:text-surv-text'}`}>हिं</button>
          </div>
        </div>
      </header>

      {/* Login Card */}
      <main className="relative z-10 flex items-center justify-center p-4 my-auto">
        <div className="w-full max-w-md bg-surv-surface border border-surv-border rounded-2xl p-8 surv-glow relative overflow-hidden">
          {/* HUD corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-surv-border-strong"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-surv-border-strong"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-surv-border-strong"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-surv-border-strong"></div>
          
          {/* Top glow accent */}
          <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-surv-accent to-transparent opacity-40"></div>

          <div className="text-center mb-7">
            <CivicEyeLogo size={54} className="mx-auto mb-3" />
            <h1 className="font-display text-2xl font-bold tracking-[0.15em] text-surv-accent">CIVICEYE</h1>
            <p className="text-[10px] font-mono text-surv-success opacity-80 mt-1 uppercase tracking-widest">
              {isHindi ? 'एआई निगरानी प्रणाली' : 'AI SURVEILLANCE SYSTEM'}
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-mono text-surv-muted bg-surv-accent-bg border border-surv-border px-3 py-1 rounded-lg uppercase tracking-widest">
              <Crosshair size={10} className="text-surv-accent opacity-60" />
              SECURE ACCESS TERMINAL
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono font-bold text-surv-muted mb-1.5 uppercase tracking-widest">
                {isHindi ? 'अधिकारी आईडी' : 'OPERATOR ID'}
              </label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40 text-surv-accent" />
                <input 
                  type="text" value={officerId} onChange={(e) => setOfficerId(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-surv-bg border border-surv-border rounded-lg text-[11px] font-mono font-bold text-surv-accent placeholder-surv-muted focus:outline-none focus:border-surv-border-strong transition-all"
                  placeholder="OPERATOR-XXXX" required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-surv-muted mb-1.5 uppercase tracking-widest">
                {isHindi ? 'पासवर्ड' : 'ACCESS KEY'}
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40 text-surv-accent" />
                <input 
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-surv-bg border border-surv-border rounded-lg text-[11px] font-mono font-bold text-surv-accent placeholder-surv-muted focus:outline-none focus:border-surv-border-strong transition-all"
                  placeholder="••••••••••" required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-surv-muted py-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-surv-border bg-surv-bg text-surv-accent focus:ring-surv-accent-bg" />
                <span className="uppercase tracking-wider">{isHindi ? 'सत्र बनाये रखें' : 'Keep Session'}</span>
              </label>
              <a href="#reset" onClick={(e) => { e.preventDefault(); alert('Contact NIC State Admin.'); }} className="text-surv-accent opacity-60 hover:opacity-100 uppercase tracking-wider">
                {isHindi ? 'सहायता' : 'Reset Access'}
              </a>
            </div>

            <button type="submit" className="w-full py-3 px-4 bg-surv-accent-bg hover:bg-surv-accent-hover text-surv-accent font-mono font-bold text-[11px] rounded-lg border border-surv-border transition-all flex items-center justify-center gap-2 group uppercase tracking-widest mt-2 surv-glow">
              <Eye size={15} />
              <span>{isHindi ? 'सिस्टम में प्रवेश' : 'AUTHORIZE ACCESS'}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </main>

      <footer className="relative z-10 text-center py-3 text-[9px] font-mono text-surv-muted border-t border-surv-border bg-surv-bg/80 tracking-widest uppercase">
        <p>CIVIC SURVEILLANCE PLATFORM</p>
        <p className="opacity-60 mt-0.5">NIC STATE DATA CENTER • ENCRYPTED CHANNEL</p>
      </footer>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Settings as SettingsIcon, Bell, Shield, MapPin, Monitor, Server, Crosshair, Plus, Database, Key } from 'lucide-react';

export const Settings = () => {
  const { language = 'en' } = useOutletContext() || {};
  const isHindi = language === 'hi';
  const [activeTab, setActiveTab] = useState('system');

  const tabs = [
    { id: 'system', label: 'SYSTEM CONFIG', icon: Server },
    { id: 'ai', label: 'AI PARAMETERS', icon: Crosshair },
    { id: 'cctv', label: 'RTSP ENDPOINTS', icon: Monitor },
    { id: 'security', label: 'ACCESS CONTROL', icon: Shield }
  ];

  return (
    <div className="space-y-5 pb-12 max-w-5xl">
      <div className="relative bg-surv-surface rounded-xl border border-surv-border p-5 overflow-hidden">
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-surv-accent to-transparent opacity-30"></div>
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-surv-border-strong"></div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <SettingsIcon size={16} className="text-surv-accent" />
              <h1 className="font-display text-lg font-bold tracking-[0.1em] text-surv-accent uppercase">
                {isHindi ? 'सिस्टम कॉन्फ़िगरेशन' : 'CORE CONFIGURATION'}
              </h1>
            </div>
            <p className="text-[10px] text-surv-muted font-mono tracking-wide uppercase">RESTRICTED ACCESS — STATE ADMIN LEVEL 4 REQUIRED</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 space-y-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[10px] font-mono font-bold transition-all uppercase tracking-wider border ${
                activeTab === tab.id 
                  ? 'bg-surv-accent-bg text-surv-accent border-surv-border surv-glow' 
                  : 'bg-surv-surface text-surv-muted border-transparent hover:bg-surv-surface-hover hover:border-surv-border'
              }`}
            >
              <tab.icon size={14} className={activeTab === tab.id ? 'text-surv-accent' : 'text-surv-muted'} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-surv-surface rounded-xl border border-surv-border p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong"></div>
          
          {activeTab === 'system' && (
            <div className="space-y-6">
              <h2 className="text-sm font-mono font-bold text-surv-text uppercase tracking-wider mb-4 border-b border-surv-border pb-2">GLOBAL PREFERENCES</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[9px] font-mono font-bold text-surv-muted mb-2 uppercase tracking-widest">DATA RETENTION POLICY (DAYS)</label>
                  <input type="number" defaultValue={30} className="w-full bg-surv-bg border border-surv-border rounded-lg px-3 py-2 text-[11px] font-mono font-bold text-surv-accent focus:outline-none focus:border-surv-border-strong" />
                </div>
                <div>
                  <label className="block text-[9px] font-mono font-bold text-surv-muted mb-2 uppercase tracking-widest">DEFAULT SURVEILLANCE SECTOR</label>
                  <select className="w-full bg-surv-bg border border-surv-border rounded-lg px-3 py-2 text-[11px] font-mono font-bold text-surv-accent focus:outline-none focus:border-surv-border-strong">
                    <option>ALL UTTARAKHAND</option>
                    <option>DEHRADUN</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-surv-border">
                <button className="px-5 py-2.5 bg-surv-accent-bg hover:bg-surv-accent-hover text-surv-accent font-mono font-bold text-[10px] rounded-lg border border-surv-border transition-all uppercase tracking-wider surv-glow">
                  SAVE SYSTEM CONFIG
                </button>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-6">
              <h2 className="text-sm font-mono font-bold text-surv-text uppercase tracking-wider mb-4 border-b border-surv-border pb-2">NEURAL NETWORK TUNING</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-[9px] font-mono font-bold text-surv-muted uppercase tracking-widest">DETECTION CONFIDENCE THRESHOLD</label>
                    <span className="text-[9px] font-mono font-bold text-surv-accent">75%</span>
                  </div>
                  <input type="range" min="50" max="99" defaultValue="75" className="w-full h-1 bg-surv-bg rounded-lg appearance-none cursor-pointer" style={{ accentColor: 'var(--surv-accent)' }} />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-[9px] font-mono font-bold text-surv-muted uppercase tracking-widest">THROTTLE / FRAME SKIP</label>
                    <span className="text-[9px] font-mono font-bold text-surv-accent">5 FRAMES</span>
                  </div>
                  <input type="range" min="1" max="30" defaultValue="5" className="w-full h-1 bg-surv-bg rounded-lg appearance-none cursor-pointer" style={{ accentColor: 'var(--surv-accent)' }} />
                </div>
              </div>

              <div className="pt-4 border-t border-surv-border">
                <button className="px-5 py-2.5 bg-surv-accent-bg hover:bg-surv-accent-hover text-surv-accent font-mono font-bold text-[10px] rounded-lg border border-surv-border transition-all uppercase tracking-wider surv-glow">
                  UPDATE AI PARAMETERS
                </button>
              </div>
            </div>
          )}

          {activeTab === 'cctv' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-surv-border pb-2 mb-4">
                <h2 className="text-sm font-mono font-bold text-surv-text uppercase tracking-wider">RTSP ENDPOINT INGEST</h2>
                <button className="text-[9px] font-mono font-bold text-surv-accent hover:opacity-80 flex items-center gap-1 uppercase tracking-wider"><Plus size={12}/> ADD STREAM</button>
              </div>

              <div className="text-center py-12 border border-surv-border border-dashed rounded-lg bg-surv-bg">
                <Monitor size={24} className="mx-auto text-surv-muted mb-2 opacity-50" />
                <p className="text-[10px] text-surv-muted font-mono tracking-wide uppercase">NO STREAMS CONFIGURED. CLICK 'ADD STREAM' TO MOUNT RTSP URI.</p>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-sm font-mono font-bold text-surv-text uppercase tracking-wider mb-4 border-b border-surv-border pb-2">ACCESS CONTROL & API KEYS</h2>
              
              <div>
                <label className="block text-[9px] font-mono font-bold text-surv-muted mb-2 uppercase tracking-widest">REST API MASTER KEY</label>
                <div className="flex gap-2">
                  <input type="password" value="************************" readOnly className="flex-1 bg-surv-bg border border-surv-border rounded-lg px-3 py-2 text-[11px] font-mono font-bold text-surv-text focus:outline-none" />
                  <button className="px-4 py-2 bg-surv-bg border border-surv-border rounded-lg text-[10px] font-mono font-bold text-surv-text hover:bg-surv-surface-hover uppercase tracking-wider">REGENERATE</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;

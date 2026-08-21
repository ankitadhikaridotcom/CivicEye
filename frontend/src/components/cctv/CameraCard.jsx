import React from 'react';
import { Camera, MapPin, Eye, Activity, ShieldAlert, Cpu } from 'lucide-react';

const CameraCard = ({ camera }) => {
  return (
    <div className="bg-surv-surface rounded-xl border border-surv-border overflow-hidden relative group hover:border-surv-border-strong transition-all">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong z-20"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-surv-border-strong z-20"></div>
      
      {/* Video Feed Area */}
      <div className="relative aspect-video bg-surv-bg border-b border-surv-border">
        <div className="absolute inset-0 scan-lines z-10 pointer-events-none"></div>
        <img 
          src={camera.url} 
          alt={camera.name}
          className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:opacity-100 transition-opacity"
        />
        
        {/* Status overlays */}
        <div className="absolute top-2 left-2 z-20 flex gap-2">
          <span className="bg-surv-success-bg backdrop-blur-md text-surv-success text-[8px] font-mono font-bold px-1.5 py-0.5 rounded flex items-center gap-1 border border-surv-border uppercase tracking-widest shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-surv-success animate-pulse"></span> REC
          </span>
          {camera.activeIssues > 0 && (
            <span className="bg-surv-critical-bg backdrop-blur-md text-surv-critical text-[8px] font-mono font-bold px-1.5 py-0.5 rounded flex items-center gap-1 border border-surv-critical uppercase tracking-widest animate-pulse shadow-lg">
              <ShieldAlert size={10} /> THREAT: {camera.activeIssues}
            </span>
          )}
        </div>
        
        {/* AI Overlays (Simulated bounding boxes) */}
        {camera.activeIssues > 0 && (
          <div className="absolute inset-0 z-10 m-4 border-2 border-surv-critical bg-surv-critical-bg opacity-80 rounded pointer-events-none">
            <div className="bg-surv-critical text-white text-[7px] font-mono px-1 inline-block absolute -top-3 -left-[2px] uppercase tracking-wider">AI DETECT: 94%</div>
          </div>
        )}

        <div className="absolute bottom-2 right-2 z-20 text-[8px] font-mono text-surv-accent bg-surv-surface/90 backdrop-blur px-1 rounded border border-surv-border uppercase tracking-widest">
          CAM-{camera.id.slice(-4)}
        </div>
      </div>

      {/* Info Area */}
      <div className="p-3">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-mono font-bold text-[11px] text-surv-text uppercase tracking-wider">{camera.name}</h3>
            <p className="text-[9px] text-surv-muted font-mono flex items-center gap-1 mt-0.5 tracking-wide uppercase">
              <MapPin size={10} className="text-surv-accent opacity-50" /> {camera.city}
            </p>
          </div>
          <div className="w-7 h-7 rounded bg-surv-accent-bg border border-surv-border flex items-center justify-center text-surv-accent">
            <Camera size={14} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-surv-border">
          <div className="text-center bg-surv-bg rounded py-1 border border-surv-border">
            <div className="text-[8px] font-mono text-surv-muted uppercase tracking-widest mb-0.5">AI ENGINE</div>
            <div className="text-[9px] font-mono font-bold text-surv-success flex justify-center items-center gap-1"><Cpu size={10}/> ACTIVE</div>
          </div>
          <div className="text-center bg-surv-bg rounded py-1 border border-surv-border">
            <div className="text-[8px] font-mono text-surv-muted uppercase tracking-widest mb-0.5">THREATS</div>
            <div className={`text-[9px] font-mono font-bold ${camera.activeIssues > 0 ? 'text-surv-critical' : 'text-surv-text'}`}>
              {camera.activeIssues} FOUND
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraCard;

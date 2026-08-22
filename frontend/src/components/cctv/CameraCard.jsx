import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Camera, MapPin, Eye, Activity, ShieldAlert, Cpu, Maximize2, 
  Settings, ExternalLink, Image, AlertTriangle, ShieldCheck
} from 'lucide-react';

const CameraCard = ({ camera }) => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isLive = camera.status === 'LIVE';
  const hasIncident = camera.aiStatus && camera.aiStatus.includes('Detected');

  const triggerSnapshot = () => {
    alert(`Snapshot captured successfully from ${camera.name} (${camera.id}) at ${new Date().toLocaleTimeString()}. Saved to archive.`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative group hover:border-indigo-500 transition-all flex flex-col h-full shadow-sm">
      {/* Video Feed Area */}
      <div className="relative aspect-video bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
        <img 
          src={camera.imagePlaceholder} 
          alt={camera.name}
          className={`w-full h-full object-cover transition-opacity ${
            isLive ? 'opacity-85 group-hover:opacity-100' : 'opacity-30 grayscale'
          }`}
        />
        
        {/* Status overlays */}
        <div className="absolute top-2 left-2 z-20 flex flex-wrap gap-1.5">
          <span className={`backdrop-blur-md text-[8px] font-mono font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 border uppercase tracking-wider shadow-lg ${
            isLive 
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
              : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
            {camera.status}
          </span>

          {hasIncident && (
            <span className="bg-rose-500/20 backdrop-blur-md text-rose-400 text-[8px] font-mono font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 border border-rose-500/35 uppercase tracking-wider animate-pulse shadow-lg">
              <ShieldAlert size={10} /> {camera.type.toUpperCase()}: {Math.round(camera.confidence * 100)}%
            </span>
          )}
        </div>
        
        {/* AI Overlays (Simulated bounding boxes) */}
        {hasIncident && isLive && (
          <div className="absolute inset-0 z-10 m-4 border-2 border-rose-500 bg-rose-500/5 rounded pointer-events-none">
            <div className="bg-rose-600 text-white text-[7px] font-mono px-1 inline-block absolute -top-3 -left-[2px] uppercase tracking-wider rounded">
              AI DETECT: {camera.type} ({Math.round(camera.confidence * 100)}%)
            </div>
          </div>
        )}

        <div className="absolute bottom-2 right-2 z-20 text-[9px] font-mono font-bold text-slate-350 bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-slate-800 uppercase tracking-wider">
          {camera.id}
        </div>
      </div>

      {/* Info Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="mb-3">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-xs text-slate-800 dark:text-white uppercase tracking-tight line-clamp-1">{camera.name}</h3>
            <span className="p-1 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 text-slate-400 shrink-0">
              <Camera size={12} />
            </span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
            <MapPin size={10} className="text-slate-400" /> {camera.location} • {camera.ward}
          </p>
        </div>

        <div>
          {/* Diagnostic Grid */}
          <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-50 dark:bg-slate-850 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-slate-400 block mb-0.5">AI Engine</span>
              <span className={`font-semibold flex items-center gap-1 ${isLive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
                <Cpu size={10} /> {isLive ? 'ACTIVE' : 'STANDBY'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Analytic Status</span>
              <span className={`font-semibold ${hasIncident ? 'text-rose-500 font-bold' : 'text-emerald-500'}`}>
                {camera.aiStatus}
              </span>
            </div>
          </div>

          {/* Action overlay */}
          <div className="grid grid-cols-4 gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button 
              onClick={triggerSnapshot}
              title="Capture Snapshot"
              className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-750 flex items-center justify-center transition-colors"
            >
              <Image size={12} />
            </button>
            <button 
              onClick={() => alert(`Showing camera properties for ${camera.id}`)}
              title="Camera Settings"
              className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-750 flex items-center justify-center transition-colors"
            >
              <Settings size={12} />
            </button>
            <Link 
              to="/ai-analysis"
              title="AI Analysis Hub"
              className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-750 flex items-center justify-center transition-colors"
            >
              <Cpu size={12} />
            </Link>
            <button 
              onClick={() => {
                if (hasIncident) {
                  // Direct to issues list filtered by city
                  navigate(`/issues?city=${camera.location}`);
                } else {
                  alert("No active violations detected on this stream.");
                }
              }}
              title="Inspect Violations"
              className={`p-2 rounded-xl border flex items-center justify-center transition-colors ${
                hasIncident 
                  ? 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-600 dark:bg-rose-950/20 dark:border-rose-900/40 dark:text-rose-400' 
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-750 text-slate-400'
              }`}
            >
              <Maximize2 size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraCard;

import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { BrainCircuit, UploadCloud, RefreshCw, Layers, ShieldAlert, Cpu, Eye, Image as ImageIcon } from 'lucide-react';

export const AIAnalysis = () => {
  const { language = 'en' } = useOutletContext() || {};
  const isHindi = language === 'hi';
  const [analyzing, setAnalyzing] = useState(false);

  const handleUpload = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      alert('Analysis complete. No threats detected in baseline mode.');
    }, 2000);
  };

  return (
    <div className="space-y-5 pb-12 max-w-5xl">
      <div className="relative bg-surv-surface rounded-xl border border-surv-border p-5 overflow-hidden">
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-surv-accent to-transparent opacity-30"></div>
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-surv-border-strong"></div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BrainCircuit size={16} className="text-surv-accent" />
              <h1 className="font-display text-lg font-bold tracking-[0.1em] text-surv-accent uppercase">
                {isHindi ? 'एआई इंजन' : 'NEURAL PROCESSING ENGINE'}
              </h1>
            </div>
            <p className="text-[10px] text-surv-muted font-mono tracking-wide uppercase">MANUAL IMAGE INGEST & YOLOv11 CLASSIFICATION</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono font-bold bg-surv-success-bg text-surv-success border border-surv-border px-3 py-1.5 rounded-lg flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-surv-success animate-pulse"></span>
              MODEL v2.4 ACTIVE
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Upload Panel */}
        <div className="bg-surv-surface rounded-xl border border-surv-border p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong"></div>
          
          <h2 className="text-sm font-mono font-bold text-surv-text uppercase tracking-wider mb-4 border-b border-surv-border pb-2 flex items-center gap-2">
            <UploadCloud size={14} className="text-surv-accent opacity-60" /> INGEST TARGET MEDIA
          </h2>
          
          <div className="border-2 border-dashed border-surv-border rounded-xl p-8 text-center hover:bg-surv-accent-bg transition-all cursor-pointer bg-surv-bg">
            <ImageIcon size={32} className="mx-auto text-surv-muted mb-3 opacity-50" />
            <p className="text-[11px] font-mono font-bold text-surv-accent uppercase tracking-wider mb-1">DRAG & DROP SECURE FILES</p>
            <p className="text-[9px] text-surv-muted font-mono tracking-wide">SUPPORTED FORMATS: JPG, PNG, WEBP (MAX 10MB)</p>
            <button onClick={handleUpload} className="mt-6 px-5 py-2.5 bg-surv-accent-bg hover:bg-surv-accent-hover text-surv-accent rounded-lg text-[10px] font-mono font-bold border border-surv-border transition-all uppercase tracking-wider surv-glow">
              BROWSE SECURE STORAGE
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-surv-surface rounded-xl border border-surv-border p-6 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong"></div>
          
          <h2 className="text-sm font-mono font-bold text-surv-text uppercase tracking-wider mb-4 border-b border-surv-border pb-2 flex items-center gap-2">
            <Cpu size={14} className="text-surv-accent opacity-60" /> ANALYSIS TELEMETRY
          </h2>
          
          <div className="flex-1 flex flex-col items-center justify-center border border-surv-border rounded-xl bg-surv-bg p-6 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none scan-lines"></div>
            
            {analyzing ? (
              <div className="text-center relative z-10">
                <RefreshCw size={28} className="animate-spin text-surv-accent mx-auto mb-3" />
                <p className="text-[10px] font-mono font-bold text-surv-accent uppercase tracking-wider animate-pulse">PROCESSING NEURAL NETWORK...</p>
                <div className="w-48 h-1 bg-surv-border rounded-full mx-auto mt-3 overflow-hidden">
                  <div className="h-full bg-surv-accent rounded-full animate-[scan-sweep_2s_linear_infinite]" style={{ width: '30%' }}></div>
                </div>
              </div>
            ) : (
              <div className="text-center relative z-10">
                <div className="w-12 h-12 rounded-xl bg-surv-accent-bg border border-surv-border text-surv-muted flex items-center justify-center mx-auto mb-3">
                  <Eye size={24} />
                </div>
                <p className="text-[10px] font-mono text-surv-muted uppercase tracking-widest">AWAITING MEDIA INGEST FOR PROCESSING</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;

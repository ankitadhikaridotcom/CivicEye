import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockIssues } from '../data/mockData';
import { ArrowLeft, Clock, MapPin, Building2, User, Camera, ShieldAlert, FileText, Crosshair } from 'lucide-react';

export const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const issue = mockIssues.find(i => i.id === id);

  if (!issue) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-surv-surface rounded-xl border border-surv-border border-dashed">
        <h2 className="text-sm font-mono font-bold text-surv-muted uppercase tracking-wider">INTEL RECORD NOT FOUND</h2>
        <button onClick={() => navigate('/issues')} className="mt-4 text-[10px] font-mono text-surv-accent hover:text-surv-accent-hover uppercase tracking-wider border border-surv-border px-4 py-2 rounded-lg bg-surv-accent-bg">
          ← RETURN TO LOG
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-12 max-w-6xl mx-auto">
      {/* HUD Navigation */}
      <div className="flex items-center justify-between bg-surv-surface rounded-xl border border-surv-border p-3">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-mono font-bold text-surv-muted hover:text-surv-accent uppercase tracking-wider px-3 py-1.5 rounded hover:bg-surv-accent-bg transition-colors">
          <ArrowLeft size={14} /> BACK TO LOG
        </button>
        <span className="text-[10px] font-mono font-bold text-surv-accent uppercase tracking-widest bg-surv-accent-bg border border-surv-border px-3 py-1 rounded-lg">
          RECORD: {issue.id}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Intel Panel */}
        <div className="lg:col-span-2 space-y-5">
          {/* Header Info */}
          <div className="bg-surv-surface rounded-xl border border-surv-border p-6 relative overflow-hidden">
            <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-surv-accent to-transparent opacity-30"></div>
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2.5 py-1 rounded text-[9px] font-mono font-bold uppercase tracking-widest border ${
                    issue.severity === 'Critical' ? 'bg-surv-critical-bg text-surv-critical border-surv-critical' :
                    issue.severity === 'High' ? 'bg-surv-warning-bg text-surv-warning border-surv-warning' :
                    issue.severity === 'Medium' ? 'bg-surv-accent-bg text-surv-accent border-surv-border' :
                    'bg-surv-bg text-surv-muted border-surv-border'
                  }`}>
                    {issue.severity} THREAT
                  </span>
                  <span className={`px-2.5 py-1 rounded text-[9px] font-mono font-bold uppercase tracking-widest border ${
                    issue.status === 'Resolved' ? 'bg-surv-success-bg text-surv-success border-surv-border' :
                    issue.status === 'Assigned' ? 'bg-surv-warning-bg text-surv-warning border-surv-border' :
                    'bg-surv-critical-bg text-surv-critical border-surv-critical'
                  }`}>
                    {issue.status}
                  </span>
                </div>
                <h1 className="text-xl font-display font-bold text-surv-text tracking-wide uppercase">{issue.type}</h1>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-surv-muted block mb-1">AI CONFIDENCE</span>
                <span className="text-lg font-mono font-bold text-surv-accent">{issue.confidence}%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-surv-border">
              <div>
                <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-surv-muted mb-1 uppercase tracking-widest"><Clock size={10}/> LOGGED AT</span>
                <span className="text-[10px] font-mono font-bold text-surv-text">{new Date(issue.timestamp).toLocaleString()}</span>
              </div>
              <div>
                <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-surv-muted mb-1 uppercase tracking-widest"><MapPin size={10}/> LOCATION</span>
                <span className="text-[10px] font-mono font-bold text-surv-text">{issue.location}, {issue.city}</span>
              </div>
              <div>
                <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-surv-muted mb-1 uppercase tracking-widest"><Camera size={10}/> CAMERA SOURCE</span>
                <span className="text-[10px] font-mono font-bold text-surv-text">{issue.cameraId}</span>
              </div>
              <div>
                <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-surv-muted mb-1 uppercase tracking-widest"><Building2 size={10}/> ASSIGNED DEPT</span>
                <span className="text-[10px] font-mono font-bold text-surv-text">{issue.department}</span>
              </div>
            </div>
          </div>

          {/* Media Evidence */}
          <div className="bg-surv-surface rounded-xl border border-surv-border p-6 relative">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong"></div>
            <h3 className="text-sm font-mono font-bold text-surv-text uppercase tracking-wider mb-4 flex items-center gap-2">
              <Crosshair size={14} className="text-surv-accent opacity-60" /> OPTICAL EVIDENCE
            </h3>
            <div className="aspect-video bg-surv-bg rounded-lg border border-surv-border overflow-hidden relative group">
              <img src={issue.imageUrl} alt="Violation" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" />
              <div className="absolute inset-0 border-2 border-surv-critical opacity-50 m-8 rounded bg-surv-critical-bg flex items-start p-2">
                <span className="bg-surv-critical text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase">{issue.type} {issue.confidence}%</span>
              </div>
              <div className="absolute inset-0 scan-lines pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-5">
          <div className="bg-surv-surface rounded-xl border border-surv-border p-5 relative">
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong"></div>
             <h3 className="text-[11px] font-mono font-bold text-surv-text uppercase tracking-wider mb-4 border-b border-surv-border pb-2">COMMAND ACTIONS</h3>
             
             <div className="space-y-3">
               <button className="w-full py-2.5 bg-surv-accent-bg hover:bg-surv-accent-hover border border-surv-border text-surv-accent text-[10px] font-mono font-bold rounded-lg transition-all uppercase tracking-wider surv-glow">
                 DISPATCH FIELD SQUAD
               </button>
               <button className="w-full py-2.5 bg-surv-bg hover:bg-surv-surface-hover border border-surv-border text-surv-text text-[10px] font-mono font-bold rounded-lg transition-all uppercase tracking-wider">
                 ESCALATE
               </button>
             </div>
          </div>
          
          <div className="bg-surv-surface rounded-xl border border-surv-border p-5 relative">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong"></div>
            <h3 className="text-[11px] font-mono font-bold text-surv-text uppercase tracking-wider mb-4 border-b border-surv-border pb-2">TIMELINE LOG</h3>
            <div className="space-y-4">
              <div className="flex gap-3 relative before:absolute before:left-[11px] before:top-6 before:bottom-0 before:w-px before:bg-surv-border">
                <div className="w-6 h-6 rounded-full bg-surv-accent-bg border border-surv-border flex items-center justify-center shrink-0 z-10">
                  <ShieldAlert size={10} className="text-surv-accent" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold text-surv-text uppercase tracking-wider">AI DETECTION REGISTERED</p>
                  <p className="text-[9px] text-surv-muted font-mono mt-0.5">{new Date(issue.timestamp).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;

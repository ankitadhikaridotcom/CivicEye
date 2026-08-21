import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, ArrowUpRight, Camera } from 'lucide-react';

const IssueTable = ({ issues }) => {
  if (!issues || issues.length === 0) return null;

  return (
    <div className="bg-surv-surface rounded-xl border border-surv-border overflow-hidden relative">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-surv-border-strong"></div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surv-bg border-b border-surv-border text-[9px] font-mono font-bold text-surv-muted uppercase tracking-widest">
              <th className="px-4 py-3 font-bold">THREAT ID</th>
              <th className="px-4 py-3 font-bold">CLASSIFICATION</th>
              <th className="px-4 py-3 font-bold">TELEMETRY</th>
              <th className="px-4 py-3 font-bold">SEVERITY</th>
              <th className="px-4 py-3 font-bold">STATUS</th>
              <th className="px-4 py-3 font-bold text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surv-border/50">
            {issues.map(issue => (
              <tr key={issue.id} className="hover:bg-surv-surface-hover transition-colors group">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-surv-accent-bg border border-surv-border flex items-center justify-center shrink-0">
                      <Camera size={14} className="text-surv-accent" />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-[10px] text-surv-text block uppercase tracking-wider">{issue.id}</span>
                      <span className="text-[9px] font-mono text-surv-accent opacity-60 uppercase tracking-widest">{issue.cameraId}</span>
                    </div>
                  </div>
                </td>
                
                <td className="px-4 py-3">
                  <span className="text-[11px] font-mono font-bold text-surv-text block uppercase tracking-wider">{issue.type}</span>
                  <span className="text-[9px] font-mono text-surv-muted block mt-0.5 tracking-wide">
                    AI CONFIDENCE: <span className="text-surv-accent font-bold">{issue.confidence}%</span>
                  </span>
                </td>
                
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1.5 text-[9px] font-mono text-surv-muted uppercase tracking-wide">
                      <MapPin size={10} className="text-surv-accent opacity-50" /> {issue.location}, {issue.city}
                    </span>
                    <span className="flex items-center gap-1.5 text-[9px] font-mono text-surv-muted uppercase tracking-wide">
                      <Clock size={10} className="text-surv-accent opacity-50" /> {new Date(issue.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                </td>
                
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-widest border inline-block ${
                    issue.severity === 'Critical' ? 'bg-surv-critical-bg text-surv-critical border-surv-critical' :
                    issue.severity === 'High' ? 'bg-surv-warning-bg text-surv-warning border-surv-warning' :
                    issue.severity === 'Medium' ? 'bg-surv-accent-bg text-surv-accent border-surv-border' :
                    'bg-surv-bg text-surv-muted border-surv-border'
                  }`}>
                    {issue.severity}
                  </span>
                </td>
                
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-widest border inline-block ${
                    issue.status === 'Resolved' ? 'bg-surv-success-bg text-surv-success border-surv-border' :
                    issue.status === 'Assigned' ? 'bg-surv-warning-bg text-surv-warning border-surv-warning' :
                    'bg-surv-critical-bg text-surv-critical border-surv-critical'
                  }`}>
                    {issue.status}
                  </span>
                </td>
                
                <td className="px-4 py-3 text-right">
                  <Link 
                    to={`/issues/${issue.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-surv-bg hover:bg-surv-accent-bg text-surv-accent text-[9px] font-mono font-bold rounded border border-surv-border transition-colors uppercase tracking-wider group-hover:border-surv-border-strong"
                  >
                    INTEL <ArrowUpRight size={12} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssueTable;

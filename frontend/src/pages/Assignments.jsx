import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { ClipboardList, MapPin } from 'lucide-react';

export const Assignments = () => {
  const { language = 'en' } = useOutletContext() || {};
  const isHindi = language === 'hi';

  const assignments = [
    { id: 'DSP-001', team: 'ALPHA-1', location: 'DEHRADUN SECTOR 4', status: 'EN ROUTE' },
    { id: 'DSP-002', team: 'BRAVO-2', location: 'HARIDWAR GHAT', status: 'ON SCENE' },
  ];

  return (
    <div className="space-y-5 pb-12">
      <div className="relative bg-surv-surface rounded-xl border border-surv-border p-5 overflow-hidden">
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-surv-accent to-transparent opacity-30"></div>
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-surv-border-strong"></div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ClipboardList size={16} className="text-surv-accent" />
              <h1 className="font-display text-lg font-bold tracking-[0.1em] text-surv-accent uppercase">
                {isHindi ? 'सक्रिय डिस्पैच' : 'ACTIVE DISPATCH LOG'}
              </h1>
            </div>
            <p className="text-[10px] text-surv-muted font-mono tracking-wide uppercase">FIELD SQUAD DEPLOYMENT TRACKER</p>
          </div>
        </div>
      </div>

      <div className="bg-surv-surface rounded-xl border border-surv-border overflow-hidden relative">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong"></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surv-bg border-b border-surv-border text-[9px] font-mono font-bold text-surv-muted uppercase tracking-widest">
                <th className="px-4 py-3">DISPATCH ID</th>
                <th className="px-4 py-3">FIELD SQUAD</th>
                <th className="px-4 py-3">TARGET LOCUS</th>
                <th className="px-4 py-3">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surv-border/50">
              {assignments.map(assignment => (
                <tr key={assignment.id} className="hover:bg-surv-accent-bg/30 transition-colors">
                  <td className="px-4 py-3 text-[10px] font-mono font-bold text-surv-accent">{assignment.id}</td>
                  <td className="px-4 py-3 text-[11px] font-mono font-bold text-surv-text">{assignment.team}</td>
                  <td className="px-4 py-3 text-[9px] font-mono text-surv-muted flex items-center gap-1.5"><MapPin size={10} className="text-surv-accent opacity-50"/> {assignment.location}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
                      assignment.status === 'ON SCENE' ? 'bg-surv-success-bg text-surv-success border-surv-border' : 'bg-surv-warning-bg text-surv-warning border-surv-border'
                    }`}>
                      {assignment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Assignments;

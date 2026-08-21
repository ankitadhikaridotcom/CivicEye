import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Users, Search, ShieldCheck } from 'lucide-react';

export const Officers = () => {
  const { language = 'en' } = useOutletContext() || {};
  const isHindi = language === 'hi';

  const officers = [
    { id: 'OP-001', name: 'RAJESH KUMAR', role: 'SURVEILLANCE LEAD', status: 'ACTIVE' },
    { id: 'OP-002', name: 'ANITA SINGH', role: 'DISPATCH COORDINATOR', status: 'ACTIVE' },
    { id: 'OP-003', name: 'VIKRAM NEGI', role: 'FIELD SQUAD ALPHA', status: 'OFF DUTY' },
  ];

  return (
    <div className="space-y-5 pb-12">
      <div className="relative bg-surv-surface rounded-xl border border-surv-border p-5 overflow-hidden">
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-surv-accent to-transparent opacity-30"></div>
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-surv-border-strong"></div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users size={16} className="text-surv-accent" />
              <h1 className="font-display text-lg font-bold tracking-[0.1em] text-surv-accent uppercase">
                {isHindi ? 'ऑपरेटर रोस्टर' : 'OPERATOR ROSTER'}
              </h1>
            </div>
            <p className="text-[10px] text-surv-muted font-mono tracking-wide uppercase">COMMAND CENTER & FIELD PERSONNEL REGISTRY</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surv-accent opacity-40" size={14} />
            <input type="text" placeholder="SEARCH OPERATOR ID..."
              className="pl-9 pr-4 py-2 bg-surv-bg border border-surv-border rounded-lg text-[10px] font-mono font-bold text-surv-accent placeholder-surv-muted focus:outline-none focus:border-surv-border-strong w-full sm:w-64 uppercase tracking-wider"
            />
          </div>
        </div>
      </div>

      <div className="bg-surv-surface rounded-xl border border-surv-border overflow-hidden relative">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong"></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surv-bg border-b border-surv-border text-[9px] font-mono font-bold text-surv-muted uppercase tracking-widest">
                <th className="px-4 py-3">OP ID</th>
                <th className="px-4 py-3">PERSONNEL NAME</th>
                <th className="px-4 py-3">DESIGNATION</th>
                <th className="px-4 py-3">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surv-border/50">
              {officers.map(officer => (
                <tr key={officer.id} className="hover:bg-surv-accent-bg/30 transition-colors">
                  <td className="px-4 py-3 text-[10px] font-mono font-bold text-surv-accent flex items-center gap-2">
                    <ShieldCheck size={12} className="opacity-50" /> {officer.id}
                  </td>
                  <td className="px-4 py-3 text-[11px] font-mono font-bold text-surv-text">{officer.name}</td>
                  <td className="px-4 py-3 text-[9px] font-mono text-surv-muted">{officer.role}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
                      officer.status === 'ACTIVE' ? 'bg-surv-success-bg text-surv-success border-surv-border' : 'bg-surv-bg text-surv-muted border-surv-border'
                    }`}>
                      {officer.status}
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

export default Officers;

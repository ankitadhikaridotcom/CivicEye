import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FileText, Download, Calendar, Filter } from 'lucide-react';

export const Reports = () => {
  const { language = 'en' } = useOutletContext() || {};
  const isHindi = language === 'hi';

  const reports = [
    { id: 'REP-001', name: 'DAILY SECTOR SUMMARY', type: 'PDF', date: new Date().toLocaleDateString(), status: 'READY' },
    { id: 'REP-002', name: 'WEEKLY THREAT ANALYSIS', type: 'CSV', date: new Date(Date.now() - 86400000 * 7).toLocaleDateString(), status: 'READY' },
    { id: 'REP-003', name: 'AI MODEL PERFORMANCE LOG', type: 'JSON', date: new Date(Date.now() - 86400000 * 30).toLocaleDateString(), status: 'READY' }
  ];

  return (
    <div className="space-y-5 pb-12">
      <div className="relative bg-surv-surface rounded-xl border border-surv-border p-5 overflow-hidden">
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-surv-accent to-transparent opacity-30"></div>
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-surv-border-strong"></div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FileText size={16} className="text-surv-accent" />
              <h1 className="font-display text-lg font-bold tracking-[0.1em] text-surv-accent uppercase">
                {isHindi ? 'सिस्टम रिपोर्ट' : 'SYSTEM REPORTS'}
              </h1>
            </div>
            <p className="text-[10px] text-surv-muted font-mono tracking-wide uppercase">EXPORTABLE MISSION LOGS & INTEL BRIEFS</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-surv-accent-bg text-surv-accent rounded-lg text-[10px] font-mono font-bold border border-surv-border transition-all uppercase tracking-wider hover:bg-surv-accent-hover">
            <Filter size={14} /> FILTER LOGS
          </button>
        </div>
      </div>

      <div className="bg-surv-surface rounded-xl border border-surv-border overflow-hidden relative">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong"></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surv-bg border-b border-surv-border text-[9px] font-mono font-bold text-surv-muted uppercase tracking-widest">
                <th className="px-4 py-3">REPORT ID</th>
                <th className="px-4 py-3">CLASSIFICATION</th>
                <th className="px-4 py-3">FORMAT</th>
                <th className="px-4 py-3">GENERATED</th>
                <th className="px-4 py-3">STATUS</th>
                <th className="px-4 py-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surv-border/50">
              {reports.map(report => (
                <tr key={report.id} className="hover:bg-surv-accent-bg/30 transition-colors">
                  <td className="px-4 py-3 text-[10px] font-mono font-bold text-surv-text">{report.id}</td>
                  <td className="px-4 py-3 text-[11px] font-mono font-bold text-surv-accent">{report.name}</td>
                  <td className="px-4 py-3 text-[9px] font-mono text-surv-muted">{report.type}</td>
                  <td className="px-4 py-3 text-[9px] font-mono text-surv-text flex items-center gap-1.5"><Calendar size={10} className="opacity-50"/> {report.date}</td>
                  <td className="px-4 py-3">
                    <span className="text-[9px] font-mono font-bold text-surv-success bg-surv-success-bg px-2 py-0.5 rounded border border-surv-border">{report.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-[9px] font-mono font-bold text-surv-accent hover:text-surv-text flex items-center gap-1 ml-auto">
                      <Download size={12} /> DOWNLOAD
                    </button>
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

export default Reports;

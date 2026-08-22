import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, ArrowUpRight, Camera } from 'lucide-react';

const IssueTable = ({ issues }) => {
  if (!issues || issues.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="px-5 py-3.5">INCIDENT ID</th>
              <th className="px-5 py-3.5">CLASSIFICATION</th>
              <th className="px-5 py-3.5">TELEMETRY</th>
              <th className="px-5 py-3.5">SEVERITY</th>
              <th className="px-5 py-3.5">STATUS</th>
              <th className="px-5 py-3.5 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {issues.map(issue => {
              const id = issue.issueId || issue.id;
              const type = issue.issueType || issue.type;
              const rawConf = issue.confidence || 0;
              const confidencePercent = rawConf <= 1 ? Math.round(rawConf * 100) : Math.round(rawConf);
              const location = issue.location;
              const ward = issue.ward || issue.city || '';
              const timeString = new Date(issue.detectedAt || issue.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              
              // Normalize Severity
              const sev = (issue.severity || 'MEDIUM').toUpperCase();
              let severityStyle = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-350 border-slate-200 dark:border-slate-700';
              if (sev === 'CRITICAL' || sev === 'HIGH') {
                severityStyle = 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 border-rose-150 dark:border-rose-900/40';
              } else if (sev === 'MEDIUM') {
                severityStyle = 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400 border-amber-150 dark:border-amber-900/40';
              } else if (sev === 'LOW') {
                severityStyle = 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-150 dark:border-emerald-900/40';
              }

              // Normalize Status
              const status = (issue.status || 'OPEN').toUpperCase();
              let statusStyle = 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
              if (status === 'RESOLVED' || status === 'AI VERIFIED' || status === 'CLOSED') {
                statusStyle = 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-150 dark:border-emerald-900/40';
              } else if (status === 'ASSIGNED' || status === 'IN PROGRESS') {
                statusStyle = 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400 border-indigo-150 dark:border-indigo-900/40';
              } else if (status === 'OPEN') {
                statusStyle = 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 border-rose-150 dark:border-rose-900/40';
              }

              return (
                <tr key={id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group text-xs text-slate-700 dark:text-slate-350">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-center shrink-0">
                        <Camera size={14} className="text-indigo-650 dark:text-indigo-455" />
                      </div>
                      <div>
                        <span className="font-mono font-bold text-slate-900 dark:text-white block uppercase tracking-wider">{id}</span>
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">{issue.cameraId || 'UPLOAD-MNG'}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-5 py-4">
                    <span className="font-semibold text-slate-950 dark:text-white block uppercase tracking-wider">{type}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      AI CONF: <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">{confidencePercent}%</span>
                    </span>
                  </td>
                  
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1 max-w-xs sm:max-w-md">
                      <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                        <MapPin size={12} className="text-slate-400 shrink-0" /> 
                        <span className="truncate">{location} {ward ? `(${ward})` : ''}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                        <Clock size={11} className="text-slate-400 shrink-0" /> {timeString}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider border inline-block ${severityStyle}`}>
                      {sev}
                    </span>
                  </td>
                  
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider border inline-block ${statusStyle}`}>
                      {status}
                    </span>
                  </td>
                  
                  <td className="px-5 py-4 text-right">
                    <Link 
                      to={`/issues/${id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-slate-750 text-indigo-600 dark:text-indigo-400 text-[10px] font-semibold rounded-xl border border-slate-200 dark:border-slate-750 transition-colors uppercase tracking-wider"
                    >
                      Inspect <ArrowUpRight size={12} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssueTable;

import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { BarChart3, TrendingUp, PieChart, Activity, Download } from 'lucide-react';
import { stats } from '../data/mockData';

export const Analytics = () => {
  const { language = 'en' } = useOutletContext() || {};
  const isHindi = language === 'hi';

  return (
    <div className="space-y-5 pb-12">
      <div className="relative bg-surv-surface rounded-xl border border-surv-border p-5 overflow-hidden">
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-surv-accent to-transparent opacity-30"></div>
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-surv-border-strong"></div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 size={16} className="text-surv-accent" />
              <h1 className="font-display text-lg font-bold tracking-[0.1em] text-surv-accent uppercase">
                {isHindi ? 'एनालिटिक्स और रिपोर्टिंग' : 'ANALYTICS & METRICS'}
              </h1>
            </div>
            <p className="text-[10px] text-surv-muted font-mono tracking-wide uppercase">AI PERFORMANCE DATA & TREND ANALYSIS</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-surv-accent-bg text-surv-accent rounded-lg text-[10px] font-mono font-bold border border-surv-border transition-all uppercase tracking-wider hover:bg-surv-accent-hover">
            <Download size={14} /> EXPORT DATA
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'TOTAL DETECTIONS', value: stats.totalIssues, icon: Activity, color: 'text-surv-accent' },
          { label: 'RESOLUTION RATE', value: '0%', icon: TrendingUp, color: 'text-surv-success' },
          { label: 'AI ACCURACY', value: '94.2%', icon: PieChart, color: 'text-surv-accent' },
          { label: 'AVG RESPONSE', value: '0m', icon: Activity, color: 'text-blue-500' }
        ].map((s, i) => (
          <div key={i} className="bg-surv-surface p-4 rounded-xl border border-surv-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong"></div>
            <div className="flex justify-between items-start mb-2">
              <div className="text-[9px] font-mono font-bold text-surv-muted uppercase tracking-widest">{s.label}</div>
              <s.icon size={14} className={s.color} />
            </div>
            <div className={`text-2xl font-mono font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-surv-surface p-5 rounded-xl border border-surv-border h-80 flex flex-col items-center justify-center relative">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong"></div>
          <Activity size={32} className="text-surv-muted mb-3 opacity-50" />
          <h3 className="text-[11px] font-mono font-bold text-surv-muted uppercase tracking-wider">TREND ANALYSIS VISUALIZATION</h3>
          <p className="text-[9px] font-mono text-surv-muted opacity-50 mt-1 uppercase tracking-widest">AWAITING SUFFICIENT TELEMETRY DATA</p>
        </div>
        <div className="bg-surv-surface p-5 rounded-xl border border-surv-border h-80 flex flex-col items-center justify-center relative">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong"></div>
          <PieChart size={32} className="text-surv-muted mb-3 opacity-50" />
          <h3 className="text-[11px] font-mono font-bold text-surv-muted uppercase tracking-wider">CATEGORY DISTRIBUTION</h3>
          <p className="text-[9px] font-mono text-surv-muted opacity-50 mt-1 uppercase tracking-widest">AWAITING SUFFICIENT TELEMETRY DATA</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

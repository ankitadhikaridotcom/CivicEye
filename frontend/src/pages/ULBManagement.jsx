import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Building2, Search, Crosshair, Users, Activity } from 'lucide-react';
import { mockCities } from '../data/mockData';

export const ULBManagement = () => {
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
              <Building2 size={16} className="text-surv-accent" />
              <h1 className="font-display text-lg font-bold tracking-[0.1em] text-surv-accent uppercase">
                {isHindi ? 'नगर निकाय प्रबंधन' : 'ULB DEPARTMENT COMMAND'}
              </h1>
            </div>
            <p className="text-[10px] text-surv-muted font-mono tracking-wide uppercase">MUNICIPAL CORPORATION DISPATCH STATUS</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surv-accent opacity-40" size={14} />
            <input type="text" placeholder="SEARCH ULB NODE..."
              className="pl-9 pr-4 py-2 bg-surv-bg border border-surv-border rounded-lg text-[10px] font-mono font-bold text-surv-accent placeholder-surv-muted focus:outline-none focus:border-surv-border-strong w-full sm:w-64 uppercase tracking-wider"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCities.map(city => (
          <div key={city.id} className="bg-surv-surface rounded-xl border border-surv-border p-4 relative overflow-hidden group hover:border-surv-border-strong transition-colors">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong"></div>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-mono font-bold text-sm text-surv-text uppercase tracking-wider">{city.name}</h3>
                <p className="text-[9px] text-surv-muted font-mono uppercase tracking-widest">{city.district} DISTRICT</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-surv-accent-bg border border-surv-border flex items-center justify-center">
                <Building2 size={14} className="text-surv-accent" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-surv-border/50">
              <div className="bg-surv-bg p-2 rounded-lg border border-surv-border text-center">
                <div className="text-[8px] font-mono font-bold text-surv-muted uppercase tracking-widest mb-1">FIELD SQUADS</div>
                <div className="text-[11px] font-mono font-bold text-surv-text flex items-center justify-center gap-1"><Users size={10} className="text-surv-accent"/> 12</div>
              </div>
              <div className="bg-surv-bg p-2 rounded-lg border border-surv-border text-center">
                <div className="text-[8px] font-mono font-bold text-surv-muted uppercase tracking-widest mb-1">ACTIVE THREATS</div>
                <div className={`text-[11px] font-mono font-bold flex items-center justify-center gap-1 ${city.activeIssues > 0 ? 'text-surv-critical' : 'text-surv-success'}`}>
                  <Activity size={10}/> {city.activeIssues}
                </div>
              </div>
            </div>
            
            <button className="w-full mt-3 py-2 bg-surv-bg hover:bg-surv-accent-bg border border-surv-border text-surv-accent text-[9px] font-mono font-bold rounded-lg transition-colors uppercase tracking-wider">
              VIEW DISPATCH LOG
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ULBManagement;

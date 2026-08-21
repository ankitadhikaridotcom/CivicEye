import React from 'react';

const KPICard = ({ title, value, icon: Icon, color, subtitle }) => {
  const colorMap = {
    cyan: 'text-surv-accent',
    emerald: 'text-surv-success',
    red: 'text-surv-critical',
    teal: 'text-surv-accent', // mapping teal to accent
  };

  const bgMap = {
    cyan: 'bg-surv-accent-bg border-surv-border',
    emerald: 'bg-surv-success-bg border-surv-border',
    red: 'bg-surv-critical-bg border-surv-critical',
    teal: 'bg-surv-accent-bg border-surv-border',
  };

  return (
    <div className={`bg-surv-surface p-3 rounded-xl border border-surv-border relative overflow-hidden group hover:border-surv-border-strong transition-all`}>
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong z-20"></div>
      
      <div className="flex justify-between items-start mb-2 relative z-10">
        <h3 className="font-mono font-bold text-[9px] text-surv-muted uppercase tracking-wider">{title}</h3>
        <div className={`p-1.5 rounded-lg ${bgMap[color]}`}>
          <Icon size={14} className={colorMap[color]} />
        </div>
      </div>
      
      <div className="relative z-10">
        <span className={`text-xl lg:text-2xl font-mono font-bold block leading-none ${colorMap[color]}`}>
          {value}
        </span>
        {subtitle && (
          <span className="text-[9px] font-mono text-surv-muted mt-1 inline-block uppercase tracking-widest">{subtitle}</span>
        )}
      </div>
      
      {/* Subtle scan line effect specifically for cards */}
      <div className="absolute inset-0 scan-lines z-0 opacity-50"></div>
    </div>
  );
};

export default KPICard;

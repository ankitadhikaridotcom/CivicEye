import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Bell, ShieldAlert, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { mockNotifications } from '../data/mockData';

export const Notifications = () => {
  const { language = 'en' } = useOutletContext() || {};
  const isHindi = language === 'hi';

  return (
    <div className="space-y-5 pb-12 max-w-4xl">
      <div className="relative bg-surv-surface rounded-xl border border-surv-border p-5 overflow-hidden">
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-surv-accent to-transparent opacity-30"></div>
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-surv-border-strong"></div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Bell size={16} className="text-surv-accent" />
              <h1 className="font-display text-lg font-bold tracking-[0.1em] text-surv-accent uppercase">
                {isHindi ? 'सिस्टम अलर्ट' : 'SYSTEM ALERTS'}
              </h1>
            </div>
            <p className="text-[10px] text-surv-muted font-mono tracking-wide uppercase">GLOBAL NOTIFICATION LOG & SYSTEM EVENTS</p>
          </div>
          <button className="px-4 py-2 bg-surv-accent-bg hover:bg-surv-accent-hover text-surv-accent rounded-lg text-[10px] font-mono font-bold border border-surv-border transition-all uppercase tracking-wider">
            ACKNOWLEDGE ALL
          </button>
        </div>
      </div>

      <div className="bg-surv-surface rounded-xl border border-surv-border p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong"></div>
        <div className="divide-y divide-surv-border/50">
          {mockNotifications.map((notif, index) => (
            <div key={notif.id} className={`p-4 flex gap-4 ${!notif.read ? 'bg-surv-accent-bg/30' : ''}`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                notif.type === 'alert' ? 'bg-surv-critical-bg text-surv-critical border-surv-critical' :
                notif.type === 'system' ? 'bg-surv-accent-bg text-surv-accent border-surv-border' :
                'bg-surv-success-bg text-surv-success border-surv-border'
              }`}>
                {notif.type === 'alert' ? <AlertTriangle size={18} /> : 
                 notif.type === 'system' ? <ShieldAlert size={18} /> : <CheckCircle2 size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-xs font-mono font-bold text-surv-text uppercase tracking-wider">{notif.title}</h4>
                  <span className="text-[9px] font-mono text-surv-muted flex items-center gap-1"><Clock size={10}/> {notif.time}</span>
                </div>
                <p className="text-[10px] font-mono text-surv-muted tracking-wide">{notif.message}</p>
              </div>
            </div>
          ))}
          
          {mockNotifications.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle2 size={32} className="mx-auto text-surv-success opacity-50 mb-3" />
              <p className="text-[11px] font-mono font-bold text-surv-muted uppercase tracking-widest">NO PENDING ALERTS</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;

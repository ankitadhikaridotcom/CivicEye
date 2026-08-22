import React, { useEffect, useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Bell, ShieldAlert, CheckCircle2, AlertTriangle, Clock, RefreshCw, Eye } from 'lucide-react';
import { apiService } from '../utils/api';

export const Notifications = () => {
  const { language = 'en' } = useOutletContext() || {};
  const isHindi = language === 'hi';

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAlerts();
      setAlerts(data);
    } catch (err) {
      console.error('Error fetching alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleAcknowledgeAll = async () => {
    try {
      const promises = alerts.filter(a => !a.read).map(a => apiService.markAlertAsRead(a.alertId));
      await Promise.all(promises);
      await fetchAlerts();
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const handleRead = async (alertId) => {
    try {
      await apiService.markAlertAsRead(alertId);
      // Update local state directly for speed
      setAlerts(prev => prev.map(a => a.alertId === alertId ? { ...a, read: true } : a));
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 overflow-hidden shadow-sm">
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-indigo-600 to-transparent opacity-30"></div>
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-indigo-500"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Bell size={18} className="text-indigo-600 dark:text-indigo-400" />
              <h1 className="font-sans text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                {isHindi ? 'सिस्टम अलर्ट' : 'Alert Center'}
              </h1>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono tracking-wide uppercase">
              Global notification log and real-time command center events
            </p>
          </div>
          <button 
            onClick={handleAcknowledgeAll}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-semibold transition-all uppercase tracking-wider shadow-sm"
          >
            Acknowledge All
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-20 flex flex-col items-center justify-center">
            <RefreshCw size={24} className="text-indigo-600 animate-spin mb-3" />
            <p className="text-xs text-slate-400 font-mono">LOADING SYSTEM NOTIFICATIONS...</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {alerts.map((alert) => {
              const isHigh = alert.severity === 'HIGH';
              const isMedium = alert.severity === 'MEDIUM';

              let alertColorClass = 'bg-slate-50 text-slate-550 border-slate-200 dark:bg-slate-850 dark:text-slate-350 dark:border-slate-700';
              if (isHigh) {
                alertColorClass = 'bg-rose-50 text-rose-600 border-rose-150 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/40';
              } else if (isMedium) {
                alertColorClass = 'bg-amber-50 text-amber-650 border-amber-150 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/40';
              }

              return (
                <div 
                  key={alert.alertId} 
                  className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                    !alert.read ? 'bg-indigo-50/10 dark:bg-indigo-950/5' : ''
                  }`}
                >
                  <div className="flex gap-4 items-start flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${alertColorClass}`}>
                      {isHigh ? <AlertTriangle size={18} /> : 
                       isMedium ? <ShieldAlert size={18} /> : <CheckCircle2 size={18} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="text-xs font-bold text-slate-850 dark:text-white uppercase tracking-tight">
                          {alert.title}
                        </h4>
                        <span className="text-[9px] font-mono text-slate-400 flex items-center gap-1">
                          <Clock size={10} /> {alert.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {!alert.read && (
                      <button 
                        onClick={() => handleRead(alert.alertId)}
                        className="px-2.5 py-1 text-[9px] font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 uppercase tracking-wider"
                      >
                        Acknowledge
                      </button>
                    )}
                    {alert.issueId && (
                      <Link 
                        to={`/issues/${alert.issueId}`}
                        className="px-2.5 py-1 text-[9px] font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40 rounded-lg hover:bg-indigo-100/50 flex items-center gap-1 uppercase tracking-wider"
                      >
                        <Eye size={10} /> Inspect
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
            
            {alerts.length === 0 && (
              <div className="text-center py-16">
                <CheckCircle2 size={32} className="mx-auto text-emerald-500 opacity-60 mb-3" />
                <p className="text-xs font-bold text-slate-450 uppercase tracking-widest">No active alerts</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;

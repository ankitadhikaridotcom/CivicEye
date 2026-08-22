import React, { useEffect, useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { 
  AlertCircle, Trash2, ShieldAlert, CheckCircle2, TrendingUp, Camera, MapPin, Building2, ArrowRight,
  Bot, Layers, Sparkles, Video, Activity, Flame, CheckCheck, Plus, Crosshair, Radio, Eye, Cpu, Wifi, Bell, Clock
} from 'lucide-react';
import KPICard from '../components/dashboard/KPICard';
import UttarakhandMap from '../components/maps/UttarakhandMap';
import { apiService } from '../utils/api';

const workflowSteps = [
  { step: '01', title: 'RTSP INGEST', desc: 'Camera Feed', icon: Camera, color: 'text-indigo-500' },
  { step: '02', title: 'AI DETECT', desc: 'YOLO best.pt', icon: Bot, color: 'text-cyan-500' },
  { step: '03', title: 'CLASSIFY', desc: 'Object Sort', icon: Layers, color: 'text-amber-500' },
  { step: '04', title: 'SEVERITY', desc: 'Threat Level', icon: ShieldAlert, color: 'text-rose-500' },
  { step: '05', title: 'ROUTE', desc: 'Smart Routing', icon: Building2, color: 'text-emerald-500' },
  { step: '06', title: 'DEPLOY', desc: 'Field Squad', icon: Activity, color: 'text-indigo-400' },
  { step: '07', title: 'VERIFY', desc: 'AI Re-Scan', icon: CheckCheck, color: 'text-teal-500' },
];

const Dashboard = () => {
  const { selectedCity = 'All Uttarakhand', language = 'en' } = useOutletContext() || {};
  const isHindi = language === 'hi';
  
  const [stats, setStats] = useState({
    totalIssues: 1248,
    activeIssues: 342,
    resolvedToday: 128,
    highPriority: 73,
    aiDetectionsToday: 486,
    aiVerifiedClosures: 94,
    camerasOnline: 18,
    departmentsActive: 4,
    avgSlaResponseTime: '42 min'
  });

  const [recentAlerts, setRecentAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('Good evening, Admin 👋');

  useEffect(() => {
    // Set time-of-day greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning, Admin 👋');
    else if (hour < 17) setGreeting('Good afternoon, Admin 👋');
    else setGreeting('Good evening, Admin 👋');

    // Fetch dynamic data
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, alertsData] = await Promise.all([
          apiService.getStats(),
          apiService.getAlerts()
        ]);
        setStats(statsData);
        // Take top 3 alerts
        setRecentAlerts(alertsData.slice(0, 3));
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    // Poll stats every 10 seconds for real-time COMMAND CENTER updates
    const interval = setInterval(fetchDashboardData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Command Center Header */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 overflow-hidden shadow-sm">
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-indigo-600 to-transparent opacity-55"></div>
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-indigo-500"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-indigo-500"></div>
        
        <svg className="absolute bottom-0 right-0 w-96 h-auto opacity-[0.03] dark:opacity-[0.05] pointer-events-none text-indigo-500" viewBox="0 0 500 200" fill="none">
          <path d="M0 200 L120 70 L220 140 L340 30 L450 120 L500 80 L500 200 Z" fill="currentColor" />
        </svg>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/60 uppercase tracking-widest">
                <Wifi size={10} /> {selectedCity === 'All Uttarakhand' ? 'ALL SECTORS' : selectedCity.toUpperCase()}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/60 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {isHindi ? 'सिस्टम ऑनलाइन' : 'COMMAND CENTER NOMINAL'}
              </span>
            </div>

            <h1 className="font-sans text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {greeting}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl font-mono">
              {isHindi 
                ? 'स्मार्ट सिटी निगरानी, विभाग समन्वय और समस्या निवारण को ट्रैक करें।'
                : 'Monitor civic issues, coordinate departments and track resolution across the city.'
              }
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link to="/ai-analysis" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-xl text-[11px] transition-all uppercase tracking-wider shadow-sm shadow-indigo-600/20">
              <Sparkles size={14} /> AI DETECTION
            </Link>
            <Link to="/live-monitoring" className="flex items-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold px-4 py-2 rounded-xl text-[11px] transition-all uppercase tracking-wider">
              <Video size={14} /> LIVE CCTV
            </Link>
          </div>
        </div>
      </div>

      {/* 2. KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <KPICard 
          title="Total Issues" 
          value={stats.totalIssues} 
          icon={AlertCircle} 
          color="cyan" 
          subtitle="+12% from yesterday" 
        />
        <KPICard 
          title="Active Issues" 
          value={stats.activeIssues} 
          icon={Flame} 
          color="emerald" 
          subtitle="Needs response" 
        />
        <KPICard 
          title="High Severity" 
          value={stats.highPriority} 
          icon={ShieldAlert} 
          color="red" 
          subtitle="Immediate action" 
        />
        <KPICard 
          title="Resolved Today" 
          value={stats.resolvedToday} 
          icon={CheckCircle2} 
          color="emerald" 
          subtitle="Completed SLA" 
        />
        <KPICard 
          title="AI Detections Today" 
          value={stats.aiDetectionsToday} 
          icon={Eye} 
          color="cyan" 
          subtitle="From optical feeds" 
        />
        <KPICard 
          title="Avg Response Time" 
          value={stats.avgSlaResponseTime || '42 min'} 
          icon={Clock} 
          color="cyan" 
          subtitle="Target: under 60m" 
        />
      </div>

      {/* 3. Central Live Situation Section (Map + Alert Center) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* GIS Map */}
        <div className="xl:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[580px] shadow-sm relative">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-wrap justify-between items-center bg-white dark:bg-slate-900 z-10">
            <div>
              <div className="flex items-center gap-2">
                <Crosshair size={14} className="text-indigo-600" />
                <h2 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                  Live Civic Situation
                </h2>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/60 uppercase tracking-wider">
                  {stats.activeIssues} ACTIVE ISSUES
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                INTERACTIVE GEOSPATIAL COMMAND OVERLAY
              </p>
            </div>
            <Link to="/map" className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:opacity-85 transition-opacity">
              FULL MAP VIEW <ArrowRight size={12} />
            </Link>
          </div>
          <div className="flex-1 relative z-0">
            <UttarakhandMap selectedCity={selectedCity} />
          </div>
        </div>

        {/* Right Panel: Alert Center */}
        <div className="xl:col-span-4 flex flex-col gap-5">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col h-full shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-rose-500" />
                <h3 className="font-bold text-slate-800 dark:text-white text-xs uppercase tracking-wider">
                  Recent Alerts
                </h3>
              </div>
              <span className="text-[9px] bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-mono font-bold px-2 py-0.5 rounded-lg border border-rose-100 dark:border-rose-900/50">
                LIVE
              </span>
            </div>
            
            <div className="space-y-3.5 overflow-y-auto flex-1 pr-1 max-h-[440px] custom-scrollbar">
              {recentAlerts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <span className="text-slate-300 dark:text-slate-700 text-3xl mb-2">🔔</span>
                  <p className="text-[11px] text-slate-400 font-mono">NO ACTIVE WARNINGS</p>
                </div>
              ) : (
                recentAlerts.map((alert) => (
                  <div key={alert.alertId} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 hover:border-slate-200 dark:hover:border-slate-700 transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                        alert.severity === 'HIGH' 
                          ? 'bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/40' 
                          : alert.severity === 'MEDIUM'
                          ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/40'
                          : 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-900/40'
                      }`}>
                        {alert.severity} PRIORITY
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <Clock size={10} /> {alert.time}
                      </span>
                    </div>
                    <h4 className="text-[11px] font-bold text-slate-800 dark:text-white leading-tight">
                      {alert.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {alert.message}
                    </p>
                    {alert.issueId && (
                      <Link to={`/issues/${alert.issueId}`} className="inline-flex items-center gap-1 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 mt-2 hover:opacity-85">
                        Inspect Incident <ArrowRight size={10} />
                      </Link>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. AI Pipeline Processing */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-300 dark:border-slate-700"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-300 dark:border-slate-700"></div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Cpu size={14} className="text-indigo-600" />
            <h3 className="text-[10px] font-mono font-bold text-slate-800 dark:text-white uppercase tracking-[0.15em]">
              AI Civic Response Lifecycle
            </h3>
          </div>
          <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-900/40 flex items-center gap-1 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> ONLINE
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {workflowSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50 rounded-xl p-3 text-center group hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-100/50 dark:hover:bg-slate-800 transition-all">
                <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 mx-auto flex items-center justify-center mb-2 shadow-sm group-hover:scale-105 transition-transform">
                  <Icon size={14} className={item.color} />
                </div>
                <div className="text-[8px] font-mono font-bold text-slate-400 dark:text-slate-500 tracking-widest">{item.step}</div>
                <div className="text-[10px] font-bold text-slate-700 dark:text-slate-200 truncate mt-0.5">{item.title}</div>
                <div className="text-[9px] text-slate-400 dark:text-slate-500 truncate">{item.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Demo / Connection Section */}
      <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-slate-300 dark:border-slate-700"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-slate-300 dark:border-slate-700"></div>
        
        <div className="max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Camera size={24} />
          </div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
            Optical Stream Ingest
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
            Add authorized municipal CCTV endpoints (RTSP/ONVIF) in Settings to link active live camera streams.
          </p>
          <div className="flex justify-center gap-3">
            <Link to="/ai-analysis" className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all uppercase tracking-wider">
              <Plus size={14} /> Upload Demo Photo
            </Link>
            <Link to="/settings" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-all uppercase tracking-wider">
              Configure Streams
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

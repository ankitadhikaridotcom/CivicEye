import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { 
  AlertCircle, Trash2, ShieldAlert, CheckCircle2, TrendingUp, Camera, MapPin, Building2, ArrowRight,
  Bot, Layers, Sparkles, Video, Activity, Flame, CheckCheck, Plus, Crosshair, Radio, Eye, Cpu, Wifi
} from 'lucide-react';
import KPICard from '../components/dashboard/KPICard';
import UttarakhandMap from '../components/maps/UttarakhandMap';
import { stats, mockTouristAreas, mockCameras, issueCategoriesData, cityComparisonData, mockIssues } from '../data/mockData';

const workflowSteps = [
  { step: '01', title: 'RTSP INGEST', desc: 'Camera Feed', icon: Camera, color: 'text-surv-accent' },
  { step: '02', title: 'AI DETECT', desc: 'YOLOv11', icon: Bot, color: 'text-blue-500' },
  { step: '03', title: 'CLASSIFY', desc: 'Object Sort', icon: Layers, color: 'text-amber-500' },
  { step: '04', title: 'SEVERITY', desc: 'Threat Level', icon: ShieldAlert, color: 'text-surv-critical' },
  { step: '05', title: 'ROUTE', desc: 'ULB Dispatch', icon: Building2, color: 'text-blue-500' },
  { step: '06', title: 'DEPLOY', desc: 'Field Squad', icon: Activity, color: 'text-surv-success' },
  { step: '07', title: 'VERIFY', desc: 'Re-Scan', icon: CheckCheck, color: 'text-surv-success' },
];

const Dashboard = () => {
  const { selectedCity = 'All Uttarakhand', language = 'en' } = useOutletContext() || {};
  const isHindi = language === 'hi';

  return (
    <div className="space-y-5 pb-12">
      {/* 1. Command Center Header */}
      <div className="relative bg-surv-surface rounded-xl border border-surv-border p-5 overflow-hidden">
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-surv-accent to-transparent opacity-30"></div>
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-surv-border-strong"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-surv-border-strong"></div>
        
        {/* Mountain silhouette watermark */}
        <svg className="absolute bottom-0 right-0 w-96 h-auto opacity-[0.03] pointer-events-none" viewBox="0 0 500 200" fill="none">
          <path d="M0 200 L120 70 L220 140 L340 30 L450 120 L500 80 L500 200 Z" fill="currentColor" />
        </svg>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold bg-surv-accent-bg text-surv-accent border border-surv-border uppercase tracking-widest">
                <Wifi size={10} /> {selectedCity === 'All Uttarakhand' ? 'ALL SECTORS' : selectedCity.toUpperCase()}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold bg-surv-success-bg text-surv-success border border-surv-border uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-surv-success animate-pulse"></span>
                {isHindi ? 'सिस्टम ऑनलाइन' : 'ALL SYSTEMS NOMINAL'}
              </span>
            </div>

            <h1 className="font-display text-xl lg:text-2xl font-bold tracking-[0.1em] text-surv-accent uppercase">
              {isHindi ? 'निगरानी कमांड सेंटर' : 'SURVEILLANCE COMMAND CENTER'}
            </h1>
            <p className="text-[11px] text-surv-muted mt-1 max-w-2xl font-mono tracking-wide">
              {isHindi 
                ? 'स्वचालित कंप्यूटर विज़न निगरानी प्रणाली — सम्पूर्ण उत्तराखंड'
                : 'AUTOMATED COMPUTER VISION MONITORING — STATEWIDE OPTICAL FEEDS & AI TELEMETRY'
              }
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link to="/live-monitoring" className="flex items-center gap-2 bg-surv-accent-bg hover:bg-surv-accent-hover text-surv-accent border border-surv-border font-mono font-bold px-4 py-2 rounded-lg text-[10px] transition-all uppercase tracking-wider surv-glow">
              <Video size={14} /> LIVE FEEDS
            </Link>
            <Link to="/state-control" className="flex items-center gap-2 bg-surv-critical-bg hover:opacity-80 text-surv-critical border border-surv-border font-mono font-bold px-4 py-2 rounded-lg text-[10px] transition-all uppercase tracking-wider">
              <Radio size={14} /> CONTROL ROOM
            </Link>
          </div>
        </div>
      </div>

      {/* 2. KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <KPICard title={isHindi ? 'कुल अलर्ट' : 'TOTAL ALERTS'} value={stats.totalIssues} icon={AlertCircle} color="cyan" subtitle="Clear" />
        <KPICard title={isHindi ? 'सक्रिय' : 'ACTIVE'} value={stats.activeIssues} icon={Flame} color="emerald" subtitle="0 Pending" />
        <KPICard title={isHindi ? 'AI डिटेक्शन' : 'AI DETECTS'} value={stats.aiDetectionsToday} icon={Eye} color="teal" subtitle="Today" />
        <KPICard title={isHindi ? 'उच्च प्राथमिकता' : 'HIGH THREAT'} value={stats.highPriority} icon={ShieldAlert} color="emerald" subtitle="None" />
        <KPICard title={isHindi ? 'निस्तारित' : 'RESOLVED'} value={stats.resolvedToday} icon={CheckCircle2} color="emerald" subtitle="Today" />
        <KPICard title={isHindi ? 'सत्यापित' : 'AI VERIFIED'} value={`${stats.aiVerifiedClosures}%`} icon={TrendingUp} color="cyan" subtitle="Clean" />
      </div>

      {/* 3. AI Pipeline */}
      <div className="bg-surv-surface rounded-xl border border-surv-border p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-surv-border"></div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Cpu size={14} className="text-surv-accent" />
            <h3 className="text-[10px] font-mono font-bold text-surv-text uppercase tracking-[0.15em]">
              {isHindi ? 'एआई प्रोसेसिंग पाइपलाइन' : 'AI DETECTION PIPELINE'}
            </h3>
          </div>
          <span className="text-[9px] font-mono font-bold text-surv-success opacity-80 flex items-center gap-1 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-surv-success animate-pulse"></span> ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {workflowSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-surv-bg border border-surv-border rounded-lg p-2.5 text-center group hover:border-surv-border-strong hover:bg-surv-accent-bg transition-all">
                <div className="w-7 h-7 rounded-lg bg-surv-accent-bg border border-surv-border mx-auto flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                  <Icon size={13} className={item.color} />
                </div>
                <div className="text-[8px] font-mono font-bold text-surv-accent opacity-60 tracking-widest">{item.step}</div>
                <div className="text-[10px] font-mono font-bold text-surv-text truncate mt-0.5">{item.title}</div>
                <div className="text-[9px] font-mono text-surv-muted truncate">{item.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Map + Intel Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* GIS Map */}
        <div className="xl:col-span-8 bg-surv-surface rounded-xl border border-surv-border overflow-hidden flex flex-col h-[600px] relative">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-surv-border-strong z-20"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-surv-border-strong z-20"></div>
          
          <div className="p-4 border-b border-surv-border flex flex-wrap justify-between items-center bg-surv-surface z-10">
            <div>
              <div className="flex items-center gap-2">
                <Crosshair size={14} className="text-surv-accent" />
                <h2 className="text-sm font-mono font-bold text-surv-text uppercase tracking-wider">
                  {isHindi ? 'जीआईएस कमांड मैप' : 'GIS COMMAND MAP'}
                </h2>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-surv-success-bg text-surv-success border border-surv-border uppercase tracking-wider">
                  0 INCIDENTS
                </span>
              </div>
              <p className="text-[10px] text-surv-muted mt-0.5 font-mono tracking-wide">
                INTERACTIVE GEOSPATIAL SURVEILLANCE OVERLAY
              </p>
            </div>
            <Link to="/map" className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-surv-accent hover:opacity-80 px-3 py-1.5 rounded-lg hover:bg-surv-accent-bg transition-colors uppercase tracking-wider border border-transparent hover:border-surv-border">
              FULLSCREEN <ArrowRight size={12} />
            </Link>
          </div>
          <div className="flex-1 relative z-0">
            <UttarakhandMap selectedCity={selectedCity} />
          </div>
        </div>

        {/* Right Intel Panel */}
        <div className="xl:col-span-4 space-y-4 flex flex-col">
          {/* Category Status */}
          <div className="bg-surv-surface rounded-xl border border-surv-border p-4 flex flex-col h-[290px] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong"></div>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-mono font-bold text-xs text-surv-text uppercase tracking-wider">
                  {isHindi ? 'थ्रेट वर्गीकरण' : 'THREAT CLASSIFICATION'}
                </h3>
                <p className="text-[9px] text-surv-muted font-mono tracking-wide">AI ANOMALY CATEGORIES</p>
              </div>
              <span className="text-[9px] bg-surv-success-bg text-surv-success font-mono font-bold px-2 py-0.5 rounded border border-surv-border uppercase tracking-wider">
                CLEAR
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <div className="w-12 h-12 rounded-xl bg-surv-success-bg border border-surv-border flex items-center justify-center mb-2">
                <CheckCircle2 size={22} className="text-surv-success" />
              </div>
              <h4 className="text-xs font-mono font-bold text-surv-success uppercase tracking-wider">ZERO VIOLATIONS</h4>
              <p className="text-[10px] text-surv-muted font-mono mt-1 tracking-wide">ALL MONITORING SECTORS NOMINAL</p>
            </div>
          </div>

          {/* Tourist Zone Monitoring */}
          <div className="bg-surv-surface rounded-xl border border-surv-border p-4 flex flex-col h-[290px] overflow-hidden relative">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong"></div>
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="font-mono font-bold text-xs text-surv-text uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-surv-success"></span>
                  {isHindi ? 'पर्यटन क्षेत्र' : 'HIGH-FOOTFALL ZONES'}
                </h3>
                <p className="text-[9px] text-surv-muted font-mono tracking-wide">TOURIST & PILGRIM CORRIDORS</p>
              </div>
              <span className="text-[9px] font-mono font-bold text-surv-accent opacity-80 bg-surv-accent-bg border border-surv-border px-2 py-0.5 rounded uppercase tracking-wider">
                {mockTouristAreas.length} ZONES
              </span>
            </div>
            <div className="divide-y divide-surv-border overflow-y-auto custom-scrollbar pr-1 flex-1">
              {mockTouristAreas.map((ta) => (
                <div key={ta.id} className="py-2 flex items-center justify-between hover:bg-surv-accent-bg px-2 rounded-lg transition-colors">
                  <div className="min-w-0">
                    <h4 className="text-[10px] font-mono font-bold text-surv-text truncate uppercase tracking-wide">{ta.name}</h4>
                    <div className="flex items-center gap-2 text-[9px] text-surv-muted font-mono mt-0.5 tracking-wide">
                      <span className="text-surv-success opacity-80">{ta.activeIssues} ACTIVE</span>
                      <span className="opacity-20">│</span>
                      <span>{ta.footfall}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-extrabold text-surv-success bg-surv-success-bg px-2 py-1 rounded border border-surv-border">
                    {ta.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Empty Camera Feeds */}
      <div className="bg-surv-surface rounded-xl border border-surv-border p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-surv-border-strong"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-surv-border-strong"></div>
        
        <div className="max-w-md mx-auto">
          <div className="w-14 h-14 rounded-xl bg-surv-accent-bg border border-surv-border text-surv-accent flex items-center justify-center mx-auto mb-3 surv-glow">
            <Camera size={24} />
          </div>
          <h3 className="text-sm font-mono font-bold text-surv-text uppercase tracking-wider">
            {isHindi ? 'कोई कैमरा स्ट्रीम नहीं' : 'NO CAMERA STREAMS CONNECTED'}
          </h3>
          <p className="text-[10px] text-surv-muted mt-1 mb-4 font-mono tracking-wide">
            ADD RTSP/ONVIF OPTICAL CAMERA ENDPOINTS IN CONFIG TO INITIATE AI SURVEILLANCE
          </p>
          <Link to="/settings" className="inline-flex items-center gap-2 px-5 py-2.5 bg-surv-accent-bg hover:bg-surv-accent-hover text-surv-accent rounded-lg text-[10px] font-mono font-bold border border-surv-border surv-glow transition-all uppercase tracking-wider">
            <Plus size={14} /> CONNECT STREAM
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

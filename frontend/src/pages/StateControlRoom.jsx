import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { ShieldAlert, Radio, Activity, Camera, MapPin, Eye, Cpu, Workflow, Wifi, Crosshair } from 'lucide-react';
import UttarakhandMap from '../components/maps/UttarakhandMap';
import { mockCameras, mockNotifications, stats } from '../data/mockData';

export const StateControlRoom = () => {
  const { selectedCity = 'All Uttarakhand', language = 'en' } = useOutletContext() || {};
  const isHindi = language === 'hi';
  const [broadcastActive, setBroadcastActive] = useState(false);

  return (
    <div className="space-y-5 pb-12">
      {/* 1. Header Banner */}
      <div className="relative bg-surv-surface rounded-xl border border-surv-critical p-6 overflow-hidden">
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-surv-critical to-transparent opacity-50"></div>
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-surv-critical opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-surv-critical opacity-50"></div>
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-surv-text">
          <ShieldAlert size={180} />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-surv-critical-bg text-surv-critical border border-surv-critical px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold flex items-center gap-1.5 uppercase tracking-widest shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-surv-critical animate-pulse"></span>
                {isHindi ? 'लाइव राज्य नियंत्रण कक्ष' : 'LIVE STATE CONTROL ROOM'}
              </span>
              <span className="bg-surv-success-bg text-surv-success border border-surv-border px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold uppercase tracking-widest">
                {isHindi ? 'ऑल सेक्टर्स नॉर्मल' : 'ALL SECTORS NOMINAL'}
              </span>
            </div>

            <h1 className="font-display text-2xl lg:text-3xl font-bold tracking-[0.1em] text-surv-text uppercase">
              {isHindi ? 'उत्तराखंड राज्य नागरिक नियंत्रण कक्ष' : 'STATE CIVIC MISSION CONTROL'}
            </h1>
            <p className="text-[11px] text-surv-muted font-mono mt-1 max-w-2xl tracking-wide uppercase">
              HIGH-LEVEL EMERGENCY COORDINATION, STATEWIDE CCTV NEURAL TELEMETRY, AND RAPID INTER-DEPARTMENTAL DISPATCH.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setBroadcastActive(!broadcastActive);
                alert(broadcastActive ? 'Emergency State Alert Deactivated' : '🚨 EMERGENCY ALERT BROADCAST SENT TO ALL 9 ULBs & FIELD SQUADS!');
              }}
              className={`px-5 py-3 rounded-xl text-[10px] font-mono font-bold transition-all flex items-center gap-2 uppercase tracking-widest border ${
                broadcastActive 
                  ? 'bg-surv-critical text-white border-surv-critical animate-pulse shadow-lg' 
                  : 'bg-surv-critical-bg hover:bg-surv-critical-bg text-surv-critical border-surv-critical opacity-80 hover:opacity-100'
              }`}
            >
              <Radio size={14} />
              <span>{broadcastActive ? 'BROADCASTING...' : 'BROADCAST ALERT'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'CCTV FEEDS', value: '0', sub: 'OFFLINE', color: 'text-surv-muted' },
          { label: 'AI DETECTS', value: '0', sub: 'CLEAR', color: 'text-surv-success' },
          { label: 'ESCALATIONS', value: '0', sub: 'NOMINAL', color: 'text-surv-success' },
          { label: 'ACTIVE DEPT', value: '18', sub: 'STANDBY', color: 'text-surv-accent' },
          { label: 'RESOLVED', value: '0', sub: 'TODAY', color: 'text-surv-muted' },
          { label: 'AVG SLA', value: '0m', sub: 'RESPONSE', color: 'text-blue-500' }
        ].map((m, idx) => (
          <div key={idx} className="bg-surv-surface p-4 rounded-xl border border-surv-border relative overflow-hidden text-center group hover:bg-surv-surface-hover transition-colors">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong"></div>
            <div className="text-[9px] font-mono font-bold text-surv-muted uppercase tracking-widest">{m.label}</div>
            <div className={`text-2xl font-mono font-bold mt-1 ${m.color}`}>{m.value}</div>
            <div className="text-[8px] font-mono text-surv-muted opacity-80 mt-0.5 uppercase tracking-widest">{m.sub}</div>
          </div>
        ))}
      </div>

      {/* 3. Central GIS Command */}
      <div className="bg-surv-surface rounded-xl border border-surv-border overflow-hidden flex flex-col h-[600px] relative">
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-surv-accent to-transparent z-20 opacity-30"></div>
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-surv-border-strong z-20"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-surv-border-strong z-20"></div>
        
        <div className="p-4 border-b border-surv-border flex justify-between items-center bg-surv-surface z-10">
          <div className="flex items-center gap-2">
            <Crosshair size={14} className="text-surv-accent" />
            <h3 className="font-mono font-bold text-xs text-surv-text uppercase tracking-wider">
              STATEWIDE STRATEGIC COMMAND MAP
            </h3>
          </div>
          <span className="text-[9px] font-mono font-bold text-surv-accent opacity-80 bg-surv-accent-bg border border-surv-border px-2 py-0.5 rounded tracking-widest">
            LAT: 30.0668° N | LNG: 79.0193° E
          </span>
        </div>
        <div className="flex-1 relative z-0">
          <UttarakhandMap selectedCity={selectedCity} />
        </div>
      </div>
    </div>
  );
};

export default StateControlRoom;

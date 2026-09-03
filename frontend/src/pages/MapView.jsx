import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import UttarakhandMap from '../components/maps/UttarakhandMap';
import { Map as MapIcon, Crosshair, AlertTriangle, Video, MapPin, Search, Layers, Maximize } from 'lucide-react';
import { mockIssues, mockCameras } from '../data/mockData';

export const MapView = () => {
  const { selectedCity = 'All Uttarakhand', setSelectedCity, language = 'en' } = useOutletContext() || {};
  const isHindi = language === 'hi';
  const [activeLayer, setActiveLayer] = useState('all');

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* HUD Header */}
      <div className="flex items-center justify-between mb-4 bg-surv-surface rounded-xl border border-surv-border p-4 relative overflow-hidden shrink-0">
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-surv-accent to-transparent opacity-30"></div>
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surv-border-strong"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-surv-border-strong"></div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-surv-accent-bg border border-surv-border flex items-center justify-center text-surv-accent">
            <MapIcon size={20} />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold tracking-[0.1em] text-surv-accent uppercase flex items-center gap-2">
              {isHindi ? 'विस्तृत जीआईएस कमांड मैप' : 'FULLSCREEN GIS COMMAND'}
            </h1>
            <p className="text-[10px] text-surv-muted font-mono tracking-wide uppercase">STATEWIDE GEOSPATIAL TELEMETRY OVERLAY</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-surv-bg rounded-lg p-1 border border-surv-border">
            {[
              { id: 'all', icon: Layers, label: 'ALL' },
              { id: 'issues', icon: AlertTriangle, label: 'ALERTS' },
              { id: 'cameras', icon: Video, label: 'CCTV' }
            ].map(layer => (
              <button key={layer.id} onClick={() => setActiveLayer(layer.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[9px] font-mono font-bold transition-all uppercase tracking-wider ${
                  activeLayer === layer.id ? 'bg-surv-accent-bg text-surv-accent' : 'text-surv-muted hover:text-surv-text'
                }`}
              >
                <layer.icon size={12} /> <span className="hidden sm:inline">{layer.label}</span>
              </button>
            ))}
          </div>

          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surv-accent opacity-40" size={12} />
            <input type="text" placeholder="LOCATE SECTOR..." 
              className="pl-8 pr-3 py-1.5 bg-surv-bg border border-surv-border rounded-lg text-[9px] font-mono font-bold text-surv-accent focus:outline-none focus:border-surv-border-strong w-48 uppercase tracking-widest"
            />
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 bg-surv-surface rounded-xl border border-surv-border relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-surv-border-strong z-20"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-surv-border-strong z-20"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-surv-border-strong z-20"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-surv-border-strong z-20"></div>
        
        {/* Scan line effect over map */}
        <div className="absolute inset-0 pointer-events-none scan-lines z-10"></div>

        <UttarakhandMap 
          selectedCity={selectedCity} 
          onSelectCity={setSelectedCity}
          showIssues={activeLayer === 'all' || activeLayer === 'issues'}
          showCameras={activeLayer === 'all' || activeLayer === 'cameras'}
        />

        {/* Floating Intel Overlay (Bottom Left) */}
        <div className="absolute bottom-6 left-6 z-30 bg-surv-surface/90 backdrop-blur-md border border-surv-border rounded-lg p-4 shadow-lg w-64">
          <div className="flex items-center justify-between mb-3 border-b border-surv-border pb-2">
            <h3 className="text-[10px] font-mono font-bold text-surv-accent uppercase tracking-widest flex items-center gap-1.5">
              <Crosshair size={12} /> SECTOR INTEL
            </h3>
            <span className="text-[9px] font-mono text-surv-success border border-surv-border bg-surv-success-bg px-1.5 py-0.5 rounded tracking-widest">LIVE</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-surv-muted uppercase tracking-wider">ACTIVE ALERTS</span>
              <span className="text-surv-text font-bold">{activeLayer === 'cameras' ? 0 : mockIssues.length}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-surv-muted uppercase tracking-wider">CCTV NODES</span>
              <span className="text-surv-text font-bold">{activeLayer === 'issues' ? 0 : mockCameras.length}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-surv-muted uppercase tracking-wider">THREAT LEVEL</span>
              <span className="text-surv-success font-bold uppercase tracking-wider">NOMINAL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;

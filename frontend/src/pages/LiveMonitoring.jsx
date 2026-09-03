import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { mockCameras } from '../data/mockData';
import CameraCard from '../components/cctv/CameraCard';
import { Search, Video, Camera, Plus, Radio, Wifi } from 'lucide-react';

const LiveMonitoring = () => {
  const { selectedCity = 'All Uttarakhand', language = 'en' } = useOutletContext() || {};
  const isHindi = language === 'hi';
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCameras = mockCameras.filter(camera => {
    const matchesCity = selectedCity === 'All Uttarakhand' || camera.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesSearch = camera.location.toLowerCase().includes(searchTerm.toLowerCase()) || camera.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="relative bg-surv-surface rounded-xl border border-surv-border p-5 overflow-hidden">
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-surv-accent to-transparent opacity-30"></div>
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-surv-border-strong"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-surv-border-strong"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Video size={16} className="text-surv-accent" />
              <h1 className="font-display text-lg font-bold tracking-[0.1em] text-surv-accent uppercase">
                {isHindi ? 'लाइव फीड ग्रिड' : 'LIVE FEED GRID'}
              </h1>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-surv-accent-bg text-surv-accent border border-surv-border uppercase tracking-wider opacity-80">
                {filteredCameras.length} STREAMS
              </span>
            </div>
            <p className="text-[10px] text-surv-muted font-mono tracking-wide uppercase">
              {isHindi ? 'एआई ऑब्जेक्ट डिटेक्शन ओवरले — रियल-टाइम फीड' : 'REAL-TIME OPTICAL CAMERA FEEDS WITH AI BOUNDING BOX OVERLAY'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-surv-bg rounded-lg border border-surv-border text-center">
              <div className="text-[8px] font-mono font-bold text-surv-muted uppercase tracking-widest">ONLINE</div>
              <div className="text-sm font-mono font-bold text-surv-accent">{filteredCameras.length}</div>
            </div>
            <div className="px-3 py-1.5 bg-surv-bg rounded-lg border border-surv-border text-center">
              <div className="text-[8px] font-mono font-bold text-surv-muted uppercase tracking-widest">STATUS</div>
              <div className="text-sm font-mono font-bold text-surv-success">STANDBY</div>
            </div>
          </div>
        </div>
      </div>

      {filteredCameras.length === 0 ? (
        <div className="p-16 text-center bg-surv-surface rounded-xl border border-surv-border max-w-lg mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-surv-border-strong"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-surv-border-strong"></div>
          
          <div className="w-16 h-16 rounded-xl bg-surv-accent-bg border border-surv-border text-surv-accent flex items-center justify-center mx-auto mb-3 surv-glow">
            <Camera size={28} />
          </div>
          <h3 className="text-sm font-mono font-bold text-surv-text uppercase tracking-wider">
            NO CAMERA STREAMS CONNECTED
          </h3>
          <p className="text-[10px] text-surv-muted mt-1 mb-6 font-mono tracking-wide uppercase">
            ADD RTSP/ONVIF OPTICAL ENDPOINTS IN SYSTEM CONFIG TO INITIALIZE AI SURVEILLANCE GRID
          </p>
          <Link to="/settings" className="inline-flex items-center gap-2 px-5 py-2.5 bg-surv-accent-bg hover:bg-surv-accent-hover text-surv-accent rounded-lg text-[10px] font-mono font-bold border border-surv-border transition-all uppercase tracking-wider surv-glow">
            <Plus size={14} /> CONFIGURE STREAM INGEST
          </Link>
        </div>
      ) : (
        <>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surv-accent opacity-40" size={14} />
            <input type="text" placeholder="SEARCH CAMERA FEED..."
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-surv-border bg-surv-surface text-[10px] font-mono font-bold text-surv-accent placeholder-surv-muted focus:outline-none focus:border-surv-border-strong focus:shadow-[0_0_15px_rgba(37,99,235,0.05)] uppercase tracking-wider"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCameras.map((camera) => <CameraCard key={camera.id} camera={camera} />)}
          </div>
        </>
      )}
    </div>
  );
};

export default LiveMonitoring;

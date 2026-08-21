import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Marker, Popup, useMap, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { mockCities, mockCameras, mockTouristAreas } from '../../data/mockData';
import { Maximize2, Layers, Flame, Camera, AlertCircle, CheckCircle2, ChevronRight, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Dynamic Map Centerer
const MapCenterer = ({ selectedCity }) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedCity === 'All Uttarakhand') {
      map.setView([30.0668, 79.0193], 8, { animate: true });
    } else {
      const cityData = mockCities.find(c => c.name.toLowerCase() === selectedCity.toLowerCase());
      if (cityData) {
        map.setView(cityData.coordinates, 12, { animate: true });
      }
    }
  }, [selectedCity, map]);

  return null;
};

const getSeverityColor = (severity) => {
  switch (severity) {
    case 'HIGH': return '#EF4444'; // Red
    case 'MEDIUM': return '#F59E0B'; // Amber
    case 'LOW': return '#10B981'; // Green
    default: return '#2563EB'; // Blue
  }
};

const UttarakhandMap = ({ selectedCity = 'All Uttarakhand', height = '100%', darkTheme = true, onSelectCity }) => {
  const [mounted, setMounted] = useState(false);
  const [activeLayer, setActiveLayer] = useState('issues'); // 'issues' | 'cameras' | 'tourist' | 'heatmap'
  const [mapStyle, setMapStyle] = useState('dark'); // 'dark' | 'voyager' | 'satellite'
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-full w-full bg-slate-900 animate-pulse rounded-2xl flex items-center justify-center text-slate-500">
        <span className="text-sm font-semibold">Initializing Uttarakhand GIS Map Engine...</span>
      </div>
    );
  }

  const tileLayers = {
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    voyager: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  };

  return (
    <div className="h-full w-full relative rounded-2xl overflow-hidden shadow-inner border border-slate-800 bg-[#0B1120] z-0">
      <MapContainer 
        center={[30.0668, 79.0193]} 
        zoom={8} 
        scrollWheelZoom={true}
        className="h-full w-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap'
          url={tileLayers[mapStyle]}
          maxZoom={19}
        />
        
        <MapCenterer selectedCity={selectedCity} />

        {/* 1. CIVIC ISSUES LAYER */}
        {(activeLayer === 'issues' || activeLayer === 'heatmap') && mockCities.map((city) => {
          const isSelected = selectedCity === city.name;
          const color = getSeverityColor(city.severity);
          
          return (
            <React.Fragment key={city.id}>
              {/* Outer Pulsing Aura for active critical/high severity */}
              <CircleMarker
                center={city.coordinates}
                pathOptions={{ 
                  color: color,
                  fillColor: color,
                  fillOpacity: activeLayer === 'heatmap' ? 0.35 : 0.18,
                  weight: 1,
                  dashArray: '3, 6'
                }}
                radius={activeLayer === 'heatmap' ? 42 : (isSelected ? 26 : 18)}
              />

              {/* Core Incident Marker */}
              <CircleMarker
                center={city.coordinates}
                pathOptions={{ 
                  color: '#FFFFFF',
                  fillColor: color,
                  fillOpacity: 0.95,
                  weight: isSelected ? 3 : 2
                }}
                radius={isSelected ? 12 : 8}
              >
                <Popup>
                  <div className="p-2 min-w-[240px] text-white">
                    <div className="flex items-center justify-between border-b border-slate-700/80 pb-2 mb-2">
                      <div>
                        <h3 className="font-extrabold text-sm text-white tracking-wide">{city.name}</h3>
                        <p className="text-[10px] text-slate-400 font-medium">{city.ulbType} • {city.district}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        city.severity === 'HIGH' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                        city.severity === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                        'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}>
                        {city.severity}
                      </span>
                    </div>
                    
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between py-0.5">
                        <span className="text-slate-400 font-medium">Active Incidents:</span>
                        <span className="font-bold text-red-400">{city.activeIssues}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 py-1 px-2 rounded-lg bg-slate-800/80 text-[10px] border border-slate-700/50">
                        <div>🗑️ Waste: <span className="font-bold text-white">{city.garbage}</span></div>
                        <div>🚧 Encroach: <span className="font-bold text-white">{city.encroachment}</span></div>
                        <div>🚛 Dumping: <span className="font-bold text-white">{city.dumping}</span></div>
                        <div>⛔ Obstruction: <span className="font-bold text-white">{city.obstruction}</span></div>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span className="text-slate-400 font-medium">Cleanliness Index:</span>
                        <span className="font-bold text-emerald-400">{city.score} / 100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-medium">Resolution Rate:</span>
                        <span className="font-bold text-cyan-400">{city.resolutionRate}%</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => navigate(`/issues?city=${city.name}`)}
                      className="mt-3 w-full bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-1.5 rounded-lg text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <Eye size={13} />
                      View City Incidents
                    </button>
                  </div>
                </Popup>
              </CircleMarker>
            </React.Fragment>
          );
        })}

        {/* 2. CCTV CAMERAS LAYER */}
        {activeLayer === 'cameras' && mockCameras.map((cam) => (
          <CircleMarker
            key={cam.id}
            center={cam.detections.length > 0 ? [30.33, 78.04] : [29.95, 78.17]} // approximate
            pathOptions={{ 
              color: '#38BDF8',
              fillColor: cam.detections.length > 0 ? '#EF4444' : '#10B981',
              fillOpacity: 0.9,
              weight: 2
            }}
            radius={9}
          >
            <Popup>
              <div className="p-2 text-white min-w-[200px]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <h4 className="font-bold text-xs">{cam.id} • {cam.location}</h4>
                </div>
                <p className="text-[10px] text-slate-400">{cam.city} • {cam.type}</p>
                <div className="mt-2 text-xs">
                  {cam.detections.length > 0 ? (
                    <span className="text-red-400 font-bold">⚠️ Active Alert: {cam.detections[0].label}</span>
                  ) : (
                    <span className="text-emerald-400 font-medium">✓ Area Clear</span>
                  )}
                </div>
                <button 
                  onClick={() => navigate('/live-monitoring')}
                  className="mt-2 w-full bg-slate-800 hover:bg-slate-700 text-xs py-1 rounded text-cyan-300 font-semibold"
                >
                  Open Camera Feed
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {/* 3. TOURIST SPOTS LAYER */}
        {activeLayer === 'tourist' && mockTouristAreas.map((tourist) => (
          <CircleMarker
            key={tourist.id}
            center={tourist.coordinates}
            pathOptions={{ 
              color: '#10B981',
              fillColor: '#0F766E',
              fillOpacity: 0.9,
              weight: 2
            }}
            radius={11}
          >
            <Popup>
              <div className="p-2 text-white min-w-[220px]">
                <h4 className="font-bold text-xs text-emerald-400">{tourist.name}</h4>
                <p className="text-[10px] text-slate-300 mb-2">{tourist.footfall}</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cleanliness Score:</span>
                    <span className="font-bold text-emerald-400">{tourist.score}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Active Issues:</span>
                    <span className="font-bold text-amber-400">{tourist.activeIssues}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Avg Cleanup Time:</span>
                    <span className="font-bold text-cyan-400">{tourist.responseTime}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Floating Map Controls & Layer Selector (Top Right) */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        {/* Layer Switcher */}
        <div className="bg-[#0F172A]/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-1 shadow-2xl flex items-center gap-1 text-xs">
          <button
            onClick={() => setActiveLayer('issues')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeLayer === 'issues' ? 'bg-brand-blue text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <AlertCircle size={13} />
            <span>Civic Hotspots</span>
          </button>
          <button
            onClick={() => setActiveLayer('cameras')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeLayer === 'cameras' ? 'bg-brand-blue text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Camera size={13} />
            <span>CCTV Feeds</span>
          </button>
          <button
            onClick={() => setActiveLayer('tourist')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeLayer === 'tourist' ? 'bg-brand-blue text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 size={13} />
            <span>Tourist Zones</span>
          </button>
          <button
            onClick={() => setActiveLayer('heatmap')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeLayer === 'heatmap' ? 'bg-brand-blue text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Flame size={13} />
            <span>Heatmap</span>
          </button>
        </div>

        {/* Map Basemap Style Switcher */}
        <div className="bg-[#0F172A]/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-1 shadow-xl flex items-center self-end gap-1 text-[11px]">
          <button
            onClick={() => setMapStyle('dark')}
            className={`px-2 py-1 rounded-md font-medium ${mapStyle === 'dark' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Night GIS
          </button>
          <button
            onClick={() => setMapStyle('voyager')}
            className={`px-2 py-1 rounded-md font-medium ${mapStyle === 'voyager' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Day Light
          </button>
          <button
            onClick={() => setMapStyle('satellite')}
            className={`px-2 py-1 rounded-md font-medium ${mapStyle === 'satellite' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Satellite
          </button>
        </div>
      </div>

      {/* Floating State Monitoring Legend (Bottom Left) */}
      <div className="absolute bottom-4 left-4 bg-[#0F172A]/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/80 shadow-2xl z-[1000] text-xs text-white max-w-xs">
        <div className="flex items-center justify-between font-bold text-slate-200 mb-2 border-b border-slate-800 pb-1.5">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse"></span>
            Uttarakhand State GIS Telemetry
          </span>
          <span className="text-[10px] text-slate-400 font-mono">9 ULBs</span>
        </div>
        <div className="space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span>
              <span>High Severity Zone</span>
            </div>
            <span className="font-bold text-red-400">Dehradun, Haldwani</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
              <span>Moderate Monitoring</span>
            </div>
            <span className="font-bold text-amber-400">Haridwar, Roorkee</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
              <span>Clean / Low Incidents</span>
            </div>
            <span className="font-bold text-emerald-400">Nainital, Mussoorie</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UttarakhandMap;

import React, { useState, useEffect } from 'react';
import { useOutletContext, useSearchParams, Link } from 'react-router-dom';
import { apiService } from '../utils/api';
import IssueTable from '../components/issues/IssueTable';
import { 
  Filter, Search, Download, Plus, CheckCircle2, ShieldAlert, Trash2, Box, MapPin, 
  Activity, FileSpreadsheet, X, AlertTriangle, Crosshair, RefreshCw, Sparkles
} from 'lucide-react';

export const Issues = () => {
  const { selectedCity = 'All Uttarakhand', language = 'en' } = useOutletContext() || {};
  const isHindi = language === 'hi';
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  const cityParam = searchParams.get('city');

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedCityFilter, setSelectedCityFilter] = useState(cityParam || (selectedCity !== 'All Uttarakhand' ? selectedCity : 'ALL'));
  const [showExportModal, setShowExportModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [detectingGps, setDetectingGps] = useState(false);

  // Manual Log Form State
  const [manualForm, setManualForm] = useState({
    issueType: 'Garbage',
    location: '',
    ward: '',
    latitude: '30.3165',
    longitude: '78.0322',
    severity: 'MEDIUM',
    confidence: '0.85',
    department: 'Sanitation Department',
    description: '',
    cameraId: 'MANUAL-LOG'
  });

  const handleDetectGps = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    
    setDetectingGps(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const latStr = latitude.toFixed(6);
        const lonStr = longitude.toFixed(6);
        
        setManualForm(prev => ({
          ...prev,
          latitude: latStr,
          longitude: lonStr
        }));
        
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          if (response.ok) {
            const data = await response.json();
            const displayName = data.display_name || '';
            const address = data.address || {};
            
            const city = address.city || address.town || address.village || address.suburb || 'Dehradun';
            const road = address.road || '';
            const neighbourhood = address.neighbourhood || address.suburb || '';
            
            const locationText = [road, neighbourhood, city].filter(Boolean).join(', ') || displayName;
            const wardText = address.suburb ? `Ward - ${address.suburb}` : `Ward - ${city}`;
            
            setManualForm(prev => ({
              ...prev,
              location: locationText,
              ward: wardText
            }));
          } else {
            setManualForm(prev => ({
              ...prev,
              location: `Lat: ${latStr}, Lon: ${lonStr}`,
              ward: 'General Ward'
            }));
          }
        } catch (e) {
          console.error(e);
          setManualForm(prev => ({
            ...prev,
            location: `Lat: ${latStr}, Lon: ${lonStr}`,
            ward: 'General Ward'
          }));
        } finally {
          setDetectingGps(false);
        }
      },
      (error) => {
        console.error(error);
        alert(`Failed to get location: ${error.message}`);
        setDetectingGps(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const queryFilters = {};
      if (typeParam) queryFilters.type = typeParam;
      if (statusFilter !== 'ALL') queryFilters.status = statusFilter;
      if (severityFilter !== 'ALL') queryFilters.severity = severityFilter;
      if (selectedCityFilter !== 'ALL') queryFilters.ward = selectedCityFilter;

      const data = await apiService.getIssues(queryFilters);
      setIssues(data);
    } catch (err) {
      console.error('Error fetching issues:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [typeParam, statusFilter, severityFilter, selectedCityFilter]);

  // Sync city filter from context if it changes
  useEffect(() => {
    if (selectedCity !== 'All Uttarakhand') {
      setSelectedCityFilter(selectedCity);
    } else {
      setSelectedCityFilter('ALL');
    }
  }, [selectedCity]);

  const handleManualRegister = async (e) => {
    e.preventDefault();
    if (!manualForm.location || !manualForm.ward) {
      alert('Location and Ward are required.');
      return;
    }

    try {
      const response = await apiService.createIssue({
        ...manualForm,
        latitude: parseFloat(manualForm.latitude),
        longitude: parseFloat(manualForm.longitude),
        confidence: parseFloat(manualForm.confidence)
      });
      if (response.success) {
        setShowManualModal(false);
        // Reset form
        setManualForm({
          issueType: 'Garbage',
          location: '',
          ward: '',
          latitude: '30.3165',
          longitude: '78.0322',
          severity: 'MEDIUM',
          confidence: '0.85',
          department: 'Sanitation Department',
          description: '',
          cameraId: 'MANUAL-LOG'
        });
        fetchIssues();
      }
    } catch (error) {
      console.error('Error registering manual issue:', error);
      alert('Failed to register issue.');
    }
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = 
      (issue.issueId || issue.id || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
      (issue.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (issue.ward || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (issue.department || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 overflow-hidden shadow-sm">
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-indigo-600 to-transparent opacity-35"></div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={18} className="text-indigo-600 dark:text-indigo-400" />
              <h1 className="font-sans text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                {isHindi ? 'डिटेक्शन लॉग' : 'Detection Log'}
              </h1>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/60 uppercase tracking-wider">
                {filteredIssues.length} RECORDS
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono tracking-wide uppercase">
              AI DETECTED INCIDENTS — INTEGRATED WORKFLOW PIPELINE
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={() => setShowExportModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl text-[10px] font-semibold text-slate-700 dark:text-slate-250 transition-colors uppercase tracking-wider">
              <Download size={13} className="text-indigo-600 dark:text-indigo-400" /> EXPORT
            </button>
            <button onClick={() => setShowManualModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-semibold transition-all uppercase tracking-wider shadow-sm">
              <Plus size={14} /> Log Incident
            </button>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-1">
          {[
            { key: null, label: 'ALL', icon: Crosshair },
            { key: 'garbage', label: 'WASTE', icon: Trash2 },
            { key: 'encroachment', label: 'ENCROACH', icon: Box },
            { key: 'dumping', label: 'DUMPING', icon: MapPin },
            { key: 'obstruction', label: 'OBSTRUCT', icon: Activity }
          ].map(f => (
            <button key={f.key || 'all'}
              onClick={() => f.key ? setSearchParams({ type: f.key }) : setSearchParams({})}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-semibold transition-all flex items-center gap-1.5 uppercase tracking-wider ${
                (f.key === typeParam || (!f.key && !typeParam)) 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-transparent'
              }`}
            >
              <f.icon size={11} /> {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-[10px] font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500 uppercase tracking-wider">
            <option value="ALL">ALL SEVERITY</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-[10px] font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500 uppercase tracking-wider">
            <option value="ALL">ALL STATUS</option>
            <option value="OPEN">OPEN</option>
            <option value="ASSIGNED">ASSIGNED</option>
            <option value="IN PROGRESS">IN PROGRESS</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="AI VERIFIED">AI VERIFIED</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
        <input type="text" placeholder="SEARCH BY INCIDENT ID, WARD, LOCATION OR DEPARTMENT..."
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-semibold text-slate-800 dark:text-white placeholder-slate-450 focus:outline-none focus:border-indigo-500 uppercase tracking-wider shadow-sm"
        />
      </div>

      {loading ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center">
          <RefreshCw size={24} className="text-indigo-650 animate-spin mb-3" />
          <p className="text-xs text-slate-450 font-mono">RETRIEVING DISPATCH LOGS FROM DATABASE...</p>
        </div>
      ) : (
        <>
          <IssueTable issues={filteredIssues} />

          {filteredIssues.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center mx-auto mb-3 text-emerald-600">
                <CheckCircle2 size={22} />
              </div>
              <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">ZERO INCIDENTS</h3>
              <p className="text-[10px] text-slate-400 mt-1 font-mono tracking-wide uppercase">All sectors reported clean & clear.</p>
            </div>
          )}
        </>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-6 relative overflow-hidden">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-xs text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Download size={16} className="text-indigo-600" /> EXPORT TELEMETRY
              </h3>
              <button onClick={() => setShowExportModal(false)} className="text-slate-400 hover:text-indigo-600"><X size={16} /></button>
            </div>
            <div className="space-y-3 mt-4">
              <button onClick={() => { alert('Exporting PDF...'); setShowExportModal(false); }}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider shadow-sm transition-all">
                <Download size={13} /> DOWNLOAD PDF REPORT
              </button>
              <button onClick={() => { alert('Exporting CSV...'); setShowExportModal(false); }}
                className="w-full py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2 uppercase tracking-wider transition-all">
                <FileSpreadsheet size={13} className="text-emerald-500" /> DOWNLOAD CSV SPREADSHEET
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Log Incident Modal */}
      {showManualModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full p-6 relative overflow-hidden">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-xs text-slate-800 dark:text-white uppercase tracking-wider">Log Manual Incident</h3>
              <button onClick={() => setShowManualModal(false)} className="text-slate-400 hover:text-indigo-650"><X size={16} /></button>
            </div>
            
            <form onSubmit={handleManualRegister} className="space-y-4 mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 mb-2">
                <div>
                  <p className="text-[10px] font-bold text-slate-800 dark:text-white uppercase tracking-wider font-sans">GPS Geolocation Assist</p>
                  <p className="text-[9px] text-slate-400 font-mono uppercase">Lock coordinates & reverse-geocode location</p>
                </div>
                <button
                  type="button"
                  onClick={handleDetectGps}
                  disabled={detectingGps}
                  className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-755 disabled:bg-indigo-400 text-white rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all shadow-sm shrink-0 cursor-pointer"
                >
                  {detectingGps ? (
                    <>
                      <RefreshCw size={12} className="animate-spin" />
                      <span>LOCKING GPS...</span>
                    </>
                  ) : (
                    <>
                      <MapPin size={12} />
                      <span>USE CURRENT GPS LOCATION</span>
                    </>
                  )}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">CATEGORY</label>
                  <select 
                    value={manualForm.issueType}
                    onChange={(e) => setManualForm({...manualForm, issueType: e.target.value})}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold text-slate-800 dark:text-white uppercase focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Garbage">GARBAGE ACCUMULATION</option>
                    <option value="Encroachment">ENCROACHMENT</option>
                    <option value="Illegal Dumping">ILLEGAL DUMPING</option>
                    <option value="Road Obstruction">ROAD OBSTRUCTION</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">WARD</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Ward 12 - Clock Tower"
                    value={manualForm.ward}
                    onChange={(e) => setManualForm({...manualForm, ward: e.target.value})}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold text-slate-850 dark:text-white uppercase focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[9px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">LOCATION DESCRIPTION</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Rajpur Road, Near Clock Tower, Dehradun"
                    value={manualForm.location}
                    onChange={(e) => setManualForm({...manualForm, location: e.target.value})}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold text-slate-850 dark:text-white uppercase focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">LATITUDE</label>
                  <input 
                    type="text" 
                    value={manualForm.latitude}
                    onChange={(e) => setManualForm({...manualForm, latitude: e.target.value})}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold text-slate-850 dark:text-white uppercase focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">LONGITUDE</label>
                  <input 
                    type="text" 
                    value={manualForm.longitude}
                    onChange={(e) => setManualForm({...manualForm, longitude: e.target.value})}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold text-slate-850 dark:text-white uppercase focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">SEVERITY</label>
                  <select 
                    value={manualForm.severity}
                    onChange={(e) => setManualForm({...manualForm, severity: e.target.value})}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold text-slate-850 dark:text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">CONFIDENCE</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    min="0.1" 
                    max="1.0"
                    value={manualForm.confidence}
                    onChange={(e) => setManualForm({...manualForm, confidence: e.target.value})}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold text-slate-850 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[9px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">DESCRIPTION / REMARKS</label>
                <textarea 
                  rows="3"
                  value={manualForm.description}
                  onChange={(e) => setManualForm({...manualForm, description: e.target.value})}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold text-slate-850 dark:text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Additional details regarding violation..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setShowManualModal(false)} 
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl uppercase tracking-wider transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl uppercase tracking-wider transition-all shadow-sm"
                >
                  Register Incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Issues;

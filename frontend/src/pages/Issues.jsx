import React, { useState } from 'react';
import { useOutletContext, useSearchParams, Link } from 'react-router-dom';
import { mockIssues } from '../data/mockData';
import IssueTable from '../components/issues/IssueTable';
import { Filter, Search, Download, Plus, CheckCircle2, ShieldAlert, Trash2, Box, MapPin, Activity, FileSpreadsheet, X, AlertTriangle, Crosshair } from 'lucide-react';

export const Issues = () => {
  const { selectedCity = 'All Uttarakhand', language = 'en' } = useOutletContext() || {};
  const isHindi = language === 'hi';
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  const cityParam = searchParams.get('city');
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedCityFilter, setSelectedCityFilter] = useState(cityParam || (selectedCity !== 'All Uttarakhand' ? selectedCity : 'ALL'));
  const [showExportModal, setShowExportModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);

  const filteredIssues = mockIssues.filter(issue => {
    const matchesCity = selectedCityFilter === 'ALL' || issue.city.toLowerCase() === selectedCityFilter.toLowerCase();
    const matchesType = !typeParam || 
      (typeParam === 'garbage' && issue.type.toLowerCase().includes('garbage')) ||
      (typeParam === 'encroachment' && issue.type.toLowerCase().includes('encroach')) ||
      (typeParam === 'dumping' && issue.type.toLowerCase().includes('dumping')) ||
      (typeParam === 'obstruction' && issue.type.toLowerCase().includes('obstruct'));
    const matchesSeverity = severityFilter === 'ALL' || issue.severity === severityFilter;
    const matchesStatus = statusFilter === 'ALL' || issue.status === statusFilter;
    const matchesSearch = issue.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCity && matchesType && matchesSeverity && matchesStatus && matchesSearch;
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
              <AlertTriangle size={16} className="text-surv-accent" />
              <h1 className="font-display text-lg font-bold tracking-[0.1em] text-surv-accent uppercase">
                {isHindi ? 'डिटेक्शन लॉग' : 'DETECTION LOG'}
              </h1>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-surv-accent-bg text-surv-accent border border-surv-border uppercase tracking-wider opacity-80">
                {filteredIssues.length} RECORDS
              </span>
            </div>
            <p className="text-[10px] text-surv-muted font-mono tracking-wide uppercase">
              AI DETECTED VIOLATIONS — ROUTED TO MUNICIPAL CORPS & ENFORCEMENT SQUADS
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={() => setShowExportModal(true)}
              className="flex items-center gap-2 px-3 py-2 bg-surv-bg border border-surv-border hover:bg-surv-surface-hover rounded-lg text-[10px] font-mono font-bold text-surv-muted transition-colors uppercase tracking-wider">
              <Download size={13} className="text-surv-accent" /> EXPORT
            </button>
            <button onClick={() => setShowManualModal(true)}
              className="flex items-center gap-2 px-3 py-2 bg-surv-accent-bg hover:bg-surv-accent-hover border border-surv-border rounded-lg text-[10px] font-mono font-bold text-surv-accent transition-all uppercase tracking-wider">
              <Plus size={14} /> LOG INCIDENT
            </button>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-surv-surface p-3 rounded-xl border border-surv-border">
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
              className={`px-2.5 py-1.5 rounded-lg text-[9px] font-mono font-bold transition-all flex items-center gap-1.5 uppercase tracking-wider ${
                (f.key === typeParam || (!f.key && !typeParam)) 
                  ? 'bg-surv-accent-bg text-surv-accent border border-surv-border' 
                  : 'text-surv-muted hover:bg-surv-surface-hover hover:text-surv-text border border-transparent'
              }`}
            >
              <f.icon size={11} /> {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-surv-bg border border-surv-border rounded-lg px-2 py-1 text-[9px] font-mono font-bold text-surv-muted focus:outline-none focus:border-surv-border-strong uppercase tracking-wider">
            <option value="ALL">ALL SEVERITY</option>
            <option value="CRITICAL">CRITICAL</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surv-bg border border-surv-border rounded-lg px-2 py-1 text-[9px] font-mono font-bold text-surv-muted focus:outline-none focus:border-surv-border-strong uppercase tracking-wider">
            <option value="ALL">ALL STATUS</option>
            <option value="Open">OPEN</option>
            <option value="Assigned">ASSIGNED</option>
            <option value="Resolved">RESOLVED</option>
          </select>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surv-accent opacity-40" size={14} />
        <input type="text" placeholder="SEARCH BY ID, LOCATION, WARD, OR DEPARTMENT..."
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-surv-surface border border-surv-border rounded-lg text-[10px] font-mono font-bold text-surv-accent placeholder-surv-muted focus:outline-none focus:border-surv-border-strong uppercase tracking-wider"
        />
      </div>

      <IssueTable issues={filteredIssues} />

      {filteredIssues.length === 0 && (
        <div className="text-center py-16 bg-surv-surface rounded-xl border border-surv-border relative overflow-hidden">
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-surv-border-strong"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-surv-border-strong"></div>
          <div className="w-12 h-12 rounded-xl bg-surv-success-bg border border-surv-border flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 size={22} className="text-surv-success" />
          </div>
          <h3 className="text-sm font-mono font-bold text-surv-success uppercase tracking-wider">ZERO DETECTIONS</h3>
          <p className="text-[10px] text-surv-muted mt-1 font-mono tracking-wide uppercase">ALL SURVEILLANCE SECTORS REPORT NOMINAL STATUS</p>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surv-surface rounded-xl border border-surv-border shadow-lg max-w-md w-full p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-surv-border-strong"></div>
            <div className="flex justify-between items-center pb-4 border-b border-surv-border">
              <h3 className="font-mono font-bold text-sm text-surv-text uppercase tracking-wider flex items-center gap-2">
                <Download size={16} className="text-surv-accent" /> EXPORT DATA
              </h3>
              <button onClick={() => setShowExportModal(false)} className="text-surv-muted hover:text-surv-accent"><X size={16} /></button>
            </div>
            <div className="space-y-3 mt-4">
              <button onClick={() => { alert('Exporting PDF...'); setShowExportModal(false); }}
                className="w-full py-3 bg-surv-accent-bg hover:bg-surv-accent-hover text-surv-accent font-mono font-bold text-[10px] rounded-lg border border-surv-border flex items-center justify-center gap-2 uppercase tracking-wider">
                <Download size={13} /> DOWNLOAD PDF DOSSIER
              </button>
              <button onClick={() => { alert('Exporting CSV...'); setShowExportModal(false); }}
                className="w-full py-3 bg-surv-bg hover:bg-surv-surface-hover text-surv-text font-mono font-bold text-[10px] rounded-lg border border-surv-border flex items-center justify-center gap-2 uppercase tracking-wider">
                <FileSpreadsheet size={13} className="text-surv-success" /> DOWNLOAD CSV DATASET
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Modal */}
      {showManualModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surv-surface rounded-xl border border-surv-border shadow-lg max-w-lg w-full p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-surv-border-strong"></div>
            <div className="flex justify-between items-center pb-4 border-b border-surv-border">
              <h3 className="font-mono font-bold text-sm text-surv-text uppercase tracking-wider">MANUAL INCIDENT LOG</h3>
              <button onClick={() => setShowManualModal(false)} className="text-surv-muted hover:text-surv-accent"><X size={16} /></button>
            </div>
            <div className="space-y-3 mt-4">
              <div>
                <label className="block text-[9px] font-mono font-bold text-surv-muted mb-1 uppercase tracking-widest">CATEGORY</label>
                <select className="w-full bg-surv-bg border border-surv-border rounded-lg p-2 text-[10px] font-mono font-bold text-surv-text uppercase tracking-wider">
                  <option>GARBAGE ACCUMULATION</option><option>ENCROACHMENT</option><option>ILLEGAL DUMPING</option><option>ROAD OBSTRUCTION</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-mono font-bold text-surv-muted mb-1 uppercase tracking-widest">SECTOR</label>
                <select className="w-full bg-surv-bg border border-surv-border rounded-lg p-2 text-[10px] font-mono font-bold text-surv-text uppercase tracking-wider">
                  <option>DEHRADUN</option><option>HARIDWAR</option><option>RISHIKESH</option><option>HALDWANI</option><option>NAINITAL</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-mono font-bold text-surv-muted mb-1 uppercase tracking-widest">LOCATION</label>
                <input type="text" placeholder="e.g. PALTAN BAZAAR, WARD 4" className="w-full bg-surv-bg border border-surv-border rounded-lg p-2 text-[10px] font-mono font-bold text-surv-accent placeholder-surv-muted uppercase tracking-wider" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 mt-4 border-t border-surv-border">
              <button onClick={() => setShowManualModal(false)} className="px-4 py-2 text-[10px] font-mono font-bold text-surv-muted hover:bg-surv-surface-hover rounded-lg uppercase tracking-wider">CANCEL</button>
              <button onClick={() => { alert('Incident logged.'); setShowManualModal(false); }} className="px-5 py-2 bg-surv-accent-bg text-surv-accent text-[10px] font-mono font-bold rounded-lg border border-surv-border uppercase tracking-wider">REGISTER</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Issues;

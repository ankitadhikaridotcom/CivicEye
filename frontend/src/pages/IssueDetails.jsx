import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiService, getFileUrl } from '../utils/api';
import { 
  ArrowLeft, Clock, MapPin, Building2, User, Camera, ShieldAlert, FileText, 
  Crosshair, CheckCircle2, ShieldCheck, HelpCircle, Loader2, Sparkles, RefreshCw, Upload, AlertTriangle
} from 'lucide-react';

export const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  
  // Verification State
  const [verificationFile, setVerificationFile] = useState(null);
  const [verificationPreview, setVerificationPreview] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const fetchIssueDetails = async () => {
    try {
      setLoading(true);
      const data = await apiService.getIssueById(id);
      setIssue(data);
    } catch (err) {
      console.error('Error fetching issue details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssueDetails();
  }, [id]);

  const handleStatusChange = async (newStatus, msg) => {
    if (!issue) return;
    try {
      setTransitioning(true);
      await apiService.updateIssueStatus(issue.issueId, newStatus, msg, 'Command Center Operator');
      await fetchIssueDetails();
    } catch (err) {
      console.error(err);
      alert('Failed to update status.');
    } finally {
      setTransitioning(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVerificationFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVerificationPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setVerificationResult(null);
    }
  };

  const runAIClosureVerification = async () => {
    if (!verificationFile || !issue) return;
    try {
      setVerifying(true);
      setVerificationResult(null);
      
      const result = await apiService.verifyClosure(issue.issueId, verificationFile);
      setVerificationResult(result);
      
      // Reload issue state to reflect automatic closure if verification passed
      await fetchIssueDetails();
    } catch (err) {
      console.error(err);
      setVerificationResult({
        success: false,
        verified: false,
        message: 'AI verification server connection failed. Running simulated verification.'
      });
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <Loader2 size={32} className="text-indigo-650 animate-spin mb-3" />
        <p className="text-xs text-slate-450 font-mono">LOADING FIELD TELEMETRY RECORD...</p>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed p-6 text-center">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">INTEL RECORD NOT FOUND</h2>
        <button onClick={() => navigate('/issues')} className="mt-4 text-[11px] font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl transition-all shadow-sm">
          ← RETURN TO DETECTIONS LOG
        </button>
      </div>
    );
  }

  // Formatting helpers
  const rawConf = issue.confidence || 0;
  const confidencePercent = rawConf <= 1 ? Math.round(rawConf * 100) : Math.round(rawConf);
  const detectedAtTime = new Date(issue.detectedAt || issue.createdAt || Date.now()).toLocaleString();
  const severity = (issue.severity || 'MEDIUM').toUpperCase();

  // Status mapping colors
  let statusBadgeColor = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-350 border-slate-200 dark:border-slate-700';
  if (issue.status === 'OPEN') statusBadgeColor = 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 border-rose-150 dark:border-rose-900/40';
  else if (issue.status === 'ASSIGNED') statusBadgeColor = 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400 border-indigo-150 dark:border-indigo-900/40';
  else if (issue.status === 'IN PROGRESS') statusBadgeColor = 'bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 border-blue-150 dark:border-blue-900/40';
  else if (issue.status === 'RESOLVED') statusBadgeColor = 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400 border-amber-150 dark:border-amber-900/40';
  else if (issue.status === 'AI VERIFIED' || issue.status === 'CLOSED') statusBadgeColor = 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-150 dark:border-emerald-900/40';

  return (
    <div className="space-y-6 pb-12 max-w-6xl">
      {/* Navigation and HUD */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 uppercase tracking-wider px-3.5 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800">
          <ArrowLeft size={14} /> Back to Log
        </button>
        <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 px-3.5 py-1.5 rounded-xl">
          RECORD ID: {issue.issueId}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Incident Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Info Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-indigo-600 to-transparent opacity-30"></div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border ${
                    severity === 'HIGH' ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 border-rose-150' :
                    severity === 'MEDIUM' ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400 border-amber-150' :
                    'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-150'
                  }`}>
                    {severity} SEVERITY
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border ${statusBadgeColor}`}>
                    {issue.status}
                  </span>
                </div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                  {issue.issueType} Violation
                </h1>
              </div>
              <div className="sm:text-right">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">AI Detection Confidence</span>
                <span className="text-xl font-mono font-extrabold text-indigo-600 dark:text-indigo-400">{confidencePercent}%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-5 border-t border-slate-100 dark:border-slate-800">
              <div>
                <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-slate-400 mb-1 uppercase tracking-wider"><Clock size={11}/> Logged At</span>
                <span className="text-[11px] font-semibold text-slate-850 dark:text-slate-200">{detectedAtTime}</span>
              </div>
              <div>
                <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-slate-400 mb-1 uppercase tracking-wider"><MapPin size={11}/> Location</span>
                <span className="text-[11px] font-semibold text-slate-850 dark:text-slate-200">{issue.location} ({issue.ward})</span>
              </div>
              <div>
                <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-slate-400 mb-1 uppercase tracking-wider"><Camera size={11}/> Camera Source</span>
                <span className="text-[11px] font-semibold text-slate-850 dark:text-slate-200 font-mono">{issue.cameraId}</span>
              </div>
              <div>
                <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-slate-400 mb-1 uppercase tracking-wider"><Building2 size={11}/> Assigned Dept</span>
                <span className="text-[11px] font-semibold text-slate-850 dark:text-slate-200">{issue.department}</span>
              </div>
            </div>

            {issue.description && (
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="block text-[9px] font-mono font-bold text-slate-400 mb-1 uppercase tracking-wider">Description</span>
                <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed">
                  {issue.description}
                </p>
              </div>
            )}
          </div>

          {/* Optical Evidence Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-xs font-bold text-slate-850 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Crosshair size={14} className="text-indigo-650 dark:text-indigo-400" />
              Optical Evidence Analysis
            </h3>
            
            {issue.originalImage || issue.annotatedImage ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {issue.originalImage && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase block">Original Capture</span>
                    <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                      <img 
                        src={getFileUrl(issue.originalImage)} 
                        alt="Original" 
                        className="w-full h-full object-contain"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=600&q=80'; }}
                      />
                    </div>
                  </div>
                )}
                {issue.annotatedImage && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase block">AI Annotated Capture</span>
                    <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                      <img 
                        src={getFileUrl(issue.annotatedImage)} 
                        alt="Annotated" 
                        className="w-full h-full object-contain"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=600&q=80'; }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 dark:bg-slate-850/50 border border-slate-100 dark:border-slate-800/80 rounded-xl text-slate-450 text-xs">
                No image data uploaded for this manual report record.
              </div>
            )}
          </div>

          {/* AI Verification module for RESOLVED status */}
          {issue.status === 'RESOLVED' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-indigo-150 dark:border-indigo-950/60 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Sparkles size={16} /> 🤖 Run AI Closure Verification
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                Before closing the issue, verify cleanup action by uploading a new camera frame snapshot of the site. The YOLO detector will scan for remaining garbage.
              </p>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-indigo-200 dark:border-indigo-900/60 rounded-xl p-4 text-center bg-indigo-50/10 hover:bg-indigo-50/20 dark:hover:bg-indigo-900/10 transition-all cursor-pointer relative">
                  <input 
                    type="file" 
                    onChange={handleFileChange} 
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
                  {verificationPreview ? (
                    <div className="space-y-3">
                      <div className="max-h-48 rounded overflow-hidden flex justify-center bg-slate-900">
                        <img src={verificationPreview} alt="Verification" className="max-h-48 object-contain" />
                      </div>
                      <span className="text-[10px] bg-slate-900/80 text-white font-mono px-2 py-1 rounded inline-block">
                        Change File
                      </span>
                    </div>
                  ) : (
                    <div className="py-4 space-y-1 text-slate-550 dark:text-slate-400">
                      <Upload className="mx-auto text-indigo-600 mb-2" size={24} />
                      <p className="text-xs font-semibold">Click or drag cleanup snapshot here</p>
                      <p className="text-[10px] text-slate-400">JPG, PNG formats supported</p>
                    </div>
                  )}
                </div>

                {verificationResult && (
                  <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                    verificationResult.verified 
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-150 dark:border-emerald-900/40' 
                      : 'bg-rose-50 dark:bg-rose-950/20 text-rose-650 dark:text-rose-400 border-rose-150 dark:border-rose-900/40'
                  }`}>
                    <div className="flex items-center gap-2 font-bold mb-1.5 uppercase text-[11px]">
                      {verificationResult.verified ? (
                        <>
                          <CheckCircle2 size={16} /> Verification Passed!
                        </>
                      ) : (
                        <>
                          <AlertTriangle size={16} /> Verification Failed!
                        </>
                      )}
                    </div>
                    <p>{verificationResult.message}</p>
                  </div>
                )}

                {verificationPreview && (
                  <button
                    onClick={runAIClosureVerification}
                    disabled={verifying}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all"
                  >
                    {verifying ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" /> RUNNING AI SEARCH...
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={14} /> Analyze Snapshot & Close Issue
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Timeline & Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Actions panel */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <h3 className="text-xs font-bold text-slate-850 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-150 dark:border-slate-800 pb-2">
              Command Actions
            </h3>
            
            <div className="space-y-3">
              {issue.status === 'OPEN' && (
                <button 
                  onClick={() => handleStatusChange('ASSIGNED', 'Dispatched sanitation squad to location for waste cleanup.')}
                  disabled={transitioning}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-all uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5"
                >
                  {transitioning ? <Loader2 size={14} className="animate-spin" /> : 'Dispatch Field Squad'}
                </button>
              )}

              {issue.status === 'ASSIGNED' && (
                <button 
                  onClick={() => handleStatusChange('IN PROGRESS', 'Field team has arrived on site and started clearance work.')}
                  disabled={transitioning}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-all uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5"
                >
                  {transitioning ? <Loader2 size={14} className="animate-spin" /> : 'Start Resolution Work'}
                </button>
              )}

              {issue.status === 'IN PROGRESS' && (
                <button 
                  onClick={() => handleStatusChange('RESOLVED', 'Field team finished cleanup. Upload closure snapshot for verification.')}
                  disabled={transitioning}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-all uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5"
                >
                  {transitioning ? <Loader2 size={14} className="animate-spin" /> : 'Mark As Resolved'}
                </button>
              )}

              {issue.status === 'CLOSED' && (
                <div className="p-3 text-center rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 border border-emerald-100 dark:border-emerald-900/30 text-xs font-semibold uppercase tracking-wider">
                  Issue Closed (Resolved & Verified)
                </div>
              )}

              <button 
                onClick={() => handleStatusChange(issue.status, `Supervisor requested update/escalation for ${issue.issueId}`)}
                className="w-full py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold text-xs rounded-xl transition-all uppercase tracking-wider"
              >
                Trigger Incident Escalation
              </button>
            </div>
          </div>

          {/* Incident Timeline Log */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <h3 className="text-xs font-bold text-slate-855 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-150 dark:border-slate-800 pb-2">
              Timeline Log
            </h3>
            
            <div className="space-y-4">
              {issue.history && issue.history.map((log, index) => (
                <div key={index} className="flex gap-3 relative before:absolute before:left-[11px] before:top-6 before:bottom-0 before:w-px before:bg-slate-100 dark:before:bg-slate-800 last:before:hidden">
                  <div className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center shrink-0 z-10">
                    <ShieldAlert size={10} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                        {log.status}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400">
                        by {log.user || 'System AI'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                      {log.message}
                    </p>
                    <p className="text-[9px] text-slate-450 font-mono mt-1">
                      {new Date(log.time).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;

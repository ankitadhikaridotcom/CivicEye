import React, { useState, useRef } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { 
  BrainCircuit, UploadCloud, RefreshCw, ShieldAlert, Cpu, Eye, Image as ImageIcon, 
  CheckCircle2, MapPin, Building2, Check, AlertTriangle, Play, HelpCircle, Trash2
} from 'lucide-react';
import { apiService, getFileUrl } from '../utils/api';

const AIAnalysis = () => {
  const { language = 'en' } = useOutletContext() || {};
  const isHindi = language === 'hi';
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.35);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createdIssueId, setCreatedIssueId] = useState(null);
  const [detectingGps, setDetectingGps] = useState(false);
  
  // Create Issue Form State
  const [formData, setFormData] = useState({
    issueType: 'Garbage',
    location: 'Rajpur Road, Dehradun',
    ward: 'Ward 12 - Clock Tower',
    latitude: '30.3245',
    longitude: '78.0410',
    description: 'AI detected garbage accumulation.',
    cameraId: 'CAM-104'
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
        
        setFormData(prev => ({
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
            
            setFormData(prev => ({
              ...prev,
              location: locationText,
              ward: wardText
            }));
          } else {
            setFormData(prev => ({
              ...prev,
              location: `Lat: ${latStr}, Lon: ${lonStr}`,
              ward: 'General Ward'
            }));
          }
        } catch (e) {
          console.error(e);
          setFormData(prev => ({
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

  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file) => {
    setError(null);
    setAnalysisResult(null);
    setShowCreateForm(false);
    setCreatedIssueId(null);

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError(isHindi ? 'फ़ाइल का आकार 10MB से अधिक नहीं होना चाहिए।' : 'File size exceeds 10MB limit.');
      return;
    }

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError(isHindi ? 'केवल JPG, PNG, और WEBP समर्थित हैं।' : 'Only JPG, PNG, and WEBP formats are supported.');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setAnalysisResult(null);
    setError(null);
    setShowCreateForm(false);
    setCreatedIssueId(null);
  };

  const triggerBrowse = () => {
    fileInputRef.current.click();
  };

  const runAIAnalysis = async () => {
    if (!selectedFile) return;
    setAnalyzing(true);
    setError(null);
    
    try {
      const result = await apiService.detectGarbage(selectedFile, confidenceThreshold);
      
      // Check if AI service was unavailable (honest response, no fabrication)
      if (result.ai_service_unavailable) {
        setError(
          isHindi
            ? 'AI सेवा अस्थायी रूप से अनुपलब्ध है (कोल्ड-स्टार्टिंग)। कृपया 30-60 सेकंड में पुनः प्रयास करें।'
            : 'AI detection service is temporarily unavailable (cold-starting on Render free tier). Please retry in 30-60 seconds.'
        );
        setAnalysisResult(null);
        return;
      }

      // Filter detections based on threshold
      const filteredDetections = (result.detections || []).filter(
        d => d.confidence >= confidenceThreshold
      );

      // Re-evaluate count and severity based on filtered threshold
      const count = filteredDetections.length;
      let severity = 'LOW';
      if (count >= 3 || (filteredDetections.length > 0 && Math.max(...filteredDetections.map(d => d.confidence)) >= 0.85)) {
        severity = 'HIGH';
      } else if (count >= 1) {
        severity = 'MEDIUM';
      }

      // If YOLO returned zero detections, severity should be NONE
      if (count === 0) {
        severity = 'NONE';
      }

      setAnalysisResult({
        ...result,
        detections: filteredDetections,
        count,
        severity,
        garbage_detected: count > 0
      });
    } catch (err) {
      console.error(err);
      setError(
        isHindi 
          ? 'एआई विश्लेषण करने में विफल। कृपया पुनः प्रयास करें।' 
          : 'AI Analysis service connection failed. Please ensure the backend and AI services are running.'
      );
    } finally {
      setAnalyzing(false);
    }
  };

  const handleCreateIssue = async (e) => {
    e.preventDefault();
    if (!analysisResult) return;
    
    try {
      const issueData = {
        issueType: formData.issueType,
        location: formData.location,
        ward: formData.ward,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        severity: analysisResult.severity,
        confidence: analysisResult.detections[0]?.confidence || confidenceThreshold,
        department: 'Sanitation Department', // Smart Routed
        description: formData.description,
        originalImage: analysisResult.originalImageUrl,
        annotatedImage: analysisResult.annotatedImageUrl,
        cameraId: formData.cameraId,
        detectedAt: new Date()
      };

      const res = await apiService.createIssue(issueData);
      if (res.success) {
        setCreatedIssueId(res.issue.issueId);
        setShowCreateForm(false);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to create civic issue in database.');
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl">
      {/* Header */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 overflow-hidden shadow-sm">
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-indigo-600 to-transparent opacity-30"></div>
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-indigo-500"></div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BrainCircuit size={18} className="text-indigo-600 dark:text-indigo-400" />
              <h1 className="font-sans text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                AI Detection Center
              </h1>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono tracking-wide uppercase">
              Upload civic images for real-time computer vision analysis & smart routing
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-150 dark:border-emerald-900/60 px-3 py-1.5 rounded-xl flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              YOLO best.pt Loaded
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upload & Controls Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 relative overflow-hidden shadow-sm">
            <h2 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
              <UploadCloud size={14} className="text-indigo-600" />
              Upload Image
            </h2>

            {/* Configurable Threshold */}
            <div className="mb-4 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/50">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Confidence Threshold
                </label>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {Math.round(confidenceThreshold * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.10"
                max="0.95"
                step="0.05"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
                <span>0.10 (Sens.)</span>
                <span>Default: 0.35</span>
                <span>0.95 (Strict)</span>
              </div>
            </div>
            
            {/* Upload Area */}
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={imagePreview ? null : triggerBrowse}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                imagePreview 
                  ? 'border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/10' 
                  : 'border-slate-350 dark:border-slate-700 hover:border-indigo-500 bg-slate-50 dark:bg-slate-800/25 cursor-pointer'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />

              {imagePreview ? (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 max-h-72 flex justify-center bg-slate-900">
                    <img 
                      src={imagePreview} 
                      alt="Uploaded preview" 
                      className="max-h-72 object-contain"
                    />
                    <div className="absolute top-2 right-2 flex gap-1.5">
                      <button 
                        onClick={handleRemove}
                        className="bg-slate-900/80 hover:bg-slate-900 text-white p-1.5 rounded-lg text-[10px] flex items-center gap-1 backdrop-blur-sm"
                      >
                        <Trash2 size={12} /> Clear
                      </button>
                    </div>
                  </div>
                  
                  {!analysisResult && (
                    <button 
                      onClick={runAIAnalysis}
                      disabled={analyzing}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm"
                    >
                      {analyzing ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" /> Analyzing Image...
                        </>
                      ) : (
                        <>
                          <Play size={12} fill="white" /> Analyze with AI
                        </>
                      )}
                    </button>
                  )}
                </div>
              ) : (
                <div className="py-6">
                  <ImageIcon size={32} className="mx-auto text-slate-400 dark:text-slate-600 mb-3" />
                  <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                    Drag & Drop Civic Photo
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-4">
                    JPG, JPEG, PNG, WEBP • Max 10 MB
                  </p>
                  <button 
                    onClick={triggerBrowse}
                    className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 rounded-xl text-[10px] font-semibold border border-indigo-100 dark:border-indigo-900/40 uppercase tracking-wider transition-all"
                  >
                    Browse Local Storage
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/40 text-[11px] font-medium flex items-start gap-2">
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Extensibility Status */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-3 border-b border-slate-100 dark:border-slate-800 pb-1.5">
              Model Capabilities
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/40 font-semibold">
                <span>🗑️ Garbage Detection</span>
                <span>Active</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-850">
                <span>🟡 Illegal Dumping Detection</span>
                <span className="text-[10px] font-mono opacity-80">Architecture Ready</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-850">
                <span>🟡 Encroachment Detection</span>
                <span className="text-[10px] font-mono opacity-80">Architecture Ready</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-850">
                <span>🟡 Road Obstruction Detection</span>
                <span className="text-[10px] font-mono opacity-80">Architecture Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Results & Routing Panel */}
        <div className="lg:col-span-7">
          {analyzing ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 h-full min-h-[400px] flex flex-col items-center justify-center shadow-sm">
              <div className="relative w-20 h-20 mb-6">
                {/* Scanner visualizer */}
                <div className="absolute inset-0 border-2 border-indigo-600 rounded-full animate-ping opacity-45"></div>
                <div className="absolute inset-2 border border-cyan-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Cpu size={32} className="animate-spin" />
                </div>
              </div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider animate-pulse">
                Running YOLO Engine
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Parsing image matrix, running feature extraction...
              </p>
            </div>
          ) : analysisResult ? (
            <div className="space-y-6">
              {/* Main Analysis Output */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                  AI Prediction Results
                </h3>

                {analysisResult.count === 0 ? (
                  /* ── Zero Detections: Clean Image ── */
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl flex items-center justify-center text-emerald-500 mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      No Garbage Detected
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
                      The YOLO model found <span className="font-bold text-slate-700 dark:text-slate-200">0 objects</span> matching the garbage class at the current confidence threshold of <span className="font-mono font-bold text-indigo-600">{Math.round(confidenceThreshold * 100)}%</span>.
                    </p>
                    <div className="mt-4 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60 text-left w-full max-w-sm">
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Objects Count:</span>
                          <span className="font-bold text-slate-800 dark:text-white">0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Severity:</span>
                          <span className="font-bold text-emerald-500 uppercase">NONE</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Action Required:</span>
                          <span className="font-bold text-emerald-500">None</span>
                        </div>
                      </div>
                    </div>
                    {analysisResult.annotatedImageUrl && (
                      <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 max-w-sm w-full">
                        <img 
                          src={getFileUrl(analysisResult.annotatedImageUrl)} 
                          alt="Scanned image (no detections)" 
                          className="max-h-48 object-contain w-full"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  /* ── Detections Found ── */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Bounding box image */}
                  <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 flex items-center justify-center">
                    <img 
                      src={getFileUrl(analysisResult.annotatedImageUrl)} 
                      alt="Annotated prediction" 
                      className="max-h-72 object-contain w-full"
                    />
                  </div>

                  {/* Summary telemetry */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Detection Summary</h4>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/80 pb-1.5 text-xs">
                          <span className="text-slate-500">Object Type:</span>
                          <span className="font-bold text-slate-800 dark:text-white">{analysisResult.detections[0]?.class || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/80 pb-1.5 text-xs">
                          <span className="text-slate-500">Confidence Score:</span>
                          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                            {analysisResult.detections[0] ? `${(analysisResult.detections[0].confidence * 100).toFixed(1)}%` : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/80 pb-1.5 text-xs">
                          <span className="text-slate-500">Objects Count:</span>
                          <span className="font-bold text-slate-800 dark:text-white">
                            {analysisResult.count} {analysisResult.count === 1 ? 'pile' : 'piles'}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/80 pb-1.5 text-xs">
                          <span className="text-slate-500">Calculated Severity:</span>
                          <span className={`font-bold uppercase ${
                            analysisResult.severity === 'HIGH' ? 'text-rose-600' :
                            analysisResult.severity === 'MEDIUM' ? 'text-amber-500' :
                            'text-emerald-500'
                          }`}>
                            {analysisResult.severity}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Confidence Meter */}
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Confidence Meter</h4>
                      {(() => {
                        const confidence = analysisResult.detections[0]?.confidence || 0;
                        const percent = Math.round(confidence * 100);
                        let level = 'LOW CONFIDENCE';
                        let colorClass = 'bg-rose-500';
                        
                        if (confidence >= 0.80) {
                          level = 'HIGH CONFIDENCE';
                          colorClass = 'bg-indigo-600';
                        } else if (confidence >= 0.60) {
                          level = 'MEDIUM CONFIDENCE';
                          colorClass = 'bg-amber-500';
                        }

                        return (
                          <div className="bg-slate-50 dark:bg-slate-850 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/60">
                            <div className="flex justify-between items-center text-[10px] mb-1 font-bold">
                              <span className="text-slate-700 dark:text-slate-300">{percent}%</span>
                              <span className={confidence >= 0.80 ? 'text-indigo-600' : confidence >= 0.60 ? 'text-amber-500' : 'text-rose-600'}>
                                {level}
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                              <div className={`h-full ${colorClass}`} style={{ width: `${percent}%` }}></div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                  </div>
                )}
              </div>

              {/* Smart Department Routing Card — Only shown when garbage is detected */}
              {analysisResult.count > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                <h3 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Building2 size={15} /> Smart Routing Engine
                </h3>
                <div className="bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800/60 p-4 rounded-xl flex items-start gap-4">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
                    <CheckCircle2 size={24} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                      AI IDENTIFIED: Garbage Accumulation
                    </div>
                    <div className="text-sm font-extrabold text-slate-800 dark:text-white">
                      Responsible Department: <span className="text-indigo-600 dark:text-indigo-400">Sanitation Department</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Recommended Action: <span className="font-semibold text-slate-700 dark:text-slate-300">Immediate sanitation response & dump clearing.</span>
                    </p>
                  </div>
                </div>
              </div>
              )}

              {/* Action Buttons — Only shown when garbage is detected */}
              {analysisResult.count > 0 && (
              <div className="flex gap-3">
                {createdIssueId ? (
                  <div className="w-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-150 dark:border-emerald-900/50 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0">
                        <Check size={20} />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-800 dark:text-white">
                          Civic Issue Created Successfully!
                        </h4>
                        <p className="text-sm font-mono font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5">
                          ID: {createdIssueId}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => navigate(`/issues/${createdIssueId}`)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs uppercase tracking-wider"
                      >
                        Inspect Issue
                      </button>
                      <button 
                        onClick={() => navigate('/issues')}
                        className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl text-xs uppercase tracking-wider"
                      >
                        View All
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {!showCreateForm ? (
                      <button 
                        onClick={() => setShowCreateForm(true)}
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs uppercase tracking-wider shadow-sm"
                      >
                        Create Civic Issue
                      </button>
                    ) : (
                      <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm text-left">
                        <h4 className="text-xs font-extrabold text-slate-800 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                          Create Civic Issue
                        </h4>
                        <form onSubmit={handleCreateIssue} className="space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 mb-2">
                            <div>
                              <p className="text-[10px] font-bold text-slate-800 dark:text-white uppercase tracking-wider font-sans">GPS Geolocation Assist</p>
                              <p className="text-[9px] text-slate-400 font-mono uppercase">Lock coordinates & reverse-geocode location</p>
                            </div>
                            <button
                              type="button"
                              onClick={handleDetectGps}
                              disabled={detectingGps}
                              className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-750 disabled:bg-indigo-400 text-white rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all shadow-sm shrink-0 cursor-pointer"
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
                              <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Issue Type</label>
                              <input 
                                type="text" 
                                readOnly
                                value={formData.issueType}
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-500 font-semibold outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Assigned Department</label>
                              <input 
                                type="text" 
                                readOnly
                                value="Sanitation Department"
                                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-500 font-semibold outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Location Address</label>
                              <input 
                                type="text" 
                                required
                                value={formData.location}
                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white outline-none focus:border-indigo-500"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Municipal Ward</label>
                              <input 
                                type="text" 
                                required
                                value={formData.ward}
                                onChange={(e) => setFormData({...formData, ward: e.target.value})}
                                className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white outline-none focus:border-indigo-500"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Latitude</label>
                              <input 
                                type="text" 
                                required
                                value={formData.latitude}
                                onChange={(e) => setFormData({...formData, latitude: e.target.value})}
                                className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white outline-none focus:border-indigo-500 font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Longitude</label>
                              <input 
                                type="text" 
                                required
                                value={formData.longitude}
                                onChange={(e) => setFormData({...formData, longitude: e.target.value})}
                                className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white outline-none focus:border-indigo-500 font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Camera ID / Source</label>
                              <input 
                                type="text" 
                                required
                                value={formData.cameraId}
                                onChange={(e) => setFormData({...formData, cameraId: e.target.value})}
                                className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white outline-none focus:border-indigo-500 font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Severity / Confidence</label>
                              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-500 font-semibold font-mono">
                                {analysisResult.severity} / {Math.round((analysisResult.detections[0]?.confidence || confidenceThreshold) * 100)}%
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Description</label>
                            <textarea 
                              rows="3"
                              value={formData.description}
                              onChange={(e) => setFormData({...formData, description: e.target.value})}
                              className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white outline-none focus:border-indigo-500"
                            />
                          </div>
                          
                          <div className="flex gap-2 justify-end pt-2">
                            <button 
                              type="button"
                              onClick={() => setShowCreateForm(false)}
                              className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl text-xs uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit"
                              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all"
                            >
                              Submit Civic Issue
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </>
                )}
              </div>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 h-full min-h-[400px] flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800/80 rounded-2xl flex items-center justify-center text-slate-400 dark:text-slate-600 mb-4 shadow-sm">
                <Eye size={28} />
              </div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                Awaiting Image Upload
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                Drag a photo of a garbage accumulation area or browse local storage. The YOLO model will output labeled detections and confidence stats.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;

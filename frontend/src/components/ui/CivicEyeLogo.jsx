import React from 'react';

export const CivicEyeLogo = ({ size = 36, className = "" }) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`} style={{ width: size, height: size }}>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient id="shieldGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563EB" />
            <stop offset="0.5" stopColor="#0F766E" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="irisGrad" x1="30" y1="30" x2="70" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8" />
            <stop offset="1" stopColor="#1E3A8A" />
          </linearGradient>
          <linearGradient id="mountainGrad" x1="40" y1="50" x2="60" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#93C5FD" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Shield Outline representing Civic Protection & GovTech */}
        <path 
          d="M50 8 L85 22 C85 62 50 88 50 88 C50 88 15 62 15 22 Z" 
          stroke="url(#shieldGrad)" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="#0F172A"
          fillOpacity="0.85"
        />

        {/* AI Circuit Nodes & Neural Traces */}
        <line x1="28" y1="32" x2="38" y2="40" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.7"/>
        <line x1="72" y1="32" x2="62" y2="40" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.7"/>
        <line x1="50" y1="16" x2="50" y2="28" stroke="#10B981" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.7"/>
        
        <circle cx="28" cy="32" r="2.5" fill="#38BDF8" />
        <circle cx="72" cy="32" r="2.5" fill="#38BDF8" />
        <circle cx="50" cy="16" r="2.5" fill="#10B981" />

        {/* Stylized Eye Shape (CivicEye - AI Vision) */}
        <path 
          d="M24 50 Q50 28 76 50 Q50 72 24 50 Z" 
          fill="#0F172A" 
          stroke="url(#shieldGrad)" 
          strokeWidth="2.5" 
          strokeLinejoin="round"
        />

        {/* Iris / Aperture Circle */}
        <circle 
          cx="50" 
          cy="50" 
          r="13" 
          fill="url(#irisGrad)" 
          stroke="#38BDF8" 
          strokeWidth="1.5"
          filter="url(#glow)"
        />

        {/* Himalayan Mountain Peaks silhouette in the Iris/Pupil */}
        <path 
          d="M40 58 L47 48 L51 53 L56 45 L62 58 Z" 
          fill="url(#mountainGrad)" 
        />
        
        {/* Mountain ridge accent */}
        <path 
          d="M47 48 L48 58 M56 45 L55 58" 
          stroke="#1E3A8A" 
          strokeWidth="0.8" 
          opacity="0.6" 
        />

        {/* AI Center Glowing Node */}
        <circle cx="50" cy="42" r="1.5" fill="#FFFFFF" />
        <circle cx="50" cy="50" r="1" fill="#10B981" />
      </svg>
    </div>
  );
};

export default CivicEyeLogo;

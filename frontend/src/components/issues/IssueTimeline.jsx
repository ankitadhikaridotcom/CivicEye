import React from 'react';
import { Bot, UserCog, Truck, CheckCircle2, FileCheck } from 'lucide-react';

const TimelineItem = ({ icon: Icon, title, time, active, isLast, verifiedByAI }) => (
  <div className="flex gap-4 relative">
    {!isLast && (
      <div className={`absolute left-4 top-10 bottom-[-16px] w-0.5 ${active ? 'bg-brand-emerald' : 'bg-slate-200'}`} />
    )}
    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
      active ? 'bg-brand-emerald text-white shadow-md shadow-brand-emerald/20' : 'bg-slate-100 text-slate-400'
    }`}>
      <Icon size={16} />
    </div>
    <div className="pb-8">
      <h4 className={`font-semibold text-sm ${active ? 'text-brand-navy' : 'text-slate-500'}`}>{title}</h4>
      {time && <p className="text-xs text-slate-500 mt-1">{time}</p>}
      
      {verifiedByAI && (
        <div className="mt-3 bg-brand-emerald/10 border border-brand-emerald/20 rounded-lg p-3 text-xs text-brand-emerald max-w-xs">
          <div className="flex items-center gap-1.5 font-bold mb-1">
            <CheckCircle2 size={14} /> AI Verification
          </div>
          Previous: Garbage Present<br/>
          Current: No Significant Garbage<br/>
          Confidence: 96.8%<br/>
          Status: ✓ VERIFIED CLEAN
        </div>
      )}
    </div>
  </div>
);

const IssueTimeline = ({ status }) => {
  // Simple logic to show timeline progress based on status
  const steps = [
    { title: 'AI Detected', icon: Bot, time: '2 mins ago', active: true },
    { title: 'Classified & Routed', icon: FileCheck, time: '1 min ago', active: true },
    { title: 'Department Assigned', icon: UserCog, time: status !== 'Open' ? 'Just now' : null, active: status !== 'Open' },
    { title: 'Field Action', icon: Truck, active: status === 'Resolved' },
    { title: 'AI Verification & Closure', icon: CheckCircle2, active: status === 'Resolved', isLast: true, verifiedByAI: status === 'Resolved' }
  ];

  return (
    <div className="pt-2">
      {steps.map((step, idx) => (
        <TimelineItem key={idx} {...step} />
      ))}
    </div>
  );
};

export default IssueTimeline;

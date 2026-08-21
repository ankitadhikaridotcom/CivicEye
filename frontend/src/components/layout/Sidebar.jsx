import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Map as MapIcon, Video, AlertTriangle, Trash2, MapPin, Box, 
  ShieldAlert, Building2, Users, ClipboardList, FileText, BrainCircuit, BarChart3, 
  Activity, Bell, Settings, X, ChevronRight, ShieldCheck, Radio, Crosshair, Eye
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import CivicEyeLogo from '../ui/CivicEyeLogo';
import { mockIssues, mockCameras, mockNotifications } from '../../data/mockData';

function cn(...inputs) { return twMerge(clsx(inputs)); }

const SidebarItem = ({ icon: Icon, label, to, badge, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/dashboard' && location.pathname.startsWith(to));
  
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive: linkActive }) => cn(
        "group flex items-center justify-between px-3 py-2 rounded-lg text-[11px] font-medium tracking-wide transition-all duration-200 relative",
        linkActive 
          ? "bg-surv-accent-bg text-surv-accent border border-surv-border font-semibold surv-glow" 
          : "text-surv-muted hover:bg-surv-surface-hover hover:text-surv-text border border-transparent"
      )}
    >
      <div className="flex items-center gap-2.5">
        <Icon size={15} className={cn("transition-all duration-200", isActive ? "text-surv-accent" : "text-surv-muted opacity-80 group-hover:text-surv-accent group-hover:opacity-100")} />
        <span className="uppercase tracking-wider">{label}</span>
      </div>
      {badge ? (
        <span className={cn(
          "px-1.5 py-0.5 text-[9px] font-bold rounded font-mono",
          isActive ? "bg-surv-accent-bg text-surv-accent" : "bg-surv-critical-bg text-surv-critical border border-surv-border"
        )}>
          {badge}
        </span>
      ) : null}
    </NavLink>
  );
};

const SidebarGroup = ({ title, children }) => (
  <div className="mb-4">
    <h3 className="px-3 text-[9px] font-bold text-surv-accent opacity-60 uppercase tracking-[0.2em] mb-1.5 flex items-center gap-2">
      <span className="w-1 h-1 rounded-full bg-surv-accent opacity-50"></span>
      <span>{title}</span>
      <div className="h-px bg-surv-border flex-1"></div>
    </h3>
    <div className="space-y-0.5">
      {children}
    </div>
  </div>
);

const Sidebar = ({ isOpen, setIsOpen, language = 'en' }) => {
  const isHindi = language === 'hi';
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const cameraBadge = mockCameras.length > 0 ? `${mockCameras.length}` : null;
  const issuesBadge = mockIssues.length > 0 ? `${mockIssues.length}` : null;
  const notifBadge = mockNotifications.filter(n => !n.read).length > 0 ? `${mockNotifications.filter(n => !n.read).length}` : null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      <aside className={cn(
        "fixed md:static inset-y-0 left-0 z-50 w-64 bg-surv-surface border-r border-surv-border transform transition-transform duration-300 ease-in-out overflow-hidden flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Branding */}
        <div className="p-4 flex items-center justify-between border-b border-surv-border relative">
          <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-surv-accent to-transparent opacity-30"></div>
          
          <NavLink to="/dashboard" className="flex items-center gap-3 group">
            <div className="relative">
              <CivicEyeLogo size={36} className="group-hover:scale-105 transition-transform" />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-surv-success border-2 border-surv-surface"></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-display text-sm font-bold tracking-wider text-surv-accent">
                  CIVICEYE
                </h1>
              </div>
              <p className="text-[9px] text-surv-accent opacity-60 font-mono tracking-widest uppercase">
                SURVEILLANCE • AI v2.4
              </p>
            </div>
          </NavLink>
          <button className="md:hidden text-surv-muted hover:text-surv-text p-1 rounded" onClick={() => setIsOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Live Clock / System Status */}
        <div className="px-4 py-2.5 border-b border-surv-border bg-surv-accent-bg opacity-80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="w-2 h-2 rounded-full bg-surv-success block"></span>
                <span className="absolute inset-0 w-2 h-2 rounded-full bg-surv-success animate-ping opacity-40"></span>
              </div>
              <span className="text-[10px] font-mono font-bold text-surv-success uppercase tracking-wider">SYSTEM ONLINE</span>
            </div>
            <span className="text-[10px] font-mono opacity-80 text-surv-accent">
              {currentTime.toLocaleTimeString('en-US', { hour12: false })}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-2.5 py-3 overflow-y-auto custom-scrollbar relative z-10">
          <SidebarGroup title={isHindi ? 'कमांड सेंटर' : 'Command Center'}>
            <SidebarItem icon={LayoutDashboard} label={isHindi ? 'डैशबोर्ड' : 'Dashboard'} to="/dashboard" onClick={() => setIsOpen(false)} />
            <SidebarItem icon={MapIcon} label={isHindi ? 'जीआईएस मैप' : 'GIS Map'} to="/map" onClick={() => setIsOpen(false)} />
            <SidebarItem icon={Video} label={isHindi ? 'लाइव फीड' : 'Live Feeds'} to="/live-monitoring" badge={cameraBadge} onClick={() => setIsOpen(false)} />
            <SidebarItem icon={Radio} label={isHindi ? 'कंट्रोल रूम' : 'Control Room'} to="/state-control" onClick={() => setIsOpen(false)} />
          </SidebarGroup>

          <SidebarGroup title={isHindi ? 'डिटेक्शन' : 'Detections'}>
            <SidebarItem icon={AlertTriangle} label={isHindi ? 'सभी अलर्ट' : 'All Alerts'} to="/issues" badge={issuesBadge} onClick={() => setIsOpen(false)} />
            <SidebarItem icon={Trash2} label={isHindi ? 'कचरा' : 'Waste'} to="/issues?type=garbage" onClick={() => setIsOpen(false)} />
            <SidebarItem icon={Box} label={isHindi ? 'अतिक्रमण' : 'Encroach'} to="/issues?type=encroachment" onClick={() => setIsOpen(false)} />
            <SidebarItem icon={MapPin} label={isHindi ? 'डंपिंग' : 'Dumping'} to="/issues?type=dumping" onClick={() => setIsOpen(false)} />
            <SidebarItem icon={Activity} label={isHindi ? 'अवरोध' : 'Obstruction'} to="/issues?type=obstruction" onClick={() => setIsOpen(false)} />
          </SidebarGroup>

          <SidebarGroup title={isHindi ? 'ऑपरेशन' : 'Operations'}>
            <SidebarItem icon={Building2} label={isHindi ? 'विभाग' : 'Departments'} to="/ulb" onClick={() => setIsOpen(false)} />
            <SidebarItem icon={Users} label={isHindi ? 'ऑपरेटर' : 'Operators'} to="/officers" onClick={() => setIsOpen(false)} />
            <SidebarItem icon={ClipboardList} label={isHindi ? 'डिस्पैच' : 'Dispatch'} to="/assignments" onClick={() => setIsOpen(false)} />
            <SidebarItem icon={FileText} label={isHindi ? 'रिपोर्ट' : 'Reports'} to="/reports" onClick={() => setIsOpen(false)} />
          </SidebarGroup>

          <SidebarGroup title={isHindi ? 'इंटेलिजेंस' : 'Intelligence'}>
            <SidebarItem icon={BrainCircuit} label={isHindi ? 'एआई इंजन' : 'AI Engine'} to="/ai-analysis" onClick={() => setIsOpen(false)} />
            <SidebarItem icon={BarChart3} label={isHindi ? 'एनालिटिक्स' : 'Analytics'} to="/analytics" onClick={() => setIsOpen(false)} />
          </SidebarGroup>

          <SidebarGroup title={isHindi ? 'सिस्टम' : 'System'}>
            <SidebarItem icon={Bell} label={isHindi ? 'अलर्ट' : 'Alerts'} to="/notifications" badge={notifBadge} onClick={() => setIsOpen(false)} />
            <SidebarItem icon={Settings} label={isHindi ? 'कॉन्फ़िग' : 'Config'} to="/settings" onClick={() => setIsOpen(false)} />
          </SidebarGroup>
        </div>

        {/* Bottom Panel */}
        <div className="p-3 border-t border-surv-border bg-surv-bg">
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-surv-accent-bg border border-surv-border group cursor-pointer hover:bg-surv-accent-hover transition-colors">
            <div className="w-8 h-8 rounded-lg bg-surv-accent-bg border border-surv-border flex items-center justify-center">
              <Crosshair size={14} className="text-surv-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-surv-text uppercase tracking-wider">Control Admin</span>
                <ShieldCheck size={10} className="text-surv-success" />
              </div>
              <p className="text-[9px] text-surv-muted font-mono">SYSTEM ADMIN</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

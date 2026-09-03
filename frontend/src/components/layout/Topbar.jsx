import React, { useState, useEffect } from 'react';
import { Menu, Bell, User, MapPin, ChevronDown, Check, Shield, Globe, ExternalLink, Radio, Wifi, Cpu, Sun, Moon } from 'lucide-react';
import { mockCities, mockNotifications } from '../../data/mockData';
import CivicEyeLogo from '../ui/CivicEyeLogo';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const Topbar = ({ onMenuClick, selectedCity, setSelectedCity, language, setLanguage, citiesData = mockCities }) => {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { theme, toggleTheme } = useTheme();
  
  const isHindi = language === 'hi';
  const unreadNotifs = mockNotifications.filter(n => !n.read).length;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex flex-col z-30 sticky top-0">
      {/* Surveillance Top Strip */}
      <div className="bg-surv-surface text-surv-muted h-7 flex items-center justify-between px-4 lg:px-6 text-[10px] font-mono border-b border-surv-border relative">
        <div className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-surv-accent to-transparent opacity-20"></div>
        
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-surv-accent font-bold tracking-wider uppercase opacity-80">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
            {isHindi ? 'नागरिक निगरानी प्रणाली' : 'CIVIC SURVEILLANCE PLATFORM'}
          </span>
          <span className="opacity-20 hidden sm:inline">│</span>
          <span className="hidden sm:inline tracking-wider uppercase opacity-80">
            {isHindi ? 'नगरीय विकास निगरानी' : 'URBAN CIVIC SURVEILLANCE DIVISION'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline tracking-wider opacity-80">
            {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
          </span>
          <span className="opacity-20">│</span>
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center p-1 rounded hover:bg-surv-accent-bg text-surv-muted hover:text-surv-accent transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={12} /> : <Moon size={12} />}
          </button>
          
          <span className="opacity-20">│</span>

          {/* Language Toggle */}
          <div className="flex items-center gap-0.5 bg-surv-accent-bg rounded border border-surv-border p-0.5">
            <Globe size={10} className="opacity-40 ml-1 text-surv-accent" />
            <button 
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all ${
                language === 'en' ? 'bg-surv-accent text-white' : 'hover:text-surv-text'
              }`}
            >EN</button>
            <button 
              onClick={() => setLanguage('hi')}
              className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all ${
                language === 'hi' ? 'bg-surv-accent text-white' : 'hover:text-surv-text'
              }`}
            >हिं</button>
          </div>
        </div>
      </div>

      {/* Main Command Bar */}
      <div className="bg-surv-surface/95 backdrop-blur-xl border-b border-surv-border h-14 flex items-center justify-between px-4 lg:px-6">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="p-2 -ml-2 rounded-lg text-surv-muted hover:text-surv-accent hover:bg-surv-accent-bg md:hidden transition-colors">
            <Menu size={20} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="md:hidden"><CivicEyeLogo size={28} /></div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-surv-text tracking-wide">
                  {isHindi ? 'कमांड सेंटर' : 'COMMAND CENTER'}
                </h2>
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-surv-success-bg border border-surv-border">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-surv-success opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-surv-success"></span>
                  </span>
                  <span className="text-[9px] font-mono font-bold text-surv-success uppercase tracking-wider">
                    {isHindi ? 'लाइव' : 'OPERATIONAL'}
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-surv-muted font-mono tracking-wide hidden sm:block">
                {isHindi ? 'उत्तराखंड सम्पूर्ण राज्य निगरानी' : 'STATEWIDE MONITORING ACTIVE'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Sector Selector */}
          <div className="relative">
            <button 
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className="flex items-center gap-2 bg-surv-accent-bg hover:bg-surv-accent-hover border border-surv-border rounded-lg px-3 py-1.5 text-[10px] font-mono font-bold text-surv-text transition-all uppercase tracking-wider"
            >
              <Wifi size={12} className="text-surv-accent" />
              <span>{selectedCity === 'All Uttarakhand' ? 'ALL SECTORS' : selectedCity.toUpperCase()}</span>
              <ChevronDown size={12} className={`opacity-40 transition-transform ${cityDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {cityDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setCityDropdownOpen(false)} />
                <div className="absolute top-full mt-1.5 right-0 w-56 bg-surv-surface rounded-lg border border-surv-border p-1 z-50 shadow-lg">
                  <div className="px-3 py-1.5 text-[9px] font-mono font-bold text-surv-accent opacity-60 uppercase tracking-widest">
                    {isHindi ? 'निगरानी क्षेत्र' : 'MONITORING SECTOR'}
                  </div>
                  <button 
                    onClick={() => { setSelectedCity('All Uttarakhand'); setCityDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-[10px] rounded-md font-mono font-bold transition-colors flex items-center justify-between uppercase tracking-wider ${
                      selectedCity === 'All Uttarakhand' ? 'bg-surv-accent-bg text-surv-accent' : 'text-surv-muted hover:bg-surv-surface-hover hover:text-surv-text'
                    }`}
                  >
                    <span>{isHindi ? 'सम्पूर्ण उत्तराखंड' : 'ALL SECTORS'}</span>
                    {selectedCity === 'All Uttarakhand' && <Check size={12} />}
                  </button>
                  <div className="h-px bg-surv-border my-1 mx-1"></div>
                  <div className="max-h-60 overflow-y-auto custom-scrollbar">
                    {citiesData.map(city => (
                      <button 
                        key={city.id}
                        onClick={() => { setSelectedCity(city.name); setCityDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-1.5 text-[10px] rounded-md font-mono font-bold transition-colors flex items-center justify-between ${
                          selectedCity === city.name ? 'bg-surv-accent-bg text-surv-accent' : 'text-surv-muted hover:bg-surv-surface-hover hover:text-surv-text'
                        }`}
                      >
                        <div>
                          <div className="uppercase tracking-wider">{city.name}</div>
                          <span className={`text-[9px] font-normal ${selectedCity === city.name ? 'opacity-80' : 'opacity-60'}`}>
                            {city.district} • {city.activeIssues} alerts
                          </span>
                        </div>
                        {selectedCity === city.name && <Check size={12} />}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* AI Status */}
          <div className="hidden xl:flex items-center gap-1.5 bg-surv-success-bg border border-surv-border px-2.5 py-1 rounded-lg">
            <Cpu size={11} className="text-surv-success" />
            <span className="text-[9px] font-mono font-bold text-surv-success uppercase tracking-wider">
              {isHindi ? 'एआई सक्रिय' : 'AI ACTIVE'}
            </span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="p-2 rounded-lg text-surv-muted hover:text-surv-accent hover:bg-surv-accent-bg transition-colors relative border border-transparent hover:border-surv-border"
            >
              <Bell size={17} />
              {unreadNotifs > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded bg-surv-critical text-white text-[8px] font-mono font-bold flex items-center justify-center animate-pulse">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {notifDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifDropdownOpen(false)} />
                <div className="absolute top-full mt-1.5 right-0 w-80 sm:w-96 bg-surv-surface rounded-xl border border-surv-border p-4 z-50 shadow-lg">
                  <div className="flex items-center justify-between pb-3 border-b border-surv-border">
                    <h4 className="font-bold text-surv-text text-xs uppercase tracking-wider">
                      {isHindi ? 'अलर्ट फीड' : 'Alert Feed'}
                    </h4>
                    <span className="text-[9px] bg-surv-critical-bg text-surv-critical font-mono font-bold px-2 py-0.5 rounded border border-surv-border">
                      {unreadNotifs} NEW
                    </span>
                  </div>
                  {mockNotifications.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="text-xs text-surv-muted font-mono">NO PENDING ALERTS</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-surv-border max-h-80 overflow-y-auto custom-scrollbar my-2">
                      {mockNotifications.map(n => (
                        <Link 
                          key={n.id} 
                          to={n.issueId ? `/issues/${n.issueId}` : '/notifications'}
                          onClick={() => setNotifDropdownOpen(false)}
                          className={`block py-3 px-2 rounded-lg hover:bg-surv-surface-hover transition-colors ${!n.read ? 'bg-surv-accent-bg' : ''}`}
                        >
                          <p className="text-[11px] font-bold text-surv-text">{n.title}</p>
                          <p className="text-[10px] text-surv-muted line-clamp-2 mt-0.5">{n.message}</p>
                          <span className="text-[9px] opacity-60 text-surv-accent font-mono mt-1 inline-block">{n.time}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                  <Link 
                    to="/notifications" 
                    onClick={() => setNotifDropdownOpen(false)}
                    className="block text-center text-[10px] font-mono font-bold text-surv-accent hover:opacity-80 pt-2 border-t border-surv-border uppercase tracking-wider"
                  >
                    VIEW ALL ALERTS →
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* User */}
          <div className="flex items-center gap-2 pl-2 border-l border-surv-border">
            <div className="w-8 h-8 rounded-lg bg-surv-accent-bg border border-surv-border text-surv-accent font-mono font-bold text-[10px] flex items-center justify-center">
              AD
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-[10px] font-bold text-surv-text uppercase tracking-wider">Admin</p>
              <p className="text-[9px] text-surv-muted font-mono">CENTRAL DESK</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

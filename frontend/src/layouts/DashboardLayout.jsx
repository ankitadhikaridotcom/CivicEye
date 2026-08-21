import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('All Uttarakhand');
  const [language, setLanguage] = useState('en');

  return (
    <div className="flex h-screen overflow-hidden bg-surv-bg scan-lines">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} language={language} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar 
          onMenuClick={() => setSidebarOpen(true)} 
          selectedCity={selectedCity} 
          setSelectedCity={setSelectedCity} 
          language={language}
          setLanguage={setLanguage}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 grid-overlay relative">
          <div className="max-w-[1600px] mx-auto relative z-10">
            <Outlet context={{ selectedCity, language }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import { apiService } from '../utils/api';
import { mockCities } from '../data/mockData';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('All Uttarakhand');
  const [language, setLanguage] = useState('en');
  const [citiesData, setCitiesData] = useState(mockCities);

  useEffect(() => {
    const fetchAndMergeIssues = async () => {
      try {
        const issues = await apiService.getIssues();
        
        const updatedCities = mockCities.map(city => {
          const cityIssues = issues.filter(issue => {
            const isMatch = issue.location && issue.location.toLowerCase().includes(city.name.toLowerCase());
            const isActive = issue.status && !['CLOSED', 'AI VERIFIED', 'RESOLVED'].includes(issue.status);
            return isMatch && isActive;
          });
          
          return {
            ...city,
            activeIssues: cityIssues.length,
            severity: cityIssues.some(i => i.severity === 'HIGH') ? 'HIGH' : (cityIssues.some(i => i.severity === 'MEDIUM') ? 'MEDIUM' : 'LOW')
          };
        });
        setCitiesData(updatedCities);
      } catch (err) {
        console.error('Error in DashboardLayout fetching issues:', err);
      }
    };

    fetchAndMergeIssues();
    const interval = setInterval(fetchAndMergeIssues, 10000);
    return () => clearInterval(interval);
  }, []);

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
          citiesData={citiesData}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 grid-overlay relative">
          <div className="max-w-[1600px] mx-auto relative z-10">
            <Outlet context={{ selectedCity, setSelectedCity, language, citiesData }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

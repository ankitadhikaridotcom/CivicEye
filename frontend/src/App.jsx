import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import LiveMonitoring from './pages/LiveMonitoring';
import Issues from './pages/Issues';
import IssueDetails from './pages/IssueDetails';
import AIAnalysis from './pages/AIAnalysis';
import MapView from './pages/MapView';
import Analytics from './pages/Analytics';
import ULBManagement from './pages/ULBManagement';
import StateControlRoom from './pages/StateControlRoom';
import Officers from './pages/Officers';
import Assignments from './pages/Assignments';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Login from './pages/Login';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Main Application Shell */}
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="state-control" element={<StateControlRoom />} />
            <Route path="map" element={<MapView />} />
            <Route path="live-monitoring" element={<LiveMonitoring />} />
            <Route path="issues" element={<Issues />} />
            <Route path="issues/:id" element={<IssueDetails />} />
            <Route path="ai-analysis" element={<AIAnalysis />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="ulb" element={<ULBManagement />} />
            <Route path="officers" element={<Officers />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="reports" element={<Reports />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
            
            {/* Catch all to Dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

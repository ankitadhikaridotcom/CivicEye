import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  BarChart3, TrendingUp, PieChart as PieChartIcon, Activity, Download, Clock, CheckCircle2,
  RefreshCw, Award, Percent, Calendar
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';
import { apiService } from '../utils/api';
import { issueCategoriesData, responseTrendData, stats as fallbackStats } from '../data/mockData';

export const Analytics = () => {
  const { language = 'en' } = useOutletContext() || {};
  const isHindi = language === 'hi';

  const [stats, setStats] = useState(fallbackStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        const data = await apiService.getStats();
        setStats(data);
      } catch (err) {
        console.error('Error fetching analytics stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalyticsData();
  }, []);

  const COLORS = ['#4F46E5', '#F59E0B', '#EF4444', '#06B6D4'];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 overflow-hidden shadow-sm">
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-indigo-600 to-transparent opacity-30"></div>
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-indigo-500"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 size={18} className="text-indigo-600 dark:text-indigo-400" />
              <h1 className="font-sans text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                {isHindi ? 'विश्लेषण और रिपोर्ट' : 'Analytics & Insights'}
              </h1>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono tracking-wide uppercase">
              AI performance telemetry, response compliance and trend metrics
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-200 rounded-xl text-[10px] font-semibold border border-slate-200 dark:border-slate-700 transition-all uppercase tracking-wider hover:bg-slate-50">
            <Download size={14} className="text-indigo-600 dark:text-indigo-455" /> EXPORT REPORT
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'TOTAL INCIDENTS', value: stats.totalIssues, icon: Activity, color: 'text-indigo-600', percent: '94% resolved' },
          { label: 'AI VERIFIED RATE', value: `${stats.aiVerifiedClosures}%`, icon: Award, color: 'text-emerald-500', percent: 'Target: 90%+' },
          { label: 'AI DETECTIONS TODAY', value: stats.aiDetectionsToday, icon: Percent, color: 'text-cyan-500', percent: '+14% growth' },
          { label: 'AVG RESOLUTION', value: stats.avgSlaResponseTime || '42 min', icon: Clock, color: 'text-amber-500', percent: 'SLA compliant' }
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{s.label}</div>
              <s.icon size={16} className={s.color} />
            </div>
            <div className={`text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1`}>{s.value}</div>
            <div className="text-[10px] text-slate-400 mt-1">{s.percent}</div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* area chart */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[380px]">
          <h3 className="text-xs font-bold text-slate-805 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Calendar size={14} className="text-indigo-600" /> Response & Resolution Trends
          </h3>
          <div className="flex-1 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={responseTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAvgTime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" className="dark:stroke-slate-800" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '8px', color: '#FFF' }} />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Area type="monotone" name="Avg Resolve (mins)" dataKey="avgTime" stroke="#4F46E5" fillOpacity={1} fill="url(#colorAvgTime)" strokeWidth={2} />
                <Area type="monotone" name="AI Match Rate (%)" dataKey="aiAccuracy" stroke="#06B6D4" fillOpacity={1} fill="url(#colorAi)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* pie chart */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[380px]">
          <h3 className="text-xs font-bold text-slate-805 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <PieChartIcon size={14} className="text-indigo-650" /> Category Distribution
          </h3>
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="w-full md:w-1/2 h-[220px] text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={issueCategoriesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {issueCategoriesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '8px', color: '#FFF' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full md:w-1/2 space-y-2">
              {issueCategoriesData.map((category, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-850/50 border border-slate-100 dark:border-slate-800 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                    <span className="font-semibold text-slate-700 dark:text-slate-350">{category.name}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{category.count} cases ({category.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

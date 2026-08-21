// Uttarakhand City & ULB Geographic Boundaries (Zero Incidents Baseline)
export const mockCities = [
  { 
    id: 'c1', 
    name: 'Dehradun', 
    district: 'Dehradun', 
    ulbType: 'Nagar Nigam',
    activeIssues: 0, 
    garbage: 0, 
    encroachment: 0, 
    dumping: 0, 
    obstruction: 0,
    resolutionRate: 100, 
    score: 100, 
    camerasOnline: 0,
    coordinates: [30.3165, 78.0322],
    severity: 'LOW'
  },
  { 
    id: 'c2', 
    name: 'Haridwar', 
    district: 'Haridwar', 
    ulbType: 'Nagar Nigam',
    activeIssues: 0, 
    garbage: 0, 
    encroachment: 0, 
    dumping: 0, 
    obstruction: 0,
    resolutionRate: 100, 
    score: 100, 
    camerasOnline: 0,
    coordinates: [29.9457, 78.1642],
    severity: 'LOW'
  },
  { 
    id: 'c3', 
    name: 'Rishikesh', 
    district: 'Dehradun', 
    ulbType: 'Nagar Palika Parishad',
    activeIssues: 0, 
    garbage: 0, 
    encroachment: 0, 
    dumping: 0, 
    obstruction: 0,
    resolutionRate: 100, 
    score: 100, 
    camerasOnline: 0,
    coordinates: [30.0869, 78.2676],
    severity: 'LOW'
  },
  { 
    id: 'c4', 
    name: 'Haldwani', 
    district: 'Nainital', 
    ulbType: 'Nagar Nigam',
    activeIssues: 0, 
    garbage: 0, 
    encroachment: 0, 
    dumping: 0, 
    obstruction: 0,
    resolutionRate: 100, 
    score: 100, 
    camerasOnline: 0,
    coordinates: [29.2183, 79.5126],
    severity: 'LOW'
  },
  { 
    id: 'c5', 
    name: 'Nainital', 
    district: 'Nainital', 
    ulbType: 'Nagar Palika Parishad',
    activeIssues: 0, 
    garbage: 0, 
    encroachment: 0, 
    dumping: 0, 
    obstruction: 0,
    resolutionRate: 100, 
    score: 100, 
    camerasOnline: 0,
    coordinates: [29.3919, 79.4542],
    severity: 'LOW'
  },
  { 
    id: 'c6', 
    name: 'Roorkee', 
    district: 'Haridwar', 
    ulbType: 'Nagar Nigam',
    activeIssues: 0, 
    garbage: 0, 
    encroachment: 0, 
    dumping: 0, 
    obstruction: 0,
    resolutionRate: 100, 
    score: 100, 
    camerasOnline: 0,
    coordinates: [29.8543, 77.8880],
    severity: 'LOW'
  },
  { 
    id: 'c7', 
    name: 'Rudrapur', 
    district: 'Udham Singh Nagar', 
    ulbType: 'Nagar Nigam',
    activeIssues: 0, 
    garbage: 0, 
    encroachment: 0, 
    dumping: 0, 
    obstruction: 0,
    resolutionRate: 100, 
    score: 100, 
    camerasOnline: 0,
    coordinates: [28.9816, 79.4005],
    severity: 'LOW'
  },
  { 
    id: 'c8', 
    name: 'Kashipur', 
    district: 'Udham Singh Nagar', 
    ulbType: 'Nagar Nigam',
    activeIssues: 0, 
    garbage: 0, 
    encroachment: 0, 
    dumping: 0, 
    obstruction: 0,
    resolutionRate: 100, 
    score: 100, 
    camerasOnline: 0,
    coordinates: [29.2104, 78.9613],
    severity: 'LOW'
  },
  { 
    id: 'c9', 
    name: 'Mussoorie', 
    district: 'Dehradun', 
    ulbType: 'Nagar Palika Parishad',
    activeIssues: 0, 
    garbage: 0, 
    encroachment: 0, 
    dumping: 0, 
    obstruction: 0,
    resolutionRate: 100, 
    score: 100, 
    camerasOnline: 0,
    coordinates: [30.4598, 78.0644],
    severity: 'LOW'
  }
];

export const mockTouristAreas = [
  {
    id: 'ta-1',
    name: 'Nainital (Mall Road & Tallital)',
    city: 'Nainital',
    activeIssues: 0,
    garbageAlerts: 0,
    encroachmentAlerts: 0,
    responseTime: '0 min',
    score: 100,
    footfall: 'Monitored',
    coordinates: [29.3919, 79.4542]
  },
  {
    id: 'ta-2',
    name: 'Mussoorie (Mall Road & Library Chowk)',
    city: 'Mussoorie',
    activeIssues: 0,
    garbageAlerts: 0,
    encroachmentAlerts: 0,
    responseTime: '0 min',
    score: 100,
    footfall: 'Monitored',
    coordinates: [30.4598, 78.0644]
  },
  {
    id: 'ta-3',
    name: 'Rishikesh (Triveni Ghat & Tapovan)',
    city: 'Rishikesh',
    activeIssues: 0,
    garbageAlerts: 0,
    encroachmentAlerts: 0,
    responseTime: '0 min',
    score: 100,
    footfall: 'Monitored',
    coordinates: [30.0869, 78.2676]
  },
  {
    id: 'ta-4',
    name: 'Haridwar (Har Ki Pauri & Jwalapur)',
    city: 'Haridwar',
    activeIssues: 0,
    garbageAlerts: 0,
    encroachmentAlerts: 0,
    responseTime: '0 min',
    score: 100,
    footfall: 'Monitored',
    coordinates: [29.9457, 78.1642]
  },
  {
    id: 'ta-5',
    name: 'Dehradun (Paltan Bazaar & Clock Tower)',
    city: 'Dehradun',
    activeIssues: 0,
    garbageAlerts: 0,
    encroachmentAlerts: 0,
    responseTime: '0 min',
    score: 100,
    footfall: 'Monitored',
    coordinates: [30.3165, 78.0322]
  }
];

// Clean camera feeds list (waiting for real stream ingest)
export const mockCameras = [];

// Clean incident list (0 active incidents)
export const mockIssues = [];

// Clean ULB list
export const mockULBs = [
  {
    id: 'ulb-1',
    name: 'Nagar Nigam Dehradun',
    type: 'Nagar Nigam',
    district: 'Dehradun',
    activeIssues: 0,
    resolved: 0,
    pending: 0,
    camerasOnline: 0,
    score: 100,
    responseTime: '0 min',
    trend: '0.0%'
  },
  {
    id: 'ulb-2',
    name: 'Nagar Nigam Haridwar',
    type: 'Nagar Nigam',
    district: 'Haridwar',
    activeIssues: 0,
    resolved: 0,
    pending: 0,
    camerasOnline: 0,
    score: 100,
    responseTime: '0 min',
    trend: '0.0%'
  },
  {
    id: 'ulb-3',
    name: 'Nagar Nigam Haldwani-Kathgodam',
    type: 'Nagar Nigam',
    district: 'Nainital',
    activeIssues: 0,
    resolved: 0,
    pending: 0,
    camerasOnline: 0,
    score: 100,
    responseTime: '0 min',
    trend: '0.0%'
  },
  {
    id: 'ulb-4',
    name: 'Nagar Nigam Roorkee',
    type: 'Nagar Nigam',
    district: 'Haridwar',
    activeIssues: 0,
    resolved: 0,
    pending: 0,
    camerasOnline: 0,
    score: 100,
    responseTime: '0 min',
    trend: '0.0%'
  },
  {
    id: 'ulb-5',
    name: 'Nagar Palika Parishad Nainital',
    type: 'Nagar Palika Parishad',
    district: 'Nainital',
    activeIssues: 0,
    resolved: 0,
    pending: 0,
    camerasOnline: 0,
    score: 100,
    responseTime: '0 min',
    trend: '0.0%'
  },
  {
    id: 'ulb-6',
    name: 'Nagar Palika Parishad Mussoorie',
    type: 'Nagar Palika Parishad',
    district: 'Dehradun',
    activeIssues: 0,
    resolved: 0,
    pending: 0,
    camerasOnline: 0,
    score: 100,
    responseTime: '0 min',
    trend: '0.0%'
  },
  {
    id: 'ulb-7',
    name: 'Nagar Palika Parishad Rishikesh',
    type: 'Nagar Palika Parishad',
    district: 'Dehradun',
    activeIssues: 0,
    resolved: 0,
    pending: 0,
    camerasOnline: 0,
    score: 100,
    responseTime: '0 min',
    trend: '0.0%'
  },
  {
    id: 'ulb-8',
    name: 'Nagar Nigam Rudrapur',
    type: 'Nagar Nigam',
    district: 'Udham Singh Nagar',
    activeIssues: 0,
    resolved: 0,
    pending: 0,
    camerasOnline: 0,
    score: 100,
    responseTime: '0 min',
    trend: '0.0%'
  },
  {
    id: 'ulb-9',
    name: 'Nagar Nigam Kashipur',
    type: 'Nagar Nigam',
    district: 'Udham Singh Nagar',
    activeIssues: 0,
    resolved: 0,
    pending: 0,
    camerasOnline: 0,
    score: 100,
    responseTime: '0 min',
    trend: '0.0%'
  }
];

export const mockDepartments = [
  {
    id: 'dept-1',
    name: 'Municipal Sanitation Department',
    code: 'SAN-UK',
    activeOfficers: 0,
    resolutionRate: 100,
    openIssues: 0,
    closedIssues: 0,
    slaCompliance: 100,
    avgResponseTime: '0 min',
    nodalOfficer: 'Sanitation Nodal Cell'
  },
  {
    id: 'dept-2',
    name: 'Urban Enforcement & Anti-Encroachment Squad',
    code: 'ENF-UK',
    activeOfficers: 0,
    resolutionRate: 100,
    openIssues: 0,
    closedIssues: 0,
    slaCompliance: 100,
    avgResponseTime: '0 min',
    nodalOfficer: 'Enforcement Nodal Cell'
  },
  {
    id: 'dept-3',
    name: 'Traffic & Public Corridor Management',
    code: 'TRF-UK',
    activeOfficers: 0,
    resolutionRate: 100,
    openIssues: 0,
    closedIssues: 0,
    slaCompliance: 100,
    avgResponseTime: '0 min',
    nodalOfficer: 'Traffic Urban Cell'
  },
  {
    id: 'dept-4',
    name: 'Urban Development & Solid Waste Management Cell',
    code: 'UDD-UK',
    activeOfficers: 0,
    resolutionRate: 100,
    openIssues: 0,
    closedIssues: 0,
    slaCompliance: 100,
    avgResponseTime: '0 min',
    nodalOfficer: 'UDD State Directorate'
  }
];

export const mockOfficers = [];

export const mockNotifications = [];

export const stats = {
  totalIssues: 0,
  activeIssues: 0,
  resolvedToday: 0,
  highPriority: 0,
  aiDetectionsToday: 0,
  aiVerifiedClosures: 100,
  camerasOnline: 0,
  departmentsActive: 0,
  avgSlaResponseTime: '0 min'
};

export const issueCategoriesData = [
  { name: 'Garbage', value: 0, count: 0, color: '#0F766E' },
  { name: 'Encroachment', value: 0, count: 0, color: '#F59E0B' },
  { name: 'Illegal Dumping', value: 0, count: 0, color: '#EF4444' },
  { name: 'Road Obstruction', value: 0, count: 0, color: '#2563EB' }
];

export const cityComparisonData = [
  { name: 'Dehradun', issues: 0, resolved: 0, pending: 0 },
  { name: 'Haridwar', issues: 0, resolved: 0, pending: 0 },
  { name: 'Haldwani', issues: 0, resolved: 0, pending: 0 },
  { name: 'Rishikesh', issues: 0, resolved: 0, pending: 0 },
  { name: 'Roorkee', issues: 0, resolved: 0, pending: 0 },
  { name: 'Nainital', issues: 0, resolved: 0, pending: 0 }
];

export const responseTrendData = [
  { day: 'Mon', avgTime: 0, aiAccuracy: 100 },
  { day: 'Tue', avgTime: 0, aiAccuracy: 100 },
  { day: 'Wed', avgTime: 0, aiAccuracy: 100 },
  { day: 'Thu', avgTime: 0, aiAccuracy: 100 },
  { day: 'Fri', avgTime: 0, aiAccuracy: 100 },
  { day: 'Sat', avgTime: 0, aiAccuracy: 100 },
  { day: 'Sun', avgTime: 0, aiAccuracy: 100 }
];

export const departmentPerformanceData = [
  { name: 'Sanitation Dept', resolutionRate: 100, target: 100 },
  { name: 'Enforcement Squad', resolutionRate: 100, target: 100 },
  { name: 'Traffic Management', resolutionRate: 100, target: 100 },
  { name: 'UDD State Cell', resolutionRate: 100, target: 100 }
];

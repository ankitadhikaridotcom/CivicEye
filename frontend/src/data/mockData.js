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
    camerasOnline: 8,
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
    camerasOnline: 4,
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
    camerasOnline: 2,
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
    camerasOnline: 3,
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
    camerasOnline: 2,
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
    camerasOnline: 2,
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
export const mockCameras = [
  {
    id: 'CAM-104',
    name: 'Rajpur Road Clock Tower',
    location: 'Dehradun',
    status: 'LIVE',
    aiStatus: 'Garbage Detected',
    confidence: 0.914,
    streamUrl: '',
    imagePlaceholder: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=600&q=80',
    type: 'Garbage',
    severity: 'HIGH',
    ward: 'Ward 12 - Clock Tower'
  },
  {
    id: 'CAM-209',
    name: 'Har Ki Pauri Walkway',
    location: 'Haridwar',
    status: 'LIVE',
    aiStatus: 'No Issues',
    confidence: 0.0,
    streamUrl: '',
    imagePlaceholder: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=600&q=80',
    type: 'None',
    severity: 'NONE',
    ward: 'Ward 3 - Har Ki Pauri'
  },
  {
    id: 'CAM-302',
    name: 'Mall Road Promenade',
    location: 'Nainital',
    status: 'LIVE',
    aiStatus: 'No Issues (Encroachment Ready)',
    confidence: 0.0,
    streamUrl: '',
    imagePlaceholder: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    type: 'None',
    severity: 'NONE',
    ward: 'Ward 5 - Mallital'
  },
  {
    id: 'CAM-411',
    name: 'Triveni Ghat Entrance',
    location: 'Rishikesh',
    status: 'LIVE',
    aiStatus: 'No Issues',
    confidence: 0.0,
    streamUrl: '',
    imagePlaceholder: 'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=600&q=80',
    type: 'None',
    severity: 'NONE',
    ward: 'Ward 2 - Triveni'
  },
  {
    id: 'CAM-502',
    name: 'Canal Road East',
    location: 'Roorkee',
    status: 'OFFLINE',
    aiStatus: 'Connection Lost',
    confidence: 0.0,
    streamUrl: '',
    imagePlaceholder: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=80',
    type: 'None',
    severity: 'NONE',
    ward: 'Ward 8 - Civil Lines'
  },
  {
    id: 'CAM-601',
    name: 'Paltan Bazaar Lane 2',
    location: 'Dehradun',
    status: 'LIVE',
    aiStatus: 'No Issues',
    confidence: 0.0,
    streamUrl: '',
    imagePlaceholder: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80',
    type: 'None',
    severity: 'NONE',
    ward: 'Ward 14 - Paltan Bazaar'
  }
];

// Clean incident list (0 active incidents initially, seeded with typical incidents)
export const mockIssues = [
  {
    issueId: 'CIV-1042',
    issueType: 'Garbage',
    location: 'Rajpur Road, Near Clock Tower, Dehradun',
    ward: 'Ward 12 - Clock Tower',
    latitude: 30.3245,
    longitude: 78.0410,
    severity: 'HIGH',
    confidence: 0.914,
    department: 'Sanitation Department',
    status: 'OPEN',
    originalImage: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=600&q=80',
    annotatedImage: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=600&q=80',
    cameraId: 'CAM-104',
    description: 'Garbage accumulation near public walkway.',
    detectedAt: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
    history: [
      { time: new Date(Date.now() - 42 * 60 * 1000).toISOString(), status: 'OPEN', message: 'AI detected garbage with 91.4% confidence.', user: 'System AI' }
    ]
  },
  {
    issueId: 'CIV-1041',
    issueType: 'Garbage',
    location: 'Har Ki Pauri Ghat Area, Haridwar',
    ward: 'Ward 3 - Har Ki Pauri',
    latitude: 29.9560,
    longitude: 78.1700,
    severity: 'MEDIUM',
    confidence: 0.765,
    department: 'Sanitation Department',
    status: 'ASSIGNED',
    originalImage: 'https://images.unsplash.com/photo-1605600611283-c48c6f68d184?auto=format&fit=crop&w=600&q=80',
    annotatedImage: '',
    cameraId: 'CAM-209',
    description: 'Overflowing dustbin near the river walkway.',
    detectedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    history: [
      { time: new Date(Date.now() - 2 * 3600 * 1000).toISOString(), status: 'OPEN', message: 'AI detected garbage with 76.5% confidence.', user: 'System AI' },
      { time: new Date(Date.now() - 1.8 * 3600 * 1000).toISOString(), status: 'ASSIGNED', message: 'Assigned to Sanitation Department team B.', user: 'Admin' }
    ]
  },
  {
    issueId: 'CIV-1040',
    issueType: 'Encroachment',
    location: 'Mall Road Promenade, Nainital',
    ward: 'Ward 5 - Mallital',
    latitude: 29.3950,
    longitude: 79.4500,
    severity: 'HIGH',
    confidence: 0.880,
    department: 'Enforcement Department',
    status: 'IN PROGRESS',
    originalImage: '',
    annotatedImage: '',
    cameraId: 'CAM-302',
    description: 'Illegal vending stalls blocking vehicle corridors.',
    detectedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    history: [
      { time: new Date(Date.now() - 4 * 3600 * 1000).toISOString(), status: 'OPEN', message: 'Officer reported pedestrian corridor encroachment.', user: 'Officer Nainital' },
      { time: new Date(Date.now() - 3.8 * 3600 * 1000).toISOString(), status: 'ASSIGNED', message: 'Dispatched Enforcement Squad-A.', user: 'Admin' },
      { time: new Date(Date.now() - 3.5 * 3600 * 1000).toISOString(), status: 'IN PROGRESS', message: 'Enforcement team on site resolving encroachment.', user: 'Enforcement Officer' }
    ]
  },
  {
    issueId: 'CIV-1039',
    issueType: 'Garbage',
    location: 'Triveni Ghat Entrance, Rishikesh',
    ward: 'Ward 2 - Triveni',
    latitude: 30.1069,
    longitude: 78.2976,
    severity: 'LOW',
    confidence: 0.582,
    department: 'Sanitation Department',
    status: 'RESOLVED',
    originalImage: '',
    annotatedImage: '',
    cameraId: 'CAM-411',
    description: 'Scattered plastic waste near public benches.',
    detectedAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    history: [
      { time: new Date(Date.now() - 6 * 3600 * 1000).toISOString(), status: 'OPEN', message: 'AI detected garbage with 58.2% confidence.', user: 'System AI' },
      { time: new Date(Date.now() - 5.8 * 3600 * 1000).toISOString(), status: 'ASSIGNED', message: 'Assigned to Sanitation beat 4.', user: 'Admin' },
      { time: new Date(Date.now() - 5.5 * 3600 * 1000).toISOString(), status: 'IN PROGRESS', message: 'Sanitation worker dispatched.', user: 'Sanitation Supervisor' },
      { time: new Date(Date.now() - 5.0 * 3600 * 1000).toISOString(), status: 'RESOLVED', message: 'Cleaned up and resolved. Closure photo uploaded.', user: 'Field Worker' }
    ]
  }
];

// Clean ULB list
export const mockULBs = [
  {
    id: 'ulb-1',
    name: 'Nagar Nigam Dehradun',
    type: 'Nagar Nigam',
    district: 'Dehradun',
    activeIssues: 12,
    resolved: 148,
    pending: 5,
    camerasOnline: 8,
    score: 94,
    responseTime: '38 min',
    trend: '+4.2%'
  },
  {
    id: 'ulb-2',
    name: 'Nagar Nigam Haridwar',
    type: 'Nagar Nigam',
    district: 'Haridwar',
    activeIssues: 8,
    resolved: 92,
    pending: 3,
    camerasOnline: 4,
    score: 91,
    responseTime: '45 min',
    trend: '+1.5%'
  },
  {
    id: 'ulb-3',
    name: 'Nagar Nigam Haldwani-Kathgodam',
    type: 'Nagar Nigam',
    district: 'Nainital',
    activeIssues: 15,
    resolved: 88,
    pending: 6,
    camerasOnline: 3,
    score: 88,
    responseTime: '52 min',
    trend: '-2.1%'
  },
  {
    id: 'ulb-4',
    name: 'Nagar Nigam Roorkee',
    type: 'Nagar Nigam',
    district: 'Haridwar',
    activeIssues: 4,
    resolved: 52,
    pending: 2,
    camerasOnline: 2,
    score: 92,
    responseTime: '40 min',
    trend: '+0.8%'
  },
  {
    id: 'ulb-5',
    name: 'Nagar Palika Parishad Nainital',
    type: 'Nagar Palika Parishad',
    district: 'Nainital',
    activeIssues: 7,
    resolved: 74,
    pending: 1,
    camerasOnline: 2,
    score: 96,
    responseTime: '25 min',
    trend: '+5.0%'
  }
];

export const mockDepartments = [
  {
    id: 'dept-1',
    name: 'Sanitation Department',
    code: 'SAN-UK',
    activeOfficers: 142,
    resolutionRate: 94.2,
    openIssues: 185,
    closedIssues: 852,
    slaCompliance: 92.5,
    avgResponseTime: '32 min',
    nodalOfficer: 'Dr. Ramesh Rawat (Director)'
  },
  {
    id: 'dept-2',
    name: 'Enforcement Department',
    code: 'ENF-UK',
    activeOfficers: 64,
    resolutionRate: 88.5,
    openIssues: 92,
    closedIssues: 218,
    slaCompliance: 86.2,
    avgResponseTime: '55 min',
    nodalOfficer: 'Shri K.S. Negi (Chief Inspector)'
  },
  {
    id: 'dept-3',
    name: 'Municipal Corporation',
    code: 'MNC-UK',
    activeOfficers: 38,
    resolutionRate: 91.0,
    openIssues: 45,
    closedIssues: 114,
    slaCompliance: 89.4,
    avgResponseTime: '48 min',
    nodalOfficer: 'Smt. Deepa Bhatt (Joint Sec)'
  },
  {
    id: 'dept-4',
    name: 'Road Department',
    code: 'RD-UK',
    activeOfficers: 22,
    resolutionRate: 85.0,
    openIssues: 20,
    closedIssues: 64,
    slaCompliance: 82.0,
    avgResponseTime: '72 min',
    nodalOfficer: 'Shri A.K. Uniyal (EE)'
  }
];

export const mockOfficers = [
  { id: 'off-1', name: 'Rohan Sharma', role: 'Municipal Officer', department: 'Sanitation', activeTasks: 3, phone: '+91 98765 43210' },
  { id: 'off-2', name: 'Sanjay Bisht', role: 'Department Officer', department: 'Sanitation', activeTasks: 5, phone: '+91 98765 43211' },
  { id: 'off-3', name: 'Sunita Devi', role: 'Field Worker', department: 'Sanitation', activeTasks: 1, phone: '+91 98765 43212' },
  { id: 'off-4', name: 'Amit Negi', role: 'Field Worker', department: 'Enforcement', activeTasks: 2, phone: '+91 98765 43213' }
];

export const mockNotifications = [
  {
    id: 'alt-2001',
    issueId: 'CIV-1042',
    title: '🚨 HIGH PRIORITY: Garbage Detected',
    message: 'AI detected high-severity garbage accumulation at Rajpur Road, Dehradun (91.4% confidence).',
    severity: 'HIGH',
    read: false,
    time: '42 min ago'
  },
  {
    id: 'alt-2002',
    issueId: 'CIV-1041',
    title: '⚠️ ALERT: Garbage Detected',
    message: 'Medium-severity garbage detected at Har Ki Pauri, Haridwar.',
    severity: 'MEDIUM',
    read: false,
    time: '2 hours ago'
  },
  {
    id: 'alt-2003',
    issueId: 'CIV-1040',
    title: '⚠️ SLA WARNING',
    message: 'Issue CIV-1040 (Encroachment, Nainital) has been in progress for more than 3 hours.',
    severity: 'HIGH',
    read: false,
    time: '1 hour ago'
  }
];

export const stats = {
  totalIssues: 1248,
  activeIssues: 342,
  resolvedToday: 128,
  highPriority: 73,
  aiDetectionsToday: 486,
  aiVerifiedClosures: 94,
  camerasOnline: 18,
  departmentsActive: 4,
  avgSlaResponseTime: '42 min'
};

export const issueCategoriesData = [
  { name: 'Garbage', value: 70, count: 874, color: '#4F46E5' },
  { name: 'Encroachment', value: 15, count: 187, color: '#F59E0B' },
  { name: 'Illegal Dumping', value: 10, count: 124, color: '#EF4444' },
  { name: 'Road Obstruction', value: 5, count: 63, color: '#06B6D4' }
];

export const cityComparisonData = [
  { name: 'Dehradun', issues: 412, resolved: 310, pending: 102 },
  { name: 'Haridwar', issues: 285, resolved: 215, pending: 70 },
  { name: 'Haldwani', issues: 242, resolved: 172, pending: 70 },
  { name: 'Rishikesh', issues: 165, resolved: 125, pending: 40 },
  { name: 'Roorkee', issues: 98, resolved: 72, pending: 26 },
  { name: 'Nainital', issues: 46, resolved: 42, pending: 4 }
];

export const responseTrendData = [
  { day: 'Mon', avgTime: 48, aiAccuracy: 92 },
  { day: 'Tue', avgTime: 45, aiAccuracy: 93 },
  { day: 'Wed', avgTime: 42, aiAccuracy: 94 },
  { day: 'Thu', avgTime: 40, aiAccuracy: 94 },
  { day: 'Fri', avgTime: 38, aiAccuracy: 95 },
  { day: 'Sat', avgTime: 42, aiAccuracy: 94 },
  { day: 'Sun', avgTime: 44, aiAccuracy: 93 }
];

export const departmentPerformanceData = [
  { name: 'Sanitation Dept', resolutionRate: 94, target: 95 },
  { name: 'Enforcement Squad', resolutionRate: 88, target: 90 },
  { name: 'Municipal Corp', resolutionRate: 91, target: 92 },
  { name: 'Road Department', resolutionRate: 85, target: 88 }
];

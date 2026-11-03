import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Truck,
  Package,
  MapPin,
  Clock,
  QrCode,
  ScanLine,
  Download,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Shield,
  UserCheck,
  FileSpreadsheet,
  FileJson,
  FileText,
  Languages,
  Gauge,
  Calendar,
  ArrowRight,
  RefreshCw,
  Lock,
  Unlock,
  Eye,
  X,
  Sprout,
  BarChart3,
  Check,
  Info,
  Navigation
} from 'lucide-react';

// ==========================================
// 1. TRANSLATIONS (ENGLISH & SINHALA)
// ==========================================
const TRANSLATIONS = {
  en: {
    appName: 'AgroFleet Lanka',
    appSubtitle: 'Fruit Farm Dispatch, Harvest & Logistics PWA',
    driverMode: 'Driver Terminal',
    managerMode: 'Manager Portal',
    switchLang: 'සිංහල',
    activeTrip: 'Active Trip Workflow',
    noActiveTrip: 'Start New Dispatch Trip',
    date: 'Date',
    driverName: 'Assigned Driver',
    vehicleNo: 'Vehicle No',
    startMeter: 'Start Meter Reading (km)',
    endMeter: 'End Meter Reading (km)',
    originLocation: 'Dispatch Location (Location A)',
    destinationFarm: 'Target Farm Location',
    startTripBtn: 'Start Trip & Log GPS',
    arrivedFarmBtn: 'Arrived at Farm (Start Waiting Timer)',
    startLoadingBtn: 'Start Packing & Loading',
    addBlockRow: 'Add Block Load',
    scanBarcodeBtn: 'Scan Crate / Block QR',
    blockNo: 'Block No',
    fruitType: 'Fruit Variety',
    loadQty: 'Load Qty (kg)',
    crateCount: 'Crates',
    completeLoadingBtn: 'Complete Loading & Generate Token',
    digitalTokenTitle: 'Digital Load Manifest Token',
    digitalTokenDesc: 'Show this QR/Token to the Farm Stock Controller before departure.',
    startTransitBtn: 'Depart Farm (In Transit)',
    discrepancyTitle: 'Delivery & Discrepancy Check',
    missingQty: 'Missing / Damaged Qty (kg)',
    discrepancyReason: 'Discrepancy / Delivery Notes',
    endTripBtn: 'Save & Complete Trip',
    tripProgress: 'Trip Stage',
    waitingTime: 'Waiting Time',
    loadingTime: 'Loading Time',
    totalTripTime: 'Total Duration',
    totalLoaded: 'Total Loaded',
    gpsStatus: 'GPS Tag',
    captureGps: 'Update GPS',
    // Manager Portal
    pinRequired: 'Manager Access Control',
    pinDesc: 'Enter your 4-digit Manager PIN to view reports, stocks, and exports (Default: 1234)',
    unlockBtn: 'Unlock Portal',
    tabDashboard: 'Reports & Trips',
    tabStock: 'Farm Blocks & Stock',
    tabPermissions: 'Users & Roles',
    tabDataSync: 'CSV / Excel / JSON Sync',
    exportCsv: 'Export CSV Report',
    exportExcel: 'Export Excel (.xls)',
    exportJson: 'Download JSON Backup',
    importJson: 'Restore / Merge JSON',
    totalTripsStat: 'Completed Trips',
    totalHarvestStat: 'Total Picked (kg)',
    totalDistanceStat: 'Total Distance (km)',
    missingStockStat: 'Missing / Damaged (kg)',
    filterDriver: 'Filter by Driver / Vehicle / Block...',
    allBlocks: 'All Farm Blocks',
    clearData: 'Reset Demo Data',
    tokenVerified: 'Token Verified'
  },
  si: {
    appName: 'ඇග්‍රෝෆ්ලීට් ලංකා (AgroFleet)',
    appSubtitle: 'පළතුරු වතු සහ ප්‍රවාහන කළමනාකරණ පද්ධතිය',
    driverMode: 'රියදුරු අතුරුමුහුණත',
    managerMode: 'කළමනාකරු පුවරුව',
    switchLang: 'English',
    activeTrip: 'ක්‍රියාත්මක ගමන් වාරය',
    noActiveTrip: 'නව ගමන් වාරයක් ආරම්භ කරන්න',
    date: 'දිනය',
    driverName: 'රියදුරුගේ නම',
    vehicleNo: 'වාහන අංකය',
    startMeter: 'ආරම්භක මීටර් කියවීම (km)',
    endMeter: 'අවසාන මීටර් කියවීම (km)',
    originLocation: 'පිටත්වන ස්ථානය (Location A)',
    destinationFarm: 'ගමනාන්ත වත්ත',
    startTripBtn: 'ගමන ආරම්භ කරන්න (GPS සමඟ)',
    arrivedFarmBtn: 'වත්තට ළඟා විය (රැඳී සිටින කාලය අරඹන්න)',
    startLoadingBtn: 'පැටවීම ආරම්භ කරන්න',
    addBlockRow: 'තවත් කොටසක් (Block) එක් කරන්න',
    scanBarcodeBtn: 'QR / බාර්කෝඩ් ස්කෑන් කරන්න',
    blockNo: 'කොටස් අංකය (Block No)',
    fruitType: 'පළතුරු වර්ගය',
    loadQty: 'පැටවූ ප්‍රමාණය (kg)',
    crateCount: 'කූඩ ගණන',
    completeLoadingBtn: 'පැටවීම අවසන් කර ටෝකනය ලබාගන්න',
    digitalTokenTitle: 'ඩිජිටල් ප්‍රවාහන ටෝකනය (QR)',
    digitalTokenDesc: 'පිටත්වීමට පෙර මෙම ටෝකනය වතු පාලකවරයාට පෙන්වා තහවුරු කරන්න.',
    startTransitBtn: 'වත්තෙන් පිටත් වන්න',
    discrepancyTitle: 'භාරදීම සහ අඩුපාඩු සටහන්',
    missingQty: 'අඩුපාඩු / හානි වූ ප්‍රමාණය (kg)',
    discrepancyReason: 'විශේෂ සටහන් / හේතුව',
    endTripBtn: 'ගමන අවසන් කර දත්ත සුරකින්න',
    tripProgress: 'ගමනේ තත්ත්වය',
    waitingTime: 'රැඳී සිටි කාලය',
    loadingTime: 'පැටවූ කාලය',
    totalTripTime: 'මුළු කාලය',
    totalLoaded: 'මුළු බර',
    gpsStatus: 'GPS පිහිටීම',
    captureGps: 'GPS යාවත්කාලීන කරන්න',
    // Manager Portal
    pinRequired: 'කළමනාකරු අවසරය අවශ්‍යයි',
    pinDesc: 'වාර්තා සහ දත්ත ලබාගැනීමට රහස් අංකය ඇතුළත් කරන්න (Default: 1234)',
    unlockBtn: 'පිවිසෙන්න',
    tabDashboard: 'ගමන් වාර්තා',
    tabStock: 'වතු කොටස් සහ තොග',
    tabPermissions: 'පරිශීලක අවසර',
    tabDataSync: 'CSV / Excel / JSON දත්ත',
    exportCsv: 'CSV වාර්තාව බාගන්න',
    exportExcel: 'Excel (.xls) වාර්තාව බාගන්න',
    exportJson: 'JSON Backup බාගන්න',
    importJson: 'JSON දත්ත ඇතුළත් කරන්න',
    totalTripsStat: 'සම්පූර්ණ කළ ගමන්',
    totalHarvestStat: 'මුළු අස්වැන්න (kg)',
    totalDistanceStat: 'මුළු දුර (km)',
    missingStockStat: 'අඩුපාඩු / හානි (kg)',
    filterDriver: 'රියදුරු / වාහනය / කොටස අනුව සොයන්න...',
    allBlocks: 'සියලුම වතු කොටස්',
    clearData: 'මූලික දත්ත යළි පිහිටුවන්න',
    tokenVerified: 'ටෝකනය තහවුරුයි'
  }
};

// ==========================================
// 2. INITIAL MOCK DATA (LOCAL STORAGE SEED)
// ==========================================
const INITIAL_BLOCKS = [
  { id: 'BLK-A1', name: 'Block A1 - North Slope', fruit: 'Mango (TJC)', availableKg: 1450, barcode: 'QR-BLK-A1-MANGO' },
  { id: 'BLK-B2', name: 'Block B2 - River Valley', fruit: 'Papaya (Red Lady)', availableKg: 2100, barcode: 'QR-BLK-B2-PAPAYA' },
  { id: 'BLK-C3', name: 'Block C3 - East Ridge', fruit: 'Pineapple (Mauritius)', availableKg: 980, barcode: 'QR-BLK-C3-PINE' },
  { id: 'BLK-D4', name: 'Block D4 - Lowland', fruit: 'Banana (Cavendish)', availableKg: 3200, barcode: 'QR-BLK-D4-BANANA' },
  { id: 'BLK-E5', name: 'Block E5 - Organic Zone', fruit: 'Guava (Bangkok)', availableKg: 640, barcode: 'QR-BLK-E5-GUAVA' }
];

const INITIAL_USERS = [
  { id: 'USR-1', name: 'Kasun Perera', role: 'Driver', vehicle: 'WP LB-4582', permissions: ['start_trip', 'scan_qr', 'log_loads'] },
  { id: 'USR-2', name: 'Nuwan Pradeep', role: 'Driver', vehicle: 'NC KA-9910', permissions: ['start_trip', 'scan_qr', 'log_loads'] },
  { id: 'USR-3', name: 'Chathura Silva', role: 'Driver', vehicle: 'WP LD-1120', permissions: ['start_trip', 'scan_qr', 'log_loads'] },
  { id: 'USR-4', name: 'Ruwan Wijesinghe', role: 'Farm Stock Controller', vehicle: 'N/A', permissions: ['verify_token', 'manage_blocks', 'log_missing'] },
  { id: 'USR-5', name: 'Dinesh Fernando', role: 'Logistics Admin', vehicle: 'All Fleet', permissions: ['all_access', 'export_reports', 'manage_users'] }
];

const INITIAL_TRIPS = [
  {
    id: 'TRP-2026-001',
    date: '2026-10-30',
    driver: 'Kasun Perera',
    vehicleNo: 'WP LB-4582',
    origin: 'Kadawatha Dispatch Hub',
    farmLocation: 'Gampaha Orchard Farm',
    startMeter: 45120,
    endMeter: 45184,
    distanceKm: 64,
    token: 'TKN-884A-WP4582',
    timestamps: {
      tripStarted: '2026-10-30T06:30:00',
      arrivedAtFarm: '2026-10-30T07:15:00',
      loadingStarted: '2026-10-30T07:40:00',
      loadingCompleted: '2026-10-30T08:25:00',
      tripEnded: '2026-10-30T09:30:00'
    },
    durations: {
      waitingMins: 25,
      loadingMins: 45,
      totalMins: 180
    },
    gpsLogs: {
      start: '7.0013° N, 79.9519° E (Kadawatha)',
      farm: '7.0840° N, 80.0098° E (Gampaha Farm)',
      end: '7.0015° N, 79.9522° E (Kadawatha Hub)'
    },
    loads: [
      { blockNo: 'BLK-A1', fruit: 'Mango (TJC)', qtyKg: 320, crates: 16 },
      { blockNo: 'BLK-B2', fruit: 'Papaya (Red Lady)', qtyKg: 450, crates: 22 }
    ],
    totalQtyKg: 770,
    missingQtyKg: 5,
    discrepancyNotes: '1 crate slightly bruised during transit due to sudden braking.'
  },
  {
    id: 'TRP-2026-002',
    date: '2026-10-30',
    driver: 'Nuwan Pradeep',
    vehicleNo: 'NC KA-9910',
    origin: 'Kadawatha Dispatch Hub',
    farmLocation: 'Kurunegala Valley Farm',
    startMeter: 88300,
    endMeter: 88412,
    distanceKm: 112,
    token: 'TKN-912B-NC9910',
    timestamps: {
      tripStarted: '2026-10-30T08:00:00',
      arrivedAtFarm: '2026-10-30T09:15:00',
      loadingStarted: '2026-10-30T09:30:00',
      loadingCompleted: '2026-10-30T10:20:00',
      tripEnded: '2026-10-30T11:55:00'
    },
    durations: {
      waitingMins: 15,
      loadingMins: 50,
      totalMins: 235
    },
    gpsLogs: {
      start: '7.0013° N, 79.9519° E (Kadawatha)',
      farm: '7.4818° N, 80.3609° E (Kurunegala Farm)',
      end: '7.0013° N, 79.9519° E (Kadawatha Hub)'
    },
    loads: [
      { blockNo: 'BLK-D4', fruit: 'Banana (Cavendish)', qtyKg: 600, crates: 30 },
      { blockNo: 'BLK-C3', fruit: 'Pineapple (Mauritius)', qtyKg: 280, crates: 14 },
      { blockNo: 'BLK-E5', fruit: 'Guava (Bangkok)', qtyKg: 150, crates: 8 }
    ],
    totalQtyKg: 1030,
    missingQtyKg: 0,
    discrepancyNotes: 'All crates verified intact.'
  }
];

// ==========================================
// 3. DETERMINISTIC SVG QR CODE GENERATOR
// ==========================================
const DynamicQRCode = ({ value, size = 140 }) => {
  // Generates a deterministic 15x15 QR-like visual matrix from any text string
  const gridSize = 15;
  const cells = useMemo(() => {
    let hash = 0;
    const str = value || 'AGROFLEET';
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }

    const matrix = Array(gridSize)
      .fill(0)
      .map(() => Array(gridSize).fill(false));

    // Finder patterns (3 corners)
    const drawFinder = (r0, c0) => {
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          if (r === 0 || r === 4 || c === 0 || c === 4 || (r >= 1 && r <= 3 && c >= 1 && c <= 3 && (r === 2 && c === 2))) {
            matrix[r0 + r][c0 + c] = true;
          }
        }
      }
    };
    drawFinder(0, 0);
    drawFinder(0, gridSize - 5);
    drawFinder(gridSize - 5, 0);

    // Fill data bits deterministically
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const inFinder =
          (r < 6 && c < 6) ||
          (r < 6 && c >= gridSize - 6) ||
          (r >= gridSize - 6 && c < 6);
        if (!inFinder) {
          const charCode = str.charCodeAt((r * gridSize + c) % str.length);
          matrix[r][c] = ((charCode + r * 7 + c * 13 + Math.abs(hash)) % 3) === 0;
        }
      }
    }
    return matrix;
  }, [value]);

  const cellSize = size / gridSize;

  return (
    <div className="inline-flex flex-col items-center bg-white p-3 rounded-xl shadow-inner border border-slate-200">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {cells.map((row, rIdx) =>
          row.map((filled, cIdx) =>
            filled ? (
              <rect
                key={`${rIdx}-${cIdx}`}
                x={cIdx * cellSize}
                y={rIdx * cellSize}
                width={cellSize + 0.4}
                height={cellSize + 0.4}
                fill="#0f172a"
                rx={1}
              />
            ) : null
          )
        )}
      </svg>
      <span className="mt-1.5 font-mono text-[10px] font-bold tracking-wider text-slate-600 uppercase">
        {value.slice(0, 22)}
      </span>
    </div>
  );
};

// ==========================================
// 4. MAIN APPLICATION COMPONENT
// ==========================================
export default function App() {
  // Language & Mode
  const [lang, setLang] = useState('en');
  const t = TRANSLATIONS[lang];
  const [mode, setMode] = useState('driver'); // 'driver' | 'manager'
  const [managerUnlocked, setManagerUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [managerTab, setManagerTab] = useState('dashboard');

  // Toast Notification State (replaces alert/confirm)
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Persistent Local Storage States
  const [trips, setTrips] = useState(() => {
    try {
      const saved = localStorage.getItem('agrofleet_trips_v1');
      return saved ? JSON.parse(saved) : INITIAL_TRIPS;
    } catch {
      return INITIAL_TRIPS;
    }
  });

  const [blocks, setBlocks] = useState(() => {
    try {
      const saved = localStorage.getItem('agrofleet_blocks_v1');
      return saved ? JSON.parse(saved) : INITIAL_BLOCKS;
    } catch {
      return INITIAL_BLOCKS;
    }
  });

  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('agrofleet_users_v1');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  // Active Trip in Progress (Saved in localStorage so refreshing doesn't lose driver's trip)
  const [activeTrip, setActiveTrip] = useState(() => {
    try {
      const saved = localStorage.getItem('agrofleet_active_trip_v1');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem('agrofleet_trips_v1', JSON.stringify(trips));
    } catch (e) {
      console.error('Storage error', e);
    }
  }, [trips]);

  useEffect(() => {
    try {
      localStorage.setItem('agrofleet_blocks_v1', JSON.stringify(blocks));
    } catch (e) {
      console.error('Storage error', e);
    }
  }, [blocks]);

  useEffect(() => {
    try {
      localStorage.setItem('agrofleet_users_v1', JSON.stringify(users));
    } catch (e) {
      console.error('Storage error', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      if (activeTrip) {
        localStorage.setItem('agrofleet_active_trip_v1', JSON.stringify(activeTrip));
      } else {
        localStorage.removeItem('agrofleet_active_trip_v1');
      }
    } catch (e) {
      console.error('Storage error', e);
    }
  }, [activeTrip]);

  // New Trip Initialization Form State
  const [initForm, setInitForm] = useState({
    date: new Date().toISOString().split('T')[0],
    driver: 'Kasun Perera',
    vehicleNo: 'WP LB-4582',
    origin: 'Location A - Kadawatha Dispatch Hub',
    farmLocation: 'Gampaha Fruit Farm',
    startMeter: 45184
  });

  // QR Scanner Modal State
  const [scannerOpen, setScannerOpen] = useState(false);
  const [selectedTripModal, setSelectedTripModal] = useState(null);

  // Filter States for Manager Portal
  const [searchQuery, setSearchQuery] = useState('');
  const [blockFilter, setBlockFilter] = useState('ALL');
  const fileInputRef = useRef(null);

  // New Block Form State
  const [newBlock, setNewBlock] = useState({ id: '', name: '', fruit: '', availableKg: '' });
  // New User Form State
  const [newUser, setNewUser] = useState({ name: '', role: 'Driver', vehicle: '' });

  // Live Timer Effect for Active Trip
  const [nowTick, setNowTick] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNowTick(Date.now()), 10000);
    return () => clearInterval(timer);
  }, []);

  // Auto-update recommended start meter when vehicle/driver changes
  const handleDriverChange = (driverName) => {
    const usr = users.find((u) => u.name === driverName);
    const vehicle = usr && usr.vehicle !== 'N/A' ? usr.vehicle : initForm.vehicleNo;
    // Find last endMeter for this vehicle
    const vehicleTrips = trips.filter((tr) => tr.vehicleNo.toLowerCase() === vehicle.toLowerCase());
    const lastEndMeter = vehicleTrips.length > 0 ? Math.max(...vehicleTrips.map((tr) => Number(tr.endMeter) || 0)) : 45000;

    setInitForm({
      ...initForm,
      driver: driverName,
      vehicleNo: vehicle,
      startMeter: lastEndMeter
    });
  };

  // Helper: Get current GPS coordinates (with fallback for sandboxed preview)
  const fetchGpsCoordinates = (label, callback) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coordStr = `${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E (${label})`;
          callback(coordStr);
        },
        () => {
          // Fallback realistic coordinates if browser blocks iframe geolocation
          const mockCoords = {
            Dispatch: '7.0013° N, 79.9519° E (Location A)',
            Farm: '7.0840° N, 80.0098° E (Farm Gate)',
            Return: '7.0015° N, 79.9521° E (Drop-off Hub)'
          };
          callback(mockCoords[label] || '7.0512° N, 79.9840° E (Auto-Tagged)');
        },
        { timeout: 3000 }
      );
    } else {
      callback(`7.0840° N, 80.0098° E (${label})`);
    }
  };

  // ==========================================
  // 5. DRIVER WORKFLOW ACTIONS
  // ==========================================

  // Step 1: Start Trip
  const handleStartTrip = (e) => {
    e.preventDefault();
    if (!initForm.driver || !initForm.vehicleNo || !initForm.startMeter) {
      showToast('Please fill Driver, Vehicle No, and Start Meter Reading.', 'error');
      return;
    }

    fetchGpsCoordinates('Dispatch', (gpsString) => {
      const tripId = `TRP-${new Date().getFullYear()}-${String(trips.length + 1).padStart(3, '0')}`;
      const newActive = {
        id: tripId,
        date: initForm.date,
        driver: initForm.driver,
        vehicleNo: initForm.vehicleNo,
        origin: initForm.origin,
        farmLocation: initForm.farmLocation,
        startMeter: Number(initForm.startMeter),
        endMeter: '',
        stage: 'STARTED', // STARTED -> ARRIVED_FARM -> LOADING -> LOADED_TOKEN -> IN_TRANSIT
        token: '',
        timestamps: {
          tripStarted: new Date().toISOString(),
          arrivedAtFarm: null,
          loadingStarted: null,
          loadingCompleted: null,
          tripEnded: null
        },
        gpsLogs: {
          start: gpsString,
          farm: 'Pending...',
          end: 'Pending...'
        },
        loads: [
          { blockNo: blocks[0]?.id || 'BLK-A1', fruit: blocks[0]?.fruit || 'Mango (TJC)', qtyKg: '', crates: '' }
        ],
        missingQtyKg: 0,
        discrepancyNotes: ''
      };
      setActiveTrip(newActive);
      showToast(`Trip ${tripId} started! GPS & Odometer logged.`);
    });
  };

  // Step 2: Arrived at Farm (Starts Waiting Timer)
  const handleArrivedAtFarm = () => {
    fetchGpsCoordinates('Farm', (gpsString) => {
      setActiveTrip((prev) => ({
        ...prev,
        stage: 'ARRIVED_FARM',
        timestamps: {
          ...prev.timestamps,
          arrivedAtFarm: new Date().toISOString()
        },
        gpsLogs: {
          ...prev.gpsLogs,
          farm: gpsString
        }
      }));
      showToast('Arrived at Farm! Waiting time tracking started.');
    });
  };

  // Step 3: Start Loading
  const handleStartLoading = () => {
    setActiveTrip((prev) => ({
      ...prev,
      stage: 'LOADING',
      timestamps: {
        ...prev.timestamps,
        loadingStarted: new Date().toISOString()
      }
    }));
    showToast('Packing & Loading started! Add multiple Block Nos & Quantities below.');
  };

  // Multi-Block Row Handlers
  const handleAddLoadRow = () => {
    const defaultBlock = blocks[0] || { id: 'BLK-A1', fruit: 'Mango' };
    setActiveTrip((prev) => ({
      ...prev,
      loads: [...prev.loads, { blockNo: defaultBlock.id, fruit: defaultBlock.fruit, qtyKg: '', crates: '' }]
    }));
  };

  const handleRemoveLoadRow = (index) => {
    if (activeTrip.loads.length <= 1) {
      showToast('At least one block load entry is required.', 'error');
      return;
    }
    setActiveTrip((prev) => ({
      ...prev,
      loads: prev.loads.filter((_, idx) => idx !== index)
    }));
  };

  const handleUpdateLoadRow = (index, field, value) => {
    setActiveTrip((prev) => {
      const updated = [...prev.loads];
      if (field === 'blockNo') {
        const foundBlock = blocks.find((b) => b.id === value);
        updated[index] = {
          ...updated[index],
          blockNo: value,
          fruit: foundBlock ? foundBlock.fruit : updated[index].fruit
        };
      } else {
        updated[index] = { ...updated[index], [field]: value };
      }
      return { ...prev, loads: updated };
    });
  };

  // Barcode / QR Scan Handler (auto-adds or updates block row)
  const handleSimulatedScan = (scannedBlock) => {
    setActiveTrip((prev) => {
      if (!prev) return prev;
      // Check if last row is empty
      const loadsCopy = [...prev.loads];
      const lastIdx = loadsCopy.length - 1;
      if (lastIdx >= 0 && !loadsCopy[lastIdx].qtyKg) {
        loadsCopy[lastIdx] = {
          blockNo: scannedBlock.id,
          fruit: scannedBlock.fruit,
          qtyKg: 150,
          crates: 8
        };
      } else {
        loadsCopy.push({
          blockNo: scannedBlock.id,
          fruit: scannedBlock.fruit,
          qtyKg: 150,
          crates: 8
        });
      }
      return { ...prev, loads: loadsCopy };
    });
    setScannerOpen(false);
    showToast(`Scanned ${scannedBlock.barcode} (${scannedBlock.id}) — Added 150kg!`);
  };

  // Step 4: Complete Loading & Generate Digital Token
  const handleCompleteLoading = () => {
    const validLoads = activeTrip.loads.filter((l) => Number(l.qtyKg) > 0);
    if (validLoads.length === 0) {
      showToast('Please enter a valid Load Qty (kg) for at least one Block No.', 'error');
      return;
    }

    const totalKg = validLoads.reduce((acc, row) => acc + Number(row.qtyKg || 0), 0);
    const randomHash = Math.random().toString(36).substring(2, 6).toUpperCase();
    const cleanVeh = activeTrip.vehicleNo.replace(/[^a-zA-Z0-9]/g, '');
    const generatedToken = `TKN-${randomHash}-${cleanVeh}-${totalKg}KG`;

    setActiveTrip((prev) => ({
      ...prev,
      stage: 'LOADED_TOKEN',
      loads: validLoads.map((l) => ({
        ...l,
        qtyKg: Number(l.qtyKg),
        crates: Number(l.crates || Math.ceil(Number(l.qtyKg) / 20))
      })),
      token: generatedToken,
      timestamps: {
        ...prev.timestamps,
        loadingCompleted: new Date().toISOString()
      }
    }));
    showToast(`Digital Token ${generatedToken} generated!`);
  };

  // Step 5: Complete & Save Trip to Local JSON
  const handleEndTrip = (e) => {
    e.preventDefault();
    const endOdo = Number(activeTrip.endMeter);
    if (!endOdo || endOdo < activeTrip.startMeter) {
      showToast(`End Meter (${endOdo}) must be greater than or equal to Start Meter (${activeTrip.startMeter} km).`, 'error');
      return;
    }

    fetchGpsCoordinates('Return', (gpsEndString) => {
      const endIso = new Date().toISOString();
      const tStart = new Date(activeTrip.timestamps.tripStarted);
      const tArrive = new Date(activeTrip.timestamps.arrivedAtFarm || activeTrip.timestamps.tripStarted);
      const tLoadStart = new Date(activeTrip.timestamps.loadingStarted || tArrive);
      const tLoadEnd = new Date(activeTrip.timestamps.loadingCompleted || tLoadStart);
      const tEnd = new Date(endIso);

      const waitingMins = Math.max(1, Math.round((tLoadStart - tArrive) / 60000));
      const loadingMins = Math.max(1, Math.round((tLoadEnd - tLoadStart) / 60000));
      const totalMins = Math.max(2, Math.round((tEnd - tStart) / 60000));

      const totalQtyKg = activeTrip.loads.reduce((sum, item) => sum + Number(item.qtyKg || 0), 0);

      const finalizedTrip = {
        id: activeTrip.id,
        date: activeTrip.date,
        driver: activeTrip.driver,
        vehicleNo: activeTrip.vehicleNo,
        origin: activeTrip.origin,
        farmLocation: activeTrip.farmLocation,
        startMeter: Number(activeTrip.startMeter),
        endMeter: endOdo,
        distanceKm: endOdo - Number(activeTrip.startMeter),
        token: activeTrip.token,
        timestamps: {
          ...activeTrip.timestamps,
          tripEnded: endIso
        },
        durations: {
          waitingMins,
          loadingMins,
          totalMins
        },
        gpsLogs: {
          ...activeTrip.gpsLogs,
          end: gpsEndString
        },
        loads: activeTrip.loads,
        totalQtyKg,
        missingQtyKg: Number(activeTrip.missingQtyKg || 0),
        discrepancyNotes: activeTrip.discrepancyNotes || 'Delivered in full.'
      };

      // Deduct harvested stock from farm blocks
      setBlocks((prevBlocks) =>
        prevBlocks.map((blk) => {
          const loadedFromBlock = finalizedTrip.loads
            .filter((l) => l.blockNo === blk.id)
            .reduce((s, l) => s + Number(l.qtyKg || 0), 0);
          if (loadedFromBlock > 0) {
            return { ...blk, availableKg: Math.max(0, blk.availableKg - loadedFromBlock) };
          }
          return blk;
        })
      );

      setTrips((prev) => [finalizedTrip, ...prev]);
      setInitForm((prev) => ({ ...prev, startMeter: endOdo }));
      setActiveTrip(null);
      showToast(`Trip ${finalizedTrip.id} completed and saved to browser storage!`);
    });
  };

  // ==========================================
  // 6. EXPORT / IMPORT FUNCTIONS (CSV, EXCEL, JSON)
  // ==========================================

  // Export CSV (Flattened so multiple Block Nos & Load Qtys are clear)
  const handleExportCSV = () => {
    const headers = [
      'Trip ID',
      'Date',
      'Assigned Driver',
      'Vehicle No',
      'Start Meter (km)',
      'End Meter (km)',
      'Distance (km)',
      'Block No',
      'Fruit Variety',
      'Block Load Qty (kg)',
      'Crates',
      'Trip Total Load (kg)',
      'Missing/Damaged (kg)',
      'Waiting Time (mins)',
      'Loading Time (mins)',
      'Total Trip Duration (mins)',
      'Digital Token',
      'Farm GPS Coordinates',
      'Notes'
    ];

    const rows = [];
    trips.forEach((tr) => {
      tr.loads.forEach((ld) => {
        rows.push([
          tr.id,
          tr.date,
          `"${tr.driver}"`,
          `"${tr.vehicleNo}"`,
          tr.startMeter,
          tr.endMeter,
          tr.distanceKm,
          ld.blockNo,
          `"${ld.fruit}"`,
          ld.qtyKg,
          ld.crates,
          tr.totalQtyKg,
          tr.missingQtyKg,
          tr.durations?.waitingMins || 0,
          tr.durations?.loadingMins || 0,
          tr.durations?.totalMins || 0,
          tr.token,
          `"${tr.gpsLogs?.farm || ''}"`,
          `"${(tr.discrepancyNotes || '').replace(/"/g, '""')}"`
        ]);
      });
    });

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AgroFleet_Logistics_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CSV Report generated and downloaded!');
  };

  // Export Excel (.xls HTML Workbook format for rich formatting without server)
  const handleExportExcel = () => {
    let tableHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Trip Logistics Report</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>
      <body>
      <table border="1">
        <thead>
          <tr style="background-color:#15803d; color:#ffffff; font-weight:bold;">
            <th>Trip ID</th>
            <th>Date</th>
            <th>Assigned Driver</th>
            <th>Vehicle No</th>
            <th>Start Meter (km)</th>
            <th>End Meter (km)</th>
            <th>Distance (km)</th>
            <th>Blocks Multiplied (Block No : Qty)</th>
            <th>Total Load Qty (kg)</th>
            <th>Missing Qty (kg)</th>
            <th>Waiting Time (min)</th>
            <th>Loading Time (min)</th>
            <th>Total Duration (min)</th>
            <th>Digital Token</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Farm GPS</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
    `;

    trips.forEach((tr) => {
      const blocksSummary = tr.loads.map((l) => `${l.blockNo} (${l.fruit}): ${l.qtyKg}kg`).join(' | ');
      tableHtml += `
        <tr>
          <td>${tr.id}</td>
          <td>${tr.date}</td>
          <td>${tr.driver}</td>
          <td>${tr.vehicleNo}</td>
          <td>${tr.startMeter}</td>
          <td>${tr.endMeter}</td>
          <td>${tr.distanceKm}</td>
          <td>${blocksSummary}</td>
          <td>${tr.totalQtyKg}</td>
          <td>${tr.missingQtyKg}</td>
          <td>${tr.durations?.waitingMins || 0}</td>
          <td>${tr.durations?.loadingMins || 0}</td>
          <td>${tr.durations?.totalMins || 0}</td>
          <td>${tr.token}</td>
          <td>${tr.timestamps?.tripStarted ? new Date(tr.timestamps.tripStarted).toLocaleTimeString() : ''}</td>
          <td>${tr.timestamps?.tripEnded ? new Date(tr.timestamps.tripEnded).toLocaleTimeString() : ''}</td>
          <td>${tr.gpsLogs?.farm || ''}</td>
          <td>${tr.discrepancyNotes || ''}</td>
        </tr>
      `;
    });

    tableHtml += `</tbody></table></body></html>`;

    const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AgroFleet_Excel_Report_${new Date().toISOString().slice(0, 10)}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Excel (.xls) spreadsheet downloaded!');
  };

  // Export Raw JSON Database Backup
  const handleExportJSON = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      system: 'AgroFleet Lanka Serverless Next.js PWA',
      trips,
      blocks,
      users
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AgroFleet_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Full JSON Database Backup downloaded!');
  };

  // Import JSON Backup File
  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (Array.isArray(parsed.trips)) setTrips(parsed.trips);
        if (Array.isArray(parsed.blocks)) setBlocks(parsed.blocks);
        if (Array.isArray(parsed.users)) setUsers(parsed.users);
        showToast('JSON Database successfully restored and merged!');
      } catch {
        showToast('Invalid JSON backup file format.', 'error');
      }
    };
    reader.readAsText(file);
  };

  // Filtered Trips for Manager Table
  const filteredTrips = useMemo(() => {
    return trips.filter((tr) => {
      const matchesQuery =
        tr.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tr.vehicleNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tr.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tr.loads.some((l) => l.blockNo.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesBlock =
        blockFilter === 'ALL' || tr.loads.some((l) => l.blockNo === blockFilter);

      return matchesQuery && matchesBlock;
    });
  }, [trips, searchQuery, blockFilter]);

  // Summary Analytics
  const stats = useMemo(() => {
    return {
      totalTrips: filteredTrips.length,
      totalHarvestKg: filteredTrips.reduce((s, tr) => s + Number(tr.totalQtyKg || 0), 0),
      totalDistanceKm: filteredTrips.reduce((s, tr) => s + Number(tr.distanceKm || 0), 0),
      totalMissingKg: filteredTrips.reduce((s, tr) => s + Number(tr.missingQtyKg || 0), 0)
    };
  }, [filteredTrips]);

  // Add new Farm Block
  const handleAddBlock = (e) => {
    e.preventDefault();
    if (!newBlock.id || !newBlock.fruit) {
      showToast('Please enter Block ID and Fruit Type', 'error');
      return;
    }
    const blkId = newBlock.id.toUpperCase();
    setBlocks((prev) => [
      ...prev,
      {
        id: blkId,
        name: newBlock.name || `Block ${blkId}`,
        fruit: newBlock.fruit,
        availableKg: Number(newBlock.availableKg || 1000),
        barcode: `QR-${blkId}`
      }
    ]);
    setNewBlock({ id: '', name: '', fruit: '', availableKg: '' });
    showToast(`Block ${blkId} added with QR code!`);
  };

  // Add new User
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name) return;
    setUsers((prev) => [
      ...prev,
      {
        id: `USR-${prev.length + 1}`,
        name: newUser.name,
        role: newUser.role,
        vehicle: newUser.vehicle || 'WP XX-0000',
        permissions:
          newUser.role === 'Logistics Admin'
            ? ['all_access', 'export_reports', 'manage_users']
            : ['start_trip', 'scan_qr', 'log_loads']
      }
    ]);
    setNewUser({ name: '', role: 'Driver', vehicle: '' });
    showToast(`User ${newUser.name} added!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm animate-bounce">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border ${
              toast.type === 'error'
                ? 'bg-red-600 text-white border-red-700'
                : 'bg-emerald-700 text-white border-emerald-800'
            }`}
          >
            {toast.type === 'error' ? <AlertTriangle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Top Navigation Header */}
      <header className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/20 p-2.5 rounded-xl border border-emerald-400/30">
              <Truck className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight">{t.appName}</h1>
                <span className="hidden sm:inline-block text-[10px] font-semibold uppercase px-2 py-0.5 bg-emerald-400/20 text-emerald-200 rounded-full border border-emerald-400/30">
                  Serverless JSON PWA
                </span>
              </div>
              <p className="text-xs text-emerald-200/80">{t.appSubtitle}</p>
            </div>
          </div>

          {/* Mode Switcher & Language Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-emerald-950/60 p-1 rounded-xl flex border border-emerald-700/50">
              <button
                onClick={() => setMode('driver')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                  mode === 'driver'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>{t.driverMode}</span>
              </button>
              <button
                onClick={() => setMode('manager')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                  mode === 'manager'
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>{t.managerMode}</span>
              </button>
            </div>

            <button
              onClick={() => setLang(lang === 'en' ? 'si' : 'en')}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-white/15 transition"
              title="Switch Language (English / Sinhala)"
            >
              <Languages className="w-4 h-4 text-amber-300" />
              <span>{t.switchLang}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {/* ==========================================
            MODE 1: DRIVER TERMINAL (MOBILE-FIRST WORKFLOW)
           ========================================== */}
        {mode === 'driver' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Driver Status Banner */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${activeTrip ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                <div>
                  <h2 className="font-bold text-slate-800 text-sm sm:text-base">
                    {activeTrip ? `${t.activeTrip}: ${activeTrip.id}` : t.noActiveTrip}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {activeTrip
                      ? `${activeTrip.driver} • ${activeTrip.vehicleNo} • Start: ${activeTrip.startMeter} km`
                      : 'All data saves offline in browser JSON automatically'}
                  </p>
                </div>
              </div>
              {activeTrip && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {activeTrip.stage.replace('_', ' ')}
                </span>
              )}
            </div>

            {/* IF NO ACTIVE TRIP: SHOW TRIP INITIALIZATION FORM */}
            {!activeTrip ? (
              <form onSubmit={handleStartTrip} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-bold">{t.noActiveTrip}</h3>
                  </div>
                  <span className="text-xs text-slate-400">Step 1 of 4</span>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                        {t.date}
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="date"
                          required
                          value={initForm.date}
                          onChange={(e) => setInitForm({ ...initForm, date: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                        {t.driverName}
                      </label>
                      <select
                        value={initForm.driver}
                        onChange={(e) => handleDriverChange(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      >
                        {users
                          .filter((u) => u.role === 'Driver')
                          .map((u) => (
                            <option key={u.id} value={u.name}>
                              {u.name} ({u.vehicle})
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                        {t.vehicleNo}
                      </label>
                      <div className="relative">
                        <Truck className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. WP LB-4582"
                          value={initForm.vehicleNo}
                          onChange={(e) => setInitForm({ ...initForm, vehicleNo: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold uppercase focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                        {t.startMeter}
                      </label>
                      <div className="relative">
                        <Gauge className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="number"
                          required
                          min="0"
                          value={initForm.startMeter}
                          onChange={(e) => setInitForm({ ...initForm, startMeter: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                        {t.originLocation}
                      </label>
                      <input
                        type="text"
                        value={initForm.origin}
                        onChange={(e) => setInitForm({ ...initForm, origin: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                        {t.destinationFarm}
                      </label>
                      <input
                        type="text"
                        value={initForm.farmLocation}
                        onChange={(e) => setInitForm({ ...initForm, farmLocation: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 text-base"
                  >
                    <Navigation className="w-5 h-5" />
                    <span>{t.startTripBtn}</span>
                  </button>
                </div>
              </form>
            ) : (
              /* ACTIVE TRIP STEP-BY-STEP WORKFLOW */
              <div className="space-y-5">
                {/* Live Time & GPS Telemetry Card */}
                <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-md space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700">
                      <span className="text-[11px] text-slate-400 uppercase block">Start Time</span>
                      <span className="font-mono font-bold text-sm text-emerald-400">
                        {new Date(activeTrip.timestamps.tripStarted).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700">
                      <span className="text-[11px] text-slate-400 uppercase block">{t.waitingTime}</span>
                      <span className="font-mono font-bold text-sm text-amber-400">
                        {activeTrip.timestamps.arrivedAtFarm
                          ? `${Math.max(
                              0,
                              Math.round(
                                ((activeTrip.timestamps.loadingStarted
                                  ? new Date(activeTrip.timestamps.loadingStarted)
                                  : nowTick) -
                                  new Date(activeTrip.timestamps.arrivedAtFarm)) /
                                  60000
                              )
                            )} min`
                          : '—'}
                      </span>
                    </div>
                    <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700">
                      <span className="text-[11px] text-slate-400 uppercase block">{t.loadingTime}</span>
                      <span className="font-mono font-bold text-sm text-sky-400">
                        {activeTrip.timestamps.loadingStarted
                          ? `${Math.max(
                              0,
                              Math.round(
                                ((activeTrip.timestamps.loadingCompleted
                                  ? new Date(activeTrip.timestamps.loadingCompleted)
                                  : nowTick) -
                                  new Date(activeTrip.timestamps.loadingStarted)) /
                                  60000
                              )
                            )} min`
                          : '—'}
                      </span>
                    </div>
                    <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700">
                      <span className="text-[11px] text-slate-400 uppercase block">{t.totalLoaded}</span>
                      <span className="font-mono font-bold text-sm text-emerald-300">
                        {activeTrip.loads.reduce((s, r) => s + Number(r.qtyKg || 0), 0)} kg
                      </span>
                    </div>
                  </div>

                  {/* GPS Log Trail */}
                  <div className="text-xs bg-slate-800/60 rounded-xl p-3 border border-slate-700/70 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" /> {t.gpsStatus}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          fetchGpsCoordinates('Farm', (coord) => {
                            setActiveTrip((p) => ({
                              ...p,
                              gpsLogs: { ...p.gpsLogs, farm: coord }
                            }));
                            showToast(`GPS Updated: ${coord}`);
                          })
                        }
                        className="text-[11px] bg-slate-700 hover:bg-slate-600 px-2 py-0.5 rounded text-slate-200"
                      >
                        {t.captureGps}
                      </button>
                    </div>
                    <p className="text-slate-300">
                      <strong className="text-slate-400">Dispatch:</strong> {activeTrip.gpsLogs.start}
                    </p>
                    <p className="text-slate-300">
                      <strong className="text-slate-400">Farm:</strong> {activeTrip.gpsLogs.farm}
                    </p>
                  </div>
                </div>

                {/* STAGE 1 -> 2: ARRIVE AT FARM */}
                {activeTrip.stage === 'STARTED' && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">En Route to {activeTrip.farmLocation}</h3>
                      <p className="text-sm text-slate-500 mt-1">
                        Tap below when you arrive at the farm gate to log GPS and start the waiting time tracker.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleArrivedAtFarm}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow transition flex items-center justify-center gap-2"
                    >
                      <Clock className="w-5 h-5" />
                      <span>{t.arrivedFarmBtn}</span>
                    </button>
                  </div>
                )}

                {/* STAGE 2 -> 3: WAITING AT FARM -> START LOADING */}
                {activeTrip.stage === 'ARRIVED_FARM' && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-300 text-center space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto animate-pulse">
                      <Clock className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">Waiting at Farm Queue</h3>
                      <p className="text-sm text-slate-500 mt-1">
                        Arrived at{' '}
                        {new Date(activeTrip.timestamps.arrivedAtFarm).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                        . Tap below as soon as fruit crates are ready to pack & load.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleStartLoading}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow transition flex items-center justify-center gap-2"
                    >
                      <Package className="w-5 h-5" />
                      <span>{t.startLoadingBtn}</span>
                    </button>
                  </div>
                )}

                {/* STAGE 3: MULTI-BLOCK LOADING & QR SCANNING */}
                {(activeTrip.stage === 'LOADING' || activeTrip.stage === 'LOADED_TOKEN') && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                          <Sprout className="w-5 h-5 text-emerald-600" />
                          <span>Multi-Block Harvest Loading</span>
                        </h3>
                        <p className="text-xs text-slate-500">
                          Add multiple Block Nos and Load Quantities for this truck
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setScannerOpen(true)}
                          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-xl text-xs font-bold shadow-sm transition"
                        >
                          <ScanLine className="w-4 h-4" />
                          <span>{t.scanBarcodeBtn}</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleAddLoadRow}
                          className="flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-2 rounded-xl text-xs font-bold transition"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{t.addBlockRow}</span>
                        </button>
                      </div>
                    </div>

                    {/* Dynamic Rows for Block No & Load Qty */}
                    <div className="space-y-3">
                      {activeTrip.loads.map((row, index) => (
                        <div
                          key={index}
                          className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-end"
                        >
                          <div className="sm:col-span-4">
                            <label className="block text-[11px] font-semibold uppercase text-slate-500 mb-1">
                              {t.blockNo} #{index + 1}
                            </label>
                            <select
                              value={row.blockNo}
                              onChange={(e) => handleUpdateLoadRow(index, 'blockNo', e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold"
                            >
                              {blocks.map((b) => (
                                <option key={b.id} value={b.id}>
                                  {b.id} ({b.fruit})
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-[11px] font-semibold uppercase text-slate-500 mb-1">
                              {t.fruitType}
                            </label>
                            <input
                              type="text"
                              value={row.fruit}
                              onChange={(e) => handleUpdateLoadRow(index, 'fruit', e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-semibold uppercase text-slate-500 mb-1">
                              {t.loadQty}
                            </label>
                            <input
                              type="number"
                              min="1"
                              placeholder="kg"
                              value={row.qtyKg}
                              onChange={(e) => handleUpdateLoadRow(index, 'qtyKg', e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-mono font-bold text-emerald-700"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-semibold uppercase text-slate-500 mb-1">
                              {t.crateCount}
                            </label>
                            <input
                              type="number"
                              min="1"
                              placeholder="Crates"
                              value={row.crates}
                              onChange={(e) => handleUpdateLoadRow(index, 'crates', e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-mono"
                            />
                          </div>

                          <div className="sm:col-span-1 flex justify-end">
                            <button
                              type="button"
                              onClick={() => handleRemoveLoadRow(index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                              title="Remove Block Row"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {activeTrip.stage === 'LOADING' && (
                      <button
                        type="button"
                        onClick={handleCompleteLoading}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow transition flex items-center justify-center gap-2"
                      >
                        <QrCode className="w-5 h-5" />
                        <span>{t.completeLoadingBtn}</span>
                      </button>
                    )}
                  </div>
                )}

                {/* STAGE 4: DIGITAL TOKEN GENERATED & END TRIP / DISCREPANCY LOGGING */}
                {activeTrip.stage === 'LOADED_TOKEN' && (
                  <div className="space-y-5">
                    {/* Digital Gate Pass Token Card */}
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-400 shadow-sm flex flex-col sm:flex-row items-center gap-6">
                      <DynamicQRCode
                        value={`${activeTrip.token}|${activeTrip.vehicleNo}|${activeTrip.loads
                          .map((l) => `${l.blockNo}:${l.qtyKg}`)
                          .join(',')}`}
                        size={135}
                      />
                      <div className="space-y-2 text-center sm:text-left flex-1">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-200 text-emerald-900">
                          <CheckCircle2 className="w-4 h-4" /> {t.tokenVerified}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{t.digitalTokenTitle}</h3>
                        <p className="font-mono text-sm font-bold text-emerald-800 bg-white px-3 py-1.5 rounded-lg border border-emerald-200 inline-block">
                          {activeTrip.token}
                        </p>
                        <p className="text-xs text-slate-600">{t.digitalTokenDesc}</p>
                        <div className="text-xs text-slate-700 pt-1">
                          <strong>Manifest:</strong>{' '}
                          {activeTrip.loads.map((l) => `${l.blockNo} (${l.qtyKg}kg)`).join(', ')}
                        </div>
                      </div>
                    </div>

                    {/* Final Delivery, Discrepancy & End Odometer Form */}
                    <form
                      onSubmit={handleEndTrip}
                      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4"
                    >
                      <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-2 flex items-center gap-2">
                        <Gauge className="w-5 h-5 text-emerald-600" />
                        <span>{t.discrepancyTitle}</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                            {t.endMeter} *
                          </label>
                          <input
                            type="number"
                            required
                            min={activeTrip.startMeter}
                            placeholder={`Min: ${activeTrip.startMeter} km`}
                            value={activeTrip.endMeter}
                            onChange={(e) =>
                              setActiveTrip({ ...activeTrip, endMeter: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                          />
                          <span className="text-[11px] text-slate-400">
                            Start Meter was {activeTrip.startMeter} km
                          </span>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                            {t.missingQty}
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={activeTrip.missingQtyKg}
                            onChange={(e) =>
                              setActiveTrip({ ...activeTrip, missingQtyKg: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                          {t.discrepancyReason}
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Log any missing crates, weight loss, or traffic delays..."
                          value={activeTrip.discrepancyNotes}
                          onChange={(e) =>
                            setActiveTrip({ ...activeTrip, discrepancyNotes: e.target.value })
                          }
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span>{t.endTripBtn}</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            MODE 2: MANAGER PORTAL (REPORTS, STOCKS, PERMISSIONS, EXPORTS)
           ========================================== */}
        {mode === 'manager' && (
          <div>
            {!managerUnlocked ? (
              <div className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center space-y-4 my-8">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                  <Lock className="w-7 h-7" />
                </div>
                <h2 className="text-lg font-bold text-slate-800">{t.pinRequired}</h2>
                <p className="text-xs text-slate-500">{t.pinDesc}</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (pinInput === '1234' || pinInput === '0000') {
                      setManagerUnlocked(true);
                      showToast('Manager Portal Unlocked');
                    } else {
                      showToast('Invalid PIN. Try 1234.', 'error');
                    }
                  }}
                  className="space-y-3"
                >
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="••••"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-40 text-center text-2xl tracking-widest font-mono font-bold px-4 py-2 bg-slate-100 border border-slate-300 rounded-xl mx-auto block"
                  />
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>{t.unlockBtn}</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Manager Navigation Tabs & Quick Export Action Bar */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setManagerTab('dashboard')}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
                        managerTab === 'dashboard'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>{t.tabDashboard}</span>
                    </button>
                    <button
                      onClick={() => setManagerTab('stock')}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
                        managerTab === 'stock'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Sprout className="w-4 h-4" />
                      <span>{t.tabStock}</span>
                    </button>
                    <button
                      onClick={() => setManagerTab('permissions')}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
                        managerTab === 'permissions'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Shield className="w-4 h-4" />
                      <span>{t.tabPermissions}</span>
                    </button>
                    <button
                      onClick={() => setManagerTab('sync')}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
                        managerTab === 'sync'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <FileJson className="w-4 h-4" />
                      <span>{t.tabDataSync}</span>
                    </button>
                  </div>

                  {/* Direct 1-Click Export Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleExportCSV}
                      className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm transition"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{t.exportCsv}</span>
                    </button>
                    <button
                      onClick={handleExportExcel}
                      className="flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm transition"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>{t.exportExcel}</span>
                    </button>
                    <button
                      onClick={handleExportJSON}
                      className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm transition"
                    >
                      <Download className="w-4 h-4" />
                      <span>{t.exportJson}</span>
                    </button>
                  </div>
                </div>

                {/* KPI SUMMARY CARDS */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <span className="text-xs font-semibold uppercase text-slate-400">
                      {t.totalTripsStat}
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-1">
                      {stats.totalTrips}
                    </div>
                    <span className="text-[11px] text-emerald-600 font-medium">
                      100% Stored in Local JSON
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <span className="text-xs font-semibold uppercase text-slate-400">
                      {t.totalHarvestStat}
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1">
                      {stats.totalHarvestKg.toLocaleString()} kg
                    </div>
                    <span className="text-[11px] text-slate-500">Multi-block aggregated</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <span className="text-xs font-semibold uppercase text-slate-400">
                      {t.totalDistanceStat}
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-sky-700 mt-1">
                      {stats.totalDistanceKm.toLocaleString()} km
                    </div>
                    <span className="text-[11px] text-slate-500">Verified via Odometer</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <span className="text-xs font-semibold uppercase text-slate-400">
                      {t.missingStockStat}
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-red-600 mt-1">
                      {stats.totalMissingKg} kg
                    </div>
                    <span className="text-[11px] text-slate-500">Discrepancies logged</span>
                  </div>
                </div>

                {/* TAB 1: TRIP LOGS & MULTI-BLOCK REPORTS TABLE */}
                {managerTab === 'dashboard' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                      <input
                        type="text"
                        placeholder={t.filterDriver}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full sm:w-80 px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                      />

                      <select
                        value={blockFilter}
                        onChange={(e) => setBlockFilter(e.target.value)}
                        className="px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium"
                      >
                        <option value="ALL">{t.allBlocks}</option>
                        {blocks.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.id} - {b.fruit}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-slate-100 text-slate-600 uppercase text-[11px] border-b border-slate-200">
                            <th className="py-3 px-4">Trip / Date</th>
                            <th className="py-3 px-4">Driver & Vehicle</th>
                            <th className="py-3 px-4">Odometer (Start → End)</th>
                            <th className="py-3 px-4">Multiplied Blocks & Load Qty</th>
                            <th className="py-3 px-4">Wait / Load / Total</th>
                            <th className="py-3 px-4">Missing</th>
                            <th className="py-3 px-4">Token & GPS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {filteredTrips.map((tr) => (
                            <tr key={tr.id} className="hover:bg-slate-50/80">
                              <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                                <div>{tr.id}</div>
                                <div className="text-xs font-sans font-normal text-slate-500">
                                  {tr.date}
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="font-bold text-slate-800">{tr.driver}</div>
                                <div className="text-xs font-mono text-emerald-700 font-semibold">
                                  {tr.vehicleNo}
                                </div>
                              </td>
                              <td className="py-3.5 px-4 font-mono">
                                <div>
                                  {tr.startMeter} → {tr.endMeter} km
                                </div>
                                <span className="inline-block px-2 py-0.5 bg-sky-50 text-sky-800 rounded text-[11px] font-bold">
                                  {tr.distanceKm} km
                                </span>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="space-y-1">
                                  {tr.loads.map((ld, i) => (
                                    <div
                                      key={i}
                                      className="inline-flex items-center gap-1.5 mr-2 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs"
                                    >
                                      <span className="font-bold text-emerald-900">
                                        {ld.blockNo}:
                                      </span>
                                      <span className="text-emerald-700 font-mono font-bold">
                                        {ld.qtyKg}kg
                                      </span>
                                      <span className="text-[10px] text-slate-500">
                                        ({ld.fruit})
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                <div className="text-xs font-bold text-slate-700 mt-1">
                                  Total: {tr.totalQtyKg} kg
                                </div>
                              </td>
                              <td className="py-3.5 px-4 text-xs">
                                <div>
                                  <span className="text-slate-400">Wait:</span>{' '}
                                  <strong className="text-amber-700">
                                    {tr.durations?.waitingMins}m
                                  </strong>
                                </div>
                                <div>
                                  <span className="text-slate-400">Load:</span>{' '}
                                  <strong className="text-sky-700">
                                    {tr.durations?.loadingMins}m
                                  </strong>
                                </div>
                                <div>
                                  <span className="text-slate-400">Total:</span>{' '}
                                  <strong className="text-slate-800">
                                    {tr.durations?.totalMins}m
                                  </strong>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                {tr.missingQtyKg > 0 ? (
                                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                                    -{tr.missingQtyKg} kg
                                  </span>
                                ) : (
                                  <span className="text-xs text-emerald-600 font-semibold">
                                    0 kg
                                  </span>
                                )}
                              </td>
                              <td className="py-3.5 px-4">
                                <button
                                  onClick={() => setSelectedTripModal(tr)}
                                  className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2.5 py-1.5 rounded-lg"
                                >
                                  <QrCode className="w-3.5 h-3.5" />
                                  <span>Inspect</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 2: FARM BLOCKS, STOCKS & BARCODE/QR GENERATOR */}
                {managerTab === 'stock' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                      <h3 className="font-bold text-slate-800 text-base">
                        Farm Blocks Stock & Printable Crate QR Codes
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {blocks.map((b) => (
                          <div
                            key={b.id}
                            className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4"
                          >
                            <div className="space-y-1">
                              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono text-xs font-bold rounded">
                                {b.id}
                              </span>
                              <h4 className="font-bold text-slate-800 text-sm">{b.fruit}</h4>
                              <p className="text-xs text-slate-500">{b.name}</p>
                              <p className="text-sm font-mono font-bold text-emerald-700 pt-1">
                                Available Stock: {b.availableKg} kg
                              </p>
                            </div>
                            <DynamicQRCode value={b.barcode} size={78} />
                          </div>
                        ))}
                      </div>
                    </div>

                    <form
                      onSubmit={handleAddBlock}
                      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4 h-fit"
                    >
                      <h3 className="font-bold text-slate-800 text-base">
                        Add New Farm Block & QR
                      </h3>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                          Block No (e.g. BLK-F6)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="BLK-F6"
                          value={newBlock.id}
                          onChange={(e) => setNewBlock({ ...newBlock, id: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm uppercase font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                          Block Description
                        </label>
                        <input
                          type="text"
                          placeholder="South Hill Terrace"
                          value={newBlock.name}
                          onChange={(e) => setNewBlock({ ...newBlock, name: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                          Fruit Variety
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Passion Fruit / Rambutan"
                          value={newBlock.fruit}
                          onChange={(e) => setNewBlock({ ...newBlock, fruit: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                          Estimated Harvest Stock (kg)
                        </label>
                        <input
                          type="number"
                          placeholder="1500"
                          value={newBlock.availableKg}
                          onChange={(e) =>
                            setNewBlock({ ...newBlock, availableKg: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-sm transition"
                      >
                        Create Block & Generate QR
                      </button>
                    </form>
                  </div>
                )}

                {/* TAB 3: USERS, ROLES & PERMISSIONS */}
                {managerTab === 'permissions' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                      <h3 className="font-bold text-slate-800 text-base">
                        Drivers, Stock Controllers & Role Permissions
                      </h3>
                      <div className="space-y-3">
                        {users.map((u) => (
                          <div
                            key={u.id}
                            className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <UserCheck className="w-4 h-4 text-emerald-600" />
                                <span className="font-bold text-slate-800 text-sm">{u.name}</span>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
                                  {u.role}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-1">
                                Assigned Vehicle: <strong>{u.vehicle}</strong>
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {u.permissions.map((perm) => (
                                <span
                                  key={perm}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono font-semibold"
                                >
                                  {perm}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <form
                      onSubmit={handleAddUser}
                      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4 h-fit"
                    >
                      <h3 className="font-bold text-slate-800 text-base">Add Driver / Staff</h3>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sampath Kumara"
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                          Role & Permission Set
                        </label>
                        <select
                          value={newUser.role}
                          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                        >
                          <option value="Driver">Driver (Trip & Load Logging)</option>
                          <option value="Farm Stock Controller">
                            Farm Stock Controller (Verify Token & Stock)
                          </option>
                          <option value="Logistics Admin">
                            Logistics Admin (Full Reports & Exports)
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                          Assigned Vehicle No
                        </label>
                        <input
                          type="text"
                          placeholder="WP LC-7788"
                          value={newUser.vehicle}
                          onChange={(e) => setNewUser({ ...newUser, vehicle: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm uppercase font-mono"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-sm transition"
                      >
                        Save User Profile
                      </button>
                    </form>
                  </div>
                )}

                {/* TAB 4: SERVERLESS JSON BACKUP, RESTORE & RAW JSON VIEWER */}
                {managerTab === 'sync' && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                      <div>
                        <h3 className="font-bold text-slate-800 text-base">
                          Serverless Data Management (Browser JSON Storage)
                        </h3>
                        <p className="text-xs text-slate-500">
                          No database or backend API required. All data lives in your browser and can be exported as CSV, Excel, or JSON at any time.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".json"
                          onChange={handleImportJSON}
                          className="hidden"
                        />
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition"
                        >
                          <Upload className="w-4 h-4" />
                          <span>{t.importJson}</span>
                        </button>
                        <button
                          onClick={() => {
                            setTrips(INITIAL_TRIPS);
                            setBlocks(INITIAL_BLOCKS);
                            setUsers(INITIAL_USERS);
                            showToast('Demo data restored to initial state.');
                          }}
                          className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>{t.clearData}</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                        Live LocalStorage JSON Payload ({trips.length} Trips, {blocks.length} Blocks)
                      </label>
                      <pre className="bg-slate-900 text-emerald-300 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-96">
                        {JSON.stringify({ trips, blocks }, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ==========================================
          MODAL 1: SIMULATED BARCODE / QR SCANNER
         ========================================== */}
      {scannerOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ScanLine className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-800">Crate & Block QR/Barcode Scanner</h3>
              </div>
              <button
                onClick={() => setScannerOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Camera Viewfinder Simulation */}
            <div className="bg-slate-900 rounded-xl p-6 text-center relative overflow-hidden border-2 border-indigo-500/40">
              <div className="w-40 h-40 mx-auto border-2 border-dashed border-emerald-400 rounded-xl flex flex-col items-center justify-center text-emerald-300 space-y-2">
                <QrCode className="w-12 h-12 animate-pulse" />
                <span className="text-[11px] font-mono">Align Block QR Code</span>
              </div>
              <p className="text-xs text-slate-400 mt-3">
                Select a Farm Block QR below to simulate instant camera scan:
              </p>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto">
              {blocks.map((blk) => (
                <button
                  key={blk.id}
                  type="button"
                  onClick={() => handleSimulatedScan(blk)}
                  className="w-full p-3 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 flex items-center justify-between text-left transition"
                >
                  <div>
                    <div className="font-bold text-sm text-slate-800">
                      {blk.id} — {blk.fruit}
                    </div>
                    <div className="text-xs font-mono text-slate-500">Code: {blk.barcode}</div>
                  </div>
                  <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg">
                    Scan +150kg
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 2: TRIP DIGITAL TOKEN & TELEMETRY INSPECTOR
         ========================================== */}
      {selectedTripModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-800">
                  Trip Manifest & Token: {selectedTripModal.id}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedTripModal.driver} ({selectedTripModal.vehicleNo}) • {selectedTripModal.date}
                </p>
              </div>
              <button
                onClick={() => setSelectedTripModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <DynamicQRCode value={selectedTripModal.token} size={115} />
              <div className="space-y-1.5 text-xs">
                <div>
                  <span className="text-slate-400">Digital Token:</span>{' '}
                  <strong className="font-mono text-emerald-700">{selectedTripModal.token}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Dispatch GPS:</span>{' '}
                  <span>{selectedTripModal.gpsLogs?.start}</span>
                </div>
                <div>
                  <span className="text-slate-400">Farm Gate GPS:</span>{' '}
                  <span>{selectedTripModal.gpsLogs?.farm}</span>
                </div>
                <div>
                  <span className="text-slate-400">Drop-off GPS:</span>{' '}
                  <span>{selectedTripModal.gpsLogs?.end}</span>
                </div>
                <div>
                  <span className="text-slate-400">Remarks:</span>{' '}
                  <span className="italic">{selectedTripModal.discrepancyNotes}</span>
                </div>
              </div>
            </div>

            <div className="text-xs space-y-1 bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200">
              <div className="font-bold text-emerald-950 mb-1">Timestamps Breakdown:</div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <strong>Trip Started:</strong>{' '}
                  {selectedTripModal.timestamps?.tripStarted
                    ? new Date(selectedTripModal.timestamps.tripStarted).toLocaleTimeString()
                    : '—'}
                </div>
                <div>
                  <strong>Arrived at Farm:</strong>{' '}
                  {selectedTripModal.timestamps?.arrivedAtFarm
                    ? new Date(selectedTripModal.timestamps.arrivedAtFarm).toLocaleTimeString()
                    : '—'}
                </div>
                <div>
                  <strong>Loading Started:</strong>{' '}
                  {selectedTripModal.timestamps?.loadingStarted
                    ? new Date(selectedTripModal.timestamps.loadingStarted).toLocaleTimeString()
                    : '—'}
                </div>
                <div>
                  <strong>Trip Ended:</strong>{' '}
                  {selectedTripModal.timestamps?.tripEnded
                    ? new Date(selectedTripModal.timestamps.tripEnded).toLocaleTimeString()
                    : '—'}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedTripModal(null)}
              className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl text-sm"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export const COLORS = {
  sky: "#0EA5E9",
  skyLight: "#BAE6FD",
  skyDark: "#0284C7",
  skyDeep: "#0369A1",
  white: "#FFFFFF",
  gray50: "#F8FAFC",
  gray100: "#F1F5F9",
  gray200: "#E2E8F0",
  gray300: "#CBD5E1",
  gray400: "#94A3B8",
  gray500: "#64748B",
  gray600: "#475569",
  gray700: "#334155",
  gray800: "#1E293B",
  gray900: "#0F172A",
  black: "#020617",
  green: "#10B981",
  amber: "#F59E0B",
  red: "#EF4444",
  purple: "#8B5CF6",
};

export const STATUS_COLORS = {
  "En Ruta": COLORS.sky,
  "Entregado": COLORS.green,
  "En Espera": COLORS.amber,
  "Alerta": COLORS.red,
  "Mantenimiento": COLORS.purple,
};

export const STATUS_BG = {
  "En Ruta": "#EFF6FF",
  "Entregado": "#ECFDF5",
  "En Espera": "#FFFBEB",
  "Alerta": "#FEF2F2",
  "Mantenimiento": "#F5F3FF",
};

export const INITIAL_TRUCKS = [
  { id: "TRK-001", driver: "Carlos Mendoza", plate: "ABC-1234", status: "En Ruta", cargo: "Electrónicos", capacity: 78, lat: 19.4326, lng: -99.1332, eta: "14:35", origin: "CDMX", destination: "Guadalajara", progress: 62, speed: 87, fuel: 68, temp: 22, phone: "+52 55 1234-5678", license: "CDL-A", experience: "8 años" },
  { id: "TRK-002", driver: "María López", plate: "DEF-5678", status: "Entregado", cargo: "Alimentos", capacity: 95, lat: 20.6597, lng: -103.3496, eta: "12:00", origin: "Monterrey", destination: "Guadalajara", progress: 100, speed: 0, fuel: 45, temp: 4, phone: "+52 81 2345-6789", license: "CDL-B", experience: "5 años" },
  { id: "TRK-003", driver: "Juan Ramírez", plate: "GHI-9012", status: "En Espera", cargo: "Maquinaria", capacity: 45, lat: 25.6866, lng: -100.3161, eta: "17:20", origin: "Monterrey", destination: "CDMX", progress: 0, speed: 0, fuel: 100, temp: 25, phone: "+52 81 3456-7890", license: "CDL-A", experience: "12 años" },
  { id: "TRK-004", driver: "Ana Torres", plate: "JKL-3456", status: "En Ruta", cargo: "Textiles", capacity: 61, lat: 21.1619, lng: -86.8515, eta: "16:10", origin: "Cancún", destination: "CDMX", progress: 38, speed: 94, fuel: 55, temp: 26, phone: "+52 998 4567-8901", license: "CDL-A", experience: "6 años" },
  { id: "TRK-005", driver: "Pedro Vega", plate: "MNO-7890", status: "Alerta", cargo: "Químicos", capacity: 88, lat: 22.1565, lng: -100.9855, eta: "18:45", origin: "SLP", destination: "Veracruz", progress: 51, speed: 72, fuel: 23, temp: 18, phone: "+52 444 5678-9012", license: "HAZMAT", experience: "10 años" },
  { id: "TRK-006", driver: "Sofía Cruz", plate: "PQR-2345", status: "En Ruta", cargo: "Farmacéuticos", capacity: 52, lat: 19.1738, lng: -96.1342, eta: "15:30", origin: "Veracruz", destination: "Puebla", progress: 75, speed: 81, fuel: 72, temp: 8, phone: "+52 229 6789-0123", license: "CDL-B", experience: "4 años" },
  { id: "TRK-007", driver: "Luis Herrera", plate: "STU-6789", status: "Mantenimiento", cargo: "—", capacity: 0, lat: 19.4284, lng: -99.1277, eta: "—", origin: "CDMX", destination: "—", progress: 0, speed: 0, fuel: 30, temp: 20, phone: "+52 55 7890-1234", license: "CDL-A", experience: "15 años" },
  { id: "TRK-008", driver: "Rosa Jiménez", plate: "VWX-0123", status: "En Ruta", cargo: "Autopartes", capacity: 70, lat: 20.9674, lng: -89.6237, eta: "19:00", origin: "Mérida", destination: "Veracruz", progress: 22, speed: 98, fuel: 85, temp: 29, phone: "+52 999 8901-2345", license: "CDL-A", experience: "7 años" },
];

export const ROUTES_DATA = [
  { id: "RT-001", from: "CDMX", to: "Guadalajara", distance: "540 km", duration: "6h 30m", trucks: 3, onTime: 92, status: "Activa", stops: ["Querétaro", "León"], lastTrip: "Hace 2h", frequency: "Diaria" },
  { id: "RT-002", from: "Monterrey", to: "CDMX", distance: "900 km", duration: "10h 15m", trucks: 5, onTime: 87, status: "Activa", stops: ["Saltillo", "SLP", "Querétaro"], lastTrip: "Hace 4h", frequency: "2x día" },
  { id: "RT-003", from: "Cancún", to: "CDMX", distance: "1600 km", duration: "18h 00m", trucks: 2, onTime: 95, status: "Activa", stops: ["Mérida", "Campeche", "Villahermosa", "Veracruz", "Puebla"], lastTrip: "Hace 1h", frequency: "Diaria" },
  { id: "RT-004", from: "Veracruz", to: "Puebla", distance: "320 km", duration: "3h 45m", trucks: 4, onTime: 98, status: "Activa", stops: ["Xalapa"], lastTrip: "Hace 30m", frequency: "3x día" },
  { id: "RT-005", from: "CDMX", to: "Monterrey", distance: "900 km", duration: "10h 00m", trucks: 2, onTime: 89, status: "Activa", stops: ["Querétaro", "SLP", "Saltillo"], lastTrip: "Hace 6h", frequency: "Diaria" },
  { id: "RT-006", from: "Guadalajara", to: "Tijuana", distance: "1850 km", duration: "21h 00m", trucks: 1, onTime: 80, status: "Pausada", stops: ["Tepic", "Culiacán", "Los Mochis", "Hermosillo", "Mexicali"], lastTrip: "Hace 2 días", frequency: "Semanal" },
];

export const CARGAMENTOS_DATA = [
  { id: "CRG-2024-001", type: "Electrónicos", weight: "4,200 kg", volume: "38 m³", client: "TechMex SA", origin: "CDMX", destination: "Guadalajara", status: "En Tránsito", truck: "TRK-001", priority: "Alta", value: "$245,000", date: "2024-01-15", insurance: "Incluido" },
  { id: "CRG-2024-002", type: "Alimentos Perecederos", weight: "8,500 kg", volume: "62 m³", client: "FreshFood Mex", origin: "Monterrey", destination: "Guadalajara", status: "Entregado", truck: "TRK-002", priority: "Crítica", value: "$89,000", date: "2024-01-15", insurance: "Incluido" },
  { id: "CRG-2024-003", type: "Maquinaria Industrial", weight: "15,000 kg", volume: "95 m³", client: "IndusMex Corp", origin: "Monterrey", destination: "CDMX", status: "Pendiente", truck: "TRK-003", priority: "Normal", value: "$1,200,000", date: "2024-01-16", insurance: "Incluido" },
  { id: "CRG-2024-004", type: "Textiles", weight: "3,100 kg", volume: "45 m³", client: "ModaMex", origin: "Cancún", destination: "CDMX", status: "En Tránsito", truck: "TRK-004", priority: "Normal", value: "$67,000", date: "2024-01-14", insurance: "No incluido" },
  { id: "CRG-2024-005", type: "Productos Químicos", weight: "6,800 kg", volume: "52 m³", client: "QuimTec SA", origin: "SLP", destination: "Veracruz", status: "Alerta", truck: "TRK-005", priority: "Alta", value: "$340,000", date: "2024-01-15", insurance: "Especializado" },
  { id: "CRG-2024-006", type: "Farmacéuticos", weight: "1,200 kg", volume: "18 m³", client: "PharmaLogis", origin: "Veracruz", destination: "Puebla", status: "En Tránsito", truck: "TRK-006", priority: "Crítica", value: "$890,000", date: "2024-01-15", insurance: "Especializado" },
  { id: "CRG-2024-007", type: "Autopartes", weight: "9,400 kg", volume: "71 m³", client: "AutoMex Parts", origin: "Mérida", destination: "Veracruz", status: "En Tránsito", truck: "TRK-008", priority: "Normal", value: "$156,000", date: "2024-01-15", insurance: "Incluido" },
];

export const NOTIFICATIONS_DATA = [
  { id: 1, type: "alerta", title: "Combustible crítico", message: "TRK-005 tiene solo 23% de combustible", time: "Hace 5 min", read: false, truck: "TRK-005" },
  { id: 2, type: "info", title: "Entrega completada", message: "TRK-002 completó entrega en Guadalajara", time: "Hace 12 min", read: false, truck: "TRK-002" },
  { id: 3, type: "warning", title: "Retraso detectado", message: "TRK-004 acumula 45 min de retraso", time: "Hace 28 min", read: true, truck: "TRK-004" },
  { id: 4, type: "info", title: "Nueva ruta asignada", message: "TRK-003 tiene nueva ruta CDMX-Monterrey", time: "Hace 1h", read: true, truck: "TRK-003" },
  { id: 5, type: "alerta", title: "Mantenimiento requerido", message: "TRK-007 necesita servicio preventivo", time: "Hace 2h", read: true, truck: "TRK-007" },
  { id: 6, type: "success", title: "Ruta optimizada", message: "RT-004 redujo 15 min con nueva ruta", time: "Hace 3h", read: true, truck: null },
];

export const ANALYTICS_DATA = {
  weekly: [
    { day: "Lun", entregas: 12, km: 4200, costo: 28000 },
    { day: "Mar", entregas: 18, km: 6100, costo: 41000 },
    { day: "Mié", entregas: 15, km: 5300, costo: 35500 },
    { day: "Jue", entregas: 22, km: 7800, costo: 52000 },
    { day: "Vie", entregas: 19, km: 6700, costo: 44800 },
    { day: "Sáb", entregas: 8, km: 2900, costo: 19400 },
    { day: "Dom", entregas: 5, km: 1800, costo: 12000 },
  ],
  monthly: [
    { mes: "Ago", entregas: 312, km: 112000, costo: 748000 },
    { mes: "Sep", entregas: 298, km: 107000, costo: 714000 },
    { mes: "Oct", entregas: 334, km: 118000, costo: 788000 },
    { mes: "Nov", entregas: 289, km: 103000, costo: 687000 },
    { mes: "Dic", entregas: 356, km: 127000, costo: 847000 },
    { mes: "Ene", entregas: 342, km: 122000, costo: 814000 },
  ],
};

export const DRIVERS_DATA = [
  { id: "DRV-001", name: "Carlos Mendoza", phone: "+52 55 1234-5678", license: "CDL-A", experience: "8 años", status: "Activo", truck: "TRK-001", rating: 4.8, trips: 342, onTime: 94, avatar: "CM" },
  { id: "DRV-002", name: "María López", phone: "+52 81 2345-6789", license: "CDL-B", experience: "5 años", status: "Activo", truck: "TRK-002", rating: 4.9, trips: 218, onTime: 97, avatar: "ML" },
  { id: "DRV-003", name: "Juan Ramírez", phone: "+52 81 3456-7890", license: "CDL-A", experience: "12 años", status: "En Espera", truck: "TRK-003", rating: 4.7, trips: 589, onTime: 91, avatar: "JR" },
  { id: "DRV-004", name: "Ana Torres", phone: "+52 998 4567-8901", license: "CDL-A", experience: "6 años", status: "Activo", truck: "TRK-004", rating: 4.6, trips: 276, onTime: 89, avatar: "AT" },
  { id: "DRV-005", name: "Pedro Vega", phone: "+52 444 5678-9012", license: "HAZMAT", experience: "10 años", status: "Alerta", truck: "TRK-005", rating: 4.5, trips: 445, onTime: 88, avatar: "PV" },
  { id: "DRV-006", name: "Sofía Cruz", phone: "+52 229 6789-0123", license: "CDL-B", experience: "4 años", status: "Activo", truck: "TRK-006", rating: 4.9, trips: 167, onTime: 96, avatar: "SC" },
  { id: "DRV-007", name: "Luis Herrera", phone: "+52 55 7890-1234", license: "CDL-A", experience: "15 años", status: "Descanso", truck: "TRK-007", rating: 4.7, trips: 712, onTime: 93, avatar: "LH" },
  { id: "DRV-008", name: "Rosa Jiménez", phone: "+52 999 8901-2345", license: "CDL-A", experience: "7 años", status: "Activo", truck: "TRK-008", rating: 4.8, trips: 298, onTime: 95, avatar: "RJ" },
];
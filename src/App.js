import { useState, useEffect } from "react";
import { COLORS, INITIAL_TRUCKS } from "./data/mockData";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import AdminPanel from "./components/AdminPanel";
import DashboardView from "./views/DashboardView";
import TrackingView from "./views/TrackingView";
import CargamentosView from "./views/CargamentosView";
import RutasView from "./views/RutasView";
import AnalisisView from "./views/AnalisisView";
import ConductoresView from "./views/ConductoresView";
import ReportesView from "./views/ReportesView";
import ConfiguracionView from "./views/ConfiguracionView";

const PAGE_TITLES = {
  dashboard: "Dashboard",
  tracking: "Tracking en Tiempo Real",
  cargamentos: "Cargamentos",
  rutas: "Gestión de Rutas",
  conductores: "Conductores",
  analisis: "Análisis y Métricas",
  reportes: "Reportes",
  configuracion: "Configuración",
};

export default function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [trucks, setTrucks] = useState(INITIAL_TRUCKS);
  const [search, setSearch] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);

  // Simulate real-time truck updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrucks(prev => prev.map(t => ({
        ...t,
        speed: t.status === "En Ruta"
          ? Math.max(0, Math.min(120, t.speed + (Math.random() - 0.5) * 8))
          : t.speed,
        fuel: Math.max(0, t.fuel - (t.status === "En Ruta" ? 0.04 : 0)),
        progress: t.status === "En Ruta" ? Math.min(100, t.progress + 0.08) : t.progress,
        lat: t.status === "En Ruta" ? t.lat + (Math.random() - 0.5) * 0.008 : t.lat,
        lng: t.status === "En Ruta" ? t.lng + (Math.random() - 0.5) * 0.008 : t.lng,
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const trucksEnRuta = trucks.filter(t => t.status === "En Ruta").length;

  function renderView() {
    switch (activeNav) {
      case "dashboard":   return <DashboardView trucks={trucks} onNavigate={setActiveNav} />;
      case "tracking":    return <TrackingView trucks={trucks} search={search} />;
      case "cargamentos": return <CargamentosView search={search} />;
      case "rutas":       return <RutasView search={search} />;
      case "conductores": return <ConductoresView search={search} />;
      case "analisis":    return <AnalisisView />;
      case "reportes":    return <ReportesView search={search} />;
      case "configuracion": return <ConfiguracionView />;
      default: return <DashboardView trucks={trucks} onNavigate={setActiveNav} />;
    }
  }

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      width: "100%",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: COLORS.gray50,
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.gray200}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${COLORS.gray300}; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
        @keyframes ping { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(2.2); opacity: 0; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        input::placeholder { color: ${COLORS.gray300}; }
        @media (max-width: 768px) {
          .sidebar { display: none !important; }
          .main-content { width: 100% !important; }
        }
        button:hover { opacity: 0.88; }
      `}</style>

      {/* Sidebar with admin button */}
      <div style={{ position: "relative" }}>
        <Sidebar
          activeNav={activeNav}
          setActiveNav={(nav) => { setActiveNav(nav); setSearch(""); }}
          trucksEnRuta={trucksEnRuta}
        />
        {/* Admin panel trigger */}
        <button
          onClick={() => setShowAdmin(true)}
          title="Abrir panel de administrador"
          style={{
            position: "absolute",
            bottom: 72,
            left: "50%",
            transform: "translateX(-50%)",
            width: 36,
            height: 36,
            borderRadius: 10,
            background: `${COLORS.sky}22`,
            border: `1px solid ${COLORS.sky}44`,
            color: COLORS.sky,
            cursor: "pointer",
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >🔑</button>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar
          title={PAGE_TITLES[activeNav] || "Dashboard"}
          search={search}
          setSearch={setSearch}
        />

        <div style={{ flex: 1, overflow: "hidden", padding: "16px", display: "flex", flexDirection: "column" }}>
          {renderView()}
        </div>
      </div>

      {/* Admin Panel */}
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </div>
  );
}
import { COLORS } from "../data/mockData";

const NAV_ITEMS = [
  { icon: "📊", label: "Dashboard", id: "dashboard" },
  { icon: "🚛", label: "Tracking", id: "tracking" },
  { icon: "📦", label: "Cargamentos", id: "cargamentos" },
  { icon: "🗺️", label: "Rutas", id: "rutas" },
  { icon: "👥", label: "Conductores", id: "conductores" },
  { icon: "📈", label: "Análisis", id: "analisis" },
  { icon: "📋", label: "Reportes", id: "reportes" },
  { icon: "⚙️", label: "Configuración", id: "configuracion" },
];

export default function Sidebar({ activeNav, setActiveNav, trucksEnRuta }) {
  return (
    <div style={{
      width: 220,
      background: COLORS.gray900,
      display: "flex",
      flexDirection: "column",
      borderRight: `1px solid ${COLORS.gray800}`,
      flexShrink: 0,
      height: "100vh",
    }}>
      {/* Logo */}
      <div style={{ padding: "22px 20px 18px", borderBottom: `1px solid ${COLORS.gray800}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38,
            background: `linear-gradient(135deg, ${COLORS.sky}, ${COLORS.skyDark})`,
            borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18,
          }}>🚚</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: COLORS.white, letterSpacing: "-0.3px" }}>TransLogix</div>
            <div style={{ fontSize: 10, color: COLORS.gray500, fontWeight: 500, letterSpacing: "0.5px" }}>FLEET MANAGEMENT</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "12px", flex: 1, overflowY: "auto" }}>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 10,
              marginBottom: 2,
              cursor: "pointer",
              border: "none",
              textAlign: "left",
              background: activeNav === item.id
                ? `linear-gradient(90deg, ${COLORS.sky}22, ${COLORS.sky}08)`
                : "transparent",
              borderLeft: activeNav === item.id ? `2.5px solid ${COLORS.sky}` : "2.5px solid transparent",
              transition: "all 0.2s",
              fontFamily: "inherit",
            }}
          >
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            <span style={{
              fontSize: 13,
              fontWeight: activeNav === item.id ? 600 : 400,
              color: activeNav === item.id ? COLORS.sky : COLORS.gray400,
            }}>
              {item.label}
            </span>
            {item.id === "tracking" && trucksEnRuta > 0 && (
              <span style={{
                marginLeft: "auto",
                background: COLORS.sky,
                color: COLORS.white,
                fontSize: 10,
                fontWeight: 700,
                borderRadius: 8,
                padding: "2px 7px",
              }}>{trucksEnRuta}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "8px 12px", borderTop: `1px solid ${COLORS.gray800}` }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 12px",
          borderRadius: 10,
          background: `${COLORS.sky}10`,
          border: `1px solid ${COLORS.sky}22`,
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: `linear-gradient(135deg, ${COLORS.sky}, ${COLORS.skyDark})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 800, color: COLORS.white,
          }}>AD</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.white }}>Admin</div>
            <div style={{ fontSize: 10, color: COLORS.gray400 }}>Operaciones</div>
          </div>
          <button
            style={{
              marginLeft: "auto", background: "none", border: "none",
              color: COLORS.gray500, cursor: "pointer", fontSize: 14,
              padding: 4, borderRadius: 6,
            }}
            title="Panel de Admin"
          >⚙</button>
        </div>
      </div>
    </div>
  );
}
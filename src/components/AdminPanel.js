import { useState } from "react";
import { COLORS, INITIAL_TRUCKS, DRIVERS_DATA } from "../data/mockData";
import { Avatar, ProgressBar } from "../components/UI";

const ADMIN_TABS = [
  { id: "overview", label: "📊 General" },
  { id: "users", label: "👤 Usuarios" },
  { id: "fleet", label: "🚛 Flota" },
  { id: "logs", label: "📋 Logs" },
  { id: "billing", label: "💰 Facturación" },
];

const LOGS = [
  { time: "14:32:11", user: "admin", action: "Actualizó ruta RT-003", level: "info" },
  { time: "14:28:45", user: "admin", action: "Asignó TRK-001 a conductor Carlos M.", level: "info" },
  { time: "14:15:22", user: "sistema", action: "⚠️ Alerta combustible TRK-005", level: "warn" },
  { time: "13:58:03", user: "admin", action: "Generó reporte RPT-005", level: "info" },
  { time: "13:45:17", user: "sistema", action: "TRK-002 completó entrega en Guadalajara", level: "success" },
  { time: "13:30:00", user: "admin", action: "Inicio de sesión desde 192.168.1.45", level: "info" },
  { time: "12:55:44", user: "sistema", action: "🔧 TRK-007 enviado a mantenimiento", level: "warn" },
  { time: "12:40:10", user: "admin", action: "Creó cargamento CRG-2024-007", level: "info" },
];

const LOG_COLORS = { info: COLORS.sky, warn: COLORS.amber, success: COLORS.green, error: COLORS.red };
const LOG_BG = { info: "#EFF6FF", warn: "#FFFBEB", success: "#ECFDF5", error: "#FEF2F2" };

const USERS = [
  { id: 1, name: "Administrador Principal", email: "admin@translogix.mx", role: "Admin", status: "Activo", lastLogin: "Hace 5 min", avatar: "AD" },
  { id: 2, name: "Supervisor Operaciones", email: "supervisor@translogix.mx", role: "Supervisor", status: "Activo", lastLogin: "Hace 2h", avatar: "SO" },
  { id: 3, name: "Analista de Flota", email: "analista@translogix.mx", role: "Viewer", status: "Activo", lastLogin: "Ayer", avatar: "AF" },
  { id: 4, name: "Control de Calidad", email: "calidad@translogix.mx", role: "Viewer", status: "Inactivo", lastLogin: "Hace 3 días", avatar: "CC" },
];

export default function AdminPanel({ onClose }) {
  const [tab, setTab] = useState("overview");

  const systemStats = [
    { label: "Uptime del sistema", val: "99.8%", color: COLORS.green },
    { label: "Peticiones/hora", val: "12,450", color: COLORS.sky },
    { label: "Almacenamiento", val: "68%", color: COLORS.amber },
    { label: "Usuarios activos", val: "3", color: COLORS.sky },
  ];

  const renderContent = () => {
    switch (tab) {
      case "overview":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {systemStats.map(s => (
                <div key={s.label} style={{ background: COLORS.gray50, borderRadius: 12, padding: "14px 16px" }}>
                  <div style={{ fontSize: 11, color: COLORS.gray500 }}>{s.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: s.color, marginTop: 4 }}>{s.val}</div>
                </div>
              ))}
            </div>
            <div style={{ background: COLORS.gray50, borderRadius: 12, padding: "16px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.gray800, marginBottom: 12 }}>💻 Estado del servidor</div>
              {[["CPU", 34], ["Memoria RAM", 58], ["Disco", 42]].map(([k, v]) => (
                <div key={k} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 12, color: COLORS.gray600 }}>{k}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: v > 80 ? COLORS.red : v > 60 ? COLORS.amber : COLORS.green }}>{v}%</span>
                  </div>
                  <ProgressBar value={v} color={v > 80 ? COLORS.red : v > 60 ? COLORS.amber : COLORS.green} height={6} />
                </div>
              ))}
            </div>
            <div style={{ background: COLORS.gray50, borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.gray800, marginBottom: 10 }}>📦 Resumen del sistema</div>
              {[
                ["Versión", "TransLogix v2.4.1"],
                ["Base de datos", "PostgreSQL 15 · Online"],
                ["Última actualización", "15 Ene 2024 10:30"],
                ["Ambiente", "Producción"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${COLORS.gray200}` }}>
                  <span style={{ fontSize: 12, color: COLORS.gray500 }}>{k}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.gray800 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "users":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button style={{ padding: "8px 16px", borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.sky}, ${COLORS.skyDark})`, border: "none", color: COLORS.white, fontWeight: 600, cursor: "pointer", fontSize: 12, fontFamily: "inherit", alignSelf: "flex-start" }}>
              ➕ Nuevo usuario
            </button>
            {USERS.map(u => (
              <div key={u.id} style={{ background: COLORS.gray50, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.sky}, ${COLORS.skyDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: COLORS.white, flexShrink: 0 }}>
                  {u.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.gray900 }}>{u.name}</div>
                  <div style={{ fontSize: 11, color: COLORS.gray400 }}>{u.email} · {u.lastLogin}</div>
                </div>
                <span style={{ fontSize: 10, padding: "3px 9px", borderRadius: 8, background: u.role === "Admin" ? `${COLORS.sky}15` : COLORS.gray100, color: u.role === "Admin" ? COLORS.sky : COLORS.gray500, fontWeight: 600 }}>
                  {u.role}
                </span>
                <span style={{ fontSize: 10, padding: "3px 9px", borderRadius: 8, background: u.status === "Activo" ? "#ECFDF5" : COLORS.gray100, color: u.status === "Activo" ? COLORS.green : COLORS.gray400, fontWeight: 600 }}>
                  {u.status}
                </span>
                <button style={{ padding: "5px 10px", borderRadius: 7, background: COLORS.white, border: `1px solid ${COLORS.gray200}`, fontSize: 11, cursor: "pointer", color: COLORS.gray500, fontFamily: "inherit" }}>✏️</button>
              </div>
            ))}
          </div>
        );

      case "fleet":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {INITIAL_TRUCKS.map(t => (
              <div key={t.id} style={{ background: COLORS.gray50, borderRadius: 12, padding: "13px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.gray900 }}>{t.id} · {t.plate}</div>
                    <div style={{ fontSize: 11, color: COLORS.gray400 }}>{t.driver} · {t.cargo}</div>
                  </div>
                  <span style={{ fontSize: 10, padding: "3px 9px", borderRadius: 8, background: t.status === "En Ruta" ? "#EFF6FF" : t.status === "Alerta" ? "#FEF2F2" : COLORS.gray100, color: t.status === "En Ruta" ? COLORS.sky : t.status === "Alerta" ? COLORS.red : COLORS.gray500, fontWeight: 600 }}>
                    {t.status}
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {[["⚡", "Velocidad", `${Math.round(t.speed)} km/h`], ["⛽", "Combustible", `${Math.round(t.fuel)}%`], ["📦", "Carga", `${t.capacity}%`]].map(([ico, k, v]) => (
                    <div key={k} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: COLORS.gray400 }}>{ico} {k}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.gray800 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case "logs":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {LOGS.map((log, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 12px", background: COLORS.gray50, borderRadius: 10, borderLeft: `3px solid ${LOG_COLORS[log.level]}` }}>
                <span style={{ fontSize: 10, color: COLORS.gray400, fontFamily: "monospace", flexShrink: 0 }}>{log.time}</span>
                <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 6, background: LOG_BG[log.level], color: LOG_COLORS[log.level], fontWeight: 700, flexShrink: 0 }}>{log.user}</span>
                <span style={{ fontSize: 12, color: COLORS.gray700, flex: 1 }}>{log.action}</span>
              </div>
            ))}
          </div>
        );

      case "billing":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: `linear-gradient(135deg, ${COLORS.skyDeep}, ${COLORS.sky})`, borderRadius: 14, padding: "20px", color: COLORS.white }}>
              <div style={{ fontSize: 12, opacity: 0.8 }}>Plan actual</div>
              <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>Enterprise</div>
              <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>Flota ilimitada · Soporte 24/7 · API incluida</div>
              <div style={{ fontSize: 12, opacity: 0.65, marginTop: 8 }}>Próxima factura: 1 Feb 2024 · $8,500 MXN/mes</div>
            </div>
            {[
              ["15 Ene 2024", "$8,500", "Pagado"],
              ["15 Dic 2023", "$8,500", "Pagado"],
              ["15 Nov 2023", "$8,500", "Pagado"],
            ].map(([fecha, monto, estado]) => (
              <div key={fecha} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: COLORS.gray50, borderRadius: 10 }}>
                <div style={{ fontSize: 13, color: COLORS.gray700 }}>{fecha}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.gray900 }}>{monto}</div>
                <span style={{ fontSize: 11, background: "#ECFDF5", color: COLORS.green, padding: "3px 10px", borderRadius: 8, fontWeight: 600 }}>{estado}</span>
                <button style={{ padding: "5px 10px", borderRadius: 7, background: COLORS.white, border: `1px solid ${COLORS.gray200}`, fontSize: 11, cursor: "pointer", color: COLORS.sky, fontFamily: "inherit" }}>⬇️ PDF</button>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 2000, display: "flex", alignItems: "flex-start", justifyContent: "flex-end", backdropFilter: "blur(4px)" }}>
      <div style={{
        width: 480, height: "100vh",
        background: COLORS.white,
        boxShadow: "-20px 0 60px rgba(0,0,0,0.2)",
        display: "flex", flexDirection: "column",
        animation: "slideInRight 0.25s ease",
      }}>
        {/* Header */}
        <div style={{ background: `linear-gradient(135deg, ${COLORS.gray900}, ${COLORS.gray800})`, padding: "22px 24px", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.white }}>⚙️ Panel de Administrador</div>
              <div style={{ fontSize: 12, color: COLORS.gray400, marginTop: 4 }}>Gestión del sistema TransLogix</div>
            </div>
            <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", color: COLORS.white, fontSize: 14 }}>✕</button>
          </div>

          {/* Admin user info */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16, padding: "12px", background: "rgba(255,255,255,0.08)", borderRadius: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.sky}, ${COLORS.skyDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: COLORS.white }}>AD</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.white }}>Administrador</div>
              <div style={{ fontSize: 11, color: COLORS.gray400 }}>admin@translogix.mx · Acceso total</div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.green }} />
              <span style={{ fontSize: 10, color: COLORS.green }}>Activo</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid ${COLORS.gray100}`, flexShrink: 0 }}>
          {ADMIN_TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, padding: "12px 6px", fontSize: 10, fontWeight: tab === t.id ? 700 : 400,
              color: tab === t.id ? COLORS.sky : COLORS.gray400,
              background: "none", border: "none", cursor: "pointer",
              borderBottom: tab === t.id ? `2px solid ${COLORS.sky}` : "2px solid transparent",
              fontFamily: "inherit",
            }}>{t.label}</button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "18px 20px" }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
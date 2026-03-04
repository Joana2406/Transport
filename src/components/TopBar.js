import { useState, useRef, useEffect } from "react";
import { COLORS, NOTIFICATIONS_DATA } from "../data/mockData";

const NOTIF_ICONS = {
  alerta: "🚨",
  warning: "⚠️",
  info: "ℹ️",
  success: "✅",
};

const NOTIF_COLORS = {
  alerta: COLORS.red,
  warning: COLORS.amber,
  info: COLORS.sky,
  success: COLORS.green,
};

export default function TopBar({ title, subtitle, search, setSearch, onNotifClick, notifications, onNavigate }) {
  const [showNotif, setShowNotif] = useState(false);
  const [notifs, setNotifs] = useState(notifications || NOTIFICATIONS_DATA);
  const [time, setTime] = useState(new Date());
  const notifRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const unread = notifs.filter(n => !n.read).length;

  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  }

  function markRead(id) {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  return (
    <div style={{
      background: COLORS.white,
      borderBottom: `1px solid ${COLORS.gray100}`,
      padding: "0 28px",
      height: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexShrink: 0,
      position: "relative",
      zIndex: 100,
    }}>
      {/* Left */}
      <div>
        <h1 style={{ fontSize: 19, fontWeight: 800, color: COLORS.gray900, margin: 0 }}>{title}</h1>
        <p style={{ fontSize: 11, color: COLORS.gray400, margin: 0 }}>
          {time.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" })} — {time.toLocaleTimeString("es-MX")}
        </p>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar vehículo, conductor, carga..."
            style={{
              width: 280,
              padding: "8px 12px 8px 36px",
              border: `1px solid ${search ? COLORS.sky : COLORS.gray200}`,
              borderRadius: 10,
              fontSize: 13,
              color: COLORS.gray700,
              outline: "none",
              background: COLORS.gray50,
              transition: "border 0.2s",
              fontFamily: "inherit",
            }}
          />
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, pointerEvents: "none" }}>🔍</span>
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                background: COLORS.gray200, border: "none", borderRadius: "50%",
                width: 18, height: 18, cursor: "pointer", fontSize: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: COLORS.gray600,
              }}
            >✕</button>
          )}
        </div>

        {/* Notifications bell */}
        <div ref={notifRef} style={{ position: "relative" }}>
          <button
            onClick={() => setShowNotif(v => !v)}
            style={{
              width: 40, height: 40, borderRadius: 10,
              background: showNotif ? `${COLORS.sky}15` : COLORS.gray50,
              border: `1px solid ${showNotif ? COLORS.sky : COLORS.gray200}`,
              cursor: "pointer", fontSize: 17,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}
          >🔔</button>
          {unread > 0 && (
            <div style={{
              position: "absolute", top: -4, right: -4,
              background: COLORS.red, color: COLORS.white,
              width: 18, height: 18, borderRadius: "50%",
              fontSize: 10, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `2px solid ${COLORS.white}`,
              animation: "pulse 2s infinite",
            }}>{unread}</div>
          )}

          {/* Dropdown */}
          {showNotif && (
            <div style={{
              position: "absolute", top: 50, right: 0,
              width: 360,
              background: COLORS.white,
              border: `1px solid ${COLORS.gray200}`,
              borderRadius: 16,
              boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
              zIndex: 999,
              overflow: "hidden",
              animation: "slideDown 0.2s ease",
            }}>
              {/* Header */}
              <div style={{
                padding: "14px 18px",
                borderBottom: `1px solid ${COLORS.gray100}`,
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.gray900 }}>
                  Notificaciones {unread > 0 && <span style={{ background: COLORS.red, color: COLORS.white, fontSize: 10, borderRadius: 8, padding: "2px 6px", marginLeft: 6 }}>{unread} nuevas</span>}
                </div>
                {unread > 0 && (
                  <button onClick={markAllRead} style={{ fontSize: 11, color: COLORS.sky, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                    Marcar todas leídas
                  </button>
                )}
              </div>

              {/* List */}
              <div style={{ maxHeight: 380, overflowY: "auto" }}>
                {notifs.map(n => (
                  <div
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    style={{
                      padding: "12px 18px",
                      borderBottom: `1px solid ${COLORS.gray50}`,
                      background: n.read ? COLORS.white : `${NOTIF_COLORS[n.type]}06`,
                      cursor: "pointer",
                      transition: "background 0.15s",
                      display: "flex", gap: 12, alignItems: "flex-start",
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      background: `${NOTIF_COLORS[n.type]}15`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 16,
                    }}>{NOTIF_ICONS[n.type]}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.gray900 }}>{n.title}</div>
                        {!n.read && <div style={{ width: 7, height: 7, borderRadius: "50%", background: COLORS.sky, flexShrink: 0 }} />}
                      </div>
                      <div style={{ fontSize: 12, color: COLORS.gray500, marginTop: 2 }}>{n.message}</div>
                      <div style={{ fontSize: 11, color: COLORS.gray400, marginTop: 4 }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div style={{ padding: "10px 18px", borderTop: `1px solid ${COLORS.gray100}`, textAlign: "center" }}>
                <button style={{ fontSize: 12, color: COLORS.sky, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  Ver todas las notificaciones →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
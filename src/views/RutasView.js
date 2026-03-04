import { useState } from "react";
import { COLORS, ROUTES_DATA } from "../data/mockData";
import { ProgressBar } from "../components/UI";

const EMPTY_ROUTE = {
  from: "", to: "", distance: "", duration: "",
  frequency: "Diaria", status: "Activa", trucks: 0,
  onTime: 100, stops: [], lastTrip: "Recién creada",
};

/* ── Modal nueva ruta ── */
function NewRouteModal({ onClose, onSave }) {
  const [form, setForm] = useState({ ...EMPTY_ROUTE });
  const [stopInput, setStopInput] = useState("");
  const [errors, setErrors] = useState({});

  const set = (f, v) => { setForm(p => ({ ...p, [f]: v })); setErrors(p => ({ ...p, [f]: "" })); };

  function addStop() {
    const s = stopInput.trim();
    if (s && !form.stops.includes(s)) {
      setForm(p => ({ ...p, stops: [...p.stops, s] }));
      setStopInput("");
    }
  }
  function removeStop(s) { setForm(p => ({ ...p, stops: p.stops.filter(x => x !== s) })); }

  function submit() {
    const e = {};
    if (!form.from.trim())     e.from     = "Requerido";
    if (!form.to.trim())       e.to       = "Requerido";
    if (!form.distance.trim()) e.distance = "Requerido";
    if (!form.duration.trim()) e.duration = "Requerido";
    if (Object.keys(e).length) { setErrors(e); return; }
    const id = `RT-${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`;
    onSave({ ...form, id });
    onClose();
  }

  const inp = (f) => ({
    width: "100%", padding: "9px 12px",
    border: `1px solid ${errors[f] ? COLORS.red : COLORS.gray200}`,
    borderRadius: 10, fontSize: 13, color: COLORS.gray700, outline: "none",
    background: COLORS.gray50, fontFamily: "inherit", boxSizing: "border-box",
  });
  const lbl = { fontSize: 11, fontWeight: 600, color: COLORS.gray500, marginBottom: 5, display: "block" };
  const err = (f) => errors[f] && <div style={{ fontSize: 11, color: COLORS.red, marginTop: 3 }}>{errors[f]}</div>;

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(4px)", padding: 16 }}>
      <div style={{ background: COLORS.white, borderRadius: 20, width: "100%", maxWidth: 540,
        maxHeight: "92vh", overflow: "auto", boxShadow: "0 30px 80px rgba(0,0,0,0.2)",
        animation: "slideDown .2s ease" }}>

        {/* Header */}
        <div style={{ background: `linear-gradient(135deg,${COLORS.skyDeep},${COLORS.sky})`,
          padding: "22px 24px", color: COLORS.white,
          display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>➕ Nueva Ruta</div>
            <div style={{ fontSize: 12, opacity: .8, marginTop: 3 }}>Configura los datos de la ruta</div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,.2)", border: "none",
            borderRadius: 8, width: 32, height: 32, cursor: "pointer", color: COLORS.white, fontSize: 14 }}>✕</button>
        </div>

        <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Origen / Destino */}
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.gray700 }}>📍 Origen y Destino</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={lbl}>Ciudad de origen *</label>
              <input style={inp("from")} value={form.from} onChange={e => set("from", e.target.value)} placeholder="Ej. CDMX" />{err("from")}
            </div>
            <div>
              <label style={lbl}>Ciudad de destino *</label>
              <input style={inp("to")} value={form.to} onChange={e => set("to", e.target.value)} placeholder="Ej. Guadalajara" />{err("to")}
            </div>
            <div>
              <label style={lbl}>Distancia *</label>
              <input style={inp("distance")} value={form.distance} onChange={e => set("distance", e.target.value)} placeholder="Ej. 540 km" />{err("distance")}
            </div>
            <div>
              <label style={lbl}>Duración estimada *</label>
              <input style={inp("duration")} value={form.duration} onChange={e => set("duration", e.target.value)} placeholder="Ej. 6h 30m" />{err("duration")}
            </div>
          </div>

          {/* Configuración */}
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.gray700 }}>⚙️ Configuración</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={lbl}>Frecuencia</label>
              <select style={{ ...inp("frequency"), background: COLORS.white }} value={form.frequency} onChange={e => set("frequency", e.target.value)}>
                {["Diaria", "2x día", "3x día", "Semanal", "Bajo demanda"].map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Estado inicial</label>
              <select style={{ ...inp("status"), background: COLORS.white }} value={form.status} onChange={e => set("status", e.target.value)}>
                {["Activa", "Pausada"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Paradas intermedias */}
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.gray700 }}>📌 Paradas intermedias</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              style={{ ...inp(""), flex: 1 }}
              value={stopInput}
              onChange={e => setStopInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addStop()}
              placeholder="Ej. Querétaro"
            />
            <button onClick={addStop} style={{
              padding: "9px 16px", borderRadius: 10,
              background: `${COLORS.sky}15`, border: `1px solid ${COLORS.sky}33`,
              color: COLORS.sky, fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: "inherit",
            }}>+ Añadir</button>
          </div>
          {form.stops.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {form.stops.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6,
                  background: `${COLORS.sky}10`, border: `1px solid ${COLORS.sky}30`,
                  borderRadius: 20, padding: "4px 12px" }}>
                  <span style={{ fontSize: 12, color: COLORS.sky, fontWeight: 600 }}>📍 {s}</span>
                  <button onClick={() => removeStop(s)} style={{
                    background: "none", border: "none", color: COLORS.sky,
                    cursor: "pointer", fontSize: 13, lineHeight: 1, padding: 0 }}>✕</button>
                </div>
              ))}
            </div>
          )}

          {/* Acciones */}
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <button onClick={submit} style={{ flex: 1, padding: 12, borderRadius: 12,
              background: `linear-gradient(135deg,${COLORS.sky},${COLORS.skyDark})`,
              border: "none", color: COLORS.white, fontWeight: 700,
              cursor: "pointer", fontSize: 14, fontFamily: "inherit",
              boxShadow: `0 4px 14px ${COLORS.sky}44` }}>✅ Crear Ruta</button>
            <button onClick={onClose} style={{ padding: "12px 18px", borderRadius: 12,
              background: COLORS.gray50, border: `1px solid ${COLORS.gray200}`,
              color: COLORS.gray600, fontWeight: 600, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Panel detalle de ruta ── */
function RouteDetail({ route, onEdit }) {
  if (!route) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", height: "100%", color: COLORS.gray300, padding: 24, textAlign: "center" }}>
      <div style={{ fontSize: 52 }}>🗺️</div>
      <div style={{ fontSize: 14, fontWeight: 600, marginTop: 12 }}>Selecciona una ruta</div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ background: `linear-gradient(135deg,${COLORS.skyDeep},${COLORS.sky})`,
        borderRadius: 14, padding: "18px 20px", color: COLORS.white }}>
        <div style={{ fontSize: 11, opacity: .7, marginBottom: 4 }}>{route.id}</div>
        <div style={{ fontSize: 20, fontWeight: 800 }}>{route.from} → {route.to}</div>
        <div style={{ display: "flex", gap: 18, marginTop: 12, flexWrap: "wrap" }}>
          {[["Distancia", route.distance], ["Duración", route.duration], ["Frecuencia", route.frequency]].map(([k, v]) => (
            <div key={k}><div style={{ fontSize: 10, opacity: .7 }}>{k}</div><div style={{ fontSize: 13, fontWeight: 700 }}>{v}</div></div>
          ))}
        </div>
      </div>

      {/* Paradas */}
      <div style={{ background: COLORS.white, border: `1px solid ${COLORS.gray100}`, borderRadius: 12, padding: "14px 16px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.gray700, marginBottom: 12 }}>📍 Paradas</div>
        {[route.from, ...route.stops, route.to].map((stop, i, arr) => (
          <div key={stop + i}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
                background: i === 0 ? COLORS.green : i === arr.length - 1 ? COLORS.red : COLORS.sky,
                border: `2px solid white`,
                boxShadow: `0 0 0 2px ${i === 0 ? COLORS.green : i === arr.length - 1 ? COLORS.red : COLORS.sky}`,
              }} />
              <span style={{ fontSize: 13, fontWeight: i === 0 || i === arr.length - 1 ? 700 : 400, color: COLORS.gray800 }}>{stop}</span>
              {i === 0 && <span style={{ fontSize: 10, background: "#ECFDF5", color: COLORS.green, padding: "2px 8px", borderRadius: 8, fontWeight: 600 }}>Origen</span>}
              {i === arr.length - 1 && <span style={{ fontSize: 10, background: "#FEF2F2", color: COLORS.red, padding: "2px 8px", borderRadius: 8, fontWeight: 600 }}>Destino</span>}
            </div>
            {i < arr.length - 1 && <div style={{ width: 2, height: 14, background: COLORS.gray200, marginLeft: 4, marginBottom: 0 }} />}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[["🚛 Activos", route.trucks], ["✅ Puntualidad", `${route.onTime}%`], ["🔄 Frecuencia", route.frequency], ["🕐 Último viaje", route.lastTrip]].map(([k, v]) => (
          <div key={k} style={{ background: COLORS.gray50, borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 10, color: COLORS.gray400 }}>{k}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.gray900, marginTop: 2 }}>{v}</div>
          </div>
        ))}
      </div>

      <button style={{ padding: 11, borderRadius: 12,
        background: `linear-gradient(135deg,${COLORS.sky},${COLORS.skyDark})`,
        border: "none", color: COLORS.white, fontWeight: 600,
        cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>✏️ Editar Ruta</button>
    </div>
  );
}

/* ── Tarjeta de ruta ── */
function RouteCard({ route, selected, onClick }) {
  const isActive = route.status === "Activa";
  return (
    <div onClick={onClick} style={{
      background: selected ? `linear-gradient(135deg,${COLORS.sky}08,${COLORS.skyDeep}05)` : COLORS.white,
      border: selected ? `1.5px solid ${COLORS.sky}` : `1px solid ${COLORS.gray100}`,
      borderRadius: 14, padding: "16px 18px", cursor: "pointer",
      transition: "all .2s", boxShadow: selected ? `0 4px 20px ${COLORS.sky}22` : "none",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.gray900 }}>{route.from} → {route.to}</div>
          <div style={{ fontSize: 11, color: COLORS.gray500, marginTop: 2 }}>{route.id}</div>
        </div>
        <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
          background: isActive ? "#ECFDF5" : "#FEF3C7",
          color: isActive ? COLORS.green : COLORS.amber }}>{route.status}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        {[["📏", route.distance], ["⏱️", route.duration], ["🚛", `${route.trucks} camiones`], ["📊", `${route.onTime}%`]].map(([ico, v]) => (
          <div key={v} style={{ background: COLORS.gray50, borderRadius: 8, padding: "7px 10px" }}>
            <div style={{ fontSize: 12, color: COLORS.gray600 }}>{ico} {v}</div>
          </div>
        ))}
      </div>
      <ProgressBar value={route.onTime} color={route.onTime > 90 ? COLORS.green : route.onTime > 80 ? COLORS.amber : COLORS.red} height={5} />
    </div>
  );
}

/* ── Vista principal ── */
export default function RutasView({ search }) {
  const [routes, setRoutes] = useState(ROUTES_DATA);
  const [selected, setSelected] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [filterStatus, setFilterStatus] = useState("Todas");

  const filtered = routes.filter(r => {
    const q = search.toLowerCase();
    const ok = !q || r.id.toLowerCase().includes(q) || r.from.toLowerCase().includes(q) || r.to.toLowerCase().includes(q);
    return ok && (filterStatus === "Todas" || r.status === filterStatus);
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, height: "100%", overflow: "hidden" }}>
      {showNew && <NewRouteModal onClose={() => setShowNew(false)} onSave={nr => setRoutes(p => [nr, ...p])} />}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, flexShrink: 0 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: COLORS.gray900, margin: 0 }}>🗺️ Rutas</h2>
          <p style={{ fontSize: 13, color: COLORS.gray500, marginTop: 4 }}>{routes.length} rutas · {routes.filter(r => r.status === "Activa").length} activas</p>
        </div>
        <button onClick={() => setShowNew(true)} style={{
          background: `linear-gradient(135deg,${COLORS.sky},${COLORS.skyDark})`,
          color: COLORS.white, border: "none", borderRadius: 10,
          padding: "10px 18px", fontSize: 13, fontWeight: 700,
          cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
          boxShadow: `0 4px 12px ${COLORS.sky}44`, fontFamily: "inherit" }}>
          ➕ Nueva Ruta
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", flexShrink: 0 }}>
        {[
          { label: "Total rutas",     val: routes.length,                                      color: COLORS.sky },
          { label: "Activas",         val: routes.filter(r => r.status === "Activa").length,  color: COLORS.green },
          { label: "Km totales/día",  val: "8,850",                                            color: COLORS.sky },
          { label: "Puntualidad avg", val: `${Math.round(routes.reduce((s,r)=>s+r.onTime,0)/routes.length)}%`, color: COLORS.amber },
        ].map(s => (
          <div key={s.label} style={{ flex: "1 1 110px", minWidth: 100,
            background: COLORS.white, border: `1px solid ${COLORS.gray100}`,
            borderRadius: 14, padding: "13px 16px" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 11, color: COLORS.gray500, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div style={{ display: "flex", gap: 6, flexShrink: 0, flexWrap: "wrap" }}>
        {["Todas", "Activa", "Pausada"].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)} style={{
            padding: "6px 14px", borderRadius: 20, fontSize: 11, fontWeight: 600,
            cursor: "pointer", border: "none",
            background: filterStatus === s ? COLORS.sky : COLORS.gray100,
            color: filterStatus === s ? COLORS.white : COLORS.gray500,
            fontFamily: "inherit" }}>{s}</button>
        ))}
      </div>

      {/* Contenido principal — responsive: columna en móvil, dos columnas en pantalla grande */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 20, overflow: "hidden", minHeight: 0 }}>
        {/* Lista de rutas */}
        <div style={{ overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14, alignContent: "start", paddingBottom: 20 }}>
          {filtered.map(route => (
            <RouteCard key={route.id} route={route} selected={selected?.id === route.id}
              onClick={() => setSelected(selected?.id === route.id ? null : route)} />
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 50, color: COLORS.gray300 }}>
              <div style={{ fontSize: 44 }}>🗺️</div>
              <div style={{ fontSize: 14, marginTop: 10, fontWeight: 500 }}>Sin rutas</div>
              <button onClick={() => setShowNew(true)} style={{
                marginTop: 14, padding: "10px 20px", borderRadius: 10,
                background: `linear-gradient(135deg,${COLORS.sky},${COLORS.skyDark})`,
                border: "none", color: COLORS.white, fontWeight: 600,
                cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>➕ Crear ruta</button>
            </div>
          )}
        </div>

        {/* Panel detalle */}
        <div style={{ background: COLORS.white, border: `1px solid ${COLORS.gray100}`, borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "13px 16px", borderBottom: `1px solid ${COLORS.gray100}`, flexShrink: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.gray800 }}>📋 Detalle de Ruta</div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
            <RouteDetail route={selected} />
          </div>
        </div>
      </div>
    </div>
  );
}
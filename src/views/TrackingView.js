import { useState, useEffect } from "react";
import { COLORS, STATUS_COLORS } from "../data/mockData";
import { ProgressBar } from "../components/UI";

/* ─── Hook: ancho de ventana ─────────────────────────────────────────────── */
function useWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

/* ─── Mapa simulado ──────────────────────────────────────────────────────── */
function MapView({ trucks, selectedTruck, onSelect }) {
  const pts = trucks.map(t => ({
    ...t,
    x: Math.max(5, Math.min(93, ((t.lng + 118) / 30) * 100)),
    y: Math.max(5, Math.min(93, ((32 - t.lat)  / 18) * 100)),
  }));

  return (
    <div style={{
      position: "relative", width: "100%", height: "100%", minHeight: 200,
      background: "linear-gradient(160deg,#0F172A 0%,#1a2744 50%,#0F172A 100%)",
      borderRadius: 12, overflow: "hidden",
    }}>
      {/* grid */}
      <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",opacity:.08 }}>
        {[...Array(12)].map((_,i)=>(
          <g key={i}>
            <line x1={`${i*9}%`} y1="0"   x2={`${i*9}%`} y2="100%" stroke={COLORS.sky} strokeWidth=".5"/>
            <line x1="0"   y1={`${i*9}%`} x2="100%" y2={`${i*9}%`} stroke={COLORS.sky} strokeWidth=".5"/>
          </g>
        ))}
      </svg>

      {/* silueta de territorio */}
      <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%" }}>
        <ellipse cx="48%" cy="55%" rx="34%" ry="26%" fill={`${COLORS.sky}08`} stroke={`${COLORS.sky}18`} strokeWidth="1"/>
        <ellipse cx="22%" cy="48%" rx="8%"  ry="6%"  fill={`${COLORS.sky}06`} stroke={`${COLORS.sky}12`} strokeWidth=".5"/>
      </svg>

      {/* líneas de ruta */}
      <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%" }}>
        <defs>
          <linearGradient id="rl" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={COLORS.sky} stopOpacity="0"/>
            <stop offset="50%"  stopColor={COLORS.sky} stopOpacity=".4"/>
            <stop offset="100%" stopColor={COLORS.sky} stopOpacity="0"/>
          </linearGradient>
        </defs>
        {pts.filter(t=>t.status==="En Ruta").map((p,i,arr)=>
          arr.slice(i+1).map((q,j)=>(
            <line key={`${i}-${j}`} x1={`${p.x}%`} y1={`${p.y}%`}
              x2={`${q.x}%`} y2={`${q.y}%`}
              stroke="url(#rl)" strokeWidth="1" strokeDasharray="6 4"/>
          ))
        )}
      </svg>

      {/* puntos de camiones */}
      {pts.map(t=>(
        <div key={t.id} onClick={()=>onSelect(t)}
          style={{ position:"absolute", left:`${t.x}%`, top:`${t.y}%`,
            transform:"translate(-50%,-50%)", cursor:"pointer",
            zIndex: selectedTruck?.id===t.id ? 10 : 5 }}>
          {selectedTruck?.id===t.id && (
            <div style={{ position:"absolute", inset:-14,
              background:`${STATUS_COLORS[t.status]}18`,
              border:`1.5px solid ${STATUS_COLORS[t.status]}`,
              borderRadius:"50%", animation:"ping 2s infinite" }}/>
          )}
          <div style={{
            width:30, height:30, borderRadius:"50%",
            background: selectedTruck?.id===t.id ? STATUS_COLORS[t.status] : `${STATUS_COLORS[t.status]}28`,
            border:`2px solid ${STATUS_COLORS[t.status]}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:12, boxShadow:`0 0 10px ${STATUS_COLORS[t.status]}55`,
            transition:"all .3s",
          }}>
            {t.status==="Mantenimiento"?"🔧":t.status==="Alerta"?"⚠️":"🚛"}
          </div>
          {selectedTruck?.id===t.id && (
            <div style={{ position:"absolute", bottom:34, left:"50%", transform:"translateX(-50%)",
              background:COLORS.gray800, border:`1px solid ${COLORS.gray600}`,
              borderRadius:8, padding:"3px 8px", fontSize:10, color:COLORS.white,
              whiteSpace:"nowrap", zIndex:20 }}>
              {t.id} · {t.driver.split(" ")[0]}
            </div>
          )}
        </div>
      ))}

      {/* leyenda */}
      <div style={{ position:"absolute", bottom:8, left:8,
        background:"rgba(15,23,42,.88)", border:`1px solid ${COLORS.gray700}`,
        borderRadius:10, padding:"5px 10px", display:"flex", gap:8, flexWrap:"wrap" }}>
        {Object.entries(STATUS_COLORS).map(([s,c])=>(
          <div key={s} style={{ display:"flex", alignItems:"center", gap:4 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:c }}/>
            <span style={{ fontSize:9, color:COLORS.gray300 }}>{s}</span>
          </div>
        ))}
      </div>

      {/* live badge */}
      <div style={{ position:"absolute", top:8, right:8,
        background:"rgba(16,185,129,.15)", border:`1px solid ${COLORS.green}`,
        borderRadius:20, padding:"3px 10px",
        display:"flex", alignItems:"center", gap:5 }}>
        <div style={{ width:6, height:6, borderRadius:"50%", background:COLORS.green, animation:"pulse 1.5s infinite" }}/>
        <span style={{ fontSize:9, color:COLORS.green, fontWeight:700 }}>LIVE</span>
      </div>
    </div>
  );
}

/* ─── Tarjeta de camión ──────────────────────────────────────────────────── */
function TruckCard({ truck, selected, onClick }) {
  const c = STATUS_COLORS[truck.status] || COLORS.sky;
  return (
    <div onClick={onClick} style={{
      background: selected ? `${COLORS.sky}0A` : COLORS.white,
      border: `1.5px solid ${selected ? COLORS.sky : COLORS.gray100}`,
      borderRadius: 12, padding: "12px 14px", cursor: "pointer",
      transition: "all .2s",
      boxShadow: selected ? `0 4px 16px ${COLORS.sky}22` : "none",
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
        <div>
          <div style={{ fontSize:13, fontWeight:700, color:COLORS.gray900 }}>{truck.id}</div>
          <div style={{ fontSize:11, color:COLORS.gray500 }}>{truck.driver}</div>
        </div>
        <span style={{ fontSize:10, fontWeight:600, padding:"2px 9px", borderRadius:20,
          background:`${c}18`, color:c }}>{truck.status}</span>
      </div>
      <div style={{ fontSize:11, color:COLORS.gray600, marginBottom:7 }}>
        {truck.origin} → {truck.destination}
        {truck.eta!=="—" && <span style={{ color:COLORS.gray400, marginLeft:6 }}>ETA {truck.eta}</span>}
      </div>
      <ProgressBar value={truck.progress} color={truck.status==="Alerta" ? COLORS.red : COLORS.sky} height={4}/>
      <div style={{ display:"flex", justifyContent:"space-between", marginTop:5 }}>
        <span style={{ fontSize:10, color:COLORS.gray400 }}>📦 {truck.cargo}</span>
        <span style={{ fontSize:10, color:COLORS.gray400 }}>{Math.round(truck.progress)}%</span>
      </div>
    </div>
  );
}

/* ─── Panel de detalle ───────────────────────────────────────────────────── */
function TruckDetail({ truck, onClose }) {
  if (!truck) return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"center", height:"100%", color:COLORS.gray300,
      padding:24, textAlign:"center", minHeight:180 }}>
      <div style={{ fontSize:44 }}>🗺️</div>
      <div style={{ fontSize:14, fontWeight:600, marginTop:10 }}>Selecciona un vehículo</div>
      <div style={{ fontSize:12, color:COLORS.gray400, marginTop:5 }}>Toca un camión de la lista o del mapa</div>
    </div>
  );

  const c = STATUS_COLORS[truck.status] || COLORS.sky;
  const metrics = [
    { label:"Velocidad",   value:`${Math.round(truck.speed)} km/h`, icon:"⚡", color:COLORS.sky,    pct:(truck.speed/120)*100 },
    { label:"Combustible", value:`${Math.round(truck.fuel)}%`,      icon:"⛽", color:truck.fuel<30?COLORS.red:COLORS.green, pct:truck.fuel },
    { label:"Carga",       value:`${truck.capacity}%`,              icon:"📦", color:COLORS.amber,  pct:truck.capacity },
    { label:"Temperatura", value:`${truck.temp}°C`,                 icon:"🌡️", color:COLORS.skyDark,pct:((truck.temp+10)/45)*100 },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      {onClose && (
        <button onClick={onClose} style={{ alignSelf:"flex-end", background:COLORS.gray100,
          border:"none", borderRadius:8, padding:"5px 12px", cursor:"pointer",
          fontSize:12, color:COLORS.gray600, fontFamily:"inherit" }}>✕ Cerrar</button>
      )}

      {/* Banner */}
      <div style={{ background:`linear-gradient(135deg,${COLORS.skyDeep},${COLORS.sky})`,
        borderRadius:14, padding:"14px 18px", color:COLORS.white }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ fontSize:20, fontWeight:800 }}>{truck.id}</div>
            <div style={{ fontSize:12, opacity:.8, marginTop:2 }}>{truck.driver}</div>
          </div>
          <span style={{ fontSize:11, background:"rgba(255,255,255,.2)",
            padding:"3px 12px", borderRadius:20, fontWeight:600 }}>{truck.status}</span>
        </div>
        <div style={{ fontSize:11, marginTop:10, opacity:.85 }}>{truck.origin} → {truck.destination}</div>
        <ProgressBar value={truck.progress} color={"rgba(255,255,255,.6)"} bg={"rgba(255,255,255,.2)"} height={5}/>
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
          <span style={{ fontSize:10, opacity:.7 }}>ETA {truck.eta}</span>
          <span style={{ fontSize:10, opacity:.7 }}>{Math.round(truck.progress)}%</span>
        </div>
      </div>

      {/* Métricas */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {metrics.map(m=>(
          <div key={m.label} style={{ background:COLORS.gray50, borderRadius:12, padding:"12px 14px" }}>
            <div style={{ fontSize:10, color:COLORS.gray400, marginBottom:6 }}>{m.icon} {m.label}</div>
            <div style={{ fontSize:18, fontWeight:800, color:m.color }}>{m.value}</div>
            <ProgressBar value={m.pct} color={m.color} height={4}/>
          </div>
        ))}
      </div>

      {/* Info extra */}
      <div style={{ background:COLORS.gray50, borderRadius:12, padding:"12px 14px" }}>
        <div style={{ fontSize:11, fontWeight:700, color:COLORS.gray700, marginBottom:10 }}>📋 Detalles</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          {[["📦 Carga",truck.cargo],["🪪 Licencia",truck.license],["📡 Señal",truck.signal],["🛣️ Ruta",truck.route||"—"]].map(([k,v])=>(
            <div key={k}>
              <div style={{ fontSize:10, color:COLORS.gray400 }}>{k}</div>
              <div style={{ fontSize:12, fontWeight:600, color:COLORS.gray700, marginTop:2 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Acciones */}
      <div style={{ display:"flex", gap:8 }}>
        {[["📞","Contactar",c],["🔄","Reasignar",COLORS.gray200]].map(([ico,lbl,bg])=>(
          <button key={lbl} style={{
            flex:1, padding:"9px", borderRadius:10, border:"none",
            background:bg, color:bg===COLORS.gray200?COLORS.gray600:COLORS.white,
            fontWeight:600, cursor:"pointer", fontSize:12, fontFamily:"inherit" }}>{ico} {lbl}</button>
        ))}
      </div>
    </div>
  );
}

/* ─── Barra de filtros ───────────────────────────────────────────────────── */
function FilterBar({ filterStatus, setFilterStatus, count }) {
  return (
    <div style={{ display:"flex", gap:5, flexWrap:"wrap", alignItems:"center", flexShrink:0 }}>
      {["Todos","En Ruta","Entregado","Alerta","En Espera"].map(s=>(
        <button key={s} onClick={()=>setFilterStatus(s)} style={{
          padding:"5px 11px", borderRadius:20, fontSize:11, fontWeight:600,
          cursor:"pointer", border:"none",
          background: filterStatus===s ? COLORS.sky : COLORS.gray100,
          color:       filterStatus===s ? COLORS.white : COLORS.gray500,
          fontFamily:"inherit" }}>{s}</button>
      ))}
      <span style={{ fontSize:11, color:COLORS.gray400, marginLeft:4 }}>
        {count} vehículo{count!==1?"s":""}
      </span>
    </div>
  );
}

/* ─── Vista principal ────────────────────────────────────────────────────── */
export default function TrackingView({ trucks, search }) {
  const [selected, setSelected]         = useState(null);
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [mobileTab, setMobileTab]       = useState("lista");
  const width    = useWidth();
  const isMobile = width < 680;
  const isTablet = width >= 680 && width < 1060;

  const filtered = trucks.filter(t => {
    const q = search.toLowerCase();
    const ok = !q
      || t.id.toLowerCase().includes(q)
      || t.driver.toLowerCase().includes(q)
      || t.cargo.toLowerCase().includes(q)
      || t.origin.toLowerCase().includes(q)
      || t.destination.toLowerCase().includes(q);
    return ok && (filterStatus==="Todos" || t.status===filterStatus);
  });

  function pick(t) {
    const next = selected?.id===t.id ? null : t;
    setSelected(next);
    if (isMobile && next) setMobileTab("detalle");
  }

  /* ════════════════ MÓVIL ════════════════ */
  if (isMobile) return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", overflow:"hidden", gap:10 }}>
      {/* Tab switcher */}
      <div style={{ display:"flex", background:COLORS.gray100, borderRadius:12, padding:4, gap:4, flexShrink:0 }}>
        {[["lista","📋 Lista"],["mapa","🗺️ Mapa"],["detalle","📡 Detalle"]].map(([id,lbl])=>(
          <button key={id} onClick={()=>setMobileTab(id)} style={{
            flex:1, padding:"8px 4px", borderRadius:9, fontSize:12, fontWeight:600,
            border:"none", cursor:"pointer", fontFamily:"inherit",
            background: mobileTab===id ? COLORS.white : "transparent",
            color:       mobileTab===id ? COLORS.gray900 : COLORS.gray500,
            boxShadow:   mobileTab===id ? "0 1px 4px rgba(0,0,0,.1)" : "none" }}>{lbl}</button>
        ))}
      </div>

      {/* Contenido del tab activo */}
      <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
        {mobileTab==="lista" && (
          <div style={{ height:"100%", display:"flex", flexDirection:"column", gap:8, overflow:"hidden" }}>
            <FilterBar filterStatus={filterStatus} setFilterStatus={setFilterStatus} count={filtered.length}/>
            <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column", gap:8 }}>
              {filtered.map(t=>(
                <TruckCard key={t.id} truck={t} selected={selected?.id===t.id} onClick={()=>pick(t)}/>
              ))}
              {filtered.length===0 && (
                <div style={{ textAlign:"center", padding:30, color:COLORS.gray300 }}>
                  <div style={{ fontSize:32 }}>🔍</div>
                  <div style={{ fontSize:13, marginTop:8 }}>Sin resultados</div>
                </div>
              )}
            </div>
          </div>
        )}
        {mobileTab==="mapa" && (
          <div style={{ height:"100%", minHeight:280 }}>
            <MapView trucks={filtered} selectedTruck={selected} onSelect={pick}/>
          </div>
        )}
        {mobileTab==="detalle" && (
          <div style={{ height:"100%", overflowY:"auto" }}>
            <TruckDetail truck={selected} onClose={()=>{ setSelected(null); setMobileTab("lista"); }}/>
          </div>
        )}
      </div>
    </div>
  );

  /* ════════════════ TABLET ════════════════ */
  if (isTablet) return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", overflow:"hidden", gap:12 }}>
      <FilterBar filterStatus={filterStatus} setFilterStatus={setFilterStatus} count={filtered.length}/>
      <div style={{ flex:1, display:"flex", gap:12, overflow:"hidden", minHeight:0 }}>
        {/* Lista */}
        <div style={{ width:230, flexShrink:0, overflowY:"auto", display:"flex", flexDirection:"column", gap:8 }}>
          {filtered.map(t=>(
            <TruckCard key={t.id} truck={t} selected={selected?.id===t.id}
              onClick={()=>setSelected(selected?.id===t.id ? null : t)}/>
          ))}
          {filtered.length===0 && (
            <div style={{ textAlign:"center", padding:24, color:COLORS.gray300 }}>
              <div style={{ fontSize:28 }}>🔍</div>
              <div style={{ fontSize:12, marginTop:6 }}>Sin resultados</div>
            </div>
          )}
        </div>

        {/* Mapa + detalle apilados */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:12, overflow:"hidden", minHeight:0 }}>
          <div style={{ flex:1, background:COLORS.white, border:`1px solid ${COLORS.gray100}`,
            borderRadius:16, overflow:"hidden", display:"flex", flexDirection:"column", minHeight:0 }}>
            <div style={{ padding:"10px 14px", borderBottom:`1px solid ${COLORS.gray100}`,
              display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
              <span style={{ fontSize:13, fontWeight:700, color:COLORS.gray800 }}>🗺️ Mapa en Tiempo Real</span>
              <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:COLORS.green, animation:"pulse 1.5s infinite" }}/>
                <span style={{ fontSize:11, color:COLORS.green, fontWeight:600 }}>LIVE</span>
              </div>
            </div>
            <div style={{ flex:1, padding:12 }}>
              <MapView trucks={filtered} selectedTruck={selected}
                onSelect={t=>setSelected(selected?.id===t.id ? null : t)}/>
            </div>
          </div>
          {selected && (
            <div style={{ background:COLORS.white, border:`1px solid ${COLORS.gray100}`,
              borderRadius:16, padding:16, overflowY:"auto", maxHeight:260, flexShrink:0 }}>
              <TruckDetail truck={selected} onClose={()=>setSelected(null)}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  /* ════════════════ DESKTOP ════════════════ */
  return (
    <div style={{ display:"flex", gap:14, height:"100%", overflow:"hidden" }}>
      {/* Columna izquierda: filtros + lista */}
      <div style={{ width:260, flexShrink:0, display:"flex", flexDirection:"column", gap:10, overflow:"hidden" }}>
        <FilterBar filterStatus={filterStatus} setFilterStatus={setFilterStatus} count={filtered.length}/>
        <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column", gap:8 }}>
          {filtered.map(t=>(
            <TruckCard key={t.id} truck={t} selected={selected?.id===t.id}
              onClick={()=>setSelected(selected?.id===t.id ? null : t)}/>
          ))}
          {filtered.length===0 && (
            <div style={{ textAlign:"center", padding:30, color:COLORS.gray300 }}>
              <div style={{ fontSize:32 }}>🔍</div>
              <div style={{ fontSize:13, marginTop:8 }}>Sin resultados</div>
            </div>
          )}
        </div>
      </div>

      {/* Columna central: mapa */}
      <div style={{ flex:1, background:COLORS.white, border:`1px solid ${COLORS.gray100}`,
        borderRadius:16, overflow:"hidden", display:"flex", flexDirection:"column", minWidth:0 }}>
        <div style={{ padding:"12px 16px", borderBottom:`1px solid ${COLORS.gray100}`,
          display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
          <span style={{ fontSize:13, fontWeight:700, color:COLORS.gray800 }}>🗺️ Mapa en Tiempo Real</span>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:COLORS.green, animation:"pulse 1.5s infinite" }}/>
            <span style={{ fontSize:11, color:COLORS.green, fontWeight:600 }}>Actualizando cada 2s</span>
          </div>
        </div>
        <div style={{ flex:1, padding:14 }}>
          <MapView trucks={filtered} selectedTruck={selected}
            onSelect={t=>setSelected(selected?.id===t.id ? null : t)}/>
        </div>
      </div>

      {/* Columna derecha: detalle */}
      <div style={{ width:260, flexShrink:0, background:COLORS.white,
        border:`1px solid ${COLORS.gray100}`, borderRadius:16,
        overflow:"hidden", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"12px 16px", borderBottom:`1px solid ${COLORS.gray100}`, flexShrink:0 }}>
          <span style={{ fontSize:13, fontWeight:700, color:COLORS.gray800 }}>📡 Detalles</span>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:14 }}>
          <TruckDetail truck={selected}/>
        </div>
      </div>
    </div>
  );
}
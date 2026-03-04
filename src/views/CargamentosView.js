import { useState } from "react";
import { COLORS, CARGAMENTOS_DATA, INITIAL_TRUCKS } from "../data/mockData";

const STATUS_COLOR = { "En Tránsito": COLORS.sky,   "Entregado": COLORS.green,  "Pendiente": COLORS.amber, "Alerta": COLORS.red };
const STATUS_BG    = { "En Tránsito": "#EFF6FF",     "Entregado": "#ECFDF5",     "Pendiente": "#FFFBEB",    "Alerta": "#FEF2F2"  };
const PRIO_COLOR   = { "Crítica": COLORS.red,        "Alta": COLORS.amber,       "Normal": COLORS.sky };
const PRIO_BG      = { "Crítica": "#FEF2F2",         "Alta": "#FFFBEB",          "Normal": "#EFF6FF"  };

const EMPTY = {
  type:"", weight:"", volume:"", client:"",
  origin:"", destination:"", priority:"Normal",
  value:"", insurance:"Incluido", truck:"",
  date: new Date().toISOString().split("T")[0], status:"Pendiente",
};

/* ─── Modal detalle ── */
function DetailModal({ carga, onClose }) {
  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()}
      style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.42)", zIndex:1000,
        display:"flex", alignItems:"center", justifyContent:"center",
        backdropFilter:"blur(4px)", padding:16 }}>
      <div style={{ background:COLORS.white, borderRadius:20, width:"100%", maxWidth:540,
        maxHeight:"90vh", overflow:"auto", boxShadow:"0 30px 80px rgba(0,0,0,0.2)" }}>

        <div style={{ padding:"18px 22px", borderBottom:`1px solid ${COLORS.gray100}`,
          display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:17, fontWeight:800, color:COLORS.gray900 }}>{carga.id}</div>
            <div style={{ fontSize:12, color:COLORS.gray500, marginTop:2 }}>{carga.type}</div>
          </div>
          <button onClick={onClose} style={{ width:32, height:32, borderRadius:8,
            background:COLORS.gray100, border:"none", cursor:"pointer", fontSize:16 }}>✕</button>
        </div>

        <div style={{ padding:"18px 22px", display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            <span style={{ padding:"4px 14px", borderRadius:20, fontSize:12, fontWeight:600,
              background:STATUS_BG[carga.status], color:STATUS_COLOR[carga.status] }}>{carga.status}</span>
            <span style={{ padding:"4px 14px", borderRadius:20, fontSize:12, fontWeight:600,
              background:PRIO_BG[carga.priority], color:PRIO_COLOR[carga.priority] }}>Prioridad {carga.priority}</span>
          </div>

          <div style={{ background:`${COLORS.sky}08`, border:`1px solid ${COLORS.sky}20`,
            borderRadius:14, padding:"14px 18px",
            display:"flex", justifyContent:"space-around", alignItems:"center", flexWrap:"wrap", gap:10 }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:10, color:COLORS.gray400 }}>Origen</div>
              <div style={{ fontSize:16, fontWeight:800, color:COLORS.gray900 }}>{carga.origin}</div>
            </div>
            <div style={{ fontSize:22 }}>🚛</div>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:10, color:COLORS.gray400 }}>Destino</div>
              <div style={{ fontSize:16, fontWeight:800, color:COLORS.gray900 }}>{carga.destination}</div>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[["🏢 Cliente",carga.client],["🚛 Vehículo",carga.truck||"—"],["⚖️ Peso",carga.weight],["📐 Volumen",carga.volume||"—"],["💰 Valor",carga.value||"—"],["📅 Fecha",carga.date],["🛡️ Seguro",carga.insurance],["📦 Tipo",carga.type]].map(([k,v])=>(
              <div key={k} style={{ background:COLORS.gray50, borderRadius:10, padding:"11px 13px" }}>
                <div style={{ fontSize:10, color:COLORS.gray400 }}>{k}</div>
                <div style={{ fontSize:13, fontWeight:600, color:COLORS.gray800, marginTop:2 }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ display:"flex", gap:10 }}>
            <button style={{ flex:1, padding:11, borderRadius:12,
              background:`linear-gradient(135deg,${COLORS.sky},${COLORS.skyDark})`,
              border:"none", color:COLORS.white, fontWeight:600, cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>
              📄 Generar Manifiesto
            </button>
            <button style={{ flex:1, padding:11, borderRadius:12,
              background:COLORS.gray50, border:`1px solid ${COLORS.gray200}`,
              color:COLORS.gray700, fontWeight:600, cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>
              ✏️ Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Modal nuevo cargamento ── */
function NewModal({ onClose, onSave }) {
  const [form, setForm] = useState({ ...EMPTY });
  const [errors, setErrors] = useState({});

  const set = (f,v) => { setForm(p=>({...p,[f]:v})); setErrors(p=>({...p,[f]:""})); };

  function submit() {
    const e = {};
    if (!form.type.trim())        e.type        = "Requerido";
    if (!form.client.trim())      e.client      = "Requerido";
    if (!form.origin.trim())      e.origin      = "Requerido";
    if (!form.destination.trim()) e.destination = "Requerido";
    if (!form.weight.trim())      e.weight      = "Requerido";
    if (Object.keys(e).length) { setErrors(e); return; }
    const id = `CRG-${new Date().getFullYear()}-${String(Math.floor(Math.random()*900)+100).padStart(3,"0")}`;
    onSave({ ...form, id });
    onClose();
  }

  const inp = (f) => ({
    width:"100%", padding:"9px 12px",
    border:`1px solid ${errors[f] ? COLORS.red : COLORS.gray200}`,
    borderRadius:10, fontSize:13, color:COLORS.gray700, outline:"none",
    background:COLORS.gray50, fontFamily:"inherit", boxSizing:"border-box",
  });
  const lbl = { fontSize:11, fontWeight:600, color:COLORS.gray500, marginBottom:5, display:"block" };
  const err = (f) => errors[f] && <div style={{ fontSize:11, color:COLORS.red, marginTop:3 }}>{errors[f]}</div>;

  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()}
      style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:1000,
        display:"flex", alignItems:"center", justifyContent:"center",
        backdropFilter:"blur(4px)", padding:16 }}>
      <div style={{ background:COLORS.white, borderRadius:20, width:"100%", maxWidth:560,
        maxHeight:"93vh", overflow:"auto", boxShadow:"0 30px 80px rgba(0,0,0,0.2)" }}>

        <div style={{ background:`linear-gradient(135deg,${COLORS.skyDeep},${COLORS.sky})`,
          padding:"20px 24px", color:COLORS.white,
          display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:18, fontWeight:800 }}>📦 Nuevo Cargamento</div>
            <div style={{ fontSize:12, opacity:.8, marginTop:3 }}>Registra los datos del cargamento</div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,.2)", border:"none",
            borderRadius:8, width:32, height:32, cursor:"pointer", color:COLORS.white, fontSize:14 }}>✕</button>
        </div>

        <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ fontSize:13, fontWeight:700, color:COLORS.gray700 }}>📦 Detalles de la carga</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div style={{ gridColumn:"1/-1" }}>
              <label style={lbl}>Tipo de carga *</label>
              <input style={inp("type")} value={form.type} onChange={e=>set("type",e.target.value)} placeholder="Ej. Electrónicos, Alimentos..."/>{err("type")}
            </div>
            <div>
              <label style={lbl}>Peso *</label>
              <input style={inp("weight")} value={form.weight} onChange={e=>set("weight",e.target.value)} placeholder="Ej. 4,200 kg"/>{err("weight")}
            </div>
            <div>
              <label style={lbl}>Volumen</label>
              <input style={inp("volume")} value={form.volume} onChange={e=>set("volume",e.target.value)} placeholder="Ej. 38 m³"/>
            </div>
            <div>
              <label style={lbl}>Valor declarado</label>
              <input style={inp("value")} value={form.value} onChange={e=>set("value",e.target.value)} placeholder="Ej. $245,000"/>
            </div>
            <div>
              <label style={lbl}>Seguro</label>
              <select style={{...inp("insurance"),background:COLORS.white}} value={form.insurance} onChange={e=>set("insurance",e.target.value)}>
                {["Incluido","No incluido","Especializado"].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div style={{ fontSize:13, fontWeight:700, color:COLORS.gray700 }}>🏢 Cliente y ruta</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div style={{ gridColumn:"1/-1" }}>
              <label style={lbl}>Cliente *</label>
              <input style={inp("client")} value={form.client} onChange={e=>set("client",e.target.value)} placeholder="Nombre del cliente"/>{err("client")}
            </div>
            <div>
              <label style={lbl}>Origen *</label>
              <input style={inp("origin")} value={form.origin} onChange={e=>set("origin",e.target.value)} placeholder="Ej. CDMX"/>{err("origin")}
            </div>
            <div>
              <label style={lbl}>Destino *</label>
              <input style={inp("destination")} value={form.destination} onChange={e=>set("destination",e.target.value)} placeholder="Ej. Guadalajara"/>{err("destination")}
            </div>
          </div>

          <div style={{ fontSize:13, fontWeight:700, color:COLORS.gray700 }}>⚙️ Configuración</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <label style={lbl}>Prioridad</label>
              <select style={{...inp("priority"),background:COLORS.white}} value={form.priority} onChange={e=>set("priority",e.target.value)}>
                {["Normal","Alta","Crítica"].map(p=><option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Estado inicial</label>
              <select style={{...inp("status"),background:COLORS.white}} value={form.status} onChange={e=>set("status",e.target.value)}>
                {["Pendiente","En Tránsito"].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Vehículo asignado</label>
              <select style={{...inp("truck"),background:COLORS.white}} value={form.truck} onChange={e=>set("truck",e.target.value)}>
                <option value="">Sin asignar</option>
                {INITIAL_TRUCKS && INITIAL_TRUCKS.map(t=><option key={t.id} value={t.id}>{t.id} – {t.driver}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Fecha</label>
              <input type="date" style={inp("date")} value={form.date} onChange={e=>set("date",e.target.value)}/>
            </div>
          </div>

          <div style={{ display:"flex", gap:10, marginTop:4 }}>
            <button onClick={submit} style={{ flex:1, padding:12, borderRadius:12,
              background:`linear-gradient(135deg,${COLORS.sky},${COLORS.skyDark})`,
              border:"none", color:COLORS.white, fontWeight:700,
              cursor:"pointer", fontSize:14, fontFamily:"inherit",
              boxShadow:`0 4px 14px ${COLORS.sky}44` }}>✅ Registrar Cargamento</button>
            <button onClick={onClose} style={{ padding:"12px 18px", borderRadius:12,
              background:COLORS.gray50, border:`1px solid ${COLORS.gray200}`,
              color:COLORS.gray600, fontWeight:600, cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Vista principal ── */
export default function CargamentosView({ search }) {
  const [cargamentos, setCargamentos] = useState(CARGAMENTOS_DATA);
  const [filterStatus,   setFilterStatus]   = useState("Todos");
  const [filterPriority, setFilterPriority] = useState("Todos");
  const [selected, setSelected] = useState(null);
  const [showNew,  setShowNew]  = useState(false);

  const filtered = cargamentos.filter(c => {
    const q = search.toLowerCase();
    const ok = !q
      || c.id.toLowerCase().includes(q)
      || c.type.toLowerCase().includes(q)
      || c.client.toLowerCase().includes(q)
      || c.origin.toLowerCase().includes(q)
      || c.destination.toLowerCase().includes(q)
      || (c.truck||"").toLowerCase().includes(q);
    return ok
      && (filterStatus   === "Todos" || c.status   === filterStatus)
      && (filterPriority === "Todos" || c.priority === filterPriority);
  });

  const stats = {
    total:     cargamentos.length,
    transito:  cargamentos.filter(c=>c.status==="En Tránsito").length,
    entregado: cargamentos.filter(c=>c.status==="Entregado").length,
    pendiente: cargamentos.filter(c=>c.status==="Pendiente").length,
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16, height:"100%", overflow:"hidden" }}>
      {selected && <DetailModal carga={selected} onClose={()=>setSelected(null)}/>}
      {showNew  && <NewModal onClose={()=>setShowNew(false)} onSave={nc=>setCargamentos(p=>[nc,...p])}/>}

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start",
        flexWrap:"wrap", gap:10, flexShrink:0 }}>
        <div>
          <h2 style={{ fontSize:20, fontWeight:800, color:COLORS.gray900, margin:0 }}>📦 Cargamentos</h2>
          <p style={{ fontSize:13, color:COLORS.gray500, marginTop:4 }}>{stats.total} registrados · {stats.transito} en tránsito</p>
        </div>
        <button onClick={()=>setShowNew(true)} style={{
          background:`linear-gradient(135deg,${COLORS.sky},${COLORS.skyDark})`,
          color:COLORS.white, border:"none", borderRadius:10,
          padding:"10px 18px", fontSize:13, fontWeight:700,
          cursor:"pointer", display:"flex", alignItems:"center", gap:6,
          boxShadow:`0 4px 12px ${COLORS.sky}44`, fontFamily:"inherit" }}>
          ➕ Nuevo Cargamento
        </button>
      </div>

      {/* Stats — flex wrap */}
      <div style={{ display:"flex", gap:12, flexWrap:"wrap", flexShrink:0 }}>
        {[
          {label:"Total",       val:stats.total,     color:COLORS.sky},
          {label:"En Tránsito", val:stats.transito,  color:COLORS.sky},
          {label:"Entregados",  val:stats.entregado, color:COLORS.green},
          {label:"Pendientes",  val:stats.pendiente, color:COLORS.amber},
        ].map(s=>(
          <div key={s.label} style={{ flex:"1 1 110px", minWidth:90,
            background:COLORS.white, border:`1px solid ${COLORS.gray100}`,
            borderRadius:14, padding:"12px 15px" }}>
            <div style={{ fontSize:22, fontWeight:800, color:s.color }}>{s.val}</div>
            <div style={{ fontSize:11, color:COLORS.gray500, marginTop:2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filtros — dos filas en móvil, una en desktop */}
      <div style={{ display:"flex", flexDirection:"column", gap:8, flexShrink:0 }}>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
          <span style={{ fontSize:11, fontWeight:600, color:COLORS.gray500, marginRight:2 }}>Estado:</span>
          {["Todos","En Tránsito","Entregado","Pendiente","Alerta"].map(s=>(
            <button key={s} onClick={()=>setFilterStatus(s)} style={{
              padding:"5px 11px", borderRadius:20, fontSize:11, fontWeight:600,
              cursor:"pointer", border:"none",
              background:filterStatus===s?COLORS.sky:COLORS.gray100,
              color:filterStatus===s?COLORS.white:COLORS.gray500,
              fontFamily:"inherit" }}>{s}</button>
          ))}
        </div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
          <span style={{ fontSize:11, fontWeight:600, color:COLORS.gray500, marginRight:2 }}>Prioridad:</span>
          {["Todos","Crítica","Alta","Normal"].map(p=>(
            <button key={p} onClick={()=>setFilterPriority(p)} style={{
              padding:"5px 11px", borderRadius:20, fontSize:11, fontWeight:600,
              cursor:"pointer", border:"none",
              background:filterPriority===p?COLORS.gray700:COLORS.gray100,
              color:filterPriority===p?COLORS.white:COLORS.gray500,
              fontFamily:"inherit" }}>{p}</button>
          ))}
          <span style={{ marginLeft:"auto", fontSize:11, color:COLORS.gray400 }}>
            {filtered.length} resultado{filtered.length!==1?"s":""}
          </span>
        </div>
      </div>

      {/* Tabla con scroll horizontal en móvil */}
      <div style={{ flex:1, background:COLORS.white, border:`1px solid ${COLORS.gray100}`,
        borderRadius:16, overflow:"hidden", display:"flex", flexDirection:"column", minHeight:0 }}>
        <div style={{ flex:1, overflowY:"auto", overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", minWidth:620 }}>
            <thead style={{ position:"sticky", top:0, zIndex:10 }}>
              <tr style={{ background:COLORS.gray50, borderBottom:`1px solid ${COLORS.gray100}` }}>
                {["ID","Tipo / Cliente","Ruta","Estado","Prioridad","Vehículo",""].map(h=>(
                  <th key={h} style={{ padding:"11px 14px", textAlign:"left", fontSize:11,
                    fontWeight:700, color:COLORS.gray500, whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c=>(
                <tr key={c.id}
                  style={{ borderBottom:`1px solid ${COLORS.gray50}`, transition:"background .15s" }}
                  onMouseEnter={e=>e.currentTarget.style.background=COLORS.gray50}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <td style={{ padding:"11px 14px" }}>
                    <div style={{ fontSize:12, fontWeight:700, color:COLORS.sky }}>{c.id}</div>
                    <div style={{ fontSize:10, color:COLORS.gray400 }}>{c.date}</div>
                  </td>
                  <td style={{ padding:"11px 14px" }}>
                    <div style={{ fontSize:13, fontWeight:500, color:COLORS.gray800 }}>{c.type}</div>
                    <div style={{ fontSize:11, color:COLORS.gray400 }}>{c.client}</div>
                  </td>
                  <td style={{ padding:"11px 14px" }}>
                    <div style={{ fontSize:12, color:COLORS.gray700 }}>{c.origin}</div>
                    <div style={{ fontSize:11, color:COLORS.gray400 }}>→ {c.destination}</div>
                  </td>
                  <td style={{ padding:"11px 14px" }}>
                    <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:600,
                      background:STATUS_BG[c.status], color:STATUS_COLOR[c.status] }}>{c.status}</span>
                  </td>
                  <td style={{ padding:"11px 14px" }}>
                    <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:600,
                      background:PRIO_BG[c.priority], color:PRIO_COLOR[c.priority] }}>{c.priority}</span>
                  </td>
                  <td style={{ padding:"11px 14px", fontSize:12, fontWeight:600, color:COLORS.sky }}>{c.truck||"—"}</td>
                  <td style={{ padding:"11px 14px" }}>
                    <button onClick={()=>setSelected(c)} style={{
                      padding:"5px 12px", borderRadius:8,
                      background:`${COLORS.sky}12`, border:`1px solid ${COLORS.sky}30`,
                      color:COLORS.sky, fontSize:11, fontWeight:600,
                      cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>Ver →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length===0 && (
            <div style={{ textAlign:"center", padding:"40px 20px", color:COLORS.gray300 }}>
              <div style={{ fontSize:40 }}>📦</div>
              <div style={{ fontSize:14, marginTop:10, fontWeight:500 }}>No se encontraron cargamentos</div>
              <button onClick={()=>setShowNew(true)} style={{
                marginTop:14, padding:"10px 20px", borderRadius:10,
                background:`linear-gradient(135deg,${COLORS.sky},${COLORS.skyDark})`,
                border:"none", color:COLORS.white, fontWeight:600,
                cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>➕ Agregar cargamento</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
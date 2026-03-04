import { useState } from "react";
import { COLORS, DRIVERS_DATA } from "../data/mockData";
import { ProgressBar } from "../components/UI";

const DRIVER_STATUS_COLORS = {
  "Activo": COLORS.green, "En Espera": COLORS.amber,
  "Alerta": COLORS.red,   "Descanso": COLORS.sky,
};
const DRIVER_STATUS_BG = {
  "Activo": "#ECFDF5", "En Espera": "#FFFBEB",
  "Alerta": "#FEF2F2", "Descanso": "#EFF6FF",
};

const EMPTY = {
  name: "", phone: "", license: "CDL-A",
  experience: "", status: "Activo", truck: "",
  rating: 5.0, trips: 0, onTime: 100, avatar: "",
};

/* ── Modal ver / editar ── */
function DriverModal({ driver, onClose, onSave }) {
  const [mode, setMode] = useState("view");
  const [form, setForm] = useState({ ...driver });

  const set = (f, v) => setForm(p => ({ ...p, [f]: v }));

  function save() {
    if (!form.name.trim() || !form.phone.trim()) return;
    const initials = form.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
    onSave({ ...form, avatar: initials });
    onClose();
  }

  const inp = {
    width: "100%", padding: "9px 12px", border: `1px solid ${COLORS.gray200}`,
    borderRadius: 10, fontSize: 13, color: COLORS.gray700, outline: "none",
    background: COLORS.gray50, fontFamily: "inherit", boxSizing: "border-box",
  };
  const lbl = { fontSize: 11, fontWeight: 600, color: COLORS.gray500, marginBottom: 5, display: "block" };

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:1000,
        display:"flex", alignItems:"center", justifyContent:"center",
        backdropFilter:"blur(4px)", padding:16 }}>
      <div style={{ background:COLORS.white, borderRadius:20, width:"100%", maxWidth:500,
        maxHeight:"90vh", overflow:"auto", boxShadow:"0 30px 80px rgba(0,0,0,0.2)",
        animation:"slideDown .2s ease" }}>

        {/* banner */}
        <div style={{ background:`linear-gradient(135deg,${COLORS.skyDeep},${COLORS.sky})`,
          padding:"22px 24px 18px", color:COLORS.white }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:14 }}>
            <div style={{ fontSize:15, fontWeight:800 }}>
              {mode==="view" ? "👤 Perfil del Conductor" : "✏️ Editar Conductor"}
            </div>
            <button onClick={onClose} style={{ background:"rgba(255,255,255,.2)", border:"none",
              borderRadius:8, width:30, height:30, cursor:"pointer", color:COLORS.white, fontSize:14 }}>✕</button>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:54, height:54, borderRadius:15, background:"rgba(255,255,255,.25)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:20, fontWeight:800 }}>{driver.avatar}</div>
            <div>
              <div style={{ fontSize:18, fontWeight:800 }}>{driver.name}</div>
              <div style={{ fontSize:11, opacity:.8 }}>{driver.id} · {driver.license}</div>
              <span style={{ fontSize:10, background:"rgba(255,255,255,.2)", padding:"2px 10px",
                borderRadius:10, marginTop:5, display:"inline-block" }}>{driver.status}</span>
            </div>
          </div>
        </div>

        <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap:14 }}>
          {mode === "view" ? (<>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
              {[["⭐ Rating",`${driver.rating}/5.0`],["🚛 Viajes",driver.trips],["✅ A tiempo",`${driver.onTime}%`]].map(([k,v])=>(
                <div key={k} style={{ background:COLORS.gray50, borderRadius:12, padding:12, textAlign:"center" }}>
                  <div style={{ fontSize:10, color:COLORS.gray400 }}>{k}</div>
                  <div style={{ fontSize:17, fontWeight:800, color:COLORS.gray900, marginTop:3 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {[["📞 Teléfono",driver.phone],["🪪 Licencia",driver.license],["⏳ Experiencia",driver.experience],["🚛 Vehículo",driver.truck||"—"]].map(([k,v])=>(
                <div key={k} style={{ background:COLORS.gray50, borderRadius:10, padding:"11px 13px" }}>
                  <div style={{ fontSize:10, color:COLORS.gray400 }}>{k}</div>
                  <div style={{ fontSize:13, fontWeight:600, color:COLORS.gray800, marginTop:2 }}>{v}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:COLORS.gray700, marginBottom:10 }}>📊 Rendimiento</div>
              {[{label:"Puntualidad",val:driver.onTime,color:COLORS.green},{label:"Satisfacción",val:driver.rating*20,color:COLORS.amber},{label:"Eficiencia",val:88,color:COLORS.sky}].map(p=>(
                <div key={p.label} style={{ marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontSize:12, color:COLORS.gray600 }}>{p.label}</span>
                    <span style={{ fontSize:12, fontWeight:700, color:p.color }}>{p.val}%</span>
                  </div>
                  <ProgressBar value={p.val} color={p.color} height={7} />
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={()=>setMode("edit")} style={{ flex:1, padding:11, borderRadius:12,
                background:`linear-gradient(135deg,${COLORS.sky},${COLORS.skyDark})`,
                border:"none", color:COLORS.white, fontWeight:600, cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>✏️ Editar</button>
              <button style={{ flex:1, padding:11, borderRadius:12,
                background:COLORS.gray50, border:`1px solid ${COLORS.gray200}`,
                color:COLORS.gray700, fontWeight:600, cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>📞 Llamar</button>
            </div>
          </>) : (<>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div style={{ gridColumn:"1/-1" }}>
                <label style={lbl}>Nombre completo *</label>
                <input style={inp} value={form.name} onChange={e=>set("name",e.target.value)} />
              </div>
              <div><label style={lbl}>Teléfono *</label>
                <input style={inp} value={form.phone} onChange={e=>set("phone",e.target.value)} />
              </div>
              <div><label style={lbl}>Licencia</label>
                <select style={{...inp,background:COLORS.white}} value={form.license} onChange={e=>set("license",e.target.value)}>
                  {["CDL-A","CDL-B","CDL-C","HAZMAT"].map(l=><option key={l}>{l}</option>)}
                </select>
              </div>
              <div><label style={lbl}>Experiencia</label>
                <input style={inp} value={form.experience} onChange={e=>set("experience",e.target.value)} placeholder="Ej. 5 años" />
              </div>
              <div><label style={lbl}>Estado</label>
                <select style={{...inp,background:COLORS.white}} value={form.status} onChange={e=>set("status",e.target.value)}>
                  {["Activo","En Espera","Descanso","Alerta"].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ gridColumn:"1/-1" }}><label style={lbl}>Vehículo</label>
                <input style={inp} value={form.truck} onChange={e=>set("truck",e.target.value)} placeholder="Ej. TRK-009" />
              </div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={save} style={{ flex:1, padding:11, borderRadius:12,
                background:`linear-gradient(135deg,${COLORS.sky},${COLORS.skyDark})`,
                border:"none", color:COLORS.white, fontWeight:700, cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>💾 Guardar</button>
              <button onClick={()=>setMode("view")} style={{ flex:1, padding:11, borderRadius:12,
                background:COLORS.gray50, border:`1px solid ${COLORS.gray200}`,
                color:COLORS.gray600, fontWeight:600, cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>Cancelar</button>
            </div>
          </>)}
        </div>
      </div>
    </div>
  );
}

/* ── Modal nuevo conductor ── */
function NewDriverModal({ onClose, onSave }) {
  const [form, setForm] = useState({ ...EMPTY });
  const [errors, setErrors] = useState({});

  const set = (f, v) => { setForm(p=>({...p,[f]:v})); setErrors(p=>({...p,[f]:""})); };

  function submit() {
    const e = {};
    if (!form.name.trim())       e.name       = "Requerido";
    if (!form.phone.trim())      e.phone      = "Requerido";
    if (!form.experience.trim()) e.experience = "Requerido";
    if (Object.keys(e).length) { setErrors(e); return; }
    const initials = form.name.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
    const id = `DRV-${String(Math.floor(Math.random()*900)+100).padStart(3,"0")}`;
    onSave({ ...form, id, avatar: initials });
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
      <div style={{ background:COLORS.white, borderRadius:20, width:"100%", maxWidth:520,
        maxHeight:"92vh", overflow:"auto", boxShadow:"0 30px 80px rgba(0,0,0,0.2)",
        animation:"slideDown .2s ease" }}>

        <div style={{ background:`linear-gradient(135deg,${COLORS.skyDeep},${COLORS.sky})`,
          padding:"22px 24px", color:COLORS.white,
          display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:18, fontWeight:800 }}>➕ Nuevo Conductor</div>
            <div style={{ fontSize:12, opacity:.8, marginTop:3 }}>Completa los datos del conductor</div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,.2)", border:"none",
            borderRadius:8, width:32, height:32, cursor:"pointer", color:COLORS.white, fontSize:14 }}>✕</button>
        </div>

        <div style={{ padding:"22px 24px", display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ fontSize:13, fontWeight:700, color:COLORS.gray700 }}>👤 Datos personales</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div style={{ gridColumn:"1/-1" }}>
              <label style={lbl}>Nombre completo *</label>
              <input style={inp("name")} value={form.name} onChange={e=>set("name",e.target.value)} placeholder="Ej. Juan García López" />{err("name")}
            </div>
            <div>
              <label style={lbl}>Teléfono *</label>
              <input style={inp("phone")} value={form.phone} onChange={e=>set("phone",e.target.value)} placeholder="+52 55 0000-0000" />{err("phone")}
            </div>
            <div>
              <label style={lbl}>Experiencia *</label>
              <input style={inp("experience")} value={form.experience} onChange={e=>set("experience",e.target.value)} placeholder="Ej. 5 años" />{err("experience")}
            </div>
          </div>

          <div style={{ fontSize:13, fontWeight:700, color:COLORS.gray700 }}>🪪 Datos laborales</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <label style={lbl}>Licencia</label>
              <select style={{...inp("license"),background:COLORS.white}} value={form.license} onChange={e=>set("license",e.target.value)}>
                {["CDL-A","CDL-B","CDL-C","HAZMAT"].map(l=><option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Estado inicial</label>
              <select style={{...inp("status"),background:COLORS.white}} value={form.status} onChange={e=>set("status",e.target.value)}>
                {["Activo","En Espera","Descanso"].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ gridColumn:"1/-1" }}>
              <label style={lbl}>Vehículo asignado (opcional)</label>
              <input style={inp("truck")} value={form.truck} onChange={e=>set("truck",e.target.value)} placeholder="Ej. TRK-009" />
            </div>
          </div>

          <div style={{ display:"flex", gap:10, marginTop:4 }}>
            <button onClick={submit} style={{ flex:1, padding:12, borderRadius:12,
              background:`linear-gradient(135deg,${COLORS.sky},${COLORS.skyDark})`,
              border:"none", color:COLORS.white, fontWeight:700,
              cursor:"pointer", fontSize:14, fontFamily:"inherit",
              boxShadow:`0 4px 14px ${COLORS.sky}44` }}>✅ Registrar conductor</button>
            <button onClick={onClose} style={{ padding:"12px 18px", borderRadius:12,
              background:COLORS.gray50, border:`1px solid ${COLORS.gray200}`,
              color:COLORS.gray600, fontWeight:600, cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Vista principal ── */
export default function ConductoresView({ search }) {
  const [drivers, setDrivers] = useState(DRIVERS_DATA);
  const [selected, setSelected] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [filterStatus, setFilterStatus] = useState("Todos");

  const filtered = drivers.filter(d => {
    const q = search.toLowerCase();
    const ok = !q || d.name.toLowerCase().includes(q) || d.id.toLowerCase().includes(q)
      || d.truck.toLowerCase().includes(q) || d.license.toLowerCase().includes(q);
    return ok && (filterStatus === "Todos" || d.status === filterStatus);
  });

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16, height:"100%", overflow:"hidden" }}>
      {selected && <DriverModal driver={selected} onClose={()=>setSelected(null)} onSave={updated=>setDrivers(p=>p.map(d=>d.id===updated.id?updated:d))} />}
      {showNew  && <NewDriverModal onClose={()=>setShowNew(false)} onSave={nd=>setDrivers(p=>[nd,...p])} />}

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10, flexShrink:0 }}>
        <div>
          <h2 style={{ fontSize:20, fontWeight:800, color:COLORS.gray900, margin:0 }}>👥 Conductores</h2>
          <p style={{ fontSize:13, color:COLORS.gray500, marginTop:4 }}>{drivers.length} conductores registrados</p>
        </div>
        <button onClick={()=>setShowNew(true)} style={{
          background:`linear-gradient(135deg,${COLORS.sky},${COLORS.skyDark})`,
          color:COLORS.white, border:"none", borderRadius:10,
          padding:"10px 18px", fontSize:13, fontWeight:700,
          cursor:"pointer", display:"flex", alignItems:"center", gap:6,
          boxShadow:`0 4px 12px ${COLORS.sky}44`, fontFamily:"inherit" }}>
          ➕ Nuevo Conductor
        </button>
      </div>

      {/* Stats */}
      <div style={{ display:"flex", gap:12, flexWrap:"wrap", flexShrink:0 }}>
        {[
          {label:"Total",         val:drivers.length,                                          color:COLORS.sky},
          {label:"Activos",       val:drivers.filter(d=>d.status==="Activo").length,           color:COLORS.green},
          {label:"En Alerta",     val:drivers.filter(d=>d.status==="Alerta").length,           color:COLORS.red},
          {label:"Rating prom.",  val:(drivers.reduce((s,d)=>s+d.rating,0)/drivers.length).toFixed(1), color:COLORS.amber},
        ].map(s=>(
          <div key={s.label} style={{ flex:"1 1 110px", minWidth:100,
            background:COLORS.white, border:`1px solid ${COLORS.gray100}`,
            borderRadius:14, padding:"13px 16px" }}>
            <div style={{ fontSize:22, fontWeight:800, color:s.color }}>{s.val}</div>
            <div style={{ fontSize:11, color:COLORS.gray500, marginTop:2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", flexShrink:0, alignItems:"center" }}>
        {["Todos","Activo","En Espera","Alerta","Descanso"].map(s=>(
          <button key={s} onClick={()=>setFilterStatus(s)} style={{
            padding:"6px 13px", borderRadius:20, fontSize:11, fontWeight:600,
            cursor:"pointer", border:"none",
            background:filterStatus===s ? COLORS.sky : COLORS.gray100,
            color:filterStatus===s ? COLORS.white : COLORS.gray500,
            fontFamily:"inherit" }}>{s}</button>
        ))}
        <span style={{ marginLeft:"auto", fontSize:11, color:COLORS.gray400 }}>
          {filtered.length} conductor{filtered.length!==1?"es":""}
        </span>
      </div>

      {/* Grid responsive */}
      <div style={{
        overflowY:"auto",
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill, minmax(210px, 1fr))",
        gap:14,
        paddingBottom:20,
        alignContent:"start",
      }}>
        {filtered.map(driver=>(
          <div key={driver.id} onClick={()=>setSelected(driver)} style={{
            background:COLORS.white, border:`1px solid ${COLORS.gray100}`,
            borderRadius:16, padding:18, cursor:"pointer", transition:"all .2s" }}
            onMouseEnter={e=>{e.currentTarget.style.border=`1px solid ${COLORS.sky}`;e.currentTarget.style.boxShadow=`0 4px 20px ${COLORS.sky}20`;}}
            onMouseLeave={e=>{e.currentTarget.style.border=`1px solid ${COLORS.gray100}`;e.currentTarget.style.boxShadow="none";}}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
              <div style={{ width:48, height:48, borderRadius:13,
                background:`linear-gradient(135deg,${COLORS.sky},${COLORS.skyDark})`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:17, fontWeight:800, color:COLORS.white }}>{driver.avatar}</div>
              <span style={{ padding:"3px 10px", borderRadius:20, fontSize:10, fontWeight:600,
                background:DRIVER_STATUS_BG[driver.status]||COLORS.gray100,
                color:DRIVER_STATUS_COLORS[driver.status]||COLORS.gray500 }}>{driver.status}</span>
            </div>
            <div style={{ fontSize:14, fontWeight:700, color:COLORS.gray900 }}>{driver.name}</div>
            <div style={{ fontSize:11, color:COLORS.gray500, marginTop:2 }}>{driver.id} · {driver.license}</div>
            <div style={{ marginTop:12, display:"grid", gridTemplateColumns:"1fr 1fr", gap:7 }}>
              <div style={{ background:COLORS.gray50, borderRadius:8, padding:"7px 9px" }}>
                <div style={{ fontSize:10, color:COLORS.gray400 }}>⭐ Rating</div>
                <div style={{ fontSize:14, fontWeight:800, color:COLORS.amber }}>{driver.rating}</div>
              </div>
              <div style={{ background:COLORS.gray50, borderRadius:8, padding:"7px 9px" }}>
                <div style={{ fontSize:10, color:COLORS.gray400 }}>✅ A tiempo</div>
                <div style={{ fontSize:14, fontWeight:800, color:COLORS.green }}>{driver.onTime}%</div>
              </div>
            </div>
            <div style={{ marginTop:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ fontSize:10, color:COLORS.gray400 }}>Puntualidad</span>
                <span style={{ fontSize:10, color:COLORS.gray500 }}>{driver.trips} viajes</span>
              </div>
              <ProgressBar value={driver.onTime} color={COLORS.green} height={5} />
            </div>
            <div style={{ marginTop:10, display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontSize:11, color:COLORS.gray500 }}>🚛 {driver.truck||"—"}</span>
              <span style={{ fontSize:11, color:COLORS.gray400 }}>{driver.experience}</span>
            </div>
          </div>
        ))}
        {filtered.length===0 && (
          <div style={{ gridColumn:"1/-1", textAlign:"center", padding:50, color:COLORS.gray300 }}>
            <div style={{ fontSize:44 }}>👥</div>
            <div style={{ fontSize:14, marginTop:10, fontWeight:500 }}>Sin conductores</div>
            <button onClick={()=>setShowNew(true)} style={{
              marginTop:14, padding:"10px 20px", borderRadius:10,
              background:`linear-gradient(135deg,${COLORS.sky},${COLORS.skyDark})`,
              border:"none", color:COLORS.white, fontWeight:600,
              cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>➕ Agregar conductor</button>
          </div>
        )}
      </div>
    </div>
  );
}
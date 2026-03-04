import { useState } from "react";
import { COLORS } from "../data/mockData";

const REPORTS = [
  { id:"RPT-001", name:"Reporte Operacional Semanal",  type:"Operaciones", date:"2024-01-15", size:"2.4 MB", status:"Listo",     icon:"📊" },
  { id:"RPT-002", name:"Análisis de Combustible Q4",   type:"Eficiencia",  date:"2024-01-14", size:"1.8 MB", status:"Listo",     icon:"⛽" },
  { id:"RPT-003", name:"Desempeño de Conductores",     type:"RR.HH.",      date:"2024-01-13", size:"3.1 MB", status:"Listo",     icon:"👥" },
  { id:"RPT-004", name:"Reporte de Incidencias",       type:"Seguridad",   date:"2024-01-12", size:"0.9 MB", status:"Listo",     icon:"🚨" },
  { id:"RPT-005", name:"KPIs Mensuales Diciembre",     type:"Gerencial",   date:"2024-01-10", size:"4.2 MB", status:"Listo",     icon:"📈" },
  { id:"RPT-006", name:"Reporte de Rutas Optimizadas", type:"Logística",   date:"2024-01-08", size:"2.7 MB", status:"Listo",     icon:"🗺️" },
  { id:"RPT-007", name:"Costos Operativos Enero",      type:"Finanzas",    date:"Generando…",  size:"—",     status:"Generando", icon:"💰" },
];

const REPORT_TYPES = [
  { id:"kpis",      label:"📊 KPIs Ejecutivos",  desc:"Métricas clave de negocio para gerencia",       color:COLORS.sky },
  { id:"ops",       label:"🚛 Operaciones",       desc:"Detalle de entregas, rutas y vehículos",        color:COLORS.skyDark },
  { id:"drivers",   label:"👥 Conductores",       desc:"Desempeño individual y comparativo",            color:COLORS.green },
  { id:"fuel",      label:"⛽ Combustible",        desc:"Consumo y eficiencia por vehículo",             color:COLORS.amber },
  { id:"incidents", label:"🚨 Incidencias",        desc:"Alertas, retrasos y problemas",                color:COLORS.red },
  { id:"finance",   label:"💰 Financiero",         desc:"Costos, ingresos y márgenes",                  color:"#7C3AED" },
];

export default function ReportesView({ search }) {
  const [generating, setGenerating] = useState(null);
  const [toast,      setToast]      = useState(null);
  const [dateFrom,   setDateFrom]   = useState("2024-01-01");
  const [dateTo,     setDateTo]     = useState("2024-01-31");
  const [format,     setFormat]     = useState("PDF");

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function handleGenerate(type) {
    setGenerating(type.id);
    setTimeout(() => {
      setGenerating(null);
      showToast(`✅ ${type.label} generado exitosamente`);
    }, 2000);
  }

  const filtered = REPORTS.filter(r => {
    const q = search.toLowerCase();
    return !q || r.name.toLowerCase().includes(q) || r.type.toLowerCase().includes(q) || r.id.toLowerCase().includes(q);
  });

  const inputStyle = {
    padding:"8px 12px", borderRadius:10,
    border:`1px solid ${COLORS.gray200}`,
    fontSize:13, color:COLORS.gray700, outline:"none",
    fontFamily:"inherit", background:COLORS.white,
    width:"100%", boxSizing:"border-box",
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:18, height:"100%", overflowY:"auto", paddingBottom:20 }}>

      {/* Toast */}
      {toast && (
        <div style={{ position:"fixed", top:80, right:20, zIndex:9999,
          background:COLORS.gray900, color:COLORS.white,
          padding:"12px 20px", borderRadius:12, fontSize:13, fontWeight:500,
          boxShadow:"0 10px 40px rgba(0,0,0,0.3)",
          border:`1px solid ${COLORS.gray700}`, animation:"slideDown .2s ease" }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ flexShrink:0 }}>
        <h2 style={{ fontSize:20, fontWeight:800, color:COLORS.gray900, margin:0 }}>📋 Reportes</h2>
        <p style={{ fontSize:13, color:COLORS.gray500, marginTop:4 }}>Genera y descarga reportes de operaciones</p>
      </div>

      {/* ── Sección: Generar nuevo reporte ── */}
      <div style={{ background:COLORS.white, border:`1px solid ${COLORS.gray100}`,
        borderRadius:16, overflow:"hidden", flexShrink:0 }}>
        <div style={{ padding:"14px 20px", borderBottom:`1px solid ${COLORS.gray100}` }}>
          <div style={{ fontSize:14, fontWeight:700, color:COLORS.gray800 }}>⚡ Generar Nuevo Reporte</div>
        </div>
        <div style={{ padding:"18px 20px", display:"flex", flexDirection:"column", gap:16 }}>

          {/* Rango de fechas + formato — responsive flex wrap */}
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", alignItems:"flex-end" }}>
            <div style={{ flex:"1 1 130px", minWidth:120 }}>
              <div style={{ fontSize:11, fontWeight:600, color:COLORS.gray500, marginBottom:6 }}>📅 Desde</div>
              <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} style={inputStyle}/>
            </div>
            <div style={{ flex:"1 1 130px", minWidth:120 }}>
              <div style={{ fontSize:11, fontWeight:600, color:COLORS.gray500, marginBottom:6 }}>📅 Hasta</div>
              <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)} style={inputStyle}/>
            </div>
            <div style={{ flex:"1 1 100px", minWidth:90 }}>
              <div style={{ fontSize:11, fontWeight:600, color:COLORS.gray500, marginBottom:6 }}>📄 Formato</div>
              <select value={format} onChange={e=>setFormat(e.target.value)} style={inputStyle}>
                <option>PDF</option><option>Excel</option><option>CSV</option>
              </select>
            </div>
          </div>

          {/* Tipos de reporte — grid responsive */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:12 }}>
            {REPORT_TYPES.map(type=>(
              <div key={type.id} style={{ background:COLORS.gray50, border:`1px solid ${COLORS.gray100}`,
                borderRadius:12, padding:"14px 16px",
                display:"flex", flexDirection:"column", gap:10 }}>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:COLORS.gray900 }}>{type.label}</div>
                  <div style={{ fontSize:11, color:COLORS.gray500, marginTop:4 }}>{type.desc}</div>
                </div>
                <button
                  onClick={()=>handleGenerate(type)}
                  disabled={generating===type.id}
                  style={{ padding:"8px", borderRadius:8, border:"none",
                    background:generating===type.id?COLORS.gray200:`${type.color}15`,
                    color:generating===type.id?COLORS.gray400:type.color,
                    fontWeight:600, cursor:generating===type.id?"default":"pointer",
                    fontSize:12, fontFamily:"inherit", transition:"all .2s" }}>
                  {generating===type.id ? "⏳ Generando…" : `⬇️ Generar ${format}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sección: Reportes recientes ── */}
      <div style={{ background:COLORS.white, border:`1px solid ${COLORS.gray100}`,
        borderRadius:16, overflow:"hidden", flexShrink:0 }}>
        <div style={{ padding:"14px 20px", borderBottom:`1px solid ${COLORS.gray100}`,
          display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
          <div style={{ fontSize:14, fontWeight:700, color:COLORS.gray800 }}>📁 Reportes Recientes</div>
          <span style={{ fontSize:12, color:COLORS.gray400 }}>{filtered.length} reportes</span>
        </div>

        {/* Tabla con scroll horizontal en pantallas pequeñas */}
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", minWidth:560 }}>
            <thead>
              <tr style={{ background:COLORS.gray50, borderBottom:`1px solid ${COLORS.gray100}` }}>
                {["ID","Nombre","Tipo","Fecha","Tamaño","Estado",""].map(h=>(
                  <th key={h} style={{ padding:"11px 16px", textAlign:"left", fontSize:11,
                    fontWeight:700, color:COLORS.gray500, whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(r=>(
                <tr key={r.id}
                  style={{ borderBottom:`1px solid ${COLORS.gray50}`, transition:"background .15s" }}
                  onMouseEnter={e=>e.currentTarget.style.background=COLORS.gray50}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <td style={{ padding:"12px 16px", fontSize:12, fontWeight:600, color:COLORS.sky }}>{r.id}</td>
                  <td style={{ padding:"12px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:16 }}>{r.icon}</span>
                      <div style={{ fontSize:13, fontWeight:500, color:COLORS.gray800 }}>{r.name}</div>
                    </div>
                  </td>
                  <td style={{ padding:"12px 16px" }}>
                    <span style={{ fontSize:11, background:COLORS.gray100, color:COLORS.gray500,
                      padding:"3px 10px", borderRadius:8, fontWeight:600, whiteSpace:"nowrap" }}>{r.type}</span>
                  </td>
                  <td style={{ padding:"12px 16px", fontSize:12, color:COLORS.gray600, whiteSpace:"nowrap" }}>{r.date}</td>
                  <td style={{ padding:"12px 16px", fontSize:12, color:COLORS.gray600 }}>{r.size}</td>
                  <td style={{ padding:"12px 16px" }}>
                    {r.status==="Listo"
                      ? <span style={{ fontSize:11, background:"#ECFDF5", color:COLORS.green, padding:"3px 10px", borderRadius:8, fontWeight:600 }}>✅ Listo</span>
                      : <span style={{ fontSize:11, background:"#FFF3C7", color:COLORS.amber, padding:"3px 10px", borderRadius:8, fontWeight:600 }}>⏳ Generando</span>
                    }
                  </td>
                  <td style={{ padding:"12px 16px" }}>
                    {r.status==="Listo" && (
                      <div style={{ display:"flex", gap:6 }}>
                        <button
                          onClick={()=>showToast(`📄 Descargando ${r.name}…`)}
                          style={{ padding:"5px 10px", borderRadius:7,
                            background:`${COLORS.sky}12`, border:`1px solid ${COLORS.sky}30`,
                            color:COLORS.sky, fontSize:11, fontWeight:600,
                            cursor:"pointer", fontFamily:"inherit" }}>⬇️</button>
                        <button style={{ padding:"5px 10px", borderRadius:7,
                          background:COLORS.gray50, border:`1px solid ${COLORS.gray200}`,
                          color:COLORS.gray500, fontSize:11, cursor:"pointer", fontFamily:"inherit" }}>👁️</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length===0 && (
            <div style={{ textAlign:"center", padding:"40px 20px", color:COLORS.gray300 }}>
              <div style={{ fontSize:40 }}>📋</div>
              <div style={{ fontSize:14, marginTop:10, fontWeight:500 }}>No se encontraron reportes</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
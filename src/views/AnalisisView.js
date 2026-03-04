import { useState } from "react";
import { COLORS, ANALYTICS_DATA, INITIAL_TRUCKS } from "../data/mockData";
import { Card, CardHeader, PageHeader, MiniChart } from "../components/UI";

function BarChart({ data, field, color, height = 120 }) {
  const max = Math.max(...data.map(d => d[field]));
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ fontSize: 9, color: COLORS.gray400 }}>{d[field]}</div>
          <div
            title={`${d.day || d.mes}: ${d[field]}`}
            style={{
              width: "100%",
              height: `${(d[field] / max) * (height - 24)}px`,
              background: i === data.length - 1
                ? `linear-gradient(180deg, ${color}, ${color}99)`
                : `${color}44`,
              borderRadius: "5px 5px 0 0",
              minHeight: 4,
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = color}
            onMouseLeave={e => e.currentTarget.style.background = i === data.length - 1 ? `linear-gradient(180deg, ${color}, ${color}99)` : `${color}44`}
          />
          <div style={{ fontSize: 9, color: COLORS.gray400 }}>{d.day || d.mes}</div>
        </div>
      ))}
    </div>
  );
}

function LineChart({ data, fields, colors, height = 120 }) {
  const allVals = fields.flatMap(f => data.map(d => d[f]));
  const max = Math.max(...allVals);
  const min = Math.min(...allVals);
  const range = max - min || 1;
  const w = 400;

  const getPoints = (field) => data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = height - ((d[field] - min) / range) * (height - 10);
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none">
      <defs>
        {fields.map((f, i) => (
          <linearGradient key={f} id={`lg-${f}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors[i]} stopOpacity="0.25" />
            <stop offset="100%" stopColor={colors[i]} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>
      {fields.map((f, i) => {
        const points = data.map((d, j) => {
          const x = (j / (data.length - 1)) * w;
          const y = height - ((d[f] - min) / range) * (height - 10);
          return [x, y];
        });
        const pathD = points.map(([x, y], j) => `${j === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
        const areaD = `${pathD} L ${w} ${height} L 0 ${height} Z`;

        return (
          <g key={f}>
            <path d={areaD} fill={`url(#lg-${f})`} />
            <path d={pathD} fill="none" stroke={colors[i]} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {points.map(([x, y], j) => (
              <circle key={j} cx={x} cy={y} r="3" fill={colors[i]} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export default function AnalisisView() {
  const [period, setPeriod] = useState("weekly");
  const data = ANALYTICS_DATA[period];

  const kpis = [
    { label: "Entregas completadas", val: period === "weekly" ? "99" : "1,931", change: "+12%", color: COLORS.sky, up: true },
    { label: "KM recorridos", val: period === "weekly" ? "35,800" : "689,000", change: "+8%", color: COLORS.skyDark, up: true },
    { label: "Costo total", val: period === "weekly" ? "$233K" : "$814K", change: "-3%", color: COLORS.amber, up: false },
    { label: "Costo por km", val: "$6.52", change: "-5%", color: COLORS.green, up: false },
    { label: "Puntualidad", val: "91.5%", change: "+2.1%", color: COLORS.green, up: true },
    { label: "Incidencias", val: period === "weekly" ? "3" : "14", change: "-40%", color: COLORS.red, up: false },
  ];

  const trucks = INITIAL_TRUCKS;
  const avgFuelEff = [8.2, 7.9, 8.5, 8.1, 7.8, 8.4, 8.7];
  const avgSpeed = [82, 79, 85, 81, 78, 84, 87];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, height: "100%", overflowY: "auto" }}>
      <PageHeader
        title="📈 Análisis"
        subtitle="Métricas de rendimiento y eficiencia de flota"
        action={
          <div style={{ display: "flex", gap: 6, background: COLORS.gray100, borderRadius: 10, padding: 4 }}>
            {["weekly", "monthly"].map(p => (
              <button key={p} onClick={() => setPeriod(p)} style={{
                padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none",
                background: period === p ? COLORS.white : "transparent",
                color: period === p ? COLORS.gray900 : COLORS.gray400,
                boxShadow: period === p ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                fontFamily: "inherit",
              }}>{p === "weekly" ? "Semana" : "Mes"}</button>
            ))}
          </div>
        }
      />

      {/* KPI grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 14, flexShrink: 0 }}>
        {kpis.map(k => (
          <div key={k.label} style={{ background: COLORS.white, border: `1px solid ${COLORS.gray100}`, borderRadius: 14, padding: "16px 18px" }}>
            <div style={{ fontSize: 12, color: COLORS.gray500, marginBottom: 8 }}>{k.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: k.color }}>{k.val}</div>
            <div style={{ fontSize: 11, marginTop: 4, color: k.up ? COLORS.green : COLORS.red, fontWeight: 600 }}>
              {k.up ? "↑" : "↓"} {k.change} vs anterior
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
        <Card>
          <CardHeader title="📦 Entregas por período" action={
            <div style={{ fontSize: 11, color: COLORS.sky, background: `${COLORS.sky}12`, padding: "3px 8px", borderRadius: 8, fontWeight: 600 }}>
              Total: {data.reduce((s, d) => s + d.entregas, 0)}
            </div>
          } />
          <div style={{ padding: "16px 20px" }}>
            <BarChart data={data} field="entregas" color={COLORS.sky} height={140} />
          </div>
        </Card>

        <Card>
          <CardHeader title="💰 Costo por km ($/km)" />
          <div style={{ padding: "16px 20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["CDMX→GDL", "MTY→CDMX", "CUN→CDMX", "VER→PUE"].map((r, i) => {
                const vals = [5.2, 6.8, 7.1, 4.9];
                return (
                  <div key={r}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: COLORS.gray600 }}>{r}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.gray800 }}>${vals[i]}/km</span>
                    </div>
                    <div style={{ background: COLORS.gray100, borderRadius: 3, height: 6, overflow: "hidden" }}>
                      <div style={{ width: `${(vals[i] / 8) * 100}%`, height: "100%", background: i === 2 ? COLORS.amber : COLORS.sky, borderRadius: 3 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Second row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20, paddingBottom: 20 }}>
        <Card>
          <CardHeader title="⛽ Eficiencia de combustible" />
          <div style={{ padding: "16px 20px" }}>
            <MiniChart data={avgFuelEff} color={COLORS.green} height={60} />
            <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
              <div><div style={{ fontSize: 10, color: COLORS.gray400 }}>Promedio</div><div style={{ fontSize: 18, fontWeight: 800, color: COLORS.green }}>8.2 L/100km</div></div>
              <div><div style={{ fontSize: 10, color: COLORS.gray400 }}>Mejor</div><div style={{ fontSize: 18, fontWeight: 800, color: COLORS.sky }}>7.8</div></div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="⚡ Velocidad promedio" />
          <div style={{ padding: "16px 20px" }}>
            <MiniChart data={avgSpeed} color={COLORS.sky} height={60} />
            <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
              <div><div style={{ fontSize: 10, color: COLORS.gray400 }}>Promedio</div><div style={{ fontSize: 18, fontWeight: 800, color: COLORS.sky }}>83 km/h</div></div>
              <div><div style={{ fontSize: 10, color: COLORS.gray400 }}>Máx</div><div style={{ fontSize: 18, fontWeight: 800, color: COLORS.amber }}>98 km/h</div></div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="🚨 Incidencias por tipo" />
          <div style={{ padding: "16px 20px" }}>
            {[
              { type: "Combustible bajo", count: 3, color: COLORS.red },
              { type: "Retrasos", count: 8, color: COLORS.amber },
              { type: "Mantenimiento", count: 2, color: COLORS.purple },
              { type: "Ruta desviada", count: 1, color: COLORS.sky },
            ].map(inc => (
              <div key={inc.type} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: inc.color }} />
                  <span style={{ fontSize: 12, color: COLORS.gray600 }}>{inc.type}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: inc.color }}>{inc.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
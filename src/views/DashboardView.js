import { COLORS, INITIAL_TRUCKS, ANALYTICS_DATA } from "../data/mockData";
import { StatCard, Card, CardHeader, ProgressBar, Badge, MiniChart, PrimaryButton } from "../components/UI";

function KpiRow({ trucks }) {
  const enRuta = trucks.filter(t => t.status === "En Ruta").length;
  const entregados = trucks.filter(t => t.status === "Entregado").length;
  const alertas = trucks.filter(t => t.status === "Alerta").length;
  const avgFuel = Math.round(trucks.reduce((s, t) => s + t.fuel, 0) / trucks.length);

  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <StatCard icon="🚛" label="Total Flota" value={trucks.length} sub="+2 esta semana" color={COLORS.sky} trend={1} />
      <StatCard icon="🛣️" label="En Ruta" value={enRuta} sub="en movimiento ahora" color={COLORS.sky} trend={0} />
      <StatCard icon="✅" label="Entregas Hoy" value={entregados + 14} sub="+3 vs ayer" color={COLORS.green} trend={1} />
      <StatCard icon="⚠️" label="Alertas Activas" value={alertas} sub="requieren atención" color={COLORS.red} trend={-1} />
      <StatCard icon="⛽" label="Comb. Promedio" value={`${avgFuel}%`} sub="flota completa" color={COLORS.amber} trend={0} />
    </div>
  );
}

function BarChart({ data, field, color, label }) {
  const max = Math.max(...data.map(d => d[field]));
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 100, padding: "0 4px" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ fontSize: 10, color: COLORS.gray400 }}>{d[field] > 0 ? d[field] : ""}</div>
          <div style={{
            width: "100%",
            height: `${(d[field] / max) * 80}px`,
            background: i === data.length - 1
              ? `linear-gradient(180deg, ${color}, ${color}88)`
              : `${color}33`,
            borderRadius: "4px 4px 0 0",
            transition: "height 0.5s ease",
            minHeight: 4,
          }} />
          <div style={{ fontSize: 10, color: COLORS.gray400 }}>{d.day || d.mes}</div>
        </div>
      ))}
    </div>
  );
}

export default function DashboardView({ trucks, onNavigate }) {
  const recentActivity = [
    { icon: "✅", text: "TRK-002 completó entrega en Guadalajara", time: "12 min", color: COLORS.green },
    { icon: "⚠️", text: "TRK-005 combustible bajo (23%)", time: "28 min", color: COLORS.red },
    { icon: "🚛", text: "TRK-008 inició ruta Mérida → Veracruz", time: "45 min", color: COLORS.sky },
    { icon: "🔧", text: "TRK-007 enviado a mantenimiento", time: "1h 10m", color: COLORS.purple },
    { icon: "📦", text: "CRG-2024-003 listo para despacho", time: "1h 30m", color: COLORS.amber },
    { icon: "🛣️", text: "Ruta RT-004 optimizada: -15 min", time: "2h", color: COLORS.sky },
  ];

  const topDrivers = [
    { name: "Sofía Cruz", trips: 167, onTime: 96, avatar: "SC" },
    { name: "María López", trips: 218, onTime: 97, avatar: "ML" },
    { name: "Rosa Jiménez", trips: 298, onTime: 95, avatar: "RJ" },
    { name: "Carlos Mendoza", trips: 342, onTime: 94, avatar: "CM" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, height: "100%", overflowY: "auto" }}>
      <KpiRow trucks={trucks} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
        {/* Weekly deliveries chart */}
        <Card>
          <CardHeader title="📦 Entregas esta semana" action={
            <span style={{ fontSize: 11, color: COLORS.green, fontWeight: 600, background: COLORS.green + "15", padding: "3px 8px", borderRadius: 8 }}>
              ↑ 12% vs anterior
            </span>
          } />
          <div style={{ padding: "16px 20px" }}>
            <BarChart data={ANALYTICS_DATA.weekly} field="entregas" color={COLORS.sky} label="Entregas" />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.gray900 }}>99</div>
                <div style={{ fontSize: 11, color: COLORS.gray400 }}>Total entregas</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.sky }}>35,800</div>
                <div style={{ fontSize: 11, color: COLORS.gray400 }}>KM recorridos</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.green }}>92%</div>
                <div style={{ fontSize: 11, color: COLORS.gray400 }}>A tiempo</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Fleet status */}
        <Card>
          <CardHeader title="🚛 Estado de Flota" />
          <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "En Ruta", count: trucks.filter(t => t.status === "En Ruta").length, total: trucks.length, color: COLORS.sky },
              { label: "Entregado", count: trucks.filter(t => t.status === "Entregado").length, total: trucks.length, color: COLORS.green },
              { label: "En Espera", count: trucks.filter(t => t.status === "En Espera").length, total: trucks.length, color: COLORS.amber },
              { label: "Mantenimiento", count: trucks.filter(t => t.status === "Mantenimiento").length, total: trucks.length, color: COLORS.purple },
              { label: "Alerta", count: trucks.filter(t => t.status === "Alerta").length, total: trucks.length, color: COLORS.red },
            ].map(s => (
              <div key={s.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, color: COLORS.gray600 }}>{s.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.count}/{s.total}</span>
                </div>
                <ProgressBar value={(s.count / s.total) * 100} color={s.color} height={8} />
              </div>
            ))}

            {/* Donut-like summary */}
            <div style={{
              marginTop: 8, padding: 14,
              background: `linear-gradient(135deg, ${COLORS.sky}08, ${COLORS.skyDeep}05)`,
              borderRadius: 12, border: `1px solid ${COLORS.sky}22`,
            }}>
              <div style={{ fontSize: 12, color: COLORS.gray500, marginBottom: 4 }}>Eficiencia global</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.sky }}>91.5%</div>
              <div style={{ fontSize: 11, color: COLORS.green }}>↑ 3.2% vs mes anterior</div>
            </div>
          </div>
        </Card>

        {/* Activity feed */}
        <Card>
          <CardHeader title="⚡ Actividad Reciente" />
          <div style={{ padding: "8px 0" }}>
            {recentActivity.map((a, i) => (
              <div key={i} style={{
                padding: "10px 18px",
                borderBottom: i < recentActivity.length - 1 ? `1px solid ${COLORS.gray50}` : "none",
                display: "flex", gap: 10, alignItems: "flex-start",
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                  background: `${a.color}15`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14,
                }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: COLORS.gray700, lineHeight: 1.4 }}>{a.text}</div>
                  <div style={{ fontSize: 10, color: COLORS.gray400, marginTop: 2 }}>Hace {a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top drivers + Monthly trend */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, paddingBottom: 20 }}>
        <Card>
          <CardHeader title="⭐ Mejores Conductores" action={
            <button onClick={() => onNavigate("conductores")} style={{ fontSize: 12, color: COLORS.sky, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>Ver todos →</button>
          } />
          <div style={{ padding: "8px 0" }}>
            {topDrivers.map((d, i) => (
              <div key={i} style={{ padding: "12px 18px", display: "flex", alignItems: "center", gap: 12, borderBottom: i < topDrivers.length - 1 ? `1px solid ${COLORS.gray50}` : "none" }}>
                <div style={{
                  width: 18, height: 18, borderRadius: "50%",
                  background: i === 0 ? COLORS.amber : COLORS.gray200,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700, color: i === 0 ? COLORS.white : COLORS.gray500,
                }}>{i + 1}</div>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.sky}, ${COLORS.skyDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: COLORS.white }}>{d.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.gray800 }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: COLORS.gray400 }}>{d.trips} viajes · {d.onTime}% a tiempo</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.amber }}>{"★".repeat(Math.round(d.onTime / 20))}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="📈 Tendencia Mensual" />
          <div style={{ padding: "16px 20px" }}>
            <BarChart data={ANALYTICS_DATA.monthly} field="entregas" color={COLORS.skyDark} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 16 }}>
              {[
                { label: "Enero", val: "342", sub: "entregas", color: COLORS.sky },
                { label: "Km totales", val: "122K", sub: "recorridos", color: COLORS.skyDark },
                { label: "Costo/km", val: "$6.67", sub: "promedio", color: COLORS.amber },
              ].map(m => (
                <div key={m.label} style={{ textAlign: "center", padding: 10, background: COLORS.gray50, borderRadius: 10 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: m.color }}>{m.val}</div>
                  <div style={{ fontSize: 10, color: COLORS.gray500, marginTop: 2 }}>{m.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
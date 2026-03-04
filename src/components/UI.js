import { COLORS, STATUS_COLORS, STATUS_BG } from "../data/mockData";

export function StatCard({ icon, label, value, sub, color, trend }) {
  return (
    <div style={{
      background: COLORS.white,
      border: `1px solid ${COLORS.gray100}`,
      borderRadius: 16,
      padding: "20px 22px",
      flex: 1,
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, background: `${color}0D`, borderRadius: "50%" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{ width: 42, height: 42, background: `${color}15`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{icon}</div>
        <span style={{ fontSize: 13, color: COLORS.gray500, fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.gray900, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: trend > 0 ? COLORS.green : trend < 0 ? COLORS.red : COLORS.gray400, marginTop: 4 }}>
        {trend > 0 ? "↑" : trend < 0 ? "↓" : ""} {sub}
      </div>
    </div>
  );
}

export function Badge({ status }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, borderRadius: 20,
      padding: "3px 10px",
      background: STATUS_BG[status] || COLORS.gray100,
      color: STATUS_COLORS[status] || COLORS.gray500,
    }}>{status}</span>
  );
}

export function PageHeader({ title, subtitle, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexShrink: 0 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: COLORS.gray900, margin: 0 }}>{title}</h2>
        {subtitle && <p style={{ fontSize: 13, color: COLORS.gray500, marginTop: 4 }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, style = {} }) {
  return (
    <div style={{
      background: COLORS.white,
      border: `1px solid ${COLORS.gray100}`,
      borderRadius: 16,
      ...style,
    }}>
      {children}
    </div>
  );
}

export function CardHeader({ title, action }) {
  return (
    <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.gray100}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.gray800 }}>{title}</div>
      {action}
    </div>
  );
}

export function PrimaryButton({ children, onClick, icon, small }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, ${COLORS.sky}, ${COLORS.skyDark})`,
        color: COLORS.white,
        border: "none",
        borderRadius: 10,
        padding: small ? "7px 14px" : "10px 20px",
        fontSize: small ? 12 : 13,
        fontWeight: 600,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6,
        boxShadow: `0 4px 12px ${COLORS.sky}44`,
        transition: "all 0.2s",
        fontFamily: "inherit",
      }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick, icon, small }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: COLORS.white,
        color: COLORS.gray700,
        border: `1px solid ${COLORS.gray200}`,
        borderRadius: 10,
        padding: small ? "7px 14px" : "10px 20px",
        fontSize: small ? 12 : 13,
        fontWeight: 500,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6,
        transition: "all 0.2s",
        fontFamily: "inherit",
      }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

export function ProgressBar({ value, color, height = 6 }) {
  return (
    <div style={{ background: COLORS.gray100, borderRadius: 4, height, overflow: "hidden" }}>
      <div style={{
        width: `${Math.min(100, value)}%`,
        height: "100%",
        background: color || `linear-gradient(90deg, ${COLORS.sky}, ${COLORS.skyLight})`,
        borderRadius: 4,
        transition: "width 0.6s ease",
      }} />
    </div>
  );
}

export function Avatar({ initials, color = COLORS.sky, size = 36 }) {
  return (
    <div style={{
      width: size, height: size,
      borderRadius: size / 3,
      background: `linear-gradient(135deg, ${color}, ${COLORS.skyDark})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.35, fontWeight: 700, color: COLORS.white,
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

export function MiniChart({ data, color = COLORS.sky, height = 40 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = height - ((v - min) / range) * (height - 4);
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`fill-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${height} ${points} ${w},${height}`}
        fill={`url(#fill-${color.replace('#','')})`}
      />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
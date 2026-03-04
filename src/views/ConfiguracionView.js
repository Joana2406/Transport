import { useState } from "react";
import { COLORS } from "../data/mockData";
import { Card, CardHeader, PageHeader, PrimaryButton } from "../components/UI";

function Toggle({ value, onChange, label, desc }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "14px 0", borderBottom: `1px solid ${COLORS.gray50}` }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.gray800 }}>{label}</div>
        {desc && <div style={{ fontSize: 11, color: COLORS.gray400, marginTop: 3 }}>{desc}</div>}
      </div>
      <div
        onClick={() => onChange(!value)}
        style={{
          width: 44, height: 24, borderRadius: 12,
          background: value ? COLORS.sky : COLORS.gray200,
          cursor: "pointer", position: "relative",
          transition: "background 0.2s",
          flexShrink: 0, marginLeft: 16,
        }}
      >
        <div style={{
          position: "absolute", top: 3,
          left: value ? 23 : 3,
          width: 18, height: 18,
          borderRadius: "50%", background: COLORS.white,
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          transition: "left 0.2s",
        }} />
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.gray600, display: "block", marginBottom: 6 }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "9px 12px",
          border: `1px solid ${COLORS.gray200}`, borderRadius: 10,
          fontSize: 13, color: COLORS.gray700, outline: "none",
          background: COLORS.gray50, fontFamily: "inherit",
          boxSizing: "border-box",
        }}
        onFocus={e => e.target.style.borderColor = COLORS.sky}
        onBlur={e => e.target.style.borderColor = COLORS.gray200}
      />
    </div>
  );
}

const TABS = [
  { id: "empresa", label: "🏢 Empresa", icon: "🏢" },
  { id: "notificaciones", label: "🔔 Notificaciones", icon: "🔔" },
  { id: "sistema", label: "⚙️ Sistema", icon: "⚙️" },
  { id: "seguridad", label: "🔒 Seguridad", icon: "🔒" },
  { id: "integraciones", label: "🔗 Integraciones", icon: "🔗" },
];

export default function ConfiguracionView() {
  const [tab, setTab] = useState("empresa");
  const [saved, setSaved] = useState(false);

  // Empresa settings
  const [empresa, setEmpresa] = useState("TransLogix SA de CV");
  const [rfc, setRfc] = useState("TLX240115ABC");
  const [email, setEmail] = useState("ops@translogix.mx");
  const [telefono, setTelefono] = useState("+52 55 1234-5678");
  const [direccion, setDireccion] = useState("Av. Insurgentes Sur 1234, CDMX");

  // Notifications
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSMS, setNotifSMS] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifCombustible, setNotifCombustible] = useState(true);
  const [notifRetraso, setNotifRetraso] = useState(true);
  const [notifEntrega, setNotifEntrega] = useState(true);
  const [notifMantenimiento, setNotifMantenimiento] = useState(false);
  const [combustibleUmbral, setCombustibleUmbral] = useState("25");

  // Sistema
  const [tema, setTema] = useState("claro");
  const [idioma, setIdioma] = useState("es");
  const [timezone, setTimezone] = useState("America/Mexico_City");
  const [moneda, setMoneda] = useState("MXN");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState("2");

  // Security
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("60");
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const renderTab = () => {
    switch (tab) {
      case "empresa":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card>
              <CardHeader title="📋 Información de la Empresa" />
              <div style={{ padding: "20px 22px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <InputField label="Nombre de la empresa" value={empresa} onChange={setEmpresa} />
                <InputField label="RFC" value={rfc} onChange={setRfc} />
                <InputField label="Email corporativo" value={email} onChange={setEmail} type="email" />
                <InputField label="Teléfono" value={telefono} onChange={setTelefono} />
                <div style={{ gridColumn: "1/-1" }}>
                  <InputField label="Dirección" value={direccion} onChange={setDireccion} />
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader title="🖼️ Branding" />
              <div style={{ padding: "20px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ width: 80, height: 80, borderRadius: 16, background: `linear-gradient(135deg, ${COLORS.sky}, ${COLORS.skyDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, flexShrink: 0 }}>🚚</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.gray800, marginBottom: 6 }}>Logo de la empresa</div>
                    <div style={{ fontSize: 12, color: COLORS.gray400, marginBottom: 12 }}>PNG, JPG o SVG. Máx 2MB.</div>
                    <button style={{ padding: "8px 16px", borderRadius: 10, background: COLORS.gray50, border: `1px solid ${COLORS.gray200}`, color: COLORS.gray700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                      📁 Subir logo
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );

      case "notificaciones":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card>
              <CardHeader title="📡 Canales de Notificación" />
              <div style={{ padding: "0 22px" }}>
                <Toggle value={notifEmail} onChange={setNotifEmail} label="Notificaciones por Email" desc="Recibe alertas en tu correo electrónico" />
                <Toggle value={notifSMS} onChange={setNotifSMS} label="Notificaciones por SMS" desc="Mensajes de texto para alertas críticas" />
                <Toggle value={notifPush} onChange={setNotifPush} label="Notificaciones Push" desc="Alertas en tiempo real en el navegador" />
              </div>
            </Card>

            <Card>
              <CardHeader title="🚨 Tipos de Alertas" />
              <div style={{ padding: "0 22px" }}>
                <Toggle value={notifCombustible} onChange={setNotifCombustible} label="Combustible bajo" desc="Alertar cuando el combustible sea menor al umbral" />
                <Toggle value={notifRetraso} onChange={setNotifRetraso} label="Retrasos en ruta" desc="Notificar cuando un vehículo se retrasa más de 30 min" />
                <Toggle value={notifEntrega} onChange={setNotifEntrega} label="Entregas completadas" desc="Confirmación cuando se completa una entrega" />
                <Toggle value={notifMantenimiento} onChange={setNotifMantenimiento} label="Mantenimiento preventivo" desc="Recordatorio de mantenimiento por kilometraje" />
              </div>
            </Card>

            <Card>
              <CardHeader title="⚙️ Umbrales" />
              <div style={{ padding: "20px 22px" }}>
                <InputField label="Umbral de combustible bajo (%)" value={combustibleUmbral} onChange={setCombustibleUmbral} type="number" />
              </div>
            </Card>
          </div>
        );

      case "sistema":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card>
              <CardHeader title="🌐 Preferencias Regionales" />
              <div style={{ padding: "20px 22px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.gray600, display: "block", marginBottom: 6 }}>Idioma</label>
                  <select value={idioma} onChange={e => setIdioma(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 10, border: `1px solid ${COLORS.gray200}`, fontSize: 13, color: COLORS.gray700, outline: "none", background: COLORS.white, fontFamily: "inherit" }}>
                    <option value="es">🇲🇽 Español</option>
                    <option value="en">🇺🇸 English</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.gray600, display: "block", marginBottom: 6 }}>Moneda</label>
                  <select value={moneda} onChange={e => setMoneda(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 10, border: `1px solid ${COLORS.gray200}`, fontSize: 13, color: COLORS.gray700, outline: "none", background: COLORS.white, fontFamily: "inherit" }}>
                    <option>MXN</option><option>USD</option><option>EUR</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.gray600, display: "block", marginBottom: 6 }}>Zona horaria</label>
                  <select value={timezone} onChange={e => setTimezone(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 10, border: `1px solid ${COLORS.gray200}`, fontSize: 13, color: COLORS.gray700, outline: "none", background: COLORS.white, fontFamily: "inherit" }}>
                    <option value="America/Mexico_City">CDMX (UTC-6)</option>
                    <option value="America/Monterrey">Monterrey (UTC-6)</option>
                    <option value="America/Cancun">Cancún (UTC-5)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.gray600, display: "block", marginBottom: 6 }}>Intervalo de actualización (seg)</label>
                  <input type="number" value={refreshInterval} onChange={e => setRefreshInterval(e.target.value)} min="1" max="60"
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 10, border: `1px solid ${COLORS.gray200}`, fontSize: 13, color: COLORS.gray700, outline: "none", background: COLORS.gray50, fontFamily: "inherit" }} />
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader title="🔄 Comportamiento" />
              <div style={{ padding: "0 22px" }}>
                <Toggle value={autoRefresh} onChange={setAutoRefresh} label="Actualización automática" desc="Refrescar datos de tracking en tiempo real" />
              </div>
            </Card>
          </div>
        );

      case "seguridad":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card>
              <CardHeader title="🔐 Autenticación" />
              <div style={{ padding: "0 22px" }}>
                <Toggle value={twoFactor} onChange={setTwoFactor} label="Autenticación de dos factores (2FA)" desc="Agrega una capa extra de seguridad a tu cuenta" />
                <Toggle value={loginAlerts} onChange={setLoginAlerts} label="Alertas de inicio de sesión" desc="Notificar cuando se detecte un nuevo acceso" />
                <Toggle value={ipWhitelist} onChange={setIpWhitelist} label="Lista blanca de IPs" desc="Restringir acceso solo a IPs autorizadas" />
              </div>
            </Card>

            <Card>
              <CardHeader title="⏱️ Sesión" />
              <div style={{ padding: "20px 22px" }}>
                <InputField label="Tiempo de inactividad para cerrar sesión (minutos)" value={sessionTimeout} onChange={setSessionTimeout} type="number" />
              </div>
            </Card>

            <Card>
              <CardHeader title="🔑 Cambiar Contraseña" />
              <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
                <InputField label="Contraseña actual" value="" onChange={() => {}} type="password" placeholder="••••••••" />
                <InputField label="Nueva contraseña" value="" onChange={() => {}} type="password" placeholder="••••••••" />
                <InputField label="Confirmar nueva contraseña" value="" onChange={() => {}} type="password" placeholder="••••••••" />
                <button style={{ padding: "10px 20px", borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.sky}, ${COLORS.skyDark})`, border: "none", color: COLORS.white, fontWeight: 600, cursor: "pointer", fontSize: 13, fontFamily: "inherit", alignSelf: "flex-start" }}>
                  🔑 Actualizar contraseña
                </button>
              </div>
            </Card>
          </div>
        );

      case "integraciones":
        const integrations = [
          { name: "Google Maps API", desc: "Geocodificación y trazado de rutas", status: "Conectado", icon: "🗺️" },
          { name: "WhatsApp Business", desc: "Notificaciones a conductores", status: "Conectado", icon: "💬" },
          { name: "SAP ERP", desc: "Sincronización de pedidos", status: "Desconectado", icon: "🏭" },
          { name: "Stripe / Conekta", desc: "Procesamiento de pagos", status: "Desconectado", icon: "💳" },
          { name: "Firebase", desc: "Sincronización en tiempo real", status: "Conectado", icon: "🔥" },
          { name: "Sendgrid", desc: "Envío de emails transaccionales", status: "Conectado", icon: "📧" },
        ];
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {integrations.map(integ => (
              <div key={integ.name} style={{ background: COLORS.white, border: `1px solid ${COLORS.gray100}`, borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: COLORS.gray50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{integ.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.gray900 }}>{integ.name}</div>
                  <div style={{ fontSize: 12, color: COLORS.gray500, marginTop: 2 }}>{integ.desc}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: integ.status === "Conectado" ? "#ECFDF5" : COLORS.gray100, color: integ.status === "Conectado" ? COLORS.green : COLORS.gray400 }}>
                    {integ.status === "Conectado" ? "● " : "○ "}{integ.status}
                  </span>
                  <button style={{ padding: "7px 14px", borderRadius: 8, background: integ.status === "Conectado" ? COLORS.gray50 : `${COLORS.sky}12`, border: `1px solid ${integ.status === "Conectado" ? COLORS.gray200 : COLORS.sky + "30"}`, color: integ.status === "Conectado" ? COLORS.gray500 : COLORS.sky, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                    {integ.status === "Conectado" ? "Configurar" : "Conectar"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, height: "100%", overflow: "hidden" }}>
      {/* Save toast */}
      {saved && (
        <div style={{
          position: "fixed", top: 80, right: 28, zIndex: 9999,
          background: COLORS.gray900, color: COLORS.white,
          padding: "12px 20px", borderRadius: 12, fontSize: 13, fontWeight: 500,
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          border: `1px solid ${COLORS.green}`,
        }}>✅ Configuración guardada</div>
      )}

      <PageHeader title="⚙️ Configuración" subtitle="Personaliza tu experiencia y ajustes del sistema" action={
        <PrimaryButton onClick={handleSave} icon="💾">Guardar cambios</PrimaryButton>
      } />

      <div style={{ flex: 1, display: "flex", gap: 20, overflow: "hidden", minHeight: 0, flexWrap: "wrap" }}>
        {/* Sidebar tabs */}
        <div style={{ minWidth: 160, flex: "0 0 200px", flexShrink: 0 }}>
          <div style={{ background: COLORS.white, border: `1px solid ${COLORS.gray100}`, borderRadius: 14, overflow: "hidden" }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                width: "100%", padding: "13px 16px", textAlign: "left",
                background: tab === t.id ? `${COLORS.sky}10` : "transparent",
                borderLeft: tab === t.id ? `3px solid ${COLORS.sky}` : "3px solid transparent",
                border: "none", borderRadius: 0, cursor: "pointer",
                fontSize: 13, fontWeight: tab === t.id ? 600 : 400,
                color: tab === t.id ? COLORS.sky : COLORS.gray600,
                fontFamily: "inherit",
                borderBottom: `1px solid ${COLORS.gray50}`,
              }}>{t.label}</button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", paddingRight: 4, paddingBottom: 20 }}>
          {renderTab()}
        </div>
      </div>
    </div>
  );
}
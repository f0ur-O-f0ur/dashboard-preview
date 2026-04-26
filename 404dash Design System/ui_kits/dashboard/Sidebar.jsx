// 404dash — Sidebar Navigation Component
const NAV_ITEMS = [
  { id: 'overview', label: '개요', labelEn: 'Overview', icon: '⊞' },
  { id: 'analytics', label: '분석', labelEn: 'Analytics', icon: '↗' },
  { id: 'reports', label: '보고서', labelEn: 'Reports', icon: '≡' },
];
const NAV_BOTTOM = [
  { id: 'notifications', label: '알림', labelEn: 'Notifications', icon: '🔔', badge: 3 },
  { id: 'settings', label: '설정', labelEn: 'Settings', icon: '⚙' },
];

function Sidebar({ active, onNav }) {
  return (
    <div style={sidebarStyles.root}>
      {/* Logo */}
      <div style={sidebarStyles.logo}>
        <div style={sidebarStyles.logoMark}>404</div>
        <span style={sidebarStyles.logoText}>dash</span>
      </div>

      {/* Main nav */}
      <div style={sidebarStyles.section}>
        {NAV_ITEMS.map(item => (
          <NavItem key={item.id} item={item} active={active === item.id} onClick={() => onNav(item.id)} />
        ))}
      </div>

      <div style={sidebarStyles.sectionLabel}>관리</div>

      <div style={sidebarStyles.section}>
        {NAV_BOTTOM.map(item => (
          <NavItem key={item.id} item={item} active={active === item.id} onClick={() => onNav(item.id)} />
        ))}
      </div>

      {/* User */}
      <div style={sidebarStyles.userArea}>
        <div style={sidebarStyles.avatar}>김</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#F1F5F9' }}>김민준</div>
          <div style={{ fontSize: 11, color: '#475569' }}>Admin</div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ item, active, onClick }) {
  const [hover, setHover] = React.useState(false);
  const bg = active ? 'rgba(99,102,241,0.12)' : hover ? 'rgba(255,255,255,0.04)' : 'transparent';
  const color = active ? '#818CF8' : hover ? '#F1F5F9' : '#94A3B8';
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...sidebarStyles.navItem, background: bg, color }}
    >
      <span style={{ fontSize: 15, opacity: active ? 1 : 0.7 }}>{item.icon}</span>
      <span>{item.label}</span>
      {item.badge && (
        <span style={sidebarStyles.badge}>{item.badge}</span>
      )}
    </div>
  );
}

const sidebarStyles = {
  root: {
    width: 220, minHeight: '100vh', background: 'rgba(26,29,39,0.98)',
    borderRight: '1px solid #2A2D3E', display: 'flex', flexDirection: 'column',
    padding: '16px 12px', flexShrink: 0,
  },
  logo: { display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', marginBottom: 20 },
  logoMark: {
    width: 30, height: 30, background: '#6366F1', borderRadius: 7,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 11, fontWeight: 700, color: 'white',
  },
  logoText: { fontSize: 16, fontWeight: 600, color: '#F1F5F9' },
  section: { display: 'flex', flexDirection: 'column', gap: 2 },
  sectionLabel: {
    fontSize: 10, fontWeight: 600, color: '#475569',
    padding: '12px 10px 4px', letterSpacing: '0.06em', textTransform: 'uppercase',
  },
  navItem: {
    display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
    borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer',
    transition: 'all 150ms', userSelect: 'none',
  },
  badge: {
    marginLeft: 'auto', background: '#6366F1', color: 'white',
    fontSize: 10, padding: '1px 6px', borderRadius: 9999,
  },
  userArea: {
    marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #2A2D3E',
    display: 'flex', alignItems: 'center', gap: 10, padding: '12px 10px',
  },
  avatar: {
    width: 32, height: 32, borderRadius: '50%', background: 'rgba(99,102,241,0.2)',
    border: '1px solid rgba(99,102,241,0.4)', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#818CF8', flexShrink: 0,
  },
};

Object.assign(window, { Sidebar });

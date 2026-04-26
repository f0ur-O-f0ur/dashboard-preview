// 404dash — Top Header Bar Component

function Header({ title, subtitle, actions }) {
  const [searchVal, setSearchVal] = React.useState('');

  return (
    <div style={headerStyles.root}>
      <div style={headerStyles.left}>
        <div style={headerStyles.title}>{title}</div>
        {subtitle && <div style={headerStyles.subtitle}>{subtitle}</div>}
      </div>
      <div style={headerStyles.right}>
        {/* Search */}
        <div style={headerStyles.searchWrap}>
          <span style={headerStyles.searchIcon}>⌕</span>
          <input
            type="text"
            placeholder="검색..."
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            style={headerStyles.search}
          />
          {searchVal && (
            <span onClick={() => setSearchVal('')} style={{ ...headerStyles.searchIcon, right: 10, left: 'auto', cursor: 'pointer' }}>×</span>
          )}
        </div>

        {/* Notification bell */}
        <div style={headerStyles.iconBtn}>
          <span style={{ fontSize: 16 }}>🔔</span>
          <span style={headerStyles.notifDot} />
        </div>

        {/* Actions */}
        {actions && actions.map((a, i) => (
          <button key={i} onClick={a.onClick} style={{
            ...headerStyles.actionBtn,
            background: a.primary ? '#6366F1' : 'rgba(34,38,58,1)',
            color: a.primary ? 'white' : '#F1F5F9',
            border: a.primary ? 'none' : '1px solid #2A2D3E',
          }}>{a.label}</button>
        ))}
      </div>
    </div>
  );
}

const headerStyles = {
  root: {
    height: 56, borderBottom: '1px solid #2A2D3E', display: 'flex',
    alignItems: 'center', justifyContent: 'space-between', padding: '0 24px',
    background: 'rgba(15,17,23,0.95)', backdropFilter: 'blur(8px)', flexShrink: 0,
  },
  left: { display: 'flex', alignItems: 'baseline', gap: 10 },
  title: { fontSize: 16, fontWeight: 600, color: '#F1F5F9' },
  subtitle: { fontSize: 12, color: '#475569' },
  right: { display: 'flex', alignItems: 'center', gap: 10 },
  searchWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
  searchIcon: { position: 'absolute', left: 10, color: '#475569', fontSize: 14, pointerEvents: 'none' },
  search: {
    background: '#1A1D27', border: '1px solid #2A2D3E', color: '#F1F5F9',
    padding: '6px 12px 6px 30px', borderRadius: 6, fontSize: 13, fontFamily: 'inherit',
    outline: 'none', width: 200, transition: 'border 150ms',
  },
  iconBtn: {
    width: 34, height: 34, borderRadius: 6, background: '#1A1D27', border: '1px solid #2A2D3E',
    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative',
  },
  notifDot: {
    position: 'absolute', top: 7, right: 7, width: 7, height: 7,
    borderRadius: '50%', background: '#EF4444', border: '1.5px solid #0F1117',
  },
  actionBtn: {
    padding: '7px 14px', borderRadius: 6, fontSize: 13, fontWeight: 500,
    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 150ms',
  },
};

Object.assign(window, { Header });

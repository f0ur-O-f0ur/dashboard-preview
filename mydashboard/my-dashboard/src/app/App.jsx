import { useState, useEffect } from 'react'
import { ThemeContext, Icon } from '../components'
import { NotificationDrawer } from '../notifications'
import { TweaksPanel, TweakSection, TweakColor, TweakToggle, TweakRadio } from '../tweaks/TweaksPanel'
import { LineChart, BarChart, DonutChart, DONUT_LABELS, DONUT_COLORS, DONUT_DATA } from '../charts'
import { KPIRow, TransactionTable, NotificationsWidget, ProgressWidget, CalendarWidget, RegionsWidget } from '../widgets'
import { AnalyticsPage, CustomersPage, ProductsPage, OrdersPage, ReportsPage, SettingsPage, HelpPage } from '../pages/PageB'

const NAV_ITEMS = [
  { id:'overview',  label:'Overview',  icon:'home'     },
  { id:'analytics', label:'Analytics', icon:'chart'    },
  { id:'customers', label:'Customers', icon:'users'    },
  { id:'products',  label:'Products',  icon:'package'  },
  { id:'orders',    label:'Orders',    icon:'list'     },
  { id:'reports',   label:'Reports',   icon:'file'     },
]
const NAV_BOTTOM = [
  { id:'settings', label:'Settings', icon:'settings' },
  { id:'help',     label:'Help',     icon:'help'     },
]
const PAGE_TITLE = {
  overview:'Overview', analytics:'Analytics', customers:'Customers',
  products:'Products', orders:'Orders', reports:'Reports',
  settings:'Settings', help:'Help Center',
}

function Sidebar({ collapsed, onToggle, active, setActive }) {
  return (
    <aside className={'sidebar' + (collapsed ? ' collapsed' : '')}>
      <div className="sidebar-logo">
        <div className="logo-mark">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect width="9" height="9" rx="2.5" fill="#4F6EF7"/>
            <rect x="11" width="9" height="9" rx="2.5" fill="#4F6EF7" opacity="0.5"/>
            <rect y="11" width="9" height="9" rx="2.5" fill="#4F6EF7" opacity="0.5"/>
            <rect x="11" y="11" width="9" height="9" rx="2.5" fill="#4F6EF7" opacity="0.25"/>
          </svg>
        </div>
        {!collapsed && <span className="logo-text">Dashify</span>}
        <button className="collapse-btn" onClick={onToggle} title={collapsed ? 'Expand' : 'Collapse'}>
          <Icon name={collapsed ? 'chevronRight' : 'chevronLeft'} size={14} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <button key={item.id}
            className={'nav-item' + (active === item.id ? ' active' : '')}
            onClick={() => setActive(item.id)}
            title={collapsed ? item.label : ''}>
            <Icon name={item.icon} size={16} />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-divider" />

      <nav className="sidebar-nav" style={{ marginTop:'auto' }}>
        {NAV_BOTTOM.map(item => (
          <button key={item.id}
            className={'nav-item' + (active === item.id ? ' active' : '')}
            onClick={() => setActive(item.id)}
            title={collapsed ? item.label : ''}>
            <Icon name={item.icon} size={16} />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {!collapsed && (
        <div className="sidebar-user">
          <div className="user-avatar">AK</div>
          <div style={{ flex:1, minWidth:0 }}>
            <p style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)', margin:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>Alex Kim</p>
            <p style={{ fontSize:11, color:'var(--text-muted)', margin:0 }}>Admin</p>
          </div>
        </div>
      )}
    </aside>
  )
}

function Header({ theme, setTheme, activeNav, notifOpen, setNotifOpen }) {
  const [search, setSearch] = useState('')
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="page-title">{PAGE_TITLE[activeNav] || 'Dashboard'}</h1>
        <span style={{ fontSize:13, color:'var(--text-muted)' }}>April 26, 2026</span>
      </div>
      <div className="topbar-right">
        <div className="search-box">
          <Icon name="search" size={14} color="var(--text-muted)" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
            style={{ background:'none', border:'none', outline:'none', fontSize:13, color:'var(--text-primary)', width:150, fontFamily:'inherit' }} />
        </div>
        <button className="icon-btn" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} title="Toggle theme">
          <Icon name={theme === 'light' ? 'moon' : 'sun'} size={16} />
        </button>
        <button className="icon-btn" onClick={() => setNotifOpen(o => !o)} style={{ position:'relative' }} title="Notifications">
          <Icon name="bell" size={16} />
          <span className="notif-dot" />
        </button>
        <div className="user-avatar" style={{ width:32, height:32, fontSize:12, cursor:'pointer' }}>AK</div>
      </div>
    </header>
  )
}

function Dashboard({ theme }) {
  return (
    <main className="main-content">
      <KPIRow />

      <div className="grid-row">
        <div className="card chart-card" style={{ flex:'2 1 0', minWidth:0 }}>
          <div className="card-header">
            <span className="card-title">Revenue Trend</span>
            <div style={{ display:'flex', gap:4 }}>
              {['7D','30D','90D'].map((l,i) => (
                <button key={l} style={{ fontSize:11, fontWeight:600, padding:'3px 8px', borderRadius:6, border:'none', cursor:'pointer', fontFamily:'inherit', background:i===1?'var(--accent)':'var(--surface-2)', color:i===1?'#fff':'var(--text-secondary)', transition:'all 0.15s' }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ height:220, marginTop:16 }}><LineChart key={'line-'+theme} theme={theme} /></div>
        </div>

        <div className="card chart-card" style={{ flex:'1 1 0', minWidth:220 }}>
          <div className="card-header"><span className="card-title">Traffic Sources</span></div>
          <div style={{ position:'relative', height:160, marginTop:12, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <DonutChart key={'donut-'+theme} theme={theme} />
            <div style={{ position:'absolute', textAlign:'center', pointerEvents:'none' }}>
              <p style={{ fontSize:22, fontWeight:700, color:'var(--text-primary)', margin:0, letterSpacing:'-0.02em' }}>84.3k</p>
              <p style={{ fontSize:11, color:'var(--text-muted)', margin:0 }}>sessions</p>
            </div>
          </div>
          <div style={{ marginTop:14, display:'flex', flexDirection:'column', gap:8 }}>
            {DONUT_LABELS.map((label,i) => (
              <div key={label} style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:DONUT_COLORS[i] }} />
                  <span style={{ fontSize:12, color:'var(--text-secondary)' }}>{label}</span>
                </div>
                <span style={{ fontSize:12, fontWeight:600, color:'var(--text-primary)' }}>{DONUT_DATA[i]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-row">
        <div style={{ flex:'3 1 0', minWidth:0 }}><TransactionTable /></div>
        <div style={{ flex:'2 1 0', minWidth:240 }}><NotificationsWidget /></div>
      </div>

      <div className="grid-row">
        <div className="card chart-card" style={{ flex:'2 1 0', minWidth:0 }}>
          <div className="card-header">
            <span className="card-title">Sales by Channel</span>
            <span style={{ fontSize:12, color:'var(--text-muted)' }}>Apr 2026</span>
          </div>
          <div style={{ height:200, marginTop:12 }}><BarChart key={'bar-'+theme} theme={theme} /></div>
        </div>
        <div style={{ flex:'1.5 1 0', minWidth:220 }}><ProgressWidget /></div>
        <div style={{ flex:'1.5 1 0', minWidth:220 }}><CalendarWidget /></div>
      </div>

      <div className="grid-row">
        <div style={{ flex:1, minWidth:0 }}><RegionsWidget /></div>
      </div>
    </main>
  )
}

function PageContent({ activeNav, theme }) {
  switch (activeNav) {
    case 'analytics': return <AnalyticsPage theme={theme} />
    case 'customers': return <CustomersPage />
    case 'products':  return <ProductsPage />
    case 'orders':    return <OrdersPage />
    case 'reports':   return <ReportsPage />
    case 'settings':  return <SettingsPage />
    case 'help':      return <HelpPage />
    default:          return <Dashboard theme={theme} />
  }
}

export default function App() {
  const [theme, setTheme]           = useState('light')
  const [collapsed, setCollapsed]   = useState(false)
  const [activeNav, setActiveNav]   = useState('overview')
  const [notifOpen, setNotifOpen]   = useState(false)
  const [showTweaks, setShowTweaks] = useState(false)
  const [tweaks, setTweaksState]    = useState({ accentColor:'#4F6EF7', compactMode:false })

  const setTweak = (k, v) => {
    const next = typeof k === 'object' ? { ...tweaks, ...k } : { ...tweaks, [k]: v }
    setTweaksState(next)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.setProperty('--accent', tweaks.accentColor || '#4F6EF7')
  }, [theme, tweaks.accentColor])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={'app-shell' + (collapsed ? ' sidebar-collapsed' : '')}>
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(c => !c)}
          active={activeNav}
          setActive={id => { setActiveNav(id); setNotifOpen(false) }}
        />
        <div className="app-body">
          <Header
            theme={theme} setTheme={setTheme}
            activeNav={activeNav}
            notifOpen={notifOpen} setNotifOpen={setNotifOpen}
          />
          <PageContent activeNav={activeNav} theme={theme} />
        </div>
      </div>

      <NotificationDrawer open={notifOpen} onClose={() => setNotifOpen(false)} />

      {showTweaks && (
        <TweaksPanel onClose={() => setShowTweaks(false)}>
          <TweakSection title="Appearance">
            <TweakColor  label="Accent Color" value={tweaks.accentColor} onChange={v => setTweak('accentColor', v)} />
            <TweakToggle label="Compact Mode" value={tweaks.compactMode} onChange={v => setTweak('compactMode', v)} />
          </TweakSection>
          <TweakSection title="Theme">
            <TweakRadio label="Color Mode" value={theme}
              options={[{label:'Light',value:'light'},{label:'Dark',value:'dark'}]}
              onChange={v => setTheme(v)} />
          </TweakSection>
        </TweaksPanel>
      )}
    </ThemeContext.Provider>
  )
}
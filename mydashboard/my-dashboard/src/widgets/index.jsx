import { useState, useEffect } from 'react'
import { Icon, Badge } from '../components'

// ─── KPI Cards ───────────────────────────────────────────────
const KPI_DATA = [
  { label: 'Total Revenue',    value: '$248,391', delta: '+12.4%', up: true,  sub: 'vs. last month', color: '#4F6EF7' },
  { label: 'Active Users',     value: '84,291',   delta: '+8.2%',  up: true,  sub: 'vs. last month', color: '#12B76A' },
  { label: 'Conversion Rate',  value: '3.24%',    delta: '-0.8%',  up: false, sub: 'vs. last month', color: '#E04444' },
  { label: 'Avg. Order Value', value: '$94.20',   delta: '+5.1%',  up: true,  sub: 'vs. last month', color: '#F79009' },
]

function Sparkline({ up, color }) {
  const points = up
    ? [30,26,28,22,20,18,14,10,12,8,6,4]
    : [4,8,6,10,12,14,18,16,20,18,22,26]
  const w = 80, h = 36
  const min = Math.min(...points), max = Math.max(...points)
  const norm = points.map(p => ((p - min) / (max - min)) * (h - 6) + 3)
  const d = norm.map((y, i) => `${i === 0 ? 'M' : 'L'} ${(i / (points.length - 1)) * w} ${h - y}`).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <path d={d} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function KPICard({ data }) {
  return (
    <div className="card kpi-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500, marginBottom: 6, letterSpacing: '0.02em' }}>{data.label}</p>
          <p style={{ fontSize: 26, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>{data.value}</p>
        </div>
        <Sparkline up={data.up} color={data.color} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 2,
          fontSize: 12, fontWeight: 600,
          color: data.up ? 'var(--success)' : 'var(--danger)',
          background: data.up ? 'var(--success-soft)' : 'var(--danger-soft)',
          padding: '2px 7px', borderRadius: 99,
        }}>
          {data.up ? '↑' : '↓'} {data.delta}
        </span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{data.sub}</span>
      </div>
    </div>
  )
}

export function KPIRow() {
  return (
    <div className="kpi-row">
      {KPI_DATA.map(d => <KPICard key={d.label} data={d} />)}
    </div>
  )
}

// ─── Progress Widget ──────────────────────────────────────────
const GOALS = [
  { label: 'Q2 Revenue Target',    current: 248391, total: 365000, fmt: v => '$' + Math.round(v/1000) + 'k', color: '#4F6EF7' },
  { label: 'New User Acquisition', current: 84291,  total: 102000, fmt: v => Math.round(v/1000) + 'k',       color: '#12B76A' },
  { label: 'Support Resolution',   current: 91,     total: 100,    fmt: v => v + '%',                         color: '#F79009' },
  { label: 'System Uptime',        current: 99.8,   total: 100,    fmt: v => v + '%',                         color: '#8B5CF6' },
]

function ProgressBar({ goal, animated }) {
  const pct = Math.round((goal.current / goal.total) * 100)
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{goal.label}</span>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600 }}>
          {goal.fmt(goal.current)} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>/ {goal.fmt(goal.total)}</span>
        </span>
      </div>
      <div style={{ height: 6, borderRadius: 99, background: 'var(--surface-2)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 99,
          background: goal.color,
          width: animated ? pct + '%' : '0%',
          transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{pct}%</span>
      </div>
    </div>
  )
}

export function ProgressWidget() {
  const [animated, setAnimated] = useState(false)
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 200); return () => clearTimeout(t) }, [])
  return (
    <div className="card widget-card">
      <div className="card-header">
        <span className="card-title">Goal Progress</span>
        <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, cursor: 'pointer' }}>Q2 2026</span>
      </div>
      <div style={{ marginTop: 4 }}>
        {GOALS.map(g => <ProgressBar key={g.label} goal={g} animated={animated} />)}
      </div>
    </div>
  )
}

// ─── Notifications Widget ─────────────────────────────────────
const NOTIFS = [
  { id: 1, type: 'success', icon: 'zap',  title: 'Revenue milestone hit',     body: 'Monthly revenue exceeded $240K — a new record.', time: '2m ago',    read: false },
  { id: 2, type: 'danger',  icon: 'info', title: 'High API latency detected', body: 'US-East region showing 480ms avg response time.',  time: '15m ago',   read: false },
  { id: 3, type: 'info',    icon: 'info', title: 'Weekly report ready',       body: 'Your analytics summary for Apr 14–20 is ready.',   time: '1h ago',    read: false },
  { id: 4, type: 'warning', icon: 'bell', title: 'Scheduled maintenance',     body: 'System downtime Apr 28, 02:00–04:00 UTC.',         time: '3h ago',    read: true  },
  { id: 5, type: 'info',    icon: 'user', title: 'New enterprise signup',     body: 'Acme Corp activated a 50-seat enterprise plan.',   time: 'Yesterday', read: true  },
]

const NOTIF_COLORS = {
  success: { bg: 'var(--success-soft)', fg: 'var(--success)' },
  danger:  { bg: 'var(--danger-soft)',  fg: 'var(--danger)'  },
  warning: { bg: 'var(--warning-soft)', fg: 'var(--warning)' },
  info:    { bg: 'var(--accent-soft)',  fg: 'var(--accent)'  },
}

export function NotificationsWidget() {
  const [items, setItems] = useState(NOTIFS)
  const markRead = id => setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  const unread = items.filter(n => !n.read).length

  return (
    <div className="card widget-card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="card-header">
        <span className="card-title">Notifications</span>
        {unread > 0 && (
          <span style={{ background: 'var(--accent)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 99 }}>
            {unread} new
          </span>
        )}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', marginTop: 4 }}>
        {items.map(n => {
          const c = NOTIF_COLORS[n.type]
          return (
            <div key={n.id} onClick={() => markRead(n.id)} style={{
              display: 'flex', gap: 12, padding: '10px 0',
              borderBottom: '1px solid var(--border)',
              cursor: 'pointer', opacity: n.read ? 0.6 : 1,
              transition: 'opacity 0.2s',
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={n.icon} size={14} color={c.fg} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: n.read ? 500 : 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70%' }}>{n.title}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0 }}>{n.time}</span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>{n.body}</p>
              </div>
              {!n.read && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', marginTop: 4, flexShrink: 0 }} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Calendar ─────────────────────────────────────────────────
const CAL_EVENTS = {
  15: { label: 'Launch',      color: '#12B76A' },
  22: { label: 'Design Review', color: '#8B5CF6' },
  28: { label: 'Team Review', color: '#4F6EF7' },
  30: { label: 'Q2 Close',    color: '#F79009' },
}

export function CalendarWidget() {
  const today = 26
  const month = 'April 2026'
  const firstDow = 2
  const daysInMonth = 30
  const days = []
  for (let i = 0; i < firstDow; i++) days.push(null)
  for (let d = 1; d <= daysInMonth; d++) days.push(d)

  const upcomingEvents = Object.entries(CAL_EVENTS)
    .filter(([d]) => parseInt(d) >= today)
    .sort((a, b) => a[0] - b[0])

  return (
    <div className="card widget-card">
      <div className="card-header">
        <span className="card-title">Calendar</span>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>{month}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2, marginTop: 8 }}>
        {['M','T','W','T','F','S','S'].map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', padding: '4px 0' }}>{d}</div>
        ))}
        {days.map((d, i) => {
          const event = d && CAL_EVENTS[d]
          const isToday = d === today
          const isPast = d && d < today
          return (
            <div key={i} style={{
              textAlign: 'center', borderRadius: 6, padding: '5px 2px',
              position: 'relative', cursor: d ? 'pointer' : 'default',
              background: isToday ? 'var(--accent)' : 'transparent',
              transition: 'background 0.15s',
            }}>
              <span style={{ fontSize: 12, fontWeight: isToday ? 700 : event ? 600 : 400, color: isToday ? '#fff' : isPast ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                {d || ''}
              </span>
              {event && !isToday && (
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: event.color, margin: '2px auto 0' }} />
              )}
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 14, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Upcoming</p>
        {upcomingEvents.map(([d, ev]) => (
          <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 3, height: 28, borderRadius: 99, background: ev.color, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{ev.label}</p>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>Apr {d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Transaction Table ─────────────────────────────────────────
const TRANSACTIONS = [
  { id: 'TXN-0841', customer: 'Acme Corp',      amount: '$4,200.00', status: 'success', date: 'Apr 26, 2026' },
  { id: 'TXN-0840', customer: 'Bright Labs',     amount: '$820.50',   status: 'success', date: 'Apr 25, 2026' },
  { id: 'TXN-0839', customer: 'NovaBuild Inc.',  amount: '$1,350.00', status: 'pending', date: 'Apr 25, 2026' },
  { id: 'TXN-0838', customer: 'Zeta Systems',    amount: '$290.00',   status: 'success', date: 'Apr 24, 2026' },
  { id: 'TXN-0837', customer: 'CorePath LLC',    amount: '$5,100.00', status: 'failed',  date: 'Apr 24, 2026' },
  { id: 'TXN-0836', customer: 'Maple Digital',   amount: '$740.00',   status: 'success', date: 'Apr 23, 2026' },
  { id: 'TXN-0835', customer: 'Ironclad Co.',    amount: '$2,080.00', status: 'pending', date: 'Apr 23, 2026' },
  { id: 'TXN-0834', customer: 'Pulse Media',     amount: '$390.00',   status: 'success', date: 'Apr 22, 2026' },
]

const STATUS_MAP = {
  success: { label: 'Paid',    type: 'success' },
  pending: { label: 'Pending', type: 'warning' },
  failed:  { label: 'Failed',  type: 'danger'  },
}

export function TransactionTable() {
  const [sortCol, setSortCol] = useState('date')
  const [sortDir, setSortDir] = useState('desc')

  const handleSort = col => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('asc') }
  }

  const sorted = [...TRANSACTIONS].sort((a, b) => {
    let av = a[sortCol], bv = b[sortCol]
    if (sortCol === 'amount') { av = parseFloat(av.replace(/[$,]/g,'')); bv = parseFloat(bv.replace(/[$,]/g,'')) }
    if (av < bv) return sortDir === 'asc' ? -1 : 1
    if (av > bv) return sortDir === 'asc' ? 1 : -1
    return 0
  })

  const SortIcon = ({ col }) => (
    <span style={{ opacity: sortCol === col ? 1 : 0.3, marginLeft: 4, fontSize: 10 }}>
      {sortCol === col && sortDir === 'asc' ? '↑' : '↓'}
    </span>
  )

  const TH = ({ col, children }) => (
    <th onClick={() => handleSort(col)} style={{
      padding: '10px 12px', textAlign: 'left',
      fontSize: 11, fontWeight: 600, color: 'var(--text-muted)',
      textTransform: 'uppercase', letterSpacing: '0.06em',
      cursor: 'pointer', whiteSpace: 'nowrap',
      borderBottom: '1px solid var(--border)',
      userSelect: 'none',
    }}>
      {children}<SortIcon col={col} />
    </th>
  )

  return (
    <div className="card widget-card" style={{ overflow: 'hidden' }}>
      <div className="card-header">
        <span className="card-title">Recent Transactions</span>
        <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, cursor: 'pointer' }}>View all →</span>
      </div>
      <div style={{ overflowX: 'auto', marginTop: 4, marginLeft: -20, marginRight: -20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}>
          <thead>
            <tr>
              <TH col="id">ID</TH>
              <TH col="customer">Customer</TH>
              <TH col="amount">Amount</TH>
              <TH col="status">Status</TH>
              <TH col="date">Date</TH>
            </tr>
          </thead>
          <tbody>
            {sorted.map((tx, i) => {
              const s = STATUS_MAP[tx.status]
              return (
                <tr key={tx.id} style={{ borderBottom: i < sorted.length - 1 ? '1px solid var(--border)' : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '11px 12px', fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{tx.id}</td>
                  <td style={{ padding: '11px 12px', fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{tx.customer}</td>
                  <td style={{ padding: '11px 12px', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{tx.amount}</td>
                  <td style={{ padding: '11px 12px' }}><Badge label={s.label} type={s.type} /></td>
                  <td style={{ padding: '11px 12px', fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{tx.date}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Regions Widget ───────────────────────────────────────────
const REGIONS = [
  { name: 'North America',       users: 34241, pct: 40.7, delta: '+15%', color: '#4F6EF7' },
  { name: 'Europe',              users: 22180, pct: 26.3, delta: '+8%',  color: '#12B76A' },
  { name: 'Asia Pacific',        users: 18920, pct: 22.5, delta: '+24%', color: '#8B5CF6' },
  { name: 'Latin America',       users: 5620,  pct: 6.7,  delta: '+11%', color: '#F79009' },
  { name: 'Middle East & Africa',users: 2340,  pct: 2.8,  delta: '+6%',  color: '#0EA5E9' },
  { name: 'Other',               users: 990,   pct: 1.2,  delta: '-2%',  color: '#9B9B95' },
]

export function RegionsWidget() {
  const [animated, setAnimated] = useState(false)
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 300); return () => clearTimeout(t) }, [])

  return (
    <div className="card widget-card">
      <div className="card-header">
        <span className="card-title">User Distribution</span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>84,291 total</span>
      </div>
      <div style={{ marginTop: 8 }}>
        {REGIONS.map(r => (
          <div key={r.name} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{r.name}</span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: r.delta.startsWith('+') ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>{r.delta}</span>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600, minWidth: 44, textAlign: 'right' }}>{r.users.toLocaleString()}</span>
              </div>
            </div>
            <div style={{ height: 4, borderRadius: 99, background: 'var(--surface-2)', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 99,
                background: r.color,
                width: animated ? r.pct + '%' : '0%',
                transition: 'width 0.9s cubic-bezier(0.4,0,0.2,1)',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
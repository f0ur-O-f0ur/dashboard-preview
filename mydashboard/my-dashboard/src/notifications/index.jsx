import { useState } from 'react'
import { Icon } from '../components'

const ALL_NOTIFS = [
  { id:1, type:'success', icon:'zap',  title:'Revenue milestone hit',     body:'Monthly revenue exceeded $240K — a new record.',  time:'2m ago',    read:false },
  { id:2, type:'danger',  icon:'info', title:'High API latency detected', body:'US-East region showing 480ms avg response time.',  time:'15m ago',   read:false },
  { id:3, type:'info',    icon:'info', title:'Weekly report ready',       body:'Your analytics summary for Apr 14–20 is ready.',   time:'1h ago',    read:false },
  { id:4, type:'warning', icon:'bell', title:'Scheduled maintenance',     body:'System downtime Apr 28, 02:00–04:00 UTC.',         time:'3h ago',    read:true  },
  { id:5, type:'info',    icon:'user', title:'New enterprise signup',     body:'Acme Corp activated a 50-seat enterprise plan.',   time:'Yesterday', read:true  },
  { id:6, type:'success', icon:'zap',  title:'Goal achieved',             body:'Support resolution rate hit 91% this month.',     time:'Yesterday', read:true  },
  { id:7, type:'info',    icon:'file', title:'Q1 report published',       body:'Q1 2026 performance summary is now available.',    time:'2d ago',    read:true  },
]

const NC = {
  success: { bg:'var(--success-soft)', fg:'var(--success)' },
  danger:  { bg:'var(--danger-soft)',  fg:'var(--danger)'  },
  warning: { bg:'var(--warning-soft)', fg:'var(--warning)' },
  info:    { bg:'var(--accent-soft)',  fg:'var(--accent)'  },
}

export function NotificationDrawer({ open, onClose }) {
  const [tab, setTab]     = useState('all')
  const [items, setItems] = useState(ALL_NOTIFS)

  const markAll = () => setItems(p => p.map(n => ({...n, read:true})))
  const markOne = id => setItems(p => p.map(n => n.id===id ? {...n,read:true} : n))
  const unread  = items.filter(n => !n.read).length
  const list    = tab === 'unread' ? items.filter(n => !n.read) : items

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position:'fixed', inset:0, background:'rgba(0,0,0,0.22)', zIndex:40,
        opacity:open?1:0, pointerEvents:open?'all':'none',
        transition:'opacity 0.25s',
      }} />

      {/* Drawer */}
      <div style={{
        position:'fixed', right:0, top:0, bottom:0, width:380,
        background:'var(--bg-card)', borderLeft:'1px solid var(--border)',
        transform:open?'translateX(0)':'translateX(100%)',
        transition:'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
        zIndex:50, display:'flex', flexDirection:'column',
        boxShadow:'-8px 0 40px rgba(0,0,0,0.12)',
      }}>
        {/* Header */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'18px 20px',borderBottom:'1px solid var(--border)',flexShrink:0}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <span style={{fontSize:16,fontWeight:700,color:'var(--text-primary)'}}>Notifications</span>
            {unread > 0 && <span style={{background:'var(--accent)',color:'#fff',fontSize:11,fontWeight:700,padding:'1px 7px',borderRadius:99}}>{unread}</span>}
          </div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            {unread > 0 && (
              <button onClick={markAll} style={{fontSize:12,color:'var(--accent)',fontWeight:600,background:'none',border:'none',cursor:'pointer',padding:'4px 8px',borderRadius:6,fontFamily:'inherit'}}>
                Mark all read
              </button>
            )}
            <button onClick={onClose} className="icon-btn" style={{width:28,height:28,borderRadius:7}}>
              <Icon name="x" size={13} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:'flex',borderBottom:'1px solid var(--border)',padding:'0 20px',flexShrink:0}}>
          {[['all','All'], ['unread', `Unread${unread>0?' ('+unread+')':''}`]].map(([v,l]) => (
            <button key={v} onClick={() => setTab(v)} style={{
              padding:'10px 16px 9px', fontSize:13, fontFamily:'inherit',
              fontWeight:tab===v?600:400,
              color:tab===v?'var(--accent)':'var(--text-secondary)',
              background:'none', border:'none', cursor:'pointer',
              borderBottom:tab===v?'2px solid var(--accent)':'2px solid transparent',
              marginBottom:-1,
            }}>{l}</button>
          ))}
        </div>

        {/* List */}
        <div style={{flex:1,overflowY:'auto'}}>
          {list.length === 0
            ? <div style={{textAlign:'center',padding:'48px 24px',color:'var(--text-muted)',fontSize:14}}>No unread notifications</div>
            : list.map(n => {
              const c = NC[n.type]
              return (
                <div key={n.id} onClick={() => markOne(n.id)}
                  style={{display:'flex',gap:12,padding:'14px 20px',background:n.read?'transparent':'var(--accent-soft)',borderBottom:'1px solid var(--border)',cursor:'pointer',transition:'background 0.15s'}}
                  onMouseEnter={e => { if (n.read) e.currentTarget.style.background = 'var(--surface-2)' }}
                  onMouseLeave={e => { if (n.read) e.currentTarget.style.background = 'transparent' }}>
                  <div style={{width:36,height:36,borderRadius:10,background:c.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <Icon name={n.icon} size={15} color={c.fg} />
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:3}}>
                      <span style={{fontSize:13,fontWeight:n.read?500:700,color:'var(--text-primary)',flex:1}}>{n.title}</span>
                      <span style={{fontSize:11,color:'var(--text-muted)',marginLeft:8,flexShrink:0,whiteSpace:'nowrap'}}>{n.time}</span>
                    </div>
                    <p style={{fontSize:12,color:'var(--text-secondary)',lineHeight:1.5,margin:0}}>{n.body}</p>
                  </div>
                  {!n.read && <div style={{width:6,height:6,borderRadius:'50%',background:'var(--accent)',marginTop:5,flexShrink:0}} />}
                </div>
              )
            })
          }
        </div>

        {/* Footer */}
        <div style={{padding:'14px 20px',borderTop:'1px solid var(--border)',textAlign:'center',flexShrink:0}}>
          <button style={{fontSize:13,fontWeight:600,color:'var(--accent)',background:'none',border:'none',cursor:'pointer',fontFamily:'inherit'}}>
            View all notification history →
          </button>
        </div>
      </div>
    </>
  )
}
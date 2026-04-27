import { useState, useRef, useEffect } from 'react'
import { Icon, Badge } from '../components'
import Chart from 'chart.js/auto'

// ─── Shared helpers ───────────────────────────────────────────────
export function PageHeader({ title, sub, children }) {
  return (
    <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
      <div>
        <h2 style={{fontSize:20,fontWeight:700,color:'var(--text-primary)',letterSpacing:'-0.02em',margin:0}}>{title}</h2>
        {sub && <p style={{fontSize:13,color:'var(--text-secondary)',marginTop:4,margin:'4px 0 0'}}>{sub}</p>}
      </div>
      {children && <div style={{display:'flex',gap:8,alignItems:'center'}}>{children}</div>}
    </div>
  )
}

export function StatCard({ label, value, delta, up }) {
  return (
    <div className="card" style={{flex:1,minWidth:0}}>
      <p style={{fontSize:12,color:'var(--text-secondary)',fontWeight:500,marginBottom:6,letterSpacing:'0.02em',margin:'0 0 6px'}}>{label}</p>
      <p style={{fontSize:22,fontWeight:700,color:'var(--text-primary)',letterSpacing:'-0.02em',margin:'0 0 8px'}}>{value}</p>
      {delta && (
        <span style={{fontSize:11,fontWeight:600,color:up?'var(--success)':'var(--danger)',background:up?'var(--success-soft)':'var(--danger-soft)',padding:'2px 7px',borderRadius:99}}>
          {up?'↑':'↓'} {delta}
        </span>
      )}
    </div>
  )
}

export function PrimaryBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{background:'var(--accent)',color:'#fff',border:'none',borderRadius:9,padding:'8px 16px',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'opacity 0.15s'}}
      onMouseEnter={e=>e.currentTarget.style.opacity='0.85'}
      onMouseLeave={e=>e.currentTarget.style.opacity='1'}>{children}</button>
  )
}

export function SecondaryBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{background:'var(--surface-2)',color:'var(--text-primary)',border:'1px solid var(--border)',borderRadius:9,padding:'8px 16px',fontSize:13,fontWeight:500,cursor:'pointer',fontFamily:'inherit',transition:'background 0.15s'}}
      onMouseEnter={e=>e.currentTarget.style.background='var(--border)'}
      onMouseLeave={e=>e.currentTarget.style.background='var(--surface-2)'}>{children}</button>
  )
}

export function SearchInput({ value, onChange, placeholder='Search...' }) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:8,background:'var(--surface-2)',border:'1px solid var(--border)',borderRadius:9,padding:'7px 12px',minWidth:220}}>
      <Icon name="search" size={14} color="var(--text-muted)" />
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={{background:'none',border:'none',outline:'none',fontSize:13,color:'var(--text-primary)',fontFamily:'inherit',width:'100%'}} />
    </div>
  )
}

// ─── Analytics Page ───────────────────────────────────────────────
const VIS_LABELS = ['Jan W1','W2','W3','W4','Feb W1','W2','W3','W4','Mar W1','W2','W3','W4','Apr W1','W2','W3']
const VIS_DATA   = [12400,13200,14100,13800,15200,16400,15800,17200,18100,19300,18700,20400,21800,23100,22400]
const TOP_PAGES  = [
  {page:'/',         views:48200, bounce:'32%', time:'2m 14s'},
  {page:'/pricing',  views:22100, bounce:'28%', time:'3m 41s'},
  {page:'/features', views:18400, bounce:'45%', time:'1m 52s'},
  {page:'/docs',     views:14200, bounce:'18%', time:'6m 03s'},
  {page:'/blog',     views:9800,  bounce:'62%', time:'1m 18s'},
]

function VisitorChart({ theme }) {
  const ref = useRef(null), inst = useRef(null)
  useEffect(() => {
    if (inst.current) { inst.current.destroy(); inst.current = null }
    const isDark = theme === 'dark'
    const ctx = ref.current.getContext('2d')
    const g = ctx.createLinearGradient(0,0,0,200)
    g.addColorStop(0,'rgba(18,183,106,0.15)'); g.addColorStop(1,'rgba(18,183,106,0)')
    inst.current = new Chart(ctx, {
      type:'line',
      data:{ labels:VIS_LABELS, datasets:[{ data:VIS_DATA, borderColor:'#12B76A', backgroundColor:g, fill:true, tension:0.45, pointRadius:3, pointHoverRadius:5, pointBackgroundColor:'#12B76A', pointBorderColor:isDark?'#161921':'#fff', pointBorderWidth:2, borderWidth:2 }]},
      options:{ responsive:true, maintainAspectRatio:false, interaction:{mode:'index',intersect:false},
        plugins:{ legend:{display:false}, tooltip:{ backgroundColor:isDark?'#1E2230':'#fff', titleColor:isDark?'#ECECE8':'#111110', bodyColor:isDark?'#7E7E85':'#6B6B68', borderColor:isDark?'#2A2D40':'#E8E6E0', borderWidth:1, padding:10, callbacks:{label:c=>' '+c.raw.toLocaleString()+' visitors'}}},
        scales:{ x:{grid:{color:isDark?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.05)'},ticks:{color:isDark?'#5A5A62':'#9B9B95',font:{family:'DM Sans',size:11}},border:{display:false}}, y:{grid:{color:isDark?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.05)'},ticks:{color:isDark?'#5A5A62':'#9B9B95',font:{family:'DM Sans',size:11},callback:v=>(v/1000).toFixed(0)+'k'},border:{display:false}} }
      }
    })
    return () => { if (inst.current) inst.current.destroy() }
  }, [theme])
  return <canvas ref={ref} style={{width:'100%',height:'100%'}} />
}

function DeviceChart({ theme }) {
  const ref = useRef(null), inst = useRef(null)
  useEffect(() => {
    if (inst.current) { inst.current.destroy(); inst.current = null }
    const isDark = theme === 'dark'
    inst.current = new Chart(ref.current.getContext('2d'), {
      type:'doughnut',
      data:{ labels:['Desktop','Mobile','Tablet'], datasets:[{ data:[58,31,11], backgroundColor:['#4F6EF7','#12B76A','#F79009'], borderColor:isDark?'#161921':'#ffffff', borderWidth:3, hoverOffset:6 }]},
      options:{ responsive:true, maintainAspectRatio:false, cutout:'70%', plugins:{ legend:{display:false}, tooltip:{ backgroundColor:isDark?'#1E2230':'#fff', titleColor:isDark?'#ECECE8':'#111110', bodyColor:isDark?'#7E7E85':'#6B6B68', borderColor:isDark?'#2A2D40':'#E8E6E0', borderWidth:1, padding:10, callbacks:{label:c=>' '+c.raw+'%'}}}}
    })
    return () => { if (inst.current) inst.current.destroy() }
  }, [theme])
  return <canvas ref={ref} style={{width:'100%',height:'100%'}} />
}

function FunnelBar({ label, value, max, color }) {
  const [a, setA] = useState(false)
  useEffect(() => { const t = setTimeout(() => setA(true), 300); return () => clearTimeout(t) }, [])
  const pct = Math.round((value/max)*100)
  return (
    <div style={{marginBottom:14}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
        <span style={{fontSize:13,color:'var(--text-primary)',fontWeight:500}}>{label}</span>
        <span style={{fontSize:12,color:'var(--text-secondary)',fontWeight:600}}>{value.toLocaleString()} <span style={{color:'var(--text-muted)',fontWeight:400,fontSize:11}}>({pct}%)</span></span>
      </div>
      <div style={{height:8,borderRadius:99,background:'var(--surface-2)',overflow:'hidden'}}>
        <div style={{height:'100%',borderRadius:99,background:color,width:a?pct+'%':'0%',transition:'width 0.9s cubic-bezier(0.4,0,0.2,1)'}} />
      </div>
    </div>
  )
}

export function AnalyticsPage({ theme }) {
  const [range, setRange] = useState('90D')
  return (
    <main className="main-content">
      <PageHeader title="Analytics" sub="Website traffic and engagement metrics">
        <SecondaryBtn>Export</SecondaryBtn>
        <div style={{display:'flex',gap:3,background:'var(--surface-2)',borderRadius:9,padding:3,border:'1px solid var(--border)'}}>
          {['7D','30D','90D'].map(r => (
            <button key={r} onClick={()=>setRange(r)} style={{padding:'5px 12px',borderRadius:7,fontSize:12,fontWeight:range===r?600:400,border:'none',cursor:'pointer',fontFamily:'inherit',background:range===r?'var(--bg-card)':'transparent',color:range===r?'var(--text-primary)':'var(--text-muted)',boxShadow:range===r?'0 1px 4px rgba(0,0,0,0.08)':'none',transition:'all 0.15s'}}>{r}</button>
          ))}
        </div>
      </PageHeader>

      <div style={{display:'flex',gap:16,marginBottom:18}}>
        <StatCard label="Total Visitors" value="284,120" delta="14.2%" up={true}  />
        <StatCard label="Bounce Rate"    value="42.3%"   delta="2.1%"  up={false} />
        <StatCard label="Avg. Session"   value="3m 24s"  delta="18s"   up={true}  />
        <StatCard label="Conversion"     value="8.2%"    delta="0.6%"  up={true}  />
      </div>

      <div className="card" style={{marginBottom:18}}>
        <div className="card-header">
          <span className="card-title">Visitor Trend</span>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{width:8,height:8,borderRadius:'50%',background:'#12B76A'}} />
            <span style={{fontSize:12,color:'var(--text-secondary)'}}>Unique visitors / week</span>
          </div>
        </div>
        <div style={{height:220,marginTop:16}}><VisitorChart key={'vc-'+theme} theme={theme} /></div>
      </div>

      <div className="grid-row" style={{marginBottom:18}}>
        <div className="card" style={{flex:'1 1 0',minWidth:200}}>
          <div className="card-header"><span className="card-title">Device Split</span></div>
          <div style={{height:150,marginTop:12,position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <DeviceChart key={'dc-'+theme} theme={theme} />
            <div style={{position:'absolute',textAlign:'center',pointerEvents:'none'}}>
              <p style={{fontSize:18,fontWeight:700,color:'var(--text-primary)',margin:0}}>284k</p>
              <p style={{fontSize:10,color:'var(--text-muted)',margin:0}}>sessions</p>
            </div>
          </div>
          <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:8}}>
            {[['Desktop','58%','#4F6EF7'],['Mobile','31%','#12B76A'],['Tablet','11%','#F79009']].map(([l,v,c])=>(
              <div key={l} style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <div style={{width:8,height:8,borderRadius:'50%',background:c}} />
                  <span style={{fontSize:12,color:'var(--text-secondary)'}}>{l}</span>
                </div>
                <span style={{fontSize:12,fontWeight:600,color:'var(--text-primary)'}}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{flex:'2 1 0',minWidth:0,overflow:'hidden'}}>
          <div className="card-header"><span className="card-title">Top Pages</span></div>
          <div style={{overflowX:'auto',marginLeft:-20,marginRight:-20,marginTop:8}}>
            <table style={{width:'100%',borderCollapse:'collapse',minWidth:360}}>
              <thead>
                <tr>{['Page','Views','Bounce','Avg. Time'].map(h=>(
                  <th key={h} style={{padding:'8px 12px',textAlign:'left',fontSize:11,fontWeight:600,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.06em',borderBottom:'1px solid var(--border)'}}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>{TOP_PAGES.map((p,i)=>(
                <tr key={p.page} style={{borderBottom:i<TOP_PAGES.length-1?'1px solid var(--border)':'none'}}
                  onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <td style={{padding:'10px 12px',fontSize:13,fontFamily:'monospace',color:'var(--text-primary)',fontWeight:500}}>{p.page}</td>
                  <td style={{padding:'10px 12px',fontSize:13,fontWeight:600,color:'var(--text-primary)',fontVariantNumeric:'tabular-nums'}}>{p.views.toLocaleString()}</td>
                  <td style={{padding:'10px 12px',fontSize:13,color:'var(--text-secondary)'}}>{p.bounce}</td>
                  <td style={{padding:'10px 12px',fontSize:13,color:'var(--text-secondary)'}}>{p.time}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><span className="card-title">Conversion Funnel</span></div>
        <div style={{marginTop:16,maxWidth:600}}>
          <FunnelBar label="Visits"       value={284120} max={284120} color="#4F6EF7" />
          <FunnelBar label="Sign-ups"     value={42800}  max={284120} color="#12B76A" />
          <FunnelBar label="Activated"    value={28400}  max={284120} color="#F79009" />
          <FunnelBar label="Converted"    value={23300}  max={284120} color="#8B5CF6" />
          <FunnelBar label="Retained 30d" value={18100}  max={284120} color="#0EA5E9" />
        </div>
      </div>
    </main>
  )
}

// ─── Customers Page ───────────────────────────────────────────────
const CUSTOMERS = [
  {id:'C-001',name:'Sarah Chen',  email:'sarah.chen@acmecorp.com', plan:'Enterprise',status:'Active', ltv:'$12,400',joined:'Jan 2024',initials:'SC',color:'#4F6EF7'},
  {id:'C-002',name:'James Park',  email:'j.park@brightlabs.io',    plan:'Pro',       status:'Active', ltv:'$3,200', joined:'Mar 2024',initials:'JP',color:'#12B76A'},
  {id:'C-003',name:'Mia Torres',  email:'mia@novabuild.io',        plan:'Starter',   status:'Trial',  ltv:'$0',     joined:'Apr 2026',initials:'MT',color:'#F79009'},
  {id:'C-004',name:'David Liu',   email:'dliu@zetasystems.com',    plan:'Pro',       status:'Active', ltv:'$4,800', joined:'Nov 2023',initials:'DL',color:'#8B5CF6'},
  {id:'C-005',name:'Emma Wilson', email:'e.wilson@corepathai.com', plan:'Enterprise',status:'Churned',ltv:'$18,200',joined:'Jun 2023',initials:'EW',color:'#E04444'},
  {id:'C-006',name:'Ryan Moore',  email:'rmoore@mapledigital.ca',  plan:'Starter',   status:'Active', ltv:'$580',   joined:'Feb 2026',initials:'RM',color:'#0EA5E9'},
  {id:'C-007',name:'Priya Patel', email:'priya@ironclad.co',       plan:'Pro',       status:'Active', ltv:'$2,900', joined:'Dec 2023',initials:'PP',color:'#12B76A'},
  {id:'C-008',name:'Tom Walsh',   email:'twalsh@pulse.media',      plan:'Pro',       status:'Active', ltv:'$3,600', joined:'Sep 2023',initials:'TW',color:'#4F6EF7'},
]
const PLAN_T   = {Enterprise:'info', Pro:'success', Starter:'default'}
const STATUS_T = {Active:'success', Trial:'warning', Churned:'danger'}

export function CustomersPage() {
  const [search, setSearch] = useState('')
  const [planF, setPlanF]   = useState('All')
  const filtered = CUSTOMERS.filter(c =>
    (planF==='All'||c.plan===planF) &&
    (c.name.toLowerCase().includes(search.toLowerCase())||c.email.toLowerCase().includes(search.toLowerCase()))
  )
  return (
    <main className="main-content">
      <PageHeader title="Customers" sub="Manage and track your customer accounts">
        <SecondaryBtn>Export CSV</SecondaryBtn>
        <PrimaryBtn>+ Add Customer</PrimaryBtn>
      </PageHeader>
      <div style={{display:'flex',gap:16,marginBottom:18}}>
        <StatCard label="Total Customers" value="84,291" delta="8.2%"  up={true}  />
        <StatCard label="Active"          value="71,438"                           />
        <StatCard label="Churned (30d)"   value="3,218"  delta="1.2%"  up={false} />
        <StatCard label="Avg. LTV"        value="$2,940" delta="5.4%"  up={true}  />
      </div>
      <div className="card" style={{overflow:'hidden'}}>
        <div style={{display:'flex',gap:12,marginBottom:16,flexWrap:'wrap',alignItems:'center',justifyContent:'space-between'}}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search by name or email…" />
          <div style={{display:'flex',gap:3,background:'var(--surface-2)',borderRadius:9,padding:3,border:'1px solid var(--border)'}}>
            {['All','Enterprise','Pro','Starter'].map(p=>(
              <button key={p} onClick={()=>setPlanF(p)} style={{padding:'5px 12px',borderRadius:7,fontSize:12,fontWeight:planF===p?600:400,border:'none',cursor:'pointer',fontFamily:'inherit',background:planF===p?'var(--bg-card)':'transparent',color:planF===p?'var(--text-primary)':'var(--text-muted)',boxShadow:planF===p?'0 1px 4px rgba(0,0,0,0.08)':'none',transition:'all 0.15s'}}>{p}</button>
            ))}
          </div>
        </div>
        <div style={{overflowX:'auto',marginLeft:-20,marginRight:-20}}>
          <table style={{width:'100%',borderCollapse:'collapse',minWidth:600}}>
            <thead><tr>{['Customer','Email','Plan','Status','LTV','Joined'].map(h=>(
              <th key={h} style={{padding:'10px 12px',textAlign:'left',fontSize:11,fontWeight:600,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.06em',borderBottom:'1px solid var(--border)'}}>{h}</th>
            ))}</tr></thead>
            <tbody>{filtered.map((c,i)=>(
              <tr key={c.id} style={{borderBottom:i<filtered.length-1?'1px solid var(--border)':'none',cursor:'pointer'}}
                onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <td style={{padding:'11px 12px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <div style={{width:32,height:32,borderRadius:'50%',background:c.color,color:'#fff',fontSize:11,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{c.initials}</div>
                    <div>
                      <p style={{fontSize:13,fontWeight:600,color:'var(--text-primary)',margin:0}}>{c.name}</p>
                      <p style={{fontSize:11,color:'var(--text-muted)',margin:0,fontFamily:'monospace'}}>{c.id}</p>
                    </div>
                  </div>
                </td>
                <td style={{padding:'11px 12px',fontSize:13,color:'var(--text-secondary)'}}>{c.email}</td>
                <td style={{padding:'11px 12px'}}><Badge label={c.plan} type={PLAN_T[c.plan]||'default'} /></td>
                <td style={{padding:'11px 12px'}}><Badge label={c.status} type={STATUS_T[c.status]||'default'} /></td>
                <td style={{padding:'11px 12px',fontSize:13,fontWeight:600,color:'var(--text-primary)',fontVariantNumeric:'tabular-nums'}}>{c.ltv}</td>
                <td style={{padding:'11px 12px',fontSize:12,color:'var(--text-muted)'}}>{c.joined}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

// ─── Products Page ────────────────────────────────────────────────
const PRODUCTS = [
  {id:'P-001',name:'Wireless Headphones Pro', cat:'Audio',       price:'$149.00',stock:234,max:300,status:'Active'      },
  {id:'P-002',name:'Smart Watch Series 5',    cat:'Wearables',   price:'$299.00',stock:45, max:300,status:'Low Stock'   },
  {id:'P-003',name:'Portable SSD 1TB',        cat:'Storage',     price:'$89.00', stock:512,max:600,status:'Active'      },
  {id:'P-004',name:'USB-C Hub 7-in-1',        cat:'Accessories', price:'$49.00', stock:180,max:300,status:'Active'      },
  {id:'P-005',name:'Mechanical Keyboard TKL', cat:'Peripherals', price:'$129.00',stock:0,  max:200,status:'Out of Stock'},
  {id:'P-006',name:'Webcam 4K Ultra',         cat:'Peripherals', price:'$79.00', stock:67, max:200,status:'Active'      },
  {id:'P-007',name:'Laptop Stand Aluminum',   cat:'Accessories', price:'$39.00', stock:290,max:400,status:'Active'      },
  {id:'P-008',name:'LED Desk Light Bar',      cat:'Lighting',    price:'$59.00', stock:8,  max:200,status:'Low Stock'   },
]
const SC = s => s==='Active'?'#12B76A':s==='Low Stock'?'#F79009':'#E04444'

export function ProductsPage() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const cats = ['All',...new Set(PRODUCTS.map(p=>p.cat))]
  const filtered = PRODUCTS.filter(p=>(cat==='All'||p.cat===cat)&&p.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <main className="main-content">
      <PageHeader title="Products" sub="Inventory and product catalog">
        <SecondaryBtn>Import</SecondaryBtn>
        <PrimaryBtn>+ Add Product</PrimaryBtn>
      </PageHeader>
      <div style={{display:'flex',gap:16,marginBottom:18}}>
        <StatCard label="Total Products"     value="8"                              />
        <StatCard label="In Stock"           value="6"                              />
        <StatCard label="Low / Out of Stock" value="2"        delta="1 critical" up={false} />
        <StatCard label="Catalog Value"      value="$48,210"  delta="3.2%"      up={true}  />
      </div>
      <div className="card" style={{overflow:'hidden'}}>
        <div style={{display:'flex',gap:12,marginBottom:16,flexWrap:'wrap',alignItems:'center',justifyContent:'space-between'}}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search products…" />
          <select value={cat} onChange={e=>setCat(e.target.value)} style={{background:'var(--surface-2)',border:'1px solid var(--border)',borderRadius:9,padding:'7px 12px',fontSize:13,color:'var(--text-primary)',fontFamily:'inherit',cursor:'pointer',outline:'none'}}>
            {cats.map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <div style={{overflowX:'auto',marginLeft:-20,marginRight:-20}}>
          <table style={{width:'100%',borderCollapse:'collapse',minWidth:540}}>
            <thead><tr>{['Product','Category','Price','Stock Level','Status'].map(h=>(
              <th key={h} style={{padding:'10px 12px',textAlign:'left',fontSize:11,fontWeight:600,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.06em',borderBottom:'1px solid var(--border)'}}>{h}</th>
            ))}</tr></thead>
            <tbody>{filtered.map((p,i)=>(
              <tr key={p.id} style={{borderBottom:i<filtered.length-1?'1px solid var(--border)':'none',cursor:'pointer'}}
                onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <td style={{padding:'11px 12px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <div style={{width:36,height:36,borderRadius:8,background:'var(--surface-2)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <Icon name="package" size={16} color="var(--text-muted)" />
                    </div>
                    <div>
                      <p style={{fontSize:13,fontWeight:600,color:'var(--text-primary)',margin:0}}>{p.name}</p>
                      <p style={{fontSize:11,color:'var(--text-muted)',margin:0,fontFamily:'monospace'}}>{p.id}</p>
                    </div>
                  </div>
                </td>
                <td style={{padding:'11px 12px',fontSize:13,color:'var(--text-secondary)'}}>{p.cat}</td>
                <td style={{padding:'11px 12px',fontSize:13,fontWeight:600,color:'var(--text-primary)',fontVariantNumeric:'tabular-nums'}}>{p.price}</td>
                <td style={{padding:'11px 12px',minWidth:140}}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <div style={{flex:1,height:4,borderRadius:99,background:'var(--surface-2)',overflow:'hidden'}}>
                      <div style={{height:'100%',borderRadius:99,background:SC(p.status),width:Math.round((p.stock/p.max)*100)+'%'}} />
                    </div>
                    <span style={{fontSize:12,color:'var(--text-secondary)',minWidth:28,textAlign:'right',fontVariantNumeric:'tabular-nums'}}>{p.stock}</span>
                  </div>
                </td>
                <td style={{padding:'11px 12px'}}><Badge label={p.status} type={p.status==='Active'?'success':p.status==='Low Stock'?'warning':'danger'} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
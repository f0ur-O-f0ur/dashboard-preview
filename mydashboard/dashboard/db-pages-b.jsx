
const { useState } = React;

// ─── Orders Page ──────────────────────────────────────────────────
const ORDERS = [
  {id:'ORD-3041',customer:'Sarah Chen',  date:'Apr 26',items:3,total:'$447.00',status:'Delivered' },
  {id:'ORD-3040',customer:'James Park',  date:'Apr 25',items:1,total:'$149.00',status:'Shipped'   },
  {id:'ORD-3039',customer:'Mia Torres',  date:'Apr 25',items:2,total:'$188.00',status:'Processing'},
  {id:'ORD-3038',customer:'David Liu',   date:'Apr 24',items:1,total:'$299.00',status:'Delivered' },
  {id:'ORD-3037',customer:'Ryan Moore',  date:'Apr 23',items:4,total:'$236.00',status:'Pending'   },
  {id:'ORD-3036',customer:'Tom Walsh',   date:'Apr 22',items:1,total:'$79.00', status:'Delivered' },
  {id:'ORD-3035',customer:'Priya Patel', date:'Apr 21',items:2,total:'$218.00',status:'Cancelled' },
  {id:'ORD-3034',customer:'Emma Wilson', date:'Apr 20',items:3,total:'$367.00',status:'Delivered' },
];
const O_STATUS = {Delivered:'success',Shipped:'info',Processing:'warning',Pending:'warning',Cancelled:'danger'};
const O_TABS   = ['All','Pending','Processing','Shipped','Delivered','Cancelled'];

function OrdersPage() {
  const [tab, setTab]       = useState('All');
  const [search, setSearch] = useState('');
  const counts  = O_TABS.reduce((a,t)=>({...a,[t]:t==='All'?ORDERS.length:ORDERS.filter(o=>o.status===t).length}),{});
  const filtered = ORDERS.filter(o=>
    (tab==='All'||o.status===tab) &&
    (o.customer.toLowerCase().includes(search.toLowerCase())||o.id.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <main className="main-content">
      <PageHeader title="Orders" sub="Track and manage customer orders">
        <SecondaryBtn>Export</SecondaryBtn>
      </PageHeader>
      <div style={{display:'flex',gap:16,marginBottom:18}}>
        <StatCard label="Total Orders"   value="3,041"  delta="12%"   up={true}  />
        <StatCard label="Pending"        value="142"                              />
        <StatCard label="Shipped"        value="89"                               />
        <StatCard label="Revenue (MTD)"  value="$248k"  delta="12.4%" up={true}  />
      </div>
      <div className="card" style={{overflow:'hidden'}}>
        {/* Tab bar */}
        <div style={{display:'flex',borderBottom:'1px solid var(--border)',marginLeft:-20,marginRight:-20,paddingLeft:8,paddingRight:8,marginBottom:16,overflowX:'auto'}}>
          {O_TABS.map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:'10px 14px 9px',fontSize:13,fontWeight:tab===t?600:400,color:tab===t?'var(--accent)':'var(--text-secondary)',background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',borderBottom:tab===t?'2px solid var(--accent)':'2px solid transparent',marginBottom:-1,whiteSpace:'nowrap',flexShrink:0}}>
              {t}{counts[t]>0&&<span style={{fontSize:11,opacity:0.6,marginLeft:4}}>{counts[t]}</span>}
            </button>
          ))}
        </div>
        <div style={{marginBottom:16}}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search orders or customers…" />
        </div>
        <div style={{overflowX:'auto',marginLeft:-20,marginRight:-20}}>
          <table style={{width:'100%',borderCollapse:'collapse',minWidth:500}}>
            <thead><tr>{['Order ID','Customer','Date','Items','Total','Status'].map(h=>(
              <th key={h} style={{padding:'10px 12px',textAlign:'left',fontSize:11,fontWeight:600,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.06em',borderBottom:'1px solid var(--border)'}}>{h}</th>
            ))}</tr></thead>
            <tbody>
              {filtered.length===0
                ? <tr><td colSpan={6} style={{padding:'32px',textAlign:'center',color:'var(--text-muted)',fontSize:14}}>No orders found</td></tr>
                : filtered.map((o,i)=>(
                  <tr key={o.id} style={{borderBottom:i<filtered.length-1?'1px solid var(--border)':'none',cursor:'pointer'}}
                    onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <td style={{padding:'11px 12px',fontSize:12,fontFamily:'monospace',color:'var(--text-muted)'}}>{o.id}</td>
                    <td style={{padding:'11px 12px',fontSize:13,fontWeight:500,color:'var(--text-primary)'}}>{o.customer}</td>
                    <td style={{padding:'11px 12px',fontSize:12,color:'var(--text-secondary)'}}>{o.date}</td>
                    <td style={{padding:'11px 12px',fontSize:13,color:'var(--text-secondary)'}}>{o.items} item{o.items>1?'s':''}</td>
                    <td style={{padding:'11px 12px',fontSize:13,fontWeight:600,color:'var(--text-primary)',fontVariantNumeric:'tabular-nums'}}>{o.total}</td>
                    <td style={{padding:'11px 12px'}}><Badge label={o.status} type={O_STATUS[o.status]||'default'} /></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

// ─── Reports Page ─────────────────────────────────────────────────
const REPORTS_LIST = [
  {name:'Monthly Revenue Report',        type:'Financial',       created:'Apr 1, 2026', size:'2.4 MB',format:'PDF' },
  {name:'Customer Acquisition Analysis', type:'Marketing',       created:'Apr 1, 2026', size:'1.8 MB',format:'XLSX'},
  {name:'Q1 Performance Summary',        type:'Executive',       created:'Mar 31, 2026',size:'3.1 MB',format:'PDF' },
  {name:'User Behavior Analysis',        type:'Analytics',       created:'Apr 15, 2026',size:'856 KB',format:'PDF' },
  {name:'Inventory Status Report',       type:'Operations',      created:'Apr 20, 2026',size:'1.2 MB',format:'XLSX'},
  {name:'Support Ticket Summary',        type:'Customer Success',created:'Apr 22, 2026',size:'640 KB',format:'PDF' },
];
const RPT_QUICK = [
  {icon:'chart',label:'Revenue Report',   sub:'Financial summary with charts',color:'#4F6EF7'},
  {icon:'users',label:'Customer Report',  sub:'Acquisition & retention data', color:'#12B76A'},
  {icon:'file', label:'Custom Report',    sub:'Build your own report',        color:'#8B5CF6'},
];

function ReportsPage() {
  return (
    <main className="main-content">
      <PageHeader title="Reports" sub="Generate and download business reports">
        <PrimaryBtn>+ Generate Report</PrimaryBtn>
      </PageHeader>
      <div style={{display:'flex',gap:16,marginBottom:18}}>
        {RPT_QUICK.map(r=>(
          <div key={r.label} className="card" style={{flex:1,cursor:'pointer',transition:'box-shadow 0.15s'}}
            onMouseEnter={e=>e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.12)'}
            onMouseLeave={e=>e.currentTarget.style.boxShadow='var(--shadow-card)'}>
            <div style={{width:40,height:40,borderRadius:10,background:r.color+'22',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:12}}>
              <Icon name={r.icon} size={20} color={r.color} />
            </div>
            <p style={{fontSize:14,fontWeight:700,color:'var(--text-primary)',margin:'0 0 4px'}}>{r.label}</p>
            <p style={{fontSize:12,color:'var(--text-secondary)',margin:0}}>{r.sub}</p>
          </div>
        ))}
      </div>
      <div className="card" style={{overflow:'hidden'}}>
        <div className="card-header" style={{marginBottom:8}}><span className="card-title">Recent Reports</span></div>
        <div style={{overflowX:'auto',marginLeft:-20,marginRight:-20}}>
          <table style={{width:'100%',borderCollapse:'collapse',minWidth:480}}>
            <thead><tr>{['Report Name','Type','Created','Size','Format',''].map((h,i)=>(
              <th key={i} style={{padding:'10px 12px',textAlign:'left',fontSize:11,fontWeight:600,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.06em',borderBottom:'1px solid var(--border)'}}>{h}</th>
            ))}</tr></thead>
            <tbody>{REPORTS_LIST.map((r,i)=>(
              <tr key={r.name} style={{borderBottom:i<REPORTS_LIST.length-1?'1px solid var(--border)':'none'}}
                onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <td style={{padding:'11px 12px',fontSize:13,fontWeight:500,color:'var(--text-primary)'}}>{r.name}</td>
                <td style={{padding:'11px 12px',fontSize:12,color:'var(--text-secondary)'}}>{r.type}</td>
                <td style={{padding:'11px 12px',fontSize:12,color:'var(--text-muted)'}}>{r.created}</td>
                <td style={{padding:'11px 12px',fontSize:12,color:'var(--text-muted)'}}>{r.size}</td>
                <td style={{padding:'11px 12px'}}>
                  <span style={{fontSize:11,fontWeight:600,padding:'2px 8px',borderRadius:5,background:r.format==='PDF'?'var(--danger-soft)':'var(--success-soft)',color:r.format==='PDF'?'var(--danger)':'var(--success)'}}>{r.format}</span>
                </td>
                <td style={{padding:'11px 12px'}}>
                  <button style={{fontSize:12,fontWeight:600,color:'var(--accent)',background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',display:'flex',alignItems:'center',gap:4}}>
                    <Icon name="download" size={13} color="var(--accent)" /> Download
                  </button>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

// ─── Settings Page ────────────────────────────────────────────────
const S_TABS = ['Profile','Notifications','Security','Billing','Team'];
const TEAM   = [
  {name:'Alex Kim',   role:'Admin', email:'alex.kim@company.com',  initials:'AK',color:'#4F6EF7'},
  {name:'Jordan Lee', role:'Editor',email:'jordan.lee@company.com',initials:'JL',color:'#12B76A'},
  {name:'Sam Rivera', role:'Viewer',email:'sam.rivera@company.com',initials:'SR',color:'#F79009'},
  {name:'Casey Park', role:'Editor',email:'casey.park@company.com',initials:'CP',color:'#8B5CF6'},
];
const ROLE_T = {Admin:'danger',Editor:'info',Viewer:'default'};

const INP = {width:'100%',background:'var(--surface-2)',border:'1px solid var(--border)',borderRadius:9,padding:'9px 12px',fontSize:13,color:'var(--text-primary)',fontFamily:'inherit',outline:'none',transition:'border-color 0.15s'};

function FRow({ label, hint, children }) {
  return (
    <div style={{marginBottom:18}}>
      <label style={{display:'block',fontSize:13,fontWeight:600,color:'var(--text-primary)',marginBottom:6}}>{label}</label>
      {children}
      {hint&&<p style={{fontSize:11,color:'var(--text-muted)',marginTop:5,margin:'5px 0 0'}}>{hint}</p>}
    </div>
  );
}

function Tog({ value, onChange }) {
  return (
    <div onClick={()=>onChange(!value)} style={{width:40,height:22,borderRadius:99,background:value?'var(--accent)':'var(--surface-2)',border:'1px solid var(--border)',cursor:'pointer',transition:'background 0.2s',position:'relative',flexShrink:0}}>
      <div style={{position:'absolute',top:2,left:value?20:2,width:16,height:16,borderRadius:'50%',background:'#fff',boxShadow:'0 1px 4px rgba(0,0,0,0.2)',transition:'left 0.2s'}} />
    </div>
  );
}

function SettingsPage() {
  const [tab, setTab]   = useState('Profile');
  const [frm, setFrm]   = useState({name:'Alex Kim',email:'alex.kim@company.com',bio:'Product manager and dashboard enthusiast.',timezone:'UTC+9 Seoul',language:'English'});
  const [np, setNp]     = useState({emailRev:true,emailUsr:true,emailRpt:false,pushRev:false,pushUsr:true,pushRpt:true});
  const [twoFA, set2FA] = useState(false);

  const panels = {
    Profile: (
      <div style={{maxWidth:520}}>
        <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:24,padding:16,background:'var(--surface-2)',borderRadius:12,border:'1px solid var(--border)'}}>
          <div style={{width:56,height:56,borderRadius:'50%',background:'var(--accent)',color:'#fff',fontSize:18,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>AK</div>
          <div style={{flex:1}}>
            <p style={{fontSize:14,fontWeight:700,color:'var(--text-primary)',margin:'0 0 2px'}}>{frm.name}</p>
            <p style={{fontSize:12,color:'var(--text-muted)',margin:0}}>Administrator</p>
          </div>
          <button style={{fontSize:12,fontWeight:600,color:'var(--accent)',background:'var(--accent-soft)',border:'none',borderRadius:7,padding:'6px 12px',cursor:'pointer',fontFamily:'inherit'}}>Change Photo</button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          <FRow label="Full Name"><input style={INP} value={frm.name} onChange={e=>setFrm({...frm,name:e.target.value})} onFocus={e=>e.target.style.borderColor='var(--accent)'} onBlur={e=>e.target.style.borderColor='var(--border)'} /></FRow>
          <FRow label="Email"><input style={INP} value={frm.email} onChange={e=>setFrm({...frm,email:e.target.value})} onFocus={e=>e.target.style.borderColor='var(--accent)'} onBlur={e=>e.target.style.borderColor='var(--border)'} /></FRow>
        </div>
        <FRow label="Bio"><textarea style={{...INP,height:72,resize:'vertical'}} value={frm.bio} onChange={e=>setFrm({...frm,bio:e.target.value})} onFocus={e=>e.target.style.borderColor='var(--accent)'} onBlur={e=>e.target.style.borderColor='var(--border)'} /></FRow>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          <FRow label="Timezone"><select style={{...INP,cursor:'pointer'}} value={frm.timezone} onChange={e=>setFrm({...frm,timezone:e.target.value})}>{['UTC+9 Seoul','UTC+0 London','UTC-5 New York','UTC-8 Los Angeles'].map(t=><option key={t}>{t}</option>)}</select></FRow>
          <FRow label="Language"><select style={{...INP,cursor:'pointer'}} value={frm.language} onChange={e=>setFrm({...frm,language:e.target.value})}>{['English','Korean','Japanese','Spanish'].map(l=><option key={l}>{l}</option>)}</select></FRow>
        </div>
        <PrimaryBtn>Save Changes</PrimaryBtn>
      </div>
    ),

    Notifications: (
      <div style={{maxWidth:520}}>
        <p style={{fontSize:13,color:'var(--text-secondary)',marginBottom:20}}>Choose how you receive notifications for different events.</p>
        <div className="card" style={{overflow:'hidden',marginBottom:16}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead><tr>{['Event','Email','Push'].map(h=>(
              <th key={h} style={{padding:'10px 16px',textAlign:h==='Event'?'left':'center',fontSize:11,fontWeight:600,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.06em',borderBottom:'1px solid var(--border)'}}>{h}</th>
            ))}</tr></thead>
            <tbody>{[['Revenue milestones','emailRev','pushRev'],['New user signups','emailUsr','pushUsr'],['Weekly reports','emailRpt','pushRpt']].map(([l,ek,pk],i,arr)=>(
              <tr key={l} style={{borderBottom:i<arr.length-1?'1px solid var(--border)':'none'}}>
                <td style={{padding:'14px 16px',fontSize:13,color:'var(--text-primary)',fontWeight:500}}>{l}</td>
                <td style={{padding:'14px 16px',textAlign:'center'}}><div style={{display:'flex',justifyContent:'center'}}><Tog value={np[ek]} onChange={v=>setNp({...np,[ek]:v})} /></div></td>
                <td style={{padding:'14px 16px',textAlign:'center'}}><div style={{display:'flex',justifyContent:'center'}}><Tog value={np[pk]} onChange={v=>setNp({...np,[pk]:v})} /></div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <PrimaryBtn>Save Preferences</PrimaryBtn>
      </div>
    ),

    Security: (
      <div style={{maxWidth:520}}>
        <div className="card" style={{marginBottom:16}}>
          <h3 style={{fontSize:14,fontWeight:700,color:'var(--text-primary)',margin:'0 0 16px'}}>Change Password</h3>
          <FRow label="Current Password"><input type="password" style={INP} defaultValue="••••••••" onFocus={e=>e.target.style.borderColor='var(--accent)'} onBlur={e=>e.target.style.borderColor='var(--border)'} /></FRow>
          <FRow label="New Password"><input type="password" style={INP} placeholder="Min. 8 characters" onFocus={e=>e.target.style.borderColor='var(--accent)'} onBlur={e=>e.target.style.borderColor='var(--border)'} /></FRow>
          <PrimaryBtn>Update Password</PrimaryBtn>
        </div>
        <div className="card" style={{marginBottom:16}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div>
              <p style={{fontSize:14,fontWeight:700,color:'var(--text-primary)',margin:'0 0 4px'}}>Two-Factor Authentication</p>
              <p style={{fontSize:12,color:'var(--text-muted)',margin:0}}>Add an extra layer of security to your account</p>
            </div>
            <Tog value={twoFA} onChange={set2FA} />
          </div>
          {twoFA&&<div style={{marginTop:12,padding:12,background:'var(--success-soft)',borderRadius:8,fontSize:12,color:'var(--success)',fontWeight:500}}>✓ Two-factor authentication is enabled</div>}
        </div>
        <div className="card">
          <p style={{fontSize:14,fontWeight:700,color:'var(--text-primary)',margin:'0 0 12px'}}>Active Sessions</p>
          {[{device:'Chrome on macOS',location:'Seoul, KR',current:true,time:'Now'},{device:'Safari on iPhone',location:'Seoul, KR',current:false,time:'2h ago'}].map((s,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 0',borderBottom:i===0?'1px solid var(--border)':'none'}}>
              <div>
                <p style={{fontSize:13,fontWeight:500,color:'var(--text-primary)',margin:'0 0 2px'}}>{s.device}</p>
                <p style={{fontSize:11,color:'var(--text-muted)',margin:0}}>{s.location} · {s.time}</p>
              </div>
              {s.current
                ? <span style={{fontSize:11,fontWeight:600,color:'var(--success)',background:'var(--success-soft)',padding:'2px 8px',borderRadius:99}}>Current</span>
                : <button style={{fontSize:12,color:'var(--danger)',background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',fontWeight:600}}>Revoke</button>
              }
            </div>
          ))}
        </div>
      </div>
    ),

    Billing: (
      <div style={{maxWidth:520}}>
        <div className="card" style={{marginBottom:16,border:'2px solid var(--accent)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
            <div>
              <Badge label="Current Plan" type="info" />
              <p style={{fontSize:20,fontWeight:700,color:'var(--text-primary)',margin:'8px 0 4px',letterSpacing:'-0.02em'}}>Pro Plan</p>
              <p style={{fontSize:13,color:'var(--text-secondary)',margin:0}}>$89/month · Up to 10 seats</p>
            </div>
            <PrimaryBtn>Upgrade</PrimaryBtn>
          </div>
          <div style={{display:'flex',gap:16,padding:'12px 0',borderTop:'1px solid var(--border)'}}>
            {[['5/10','Seats used'],['84.2k','Monthly active'],['$248k','Revenue tracked']].map(([v,l])=>(
              <div key={l} style={{flex:1}}>
                <p style={{fontSize:18,fontWeight:700,color:'var(--text-primary)',margin:0}}>{v}</p>
                <p style={{fontSize:11,color:'var(--text-muted)',margin:0}}>{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{marginBottom:16}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
            <p style={{fontSize:14,fontWeight:700,color:'var(--text-primary)',margin:0}}>Payment Method</p>
            <button style={{fontSize:12,color:'var(--accent)',fontWeight:600,background:'none',border:'none',cursor:'pointer',fontFamily:'inherit'}}>Update</button>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:12,padding:12,background:'var(--surface-2)',borderRadius:9,border:'1px solid var(--border)'}}>
            <div style={{width:40,height:26,borderRadius:4,background:'#1a1f7e',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <span style={{color:'#fff',fontSize:9,fontWeight:700,letterSpacing:'0.05em'}}>VISA</span>
            </div>
            <div>
              <p style={{fontSize:13,fontWeight:500,color:'var(--text-primary)',margin:0}}>Visa ending in 4242</p>
              <p style={{fontSize:11,color:'var(--text-muted)',margin:0}}>Expires 08/2028</p>
            </div>
          </div>
        </div>
        <div className="card">
          <p style={{fontSize:14,fontWeight:700,color:'var(--text-primary)',margin:'0 0 12px'}}>Invoice History</p>
          {[{date:'Apr 1, 2026',amount:'$89.00'},{date:'Mar 1, 2026',amount:'$89.00'},{date:'Feb 1, 2026',amount:'$89.00'}].map((inv,i,arr)=>(
            <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 0',borderBottom:i<arr.length-1?'1px solid var(--border)':'none'}}>
              <span style={{fontSize:13,color:'var(--text-secondary)'}}>{inv.date}</span>
              <span style={{fontSize:13,fontWeight:600,color:'var(--text-primary)'}}>{inv.amount}</span>
              <Badge label="Paid" type="success" />
              <button style={{fontSize:12,color:'var(--accent)',background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',fontWeight:600}}>PDF</button>
            </div>
          ))}
        </div>
      </div>
    ),

    Team: (
      <div style={{maxWidth:560}}>
        <div style={{display:'flex',justifyContent:'flex-end',marginBottom:16}}><PrimaryBtn>+ Invite Member</PrimaryBtn></div>
        <div className="card" style={{overflow:'hidden'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead><tr>{['Member','Email','Role',''].map(h=>(
              <th key={h} style={{padding:'10px 12px',textAlign:'left',fontSize:11,fontWeight:600,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.06em',borderBottom:'1px solid var(--border)'}}>{h}</th>
            ))}</tr></thead>
            <tbody>{TEAM.map((m,i)=>(
              <tr key={m.name} style={{borderBottom:i<TEAM.length-1?'1px solid var(--border)':'none'}}
                onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <td style={{padding:'11px 12px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <div style={{width:32,height:32,borderRadius:'50%',background:m.color,color:'#fff',fontSize:11,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center'}}>{m.initials}</div>
                    <span style={{fontSize:13,fontWeight:600,color:'var(--text-primary)'}}>{m.name}</span>
                  </div>
                </td>
                <td style={{padding:'11px 12px',fontSize:13,color:'var(--text-secondary)'}}>{m.email}</td>
                <td style={{padding:'11px 12px'}}><Badge label={m.role} type={ROLE_T[m.role]||'default'} /></td>
                <td style={{padding:'11px 12px',textAlign:'right'}}>
                  {m.role!=='Admin'&&<button style={{fontSize:13,color:'var(--text-muted)',background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',letterSpacing:'0.1em'}}>···</button>}
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    ),
  };

  return (
    <main className="main-content">
      <PageHeader title="Settings" sub="Manage your account and preferences" />
      <div style={{display:'flex',gap:24,alignItems:'flex-start'}}>
        <nav style={{width:172,flexShrink:0,display:'flex',flexDirection:'column',gap:2}}>
          {S_TABS.map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{display:'block',width:'100%',textAlign:'left',padding:'9px 12px',borderRadius:9,border:'none',cursor:'pointer',fontFamily:'inherit',fontSize:13,fontWeight:tab===t?600:400,background:tab===t?'var(--accent-soft)':'transparent',color:tab===t?'var(--accent)':'var(--text-secondary)',transition:'all 0.15s'}}>{t}</button>
          ))}
        </nav>
        <div style={{flex:1,minWidth:0}}>{panels[tab]}</div>
      </div>
    </main>
  );
}

// ─── Help Page ────────────────────────────────────────────────────
const FAQS = [
  {q:'How do I upgrade my plan?',       a:'Go to Settings → Billing and click Upgrade. Choose from Starter, Pro, or Enterprise plans. Changes take effect immediately.'},
  {q:'Can I export my data?',           a:'Yes. From any table or chart, click the Export button. Data can be exported as CSV or PDF depending on the widget type.'},
  {q:'How is billing calculated?',      a:'Billing is per seat, charged monthly. Your plan renews on the 1st of each month. Annual plans get 2 months free.'},
  {q:'How do I add team members?',      a:'Go to Settings → Team and click "Invite Member". Enter their email and choose a role: Admin, Editor, or Viewer.'},
  {q:'What integrations are available?',a:'We support Slack, Zapier, HubSpot, Salesforce, Stripe, and all major REST APIs via our webhook system.'},
];
const HELP_CATS = [
  {icon:'zap',     label:'Getting Started',   sub:'Setup guides & quickstart'},
  {icon:'user',    label:'Account & Billing',  sub:'Plans, invoices, seats'},
  {icon:'settings',label:'Integrations',       sub:'Connect external services'},
  {icon:'info',    label:'Troubleshooting',    sub:'Common issues & fixes'},
];

function HelpPage() {
  const [q, setQ]       = useState('');
  const [open, setOpen] = useState(null);
  const filtered = FAQS.filter(f=>f.q.toLowerCase().includes(q.toLowerCase())||f.a.toLowerCase().includes(q.toLowerCase()));
  return (
    <main className="main-content">
      {/* Hero */}
      <div style={{background:'linear-gradient(135deg,var(--accent) 0%,#7B5CF6 100%)',borderRadius:16,padding:'40px 32px',marginBottom:24,textAlign:'center'}}>
        <h2 style={{fontSize:24,fontWeight:800,color:'#fff',margin:'0 0 8px',letterSpacing:'-0.02em'}}>How can we help?</h2>
        <p style={{fontSize:14,color:'rgba(255,255,255,0.75)',margin:'0 0 20px'}}>Search documentation, guides, and FAQs</p>
        <div style={{display:'flex',alignItems:'center',gap:8,background:'#fff',borderRadius:10,padding:'10px 16px',maxWidth:420,margin:'0 auto'}}>
          <Icon name="search" size={16} color="#9B9B95" />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search help articles…"
            style={{background:'none',border:'none',outline:'none',fontSize:14,color:'#111110',fontFamily:'DM Sans,sans-serif',flex:1}} />
        </div>
      </div>

      {/* Categories */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:24}}>
        {HELP_CATS.map(c=>(
          <div key={c.label} className="card" style={{cursor:'pointer',textAlign:'center',transition:'box-shadow 0.15s'}}
            onMouseEnter={e=>e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.12)'}
            onMouseLeave={e=>e.currentTarget.style.boxShadow='var(--shadow-card)'}>
            <div style={{width:42,height:42,borderRadius:11,background:'var(--accent-soft)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 10px'}}>
              <Icon name={c.icon} size={20} color="var(--accent)" />
            </div>
            <p style={{fontSize:13,fontWeight:700,color:'var(--text-primary)',margin:'0 0 4px'}}>{c.label}</p>
            <p style={{fontSize:12,color:'var(--text-muted)',margin:0}}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="card" style={{marginBottom:20}}>
        <div className="card-header" style={{marginBottom:8}}><span className="card-title">Frequently Asked Questions</span></div>
        {filtered.length===0
          ? <p style={{fontSize:14,color:'var(--text-muted)',padding:'16px 0',margin:0}}>No results for "{q}"</p>
          : filtered.map((f,i)=>(
            <div key={i} style={{borderTop:i===0?'none':'1px solid var(--border)'}}>
              <button onClick={()=>setOpen(open===i?null:i)} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 0',background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',textAlign:'left'}}>
                <span style={{fontSize:14,fontWeight:600,color:'var(--text-primary)'}}>{f.q}</span>
                <span style={{fontSize:20,color:'var(--text-muted)',transform:open===i?'rotate(45deg)':'none',transition:'transform 0.2s',display:'inline-block',marginLeft:12,flexShrink:0,lineHeight:1}}>+</span>
              </button>
              {open===i&&<div style={{paddingBottom:14}}><p style={{fontSize:13,color:'var(--text-secondary)',lineHeight:1.65,margin:0}}>{f.a}</p></div>}
            </div>
          ))
        }
      </div>

      {/* Contact */}
      <div className="card" style={{display:'flex',alignItems:'center',gap:20}}>
        <div style={{width:48,height:48,borderRadius:12,background:'var(--accent-soft)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <Icon name="zap" size={22} color="var(--accent)" />
        </div>
        <div style={{flex:1}}>
          <p style={{fontSize:15,fontWeight:700,color:'var(--text-primary)',margin:'0 0 4px'}}>Still need help?</p>
          <p style={{fontSize:13,color:'var(--text-secondary)',margin:0}}>Our support team is available Mon–Fri, 9 AM–6 PM UTC+9.</p>
        </div>
        <PrimaryBtn>Contact Support</PrimaryBtn>
      </div>
    </main>
  );
}

Object.assign(window, { OrdersPage, ReportsPage, SettingsPage, HelpPage });

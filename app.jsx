const { useState, useEffect, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#7C8CFF",
  "accentDeep": "#5A6CFF",
  "ok": "#42D6A0",
  "warn": "#FFB454",
  "danger": "#FF6470"
}/*EDITMODE-END*/;

/* ───────── DATA ───────── */
const PROJECTS = [
  { id:"p1", name:"움직 v3.2 출시", code:"UMJ", color:"#7C8CFF" },
  { id:"p2", name:"결제 인프라 마이그레이션", code:"PAY", color:"#42D6A0" },
  { id:"p3", name:"디자인 시스템 v2", code:"DSL", color:"#FFB454" },
];

const PEOPLE = [
  { id:"u1", n:"김민지", c:"#7C8CFF" },
  { id:"u2", n:"이도윤", c:"#42D6A0" },
  { id:"u3", n:"박서연", c:"#FFB454" },
  { id:"u4", n:"최정훈", c:"#FF6470" },
  { id:"u5", n:"한지우", c:"#A78BFA" },
  { id:"u6", n:"오세영", c:"#38BDF8" },
];

// WBS — start/end measured in "day index" from project start (Day 0 = 4월 14일 월)
const WBS = [
  {
    id:"g1", kind:"phase", title:"기획 / Discovery", owner:"u1", start:0, end:9, prog:100, status:"done",
    children:[
      { id:"t1", title:"사용자 인터뷰 12명", owner:"u3", start:0, end:4, prog:100, status:"done", deps:[] },
      { id:"t2", title:"경쟁사 분석 리포트", owner:"u1", start:2, end:6, prog:100, status:"done", deps:["t1"] },
      { id:"t3", title:"PRD v1 작성 + 합의", owner:"u1", start:5, end:9, prog:100, status:"done", deps:["t2"] },
    ],
  },
  {
    id:"g2", kind:"phase", title:"디자인 / Design", owner:"u3", start:8, end:20, prog:72, status:"prog",
    children:[
      { id:"t4", title:"IA & 와이어프레임", owner:"u3", start:8, end:12, prog:100, status:"done", deps:["t3"] },
      { id:"t5", title:"하이파이 시안 v1", owner:"u3", start:11, end:17, prog:90, status:"prog", deps:["t4"] },
      { id:"t6", title:"디자인 QA + 합의", owner:"u1", start:16, end:20, prog:35, status:"prog", deps:["t5"] },
      { id:"t7", title:"모션·인터랙션 정의", owner:"u5", start:14, end:19, prog:60, status:"prog", deps:["t4"] },
    ],
  },
  {
    id:"g3", kind:"phase", title:"개발 / Engineering", owner:"u2", start:14, end:34, prog:24, status:"prog",
    children:[
      { id:"t8",  title:"공통 컴포넌트 셋업", owner:"u4", start:14, end:18, prog:80, status:"prog", deps:["t4"] },
      { id:"t9",  title:"홈·대시보드 구현", owner:"u2", start:17, end:24, prog:40, status:"prog", deps:["t8","t5"] },
      { id:"t10", title:"송금 플로우 구현", owner:"u2", start:20, end:28, prog:10, status:"prog", deps:["t9"] },
      { id:"t11", title:"결제 게이트웨이 연결", owner:"u6", start:22, end:30, prog:0, status:"todo", deps:["t10"] },
      { id:"t12", title:"성능 최적화·번들링", owner:"u4", start:28, end:34, prog:0, status:"todo", deps:["t11"] },
    ],
  },
  {
    id:"g4", kind:"phase", title:"검증 / QA + 출시", owner:"u4", start:30, end:42, prog:0, status:"todo",
    children:[
      { id:"t13", title:"통합 테스트", owner:"u4", start:30, end:34, prog:0, status:"todo", deps:["t12"] },
      { id:"t14", title:"베타 (외부 50명)", owner:"u1", start:33, end:38, prog:0, status:"todo", deps:["t13"] },
      { id:"t15", title:"앱스토어 심사 제출", owner:"u2", start:37, end:40, prog:0, status:"todo", deps:["t14"] },
      { id:"t16", title:"공개 출시 🚀", owner:"u1", start:40, end:42, prog:0, status:"milestone", deps:["t15"] },
    ],
  },
];

const TODAY = 18; // current day index → 5월 2일 즈음

/* ───────── APP ───────── */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useState("dashboard"); // dashboard | wbs
  const [project, setProject] = useState("p1");

  const cssVars = {
    "--accent": t.accent,
    "--accent-deep": t.accentDeep,
    "--ok": t.ok,
    "--warn": t.warn,
    "--danger": t.danger,
  };

  return (
    <div className="app" style={cssVars}>
      <Sidebar route={route} setRoute={setRoute} project={project} setProject={setProject} />

      <main className="main">
        <Topbar route={route} project={project} />
        {route === "dashboard" && <Dashboard />}
        {route === "wbs" && <WBSView />}
      </main>

      <TweaksPanel title="Tweaks" defaultPosition={{ right: 24, bottom: 24 }}>
        <TweakSection title="Accent">
          <TweakColor label="Accent" value={t.accent} onChange={(v) => setTweak("accent", v)} />
          <TweakColor label="Accent deep" value={t.accentDeep} onChange={(v) => setTweak("accentDeep", v)} />
          <TweakColor label="OK" value={t.ok} onChange={(v) => setTweak("ok", v)} />
          <TweakColor label="Warn" value={t.warn} onChange={(v) => setTweak("warn", v)} />
          <TweakColor label="Danger" value={t.danger} onChange={(v) => setTweak("danger", v)} />
        </TweakSection>
        <TweakSection title="Presets">
          <TweakButton onClick={() => setTweak({ accent:"#7C8CFF", accentDeep:"#5A6CFF" })}>Indigo</TweakButton>
          <TweakButton onClick={() => setTweak({ accent:"#42D6A0", accentDeep:"#1FAD7B" })}>Mint</TweakButton>
          <TweakButton onClick={() => setTweak({ accent:"#FFB454", accentDeep:"#E0902C" })}>Amber</TweakButton>
          <TweakButton onClick={() => setTweak({ accent:"#FF6BB5", accentDeep:"#D9418F" })}>Pink</TweakButton>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

/* ───────── SIDEBAR ───────── */
function Sidebar({ route, setRoute, project, setProject }) {
  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <span className="sb-mark"><span /></span>
        <span className="sb-name">Drift<span className="sb-name-sub">.pm</span></span>
        <button className="sb-collapse">⌘</button>
      </div>

      <div className="sb-search">
        <span>⌕</span>
        <span className="sb-search-text">검색</span>
        <span className="sb-search-kbd">⌘ K</span>
      </div>

      <div className="sb-section">
        <div className="sb-section-head">workspace</div>
        <SbItem icon="home" label="홈" />
        <SbItem icon="inbox" label="받은편지함" badge="6" />
        <SbItem icon="bookmark" label="내가 만든 것" />
      </div>

      <div className="sb-section">
        <div className="sb-section-head with-link">
          <span>프로젝트</span>
          <button>+</button>
        </div>
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            className={`sb-proj ${project === p.id ? "is-active" : ""}`}
            onClick={() => setProject(p.id)}
          >
            <span className="sb-proj-mark" style={{ background: p.color }} />
            <span className="sb-proj-name">{p.name}</span>
            <span className="sb-proj-code">{p.code}</span>
          </button>
        ))}
      </div>

      <div className="sb-section">
        <div className="sb-section-head">view</div>
        <SbItem icon="grid" label="대시보드" active={route === "dashboard"} onClick={() => setRoute("dashboard")} />
        <SbItem icon="bars" label="WBS · 간트" active={route === "wbs"} onClick={() => setRoute("wbs")} />
        <SbItem icon="board" label="보드" />
        <SbItem icon="calendar" label="캘린더" />
        <SbItem icon="doc" label="문서" />
      </div>

      <div className="sb-foot">
        <div className="sb-me">
          <span className="sb-avatar">민</span>
          <div>
            <div className="sb-me-name">김민지</div>
            <div className="sb-me-role">Product Lead · UMJIK</div>
          </div>
          <button className="sb-me-bell">●</button>
        </div>
      </div>
    </aside>
  );
}

function SbItem({ icon, label, badge, active, onClick }) {
  return (
    <button className={`sb-item ${active ? "is-active" : ""}`} onClick={onClick}>
      <SbIcon name={icon} />
      <span>{label}</span>
      {badge && <span className="sb-badge">{badge}</span>}
    </button>
  );
}

function SbIcon({ name }) {
  const w=16, h=16, s="currentColor";
  if (name==="home") return <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.8"><path d="M3 11l9-7 9 7v9a2 2 0 01-2 2h-4v-6h-6v6H5a2 2 0 01-2-2v-9z"/></svg>;
  if (name==="inbox") return <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.8"><path d="M3 13l3-8h12l3 8M3 13v6a2 2 0 002 2h14a2 2 0 002-2v-6M3 13h5l1 3h6l1-3h5"/></svg>;
  if (name==="bookmark") return <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.8"><path d="M6 3h12v18l-6-4-6 4V3z"/></svg>;
  if (name==="grid") return <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>;
  if (name==="bars") return <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.8" strokeLinecap="round"><path d="M3 6h12M3 12h18M3 18h8"/></svg>;
  if (name==="board") return <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.8"><rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="10" y="4" width="5" height="11" rx="1.5"/><rect x="17" y="4" width="4" height="7" rx="1.5"/></svg>;
  if (name==="calendar") return <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>;
  if (name==="doc") return <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.8"><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z"/><path d="M14 3v6h6M8 13h8M8 17h6"/></svg>;
  return null;
}

/* ───────── TOPBAR ───────── */
function Topbar({ route, project }) {
  const proj = PROJECTS.find((p) => p.id === project);
  const titles = { dashboard: "대시보드", wbs: "WBS · 간트차트" };
  return (
    <div className="topbar">
      <div className="tb-crumbs">
        <span className="tb-crumb">UMJIK</span>
        <span className="tb-sep">/</span>
        <span className="tb-crumb">{proj.name}</span>
        <span className="tb-sep">/</span>
        <span className="tb-crumb tb-current">{titles[route]}</span>
      </div>
      <div className="tb-right">
        <div className="tb-stack">
          {PEOPLE.slice(0, 5).map((p, i) => (
            <span key={p.id} className="tb-av" style={{ background: p.c, zIndex: 5-i }}>{p.n[0]}</span>
          ))}
          <span className="tb-av tb-more">+3</span>
        </div>
        <button className="tb-btn-ghost">필터</button>
        <button className="tb-btn-primary">+ 새 작업</button>
      </div>
    </div>
  );
}

/* ───────── DASHBOARD ───────── */
function Dashboard() {
  return (
    <div className="dash">
      {/* Hero strip */}
      <section className="hero-row">
        <div className="hero-card">
          <div className="hc-row">
            <div>
              <div className="hc-eye">진행 중</div>
              <div className="hc-title">움직 v3.2 출시</div>
              <div className="hc-meta">D-24 · 4월 14일 → 5월 28일</div>
            </div>
            <div className="hc-pct">
              <ProgressRing value={42} />
              <div>
                <div className="hc-pct-num">42<span>%</span></div>
                <div className="hc-pct-lab">전체 진행률</div>
              </div>
            </div>
          </div>
          <div className="hc-bar">
            <div className="hc-bar-track">
              <span className="hc-bar-done" style={{ width: "42%" }} />
              <span className="hc-bar-today" style={{ left: `${(TODAY/42)*100}%` }} />
            </div>
            <div className="hc-bar-meta">
              <span>오늘 · {Math.round((TODAY/42)*100)}%</span>
              <span className="hc-bar-warn">예상보다 −1.4일</span>
            </div>
          </div>
          <div className="hc-actions">
            <button>주간 리포트</button>
            <button>리스크 보기</button>
            <button>회의록</button>
          </div>
        </div>

        <Stat label="이번 주 완료" value="14" delta="+3" up />
        <Stat label="오늘 마감" value="5" delta="2건 지연" down />
        <Stat label="진행 중" value="22" delta="평균 4.2일" />
        <Stat label="블로커" value="2" delta="확인 필요" warn />
      </section>

      <div className="grid-row">
        {/* Velocity chart */}
        <section className="card chart-card">
          <div className="card-head">
            <div>
              <div className="card-title">속도 / Velocity</div>
              <div className="card-sub">최근 6주 · 완료된 스토리포인트</div>
            </div>
            <div className="card-actions">
              <button className="seg-active">6주</button>
              <button>3개월</button>
              <button>분기</button>
            </div>
          </div>
          <Velocity />
        </section>

        {/* Workload */}
        <section className="card workload">
          <div className="card-head">
            <div>
              <div className="card-title">팀 부하</div>
              <div className="card-sub">이번 주 할당</div>
            </div>
            <button className="card-link">전체 ›</button>
          </div>
          <div className="wl-list">
            {[
              { p: PEOPLE[0], h: 38, max: 40, st:"ok" },
              { p: PEOPLE[1], h: 44, max: 40, st:"warn" },
              { p: PEOPLE[2], h: 32, max: 40, st:"ok" },
              { p: PEOPLE[3], h: 50, max: 40, st:"danger" },
              { p: PEOPLE[4], h: 22, max: 40, st:"low" },
              { p: PEOPLE[5], h: 36, max: 40, st:"ok" },
            ].map(({p, h, max, st}) => (
              <div className="wl-row" key={p.id}>
                <span className="wl-av" style={{ background: p.c }}>{p.n[0]}</span>
                <span className="wl-name">{p.n}</span>
                <div className="wl-bar">
                  <span className={`wl-fill is-${st}`} style={{ width: `${Math.min(100, h/50*100)}%` }} />
                  <span className="wl-bar-100" />
                </div>
                <span className={`wl-h is-${st}`}>{h}h</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid-row">
        {/* Activity */}
        <section className="card activity">
          <div className="card-head">
            <div>
              <div className="card-title">최근 활동</div>
              <div className="card-sub">실시간 업데이트</div>
            </div>
            <button className="card-link">모두 보기 ›</button>
          </div>
          <div className="act-list">
            <ActItem who="이도윤" verb="이(가) 작업을 완료했습니다" task="홈·대시보드 API 연결" t="3분 전" tag="개발" tagSt="prog" />
            <ActItem who="박서연" verb="이(가) 코멘트를 남겼습니다" task="하이파이 시안 v1 — 토스트 위치" t="12분 전" tag="디자인" tagSt="warn" />
            <ActItem who="최정훈" verb="이(가) 블로커를 표시했습니다" task="결제 게이트웨이 키 발급 지연" t="38분 전" tag="블로커" tagSt="danger" />
            <ActItem who="한지우" verb="이(가) 작업을 만들었습니다" task="모션 토큰 정의 v0.3" t="1시간 전" tag="디자인" tagSt="warn" />
            <ActItem who="김민지" verb="이(가) PRD를 업데이트했습니다" task="PRD v1.4 → v1.5" t="2시간 전" tag="기획" tagSt="ok" />
          </div>
        </section>

        {/* Risks */}
        <section className="card risks">
          <div className="card-head">
            <div>
              <div className="card-title">리스크 · 마일스톤</div>
              <div className="card-sub">다음 14일</div>
            </div>
          </div>
          <div className="risk-list">
            <div className="risk-row r-danger">
              <span className="risk-dot" />
              <div className="risk-body">
                <div className="risk-title">결제 게이트웨이 키 미발급</div>
                <div className="risk-meta">PAY-208 · 차단 5개 · D-3</div>
              </div>
              <span className="risk-tag">High</span>
            </div>
            <div className="risk-row r-warn">
              <span className="risk-dot" />
              <div className="risk-body">
                <div className="risk-title">디자인 QA 합의 지연</div>
                <div className="risk-meta">DSL-44 · D-5</div>
              </div>
              <span className="risk-tag">Med</span>
            </div>
            <div className="risk-row r-ok">
              <span className="risk-dot" />
              <div className="risk-body">
                <div className="risk-title">베타 50명 모집</div>
                <div className="risk-meta">UMJ-91 · D-12 · 마일스톤</div>
              </div>
              <span className="risk-tag">M3</span>
            </div>
            <div className="risk-row r-ok">
              <span className="risk-dot" />
              <div className="risk-body">
                <div className="risk-title">앱스토어 심사 제출</div>
                <div className="risk-meta">UMJ-104 · D-18 · 마일스톤</div>
              </div>
              <span className="risk-tag">M4</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value, delta, up, down, warn }) {
  return (
    <div className="stat">
      <div className="stat-lab">{label}</div>
      <div className="stat-val">{value}</div>
      <div className={`stat-d ${up?"up":""} ${down?"down":""} ${warn?"warn":""}`}>
        {up && "▲ "}{down && "▼ "}{warn && "⚠ "}{delta}
      </div>
    </div>
  );
}

function ProgressRing({ value }) {
  const r = 32, c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" className="ring">
      <circle cx="40" cy="40" r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none"/>
      <circle cx="40" cy="40" r={r} stroke="var(--accent)" strokeWidth="6" fill="none"
        strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
        transform="rotate(-90 40 40)" />
    </svg>
  );
}

function Velocity() {
  const data = [22, 28, 31, 26, 34, 29];
  const planned = [25, 27, 28, 30, 32, 32];
  const max = 40;
  const W = 100; // %
  const labels = ["W14","W15","W16","W17","W18","W19"];
  const today = 5;
  return (
    <div className="velocity">
      <svg viewBox="0 0 600 220" preserveAspectRatio="none" className="vel-svg">
        {[0,10,20,30,40].map((y,i) => (
          <g key={i}>
            <line x1="40" x2="600" y1={200 - (y/max)*180} y2={200 - (y/max)*180} stroke="rgba(255,255,255,0.05)" />
            <text x="32" y={200 - (y/max)*180 + 4} fill="rgba(255,255,255,0.35)" fontSize="11" textAnchor="end" fontFamily="ui-monospace, monospace">{y}</text>
          </g>
        ))}
        {/* planned line */}
        <path d={planned.map((v,i) => `${i===0?"M":"L"} ${60 + i*100} ${200 - (v/max)*180}`).join(" ")}
          stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
        {/* actual */}
        <path d={`M 60 200 ${data.map((v,i) => `L ${60 + i*100} ${200 - (v/max)*180}`).join(" ")} L ${60 + (data.length-1)*100} 200 Z`}
          fill="url(#velGrad)" />
        <path d={data.map((v,i) => `${i===0?"M":"L"} ${60 + i*100} ${200 - (v/max)*180}`).join(" ")}
          stroke="var(--accent)" strokeWidth="2.5" fill="none" />
        {data.map((v, i) => (
          <circle key={i} cx={60 + i*100} cy={200 - (v/max)*180} r={i === today ? 5 : 3.5}
            fill={i === today ? "var(--accent)" : "#0F1116"} stroke="var(--accent)" strokeWidth="2" />
        ))}
        <defs>
          <linearGradient id="velGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="vel-x">
        {labels.map((l, i) => <span key={l} className={i === today ? "is-today" : ""}>{l}</span>)}
      </div>
      <div className="vel-legend">
        <span className="leg leg-actual">실제 완료</span>
        <span className="leg leg-plan">계획</span>
      </div>
    </div>
  );
}

function ActItem({ who, verb, task, t, tag, tagSt }) {
  return (
    <div className="act">
      <span className="act-av" style={{ background: PEOPLE.find(p=>p.n===who)?.c || "#888" }}>{who[0]}</span>
      <div className="act-body">
        <div className="act-line">
          <strong>{who}</strong>{verb}
        </div>
        <div className="act-task">{task}</div>
      </div>
      <span className={`act-tag is-${tagSt}`}>{tag}</span>
      <span className="act-t">{t}</span>
    </div>
  );
}

/* ───────── WBS / GANTT ───────── */
function WBSView() {
  const [open, setOpen] = useState({ g1:true, g2:true, g3:true, g4:true });
  const [hoverDep, setHoverDep] = useState(null);

  const totalDays = 42;
  const dayWidth = 24;
  const ganttWidth = totalDays * dayWidth;

  // Flatten rows for rendering
  const rows = [];
  WBS.forEach((g) => {
    rows.push({ ...g, level: 0 });
    if (open[g.id]) g.children.forEach((c) => rows.push({ ...c, level: 1, parent: g.id }));
  });

  // Day labels: start = 4월 14일 월요일
  const startDate = new Date(2026, 3, 14); // 4월 14일 (month=3)
  const days = Array.from({ length: totalDays }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return d;
  });

  // Position lookup for dep arrows
  const taskPos = {};
  rows.forEach((r, idx) => {
    taskPos[r.id] = { row: idx, start: r.start, end: r.end };
  });

  return (
    <div className="wbs">
      <div className="wbs-toolbar">
        <div className="wbs-tabs">
          <button className="is-active">간트</button>
          <button>리스트</button>
          <button>타임라인</button>
        </div>
        <div className="wbs-tools">
          <div className="seg">
            <button>일</button>
            <button className="is-active">주</button>
            <button>월</button>
          </div>
          <button className="tb-btn-ghost">담당자</button>
          <button className="tb-btn-ghost">상태</button>
          <button className="tb-btn-ghost">의존성 보기</button>
        </div>
      </div>

      <div className="wbs-frame">
        {/* LEFT — task list */}
        <div className="wbs-list">
          <div className="wbs-list-head">
            <span className="wl-c-name">작업</span>
            <span className="wl-c-owner">담당</span>
            <span className="wl-c-prog">진행</span>
            <span className="wl-c-date">기간</span>
          </div>
          <div className="wbs-list-body">
            {rows.map((r) => {
              const o = PEOPLE.find((p) => p.id === r.owner);
              const isPhase = r.kind === "phase";
              return (
                <div
                  key={r.id}
                  className={`wbs-list-row ${isPhase ? "is-phase" : ""}`}
                  onMouseEnter={() => !isPhase && setHoverDep(r.id)}
                  onMouseLeave={() => setHoverDep(null)}
                >
                  <span className="wl-c-name">
                    {isPhase ? (
                      <button className={`tri ${open[r.id] ? "open" : ""}`} onClick={() => setOpen({ ...open, [r.id]: !open[r.id] })}>▸</button>
                    ) : (
                      <span className="wl-indent" />
                    )}
                    <span className={`wl-st wl-st-${r.status}`} />
                    <span className="wl-text">{r.title}</span>
                    {r.deps?.length > 0 && <span className="wl-dep-count">{r.deps.length}</span>}
                  </span>
                  <span className="wl-c-owner">
                    <span className="wl-av-mini" style={{ background: o.c }}>{o.n[0]}</span>
                  </span>
                  <span className="wl-c-prog">
                    <span className="wl-prog-bar">
                      <span className="wl-prog-fill" style={{ width: `${r.prog}%` }} />
                    </span>
                    <span className="wl-prog-num">{r.prog}%</span>
                  </span>
                  <span className="wl-c-date">
                    {fmtRange(days[r.start], days[Math.min(r.end, totalDays-1)])}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — gantt */}
        <div className="wbs-gantt">
          {/* Day header */}
          <div className="g-head" style={{ width: ganttWidth }}>
            <div className="g-months">
              {monthSpans(days).map((m, i) => (
                <span key={i} className="g-month" style={{ width: m.span * dayWidth }}>{m.label}</span>
              ))}
            </div>
            <div className="g-days">
              {days.map((d, i) => (
                <span key={i} className={`g-day ${d.getDay()===0||d.getDay()===6?"is-weekend":""} ${i===TODAY?"is-today":""}`}>
                  <em>{d.getDate()}</em>
                  <i>{["일","월","화","수","목","금","토"][d.getDay()]}</i>
                </span>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="g-body" style={{ width: ganttWidth }}>
            {/* day grid background */}
            <div className="g-grid" aria-hidden>
              {days.map((d, i) => (
                <span key={i} className={`g-grid-col ${d.getDay()===0||d.getDay()===6?"is-weekend":""} ${i===TODAY?"is-today":""}`} />
              ))}
            </div>

            {/* row backgrounds + bars */}
            {rows.map((r, idx) => {
              const o = PEOPLE.find((p) => p.id === r.owner);
              const isPhase = r.kind === "phase";
              const isMs = r.status === "milestone";
              const left = r.start * dayWidth;
              const width = (r.end - r.start) * dayWidth;
              return (
                <div className={`g-row ${isPhase ? "is-phase" : ""}`} key={r.id}>
                  {!isMs && (
                    <div
                      className={`g-bar ${isPhase ? "g-bar-phase" : ""} g-bar-${r.status}`}
                      style={{ left, width }}
                      onMouseEnter={() => !isPhase && setHoverDep(r.id)}
                      onMouseLeave={() => setHoverDep(null)}
                    >
                      {!isPhase && (
                        <span className="g-bar-fill" style={{ width: `${r.prog}%` }} />
                      )}
                      <span className="g-bar-label">
                        {!isPhase && <span className="g-bar-av" style={{ background: o.c }}>{o.n[0]}</span>}
                        {r.title}
                      </span>
                    </div>
                  )}
                  {isMs && (
                    <div className="g-ms" style={{ left: left + width/2 - 8 }} title={r.title}>
                      <svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 2l3 7 7 1-5 5 2 7-7-4-7 4 2-7-5-5 7-1 3-7z" fill="var(--warn)" stroke="#0F1116" strokeWidth="1"/></svg>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Dep arrows */}
            <svg className="g-arrows" width={ganttWidth} height={rows.length * 40}>
              <defs>
                <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0 0 L8 5 L0 10 Z" fill="rgba(255,255,255,0.45)" />
                </marker>
                <marker id="arrHi" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0 0 L8 5 L0 10 Z" fill="var(--accent)" />
                </marker>
              </defs>
              {rows.map((r) => (r.deps || []).map((depId) => {
                const from = taskPos[depId];
                const to = taskPos[r.id];
                if (!from || !to) return null;
                const x1 = from.end * dayWidth;
                const y1 = from.row * 40 + 20;
                const x2 = to.start * dayWidth;
                const y2 = to.row * 40 + 20;
                const mid = x1 + 10;
                const hi = hoverDep === r.id || hoverDep === depId;
                return (
                  <path
                    key={`${depId}-${r.id}`}
                    d={`M ${x1} ${y1} L ${mid} ${y1} L ${mid} ${y2} L ${x2 - 4} ${y2}`}
                    stroke={hi ? "var(--accent)" : "rgba(255,255,255,0.18)"}
                    strokeWidth={hi ? 2 : 1.2}
                    fill="none"
                    markerEnd={`url(#${hi ? "arrHi" : "arr"})`}
                  />
                );
              }))}
            </svg>

            {/* today line */}
            <div className="g-today" style={{ left: TODAY * dayWidth }}>
              <span className="g-today-dot" />
              <span className="g-today-lab">오늘</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function monthSpans(days) {
  const out = [];
  let cur = null;
  days.forEach((d) => {
    const label = `${d.getMonth() + 1}월`;
    if (!cur || cur.label !== label) { cur && out.push(cur); cur = { label, span: 1 }; }
    else cur.span++;
  });
  if (cur) out.push(cur);
  return out;
}

function fmtRange(a, b) {
  const f = (d) => `${d.getMonth()+1}/${d.getDate()}`;
  return `${f(a)} – ${f(b)}`;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

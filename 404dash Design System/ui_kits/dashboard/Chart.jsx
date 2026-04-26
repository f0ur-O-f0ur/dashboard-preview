// 404dash — Chart Components (SVG-based, no dependencies)

// ─── Line Chart ────────────────────────────────────────────
function LineChart({ data, color = '#6366F1', height = 120, label }) {
  const w = 100, h = height;
  const pts = data;
  const min = Math.min(...pts), max = Math.max(...pts);
  const range = max - min || 1;
  const step = w / (pts.length - 1);

  const points = pts.map((v, i) => [
    i * step,
    h - ((v - min) / range) * (h - 16) - 8
  ]);

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
  const areaD = pathD + ` L${points[points.length-1][0]},${h} L0,${h} Z`;

  return (
    <div style={{ position: 'relative' }}>
      {label && <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 6 }}>{label}</div>}
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
        <defs>
          <linearGradient id={`grad-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#grad-${color.replace('#','')})`} />
        <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => i === points.length - 1 && (
          <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={color} />
        ))}
      </svg>
    </div>
  );
}

// ─── Bar Chart ─────────────────────────────────────────────
function BarChart({ data, colors, height = 140 }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <svg width="100%" viewBox={`0 0 ${data.length * 36} ${height}`} style={{ display: 'block', overflow: 'visible' }}>
      {data.map((d, i) => {
        const barH = ((d.value / max) * (height - 28));
        const x = i * 36 + 4;
        const y = height - barH - 20;
        const col = colors ? colors[i % colors.length] : '#6366F1';
        return (
          <g key={i}>
            <rect x={x} y={y} width={28} height={barH} rx={4} fill={col} opacity={0.85} />
            <text x={x + 14} y={height - 6} textAnchor="middle" fontSize={9} fill="#475569">{d.label}</text>
            <text x={x + 14} y={y - 4} textAnchor="middle" fontSize={9} fill="#94A3B8">{d.value}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Donut Chart ───────────────────────────────────────────
function DonutChart({ segments, size = 120 }) {
  const r = 40, cx = size / 2, cy = size / 2;
  const total = segments.reduce((s, d) => s + d.value, 0);
  let angle = -Math.PI / 2;
  const arcs = segments.map(seg => {
    const sweep = (seg.value / total) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(angle);
    const y1 = cy + r * Math.sin(angle);
    angle += sweep;
    const x2 = cx + r * Math.cos(angle);
    const y2 = cy + r * Math.sin(angle);
    const large = sweep > Math.PI ? 1 : 0;
    return { d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`, color: seg.color, label: seg.label, pct: Math.round(seg.value / total * 100) };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1A1D27" strokeWidth={16} />
      {arcs.map((a, i) => (
        <path key={i} d={a.d} fill={a.color} opacity={0.9} />
      ))}
      <circle cx={cx} cy={cy} r={r - 12} fill="#1A1D27" />
    </svg>
  );
}

// ─── Sparkline ─────────────────────────────────────────────
function Sparkline({ data, color = '#6366F1', width = 80, height = 32 }) {
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const step = width / (data.length - 1);
  const points = data.map((v, i) => [i * step, height - ((v - min) / range) * (height - 4) - 2]);
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

Object.assign(window, { LineChart, BarChart, DonutChart, Sparkline });

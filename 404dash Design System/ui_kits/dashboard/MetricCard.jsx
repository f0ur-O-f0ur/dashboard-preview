// 404dash — Metric / KPI Card Component

function MetricCard({ label, value, delta, deltaPositive, accent }) {
  return (
    <div style={{
      ...metricStyles.card,
      borderTop: accent ? '2px solid #6366F1' : '1px solid #2A2D3E',
    }}>
      <div style={metricStyles.label}>{label}</div>
      <div style={metricStyles.value}>{value}</div>
      {delta && (
        <div style={{ ...metricStyles.delta, color: deltaPositive ? '#10B981' : '#EF4444' }}>
          {deltaPositive ? '▲' : '▼'} {delta}
        </div>
      )}
    </div>
  );
}

const metricStyles = {
  card: {
    background: '#1A1D27',
    borderLeft: '1px solid #2A2D3E',
    borderRight: '1px solid #2A2D3E',
    borderBottom: '1px solid #2A2D3E',
    borderRadius: 12,
    padding: '18px 20px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
    minWidth: 160,
  },
  label: { fontSize: 12, color: '#94A3B8', marginBottom: 8 },
  value: {
    fontSize: 28, fontWeight: 700, color: '#F1F5F9',
    fontFamily: "'DM Mono', monospace", letterSpacing: '-0.5px', lineHeight: 1.2,
  },
  delta: { fontSize: 12, marginTop: 6 },
};

Object.assign(window, { MetricCard });

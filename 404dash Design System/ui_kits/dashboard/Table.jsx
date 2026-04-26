// 404dash — Data Table Component

function DataTable({ columns, rows, onRowClick }) {
  const [sortCol, setSortCol] = React.useState(null);
  const [sortDir, setSortDir] = React.useState('asc');

  function handleSort(col) {
    if (!col.sortable) return;
    if (sortCol === col.key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col.key); setSortDir('asc'); }
  }

  const sorted = sortCol
    ? [...rows].sort((a, b) => {
        const v1 = a[sortCol], v2 = b[sortCol];
        return sortDir === 'asc' ? (v1 > v2 ? 1 : -1) : (v1 < v2 ? 1 : -1);
      })
    : rows;

  return (
    <div style={tableStyles.wrap}>
      <table style={tableStyles.table}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} style={{ ...tableStyles.th, cursor: col.sortable ? 'pointer' : 'default' }}
                onClick={() => handleSort(col)}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {col.label}
                  {col.sortable && sortCol === col.key && (
                    <span style={{ fontSize: 10, color: '#6366F1' }}>{sortDir === 'asc' ? '↑' : '↓'}</span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <TableRow key={i} row={row} columns={columns} onClick={() => onRowClick && onRowClick(row)} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableRow({ row, columns, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <tr
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ background: hover ? 'rgba(99,102,241,0.04)' : 'transparent', cursor: onClick ? 'pointer' : 'default', transition: 'background 120ms' }}
    >
      {columns.map(col => (
        <td key={col.key} style={tableStyles.td}>
          {col.render ? col.render(row[col.key], row) : row[col.key]}
        </td>
      ))}
    </tr>
  );
}

const tableStyles = {
  wrap: { overflowX: 'auto', borderRadius: 10, border: '1px solid #2A2D3E' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'inherit' },
  th: {
    padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600,
    color: '#475569', background: '#1A1D27', borderBottom: '1px solid #2A2D3E',
    letterSpacing: '0.04em', textTransform: 'uppercase', userSelect: 'none',
    whiteSpace: 'nowrap',
  },
  td: {
    padding: '12px 16px', borderBottom: '1px solid rgba(42,45,62,0.6)',
    color: '#F1F5F9', verticalAlign: 'middle',
  },
};

function StatusBadge({ status }) {
  const map = {
    '활성': { bg: 'rgba(16,185,129,0.12)', color: '#10B981' },
    'active': { bg: 'rgba(16,185,129,0.12)', color: '#10B981' },
    '대기중': { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B' },
    'pending': { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B' },
    '오류': { bg: 'rgba(239,68,68,0.12)', color: '#EF4444' },
    'error': { bg: 'rgba(239,68,68,0.12)', color: '#EF4444' },
    '비활성': { bg: 'rgba(148,163,184,0.1)', color: '#94A3B8' },
    'inactive': { bg: 'rgba(148,163,184,0.1)', color: '#94A3B8' },
  };
  const s = map[status] || map['inactive'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 9px', borderRadius: 9999, fontSize: 11, fontWeight: 500,
      background: s.bg, color: s.color,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.color }} />
      {status}
    </span>
  );
}

Object.assign(window, { DataTable, StatusBadge });

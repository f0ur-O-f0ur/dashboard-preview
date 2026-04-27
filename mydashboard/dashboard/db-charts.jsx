
const { useRef, useEffect } = React;

const REVENUE_LABELS = ['Apr 1','Apr 3','Apr 5','Apr 7','Apr 9','Apr 11','Apr 13','Apr 15','Apr 17','Apr 19','Apr 21','Apr 23','Apr 25'];
const REVENUE_DATA   = [18200,19400,17800,21300,22100,20800,24500,23200,25800,26100,24900,27400,28600];

const BAR_LABELS   = ['Week 1','Week 2','Week 3','Week 4'];
const BAR_WEB      = [42000,51000,47000,58000];
const BAR_MOBILE   = [28000,33000,30000,38000];
const BAR_API      = [12000,15000,18000,20000];

const DONUT_DATA   = [42, 28, 18, 12];
const DONUT_LABELS = ['Organic','Direct','Social','Referral'];
const DONUT_COLORS = ['#4F6EF7','#12B76A','#F79009','#E04444'];

function getChartDefaults(isDark) {
  return {
    gridColor:    isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    tickColor:    isDark ? '#5A5A68' : '#9B9B95',
    tooltipBg:    isDark ? '#1E2230' : '#ffffff',
    tooltipTitle: isDark ? '#ECECE8' : '#111110',
    tooltipBody:  isDark ? '#7E7E85' : '#6B6B68',
    tooltipBorder:isDark ? '#2A2D40' : '#E8E6E0',
  };
}

function LineChart({ theme }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; }
    const isDark = theme === 'dark';
    const d = getChartDefaults(isDark);
    const ctx = canvasRef.current.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 260);
    gradient.addColorStop(0, 'rgba(79,110,247,0.18)');
    gradient.addColorStop(1, 'rgba(79,110,247,0)');

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: REVENUE_LABELS,
        datasets: [{
          data: REVENUE_DATA,
          borderColor: '#4F6EF7',
          backgroundColor: gradient,
          fill: true,
          tension: 0.45,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: '#4F6EF7',
          pointBorderColor: isDark ? '#1E2230' : '#fff',
          pointBorderWidth: 2,
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: d.tooltipBg,
            titleColor: d.tooltipTitle,
            bodyColor: d.tooltipBody,
            borderColor: d.tooltipBorder,
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: ctx => ' $' + ctx.raw.toLocaleString(),
            }
          }
        },
        scales: {
          x: {
            grid: { color: d.gridColor, drawBorder: false },
            ticks: { color: d.tickColor, font: { family: 'DM Sans', size: 11 }, maxRotation: 0 },
            border: { display: false }
          },
          y: {
            grid: { color: d.gridColor, drawBorder: false },
            ticks: {
              color: d.tickColor,
              font: { family: 'DM Sans', size: 11 },
              callback: v => '$' + (v / 1000).toFixed(0) + 'k'
            },
            border: { display: false }
          }
        }
      }
    });
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [theme]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

function BarChart({ theme }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; }
    const isDark = theme === 'dark';
    const d = getChartDefaults(isDark);
    const ctx = canvasRef.current.getContext('2d');

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: BAR_LABELS,
        datasets: [
          { label: 'Web',    data: BAR_WEB,    backgroundColor: '#4F6EF7', borderRadius: 4, barPercentage: 0.65 },
          { label: 'Mobile', data: BAR_MOBILE, backgroundColor: '#12B76A', borderRadius: 4, barPercentage: 0.65 },
          { label: 'API',    data: BAR_API,    backgroundColor: '#F79009', borderRadius: 4, barPercentage: 0.65 },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              color: d.tickColor,
              font: { family: 'DM Sans', size: 11 },
              usePointStyle: true,
              pointStyle: 'circle',
              boxWidth: 6,
              boxHeight: 6,
              padding: 16,
            }
          },
          tooltip: {
            backgroundColor: d.tooltipBg,
            titleColor: d.tooltipTitle,
            bodyColor: d.tooltipBody,
            borderColor: d.tooltipBorder,
            borderWidth: 1,
            padding: 10,
            callbacks: { label: ctx => ' $' + ctx.raw.toLocaleString() }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: d.tickColor, font: { family: 'DM Sans', size: 11 } },
            border: { display: false }
          },
          y: {
            grid: { color: d.gridColor, drawBorder: false },
            ticks: {
              color: d.tickColor,
              font: { family: 'DM Sans', size: 11 },
              callback: v => '$' + (v / 1000).toFixed(0) + 'k'
            },
            border: { display: false }
          }
        }
      }
    });
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [theme]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

function DonutChart({ theme }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; }
    const isDark = theme === 'dark';
    const d = getChartDefaults(isDark);
    const ctx = canvasRef.current.getContext('2d');

    chartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: DONUT_LABELS,
        datasets: [{
          data: DONUT_DATA,
          backgroundColor: DONUT_COLORS,
          borderColor: isDark ? '#161921' : '#ffffff',
          borderWidth: 3,
          hoverOffset: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: d.tooltipBg,
            titleColor: d.tooltipTitle,
            bodyColor: d.tooltipBody,
            borderColor: d.tooltipBorder,
            borderWidth: 1,
            padding: 10,
            callbacks: { label: ctx => ' ' + ctx.raw + '%' }
          }
        }
      }
    });
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [theme]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

Object.assign(window, { LineChart, BarChart, DonutChart, DONUT_LABELS, DONUT_COLORS, DONUT_DATA });

// shared/js/chart-utils.js — reusable Chart.js helpers

export const CHART_COLORS = {
  markham:  '#4a9eff',
  rh:       '#70c542',
  base:     '#4a9eff',
  bull:     '#70c542',
  bear:     '#e85c4a',
  gold:     '#d4a843',
  markhamBg: 'rgba(74,158,255,0.35)',
  rhBg:      'rgba(112,197,66,0.35)',
  baseBg:    'rgba(74,158,255,0.15)',
  bullBg:    'rgba(112,197,66,0.15)',
  bearBg:    'rgba(232,92,74,0.12)',
};

export function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function formatPrice(n) {
  if (n === null || n === undefined) return '';
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(2).replace(/\.?0+$/, '') + 'M';
  return '$' + (n / 1000).toFixed(0) + 'K';
}

/**
 * Build (or rebuild) a Chart.js chart with standardised theme-aware styling.
 *
 * @param {HTMLCanvasElement} canvas  - The <canvas> element to render into
 * @param {Array}             datasets - Chart.js dataset objects
 * @param {Object}            overrides - Optional partial Chart.js options to merge
 * @returns {Chart} The created Chart instance
 */
export function buildChart(canvas, datasets, overrides = {}) {
  const gridColor    = cssVar('--chart-grid');
  const tickColor    = cssVar('--chart-tick');
  const tooltipBg    = cssVar('--tooltip-bg');
  const tooltipBorder = cssVar('--tooltip-border');
  const tooltipTitle = cssVar('--tooltip-title');
  const tooltipBody  = cssVar('--tooltip-body');

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: tooltipBg,
        borderColor: tooltipBorder,
        borderWidth: 1,
        titleColor: tooltipTitle,
        bodyColor: tooltipBody,
        padding: 10,
        callbacks: {
          label: ctx => {
            if (ctx.parsed.y === null) return null;
            return ` ${ctx.dataset.label}: ${formatPrice(ctx.parsed.y)}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: tickColor,
          font: { family: 'DM Mono, monospace', size: 10 },
          maxRotation: 45,
          autoSkip: true,
          maxTicksLimit: 14,
        },
        border: { display: false }
      },
      y: {
        grid: { color: gridColor },
        ticks: {
          color: tickColor,
          font: { family: 'DM Mono, monospace', size: 10 },
          callback: v => '$' + (v >= 1000000 ? (v / 1000000).toFixed(1) + 'M' : (v / 1000).toFixed(0) + 'K')
        },
        border: { display: false },
        min: 100000,
      }
    }
  };

  const options = deepMerge(defaultOptions, overrides);

  return new Chart(canvas, {
    type: 'bar',
    data: { labels: overrides.labels || [], datasets },
    options,
  });
}

function deepMerge(target, source) {
  const out = Object.assign({}, target);
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      out[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      out[key] = source[key];
    }
  }
  return out;
}

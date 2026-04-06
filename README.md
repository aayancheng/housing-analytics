# Housing Analytics

Data-driven housing market research across global cities. Thirty years of price history, three forward scenarios, and the structural forces shaping each market.

**Live:** [housing-analytics.vercel.app](https://housing-analytics.vercel.app) *(or your Vercel URL)*

---

## Markets

| City | Status | Coverage |
|------|--------|----------|
| Markham & Richmond Hill | Live | Detached homes, 1995–2030 |
| Hong Kong | Live | Class B apartments, 1994–2030 |
| Toronto | In progress | — |
| Vancouver | In progress | — |
| Tokyo | In progress | — |

---

## Stack

- **Zero dependencies** — no npm, no bundler, no framework
- Vanilla HTML + CSS + ES modules
- [Chart.js](https://www.chartjs.org/) (UMD, vendored)
- Deployed on Vercel (static, auto-deploy on push to `main`)

---

## Local Development

```bash
git clone <repo-url>
cd HousePriceAnalytics
python3 -m http.server 3000
# open http://localhost:3000
```

ES modules require a real HTTP server — `file://` URLs will not work.

---

## Project Structure

```
index.html                    ← landing page (city selector)
cities/
  markham-rh/index.html       ← Markham & Richmond Hill report
  hong-kong/index.html        ← Hong Kong report
  toronto/index.html          ← stub
  vancouver/index.html        ← stub
  tokyo/index.html            ← stub
shared/
  js/chart-utils.js           ← Chart.js helpers (ES module)
  data/markham-rh.js          ← Markham & RH data constants
  data/hong-kong.js           ← Hong Kong data constants
vendor/
  chart.umd.js                ← Chart.js (do not modify)
sw.js                         ← service worker (PWA)
vercel.json                   ← routing
```

---

## Data Sources

| Market | Sources |
|--------|---------|
| Markham & Richmond Hill | TRREB, CMHC, listing.ca |
| Hong Kong | RVD Private Domestic Price Index, Centaline CCL, Demographia International Housing Affordability Survey |

All forecasts are scenarios, not financial advice.

---

Built by TeamYan · 2026

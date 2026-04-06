# Housing Analytics — CLAUDE.md

## Project Overview

Zero-dependency static site. No build step, no npm, no bundler.
Each city page is self-contained HTML. Shared utilities use native ES modules.
Deployed to Vercel as a static site. Every push to `main` auto-deploys.

## Local Dev

```bash
python3 -m http.server 3000
```

ES modules require a real HTTP server — `file://` URLs will not work.

> **Browser cache gotcha:** Python's dev server allows heuristic browser caching. After editing a data file, either hard-reload (Cmd+Shift+R) or append `?nocache=X` to the page URL. In production on Vercel this is not an issue.

## Architecture

```
index.html                        ← city-selector landing page
cities/<city-slug>/index.html     ← each city's full analytics page
shared/js/chart-utils.js          ← Chart.js helpers (ES module)
shared/data/<city-slug>.js        ← city data constants (ES module)
vendor/chart.umd.js               ← Chart.js library (UMD, never modify)
sw.js                             ← service worker (PWA, cache v2)
vercel.json                       ← routing rules
```

- Chart.js is loaded via `<script src="/vendor/chart.umd.js">` before any modules
- Shared modules are imported with **absolute paths** (`/shared/js/chart-utils.js`) so they work at any folder depth
- City-specific state (`currentDistrict`, `currentScenario`) lives in each city page, not in shared utils
- `window.setDistrict` / `window.setScenario` must be assigned explicitly (not just declared) because they are called from inline `onclick` attributes in HTML

## Design System — DO NOT CHANGE

| Token | Value |
|-------|-------|
| Font — headings | Playfair Display |
| Font — body | DM Sans |
| Font — data/numbers | DM Mono |
| Dark background | `#0d0f12` |
| Markham blue | `#4a9eff` |
| RH green | `#70c542` |
| Bear red | `#e85c4a` |
| Gold accent | `#d4a843` |
| Max content width | 900px |
| Side padding | 40px desktop, 20px mobile |
| Theme persistence | `localStorage` key `housing-theme` |

## How to Add a New City Page

1. Create `cities/<city-slug>/index.html` — copy the closest existing live page as template
2. Create `shared/data/<city-slug>.js` — city data modules are city-specific in structure; use an existing data file as a reference
3. Add a city card to `index.html` (the landing page) city grid
4. Add the new page URLs to `sw.js` `APP_SHELL` array if you want them pre-cached
5. Add a route to `vercel.json`

## Data Module Notes

Each city's data module exports named constants consumed by its page script. The exact shape is city-specific — Markham/RH exports `MARKHAM_HIST`, `RH_HIST`, `FCAST_YEARS`, and `SCENARIOS` with `mk`/`rh` keys; Hong Kong exports `HIST_PRICES`, `SCENARIOS` with `price`/`hki` keys, plus `COMPARE_ROWS`, `EVENTS`, `DRIVERS`, `CITY_META`.

**Critical:** Never use single-quoted strings for long text values that may contain apostrophes (e.g. `"Hong Kong's"`, `"Morgan Stanley's"`). Use template literals instead:

```js
// BAD — breaks on apostrophes
verdict: 'Hong Kong's geography...',

// GOOD
verdict: `Hong Kong's geography...`,
```

## Commit Style

Conventional commits. Examples:
- `feat: add hong kong analytics page`
- `refactor: extract shared chart-utils module`
- `fix: apostrophe syntax errors in hong-kong data`

One city page or feature per commit. Never commit `vendor/` changes. Never commit `.playwright-mcp/` or screenshot files.

## City Status

| City | Status | Data Source |
|------|--------|-------------|
| Markham & Richmond Hill | Live | TRREB, CMHC, listing.ca |
| Hong Kong | Live | RVD, Centaline CCL, Demographia |
| Toronto | Stub | — |
| Vancouver | Stub | — |
| Tokyo | Stub | — |

# Tokyo Analytics Page — Design Spec
**Date:** 2026-04-06  
**Status:** Approved

---

## Overview

Convert `cities/tokyo/index.html` from a stub page into a full analytics page, mirroring the Hong Kong page structure. Add `shared/data/tokyo.js` as the data module.

---

## Benchmark

- **Property type:** Resale condominium (中古マンション)
- **Standard unit:** 2LDK, 50 sqm
- **Price unit:** JPY total for a standard 50 sqm unit
- **Primary index:** Tokyo Kantei resale condo price per sqm (23 Special Wards composite), calibrated to MLIT transaction data anchors
- **Currency display:** JPY primary, USD equivalent in parentheses (¥150/USD 2024–25 reference rate)
- **Coverage:** 1995–2025 (31 data points, annual average)

---

## Data Module: `shared/data/tokyo.js`

### Exports

```js
export const HIST_YEARS      // [1995..2025], 31 values
export const HIST_PRICES     // TOKYO_ALL composite (JPY for 50 sqm unit)
export const HIST_CENTRAL3   // Central 3 Wards series (Minato, Chiyoda, Chūō)
export const HIST_INNER      // Inner Wards series (Shibuya, Shinjuku, Setagaya)
export const HIST_OUTER      // Outer Wards series (remaining wards + Tama)
export const FCAST_YEARS     // [2025..2030], 6 values
export const SCENARIOS       // base / bull / bear objects
export const COMPARE_ROWS    // district comparison table rows
export const EVENTS          // 9–10 annotated timeline events
export const DRIVERS         // structural drivers + headwinds grid (10 cards)
export const CITY_META       // hero metric stats
```

### Data Sources

- **Tokyo Kantei** — resale condo price per sqm by ward (published annual reports)
- **MLIT Land Price Publication (公示地価)** — official annual land value series
- **MLIT 土地総合情報システム** — transaction-level data for calibration anchors

Historical per-sqm values are researched via web search during implementation and calibrated to known anchors. Composite 23-ward series is the primary series; ward-group sub-series are derived proportionally from published Tokyo Kantei breakdowns.

### Key Historical Anchors

| Year | Event | 23-Ward composite (¥/sqm, approx) | 50 sqm unit |
|------|-------|-----------------------------------|-------------|
| 1995 | Post-bubble decline, mid-fall | ~350,000 | ~¥17.5M |
| 2004–05 | Trough | ~290,000–310,000 | ~¥15M |
| 2013 | Abenomics / BOJ QQE inflection | ~390,000–420,000 | ~¥20M |
| 2020 | COVID dip | ~580,000–620,000 | ~¥30M |
| 2024–25 | Current (Central 3 wards at ATH) | ~850,000–950,000 | ~¥43–48M |

*Precise values to be confirmed via web research during implementation.*

### Scenarios (2026–2030)

**Base (55%):** BOJ rate normalisation proceeds gradually; domestic buyer demand steady; foreign buyer presence stabilises. Outer wards +1–2%/yr, inner wards +3–4%/yr, central 3 +4–5%/yr.

**Bull (20%):** Yen stabilises or strengthens; foreign buyer surge continues (USD-denominated buyers see value); Expo 2025 infrastructure spend spillover; central wards hit new nominal highs.

**Bear (25%):** BOJ hikes faster than expected; demographic headwinds accelerate; outer-ward vacancy rates rise; population outflows from ageing suburbs resume.

Each scenario object: `{ label, price[], central3[], color, cls, metrics[], rows[], verdict }` — same shape as HK scenarios.

---

## Page Structure: `cities/tokyo/index.html`

Mirrors `cities/hong-kong/index.html` exactly. Sections in order:

### 1. Hero Metrics (4 stats)
- 1991 bubble peak price (¥M for 50 sqm composite + USD equivalent) — **hardcoded in `CITY_META`; data coverage starts 1995 so this is not derived from `HIST_PRICES`**
- 2025 current price (¥M + USD equivalent)
- Correction from peak (%)
- Price-to-income ratio (~7.5×, framed vs HK #1 globally)

### 2. 30-Year Price Chart + Scenarios
- District tabs: `All Tokyo` / `Central 3 Wards` / `Inner Wards` / `Outer Wards`
- Historical line 1995–2025, scenario fan 2025–2030
- Scenario toggle: base / bull / bear
- Accent colour for Tokyo: `#7c6af5` (violet/indigo — clearly distinct from all existing palette colours)

### 3. Scenario Cards + Tables
- Three cards (base/bull/bear) with metrics grid
- Detailed year-by-year table per scenario (2026–2030)
- Verdict paragraph per scenario

### 4. District Comparison Table
4 rows × columns: district name, current price (¥M / 50 sqm), 10-yr change, price-to-income ratio, gross rent yield

| District | Note |
|----------|------|
| All Tokyo (23 Wards) | Composite benchmark |
| Central 3 Wards | Minato, Chiyoda, Chūō — premium tier |
| Inner Wards | Shibuya, Shinjuku, Setagaya |
| Outer Wards | Remaining wards + Tama |

### 5. Market History Timeline (9–10 events)

| Year | Event | Direction |
|------|-------|-----------|
| 1991 | Asset bubble peak | Peak |
| 1997 | Asian Financial Crisis — demand shock | Down |
| 2002–04 | Trough — generational low | Trough |
| 2006 | Mini-recovery before GFC | Up |
| 2008 | GFC — brief correction | Down |
| 2013 | Abenomics + BOJ QQE; Abe elected | Inflection |
| 2016 | Negative interest rate policy (NIRP) | Up |
| 2020 | COVID — brief dip, fast recovery | Dip |
| 2022–23 | Yen collapse to ¥150+; foreign buyers surge | Up |
| 2024–25 | Central wards hit all-time highs; BOJ begins hikes | Mixed |

### 6. Structural Drivers & Headwinds Grid (10 cards)

**Supply drivers:**
- National upzoning law (no neighbourhood veto on residential construction)
- Ageing housing stock (depreciation is priced in; land value drives price)
- Construction cost inflation (labour shortages post-2020)

**Demand drivers:**
- Foreign buyer surge (weak yen, 2022–present)
- Domestic NISA investment accounts (new retail investor demand)
- Corporate relocations from regional cities to Tokyo

**Headwinds:**
- BOJ rate normalisation (first hikes since 2006)
- Structural population shrinkage (Japan -600K/yr net)
- Outer-ward vacancy rates (空き家 akiya problem)
- Two-tier market divergence (central ATH vs outer depreciation)

### Tokyo-Specific UI Elements

**Yen depreciation note** (below hero metrics):
> "Prices in JPY. USD equivalent uses ¥150/USD reference rate (2024–25 average). USD figures may flatter returns for foreign buyers who entered during peak yen weakness."

**Upzoning callout box** (in drivers section):
> Brief explainer: Japan's Building Standards Law allows residential construction in nearly all zoning categories nationally — no local government can block supply. This is the structural mechanism behind Tokyo's 30-year price stability vs peer cities.

---

## Files Changed

| File | Change |
|------|--------|
| `shared/data/tokyo.js` | New — full data module |
| `cities/tokyo/index.html` | Rewrite — stub → full analytics page |
| `index.html` | Update Tokyo city card badge: "In Progress" → "Live" |

Nav bar already has Tokyo link on all pages; sw.js already caches `/cities/tokyo/` — no changes needed to those files.

---

## Accent Colour

Tokyo: `#7c6af5` (violet/indigo). Distinct from Markham blue `#4a9eff`, RH green `#70c542`, bear/HK red `#e85c4a`, gold `#d4a843`. To be added to CLAUDE.md design system table after implementation.

---

## Out of Scope

- Cross-city comparison chart (planned for future `cities/compare/` page)
- Vancouver and Toronto full pages
- Cross-city comparison chart (planned for future `cities/compare/` page)
- Vancouver and Toronto full pages

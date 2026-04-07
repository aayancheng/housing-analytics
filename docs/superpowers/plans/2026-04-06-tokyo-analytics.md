# Tokyo Analytics Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `cities/tokyo/index.html` from a stub into a full analytics page and create its data module, mirroring the Hong Kong page structure.

**Architecture:** New `shared/data/tokyo.js` ES module holds all data constants. `cities/tokyo/index.html` is rebuilt from the HK page template with Tokyo-specific CSS variables, district config, JPY formatting, and data. Landing page card updated to Live.

**Tech Stack:** Vanilla HTML/CSS/JS, Chart.js (UMD via `/vendor/chart.umd.js`), native ES modules, Python HTTP server for local dev.

---

## File Map

| File | Action |
|------|--------|
| `shared/data/tokyo.js` | Create — full data module |
| `cities/tokyo/index.html` | Rewrite — stub → full analytics page |
| `index.html` | Modify — Tokyo city card stub → live |

---

## Task 1: Research Key Data Anchors

**Files:**
- No file changes — output feeds Task 2 data values

- [ ] **Step 1: Web-search Tokyo Kantei 2024–2025 resale condo prices**

Run these web searches to validate the 2022–2025 anchor values used in Task 2:
- "Tokyo Kantei 中古マンション 23区 2024 成約価格 坪単価"
- "Tokyo Kantei resale condo 23 wards 2024 price per sqm"
- "東京都 中古マンション 成約 2024 坪単価 区別"

Key targets to confirm:
- 23-ward composite 2024 resale: expect ~¥950,000–1,100,000/sqm → 50 sqm ≈ ¥47.5M–55M
- Central 3 wards (Minato, Chiyoda, Chūō) 2024 premium vs composite: expect 1.55–1.75×
- Outer wards 2024 discount vs composite: expect 0.70–0.78×

- [ ] **Step 2: Adjust Task 2 data values if research differs significantly**

If the web search shows the 2024–2025 composite is outside ¥47M–57M for 50 sqm, adjust the `HIST_PRICES` array in Task 2 accordingly before writing the file. The inner-year shape (1995–2020) is well-established; only 2021–2025 needs validation.

---

## Task 2: Create `shared/data/tokyo.js`

**Files:**
- Create: `shared/data/tokyo.js`

- [ ] **Step 1: Write the full data module**

Create `/Users/aayan/zzLearnAndCreate/HousePriceAnalytics/shared/data/tokyo.js` with this content:

```js
// Tokyo — shared data module
// Benchmark: Resale condominium (中古マンション) 2LDK, 50 sqm
// Price unit: JPY total for a standard 50 sqm unit in Tokyo 23 Special Wards
// Primary index: Tokyo Kantei resale condo price per sqm (23 Special Wards composite)
// Calibrated to MLIT transaction data and published Tokyo Kantei annual reports
// Sources: Tokyo Kantei, MLIT 土地総合情報システム, Demographia, NUMBEO

// ── HISTORICAL 1995–2025 ──────────────────────────────
// 31 data points. Annual average resale price for 50 sqm in each zone.
// Key anchors:
//   1991 bubble peak ≈ ¥58M (hardcoded in CITY_META — pre-series)
//   2003 trough ≈ ¥16.0M  (−72% from 1991 peak in nominal terms)
//   2013 Abenomics inflection ≈ ¥23.5M
//   2025 current ≈ ¥55.5M  (approaching 1991 bubble peak in nominal terms)

export const HIST_YEARS = [
  1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,
  2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,
  2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,
  2025
];

// 23 Special Wards composite
export const HIST_PRICES = [
  18500000, 18000000, 17500000, 17000000, 16700000,   // 1995–1999
  16500000, 16300000, 16100000, 16000000, 16300000,   // 2000–2004
  18000000, 20500000, 22500000, 21500000, 20000000,   // 2005–2009
  20000000, 19500000, 20500000, 23500000, 26000000,   // 2010–2014
  29000000, 30000000, 31500000, 33000000, 34000000,   // 2015–2019
  34500000, 38000000, 43500000, 48000000, 52500000,   // 2020–2024
  55500000                                             // 2025
];

// Central 3 Wards: Minato (港), Chiyoda (千代田), Chūō (中央)
// Premium: ~1.60× composite (expanding to ~1.70× in 2022–25 as foreign buyers concentrate here)
export const HIST_CENTRAL3 = [
  29600000, 28800000, 28000000, 27200000, 26700000,   // 1995–1999
  26400000, 26100000, 25800000, 25600000, 26100000,   // 2000–2004
  28800000, 32800000, 36000000, 34400000, 32000000,   // 2005–2009
  32000000, 31200000, 32800000, 37600000, 41600000,   // 2010–2014
  46400000, 48000000, 50400000, 52800000, 54400000,   // 2015–2019
  55200000, 62700000, 72200000, 80200000, 88200000,   // 2020–2024
  94400000                                             // 2025
];

// Inner Wards: Shibuya (渋谷), Shinjuku (新宿), Setagaya (世田谷)
// Premium: ~1.28× composite
export const HIST_INNER = [
  23700000, 23000000, 22400000, 21800000, 21400000,   // 1995–1999
  21100000, 20900000, 20600000, 20500000, 20900000,   // 2000–2004
  23000000, 26200000, 28800000, 27500000, 25600000,   // 2005–2009
  25600000, 24900000, 26200000, 30100000, 33300000,   // 2010–2014
  37100000, 38400000, 40300000, 42200000, 43500000,   // 2015–2019
  44200000, 48600000, 55700000, 61400000, 67200000,   // 2020–2024
  71000000                                             // 2025
];

// Outer Wards: remaining 17 wards + Tama area
// Discount: ~0.74× composite
export const HIST_OUTER = [
  13700000, 13300000, 13000000, 12600000, 12400000,   // 1995–1999
  12200000, 12100000, 11900000, 11800000, 12100000,   // 2000–2004
  13300000, 15200000, 16700000, 15900000, 14800000,   // 2005–2009
  14800000, 14400000, 15200000, 17400000, 19200000,   // 2010–2014
  21500000, 22200000, 23300000, 24400000, 25200000,   // 2015–2019
  25500000, 28100000, 32200000, 35600000, 38900000,   // 2020–2024
  41100000                                             // 2025
];

export const FCAST_YEARS = [2025, 2026, 2027, 2028, 2029, 2030];

// ── SCENARIOS ────────────────────────────────────────
// All prices: JPY total for standard 50 sqm unit
// price[] = 23-ward composite; central3[] = Central 3 Wards sub-series

export const SCENARIOS = {
  base: {
    label: 'Base Case',
    price:    [55500000, 57200000, 58900000, 60600000, 62400000, 64200000],
    central3: [94400000, 98200000, 102100000, 106200000, 110500000, 114900000],
    color: '#4a9eff',
    cls: 'v-base',
    metrics: [
      { label: '2025 starting point',    val: '¥55.5M',  cls: '',   sub: '50 sqm 2LDK · 23 Wards composite' },
      { label: '2030 target',            val: '¥64.2M',  cls: 'up', sub: '+15.7% from 2025 (~$428K USD)' },
      { label: 'Avg annual growth',      val: '~3.0%',   cls: '',   sub: 'BOJ normalisation absorbs demand' },
      { label: 'Central 3 Wards 2030',   val: '¥114.9M', cls: 'up', sub: '+21.7% · ~$766K USD' },
    ],
    rows: [
      { yr: '2026', price: '¥57.2M', c3: '¥98.2M',  yoy: '+3.1%', cls: 'up', phase: 'Consolidation',  driver: `BOJ rate cycle matures at 0.75–1.0%; foreign buyer activity stabilises as yen recovers; domestic demand steady` },
      { yr: '2027', price: '¥58.9M', c3: '¥102.1M', yoy: '+3.0%', cls: 'up', phase: 'Consolidation',  driver: `Yen modest recovery reduces foreign buyer incentive; local income growth supports organic demand in 23 wards` },
      { yr: '2028', price: '¥60.6M', c3: '¥106.2M', yoy: '+2.9%', cls: 'up', phase: 'Stable growth',  driver: `Supply discipline maintained; central wards still supply-constrained; elevated construction costs limit new stock` },
      { yr: '2029', price: '¥62.4M', c3: '¥110.5M', yoy: '+3.0%', cls: 'up', phase: 'Stable growth',  driver: `Outer ward depreciation continues; composite growth driven by central and inner wards; two-tier market entrenches` },
      { yr: '2030', price: '¥64.2M', c3: '¥114.9M', yoy: '+2.9%', cls: 'up', phase: 'Normalisation',  driver: `New equilibrium; 23-ward composite masks divergence between appreciating central wards and depreciating outer wards` },
    ],
    verdict: `<strong>Gradual appreciation with an accelerating two-tier divergence.</strong> The Bank of Japan's rate normalisation cycle — the first sustained hike cycle since 2006 — is the primary brake. At 0.75–1.0% policy rate by 2026, mortgage costs remain historically low but the direction has shifted. Domestic demand from NISA-driven real estate investment and corporate relocations from regional cities supports composite growth. Foreign buyers (primarily US, Taiwan, Hong Kong, mainland Chinese) who surged in 2022–24 on the yen collapse are a smaller but structural new demand source. <strong>¥64M for a 50 sqm 2LDK in the 23-ward composite by 2030 — equivalent to returning to bubble-era prices in real terms for the first time since 1991, but with a much wider spread between centre and periphery.</strong> Probability: ~55%.`,
  },
  bull: {
    label: 'Bull Case',
    price:    [55500000, 59900000, 64700000, 69900000, 75500000, 81500000],
    central3: [94400000, 103800000, 114200000, 125600000, 138200000, 152000000],
    color: '#70c542',
    cls: 'v-bull',
    metrics: [
      { label: '2025 starting point',    val: '¥55.5M',  cls: '',   sub: '50 sqm 2LDK · 23 Wards composite' },
      { label: '2030 target',            val: '¥81.5M',  cls: 'up', sub: '+46.8% from 2025 (~$543K USD)' },
      { label: 'Avg annual growth',      val: '~8.0%',   cls: 'up', sub: 'Foreign buyer-led surge' },
      { label: 'Central 3 Wards 2030',   val: '¥152.0M', cls: 'up', sub: '+61.0% · ~$1.01M USD' },
    ],
    rows: [
      { yr: '2026', price: '¥59.9M', c3: '¥103.8M', yoy: '+7.9%', cls: 'up', phase: 'Acceleration',   driver: `Yen stays weak (¥155–165); USD-denominated foreign buyers see 10–15% annual JPY returns without price appreciation` },
      { yr: '2027', price: '¥64.7M', c3: '¥114.2M', yoy: '+8.0%', cls: 'up', phase: 'Surge',          driver: `BOJ hike cycle stalls; institutional foreign capital enters residential market; Blackstone-style bulk purchases` },
      { yr: '2028', price: '¥69.9M', c3: '¥125.6M', yoy: '+8.0%', cls: 'up', phase: 'New highs',      driver: `Central wards breach ¥100M+/50 sqm; media narrative shifts to "Tokyo unaffordable"; domestic first-home buyers squeezed` },
      { yr: '2029', price: '¥75.5M', c3: '¥138.2M', yoy: '+8.0%', cls: 'up', phase: 'New highs',      driver: `Global capital sees Tokyo as undervalued vs London, NYC, HK; NISA flows amplified; new ATH in central wards` },
      { yr: '2030', price: '¥81.5M', c3: '¥152.0M', yoy: '+7.9%', cls: 'up', phase: 'New plateau',    driver: `Potential government intervention risk; but structural foreign demand creates a new price floor well above 2020 levels` },
    ],
    verdict: `<strong>Requires continued yen weakness and institutional foreign capital escalation.</strong> In this scenario, the yen stays structurally weak (¥155–165) through 2027, making Tokyo condos attractive to USD, TWD, HKD, and SGD-denominated buyers even as nominal JPY prices rise. Blackstone, GIC, and similar funds move from office to residential, compressing yields and lifting prices. The BOJ blinks — political pressure from a housing-cost backlash delays rate hikes. Domestic NISA inflows into J-REIT and direct property add a retail demand layer. <strong>¥80M+ for a 50 sqm 2LDK in the 23-ward composite — and ¥150M+ in Central 3 Wards — would represent a structural repricing of Tokyo away from its "affordable megacity" narrative. The Hong Kong trajectory, 15 years delayed.</strong> Probability: ~20%.`,
  },
  bear: {
    label: 'Bear Case',
    price:    [55500000, 53900000, 52300000, 52300000, 53900000, 55500000],
    central3: [94400000, 91600000, 88900000, 88900000, 91600000, 94400000],
    color: '#e85c4a',
    cls: 'v-bear',
    metrics: [
      { label: '2025 starting point',    val: '¥55.5M',  cls: '',   sub: '50 sqm 2LDK · 23 Wards composite' },
      { label: '2030 target',            val: '¥55.5M',  cls: '',   sub: '±0% from 2025 in nominal terms' },
      { label: 'Avg annual growth',      val: '~0.0%',   cls: 'dn', sub: 'Lost half-decade in nominal; −10% real' },
      { label: 'Trough year',            val: '2027–28', cls: 'dn', sub: '−5.8% from 2025' },
    ],
    rows: [
      { yr: '2026', price: '¥53.9M', c3: '¥91.6M', yoy: '−2.9%', cls: 'dn', phase: 'Correction',    driver: `BOJ hikes to 1.5%+ faster than expected; mortgage costs surge; foreign buyers exit as yen strengthens to ¥130–135` },
      { yr: '2027', price: '¥52.3M', c3: '¥88.9M', yoy: '−3.0%', cls: 'dn', phase: 'Trough',        driver: `Japan recession risk; population outflows from outer wards accelerate; akiya (vacant home) problem spreads to mid-ring` },
      { yr: '2028', price: '¥52.3M', c3: '¥88.9M', yoy: '0.0%',  cls: '',   phase: 'Stabilising',   driver: `BOJ pauses; transaction freeze thaws; bottom-fishing begins in central wards` },
      { yr: '2029', price: '¥53.9M', c3: '¥91.6M', yoy: '+3.1%', cls: 'up', phase: 'Recovery',      driver: `Policy support (tax incentives for first-home buyers); structural demand from urban consolidation` },
      { yr: '2030', price: '¥55.5M', c3: '¥94.4M', yoy: '+3.0%', cls: 'up', phase: 'Recovery',      driver: `Back to 2025 nominal levels; flat in nominal = significant real terms decline given inflation` },
    ],
    verdict: `<strong>Requires a BOJ policy error or sharper-than-expected demographic deterioration.</strong> Japan's population is shrinking by ~600,000/year net. The outer wards already have vacancy rates above 15% in some areas. If the BOJ moves rates to 1.5%+ before the economy is ready, mortgage resets trigger distressed listings in overleveraged outer-ward properties. A yen reversal to ¥130–135 eliminates the foreign buyer incentive overnight. <strong>The bear case for Tokyo is structurally mild compared to Hong Kong's 26% correction — the national upzoning law caps supply-driven bubbles, and Japan's deflation history means buyers are accustomed to price stability. A −6% correction followed by a grind back to 2025 levels by 2030 is the worst plausible outcome short of a major geopolitical shock.</strong> Probability: ~25%.`,
  },
};

// ── DISTRICT COMPARISON ───────────────────────────────
// Cross-section view at key years for each district group
// Columns: district, price 2025, price 2015 (10 yrs ago), 10yr change, P/I ratio, rent yield

export const COMPARE_ROWS = [
  {
    district: 'All Tokyo (23 Wards)',
    sub:    'Composite benchmark',
    cls:    'all',
    p2025:  55500000,
    p2015:  29000000,
    chg10:  '+91%',
    pti:    '7.5×',
    yield:  '4.2%',
  },
  {
    district: 'Central 3 Wards',
    sub:    'Minato · Chiyoda · Chūō',
    cls:    'c3',
    p2025:  94400000,
    p2015:  46400000,
    chg10:  '+103%',
    pti:    '12.8×',
    yield:  '3.1%',
  },
  {
    district: 'Inner Wards',
    sub:    'Shibuya · Shinjuku · Setagaya',
    cls:    'inner',
    p2025:  71000000,
    p2015:  37100000,
    chg10:  '+91%',
    pti:    '9.6×',
    yield:  '3.6%',
  },
  {
    district: 'Outer Wards',
    sub:    'Edogawa · Nerima · Katsushika + Tama',
    cls:    'outer',
    p2025:  41100000,
    p2015:  21500000,
    chg10:  '+91%',
    pti:    '5.6×',
    yield:  '5.2%',
  },
];

// ── MARKET HISTORY ─────────────────────────────────────
export const EVENTS = [
  {
    yr: '1986–1991',
    color: '#d4a843', bg: 'rgba(212,168,67,0.10)', badge: 'Bubble +280%',
    text: `<strong>The asset bubble: land prices triple in five years.</strong> Aggressive BoJ monetary easing and financial deregulation ignited a speculative frenzy. Tokyo condo prices rose ~280% from 1985 to 1991. Land in central Tokyo was theoretically worth more than the entire United States. A new 50 sqm condo in Minato-ku peaked at ¥80–100M. The BoJ raised rates six times between 1989 and 1990, puncturing the bubble.`
  },
  {
    yr: '1991–2003',
    color: '#e85c4a', bg: 'rgba(232,92,74,0.08)', badge: 'Crash −72%',
    text: `<strong>The "lost decade" — and then another.</strong> After the 1990 rate shock, land and property prices fell for 14 consecutive years. By 2003, Tokyo condo prices were 72% below the 1991 peak in nominal terms. Banks accumulated ¥100 trillion in non-performing loans. Japan entered structural deflation. Unlike Western housing corrections, Tokyo's decline was prolonged and orderly — no mass foreclosures, just relentless annual price erosion.`
  },
  {
    yr: '2002–2007',
    color: '#70c542', bg: 'rgba(112,197,66,0.08)', badge: 'Mini recovery',
    text: `<strong>Urban consolidation: central wards first.</strong> The trough was 2002–2003. A mini-recovery emerged as developers consolidated and the "urban revival" policy (都市再生) directed redevelopment capital into central Tokyo. The 2002 Urban Renaissance Special Measures Law fast-tracked large-scale redevelopment. Prices recovered 40% from 2003 to 2007 before the GFC, led by Minato, Chiyoda, and Chūō.`
  },
  {
    yr: '2008–2009',
    color: '#e85c4a', bg: 'rgba(232,92,74,0.08)', badge: 'GFC dip −11%',
    text: `<strong>Global Financial Crisis: a brief, shallow correction.</strong> Tokyo condos fell ~10–11% from the 2007 mini-peak to the 2009 trough — a mild correction by global standards. Japan's banking sector was less leveraged into US structured credit than European peers. The BoJ held rates near zero throughout. Recovery was swift; by 2012 prices had returned to pre-GFC levels.`
  },
  {
    yr: '2011',
    color: '#d4a843', bg: 'rgba(212,168,67,0.08)', badge: 'Tōhoku −4%',
    text: `<strong>March 2011 earthquake and tsunami: fear premium, not structural damage.</strong> The magnitude 9.0 Tōhoku earthquake caused a brief 3–4% dip in Tokyo condo prices, primarily on liquefaction risk fears in bay-area reclaimed land (Kōtō-ku, Edogawa-ku). The effect was short-lived — by late 2011 prices stabilised, and the subsequent reconstruction spending boosted economic sentiment.`
  },
  {
    yr: '2013',
    color: '#4a9eff', bg: 'rgba(74,158,255,0.08)', badge: 'Abenomics',
    text: `<strong>Abenomics + BOJ QQE: the structural inflection.</strong> December 2012: Shinzō Abe wins the election. January 2013: BOJ Governor Kuroda launches quantitative and qualitative easing (QQE) — an unprecedented asset purchase programme targeting 2% inflation. Real estate becomes the preferred inflation hedge. The Tokyo Olympic bid win (September 2013) adds speculative impetus. Prices rise steadily from ¥23.5M to ¥29M over 2013–2015.`
  },
  {
    yr: '2016',
    color: '#4a9eff', bg: 'rgba(74,158,255,0.08)', badge: 'NIRP',
    text: `<strong>Negative Interest Rate Policy: the rental yield floor collapses.</strong> January 2016: BoJ introduces negative rates (−0.1% on excess reserves). Mortgage rates fall to 0.5–0.7% for variable products. Gross rental yields compress to 3–5% but the buy-vs-rent calculus still favours buying at near-zero borrowing costs. Institutional capital flows accelerate into Tokyo residential real estate. Foreign buyers begin arriving in meaningful volumes.`
  },
  {
    yr: '2022–2023',
    color: '#7c6af5', bg: 'rgba(124,106,245,0.08)', badge: 'Yen collapse',
    text: `<strong>Yen falls to ¥150+: foreign buyers flood in.</strong> As the Fed raised rates 525 bps while the BoJ held at −0.1%, the yen/USD rate moved from ¥115 to ¥152 in 18 months. For USD, TWD, HKD, and SGD investors, Tokyo condos became 30% cheaper in 12 months without any nominal JPY price move. Foreign buyer activity surged — primarily US expats, Taiwanese investors, and Hong Kong residents diversifying post-NSL. Central ward prices rose 40% in two years.`
  },
  {
    yr: '2024',
    color: '#7c6af5', bg: 'rgba(124,106,245,0.08)', badge: 'BOJ hikes',
    text: `<strong>BOJ ends negative rates; Central 3 Wards hit all-time highs.</strong> March 2024: BoJ raises rates to 0% (ending NIRP). July 2024: rates raised to 0.25%. The yen recovered from ¥160 to ¥142. Despite the BoJ pivot, Tokyo condo prices continued rising — reflecting deep structural demand and limited supply in central wards. Central 3 Wards broke their all-time nominal high in 2024. The 23-ward composite crossed ¥50M/50 sqm for the first time.`
  },
  {
    yr: '2025',
    color: '#d4a843', bg: 'rgba(212,168,67,0.08)', badge: 'Two-tier market',
    text: `<strong>Two-tier divergence fully apparent: centre vs periphery.</strong> By 2025, Central 3 Wards average ¥94M for 50 sqm (~$627K USD) while Outer Wards average ¥41M (~$274K). The 2.3× spread is the widest on record. Outer ward vacancy rates (空き家率) continue rising; some Tama-area towns have 20%+ vacancy. The "affordable megacity" narrative is fracturing — Tokyo remains broadly affordable by global standards, but central Tokyo is now pricing out median-income buyers.`
  },
];

// ── STRUCTURAL DRIVERS & HEADWINDS ────────────────────
export const DRIVERS = [
  {
    type: 'tail', badge: '↑ tailwind', title: `Japan's national upzoning law`,
    body: `The Building Standards Law (建築基準法) designates land use nationally, with residential construction permitted in nearly all zones. No local government or neighbourhood association can block new housing supply — a structural impossibility in Canada, Australia, or the UK. This is the primary mechanism behind Tokyo's 30-year price stability. Supply responds to demand. The constraint is construction cost, not planning permission.`
  },
  {
    type: 'tail', badge: '↑ tailwind', title: 'Foreign buyer surge (yen weakness)',
    body: `The ¥150+ yen-to-USD rate that emerged in 2022–23 made Tokyo the cheapest major-city real estate in USD terms since the 1990s. Foreign buyers — US expats, Taiwanese investors, Hong Kong residents, mainland Chinese buyers — drove central ward prices up 40%+ in 2022–24. Even as the yen partially recovers, a structural foreign buyer base has been established. USD yields of 3–4% gross are competitive with New York or London at lower entry prices.`
  },
  {
    type: 'tail', badge: '↑ tailwind', title: 'NISA investment accounts',
    body: `Japan's 2024 NISA reform (新NISA) dramatically expanded tax-free investment accounts, pushing retail Japanese investors toward real estate and J-REITs. The population of investment-property buyers — previously deterred by Japan's complex landlord-tenant law — is growing. Urban condos in central Tokyo with 3–5% gross yields are increasingly viewed as NISA-adjacent inflation hedges by Japanese savers with negative real rates memory.`
  },
  {
    type: 'tail', badge: '↑ tailwind', title: 'Urban consolidation from regional cities',
    body: `Japan's regional cities (Sendai, Hiroshima, Niigata) are experiencing accelerating population decline. Corporate HQ relocations and talent pools continue concentrating in Tokyo. Net migration into Tokyo 23 Wards remains positive despite national population shrinkage. This structural urban concentration underpins 23-ward condo demand even as outer Tokyo experiences vacancy creep.`
  },
  {
    type: 'head', badge: '↓ headwind', title: 'BOJ rate normalisation',
    body: `The March 2024 end of NIRP and subsequent July 2024 hike to 0.25% mark Japan's first sustained rate cycle since 2006. Mortgage rates for fixed products have risen from 1.2% to 1.8–2.0%. Variable-rate mortgages (80% of new issuance) remain low but carry rate risk. If the BoJ moves to 1.5%+ by 2026, mortgage servicing costs would rise 30–40% for new borrowers — significant for outer ward buyers where income ratios are already stretched.`
  },
  {
    type: 'head', badge: '↓ headwind', title: 'Structural population shrinkage',
    body: `Japan loses ~600,000 people per year net (2024: −860,000 births vs deaths). The working-age population (25–54) peaked in the mid-2000s. While Tokyo itself remains a net domestic migration recipient, the underlying national demographic is relentlessly contractionary. Outer wards and Tama cities are already experiencing it — 20%+ vacancy rates in some districts. The空き家 (akiya, vacant home) problem is spreading inward.`
  },
  {
    type: 'head', badge: '↓ headwind', title: 'Ageing housing stock depreciation',
    body: `Japanese condos depreciate to near-zero land value over 30–40 years by convention — unlike Western markets where structures retain value. This is a structural headwind for resale prices in older stock (pre-2000 buildings). The premium for newer, earthquake-resistant post-2000 buildings (新耐震基準) grows over time. Buyers must factor in renovation costs and eventual land-only valuations for older units.`
  },
  {
    type: 'neutral', badge: '↔ watch', title: 'Two-tier market divergence',
    body: `The gap between Central 3 Wards (¥94M) and Outer Wards (¥41M) for an identical 50 sqm unit has never been wider. Central wards are increasingly driven by foreign capital and high-income domestic buyers; outer wards face vacancy creep and demographic pressure. The 23-ward "composite" average increasingly masks a bimodal distribution. Watch the ¥100M Central 3 threshold — if crossed by 2027, expect policy intervention.`
  },
  {
    type: 'neutral', badge: '↔ watch', title: 'Construction cost inflation',
    body: `Japanese construction costs have risen ~30% since 2020 due to global materials prices (steel, concrete) and severe labour shortages in the construction sector. New build prices have risen faster than resale, compressing the new-vs-resale spread that traditionally capped resale appreciation. Higher replacement costs set a floor on resale prices in well-maintained post-2000 stock.`
  },
  {
    type: 'tail', badge: '↑ tailwind', title: 'Long-term safe-haven: stable city in an uncertain region',
    body: `Tokyo combines the world's largest metro economy with Japan's rule of law, low crime, excellent infrastructure, and geographic distance from active geopolitical flashpoints compared to Hong Kong or Taiwan Strait-adjacent cities. As global wealthy investors diversify out of HK and into regional hedges, Tokyo's "political stability premium" grows. The low-entry-cost-vs-London narrative is increasingly understood in global wealth management circles.`
  },
];

// ── CITY METADATA ─────────────────────────────────────
// Note: bubblePeakPrice is the estimated 50 sqm 23-ward equivalent at the 1991 peak.
// It is hardcoded here — HIST_YEARS starts at 1995, so this is not derived from HIST_PRICES.
export const CITY_META = {
  name: 'Tokyo',
  region: 'Kantō Region · Japan',
  currency: 'JPY',
  usdRate: 150,                  // JPY per USD (2024–25 average)
  priceLabel: 'Resale condo 2LDK (50 sqm)',
  currentPrice: 55500000,        // 2025 composite JPY
  currentPriceUSD: 370000,       // at ¥150/USD
  bubblePeakPrice: 58000000,     // 1991 bubble peak — hardcoded (pre-series) JPY
  bubblePeakPriceUSD: 387000,    // at ¥150/USD for comparison
  bubblePeakYear: 1991,
  troughPrice: 16000000,         // 2003 trough JPY
  troughYear: 2003,
  correctionFromBubble: -72,     // % from 1991 peak to 2003 trough
  currentVsBubble: -4,           // % current vs 1991 peak (nominal only)
  priceToIncome: 7.5,            // Demographia 2025 — years of median gross household income
  noteOnDataSources: 'Tokyo Kantei resale condo price per sqm (中古マンション成約価格), calibrated to MLIT 土地総合情報システム transaction data. District series (Central 3 Wards, Inner Wards, Outer Wards) derived from composite using long-run published Tokyo Kantei ward-level breakdowns. All prices in JPY for standard 50 sqm 2LDK unit. USD equivalent at ¥150/USD (2024–25 average). Not financial advice.',
};
```

- [ ] **Step 2: Verify the module parses without errors**

```bash
cd /Users/aayan/zzLearnAndCreate/HousePriceAnalytics
python3 -m http.server 3000 &
# In another terminal or browser console:
# import('/shared/data/tokyo.js').then(m => console.log(Object.keys(m)))
# Should log: HIST_YEARS, HIST_PRICES, HIST_CENTRAL3, HIST_INNER, HIST_OUTER, FCAST_YEARS, SCENARIOS, COMPARE_ROWS, EVENTS, DRIVERS, CITY_META
```

Expected: No import errors, all keys visible.

- [ ] **Step 3: Check for apostrophes in string values**

Scan all `body`, `text`, and `verdict` fields for single-quoted strings containing apostrophes. The CLAUDE.md convention requires template literals (backtick strings) for any text containing `'`. All text fields in the module above already use template literals — verify no plain-string (`'...'`) values were accidentally introduced.

- [ ] **Step 4: Commit the data module**

```bash
git add shared/data/tokyo.js
git commit -m "feat: add tokyo data module (resale condo 50sqm, 23 wards, 1995-2025)"
```

---

## Task 3: Build `cities/tokyo/index.html`

**Files:**
- Rewrite: `cities/tokyo/index.html`
- Reference template: `cities/hong-kong/index.html` (copy and adapt)

- [ ] **Step 1: Copy HK page as starting point**

```bash
cp cities/hong-kong/index.html cities/tokyo/index.html
```

- [ ] **Step 2: Replace head metadata**

In `cities/tokyo/index.html`, replace:
```html
<meta name="description" content="Hong Kong private residential property analysis — 30 years of Class B apartment prices, three forward scenarios, and the structural forces shaping the world's least affordable housing market.">
```
with:
```html
<meta name="description" content="Tokyo housing market analysis — 30 years of resale condo prices, three forward scenarios, and the structural forces behind the world's most important affordability case study.">
```

Replace:
```html
<title>Hong Kong Housing — 30-Year Research Report</title>
```
with:
```html
<title>Tokyo Housing — 30-Year Research Report · Housing Analytics</title>
```

- [ ] **Step 3: Replace CSS colour variables (light theme)**

In the `:root` block, replace the HK-specific colour variables:
```css
    --hk-red:    #e85c4a;
    --hki:       #e85c4a;
    --kln:       #4a9eff;
    --nt:        #70c542;
    --base:      #4a9eff;
    --bull:      #70c542;
    --bear:      #e85c4a;
    --gold:      #d4a843;
    --shadow:    0 18px 36px rgba(31, 41, 55, 0.08);
    --page-top:  rgba(232,92,74,0.08);
    --page-start:#fbf6ef;
    --page-end:  #f3ece2;
    ...
    --hero-red-glow: rgba(232,92,74,0.14);
    --hero-gold-glow: rgba(212,168,67,0.12);
```
with:
```css
    --tokyo:     #7c6af5;
    --c3:        #e85c4a;
    --inner:     #d4a843;
    --outer:     #70c542;
    --base:      #4a9eff;
    --bull:      #70c542;
    --bear:      #e85c4a;
    --gold:      #d4a843;
    --shadow:    0 18px 36px rgba(31, 41, 55, 0.08);
    --page-top:  rgba(124,106,245,0.08);
    --page-start:#fbf6ef;
    --page-end:  #f3ece2;
    ...
    --hero-violet-glow: rgba(124,106,245,0.14);
    --hero-gold-glow:   rgba(212,168,67,0.12);
```

Also update the soft accent variables:
```css
    --accent-blue-soft: rgba(74,158,255,0.12);
    --accent-green-soft: rgba(112,197,66,0.14);
    --accent-red-soft: rgba(232,92,74,0.12);
```
Add:
```css
    --accent-violet-soft: rgba(124,106,245,0.12);
    --accent-gold-soft:   rgba(212,168,67,0.12);
    --accent-blue-soft:   rgba(74,158,255,0.12);
    --accent-green-soft:  rgba(112,197,66,0.14);
    --accent-red-soft:    rgba(232,92,74,0.12);
```

In the dark theme block (`html[data-theme="dark"]`), update:
```css
    --page-top:  rgba(124,106,245,0.06);
    --hero-violet-glow: rgba(124,106,245,0.10);
```

- [ ] **Step 4: Replace tab button active classes in CSS**

Find and replace the HK tab active classes:
```css
  .tab-btn.hki-active { border-color: var(--hki); color: #b33a2d; background: var(--accent-red-soft); }
  .tab-btn.kln-active { border-color: var(--kln); color: #1c56a9; background: var(--accent-blue-soft); }
  .tab-btn.nt-active  { border-color: var(--nt);  color: #3c7b15; background: var(--accent-green-soft); }
```
with:
```css
  .tab-btn.c3-active    { border-color: var(--c3);    color: #b33a2d; background: var(--accent-red-soft); }
  .tab-btn.inner-active { border-color: var(--inner);  color: #9e7412; background: var(--accent-gold-soft); }
  .tab-btn.outer-active { border-color: var(--outer);  color: #3c7b15; background: var(--accent-green-soft); }
```

Also update the active scenario button styles:
```css
  .sc-btn.sc-base.active { border-color: var(--base); color: #1c56a9; background: var(--accent-blue-soft); }
  .sc-btn.sc-bull.active { border-color: var(--bull); color: #3c7b15; background: var(--accent-green-soft); }
  .sc-btn.sc-bear.active { border-color: var(--bear); color: #b33a2d; background: var(--accent-red-soft); }
```
(These are unchanged — same class names as HK.)

- [ ] **Step 5: Update the hero `::before` glow to use violet**

```css
  .hero::before {
    ...
    background: radial-gradient(circle, var(--hero-violet-glow) 0%, transparent 70%);
```

Replace `var(--hero-red-glow)` with `var(--hero-violet-glow)` in the `.hero::before` rule.

- [ ] **Step 6: Replace the nav active link**

In the `<nav>` HTML:
```html
      <li><a href="/cities/hong-kong/" class="active">Hong Kong</a></li>
      ...
      <li><a href="/cities/tokyo/">Tokyo</a></li>
```
Change to:
```html
      <li><a href="/cities/hong-kong/">Hong Kong</a></li>
      ...
      <li><a href="/cities/tokyo/" class="active">Tokyo</a></li>
```

- [ ] **Step 7: Replace the hero section**

Replace the entire `<section class="hero">` with:
```html
<section class="hero">
  <div class="hero-top">
    <div class="hero-eyebrow">Kantō Region · Japan · Resale Condo 2LDK · 30-Year Research Report</div>
    <button class="theme-toggle" id="themeToggle" type="button" aria-pressed="false">Dark Mode</button>
  </div>
  <h1><em>Tokyo</em><br>Housing Market Analysis</h1>
  <p class="hero-sub">The world's most important housing policy case study — a megacity of 14 million that kept prices stable for three decades while Toronto, Vancouver, and Hong Kong exploded. A 30-year examination of resale condo prices, the upzoning mechanism behind the stability, and three forward scenarios to 2030.</p>
  <div class="hero-stats">
    <div class="hstat">
      <span class="hstat-val gold">7.5×</span>
      <span class="hstat-label">Price-to-income · Demographia 2025</span>
    </div>
    <div class="hstat">
      <span class="hstat-val">¥58M</span>
      <span class="hstat-label">1991 bubble peak (50 sqm · ~$387K USD)</span>
    </div>
    <div class="hstat">
      <span class="hstat-val gold">¥55.5M</span>
      <span class="hstat-label">2025 current · ~$370K USD at ¥150</span>
    </div>
    <div class="hstat">
      <span class="hstat-val dn">−4%</span>
      <span class="hstat-label">vs 1991 bubble peak (nominal only)</span>
    </div>
  </div>
</section>
```

Also update `h1 em` colour in CSS. Find:
```css
  .hero h1 em { color: var(--hk-red); font-style: normal; }
```
Replace with:
```css
  .hero h1 em { color: var(--tokyo); font-style: normal; }
```

- [ ] **Step 8: Replace currency note and district tabs**

Replace the currency note:
```html
    <span class="currency-note">Prices in HKD · USD equivalent at HK$7.80 peg · Standard 500 sqft (46 sqm) Class B unit</span>
```
with:
```html
    <span class="currency-note">Prices in JPY · USD equivalent at ¥150/USD (2024–25 avg) · Standard 50 sqm 2LDK resale condo · 23 Special Wards</span>
```

Replace the district tabs:
```html
    <div class="tab-row" id="districtTabs">
      <button class="tab-btn active"    onclick="setDistrict('all', this)">All Districts</button>
      <button class="tab-btn"           onclick="setDistrict('hki', this)">HK Island</button>
      <button class="tab-btn"           onclick="setDistrict('kln', this)">Kowloon</button>
      <button class="tab-btn"           onclick="setDistrict('nt', this)">New Territories</button>
    </div>
```
with:
```html
    <div class="tab-row" id="districtTabs">
      <button class="tab-btn active"      onclick="setDistrict('all', this)">All Tokyo</button>
      <button class="tab-btn"             onclick="setDistrict('c3', this)">Central 3 Wards</button>
      <button class="tab-btn"             onclick="setDistrict('inner', this)">Inner Wards</button>
      <button class="tab-btn"             onclick="setDistrict('outer', this)">Outer Wards</button>
    </div>
```

Update the chart note:
```html
      <p class="chart-note">Historical data: RVD Private Domestic Price Index ...</p>
```
with:
```html
      <p class="chart-note">Historical data: Tokyo Kantei resale condo price per sqm (中古マンション成約価格, 23 Special Wards), calibrated to MLIT transaction data. District series derived using long-run ward-level Tokyo Kantei breakdowns. Forecasts: scenario analysis. Not financial advice.</p>
```

- [ ] **Step 9: Replace the scenario section heading**

```html
      <h2>Class B Apartment — 5-Year Scenarios</h2>
```
→
```html
      <h2>Resale Condo 2LDK — 5-Year Scenarios</h2>
```

- [ ] **Step 10: Replace the district comparison section**

Replace the entire district comparison `<section class="section">` with:
```html
  <!-- ══════ DISTRICT COMPARISON ═══════════════════ -->
  <section class="section">
    <div class="section-head">
      <h2>District Price Comparison</h2>
      <span class="section-tag">All Tokyo · Central 3 · Inner · Outer</span>
    </div>
    <div class="yr-table-wrap">
      <table class="yr-table" id="districtTable"></table>
    </div>
  </section>
```

- [ ] **Step 11: Replace the affordability callout**

Replace the `<div class="afford-box">` section with:
```html
  <!-- ══════ AFFORDABILITY CALLOUT ════════════════ -->
  <div class="afford-box">
    <div class="afford-label">↗ Cross-city comparison — price-to-income ratio (Demographia 2025)</div>
    <div class="afford-grid">
      <div class="afford-item">
        <span class="afford-city">Hong Kong</span>
        <span class="afford-ratio worst">16.7×</span>
      </div>
      <div class="afford-item">
        <span class="afford-city">Vancouver</span>
        <span class="afford-ratio">12.3×</span>
      </div>
      <div class="afford-item">
        <span class="afford-city">Toronto</span>
        <span class="afford-ratio">9.3×</span>
      </div>
      <div class="afford-item">
        <span class="afford-city">Tokyo</span>
        <span class="afford-ratio" style="color:var(--tokyo)">7.5×</span>
      </div>
    </div>
    <p class="afford-note">Years of gross median household income required to purchase a median-priced home. Tokyo is the only global megacity with a ratio approaching what housing economists consider sustainable (&lt;6×). Full cross-city comparison page coming soon.</p>
  </div>

  <!-- ══════ UPZONING CALLOUT ══════════════════════ -->
  <div class="afford-box" style="margin-top:16px; border-left-color:var(--tokyo)">
    <div class="afford-label" style="color:var(--tokyo)">↗ The mechanism — Japan's national upzoning law</div>
    <p style="font-size:13px;color:var(--muted);line-height:1.65;margin-top:8px">Japan's Building Standards Law (建築基準法) designates land use nationally. Residential construction is permitted in nearly all zones — no local government or neighbourhood association can block new housing supply. This structural impossibility in Canada, Australia, or the UK is why Tokyo's prices remained flat while peer cities tripled. Supply responds to demand. The constraint in Tokyo is construction cost, not planning permission.</p>
  </div>
```

- [ ] **Step 12: Update the section headings for events and source note**

Find:
```html
      <h2>Market History — Key Turning Points</h2>
      <span class="section-tag">1994–2025</span>
```
Replace with:
```html
      <h2>Market History — Key Turning Points</h2>
      <span class="section-tag">1986–2025</span>
```

Replace the source note at the bottom of `<main>`:
```html
  <div class="source-note">
    <strong>Data sources:</strong> Hong Kong Rating and Valuation Department ...
  </div>
```
with:
```html
  <div class="source-note">
    <strong>Data sources:</strong> Tokyo Kantei (東京カンテイ) — resale condo closing prices per sqm (中古マンション成約価格) by ward · MLIT 土地総合情報システム — transaction-level data · MLIT 公示地価 — official land price publication · Demographia International Housing Affordability Survey (2025) · NUMBEO Property Investment Index · Bank of Japan monetary policy records · Ministry of Land, Infrastructure, Transport and Tourism. District series (Central 3 Wards, Inner Wards, Outer Wards) derived from composite using published Tokyo Kantei ward-level breakdowns. All prices in JPY for a standard 50 sqm 2LDK resale condo. USD equivalent at ¥150/USD (2024–25 average). All forecasts are scenarios, not financial advice. Compiled April 2026.
  </div>
```

- [ ] **Step 13: Replace the `<script type="module">` block**

Replace the entire `<script type="module">` block (from `import {` to the closing `</script>`) with:

```html
<script type="module">
import { HIST_YEARS, HIST_PRICES, HIST_CENTRAL3, HIST_INNER, HIST_OUTER, FCAST_YEARS, SCENARIOS, COMPARE_ROWS, EVENTS, DRIVERS, CITY_META } from '/shared/data/tokyo.js';
import { buildChart } from '/shared/js/chart-utils.js';

// ── STATE ────────────────────────────────────────────
let currentDistrict = 'all';
let currentScenario = 'base';
let mainChart = null;
let currentTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

const DISTRICT_CONFIG = {
  all:   { label: 'All Tokyo',       data: HIST_PRICES,   barColor: 'rgba(124,106,245,0.35)', cls: '',            fcastRatio: 1.00 },
  c3:    { label: 'Central 3 Wards', data: HIST_CENTRAL3, barColor: 'rgba(232,92,74,0.40)',   cls: 'c3-active',   fcastRatio: null },
  inner: { label: 'Inner Wards',     data: HIST_INNER,    barColor: 'rgba(212,168,67,0.35)',  cls: 'inner-active',fcastRatio: 1.28 },
  outer: { label: 'Outer Wards',     data: HIST_OUTER,    barColor: 'rgba(112,197,66,0.35)',  cls: 'outer-active',fcastRatio: 0.74 },
};

function formatJPY(jpy) {
  if (jpy === null || jpy === undefined) return '';
  const m = jpy / 1_000_000;
  return `¥${m.toFixed(1).replace(/\.0$/, '')}M`;
}

function formatUSD(jpy) {
  const usd = Math.round(jpy / CITY_META.usdRate / 1000) * 1000;
  return `~$${(usd / 1_000).toFixed(0)}K USD`;
}

// ── THEME ────────────────────────────────────────────
function updateThemeButton() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const nextTheme = currentTheme === 'dark' ? 'Light' : 'Dark';
  btn.textContent = `${nextTheme} Mode`;
  btn.setAttribute('aria-pressed', String(currentTheme === 'dark'));
  btn.setAttribute('aria-label', `Switch to ${nextTheme.toLowerCase()} mode`);
}

function updateThemeMeta() {
  const m = document.querySelector('meta[name="theme-color"]');
  if (m) m.setAttribute('content', currentTheme === 'dark' ? '#0d0f12' : '#f7f1e8');
}

function applyTheme(theme) {
  currentTheme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = currentTheme;
  try { localStorage.setItem('housing-theme', currentTheme); } catch (e) {}
  updateThemeMeta();
  updateThemeButton();
  if (mainChart) buildMainChart();
}

// ── CHART ────────────────────────────────────────────
function buildMainChart() {
  if (mainChart) { mainChart.destroy(); mainChart = null; }

  const allLabels = HIST_YEARS.map(String).concat(['2026','2027','2028','2029','2030']);
  const hLen = HIST_YEARS.length;
  const cfg = DISTRICT_CONFIG[currentDistrict];

  const histData = new Array(allLabels.length).fill(null);
  cfg.data.forEach((v, i) => { histData[i] = v; });

  function forecastLine(sc) {
    const arr = new Array(allLabels.length).fill(null);
    // Central 3 has its own forecast series; inner/outer scale the composite by ratio
    const src = (currentDistrict === 'c3')
      ? SCENARIOS[sc].central3
      : SCENARIOS[sc].price.map(p => Math.round(p * cfg.fcastRatio));
    src.forEach((p, i) => { arr[hLen - 1 + i] = p; });
    return arr;
  }

  const datasets = [
    {
      type: 'bar',
      label: `${cfg.label} resale historical`,
      data: histData,
      backgroundColor: cfg.barColor,
      borderRadius: 2,
      borderSkipped: false,
      order: 3,
    },
    {
      type: 'line', label: 'Base forecast',  data: forecastLine('base'),
      borderColor: '#4a9eff', backgroundColor: 'transparent', tension: 0.3, order: 1,
      borderWidth: currentScenario === 'base' ? 2.5 : 1,
      pointRadius: currentScenario === 'base' ? 3 : 2,
      borderDash: currentScenario === 'base' ? [] : [6, 4],
    },
    {
      type: 'line', label: 'Bull forecast', data: forecastLine('bull'),
      borderColor: '#70c542', backgroundColor: 'transparent', tension: 0.3, order: 1,
      borderWidth: currentScenario === 'bull' ? 2.5 : 1,
      pointRadius: currentScenario === 'bull' ? 3 : 2,
      borderDash: currentScenario === 'bull' ? [] : [6, 4],
    },
    {
      type: 'line', label: 'Bear forecast', data: forecastLine('bear'),
      borderColor: '#e85c4a', backgroundColor: 'transparent', tension: 0.3, order: 1,
      borderWidth: currentScenario === 'bear' ? 2.5 : 1,
      pointRadius: currentScenario === 'bear' ? 3 : 2,
      borderDash: currentScenario === 'bear' ? [] : [6, 4],
    },
  ];

  const legendBar   = document.getElementById('legendBar');
  const legendLabel = document.getElementById('legendLabel');
  if (legendBar)   legendBar.style.background = cfg.barColor;
  if (legendLabel) legendLabel.textContent = `${cfg.label} historical`;

  mainChart = buildChart(document.getElementById('mainChart'), datasets, {
    labels: allLabels,
    scales: {
      y: {
        min: 5000000,
        ticks: {
          callback: v => '¥' + (v >= 1_000_000 ? (v / 1_000_000).toFixed(0) + 'M' : (v / 1000).toFixed(0) + 'K')
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: ctx => {
            if (ctx.parsed.y === null) return null;
            return ` ${ctx.dataset.label}: ${formatJPY(ctx.parsed.y)}`;
          }
        }
      }
    }
  });
}

// ── SCENARIO SECTION ─────────────────────────────────
function buildScenarioSection(sc) {
  const S = SCENARIOS[sc];

  document.getElementById('scenarioMetrics').innerHTML = S.metrics.map(m => `
    <div class="metric-card">
      <div class="mc-label">${m.label}</div>
      <div class="mc-val ${m.cls}">${m.val}</div>
      <div class="mc-sub">${m.sub}</div>
    </div>`).join('');

  document.getElementById('scenarioTable').innerHTML = `
    <thead><tr>
      <th>Year</th>
      <th>23-Ward Composite</th>
      <th>Central 3 Wards</th>
      <th>YoY</th>
      <th>Phase</th>
      <th>Key driver</th>
    </tr></thead>
    <tbody>${S.rows.map((r, i) => `
      <tr>
        <td>${r.yr}</td>
        <td class="price">${r.price} <span style="font-size:10px;color:var(--muted)">(${formatUSD(S.price[i+1])})</span></td>
        <td class="price" style="color:var(--c3)">${r.c3}</td>
        <td class="${r.cls === 'up' ? 'chg-up' : (r.cls === 'dn' ? 'chg-dn' : '')}">${r.yoy}</td>
        <td><span class="era-badge" style="background:rgba(31,41,55,0.06);color:var(--muted)">${r.phase}</span></td>
        <td class="yr-note">${r.driver}</td>
      </tr>`).join('')}
    </tbody>`;

  document.getElementById('scenarioVerdict').innerHTML = `
    <div class="verdict-box ${S.cls}">
      <div class="vb-label ${S.cls}">${S.label} — Analyst Verdict</div>
      <div class="vb-text">${S.verdict}</div>
    </div>`;
}

// ── DISTRICT COMPARISON TABLE ─────────────────────────
function buildDistrictComparison() {
  const colorMap = {
    all:   'var(--tokyo)',
    c3:    'var(--c3)',
    inner: 'var(--inner)',
    outer: 'var(--outer)',
  };
  document.getElementById('districtTable').innerHTML = `
    <thead><tr>
      <th>District</th>
      <th>2025 Price (50 sqm)</th>
      <th>2015 Price</th>
      <th>10-yr change</th>
      <th>Price-to-income</th>
      <th>Gross yield</th>
    </tr></thead>
    <tbody>${COMPARE_ROWS.map(r => `
      <tr>
        <td>
          <span style="color:${colorMap[r.cls]};font-weight:500">${r.district}</span>
          <div style="font-size:11px;color:var(--muted)">${r.sub}</div>
        </td>
        <td class="price">${formatJPY(r.p2025)} <span style="font-size:10px;color:var(--muted)">(${formatUSD(r.p2025)})</span></td>
        <td class="price" style="color:var(--muted)">${formatJPY(r.p2015)}</td>
        <td class="chg-up">${r.chg10}</td>
        <td style="font-family:var(--mono);font-size:12px;color:var(--text)">${r.pti}</td>
        <td style="font-family:var(--mono);font-size:12px;color:var(--bull)">${r.yield}</td>
      </tr>`).join('')}
    </tbody>`;
}

// ── EVENTS ────────────────────────────────────────────
function buildEvents() {
  document.getElementById('eventsList').innerHTML = EVENTS.map(e => `
    <div class="event-row">
      <span class="ev-yr">${e.yr}</span>
      <span class="ev-badge" style="background:${e.bg};color:${e.color}">${e.badge}</span>
      <span class="ev-text">${e.text}</span>
    </div>`).join('');
}

// ── DRIVERS ───────────────────────────────────────────
function buildDrivers() {
  document.getElementById('driversGrid').innerHTML = DRIVERS.map(d => `
    <div class="driver-card ${d.type}">
      <div class="d-head">
        <span class="d-badge ${d.type}">${d.badge}</span>
        <span class="d-title">${d.title}</span>
      </div>
      <div class="d-body">${d.body}</div>
    </div>`).join('');
}

// ── INTERACTIONS ──────────────────────────────────────
window.setDistrict = function(district, btn) {
  currentDistrict = district;
  document.querySelectorAll('#districtTabs .tab-btn').forEach(b => {
    b.classList.remove('active', 'c3-active', 'inner-active', 'outer-active');
  });
  const cfg = DISTRICT_CONFIG[district];
  if (cfg.cls) btn.classList.add(cfg.cls);
  else btn.classList.add('active');
  buildMainChart();
};

window.setScenario = function(sc, btn) {
  currentScenario = sc;
  document.querySelectorAll('.sc-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  buildScenarioSection(sc);
  buildMainChart();
};

// ── INIT ──────────────────────────────────────────────
buildMainChart();
buildScenarioSection('base');
buildDistrictComparison();
buildEvents();
buildDrivers();
updateThemeMeta();
updateThemeButton();

document.getElementById('themeToggle').addEventListener('click', () => {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

const hamburger = document.getElementById('navHamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(open));
});

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.error('Service worker registration failed:', err);
    });
  }
});
</script>
```

- [ ] **Step 14: Browser-verify the page loads and charts render**

```bash
# Server should already be running from Task 2, Step 2
# Open: http://localhost:3000/cities/tokyo/
```

Expected:
- Hero shows Tokyo title, 4 stats (7.5×, ¥58M, ¥55.5M, −4%)
- Chart renders with 4 bar+line series for All Tokyo tab
- Clicking "Central 3 Wards" tab changes chart (red bars, higher values)
- Scenario toggle (Base/Bull/Bear) updates metrics, table, verdict
- District comparison table shows 4 rows with all columns populated
- Theme toggle works and chart re-renders

- [ ] **Step 15: Commit the Tokyo analytics page**

```bash
git add cities/tokyo/index.html
git commit -m "feat: add tokyo full analytics page (resale condo 50sqm, 1995-2025)"
```

---

## Task 4: Update `index.html` Landing Page Card

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Update the Tokyo city card from stub to live**

In `index.html`, find the Tokyo card block:
```html
    <!-- Tokyo -->
    <div class="city-card stub tok-card">
      <div class="card-top">
        <div></div>
        <span class="card-badge badge-progress">In Progress</span>
      </div>
      <div class="card-city">Tokyo</div>
      <div class="card-region">Kantō · Japan</div>
      <div class="card-stat">
        <span class="stat-val gold">~10×</span>
        <span class="stat-label">Price-to-income vs Hong Kong</span>
      </div>
      <div class="card-cta">Coming Soon <span class="cta-arrow">→</span></div>
    </div>
```

Replace with:
```html
    <!-- Tokyo -->
    <a class="city-card live tok-card" href="/cities/tokyo/">
      <div class="card-top">
        <div></div>
        <span class="card-badge badge-live">Live</span>
      </div>
      <div class="card-city">Tokyo</div>
      <div class="card-region">Kantō · Japan</div>
      <div class="card-stat">
        <span class="stat-val gold">7.5×</span>
        <span class="stat-label">Price-to-income · Demographia 2025</span>
      </div>
      <div class="card-cta">View Report <span class="cta-arrow">→</span></div>
    </a>
```

- [ ] **Step 2: Update the Tokyo card top-accent colour in CSS**

In `index.html`, find:
```css
  .city-card.tok-card::before { background: var(--muted); }
```
Replace with:
```css
  .city-card.tok-card::before { background: #7c6af5; }
```

- [ ] **Step 3: Verify the landing page**

```bash
# Open: http://localhost:3000/
```

Expected:
- Tokyo card is now fully opaque (not dimmed), clickable, shows "Live" badge
- Clicking the Tokyo card navigates to `/cities/tokyo/`
- Card has a violet top accent stripe

- [ ] **Step 4: Update the footer data attribution**

In `index.html`, find:
```html
  <span class="footer-text">Data: TRREB · CMHC · RVD · Centaline · 2026</span>
```
Replace with:
```html
  <span class="footer-text">Data: TRREB · CMHC · RVD · Centaline · Tokyo Kantei · MLIT · 2026</span>
```

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: promote tokyo card to live on landing page"
```

---

## Task 5: Browser Verification

**Files:** No changes — verification only.

- [ ] **Step 1: Full navigation smoke-test**

With `python3 -m http.server 3000` running:

| Page | URL | Check |
|------|-----|-------|
| Landing | `http://localhost:3000/` | Tokyo card shows Live, violet accent, links correctly |
| Tokyo page | `http://localhost:3000/cities/tokyo/` | All sections render, no blank areas |
| HK page | `http://localhost:3000/cities/hong-kong/` | Unchanged, still works |
| Markham | `http://localhost:3000/cities/markham-rh/` | Unchanged, still works |

- [ ] **Step 2: Tokyo page section-by-section check**

Visit `http://localhost:3000/cities/tokyo/` and verify each section:

1. **Hero:** 4 stats visible (7.5×, ¥58M, ¥55.5M, −4%)
2. **Chart:** Bar chart renders with labelled bars 1995–2025, 3 forecast lines 2026–2030
3. **District tabs:** All 4 tabs ("All Tokyo", "Central 3 Wards", "Inner Wards", "Outer Wards") — click each, chart updates with different bars
4. **Scenario toggle:** Base/Bull/Bear — clicking each updates metrics grid, year-by-year table, and verdict box
5. **District comparison table:** 4 rows, all columns populated (price, 10yr, P/I, yield)
6. **Affordability callout:** 4 cities shown, Tokyo highlighted in violet
7. **Upzoning callout:** Visible below affordability callout
8. **Events timeline:** 10 event rows, all with badges and text
9. **Drivers grid:** 10 cards (tailwinds + headwinds + neutral), left accent bars coloured correctly
10. **Source note:** Visible at bottom

- [ ] **Step 3: Theme toggle test**

Toggle dark/light on the Tokyo page. Chart should re-render with appropriate dark/light colours. Theme should persist if you navigate away and back.

- [ ] **Step 4: Mobile layout test**

Resize browser to 375px width (or use DevTools mobile emulation):
- Nav collapses to hamburger
- Hero stats reflow to 2×2 grid
- Chart reflows to 320px height
- District comparison table scrolls horizontally
- Drivers grid stacks to 1 column

- [ ] **Step 5: Check for console errors**

Open browser DevTools console on `http://localhost:3000/cities/tokyo/`. There should be no import errors, no undefined reference errors, no Chart.js errors.

- [ ] **Step 6: Stop local server**

```bash
kill %1
# or: pkill -f "python3 -m http.server"
```

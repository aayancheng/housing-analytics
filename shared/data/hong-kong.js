// Hong Kong — shared data module
// Benchmark: Class B private domestic apartments (40–69.9 sqm / ~430–750 sqft)
// Price unit: HKD total for a standard 500 sqft (46 sqm) Class B unit
// Index basis: CCL (Centa-City Leading Index, base = July 1997 = 100) calibrated to
//   Oct 2025 RVD Class B average of HK$132,729/sqm (~HK$12,300/sqft)
// Sources: RVD Private Domestic Price Index, Centaline CCL, Demographia, NUMBEO,
//   SCMP, GlobalPropertyGuide, Cushman & Wakefield HK 2026 Outlook, CBRE HK 2026

// ── HISTORICAL 1995–2025 ──────────────────────────────
// 31 data points. Prices represent the composite CCL-calibrated market rate
// for a 500 sqft Class B unit across all districts (annual average).
// Key anchors:
//   1997 summer peak (CCL = 100) ≈ HK$9,500/sqft
//   2003 SARS trough (CCL = 32) = −65% from 1997 ≈ HK$3,300/sqft
//   2018 all-time high (CCL = 188.6) ≈ HK$18,000/sqft
//   Oct 2025 (CCL ≈ 127, stabilising) ≈ HK$12,300/sqft  [RVD official]

export const HIST_YEARS = [
  1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,
  2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,
  2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025
];

export const HIST_PRICES = [
  3400000, 3950000, 4750000, 3100000, 2450000,   // 1995–1999
  2200000, 2050000, 1850000, 1650000, 2100000,   // 2000–2004
  2450000, 2850000, 3600000, 3250000, 4200000,   // 2005–2009
  5400000, 6000000, 5900000, 5800000, 6200000,   // 2010–2014
  6750000, 6600000, 7500000, 9000000, 8300000,   // 2015–2019
  8100000, 8400000, 7150000, 6650000, 6200000,   // 2020–2024
  6150000                                         // 2025
];

export const FCAST_YEARS = [2025, 2026, 2027, 2028, 2029, 2030];

// ── SCENARIOS ────────────────────────────────────────
// All prices: HKD total for standard 500 sqft Class B unit
// price[] = overall composite; hki[] = HK Island premium sub-series

export const SCENARIOS = {
  base: {
    label: 'Base Case',
    price: [6150000, 6460000, 6780000, 7050000, 7260000, 7480000],
    hki:   [7990000, 8390000, 8810000, 9160000, 9430000, 9720000],
    color: '#4a9eff',
    cls: 'v-base',
    metrics: [
      { label: '2025 starting point',  val: 'HK$6.15M',  cls: '',   sub: '500 sqft Class B composite' },
      { label: '2030 target',          val: 'HK$7.48M',  cls: 'up', sub: '+21.6% from 2025' },
      { label: 'Avg annual growth',    val: '~4.0%',     cls: '',   sub: 'Gradual recovery' },
      { label: 'All-time high (2018)', val: 'HK$9.0M',   cls: '',   sub: 'Unlikely to revisit by 2030' },
    ],
    rows: [
      { yr:'2026', price:'HK$6.46M', yoy:'+5.0%', cls:'up', phase:'Recovery',     driver:'Rate cuts + mainland buyers returning; cooling-measure removal effect' },
      { yr:'2027', price:'HK$6.78M', yoy:'+5.0%', cls:'up', phase:'Recovery',     driver:'Steady volume recovery; Fed pivot completing; GBA demand solidifies' },
      { yr:'2028', price:'HK$7.05M', yoy:'+4.0%', cls:'up', phase:'Expansion',    driver:'Supply constraints bite; IPO wealth effect; new land sales limited' },
      { yr:'2029', price:'HK$7.26M', yoy:'+3.0%', cls:'up', phase:'Expansion',    driver:'Cycle matures; income growth moderates appreciation pace' },
      { yr:'2030', price:'HK$7.48M', yoy:'+3.0%', cls:'up', phase:'Normalisation',driver:'New equilibrium at structurally elevated but sub-2018 level' },
    ],
    verdict: `<strong>Bottomed in early 2025, grinding higher through 2030.</strong> The removal of all cooling measures in Feb 2024 and 200+ bps of Fed rate cuts have restored transaction volume. Mainland buyers (~22–24% of 2025 transactions by volume, ~30% by value) are the marginal price-setters. Supply remains structurally tight — Hong Kong's geography caps new land release, and the 70:30 public/private split in the 2026–35 housing plan leaves limited private supply additions. <strong>HK$7.0–7.5M for a standard 500 sqft Class B by 2030 — meaningful recovery but still ~17% below the 2018 peak in nominal terms.</strong> Probability: ~55%.`,
  },
  bull: {
    label: 'Bull Case',
    price: [6150000, 6770000, 7310000, 7820000, 8290000, 8700000],
    hki:   [7990000, 8790000, 9500000, 10160000, 10780000, 11310000],
    color: '#70c542',
    cls: 'v-bull',
    metrics: [
      { label: '2025 starting point',  val: 'HK$6.15M',  cls: '',   sub: '500 sqft Class B composite' },
      { label: '2030 target',          val: 'HK$8.70M',  cls: 'up', sub: '+41.5% from 2025' },
      { label: 'Avg annual growth',    val: '~7.2%',     cls: 'up', sub: 'Strong cycle recovery' },
      { label: '2018 peak recovery',   val: '2029',      cls: 'up', sub: 'Approaches HK$9M ATH' },
    ],
    rows: [
      { yr:'2026', price:'HK$6.77M', yoy:'+10.1%', cls:'up', phase:'Surge',       driver:'Morgan Stanley +10% scenario; mainland buyer flood; US rate cuts aggressive' },
      { yr:'2027', price:'HK$7.31M', yoy:'+8.0%',  cls:'up', phase:'Acceleration',driver:'GBA wealth integration; capital flight from mainland into HK property' },
      { yr:'2028', price:'HK$7.82M', yoy:'+7.0%',  cls:'up', phase:'Acceleration',driver:'USD weakens; HK attractiveness to global capital rises' },
      { yr:'2029', price:'HK$8.29M', yoy:'+6.0%',  cls:'up', phase:'New high',    driver:'Approaches or matches 2018 all-time high' },
      { yr:'2030', price:'HK$8.70M', yoy:'+5.0%',  cls:'up', phase:'New plateau', driver:'New cycle plateau; HK Island Class A exceeds 2018 peak' },
    ],
    verdict: `<strong>Requires a confluence: aggressive US rate cuts + strong mainland capital inflows + geopolitical stability.</strong> In this scenario, the Fed cuts to 3.0% or below by 2027, HKMA follows via peg mechanics, and mainland buyers escalate from 22% to 35–40% of HK transactions as Beijing signals support for cross-border property ownership. The GBA initiative channels Shenzhen tech wealth into HK as a "global city" premium. Morgan Stanley's base case for 2026 (+10%) becomes the floor, not the ceiling. <strong>HK$8.5–9.0M by 2030 — near or at the 2018 all-time high — is achievable if global capital re-rates HK as a safe-haven post-US-China thaw.</strong> Probability: ~20%.`,
  },
  bear: {
    label: 'Bear Case',
    price: [6150000, 5840000, 5550000, 5550000, 5660000, 5830000],
    hki:   [7990000, 7590000, 7210000, 7210000, 7350000, 7580000],
    color: '#e85c4a',
    cls: 'v-bear',
    metrics: [
      { label: '2025 starting point',  val: 'HK$6.15M',  cls: '',   sub: '500 sqft Class B composite' },
      { label: '2030 target',          val: 'HK$5.83M',  cls: 'dn', sub: '−5.2% from 2025' },
      { label: 'Avg annual growth',    val: '~−1.1%',    cls: 'dn', sub: 'Lost half-decade' },
      { label: 'All-time high (2018)', val: '−35%',      cls: 'dn', sub: 'No recovery in view' },
    ],
    rows: [
      { yr:'2026', price:'HK$5.84M', yoy:'−5.0%', cls:'dn', phase:'Relapse',      driver:'US-China trade war escalation; capital controls fears; emigration accelerates' },
      { yr:'2027', price:'HK$5.55M', yoy:'−5.0%', cls:'dn', phase:'Trough',       driver:'Tenant-buyer standoff; HK economic contraction; negative equity rising' },
      { yr:'2028', price:'HK$5.55M', yoy:'0.0%',  cls:'',   phase:'Stabilising',  driver:'Policy support measures; bottom-fishing; transaction freeze thaws' },
      { yr:'2029', price:'HK$5.66M', yoy:'+2.0%', cls:'up', phase:'Recovery',     driver:'Tentative recovery; structural demand from local households' },
      { yr:'2030', price:'HK$5.83M', yoy:'+3.0%', cls:'up', phase:'Recovery',     driver:'Still below 2025 levels in real terms' },
    ],
    verdict: `<strong>Requires a renewed geopolitical shock or emigration acceleration.</strong> In this scenario, US–China tensions escalate in the Taiwan Strait or over trade, capital flight reverses direction, and the ~500,000 who emigrated since 2019 are joined by a second wave. Mainland buyers retreat on Beijing capital-control signals. HK's economy contracts as financial sector jobs follow firms to Singapore. The already-elevated mortgage servicing burden at current rates catches a wider swath of owners, triggering distressed listings. <strong>A fall to HK$5.5M (−37% from 2018 peak) would put Hong Kong property back at 2012 levels in nominal terms — a decade of zero appreciation wiped out.</strong> Probability: ~25%.`,
  },
};

// ── DISTRICT COMPARISON ───────────────────────────────
// HKD total for standard 500 sqft Class B — by district at key years
// HK Island typically carries a 25–35% premium; NT a 25–30% discount

export const COMPARE_ROWS = [
  { yr:'1997', hki:6200000, kln:4800000, nt:3500000, era:'Handover peak' },
  { yr:'2003', hki:2150000, kln:1700000, nt:1200000, era:'SARS trough' },
  { yr:'2008', hki:4200000, kln:3300000, nt:2400000, era:'Pre-GFC high' },
  { yr:'2010', hki:7000000, kln:5500000, nt:4000000, era:'ZIRP surge' },
  { yr:'2013', hki:7500000, kln:5900000, nt:4300000, era:'Cooling stamp duty era' },
  { yr:'2017', hki:9800000, kln:7600000, nt:5500000, era:'Pre-peak run-up' },
  { yr:'2018', hki:11700000,kln:9100000, nt:6600000, era:'All-time high' },
  { yr:'2019', hki:10800000,kln:8400000, nt:6100000, era:'Social unrest' },
  { yr:'2021', hki:10900000,kln:8500000, nt:6200000, era:'Local recovery peak' },
  { yr:'2022', hki:9300000, kln:7200000, nt:5300000, era:'Rate shock' },
  { yr:'2023', hki:8600000, kln:6700000, nt:4900000, era:'Correction deepens' },
  { yr:'2024', hki:8050000, kln:6250000, nt:4600000, era:'Post-cooling removal' },
  { yr:'2025', hki:7990000, kln:6200000, nt:4550000, era:'Stabilising' },
];

// ── MARKET HISTORY ─────────────────────────────────────
export const EVENTS = [
  {
    yr: '1994–1997',
    color: '#d4a843', bg: 'rgba(212,168,67,0.1)', badge: 'Pre-handover boom',
    text: '<strong>The last pre-handover bubble.</strong> Speculative buying ahead of the 1997 handover and near-zero real rates drove Class B prices from ~HK$6,800/sqft (1994) to ~HK$9,500/sqft by summer 1997. Land supply was tightly controlled. The CCL index reached 100 (base). Price-to-income hit 16.87×, the highest on record at the time — a level not seen again until 2018.'
  },
  {
    yr: '1997–2003',
    color: '#e85c4a', bg: 'rgba(232,92,74,0.08)', badge: 'Crash −65%',
    text: '<strong>Asian Financial Crisis → SARS: a generational wipe-out.</strong> The July 1997 handover coincided with the Thai baht collapse. Capital fled. Hong Kong GDP fell 6% in 1998. Prices dropped 45% by 1999. A partial recovery was crushed by the 2003 SARS epidemic. By Q3 2003, CCL reached 32 — a full 65% below the 1997 peak. Negative equity affected 100,000+ households. The trough was HK$3,300/sqft for Class B (2003 annual average).'
  },
  {
    yr: '2003–2009',
    color: '#70c542', bg: 'rgba(112,197,66,0.08)', badge: 'Recovery',
    text: `<strong>SARS to GFC: slow re-rating.</strong> With the handover crisis fully digested and SARS contained, prices doubled from 2003 to 2008 on the back of mainland economic growth and near-zero HK real rates (HKMA follows the Fed). The GFC caused a brief ~14% dip in 2008, but aggressive US/HKMA easing and China's RMB4 trillion stimulus package reignited HK property demand — prices surged 30% in 2009 alone, setting up the next bull market.`
  },
  {
    yr: '2010–2013',
    color: '#d4a843', bg: 'rgba(212,168,67,0.08)', badge: 'Cooling duties',
    text: '<strong>Stamp duty salvo — three rounds, limited effect.</strong> The government introduced: Special Stamp Duty (SSD, Nov 2010) targeting flippers; Buyer\'s Stamp Duty (BSD, Oct 2012) adding 15% for non-permanent residents; Double Stamp Duty (DSD, Feb 2013) on 2nd+ purchases. Transactions fell sharply, but prices kept rising — constrained supply and entrenched low rates meant demand absorbed the friction. By 2013, Class B composites were ~HK$11,600/sqft, more than triple the 2003 trough.'
  },
  {
    yr: '2015–2018',
    color: '#4a9eff', bg: 'rgba(74,158,255,0.08)', badge: 'New ATH',
    text: '<strong>A brief 2015–16 wobble, then the all-time high.</strong> US rate hike fears caused a ~10% correction in late 2015. But by mid-2016 the market recovered and accelerated. Mainland capital seeking a stable USD-pegged hard asset flooded in. The CCL hit 188.6 in September 2018 — the all-time high. HK Island luxury broke HK$50,000/sqft. Class B composites reached ~HK$18,000/sqft (HK$9M for 500 sqft). Demographia crowned HK #1 least affordable city globally for the 8th consecutive year.'
  },
  {
    yr: '2019',
    color: '#e85c4a', bg: 'rgba(232,92,74,0.08)', badge: 'Social unrest −8%',
    text: '<strong>Six months of protests: the first real crack.</strong> Beginning in June 2019, mass protests against the extradition bill paralysed commerce and triggered capital hesitation. Transaction volumes fell 40% YoY by Q3. Prices declined ~8% from the 2018 peak. Crucially, the dip revealed the market\'s dual vulnerability: geopolitical risk and the beginning of a mainland buyer pullback. The temporary suspension of protests during COVID briefly stabilised prices in late 2019.'
  },
  {
    yr: '2020',
    color: '#e85c4a', bg: 'rgba(232,92,74,0.08)', badge: 'NSL + COVID',
    text: '<strong>National Security Law passes; emigration begins.</strong> June 2020: Beijing enacted the NSL, triggering the first wave of large-scale emigration — primarily to the UK (BN(O) scheme), Canada, and Australia. Over 500,000 residents have since left, per HK government data. COVID restricted mainland visitors. Prices dipped to ~HK$16,200/sqft (−10% from 2018 ATH). The outflow of middle-class homeowners created new supply. Yet prices held — the remaining demand and low supply base proved resilient.'
  },
  {
    yr: '2022–2024',
    color: '#e85c4a', bg: 'rgba(232,92,74,0.08)', badge: 'Rate shock −25%',
    text: '<strong>Fed hikes 525 bps; HK follows via USD peg — the steepest correction since SARS.</strong> The HKMA is mechanically bound to US rates. As the Fed hiked from 0.25% to 5.5%, HK prime rates rose to 5.875% — the highest since 2007. Mortgage servicing costs doubled for new buyers. Prices fell 15% in 2022, 7% in 2023, and 7.1% in 2024 — a cumulative ~26% correction from the 2021 local peak. Negative equity re-emerged for post-2021 buyers. Unsold primary inventory reached a 20-year high by mid-2024.'
  },
  {
    yr: '2024–2025',
    color: '#4a9eff', bg: 'rgba(74,158,255,0.08)', badge: 'All measures removed',
    text: '<strong>Government removes all cooling measures; tentative stabilisation.</strong> In February 2024, the government abolished all remaining stamp duty surcharges (BSD, SSD, DSD) that had been in place since 2010–2013. Mainland buyers re-entered aggressively — accounting for ~22–24% of transactions and ~30% of market value by late 2025. Transaction volume surged 20.3% YoY in the first 10 months of 2025. Prices bottomed in August 2025 and showed the first YoY gain (+1.13%) in October 2025. CCL stabilised near 127.'
  },
];

// ── STRUCTURAL DRIVERS & HEADWINDS ────────────────────
export const DRIVERS = [
  {
    type: 'tail', badge: '↑ tailwind', title: 'Mainland buyer return',
    body: 'Following the removal of the Buyer\'s Stamp Duty in Feb 2024, non-permanent residents can now buy without the previous 15% surcharge. Mainland buyers accounted for ~30% of total 2025 transaction value — their highest share since the BSD was introduced in 2012. Capital-account semi-liberalisation under GBA policies is expanding this channel.'
  },
  {
    type: 'head', badge: '↓ headwind', title: 'Mass emigration hollowing demand',
    body: 'Over 500,000 residents have left Hong Kong since 2019 (primarily to UK, Canada, Australia). The typical emigrant is a homeowner-age professional — the core Class B buyer. Population fell in 4 of the 5 years to 2024. While mainland arrivals partially offset this, the replacement is slower and skewed toward renters, not buyers.'
  },
  {
    type: 'tail', badge: '↑ tailwind', title: 'Rate cuts (Fed → HKMA via peg)',
    body: 'Hong Kong\'s USD peg means the HKMA mechanically mirrors the Fed. With the Fed having cut 100+ bps from its 2024 peak and markets pricing further cuts, HK prime rates are falling from their 5.875% high. Each 25 bps cut expands the qualifying mortgage pool. The rate pain that drove 2022–24 corrections is structurally reversing.'
  },
  {
    type: 'head', badge: '↓ headwind', title: 'US–China geopolitical risk',
    body: 'Hong Kong sits at the intersection of US–China tension. The National Security Law (2020), US delisting of HK as a separate customs territory, and recurring Taiwan Strait friction create a risk premium embedded in HK asset prices. Any escalation — trade war expansion, sanctions on HK financial institutions — could trigger a rapid re-rating downward.'
  },
  {
    type: 'tail', badge: '↑ tailwind', title: 'Structural supply constraint',
    body: 'Hong Kong is geographically capped. Over 70% of land area is protected country park or green belt. The 2026–35 housing plan targets only 126,000 new private units over 10 years (~12,600/yr) — insufficient to absorb normalised demand. Developers are sitting on unsold stock but new starts remain subdued. Supply tightening is baked in.'
  },
  {
    type: 'head', badge: '↓ headwind', title: 'Affordability ceiling',
    body: 'Despite the 26% correction from the 2021 peak, Hong Kong remains the world\'s least affordable housing market (Demographia 2025). At current prices, a median household needs 16+ years of gross income to purchase a Class B unit. Income growth has not kept pace with even the corrected price level — organically pricing out local first-home buyers without financial family support.'
  },
  {
    type: 'tail', badge: '↑ tailwind', title: 'GBA wealth integration',
    body: 'The Greater Bay Area initiative is deepening financial integration between HK, Shenzhen, Guangzhou, and 6 other cities. Cross-boundary mortgage pilots allow mainland buyers to finance HK property. Wealth management schemes (Wealth Management Connect) channel mainland savings into HK assets. HK\'s role as the GBA\'s international financial hub underpins long-run institutional demand.'
  },
  {
    type: 'neutral', badge: '↔ watch', title: 'Unsold primary inventory',
    body: 'Developers are holding ~20,000 unsold completed units — near a 20-year high as of mid-2024. While some has been absorbed in late 2025, developers are willing to discount to clear stock. This creates a ceiling on secondary market price appreciation until primary supply is digested. Watch the absorption rate quarterly.'
  },
  {
    type: 'head', badge: '↓ headwind', title: 'Negative equity and renewal risk',
    body: '2021–22 buyers are underwater at current prices. HKMA data shows negative equity cases rose to ~30,000 by end-2024 from near-zero in 2021. As 2–3yr fixed mortgages roll over in 2025–26 at current higher rates, some forced sales are expected. This is a milder version of the Canadian renewal wave dynamic — manageable but not zero.'
  },
  {
    type: 'tail', badge: '↑ tailwind', title: 'Long-run safe-haven demand',
    body: 'Despite geopolitical headwinds, Hong Kong\'s USD peg, common law legal system, low taxation, and deep capital markets make it the preferred hard-asset store for Southeast Asian and mainland wealth. Even in the bear scenario, the structural "global city" premium has never sustainably broken. HK property has outperformed global equities over any 20-year rolling period since 1980.'
  },
];

// ── CITY METADATA ─────────────────────────────────────
export const CITY_META = {
  name: 'Hong Kong',
  region: 'SAR, China',
  currency: 'HKD',
  currencyUSD: 7.80,        // HKD per USD (peg rate)
  priceLabel: 'Class B apartment (500 sqft)',
  currentPrice: 6150000,    // 2025 composite HKD
  peakPrice: 9000000,       // 2018 all-time high HKD
  peakYear: 2018,
  troughPrice: 1650000,     // 2003 SARS trough HKD
  troughYear: 2003,
  peakPricePerSqft: 18000,  // HKD/sqft at 2018 peak
  currentPricePerSqft: 12300, // HKD/sqft (Oct 2025 RVD Class B)
  demographiaRank: 1,       // Demographia least-affordable rank (perennial #1)
  noteOnDataSources: 'RVD Private Domestic Price Index, Centaline CCL (base July 1997=100), Demographia International Housing Affordability Survey, Cushman & Wakefield HK 2026 Outlook, CBRE HK 2026 Outlook, GlobalPropertyGuide, SCMP.',
};

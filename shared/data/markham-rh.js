// Markham & Richmond Hill — shared data module
// Source: TRREB historic, listing.ca (2018–2025 MLS data), WOWA, meetmatthew.ca

export const HIST_YEARS = [1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,
                    2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,
                    2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025];

// Markham detached — verified from TRREB historic + listing.ca (2018–2025 MLS data)
// Pre-2005 estimated from York Region aggregate index
export const MARKHAM_HIST = [
  210000,220000,230000,235000,250000,270000,285000,310000,335000,360000,
  385000,415000,445000,455000,420000,490000,545000,590000,645000,700000,
  775000,900000,1010000,940000,980000,1190000,1520000,1660000,1590000,1530000,1400000
];

// Richmond Hill detached — consistently 10–18% above Markham; WOWA, listing.ca, meetmatthew.ca
export const RH_HIST = [
  235000,248000,260000,265000,282000,305000,325000,355000,385000,415000,
  430000,465000,505000,515000,480000,560000,625000,680000,745000,815000,
  895000,1040000,1170000,1085000,1130000,1340000,1720000,1920000,1780000,1680000,1570000
];

export const FCAST_YEARS = [2025,2026,2027,2028,2029,2030];

export const SCENARIOS = {
  base: {
    label: 'Base Case',
    mk:   [1400000,1360000,1410000,1490000,1570000,1640000],
    rh:   [1570000,1520000,1580000,1660000,1750000,1840000],
    color: '#4a9eff',
    cls: 'v-base',
    metrics: [
      { label:'2025 starting point', val:'$1.40M', cls:'', sub:'Markham detached avg' },
      { label:'2030 target', val:'$1.64M', cls:'up', sub:'+17% from 2025' },
      { label:'Avg annual growth', val:'~3.2%', cls:'', sub:'Moderate recovery' },
      { label:'2022 peak recovery', val:'Never', cls:'', sub:'Peak was ~$1.81M' },
    ],
    rows: [
      { yr:'2026', price:'$1.36M', mk_rh:'$1.52M', chg:'-2.9%', cls:'dn', era:'Trough', note:'Tariff headwinds, 5+ month inventory, BoC holds' },
      { yr:'2027', price:'$1.41M', mk_rh:'$1.58M', chg:'+3.7%', cls:'up', era:'Inflection', note:'Supply crunch begins, pent-up demand activates' },
      { yr:'2028', price:'$1.49M', mk_rh:'$1.66M', chg:'+5.7%', cls:'up', era:'Recovery', note:'Immigration stabilizes, construction trough bites' },
      { yr:'2029', price:'$1.57M', mk_rh:'$1.75M', chg:'+5.4%', cls:'up', era:'Recovery', note:'Family-home undersupply drives competition' },
      { yr:'2030', price:'$1.64M', mk_rh:'$1.84M', chg:'+4.5%', cls:'up', era:'Normalization', note:'Cycle matures, single-digit appreciation' },
    ],
    verdict: '<strong>Trough in 2026, slow grind higher.</strong> Markham detached is near its cyclical floor but not there yet — tariff headwinds, still-elevated inventory, and a fragile Ontario labour market keep 2026 soft. The real inflection comes in 2027–28 when two forces collide: new construction starts are at 1991 lows and immigration will likely resume. Markham\'s mid-market position ($1.3–1.5M) is accessible to dual-income professional households that survive the stress test. <strong>Expect $1.55–1.65M by 2030 — meaningful gain but still ~10% below the 2022 peak in nominal terms.</strong> Probability: ~60%.',
  },
  bull: {
    label: 'Bull Case',
    mk:   [1400000,1430000,1550000,1700000,1830000,1940000],
    rh:   [1570000,1610000,1750000,1920000,2060000,2180000],
    color: '#70c542',
    cls: 'v-bull',
    metrics: [
      { label:'2025 starting point', val:'$1.40M', cls:'', sub:'Markham detached avg' },
      { label:'2030 target', val:'$1.94M', cls:'up', sub:'+38.5% from 2025' },
      { label:'Avg annual growth', val:'~6.5%', cls:'up', sub:'Strong recovery cycle' },
      { label:'2022 peak recovery', val:'2029', cls:'up', sub:'Exceeds $1.81M peak' },
    ],
    rows: [
      { yr:'2026', price:'$1.43M', mk_rh:'$1.61M', chg:'+2.1%', cls:'up', era:'No trough', note:'Trade war resolves, BoC cuts further to ~2.0%' },
      { yr:'2027', price:'$1.55M', mk_rh:'$1.75M', chg:'+8.4%', cls:'up', era:'Acceleration', note:'Supply trough triggers bidding wars' },
      { yr:'2028', price:'$1.70M', mk_rh:'$1.92M', chg:'+9.7%', cls:'up', era:'Acceleration', note:'Immigration surge, acute detached undersupply' },
      { yr:'2029', price:'$1.83M', mk_rh:'$2.06M', chg:'+7.6%', cls:'up', era:'New peak', note:'Near or at new all-time high' },
      { yr:'2030', price:'$1.94M', mk_rh:'$2.18M', chg:'+6.0%', cls:'up', era:'New plateau', note:'New cycle plateau established' },
    ],
    verdict: '<strong>Requires a confluence of favourable forces.</strong> US–Canada trade war resolves quickly, BoC cuts to 2.0% or below, and Ottawa restores immigration above 400K PRs/yr by 2027. New detached construction starts — already at 1991 lows — fail to recover, creating acute family-home shortage by 2028. Markham re-runs a compressed version of the 2019–22 cycle. Richmond Hill would exceed $2.0M by 2029. <strong>$1.94M+ for Markham by 2030 is plausible if fixed 5-yr rates normalize to ~3.5% and immigration drives 100K+ household formations in York Region annually.</strong> Probability: ~20%.',
  },
  bear: {
    label: 'Bear Case',
    mk:   [1400000,1260000,1200000,1240000,1300000,1370000],
    rh:   [1570000,1400000,1340000,1385000,1460000,1540000],
    color: '#e85c4a',
    cls: 'v-bear',
    metrics: [
      { label:'2025 starting point', val:'$1.40M', cls:'', sub:'Markham detached avg' },
      { label:'2030 target', val:'$1.37M', cls:'dn', sub:'-2% from 2025' },
      { label:'Avg annual growth', val:'~−0.4%', cls:'dn', sub:'Flat or negative real terms' },
      { label:'2022 peak recovery', val:'Post-2030', cls:'dn', sub:'Lost decade scenario' },
    ],
    rows: [
      { yr:'2026', price:'$1.26M', mk_rh:'$1.40M', chg:'-10.0%', cls:'dn', era:'Recession', note:'Trade escalation, unemployment spikes above 8%' },
      { yr:'2027', price:'$1.20M', mk_rh:'$1.34M', chg:'-4.8%', cls:'dn', era:'Trough', note:'Mortgage renewal shock, forced selling wave' },
      { yr:'2028', price:'$1.24M', mk_rh:'$1.39M', chg:'+3.3%', cls:'up', era:'Stabilization', note:'Tentative floor, bargain hunters re-enter' },
      { yr:'2029', price:'$1.30M', mk_rh:'$1.46M', chg:'+4.8%', cls:'up', era:'Recovery', note:'Slow climb from cycle trough' },
      { yr:'2030', price:'$1.37M', mk_rh:'$1.54M', chg:'+5.4%', cls:'up', era:'Recovery', note:'Still below 2025 nominal levels' },
    ],
    verdict: '<strong>Requires meaningful economic deterioration.</strong> A US–Canada trade war escalation triggers a Canadian recession; unemployment spikes above 8%; the 2026 mortgage renewal wave forces distressed selling. Ontario\'s manufacturing corridor — directly exposed to US tariffs on autos, steel, and aluminum — is the epicentre. CMHC flagged this scenario explicitly in Feb 2026, noting Canada could "slip into a mild recession." A $1.2M floor for Markham detached (early 2027) would represent a ~34% correction from the Feb 2022 peak. <strong>Recovery to 2025 nominal levels would take until well past 2030.</strong> Probability: ~20%.',
  }
};

export const COMPARE_ROWS = [
  { yr:'1995', mk:210000, rh:235000, era:'Pre-boom baseline' },
  { yr:'2000', mk:270000, rh:305000, era:'Post-dot-com stability' },
  { yr:'2005', mk:385000, rh:430000, era:'Low-rate lift-off' },
  { yr:'2008', mk:455000, rh:515000, era:'Pre-crisis peak' },
  { yr:'2010', mk:490000, rh:560000, era:'Post-GFC recovery' },
  { yr:'2014', mk:700000, rh:815000, era:'Steady grind higher' },
  { yr:'2016', mk:900000, rh:1040000, era:'Pre-frenzy surge' },
  { yr:'2017', mk:1010000, rh:1170000, era:'Fair Housing Plan year' },
  { yr:'2019', mk:980000, rh:1130000, era:'Stress test plateau' },
  { yr:'2020', mk:1190000, rh:1340000, era:'Pandemic starts' },
  { yr:'2021', mk:1520000, rh:1720000, era:'Pandemic peak year' },
  { yr:'2022', mk:1660000, rh:1920000, era:'Peak then rate hike' },
  { yr:'2023', mk:1590000, rh:1780000, era:'Correction continues' },
  { yr:'2024', mk:1530000, rh:1680000, era:'Rate cuts, no rebound' },
  { yr:'2025', mk:1400000, rh:1570000, era:'Current floor' },
];

export const EVENTS = [
  { yr:'1995–2004', color:'#d4a843', bg:'rgba(212,168,67,0.1)', badge:'Slow burn', text:'<strong>Steady suburban growth.</strong> Markham rises from $210K to $360K (+71% over 9 years). Richmond Hill tracks 10–12% above. Immigration-driven demand, low interest rates, and York Region\'s tech corridor development (IBM, AMD, Huawei campuses in Markham) establish the structural demand foundation.' },
  { yr:'2005–2007', color:'#4a9eff', bg:'rgba(74,158,255,0.08)', badge:'Lift-off', text:'<strong>Accelerating appreciation.</strong> Markham crosses $400K for the first time. The York Region Rapid Transit plan (Viva BRT, later Toronto-York Spadina subway extension) is approved, boosting commuter confidence. CMHC begins flagging GTA prices as "elevated."' },
  { yr:'2008–2009', color:'#e85c4a', bg:'rgba(232,92,74,0.08)', badge:'GFC dip', text:'<strong>Global Financial Crisis: brief correction.</strong> Markham falls ~8% to $420K, RH to $480K. Canada\'s well-regulated mortgage market prevents US-style collapse. Both cities fully recover within 18 months — the shortest correction in York Region history.' },
  { yr:'2010–2015', color:'#70c542', bg:'rgba(112,197,66,0.08)', badge:'Low-rate grind', text:'<strong>Sustained low-rate appreciation.</strong> BoC holds near-zero. Markham climbs from $490K to $775K (+58%); RH from $560K to $895K (+60%). Stress test for insured mortgages introduced Oct 2016. Richmond Hill\'s Bayview Hill and Westbrook school zones cement its luxury premium.' },
  { yr:'Apr 2017', color:'#e85c4a', bg:'rgba(232,92,74,0.08)', badge:'Fair Housing Plan', text:'<strong>Ontario\'s Fair Housing Plan:</strong> 15% Non-Resident Speculation Tax introduced. Market psychology shifts overnight. Markham peaks at ~$1.01M average, then retreats to $940K by year-end. Annual sales fall 18% YoY. Richmond Hill — the higher-priced market — corrects more sharply in % terms.' },
  { yr:'Jan 2018', color:'#d4a843', bg:'rgba(212,168,67,0.08)', badge:'Stress test B-20', text:'<strong>OSFI stress test for uninsured mortgages.</strong> Buyers must qualify at contract rate +2%. Removes ~20% of buying power. Markham detached falls further to $940K; RH to $1.085M. Stress test disproportionately hits the $1M+ buyer — pushing them into mid-market Markham from RH, and into condos from Markham.' },
  { yr:'2020–2022', color:'#e85c4a', bg:'rgba(232,92,74,0.08)', badge:'Pandemic explosion', text:'<strong>Remote work + 0.25% BoC rate = historic surge.</strong> Markham explodes to $1.66M average (2022); RH to $1.92M. Ontario housing rises 64% over 2 years. Richmond Hill\'s larger lots and established communities command outsized pandemic premiums — the RH-Markham spread widens to $260K, the largest in 20 years. Toronto scores #1 in UBS Global Real Estate Bubble Index.' },
  { yr:'Mar 2022', color:'#e85c4a', bg:'rgba(232,92,74,0.08)', badge:'Rate shock', text:'<strong>Bank of Canada hikes 10 times</strong>, overnight rate 0.25% → 5.0%. Markham benchmark falls 16% in 5 months. RH falls harder (−15% YoY by Feb 2026 per TRREB). Condo market collapses. 77% of GTA condo investors with 2023 closings lose money. The correction that "wasn\'t supposed to happen" arrives.' },
  { yr:'2024–2026', color:'#4a9eff', bg:'rgba(74,158,255,0.08)', badge:'Current state', text:'<strong>Rate cuts ≠ recovery.</strong> BoC cuts 200 bps through 2024–25. Fixed 5-yr now 4.1–4.4%. But affordability gap persists — incomes haven\'t kept pace. Markham avg down 9.7% YoY per WOWA (early 2026). US tariff uncertainty and Ontario labour market fragility suppress buyer confidence. 5+ months of detached inventory. True floor likely mid-2026.' },
];

export const DRIVERS = [
  { type:'head', badge:'↓ headwind', title:'Trade war & tariffs', body:'US tariffs on Canadian steel, aluminum, and autos directly threaten Ontario manufacturing jobs. CMHC flags recession risk if trade tensions persist through 2026. Each manufacturing job lost in the 905 is a would-be detached buyer who sits out.' },
  { type:'tail', badge:'↑ tailwind', title:'Construction supply collapse', body:'New detached starts in the GTA are at 1991 lows — down 88% from peak. Completions will taper sharply after 2026. By 2028, structural undersupply of family-sized freehold homes should tighten the market and ignite price recovery.' },
  { type:'head', badge:'↓ headwind', title:'Immigration policy reversal', body:'Canada\'s population declined in 2025 for the first time since Confederation. International student arrivals cut 49%; TFWs cut 37%. The near-term demand anchor for detached is weakened through at least 2027, particularly for investors.' },
  { type:'tail', badge:'↑ tailwind', title:'Markham\'s mid-market anchor', body:'At $1.3–1.5M, Markham detached remains the entry point for dual-income professionals priced out of Richmond Hill. Affordability compression from above reliably channels buyers into Markham — a structural demand floor.' },
  { type:'head', badge:'↓ headwind', title:'Mortgage renewal wave', body:'~⅓ of all Canadian mortgages renew by end of 2026. Fixed 5-yr holders who bought at pandemic lows face payment increases of $500–1,500/month, pressuring some owners to list, adding inventory at exactly the wrong time.' },
  { type:'tail', badge:'↑ tailwind', title:'Rate environment stabilized', body:'BoC has cut 200 bps since mid-2024. Fixed 5-yr rates at 4.1–4.4%. Expected to hold at ~2.75% overnight through 2026. Each BoC cut expands the qualifying pool — 25 bps adds ~$25K in qualifying power. The pain of rate hikes is behind us.' },
  { type:'tail', badge:'↑ tailwind', title:'Markham employment resilience', body:'1,200+ tech firms and major campuses (Huawei, IBM, AMD, York University) make Markham relatively insulated from auto sector tariff exposure versus Hamilton or Windsor. Knowledge workers are more rate-sensitive than job-loss-sensitive.' },
  { type:'neutral', badge:'↔ watch', title:'Richmond Hill vs Markham premium', body:'The RH premium over Markham (historically 11–17%) compressed to near parity at the 2022 peak, then re-widened to ~$170K (12%). In a prolonged correction, premium markets correct hardest. RH\'s SNLR (29%) and 6.5 months of inventory signal deeper buyer power than Markham (~5 months).' },
  { type:'head', badge:'↓ headwind', title:'Pent-up supply, not just demand', body:'Sellers who waited out 2023–24 are now competing with motivated sellers. Price discovery is ongoing. New subdivisions (Union Glen, Cornell Rouge) will add detached inventory through 2026–27, limiting price upside.' },
  { type:'tail', badge:'↑ tailwind', title:'Long-run structural demand', body:'Toronto adds 100K+ residents annually (even at reduced immigration). Markham\'s concentration of Asian-Canadian families creates multi-generational demand for large detached homes. Cultural preference for homeownership remains a structural demand anchor unlike any other North American suburb.' },
];

export const CITY_META = {
  name: 'Markham & Richmond Hill',
  region: 'York Region, Ontario, Canada',
  currency: 'CAD',
  priceLabel: 'Detached avg',
  currentPrice: 1400000,
  peakPrice: 1660000,
  peakYear: 2022,
  troughPrice: 420000,
  troughYear: 2009,
  noteOnDataSources: 'TRREB historic, listing.ca MLS data (2018–2025), WOWA, meetmatthew.ca, CMHC',
};

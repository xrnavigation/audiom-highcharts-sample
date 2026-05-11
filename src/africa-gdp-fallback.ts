/**
 * Static GDP per capita (USD, approx 2023) for African nations.
 * Keys are Highcharts `hc-key` values (ISO 3166-1 alpha-2, lowercase).
 * Source: World Bank / IMF — illustrative figures.
 *
 * Used as a fallback when the World Bank REST API is unavailable.
 */
export const AFRICA_GDP_FALLBACK: Array<[string, number]> = [
  // North Africa
  ['eg', 3770],   // Egypt
  ['ly', 6018],   // Libya
  ['tn', 3895],   // Tunisia
  ['dz', 4274],   // Algeria
  ['ma', 3672],   // Morocco
  ['sd', 770],    // Sudan
  ['mr', 2100],   // Mauritania
  // West Africa
  ['ng', 2184],   // Nigeria
  ['gh', 2238],   // Ghana
  ['ci', 2486],   // Côte d'Ivoire
  ['sn', 1637],   // Senegal
  ['ml', 890],    // Mali
  ['bf', 870],    // Burkina Faso
  ['ne', 590],    // Niger
  ['gn', 1010],   // Guinea
  ['sl', 490],    // Sierra Leone
  ['lr', 710],    // Liberia
  ['gm', 820],    // Gambia
  ['gw', 810],    // Guinea-Bissau
  ['cv', 3800],   // Cabo Verde
  ['bj', 1350],   // Benin
  ['tg', 1020],   // Togo
  // Central Africa
  ['cm', 1660],   // Cameroon
  ['ga', 8920],   // Gabon
  ['gq', 7680],   // Equatorial Guinea
  ['cg', 2290],   // Republic of Congo
  ['cd', 640],    // DR Congo
  ['cf', 500],    // Central African Republic
  ['td', 710],    // Chad
  ['st', 2340],   // São Tomé and Príncipe
  // East Africa
  ['et', 1028],   // Ethiopia
  ['ke', 2099],   // Kenya
  ['tz', 1192],   // Tanzania
  ['ug', 964],    // Uganda
  ['rw', 966],    // Rwanda
  ['bi', 240],    // Burundi
  ['ss', 410],    // South Sudan
  ['so', 470],    // Somalia
  ['dj', 3450],   // Djibouti
  ['er', 590],    // Eritrea
  // Southern Africa
  ['za', 6253],   // South Africa
  ['bw', 7738],   // Botswana
  ['na', 4865],   // Namibia
  ['zw', 1737],   // Zimbabwe
  ['zm', 1487],   // Zambia
  ['mw', 570],    // Malawi
  ['mz', 633],    // Mozambique
  ['ao', 2138],   // Angola
  ['ls', 1010],   // Lesotho
  ['sz', 4200],   // Eswatini
  // Indian Ocean islands
  ['mg', 540],    // Madagascar
  ['mu', 11409],  // Mauritius
  ['sc', 17500],  // Seychelles
  ['km', 1540],   // Comoros
];

/** Set of hc-keys for all African nations we track. */
export const AFRICA_HC_KEYS = new Set(AFRICA_GDP_FALLBACK.map(([k]) => k));

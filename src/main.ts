import Highcharts from 'highcharts/highmaps';
import AudiomPlugin, { AudiomDisplayMode, SourceBackend } from '@xrnavigation/audiom-highcharts';
import { StepSize } from '@xrnavigation/audiom-embedder';

// One-time plugin bootstrap. `devServer()` pairs with `audiomHighchartsDev()`
// in vite.config.ts so the Audiom iframe can fetch our GeoJSON cross-origin.
AudiomPlugin.init(Highcharts, {
  apiKey: import.meta.env.VITE_AUDIOM_API_KEY,
  backend: SourceBackend.devServer(),
  displayMode: AudiomDisplayMode.SideBySide,
});

// GDP per capita (USD, approx 2023). hc-key matches Highcharts' Africa map.
const data: Array<[string, number]> = [
  ['ng', 2184],   // Nigeria
  ['za', 6253],   // South Africa
  ['eg', 3770],   // Egypt
  ['ke', 2099],   // Kenya
  ['et', 1028],   // Ethiopia
  ['ma', 3672],   // Morocco
  ['dz', 4274],   // Algeria
  ['gh', 2238],   // Ghana
  ['tn', 3895],   // Tunisia
  ['sn', 1637],   // Senegal
  ['ci', 2486],   // Côte d'Ivoire
  ['cm', 1660],   // Cameroon
  ['ug', 964],    // Uganda
  ['tz', 1192],   // Tanzania
  ['ao', 2138],   // Angola
  ['ly', 6018],   // Libya
  ['mz', 633],    // Mozambique
  ['zm', 1487],   // Zambia
  ['zw', 1737],   // Zimbabwe
  ['na', 4865],   // Namibia
  ['bw', 7738],   // Botswana
  ['mu', 11409],  // Mauritius
  ['rw', 966]     // Rwanda
];

const topology = await fetch(
  'https://code.highcharts.com/mapdata/custom/africa.topo.json'
).then((r) => r.json());

Highcharts.mapChart('chart', {
  chart: { map: topology },
  title: { text: 'Africa — GDP per capita' },
  subtitle: { text: 'Source: World Bank — illustrative subset' },
  mapNavigation: {
    enabled: true,
    buttonOptions: { verticalAlign: 'bottom' }
  },
  colorAxis: {
    min: 500,
    max: 12000,
    type: 'logarithmic',
    stops: [
      [0, '#EFEFFF'],
      [0.5, '#4444FF'],
      [1, '#000033']
    ]
  },
  series: [
    {
      type: 'map',
      name: 'GDP per capita',
      data,
      joinBy: 'hc-key',
      states: { hover: { color: '#a4edba' } },
      tooltip: { pointFormat: '{point.name}: <b>${point.value:,.0f}</b>' }
    }
  ],
  audiom: {
    // Render the visual heatmap on the Audiom side so the colors assigned
    // by the rules' `fill` expressions are visible in the iframe.
    showVisualMap: true,
    // Absolute URL so the cross-origin Audiom iframe can fetch it.
    rules: new URL('audiom-data/africa-gdp.rules.json', window.location.href).toString(),
    // Center on Botswana [lon, lat] with a tighter zoom.
    center: [24, -22],
    zoom: 2.5,
    stepSize: StepSize.kilometers(400)
  }
});

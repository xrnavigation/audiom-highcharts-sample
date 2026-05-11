import Highcharts from 'highcharts/highmaps';
import AudiomPlugin, { AudiomDisplayMode, SourceBackend } from '@xrnavigation/audiom-highcharts';
import { StepSize } from '@xrnavigation/audiom-embedder';
import { AFRICA_GDP_FALLBACK, AFRICA_HC_KEYS } from './africa-gdp-fallback';
import { fetchWorldBankIndicator } from './world-bank-client';

// One-time plugin bootstrap. `devServer()` pairs with `audiomHighchartsDev()`
// in vite.config.ts so the Audiom iframe can fetch our GeoJSON cross-origin.
AudiomPlugin.init(Highcharts, {
  apiKey: import.meta.env.VITE_AUDIOM_API_KEY,
  backend: SourceBackend.devServer(),
  displayMode: AudiomDisplayMode.SideBySide,
});

// ---------------------------------------------------------------------------
// GDP per capita — World Bank REST API (NY.GDP.PCAP.CD), most recent value.
// Falls back to the static snapshot in africa-gdp-fallback.ts if the fetch
// fails or returns no usable records.
// ---------------------------------------------------------------------------
let africaGdpData: Array<[string, number]>;
try {
  africaGdpData = await fetchWorldBankIndicator({
    indicator: 'NY.GDP.PCAP.CD',
    filterKeys: AFRICA_HC_KEYS,
  });
} catch (err) {
  console.warn('[africa-gdp] Live fetch failed, using fallback data:', err);
  africaGdpData = AFRICA_GDP_FALLBACK;
}

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
    min: 200,
    max: 18000,
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
      data: africaGdpData,
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
    center: [24, 0],
    zoom: 2.2,
    stepSize: StepSize.kilometers(400)
  }
});

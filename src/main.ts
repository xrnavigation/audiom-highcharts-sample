import Highcharts from 'highcharts/highmaps';
import AccessibilityModule from 'highcharts/modules/accessibility';
import AudiomPlugin, { AudiomDisplayMode, SourceBackend } from '@xrnavigation/audiom-highcharts';
import { StepSize } from '@xrnavigation/audiom-embedder';
import { AFRICA_GDP_FALLBACK, AFRICA_HC_KEYS } from './africa-gdp-fallback';
import { fetchWorldBankIndicator } from './world-bank-client';

// Register the Highcharts accessibility module so the chart SVG gets proper
// ARIA roles, keyboard navigation, and a screen-reader data table.
AccessibilityModule(Highcharts);

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
const statusEl = document.getElementById('chart-status');
const setStatus = (msg: string) => { if (statusEl) statusEl.textContent = msg; };

let africaGdpData: Array<[string, number]>;
let usingFallback = false;
try {
  africaGdpData = await fetchWorldBankIndicator({
    indicator: 'NY.GDP.PCAP.CD',
    filterKeys: AFRICA_HC_KEYS,
  });
} catch (err) {
  console.warn('[africa-gdp] Live fetch failed, using fallback data:', err);
  africaGdpData = AFRICA_GDP_FALLBACK;
  usingFallback = true;
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
  accessibility: {
    enabled: true,
    description:
      'Choropleth map of Africa showing GDP per capita in US dollars ' +
      'for the most recent available year. Darker blue indicates higher GDP per capita. ' +
      'Countries with no data are shown in grey.',
    keyboardNavigation: { enabled: true },
    point: {
      valueDescriptionFormat: '{point.name}: ${point.value:,.0f} GDP per capita'
    }
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

// Update the live region once the chart has rendered so screen readers
// announce the loaded state (and note if offline data was used).
const countryCount = africaGdpData.length;
setStatus(
  usingFallback
    ? `Chart loaded using offline data. Showing ${countryCount} African countries.`
    : `Chart loaded. Showing live GDP per capita data for ${countryCount} African countries.`
);

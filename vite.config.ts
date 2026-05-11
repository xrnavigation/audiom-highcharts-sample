import { defineConfig } from 'vite';
import { audiomHighchartsDev } from '@xrnavigation/audiom-highcharts/vite';

// `audiomHighchartsDev()` runs a small middleware that hosts extracted
// GeoJSON for the Audiom embed iframe to fetch cross-origin during
// local development. Pair with `SourceBackend.devServer()` in main.ts.
export default defineConfig({
  plugins: [audiomHighchartsDev()],
  server: {
    port: 5173,
    open: true,
    // The Audiom iframe runs at a different origin and fetches our rules
    // JSON from /audiom-data/*. Vite's static middleware doesn't set CORS
    // headers on its own, so allow cross-origin GETs here.
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': '*'
    }
  }
});

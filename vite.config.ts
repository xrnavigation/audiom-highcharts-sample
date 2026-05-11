import { defineConfig } from 'vite';
import { audiomHighchartsDev } from '@xrnavigation/audiom-highcharts/vite';

// `audiomHighchartsDev()` runs a small middleware that hosts extracted
// GeoJSON for the Audiom embed iframe to fetch cross-origin during
// local development. Pair with `SourceBackend.devServer()` in main.ts.
export default defineConfig({
  plugins: [audiomHighchartsDev()],
  server: { port: 5173, open: true }
});

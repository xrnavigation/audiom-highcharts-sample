# Audiom-Highcharts Sample (Africa GDP)

Minimal standalone sample using
[`@xrnavigation/audiom-highcharts`](https://github.com/xrnavigation/audiom-highcharts)
**v1.0.0** to add Audiom audio-accessibility to a Highcharts map of
**Africa GDP per capita**.

## Setup

The `@xrnavigation/*` packages are published to **GitHub Packages**. The
included `.npmrc` reads a `NPM_TOKEN` env var.

1. Create a GitHub Personal Access Token (classic) with the `read:packages`
   scope: <https://github.com/settings/tokens>.
2. Export it before installing:

   ```powershell
   $env:NPM_TOKEN = "ghp_xxx"
   ```

3. Install and run:

   ```sh
   npm install
   npm run dev
   ```

4. Optional: copy `.env.example` to `.env.local` and set
   `VITE_AUDIOM_API_KEY` to enable the Audiom embed against a real key.

## Files

- [src/main.ts](src/main.ts) — chart + plugin bootstrap (~60 lines).
- [vite.config.ts](vite.config.ts) — registers the bundled
  `audiomHighchartsDev()` middleware so the Audiom iframe can fetch the
  extracted GeoJSON cross-origin.
- [package.json](package.json) — pins `@xrnavigation/audiom-highcharts`,
  `@xrnavigation/audiom-embedder`, and `@xrnavigation/audiom-api-client`
  at `1.0.0`.

---
source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting
---

# Dev / Build

Local development and production build/start commands. The exact scripts depend on the build tool (Vite or Rsbuild) and target host.

## Vite: dev server

```bash
vite dev
```

Runs via `npm run dev` when wired into `package.json` scripts. Default port is configured in `vite.config.ts` (`server.port`).

## Vite: production build

```bash
vite build
```

## Vite: preview a production build locally

```bash
vite preview
```

## Vite: run the built output on plain Node.js

```bash
node .output/server/index.mjs
```

Requires `"start": "node .output/server/index.mjs"` in `package.json` scripts; remove this script if deploying to a platform-specific runtime (e.g. Cloudflare Workers) instead.

## Rsbuild: dev server

```bash
rsbuild dev
```

Referenced in the Build from Scratch guide (`references/getting-started/build-from-scratch.md`, source: `.../build-from-scratch`) as the Rsbuild counterpart to `vite dev`.

## Rsbuild: production build

```bash
rsbuild build
```

Rsbuild builds place client assets in `dist/client` and the server bundle in `dist/server/index.js` (or `dist/server/server.js`), exporting a fetch-style `ServerEntry`. Serve `dist/client` as static assets and forward other requests to the entry's `fetch` handler (e.g. via `srvx` or Express).

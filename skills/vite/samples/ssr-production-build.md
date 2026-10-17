---
source: https://vite.dev/guide/ssr#building-for-production
---

# SSR Production Build

Produce a client build and an SSR build with separate output directories.

```json
{
  "scripts": {
    "dev": "node server",
    "build:client": "vite build --outDir dist/client",
    "build:server": "vite build --outDir dist/server --ssr src/entry-server.js"
  }
}
```

With preload directives, the client build adds `--ssrManifest`:

```diff
- "build:client": "vite build --outDir dist/client",
+ "build:client": "vite build --outDir dist/client --ssrManifest",
```

## Notes

- `--ssr` marks an SSR build and must be given the SSR entry.
- In the production branch of `server.js` (guarded by `process.env.NODE_ENV`): use `dist/client/index.html` as the template, replace `vite.ssrLoadModule('/src/entry-server.js')` with `import('./dist/server/entry-server.js')`, and serve static files from `dist/client` instead of creating the Vite dev server.
- `--ssrManifest` generates `dist/client/.vite/ssr-manifest.json` from the client build, mapping module IDs to chunks and assets.
- Dependencies are externalized from the SSR transform by default; use `ssr.noExternal` / `ssr.external` to change that.

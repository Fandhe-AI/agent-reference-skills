---
source: https://vite.dev/guide/ssr#building-for-production
---

# Building SSR for Production

Produce a client build and an SSR build, then load the SSR output directly with `import()`.

## Signature / Usage

```json
{
  "scripts": {
    "dev": "node server",
    "build:client": "vite build --outDir dist/client",
    "build:server": "vite build --outDir dist/server --ssr src/entry-server.js"
  }
}
```

## Notes

- Steps: (1) produce a client build as normal; (2) produce an SSR build, loadable via `import()` so Vite's `ssrLoadModule` is not needed.
- The `--ssr` flag marks an SSR build and must specify the SSR entry.
- In `server.js`, add production-specific logic by checking `process.env.NODE_ENV`:
  - Use `dist/client/index.html` as the template instead of the root `index.html` (it has correct asset links to the client build).
  - Use `import('./dist/server/entry-server.js')` instead of `await vite.ssrLoadModule('/src/entry-server.js')`.
  - Move creation and all usage of the `vite` dev server behind dev-only branches, and add static file serving middlewares for `dist/client`.
- Refer to the example projects in the SSR Overview for a working setup.

## Related

- [SSR Overview](./ssr-overview.md)
- [Setting Up the SSR Dev Server](./ssr-dev-server.md)
- [Generating Preload Directives](./preload-directives.md)

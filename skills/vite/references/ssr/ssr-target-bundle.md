---
source: https://vite.dev/guide/ssr#ssr-target
---

# SSR Target / Bundle / Resolve Conditions / CLI

Choose the SSR build target, bundle everything into one file, customize resolve conditions, and add SSR middlewares to the CLI dev/preview servers.

## Signature / Usage

```js
// vite.config.js
export default defineConfig({
  ssr: {
    target: 'webworker', // default: 'node'
    noExternal: true,    // SSR bundle: single JS file
  },
})
```

## Notes

- The snippet is built from the options named on the page; the page has no code block for these sections.
- SSR Target: default is a node environment; the server can run in a Web Worker. Package entry resolution differs per platform. Set `ssr.target` to `'webworker'`.
- SSR Bundle: for runtimes like `webworker`, set `ssr.noExternal` to `true` to bundle into a single file. This (1) treats all dependencies as `noExternal` and (2) throws an error if any Node.js built-ins are imported.
- SSR Resolve Conditions: by default the SSR build uses `resolve.conditions`. Customize with `ssr.resolve.conditions` and `ssr.resolve.externalConditions`.
- Vite CLI: `vite dev` and `vite preview` also work for SSR apps. Add SSR middlewares to the dev server with `configureServer` and to the preview server with `configurePreviewServer`. Use a post hook so the SSR middleware runs after Vite's middlewares.

## Related

- [ssr.* Options](./ssr-options.md)
- [configureServer](../plugin-api/hook-configure-server.md)
- [resolve options](../config-shared/resolve-options.md)

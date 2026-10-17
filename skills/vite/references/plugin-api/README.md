# plugin-api

| Name | Description | Path |
|------|-------------|------|
| Authoring a Plugin / Conventions | Vite plugins extend Rolldown's plugin interface with a few extra Vite-specific options, so a plugin written once works for both dev and build. | [authoring-conventions.md](./authoring-conventions.md) |
| Chunk Import Map Information | Access the chunk ID to file path mapping when `build.chunkImportMap` is enabled. | [chunk-import-map-info.md](./chunk-import-map-info.md) |
| Client-server Communication / Custom Events | Since Vite 2.9, utilities help plugins communicate with clients: `server.ws.send` / `server.ws.on` on the server, `hot.on` / `hot.send` on the client. | [client-server-communication.md](./client-server-communication.md) |
| Referencing Emitted Assets | Emit an asset from a plugin with `this.emitFile({ type: 'asset', ... })`, which returns a `referenceId` used to generate the asset's URL (the final file name is unknown until the bundle is generated). | [emitted-assets.md](./emitted-assets.md) |
| HMR API (import.meta.hot) | Vite exposes its manual HMR API via the special `import.meta.hot` object. | [hmr-api-overview.md](./hmr-api-overview.md) |
| closeServer / closePreviewServer | Hooks called after the dev server (or preview server) has been torn down; typically used to dispose resources created in `configureServer` / `configurePreviewServer`. | [hook-close-server.md](./hook-close-server.md) |
| config / configResolved | Vite-specific hooks (ignored by Rollup) to modify the user config before resolution (`config`) and to read the final resolved config (`configResolved`). | [hook-config.md](./hook-config.md) |
| configureServer / configurePreviewServer | Hooks for configuring the dev server (`configureServer`) and the preview server (`configurePreviewServer`), most commonly to add custom middlewares to the internal connect app. | [hook-configure-server.md](./hook-configure-server.md) |
| handleHotUpdate | Performs custom HMR update handling on the server side. | [hook-handle-hot-update.md](./hook-handle-hot-update.md) |
| transformIndexHtml | Dedicated hook for transforming HTML entry point files such as `index.html`. | [hook-transform-index-html.md](./hook-transform-index-html.md) |
| hot.accept | Declares a module as accepting hot updates (an HMR boundary), either for itself (`hot.accept(cb)`) or for direct dependencies (`hot.accept(deps, cb)`). | [hot-accept.md](./hot-accept.md) |
| hot.decline / hot.invalidate | `hot.decline()` is a no-op kept for backward compatibility; `hot.invalidate(message?)` forces an update to propagate to importers. | [hot-decline-invalidate.md](./hot-decline-invalidate.md) |
| hot.dispose / hot.prune / hot.data | Clean up side effects of an updated module (`dispose`), clean up when a module is no longer imported (`prune`), and persist state across HMR instances (`data`). | [hot-dispose-prune-data.md](./hot-dispose-prune-data.md) |
| hot.on / hot.off / hot.send | Listen to HMR events (`on`), remove listeners (`off`), and send custom events back to Vite's dev server (`send`). | [hot-events.md](./hot-events.md) |
| Path Normalization / Hook Filters | Normalize paths to POSIX separators before comparing against resolved ids, and use hook filters to avoid unnecessary hook invocations. | [path-normalization-filters.md](./path-normalization-filters.md) |
| Plugin Context Meta / Output Bundle Metadata | Vite exposes extra properties on `this.meta` in plugin hooks with access to the plugin context, and augments Rolldown build output objects with a `viteMetadata` field. | [plugin-context-meta.md](./plugin-context-meta.md) |
| Plugin Ordering (enforce) / Conditional Application (apply) | `enforce` adjusts plugin application order; `apply` restricts a plugin to serve or build. | [plugin-ordering-conditional.md](./plugin-ordering-conditional.md) |
| Plugins Config | Users add plugins to the project `devDependencies` and configure them with the `plugins` array option. | [plugins-config.md](./plugins-config.md) |
| Rolldown Plugin Compatibility | A fair number of Rolldown / Rollup plugins work directly as a Vite plugin (e.g. `@rollup/plugin-alias`, `@rollup/plugin-json`), but not all, since some hooks do not make sense in an unbundled dev server context. | [rolldown-compatibility.md](./rolldown-compatibility.md) |
| Rolldown (Universal) Hooks | During dev, the Vite dev server creates a plugin container that invokes Rolldown Build Hooks the same way Rolldown does. | [rolldown-hooks.md](./rolldown-hooks.md) |
| Transforming Custom File Types / Virtual Modules | Simple plugin examples: a `transform` hook for custom file types and a virtual module via `resolveId` / `load`. | [virtual-modules-transforms.md](./virtual-modules-transforms.md) |

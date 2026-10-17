# plugin-api

| Name | Description | Path |
|------|-------------|------|
| Authoring a Plugin / Conventions | Vite plugins extend Rolldown's plugin interface with a few… | [authoring-conventions.md](./authoring-conventions.md) |
| Chunk Import Map Information | Access the chunk ID to file path mapping when… | [chunk-import-map-info.md](./chunk-import-map-info.md) |
| Client-server Communication / Custom Events | Since Vite 2.9, utilities help plugins communicate with clients… | [client-server-communication.md](./client-server-communication.md) |
| Referencing Emitted Assets | Emit an asset from a plugin with `this.emitFile` to get… | [emitted-assets.md](./emitted-assets.md) |
| HMR API (import.meta.hot) | Vite exposes its manual HMR API via the special `import.meta.hot`… | [hmr-api-overview.md](./hmr-api-overview.md) |
| closeServer / closePreviewServer | Hooks called after the dev server (or preview server) has been torn… | [hook-close-server.md](./hook-close-server.md) |
| config / configResolved | Vite-specific hooks (ignored by Rollup) to modify the user config… | [hook-config.md](./hook-config.md) |
| configureServer / configurePreviewServer | Hooks for configuring the dev server (`configureServer`) and… | [hook-configure-server.md](./hook-configure-server.md) |
| handleHotUpdate | Performs custom HMR update handling on the server side. | [hook-handle-hot-update.md](./hook-handle-hot-update.md) |
| transformIndexHtml | Dedicated hook for transforming HTML entry point files such as… | [hook-transform-index-html.md](./hook-transform-index-html.md) |
| hot.accept | Declares a module as accepting hot updates (an HMR boundary)… | [hot-accept.md](./hot-accept.md) |
| hot.decline / hot.invalidate | `hot.decline()` is a no-op kept for backward compatibility;… | [hot-decline-invalidate.md](./hot-decline-invalidate.md) |
| hot.dispose / hot.prune / hot.data | Clean up side effects of an updated module (`dispose`), clean up… | [hot-dispose-prune-data.md](./hot-dispose-prune-data.md) |
| hot.on / hot.off / hot.send | Listen to HMR events (`on`), remove listeners (`off`), and send… | [hot-events.md](./hot-events.md) |
| Path Normalization / Hook Filters | Normalize paths to POSIX separators before comparing against… | [path-normalization-filters.md](./path-normalization-filters.md) |
| Plugin Context Meta / Output Bundle Metadata | Vite exposes extra properties on `this.meta` in plugin hooks… | [plugin-context-meta.md](./plugin-context-meta.md) |
| Plugin Ordering (enforce) / Conditional Application (apply) | `enforce` adjusts plugin application order; `apply` restricts… | [plugin-ordering-conditional.md](./plugin-ordering-conditional.md) |
| Plugins Config | Users add plugins to the project `devDependencies` and configure… | [plugins-config.md](./plugins-config.md) |
| Rolldown Plugin Compatibility | A fair number of Rolldown / Rollup plugins work directly as a… | [rolldown-compatibility.md](./rolldown-compatibility.md) |
| Rolldown (Universal) Hooks | During dev, the Vite dev server creates a plugin container that… | [rolldown-hooks.md](./rolldown-hooks.md) |
| Transforming Custom File Types / Virtual Modules | Simple plugin examples: a `transform` hook for custom file types… | [virtual-modules-transforms.md](./virtual-modules-transforms.md) |

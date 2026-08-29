# Data & Rendering

`loader` / `useLoaderData` は React Router の同名 API とは別物。SSR のフルスタック機能は TanStack Start スキルを参照。

| Name | Description | Path |
|------|-------------|------|
| Data Loading | `loader`/`loaderDeps`, built-in SWR cache, `staleTime`/`gcTime`, context, error handling | [data-loading.md](./data-loading.md) |
| Deferred Data Loading | `Await` component, unresolved promises, SSR streaming of deferred data | [deferred-data-loading.md](./deferred-data-loading.md) |
| External Data Loading | Coordinating TanStack Query / SWR / etc. with `loader`, dehydrate/hydrate | [external-data-loading.md](./external-data-loading.md) |
| Data Mutations | `router.invalidate()`, mutation-state cleanup via `router.subscribe` | [data-mutations.md](./data-mutations.md) |
| Preloading | `intent`/`viewport`/`render` strategies, `preloadStaleTime`/`preloadGcTime`, manual `preloadRoute` | [preloading.md](./preloading.md) |
| Document Head Management | `routeOptions.head`, `<HeadContent />`, `<Scripts />`, `<ScriptOnce>` | [document-head-management.md](./document-head-management.md) |
| SSR | `RouterClient`/`RouterServer`, non-streaming vs streaming render handlers | [ssr.md](./ssr.md) |
| Render Optimizations | Structural sharing, fine-grained `select` subscriptions | [render-optimizations.md](./render-optimizations.md) |
| Code Splitting | Critical vs non-critical route config, `.lazy.tsx`, virtual routes | [code-splitting.md](./code-splitting.md) |
| Automatic Code Splitting | Bundler-plugin-driven split groupings and per-route overrides | [automatic-code-splitting.md](./automatic-code-splitting.md) |

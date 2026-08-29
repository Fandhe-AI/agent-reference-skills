# Rendering

TanStack Start のレンダリングは per-route の Selective SSR / SPA Mode / Static Prerendering + `Hydrate` による部分ハイドレーションが中心で、Next.js の RSC / App Router レンダリングモデル（`nextjs-app`）とは別モデル。

| Name | Description | Path |
|------|-------------|------|
| Hydration Errors | Server/client HTML mismatch causes and 5 mitigation strategies | [hydration-errors.md](./hydration-errors.md) |
| Deferred Hydration | `Hydrate` component + strategies to defer/code-split hydration of a subtree | [deferred-hydration.md](./deferred-hydration.md) |
| Selective SSR | Per-route `ssr: true/false/'data-only'/(ctx) => ...` control | [selective-ssr.md](./selective-ssr.md) |
| SPA Mode | Static shell (`/_shell.html`) that bootstraps entirely client-side | [spa-mode.md](./spa-mode.md) |
| Static Prerendering | Build-time static HTML generation via `prerender` config | [static-prerendering.md](./static-prerendering.md) |
| Incremental Static Regeneration (ISR) | HTTP cache-header-driven CDN revalidation pattern | [isr.md](./isr.md) |
| Server Entry Point | `src/server.ts` universal fetch handler entry | [server-entry-point.md](./server-entry-point.md) |
| Client Entry Point | `src/client.tsx` hydration entry via `StartClient` | [client-entry-point.md](./client-entry-point.md) |
| Early Hints | HTTP `103 Early Hints` via `onEarlyHints` / `responseLinkHeader` | [early-hints.md](./early-hints.md) |
| CDN Asset URLs | `transformAssets` runtime rewriting of manifest asset URLs for CDN hosting | [cdn-asset-urls.md](./cdn-asset-urls.md) |

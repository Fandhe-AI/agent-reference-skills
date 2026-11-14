# Rendering

React Router v8 Framework Mode supports three rendering strategies.

## Signature / Usage

### 1. Client Side Rendering (CSR)

```typescript
// react-router.config.ts
import type { Config } from "@react-router/dev/config";
export default { ssr: false } satisfies Config;
```

For SPAs. No server required.

### 2. Server Side Rendering (SSR)

```typescript
export default { ssr: true } satisfies Config;
```

Improves SEO and initial-load performance. Requires a deployment that supports server rendering.

### 3. Static Pre-rendering

```typescript
export default {
  async prerender() {
    return ["/", "/about", "/contact"];
  },
} satisfies Config;
```

Generates static HTML at build time; loaders also run at build time.

### 4. API-only Mode (unstable, 8.5.0)

```ts filename=react-router.config.ts
import type { Config } from "@react-router/dev/config";

export default {
  ssr: "unstable_api-only",
} satisfies Config;
```

Keeps a runtime server for loaders, actions, and route discovery while disabling production server-side document rendering. Without prerendering, the build generates a root-only `index.html` shell using the root `HydrateFallback`, like SPA Mode.

#### Using a separate API origin

```ts filename=react-router.config.ts
import type { Config } from "@react-router/dev/config";

export default {
  ssr: "unstable_api-only",
  unstable_apiServerOrigin: "https://api.example.com",
} satisfies Config;
```

## Options / Props

| Strategy | Use case | Deployment | SEO |
| --- | --- | --- | --- |
| CSR | SPA | Static hosting | fair |
| SSR | Web app | Server required | good |
| Pre-render | Static site | Static hosting | best |

## Notes

- SSR and pre-rendering can be combined (global `ssr: true` plus route-specific pre-rendering)
- `clientLoader` can be used to skip server rendering for specific routes
- URLs not covered by `prerender()` fall back to SSR
- Framework Mode only
- No breaking changes to the `ssr`/`prerender` config API between v7 and v8
- API-only Mode is experimental, may change in minor or patch releases, and is not supported in RSC Framework Mode. The browser fetches server loader data as it initializes the page; routes can use server `loader` and `action` exports without `clientLoader` / `clientAction` wrappers. Lazy route discovery remains enabled by default. It can be combined with prerendering (see [Pre-Rendering](../how-to/pre-rendering.md))
- Deploy both `build/client` and the runtime server build. Serve assets, prerendered documents, and the SPA fallback from the client build; send `.data` and route discovery requests (`/__manifest` by default) to the React Router request handler. The production API-only handler returns `404` for document requests; `react-router-serve` handles this routing automatically
- `unstable_apiServerOrigin` applies to loader, action, and route discovery requests only in API-only Mode. Use an origin without a path, query, or hash. Configure CORS on the API server and allow the client origin via `allowedActionOrigins` for cross-origin action submissions. To customize JavaScript-issued requests with authentication headers or cross-origin credentials, see [Custom Fetch](../how-to/custom-fetch.md); native data prefetches bypass custom fetch
- Source: https://reactrouter.com/start/framework/rendering (docs/start/framework/rendering.md at tag react-router@8.5.1: https://github.com/remix-run/react-router/blob/react-router@8.5.1/docs/start/framework/rendering.md)
- Source: https://github.com/remix-run/react-router/blob/react-router@8.5.1/packages/react-router-dev/CHANGELOG.md (8.5.0: `ssr: "unstable_api-only"` and `unstable_apiServerOrigin`, PR #15601)

## Related

- [modes](./modes.md)
- [installation](./installation.md)
- [data-loading](./data-loading.md)
- [deploying](./deploying.md)

# Output Types

Reference for all build output types exposed on `outputs` to adapters via `onBuildComplete`.

## Signature / Usage

```typescript
outputs.pages       // React pages from pages/
outputs.pagesApi    // API routes from pages/api/
outputs.appPages    // React pages from app/
outputs.appRoutes   // API and metadata routes from app/
outputs.prerenders  // ISR-enabled routes and static prerenders
outputs.staticFiles // Static assets and auto-statically optimized pages
outputs.middleware  // Middleware function, if present
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| type | `'PAGES' \| 'PAGES_API' \| 'APP_PAGE' \| 'APP_ROUTE' \| 'PRERENDER' \| 'STATIC_FILE' \| 'MIDDLEWARE'` | Output kind. |
| id | string | Route identifier. |
| filePath | string | Path to the built file. |
| pathname | string | URL pathname (includes `.rsc` suffix for RSC app page routes). |
| sourcePage | string | Original relative source file path. |
| runtime | `'nodejs' \| 'edge'` | Runtime the route is built for. |
| assets | `Record<string, string>` | Traced dependencies (key: repo-root-relative path, value: absolute path). |
| wasmAssets | `Record<string, string>` | Bundled wasm files (key: name, value: absolute path). |
| edgeRuntime | object | `modulePath`, `entryKey`, `handlerExport` — present for `runtime: 'edge'` outputs. |
| config.maxDuration | number | Maximum route duration in seconds. |
| config.preferredRegion | `string \| string[]` | Preferred deployment region. |
| config.env | `Record<string, string>` | Environment variables (edge runtime only). |

## Notes

- When `config.output` is `'export'`, only `outputs.staticFiles` is populated; `pages`, `appPages`, `pagesApi`, `appRoutes`, and `prerenders` are all empty.
- `outputs.prerenders[]` additionally includes `parentOutputId`, `groupId` (prerenders sharing a `groupId` revalidate together), `pprChain.headers`, `parentFallbackMode` (`false` | `null` | path string), `fallback` (`filePath`, `initialStatus`, `initialHeaders`, `initialExpiration`, `initialRevalidate`, `postponedState`), and ISR-related `config` fields: `allowQuery`, `allowHeader`, `bypassFor`, `renderingMode` (`'STATIC' | 'PARTIALLY_STATIC'`), `partialFallback`, `bypassToken`.
- `outputs.staticFiles[]` entries include `immutableHash` when the filename is content-hashed.
- `outputs.middleware` pathname is always `/_middleware`, `sourcePage` is always `'middleware'`, and `config.matchers` describes source patterns plus `has`/`missing` conditions.

## Related

- [Routing Information](./adapters-routing-information.md)
- [Implementing PPR in an Adapter](./adapters-implementing-ppr-in-an-adapter.md)
- [Invoking Entrypoints](./adapters-invoking-entrypoints.md)

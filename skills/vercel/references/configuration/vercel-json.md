# vercel.json

Static JSON configuration file for overriding Vercel project defaults. Place in the project root. Supports all properties listed below. Use only one config file: `vercel.json` **or** `vercel.ts`.

## Signature / Usage

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "next build",
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [{ "source": "/about", "destination": "/about-our-company.html" }]
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `$schema` | `string` | — | URL to enable IDE autocomplete and schema validation |
| `buildCommand` | `string \| null` | — | Override the Build Command (also overrides `build` in `package.json`) |
| `bunVersion` | `string` | — | Use Bun runtime instead of Node.js. Only valid value: `"1.x"` |
| `cleanUrls` | `boolean` | `false` | Remove `.html` extensions and redirect extension-based paths with 308 |
| `crons` | `Cron[]` | — | Schedule cron jobs for the production deployment |
| `devCommand` | `string \| null` | — | Override the Development Command |
| `fluid` | `boolean \| null` | — | Enable Fluid compute per-deployment (enabled by default for new projects since April 2025) |
| `framework` | `string \| null` | — | Override the Framework Preset slug (use `null` for "Other") |
| `functions` | `Record<GlobPattern, FunctionConfig>` | — | Configure Vercel Function memory, duration, runtime per glob |
| `headers` | `HeaderRule[]` | — | Add custom HTTP response headers |
| `ignoreCommand` | `string \| null` | — | Override the Ignored Build Step command (exit 0 = skip build, exit 1 = build) |
| `images` | `ImagesConfig` | — | Configure Vercel Image Optimization API |
| `installCommand` | `string \| null` | — | Override the Install Command (empty string skips install) |
| `outputDirectory` | `string \| null` | — | Override the build Output Directory |
| `public` | `boolean` | `false` | Deprecated. No longer grants public access to source/logs |
| `redirects` | `RedirectRule[]` | — | Redirect requests to different URLs |
| `bulkRedirectsPath` | `string` | — | Path to a CSV/JSON/JSONL file (or folder) of bulk redirects |
| `regions` | `string[]` | `["iad1"]` | Deploy functions to specific Vercel regions |
| `functionFailoverRegions` | `string[]` | — | Failover regions for functions (Enterprise) |
| `rewrites` | `RewriteRule[]` | — | Rewrite (proxy) requests to different paths or external URLs |
| `routes` | `RouteRule[]` | — | Low-level PCRE-based routing rules |
| `trailingSlash` | `boolean \| undefined` | `undefined` | `true` = add slash, `false` = remove slash, `undefined` = no redirect |

### `crons` item

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | Yes | Path to invoke (must start with `/`). Max 512 chars |
| `schedule` | `string` | Yes | Cron expression. Max 256 chars |

### `functions` value

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `runtime` | `string` | No | npm package of a Community Runtime (e.g. `vercel-php@0.5.2`) |
| `memory` | `number` | No | MB of memory (unavailable with Fluid compute — set in dashboard instead) |
| `maxDuration` | `number` | No | Max seconds per invocation (plan-dependent limits) |
| `supportsCancellation` | `boolean` | No | Support request cancellation (Node.js runtime only) |
| `includeFiles` | `string` | No | Glob of files to bundle into the function |
| `excludeFiles` | `string` | No | Glob of files to exclude from the bundle |
| `regions` | `string[]` | No | Override project-level `regions` for this function |
| `functionFailoverRegions` | `string[]` | No | Override project-level failover regions for this function |

### `headers` item

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `source` | `string` | Yes | Path pattern (excluding querystring) |
| `headers` | `{key: string, value: string}[]` | Yes | Response headers to add |
| `has` | `HasObject[]` | No | Condition: apply only when these properties are **present** |
| `missing` | `HasObject[]` | No | Condition: apply only when these properties are **absent** |

### `redirects` item

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `source` | `string` | Yes | Incoming path pattern |
| `destination` | `string` | Yes | Target absolute path or external URL |
| `permanent` | `boolean` | No | `true` = 308, `false` = 307 (default `true`) |
| `statusCode` | `number` | No | Explicit status code; mutually exclusive with `permanent` |
| `has` | `HasObject[]` | No | Conditional redirect based on presence |
| `missing` | `HasObject[]` | No | Conditional redirect based on absence |

### `rewrites` item

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `source` | `string` | Yes | Incoming path pattern |
| `destination` | `string` | Yes | Target path or external URL |
| `has` | `HasObject[]` | No | Apply only when properties are present |
| `missing` | `HasObject[]` | No | Apply only when properties are absent |

### `images` config

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sizes` | `number[]` | Yes | Allowed image widths |
| `localPatterns` | `{pathname: string, search: string}[]` | No | Allowed local path patterns |
| `remotePatterns` | `RemotePattern[]` | No | Allowed external domains/paths |
| `minimumCacheTTL` | `number` | No | Cache TTL in seconds for optimized images |
| `qualities` | `number[]` | No | Allowed quality values |
| `formats` | `("image/avif" \| "image/webp")[]` | No | Output formats |
| `dangerouslyAllowSVG` | `boolean` | No | Allow SVG input (default `false`) |
| `contentSecurityPolicy` | `string` | No | CSP header for optimized images |
| `contentDispositionType` | `"inline" \| "attachment"` | No | `Content-Disposition` header value |

### `HasObject`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `"header" \| "cookie" \| "query" \| "host"` | Yes | Which part of the request to check |
| `key` | `string` | Yes (except `host`) | Key to match |
| `value` | `string \| object` | No | Value to match; object supports `pre`, `suf`, `eq`, `neq`, `inc`, `ninc` |

### `bulkRedirectsPath` fields

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `source` | `string` | Yes | Incoming path or URL. Max 2048 chars |
| `destination` | `string` | Yes | Target path or URL. Max 2048 chars |
| `permanent` | `boolean` | No | Default `false` (307) |
| `statusCode` | `integer` | No | 301, 302, 303, 307, or 308 |
| `caseSensitive` | `boolean` | No | Default `false` |
| `preserveQueryParams` | `boolean` | No | Default `false` |

## Notes

- Cannot use `functions` and `builds` together; `builds` is legacy
- `bunVersion: "1.x"` requires `bun run --bun` in `package.json` scripts when using ISR
- `cleanUrls` does not work with Next.js under `vercel dev` (works in deployed env)
- `has` in `redirects` / `rewrites` does not work locally with `vercel dev`
- Bulk redirects do not support wildcard or header matching
- `routes` is case-insensitive for `src`; prefer `rewrites`/`redirects`/`headers` for new code

## Related

- [vercel-ts.md](./vercel-ts.md)
- [git-configuration.md](./git-configuration.md)
- [build-output-api.md](./build-output-api.md)

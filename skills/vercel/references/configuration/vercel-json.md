# vercel.json

Static JSON configuration file for overriding Vercel project defaults. Place in the project root. Supports all properties listed below. Use only one config file: `vercel.json`, `vercel.ts` **or** `vercel.toml`.

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
| `bunVersion` | `"1.4.x" \| "1.x"` | — | Use Bun runtime (Beta, all plans) instead of Node.js for Vercel Functions and Routing Middleware not using the Edge runtime. Vercel manages Bun minor versions; `1.4.x` and `1.x` are the only valid values |
| `cleanUrls` | `boolean` | `false` | Remove `.html` extensions and redirect extension-based paths with 308 |
| `crons` | `Cron[]` | — | Schedule cron jobs for the production deployment |
| `devCommand` | `string \| null` | — | Override the Development Command |
| `fluid` | `boolean` | — | Enable Fluid compute per-deployment (enabled by default for new projects since April 2025) |
| `framework` | `string \| null` | — | Override the Framework Preset slug (use `null` for "Other") |
| `functions` | `Record<GlobPattern, FunctionConfig>` | — | Configure Vercel Function memory, duration, runtime per glob |
| `headers` | `HeaderRule[]` | — | Add custom HTTP response headers |
| `ignoreCommand` | `string \| null` | — | Override the Ignored Build Step command (exit 0 = skip build, exit 1 = build) |
| `images` | `ImagesConfig` | — | Configure Vercel Image Optimization API |
| `installCommand` | `string \| null` | — | Override the Install Command (empty string skips install) |
| `outputDirectory` | `string \| null` | — | Override the build Output Directory |
| `public` | `boolean` | — | No longer supported; can cause deployment failures. Remove it from `vercel.json` |
| `proxy` | `{entrypoint, matcher?}` | — | Explicitly configure the file built as Routing Middleware (see `proxy` below) |
| `redirects` | `RedirectRule[]` | — | Redirect requests to different URLs |
| `bulkRedirectsPath` | `string` | — | Path to a CSV/JSON/JSONL file (or folder) of bulk redirects |
| `regions` | `string[]` | `["iad1"]` | Deploy functions to specific Vercel regions |
| `functionFailoverRegions` | `string[]` | — | Failover regions for functions (Enterprise) |
| `rewrites` | `RewriteRule[]` | — | Rewrite (proxy) requests to different paths or external URLs |
| `routes` | `RouteRule[]` | — | Low-level PCRE-based routing rules |
| `skipMiddlewareRequestBody` | `boolean` | `false` | Skip forwarding the client request body to Routing Middleware, reducing Fast Origin Transfer and potentially TTFB. Vercel Functions and rewrite targets still receive the body |
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
| `maxDuration` | `number \| "max"` | No | Max seconds per invocation, integer from `1` to the plan maximum. `"max"` resolves to the plan maximum at deploy time (not to the extended max duration beta) |
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
| `value` | `string \| object` | No | Value to match; object supports `pre`, `suf`, `eq`, `neq`, `inc`, `ninc`, `re` |

### `proxy` fields

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `entrypoint` | `string` | Yes | Routing Middleware entrypoint relative to the project root; must be an existing file. TypeScript/JavaScript: a path ending in `.ts` or `.js` (e.g. `src/proxy.ts`). Python: a `module:attribute` ASGI/WSGI value (e.g. `proxy:proxy`) |
| `matcher` | `string \| string[]` | No | Path matcher(s) starting with `/` selecting which requests run the middleware. Without it the middleware runs on every request |

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "proxy": {
    "entrypoint": "proxy.ts",
    "matcher": "/api/:func*"
  }
}
```

### `routes` item (extra fields)

| Name | Type | Description |
|------|------|-------------|
| `src` / `dest` / `status` | aliases `source` / `destination` / `statusCode` | Aliases for consistency with `rewrites` / `redirects` / `headers` |
| `env` | `string[]` | Whitelist of env var names whose values replace `$VAR` / `${VAR}` in `dest` at request time (unset variables stay literal) |
| `transforms` | `Transform[]` | `type`: `request.query`, `request.headers`, `response.headers` or `request.path`; `op`: `append`, `set`, `delete`; `target.key` (string or matcher object with `eq`, `neq`, `inc`, `ninc`, `pre`, `suf`, `gt`, `gte`, `lt`, `lte`); `args`; `env` (max 64 entries, expands `$VAR` in `args`) |

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

- `proxy`: TypeScript/JavaScript entrypoints run on Node.js, or Bun when `bunVersion` is set; Python entrypoints run on the Python runtime; the middleware must use the same runtime as the app. In TS/JS the matcher can instead be exported as `config.matcher` from the entrypoint. Set per-function options with `functions` keyed by the entrypoint path (e.g. `"proxy.ts": { "maxDuration": 10 }`)
- `routes` `request.path` transform: only `op: "set"` with a single string `args` (must start with `/`, no `//host`, no query string, no whitespace or control characters); it overrides the path the runtime sees (`req.url`), does not change route selection, and is last-write-wins across matching routes. Inside a service's own `routes` it changes the path the service observes
- Deprecated `routes` properties: `handle` (use `rewrites`), `important` (use `redirects` / `headers`), `override` (use `rewrites`)
- `crons`: Cron Jobs are described as a legacy feature to be migrated to Schedules (timezones, private function and queue targets, runtime creation)
- `bunVersion`: if `package.json` sets `engines.node` and no Bun version, `engines.node` takes precedence; the build warns and functions run on Node.js. Remove `engines.node` to run on Bun
- `public`: the validator no longer accepts it; remove the key
- Legacy properties still supported but deprecated: `name`, `version`, `alias`, `scope`, `env`, `build.env`, `builds`
- Cannot use `functions` and `builds` together; `builds` is legacy
- `bunVersion` (`"1.4.x"` or `"1.x"`) with Next.js ISR requires `bun run --bun` in the `build` and `dev` scripts in `package.json` (e.g. `bun run --bun next build`)
- `skipMiddlewareRequestBody` (changelog 2026-10-08): enable only if your Routing Middleware does not read or access the request body; redeploy for the change to take effect. Also available in `vercel.ts`
- `vercel.toml` is a third format with the same properties as `vercel.json` (supports comments, flatter structure); use only one of `vercel.json`, `vercel.ts` or `vercel.toml`
- `cleanUrls` does not work with Next.js under `vercel dev` (works in deployed env)
- `has` in `redirects` / `rewrites` does not work locally with `vercel dev`
- Bulk redirects do not support wildcard or header matching
- Source: https://vercel.com/docs/project-configuration/vercel-json (fetched 2026-11-14)
- `routes` is case-insensitive for `src`; prefer `rewrites`/`redirects`/`headers` for new code

## Related

- [vercel-ts.md](./vercel-ts.md)
- [git-configuration.md](./git-configuration.md)
- [build-output-api.md](./build-output-api.md)

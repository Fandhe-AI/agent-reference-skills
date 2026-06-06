# Build Output API

A file-system specification for the `.vercel/output/` directory that produces a Vercel deployment without using Vercel's build system. Primarily targeting framework authors who want to utilize all Vercel platform features.

## Signature / Usage

```
.vercel/output/
  config.json          ← required
  static/              ← static files served directly
  functions/           ← Vercel Functions directory
```

Minimal `config.json`:

```json
{
  "version": 3
}
```

## Options / Props

### `config.json` top-level

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `version` | `3` | Yes | Build Output API version. Must be `3` |
| `routes` | `Route[]` | No | Routing rules (same syntax as `vercel.json` `routes`) |
| `images` | `ImagesConfig` | No | Image Optimization API configuration |
| `wildcard` | `WildcardConfig[]` | No | Domain-to-value mappings for i18n routing via `$wildcard` |
| `overrides` | `Record<string, Override>` | No | Override URL path or `Content-Type` for static files |
| `cache` | `string[]` | No | Glob patterns of paths to cache between builds |
| `framework` | `{version: string}` | No | Framework version string (display only) |
| `crons` | `Cron[]` | No | Cron job definitions for production deployment |

### `Route` (Source route)

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `src` | `string` | Yes | PCRE-compatible regex matching incoming pathname |
| `dest` | `string` | No | Destination pathname or URL; supports `$1`, `$2`, `$name` capture groups |
| `headers` | `Record<string, string>` | No | Response headers |
| `methods` | `string[]` | No | HTTP methods to match (default: all) |
| `continue` | `boolean` | No | If `true`, routing continues after this rule matches |
| `caseSensitive` | `boolean` | No | Whether `src` matching is case-sensitive |
| `check` | `boolean` | No | If `true`, triggers `handle: filesystem` and `handle: rewrite` |
| `status` | `number` | No | HTTP status code to respond with |
| `has` | `HasField[]` | No | Request conditions that must be present |
| `missing` | `HasField[]` | No | Request conditions that must be absent |
| `locale` | `Locale` | No | i18n locale redirect configuration |
| `middlewarePath` | `string` | No | Path to an Edge Runtime middleware function |
| `mitigate` | `{action: "challenge" \| "deny"}` | No | WAF mitigation action |
| `transforms` | `Transform[]` | No | Header/query transform rules |

### `Route` (Handler route)

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `handle` | `"rewrite" \| "filesystem" \| "resource" \| "miss" \| "hit" \| "error"` | Yes | Routing phase delimiter |
| `src` | `string` | No | Optional path pattern |
| `dest` | `string` | No | Optional destination |
| `status` | `number` | No | Optional status code |

### `ImagesConfig`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sizes` | `number[]` | Yes | Allowed image widths |
| `domains` | `string[]` | Yes | Allowed external domains (empty = deployment domain only) |
| `remotePatterns` | `RemotePattern[]` | No | Fine-grained external pattern allowlist |
| `localPatterns` | `LocalPattern[]` | No | Local path allowlist (`undefined` = allow all, `[]` = deny all) |
| `qualities` | `number[]` | No | Allowed quality values (1–100); `undefined` = all |
| `minimumCacheTTL` | `number` | No | Cache TTL in seconds |
| `formats` | `("image/avif" \| "image/webp")[]` | No | Output formats |
| `dangerouslyAllowSVG` | `boolean` | No | Allow SVG input (default `false`) |
| `contentSecurityPolicy` | `string` | No | CSP for optimized images |
| `contentDispositionType` | `string` | No | `Content-Disposition` header value |

Image Optimization API endpoint: `/_vercel/image?url=<url>&w=<width>&q=<quality>`

### `WildcardConfig` item

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `domain` | `string` | Yes | Domain name to match |
| `value` | `string` | Yes | Value assigned to `$wildcard` for use in `routes` |

### `Override`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | No | URL path to serve the static file from |
| `contentType` | `string` | No | Override `Content-Type` response header |

### `Cron` item

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | Yes | Path to invoke |
| `schedule` | `string` | Yes | Cron expression |

### `Transform`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `"request.headers" \| "request.query" \| "response.headers"` | Yes | Scope of the transform |
| `op` | `"append" \| "set" \| "delete"` | Yes | Operation to perform |
| `target` | `{key: string \| MatchableValue}` | Yes | Target key; regex (`re`) not supported in transforms |
| `args` | `string \| string[]` | No | Value(s) for `append`/`set` operations |

## Notes

- `config.json` with at least `"version": 3` is required
- The `cache` property only applies when Vercel builds from source (not prebuilt artifacts)
- `framework.version` is for display purposes only
- Native dependencies built locally may not match Vercel's Linux x64 build image

## Related

- [vercel-json.md](./vercel-json.md)
- [vercel-ts.md](./vercel-ts.md)

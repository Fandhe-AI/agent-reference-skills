# headers, redirects, rewrites

`next.config.js` async functions for setting custom HTTP headers, redirecting request paths, and rewriting (proxying) request paths. All three share the same `source` path-matching syntax and `has` / `missing` conditional matching.

## headers

Sets custom HTTP response headers on matching paths. Checked before the filesystem (pages, `/public`).

```js filename="next.config.js"
module.exports = {
  async headers() {
    return [
      {
        source: '/about',
        headers: [{ key: 'x-custom-header', value: 'my custom header value' }],
      },
    ]
  },
}
```

| Name | Type | Description |
|------|------|-------------|
| `source` | `string` | Incoming request path pattern. |
| `headers` | `{ key, value }[]` | Response headers to set. |
| `basePath` | `false \| undefined` | If `false`, `basePath` is not prepended (external rewrites only). |
| `locale` | `false \| undefined` | If `false`, locale is not auto-prefixed. |
| `has` / `missing` | `{ type, key, value? }[]` | Conditional match on `header`/`cookie`/`host`/`query`. |

- If two entries match the same path/key, the **last** one wins.
- Cannot override the immutable `Cache-Control: public, max-age=31536000, immutable` Next.js sets for hashed static assets.
- Common security headers documented on the page: CORS (`Access-Control-Allow-*`), `X-DNS-Prefetch-Control`, `Strict-Transport-Security`, `X-Frame-Options` (superseded by CSP `frame-ancestors`), `Permissions-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Content-Security-Policy`.
- Version history: `has` since `v10.2.0`, `missing` since `v13.3.0`.

## redirects

Redirects an incoming request path to a different destination path (URL changes in the browser).

```js filename="next.config.js"
module.exports = {
  async redirects() {
    return [{ source: '/about', destination: '/', permanent: true }]
  },
}
```

| Name | Type | Description |
|------|------|-------------|
| `source` | `string` | Incoming request path pattern. |
| `destination` | `string` | Path to redirect to. |
| `permanent` | `boolean` | `true` → 308 (cached permanently); `false` → 307 (temporary). |
| `statusCode` | `number` | Custom status code; mutually exclusive with `permanent`. |
| `basePath` / `locale` / `has` / `missing` | — | Same as `headers`. |

- Next.js uses 307/308 (not 301/302) to preserve the original HTTP method across the redirect.
- Query params on the request are passed through to the destination automatically.
- Always include `/` before `:` in path params in `source`/`destination` to avoid literal-string matching (risk of infinite redirects).
- i18n redirects in App Router must use hardcoded locale paths (no automatic locale prefixing); for dynamic locale handling use route segments + proxy.

## rewrites

Maps an incoming request path to a different destination while keeping the URL unchanged (masks the destination — a proxy). Applies to client-side routing too.

```js filename="next.config.js"
module.exports = {
  async rewrites() {
    return [{ source: '/about', destination: '/' }]
  },
}
```

Can return an array, or an object with `beforeFiles` / `afterFiles` / `fallback` arrays (since `v10.1`) for finer control over ordering:

```js filename="next.config.js"
module.exports = {
  async rewrites() {
    return {
      beforeFiles: [/* checked before filesystem/public files */],
      afterFiles: [/* checked after files, before dynamic routes */],
      fallback: [/* checked after dynamic routes, before 404 */],
    }
  },
}
```

Route resolution order: headers → redirects → proxy → `beforeFiles` rewrites → static files/pages → `afterFiles` rewrites → dynamic routes → `fallback` rewrites → 404.

| Name | Type | Description |
|------|------|-------------|
| `source` | `string` | Incoming request path pattern. |
| `destination` | `string` | Path (or external URL) to rewrite to. |
| `basePath` / `locale` / `has` / `missing` | — | Same as `headers`. |

- If a matched param is **not** used in `destination`, it's auto-passed as a query param; if it **is** used, it's not auto-passed (can still add manually).
- Supports rewriting to external URLs (useful for incremental adoption / multi-zone setups); with `trailingSlash: true`, include the trailing slash in both `source` and `destination`.
- `fallback` rewrites let you proxy all unmatched routes to an existing site as a Next.js migration strategy.

## Path Matching (shared syntax)

- `/blog/:slug` matches `/blog/first-post` (no nested paths); patterns are anchored to the start.
- Modifiers: `*` (zero or more), `+` (one or more), `?` (zero or one) — e.g. `/blog/:slug*` matches `/blog`, `/blog/a`, `/blog/a/b/c`.
- Regex: wrap in parens after a param, e.g. `/blog/:slug(\d{1,})`.
- Escape literal regex special characters (`( ) { } : * + ?` etc.) with `\\`.

## Related

- [routing.md](./routing.md) (`basePath`, `trailingSlash`)

# Dynamic Base URL

Supports dynamic base URL resolution through an allowlist-based approach, letting an application operate across multiple domains and preview deployments (custom domains, Vercel previews, branch deployments, etc.) at the same time.

## Signature / Usage

```typescript
export const auth = betterAuth({
  baseURL: {
    allowedHosts: [
      "myapp.com",
      "www.myapp.com",
      "*.vercel.app",
    ],
  },
});
```

When a request is received, Better Auth extracts the host from the `x-forwarded-host` or `host` header and validates it against the allowlist.

### Fallback URL

```typescript
export const auth = betterAuth({
  baseURL: {
    allowedHosts: ["myapp.com", "*.vercel.app"],
    fallback: "https://myapp.com",
  },
});
```

### Environment-based protocol

```typescript
export const auth = betterAuth({
  baseURL: {
    allowedHosts: ["localhost:3000", "myapp.com", "*.vercel.app"],
    protocol: process.env.NODE_ENV === "development" ? "http" : "https",
  },
});
```

### Cross-subdomain cookies with dynamic hosts

```typescript
export const auth = betterAuth({
  baseURL: {
    allowedHosts: ["auth.example1.com", "auth.example2.com"],
    protocol: "https",
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      // domain: ".example.com", // Optional: force a static domain
    },
  },
});
```

### Backward compatibility (static string)

```typescript
export const auth = betterAuth({
  baseURL: "https://myapp.com",
});
```

### Common implementation patterns

**Vercel deployments:**

```typescript
allowedHosts: ["myapp.com", "www.myapp.com", "*.vercel.app"]
```

**Development + production:**

```typescript
allowedHosts: ["localhost:3000", "localhost:5173", "myapp.com", "*.vercel.app"],
protocol: process.env.NODE_ENV === "development" ? "http" : "https"
```

**Multiple production domains:**

```typescript
allowedHosts: ["myapp.com", "myapp.co.uk", "myapp.eu"]
```

## Options / Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `allowedHosts` | `string[]` | Required | List of allowed host patterns (supports wildcards) |
| `fallback` | `string` | — | URL for hosts that don't match (no error is thrown) |
| `protocol` | `"http" \| "https" \| "auto"` | `"auto"` | Protocol used to construct URLs |

### Wildcard patterns

| Pattern | Matches |
|---------|---------|
| `myapp.com` | Exact domain match only |
| `*.vercel.app` | Any Vercel subdomain |
| `preview-*.myapp.com` | Subdomains starting with `preview-` |
| `localhost:*` | localhost on any port |

### Protocol handling

| Value | Behavior |
|-------|----------|
| `"https"` | Always HTTPS |
| `"http"` | Always HTTP |
| `"auto"` | Derived from `x-forwarded-proto`. Defaults to HTTPS if unavailable |

Cookie `Secure` flag: `https` -> secure, `http` -> insecure, `auto`/unset -> depends on `NODE_ENV === "production"` (can be overridden with `advanced.useSecureCookies`).

## Notes

> **Note**: As of 2026-08 the official `concepts/dynamic-base-url` page no longer exists (404). The same content has been consolidated into `guides/dynamic-base-url.md`, which is now the primary source. This page is kept for the time being as a reference during the transition.

- Changed in 1.7: dynamic base URLs do not trust forwarded headers by default. Better Auth derives the host from the `Host` header and then the request URL; `x-forwarded-host` / `x-forwarded-proto` are ignored unless you set `advanced.trustedProxyHeaders: true` (needed when the proxy exposes the public hostname only via `x-forwarded-host`; proxies that rewrite the host, such as nginx, Vercel, Cloudflare, and Netlify, need no change). `protocol: "auto"` uses `x-forwarded-proto` only when `advanced.trustedProxyHeaders` is `true`, then the request URL, then HTTP for local loopback hosts, otherwise HTTPS (the Protocol handling table above and the "x-forwarded-host or host" description describe the 1.6 behavior). Without `baseURL.fallback`, dynamic base URLs fail closed when a request has no usable host or its host does not match `allowedHosts`; direct server API calls must include request URL or header data resolving to an allowed public origin, or configure a trusted fallback. The `fallback` origin is added to `trustedOrigins`.
- The v1.7.10 docs have no `concepts/dynamic-base-url` page (only `guides/dynamic-base-url`); the behavior is documented in `reference/options` and the 1.7 upgrade guide.
- `allowedHosts` automatically appends its patterns to `trustedOrigins`, deduplicating entries
- Configuring `allowedHosts` is required — Better Auth does not perform automatic platform detection
- `fallback` silently masks unrecognized hosts and may hide misconfiguration, so use it with care

### Security

- **Allowlist is mandatory**: every host pattern must be explicitly declared (no automatic detection)
- **Header sanitization**: the `x-forwarded-host` and `host` headers are sanitized before processing
- **Explicit wildcards only**: wildcards are supported but require intentional configuration
- **Errors on unknown hosts**: unless `fallback` is configured, unknown hosts throw an error (recommended, for visibility)

## Related

- [Cookies](./cookies.md)

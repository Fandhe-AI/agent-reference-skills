# Secure Headers Middleware

Sets security-related HTTP response headers with sensible defaults. Modeled after Helmet.js.

## Signature / Usage

```ts
import { secureHeaders } from 'hono/secure-headers'

app.use(secureHeaders())
```

## Options / Props

Each option accepts `true` (enable default), `false` (suppress header), or a custom string value.

| Name | Default Value | Description |
|------|---------------|-------------|
| `xFrameOptions` | `"SAMEORIGIN"` | `X-Frame-Options` header |
| `xXssProtection` | `"0"` | `X-XSS-Protection` header |
| `strictTransportSecurity` | `"max-age=15552000; includeSubDomains"` | `Strict-Transport-Security` header |
| `xContentTypeOptions` | `"nosniff"` | `X-Content-Type-Options` header |
| `xDnsPrefetchControl` | `"off"` | `X-DNS-Prefetch-Control` header |
| `xDownloadOptions` | `"noopen"` | `X-Download-Options` header |
| `xPermittedCrossDomainPolicies` | `"none"` | `X-Permitted-Cross-Domain-Policies` header |
| `crossOriginResourcePolicy` | `"same-origin"` | `Cross-Origin-Resource-Policy` header |
| `crossOriginOpenerPolicy` | `"same-origin"` | `Cross-Origin-Opener-Policy` header |
| `crossOriginEmbedderPolicy` | `false` | `Cross-Origin-Embedder-Policy` header (disabled by default) |
| `originAgentCluster` | `"?1"` | `Origin-Agent-Cluster` header |
| `referrerPolicy` | `"no-referrer"` | `Referrer-Policy` header |
| `contentSecurityPolicy` | — | Object with CSP directives (`defaultSrc`, `scriptSrc`, `styleSrc`, etc.) |
| `contentSecurityPolicyReportOnly` | — | Report-only variant of CSP |
| `trustedTypes` | — | `Trusted-Types` policy name configuration |
| `requireTrustedTypesFor` | — | `Require-Trusted-Types-For` enforcement scope |
| `reportingEndpoints` | — | `Reporting-Endpoints` configuration |
| `permissionsPolicy` | — | Object mapping feature names to arrays of origins or booleans |

## Notes

- The `NONCE` constant (imported from `hono/secure-headers`) generates a unique per-request value for CSP nonces.
- Import `SecureHeadersVariables` for type-safe nonce access via `c.get('secureHeadersNonce')`.
- Be cautious about middleware ordering: later middleware overrides earlier header values for the same header name.

## Related

- [CORS](./cors.md)
- [CSRF](./csrf.md)

# CSRF Protection Middleware

Protects against Cross-Site Request Forgery by validating the `Origin` or `Sec-Fetch-Site` header on unsafe HTTP methods (POST, PUT, DELETE, PATCH).

## Signature / Usage

```ts
import { csrf } from 'hono/csrf'

app.use(csrf())

// With specific origin
app.use(csrf({ origin: 'https://example.com' }))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `origin` | `string \| string[] \| (origin, c) => boolean` | Allowed origin(s). Defaults to same origin as request URL. |
| `secFetchSite` | `string \| string[] \| (secFetchSite, c) => boolean` | Allowed `Sec-Fetch-Site` values. Defaults to `'same-origin'` only. |

## Notes

- Only validates unsafe methods with form-compatible content types; GET/HEAD are unaffected.
- A request passes if either the `Origin` check or the `Sec-Fetch-Site` check succeeds.
- Old browsers that do not send `Origin` headers, or reverse proxies that strip them, may bypass this middleware. In such cases use CSRF token methods instead.
- For dynamic origin functions, always verify the protocol; never use forward (prefix) matching.

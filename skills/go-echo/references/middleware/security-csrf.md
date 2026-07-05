# CSRF

Cross-Site Request Forgery protection combining modern `Sec-Fetch-Site` header validation with traditional token-based fallback.

## Signature / Usage

```go
import "github.com/labstack/echo/v5/middleware"

e.Use(middleware.CSRF())
```

## Options / Props

| Name | Type | Description | Default |
|------|------|--------------|---------|
| `Skipper` | `Skipper` | Function to skip middleware | `DefaultSkipper` |
| `TrustedOrigins` | `[]string` | Allowlist for cross-site requests | — |
| `AllowSecFetchSiteFunc` | function | Custom `Sec-Fetch-Site` validation logic | — |
| `TokenLength` | `uint8` | Generated token length | `32` |
| `TokenLookup` | `string` | Token extraction source | `"header:X-CSRF-Token"` |
| `ContextKey` | `string` | Context storage key for the token | `"csrf"` |
| `CookieName` | `string` | CSRF cookie name | `"_csrf"` |
| `CookieSecure` | `bool` | Secure cookie flag | `false` |
| `CookieHTTPOnly` | `bool` | HTTP-only cookie flag | `false` |
| `CookieSameSite` | `http.SameSite` | SameSite cookie mode | Default mode |

## Notes

- Two-layer defense: modern browsers are checked via `Sec-Fetch-Site` (`same-origin`/`none` allowed, `same-site` falls back to token check, `cross-site` blocked with `403` for unsafe methods); older browsers fall back to token validation only.
- The token is available server-side via context under `ContextKey`, and client-side via the CSRF cookie.

## Related

- [cors](./security-cors.md)
- [secure](./security-secure.md)

# Redirect

Built-in functions for HTTP → HTTPS and www ↔ non-www domain redirects.

## Signature / Usage

```go
import "github.com/labstack/echo/v5/middleware"

e.Pre(middleware.HTTPSRedirect())

// Custom configuration — register with Pre() so it runs before routing
e.Pre(middleware.HTTPSRedirectWithConfig(middleware.RedirectConfig{
  Code: http.StatusTemporaryRedirect, // 307
}))
```

## Options / Props

| Name | Type | Description | Default |
|------|------|--------------|---------|
| `Skipper` | `Skipper` | Function to skip middleware execution | `DefaultSkipper` |
| `Code` | `int` | HTTP status code used for the redirect | `301` (`http.StatusMovedPermanently`) |

Available redirect middleware:

| Middleware | Behavior |
|------------|----------|
| `HTTPSRedirect` | `http://labstack.com` → `https://labstack.com` |
| `HTTPSWWWRedirect` | `http://labstack.com` → `https://www.labstack.com` |
| `HTTPSNonWWWRedirect` | `http://www.labstack.com` → `https://labstack.com` |
| `WWWRedirect` | `http://labstack.com` → `http://www.labstack.com` |
| `NonWWWRedirect` | `http://www.labstack.com` → `http://labstack.com` |

## Notes

- Use `e.Pre()` so redirects are applied before routing, regardless of route matching.
- HTTPS redirects use `Context#Scheme()`. Behind a proxy, configure the scheme extractor and trusted proxy ranges (see Request Scheme and Trusted Proxies) so Echo can recognize HTTPS. A public proxy address that has not been trusted can cause a redirect loop (v5.4.0).
- Since v5.4.0, the trailing slash middlewares and the static directory redirect percent-encode control characters in the redirect path (GHSA-v753-g4cw-jm48).

## Related

- [trailing-slash](./util-trailing-slash.md)
- [rewrite](./util-rewrite.md)

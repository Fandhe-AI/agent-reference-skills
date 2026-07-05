# Redirect

Built-in functions for HTTP → HTTPS and www ↔ non-www domain redirects.

## Signature / Usage

```go
import "github.com/labstack/echo/v5/middleware"

e.Pre(middleware.HTTPSRedirect())

// Custom configuration
e.Use(middleware.HTTPSRedirectWithConfig(middleware.RedirectConfig{
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

## Related

- [trailing-slash](./util-trailing-slash.md)
- [rewrite](./util-rewrite.md)

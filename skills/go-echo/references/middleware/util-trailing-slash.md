# AddTrailingSlash / RemoveTrailingSlash

Normalizes request URIs by adding or removing a trailing slash, before routing.

## Signature / Usage

```go
import "github.com/labstack/echo/v5/middleware"

e.Pre(middleware.AddTrailingSlash())
// or
e.Pre(middleware.RemoveTrailingSlash())

// Custom configuration with redirect — register with Pre() so it runs before routing
e.Pre(middleware.AddTrailingSlashWithConfig(middleware.AddTrailingSlashConfig{
  RedirectCode: http.StatusMovedPermanently,
}))
```

## Options / Props

| Name | Type | Description | Default |
|------|------|--------------|---------|
| `Skipper` | `Skipper` | Conditionally bypass middleware | `DefaultSkipper` |
| `RedirectCode` | `int` | HTTP status for redirect (300-308 range); when omitted, no redirect occurs and the URI is simply modified internally | — (optional) |

## Notes

- Both middlewares are registered via `Echo#Pre()`, applying before routing.

## Related

- [rewrite](./util-rewrite.md)
- [redirect](./util-redirect.md)
- [method-override](./util-method-override.md)

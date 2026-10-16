# MethodOverride

Intercepts requests and substitutes the HTTP method based on an overridden value. Only `POST` may be overridden.

## Signature / Usage

```go
import "github.com/labstack/echo/v5/middleware"

e.Pre(middleware.MethodOverride())

// Custom configuration, reading override from form data
e.Pre(middleware.MethodOverrideWithConfig(middleware.MethodOverrideConfig{
  Getter: middleware.MethodFromForm("_method"),
}))
```

## Options / Props

| Name | Type | Description | Default |
|------|------|--------------|---------|
| `Skipper` | `Skipper` | Function determining when to bypass middleware | `DefaultSkipper` |
| `Getter` | `MethodOverrideGetter` | Function extracting the overridden method from the request | `MethodFromHeader(echo.HeaderXHTTPMethodOverride)` |

Method sources: `MethodFromHeader`, `MethodFromForm`, `MethodFromQuery`.

## Notes

- Only `POST` requests may be overridden, for security. Since v5.4.0, a `POST` cannot be overridden to `GET`, `HEAD`, `OPTIONS`, `TRACE`, or `CONNECT`; the request remains `POST` if one of those methods is requested.
- Register via `Echo#Pre()` so the overridden method is visible to the router. Register it before routing and the CSRF middleware, so a form or query `_method` value cannot bypass a CSRF check (GHSA-r7w9-592q-9vg4).

## Related

- [trailing-slash](./util-trailing-slash.md)
- [rewrite](./util-rewrite.md)

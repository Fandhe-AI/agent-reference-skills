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

- Only `POST` requests may be overridden, for security.
- Register via `Echo#Pre()` so the overridden method is visible to the router.

## Related

- [trailing-slash](./util-trailing-slash.md)
- [rewrite](./util-rewrite.md)

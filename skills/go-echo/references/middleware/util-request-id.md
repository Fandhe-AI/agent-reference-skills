# RequestID

Generates (or forwards) a unique identifier for each request, useful for tracing and correlating logs.

## Signature / Usage

```go
import "github.com/labstack/echo/v5/middleware"

e.Use(middleware.RequestID())

e.GET("/", func(c *echo.Context) error {
  return c.String(http.StatusOK, c.Response().Header().Get(echo.HeaderXRequestID))
})

// Custom configuration
e.Use(middleware.RequestIDWithConfig(middleware.RequestIDConfig{
  Generator: func() string {
    return customGenerator()
  },
}))
```

## Options / Props

| Name | Type | Description | Default |
|------|------|--------------|---------|
| `Skipper` | `Skipper` | Function to skip middleware execution | `DefaultSkipper` |
| `Generator` | `func() string` | Creates a unique ID per request | Random 32-char string |
| `RequestIDHandler` | `func(c *echo.Context, requestID string)` | Executes custom logic with the generated/forwarded ID | — |
| `TargetHeader` | `string` | HTTP header name used for the ID | `"X-Request-Id"` |

## Notes

- Accepts a pre-defined ID from an incoming `X-Request-ID` header instead of always generating a new one.
- Commonly paired with `RequestLogger`/`Logger` for correlated tracing.

## Related

- [logger](./util-logger.md)
- [middleware-overview](./middleware-overview.md)

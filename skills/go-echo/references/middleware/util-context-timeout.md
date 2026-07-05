# ContextTimeout

Enforces a deadline on request context processing so context-aware code can return early. Replaces the deprecated, data-race-prone `Timeout` middleware.

## Signature / Usage

```go
import "github.com/labstack/echo/v5/middleware"

e.Use(middleware.ContextTimeout(60 * time.Second))

// Custom configuration
e.Use(middleware.ContextTimeoutWithConfig(middleware.ContextTimeoutConfig{
  Timeout: 60 * time.Second,
}))
```

## Options / Props

| Name | Type | Description | Default |
|------|------|--------------|---------|
| `Skipper` | `Skipper` | Function determining which requests bypass the middleware | `DefaultSkipper` |
| `ErrorHandler` | `func(c *echo.Context, err error) error` | Callback invoked when the middleware encounters an error | — |
| `Timeout` | `time.Duration` | Required duration for request deadline enforcement | — (required) |

## Notes

- Returns `503 Service Unavailable` to the client when the underlying handler returns `context.DeadlineExceeded`.
- The legacy `Timeout` middleware is deprecated due to data races from response writer manipulation; prefer `ContextTimeout`.

## Related

- [rate-limiter](./util-rate-limiter.md)
- [body-limit](./util-body-limit.md)

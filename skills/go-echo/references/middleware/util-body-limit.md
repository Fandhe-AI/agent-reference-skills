# BodyLimit

Restricts the maximum size of incoming request bodies, responding `413 Request Entity Too Large` when exceeded.

## Signature / Usage

```go
import "github.com/labstack/echo/v5/middleware"

e.Use(middleware.BodyLimit("2M"))

// Custom configuration
e.Use(middleware.BodyLimitWithConfig(middleware.BodyLimitConfig{
  LimitBytes: 2_097_152,
}))
```

## Options / Props

| Name | Type | Description | Default |
|------|------|--------------|---------|
| `Skipper` | `Skipper` | Determines which requests bypass the middleware | `DefaultSkipper` |
| `LimitBytes` | `int64` | Maximum request body size in bytes (required) | — |

## Notes

- Enforcement checks both the `Content-Length` header and actual streamed content, preventing bypass via spoofed headers.
- Commonly used to prevent resource exhaustion from oversized uploads.

## Related

- [context-timeout](./util-context-timeout.md)
- [body-dump](./util-body-dump.md)

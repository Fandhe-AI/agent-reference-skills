# BodyDump

Captures request and response payloads for debugging or logging purposes.

## Signature / Usage

```go
import "github.com/labstack/echo/v5/middleware"

e.Use(middleware.BodyDump(func(c *echo.Context, reqBody, resBody []byte, err error) {
  // handle request/response bodies
}))
```

## Options / Props

| Name | Type | Description | Default |
|------|------|--------------|---------|
| `Skipper` | `Skipper` | Function to skip middleware execution | `DefaultSkipper` |
| `Handler` | `BodyDumpHandler` | Receives payloads and handler errors (required) | — |
| `MaxRequestBytes` | `int64` | Request body dump limit; truncates if exceeded | `5MB` |
| `MaxResponseBytes` | `int64` | Response body dump limit; truncates if exceeded | `5MB` |

`BodyDumpHandler` signature:

```go
type BodyDumpHandler func(c *echo.Context, reqBody []byte, resBody []byte, err error)
```

## Notes

- Avoid `BodyDump` for large payloads such as file uploads/downloads.
- Set byte limits to `-1` to disable truncation (not recommended); use `Skipper` to exclude large-file routes instead.

## Related

- [body-limit](./util-body-limit.md)
- [logger](./util-logger.md)

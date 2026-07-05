# RequestLogger

Logs HTTP request information with full customization, integrating with third-party structured logging libraries (slog, Zerolog, Zap, Logrus) via a mandatory callback.

## Signature / Usage

```go
import "github.com/labstack/echo/v5/middleware"

e.Use(middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
  LogStatus: true,
  LogURI:    true,
  LogValuesFunc: func(c *echo.Context, v middleware.RequestLoggerValues) error {
    fmt.Printf("URI: %v, Status: %v\n", v.URI, v.Status)
    return nil
  },
}))
```

## Options / Props

| Name | Type | Description | Default |
|------|------|--------------|---------|
| `LogValuesFunc` | function | Mandatory callback receiving extracted request/response values | — (panics if omitted) |
| `LogStatus` | `bool` | Enable response status code extraction | `false` |
| `LogURI` | `bool` | Enable request URI extraction (with query params) | `false` |
| `LogMethod` | `bool` | Enable HTTP method extraction | `false` |
| `LogLatency` | `bool` | Enable handler chain duration tracking | `false` |
| `LogRemoteIP` | `bool` | Enable client IP extraction | `false` |
| `LogError` | `bool` | Enable error extraction from the handler chain | `false` |
| `LogHeaders` | `[]string` | Specific request headers to extract | — |
| `LogQueryParams` | `[]string` | Query parameters to extract | — |
| `HandleError` | `bool` | Forward errors to the global error handler | `false` |

## Notes

- `LogValuesFunc` is mandatory; omitting it causes a panic.
- Values are only populated when their corresponding flag (`LogStatus`, `LogURI`, ...) is enabled.
- `HandleError: true` commits the response, preventing status code modification by upstream middleware.
- Import path: `github.com/labstack/echo/v5/middleware`.

## Related

- [request-id](./util-request-id.md)
- [body-dump](./util-body-dump.md)

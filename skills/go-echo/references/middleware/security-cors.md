# CORS

Implements the CORS specification, giving web servers cross-domain access controls for secure cross-origin requests.

## Signature / Usage

```go
import "github.com/labstack/echo/v5/middleware"

// Basic usage
e.Use(middleware.CORS("https://example.com", "https://subdomain.example.com"))

// Custom configuration
e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
  AllowOrigins: []string{"https://labstack.com", "https://labstack.net"},
  AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
}))
```

## Options / Props

| Name | Type | Description | Default |
|------|------|--------------|---------|
| `Skipper` | `Skipper` | Function to skip middleware | `DefaultSkipper` |
| `AllowOrigins` | `[]string` | Permitted origins (`scheme://host[:port]`), required | — |
| `UnsafeAllowOriginFunc` | function | Custom origin validation function | — |
| `AllowMethods` | `[]string` | Permitted HTTP methods | `GET, HEAD, PUT, PATCH, POST, DELETE` |
| `AllowHeaders` | `[]string` | Headers clients can send | Empty list |
| `AllowCredentials` | `bool` | Allow credentials in requests | `false` |
| `ExposeHeaders` | `[]string` | Headers clients can access | Empty list |
| `MaxAge` | `int` | Preflight cache duration (seconds) | `0` (not sent) |

## Notes

- Combining wildcard origin (`"*"`) with `AllowCredentials: true` is a vulnerability: it would reflect any request's `Origin` back in `Access-Control-Allow-Origin`, allowing credentialed cross-origin requests from any site. Echo prevents this configuration by panicking/erroring.
- For dynamic origin validation use `UnsafeAllowOriginFunc` and validate carefully, since attackers may register deceptive domain names.

## Related

- [csrf](./security-csrf.md)
- [secure](./security-secure.md)

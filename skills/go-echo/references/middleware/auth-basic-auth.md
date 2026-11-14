# BasicAuth

HTTP Basic Authentication middleware. Valid credentials call the next handler; missing or invalid credentials return `401 Unauthorized`.

## Signature / Usage

```go
import "github.com/labstack/echo/v5/middleware"

e.Use(middleware.BasicAuth(func(c *echo.Context, username, password string) (bool, error) {
  if subtle.ConstantTimeCompare([]byte(username), []byte("joe")) == 1 &&
    subtle.ConstantTimeCompare([]byte(password), []byte("secret")) == 1 {
    return true, nil
  }
  return false, nil
}))
```

## Options / Props

| Name | Type | Description | Default |
|------|------|--------------|---------|
| `Skipper` | `Skipper` | Function to skip middleware execution | `DefaultSkipper` |
| `Validator` | `BasicAuthValidator` | Validates credentials; called for each header until a valid result (required) | — |
| `Realm` | `string` | `WWW-Authenticate` header realm attribute | `"Restricted"` |
| `AllowedCheckLimit` | `uint` | Maximum headers to check; useful behind corporate proxies sending multiple `Authorization` headers | `1` |

`BasicAuthValidator` signature:

```go
type BasicAuthValidator func(c *echo.Context, user string, password string) (bool, error)
```

## Notes

- Always compare credentials with `subtle.ConstantTimeCompare` to prevent timing attacks.
- Import path: `github.com/labstack/echo/v5/middleware`.
- Since v5.4.2, the case-insensitive `Basic` scheme must be followed by a space; malformed schemes such as `BasicX` no longer reach credential validation or consume `AllowedCheckLimit`. Source: https://github.com/labstack/echo/releases/tag/v5.4.2 (fetched 2026-11-14).

## Related

- [key-auth](./auth-key-auth.md)
- [jwt](./auth-jwt.md)
- [middleware-overview](./middleware-overview.md)

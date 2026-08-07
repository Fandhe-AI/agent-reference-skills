# Casbin Auth

Authorization middleware built on Casbin, "a powerful, efficient open-source access control library" supporting ACL, RBAC, ABAC, and RESTful models. It enforces access control and is designed to be paired with a separate authentication middleware (e.g. JWT, Basic Auth).

## Signature / Usage

```go
import "github.com/casbin/casbin/v3"

func NewCasbinMiddleware(enforcer *casbin.Enforcer,
    userGetter func(*echo.Context) (string, error)) echo.MiddlewareFunc {
  return func(next echo.HandlerFunc) echo.HandlerFunc {
    return func(c *echo.Context) error {
      username, err := userGetter(c)
      if err != nil {
        return echo.ErrUnauthorized.Wrap(err)
      }
      if pass, err := enforcer.Enforce(username, c.Request().URL.Path,
          c.Request().Method); err != nil {
        return echo.ErrInternalServerError.Wrap(err)
      } else if !pass {
        return echo.NewHTTPError(http.StatusForbidden, "access denied")
      }
      return next(c)
    }
  }
}
```

## Notes

- Not a built-in Echo middleware; requires `go get github.com/casbin/casbin/v3` and an application-defined `NewCasbinMiddleware` wrapper as shown above.
- Requires an `auth_model.conf` (access control model) and `auth_policy.csv` (policies/role assignments) configuration pair.
- `userGetter` extracts the authenticated user identity from the context for the enforcement check; authentication itself is handled by another middleware.
- Supports domain/tenant isolation, resource roles, and deny-override logic; see [Casbin documentation](https://casbin.org/docs/) for advanced configuration.

## Related

- [basic-auth](./auth-basic-auth.md)
- [jwt](./auth-jwt.md)
- [key-auth](./auth-key-auth.md)

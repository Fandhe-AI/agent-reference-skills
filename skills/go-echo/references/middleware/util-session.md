# Session

HTTP session management built on `gorilla/sessions`, supporting cookie- and filesystem-based session stores.

## Signature / Usage

```go
import "github.com/gorilla/sessions"

func NewSessionMiddleware(store sessions.Store) echo.MiddlewareFunc {
  return func(next echo.HandlerFunc) echo.HandlerFunc {
    return func(c *echo.Context) error {
      c.Set("_session_store", store)
      return next(c)
    }
  }
}

func GetSession(c *echo.Context, name string) (*sessions.Session, error) {
  store, err := echo.ContextGet[sessions.Store](c, "_session_store")
  if err != nil {
    return nil, err
  }
  return store.Get(c.Request(), name)
}

sessionStore := sessions.NewCookieStore([]byte("secret"))
e.Use(NewSessionMiddleware(sessionStore))
```

## Notes

- Requires `go get github.com/gorilla/sessions`; not part of Echo's own middleware package.
- Cookie-based sessions are encrypted and validated by `gorilla/sessions`.
- Community-maintained store implementations exist for other backends (Redis, filesystem, etc.) beyond the built-in cookie store.

## Related

- [basic-auth](./auth-basic-auth.md)
- [jwt](./auth-jwt.md)

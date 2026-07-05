# Middleware Registration Overview

How Echo registers and scopes middleware: `Pre()` vs `Use()`, group-level, route-level, and the `Skipper` pattern shared by nearly all built-in middleware.

## Signature / Usage

```go
e := echo.New()

// Root level, before the router (URL rewriting/normalization only)
e.Pre(middleware.RemoveTrailingSlash())

// Root level, after the router — runs for every matched route
e.Use(middleware.Logger())
e.Use(middleware.Recover())

// Group level — applies to all routes under the group, inherits parent middleware
admin := e.Group("/admin", middleware.BasicAuth(authFn))
admin.Use(middleware.Gzip()) // can also be added after group creation

// Route level — applies to a single route only
e.GET("/users/:id", getUser, middleware.RateLimiter(store))
```

## Options / Props

| Concept | Description |
|---------|-------------|
| `Echo#Pre(m ...MiddlewareFunc)` | Registers root-level middleware that runs **before** routing. Used for URL rewriting/normalization (e.g. `Rewrite`, `AddTrailingSlash`, `RemoveTrailingSlash`, `MethodOverride`, `HTTPSRedirect`) since the router has not yet matched a route. |
| `Echo#Use(m ...MiddlewareFunc)` | Registers root-level middleware that runs **after** routing, for every request that reaches a matched (or 404) route. Most middleware (auth, logging, compression, recovery) is registered this way. |
| `Group(prefix string, m ...MiddlewareFunc)` | Creates a sub-router sharing a path prefix. A group inherits all parent middleware and can add its own via the constructor or `Group.Use(m ...MiddlewareFunc)`. |
| Route-level middleware | Passed as trailing arguments to route registration methods (`e.GET`, `e.POST`, ...); applies only to that single route. |
| `Skipper` | `func(c *echo.Context) bool` — shared by almost all built-in middleware configs. Returning `true` skips the middleware for that request. Default is `DefaultSkipper`, which never skips. Used to exclude paths such as health checks or metrics endpoints from a middleware. |

## Notes

- Middleware that needs to act before the router has matched a route (path rewriting, trailing-slash normalization, method override, scheme/host redirects) must use `Pre()`; using `Use()` for these has no effect on routing decisions.
- Execution order follows registration order: root `Use()` middleware runs first, then group middleware, then route-level middleware, then the handler.
- Most `XxxWithConfig` variants expose a `Skipper` field as the first configurable option, allowing per-request opt-out without wrapping the middleware manually.

## Related

- [basic-auth](./auth-basic-auth.md)
- [trailing-slash](./util-trailing-slash.md)
- [rewrite](./util-rewrite.md)
- [method-override](./util-method-override.md)

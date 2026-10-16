# Route Registration

Echo's optimized router matches request URLs to handlers using a radix tree with zero dynamic memory allocation and smart route prioritization. Routes are registered using HTTP-method helpers on the `Echo` instance (or a `Group`), each taking a path pattern and a `HandlerFunc`, with optional route-level middleware.

## Signature / Usage

```go
func (e *Echo) GET(path string, h HandlerFunc, m ...MiddlewareFunc) RouteInfo
func (e *Echo) POST(path string, h HandlerFunc, m ...MiddlewareFunc) RouteInfo
func (e *Echo) PUT(path string, h HandlerFunc, m ...MiddlewareFunc) RouteInfo
func (e *Echo) DELETE(path string, h HandlerFunc, m ...MiddlewareFunc) RouteInfo
func (e *Echo) PATCH(path string, h HandlerFunc, m ...MiddlewareFunc) RouteInfo
func (e *Echo) HEAD(path string, h HandlerFunc, m ...MiddlewareFunc) RouteInfo
func (e *Echo) OPTIONS(path string, h HandlerFunc, m ...MiddlewareFunc) RouteInfo
func (e *Echo) QUERY(path string, h HandlerFunc, m ...MiddlewareFunc) RouteInfo // v5.3.0, RFC 10008
func (e *Echo) Add(method, path string, h HandlerFunc, m ...MiddlewareFunc) RouteInfo
```

```go
e := echo.New()

e.GET("/users/:id", getUser)      // named parameter
e.POST("/users", createUser)
e.PUT("/users/:id", updateUser)
e.DELETE("/users/:id", deleteUser)
e.GET("/static/*", serveFiles)    // wildcard

func getUser(c *echo.Context) error {
	id := c.Param("id")
	return c.String(http.StatusOK, id)
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| path | string | Path pattern to register (may contain `:param` or `*` segments) |
| h | HandlerFunc | Handler with signature `func(c *echo.Context) error` |
| m | ...MiddlewareFunc | Optional route-level middleware, applied only to this route |
| method | string | HTTP method, used with the generic `Add` |

## Notes

- All method helpers ultimately call `Add`, which is also available directly for registering a custom/uncommon method.
- Each registration method returns a `RouteInfo` value describing the registered route (method, path, name); use it for [named routes and reverse routing](./named-routes-reverse.md).
- `Group` exposes the same set of method helpers, scoped to the group's prefix and middleware (including `Group.QUERY`). See [Groups](./groups.md).
- v5.3.0: `QUERY` is the RFC 10008 method, a safe, idempotent request method carrying request content (a query) in its body. It is not part of the `net/http` standard library, so Echo defines the constant `echo.QUERY`. The CHANGELOG example is `e.QUERY("/", func(c *Context) error { return c.String(http.StatusTeapot, "OK") })`.
- v5.3.0: `RouterConfig.AutoHandleHEAD` lets GET handlers answer HEAD requests (the response body is suppressed; headers are preserved as for GET). Disabled by default; opt in with `echo.NewWithConfig(echo.Config{Router: echo.NewRouter(echo.RouterConfig{AutoHandleHEAD: true})})`. Caveat from the doc comment: the GET handler is fully executed for every HEAD request, including side effects (state-mutating operations run, rate-limiting middleware consumes quota, expensive computations run), and all GET routes become enumerable via HEAD probing (200 = route exists, 405 = route absent). If route confidentiality or state mutation is a concern, leave it disabled and register explicit HEAD handlers only for routes that are safe to expose.
- `QUERY` and `AutoHandleHEAD` are not documented on the docs site; signatures and wording come from echo.go, router.go and CHANGELOG.md at v5.4.0.

## Related

- [HTTP Method Registration (Any / Match)](./any-match.md)
- [Path Parameters](./path-parameters.md)
- [Groups](./groups.md)
- [Named Routes / Reverse Routing](./named-routes-reverse.md)

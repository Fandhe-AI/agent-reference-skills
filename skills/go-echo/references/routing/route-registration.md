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
- `Group` exposes the same set of method helpers, scoped to the group's prefix and middleware. See [Groups](./groups.md).

## Related

- [HTTP Method Registration (Any / Match)](./any-match.md)
- [Path Parameters](./path-parameters.md)
- [Groups](./groups.md)
- [Named Routes / Reverse Routing](./named-routes-reverse.md)

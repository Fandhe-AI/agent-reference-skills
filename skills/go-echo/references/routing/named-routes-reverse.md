# Named Routes / Reverse Routing

Routes can be given a `Name` so a URL can later be regenerated from the name and its path-parameter values, instead of hard-coding paths throughout the application (e.g. in templates).

## Signature / Usage

```go
type Route struct {
	Method      string
	Path        string
	Name        string
	Handler     HandlerFunc
	Middlewares []MiddlewareFunc
}

func (e *Echo) AddRoute(route Route) (RouteInfo, error)

type RouteInfo struct {
	Method string
	Path   string
	Name   string
	// ...
}
func (r RouteInfo) Reverse(pathValues ...any) string
func (r RouteInfo) Clone() RouteInfo

type Routes []RouteInfo
func (r Routes) Reverse(routeName string, pathValues ...any) (string, error)

func (r *DefaultRouter) Routes() Routes
```

```go
e := echo.New()

info, err := e.AddRoute(echo.Route{
	Method: http.MethodGet,
	Path:   "/users/:id",
	Name:   "user_details",
	Handler: func(c *echo.Context) error {
		return c.String(http.StatusOK, fmt.Sprintf("User ID: %s", c.Param("id")))
	},
})

// later, from anywhere with access to the router's Routes():
url, err := e.Router().Routes().Reverse("user_details", 123) // "/users/123"

// or directly on a RouteInfo held from registration:
url = info.Reverse(123) // "/users/123"
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Method | string | HTTP method of the route |
| Path | string | Path pattern of the route |
| Name | string | Route name used for reverse lookup; defaults to `"Method:Path"` when empty |
| Handler | HandlerFunc | Route handler |
| Middlewares | []MiddlewareFunc | Middleware attached to the route |
| pathValues | ...any | Values substituted, in order, for the route's path parameters |
| routeName | string | Name to look up in a `Routes` collection |

## Notes

- In Echo v5, `Echo.Reverse()`, `Echo.URI()`, `Echo.URL()`, and `Echo.Host()` were removed; use `router.Routes().Reverse(name, ...)` or a held `RouteInfo.Reverse(...)` instead.
- `Context.RouteInfo()` returns the `RouteInfo` for the currently matched request, useful for logging/metrics or for generating URLs from within templates (e.g. assigning `c.RouteInfo().Reverse` to a template variable so `{{ call $x "foobar" }}` builds a URL).
- `Routes.Reverse` also supports filtering helpers on `Routes` such as `FilterByMethod()`, `FilterByPath()`, and `FindByMethodPath()` for locating routes.

## Related

- [Route Registration](./route-registration.md)
- [Templates](../response/templates.md)

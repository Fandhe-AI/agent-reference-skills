# Any / Match

`Any` registers a handler for all supported HTTP methods on a path; `Match` registers a handler for a specific set of methods on a path.

## Signature / Usage

```go
func (e *Echo) Any(path string, handler HandlerFunc, middleware ...MiddlewareFunc) RouteInfo
func (e *Echo) Match(methods []string, path string, handler HandlerFunc, middleware ...MiddlewareFunc) Routes
```

```go
e.Any("/ping", pong)
e.Match([]string{http.MethodGet, http.MethodPost}, "/form", handleForm)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| path | string | Path pattern to register |
| handler | HandlerFunc | Handler with signature `func(c *echo.Context) error` |
| methods | []string | HTTP methods the handler should be registered for (`Match` only) |
| middleware | ...MiddlewareFunc | Optional route-level middleware |

## Notes

- `Any` returns a single `RouteInfo`; `Match` returns a `Routes` collection (`[]RouteInfo`), one entry per method.
- Both are also available on `Group` for scoped registration.

## Related

- [Route Registration](./route-registration.md)
- [Groups](./groups.md)

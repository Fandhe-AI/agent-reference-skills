# Path Parameters

Named path segments (`:name`) and the trailing wildcard segment (`*`) are read from the request context inside a handler.

## Signature / Usage

```go
func (c *Context) Param(name string) string
func (c *Context) ParamOr(name, defaultValue string) string
func (c *Context) PathValues() PathValues
```

```go
e.GET("/users/:id", func(c *echo.Context) error {
	id := c.Param("id")
	return c.String(http.StatusOK, id)
})

e.GET("/files/*", func(c *echo.Context) error {
	return c.String(http.StatusOK, c.Param("*"))
})
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| name | string | Path parameter name as declared in the route pattern (e.g. `"id"` for `:id`), or `"*"` for the wildcard segment |
| defaultValue | string | Value returned by `ParamOr` when the parameter is absent |

## Notes

- `Param` returns an empty string if the named parameter does not exist on the matched route.
- `ParamOr` provides a default value fallback when the parameter is absent.
- `PathValues()` returns all path parameters for the matched route as a structured collection, replacing the older `ParamNames()`/`ParamValues()` pair.
- The wildcard segment (`*`) captures the remainder of the path and is retrieved with `c.Param("*")`.

## Related

- [Match Types](./match-types.md)
- [Query Parameters](./query-parameters.md)

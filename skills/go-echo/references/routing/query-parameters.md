# Query Parameters

Query string values are read from the request context, either individually, as the raw query string, or with typed/bound extraction via `QueryParamsBinder`.

## Signature / Usage

```go
func (c *Context) QueryParam(name string) string
func (c *Context) QueryParamOr(name, defaultValue string) string
func (c *Context) QueryParams() url.Values
func (c *Context) QueryString() string
func QueryParamsBinder(c *Context) *ValueBinder
```

```go
e.GET("/search", func(c *echo.Context) error {
	q := c.QueryParam("q")
	return c.String(http.StatusOK, "Search Query: "+q)
})

// /filter?category=books&category=movies
e.GET("/filter", func(c *echo.Context) error {
	categories := c.QueryParams()["category"] // ["books", "movies"]
	return c.JSON(http.StatusOK, categories)
})
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| name | string | Query parameter key |
| defaultValue | string | Value returned by `QueryParamOr` when the parameter is absent |

## Notes

- `QueryParam` returns only the first value for a repeated key; use `QueryParams()` to get all values as `url.Values`.
- `QueryString()` returns the raw, unparsed query string.
- `QueryParamsBinder(c)` provides fluent, typed binding (e.g. `.Int64("length", &length)`) ending in `BindError()` (first error) or `BindErrors()` (all errors); see [Fluent Binder](../request-binding/fluent-binder.md).

## Related

- [Path Parameters](./path-parameters.md)
- [Fluent Binder](../request-binding/fluent-binder.md)

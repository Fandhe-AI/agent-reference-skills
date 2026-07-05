# JSONP

Encodes a Go value as JSON and wraps it in a callback function name for JSONP responses.

## Signature / Usage

```go
Context#JSONP(code int, callback string, i any) error
```

```go
func handler(c *echo.Context) error {
	callback := c.QueryParam("callback")
	return c.JSONP(http.StatusOK, callback, &User{Name: "Jon", Email: "[email protected]"})
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| code | int | HTTP status code to send |
| callback | string | Name of the JSONP callback function, typically read from a query parameter |
| i | any | Value to marshal as JSON |

## Related

- [JSON](./json.md)

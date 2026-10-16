# JSONP

Encodes a Go value as JSON and wraps it in a callback function name for JSONP responses.

## Signature / Usage

```go
Context#JSONP(code int, callback string, i any) error
Context#JSONPBlob(code int, callback string, b []byte) error
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
| i | any | Value to marshal as JSON (`JSONP`) |
| b | []byte | Pre-encoded JSON payload (`JSONPBlob`) |

## Notes

- Since v5.4.0, the callback must be empty, a JavaScript identifier, or a dot-separated path of identifiers (ASCII letters, digits, `_` and `$` only). Otherwise nothing is written and a 400 Bad Request error wrapping `echo.ErrInvalidJSONPCallback` is returned. `JSONPBlob` validates the callback the same way.
- JSONP responses carry the `X-Content-Type-Options: nosniff` header.
- Any website can load a JSONP response with a `<script>` tag, including the user's cookies. Do not send private or authenticated data via JSONP; use JSON with CORS instead.

## Related

- [JSON](./json.md)

# JSON

Encodes a Go value as JSON and sends it with a status code. `JSONPretty` indents the output; `JSONBlob` sends an already-encoded JSON byte slice as-is.

## Signature / Usage

```go
Context#JSON(code int, i any) error
Context#JSONPretty(code int, i any, indent string) error
Context#JSONBlob(code int, b []byte) error
```

```go
func(c *echo.Context) error {
	u := &User{Name: "Jon", Email: "[email protected]"}
	return c.JSON(http.StatusOK, u)
}
```

```go
// Indented output
return c.JSONPretty(http.StatusOK, u, "  ")
```

```go
// Send a pre-encoded JSON payload as-is
return c.JSONBlob(http.StatusOK, encodedJSON)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| code | int | HTTP status code to send |
| i | any | Value to marshal as JSON (`JSON`, `JSONPretty`) |
| indent | string | Indentation string used for pretty-printing (`JSONPretty`) |
| b | []byte | Pre-encoded JSON bytes sent as-is (`JSONBlob`) |

## Notes

- Streaming JSON directly to the response writer is also supported for large payloads (see "Stream JSON" in the official guide).

## Related

- [XML](./xml.md)
- [JSONP](./jsonp.md)
- [Blob](./blob.md)

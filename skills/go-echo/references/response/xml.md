# XML

Encodes a Go value as XML and sends it with a status code. `XMLPretty` indents the output; `XMLBlob` sends an already-encoded XML byte slice as-is.

## Signature / Usage

```go
Context#XML(code int, i any) error
Context#XMLPretty(code int, i any, indent string) error
Context#XMLBlob(code int, b []byte) error
```

```go
func(c *echo.Context) error {
	u := &User{Name: "Jon", Email: "[email protected]"}
	return c.XML(http.StatusOK, u)
}
```

```go
// Indented output
return c.XMLPretty(http.StatusOK, u, "  ")
```

```go
// Send a pre-encoded XML payload as-is
return c.XMLBlob(http.StatusOK, encodedXML)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| code | int | HTTP status code to send |
| i | any | Value to marshal as XML (`XML`, `XMLPretty`) |
| indent | string | Indentation string used for pretty-printing (`XMLPretty`) |
| b | []byte | Pre-encoded XML bytes sent as-is (`XMLBlob`) |

## Notes

- Streaming XML directly to the response writer is also supported for large payloads (see "Stream XML" in the official guide).

## Related

- [JSON](./json.md)
- [Blob](./blob.md)

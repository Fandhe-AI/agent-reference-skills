# String

Sends a plain text response with a status code.

## Signature / Usage

```go
Context#String(code int, s string) error
```

```go
func(c *echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| code | int | HTTP status code to send, e.g. `http.StatusOK` |
| s | string | Plain text body |

## Related

- [HTML](./html.md)
- [Blob](./blob.md)

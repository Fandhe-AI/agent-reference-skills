# HTML

Sends an HTML response with a status code. `HTMLBlob` sends the same response from a raw `[]byte` instead of a `string`.

## Signature / Usage

```go
Context#HTML(code int, html string) error
Context#HTMLBlob(code int, b []byte) error
```

```go
func(c *echo.Context) error {
	return c.HTML(http.StatusOK, "<strong>Hello, World!</strong>")
}
```

```go
func(c *echo.Context) error {
	blob := []byte("<strong>Hello, World!</strong>")
	return c.HTMLBlob(http.StatusOK, blob)
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| code | int | HTTP status code to send |
| html | string | Raw HTML body (`HTML`) |
| b | []byte | Raw HTML body as bytes (`HTMLBlob`) |

## Notes

- For dynamic HTML built from data, use template rendering instead of building strings manually.

## Related

- [Templates](./templates.md)
- [String](./string.md)

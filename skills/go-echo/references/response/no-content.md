# NoContent

Sends an empty body with a status code.

## Signature / Usage

```go
Context#NoContent(code int) error
```

```go
func(c *echo.Context) error {
	return c.NoContent(http.StatusOK)
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| code | int | HTTP status code to send, e.g. `http.StatusNoContent` |

## Related

- [Redirect](./redirect.md)

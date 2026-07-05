# Response Hooks

`Response#Before` and `Response#After` register callbacks around response writing, useful for logging or finalizing headers.

## Signature / Usage

```go
Response#Before(fn func())
Response#After(fn func())
```

```go
func(c *echo.Context) error {
	c.Response().Before(func() {
		// runs before the response is written
	})
	c.Response().After(func() {
		// runs after the response is written, if Content-Length is known
	})
	return c.String(http.StatusOK, "Hello, World!")
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| fn | func() | Callback invoked before (`Before`) or after (`After`) the response body is written |

## Notes

- `After` only fires when the response `Content-Length` is known ahead of time.

## Related

- [String](./string.md)

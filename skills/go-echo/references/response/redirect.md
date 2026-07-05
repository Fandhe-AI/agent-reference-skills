# Redirect

Redirects the request to the given URL with a status code.

## Signature / Usage

```go
Context#Redirect(code int, url string) error
```

```go
func(c *echo.Context) error {
	return c.Redirect(http.StatusMovedPermanently, "<URL>")
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| code | int | Redirect status code, e.g. `http.StatusMovedPermanently` |
| url | string | Target URL |

## Related

- [NoContent](./no-content.md)

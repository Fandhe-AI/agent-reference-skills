# Cookies

A cookie is a small piece of data a server sends to the browser, which the browser stores and sends back on subsequent requests. Echo uses Go's standard `http.Cookie` type for both writing and reading cookies via `echo.Context`.

## Signature / Usage

```go
func setCookie(c *echo.Context) error {
    cookie := new(http.Cookie)
    cookie.Name = "username"
    cookie.Value = "jon"
    cookie.Expires = time.Now().Add(24 * time.Hour)
    c.SetCookie(cookie)
    return c.String(http.StatusOK, "cookie set")
}

func readCookie(c *echo.Context) error {
    cookie, err := c.Cookie("username")
    if err != nil {
        return err
    }
    return c.String(http.StatusOK, cookie.Value)
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `http.Cookie.Name` | `string` | Cookie name (required) |
| `http.Cookie.Value` | `string` | Cookie value (required) |
| `http.Cookie.Path` | `string` | URL path scope (optional) |
| `http.Cookie.Domain` | `string` | Host scope (optional) |
| `http.Cookie.Expires` | `time.Time` | Expiration time (optional) |
| `http.Cookie.Secure` | `bool` | Send only over HTTPS (optional) |
| `http.Cookie.HttpOnly` | `bool` | Inaccessible to client-side JavaScript (optional) |

## Notes

- Only `Name` and `Value` are required on `http.Cookie`; all other attributes are optional.
- Cookies commonly carry stateful information such as shopping cart contents, authentication tokens, or form data across requests.
- The underlying `Context#Cookie`, `Context#Cookies`, and `Context#SetCookie` method signatures are documented in [Request Data](./request.md).

## Related

- [Request Data](./request.md)
- [Context (core)](./context.md)

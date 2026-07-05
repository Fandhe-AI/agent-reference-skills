# Returning Errors from Handlers

Every `echo.HandlerFunc` returns an `error`. Returning `nil` after a response method (`c.JSON`, `c.String`, ...) signals success; returning a non-nil error (plain or `*echo.HTTPError`) hands control to the `HTTPErrorHandler`, which writes the actual error response.

## Signature / Usage

```go
type HandlerFunc func(c *echo.Context) error
```

```go
func handler(c *echo.Context) error {
	u := new(User)
	if err := c.Bind(u); err != nil {
		return err // propagated to the HTTPErrorHandler
	}
	if !authorized(u) {
		return echo.NewHTTPError(http.StatusUnauthorized, "Please provide valid credentials")
	}
	return c.JSON(http.StatusOK, u)
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `c` | `*echo.Context` | Request-scoped context passed to every handler |
| return value | `error` | `nil` on success; any non-nil error (plain `error` or `*echo.HTTPError`) is passed to `e.HTTPErrorHandler` |

## Notes

- A handler should not both write a response body and return a non-nil error for the same failure path; if a response method itself returns an error (e.g. write failure), returning that error lets the error handler decide what, if anything, more to do.
- Returning a plain `error` (not `*HTTPError`) results in a 500 Internal Server Error from the default handler.
- Prefer `echo.NewHTTPError(code, message)` or a sentinel (`echo.ErrNotFound`, `echo.ErrBadRequest`, ...) over writing status codes manually, so the central `HTTPErrorHandler` stays the single place that decides the response format.

## Related

- [HTTPError](./http-error.md)
- [HTTPErrorHandler](./http-error-handler.md)
- [Error Propagation in Middleware](./error-propagation-in-middleware.md)

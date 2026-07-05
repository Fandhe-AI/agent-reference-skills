# Error Propagation in Middleware

Middleware is a `func(next echo.HandlerFunc) echo.HandlerFunc`. It can short-circuit the chain by returning an error without calling `next(c)`, or call `next(c)` and inspect/wrap the error it returns before propagating it further up the chain to `e.HTTPErrorHandler`.

## Signature / Usage

```go
type MiddlewareFunc func(next echo.HandlerFunc) echo.HandlerFunc
```

```go
e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c *echo.Context) error {
		if !authenticated(c) {
			// invalid credentials -> abort with 401, next(c) is never called
			return echo.NewHTTPError(http.StatusUnauthorized, "Please provide valid credentials")
		}
		return next(c)
	}
})
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `next` | `echo.HandlerFunc` | The next handler/middleware in the chain; calling it invokes downstream processing and returns its error (if any) |
| return value | `error` | Propagated to the caller (an outer middleware, or ultimately `e.HTTPErrorHandler` if this is the outermost link) |

## Notes

- Returning an error before calling `next(c)` aborts the chain early, so downstream handlers/middleware never run.
- Returning the error from `next(c)` unchanged (or wrapped with `errors.Join`/`HTTPError.Wrap`) lets it keep propagating outward until it reaches `e.HTTPErrorHandler`.
- Middleware registered with `e.Use` runs in registration order for the request path and in reverse order on the way back out, so an outer middleware can still observe/modify the error returned by an inner one.
- Because errors, not panics, drive this flow, middleware such as authentication/authorization guards should prefer returning `*echo.HTTPError` (or a sentinel like `echo.ErrUnauthorized`) over writing a response body directly, keeping response formatting centralized in `HTTPErrorHandler`.

## Related

- [Returning Errors from Handlers](./returning-errors-from-handlers.md)
- [HTTPError](./http-error.md)
- [HTTPErrorHandler](./http-error-handler.md)

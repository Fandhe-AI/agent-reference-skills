# HTTPErrorHandler

Echo centralizes error handling: handlers and middleware return an `error`, and a single `HTTPErrorHandler` turns it into the final HTTP response. `DefaultHTTPErrorHandler` provides the built-in JSON behavior; assign `e.HTTPErrorHandler` to fully replace it.

## Signature / Usage

```go
type HTTPErrorHandler func(c *echo.Context, err error)

func DefaultHTTPErrorHandler(exposeError bool) echo.HTTPErrorHandler

e.HTTPErrorHandler = customHTTPErrorHandler
```

```go
func customHTTPErrorHandler(c *echo.Context, err error) {
	if resp, uErr := echo.UnwrapResponse(c.Response()); uErr == nil {
		if resp.Committed {
			return // already sent by a handler/middleware
		}
	}

	code := http.StatusInternalServerError
	var sc echo.HTTPStatusCoder
	if errors.As(err, &sc) {
		if tmp := sc.StatusCode(); tmp != 0 {
			code = tmp
		}
	}

	var cErr error
	if c.Request().Method == http.MethodHead {
		cErr = c.NoContent(code)
	} else {
		cErr = c.File(fmt.Sprintf("%d.html", code)) // e.g. 404.html, 500.html
	}
	if cErr != nil {
		c.Logger().Error("failed to send error page", "error", errors.Join(err, cErr))
	}
}

e.HTTPErrorHandler = customHTTPErrorHandler
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Echo#HTTPErrorHandler` | `func(c *echo.Context, err error)` | Field on the `Echo` instance invoked once per request whenever a handler/middleware returns a non-nil error |
| `exposeError` | `bool` (param of `DefaultHTTPErrorHandler`) | Controls whether internal error details are exposed to clients in the default JSON response |
| `echo.UnwrapResponse(rw http.ResponseWriter)` | `(*echo.Response, error)` | Unwraps the response writer to check `resp.Committed` before writing an error response |
| `echo.HTTPStatusCoder` | `interface{ StatusCode() int }` | Implemented by `*HTTPError`; used with `errors.As` to extract a status code from any error in the chain |

## Notes

- The default error handler responds in JSON with a message field: plain `error` values become 500 responses, `*HTTPError` values use their own `Code`/`Message`.
- Always check whether the response was already committed (`resp.Committed`) before writing another response from the error handler, since a handler or middleware may have partially written a response before returning the error.
- Use the centralized handler as the single place to forward errors to external services (Sentry, Elasticsearch, Splunk) instead of relying solely on logging scattered across handlers.
- Handle `http.MethodHead` requests separately (e.g. `c.NoContent(code)`) since HEAD responses must not include a body.

## Related

- [HTTPError](./http-error.md)
- [Error Propagation in Middleware](./error-propagation-in-middleware.md)
- [Customization](../getting-started/customization.md)

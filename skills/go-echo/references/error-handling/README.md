# error-handling

| Name | Description | Path |
|------|-------------|------|
| Error Propagation in Middleware | Middleware is a `func(next echo.HandlerFunc) echo.HandlerFunc`; it can short-circuit the chain with an error, or inspect and wrap the error returned by `next(c)`. | [error-propagation-in-middleware.md](./error-propagation-in-middleware.md) |
| HTTPErrorHandler | Echo centralizes error handling: a single `HTTPErrorHandler` turns errors returned by handlers and middleware into the final HTTP response. | [http-error-handler.md](./http-error-handler.md) |
| HTTPError | `echo.HTTPError` carries an HTTP status code and optional message/internal error; Echo also ships sentinel `*HTTPError` values for common statuses. | [http-error.md](./http-error.md) |
| Problem Details (RFC 9457) | `ProblemError` models an RFC 9457 problem detail; `ProblemDetailsHTTPErrorHandler` converts errors into `application/problem+json` responses. | [problem-details.md](./problem-details.md) |
| Returning Errors from Handlers | Every `echo.HandlerFunc` returns an `error`; returning `nil` after a response signals success, and a non-nil error is handed to the `HTTPErrorHandler`. | [returning-errors-from-handlers.md](./returning-errors-from-handlers.md) |

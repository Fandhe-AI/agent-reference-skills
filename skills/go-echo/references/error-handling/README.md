# error-handling

| Name | Description | Path |
| --- | --- | --- |
| HTTPError | `echo.HTTPError` struct, `NewHTTPError`, sentinel errors (`ErrNotFound`, ...), `Wrap`/`Unwrap` | [http-error.md](./http-error.md) |
| HTTPErrorHandler | Default and custom `e.HTTPErrorHandler`, `DefaultHTTPErrorHandler`, `UnwrapResponse`, `HTTPStatusCoder` | [http-error-handler.md](./http-error-handler.md) |
| Returning Errors from Handlers | `echo.HandlerFunc` error return contract, when to use `NewHTTPError` vs sentinels | [returning-errors-from-handlers.md](./returning-errors-from-handlers.md) |
| Error Propagation in Middleware | `MiddlewareFunc` short-circuiting, propagating/wrapping errors from `next(c)` | [error-propagation-in-middleware.md](./error-propagation-in-middleware.md) |

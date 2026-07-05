# HTTPError

`echo.HTTPError` carries an HTTP status code (and optional message/internal error) so the central error handler can turn it into a proper HTTP response. `echo.NewHTTPError` constructs one; Echo also ships sentinel `*HTTPError` values (`echo.ErrBadRequest`, `echo.ErrNotFound`, `echo.ErrUnauthorized`, ...) for common statuses.

## Signature / Usage

```go
type HTTPError struct {
	Code     int
	Message  string
	Internal error
}

func NewHTTPError(code int, message string) *HTTPError

func (he *HTTPError) Error() string
func (he *HTTPError) StatusCode() int
func (he *HTTPError) Unwrap() error
func (he HTTPError) Wrap(err error) error
```

```go
// Construct with an explicit message
return echo.NewHTTPError(http.StatusUnauthorized, "Please provide valid credentials")

// Use a sentinel error directly
return echo.ErrNotFound

// Wrap an underlying error while keeping the sentinel's status code
if err := cv.validator.Struct(i); err != nil {
	return echo.ErrBadRequest.Wrap(err)
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Code` | `int` | HTTP status code for the response |
| `Message` | `string` | Message returned to the client; when omitted via `NewHTTPError(code)`, Echo falls back to the standard status text (e.g. "Unauthorized" for 401) |
| `Internal` | `error` | Wrapped underlying error, set via `Wrap`, not exposed to clients by default |

## Notes

- Handlers and middleware may return either a plain `error` (treated as a 500) or an `*echo.HTTPError` (uses its own `Code`/`Message`).
- Sentinel errors provided by Echo: `ErrBadRequest` (400), `ErrUnauthorized` (401), `ErrForbidden` (403), `ErrNotFound` (404), `ErrMethodNotAllowed` (405), `ErrRequestTimeout` (408), `ErrStatusRequestEntityTooLarge` (413), `ErrUnsupportedMediaType` (415), `ErrTooManyRequests` (429), `ErrInternalServerError` (500), `ErrBadGateway` (502), `ErrServiceUnavailable` (503).
- `Wrap(err)` attaches an internal error for logging/diagnostics while the client-facing `Code`/`Message` stay unchanged; `Unwrap()` retrieves it via `errors.As`/`errors.Is`.
- `HTTPStatusCoder` (`interface{ StatusCode() int }`) is implemented by `*HTTPError`, allowing a custom error handler to extract a status code from any error in the chain via `errors.As`.

## Related

- [HTTPErrorHandler](./http-error-handler.md)
- [Returning Errors from Handlers](./returning-errors-from-handlers.md)
- [Validator](../request-binding/validator.md)

# Problem Details (RFC 9457)

`ProblemError` models an RFC 9457 "problem detail" (Problem Details for HTTP APIs), and `ProblemDetailsHTTPErrorHandler` is an `HTTPErrorHandler` that converts every error into an `application/problem+json` response.

## Signature / Usage

```go
type ProblemError struct {
	Type     string `json:"type"`
	Title    string `json:"title"`
	Status   int    `json:"status"`
	Detail   string `json:"detail,omitempty"`
	Instance string `json:"instance,omitempty"`
}

func (pe *ProblemError) Error() string
func (pe *ProblemError) StatusCode() int

type ProblemErrorer interface {
	ProblemError() *ProblemError
}

func ProblemDetailsHTTPErrorHandler(exposeError bool) HTTPErrorHandler
```

```go
e := echo.New()
e.HTTPErrorHandler = echo.ProblemDetailsHTTPErrorHandler(false)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Type` | `string` | URI reference identifying the problem type. Defaults to `"about:blank"` when empty (the problem is the HTTP status code itself) |
| `Title` | `string` | Short, human-readable summary of the problem type. Defaults to the status text of `Status` when empty |
| `Status` | `int` | HTTP status code for this occurrence. Defaults to 500 when zero |
| `Detail` | `string` | Human-readable explanation specific to this occurrence (`omitempty`) |
| `Instance` | `string` | URI reference identifying the specific occurrence (`omitempty`) |
| `exposeError` | `bool` | Param of `ProblemDetailsHTTPErrorHandler`. Decides whether `Detail` contains the underlying error message for errors that are not `*HTTPError` or do not implement `ProblemErrorer` |

## Notes

- Response precedence for a given error: (1) if err or any error it wraps is a `*ProblemError`, it is used as-is; (2) else if it implements `ProblemErrorer`, `ProblemError()` is used; (3) else a `*ProblemError` is built from the `HTTPStatusCoder` status code (default 500). For `*HTTPError`, `Detail` is set to its `Message`, extended with the wrapped error's message when `exposeError` is true. For any other error, `Detail` is populated with `err.Error()` only when `exposeError` is true.
- Zero-value `Type`, `Title` and `Status` default to `"about:blank"`, the status text of `Status`, and 500. Defaults are applied to a copy, so a reused `*ProblemError` (e.g. a package-level sentinel error) is never mutated.
- The `Content-Type` is `echo.MIMEApplicationProblemJSON` (`application/problem+json`).
- `HEAD` requests get `c.NoContent(status)` with no body.
- If the response is already committed, the handler returns without writing.
- The handler does not log errors. Use middleware if errors need to be logged separately.
- `*ProblemError` implements `error` and `HTTPStatusCoder` (`StatusCode()`), so it can be returned directly from handlers.

## Related

- [HTTPErrorHandler](./http-error-handler.md)
- [HTTPError](./http-error.md)
- [Returning Errors from Handlers](./returning-errors-from-handlers.md)

# Context (core)

`echo.Context` (a concrete struct in Echo v5, unlike the interface in Echo v4) represents the current HTTP request. It is passed by pointer (`*echo.Context`) to handlers and middleware, and holds the request/response reference, route path, path parameters, per-request storage, and the read/write API.

## Signature / Usage

```go
func Hello(c *echo.Context) error {
    req := c.Request()
    res := c.Response()
    return c.String(http.StatusOK, req.Method+" "+res.Header().Get("Content-Type"))
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Echo() *Echo` | method | Returns the `*echo.Echo` instance that is handling the request |
| `Request() *http.Request` | method | Returns the underlying `*http.Request` |
| `SetRequest(r *http.Request)` | method | Replaces the request on the context |
| `Response() http.ResponseWriter` | method | Returns the underlying `http.ResponseWriter` |
| `SetResponse(w http.ResponseWriter)` | method | Replaces the response writer; a custom writer must implement `Unwrap() http.ResponseWriter` if middleware (e.g. gzip) needs to unwrap it |
| `Reset(r *http.Request, w http.ResponseWriter)` | method | Resets the context for reuse; called internally when Echo returns a `Context` to its pool |
| `Path() string` / `SetPath(p string)` | method | Gets/sets the matched route path |
| `RouteInfo() RouteInfo` | method | Returns metadata about the matched route |
| `IsTLS() bool` | method | Reports whether the request came in over TLS |
| `IsWebSocket() bool` | method | Reports whether the request is a WebSocket upgrade |
| `Scheme() string` | method | Returns `"http"` or `"https"` for the request |
| `RealIP() string` | method | Returns the client's real IP; requires `Echo#IPExtractor` to be configured explicitly (see Notes) |
| `Logger() *slog.Logger` / `SetLogger(l *slog.Logger)` | method | Gets/sets the structured logger used for this request |

## Notes

- Echo pools `Context` instances: after a request finishes, Echo resets and reuses the struct. Do not retain a `*echo.Context` (or values derived from it) beyond the handler's goroutine/lifetime.
- Only one goroutine should access a given `Context`; some of its methods are not safe to call concurrently.
- `RealIP()` falls back to insecure legacy behavior unless `Echo#IPExtractor` is set explicitly to one of `echo.ExtractIPDirect()`, `echo.ExtractIPFromXFFHeader(...)`, or `echo.ExtractIPFromRealIPHeader(...)`. Always configure the outermost proxy to strip client-supplied `X-Forwarded-For` / `X-Real-IP` headers, otherwise a client can forge its IP.
- In Echo v5, `Context` is a concrete struct rather than the `echo.Context` interface used in Echo v4; the v4 pattern of embedding `echo.Context` in a custom struct to add methods no longer applies. Attach request-scoped custom data via `c.Set()` / `c.Get()` (see [storage.md](./storage.md)) instead.

## Related

- [Per-Request Storage](./storage.md)
- [Request Data](./request.md)
- [Response Helpers](./response.md)
- [Binding & Validation](./binding.md)

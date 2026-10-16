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
| `Scheme() string` | method | Returns the protocol scheme in lowercase: `http` or `https` (or `ws` / `wss` when a trusted proxy reports them). Since v5.4.0, `Echo#SchemeExtractor` decides the result; by default `X-Forwarded-Proto` / `X-Forwarded-Protocol` / `X-Forwarded-Ssl` / `X-Url-Scheme` are trusted only from loopback, link-local or private-network peers and unix sockets. The last `X-Forwarded-Proto` value is used, lowercased; an invalid value gives `http`. See [Request Scheme and Trusted Proxies](../getting-started/request-scheme.md) |
| `RealIP() string` | method | Returns the client's real IP; defaults to the direct peer address (`RemoteAddr`, host portion only) unless `Echo#IPExtractor` is set (see Notes) |
| `Logger() *slog.Logger` / `SetLogger(l *slog.Logger)` | method | Gets/sets the structured logger used for this request |

## Notes

- Echo pools `Context` instances: after a request finishes, Echo resets and reuses the struct. Do not retain a `*echo.Context` (or values derived from it) beyond the handler's goroutine/lifetime.
- Only one goroutine should access a given `Context`; some of its methods are not safe to call concurrently.
- Since v5.1.0, `RealIP()` uses the direct peer address by default and ignores client-supplied IP headers. Set `Echo#IPExtractor` (`echo.ExtractIPFromXFFHeader(...)` or `echo.ExtractIPFromRealIPHeader(...)`) only when a trusted proxy supplies the client IP in a header; the old header-trusting behavior is available as `echo.LegacyIPExtractor()` (spoofable). Always configure the outermost proxy to strip client-supplied `X-Forwarded-For` / `X-Real-IP` headers, otherwise a client can forge its IP. See [IP Address Resolution](../getting-started/ip-address.md).
- In Echo v5, `Context` is a concrete struct rather than the `echo.Context` interface used in Echo v4; the v4 pattern of embedding `echo.Context` in a custom struct to add methods no longer applies. Attach request-scoped custom data via `c.Set()` / `c.Get()` (see [storage.md](./storage.md)) instead.

## Related

- [Per-Request Storage](./storage.md)
- [Request Data](./request.md)
- [Response Helpers](./response.md)
- [Binding & Validation](./binding.md)

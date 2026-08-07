# Context

| Name | Description | Path |
|------|-------------|------|
| Binding & Validation | `c.Bind()` parses request data (path params, query params, headers, and body) into a Go struct. `c.Validate()` runs a registered validator over bound data. Standalone `Bind*` functions bind a single source only. | [binding.md](./binding.md) |
| Context (core) | `echo.Context` (a concrete struct in Echo v5, unlike the interface in Echo v4) represents the current HTTP request. It is passed by pointer (`*echo.Context`) to handlers and middleware, and holds the request/response reference, route path, path parameters, per-request storage, and the read/write API. | [context.md](./context.md) |
| Cookies | A cookie is a small piece of data a server sends to the browser, which the browser stores and sends back on subsequent requests. Echo uses Go's standard `http.Cookie` type for both writing and reading cookies via `echo.Context`. | [cookies.md](./cookies.md) |
| Request Data | Methods and generic helper functions for reading path parameters, query strings, form values, and cookies off the incoming request. | [request.md](./request.md) |
| Response Helpers | Methods on `echo.Context` for writing the HTTP response body in various formats, serving files, redirecting, and rendering templates. | [response.md](./response.md) |
| Per-Request Storage & Custom Context | `Context` provides a simple key/value store scoped to the current request, used to pass data between middleware and handlers, plus a generic accessor for type-safe reads. | [storage.md](./storage.md) |

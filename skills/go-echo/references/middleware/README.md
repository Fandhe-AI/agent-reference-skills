# middleware

| Name | Description | Path |
|------|-------------|------|
| BasicAuth | HTTP Basic Authentication middleware. Valid credentials call the next handler; missing or invalid credentials return `401 Unauthorized`. | [auth-basic-auth.md](./auth-basic-auth.md) |
| Casbin Auth | Authorization middleware built on Casbin (ACL, RBAC, ABAC, and RESTful models), meant to be paired with an authentication middleware. | [auth-casbin.md](./auth-casbin.md) |
| JWT | JSON Web Token authentication middleware, distributed as a separate module (`echo-jwt`) rather than Echo core. | [auth-jwt.md](./auth-jwt.md) |
| KeyAuth | Authenticates requests using an API key extracted from a configurable source (header, query, form, or cookie). | [auth-key-auth.md](./auth-key-auth.md) |
| Middleware Registration Overview | How Echo registers and scopes middleware: `Pre()` vs `Use()`, group-level and route-level registration, and the `Skipper` pattern. | [middleware-overview.md](./middleware-overview.md) |
| OpenTelemetry | Echo OpenTelemetry (`echo-otel`) middleware that instruments HTTP requests with OpenTelemetry; a separate module, not Echo core. | [observability-open-telemetry.md](./observability-open-telemetry.md) |
| Prometheus | Generates Prometheus metrics for HTTP requests (duration, request/response sizes, counts), distributed as a separate module (`echo-prometheus`). | [observability-prometheus.md](./observability-prometheus.md) |
| CORS | Implements the CORS specification, giving web servers cross-domain access controls for secure cross-origin requests. | [security-cors.md](./security-cors.md) |
| CSRF | Cross-Site Request Forgery protection combining `Sec-Fetch-Site` header validation with a traditional token-based fallback. | [security-csrf.md](./security-csrf.md) |
| Secure | Sets common security-related HTTP response headers to protect against XSS, content-type sniffing, clickjacking, and insecure connections. | [security-secure.md](./security-secure.md) |
| BodyDump | Captures request and response payloads for debugging or logging purposes. | [util-body-dump.md](./util-body-dump.md) |
| BodyLimit | Restricts the maximum size of incoming request bodies, responding `413 Request Entity Too Large` when exceeded. | [util-body-limit.md](./util-body-limit.md) |
| ContextTimeout | Enforces a deadline on request context processing so context-aware code can return early; replaces the deprecated `Timeout` middleware. | [util-context-timeout.md](./util-context-timeout.md) |
| Decompress | Automatically decompresses HTTP request bodies when `Content-Encoding: gzip` is set. | [util-decompress.md](./util-decompress.md) |
| Gzip | Compresses the HTTP response body using the gzip compression scheme. | [util-gzip.md](./util-gzip.md) |
| RequestLogger | Logs HTTP request information with full customization, integrating with third-party structured logging libraries (slog, Zerolog, Zap, Logrus) via a callback. | [util-logger.md](./util-logger.md) |
| MethodOverride | Intercepts requests and substitutes the HTTP method based on an overridden value. Only `POST` may be overridden. | [util-method-override.md](./util-method-override.md) |
| Proxy | HTTP/WebSocket reverse-proxy middleware that forwards requests to upstream servers using a configurable load-balancing strategy. | [util-proxy.md](./util-proxy.md) |
| RateLimiter | Restricts the number of requests from an identifier (typically client IP) within a time window, using a pluggable store. | [util-rate-limiter.md](./util-rate-limiter.md) |
| Recover | Catches panics anywhere in the middleware chain, prints the stack trace, and forwards control to the centralized `HTTPErrorHandler`. | [util-recover.md](./util-recover.md) |
| Redirect | Built-in functions for HTTP → HTTPS and www ↔ non-www domain redirects. | [util-redirect.md](./util-redirect.md) |
| RequestID | Generates (or forwards) a unique identifier for each request, useful for tracing and correlating logs. | [util-request-id.md](./util-request-id.md) |
| Rewrite | Rewrites URL paths according to defined rules, for backward compatibility or cleaner routing. Must be registered via `Echo#Pre()` to run before routing. | [util-rewrite.md](./util-rewrite.md) |
| Session | HTTP session management built on `gorilla/sessions`, supporting cookie- and filesystem-based session stores. | [util-session.md](./util-session.md) |
| Static | Serves static files from a configured root directory, with SPA and directory-listing support. | [util-static.md](./util-static.md) |
| AddTrailingSlash / RemoveTrailingSlash | Normalizes request URIs by adding or removing a trailing slash before routing. | [util-trailing-slash.md](./util-trailing-slash.md) |

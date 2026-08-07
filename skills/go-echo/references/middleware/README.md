# Middleware

| Name | Description | Path |
|------|-------------|------|
| AddTrailingSlash / RemoveTrailingSlash | Normalizes request URIs by adding or removing trailing slash, before routing | [util-trailing-slash.md](./util-trailing-slash.md) |
| BasicAuth | HTTP Basic Authentication middleware. Valid credentials call the next handler | [auth-basic-auth.md](./auth-basic-auth.md) |
| BodyDump | Captures request and response payloads for debugging or logging purposes | [util-body-dump.md](./util-body-dump.md) |
| BodyLimit | Restricts the maximum size of incoming request bodies, responding `413` when exceeded | [util-body-limit.md](./util-body-limit.md) |
| Casbin Auth | Authorization middleware built on Casbin access control library supporting ACL, RBAC, ABAC | [auth-casbin.md](./auth-casbin.md) |
| ContextTimeout | Enforces a deadline on request context processing for early return. Replaces deprecated Timeout… | [util-context-timeout.md](./util-context-timeout.md) |
| CORS | Implements the CORS specification for cross-domain access controls on cross-origin requests | [security-cors.md](./security-cors.md) |
| CSRF | Cross-Site Request Forgery protection combining Sec-Fetch-Site header validation with token… | [security-csrf.md](./security-csrf.md) |
| Decompress | Automatically decompresses HTTP request bodies when Content-Encoding: gzip is set | [util-decompress.md](./util-decompress.md) |
| Gzip | Compresses the HTTP response body using the gzip compression scheme | [util-gzip.md](./util-gzip.md) |
| JWT | JSON Web Token authentication middleware, distributed as a separate module (echo-jwt) | [auth-jwt.md](./auth-jwt.md) |
| KeyAuth | Authenticates requests using an API key extracted from header, query, form, or cookie | [auth-key-auth.md](./auth-key-auth.md) |
| MethodOverride | Intercepts requests and substitutes the HTTP method based on an overridden value | [util-method-override.md](./util-method-override.md) |
| Middleware Registration Overview | How Echo registers and scopes middleware: Pre() vs Use(), group-level, route-level, Skipper | [middleware-overview.md](./middleware-overview.md) |
| Prometheus | Generates Prometheus metrics for HTTP requests tracking duration, sizes, request counts… | [observability-prometheus.md](./observability-prometheus.md) |
| Proxy | HTTP/WebSocket reverse-proxy middleware forwarding requests to upstream servers via load… | [util-proxy.md](./util-proxy.md) |
| RateLimiter | Restricts the number of requests from an identifier within a time window using pluggable… | [util-rate-limiter.md](./util-rate-limiter.md) |
| Recover | Catches panics anywhere in the middleware chain, prints stack trace, forwards to error… | [util-recover.md](./util-recover.md) |
| Redirect | Built-in functions for HTTP → HTTPS and www ↔ non-www domain redirects | [util-redirect.md](./util-redirect.md) |
| RequestID | Generates (or forwards) a unique identifier for each request, useful for tracing logs | [util-request-id.md](./util-request-id.md) |
| RequestLogger | Logs HTTP request information with full customization, integrating with structured logging… | [util-logger.md](./util-logger.md) |
| Rewrite | Rewrites URL paths according to defined rules for backward compatibility or cleaner routing | [util-rewrite.md](./util-rewrite.md) |
| Secure | Sets common security-related HTTP response headers against XSS, clickjacking, injection… | [security-secure.md](./security-secure.md) |
| Session | HTTP session management built on gorilla/sessions supporting cookie and filesystem stores | [util-session.md](./util-session.md) |
| Static | Serves static files from configured root directory with SPA and directory-listing support | [util-static.md](./util-static.md) |

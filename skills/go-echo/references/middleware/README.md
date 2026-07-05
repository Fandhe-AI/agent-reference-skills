# middleware

| Name | Description | Path |
|------|-------------|------|
| Middleware Overview | Pre/Use registration, group/route scoping, Skipper pattern | [middleware-overview.md](./middleware-overview.md) |
| BasicAuth | HTTP Basic Authentication | [auth-basic-auth.md](./auth-basic-auth.md) |
| KeyAuth | API key authentication from header/query/form/cookie | [auth-key-auth.md](./auth-key-auth.md) |
| JWT | JSON Web Token authentication (echo-jwt module) | [auth-jwt.md](./auth-jwt.md) |
| CORS | Cross-Origin Resource Sharing controls | [security-cors.md](./security-cors.md) |
| CSRF | Cross-Site Request Forgery protection | [security-csrf.md](./security-csrf.md) |
| Secure | Common security response headers (XSS, HSTS, CSP, ...) | [security-secure.md](./security-secure.md) |
| Gzip | Response compression | [util-gzip.md](./util-gzip.md) |
| Decompress | Request body decompression | [util-decompress.md](./util-decompress.md) |
| Recover | Panic recovery with stack trace | [util-recover.md](./util-recover.md) |
| RequestLogger (Logger) | Customizable structured request logging | [util-logger.md](./util-logger.md) |
| RequestID | Unique per-request ID for tracing | [util-request-id.md](./util-request-id.md) |
| RateLimiter | Request rate limiting per identifier | [util-rate-limiter.md](./util-rate-limiter.md) |
| ContextTimeout | Request context deadline enforcement | [util-context-timeout.md](./util-context-timeout.md) |
| BodyLimit | Maximum request body size enforcement | [util-body-limit.md](./util-body-limit.md) |
| BodyDump | Request/response payload capture for debugging | [util-body-dump.md](./util-body-dump.md) |
| Static | Static file serving with SPA/browse support | [util-static.md](./util-static.md) |
| Proxy | HTTP/WebSocket reverse proxy with load balancing | [util-proxy.md](./util-proxy.md) |
| Rewrite | URL path rewriting before routing | [util-rewrite.md](./util-rewrite.md) |
| Redirect | HTTPS/www redirect helpers | [util-redirect.md](./util-redirect.md) |
| AddTrailingSlash / RemoveTrailingSlash | Trailing slash normalization | [util-trailing-slash.md](./util-trailing-slash.md) |
| MethodOverride | HTTP method override via header/form/query | [util-method-override.md](./util-method-override.md) |
| Session | gorilla/sessions-based session management | [util-session.md](./util-session.md) |

# Middleware (Builtin)

| Name | Description | Path |
|------|-------------|------|
| Basic Auth | HTTP Basic Authentication | [./basic-auth.md](./basic-auth.md) |
| Bearer Auth | Bearer token validation in `Authorization` header | [./bearer-auth.md](./bearer-auth.md) |
| JWT | JSON Web Token verification; stores payload in context | [./jwt.md](./jwt.md) |
| JWK | JWT validation using JSON Web Keys (JWKS endpoint) | [./jwk.md](./jwk.md) |
| CSRF | Cross-Site Request Forgery protection via Origin header | [./csrf.md](./csrf.md) |
| Secure Headers | Sets security-related HTTP response headers | [./secure-headers.md](./secure-headers.md) |
| CORS | Cross-Origin Resource Sharing headers | [./cors.md](./cors.md) |
| ETag | Generates and validates ETag headers for HTTP caching | [./etag.md](./etag.md) |
| Body Limit | Enforces maximum request body size | [./body-limit.md](./body-limit.md) |
| Cache | Caches responses using the Cache API | [./cache.md](./cache.md) |
| Compress | Compresses responses with gzip or deflate | [./compress.md](./compress.md) |
| Pretty JSON | Formats JSON responses with indentation | [./pretty-json.md](./pretty-json.md) |
| Method Override | Overrides HTTP method via form field, header, or query | [./method-override.md](./method-override.md) |
| Request ID | Assigns a unique ID to each request | [./request-id.md](./request-id.md) |
| Timeout | Rejects requests that exceed a specified duration | [./timeout.md](./timeout.md) |
| Timing | Adds `Server-Timing` headers for performance measurement | [./timing.md](./timing.md) |
| Logger | Logs requests and responses to the console | [./logger.md](./logger.md) |
| Language | Detects user's preferred language from request | [./language.md](./language.md) |
| Trailing Slash | Normalizes trailing slashes via redirect | [./trailing-slash.md](./trailing-slash.md) |
| Context Storage | Stores Hono Context in AsyncLocalStorage | [./context-storage.md](./context-storage.md) |
| JSX Renderer | Layout system for JSX-based HTML rendering | [./jsx-renderer.md](./jsx-renderer.md) |
| Combine | Compose middleware with `some`/`every`/`except` logic | [./combine.md](./combine.md) |
| IP Restriction | Restricts access by client IP address or CIDR range | [./ip-restriction.md](./ip-restriction.md) |

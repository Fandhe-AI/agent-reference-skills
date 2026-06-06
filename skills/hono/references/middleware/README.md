# Middleware

| Name | Description | Path |
|------|-------------|------|
| Basic Auth Middleware | Adds HTTP Basic Authentication to routes. | [basic-auth.md](./basic-auth.md) |
| Bearer Auth Middleware | Validates Bearer tokens in the `Authorization` header. | [bearer-auth.md](./bearer-auth.md) |
| Body Limit Middleware | Enforces a maximum request body size. | [body-limit.md](./body-limit.md) |
| Cache Middleware | Caches responses using the Cache API. | [cache.md](./cache.md) |
| Combine Middleware | Utility functions for composing multiple middleware. | [combine.md](./combine.md) |
| Compress Middleware | Compresses response bodies using gzip or deflate. | [compress.md](./compress.md) |
| Context Storage Middleware | Stores the Hono `Context` in `AsyncLocalStorage`. | [context-storage.md](./context-storage.md) |
| CORS Middleware | Handles Cross-Origin Resource Sharing (CORS) headers. | [cors.md](./cors.md) |
| CSRF Protection Middleware | Protects against Cross-Site Request Forgery. | [csrf.md](./csrf.md) |
| ETag Middleware | Generates and validates `ETag` headers. | [etag.md](./etag.md) |
| IP Restriction Middleware | Restricts access based on client IP addresses. | [ip-restriction.md](./ip-restriction.md) |
| JSX Renderer Middleware | Provides a layout system for JSX-based HTML rendering. | [jsx-renderer.md](./jsx-renderer.md) |
| JWT Middleware | Validates JSON Web Tokens from the `Authorization` header. | [jwt.md](./jwt.md) |
| JWK Middleware | Validates JWTs using JSON Web Keys (JWK). | [jwk.md](./jwk.md) |
| Language Middleware | Detects the user's preferred language. | [language.md](./language.md) |
| Logger Middleware | Logs incoming requests and outgoing responses. | [logger.md](./logger.md) |
| Method Override Middleware | Allows overriding the HTTP method of a request. | [method-override.md](./method-override.md) |
| Pretty JSON Middleware | Enables formatted (indented) JSON responses. | [pretty-json.md](./pretty-json.md) |
| Request ID Middleware | Assigns a unique ID to each request. | [request-id.md](./request-id.md) |
| Secure Headers Middleware | Sets security-related HTTP response headers. | [secure-headers.md](./secure-headers.md) |
| Timeout Middleware | Rejects requests that exceed a specified duration. | [timeout.md](./timeout.md) |
| Timing Middleware (Server-Timing) | Adds `Server-Timing` headers to responses. | [timing.md](./timing.md) |
| Trailing Slash Middleware | Redirects requests to normalize trailing slashes. | [trailing-slash.md](./trailing-slash.md) |

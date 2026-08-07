# Middleware

| Name | Description | Path |
|------|-------------|------|
| Basic Auth Middleware | Adds HTTP Basic Authentication to routes. Responds with `401` when credentials are invalid. | [basic-auth.md](./basic-auth.md) |
| Bearer Auth Middleware | Validates Bearer tokens in the `Authorization` header. Responds with `401` for missing/invalid tokens and `400` for malformed headers. | [bearer-auth.md](./bearer-auth.md) |
| Body Limit Middleware | Enforces a maximum request body size. Returns a configurable error response when the limit is exceeded. | [body-limit.md](./body-limit.md) |
| Cache Middleware | Caches responses using the Cache API (available on Cloudflare Workers, Deno, etc.). | [cache.md](./cache.md) |
| Combine Middleware | Utility functions for composing multiple middleware with logical conditions: `some` (OR), `every` (AND), `except` (NOT). | [combine.md](./combine.md) |
| Compress Middleware | Compresses response bodies using gzip or deflate based on the client's `Accept-Encoding` header. | [compress.md](./compress.md) |
| Context Storage Middleware | Stores the Hono `Context` in `AsyncLocalStorage`, enabling access to it outside of request handlers (e.g. in service functions). | [context-storage.md](./context-storage.md) |
| CORS Middleware | Handles Cross-Origin Resource Sharing (CORS) headers. Must be applied before route definitions. | [cors.md](./cors.md) |
| CSRF Protection Middleware | Protects against Cross-Site Request Forgery by validating the `Origin` or `Sec-Fetch-Site` header on unsafe HTTP methods (POST, PUT, DELETE, PATCH). | [csrf.md](./csrf.md) |
| ETag Middleware | Generates and validates `ETag` headers to enable HTTP caching via conditional requests (`If-None-Match`). | [etag.md](./etag.md) |
| IP Restriction Middleware | Restricts access based on client IP addresses using allowlists and denylists. Supports CIDR notation. | [ip-restriction.md](./ip-restriction.md) |
| JSX Renderer Middleware | Provides a layout system for JSX-based HTML rendering. Wraps route responses in a shared layout component. | [jsx-renderer.md](./jsx-renderer.md) |
| JWT Middleware | Validates JSON Web Tokens from the `Authorization` header. Stores the decoded payload in context via `c.get('jwtPayload')`. | [jwt.md](./jwt.md) |
| JWK Middleware | Validates JWTs using JSON Web Keys (JWK). Fetches public keys from a JWKS endpoint or accepts them directly. | [jwk.md](./jwk.md) |
| Language Middleware | Detects the user's preferred language from query parameters, cookies, or the `Accept-Language` header. Stores the result in `c.get('language')`. | [language.md](./language.md) |
| Logger Middleware | Logs incoming requests and outgoing responses to the console, including method, path, status code, and response time. | [logger.md](./logger.md) |
| Method Not Allowed Middleware | Responds with `405 Method Not Allowed` (instead of the default `404`) when a request path is registered but the HTTP method used is not supported. | [method-not-allowed.md](./method-not-allowed.md) |
| Method Override Middleware | Allows overriding the HTTP method of a request via a form field, header, or query parameter. Useful for HTML forms that only support GET and POST. | [method-override.md](./method-override.md) |
| Pretty JSON Middleware | Enables formatted (indented) JSON responses. Activated by the `?pretty` query parameter or forced globally. | [pretty-json.md](./pretty-json.md) |
| Request ID Middleware | Assigns a unique ID to each request, readable via `c.get('requestId')`. Reads from an incoming header if present. | [request-id.md](./request-id.md) |
| Secure Headers Middleware | Sets security-related HTTP response headers with sensible defaults. Modeled after Helmet.js. | [secure-headers.md](./secure-headers.md) |
| Timeout Middleware | Rejects requests that exceed a specified duration. Throws an `HTTPException` (default `504`) on timeout. | [timeout.md](./timeout.md) |
| Timing Middleware (Server-Timing) | Adds `Server-Timing` headers to responses for performance measurement and profiling. | [timing.md](./timing.md) |
| Trailing Slash Middleware | Redirects requests to normalize trailing slashes. Two functions are provided: `appendTrailingSlash` and `trimTrailingSlash`. | [trailing-slash.md](./trailing-slash.md) |

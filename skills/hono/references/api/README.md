# API

| Name | Description | Path |
|------|-------------|------|
| Hono App | App object: routing methods, middleware, error handling, fetch/request entry points | [./hono.md](./hono.md) |
| HonoRequest | Request wrapper: path params, query, headers, body parsers, validation | [./request.md](./request.md) |
| Context | Context object: response helpers (text/json/html/redirect), headers, request-scoped state | [./context.md](./context.md) |
| Routing | Routing patterns: path params, optional params, regexp, wildcards, chaining, grouping | [./routing.md](./routing.md) |
| HTTPException | Typed HTTP error class with status, message, custom Response, and cause | [./exception.md](./exception.md) |
| Presets | hono / hono/quick / hono/tiny — router trade-offs by deployment model | [./presets.md](./presets.md) |

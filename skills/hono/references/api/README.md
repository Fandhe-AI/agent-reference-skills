# API

| Name | Description | Path |
|------|-------------|------|
| Context | The `Context` object (`c`) is passed to every handler and middleware. | [context.md](./context.md) |
| HTTPException | A specialized `Error` subclass for throwing HTTP errors with a status code… | [exception.md](./exception.md) |
| Hono App | The main application class. Provides routing, middleware registration… | [hono.md](./hono.md) |
| HonoRequest | Wrapper around the standard `Request` object, accessible via `c.req`… | [request.md](./request.md) |
| Presets | Hono ships three preset entry points that differ only in the underlying… | [presets.md](./presets.md) |
| Routing | Hono's routing system supports HTTP method matching, path parameters… | [routing.md](./routing.md) |

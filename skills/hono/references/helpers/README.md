# Helpers

| Name | Description | Path |
|------|-------------|------|
| HTML | Tagged template literal for safe HTML rendering; `raw()` for unescaped output | [./html.md](./html.md) |
| CSS | CSS-in-JS via tagged templates with `css`, `cx`, `keyframes`, and `<Style />` | [./css.md](./css.md) |
| Streaming | HTTP streaming responses: raw (`stream`), plain-text (`streamText`), SSE (`streamSSE`) | [./streaming.md](./streaming.md) |
| WebSocket | Upgrade HTTP to WebSocket with unified event handlers across runtimes | [./websocket.md](./websocket.md) |
| Proxy | Forward requests to an upstream origin with automatic header sanitization | [./proxy.md](./proxy.md) |
| Adapter | Runtime-agnostic `env()` and `getRuntimeKey()` for multi-platform deployments | [./adapter.md](./adapter.md) |
| Cookie | Read (`getCookie`), write (`setCookie`), and delete (`deleteCookie`) HTTP cookies | [./cookie.md](./cookie.md) |
| Accepts | HTTP content negotiation against `Accept-*` headers | [./accepts.md](./accepts.md) |
| ConnInfo | Retrieve client connection metadata (IP, transport, port) via `getConnInfo` | [./conninfo.md](./conninfo.md) |
| Route | Inspect matched routes and path patterns at runtime | [./route.md](./route.md) |
| JWT | Sign, verify, and decode JSON Web Tokens | [./jwt.md](./jwt.md) |
| Factory | Create typed middleware and handlers with a shared `Env` type | [./factory.md](./factory.md) |
| SSG | Generate a static site from Hono routes via `toSSG` | [./ssg.md](./ssg.md) |
| Dev | Development utilities: `showRoutes`, `getRouterName` | [./dev.md](./dev.md) |
| Testing | In-process type-safe test client via `testClient` | [./testing.md](./testing.md) |

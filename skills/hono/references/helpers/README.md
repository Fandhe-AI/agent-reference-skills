# helpers

| Name | Description | Path |
|------|-------------|------|
| Accepts Helper | HTTP content negotiation — matches client `Accept-*` headers against server-supported values. | [accepts.md](./accepts.md) |
| Adapter Helper | Runtime-agnostic utilities for accessing environment variables and identifying the current runtime. | [adapter.md](./adapter.md) |
| ConnInfo Helper | Retrieve TCP/UDP connection metadata (remote address, transport, port) from the current request. | [conninfo.md](./conninfo.md) |
| Cookie Helper | Read, write, and delete HTTP cookies with optional cookie prefixes. | [cookie.md](./cookie.md) |
| CSS Helper | Write CSS-in-JS using tagged template literals inside JSX. Requires `<Style />` in the document head. | [css.md](./css.md) |
| Dev Helper | Utilities for inspecting registered routes and the active router during development. | [dev.md](./dev.md) |
| Factory Helper | Create typed middleware and handlers outside of route definitions, sharing a common `Env` type. | [factory.md](./factory.md) |
| HTML Helper | Tagged template literal for writing HTML safely in JavaScript, plus `raw()` for unescaped output. | [html.md](./html.md) |
| JWT Helper | Sign, verify, and decode JSON Web Tokens (HS256 by default). | [jwt.md](./jwt.md) |
| Proxy Helper | Forward incoming requests to an upstream origin with automatic header sanitization. | [proxy.md](./proxy.md) |
| Route Helper | Inspect matched routes, path patterns, and base paths at runtime — useful for nested sub-applications. | [route.md](./route.md) |
| SSG Helper | Generate a static site from a Hono application by crawling registered routes and writing HTML files. | [ssg.md](./ssg.md) |
| Streaming Helper | Helpers for HTTP streaming responses: raw binary, plain text, and Server-Sent Events. | [streaming.md](./streaming.md) |
| Testing Helper | Create a type-safe RPC client from a Hono app for use in tests — no running server required. | [testing.md](./testing.md) |
| WebSocket Helper | Upgrade HTTP connections to WebSocket with a unified event-handler API across runtimes. | [websocket.md](./websocket.md) |

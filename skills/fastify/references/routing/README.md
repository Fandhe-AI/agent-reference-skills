# routing

対象 Fastify v5.12.1。`Router` / `route` は `hono`（Web Standards JS）・`go-echo`（Go）・`fandhe-backend`（Rust）・`react-router` / `tanstack-router`（クライアント側）とは別物。ここは Fastify の find-my-way ベースのサーバールーティング。

| Name | Description | Path |
|------|-------------|------|
| Route Options | `fastify.route(options)` full declaration and its options table | [route-options.md](./route-options.md) |
| Shorthand Declaration | `fastify.get/post/put/delete/...` shorthand methods | [shorthand-declaration.md](./shorthand-declaration.md) |
| URL Building | Parametric, wildcard, RegExp, multi-parameter and optional URL params | [url-parameters.md](./url-parameters.md) |
| Async Await / Promise Resolution | `async/await` handlers and reply promise-resolution rules | [async-await-handlers.md](./async-await-handlers.md) |
| Route Prefixing | Versioning routes with `prefix`, and `fastify-plugin` interaction | [route-prefixing.md](./route-prefixing.md) |
| Constraints | `version` / `host` / custom async constraints for route matching | [constraints-versioning.md](./constraints-versioning.md) |
| Custom Log Level, Log Serializer, Config | Per-route `logLevel`, `logSerializers`, and `config` object | [route-config-log-level.md](./route-config-log-level.md) |
| HTTP/2 | `http2: true` secure (h2) and plaintext (h2c) server setup | [http2.md](./http2.md) |

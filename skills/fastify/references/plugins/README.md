# plugins

対象 Fastify v5.12.1。

ここの plugin / register は avvio ベースの Fastify カプセル化ツリー（`fastify-plugin` で break out）。`hono` の middleware・`fandhe-backend` のプラグイン・`vercel` / `storybook` のプラグインとは別物。

| Name | Description | Path |
| --- | --- | --- |
| plugins | `register` API, plugin options (prefix/logLevel/logSerializers), async/await, ESM support, scope handling | [plugins.md](./plugins.md) |
| encapsulation | Encapsulation context diagram, sharing decorators/hooks between contexts via `fastify-plugin` | [encapsulation.md](./encapsulation.md) |
| fastify-plugin | `fp()` metadata: name, fastify version range, decorators, dependencies, encapsulate | [fastify-plugin.md](./fastify-plugin.md) |
| decorators | `decorate` / `decorateRequest` / `decorateReply` / `hasDecorator` / `getDecorator` / `setDecorator`, getters/setters | [decorators.md](./decorators.md) |
| middleware | Express-style middleware via `@fastify/middie` / `@fastify/express`, path restriction | [middleware.md](./middleware.md) |
| write-plugin | Guidelines for writing a good, ecosystem-ready plugin (docs, license, tests, linting, CI) | [write-plugin.md](./write-plugin.md) |
| plugins-guide | The hitchhiker's guide to plugins: register, decorators, hooks, encapsulation/distribution, ESM, error handling | [plugins-guide.md](./plugins-guide.md) |

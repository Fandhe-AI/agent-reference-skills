---
source: https://fastify.dev/docs/latest/Guides/Migration-Guide-V4/
---

# Migration Guide V4

Target: Fastify v5.12.1 (historical guide for the v3 -> v4 migration). Fix all v3 deprecation warnings before upgrading — every deprecated v3 API was removed in v4. Official codemods are available for the largest changes.

## Signature / Usage

```bash
npx codemod@latest fastify/4/migration-recipe
# applies: remove-app-use, reply-raw-access, wrap-routes-plugin, await-register-calls
```

## Breaking Changes

| Change | v3 | v4 |
| --- | --- | --- |
| Async error handler composition | error thrown in `setErrorHandler` crashed / was unhandled | thrown error bubbles to the upper-level error handler (or the default) |
| `app.use()` | supported | removed; use `@fastify/middie` / `@fastify/express`, or migrate to hooks |
| `reply.res` | present | renamed to `reply.raw` |
| Async handlers not returning a value | implicit | must `return reply` to signal a forked promise chain when responding asynchronously without returning a value |
| `exposeHeadRoutes` | opt-in | `true` by default (every `GET` gets a sibling `HEAD`) |
| Route registration | asynchronous | synchronous; `onRoute` hooks in a plugin must be wrapped in a nested plugin or the outer `register()` must be awaited |
| Optional URL parameters | implicit optional params matched | must be declared explicitly (`'/posts/:id?'`) |

## Non-Breaking Changes

- `.listen()` variadic signature (`fastify.listen(8000, '127.0.0.1', 511)` etc.) deprecated in favor of `fastify.listen({ port })` — this deprecation was fully removed later in [migration-v5.md](./migration-v5.md)
- Ajv upgraded to v8: `type` keywords with multiple non-null types are now strict-mode errors; replace `{ type: ['object', 'array'] }` with `anyOf: [{ type: 'array' }, { type: 'object' }]`
- Added `reply.trailers()` methods for HTTP Trailer response headers

## Notes

- Route-registration synchronicity change means an `onRoute` hook registered inside a plugin must either be wrapped in its own nested plugin (recommended) or the plugin's `register()` call must be `await`ed so hooks are attached before routes are added
- The v4 -> v5 union-type-schema and `.listen()` deprecations were carried through and fully removed in v5; see [migration-v5.md](./migration-v5.md)

## Related

- [migration-v5.md](./migration-v5.md)
- [migration-v3.md](./migration-v3.md)

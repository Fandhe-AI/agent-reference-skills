# TypeScript SDK: v3 vs v4

The Inngest TypeScript SDK reference is split into `reference/typescript/v3/**` and `reference/typescript/v4/**`. v4 is the current major version; v3 docs remain available for existing projects. Some APIs referenced elsewhere in this category (`fetch`, `group.experiment()`, `scoring`, deferred functions) are **v4-only**.

## Signature / Usage

```ts
// v3: triggers as second argument
inngest.createFunction({ id: "my-fn" }, { event: "app/user.created" }, handler);

// v4: triggers moved into the config object
inngest.createFunction(
  { id: "my-fn", triggers: [{ event: "app/user.created" }] },
  handler
);
```

## API availability by version

| API | v3 | v4 |
|-----|----|----|
| `step.waitForSignal()` | Yes | Yes (same signature) |
| `singleton` function config | Yes | Yes (same signature) |
| `step.fetch()` / `fetch()` utility | No | Yes only |
| `group.experiment()` | No | Yes only |
| Scoring (`inngest.score()`, `createScorer()`, `defer` scoring) | No | Yes only |
| Deferred functions (`createDefer`, `defer()`) | No | Yes only (experimental, `inngest/experimental`) |
| Middleware (`Middleware.BaseMiddleware`, hooks) | Yes (older API) | Yes (rewritten API, not compatible with v3 middleware) |

## Breaking changes in v4 (vs v3)

- **Middleware system rewrite**: the entire middleware API changed; v3 middleware is not compatible with v4.
- **Default mode changed to cloud**: v3 defaulted to dev mode; v4 requires explicit `isDev: true` or `INNGEST_DEV=1` for local development.
- **Triggers moved into the config object**: previously the second argument to `createFunction()`, now the `triggers` field.
- **`EventSchemas` removed**: replaced by decentralized `eventType()`, `staticSchema()`, and `cron()` helpers.
- **`event.user` field removed**: move user data into `event.data` (was incompatible with function replay).
- **`serveHost` renamed to `serveOrigin`**.
- **Serve options moved to the client constructor**: `baseUrl`, `fetch`, `signingKey`, `signingKeyFallback` are now set on `new Inngest()` instead of `serve()`.
- **`logLevel` option removed**: configure logging via the `logger` option (`ConsoleLogger` with a level).
- **`streaming` option simplified**: from `"allow" | "force" | false` to a plain boolean.
- **Optimized parallelism enabled by default**: changes `Promise.race` behavior for parallel steps; use `group.parallel()` for early resolution.
- **Checkpointing enabled by default**: multiple steps can execute within a single request; set `maxRuntime` to 60-80% of the platform's max function duration on serverless.
- **Connect gateway configuration updated**: `rewriteGatewayEndpoint` callback replaced with a `gatewayUrl` string.
- **Connect runs in a worker thread**: isolates the WebSocket connection to avoid event loop starvation.
- **String function IDs no longer supported in `step.invoke()`**: use `referenceFunction()` or an imported function instance instead.

## Notes

- v4 is in beta as of this writing; v3 docs display a banner pointing to the v4 migration guide.
- New v4-only features (`fetch`, `group.experiment()`, `scoring`, deferred functions) have no v3 equivalent — do not backport their usage to v3 projects.
- `step.waitForSignal()` and `singleton` predate v4 and work the same way in both versions.

## Related

- [createFunction()](./create-function.md)
- [Middleware](./middleware.md)
- [eventType()](./event-type.md)

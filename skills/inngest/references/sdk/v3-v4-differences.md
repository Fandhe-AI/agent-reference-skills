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

## Options / Props

| API | v3 | v4 |
|-----|----|----|
| `step.waitForSignal()` | Yes | Yes (same signature) |
| `singleton` function config | Yes | Yes (same signature) |
| `step.fetch()` / `fetch()` utility | No | Yes only |
| `group.experiment()` | No | Yes only |
| Scoring (`inngest.score()`, `createScorer()`, `defer` scoring) | No | Yes only |
| Deferred functions (`createDefer`, `defer()`) | No | Yes only (experimental, `inngest/experimental`) |
| Middleware (`Middleware.BaseMiddleware`, hooks) | Yes (older API) | Yes (rewritten API, not compatible with v3 middleware) |

## Notes

### Breaking changes in v4 (vs v3)

- **Middleware system rewrite**: the entire middleware API changed; v3 middleware is not compatible with v4.
- **Default mode changed to cloud**: v3 defaulted to dev mode; v4 requires explicit `isDev: true` or `INNGEST_DEV=1` for local development.
- **Triggers moved into the config object**: previously the second argument to `createFunction()`, now the `triggers` field.
- **`EventSchemas` removed**: replaced by decentralized `eventType()`, `staticSchema()`, and `cron()` helpers.
- **`event.user` field removed**: move user data into `event.data` (was incompatible with function replay).
- **`serveHost` renamed to `serveOrigin`**.
- **Serve options moved to the client constructor**: `baseUrl`, `fetch`, `signingKey`, `signingKeyFallback` are now set on `new Inngest()` instead of `serve()`.
- **`logLevel` option removed**: configure logging via the `logger` option (`ConsoleLogger` with a level).
- **`streaming` option simplified**: from `"allow" | "force" | false` to a plain boolean.
- **Optimized parallelism enabled by default**: changes `Promise.race` behavior for parallel steps (it waits for all promises to settle); use `group.parallel()` for early resolution. `optimizeParallelism: false` on the client or function disables it altogether (deprecated; see parallel-steps).
- **Checkpointing enabled by default**: multiple steps can execute within a single request; set `checkpointing: { maxRuntime }` to 60-80% of the platform's max function duration on serverless (e.g. `'50s'` for a 60s max). Disable with `checkpointing: false` on the client or on individual functions.
- **Connect gateway configuration updated**: `rewriteGatewayEndpoint` callback removed from `connect()`; use the `gatewayUrl` string option (e.g. `"wss://my-cluster-host:8289/v0/connect"`) or the `INNGEST_CONNECT_GATEWAY_URL` environment variable.
- **Connect runs in a worker thread**: isolates the WebSocket connection to avoid event loop starvation (CPU-heavy work blocking heartbeats). If you notice an issue, move the WebSocket connection back to the main thread with `isolateExecution: false` in `connect()` options or `INNGEST_CONNECT_ISOLATE_EXECUTION=false`.
- **Edge environment improvements**: fetch and configuration are resolved lazily at first use rather than at client construction, so you no longer need to bind `globalThis.fetch` before creating a client in edge environments (Cloudflare Workers, Vercel Edge, Deno, etc.).
- **String function IDs no longer supported in `step.invoke()`**: use `referenceFunction({ appId, functionId })` (cross-app) or an imported function instance instead.

Details for items above that are not obvious from the one-line summary:

- `logLevel` removed: the default logger level is `info`; to change it pass `logger: new ConsoleLogger({ level: "debug" })` (`import { ConsoleLogger, Inngest } from "inngest"`).
- `streaming` in `serve()`: `"force"` becomes `true`, `"allow"` is removed (use `true`), `false` is unchanged. If the `serve` function does not support streaming it now throws an error; previously the option was silently ignored.

New in v4 (per the migration guide): more powerful middleware lifecycle, trigger helpers, a separate `internalLogger` option, and a worker thread in Connect.

### Other notes

- v3 docs display a banner pointing to the v4 migration guide. (An earlier version of this page called v4 beta; the current migration guide and reference treat v4 as the current major version.)
- Related v4 behavior: with TypeScript SDK v4.18.0+, session propagation is on by default (`sessionPropagation` client option).
- New v4-only features (`fetch`, `group.experiment()`, `scoring`, deferred functions) have no v3 equivalent — do not backport their usage to v3 projects.
- `step.waitForSignal()` and `singleton` predate v4 and work the same way in both versions.

## Related

- [createFunction()](./create-function.md)
- [Middleware](./middleware.md)
- [eventType()](./event-type.md)

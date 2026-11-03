---
source: https://developers.cloudflare.com/workers/testing/miniflare/migrations/from-v2/
---

# Migrating from Miniflare Version 2

Miniflare v3 runs on `workerd` (the open-source Workers runtime); the standalone CLI is gone and many options and methods were removed or changed.

## Signature / Usage

```sh
$ npx wrangler@3 dev
```

`QueueConsumerOptions`:

```ts
interface QueueConsumerOptions {
	// /queues/platform/configuration/#consumer
	maxBatchSize?: number; // default: 5
	maxBatchTimeout?: number /* seconds */; // default: 1
	maxRetries?: number; // default: 2
	deadLetterQueue?: string; // default: none
}
```

## Options / Props

Updated options:

| Option | Change |
|--------|--------|
| `kvNamespaces` / `r2Buckets` / `d1Databases` | Also accept `Record<string, string>` mapping binding names to namespace IDs / bucket names / database IDs (multiple Workers can bind the same resource under different names) |
| `queueBindings` | Renamed to `queueProducers` (`Record<string, string>` binding to queue name, or `string[]`) |
| `queueConsumers` | `Record<string, QueueConsumerOptions>` or `string[]` of queue names with default options |
| `cfFetch` | Renamed to `cf` (boolean, string, or object) |

Removed options:

| Option | Replacement / reason |
|--------|----------------------|
| `wranglerConfigPath` / `wranglerConfigEnv` | Use `unstable_dev()` to start a Worker from Wrangler config |
| `packagePath` | Use `scriptPath` |
| `watch` | Use a separate file watcher and call `setOptions()` |
| `logUnhandledRejections` | Use `addEventListener("unhandledrejection")` in Workers |
| `globals` | Not supported by workerd; service-worker `bindings` are injected as JSON-serialisable globals |
| `https` / `httpsKey(Path)` / `httpsCert(Path)` / `httpsPfx(Path)` / `httpsPassphrase` | Stated as unsupported (see Notes) |
| `crons` | Stated as unsupported (see Notes) |
| `mounts` | Use the `workers` option |
| `metaProvider` | Pass `cf` and `X-Forwarded-Proto` / `X-Real-IP` headers to `dispatchFetch()`; default `cf` via the `cf` option |
| `durableObjectAlarms` | Alarms are always enabled |
| `globalAsyncIO` / `globalTimers` / `globalRandom` | workerd cannot support these |
| `actualTime` | Always returns the current time |
| `inaccurateCpu` | Set `inspectorPort: 9229` and open `chrome://inspect` for CPU profiling |

Methods:

| Method | Change |
|--------|--------|
| `setOptions()` | Now requires a full configuration object, not a partial patch |
| `reload()` | Removed; call `setOptions()` with the original configuration |
| `createServer()` / `startServer()` | Removed; a workerd server always listens on `host` / `port` |
| `dispatchScheduled()` / `startScheduled()` | Removed; use `getWorker()` |
| `dispatchQueue()` | Removed; use `queue()` on service bindings or queue producer bindings |
| `getGlobalScope()` / `getBindings()` / `getModuleExports()` | Removed (objects lived inside the sandbox; workerd is a separate process) |
| `addEventListener()` / `removeEventListener()` | Removed; wait with `await mf.ready` or `await mf.setOptions()` |
| `Response#waitUntil()` | Removed; workerd cannot wait for all `waitUntil()`ed promises yet |

Removed packages: `@miniflare/*` (everything is in the single `miniflare` package).

`mounts` replacement example:

```ts
import { Miniflare, Response } from "miniflare";

const message = "The count is ";
const mf = new Miniflare({
	// Options shared between Workers such as HTTP and persistence configuration
	// should always be defined at the top level.
	host: "0.0.0.0",
	port: 8787,
	kvPersist: true,

	workers: [
		{
			name: "worker",
			kvNamespaces: { COUNTS: "counts" },
			serviceBindings: {
				INCREMENTER: "incrementer",
				// Service bindings can also be defined as custom functions, with access
				// to anything defined outside Miniflare.
				async CUSTOM(request) {
					// `request` is the incoming `Request` object.
					return new Response(message);
				},
			},
			modules: true,
			script: `export default {
        async fetch(request, env, ctx) {
          // Get the message defined outside
          const response = await env.CUSTOM.fetch("http://host/");
          const message = await response.text();

          // Increment the count 3 times
          await env.INCREMENTER.fetch("http://host/");
          await env.INCREMENTER.fetch("http://host/");
          await env.INCREMENTER.fetch("http://host/");
          const count = await env.COUNTS.get("count");

          return new Response(message + count);
        }
      }`,
		},
		{
			name: "incrementer",
			// Note we're using the same `COUNTS` namespace as before, but binding it
			// to `NUMBERS` instead.
			kvNamespaces: { NUMBERS: "counts" },
			// Worker formats can be mixed-and-matched
			script: `addEventListener("fetch", (event) => {
        event.respondWith(handleRequest());
      })
      async function handleRequest() {
        const count = parseInt((await NUMBERS.get("count")) ?? "0") + 1;
        await NUMBERS.put("count", count.toString());
        return new Response(count.toString());
      }`,
		},
	],
});
const res = await mf.dispatchFetch("http://localhost");
console.log(await res.text()); // "The count is 3"
await mf.dispose();
```

## Notes

- Miniflare v3 no longer includes a standalone CLI; use Wrangler (`npx wrangler@3 dev`).
- Docs contradiction: this page says HTTPS options and `crons` are unsupported, but the current get-started and scheduled-events pages document `https`, `httpsKey*`, `httpsCert*` and `crons`. Treat those pages as current.
- Docs contradiction: `getBindings()` is listed as removed, yet get-started and writing-tests use `mf.getBindings()`.
- Migration guide covers v2 to v3 only; no separate page for later majors.

## Related

- [get-started.md](./get-started.md)
- [multiple-workers.md](./multiple-workers.md)
- [scheduled-events.md](./scheduled-events.md)
- [queues.md](./queues.md)
- [../commands/api.md](../commands/api.md)

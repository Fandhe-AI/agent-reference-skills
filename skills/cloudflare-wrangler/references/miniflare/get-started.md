---
source: https://developers.cloudflare.com/workers/testing/miniflare/get-started/
---

# Miniflare Get Started

Install the Miniflare API, create an instance, dispatch events, and configure the HTTP(S) server, cf object, and logging.

## Signature / Usage

```sh
npm i -D miniflare
```

```js
import { Miniflare } from "miniflare";

const mf = new Miniflare({
	modules: true,
	script: `
  export default {
    async fetch(request, env, ctx) {
      return new Response("Hello Miniflare!");
    }
  }
  `,
});

const res = await mf.dispatchFetch("http://localhost:8787/");
console.log(await res.text()); // Hello Miniflare!
await mf.dispose();
```

Examples assume ES module mode (`"type": "module"` in `package.json`). Instead of `script`, use `scriptPath`:

```js
const mf = new Miniflare({
	scriptPath: "worker.js",
});
```

### Updating options

`setOptions()` accepts the same options object as the constructor, applies it, then reloads the worker.

```js
const mf = new Miniflare({
	script: "...",
	kvNamespaces: ["TEST_NAMESPACE"],
	bindings: { KEY: "value1" },
});

await mf.setOptions({
	script: "...",
	kvNamespaces: ["TEST_NAMESPACE"],
	bindings: { KEY: "value2" },
});
```

### Dispatching events

`getWorker` dispatches `fetch`, `queues`, and `scheduled` events to workers respectively:

```js
import { Miniflare } from "miniflare";

const mf = new Miniflare({
	modules: true,
	script: `
	let lastScheduledController;
	let lastQueueBatch;
	export default {
		async fetch(request, env, ctx) {
			const { pathname } = new URL(request.url);
			if (pathname === "/scheduled") {
				return Response.json({
					scheduledTime: lastScheduledController?.scheduledTime,
					cron: lastScheduledController?.cron,
				});
			} else if (pathname === "/queue") {
				return Response.json({
					queue: lastQueueBatch.queue,
					messages: lastQueueBatch.messages.map((message) => ({
					id: message.id,
					timestamp: message.timestamp.getTime(),
					body: message.body,
					bodyType: message.body.constructor.name,
					})),
				});
			} else if (pathname === "/get-url") {
				return new Response(request.url);
			} else {
				return new Response(null, { status: 404 });
			}
		},
		async scheduled(controller, env, ctx) {
			lastScheduledController = controller;
			if (controller.cron === "* * * * *") controller.noRetry();
		},
		async queue(batch, env, ctx) {
			lastQueueBatch = batch;
			if (batch.queue === "needy") batch.retryAll();
			for (const message of batch.messages) {
				if (message.id === "perfect") message.ack();
			}
		}
	}`,
});

const res = await mf.dispatchFetch("http://localhost:8787/", {
	headers: { "X-Message": "Hello Miniflare!" },
});
console.log(await res.text()); // Hello Miniflare!

const worker = await mf.getWorker();

const scheduledResult = await worker.scheduled({
	cron: "* * * * *",
});
console.log(scheduledResult); // { outcome: "ok", noRetry: true });

const queueResult = await worker.queue("needy", [
	{ id: "a", timestamp: new Date(1000), body: "a", attempts: 1 },
	{ id: "b", timestamp: new Date(2000), body: { b: 1 }, attempts: 1 },
]);
console.log(queueResult); // { outcome: "ok", retryAll: true, ackAll: false, explicitRetries: [], explicitAcks: []}
```

### HTTP server

Miniflare starts an HTTP server automatically. To wait for it to be ready, `await` the `ready` property:

```js
const mf = new Miniflare({
	modules: true,
	script: `...`,
	port: 5000,
});
await mf.ready;
console.log("Listening on :5000");
```

### `Request#cf` object

By default, Miniflare fetches the `Request#cf` object from a trusted Cloudflare endpoint and caches it at `node_modules/.mf/cf.json`. Disable with `cf: false`, or provide a file path:

```js
const mf = new Miniflare({
	cf: false,
});
```

```js
const mf = new Miniflare({
	cf: "cf.json",
});
```

System environment variables control the same behaviour (useful with `wrangler dev`); the explicit `cf` option takes precedence over both:

```sh
# Disable cf fetching entirely (uses fallback data)
export CLOUDFLARE_CF_FETCH_ENABLED=false
npx wrangler dev

# Use a custom cache location for cf.json
export CLOUDFLARE_CF_FETCH_PATH=/tmp/.cf-cache.json
npx wrangler dev
```

### HTTPS server

Set `https: true` for the default shared self-signed certificate, or load a certificate from files or strings. If both a string and a path are given for an option (e.g. `httpsKey` and `httpsKeyPath`), the string is preferred.

```js
const mf = new Miniflare({
	https: true,
});
```

```js
const mf = new Miniflare({
	// These are all optional, you don't need to include them all
	httpsKeyPath: "./key.pem",
	httpsCertPath: "./cert.pem",
});
```

```js
const mf = new Miniflare({
	// These are all optional, you don't need to include them all
	httpsKey: "-----BEGIN RSA PRIVATE KEY-----...",
	httpsCert: "-----BEGIN CERTIFICATE-----...",
});
```

### Logging

By default `[mf:*]` logs are disabled when using the API. Set `log` to a `Log` instance with a log level:

```js
import { Miniflare, Log, LogLevel } from "miniflare";

const mf = new Miniflare({
	scriptPath: "worker.js",
	log: new Log(LogLevel.DEBUG), // Enable debug messages
});
```

### Reference

Full reference (verbatim from the official page):

```js
import { Miniflare, Log, LogLevel } from "miniflare";

const mf = new Miniflare({
  // All options are optional, but one of script or scriptPath is required

  log: new Log(LogLevel.INFO), // Logger Miniflare uses for debugging

  script: `
    export default {
      async fetch(request, env, ctx) {
        return new Response("Hello Miniflare!");
      }
    }
  `,
  scriptPath: "./index.js",

  modules: true, // Enable modules
  modulesRules: [
    // Modules import rule
    { type: "ESModule", include: ["**/*.js"], fallthrough: true },
    { type: "Text", include: ["**/*.text"] },
  ],
  compatibilityDate: "2021-11-23", // Opt into backwards-incompatible changes from
  compatibilityFlags: ["formdata_parser_supports_files"], // Control specific backwards-incompatible changes
  upstream: "https://miniflare.dev", // URL of upstream origin
  workers: [{
    // reference additional named workers
    name: "worker2",
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
  }],
  name: "worker", // Name of service
  routes: ["*site.mf/worker"],

  host: "127.0.0.1", // Host for HTTP(S) server to listen on
  port: 8787, // Port for HTTP(S) server to listen on
  https: true, // Enable self-signed HTTPS (with optional cert path)
  httpsKey: "-----BEGIN RSA PRIVATE KEY-----...",
  httpsKeyPath: "./key.pem", // Path to PEM SSL key
  httpsCert: "-----BEGIN CERTIFICATE-----...",
  httpsCertPath: "./cert.pem", // Path to PEM SSL cert chain
  cf: "./node_modules/.mf/cf.json", // Path for cached Request cf object from Cloudflare
  liveReload: true, // Reload HTML pages whenever worker is reloaded

  kvNamespaces: ["TEST_NAMESPACE"], // KV namespace to bind
  kvPersist: "./kv-data", // Persist KV data (to optional path)

  r2Buckets: ["BUCKET"], // R2 bucket to bind
  r2Persist: "./r2-data", // Persist R2 data (to optional path)

  durableObjects: {
    // Durable Object to bind
    TEST_OBJECT: "TestObject", // className
    API_OBJECT: { className: "ApiObject", scriptName: "api" },
  },
  durableObjectsPersist: "./durable-objects-data", // Persist Durable Object data (to optional path)

  cache: false, // Enable default/named caches (enabled by default)
  cachePersist: "./cache-data", // Persist cached data (to optional path)
  cacheWarnUsage: true, // Warn on cache usage, for workers.dev subdomains

  sitePath: "./site", // Path to serve Workers Site files from
  siteInclude: ["**/*.html", "**/*.css", "**/*.js"], // Glob pattern of site files to serve
  siteExclude: ["node_modules"], // Glob pattern of site files not to serve

  bindings: { SECRET: "sssh" }, // Binds variable/secret to environment
  wasmBindings: { ADD_MODULE: "./add.wasm" }, // WASM module to bind
  textBlobBindings: { TEXT: "./text.txt" }, // Text blob to bind
  dataBlobBindings: { DATA: "./data.bin" }, // Data blob to bind
});

await mf.setOptions({ kvNamespaces: ["TEST_NAMESPACE2"] }); // Apply options and reload

const bindings = await mf.getBindings(); // Get bindings (KV/Durable Object namespaces, variables, etc)

// Dispatch "fetch" event to worker
const res = await mf.dispatchFetch("http://localhost:8787/", {
  headers: { Authorization: "Bearer ..." },
});
const text = await res.text();

const worker = await mf.getWorker();

// Dispatch "scheduled" event to worker
const scheduledResult = await worker.scheduled({ cron: "30 * * * *" })

const TEST_NAMESPACE = await mf.getKVNamespace("TEST_NAMESPACE");

const BUCKET = await mf.getR2Bucket("BUCKET");

const caches = await mf.getCaches(); // Get global `CacheStorage` instance
const defaultCache = caches.default;
const namedCache = await caches.open("name");

// Get Durable Object namespace and storage for ID
const TEST_OBJECT = await mf.getDurableObjectNamespace("TEST_OBJECT");
const id = TEST_OBJECT.newUniqueId();
const storage = await mf.getDurableObjectStorage(id);

// Get Queue Producer
const producer = await mf.getQueueProducer("QUEUE_BINDING");

// Get D1 Database
const db = await mf.getD1Database("D1_BINDING")

await mf.dispose(); // Cleanup storage database connections and watcher
```

## Options / Props

All options are optional, but one of `script` or `scriptPath` is required. Descriptions are the comments from the official Reference block.

| Name | Type | Default | Description |
|------|------|---------|-------------|
| log | — | — | Logger Miniflare uses for debugging |
| script | — | — | Worker script source |
| scriptPath | — | — | Path to the Worker script |
| modules | — | — | Enable modules |
| modulesRules | — | — | Modules import rule |
| compatibilityDate | — | — | Opt into backwards-incompatible changes from |
| compatibilityFlags | — | — | Control specific backwards-incompatible changes |
| upstream | — | — | URL of upstream origin |
| workers | — | — | Reference additional named workers |
| name | — | — | Name of service |
| routes | — | — | Routes for the Worker |
| host | — | — | Host for HTTP(S) server to listen on (example: `127.0.0.1`) |
| port | — | — | Port for HTTP(S) server to listen on (example: `8787`) |
| https | — | — | Enable self-signed HTTPS (with optional cert path) |
| httpsKey | — | — | PEM SSL key (string) |
| httpsKeyPath | — | — | Path to PEM SSL key |
| httpsCert | — | — | PEM SSL cert chain (string) |
| httpsCertPath | — | — | Path to PEM SSL cert chain |
| cf | — | — | Path for cached Request cf object from Cloudflare |
| liveReload | — | — | Reload HTML pages whenever worker is reloaded |
| kvNamespaces | — | — | KV namespace to bind |
| kvPersist | — | — | Persist KV data (to optional path) |
| r2Buckets | — | — | R2 bucket to bind |
| r2Persist | — | — | Persist R2 data (to optional path) |
| durableObjects | — | — | Durable Object to bind |
| durableObjectsPersist | — | — | Persist Durable Object data (to optional path) |
| cache | — | — | Enable default/named caches (enabled by default) |
| cachePersist | — | — | Persist cached data (to optional path) |
| cacheWarnUsage | — | — | Warn on cache usage, for workers.dev subdomains |
| sitePath | — | — | Path to serve Workers Site files from |
| siteInclude | — | — | Glob pattern of site files to serve |
| siteExclude | — | — | Glob pattern of site files not to serve |
| bindings | — | — | Binds variable/secret to environment |
| wasmBindings | — | — | WASM module to bind |
| textBlobBindings | — | — | Text blob to bind |
| dataBlobBindings | — | — | Data blob to bind |

## Notes

- Miniflare's API is primarily for testing; for file watching use a separate watcher (`fs.watch()`, chokidar) and call `setOptions()` with the original configuration on change.
- Always `await mf.dispose()` to clean up and stop listening. Reload scripts and options by calling `setOptions()` with the original configuration object.
- Docs inconsistencies: the "Dispatching events" snippet says `getWorker` dispatches fetch events but uses `dispatchFetch` for fetch; the `HTTP server` example in the official page has a stray `)` after the `fetch` method; in the Reference block the `workers` array literal has unbalanced braces (copied verbatim, treat as illustrative).
- The migration page lists `https*` options and `crons` as removed in v3, while this page and the scheduled-events page document them; follow these pages for current behavior.

## Related

- [overview.md](./overview.md)
- [fetch-events.md](./fetch-events.md)
- [scheduled-events.md](./scheduled-events.md)
- [writing-tests.md](./writing-tests.md)
- [migrating-from-v2.md](./migrating-from-v2.md)

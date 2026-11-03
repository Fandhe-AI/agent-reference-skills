---
source: https://developers.cloudflare.com/workers/testing/miniflare/core/multiple-workers/
---

# Multiple Workers (Miniflare)

Run multiple Workers in one Miniflare instance via the `workers` option, with service bindings and optional routing.

## Signature / Usage

```js
import { Miniflare, Response } from "miniflare";

const message = "The count is ";
const mf = new Miniflare({
	// Options shared between workers such as HTTP and persistence configuration
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

### Routing

```js
const mf = new Miniflare({
	workers: [
		{
			scriptPath: "./api/worker.js",
			routes: ["http://127.0.0.1/api*", "api.mf/*"],
		},
	],
});
```

Hostnames other than `localhost` / `127.0.0.1` may need `hosts` file entries (`/etc/hosts` on Linux and macOS, `C:\Windows\System32\drivers\etc\hosts` on Windows):

```plaintext
127.0.0.1 miniflare.test
127.0.0.1 api.mf
```

Or customise the `Host` header:

```sh
# Dispatches to the "api" worker
$ curl "http://localhost:8787/todos/update/1" -H "Host: api.mf"
```

With the API, the request URL selects the Worker:

```js
// Dispatches to the "api" worker
const res = await mf.dispatchFetch("http://api.mf/todos/update/1", { ... });
```

## Notes

- Options shared between workers (HTTP, persistence) must be defined at the top level.
- `routes` use the standard route syntax (https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior); port numbers are ignored.
- `script_name` support for Durable Objects exported by other scripts requires mounting the other worker this way.

## Related

- [durable-objects.md](./durable-objects.md)
- [queues.md](./queues.md)
- [get-started.md](./get-started.md)
- [../local-development/multi-workers.md](../local-development/multi-workers.md)

---
source: https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
---

# Migrate from Service Workers to ES Modules

Convert Service Worker syntax (`addEventListener`) Workers to ES modules format (`export default { fetch }`).

## Signature / Usage

Service Worker format:

Adapted (not in the official docs): the destination is built from a fixed host by copying `pathname` and `search`, because `new URL(request.url, base)` ignores `base` and redirects to itself; see Notes.

```js
async function handler(request) {
  const base = 'https://example.com';
  const statusCode = 301;

  const source = new URL(request.url);
  const destination = new URL(base);
  destination.pathname = source.pathname;
  destination.search = source.search;
  return Response.redirect(destination.toString(), statusCode);
}

// Initialize Worker
addEventListener('fetch', event => {
  event.respondWith(handler(event.request));
});
```

ES modules format:

Adapted (not in the official docs): `pathname` is assigned onto a fixed-host URL instead of resolved as a relative URL; see Notes.

```js
export default {
  fetch(request) {
    const base = "https://example.com";
    const statusCode = 301;

    const source = new URL(request.url);
    const destination = new URL(base);
    destination.pathname = source.pathname;
    destination.search = source.search;
    return Response.redirect(destination.toString(), statusCode);
  },
};
```

Bindings arrive on `env` (not as globals):

```js
async function getTodos(env) {
  // NOTE: Relies on the TODO KV binding which has been provided inside of
  // the env parameter of the `getTodos` function
  let value = await env.TODO.get("to-do:123");
  return new Response(value);
}

export { getTodos }
```

Import `env` globally from `cloudflare:workers`:

```js
import { env } from "cloudflare:workers";

// Access environment variables at the top level
const accountId = env.API_ACCOUNT_ID;

export default {
	async fetch(request) {
		console.log(accountId); // Logs "<EXAMPLE-ACCOUNT-ID>"
		return new Response("Hello, world!");
	},
};
```

Cron Triggers and `waitUntil`:

```js
async function triggerEvent(event) {
  // Fetch some data
  console.log('cron processed', event.scheduledTime);
}

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(triggerEvent(event));
  },
};
```

## Options / Props

| Concern | Service Worker | ES modules |
| --- | --- | --- |
| Handler | `addEventListener('fetch', ...)` + `event.respondWith()` | `export default { fetch(request, env, ctx) }` |
| Bindings and env vars | Globals | `env` parameter (or `import { env } from "cloudflare:workers"`) |
| Cron | `addEventListener('scheduled', ...)` | `scheduled(event, env, ctx)` |
| `waitUntil` / `passThroughOnException` | On the `FetchEvent` (`event`) | On `ctx` |

## Notes

- Advantages of ES modules: faster (execution context reused across requests), required for Durable Objects, required for D1 / Workers AI / Vectorize / Workflows / Images bindings, supports gradual deployments, can be published to npm.
- Service Workers are deprecated but still supported; new features may not be supported.
- Service Worker semantics: if a `fetch` handler does not call `respondWith`, the next registered `fetch` handler is tried; if none does, the request goes to the origin (a `*.workers.dev` Worker has no origin, so it must call `respondWith`). `passThroughOnException()` fails open to the origin.
- Supported `FetchEvent` properties: `type` (always `"fetch"`), `request`, `respondWith()`, `waitUntil()`, `passThroughOnException()`.
- Source code issue: the Service Worker bindings example (`addEventListener("fetch", async (event) => { return await getTodos() })`) references `event` inside `getTodos`, where it is not in scope; it illustrates globals only.
- Adapted from the official docs: the ES modules redirect originally used `new URL(source.pathname, base)`; a request path such as `//attacker.example/x` would change the host and become an open redirect. The adapted snippet keeps the host fixed by assigning `pathname` (and `search`) onto `new URL(base)`. The official Service Worker snippet's `new URL(request.url, base)` ignores `base` because `request.url` is already absolute (it redirects the request to itself, causing a redirect loop), so it was changed to the same fixed-host construction.
- Snippet for the Service Worker `waitUntil` caching example used `event.waitUntil(caches.default.put(event.request, res.clone()))`.

## Related

- [how-workers-works.md](./how-workers-works.md)
- [../handlers-context/README.md](../handlers-context/README.md)
- [../bindings-rpc/README.md](../bindings-rpc/README.md)

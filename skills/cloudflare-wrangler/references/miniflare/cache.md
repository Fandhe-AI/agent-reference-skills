---
source: https://developers.cloudflare.com/workers/testing/miniflare/storage/cache/
---

# Cache (Miniflare)

Default and named caches are enabled by default; persist, inspect from outside Workers, purge, or disable them.

## Signature / Usage

Default cache:

```js
addEventListener("fetch", (e) => {
	e.respondWith(caches.default.match("http://miniflare.dev"));
});
```

Named caches (you cannot name a cache `default`; it throws):

```js
await caches.open("cache_name");
```

Persistence (in memory by default; survives reloads but not different `Miniflare` instances):

```js
const mf = new Miniflare({
	cachePersist: true, // Defaults to ./.mf/cache
	cachePersist: "./data", // Custom path
});
```

Manipulating outside Workers with `getCaches`:

```js
import { Miniflare, Response } from "miniflare";

const mf = new Miniflare({
	modules: true,
	script: `
  export default {
    async fetch(request) {
      const url = new URL(request.url);
      const cache = caches.default;
      if(url.pathname === "/put") {
        await cache.put("https://miniflare.dev/", new Response("1", {
          headers: { "Cache-Control": "max-age=3600" },
        }));
      }
      return cache.match("https://miniflare.dev/");
    }
  }
  `,
});
let res = await mf.dispatchFetch("http://localhost:8787/put");
console.log(await res.text()); // 1

const caches = await mf.getCaches(); // Gets the global caches object
const cachedRes = await caches.default.match("https://miniflare.dev/");
console.log(await cachedRes.text()); // 1

await caches.default.put(
	"https://miniflare.dev",
	new Response("2", {
		headers: { "Cache-Control": "max-age=3600" },
	}),
);
res = await mf.dispatchFetch("http://localhost:8787");
console.log(await res.text()); // 2
```

Purging:

```js
const mf = new Miniflare({ /* options */ });

// Purge the default cache and get the number of entries purged
const count = await mf.purgeCache();
console.log(`Purged ${count} entries`);

// Purge a specific named cache
await mf.purgeCache("my-named-cache");
```

Disabling (caches stay available in the sandbox but cache nothing):

```js
const mf = new Miniflare({
	cache: false,
});
```

## Notes

- Caching via `fetch` is unsupported (see https://developers.cloudflare.com/workers/reference/how-the-cache-works/#cache-api).
- The text calls the disabling option `disableCache`, but the example (and the Reference block) uses `cache: false`.
- Reference: https://developers.cloudflare.com/workers/runtime-apis/cache

## Related

- [get-started.md](./get-started.md)
- [kv.md](./kv.md)

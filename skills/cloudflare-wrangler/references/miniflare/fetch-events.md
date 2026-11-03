---
source: https://developers.cloudflare.com/workers/testing/miniflare/core/fetch/
---

# Fetch Events (Miniflare)

Dispatch HTTP requests to a Worker with `dispatchFetch`, control `CF-*` headers and the `cf` object, and fall back to an upstream origin.

## Signature / Usage

`dispatchFetch` has the same API as `fetch`: a `Request`, or a URL and optional `RequestInit`.

```js
import { Miniflare, Request } from "miniflare";

const mf = new Miniflare({
	modules: true,
	script: `
  export default {
    async fetch(request, env, ctx) {
      const body = JSON.stringify({
        url: event.request.url,
        header: event.request.headers.get("X-Message"),
      });
      return new Response(body, {
        headers: { "Content-Type": "application/json" },
      });
    })
  }
  `,
});

let res = await mf.dispatchFetch("http://localhost:8787/");
console.log(await res.json()); // { url: "http://localhost:8787/", header: null }

res = await mf.dispatchFetch("http://localhost:8787/1", {
	headers: { "X-Message": "1" },
});
console.log(await res.json()); // { url: "http://localhost:8787/1", header: "1" }

res = await mf.dispatchFetch(
	new Request("http://localhost:8787/2", {
		headers: { "X-Message": "2" },
	}),
);
console.log(await res.json()); // { url: "http://localhost:8787/2", header: "2" }
```

You are responsible for adding `CF-*` headers and the `cf` object:

```js
const res = await mf.dispatchFetch("http://localhost:8787", {
	headers: {
		"CF-IPCountry": "GB",
	},
	cf: {
		country: "GB",
	},
});
```

### Upstream

```js
import { Miniflare } from "miniflare";

const mf = new Miniflare({
	script: `
  addEventListener("fetch", (event) => {
    event.passThroughOnException();
    throw new Error();
  });
  `,
	upstream: "https://miniflare.dev",
});
// If you don't use the same upstream URL when dispatching, Miniflare will
// rewrite it to match the upstream
const res = await mf.dispatchFetch("https://miniflare.dev/core/fetch");
console.log(await res.text()); // Source code of this page
```

## Notes

- Every request dispatches a `Request` (including a `cf` object); Miniflare logs method, path, status and response time. If the Worker throws, an error page with the stack trace is returned.
- If no response is returned, or an exception is thrown after `passThroughOnException()`, the response is fetched from the `upstream` origin.
- Docs error: the first example is a modules-format Worker but uses `event.request` (no `event` in scope; use `request`) and has a stray `)` after the `fetch` method. Copied verbatim.

## Related

- [get-started.md](./get-started.md)
- [websockets.md](./websockets.md)
- [scheduled-events.md](./scheduled-events.md)

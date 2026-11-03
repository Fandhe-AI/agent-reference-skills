---
source: https://developers.cloudflare.com/workers/testing/miniflare/core/standards/
---

# Web Standards (Miniflare)

Mock outbound `fetch()` calls from a Worker using undici's `MockAgent` via `createFetchMock()` and the `fetchMock` option.

## Signature / Usage

```js
import { Miniflare, createFetchMock } from "miniflare";

// Create `MockAgent` and connect it to the `Miniflare` instance
const fetchMock = createFetchMock();
const mf = new Miniflare({
	modules: true,
	script: `
  export default {
    async fetch(request, env, ctx) {
      const res = await fetch("https://example.com/thing");
      const text = await res.text();
      return new Response(\`response:\${text}\`);
    }
  }
  `,
	fetchMock,
});

// Throw when no matching mocked request is found
// (see https://undici.nodejs.org/#/docs/api/MockAgent?id=mockagentdisablenetconnect)
fetchMock.disableNetConnect();

// Mock request to https://example.com/thing
// (see https://undici.nodejs.org/#/docs/api/MockAgent?id=mockagentgetorigin)
const origin = fetchMock.get("https://example.com");
// (see https://undici.nodejs.org/#/docs/api/MockPool?id=mockpoolinterceptoptions)
origin
	.intercept({ method: "GET", path: "/thing" })
	.reply(200, "Mocked response!");

const res = await mf.dispatchFetch("http://localhost:8787/");
console.log(await res.text()); // "response:Mocked response!"
```

## Notes

- Fetch mocking is available when using the API.
- Miniflare does not support limiting the number of subrequests (https://developers.cloudflare.com/workers/platform/limits#account-plan-limits); keep this in mind with many subrequests.
- Web standards references: https://developers.cloudflare.com/workers/runtime-apis/web-standards

## Related

- [fetch-events.md](./fetch-events.md)
- [test-harness-prepare-test-state.md](./test-harness-prepare-test-state.md)

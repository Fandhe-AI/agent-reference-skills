---
source: https://developers.cloudflare.com/workers/testing/miniflare/get-started/
---

# Miniflare Dispatch Events Programmatically

Start Miniflare from Node.js, dispatch a fetch, and fire `scheduled` and `queue` events.

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

```js
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

## Notes

- Set `"type": "module"` in `package.json`; call `dispose()` when finished.
- The `scheduled`/`queue` snippet assumes a Worker (as in the docs) whose handlers record state; `getWorker()` is called on an existing instance.
- Docs bug: the "HTTP Server" example's script ends the `fetch` method with `})` (stray parenthesis), which is invalid JavaScript.
- Miniflare is not a hardened sandbox; do not run untrusted Worker code with it.
- See [../references/miniflare/README.md](../references/miniflare/README.md).

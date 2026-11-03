---
source: https://developers.cloudflare.com/workers/observability/dev-tools/memory-usage/
---

# Profiling memory

Profile memory with DevTools snapshots to optimize Workers, avoid Out of Memory (OOM) errors against Worker memory limits, and find memory leaks.

## Signature / Usage

Example Worker with a memory leak (global string grows each request):

```js
let responseText = "Hello world!";

export default {
	async fetch(request, env, ctx) {
		let now = new Date().toISOString();
		responseText = responseText + ` (Requested at: ${now})`;
		return new Response(responseText.slice(0, 53));
	},
};
```

The leaking line found via the snapshot:

```js
responseText = responseText + ` (Requested at: ${now})`;
```

## Notes

- Taking a snapshot: run `wrangler dev`, press `D` to open DevTools, select the "Memory" tab, send requests to allocate memory (optionally include a debugger to pause at the right time), select `Take snapshot`.
- Reading it: choose "Statistics" in the dropdown for a general view (in the example strings take 67 kB; more requests and another snapshot show growth). The summary lists data types by memory; clicking "(string)" reveals one far larger string.
- To identify allocating code in a deployed Worker, capture a Heap profile in production; it measures allocations, not retained memory.
- To mimic production, send similar requests or use production-like data with the remote bindings flag.
- Google's guide: https://developer.chrome.com/docs/devtools/memory-problems/heap-snapshots.

## Related

- [devtools.md](./devtools.md)
- [cpu-profiling.md](./cpu-profiling.md)
- [profiling-in-production.md](./profiling-in-production.md)
- [metrics-and-analytics.md](./metrics-and-analytics.md)

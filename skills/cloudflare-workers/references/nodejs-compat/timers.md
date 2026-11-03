---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/timers/
---

# timers

`node:timers` schedules functions to run later: `setTimeout`, `setInterval`, `setImmediate`.

## Signature / Usage

```js
import timers from "node:timers";

export default {
	async fetch() {
		console.log("first");
		const { promise: promise1, resolve: resolve1 } = Promise.withResolvers();
		const { promise: promise2, resolve: resolve2 } = Promise.withResolvers();
		timers.setTimeout(() => {
			console.log("last");
			resolve1();
		}, 10);

		timers.setTimeout(() => {
			console.log("next");
			resolve2();
		});

		await Promise.all([promise1, promise2]);

		return new Response("ok");
	},
};
```

## Notes

- Two separate points on the official page: (1) due to security-based restrictions on timers in Workers, clock reads are limited to returning the time of the last I/O (a timestamp-precision restriction, not a statement about callbacks); (2) the page literally states that, because of this, `setTimeout`, `setInterval` and `setImmediate` "will defer your function execution until after other events have run, [but] they will not delay them for the full time specified". Standard `setTimeout` semantics wait at least the delay; the sentence is best read as describing the coarse clock (time advances only on I/O, so elapsed-time readings inside the Worker may not reflect the full delay), not a guarantee that callbacks fire early. Do not use `Date.now()` differences to measure timer delays.
- Corrected from the official docs: only `setTimeout()` and `setInterval()` return `Timeout` objects; `clearTimeout()` and `clearInterval()` return `undefined`.
- Adapted from the official docs: the official page says that, when called from the global level (on `globalThis`), `clearTimeout` and `setTimeout` follow web standards rather than Node.js behavior. That is the behaviour without the `enable_nodejs_global_timers` flag. With `nodejs_compat` and compatibility date 2026-02-10 or later (the flag is enabled by default from that date; `no_nodejs_global_timers` disables it), the global `setTimeout` and `setInterval` return Node.js-compatible `Timeout` objects (`refresh()`, `ref()`, `unref()`, `hasRef()`), matching `node:timers`; `clearTimeout` and `clearInterval` accept such an object (or its numeric id) and return `undefined`. Importing from `node:timers` gives Node.js behaviour regardless of the flag. See compatibility-flags-nodejs.
- Node.js docs: https://nodejs.org/api/timers.html

## Related

- [process](./process.md)
- [Node.js compatibility](./overview.md)

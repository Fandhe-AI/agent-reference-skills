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

- Due to security-based restrictions on timers in Workers, timers are limited to returning the time of the last I/O. `setTimeout`, `setInterval` and `setImmediate` defer execution until after other events have run, but do not delay for the full time specified.
- When called from the global level (on `globalThis`), `clearTimeout` and `setTimeout` follow web standards rather than Node.js behavior. For complete Node.js compatibility, call the functions from the `node:timers` module.
- Node.js docs: https://nodejs.org/api/timers.html

## Related

- [process](./process.md)
- [Node.js compatibility](./overview.md)

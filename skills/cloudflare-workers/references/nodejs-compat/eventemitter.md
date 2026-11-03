---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/eventemitter/
---

# EventEmitter

`EventEmitter` (`node:events`) emits named events that cause listeners to be called.

## Signature / Usage

```js
import { EventEmitter } from "node:events";

const emitter = new EventEmitter();
emitter.on("hello", (...args) => {
	console.log(...args); // 1 2 3
});

emitter.emit("hello", 1, 2, 3);
```

With `captureRejections` for async handlers:

```js
const emitter = new EventEmitter({ captureRejections: true });
emitter.on("hello", async (...args) => {
	throw new Error("boom");
});
emitter.on("error", (err) => {
	// the async promise rejection is emitted here!
});
```

## Notes

- The Workers runtime supports the entire Node.js `EventEmitter` API, including `captureRejections`.
- When an `'error'` event is emitted with no listener, the error is immediately thrown. The `process` `'uncaughtException'` event is currently not implemented in Workers, so always add an `'error'` listener to any `EventEmitter` instance.
- Node.js docs: https://nodejs.org/api/events.html#class-eventemitter

## Related

- [Node.js compatibility](./overview.md)
- [streams](./streams.md)
- [process](./process.md)

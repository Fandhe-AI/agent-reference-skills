---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/streams/
---

# Streams

The Node.js streams API (`node:stream`) is the original streaming API in JavaScript, predating the WHATWG ReadableStream standard. All streams are instances of `EventEmitter`.

## Signature / Usage

```js
import { Readable, Transform } from "node:stream";

import { text } from "node:stream/consumers";

import { pipeline } from "node:stream/promises";

// A Node.js-style Transform that converts data to uppercase
// and appends a newline to the end of the output.
class MyTransform extends Transform {
	constructor() {
		super({ encoding: "utf8" });
	}
	_transform(chunk, _, cb) {
		this.push(chunk.toString().toUpperCase());
		cb();
	}
	_flush(cb) {
		this.push("\n");
		cb();
	}
}

export default {
	async fetch() {
		const chunks = [
			"hello ",
			"from ",
			"the ",
			"wonderful ",
			"world ",
			"of ",
			"node.js ",
			"streams!",
		];

		function nextChunk(readable) {
			readable.push(chunks.shift());
			if (chunks.length === 0) readable.push(null);
			else queueMicrotask(() => nextChunk(readable));
		}

		// A Node.js-style Readable that emits chunks from the
		// array...
		const readable = new Readable({
			encoding: "utf8",
			read() {
				nextChunk(readable);
			},
		});

		const transform = new MyTransform();
		await pipeline(readable, transform);
		return new Response(await text(transform));
	},
};
```

## Notes

- Where possible, prefer the WHATWG standard Web Streams API, which Workers supports.
- Node.js docs: https://nodejs.org/api/stream.html

## Related

- [eventemitter](./eventemitter.md)
- [http](./http.md)
- [buffer](./buffer.md)

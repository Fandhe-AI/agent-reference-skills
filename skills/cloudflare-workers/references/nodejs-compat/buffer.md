---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/buffer/
---

# Buffer

`Buffer` extends `Uint8Array` and adds base64/hex encoding and decoding, byte-order manipulation, and encoding-aware substring searching.

## Signature / Usage

```js
import { Buffer } from "node:buffer";

const buf = Buffer.from("hello world", "utf8");

console.log(buf.toString("hex"));
// Prints: 68656c6c6f20776f726c64
console.log(buf.toString("base64"));
// Prints: aGVsbG8gd29ybGQ=
```

A Buffer can be used in any Workers API that accepts `Uint8Array`, such as a `Response`:

```js
const response = new Response(Buffer.from("hello world"));
```

With streams:

```js
const writable = getWritableStreamSomehow();
const writer = writable.getWriter();
writer.write(Buffer.from("hello world"));
```

## Notes

- Node.js allocates some `Buffer`s from a global memory pool; the Workers implementation does not use a pool and every `Buffer` is allocated independently.
- `Buffer.allocUnsafe()` uninitialized allocation is not supported; `Buffer` instances are always initialized and filled with null bytes (`0x00`).
- Node.js docs: https://nodejs.org/docs/latest/api/buffer.html

## Related

- [Node.js compatibility](./overview.md)
- [string-decoder](./string-decoder.md)

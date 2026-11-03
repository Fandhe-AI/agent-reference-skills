---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/string-decoder/
---

# StringDecoder

`node:string_decoder` is a legacy utility that predates the WHATWG `TextEncoder` / `TextDecoder` API.

## Signature / Usage

Adapted (not in the official docs): `require` is replaced by an ES module `import`; see Notes.

```js
import { StringDecoder } from "node:string_decoder";
import { Buffer } from "node:buffer";

const decoder = new StringDecoder("utf8");

const cent = Buffer.from([0xc2, 0xa2]);
console.log(decoder.write(cent));

const euro = Buffer.from([0xe2, 0x82, 0xac]);
console.log(decoder.write(euro));
```

## Notes

- Adapted from the official docs: the official snippet uses CommonJS `require`, which is not available in ES module Workers; it is written as an `import` (with `Buffer` imported explicitly) instead.
- In most cases use `TextEncoder` and `TextDecoder` instead; `StringDecoder` is available primarily for compatibility with npm packages that rely on it.
- Node.js docs: https://nodejs.org/api/string_decoder.html

## Related

- [buffer](./buffer.md)

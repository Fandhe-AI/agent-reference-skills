---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/string-decoder/
---

# StringDecoder

`node:string_decoder` is a legacy utility that predates the WHATWG `TextEncoder` / `TextDecoder` API.

## Signature / Usage

```js
const { StringDecoder } = require("node:string_decoder");
const decoder = new StringDecoder("utf8");

const cent = Buffer.from([0xc2, 0xa2]);
console.log(decoder.write(cent));

const euro = Buffer.from([0xe2, 0x82, 0xac]);
console.log(decoder.write(euro));
```

## Notes

- In most cases use `TextEncoder` and `TextDecoder` instead; `StringDecoder` is available primarily for compatibility with npm packages that rely on it.
- Node.js docs: https://nodejs.org/api/string_decoder.html

## Related

- [buffer](./buffer.md)

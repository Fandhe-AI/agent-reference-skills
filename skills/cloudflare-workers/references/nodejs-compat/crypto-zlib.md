---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/crypto/
---

# crypto and zlib

`node:crypto` (hash, HMAC, cipher, decipher, sign, verify wrappers) and `node:zlib` (Gzip, Deflate/Inflate, Brotli). Aggregated page: `node:crypto` is documented at the source URL above; `node:zlib` at https://developers.cloudflare.com/workers/runtime-apis/nodejs/zlib/.

## Signature / Usage

```js
import zlib from "node:zlib";
```

Snippet taken from https://developers.cloudflare.com/workers/runtime-apis/nodejs/zlib/ (the `crypto` page contains no code).

## Notes

- All `node:crypto` APIs are fully supported in Workers with these exceptions:
  - `generateKeyPair` and `generateKeyPairSync` do not support DSA or DH key pairs.
  - `argon2` and `argon2Sync` are not supported.
  - `randomUUIDv7` is not supported.
  - `ed448` and `x448` curves are not supported.
  - It is not possible to manually enable or disable FIPS mode.
- The Web Crypto API is also available in Workers and does not require the `nodejs_compat` compatibility flag.
- `node:zlib` provides compression implemented using Gzip, Deflate/Inflate, and Brotli.
- Full APIs: https://nodejs.org/api/crypto.html and https://nodejs.org/api/zlib.html

## Related

- [Node.js compatibility](./overview.md)
- [streams](./streams.md)

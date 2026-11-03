---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/dns/
---

# dns

`node:dns` provides name resolution via DNS over HTTPS using Cloudflare DNS at 1.1.1.1.

## Signature / Usage

Adapted (not in the official docs): the extra `"NS"` argument of the official example is removed; see Notes.

```js
import dns from "node:dns";

let response = await dns.promises.resolve4("cloudflare.com");
```

## Notes

- All `node:dns` functions are available, except `lookup`, `lookupService`, and `resolve`, which throw "Not implemented" errors when called.
- DNS requests execute a subrequest and count toward the Worker's subrequest limit.
- Status: partially supported.
- Corrected from the official docs: the official example calls `dns.promises.resolve4("cloudflare.com", "NS")`, but `resolve4` takes `(hostname[, options])` and resolves A records only; a record-type argument such as `"NS"` belongs to the unsupported `resolve`. The extra argument was removed.
- Node.js docs: https://nodejs.org/api/dns.html

## Related

- [Node.js compatibility](./overview.md)
- [net](./net.md)

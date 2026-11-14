---
source: https://developers.cloudflare.com/workers/testing/miniflare/
---

# Miniflare

Miniflare is a fully-local simulator for developing and testing Cloudflare Workers, written in TypeScript and backed by a local `workerd` process. Its API is for advanced use cases; most users should use Wrangler.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/testing/miniflare/get-started/#usage.

```js
import { Miniflare } from "miniflare";

const mf = new Miniflare({
	modules: true,
	script: `
  export default {
    async fetch(request, env, ctx) {
      return new Response("Hello Miniflare!");
    }
  }
  `,
});

const res = await mf.dispatchFetch("http://localhost:8787/");
console.log(await res.text()); // Hello Miniflare!
await mf.dispose();
```

## Notes

- Wrangler 4.162.0 depends on miniflare 5.20261113.0-beta while npm latest is 4.x (4.20260730.0). Baseline: Wrangler 4.156.2 depended on miniflare 5.20261102.0-beta.
- Most users should use Wrangler (`wrangler dev`) to build, run, and deploy Workers; the Miniflare API is only relevant for advanced use cases.
- Miniflare is not a hardened sandbox. Do not run untrusted or potentially malicious Worker code directly on your machine; run the whole development process inside a secure sandbox such as a virtual machine.
- The warning applies to default local execution with `wrangler dev`, `vite dev`, `vite preview`, direct Miniflare use, and Miniflare-based testing tools. Setting `remote: true` on a binding changes which resource your code accesses, but Worker code still executes locally. Legacy `wrangler dev --remote` executes Worker code on Cloudflare.
- Features: detailed logging, file watching and pretty error pages supporting source maps; supports most Workers features (KV, Durable Objects, WebSockets, modules and more); works without an Internet connection.
- Report undocumented differences from production Workers at https://github.com/cloudflare/workers-sdk/issues/new/choose.
- Package: https://npmjs.com/package/miniflare. Source: https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare.

## Related

- [get-started.md](./get-started.md)
- [writing-tests.md](./writing-tests.md)
- [fetch-events.md](./fetch-events.md)
- [migrating-from-v2.md](./migrating-from-v2.md)
- [kv.md](./kv.md)
- [test-harness-overview.md](./test-harness-overview.md)

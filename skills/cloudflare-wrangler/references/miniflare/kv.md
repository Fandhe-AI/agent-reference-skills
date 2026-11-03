---
source: https://developers.cloudflare.com/workers/testing/miniflare/storage/kv/
---

# KV (Miniflare)

Bind KV namespaces with `kvNamespaces` and read or write them from outside a Worker via `getKVNamespace`.

## Signature / Usage

```js
const mf = new Miniflare({
	kvNamespaces: ["TEST_NAMESPACE1", "TEST_NAMESPACE2"],
});
```

```js
export default {
	async fetch(request, env) {
		return new Response(await env.TEST_NAMESPACE1.get("key"));
	},
};
```

Manipulating outside Workers:

```js
import { Miniflare } from "miniflare";

const mf = new Miniflare({
	modules: true,
	script: `
  export default {
    async fetch(request, env, ctx) {
      const value = parseInt(await env.TEST_NAMESPACE.get("count")) + 1;
      await env.TEST_NAMESPACE.put("count", value.toString());
      return new Response(value.toString());
    },
  }
  `,
	kvNamespaces: ["TEST_NAMESPACE"],
});

const ns = await mf.getKVNamespace("TEST_NAMESPACE");
await ns.put("count", "1");

const res = await mf.dispatchFetch("http://localhost:8787/");
console.log(await res.text()); // 2
console.log(await ns.get("count")); // 2
```

## Notes

- Miniflare supports all KV operations and data types. Persist with `kvPersist` (see the Reference block in Get Started).
- KV API reference: https://developers.cloudflare.com/kv/api/

## Related

- [r2.md](./r2.md)
- [d1.md](./d1.md)
- [get-started.md](./get-started.md)
- [../commands/kv.md](../commands/kv.md)

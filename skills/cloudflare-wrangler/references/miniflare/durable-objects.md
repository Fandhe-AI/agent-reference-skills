---
source: https://developers.cloudflare.com/workers/testing/miniflare/storage/durable-objects/
---

# Durable Objects (Miniflare)

Bind Durable Object classes exported from the script, persist their data, and reach them from outside a Worker with `getDurableObjectNamespace`.

## Signature / Usage

```js
const mf = new Miniflare({
	modules: true,
	script: `
  export class Object1 {
    async fetch(request) {
      ...
    }
  }
  export default {
    fetch(request) {
      ...
    }
  }
  `,
	durableObjects: {
		// Note Object1 is exported from main (string) script
		OBJECT1: "Object1",
	},
});
```

Persistence (in memory by default):

```js
const mf = new Miniflare({
	durableObjectsPersist: true, // Defaults to ./.mf/do
	durableObjectsPersist: "./data", // Custom path
});
```

Manipulating outside Workers:

```js
import { Miniflare } from "miniflare";

const mf = new Miniflare({
	modules: true,
	durableObjects: { TEST_OBJECT: "TestObject" },
	script: `
  export class TestObject {
    constructor(state) {
      this.storage = state.storage;
    }

    async fetch(request) {
      const url = new URL(request.url);
      if (url.pathname === "/put") await this.storage.put("key", 1);
      return new Response((await this.storage.get("key")).toString());
    }
  }

  export default {
    async fetch(request, env) {
      const stub = env.TEST_OBJECT.getByName("test");
      return stub.fetch(request);
    }
  }
  `,
});

const ns = await mf.getDurableObjectNamespace("TEST_OBJECT");
const stub = ns.getByName("test");
const doRes = await stub.fetch("http://localhost:8787/put");
console.log(await doRes.text()); // "1"

const res = await mf.dispatchFetch("http://localhost:8787/");
console.log(await res.text()); // "1"
```

## Notes

- Using a class exported by another script: Miniflare supports the `script_name` option (the Reference block shows `API_OBJECT: { className: "ApiObject", scriptName: "api" }`); this requires mounting the other worker as described in the Multiple Workers page.
- The Durable Objects product (API and concepts) is covered by the cloudflare-stateful skill (https://developers.cloudflare.com/durable-objects/, API https://developers.cloudflare.com/durable-objects/api/).

## Related

- [multiple-workers.md](./multiple-workers.md)
- [get-started.md](./get-started.md)
- [test-harness-prepare-test-state.md](./test-harness-prepare-test-state.md)
- [../configuration/bindings-durable-objects.md](../configuration/bindings-durable-objects.md)

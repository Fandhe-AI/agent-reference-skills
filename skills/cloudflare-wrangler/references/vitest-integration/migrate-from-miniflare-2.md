---
source: https://developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2/
---

# Migrate from Miniflare 2's test environments

Replace `jest-environment-miniflare` / `vitest-environment-miniflare` with `@cloudflare/vitest-plugin`, which runs tests in `workerd` (the runtime powering Cloudflare Workers) using modern Miniflare.

## Signature / Usage

```sh
npm uninstall vitest-environment-miniflare
npm install --save-dev vitest@^4.1.0
npm install --save-dev @cloudflare/vitest-plugin
```

Configuration:

```diff
+ import { cloudflareTest } from "@cloudflare/vitest-plugin";
+ import { defineConfig } from "vitest/config";

- export default defineWorkersConfig({
-   test: {
-     environment: "miniflare",
-     environmentOptions: { ... },
-   },
- });
+ export default defineConfig({
+   plugins: [
+     cloudflareTest({
+       miniflare: { ... },
+       wrangler: { configPath: "./wrangler.jsonc" },
+     }),
+   ],
+ });
```

TypeScript types:

```diff
  {
    "compilerOptions": {
      ...,
      "types": [
				...
-       "vitest-environment-miniflare/globals"
+       "@cloudflare/vitest-plugin/types"
      ]
    },
  }
```

Bindings and storage isolation:

```diff
  import { it } from "vitest";
+ import { env } from "cloudflare:workers";

  it("does something", () => {
-   const env = getMiniflareBindings();
    // ...
  });
```

```diff
- const describe = setupMiniflareIsolatedStorage();
+ import { describe } from "vitest";
```

`waitUntil()`:

```diff
+ import { createExecutionContext, waitOnExecutionContext } from "cloudflare:test";

  it("does something", () => {
    // ...
-   const ctx = new ExecutionContext();
+   const ctx = createExecutionContext();
    const response = worker.fetch(request, env, ctx);
-   await getMiniflareWaitUntil(ctx);
+   await waitOnExecutionContext(ctx);
  });
```

Durable Object helpers:

```diff
+ import { env } from "cloudflare:workers";
+ import { runInDurableObject } from "cloudflare:test";

  it("does something", async () => {
-   const env = getMiniflareBindings();
    const id = env.OBJECT.newUniqueId();
+   const stub = env.OBJECT.get(id);

-   const storage = await getMiniflareDurableObjectStorage(id);
-   doSomethingWith(storage);
+   await runInDurableObject(stub, async (instance, state) => {
+     doSomethingWith(state.storage);
+   });

-   const state = await getMiniflareDurableObjectState(id);
-   doSomethingWith(state);
+   await runInDurableObject(stub, async (instance, state) => {
+     doSomethingWith(state);
+   });

-   const instance = await getMiniflareDurableObjectInstance(id);
-   await runWithMiniflareDurableObjectGates(state, async () => {
-     doSomethingWith(instance);
-   });
+   await runInDurableObject(stub, async (instance) => {
+     doSomethingWith(instance);
+   });
  });
```

```diff
+ import { env } from "cloudflare:workers";
+ import { runDurableObjectAlarm } from "cloudflare:test";

  it("does something", async () => {
-   const env = getMiniflareBindings();
    const id = env.OBJECT.newUniqueId();
-   await flushMiniflareDurableObjectAlarms([id]);
+   const stub = env.OBJECT.get(id);
+   const ran = await runDurableObjectAlarm(stub);
  });
```

```diff
+ import { env } from "cloudflare:workers";
+ import { listDurableObjectIds } from "cloudflare:test";

  it("does something", async () => {
-   const ids = await getMiniflareDurableObjectIds("OBJECT");
+   const ids = await listDurableObjectIds(env.OBJECT);
  });
```

## Notes

- Cloudflare no longer provides a Jest testing environment for Workers. Migrate to Vitest first (https://vitest.dev/guide/migration.html#migrating-from-jest).
- The Workers Vitest integration does not support the service worker format; migrate to ES modules format first.
- Most Miniflare options from `environmentOptions` move to the `miniflare` option of `cloudflareTest()`; set `wrangler.configPath` if you relied on a Wrangler file. See Miniflare `WorkerOptions` and the Miniflare 2 to 3 migration guide.
- Storage isolation is per test file by default; `setupMiniflareIsolatedStorage()` is no longer needed.
- `waitOnExecutionContext()` returns `Promise<void>`, not the results of all `waitUntil()`ed Promises.
- `getMiniflareFetchMock()` is removed; use `@msw/cloudflare` (see [mock-outbound-requests.md](./mock-outbound-requests.md)).
- `runInDurableObject()` consolidates `getMiniflareDurableObjectStorage()`, `getMiniflareDurableObjectState()`, `getMiniflareDurableObjectInstance()` and `runWithMiniflareDurableObjectGates()`. `runDurableObjectAlarm()` returns `true` if an alarm was scheduled and `alarm()` ran, else `false`; to "flush" multiple instances call it in a loop. `listDurableObjectIds()` takes a `DurableObjectNamespace` (not a string) and respects storage isolation.

## Related

- [test-apis.md](./test-apis.md)
- [configuration.md](./configuration.md)
- [write-your-first-test.md](./write-your-first-test.md)

---
source: https://developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-from-unstable-dev/
---

# Migrate from unstable_dev

Migrate integration tests from the `unstable_dev` API to the Workers Vitest integration. Cloudflare recommends `createTestHarness()` for integration testing.

## Signature / Usage

Before (`unstable_dev`):

Adapted (not in the official docs): test callback made `async` because it uses `await`; see Notes.

```js
import { unstable_dev } from "wrangler"

it("dispatches fetch event", async () => {
  const worker = await unstable_dev("src/index.ts");
  const resp = await worker.fetch("http://example.com");
  ...
})
```

After (Vitest integration):

```js
import { exports } from "cloudflare:workers";
import "../src/"; // Currently required to automatically rerun tests when `main` changes

it("dispatches fetch event", async () => {
	const response = await exports.default.fetch("http://example.com");
	...
});
```

Referencing the Wrangler config for all tests (`vitest.config.js`):

```js
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest({
			wrangler: {
				configPath: "wrangler.jsonc",
			},
		}),
	],
});
```

Types:

```diff
- import { unstable_dev } from "wrangler";
- import type { UnstableDevWorker } from "wrangler";
+ import worker from "src/index.ts";

  describe("Worker", () => {
-   let worker: UnstableDevWorker;
    ...
  });
```

## Notes

- `exports.default` refers to the default export defined by the `main` option in the Wrangler config; the `main` Worker runs in the same isolate as tests so global mocks apply.
- No need to call `worker.stop()`; it is handled automatically after tests run.
- The previous `unstable_dev` config option (`await unstable_dev("src/index.ts", { config: "wrangler.toml" });`) becomes `wrangler.configPath` in the Vitest config.
- Service worker format is not supported; migrate to ES modules first (https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/).
- Adapted from the official docs: the "Before" example's callback is `async` here; the official page uses `await` inside a non-async arrow function.
- Remove `UnstableDevWorker` imports; define types per write-your-first-test.

## Related

- [write-your-first-test.md](./write-your-first-test.md)
- [test-apis.md](./test-apis.md)

---
source: https://developers.cloudflare.com/workers/testing/unstable_startworker/
---

# Wrangler's unstable_startWorker() for testing

Deprecated: write integration tests by starting a Worker from a Wrangler config with `unstable_startWorker()`.

## Signature / Usage

```ts
import assert from "node:assert";
import test, { after, before, describe } from "node:test";
import { unstable_startWorker } from "wrangler";

describe("worker", () => {
	let worker;

	before(async () => {
		worker = await unstable_startWorker({ config: "wrangler.json" });
	});

	test("hello world", async () => {
		assert.strictEqual(
			await (await worker.fetch("http://example.com")).text(),
			"Hello world",
		);
	});

	after(async () => {
		await worker.dispose();
	});
});
```

## Notes

- `unstable_startWorker()` is deprecated. Cloudflare recommends `createTestHarness()` instead.
- It exposes the internals of the Wrangler dev server. Compared with using Miniflare directly, you can pass a Wrangler configuration file and it loads the configuration for you.
- The example uses `node:test` but applies to any framework.

## Related

- [test-harness-overview.md](./test-harness-overview.md)
- [writing-tests.md](./writing-tests.md)
- [../commands/api.md](../commands/api.md)

---
source: https://developers.cloudflare.com/workers/testing/miniflare/writing-tests/
---

# Miniflare Tests with node:test

Test a plain JavaScript Worker through `dispatchFetch()` using Node's built-in test runner.

`src/index.js`:

```js
export default {
	async fetch(request) {
		return new Response(`Hello World`);
	},
};
```

`src/index.test.js`:

```js
import assert from "node:assert";
import test, { after, before, describe } from "node:test";
import { Miniflare } from "miniflare";

describe("worker", () => {
	/**
	 * @type {Miniflare}
	 */
	let worker;

	before(async () => {
		worker = new Miniflare({
			modules: [
				{
					type: "ESModule",
					path: "src/index.js",
				},
			],
		});
		await worker.ready;
	});

	test("hello world", async () => {
		assert.strictEqual(
			await (await worker.dispatchFetch("http://example.com")).text(),
			"Hello World",
		);
	});

	after(async () => {
		await worker.dispose();
	});
});
```

Run it with `node --test`.

## Notes

- Miniflare does not read the Wrangler config; declare every binding in the options (for example `bindings: { FOO: "Hello Bindings" }`, `kvNamespaces: ["KV"]`) and read them with `await worker.getBindings()`.
- Only the Worker runs in `workerd`; test files run in Node.js, so individual functions cannot be unit tested. Cloudflare recommends the Vitest integration for unit tests and `createTestHarness()` for integration tests.
- The guide asks for Miniflare v3 (`miniflare@latest`).
- For TypeScript Workers, run a build first (for example `spawnSync("npx wrangler build -c wrangler-build.json", { shell: true, stdio: "pipe" })` in `before`).
- See [../references/miniflare/README.md](../references/miniflare/README.md).

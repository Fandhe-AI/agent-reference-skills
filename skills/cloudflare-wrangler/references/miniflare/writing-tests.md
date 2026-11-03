---
source: https://developers.cloudflare.com/workers/testing/miniflare/writing-tests/
---

# Writing tests with Miniflare

Write integration tests against Workers using the low-level Miniflare API (examples use `node:test`; any framework works).

## Signature / Usage

```sh
npm i -D miniflare@latest
```

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

Run with `node --test`.

### Interacting with bindings

```diff
...
describe("worker", () => {
	...
	before(async () => {
		worker = new Miniflare({
			...
+			bindings: {
+				FOO: "Hello Bindings",
+			},
		});
		...
	});

	test("text binding", async () => {
		const bindings = await worker.getBindings();
		assert.strictEqual(bindings.FOO, "Hello Bindings");
	});
	...
});
```

```diff
...
describe("worker", () => {
	...
	before(async () => {
		worker = new Miniflare({
			...
+			kvNamespaces: ["KV"],
		});
		...
	});

	test("kv binding", async () => {
		const bindings = await worker.getBindings();
		await bindings.KV.put("key", "value");
		assert.strictEqual(await bindings.KV.get("key"), "value");
	});
	...
});
```

### More complex Workers

```js
new Miniflare({
	modules: [
		{
			type: "ESModule",
			path: "src/index.js",
		},
		{
			type: "ESModule",
			path: "src/imported.js",
		},
	],
});
```

Miniflare can also crawl the module graph:

```js
new Miniflare({
	scriptPath: "src/index-with-imports.js",
	modules: true,
	modulesRules: [{ type: "ESModule", include: ["**/*.js"] }],
});
```

### Custom builds

Run your build tool before tests (e.g. in a `before` hook):

```js
before(() => {
	spawnSync("npx wrangler build -c wrangler-build.json", {
		shell: true,
		stdio: "pipe",
	});
});
```

## Notes

- Cloudflare recommends the Workers Vitest integration for unit tests and `createTestHarness()` for integration tests. Use Miniflare directly only when you need low-level simulator control not exposed by those APIs.
- Miniflare does not read Wrangler's config file; every binding the Worker uses must be specified in the Miniflare options.
- All access to the Worker goes through `dispatchFetch()`; individual Worker functions cannot be unit tested this way. Test files run in Node.js while only the Worker runs in `workerd`, so imported functions relying on `workerd`-specific behavior may behave differently.
- The page says to install "the latest version of Miniflare v3" but the command installs `miniflare@latest`.
- Test runner APIs (describe/it/expect): see the vitest skill.

## Related

- [get-started.md](./get-started.md)
- [test-harness-overview.md](./test-harness-overview.md)
- [unstable-startworker.md](./unstable-startworker.md)

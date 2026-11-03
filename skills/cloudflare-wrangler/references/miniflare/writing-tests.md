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

Adapted (not in the official docs): `wrangler build` was removed, so `wrangler deploy --dry-run --outdir dist` is used and the exit status is checked; see Notes.

```js
before(() => {
	const result = spawnSync(
		"npx wrangler deploy --dry-run --outdir dist -c wrangler-build.json",
		{
			shell: true,
			stdio: "pipe",
		},
	);
	if (result.status !== 0) {
		throw new Error(`wrangler build step failed: ${result.stderr}`);
	}
});
```

## Notes

- Cloudflare recommends the Workers Vitest integration for unit tests and `createTestHarness()` for integration tests. Use Miniflare directly only when you need low-level simulator control not exposed by those APIs.
- Miniflare does not read Wrangler's config file; every binding the Worker uses must be specified in the Miniflare options.
- All access to the Worker goes through `dispatchFetch()`; individual Worker functions cannot be unit tested this way. Test files run in Node.js while only the Worker runs in `workerd`, so imported functions relying on `workerd`-specific behavior may behave differently.
- Corrected from the official docs: the "Custom builds" example runs `wrangler build`, which was removed (see [deprecations.md](../configuration/deprecations.md): use your own build script or `wrangler deploy --dry-run --outdir=path/to/build`). The example now uses the latter and throws when the build exits non-zero; point Miniflare at the emitted output under `dist`.
- The page says to install "the latest version of Miniflare v3" but the command installs `miniflare@latest`.
- Test runner APIs (describe/it/expect): see the vitest skill.

## Related

- [get-started.md](./get-started.md)
- [test-harness-overview.md](./test-harness-overview.md)
- [unstable-startworker.md](./unstable-startworker.md)

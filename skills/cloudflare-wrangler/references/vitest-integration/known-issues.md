---
source: https://developers.cloudflare.com/workers/testing/vitest-integration/known-issues/
---

# Known issues

Known issues and workarounds for the Workers Vitest plugin.

## Signature / Usage

`additionalExports` workaround for missing `ctx.exports` properties:

```ts
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest({
			wrangler: { configPath: "./wrangler.jsonc" },
			additionalExports: {
				MyEntrypoint: "WorkerEntrypoint",
			},
		}),
	],
});
```

Module resolution workaround (`deps.optimizer`):

```ts
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest({
			// ...
		}),
	],
	test: {
		deps: {
			optimizer: {
				ssr: {
					enabled: true,
					include: ["your-package-name"],
				},
			},
		},
	},
});
```

Global setup wrapper (`global-setup-wrapper.ts`), then point `test.globalSetup: ["./global-setup-wrapper.ts"]` at it:

```ts
import { createServer } from "vite";

// Import the actual global setup file with the correct setup
const mod = await viteImport("./global-setup.ts");

export default mod.default;

// Helper to import the file with default node setup
async function viteImport(file: string) {
	const server = await createServer({
		root: import.meta.dirname,
		configFile: false,
		server: { middlewareMode: true, hmr: false, watch: null, ws: false },
		optimizeDeps: { noDiscovery: true },
		clearScreen: false,
	});
	const mod = await server.ssrLoadModule(file);
	await server.close();
	return mod;
}
```

Storage best practices:

```ts
// Await all storage operations
beforeAll(async () => {
	await env.KV.put("message", "test message");
	await env.R2.put("file", "hello-world");
});
```

```ts
// Explicitly signal resource disposal (RPC methods returning non-primitive values, e.g. RpcTarget)
using result = await stub.getCounter();
```

```ts
// Consume response bodies
test("check if file exists", async () => {
	await env.R2.put("file", "hello-world");
	const response = await env.R2.get("file");

	expect(response).not.toBe(null);
	// Consume the response body even if you are not asserting it
	await response.text();
});
```

## Options / Props

`additionalExports` map (key = export name, value = export type):

| Value | Meaning |
|-------|---------|
| `"WorkerEntrypoint"` | Export is a WorkerEntrypoint |
| `"DurableObject"` | Export is a Durable Object |
| `"WorkflowEntrypoint"` | Export is a WorkflowEntrypoint |

## Notes

- Coverage: native V8 code coverage is not supported; use Istanbul instrumented coverage (see Vitest Coverage documentation, https://vitest.dev/guide/coverage).
- Fake timers: Vitest fake timers do not apply to KV, R2 and cache simulators (e.g. you cannot expire a KV key by advancing fake time).
- Dynamic `import()` does not work inside `export default { ... }` handlers when using `exports.default.fetch()`, or inside Durable Object event handlers. Import and call handlers directly, or use static `import` in the global scope.
- WebSockets with Durable Objects are not supported with per-file storage isolation. Workaround: run with shared storage using `--max-workers=1 --no-isolate`.
- Storage isolation is per test file; the runner undoes storage writes at the end of each test file.
- `ctx.exports` is inferred by statically analyzing Worker source with esbuild; virtual modules or wildcard re-exports (e.g. `export * from "@virtual-module";`) can leave properties missing. Use `additionalExports`.
- Module resolution errors such as `Error: Cannot use require() to import an ES Module` or `Error: No such module` can be fixed by bundling dependencies with `deps.optimizer`.
- Global setup files run in Node.js, so packages that export a non-Node version for `workerd` (e.g. Postgres.js, https://github.com/cloudflare/workers-sdk/issues/6465) can fail to import there; use the wrapper above.
- The `additionalExports` option is not listed in the `CloudflareTestOptions` section of the configuration page (docs omission).

## Related

- [isolation-and-concurrency.md](./isolation-and-concurrency.md)
- [configuration.md](./configuration.md)
- [recipes.md](./recipes.md)

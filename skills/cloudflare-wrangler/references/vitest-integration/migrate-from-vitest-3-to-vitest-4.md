---
source: https://developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-from-vitest-3-to-vitest-4/
---

# Migrate from Vitest 3 to Vitest 4

Migrate `@cloudflare/vitest-pool-workers` from v0.12.x (Vitest 3) to v0.13.x (Vitest 4). v0.13.0 adds Vitest 4 support; v0.12.x is the last version to support Vitest 3.x and keeps working.

## Signature / Usage

Install Vitest 4 and the latest pool package (also requires `@vitest/runner` and `@vitest/snapshot` at `^4.1.0`, which ship as dependencies of `vitest`):

```sh
npm i -D vitest@^4.1.0 @cloudflare/vitest-pool-workers
```

Codemod for `vitest.config.ts`:

```sh
npx jscodeshift -t node_modules/@cloudflare/vitest-pool-workers/dist/codemods/vitest-v3-to-v4.mjs vitest.config.ts
```

Without installing the package first:

```sh
npx jscodeshift -t https://unpkg.com/@cloudflare/vitest-pool-workers/dist/codemods/vitest-v3-to-v4.mjs --parser=ts vitest.config.ts
```

Configuration before:

```ts
import { defineWorkersProject } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersProject({
	test: {
		poolOptions: {
			workers: {
				wrangler: { configPath: "./wrangler.jsonc" },
			},
		},
	},
});
```

After:

```ts
import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest({
			wrangler: { configPath: "./wrangler.jsonc" },
		}),
	],
});
```

Test file changes (manual):

```diff
- import { env, SELF } from "cloudflare:test";
+ import { env, exports } from "cloudflare:workers";

  it("dispatches fetch event", async () => {
-   const response = await SELF.fetch("https://example.com");
+   const response = await exports.default.fetch("https://example.com");
  });
```

## Notes

- This guide applies to `@cloudflare/vitest-pool-workers` version 0.x. To migrate to version 1, see [migrate-to-vitest-plugin.md](./migrate-to-vitest-plugin.md).
- v0.13.0 rearchitects the integration around a Vite plugin model (breaks the configuration API) and resolves: library imports needing SSR optimizer workarounds (e.g. Stripe); bare Node.js specifiers such as `node:url` in test files; `nodejs_compat_v2` and Node.js module flags now enabled automatically during tests; `provide` data channel no longer limited to ~8 KB (uses WebSocket messages); storage isolated per test file instead of per test; Vitest UI works with Workers tests.
- The codemod only updates `vitest.config.ts` and does not remove unsupported options. It cannot transform `defineWorkersConfig`, or `defineWorkersProject` called with a function; apply the change manually.
- `defineWorkersProject` and `defineWorkersConfig` from `@cloudflare/vitest-pool-workers/config` are removed; options formerly under `test.poolOptions.workers` are passed directly to `cloudflareTest()`.
- `isolatedStorage` and `singleWorker` are removed. Storage isolation is per test file. To share storage, pass `--max-workers=1 --no-isolate` to the Vitest command.
- `env` and `SELF` from `cloudflare:test` are deprecated in favor of `cloudflare:workers` (still work; change recommended). `exports.default.fetch()` behaves like `SELF.fetch()` except it does not expose Assets; use the `env.ASSETS` binding or an integration test with `createTestHarness()` (the official page names `startDevWorker()`, which is not a public Wrangler API; see [test-apis.md](./test-apis.md)).
- `fetchMock` from `cloudflare:test` is removed. Mock `globalThis.fetch` directly or use MSW (see [mock-outbound-requests.md](./mock-outbound-requests.md)).
- The page includes a coding-agent prompt (run the codemod; replace `SELF`/`env` imports; remove `fetchMock`; remove `isolatedStorage`/`singleWorker`; apply Vitest 4 breaking changes from https://vitest.dev/guide/migration#vitest-4).
- Docs inconsistency: the "After" example imports `cloudflareTest` from `@cloudflare/vitest-pool-workers` (correct for 0.13.x); after migrating to v1 the import is from `@cloudflare/vitest-plugin`.

## Related

- [migrate-to-vitest-plugin.md](./migrate-to-vitest-plugin.md)
- [write-your-first-test.md](./write-your-first-test.md)
- [configuration.md](./configuration.md)

---
source: https://developers.cloudflare.com/workers/testing/vitest-integration/write-your-first-test/
---

# Write your first test

Get started with `@cloudflare/vitest-plugin`: install, configure, define types, then write unit and integration tests.

## Signature / Usage

Prerequisites:

- Compatibility date is `2022-10-31` or later.
- Worker uses the ES modules format.
- Vitest and the plugin are installed as dev dependencies (the plugin requires Vitest 4.1 or later).

```sh
npm i -D vitest@^4.1.0 @cloudflare/vitest-plugin
```

Vitest configuration (`vitest.config.ts`):

```ts
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest({
			wrangler: { configPath: "./wrangler.jsonc" },
		}),
	],
});
```

Override or add configuration with the `miniflare` key (takes precedence over the Wrangler config):

```js
export default defineConfig({
	plugins: [
		cloudflareTest({
			wrangler: { configPath: "./wrangler.jsonc" },
			miniflare: {
				kvNamespaces: ["TEST_NAMESPACE"],
			},
		}),
	],
});
```

`test/tsconfig.json` types (run `wrangler types` first):

Adapted (not in the official docs): include path changed to the default `wrangler types` output location; see Notes.

```jsonc
{
	"extends": "../tsconfig.json",
	"compilerOptions": {
		"moduleResolution": "bundler",
		"types": [
			"@cloudflare/vitest-plugin/types", // provides `cloudflare:test` and `cloudflare:workers` types
		],
	},
	"include": [
		"./**/*.ts",
		"../worker-configuration.d.ts", // default output of `wrangler types`
	],
}
```

Worker under test (`src/index.ts`):

```ts
export default {
	async fetch(request, env, ctx): Promise<Response> {
		const { pathname } = new URL(request.url);
		if (pathname === "/404") {
			return new Response("Not found", { status: 404 });
		}
		return new Response("Hello World!");
	},
} satisfies ExportedHandler<Env>;
```

Unit test (`test/unit.spec.ts`):

```ts
import { env } from "cloudflare:workers";
import {
	createExecutionContext,
	waitOnExecutionContext,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
// Import your worker so you can unit test it
import worker from "../src";

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe("Hello World worker", () => {
	it("responds with not found and proper status for /404", async () => {
		const request = new IncomingRequest("http://example.com/404");
		// Create an empty context to pass to `worker.fetch()`
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		expect(response.status).toBe(404);
		expect(await response.text()).toBe("Not found");
	});
});
```

Integration test (`test/integration.spec.ts`):

```ts
import { exports } from "cloudflare:workers";
import { describe, it, expect } from "vitest";

describe("Hello World worker", () => {
	it("responds with not found and proper status for /404", async () => {
		const response = await exports.default.fetch("http://example.com/404");
		expect(response.status).toBe(404);
		expect(await response.text()).toBe("Not found");
	});
});
```

The JavaScript variants are identical apart from `const IncomingRequest = Request;` and the removal of type annotations.

## Notes

- Corrected from the official docs: the official page includes `../src/worker-configuration.d.ts`, but `wrangler types` without a path writes `./worker-configuration.d.ts` at the project root (see [workers-versions.md](../commands/workers-versions.md) `types`), so the include is `../worker-configuration.d.ts` relative to `test/tsconfig.json`. If you generate into `src/` with `wrangler types src/worker-configuration.d.ts`, keep the `../src/...` include instead.
- `exports.default.fetch()` runs the Worker in the same context as the test runner, so global mocks apply to it, but it uses the subtly different module resolution behavior provided by Vite.
- To run the Worker in a fresh environment as close to production as possible, use an auxiliary Worker (example: https://github.com/cloudflare/workers-sdk/blob/main/fixtures/vitest-plugin-examples/basics-integration-auxiliary/vitest.config.ts). Auxiliary Workers have limitations listed under `miniflare.workers` in [configuration.md](./configuration.md).
- Docs inconsistency: the original page links the auxiliary-Worker limitations to the anchor `#workerspooloptions` on the configuration page, which does not exist there; the limitations are under the `miniflare` option of `CloudflareTestOptions`.

## Related

- [configuration.md](./configuration.md)
- [test-apis.md](./test-apis.md)
- [recipes.md](./recipes.md)

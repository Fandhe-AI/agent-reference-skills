---
source: https://developers.cloudflare.com/workers/testing/vitest-integration/write-your-first-test/
---

# Vitest Unit and Integration Tests

Configure `@cloudflare/vitest-plugin` and write a unit test (`worker.fetch`) and an integration test (`exports.default.fetch`).

Install:

```sh
npm i -D vitest@^4.1.0 @cloudflare/vitest-plugin
```

`vitest.config.ts`:

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

`src/index.ts`:

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

`test/unit.spec.ts`:

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

`test/integration.spec.ts`:

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

## Notes

- Requires Vitest 4.1 or later, `compatibility_date` of `2022-10-31` or later, and an ES modules Worker. Vitest's own config and API belong to the `vitest` skill.
- Add `"@cloudflare/vitest-plugin/types"` to `types` in `test/tsconfig.json` to type `cloudflare:test` and `cloudflare:workers`.
- `exports.default.fetch()` runs the Worker in the same context as the test runner, so global mocks apply and Vite module resolution is used. It does not expose Assets.
- The `miniflare` option (for example `miniflare: { kvNamespaces: ["TEST_NAMESPACE"] }`) takes precedence over the Wrangler config.
- See [../references/vitest-integration/README.md](../references/vitest-integration/README.md).

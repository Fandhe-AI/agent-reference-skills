---
source: https://developers.cloudflare.com/workers/testing/test-harness/get-started/
---

# createTestHarness First Test

Run a Worker from its Wrangler config in a local server and assert on `server.fetch()`.

Create the harness:

```ts
import { createTestHarness } from "wrangler";

const server = createTestHarness({
	workers: [{ configPath: "./wrangler.jsonc" }],
});
```

Manage the lifecycle:

```ts
import { afterAll, afterEach, beforeAll } from "vitest";

beforeAll(async () => {
	// Start the server before all tests
	await server.listen();
});

afterEach(async () => {
	// Recreates storage and restores the original Worker options after each test
	await server.reset();
});

afterAll(async () => {
	// Close the server after all tests
	await server.close();
});
```

Write the test:

```ts
import { test } from "vitest";

test("responds", async ({ expect }) => {
	const response = await server.fetch("/");
	expect(await response.text()).toBe("Hello World");
});
```

Select a Wrangler environment (loads `env.test` instead of the top-level config):

```ts
const server = createTestHarness({
	workers: [{ configPath: "./wrangler.jsonc", env: "test" }],
});
```

## Notes

- The snippets come from two pages (get-started and configure); they are in one test file's order but kept as separate blocks.
- For Workers built by the Cloudflare Vite plugin, run `npx vite build` first and point `configPath` at the generated `./dist/<worker>/wrangler.json`.
- `server.debug()` prints the timeline and runtime logs; call it from `afterEach` when a test fails.
- See [../references/miniflare/README.md](../references/miniflare/README.md).

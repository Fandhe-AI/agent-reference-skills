---
source: https://developers.cloudflare.com/workers/testing/test-harness/get-started/
---

# Test harness: Get started

Write a basic integration test for a Worker built with Wrangler using `createTestHarness()` and Vitest.

## Signature / Usage

```ts
import { createTestHarness } from "wrangler";

const server = createTestHarness({
	workers: [{ configPath: "./wrangler.jsonc" }],
});
```

Lifecycle (single server reused for the suite, reset after each test):

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

First test:

```ts
import { test } from "vitest";

test("responds", async ({ expect }) => {
	const response = await server.fetch("/");
	expect(await response.text()).toBe("Hello World");
});
```

## Notes

- Prerequisites: a Worker project with a Wrangler configuration file, a Node.js test runner such as Vitest, and `wrangler` as a dev dependency.
- You can start a new server per test if tests do not share the same configuration.
- Test runner APIs (describe/it/expect): see the vitest skill.

## Related

- [test-harness-overview.md](./test-harness-overview.md)
- [test-harness-configure.md](./test-harness-configure.md)
- [test-harness-interact-with-workers.md](./test-harness-interact-with-workers.md)

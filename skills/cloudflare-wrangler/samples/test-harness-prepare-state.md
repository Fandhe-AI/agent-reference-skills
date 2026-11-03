---
source: https://developers.cloudflare.com/workers/testing/test-harness/prepare-test-state/
---

# createTestHarness Prepare Test State

Apply D1 migrations, seed rows, and mock an outbound `fetch()` in harness tests.

Adapted (not in the official docs): added the `vitest` import for `beforeEach`; see Notes.

```ts
import { beforeEach } from "vitest";

const apiWorker = server.getWorker<ApiEnv>("api-worker");

beforeEach(async () => {
	await apiWorker.applyD1Migrations("DATABASE");

	const env = await apiWorker.getEnv();
	await env.DATABASE.prepare(
		"INSERT INTO daily_reports (date, user_ids) VALUES (?, ?)",
	)
		.bind("2026-05-29", JSON.stringify(["123", "456"]))
		.run();
});
```

```ts
import { afterEach, test, vi } from "vitest";

afterEach(() => {
	vi.restoreAllMocks();
});

test("loads a user profile", async ({ expect }) => {
	vi.spyOn(globalThis, "fetch").mockImplementation(async (input, init) => {
		const request = new Request(input, init);

		if (request.url === "http://identity.example.com/profile/123") {
			return Response.json({ id: "123", name: "Ada" });
		}

		throw new Error(`Unexpected request: ${request.method} ${request.url}`);
	});

	const worker = server.getWorker();
	const response = await worker.fetch("/users/123");
	expect(await response.json()).toEqual({ id: "123", name: "Ada" });
});
```

## Notes

- `applyD1Migrations` reads `migrations_dir` / `migrations_pattern` from the Wrangler config, defaulting to `.sql` files in `migrations`. Call it after storage reset (`server.reset()`).
- Outbound Worker requests are proxied through Node's `globalThis.fetch`, so `vi.spyOn` or MSW can intercept them.
- Other helpers: `worker.getEnv()` for KV seeding, `worker.getDurableObjectStorage(binding, { name })` with `storage.exec(sql, ...params)`, and `bindingOverrides` to route a binding to a test Worker.
- `server` is created as in the first-test sample. `ApiEnv` is your own interface for the Worker's `Env` (typing `getEnv()`); the `vitest` import line is added to the official snippet, which omits it.
- See [../references/miniflare/README.md](../references/miniflare/README.md).

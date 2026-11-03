---
source: https://developers.cloudflare.com/workers/testing/test-harness/prepare-test-state/
---

# Test harness: Prepare test state

Seed local storage, apply D1 migrations, prepare Durable Object storage, mock outbound requests, and replace bindings with test Workers.

## Signature / Usage

Access configured bindings with `worker.getEnv()`:

```ts
const apiWorker = server.getWorker<ApiEnv>("api-worker");
const env = await apiWorker.getEnv();

await env.USERS.put("123", JSON.stringify({ name: "Ada" }));
```

Apply D1 migrations:

```ts
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

Prepare Durable Object storage:

```ts
const worker = server.getWorker<ApiEnv>("api-worker");
const storage = await worker.getDurableObjectStorage("COUNTER", {
	name: "user-123",
});

await storage.exec(
	"INSERT INTO counters (id, value) VALUES (?, ?)",
	"user-123",
	0,
);

await worker.fetch("/counter/user-123");

const rows = await storage.exec<{ value: number }>(
	"SELECT value FROM counters WHERE id = ?",
	"user-123",
);
expect(rows).toEqual([{ value: 1 }]);
```

Mock outbound requests:

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

Mock bindings with test Workers via `bindingOverrides`:

```ts
const server = createTestHarness({
	workers: [
		{
			configPath: "./workers/web/wrangler.jsonc",
			bindingOverrides: { BROWSER: "mock-browser" },
		},
		// The test Worker (mock-browser) that replaces the Browser Rendering binding
		{ configPath: "./workers/mock-browser/wrangler.jsonc" },
	],
});

// Access the test Worker to configure its behavior or assert its state.
const mockBrowser = await server
	.getWorker<unknown, typeof import("../workers/mock-browser")>("mock-browser")
	.getExport();

// Configure the screenshot to be returned through the overridden binding.
await mockBrowser.setScreenshot([137, 80, 78, 71]);

const response = await server.fetch("/reports/2026-05-29.png");
expect(await response.bytes()).toEqual(Uint8Array.from([137, 80, 78, 71]));
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| worker.getEnv() | () => Promise<Env> | Returns variables, secrets, and bindings configured for the Worker |
| worker.applyD1Migrations(bindingName) | string | Reads migration settings (`migrations_dir`, `migrations_pattern`) from Wrangler config; defaults to `.sql` files in `migrations` relative to the config |
| worker.getDurableObjectStorage(bindingOrClass, { name \| id }) | handle with `exec(sql, ...params)` | SQL access to a SQLite-backed Durable Object instance |
| worker.getExport() | () => Promise<exports> | Default export of a test Worker (JSRPC methods) |
| bindingOverrides | { [BINDING]: workerName } | Routes the binding to a test Worker in the harness |

## Notes

- The harness proxies outbound `fetch()` from Workers through `globalThis.fetch()` in the Node environment, so it can be mocked with `vi.spyOn()` or MSW.
- Call `applyD1Migrations()` after storage is reset so migrations that have not already run are applied.
- Test runner APIs (describe/it/expect): see the vitest skill.

## Related

- [test-harness-configure.md](./test-harness-configure.md)
- [test-harness-integrations.md](./test-harness-integrations.md)
- [test-harness-interact-with-workers.md](./test-harness-interact-with-workers.md)
- [d1.md](./d1.md)
- [durable-objects.md](./durable-objects.md)

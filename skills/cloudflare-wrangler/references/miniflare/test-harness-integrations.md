---
source: https://developers.cloudflare.com/workers/testing/test-harness/integrations/
---

# Test harness: Integrations

Use `createTestHarness()` with Mock Service Worker (MSW) and Playwright.

## Signature / Usage

Mock Service Worker: start MSW before tests, reject unhandled requests, reset handlers after each test.

```ts
import { afterAll, afterEach, beforeAll, test } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { createTestHarness } from "wrangler";

const network = setupServer();
const server = createTestHarness({
	workers: [{ configPath: "./wrangler.jsonc" }],
});

beforeAll(async () => {
	network.listen({ onUnhandledRequest: "error" });
	await server.listen();
});

afterEach(async () => {
	network.resetHandlers();
	await server.reset();
});

afterAll(async () => {
	network.close();
	await server.close();
});

test("loads a user profile", async ({ expect }) => {
	network.use(
		http.get("http://identity.example.com/profile/:id", ({ params }) => {
			return HttpResponse.json({ id: params.id, name: "Ada" });
		}),
	);

	const worker = server.getWorker();
	const response = await worker.fetch("/users/123");
	expect(await response.json()).toEqual({ id: "123", name: "Ada" });
});
```

Playwright fixture (sets `baseURL`, exposes MSW and the harness, resets after each test):

```ts
import { test as base, expect } from "@playwright/test";
import { http, HttpResponse } from "msw";
import { setupServer, type SetupServerApi } from "msw/node";
import { createTestHarness, type TestHarness } from "wrangler";

type TestFixtures = {
	reset: void;
};

type WorkerFixtures = {
	network: SetupServerApi;
	server: TestHarness;
};

const test = base.extend<TestFixtures, WorkerFixtures>({
	network: [
		async ({}, use) => {
			const network = setupServer();
			network.listen({ onUnhandledRequest: "error" });
			await use(network);
			network.close();
		},
		{ scope: "worker" },
	],

	server: [
		async ({}, use) => {
			const server = createTestHarness({
				workers: [
					{ configPath: "./dist/web_worker/wrangler.json" },
					{ configPath: "./dist/api_worker/wrangler.json" },
				],
			});

			await server.listen();
			await use(server);
			await server.close();
		},
		{ scope: "worker" },
	],

	baseURL: async ({ server }, use) => {
		const { url } = await server.listen();
		await use(url.href);
	},

	reset: [
		async ({ network, server }, use, testInfo) => {
			await use();

			if (testInfo.status !== testInfo.expectedStatus) {
				server.debug();
			}

			network.resetHandlers();
			await server.reset();
		},
		{ auto: true },
	],
});

test("renders a user profile", async ({ page, network }) => {
	network.use(
		http.get("http://identity.example.com/profile/:id", ({ params }) => {
			return HttpResponse.json({ id: params.id, name: "Ada" });
		}),
	);

	await page.goto("/users/123");
	await expect(page.getByText("Profile: Ada")).toBeVisible();
});
```

## Notes

- MSW intercepts the Worker's outbound `fetch()` requests (the harness proxies them through Node's `fetch`); Playwright verifies end-to-end browser flows.
- Test runner APIs (describe/it/expect): see the vitest skill.

## Related

- [test-harness-prepare-test-state.md](./test-harness-prepare-test-state.md)
- [test-harness-configure.md](./test-harness-configure.md)
- [test-harness-overview.md](./test-harness-overview.md)

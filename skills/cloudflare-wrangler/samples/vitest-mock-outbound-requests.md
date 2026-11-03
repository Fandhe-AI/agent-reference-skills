---
source: https://developers.cloudflare.com/workers/testing/vitest-integration/mock-outbound-requests/
---

# Vitest Mock Outbound Requests with MSW

Mock a Worker's outbound `fetch()` with `@msw/cloudflare` in Vitest tests.

Install:

```sh
npm i -D msw@^3.0.0 @msw/cloudflare
```

`test/network.ts`:

```ts
import { setupNetwork } from "@msw/cloudflare";

export const network = setupNetwork();
```

`test/setup.ts` (add it to `setupFiles` in the Vitest config):

```ts
import { afterAll, afterEach, beforeAll } from "vitest";
import { network } from "./network";

beforeAll(() => network.enable());
afterEach(() => network.resetHandlers());
afterAll(() => network.disable());
```

`src/index.ts`:

```ts
export default {
	async fetch(): Promise<Response> {
		return fetch("https://api.example.com/greeting");
	},
} satisfies ExportedHandler;
```

`test/worker.test.ts`:

```ts
import {
	createExecutionContext,
	waitOnExecutionContext,
} from "cloudflare:test";
import { env } from "cloudflare:workers";
import { http, HttpResponse } from "msw";
import { expect, it } from "vitest";
import worker from "../src";
import { network } from "./network";

it("mocks an outbound request", async () => {
	network.use(
		http.get("https://api.example.com/greeting", () => {
			return HttpResponse.json({ message: "Hello" });
		}),
	);

	const ctx = createExecutionContext();
	const response = await worker.fetch(
		new Request("https://example.com"),
		env,
		ctx,
	);
	await waitOnExecutionContext(ctx);
	expect(await response.json()).toEqual({ message: "Hello" });
});
```

## Notes

- Requires MSW 3 or later. Works for unit tests (`worker.fetch`) and integration tests (`exports.default.fetch()`).
- Outbound WebSockets are mocked with MSW's `ws.link()`; see the `request-mocking` fixture in the `workers-sdk` repository.
- For `createTestHarness()` tests, outbound requests are instead proxied through Node's `globalThis.fetch` (see the test harness state sample).
- See [../references/vitest-integration/README.md](../references/vitest-integration/README.md).

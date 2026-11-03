---
source: https://developers.cloudflare.com/workers/testing/vitest-integration/mock-outbound-requests/
---

# Mock outbound requests

Use `@msw/cloudflare` to mock outbound HTTP and WebSocket requests with `@cloudflare/vitest-plugin`, in both unit tests (calling the exported handler) and integration tests (`exports.default.fetch()`).

## Signature / Usage

Install MSW version 3 or later and the Cloudflare integration:

```sh
npm i -D msw@^3.0.0 @msw/cloudflare
```

Shared network mock (`test/network.ts`):

```ts
import { setupNetwork } from "@msw/cloudflare";

export const network = setupNetwork();
```

Setup file (`test/setup.ts`; add it to `setupFiles` in the Vitest configuration):

```ts
import { afterAll, afterEach, beforeAll } from "vitest";
import { network } from "./network";

beforeAll(() => network.enable());
afterEach(() => network.resetHandlers());
afterAll(() => network.disable());
```

Worker (`src/index.ts`):

```ts
export default {
	async fetch(): Promise<Response> {
		return fetch("https://api.example.com/greeting");
	},
} satisfies ExportedHandler;
```

Test (`test/worker.test.ts`):

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

- Use `network.use()` with MSW request handlers to return a response for an outbound request.
- For a WebSocket, use MSW's `ws.link()` API. The request-mocking fixture (https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/request-mocking) includes HTTP, `exports.default.fetch()`, and WebSocket examples.
- Replaces `fetchMock` from `cloudflare:test` and `getMiniflareFetchMock()`; see the migration pages.

## Related

- [migrate-from-vitest-3-to-vitest-4.md](./migrate-from-vitest-3-to-vitest-4.md)
- [migrate-from-miniflare-2.md](./migrate-from-miniflare-2.md)
- [test-apis.md](./test-apis.md)

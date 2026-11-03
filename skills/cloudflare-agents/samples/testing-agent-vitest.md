---
source: https://developers.cloudflare.com/agents/getting-started/testing-your-agent/
---

# Testing an Agent with Vitest

Test an Agent's HTTP responses with Vitest and the Workers test plugin, and run it locally with `wrangler dev`.

## Signature / Usage

```sh
npm install vitest@^4.1.0 @cloudflare/vitest-plugin --save-dev
```

`vitest.config.js`:

```js
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

Adapted (not in the official docs): a minimal Agent and Wrangler config added so the test below has something to call (the page assumes an existing `MyAgent` that returns `{ hello: "from your agent" }`); its `fetch` takes `(request, env, ctx)` to match the test's three-argument call.

```jsonc
{
	"name": "my-agent",
	"main": "src/index.ts",
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat"],
	"durable_objects": {
		"bindings": [{ "name": "MyAgent", "class_name": "MyAgent" }],
	},
	"migrations": [{ "tag": "v1", "new_sqlite_classes": ["MyAgent"] }],
}
```

```ts
import { Agent, routeAgentRequest } from "agents";

export class MyAgent extends Agent<Env> {
	async onRequest(request: Request): Promise<Response> {
		return Response.json({ hello: "from your agent" });
	}
}

export default {
	// The test calls fetch(request, env, ctx), so the handler declares all three parameters.
	async fetch(request: Request, env: Env, _ctx: ExecutionContext) {
		return (
			(await routeAgentRequest(request, env)) ||
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

Adapted (not in the official docs): the unused `Env` / `ProvidedEnv` imports were removed (see Notes). `test/index.spec.ts`:

```ts
import { env, exports } from "cloudflare:workers";
import {
	createExecutionContext,
	waitOnExecutionContext,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
import worker from "../src";

describe("make a request to my Agent", () => {
	// Unit testing approach
	it("responds with state", async () => {
		// Provide a valid URL that your Worker can use to route to your Agent
		// If you are using routeAgentRequest, this will be /agents/:agent/:name
		const request = new Request<unknown, IncomingRequestCfProperties>(
			"http://example.com/agents/my-agent/agent-123",
		);
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		expect(await response.json()).toEqual({ hello: "from your agent" });
	});

	it("also responds with state", async () => {
		const request = new Request("http://example.com/agents/my-agent/agent-123");
		const response = await exports.default.fetch(request);
		expect(await response.json()).toEqual({ hello: "from your agent" });
	});
});
```

Run the tests, or run the Agent locally:

```sh
npx vitest
npx wrangler dev
```

## Notes

- Corrected from the official docs: the page imports `Env` as a value (`import { Env } from "../src"`) and declares an unused `ProvidedEnv`; the global `Env` from `wrangler types` is used instead, and both lines were dropped.
- With `routeAgentRequest` the URL is `/agents/:agent/:name`; the agent segment is the kebab-case class name (`MyAgent` -> `my-agent`).
- `wrangler dev` runs the Agent in local Miniflare/workerd, which is not a hardened sandbox; do not run untrusted Worker code that way.
- Tests above use the unauthenticated `routeAgentRequest`; if you add `onBeforeRequest` authentication, send a valid test credential in the request.

## Related

- [Routing authentication](../references/runtime/routing-authentication.md)
- [Lifecycle](../references/runtime/lifecycle.md)

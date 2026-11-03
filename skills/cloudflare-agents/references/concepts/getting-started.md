---
source: https://developers.cloudflare.com/agents/getting-started/, https://developers.cloudflare.com/agents/getting-started/quick-start/, https://developers.cloudflare.com/agents/getting-started/learn-the-runtime/, https://developers.cloudflare.com/agents/getting-started/add-to-existing-project/, https://developers.cloudflare.com/agents/getting-started/testing-your-agent/
---

# Getting started

Four paths: build a first Durable Agent (Pi harness), learn the bare runtime with a counter, add the Lifecycle to an existing Durable Object, and test agents with Vitest.

## Signature / Usage

Create a project and install (quick start with the Pi harness and Cloudflare Computer; Node.js 22.19 or later):

```sh
npm create cloudflare@latest -- my-agent --type=hello-world --lang=ts
cd my-agent
npm i agents @earendil-works/pi-durable @earendil-works/pi-ai @earendil-works/chord @cloudflare/computer
```

Wrangler configuration (Workers AI binding and a SQLite-backed Durable Object):

```jsonc
{
	"name": "my-agent",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat"],
	"ai": {
		"binding": "AI",
	},
	"durable_objects": {
		"bindings": [{ "name": "Assistant", "class_name": "Assistant" }],
	},
	"exports": {
		"Assistant": { "type": "durable-object", "storage": "sqlite" },
	},
}
```

Quick start agent: Pi harness, workspace tools, and WebSockets in one Durable Object:

```ts
import { DurableObject } from "cloudflare:workers";
import { Workspace } from "@cloudflare/computer";
import { createPiTools } from "@cloudflare/computer/tools/pi-ai";
import { createModels } from "@earendil-works/pi-ai/models";
import { createRegistry, Harness } from "@earendil-works/pi-durable";
import { PiHarness } from "agents/harness/pi";
import { Lifecycle } from "agents/lifecycle";
import { createAI } from "agents/models/pi-ai";
import { routeAgentRequest } from "agents/routing";
import { WebSockets } from "agents/websockets";

export class Assistant extends DurableObject<Env> {
	readonly ai = createAI({ binding: this.env.AI });
	readonly registry = createRegistry();

	// Tools: a durable filesystem in the object's SQLite database
	readonly workspace = new Workspace({ storage: this.ctx.storage });

	// Harness: the Pi agent loop, with the workspace as its tools
	readonly harness = new PiHarness({
		harness: ({ storage, context, onWake }) => {
			const { tools, execute } = createPiTools({ workspace: this.workspace });
			this.registry.install({
				name: "workspace",
				tools: tools.map((tool) => ({
					...tool,
					async execute(args, api, ctx) {
						const { content, isError } = await execute(
							{ id: api.callId, name: tool.name, arguments: args },
							{ abortSignal: ctx.abortSignal },
						);
						return { output: content, isError };
					},
				})),
			});
			const models = createModels();
			models.setProvider(this.ai.provider);
			return Harness.open(
				storage,
				{ models, registry: this.registry, onWake },
				context,
			);
		},
		defaults: { model: this.ai("@cf/zai-org/glm-5.3-flash") },
	});

	// Capability: clients send prompts and get replies over WebSockets
	readonly webSockets = new WebSockets({
		handlers: {
			onMessage: async (connection, message) => {
				const { text } = await this.harness.prompt(String(message));
				connection.send(text ?? "");
			},
		},
	});

	// Runtime: the Lifecycle starts the harness and the capabilities, and
	// handles the object's fetch, alarm, and WebSocket events
	readonly lifecycle = Lifecycle.install(this)
		.use(this.harness)
		.use(this.webSockets);

	async onRequest(request: Request): Promise<Response> {
		if (request.method !== "POST") {
			return Response.json(await this.harness.messages());
		}
		const { status, text } = await this.harness.prompt(await request.text());
		return Response.json({ status, text });
	}
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		return (
			(await routeAgentRequest(request, env)) ??
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

Run locally and talk to it:

```sh
npx wrangler types
npx wrangler dev
curl -X POST http://localhost:8787/agents/assistant/demo \
  -d "What is 47 times 19? Reply with the number only."
npx wscat -c ws://localhost:8787/agents/assistant/demo
```

Learn the runtime: a counter with `State` and `WebSockets` (no harness):

```ts
import { DurableObject, RpcTarget } from "cloudflare:workers";
import { routeAgentRequest } from "agents";
import { Lifecycle } from "agents/lifecycle";
import { State } from "agents/state";
import { WebSockets } from "agents/websockets";

export type CounterState = { count: number };

export class Counter extends DurableObject<Env> {
	// Durable state, stored in the object's SQLite database
	readonly state: State<CounterState> = new State({
		initialState: { count: 0 },
		onChanged: (_state, source) => this.webSockets.broadcastState(source),
	});

	// WebSocket connections. Each client receives the state, and can
	// call the methods on CounterMethods.
	readonly webSockets: WebSockets = new WebSockets({
		state: this.state,
		callables: new CounterMethods(this),
	});

	// The lifecycle starts each capability inside the Durable Object
	readonly lifecycle = Lifecycle.install(this)
		.use(this.state)
		.use(this.webSockets);

	increment(): number {
		const count = (this.state.get()?.count ?? 0) + 1;
		this.state.set({ count });
		return count;
	}

	onRequest(request: Request): Response {
		if (request.method === "POST") {
			return Response.json({ count: this.increment() });
		}
		return Response.json(this.state.get());
	}
}

// The methods that clients can call over a WebSocket
class CounterMethods extends RpcTarget {
	readonly #counter: Counter;

	constructor(counter: Counter) {
		super();
		this.#counter = counter;
	}

	increment(): number {
		return this.#counter.increment();
	}

	reset(): void {
		this.#counter.state.set({ count: 0 });
	}
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		return (
			(await routeAgentRequest(request, env)) ??
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

Client (`AgentClient` from `agents/client`):

```js
import { AgentClient } from "agents/client";

const counter = new AgentClient({
	agent: "Counter",
	name: "demo",
	host: "localhost:8787",
	onStateUpdate: (state) => console.log("count is now", state.count),
});

await counter.ready;
await counter.stub.increment();
await counter.stub.increment();
counter.close();
```

Add to an existing project: convert a Durable Object (constructor setup to `onStart()`, `fetch()` to `onRequest()`), then add capabilities and route only agent bindings:

Adapted (not in the official docs): `add()` and `remindLater()` are public RPC methods that touch the `notes` table or the `Scheduler`, so they now call `await this.lifecycle.start()` first (RPC does not start the Lifecycle), and `add()` is async with awaiting callers; see Notes.

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { Scheduler } from "agents/schedules";

export class Notes extends DurableObject<Env> {
	readonly scheduler = new Scheduler({
		callbacks: {
			remind: async (payload: { text: string }) => {
				await this.add(`Reminder: ${payload.text}`);
			},
		},
	});

	readonly lifecycle = Lifecycle.install(this).use(this.scheduler);

	onStart(): void {
		this.ctx.storage.sql.exec(
			"CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, text TEXT NOT NULL)",
		);
	}

	async add(text: string): Promise<void> {
		// RPC calls do not go through fetch, so start the lifecycle first
		await this.lifecycle.start();
		this.ctx.storage.sql.exec("INSERT INTO notes (text) VALUES (?)", text);
	}

	async list(): Promise<string[]> {
		// RPC calls do not go through fetch, so start the lifecycle first
		await this.lifecycle.start();
		return this.ctx.storage.sql
			.exec<{ text: string }>("SELECT text FROM notes ORDER BY id")
			.toArray()
			.map((row) => row.text);
	}

	async remindLater(text: string, seconds: number): Promise<void> {
		// RPC calls do not go through fetch, so start the lifecycle first
		await this.lifecycle.start();
		await this.scheduler.set(seconds, "remind", { text });
	}

	async onRequest(request: Request): Promise<Response> {
		if (request.method === "POST") {
			await this.add(await request.text());
		}
		return Response.json(await this.list());
	}
}
```

```ts
import { routeAgentRequest } from "agents";

export { Notes } from "./notes";

// routeAgentRequest() matches every Durable Object binding in env.
// Only serve the ones that run the lifecycle.
const AGENT_BINDINGS = new Set(["NOTES"]);

function onlyAgents(_request: Request, route: { className: string }) {
	if (!AGENT_BINDINGS.has(route.className)) {
		return new Response("Not found", { status: 404 });
	}
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const agentResponse = await routeAgentRequest(request, env, {
			onBeforeRequest: onlyAgents,
			onBeforeConnect: onlyAgents,
		});
		if (agentResponse) return agentResponse;

		// Your existing routes
		return new Response("Not found", { status: 404 });
	},
} satisfies ExportedHandler<Env>;
```

Testing with Vitest and the Workers test pool:

Adapted (not in the official docs): the official test imported `Env` from `../src` and a `ProvidedEnv` interface that the test never used; this version drops them; see Notes.

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

## Options / Props

Add-to-existing conversion table:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Constructor setup (`blockConcurrencyWhile()`) | existing code | — | Move to `onStart()`; runs once each time the object starts, other events held until done. |
| `fetch(request)` | existing code | — | Move to `onRequest(request)`; receives every request no capability handled. |
| `alarm()` / `ctx.storage.setAlarm()` | existing code | — | Use the `Scheduler` capability or `onAlarm()`; the Lifecycle owns the alarm. |
| `webSocketMessage()`, `webSocketClose()`, `webSocketError()` | existing code | — | Use the `WebSockets` capability handlers. |

Capabilities and imports:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `State` | `agents/state` | — | One JSON value in SQLite, optionally synced. |
| `WebSockets` | `agents/websockets` | — | Hibernating connections for `useAgent` / `AgentClient`. |
| `Scheduler` | `agents/schedules` | — | Delayed, dated, interval, cron schedules. |
| `MCPClientManager` | `agents/mcp/client` | — | Remote MCP server connections. |
| `PiHarness` | `agents/harness/pi` | — | Pi agent loop with durable sessions. |

## Notes

- Adapted from the official docs: `Notes.add()` and `Notes.remindLater()` start the Lifecycle before touching the `notes` table or `this.scheduler` (RPC calls bypass `fetch()`, see the Runtime Lifecycle page, so a cold first `stub.add()` would otherwise fail); `add()` is async, so its callers (the `remind` callback and `onRequest()`) await it. Also, the quick start and `Counter` examples expose unauthenticated routes and WebSocket callables, and `Notes.add()` is a public RPC method; they are intentionally minimal, so add a Worker-side caller check (Routing authentication) before exposing them.
- Adapted from the official docs: the testing example's `import { Env } from "../src"` (Env is a global generated by `wrangler types`) and the unused `ProvidedEnv` interface were removed. The `expect(...).toEqual({ hello: "from your agent" })` assertions are the page's illustrative agent output; match them to your own agent. The quick start and counter pages each show JS and TS variants; only TS is kept.
- The quick start uses the Workers AI `AI` binding, which always runs remotely, so `wrangler dev` asks you to log in the first time. `status` is `done` when the model answered, `unanswered` when the run failed or was stopped. Different names (`/agents/assistant/another-name`) reach different agents with separate transcripts.
- `WebSockets` accepts every upgrade; HTTP still reaches `onRequest()`. The first WebSocket frame is the identity frame (`cf_agent_identity`), which `useAgent` and `AgentClient` read for you.
- Anyone who knows the agent URL can talk to it (and, in the quick start, spend model quota). Check the caller in your Worker before sharing; see Routing authentication.
- `agents` requires `nodejs_compat`. The Lifecycle keeps its job queue in SQLite, so it does not run on a KV-backed Durable Object; objects must be addressed by name (`getByName()` / `idFromName()`). Use `exports` OR the legacy `migrations` array (`{ "tag": "v2", "new_sqlite_classes": ["Notes"] }`), not both.
- If the class keeps its own `fetch()`, `alarm()`, `webSocketMessage()`, `webSocketClose()`, or `webSocketError()`, the Lifecycle never installs its handler; remove them. Do not call `ctx.storage.setAlarm()` or `deleteAlarm()`.
- Serving `/agents/*` next to static assets: add `"assets": { "directory": "./public", "run_worker_first": ["/agents/*"] }`. With Hono, `agentsMiddleware()` from `hono-agents` calls `routeAgentRequest()`. A binding `NOTES` is served at `/agents/notes/{name}`; without the `onlyAgents` hooks `routeAgentRequest()` would forward to every Durable Object binding in `env`.
- The SDK adds tables with the `cf_agents_` prefix and storage keys with `cf_agents:`; the Pi harness uses `pi_`. Existing data is untouched.
- Counter notes: each name is a separate agent; `State` writes survive restarts; clients may also call `agent.setState()` — guard with `validateStateChange` or readonly connections. In React, `useAgent<CounterState>({ agent: "Counter", name: "demo" })` gives `agent.state` and `agent.stub.increment()`.
- Testing: new Workers projects already include `vitest` and `@cloudflare/vitest-plugin`; otherwise `npm install vitest@^4.1.0 @cloudflare/vitest-plugin --save-dev`. `npx wrangler dev` runs the same runtime locally (Miniflare). Details of the Vitest integration and Wrangler: cloudflare-wrangler.
- Pi harness and Cloudflare Computer (workspace) are documented in pi.md (https://developers.cloudflare.com/agents/harnesses/pi/) and filesystem.md (https://developers.cloudflare.com/agents/tools/filesystem/).

## Related

- [Runtime overview](../runtime/overview.md)
- [Lifecycle](../runtime/lifecycle.md)
- [Routing authentication](../runtime/routing-authentication.md)
- [WebSockets](../runtime/websockets.md)
- [State](../runtime/state.md)

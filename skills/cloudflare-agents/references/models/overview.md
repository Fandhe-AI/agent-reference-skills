---
source: https://developers.cloudflare.com/agents/models/
---

# Models overview

The Agents SDK ships model providers for Workers AI and AI Gateway: one `createAI` factory per framework, over the Worker's `AI` binding or an account id and API token. This page also covers calling models from a Durable Object agent, streaming over WebSockets, calling the binding directly, and OpenAI-compatible endpoints.

## Signature / Usage

Model naming:

```ts
ai("@cf/zai-org/glm-5.3-flash"); // Workers AI
ai("anthropic/claude-opus-5.5"); // AI Gateway catalog
ai("dynamic/support"); // AI Gateway dynamic route
ai(anthropic("claude-opus-5-5")); // the vendor's own model object
```

Binding and account-id connection:

```jsonc
{
	"ai": {
		"binding": "AI",
	},
}
```

```ts
const ai = createAI({
	accountId: "<ACCOUNT_ID>",
	apiToken: env.CLOUDFLARE_API_TOKEN,
	gateway: "my-gateway",
});
```

Generate text from a Durable Object agent:

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { generateText } from "ai";
import { createAI } from "agents/models/ai-sdk";

interface Env {
	AI: Ai;
}

export class MyAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install(this);

	async onRequest(request: Request): Promise<Response> {
		const ai = createAI({ binding: this.env.AI });
		const { text } = await generateText({
			model: ai("anthropic/claude-opus-5.5"),
			prompt: "Build me an AI agent on Cloudflare Workers",
		});

		return Response.json({ modelResponse: text });
	}
}
```

Route requests to the agent (default URL shape `/agents/:binding/:name`):

```ts
import { routeAgentRequest } from "agents";

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		return (
			(await routeAgentRequest(request, env)) ??
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

Stream over WebSockets (install the `WebSockets` capability; without it the Lifecycle declines upgrades):

Adapted (not in the official docs): `JSON.parse` moved inside the `try`, and the message type, byte size (16 KiB), and `prompt` type are validated before the billed model call; see Notes.

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle, type Connection } from "agents/lifecycle";
import { WebSockets, type WebSocketMessage } from "agents/websockets";
import { streamText } from "ai";
import { createAI } from "agents/models/ai-sdk";

interface Env {
	AI: Ai;
}

export class MyAgent extends DurableObject<Env> {
	readonly webSockets = new WebSockets({
		handlers: {
			onMessage: (connection, message) => this.reply(connection, message),
		},
	});

	readonly lifecycle = Lifecycle.install(this).use(this.webSockets);

	async reply(connection: Connection, message: WebSocketMessage) {
		try {
			if (typeof message !== "string") throw new Error("Text frames only");
			if (new TextEncoder().encode(message).byteLength > 16_384) {
				throw new Error("Message too large");
			}
			const { prompt } = JSON.parse(message);
			if (typeof prompt !== "string" || prompt.length === 0) {
				throw new Error("prompt must be a non-empty string");
			}

			const ai = createAI({ binding: this.env.AI });
			const result = streamText({
				model: ai("anthropic/claude-opus-5.5"),
				prompt,
			});

			for await (const chunk of result.textStream) {
				if (chunk) {
					connection.send(JSON.stringify({ type: "chunk", content: chunk }));
				}
			}

			connection.send(JSON.stringify({ type: "done" }));
		} catch (error) {
			connection.send(JSON.stringify({ type: "error", error: String(error) }));
		}
	}
}
```

Call the AI binding directly, streaming:

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";

interface Env {
	AI: Ai;
}

export class MyAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install(this);

	async onRequest(request: Request): Promise<Response> {
		const stream = await this.env.AI.run("@cf/zai-org/glm-5.3-flash", {
			messages: [
				{
					role: "user",
					content: "Build me a Cloudflare Worker that returns JSON.",
				},
			],
			stream: true,
		});

		return new Response(stream, {
			headers: { "content-type": "text/event-stream" },
		});
	}
}
```

Through AI Gateway from the binding:

```ts
const response = await this.env.AI.run(
	"@cf/zai-org/glm-5.3-flash",
	{
		messages: [
			{
				role: "user",
				content: "Build me a Cloudflare Worker that returns JSON.",
			},
		],
	},
	{
		gateway: {
			id: "{gateway_id}",
			skipCache: false,
			cacheTtl: 3360,
		},
	},
);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `agents/models/ai-sdk` | import | — | AI SDK v7 provider (`generateText`, `streamText`, Think). |
| `agents/models/pi-ai` | import | — | Pi AI provider (Pi harness, Pi's `stream`). |
| `agents/models/opencode` | import | — | OpenCode harness provider built on the AI SDK provider. |
| `createAI({ binding })` | factory | — | Inside a Worker, over the `AI` binding. |
| `createAI({ accountId, apiToken, gateway })` | factory | gateway `default` | For a gateway in another account or from outside a Worker. Token needs **Workers AI Read** and **AI Gateway Run**. |

Model kinds: `@cf/` ids (Workers AI via `env.AI.run()` with a compatibility layer to chat completions), `<author>/<model>` catalog ids (use the catalog's spelling, e.g. `anthropic/claude-opus-5.5`), `dynamic/<route>`, or a vendor model object (sent unchanged through the binding to AI Gateway's provider-native endpoint).

## Notes

- Workers AI and AI Gateway products themselves belong to the cloudflare-ai skill (workers-ai; https://developers.cloudflare.com/workers-ai/). This page documents the Agents SDK provider layer only. `createAI` replaces `workers-ai-provider` and `ai-gateway-provider`; for AI Search use `ai-search-provider`. The deprecated Universal Endpoint is not used.
- Every model gets: no vendor keys in the Worker (AI Gateway holds credentials via Unified Billing or a stored key; Unified Billing requires gateway authentication), gateway options (caching, logging, metadata, timeouts, retries, BYOK aliases), fallback lists, automatic stream resume for catalog and dynamic-route streams, and gateway metadata on every result. The `default` gateway is created on first use.
- Secrets: `CLOUDFLARE_API_TOKEN` and vendor keys (`GEMINI_API_KEY`) are Workers secrets; never put them in tool arguments or prompts. Using an AI SDK provider directly (not `createAI`) or the OpenAI SDK against another vendor skips AI Gateway and needs your own vendor key.
- Adapted from the official docs: the source called `JSON.parse(message as string)` outside the `try`, so a malformed or binary frame threw unhandled and `prompt` was used unchecked; the fence now validates the frame (size measured in bytes with `TextEncoder`) inside the `try`. The 16 KiB cap is an arbitrary example value. The `routeAgentRequest` example above is unauthenticated and serves every Durable Object binding in `env`; add `onBeforeConnect` / `onBeforeRequest` checks (routing-authentication reference) before exposing it.
- WebSocket example has no authentication or rate limiting: authenticate the upgrade request and limit prompt size/rate before exposing it, since each message triggers a billed model call. To survive a dropped connection, persist responses with the SQLite storage API on `this.ctx.storage` and replay history on reconnect. Official sample also shows an OpenAI-SDK-to-Gemini streaming example via `baseURL`, which goes straight to the vendor.
- Binding setup for the Durable Object: cloudflare-stateful skill (durable-objects; https://developers.cloudflare.com/durable-objects/); AI Gateway docs: cloudflare-ai skill (ai-gateway; https://developers.cloudflare.com/ai-gateway/); model catalog: cloudflare-ai skill (workers-ai-models; https://developers.cloudflare.com/workers-ai/).
- AI SDK concepts (`generateText`, `streamText`) are in the vercel-ai-sdk skill.

## Related

- [AI SDK provider](./ai-sdk.md)
- [Pi AI provider](./pi-ai.md)
- [MCP client tools](../tools/mcp-client-tools.md)

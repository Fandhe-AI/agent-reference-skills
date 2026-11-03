---
source: https://developers.cloudflare.com/agents/harnesses/think/getting-started/
---

# Think: getting started tutorial

Build a Think chat agent with a streaming React UI, persistent memory the model can read and write, workspace file tools from `@cloudflare/computer`, and custom server-side tools.

## Signature / Usage

Prerequisites: Node.js 24+, a Cloudflare account with Workers AI access, TypeScript and Workers familiarity.

```sh
mkdir my-think-agent && cd my-think-agent
npm init -y
npm install @cloudflare/think @cloudflare/computer @cloudflare/ai-chat agents ai zod @ai-sdk/provider react react-dom
npm install -D wrangler @cloudflare/vite-plugin @cloudflare/workers-types @vitejs/plugin-react @tailwindcss/vite tailwindcss typescript vite
```

`wrangler.jsonc`:

```jsonc
{
	"name": "my-think-agent",
	"compatibility_date": "2026-01-28",
	"compatibility_flags": ["nodejs_compat"],
	"ai": { "binding": "AI" },
	"assets": {
		"not_found_handling": "single-page-application",
		"run_worker_first": ["/agents/*"]
	},
	"durable_objects": {
		"bindings": [{ "class_name": "MyAgent", "name": "MyAgent" }]
	},
	"migrations": [{ "new_sqlite_classes": ["MyAgent"], "tag": "v1" }],
	"main": "src/server.ts",
	"upload_source_maps": true
}
```

`vite.config.ts` and `tsconfig.json`:

```ts
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(), cloudflare(), tailwindcss()],
});
```

```json
{
	"extends": "agents/tsconfig"
}
```

`src/server.ts`:

```ts
import { Think } from "@cloudflare/think";
import { createAI } from "agents/models/ai-sdk";
import { routeAgentRequest } from "agents";

export class MyAgent extends Think<Env> {
	getModel() {
		return createAI({ binding: this.env.AI })(
			"@cf/moonshotai/kimi-k2.6",
		);
	}

	getSystemPrompt() {
		return "You are a helpful assistant with access to a workspace filesystem.";
	}
}

export default {
	async fetch(request: Request, env: Env) {
		return (
			(await routeAgentRequest(request, env)) ||
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

`src/client.tsx`:

```tsx
import { createRoot } from "react-dom/client";
import { useAgent } from "agents/react";
import { useAgentChat } from "@cloudflare/ai-chat/react";

function Chat() {
	const agent = useAgent({ agent: "MyAgent" });
	const { messages, sendMessage, status } = useAgentChat({ agent });

	return (
		<div>
			<h1>Think Agent</h1>
			{messages.map((msg) => (
				<div key={msg.id}>
					<strong>{msg.role}:</strong>
					{msg.parts.map((part, i) =>
						part.type === "text" ? <span key={i}>{part.text}</span> : null,
					)}
				</div>
			))}

			<form
				onSubmit={(e) => {
					e.preventDefault();
					const input = e.currentTarget.elements.namedItem(
						"input",
					) as HTMLInputElement;
					if (!input.value.trim()) return;
					sendMessage({ text: input.value });
					input.value = "";
				}}
			>
				<input name="input" placeholder="Send a message..." />
				<button type="submit">Send</button>
			</form>

			<p>Status: {status}</p>
		</div>
	);
}

const root = document.getElementById("root");
if (root) {
	createRoot(root).render(<Chat />);
}
```

`index.html` mounts `<div id="root"></div>` and loads `/src/client.tsx` as a module script. Run with `npx vite dev`.

### Persistent memory

```ts
import type { LanguageModel } from "ai";
import type { Session } from "@cloudflare/think";

export class MyAgent extends Think<Env> {
	getModel(): LanguageModel {
		return createAI({ binding: this.env.AI })(
			"@cf/moonshotai/kimi-k2.6",
		);
	}

	configureSession(session: Session) {
		return session
			.withContext("soul", {
				provider: {
					get: async () =>
						"You are a helpful assistant. Remember important facts about the user.",
				},
			})
			.withContext("memory", {
				description: "Important facts about the user and conversation.",
				maxTokens: 2000,
			})
			.withCachedPrompt();
	}
}
```

### Custom tool

Adapted (not in the official docs): the city is URL-encoded via `URL.searchParams`, the API key must be configured, and HTTP errors are surfaced; the original interpolated the raw model-supplied city into the query string. See Notes.

```ts
import { tool } from "ai";
import type { ToolSet } from "ai";
import { z } from "zod";

export class MyAgent extends Think<Env> {
	getTools(): ToolSet {
		return {
			getWeather: tool({
				description: "Get the current weather for a city",
				inputSchema: z.object({
					city: z.string().describe("City name"),
				}),
				execute: async ({ city }) => {
					if (!this.env.WEATHER_KEY) throw new Error("WEATHER_KEY is not set");
					const url = new URL("https://api.weatherapi.com/v1/current.json");
					url.searchParams.set("key", this.env.WEATHER_KEY);
					url.searchParams.set("q", city);
					const res = await fetch(url);
					if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
					return res.json();
				},
			}),
		};
	}
}
```

### Hooks

```ts
import type {
	TurnContext,
	TurnConfig,
	ChatResponseResult,
} from "@cloudflare/think";

export class MyAgent extends Think<Env> {
	beforeTurn(ctx: TurnContext): TurnConfig | void {
		console.log(
			`Turn starting: ${Object.keys(ctx.tools).length} tools available`,
		);
	}

	onChatResponse(result: ChatResponseResult) {
		console.log(`Turn ${result.status}: ${result.message.parts.length} parts`);
	}
}
```

## Notes

- Out of the box Think provides: the WebSocket chat protocol (compatible with `useAgentChat`), SQLite message persistence, resumable streaming (page refresh replays buffered chunks), workspace file tools (read, ls, find, grep, write, edit, delete), abort/cancel, and error handling with partial message persistence.
- With `configureSession` the system prompt is built from context blocks, with an overridden `getSystemPrompt()` at the top. The read-only `"soul"` block is the system identity and appears first; the writable `"memory"` block is updated by the model through `set_context`. Memory persists in SQLite and survives hibernation and restarts. Session details live in the Sessions runtime capability documentation.
- Tools merged on every turn: workspace tools (plus `exec` when the Workspace has a backend), your `getTools()`, extension tools, session tools (`set_context`, `load_context`, `search_context`), skill tools (`activate_skill`, `read_skill_resource`, optional `run_skill_script`), MCP tools, and client tools.
- Adapted from the official docs: the weather example previously built the query string by interpolation (`?key=...&q=${city}`), which lets a model-supplied value inject extra query parameters. The `getModel()` bodies elided as `/* ... */` in the source are shown in full. The tutorial's `compatibility_date` of `2026-01-28` is the tutorial's own value; other pages use a current date.
- Hooks fire on every turn regardless of entry path (see think-lifecycle-hooks.md). The `.tsx` client snippet replaces the source's separate JS/TS variants (the source JS variant is the same code without type annotations).
- The `routeAgentRequest(request, env)` entry point in the quick start has no authentication: any caller can reach the agent, its workspace tools, and billed model calls. Add `onBeforeConnect` / `onBeforeRequest` checks and bind the instance name to the authenticated user before deploying (routing-authentication reference).
- Distinction: Workers AI as the model provider is the cloudflare-ai skill (workers-ai; https://developers.cloudflare.com/workers-ai/); `Agent` base class details are in the sibling agent-class category.

## Related

- [think-overview.md](./think-overview.md)
- [think-configuration.md](./think-configuration.md)
- [think-tools.md](./think-tools.md)
- [think-lifecycle-hooks.md](./think-lifecycle-hooks.md)

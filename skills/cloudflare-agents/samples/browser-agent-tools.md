---
source: https://developers.cloudflare.com/agents/examples/browser-agent/
---

# Browser agent tools

Chat agent that gives the LLM `browser_search` and `browser_execute` tools, with LLM-written CDP code running in a Worker sandbox.

## Signature / Usage

Adapted (not in the official docs): `@cloudflare/ai-chat` (imported by `src/server.ts`) and its peer `@ai-sdk/provider` are added to the install command. See Notes.

```sh
npm install agents @cloudflare/ai-chat @cloudflare/codemode ai @ai-sdk/provider zod
```

Adapted (not in the official docs): the page's Browser Run / Worker Loader bindings merged with `name`, `main`, `compatibility_date`, the `ai` binding, and a Durable Object binding so the `src/server.ts` below is deployable. See Notes.

```jsonc
{
	"name": "browser-agent",
	"main": "src/server.ts",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat"],
	"ai": { "binding": "AI" },
	"browser": {
		"binding": "BROWSER",
	},
	"worker_loaders": [
		{
			"binding": "LOADER",
		},
	],
	"durable_objects": {
		"bindings": [{ "name": "MyAgent", "class_name": "MyAgent" }],
	},
	"migrations": [{ "tag": "v1", "new_sqlite_classes": ["MyAgent"] }],
}
```

`src/server.ts`:

Adapted (not in the official docs): a Worker `fetch` export with fail-closed `routeAgentRequest` authentication and the required `CodemodeRuntime` export are added (the page shows only the class), and `createBrowserTools` receives `ctx: this.ctx` as on the browser tools reference. See Notes.

```ts
import { AIChatAgent } from "@cloudflare/ai-chat";
import { routeAgentRequest } from "agents";
import { createBrowserTools } from "agents/browser/ai";
import { createAI } from "agents/models/ai-sdk";
import { streamText, convertToModelMessages, stepCountIs } from "ai";

export class MyAgent extends AIChatAgent<Env> {
	async onChatMessage() {
		const ai = createAI({ binding: this.env.AI });
		const browserTools = createBrowserTools({
			ctx: this.ctx,
			browser: this.env.BROWSER,
			loader: this.env.LOADER,
		});

		const result = streamText({
			model: ai("@cf/zai-org/glm-4.7-flash"),
			system: "You can browse the web and inspect pages.",
			messages: await convertToModelMessages(this.messages),
			tools: {
				...browserTools,
			},
			stopWhen: stepCountIs(10),
		});

		return result.toUIMessageStreamResponse();
	}
}

async function authenticate(
	request: Request,
	env: Env,
): Promise<{ id: string } | null> {
	// Verify a session cookie, a JWT, or an API key here.
	// This placeholder rejects every request until you implement verification.
	return null;
}

const check = async (
	env: Env,
	req: Request,
	route: { name: string },
): Promise<Response | void> => {
	const user = await authenticate(req, env);
	if (!user) return new Response("Unauthorized", { status: 401 });
	// Each user can only reach the agent named after them.
	if (route.name !== user.id) return new Response("Forbidden", { status: 403 });
};

// Required by the legacy browser tools (the @cloudflare/codemode/vite plugin adds it automatically).
export { CodemodeRuntime } from "agents/browser";

export default {
	async fetch(request: Request, env: Env) {
		return (
			(await routeAgentRequest(request, env, {
				onBeforeConnect: (req, route) => check(env, req, route),
				onBeforeRequest: (req, route) => check(env, req, route),
			})) ?? new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

Code the LLM passes to `browser_search` (queries the CDP spec through the injected `spec`):

```js
async () => {
	const s = await spec.get();
	return s.domains
		.find((d) => d.name === "Network")
		.commands.map((c) => ({ method: c.method, description: c.description }));
};
```

Code the LLM passes to `browser_execute` (runs CDP commands through the injected `cdp`):

Adapted (not in the official docs): the `cdp` calls use the single-object argument form (`cdp.send({ method, params, sessionId })`, `cdp.attachToTarget({ targetId })` returning `{ sessionId }`) documented on the browser tools reference instead of this page's positional form. See Notes.

```js
async () => {
	const { targetId } = await cdp.send({
		method: "Target.createTarget",
		params: { url: "https://example.com" },
	});
	const { sessionId } = await cdp.attachToTarget({ targetId });
	const { root } = await cdp.send({
		method: "DOM.getDocument",
		params: {},
		sessionId,
	});
	const { outerHTML } = await cdp.send({
		method: "DOM.getOuterHTML",
		params: { nodeId: root.nodeId },
		sessionId,
	});
	await cdp.send({ method: "Target.closeTarget", params: { targetId } });
	return outerHTML;
};
```

## Notes

- Deprecated: `createBrowserTools` (and `createBrowserRuntime`, Quick Action tools, `BrowserConnector`) are deprecated legacy APIs that keep working but will not change; new code should use `Browser` with `browserTool` (see [browser.md](../references/tools/browser.md) and [browser-legacy.md](../references/tools/browser-legacy.md)). This sample keeps the example page's legacy API.
- Source inconsistency: the browser-agent example page documents positional `cdp.send(method, params?, options?)` and `cdp.attachToTarget(targetId)` returning a string, omits `ctx` in `createBrowserTools`, and does not mention the `CodemodeRuntime` export. The browser tools reference documents single-object arguments (`cdp.send({ method, params?, sessionId?, timeoutMs? })`, `cdp.attachToTarget({ targetId, timeoutMs? })` returning `{ sessionId }`), passes `ctx: this.ctx`, and requires `export { CodemodeRuntime } from "agents/browser"` for the legacy tools. The sample follows the tools reference.
- Adapted from the official docs: the page's install command omits `@cloudflare/ai-chat`, which the example imports for `AIChatAgent`; it is added together with `@ai-sdk/provider`, matching the install commands of the other `AIChatAgent` examples.
- `createBrowserTools` options: `browser` (Browser Run binding) or `cdpUrl` (custom CDP endpoint, takes priority), `loader` (Worker Loader binding, required), `cdpHeaders`, `timeout` (default 30000 ms). `@cloudflare/codemode` is a required peer dependency.
- Deployed protections: generated code runs in an isolated Worker per execution with `fetch` / `connect` blocked in the sandbox; the CDP WebSocket stays in the host Worker; responses are truncated to roughly 6,000 tokens. These apply on Cloudflare, not under local Miniflare, which is not a security boundary for untrusted code.
- Each `browser_execute` call opens a fresh session with no cookies or login state, so multi-step flows must fit in one code block. Page content is untrusted input and can carry prompt injection; the browser can reach any public URL the model chooses, so do not give it credentials.
- Corrected from the official docs: the page's chat-agent snippet is reused with the `AIChatAgent<Env>` TypeScript form; `name`, `main`, `compatibility_date`, and the `ai` / Durable Object bindings are not on the page's bindings snippet and were added.
- Adapted from the official docs: the page shows only the Agent class. A Worker entry point is added that routes through `routeAgentRequest()` with the routing-authentication hooks and a placeholder `authenticate()` that rejects every request until you implement verification; the instance name is bound to the authenticated user id. Without it, anyone reaching the Worker could drive a browser and billed model calls.
- Local development: `npx wrangler dev` provisions the browser automatically, so the same `env.BROWSER` setup works locally.
- Cloudflare Agents SDK tool helpers; not the OpenAI Agents SDK or the Claude Agent SDK.

## Related

- [Browser](../references/tools/browser.md)
- [Browser legacy tools](../references/tools/browser-legacy.md)
- [Code Mode overview](../references/tools/codemode-overview.md)

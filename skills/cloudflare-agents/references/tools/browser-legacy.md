---
source: https://developers.cloudflare.com/agents/tools/browser/
---

# Browser legacy tools (deprecated)

`createBrowserTools`, `createBrowserRuntime`, Quick Action tools, and `BrowserConnector` are deprecated: they keep working until removed but will not change. New code should use `Browser` with `browserTool`.

## Signature / Usage

Legacy label: deprecated API, use `browserTool` for new code.

```ts
import { AIChatAgent } from "@cloudflare/ai-chat";
import { createBrowserTools } from "agents/browser/ai";
import { streamText, convertToModelMessages, stepCountIs } from "ai";
import { createAI } from "agents/models/ai-sdk";

export class BrowserAgent extends AIChatAgent<Env> {
	async onChatMessage() {
		const ai = createAI({ binding: this.env.AI });
		const browserTools = createBrowserTools({
			ctx: this.ctx,
			browser: this.env.BROWSER,
			loader: this.env.LOADER,
		});

		const result = streamText({
			model: ai("@cf/zai-org/glm-4.7-flash"),
			system: "You can inspect web pages with browser tools.",
			messages: await convertToModelMessages(this.messages),
			tools: browserTools,
			stopWhen: stepCountIs(10),
		});

		return result.toUIMessageStreamResponse();
	}
}
```

Required export in the Worker (the `@cloudflare/codemode/vite` plugin adds it automatically):

```ts
export { CodemodeRuntime } from "agents/browser";
```

Session modes and host-side helpers:

```ts
import { createBrowserRuntime } from "agents/browser/ai";

const { runtime, connector, tools } = createBrowserRuntime({
	ctx: this.ctx,
	browser: this.env.BROWSER,
	loader: this.env.LOADER,
	session: { mode: "dynamic" },
});

await connector.sessionInfo(); // Shared session ID and open tabs
await connector.liveView(); // Live View URLs for the shared session's tabs
await connector.closeSession(); // Close the shared session
await connector.sweep(); // Reclaim expired or stale sessions
await runtime.expirePaused(); // Reject stale pauses that were never approved
```

Approval-gated handoff (code the model writes for `browser_execute`):

```js
async () => {
	const { targetId } = await cdp.send({
		method: "Target.createTarget",
		params: { url: "https://example.com/login" },
	});

	const { url } = await cdp.getLiveViewUrl({ targetId, mode: "tab" });
	return { needsHumanLogin: url };
};
```

Quick Action tools (one-shot, no Durable Object or Worker Loader needed):

```ts
import { createQuickActionTools } from "agents/browser/ai";

const tools = createQuickActionTools({
	browser: this.env.BROWSER,
	maxChars: 20_000,
	options: { gotoOptions: { waitUntil: "networkidle0" } },
});
```

## Options / Props

`createBrowserTools` / `createBrowserRuntime` options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `browser` | binding | — | Browser Run binding. |
| `cdpHeaders` | object | — | Headers for CDP URL discovery, such as Cloudflare Access headers. |
| `cdpUrl` | string | — | Custom CDP endpoint; takes priority over `browser`. |
| `ctx` | Durable Object context | The current Agent's state | Hosts the runtime facet and session store. |
| `loader` | Worker Loader binding | Required | Sandboxed execution. |
| `name` | string | `"browser"` | Runtime name, the durable identity of executions. |
| `quickActions` | `false` or `{ actions, maxChars, options }` | On with a `browser` binding | Quick Action tools to include. |
| `session` | object | `{ mode: "one-shot" }` | Session lifecycle mode, recording, engine (`browser: "kitesurf"`). |
| `store` | store | Durable Object storage | Durable store for Browser Run session IDs. |
| `timeout` | number | `30000` | Execution timeout in ms; also the per-command CDP timeout. |

Session modes: `one-shot` (fresh session per execution), `reuse` (`{ mode: "reuse", key }` named shared session until closed or swept), `dynamic` (starts one-shot; the model promotes it with `cdp.startSession()`).

Tools: `browser_execute` (CDP code), `browser_markdown`, `browser_extract`, `browser_links`, `browser_scrape`. The TanStack AI variant returns only `browser_execute`.

`cdp` methods in `browser_execute`: `send`, `attachToTarget`, `spec`, `getDebugLog`, `clearDebugLog`; plus `getLiveViewUrl` (Chromium), and `startSession`, `sessionInfo`, `closeSession`, `resetSession` (`reuse`/`dynamic` only).

## Notes

- Still needed for: your own CDP endpoint (`cdpUrl`), Kitesurf (one-shot only; no reuse, pause/resume, Live View, recording, `keepAliveMs`, `cdp.spec()`, or Quick Actions), and approval or human handoff within a run via the durable Code Mode runtime (see [Code Mode durable runtime](./codemode-durable-runtime.md)).
- Sessions are tracked in Durable Object storage and survive hibernation and approval pauses; if Browser Run expires the session during a pause the resume errors and the model starts over.
- Every `cdp.*` call is logged and replayed on resume, so calls must be sequential and deterministic: model code must not use `Promise.all` for CDP calls.
- Live View URLs are valid about five minutes and are bearer credentials (see [Browser Live View](./browser-live-view-recording.md)). A recording on a shared `reuse`/`dynamic` session spans every user sharing the `key`.
- Quick Actions each load the page in a new browser and close it; they do not share logins with `browserTool`. Host-supplied `cookies`, `authenticate`, `gotoOptions`, `viewport` go through `options` and are not exposed to the model, results are bounded by `maxChars` (default 50,000). They require a Worker `compatibility_date` of `2026-03-24` or later and `remote: true` on the binding for local `wrangler dev`. Keep credentials in secrets.
- Browser code runs sandboxed in Dynamic Workers; call `connector.sweep()` from a scheduled task.

## Related

- [Browser](./browser.md)
- [Code Mode browser](./codemode-browser.md)

---
source: https://developers.cloudflare.com/agents/tools/browser/
---

# Browser tool

A persistent remote browser (Browser Run) that an agent returns to across turns, keeping tabs, cookies, and logins while the session is alive. Driven by the model through Chrome DevTools Protocol (CDP) code in the `browserTool` adapters.

## Signature / Usage

Pi Durable example. Install: `npm i agents @earendil-works/pi-durable @earendil-works/pi-ai @earendil-works/chord @cloudflare/codemode`.

Adapted (not in the official docs): `ask()` calls `await this.lifecycle.start()` before using the harness, because the Worker calls it over RPC, which does not start the Lifecycle. See Notes.

```ts
import { DurableObject } from "cloudflare:workers";
import { createModels } from "@earendil-works/pi-ai/models";
import { createRegistry, Harness } from "@earendil-works/pi-durable";
import { Browser, browserRun } from "agents/browser";
import { browserTool } from "agents/browser/pi";
import { PiHarness } from "agents/harness/pi";
import { Lifecycle } from "agents/lifecycle";
import { createAI } from "agents/models/pi-ai";

export class BrowserAssistant extends DurableObject<Env> {
	ai = createAI({ binding: this.env.AI });
	browser = new Browser({ provider: browserRun(this.env.BROWSER) });
	registry = createRegistry();

	harness = new PiHarness({
		harness: ({ storage, context, onWake }) => {
			const models = createModels();
			models.setProvider(this.ai.provider);
			this.registry.install({
				name: "browser",
				tools: [
					browserTool({ browser: this.browser, loader: this.env.LOADER }),
				],
			});
			return Harness.open(
				storage,
				{ models, registry: this.registry, onWake },
				context,
			);
		},
		defaults: { model: this.ai("@cf/zai-org/glm-5.3-flash") },
	});

	lifecycle = Lifecycle.install(this).use(this.browser).use(this.harness);

	async ask(prompt: string) {
		// Native RPC does not go through fetch() and does not start the Lifecycle.
		await this.lifecycle.start();
		const { text } = await this.harness.prompt(prompt);
		return text;
	}
}

export default {
	async fetch(request: Request, env: Env) {
		const assistant = env.BrowserAssistant.getByName("demo");
		const text = await assistant.ask(await request.text());
		return Response.json({ text });
	},
} satisfies ExportedHandler<Env>;
```

Bindings:

```jsonc
{
	"name": "persistent-browser-agent",
	"main": "src/index.ts",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat"],
	"ai": { "binding": "AI" },
	"browser": { "binding": "BROWSER" },
	"worker_loaders": [{ "binding": "LOADER" }],
	"durable_objects": {
		"bindings": [{ "name": "BrowserAssistant", "class_name": "BrowserAssistant" }],
	},
	"migrations": [{ "tag": "v1", "new_sqlite_classes": ["BrowserAssistant"] }],
}
```

AI SDK adapter, and a hand-rolled tool via `browser.session()`:

```ts
import { browserTool } from "agents/browser/ai-sdk";

const tools = {
	browser: browserTool({
		browser: this.browser,
		loader: this.env.LOADER,
		scope: conversationId,
	}),
};
// Pass tools to generateText() or streamText().
```

```ts
const session = this.browser.session({ scope: conversationId });
try {
	await session.send({
		method: "Page.navigate",
		params: { url: "https://example.com" },
		sessionId: "active",
	});
} finally {
	const report = await session.close();
	// { restarted, newTabs, tabClosed, tabShared }, or undefined if unused
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `browserRun(binding, options)` | function | — | Provider for `new Browser({ provider })`. Options include `keepAliveMs`, `recording`, `guardrails`, `internalHosts`. |
| `browserTool({ browser, loader, scope? })` | function | — | Adapter: `agents/browser/pi`, `agents/browser/ai-sdk`, `agents/browser/tanstack-ai`. |
| `scope` | string | Pi: one tab per conversation; AI SDK / TanStack AI: one shared active tab | Same string shares an active tab; use the conversation ID to separate tabs. |
| `timeoutMs` | number | `60000` | Per-call timeout for browser calls (also the CDP call default). |
| `keepAliveMs` | number | Idle browser alive up to 10 minutes | Idle keep-alive for the browser. |

Browser API available to model code (an async arrow function against `browser`; one object argument):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `browser.cdp({ method, params?, sessionId?, timeoutMs? })` | method | — | Send a CDP command. |
| `browser.attachToTarget({ targetId, timeoutMs? })` | method | — | Attach to a tab, make it active, return `{ sessionId }`. |
| `browser.spec({ domain? })` | method | — | List CDP domains or one domain's commands, events, types. |
| `browser.getDebugLog({ limit? })` / `browser.clearDebugLog()` | method | — | Recent CDP traffic for this call. |
| `browser.listHosts()` | method | — | List internal hostnames. |
| `browser.assignHost({ host, target })` / `browser.clearHost({ host })` | method | — | Point or clear an assignable internal host. |

## Notes

- Corrected from the official docs: the Worker calls `ask()` on the stub over native Durable Object RPC, which bypasses `fetch()` and does not start the Lifecycle, so after a cold start or eviction the harness could be used before its `onStart()` ran; `ask()` now begins with `await this.lifecycle.start()` (see the runtime lifecycle reference).
- Isolation: the model's code runs in a new Dynamic Worker for each call with no network access (`fetch()` and `connect()` blocked); `browser` is its only way out. The browser itself runs outside your Durable Object.
- Results are cut to about 24,000 characters, console output to 100 lines; a screenshot is at most 1 MB (use a viewport screenshot or JPEG for long pages). `sessionId: "active"` addresses the scope's active tab; `Browser.*` and `Target.*` commands take no `sessionId`.
- Blocked from the model (your application owns them): `Browser.close`, `Browser.crash`, `Browser.crashGpuProcess`, `Cloudflare.getLiveView`, `Cloudflare.handoff`, `Target.sendMessageToTarget`, `Target.exposeDevToolsProtocol`. To close a tab the model sends `Target.closeTarget`.
- A tab scope is not a separate profile: cookies and logins are shared within a `Browser`. Use separate browsers (one object per authenticated user or workspace) for separate logins. The example's `getByName("demo")` is for demonstration only.
- Calls in a conversation run sequentially. Pi does not replay a browser call interrupted by eviction (it could submit a form twice); the model gets an interrupted result. Stopping a conversation does not cancel a running call.
- If the browser expires or crashes the next use creates a replacement; the result `notice` says prior tabs/cookies are gone. The persistent browser supports Browser Run's Chromium engine only. The idle browser expiry is not permanent storage.
- Use web_fetch (see Web fetch) for plain reads; use the browser for JavaScript-rendered pages, logins, multi-step interaction, or screenshots.
- `browserTool` does not use Code Mode but keep `@cloudflare/codemode` installed; `agents/browser` still exports the legacy tools which need it. The Pi packages are optional peer dependencies of `agents` at `~1.4.0` and Pi Durable is experimental.
- Browser Run docs: https://developers.cloudflare.com/browser-run/ ; CDP: https://developers.cloudflare.com/browser-run/cdp/ ; example agent: https://developers.cloudflare.com/agents/examples/browser-agent/

## Related

- [Browser internal hostnames](./browser-internal-hostnames.md)
- [Browser Live View and recording](./browser-live-view-recording.md)
- [Browser legacy tools](./browser-legacy.md)
- [Web fetch](./web-fetch.md)

---
source: https://developers.cloudflare.com/agents/harnesses/opencode/
---

# OpenCode harness (OpenCodeHarness, experimental)

`OpenCodeHarness` runs OpenCode 2.0's Workerd SDK inside a plain Durable Object. OpenCode owns the agent loop, transcript, tools, and session recovery; the harness supplies SQLite storage (tables and indexes prefixed `opencode_`) and wakes the object after an interrupted run. The `agents/models/opencode` provider connects OpenCode to Workers AI, AI Gateway catalog models, and dynamic routes through the `AI` binding.

## Signature / Usage

Adapted (not in the official docs): `ask()` calls `await this.lifecycle.start()` before using the harness, because the Worker calls it over RPC, which does not start the Lifecycle. See Notes.

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { OpenCodeWorkerd } from "@opencode/sdk/workerd";
import { OpenCodeHarness } from "agents/harness/opencode";
import { createAI } from "agents/models/opencode";
import workerTools from "./worker-tools";

export class Assistant extends DurableObject<Env> {
	ai = createAI({ binding: this.env.AI });
	harness = new OpenCodeHarness({
		opencode: ({ storage }) =>
			OpenCodeWorkerd.create({
				storage,
				config: { default_agent: "build" },
				models: { fetch: false },
				plugins: [this.ai.plugin, workerTools],
			}),
		defaults: {
			model: this.ai("@cf/moonshotai/kimi-k2.7-code", {
				reasoningEffort: "low",
			}),
			agent: "build",
		},
	});

	lifecycle = Lifecycle.install(this).use(this.harness);

	async ask(prompt: string) {
		// Native RPC does not go through fetch() and does not start the Lifecycle.
		await this.lifecycle.start();
		const { status, text, reason } = await this.harness.prompt(prompt);
		return { status, text, reason };
	}
}

export default {
	async fetch(_request: Request, env: Env) {
		const assistant = env.Assistant.getByName("demo");
		return Response.json(await assistant.ask("What is the current UTC time?"));
	},
} satisfies ExportedHandler<Env>;
```

Install and Wrangler configuration:

```sh
npm i agents@latest @opencode/sdk@2 @opencode/plugin@2
```

```jsonc
{
	"name": "opencode-agent",
	"main": "src/index.ts",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat"],
	"ai": { "binding": "AI", "remote": true },
	"durable_objects": {
		"bindings": [{ "name": "Assistant", "class_name": "Assistant" }],
	},
	"migrations": [{ "tag": "v1", "new_sqlite_classes": ["Assistant"] }],
}
```

## Options / Props

### OpenCodeHarness options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `opencode` | `({ storage }) => OpenCodeWorkerd` | — | Factory; pass `storage` to `OpenCodeWorkerd.create()` so OpenCode uses the prefixed database. Runs again when the harness reopens an idle host, so it must support repeated calls. |
| `defaults.model` | OpenCode model reference `{ providerID, id }` | — | From `this.ai(...)`. |
| `defaults.agent` | `string` | — | OpenCode agent, such as `"build"` or `"plan"`. |

### Model ids accepted by `this.ai()`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `@cf/...` | Workers AI | — | e.g. `this.ai("@cf/moonshotai/kimi-k2.7-code")`. |
| `<vendor>/<model>` | AI Gateway catalog | — | e.g. `this.ai("anthropic/claude-opus-5.5")`, spelled as in the model catalog. |
| `dynamic/<route>` | AI Gateway dynamic route | — | e.g. `this.ai("dynamic/support")`; a route belongs to one gateway, so pass that gateway's `id` to `createAI`. |

Any other id throws a `TypeError` on the line that names it. Model options include `reasoningEffort` and `limit: { context, output }` (defaults 128,000 context tokens and 8,192 output tokens).

### Session methods

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `submit(input, options)` | — | — | Durably submit input; returns a receipt. |
| `prompt(input, options)` | — | — | Submit, wait, return result and active transcript (`status`: `"done"` or `"unanswered"` = failed, interrupted, withdrawn, or not found). |
| `steer(input, options)` | — | — | Submit with `whenBusy: "steer"`. |
| `wait(operationId, signal)` | — | — | Aborting the signal stops only the wait. |
| `abort(operationId)` | — | — | Withdraw a queued operation or interrupt the run it joined; no id aborts all work in the session. |
| `setModel(model)` / `setAgent(agent)` | — | — | Change the model or OpenCode agent. |
| `messages()` / `history()` | — | — | Active context after the latest compaction / full transcript including compacted messages. |
| `events()` | stream | — | `snapshot` (transcript, pending operations, busy flag, permissions awaited) then live events via `start(cb)`; `stop()`. |
| `log({ after, follow, signal })` | — | — | Replay durable events, optionally following. Save `event.durable.seq` and pass as `after` on reconnect. |
| `busy()` | — | — | Running, queued, or interrupted work awaiting recovery. |

## Notes

- Corrected from the official docs: the Worker calls `ask()` on the stub over native Durable Object RPC, which bypasses `fetch()` and does not start the Lifecycle, so after a cold start or eviction the harness could be used before its `onStart()` ran; `ask()` now begins with `await this.lifecycle.start()` (see the runtime lifecycle reference).
- Wake-up: each active session has a Lifecycle job with a heartbeat; after a crash/eviction an alarm restarts the object and OpenCode resumes interrupted work. Idle close: the harness closes an unused host after 30 seconds when no work or event subscriptions remain and reopens it on the next call, retaining durable state.
- OpenCode packages are optional peer dependencies with a supported range of `^2.0.24`. Use the latest `agents` release.
- `this.ai.plugin` adds a provider named "Cloudflare" (id `cloudflare`). `models: { fetch: false }` skips OpenCode's external model catalog refresh.
- Root session id is `"ses_root"`; `harness.session(id)` addresses others; `sessions.create()`, `sessions.fork(id)`, `sessions.list()` (includes sessions spawned by OpenCode's subagent tools).
- An `operationId` deduplicates submissions within a session (reuse returns `accepted: false`); use only letters, digits, `.`, `_`, `~`, `-`. Inputs submitted while a session runs queue as follow-ups unless `whenBusy: "steer"`. `harness.pending()` lists queued and running operations.
- Events use the same kinds as the Pi harness: `run_start`/`run_end`, `operation_start`/`operation_end`, `message_start`/`message_end`, `text_delta`, `reasoning_delta`, `tool_start`/`tool_end`, plus permission and compaction events. An event can repeat what the snapshot shows, so key messages by id. The durable log does not replay uncommitted live text deltas. `events()` and `log()` hold the host open; call `stream.stop()` and stop `log()` with an `AbortSignal`, and reopen after an object restart.
- Bundle plugins with the Worker; do not rely on runtime loading of local plugin files or npm packages. OpenCode wraps plugin tools in its `execute` code-mode tool, so calls may appear as `execute` in events.
- The `"demo"` object name is for illustration; choose an object name from an authenticated user or conversation. The example removes OpenCode's local tools (read, write, edit, patch, glob, grep, shell) because they are unsupported in a Worker; the harness does not run a shell on a host.
- Remote MCP servers are registered through a plugin (`ctx.mcp.transform`). Only register MCP servers you trust: their tools become available to the model.
- Distinction: this is a harness over a plain Durable Object, not the `Agent` base class (sibling agent-class category). Workers AI models come from the cloudflare-ai skill (workers-ai; https://developers.cloudflare.com/workers-ai/); for a sandboxed execution environment use the cloudflare-sandbox-containers skill (sandbox; https://developers.cloudflare.com/sandbox/).

### Worker-safe tool plugin (src/worker-tools.ts)

```ts
import { Plugin } from "@opencode/plugin";

export default Plugin.define({
	id: "worker-tools",
	async setup(ctx) {
		await ctx.tool.transform((tools) => {
			for (const name of [
				"read",
				"write",
				"edit",
				"patch",
				"glob",
				"grep",
				"shell",
			]) {
				tools.remove(name);
			}
			tools.add({
				name: "current_time",
				description: "Return the current UTC time.",
				input: { type: "object", properties: {}, additionalProperties: false },
				async execute() {
					return { content: new Date().toISOString() };
				},
			});
		});
	},
});
```

### Submit, wait, and stream events

```ts
const receipt = await this.harness.submit("Summarize the report", {
	operationId: "report-summary-42",
});

// In a later request to the same Durable Object:
const result = await this.harness.wait(receipt.operationId, {
	session: receipt.session,
});

const stream = await this.harness.session(sessionId).events();
socket.send(JSON.stringify({ type: "snapshot", ...stream.snapshot }));

stream.start((events) => {
	for (const event of events) {
		socket.send(JSON.stringify({ type: "event", event }));
	}
});

// When the client disconnects or the session is idle:
await stream.stop();
```

### MCP server and Agent Skill plugins

```ts
import { Plugin } from "@opencode/plugin";

export default Plugin.define({
	id: "cloudflare-docs-mcp",
	async setup(ctx) {
		await ctx.mcp.transform((servers) => {
			servers.set("cloudflare-docs", {
				type: "remote",
				url: "https://docs.mcp.cloudflare.com/mcp",
			});
		});
	},
});
```

```ts
import { Plugin, Skill } from "@opencode/plugin";

export default Plugin.define({
	id: "review-skill",
	async setup(ctx) {
		await ctx.skill.transform((skills) => {
			skills.add({
				id: Skill.ID.make("review"),
				name: Skill.Name.make("Review"),
				description:
					"Review a proposed change for correctness and missing tests.",
				path: Skill.Info.fields.path.make("/skills/review/SKILL.md"),
				content:
					"Review the proposed change. Report actionable findings with evidence.",
			});
		});
	},
});
```

Import each plugin and add it to the factory's `plugins` array.

## Related

- [overview.md](./overview.md)
- [pi.md](./pi.md)

---
source: https://developers.cloudflare.com/agents/harnesses/pi/, https://developers.cloudflare.com/agents/harnesses/pi/extensions/
---

# Pi harness (PiHarness) and extensions

`PiHarness` runs Pi Durable in a Durable Object. Pi owns the transcript, inbox of follow-ups and steers, model calls, tools, retries, and crash recovery; `PiHarness` gives Pi SQLite storage (tables prefixed `pi_`) and wakes the object when Pi has work to finish. It does not choose how clients reach a session; it gives you a watch of each session's state.

## Signature / Usage

Adapted (not in the official docs): `ask()` calls `await this.lifecycle.start()` before using the harness, because the Worker calls it over RPC, which does not start the Lifecycle. See Notes.

```ts
import { DurableObject } from "cloudflare:workers";
import { createModels } from "@earendil-works/pi-ai/models";
import { createRegistry, Harness } from "@earendil-works/pi-durable";
import { PiHarness } from "agents/harness/pi";
import { Lifecycle } from "agents/lifecycle";
import { createAI } from "agents/models/pi-ai";

export class Assistant extends DurableObject<Env> {
	ai = createAI({ binding: this.env.AI });
	registry = createRegistry();

	harness = new PiHarness({
		harness: ({ storage, context, onWake }) => {
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

	lifecycle = Lifecycle.install(this).use(this.harness);

	async ask(prompt: string) {
		// Native RPC does not go through fetch() and does not start the Lifecycle.
		await this.lifecycle.start();
		const { text } = await this.harness.prompt(prompt);
		return text;
	}
}

export default {
	async fetch(request: Request, env: Env) {
		const agent = env.Assistant.getByName("demo");
		return Response.json({ text: await agent.ask("What is 47 × 19?") });
	},
};
```

Install and Wrangler configuration:

```sh
npm i agents @earendil-works/pi-durable @earendil-works/pi-ai @earendil-works/pi-schema @earendil-works/chord
```

```jsonc
{
	"name": "pi-agent",
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
	"migrations": [{ "tag": "v1", "new_sqlite_classes": ["Assistant"] }],
}
```

## Options / Props

### PiHarness options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `harness` | `({ storage, context, onWake }) => Harness` | — (required) | Returns Pi's `Harness`, usually from `Harness.open()`. Pass `onWake` on to `Harness.open()`. |
| `defaults` | `{ model, thinkingLevel, maxTurns }` | — | What a new session starts with: `model` (a Pi AI `Model` such as `ai("@cf/...")`), `thinkingLevel`, and `maxTurns`, the most tool rounds one run takes. Change one session's model later with `session.setModel()`. |

Without a model, a session's prompts end unanswered until you set one. A run that reaches `maxTurns` runs that round's tools, then ends unanswered with reason `turn_limit`. Like the other defaults, `maxTurns` applies to new sessions only; changing it does not change sessions that already exist. Without it, a run takes as many tool rounds as the model asks for.

### Pi settings (passed to `Harness.open()`)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `settings.retry` | `{ maxRetries, baseDelayMs }` | 3 retries | Pi retries a failed model request 3 times by default; e.g. `{ maxRetries: 2, baseDelayMs: 500 }` changes that. |
| `settings.compaction` | — | — | How Pi compacts long transcripts. |
| `settings.toolExecution` | — | — | How Pi runs a round's tools. |
| `settings.afterFailedRun` | `"keep" \| "continue" \| "withdraw"` | `"keep"` | Fate of submissions queued behind a failed run (`model_error` / `no_model` / `turn_limit`). `keep`: stay `queued`, `wait()` keeps waiting, next `submit()`/`reset()` runs them first. `continue`: next run starts with them. `withdraw`: `wait()` returns `{ status: "unanswered", reason: "run_failed" }`. |
| `settings.restartLimit` | `number` | `5` | Times in a row a crash/eviction may cut off a task without progress before Pi ends it with reason `restart_limit` (tool call: error result; model request: run ends `unanswered`). |

### Harness / session methods

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `submit(input, options)` | `Promise<receipt>` | — | Durably submit input; options include `operationId`, `whenBusy`, `whenIdle`, `entry`. Returns once input is stored, before the model runs. |
| `prompt(input, options)` | — | — | Submit to the root session and wait; returns final `text`, `status`, and `messages`. |
| `continue(options)` | — | — | Start a run on the transcript as it is, without a new message. Only an idle session takes one: a busy session rejects it with `ConversationBusy`, and a transcript that already ends in an answer settles `unanswered` with reason `nothing_to_answer`. Takes an `operationId` and returns a receipt for `wait()`. |
| `steer(input)` | — | — | Submit with `whenBusy: "steer"` (joins running work after its current tool round). |
| `wait(operationId, signal)` | — | — | Result `{ operationId, session, status: "done" \| "unanswered", text?, reason? }`. Aborting `signal` stops the wait, not the work. |
| `abort(operationId)` | — | — | Withdraw a queued operation or abort the run it joined; with no id, abort everything in the session. |
| `pending()` | — | — | Unsettled operations: `queued` or `running`. |
| `reset(handoff)` | — | — | Start a new context, optionally from a handoff note. |
| `setModel(model)` | — | — | Change this session's model. |
| `messages()` | — | — | Active transcript as Pi `EntryRecord`s since the newest reset. |
| `watch(window)` | — | — | Pi's view of the session: the newest transcript entries and the session's live state in `pi.live` (`watch.value`, `watch.start(cb)`, `watch.stop()`). |
| `entries(query, limit)` | — | — | A page of the session's transcript, including entries before its resets. |
| `busy()` | `boolean` | — | Whether the session is running. |
| `sessions.create()` / `sessions.fork(id)` / `sessions.list()` | — | — | Create a top-level session, fork one's history, list sessions (includes subagent-created ones). `harness.session(id)` returns a handle. |
| `pi()` | `Promise<Harness>` | — | The opened Pi `Harness`, for anything `PiHarness` does not cover. |

### Extension (registry) shape

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Extension name; `registry.install()` replaces an installed extension with the same name. |
| `tools` | `ToolRegistration[]` | — | Tools: `name`, `description`, `parameters` (schema), `replay`, `execute(args, api, context)`, optional `executionMode: "sequential"`. |
| `sections` | `{ key, render, tag? }[]` | — | System prompt sections; `render` runs before each model request; output is wrapped in `<key>` tags unless `tag` is `false`. |

## Notes

- Adapted from the official docs: `fetch_page` read the whole response with `response.text()`, so a large page could exhaust Worker memory and flood the model context; it now stops after 256 KiB (example value) and cancels the rest.
- Corrected from the official docs: the Worker calls `ask()` on the stub over native Durable Object RPC, which bypasses `fetch()` and does not start the Lifecycle, so after a cold start or eviction the harness could be used before its `onStart()` ran; `ask()` now begins with `await this.lifecycle.start()` (see the runtime lifecycle reference).
- Corrected from the official docs: the Skills extension example's `async` factory installs the extension and then ends with the comment `// ...models, then Harness.open() with onWake`, so it resolves to `undefined` instead of a `Harness`. The fence fills in the same model setup and `Harness.open()` call as the main example (`createModels`, `Harness`, and `this.ai` come from that example).
- Pi packages are optional peer dependencies of `agents` at `~1.5.0`; Pi Durable is experimental and each `agents` release supports one Pi minor version. Agents SDK 0.33.0 and later support Pi 1.5. A new Pi minor version can store conversations in a format the previous one cannot read: after a conversation runs on Pi 1.5, rolling your Worker back to an Agents SDK version on Pi 1.4 leaves that conversation unreadable, so roll forward to fix a bad deploy instead. `agents/models/pi-ai` supports AI Gateway and Workers AI models.
- The `harness` factory runs inside object startup, before any session is used, and again whenever the harness reopens Pi after a storage error; keep it safe to run more than once. If it throws, the operation that started it fails and the next retries.
- Wake-up: one Lifecycle job per object, heartbeat alarm every 30 seconds while Pi works; due when Pi's next sleeping task wakes (reported via `onWake`), so the object can hibernate.
- `operationId` makes a submission idempotent: resubmitting returns the same operation with `accepted: false`. A submission made while the session runs is queued as its own run unless `whenBusy: "steer"`.
- Session ids are Pi's conversation ids and cannot be chosen. For one agent per user or chat, use one Durable Object per conversation and the root session (id `"1"`).
- The `"demo"` object name and unauthenticated `fetch` are for illustration; in an application choose the object name from an authenticated user or conversation.
- Recovery: eviction/crash/memory-or-CPU limit restarts via the job alarm and continues from the last checkpoint; a deploy gives in-flight work 30 seconds then restarts like a crash; a streaming model call keeps the stored partial answer and calls the model again; a tool with `replay: "safe"` is run again, any other tool is not (the model gets an interrupted result).
- Tasks that keep crashing: Pi ends a task that a crash or eviction cuts off `settings.restartLimit` times in a row (default 5). A tool call ends with an error result that the model sees and the run goes on; a model request ends its run and the run's operations settle `unanswered` with reason `restart_limit`. The job completes so the object can hibernate, and Pi reports `task_interrupted` to `onReport`. To run the work again once the cause is fixed, call `session.continue()` or submit it again.
- Failed runs: a run fails with `model_error`, `no_model`, or `turn_limit` (reaching `defaults.maxTurns`); call `session.continue()` once the cause is fixed to answer the transcript as it is. Setting `whenIdle: "reject"` on `submit()` makes an idle session refuse the input with Pi's `ConversationIdle` instead of starting a run; combined with `whenBusy: "steer"` the input joins the running work or is refused, without racing the end of the run.
- Streaming progress is stored in batches (with the next dependent change, and at the latest after `settings.progress.persistWithinMs`, default 1,000 ms), so a crash mid-stream loses up to that much of the stream; `settings: { progress: { persistWithinMs: 0 } }` stores every update at the cost of one storage write each. If the factory passes `onReport` to `Harness.open()`, Pi reports failures there tagged by `kind`, such as `storage_failed`. When a model stream was interrupted, the request counts as a failed attempt under `settings.retry` and Pi calls the model again after the backoff; with no retry left, the run ends unanswered with reason `interrupted`.
- Watching: the view holds the newest 50 entries and grows to 100 before its oldest entries leave; unlike `messages()`, its entries include those before a reset or compaction. `live.run` is set while the session runs; `live.runFailure` stays after a failed run until the next run starts, so check `live.run === undefined` to tell whether it is idle. To send a session over a socket, send `watch.value` once, then each change's `call.ops`; the client applies them with `applyImmutable()` from `@earendil-works/chord/delta`. To render a longer transcript, merge each value into Pi's `ConversationTranscript`, which pages older entries with `session.entries()`; after a client reconnects, pass the transcript's `resume` window to `session.watch()` to get only the entries missed. A watch lives in memory: after the object restarts, open a new watch and send its first value again.
- Input labelled via `entry: { kind, data }` is recorded instead of `pi.user`; the model still sees it as a user message. The kind is only a label, nothing checks it; reserve `pi.` prefixes (use e.g. `app.`). Do not put anything in it you would not let the user send.
- Limitations: no approval step for tool calls; `abort()` waits for the session to be idle, so a tool ignoring its abort signal keeps it busy; one model request streaming over 15 minutes can be cut off (alarm invocation limit; handoff every 10 minutes); background work is noticed up to 30 seconds late; Pi Durable cannot delete a conversation.
- Create the registry per object as a class field, not at module scope: Pi keeps every `Harness` subscribed until it closes and an evicted object never closes it.
- Tools: build `parameters` with the schema builders from `@earendil-works/pi-schema` (`obj()`, `str()`, `num()`); type as `ToolRegistration<typeof Parameters>` so `execute` args are typed (Pi validates first). `obj()` rejects properties it does not list unless you pass `{ open: true }`. `api.output()` streams output, `api.details()` sends UI data, `api.memo()` stores values that survive eviction; honor `context.abortSignal`. Calls in one model round run in parallel unless a tool sets `executionMode: "sequential"` (one sequential call makes the round sequential). `replay: "safe"` only when running twice is harmless (read, search, whole-file write).
- Adapted from the official docs: the `fetch_page` example below fetches a model-chosen URL, which is an SSRF risk. The original fetched any `url`; this version restricts to `https:` and an explicit host allowlist (`example.com` is a placeholder).
- Skills: `skills(sources)` from `agents/harness/pi` turns Agent Skills sources from `agents/skills` (Computer Workspace, R2, or manifest) into a Pi extension named `agents.skills` with `activate_skill`, `read_skill_resource`, and a `skills` section. It reads sources once when the factory builds it, so install it in an `async` factory. Tools match Think's, so a skill works in both. To run skill scripts give the model a shell or Workspace tool.
- More of Pi Durable (hooks like `hook(ToolTask, { beforeTool })`, durable custom tasks, wrapping extensions, per-conversation extensions, typed-document state): see the Pi Durable README at https://github.com/earendil-works/pi/tree/main/packages/durable.
- Distinction: the `Agent` base class is in the sibling agent-class category; Workers AI models come from the cloudflare-ai skill (workers-ai; https://developers.cloudflare.com/workers-ai/).

### Add a tool and a prompt section

```ts
import type { ToolRegistration } from "@earendil-works/pi-durable";
import { obj, str } from "@earendil-works/pi-schema";

const WordCount = obj({ text: str() });

const wordCount: ToolRegistration<typeof WordCount> = {
	name: "word_count",
	description: "Count the words in a text.",
	parameters: WordCount,
	replay: "safe",
	async execute({ text }) {
		const words = text.split(/\s+/).filter(Boolean).length;
		return { output: [{ type: "text", text: String(words) }] };
	},
};

this.registry.install({
	name: "editor",
	sections: [
		{ key: "preamble", render: () => "You are an editor.", tag: false },
	],
	tools: [wordCount],
});
```

Install in the `harness` factory, before `Harness.open()` (safe to repeat).

### Tool using abort signal and streamed output

Adapted (not in the official docs): restricts the model-chosen URL to https and an allowlist to avoid SSRF, returns non-2xx statuses as text, and reads at most 256 KiB of the page (an example cap) instead of `await response.text()` on an unbounded body; see Notes.

```ts
const FetchPage = obj({ url: str() });
const ALLOWED_HOSTS = new Set(["example.com"]);

const fetchPage: ToolRegistration<typeof FetchPage> = {
	name: "fetch_page",
	description: "Fetch a web page as text.",
	parameters: FetchPage,
	replay: "safe",
	async execute({ url }, api, context) {
		const target = new URL(url);
		if (target.protocol !== "https:" || !ALLOWED_HOSTS.has(target.hostname)) {
			return { output: [{ type: "text", text: "URL not allowed" }] };
		}
		api.output(`fetching ${target.hostname}\n`);
		const response = await fetch(target, {
			signal: context.abortSignal,
			redirect: "manual",
		});
		if (!response.ok || !response.body) {
			return { output: [{ type: "text", text: `HTTP ${response.status}` }] };
		}
		// Read at most 256 KiB of the page into the model context.
		const limit = 256 * 1024;
		const reader = response.body.getReader();
		const chunks: Uint8Array[] = [];
		let total = 0;
		while (total < limit) {
			const { done, value } = await reader.read();
			if (done) break;
			chunks.push(value);
			total += value.byteLength;
		}
		await reader.cancel();
		const bytes = new Uint8Array(total);
		let offset = 0;
		for (const chunk of chunks) {
			bytes.set(chunk, offset);
			offset += chunk.byteLength;
		}
		const text = new TextDecoder().decode(bytes.subarray(0, limit));
		return { output: [{ type: "text", text }] };
	},
};
```

### Submit, wait, and label input

```ts
const receipt = await this.harness.submit("Summarize the latest report", {
	operationId: "report-summary-42",
});

// Later, possibly from another request:
const result = await this.harness.wait(receipt.operationId);
// { operationId, session, status: "done" | "unanswered", text?, reason? }

await this.harness.submit("The deploy was approved. Run the migration.", {
	entry: { kind: "app.approval", data: { approved: true, by: "ben" } },
});
```

### Sessions and watching state

```ts
const session = await this.harness.sessions.create();
await session.submit("Draft a release note");

const fork = await this.harness.sessions.fork(session.id);
const all = await this.harness.sessions.list();
```

```ts
import type { ConversationView, LiveState } from "@earendil-works/pi-durable";

const watch = await this.harness.session().watch();
render(watch.value);

watch.start(async (call) => {
	if (call.kind === "value") render(call.value);
});

function render(view: ConversationView) {
	// A session that has never run has no pi.live yet.
	const live = (view.docs["pi.live"] ?? {}) as LiveState;
	drawEntries(view.entries);
	if (live.generation?.message) drawStreaming(live.generation.message);
	if (live.runFailure) drawFailure(live.runFailure);
}

// When the client goes away:
await watch.stop();
```

`render`, `drawEntries`, `drawStreaming`, and `drawFailure` are your own functions (WebSocket, HTTP, or RPC transport).

### Skills extension

Adapted (not in the official docs): the factory body is completed with the model setup and `return Harness.open(...)` from the main example; the source ends the factory with a comment and returns nothing. See Notes.

```ts
import { skills } from "agents/harness/pi";
import { manifest } from "agents/skills";

const handbook = manifest({
	id: "handbook",
	skills: [
		{
			name: "release-notes",
			description: "Write release notes.",
			body: "One line per change.",
		},
	],
});

harness = new PiHarness({
	harness: async ({ storage, context, onWake }) => {
		this.registry.install(await skills([handbook]));
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
```

## Related

- [overview.md](./overview.md)
- [opencode.md](./opencode.md)
- [think-overview.md](./think-overview.md)

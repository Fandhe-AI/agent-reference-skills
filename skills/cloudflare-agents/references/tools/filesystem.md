---
source: https://developers.cloudflare.com/agents/tools/filesystem/
---

# File system tool (Cloudflare Computer)

`@cloudflare/computer` gives an agent a persistent SQLite-backed `Workspace` inside its Durable Object, model-facing file tools (`read`, `ls`, `find`, `grep`, `write`, `edit`, `delete`, optional `exec`), and an optional sandboxed JavaScript runtime.

## Signature / Usage

```ts
import { Workspace } from "@cloudflare/computer";
import { DurableObject } from "cloudflare:workers";

export class NotesAgent extends DurableObject<Env> {
	workspace = new Workspace({ storage: this.ctx.storage });

	async addTodo(item: string) {
		const path = "/workspace/notes/todo.md";
		await this.workspace.fs.mkdir("/workspace/notes", { recursive: true });

		let todo = "";
		try {
			todo = await this.workspace.fs.readFile(path, "utf8");
		} catch (error) {
			// A missing file means there are no to-do items yet.
			if ((error as { code?: string }).code !== "ENOENT") throw error;
		}

		todo += `- [ ] ${item}\n`;
		await this.workspace.fs.writeFile(path, todo);
		return todo;
	}
}
```

Install: `npm i @cloudflare/computer zod` (AI SDK tools also need `ai`). Requires the `nodejs_compat` flag, a Durable Object binding, and a `new_sqlite_classes` migration:

```jsonc
{
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat"],
	"durable_objects": {
		"bindings": [
			{
				"class_name": "NotesAgent",
				"name": "NotesAgent"
			}
		]
	},
	"migrations": [
		{
			"tag": "v1",
			"new_sqlite_classes": ["NotesAgent"]
		}
	]
}
```

Give the model file tools via the AI SDK adapter (read-only variant: `createAITools({ workspace: this.workspace, readonly: true })`). Pi uses `createPiTools` from `@cloudflare/computer/tools/pi-ai`; TanStack uses `createTanStackTools`; Think adds the tools automatically.

```ts
import { Workspace } from "@cloudflare/computer";
import { createAITools } from "@cloudflare/computer/tools/ai-sdk";
import { generateText, stepCountIs } from "ai";
import { DurableObject } from "cloudflare:workers";
import { createAI } from "agents/models/ai-sdk";

export class WriterAgent extends DurableObject<Env> {
	workspace = new Workspace({ storage: this.ctx.storage });

	async write(prompt: string) {
		const { text } = await generateText({
			model: createAI({ binding: this.env.AI })(
				"@cf/moonshotai/kimi-k2.6",
			),
			system:
				"You are a writing assistant. Keep drafts and notes as files under /workspace.",
			prompt,
			tools: createAITools({
				workspace: this.workspace,
				read: { maxBytes: 32 * 1024, maxLines: 800 },
			}),
			stopWhen: stepCountIs(20),
		});
		return text;
	}
}
```

Run JavaScript against workspace files in a Dynamic Worker (requires a `worker_loaders` binding named `LOADER`):

```ts
import { Workspace } from "@cloudflare/computer";
import { CodemodeBackend } from "@cloudflare/computer/backends/codemode";
import { DurableObject } from "cloudflare:workers";

export class NotesAgent extends DurableObject<Env> {
	workspace = new Workspace({
		storage: this.ctx.storage,
		backends: [new CodemodeBackend({ loader: this.env.LOADER })],
	});
}
```

Module the model (or your code) runs; the default export is required and file calls must be inside the function:

```js
import fs from "node:fs/promises";

export default async function (input) {
	const names = await fs.readdir("/workspace/notes");
	const counts = {};
	for (const name of names) {
		const text = await fs.readFile(`/workspace/notes/${name}`, "utf8");
		counts[name] = text.split(/\s+/).filter(Boolean).length;
	}
	return counts;
}
```

Host modules under `codemode:` expose your functions to that code (validate inputs: they come from the model):

```ts
new CodemodeBackend({
	loader: this.env.LOADER,
	modules: {
		"codemode:orders": {
			// Arguments arrive as an array of JSON-compatible values.
			lookup: ([orderId]) => this.lookUpOrder(String(orderId)),
		},
	},
});
```

Waiting for approval from inside a replayable run (experimental):

```ts
new CodemodeBackend({
	loader: this.env.LOADER,
	onInterrupt: "replay",
	modules: {
		"codemode:github": {
			postComment: async ([issue, body], ctx) => {
				const { approved } = await ctx.interrupt<{ approved: boolean }>({
					issue,
					body,
				});
				if (!approved) throw new Error("The comment was rejected.");
				return this.postComment(issue, body, { idempotencyKey: ctx.callId });
			},
		},
	},
});
```

```ts
for (const call of await this.workspace.runtime.pending()) {
	await this.workspace.runtime.respond(call.id, call.callId, {
		approved: true,
	});
}
```

## Options / Props

Tool adapter options (`createAITools`, `createPiTools`, `createTanStackTools`):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `workspace` | Workspace | Required | A `Workspace`, or a client from `getWorkspace()`. |
| `readonly` | boolean | `false` | Offers only `read`, `ls`, `find`, and `grep`. |
| `read` | object | Default caps | Limits for `read` (`maxBytes`, `maxLines`, `includeLineNumbers`). |
| `write` | object | Default caps | Limits for `write`. |
| `edit` | object | Default caps | Limits for `edit`. |
| `exec` | object | Every backend | Set `exec.backends` to a map from backend ID to `{ description }`; `exec: { backends: {} }` leaves out the `exec` tool. |

`new Workspace(options)`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `storage` | DurableObjectStorage | Required | `this.ctx.storage`. |
| `backends` | array | — | Execution backends; the first is the default. |
| `mounts` | — | — | Read-only content from an R2 bucket (`R2Bucket()`) or the Worker bundle (`WorkerBundle()`). |
| `git` | — | — | Git client from `createGitClient()` (`@cloudflare/computer/git`); enables `workspace.git`. |
| `defaultGitIdentity` | `{ name, email }` | — | Identity for Git commits. |
| `artifacts` | `{ binding }` | — | Artifacts binding. |
| `output` | — | — | Where long command output is saved and how much `result()` keeps. |

`CodemodeBackend` options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `loader` | Worker Loader binding | Required | The Worker Loader binding. |
| `id` | string | `"codemode"` | Backend ID used by `exec` and `runtime.exec()`. |
| `root` | string | `/workspace` | Directory code can access; paths outside are rejected. |
| `access` | string | `"read-write"` | `"read"` lets code read but not change files. |
| `defaultTimeoutMs` | number | `60000` | Run time when the caller sets no timeout. |
| `maxTimeoutMs` | number | `180000` | Longest timeout a caller can request. |
| `globalOutbound` | Fetcher or null | `null` | Receives every outbound request; `null` blocks network access. |
| `modules` | object | — | Extra importable modules (e.g. `codemode:` host modules). |
| `onInterrupt` | `"fail"`, `"restart"`, `"replay"` | `"fail"` | What happens to runs a restart interrupts. |
| `onWait` | function | — | Called when a host module call starts waiting for an answer. |

`workspace.fs` methods (all paths absolute, all async): `readFile`, `writeFile`, `mkdir`, `readdir`, `stat`, `lstat`, `rm`, `rename`, `symlink`, `readlink`, `chmod`, `find`, `ls`, `grep`. Failures reject with a POSIX `code` such as `ENOENT`.

`workspace.runtime` methods: `exec(source, options?)`, `getExec`, `killExec`, `disposeExec`, `backends`, `recover` (experimental), `pending` (experimental), `respond` (experimental). `exec()` options: `backend`, `input`, `encoding`, `cwd`, `env`, `stdin`, `timeoutMs`, `onInterrupt`. Results contain `status`, `exitCode`, `stdout`, `stderr`, `value`, and `truncated`. Declare handles with `using`.

Host module factories: `createGitModule()` (`codemode:git`, pass `{ allowNetwork: true }` to clone/fetch/push), `createArtifactsModule()` (`codemode:artifacts`), `createToolBindings()` (`codemode:tools`).

## Notes

- Isolation: JavaScript runs execute in a new Dynamic Worker; code cannot read the agent's environment variables, bindings, or storage. It reaches only files under `root`, configured modules, and the network only when you pass `globalOutbound` (off by default). The backend runs ECMAScript modules, not shell commands or native binaries; use the Sandbox tool for Linux.
- Host modules run with the agent's full access. Expose only functions the model-written code needs, validate their input, keep secrets out of tool arguments, and require approval for side effects (`ctx.interrupt()` / approvals in Think).
- File contents are untrusted input to the model (prompt injection); check results before acting outside the workspace.
- All users of one agent instance share its workspace; use one instance per user for separation. Storage is the Durable Object's (size for working files, not monorepos).
- Experimental: resuming runs and waiting for answers may change in any release; interrupted runs fail across upgrades. Replay needs identical paths; pass `ctx.callId` as an idempotency key and wrap non-repeatable functions in `unsafeToRepeat()` (from `@cloudflare/computer`). A call may call `ctx.interrupt()` once; only `onInterrupt: "replay"` runs can wait; `respond()` throws `ENOTWAITING` for non-waiting calls. Replay buffers `fetch` bodies up to 1 MiB, a run gets three attempts, and interrupted runs restart four at a time. Call `workspace.runtime.recover()` from a Durable Object alarm to resume without traffic.
- Pi adapter: mark `read`, `ls`, `find`, `grep`, `write`, `delete` as `replay: "safe"` and `edit`/`exec` unsafe (see the official page's `workspaceTools` helper). A custom Think tool with the same name replaces a workspace tool.
- Completed runs are kept 60 minutes by default. Source: https://github.com/cloudflare/computer. Think workspace tools: [think-tools.md](../harnesses/think-tools.md) ; Dynamic Workers: https://developers.cloudflare.com/dynamic-workers/

## Related

- [Sandbox](./sandbox.md)
- [Skills tools](./skills-tools.md)
- [Code Mode durable runtime](./codemode-durable-runtime.md)

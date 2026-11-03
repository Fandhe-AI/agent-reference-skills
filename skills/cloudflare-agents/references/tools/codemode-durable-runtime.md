---
source: https://developers.cloudflare.com/agents/tools/codemode/durable-runtime/
---

# Create a durable Code Mode runtime

Add a Code Mode runtime with connectors, durable approvals, rollback, execution history, and snippets to an Agents SDK application (`AIChatAgent` plus the AI SDK in the example).

## Signature / Usage

Install `@cloudflare/codemode`, add a Worker Loader binding (`"worker_loaders": [{ "binding": "LOADER" }]`, `nodejs_compat`), and add the Vite plugins:

```ts
import { cloudflare } from "@cloudflare/vite-plugin";
import codemode from "@cloudflare/codemode/vite";
import agents from "agents/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [agents(), codemode(), cloudflare()],
});
```

Without the plugin, export the facet class manually: `export { CodemodeRuntime } from "@cloudflare/codemode";`.

A connector (plain class). `name()` becomes the sandbox global; `requiresApproval: true` pauses before execution; `revert` enables rollback:

```ts
import {
	CodemodeConnector,
	type ConnectorTools,
} from "@cloudflare/codemode";

type Note = { id: string; text: string };

export class NotesConnector extends CodemodeConnector<Env> {
	private storage: DurableObjectStorage;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		this.storage = ctx.storage;
	}

	override name() {
		return "notes";
	}

	protected override instructions() {
		return "Use this connector to list and create saved notes.";
	}

	protected override tools(): ConnectorTools {
		return {
			listNotes: {
				description: "List saved notes.",
				execute: async () =>
					(await this.storage.get<Note[]>("notes")) ?? [],
			},
			createNote: {
				description: "Create a saved note.",
				inputSchema: {
					type: "object",
					properties: { text: { type: "string" } },
					required: ["text"],
				},
				requiresApproval: true,
				execute: async (input) => {
					const { text } = input as { text: string };
					const note = { id: crypto.randomUUID(), text };
					const notes = (await this.storage.get<Note[]>("notes")) ?? [];
					await this.storage.put("notes", [...notes, note]);
					return note;
				},
				revert: async (_input, result) => {
					const { id } = result as Note;
					const notes = (await this.storage.get<Note[]>("notes")) ?? [];
					await this.storage.put(
						"notes",
						notes.filter((note) => note.id !== id),
					);
				},
			},
		};
	}
}
```

Create the runtime in an Agent and expose approval controls:

```ts
import { AIChatAgent } from "@cloudflare/ai-chat";
import {
	createCodemodeRuntime,
	DynamicWorkerExecutor,
	type CodemodeRuntimeHandle,
	type ExecutionState,
	type PendingAction,
	type Snippet,
} from "@cloudflare/codemode";
import { callable } from "agents";
import { convertToModelMessages, stepCountIs, streamText } from "ai";
import { NotesConnector } from "./notes-connector";
import { model } from "./model";

export class Chat extends AIChatAgent<Env> {
	#runtime(): CodemodeRuntimeHandle {
		return createCodemodeRuntime({
			ctx: this.ctx,
			executor: new DynamicWorkerExecutor({ loader: this.env.LOADER }),
			connectors: [new NotesConnector(this.ctx, this.env)],
		});
	}

	async onChatMessage() {
		const result = streamText({
			model,
			messages: await convertToModelMessages(this.messages),
			tools: { codemode: this.#runtime().tool() },
			stopWhen: stepCountIs(10),
		});

		return result.toUIMessageStreamResponse();
	}

	@callable()
	async pendingApprovals(): Promise<PendingAction[]> {
		return this.#runtime().pending();
	}

	@callable()
	async approveExecution(executionId: string) {
		return this.#runtime().approve({ executionId });
	}

	@callable()
	async rejectExecution(executionId: string, seq: number): Promise<boolean> {
		return this.#runtime().reject({ executionId, seq });
	}

	@callable()
	async rollbackExecution(executionId: string): Promise<void> {
		await this.#runtime().rollback({ executionId });
	}

	@callable()
	async executionHistory(): Promise<ExecutionState[]> {
		return this.#runtime().executions(20);
	}

	@callable()
	async saveSnippet(
		name: string,
		description: string,
		executionId: string,
	): Promise<Snippet> {
		const runtime = this.#runtime();
		const execution = (await runtime.executions()).find(
			(item) => item.id === executionId,
		);
		if (execution?.status !== "completed") {
			throw new Error("Only completed executions can be saved as snippets.");
		}

		return runtime.saveSnippet(name, { description, executionId });
	}

	@callable()
	async snippets(): Promise<Snippet[]> {
		return this.#runtime().snippets();
	}
}
```

Use the runtime without an AI SDK adapter (for example from an MCP server):

```ts
const runtime = this.#runtime();
const matches = await runtime.search("create note");
const method = matches.results[0];
const docs = await runtime.describe(method.path);
const outcome = await runtime.execute({
	code: `async () => notes.createNote({ text: "Follow up" })`,
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ctx` | DurableObjectState | — | Agent/Durable Object context hosting the runtime facet. |
| `executor` | `DynamicWorkerExecutor` | — | Runs generated code in isolated Workers via `loader`. |
| `connectors` | array | — | Connectors (`CodemodeConnector`, `McpConnector`, `OpenApiConnector`, `ToolSetConnector`). |
| `requiresApproval` | boolean | — | Per connector tool: pause before execute. |
| `revert` | function | — | Per connector tool: compensation used by `rollback()`. |
| `runtime.tool()` | method | — | Returns the AI SDK `codemode` tool. |
| `runtime.pending()` / `approve({ executionId })` / `reject({ executionId, seq })` / `rollback({ executionId })` | methods | — | Approval and rollback controls. |
| `runtime.executions(n?)` / `saveSnippet(name, opts)` / `snippets()` | methods | — | History and snippets. |

## Notes

- Experimental; breaking changes possible.
- Human-in-the-loop: mark destructive or side-effecting connector methods `requiresApproval: true` so the run pauses durably (surviving hibernation) until a user approves. Rejecting ends the run and does not undo earlier actions.
- Security of the example: `approveExecution`, `rejectExecution`, and `rollbackExecution` are `@callable()` client-facing methods with no authorization in the official example. In an application, verify the caller is an authorized user before approving or rolling back, and never let the model trigger approval itself.
- Do not put secrets in tool arguments or connector `instructions()`; they are recorded in the durable execution log and visible to the model.
- `search()` and `describe()` do not run sandbox code; results flag `requiresApproval: true` methods. `execute()` returns the same durable result as the model-facing tool (completed, paused, or error); resolve paused results with `approve()` or `reject()`.
- Save only completed executions as snippets. Replace the `model` import with your own model setup.
- Cleanup/maintenance (`expirePaused()`, `pruneExecutions()`) is described in [How Code Mode works](./codemode-how-it-works.md).

## Related

- [How Code Mode works](./codemode-how-it-works.md)
- [Code Mode with MCP](./codemode-mcp.md)
- [Code Mode with OpenAPI](./codemode-openapi.md)

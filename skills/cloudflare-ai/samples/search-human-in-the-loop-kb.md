---
source: https://developers.cloudflare.com/ai-search/how-to/human-in-the-loop-knowledge-base/
---

# Human-in-the-loop knowledge base updates

An agent that searches an AI Search instance and proposes new documents, with each write paused for human approval and reversible by rollback (Code Mode, experimental).

## Signature / Usage

In a C3 Worker project (`npm create cloudflare@latest`), install the dependencies (`ai` and `zod` are pinned to the Agents SDK peer ranges) and Wrangler v4:

```sh
npm i @cloudflare/codemode @cloudflare/ai-chat agents ai@6 workers-ai-provider zod@4
```

```sh
npm i -D wrangler@4
```

`wrangler.jsonc`:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "kb-agent",
  "main": "src/server.ts",
  "upload_source_maps": true,
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "ai": {
    "binding": "AI"
  },
  "ai_search_namespaces": [
    {
      "binding": "AI_SEARCH",
      "namespace": "default",
      "remote": true
    }
  ],
  "worker_loaders": [
    {
      "binding": "LOADER"
    }
  ],
  "durable_objects": {
    "bindings": [
      {
        "name": "Chat",
        "class_name": "Chat"
      }
    ]
  },
  "migrations": [
    {
      "tag": "v1",
      "new_sqlite_classes": [
        "Chat"
      ]
    }
  ]
}
```

`src/ai-search-connector.ts` (a read-only `search` plus an approval-gated, revertible `saveDocument`):

```ts
import { CodemodeConnector, type ConnectorTools } from "@cloudflare/codemode";

// The instance this connector reads from and writes to.
const INSTANCE_NAME = "knowledge-base";

// A connector turns AI Search operations into methods the model can call from
// its generated code. Each connector becomes one named object in the sandbox.
export class AISearchConnector extends CodemodeConnector<Env> {
	// The sandbox global. The model calls `aiSearch.search()` and
	// `aiSearch.saveDocument()`.
	override name() {
		return "aiSearch";
	}

	// Shown to the model so it knows what this connector is for.
	protected override instructions() {
		return "Use this connector to search indexed content and save new documents.";
	}

	// Every method the model can call. `inputSchema` is JSON Schema; the runtime
	// validates the model's arguments against it before calling `execute`.
	protected override tools(): ConnectorTools {
		return {
			// Read-only, so it runs without approval.
			search: {
				description: "Search indexed content and return the matching chunks.",
				inputSchema: {
					type: "object",
					properties: { query: { type: "string" } },
					required: ["query"],
				},
				execute: async (input) => {
					const { query } = input as { query: string };
					return this.env.AI_SEARCH.get(INSTANCE_NAME).search({
						query,
						ai_search_options: { retrieval: { max_num_results: 5 } },
					});
				},
			},
			// Writes content, so it is gated behind approval and made reversible.
			saveDocument: {
				description: "Save a new document to the knowledge base.",
				inputSchema: {
					type: "object",
					properties: {
						name: { type: "string" },
						content: { type: "string" },
					},
					required: ["name", "content"],
				},
				// Pauses the run before this method executes so a human can approve it.
				requiresApproval: true,
				execute: async (input) => {
					const { name, content } = input as { name: string; content: string };
					// upload() queues the document for indexing and returns right away.
					// The item becomes searchable once indexing finishes, a few seconds later.
					const item = await this.env.AI_SEARCH.get(INSTANCE_NAME).items.upload(
						name,
						content,
					);
					// This return value is passed to `revert` if the call is rolled back.
					return { id: item.id, key: item.key, status: item.status };
				},
				// Compensating action for rollback: delete the document this call added.
				revert: async (_input, result) => {
					const { id } = result as { id: string };
					await this.env.AI_SEARCH.get(INSTANCE_NAME).items.delete(id);
				},
			},
		};
	}
}
```

`src/server.ts`:

Adapted (not in the official docs): `ensureInstance()` no longer swallows every error (it only continues when the instance is readable), and the Worker entry passes `onBeforeConnect` / `onBeforeRequest` hooks to `routeAgentRequest()` that reject every caller the `authenticate()` placeholder cannot verify (fail closed: it returns `null` until you implement it). Without a check, anyone who can reach the Worker could chat with the agent and call `approveExecution`, defeating the human gate. See Notes.

```ts
import { AIChatAgent } from "@cloudflare/ai-chat";
import {
	createCodemodeRuntime,
	DynamicWorkerExecutor,
	type CodemodeRuntimeHandle,
	type PendingAction,
} from "@cloudflare/codemode";
import { callable, routeAgentRequest } from "agents";
import { createWorkersAI } from "workers-ai-provider";
import { convertToModelMessages, stepCountIs, streamText } from "ai";
import { AISearchConnector } from "./ai-search-connector";

// Code Mode stores its durable state (execution log, pending approvals) in a
// facet exported from the Worker entry. The runtime requires this export.
export { CodemodeRuntime } from "@cloudflare/codemode";

const INSTANCE_NAME = "knowledge-base";

// Seed content, so the agent has something to find on the first query.
const SEED_DOC = `# Getting started
AI Search indexes your content so an agent can search it and add to it.`;

export class Chat extends AIChatAgent<Env> {
	// In-memory guard, so the one-time setup runs once per instance lifetime.
	private ready = false;

	// Create the AI Search instance, which uses hybrid search by default, then seed it.
	private async ensureInstance() {
		if (this.ready) return;
		try {
			await this.env.AI_SEARCH.create({
				id: INSTANCE_NAME,
			});
			// Queue the seed document for indexing so the first search has content.
			await this.env.AI_SEARCH.get(INSTANCE_NAME).items.upload(
				"getting-started.md",
				SEED_DOC,
			);
		} catch (error) {
			// Tolerate "already exists" only: if the instance is readable, carry on;
			// otherwise surface the real failure and retry on the next message.
			try {
				await this.env.AI_SEARCH.get(INSTANCE_NAME).info();
			} catch {
				throw error;
			}
		}
		this.ready = true;
	}

	// Build the Code Mode runtime for this request. The handle is cheap to
	// create; the durable state lives in the Durable Object, not the handle.
	#runtime(): CodemodeRuntimeHandle {
		return createCodemodeRuntime({
			ctx: this.ctx,
			// Runs the model's generated code in an isolated Worker.
			executor: new DynamicWorkerExecutor({ loader: this.env.LOADER }),
			connectors: [new AISearchConnector(this.ctx, this.env)],
		});
	}

	// Runs on every chat message from the client.
	async onChatMessage() {
		await this.ensureInstance();

		const workersai = createWorkersAI({ binding: this.env.AI });

		const result = streamText({
			model: workersai("@cf/zai-org/glm-5.2"),
			system:
				"You help maintain a knowledge base. Use codemode to search existing " +
				"content and to save new documents. Search before you answer.",
			messages: await convertToModelMessages(this.messages),
			// The model sees one `codemode` tool and writes code that calls the connector.
			tools: { codemode: this.#runtime().tool() },
			// Cap the agent's tool-use loop.
			stopWhen: stepCountIs(10),
		});

		return result.toUIMessageStreamResponse();
	}

	// The methods below are called from your client to drive the approval flow.

	// List the writes that are paused waiting for approval.
	@callable()
	async pendingApprovals(): Promise<PendingAction[]> {
		return this.#runtime().pending();
	}

	// Approve a paused write. The runtime resumes the program and runs it.
	@callable()
	async approveExecution(executionId: string) {
		return this.#runtime().approve({ executionId });
	}

	// Decline a paused write. The execution ends without saving.
	@callable()
	async rejectExecution(executionId: string, seq: number): Promise<boolean> {
		return this.#runtime().reject({ executionId, seq });
	}

	// Undo an applied write by running the connector's revert.
	@callable()
	async rollbackExecution(executionId: string): Promise<void> {
		await this.#runtime().rollback({ executionId });
	}
}

// Verify the caller here (a session cookie, a JWT, or an API key). Only the
// people allowed to approve writes should pass. Returning null rejects the
// request (fail closed).
async function authenticate(
	_request: Request,
	_env: Env,
): Promise<{ id: string } | null> {
	return null;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		// Runs before every WebSocket upgrade and HTTP request reaches the agent.
		const check = async (req: Request) => {
			if (!(await authenticate(req, env))) {
				return new Response("Unauthorized", { status: 401 });
			}
		};

		return (
			(await routeAgentRequest(request, env, {
				onBeforeConnect: check,
				onBeforeRequest: check,
			})) || new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

Generate the `Env` types from the Wrangler configuration once it and the code are in place:

```sh
npx wrangler types
```

Deploy (AI Search has no local emulator, so the guide exercises the agent on the deployed Worker):

```sh
npx wrangler login
npx wrangler deploy
```

## Notes

- Adapted from the official docs: the routing hooks in the Worker entry (the pattern from https://developers.cloudflare.com/agents/runtime/routing/authentication/; the official entry routes every request unchecked), and `ensureInstance()` error handling (the official empty catch hid real failures). `authenticate()` is a fail-closed placeholder: until you implement it, every request is rejected with 401. Clients cannot set an `Authorization` header on a WebSocket upgrade, so verify something they can send, such as a session cookie. The official client (`AgentClient` from `agents/client` with `name: "default"`, calling `pendingApprovals`, `approveExecution`, `rejectExecution`, `rollbackExecution`) is not reproduced.
- The model sees one `codemode` tool and writes a program calling `aiSearch.search()` and `aiSearch.saveDocument()`; the run pauses at `saveDocument`. `approveExecution` replays the program and runs it, `rejectExecution` ends it without saving, `rollbackExecution` runs `revert` and deletes the uploaded document.
- `AIChatAgent` persists to SQLite, so `Chat` must be in `new_sqlite_classes`. The guide states that the `remote: true` AI Search binding always talks to the remote service and therefore exercises this agent by deploying it rather than with `wrangler dev`.
- Code Mode is experimental and may introduce breaking changes. Agents SDK details are covered by the cloudflare-agents skill (agents-sdk; https://developers.cloudflare.com/agents/); the AI SDK by vercel-ai-sdk.
- The retrieved/saved content is model-visible; do not put secrets in the knowledge base.

## Related

- [Items Workers binding](../references/ai-search/items-workers-binding.md)
- [Namespace methods](../references/ai-search/namespace-methods.md)

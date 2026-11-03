---
source: https://developers.cloudflare.com/agents/concepts/conversation-state-and-memory/
---

# Conversation state and memory

Experimental. The Session memory API manages conversation history (a message tree) and context memory (blocks injected into the system prompt: read-only, writable, searchable). Import path is `agents/experimental/memory/session` and may change before graduation.

## Signature / Usage

Adapted (not in the official docs): the page's fragments use `this` and top-level `await` outside any class; they are wrapped in `Agent` subclasses/functions, and the missing AI SDK imports and `myModel` / `myApplicationTools` declarations are added so the snippets are self-contained; see Notes.

```ts
import { Agent } from "agents";
import { Session } from "agents/experimental/memory/session";

export class MemoryAgent extends Agent<Env> {
	readonly session = Session.create(this)
		.withContext("soul", {
			provider: { get: async () => "You are a helpful assistant." },
		})
		.withContext("memory", { description: "Learned facts", maxTokens: 1100 })
		.withCachedPrompt(); // Persist the frozen prompt across hibernation

	async prepareTurn() {
		// During a conversation turn:
		const system = await this.session.freezeSystemPrompt(); // Same value every call
		const tools = await this.session.tools();

		// ... agent calls set_context to update memory ...
		// The frozen prompt is NOT changed, prefix cache stays warm

		// Between turns (optional, if you want the agent to see its own updates):
		await this.session.refreshSystemPrompt();
		return { system, tools };
	}
}
```

History, search, and passing session tools to the model:

Adapted (not in the official docs): wrapped in a function; imports and `myModel` / `myApplicationTools` declarations added.

```ts
import { convertToModelMessages, streamText, type LanguageModel, type ToolSet } from "ai";
import type { Session } from "agents/experimental/memory/session";

declare const myModel: LanguageModel;
declare const myApplicationTools: ToolSet;

export async function respond(session: Session) {
	// Append messages as the conversation progresses
	await session.appendMessage({
		id: `user-${crypto.randomUUID()}`,
		role: "user",
		parts: [{ type: "text", text: "What's the status of the deployment?" }],
	});

	// Read the full conversation history
	const history = await session.getHistory();
	const results = await session.search("deployment Friday", { limit: 10 });

	const sessionTools = await session.tools();
	const allTools = { ...sessionTools, ...myApplicationTools };

	const result = streamText({
		model: myModel,
		system: await session.freezeSystemPrompt(),
		messages: await convertToModelMessages(await session.getHistory()),
		tools: allTools,
	});
	return { history, results, result };
}
```

Searchable context and compaction:

Adapted (not in the official docs): wrapped in an `Agent` subclass; imports and `myModel` declaration added.

```ts
import { Agent } from "agents";
import {
	AgentSearchProvider,
	Session,
} from "agents/experimental/memory/session";
import { createCompactFunction } from "agents/experimental/memory/utils/compaction-helpers";
import { generateText, type LanguageModel } from "ai";

declare const myModel: LanguageModel;

export class KnowledgeAgent extends Agent<Env> {
	readonly session = Session.create(this)
		.withContext("knowledge", {
			description:
				"Searchable knowledge base, search for relevant information before answering",
			provider: new AgentSearchProvider(this),
		})
		.withContext("memory", { maxTokens: 1100 })
		.onCompaction(
			createCompactFunction({
				summarize: (prompt) =>
					generateText({ model: myModel, prompt }).then((r) => r.text),
				protectHead: 3,
				tailTokenBudget: 20000,
				minTailMessages: 2,
			}),
		)
		.compactAfter(100_000); // Auto-compact when token estimate exceeds threshold
}
```

## Options / Props

Context block types (determined by the provider; the Session detects capabilities):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Read-only context | provider with only `get()` | — | Identity/instructions injected into the system prompt; the agent cannot modify it; no tools generated. Can be loaded from R2 so it changes without redeploying. |
| Writable short-form context | `withContext(name, { description, maxTokens })` with no provider | — | Auto-wired SQLite provider; the agent gets `set_context` to replace or append; `maxTokens` enforced; shown with a usage indicator. |
| Searchable context | provider with `search()` (optionally `get()`, `set()`) | — | Summary (such as "42 entries indexed") in the prompt; entries retrieved on demand. `AgentSearchProvider` uses Durable Object SQLite with FTS5; custom providers may use Vectorize or an external API. |
| On-demand skills | Agent Skills | — | Short catalog; load a full skill with `activate_skill`. Skills are files, not memory blocks. |

Generated tools:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `set_context` | tool | — | Generated when any writable or search block exists; writes to a named block (replace/append, or a keyed entry for search blocks). |
| `search_context` | tool | — | Generated when any search block exists; full-text search within a block. |
| `session_search` | tool | — | Generated when using `SessionManager`; searches across all sessions. |

Session API:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `appendMessage(message, { parentId? })` | method | — | A `parentId` that already has children creates a branch. |
| `getHistory(leafId?)`, `search(query, { limit })` | method | — | Walk any path through the tree; full-text search across history. |
| `freezeSystemPrompt()`, `withCachedPrompt()`, `refreshSystemPrompt()` | method | — | Prompt-cache-friendly system prompt (see Notes). |
| `onCompaction(fn)`, `compactAfter(tokens)` | method | — | Register macro-compaction; auto-trigger threshold. |
| `createCompactFunction({ summarize, protectHead, tailTokenBudget, minTailMessages })` | function | — | Builds a compaction function. |
| `truncateOlderMessages(history)` | function | last 4 kept | Micro-compaction at read time on a copy; stored messages are not mutated. |

## Notes

- This experimental `agents/experimental/memory/session` API is distinct from the `Sessions` capability (`agents/sessions`, see the runtime Sessions page). The official page links its API reference to the runtime `Sessions` page; check that page for the stable-versus-experimental differences before mixing the two.
- Conversation history is stored in a tree (`parent_id`) in SQLite and persists across hibernation and eviction.
- Prompt caching: `freezeSystemPrompt()` renders once and then returns the cached value; `withCachedPrompt()` persists it across hibernation. `set_context` updates the provider immediately but does not re-render the frozen prompt; call `refreshSystemPrompt()` between turns (not mid-turn) to expose the update.
- Macro-compaction is non-destructive (overlays applied at read time, originals kept), iterative (the existing summary is updated), and boundary-aware (tool call and result are not split); failure is non-fatal (the message is already saved). Micro-compaction also replaces oversized tool outputs with a preview when a message exceeds the SQLite row size limit.
- The system prompt renders each block with a header and tags `[readonly]`, `[writable]`, `[searchable]` plus token usage for writable blocks.
- Adapted from the official docs: the page shows bare fragments with `this` and top-level `await`; here they sit in `Agent` subclasses / a function, the AI SDK imports are added, and `myModel` / `myApplicationTools` are declared placeholders you replace with your own model and tools. The `Session` calls are unchanged.
- Opinionated memory is built into Think via `configureSession()`; simple UI state uses `setState()`.

## Related

- [Sessions](../runtime/sessions.md)
- [Agent Skills](./agent-skills.md)
- [Calling LLMs](./calling-llms.md)

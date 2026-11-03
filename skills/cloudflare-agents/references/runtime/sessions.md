---
source: https://developers.cloudflare.com/agents/runtime/capabilities/sessions/
---

# Sessions

Experimental. `Sessions` from `agents/sessions` stores conversation history in the Durable Object's SQLite database as a tree of messages (branches), with streamed reads, compaction, full-text search, and a change feed. It underpins the Think harness. Everything exported from `agents/sessions` may change between releases.

## Signature / Usage

Adapted (not in the official docs): the official handler appended the request body without checking it; this version validates the message shape (each part checked) and a byte-capped body first and treats client messages as `user` role only; `countToolCalls()` below is also hardened; see Notes.

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { Sessions, type SessionMessage } from "agents/sessions";

const MAX_MESSAGE_BYTES = 64 * 1024;

function isClientPart(value: unknown): boolean {
	if (typeof value !== "object" || value === null) return false;
	const p = value as Record<string, unknown>;
	if (p.type === "text") return typeof p.text === "string";
	if (p.type === "file") {
		return typeof p.url === "string" && typeof p.mediaType === "string";
	}
	return false;
}

function isClientMessage(value: unknown): value is SessionMessage {
	if (typeof value !== "object" || value === null) return false;
	const m = value as Record<string, unknown>;
	return (
		typeof m.id === "string" &&
		m.id.length > 0 &&
		m.id.length <= 128 &&
		m.role === "user" &&
		Array.isArray(m.parts) &&
		m.parts.length > 0 &&
		m.parts.every(isClientPart)
	);
}

// Reads the body as bytes and gives up as soon as the cap is exceeded.
async function readTextCapped(
	request: Request,
	maxBytes: number,
): Promise<string | null> {
	const declared = Number(request.headers.get("content-length"));
	if (Number.isFinite(declared) && declared > maxBytes) return null;
	if (!request.body) return "";
	const reader = request.body.getReader();
	const chunks: Uint8Array[] = [];
	let total = 0;
	for (;;) {
		const { done, value } = await reader.read();
		if (done) break;
		total += value.byteLength;
		if (total > maxBytes) {
			await reader.cancel();
			return null;
		}
		chunks.push(value);
	}
	const bytes = new Uint8Array(total);
	let offset = 0;
	for (const chunk of chunks) {
		bytes.set(chunk, offset);
		offset += chunk.byteLength;
	}
	return new TextDecoder().decode(bytes);
}

export class ConversationAgent extends DurableObject<Env> {
	readonly sessions = new Sessions();
	readonly lifecycle = Lifecycle.install(this).use(this.sessions);
	readonly session = this.sessions.session();

	async onRequest(request: Request): Promise<Response> {
		if (request.method === "POST") {
			const text = await readTextCapped(request, MAX_MESSAGE_BYTES);
			if (text === null) {
				return new Response("Payload too large", { status: 413 });
			}
			let message: unknown;
			try {
				message = JSON.parse(text);
			} catch {
				return new Response("Invalid JSON", { status: 400 });
			}
			if (!isClientMessage(message)) {
				return new Response("Invalid message", { status: 400 });
			}
			const result = await this.session.appendMessage(message, {
				source: "client",
			});
			return Response.json(result, { status: result.inserted ? 201 : 200 });
		}

		return Response.json(await this.session.getRecentHistory(1024 * 1024));
	}
}
```

Write, stream-read, branch, and search:

Adapted (not in the official docs): `countToolCalls()` skips messages without a `parts` array and parts without a string `type`; see Notes.

```ts
import type { Session, SessionMessage } from "agents/sessions";

async function saveUserMessage(session: Session, text: string) {
	const result = await session.appendMessage({
		id: crypto.randomUUID(),
		role: "user",
		parts: [{ type: "text", text }],
	});
	// result.inserted is false when a message with this ID already existed.
	return result.message;
}

async function countToolCalls(session: Session): Promise<number> {
	let count = 0;
	for await (const message of session.history()) {
		if (!Array.isArray(message.parts)) continue;
		count += message.parts.filter(
			(part) => typeof part?.type === "string" && part.type.startsWith("tool-"),
		).length;
	}
	return count;
}

async function regenerate(
	session: Session,
	userMessageId: string,
	reply: SessionMessage,
) {
	// Add a second reply to the same user message.
	await session.appendMessage(reply, { parentId: userMessageId });

	const replies = await session.getBranches(userMessageId);
	const path = await session.getHistory({ leafId: reply.id });
	return { replies, path };
}

async function find(session: Session, query: string) {
	const results = await session.search(query, { limit: 10 });
	return results.map(({ id, role, content }) => ({ id, role, content }));
}
```

Compaction:

```ts
import { DurableObject } from "cloudflare:workers";
import { generateText } from "ai";
import { Lifecycle } from "agents/lifecycle";
import { createAI } from "agents/models/ai-sdk";
import { Sessions, createCompactFunction } from "agents/sessions";

export class ConversationAgent extends DurableObject<Env> {
	readonly ai = createAI({ binding: this.env.AI });
	readonly sessions = new Sessions();
	readonly lifecycle = Lifecycle.install(this).use(this.sessions);
	readonly session = this.sessions
		.session()
		.onCompaction(
			createCompactFunction({
				summarize: async (prompt) => {
					const { text } = await generateText({
						model: this.ai("@cf/zai-org/glm-5.3-flash"),
						prompt,
					});
					return text;
				},
				keepRecentTokens: 20_000,
			}),
		)
		.compactAfter(80_000);
}
```

Untrusted input and several sessions:

```ts
import { Sessions } from "agents/sessions";

const sessions = new Sessions({
	reservedMetadataKeys: ["channel", "turnMetadata"],
});
const support = sessions.session("support");
const sales = sessions.session("sales");
```

## Options / Props

Choose a session store:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Pi | harness | — | Use Pi's session APIs; Pi stores its own transcript and does not require `Sessions`. |
| OpenCode | harness | — | Use OpenCode's session APIs; it owns its conversation storage. |
| Think | harness | — | `Sessions` already installed; start with Think's conversation APIs. |
| `AIChatAgent` | class | — | `Sessions` already installed; do not install a second copy. |
| Plain Durable Object | — | — | Install `Sessions` for its history, branching, search, compaction APIs, or use your own storage. |

Write methods (`SessionMessage` has `id`, `role`, `parts`; same shape as the AI SDK `UIMessage`):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `appendMessage(message, { parentId?, source? })` | `Promise<AppendResult>` | attaches to latest | Resolves to `{ inserted, message }`; an existing ID is not stored again. `parentId: null` starts a new root. |
| `updateMessage(message)` | method | — | Replaces a stored message; `null` when the ID is not in the session. |
| `upsertMessage(message)` | method | — | Updates if it exists, else appends. |
| `deleteMessages(ids)` | method | — | Deletes messages; children attach to the deleted message's parent. |
| `clearMessages()` | method | — | Deletes every message in the session. |
| `importMessage(message, { parentId, createdAt })` | method | — | Stores a message as is; sends no change event. |

Read methods:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `history(options?)` | async iterable | — | Streams messages root to latest. Options: `leafId`, `newestFirst`, `signal`. |
| `historyBatches(options?)` | async iterable | — | Arrays of messages; adds `batchSize`, `maxBatchBytes`. |
| `getRecentHistory(maxBytes, options?)` | method | — | Longest recent run fitting `maxBytes`, always including the latest; returns `{ messages, truncated, totalContentBytes }`. |
| `getHistory(options?)` | method | — | Whole path as an array. |
| `getMessage(id)`, `getLatestLeaf()`, `getBranches(id)` | method | — | One message or `null`; latest message; a message's children. |
| `getHistoryRowStats(leafId?)` | method | — | Stored size and token estimate per message, without content. |
| `search(query, { limit })` | method | — | Full-text search over text parts. |

Compaction and observation:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onCompaction(fn)`, `compactAfter(tokens)` | method | — | Register a compaction function; token count that triggers it. |
| `createCompactFunction({ summarize, keepRecentTokens })` | function | `keepRecentTokens` 20,000 | Builds a compaction function. |
| `compact(leafId?)`, `addCompaction(summary, fromId, toId)`, `getCompactions()` | method | — | Compact now; store your own summary; list summaries. |
| `sessions.subscribe(listener)` | method | — | Events (`append`, `update`, `delete`, `clear`, `compact`, `compaction`, `import`), each with `type` and `sessionId`; returns an unsubscribe function. |
| `session.mirror({ get, set, transform?, intercept? })` | method | — | Keeps an in-memory array in step with storage; returns a stop function. |
| `new Sessions({ reservedMetadataKeys })` | constructor | — | Metadata keys removed from `source: "client"` messages. |

## Notes

- `sessions.session()` without an ID returns the default session (ID is an empty string). Handles are cached. There is no list of sessions; keep your own directory.
- Adapted from the official docs: the first example now validates the body (byte-capped body read that aborts over 64 KB with 413 before `JSON.parse`, JSON parse, shape, each part checked as an object with `type: "text"` plus string `text` or `type: "file"` plus string `url` and `mediaType`, `user` role only; invalid input gets 400). The allowed client part types are a choice made here; widen them for your own client. `countToolCalls()` skips messages without a `parts` array and parts without a string `type` before `appendMessage()`; the `user`-only restriction and the 64 KB cap are choices made here, not from the page. It also needs a caller check (authenticate in the Worker). Validate the message shape before appending. Pass `source: "client"` for client-originated messages so reserved metadata keys are stripped. `Sessions` does not limit message size; oversized messages are split across rows and can use a lot of storage, so check sizes first. Inline media is stored outside the message row; keep real files in R2 and put a reference in the message.
- Avoid `getHistory()` for an unbounded conversation (loads everything). Breaking out of `history()` early leaves older messages unread; `newestFirst: true` is the cheapest way to find something recent.
- Branches: an append attaches to the latest message by default. Append `a2` with `parentId: "u1"` for an alternative reply; every read method accepts `leafId`.
- Compaction stores a summary applied at read time; originals are not deleted. The first three messages and at least the last two are always kept, and a tool call is never separated from its result. If automatic compaction fails it logs and leaves the conversation unchanged.
- The first `search()` builds a full-text index; later writes keep it updated.
- The change feed is local to the isolate, not an event log across objects.
- For user-facing chat, prefer one Durable Object per conversation. Tables start with `cf_agents_session_`. A message that cannot be JSON-serialized throws the `TypeError` from `JSON.stringify`; there is no error for oversize messages.

## Related

- [Capabilities](./capabilities.md)
- [Streams](./streams.md)
- [Build a capability](./build-a-capability.md)

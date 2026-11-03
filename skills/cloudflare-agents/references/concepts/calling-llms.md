---
source: https://developers.cloudflare.com/agents/concepts/calling-llms/
---

# Calling LLMs

Patterns that become possible when LLM calls happen inside a stateful `Agent`: state as prompt context, surviving client disconnects, autonomous scheduled calls, multi-model pipelines, and response caching.

## Signature / Usage

State as context:

```ts
import { Agent } from "agents";

export class ResearchAgent extends Agent<Env> {
	async buildPrompt(userMessage: string) {
		const history = this.sql<{ role: string; content: string }>`
			SELECT role, content FROM messages
			ORDER BY timestamp DESC LIMIT 50`;

		const preferences = this.sql<{ key: string; value: string }>`
			SELECT key, value FROM user_preferences`;

		return [
			{ role: "system", content: this.systemPrompt(preferences) },
			...history.reverse(),
			{ role: "user", content: userMessage },
		];
	}
}
```

Survive disconnections (persist the result so a reconnecting client can get it):

Adapted (not in the official docs): the official type annotations used `Connection` and `WSMessage` without importing them; imports added, a message-shape check added before use, `connection.send()` failures caught so the model stream is still drained and the full result saved, and an `onConnect()` that replays the latest saved row; see Notes.

```ts
import { Agent, type Connection, type WSMessage } from "agents";
import { streamText } from "ai";
import { createAI } from "agents/models/ai-sdk";

export class MyAgent extends Agent<Env> {
	async onMessage(connection: Connection, message: WSMessage) {
		let parsed: { prompt?: unknown } | null = null;
		try {
			parsed = typeof message === "string" ? JSON.parse(message) : null;
		} catch {
			return;
		}
		if (typeof parsed?.prompt !== "string") return;
		const prompt = parsed.prompt;
		const ai = createAI({ binding: this.env.AI });

		const result = streamText({
			model: ai("@cf/zai-org/glm-4.7-flash"),
			prompt,
		});

		// Keep consuming the model stream even if the client goes away, so the full result is saved.
		let delivering = true;
		for await (const chunk of result.textStream) {
			if (!delivering) continue;
			try {
				connection.send(JSON.stringify({ type: "chunk", content: chunk }));
			} catch {
				// Client disconnected: stop delivering chunks, keep draining the stream.
				delivering = false;
			}
		}

		this.sql`INSERT INTO responses (prompt, response, timestamp)
			VALUES (${prompt}, ${await result.text}, ${Date.now()})`;
	}

	// A reconnecting client receives the most recently saved result.
	async onConnect(connection: Connection) {
		const [latest] = this.sql<{ prompt: string; response: string }>`
			SELECT prompt, response FROM responses
			ORDER BY timestamp DESC LIMIT 1`;
		if (latest) {
			connection.send(JSON.stringify({ type: "saved", ...latest }));
		}
	}
}
```

Autonomous scheduled model call:

Adapted (not in the official docs): the official sample used `createAI` and `generateText` without importing them; imports added, and the `schedule()` call is awaited (it returns a promise; an un-awaited call in `onStart()` can fail silently); see Notes.

```ts
import { Agent } from "agents";
import { generateText } from "ai";
import { createAI } from "agents/models/ai-sdk";

export class DigestAgent extends Agent<Env> {
	async onStart() {
		await this.schedule("0 8 * * *", "generateDailyDigest", {});
	}

	async generateDailyDigest() {
		const articles = this.sql<{ title: string; body: string }>`
			SELECT title, body FROM articles
			WHERE created_at > datetime('now', '-1 day')`;

		const ai = createAI({ binding: this.env.AI });
		const { text } = await generateText({
			model: ai("@cf/zai-org/glm-4.7-flash"),
			prompt: `Summarize these articles:\n${articles.map((a) => a.title + ": " + a.body).join("\n\n")}`,
		});

		this.sql`INSERT INTO digests (summary, created_at)
			VALUES (${text}, ${Date.now()})`;

		this.broadcast(JSON.stringify({ type: "digest", summary: text }));
	}
}
```

Multi-model pipeline and cache:

```ts
import { Agent } from "agents";
import { generateText, embed } from "ai";
import { createAI } from "agents/models/ai-sdk";

export class TriageAgent extends Agent<Env> {
	async triage(ticket: string) {
		const ai = createAI({ binding: this.env.AI });

		const { text: category } = await generateText({
			model: ai("@cf/zai-org/glm-4.7-flash"),
			prompt: `Classify this support ticket into one of: billing, technical, account. Ticket: ${ticket}`,
		});

		const { embedding } = await embed({
			model: ai.embedding("@cf/baai/bge-base-en-v1.5"),
			value: ticket,
		});
		const similar = await this.env.VECTOR_DB.query(embedding, { topK: 5 });

		const { text: response } = await generateText({
			model: ai("@cf/zai-org/glm-4.7-flash"),
			prompt: `Draft a response for this ${category} ticket. Similar resolved tickets: ${JSON.stringify(similar)}. Ticket: ${ticket}`,
		});

		this.sql`INSERT INTO tickets (content, category, response, created_at)
			VALUES (${ticket}, ${category}, ${response}, ${Date.now()})`;

		return { category, response };
	}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| State as context | pattern | — | The Agent owns history in its SQL database, so clients do not resend the conversation; it can prune, enrich with retrieved documents, or summarize older turns. |
| Surviving disconnections | pattern | — | A slow reasoning model keeps running after the client disconnects; persist the response to state and deliver on reconnect. `AIChatAgent` does this automatically (SQLite persistence, stream resume). |
| Autonomous model calls | pattern | — | Schedule model calls with no user present (nightly summarization, classification, monitoring). |
| Multi-model pipelines | pattern | — | Chain a fast classifier, an embedding model, and a reasoning model in one method; persist the final result to SQL. |
| Caching | pattern | — | Store model responses in SQL keyed by prompt to avoid redundant calls; for provider-level caching and rate limits across agents use AI Gateway. |

## Notes

- Adapted from the official docs: the TS variant of `onMessage` used `Connection` / `WSMessage` without imports (added) and cast the message blindly with `JSON.parse(message as string)` (now checked, and a malformed JSON message is ignored instead of throwing); the digest sample omitted its `createAI` / `generateText` imports (added) and called `schedule()` without `await` (now awaited, matching the schedule-tasks page). The disconnect sample also wraps `connection.send()` in try/catch: if the client disconnects mid-stream, `send()` can throw, which would exit the loop before the `INSERT`; the loop now stops sending but keeps consuming the stream so the result is persisted, and `onConnect()` sends the latest `responses` row (a single-row replay; per-prompt lookup is up to your app, and the `responses` table is assumed to exist). The `systemPrompt()` helper, the `messages` / `user_preferences` / `articles` / `digests` / `tickets` / `llm_cache` tables, and the `VECTOR_DB` binding are assumed to exist in your app. The caching sample from the page (`CachingAgent.cachedGenerate`, a SELECT on `llm_cache` before the model call and an INSERT after) is summarized rather than reproduced.
- Each intermediate result lives in the Agent's memory only for the method's duration. Cache keys on the raw prompt and replaying cached text for authenticated users must be scoped per agent instance (each Agent has its own database).
- Provider setup and examples: [overview.md](../models/overview.md) (Workers AI, OpenAI, Anthropic); Workers AI and AI Gateway products are in the cloudflare-ai skill (https://developers.cloudflare.com/workers-ai/). Provider SDKs themselves are covered by vercel-ai-sdk, openai-api-core, anthropic-api-core.

## Related

- [Conversation state and memory](./conversation-state-and-memory.md)
- [Long-running agents](./long-running-agents.md)
- [Scheduler](../runtime/scheduler.md)
- [Agentic patterns](./agentic-patterns.md)

---
source: https://developers.cloudflare.com/agents/agent-class/communication-channels/chat/autonomous-responses/
---

# Autonomous responses (saveMessages / waitUntilStable)

Send server-initiated messages and trigger LLM responses from an `AIChatAgent` without a user action: scheduled follow-ups, queue processing, email- or webhook-triggered turns.

## Signature / Usage

```ts
import { AIChatAgent } from "@cloudflare/ai-chat";

export class DigestAgent extends AIChatAgent {
	async onChatMessage() {
		// ... your LLM call
	}

	async onStart() {
		await this.schedule("0 9 * * *", "dailyDigest");
	}

	async dailyDigest() {
		const stable = await this.waitUntilStable({ timeout: 30_000 });
		if (!stable) {
			console.warn("Conversation not stable, skipping daily digest");
			return;
		}

		await this.saveMessages((messages) => [
			...messages,
			{
				id: crypto.randomUUID(),
				role: "user",
				parts: [
					{
						type: "text",
						text: "Summarize what happened since your last digest.",
					},
				],
				createdAt: new Date(),
			},
		]);
		// At this point the LLM has responded and the message is persisted.
	}
}
```

Email-triggered:

Adapted (not in the official docs): the source reads `email.raw`, which `AgentEmail` does not have; `getRaw()` returns a `Uint8Array`, so it is decoded here (see Notes).

```ts
async onEmail(email: AgentEmail) {
	const stable = await this.waitUntilStable({ timeout: 30_000 });
	if (!stable) {
		console.warn("Conversation not stable, cannot process email");
		return;
	}

	const subject = email.headers.get("subject") ?? "(no subject)";
	// Note: the raw message includes headers and MIME parts; parse it (for
	// example with postal-mime) if you only want the text body.
	const body = new TextDecoder().decode(await email.getRaw());

	await this.saveMessages((messages) => [
		...messages,
		{
			id: crypto.randomUUID(),
			role: "user",
			parts: [
				{
					type: "text",
					text: `Email from ${email.from}: ${subject}\n\n${body}`,
				},
			],
			createdAt: new Date(),
		},
	]);
}
```

Durable acceptance and cancellation:

```ts
const submission = await this.submitMessages(
	[
		{
			id: crypto.randomUUID(),
			role: "user",
			parts: [
				{ type: "text", text: `Webhook event: ${JSON.stringify(payload)}` },
			],
		},
	],
	{ idempotencyKey: payload.id },
);

return Response.json({
	submissionId: submission.submissionId,
	status: submission.status,
	accepted: submission.accepted,
});

const controller = new AbortController();
const result = await this.saveMessages(
	[
		{
			id: crypto.randomUUID(),
			role: "user",
			parts: [{ type: "text", text: "Run the long analysis." }],
		},
	],
	{ signal: controller.signal },
);

if (result.status === "aborted") {
	// Partial chunks already streamed are persisted.
}
```

Client:

```tsx
const { messages, sendMessage, isStreaming, isServerStreaming } =
	useAgentChat({ agent });

// {isServerStreaming && <div>Agent is working in the background...</div>}
// {!isServerStreaming && isStreaming && <div>Agent is responding...</div>}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `saveMessages` | method | — | Persists messages and triggers `onChatMessage`; awaitable; accepts a function form `(messages) => [...]` that reads the latest persisted messages |
| `submitMessages` | method (Think) | — | Durably accepts a turn; takes serializable `UIMessage[]` only; `idempotencyKey` for retries |
| `persistMessages` | method | — | Stores and broadcasts messages without a model turn |
| `startFiber` | method | — | Durably accepts application-owned side effects around a turn |
| `onChatResponse` | hook | — | Reacts when any response completes, including ones you did not initiate |
| `waitUntilStable({ timeout })` | method | — | Resolves `true` when no stream, no pending client-tool interaction and no queued continuation; `false` on timeout |
| `isServerStreaming` | client flag | — | `true` when a server-initiated stream is active |
| `isStreaming` | client flag | — | `true` for client or server streaming |
| `cancelSubmission(submissionId)` / `cancelFiber(fiberId)` | method | — | Durable cancellation |

`ChatResponseResult`: `message` (`UIMessage`), `requestId`, `continuation`, `status` (`"completed" | "error" | "aborted"`), `error`.

## Notes

- Corrected from the official docs: the email example used `new Response(email.raw).text()`; `AgentEmail` exposes `getRaw(): Promise<Uint8Array>` (see email.md and internals.md), so the bytes are decoded with `TextDecoder`. Email content and webhook payloads are untrusted input: they can carry prompt injection, so do not give a turn started from them tools with side effects without approval, and verify the sender/signature first.
- Always call `waitUntilStable()` before reading `this.messages` or calling `saveMessages` from schedule callbacks, webhooks, email handlers and other non-chat entry points.
- `saveMessages` always uses serialized queue behavior regardless of `messageConcurrency`, so server-driven messages are never dropped, merged or debounced.
- `onChatResponse` does not nest: a `saveMessages` call inside it completes and the hook fires again sequentially. Messages are persisted before the hook runs.
- Abort signals are in memory only and cannot cross DO RPC; after hibernation durable recovery continues without the original signal. Persist cancellation intent and return `{ continue: false }` from `onChatRecovery()`.
- Cron schedules are idempotent, so scheduling in `onStart` is safe. The source's queue-processing loop uses an in-memory `this.taskQueue`; keep real task queues in SQLite or `this.queue()` because class fields are lost on eviction.
- Placeholders: `payload` (the webhook body with an `id`), `AgentEmail` (from `agents/email`), `agent` (from `useAgent`), and `AIChatAgent`/`useAgentChat` imports are defined or imported elsewhere; the snippets are method-level excerpts, so `return` and `onEmail` appear outside a full class.
- Use `saveMessages` when you control the trigger; use `onChatResponse` for turns you did not initiate. Use `submitMessages` for webhook handlers with strict timeouts.

## Related

- [Chat agents](./chat-agents.md)
- [Schedule tasks](./schedule-tasks.md)
- [Webhooks](./webhooks.md)
- [Email](./email.md)

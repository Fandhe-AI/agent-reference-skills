---
source: https://developers.cloudflare.com/agents/harnesses/think/sub-agents/, https://developers.cloudflare.com/agents/harnesses/think/programmatic-submissions/
---

# Think sub-agent RPC and programmatic turns

Think works as a sub-agent: `chat()` runs a full turn and streams events via a callback. `saveMessages()`, `continueLastTurn()`, and `abortRequest()` drive turns from server code; `submitMessages()` durably accepts a turn and returns before inference runs (webhooks, RPC callers).

## Signature / Usage

```ts
async chat(
	userMessage: string | UIMessage,
	callback: StreamCallback,
	options?: ChatOptions,
): Promise<void>

async saveMessages(
	messages:
		| UIMessage[]
		| ((current: UIMessage[]) => UIMessage[] | Promise<UIMessage[]>),
	options?: SaveMessagesOptions,
): Promise<SaveMessagesResult>

async submitMessages(
	messages: UIMessage[],
	options?: {
		submissionId?: string;
		idempotencyKey?: string;
		metadata?: Record<string, unknown>;
	},
): Promise<SubmitMessagesResult>
```

Parent calling a child (`getModel()` omitted in both classes; define as in the quick start):

```ts
import { Think } from "@cloudflare/think";

export class ParentAgent extends Think<Env> {
	async delegateToChild(task: string) {
		const child = await this.subAgent(ChildAgent, "child-1");

		const chunks: string[] = [];
		await child.chat(task, {
			onStart: (event) => {
				console.log("Child started:", event.requestId);
			},
			onEvent: (json) => {
				chunks.push(json);
			},
			onDone: () => {
				console.log("Child completed");
			},
			onError: (error) => {
				console.error("Child failed:", error);
			},
		});

		return chunks;
	}
}

export class ChildAgent extends Think<Env> {
	getSystemPrompt() {
		return "You are a research assistant. Analyze data and report findings.";
	}
}
```

## Options / Props

### `StreamCallback`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onStart(event)` | function | — | Before work starts; exposes the request id for cancellation. |
| `onEvent(json)` | function | — | Each chunk (JSON-serialized `UIMessageChunk`). |
| `onDone()` | function | — | Turn completed and assistant message persisted. |
| `onError(message)` | function | — | Error during the turn. |
| `onInterrupted()` | function (optional) | no-op | Attempt interrupted and a scheduled continuation in a later isolate owns the outcome (not done, not failed). |

### `ChatOptions` and `SaveMessagesResult`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `signal` | `AbortSignal` | — | Cancel mid-stream (not across Workers RPC). |
| `status: "completed"` | `SaveMessagesResult` | — | Turn ran to completion. |
| `status: "error"` | `SaveMessagesResult` | — | Stream reported an error; `error` holds the message when available. |
| `status: "skipped"` | `SaveMessagesResult` | — | Turn invalidated mid-flight (e.g. `chat-clear`); user message persisted, no model run. |
| `status: "aborted"` | `SaveMessagesResult` | — | Cancelled via `options.signal` or `chat-request-cancel`; partial chunks persisted. |

### `submitMessages` options and statuses

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `submissionId` | `string` | — | If both given with `idempotencyKey`, they must identify the same submission or it throws. |
| `idempotencyKey` | `string` | — | External dedupe key; retry returns the existing submission with `accepted: false`. |
| `metadata` | `Record<string, unknown>` | — | Stored with the submission. |
| status `pending` | — | — | Accepted and waiting. |
| status `running` | — | — | Claimed and executing. |
| status `completed` | — | — | Turn completed. |
| status `aborted` | — | — | Cancelled. |
| status `skipped` | — | — | Turn state reset before it ran. |
| status `error` | — | — | Execution failed or recovery was unsafe. |

## Notes

- Adapted from the official docs: the idempotency fence calls `inspectSubmission()` / `cancelSubmission()` with `submission`, a variable defined only in the preceding fence; it uses `first` so the fence stands on its own.
- `onInterrupted` matters because a recovering `chat()` RPC promise resolves cleanly while the isolate is alive; do not finalize the partial as success. A deploy or eviction kills the isolate first (caller sees a transport break).
- Tools belong to the child agent (its `getTools()`, extensions, MCP tools, or client tool schemas). Legacy `options.tools` on `chat()` warns and is ignored.
- Cancel across a sub-agent boundary with `onStart` + `child.cancelChat(requestId, reason?)` (a no-op if completed or unknown; partial assistant message is still persisted). `AbortSignal` cannot cross Durable Object RPC boundaries and is not persisted across hibernation; pass `options.signal` only from inside the DO that starts the turn.
- `saveMessages` function form runs with the latest messages when the turn actually starts. `continueLastTurn(body?, options?)` (protected) runs another model call after the latest assistant message and persists a new assistant message with `continuation: true`; returns `{ requestId, status: "skipped" }` if the last message is not an assistant message. `abortRequest(requestId, reason?)` and `abortAllRequests()` (protected) cancel in-flight turns; prefer `SaveMessagesOptions.signal`.
- `submitMessages` accepts only serializable `UIMessage[]` (at least one), not the function form. Submissions go to a ledger first; messages are appended to the Session only when the submission starts, preserving FIFO. Cancelling before application means the messages are not persisted. Clearing the chat or resetting turn state marks pending submissions `skipped`. Use `cancelSubmission` for durable cancellation across RPC boundaries.
- Use Workflows for multi-step orchestration, per-step retries, long waits, external events, and human approvals (see think-scheduled-tasks-workflows.md). Declarative scheduled prompt tasks use the same durable submission path.
- Anyone who can reach your Worker or Durable Object RPC can start turns that spend model budget: authenticate webhook callers before calling `submitMessages()` and derive `idempotencyKey` from a verified event id.
- Distinction: `subAgent()`, `abortSubAgent()`, `deleteSubAgent()` are base `Agent` methods in the sibling agent-class category; Workers RPC itself belongs to `cloudflare-workers`.

### saveMessages

```ts
await this.saveMessages([
	{
		id: crypto.randomUUID(),
		role: "user",
		parts: [{ type: "text", text: "Time for your daily summary." }],
	},
]);

await this.saveMessages((current) => [
	...current,
	{
		id: crypto.randomUUID(),
		role: "user",
		parts: [{ type: "text", text: "Continue your analysis." }],
	},
]);
```

Chaining from `onChatResponse` (`needsFollowUp` is your own method):

```ts
async onChatResponse(result: ChatResponseResult) {
	if (result.status === "completed" && this.needsFollowUp(result.message)) {
		await this.saveMessages([{
			id: crypto.randomUUID(),
			role: "user",
			parts: [{ type: "text", text: "Now summarize what you found." }],
		}]);
	}
}
```

### Cancelling a sub-agent turn

```ts
let requestId: string | undefined;

const callback: StreamCallback = {
	onStart(event) {
		requestId = event.requestId;
	},
	onEvent(json) {
		// Forward stream chunks.
	},
	onDone() {},
	onError(error) {
		console.error(error);
	},
};

const turn = child.chat("Long analysis task", callback);

// Later, from another RPC call or failure handler:
if (requestId) {
	await child.cancelChat(requestId, "client disconnected");
}

await turn;
```

Without RPC separation:

```ts
const controller = new AbortController();
setTimeout(() => controller.abort(), 30_000);

await child.chat("Long analysis task", callback, {
	signal: controller.signal,
});
```

### submitMessages, idempotency, inspection

```ts
const submission = await this.submitMessages(
	[
		{
			id: crypto.randomUUID(),
			role: "user",
			parts: [{ type: "text", text: "Process webhook event 123" }],
		},
	],
	{ idempotencyKey: "webhook-event-123" },
);

return Response.json({
	submissionId: submission.submissionId,
	status: submission.status,
	accepted: submission.accepted,
});
```

Adapted (not in the official docs): the inspection calls use `first.submissionId` from this fence instead of the `submission` variable of the previous fence. See Notes.

```ts
const first = await this.submitMessages(messages, {
	idempotencyKey: payload.id,
});

const retry = await this.submitMessages(messages, {
	idempotencyKey: payload.id,
});

console.log(first.submissionId === retry.submissionId); // true
console.log(retry.accepted); // false

const current = await this.inspectSubmission(first.submissionId);

const active = await this.listSubmissions({
	status: ["pending", "running"],
});

await this.cancelSubmission(first.submissionId, "No longer needed");

await this.deleteSubmissions({
	status: ["completed", "error", "aborted"],
	completedBefore: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
});
```

## Related

- [think-overview.md](./think-overview.md)
- [think-recovery.md](./think-recovery.md)
- [think-scheduled-tasks-workflows.md](./think-scheduled-tasks-workflows.md)
- [think-client-tools.md](./think-client-tools.md)

---
source: https://developers.cloudflare.com/agents/harnesses/think/actions/
---

# Think actions (experimental)

Actions are server-side tools with idempotency, human approvals, authorization, and reply attachments. `action()` descriptors returned from `getActions()` compile into Think tools and merge with `getTools()`, workspace, extension, and MCP tools.

## Signature / Usage

`refund()` and the other side-effect helpers in this page are your own functions.

Adapted (not in the official docs): the refund requires human approval, is keyed by order id, and passes the same key to the payment provider so a lost response followed by a retry cannot refund twice. See Notes.

```ts
import { Think, action } from "@cloudflare/think";
import { z } from "zod";

export class Support extends Think<Env> {
	getActions() {
		return {
			refundOrder: action({
				description: "Refund a customer order.",
				inputSchema: z.object({
					orderId: z.string(),
					amountCents: z.number().int().positive(),
				}),
				// Moves money: always ask a human, and never run twice for one order.
				approval: true,
				approvalRisk: "high",
				idempotencyKey: ({ input }) => `refund:${input.orderId}`,
				execute: async ({ orderId, amountCents }, ctx) => {
					// Same stable key at the provider: a replay after a lost response is deduplicated there.
					const result = await refund(orderId, amountCents, {
						idempotencyKey: `refund:${orderId}`,
					});
					return { refundId: result.id, status: result.status };
				},
			}),
		};
	}
}
```

`ActionContext` passed to `execute`:

```ts
type ActionContext = {
	agent: Think;
	env: Cloudflare.Env;
	requestId: string;
	toolCallId: string;
	messages: ReadonlyArray<ModelMessage>;
	signal: AbortSignal; // aborts on turn cancel or after `timeoutMs`
	attachReply(attachment: ReplyAttachment): void;
};
```

## Options / Props

### `action(config)`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `description` | `string` (required) | — | Tool description shown to the model. |
| `inputSchema` | `FlexibleSchema` (Zod, Valibot, AI SDK `jsonSchema`) (required) | — | Validates and types `execute` input. |
| `execute` | `(input, ctx) => Output \| Promise<Output>` (required) | — | Action body. |
| `name` | `string` | map key | Overrides the tool name. |
| `idempotencyKey` | `string \| ({ input, ctx }) => string` | per tool call | Stable key for ledger replay. Use a domain identifier. |
| `permissions` | `readonly string[] \| ({ input, ctx }) => readonly string[]` | none | Permissions this call requires. |
| `approval` | `boolean \| ({ input, ctx }) => boolean` | none | Gate the call behind a human. |
| `approvalSummary` | `string` | `description` | Summary in the approval descriptor. |
| `approvalRisk` | `"low" \| "medium" \| "high"` | — | Risk hint in the approval descriptor. |
| `kind` | `"server" \| "approval-gated" \| "durable-pause"` | inferred | `approval-gated` when `approval` is set, else `server`; set `durable-pause` explicitly. |
| `timeoutMs` | `number` | `30000` | Per-action timeout (also drives `ctx.signal`). |

### Members on the agent

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `getActions()` | method | — | Return action descriptors. |
| `authorizeTurn(ctx)` | `true \| false \| { allowed, reason?, grantedPermissions? }` | full grant | Decide granted permissions once per turn. |
| `authorizeAction(ctx)` | method | checks `authorizeTurn` grants | Per-call decision (action name, kind, input, required and granted permissions). |
| `pendingApprovals(executionId?)` | method | — | Parked actions and paused Codemode executions awaiting approval. |
| `approveExecution(executionId)` | method | — | Runs `execute` once and auto-continues the turn. |
| `rejectExecution(executionId, reason?)` | method | — | Resolves the action without running it. |
| `replyAttachments(requestId?)` | method | — | Advisory attachments recorded during a turn. |
| `actionLedgerPendingRetryLeaseMs` | `number \| false` | `300000` | Stale-pending reclaim window; `false` disables reclaim. |

## Notes

- Output is JSON-normalized and truncated before the model sees it. Anything thrown from `execute` becomes a structured `{ error: { name, message } }` tool result. Plain `tool()` is right for read-only/trivial tools; use `action()` when side effects must not run twice, need approval, or need authorization.
- Idempotency: a ledger row keyed `action:<name>:<key>` is written `pending` before `execute` and flipped to `settled` on success; a thrown or timed-out `execute` deletes the row. Without `idempotencyKey` the key is per `toolCallId` (dedupes only within one tool call, not across retries). Never use a timestamp, request id, or random value as key.
- A stale `pending` row (isolate died mid-execute) is reclaimed and re-run once older than `actionLedgerPendingRetryLeaseMs`, only for actions with an explicit `idempotencyKey`; otherwise an `ActionPendingError` result is returned.
- Approval kinds: approval-gated (default when `approval` is set) pauses the stream with an `approval-requested` part and continues inline after the client responds; `durable-pause` parks the action and ends the turn, resumable later without a live socket. `durable-pause` requires an `approval` policy. Both carry an `ActionApprovalDescriptor` (`{ requestId, toolCallId, action, summary, input, permissions, risk, kind }`). `approveExecution`/`rejectExecution` are idempotent (second call is a no-op).
- Authorization is opt-in; by default every turn is fully authorized. Actions requiring a permission outside the granted set are denied with `ActionAuthorizationError` and `execute` never runs.
- Adapted from the official docs: the `refundOrder` and `chargeInvoice` examples move money without `approval`, and the intro `refundOrder` also has no `idempotencyKey`, so a retried turn could refund twice. Payment actions now set `approval: true`, and refunds use `idempotencyKey: refund:<orderId>`. The ledger alone does not prevent a double payment: a timed-out `execute` deletes its row and a stale `pending` row is re-run, so if the provider succeeded but the response was lost, `execute` runs again. The examples therefore pass the same stable key to the payment provider (`refund()` / `charge()` are your own helpers; forward the key to the provider's idempotency mechanism, e.g. an `Idempotency-Key` header) and, when the outcome is unknown, reconcile with the provider by that key before reporting failure. The `deleteAccountAction` comment that suggested `({ input }) => input.userId !== currentUser` (skipping approval for self-deletion) is removed: destructive actions always require approval.
- Corrected from the official docs: the `deployAction` example sets `kind: "durable-pause"` without an `approval` policy, which this page states `durable-pause` requires; `approval: true` is added.
- Adapted from the official docs: in the approval and durable-pause examples the action constants were named `deleteAccount` and `deploy`, the same names as the helper functions they call, so the helper would have resolved to the action object itself; they are renamed `deleteAccountAction` and `deployAction`. In the `authorizeTurn` example the source granted `admin` based on `ctx.body?.role`, i.e. a client-supplied, unauthenticated field; the example now reads a role your code set from verified authentication and defaults to a narrow grant.
- Reply attachments never change the tool output the model sees; they are JSON-normalized, deep-copied on read, capped per turn, discarded if the recording `execute` fails, not re-fired on ledger replay, and `attachReply()` is a no-op from `permissions`/`approval`/`idempotencyKey` callbacks. Built-in `ReplyAttachment` covers `email_draft`, `card`, `voice_note`; any `{ type: string; ... }` is allowed. Override `renderAttachment()` (see think-channels-messengers.md) to deliver them.
- Distinction: the underlying `Agent` class and human-in-the-loop patterns are in the sibling agent-class / concepts documentation; payment providers like Stripe belong to the `stripe` skill.

### Idempotent action

Adapted (not in the official docs): the charge also requires approval and passes the same idempotency key to the payment provider. See Notes.

```ts
const chargeInvoice = action({
	description: "Charge an invoice.",
	inputSchema: z.object({ invoiceId: z.string() }),
	approval: true, // a payment: always ask a human
	// Use a stable domain identifier — never a timestamp, request id, or random value.
	idempotencyKey: ({ input }) => `invoice:${input.invoiceId}`,
	execute: async ({ invoiceId }) =>
		charge(invoiceId, { idempotencyKey: `invoice:${invoiceId}` }),
});
```

### Approval-gated and durable-pause

Adapted (not in the official docs): constants renamed so they do not shadow the helper functions they call, the account deletion no longer suggests a conditional approval, and the durable-pause deploy declares the `approval` policy it requires; see Notes.

```ts
const deleteAccountAction = action({
	description: "Permanently delete a user account.",
	inputSchema: z.object({ userId: z.string() }),
	approval: true, // destructive: always ask a human
	approvalSummary: "Delete an account",
	approvalRisk: "high",
	execute: async ({ userId }) => deleteAccount(userId),
});

const deployAction = action({
	description: "Deploy to production.",
	inputSchema: z.object({ ref: z.string() }),
	kind: "durable-pause",
	approval: true, // durable-pause requires an approval policy
	approvalSummary: "Deploy to production",
	approvalRisk: "high",
	permissions: ["deploy:run"],
	execute: async ({ ref }) => deploy(ref),
});
```

Resolve from anywhere (for example a dashboard with no live WebSocket):

```ts
// List everything waiting on a human (cold-load reconciliation):
const pending = await agent.pendingApprovals();
// [{ executionId, source: "action" | "codemode", descriptor }]

// Approve or reject by execution id (idempotent — a second call is a no-op):
await agent.approveExecution(executionId);
await agent.rejectExecution(executionId, "Not this release");
```

### Authorization

Adapted (not in the official docs): the role comes from server-verified state rather than the client `ctx.body`, and the refund also requires approval and an idempotency key that is passed to the payment provider; see Notes.

```ts
const refundOrder = action({
	description: "Refund a customer order.",
	inputSchema: z.object({ orderId: z.string() }),
	permissions: ["billing:refund"], // or ({ input }) => [...]
	approval: true,
	idempotencyKey: ({ input }) => `refund:${input.orderId}`,
	execute: async ({ orderId }) =>
		refund(orderId, { idempotencyKey: `refund:${orderId}` }),
});

export class Support extends Think<Env> {
	// Your own field, set from verified authentication (never from ctx.body).
	private verifiedRole: string | undefined;

	override authorizeTurn(ctx: TurnContext): ActionAuthorizationDecision {
		if (this.verifiedRole === "admin") return true; // full grant (the default)
		return { allowed: true, grantedPermissions: ["billing:read"] };
	}
}
```

### Reply attachments

```ts
const draftReply = action({
	description: "Draft an email reply.",
	inputSchema: z.object({ to: z.string(), subject: z.string() }),
	execute: async ({ to, subject }, ctx) => {
		ctx.attachReply({ type: "email_draft", to: [to], subject });
		return { drafted: true };
	},
});

export class Support extends Think<Env> {
	override async onChatResponse(result: ChatResponseResult) {
		for (const attachment of result.attachments ?? []) {
			// attachment.type === "email_draft" | "card" | "voice_note" | custom
		}
	}
}
```

## Related

- [think-tools.md](./think-tools.md)
- [think-channels-messengers.md](./think-channels-messengers.md)
- [think-lifecycle-hooks.md](./think-lifecycle-hooks.md)

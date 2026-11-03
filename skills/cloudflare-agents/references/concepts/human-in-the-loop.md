---
source: https://developers.cloudflare.com/agents/concepts/agentic-patterns/human-in-the-loop/
---

# Human-in-the-loop patterns

Add approval or input at different layers of an Agent: respond to an MCP server request (elicitation), hold application work in a durable Workflow (`waitForApproval()`), or approve a connector call before model-generated code invokes a tool (durable Code Mode).

## Signature / Usage

Workflow-based approval:

```ts
import { Agent } from "agents";
import { AgentWorkflow } from "agents/workflows";
import type { AgentWorkflowEvent, AgentWorkflowStep } from "agents/workflows";

type ExpenseParams = {
	amount: number;
	description: string;
	requestedBy: string;
};

export class ExpenseWorkflow extends AgentWorkflow<
	ExpenseAgent,
	ExpenseParams
> {
	async run(event: AgentWorkflowEvent<ExpenseParams>, step: AgentWorkflowStep) {
		const expense = event.payload;

		// Step 1: Validate the expense
		const validated = await step.do("validate", async () => {
			if (expense.amount <= 0) {
				throw new Error("Invalid expense amount");
			}
			return { ...expense, validatedAt: Date.now() };
		});

		// Step 2: Report that we are waiting for approval
		await this.reportProgress({
			step: "approval",
			status: "pending",
			message: `Awaiting approval for $${expense.amount}`,
		});

		// Step 3: Wait for human approval (pauses the workflow)
		const approval = await this.waitForApproval<{ approvedBy: string }>(step, {
			timeout: "7 days",
		});

		console.log(`Approved by: ${approval?.approvedBy}`);

		// Step 4: Process the approved expense
		const result = await step.do("process", async () => {
			return { expenseId: crypto.randomUUID(), ...validated };
		});

		await step.reportComplete(result);
		return result;
	}
}
```

Agent methods that approve or reject (authorization is the caller's responsibility):

Adapted (not in the official docs): the official `approve(workflowId, approvedBy)` and `approveMulti(workflowId, userId)` took the approver identity from a client-supplied argument, so any connected client could approve as anyone; this version takes the identity from the server-verified connection and also checks it with a fail-closed `canDecide()` placeholder (being authenticated is not the same as being allowed to approve); see Notes.

```ts
import { Agent, callable, getCurrentAgent } from "agents";

type PendingApproval = {
	workflowId: string;
	amount: number;
	description: string;
	requestedBy: string;
	requestedAt: number;
};

type ExpenseState = {
	pendingApprovals: PendingApproval[];
};

export class ExpenseAgent extends Agent<Env, ExpenseState> {
	initialState: ExpenseState = {
		pendingApprovals: [],
	};

	// Identity must come from your own server-side authentication (for example
	// connection state set in onConnect after verifying the request), never from
	// an argument the client sends.
	private verifiedUserId(): string {
		const { connection } = getCurrentAgent();
		const userId = (connection?.state as { userId?: string } | null)?.userId;
		if (!userId) throw new Error("Not authenticated");
		return userId;
	}

	// Placeholder: decide whether this verified user may decide this approval
	// (for example an approver list kept in your own storage). It denies
	// everyone until you implement it.
	private canDecide(userId: string, workflowId: string): boolean {
		return false;
	}

	// Approve a waiting workflow
	@callable()
	async approve(workflowId: string): Promise<void> {
		const approvedBy = this.verifiedUserId();
		if (!this.canDecide(approvedBy, workflowId)) {
			throw new Error("Not authorized to approve this request");
		}
		await this.approveWorkflow(workflowId, {
			reason: "Expense approved",
			metadata: { approvedBy, approvedAt: Date.now() },
		});

		// Update state to reflect approval
		this.setState({
			...this.state,
			pendingApprovals: this.state.pendingApprovals.filter(
				(p) => p.workflowId !== workflowId,
			),
		});
	}

	// Reject a waiting workflow
	@callable()
	async reject(workflowId: string, reason: string): Promise<void> {
		const rejectedBy = this.verifiedUserId();
		if (!this.canDecide(rejectedBy, workflowId)) {
			throw new Error("Not authorized to reject this request");
		}
		await this.rejectWorkflow(workflowId, { reason });

		this.setState({
			...this.state,
			pendingApprovals: this.state.pendingApprovals.filter(
				(p) => p.workflowId !== workflowId,
			),
		});
	}

	// Track workflow progress to update pending approvals
	async onWorkflowProgress(
		workflowName: string,
		workflowId: string,
		progress: unknown,
	): Promise<void> {
		const p = progress as { step: string; status: string; message?: string };

		if (p.step === "approval" && p.status === "pending") {
			// Add to pending approvals list for UI display
			this.setState({
				...this.state,
				pendingApprovals: [
					...this.state.pendingApprovals,
					{
						workflowId,
						amount: 0, // Would come from workflow params
						description: p.message || "",
						requestedBy: "user",
						requestedAt: Date.now(),
					},
				],
			});
		}
	}
}
```

Timeout and escalation:

Inside the workflow's `run()` method:

```ts
const approval = await this.waitForApproval<{ approvedBy: string }>(step, {
	timeout: "7 days", // Also supports: "1 hour", "30 minutes", etc.
});

if (!approval) {
	// Timeout expired - escalate or auto-reject
	await step.reportError("Approval timeout - escalating to manager");
	throw new Error("Approval timeout");
}
```

Adapted (not in the official docs): the official escalation sample passed `Date.now() + ...` (a number) to `schedule()`, which treats a number as a delay in seconds; this version passes a `Date`. The `sendReminder` and `escalateApproval` callback methods that `schedule()` names are added as logging stubs.

```ts
import { Agent, callable } from "agents";

class ExpenseAgent extends Agent<Env> {
	async sendReminder(payload: { workflowId: string }) {
		console.log(`Reminder: approval pending for ${payload.workflowId}`);
	}

	async escalateApproval(payload: { workflowId: string }) {
		console.log(`Escalating approval ${payload.workflowId}`);
	}

	@callable()
	async submitForApproval(expense: unknown) {
		// Start the approval workflow
		const workflowId = await this.runWorkflow("EXPENSE_WORKFLOW", expense);

		// Schedule reminder after 4 hours
		await this.schedule(new Date(Date.now() + 4 * 60 * 60 * 1000), "sendReminder", {
			workflowId,
		});

		// Schedule escalation after 24 hours
		await this.schedule(
			new Date(Date.now() + 24 * 60 * 60 * 1000),
			"escalateApproval",
			{ workflowId },
		);

		return workflowId;
	}
}
```

MCP elicitation handlers:

```ts
import { Agent } from "agents";
import type { ElicitRequest, ElicitResult } from "agents/mcp/client";

export class MyAgent extends Agent<Env> {
	onStart() {
		this.mcp.configureElicitationHandlers({
			form: (request, serverId) =>
				this.forwardElicitationToUser(request, serverId),
			url: (request, serverId) =>
				this.forwardElicitationToUser(request, serverId),
		});
	}

	private forwardElicitationToUser(
		request: ElicitRequest,
		serverId: string,
	): Promise<ElicitResult> {
		// Present the request in your UI and resolve after the user responds.
		throw new Error(
			`Implement elicitation for ${serverId}: ${request.params.message}`,
		);
	}
}
```

Wrangler bindings for the expense example (Durable Object plus Workflow):

```jsonc
{
	"durable_objects": {
		"bindings": [{ "name": "EXPENSE_AGENT", "class_name": "ExpenseAgent" }],
	},
	"workflows": [
		{
			"name": "expense-workflow",
			"binding": "EXPENSE_WORKFLOW",
			"class_name": "ExpenseWorkflow",
		},
	],
	"migrations": [{ "tag": "v1", "new_sqlite_classes": ["ExpenseAgent"] }],
}
```

## Options / Props

Choosing a pattern:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| MCP elicitation | pattern | — | MCP request handled by your Agent client; initiated by the MCP server developer; minutes; `configureElicitationHandlers()`. |
| Workflow approval | pattern | — | Durable application task or tool operation; initiated by the agent app developer; months or years; `waitForApproval()`. |
| Code Mode approval | pattern | — | Connector call in model-generated code; initiated by the Code Mode agent developer; until configured expiry; `requiresApproval`, `approve()`, `reject()`. |

Related APIs:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `waitForApproval(step, { timeout })` | method | — | Pauses the workflow; returns the approval payload, or a falsy value on timeout; rejection throws `WorkflowRejectedError`. |
| `approveWorkflow(id, { reason, metadata })`, `rejectWorkflow(id, { reason })` | methods | — | Resolve a waiting workflow from the Agent. |
| `runtime().pending()`, `approve({ executionId })`, `reject({ executionId, seq })` | methods | — | Durable Code Mode runtime approval controls. |

## Notes

- Adapted from the official docs: `approve()` / `reject()` additionally require `canDecide()` (a fail-closed placeholder: implement your approver policy) and the escalation example adds stub `sendReminder()` / `escalateApproval()` callbacks. `submitForApproval()` still takes `expense: unknown`: validate it and authenticate the caller before use. Approver identity no longer comes from a client argument (`approveMulti(workflowId, userId)` in the page's multi-approver sample has the same flaw and is omitted: collect approvals keyed by a server-verified user ID and call `approveWorkflow()` once `requiredApprovals` is met); `schedule()` now receives `Date` objects (a number means seconds from now). Also omitted for length: the audit-trail SQL sample, the pending-approvals React UI sample, and the full `CodingAgent`/`createCodemodeRuntime` sample. For Code Mode, a connector's `tool(name, tool)` override returns `{ ...tool, requiresApproval: true }` for the gated tool, and the agent exposes `runtime().pending()`, `approve({ executionId })`, and `reject({ executionId, seq })` as callables.
- Form-mode elicitation collects structured, non-sensitive input; URL mode sends the user through an out-of-band flow (third-party authorization, payment). The `forwardElicitationToUser` stub above throws until you implement it.
- Best practices: approve only actions with real consequences, show full action arguments, set timeouts and escalation (`schedule()`), record decisions in `this.sql` for audit, keep pending approvals in agent state so they survive disconnects, and define fallback behavior on rejection.
- `onWorkflowProgress` here adds placeholder entries (`amount: 0`, `requestedBy: "user"`); fill them from workflow params.
- The Workflows product is in the cloudflare-stateful skill (workflows; https://developers.cloudflare.com/workflows/); the durable Code Mode runtime is in codemode-durable-runtime.md (https://developers.cloudflare.com/agents/tools/codemode/durable-runtime/). The client side of MCP elicitation is in the MCPClientManager page.

## Related

- [Workflows](./workflows.md)
- [MCPClientManager](../runtime/mcp-client-manager.md)
- [Agentic patterns](./agentic-patterns.md)
- [Tools](./tools.md)

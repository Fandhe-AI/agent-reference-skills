# Human-in-the-Loop (HITL)

Pattern for inserting human approval gates into AI agent workflows using `step.waitForEvent()`. The function is suspended while waiting — no compute cost during review.

## Signature / Usage

```ts
import { inngest } from "./client";

export const emailApprovalWorkflow = inngest.createFunction(
  { id: "email-approval-workflow" },
  { event: "agent/email.draft-requested" },
  async ({ event, step }) => {
    // Step 1: Agent drafts content
    const draft = await step.run("draft-email", async () => {
      return await generateEmail({ recipient: event.data.recipient });
    });

    // Step 2: Notify reviewer (Slack, email, dashboard)
    await step.run("request-approval", async () => {
      await sendSlackMessage({ channel: "#agent-approvals", text: draft.body });
    });

    // Step 3: Pause until a matching event arrives (or timeout)
    const approval = await step.waitForEvent("wait-for-approval", {
      event: "agent/approval.response",
      match: "data.approvalId",
      timeout: "24h",
    });

    // Step 4: Handle all three outcomes
    if (!approval) {
      // Timed out — no response within window
      return { status: "timed_out" };
    }
    if (approval.data.approved) {
      await step.run("send-email", async () => sendEmail(draft));
      return { status: "approved" };
    }
    return { status: "rejected", reason: approval.data.reason };
  }
);
```

**Sending the approval response** (e.g. from a Slack webhook handler):

```ts
await inngest.send({
  name: "agent/approval.response",
  data: {
    approvalId: value.approvalId,
    approved: true,
    respondedBy: slackUserId,
  },
});
```

## Options / Props

**`step.waitForEvent(id, options)`**

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Step identifier |
| `options.event` | `string` | Event name to wait for |
| `options.timeout` | `string \| number \| Date` | Max wait duration (e.g. `"24h"`, `"7d"`); returns `null` on timeout |
| `options.match` | `string` | Dot-notation field to correlate events (e.g. `"data.approvalId"`). Cannot be combined with `if` |
| `options.if` | `string` | CEL expression for conditional matching. Cannot be combined with `match` |

## Notes

- Always handle three outcomes: approved, rejected, and timed-out (`null` return).
- The `match` field is critical in concurrent workflows — it ensures each pending approval resolves independently. Use a unique ID per approval request (e.g. `${taskId}-${iteration}-${toolName}`).
- Chain multiple `waitForEvent` calls sequentially for multi-reviewer workflows (e.g. editorial then legal).
- For escalation, catch the `null` timeout, notify a secondary reviewer, then call `waitForEvent` again with a new step ID.
- Gate only high-risk tools (e.g. `send_email`, `delete_record`, `deploy`) in agent loops; allow safe operations to proceed unblocked.
- CEL `in` operator is unsupported; use multiple equality checks with `||` instead.

## Related

- [Agent Tool Loop Pattern](./agent-tool-loop.md)
- [Sub-Agent Delegation](./sub-agent-delegation.md)
- [step.ai.infer()](./step-ai-infer.md)

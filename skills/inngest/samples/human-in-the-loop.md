# Human-in-the-Loop

Pause a workflow and wait for a human approval event before continuing.

```typescript
import { Inngest } from "inngest";

const inngest = new Inngest({ id: "my-app" });

export const processExpenseReport = inngest.createFunction(
  { id: "process-expense-report" },
  { event: "expense/submitted" },
  async ({ event, step }) => {
    // Step 1: Notify the approver
    await step.run("notify-approver", async () => {
      await sendSlackMessage({
        channel: "#approvals",
        text: `Expense ${event.data.expenseId} needs approval. Amount: $${event.data.amount}`,
      });
    });

    // Step 2: Wait up to 7 days for an approval or rejection event
    const approval = await step.waitForEvent("wait-for-approval", {
      event: "expense/reviewed",
      timeout: "7d",
      // Correlate by expense ID so only the matching review resumes this run
      if: `async.data.expenseId == "${event.data.expenseId}"`,
    });

    // Step 3: Handle timeout (approval is null) or decision
    if (!approval) {
      await step.run("handle-timeout", async () => {
        await notifySubmitter(event.data.userId, "Approval request expired.");
      });
      return { status: "expired" };
    }

    if (approval.data.decision === "approved") {
      await step.run("process-payment", async () => {
        await reimburseEmployee(event.data.userId, event.data.amount);
      });
      return { status: "approved" };
    }

    await step.run("notify-rejection", async () => {
      await notifySubmitter(event.data.userId, approval.data.reason);
    });
    return { status: "rejected" };
  }
);

// From your approval UI, send the review event to resume the paused function
await inngest.send({
  name: "expense/reviewed",
  data: { expenseId: "exp_456", decision: "approved" },
});
```

## Notes

- `step.waitForEvent()` returns `null` on timeout — always handle the null case
- The `if` parameter is a CEL expression; `async` refers to the incoming event, `event` to the triggering event
- The function consumes no compute while waiting — it is durably paused by Inngest
- Combine with Inngest Realtime to stream status updates to the approver's UI in real time

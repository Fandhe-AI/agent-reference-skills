# Workflow Human-in-the-Loop

Pause a workflow with `context.waitForEvent()` until a human approves, resume it with `client.notify()`, and push progress to the frontend with Upstash Realtime.

```typescript
// lib/realtime.ts — event schema extension
const schema = {
  workflow: {
    runFinish: z.object({}),
    stepFinish: z.object({
      stepName: z.string(),
      result: z.unknown().optional(),
    }),
    waitingForInput: z.object({
      eventId: z.string(),
      message: z.string(),
    }),
    inputResolved: z.object({
      eventId: z.string(),
    }),
  },
};
```

```typescript
// lib/middleware.ts — emits Realtime events
import { WorkflowMiddleware } from "@upstash/workflow";
import { realtime } from "./realtime";

export const realtimeMiddleware = new WorkflowMiddleware({
  name: "realtime-events",
  callbacks: {
    beforeExecution: async ({ context, stepName }) => {
      const channel = realtime.channel(context.workflowRunId);

      // Detect wait-for-event steps and emit waitingForInput
      if (stepName === "wait-for-approval") {
        await channel.emit("workflow.waitingForInput", {
          eventId: `approval-${context.workflowRunId}`,
          message: `Waiting for approval`,
        });
      }
    },
    afterExecution: async ({ context, stepName, result }) => {
      const channel = realtime.channel(context.workflowRunId);

      // Emit inputResolved after wait-for-event steps complete
      if (stepName === "wait-for-approval") {
        await channel.emit("workflow.inputResolved", {
          eventId: `approval-${context.workflowRunId}`,
        });
      }

      // Emit stepFinish for all steps
      await channel.emit("workflow.stepFinish", {
        stepName,
        result,
      });
    },
    runCompleted: async ({ context }) => {
      const channel = realtime.channel(context.workflowRunId);
      await channel.emit("workflow.runFinish", {});
    },
  },
});
```

```typescript
// app/api/workflow/human-in-loop/route.ts
import { serve } from "@upstash/workflow/nextjs";
import { realtimeMiddleware } from "@/lib/middleware";

type WorkflowPayload = {
  userId: string;
  action: string;
};

export const { POST } = serve<WorkflowPayload>(
  async (context) => {
    const { userId, action } = context.requestPayload;

    // Step 1: Initial Processing
    await context.run("initial-processing", async () => {
      // Your processing logic
      return {
        preprocessed: true,
        userId,
        action,
        requiresApproval: true,
      };
    });

    // Step 2: Wait for Human Approval
    const eventId = `approval-${context.workflowRunId}`;

    const { eventData, timeout } = await context.waitForEvent<{
      approved: boolean;
    }>("wait-for-approval", eventId, { timeout: "5m" });

    // Handle timeout
    if (timeout) {
      return { success: false, reason: "timeout" };
    }

    const status = eventData.approved ? "approved" : "rejected";

    // Step 3: Process based on approval
    await context.run(`process-${status}`, async () => {
      return {
        status,
        processedAt: Date.now(),
        action,
        userId,
      };
    });

    // Step 4: Finalize (only if approved)
    if (eventData.approved) {
      // Additional steps...
    }

    return {
      success: true,
      approved: eventData.approved,
      workflowRunId: context.workflowRunId,
    };
  },
  {
    middlewares: [realtimeMiddleware],
  }
);
```

```typescript
// app/api/notify/route.ts — resumes the waiting workflow
import { Client } from "@upstash/workflow";
import { NextRequest, NextResponse } from "next/server";

const workflowClient = new Client({
  baseUrl: process.env.QSTASH_URL!,
  token: process.env.QSTASH_TOKEN!,
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { eventId, eventData } = body;

  if (!eventId) {
    return NextResponse.json(
      { success: false, error: "eventId is required" },
      { status: 400 }
    );
  }

  // Notify the workflow
  await workflowClient.notify({
    eventId,
    eventData,
  });

  return NextResponse.json({ success: true });
}
```

```env
QSTASH_URL=...
QSTASH_TOKEN=...
```

## Notes

- Flow: the middleware emits `waitingForInput` before the `wait-for-approval` step, the frontend calls `/api/notify` with the user's decision, the workflow resumes, then `inputResolved` and `stepFinish` are emitted and `runFinish` on completion
- Use a unique `eventId` such as `approval-${workflowRunId}` and always handle the `timeout` case of `waitForEvent`
- To trigger a workflow and notify it immediately, pass `workflowRunId` to `client.notify()` to enable lookback so the event is delivered even if sent before `waitForEvent`
- Requires a QStash project for workflows and a Redis database for Realtime; the frontend hook (`useRealtime` with `workflow.waitingForInput` / `workflow.inputResolved` events) and the basic real-time setup are in the official guide and the `upstash/workflow-js` `examples/upstash-realtime` example

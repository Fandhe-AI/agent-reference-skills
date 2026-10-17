# Realtime / Human-in-the-Loop

Emit workflow progress to a frontend in real time with Upstash Realtime (powered by Upstash Redis, delivered via Server-Sent Events), and pause for human approval with `context.waitForEvent` + `client.notify`.

## Signature / Usage

```bash
npm install @upstash/workflow @upstash/realtime @upstash/redis zod
```

Realtime instance (`lib/realtime.ts`):

```typescript
import { InferRealtimeEvents, Realtime } from "@upstash/realtime";
import { Redis } from "@upstash/redis";
import z from "zod/v4";

const redis = Redis.fromEnv();

const schema = {
  workflow: {
    runFinish: z.object({}),
    stepFinish: z.object({
      stepName: z.string(),
      result: z.unknown().optional(),
    }),
  },
};

export const realtime = new Realtime({ schema, redis });
export type RealtimeEvents = InferRealtimeEvents<typeof realtime>;
```

Middleware that emits events (`lib/middleware.ts`):

```typescript
import { WorkflowMiddleware } from "@upstash/workflow";
import { realtime } from "./realtime";

export const realtimeMiddleware = new WorkflowMiddleware({
  name: "realtime-events",
  callbacks: {
    afterExecution: async ({ context, stepName, result }) => {
      const channel = realtime.channel(context.workflowRunId);
      await channel.emit("workflow.stepFinish", { stepName, result });
    },
    runCompleted: async ({ context }) => {
      const channel = realtime.channel(context.workflowRunId);
      await channel.emit("workflow.runFinish", {});
    },
  },
});
```

Workflow endpoint using the middleware:

```typescript
import { serve } from "@upstash/workflow/nextjs";
import { realtimeMiddleware } from "@/lib/middleware";

export const { POST } = serve<WorkflowPayload>(
  async (context) => {
    const { userId, action } = context.requestPayload;

    await context.run("validate-data", async () => {
      return { valid: true, userId, action };
    });

    return { success: true, workflowRunId: context.workflowRunId };
  },
  {
    middlewares: [realtimeMiddleware],
  }
);
```

### Setup pieces

| Piece | File | Description |
|-------|------|-------------|
| Realtime endpoint | `app/api/realtime/route.ts` | `export const GET = handle({ realtime });` with `handle` from `@upstash/realtime`; enables SSE connections |
| Provider | `app/layout.tsx` | Wrap the app in `RealtimeProvider` from `@upstash/realtime/client` (`"use client"`) |
| Typed hook | `lib/realtime-client.ts` | `export const { useRealtime } = createRealtime<RealtimeEvents>();` |
| Trigger endpoint | `app/api/trigger/route.ts` | `new Client({ token, baseUrl })` then `workflowClient.trigger({ url, body })` returning `workflowRunId` |

Frontend subscription (per workflow run, channel = `workflowRunId`):

```typescript
useRealtime({
  enabled: Boolean(workflowRunId),
  channels: workflowRunId ? [workflowRunId] : [],
  events: ["workflow.stepFinish", "workflow.runFinish"],
  onData({ event, data }) {
    if (event === "workflow.stepFinish") {
      setSteps((prev) => [...prev, data]);
    }
    if (event === "workflow.runFinish") {
      setIsRunFinished(true);
    }
  },
});
```

### Human-in-the-loop

Flow: the workflow runs initial steps and emits progress; pauses at `context.waitForEvent()`; a `waitingForInput` event tells the frontend; the user approves/rejects; the frontend calls an API that runs `client.notify()`; the workflow resumes; an `inputResolved` event updates the UI; the workflow completes based on the decision.

Extend the schema with two events:

```typescript
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

Middleware detects the wait step by `stepName` (`beforeExecution` emits `workflow.waitingForInput`, `afterExecution` emits `workflow.inputResolved`):

```typescript
beforeExecution: async ({ context, stepName }) => {
  const channel = realtime.channel(context.workflowRunId);
  if (stepName === "wait-for-approval") {
    await channel.emit("workflow.waitingForInput", {
      eventId: `approval-${context.workflowRunId}`,
      message: `Waiting for approval`,
    });
  }
},
```

Workflow waits for approval with a unique event ID and handles timeout:

```typescript
const eventId = `approval-${context.workflowRunId}`;

const { eventData, timeout } = await context.waitForEvent<{
  approved: boolean;
}>("wait-for-approval", eventId, { timeout: "5m" });

if (timeout) {
  return { success: false, reason: "timeout" };
}

const status = eventData.approved ? "approved" : "rejected";
```

Notify endpoint (`app/api/notify/route.ts`):

```typescript
import { Client } from "@upstash/workflow";
import { NextRequest, NextResponse } from "next/server";

const workflowClient = new Client({
  baseUrl: process.env.QSTASH_URL!,
  token: process.env.QSTASH_TOKEN!,
});

export async function POST(request: NextRequest) {
  // Placeholder: replace with your own session lookup
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const { eventId, eventData, workflowRunId } = body;

  if (!eventId || !workflowRunId) {
    return NextResponse.json(
      { success: false, error: "eventId and workflowRunId are required" },
      { status: 400 }
    );
  }

  if (eventId !== `approval-${workflowRunId}`) {
    return NextResponse.json(
      { success: false, error: "eventId does not match workflowRunId" },
      { status: 400 }
    );
  }

  // Placeholder: replace with your own check that this user may approve this run
  if (!(await canApprove(session, workflowRunId))) {
    return NextResponse.json(
      { success: false, error: "forbidden" },
      { status: 403 }
    );
  }

  if (typeof eventData?.approved !== "boolean") {
    return NextResponse.json(
      { success: false, error: "eventData.approved must be a boolean" },
      { status: 400 }
    );
  }

  // workflowRunId enables lookback (see Notes)
  await workflowClient.notify({ eventId, eventData, workflowRunId });

  return NextResponse.json({ success: true });
}
```

## Notes

- Prerequisites for human-in-the-loop: an Upstash QStash project for workflows, a Redis database for Realtime, and a Next.js app with the basic setup above
- Always handle the timeout case when waiting for events; use a unique `eventId` per approval request
- Race conditions: pass `workflowRunId` to `workflowClient.notify({ eventId, eventData, workflowRunId })` to enable lookback so the notification is delivered even if sent before `waitForEvent`
- The original notify handler has no authentication or authorization; session (401), approval-permission (403), and `eventData.approved` type (400) checks were added here. `getSession` / `canApprove` are placeholders for your own implementation
- Full working example: `examples/upstash-realtime` in the `upstash/workflow-js` repository
- Source: fetched 2026-10 from https://upstash.com/docs/workflow/howto/realtime/basic (and `howto/realtime/human-in-the-loop`)

## Related

- [middlewares](./middlewares.md)
- [context-wait-for-event](./context-wait-for-event.md)
- [wait-for-event](./wait-for-event.md)
- [client-notify](./client-notify.md)
- [client-trigger](./client-trigger.md)

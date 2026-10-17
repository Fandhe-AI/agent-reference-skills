# Webhooks

Pause workflow execution until a webhook URL is called (`createWebhook` / `waitForWebhook`), and use workflow endpoints as webhook receivers.

## Signature / Usage

```typescript
import { serve } from "@upstash/workflow/nextjs";

export const { POST } = serve(async (context) => {
  // Step 1: Create webhook
  const webhook = await context.createWebhook("create webhook");

  // Step 2: Call an external endpoint, which calls the webhookUrl upon completion
  const callResult = await context.call("call webhook caller", {
    url: "https://webhook/caller",
    method: "POST",
    body: JSON.stringify({
      webhookUrl: webhook.webhookUrl,
    }),
  });

  // Step 3: Wait for the webhook to be called
  const webhookResponse = await context.waitForWebhook(
    "wait for webhook",
    webhook,
    "30s" // timeout
  );

  if (webhookResponse.timeout) {
    console.log("Webhook was not called in time");
  } else {
    console.log("Webhook received:", webhookResponse.request);
  }
});
```

## How it works

1. `context.createWebhook()` creates a unique webhook URL
2. Provide the URL to external services (typically through `context.call()`)
3. `context.waitForWebhook()` pauses execution until the webhook is called
4. The workflow resumes when the webhook receives a request or the timeout is reached

No serverless function stays running while waiting.

## Waiting for multiple calls

Wait for the same webhook repeatedly until a final signal arrives:

```typescript
while (true) {
  const webhookResponse = await context.waitForWebhook(
    `wait for progress update ${stepCount}`,
    webhook,
    "5m" // 5 minute timeout between updates
  );

  if (webhookResponse.timeout) {
    console.log("No progress update received in time, exiting");
    break;
  } else {
    const request = webhookResponse.request;
    console.log("Progress update received:", await request.json());

    if (request.headers.get("x-task-finished") === "true") {
      console.log("Task finished, exiting loop");
      break;
    }
  }
}
```

## Webhooks vs Wait for Event

| Feature | Webhooks | Wait for Event |
|---------|----------|----------------|
| Trigger | External HTTP call to unique URL | Notify via Upstash Workflow Client |
| Setup | Create webhook, pass URL to external service | Share event ID with external service |
| Integration | Easy with callback-based APIs | Requires Workflow Client integration |
| Lookback | Yes, safe against race conditions | Only when notifying a specific run with `workflowRunId`; otherwise a notify before the wait is lost |
| Best for | Third-party API callbacks | Internal event notifications |

## Receiving webhooks in a workflow endpoint

A workflow endpoint can itself be the webhook receiver. Always validate the incoming request so only the original source can trigger the workflow (example: Clerk webhooks verified with Svix):

```typescript
export const { POST } = serve<string>(async (context) => {
  const payloadString = context.requestPayload;
  const headerPayload = context.headers;

  let event: WebhookEvent;
  try {
    event = await validateRequest(payloadString, headerPayload);
  } catch {
    return
  }

  // Next steps based on the event
})
```

```typescript
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";

const webhookSecret = "YOUR_WEBHOOK_SECRET";

async function validateRequest(payloadString: string, headerPayload: Headers) {
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id") as string,
    "svix-timestamp": headerPayload.get("svix-timestamp") as string,
    "svix-signature": headerPayload.get("svix-signature") as string,
  };
  const wh = new Webhook(webhookSecret);
  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}
```

Process events in discrete steps with `context.run` (e.g. `handle-webhook-event`, then `create-stripe-customer`). The full example is `examples/nextjs-webhook-stripe` in the `upstash/workflow-js` repository.

## Notes

- Built-in lookback: if the external service calls the webhook URL before `waitForWebhook` executes, the call is stored and returned when `waitForWebhook` is reached
- Use webhooks for third-party callback-based APIs or when race-condition protection is needed without knowing the workflow run ID; use Wait for Event when you control notification and can use the Workflow Client. Passing `workflowRunId` to `notify` enables lookback for Wait for Event

## Related

- [context-webhook](./context-webhook.md)
- [wait-for-event](./wait-for-event.md)
- [context-call](./context-call.md)
- [security](./security.md)

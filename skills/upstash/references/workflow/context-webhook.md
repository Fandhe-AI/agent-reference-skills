# context.createWebhook() / context.waitForWebhook()

`createWebhook` creates a unique webhook URL that external services can call to resume the workflow; `waitForWebhook` pauses the run until that webhook is called or a timeout is reached.

## Signature / Usage

```typescript
import { serve } from "@upstash/workflow/nextjs";

export const { POST } = serve(async (context) => {
  // Create webhook
  const webhook = await context.createWebhook("create webhook");

  // Wait for webhook to be called with 30 second timeout
  const webhookResponse = await context.waitForWebhook(
    "wait for webhook",
    webhook,
    "30s"
  );

  if (webhookResponse.timeout) {
    console.log("Webhook was not called within the timeout period");
  } else {
    console.log("Webhook was called successfully");
    console.log("Request body:", webhookResponse.request.body);
    console.log("Request headers:", webhookResponse.request.headers);
  }
});
```

## Options / Props

### context.createWebhook(stepName)

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `stepName` | `string` | yes | Name of the step |

Response:

| Name | Type | Description |
|------|------|-------------|
| `webhookUrl` | `string` | Unique URL external services call to resume the workflow. Can be called multiple times to resume multiple `waitForWebhook` steps |
| `eventId` | `string` | Internal event identifier, primarily used internally by `waitForWebhook` |

### context.waitForWebhook(stepName, webhook, timeout)

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `stepName` | `string` | yes | Name of the step |
| `webhook` | `{ webhookUrl: string; eventId: string }` | yes | Object returned by `context.createWebhook()` |
| `timeout` | `string` | yes | Maximum time to wait, human-readable duration (e.g. `"10s"`, `"2h"`, `"1d"`) |

Response:

| Name | Type | Description |
|------|------|-------------|
| `timeout` | `boolean` | `false` if the webhook was called; `true` if execution resumed because the timeout elapsed |
| `request` | `Request \| undefined` | HTTP request received by the webhook (method, headers, body, URL); only present when `timeout` is `false` |

## Notes

- The same `webhook` object can be passed to `waitForWebhook` multiple times to wait for multiple calls to the same URL
- Source: fetched 2026-10 from https://upstash.com/docs/workflow/steps/createWebhook (and `steps/waitForWebhook`)

## Related

- [webhooks](./webhooks.md)
- [context-wait-for-event](./context-wait-for-event.md)
- [context-call](./context-call.md)

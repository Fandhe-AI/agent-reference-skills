---
source: https://ai-sdk.dev/docs/ai-sdk-core/mcp-events
---

# MCP Events

MCP events let a server notify your application when something changes (for example a new document comment). Your MCP client manages the subscription; your webhook endpoint receives the events.

## Signature / Usage

Expose the webhook route first (it must be reachable before subscribing):

```ts
import { experimental_createMCPEventWebhook } from '@ai-sdk/mcp';
import { eventStore } from '@/lib/event-store';

export const POST = experimental_createMCPEventWebhook({
  store: eventStore,
  async onEvent({ subscription, event }) {
    console.log(subscription.id, event.name, event.data);
  },
  async onGap({ subscription, gap }) {
    console.log('Replay gap:', subscription.id, gap.cursor, gap.truncated);
  },
  async onTerminated({ subscription, termination }) {
    console.log('Subscription terminated:', subscription.id, termination.error);
  },
});
```

Then subscribe using the same store:

```ts
import { createMCPClient } from '@ai-sdk/mcp';
import { eventStore } from '@/lib/event-store';

const client = await createMCPClient({
  transport: { type: 'http', url: 'https://service.example/mcp' },
  experimental_events: { store: eventStore },
});

try {
  const { events } = await client.experimental_events.list();
  console.log(events.map(event => event.name));

  const subscription = await client.experimental_events.subscribe({
    name: 'comment.created',
    arguments: { document_id: 'doc_123' },
    delivery: {
      mode: 'webhook',
      url: 'https://my-app.example/api/mcp-events',
    },
    ttlMs: 60 * 60 * 1000,
  });

  // Save the ID and schedule renewal before the server's granted deadline.
  console.log(subscription.id, subscription.refreshBefore);
} finally {
  await client.close(); // Webhook delivery continues until unsubscribe or expiry.
}
```

## Options / Props

Methods on `client.experimental_events`:

| Name | Description |
| --- | --- |
| `list()` | List event names, schemas, and delivery modes with `events/list`. |
| `subscribe(options)` | Save the signing secret, send `events/subscribe`, return the subscription result. |
| `refresh({ id })` | Renew an existing subscription with `events/subscribe`. |
| `unsubscribe({ id })` | Send `events/unsubscribe` and remove the saved subscription after success. |

Choosing who manages subscriptions: `experimental_events: { adapter }` when a backend manages subscriptions, webhook delivery and renewal (no AI SDK event store needed); `experimental_events: { store }` when your app registers MCP webhooks, persists secrets and schedules renewal directly. Catalog discovery works in either mode or without configuration.

## Notes

- Experimental: implements the webhook portion of the MCP Events design draft. Polling and push-stream delivery are not supported.
- Flow: `events/subscribe` (name, filters, webhook URL, signing secret; optional `ttlMs`, `cursor`) -> optional signed challenge -> server returns subscription ID, `refreshBefore`, `cursor`, `truncated` -> signed POSTs to the webhook -> client renews before `refreshBefore` or calls `events/unsubscribe`. Finite subscriptions expire if not renewed. Deliveries may be duplicated or reordered; deduplicate by subscription ID and event ID.
- `Experimental_MCPEventStore` is an AI SDK storage adapter (not an MCP protocol primitive) with five methods: `get`, `getById`, `set`, `update`, `delete`. Use shared durable storage scoped to one MCP server and authenticated principal; `update` must atomically merge supplied fields.
- The webhook helper verifies signatures, echoes challenges, calls `onEvent` without exposing the secret, returns `204` on success and `503` on processing failure so the server retries. Resolve callbacks only after processing or durable acceptance. `onGap` saves `gap.cursor` and `truncated: true` after success; `onTerminated` removes the saved subscription after success. The helper does not run or notify an agent automatically.
- The SDK generates and saves `delivery.secret` and appends an `mcp_event_subscription` query parameter to the callback URL; preserve it and pass the raw request body to the handler.
- Local HTTP callbacks require `delivery.allowInsecureLocalhost: true`; production callbacks use HTTPS.

## Related

- [MCP Events (reference)](./mcp-events.md)
- [createMCPClient](./create-mcp-client.md)
- [Model Context Protocol (MCP)](./mcp-tools.md)

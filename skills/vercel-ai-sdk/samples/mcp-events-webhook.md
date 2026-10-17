---
source: https://ai-sdk.dev/cookbook/node/mcp-events
---

# MCP Events: Subscribe and Receive Webhooks (experimental)

Subscribe to an MCP server's `comment.created` event, verify the signed webhook with `experimental_createMCPEventWebhook`, and unsubscribe.

```ts
// src/events/client.ts
import {
  createMCPClient,
  experimental_createMCPEventWebhook,
} from '@ai-sdk/mcp';
import { EventEmitter, once } from 'node:events';
import { eventStore } from './event-store';
import { startWebhookServer } from './webhook-server';

async function main() {
  const receivedEvents = new EventEmitter();
  // Uses the saved secret to verify callback challenges and event signatures.
  const webhook = experimental_createMCPEventWebhook({
    store: eventStore,
    async onEvent({ subscription, event }) {
      console.log('Received comment:', event.data);
      receivedEvents.emit(`received:${subscription.id}`);
    },
    async onGap({ subscription, gap }) {
      // Some events cannot be replayed; reconcile state or notify the agent.
      console.log('Replay gap:', subscription.id, gap.cursor, gap.truncated);
    },
    async onTerminated({ subscription, termination }) {
      // The server ended the subscription; notify the agent of the reason.
      console.log(
        'Subscription terminated:',
        subscription.id,
        termination.error,
      );
    },
  });

  // Start receiving before subscribing: the server verifies this URL immediately.
  const receiver = await startWebhookServer(webhook);
  try {
    const client = await createMCPClient({
      transport: {
        type: 'http',
        url: 'http://127.0.0.1:3002/mcp',
        headers: {
          Authorization: `Bearer ${process.env.MCP_EVENTS_TOKEN ?? 'local-events-demo'}`,
        },
      },
      experimental_events: { store: eventStore },
    });

    try {
      const { events } = await client.experimental_events.list();
      console.log(
        'Available events:',
        events.map(event => event.name),
      );

      const subscription = await client.experimental_events.subscribe({
        name: 'comment.created',
        arguments: { document_id: 'doc_123' },
        delivery: {
          mode: 'webhook',
          url: 'http://127.0.0.1:3003/mcp-events',
          allowInsecureLocalhost: true, // Local demo; production uses HTTPS.
        },
      });
      console.log('Subscribed (callback verified):', subscription.id);

      const controller = new AbortController();
      const timeout = setTimeout(() => {
        controller.abort(new Error('No event received within 10 seconds.'));
      }, 10_000);
      try {
        // Listen before publishing so an immediate callback cannot be missed.
        const received = once(receivedEvents, `received:${subscription.id}`, {
          signal: controller.signal,
        });
        await Promise.all([
          received,
          // A tool response does not generally mean its webhook has arrived.
          client
            .callTool({
              name: 'publish_comment',
              arguments: {
                document_id: 'doc_123',
                text: 'Hello from MCP events!',
              },
              options: { signal: controller.signal },
            })
            .then(result => {
              if (result.isError) throw new Error('Failed to publish comment.');
            }),
        ]);
      } finally {
        clearTimeout(timeout);
        controller.abort();
        await client.experimental_events.unsubscribe({ id: subscription.id });
      }
    } finally {
      await client.close();
    }
  } finally {
    await receiver.close();
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
```

```ts
const renewed = await client.experimental_events.refresh({
  id: subscription.id,
});
// Persist renewed.refreshBefore and schedule the next renewal.
```

## Notes

- Official warning: MCP events are experimental and implement the webhook part of the MCP Events design draft; the MCP server must implement this extension (tool support alone does not imply it).
- `./event-store`, `./webhook-server` and the demo servers are helper files in the vercel/ai repository's `examples/mcp/src/events`, not AI SDK exports; the page tells you to clone the repository, build `@ai-sdk/mcp`, run `pnpm server:events` then `pnpm client:events` from `examples/mcp`. The second block is the page's lease-renewal snippet.
- Closing the MCP client does not stop webhook delivery; unsubscribe explicitly. Leases are renewed with `refresh()` before `refreshBefore` (the SDK has no scheduler). Deliveries should be durably enqueued and deduplicated by subscription ID and `event.eventId` before any model call.
- The AI SDK is an MCP client here; other MCP roles are in anthropic-api-tools-mcp (MCP connector), anthropic-claude-code-extend, openai-agents (consumer side) and openai-apps-sdk (publisher side). The page also shows a Vercel Connect managed-adapter path (`experimental_connectEventsAdapter`); see `references/tools-mcp/mcp-events-guide.md` and `mcp-events.md`.

---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/mcp-events
---

# MCP Events

Reference for the experimental methods on `client.experimental_events`, the webhook handler, and the subscription and storage types. Methods belong to `client.experimental_events`; they are not standalone imports.

## Signature / Usage

```ts
import { createMCPClient } from '@ai-sdk/mcp';
import { eventStore } from './event-store';

const client = await createMCPClient({
  transport: { type: 'http', url: 'https://service.example/mcp' },
  experimental_events: { store: eventStore },
});

const { events, nextCursor } = await client.experimental_events.list();

const subscription = await client.experimental_events.subscribe({
  name: 'comment.created',
  arguments: { document_id: 'doc_123' },
  delivery: {
    mode: 'webhook',
    url: 'https://app.example/api/mcp-events',
  },
  ttlMs: 3_600_000,
});

const renewed = await client.experimental_events.refresh({ id: subscription.id });
await client.experimental_events.unsubscribe({ id: subscription.id });
```

Interface:

```ts
interface Experimental_MCPEvents {
  list(options?: {
    params?: { cursor?: string };
    options?: { signal?: AbortSignal; timeout?: number; maxTotalTimeout?: number };
  }): Promise<Experimental_ListEventsResult>;

  subscribe(options: Experimental_SubscribeEventOptions): Promise<Experimental_SubscribeEventResult>;

  refresh(
    options: ({ id: string; key?: never } | { key: string; id?: never }) & {
      options?: { signal?: AbortSignal; timeout?: number; maxTotalTimeout?: number };
    },
  ): Promise<Experimental_SubscribeEventResult>;

  unsubscribe(
    options: ({ id: string; key?: never } | { key: string; id?: never }) & {
      options?: { signal?: AbortSignal; timeout?: number; maxTotalTimeout?: number };
    },
  ): Promise<void>;
}
```

Webhook handler (`experimental_createMCPEventWebhook`, returns `(request: Request) => Promise<Response>`):

```ts
import { experimental_createMCPEventWebhook } from '@ai-sdk/mcp';

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
  onError(error) {
    console.error(error);
  },
});
```

Managed mode adapter contract (`Experimental_MCPEventAdapter`):

```ts
interface MCPEventAdapter {
  createAdapter(context: {
    transport: { type: 'http' | 'sse'; url: string } | { type: 'custom' };
  }): MCPEventOperations;
}
```

## Options / Props

`subscribe(options)` (`Experimental_SubscribeEventOptions`, direct mode):

| Name | Type | Description |
| --- | --- | --- |
| name | string | Event name. |
| arguments | JSONObject | Optional. Event filters; default `{}`. Not auto-validated against `inputSchema` (use `experimental_events.validateArguments`). |
| delivery | `{ mode: 'webhook'; url; secret?; allowInsecureLocalhost? }` | Webhook delivery. `url`: reachable HTTPS callback without credentials or fragment; the SDK adds `mcp_event_subscription` (preserve it). `secret`: Standard Webhooks `whsec_` format, 24-64 base64 random bytes; generated 32-byte secret when omitted. `allowInsecureLocalhost` (default false): HTTP only for literal `127.0.0.1` / `[::1]`; not sent to the server. |
| cursor | `string \| null` | Optional. Replay position; default null. |
| ttlMs | `number \| null` | Optional. Requested lifetime in ms (positive safe integer); omit for server default; null requests no expiration. |
| maxAgeMs | number | Optional. Replay-age bound in ms (nonnegative safe integer). |
| options | `{ signal?; timeout?; maxTotalTimeout? }` | Optional. Cancellation / timeout (`maxTotalTimeout`: smaller limit applies when `timeout` is also supplied). |

`Experimental_SubscribeEventResult` (returned by `subscribe` and `refresh`; excludes the secret):

| Name | Type | Description |
| --- | --- | --- |
| id | string | Server-derived subscription ID. |
| refreshBefore | `string \| null` | Renewal deadline (ISO timestamp); null = none granted. |
| cursor | `string \| null` | Replay cursor; null if the server omits it. |
| truncated | boolean | Whether replay history was truncated. |

`list()` returns `{ events: Experimental_MCPEventDefinition[]; nextCursor?: string | null }` (definitions have name, optional description, delivery modes, `inputSchema`, `payloadSchema`); pagination is explicit. `refresh` / `unsubscribe` take exactly one of `id` or `key` (key recovers/cancels a pending subscription with unknown server ID).

Webhook handler options (`Experimental_MCPEventWebhookOptions`):

| Name | Type | Description |
| --- | --- | --- |
| store | Experimental_MCPEventStore | Shared storage for routing key and secret lookup; cursor saved after success. |
| onEvent | `({ subscription, event }) => Promise<void>` | Required. Throw to return 503 for retry. `event`: `eventId`, `name`, `timestamp`, `data`, optional nullable `cursor`. |
| onGap | `({ subscription, messageId, gap }) => Promise<void>` | Optional. Helper saves fresh cursor and `truncated: true`; subscription stays active. |
| onTerminated | `({ subscription, messageId, termination }) => Promise<void>` | Optional. Helper removes the saved subscription. |
| validatePayload | `({ definition, data }) => void \| PromiseLike<void>` | Optional. After signature/envelope checks, before `onEvent`; throw to return 400. |
| onError | `(error: unknown) => void` | Optional. Reports processing, storage and payload-validation errors; should not throw. |

Managed `Experimental_MCPEventOperations`:

| Operation | Input | Result |
| --- | --- | --- |
| subscribe | `Experimental_ManagedSubscribeInput` (`name`, `arguments`, `context?`, `idempotencyKey`, `ttlMs: number \| null`, `options?`) | `Experimental_ManagedSubscription` |
| getSubscription | `{ id, options? }` | `Experimental_ManagedSubscription` |
| listSubscriptions | optional `{ cursor?, limit?, status?, options? }` | `{ subscriptions, nextCursor? }` |
| unsubscribe | `{ id, options? }` | `Experimental_ManagedSubscription` |

`Experimental_ManagedSubscription`: `id`, `name`, `arguments`, `status` (`'pending' | 'active' | 'needs_auth' | 'stopped' | 'expired' | 'failed'`), `expiresAt: string | null`, optional `cleanupStatus` (`'pending' | 'complete' | 'exhausted'`).

Control payloads:

```ts
type Experimental_MCPEventControl =
  | { type: 'gap'; cursor: string; truncated: true }
  | {
      type: 'terminated';
      error: { code: number; message: string; data?: unknown };
    };
```

## Notes

- Experimental: all APIs on this page; types are exported from `@ai-sdk/mcp` (`Experimental_MCPEvents`, `Experimental_MCPEventsConfig`, `Experimental_MCPEventDefinition`, `Experimental_ListEventsResult`, `Experimental_SubscribeEventOptions`, `Experimental_SubscribeEventResult`, `Experimental_MCPEvent`, `Experimental_MCPEventControl`, `Experimental_MCPEventSubscription`, `Experimental_MCPEventSubscriptionInfo`, `Experimental_MCPEventStore`, `Experimental_MCPEventWebhookOptions`). `RequestOptions` is not exported from `@ai-sdk/mcp`.
- Choose either `experimental_events: { adapter }` (managed) or `{ store }` (direct); mixing is rejected at compile time and runtime. `validateArguments` is direct-only. The unreleased `events` configuration spelling is replaced by `experimental_events`. Use `satisfies MCPClientConfig` to keep mode inference; a runtime-only mode gives a union of client types without direct-only methods such as `refresh()`.
- Managed mode: the backend owns callback URLs, secrets, upstream calls, verification, renewal and cleanup; `getSubscription` / `listSubscriptions` are adapter methods, not MCP wire methods; there is no `refresh()`. `createAdapter` is called once before transport start; bound operations are no longer accepted directly (wrap with `createAdapter: () => existingOperations`); a non-object return, missing methods, or thenable rejects `createMCPClient` with `MCPClientError`. Reuse the idempotency key and duration when retrying an uncertain create. `client.close()` does not unsubscribe managed watches. Never derive account identity, destination or authorization from model arguments.
- Direct mode: pending records are retained when creation fails (the request may have registered remotely); recover with `refresh({ key })` or cancel with `unsubscribe({ key })`; calling `subscribe` again creates a new callback identity. Refresh marks the subscription pending (deliveries return 503) until the new expiration is saved. The SDK runs no background renewal timer; schedule renewal before `refreshBefore`. `unsubscribe` deletes the local record only after the server succeeds; `client.close()` does not unsubscribe.
- Errors: the client rejects servers without the `events` capability; lifecycle methods require `experimental_events.store`; `MCPClientError` for validation failures (URL parsing may throw `TypeError`). Event requests are not retried by the tool-call `maxRetries`.
- The webhook handler accepts `POST` with `Content-Type: application/json`; pass original body bytes and preserve `mcp_event_subscription`. Required headers: `webhook-id`, `webhook-timestamp`, `webhook-signature`, `X-MCP-Subscription-Id`; Standard Webhooks v1 HMAC-SHA256, timestamps within five minutes; `eventId` must match `webhook-id`. Controls (`gap` / `terminated`) are never sent to `onEvent` or `validatePayload`; deduplicate retries by subscription ID and `messageId`. Verification challenges are echoed automatically.

## Related

- [MCP Events (guide)](./mcp-events-guide.md)
- [createMCPClient](./create-mcp-client.md)
- [Model Context Protocol (MCP)](./mcp-tools.md)

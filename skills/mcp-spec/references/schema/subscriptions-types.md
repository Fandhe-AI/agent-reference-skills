---
source: https://modelcontextprotocol.io/specification/2026-07-28/schema#subscriptionslistenrequest
---

# subscriptions/listen types

Schema types for `subscriptions/listen` and `notifications/subscriptions/acknowledged`: `SubscriptionFilter`, `SubscriptionsListenRequest`, `SubscriptionsListenResult`, `SubscriptionsAcknowledgedNotification`.

## Signature / Usage

```ts
/**
 * The set of notification types a client may opt in to on a
 * {@link SubscriptionsListenRequest | subscriptions/listen} request.
 *
 * Each notification type is **opt-in**; the server **MUST NOT** send
 * notification types the client has not explicitly requested here.
 */
export interface SubscriptionFilter {
  /** If true, receive {@link ToolListChangedNotification | notifications/tools/list_changed}. */
  toolsListChanged?: boolean;
  /** If true, receive {@link PromptListChangedNotification | notifications/prompts/list_changed}. */
  promptsListChanged?: boolean;
  /** If true, receive {@link ResourceListChangedNotification | notifications/resources/list_changed}. */
  resourcesListChanged?: boolean;
  /**
   * Subscribe to {@link ResourceUpdatedNotification | notifications/resources/updated} for these resource URIs.
   * Replaces the former `resources/subscribe` RPC.
   */
  resourceSubscriptions?: string[];
}

export interface SubscriptionsListenRequestParams extends RequestParams {
  /**
   * The notifications the client opts in to on this stream. The server
   * **MUST NOT** send notification types the client has not explicitly
   * requested.
   */
  notifications: SubscriptionFilter;
}

/**
 * Sent from the client to open a long-lived channel for receiving notifications
 * outside the context of a specific request. Replaces the previous HTTP GET
 * endpoint and ensures consistent behavior between HTTP and STDIO.
 */
export interface SubscriptionsListenRequest extends JSONRPCRequest {
  method: "subscriptions/listen";
  params: SubscriptionsListenRequestParams;
}

export interface SubscriptionsListenResultMetaObject extends ResultMetaObject {
  /**
   * Identifies the subscription stream this response closes, so the client can
   * correlate it with the originating subscription — mirroring the same key on
   * the stream's notifications. The value is the JSON-RPC ID of the
   * `subscriptions/listen` request that opened the stream (and equals this
   * response's `id`).
   */
  "io.modelcontextprotocol/subscriptionId": RequestId;
}

/**
 * The response to a {@link SubscriptionsListenRequest | subscriptions/listen}
 * request, signalling that the subscription has ended gracefully (for example,
 * during server shutdown). Because the listen stream is long-lived, this result
 * is sent only when the server tears the subscription down; an abrupt transport
 * close carries no response. The result body is otherwise empty.
 */
export interface SubscriptionsListenResult extends Result {
  _meta: SubscriptionsListenResultMetaObject;
}

export interface SubscriptionsListenResultResponse extends JSONRPCResultResponse {
  result: SubscriptionsListenResult;
}

export interface SubscriptionsAcknowledgedNotificationParams extends NotificationParams {
  /**
   * The subset of requested notification types the server agreed to honor.
   * Only includes notification types the server actually supports; if the
   * client requested an unsupported type (e.g., `promptsListChanged` when
   * the server has no prompts), it is omitted from this set.
   */
  notifications: SubscriptionFilter;
}

/**
 * Sent by the server to acknowledge that a
 * {@link SubscriptionsListenRequest | subscriptions/listen} subscription has been
 * established and to report which notification types it agreed to honor.
 *
 * This notification MUST be the first message the server sends carrying the
 * subscription's ID in `io.modelcontextprotocol/subscriptionId`. The server MUST
 * NOT send any notification on the subscription before acknowledging it. On
 * stdio, where every subscription shares one channel, this ordering is defined
 * per subscription ID and not per channel: messages belonging to other
 * subscriptions MAY be interleaved before it.
 */
export interface SubscriptionsAcknowledgedNotification extends JSONRPCNotification {
  method: "notifications/subscriptions/acknowledged";
  params: SubscriptionsAcknowledgedNotificationParams;
}
```

Request (`examples/SubscriptionsListenRequest/listen-for-list-changes.json`):

```json
{
  "jsonrpc": "2.0",
  "id": "listen-1",
  "method": "subscriptions/listen",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": {
        "name": "ExampleClient",
        "version": "1.0.0"
      },
      "io.modelcontextprotocol/clientCapabilities": {}
    },
    "notifications": {
      "toolsListChanged": true,
      "resourceSubscriptions": ["file:///project/config.json"]
    }
  }
}
```

Acknowledgement (`examples/SubscriptionsAcknowledgedNotification/listen-acknowledged.json`):

```json
{
  "jsonrpc": "2.0",
  "method": "notifications/subscriptions/acknowledged",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/subscriptionId": "listen-1"
    },
    "notifications": {
      "toolsListChanged": true,
      "resourceSubscriptions": ["file:///project/config.json"]
    }
  }
}
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `toolsListChanged` | `boolean` | no | Opt in to `notifications/tools/list_changed` |
| `promptsListChanged` | `boolean` | no | Opt in to `notifications/prompts/list_changed` |
| `resourcesListChanged` | `boolean` | no | Opt in to `notifications/resources/list_changed` |
| `resourceSubscriptions` | `string[]` | no | URIs for `notifications/resources/updated` |

## Notes

- Replaced in 2026-07-28: `subscriptions/listen` replaces the HTTP GET endpoint and `resources/subscribe` / `unsubscribe`, with the same behavior on HTTP and stdio.
- On stdio the server may send `notifications/cancelled` solely to terminate a `subscriptions/listen` stream; servers MUST NOT use it to cancel any other request.
- Source: tag `2026-07-28`, `schema/2026-07-28/schema.ts`. `@example` / `{@includeCode}` directives omitted.

## Related

- [Common Types](./common-types.md)
- [Request-scoped notification types](./notifications-types.md)
- [resources/* types](./resources-types.md)

---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions
---

# Subscriptions (subscriptions/listen)

`subscriptions/listen` opens a long-lived notification stream from the server to the client. The stream stays open and delivers notifications until the client cancels it.

## Signature / Usage

The client sends a `subscriptions/listen` request with a `notifications` filter:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
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

Acknowledgment (first message on the subscription):

```json
{
  "jsonrpc": "2.0",
  "method": "notifications/subscriptions/acknowledged",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/subscriptionId": 1
    },
    "notifications": {
      "toolsListChanged": true,
      "resourceSubscriptions": ["file:///project/config.json"]
    }
  }
}
```

A notification delivered on the stream:

```json
{
  "jsonrpc": "2.0",
  "method": "notifications/resources/updated",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/subscriptionId": 1
    },
    "uri": "file:///project/config.json"
  }
}
```

Graceful closure by the server (empty result):

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "resultType": "complete",
    "_meta": {
      "io.modelcontextprotocol/subscriptionId": 1
    }
  }
}
```

## Options / Props

Notification filter (all fields optional; omitting a field is equivalent to not subscribing to that type):

| Name | Type | Description |
|------|------|-------------|
| `toolsListChanged` | `boolean` | Receive `notifications/tools/list_changed` when tools change |
| `promptsListChanged` | `boolean` | Receive `notifications/prompts/list_changed` when prompts change |
| `resourcesListChanged` | `boolean` | Receive `notifications/resources/list_changed` when list changes |
| `resourceSubscriptions` | `string[]` | Receive `notifications/resources/updated` for these resource URIs |

## Notes

- The server **MUST NOT** send notification types the client has not explicitly requested.
- Acknowledgment: the server **MUST** send `notifications/subscriptions/acknowledged` as the first message carrying the subscription ID in `_meta` under `io.modelcontextprotocol/subscriptionId`, and **MUST NOT** send any notification on the subscription before it. On stdio, where every subscription shares one channel, this ordering is per subscription ID, not per channel: messages from other subscriptions **MAY** be interleaved before it.
- The `notifications` field in the acknowledgment reflects the subset the server agreed to honor; unsupported types are omitted. The client **SHOULD** check it against what it requested and handle unsupported types gracefully.
- All notifications on the stream carry `io.modelcontextprotocol/subscriptionId` in `_meta`, whose value is the JSON-RPC ID of the `subscriptions/listen` request. On stdio, clients **MUST** use this field to correlate notifications with their originating subscription.
- A client **MAY** have multiple active subscriptions concurrently; each is identified by the JSON-RPC request ID of its `subscriptions/listen` request.
- A subscription ends when: the client cancels it (close the SSE stream on HTTP, or send `notifications/cancelled` referencing the `subscriptions/listen` request ID on stdio); the server tears it down (it **SHOULD** send the empty `subscriptions/listen` response, then close the stream); or the underlying transport closes (HTTP timeout, TCP disconnect, stdio process exit).
- Graceful Closure: the response carries `io.modelcontextprotocol/subscriptionId` in `_meta` matching the originating request `id`. A transport that closes without it indicates an unexpected disconnect, which the client **MAY** treat as a trigger to reconnect.
- On stdio, if the connection is terminated and re-established, the client **MUST** re-send `subscriptions/listen`; the server holds no subscription state across reconnections.
- Replaced in 2026-07-28: `subscriptions/listen` replaces the former `resources/subscribe` / `resources/unsubscribe` RPCs and the HTTP GET endpoint.
- Source: tag `2026-07-28` raw (`docs/specification/2026-07-28/basic/patterns/subscriptions.mdx`).

## Related

- [Message Patterns Overview](./patterns-overview.md)
- [Cancellation](./cancellation.md)

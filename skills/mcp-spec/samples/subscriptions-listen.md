---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions
---

# subscriptions/listen

Client opens a long-lived notification stream, receives the acknowledgment, updates, and a graceful close.

Open the stream:

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

First message from the server (acknowledgment):

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

Notification on the stream:

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

Graceful closure by the server:

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

## Notes

- Reproduced from `basic/patterns/subscriptions.mdx` (tag `2026-07-28`); the subscription ID equals the JSON-RPC `id` of the `subscriptions/listen` request.
- The server MUST NOT send notification types the client did not request, and MUST send the acknowledgment first.
- Replaced in 2026-07-28: `resources/subscribe` / `resources/unsubscribe` and the HTTP GET endpoint are superseded by `subscriptions/listen`.
- Cancel by closing the SSE stream (HTTP) or sending `notifications/cancelled` for the request ID (stdio); on stdio reconnect the client MUST re-send `subscriptions/listen`.

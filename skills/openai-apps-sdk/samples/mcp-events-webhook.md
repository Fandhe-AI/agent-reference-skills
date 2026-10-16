# MCP Events Webhook

Advertise `events` on an MCP server, define and subscribe to an event, verify the callback, send signed webhook deliveries with Node.js, and unsubscribe.

Advertise event support in the `server/discover` response:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "resultType": "complete",
    "supportedVersions": ["2026-07-28"],
    "capabilities": {
      "tools": {},
      "events": {}
    }
  }
}
```

`events/list` result defining an event:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "events": [
      {
        "name": "comment.created",
        "description": "A new review comment was added to the specified document.",
        "delivery": ["webhook"],
        "inputSchema": {
          "type": "object",
          "properties": {
            "document_id": {
              "type": "string",
              "description": "ID of the document to monitor for new review comments."
            }
          },
          "required": ["document_id"],
          "additionalProperties": false
        },
        "payloadSchema": {
          "type": "object",
          "properties": {
            "document_id": { "type": "string" },
            "comment_id": { "type": "string" },
            "text": { "type": "string" },
            "url": { "type": "string" }
          },
          "required": ["document_id", "comment_id", "text", "url"],
          "additionalProperties": false
        }
      }
    ]
  }
}
```

`events/subscribe` request and response:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "events/subscribe",
  "params": {
    "name": "comment.created",
    "arguments": {
      "document_id": "doc_123"
    },
    "delivery": {
      "mode": "webhook",
      "url": "https://receiver.example.com/mcp-events/callback_123",
      "secret": "whsec_<base64-encoded-signing-key>"
    },
    "cursor": null
  }
}
```

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "id": "sub_123",
    "refreshBefore": "2026-10-02T12:00:00Z",
    "cursor": null,
    "truncated": false
  }
}
```

Verification challenge (signed with the subscription secret and sent before any application data), and the echoed response:

```json
{
  "type": "verification",
  "challenge": "a-single-use-random-value"
}
```

```json
{
  "challenge": "a-single-use-random-value"
}
```

Send a signed event with Node.js (`npm install standardwebhooks`):

```javascript
import { Webhook } from "standardwebhooks";

export async function sendEvent(subscription, event, webhookFetch) {
  const body = JSON.stringify(event);
  if (Buffer.byteLength(body, "utf8") > 256 * 1024) {
    throw new Error("Event payload exceeds 256 KiB");
  }

  const signedAt = new Date();
  const signer = new Webhook(subscription.secret);
  const response = await webhookFetch(subscription.url, {
    method: "POST",
    redirect: "error",
    signal: AbortSignal.timeout(10_000),
    headers: {
      "Content-Type": "application/json",
      "webhook-id": event.eventId,
      "webhook-timestamp": String(Math.floor(signedAt.getTime() / 1000)),
      "webhook-signature": signer.sign(event.eventId, signedAt, body),
      "X-MCP-Subscription-Id": subscription.id,
    },
    body,
  });

  return { accepted: response.ok, status: response.status };
}
```

`events/unsubscribe` request and empty result:

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "events/unsubscribe",
  "params": {
    "name": "comment.created",
    "arguments": {
      "document_id": "doc_123"
    },
    "delivery": {
      "mode": "webhook",
      "url": "https://receiver.example.com/mcp-events/callback_123"
    }
  }
}
```

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "result": {}
}
```

## Notes

- Requires MCP 2.0 (protocol version `2026-07-28`). Available in Work chats only (ChatGPT web, or the desktop app with Cloud selected, and dots). Only webhook delivery is supported; polling, streaming, and the draft's `gap` / `terminated` control notifications are not.
- `webhookFetch` must have the same interface as `fetch`, validate callback addresses on each connection, and block redirects. Each request body is at most 256 KiB; serialize the body once and sign those exact bytes.
- Retry transient failures with exponential backoff and bounded attempts, preserving `eventId` and re-signing with a fresh timestamp. Do not retry `410` or `413`.
- Distinct from platform webhooks of the OpenAI API (see the `openai-api-core` skill) and from the event/webhook vocabulary of `inngest`; this is the MCP server side of ChatGPT event subscriptions.

Source: https://developers.openai.com/plugins/build/mcp-events

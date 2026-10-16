# MCP Events

MCP Events lets ChatGPT subscribe to updates from your MCP server, such as new messages, content updates, or status changes. Users choose what to monitor and what ChatGPT should do when an update arrives. Your server implements `events/list`, `events/subscribe`, `events/unsubscribe` and delivers signed webhooks.

## Signature / Usage

Advertise support in the `server/discover` response:

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

Event definition returned from `events/list`:

```json
{
  "name": "comment.created",
  "description": "A new review comment was added to the specified document.",
  "delivery": ["webhook"],
  "inputSchema": {
    "type": "object",
    "properties": {
      "document_id": { "type": "string", "description": "ID of the document to monitor for new review comments." }
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
```

Subscribe request from ChatGPT:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "events/subscribe",
  "params": {
    "name": "comment.created",
    "arguments": { "document_id": "doc_123" },
    "delivery": {
      "mode": "webhook",
      "url": "https://receiver.example.com/mcp-events/callback_123",
      "secret": "whsec_<base64-encoded-signing-key>"
    },
    "cursor": null
  }
}
```

Subscribe result:

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

Event delivery body (POST to the callback URL, one event per request):

```json
{
  "eventId": "evt_456",
  "name": "comment.created",
  "timestamp": "2026-10-01T12:05:00Z",
  "data": {
    "document_id": "doc_123",
    "comment_id": "comment_456",
    "text": "Can we add the rollout dates to this section?",
    "url": "https://docs.example.com/doc_123#comment_456"
  },
  "cursor": null
}
```

Signed delivery with Node.js (`npm install standardwebhooks`):

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

Unsubscribe request (server returns `"result": {}`):

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "events/unsubscribe",
  "params": {
    "name": "comment.created",
    "arguments": { "document_id": "doc_123" },
    "delivery": { "mode": "webhook", "url": "https://receiver.example.com/mcp-events/callback_123" }
  }
}
```

## Options / Props

Event methods (on the same authenticated MCP endpoint as your tools):

| Name | Type | Description |
| --- | --- | --- |
| `events/list` | method | Describe available events and their filters. Paginate with `nextCursor` / `cursor`. |
| `events/subscribe` | method | Create or refresh a subscription. |
| `events/unsubscribe` | method | Stop a subscription. |

Delivery request headers:

| Header | Value |
| --- | --- |
| `Content-Type` | `application/json` |
| `webhook-id` | The same value as the body's `eventId`. |
| `webhook-timestamp` | The signing time as Unix seconds. |
| `webhook-signature` | The Standard Webhooks HMAC signature. |
| `X-MCP-Subscription-Id` | The ID returned by `events/subscribe`. |

Subscription result fields:

| Name | Type | Description |
| --- | --- | --- |
| `id` | string | Deterministic ID derived from principal, callback URL, event name, and arguments. |
| `refreshBefore` | string / null | Expiration granted; `null` only when the request had `ttlMs: null`. |
| `cursor` | string / null | `null` for event types without replay. |
| `truncated` | boolean | `true` when the requested history is no longer available. |

## Notes

- Availability: Work chats on ChatGPT web, Work chats in the desktop app with **Cloud** selected, and dots. Workspace controls for plugins and event-triggered tasks apply.
- Requires MCP 2.0 (protocol version `2026-07-28`), persistent subscription storage, and outbound HTTPS access to callback URLs.
- Supported: webhook delivery and callback verification from the draft MCP Events specification. Not supported: polling, streaming, and the draft's `gap` and `terminated` control notifications.
- `inputSchema` describes subscribe arguments; `payloadSchema` describes the `data` object in each delivered event. Apply filters on the server before delivery and return only events the account may discover.
- Before accepting a subscription: authorize the user, validate name and arguments, require a `whsec_` secret whose base64 value decodes to 24-64 bytes, verify the callback URL, and store owner / filters / URL / secret / expiration.
- Subscription creation must be idempotent; compare arguments using canonical JSON.
- Callback verification: send a signed `{"type": "verification", "challenge": "..."}` (unique `webhook-id`, e.g. `msg_verification_123`); ChatGPT echoes `{"challenge": "..."}`. Require `2xx`, compare the challenge in constant time. On failure return JSON-RPC error `-32015` (`CallbackEndpointError`) with a categorized `data.reason` such as `challenge_failed` or `timeout`.
- Require HTTPS for callbacks; validate resolved addresses at connection time, block private / local / non-public addresses, and do not follow redirects (applies to verification and deliveries).
- One event per request, body at most 256 KiB (262,144 bytes). Keep application fields inside `data`; a top-level `type` identifies a protocol control notification. Treat user-authored text as data and add no behavioral instructions to the payload.
- `2xx` acknowledges receipt; ChatGPT processes asynchronously. Retry transient failures with exponential backoff and bounded attempts, preserving the event ID and re-signing each attempt. Do not retry `410` or `413`. Events can arrive out of order; make write tools idempotent.
- Refresh: ChatGPT calls `events/subscribe` before `refreshBefore` with the same identity and last saved cursor. `ttlMs` omitted means server default; `ttlMs: null` requests no expiration. On secret rotation, sign with both old and new keys (space-separated Standard Webhooks signatures) for a short window.
- Distinct from the webhooks in the OpenAI API (openai-api-core) and from MCP tools; this is the plugin-side MCP Events extension.
- Rescan your MCP server whenever tools or events change; events appear on the plugin page alongside tools.
- Protocol reference: https://github.com/modelcontextprotocol/experimental-ext-triggers-events/blob/main/docs/design-sketch-proposal.md
- Source: https://developers.openai.com/plugins/build/mcp-events (local .md twin copy, fetched 2026-10-17).

## Related

- [MCP server](./mcp-server.md)
- [Package your plugin](./package-plugin.md)
- [Plugin Extensions](./extensions.md)

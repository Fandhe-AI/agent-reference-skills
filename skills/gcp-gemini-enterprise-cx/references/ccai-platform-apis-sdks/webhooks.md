---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/webhooks
---

# CCAI Platform Apps API chat webhooks

With webhooks, the Apps API sends your application a real-time notification each time a relevant event occurs during a chat session, for example when a chat is created, a message is received, or a chat is transferred or escalated. Webhooks are scoped to chat sessions on the Apps API. All supported chat webhook events are delivered as HTTP `POST` requests to a single webhook URL that you configure; there is no per-event subscription.

## Signature / Usage

### Before you begin

- You must be an administrator (or have a role with permission to edit Developer Settings).
- Prepare an endpoint that can receive HTTP `POST` requests. The webhook URL must use HTTPS.

### Turn on webhooks and set the URL

1. In the CCAI Platform portal, click **Settings > Developer Settings** (click **Menu** if you don't see **Settings**).
2. In the **Webhooks** pane, switch the **Webhooks** toggle on. When webhooks are off, no events are sent.
3. In **URL**, enter your webhook endpoint (HTTPS, accepts `POST`).
4. Select **Save** to apply the enabled state and URL.

Delivery begins after webhooks are enabled and a webhook URL and primary secret are set.

### Signing secrets

Every webhook request is signed. The signature is in the `X-Signature` request header and the signing timestamp is in `X-Signature-Timestamp`. You can configure up to two signing secrets:

- **Primary secret**: the main token used to sign webhook requests.
- **Secondary secret**: an optional second token. When set, each request is signed with both secrets, which lets you rotate secrets without missing events.

Generate each secret separately in the **Webhooks** pane (**Generate** in the **Primary Secret** or **Secondary Secret** section, then **Copy**). The full secret is shown only right after you generate it; afterward it is masked. A new secret takes effect immediately, so anything still using a replaced secret fails. Generating or rotating a secret does not require a save operation.

### Rotate signing secrets

When a primary secret exists, **Rotate Secrets** becomes available. Make sure both a primary and a secondary secret are set, click **Rotate Secrets** to swap them, then update your application to verify signatures against the new active secret. During the overlap each request is signed with both secrets, so accept either one.

### Signature format

The `X-Signature` header can contain a primary signature, a secondary signature, or both:

```text
primary=<primary_signature> secondary=<secondary_signature>
```

Each signature is a Base64-encoded HMAC-SHA256 digest. The signed value is:

```text
X-Signature-Timestamp + raw_request_body
```

### What your application receives

Each request body is a JSON envelope with `event_type`, `timestamp`, `chat_id`, and an event-specific `body`. Events cover lifecycle changes, participant activity, messages, transfers, escalations, web forms, and dismissal warnings.

## Notes

- Store the signing secrets in a server-side secret store; only the receiving server should hold them.
- Snippet taken from https://docs.cloud.google.com/contact-center/ccai-platform/docs/chat-platform-api-guide (both blocks; the page has no code of its own; the guide also lists the verification steps: reject missing headers and stale timestamps, read the raw body, compare with a constant-time comparison).
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/webhooks (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [chat-platform-api-guide.md](./chat-platform-api-guide.md)
- [apps-and-manager-apis.md](./apps-and-manager-apis.md)

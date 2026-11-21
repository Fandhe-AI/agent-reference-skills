---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/chat-platform-api-guide
---

# Build a server-side chat integration with the Apps API

End-to-end flow for a backend service that connects a customer-owned chat experience to CCAI Platform: authenticate to the Apps API, create or update an end user, start a chat, receive and verify webhook events, send messages, handle optional branches (pre-chat transcript import, queue-selection virtual-agent routing, escalation deflections, media attachments) and end the chat. It supplements the Apps API Chat endpoints reference (https://externals.ujet.co/apidocs/apps/publication.html#Chats), which holds the exhaustive schemas.

## Signature / Usage

### Prerequisites

- Apps API credentials from **Settings > Developer Settings > API Credentials**; don't expose the secret in browser or mobile-client code.
- Base URL `https://YOUR_SUBDOMAIN.YOUR_DOMAIN/apps/api/v1`.
- When creating a chat, your backend takes `end_user_id` from the authenticated session (the end-user ID it stored for that user), never from a value the browser sends, and stores the returned `chat_id` against that user. For every later request on an existing `chat_id` (messages, escalations and deflection choices, ending the chat, end-user updates, attachments, custom data, CSAT and ratings), it first checks that the authenticated user owns that `chat_id`, and derives every user ID it sends (`from_user_id`, `ended_by_user_id`) the same way. This is not stated in the official docs; for server-side end-user authentication, see [web-sdk-v3-authenticate.md](./web-sdk-v3-authenticate.md).
- A public HTTPS webhook endpoint configured in developer settings, with a primary secret generated. The webhooks page says CCAI Platform "begins delivering events after webhooks are enabled and a webhook URL and primary secret are set" and calls the secondary secret "An optional second token" that lets you rotate secrets without missing events; generate it too if you plan to rotate secrets (webhooks.md).
- The queue or menu new chats enter; for a queue-selection virtual agent, configure it and assign it to the entry queue before creating chats.
- A stable end-user identifier, and storage for the CCAI Platform end-user ID the API returns.
- Retries and backoff: CCAI Platform rate-limits the Apps API; avoid bursts for a single tenant.

### Authenticate Apps API requests

HTTP basic authentication. Pass the API token in the **password** field (recommended). If your tenant uses the legacy authentication path, pass the company key as the username and the company secret as the password.

Adapted (not in the official docs): the `{chat_id}` placeholder was replaced with `CHAT_ID`; replace it with the real chat ID. curl itself expands `{...}` in a URL as a glob set, whether or not the shell quotes the URL, so `{chat_id}` would be sent as the literal text `chat_id`; to send braces literally, curl needs `--globoff` (`-g`). The URL is in double quotes, so the host and ID you substitute stay one argument. The `-u` value is only the user name `YOUR_SUBDOMAIN`; curl then prompts for the password (the API token), so the token is not stored in the shell history (the source passes `-u "YOUR_SUBDOMAIN:YOUR_API_TOKEN"`; `man curl`: "If you simply specify the user name, curl prompts for a password."). `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `-q` (the first argument) makes curl skip `.curlrc`, so a `trace` or `trace-ascii` set there cannot record the credential headers.

```bash
curl -q --fail-with-body -X GET \
  "https://YOUR_SUBDOMAIN.YOUR_DOMAIN/apps/api/v1/chats/CHAT_ID" \
  -u "YOUR_SUBDOMAIN" \
  -H "Accept: application/json"
```

### Verify webhook requests

Each webhook request includes `X-Signature` and `X-Signature-Timestamp`. `X-Signature` can contain a primary signature, a secondary signature, or both:

```text
primary=<primary_signature> secondary=<secondary_signature>
```

Each signature is a Base64-encoded HMAC-SHA256 digest of:

```text
X-Signature-Timestamp + raw_request_body
```

Handler steps: read both headers; reject the request if either is missing; reject stale timestamps to reduce replay risk; read the raw body before parsing JSON; compute the expected signature with each active webhook secret; compare with a constant-time comparison; accept if any active secret matches. The source then says: "If verification succeeds, return a success response quickly and process the event idempotently." Before that success response, save the verified event to a database or a durable queue, return the success (2xx) response only after the save succeeds, and process the saved event asynchronously and idempotently (deliveries and API responses can arrive in different orders, and the same state change can arrive more than once). If the save fails, return an error status instead, so the event is not acknowledged and lost. The persist-before-acknowledging order and the error status are not stated in the official docs.

### Create or update the end user

`POST /apps/api/v1/end_users`. Store the end-user ID from the response; an existing identifier is updated and the existing end user is returned.

```json
{
  "identifier": "customer-user-12345",
  "email": "customer.user@example.com",
  "name": "Customer User",
  "phone": "+15551234567"
}
```

### Create the chat

`POST /apps/api/v1/chats`. The API returns the chat resource, and CCAI Platform sends a `chat_created` webhook event; the two can arrive in either order, so treat both as updates to the same chat record keyed by chat ID.

```json
{
  "chat": {
    "menu_id": 123,
    "end_user_id": 456,
    "lang": "en"
  }
}
```

Optional context for virtual-agent routing, which a queue-selection virtual agent can use to decide the target queue:

```json
{
  "chat": {
    "menu_id": 123,
    "end_user_id": 456,
    "lang": "en",
    "context": {
      "value": {
        "customer_tier": "gold",
        "issue_type": "billing"
      }
    }
  }
}
```

### Process webhook events

Store at least the chat ID, event type, event timestamp, message sender / type / content when present, and escalation or deflection data. Verify every signature, store processed event IDs or a deterministic event key so retries don't create duplicates, return a 2xx response after accepting the event, and process downstream side effects asynchronously when possible. "Accepting" here means the verified event has been saved to a database or durable queue: return the 2xx only after that save succeeds, and do the downstream processing from the saved event (this meaning is not stated in the official docs). If events arrive out of order, reconcile display order with event timestamps.

### Send a text message

`POST /apps/api/v1/chats/{chat_id}/message`. Your webhook endpoint also receives a message event for messages your own application sent.

```json
{
  "from_user_id": 456,
  "message": {
    "type": "text",
    "content": "Hello, I need help with my order."
  }
}
```

### Escalate from a virtual agent to a human agent

`POST /apps/api/v1/chats/{chat_id}/escalations`. If the queue cannot take the chat and deflection alternatives are configured, the chat stays with the virtual agent and an `escalation_deflected` webhook event carries the alternatives; they never arrive in the escalation response.

```json
{
  "reason": "by_end_user_ask",
  "force_escalate": false
}
```

### Record an escalation-deflection choice

`PATCH /apps/api/v1/chats/{chat_id}/escalations/{escalation_id}`. Recording a choice does not route the chat; your integration acts on it, for example by closing the chat for an email deflection or sending a new escalation with `force_escalate: true` for a keep-waiting choice.

```json
{
  "deflection_channel": "email"
}
```

### End the chat

`PATCH /apps/api/v1/chats/{chat_id}/end`; the webhook endpoint then receives the final chat-state event.

```json
{
  "ended_by_user_id": 456
}
```

To record a deflection choice and close the chat in one request, use `PATCH /apps/api/v1/chats/{chat_id}` with `escalation_id` and `deflection_channel` alongside status.

### Advanced flows

- **Pre-chat transcript import**: add the transcript payload when you create the chat; the Apps API reference has the transcript schema.
- **Queue-selection virtual agent**: create a virtual agent, assign it to the entry queue, include context when creating the chat, configure it to inspect the context and escalate to the correct queue, and handle deflection options.
- **Photo or video attachments** (four stages): request a presigned upload URL with `POST /apps/api/v1/chats/{chat_id}/photos/upload` or `.../videos/upload`; upload the file to the returned storage URL with any returned fields; add the uploaded file with `POST /apps/api/v1/chats/{chat_id}/photos` or `.../videos` and store the returned `media_id`; send the media as a message to `/message`.
- **Custom data**: `POST /apps/api/v1/chats/{chat_id}/custom_data`.
- **Update end-user identity during a chat**: `POST /apps/api/v1/chats/{chat_id}/end_user`.
- **CSAT / rating**: `GET .../csat`, `GET .../rating`, `PATCH .../rating` under `/apps/api/v1/chats/{chat_id}/`.

Photo message request body:

```json
{
  "from_user_id": 456,
  "message": {
    "type": "photo",
    "content": "Photo of the damaged item",
    "media_id": 789
  }
}
```

## Notes

- Supported `deflection_channel` values: `email` (the end user chooses the email deflection option), `virtual_agent` (the end user chooses to continue with a virtual agent), `human_agent` (the end user chooses to keep waiting for a human agent; applies only to over-capacity deflections).
- Send only a supported `deflection_channel` value; `external_link` isn't valid for the escalation update endpoint. When the end user follows an external deflection link, the chat ends instead.
- A chat that ends without a recorded deflection choice leaves the choice unrecorded on the escalation and absent from deflection-outcome reporting; don't use the end endpoint in place of recording the selection.
- The message endpoint accepts `type`, `content` and `media_id` as flat values; a nested object in `content` is discarded and the media reference is lost. Use the `video` message type and the video `media_id` for video; `media_id` is a sibling of `content`.
- The source also shows a Ruby webhook-verification handler (HMAC-SHA256, 5-minute timestamp window, constant-time comparison); it is reproduced on the webhooks page.
- Adapted from the official docs: `{chat_id}` in the curl URL `https://YOUR_SUBDOMAIN.YOUR_DOMAIN/apps/api/v1/chats/{chat_id}` became `CHAT_ID`. URL globbing is done by curl, not by the shell (`man curl` 8.7.1, `-g, --globoff`: "This option switches off the "URL globbing parser". When you set this option, you can specify URLs that contain the letters {}[] without having curl itself interpret them."). The source's unquoted URL is also double-quoted.
- Source inconsistency: this guide's prerequisites say "Generate and store the webhook primary and secondary secrets.", while the webhooks page makes only the primary secret required ("Contact Center AI Platform begins delivering events after webhooks are enabled and a webhook URL and primary secret are set.") and the secondary secret optional ("Optional: In the **Secondary Secret** section, click **Generate**"). The page follows the webhooks page: primary required, secondary for rotation.
- Corrected from the official docs: `-u "YOUR_SUBDOMAIN:YOUR_API_TOKEN"` puts the API token on the command line; the page passes the user name only and lets curl prompt for it. `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. `-q` is placed first (`man curl` 8.7.1, `-q, --disable`: "If used as the first parameter on the command line, the curlrc config file is not read or used."), because a `trace` / `trace-ascii` in `.curlrc` ("Enables a full trace dump of all incoming and outgoing data") would write the `Authorization` header to a file.
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/webhooks (retrieved 2026-11-21; primary and secondary secret requirements)
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/chat-platform-api-guide (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [webhooks.md](./webhooks.md)
- [apps-and-manager-apis.md](./apps-and-manager-apis.md)
- [web-sdk-v3-authenticate.md](./web-sdk-v3-authenticate.md)

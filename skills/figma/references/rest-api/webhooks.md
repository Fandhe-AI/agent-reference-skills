# Webhooks

Endpoints for creating, reading, updating, and deleting webhooks that fire on Figma events.

## Signature / Usage

```http
POST /v2/webhooks
X-Figma-Token: <token>
Content-Type: application/json

{
  "event_type": "FILE_VERSION_UPDATE",
  "context": "file",
  "context_id": "<file_key>",
  "endpoint": "https://example.com/webhook",
  "passcode": "my-secret"
}
```

## Options / Props

### POST /v2/webhooks — Create webhook

| Parameter | Type | Description |
|-----------|------|-------------|
| `event_type` | WebhookV2Event (body) | Event type to subscribe to |
| `context` | String enum (body) | `team`, `project`, or `file` |
| `context_id` | String (body) | ID of the context to attach to |
| `endpoint` | String (body) | Callback URL (max 2048 chars) |
| `passcode` | String (body) | Secret included in payloads for verification (max 100 chars) |
| `status` | WebhookV2Status (body, optional) | Initial status |
| `description` | String (body, optional) | Description (max 150 chars) |

**Response:** `WebhookV2` object. A `PING` event is sent to the endpoint upon creation.  
**Scope:** `webhooks:write` | **Rate Limit:** Tier 2

---

### GET /v2/webhooks/:webhook_id — Get webhook

| Parameter | Type | Description |
|-----------|------|-------------|
| `webhook_id` | String (path) | Webhook ID |

**Response:** `WebhookV2` object  
**Scope:** `webhooks:read` | **Rate Limit:** Tier 2

---

### GET /v2/webhooks — List webhooks

| Parameter | Type | Description |
|-----------|------|-------------|
| `context` | String enum (query, optional) | `team`, `project`, or `file` |
| `context_id` | String (query, optional) | ID of the context |
| `plan_api_id` | String (query, optional) | List all accessible contexts (format: `team-{id}` or `organization-{id}`) |
| `cursor` | String (query, optional) | Pagination cursor |

**Response:** `{ webhooks: WebhookV2[], pagination: object }`  
**Scope:** `webhooks:read` | **Rate Limit:** Tier 2

---

### PUT /v2/webhooks/:webhook_id — Update webhook

| Parameter | Type | Description |
|-----------|------|-------------|
| `webhook_id` | String (path) | Webhook ID |
| `event_type` | WebhookV2Event (body, optional) | New event type |
| `endpoint` | String (body, optional) | New callback URL |
| `passcode` | String (body, optional) | New passcode |
| `status` | WebhookV2Status (body, optional) | New status |
| `description` | String (body, optional) | New description (max 140 chars) |

**Response:** Updated `WebhookV2` object  
**Scope:** `webhooks:write` | **Rate Limit:** Tier 2

---

### DELETE /v2/webhooks/:webhook_id — Delete webhook

| Parameter | Type | Description |
|-----------|------|-------------|
| `webhook_id` | String (path) | Webhook ID |

**Response:** Deleted `WebhookV2` object  
**Scope:** `webhooks:write` | **Rate Limit:** Tier 2

---

### GET /v2/webhooks/:webhook_id/requests — List webhook requests

| Parameter | Type | Description |
|-----------|------|-------------|
| `webhook_id` | String (path) | Webhook ID |

**Response:** `{ requests: WebhookV2Request[] }` — request/response history from the past 7 days  
**Scope:** `webhooks:read` | **Rate Limit:** Tier 2

---

### GET /v2/teams/:team_id/webhooks — List team webhooks (DEPRECATED)

Use `GET /v2/webhooks?context=team&context_id=:team_id` instead.

## Notes

- Webhook limits per context: team (20), project (5), file (3–600 depending on plan)
- Endpoint servers must respond with `200 OK`; failures retry at 5 min, 30 min, and 3 h
- A `PING` event is fired at the endpoint when a webhook is first created

## Related

- [Scopes](./scopes.md)
- [Rate Limits](./rate-limits.md)

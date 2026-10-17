---
source: https://ai.google.dev/api/webhooks
---

# Webhooks API

REST reference for webhooks: the Gemini API pushes real-time notifications to your server when asynchronous or Long-Running Operations (LROs) complete, replacing polling (Beta).

## Signature / Usage

```text
POST   https://generativelanguage.googleapis.com/v1beta/webhooks
POST   https://generativelanguage.googleapis.com/v1beta/webhooks/{id}:ping
POST   https://generativelanguage.googleapis.com/v1beta/webhooks/{id}:rotateSigningSecret
GET    https://generativelanguage.googleapis.com/v1beta/webhooks
GET    https://generativelanguage.googleapis.com/v1beta/webhooks/{id}
PATCH  https://generativelanguage.googleapis.com/v1beta/webhooks/{id}
DELETE https://generativelanguage.googleapis.com/v1beta/webhooks/{id}
```

Rotate a signing secret (REST):

```sh
curl -X POST "https://generativelanguage.googleapis.com/v1beta/webhooks/${WEBHOOK_ID}:rotateSigningSecret" \
-H "x-goog-api-key: ${GEMINI_API_KEY}" \
-H 'Content-Type: application/json' \
-d '{
  "revocation_behavior": "revoke_previous_secrets_after_h24"
}'
```

Webhook resource (example response):

```json
{
  "create_time": "string",
  "id": "string",
  "name": "string",
  "new_signing_secret": "string",
  "signing_secrets": [
    {
      "expire_time": "string",
      "truncated_secret": "string"
    }
  ],
  "state": "enabled",
  "subscribed_events": [
    "batch.succeeded"
  ],
  "update_time": "string",
  "uri": "string"
}
```

## Options / Props

`CreateWebhook` request body:

| Name | Type | Description |
|------|------|-------------|
| name | string (optional) | The user-provided name of the webhook. |
| subscribed_events | array (enum) (required) | Events subscribed to: `batch.succeeded` (batch processing finished successfully), `batch.expired` (batch not processed within the 48h timeframe), `batch.failed`, `interaction.requires_action` (e.g., function calling), `interaction.completed`, `interaction.failed`, `video.generated`. |
| uri | string (required) | The URI to which webhook events will be sent. |

`Webhook` resource (output only unless noted): `create_time`, `id`, `name`, `new_signing_secret` (only populated on create), `signing_secrets[]` (`expire_time`, `truncated_secret`), `state` (`enabled`, `disabled` by the user, `disabled_due_to_failed_deliveries`), `subscribed_events`, `update_time`, `uri`.

Other methods:

| Method | Parameters | Response |
|------|------|-------------|
| PingWebhook | `id` (required) | empty |
| RotateSigningSecret | `id` (required); body `revocation_behavior` (optional): `revoke_previous_secrets_after_h24` (default and safest option for migrations) or `revoke_previous_secrets_immediately` (can interrupt ongoing notifications) | `secret` (newly generated signing secret) |
| ListWebhooks | `page_size` (optional; at most 50 if unspecified, maximum 1000), `page_token` | `webhooks[]`, `next_page_token` |
| GetWebhook | `id` (required) | `Webhook` |
| UpdateWebhook | `id` (required), `update_mask` (optional list of fields to update) | `Webhook` |
| DeleteWebhook | `id` (required) | empty |

## Notes

- Availability: v1beta (the source states "This API is in Beta. Endpoints are under `/v1beta/`."). Per-request override: `webhookConfig.uris[]` on `batchGenerateContent` / `asyncBatchEmbedContent` / `predictLongRunning`; `webhook_config.uris` and `user_metadata` on interactions.
- Secret values (`new_signing_secret`, `secret`) are returned only once; store them in a secret manager, never in source control.
- The source `curl` examples, including the rotateSigningSecret example shown above, omit the authentication header; `-H "x-goog-api-key: ${GEMINI_API_KEY}"` is required (as in the overview page). The curl example here adds that header and a brace-quoted `${WEBHOOK_ID}` variable (avoids the zsh `:r` modifier) in place of the source's literal `{id}`.
- These are Gemini API completion webhooks, distinct from stripe event webhooks and inngest functions; compare openai-api-core (webhooks) and anthropic-api-core.
- Docs fetched 2026-10-16.

## Related

- [Batch API](./batch.md)
- [Interactions API (v1beta)](./interactions-v1beta.md)
- [Triggers API](./triggers.md)

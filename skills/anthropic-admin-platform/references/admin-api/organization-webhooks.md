<!-- source: https://platform.claude.com/docs/en/manage-claude/organization-webhooks / last verified: 2026-11-14 -->

# Organization webhooks (beta)

An organization webhook endpoint receives an event when Anthropic restricts or bans one of your organization's user profiles, and when the restriction or ban ends. Endpoints are managed with the Admin API under `/v1/organizations/webhooks`.

## Signature / Usage

Beta header `anthropic-beta: webhooks-2026-10-07` is required on every request (the SDK and CLI send it).

```bash
curl "https://api.anthropic.com/v1/organizations/webhooks" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2026-10-21" \
  -H "anthropic-beta: webhooks-2026-10-07" \
  -H "content-type: application/json" \
  -d '{
    "url": "https://example.com/anthropic-webhooks",
    "name": "Enforcement actions",
    "enabled_events": [
      "user_profile.enforcement_action_opened",
      "user_profile.enforcement_action_resolved"
    ]
  }'
```

The response is the new endpoint plus its `signing_secret`. Event payload:

```json
{
  "type": "event",
  "id": "whe_4f2a9c1e7b3d5a8f0e6c2b9d1a7f3e5c",
  "created_at": "2026-10-15T17:02:41Z",
  "data": {
    "type": "user_profile.enforcement_action_opened",
    "id": "uprof_011CZkZCu8hGbp5mYRQgUmz9",
    "enforcement_action_id": "enac_011CZkZEq4TnWb7xLfRgPm2v",
    "organization_id": "org_011CZkZBj9RsYd3wNcHvKq6t"
  }
}
```

## Options / Props

### Event types

| Event | Trigger |
|-------|---------|
| `user_profile.enforcement_action_opened` | Anthropic opens an enforcement action on a user profile |
| `user_profile.enforcement_action_resolved` | An enforcement action ends: Anthropic resolves it, or its `expires_at` time passes |

### Endpoint fields

| Name | Type | Description |
|------|------|-------------|
| id | string | Starts with `wep_`. Set by Anthropic |
| url | string | Where events are sent. HTTPS on port 443, public domain name (not an IP address). Two enabled endpoints cannot share a URL |
| enabled_events | array of strings | Event types received. A create request must list at least one |
| name | string | Optional label |
| description | string | Optional description |
| state | string | `enabled` or `disabled` |
| disabled_reason | string | Why Anthropic disabled the endpoint; empty otherwise |
| created_at | string | Set by Anthropic |
| updated_at | string | Set by Anthropic |
| signing_secret | string | `whsec_`-prefixed. Only in responses that create the endpoint or replace the secret |

### Manage endpoints

| Task | Request |
|------|---------|
| List | `GET /v1/organizations/webhooks` |
| Create | `POST /v1/organizations/webhooks` |
| Get | `GET /v1/organizations/webhooks/{webhook_endpoint_id}` |
| Update `url`, `name`, `description`, `enabled_events`, or `state` | `POST /v1/organizations/webhooks/{webhook_endpoint_id}` |
| Delete | `DELETE /v1/organizations/webhooks/{webhook_endpoint_id}` |
| Replace signing secret | `POST /v1/organizations/webhooks/{webhook_endpoint_id}/regenerate_signing_secret` |

### Delivery headers

| Header | Description |
|--------|-------------|
| `webhook-id` | Same value as the event `id`; deduplicate on it |
| `webhook-timestamp` | Standard Webhooks header |
| `webhook-signature` | Verify with the endpoint's signing secret using any Standard Webhooks library |

## Notes

- Beta (`webhooks-2026-10-07`); Claude API only.
- Event delivery isn't live: Anthropic doesn't send the two events, so a registered endpoint receives nothing yet. You can register endpoints and build your handler from the event format.
- Any member can list and view endpoints; only admin, owner, or primary owner roles can create, change, delete, or replace the signing secret.
- Requires an organization on the Claude API with organization webhooks turned on and without HIPAA readiness. Credentials: an Admin API key, an OAuth bearer token with the `org:admin` scope, or a personal or service account key not scoped to a workspace.
- Events carry IDs only, not the action or profile: `data.id` is the profile ID and `data.enforcement_action_id` starts with `enac_`. Retrieve the profile with `GET /v1/user_profiles/{id}` to see `enforcement_actions` (each with `type` `restriction` or `ban`, `id`, `reason`, `opened_at`, `expires_at` or `null`) and `enforcement_status` (`banned`, `restricted`, `unrestricted`; treat any other value as `restricted`). Events might arrive late or out of order; use the profile's current state.
- Requests whose `anthropic-beta` header has `user-profiles-2026-09-04` or an earlier value omit `enforcement_status` / `enforcement_actions`, and the `enforcement_status[]` list filter returns `400`.
- Actions opened before event delivery was turned on, or before you registered, produce no `opened` event; list profiles with `enforcement_status[]=restricted` and `enforcement_status[]=banned` (keep paging until `next_page` is `null`). Deleting a profile ends its open actions without a `user_profile.enforcement_action_resolved` event.
- Deliveries follow Standard Webhooks. Return any `2xx` within 5 seconds. Duplicates are possible. Failed deliveries are retried a few times over the next few minutes, then dropped.
- Anthropic disables an endpoint when it returns a redirect (`3xx`), its URL resolves to a non-public IP address, or deliveries keep failing; events for a disabled endpoint are skipped and not sent later. Re-enable with `"state": "enabled"` in an update.
- In an update, `enabled_events` replaces the whole list; an empty list does not clear it. To stop deliveries send `"state": "disabled"` or delete the endpoint.
- Regenerating the signing secret invalidates the old one at once, including for retries of earlier events.
- Up to 32 endpoints per organization (disabled ones count). List returns 20 by default, `limit` up to 100; if `has_more` is `true`, pass `last_id` as `after_id`.
- Errors: `400` (bad `url`, no event types on create, no default workspace, default workspace uses a customer-managed encryption key, more than 32 endpoints, unaccepted event type); `403` (role lacks the permission); `404` (missing beta header, feature not turned on, HIPAA readiness enabled, unaccepted credential kind, unknown `webhook_endpoint_id`); `409` (two enabled endpoints would share a URL, or concurrent change; retry).
- Source: https://platform.claude.com/docs/en/manage-claude/organization-webhooks (retrieved 2026-11-14)

## Related

- [webhooks.md](../endpoints-admin/webhooks.md)
- [admin-api-keys.md](./admin-api-keys.md)
- [admin-api.md](./admin-api.md)

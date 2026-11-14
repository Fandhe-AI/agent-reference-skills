<!-- source: https://platform.claude.com/docs/en/api/beta/organization/webhooks/create, https://platform.claude.com/docs/en/api/beta/organization/webhooks/list, https://platform.claude.com/docs/en/api/beta/organization/webhooks/retrieve, https://platform.claude.com/docs/en/api/beta/organization/webhooks/update, https://platform.claude.com/docs/en/api/beta/organization/webhooks/delete, https://platform.claude.com/docs/en/api/beta/organization/webhooks/regenerate_signing_secret, https://platform.claude.com/docs/en/api/beta/webhooks / last verified: 2026-11-14 -->

# Organization Webhook Endpoints Admin API (beta)

Manage organization-level webhook endpoints (endpoints that belong to the organization rather than to one of its workspaces): create, list, get, update, delete, and replace the signing secret. Also summarizes the webhook event payload domain types.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/organizations/webhooks` | Create Organization Webhook Endpoint (response includes `signing_secret`) |
| GET | `/v1/organizations/webhooks` | List Organization Webhook Endpoints |
| GET | `/v1/organizations/webhooks/{webhook_endpoint_id}` | Get Organization Webhook Endpoint |
| POST | `/v1/organizations/webhooks/{webhook_endpoint_id}` | Update Organization Webhook Endpoint |
| DELETE | `/v1/organizations/webhooks/{webhook_endpoint_id}` | Delete Organization Webhook Endpoint |
| POST | `/v1/organizations/webhooks/{webhook_endpoint_id}/regenerate_signing_secret` | Regenerate Organization Webhook Endpoint Signing Secret |

Adapted (not in the official docs): `url` is a valid HTTPS example URL (the official example sends `"x"`, which the validation rules reject).

```bash
curl https://api.anthropic.com/v1/organizations/webhooks \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2026-10-21' \
    -H 'anthropic-beta: webhooks-2026-10-07' \
    -H "Authorization: Bearer $ANTHROPIC_API_KEY" \
    -d '{
          "enabled_events": [
            "user_profile.enforcement_action_opened"
          ],
          "url": "https://example.com/anthropic-webhooks"
        }'
```

Response (200):

```json
{
  "id": "id",
  "created_at": "2019-12-27T18:11:19.117Z",
  "description": "description",
  "disabled_reason": "disabled_reason",
  "enabled_events": [
    "user_profile.enforcement_action_opened"
  ],
  "name": "name",
  "signing_secret": "signing_secret",
  "state": "disabled",
  "updated_at": "2019-12-27T18:11:19.117Z",
  "url": "url"
}
```

## Options / Props

### Headers (all endpoints)

| Name | Type | Description |
|------|------|-------------|
| anthropic-version | optional string | Claude API version |
| anthropic-beta | array of AnthropicBeta | Must include `webhooks-2026-10-07`; without it requests return `404` |

### Create body parameters

| Name | Type | Description |
|------|------|-------------|
| enabled_events | array of event type | Event types to deliver. Must list at least one. Values: `user_profile.enforcement_action_opened`, `user_profile.enforcement_action_resolved`, `user_profile.program_status_updated` |
| url | string | HTTPS URL deliveries are sent to (minLength 1) |
| description | optional string | Notes about the endpoint |
| name | optional string | Short label |

### Update body parameters (all optional)

| Name | Type | Description |
|------|------|-------------|
| description | string | Notes about the endpoint |
| enabled_events | array of event type | Replaces the whole set; an empty list leaves it unchanged |
| name | string | Short label |
| state | `"disabled"` \| `"enabled"` | `disabled` stops deliveries; `enabled` resumes them and clears `disabled_reason`. Events while disabled are never delivered |
| url | string | HTTPS URL (minLength 1) |

### List query parameters

| Name | Type | Description |
|------|------|-------------|
| after_id | optional string | Cursor: page immediately after this object |
| before_id | optional string | Cursor: the first `limit` endpoints that come before it in list order |
| limit | optional number | Per page, max `100`; default `0` means `20` (minimum 0) |
| order | `"asc"` \| `"desc"` | Sort by `created_at`; default `desc` |

List response: `data` (array of endpoint), `has_more` (boolean), `first_id`, `last_id` (optional string or null).

### Endpoint object (BetaOrganizationWebhookEndpoint)

| Name | Type | Description |
|------|------|-------------|
| id | string | ID of the webhook endpoint |
| created_at | string (date-time) | RFC 3339 |
| updated_at | string (date-time) | RFC 3339 |
| description | string | Empty string when none given |
| name | string | Empty string when none given |
| disabled_reason | string | Why Anthropic disabled it automatically; empty when enabled or when you disabled it |
| enabled_events | array | Event types delivered |
| state | `"disabled"` \| `"enabled"` | Whether deliveries are sent |
| url | string | HTTPS delivery URL |
| signing_secret | string | Only on the create response (`BetaNewOrganizationWebhookEndpoint`); prefix `whsec_` |

Delete returns `{"id": "id", "type": "webhook_endpoint_deleted"}`. Regenerate returns `{"signing_secret": "signing_secret"}`.

### Webhook event types (domain types)

Event payload (`BetaWebhookEvent`): `type` (`"event"`), `id` (unique event identifier for idempotency), `created_at` (RFC 3339), `data` (union below). Each `data` object has `type`, `id` (ID of the resource that triggered the event), `organization_id`, and (for non-user-profile types) `workspace_id`; `session.thread_*` types carry extra thread fields.

| Group | `data.type` values |
|-------|--------------------|
| agent | `agent.archived`, `agent.created`, `agent.deleted`, `agent.updated` |
| deployment | `deployment.archived`, `deployment.created`, `deployment.deleted`, `deployment.paused`, `deployment.unpaused`, `deployment.updated` |
| deployment run | `deployment_run.failed`, `deployment_run.started`, `deployment_run.succeeded` |
| environment | `environment.archived`, `environment.created`, `environment.deleted`, `environment.updated` |
| memory store | `memory_store.archived`, `memory_store.created`, `memory_store.deleted` |
| session | `session.archived`, `session.budget_reached`, `session.created`, `session.deleted`, `session.idled`, `session.outcome_evaluation_ended`, `session.pending`, `session.requires_action`, `session.running`, `session.status_idled`, `session.status_rescheduled`, `session.status_run_started`, `session.status_terminated`, `session.thread_created`, `session.thread_idled`, `session.thread_terminated`, `session.updated` |
| user profile | `user_profile.enforcement_action_opened`, `user_profile.enforcement_action_resolved`, `user_profile.program_status_updated` |
| vault | `vault.archived`, `vault.created`, `vault.deleted` |
| vault credential | `vault_credential.archived`, `vault_credential.created`, `vault_credential.deleted`, `vault_credential.refresh_failed` |

`user_profile.*` data objects: `type`, `id` (user profile ID), `organization_id`; the two enforcement types also carry `enforcement_action_id` (`enac_...`).

## Notes

- Adapted from the official docs: the create example `url` is an HTTPS example URL instead of the official `"x"`, which fails the HTTPS URL requirement.
- Beta; every request must include `anthropic-beta: webhooks-2026-10-07`. A request without it returns `404`, exactly as if the API did not exist. Anthropic turns organization webhook endpoints on per organization; until then requests also return `404`. Not available to organizations with HIPAA readiness enabled.
- The `enabled_events` enum on these endpoints lists three values (including `user_profile.program_status_updated`), while the organization-webhooks guide describes two event types (`user_profile.enforcement_action_opened` / `user_profile.enforcement_action_resolved`) and says other types are rejected with `400`. The two official pages differ; the guide's two are the documented accepted types.
- The full `data.type` list above comes from the shared webhook event domain types page, which also covers workspace-level events such as sessions, vaults, and agents; only the `user_profile.*` types are documented for organization endpoints.
- The signing secret is returned only on create and regenerate; after regenerate, deliveries are signed with the new secret from then on.
- Source: https://platform.claude.com/docs/en/api/beta/organization/webhooks/create (and sibling list / retrieve / update / delete / regenerate_signing_secret pages), https://platform.claude.com/docs/en/api/beta/webhooks (retrieved 2026-11-14)

## Related

- [organization-webhooks.md](../admin-api/organization-webhooks.md)

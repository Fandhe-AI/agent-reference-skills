<!-- source: https://platform.claude.com/docs/en/manage-claude/claude-tag-api / last verified: 2026-11-14 -->

# Claude Tag API (Claude Enterprise, beta)

Read and change, from your own systems, the Claude Tag settings (Claude working as a teammate in Slack) that an organization owner otherwise sets in claude.ai > Organization settings > Claude Tag: Slack channels and workspaces, which settings apply and why, and Access bundles. 14 endpoints across four resources (Slack channels, Slack workspaces, Bundles, Bundle targets).

## Signature / Usage

Every request needs `x-api-key` (scoped Admin API key), `anthropic-version: 2026-10-21`, and `anthropic-beta: experimental-claude-tag-2026-10-21`. List the organization's Slack workspaces:

```bash
curl "https://api.anthropic.com/v1/organizations/claude_tag/slack_workspaces" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2026-10-21" \
  -H "anthropic-beta: experimental-claude-tag-2026-10-21"
```

Set a channel up (idempotent; returns `200` whether or not it already existed):

```bash
curl -X POST "https://api.anthropic.com/v1/organizations/claude_tag/slack_channels" \
  -H "content-type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2026-10-21" \
  -H "anthropic-beta: experimental-claude-tag-2026-10-21" \
  -d '{
    "slack": {"workspace_id": "T01ABCD2EFG", "channel_id": "C05HJKL6MNP"},
    "settings": {"instructions": "Answer in the language of the question."}
  }'
```

CLI equivalent: `ant beta:organization:claude-tag:slack-workspaces list`. SDKs: `client.beta.organization.claude_tag` (TypeScript `claudeTag`).

## Options / Props

Endpoints (per-endpoint detail in `claude-tag.md`):

| Resource | Endpoints |
|----------|-----------|
| Slack channels | `POST` / `GET` `/v1/organizations/claude_tag/slack_channels`; `GET` / `POST` / `DELETE` `.../slack_channels/{id}` |
| Slack workspaces | `GET /v1/organizations/claude_tag/slack_workspaces`; `GET` / `POST` `.../slack_workspaces/{id}` |
| Bundles | `GET /v1/organizations/claude_tag/bundles`; `GET .../bundles/{bundle_id}` (read-only) |
| Bundle targets | `GET` / `POST` `.../bundles/{bundle_id}/targets`; `GET` / `DELETE` `.../bundles/{bundle_id}/targets/{target_id}` |

Scopes: `read:claude_tag` grants every `GET`; `write:claude_tag` grants every `POST` and `DELETE` (no reads). A key can carry both.

Settings (same five at each level; all optional):

| Setting | Type | Description |
|---------|------|-------------|
| `enabled` | boolean | Whether Claude is on |
| `instructions` | string | At most 8,192 characters after trimming; blank text clears it |
| `model` | string | Model ID for new sessions; at most 128 characters |
| `environment_id` | string | Active environment (`env_`) or self-hosted runner pool usable by every member (`ccpool_`) |
| `guest_policy` | object | `{"type": "allow"}`, `{"type": "restrict"}`, or `{"type": "channel_only"}` (`400` if `channel_only` is unavailable to the org) |

Resolution when no level sets a value: `enabled` `true`, `instructions` `null`, `model` `null`, `environment_id` `null`, `guest_policy` `restrict`. `enabled` / `model` / `environment_id` / `guest_policy`: nearest level wins. `instructions`: additive, broadest first, joined by a blank line.

ID prefixes:

| Prefix | Resource |
|--------|----------|
| `slch_` | Slack channel resource |
| `slws_` | Slack workspace resource |
| `capp_` | Bundle |
| `btgt_` | Bundle target |
| `T` (or `E` for a Grid) | Slack's own workspace ID |
| `C` or `G` | Slack's own channel ID |

Source `type` values: `slack_channel`, `slack_workspace`, `slack_parent_channel`, `slack_grid_channel`, `slack_default`, `default`.

Rate limits (per organization, shared by all keys, separate from other Admin API limits):

| Budget | Requests | Burst | Refill |
|--------|----------|-------|--------|
| Reads | Every `GET` | 120 | 2 per second |
| Changes | Every `POST` and `DELETE` | 60 | 1 per second |

Pagination: opaque `next_page` cursor passed as `page`; `limit` default 20, min 1, max 100; newest first by `created_at`, no other order.

Activity Feed events (`api_actor`): `ccr_agent_created` (channel set up), `ccr_agent_updated` (setting changed), `ccr_agent_deleted` (channel removed), `ccr_agent_proxy_profile_bound` (Bundle attached), `ccr_agent_proxy_profile_unbound` (Bundle detached).

## Notes

- Beta, Claude Enterprise organizations only; not available to Claude Platform (Claude Console) organizations. Requests without the beta header return `404`, as if the endpoint did not exist.
- Claude Tag is Claude in Slack (a claude.ai product). It is distinct from Claude Code and has nothing to do with Claude Platform workspaces or API usage. The `anthropic-workspace-id` header is ignored.
- `slack_channel_id` / `slack_workspace_id` mean Slack's own ID in a query parameter, but the `slch_` / `slws_` ID issued by this API in a request body or response; Slack's own IDs in bodies and responses sit under `slack`.
- `settings` holds what the level stores (`null` = not set). Add `include_inherited=true` to any `GET` that returns a channel or workspace to get what applies; `sources` names the origin of each setting. A `503` is returned if a level cannot be read. Update requests reject the parameter with `400`.
- Changing settings: an omitted setting is unchanged, `null` clears it, requests are all-or-nothing, safe to repeat (no `Idempotency-Key`), last write wins; `409` only when another change overlaps the request.
- A channel can be removed only while Claude is off in it (`400` `slack_channel_enabled`). Removal is irreversible and deletes settings, Bundle targets, sessions and transcripts, memory, routines, and published artifacts; nothing in Slack changes.
- Only set-up channels and workspaces have an `id` and are listed. Group direct messages cannot be set up, changed, or given Bundles (`400`).
- Not covered by the API (stay in claude.ai): connecting or disconnecting Slack, Slack defaults, creating or editing Bundles, spend limits, and every setting other than the five above. API / Terraform read-only mode (set in claude.ai) does not make this API read-only.
- Errors: `400`, `401`, `403`, `404`, `409`, `429`, `500`, `503`. `error.details.error_code` values: `organization_level_scoped_api_key_required`, `api_key_scope_missing`, `claude_tag_writes_not_enabled`, `compliance_configuration_restricted`, `environment_not_found`, `environment_archived`, `runner_pool_restricted`, `slack_channel_set_up_settings_refused`, `slack_channel_set_up_environment_not_found`, `slack_channel_set_up_settings_conflict`, `slack_channel_enabled`. Treat unknown values and new codes like unknown strings.
- Source: https://platform.claude.com/docs/en/manage-claude/claude-tag-api (retrieved 2026-11-14)

## Related

- [claude-tag.md](../endpoints-admin/claude-tag.md)
- [admin-api-keys.md](./admin-api-keys.md)
- [plugins-api.md](./plugins-api.md)

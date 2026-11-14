<!-- source: https://platform.claude.com/docs/en/api/beta/organization/claude_tag/slack_channels/create, https://platform.claude.com/docs/en/api/beta/organization/claude_tag/slack_channels/list, https://platform.claude.com/docs/en/api/beta/organization/claude_tag/slack_channels/retrieve, https://platform.claude.com/docs/en/api/beta/organization/claude_tag/slack_channels/update, https://platform.claude.com/docs/en/api/beta/organization/claude_tag/slack_channels/delete, https://platform.claude.com/docs/en/api/beta/organization/claude_tag/slack_workspaces/list, https://platform.claude.com/docs/en/api/beta/organization/claude_tag/slack_workspaces/retrieve, https://platform.claude.com/docs/en/api/beta/organization/claude_tag/slack_workspaces/update, https://platform.claude.com/docs/en/api/beta/organization/claude_tag/bundles/list, https://platform.claude.com/docs/en/api/beta/organization/claude_tag/bundles/retrieve, https://platform.claude.com/docs/en/api/beta/organization/claude_tag/bundles/targets/list, https://platform.claude.com/docs/en/api/beta/organization/claude_tag/bundles/targets/create, https://platform.claude.com/docs/en/api/beta/organization/claude_tag/bundles/targets/retrieve, https://platform.claude.com/docs/en/api/beta/organization/claude_tag/bundles/targets/delete / last verified: 2026-11-14 -->

# Claude Tag Admin API (beta)

Endpoints of the organization API for Claude Tag (Claude in Slack) for Claude Enterprise organizations: Slack channels, Slack workspaces, Access bundles (read-only), and Bundle targets (attach / detach).

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/organizations/claude_tag/slack_channels` | Set up a Slack channel (returns existing one if already set up) and apply `settings` |
| GET | `/v1/organizations/claude_tag/slack_channels` | List set-up channels of a workspace, or find one by Slack IDs |
| GET | `/v1/organizations/claude_tag/slack_channels/{id}` | Get a channel |
| POST | `/v1/organizations/claude_tag/slack_channels/{id}` | Update a channel's settings |
| DELETE | `/v1/organizations/claude_tag/slack_channels/{id}` | Remove a channel from Claude Tag |
| GET | `/v1/organizations/claude_tag/slack_workspaces` | List set-up workspaces, or find one by Slack ID |
| GET | `/v1/organizations/claude_tag/slack_workspaces/{id}` | Get a workspace |
| POST | `/v1/organizations/claude_tag/slack_workspaces/{id}` | Update a workspace's settings |
| GET | `/v1/organizations/claude_tag/bundles` | List Bundles |
| GET | `/v1/organizations/claude_tag/bundles/{bundle_id}` | Get a Bundle |
| GET | `/v1/organizations/claude_tag/bundles/{bundle_id}/targets` | List a Bundle's targets |
| POST | `/v1/organizations/claude_tag/bundles/{bundle_id}/targets` | Attach a Bundle to a channel or workspace |
| GET | `/v1/organizations/claude_tag/bundles/{bundle_id}/targets/{target_id}` | Get a Bundle target |
| DELETE | `/v1/organizations/claude_tag/bundles/{bundle_id}/targets/{target_id}` | Detach a Bundle |

Update a channel (turn Claude off, other settings unchanged):

```bash
curl -X POST "https://api.anthropic.com/v1/organizations/claude_tag/slack_channels/slch_011CZkZmRt4vNq8sHbYw2KdX" \
  -H "content-type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2026-10-21" \
  -H "anthropic-beta: experimental-claude-tag-2026-10-21" \
  -d '{"settings": {"enabled": false}}'
```

Channel object (response):

```json
{
  "type": "slack_channel",
  "id": "slch_011CZkZmRt4vNq8sHbYw2KdX",
  "slack": {
    "workspace_id": "T01ABCD2EFG",
    "channel_id": "C05HJKL6MNP"
  },
  "settings": {
    "enabled": null,
    "instructions": "Answer in the language of the question.",
    "model": null,
    "environment_id": null,
    "guest_policy": null
  },
  "sources": {
    "enabled": null,
    "instructions": [
      {
        "type": "slack_channel",
        "slack_channel_id": "slch_011CZkZmRt4vNq8sHbYw2KdX"
      }
    ],
    "model": null,
    "environment_id": null,
    "guest_policy": null
  },
  "created_at": "2026-10-19T16:20:05Z",
  "updated_at": "2026-10-19T16:20:05Z"
}
```

Attach a Bundle to a channel:

```bash
curl -X POST "https://api.anthropic.com/v1/organizations/claude_tag/bundles/capp_011CZkZjLP1cWxj5EtMmdgbq/targets" \
  -H "content-type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2026-10-21" \
  -H "anthropic-beta: experimental-claude-tag-2026-10-21" \
  -d '{
    "type": "slack_channel",
    "slack_channel_id": "slch_011CZkZmRt4vNq8sHbYw2KdX"
  }'
```

Detach responds with `{"type": "bundle_target_deleted", "id": "btgt_..."}`; channel removal responds with `{"type": "slack_channel_deleted", "id": "slch_..."}`.

## Options / Props

### Headers (all endpoints)

| Name | Type | Description |
|------|------|-------------|
| x-api-key | string | Admin API key with `read:claude_tag` (`GET`) or `write:claude_tag` (`POST` / `DELETE`) |
| anthropic-version | string | `2026-10-21` |
| anthropic-beta | string | `experimental-claude-tag-2026-10-21`; without it requests return `404` |

### Request fields

| Endpoint | Name | Type | Description |
|----------|------|------|-------------|
| Create channel | `slack` | `{workspace_id, channel_id}` | Required; Slack's own IDs |
| Create channel | `settings` | optional object | `enabled`, `instructions`, `model`, `environment_id`, `guest_policy` |
| Update channel / workspace | `settings` | object | Required; omitted setting unchanged, `null` clears |
| List channels | `slack_workspace_id` | string (query) | Required; Slack's own workspace ID |
| List channels | `slack_channel_id` | optional string (query) | Slack's own channel ID; look-up mode, ignores `page` |
| List workspaces | `slack_workspace_id` | optional string (query) | Find one workspace by Slack's own ID |
| All GETs returning channels / workspaces | `include_inherited` | optional boolean (query) | Default `false`; `true` returns what applies in it |
| All lists | `limit` | optional number (query) | Default 20, 1 to 100 |
| All lists | `page` | optional string (query) | Opaque cursor from `next_page` |
| Attach Bundle | `type` | `slack_channel` \| `slack_workspace` | Target kind |
| Attach Bundle | `slack_channel_id` / `slack_workspace_id` | string | The `slch_` / `slws_` `id` matching `type` |

### Objects

| Object | Fields |
|--------|--------|
| Channel | `type` (`slack_channel`), `id` (`slch_`), `slack` (`workspace_id`, `channel_id`), `settings`, `sources`, `created_at`, `updated_at` |
| Workspace | `type` (`slack_workspace`), `id` (`slws_`), `slack` (`workspace_id` only), `settings`, `sources`, `created_at`, `updated_at` |
| Bundle | `type` (`bundle`), `id` (`capp_`), `display_name`, `description` (`null` if none), `created_at`, `updated_at` |
| Bundle target | `type` (`slack_channel` or `slack_workspace`), `id` (`btgt_`), `slack_channel_id` or `slack_workspace_id`, `created_at` |
| List response | `data` (array), `next_page` (cursor or `null`) |

## Notes

- Beta, Claude Enterprise organizations only. Claude Tag is Claude in Slack (a claude.ai product); it is distinct from Claude Code. Uses a scoped Admin API key belonging to the organization as a whole.
- Writes: `POST` / `DELETE` need `write:claude_tag`; reads need `read:claude_tag`. Setup and update responses hold what is stored, not inherited values.
- Create channel: Slack must confirm the channel is in the workspace, not archived, and visible to Claude's Slack app, else `404`. If the channel is set up but `settings` is then refused, the error carries an `error_code` starting `slack_channel_set_up_` and `error.details.slack_channel_id`.
- Listing a workspace's channels: a page can hold fewer than `limit` items (or none) while `next_page` is set; page until `next_page` is `null`.
- Delete channel: allowed only while `enabled` resolves to `false` (`400` `slack_channel_enabled`), except for organizations with a restricted compliance configuration. The `id` returns `404` immediately after the request; the rest is deleted in the background.
- Bundles are read-only here and never return what a Bundle grants. Attaching requires the channel or workspace to be set up already; attaching an existing pair returns `200` with the existing target. Conditions on channel attachments are set in claude.ai; attaching here uses defaults. The Bundle claude.ai attaches for an on-call setup cannot be attached or detached here (`400`).
- A repeated `DELETE` returns `404`; after a `503`, a `404` on a resent `DELETE` means it is already gone.
- Rate limits: reads burst 120 refilling 2 per second; changes burst 60 refilling 1 per second; over budget returns `429` with `retry-after`.
- Source: https://platform.claude.com/docs/en/manage-claude/claude-tag-api and the per-endpoint pages listed in the first line (retrieved 2026-11-14)

## Related

- [claude-tag-api.md](../admin-api/claude-tag-api.md)
- [compliance-settings.md](./compliance-settings.md)

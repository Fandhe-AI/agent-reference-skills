<!-- source: https://platform.claude.com/docs/en/api/organization/rate_limits, https://platform.claude.com/docs/en/api/organization/rate_limits/list / last verified: 2026-10-16 -->

# Rate Limits Admin API

List Messages API rate limits for an organization. For per-workspace overrides, see `workspaces.md`.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/organizations/rate_limits` | List Organization Rate Limits |

```http
curl https://api.anthropic.com/v1/organizations/rate_limits \
    -H 'anthropic-version: 2023-06-01' \
    -H "Authorization: Bearer $ANTHROPIC_OAUTH_TOKEN"
```

## Options / Props

### Query Parameters

| Name | Type | Description |
|------|------|-------------|
| group_type | optional `"batch"` \| `"files"` \| `"model_group"` \| `"skills"` \| `"token_count"` \| `"web_search"` | Filter by group type |
| model | optional string | Filter to entry containing this model (name or alias). 404 if not found |
| page | optional string | `next_page` cursor from previous response |

### Returns

| Name | Type | Description |
|------|------|-------------|
| data | array of `{ type: "rate_limit", id, group, limits, models, group_type }` | One entry per rate-limit group |
| data[].id | string | Entry ID; stable within the organization, differs between organizations (the group's own ID is `group.id`) |
| data[].group | discriminated union by `type` | `ModelGroup { type: "model_group", id, display_name }`, `BatchGroup { type: "batch", id }`, `TokenCountGroup { type: "token_count", id }`, `FilesGroup { type: "files", id }`, `SkillsGroup { type: "skills", id }`, `WebSearchGroup { type: "web_search", id }`. `group.id` is an opaque ID (e.g. `rlg_...`) identical across organizations |
| data[].limits | array of `{ type, value }` | Limiter type (e.g. `requests_per_minute`, `input_tokens_per_minute`) and configured value |
| data[].models | array of string or null | Model names/aliases this entry applies to; null when `group_type` is not `model_group` |
| data[].group_type | `"batch"` \| `"files"` \| `"model_group"` \| `"skills"` \| `"token_count"` \| `"web_search"` | Deprecated: use `group.type`; always equal to it |
| next_page | string or null | Token for next page |

## Notes

- Requires an Admin API key (`sk-ant-admin...`).
- The response field `group_type` is deprecated in favor of `group.type` (always the same value; no removal date given). The `group_type` query parameter is not deprecated.
- When `limit` is omitted, every matching entry is returned in a single page (`next_page` null).
- Each entry represents the org-wide limit for a group; workspace-level overrides are listed separately via `GET /v1/organizations/workspaces/{workspace_id}/rate_limits` (see `workspaces.md`).

## Related

- [workspaces.md](./workspaces.md)
- [spend-limits.md](./spend-limits.md)

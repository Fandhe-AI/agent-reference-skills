<!-- source: https://platform.claude.com/docs/en/api/admin/rate_limits, https://platform.claude.com/docs/en/api/admin/rate_limits/list / last verified: 2026-08-07 -->

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
| data | array of `{ id, group_type, limits, models, type }` | One entry per rate-limit group |
| data[].limits | array of `{ type, value }` | Limiter type (e.g. `requests_per_minute`, `input_tokens_per_minute`) and configured value |
| data[].models | array of string | Model names/aliases this entry applies to; null when not `model_group` |
| data[].type | `"rate_limit"` | Object type |
| next_page | string | Token for next page |

## Notes

- Requires an Admin API key (`sk-ant-admin...`).
- Each entry represents the org-wide limit for a group; workspace-level overrides are listed separately via `GET /v1/organizations/workspaces/{workspace_id}/rate_limits` (see `workspaces.md`).

## Related

- workspaces.md
- spend-limits.md

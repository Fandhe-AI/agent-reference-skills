<!-- source: https://platform.claude.com/docs/en/manage-claude/rate-limits-api / last verified: 2026-08-07 -->

# Rate Limits API

Programmatically query your organization's API rate limits with the Rate Limits API.

## Signature / Usage

```bash
curl "https://api.anthropic.com/v1/organizations/rate_limits" \
  --header "anthropic-version: 2023-06-01" \
  --header "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `/v1/organizations/rate_limits` | endpoint | Organization-level limits; supports `model=` lookup and `group_type=` filter |
| `/v1/organizations/workspaces/{workspace_id}/rate_limits` | endpoint | Workspace overrides only; missing entries are inherited from the organization |
| `group_type` | param | `model_group`, `batch`, `token_count`, `files`, `skills`, `web_search` |
| `models` | field | For `model_group` entries, every model ID/alias counting against that group; `null` for other group types |
| `limits[]` | field | List of `{type, value}` pairs, e.g. `requests_per_minute`, `input_tokens_per_minute`, `output_tokens_per_minute` |
| `org_limit` | field | On workspace responses, the organization-level value for the same limiter (or `null`) |

## Notes

- Read-only: rate limits cannot be updated through this API; set workspace overrides in Claude Console's Limits tab
- The Default Workspace cannot have overrides and has no entry on the workspace endpoint; read its limits via the organization endpoint
- `model` query parameter is supported on the organization endpoint only, not the workspace endpoint
- Responses are currently always a single page (`next_page: null`); loop on it for forward compatibility
- Covers Messages API and supporting resources only; does not include Claude Managed Agents limits

## Related

- [usage-cost-api](./usage-cost-api.md)
- [workspaces](../admin-api/workspaces.md)
- [admin-api](../admin-api/admin-api.md)

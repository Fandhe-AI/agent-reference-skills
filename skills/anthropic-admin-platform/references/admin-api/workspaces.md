<!-- source: https://platform.claude.com/docs/en/manage-claude/workspaces / last verified: 2026-08-07 -->

# Workspaces

Organize API keys, manage team access, and control costs with workspaces.

## Signature / Usage

```bash
# Create a workspace
curl -X POST "https://api.anthropic.com/v1/organizations/workspaces" \
  -H "anthropic-version: 2023-06-01" \
  -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
  -d '{"name": "Production"}'

# List workspaces
curl "https://api.anthropic.com/v1/organizations/workspaces?limit=10&include_archived=false" \
  -H "anthropic-version: 2023-06-01" \
  -H "x-api-key: $ANTHROPIC_ADMIN_KEY"

# Archive a workspace
curl -X POST "https://api.anthropic.com/v1/organizations/workspaces/{workspace_id}/archive" \
  -H "anthropic-version: 2023-06-01" \
  -H "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Workspace User | role | Use the Anthropic Workbench only |
| Workspace Limited Developer | role | Create/manage API keys, use the API; no session tracing or file download |
| Workspace Developer | role | Create/manage API keys, use the API |
| Workspace Admin | role | Full control over workspace settings and members |
| Workspace Billing | role | View billing info; inherited from organization billing role, cannot be manually assigned |
| Default Workspace | concept | Cannot be renamed, archived, or deleted; has no ID; not returned by list endpoints |
| Claude Code workspace | concept | Auto-created on first Claude Code sign-in; per-user keys; archiving disables Claude Code sign-in org-wide |

## Notes

- `wrkspc_` prefix; maximum 100 workspaces per organization (archived workspaces don't count)
- API keys are scoped to a single workspace and can only access resources within it (Files, Message Batches, Skills)
- MCP tunnels are managed with a `workspace:manage_tunnels` OAuth token via Workload Identity Federation, not a workspace API key
- Workspace limits can only be set lower than organization limits; organization-wide limits always apply even if workspace limits sum higher
- Archiving a workspace immediately and irreversibly revokes all its API keys
- Usage/costs attributed to the Default Workspace show `workspace_id: null`

## Related

- [admin-api](./admin-api.md)
- [rate-limits-api](../usage-cost/rate-limits-api.md)
- [usage-cost-api](../usage-cost/usage-cost-api.md)

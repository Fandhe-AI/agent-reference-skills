<!-- source: https://platform.claude.com/docs/en/manage-claude/compliance-org-data / last verified: 2026-08-07 -->

# List organizations, users, roles, groups, and settings

Enumerate linked organizations, users, roles, RBAC/SCIM groups, and each organization's effective settings through the Compliance API. Required scope: `read:compliance_org_data` (user and group-member endpoints require `read:compliance_user_data` instead); Compliance Access Key only.

## Signature / Usage

```bash
# List organizations under the parent
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/organizations" \
  -H "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"

# Get effective settings for one organization
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/organizations/$org_uuid/settings" \
  -H "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

## Options / Props

| Endpoint | Scope | Notes |
| --- | --- | --- |
| List organizations | `read:compliance_org_data` | Sorted by `created_at` ascending |
| List organization users | `read:compliance_user_data` | Sorted by org join date ascending |
| List roles / Get role | `read:compliance_org_data` | RBAC role records |
| List groups / Get group | `read:compliance_org_data` | `source_type`: `direct` (manual) or `scim` (synced) |
| List group members | `read:compliance_user_data` | Members of one group |
| Get effective organization settings | `read:compliance_org_data` | Enforced state after regulatory/feature rules applied |

## Notes

- `uuid` (organization) is the canonical identifier; it differs in prefix form from `organization_id` seen on Activity Feed/chat/project records (`org_`-prefixed there, bare UUID in the settings response).
- Directory endpoints paginate with `page`/`next_page` token, not `after_id`/`before_id`.
- The `read:compliance_org_settings` scope was retired June 30, 2026; use `read:compliance_org_data` for the effective-settings endpoint instead.
- Settings response omits rows the organization's admins cannot control (Anthropic policy or unavailable); a missing row means "not controllable", not "off". `api_keys` array lists every Compliance Access Key for the parent, including deactivated ones.
- A removed user disappears from the users list immediately, but historical activity remains queryable via the Activity Feed for the full retention window.

## Related

- [compliance-api.md](./compliance-api.md)
- [compliance-activity-feed.md](./compliance-activity-feed.md)
- [compliance-content-data.md](./compliance-content-data.md)
- [compliance-errors.md](./compliance-errors.md)

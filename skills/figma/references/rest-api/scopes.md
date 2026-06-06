# Scopes

Permission scopes that restrict what resources an OAuth 2 access token or personal access token can access.

## Signature / Usage

Scopes are specified during token creation or OAuth authorization:

```
scope=file_content:read file_comments:read
```

## Options / Props

| Scope | Description | Plan |
|-------|-------------|------|
| `current_user:read` | Read name, email, and profile image | Any |
| `file_content:read` | Read file contents (nodes, editor type) | Any |
| `file_metadata:read` | Read file metadata | Any |
| `file_comments:read` | Read comments for files | Any |
| `file_comments:write` | Post and delete comments and reactions | Any |
| `file_versions:read` | Read version history | Any |
| `file_dev_resources:read` | Read dev resources | Any |
| `file_dev_resources:write` | Write dev resources | Any |
| `file_variables:read` | Read variables and collections | Enterprise |
| `file_variables:write` | Write variables and collections | Enterprise |
| `library_content:read` | Read published components and styles | Any |
| `library_assets:read` | Read individual published components/styles | Any |
| `library_analytics:read` | Design system analytics | Enterprise |
| `team_library_content:read` | Team-level library access | Any |
| `projects:read` | List projects and files | Any |
| `project_metadata:read` | Read project metadata | Any |
| `webhooks:read` | Read webhook metadata | Any |
| `webhooks:write` | Create and manage webhooks | Any |
| `selections:read` | Read most recent selection in files | Any |
| `org:activity_log_read` | Organization activity logs | Enterprise (admin) |
| `org:developer_log_read` | Developer logs | Enterprise + Governance+ (admin) |
| `org:discovery_read` | Text event data | Enterprise + Governance+ (admin) |
| `files:read` | Deprecated broad access scope | Any |

## Notes

- Scopes do not override organizational permissions; access is still limited to files shared with or created by you
- `files:read` is deprecated; prefer specific read scopes instead
- Enterprise-only scopes require the user to be a full seat member or administrator

## Related

- [Authentication](./authentication.md)
- [OAuth Apps](./oauth-apps.md)
- [Personal Access Tokens](./personal-access-tokens.md)

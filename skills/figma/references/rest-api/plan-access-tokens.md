# Plan Access Tokens

Organization-scoped API tokens not tied to individual user accounts. Managed by plan administrators; suited for CI/CD and org-level automation. Currently in beta.

## Signature / Usage

```http
GET https://api.figma.com/v1/files/:key
X-Figma-Token: <plan-access-token>
```

Tokens are created at [figma.com/developers/tokens](https://www.figma.com/developers/tokens) by plan administrators.

## Options / Props

| Setting | Description |
|---------|-------------|
| Expiration | Up to 365 days; refreshable (previous secret valid for 24 h after refresh) |
| Scopes | Selected at creation; same scope list as personal access tokens |
| Resource allowlist | Can be restricted to specific files, projects, teams, or workspaces |
| Plans | Organization and Enterprise only |

## Notes

- Not supported endpoints/scopes: `file_code_connect:write`, `file_variables:write`, `file_comments:write`, `GET /v1/me`, `GET /v1/oembed`
- MFA is required during token creation
- The token secret is shown only once — save it immediately
- Revoking a token takes effect immediately
- Rate limits apply per token (not per user)

## Related

- [Authentication](./authentication.md)
- [Personal Access Tokens](./personal-access-tokens.md)
- [Scopes](./scopes.md)

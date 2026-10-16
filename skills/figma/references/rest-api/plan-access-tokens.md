# Plan Access Tokens

Plan-scoped API tokens not tied to individual user accounts. Managed by plan administrators; suited for CI/CD and org-level automation. Generally available since 2026-07-23.

## Signature / Usage

```http
GET https://api.figma.com/v1/files/:key
X-Figma-Token: <plan-access-token>
```

Tokens are created at [figma.com/developers/tokens](https://www.figma.com/developers/tokens) by organization administrators. The page has tabs for three token categories: REST API (default), npm registry, and Figma CLI.

## Options / Props

| Setting | Description |
|---------|-------------|
| Category | REST API, npm registry, or Figma CLI (tabs on the developer hub) |
| Expiration | Up to 365 days; refreshable for all three categories (previous secret valid for 24 h after refresh) |
| Scopes | REST API tokens: selected at creation (same scope list as personal access tokens). Figma CLI tokens: fixed scope set for supported Figma CLI workflows (Code Connect, codebase uploads); no scope selection |
| Resource allowlist | REST API tokens: All resources, or Only selected resources (links to files, folders, teams, and workspaces). Figma CLI tokens: plan-wide authorization, no resource selection |
| Plans | Organization and Enterprise |

## Notes

- Not supported for REST API tokens: endpoints requiring `file_code_connect:write`, `file_variables:write`, or `file_comments:write`, and `GET /v1/me` and `GET /v1/oembed`. Figma CLI tokens are not general-purpose REST API tokens
- Creating a token requires multi-factor authentication (the administrator needs Figma 2FA unless the organization requires SSO login)
- The token secret is shown only once; store it immediately in a password vault or secrets manager
- Editable after creation: name and description (REST API tokens also scopes and resources); the token id can be viewed but not the secret
- Refresh: the new expiration is calculated from the current date, extended by the original token lifetime
- Revoking a token takes effect immediately and cannot be undone
- Rate limits apply per token (not per user)
- Figma reserves the right to change how plan access tokens are supported, which may affect pricing and usage; Figma will provide notice before pricing changes
- Compared with personal access tokens: tied to a plan rather than a user, limited to resources in the plan (and optionally an allowlist), maximum expiration of 1 year (PAT: 90 days)

## Related

- [Authentication](./authentication.md)
- [Personal Access Tokens](./personal-access-tokens.md)
- [Scopes](./scopes.md)

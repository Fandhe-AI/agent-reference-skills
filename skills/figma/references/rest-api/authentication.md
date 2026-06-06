# Authentication

Overview of Figma REST API authentication methods: OAuth apps, plan access tokens, and personal access tokens.

## Signature / Usage

All API requests must include authentication credentials. Three methods are supported:

**Personal Access Token**
```http
X-Figma-Token: <your-personal-access-token>
```

**OAuth 2 Bearer Token**
```http
Authorization: Bearer <access-token>
```

**Plan Access Token**
```http
X-Figma-Token: <plan-access-token>
```

## Options / Props

| Method | Use Case | Expiration | Plan Required |
|--------|----------|------------|---------------|
| OAuth apps | Acting on behalf of individual users | Configurable | Any |
| Plan access tokens | Organization-level automation (CI/CD, logging) | Up to 1 year | Organization or Enterprise |
| Personal access tokens | Individual scripts or personal tooling | Configurable | Any |

## Notes

- Scopes define what resources the token can access (e.g., `file_content:read`)
- OAuth is required for: Embed API, Activity Logs API, Discovery API
- Plan access tokens are not tied to individual user accounts; managed by plan administrators
- Plan tokens do **not** support: `file_code_connect:write`, `file_variables:write`, `file_comments:write`, `/v1/me`, `/v1/oembed`
- All requests must use HTTPS; HTTP requests return 403

## Related

- [OAuth Apps](./oauth-apps.md)
- [Personal Access Tokens](./personal-access-tokens.md)
- [Plan Access Tokens](./plan-access-tokens.md)
- [Scopes](./scopes.md)

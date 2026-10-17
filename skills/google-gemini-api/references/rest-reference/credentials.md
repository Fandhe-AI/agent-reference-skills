---
source: https://ai.google.dev/api/credentials
---

# Credentials API

REST reference for server-managed credentials (API keys, OAuth2 tokens, HTTP Bearer tokens, environment variables) used to authenticate tool calls and MCP servers (Beta).

## Signature / Usage

```text
POST   https://generativelanguage.googleapis.com/v1beta/credentials
GET    https://generativelanguage.googleapis.com/v1beta/credentials
GET    https://generativelanguage.googleapis.com/v1beta/credentials/{id}
PATCH  https://generativelanguage.googleapis.com/v1beta/credentials/{id}
DELETE https://generativelanguage.googleapis.com/v1beta/credentials/{id}
```

REST (the source example uses placeholder values):

```sh
curl -X POST 'https://generativelanguage.googleapis.com/v1beta/credentials' \
-H "x-goog-api-key: ${GEMINI_API_KEY}" \
-H 'Content-Type: application/json' \
-d '{
  "id": "string",
  "injection_location": "header",
  "trusted_domains": [
    "string"
  ],
  "type": {},
  "value": "string"
}'
```

Response:

```json
{
  "create_time": "string",
  "id": "string",
  "status": "active",
  "type": "bearer_token",
  "update_time": "string"
}
```

## Options / Props

`CreateCredential` request body (shape depends on `type`):

| Config | Fields |
|------|------|
| EnvironmentVariableConfig (`type`: `environment_variable`) | `id` (required), `injection_location` (required; `header`, `query`, `body`, single value or array, at least one), `trusted_domains` (optional; domains allowed to receive the value), `value` (required; input only; write-only, never returned) |
| HttpBearerConfig (`type`: `bearer_token`) | `id` (required), `token` (required; input only; write-only), `header_name` (default 'Authorization'), `prefix` (default 'Bearer'; '' for no prefix) |
| OAuth2Config (`type`: `oauth2`) | `id`, `client_id`, `client_secret` (input only), `refresh_token` (input only), `token_url` (all required), `scopes` (optional). Automatic token refresh. |

`Credential` resource (secret fields are never returned):

| Name | Type | Description |
|------|------|-------------|
| id | string | Required. Output only. Identifier. Unique identifier for the credential. |
| type | enum | Output only. `bearer_token` (static token injected as header; no refresh logic), `oauth2` (auto-refresh expired access tokens using the stored refresh token), `environment_variable` (injected into the sandbox container). |
| status | enum | Output only. `active` or `revoked`. |
| create_time / update_time | string | Output only. Timestamps. |

Other methods:

| Method | Parameters | Response |
|------|------|-------------|
| ListCredentials | `page_size` (integer, optional), `page_token` (string, optional) | `credentials[]`, `next_page_token` |
| GetCredential | `id` (required) | `Credential` |
| UpdateCredential | `id` (required), `update_mask` (optional); body: EnvironmentVariableUpdateConfig / HttpBearerUpdateConfig / OAuth2UpdateConfig (same fields, all optional except `type`) | `Credential` |
| DeleteCredential | `id` (required) | empty |

## Notes

- Availability: v1beta (the source states "This API is in Beta. Endpoints are under `/v1beta/`."). Credential resources are described as "Server-managed credential resource stored in Secret Manager."
- Never commit real tokens or client secrets; the examples above use the source's `"string"` placeholders. Secret fields are write-only.
- The all-methods index also lists these as `CreateCredential` etc. under the interactions resource (see all-methods.md).
- The `x-goog-api-key` header was added to the curl example (required per the API overview); the source example omits it.
- Docs fetched 2026-10-16.

## Related

- [Agents API](./agents.md)
- [Environments API](./environments.md)
- [Interactions API (v1beta)](./interactions-v1beta.md)

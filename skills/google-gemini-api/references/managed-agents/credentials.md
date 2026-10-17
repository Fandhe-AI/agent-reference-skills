---
source: https://ai.google.dev/gemini-api/docs/agent-credentials
---

# Credentials in managed agents

Credentials are server-managed secrets that let agents reach third-party services without the secret ever entering the agent's environment. Store once, reference by ID; the egress proxy resolves and injects it at request time. Secret values are write-only and never returned by any endpoint.

## Signature / Usage

Store the secret, then attach it to the domain it authenticates on `environment.network`:

```python
from google import genai

client = genai.Client()

credential = client.credentials.create(
    id="github-production",
    type="bearer_token",
    token="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
)

print(f"Credential ID: {credential.id}, Status: {credential.status}")

interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="Triage the open issues in my-org/my-repo.",
    environment={
        "type": "remote",
        "network": {
            "allowlist": [
                {"domain": "api.github.com", "credential": "github-production"},
                {"domain": "*"},
            ]
        },
    },
)
```

```javascript
const credential = await client.credentials.create({
    id: "github-production",
    type: "bearer_token",
    token: "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
});
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/credentials" \
-H "Content-Type: application/json" \
-H "x-goog-api-key: $GEMINI_API_KEY" \
-d '{
    "id": "github-production",
    "type": "bearer_token",
    "token": "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}'
```

Other operations (Python SDK): list `client.credentials.list(page_size=10)`, get `client.credentials.get(id="github-production")`, rotate `client.credentials.update(id=..., type=..., token=...)`, delete `client.credentials.delete(id="github-production")`. REST: `GET /v1beta/credentials?page_size=10`, `GET /v1beta/credentials/{id}`, `PATCH /v1beta/credentials/{id}`, `DELETE /v1beta/credentials/{id}`.

Use with a remote MCP server tool:

```python
interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="Create a new issue in my-org/my-repo",
    environment="remote",
    tools=[{
        "type": "mcp_server",
        "name": "github",
        "url": "https://api.githubcopilot.com/mcp",
        "credential": "github-production",
    }],
)
```

Use as an environment variable (`environment_variable` credential bound under `environment.env`):

```python
interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="Run the sync script and check notifications.",
    environment={
        "type": "remote",
        "env": {
            "NODE_ENV": "production",
            "SLACK_BOT_TOKEN": {"credential": "slack-bot-token"},
        },
    },
)
```

## Options / Props

Credential types:

| Type | Use case | Behavior |
|------|----------|----------|
| `bearer_token` | Personal access tokens, bot tokens, static API keys | The proxy injects the token as a request header. No refresh logic |
| `oauth2` | OAuth apps and user-delegated flows | The proxy exchanges the refresh token for access tokens and refreshes them as they expire |
| `environment_variable` | Client SDKs that read secrets from the process environment | The agent's environment receives a placeholder. The proxy substitutes the real secret on outbound requests |

Fields common to every credential:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | No | Unique identifier. Generated as a UUID when omitted |
| `type` | string | Yes | One of `bearer_token`, `oauth2`, `environment_variable` |
| `status` | string | Read-only | Current status of the credential |
| `create_time` | string | Read-only | RFC 3339 creation timestamp |
| `update_time` | string | Read-only | RFC 3339 timestamp of the last update |

Fields for `bearer_token`:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `token` | string | Yes | Write-only. The token value |
| `header_name` | string | No | Header to inject. Defaults to `Authorization` |
| `prefix` | string | No | Value prefix. Defaults to `Bearer`. Set to `""` for none |

Fields for `oauth2`:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `client_id` | string | Yes | OAuth2 client ID |
| `client_secret` | string | Yes | Write-only. OAuth2 client secret |
| `refresh_token` | string | Yes | Write-only. Refresh token used to obtain access tokens |
| `token_url` | string | Yes | Provider token endpoint |
| `scopes` | array | No | OAuth scopes to request |

Fields for `environment_variable`:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `value` | string | Yes | Write-only. The secret value |
| `injection_location` | string or array | Yes | Where to substitute the secret. One or more of `header`, `query`, `body` |
| `trusted_domains` | array | No | Domain patterns authorized for substitution |

`header_name` / `prefix` combinations:

| Configuration | Injected header |
|---------------|-----------------|
| `{"token": "ghp_xxx"}` | `Authorization: Bearer ghp_xxx` |
| `{"token": "key_xxx", "header_name": "x-goog-api-key", "prefix": ""}` | `x-goog-api-key: key_xxx` |
| `{"token": "mytoken", "header_name": "X-API-Token", "prefix": ""}` | `X-API-Token: mytoken` |

`credential` and `transform` on an allowlist rule:

| Rule configuration | Behavior |
|--------------------|----------|
| `credential` only | The proxy resolves the credential and injects its header on every request to the domain |
| `transform` only | Static header injection. The headers you write are sent as-is |
| Both | The credential is applied first, then `transform` merges on top. An explicit `transform` header wins if both set the same key |
| Neither | The domain is allowed and no headers are injected |

List parameters: `page_size` (integer, max credentials per page), `page_token` (string, from `next_page_token` of a previous response).

Errors:

| HTTP status | `code` | Cause |
|-------------|--------|-------|
| 400 | `invalid_request` | Missing required field, unknown field, unsupported `type`, or a failed OAuth2 validation |
| 404 | `not_found` | No credential with that ID |
| 409 | `aborted` | A credential with that ID already exists |

## Notes

- Creating an OAuth2 credential performs a live token exchange against `token_url`; it is stored only if the provider returns a successful response with an `access_token`. A valid, unexpired refresh token is needed at creation. If the provider rotates refresh tokens during a refresh, the new one replaces the stored one.
- A literal string in `environment.env` is injected as plaintext and is readable by anything in the sandbox, including the agent. A credential reference gets the placeholder `__GEMINI_CRED_<credential-id>__`; the proxy substitutes the secret only for requests to a domain in the credential's `trusted_domains`. Set `trusted_domains` on every `environment_variable` credential.
- Substitution happens only in the `injection_location` locations listed; a request carrying the placeholder elsewhere is rejected.
- A credential's `type` is fixed at creation; to change it, delete and recreate. Rotation (`PATCH`) requires `type` plus the fields to change; omitted fields keep current values.
- Deleting a credential that is still referenced by an allowlist rule, tool, or env variable makes those references fail to resolve; update them first.
- REST field names are snake_case; camelCase returns `400` (e.g. `Unknown parameter 'headerName'. Did you mean 'header_name'?`).
- `credential` and `headers` on an `mcp_server` tool follow the same precedence as `transform`: credential first, explicit header wins.
- `credential` on an `mcp_server` tool is documented on this page but is not listed in the Interactions OpenAPI `McpServer` schema or the google-genai 2.31.0 types; if the field is rejected, attach the credential to the MCP host on `environment.network.allowlist` instead (as the page's Go tab does).
- The Go tab of the original page for the MCP example sets `Credential` only on the allowlist entry; see the official page for Go and Java tabs.
- API surface: managed agents (Interactions API), REST `v1beta/credentials`; Public Preview feature set.
- Distinct from other skills: anthropic-managed-agents has its own vaults / credentials model; this page covers the Gemini API only.
- Docs fetched 2026-10-16.

## Related

- [Environments in managed agents](./environments.md)
- [Hooks (managed agents)](./hooks.md)
- [Agents overview](./agents-overview.md)
- [Building managed agents](./custom-agents.md)

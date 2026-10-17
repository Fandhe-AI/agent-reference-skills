# Microsoft Foundry

Use Hermes Agent with Microsoft Foundry (formerly Azure AI Foundry) and Azure OpenAI via the `azure-foundry` provider: OpenAI-style and Anthropic-style endpoints, API key or Microsoft Entra ID auth.

## Signature / Usage

```bash
hermes model
# Select "Azure Foundry" -> endpoint URL -> Authentication: 1. API key / 2. Microsoft Entra ID
```

OpenAI-style:

```yaml
model:
  provider: azure-foundry
  base_url: https://my-resource.openai.azure.com/openai/v1
  api_mode: chat_completions
  default: gpt-5.4
```

Anthropic-style (Claude):

```yaml
model:
  provider: azure-foundry
  base_url: https://my-resource.services.ai.azure.com/anthropic
  api_mode: anthropic_messages
  default: claude-sonnet-4-6
```

Entra ID (keyless):

```yaml
model:
  provider: azure-foundry
  base_url: https://my-resource.openai.azure.com/openai/v1
  api_mode: chat_completions
  auth_mode: entra_id
  default: gpt-4o
  context_length: 128000
  entra:
    scope: https://ai.azure.com/.default        # only when overriding the default
```

Role assignment:

```bash
az role assignment create \
  --assignee <principal-or-agent-identity-client-id> \
  --role "Azure AI User" \
  --scope <foundry-resource-id>
```

Alternative for Claude: `provider: anthropic` with `base_url: https://my-resource.services.ai.azure.com/anthropic` and `key_env: AZURE_ANTHROPIC_KEY`.

Pin picker deployments:

```yaml
providers:
  azure-foundry:
    models:
      - gpt-5.4
      - kimi-k2.6
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `AZURE_FOUNDRY_API_KEY` | env | API key (api_key mode) |
| `AZURE_FOUNDRY_BASE_URL` | env | Endpoint URL fallback |
| `AZURE_ANTHROPIC_KEY` | env | Used by `provider: anthropic` + Azure base URL |
| `AZURE_TENANT_ID` | env | Entra tenant for service-principal flows |
| `AZURE_CLIENT_ID` | env | Service principal, workload identity, or user-assigned managed identity client ID |
| `AZURE_CLIENT_SECRET` | env | Service principal secret |
| `AZURE_CLIENT_CERTIFICATE_PATH` | env | Service principal cert |
| `AZURE_FEDERATED_TOKEN_FILE` | env | Workload identity token path (AKS) |
| `AZURE_AUTHORITY_HOST` | env | Sovereign cloud override (e.g. `https://login.microsoftonline.us`) |
| `model.api_mode` | config | `chat_completions`, `codex_responses` (alias `responses`), `anthropic_messages` |
| `model.auth_mode` | config | `entra_id` for keyless |
| `model.entra.scope` | config | OAuth scope; default `https://ai.azure.com/.default` |

`DefaultAzureCredential` order: environment, workload identity, managed identity, VS Code, Azure CLI, Azure Developer CLI, Azure PowerShell, broker (Windows/WSL). Interactive browser credential is excluded.

## Notes

- Wizard auto-detects transport: URL ending `/anthropic`, `GET <base>/models` probe, Anthropic Messages probe, then manual entry. Context length resolves via models.dev, provider metadata, and family fallbacks.
- Entra needs the Azure AI User role (some tenants show Foundry User) on the Foundry resource; allow ~5 minutes to propagate. `azure-identity` installs lazily (`python -c "import pm; pm.sync_venv(['azure-identity'], explicit=True)"`).
- GPT-5.x, codex, and o-series models are auto-routed to the Responses API (`codex_responses`) since `/chat/completions` returns 400 for them; GPT-4, GPT-4o, Llama, Mistral stay on chat completions. `max_completion_tokens` is used automatically. Legacy `api-version` query strings are forwarded via `default_query`.
- Anthropic-style: trailing `/v1` stripped; `api-version` (2025-04-15) sent via `default_query`; Bearer auth instead of `x-api-key`; `anthropic-beta: context-1m-2025-08-07` kept; OAuth refresh disabled for Azure endpoints.
- Anthropic-style Entra uses an httpx event hook because the Anthropic SDK has no callable `auth_token` (documented for <= 0.86.0).
- With `gateway.multiplex_profiles: true`, a profile without its own `AZURE_*` env is refused rather than borrowing the launch identity.
- `batch_runner.py` rebuilds the Entra provider per worker process; no JWT persisted in `auth.json`.
- Azure exposes no API-key endpoint to list deployments; v1 endpoints expose `GET /models` (the available catalog) used for the pickers. You can type any deployment name.
- `hermes doctor` runs a 10 s `DefaultAzureCredential` probe in Entra mode; `hermes auth` shows status.
- Troubleshooting: stale `model.entra.scope` causes 401 on Claude routes (delete the line); run `az login`; verify role with `az role assignment list --assignee <id>`; check `AZURE_CLIENT_ID` for user-assigned identities.
- Source: https://hermes-agent.nousresearch.com/docs/guides/azure-foundry (pinned to v0.22.2)

## Related

- [aws-bedrock](./aws-bedrock.md)

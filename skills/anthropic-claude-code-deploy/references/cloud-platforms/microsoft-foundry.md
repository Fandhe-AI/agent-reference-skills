<!-- source: https://code.claude.com/docs/en/microsoft-foundry.md / last verified: 2026-08-07 -->

# Claude Code on Microsoft Foundry

Configure Claude Code to run through Microsoft Foundry: Azure resource provisioning, three authentication options, environment-variable setup, and model deployment pinning.

## Signature / Usage

```bash
# Provision a Claude resource + deployments in the Microsoft Foundry portal first
# (Opus/Sonnet/Haiku deployments, choosing a hosting option: Azure or Anthropic infra)

# Option A: API key
export ANTHROPIC_FOUNDRY_API_KEY=your-azure-api-key

# Option B: Microsoft Entra ID (default credential chain, e.g. `az login`)
# no env var needed when neither API key nor bearer token is set

# Option C: Bearer token (v2.1.203+)
export ANTHROPIC_FOUNDRY_AUTH_TOKEN=your-entra-access-token

# Enable + configure
export CLAUDE_CODE_USE_FOUNDRY=1
export ANTHROPIC_FOUNDRY_RESOURCE={resource}
# export ANTHROPIC_FOUNDRY_BASE_URL=https://{resource}.services.ai.azure.com/anthropic

# Pin deployment names to model aliases
export ANTHROPIC_DEFAULT_OPUS_MODEL='claude-opus-4-8'
export ANTHROPIC_DEFAULT_SONNET_MODEL='claude-sonnet-5'
export ANTHROPIC_DEFAULT_HAIKU_MODEL='claude-haiku-4-5'
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `CLAUDE_CODE_USE_FOUNDRY` | env | Enables the Microsoft Foundry integration |
| `ANTHROPIC_FOUNDRY_RESOURCE` | env | Azure resource name; builds the endpoint URL. An incorrect name causes repeated connection failures. |
| `ANTHROPIC_FOUNDRY_BASE_URL` | env | Full base URL override instead of `ANTHROPIC_FOUNDRY_RESOURCE` |
| `ANTHROPIC_FOUNDRY_API_KEY` | env | API key from the portal's Endpoints and keys section |
| `ANTHROPIC_FOUNDRY_AUTH_TOKEN` | env | Bearer token issued by Entra ID; takes precedence over API key and default credential chain (v2.1.203+) |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` / `_SONNET_MODEL` / `_HAIKU_MODEL` | env | Set to the Azure deployment name created for that model |

## Notes

- Pin model deployment names for every deployment; Microsoft Foundry has no startup model-availability check, so an unpinned/unavailable default fails requests outright rather than falling back.
- `Azure AI User` or `Cognitive Services User` roles cover required permissions.
- No interactive setup wizard exists (unlike Bedrock/Vertex); environment variables are the only configuration path.
- `/logout` is unavailable; prompt caching is automatic (`ENABLE_PROMPT_CACHING_1H=1` for 1-hour TTL).
- Background tasks (e.g. session titles) default to the primary model rather than Haiku, since not every account has a Haiku deployment.
- Calling the Messages API directly against Bedrock / Vertex / Foundry is covered by the anthropic-api-core skill's platforms pages; this page covers routing the Claude Code CLI through these platforms.

## Related

- [amazon-bedrock.md](./amazon-bedrock.md)
- [google-vertex-ai.md](./google-vertex-ai.md)
- [claude-platform-on-aws.md](./claude-platform-on-aws.md)

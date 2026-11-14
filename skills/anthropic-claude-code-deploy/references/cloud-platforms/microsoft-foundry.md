<!-- source: https://code.claude.com/docs/en/microsoft-foundry.md / last verified: 2026-11-14 -->

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

# Option C: Bearer token
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

```json
{
  "modelOverrides": {
    "claude-opus-4-8": "team-opus-prod"
  }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `CLAUDE_CODE_USE_FOUNDRY` | env | Enables the Microsoft Foundry integration |
| `ANTHROPIC_FOUNDRY_RESOURCE` | env | Azure resource name alone (e.g. `my-resource`); builds the endpoint URL. A URL or host name is refused when you send a message; an incorrect name causes repeated connection failures. |
| `ANTHROPIC_FOUNDRY_BASE_URL` | env | Full base URL override instead of `ANTHROPIC_FOUNDRY_RESOURCE` |
| `ANTHROPIC_FOUNDRY_API_KEY` | env | API key from the portal's Endpoints and keys section |
| `ANTHROPIC_FOUNDRY_AUTH_TOKEN` | env | Entra ID bearer token sent on every request as `Authorization: Bearer`; takes precedence over API key and default credential chain |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` / `_SONNET_MODEL` / `_HAIKU_MODEL` | env | Set to the Azure deployment name created for that model |
| `modelOverrides` | settings | Maps a model ID to your deployment name so Claude Code can tell which model it serves (1M window detection) |
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | env | `1` keeps a 200K window |

## Notes

- Pin model deployment names for every deployment, and select a specific model version rather than "auto-update to latest" when creating Azure deployments. Microsoft Foundry has no startup model-availability check, so an unpinned/unavailable default fails requests outright rather than falling back.
- Without `ANTHROPIC_DEFAULT_OPUS_MODEL`, the `opus` alias on Microsoft Foundry resolves to Opus 4.6.
- Authentication: with Entra ID, leave `ANTHROPIC_FOUNDRY_API_KEY` and `ANTHROPIC_FOUNDRY_AUTH_TOKEN` unset; Claude Code then uses the Azure SDK default credential chain (e.g. `az login`).
- RBAC for Entra ID or its bearer tokens: assign `Foundry User` (previously named `Azure AI User`) or `Cognitive Services User` on the Foundry resource.
- No interactive setup wizard exists (unlike Bedrock/Vertex); environment variables are the only configuration path. Verify with `/status` (`API provider` shows `Microsoft Foundry` plus the resource name or base URL).
- `/logout` is unavailable; prompt caching is automatic (`ENABLE_PROMPT_CACHING_1H=1` for 1-hour TTL, billed higher).
- Background tasks (e.g. session titles) default to the primary model rather than Haiku, since not every account has a Haiku deployment; set `ANTHROPIC_DEFAULT_HAIKU_MODEL` to use Haiku.
- 1M token context: when Claude Code can tell which model a deployment serves, Fable models, Sonnet 5+, and Opus 4.7+ run with 1M by default. It reads the model from the deployment name, so name deployments with the model ID (e.g. `claude-opus-4-8`) or map them with `modelOverrides`; an unrecognized deployment name is assumed to be 200K unless you declare a window. Opus 4.6 and Sonnet 4.6 need `[1m]` appended to the deployment name in `ANTHROPIC_DEFAULT_OPUS_MODEL` / `ANTHROPIC_DEFAULT_SONNET_MODEL`. Before v2.1.287, Fable and Opus 4.7+ also needed the suffix.
- Troubleshooting: "Failed to get token from azureADTokenProvider: ChainedTokenCredential authentication failed" means configure Entra ID or set `ANTHROPIC_FOUNDRY_API_KEY`; repeated connection errors on the first prompt usually mean `ANTHROPIC_FOUNDRY_RESOURCE` is a placeholder or wrong.
- Calling the Messages API directly against Bedrock / Vertex / Foundry is covered by the anthropic-api-core skill's platforms pages; this page covers routing the Claude Code CLI through these platforms.
- Source: https://code.claude.com/docs/en/microsoft-foundry.md, fetched 2026-11-14

## Related

- [amazon-bedrock.md](./amazon-bedrock.md)
- [google-vertex-ai.md](./google-vertex-ai.md)
- [claude-platform-on-aws.md](./claude-platform-on-aws.md)

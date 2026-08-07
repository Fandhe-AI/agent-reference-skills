<!-- source: https://code.claude.com/docs/en/google-vertex-ai.md / last verified: 2026-08-07 -->

# Claude Code on Google Cloud's Agent Platform

Configure Claude Code to run through Google Cloud's Agent Platform (formerly Vertex AI): sign-in wizard, region configuration, manual environment-variable setup, IAM, and model pinning.

## Signature / Usage

```bash
# Sign-in wizard: run `claude`, choose 3rd-party platform > Google Vertex AI (label still used for
# Google Cloud's Agent Platform), or /login to reopen. Re-run /setup-vertex to change credentials.

# Manual setup
gcloud services enable aiplatform.googleapis.com

export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION=global                    # global | multi-region (eu, us) | specific region
export ANTHROPIC_VERTEX_PROJECT_ID=YOUR-PROJECT-ID
export ANTHROPIC_VERTEX_BASE_URL=https://aiplatform.googleapis.com   # optional override

# Per-model region override when CLOUD_ML_REGION=global
export VERTEX_REGION_CLAUDE_HAIKU_4_5=us-east5
export VERTEX_REGION_CLAUDE_4_6_SONNET=europe-west1

# Pin model versions
export ANTHROPIC_DEFAULT_OPUS_MODEL='claude-opus-4-8'
export ANTHROPIC_DEFAULT_SONNET_MODEL='claude-sonnet-5'
export ANTHROPIC_DEFAULT_HAIKU_MODEL='claude-haiku-4-5@20251001'
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `CLAUDE_CODE_USE_VERTEX` | env | Enables the Google Cloud's Agent Platform integration |
| `CLOUD_ML_REGION` | env | `global`, a multi-region (`eu`, `us`), or a specific region; Claude Code picks the matching hostname |
| `ANTHROPIC_VERTEX_PROJECT_ID` | env | Project ID for requests; `GCLOUD_PROJECT` / `GOOGLE_CLOUD_PROJECT` / `GOOGLE_APPLICATION_CREDENTIALS` credential file take precedence |
| `gcpAuthRefresh` | settings | Command run when GCP credentials are detected as expired or unloadable; 3-minute timeout |
| `VERTEX_REGION_CLAUDE_*` | env | Per-model region override when `CLOUD_ML_REGION=global` and a model doesn't support the global endpoint |
| `ENABLE_TOOL_SEARCH` | env | `true`/`false`; MCP tool search is enabled by default on Opus 4.5/Sonnet 4.5/Haiku 4.5+; earlier models always load tools upfront |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` / `_SONNET_MODEL` / `_HAIKU_MODEL` | env | Pin model aliases to specific Vertex model IDs |

## Notes

- Pin model versions for multi-user deployments; unpinned `opus`/`sonnet` resolve to Claude Code's built-in Vertex default, which can lag or be disabled in-project.
- `roles/aiplatform.user` (or a custom role with `aiplatform.endpoints.predict`) is the required IAM role.
- Supports X.509 certificate-based Workload Identity Federation via the Application Default Credentials chain (`GOOGLE_APPLICATION_CREDENTIALS`).
- `/logout` is unavailable on this platform; prompt caching is enabled automatically (`DISABLE_PROMPT_CACHING=1` to disable, `ENABLE_PROMPT_CACHING_1H=1` for 1-hour TTL).
- Sonnet 5, Opus 4.6+, and Sonnet 4.6 support the 1M token context window; append `[1m]` to a manually pinned model ID.
- Calling the Messages API directly against Bedrock / Vertex / Foundry is covered by the anthropic-api-core skill's platforms pages; this page covers routing the Claude Code CLI through these platforms.

## Related

- [amazon-bedrock.md](./amazon-bedrock.md)
- [microsoft-foundry.md](./microsoft-foundry.md)
- [claude-platform-on-aws.md](./claude-platform-on-aws.md)

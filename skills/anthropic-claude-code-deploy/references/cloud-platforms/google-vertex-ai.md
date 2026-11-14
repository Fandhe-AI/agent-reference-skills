<!-- source: https://code.claude.com/docs/en/google-vertex-ai.md / last verified: 2026-11-14 -->

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

```json
{
  "gcpAuthRefresh": "gcloud auth application-default login",
  "env": {
    "ANTHROPIC_VERTEX_PROJECT_ID": "your-project-id"
  }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `CLAUDE_CODE_USE_VERTEX` | env | Enables the Google Cloud's Agent Platform integration |
| `CLOUD_ML_REGION` | env | `global`, a multi-region (`eu`, `us`), or a specific region; Claude Code picks the matching hostname (incl. `aiplatform.eu.rep.googleapis.com` / `aiplatform.us.rep.googleapis.com`). Values not shaped like a region are treated as unset and fall back to `us-east5` |
| `ANTHROPIC_VERTEX_PROJECT_ID` | env | Project ID for requests; used even when `GCLOUD_PROJECT`, `GOOGLE_CLOUD_PROJECT`, or the `GOOGLE_APPLICATION_CREDENTIALS` credential file carry a different project |
| `ANTHROPIC_VERTEX_BASE_URL` | env | Override the endpoint URL for custom endpoints or gateways |
| `gcpAuthRefresh` | settings | Command run when GCP credentials are detected as expired or unloadable; output shown, no interactive input; 3-minute timeout |
| `VERTEX_REGION_CLAUDE_*` | env | Per-model region override when `CLOUD_ML_REGION=global` and a model doesn't support the global endpoint; invalid values fall back to `CLOUD_ML_REGION` |
| `ENABLE_TOOL_SEARCH` | env | `true`/`false`; MCP tool search is enabled by default on Opus 4.5/Sonnet 4.5/Haiku 4.5 and later; earlier models always load tools upfront (`true` does not override) |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` / `_SONNET_MODEL` / `_HAIKU_MODEL` | env | Pin model aliases to specific Vertex model IDs |
| `enforceAvailableModels` | managed settings | With `availableModels`, restricts startup model checks to the listed IDs (v2.1.287+) |
| `CLAUDE_CODE_SKIP_MODEL_ACCESS_MEMORY` | env | `1` turns off the remembered-refusal memory (up to a day) |
| `CLAUDE_CODE_DISABLE_MODEL_ACCESS_FALLBACK` | env | `1` makes rejected requests fail instead of switching models mid-session |
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | env | `1` keeps a 200K window |

## Notes

- Pin model versions for multi-user deployments; unpinned `opus`/`sonnet` resolve to Claude Code's built-in Vertex default, which can lag or be disabled in-project.
- Built-in defaults with no pinning variables: primary model `claude-opus-5-5`, small/fast model `claude-sonnet-4-5@20250929`. Before v2.1.280 the primary model defaulted to Opus 5. Unpinned means billed at the Opus rate; to use Sonnet 4.5 as primary, set `ANTHROPIC_MODEL` to its full ID.
- Background tasks (e.g. session titles) use the default Sonnet model, not Haiku; they follow the primary model when you select one (`--model` / `ANTHROPIC_MODEL` / `model` / `ANTHROPIC_DEFAULT_MODEL`) or set `ANTHROPIC_DEFAULT_OPUS_MODEL` without `ANTHROPIC_DEFAULT_SONNET_MODEL`; set `ANTHROPIC_DEFAULT_HAIKU_MODEL` to use Haiku.
- Model availability varies across specific regions, multi-region locations, and global endpoints; check Model Garden "Supported features". Model access requests may take 24-48 hours.
- `roles/aiplatform.user` (or a custom role with `aiplatform.endpoints.predict`, needed for invocation and token counting) is the required IAM role.
- Supports X.509 certificate-based Workload Identity Federation via the Application Default Credentials chain (`GOOGLE_APPLICATION_CREDENTIALS`).
- `gcpAuthRefresh`: Claude Code first requests an access token to confirm the credentials are expired and skips the command if they still work; if that check exceeds five seconds the command runs only after a credential-error failure (before v2.1.261 a timeout counted as expired). In project settings it runs under the same workspace trust rule as hooks, including `-p` sessions in untrusted folders.
- Startup model checks: prompts to update an older pin when the project can invoke the newer default (accepting writes the user settings file). Managed-settings `env` pins are not checked (repeat prompt: update to v2.1.314+). With no pin and an unavailable default, it falls back for the session (earlier versions first; Opus falls back to Sonnet), not persisted. A session started on a specific Sonnet/Opus version acts as a session pin; aliases and unrecognized IDs do not. Refusals are remembered up to a day and rechecked after ten minutes.
- Mid-session rejection by Agent Platform switches to another model (`Switched to <fallback> because <model> is not available`) unless the session is on a pinned model or none is available; use `/model` and press `s` to switch without changing the default.
- `/logout` is unavailable on this platform; prompt caching is enabled automatically (`DISABLE_PROMPT_CACHING=1` to disable, `ENABLE_PROMPT_CACHING_1H=1` for 1-hour TTL, billed higher).
- 1M token context: Fable models, Sonnet 5+, and Opus 4.7+ run with 1M by default (no `[1m]` suffix). Opus 4.6 and Sonnet 4.6 need the `[1m]` variant (append to a manually pinned ID). Before v2.1.287, Fable and Opus 4.7+ defaulted to 200K.
- Verify with `/status`: `API provider` shows `Google Vertex AI`, with `GCP project`, `Default region`, and `Model` lines.
- Troubleshooting: "Could not load the default credentials" means run `gcloud auth application-default login` or set `GOOGLE_APPLICATION_CREDENTIALS`; "model not found" 404 means confirm the model is Enabled in Model Garden and available in the chosen location (some are `global`/multi-region only; with `global`, use a model that supports global endpoints or its `VERTEX_REGION_CLAUDE_*` variable); 429 means confirm the primary and small/fast models are supported in the region, or consider `CLOUD_ML_REGION=global`.
- Create a dedicated GCP project for Claude Code to simplify cost tracking and access control.
- Calling the Messages API directly against Bedrock / Vertex / Foundry is covered by the anthropic-api-core skill's platforms pages; this page covers routing the Claude Code CLI through these platforms.
- Source: https://code.claude.com/docs/en/google-vertex-ai.md, fetched 2026-11-14

## Related

- [amazon-bedrock.md](./amazon-bedrock.md)
- [microsoft-foundry.md](./microsoft-foundry.md)
- [claude-platform-on-aws.md](./claude-platform-on-aws.md)

---
source: https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/, https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/claude-code/, https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/openai-codex/, https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/opencode/, https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/github-copilot-cli/, https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/gemini-cli/, https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/pi/
---

# Coding agents (terminal agents)

Route terminal coding agents (Claude Code, OpenAI Codex, OpenCode, GitHub Copilot CLI, Gemini CLI, Pi) through AI Gateway for observability, caching, rate limiting, cost tracking, and DLP. IDE and desktop clients are in [integrations-ide-clients.md](./integrations-ide-clients.md).

## Signature / Usage

Claude Code (Anthropic endpoint; replace placeholders; `ANTHROPIC_API_KEY` can be any placeholder when AI Gateway holds the Anthropic credentials):

```bash
export ANTHROPIC_BASE_URL="https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/anthropic"
export ANTHROPIC_API_KEY="<CF_AIG_TOKEN>"
export ANTHROPIC_CUSTOM_HEADERS="cf-aig-authorization: Bearer <CF_AIG_TOKEN>"
claude
```

Claude Code with Amazon Bedrock or Google Vertex AI (credentials stored in AI Gateway via BYOK):

```bash
export CLAUDE_CODE_USE_BEDROCK="1"
export ANTHROPIC_BEDROCK_BASE_URL="https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/aws-bedrock/bedrock-runtime/<AWS_REGION>/"
export CLAUDE_CODE_SKIP_BEDROCK_AUTH="1"
export ANTHROPIC_CUSTOM_HEADERS="cf-aig-authorization: Bearer <CF_AIG_TOKEN>"
```

```bash
export CLAUDE_CODE_USE_VERTEX="1"
export ANTHROPIC_VERTEX_BASE_URL="https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/google-vertex-ai/v1"
export ANTHROPIC_VERTEX_PROJECT_ID="<GCP_PROJECT_ID>"
export CLOUD_ML_REGION="<GCP_REGION>"
export CLAUDE_CODE_SKIP_VERTEX_AUTH="1"
export ANTHROPIC_CUSTOM_HEADERS="cf-aig-authorization: Bearer <CF_AIG_TOKEN>"
```

Claude Code with Cloudflare Access (`~/.claude/settings.json`):

```json
{
	"apiKeyHelper": "cloudflared access login --no-verbose https://ai-gateway.example.com",
	"env": {
		"ANTHROPIC_BASE_URL": "https://ai-gateway.example.com/anthropic"
	}
}
```

OpenAI Codex (`~/.codex/cloudflare-aig.config.toml`, then `codex --profile cloudflare-aig`):

```toml
model_provider = "cloudflare-ai-gateway"
model = "gpt-5.5"
model_reasoning_effort = "medium"

[model_providers.cloudflare-ai-gateway]
name = "Cloudflare AI Gateway"
# Run `wrangler whoami` to get your account ID, then replace <ACCOUNT_ID>.
# Use `default` for <GATEWAY_ID> to route through your account's default gateway.
base_url = "https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/openai"
env_key = "CLOUDFLARE_API_KEY"
wire_api = "responses"
```

OpenCode (`opencode.json`, gateway token; the Anthropic provider shown, other providers follow the same pattern):

```json
{
  "$schema": "https://opencode.ai/config.json",
  "share": "disabled",
  "disabled_providers": ["opencode"],
  "enabled_providers": ["anthropic"],
  "provider": {
    "anthropic": {
      "name": "Anthropic through Cloudflare AI Gateway",
      "options": {
        "baseURL": "https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/anthropic/v1",
        "apiKey": "",
        "headers": {
          "cf-aig-authorization": "Bearer {env:CF_AIG_TOKEN}"
        }
      }
    }
  }
}
```

GitHub Copilot CLI (REST API, default gateway only):

```bash
export COPILOT_PROVIDER_TYPE="openai"
export COPILOT_PROVIDER_BASE_URL="https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai/v1"
export COPILOT_PROVIDER_API_KEY="<CF_API_TOKEN>"
export COPILOT_MODEL="openai/gpt-4.1"
```

Gemini CLI (Access-protected custom domain):

```bash
export GOOGLE_GEMINI_BASE_URL="https://ai.example.com/google-ai-studio"
export GEMINI_API_KEY="$(cloudflared access login -app https://ai.example.com)"
gemini
```

Pi (built-in `cloudflare-ai-gateway` provider):

```bash
export CLOUDFLARE_API_KEY="<CLOUDFLARE_API_KEY>"
export CLOUDFLARE_ACCOUNT_ID="<CLOUDFLARE_ACCOUNT_ID>"
export CLOUDFLARE_GATEWAY_ID="default"
pi --provider cloudflare-ai-gateway --model "claude-sonnet-4-6"
```

## Options / Props

| Agent | Endpoint / base URL | Credential | Notes |
|-------|--------------------|-----------|-------|
| Claude Code | `.../<GATEWAY_ID>/anthropic` | `cf-aig-authorization` via `ANTHROPIC_CUSTOM_HEADERS`; `ANTHROPIC_API_KEY` placeholder or your own Anthropic key | Needs Anthropic Messages API; Bedrock/Vertex via BYOK |
| OpenAI Codex | `.../<GATEWAY_ID>/openai` | `CLOUDFLARE_API_KEY` env var (Cloudflare token), Unified Billing | `wire_api = "responses"` only (OpenAI Responses models such as `gpt-5.5`); `base_url` is not env-expanded |
| OpenCode | `.../anthropic/v1`, `/openai`, `/google-ai-studio/v1beta`, `/grok/v1` | `CF_AIG_TOKEN` env var in `cf-aig-authorization` header; empty `apiKey` | Per-key alias via `cf-aig-byok-alias` header |
| GitHub Copilot CLI | `https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai/v1` | Cloudflare API token in `COPILOT_PROVIDER_API_KEY` | Cannot send custom headers, so uses the default gateway; needs tool calling + streaming, 128k+ context advised; `COPILOT_PROVIDER_MAX_PROMPT_TOKENS` / `COPILOT_PROVIDER_MAX_OUTPUT_TOKENS` for unknown models |
| Gemini CLI | custom domain `/google-ai-studio` | Access token in `GEMINI_API_KEY` | No API key helper; refresh token on expiry |
| Pi | built-in provider | gateway token (`CLOUDFLARE_API_KEY`) or `/login` | Needs account ID and gateway slug |

## Notes

- Prerequisites common to most: an authenticated gateway and gateway token with `Run` permission, account ID, and either Unified Billing credits or stored provider keys (BYOK, `default` alias unless `cf-aig-byok-alias` is set).
- Credentials as environment variables: `export` in an interactive shell can end up in shell history and process listings; prefer your shell profile with restricted permissions, a secret manager, or the agent's own env-injection mechanism, and never commit them. Use short-lived Access tokens where supported.
- Claude Code cannot use `/ai/v1/chat/completions` or `/ai/run`; it needs an Anthropic-compatible endpoint (Anthropic, Bedrock, or Vertex). With Access, point `ANTHROPIC_BASE_URL` at the custom domain and let `apiKeyHelper` fetch the token via `cloudflared`; the first request opens an IdP login and `cf.user_id` is attached. Claude Code's own settings are covered by the anthropic-claude-code skill.
- Codex: the Access variant replaces `base_url` with the custom domain and swaps `env_key` for `[model_providers.cloudflare-ai-gateway.auth]` (`command = "cloudflared"`, `args = ["access", "login", "--no-verbose", "https://ai-gateway.example.com"]`, `timeout_ms = 30000`, `refresh_interval_ms = 0`). Codex itself is covered by the openai-codex skill.
- OpenCode with Access: host two credential-free config files (`opencode.json` with `baseURL` on the custom domain and headers `cf-access-token: {env:TOKEN}`, `X-Requested-With: XMLHttpRequest`; and a discovery file with `auth.command` = `cloudflared access login --no-verbose -app=https://ai.example.com/`, `auth.env` = `TOKEN`, and `remote_config.url`), add a Single Redirect from `/.well-known/opencode` to the discovery file, then users run `opencode auth login https://ai.example.com`. OpenCode executes the `auth.command` from the discovery file, so host these files only on infrastructure you control and protect the host and DNS. Do not keep a local copy of the hosted config (local config takes precedence).
- DLP: coding agents stream by default; DLP response scanning buffers the response and raises time-to-first-token. Use Check = Request or a separate gateway for latency-sensitive traffic.
- Verify: send a prompt, then check the gateway **Logs** for the request with model, tokens, and latency.

## Related

- [integrations-ide-clients.md](./integrations-ide-clients.md)
- [configuration-cloudflare-access.md](./configuration-cloudflare-access.md)
- [configuration-custom-domains.md](./configuration-custom-domains.md)
- [configuration-bring-your-own-keys.md](./configuration-bring-your-own-keys.md)
- [features-unified-billing.md](./features-unified-billing.md)
- [features-dlp.md](./features-dlp.md)
- [features-auto-router.md](./features-auto-router.md)

<!-- source: https://code.claude.com/docs/en/llm-gateway-protocol.md / last verified: 2026-11-14 -->

# Gateway protocol reference

The API contract between Claude Code and an LLM gateway: endpoints, headers and body fields to forward, feature degradation when fields are stripped, attribution headers for cost tracking, and model discovery.

## Signature / Usage

A running Claude apps gateway serves a machine-readable version of this contract at `GET /protocol`. This page documents requests Claude Code sends, for operators configuring a third-party gateway.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Anthropic Messages format | API format | Selected by `ANTHROPIC_BASE_URL`; endpoints `/v1/messages`, `/v1/messages/count_tokens` (optional); forward `anthropic-beta` and `anthropic-version` headers unchanged |
| Amazon Bedrock InvokeModel format | API format | Selected by `ANTHROPIC_BEDROCK_BASE_URL` + `CLAUDE_CODE_USE_BEDROCK=1`; endpoints `/model/{model}/invoke`, `/model/{model}/invoke-with-response-stream`; forward `anthropic_beta`/`anthropic_version` body fields |
| Google Cloud's Agent Platform rawPredict format | API format | Selected by `ANTHROPIC_VERTEX_BASE_URL` + `CLAUDE_CODE_USE_VERTEX=1`; endpoints `:rawPredict`, `:streamRawPredict`, `count-tokens:rawPredict` (optional) |
| `Authorization`, `x-api-key` | request header | Developer's gateway credential |
| `anthropic-version` | request header | API version, currently `2023-06-01`; forward unchanged |
| `anthropic-beta` | request header | Comma-separated capability values; forward verbatim, don't allowlist individual values |
| `x-claude-code-session-id` | request header | Unique identifier for the current session; use for cost attribution |
| `x-claude-code-agent-id` / `x-claude-code-parent-agent-id` | request header | Identifies subagents and their parent for attribution, not a user identifier |

## Notes

- Microsoft Foundry and Claude Platform on AWS implement the Anthropic Messages format; a gateway fronting Claude Platform on AWS must also forward the `anthropic-workspace-id` header.
- Inference responses must stream; a gateway that buffers stalls the client. Claude Code aborts a stream silent for 300 seconds by default on `ANTHROPIC_BASE_URL`/`ANTHROPIC_AWS_BASE_URL` connections (byte-level watchdog); other provider base URLs use a 5-minute idle timeout instead.
- Treat headers and body fields as open lists — Claude Code gains capabilities over releases (new `anthropic-beta` values, body fields); allowlisting today's set breaks the next release's capability.
- Claude Code prepends a system-prompt attribution block (client version + conversation fingerprint); `api.anthropic.com` strips it when it arrives unchanged as the first system block. Reordering or merging the `system` array defeats the strip. Set `CLAUDE_CODE_ATTRIBUTION_HEADER=0` to omit it entirely if the gateway must reshape system content.
- Capabilities that add body fields pair with a beta header; stripping one but not the other produces hard `400` errors (see feature pass-through table for context management, extended context, interleaved thinking, beta tool fields, effort/structured outputs, token counting).
- `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1` stops Claude Code sending pre-release capabilities on every provider; doesn't affect adaptive reasoning or the OAuth capability.
- Model discovery: `GET /v1/models?limit=1000` with a 3-second timeout; any redirect is treated as failure. Enabled via `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1` (v2.1.129+). Entries are kept when `id` contains `claude` or `anthropic` (case-insensitive); results cached to `~/.claude/cache/gateway-models.json`.

- Source: https://code.claude.com/docs/en/llm-gateway-protocol.md, fetched 2026-11-14

### Additions (2026-11-14)

- Bedrock InvokeModel format also serves optional `/model/{model}/count-tokens`; Agent Platform rawPredict forwards `anthropic-beta` / `anthropic-version` headers plus the `anthropic_version` body field (a provider dialect string, not the header value). Agent Platform is the former Vertex AI; variable names keep `VERTEX`. Inference posts to `/v1/messages?beta=true`; match on path, not full URL. Best-effort startup traffic a gateway can reject: `HEAD /api/hello` (Messages format; skipped with an HTTP proxy or client certificate) and `GET /inference-profiles?type=SYSTEM_DEFINED` plus `GET /inference-profiles/{profile}` (Bedrock format). Sessions through a gateway aren't eligible for the HIPAA configuration. The fast mode availability check and WebFetch domain safety check call `api.anthropic.com` directly, not the gateway.
- Streaming: a body that ends cleanly after a content block started but before the final `message_delta` is treated as a dropped connection; SSE `ping` events may be the only bytes during long thinking (don't strip or buffer them; a translating gateway should emit its own); Bedrock `invoke-with-response-stream` must stay binary `application/vnd.amazon.eventstream` (not converted to SSE, `Content-Type` unchanged).
- Connection method behavior: Bedrock/Agent Platform format sends provider model IDs (e.g. `us.anthropic.claude-opus-4-8`) and the accepted beta subset; Messages format sends Anthropic IDs and the full set (unless `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS`); a Claude apps gateway sign-in sends only the subset Bedrock/Agent Platform accept. One-hour prompt cache TTL via `ttl` in `cache_control`; on the Messages format also an `extended-cache-ttl` `anthropic-beta` value to forward. Unrecognized model IDs: 200K context window (1M with `[1m]`), declare capabilities via a `modelOverrides` entry.
- `Authorization` must also be forwarded when the gateway authenticates to Anthropic with the developer's claude.ai login; stripping the OAuth `anthropic-beta` capability fails with `401`. Subagent IDs are fresh per spawn; teammate agents keep a stable name-based ID.
- Gateway hint headers (v2.1.273+): sent by default on direct Anthropic API connections; off by default on a custom base URL; on other backends only with `CLAUDE_CODE_GATEWAY_HINT_HEADERS=1` (`0` stops them everywhere). Headers: `x-claude-code-request-class` (`main` / `subagent` / `workflow` / `compaction` / `auxiliary`), `x-claude-code-agent-type`, `x-claude-code-compaction` (`auto` / `manual` / `reactive`), `x-claude-code-context-compacted`, `x-claude-code-prev-tool-durations` (`<name>=<ms>;...`, max 32 entries and 4 KB, names percent-encoded), `x-claude-code-prompt-id` (random UUID, v2.1.283+).
- Response headers: return `text/event-stream` (Messages) or unmodified `application/vnd.amazon.eventstream` (Bedrock); `retry-after` as integer seconds (a value above 60 stops retries outside `CLAUDE_CODE_RETRY_WATCHDOG` sessions); pass `x-should-retry` and `anthropic-ratelimit-unified-*` through unchanged; forward error bodies unmodified (a `capability_rejected:` token in a wrapped envelope also works).
- Attribution block: keep it first and in its own array entry, forward `system` unchanged. From v2.1.181 the block is stable per conversation on a custom base URL (before that, set `CLAUDE_CODE_ATTRIBUTION_HEADER=0` for body-keyed caches or third-party upstreams). Auto mode classifier requests keep the block even with `0` when sent to `api.anthropic.com` with no third-party provider and no Anthropic profile/federation credential (v2.1.229+).
- Feature pass-through extras: fine-grained tool streaming is off on a custom base URL unless `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING=1`; adaptive reasoning (`thinking: {"type": "adaptive"}`) is sent for Claude Opus 4.6, Claude Sonnet 4.6, Claude Haiku 5.5, Claude Fable 5 and later and for unrecognized names; `output_config` carries effort / structured-output format / task budget (`CLAUDE_CODE_DISABLE_STRUCTURED_OUTPUTS=1` requires v2.1.288+); mid-conversation `role: "system"` messages for Claude Opus 4.8 and later and unrecognized IDs; per-turn effort on `role: "system"` entries for Opus 5.5, Sonnet 5.5, Haiku 5.5, Fable 5.2, Fable 5.1 (`400` `system content must contain at least one block` if stripped); `cache_control` must be forwarded unchanged. `ANTHROPIC_DEFAULT_*_MODEL_SUPPORTED_CAPABILITIES` apply only with `CLAUDE_CODE_USE_BEDROCK` / `VERTEX` / `FOUNDRY` / `MANTLE`, not behind `ANTHROPIC_BASE_URL`.
- Automatic retries (gateway sees a second request): thinking type `enabled`/`adaptive` swap (v2.1.121+); system-role messages rejected -> user messages; `cache_control` marker moved; thinking signature rejection (`bound to a different conversation`) -> earlier thinking blocks dropped; advisor tool type rejected (`Input tag 'advisor_20260301'`, v2.1.280+); `output_config.effort` rejected (`effort-2025-11-24` form needs v2.1.310+); `context_management` rejected (v2.1.304+); other named `anthropic-beta` values (mostly v2.1.314+; `Unexpected value(s)` sentence or `capability_rejected: beta_header:<value>` token); `defer_loading` / `tool_reference` tool search fields (v2.1.305+). Rejected values stay out until exit, or per conversation (resets at `/clear` or compaction), depending on the case.
- `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1` removes context management, beta tool fields (`strict`, `defer_loading`), `output_config.format` (v2.1.287+), `output_config.task_budget`, and MCP tool search (unless kept on via managed settings, v2.1.227+; no effect on cloud providers / Claude apps gateway / HIPAA sessions). It leaves extended-context / interleaved-thinking / effort betas, `output_config.effort`, adaptive `thinking`, mid-conversation system entries, auto mode classifier review (`CLAUDE_CODE_AUTO_MODE_SERVER=0` turns it off), the OAuth beta, and `ANTHROPIC_BETAS` / `CLAUDE_CODE_EXTRA_BODY` additions.
- Model discovery extras: only for the Messages format (not when any `CLAUDE_CODE_USE_*` is set, or `ANTHROPIC_BASE_URL` is unset / `api.anthropic.com`); sends both `Authorization` and `x-api-key` (v2.1.248+); `CLAUDE_CODE_GATEWAY_MODEL_DISCOVERY_TIMEOUT_MS` (v2.1.269+) lengthens the 3 s timeout; `ANTHROPIC_CUSTOM_HEADERS` values replace same-named built-ins; `display_name` and `description` are read (entry shows `From gateway` otherwise; before v2.1.257 always); filter keeps ids containing `claude` or `anthropic` anywhere (before v2.1.223 only a prefix); only models allowed by `availableModels` are added; a discovered ID matching an existing row or a built-in alias target collapses into it; cache lives under `CLAUDE_CONFIG_DIR` if set, else `~/.claude/cache/gateway-models.json` (`%USERPROFILE%\.claude\cache\gateway-models.json` on Windows).

## Related

- [Run Claude Code through a gateway](./gateways.md)
- [Other LLM gateways](./llm-gateway.md)
- [Connect Claude Code to an LLM gateway](./llm-gateway-connect.md)
- [Roll out an LLM gateway for your organization](./llm-gateway-rollout.md)

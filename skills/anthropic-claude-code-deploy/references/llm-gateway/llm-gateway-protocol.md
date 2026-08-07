<!-- source: https://code.claude.com/docs/en/llm-gateway-protocol.md / last verified: 2026-08-07 -->

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

## Related

- [Run Claude Code through a gateway](./gateways.md)
- [Other LLM gateways](./llm-gateway.md)
- [Connect Claude Code to an LLM gateway](./llm-gateway-connect.md)
- [Roll out an LLM gateway for your organization](./llm-gateway-rollout.md)

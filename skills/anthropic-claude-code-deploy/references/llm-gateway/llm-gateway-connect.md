<!-- source: https://code.claude.com/docs/en/llm-gateway-connect.md / last verified: 2026-11-14 -->

# Connect Claude Code to an LLM gateway

Point Claude Code at your organization's LLM gateway: check whether your admin already configured it, or set the base URL and credential yourself, then verify the connection and fix gateway errors.

## Signature / Usage

```bash
export ANTHROPIC_BASE_URL=https://llm-gateway.example.com
export ANTHROPIC_AUTH_TOKEN=sk-gateway-key
```

Or persist in a settings file (`~/.claude/settings.json` or `.claude/settings.local.json`, never a committed project `settings.json`):

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://llm-gateway.example.com",
    "ANTHROPIC_AUTH_TOKEN": "sk-gateway-key"
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ANTHROPIC_AUTH_TOKEN` | env var | Set when gateway team says "bearer token" or "Authorization header"; sent as `Authorization: Bearer` |
| `ANTHROPIC_API_KEY` | env var | Set when gateway team says "API key" or "x-api-key"; sent as `x-api-key` |
| `apiKeyHelper` | settings | Command that prints the current credential to stdout; use when the credential rotates or comes from a vault. Cached 5 minutes by default (`CLAUDE_CODE_API_KEY_HELPER_TTL_MS`), re-run on HTTP 401 |
| `ANTHROPIC_CUSTOM_HEADERS` | env var | One `Name: Value` pair per line, for a gateway that needs a tenant/routing header in addition to the credential |
| `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY` | env var | Queries gateway `/v1/models` at startup and adds returned names to the `/model` picker (requires v2.1.129+) |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | env var | Turns off background traffic (version checks, telemetry, model discovery) outside the gateway path; also disables auto-updates |
| `ANTHROPIC_BEDROCK_BASE_URL` / `ANTHROPIC_VERTEX_BASE_URL` / `ANTHROPIC_FOUNDRY_BASE_URL` / `ANTHROPIC_AWS_BASE_URL` | env var | Route to a gateway fronting Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, or Claude Platform on AWS, paired with the matching `CLAUDE_CODE_USE_*` / skip-auth variables |

## Notes

- Verify with a direct curl to `$ANTHROPIC_BASE_URL/v1/messages`; a `{"id":"msg_...` response or even a model-not-found error confirms the URL/credential work. `401` means switch the credential variable.
- Run `/status` in Claude Code to confirm `Anthropic base URL` and `Auth token`/`API key` lines are active.
- A gateway credential variable takes precedence over a saved claude.ai login; run `/logout` to clear a saved login so only the gateway credential remains.
- Each surface needs separate configuration: VS Code extension uses `claudeCode.environmentVariables`; the desktop app uses its own third-party inference configuration (not `ANTHROPIC_BASE_URL`); GitHub Actions reads `ANTHROPIC_BASE_URL`/`ANTHROPIC_CUSTOM_HEADERS` from workflow `env`; the Agent SDK passes environment variables to the spawned Claude Code process; Slack, web, and Remote Control are Anthropic-hosted and always use Anthropic's API (not part of a gateway deployment).
- Includes a troubleshooting table for common errors: auth-conflict warnings, `401`s, `apiKeyHelper` failures, connection-refused errors, malformed `HTTP 200` responses, `400`s naming `context_management`/`thinking`/`adaptive`, gateway-enforced context-limit errors, missing models in the picker, fast-mode unavailability behind gateways, and TLS/WAF-related `403`s.
- Source: https://code.claude.com/docs/en/llm-gateway-connect.md, fetched 2026-11-14

### Additional details (2026-11-14)

- If you export the gateway only in your shell, it doesn't reliably reach background agents hosted by the supervisor; use a settings-file `env` block for any gateway background agents must always route through. When a shell export and a settings-file `env` block set the same variable, the settings-file value applies.
- Credential-to-header mapping: `ANTHROPIC_AUTH_TOKEN` is sent in `Authorization: Bearer`, `ANTHROPIC_API_KEY` in `x-api-key`, and `apiKeyHelper` in both. A credential in the wrong variable yields `401`. With `ANTHROPIC_API_KEY`, interactive mode prompts once to approve the key; a previously declined key is ignored without asking (enable it under `/config` with `Use custom API key`).
- `apiKeyHelper`: on Claude Code v2.1.227 or later, a banner or log line printed alongside the key makes the helper fail (the command must print nothing but the credential). Runs through the system shell; on Windows it can be an executable or a PowerShell invocation.
- Model discovery: enable with `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1` (shell or `env` block of `~/.claude/settings.json`). Entries show the gateway-supplied description or `From gateway`. If a `modelPicker` lineup sets `replaceBuiltInOptions`, discovered names are hidden too (the row for the model in use is kept). Confirm with `claude --debug` and the `[gatewayDiscovery]` lines in `~/.claude/debug/<session-id>.txt`.
- `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1` also: disables auto-updates; suppresses the fast mode availability check; does not affect gateway model discovery (before v2.1.257 it also stopped discovery from refreshing); does not affect the WebFetch domain safety check, which still calls `api.anthropic.com` (turn off with `skipWebFetchPreflight: true`).
- Provider routes: Amazon Bedrock and Google Cloud's Agent Platform gateways accept those providers' native formats (Claude Code also limits beta headers/fields to what the provider accepts); Microsoft Foundry and Claude Platform on AWS gateways accept the Anthropic Messages format. Skip-auth variables: `CLAUDE_CODE_SKIP_BEDROCK_AUTH`, `CLAUDE_CODE_SKIP_VERTEX_AUTH`, `CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH` (keep set even when adding `ANTHROPIC_AUTH_TOKEN`, otherwise Claude Code removes any `Authorization` header). Leave `AWS_BEARER_TOKEN_BEDROCK` unset when the gateway issues its own credential. Vertex also needs `ANTHROPIC_VERTEX_PROJECT_ID` and `CLOUD_ML_REGION`, with per-model `VERTEX_REGION_CLAUDE_*` overrides and model pins via `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL` (capabilities via `ANTHROPIC_DEFAULT_OPUS_MODEL_SUPPORTED_CAPABILITIES` and counterparts). Claude Platform on AWS also needs `ANTHROPIC_AWS_WORKSPACE_ID`.
- Microsoft Foundry: `ANTHROPIC_FOUNDRY_API_KEY` is sent as `x-api-key`; `ANTHROPIC_FOUNDRY_AUTH_TOKEN` is sent as `Authorization: Bearer` and takes precedence when both are set (requires v2.1.203+). For a gateway that injects its own `Authorization` header, set `CLAUDE_CODE_SKIP_FOUNDRY_AUTH=1` and leave both credential variables unset.
- Desktop app: SSH sessions with a gateway configuration are beta, need Claude Desktop v1.40609.0 or later, are off by default (allowed hosts via the `sshHostAllowlist` key of the third-party inference configuration), and the gateway can't be at `localhost` on the local machine. With the gateway configuration active, Anthropic-hosted cloud environments and Remote Control are unavailable. `Gateway was unreachable` means the base URL couldn't be reached at startup.
- GitHub Actions: pass the credential as the action's `anthropic_api_key` input (set as `ANTHROPIC_API_KEY`, sent as `x-api-key`). For a bearer-token gateway, pass the same secret as both the input and `ANTHROPIC_AUTH_TOKEN` in workflow `env`; the action doesn't read `ANTHROPIC_AUTH_TOKEN`, so the input only satisfies its launch check.
- Agent SDK: TypeScript `options.env` replaces the environment entirely (spread `process.env`); Python `ClaudeAgentOptions(env=...)` merges on top of the inherited environment.
- Remote Control and voice dictation need a claude.ai identity and are unavailable while `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, or `apiKeyHelper` is active; Remote Control is also disabled while `ANTHROPIC_BASE_URL` points at a non-Anthropic host (`claude doctor` names what blocks it). Slack and cloud sessions ignore gateway variables.
- Additional troubleshooting rows: `400` on every request rejecting a tool schema `pattern` on Claude Code v2.1.265 through v2.1.267 (Artifact tool schema with `\p{...}`; update to v2.1.268+ or turn artifacts off); `400` rejecting tool type `advisor_20260301` on v2.1.275 (update to v2.1.276+ or set `CLAUDE_CODE_DISABLE_ADVISOR_TOOL=1`); adaptive thinking `400` applies to Claude Opus 4.6, Claude Sonnet 4.6, Claude Haiku 5.5, Claude Fable 5 and later (`CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1` works on Opus 4.6 / Sonnet 4.6); context-limit `400`s: set `CLAUDE_CODE_AUTO_COMPACT_WINDOW` (clamped to at least 100,000 and at most the model window) and `CLAUDE_CODE_MAX_OUTPUT_TOKENS`; `/fast` messages behind gateways: `CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS=1`, `CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK=1`; `/feedback` writes to `~/.claude/feedback-bundles/` when no Anthropic credential; `forceLoginMethod` / `forceLoginOrgUUID` / `forceLoginGatewayUrl` in managed settings can't coexist with gateway credentials; a `403` HTML body with no gateway log entry is a WAF body-inspection rule (exempt `/v1/messages`); TLS errors: set `NODE_EXTRA_CA_CERTS`.

## Related

- [Run Claude Code through a gateway](./gateways.md)
- [Other LLM gateways](./llm-gateway.md)
- [Roll out an LLM gateway for your organization](./llm-gateway-rollout.md)
- [Gateway protocol reference](./llm-gateway-protocol.md)

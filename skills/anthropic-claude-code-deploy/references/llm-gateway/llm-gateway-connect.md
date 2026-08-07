<!-- source: https://code.claude.com/docs/en/llm-gateway-connect.md / last verified: 2026-08-07 -->

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

## Related

- [Run Claude Code through a gateway](./gateways.md)
- [Other LLM gateways](./llm-gateway.md)
- [Roll out an LLM gateway for your organization](./llm-gateway-rollout.md)
- [Gateway protocol reference](./llm-gateway-protocol.md)

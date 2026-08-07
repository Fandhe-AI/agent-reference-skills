<!-- source: https://code.claude.com/docs/en/llm-gateway-rollout.md / last verified: 2026-08-07 -->

# Roll out an LLM gateway for your organization

Deploy a gateway product for Claude Code: configure it to forward what Claude Code sends, issue developer credentials, distribute the configuration through managed settings, and verify the rollout.

## Signature / Usage

```bash
curl -X POST "https://llm-gateway.example.com/v1/messages" \
  -H "Authorization: Bearer <gateway-key>" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model": "claude-sonnet-4-6", "max_tokens": 1, "messages": [{"role": "user", "content": "."}]}'
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Accept a supported API format | requirement | One of the formats in the API formats table (usually Anthropic Messages at `POST /v1/messages`) |
| Stream responses | requirement | Pass server-sent events through as they arrive, including keep-alive pings |
| Route Claude model names | requirement | Map each model name Claude Code sends to an upstream model |
| Forward headers and body unchanged | requirement | Pass `anthropic-beta`, `anthropic-version`, and the request body through in both directions |
| Return upstream errors unmodified | requirement | Claude Code's automatic recovery matches on error wording |
| Exempt the path from WAF body inspection | requirement | Claude Code prompts contain source code/XML-style tags that match cross-site-scripting body rules |
| `ANTHROPIC_BASE_URL` | distributed var | Always distributed; sends API requests to the gateway |
| `apiKeyHelper` / `ANTHROPIC_AUTH_TOKEN` / `ANTHROPIC_API_KEY` | distributed var | One of the three, to authenticate each request |

## Notes

- Five rollout steps: confirm the gateway routes your models, issue developer credentials, test Claude Code against the gateway, distribute the base URL and credentials, verify from a developer machine.
- Distribute through the `env` block of a managed settings file; do not include `forceLoginMethod`/`forceLoginOrgUUID` alongside a gateway credential (v2.1.146+ blocks gateway credentials when either key is present).
- Some surfaces need separate delivery: the desktop app reads its own third-party inference configuration (not managed settings), CI runners need `ANTHROPIC_BASE_URL` + credential in the runner's own environment, and WSL on managed Windows machines needs `wslInheritsWindowsSettings: true`.
- After rollout, maintain the gateway against three ongoing changes: new `anthropic-beta`/body fields per Claude Code release, new Claude models needing routing entries, and credential rotation.
- Size per-key rate limits accounting for the client retrying transient failures (including `429`s) up to 10 times with backoff, honoring `Retry-After`.

## Related

- [Run Claude Code through a gateway](./gateways.md)
- [Other LLM gateways](./llm-gateway.md)
- [Connect Claude Code to an LLM gateway](./llm-gateway-connect.md)
- [Gateway protocol reference](./llm-gateway-protocol.md)

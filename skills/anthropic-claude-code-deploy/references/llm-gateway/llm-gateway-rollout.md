<!-- source: https://code.claude.com/docs/en/llm-gateway-rollout.md / last verified: 2026-11-14 -->

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

- Source: https://code.claude.com/docs/en/llm-gateway-rollout.md, fetched 2026-11-14

### Additions (2026-11-14)

- Prerequisites: the gateway serves HTTPS at the exact address distributed (not an address that redirects to it; redirects can drop the body or credential, and model discovery treats any redirect as failure); a provider credential (Anthropic API key from the Claude Console, or cloud credentials for Amazon Bedrock / Google Cloud's Agent Platform / Microsoft Foundry); a way to deliver settings files (MDM or configuration management). Optionally serve `GET /v1/models` for model discovery.
- Three credentials: provider credential (held by the gateway), gateway administrative credential (`<gateway-key>`), developer key (`<developer-key>`). Test every routed Claude model name; an unrouted name returns `404`. Checkpoints: `200` with `content` field; `404` = name not routed; `401` from the provider = gateway's provider credential wrong.
- Test with `claude -p "Reply with one word: connected"` using terminal-only exports; match the gateway log on the `/v1/messages` path (Claude Code appends `?beta=true`). `Not logged in` with an empty gateway log = no credential reached the session; `401` naming `x-api-key` = switch to `ANTHROPIC_API_KEY`; a wrong base URL makes Claude Code retry with backoff and can sit silent for several minutes.
- Extra distributable variables: `CLAUDE_CODE_GATEWAY_HINT_HEADERS` (v2.1.273+), `CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS` / `CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK`, `ANTHROPIC_MODEL` / `ANTHROPIC_DEFAULT_HAIKU_MODEL` (route both override names and the built-in IDs, since some background sub-calls request a built-in ID regardless), provider base URLs (`ANTHROPIC_BEDROCK_BASE_URL`, `ANTHROPIC_VERTEX_BASE_URL`, `ANTHROPIC_FOUNDRY_BASE_URL`, `ANTHROPIC_AWS_BASE_URL`), `ANTHROPIC_CUSTOM_HEADERS`, `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY`, `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS`.
- A managed `ANTHROPIC_BASE_URL` is enforced and can't be overridden by a developer's shell export. `forceLoginMethod`, `forceLoginOrgUUID`, or `forceLoginGatewayUrl` in managed settings alongside a gateway credential block it at startup (`This machine's managed settings require a first-party login`, or `Administrator policy requires a Cloud gateway sign-in`). Server-managed settings require a direct connection to `api.anthropic.com` and don't reach gateway-routed sessions; use the file-based path.
- HIPAA: gateway sessions aren't eligible for the HIPAA configuration. Use the managed keys from the monitoring-usage "Map egress paths to managed controls and events" section to restrict features; they don't make a session eligible, no managed key turns off cloud sessions, and the configuration removes Anthropic credentials from child processes (no settings key does only that). Don't substitute `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` (it also disables the auto-updater and leaves WebFetch on).
- Verify with a streaming curl (`"stream": true`, `curl -N`) from a developer machine: `data:` lines should arrive incrementally (a single late burst = buffering). In `/status` the `Setting sources` line should include managed settings for managed distribution. A first-use approval prompt for `ANTHROPIC_API_KEY` is expected on an `x-api-key` gateway. `/fast` may report unavailable/disabled because its check calls `api.anthropic.com` directly.
- Maintain: new Claude Code releases (new `anthropic-beta` values / body fields -> forward `anthropic-*` verbatim, test releases first), new Claude models (add routing entries, update distributed `ANTHROPIC_MODEL` / default-model variables), credential rotation (`apiKeyHelper` handles per-developer rotation).
- Plan upgrades: pin with `requiredMaximumVersion` or `DISABLE_UPDATES`, read the changelog and re-test before raising the pin. Version-dependent changes that raise no error: feature-flag defaults (sessions that don't fetch flags from Anthropic, such as cloud-provider sessions or telemetry off, use defaults built into the installed version; keep constant with the version pin); model capability assumptions for unrecognized IDs such as an alias `prod-opus` (route Anthropic model IDs at the gateway or add a `modelOverrides` entry; on cloud-provider connections declare a pinned model's capabilities); default model and aliases (set `ANTHROPIC_DEFAULT_MODEL`, requires v2.1.236+, and the `ANTHROPIC_DEFAULT_*_MODEL` variables).

## Related

- [Run Claude Code through a gateway](./gateways.md)
- [Other LLM gateways](./llm-gateway.md)
- [Connect Claude Code to an LLM gateway](./llm-gateway-connect.md)
- [Gateway protocol reference](./llm-gateway-protocol.md)

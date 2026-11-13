---
source: https://opencode.ai/docs/console/harnesses/
---

# Harness Setup Commands

Commands for pointing external harnesses (Claude Code, Codex, Hermes, Pi) at Console and adding the Console MCP server.

## Signature / Usage

### Claude Code

Source: https://opencode.ai/docs/console/harnesses/claude-code/

```bash
export ANTHROPIC_BASE_URL="https://opencode.ai/inference/anthropic"
export ANTHROPIC_AUTH_TOKEN="oc_sk_..."
claude --model claude-sonnet-5-5
```

Pick a model for a single run:

```bash
claude --model gpt-6.1-sol
```

Add the Console MCP server:

```bash
claude mcp add --transport http --scope user opencode-console https://opencode.ai/console/mcp
```

### Codex

Source: https://opencode.ai/docs/console/harnesses/codex/

```bash
export OPENCODE_API_KEY="oc_sk_..."
codex
```

```bash
codex --model claude-sonnet-5-5
```

```bash
codex --profile go
```

```bash
codex mcp add opencode-console --url https://opencode.ai/console/mcp
```

If the sign-in does not start automatically:

```bash
codex mcp login opencode-console
```

### Hermes

Source: https://opencode.ai/docs/console/harnesses/hermes/

```bash
hermes model
```

```bash
hermes chat --provider opencode-zen --model claude-sonnet-5-5
```

```bash
hermes mcp add opencode-console --url https://opencode.ai/console/mcp --auth oauth
hermes mcp login opencode-console
```

### Pi

Source: https://opencode.ai/docs/console/harnesses/pi/

```bash
export OPENCODE_API_KEY="oc_sk_..."
pi --model opencode/claude-sonnet-5-5
```

```bash
pi --model opencode-go/kimi-k3
```

```bash
pi --list-models opencode-go
```

```bash
pi mcp add opencode-console --url https://opencode.ai/console/mcp
pi mcp login opencode-console
```

Run `pi update --models` when a new Console model does not appear yet:

```bash
pi update --models
```

## Notes

- `oc_sk_...` is a placeholder for your personal API key; keep real keys out of shell history and version control.
- Free-tier chat models require OpenCode and return HTTP `403` from external harnesses.
- Claude Code: use `ANTHROPIC_AUTH_TOKEN`, not `ANTHROPIC_API_KEY`; run `/logout` first if signed in to a Claude account. The harness itself is covered by anthropic-claude-code.
- Codex: model providers are read only from `~/.codex/config.toml`. The harness itself is covered by openai-codex.
- Hermes: the harness itself is covered by hermes-agent.
- Console MCP endpoint is `https://opencode.ai/console/mcp`; the protocol spec is mcp-spec, and Claude Code / Codex MCP settings are covered by their own skills.
- Config-file snippets (`settings.json`, `config.toml`, `config.yaml`) are in the harness pages and are not repeated here.

## Related

- [Console API requests](./console-api.md)

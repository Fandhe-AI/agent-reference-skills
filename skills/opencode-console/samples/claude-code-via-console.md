---
source: https://opencode.ai/docs/console/harnesses/claude-code/
---

# Claude Code via Console

Point Claude Code at the Console gateway with two environment variables, then persist the setup, switch to Go, and add the Console MCP server.

```bash
export ANTHROPIC_BASE_URL="https://opencode.ai/inference/anthropic"
export ANTHROPIC_AUTH_TOKEN="oc_sk_..."
claude --model claude-sonnet-5-5
```

Persist in every session and map the `opus`, `sonnet`, and `haiku` aliases:

```json title="~/.claude/settings.json"
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://opencode.ai/inference/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "oc_sk_...",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-5-5",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-5-5",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-5-5"
  }
}
```

Go base URL (key from a workspace with a Go subscription):

```json title="~/.claude/settings.json"
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://opencode.ai/inference/go/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "oc_sk_...",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "minimax-m3",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-5-5"
  }
}
```

Pick a model for one run, and add the Console MCP server for all projects:

```bash
claude --model gpt-6.1-sol
claude mcp add --transport http --scope user opencode-console https://opencode.ai/console/mcp
```

## Notes

- Replace `oc_sk_...` with a personal API key; keep real keys out of version control.
- Claude Code appends `/v1/messages` to the base URL, so leave that path off. Run `/status` to confirm the base URL and token.
- Use `ANTHROPIC_AUTH_TOKEN`, not `ANTHROPIC_API_KEY`. If signed in to a Claude account, run `/logout` first.
- Claude Code itself is covered by the anthropic-claude-code skill; this sample only covers pointing it at Console. After `claude mcp add`, run `/mcp`, select `opencode-console`, and sign in from the browser.

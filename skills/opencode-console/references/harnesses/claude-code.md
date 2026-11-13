---
source: https://opencode.ai/docs/console/harnesses/claude-code/
---

# Claude Code

Claude Code speaks the Anthropic Messages API. Point it at Console with two environment variables and use any paid or Go model, including GPT, Gemini, and open models. Console translates the request for models that don't accept Anthropic Messages.

## Signature / Usage

```bash
export ANTHROPIC_BASE_URL="https://opencode.ai/inference/anthropic"
export ANTHROPIC_AUTH_TOKEN="oc_sk_..."
claude --model claude-sonnet-5-5
```

Replace `oc_sk_...` with a [personal API key](./overview.md).

### Configure

Set the variables in `~/.claude/settings.json` to use Console in every session. Map the `opus`, `sonnet`, and `haiku` aliases to Console models so `/model` and background tasks use them.

```json
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

Claude Code appends `/v1/messages` to the base URL, so leave that path off. Run `/status` to confirm the base URL and token are active.

### Go

Use the Go base URL and a key from a workspace with a [Go](https://opencode.ai/docs/console/go/) subscription.

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://opencode.ai/inference/go/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "oc_sk_...",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "minimax-m3",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-5-5"
  }
}
```

### Models

Use any model ID from the [Console](https://opencode.ai/docs/console/models/#endpoints) or [Go](https://opencode.ai/docs/console/go/#endpoints) table. Switch models in a session with `/model`, or pick one for a single run.

```bash
claude --model gpt-6.1-sol
```

### Console MCP

Add the [Console MCP](./overview.md) server for all your projects.

```bash
claude mcp add --transport http --scope user opencode-console https://opencode.ai/console/mcp
```

Run `/mcp` in Claude Code, select `opencode-console`, and sign in from the browser.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `ANTHROPIC_BASE_URL` | env var | `https://opencode.ai/inference/anthropic` (pay-as-you-go) or `https://opencode.ai/inference/go/anthropic` (Go) |
| `ANTHROPIC_AUTH_TOKEN` | env var | Console API key (`oc_sk_...`) |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` / `ANTHROPIC_DEFAULT_SONNET_MODEL` / `ANTHROPIC_DEFAULT_HAIKU_MODEL` | env var | Map the `opus` / `sonnet` / `haiku` aliases to Console model IDs |

## Notes

- Use `ANTHROPIC_AUTH_TOKEN`, not `ANTHROPIC_API_KEY`. If you are signed in to a Claude account, run `/logout` first so Claude Code doesn't send that login to Console.
- Claude Code itself is covered by anthropic-claude-code (settings, env vars by anthropic-claude-code; MCP by anthropic-claude-code-extend); this page covers only routing it through the OpenCode Console gateway.
- Distinct from the OpenCode server HTTP API covered by opencode-build.

## Related

- [Harnesses](./overview.md)
- [Inference API](../api/inference.md)

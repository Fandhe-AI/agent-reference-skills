---
source: https://opencode.ai/docs/console/harnesses/pi/
---

# Pi via Console

Use the built-in `opencode` and `opencode-go` providers of the Pi coding agent, set a default model, and add the Console MCP server.

```bash
export OPENCODE_API_KEY="oc_sk_..."
pi --model opencode/claude-sonnet-5-5
pi --model opencode-go/kimi-k3
pi --list-models opencode-go
```

```json title="~/.pi/agent/settings.json"
{
  "defaultProvider": "opencode-go",
  "defaultModel": "kimi-k3"
}
```

Console MCP (Pi v0.99.0 and later):

```bash
pi mcp add opencode-console --url https://opencode.ai/console/mcp
pi mcp login opencode-console
```

## Notes

- Both providers read the key from `OPENCODE_API_KEY`. Alternatively run `/login opencode` in Pi; the key is stored in `~/.pi/agent/auth.json`.
- Select models as `<provider>/<model-id>`. Run `pi update --models` when a new Console model does not appear yet.
- Free-tier chat models return HTTP `403` from Pi.

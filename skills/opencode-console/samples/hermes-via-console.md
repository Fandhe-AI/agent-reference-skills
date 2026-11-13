---
source: https://opencode.ai/docs/console/harnesses/hermes/
---

# Hermes via Console

Use the built-in OpenCode providers of Hermes Agent for pay-as-you-go (`opencode-zen`) or Go (`opencode-go`), and add the Console MCP server.

```bash
hermes model
hermes chat --provider opencode-zen --model claude-sonnet-5-5
```

```yaml title="~/.hermes/config.yaml"
model:
  provider: opencode-go
  default: kimi-k3
```

Console MCP with OAuth:

```bash
hermes mcp add opencode-console --url https://opencode.ai/console/mcp --auth oauth
hermes mcp login opencode-console
```

Or in the config file (then run `/reload-mcp` in a session):

```yaml title="~/.hermes/config.yaml"
mcp_servers:
  opencode-console:
    url: https://opencode.ai/console/mcp
    auth: oauth
```

## Notes

- Key variables: `OPENCODE_ZEN_API_KEY` for `opencode-zen`, `OPENCODE_GO_API_KEY` for `opencode-go`. `hermes model` saves the pasted key to `~/.hermes/.env`.
- Go requires a session ID on every request; Hermes v0.21.6 and later send it automatically.
- Free-tier chat models return HTTP `403` from Hermes. Use model IDs without a prefix.
- Hermes Agent itself is covered by the hermes-agent skill; this sample only covers Console setup.

---
source: https://opencode.ai/docs/console/harnesses/hermes/
---

# Hermes

[Hermes Agent](https://hermes-agent.nousresearch.com) includes OpenCode providers for pay-as-you-go and Go. It picks the right API for each paid or Go model. Free-tier chat models require OpenCode and return HTTP `403` from Hermes.

## Signature / Usage

Run the model setup and select **OpenCode Zen** for pay-as-you-go or **OpenCode Go** for Go.

```bash
hermes model
```

Paste a [personal API key](./overview.md), then choose a model. Hermes saves the key to `~/.hermes/.env` and the selection to `~/.hermes/config.yaml`.

```yaml
model:
  provider: opencode-go
  default: kimi-k3
```

### Models

Use model IDs from the [Console](https://opencode.ai/docs/console/models/#endpoints) or [Go](https://opencode.ai/docs/console/go/#endpoints) table without a prefix. Switch models in a session with `/model`, or pick one for a single run.

```bash
hermes chat --provider opencode-zen --model claude-sonnet-5-5
```

### Console MCP

Add the [Console MCP](./overview.md) server with OAuth, then sign in from the browser.

```bash
hermes mcp add opencode-console --url https://opencode.ai/console/mcp --auth oauth
hermes mcp login opencode-console
```

Or add it to `~/.hermes/config.yaml` and run `/reload-mcp` in a session.

```yaml
mcp_servers:
  opencode-console:
    url: https://opencode.ai/console/mcp
    auth: oauth
```

## Options / Props

| Provider | Plan | Key variable |
| --- | --- | --- |
| `opencode-zen` | Pay-as-you-go | `OPENCODE_ZEN_API_KEY` |
| `opencode-go` | Go | `OPENCODE_GO_API_KEY` |

## Notes

- Go requires a session ID on every request. Hermes v0.21.6 and later send it automatically.
- Hermes Agent itself is covered by hermes-agent; this page covers only its OpenCode providers. Hermes Agent is unrelated to the Hermes JS engine in react-native.
- Distinct from the OpenCode server HTTP API covered by opencode-build.

## Related

- [Harnesses](./overview.md)

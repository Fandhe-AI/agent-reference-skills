---
source: https://opencode.ai/docs/console/harnesses/pi/
---

# Pi

[Pi](https://pi.dev) includes OpenCode providers for pay-as-you-go and Go. It picks the right API for each paid or Go model. Free-tier chat models require OpenCode and return HTTP `403` from Pi.

## Signature / Usage

Both providers read the key from `OPENCODE_API_KEY`. Create a [personal API key](./overview.md).

```bash
export OPENCODE_API_KEY="oc_sk_..."
pi --model opencode/claude-sonnet-5-5
```

You can also run `/login` in Pi and select the provider. Pi stores the key in `~/.pi/agent/auth.json`.

```text
/login opencode
```

### Go

Use the `opencode-go` provider with a key from a workspace with a [Go](https://opencode.ai/docs/console/go/) subscription.

```bash
pi --model opencode-go/kimi-k3
```

### Models

Select a model as `<provider>/<model-id>`, using IDs from the [Console](https://opencode.ai/docs/console/models/#endpoints) or [Go](https://opencode.ai/docs/console/go/#endpoints) table. List the models Pi knows about with `--list-models`.

```bash
pi --list-models opencode-go
```

Set a default in `~/.pi/agent/settings.json`, or press `Ctrl+S` in the `/model` picker.

```json
{
  "defaultProvider": "opencode-go",
  "defaultModel": "kimi-k3"
}
```

Run `pi update --models` when a new Console model doesn't appear yet.

### Console MCP

Pi v0.99.0 and later support MCP. Add the [Console MCP](./overview.md) server, then sign in from the browser.

```bash
pi mcp add opencode-console --url https://opencode.ai/console/mcp
pi mcp login opencode-console
```

## Options / Props

| Provider | Plan |
| --- | --- |
| `opencode` | Pay-as-you-go |
| `opencode-go` | Go |

## Notes

- Distinct from the OpenCode server HTTP API covered by opencode-build.
- The MCP protocol spec is mcp-spec.

## Related

- [Harnesses](./overview.md)

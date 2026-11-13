---
source: https://opencode.ai/docs/console/harnesses/raycast/
---

# Raycast

Use Console and Go models in Raycast AI Chat, Quick AI, and AI Commands through the [OpenCode extension](https://www.raycast.com/vimtor/opencode). Models provided by extensions require [Raycast Pro](https://www.raycast.com/pro).

## Signature / Usage

The extension loads the models enabled in your workspace and bills them to it. Choose paid or Go models; free-tier chat models require OpenCode and return HTTP `403` from Raycast.

1. Install the extension from the Raycast Store.
2. Create a [personal API key](./overview.md) and paste it into the extension's **API Key** preference.
3. Allow the extension to provide models in the Raycast model picker.

Run **Refresh Models** after enabling or disabling models in the Console.

```text
Refresh Models
```

### Go

Use a key from a workspace with a [Go](https://opencode.ai/docs/console/go/) subscription. The extension then lists the Go models in the model picker.

### Console MCP

Add the [Console MCP](./overview.md) server with the **Install MCP Server** command.

| Field | Value |
| --- | --- |
| Transport | HTTP |
| URL | `https://opencode.ai/console/mcp` |
| OAuth Type | Dynamic |

Raycast asks you to sign in the first time it uses the server.

## Notes

- Distinct from the OpenCode server HTTP API covered by opencode-build.
- Models provided by extensions require Raycast Pro.

## Related

- [Harnesses](./overview.md)

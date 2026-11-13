---
source: https://opencode.ai/docs/console/harnesses/raycast/
---

# Raycast via Console

Use Console and Go models in Raycast AI through the OpenCode extension, and add the Console MCP server.

```text
Refresh Models
```

Console MCP via the **Install MCP Server** command:

| Field      | Value                             |
| ---------- | --------------------------------- |
| Transport  | HTTP                              |
| URL        | `https://opencode.ai/console/mcp` |
| OAuth Type | Dynamic                           |

## Notes

- Models provided by extensions require Raycast Pro.
- Install the extension, paste a personal API key (`oc_sk_...`) into the **API Key** preference, and allow the extension to provide models in the model picker.
- Run **Refresh Models** after enabling or disabling models in the Console.
- Free-tier chat models return HTTP `403` from Raycast.
- Use a key from a workspace with a Go subscription to list Go models.

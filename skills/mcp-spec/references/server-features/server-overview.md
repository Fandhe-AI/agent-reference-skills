---
source: https://modelcontextprotocol.io/specification/2026-07-28/server
---

# Server Features Overview

Servers provide the fundamental building blocks for adding context to language models via MCP: Prompts, Resources, and Tools.

## Signature / Usage

Control hierarchy of the three server primitives:

| Primitive | Control                | Description                                        | Example                         |
| --------- | ---------------------- | -------------------------------------------------- | ------------------------------- |
| Prompts   | User-controlled        | Interactive templates invoked by user choice       | Slash commands, menu options    |
| Resources | Application-controlled | Contextual data attached and managed by the client | File contents, git history      |
| Tools     | Model-controlled       | Functions exposed to the LLM to take actions       | API POST requests, file writing |

Each primitive is declared as a capability in the `server/discover` result:

```json
{
  "capabilities": {
    "tools": {},
    "resources": {},
    "prompts": {}
  }
}
```

## Notes

- The capability snippet above is assembled from the capability examples on the Prompts, Resources, Tools, and Discovery pages; the Overview page itself contains only the table and links.
- Source: tag `2026-07-28` raw (`docs/specification/2026-07-28/server/index.mdx`).

## Related

- [server/discover](./discover.md)
- [Prompts](./prompts.md)
- [Resources](./resources.md)
- [Tools](./tools.md)

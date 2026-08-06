# MCP server

The Model Context Protocol (MCP) is an open specification for connecting AI clients to external tools and data. A plugin includes an MCP server when it needs to read live information, take actions, or integrate with another service. The MCP server is optional — a plugin that only provides instructions and resources can consist of skills alone.

## Options / Props

| Capability | Description |
|------|-------------|
| Tools | Functions the model can call with structured inputs; each has a name, description, input schema, and optional output schema. |
| Resources | Data or content the client can read. |
| Prompts | Reusable prompt templates. |
| Instructions | Server-wide guidance for using its capabilities. |

## Notes

- Tool call flow: the client discovers exposed tools, the model selects a tool and supplies arguments matching its input schema, the server validates the request and returns a result, and the model uses the result to continue the conversation.
- Tool results should work without custom UI; return concise text or structured content. An MCP server can optionally also return a UI resource for clients that support MCP Apps.
- Deploy production MCP servers at stable HTTPS endpoints using the streamable HTTP transport; protect servers with the MCP specification's authorization flow when tools access private data or perform actions for a user.
- Official SDKs: Python (`modelcontextprotocol/python-sdk`) and TypeScript (`modelcontextprotocol/typescript-sdk`).
- This is the "MCP server" side that publishes a ChatGPT/Codex plugin. The side that *consumes* MCP servers as a client is covered by the openai-agents skill, not this one.

## Related

- [Plugin Architecture](./plugin-architecture.md)
- [Skills (plugin skills)](./plugin-skills.md)
- [UI guidelines](./ui-guidelines.md)

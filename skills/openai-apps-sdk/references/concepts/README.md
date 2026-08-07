# concepts

The MCP here is the server side that publishes a ChatGPT/Codex plugin (skills + tools). Consuming MCP servers as a client is covered by the openai-agents skill, not this one.

| Name | Description | Path |
|------|-------------|------|
| Quickstart | Connect an MCP server and invoke it as a personal plugin from ChatGPT Work | [quickstart.md](./quickstart.md) |
| Plugin Architecture | Plugin shapes: skills only, MCP server only, both, MCP server with UI | [plugin-architecture.md](./plugin-architecture.md) |
| MCP server | What an MCP server exposes (tools/resources/prompts/instructions), tool call flow, transport/auth | [mcp-server.md](./mcp-server.md) |
| Skills (plugin skills) | SKILL.md-based instruction folders that guide the model through MCP tool workflows | [plugin-skills.md](./plugin-skills.md) |
| UI guidelines | Display modes (inline card/carousel, fullscreen, PiP) and visual design system | [ui-guidelines.md](./ui-guidelines.md) |
| Brainstorm Plugin Use Cases | Building a use-case inventory and mapping it to skill/MCP/UI decisions | [plan-use-cases.md](./plan-use-cases.md) |
| Define tools | Tool contract fields, read/write separation, descriptions, safety annotations | [define-tools.md](./define-tools.md) |

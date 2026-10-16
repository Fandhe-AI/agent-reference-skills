# Concepts

| Name | Description | Path |
|------|-------------|------|
| Brainstorm Plugin Use Cases | Before building, list what people will expect the plugin to do based on its name, description, skills, tools, and existing product connection. | [plan-use-cases.md](./plan-use-cases.md) |
| Define tools | Tools are the actions and data that a plugin's MCP server exposes to ChatGPT and Codex, defined after brainstorming use cases and before implementing the server. | [define-tools.md](./define-tools.md) |
| MCP server | The Model Context Protocol (MCP) is an open specification for connecting AI clients to external tools and data; a plugin includes an MCP server only when it needs live data, actions, or integrations. | [mcp-server.md](./mcp-server.md) |
| Plugin Architecture | Plugins are the packages people discover, install, share, and publish in ChatGPT and Codex, and can contain skills, an MCP server, or both. | [plugin-architecture.md](./plugin-architecture.md) |
| Skills (plugin skills) | Skills are folders of instructions and resources that teach ChatGPT and Codex how to complete repeatable workflows. | [plugin-skills.md](./plugin-skills.md) |
| Quickstart | Plugins extend and customize ChatGPT and Codex; this tutorial creates a personal plugin by connecting an MCP server and invoking its tool from ChatGPT Work. | [quickstart.md](./quickstart.md) |
| UI guidelines | Optional plugin UI extends what users can do without breaking the flow of conversation; use cards, carousels, and fullscreen views only when they improve the workflow. | [ui-guidelines.md](./ui-guidelines.md) |

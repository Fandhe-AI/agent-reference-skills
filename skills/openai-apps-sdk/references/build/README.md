# build

This category covers building a plugin's server-side implementation: the MCP server that exposes tools, optional ChatGPT/Codex UI rendered in an iframe, authentication, skills, packaging, and monetization. This is the side that publishes an MCP server as a ChatGPT/Codex plugin — consuming an MCP server (Agents SDK integrations, connectors) is covered by the openai-agents skill.

| Name | Description | Path |
|------|-------------|------|
| App quickstart | End-to-end tutorial: build a web component + MCP server for a to-do plugin | [app-quickstart.md](./app-quickstart.md) |
| MCP server | Build tools, return results, import skills, authenticate, deploy the endpoint | [mcp-server.md](./mcp-server.md) |
| Add UI to your MCP server | MCP Apps bridge, `window.openai` extensions, presentation, state management, React scaffolding | [chatgpt-ui.md](./chatgpt-ui.md) |
| Authentication | OAuth 2.1 flow, protected resource metadata, CIMD/DCR, mTLS, token verification | [auth.md](./auth.md) |
| Build skills | Author `SKILL.md`, connect skills to MCP tools, import from MCP, package | [build-skills.md](./build-skills.md) |
| Package your plugin | `plugin.json` manifest, marketplaces, local testing, distribution | [package-plugin.md](./package-plugin.md) |
| Checkout and monetization | External checkout, saved payment methods, ChatGPT payment sheet, `complete_checkout` tool | [checkout-monetization.md](./checkout-monetization.md) |

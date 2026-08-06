# Using Tools

Overview of how to extend model capabilities in the Responses API: built-in tools, function calling, tool search, and remote MCP servers.

## Key Tool Categories

- **Web Search**: models retrieve current internet data. Include `{"type": "web_search"}` in the `tools` parameter.
- **File Search**: uploaded documents become searchable by providing vector store IDs; the model references specific file contents during response generation.
- **Tool Search**: available on `gpt-5.4` and later. Defers tool definitions until the model decides they're needed, optimizing token usage by loading only relevant tools at runtime.
- **Function Calling**: custom functions defined with JSON schemas let the model invoke your own code with specified parameters.
- **Remote MCP Servers**: Model Context Protocol connects external services by specifying a server URL and description.

## Notes

- In the Agents SDK, tools can be attached directly to agents, exposed as tools for manager control, or wrapped as function tools — see the `agents-sdk` scope for those SDK-level APIs, not this page.
- Remote MCP servers and connectors are covered under the `mcp` scope, not here.

## Related

- [Function Tools](./function-tools.md)
- [Tool Search](./tool-search.md)

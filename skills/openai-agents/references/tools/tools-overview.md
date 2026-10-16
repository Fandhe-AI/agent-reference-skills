# Using Tools

Overview of how to extend model capabilities in the Responses API: built-in tools, function calling, tool search, and remote MCP servers.

## Key Tool Categories

Available tools (per the official overview):

- **Function calling**: custom functions defined with JSON schemas let the model invoke your own code with specified parameters.
- **Web search**: models retrieve current internet data. Include `{"type": "web_search"}` in the `tools` parameter.
- **Remote MCP servers**: Model Context Protocol connects external services by specifying a server URL and description.
- **Skills**: upload and reuse versioned skill bundles in hosted shell environments.
- **Shell**: run shell commands in hosted containers or in your own local runtime.
- **Computer use**: agentic workflows that let a model control a computer interface.
- **Image generation**: generate or edit images using GPT Image.
- **File search**: uploaded documents become searchable by providing vector store IDs; the model references specific file contents during response generation.
- **Tool search**: available on `gpt-5.4` and later. Defers tool definitions until the model decides they're needed, optimizing token usage by loading only relevant tools at runtime.
- **Programmatic Tool Calling**: let models compose and run JavaScript that orchestrates tool calls.

## Notes

- Choose the integration for your runtime: configure tools on Responses API requests, on Agents API agents, or in Agents SDK definitions. Tool availability, configuration, and call handling depend on the integration.
- Agents API: the Agents API runs the agent loop for you. Configure tools in `agent.tools`, handle function calls in your application, and connect a sandbox when the tools need an execution environment. Programmatic Tool Calling is enabled by default, and skills are discovered through the sandbox's capability directories.
- In the Agents SDK, tools can be attached directly to agents, exposed as tools for manager control, or wrapped as function tools — see the `agents-sdk` scope for those SDK-level APIs, not this page.
- Remote MCP servers and connectors are covered under the `mcp` scope, not here.

## Related

- [Function Tools](./function-tools.md)
- [Tool Search](./tool-search.md)

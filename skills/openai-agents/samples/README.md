# samples

| Name | Description | Path |
| --- | --- | --- |
| Single Agent with a Function Tool | Define one Agent and give it a custom Python function as a tool | [single-agent-function-tool.md](./single-agent-function-tool.md) |
| Web Search Built-in Tool | Let the model search the web for current information via the `web_search` built-in tool | [web-search-tool.md](./web-search-tool.md) |
| File Search Built-in Tool | Retrieve information from an uploaded knowledge base via the `file_search` built-in tool and a vector store | [file-search-tool.md](./file-search-tool.md) |
| Connecting an Agent to a Remote MCP Server | Give an Agent access to tools exposed by a remote MCP server via `HostedMCPTool` or `MCPServerStreamableHttp` | [remote-mcp-server.md](./remote-mcp-server.md) |
| Multi-Agent Orchestration with Handoffs | Delegate a conversation branch from a triage Agent to a specialist Agent using handoffs | [multi-agent-handoffs.md](./multi-agent-handoffs.md) |
| Input Guardrails | Run a lightweight checker Agent before the main Agent processes a request, aborting on a tripwire condition | [input-guardrails.md](./input-guardrails.md) |
| Streaming Agent Output | Stream an Agent's response token by token instead of waiting for the full result | [streaming-output.md](./streaming-output.md) |

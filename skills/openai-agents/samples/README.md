# samples

| Name | Description | Path |
| --- | --- | --- |
| Agents API Function Tool | Let an Agents API session call your application code: define a function, handle `required_actions`, and return the result. | [agents-api-function-tool.md](./agents-api-function-tool.md) |
| Agents API Hosted Session | Run a task in an OpenAI-managed session (create and submit the task, follow progress, continue, delete) with `client.beta.agents.sessions`. | [agents-api-hosted-session.md](./agents-api-hosted-session.md) |
| File Search Built-in Tool | Retrieve information from an uploaded knowledge base via the `file_search` built-in tool and a vector store. | [file-search-tool.md](./file-search-tool.md) |
| Input Guardrails | Run a lightweight checker Agent before the main Agent processes a request, and abort the run if a tripwire condition is met. | [input-guardrails.md](./input-guardrails.md) |
| Multi-Agent Orchestration with Handoffs | Delegate a conversation branch from a triage Agent to a specialist Agent using handoffs. | [multi-agent-handoffs.md](./multi-agent-handoffs.md) |
| Connecting an Agent to a Remote MCP Server | Give an Agent access to tools exposed by a remote MCP server, either via the hosted `HostedMCPTool` or a directly managed `MCPServerStreamableHttp` connection. | [remote-mcp-server.md](./remote-mcp-server.md) |
| Single Agent with a Function Tool | Define one Agent and give it a custom Python function as a tool. | [single-agent-function-tool.md](./single-agent-function-tool.md) |
| Streaming Agent Output | Stream an Agent's response token by token instead of waiting for the full result. | [streaming-output.md](./streaming-output.md) |
| Web Search Built-in Tool | Let the model search the web for current information via the `web_search` built-in tool. | [web-search-tool.md](./web-search-tool.md) |

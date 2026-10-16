# Sessions

| Name | Description | Path |
|------|-------------|------|
| Session budgets | Optional hard spend ceiling set when creating a session, enforced at public list rates. | [budgets.md](./budgets.md) |
| Adding files | Upload files via the Files API and mount them in a session's sandbox for the agent to read and process. | [files.md](./files.md) |
| Accessing GitHub | Mount a GitHub repository into the session sandbox and connect to the GitHub MCP server for cloning, reading, and creating pull requests. | [github.md](./github.md) |
| MCP connector | Connect Model Context Protocol (MCP) servers to a Managed Agents agent, giving it access to external tools, data sources, and services. | [mcp-connector.md](./mcp-connector.md) |
| Using agent memory | Memory stores give agents persistent memory across sessions: a workspace-scoped collection of text documents, mounted as a directory in the sandbox, that the agent reads/writes with normal file tools. | [memory.md](./memory.md) |
| Permission policies | Control whether server-executed tools (built-in agent toolset and MCP toolset) run automatically or wait for approval. | [permission-policies.md](./permission-policies.md) |
| Reference | Event types, self-hosted worker CLI flags, supported MCP server types, rate limits, and branding guidelines for Claude Managed Agents. | [reference.md](./reference.md) |
| Inspect sessions and track usage | Inspect a session in the Claude Console session viewer, read its token usage and list cost, and debug unexpected agent behavior. | [session-observability.md](./session-observability.md) |
| Session operations | Retrieve, list, update, archive, and delete Claude Managed Agents sessions once they exist. | [session-operations.md](./session-operations.md) |
| Start a session | A session is an agent instance within an environment. | [sessions.md](./sessions.md) |
| Skills | Reusable, filesystem-based resources that give an agent domain-specific expertise. | [skills.md](./skills.md) |
| Restrict web search and web fetch domains | Control which sites an agent's `web_search` and `web_fetch` tools can reach, cap fetched content, and localize search results. | [tools-web-restrictions.md](./tools-web-restrictions.md) |
| Tools | Built-in tools Claude uses autonomously within a session, plus custom user-defined tools your application executes and returns results for. | [tools.md](./tools.md) |

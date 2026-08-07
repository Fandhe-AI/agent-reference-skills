# Sessions

Claude Managed Agents のセッション運用ガイド。Agent SDK の sessions は anthropic-agent-sdk、Claude Code のセッションは anthropic-claude-code を参照。skills / tools / mcp-connector ページは Managed Agents からの利用方法で、API 本体は anthropic-api-tools-mcp を参照。

| Name | Description | Path |
|------|-------------|------|
| Adding files | Upload files via Files API and mount them in session sandbox for agent to read and process. | [files.md](./files.md) |
| Accessing GitHub | Mount GitHub repository into session sandbox and connect to GitHub MCP server for cloning and PRs. | [github.md](./github.md) |
| Using agent memory | Give agents persistent memory across sessions via memory stores (mounted directories agent reads/writes). | [memory.md](./memory.md) |
| MCP connector | Connect Model Context Protocol servers to agents, keeping server declaration separate from session-level authentication. | [mcp-connector.md](./mcp-connector.md) |
| Permission policies | Control whether server-executed tools run automatically or wait for approval before execution. | [permission-policies.md](./permission-policies.md) |
| Reference | Event types, self-hosted worker CLI flags, supported MCP server types, rate limits, and branding guidelines. | [reference.md](./reference.md) |
| Session operations | Retrieve, list, update, archive, and delete sessions; manage status and mid-session tool configuration. | [session-operations.md](./session-operations.md) |
| Start a session | Create an agent instance within an environment, maintaining conversation history across interactions. | [sessions.md](./sessions.md) |
| Skills | Attach reusable, filesystem-based resources providing domain-specific expertise to agents. | [skills.md](./skills.md) |
| Tools | Built-in sandbox tools and custom user-defined tools that agents use autonomously or with confirmation. | [tools.md](./tools.md) |

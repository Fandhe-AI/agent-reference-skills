# Sessions

Claude Managed Agents のセッション運用ガイド。Agent SDK の sessions は anthropic-agent-sdk、Claude Code のセッションは anthropic-claude-code を参照。skills / tools / mcp-connector ページは Managed Agents からの利用方法で、API 本体は anthropic-api-tools-mcp を参照。

| Name | Description | Path |
|------|-------------|------|
| Session budgets | Optional hard spend ceiling set when creating a sess… | [budgets.md](./budgets.md) |
| Adding files | Upload files via the Files API and mount them in a s… | [files.md](./files.md) |
| Accessing GitHub | Mount a GitHub repository into the session sandbox a… | [github.md](./github.md) |
| MCP connector | Connect Model Context Protocol (MCP) servers to a Man… | [mcp-connector.md](./mcp-connector.md) |
| Using agent memory | Memory stores give agents persistent memory across s… | [memory.md](./memory.md) |
| Permission policies | Control whether server-executed tools (built-in agen… | [permission-policies.md](./permission-policies.md) |
| Reference | Event types, self-hosted worker CLI flags, supported… | [reference.md](./reference.md) |
| Inspect sessions and track usage | Inspect a session in the Claude Console session view… | [session-observability.md](./session-observability.md) |
| Session operations | Retrieve, list, update, archive, and delete Claude M… | [session-operations.md](./session-operations.md) |
| Start a session | A session is an agent instance within an environment… | [sessions.md](./sessions.md) |
| Skills | Reusable, filesystem-based resources that give an ag… | [skills.md](./skills.md) |
| Restrict web search and web fetch domains | Control which sites an agent's `web_search` and `web_… | [tools-web-restrictions.md](./tools-web-restrictions.md) |
| Tools | Built-in tools Claude uses autonomously within a sess… | [tools.md](./tools.md) |

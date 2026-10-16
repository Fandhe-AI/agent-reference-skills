# Sessions

| Name | Description | Path |
|------|-------------|------|
| Session budgets | Optional hard spend ceiling set at session creation; the session pauses (idle) when the cap is reached. | [budgets.md](./budgets.md) |
| Adding files | Upload files via the Files API and mount them in a session's sandbox. | [files.md](./files.md) |
| Accessing GitHub | Mount a GitHub repository into the session sandbox and use the GitHub MCP server. | [github.md](./github.md) |
| MCP connector | Connect MCP servers to an agent; authentication is supplied at session creation via vaults. | [mcp-connector.md](./mcp-connector.md) |
| Using agent memory | Memory stores give agents persistent text memory across sessions, mounted as a sandbox directory. | [memory.md](./memory.md) |
| Permission policies | Control whether server-executed tools run automatically or wait for approval. | [permission-policies.md](./permission-policies.md) |
| Reference | Event types, self-hosted worker CLI flags, supported MCP server types, rate limits, and branding guidelines. | [reference.md](./reference.md) |
| Inspect sessions and track usage | Inspect a session in the Claude Console, read its token usage and cost, and debug agent behavior. | [session-observability.md](./session-observability.md) |
| Session operations | Retrieve, list, update, archive, and delete sessions after they exist. | [session-operations.md](./session-operations.md) |
| Start a session | A session is an agent instance within an environment; create it, then send a user.message or use initial_events. | [sessions.md](./sessions.md) |
| Skills | Reusable filesystem-based resources that give an agent domain expertise: pre-built and custom skills. | [skills.md](./skills.md) |
| Restrict web search and web fetch domains | Restrict which sites web_search and web_fetch can reach, cap fetched content, and localize results. | [tools-web-restrictions.md](./tools-web-restrictions.md) |
| Tools | Built-in tools Claude uses autonomously in a session, plus custom tools your application executes. | [tools.md](./tools.md) |

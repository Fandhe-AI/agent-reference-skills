# AI Tools

Connect your AI coding agent to Supabase.

## Signature / Usage

Supabase provides everything you need to connect an AI coding agent to your project: a live connection to your database and platform (MCP), portable instructions your agent can reuse (Agent Skills), a one-step bundle of both (Plugin), and copy-paste prompts for tools that don't support any of the above.

### Key concepts

- **MCP (Model Context Protocol)**: a live connection between your agent and your actual Supabase project. Once connected, your agent can call tools to query data, run migrations, deploy Edge Functions, and more.
- **Agent Skills**: portable, on-demand instructions your agent loads when it needs Supabase- or Postgres-specific procedural knowledge. Skills don't require a live connection, and work across different agents.
- **Plugin**: a single install that bundles the MCP server and Agent Skills together for a specific agent.
- **Prompts**: static prompt files you copy into your project for agents that don't support MCP, plugins, or skills natively.

### Pick your agent

- Plugins page (`/docs/guides/ai-tools/plugins`): Antigravity, Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot, Grok, Kimi Code, omp, VS Code
- MCP page (`/docs/guides/ai-tools/mcp`): Devin Desktop, Factory, fx, Goose, Kiro, OpenCode, Warp

### Local projects for parallel agents

Agents that work in separate git worktrees or branches each need their own database. Otherwise migrations and seed data from one task affect another. With the experimental `supabase stack` commands turned on, `supabase start` gives each worktree or branch its own local Supabase project with its own ports and data. Agents that share one checkout and branch share a local project, so give each agent its own worktree. The commands also run without Docker on Linux and on macOS on Apple silicon, which covers agent sandboxes that have no container engine.

```bash
supabase start
```

### Building AI into your app?

The tools above are for your development workflow. If you're building AI capabilities into your own product:

- Deploy MCP servers: Host your own MCP server on Supabase Edge Functions so your users can connect their AI agents to your product
- Vectors / Embeddings: Build semantic search, RAG pipelines, and other AI-powered features using pgvector

## Notes

- The enabling config key is written as `[experimental] stack` on the MCP page. The overview has no config snippet; see Running multiple local projects for the exact form.
- The official page also points to Supabase Evals (https://supabase.com/evals), an open-source benchmark for AI coding agents.
- Source: https://supabase.com/docs/guides/ai-tools (fetched 2026-10-17, no version pin)

## Related

- [Supabase MCP Server](./mcp.md)
- [Supabase Plugin](./plugins.md)
- [Agent Skills](./agent-skills.md)
- [Deploy MCP servers](./byo-mcp.md)
- [Running multiple local projects](../local-dev/running-multiple-local-projects.md)
- [Docker and native runtimes](../local-dev/docker-and-native-runtimes.md)
- [RAG pipelines](../ai/rag.md)

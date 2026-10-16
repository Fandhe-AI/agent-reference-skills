# Supabase Plugin for AI Coding Agents

One-click setup for Supabase in your AI coding agent.

## Signature / Usage

The Supabase plugin for AI coding agents bundles the MCP server and agent skills into a single install for your AI coding agent, so your agent can query your database, manage migrations, deploy Edge Functions, and follow Supabase and Postgres best practices without manual configuration.

```bash
npx plugins add supabase-community/supabase-plugin
```

The `plugins` package auto-detects your installed AI coding agents and installs the Supabase plugin to all of them with one command. Use `--yes` to skip the confirmation prompt.

### What's included

- Supabase MCP server: connects your AI coding agent directly to your Supabase projects. Once authenticated, your agent can query your database, manage migrations, deploy Edge Functions, and more.
- `supabase`: core guidance for working with Supabase products (Database, Auth, Edge Functions, Storage, Realtime)
- `supabase-postgres-best-practices`: Postgres query optimization, schema design, connection management, and RLS patterns

## Notes

- Plugins for AI coding agents are packages of AI agent extensions. A single plugin can bundle any combination of MCP servers, Skills, Hooks, Agents, and Slash commands.
- You can also install the MCP server and agent skills separately. You can install the plugin globally to use it across all your projects, or per project to keep it isolated.
- Per-agent manual installation steps are rendered by an agent-picker UI on the official page; the fetched source has that part empty, so they are not recorded here.
- Source: https://supabase.com/docs/guides/ai-tools/plugins (fetched 2026-10-17, no version pin)

## Related

- [Supabase MCP Server](./mcp.md)
- [Agent Skills](./agent-skills.md)
- [AI Tools](./overview.md)

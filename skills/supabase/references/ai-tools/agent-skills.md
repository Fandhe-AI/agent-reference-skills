# Agent Skills

Agent Skills are folders of instructions, scripts, and resources that agents can discover and use to do things more accurately and efficiently. Supabase publishes two in the `supabase/agent-skills` repository.

## Signature / Usage

Install all Supabase skills using the skills CLI:

```bash
npx skills add supabase/agent-skills
```

To install a specific skill from the repository:

```bash
npx skills add supabase/agent-skills --skill SKILL_NAME
```

Updating (we update our agent skills frequently, so check for and install updates regularly):

```bash
npx skills update
```

To update specific skills instead, pass their names, e.g. `npx skills update SKILL_NAME`. To search for community skills: `npx skills find QUERY`.

### Available skills

| Skill | Use |
| --- | --- |
| `supabase` | Use when doing ANY task involving Supabase: products (Database, Auth, Edge Functions, Realtime, Storage, Vectors, Cron, Queues); client libraries and SSR integrations (supabase-js, @supabase/ssr); auth issues; Supabase CLI or MCP server; schema changes, migrations, declarative schemas, security audits, Postgres extensions; debugging and troubleshooting; reading or querying logs |
| `supabase-postgres-best-practices` | Postgres best practices maintained by Supabase, for Postgres running anywhere. Load BEFORE writing or changing anything that lives in a Postgres database: tables and columns, schema design, migrations, RLS policies and their tests, indexes, triggers, database functions, queues and scheduled jobs, pgvector, restoring dumps; also for diagnosing slow queries, timeouts, connection exhaustion, locking, bloat |

```bash
npx skills add supabase/agent-skills --skill supabase
npx skills add supabase/agent-skills --skill supabase-postgres-best-practices
```

## Options / Props

| Option | Description |
| --- | --- |
| `--skill SKILL_NAME` | Install a specific skill from the repository |
| `--global` | Install across all your projects (default is project scope) |
| `--all` | Add skills for all detected agents at the same time |

## Notes

- Skills are installed at project scope by default, placing them in your repository so contributors and cloud agents all share the same setup.
- You can also install the agent skills together with the Supabase MCP server using the Supabase Plugin for a combined one-step setup.
- Repository: https://github.com/supabase/agent-skills
- Source: https://supabase.com/docs/guides/ai-tools/ai-skills (fetched 2026-10-17, no version pin)

## Related

- [Supabase Plugin](./plugins.md)
- [Supabase MCP Server](./mcp.md)
- [AI Tools](./overview.md)

---
source: https://orm.drizzle.team/docs/agents
---

# Set up your AI agent

Set up Drizzle skills and a project-local Drizzle Kit MCP server with one prompt.

## Signature / Usage

Give your coding agent Drizzle skills and access to your project's Drizzle Kit.

The setup instructions currently target the `@rc` packages. Existing legacy or beta projects need a separate upgrade.

### Copy into your agent

Open your coding agent in your project, then paste this prompt. The prompt text is in [agent-setup-prompt.md](./agent-setup-prompt.md).

### What setup does

1. **Checks your Drizzle packages.** Uses your project's package manager and existing compatible rc versions. Missing packages are installed from `drizzle-orm@rc` and `drizzle-kit@rc`.
2. **Installs the Drizzle skill.** Adds the instructions bundled with your installed Kit so your agent can work with schema, queries, and migrations.
3. **Connects Drizzle Kit.** Configures a local MCP server for your agent and verifies the connection. Some clients need a new session or approval before the tools become available.

Setup keeps your existing agent configuration. It does not change your application's schema, generate migrations, or apply changes to a database.

### After setup

Your agent reports what was installed and whether you need to approve access or restart your session.

Once your agent confirms the skill and tools are available, give it a first task:

```text
Use the drizzle skill to inspect my Drizzle schema and config. Explain the
migration workflow this project uses. Do not change files or the database.
```

### Set up manually

- [Install the Drizzle skill](./drizzle-kit-skills.md) for project and migration guidance.
- [Connect the MCP server](./drizzle-kit-mcp.md) so your agent can use the Kit installed in your project.

## Notes

- Source: https://orm.drizzle.team/docs/agents (docs repo commit 55f7f9e, retrieved 2026-11-14)
- The official page embeds the setup prompt through an Astro component (`AgentSetupPrompt`); the component is omitted here and its canonical text is kept in `agent-setup-prompt.md`.
- "Skill" and "MCP server" here mean Drizzle Kit's own bundled agent skill and MCP server (`drizzle-kit@rc`). They are distinct from Claude Code Agent Skills and from repository skills installed with `npx skills`, and from the generic Model Context Protocol specification (see the skills `mcp-spec` and `anthropic-claude-code-extend`).
- `drizzle-kit mcp` and `drizzle-kit skills` first shipped in 1.0.0-rc.4. In rc.5 the bundled skills were merged into a single skill named `drizzle` (Source: https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v1rc5).

## Related

- [drizzle-kit-skills.md](./drizzle-kit-skills.md)
- [drizzle-kit-mcp.md](./drizzle-kit-mcp.md)
- [agent-setup-prompt.md](./agent-setup-prompt.md)

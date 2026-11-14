---
source: https://orm.drizzle.team/docs/drizzle-kit-skills
---

# Drizzle agent skills

Install the Drizzle skill bundled with Drizzle Kit and keep your agent's instructions matched to your installed version.

## Signature / Usage

Use the `drizzle` skill when working on Drizzle schema, queries or config with your coding agent. It covers:

- Choosing a migration workflow for your project.
- Handling renames and data-loss decisions.
- Resolving migration conflicts and upgrading snapshots.

You can use the skill with the [MCP server](./drizzle-kit-mcp.md), the CLI or the SDK.

### Quick start

#### 1. Install Drizzle in your project

These examples use rc5. Install the packages where your Drizzle schema and config live. In a monorepo, use that workspace package:

```shell
npm i drizzle-orm@rc
npm i -D drizzle-kit@rc
```

#### 2. Install the skill from your project's Drizzle Kit

Upgrading skills from rc4: rc5 replaces rc4's separate skills with one `drizzle` skill and automatically removes the old project skills. Back up any custom edits before upgrading. User-level skills are unchanged.

Run the skills command from your Drizzle package directory.

npm:

```shell
npx --no-install drizzle-kit skills
```

yarn:

```shell
yarn drizzle-kit skills
```

pnpm:

```shell
pnpm exec drizzle-kit skills
```

bun:

```shell
bun run drizzle-kit skills
```

Choose your agent and installation scope when prompted. Installation needs network access to run `skills@latest`, but the Drizzle instructions come from your project's installed Drizzle Kit.

#### 3. Ask your agent to use the Drizzle skill

Use your agent's skill picker or ask it to load the `drizzle` skill. For example:

```text
Use the drizzle skill. In src/db/schema.ts, rename users.full_name
to users.display_name and generate a migration. Show me the SQL
before applying anything to the database.
```

The skill guides your agent through the rename decision so the migration preserves the existing column's data. Generating the migration does not apply it. Your agent's permissions and approval settings still govern command execution.

### Keep the installed instructions current

After updating Drizzle Kit, rerun the installation command (step 2 above) to refresh the skill.

See the [skill source and topic files](https://github.com/drizzle-team/drizzle-orm/blob/beta/drizzle-kit/skills/drizzle/SKILL.md) for the full instructions.

## Notes

- Source: https://orm.drizzle.team/docs/drizzle-kit-skills (docs repo commit 55f7f9e, retrieved 2026-11-14)
- This is Drizzle Kit's own bundled agent skill (`drizzle-kit@rc`, installed with `drizzle-kit skills`). It is distinct from Claude Code Agent Skills and from repository skills installed with `npx skills`, and from the generic Model Context Protocol specification (see the skills `mcp-spec` and `anthropic-claude-code-extend`).
- Admonition and step wrappers were unwrapped; the "Upgrading skills from rc4" warning is kept as a plain sentence.
- `drizzle-kit skills` first shipped in 1.0.0-rc.4; rc.5 merged the bundled skills into the single `drizzle` skill (Source: https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v1rc5).
- The rc.5 release notes name the seven removed older project skills: `drizzle-generate`, `drizzle-push`, `drizzle-pull`, `drizzle-migrations`, `drizzle-hints`, `drizzle-output-modes` and `drizzle-responses-and-errors` (removed by the command without a question).
- The setup prompt (`agent-setup-prompt.md`) lists the same seven older skill names as the rc.5 release notes; the sources show no conflicting skill count.

## Related

- [agents.md](./agents.md)
- [drizzle-kit-mcp.md](./drizzle-kit-mcp.md)
- [agent-setup-prompt.md](./agent-setup-prompt.md)

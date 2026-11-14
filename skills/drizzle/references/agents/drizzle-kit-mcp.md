---
source: https://orm.drizzle.team/docs/drizzle-kit-mcp
---

# Drizzle Kit MCP server

Connect your AI agent to your project's Drizzle Kit, generate migrations from chat and add workflow guidance with the Drizzle skill.

## Signature / Usage

The Drizzle Kit MCP server lets you ask your coding agent to generate migrations, check migration history or pull a schema from an existing database. The agent calls the Drizzle Kit installed in your project.

Connecting the server gives your agent access to operations that write project files and change the database selected by your config. Generating a migration writes a file but does not apply it to the database. Your client's permissions and approval settings govern tool execution.

### Quick start

#### 1. Install Drizzle in your project

These examples use `drizzle-kit@rc` and `drizzle-orm@rc`. Install them in the package that owns your Drizzle schema and config:

```shell
npm i drizzle-orm@rc
npm i -D drizzle-kit@rc
```

In a monorepo, use the workspace package that uses Drizzle. **Start the MCP server from that directory** so it can find both packages and your config.

The server uses your project's [Drizzle Kit configuration](../drizzle-kit/drizzle-config-file.md). For `push` or `pull`, that config also needs database credentials.

#### 2. Connect your MCP client

Choose your client below. For CLI setup, run the command from your Drizzle package with the client's CLI installed.

##### Claude Code

Register the server for this project:

```shell
claude mcp add --transport stdio --scope project drizzle -- npx --no-install drizzle-kit mcp
```

This writes the entry to `.mcp.json`. When Claude Code asks to approve the project server, approve it to connect. Use `/mcp` inside Claude Code to check its status.

See [Claude Code's MCP setup](https://code.claude.com/docs/en/mcp) for configuration scopes and client-specific options.

##### Codex

Register the server with the Codex CLI:

```shell
codex mcp add drizzle -- npx --no-install drizzle-kit mcp
```

This adds the server to your user configuration, normally `~/.codex/config.toml`. Start Codex from your Drizzle package when using this server. Use `/mcp` inside Codex to check the active tools.

For project-only configuration or an explicit server working directory, see [Codex's MCP configuration](https://learn.chatgpt.com/docs/extend/mcp).

##### OpenCode

Start OpenCode's interactive setup:

```shell
opencode mcp add
```

Choose a local server, name it `drizzle`, and enter this command when prompted:

```shell
npx --no-install drizzle-kit mcp
```

Check the configured servers with:

```shell
opencode mcp list
```

See [OpenCode's CLI reference](https://opencode.ai/docs/cli/#mcp) for the interactive setup supported by your version.

##### Grok

Register the server for this project with the Grok CLI:

```shell
grok mcp add --scope project drizzle -- npx --no-install drizzle-kit mcp
```

This writes the entry to `.grok/config.toml` in the current directory. Check the configuration and connection with:

```shell
grok mcp doctor drizzle
```

These instructions are for the local Grok CLI. See [Grok's MCP reference](https://github.com/xai-org/grok-build/blob/main/crates/codegen/xai-grok-pager/docs/user-guide/07-mcp-servers.md) for configuration scopes.

##### Cursor

Open your Drizzle package as the project in Cursor. Create `.cursor/mcp.json` with the following content, or add the `drizzle` entry to its existing `mcpServers` object:

```json
{
  "mcpServers": {
    "drizzle": {
      "type": "stdio",
      "command": "npx",
      "args": ["--no-install", "drizzle-kit", "mcp"]
    }
  }
}
```

If you also use Cursor's CLI, inspect the available tools with:

```shell
agent mcp list-tools drizzle
```

The editor and CLI share this configuration. See [Cursor's MCP setup](https://cursor.com/docs/mcp) and [CLI commands](https://cursor.com/docs/cli/mcp).

##### Other clients

Add a stdio server to your client's MCP configuration. For clients that use an `mcpServers` object, choose your package manager and copy the configuration.

npm:

```json
{
  "mcpServers": {
    "drizzle": {
      "command": "npx",
      "args": ["--no-install", "drizzle-kit", "mcp"]
    }
  }
}
```

yarn:

```json
{
  "mcpServers": {
    "drizzle": {
      "command": "yarn",
      "args": ["drizzle-kit", "mcp"]
    }
  }
}
```

pnpm:

```json
{
  "mcpServers": {
    "drizzle": {
      "command": "pnpm",
      "args": ["exec", "drizzle-kit", "mcp"]
    }
  }
}
```

bun:

```json
{
  "mcpServers": {
    "drizzle": {
      "command": "bun",
      "args": ["run", "drizzle-kit", "mcp"]
    }
  }
}
```

Set the server's working directory to your Drizzle package in your client. The config file location and working-directory setting depend on the client.

#### 3. Verify the connection

Restart or reconnect the server in your client, then check that its Drizzle tools are available.

Your client manages the server process. You do not need an HTTP port or a separate terminal running it.

#### 4. Try it with your agent

Once connected, describe the work you want done. For example, inspect migration history without changing it:

```text
Use the Drizzle MCP server to check my migration history.
Explain any conflicts or warnings without changing files or the database.
```

### Use the right configuration

Drizzle Kit looks for `drizzle.config.*` in the **server's working directory**. If you use a different config file, tell your agent which path to use. Relative paths resolve from that directory, not the client's.

### Generate and check migrations

Generate a migration for a schema change you've already made:

```text
Use the Drizzle MCP server to generate a migration for my schema changes.
Show me the SQL and explain what it changes. Don't apply it to the database.
```

For PostgreSQL, you can also compare your configured schema with your migrations:

```text
Use the Drizzle MCP server to check whether my PostgreSQL schema
and migrations are in sync. Explain any differences without changing files.
```

Apply reviewed migration files through your existing [migration workflow](../drizzle-kit/drizzle-kit-migrate.md). rc5 does not expose a `migrate` MCP tool.

### Add the Drizzle skill

Add the [Drizzle skill](./drizzle-kit-skills.md) to help your agent choose a migration workflow, handle rename decisions and interpret results.

[Install the skill from your project's Drizzle Kit](./drizzle-kit-skills.md), then ask your agent to use it:

```text
Use the Drizzle skill and MCP server. In src/db/schema.ts, rename
users.full_name to users.display_name and generate a migration.
Show me the SQL before applying anything to the database.
```

For tool arguments and response details, see the [MCP reference](https://github.com/drizzle-team/drizzle-orm/blob/beta/drizzle-kit/MCP.md).

## Notes

- Source: https://orm.drizzle.team/docs/drizzle-kit-mcp (docs repo commit 55f7f9e, retrieved 2026-11-14)
- This is Drizzle Kit's own bundled MCP server (`drizzle-kit mcp`, `drizzle-kit@rc`) running as a local stdio server. It is distinct from Claude Code Agent Skills and from repository skills installed with `npx skills`, and from the generic Model Context Protocol specification (see the skills `mcp-spec` and `anthropic-claude-code-extend`).
- `drizzle-kit mcp` first shipped in 1.0.0-rc.4; the bundled skills were merged into a single `drizzle` skill in rc.5 (Source: https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v1rc5).
- The page wraps the quick start in Stepper / Tabs components; they are unwrapped into `###` / `####` headings and per-tab fenced blocks. The `####` / `#####` client names come from the tab labels.
- The official pages differ in the OpenCode and Cursor setup: this page uses interactive `opencode mcp add` and a Cursor entry with `"type": "stdio"`, while the setup prompt (`agent-setup-prompt.md`) uses `opencode mcp add drizzle -- npx --no-install drizzle-kit mcp`, an OpenCode v2 `opencode.json` entry with `cwd`, and a Cursor entry without `"type"`. Both are kept verbatim in their pages.
- Per the page, no `migrate` MCP tool exists in rc5; reviewed migration files are applied through the normal migrate workflow.

## Related

- [agents.md](./agents.md)
- [drizzle-kit-skills.md](./drizzle-kit-skills.md)
- [agent-setup-prompt.md](./agent-setup-prompt.md)
- [drizzle-config-file.md](../drizzle-kit/drizzle-config-file.md)
- [drizzle-kit-migrate.md](../drizzle-kit/drizzle-kit-migrate.md)

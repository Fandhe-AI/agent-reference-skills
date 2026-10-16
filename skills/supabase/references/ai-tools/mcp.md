# Supabase MCP Server

Connect your AI tools to Supabase using MCP (Model Context Protocol).

## Signature / Usage

The hosted Supabase MCP server is available at `https://mcp.supabase.com/mcp`. If you're developing locally with the Supabase CLI, use `http://localhost:54321/mcp` instead.

```bash
claude mcp add --scope project --transport http supabase "https://mcp.supabase.com/mcp"
```

Alternatively, add this configuration to `.mcp.json`:

```json
{
  "mcpServers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp"
    }
  }
}
```

After configuring the MCP server, you need to authenticate. In a regular terminal (not the IDE extension) run `claude /mcp`, select the "supabase" server, then "Authenticate" to begin the authentication flow.

Some MCP clients automatically prompt you to log in during setup. Others require manual authentication steps. Either method opens a browser window where you log in to your Supabase account and grant the MCP client access to your organization. You don't need a personal access token (PAT).

### Per-client setup

| Client | Setup |
| --- | --- |
| Claude Code | `claude mcp add --scope project --transport http supabase "https://mcp.supabase.com/mcp"`, or `.mcp.json` |
| Codex | `codex mcp add supabase --url "https://mcp.supabase.com/mcp"`, or `[mcp_servers.supabase]` in `~/.codex/config.toml`; authenticate with `codex mcp login supabase` |
| Grok | `grok mcp add supabase "https://mcp.supabase.com/mcp" --transport http`, or `~/.grok/config.toml`; verify with `grok mcp doctor supabase` |
| Gemini CLI (0.20.2 or higher) | `gemini extensions install https://github.com/supabase-community/gemini-extension`, or `gemini mcp add -t http supabase "https://mcp.supabase.com/mcp"`; authenticate with `/mcp auth supabase`; `.gemini/settings.json` uses the `httpUrl` key |
| GitHub Copilot | `copilot mcp add --transport http supabase "https://mcp.supabase.com/mcp"`, or `~/.copilot/mcp-config.json`; authenticate with `copilot -i /mcp` |
| OpenCode | `~/.config/opencode/opencode.json` (`"type": "remote"`); authenticate with `opencode mcp auth supabase` |
| Factory | `droid mcp add supabase "https://mcp.supabase.com/mcp" --type http`, or `~/.factory/mcp.json` |
| fx | `~/.fx/mcp.json` (under the `mcp` key); authenticate with `/mcp auth supabase --open`; confirm with `/mcp list` |
| omp | `/mcp add`, or `.omp/mcp.json` (all projects: `~/.omp/agent/mcp.json`) |
| Claude.ai / ChatGPT | Available as a connector; install from the respective directory |
| Goose | `goose session --with-streamable-http-extension "https://mcp.supabase.com/mcp"`, or `~/.config/goose/config.yaml` |
| Cursor | `.cursor/mcp.json` (all projects: `~/.cursor/mcp.json`); CLI: `agent mcp enable supabase`, `agent mcp login supabase`, `agent mcp list` |
| VS Code | `.vscode/mcp.json` (top-level key `servers`, `"type": "http"`) |
| Antigravity | `~/.gemini/antigravity/mcp_config.json` (key `serverUrl`); restart, then complete OAuth |
| Kiro | `~/.kiro/settings/mcp.json` (`url`); the page also suggests installing the Supabase power |
| Devin Desktop | `devin mcp add -s user supabase "https://mcp.supabase.com/mcp"`, or `~/.config/devin/mcp_config.json` (Windows: `%APPDATA%\devin\mcp_config.json`); `devin mcp login supabase` |
| Kimi Code | `.kimi-code/mcp.json` (`"transport": "http"`); `/mcp`, `/mcp-config` |
| Warp | `~/.warp/.mcp.json` |

### Configuration options

You can scope the server by appending URL query parameters. Parameters can be combined: `https://mcp.supabase.com/mcp?project_ref=abc123&read_only=true`.

#### Available tools

The Supabase MCP server provides tools organized into feature groups. All groups except Storage are enabled by default.

| Group | Tools |
| --- | --- |
| Database | `list_tables`, `list_extensions`, `list_migrations`, `apply_migration`, `execute_sql` |
| Debugging | `query_logs` (read-only SQL against project logs), `get_advisors` |
| Development | `get_project_url`, `get_publishable_keys`, `generate_typescript_types` |
| Edge Functions | `list_edge_functions`, `get_edge_function`, `deploy_edge_function`, `create_edge_function_secret` (when available) |
| Account management (disabled in project-scoped mode) | `list_projects`, `get_project`, `create_project`, `pause_project`, `restore_project`, `list_organizations`, `get_organization`, `get_cost`, `confirm_cost` |
| Docs | `search_docs` |
| Branching (experimental, requires a paid plan) | `create_branch`, `list_branches`, `delete_branch`, `merge_branch`, `reset_branch`, `rebase_branch` |
| Storage (disabled by default) | `list_storage_buckets`, `get_storage_config`, `update_storage_config` |

#### Elicitations

Elicitation lets an MCP server pause a tool call to ask you for input or confirmation. These flows require both server availability and an MCP client that supports the appropriate elicitation mode: forms for cost confirmation and SQL confirmations, or URLs for secret entry. Server elicitation is separate from your MCP client's own approval of tool calls. It does not replace manual approval or the security recommendations. Treat elicitations as a guardrail, not a guarantee of human review or approval. Some clients support hooks or rules that answer elicitations automatically.

| Mode | Supabase use |
| --- | --- |
| Form | Cost confirmation and destructive SQL confirmations |
| URL | Edge Function secret entry in the Supabase Dashboard |

- Cost confirmation applies to `create_project` and `create_branch`. The tool call pauses and your client displays the resource, the standard rate, and the billing interval. If form-based cost confirmation is unavailable, unsupported by your client, or skipped, the legacy workflow applies: the agent quotes the cost in chat, uses `get_cost` and `confirm_cost`, and passes the returned `confirm_cost_id` to `create_project` or `create_branch`. Skipping the form does not approve the cost or avoid charges.
- Destructive SQL confirmations: `execute_sql` and `apply_migration` ask for confirmation when they detect destructive SQL. The `execute_sql` confirmation applies only outside read-only mode. It may not catch every destructive operation and is not a security guarantee.
- Edge Function secrets: `create_edge_function_secret` is available only when the server offers it, your client supports URL elicitation, Edge Functions tools are enabled, and the connection is not read-only. Enter secret values only in the Supabase Dashboard, never in chat, model input, or MCP tool arguments.

#### Manual authentication

By default the hosted server uses dynamic client registration to authenticate with your Supabase org, so you don't need to create a PAT or OAuth app. Manual authentication is for CI environments where browser-based OAuth is not possible, or MCP clients that require an OAuth client ID and secret (e.g. Azure API Center).

CI: create a scoped personal access token (PAT) and pass it as a header to the MCP server.

```json
{
  "mcpServers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp?project_ref=${SUPABASE_PROJECT_REF}",
      "headers": {
        "Authorization": "Bearer ${SUPABASE_ACCESS_TOKEN}"
      }
    }
  }
}
```

The example assumes the environment variables `SUPABASE_ACCESS_TOKEN` and `SUPABASE_PROJECT_REF` are set in your CI environment. Not every MCP client supports custom headers.

Manual OAuth app: add a new application under your Supabase organization's OAuth apps, using the website URL and callback URL your client expects. Grant write access to all of the available scopes (for now all scopes are required). Copy the client ID and client secret to your MCP client.

## Options / Props

URL query parameters:

| Parameter | Description | Example |
| --- | --- | --- |
| `read_only=true` | Execute all queries as a read-only Postgres user | `?read_only=true` |
| `project_ref=<id>` | Scope to a specific project (disables account tools) | `?project_ref=abc123` |
| `features=<groups>` | Enable only specific tool groups (comma-separated) | `?features=database,docs` |
| `skip_elicitations=<tools>` | Skip form confirmations for the named tools | `?skip_elicitations=execute_sql,apply_migration` |

## Notes

- Use one `skip_elicitations` parameter with a comma-separated list of tool names: `create_project`, `create_branch`, `execute_sql`, or `apply_migration`. Names are case-sensitive; invalid names are rejected. There is no boolean or `all` switch, and `create_edge_function_secret` is not supported by this parameter. Neither skip option bypasses authentication, permissions, read-only restrictions, or charges.
- With the experimental `[experimental] stack` setting on, local projects use assigned ports instead of 54321, so read the MCP URL from the output of `supabase status`.
- Security (prompt injection): SQL results can contain instructions injected by untrusted user content. Supabase MCP wraps SQL results with additional instructions to discourage LLMs from following them, but this is not foolproof; review the output and keep manual approval of tool calls enabled for interactive work. An unattended monitoring routine should approve in advance only project-scoped, read-only tools and stop and report a recommendation instead of running a write operation.
- Recommendations: protect production data (project scoping, read-only mode, restricted feature groups); do not give the MCP server to your customers (it operates under your developer permissions); use branching to test changes; restrict tool groups with `features`.
- This is a developer tool for your own coding agent. The MCP server your app exposes to its users is a different thing; see byo-mcp.md.
- Repository: https://github.com/supabase/mcp
- Source: https://supabase.com/docs/guides/ai-tools/mcp (fetched 2026-10-17, no version pin)

## Related

- [AI Tools](./overview.md)
- [Supabase Plugin](./plugins.md)
- [Deploy MCP servers](./byo-mcp.md)
- [Running multiple local projects](../local-dev/running-multiple-local-projects.md)

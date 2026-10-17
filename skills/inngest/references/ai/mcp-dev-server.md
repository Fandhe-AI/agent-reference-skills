# Dev Server MCP

Inngest runs two Model Context Protocol (MCP) servers: the Dev Server MCP (local, built into `inngest dev`) and the Inngest Cloud MCP (deployed environments). Connect Claude Code, Codex, Cursor, or another MCP client to list functions, send events, and inspect runs from your coding agent. This page keeps its original path and covers both.

## Signature / Usage

| MCP server | Use it for | Endpoint | Authentication |
|------------|------------|----------|----------------|
| **Inngest Cloud** | Deployed apps, functions, events, runs, traces, environments, Insights, sessions, webhooks, and experiments | `https://api.inngest.com/mcp` | OAuth (recommended) or an API key |
| **Dev Server** | Apps, functions, events, and runs on your local machine, plus embedded Inngest docs | `http://127.0.0.1:8288/mcp` | None |

Both servers can be configured in the same MCP client.

```bash
# Dev Server MCP (start the dev server first)
npx --ignore-scripts=false inngest-cli@latest dev
claude mcp add --transport http inngest-dev http://127.0.0.1:8288/mcp
codex mcp add inngest-dev --url http://127.0.0.1:8288/mcp

# Cloud MCP (OAuth; run /mcp in Claude Code, select inngest-cloud, authenticate)
claude mcp add --transport http inngest-cloud https://api.inngest.com/mcp
codex mcp add inngest-cloud --url https://api.inngest.com/mcp
codex mcp login inngest-cloud

# Cloud MCP with an API key (not a signing key)
export INNGEST_API_KEY=sk-inn-api-...
claude mcp add --transport http inngest-cloud https://api.inngest.com/mcp \
  --header "Authorization: Bearer $INNGEST_API_KEY"
codex mcp add inngest-cloud \
  --url https://api.inngest.com/mcp \
  --bearer-token-env-var INNGEST_API_KEY
```

```json
// Cursor: .cursor/mcp.json or ~/.cursor/mcp.json
{
  "mcpServers": {
    "inngest-dev": { "url": "http://127.0.0.1:8288/mcp" },
    "inngest-cloud": {
      "url": "https://api.inngest.com/mcp",
      "auth": { "CLIENT_ID": "inngest-mcp-static" }
    }
  }
}
```

For API-key auth in Cursor, replace `auth` with `"headers": { "Authorization": "Bearer ${env:INNGEST_API_KEY}" }`.

## Options / Props

| Tool (available in Cloud and the Dev Server) | What it does |
|------|--------------|
| `cancel_run` | Cancel an in-progress function run. |
| `get_app` | Get one app, including sync metadata and function count. |
| `get_apps` | List active or archived apps. |
| `get_event_runs` | List the function runs triggered by an event. |
| `get_function` | Get one function's configuration and status. |
| `get_run` | Get the summary and optional output for one run. |
| `get_run_trace` | Get the trace tree and optional span output for one run. |
| `health` | Check the API service health. |
| `invoke_function` | Invoke a function and return its run details. |
| `list_function_runs` | List runs for one function. |
| `list_functions` | List the functions in one app. |
| `list_runs` | List runs, with optional app, function, status, and time filters. |
| `rerun` | Rerun a function from the start or from a selected step. |
| `send_event` | Send an event and return its event ID. |

**Cloud-only tools**

| Tool | What it does |
|------|--------------|
| `create_env` | Create a custom environment. |
| `create_score` | Add scores to a run or its steps. |
| `create_webhook` | Create an incoming webhook. |
| `fetch_account` | Get the authenticated account. |
| `fetch_account_event_keys` | List account event keys, optionally for one environment. |
| `fetch_account_signing_keys` | List account signing keys, optionally for one environment. |
| `get_experiment` | Get run counts and score aggregates for an experiment. |
| `list_envs` | List custom environments. |
| `list_experiments` | List observed experiments. |
| `list_insights_event_schemas` | List event schemas observed by Insights. |
| `list_insights_tables` | List tables available to Insights queries. |
| `list_session_keys` | List session keys observed in an environment. |
| `list_session_runs` | List runs for one session. |
| `list_sessions` | List session IDs for one session key. |
| `list_webhooks` | List incoming webhooks. |
| `patch_env` | Archive or unarchive an environment. |
| `query_insights` | Run an Insights SQL query. |
| `query_insights_prompt` | Turn a natural-language prompt into an Insights SQL query. |
| `sync_app` | Sync an app from its Inngest endpoint URL. |

**Dev Server-only tools**

| Tool | What it does |
|------|--------------|
| `grep_docs` | Search the docs embedded in the Dev Server. |
| `list_docs` | List embedded documentation categories and counts. |
| `read_doc` | Read one embedded documentation file. |

A listed tool may require permissions your session does not have. OAuth sessions cannot access credential-management tools such as `fetch_account_event_keys` and `fetch_account_signing_keys`.

Cloud tools accept an `env` argument (for example `production`, `staging`) that the agent sends per call; it is not part of the MCP server setup. A session or key bound to one environment uses that environment and cannot access another one.

## Notes

- MCP clients receive the live tool list and each tool's input schema on connect; the client's list is the source of truth. Eligible REST API v2 endpoints become MCP tools automatically.
- Inngest MCP tools match the REST API v2 and the Inngest CLI commands. For exact parameters and response shapes, inspect the schema shown by your MCP client or use the REST API v2 reference.
- Some Cloud MCP tools change data (send events, invoke functions, rerun or cancel runs, sync apps, manage environments or webhooks). Review a tool call before approving it, especially in production.
- Cloud OAuth: choose the Inngest account, environment access, permissions, and session duration in the browser. Every tool call must be allowed by both the session's granted permissions and your current account role. If you previously configured an API key, remove the `Authorization` header or `--bearer-token-env-var` setting before signing in with OAuth.
- Cloud API-key authentication accepts API keys, not signing keys.
- The Claude Code plugin (`claude plugin install inngest@anthropic-plugin-directory`) already bundles Cloud MCP (`/mcp` then `plugin:inngest:inngest-cloud`); skip the standalone Cloud setup in that case. The Dev Server can still be added separately.
- The Dev Server runs entirely locally; no API key is needed. Its dashboard has an MCP setup page with client configuration and the live tool list.
- Earlier versions of this page listed Dev Server tools `get_run_status` and `poll_run_status`; they are not in the current official tool tables (`get_run` / `get_run_trace` / `get_event_runs` cover run inspection).
- Troubleshooting `401 Unauthorized` from Cloud MCP: for OAuth, sign in again if the session expired or was revoked and remove any old API-key configuration; for API keys, confirm the client sends `Authorization: Bearer $INNGEST_API_KEY` and restart it after changing environment variables.
- Troubleshooting `403 Forbidden` / `insufficient_scope`: check the session's read/write permission, your account role, and environment access.
- If a tool reports that an environment is required, pass `env`. If the Dev Server endpoint is not found, confirm it is running and the port is `8288` (or update it).
- Pair with agent plugins/skills for the full write-test-debug loop: skills teach the agent how to write Inngest code, Dev Server MCP lets it test locally, Cloud MCP lets it inspect deployed environments.

## Related

- [AI Development Tools](./ai-dev-tools.md)
- [Agent Plugins and Skills](./agent-skills.md)

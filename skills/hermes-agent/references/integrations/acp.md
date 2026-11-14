# ACP (Agent Context Protocol)

Hermes Agent can run as an ACP server (upstream title: "ACP Host Integration"), letting ACP-compatible hosts (VS Code, Zed, JetBrains, Buzz) talk to Hermes over stdio. Editors can render chat messages, tool activity, file diffs, terminal commands, approval prompts, and streamed thinking/response chunks.

## Signature / Usage

```bash
# install the ACP extra from the install checkout
cd ~/.hermes/hermes-agent && python -c "import pm; pm.sync_venv(['acp'], explicit=True)"

hermes acp          # or: hermes-acp   or: python -m acp_adapter
hermes acp --version
hermes acp --check
```

Hermes logs to stderr so stdout stays reserved for ACP JSON-RPC traffic.

## Host setup

VS Code (ACP Client extension) manual definition:

```json
{
  "acp.agents": {
    "Hermes Agent": {
      "command": "hermes",
      "args": ["acp"]
    }
  }
}
```

Zed custom agent server:

```json
{
  "agent_servers": {
    "hermes-agent": {
      "type": "custom",
      "command": "hermes",
      "args": ["acp"]
    }
  }
}
```

JetBrains: use an ACP-compatible plugin and point it at `hermes acp` or `hermes-acp`.

Buzz channels (relay bridge): requires `buzz-acp` and the `buzz` CLI from the Buzz repository, plus a dedicated Nostr keypair (`buzz-admin generate-key`, `buzz-admin add-member`).

```bash
export BUZZ_RELAY_URL="wss://community.example.com"
export BUZZ_PRIVATE_KEY="..."
export BUZZ_API_TOKEN="..."
export BUZZ_ACP_AGENT_COMMAND="hermes"
export BUZZ_ACP_AGENT_ARGS="acp"

buzz-acp
```

`BUZZ_API_TOKEN` is needed only when the relay enforces token authentication. `BUZZ_ACP_RELAY_OBSERVER="true"` publishes encrypted kind `24200` observer frames to the owner's Buzz Desktop Activity log. `buzz-acp` supports an owner-only respond gate via `BUZZ_ACP_AGENT_OWNER`.

## Toolset

ACP runs a curated `hermes-acp` toolset: file tools (`read_file`, `write_file`, `patch`, `search_files`), terminal tools (`terminal`, `process`), web/browser tools, memory, todo, session search, skills, `execute_code`, `delegate_task`, vision. It excludes messaging delivery and cronjob management. Enabled plugin toolsets are added as on the messaging gateway.

```yaml
platform_toolsets:
  acp: [file, web, skills, github]   # only the github MCP server
agent:
  disabled_toolsets: [code_execution]
```

- `platform_toolsets.acp` replaces the `hermes-acp` default; `agent.disabled_toolsets` removes toolsets from every ACP session.
- MCP servers from `mcp_servers`: by default ACP gets every enabled server; listing server names in `platform_toolsets.acp` restricts to those; `no_mcp` drops them all. `hermes tools` has no ACP entry, so edit `config.yaml` directly.
- MCP servers sent by the editor via `session/new` are separate and always added.

## Browser tools (optional)

```bash
hermes acp --setup-browser           # interactive (prompts before ~400 MB download)
hermes acp --setup-browser --yes     # accept the download non-interactively
```

Browser tools (`browser_exec` and the CDP tools `browser_cdp`, `browser_dialog`, `browser_vault`) need a local Chromium, which is not part of the Python wheel. The command installs Hermes' pinned Chromium (the `chromium` package) through the package manager, with no Node.js or npm involved; Hermes launches it itself when `browser_exec` first needs a browser. Idempotent. `hermes acp --setup` (terminal-auth flow) also offers it after model selection.

## Host integration variable

Older ACP hosts may still set this variable on the Hermes subprocess they spawn; not user configuration.

| Name | Type | Description |
|------|------|-------------|
| `HERMES_ACP_SKIP_CONFIGURED_MCP` | `1` | No effect: Hermes no longer reads it. `hermes acp` / `hermes-acp` runs as a viewer of the gateway daemon and never starts the `config.yaml` MCP servers itself. |

The ACP process does no MCP discovery. The gateway daemon starts the `mcp_servers` from its own profile's `config.yaml` once at boot, and ACP sessions get them through the `platform_toolsets.acp` rules above; use `platform_toolsets.acp` or `no_mcp` to keep configured servers out of ACP sessions. The editor's `session/new` `mcpServers` are attached to the canonical session whether or not the variable is set.

## Approvals

ACP approval options:

| Option | Editor label | Scope | Persisted across restarts |
|---|---|---|---|
| `allow_once` | Allow once | This one tool call | No |
| `allow_session` | Allow for session | All matching calls in this ACP session | No |
| `allow_always` | Allow always | All future sessions | Yes (Hermes permanent allowlist) |
| `deny` | Deny | This one tool call | No |

On timeout or error the approval bridge denies the request. The wait is `approvals.timeout` from `config.yaml` (default 300 s).

## Notes

- Configuration is shared with the CLI: `~/.hermes/.env`, `~/.hermes/config.yaml`, `~/.hermes/skills/`, `~/.hermes/state.db`. Hermes advertises a terminal auth method (`--setup`) for first-run ACP clients.
- Sessions are persisted to the session database and can be listed, loaded, resumed, or forked after restart. A new session opened without a prompt stays in memory only. Remove unwanted rows with `hermes sessions show <id>` / `hermes sessions delete <id>`.
- ACP binds the editor's cwd to the Hermes task ID so file and terminal tools run relative to the editor workspace.
- Buzz Desktop: discovery resolves `hermes-acp` (`command -v hermes-acp || command -v hermes`); manual fallback is agent command `hermes` with args `["acp"]`. Buzz Desktop v0.5.1+ renders Hermes' full model menu; entry IDs are `provider:model` or `custom:<name>:<model>`.
- Security: Buzz creates agents as "Owner only"; keep it. The `hermes-acp` toolset includes `terminal` and `execute_code`, and Buzz's ACP bridge answers permission requests itself with `allow_once`, so shell commands run without prompting. `approvals.mode: manual` does not help; narrow the toolset via `platform_toolsets.acp` or `agent.disabled_toolsets` instead. Even `platform_toolsets.acp: []` still adds enabled plugin toolsets. `!shutdown` from the owner stops the agent.
- Troubleshooting: check that the host command points at `hermes acp`, Hermes is on PATH, and the ACP extra is installed; run `hermes acp --version`, `hermes acp --check`, `hermes doctor`, `hermes status`; configure credentials with `hermes model`.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/acp (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

- `HERMES_ACP_SKIP_CONFIGURED_MCP=1` no longer has any effect (ACP no longer starts configured MCP servers itself).
- `hermes acp --setup-browser` no longer installs Node.js 26, `agent-browser` or `@askjo/camofox-browser`; it installs the pinned `chromium` package only. The old `browser_navigate` / `browser_click` tool names are replaced by `browser_exec` plus `browser_cdp` / `browser_dialog` / `browser_vault`.

### Editor-provided MCP servers

On gateways advertising `acp-session-mcp-v1`, editor `mcpServers` belong to the canonical session, not the ACP viewer process; registry namespaces are separate even when two editors supply the same server name, and closing an editor does not cancel another session's MCP execution. Discovery is eager and bounded before the first model turn; selected tool schemas stay frozen for the conversation (server tool-list changes need a new session). MCP transports are released after each execution without stopping sibling sessions or the shared MCP loop. The editor transport specification (command arguments, environment values, HTTP headers) is kept only in gateway memory; durable session policy holds a fingerprint plus the selected schemas. After a gateway restart the editor must supply the same `mcpServers` on load/resume: missing credentials refuse execution, a changed specification or secret refuses reattachment. Start a new session when changing server configuration. Commands and paths run on the gateway host.

### Service-tier picker

ACP clients that render `configOptions` can select **Service tier** for a supported model route: **Normal**, **Fast**, **Auto**, **Cold**, and **Ultrafast** when model and account eligibility checks permit. The gateway supplies and validates the choices; unsupported routes show no picker. The selection applies to that session's next turn (not every session), does not write `config.yaml`, survives editor reload while the gateway session lives, and changes from another attached client update the picker. See the `/fast` slash-command reference for the bounded Auto and Cold modes.

## Related

- [Buzz](./buzz.md)
- [Providers](./providers.md)
- [Integrations Overview](./overview.md)

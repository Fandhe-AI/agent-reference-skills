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

Installs Node.js 26 into `~/.hermes/node/` if missing, `npm install -g agent-browser @askjo/camofox-browser` into that prefix, and Playwright Chromium (or a detected system Chrome/Chromium). Idempotent. `hermes acp --setup` (terminal-auth flow) also offers it after model selection.

## Host integration variable

Set by an ACP host process on the Hermes subprocess it spawns; not user configuration.

| Name | Type | Description |
|------|------|-------------|
| `HERMES_ACP_SKIP_CONFIGURED_MCP` | `1` | Skip starting globally configured MCP servers from `config.yaml` before the ACP JSON-RPC loop. MCP servers supplied via `session/new` are still registered. Any other value keeps default behavior. |

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

## Related

- [Buzz](./buzz.md)
- [Providers](./providers.md)
- [Integrations Overview](./overview.md)

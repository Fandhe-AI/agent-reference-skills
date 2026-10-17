# Codex App-Server Runtime (optional)

Opt-in runtime that hands `openai/*`, `openai-codex/*` and named custom provider turns to the Codex CLI app-server. Terminal commands, file edits, sandboxing and MCP tool calls then execute inside Codex; Hermes remains the shell (sessions DB, slash commands, gateway, memory and skill review).

## Signature / Usage

```text
/codex-runtime codex_app_server   # enable (takes effect on the next session)
/codex-runtime auto               # back to the Hermes runtime
/codex-runtime                    # show current state
```

```yaml
# ~/.hermes/config.yaml
model:
  openai_runtime: codex_app_server   # default is "auto" (= Hermes runtime)
  codex_bin: /Applications/Codex.app/Contents/Resources/codex   # default: "codex" from PATH
```

## Prerequisites

```bash
npm i -g @openai/codex
codex --version   # 0.130.0 or newer
codex login       # writes ~/.codex/auth.json (separate from `hermes auth add openai-codex`)
```

Named custom provider: the `providers.<name>` key must match a `[model_providers.<name>]` table in `~/.codex/config.toml`.

```yaml
providers:
  my-gateway:
    api: https://gateway.example.com/v1
    key_env: MY_GATEWAY_API_KEY
    default_model: gpt-5.4

model:
  provider: custom:my-gateway
  default: gpt-5.4
  openai_runtime: codex_app_server
```

```toml
[model_providers.my-gateway]
name = "My Gateway"
base_url = "https://gateway.example.com/v1"
env_key = "MY_GATEWAY_API_KEY"
wire_api = "responses"
```

## Tools available

| Source | Tools |
|---|---|
| Codex built-ins | `shell`, `apply_patch`, `update_plan`, `view_image`, `web_search` |
| Native Codex plugins | Auto-migrated from `codex plugin` installs via `plugin/list` (Linear, GitHub, Gmail, Calendar, Canva, ...) as `[plugins."<name>@openai-curated"]` |
| Hermes callback MCP server (`hermes-tools`) | `web_search`, `web_extract`, `browser_navigate`, `browser_click`, `browser_type`, `browser_press`, `browser_snapshot`, `browser_scroll`, `browser_back`, `browser_get_images`, `browser_console`, `browser_vision`, `vision_analyze`, `image_generate`, `skill_view`, `skills_list`, `text_to_speech`; kanban worker tools |
| Not available | `delegate_task`, `memory`, `session_search`, `todo` (need the running agent loop; use `/codex-runtime auto`) |

## Permission profiles

| Profile | Meaning |
|---|---|
| `:read-only` | No writes; every shell command needs approval |
| `:workspace` | Workspace writes without prompts (set by Hermes when enabling) |
| `:danger-no-sandbox` | No sandbox |

Approvals appear as the standard "Dangerous Command" prompt: Allow once / Allow for this session / Deny.

## Notes

- Hermes writes everything it manages in `~/.codex/config.toml` between `# managed by hermes-agent` markers and `# end hermes-agent managed section`; content outside the block is preserved. A user-owned `[mcp_servers.<name>]` with the same name wins.
- Migration commands:

```bash
hermes codex-runtime migrate            # rewrite the managed block for the active profile
hermes codex-runtime migrate --dry-run  # report only, no write
hermes codex-runtime migrate --json     # machine-readable report
hermes -p work codex-runtime migrate    # a named profile
```

- MCP translation: `command`+`args`+`env` to stdio; `url`+`headers` to streamable_http; `timeout` to `tool_timeout_sec`; `connect_timeout` to `startup_timeout_sec`; `enabled: false` to `enabled = false`. Hermes-specific keys like `sampling` are dropped with a warning.
- Hermes never forwards API keys to codex; keys must be in the process environment. Anonymous `provider: custom` (bare `base_url`) is not eligible.
- Multi-profile: codex state defaults to `~/.codex/` for every profile; set `CODEX_HOME` per profile for isolation (re-run `codex login`). Hermes does not rewrite `HOME` for the subprocess.
- The memory/skill background review fork is downgraded to `codex_responses` so agent-loop tools work. Auxiliary tasks (title generation, compression, vision, goal judge) also use the ChatGPT subscription unless overridden under `auxiliary.<task>`.
- `/goal` works on this runtime; each continuation is a fresh codex turn so expect more approval prompts. Kanban workers work through the MCP callback; with `HERMES_KANBAN_TASK` set, Hermes adds the board DB directory and pinned Kanban paths as extra writable roots and keeps network disabled.
- `fallback_providers` fail over only on quota and rate-limit failures; auth failures, timeouts and unknown-model errors do not fail over.
- The codex thread id is stored on the session row (`codex_thread_id`) and resumed with `thread/resume`; if it cannot be resumed Hermes starts a new thread (`Codex thread could not be resumed; starting a new one.`).
- Status: opt-in beta, validated against Hermes Agent 2026.5 and Codex CLI 0.130.0.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/codex-app-server-runtime (pinned to v0.22.2)

## Related

- [MCP](./mcp.md)
- [Tools](./tools.md)
- [Plugins](./plugins.md)

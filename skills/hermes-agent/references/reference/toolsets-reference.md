# Toolsets Reference

Toolsets are named bundles of tools that control what the agent can do, per platform, session, or task. Every tool belongs to exactly one toolset.

## Signature / Usage

```bash
hermes chat --toolsets web,file,terminal
hermes chat --toolsets debugging        # composite - expands to file + terminal + web
hermes chat --toolsets all              # everything
hermes tools                            # curses UI to enable/disable per platform
```

```yaml
# config.yaml
toolsets:
  - hermes-cli
custom_toolsets:
  data-science:
    - file
    - terminal
    - code_execution
    - web
    - vision
```

In-session: `/tools list`, `/tools disable browser`, `/tools enable discord`.

## Options / Props

Kinds: **Core** (one group of related tools, e.g. `file`), **Composite** (combines core sets), **Platform** (full config for a deployment target).

| Toolset | Kind | Contents |
|---------|------|----------|
| `browser` | core | Browser automation tools incl. `browser_cdp` / `browser_dialog` (runtime-gated on a CDP endpoint), `browser_exec`, `browser_vault`. `web_search` is deliberately not a member |
| `clarify`, `code_execution`, `cronjob`, `delegation`, `memory`, `session_search`, `skills`, `terminal`, `todo`, `tts`, `vision`, `web`, `image_gen`, `video_gen`, `x_search`, `file` | core | One-to-one with the tools of the same area (see Tools Reference) |
| `connections`, `computer_use`, `discord`, `discord_admin`, `feishu_doc`, `feishu_drive`, `kanban`, `desktop_ui`, `project`, `catalog`, `yuanbao`, `video`, `search`, `context_engine` | core | Specialized sets; `search` is `web_search` only; `context_engine` is populated by the active context-engine plugin |
| `coding` | composite | `file` + `terminal` + `search` + `web` + `skills` + `browser` + `todo` + `memory` + `session_search` + `clarify` + `code_execution` + `delegation` + `vision` |
| `debugging` | composite | `file` + `terminal` + `web` |
| `safe` | composite | `image_generate`, `vision_analyze`, `web_extract`, `web_search`; no file writes, terminal, or code execution |

Platform toolsets:

| Toolset | Differences from `hermes-cli` |
|---------|-------------------------------|
| `hermes-cli` | Full set; default for interactive CLI |
| `hermes-acp` | Drops `clarify`, `cronjob`, `image_generate`, `text_to_speech`, `computer_use`, kanban tools |
| `hermes-api-server` | Drops `clarify`, `text_to_speech`, `computer_use`, kanban tools |
| `hermes-discord` | Adds `discord` and `discord_admin` |
| `hermes-feishu` | Adds the five `feishu_doc_*` / `feishu_drive_*` tools |
| `hermes-yuanbao` | Adds the five `yb_*` tools |
| `hermes-webhook` | Restricted: only `web_search`, `web_extract`, `vision_analyze`, `clarify` |
| `hermes-gateway` | Internal union of every `hermes-<platform>` toolset |
| `hermes-cron`, `-telegram`, `-slack`, `-whatsapp`, `-signal`, `-matrix`, `-mattermost`, `-email`, `-sms`, `-bluebubbles`, `-dingtalk`, `-qqbot`, `-wecom`, `-wecom-callback`, `-weixin` | Same as `hermes-cli` |

Dynamic toolsets:

| Kind | Behaviour |
|------|-----------|
| MCP server | Each `mcp_servers` entry creates `mcp-<server>`; the bare server name works as an alias. A server named like a built-in (`browser`, `web`) resolves to both |
| Plugin | Registered via `ctx.register_tool()` |
| Custom | `custom_toolsets` in `config.yaml` |
| Wildcard | `all` or `*` expands to every registered toolset |

## Notes

- `all` / `*` does not enable capability-gated tools unless their backend or credential is configured, and does not enable `kanban` (list it explicitly or be a dispatcher-spawned worker) or `catalog`.
- `hermes tools` works at tool level (finer than toolsets), persists to `config.yaml`, and disabled tools are filtered out even when their toolset is enabled.
- Plugin-provided platforms get an implicit `hermes-<platform>` bundle that is not part of `hermes-gateway` (e.g. `hermes-homeassistant` after installing the `homeassistant` plugin).
- Source: https://hermes-agent.nousresearch.com/docs/reference/toolsets-reference (pinned to v0.22.2)

## Related

- [Tools Reference](./tools-reference.md)
- [MCP Config Reference](./mcp-config-reference.md)

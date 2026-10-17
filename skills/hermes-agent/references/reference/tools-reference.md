# Tools Reference

Authoritative list of Hermes built-in tools, grouped by toolset. Availability varies by platform, credentials, and enabled toolsets (about 100 tools in the registry).

## Signature / Usage

```text
mcp__<server>__<tool>     # MCP tools are loaded dynamically with this prefix
mcp__github__create_issue
```

```bash
hermes chat --toolsets web,file,terminal
```

## Options / Props

| Toolset | Tools | Notes |
|---------|-------|-------|
| `browser` | `browser_back`, `browser_click`, `browser_console`, `browser_get_images`, `browser_navigate`, `browser_press`, `browser_scroll`, `browser_snapshot`, `browser_type`, `browser_vision` | `browser_navigate` must be called first; `browser_click` / `browser_type` take ref IDs (e.g. `@e5`) from `browser_snapshot` |
| `browser` (CDP-gated) | `browser_cdp`, `browser_dialog` | Register only when a CDP endpoint is reachable at session start (`/browser connect`, `browser.cdp_url`, Browserbase, Camofox) |
| `clarify` | `clarify` | Takes `questions` (1-5 entries); each is single-select (up to 4 choices), multi-select (`multi_select=true`) or open-ended. Result `{responses, outcome}`; outcome is `submitted`, `cancelled`, `timed_out` or `undelivered` |
| `connections` | `manage_connections` | Managed connectors via the Nous gateway or local MCP servers; present only when the Nous Portal enabled connectors for the account |
| `code_execution` | `execute_code` | Run a Python script that calls Hermes tools programmatically |
| `cronjob` | `cronjob_manage` | `action` = `create`, `list`, `update`, `pause`, `resume`, `run`, `remove` |
| `delegation` | `delegate_task` | Spawn isolated subagents; `goal` for one task or `tasks` for a parallel batch |
| `feishu_doc` / `feishu_drive` | `feishu_doc_read`, `feishu_drive_add_comment`, `feishu_drive_list_comments`, `feishu_drive_list_comment_replies`, `feishu_drive_reply_comment` | Scoped to the Feishu document-comment handler; need Feishu app credentials |
| `file` | `patch`, `read_file`, `search_files`, `write_file` | `write_file` refuses to overwrite an existing file without a current full read; `patch` uses fuzzy matching |
| `computer_use` | `computer_use` | Background desktop control via `cua-driver` (must be on `$PATH`); macOS, Windows, Linux |
| `image_gen` | `image_generate` | Backends FAL.ai, OpenAI, OpenAI Codex auth, xAI, Krea; model is user-configured |
| `kanban` | `kanban_show`, `kanban_list`, `kanban_complete`, `kanban_block`, `kanban_request_review`, `kanban_request_changes`, `kanban_heartbeat`, `kanban_comment`, `kanban_create`, `kanban_link`, `kanban_unblock`, `kanban_attach`, `kanban_attach_url`, `kanban_attachments` | Registered for dispatcher-spawned workers (`HERMES_KANBAN_TASK`) or profiles that enable the toolset; `kanban_list` / `kanban_unblock` are orchestrator-only |
| `project` | `desktop_project` | `create` / `list` / `switch` desktop Projects; GUI sessions |
| `memory` | `memory` | Persistent cross-session memory |
| `catalog` | `manage_catalog` | Desktop sessions only; `search` / `install` plugins and hub skills |
| `session_search` | `session_search` | FTS5 search of past sessions: discovery (`query`), scroll, read, browse; `after` / `before` accept ISO dates or `7d`, `24h`, `2w` |
| `skills` | `skill_manage`, `skill_view`, `skills_list` | Skill CRUD and browsing |
| `terminal` | `terminal`, `process_manage` | `background=true`, `notify_on_complete=true`, `heartbeat=N` (min 60 s); `process_manage` actions `list`, `poll`, `log`, `wait`, `kill`, `write` |
| `desktop_ui` | `read_terminal`, `close_terminal`, `desktop_preview`, `drive_preview`, `annotate_preview`, `read_window_below`, `focus_pane`, `react_to_message`, `gui_tour`, `show_tip`, `set_theme` | Desktop-app sessions only |
| `todo` | `todo_list` | Session task list; items may nest via `parent` |
| `vision` | `vision_analyze` | Native pixels on vision-capable models, auxiliary vision model otherwise |
| `video` | `video_analyze` | Opt-in (`--toolsets video`) |
| `video_gen` | `video_generate`, `xai_video_edit`, `xai_video_extend` | Opt-in; backends xAI Grok-Imagine, FAL.ai, OpenRouter, DeepInfra; pass `image_url` to animate a still |
| `web` | `web_search`, `web_extract` | `web_search` `limit` 1-100 (default 5); `web_extract` max 5 URLs per call, PDF URLs supported |
| `x_search` | `x_search` | Read-only X search via xAI; off by default; needs `XAI_API_KEY` or xAI Grok OAuth |
| `tts` | `text_to_speech` | Returns a `MEDIA:` path; CLI saves to `~/voice-memos/` |
| `discord` / `discord_admin` | `discord`, `discord_admin` | Gateway-only on `hermes-discord`; need `DISCORD_BOT_TOKEN` (admin also needs bot permissions) |
| `hermes-yuanbao` | `yb_query_group_info`, `yb_query_group_members`, `yb_send_dm`, `yb_search_sticker`, `yb_send_sticker` | Yuanbao credentials |

## Notes

- Honcho tools, Home Assistant tools (`ha_*`) and Spotify tools (`spotify_*`) are no longer built-in; they come from catalog plugins (`hermes plugins install honcho|homeassistant|spotify`).
- The `desktop_ui` toolset also exposes the `data-tour` HTML attribute convention for stable tour targets; `gui_tour` and `show_tip` can be switched off with `display.in_app_tours` / `display.in_app_tips`.
- Source: https://hermes-agent.nousresearch.com/docs/reference/tools-reference (pinned to v0.22.2)

## Related

- [Toolsets Reference](./toolsets-reference.md)
- [MCP Config Reference](./mcp-config-reference.md)
- [Environment Variables](./environment-variables.md)

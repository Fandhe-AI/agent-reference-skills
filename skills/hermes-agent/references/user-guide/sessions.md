# Sessions

Hermes automatically saves every conversation (CLI, TUI, Desktop, and messaging platforms) as a session in a per-profile SQLite database (`~/.hermes/state.db`, FTS5 full-text search plus full message history). Sessions power resume, cross-session search (`session_search`), export, and cleanup.

## Signature / Usage

```bash
hermes --continue            # or -c: resume the most recent CLI session (terminal-aware)
hermes -c "my project"       # resume by title (latest in lineage)
hermes --resume 20250305_091523_a1b2c3d4   # or -r; by ID, unique prefix, title, or `latest`
hermes --resume latest --in ./my-project   # latest session for that workspace
hermes sessions list --source telegram --limit 50
hermes sessions export backup.jsonl --redact
```

In chat: `/title my research project`, `/new [name]`, `/compress`, `/handoff <platform>`, `/resume <title>`.

## Options / Props

`hermes sessions` subcommands:

| Command | Description |
|---------|-------------|
| `list [--source S] [--limit N] [--workspace NEEDLE]` | List sessions (default last 20) |
| `export <path> [--format jsonl\|md\|qmd\|html\|trace] [--session-id ID] [--only user-prompts] [--redact] [--dry-run]` | Export; bulk filters match ended sessions: `--older-than`, `--newer-than`, `--before`, `--after`, `--source`, `--title`, `--model`, `--provider`, `--cwd`, `--min/--max-messages`, `--min/--max-tokens`, `--min/--max-cost`, `--min/--max-tool-calls`, `--user`, `--chat-id`, `--chat-type`, `--branch`, `--end-reason` |
| `delete <id> [--yes]` | Delete (refused while a turn or compression is active) |
| `rename <id> <title>` | Set title (unique, max 100 chars) |
| `pin` / `unpin` / `pinned [--json]` | Pin sessions (exempt from `sessions.auto_archive` and pruning) |
| `prune [filters] [--dry-run] [--yes] [--include-archived]` | Delete ended sessions; bare `prune` uses a 90-day cutoff, any filter disables it |
| `archive [filters]` | Soft-hide matching sessions (a filter is required) |
| `stats` | Totals and database size |
| `optimize` / `optimize-storage` | Merge FTS5 segments and VACUUM; refuse while another process holds `state.db` (`--force` overrides) |
| `repair`, `repair-routing [--apply]`, `repair-prompts [--apply]`, `repair-profiles [--apply] [--legacy-main rekey\|move]` | Repair stranded gateway routing, degraded stored prompts, cross-profile state |
| `set-journal-mode delete\|wal [--db PATH]` | Convert the store between WAL and DELETE journal mode with every process stopped |
| `recover --source <file> --inspect-only` | Inspect/recover a store |
| `import [--from claude\|codex] [file]` | Import a Claude Code or Codex CLI session; `hermes --resume @claude` / `@codex` import-and-resume |

Config keys:

```yaml
sessions:
  auto_prune: false         # default is true
  retention_days: 90
  vacuum_after_prune: true
  min_vacuum_interval_days: 30
  min_interval_hours: 24
  max_resume_messages: 20000   # 0 disables
  max_export_messages: 20000   # 0 disables
```

Other keys: `display.resume_display: minimal`, `session.terminal_continue: false`, `group_sessions_per_user: false`, `gateway.write_sessions_json`, `thread_sessions_per_user`.

## Notes

- Session sources: `cli`, `oneshot` (hidden from TUI/Desktop/dashboard pickers), `telegram`, `discord`, `slack`, `whatsapp`, `signal`, `matrix`, `mattermost`, `email`, `sms`, `dingtalk`, `feishu`, `wecom`, `weixin`, `bluebubbles`, `qqbot`, `homeassistant`, `webhook`, `api-server`, `acp`, `cron`, `batch`, `kanban`, `tool`. Session IDs are `YYYYMMDD_HHMMSS_<hex>` (6-char suffix for CLI/TUI, 8 for gateway).
- Context: only the system prompt, current conversation window, and per-turn injected content go to the model; raw media bytes are not re-sent. Use `/compress` for long sessions, `/new` for a fresh thread; compression is not a privacy delete. Compression creates a continuation session titled `"x" -> "x #2" -> "x #3"`.
- Resume restores the session's recorded working directory (disable with `--no-restore-cwd`; `--in` pins). `-c` is terminal-aware via breadcrumbs under `~/.hermes/terminal-sessions/`.
- `/handoff <platform>` moves a live CLI session to a platform home channel (set with `/sethome`); Telegram/Discord/Slack/Matrix open a thread, others use the home channel. CLI waits up to 60 s for the gateway to claim and up to 15 minutes for slow transfers.
- Full-session JSON/JSONL exports and `/save json` hold every stored row including archived history; `md` / `html` / `--only user-prompts` hold the displayed history. Trace exports are redacted by default and `--upload` pushes to a private `hermes-traces` dataset (reads `HF_TOKEN`). Bulk Markdown export requires a filter; `--delete-after-verified` requires `--session-id` and `--yes`. Resume refusal returns error code `4130`; `/save` refusal `4131`.
- `session_search` tool (FTS5, no LLM calls) has four shapes: discovery (`query`), scroll (`session_id` + `around_message_id`), read (`session_id`), browse (no args); optional `sort`, `detail`, `role_filter`.

```python
session_search(query="auth refactor", limit=3)
session_search(session_id="20260510_174648_805cc2", around_message_id=590803, window=10)
```

- Gateway session keys: DM `agent:main:<platform>:dm:<chat_id>`; group `agent:main:<platform>:group:<chat_id>:<user_id>`; thread shared by default; channel per user. Gateway conversations do not reset on idle or daily boundaries (legacy `session_reset` ignored; plugin `hermes-session-reset-policy` restores time-based resets). Use `/new` at task boundaries so memory and `session_search` work.
- Auto-prune is on by default: ended sessions inactive for `retention_days` are removed at startup; open sessions from state-owned sources (`cli`, `cron`, `kanban`, `acp`, `api_server`, `subagent`, `tool`) older than that are closed non-destructively. Active sessions are never pruned.
- `~/.hermes/sessions/sessions.json` is only a legacy mirror of the `gateway_routing` table in `state.db` (gateway entries only); legacy `*.jsonl` transcripts are no longer read.

## Related

- [session-storage-recovery.md](./session-storage-recovery.md)
- [which-file-does-what.md](./which-file-does-what.md)
- [profiles.md](./profiles.md)

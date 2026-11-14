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
| `prune [filters] [--dry-run] [--yes] [--include-archived]` | Delete ended sessions; bare `prune` uses a 90-day cutoff, any filter disables it. With the gateway running, it asks the gateway to delete the selected sessions; with no gateway running it refuses while another Hermes process (Desktop, dashboard, cron) holds `state.db` (`--force` overrides) |
| `archive [filters] [--include-open]` | Soft-hide matching ended sessions (a filter is required); Desktop and other gateway-owned local sessions are never "ended", so the command reports how many it skipped as still open, and `--include-open` archives them too (`prune` never deletes open sessions) |
| `stats` | Totals and database size |
| `optimize` / `optimize-storage` | Merge FTS5 segments and VACUUM; refuse while another Hermes process (Desktop, dashboard, cron) holds `state.db` (`--force` overrides) |
| `discard <id-or-title> [--admission ID] [--yes]` | Acknowledge turns left `unknown` by a gateway crash so the session can continue; without `--yes` it asks, and refuses (exit 2) when stdin is not a terminal |
| `refresh-prompts [--session ID] [-p PROFILE]` | Ask sessions to rebuild their stored system prompt from current `SOUL.md` / skills / context files on their next turn |
| `repair`, `repair-routing [--apply]`, `repair-prompts [--apply]`, `repair-profiles [--apply] [--legacy-main rekey\|move]` | Repair stranded gateway routing, degraded stored prompts, cross-profile state |
| `set-journal-mode delete\|wal [--db PATH]` | Convert the store between WAL and DELETE journal mode with every process stopped |
| `recover --source <file> --inspect-only` | Inspect/recover a store |
| `import [--from claude\|codex] [file]` | Import a Claude Code or Codex CLI session; `hermes --resume @claude` / `@codex` import-and-resume |

Config keys:

```yaml
sessions:
  auto_prune: true          # default is false — true deletes ended sessions past retention_days
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
- Auto-prune is off by default (opt in with `sessions.auto_prune: true` or `/autoprune on`): when on, ended sessions inactive for `retention_days` are removed at startup; open sessions from state-owned sources (`cli`, `cron`, `kanban`, `acp`, `api_server`, `subagent`, `tool`) older than that are closed non-destructively. Active sessions are never pruned.
- Low-disk prompt: while `config.yaml` has no `sessions.auto_prune` key, Hermes checks the disk holding `state.db` at session start; when under 2 GB free (or under 10% free with less than 20 GB left) it asks once (classic CLI at the next launch after a background measurement, TUI/Desktop notice, gateway home channel). Answer `/autoprune on`, `/autoprune off` (never asked again) or `/autoprune later` (reminded in a week); `/autoprune` shows state. Run `hermes sessions optimize` after a prune to return space to the disk.
- Local sessions nobody closed: a CLI / TUI / Desktop session whose last viewer disappeared is ended by the gateway `sessions.orphan_end_grace_s` seconds later (default `300`; `0` never ends it) with `end_reason: ws_orphan_reap` (or `startup_orphan_reap` after a restart, no sooner than 6 hours after last activity). While unset, legacy `dashboard.ws_orphan_reap_grace_s: 0` turns this off and `dashboard.startup_orphan_sweep: false` turns off the after-restart end. Ending is non-destructive; the next message reopens the same id.
- Gateway access: verified operators of the same gateway profile can attach to canonical local CLI / TUI / Desktop sessions created through another operator authentication method (replaces creator-only access); closing a client only detaches it. Attribution stays identity-specific; old remote sessions with a bare-subject receipt are not first-claim adopted. A gateway crash leaves interrupted work `unknown` (never replayed); `hermes chat --resume <id>` lists it and accepts `/discard <admission_id>`, scripted `-q` refuses with exit code 3.

```bash
# Acknowledge every unknown (lost) turn on the session, then continue it
hermes sessions discard 20250305_091523_a1b2c3d4 --yes
hermes chat --resume 20250305_091523_a1b2c3d4 -q "next question"

# Only one specific admission (repeatable); the session may also be named by title
hermes sessions discard "debugging auth flow" --admission a9b59ad3ee914d75967def2a33435c88 --yes
```

- Resuming an idle session picks up the profile's current config (toolsets, MCP servers, `terminal` settings, `max_turns`, checkpoints, default reasoning effort); the session keeps its model, launch flags and any `/reasoning` or workspace change. `auxiliary:` side-task models always come from the current `config.yaml` (not with `--ignore-user-config` / `--safe-mode`). Any difference starts a new prompt-cache prefix, and a `terminal` settings change also resets an earlier `cd`.
- Refresh prompts: a continuing session replays its first-turn system prompt byte for byte (a gateway restart restores the stored prompt), so `SOUL.md`, skill and context-file edits do not reach it. `hermes sessions refresh-prompts` (add `-p <profile>`, or `--session SESSION_ID`) records a request in `state.db`; on each session's next turn the prompt is rebuilt (one prompt-cache miss, history and tool list unchanged, memory and `USER.md` blocks pick up latest state) and saved for reuse.

```bash
# Every session in the active profile (add -p <profile> for another one)
hermes sessions refresh-prompts

# One session (id or unique prefix)
hermes sessions refresh-prompts --session SESSION_ID
```

- `/new` (or `/reset`) moves only the view that ran it: other viewers of the same session (Desktop, TUI, `hermes chat --resume`, ACP editor, Telegram topic) stay on the original session and a running turn continues.
- `repair-prompts` now keys on a missing `skill_manage` guidance line (v0.22.2: the `## Skill Safety` guidance) when the persisted `tools[]` pin contains `skill_manage`.
- `~/.hermes/sessions/sessions.json` is only a legacy mirror of the `gateway_routing` table in `state.db` (gateway entries only); legacy `*.jsonl` transcripts are no longer read.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/sessions (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

- Migration (v0.22 -> v0.23): `sessions.auto_prune` default flipped from `true` (v0.22.2, since #54189) to `false`; installs that set the key explicitly keep their value, unset keys now follow the new default (no pruning) and trigger the low-disk prompt. Set `auto_prune: true` to keep the old behavior.

## Related

- [session-storage-recovery.md](./session-storage-recovery.md)
- [which-file-does-what.md](./which-file-does-what.md)
- [profiles.md](./profiles.md)

# Slash Commands Reference

Hermes has two slash-command surfaces driven by a central `COMMAND_REGISTRY` in `hermes_cli/commands.py`: interactive CLI slash commands (dispatched by `cli.py`) and messaging slash commands (dispatched by `gateway/run.py`). Installed skills are also exposed as dynamic slash commands on both surfaces.

## Signature / Usage

```yaml
# ~/.hermes/config.yaml — user-defined quick commands
quick_commands:
  status:
    type: exec
    command: systemctl status hermes-agent
  inbox:
    type: alias
    target: /gmail unread
```

Type `/` in the CLI to open the autocomplete menu. Built-in commands are case-insensitive. Prefix matching applies (`/h` -> `/help`, `/mod` -> `/model`); on ambiguity the first match in registry order wins, and full names / registered aliases always beat prefix matches.

## Options / Props

### Interactive CLI commands

#### Session

| Command | Description |
|---------|-------------|
| `/new [name]` (alias `/reset`) | Start a new session. Optional name sets the title. `now` / `--yes` / `-y` skips the confirmation modal. |
| `/clear` | Clear screen and start a new session |
| `/history` | Show conversation history (respects `/timestamps`) |
| `/save <json\|md\|html> [filename] [redact]` | Export the current session as a JSON snapshot, a Markdown transcript, or a standalone HTML page (`markdown` and `snapshot` are accepted aliases). `redact` scrubs API keys, tokens and credentials, and always comes last, after the optional filename (`/save md notes.md redact`). CLI and TUI: `filename` resolves against the current directory, otherwise the file is auto-named under `~/.hermes/sessions/saved/`; Desktop opens a save dialog. A bare `/save` prints usage in the classic CLI and saves JSON in the TUI and Desktop |
| `/prompt` (alias `/compose`) | Compose the next prompt in `$EDITOR` |
| `/retry` | Resend the last message |
| `/undo` | Remove the last user/assistant exchange |
| `/rewind [N \| fork N]` | Backtrack (classic CLI; also `Esc`, `Esc` on an idle, empty prompt). Opens a transcript browser with the latest prompt selected: `←`/`→` (`h`/`l`) pick a prompt, `Enter` puts it back in the composer so sending the edit cuts the session back to just before it, `f` forks a new branched session holding only the history before that prompt, `Esc`/`q` closes. `/rewind N` edits prompt N directly and `/rewind fork N` forks before it |
| `/title` | Set a title for the current session |
| `/compress [here [N] \| focus topic]` | Manually compress context. `here [N]` keeps the most recent N exchanges (default 2) verbatim. |
| `/rollback` | List or restore filesystem checkpoints (`/rollback [number]`) |
| `/diff [staged\|all\|session] [--stat] [path...]` | Show git changes; `session` is the cumulative diff of everything Hermes changed (requires checkpoints) |
| `/snapshot [create\|restore <id>\|prune]` (alias `/snap`) | Create or restore state snapshots of Hermes config/state |
| `/stop` | Kill all running background processes |
| `/queue <prompt>` (alias `/q`) | Queue a prompt for the next turn; `list`, `edit N`, `rm N`, `move A B`, `clear`, `add <prompt>` manage the queue |
| `/steer <prompt>` | Inject a mid-run note delivered after the next tool call (no interrupt) |
| `/goal <text>` | Set a standing goal worked across turns; judged after each turn. Subcommands `status`, `pause`, `resume`, `clear`. Default budget 20 turns (`goals.max_turns`). |
| `/subgoal <text>` | Append a criterion to the active goal (`/subgoal remove <N>`, `/subgoal clear`) |
| `/heartbeat every <interval> <prompt>` (alias `/hb`) | Recurring prompt re-entering this session when idle (min 60s). Subcommands `status`, `pause`, `resume`, `clear`. |
| `/loop [interval] <prompt> [--times N] [--until <condition>]` (alias `/proactive`) | Re-run a prompt on an interval in this session. Subcommands `status`, `pause`, `resume`, `stop`. |
| `/refine [focus]` | Run the memory/skill self-improvement review now |
| `/review [instructions]` | Spawn an independent reviewer subagent (model via `auxiliary.review`) |
| `/moa <prompt>` | Run one prompt through the default Mixture of Agents preset |
| `/resume [name]` | Resume a named session |
| `/sessions` (TUI alias `/switch`) | Classic CLI: session picker. TUI: live session switcher; `/sessions new` starts another live session. |
| `/egress [status]` | Show Docker egress proxy status |
| `/redraw` | Force a full UI repaint |
| `/status` | Session info plus a local Session recap block |
| `/context [all]` (alias `/ctx`) | Context-window breakdown; `all` adds per-skill and per-toolset costs |
| `/agents` (alias `/tasks`) | Show active agents and running tasks |
| `/bg <prompt>` | Run a prompt in a separate background session |
| `/btw <question>` | Side question about the current conversation without interrupting it |
| `/branch [--here] [name]` (alias `/fork`) | Branch the current session into an independent copy |
| `/worktree [new [name]\|list]` | CLI only. Inspect or create isolated git worktrees mid-session |
| `/handoff <platform>` | CLI only. Hand the session off to a messaging platform (requires running gateway and a home channel) |
| `/journey [list\|delete <id>\|edit <id>]` (aliases `/learning`, `/memory-graph`) | Learning journey timeline of learned skills and memories |

#### Configuration

| Command | Description |
|---------|-------------|
| `/config` | Show current configuration |
| `/model [model-name]` | Show or change the model. Forms: `provider:model`, `custom:model`, `custom:name:model`, `custom`, `@preset/<slug>`, user aliases. Flags: `--global`, `--session`, `--once`, `--refresh`, `--provider <name>`, `--reasoning <level>`. `/model reset` (no flags) drops this session's pick and goes back to `config.yaml`'s model without losing the conversation. No args opens the interactive picker. |
| `/codex-runtime [auto\|codex_app_server\|on\|off]` | Toggle the optional Codex app-server runtime |
| `/personality` | Set a predefined personality (`none` / `default` / `neutral` clears) |
| `/verbose` | Cycle tool progress display: off, new, all, verbose |
| `/focus [on\|off\|status]` | Focus view: display-only reduced output |
| `/fast [normal\|fast\|auto\|cold\|status]` | Fast mode (OpenAI Priority Processing / Anthropic Fast Mode) |
| `/reasoning [level\|show\|hide\|full\|clamp] [--global]` | Reasoning effort (`none` ... `ultra`) and display |
| `/skin` | Show or change the display skin/theme |
| `/export [profile] [-o out.tar.gz]` | CLI only. Pack a profile into a `.tar.gz` (credentials stripped) |
| `/import <archive.tar.gz> [--name <name>]` | CLI only. Install a profile archive as a new profile |
| `/statusbar` (alias `/sb`) | Toggle the context/model status bar |
| `/battery [on\|off\|status]` | Battery read-out in the status bar |
| `/voice [on\|off\|tts\|status]` | CLI voice mode (record key `voice.record_key`, default `Ctrl+B`) |
| `/yolo` | Toggle YOLO mode (skip dangerous-command approvals) |
| `/approvals [manual\|smart\|off]` | Show or set the persistent approval mode |
| `/footer [on\|off\|status]` | Runtime-metadata footer on final replies |
| `/busy [queue\|steer\|interrupt\|status]` | Behavior when messaging while Hermes is working |
| `/autoprune [on\|off\|later\|status]` | Decide automatic pruning of old ended sessions (off by default). Hermes asks once when the disk holding `state.db` runs low; `on`/`off` save `sessions.auto_prune`, `later` reminds you in a week. Works in the CLI, TUI, Desktop and messaging gateway (Slack: `/hermes autoprune`) |
| `/indicator [kaomoji\|emoji\|unicode\|ascii]` | CLI-only: busy-indicator style |
| `/timestamps [on\|off\|status]` | CLI-only: `[HH:MM]` timestamps |
| `/wake [on\|off\|status]` | CLI-only: "Hey Hermes" wake word |

#### Tools and Skills

| Command | Description |
|---------|-------------|
| `/tools [list\|disable\|enable] [name...]` | Manage tools for the session (disable/enable resets the session) |
| `/toolsets` | List available toolsets |
| `/browser [connect\|disconnect\|status]` | Manage a local Chromium-family CDP connection (default `http://127.0.0.1:9222`) |
| `/skills` | Search, install, inspect, manage skills; also `pending`, `diff <id>`, `approve <id>`, `reject <id>`, `approval on\|off` for the write-approval gate |
| `/memory [pending\|approve\|reject\|approval]` | Review pending memory writes (`memory.write_approval`) |
| `/bundles` | List configured skill bundles |
| `/learn <what to learn from>` | Distill a reusable skill from a directory, URL, workflow, or notes |
| `/plan [task]` | Write a markdown plan to `.hermes/plans/` (planning only) |
| `/init [notes]` | Generate or update `AGENTS.md` from a repo scan |
| `/cron` | Manage scheduled tasks |
| `/suggestions [accept\|dismiss N\|catalog\|clear]` (alias `/suggest`) | Review suggested automations |
| `/blueprint [name] [slot=value ...]` (alias `/bp`) | Set up an automation from a blueprint template |
| `/curator` | Background skill maintenance (`status`, `run`, `pin`, `archive`) |
| `/kanban <action>` | Drive the multi-profile collaboration board (`list`, `show`, `create`, `comment`, `unblock`, `dispatch`, `boards ...`) |
| `/reload-mcp` (alias `/reload_mcp`) | Reload MCP servers from config.yaml |
| `/connectors` | TUI-only. Connector accounts list (keys: up/down, `r`, `a`, `c`, `x`, Tab, Esc/`q`) |
| `/reload-skills` (alias `/reload_skills`) | Re-scan `~/.hermes/skills/` |
| `/reload` | Reload `.env` into the running session |
| `/plugins [update\|auto-update [on\|off]]` | List installed plugins and status; `update` updates every plugin that has an update, `auto-update` shows or sets unattended plugin updates |
| `/pet [list\|<slug>]` | Toggle or adopt a petdex mascot |
| `/hatch <description>` (alias `/generate-pet`) | Generate a new petdex pet from a description |

#### Info and Exit

| Command | Description |
|---------|-------------|
| `/help` | Show commands by category; `/help skills`, `/help <text>` filter |
| `/palette` | Fuzzy command palette (also `Ctrl+P`) |
| `/version` | Hermes Agent version, build, environment |
| `/whoami` | Slash command access level (admin / user) |
| `/usage` | Token usage, cost, duration, and Account limits when available |
| `/topup` | Nous balance and billing |
| `/subscription` (alias `/upgrade`) | CLI only. View/change Nous plan |
| `/login` | Sign in with a Nous account |
| `/insights` | Usage insights (last 30 days) |
| `/update` | Update Hermes Agent |
| `/platforms` (alias `/gateway`) | Gateway/messaging platform status |
| `/paste` | Attach a clipboard image |
| `/copy [number]` | Copy the last (or Nth-from-last) assistant response. CLI-only. |
| `/image <path>` | Attach a local image for the next prompt |
| `/debug` | Upload debug report and get shareable links |
| `/profile` | Show active profile name and home directory |
| `/quit` (also `/exit`) | Exit the CLI |

#### Dynamic commands

| Command | Description |
|---------|-------------|
| `/<skill-name>` | Load an installed skill on demand (e.g. `/youtube-content`) |
| `/skills ...` | Search, browse, inspect, install, audit, publish, configure skills |

### Messaging commands

Supported inside Telegram, Discord, Slack, WhatsApp, Signal, Email, Home Assistant, and Teams. On Slack, native slash commands are blocked inside threads; use the `!` prefix instead (`!stop`, `!new`, `!status`).

| Command | Description |
|---------|-------------|
| `/start` | Platform handshake; acknowledged silently |
| `/new [name]` (alias `/reset`), `/status`, `/stop`, `/retry`, `/undo`, `/title`, `/resume`, `/sessions [all] [search <query>]` | Session control (`/sessions all` is admin only) |
| `/pause [reason \| off]` | Global emergency stop for new cron, kanban and gateway work |
| `/discard` | Drop a turn Hermes lost in a restart so this chat's queued messages run again; the lost turn is not re-run (recorded as interrupted). On Slack use `/hermes discard` |
| `/save <json\|md\|html> [filename] [redact]` | Export the current session as JSON, Markdown, or HTML and send the file into the chat as a document; bare `/save` shows usage, `redact` scrubs secrets first |
| `/model`, `/codex-runtime`, `/personality`, `/fast`, `/reasoning`, `/voice [... join\|channel\|leave]`, `/footer`, `/verbose`, `/yolo` | Configuration (`/verbose` off by default; needs `display.tool_progress_command: true`) |
| `/sethome` (alias `/set-home`) | Mark the chat as the platform home channel |
| `/compress`, `/rollback`, `/diff`, `/context`, `/egress`, `/agents` | Context and state inspection |
| `/topic [off\|help\|session-id]` | Telegram DM only. Multi-session topic mode |
| `/usage`, `/topup`, `/login`, `/whoami`, `/insights [days]` | Usage and account |
| `/bg`, `/btw`, `/queue`, `/steer`, `/goal`, `/subgoal`, `/heartbeat`, `/loop`, `/refine`, `/review`, `/moa`, `/branch` | Background and multi-turn control |
| `/init`, `/learn`, `/plan`, `/bundles`, `/reload-skills`, `/curator`, `/suggestions`, `/blueprint`, `/memory`, `/skills [pending\|approve\|reject\|diff\|approval]`, `/kanban`, `/reload-mcp` | Skills, memory, automation |
| `/platform <list\|pause\|resume> [name]` | Operate a running gateway platform adapter |
| `/commands [page]` | Browse all commands and skills |
| `/approve [session\|always]`, `/deny` | Approve or reject a pending dangerous command |
| `/update`, `/restart`, `/debug`, `/help` | Maintenance |
| `/<skill-name>` | Invoke an installed skill |

### Custom model aliases

```yaml
model_aliases:
  fav:
    model: claude-sonnet-4.6
    provider: anthropic
  ollama-qwen:
    model: qwen3-coder:30b
    provider: custom
    base_url: http://localhost:11434/v1
```

```bash
hermes config set model.aliases.fav anthropic/claude-opus-4.6
```

Use with `/model fav`, `/model grok --global`, or `hermes chat --model <alias>`. An alias with `base_url` may carry a credential via `api_key` (literal or `"${VAR}"`) or `key_env`; `api_key` wins. User aliases take precedence over built-in short names; names are case-insensitive.

## Notes

- Admin/user split: platforms with a per-user allowlist give admins every command; regular users get only `user_allowed_commands` plus the always-allowed `/help` and `/whoami`. Configure `allow_admin_from` / `user_allowed_commands` (and `group_allow_admin_from` / `group_user_allowed_commands`) in the platform's `extra:` block of `~/.hermes/config.yaml`. If `allow_admin_from` is unset, all allowed users can run every command.
- A skill whose name matches a built-in command or alias never gets its own `/<name>`; use `/skill <name>`.
- Quick commands are resolved at dispatch time and may not appear in autocomplete/help. String-only prompt shortcuts are not supported.
- CLI-only: `/skin`, `/snapshot`, `/export`, `/import`, `/reload`, `/tools`, `/toolsets`, `/browser`, `/config`, `/cron`, `/platforms`, `/paste`, `/image`, `/statusbar`, `/battery`, `/focus`, `/plugins`, `/indicator`, `/wake`, `/journey`, `/redraw`, `/clear`, `/history`, `/copy`, `/handoff`, `/prompt`, `/pet`, `/hatch`, `/timestamps`, `/subscription`, `/quit`.
- Messaging-only: `/sethome`, `/restart`, `/approve`, `/deny`, `/topic`, `/platform`, `/pause`, `/discard`, `/commands`. TUI-only: `/connectors`.
- Switching models mid-conversation resets the prompt cache.
- Destructive commands (`/clear`, `/new` / `/reset`, `/undo`, `/exit --delete` / `/quit --delete`) open a modal: Approve Once, Always Approve (persists `approvals.destructive_slash_confirm: false`), or Cancel. Append `now`, `--yes`, or `-y` to skip once; set `approvals.destructive_slash_confirm: false` to disable globally.
- On the gateway's session, prompts queued mid-run with `/queue` live in the gateway's shared queue: `list`/`rm`/`edit`/`clear` act on every prompt queued there (other windows' too), and `move` is refused for prompts the gateway holds. In classic `hermes chat`, `/snapshot restore` closes the local readers and drains the local gateway before restoring offline, then reconnects with the restored history. `/worktree` on exit asks keep / archive / remove for a dirty or unpushed tree. In messaging, `/model reset` clears this chat's session override (memory, persisted copy, any pending `--once` restore) so `channel_overrides` / `config.yaml` decide again. `/refine` works on an idle chat and posts its result in the same chat.
- Source: https://hermes-agent.nousresearch.com/docs/reference/slash-commands (pinned to v0.23.1). This page is condensed; the official page carries the full per-command descriptions.

### Migration (v0.22 -> v0.23)

Migration (v0.22 -> v0.23): `/save` is no longer CLI-only. It now takes `<json|md|html> [filename] [redact]` and also works on messaging platforms, where it sends the exported file into the chat; it was a bare "save the current conversation" command in v0.22.

## Related

- [CLI Interface](./interface.md)
- [CLI Commands Reference](./commands.md)
- [TUI](./tui.md)
- [Profile Commands](./profile-commands.md)

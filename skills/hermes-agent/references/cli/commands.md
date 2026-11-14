# CLI Commands Reference

Complete reference for all `hermes` CLI commands, subcommands, options, and flags.

## Signature / Usage

```bash
hermes [global-options] <command> [subcommand/options]
```

## Global Options

| Flag | Alias | Description |
|------|-------|-------------|
| `--version` | `-V` | Display version information |
| `--profile <name>` | `-p <name>` | Choose an alternate Hermes profile |
| `--resume <session>` | `-r <session>` | Restore previous session by ID or title |
| `--continue [name]` | `-c [name]` | Resume most recent matching session |
| `--worktree` | `-w` | Initialize isolated git worktree for parallel workflows (v0.23: the classic CLI is a gateway client and refuses it; use `hermes --tui -w`) |
| `--yolo` | | Suppress dangerous-command approval requests |
| `--pass-session-id` | | Embed session ID in system prompt |
| `--tui` | | Launch terminal UI mode |
| `--ignore-user-config` | | Skip personal config loading |
| `--ignore-rules` | | Skip auto-injection of `AGENTS.md`, `SOUL.md`, `.cursorrules`, memory, and preloaded skills |
| `--cli` | | Force the classic prompt_toolkit REPL (overrides `display.interface: tui` for one invocation) |
| `--in <dir>` | | Change into `<dir>` before starting or resuming; scopes `--resume latest` / `-c` lookups to that workspace |
| `--dev` | | With `--tui`: run TypeScript sources via `tsx` instead of the prebuilt bundle |

`--resume latest` resumes the most recent session (workspace-scoped, same lookup as `-c`). `--tui` is equivalent to `HERMES_TUI=1` and always wins over `display.interface`.

## `hermes -z <prompt>` (scripted one-shot)

Single prompt in, final response text out, nothing else on stdout or stderr (no banner, spinner, tool previews, or `Session:` line). Same agent, tools, and skills; use `hermes chat --oneshot -q` if tool output is wanted too.

```bash
hermes -z "What's the capital of France?"
hermes -z "What's the capital of France?" --provider openrouter --model openai/gpt-5.5
hermes -z "summarize this repo" --usage-file ~/.hermes/cache/scratch/usage.json
```

| Flag | Equivalent env var | Purpose |
|------|--------------------|---------|
| `-m` / `--model <model>` | `HERMES_INFERENCE_MODEL` | Override the model for this run |
| `--provider <provider>` | (none) | Override the provider for this run |
| `--usage-file <path>` | (none) | Write a JSON usage report after the run (written even when the run fails; auxiliary calls reported under `auxiliary`, grand total in `total_including_auxiliary`) |

Exit codes: `0` turn completed; `2` failed or stopped partway (also usage errors); `130` interrupted; `1` completed turn produced no text. These differ from `chat -q` / `-Q`, which exit `1` for failed/partial/budget.

## Top-Level Commands

| Command | Purpose |
|---------|---------|
| `hermes chat` | Interactive or scripted agent conversation |
| `hermes model` | Interactive provider/model selection |
| `hermes moa` | Configure named Mixture of Agents presets |
| `hermes gateway` | Run or manage messaging gateway service |
| `hermes egress` | Outbound credential-injection firewall for remote terminal sandboxes (iron-proxy; disabled by default) |
| `hermes setup` | Configuration wizard |
| `hermes whatsapp` | WhatsApp bridge configuration |
| `hermes login` / `logout` | Deprecated: removed, use `hermes auth` |
| `hermes peer` | Register peer Hermes gateways and DM their agents' Bot Chats |
| `hermes codex-runtime` | Noninteractive `/codex-runtime` migration of `~/.codex/config.toml` |
| `hermes usage` | Show account rate-limit windows without a session |
| `hermes project` | Named multi-folder workspaces (projects) |
| `hermes connectors` | List, connect, rename, disconnect hosted connector accounts |
| `hermes pets` | Browse, install, select petdex animated pets |
| `hermes import-agent` | Import an OpenClaw, Claude Code, Codex CLI or Cursor setup (from the `agent-importers` plugin) |
| `hermes clipboard image` | Write this machine's clipboard image to a file (`--json` for scripts) |
| `hermes serve` | Headless Hermes backend server (powers desktop and remote backends) |
| `hermes webapp` | Open the Desktop workspace in a browser, served by the gateway |
| `hermes pm` | Manage pinned tools, Python environments, diagnostics |
| `hermes desktop` (alias `gui`) | Build and launch the native Electron desktop app |
| `hermes auth` | Credential pool administration |
| `hermes status` | Display system/platform status |
| `hermes cron` | Scheduler inspection/management |
| `hermes webhook` | Dynamic webhook subscription handling |
| `hermes doctor` | Configuration diagnostics |
| `hermes config` | Configuration file operations |
| `hermes pairing` | Messaging pairing code approval |
| `hermes skills` | Skill browsing/installation/management |
| `hermes honcho` | Cross-session memory integration |
| `hermes memory` | External memory provider setup |
| `hermes acp` | ACP stdio server startup |
| `hermes mcp` | MCP server configuration (running Hermes as an MCP server is the `mcp-serve` plugin) |
| `hermes plugins` | Plugin management |
| `hermes tools` | Per-platform tool configuration |
| `hermes sessions` | Session browsing/export/management |
| `hermes insights` | Token/cost/activity analytics |
| `hermes claw` | OpenClaw migration (`migrate`, `cleanup`), from the `agent-importers` plugin |
| `hermes profile` | Multi-instance profile management |
| `hermes completion` | Shell completion script generation |
| `hermes version` | Version details display |
| `hermes update` | Dependency refresh |
| `hermes uninstall` | System removal |
| `hermes lsp` | Language Server Protocol integration |
| `hermes dashboard` | Web-based configuration UI |
| `hermes proxy` | Local OpenAI-compatible HTTP proxy |
| `hermes send` | One-shot messaging without agent loop |
| `hermes bundles` | Skill bundle (grouped slash commands) management |
| `hermes curator` | Auxiliary-model skill review and maintenance |
| `hermes backup` | Hermes home snapshot creation |
| `hermes import` | Restore from backup archive |
| `hermes checkpoints` | Filesystem checkpoint (rollback) management |
| `hermes kanban` | Multi-profile collaboration board |
| `hermes dump` | Copy-pasteable setup summary |
| `hermes debug` | Upload logs to paste service for support |
| `hermes logs` | View/tail agent and gateway logs |
| `hermes prompt-size` | System prompt byte-budget breakdown |
| `hermes security` | Supply-chain vulnerability audit |
| `hermes fallback` | Provider fallback chain management |
| `hermes hooks` | Shell-script hook inspection and management |
| `hermes portal` | Nous Portal auth/subscription status |
| `hermes secrets` | External secret manager integration |
| `hermes migrate` | Import another agent's setup (`migrate grok-bot`, `migrate claude-code`, ... or bare to detect), or rewrite config for retired models and deprecated settings (`migrate xai`) |
| `hermes slack` | Slack app manifest generation |
| `hermes computer-use` | Computer Use backend management (macOS) |

---

## `hermes chat`

```bash
hermes chat [options]
```

| Flag | Alias | Description |
|------|-------|-------------|
| `--query "..."` | `-q` | Non-interactive single prompt execution |
| `--model <model>` | `-m` | Override default model |
| `--toolsets <csv>` | `-t` | Enable comma-separated toolsets |
| `--provider <provider>` | | Force specific provider (see values below) |
| `--skills <name>` | `-s` | Preload skills (repeatable or comma-separated) |
| `--verbose` | `-v` | Extended output (v0.23: refused by the gateway-client classic CLI) |
| `--quiet` | `-Q` | Suppress UI elements |
| `--resume <session>` | | Session restoration by ID or title |
| `--continue [name]` | | Resume most recent matching session; `-c <title> --create-if-missing` creates the titled session when none exists |
| `--worktree` | | Isolated git worktree creation (v0.23: refused by the gateway-client classic CLI; use `hermes --tui -w`) |
| `--safe-mode` | | Troubleshooting mode: disable user config, rules/memory injection, plugins, shell hooks, and MCP servers; runs in an isolated worker and needs an explicit `--model` |
| `--base-url <url>` / `--api-key <key>` | | Explicit OpenAI-compatible endpoint and launch-only key for `--provider custom` (key held in the gateway's memory only, never written to disk) |
| `--checkpoints` | | Enable filesystem checkpoints |
| `--yolo` | | Skip approval dialogs |
| `--pass-session-id` | | Include session ID in prompt |
| `--source <tag>` | | Session source tag (default: `cli`) |
| `--max-turns <N>` | | Tool iteration limit (default: 500, or `agent.max_turns` in config; corrected from 90 per the v0.23.1 CLI reference) |

**`--provider` values:** `auto` `openrouter` `nous` `openai-codex` `anthropic` `huggingface` `zai` `kimi-coding` `minimax` `minimax-cn` `deepseek` `ai-gateway` `opencode-zen` `opencode-go` `kilocode` `alibaba` (and others — run `hermes model` for the full current list)

---

## `hermes model`

Interactive provider and model selection interface. Enables provider switching, OAuth login, model browsing, and custom endpoint configuration.

**In-session `/model` slash command:**

| Usage | Description |
|-------|-------------|
| `/model` | Display current model options |
| `/model claude-sonnet-4` | Switch model (auto-detects provider) |
| `/model zai:glm-5` | Specify provider and model |
| `/model custom:qwen-2.5` | Use custom endpoint model |
| `/model custom` | Auto-detect from custom endpoint |
| `/model custom:local:qwen-2.5` | Use named custom provider |
| `/model openrouter:anthropic/claude-sonnet-4` | Cloud-hosted model |

---

## `hermes gateway`

```bash
hermes gateway <subcommand>
```

| Subcommand | Description |
|------------|-------------|
| `run` | Execute gateway in foreground |
| `ensure` | Discover or request a local session runtime without installing a service or replacing an existing owner; emits JSON (see below) |
| `attach` | Give a local client the gateway's WebSocket URL and one single-use session ticket for this profile; emits JSON (see below) |
| `start` | Launch installed service |
| `stop` | Halt service |
| `restart` | Reload service |
| `status` | Service status report |
| `install` | Register as user service (systemd/launchd) |
| `uninstall` | Deregister service |
| `setup` | Interactive messaging platform configuration |

| Option | Description |
|--------|-------------|
| `-y`, `--yes` | On `stop` / `restart`: when the gateway is running chat turns, cron jobs or background delegations, the command lists them and asks `y/N` before interrupting them; `--yes` skips the question, and without a terminal it refuses unless `--yes` is passed (`--interrupt` is an alias) |
| `--detach` | On `restart`: when no gateway service is installed, start the replacement in the background (as `hermes gateway ensure` does) instead of in the current terminal |

### Local runtime discovery and startup

`hermes gateway ensure [--json] [--timeout 60]` discovers or starts the active profile's session runtime and prints one JSON object (`state`, `reason_code`, and an `endpoint` only once authenticated discovery reports compatible readiness; never tickets or credentials). It waits for an existing or starting owner instead of replacing it and never installs a service. Exit `0` means ready; any other code is a refusal or a deadline, never permission to start a replacement.

`hermes gateway attach [--json] [--start] [--recover] [--timeout 60]` is the attach step for a local client that dials the gateway itself. It prints `ensure`'s JSON plus, once the gateway is attachable, `url` (`ws://127.0.0.1:<port>/api/ws`), `protocol` (`hermes-gateway-v1`), `protocols` and `ticket`. The ticket is single-use, bound to the active profile, and expires 30 seconds after it is minted. A plain call only discovers the gateway; `--start` starts it when none serves the profile; `--recover` discovers first and starts (or replaces an older Hermes's gateway) only when it is not ready.

---

## `hermes setup`

```bash
hermes setup [model|terminal|gateway|tools|agent] [--non-interactive] [--reset]
```

| Section | Description |
|---------|-------------|
| `model` | Provider/model configuration |
| `terminal` | Terminal backend and sandbox setup |
| `gateway` | Messaging platform setup |
| `tools` | Platform-specific tool enablement |
| `agent` | Agent behavior configuration |

| Flag | Description |
|------|-------------|
| `--non-interactive` | Use defaults without prompts |
| `--reset` | Reinitialize configuration |

---

## `hermes whatsapp`

```bash
hermes whatsapp
```

Initiates WhatsApp pairing/setup flow including mode selection and QR-code pairing.

---

## `hermes login` / `hermes logout` (Deprecated)

`hermes login` has been removed. Use `hermes auth` to manage OAuth credentials, `hermes model` to select a provider, or `hermes setup` for full interactive setup.

```bash
hermes auth logout anthropic    # replacement for logout
```

## Notes on removed commands

- `hermes sync` (Skill Sync) was removed in v0.22.0.
- `hermes honcho`: since v0.22.0 Honcho is a catalog plugin; install it with `hermes plugins install honcho`, and `hermes honcho` is registered only while it is the active memory provider (see the `hermes honcho` section below).

---

## `hermes auth`

```bash
hermes auth [subcommand]
```

Manages credential rotation pools and key lifecycle.

| Subcommand | Description |
|------------|-------------|
| (none) | Interactive wizard |
| `list` | Display all credential pools |
| `list <provider>` | Show specific provider credentials |
| `add <provider> --api-key <key>` | Insert API key |
| `add <provider> --type oauth` | Add OAuth credential |
| `add openai-codex --browser` | Codex browser auth-code + PKCE on localhost:1455 instead of device code |
| `remove <provider> <index>` | Delete credential by position |
| `priority <provider> <target> <index>` | Move a credential to the front of fill_first order |
| `reset <provider> [index]` | Clear cooldown timers (all or one credential) |
| `refresh <provider> <label>` | Refresh one OAuth credential and clear its cooldown |
| `status <provider>` | Show auth status for a provider |
| `logout <provider>` | Log out and clear stored auth state |

Spotify login moved to the `spotify` catalog plugin's `hermes spotify login`.

---

## `hermes status`

```bash
hermes status [--all] [--deep]
```

| Flag | Description |
|------|-------------|
| `--all` | Comprehensive shareable redacted report |
| `--deep` | Extended diagnostic checks |

---

## `hermes cron`

```bash
hermes cron <list|create|edit|pause|resume|run|remove|status|tick>
```

| Subcommand | Description |
|------------|-------------|
| `list` | Display scheduled jobs |
| `create` / `add` | Schedule job from prompt (repeatable `--skill`) |
| `edit` | Modify schedule/prompt/skills |
| `pause` | Suspend job |
| `resume` | Reactivate job and compute next run |
| `run` | Trigger at next scheduler cycle |
| `remove` | Delete job |
| `status` | Scheduler operational status |
| `tick` | Execute due jobs once |

`edit` supports: `--clear-skills`, `--add-skill`, `--remove-skill`

---

## `hermes webhook`

```bash
hermes webhook <subscribe|list|remove|test>
```

Manages event-driven subscriptions (requires webhook platform enabled).

| Subcommand | Alias | Description |
|------------|-------|-------------|
| `subscribe` | `add` | Create webhook route (returns URL/secret) |
| `list` | `ls` | Display subscriptions |
| `remove` | `rm` | Delete subscription |
| `test` | | Verify subscription functionality |

### `hermes webhook subscribe`

```bash
hermes webhook subscribe <name> [options]
```

| Flag | Description |
|------|-------------|
| `--prompt` | Template with `{dot.notation}` payload references |
| `--events` | Comma-separated event types |
| `--description` | Human-readable label |
| `--skills` | Comma-separated skill names |
| `--deliver` | Target: `log` `telegram` `discord` `slack` `github_comment` |
| `--deliver-chat-id` | Channel/chat destination |
| `--secret` | Custom HMAC secret (auto-generated if omitted) |

---

## `hermes doctor`

```bash
hermes doctor [--fix]
```

| Flag | Description |
|------|-------------|
| `--fix` | Attempt automatic repairs |

---

## `hermes config`

```bash
hermes config <subcommand>
```

| Subcommand | Description |
|------------|-------------|
| `show` | Display configuration |
| `edit` | Open config.yaml in editor |
| `set <key> <value>` | Assign configuration value |
| `path` | Print config file location |
| `env-path` | Print .env file location |
| `check` | Identify missing/stale options |
| `migrate` | Add newly introduced options |

---

## `hermes pairing`

```bash
hermes pairing <list|approve|revoke|clear-pending>
```

| Subcommand | Description |
|------------|-------------|
| `list` | Show pending/approved users |
| `approve <platform> <code>` | Authorize pairing code |
| `revoke <platform> <user-id>` | Remove user access |
| `clear-pending` | Erase pending codes |

---

## `hermes skills`

```bash
hermes skills <subcommand>
```

| Subcommand | Description |
|------------|-------------|
| `browse` | Paginated registry browser |
| `search` | Registry search |
| `install` | Skill installation |
| `inspect` | Preview skill (no installation) |
| `list` | List installed skills |
| `check` | Detect hub skill updates |
| `update` | Reinstall updated hub skills |
| `audit` | Re-scan hub skills |
| `uninstall` | Remove hub skill |
| `publish` | Publish to registry |
| `reset` | Un-stick a bundled skill flagged `user_modified`; with `--restore`, replace the user copy with the bundled version |
| `opt-out` | Stop bundled skills being seeded into the active profile (writes `.no-bundled-skills`); with `--remove`, also delete unmodified bundled skills (`--yes` skips confirm) |
| `opt-in` | Undo `opt-out`; with `--sync`, re-seed immediately |
| `snapshot` | Export/import configurations |
| `tap` | Custom source management |
| `config` | Interactive per-platform enablement |

| Flag | Description |
|------|-------------|
| `--source official` | Official registries |
| `--source skills-sh` | skills.sh public directory |
| `--source well-known` | Endpoint-based registries |
| `--force` | Override non-dangerous blocks |

---

## `hermes honcho`

```bash
hermes honcho [--target-profile NAME] <subcommand>
```

Manages Honcho cross-session memory integration.

Note: since v0.22.0 Honcho is a plugin-catalog memory provider, not bundled. Run `hermes plugins install honcho`; the `hermes honcho` command is registered only while Honcho is the active memory provider (inactive providers do not expose subcommands). The v0.22.2 CLI reference no longer has a dedicated section for it; the subcommand table below is retained from earlier docs.

| Subcommand | Description |
|------------|-------------|
| `setup` | Redirect to unified setup |
| `status [--all]` | Configuration/connection status |
| `peers` | Cross-profile peer identities |
| `sessions` | Honcho session mappings |
| `map [name]` | Directory-to-session association |
| `peer` | Update peer names/reasoning (`--user`, `--ai`, `--reasoning`) |
| `mode [mode]` | Recall mode selection: `hybrid` `context` `tools` |
| `tokens` | Budget management (`--context N`, `--dialectic N`) |
| `identity [file] [--show]` | AI peer identity seeding |
| `enable` | Activate for profile |
| `disable` | Deactivate for profile |
| `sync` | Apply config to existing profiles |
| `migrate` | openclaw-honcho migration guide |

---

## `hermes memory`

```bash
hermes memory <subcommand>
```

External memory provider management.

**Supported providers:** `honcho` `openviking` `mem0` `hindsight` `holographic` `supermemory` `retaindb` `byterover`. Bundled: `retaindb`, `byterover`. The others are plugin-catalog providers (v0.22.0) installed with `hermes plugins install <name>` (`hermes update` does this automatically for a provider already named in `memory.provider`). Only one external provider is active at a time; built-in MEMORY.md/USER.md is always active.

| Subcommand | Description |
|------------|-------------|
| `setup` | Provider selection/configuration |
| `status` | Current configuration report |
| `off` | Disable external provider (built-in only) |

---

## `hermes acp`

```bash
hermes acp
```

Launches Hermes as an ACP (Agent Client Protocol) stdio server.

```bash
# Alternative entrypoints
hermes-acp
python -m acp_adapter

# Installation (if ACP support is missing)
cd ~/.hermes/hermes-agent && python -c "import pm; pm.sync_venv(['acp'], explicit=True)"
```

---

## `hermes mcp`

```bash
hermes mcp <subcommand>
```

MCP (Model Context Protocol) server management. Running Hermes itself as an MCP server moved to the `mcp-serve` plugin (`hermes plugins install mcp-serve`, then `hermes mcp-serve`); `hermes mcp serve` prints that new spelling.

| Subcommand | Alias | Description |
|------------|-------|-------------|
| (none) / `picker` | | Interactive catalog picker for Nous-approved MCPs |
| `catalog` | | List Nous-approved MCPs (plain text) |
| `install <name>` | | Install a catalog entry (e.g. `hermes mcp install deepwiki`) |
| `login <name>` | | Force re-authentication for an OAuth-based MCP server |
| `add <name>` | | Register MCP server (`--url`, `--command`, `--args`, `--auth oauth|header`) |
| `remove <name>` | `rm` | Deregister server |
| `list` | `ls` | Display servers |
| `test <name>` | | Test server connectivity |
| `configure <name>` | `config` | Toggle tool selection |

---

## `hermes plugins`

```bash
hermes plugins [subcommand]
```

| Subcommand | Alias | Description |
|------------|-------|-------------|
| (none) | | Interactive curses toggle interface |
| `install <identifier> [--force]` | | Add plugin (Git URL, owner/repo) |
| `update <name>` | | Pull latest changes |
| `update [--yes]` | | With no name: list every installed plugin that has an update, ask `Update all N? [Y/n]`, then update each through the single-plugin path; one failure does not stop the rest (exits 1 if any failed). Without a terminal nothing is updated unless `--yes` is passed |
| `remove <name>` | `rm`, `uninstall` | Delete plugin |
| `enable <name>` | | Reactivate disabled plugin |
| `disable <name>` | | Deactivate without removal |
| `list` | `ls` | Display installed plugins and status |

---

## `hermes tools`

```bash
hermes tools [--summary]
```

| Flag | Description |
|------|-------------|
| `--summary` | Print enabled-tools summary |

Without a flag, launches the interactive per-platform configuration UI.

---

## `hermes sessions`

```bash
hermes sessions <subcommand>
```

| Subcommand | Description |
|------------|-------------|
| `list` | Recent sessions listing |
| `browse` | Interactive session picker |
| `export <output> [--session-id ID]` | JSONL export |
| `delete <session-id>` | Single session removal |
| `prune` | Delete old sessions |
| `stats` | Store statistics |
| `rename <session-id> <title>` | Title assignment |
| `refresh-prompts [--session ID] [--json]` | Make continuing sessions rebuild their stored system prompt from the current `SOUL.md`, skills and context files on their next turn, keeping history and session ids (`-p/--profile` targets another profile; works with the gateway running; each refreshed session pays one prompt-cache miss) |

---

## `hermes insights`

```bash
hermes insights [--days N] [--source platform]
```

| Flag | Description |
|------|-------------|
| `--days <n>` | Analysis window in days (default: 30) |
| `--source <platform>` | Filter by source: `cli` `telegram` `discord` etc. |

---

## `hermes claw`

```bash
hermes plugins install agent-importers   # once; the command comes from this official plugin
hermes claw migrate [options]            # same as: hermes import-agent openclaw [options]
hermes claw cleanup [--source <path>] [--dry-run] [--yes]
```

OpenClaw-to-Hermes migration utility (from the `agent-importers` plugin). Reads from `~/.openclaw`, writes to `~/.hermes`. `hermes claw cleanup` renames leftover OpenClaw directories to `*.pre-migration` once you have migrated.

| Flag | Description |
|------|-------------|
| `--dry-run` | Preview without writing |
| `--preset <name>` | Migration scope: `full` `user-data` |
| `--overwrite` | Overwrite existing files |
| `--migrate-secrets` | Include API keys |
| `--source <path>` | Custom OpenClaw directory |
| `--workspace-target <path>` | `AGENTS.md` destination |
| `--skill-conflict <mode>` | Collision handling: `skip` `overwrite` `rename` |
| `--yes` | Skip confirmation |

Covers 30+ configuration categories including persona, memory, skills, providers, messaging, agent behavior, MCP servers, TTS, and API key sources.

---

## `hermes profile`

```bash
hermes profile <subcommand>
```

Multi-instance profile administration.

| Subcommand | Description |
|------------|-------------|
| `list` | Display all profiles |
| `use <name>` | Set sticky default |
| `create <name>` | New profile (`--clone`, `--clone-all`, `--clone-from <source>`, `--no-alias`) |
| `delete <name> [-y]` | Profile removal |
| `show <name>` | Profile details |
| `alias <name>` | Wrapper script management (`--remove`, `--name NAME`) |
| `rename <old> <new>` | Profile renaming |
| `export <name> [-o FILE]` | Archive export |
| `import <archive>` | Archive import (`--name NAME`) |

---

## `hermes completion`

```bash
hermes completion [bash|zsh]
```

Outputs shell completion script to stdout.

---

## `hermes lsp`

```bash
hermes lsp <subcommand>
```

Language Server Protocol integration for semantic diagnostics in file operations.

| Subcommand | Description |
|------------|-------------|
| `status` | Show LSP status |
| `list` | List available language servers |
| `install <server>` | Install a specific language server |
| `install-all` | Install all supported language servers |
| `restart` | Restart running servers |
| `which` | Show server binary locations |

---

## `hermes dashboard`

```bash
hermes dashboard [options]
hermes dashboard register
```

Launches a web-based configuration UI (default port: 9119).

| Flag | Description |
|------|-------------|
| `--port <n>` | Listen port |
| `--host <host>` | Bind host |
| `--no-open` | Do not auto-open browser |
| `--insecure` | Deprecated / no-op (since the June 2026 hardening a public bind always requires an auth provider; bind `127.0.0.1` and tunnel to keep it local) |
| `--skip-build` | Skip the web UI build and serve existing `dist` |
| `--isolated` | From a named profile, run a dedicated per-profile server instead of routing to the machine dashboard |
| `--stop` | Stop the running dashboard / serve backend of this Hermes home |
| `--status` | List running `hermes dashboard` processes |

`register` integrates with Nous Portal OAuth (`--name`, `--redirect-uri`, `--portal-url`).

## `hermes serve`

```bash
hermes serve [options]
```

Headless Hermes backend server (JSON-RPC/WebSocket gateway for the desktop app and remote clients); same server as `hermes dashboard` without the browser UI, with the same `--host` / `--port` / `--insecure` / `--skip-build` / `--stop` / `--status` options. If the port (default 9119) is taken it prints `BACKEND_PORT_IN_USE port=<port>` and exits with code 75; `--port 0` binds a free port.

---

## `hermes proxy`

```bash
hermes proxy <subcommand> [options]
```

Local OpenAI-compatible HTTP server forwarding to OAuth providers.

| Subcommand | Description |
|------------|-------------|
| `start` | Start proxy (`--provider`, `--host`, `--port`) |
| `status` | Show proxy status |
| `providers` | List available providers |

---

## `hermes send`

```bash
hermes send -t <target> [options] [message]
```

One-shot message delivery without invoking the agent loop.

| Flag | Alias | Description |
|------|-------|-------------|
| `--to <target>` | `-t` | Destination platform/channel |
| `--file <path>` | | Read message from file |
| `--subject <text>` | `-s` | Message subject |
| `--list` | `-l` | List available targets |
| `--quiet` | `-q` | Suppress output |
| `--json` | | Machine-readable output |

---

## `hermes bundles`

```bash
hermes bundles <subcommand>
```

Groups multiple skills under a single `/<bundle-name>` slash command.

| Subcommand | Description |
|------------|-------------|
| `list` | Display all bundles |
| `show <name>` | Bundle details |
| `create <name>` | Create a bundle |
| `delete <name>` | Remove a bundle |

Bundles stored at `~/.hermes/skill-bundles/<slug>.yaml`.

---

## `hermes curator`

```bash
hermes curator <subcommand>
```

Auxiliary-model background process that reviews, prunes, and consolidates agent-created skills.

| Subcommand | Description |
|------------|-------------|
| `status` | Curator status |
| `run` | Trigger a review cycle |
| `backup` | Snapshot current skills |
| `rollback` | Restore previous snapshot |
| `pause` | Suspend curator |
| `resume` | Resume curator |
| `pin <skill>` | Protect skill from pruning |
| `archive <skill>` | Move skill to archive |
| `prune` | Delete archived skills |

---

## `hermes backup` / `hermes import`

```bash
hermes backup [-o <output>] [-q] [-l <label>]
hermes import <archive> [--name <name>]
```

Create and restore Hermes home snapshots (config, skills, sessions, data).

`backup` uses SQLite backup API — safe to run while Hermes is active.

| Flag | Description |
|------|-------------|
| `-o / --output <path>` | Output file path |
| `-q / --quick` | Skip session data |
| `-l / --label <text>` | Archive label |

---

## `hermes checkpoints`

```bash
hermes checkpoints <subcommand>
```

Manages the shadow git store used by `/rollback` to restore filesystem state.

| Subcommand | Description |
|------------|-------------|
| `status` | Store statistics |
| `prune` | Remove old checkpoints |
| `clear` | Delete all checkpoints |
| `clear-legacy` | Remove pre-migration checkpoints |

---

## `hermes kanban`

```bash
hermes kanban [--board <slug>] <subcommand>
```

Multi-profile collaboration board with tasks, dependencies, and dispatcher integration.

| Subcommand | Description |
|------------|-------------|
| `init` | Initialize board |
| `boards list/create/switch/rename/rm` | Board management |
| `create` | Create task |
| `list` | List tasks |
| `show <id>` | Task details |
| `assign <id> <profile>` | Assign task |
| `link <id> <dep-id>` | Add dependency |
| `claim <id>` | Claim task for current profile |
| `comment <id> <text>` | Add comment |
| `complete <id>` | Mark complete |
| `dispatch` | Send tasks to assigned profiles |
| `specify <id>` | Refine task spec with agent |
| `decompose <id>` | Break into subtasks |

---

## `hermes dump`

```bash
hermes dump [--show-keys]
```

Produces a copy-pasteable setup summary (version, OS, model, API key status, features, services). `--show-keys` includes partial key values.

---

## `hermes debug`

```bash
hermes debug share [options]
```

Uploads system info and logs to a paste service for support.

| Flag | Description |
|------|-------------|
| `--lines <n>` | Number of log lines to include |
| `--expire <duration>` | Paste expiry duration |
| `--local` | Print locally instead of uploading |

---

## `hermes logs`

```bash
hermes logs [<log-name>] [options]
```

Views or tails agent, gateway, and error logs.

**Log names:** `agent`, `errors`, `gateway`, `gui`, `desktop`

| Flag | Description |
|------|-------------|
| `-n / --lines <n>` | Number of lines to show |
| `-f / --follow` | Tail (follow) mode |
| `--level <level>` | Filter by log level |
| `--session <id>` | Filter by session |
| `--since <time>` | Show logs since timestamp |
| `--component <name>` | Filter by component |

---

## `hermes prompt-size`

```bash
hermes prompt-size [options]
```

Reports fixed prompt budget breakdown: system prompt, skills, memory, and tool schemas. Runs offline.

| Flag | Description |
|------|-------------|
| `--platform <name>` | Target platform for schema calculation |
| `--json` | Machine-readable output |

---

## `hermes security`

```bash
hermes security audit [options]
```

OSV.dev supply-chain vulnerability scan for venv, plugins, and MCP servers.

| Flag | Description |
|------|-------------|
| `--json` | Machine-readable output |
| `--fail-on <severity>` | Exit non-zero at or above severity |
| `--skip-venv` | Skip venv scanning |
| `--skip-plugins` | Skip plugin scanning |
| `--skip-mcp` | Skip MCP server scanning |

---

## `hermes fallback`

```bash
hermes fallback <subcommand>
```

Manages ordered provider fallback chain for rate-limit / overload recovery.

| Subcommand | Description |
|------------|-------------|
| `list` | Display current fallback chain |
| `add <provider>` | Append provider to chain |
| `remove <provider>` | Remove from chain |
| `clear` | Reset fallback chain |

---

## `hermes hooks`

```bash
hermes hooks <subcommand>
```

Inspects, tests, and manages shell-script hooks defined in configuration.

| Subcommand | Description |
|------------|-------------|
| `list` | Display all registered hooks |
| `test <hook>` | Dry-run a hook |
| `revoke <hook>` | Remove hook consent |
| `doctor` | Validate hook configuration |

---

## `hermes portal`

```bash
hermes portal <subcommand>
```

Nous Portal authentication and Tool Gateway status.

| Subcommand | Description |
|------------|-------------|
| `status` | Auth and subscription status |
| `open` | Open Portal in browser |
| `tools` | Tool Gateway routing info |

---

## `hermes secrets`

```bash
hermes secrets <subcommand>
```

External secret manager integration (Bitwarden currently supported). Pulls API keys at startup rather than storing in `.env`.

| Subcommand | Description |
|------------|-------------|
| `setup` | Configure secret manager |
| `status` | Show current configuration |
| `token` | Rotate the access token (validated before storing; `--access-token`, `--no-verify`) |
| `sync` | Fetch secrets now and report changes; `--apply` exports them into the current shell environment (default is dry-run) |
| `install` | Install or repair the PM-pinned `bws` binary |
| `disable` | Disable integration |

---

## `hermes migrate`

```bash
hermes migrate                 # find another agent's setup here and offer to import it
hermes migrate <agent>         # openclaw, claude-code, codex, cursor, grok-bot or openbot
hermes migrate xai [--apply] [--no-backup]
```

Bare `hermes migrate` looks for OpenClaw, Claude Code, Codex CLI, Cursor, Grok Bot and OpenBot on this computer and offers to import what it finds. `hermes migrate <agent>` imports from that agent even when nothing is detected: it installs the `agent-importers` plugin from the catalog when missing, then runs `hermes import-agent <agent>` (preview, then confirmation). It takes `--source`, `--dry-run`, `--overwrite` and `-y`; `grok-bot` and `openbot` also take `--activate-routines` and `--bot <name>`; `openclaw` takes `--migrate-secrets`.

The `xai` and `relay` types rewrite config for retired models or deprecated settings (`xai` scans for xAI models retired on May 15, 2026).

| Flag | Description |
|------|-------------|
| `--apply` | Write changes (default: dry-run) |
| `--no-backup` | Skip config backup |

---

## `hermes slack`

```bash
hermes slack manifest [options]
```

Generates a Slack app manifest registering gateway commands as slash commands.

| Flag | Description |
|------|-------------|
| `--write` | Write manifest to file |
| `--slashes-only` | Only include slash commands |
| `--name <name>` | App display name |
| `--description <text>` | App description |

---

## `hermes computer-use`

```bash
hermes computer-use <subcommand> [--upgrade]
```

Manages the Computer Use backend (macOS only, via cua-driver).

| Subcommand | Description |
|------------|-------------|
| `install` | Install cua-driver |
| `status` | Show installation status |
| `doctor [--include CHECK] [--skip CHECK] [--json]` | Run cua-driver's health report |
| `permissions status [--json]` / `permissions grant` | Report / request macOS Accessibility and Screen Recording grants |

Now supported on macOS, Windows, and Linux.

---

## `hermes peer`

```bash
hermes peer add <name> --url http://host:port --key <API_SERVER_KEY>
hermes peer list
hermes peer dm <peer>[/<agent>] "message"
hermes peer run <peer>[/<agent>] --idempotency-key <key> "message"
hermes peer status <peer>[/<agent>] <run_id>
hermes peer stop <peer>[/<agent>] <run_id>
hermes peer remove <name>
```

Bot-to-bot DMs across machines: register another Hermes gateway (running the `api_server` platform) as a peer, then message its agents. `<peer>` targets the main agent; `<peer>/<agent>` a named profile on a multiplexed peer. `add` stores the URL in `config.yaml` (`bot_peers`) and the key as `HERMES_PEER_<NAME>_KEY` in `~/.hermes/.env`. `dm`, `run`, `status`, `stop` support `--json`. Exit codes: 0 success, 1 delivery/peer failure, 2 usage error.

## `hermes codex-runtime`

```bash
hermes codex-runtime migrate [--dry-run] [--json]
```

Regenerates the Hermes-managed block in `~/.codex/config.toml` (projects `mcp_servers`, installed codex plugins, and the `default_permissions` default). User text outside the block is kept verbatim; exit code is 1 when the report contains errors.

## `hermes usage`

```bash
hermes usage [--provider NAME] [--json]
```

Account rate-limit windows (the `/usage` block) without a session. Supported providers: `openai-codex`, `anthropic`, `openrouter`. Exit code 1 when no credential, no usage endpoint, or fetch fails.

## `hermes egress`

```bash
hermes egress install [--force]
hermes egress setup [--tunnel-port N] [--from-bitwarden | --no-bitwarden] [--rotate-tokens]
hermes egress start | stop | restart | reload
hermes egress status [--show-tokens]
hermes egress disable | config
```

Wraps the iron-proxy daemon, a TLS-intercepting proxy that swaps opaque proxy tokens for real upstream credentials so sandboxes never hold real keys. Disabled by default.

## `hermes project`

```bash
hermes project <create|list|show|add-folder|remove-folder|rename|set-primary|use|archive|restore|bind-board>
```

Human-named workspaces spanning multiple folders/repos; anchors desktop session grouping, and a kanban task linked to a project (`hermes kanban create --project <slug>`) defaults to a deterministic worktree + branch under the project's primary folder (when it has one). `bind-board` records a kanban board on the project and, when the board exists and the project has a primary folder, points the board's default workdir at it; it does not link the board's tasks to the project. State is per-profile.

## `hermes import`

```bash
hermes import <zipfile> [-f|--force]
```

Restores a backup into the Hermes home (all archive files overwrite existing ones; `--force` only skips the confirmation prompt). Stop the gateway first. Exits 1 when the archive is damaged (CRC checked before anything is written) or any file could not be restored. `.db` members are written into the existing database file.

## `hermes moa`

```bash
hermes moa list
hermes moa configure [name]
hermes moa delete <name>
```

Named Mixture of Agents presets, selectable under a `Mixture of Agents` provider in every model picker; `/moa <prompt>` runs a prompt through the default preset.

## `hermes connectors`

```bash
hermes connectors <list|accounts|connect|rename|disconnect>
```

Hosted connector accounts (apps such as Gmail via the Nous tool gateway; needs a Nous Portal sign-in). `connect <app> [--alias NAME] [--reconnect [--force]]`, `accounts [app] [--all]`, `rename <app> <name-or-label> --to <new>`, `disconnect <app> [--alias NAME] [--yes]`.

## `hermes pets`

```bash
hermes pets <list|install|select|show|off|scale|remove|doctor>
```

Petdex animated pets shown in the CLI, TUI, and desktop app; `/hatch` generates a new pet.

## `hermes import-agent`

```bash
hermes plugins install agent-importers   # once; the command comes from this official plugin
hermes import-agent [openclaw|claude-code|codex|cursor] [--source <path>] [--dry-run] [--overwrite] [--yes] [--sync]
```

Imports an OpenClaw (`~/.openclaw`), Claude Code (`~/.claude`), Codex CLI (`~/.codex`) or Cursor (`~/.cursor`) setup: instructions and rules to memory entries, `Bash(...)` rules to `command_allowlist` / `approvals.deny`, MCP servers to `mcp_servers`, skills to `~/.hermes/skills/`. Previews first; credentials are never imported, except OpenClaw's allowlisted keys with `--migrate-secrets`. Each Claude Code / Codex / Cursor import registers its source in `~/.hermes/import-sync.json`; `--sync` re-imports changed sources. Without the plugin, `hermes import-agent` and `hermes claw` print the install line.

## `hermes webapp`

```bash
hermes webapp [options]
```

Opens the Hermes Desktop workspace in a normal browser; the gateway serves it on its own listener when `webapp.enabled` is `true` in the config. The command builds the Webapp bundle when it is out of date, starts the gateway if it is not running, and opens a one-use sign-in link (valid 60 seconds, works once).

| Flag | Description |
|------|-------------|
| `--no-open` | Print the one-use link (or, behind the sign-in gate, the address) instead of opening a browser |
| `--skip-build` | Use the existing `apps/desktop/dist-webapp` as is |
| `--force-build` | Rebuild the bundle even when its build receipt is current |
| `--build-only` | Build the bundle and stop |
| `--status` | Show whether the running gateway serves the Webapp, and at which address |
| `--sign-out` | Sign out every browser; native apps that signed in on their own stay signed in |

```bash
hermes config set webapp.enabled true
hermes gateway restart
hermes webapp
```

## `hermes clipboard`

```bash
hermes clipboard image --out PATH [--json]
```

Writes the clipboard image to `PATH` using the same extractor as CLI/TUI image paste. It reads only this machine's clipboard and needs no running gateway. Exit codes: `0` written, `1` `no_image`, `3` `no_tool` (no clipboard tool installed), `4` `write_failed`, `2` usage error.

## `hermes pm`

```bash
hermes pm doctor | status | repair | install [name] | lock | gc
```

Manages pinned tools, Python dependency environments, and diagnostics; does not update the Hermes application itself (see reference/package-management). v0.23 additions: `pm doctor --repair` removes corrupt uv-cache entries, `pm install --without NAME` / `--extra EXTRA` opt out of or back into optional packages and extras, and `pm environment NAME --extra EXTRA` prepares an isolated side environment and prints its Python path.

---

## Maintenance Commands

| Command | Description |
|---------|-------------|
| `hermes --version` | Version information display |
| `hermes update` | Update to the latest stable release (or selected channel) and reinstall dependencies |
| `hermes uninstall [--full] [--gui] [--data] [--dry-run] [--yes]` | Remove owned source-install files; `--gui` removes source-built desktop, `--full` also data, `--data` user data only |

### `hermes update`

```bash
hermes update [--gateway] [--check] [--plan] [--no-backup] [--backup] [--yes]
```

| Option | Description |
|--------|-------------|
| `--set-channel main\|stable` | Persist the update channel (`stable` = latest published `vX.Y.Z` release; `main` = every commit). Bundled apps refuse channel changes |
| `--channel CHANNEL` | Select a channel for this invocation only |
| `--branch NAME` | Select a source branch for this invocation |
| `--check` | Check for an update without applying |
| `--plan` | Print the update plan (install kind, running services, restart method) and exit |
| `--backup` / `--no-backup` | Force a full pre-update backup / skip all backups (default `updates.pre_update_backup: quick`) |
| `--install-id` | Print installation identity and path |
| `--yes`, `-y` | Assume yes for prompts |

Source checkouts of the official repo default to `stable`; forks and mirrors default to `main`. Desktop bundles, Docker, Nix, and Termux packages keep their external update owner. Exit codes: 0 success, 1 pull/install errors, 2 unexpected working-tree changes.

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/reference/cli-commands (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

- Migration (v0.22 -> v0.23): `hermes import-agent` and `hermes claw` moved out of core into the official `agent-importers` plugin (`hermes plugins install agent-importers`). `hermes import-agent` now accepts `openclaw` and `cursor` besides `claude-code` / `codex`; `hermes claw migrate` equals `hermes import-agent openclaw`; `hermes claw cleanup` is new.
- Migration (v0.22 -> v0.23): `hermes mcp serve` was removed; use the `mcp-serve` plugin (`hermes plugins install mcp-serve`, then `hermes mcp-serve`).
- Migration (v0.22 -> v0.23): the `copilot` and `copilot-acp` values of `--provider` are no longer listed in the CLI reference.
- Migration (v0.22 -> v0.23): the classic `hermes chat` CLI is a gateway client; options that need an in-process agent (`--image`, `--worktree`/`-w`, `--no-restore-cwd`, `--run-budget`, `--verbose`/`-v`, `--compact`) are refused up front (`Unsupported gateway CLI options: ...`, exit 2). Use `hermes --tui -w` for worktrees.
- Migration (v0.22 -> v0.23): `hermes chat --safe-mode` runs in an isolated gateway worker, requires an explicit `--model`, and no longer sets `HERMES_SAFE_MODE`.
- `hermes -z --usage-file`: auxiliary `web_extract` calls are no longer listed among the auxiliary LLM calls reported under `auxiliary`.
- `hermes pause` / `hermes resume` now also hold interactive CLI, TUI and Desktop turns (they are gateway turns); turns already running finish.

## Related

- [CLI Interface](./interface.md)

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
| `--worktree` | `-w` | Initialize isolated git worktree for parallel workflows |
| `--yolo` | | Suppress dangerous-command approval requests |
| `--pass-session-id` | | Embed session ID in system prompt |
| `--tui` | | Launch terminal UI mode |
| `--ignore-user-config` | | Skip personal config loading |
| `--ignore-rules` | | Skip auto-injection of context files |

## Top-Level Commands

| Command | Purpose |
|---------|---------|
| `hermes chat` | Interactive or scripted agent conversation |
| `hermes model` | Interactive provider/model selection |
| `hermes gateway` | Run or manage messaging gateway service |
| `hermes setup` | Configuration wizard |
| `hermes whatsapp` | WhatsApp bridge configuration |
| `hermes login` / `logout` | OAuth authentication management |
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
| `hermes mcp` | MCP server configuration/operation |
| `hermes plugins` | Plugin management |
| `hermes tools` | Per-platform tool configuration |
| `hermes sessions` | Session browsing/export/management |
| `hermes insights` | Token/cost/activity analytics |
| `hermes claw` | OpenClaw migration utilities |
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
| `hermes migrate` | Config rewriting for deprecated settings |
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
| `--verbose` | `-v` | Extended output |
| `--quiet` | `-Q` | Suppress UI elements |
| `--resume <session>` | | Session restoration by ID or title |
| `--continue [name]` | | Resume most recent matching session |
| `--worktree` | | Isolated git worktree creation |
| `--checkpoints` | | Enable filesystem checkpoints |
| `--yolo` | | Skip approval dialogs |
| `--pass-session-id` | | Include session ID in prompt |
| `--source <tag>` | | Session source tag (default: `cli`) |
| `--max-turns <N>` | | Tool iteration limit (default: 90) |

**`--provider` values:** `auto` `openrouter` `nous` `openai-codex` `copilot-acp` `copilot` `anthropic` `huggingface` `zai` `kimi-coding` `minimax` `minimax-cn` `deepseek` `ai-gateway` `opencode-zen` `opencode-go` `kilocode` `alibaba` (and others — run `hermes model` for the full current list)

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
| `start` | Launch installed service |
| `stop` | Halt service |
| `restart` | Reload service |
| `status` | Service status report |
| `install` | Register as user service (systemd/launchd) |
| `uninstall` | Deregister service |
| `setup` | Interactive messaging platform configuration |

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

## `hermes login` / `hermes logout`

```bash
hermes login [--provider nous|openai-codex] [--portal-url ...] [--inference-url ...]
hermes logout [--provider nous|openai-codex]
```

**Supported methods:** Nous Portal OAuth/device flow, OpenAI Codex OAuth/device flow.

| Flag | Description |
|------|-------------|
| `--no-browser` | Disable browser opening |
| `--timeout <seconds>` | Connection timeout |
| `--ca-bundle <pem>` | Custom certificate bundle |
| `--insecure` | Skip certificate validation |

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
| `remove <provider> <index>` | Delete credential by position |
| `reset <provider>` | Clear cooldown timers |

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

**Supported providers:** `honcho` `openviking` `mem0` `hindsight` `holographic` `retaindb` `byterover`

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

# Installation
pip install -e '.[acp]'
```

---

## `hermes mcp`

```bash
hermes mcp <subcommand>
```

MCP (Model Context Protocol) server management and operation.

| Subcommand | Alias | Description |
|------------|-------|-------------|
| `serve [-v]` | | Operate as MCP server |
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
hermes claw migrate [options]
```

OpenClaw-to-Hermes migration utility. Reads from `~/.openclaw`, writes to `~/.hermes`.

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
| `--insecure` | Allow insecure connections |

`register` integrates with Nous Portal OAuth.

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
| `sync` | Pull latest secrets |
| `install` | Install dependencies |
| `disable` | Disable integration |

---

## `hermes migrate`

```bash
hermes migrate xai [--apply] [--no-backup]
```

Rewrites config for retired models or deprecated settings.

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

---

## Maintenance Commands

| Command | Description |
|---------|-------------|
| `hermes version` | Version information display |
| `hermes update` | Pull latest code and reinstall |
| `hermes uninstall [--full] [--yes]` | System removal (optionally delete data) |

## Related

- [CLI Interface](./interface.md)

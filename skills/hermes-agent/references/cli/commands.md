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

**`--provider` values:** `auto` `openrouter` `nous` `openai-codex` `copilot-acp` `copilot` `anthropic` `huggingface` `zai` `kimi-coding` `minimax` `minimax-cn` `deepseek` `ai-gateway` `opencode-zen` `opencode-go` `kilocode` `alibaba`

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

## Maintenance Commands

| Command | Description |
|---------|-------------|
| `hermes version` | Version information display |
| `hermes update` | Pull latest code and reinstall |
| `hermes uninstall [--full] [--yes]` | System removal (optionally delete data) |

## Related

- [CLI Interface](./interface.md)

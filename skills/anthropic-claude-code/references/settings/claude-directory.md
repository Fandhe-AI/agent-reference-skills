<!-- source: https://code.claude.com/docs/en/claude-directory.md / last verified: 2026-08-07 -->

# Explore the .claude directory

Where Claude Code reads CLAUDE.md, settings.json, hooks, skills, commands, subagents, workflows, rules, and auto memory — both in a project's `.claude/` and in `~/.claude` in your home directory. Commit project files to git to share with your team; `~/.claude` is personal, applies across all projects. On Windows, `~/.claude` resolves to `%USERPROFILE%\.claude`; if `CLAUDE_CONFIG_DIR` is set, every `~/.claude` path lives under that directory instead.

## Signature / Usage

Project tree (root of repo unless noted):

```text
your-project/
  CLAUDE.md                 # committed — project instructions loaded every session
  .mcp.json                 # committed — project-scoped MCP servers
  .worktreeinclude           # committed — gitignored files to copy into new worktrees
  .claude/
    settings.json            # committed — permissions, hooks, statusLine, model, env, outputStyle
    settings.local.json       # gitignored — personal overrides, highest precedence of user-editable files
    rules/*.md                # committed — topic-scoped instructions, optionally paths-gated
    skills/<name>/SKILL.md    # committed — reusable prompts, /name or auto-invoked
    commands/*.md             # committed — single-file prompts (same mechanism as skills)
    output-styles/*.md        # committed — project-scoped output styles
    agents/*.md                # committed — subagent definitions
    workflows/*.js             # committed — dynamic workflow scripts
    agent-memory/<name>/MEMORY.md  # committed, Claude-written — project-scoped subagent memory
```

Global tree (`~/`):

```text
~/.claude.json               # local — app state, OAuth, UI toggles, personal MCP servers
~/.claude/
  CLAUDE.md                   # local — personal preferences across every project
  settings.json                # local — defaults for all projects
  keybindings.json              # local — custom keyboard shortcuts
  themes/*.json                  # local — custom color themes
  projects/<project>/memory/MEMORY.md  # local, Claude-written — auto memory
  rules/*.md                     # local — user-level rules
  skills/, commands/, output-styles/, agents/, workflows/, agent-memory/  # personal counterparts of the project folders
```

## Options / Props

### What's not shown in the tree

| File | Location | Purpose |
| --- | --- | --- |
| `managed-settings.json` | System-level, varies by OS | Enterprise-enforced settings you can't override (apart from narrow exceptions) |
| `CLAUDE.local.md` | Project root | Private preferences for this project, loaded alongside CLAUDE.md; create manually, add to `.gitignore` |
| Installed plugins | `~/.claude/plugins` | Cloned marketplaces, installed plugin versions, per-plugin data; orphaned versions deleted 14 days after update/uninstall |

### Choose the right file

| You want to | Edit | Scope |
| --- | --- | --- |
| Give Claude project context and conventions | `CLAUDE.md` | project or global |
| Allow or block specific tool calls | `settings.json` `permissions`/`hooks` | project or global |
| Run a script before/after tool calls | `settings.json` `hooks` | project or global |
| Set environment variables for the session | `settings.json` `env` | project or global |
| Keep personal overrides out of git | `settings.local.json` | project only |
| Add a prompt/capability invoked with `/name` | `skills/<name>/SKILL.md` | project or global |
| Define a specialized subagent | `agents/*.md` | project or global |
| Orchestrate many subagents from a script | `workflows/*.js` | project or global |
| Connect external tools over MCP | `.mcp.json` | project only |
| Change how Claude formats responses | `output-styles/*.md` | project or global |

### File reference (Commit column = typically checked into git)

| File | Scope | Commit | What it does |
| --- | --- | --- | --- |
| `CLAUDE.md` | Project and global | Yes | Instructions loaded every session |
| `rules/*.md` | Project and global | Yes | Topic-scoped instructions, optionally path-gated (via `paths:` frontmatter) |
| `settings.json` | Project and global | Yes | Permissions, hooks, env vars, model defaults |
| `settings.local.json` | Project only | No | Personal overrides, gitignored when Claude Code saves a setting to it |
| `.mcp.json` | Project only | Yes | Team-shared MCP servers |
| `.worktreeinclude` | Project only | Yes | Gitignored files to copy into new worktrees |
| `skills/<name>/SKILL.md` | Project and global | Yes | Reusable prompts, `/name` or auto-invoked |
| `commands/*.md` | Project and global | Yes | Single-file prompts, same mechanism as skills |
| `output-styles/*.md` | Project and global | Yes | Custom system-prompt sections |
| `agents/*.md` | Project and global | Yes | Subagent definitions with own prompt and tools |
| `workflows/*.js` | Project and global | Yes | Dynamic workflow scripts, saved from `/workflows`, each becomes a `/<name>` command |
| `agent-memory/<name>/` | Project and global | Yes | Persistent memory for subagents (`memory:` frontmatter) |
| `~/.claude.json` | Global only | No | App state, OAuth, UI toggles, personal MCP servers |
| `projects/<project>/memory/` | Global only | No | Auto memory: Claude's notes to itself across sessions |
| `keybindings.json` | Global only | No | Custom keyboard shortcuts |
| `themes/*.json` | Global only | No | Custom color themes |

Key example fields per file:

- `CLAUDE.md` — free markdown, e.g. `## Commands`, `## Stack`, `## Rules` sections.
- `.mcp.json` — `{"mcpServers": {"<name>": {"command": "...", "args": [...], "env": {"TOKEN": "${TOKEN}"}}}}`.
- `.worktreeinclude` — `.gitignore`-syntax lines, e.g. `.env`, `config/secrets.json`.
- `.claude/settings.json` — `{"permissions": {"allow": [...], "deny": [...]}, "hooks": {"PostToolUse": [...]}}`.
- `rules/*.md` frontmatter — `paths: ["**/*.test.ts"]` to path-gate loading; rules without `paths:` load like CLAUDE.md at session start.
- `skills/<name>/SKILL.md` frontmatter — `description`, `disable-model-invocation: true` (user-only skills), `argument-hint`; body can use `` !`shell command` `` injection and `$ARGUMENTS`/`$0`/`$1` positional args.
- `agents/*.md` frontmatter — `name`, `description`, `tools: Read, Grep, Glob` to restrict tool access; body becomes the subagent's system prompt.
- `agent-memory/<name>/MEMORY.md` — Claude writes/maintains this itself once a subagent's frontmatter sets `memory: project` (or `memory: local` for `.claude/agent-memory-local/`, `memory: user` for `~/.claude/agent-memory/`).
- `~/.claude.json` — `{"autoConnectIde": true, "externalEditorContext": true, "mcpServers": {...}}`.
- `~/.claude/keybindings.json` — see `keybindings.md`.
- `~/.claude/themes/*.json` — see `terminal-config.md`.
- `~/.claude/projects/<project>/memory/MEMORY.md` — Claude-maintained index (first 200 lines / 25KB loaded at session start); links to topic files (e.g. `debugging.md`) read on demand.
- `~/.claude/output-styles/*.md` frontmatter — `description`, `keep-coding-instructions: true` to keep default task instructions alongside custom additions.

## Application data

Beyond authored config, `~/.claude` holds data Claude Code writes during sessions — plaintext, not encrypted at rest.

### Cleaned up automatically (age > `cleanupPeriodDays`, default 30, swept at startup)

| Path under `~/.claude/` | Contents |
| --- | --- |
| `projects/<project>/<session>.jsonl` | Full conversation transcript |
| `projects/<project>/<session>/subagents/` | Subagent transcripts |
| `projects/<project>/<session>/tool-results/` | Large tool outputs spilled to files |
| `file-history/<session>/` | Pre-edit snapshots for checkpoint restore (100 most recent checkpoints) |
| `plans/` | Plan-mode plan files |
| `debug/` | Per-session debug logs (`--debug`/`/debug` only) |
| `paste-cache/`, `image-cache/` | Large pastes and attached images |
| `session-env/` | Per-session environment metadata |
| `tasks/` | Per-session task lists |
| `shell-snapshots/` | Aliases/functions/shell options applied to each Bash command; removed on clean exit |
| `backups/` | Timestamped `~/.claude.json` backups before config migrations |
| `feedback-bundles/` | Redacted transcript archives from `/feedback` |
| `todos/`, `statsig/`, `logs/` | Legacy, no longer written |

`sessions/` (one file per running session, for crash/concurrency detection) is not part of the age-based sweep — removed on session exit instead.

### Kept until you delete them

| Path under `~/.claude/` | Contents |
| --- | --- |
| `history.jsonl` | Every prompt typed, with timestamp/project path (up-arrow recall) |
| `stats-cache.json` | Aggregated token/cost counts for `/usage` |
| `remote-settings.json` | Cached server-managed settings |
| `cache/changelog.md` | Cached changelog for post-update release notes |
| `policy-limits.json` | Cached feature policy settings |

### Clear local data

`claude project purge [path]` deletes transcripts/memory under `projects/`, per-session `tasks/`/`debug/`/`file-history/`, matching `history.jsonl` lines, and the project's `~/.claude.json` entry. `--dry-run` previews the plan; `--yes` skips confirmation; `--all` purges every project (deletes `history.jsonl` outright); `-i` steps through items one at a time. Never touches `shell-snapshots/` or `backups/` (not project-scoped). Do not manually delete `~/.claude.json`, `~/.claude/settings.json`, or `~/.claude/plugins/` — those hold auth, preferences, and installed plugins.

## Notes

This page's content is authored as an interactive JS explorer component; the textual descriptions, examples, and reference tables above were extracted from its embedded data and the surrounding prose. No truncation observed.

## Related

- [settings.md](./settings.md): the full `settings.json` key reference and scope precedence
- [debug-your-config.md](./debug-your-config.md): inspection commands (`/context`, `/doctor`, `/hooks`, `/mcp`, `/status`)
- [keybindings.md](./keybindings.md) and [terminal-config.md](./terminal-config.md): `keybindings.json` and `themes/*.json` detail

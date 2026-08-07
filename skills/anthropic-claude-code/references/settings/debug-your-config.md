<!-- source: https://code.claude.com/docs/en/debug-your-config.md / last verified: 2026-08-07 -->

# Debug your configuration

Diagnose why CLAUDE.md, settings, hooks, MCP servers, or skills aren't taking effect. For installation/auth/connectivity problems, see the troubleshoot-install docs instead.

## See what loaded into context

`/context` shows everything in the context window by category: system prompt, system tools, MCP tools, custom subagents (with source), memory files, skills, conversation messages. Run it first to confirm CLAUDE.md/rules/skill descriptions loaded.

| Command | Shows |
| --- | --- |
| `/memory` | Memory file locations (user/project scopes) with edit links, auto memory folder/toggle |
| `/skills` | Available skills from project, user, and plugin sources |
| `/hooks` | Active hook configurations |
| `/mcp` | Connected MCP servers and status |
| `/permissions` | Resolved allow/deny rules in effect |
| `/doctor` | Setup checkup: install health, invalid settings files, unused extensions, duplicate subagent names, checked-in CLAUDE.md content Claude can derive, with proposed fixes |
| `/debug [issue]` | Enables debug logging and prompts Claude to diagnose using logs/settings paths |
| `/status` | Active settings sources, including whether managed settings are in effect |

Subdirectory `CLAUDE.md` files load on demand (when Claude reads a file in that directory), not at session start.

## Check resolved settings

Precedence: **Managed** first (apart from a few exceptions) > closer scope wins among **Local** > **Project** > **User**; CLI flags and env vars are another override layer.

`/doctor` reports invalid settings files, duplicate installs, unused extensions, and trimmable checked-in CLAUDE.md content, then proposes fixes applied only after confirmation. `claude doctor` (terminal) prints the same diagnostics read-only without starting a session. `/status` shows which settings sources are active.

## Check MCP servers

`/mcp` lists every configured server, connection status, and project approval state.

- Project-scoped `.mcp.json` servers require one-time approval; if dismissed, they stay disabled until approved from `/mcp`.
- A failed-to-start server usually has a relative path in `command`/`args` (resolves against the launch directory, not `.mcp.json`'s location).
- Connected-but-zero-tools: select **Reconnect** from `/mcp`; if still zero, run `claude --debug=mcp` and check `~/.claude/debug/<session-id>.txt`.

## Check hooks

`/hooks` lists every registered hook by event. Common failure causes:

- `matcher` must be a single string using `|` (or `,`, v2.1.191+) to match multiple tools, e.g. `"Edit|Write"` — an array value is a schema error that rejects the whole settings file.
- Misspelled tool name → matches nothing, silently.
- Edits take effect after a brief file-stability delay; re-run `/hooks` if it still shows the old definition.

If `/hooks` shows the hook but it still doesn't fire, run `claude --debug` and trigger the tool call to see matcher evaluation and exit code/output live.

## Test against a clean configuration

`claude --safe-mode` disables all customizations (CLAUDE.md, skills, plugins, hooks, MCP servers, custom commands/agents) while keeping auth, model selection, built-in tools, and permissions. Managed hooks/policy still apply.

For a fully clean slate, point `CLAUDE_CONFIG_DIR` at an empty directory and launch from a directory with no `.claude`/`.mcp.json`/`CLAUDE.md`:

```bash
cd /tmp && CLAUDE_CONFIG_DIR=/tmp/claude-clean claude
```

Managed settings still apply (system path outside `~/.claude`). Linux/Windows prompt for login again (credentials live under the config dir); macOS Keychain credentials carry over.

## Check common causes

| Symptom | Cause | Fix |
| --- | --- | --- |
| Hook never fires | `matcher` is a JSON array | Use a string with `\|`, e.g. `"Edit\|Write"` |
| Hook never fires | `matcher` uses `,` before v2.1.191 | Use `\|`, or upgrade |
| Hook never fires | `matcher` is lowercase (e.g. `"bash"`) | Matching is case-sensitive: `Bash`, `Edit`, `Write`, `Read` |
| Hook never fires | Hooks defined in a standalone file | There is no standalone hooks file for project/user config — use the `"hooks"` key in `settings.json` (only plugins load `hooks/hooks.json`) |
| Global permissions/hooks/env ignored | Added to `~/.claude.json` | That file holds app state/UI toggles; `permissions`/`hooks`/`env` belong in `~/.claude/settings.json` |
| `settings.json` value seems ignored | Same key set in `settings.local.json` | `settings.local.json` overrides `settings.json`, both override `~/.claude/settings.json` |
| Skill doesn't appear in `/skills` | File at `.claude/skills/name.md` instead of a folder | Use `.claude/skills/name/SKILL.md` |
| Skill in `/skills` but never auto-invoked | `disable-model-invocation: true`, or description doesn't match phrasing | Check the "user-only" badge in `/skills` |
| Subdirectory CLAUDE.md ignored | Loads on demand, not at session start | Loads only when Claude Reads a file in that directory |
| Subagent ignores CLAUDE.md | Built-in Explore/Plan agents skip CLAUDE.md | Restate the instruction in the delegating prompt; custom subagents load CLAUDE.md normally |
| Cleanup logic never runs at session end | No `SessionEnd` hook configured | Add one in `settings.json` |
| `.mcp.json` servers never load | File under `.claude/` or Desktop-app-format | Project MCP config goes at the repo root as `.mcp.json` |
| `mcpServers` under `settings.json` never appears | `settings.json` doesn't read an `mcpServers` key | Use `.mcp.json` (project) or `claude mcp add --scope user` |
| Project MCP server added but doesn't appear | One-time approval prompt dismissed | Approve from `/mcp` |
| MCP server fails to start from some directories | Relative path in `command`/`args` | Use absolute paths (executables on `PATH` like `npx`/`uvx` are fine) |
| MCP server starts without expected env vars | Server's `.mcp.json` entry doesn't set them | Set per-server `env` inside the `.mcp.json` entry |
| `Bash(rm *)` deny rule doesn't block `/bin/rm`/`find -delete` | Prefix rules match the literal command string | Add explicit patterns for each variant, or use a `PreToolUse` hook / sandbox |

## Related

- [claude-directory.md](./claude-directory.md): every config file location and what reads it
- [settings.md](./settings.md): precedence order and the full key list

## Notes

This page was retrieved in full (no truncation observed).

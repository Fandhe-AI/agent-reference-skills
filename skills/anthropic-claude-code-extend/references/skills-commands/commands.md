<!-- source: https://code.claude.com/docs/en/commands / last verified: 2026-10-17 -->

# Commands

Commands control Claude Code from inside a session: switch models, manage permissions, clear context, run a workflow. Type `/` to see available commands, or `/` followed by letters to filter. A command is only recognized at the start of a message; text after it becomes arguments. As of v2.1.199, chaining multiple skill invocations (`/skill-a /skill-b do XYZ`) loads every named skill and passes the trailing text to each, up to six skills.

## Signature / Usage

```text
/code-review high 1234
/model opus
/effort xhigh
```

## Options / Props

Selected commands (not exhaustive — see the official page for the full alphabetical table):

| Name | Description |
| --- | --- |
| `/advisor [model\|off]` | Enable/disable the advisor tool; accepts `fable`, `opus`, `sonnet`, a full model ID (`fable` requires Fable access). No argument opens a picker; without an interactive terminal (`-p`, Remote Control) pass the model or `off`, and no argument prints the current advisor (v2.1.260+) |
| `/agents` | Reminder to ask Claude to create/manage subagents (v2.1.198+); interactive UI on older versions |
| `/autocompact [auto\|<tokens>]` | Set the auto-compact window (e.g. `500k`, or `auto`); saved to user settings. No argument opens a dialog. v2.1.221+ |
| `/batch <instruction>` | **Skill.** Decomposes a large change into 5–30 units, one background subagent per git worktree, each opening a PR |
| `/clear [name]` | Start a new conversation with empty context; keeps project memory |
| `/code-review [low\|medium\|high\|xhigh\|max\|ultra] [--fix] [--comment] [--max-findings n\|all\|default] [pr#\|branch\|path]` | **Skill.** Reviews the current diff/PR/branch/path for correctness bugs; `--comment` posts findings on the GitHub PR or GitLab merge request (GitLab requires v2.1.257+); `ultra` runs a cloud multi-agent review (see `ultrareview.md`), and with `ultra` on a `github.com` PR `--post` preselects posting the findings to the PR (v2.1.227+). Alias `/review` (before v2.1.223 `/review` was a separate single-pass command) |
| `/compact [instructions]` | Summarize the conversation so far to free context |
| `/config [key=value ...]` | Open Settings UI, or set a key directly, e.g. `/config model=sonnet` |
| `/context [all]` | Visualize context window usage as a colored grid |
| `/debug [description]` | **Skill.** Enable debug logging and troubleshoot via the session debug log |
| `/doctor` | **Skill.** Setup checkup: installation health, unused skills/MCP/plugins, slow hooks, `CLAUDE.md` trimming |
| `/effort [level\|auto\|status\|ultracode [on\|off]]` | Set model effort: `low` to `xhigh`, `max` (session-only), or `auto`; `status` prints it; `ultracode [on\|off]` toggles ultracode (the `on`/`off` arguments need v2.1.284+; before that `/effort ultracode` set the session to `xhigh`). Works in `-p` |
| `/fork [prompt]` | Copy the conversation into a new background session |
| `/goal [condition\|clear]` | Set a completion condition; Claude keeps working across turns until met |
| `/hooks` | Read-only browser for configured hook events |
| `/import [codex\|gemini\|cursor] [--dry-run] [--yes]` | Bring configuration (instruction files, MCP servers, commands, subagents, skills) from OpenAI Codex, Google Gemini CLI or Cursor into Claude Code. v2.1.213+ (Cursor v2.1.265+); unavailable on third-party providers, via a Claude apps gateway, or with feature-flag fetching off |
| `/list-agents` | List the subagents, agent-team teammates and other Claude Code sessions Claude can message, with the name to use for each; alias `/peers`; v2.1.224+; only where cross-session messaging is enabled |
| `/loop [interval] [prompt]` | **Skill.** Run a prompt repeatedly while the session stays open; self-paces if interval omitted |
| `/mcp [reconnect (<server>\|all)\|enable\|disable [<server>\|all]]` | Manage MCP server connections and OAuth; `reconnect all` retries every failed / needs-auth server (interactive terminal needs v2.1.284+) |
| `/model [model]` | Switch AI model and save as default |
| `/output-style [style]` | List output styles or switch to one, e.g. `/output-style concise`; v2.1.269+ |
| `/permissions` | Interactive permission-rule editor; `--export`/`--import` for JSON |
| `/plugin` | Manage extensions and plugins |
| `/plugin-authoring` | Load the reference Claude works from to write a mod (a skill from a built-in plugin); v2.1.287+ |
| `/reload-skills` | Re-scan skill and command directories so skills added or changed on disk become available without restarting |
| `/rewind [N\|name]` | Roll back code and conversation to an earlier checkpoint |
| `/security-review` | Analyze the changes on the current branch (diff against origin's default branch) for security vulnerabilities; needs an `origin` remote |
| `/simplify [target]` | **Skill.** Review changed code for cleanup opportunities and apply the fixes (four parallel review agents); does not look for correctness bugs (use `/code-review`); pass a path or PR reference to target |
| `/skill-doctor` | Show what each skill costs in context and how often it's used; v2.1.252+, needs feature-flag fetching |
| `/skills` | List available skills; type to filter, `t` sorts by token count, `Space` / `Enter` cycle a skill's visibility to Claude and the `/` menu, `Esc` saves and closes |
| `/subtask <instruction>` | Hand a side task to a forked subagent whose result returns into this conversation (v2.1.212+) |
| `/tui [default\|fullscreen]` | Set the terminal UI renderer and relaunch with the conversation intact; no argument prints the active renderer |
| `/usage` | Token/API usage for the session; alias `/cost` |
| `/usage-credits` | Configure usage credits (opens billing settings; Team/Enterprise members without billing access send a request to their admin); previously `/extra-usage` |
| `/verify` | **Skill.** Build and run the app to confirm a change works; manual-only since v2.1.215 |
| `/workflow-authoring` | **Skill.** Load the reference for writing dynamic workflow scripts; available when workflows are enabled; v2.1.248+ |
| `/workflows` | Open the workflow progress view to watch, pause, resume or save running and completed workflows |

Two annotations appear in the full table:

- **Skill**: a bundled skill — a prompt handed to Claude, invocable the same way as a user-authored skill, and it can be overridden by a same-named skill in `.claude/skills/`.
- **Workflow**: a bundled dynamic workflow that fans work out across many subagents in the background.

## Notes

- Not every command appears for every user; availability depends on platform, plan, and environment.
- Most bundled skills are available in every session; a few depend on a feature (e.g. `/workflow-authoring` requires dynamic workflows). The `disableBundledSkills` setting turns bundled skills off; see `skills.md`.
- Observation as of 2026-10-16: `/web-search` and `/worktree` no longer appear in the commands table of the current official page (previously documented as `/web-search <query>` **Skill** and `/worktree [create|list|remove]`). They may have been removed or renamed; this skill does not confirm either. Worktrees are covered by the `EnterWorktree` / `ExitWorktree` tools and the worktrees docs.
- To add custom commands, write a skill (see `skills.md`).
- This is a Claude Code CLI feature. For the Agent SDK equivalent, see anthropic-agent-sdk. For the Claude API (Messages API) Agent Skills / tool use, see anthropic-api-tools-mcp.

## Related

- [skills.md](./skills.md) — how bundled and custom skills are authored
- [output-styles.md](./output-styles.md) — `/config` output style selection

<!-- source: https://code.claude.com/docs/en/commands / last verified: 2026-08-07 -->

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
| `/advisor [model\|off]` | Enable/disable the advisor tool; accepts `opus`, `sonnet`, a full model ID |
| `/agents` | Reminder to ask Claude to create/manage subagents (v2.1.198+); interactive UI on older versions |
| `/batch <instruction>` | **Skill.** Decomposes a large change into 5–30 units, one background subagent per git worktree, each opening a PR |
| `/clear [name]` | Start a new conversation with empty context; keeps project memory |
| `/code-review [level] [--fix] [--comment] [pr#\|branch\|path]` | **Skill.** Reviews the current diff/PR/branch/path; `ultra` runs a cloud multi-agent review (see `ultrareview.md`). Runs as a background subagent |
| `/compact [instructions]` | Summarize the conversation so far to free context |
| `/config [key=value ...]` | Open Settings UI, or set a key directly, e.g. `/config model=sonnet` |
| `/context [all]` | Visualize context window usage as a colored grid |
| `/debug [description]` | **Skill.** Enable debug logging and troubleshoot via the session debug log |
| `/doctor` | **Skill.** Setup checkup: installation health, unused skills/MCP/plugins, slow hooks, `CLAUDE.md` trimming |
| `/effort [level\|auto]` | Set model effort: `low`, `medium`, `high`, `xhigh`, `max`, or `ultracode` |
| `/fork [prompt]` | Copy the conversation into a new background session |
| `/goal [condition\|clear]` | Set a completion condition; Claude keeps working across turns until met |
| `/hooks` | Read-only browser for configured hook events |
| `/loop [interval] [prompt]` | **Skill.** Run a prompt repeatedly while the session stays open; self-paces if interval omitted |
| `/mcp [reconnect\|enable\|disable]` | Manage MCP server connections and OAuth |
| `/model [model]` | Switch AI model and save as default |
| `/permissions` | Interactive permission-rule editor; `--export`/`--import` for JSON |
| `/plugin` | Manage extensions and plugins |
| `/rewind [N\|name]` | Roll back code and conversation to an earlier checkpoint |
| `/security-review [--fix] [branch\|path]` | **Skill.** Review diff/branch/path for security vulnerabilities |
| `/simplify [low\|medium\|high]` | **Skill.** Refactor without changing functionality |
| `/skills` | Interactive skill browser: view/enable/disable/uninstall; `--list` for text summary |
| `/subtask <instruction>` | Hand a side task to a subagent whose result returns into this conversation |
| `/usage` | Token/API usage for the session; alias `/cost` |
| `/verify` | **Skill.** Build and run the app to confirm a change works; manual-only since v2.1.215 |
| `/web-search <query>` | **Skill.** Search the web and summarize with cited sources |
| `/worktree [create\|list\|remove]` | Manage isolated git worktrees |

Two annotations appear in the full table:

- **Skill**: a bundled skill — a prompt handed to Claude, invocable the same way as a user-authored skill, and it can be overridden by a same-named skill in `.claude/skills/`.
- **Workflow**: a bundled dynamic workflow that fans work out across many subagents in the background.

## Notes

- Not every command appears for every user; availability depends on platform, plan, and environment.
- Bundled skills are available in every session; `disableBundledSkills` turns off all except `/doctor`.
- To add custom commands, write a skill (see `skills.md`).
- This is a Claude Code CLI feature. For the Agent SDK equivalent, see anthropic-agent-sdk. For the Claude API (Messages API) Agent Skills / tool use, see anthropic-api-tools-mcp.

## Related

- [skills.md](./skills.md) — how bundled and custom skills are authored
- [output-styles.md](./output-styles.md) — `/config` output style selection

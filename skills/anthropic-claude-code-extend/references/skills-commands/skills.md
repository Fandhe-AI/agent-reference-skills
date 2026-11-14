<!-- source: https://code.claude.com/docs/en/skills / last verified: 2026-11-14 -->

# Skills

Create a `SKILL.md` file with instructions and Claude Code adds it to its toolkit. Claude loads a skill automatically when relevant, or you invoke it directly with `/skill-name`. Claude Code skills follow the [Agent Skills](https://agentskills.io) open standard, extended with invocation control, subagent execution, and dynamic context injection.

Create a skill when you keep pasting the same instructions into chat, or when a CLAUDE.md section has grown into a procedure rather than a fact. Unlike CLAUDE.md, a skill's body loads only when used, so long reference material costs almost nothing until needed.

Custom commands (`.claude/commands/deploy.md`) and skills (`.claude/skills/deploy/SKILL.md`) both create `/deploy` and work the same way; existing `.claude/commands/` files keep working, but a skill of the same name takes precedence.

## Signature / Usage

```yaml
---
name: my-skill
description: What this skill does
disable-model-invocation: true
allowed-tools: Read Grep
---

Your skill instructions here...
```

Minimal example (`~/.claude/skills/summarize-changes/SKILL.md`):

```yaml
---
description: Summarizes uncommitted changes and flags anything risky. Use when the user asks what changed, wants a commit message, or asks to review their diff.
---

## Current changes

!`git diff HEAD`

## Instructions

Summarize the changes above in two or three bullet points, then list any risks.
```

## Options / Props

Frontmatter fields (all optional; only `description` recommended):

| Name | Type | Description |
| --- | --- | --- |
| `name` | string | Display name in skill listings. Defaults to directory name |
| `description` | string | What the skill does and when to use it. Combined with `when_to_use`, truncated at 1,536 characters |
| `when_to_use` | string | Additional trigger context appended to `description` |
| `argument-hint` | string | Autocomplete hint, e.g. `[issue-number]` |
| `arguments` | string or list | Named positional arguments for `$name` substitution |
| `disable-model-invocation` | boolean | `true` prevents Claude from auto-invoking; manual `/name` only. Also blocks preloading into subagents and running when a session-scoped scheduled task fires with the skill as its prompt. Default `false` |
| `user-invocable` | boolean | `false` hides from `/` menu; Claude can still invoke. Default `true` |
| `allowed-tools` | string or list | Tools Claude can use without asking during the turn that invokes the skill; the grant clears on your next message. Space- or comma-separated string, or YAML list. Doesn't restrict which tools are available |
| `disallowed-tools` | string or list | Tools removed from the pool while the skill is active; clears on your next message. Like deny rules, can't remove `EndConversation` while any other tool remains |
| `model` | string | Model override while active (same values as `/model`, or `inherit`). Applies for the rest of the current turn only and isn't saved; the session model resumes on your next prompt. A value excluded by `availableModels` isn't used. With `context: fork` it sets the forked subagent's model instead |
| `effort` | string | Effort override: `low`, `medium`, `high`, `xhigh`, `max` |
| `context` | string | `fork` runs the skill in a forked subagent |
| `agent` | string | Subagent type when `context: fork` (`Explore`, `Plan`, `general-purpose`, or custom) |
| `background` | boolean | With `context: fork`, `false` waits for the result inline instead of backgrounding. Default `true`. Requires v2.1.218+ (before that, forked skills always blocked the turn) |
| `hooks` | object | Hooks registered when the skill is invoked and kept for the rest of the session (see the hooks reference for `once` and the limits on skill hooks) |
| `paths` | string or list | Glob patterns limiting auto-activation to matching files |
| `shell` | string | `bash` (default) or `powershell` for `` !`command` `` blocks |
| `metadata` | map | Free-form key-value data for external tooling; not acted on by Claude Code |
| `license` | string | Agent Skills spec field; accepted but unused by Claude Code |
| `compatibility` | string | Agent Skills spec field, up to 500 chars; accepted but unused |

Outside Claude Code (claude.ai uploads, Skills API, `package_skill.py`), only `name`, `description`, `license`, `compatibility`, `metadata`, `allowed-tools` are valid — any other field is a hard packaging error.

String substitutions available in skill content: `$ARGUMENTS`, `$ARGUMENTS[N]` / `$N`, `$name` (from `arguments`), `${CLAUDE_SESSION_ID}`, `${CLAUDE_EFFORT}`, `${CLAUDE_SKILL_DIR}`, `${CLAUDE_PROJECT_DIR}`.

## Notes

- Where a skill lives determines scope: enterprise (managed settings) > personal (`~/.claude/skills/`) > project (`.claude/skills/`) > plugin (`<plugin>/skills/`, namespaced as `/plugin-name:skill-name` so it doesn't clash).
- Command name by location:

  | Skill location | Command name source |
  | --- | --- |
  | Skill directory under `~/.claude/skills/` or `.claude/skills/` | Frontmatter `name` or the directory name (`.claude/skills/deploy-staging/SKILL.md` → `/deploy-staging`) |
  | Nested `.claude/skills/` directory, when the directory name clashes with another skill | Subdirectory path relative to the working directory, then the skill directory name (`apps/web/.claude/skills/deploy/SKILL.md` → `/apps/web:deploy`) |
  | File under `.claude/commands/` | File name without extension (`.claude/commands/deploy.md` → `/deploy`) |
  | File in a subdirectory of `.claude/commands/` | Subdirectory path with each `/` replaced by `:` (`frontend/component.md` → `/frontend:component`) |
  | Plugin `skills/` subdirectory | Frontmatter `name` or the directory name, namespaced by plugin (`/my-plugin:review`) |
  | Plugin root `SKILL.md` | Frontmatter `name`, with the plugin directory name as a fallback (`/my-plugin:review`) |
  | Skill synced from claude.ai | The account skill name prefixed with `anthropic-skills:` (`/anthropic-skills:deploy`, or `/deploy` while no other command uses that name) |

- Same-name resolution: enterprise over personal over project. A skill replaces a bundled skill or (in a local terminal session) a built-in command of the same name, but not its aliases (a project `code-review` skill replaces `/code-review`, and the bundled alias `/review` never runs it; a project `usage` skill replaces `/usage` while `/cost` still runs the built-in). A skill wins over a same-named `.claude/commands/` file. Project-root and nested skills both load. A synced skill that loses its short name to another command is listed and runs only under its full name (before v2.1.269 a synced skill had only its short name).
- Skills synced from claude.ai: in terminal sessions signed in with a claude.ai account (v2.1.273+), account skills download into `~/.claude/skills/synced/` in the background and update in the running session; Cowork and cloud sessions load the account's skills directly. Downloads are never uploaded (local edits can be overwritten); stop with `syncClaudeAiSkills: false`. The names `synced` (as a skill folder) and `anthropic-skills` (outside a plugin) are reserved.
- `/skill-doctor` (v2.1.252+, needs feature-flag fetching) shows each skill's context cost and usage to find skills to turn off; `/reload-skills` re-scans skill and command directories after you add or change them on disk during the session.
- The skill listing budget is 1% of the model's context window (descriptions drop starting with the least-invoked skills); raise it with the `skillListingBudgetFraction` setting (e.g. `0.02`) or the `SLASH_COMMAND_TOOL_CHAR_BUDGET` environment variable (fixed character count); `skillListingMaxDescChars` configures the per-entry 1,536-character cap.
- When Claude re-invokes a skill whose rendered content is identical to the copy already in context, Claude Code adds a short note that it's already loaded rather than a second copy; changed arguments or dynamic-context output append the full content again.
- Personal skills disappeared: look in `~/.claude/skills/.trash/` (default 30-day retention). Before v2.1.280 a `manifest.json` in `~/.claude/skills/` caused the skill folders it listed to be moved there; move the folder back to restore.
- Nested `.claude/skills/` directories (e.g. `apps/web/.claude/skills/`) load lazily the first time Claude touches a file in that subdirectory, and a name clash surfaces as `/apps/web:deploy` alongside the unqualified `/deploy`.
- `context: fork` runs the skill as a background subagent by default (`background: false` to block); a forked skill's edits sit outside session checkpoints, so `/rewind` won't undo them.
- Rendered skill content stays in context for the rest of the session (not re-read per turn); auto-compaction re-attaches the most recent invocation of each skill up to a 25,000-token combined budget, 5,000 tokens each.
- Most bundled skills are available in every session; a few depend on a feature (e.g. `/workflow-authoring` requires dynamic workflows). To turn bundled skills off, set the `disableBundledSkills` setting to `true`. The `/doctor` setup checkup stays typable when it is on; hide it with the `DISABLE_DOCTOR_COMMAND` environment variable or a `skillOverrides` entry of `"doctor": "off"`.
- `skillOverrides` in settings (`"on"`, `"name-only"`, `"user-invocable-only"`, `"off"`) controls visibility without editing the skill's own frontmatter — useful for skills checked into a shared repo.
- Cowork and cloud sessions (including routines) do not read `~/.claude/skills/`; only project skills committed to the repo, or skills enabled for your claude.ai account, are available there.
- Boolean frontmatter fields also accept `yes`/`no`/`on`/`off`/`1`/`0`. Frontmatter is read only when the opening `---` is the file's first line; unparsable YAML still loads the skill with no fields set. `${CLAUDE_PLUGIN_ROOT}` and `${CLAUDE_PLUGIN_DATA}` are substituted only in plugin skills; `${CLAUDE_SKILL_DIR}` / `${CLAUDE_PROJECT_DIR}` are also substituted in `allowed-tools` Bash rules.
- Argument substitution: indexed placeholders use shell-style quoting; an indexed placeholder with no argument stays literal while a named one expands to an empty string; arguments containing `$1` / `$ARGUMENTS` are inserted literally; escape with `\$1`. If no placeholder receives an argument, `ARGUMENTS: <value>` is appended. At the terminal prompt several skills can be stacked (`/write-tests /fix-issue 123`); via the Agent SDK or `claude -p` only the first loads.
- Writing a skill name after plain text (`go ahead and /deploy to staging`) runs nothing directly; it only counts as permission for that message.
- `allowed-tools` is applied even in a `-p` run in an untrusted folder, so review repository skills. With `strictPluginOnlyCustomization` listing `hooks`, a personal or project skill that declares `hooks` loses its `allowed-tools` pre-approval; with `allowManagedPermissionRulesOnly` (v2.1.282+) `allowed-tools` in project and personal skills is ignored (`/status` lists them).
- Injected `` !`command` `` blocks: a failed command (non-zero exit; exit 1 from search/comparison commands is a normal result) aborts the whole invocation; they never prompt, and outside auto mode a command that isn't allowed aborts unless pre-approved by `allowed-tools` (deny/ask rules still abort). `shell: bash` without Git Bash on Windows fails the invocation.
- Added directories (`--add-dir`): a skill whose folder name clashes gets a prefix (`/cli:verify`, v2.1.309+). A `.claude/skills/` below the start directory loads the first time Claude touches a file there; `/add-dir <subdir>` loads it sooner (v2.1.257+); `/cd` adds the new directory's skills (v2.1.246+). In a linked git worktree without its own `.claude/skills`, the main checkout's project skills load (v2.1.277+). `permissions.additionalDirectories` grants file access only and loads no skills.
- `context: fork`: the skill waits for the result instead of backgrounding in `-p` / Agent SDK, with `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1`, when the same skill is still running, and when a session-scoped scheduled task fires with the skill as its prompt. A backgrounded fork gets the narrower background-subagent tool set; use `background: false` for the full set. It isn't a fork of the current conversation.
- `Skill` permission rules: `Skill(name)` exact, `Skill(name *)` prefix; denying an alias (`Skill(review)`) also blocks `/code-review`, and denying `Skill(deploy)` also blocks a nested `apps/web:deploy` (v2.1.260+). Allow rules for synced skills must name `anthropic-skills:<name>` (or `Skill(anthropic-skills *)`). `user-invocable: false` doesn't stop Claude from invoking; use `disable-model-invocation: true` to hide a skill from Claude.
- `skillOverrides` states: `"on"` (name + description, in `/` menu), `"name-only"`, `"user-invocable-only"` (hidden from Claude, in menu; `user-only` in `/skills`), `"off"` (hidden everywhere, including Remote Control and Agent SDK command lists). Plugin skills are not affected.
- 2.1.325: scheduled tasks and `/loop` ask before running a skill that declares `allowed-tools` or hooks; add `Skill(name)` to `permissions.allow` to run it unattended.
- 2.1.325: nested skill loading changed: `.claude/skills` folders in `--plugin-dir` plugins no longer load from a session started above them; start Claude Code in the plugin folder instead. 2.1.321: `.claude/skills` folders inside `~/.claude/plugins` no longer load when Claude works on files there. 2.1.319: with the Bash sandbox on, skills in `.claude/skills` folders below the starting folder load only if you start Claude Code there or `/cd` there.
- 2.1.323: after safeguards stop a forked skill or a workflow agent, Claude is told to retry with a narrower prompt or tell you, instead of doing the work itself.
- 2.1.304: skill hooks are limited per source (a repo, your own folder or a plugin) to at most 1,024 hooks and 16,384 matcher characters per session. Under a policy that allows hooks from plugins only, a skill used in the main conversation whose hooks are kept out no longer gets its `allowed-tools`. Compaction now sends Claude the skill list again afterwards; `/reload-skills` sends only new or changed skills.
- Source: https://code.claude.com/docs/en/skills.md (retrieved 2026-11-14)
- Source: https://code.claude.com/docs/en/changelog.md (2.1.304–2.1.325, retrieved 2026-11-14)
- This is a Claude Code CLI feature. For the Agent SDK equivalent, see anthropic-agent-sdk. For the Claude API (Messages API) Agent Skills / tool use — and the Skills API — see anthropic-api-tools-mcp.

## Related

- [commands.md](./commands.md)
- [hooks.md](../hooks/hooks.md)

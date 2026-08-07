<!-- source: https://code.claude.com/docs/en/skills / last verified: 2026-08-07 -->

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
| `disable-model-invocation` | boolean | `true` prevents Claude from auto-invoking; manual `/name` only. Default `false` |
| `user-invocable` | boolean | `false` hides from `/` menu; Claude can still invoke. Default `true` |
| `allowed-tools` | string or list | Tools pre-approved without prompting for the invoking turn |
| `disallowed-tools` | string or list | Tools removed from the pool while the skill is active |
| `model` | string | Model override while active (`opus`, `sonnet`, or `inherit`) |
| `effort` | string | Effort override: `low`, `medium`, `high`, `xhigh`, `max` |
| `context` | string | `fork` runs the skill in a forked subagent |
| `agent` | string | Subagent type when `context: fork` (`Explore`, `Plan`, `general-purpose`, or custom) |
| `background` | boolean | With `context: fork`, `false` waits for the result inline instead of backgrounding. Default `true` |
| `hooks` | object | Hooks scoped to the skill's lifecycle |
| `paths` | string or list | Glob patterns limiting auto-activation to matching files |
| `shell` | string | `bash` (default) or `powershell` for `` !`command` `` blocks |
| `metadata` | map | Free-form key-value data for external tooling; not acted on by Claude Code |
| `license` | string | Agent Skills spec field; accepted but unused by Claude Code |
| `compatibility` | string | Agent Skills spec field, up to 500 chars; accepted but unused |

Outside Claude Code (claude.ai uploads, Skills API, `package_skill.py`), only `name`, `description`, `license`, `compatibility`, `metadata`, `allowed-tools` are valid — any other field is a hard packaging error.

String substitutions available in skill content: `$ARGUMENTS`, `$ARGUMENTS[N]` / `$N`, `$name` (from `arguments`), `${CLAUDE_SESSION_ID}`, `${CLAUDE_EFFORT}`, `${CLAUDE_SKILL_DIR}`, `${CLAUDE_PROJECT_DIR}`.

## Notes

- Where a skill lives determines scope: enterprise (managed settings) > personal (`~/.claude/skills/`) > project (`.claude/skills/`) > plugin (`<plugin>/skills/`); same-name skills at a higher level override a lower one, and any level overrides a bundled skill of the same name.
- Nested `.claude/skills/` directories (e.g. `apps/web/.claude/skills/`) load lazily the first time Claude touches a file in that subdirectory, and a name clash surfaces as `/apps/web:deploy` alongside the unqualified `/deploy`.
- `context: fork` runs the skill as a background subagent by default (`background: false` to block); a forked skill's edits sit outside session checkpoints, so `/rewind` won't undo them.
- Rendered skill content stays in context for the rest of the session (not re-read per turn); auto-compaction re-attaches the most recent invocation of each skill up to a 25,000-token combined budget, 5,000 tokens each.
- `skillOverrides` in settings (`"on"`, `"name-only"`, `"user-invocable-only"`, `"off"`) controls visibility without editing the skill's own frontmatter — useful for skills checked into a shared repo.
- Cowork and cloud sessions (including routines) do not read `~/.claude/skills/`; only project skills committed to the repo, or skills enabled for your claude.ai account, are available there.
- This is a Claude Code CLI feature. For the Agent SDK equivalent, see anthropic-agent-sdk. For the Claude API (Messages API) Agent Skills / tool use — and the Skills API — see anthropic-api-tools-mcp.

## Related

- [commands.md](./commands.md)
- [hooks.md](../hooks/hooks.md)

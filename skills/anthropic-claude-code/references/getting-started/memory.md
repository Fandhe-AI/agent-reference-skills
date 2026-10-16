<!-- source: https://code.claude.com/docs/en/memory.md / last verified: 2026-10-16 -->

# How Claude remembers your project

CLAUDE.md files give Claude persistent, user-written instructions; auto memory lets Claude accumulate its own learnings across sessions.

## Signature / Usage

```markdown
See @README for project overview and @package.json for available npm commands.

# Additional Instructions
- git workflow @docs/git-instructions.md
```

```bash
/init      # generate a starting CLAUDE.md from the codebase
/memory    # browse and edit CLAUDE.md / auto memory files
/context   # verify which memory files loaded
```

## Options / Props

| Scope | Location | Purpose |
|-------|----------|---------|
| Managed policy | e.g. `/etc/claude-code/CLAUDE.md` (Linux/WSL) | Org-wide instructions, cannot be excluded |
| User instructions | `~/.claude/CLAUDE.md` | Personal preferences for all projects |
| Project instructions | `./CLAUDE.md` or `./.claude/CLAUDE.md` | Team-shared instructions via source control |
| Local instructions | `./CLAUDE.local.md` | Personal project-specific notes; gitignore this |

| | CLAUDE.md files | Auto memory |
|---|---|---|
| Who writes it | You | Claude |
| Contains | Instructions and rules | Learnings and patterns |
| Loaded into | Every session | Every session (first 200 lines or 25KB) |

## Notes

- All discovered CLAUDE.md files are concatenated (not overridden), ordered broadest-to-most-specific; subdirectory CLAUDE.md files load on demand when Claude reads files there.
- Target under 200 lines per CLAUDE.md; move task-specific content to `.claude/rules/` (optionally path-scoped via `paths:` frontmatter) or to skills.
- AGENTS.md (v2.1.277+): Claude Code can read `AGENTS.md` directly as project instructions. By default it reads `AGENTS.md` only when you have no `CLAUDE.md`, `.claude/CLAUDE.md`, or `CLAUDE.local.md` in your working directory or any directory above it (your `~/.claude/CLAUDE.md`, the managed `CLAUDE.md`, and `.claude/rules/` files don't count and keep loading alongside). At session start it loads every `AGENTS.md` and `.claude/AGENTS.md` in the working directory and above (the conversation shows `no CLAUDE.md found; AGENTS.md loaded: <path>`), and a subdirectory's `AGENTS.md` when Claude opens a file there with the Read tool and that subdirectory has no `CLAUDE.md` of its own; `@path` imports and `claudeMdExcludes` apply. In `/config`, set **Project instructions** to `claude-md-or-agents-md` (default), `claude-md-and-agents-md` (both, each directory's `CLAUDE.md` first), `claude-md` (CLAUDE.md only), or `managed-only`; or set `instructionFiles` under `pluginConfigs` → `cc-plugin-agents-md@builtin` in `~/.claude/settings.json`, a `--settings` file, or managed settings (ignored in project and local settings). The built-in plugin ID was `agents-md@builtin` before v2.1.285; v2.1.285 and later reads an entry under either ID. Before v2.1.281, some sessions (such as Amazon Bedrock or telemetry disabled) read `CLAUDE.md` files only; before v2.1.280, `/memory` and `/context` didn't list an `AGENTS.md` that Claude read directly. In sessions that can't read `AGENTS.md` (or when you also have a `CLAUDE.md`), import it with `@AGENTS.md` from a `CLAUDE.md`; a symlink `CLAUDE.md -> AGENTS.md` also works, but Edit/Write refuse to write through a symlink and on Windows the import is safer. `InstructionsLoaded` hooks don't fire for an `AGENTS.md` read through the setting, and `AGENTS.md` in `--add-dir` directories doesn't load.
- Prompt audit (v2.1.283+): `/doctor prompt-audit [path]` has Claude check your CLAUDE.md, CLAUDE.local.md, and AGENTS.md files plus rules, skills, commands, subagents, and output styles under `.claude/` and `~/.claude/` for outdated or conflicting content, and reports findings with proposed edits (nothing changes until you ask). It runs through the bundled `/claude-api` skill and is unavailable while that skill is off in `skillOverrides` or `disableBundledSkills`.
- Rules symlinks: `.claude/rules/` supports symlinks (circular ones are handled); a symlink whose target is outside your working directory is treated like an external import (its rules load only after you approve external imports, and then only those without a `paths` field); a symlink to a network path doesn't load. To exclude a rules file reached through a symlink with `claudeMdExcludes`, a pattern that matches either the file's path under `.claude/rules/` or its link target excludes it (before v2.1.239, only a pattern that matched the link target did).
- Auto memory directory: with `CLAUDE_CONFIG_DIR` plus `CLAUDE_CODE_PROJECT_DIR_NAME` set, Claude Code uses that name as the `<project>` directory under `<config dir>/projects/` instead, so projects launched with that config directory share one auto memory directory (v2.1.234+).
- Auto memory lives at `~/.claude/projects/<project>/memory/`, shared across worktrees of the same repo; `MEMORY.md` is the loaded index, topic files load on demand. Toggle with `autoMemoryEnabled` or `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`.
- Project-root CLAUDE.md and auto memory survive `/compact` (re-read from disk); path-scoped rules and nested CLAUDE.md do not reload automatically.
- To hard-enforce a rule regardless of Claude's judgment, use a `PreToolUse` hook instead of a CLAUDE.md instruction, since CLAUDE.md is advisory context, not enforced configuration. Hook syntax and configuration are covered by the Claude Code extension documentation.

## Related

- [How Claude Code works](./how-claude-code-works.md)
- [Explore the context window](./context-window.md)
- [Best practices](./best-practices.md)
- [Extend Claude Code](./features-overview.md)

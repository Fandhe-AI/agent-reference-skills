<!-- source: https://code.claude.com/docs/en/memory.md / last verified: 2026-08-07 -->

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
- Claude Code reads `CLAUDE.md`, not `AGENTS.md`; import it with `@AGENTS.md` or symlink `CLAUDE.md -> AGENTS.md`.
- Auto memory lives at `~/.claude/projects/<project>/memory/`, shared across worktrees of the same repo; `MEMORY.md` is the loaded index, topic files load on demand. Toggle with `autoMemoryEnabled` or `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`.
- Project-root CLAUDE.md and auto memory survive `/compact` (re-read from disk); path-scoped rules and nested CLAUDE.md do not reload automatically.
- To hard-enforce a rule regardless of Claude's judgment, use a `PreToolUse` hook instead of a CLAUDE.md instruction, since CLAUDE.md is advisory context, not enforced configuration. Hook syntax and configuration are covered by the Claude Code extension documentation.

## Related

- [How Claude Code works](./how-claude-code-works.md)
- [Explore the context window](./context-window.md)
- [Best practices](./best-practices.md)
- [Extend Claude Code](./features-overview.md)

<!-- source: https://code.claude.com/docs/en/memory.md / last verified: 2026-08-07 -->

# CLAUDE.md Memory Import Syntax

Give Claude persistent, user-written project instructions via CLAUDE.md, including `@path` imports of other files.

```markdown
See @README for project overview and @package.json for available npm commands for this project.

# Additional Instructions
- git workflow @docs/git-instructions.md
```

```bash
/init      # generate a starting CLAUDE.md from the codebase
/memory    # browse and edit CLAUDE.md / auto memory files
/context   # verify which memory files loaded
```

## Notes

- `@path/to/import` expands the file's content into context at launch; imported files can recursively import other files, up to a maximum depth of four hops.
- All discovered CLAUDE.md files are concatenated (not overridden), ordered broadest-to-most-specific: managed policy (e.g. `/etc/claude-code/CLAUDE.md`) → user (`~/.claude/CLAUDE.md`) → project (`./CLAUDE.md` or `./.claude/CLAUDE.md`) → local (`./CLAUDE.local.md`, gitignore this one).
- Claude Code reads `CLAUDE.md`, not `AGENTS.md`; import an existing AGENTS.md with `@AGENTS.md` or symlink `CLAUDE.md -> AGENTS.md`.
- Target under 200 lines per CLAUDE.md; move task-specific content to `.claude/rules/` or to skills instead of growing a single file.
- Project-root CLAUDE.md survives `/compact` (re-read from disk); nested CLAUDE.md files and path-scoped rules do not reload automatically, only the next time Claude reads a matching file.
- Example from the Claude Code docs (code.claude.com) `memory` page.

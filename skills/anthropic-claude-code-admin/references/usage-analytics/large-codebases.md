<!-- source: https://code.claude.com/docs/en/large-codebases.md / last verified: 2026-10-16 -->

# Set up Claude Code in a monorepo or large codebase

Configure Claude Code for monorepos and large single-tree codebases with nested CLAUDE.md files, sparse worktrees, code intelligence, and per-package skills so Claude stays focused on the code you're working in.

## Signature / Usage

```json
// packages/api/.claude/settings.json
{
  "worktree": {
    "sparsePaths": [".claude", "packages/api", "packages/shared"],
    "symlinkDirectories": ["node_modules"]
  },
  "permissions": {
    "additionalDirectories": ["../shared"],
    "deny": ["Read(./**/dist/**)", "Read(./**/build/**)"]
  }
}
```

```json
// .claude/settings.local.json
{
  "claudeMdExcludes": ["**/packages/web/**"]
}
```

## Options / Props

| I want to | Use |
| --- | --- |
| Load only conventions for touched code | Per-directory `CLAUDE.md` files |
| Exclude CLAUDE.md files for packages never touched | `claudeMdExcludes` |
| Block reads of generated/vendored code | `permissions.deny` `Read(...)` rules |
| Find symbol definitions without scanning files | A code intelligence plugin (`/plugin install typescript-lsp@claude-plugins-official`) |
| Check out only needed directories in a worktree | `worktree.sparsePaths` |
| Access a sibling package/repo from one session | `--add-dir` or `permissions.additionalDirectories` |
| Give area-specific procedures loaded on demand | Per-directory `.claude/skills/` |
| Replace per-directory CLAUDE.md at scale | A plugin in an internal marketplace |

### Choose where to start Claude

| Start from | File access | CLAUDE.md loaded at launch | Use when |
| --- | --- | --- | --- |
| Repository root | Every file | Root only; subdirectory files load on demand | Tasks span multiple packages or subsystems |
| A subdirectory | That subtree only, until you grant more | That directory's plus every ancestor's | Work is scoped to one package or subsystem |

### Per-directory CLAUDE.md vs path-scoped rules

| Approach | File location | Loads when | Use when |
| --- | --- | --- | --- |
| Per-directory `CLAUDE.md` | Inside the directory, alongside its code | At launch when started from that directory, or on demand | Directory owners maintain their own conventions; instructions are versioned with the code |
| Path-scoped rule in `.claude/rules/` | Central `.claude/` at the repo root | When Claude works with a file matching the rule's `paths:` glob | You want all conventions in one place, or the same rule applies to many scattered paths |

## Notes

- Where you launch `claude` (repo root vs subdirectory) determines file access scope and which CLAUDE.md files load at startup; project settings (`.claude/settings.json`) load only from the starting directory, not inherited from parents. Each subdirectory's `.claude/settings.json` must be self-contained rather than layered on a root file.
- Cross-package changes: give Claude the whole change (shared edit plus call sites) in one session, and plan first in plan mode; Claude writes the plan to a file and Claude Code re-injects the plan file after each compaction so the plan survives where conversation history may not.
- Recommend the right plugin at session start: once conventions live in plugins, a `SessionStart` hook can read the launch directory from the hook input, look it up in a path-to-plugin map committed to the repository, and print a recommendation to stdout that Claude Code adds to Claude's context before the first prompt. Plugin authoring and hooks are covered by the anthropic-claude-code-extend skill.
- Block-read deny rules: end directory patterns with `/**/*` (e.g. `Read(./**/dist/**/*)`) so Claude can still list or `cd` into the directory. Rules in `.claude/settings.local.json` anchor at the session's current working directory, so use `//`-absolute paths if you start from subdirectories (that file loads from the repository root since v2.1.211, except where Claude Code doesn't use the repository root, e.g. Windows). Deny rules cover built-in file tools and recognized file commands in Bash (`cat`, `head`, `grep`, `find`) plus redirection targets; a Bash `grep -r` over a directory containing denied files still includes them, and subprocesses that open files themselves aren't covered.
- `additionalDirectories` grants file access only (never loads CLAUDE.md/rules/skills); `--add-dir`/`/add-dir` loads skills always, and CLAUDE.md/rules only with `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1`.
- Managed policy CLAUDE.md files cannot be excluded via `claudeMdExcludes`.
- `worktree.sparsePaths`/`symlinkDirectories` are read from the starting directory before worktree creation; after creation, settings load from the worktree root's own `.claude/settings.json`.
- Skill discoverability degrades when many per-directory skills accumulate, since names always load but descriptions are shortened; scope skills to specific file globs via the `paths` frontmatter field or centralize shared skills at the repo root.
- Use OpenTelemetry (`OTEL_LOG_TOOL_DETAILS=1`) and the `skill_activated` event to find unused per-directory skills for consolidation.

## Related

- [costs](./costs.md)
- [admin-setup](../enterprise-setup/admin-setup.md)

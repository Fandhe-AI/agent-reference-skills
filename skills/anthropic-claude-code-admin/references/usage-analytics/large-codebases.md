<!-- source: https://code.claude.com/docs/en/large-codebases.md / last verified: 2026-08-07 -->

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

## Notes

- Where you launch `claude` (repo root vs subdirectory) determines file access scope and which CLAUDE.md files load at startup; project settings (`.claude/settings.json`) load only from the starting directory, not inherited from parents.
- `additionalDirectories` grants file access only (never loads CLAUDE.md/rules/skills); `--add-dir`/`/add-dir` loads skills always, and CLAUDE.md/rules only with `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1`.
- Managed policy CLAUDE.md files cannot be excluded via `claudeMdExcludes`.
- `worktree.sparsePaths`/`symlinkDirectories` are read from the starting directory before worktree creation; after creation, settings load from the worktree root's own `.claude/settings.json`.
- Skill discoverability degrades when many per-directory skills accumulate, since names always load but descriptions are shortened; scope skills to specific file globs via the `paths` frontmatter field or centralize shared skills at the repo root.
- Use OpenTelemetry (`OTEL_LOG_TOOL_DETAILS=1`) and the `skill_activated` event to find unused per-directory skills for consolidation.

## Related

- [costs](./costs.md)
- [admin-setup](../enterprise-setup/admin-setup.md)

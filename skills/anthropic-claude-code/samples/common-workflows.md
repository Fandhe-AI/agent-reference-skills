<!-- source: https://code.claude.com/docs/en/common-workflows.md / last verified: 2026-08-07 -->

# Common Workflows

Typical prompt recipes for exploring a codebase, fixing a bug, and reviewing recent commits with Claude Code.

```bash
cd /path/to/project
claude
```

```text
give me an overview of this codebase
```

```text
explain the main architecture patterns used here
what are the key data models?
how is authentication handled?
```

```text
find the files that handle user authentication
how do these authentication files work together?
trace the login process from front-end to database
```

```text
I'm seeing an error when I run npm test
suggest a few ways to fix the @ts-ignore in user.ts
update user.ts to add the null check you suggested
```

```bash
claude --worktree feature-auth      # isolated parallel session
claude --permission-mode plan       # plan before editing
claude --continue                   # resume most recent session in this directory
git log --oneline -20 | claude -p "summarize these recent commits"
```

## Notes

- `@file` and `@directory` reference files/directories without waiting for a full read; `@server:resource` fetches an MCP resource (for example `@github:repos/owner/repo/issues`).
- `claude --from-pr 1234` opens the session picker filtered to sessions linked to that PR after `gh pr create`.
- Delegate research with "use a subagent to investigate how our auth system handles token refresh" to keep large file reads out of the main context.
- `claude --continue` resumes the most recent session in the current directory; if there isn't one yet it prints `No conversation found to continue` and exits.
- Example from the Claude Code docs (code.claude.com) `common-workflows` page, sections "Get a quick codebase overview", "Find relevant code", "Fix bugs efficiently", "Resume previous conversations", "Run parallel sessions with worktrees", "Plan before editing", and "Pipe Claude into scripts".

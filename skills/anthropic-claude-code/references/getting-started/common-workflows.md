<!-- source: https://code.claude.com/docs/en/common-workflows.md / last verified: 2026-10-16 -->

# Common workflows

Short prompt recipes for exploring codebases, fixing bugs, refactoring, testing, PRs, documentation, images, file references, scheduling, and asking Claude about its own capabilities.

## Signature / Usage

```bash
claude --worktree feature-auth      # isolated parallel session
claude --permission-mode plan       # plan before editing
claude --continue                   # resume most recent session
git log --oneline -20 | claude -p "summarize these recent commits"
```

## Options / Props

| Scheduling option | Where it runs | Best for |
|--------------------|----------------|----------|
| Routines | Anthropic-managed infrastructure | Tasks that run even when your computer is off; can trigger on API calls/GitHub events |
| Desktop scheduled tasks | Your machine, via desktop app | Tasks needing direct access to local files/uncommitted changes |
| GitHub Actions | CI pipeline | Tasks tied to repo events or cron alongside workflow config |
| `/loop` | Current CLI session | Quick polling while a session is open |

## Notes

- `@file` and `@directory` reference files/directories without waiting for a full read; `@server:resource` fetches MCP resources. To stop `@` references from including file contents and directory listings in your message, set `CLAUDE_CODE_DISABLE_FILE_MENTIONS=1` in your shell or user settings; Claude then receives the paths you referenced with a note to read them using its file tools. The variable requires v2.1.299 or later and is ignored in project and local settings.
- `claude --from-pr 1234` opens the session picker filtered to sessions linked to that PR after `gh pr create`.
- Delegate research with "use a subagent to investigate X" to keep large file reads out of the main context.

## Related

- [Best practices](./best-practices.md)
- [How Claude Code works](./how-claude-code-works.md)
- [Extend Claude Code](./features-overview.md)

<!-- source: https://code.claude.com/docs/en/best-practices.md / last verified: 2026-08-07 -->

# Best practices

Patterns for getting the most out of Claude Code: verification, planning, prompting, environment setup, session management, and scaling with parallel/automated sessions.

## Signature / Usage

```bash
# non-interactive mode for CI, hooks, scripts
claude -p "fix all lint errors"
claude -p "List all API endpoints" --output-format json
claude --permission-mode auto -p "fix all lint errors"

# fan out across files
for file in $(cat files.txt); do
  claude -p "Migrate $file from React to Vue. Return OK or FAIL." \
    --allowedTools "Edit,Bash(git commit *)"
done
```

## Options / Props

| Strategy | Purpose |
|----------|---------|
| Give Claude a way to verify its work | Tests, build, screenshot diff, or a `/goal` condition close the loop so Claude iterates until it passes |
| Explore first, then plan, then code | Use plan mode (`Shift+Tab` to `⏸ plan mode on`) to separate research from execution for non-trivial changes |
| Provide specific context | Reference files with `@`, paste images, give URLs, pipe data (`cat error.log \| claude`) |
| Configure environment | CLAUDE.md, permissions/auto mode/sandboxing, CLI tools (`gh`, `aws`), MCP servers, hooks, skills, subagents, plugins |
| Manage session | `Esc` to stop, `Esc+Esc`/`/rewind` to restore, `/clear` between unrelated tasks, subagents for investigation |
| Automate and scale | `claude -p` non-interactive mode, worktrees/Desktop/web/agent teams for parallel sessions, fan-out loops, auto mode |

## Notes

- Context window fills fast and LLM performance degrades as it fills; this is the constraint underlying most advice on this page.
- CLAUDE.md guidance: keep under 200 lines, include only what Claude can't infer, use imports (`@path/to/import`), check into git.
- After two failed corrections on the same issue in one session, `/clear` and rewrite the prompt rather than continuing to correct.
- Common failure patterns: kitchen-sink sessions, repeated correcting without clearing, over-specified CLAUDE.md, trust-then-verify gap, unscoped "investigate" tasks.

## Related

- [How Claude Code works](./how-claude-code-works.md)
- [Common workflows](./common-workflows.md)
- [How Claude remembers your project](./memory.md)
- [Extend Claude Code](./features-overview.md)
- [Keep Claude working toward a goal](./goal.md)
- [Explore the context window](./context-window.md)

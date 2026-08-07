<!-- source: https://code.claude.com/docs/en/overview.md / last verified: 2026-08-07 -->

# Overview

Claude Code is an agentic coding tool that reads your codebase, edits files, runs commands, and integrates with your development tools. Available in the terminal, IDE, desktop app, and browser.

## Signature / Usage

```bash
# Terminal (native install)
curl -fsSL https://claude.ai/install.sh | bash
cd your-project
claude
```

## Options / Props

| Surface | Description |
|---------|-------------|
| Terminal | Full-featured CLI; install via native installer, Homebrew, WinGet, or Linux package managers |
| VS Code | Extension with inline diffs, @-mentions, plan review |
| Desktop app | Standalone app with visual diff review, parallel sessions, scheduled tasks |
| Web | claude.ai/code; no local setup, runs in cloud sandbox |
| JetBrains | Plugin for IntelliJ, PyCharm, WebStorm; requires the CLI installed separately |

## Notes

- Every surface connects to the same underlying Claude Code engine; CLAUDE.md files, settings, and MCP servers work across all of them.
- Claude Code can automate repetitive work, build features, fix bugs, create commits/PRs, connect tools via MCP, be customized with CLAUDE.md/skills/hooks, run agent teams and subagents, be scripted via the CLI, and run on a schedule.

## Related

- [Quickstart](./quickstart.md)
- [How Claude Code works](./how-claude-code-works.md)
- [How Claude remembers your project](./memory.md)
- [Common workflows](./common-workflows.md)
- [Best practices](./best-practices.md)

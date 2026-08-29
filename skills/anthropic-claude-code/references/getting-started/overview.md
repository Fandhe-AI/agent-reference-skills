<!-- source: https://code.claude.com/docs/en/overview.md / last verified: 2026-08-07 -->

# Overview

Claude Code is an agentic coding tool that reads your codebase, edits files, runs commands, and integrates with your development tools. Available in the terminal, IDE, desktop app, and browser.

## Signature / Usage

```bash
# Terminal (native install)
# Step 1 - download to an exclusive temp file and print it for review. Nothing is executed here;
# if any step fails the temp file is removed and the chain stops.
installer="$(mktemp "${TMPDIR:-/tmp}/claude-install.XXXXXX")" \
  && curl -fsSL https://claude.ai/install.sh -o "${installer}" \
  && cat "${installer}" \
  || { rm -f -- "${installer:-}"; unset installer; echo "download failed; nothing was executed" >&2; false; }
```

Read the script printed above. Run the next block only if you have reviewed it and decided to proceed — it is a separate step so that copying the block above never executes anything.

```bash
# Step 2 - only after you have read the script above and decided to proceed, run it yourself.
# The temp file is removed afterwards; the final status is the installer's own exit status.
if [ -s "${installer:-}" ]; then
  bash "${installer}"; status=$?; rm -f -- "${installer}"; unset installer
else
  echo "no downloaded installer to run (Step 1 failed or was not run)" >&2; status=1
fi
(exit "${status}")
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

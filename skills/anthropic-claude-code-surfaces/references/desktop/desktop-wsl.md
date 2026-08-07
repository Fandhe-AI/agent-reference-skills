<!-- source: https://code.claude.com/docs/en/desktop-wsl.md / last verified: 2026-08-07 -->

# Claude Code Desktop in WSL

Run Code sessions inside a WSL 2 distribution on Windows. The session's Claude Code process, tools, and git all execute inside the distribution using native Linux paths.

## Signature / Usage

```text
1. Open the environment picker in the Code tab
2. Pick a distribution under the "WSL" section (e.g. Ubuntu)
3. Choose a folder (Linux paths, e.g. /home/you/project)
4. Trust the folder (per distribution + folder)
```

## Options / Props

| Requirement | Value |
|------|-------------|
| OS | Windows 10 or 11 with WSL 2 (WSL 1 not supported) |
| Distribution | At least one installed (e.g. Ubuntu) |
| Tools | `git` installed inside the distribution |

## Notes

- Trust is granted per distribution and folder; a folder trusted in one distribution or on Windows itself is not automatically trusted elsewhere
- "Open in editor" opens VS Code connected via Remote - WSL
- Parallel sessions, side chats, visual diff review, branch/PR status, and worktrees all work; the integrated terminal, connectors, plugins, session forking, the file browser pane, and `@`-mention file suggestions are not yet available in WSL sessions
- On organization-managed devices, WSL sessions may be disabled by administrator policy

## Related

- [Desktop application](./desktop.md)
- [Get started with the desktop app](./desktop-quickstart.md)

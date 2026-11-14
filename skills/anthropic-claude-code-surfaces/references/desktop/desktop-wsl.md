<!-- source: https://code.claude.com/docs/en/desktop-wsl.md / last verified: 2026-11-14 -->

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

- Use a WSL session when the repository lives inside the distribution's filesystem; working on those files from Windows goes through a network filesystem, which is slow and breaks file watching
- The environment selector is under the prompt box (above it in the earlier layout); the session starts in the distribution's home directory. The first session in a distribution takes a little longer while Claude sets up inside it. A `\\wsl.localhost\...` folder opened from the normal folder picker reopens inside that distribution
- Trust is granted per distribution and folder; a folder trusted in one distribution or on Windows itself is not automatically trusted elsewhere
- "Open in editor" opens VS Code connected via Remote - WSL
- Parallel sessions, side chats, visual diff review, branch/PR status, and worktrees all work, backed by the git and toolchain inside the distribution
- Limits in WSL sessions: plugins are not available; the file pane is view-only (ask Claude to edit); if the **+** menu shows **Add image** in place of **Add files or photos**, only images can be attached (@mention other files from the session's folder)
- The integrated terminal and connectors may be missing: with a Claude account the two features roll out separately (select **Help > Check for Updates…**; if still missing after updating there is nothing to do); with a third-party provider WSL sessions don't get them and updating doesn't change that
- On organization-managed devices, WSL sessions may be unavailable; if session start fails with a message that the device is managed, it is controlled by your administrator (see `admin-setup.md#decide-how-settings-reach-devices` in the official docs)
- Source: https://code.claude.com/docs/en/desktop-wsl.md (fetched 2026-11-14)

## Related

- [Desktop application](./desktop.md)
- [Get started with the desktop app](./desktop-quickstart.md)

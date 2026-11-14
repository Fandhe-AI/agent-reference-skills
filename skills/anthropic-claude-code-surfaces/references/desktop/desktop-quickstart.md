<!-- source: https://code.claude.com/docs/en/desktop-quickstart.md / last verified: 2026-11-14 -->

# Get started with the desktop app

Install Claude Code on desktop and start your first coding session. No terminal required.

## Signature / Usage

```text
1. Install and sign in (macOS/Windows installer, or apt on Linux)
2. Open the Code tab
3. Select environment (Local/Cloud/SSH/WSL) and project folder
4. Choose a model
5. Type what you want Claude to do and press Enter
6. Review diff view, accept/reject changes
```

Example first prompts:

```text
Find a TODO comment and fix it
Add tests for the main function
Create a CLAUDE.md with instructions for this codebase
```

## Notes

- The desktop app bundles Claude Code; installing Node.js or the CLI separately is not required. To use `claude` from a terminal, install the CLI separately
- Claude Code requires a Pro, Max, Ultra, Team, or Enterprise subscription
- Downloads: universal macOS build (Intel and Apple Silicon), Windows x64, a separate Windows ARM64 installer, and Linux (beta, apt or `.deb` for Ubuntu and Debian)
- In the Code tab, the first control in the row under the prompt box is the environment selector (pick the top entry in the **Local** group, then **Open folder…** from the project folder control); the model picker is toward the right end of the same row. If a new session shows the environment above the prompt box, you have the earlier layout (see `desktop.md`)
- If clicking **Code** shows a prompt to upgrade, subscribe to a paid plan; a prompt to sign in online means complete the sign-in and restart; a 403 error is covered in `desktop.md` troubleshooting
- Check the permission mode in the row under the prompt box: in Auto or Accept edits, Claude applies file changes and a `+12 -1` indicator appears for the diff view; in Manual, Claude proposes each change and waits for approval
- Session isolation in its own worktree requires Git (most Macs include it; on Windows install Git for Windows). Claude Desktop before 1.49585.0 asked for Git before any local session
- Next steps the page points to: interrupt and steer (stop button, or type a correction and press **Enter**), `@filename` context, `/` skills and plugins, `/code-review`, permission modes (Auto, Manual, Accept edits, Plan), pane layout and terminal (**Ctrl+\`**), app preview in the Browser pane, PR monitoring, scheduled tasks, parallel sessions, tasks pane, side chat, cloud sessions, and connectors
- Source: https://code.claude.com/docs/en/desktop-quickstart.md (fetched 2026-11-14)

## Related

- [Desktop application](./desktop.md)
- [Claude Desktop on Linux (beta)](./desktop-linux.md)
- [Claude Code Desktop in WSL](./desktop-wsl.md)

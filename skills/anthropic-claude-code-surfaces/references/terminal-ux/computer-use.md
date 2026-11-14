<!-- source: https://code.claude.com/docs/en/computer-use.md / last verified: 2026-11-14 -->

# Let Claude use your computer from the CLI

Computer use is a research-preview built-in MCP server (macOS only, Pro/Max/Ultra plans) that lets Claude open apps, click, type, and see your screen, for tasks nothing else can reach: native apps, simulators, GUI-only tools.

## Signature / Usage

```text
/mcp
# select `computer-use` -> Enable
```

Claude tries the most precise tool first: an MCP server for the service, then Bash, then Claude in Chrome for browser work, then computer use as the fallback for native apps, simulators, and tools without an API.

After enabling (persists per project) and granting the macOS permissions, ask for GUI work:

```text
Build the app target, launch it, and click through each tab to make
sure nothing crashes. Screenshot any error states you find.
```

## Options / Props

| Permission | Grants |
| --- | --- |
| Accessibility (macOS) | Click, type, scroll |
| Screen Recording (macOS) | See what's on screen |

| Warning shown at per-app approval | Applies to |
| --- | --- |
| Equivalent to shell access | Terminal, iTerm, VS Code, Warp, and other terminals/IDEs |
| Can read or write any file | Finder |
| Can change system settings | System Settings |

| Feature | Desktop | CLI |
| --- | --- | --- |
| Platforms | macOS and Windows | macOS only |
| Enable | Toggle in Settings | Enable `computer-use` in `/mcp` |
| Denied apps list | Configurable in Settings | Not yet available |
| Auto-unhide toggle | Optional | Always on |
| Dispatch integration | Dispatch-spawned sessions can use computer use | Not applicable |

## Notes

- Requires a Pro, Max, or Ultra plan and an interactive session; not available on Team/Enterprise plans, in non-interactive `-p` mode, with third-party providers (Bedrock, Google Cloud's Agent Platform, Microsoft Foundry; a separate claude.ai account is needed), or on Linux/Windows in the CLI (Windows is supported in the Desktop app instead). `computer-use` appears in `/mcp` only on eligible setups (check `/status` for the plan).
- Per-app approval: the first time Claude needs an app in a session a prompt lists which apps, extra permissions (such as clipboard access), and how many other apps will be hidden; choose **Allow for this session** or **Deny**. Warned apps aren't blocked. Control varies by app category: browsers and trading platforms are view-only, terminals and IDEs click-only, everything else full control. macOS may require restarting Claude Code after granting Screen Recording.
- Holds a machine-wide lock from first action until the session exits (not just until the task finishes); only one session can control the machine at a time. A second session fails with an error naming the holder; the lock is released automatically if the holder crashed.
- Other visible apps are hidden while Claude works and restored when the turn finishes; the terminal window stays visible and excluded from screenshots. Screenshots are downscaled automatically (e.g. 3456×2234 to roughly 1372×887) with no setting for the target size; enlarge on-screen text in the app if too small.
- Stop: a macOS notification at the first use in each turn reads "Claude is using your computer · press Esc to stop." Press `Esc` anywhere or `Ctrl+C` in the terminal to abort; the key press is consumed so prompt injection can't use it to dismiss dialogs. The session keeps the lock until it exits.
- Unlike the sandboxed Bash tool, computer use runs on your actual desktop with the apps you approve. Guardrails: per-app approval, sentinel warnings, terminal excluded from screenshots, global `Esc`, lock file.
- Distinct from the Claude API's `computer_use` tool, which is a raw model tool for building your own agent loop; this page covers the Claude Code CLI's built-in `computer-use` MCP server.
- Source: https://code.claude.com/docs/en/computer-use.md (fetched 2026-11-14)

## Related

- [artifacts](./artifacts.md)

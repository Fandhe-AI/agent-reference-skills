<!-- source: https://code.claude.com/docs/en/computer-use.md / last verified: 2026-08-07 -->

# Let Claude use your computer from the CLI

Computer use is a research-preview built-in MCP server (macOS only, Pro/Max plans) that lets Claude open apps, click, type, and see your screen, for tasks nothing else can reach: native apps, simulators, GUI-only tools.

## Signature / Usage

```text
/mcp
# select `computer-use` -> Enable
```

Claude tries the most precise tool first: an MCP server for the service, then Bash, then Claude in Chrome for browser work, then computer use as the fallback for native apps, simulators, and tools without an API.

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

## Notes

- Not available on Team/Enterprise plans, in non-interactive `-p` mode, or on Linux/Windows in the CLI (Windows is supported in the Desktop app instead).
- Holds a machine-wide lock from first action until the session exits (not just until the task finishes); only one session can control the machine at a time.
- Other visible apps are hidden while Claude works; the terminal window stays visible and excluded from screenshots. Press `Esc` anywhere to abort immediately.
- Distinct from the Claude API's `computer_use` tool, which is a raw model tool for building your own agent loop; this page covers the Claude Code CLI's built-in `computer-use` MCP server.

## Related

- [artifacts](./artifacts.md)

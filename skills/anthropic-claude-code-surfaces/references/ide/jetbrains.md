<!-- source: https://code.claude.com/docs/en/jetbrains.md / last verified: 2026-11-14 -->

# JetBrains IDEs

Use Claude Code with JetBrains IDEs including IntelliJ, PyCharm, WebStorm, and more, via a dedicated plugin providing interactive diff viewing, selection context sharing, and more.

## Signature / Usage

```bash
# From the IDE's integrated terminal
claude
```

```text
# From an external terminal, connect to a running JetBrains IDE
/ide
```

## Options / Props

### Supported IDEs

IntelliJ IDEA, PyCharm, Android Studio, WebStorm, PhpStorm, GoLand, and most other JetBrains IDEs.

### Plugin general settings (Settings -> Tools -> Claude Code [Beta])

| Setting | Description |
|------|-------------|
| Claude command | Custom command to run Claude, e.g. `claude`, `/usr/local/bin/claude`, `npx @anthropic-ai/claude-code` |
| Suppress notification for Claude command not found | Skip "command not found" notifications |
| Enable using Option+Enter for multi-line prompts | macOS only; requires terminal restart |
| Enable automatic updates | Auto check/install plugin updates, applied on restart |
| Accept connections from all network interfaces | Under Networking (Advanced); binds the MCP server beyond `127.0.0.1` |

### Built-in IDE MCP server tools

| Tool name | What it does | Read-only |
|------|------|------|
| `mcp__ide__getDiagnostics` | Returns the IDE's inspection diagnostics (errors and warnings shown in the editor). Each call covers one file: the one Claude specifies, or the active editor's file | Yes |

The plugin does not expose a code-execution tool to the model.

## Notes

- Source: https://code.claude.com/docs/en/jetbrains.md (fetched 2026-11-14)
- Works with any paid Claude subscription (Pro, Max, Ultra, Team, Enterprise) or a Claude Console account; no API key required. The plugin comes from the JetBrains Marketplace (third-party; Anthropic submits the plugin) and shows a "Cannot launch Claude Code" notification when `claude` isn't on PATH
- Diff viewing: changes open in the IDE diff viewer; set **Diff tool** to `auto` (IDE) or `terminal` in `/config`. The entry appears only while connected to the IDE (run `claude` from the JetBrains terminal, or `/ide` from an external one). Underlying setting: `diffTool`
- Selection context is shared automatically; `Read` deny rules block sharing for matching files. Claude Code doesn't request diagnostics from the plugin on its own after edits. Start `claude` from the IDE project root to give Claude the same files; a successful `/ide` prints `Connected to IntelliJ IDEA.` (or the IDE name)
- WSL: set the Claude command to `wsl -d Ubuntu -- bash -lic "claude"` (replace `Ubuntu` with your distribution). WSL2 NAT / Windows Firewall causes "No available IDEs detected" (WSL1 is unaffected); mirrored networking needs Windows 11 22H2+, otherwise use the firewall rule below
- ESC doesn't interrupt Claude in JetBrains terminals: in **Settings -> Tools -> Terminal** uncheck "Move focus to the editor with Escape", or delete the "Switch focus to Editor" shortcut under "Configure terminal keybindings"
- Security: in `acceptEdits` mode Claude may be able to modify IDE configuration files that the IDE executes automatically, bypassing Bash permission prompts. Prefer Manual mode for edits (`acceptEdits` and auto mode both approve in-directory edits without asking, except protected paths), use trusted prompts only, and know which files Claude can modify

- Plugin runs `claude` in the IDE's integrated terminal; it does not bundle its own CLI copy, so install the CLI separately first
- Quick launch: `Cmd+Esc` (Mac) / `Ctrl+Esc` (Windows/Linux); file references via `Cmd+Option+K` (Mac) / `Alt+Ctrl+K` (Linux/Windows), e.g. `@src/auth.ts#L1-99`
- For JetBrains Remote Development, install the plugin on the remote host via Settings -> Plugin (Host), not the local client
- WSL2 users hitting "No available IDEs detected" typically need a Windows Firewall rule for the WSL2 subnet or mirrored networking (`networkingMode=mirrored` in `.wslconfig`)
- The `ide` MCP server (hidden from `/mcp`) listens on an OS-assigned ephemeral port (not configurable), unencrypted `ws://`, with a fresh random auth token per IDE start written to `~/.claude/ide/<port>.lock` (`$CLAUDE_CONFIG_DIR/ide/` if set); the CLI presents it as the `X-Claude-Code-Ide-Authorization` header. Only `getDiagnostics` is visible to the model; the other tools are internal RPC. Queued messages keep the selection from when you pressed `Enter`
- **Accept connections from all network interfaces** makes the port reachable from the local network, with session traffic and token in cleartext. Enable only when loopback can't work; for WSL2 prefer mirrored networking

### WSL2 firewall rule

From the WSL shell run `hostname -I`; take the first two segments plus `.0.0/16` as the subnet (for `172.21.123.45`, `172.21.0.0/16`). Then in an Administrator PowerShell, adjusting the range, and restart the IDE and Claude Code:

```powershell
New-NetFirewallRule -DisplayName "Allow WSL2 Internal Traffic" -Direction Inbound -Protocol TCP -Action Allow -RemoteAddress 172.21.0.0/16 -LocalAddress 172.21.0.0/16
```

Mirrored networking alternative, in `.wslconfig` in the Windows user directory (then `wsl --shutdown`):

```ini
[wsl2]
networkingMode=mirrored
```

## Related

- [Use Claude Code in VS Code](./vs-code.md)
- [Use Claude Code with Chrome](./chrome.md)

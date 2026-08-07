<!-- source: https://code.claude.com/docs/en/jetbrains.md / last verified: 2026-08-07 -->

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
| Enable automatic updates | Auto check/install plugin updates on restart |
| Accept connections from all network interfaces | Under Networking (Advanced); binds the MCP server beyond `127.0.0.1` |

### Built-in IDE MCP server tools

| Tool name | What it does | Read-only |
|------|------|------|
| `mcp__ide__getDiagnostics` | Returns the IDE's inspection diagnostics, optionally scoped to one file | Yes |

## Notes

- Plugin runs `claude` in the IDE's integrated terminal; it does not bundle its own CLI copy, so install the CLI separately first
- Quick launch: `Cmd+Esc` (Mac) / `Ctrl+Esc` (Windows/Linux); file references via `Cmd+Option+K` (Mac) / `Alt+Ctrl+K` (Linux/Windows), e.g. `@src/auth.ts#L1-99`
- For JetBrains Remote Development, install the plugin on the remote host via Settings -> Plugin (Host), not the local client
- WSL2 users hitting "No available IDEs detected" typically need a Windows Firewall rule for the WSL2 subnet or mirrored networking (`networkingMode=mirrored` in `.wslconfig`)
- The `ide` MCP server listens on an OS-assigned ephemeral port, unencrypted `ws://`, with a fresh random auth token per IDE start written to `~/.claude/ide/<port>.lock`

## Related

- [Use Claude Code in VS Code](./vs-code.md)
- [Use Claude Code with Chrome](./chrome.md)

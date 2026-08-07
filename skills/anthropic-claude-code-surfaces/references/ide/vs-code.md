<!-- source: https://code.claude.com/docs/en/vs-code.md / last verified: 2026-08-07 -->

# Use Claude Code in VS Code

Install and configure the Claude Code extension for VS Code. Native graphical interface integrated into the IDE with inline diffs, @-mentions, plan review, and keyboard shortcuts. Recommended way to use Claude Code in VS Code.

## Signature / Usage

```bash
# Install directly
# vscode:extension/anthropic.claude-code
# cursor:extension/anthropic.claude-code

# Or via Extensions view: Cmd+Shift+X (Mac) / Ctrl+Shift+X (Windows/Linux), search "Claude Code"
```

```bash
# Add an MCP server (from the integrated terminal)
claude mcp add --transport http github https://api.githubcopilot.com/mcp/ \
  --header "Authorization: Bearer YOUR_GITHUB_PAT"
```

```bash
# Launch a new Claude Code tab from external tooling
open "vscode://anthropic.claude-code/open"                 # macOS
xdg-open "vscode://anthropic.claude-code/open"              # Linux
Start-Process "vscode://anthropic.claude-code/open"          # Windows PowerShell
```

## Options / Props

### Extension settings

| Setting | Default | Description |
|------|------|-------------|
| `useTerminal` | `false` | Launch Claude in terminal mode instead of graphical panel |
| `initialPermissionMode` | `default` | `default`/`plan`/`acceptEdits`/`bypassPermissions` (`manual` is an alias for `default`) |
| `preferredLocation` | `panel` | `sidebar` (right) or `panel` (new tab) |
| `autosave` | `true` | Auto-save files before Claude reads or writes them |
| `useCtrlEnterToSend` | `false` | Use Ctrl/Cmd+Enter instead of Enter to send prompts |
| `enableNewConversationShortcut` | `false` | Enable Cmd/Ctrl+N to start a new conversation |
| `enableReopenClosedSessionShortcut` | `true` | Cmd/Ctrl+Shift+T reopens the most recently closed Claude session tab |
| `hideOnboarding` | `false` | Hide the onboarding checklist |
| `focusView` | `false` | Hide tool calls/results/thinking behind one expandable row per turn |
| `respectGitIgnore` | `true` | Exclude .gitignore patterns from file searches |
| `usePythonEnvironment` | `true` | Activate the workspace's Python environment when running Claude |
| `environmentVariables` | `[]` | Environment variables for the Claude process |
| `disableLoginPrompt` | `false` | Skip authentication prompts (third-party provider setups) |
| `allowDangerouslySkipPermissions` | `false` | Adds Bypass permissions to the mode selector (sandboxes only) |
| `claudeProcessWrapper` | - | Executable used to launch the Claude process |

### `vscode://anthropic.claude-code/open` query parameters

| Parameter | Description |
|------|-------------|
| `prompt` | URL-encoded text to pre-fill in the prompt box (not auto-submitted) |
| `session` | A session ID to resume; must belong to the currently open workspace |

### Built-in IDE MCP server tools

| Tool name | What it does | Read-only |
|------|------|------|
| `mcp__ide__getDiagnostics` | Returns language-server diagnostics (Problems panel), optionally scoped to one file | Yes |
| `mcp__ide__executeCode` | Runs Python code in the active Jupyter notebook's kernel; always shows a confirmation Quick Pick | No |

## Notes

- Requires VS Code 1.94.0+ and an Anthropic account (Pro/Max/Team/Enterprise or Claude Console); no API key required
- Installing the extension does not add `claude` to PATH — for the integrated-terminal CLI and features like `!` bash shortcut and tab completion, install the standalone CLI separately
- The `ide` MCP server binds to `127.0.0.1` on a random port (10000-65535), unencrypted `ws://`, with a fresh random auth token per activation written to `~/.claude/ide/<port>.lock` (`0600` permissions)
- Also installs in VS Code forks (Cursor, Devin Desktop, Kiro) and via the Open VSX registry

## Related

- [JetBrains IDEs](./jetbrains.md)
- [Use Claude Code with Chrome](./chrome.md)

<!-- source: https://code.claude.com/docs/en/vs-code.md / last verified: 2026-10-17 -->

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

```text
# Plugin install link (opens the Manage plugins dialog on that plugin's scope choice; nothing installs until a scope is picked)
vscode://anthropic.claude-code/install-plugin?plugin=code-review&marketplace=anthropics/claude-plugins-official
```

In `cmd.exe`, use the `start "" "vscode://..."` form (empty title argument first). `plugin` is required; `marketplace` defaults to `anthropics/claude-plugins-official`. To launch a terminal session instead of a VS Code tab, use the CLI's `claude-cli://` deep links (see the anthropic-claude-code skill).

## Options / Props

### Extension settings

| Setting | Default | Description |
|------|------|-------------|
| `useTerminal` | `false` | Launch Claude in terminal mode instead of graphical panel |
| `initialPermissionMode` | - (unset) | `default`/`plan`/`acceptEdits`/`bypassPermissions` (`manual` is an alias for `default`). When unset, the extension chooses the starting mode per the "Switch permission modes" order. VS Code reads it from user settings only and ignores workspace values; before v2.1.225 it defaulted to `default` and applied workspace values |
| `preferredLocation` | `panel` | `sidebar` (right) or `panel` (new tab) |
| `lockEditorGroups` | `true` | Lock the editor groups Claude starts for its tabs, so files opened while a Claude tab is focused go to another group. Requires v2.1.274+ |
| `autosave` | `true` | Auto-save files before Claude reads or writes them |
| `attachOpenFile` | `true` | Add the open editor file to messages and show it in the prompt box; when off, only selected text is added. Requires v2.1.271+ |
| `useCtrlEnterToSend` | `false` | Use Ctrl/Cmd+Enter instead of Enter to send prompts |
| `scrollToBottomOnSend` | `true` | Scroll to the bottom when you send a message. Requires v2.1.275+ |
| `showMessageTimestamps` | `true` | Show when each message was sent, with a date line at day changes. Requires v2.1.284+; before v2.1.290 the default was `false` |
| `spinnerVerbs` | `{"mode": "append", "verbs": []}` | Verbs the conversation spinner rotates through; same `mode` / `verbs` fields as the CLI `spinnerVerbs` |
| `enableNewConversationShortcut` | `false` | Enable Cmd/Ctrl+N to start a new conversation |
| `enableReopenClosedSessionShortcut` | `true` | Cmd/Ctrl+Shift+T reopens the most recently closed Claude session tab |
| `archiveInactiveSessions` | `14` | Archive a session after this many days without activity: `1`, `2`, `7`, or `14`; `0` turns it off. Requires v2.1.265+ |
| `continueAfterReload` | `true` | After a window reload, Claude continues the interrupted step in the restored session. Requires v2.1.274+ |
| `hideOnboarding` | `false` | Hide the onboarding checklist |
| `focusView` | `false` | Hide tool calls/results/thinking behind expandable rows; the latest to-do list stays visible (v2.1.225+). The setting itself requires v2.1.221+ |
| `respectGitIgnore` | `true` | Exclude .gitignore patterns from file searches and selection context |
| `usePythonEnvironment` | `true` | Activate the workspace's Python environment when running Claude |
| `environmentVariables` | `[]` | Environment variables for the Claude process. A `CLAUDE_CONFIG_DIR` entry applies only as an absolute path (`~` is not expanded; relative values are ignored) |
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

In the chat panel, with Claude Code v2.1.285+, Claude reads the Problems panel through a separate built-in `claude-vscode` server; hooks and permission rules see it as `mcp__claude-vscode__getDiagnostics`. A `Read` deny rule covers neither diagnostics tool, so deny both by name:

```json
{ "permissions": { "deny": ["mcp__ide__getDiagnostics", "mcp__claude-vscode__getDiagnostics"] } }
```

## Notes

- Requires VS Code 1.94.0+ and an Anthropic account (Pro/Max/Team/Enterprise or Claude Console); no API key required
- Installing the extension does not add `claude` to PATH — for the integrated-terminal CLI and features like `!` bash shortcut and tab completion, install the standalone CLI separately
- The `ide` MCP server binds to `127.0.0.1` on a random port (10000-65535), unencrypted `ws://`, with a fresh random auth token per activation written to `~/.claude/ide/<port>.lock` (`0600` permissions)
- Also installs in VS Code forks (Cursor, Devin Desktop, Kiro) and via the Open VSX registry
- A `Read` deny rule for a path (for example `.env`) also suppresses both the selected text and the open-file notice for that file
- The chat panel announces activity to screen readers without setup (v2.1.236+); keyboard focus on the permission-destination arrow keys is at v2.1.268+. This is separate from the CLI's opt-in screen reader mode
- The extension supports plugin management (install / uninstall / share link / marketplaces / plugins that draw in the panel), session groups and filters, continuing conversations after a reload, and a `/btw` side-question panel (v2.1.227+)
- Chrome: "Enabled by default" is shared with the CLI, and with v2.1.287+ each session connects to the browser at start (see the Chrome page)

## Related

- [JetBrains IDEs](./jetbrains.md)
- [Use Claude Code with Chrome](./chrome.md)

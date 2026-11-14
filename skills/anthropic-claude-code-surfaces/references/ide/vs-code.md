<!-- source: https://code.claude.com/docs/en/vs-code.md / last verified: 2026-11-14 -->

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
| `attachOpenFile` | `true` | Add the open editor file to messages and show it in the prompt box; when off, the file is added only along with text you select. Requires v2.1.271+ |
| `attachSelection` | `true` | Add the text you select in the editor to messages and show it in the prompt box; when off, you can still add a selection as an @-mention (`Option+K` / `Alt+K`). Requires v2.1.300+ |
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
| `respectGitIgnore` | `true` | Exclude .gitignore patterns from file searches and selection context (chat panel only; see Notes) |
| `usePythonEnvironment` | `true` | Activate the workspace's Python environment when running Claude |
| `environmentVariables` | `[]` | Environment variables for the Claude process. A `CLAUDE_CONFIG_DIR` entry applies only as an absolute path (`~` is not expanded; relative values are ignored) |
| `disableLoginPrompt` | `false` | Skip authentication prompts (third-party provider setups) |
| `allowDangerouslySkipPermissions` | `false` | Adds Bypass permissions to the mode selector (sandboxes only) |
| `claudeProcessWrapper` | - | Executable used to launch the Claude process; the bundled binary path is passed as an argument when present. Set it to a separately installed `claude` binary if the extension build doesn't include one for your platform. While set, the "conversation still open somewhere else" check is skipped and plan mode isn't restored on resume |

### `vscode://anthropic.claude-code/open` query parameters

| Parameter | Description |
|------|-------------|
| `prompt` | URL-encoded text to pre-fill in the prompt box (not auto-submitted) |
| `session` | ID of a session to resume, from the folder open in VS Code. With v2.1.300+, a session from the main checkout or a worktree of that folder's repository also resumes. If not found, a fresh conversation starts; if already open in a tab, that tab is focused |

### `vscode://anthropic.claude-code/install-plugin` query parameters

| Parameter | Description |
|------|-------------|
| `plugin` | Plugin name as its marketplace lists it. Required. At most 100 characters, starting with an ASCII letter or digit, otherwise ASCII letters, digits, `.`, `_`, `-` |
| `marketplace` | GitHub `owner/repo`, an `https://` URL (no user name, password, or query string), or a git SSH address such as `git@github.com:owner/repo.git`. Defaults to `anthropics/claude-plugins-official`. Not a local path, `http://` address, or marketplace name. To pin a ref append `%23<ref>` (e.g. `owner/repo%23v1.0`); an unencoded `#` fails, and `anthropics` org marketplaces can't be pinned |

An invalid link shows an error starting with `Invalid plugin installation URL` and nothing opens or installs. Other outcomes end in a dialog message: plugin not found in the marketplace, plugin already installed, or a different marketplace with the same name already added.

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

- Requires VS Code 1.94.0+ and an Anthropic account (Pro/Max/Ultra/Team/Enterprise or Claude Console); no API key required
- The extension bundles its own copy of the CLI for the chat panel, and its version number is the Claude Code version it bundles (a feature needing v2.1.286+ needs extension 2.1.286+)
- Installing the extension does not add `claude` to PATH — for the integrated-terminal CLI and features like `!` bash shortcut and tab completion, install the standalone CLI separately
- The `ide` MCP server binds to `127.0.0.1` on a random port (10000-65535, not configurable), unencrypted `ws://`, with a fresh random auth token per activation written to `~/.claude/ide/<port>.lock` (`0600` permissions in a `0700` directory; under `$CLAUDE_CONFIG_DIR/ide/` if set); the CLI presents it as the `X-Claude-Code-Ide-Authorization` header. The server hosts a dozen tools but only `getDiagnostics` / `executeCode` are visible to the model
- Also installs in VS Code forks (Cursor, Devin Desktop, Kiro) and via the Open VSX registry
- Source: https://code.claude.com/docs/en/vs-code.md (fetched 2026-11-14)
- A `Read` deny rule for a path (for example `.env`) also suppresses both the selected text and the open-file notice for that file
- In the chat panel, selected text from a workspace file matching `files.exclude` / `search.exclude` (or git-ignored, with `search.useIgnoreFiles` and `respectGitIgnore` on) is withheld: Claude receives at most the path. The filter does not apply in the integrated terminal; use a `Read` deny rule there. `attachSelection` / `attachOpenFile` also apply to `claude` in the integrated terminal
- The chat panel announces activity to screen readers without setup (v2.1.236+); keyboard focus on the permission-destination arrow keys is at v2.1.268+. This is separate from the CLI's opt-in screen reader mode
- The extension supports plugin management (install / uninstall / share link / marketplaces / plugins that draw in the panel), session groups and filters, continuing conversations after a reload, and a `/btw` side-question panel (v2.1.227+)
- Chrome: "Enabled by default" is shared with the CLI, and with v2.1.287+ each session connects to the browser at start (see the Chrome page); otherwise type `@browser` in the prompt box (requires Claude in Chrome 1.0.36+)

### Prompt box and sessions (version gates)

- Permission mode indicator: Auto, Manual, Plan, Edit automatically. With v2.1.283+ Auto is the built-in starting mode (earlier: only on Pro/Max/Ultra/Team). Plan opens the plan as a Markdown document for inline comments; `/plan` (v2.1.280+) switches or shows the plan, `/plan <task>` starts planning, `/plan open` opens the plan file
- Manual-mode diffs: per-change **Accept this change** / **Reject this change** (v2.1.275+; diffs with more than 100 changes open without the buttons); commands `Claude Code: Accept Change at Cursor` / `Reject Change at Cursor`
- Model picker: `/model` alone opens it (v2.1.284+); **Effort** row and model-name button (v2.1.257+); **Ultracode** switch when dynamic workflows are enabled (v2.1.284+)
- Command menu (`/`): **Slash commands** dialog (v2.1.257+), `/skills` with per-skill visibility (v2.1.280+), Output styles (v2.1.257+) and Build a custom style (v2.1.261+), Hooks and Permissions viewers/editors (v2.1.269+), Memory (v2.1.274+; view/edit/delete saved memories v2.1.275+), Instructions (CLAUDE.md, v2.1.274+), `/status` and `/sandbox` and `/chrome` and `/export` (v2.1.280+), `/logout` (v2.1.277+), `/bug` / `/feedback` (v2.1.229+; saved locally under `~/.claude/feedback-bundles/` with v2.1.284+; off when `DISABLE_FEEDBACK_COMMAND` or `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` is set), Remote Control toggle (v2.1.203+), Focus view (`Ctrl+Option+F` / `Ctrl+Alt+F`; subagent progress rows v2.1.269+)
- `/copy` and **Copy response** (v2.1.277+); `/bookmarks` panel (v2.1.286+); **Files Claude sends you** via `SendUserFile` over Remote Control (v2.1.295+; network-host paths are shown unlinked); `/usage` Account & usage dialog with a **Fix** button (v2.1.305+, hidden while Remote Control is connected)
- Prompt cache clock icon next to the context indicator (minutes left, red when expired or just compacted); agent map from the agent count or `/tasks` (v2.1.269+; background tasks v2.1.277+; Stop / `Esc` ends only the current turn with v2.1.286+)
- Suggested prompts: `Tab` accepts; disable with `promptSuggestionEnabled: false` in `~/.claude/settings.json` (and unset `CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION`)
- `@terminal:name` includes terminal output; paste strips invisible Unicode characters; `Shift`-drag attaches files; `Shift+Enter` newline
- LaTeX math in responses is typeset (v2.1.301+, not in terminal mode): `$$ … $$`, `\[ … \]`, `math` fences, inline `$…$` / `\(…\)`. Inline formulas with spaces inside `$ $`, over 60 characters, or split across lines stay raw; formulas over 8,192 characters or with macros / unescaped `%` also stay raw
- Session history: AI-generated titles, rename/archive (Delete became Archive in v2.1.257), auto-archive after 14 days (v2.1.265+), unarchive all (v2.1.277+), groups (v2.1.229+; **Add Session Tab to Group** v2.1.257+), Active / Filter by status filters (v2.1.271+), plan mode restored on resume (v2.1.246+). The Web tab resumes cloud sessions (claude.ai subscription sign-in only; a downloaded copy, no sync back); Remote Control sessions for the open folder reopen the local conversation
- After a reload: editor-tab conversations return; sidebar ones return if active within 10 minutes. Interrupted steps continue (v2.1.274+, `continueAfterReload`; `CLAUDE_CODE_RESUME_` variables have no effect in the panel). A conversation whose last two opens didn't finish is not reopened (click **Open it anyway**). "Still open somewhere else" clears in about 10 minutes or via **Open here anyway**. Reopened worktree conversations show **Open worktree** (resume in `.claude/worktrees/` needs v2.1.300+)
- **Run in background** under a running command or subagent (v2.1.287+; shown after about two seconds, only for subagents the main agent spawned and is waiting on)
- Mods in plugins can draw in the panel (extension 2.1.299+; 2.1.304+ when feature flags aren't fetched, e.g. Bedrock); plugin dialog (`/plugins`) has Plugins and Marketplaces tabs, install scopes user / project / local, per-plugin configuration form, and ask-first prompts for project-shared plugins (**Disable for me** vs **Disable for everyone** / **Uninstall for everyone**, which keeps data)
- Conversations missing with `claudeProcessWrapper` set: update the extension to 2.1.304+

### CLI interplay and MCP

- Extension and CLI share conversation history (`claude --resume`). Extension: `/mcp` dialog adds/removes (v2.1.261+), enables/disables, reconnects, and manages OAuth for servers; it saves to the same configuration as `claude mcp add`. `claude mcp add` doesn't validate credentials, so check `/mcp` shows **Connected**
- Claude Code v2.1.318+ no longer installs the extension for you from the integrated terminal: until installed, `/ide` reports "No available IDEs detected". From an external terminal, `/ide` installs it unless `autoInstallIdeExtension` is off. After uninstalling, prevent reinstall with `autoInstallIdeExtension: false` in `~/.claude.json`, `CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL=1` in `env`, or **Auto-install IDE extension** off in `/config`
- `mcp__ide__executeCode` always inserts a new cell and asks via a Quick Pick (Execute / Cancel); it refuses without an active notebook, the Jupyter extension (`ms-toolsai.jupyter`), or a Python kernel. The Quick Pick is separate from `PreToolUse` hooks
- Third-party providers (Bedrock / Google Cloud's Agent Platform / Foundry): enable `disableLoginPrompt` and configure the provider in `~/.claude/settings.json`; features needing a claude.ai account (plan usage bars, voice dictation, Web tab) and the sign-out menu are unavailable

### Commands and shortcuts

| Command | Shortcut | Notes |
|------|------|------|
| Focus Input | `Cmd+Esc` / `Ctrl+Esc` | Toggle focus between editor and Claude |
| Open in New Tab | `Cmd+Shift+Esc` / `Ctrl+Shift+Esc` | Also Open in Side Bar / Terminal / New Window (no shortcut) |
| New Conversation | `Cmd+N` / `Ctrl+N` | Needs Claude focused and `enableNewConversationShortcut` |
| Reopen Closed Session | `Cmd+Shift+T` / `Ctrl+Shift+T` | Disable with `enableReopenClosedSessionShortcut` |
| Insert @-Mention Reference | `Option+K` / `Alt+K` | Editor must be focused |
| Toggle Focus view | `Ctrl+Option+F` / `Ctrl+Alt+F` | v2.1.221+; Ctrl+Alt+F opens Find in the Debug Console / Explorer |
| `claude-vscode.toggleDictation` | `Cmd+D` / `Ctrl+D` | Voice dictation; Claude must be focused; not in the Command Palette |
| Focus last message, Rename Session Tab, Add Session Tab to Group, Mark Session as Unread, Show Logs, Logout | - | Focus last message v2.1.268+; the three session-tab commands v2.1.257+ |

### Troubleshooting

- `Cmd+Esc` does nothing on macOS Tahoe+: clear System Settings > Keyboard > Keyboard Shortcuts > Game Controllers > Game Overlay, or rebind `Claude Code: Focus input`
- `Ctrl+J` adds a newline: unbind in `keybindings.json` (`"ctrl+j": null` in a `Chat` context block), read by extension 2.1.309+; check `Claude Code: Show Logs` for `Ctrl+J in the chat input still inserts a newline`
- Blank panel: update to 2.1.309+ and run **Developer: Reload Window**. Panel crashes on reload-reopen: update to 2.1.301+
- Spark icon needs an open file (or use the Status Bar **✻ Claude Code**); the extension doesn't work in Restricted Mode (workspace trust)
- Dictation or Web tab behind a TLS-inspecting proxy: set `NODE_EXTRA_CA_CERTS` (absolute path, no `~`) in `env` of `~/.claude/settings.json` (extension 2.1.307+); values from the VS Code environment take precedence, and `claudeCode.environmentVariables` / project / managed settings don't apply to these features
- Uninstall: Extensions view > Uninstall; extension data lives in the `globalStorage/anthropic.claude-code` directory under VS Code's user data directory

## Related

- [JetBrains IDEs](./jetbrains.md)
- [Use Claude Code with Chrome](./chrome.md)

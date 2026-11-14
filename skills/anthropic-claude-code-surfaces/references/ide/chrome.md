<!-- source: https://code.claude.com/docs/en/chrome.md / last verified: 2026-11-14 -->

# Use Claude Code with Chrome

Connect Claude Code to your Chrome browser via the Claude in Chrome extension to test web apps, debug with console logs, automate form filling, and extract data from web pages, from the CLI or the VS Code extension.

## Signature / Usage

```bash
claude --chrome
```

```text
Go to code.claude.com/docs, click on the search box,
type "hooks", and tell me what results appear
```

Run `/chrome` at any time to check connection status, manage permissions, reconnect the extension, or choose which connected browser to use.

## Options / Props

| Requirement | Value |
|------|-------------|
| Browser | Chrome, Edge, or other Chromium-based (Brave, Arc, Vivaldi, Opera) |
| Extension | Claude in Chrome, v1.0.36+ |
| Plan | Direct Anthropic plan (Pro/Max/Ultra/Team/Enterprise); `/login` required, not API key or long-lived token |

### Browser tools and plan mode

| Call | Behavior in plan mode |
|------|------|
| Record a GIF | Permission prompt |
| Open a new tab | Permission prompt |
| Run a shortcut | Permission prompt |
| `tabs_context_mcp` with `createIfEmpty` | Permission prompt |
| `browser_batch` that includes any of these actions | Permission prompt |

## Notes

- In an interactive CLI session where bypass permissions mode is available and feature-flag fetching is off, the plan-mode browser calls listed above run without a prompt
- Not supported in WSL; not available through third-party providers (Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry) — requires a separate claude.ai account in that case
- Uploads: session must have `Read` permission for the file, max 10 MB total per upload, files with multiple hard links (e.g. inside `node_modules`) are refused. Files whose name or folder is a credential location (`.env`, `.pem` / `.key` files, anything under `.ssh`) are also refused (v2.1.293+). Uploads need v2.1.211+
- Enable by default with `/chrome` -> "Enabled by default" to skip passing `--chrome` each session (increases context usage since browser tools are always loaded). The setting is shared between the CLI and VS Code; with v2.1.287+, each VS Code session connects to the browser at start, otherwise a VS Code session connects when you type `@browser`
- For VS Code, use `@browser` in the prompt box instead of `--chrome` (see `vs-code.md`)
- Install prompt: when Claude needs the browser and the extension isn't detected, an interactive session shows "Claude wants to use your browser" (Install extension / Not now / Don't ask again), at most once per session. It is suppressed when `deniedMcpServers` blocks `claude-in-chrome`, or when a `managed-mcp.json` is deployed without allowing Claude in Chrome alongside the managed set
- A project's `.claude/settings.json` / `settings.local.json` cannot turn on `CLAUDE_CODE_ENABLE_CFC`; Claude Code ignores it and prints a warning. Use `/chrome` or `--chrome`
- Enterprise organizations with HIPAA enabled have Claude in Chrome off by default (an Owner can turn it on in Organization settings)
- With an API key or a `claude setup-token` token, Chrome integration stays off even with `--chrome`; before v2.1.216 such sessions failed to connect with a 403
- In auto mode, when the classifier approves a browser call to a site, the extension skips its own per-site check for that call (unless permission rules deny any site to Claude in Chrome)
- With several connected browsers, run `/chrome` and select **Select browser…**
- Fixed versions: startup no longer hangs when Chrome isn't running (v2.1.211); screenshot `save_to_disk` writes a file (v2.1.211)
- Source: https://code.claude.com/docs/en/chrome.md (fetched 2026-11-14)

### Session behavior and permissions

- Claude opens new tabs, shares your browser login state, and pauses at login pages / CAPTCHAs. The extension groups the tabs into a Chrome tab group tied to the session. Local sessions: `/clear` closes the group (open pages included) unless work that survives the clear is still running; `/resume`, exiting, or a `/clear` with surviving work closes the group only if it holds nothing but empty new tabs
- First launch with Chrome shows a one-time intro dialog. The "Claude in Chrome extension detected" startup dialog sets **Enabled by default**: **Yes, use my browser** turns it on, **No, keep browser tools off** (or Esc) turns it off and stops the offer; change later with `/chrome`
- Install prompt "Install extension" starts a guided setup and enables the browser tools in the same session ("Continue with browser tools" / "Continue without browser tools"); "Not now" can ask again in a later session
- In VS Code, permission prompts appear as chat-panel cards that can also allow the site. In a session that connected at start via Enabled by default, Claude asks before browser actions on a not-yet-allowed site in Manual, Edit automatically, Auto, and Bypass permissions modes (in Auto and Bypass, until you type `@browser` in that session)
- The plan-mode prompt rules apply to recording a GIF and opening a new tab; the full tool list is under `/mcp` > `claude-in-chrome` > **View tools**
- Recorded GIFs capture everything visible, including account details; review before sharing

### Troubleshooting

- Extension not detected: confirm it's enabled in `chrome://extensions`, `claude` is up to date, Chrome is running, then `/chrome` > "Reconnect extension"; restart both if needed. The first enable installs a native messaging host config that Chrome reads on startup (restart Chrome); Claude Code opens the connect tab only on that first install
- Native messaging host file `com.anthropic.claude_code_browser_extension.json`: Chrome macOS `~/Library/Application Support/Google/Chrome/NativeMessagingHosts/`, Linux `~/.config/google-chrome/NativeMessagingHosts/`, Windows registry `HKCU\Software\Google\Chrome\NativeMessagingHosts\`; Edge uses `Microsoft Edge` / `microsoft-edge` / `HKCU\Software\Microsoft\Edge\NativeMessagingHosts\`; other Chromium browsers use their own directory (Brave macOS: `~/Library/Application Support/BraveSoftware/Brave-Browser/NativeMessagingHosts/`)
- Browser not responding: dismiss any blocking JavaScript dialog (alert / confirm / prompt), ask Claude to open a new tab, or disable and re-enable the extension
- Connection drops (idle service worker): `/chrome` > "Reconnect extension". If `/chrome` Status reads "Not connected", the session's own connection failed; before v2.1.290 "Reconnect extension" only opened the reconnect page and didn't restart the connection
- Multiple claude.ai organizations: the extension must be signed in to the same organization as Claude Code (check the `Organization` row of `/status`), otherwise tools return "Browser extension is not connected". Logging out of the extension loses its saved shortcuts and scheduled tasks
- Windows: named pipe conflict (EADDRINUSE) means restart Claude Code and close other sessions using Chrome; native messaging host crash means reinstall Claude Code; setup tab failing to open is fixed in v2.1.211
- Common errors: "Browser extension is not connected" (not installed, different account/organization, or IP allowlist rejecting `bridge.claudeusercontent.com`); "No tab available" (ask for a new tab); "Receiving end does not exist" (idle service worker; reconnect); "No browsers are connected" (Chrome closed, mismatched account/organization, or `bridge.claudeusercontent.com` unreachable); Extension "Not detected" in `/chrome` (install or enable it)

## Related

- [Use Claude Code in VS Code](./vs-code.md)
- [JetBrains IDEs](./jetbrains.md)

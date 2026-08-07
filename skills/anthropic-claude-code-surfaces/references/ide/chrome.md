<!-- source: https://code.claude.com/docs/en/chrome.md / last verified: 2026-08-07 -->

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
| Plan | Direct Anthropic plan (Pro/Max/Team/Enterprise); `/login` required, not API key or long-lived token |

### Browser tools and plan mode

| Category | Behavior in plan mode | Examples |
|------|------|-------------|
| Read-only | Run without a permission prompt | `read_page`, `get_page_text`, `find`, reading console/network, screenshot |
| State-changing | Prompt for approval | Clicks, typing, navigation, tab/window management, recording a GIF |

## Notes

- Not supported in WSL; not available through third-party providers (Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry) — requires a separate claude.ai account in that case
- Uploads: session must have `Read` permission for the file, max 10 MB total per upload, files with multiple hard links (e.g. inside `node_modules`) are refused
- Enable by default with `/chrome` -> "Enabled by default" to skip passing `--chrome` each session (increases context usage since browser tools are always loaded)
- For VS Code, use `@browser` in the prompt box instead of `--chrome` (see `vs-code.md`)

## Related

- [Use Claude Code in VS Code](./vs-code.md)
- [JetBrains IDEs](./jetbrains.md)

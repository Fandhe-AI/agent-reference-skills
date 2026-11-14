# Browser extension

The ChatGPT browser extension lets the ChatGPT desktop app work in Google Chrome, Microsoft Edge, Brave, Opera, or Vivaldi, reading or acting on sites where you're already signed in.

## Signature / Usage

```text
@Edge open Salesforce and update the account from these call notes.
```

Select the browser (**Chrome**, **Edge**, **Brave Browser**, **Opera**, **Vivaldi**) from the `@`-mention menu in a new ChatGPT Work or Codex chat; mention an open tab to give context from that page. Use `@Browser` for the built-in browser instead.

### Setup

1. Install the browser, then open **Settings > Computer Use** in the desktop app (expand **More browsers** if needed).
2. Select your browser and follow any prompt to install the required plugin.
3. Select **Install** beside the browser to open its extension store page; install the ChatGPT extension and review permission prompts.
4. Return to **Computer Use** and confirm the browser shows **Manage**.
5. Start a Work or Codex chat and `@`-mention the browser, using the profile where the extension is installed.

The browser's toggle controls whether it appears in the `@`-mention menu; **Manage** changes website permissions.

### Side chat

- Supported in Chrome, Edge, Brave, and Vivaldi; **Opera has no side chat** (tab mentions and browser control still work from the desktop app).
- Open from the toolbar or **Extensions** menu (macOS: Cmd+Shift+. also works); the panel stays with its tab; chats are shared with the ChatGPT app.
- Right-click the page and select **Ask ChatGPT**, or highlight text to bring a selection into the chat. With captions available, YouTube questions use the timestamped transcript.

### Website access

By default ChatGPT asks per website host. Options: **Allow once**, **Allow for this site**, **Allow for all sites** (elevated risk: no more confirmations), **Decline**. Manage the allowlist and blocklist via **Settings > Computer Use > Manage** (shared across supported browsers). Removing a domain from either list restores asking.

Browser history access is asked per request and scoped to it; there is no always-allow option.

### Troubleshooting

If it can't connect: check the site isn't blocklisted; update the desktop app (every installed ChatGPT/Codex copy); restart the browser; confirm **Settings > Computer Use** shows **Manage** (otherwise redo setup, toggle on if missing from `@` menu); use the profile with the extension; start a new chat; restart the app and reinstall the extension; otherwise run `/feedback` and include the chat ID.

For Chrome file uploads: Chrome extension **Details** > turn on **Allow access to file URLs**, then restart the task.

## Notes

- Update the desktop app before setting up another browser; availability can depend on rollout and workspace settings.
- ChatGPT switches between plugins (dedicated integration), your browser (signed-in context), and the built-in browser (localhost) as needed.
- Treat page content, selected text, and transcripts as untrusted context.
- Extension permissions (Chrome example) include page debugger, read/change all website data, browsing history, notifications, bookmarks, downloads, native messaging, and tab groups; ChatGPT still applies its own confirmations, allowlists, and blocklists.
- Computer Use follows the Memories setting. OpenAI stores browser activity only when it becomes part of chat context (page text, screenshots, tool calls, summaries); ChatGPT data controls apply.
- Source: https://learn.chatgpt.com/docs/chrome-extension (retrieved 2026-11-14).

## Related

- [Browser](./browser.md)
- [Computer Use](./computer-use.md)

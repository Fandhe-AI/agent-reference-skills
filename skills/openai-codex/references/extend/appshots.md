# Appshots

Appshots send the frontmost app window (image plus available text) to a ChatGPT chat so it has your current context from another app. Available in the ChatGPT desktop app on macOS and Windows.

## Signature / Usage

Page text (no code on the official page):

```text
Press both Command keys on macOS or both Alt keys on Windows to take one.
```

1. Bring the target app window to the front.
2. Press the hotkey (or your custom hotkey from ChatGPT settings).
3. Complete permission setup if asked.
4. Ask ChatGPT to perform a task with the appshot.

### Behavior and settings

- Captures the frontmost window only: an image of the visible window and available text (including text outside the visible scroll area). Stored locally in the session file like a manual attachment.
- Default destination: a new chat, or the chat you interacted with in the last 60 seconds; consecutive appshots go to the same chat.
- Change the hotkey and **Appshot destination** in app settings: **Current chat**, **New chat**, or **Automatic**.
- macOS floating pet controls: with them open and the main window in the background, **Automatic** starts a new chat from them (also with **Mini** pet); complete permission setup in the main app first. On Windows, appshots open in the main app.

## Notes

- macOS permissions: **Screen & System Audio Recording** (capture the window image) and **Accessibility** (read text). If appshots fail: update the app, check the hotkey, confirm your organization allows Appshots, then in **System Settings > Privacy & Security** check both permissions for Codex Computer Use and restart the app.
- Sensitive content is shared with ChatGPT; avoid appshotting it unless needed.
- Requires the desktop app. Resuming a chat in the CLI keeps existing appshots in history, but the CLI can't create new ones.
- For Google Docs, Gmail, Sheets, and Slides ChatGPT may get only the visible screenshot; in Work or Codex a matching installed plugin can access the app content.
- Typical uses: share an API reference and ask for a script; share an email/calendar view for a draft; share a design/preview window for revisions; share an error or settings panel.
- Source: https://learn.chatgpt.com/docs/appshots (retrieved 2026-11-14).

## Related

- [Computer Use](./computer-use.md)
- [Browser](./browser.md)

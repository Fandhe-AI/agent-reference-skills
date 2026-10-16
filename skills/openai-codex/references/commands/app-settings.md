# ChatGPT desktop app settings

Sections of the desktop app Settings panel (open with Cmd+, on macOS, Ctrl+, on Windows, or `codex://settings`).

## Signature / Usage

```text
codex://settings
```

## Options / Props

| Section | What it controls |
|---------|------------------|
| General | Whether Enter sends prompts, or Cmd/Ctrl+Enter is required for multiline prompts or every prompt. On macOS and Linux, **Prevent sleep while running**. **Follow-up behavior**: a message sent while ChatGPT works steers the current run or waits for the next run. |
| Profile | Activity insights, lifetime and peak tokens, streaks, longest task, token activity; profile picture, display name, username; profile card (sharing on consumer ChatGPT plans); **Invite a friend** / **Invite a coworker** for eligible plans. |
| Keyboard shortcuts | Review commands, change bindings, reset to defaults; search by command name or by keystroke. |
| Notifications | When turn-completion notifications appear and whether to prompt for notification permissions. |
| Appearance | Base theme, accent / background / foreground colors, UI and code fonts; share a custom theme. |
| Pets | Built-in or custom pet; `/pet`, **Show pet**, **Hide pet**; **Mini** keeps chat controls visible without a pet. |
| Browser | Install or enable the bundled Browser plugin, set up the browser extension; **Agent permissions** (Browse, Download, Upload) with **Requires approval**, **Always allow**, **Block**, plus per-site exceptions. Organizations can restrict these controls. |
| Computer Use | Review desktop-app access after setup; on macOS revoke system-level access via Screen Recording or Accessibility in Privacy & Security. |
| Personalization | Edit personal instructions in `AGENTS.md` for the selected machine. |
| Suggested prompts | Context-aware follow-ups and tasks to resume. |
| Memories | **Enable Codex memories** (where available) under Personalization. |
| Archived chats | Archived chats with dates and project context; **Unarchive** to restore. |

## Notes

- Removing a site's custom browser permissions resets them to the defaults.
- To keep a chat near your work, pop an active chat out into a separate window; **Always on top** keeps it visible over other apps.
- Source: https://learn.chatgpt.com/docs/reference/settings (fetched 2026-10).

## Related

- [app-commands.md](./app-commands.md)
- [ide-settings.md](./ide-settings.md)

# Pets

Pets are optional animated companions for following work. They change appearance only, not how ChatGPT completes tasks.

## Signature / Usage

```text
/pet
```

In the desktop app, enter `/pet` (or select **Show pet** in the command menu) to show the floating pet; enter it again to hide. In the CLI, `/pets` or `/pet` opens the picker.

## Options / Props

### Pet status

| Status | Meaning |
|--------|---------|
| Running | A chat is actively working. |
| Needs input | A chat needs your approval, answer, or another decision. |
| Ready | A chat has completed and has unread activity. |
| Blocked | A chat failed or encountered a system error. |

With several active chats, priority is Needs input, then Blocked, Ready, Running.

### By surface

| Surface | Details |
|---------|---------|
| Desktop app (macOS, Windows) | Floating pet above other windows with chat controls (pencil to start a chat, bell for thread activity, voice icon). Choose via profile menu **Pets** or **Settings > Pets**; **Mini** shows controls without a pet; **Create pet** for custom; **Customize** > **Pet size**. Show pet shortcut: Option+Space (macOS), Windows+Alt+P (Windows), changeable in **Settings > Keyboard shortcuts**. |
| Web | **Settings > Personalization > Pet > Select pet** (or **Default** for none). Appears in supported ChatGPT Work chats; no floating overlay, activity tray, or `/pet`. **Upload pet**: transparent PNG or WebP, exactly 1536 x 1872 pixels, at most 20 MiB. |
| CLI | `/pets` or `/pet` opens picker; `/pets <name>` chooses; `/pets off` disables. Per-session activity only. Needs iTerm2 3.6+ or a terminal with Kitty graphics or Sixel; unavailable in tmux and Zellij. |
| IDE extension | No pet picker or overlay. |

## Notes

- Chats started from the pet's controls are outside any project; use `@` for context and `$` to pick a skill.
- Custom pet creation: **Settings > Pets > Create pet** installs the bundled `hatch-pet` skill and opens a chat; describe the pet, then **Refresh** and select it. Custom pets are stored locally and don't sync to ChatGPT web.
- On macOS, pressing both Command keys takes an Appshot sent to the pet (requires **Appshot destination** set to **Automatic** and Appshots permissions); the Computer Use picture-in-picture window can attach to the pet.
- Pets respect the OS reduced-motion setting and show a still frame.
- The activity tray is separate from system notifications. If controls are missing, update the app and check whether your workspace allows pets.
- Source: https://learn.chatgpt.com/docs/pets (retrieved 2026-11-14).

## Related

- [Notifications](../getting-started/notifications.md)
- [Long-running work](./long-running-work.md)
- [Computer Use](./computer-use.md)
- [Voice](./voice.md)

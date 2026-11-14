# Notifications

Notifications tell you when work needs attention; controls and delivery channels vary by surface.

## Signature / Usage

```text
Settings > Notifications
```

Web: manage categories and channels there. Other surfaces are listed below.

## Options / Props

| Surface | How to configure |
|---------|------------------|
| Desktop app | **Settings**: turn-completion alerts appear never, only while ChatGPT is in the background, or always; separate toggles for permission and question notifications. The OS may ask for notification permission. |
| Web | **Settings > Notifications**: categories and channels (push, email, or SMS depending on category and account). **Manage tasks** opens **Scheduled**. |
| CLI | The TUI can emit a notification, and Codex can run an external program when a turn completes; see Notifications in the advanced configuration guide. |
| IDE extension | No separate controls; keep the chat open. To run an external program when a turn completes, configure `notify` on the connected Codex host. |

### Activity view (desktop app)

- When **Activity** is available, select the bell in the sidebar to see chats that are unread, running, or waiting for your response.
- Toggle with Cmd+Option+U (macOS) or Ctrl+Alt+U (Windows).
- Filter options can include **Work**, **Chat**, **Pinned**, **Scheduled**; **Mark all as read** clears unread items.

### Pet status

A floating pet can show a chat as **Running**, **Needs input**, **Ready**, or **Blocked** (see Pets).

## Notes

- Notification controls differ per surface; the IDE extension has none of its own.
- Source: https://learn.chatgpt.com/docs/notifications (retrieved 2026-11-14).

## Related

- [Pets](../extend/pets.md)
- [Long-running work](../extend/long-running-work.md)
- [Automations](../extend/automations.md)

---
source: https://opencode.ai/docs/build/plugins/gui/#notifications
---

# Notifications

`ctx.attention.notify` gets the user's attention while they look elsewhere: a system notification and a sound.

## Signature / Usage

`ctx.attention.notify` gets the user's attention while they look elsewhere: a system notification and a sound, with
the same rules as the app's own notifications.

```ts
const session = ctx.sessions.current()

if (session) {
  void ctx.attention.notify({
    title: ctx.t("tests.done"),
    message: ctx.t("tests.summary", { failed: 0 }),
    session: { server: session.server.id, id: session.id },
    id: run.id,
  })
}
```

- The system notification shows only while no app window has focus. The sound plays either way.
- Both follow **Settings > Notifications**. `variant: "default"` follows the **Agent** rows, and `variant: "error"` the
  **Errors** rows. Desktop notifications for both are off by default; their sounds are on.
- `sound: false` never plays a sound.
- Clicking the notification brings the app forward and opens `session`, when you give one.
- Each app window runs its own copy of your plugin. Pass an `id` of the event, such as a run's id, so only the first
  window to send it notifies and plays the sound. Without `id`, every call notifies.
- Before the app interface mounts, `notify` waits for it.

`notify` never rejects. It resolves what it did: `notification` is `true` when the app asked the system to show the
notification, and `sound` is `true` when the sound started.

```ts
const result = await ctx.attention.notify({ title: ctx.t("deploy.failed"), variant: "error" })

if (!result.notification) ctx.toast.show({ variant: "error", title: ctx.t("deploy.failed") })
```

- `notification` is `false` when the user turned it off, an app window has focus, or another window already sent
  `id`. The system can still hide a notification the app asked it to show, for example when the user denied a
  browser's permission.

#### Reference

```ts
interface Attention {
  notify(options: NotifyOptions): Promise<NotifyResult>
}

interface NotifyOptions {
  title: string
  message?: string
  variant?: "default" | "error"
  session?: { server: string; id: string }
  sound?: boolean
  id?: string
}

interface NotifyResult {
  notification: boolean
  sound: boolean
}
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Toasts](./toasts.md)

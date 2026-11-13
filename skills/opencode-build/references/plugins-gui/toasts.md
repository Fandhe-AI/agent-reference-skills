---
source: https://opencode.ai/docs/build/plugins/gui/#toasts
---

# Toasts

`ctx.toast.show` shows a short message in the corner of the window and returns a handle whose `dismiss()` closes it.

## Signature / Usage

```ts
ctx.toast.show({ variant: "success", title: ctx.t("invite.copied") })
```

- `variant` is `"default"`, `"success"`, `"error"`, or `"loading"`. A `success` toast shows a check icon unless you set
  `icon`.
- `duration` is how long the toast shows, in milliseconds. It defaults to 5 seconds.
- `persistent: true` keeps the toast until the user or `dismiss()` closes it, and ignores `duration`.
- A toast equal to one still showing replaces it instead of stacking a copy.
- Your plugin's toasts close when it stops, so no button outlives the code it runs. A toast does not close with the
  component or `createKeyed` run that showed it.

Show a `loading` toast while work runs, and dismiss it when the work ends:

Adapted (not in the official docs): the official example calls `saving.dismiss()` only after `save()` resolves; `try` / `finally` also closes the persistent toast when `save()` rejects.

```ts
const saving = ctx.toast.show({ variant: "loading", title: ctx.t("saving"), persistent: true })
try {
  await save()
} finally {
  saving.dismiss()
}
```

`actions` adds buttons. A click runs the action and closes the toast:

```ts
ctx.toast.show({
  variant: "error",
  title: ctx.t("sync.failed"),
  actions: [{ label: ctx.t("retry"), run: () => void sync() }],
})
```

#### Reference

```ts
interface Toasts {
  show(options: ToastOptions): ToastHandle
}

interface ToastHandle {
  dismiss(): void
}

interface ToastOptions {
  title: string
  description?: string
  variant?: "default" | "success" | "error" | "loading"
  icon?: IconName
  duration?: number
  persistent?: boolean
  actions?: ToastAction[]
}

interface ToastAction {
  label: string
  run(): void
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| variant | "default" \| "success" \| "error" \| "loading" | — | A `success` toast shows a check icon unless `icon` is set. |
| duration | number | 5 seconds | How long the toast shows, in milliseconds. |
| persistent | boolean | — | Keeps the toast until the user or `dismiss()` closes it; ignores `duration`. |
| actions | ToastAction[] | — | Adds buttons; a click runs the action and closes the toast. |

## Notes

- Adapted from the official docs: the `loading` toast example wraps `save()` in `try` / `finally` so the persistent toast closes on failure too.
- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Notifications](./notifications.md)
- [Dialogs](./dialogs.md)

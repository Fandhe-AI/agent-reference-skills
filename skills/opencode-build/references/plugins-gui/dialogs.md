---
source: https://opencode.ai/docs/build/plugins/gui/#dialogs
---

# Dialogs

`ctx.dialogs` opens dialogs and asks the user with `confirm`, `alert`, `prompt`, and `select`.

## Signature / Usage

### Dialogs

`ctx.dialogs.open(render, { replace? })` opens a dialog above the open ones and returns a handle whose `close()` closes
it. The dialog also closes when its owning scope ends.

```tsx
const handle = ctx.dialogs.open((dialog) => <ConfirmDialog onDone={dialog.close} />)
```

- `replace: true` closes every open dialog first, including the host's and other plugins' dialogs.
- `ctx.dialogs.active()` is `true` while any dialog is open.
- Render the content in `ctx.ui.Dialog` for the app's dialog frame; see [App components](./ui-components.md).

### Ask the user

`confirm`, `alert`, `prompt`, and `select` ask in the app's own dialogs, so your plugin needs no dialog UI of its own.
Each returns a promise of the answer.

```ts
const ok = await ctx.dialogs.confirm({ title: ctx.t("end.title"), confirm: ctx.t("end"), danger: true })
```

- `confirm` resolves `true` only when the user confirms. `danger` styles the confirm button as destructive and starts
  focus on Cancel.
- Each dialog opens as `open` does, and closes with the owner that asked, else with your plugin.
- Cancelling, pressing Escape, clicking outside, a replacing dialog, or the owner ending resolves `false` from `confirm`
  and `undefined` from `prompt` and `select`.

`alert` tells the user something they must acknowledge, with one button. It resolves once the dialog closes, however it
closes:

```ts
await ctx.dialogs.alert({ title: ctx.t("export.done"), description: path })
```

`prompt` asks for one line of text. Its initial `value` is selected, so typing replaces it. It never resolves an empty
string: submitting does nothing while the field is empty. `secret: true` hides what the user types, for a password or a
token:

```ts
const token = await ctx.dialogs.prompt({ title: ctx.t("token.title"), placeholder: "ghp_…", secret: true })
```

`select` lists options in a searchable list, like the command palette, and resolves the picked option's `value`:

```ts
const url = await ctx.dialogs.select({
  title: ctx.t("links.title"),
  options: links.map((link) => ({ title: link.title, description: link.url, value: link.url, group: link.host })),
})

if (url) ctx.system.openExternal(url)
```

- Search matches each option's `title` and `description`.
- Options with the same `group` list together under that heading.
- `current` is the value of the option to highlight first.

#### Reference

```ts
interface Dialogs {
  open(render: (dialog: DialogHandle) => JSX.Element, options?: { replace?: boolean }): DialogHandle
  confirm(options: ConfirmOptions): Promise<boolean>
  alert(options: AlertOptions): Promise<void>
  prompt(options: PromptOptions): Promise<string | undefined>
  select<T>(options: SelectOptions<T>): Promise<T | undefined>
  active(): boolean
}

interface DialogHandle {
  close(): void
}

interface ConfirmOptions {
  title: string
  description?: string
  confirm?: string
  cancel?: string
  danger?: boolean
}

interface AlertOptions {
  title: string
  description?: string
  ok?: string
}

interface PromptOptions {
  title: string
  description?: string
  placeholder?: string
  value?: string
  secret?: boolean
  submit?: string
}

interface SelectOptions<T> {
  title: string
  placeholder?: string
  options: { title: string; value: T; description?: string; group?: string }[]
  current?: T
}
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [App components](./ui-components.md)
- [Toasts](./toasts.md)

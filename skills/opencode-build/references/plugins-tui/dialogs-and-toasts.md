---
source: https://opencode.ai/docs/build/plugins/cli/#dialogs-and-toasts
---

# Dialogs and toasts

Use promise-based dialogs for alerts, confirmations, text input, and selection.

## Signature / Usage

Use promise-based dialogs for alerts, confirmations, text input, and selection.

```ts
await context.ui.dialog.alert({ title: "Acme", message: "Ready" })
const confirmed = await context.ui.dialog.confirm({
  title: "Continue?",
  message: "Run the Acme action?",
  label: { confirm: "Run", cancel: "Cancel" },
})
const name = await context.ui.dialog.prompt({ title: "Name", placeholder: "release" })
const mode = await context.ui.dialog.select({
  title: "Mode",
  current: "safe",
  options: [
    { title: "Safe", value: "safe", description: "Ask before changes" },
    { title: "Fast", value: "fast", disabled: false, category: "Advanced" },
  ],
})
```

### Select search

Pass `search` to own matching and result order. It runs for every query, including the empty one, and receives only enabled options. Results are listed in the returned order, with each category shown inline.

```ts
const project = await context.ui.dialog.select({
  title: "Projects",
  options: [
    { title: "Alpha", value: "alpha", category: "Recent" },
    { title: "Beta", value: "beta", category: "Pinned" },
  ],
  search: (query, options) =>
    options
      .filter((option) => option.title.toLowerCase().includes(query.toLowerCase()))
      .toSorted((left, right) => right.title.localeCompare(left.title)),
})
```

### Select actions

Actions appear in the footer and run from their keyboard binding, a click, or Tab focus followed by Enter. By default they receive the selected value and are unavailable without a selection. Use `selection: "none"` for actions that need no selection.

```ts
await context.ui.dialog.select({
  title: "Projects",
  options: [{ title: "Alpha", value: "alpha" }],
  actions: [
    { bind: "ctrl+o", title: "Inspect", onTrigger: (value) => context.ui.toast.show({ message: value }) },
    { bind: "ctrl+a", title: "Close", side: "right", selection: "none", onTrigger: () => context.ui.dialog.clear() },
  ],
})
```

- An action does not close the dialog or settle the promise.
- Enter or clicking an option resolves the selected value.
- Escape, `clear()`, or showing another dialog resolves `undefined`.
- Do not bind `ctrl+n` or `ctrl+p`. The dialog reserves them for navigation, and its own bindings take precedence.

### Custom dialogs and toasts

Custom JSX dialogs can set their size and close themselves.

```tsx
context.ui.dialog.set({ size: "large", centered: true })
context.ui.dialog.show(
  () => (
    <box>
      <text>Acme</text>
    </box>
  ),
  () => console.log("closed"),
)
context.ui.dialog.clear()
```

Toasts support title, message, variant, and duration.

```ts
context.ui.toast.show({
  title: "Acme",
  message: "Saved",
  variant: "success",
  duration: 3000,
})
```

## Notes

- OpenCode plugins and keybinds are distinct from Claude Code (anthropic-claude-code / anthropic-claude-code-extend).
- Do not bind `ctrl+n` or `ctrl+p` in select actions; the dialog reserves them for navigation.

## Related

- [attention.md](./attention.md)
- [commands-and-keymaps.md](./commands-and-keymaps.md)

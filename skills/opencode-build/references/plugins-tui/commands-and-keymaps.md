---
source: https://opencode.ai/docs/build/plugins/cli/#commands-and-keymaps
---

# Commands and keymaps

Register palette, slash, and keyboard commands in a reactive keymap layer.

## Signature / Usage

Register palette, slash, and keyboard commands in a reactive keymap layer.

```ts
context.keymap.layer(() => ({
  mode: "global",
  priority: 10,
  commands: [
    {
      id: "acme.status",
      title: "Show Acme status",
      group: "Acme",
      bind: "ctrl+g",
      palette: true,
      slash: { name: "acme", aliases: ["status"], arguments: true },
      enabled: () => true,
      suggested: true,
      run: async (input) => context.ui.toast.show({ message: input ?? "Ready" }),
    },
  ],
  bindings: ["acme.status"],
}))
```

Call `layer` from `setup`, including after an `await`, or from a component. Each layer is removed at the first of these:

- The plugin is disabled, reloaded, or fails setup.
- The component or reactive computation that created it, such as a slot, route, or dialog, is disposed.

The layer factory must be pure. OpenCode evaluates it once without dependency tracking to validate the initial command shape, then reactively. Initial command-shape errors, such as a palette command without an ID, throw from `layer()`. OpenTUI handles binding-parse errors. Errors from later reactive updates follow Solid's error handling.

```ts
async setup(context) {
  const settings = await loadSettings()
  context.keymap.layer(() => ({
    mode: "global",
    commands: [{ id: "acme.sync", title: "Sync Acme", palette: true, run: () => sync(settings) }],
  }))
}
```

A layer may target one OpenTUI renderable and can return `false` from a command to continue keyboard dispatch.

```ts
context.keymap.layer(() => ({
  target: () => panel,
  commands: [{ bind: "escape", run: (_input, event) => (event ? false : undefined) }],
}))
```

Dispatch commands, inspect shortcuts and command state, or push a temporary input mode.

```ts
context.keymap.dispatch("acme.status", "verbose")
const shortcuts = context.keymap.shortcuts("acme.status")
const commands = context.keymap.commands()
const pending = context.keymap.pending()
const active = context.keymap.active()
const currentMode = context.keymap.mode.current()
const popMode = context.keymap.mode.push("acme-search")
popMode()
```

## Notes

- OpenCode plugins, commands, and keybinds are distinct from Claude Code (anthropic-claude-code / anthropic-claude-code-extend / anthropic-claude-code-admin).
- The layer factory must be pure.

## Related

- [model.md](./model.md)
- [slots.md](./slots.md)
- [dialogs-and-toasts.md](./dialogs-and-toasts.md)

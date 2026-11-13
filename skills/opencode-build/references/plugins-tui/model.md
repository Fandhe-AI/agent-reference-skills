---
source: https://opencode.ai/docs/build/plugins/cli/#model
---

# Model

Read the prompt's selected model and change its variant.

## Signature / Usage

Read the prompt's selected model and change its variant. `current()` and `variant.list()` are reactive when read in a
Solid computation. A `variant` of `undefined` is the model default.

```ts
const selected = context.ui.model.current()
const variants = context.ui.model.variant.list()
context.ui.model.variant.set("high")
context.ui.model.variant.set(undefined)
```

`variant.set` returns `false` when no model is selected or the model has no such variant. Bind it to a command to
replace the built-in variant cycle, for example to skip the model default:

```ts
context.keymap.layer(() => ({
  commands: [
    {
      id: "acme.variant.cycle",
      title: "Cycle variants",
      bind: "tab",
      run() {
        const variants = context.ui.model.variant.list()
        if (variants.length === 0) return
        const index = variants.indexOf(context.ui.model.current()?.variant ?? "")
        context.ui.model.variant.set(variants[(index + 1) % variants.length])
      },
    },
  ],
}))
```

## Notes

- OpenCode plugins and keybinds are distinct from Claude Code (anthropic-claude-code / anthropic-claude-code-extend).

## Related

- [commands-and-keymaps.md](./commands-and-keymaps.md)
- [location-data.md](./location-data.md)

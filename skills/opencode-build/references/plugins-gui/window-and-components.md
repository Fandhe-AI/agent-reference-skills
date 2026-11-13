---
source: https://opencode.ai/docs/build/plugins/gui/#the-window
---

# The window and components

A plugin's `setup` runs in every desktop app window; inside Solid components `usePlugin()` returns the same context.

## Signature / Usage

### The window

A plugin's `setup` runs in every desktop app window. Pass it to `Plugin.define` from `@opencode/plugin/gui` in the
plugin's [`./gui-experimental` file](./define-plugin.md). `setup` is synchronous and may return a
cleanup function; see [Lifetimes and cleanup](./lifetimes.md).

```tsx title="src/gui.tsx"
import { Command, Plugin } from "@opencode/plugin/gui"

export default Plugin.define({
  i18n: { en: { open: "Open Acme" } },
  setup(ctx) {
    ctx.add(Command, () => ({
      id: "open",
      title: ctx.t("open"),
      run: () => ctx.system.openExternal("https://acme.example"),
    }))
  },
})
```

### Components

Inside Solid components, call `usePlugin<typeof definition>()` for the same context object that `setup` receives. Type
it from the declarations in their own file ([split across files](./define-plugin.md)), so the
component and the definition do not import each other.

```tsx title="src/gui/window.tsx"
import { Slot, usePlugin, type Plugin } from "@opencode/plugin/gui"
import type { definition } from "./definition"

function StatusLabel() {
  const ctx = usePlugin<typeof definition>()

  return <span>{ctx.t("title")}</span>
}

export const setup: Plugin.Setup<typeof definition> = (ctx) => {
  ctx.add(Slot, { at: "window.bottom", render: () => <StatusLabel /> })
}
```

`usePlugin` throws outside a plugin contribution. In a component that another plugin renders, it returns that plugin's
context, so wrap a component you provide on a contract with `bindPlugin`; see [Contracts](./contracts-and-tokens.md).

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Registries](./registries.md)
- [Lifetimes and cleanup](./lifetimes.md)

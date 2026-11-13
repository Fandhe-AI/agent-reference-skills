---
source: https://opencode.ai/docs/build/plugins/gui/
---

# GUI

Build the GUI part of an OpenCode plugin for OpenCode Desktop with `@opencode/plugin/gui`.

## Signature / Usage

A GUI plugin adds panels, commands, settings pages, and native integrations to OpenCode Desktop with the GUI plugin SDK,
`@opencode/plugin/gui`. It is the `./gui-experimental` part of a [plugin package](https://opencode.ai/docs/build/plugins/), alone or beside a
[server part](https://opencode.ai/docs/build/plugins/server/) and a [TUI part](https://opencode.ai/docs/build/plugins/cli/).

The `./gui-experimental` file default-exports `Plugin.define`, like the server and TUI parts:

```tsx title="src/gui.tsx"
import { Command, Plugin } from "@opencode/plugin/gui"
import { Acme } from "./rpc"

export default Plugin.define({
  i18n: { en: { "command.open": "Open Acme" } },
  setup(ctx) {
    ctx.add(Command, () => ({
      id: "open",
      title: ctx.t("command.open"),
      run: () => void ctx.client.rpc(Acme).open({}),
    }))
  },
  main(ctx) {
    ctx.log.write("info", "acme started")
  },
})
```

A GUI plugin can run in two processes:

- **`setup`** runs in every desktop app window. It contributes panels, commands, settings pages, slots, server sources,
  link handlers, and styles. See [The window](./window-and-components.md).
- **`main`** runs once, in the Electron main process. It provides typed `Ipc` contracts, native menu items,
  `WebContentsView` embeds, and Node and Electron integrations. See [The main process](./main-process.md).

## Notes

- The GUI plugin API is experimental and may change between releases. The `-experimental` export name says so in your package.
- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Package](./package.md)
- [Build the bundle](./build-bundle.md)
- [Define the GUI plugin](./define-plugin.md)

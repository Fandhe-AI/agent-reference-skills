---
source: https://opencode.ai/docs/build/plugins/gui/#the-main-process
---

# The main process

On OpenCode Desktop, a plugin's `main` setup runs once in the Electron main process as an app-wide singleton.

## Signature / Usage

On OpenCode Desktop, a plugin's `main` setup runs once in the Electron main process as an app-wide singleton. It has
full access to Node.js built-ins, `electron`, and the main host APIs. Pass it to `Plugin.define` in the plugin's
[`./gui-experimental` file](./define-plugin.md), beside the window `setup` or on its own.

```tsx title="src/gui.tsx"
import { Schema } from "effect"
import { powerSaveBlocker } from "electron"
import { Plugin } from "@opencode/plugin/gui"
import { KeepAwake } from "./gui/contract"

export default Plugin.define({
  main(ctx) {
    const stored = ctx.storage.store("keepScreenActive", { schema: Schema.Boolean, initial: false })
    let blockerId: number | undefined

    const release = () => {
      if (blockerId === undefined) return
      powerSaveBlocker.stop(blockerId)
      blockerId = undefined
    }

    const setActive = (enabled: boolean) => {
      if (enabled && blockerId === undefined) blockerId = powerSaveBlocker.start("prevent-display-sleep")
      if (!enabled) release()
      stored.set(enabled)
    }

    if (stored.value) setActive(true)

    ctx.provide(KeepAwake, {
      screenActive: () => blockerId !== undefined && powerSaveBlocker.isStarted(blockerId),
      setScreenActive: (enabled) => setActive(enabled),
    })

    return release
  },
})
```

In a window, `electron` is an inert placeholder, so the import is safe in the shared `./gui-experimental` file. See
[One file, two processes](./package.md).

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).
- `main` runs with full Node.js and Electron privileges. Validate every value that arrives from a window before passing it to shell, file system, or `openExternal` calls.

## Related

- [Main context](./main-context.md)
- [Define and provide an Ipc](./ipc.md)

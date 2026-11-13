---
source: https://opencode.ai/docs/build/plugins/gui/
---

# GUI Plugin Command

Register a command in OpenCode Desktop from the `./gui-experimental` part and call the server part over RPC.

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

Build the single CommonJS bundle with the Vite preset:

```ts title="vite.config.ts"
import { defineConfig } from "vite"
import { gui } from "@opencode/plugin/gui/vite"

export default defineConfig({ plugins: [gui()] })
```

## Notes

- The GUI plugin API is experimental; the export name `./gui-experimental` says so.
- `setup` runs in every desktop window; `main` runs once in the Electron main process. Keep each process's code in its own function.
- The host publishes the command as `<plugin id>.<command id>`.
- The desktop app reads plugins only from `opencode.json(c)`, not `cli.json`.
- This sample assumes an `Acme` RPC contract exposing an `open` method (see the RPC sample).

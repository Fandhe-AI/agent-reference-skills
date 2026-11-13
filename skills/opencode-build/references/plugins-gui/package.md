---
source: https://opencode.ai/docs/build/plugins/gui/#package
---

# Package

Ship the GUI as one `./gui-experimental` export of a plugin package; one file is evaluated by two processes.

## Signature / Usage

A plugin package can ship server, TUI, and GUI code from one npm package. Add one `./gui-experimental` export beside
`./tui`, and OpenCode Desktop loads it for each plugin on its own background server.

```json title="package.json"
{
  "name": "opencode-acme-plugin",
  "type": "module",
  "exports": {
    ".": "./src/index.ts",
    "./tui": "./src/tui.tsx",
    "./gui-experimental": "./dist/gui-experimental.cjs"
  },
  "dependencies": {
    "@opencode/plugin": "latest"
  },
  "devDependencies": {
    "solid-js": "^1.9.0",
    "vite": "^7.0.0",
    "vite-plugin-solid": "^2.11.0"
  }
}
```

Users install it like any other plugin; there is no separate GUI install step.

```jsonc title="opencode.jsonc"
{
  "plugins": ["opencode-acme-plugin"],
}
```

The GUI declares no id: it takes the plugin's, the server part's `id` or, for a package without a server part, the
package name (a local directory without a `name` uses the directory name). Read it as `ctx.id`.

### One file, two processes

Each process evaluates the whole `./gui-experimental` file and reads its default export. Windows run `setup`, and the
desktop app's main process runs `main`.

Adapted (not in the official docs): `main` passes the `Cleanup` returned by `ctx.windows.on` to `ctx.onCleanup`.

```tsx title="src/gui.tsx"
import { shell } from "electron"
import { Plugin } from "@opencode/plugin/gui"

export default Plugin.define({
  setup(ctx) {
    // Window code: Solid components, ctx.layout, ctx.add(Command, …).
  },
  main(ctx) {
    // Main code: electron, Node built-ins, ctx.windows.
    ctx.onCleanup(ctx.windows.on("open", () => shell.beep()))
  },
})
```

Because both processes evaluate the same file, each one stands in inert placeholders for the other process's modules:

- **In a window,** `electron` and Node built-ins are inert placeholders.
- **In the main process,** Solid and the window-only modules are inert placeholders.

A placeholder accepts any property read, call, or construction at module scope, such as Solid's hoisted templates or a
bundler's hoisted `require` calls. Keep each process's code inside its own setup: code that runs in the wrong process
gets placeholders instead of working values.

`Plugin.define` and the contract helpers come from one SDK in both processes. In the main process,
`@opencode/plugin/gui` resolves to the main SDK, which exports the same `Plugin`, `Store`, `Ipc`, `Contract`, and
`Registry`. One definition serves both processes. Its window-only exports, such as `Command`, `bindPlugin`, and
`createKeyed`, are `undefined` in the main process, so use them only inside `setup`.

## Notes

- Adapted from the official docs: the `main` example passes the `Cleanup` returned by `ctx.windows.on` to `ctx.onCleanup`, so the handler is removed when the plugin is disabled or reloaded.
- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Build the bundle](./build-bundle.md)
- [Loading and reload](./loading-and-reload.md)

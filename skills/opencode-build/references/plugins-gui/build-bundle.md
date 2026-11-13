---
source: https://opencode.ai/docs/build/plugins/gui/#build-the-bundle
---

# Build the bundle

`./gui-experimental` must be one prebuilt CommonJS file, built with the Vite preset `@opencode/plugin/gui/vite`.

## Signature / Usage

`./gui-experimental` must be one prebuilt CommonJS file. Build it with the Vite preset from `@opencode/plugin/gui/vite`:

```ts title="vite.config.ts"
import { defineConfig } from "vite"
import { gui } from "@opencode/plugin/gui/vite"

export default defineConfig({ plugins: [gui()] })
```

```bash
vite build
```

The preset does the following:

- Compiles Solid JSX with `vite-plugin-solid`.
- Emits one CommonJS file and inlines every dynamic `import()`, because the app cannot load a second chunk.
- Keeps the app's [shared modules](#shared-modules), Electron, and Node built-ins external, and bundles every other
  dependency.
- Fails the build on any other `effect/*`, `solid-js/*`, or `@opencode/*` module. The app does not provide it, and a
  bundled copy would not share the app's instance.

```text
effect/Schema is not a module the OpenCode app provides to plugin GUIs: effect, @opencode/plugin/gui, …
```

Import from the shared entry instead, for example `import { Schema } from "effect"`.

### Preset options

Pass options to `gui()` to change the entry or the output file.

```ts title="vite.config.ts"
export default defineConfig({ plugins: [gui({ entry: "src/desktop.tsx", outFile: "dist/desktop.cjs" })] })
```

- `entry` is the file that default-exports `Plugin.define`. It defaults to `src/gui.tsx`.
- `outFile` is the bundle that the `./gui-experimental` export points to. It defaults to `dist/gui-experimental.cjs`.

#### Reference

```ts
function gui(options?: GuiOptions): Plugin[]

interface GuiOptions {
  entry?: string
  outFile?: string
}
```

### Dependencies

Add the build tools as devDependencies. The app provides `@opencode/plugin/gui` at runtime, so the bundle only needs its
types from the `@opencode/plugin` dependency.

```bash
bun add -d vite vite-plugin-solid solid-js
```

For the Electron and Node types in `main`, also add `electron` and `@types/node`:

```bash
bun add -d electron @types/node
```

### Shared modules

Each process provides these modules to the bundle. Requiring a module that neither process provides fails the plugin's
GUI.

```ts
import { Schema } from "effect" // Both processes
import { createSignal } from "solid-js" // Windows; an inert placeholder in the main process
import { readFile } from "node:fs/promises" // The main process; an inert placeholder in windows
```

- **Both processes:** `effect`, `@opencode/plugin/gui`, `@opencode/plugin/gui/main`, `@opencode/plugin/rpc`,
  `@opencode/schema/rpc`, `@opencode/client`, and `@opencode/client/effect`.
- **Windows only:** `solid-js`, `solid-js/web`, `solid-js/store`, `@opencode/client/solid`, and
  `@opencode/plugin/gui/{file,review,browser}`. The main process gets inert placeholders.
- **Main process only:** `electron` and Node built-ins such as `node:fs`. Windows get inert placeholders.

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| entry | string | `src/gui.tsx` | The file that default-exports `Plugin.define`. |
| outFile | string | `dist/gui-experimental.cjs` | The bundle that the `./gui-experimental` export points to. |

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Package](./package.md)
- [Loading and reload](./loading-and-reload.md)

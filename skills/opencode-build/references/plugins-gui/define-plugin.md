---
source: https://opencode.ai/docs/build/plugins/gui/#define-the-gui-plugin
---

# Define the GUI plugin

`Plugin.define` declares the systems the plugin runs on, its stored window state, and its copy.

## Signature / Usage

`Plugin.define` declares the systems the plugin runs on, its stored window state, and its copy. The host reads these
declarations before either setup runs.

```ts title="src/gui/definition.ts"
import { Schema } from "effect"
import { Plugin, Store } from "@opencode/plugin/gui"

export const definition = Plugin.define({
  os: ["macos", "linux"],
  stores: {
    prefs: Store.global(Schema.Struct({ enabled: Schema.Boolean }), { enabled: true }),
  },
  i18n: {
    en: { title: "Acme", "command.open": "Open Acme" },
    de: { title: "Acme", "command.open": "Acme öffnen" },
  },
})
```

- The host gives the plugin its id, `ctx.id`: the server part's `id`, or the package name for a package without a
  server part (the directory name for a local directory without a `name`). It prefixes every id the plugin creates: commands (`<id>.<command>`), panel keys (`<id>:<tab>`), stored
  keys (`plugin.<id>.<key>`), and the ids of the [contracts and Ipcs](./contracts-and-tokens.md) it provides.
- `os` limits the plugin to some operating systems. Omit it to run on every OS. A plugin whose `os` leaves out this
  system does not run, and **Settings > Extensions > Plugins** keeps its row with "Not available on this system."
- `stores` declares [stored state](./stored-state.md) for windows. Read it as `ctx.stores.<key>`.
- `i18n` holds copy by locale. Write every locale inline; English fills every key a locale lacks. Read it with
  `ctx.t(key, params)` and `ctx.plural(key, count)`. In a window, `ctx.t` also reads the app's shared keys, such as `common.*`. In `main`, a missing key returns the key.
- Define `setup`, `main`, or both. A GUI without either fails to load.
- Without setups, `Plugin.define` returns the declarations as a `Plugin.Declarations`, so setups in other files can be
  typed from them. `Plugin.Definition` is the type of the full definition.
- A plugin does not declare the contracts it provides or uses. It provides and reads them at runtime; see
  [Contracts and tokens](./contracts-and-tokens.md).

#### Reference

```ts
interface Declarations {
  os?: ("macos" | "windows" | "linux")[]
  stores?: Record<string, StoreDeclaration>
  i18n?: { en: Messages; [locale: string]: Messages }
}

interface Definition extends Declarations {
  setup?(ctx: SetupContext<this>): Cleanup | void
  main?(ctx: MainContext): Cleanup | void | Promise<Cleanup | void>
}

type Messages = Record<string, string>

type Cleanup = () => void | Promise<void>
```

### Split across files

A small GUI plugin fits in `src/gui.tsx`. For a larger one, declare the plugin in `definition.ts`, put shared tokens in
`contract.ts`, write each setup in its own file, and combine them in `src/gui.tsx`.

```text
src/
├── index.ts            Server part: Plugin.define from @opencode/plugin
├── rpc.ts              RPC contract between the server part and its clients
├── gui.tsx             ./gui-experimental entry: export default Plugin.define({ ...definition, setup, main })
└── gui/
    ├── definition.ts   Plugin.define: os, stores, i18n
    ├── contract.ts     Tokens other code may import: Ipc, Contract, Registry
    ├── window.tsx      Window setup: Plugin.Setup<typeof definition>
    ├── main.ts         Main setup: Plugin.MainSetup (desktop only)
    ├── page.tsx        Components that panels and pages render
    └── i18n/en.ts      English copy
```

The whole `./gui-experimental` file evaluates when a window boots, so keep module scope and `setup` light. Register
contributions there and do expensive work inside components, `createKeyed`, or `createLatest`.

For a larger plugin, declare the plugin first, type each setup from the declarations, then define the plugin with them.

```ts title="src/gui/definition.ts"
import { Schema } from "effect"
import { Plugin, Store } from "@opencode/plugin/gui"

export const definition = Plugin.define({
  stores: { notes: Store.global(Schema.Struct({ count: Schema.Number }), { count: 0 }) },
})
```

```tsx title="src/gui/window.tsx"
import type { Plugin } from "@opencode/plugin/gui"
import { Notes } from "./contract"
import type { definition } from "./definition"

export const setup: Plugin.Setup<typeof definition> = (ctx) => {
  ctx.provide(Notes, { count: () => ctx.stores.notes.value.count })
}
```

```ts title="src/gui/main.ts"
import type { Plugin } from "@opencode/plugin/gui"

export const main: Plugin.MainSetup = (ctx) => {
  ctx.log.write("info", "acme started")
}
```

```tsx title="src/gui.tsx"
import { Plugin } from "@opencode/plugin/gui"
import { definition } from "./gui/definition"
import { main } from "./gui/main"
import { setup } from "./gui/window"

export default Plugin.define({ ...definition, setup, main })
```

- `Plugin.Setup<typeof definition>` is the type of a window setup. It types `ctx.stores` from the declared stores.
- `Plugin.MainSetup` is the type of a main setup, and `Plugin.Cleanup` the type of the cleanup function either setup
  may return.
- Import registries, tokens, and helpers such as `Command`, `SettingsPage`, `Panel`, `Slot`, `Contract`, `Ipc`,
  `Registry`, `Store`, `createKeyed`, `usePlugin`, and `bindPlugin` from `@opencode/plugin/gui`.
- Import main-only registries such as `MenubarItem` from `@opencode/plugin/gui/main`.

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| os | ("macos" \| "windows" \| "linux")[] | all OSes | Limits the plugin to some operating systems. |
| stores | Record<string, StoreDeclaration> | — | Declares stored state for windows; read as `ctx.stores.<key>`. |
| i18n | { en: Messages; [locale: string]: Messages } | — | Copy by locale; English fills missing keys. |
| setup | (ctx: SetupContext) => Cleanup \| void | — | Window setup; synchronous. |
| main | (ctx: MainContext) => Cleanup \| void \| Promise | — | Main-process setup. |

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Shared context](./shared-context.md)
- [Stored state](./stored-state.md)
- [Contracts and tokens](./contracts-and-tokens.md)

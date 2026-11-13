---
source: https://opencode.ai/docs/build/plugins/gui/#contracts-and-tokens
---

# Contracts and tokens

Tokens let GUI plugins talk across processes and to each other without importing each other's runtime code.

## Signature / Usage

Tokens let GUI plugins talk across processes and to each other without importing each other's runtime code. Put every
token in `contract.ts`. A token holds only its kind and id, plus the schemas of an `Ipc`, so other plugins can import it
without your runtime code.

- `ctx.provide(token, impl)` provides one of your own tokens: a `Contract` from the window setup, or an `Ipc` from
  `main`.
- `ctx.use(token)` follows a contract or an `Ipc` that another plugin provides. It returns a
  [`Live`](./live-dependencies.md) accessor.
- `ctx.main(ipc)` returns a client for an `Ipc` that your own `main` provides.

A plugin provides only tokens whose id is its own id or starts with it, as `<id>.<name>`. `ctx.provide` throws for any
other id, and `ctx.main` throws for an `Ipc` outside your id. The examples on this page use the plugin id `acme`, so
their token ids start with `acme.`.

```ts
Contract.define<AcmeBadge, "acme.badge">("acme.badge") // Plugin acme can provide it.
Contract.define<AcmeBadge, "badge">("badge") // ctx.provide throws in plugin acme.
```

### Contracts

Use `Contract.define` when one plugin's window setup exposes an API or a Solid component to other plugins' window
setups.

```ts title="src/gui/contract.ts"
import type { JSX } from "solid-js"
import { Contract } from "@opencode/plugin/gui"

export interface AcmeBadge {
  Badge(props: { readonly label: string }): JSX.Element
  count(): number
}

export const AcmeBadge = Contract.define<AcmeBadge, "acme.badge">("acme.badge")
```

Provide it from the window setup with `ctx.provide`. When the contract holds a component, wrap it with `bindPlugin`
during setup. Then `usePlugin()` inside it reads the provider's context, not the consumer's.

```tsx title="src/gui.tsx"
import { bindPlugin, Plugin } from "@opencode/plugin/gui"
import { AcmeBadge } from "./gui/contract"

export default Plugin.define({
  i18n: { en: { title: "Acme" } },
  setup(ctx) {
    ctx.provide(AcmeBadge, {
      Badge: bindPlugin((props: { readonly label: string }) => (
        <span>
          {ctx.t("title")}: {props.label}
        </span>
      )),
      count: () => 42,
    })
  },
})
```

- Annotate the props of a component you wrap with `bindPlugin`, as in `bindPlugin((props: FileTreeProps) => ...)`.
  TypeScript cannot infer them inside `ctx.provide`.
- Leave data methods, such as `count`, unwrapped.
- `ctx.provide` returns a function that withdraws the contract early. The host also withdraws it with the current owner,
  else when the plugin stops.

### Use another plugin's contract

Export `contract.ts` from your package, for example as `./contract`, so other plugins can import its tokens. Another
plugin follows the contract with `ctx.use(token)`. The accessor's value changes as the provider starts, stops, and
restarts, so read it where you use it.

```tsx title="src/gui.tsx"
import { Plugin, Slot } from "@opencode/plugin/gui"
import { AcmeBadge } from "opencode-acme-plugin/contract"

export default Plugin.define({
  setup(ctx) {
    const badge = ctx.use(AcmeBadge)

    const count = () => {
      const live = badge()

      return live.status === "active" ? live.value.count() : 0
    }

    ctx.add(Slot, { at: "window.bottom", render: () => <span>{count()}</span> })
  },
})
```

- `ctx.use` returns the same accessor for every call with the token.
- The consumer keeps working while the provider is off. See
  [Live dependencies and failure handling](./live-dependencies.md).

### IPC between main and windows

Use `Ipc.define` with Effect `Schema` codecs to define a typed bridge between `main` and `setup`. `main` implements it
with `ctx.provide`, and the window calls it through `ctx.main`.

```ts title="src/gui/contract.ts"
import { Schema } from "effect"
import { Ipc } from "@opencode/plugin/gui"

export const KeepAwake = Ipc.define({
  id: "acme.awake",
  methods: {
    screenActive: { output: Schema.Boolean },
    setScreenActive: { input: Schema.Boolean },
  },
})
```

```ts
const awake = ctx.main(KeepAwake)

await awake.setScreenActive(true)
```

- Other plugins follow your `Ipc` with `ctx.use(KeepAwake)`, like a contract.
- See [Define and provide an Ipc](./ipc.md) for state, events, and the provider.

### Registries your plugin owns

Use `Registry.define` for a list your plugin owns. Other plugins contribute items with `ctx.add`, and your plugin reads
them with `ctx.list`.

```ts title="src/gui/contract.ts"
import { Registry } from "@opencode/plugin/gui"

export interface Exporter {
  readonly id: string
  readonly title: string
  run(text: string): void
}

export const Exporter = Registry.define<Exporter>("acme.exporter")
```

```tsx
// Another plugin contributes an item.
ctx.add(Exporter, () => ({ id: "gist", title: ctx.t("exporter.gist"), run: (text) => upload(text) }))

// The owner lists every contribution. Reactive: read it in render or in a memo.
const exporters = () => ctx.list(Exporter)
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Live dependencies and failure handling](./live-dependencies.md)
- [Define and provide an Ipc](./ipc.md)
- [Define the GUI plugin](./define-plugin.md)

---
source: https://opencode.ai/docs/build/plugins/gui/#stored-state
---

# Stored state

Declare stores in `Plugin.define({ stores })` with `Store.global` / `Store.session`, or open runtime stores with `ctx.storage`.

## Signature / Usage

Desktop windows load stored state over IPC, while the web reads `localStorage` at once. Declare stores in
`Plugin.define({ stores })`, so the host loads them for you.

- **`Store.global`** keeps one value for the app. It loads before `setup` runs, so `ctx.stores.name.value` is never
  `undefined`.
- **`Store.session`** keeps one value per session. It loads when the session mounts; `ctx.stores.name(session).value`
  is `undefined` until then.

Declared stores are for windows. `main` opens its state with `ctx.storage.store`, which reads synchronously; see
[Main context](./main-context.md).

Mutate a value in place with `update(draft => …)`, which must return nothing, or replace it with `set(next)`:

```ts
const enabled = ctx.stores.prefs.value.enabled

ctx.stores.prefs.update((draft) => {
  draft.enabled = !draft.enabled
})
```

- `ready()` is `true` once the value has loaded. Writes made before then wait and apply in call order.
- `from` names other stored keys to import the value from once, while the store holds none, such as the key of a
  store you renamed: `"plugin.acme.settings"`. Pass a list to try several keys, newest first. The other key keeps its
  copy until the store is removed.

```ts
stores: {
  prefs: Store.global(Prefs, { enabled: true }, ["plugin.acme.settings.v2", "plugin.acme.settings"]),
}
```

#### Reference

```ts
const Store: {
  global(schema: Schema, initial: T, from?: string | string[]): StoreDeclaration
  session(schema: Schema, initial: T, from?: string | string[]): StoreDeclaration
}

interface Persisted<T, V = T | undefined> {
  value: V
  ready(): boolean
  update(mutate: (draft: T) => undefined): void
  set(next: T): void
}
```

### Runtime stores

`ctx.storage.store(key, options)` opens a store for a key known only at runtime. `scope` keeps one value per server,
directory, or session.

```tsx
import { Schema } from "effect"
import { usePlugin, type MountedSession } from "@opencode/plugin/gui"
import type { definition } from "./definition"

function DraftView(props: { readonly session: MountedSession }) {
  const ctx = usePlugin<typeof definition>()

  const draft = ctx.storage.store("draft", {
    schema: Schema.Struct({ text: Schema.String }),
    initial: { text: "" },
    scope: { server: props.session.server.id, directory: props.session.directory },
  })

  return <p>{draft.value?.text}</p>
}
```

- `scope: "global"`, the default, keeps one value for the app.
- `scope: { server, directory? }` keeps one value per server, or per workspace directory on it.
- `scope: { session }` keeps one value per session, opened again when the session moves to a new directory.
- A runtime store's `value` is `undefined` until it loads.
- `ctx.storage.memory(key, { initial })` keeps window-local state that survives plugin reloads but not window reloads.
- `ctx.storage.remove(key, { scope, from })` deletes the value, so the key reads as `initial` again.

#### Reference

```ts
interface Storage {
  store(key: string, options: StoreOptions): Persisted<T>
  memory(key: string, options: { initial: T }): [Store<T>, (mutation: (draft: T) => void) => void]
  remove(key: string, options?: { scope?: StorageScope; from?: string | string[] }): void
}

interface StoreOptions {
  schema: Schema
  initial: T
  scope?: StorageScope
  from?: string | string[]
}

type StorageScope = "global" | { server: string; directory?: string } | { session: SessionRef }
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| schema | Schema | — | Schema of the stored value. |
| initial | T | — | Initial value. |
| scope | StorageScope | `"global"` | One value for the app, per server or directory, or per session. |
| from | string \| string[] | — | Other stored keys to import the value from once, newest first. |

## Notes

- The runtime store example reads `props.session` once when `DraftView` is created. If a panel stays mounted while its session changes, remount the component for each session so the store opens for the new scope.
- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Define the GUI plugin](./define-plugin.md)
- [Main context](./main-context.md)

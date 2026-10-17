---
source: https://v2.tauri.app/reference/javascript/store/
---

# @tauri-apps/plugin-store

Simple, persistent key-value store. A store is persisted to a file inside the application data directory and is shared with the Rust side of the application, which can read and write the same store through its own API.

## Signature / Usage

```ts
import { load } from '@tauri-apps/plugin-store';
const store = await load('store.json');
await store.set('some-key', { value: 5 });
const value = await store.get<{ value: number }>('some-key');
```

```ts
function load(path: string, options?: StoreOptions): Promise<Store>      // @since 2.1.0
function getStore(path: string): Promise<Store | null>                   // @since 2.1.0

class Store extends Resource implements IStore {                          // @since 2.0.0
  static load(path: string, options?: StoreOptions): Promise<Store>
  static get(path: string): Promise<Store | null>
  set(key: string, value: unknown): Promise<void>
  get<T>(key: string): Promise<T | undefined>
  has(key: string): Promise<boolean>
  delete(key: string): Promise<boolean>
  clear(): Promise<void>
  reset(): Promise<void>
  keys(): Promise<string[]>
  values<T>(): Promise<T[]>
  entries<T>(): Promise<Array<[key: string, value: T]>>
  length(): Promise<number>
  reload(options?: ReloadOptions): Promise<void>
  save(): Promise<void>
  onKeyChange<T>(key: string, cb: (value: T | undefined) => void): Promise<UnlistenFn>   // @since 2.0.0
  onChange<T>(cb: (key: string, value: T | undefined) => void): Promise<UnlistenFn>       // @since 2.0.0
  close(): Promise<void>
}

class LazyStore implements IStore {                                       // @since 2.1.0
  constructor(path: string, options?: StoreOptions)
  init(): Promise<void>
  // same IStore methods as Store, loading the store on first use
}

type StoreOptions = {
  defaults?: { [key: string]: unknown }
  autoSave?: boolean | number
  serializeFnName?: string
  deserializeFnName?: string
  createNew?: boolean
  overrideDefaults?: boolean
}
type ReloadOptions = { ignoreDefaults?: boolean }
```

## Options / Props

`StoreOptions`

| Name | Type | Description |
| --- | --- | --- |
| defaults | `{ [key: string]: unknown }` | Default value of the store. |
| autoSave | `boolean \| number` | Auto save on modification with debounce duration in milliseconds, 100ms by default; pass `false` to disable. |
| serializeFnName | `string` | Name of a serialize function registered in the rust side plugin builder. |
| deserializeFnName | `string` | Name of a deserialize function registered in the rust side plugin builder. |
| createNew | `boolean` | Force create a new store with default values even if it already exists. |
| overrideDefaults | `boolean` | When creating the store, override the store with the on-disk state if it exists, ignoring defaults. |

`ReloadOptions`

| Name | Type | Description |
| --- | --- | --- |
| ignoreDefaults | `boolean` | To fully match the store with the on-disk state, ignoring defaults. |

## Notes

- `load`: `path` is the path to save the store in `app_data_dir`. If the file does not exist yet, the store is created in memory with the configured defaults and the file is only written on the first save.
- `getStore` / `Store.get` return `null` if the store is not loaded; prefer `load` otherwise.
- `set` emits a change event for the key and, unless auto save is disabled, schedules a write to disk. `save()` cancels any pending auto save and writes exactly once.
- `clear()` removes all key-value pairs; use `reset()` to reset to the `defaults` (behaves like `clear` when no defaults are set).
- `reload()` loads the on-disk state and merges it with the current store; this behavior will change in v3 to reset to defaults first and then merge. Set `ignoreDefaults: true` to fully match the on-disk state. `reload` does not emit change events.
- `onKeyChange` / `onChange` callbacks are only invoked for changes made to this store instance; the value is `undefined` when the key was removed.
- `close()` cleans up the resource from memory; do not call any method on the object afterwards.
- `LazyStore` options are not applied if someone else already created the store.
- Tauri plugin for a persistent key-value file; not a database or cache service (see the upstash / drizzle skills).
- Tauri plugin guest-js binding (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Source: `plugins-workspace@store-v2.5.0` `plugins/store/guest-js/index.ts`

## Related

- [Store plugin](../plugins-core/store.md)

# Kit: Storage

Storage backends persist generated files in the filesystem, memory, or a custom destination. `createStorage`, `fsStorage`, and `memoryStorage` ship from `kubb/kit`.

## Signature / Usage

`createStorage` takes a builder function `(options: TOptions) => Storage` and returns a factory `(options?: TOptions) => Storage`.

```typescript
import { createStorage } from 'kubb/kit'

export const memoryStorage = createStorage(() => {
  const store = new Map<string, string>()
  return {
    name: 'memory',
    async readItem(key) {
      return store.get(key) ?? null
    },
    async writeItem(key, value) {
      store.set(key, value)
    },
    async removeItem(key) {
      store.delete(key)
    },
    async readKeys(base) {
      const keys = [...store.keys()]
      return base ? keys.filter((k) => k.startsWith(base)) : keys
    },
    async empty(base) {
      if (!base) return store.clear()
      for (const k of store.keys()) if (k.startsWith(base)) store.delete(k)
    },
  }
})
```

## `Storage` interface

| Method | Params | Returns | Purpose |
| --- | --- | --- | --- |
| `readItem()` | `key: string` | `Promise<string \| null>` | Retrieve an item's content |
| `writeItem()` | `key: string, value: string` | `Promise<void>` | Write an item |
| `removeItem()` | `key: string` | `Promise<void>` | Delete an item |
| `readKeys()` | `base?: string` | `Promise<string[]>` | List keys, optionally filtered by prefix |
| `empty()` | `base?: string` | `Promise<void>` | Delete all items, optionally scoped by prefix |

## Notes

- 出典: https://kubb.dev/docs/5.x/reference/kit/storage （kubb@5.11.0 の docs/5.x/reference/kit/storage.md）
- `fsStorage` is the default backend. It writes under `output.path` and creates directories as needed.
- `memoryStorage` writes nothing to disk, so it suits plugin tests, CI validation, and dry runs.
- Both go straight into the config's `storage` field.
- Omitting `base` on `empty()` is implementation-defined: `memoryStorage` wipes every entry, while `fsStorage` treats a missing `base` as a no-op and deletes nothing.
- Every method is required. `readItem` returns `null` for a missing key. Kubb can skip `writeItem` for a file whose content did not change, so do not expect one call per generated file.

## Related

- [Engine](./engine.md)
- [Testing](./testing.md)

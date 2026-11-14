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

| Member | Params | Returns | Purpose |
| --- | --- | --- | --- |
| `name` |  | `string` | Identifier for logs and diagnostics, such as `'fs'` or `'memory'`. Format, lint, and `postGenerate` run only when it is `'fs'` |
| `readItem()` | `key: string` | `Promise<string \| null>` | Retrieve an item's content |
| `writeItem()` | `key: string, value: string, options?: { stored?: string \| null }` | `Promise<void>` | Write an item. `stored` is the previous content when Kubb already read it, so a backend can skip a second read |
| `removeItem()` | `key: string` | `Promise<void>` | Delete an item |
| `readKeys()` | `base?: string` | `Promise<string[]>` | List keys, optionally filtered by prefix |
| `empty()` | `base?: string` | `Promise<void>` | Delete all items, optionally scoped by prefix |

## Notes

- Source: https://kubb.dev/docs/5.x/reference/kit/storage (docs/5.x/reference/kit/storage.md at kubb@5.20.0, retrieved 2026-11-14)
- Migration (5.11 → 5.20): `Storage` gains a required `name` member and `writeItem` takes an optional third argument `{ stored }` (docs diff 5.11 → 5.20). `kubbStorage`, the storage Kubb uses for its own files under `~/.kubb`, was reduced to `getItem`, `setItem` and `removeItem` in v5.13.0 (#4418, `unstorage` and `lru-cache` dropped).
- `fsStorage` is the default backend. It writes each file to its path on disk and creates directories as needed.
- `memoryStorage` writes nothing to disk, so it suits plugin tests, CI validation, and dry runs.
- Both go straight into the config's `storage` field.
- Omitting `base` on `empty()` is implementation-defined: `memoryStorage` wipes every entry, while `fsStorage` treats a missing `base` as a no-op and deletes nothing.
- Every member is required. `readItem` returns `null` for a missing key. Kubb skips `writeItem` for a file whose content did not change, so do not expect one call per generated file.
- `readKeys()` also differs per backend. `memoryStorage` returns the stored keys, which are absolute paths. `fsStorage` returns paths relative to `base`, and lists the current working directory when `base` is omitted.

## Related

- [Engine](./engine.md)

---
source: https://opencode.ai/docs/build/plugins/server/#storage
---

# Storage

Store, read, or remove durable JSON values scoped to the plugin.

## Signature / Usage

```ts
await ctx.storage.set("settings", { strict: true })
const settings = await ctx.storage.get("settings")
await ctx.storage.remove("settings")
```

Scan keys by prefix with optional cursor pagination.

```ts
const page = await ctx.storage.scan({ prefix: "cache/", limit: 100 })
const next = page.next
```

### Reference

```ts
interface StorageContext {
  get(key: string): Promise<Json | undefined>
  set(key: string, value: Json): Promise<void>
  remove(key: string): Promise<void>
  scan(options: StorageScanOptions): Promise<StorageScanResult>
}

interface StorageScanOptions {
  prefix: string
  after?: string
  limit?: number
}

interface StorageScanResult {
  entries: readonly { key: string; value: Json }[]
  next?: string
}
```

## Options / Props

`StorageScanOptions`:

| Name | Type | Description |
| --- | --- | --- |
| `prefix` | `string` | Key prefix to scan. |
| `after` | `string` (optional) | — |
| `limit` | `number` (optional) | — |

## Notes

- Plugin storage is scoped by the plugin `id`.

## Related

- [Lifecycle](./lifecycle.md)

# info

Returns index-level or database-level document counts and stats.

## Signature / Usage

```ts
// Index-level info
const index = client.index("movies")
const stats = await index.info()

// Database-level info
const dbStats = await client.info()
```

## Options / Props

**Index-level `info()` response:**

| Name | Type | Description |
|------|------|-------------|
| `documentCount` | `number` | Ready-to-use document count |
| `pendingDocumentCount` | `number` | Documents still processing |

**Database-level `info()` response adds:**

| Name | Type | Description |
|------|------|-------------|
| `diskSize` | `number` | Database size in bytes |
| `indexes` | `Record<string, IndexInfo>` | Per-index stats keyed by index name |

## Notes

- Database-level `info()` is useful for monitoring overall Search instance health and capacity

## Related

- [indexes.md](./indexes.md)
- [reset.md](./reset.md)

# info / reset

Index- and database-level statistics, and clearing all documents from an index.

## Signature / Usage

```ts
// Index-level info
const index = client.index("movies")
const stats = await index.info()

// Database-level info
const dbStats = await client.info()

// Clear all documents in an index
const responseReset = await index.reset()
// 'Success'
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

- `reset()` clears all documents in an index but does not delete the index itself
- Database-level `info()` is useful for monitoring overall Search instance health and capacity

## Related

- [indexes.md](./indexes.md)
- [delete.md](./delete.md)

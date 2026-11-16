---
source: https://docs.cloud.google.com/datastore/docs/concepts/limits
---

# Limits (Firestore in Datastore mode)

Production limits for Firestore in Datastore mode. The source states these values are subject to change.

## Signature / Usage

The limits page has no code. Snippet taken from https://docs.cloud.google.com/datastore/docs/concepts/indexes: a manual index configuration that keeps an entity with multi-valued `tags` and `collaborators` properties under the index entry limits (6 entries instead of 9 for an exploding index):

```yaml
indexes:
- kind: Task
  properties:
  - name: tags
  - name: created
- kind: Task
  properties:
  - name: collaborators
  - name: created
```

## Options / Props

### Firestore in Datastore mode limits

| Limit | Amount |
|---|---|
| Maximum number of databases per project | 100 (contact support to request an increase) |
| Maximum number of customer-managed encryption keys (CMEK) databases per project | 0 by default because the feature is behind an allowlist; request an increase with the CMEK access request form |
| Maximum API request size (applies when Datastore mode is used outside Google App Engine; from App Engine the limit depends on the client library) | 10 MiB |
| Maximum size for a transaction | 10 MiB |
| Maximum size for an entity | 1,048,572 bytes (1 MiB - 4 bytes) |
| Maximum number of property transformations on a single entity in a `Commit` operation or transaction (for array transforms like `"appendMissingElements"`, each array element counts) | 500 |
| Maximum size for an entity key | 6 KiB |
| Maximum depth of nested entity values | 20 |
| Maximum number of keys allowed for a `Lookup` operation | 1,000 |
| Maximum size of an indexed string property's UTF-8 encoding | 1,500 bytes |
| Maximum size for an unindexed property | 1,048,487 bytes (1 MiB - 89 bytes) |
| Maximum sum of the sizes of an entity's composite index entries | 2 MiB |
| Maximum number of composite indexes for a database | 200 without billing enabled; 1000 with billing enabled (contact support to request an increase) |
| Maximum sum, for an entity, of the number of indexed property values and the number of composite index entries | 20,000 |
| Maximum number of properties in a composite index | 2 MiB |
| Maximum total number of export and import requests for a project per minute | 20 |
| Maximum number of concurrent exports and imports | 50 |
| Maximum number of entity filters for export and import requests (each combination of filtered kind and namespace counts as a separate filter) | 100 |
| Maximum number of time-to-live (TTL) policies per database | 1000 |

The entity filter example from the source: a request with `kinds=['foo', 'bar']` and `namespace_ids=['', 'ns1']` results in 4 filters: `[('', 'foo'), ('', 'bar'), ('ns1', 'foo'), ('ns1', 'bar')]`.

### Legacy Cloud Datastore limits

These also apply if you have not yet upgraded from Datastore to Firestore in Datastore mode.

| Limit | Amount |
|---|---|
| Maximum number of entity groups that can be accessed in a transaction | 25 |
| Maximum rate of transactions reading from or writing to an entity group | 1 per sec |
| Maximum write rate to an entity group (writes can be batched for an entity group) | 1 per second |

## Notes

- Source inconsistency: the row "Maximum number of properties in a composite index" lists the amount `2 MiB`, which is a size unit, not a count. Kept verbatim.
- Index-related limits and the "Too many indexed properties" / "Index entries too large" errors are discussed in the indexes page.
- Source: https://docs.cloud.google.com/datastore/docs/concepts/limits (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/datastore/docs/concepts/indexes (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [indexes.md](./indexes.md)
- [transactions.md](./transactions.md)
- [errors.md](./errors.md)
- [overview.md](./overview.md)

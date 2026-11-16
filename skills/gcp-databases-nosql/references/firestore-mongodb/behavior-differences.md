---
source: https://docs.cloud.google.com/firestore/mongodb-compatibility/docs/behavior-differences
---

# Behavior differences

Behavioral differences between Firestore with MongoDB compatibility and MongoDB: connections, naming, documents, values, queries, aggregations, writes, transactions, concerns, indexes and per-command unsupported fields.

## Signature / Usage

### Connection string must disable retryable writes

Snippet taken from https://docs.cloud.google.com/firestore/mongodb-compatibility/docs/connect (this page has no code).

```text
mongodb://UID.LOCATION.firestore.goog:443/DATABASE_ID?loadBalanced=true&tls=true&retryWrites=false
```

## Options / Props

### Limits and rules

| Area | Behavior |
| --- | --- |
| Connections | Each connection is limited to a single database; the database must exist before connecting |
| Collection / field names | Names matching `__.*__` are not supported; empty field names are not supported |
| Document size | Maximum 16 MiB |
| Nesting depth | Maximum 20; each Array and Object field adds one level |
| Eventarc | Documents larger than 10 MiB are not included in the event payload |
| `_id` | Top-level `_id` must be ObjectId, String, 64-bit integer, 32-bit integer, Double, Binary, or Object (this page); the data types page also lists Boolean (see Notes) |
| Unsupported BSON | JavaScript, Symbol, DBPointer, Undefined |
| Date | Must be within `[0001-01-01T00:00:00Z, 9999-12-31T23:59:59Z]` |
| Decimal128 | `NaN` and infinities canonicalized on write; arithmetic not supported |
| Double | `NaN` canonicalized on write |
| Regex options | Only `i`, `m`, `s`, `u`, `x`, in alphabetical order, no repeats |
| Natural sort | Does not match insertion order or `_id` ascending |
| Aggregations | Limited to 250 stages; `$merge` and `$out` unsupported; `$facet` input stages cannot use `$rand` or `$sample` |
| Writes | Names beginning with `$` cannot be created via upsert in `update` or `findAndModify`; retryable writes unsupported (use `retryWrites=false`) |
| Transactions | Snapshot isolation and serializable supported; default is optimistic concurrency with snapshot isolation |
| Read concern | `snapshot` (default), `majority`, `linearizable`; use `linearizable` for strict consistency and to prevent write skew |
| Write concern | Only `w: 'majority'` and `w: 1` |
| Read preference | Only `primary`, `primaryPreferred`, `primary_preferred`, `secondary_preferred`, `nearest` |
| Indexes | Wildcard unsupported; no automatic `_id` index (uniqueness still enforced; create an ordered index explicitly, beware hotspots with monotonic `_id`); multi-key must be enabled at creation and cannot be changed |
| Errors | Error codes and messages may differ |

### Command-specific unsupported fields

This table lists commands with field restrictions; for the full list of supported commands see `supported-features-80.md`. `comment` is accepted by most commands but ignored; `maxTimeMS` is accepted but may be ignored.

| Command | Unsupported fields / notes |
| --- | --- |
| `find` | `max`, `min`, `returnKey`, `showRecordId`, `tailable`, `oplogReplay`, `noCursorTimeout`, `awaitData`, `allowPartialResults`, `collation`, `allowDiskUsage`, `let` |
| `aggregate`, `findAndModify` | `collation`, `let` |
| `update`, `delete` (within statement), `count`, `distinct` | `collation` |
| `getMore` | `comment` |
| `insert`, `killCursors`, `explain`, `commitTransaction`, `abortTransaction`, `endSessions`, `listIndexes`, `createIndexes`, `dropIndexes`, `drop` | none |
| `listDatabases` | `authorizedDatabases`; `filter` must be empty if provided |
| `listCollections` | `authorizedCollections` must be false if provided |
| `createCollection` | No-op; `capped` must be false; unsupported: `timeseries`, `expireAfterSeconds`, `clusteredIndex`, `changeStreamPreAndPostImages`, `size`, `max`, `storageEngine`, `validator`, `validationLevel`, `validationAction`, `indexOptionDefaults`, `viewOn`, `pipeline`, `collation`, `encryptedFields` |

## Notes

- Dropping large collections may cause connection timeouts; increase the connection deadline or use bulk delete. `drop` does not generate Eventarc events. `drop` is destructive; try it on a disposable collection first.
- Supported-feature pages exist for MongoDB 8.0, 7.0, 6.0 and 5.0 (see `supported-features-80.md` for 8.0).
- Source inconsistency: this page says "Commands not listed in the following tables are unsupported", but the supported-features pages list further supported commands that are not in its tables (for example `hello`, `buildInfo`, `collStats`); use `supported-features-80.md` for command support.
- Source inconsistency: this page lists `dropIndexes` with no unsupported fields, while the supported-features pages mark the `dropIndexes` command as not supported (`dropIndex` is supported; see `indexing.md` for deleting indexes).
- Source inconsistency: this page lists the top-level `_id` types without Boolean, while the supported data types page lists Boolean as well (see `supported-data-types-drivers.md`). Avoid Boolean `_id` values unless you have verified them against your database.
- Source inconsistency: the quotas page lists a 1 MiB maximum document size for both Standard and Enterprise editions, while the editions overview and the MongoDB compatibility behavior-differences pages give 16 MiB for Firestore with MongoDB compatibility (1 MiB for Native mode). Kept as written on each page; check the limit for your database before relying on documents larger than 1 MiB.
- Source: https://docs.cloud.google.com/firestore/mongodb-compatibility/docs/behavior-differences (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/firestore/mongodb-compatibility/docs/connect (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [supported-features-80.md](./supported-features-80.md)
- [supported-data-types-drivers.md](./supported-data-types-drivers.md)
- [indexing.md](./indexing.md)
- [connect.md](./connect.md)

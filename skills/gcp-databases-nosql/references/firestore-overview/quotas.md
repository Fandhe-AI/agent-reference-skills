---
source: https://docs.cloud.google.com/firestore/quotas
---

# Quotas and limits

Free tier amounts and hard limits for Firestore. The twin lists Standard and Enterprise edition tables; they are identical except where noted below.

## Signature / Usage

Field path syntax (from the source): a quoted field name is wrapped in backticks, here referring to the `x&y` field nested under `foo`.

```text
foo.`x&y`
```

## Options / Props

### Free tier (applied daily, reset at midnight Pacific time)

Applies to only one database per project: the first database created in a project without a free tier database gets it; if that database is deleted, the next one created receives it.

| Free tier | Standard | Enterprise |
|---|---|---|
| Stored data | 1 GiB | 1 GiB |
| Document reads / Read units | 50,000 per day | 50,000 per day |
| Document writes / Write units | 20,000 per day | 40,000 per day |
| Document deletes | 20,000 per day | n/a |
| Real-time update units | n/a | 50,000 per day |
| Outbound data transfer | 10 GiB per month | 10 GiB per month |

Managed deletes (TTL), PITR data, backup data, restore operations and clone operations include no free usage; you must enable billing to use them.

### Databases (both editions)

| Limit | Details |
|---|---|
| Databases per project | 100 (contact support to increase) |
| CMEK databases per project | 0 by default (allowlist feature; request via the CMEK access request form) |

### Collections, documents and fields (both editions)

| Limit | Details |
|---|---|
| Collection IDs | Valid UTF-8; no longer than 1,500 bytes; no `/`; not solely `.` or `..`; cannot match `__.*__` |
| Maximum depth of subcollections | 100 |
| Document IDs | Same constraints as collection IDs; imported Datastore numeric entity IDs are exposed as `__id[0-9]+__` |
| Maximum size for a document name | 6 KiB |
| Maximum size for a document | 1 MiB (1,048,576 bytes) |
| Field names | Valid UTF-8; cannot match `__.*__` |
| Maximum size of a field name | 1,500 bytes |
| Field paths | Field names separated by `.`; each segment is a simple name (only `a-z`, `A-Z`, `0-9`, `_`; not starting with `0-9`) or a backtick-quoted name; escape a backtick with `\`; or pass a FieldPath object |
| Maximum size of a field path | 1,500 bytes |
| Maximum size of a field value | 1 MiB - 89 bytes (1,048,487 bytes) |
| Maximum depth of fields in a map or array | 20 (each map or array field adds one level) |

### Writes and transactions

| Limit | Standard | Enterprise |
|---|---|---|
| Maximum API request size | 10 MiB | 10 MiB |
| Memory limit for a query | 128 MiB | not listed |
| Transaction time limit | 270 seconds, 60-second idle expiration | same |
| Field transformations per document in a `Commit` or transaction | 500 | 500 |

### Indexes

| Limit | Standard | Enterprise |
|---|---|---|
| Composite indexes per database | 200 without billing; 1000 with billing (contact support to increase) | "Indexes" per database: 200 without billing; 1000 with billing |
| Single-field configurations per database | 200 without billing; 1000 with billing (one configuration may hold several settings for the same field, for example an exemption and a TTL policy count as one) | not listed |
| Index entries per document | 40,000 (single-field plus composite entries) | 40,000 |
| Fields in a composite index | 100 | 100 (fields in an index) |
| Size of an index entry | 7.5 KiB | 7.5 KiB |
| Sum of a document's index entry sizes | 8 MiB | 8 MiB |
| Size of an indexed field value | 1500 bytes; larger values are truncated and queries on them may return inconsistent results | not listed |

### TTL and export/import (both editions)

| Limit | Details |
|---|---|
| TTL configurations per database | 1000 |
| Export + import requests per project per minute | 20 |
| Concurrent exports and imports | 50 |
| Collection ID filters per export/import request | 100 |

### Security rules (both editions)

| Limit | Details |
|---|---|
| `exists()`, `get()`, `getAfter()` calls per request | 10 for single-document and query requests; 20 for multi-document reads, transactions and batched writes (the 10 limit also applies to each operation). Exceeding either gives permission denied. Cached calls don't count. |
| Nested `match` depth | 10 |
| Path length in segments within nested `match` | 100 |
| Path capture variables within nested `match` | 20 |
| Function call depth | 20 (the rules-conditions page says 10; see Notes) |
| Function arguments | 7 |
| `let` bindings per function | 10 |
| Recursive or cyclical function calls | 0 (not permitted) |
| Expressions evaluated per request | 1,000 |
| Ruleset size | 256 KB source published via Firebase console or `firebase deploy`; 250 KB compiled ruleset |

## Notes

- These are hard limits unless otherwise noted.
- Example from the source of the 20-level depth rule: `{ nested_map: { nested_array: [ { foo: "bar" } ] } }` has a total depth of three levels.
- Source inconsistency: the Enterprise tables use slightly different wording for index limits ("indexes", "fields in an index") and omit some Standard rows (query memory limit, single-field configurations, indexed field value size); omitted rows are marked "not listed" above rather than assumed equal.
- Google Cloud's managed document database is distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).
- Source inconsistency: the security rules limits list "Function call depth" as 20, while the rules-conditions page says "The total call stack depth is limited to 10" (see `firestore-security/rules-conditions.md`); design for 10 to stay within both.
- Source inconsistency: the quotas page lists a 1 MiB maximum document size for both Standard and Enterprise editions, while the editions overview and the MongoDB compatibility behavior-differences pages give 16 MiB for Firestore with MongoDB compatibility (1 MiB for Native mode). Kept as written on each page; check the limit for your database before relying on documents larger than 1 MiB.
- Source: https://docs.cloud.google.com/firestore/quotas (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [data-types.md](./data-types.md)
- [best-practices.md](./best-practices.md)
- [editions-overview.md](./editions-overview.md)

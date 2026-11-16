---
source: https://docs.cloud.google.com/datastore/docs/concepts/overview
---

# Datastore overview (Firestore in Datastore mode)

Datastore is no longer offered as a standalone database product. Firestore is its successor and offers a backwards-compatible Datastore API to support legacy App Engine applications built on Datastore. Firestore in Datastore mode provides atomic transactions, high availability of reads and writes, massive scalability, flexible storage and querying (SQL-like GQL), strongly consistent queries, encryption at rest, and a fully managed service with no planned downtime.

## Signature / Usage

### Inspect a Datastore mode database

Snippet taken from https://docs.cloud.google.com/datastore/docs/concepts/transactions (the overview page itself has no code).

```bash
gcloud firestore databases describe \
  --project=PROJECT_ID \
  --database=DATABASE_ID
```

## Options / Props

### Terminology mapping

| Concept | Datastore | Firestore | Relational database |
|---|---|---|---|
| Category of object | Kind | Collection group | Table |
| One object | Entity | Document | Row |
| Individual data for an object | Property | Field | Column |
| Unique ID for an object | Key | Document ID | Primary key |

### Alternatives suggested by the source

| Need | Consider |
|---|---|
| Relational database with full SQL support for OLTP | Cloud SQL |
| No ACID transactions required, or data not highly structured | Bigtable |
| Interactive querying in an OLAP system | BigQuery |
| Large immutable blobs (images, movies) | Cloud Storage |

## Notes

- Entities of the same kind can have different properties, and entities can have properties with the same name but different value types. Datastore is schemaless.
- All queries are served by previously built indexes, so queries are more restrictive than SQL: no join operations, no inequality filtering on multiple properties, no filtering on the results of a subquery. For joins and subqueries, the source recommends the Firestore Native API or the MongoDB-compatible API.
- The Datastore-compatible API is intended to support legacy App Engine applications. For a new document-oriented application the source recommends one of the Firestore APIs instead of the Datastore API.
- Firestore's Datastore compatible API also provides a SQL-like query language (GQL).
- Firestore pages here cover Google Cloud's managed document database (Datastore mode); it is distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`). Firebase client-side setup is out of scope.
- Source: https://docs.cloud.google.com/datastore/docs/concepts/overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source (snippet): https://docs.cloud.google.com/datastore/docs/concepts/transactions (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [store-query-data.md](./store-query-data.md)
- [transactions.md](./transactions.md)
- [indexes.md](./indexes.md)
- [limits.md](./limits.md)
- [errors.md](./errors.md)
- [multitenancy.md](./multitenancy.md)

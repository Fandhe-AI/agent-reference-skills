---
source: https://docs.cloud.google.com/spanner/docs/choose-googlesql-or-postgres
---

# Choose between GoogleSQL and PostgreSQL

When creating a Spanner database you choose one of two SQL dialects: GoogleSQL or PostgreSQL. Both offer the same core features, performance and scalability; choose by application, developer and ecosystem needs.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/spanner/docs/getting-started/gcloud

Set the default instance first (the commands below name no instance):

```bash
gcloud config set spanner/instance test-instance
```

```bash
gcloud spanner databases create example-db
```

```bash
gcloud spanner databases create example-db --database-dialect=POSTGRESQL
```

## Options / Props

| Consideration | Guidance |
|---------------|----------|
| Portability | PostgreSQL lets you migrate from Spanner to another PostgreSQL database; choose it if moving away from Google Cloud is the top priority |
| Familiarity | Pick the dialect your team already knows to reduce the learning curve |
| Ecosystem | GoogleSQL is tightly integrated with Google Cloud services (for example BigQuery); PostgreSQL has a vast open-source ecosystem |
| Application requirements | Assess SQL syntax, data types and future needs |
| Migration | The dialect closer to your current database may simplify migration |

## Notes

- The borrowed commands assume the default instance was set with `gcloud config set spanner/instance test-instance` (see gcloud.md); otherwise pass `--instance=INSTANCE`.
- Feature parity: both dialects support Spanner's unique features such as interleaved tables and query hints.
- Both dialects share the same distributed storage and query processing engine, with the same tools, APIs and client libraries.
- Spanner is Google Cloud's distributed relational database, not a PostgreSQL server even with the PostgreSQL interface; distinct from `supabase` and `drizzle`.
- Source: https://docs.cloud.google.com/spanner/docs/choose-googlesql-or-postgres (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/getting-started/gcloud (borrowed commands)

## Related

- [postgresql-interface.md](./postgresql-interface.md)
- [databases.md](./databases.md)

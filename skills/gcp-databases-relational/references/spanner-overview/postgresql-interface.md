---
source: https://docs.cloud.google.com/spanner/docs/postgresql-interface
---

# PostgreSQL interface

The PostgreSQL interface lets you use Spanner's managed, scalable, highly available infrastructure with PostgreSQL syntax and tools. It provides Spanner capabilities through PostgreSQL-compatible schemas, types, queries and clients, but does not support all PostgreSQL features.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/spanner/docs/getting-started/gcloud

Set the default instance first (the command below names no instance):

```bash
gcloud config set spanner/instance test-instance
```

```bash
gcloud spanner databases create example-db --database-dialect=POSTGRESQL
```

## Options / Props

| Connection path | Description |
|-----------------|-------------|
| PostgreSQL ecosystem tools | PostgreSQL JDBC driver, pgx and other supported drivers, ORMs and tools |
| `psql` | Interactive command line is supported (via PGAdapter) |
| PGAdapter | Lightweight proxy running alongside your application; supports core PostgreSQL wire protocol, Spanner's global endpoint, connection management and IAM authentication. Google benchmarking shows no noticeable added latency versus direct connection |
| Spanner clients | Open source clients (Java, Go, Python, Node.js, Ruby, PHP, C#, C++), Spanner JDBC driver, Go `database/sql` driver; connect directly to the global endpoint without a proxy but are not compatible with existing PostgreSQL clients, ORMs or tools |

## Notes

- The borrowed command assumes the default instance was set with `gcloud config set spanner/instance test-instance` (see gcloud.md); otherwise pass `--instance=INSTANCE`.
- Not supported: extensions, user-defined data types, user-defined stored procedures and other features; some features behave differently from open source PostgreSQL (see known issues). Migrating a PostgreSQL application likely needs rework (for example query optimization and primary key design).
- Spanner's control plane is used to provision, secure and monitor; tools such as pgAdmin are not supported for administration.
- The interface is configured per database at creation; one instance can hold both GoogleSQL and PostgreSQL databases.
- Interactive options: psql through PGAdapter, Spanner Studio in the console, IDEs (DBeaver, Visual Studio Code, JetBrains, IntelliJ), and the Spanner emulator for local development and test. Emulator and client-library setup in general is covered by `gcp-client-libraries`.
- Spanner is Google Cloud's distributed relational database, not a PostgreSQL server even with the PostgreSQL interface; distinct from `supabase` and `drizzle`.
- The PostgreSQL-dialect gcloud tutorial uses DML because of a known issue where gcloud cannot look up table names when writing with mutations to a PostgreSQL database.
- Source: https://docs.cloud.google.com/spanner/docs/postgresql-interface (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/getting-started/gcloud (borrowed commands)

## Related

- [choose-googlesql-or-postgres.md](./choose-googlesql-or-postgres.md)
- [databases.md](./databases.md)
- [gcloud.md](./gcloud.md)

---
source: https://docs.cloud.google.com/sql/docs/postgres/features
---

# Cloud SQL for PostgreSQL features

Major features and capabilities of Cloud SQL for PostgreSQL, supported connection paths, and differences from standard PostgreSQL.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/sql/docs/quotas (PostgreSQL command to inspect a setting that is exposed as a Cloud SQL flag):

```sql
SELECT * FROM pg_settings WHERE name = 'max_connections';
```

## Options / Props

| Area | Details |
|------|---------|
| Feature support | Fully managed PostgreSQL in the cloud; instances in the Americas, EU, Asia, and Australia. Migration to Cloud SQL via Database Migration Service (DMS). Customer data encrypted on Google's internal networks and in database tables, temporary files, and backups. Secure external connections with the Cloud SQL Auth Proxy or SSL/TLS. Data replication between zones with automatic failover; import/export with SQL dump files. PostgreSQL client-server protocol and standard connectors. Automated backups, on-demand backups, point-in-time recovery; instance cloning. Google Cloud Observability logging and monitoring integration. Multiple PostgreSQL versions; logical replication; read pools and read pool autoscaling; storage shrink. Extensions: see "Configure PostgreSQL extensions". Procedural language: `PL/pgSQL`. |
| Supported languages (App Engine flexible environment) | C#, Go, Java, Node.js, PHP, Python, Ruby. External applications can use the standard PostgreSQL client-server protocol. |
| How you can connect | `psql` client, third-party tools using the PostgreSQL protocol, external applications, App Engine, Compute Engine, Google Kubernetes Engine, Cloud Run functions, Cloud Run. Connecting with Private Google access isn't supported. |
| Unsupported features | Any feature that requires `SUPERUSER` privileges, except: `CREATE EXTENSION` only for supported extensions; `CREATE CAST` / `DROP CAST` if assigned the `cloudsqlsuperuser` role. The `WITHOUT FUNCTION` cast method. Custom background workers. The `psql` client in Cloud Shell doesn't support operations that require a reconnection, such as `\c` to another database. LLVM JIT compilation. |
| Notable differences | Some PostgreSQL options and parameters aren't enabled for editing as Cloud SQL flags. |

## Notes

- Managed PostgreSQL on Google Cloud — distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service).
- The source links to the supported versions (`db-versions`), editions, locations, flags, extensions and per-platform connection guides (omitted).
- Source: https://docs.cloud.google.com/sql/docs/postgres/features (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [editions-intro.md](./editions-intro.md)
- [db-versions.md](./db-versions.md)
- [locations.md](./locations.md)
- [feature-support.md](./feature-support.md)

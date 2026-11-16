---
source: https://docs.cloud.google.com/sql/docs/feature_support
---

# Cloud SQL feature support by database engine

Lists the main Cloud SQL features and which engines (MySQL, PostgreSQL, SQL Server) support them. A blank cell in the source means unsupported; one blank cell (SQL Server Query Insights) contradicts the SQL Server pages and is marked here (see Notes).

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/sql/docs/quotas (per-engine commands to read the connection limit):

MySQL:

```sql
SHOW VARIABLES LIKE "max_connections";
```

PostgreSQL:

```sql
SELECT * FROM pg_settings WHERE name = 'max_connections';
```

## Options / Props

| Category | Feature | MySQL | PostgreSQL | SQL Server |
|----------|---------|:-----:|:----------:|:----------:|
| Data protection | Backups | ✓ | ✓ | ✓ |
| | Point-in-time recovery (PITR) | ✓ | ✓ | ✓ |
| | High availability | ✓ | ✓ | ✓ |
| | Cloning | ✓ | ✓ | ✓ |
| | Disaster recovery | ✓ | ✓ | ✓ |
| Data migration | Data migration to external servers | ✓ | | |
| Logs | Instance logging | ✓ | ✓ | ✓ |
| Planned maintenance | Maintenance windows | ✓ | ✓ | ✓ |
| | Maintenance controls | ✓ | ✓ | ✓ |
| | Self service maintenance | ✓ | ✓ | ✓ |
| Replication | Read replicas | ✓ | ✓ | ✓ |
| | Cross-region read replicas | ✓ | ✓ | ✓ |
| | External read replicas | ✓ | ✓ | ✓ |
| | Binary logging on read replicas | ✓ | | |
| | Replication from an external server | ✓ | ✓ | |
| | Read replica indexes stored procedures | ✓ | | |
| | Logical replication | | ✓ | |
| Security | Customer-managed encryption keys (CMEK) | ✓ | ✓ | ✓ |
| | Cloud SQL Auth Proxy support | ✓ | ✓ | ✓ |
| | Audit logging | ✓ | ✓ | ✓ |
| | Connection organization policies | ✓ | ✓ | ✓ |
| | IAM database authentication | ✓ | ✓ | |
| | Access Transparency (AXT) | ✓ | ✓ | ✓ |
| | Key Access Justification | ✓ | ✓ | ✓ |
| | Private Service Connect | ✓ | ✓ | ✓ |
| | Cloud Security Command Center Monitoring | ✓ | ✓ | ✓ |
| | Cloud External Key Manager (EKM) | ✓ | ✓ | ✓ |
| | VPC Service Controls | ✓ | ✓ | ✓ |
| Insights | Query Insights | ✓ | ✓ | ✓ (blank in the source; see Notes) |

## Notes

- Source inconsistency: this page leaves the SQL Server Query Insights cell blank, but https://docs.cloud.google.com/sql/docs/sqlserver/using-query-insights (retrieved 2026-11-16) documents query insights for Cloud SQL for SQL Server in both editions (Enterprise: Web, Standard and Enterprise, not Express; Enterprise Plus: SQL Server Enterprise 2019 or 2022), and https://docs.cloud.google.com/sql/docs/sqlserver/editions-intro lists it for both editions (see `cloud-sql-sqlserver/editions-intro.md`). The cell is marked supported here.
- Each checkmark links to the engine-specific page in the source (links omitted here); the official URL pattern is `https://docs.cloud.google.com/sql/docs/<mysql|postgres|sqlserver>/<topic>`.
- Managed PostgreSQL / MySQL / SQL Server on Google Cloud — distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle`.
- Source: https://docs.cloud.google.com/sql/docs/feature_support (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [introduction.md](./introduction.md)
- [features.md](./features.md)
- [editions-intro.md](./editions-intro.md)

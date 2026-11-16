---
source: https://docs.cloud.google.com/sql/docs/sqlserver/features
---

# Cloud SQL for SQL Server features

Overview of the capabilities Cloud SQL for SQL Server supports, the SQL Server features and server-level permissions it does not support, and how clients can connect.

## Signature / Usage

### Connecting

Supported client tools: SQL Server Management Studio (SSMS) and the `sqlcmd` utility, plus the bulk copy program (`bcp`) and SqlPackage for BACPAC import/export. Connecting with Private Google access isn't supported. Cloud SQL supports Transact-SQL syntax.

### Server permissions

When you grant privileges, pass `CustomerDbRootRole` as the grantor (see the users page):

```sql
GRANT ALTER ANY LOGIN TO [Account] AS CustomerDbRootRole
```

## Options / Props

### Supported (selected)

| Area | Detail |
|------|--------|
| Compute | Custom machine types with up to 624 GB of RAM and 96 CPUs |
| Storage | Up to 64 TB, with automatic storage increase |
| Backup / recovery | Automated and on-demand backups, point-in-time recovery, instance cloning |
| Import / export | Import BAK and SQL files; export BAK files; BACPAC via SqlPackage; bulk insert (SQL Server 2022 only) |
| Security | Auth Proxy or SSL/TLS, TDE, Always Encrypted without secure enclaves, SQL Server Audit, Dynamic Data Masking, column- and cell-level encryption |
| Identity | Customer-managed AD (CMAD) and Managed Microsoft AD with Windows Authentication, Microsoft Entra ID |
| Availability | HA through a regional persistent disk, data replication between regions, read pools |
| Data | CDC, temporal tables, UTF-8, intelligent query processing, accelerated database recovery, storage shrink |
| Other | Linked Servers, SQL Server Agent, Publisher / Subscriber, Extended Events, custom time zone, processor affinity masks |
| SSIS / SSRS | Run on a separate host and connect to Cloud SQL; packages can't be hosted on or executed from Cloud SQL |

### Unavailable

SQL Server Analysis Services (SSAS); `SP_Configure` settings (use database flags); Stretch database; backing up to Microsoft Azure Blob Storage; buffer pool extension; `OPENROWSET`; Data Quality Services; Database Log Shipping; Database Mail; Dedicated Administrator Connection (DAC); Distribution Transaction Coordinator (MSDTC); file tables; FILESTREAM; installing a server that requires a full server installation with specific authentication mechanisms such as Azure DevOps Server; Maintenance Plans; Performance Data Collector; Policy-Based Management; Machine Learning and R Services; Resource Governor; server-level triggers; Service Broker endpoints; T-SQL endpoints (all `CREATE ENDPOINT` operations); WCF Data Services; the `sysadmin` role and system stored procedures that require it; hybrid buffer pool; memory-optimized tempdb metadata; in-memory OLTP support for database snapshots; registering external languages; row-level security; object storage backup and restore; Persistent Memory (PMEM); real-time operational analytics; integrated acceleration and offloading; hybrid buffer pool with direct write; multi-write replication; link to Azure SQL Managed Instance; contained availability group; Always Encrypted with secure enclaves; PFX certificates and other cryptographic improvements; MS-TDS 8.0 protocol and TLS 1.3.

Unavailable permissions/operations: `ADMINISTER BULK OPERATIONS`, `ALTER ANY CREDENTIAL`, `ALTER ANY EVENT NOTIFICATION`, `ALTER ANY EVENT SESSION`, `ALTER RESOURCES`, `ALTER SETTINGS`, `AUTHENTICATE SERVER`, `CONTROL_SERVER`, `CREATE DDL EVENT NOTIFICATION`, `CREATE ENDPOINT`, `CREATE TRACE EVENT NOTIFICATION`, `EXTERNAL ACCESS ASSEMBLY`, `RESTORE`, `SHUTDOWN`, CLR assemblies.

App Engine flexible environment languages: C#, Go, Java, Node.js, PHP, Python, Ruby.

## Notes

- Source: https://docs.cloud.google.com/sql/docs/sqlserver/features (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- SQL Server variant of the Cloud SQL features page; PostgreSQL counterpart: https://docs.cloud.google.com/sql/docs/postgres/features (MySQL: https://docs.cloud.google.com/sql/docs/mysql/features).
- Managed SQL Server on Google Cloud; distinct from the Node.js client `mssql` skill (client code only, not the managed service) and from Cloudflare D1 / Hyperdrive (`cloudflare-storage`).
- Cloud SQL restricts system procedures and tables that need advanced privileges; superuser accounts can't be created or accessed.
- The source page has no code blocks. Snippet taken from https://docs.cloud.google.com/sql/docs/sqlserver/users
- Source: https://docs.cloud.google.com/sql/docs/sqlserver/users (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [users.md](./users.md)
- [known-issues.md](./known-issues.md)
- [editions-intro.md](./editions-intro.md)

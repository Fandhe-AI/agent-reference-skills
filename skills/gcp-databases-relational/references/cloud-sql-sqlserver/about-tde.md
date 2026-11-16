---
source: https://docs.cloud.google.com/sql/docs/sqlserver/about-tde
---

# About TDE in Cloud SQL for SQL Server

Transparent data encryption (TDE) adds a layer of encryption on top of Google's default encryption at rest and optional CMEK, for example for PCI DSS or for importing and exporting encrypted backups. Data is encrypted before it is written to storage and decrypted when read.

## Signature / Usage

### Certificate naming

Cloud SQL names the certificates it provisions with the `gcloud_tde_system_` prefix; imported certificates use the `gcloud_tde_user_CERT_NAME_UUID` naming prefix (`CERT_NAME` and `UUID` are variables).

### Rotate an imported certificate

Imported certificates must be rotated manually with the `msdb.dbo.gcloudsql_rotate_tde_certificate` stored procedure, invoked by the `sqlserver` user or by users it has given permission (Snippet taken from https://docs.cloud.google.com/sql/docs/sqlserver/use-tde):

```sql
EXEC msdb.dbo.gcloudsql_rotate_tde_certificate TDE_CERTIFICATE_NAME
```

### Drop an imported certificate

To import more than ten certificates, delete unneeded ones with the `msdb.dbo.gcloudsql_drop_tde_user_certificate` stored procedure; the procedure and its call are on https://docs.cloud.google.com/sql/docs/sqlserver/use-tde. Before dropping a certificate, export it (the "Export a TDE certificate" section of that page: `gcloud sql export tde` or the API, not the console) if a database or backup encrypted with it might still need to be restored or imported elsewhere (see Notes).

## Options / Props

| Item | Detail |
|------|--------|
| Key architecture | Two tiers: a certificate generated from the database primary key protects data encryption keys; the database encryption key encrypts and decrypts user-database data. Cloud SQL manages the primary key and TDE certificate |
| Certificate validity | Each eligible instance gets a unique TDE certificate valid for one year, rotated automatically each year |
| Imported certificates | Up to ten per instance; you must rotate them manually |
| Replicas | All certificates (managed and imported) are distributed to all replicas automatically; you can't import directly to a replica |
| Versions | SQL Server Enterprise, or SQL Server 2019 or later (Standard edition) |
| Internal database | `gcloud_cloudsqladmin` is created on TDE-enabled instances; reserved, inaccessible, negligible storage cost |

## Notes

- Source: https://docs.cloud.google.com/sql/docs/sqlserver/about-tde (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- SQL Server-specific page (TDE); no PostgreSQL counterpart was checked. For CMEK see https://docs.cloud.google.com/sql/docs/sqlserver/cmek.
- Managed Cloud SQL encryption feature; distinct from the Node.js client `mssql` skill (client code only).
- After importing or rotating a certificate on an instance with TDE and PITR enabled, the instance creates a new backup to reduce the risk of losing the certificate when restoring to an earlier point in time.
- You can't delete a Cloud SQL-managed certificate or a certificate that is in use.
- This page links restoring an encrypted database to having its certificate available: the backup taken after an import or rotation "helps reduce the risk of certificate loss if and when you want to restore an encrypted database to a point in time before the certificate was accessible to the instance". Not from the source: exporting a user certificate before dropping it keeps a copy for such restores and for importing encrypted backups elsewhere; the export-first advice is editorial.
- With replicas and VPC Service Controls, the primary and all replicas must be in the same service perimeter.
- Next step in the source: https://docs.cloud.google.com/sql/docs/sqlserver/use-tde
- The about-tde page has no code block. Snippet taken from https://docs.cloud.google.com/sql/docs/sqlserver/use-tde (the rotate call; the source fence is tagged `bash` but contains T-SQL, shown here as `sql`).
- Source: https://docs.cloud.google.com/sql/docs/sqlserver/use-tde (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [features.md](./features.md)
- [replication.md](./replication.md)

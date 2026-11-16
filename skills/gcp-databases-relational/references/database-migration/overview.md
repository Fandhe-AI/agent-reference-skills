---
source: https://docs.cloud.google.com/database-migration/docs/overview
---

# Database Migration Service overview, supported databases and security

Database Migration Service migrates data and metadata from a source database into Cloud SQL or AlloyDB for PostgreSQL destinations, with serverless continuous or one-time migrations, managed networking, initial snapshot plus change data capture (CDC), and status updates. This page merges the overview, the supported source and destination versions, the security and encryption options, and the Oracle to Cloud SQL for PostgreSQL scenario overview.

## Signature / Usage

### Migration types and flow

- Continuous (online): initial full dump and load, then CDC replication. When the destination is ready, finalize (promote) for minimal downtime.
- One-time: single point-in-time snapshot (dump and load); disable writes on the source during the full dump to avoid losing data.
- Homogeneous: same technology (e.g. MySQL to Cloud SQL for MySQL). Heterogeneous: different technology (e.g. Oracle to Cloud SQL for PostgreSQL), using conversion workspaces (interactive SQL editor, Gemini-assisted conversion, customization directives).
- Oracle flow: convert schema in a conversion workspace (connect to the source, or upload extracted schema files to Cloud Storage offline) → apply schema to the destination → full dump (automatic, or manual by supplying an Oracle System Change Number as the CDC starting point) → CDC from database log files → promote.

Promote step of a continuous migration (Snippet taken from https://docs.cloud.google.com/database-migration/docs/postgres/promote-migration, the same finalize task):

```bash
gcloud database-migration migration-jobs \
promote MIGRATION_JOB_ID \
  --region=REGION
```

## Options / Props

### Supported versions (homogeneous)

| Scenario | Sources | Destinations |
|---|---|---|
| MySQL to Cloud SQL for MySQL | Amazon RDS 5.6, 5.7, 8.0, 8.4, 9.7; self-managed MySQL 5.5, 5.6, 5.7, 8.0, 8.4, 9.7; Cloud SQL for MySQL 5.6, 5.7, 8.0, 8.4, 9.7; Amazon Aurora 5.6, 5.7, 8.0, 8.4, 9.7; Azure Database for MySQL 5.7, 8.0, 8.4, 9.7 | Cloud SQL for MySQL 5.6, 5.7, 8.0 (minor versions 8.0.18, 8.0.26-8.0.28, 8.0.30-8.0.37, 8.0.39-8.0.43), 8.4 and 9.7 with limitations (no physical backup file migrations for 8.4 / 9.7) |
| PostgreSQL to Cloud SQL for PostgreSQL | Amazon RDS 9.6.10+, 10.5+, 11.1+, 12-18; Aurora 10.11+, 11.6+, 12.4+, 13.3+, 14.6+, 15.2+, 16-18; self-managed 9.4, 9.5, 9.6, 10-18; Cloud SQL 9.6, 10-18; Azure Flexible Server 11+ | Cloud SQL for PostgreSQL 9.6, 10-18 |
| PostgreSQL to AlloyDB | Amazon RDS 9.6.10+, 10.5+, 11.1+, 12-18; Aurora 10.11+, 11.6+, 12.4+, 13.3+, 14-18; self-managed 9.4-18; Cloud SQL 9.6-18 | AlloyDB for PostgreSQL 14-18 |
| SQL Server to Cloud SQL for SQL Server | Amazon RDS, self-managed, Cloud SQL (backup-and-restore migrations only, with automated backup exports): 2025, 2022, 2019, 2017 | Cloud SQL for SQL Server 2025, 2022, 2019, 2017 |

MySQL 8.0 source minor versions: 8.0.18, 8.0.26, 8.0.27, 8.0.28, 8.0.30, 8.0.31, 8.0.32, 8.0.33, 8.0.34, 8.0.35, 8.0.36, 8.0.37, 8.0.39, 8.0.40, 8.0.41, 8.0.42, 8.0.43.

### Supported versions (heterogeneous)

| Scenario | Sources | Destinations |
|---|---|---|
| Oracle to Cloud SQL for PostgreSQL | Amazon RDS for Oracle; self-hosted single instance, Exadata, Active Data Guard, RAC; Oracle 11g 11.2.0.4, 12c 12.1.0.2 and 12.2.0.1, 18c, 19c, 21c | Cloud SQL for PostgreSQL 12-18 |
| Oracle to AlloyDB | Same Oracle sources | AlloyDB for PostgreSQL 12-18 (as listed in the source table) |
| SQL Server to Cloud SQL for PostgreSQL | Amazon RDS for SQL Server; Azure SQL Managed Instance; Azure SQL Database tier S3 and above; Cloud SQL for SQL Server; self-managed Enterprise 2008+, Standard 2016 SP1+, Developer 2008+ | Cloud SQL for PostgreSQL 12-18 |
| SQL Server to AlloyDB | Same SQL Server sources | AlloyDB for PostgreSQL 14-18 |

Unsupported: Oracle Autonomous Database; SQL Server Standard 2008-2014, Express and Web editions.

### Security and encryption

| Scenario | CMEK | Connectivity encryption | IAM |
|---|---|---|---|
| Homogeneous (MySQL, PostgreSQL, SQL Server) | Destination configured with CMEK in Cloud SQL / AlloyDB | SSL/TLS; upload your own certificates in the source connection profile | Controls access to migration resources |
| Heterogeneous (Oracle, SQL Server to PostgreSQL) | CMEK in the migration job secures data at rest (Database Migration Service additionally encrypts data at rest in a temporary database during conversion) | SSL/TLS, IP allowlisting or a forward SSH tunnel | "Access control with IAM" page of each scenario |

## Notes

- Not supported: dual-write (writing to and reading from both source and destination); multi-cloud use means continuous replication for read availability.
- Source inconsistency: the Oracle version tables in the source end with two rows that list only a destination (no source version); they appear duplicated in the original.
- Starting April 12, 2027 new Cloud SQL for SQL Server 2017 destination instances can't be created; 2017 sources can still be migrated and upgraded to 2019, 2022 or 2025.
- Source inconsistency: the Oracle to Cloud SQL for PostgreSQL scenario page refers to "AlloyDB for PostgreSQL" in its data-flow steps; kept as the source states it.
- Migrating from a later minor MySQL version to an earlier one is not recommended.
- SQL Server encrypted columns can be migrated (encrypted backup files page).
- Oracle scenario: supports Bare Metal Solution, RAC and self-managed instances; observability covers replication delay and CDC progress; also see the Oracle migration guide and known-limitations pages.
- Promote cuts over production; try it on a disposable migration first.
- Cloud SQL / AlloyDB context: managed PostgreSQL / MySQL / SQL Server on Google Cloud — distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the `drizzle` / `mssql` client skills. IAM and CMEK basics: `gcp-foundation`.
- Source: https://docs.cloud.google.com/database-migration/docs/overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/database-migration/docs/supported-databases (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/database-migration/docs/security-and-encryption (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/database-migration/docs/oracle-to-postgresql/scenario-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/database-migration/docs/postgres/promote-migration (the finalize step of a continuous migration; the overview, supported-databases, security and Oracle scenario pages have no code blocks).
- Source: https://docs.cloud.google.com/database-migration/docs/postgres/promote-migration (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [guide-to-new-instance.md](./guide-to-new-instance.md)
- [known-limitations.md](./known-limitations.md)
- [networking-methods.md](./networking-methods.md)
- [promote-migration.md](./promote-migration.md)

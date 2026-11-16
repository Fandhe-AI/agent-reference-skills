---
source: https://docs.cloud.google.com/spanner/docs/databases
---

# Databases overview

A Spanner database is a container for tables, views and indexes. Each instance can have multiple databases; a database is a child of an instance and the parent of a schema.

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

| Property | Set on | Description |
|----------|--------|-------------|
| Configuration, compute capacity, storage | Inherited from the parent instance | Regional or multi-region configuration, available compute capacity and storage |
| Dialect | Database | GoogleSQL or PostgreSQL. All tables in a database must use the same dialect |
| IAM policy | Database | Access rules applied to the tables and data in the database |
| Encryption key | Database | Default is a Google-owned and Google-managed key; a customer-managed encryption key (CMEK) is also supported |
| Deletion protection | Database | Prevents accidental deletion of databases |
| Database policies | Database (DDL) | Default leader region, query optimizer version, query optimizer statistics package version, version retention period; set or modified with `ALTER DATABASE` DDL |

## Notes

- Before creating a database read the schema design best practices and the schema and data model document, particularly the section on designing for multi-tenancy.
- Database limits (databases per instance, tables per database) are on the Quotas and limits page.
- The borrowed commands assume the default instance was set with `gcloud config set spanner/instance test-instance` (see gcloud.md); otherwise pass `--instance=INSTANCE`.
- Dropping or deleting a database deletes all of its data and schema; PITR can't bring it back (https://docs.cloud.google.com/spanner/docs/pitr). Its backups continue to exist and can be restored into a new database (https://docs.cloud.google.com/spanner/docs/backup). Enable deletion protection on databases you keep, and try deletions on a disposable resource first.
- Source: https://docs.cloud.google.com/spanner/docs/databases (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/getting-started/gcloud (borrowed commands)

## Related

- [instances.md](./instances.md)
- [quotas.md](./quotas.md)
- [choose-googlesql-or-postgres.md](./choose-googlesql-or-postgres.md)

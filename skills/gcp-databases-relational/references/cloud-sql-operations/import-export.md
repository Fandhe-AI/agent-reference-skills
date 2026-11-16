---
source: https://docs.cloud.google.com/sql/docs/postgres/import-export
---

# Best practices for importing and exporting data

Best practices and troubleshooting for importing into and exporting from Cloud SQL for PostgreSQL: Requester Pays restriction, minimizing export impact (read replica or serverless export), compression, long-running operations and verification.

## Signature / Usage

### Grant public schema privileges when import fails on PostgreSQL 15+ (database created from `template0`)

Adapted (not in the official docs): added the statement terminator `;` (the source shows the statement inline).

```sql
GRANT ALL ON SCHEMA public TO cloudsqlsuperuser;
```

### Import as a user who belongs to the dump's custom role

Import the SQL dump, and add `--user=USER` (a member of `ROLE_NAME`) so the import does not run as `cloudsqlsuperuser`. The source gives the synopsis as `gcloud sql import sql INSTANCE URI [--async] [--database=DATABASE, -d DATABASE] [--user=USER] [GCLOUD_WIDE_FLAG ...]`.

```bash
gcloud sql import sql INSTANCE_NAME gs://BUCKET_NAME/IMPORT_FILE_NAME \
--database=DATABASE_NAME
```

## Options / Props

### Best practices

| Topic | Guidance |
|-------|----------|
| Requester Pays | A Cloud Storage bucket with Requester Pays enabled can't be used for imports and exports |
| Export impact | Standard export runs online and can't be stopped once started; large databases or BLOBs may slow queries |
| Read replica export | Run the export on a read replica (good for frequent, small exports) |
| Serverless export | Use the `offload` flag (Console, `gcloud`, REST); a temporary instance is created and deleted automatically; takes longer than five minutes at minimum; costs extra |
| Compression | `.gz` extension compresses on export and decompresses on import; saves storage but can degrade export performance |
| Concurrency | One import or export per instance at a time; a long-running one blocks other operations such as daily automated backups (serverless export does not block them) |
| Smaller batches | Importing or exporting smaller batches shortens each operation |
| Verify | After an import, connect and list databases, tables and entries |

### Serverless export blocking matrix

| Current operation | New operation | Blocked? |
|---|---|---|
| Any operation | Serverless export | Yes |
| Serverless export | Any operation except serverless export | No |
| Any operation except serverless export | Any operation except serverless export | Yes |

If you delete the instance during a serverless export, the export stops some time later and exports no data.

### Troubleshooting imports

| Issue | Fix |
|-------|-----|
| `permission denied for schema public` (PostgreSQL 15+, target created from `template0`) | `GRANT ALL ON SCHEMA public TO cloudsqlsuperuser` |
| `HTTP Error 409 ... another operation was already in progress` | Only one operation at a time; retry after it finishes |
| Import taking too long | Too many active connections; check CPU and memory; restarting the instance first closes connections and ends resource-consuming tasks |
| Fails because users in the dump don't exist | Create the owning / granted database users in the target before importing |
| Disk usage much higher after import | Possibly point-in-time recovery logs; disable PITR to delete logs and recover storage (provisioned size does not shrink) |
| `GRANT stderr: ERROR: must be member of role ROLE_NAME` (job ran about four days) | Create `ROLE_NAME` in the destination and import as a user who is a member of it with `--user` |

### Troubleshooting exports

| Issue | Fix |
|-------|-----|
| `HTTP Error 409` | Another operation is in progress; retry later |
| `HTTP Error 403: The service account does not have the required permissions for the bucket.` | Ensure the bucket exists and the instance service account has `Storage Object Creator` (`roles/storage.objectCreator`) |
| CSV export works but SQL export fails | SQL exports the entire database; CSV lets you pick what to export |
| Export too slow | Use export offloading (serverless export); latency grows by the time to bring up the offload instance |
| `Create Extension` error | Dump references an unsupported extension; edit the dump to remove the references |
| `pg_dumpall` error | `--global` needs the superuser role (unsupported); also use `--no-role-passwords` |
| Times out with `Could not receive data from client: Connection reset by peer.` | Cloud Storage received no data for typically around seven minutes; do a manual export with `pg_dump` |
| Automate exports | No built-in way; build one with Cloud Scheduler, Pub/Sub, Cloud Run functions |

## Notes

- Mismatched statement in the source: the export 403 row names `roles/storage.objectCreator`, while the SQL dump page says the instance service account needs `storage.objectAdmin` (or the listed custom permissions). Source inconsistency: kept verbatim in both pages.
- Importing may overwrite or conflict with existing objects, and exports use database resources; try on a disposable instance first.
- For whole-database migration from a supported server, the source recommends Database Migration Service instead of export plus import.
- Distinct from Supabase Postgres (`supabase`) and Cloudflare D1 / Hyperdrive (`cloudflare-storage`); client code belongs to `mssql` / `drizzle`.
- Adapted from the official docs: the source shows `GRANT ALL ON SCHEMA public TO cloudsqlsuperuser` inline without `;`; the terminator was added so psql runs it.
- Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/import-export/import-export-sql (the import step); `--user=USER` is "PostgreSQL user for this import operation" per `gcloud sql import sql --help` (gcloud 593.0.0).
- Source: https://docs.cloud.google.com/sql/docs/postgres/import-export/import-export-sql (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/import-export (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [import-export-sql.md](./import-export-sql.md)
- [known-issues.md](./known-issues.md)
- [troubleshooting.md](./troubleshooting.md)

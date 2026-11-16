---
source: https://docs.cloud.google.com/sql/docs/mysql/import-export
---

# Best practices for importing and exporting data (Cloud SQL for MySQL)

Best practices for MySQL imports and exports: SQL mode, Requester Pays buckets, serverless export, dump flags, compression, long-running operations, InnoDB conversion, DEFINER clauses, verification, and troubleshooting.

## Signature / Usage

### Verify the SQL mode

```sql
SELECT @@GLOBAL.sql_mode;
```

### Convert MyISAM tables to InnoDB while dumping

InnoDB is the only supported engine. Do not do this if the dump contains the `mysql` schema; those files must remain MyISAM.

Adapted (not in the official docs): changed `-p [PASSWORD]` (which makes `mysqldump` prompt and treat the bracketed word as a database name, and would put a password on the command line) to a bare `-p` password prompt, added `--ssl-mode=VERIFY_CA --ssl-ca=server-ca.pem` so the password is only sent after the server certificate is verified, and replaced the bracketed placeholders with upper-case ones.

```bash
mysqldump --databases DATABASE_NAME \
-h INSTANCE_IP -u USERNAME -p \
--ssl-mode=VERIFY_CA --ssl-ca=server-ca.pem \
--hex-blob --default-character-set=utf8mb4 | sed 's/ENGINE=MyISAM/ENGINE=InnoDB/g' > DATABASE_FILE.sql
```

Replace `DATABASE_NAME`, `INSTANCE_IP`, `USERNAME` and `DATABASE_FILE` with your values; `-p` prompts for the password.

### Find DEFINER values that block import or migration

Check for entries for `root%localhost` or users that don't exist on the target:

```sql
SELECT DISTINCT DEFINER FROM INFORMATION_SCHEMA.EVENTS;
SELECT DISTINCT DEFINER FROM INFORMATION_SCHEMA.ROUTINES;
SELECT DISTINCT DEFINER FROM INFORMATION_SCHEMA.TRIGGERS;
SELECT DISTINCT DEFINER FROM INFORMATION_SCHEMA.VIEWS;
```

### Work around foreign-key ordering failures

If an import fails because a table doesn't exist (foreign key order), disable foreign key checks for the duration of the import.

Start of the dump file:

```sql
SET FOREIGN_KEY_CHECKS=0;
```

End of the dump file:

```sql
SET FOREIGN_KEY_CHECKS=1;
```

## Options / Props

### Best practices

| Practice | Detail |
|----------|--------|
| Same SQL mode | Strict SQL is on by default in Cloud SQL; if the source lacks it, remove it in Cloud SQL (and set another flag) |
| Requester Pays | Buckets with Requester Pays can't be used for import or export |
| Reduce export impact | Export from a read replica, or use serverless export (`offload` flag in console, `gcloud` or REST) |
| Compression | Use a `.gz` extension on export; `.gz` files are decompressed automatically on import; compression can slow export |
| Long operations | Can't stop them; one import or export at a time per instance; it blocks other operations such as daily backups (serverless export avoids this); use smaller batches |
| DEFINER | Create the definer users on the target first, or change `DEFINER` to `INVOKER` in the source or dump; `'root'@'localhost'` metadata always fails, change the definer first |

### Serverless export

| Item | Detail |
|------|--------|
| Mechanism | Cloud SQL creates a temporary instance and deletes it automatically afterwards |
| Duration | Longer than a standard export, at least over five minutes |
| Cost | Extra charge |
| Blocking | Any operation blocks a new serverless export; a running serverless export doesn't block other operations. If you select `delete`, the export stops some time later and exports no data |

### Troubleshooting

| Issue | Fix |
|-------|-----|
| `HTTP Error 409: Operation failed because another operation was already in progress` | One operation at a time; retry later |
| Import too slow | Close unused connections, check CPU and memory, restart the instance before importing |
| Users in the dump don't exist | Create them before importing |
| `HTTP Error 403: The service account does not have the required permissions for the bucket.` | Grant the instance's service account `roles/storage.objectCreator` on the bucket |
| CSV export works but SQL export fails | SQL exports the entire database; use CSV to export only what you need |
| Export too slow | Use export offloading |
| Automate exports | No built-in way; use Cloud Scheduler, Pub/Sub and Cloud Run functions |

## Notes

- MySQL variant; the PostgreSQL counterpart is https://docs.cloud.google.com/sql/docs/postgres/import-export.
- Corrected from the official docs: the original was `mysqldump --databases [DATABASE_NAME] -h [INSTANCE_IP] -u [USERNAME] -p [PASSWORD] ...`; with the MySQL client default `--ssl-mode=PREFERRED` the password could go to an unverified server, so `--ssl-mode=VERIFY_CA --ssl-ca=server-ca.pem` (Not from the source: standard MySQL client options; MariaDB clients use `--ssl-verify-server-cert`) was added. Get `server-ca.pem` as described in `cloud-sql-connectors-iam/iam-logins.md`, or run `mysqldump` through the Auth Proxy on `127.0.0.1` instead.
- A public `INSTANCE_IP` needs your client in authorized networks; prefer private IP, PSC or the Auth Proxy.
- Instances can't be stopped mid-export; if a database exceeds about 500 GB, import and export take long and block backups. Verify the result after import by connecting and listing databases, tables and entries.
- Known limitations are in https://docs.cloud.google.com/sql/docs/mysql/known-issues#import-export. For migrating a whole database from on-premises, AWS or Google Cloud, Database Migration Service is an alternative.
- Dump and CSV step-by-step: https://docs.cloud.google.com/sql/docs/mysql/import-export/import-export-sql and https://docs.cloud.google.com/sql/docs/mysql/import-export/import-export-csv.
- Source inconsistency: the known-issues page says an import/export can be cancelled (https://docs.cloud.google.com/sql/docs/mysql/import-export/cancel-import-export), while this page says a long-running operation can't be stopped.
- Source: https://docs.cloud.google.com/sql/docs/mysql/import-export (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [known-issues.md](./known-issues.md)
- [features.md](./features.md)
- [replication.md](./replication.md)

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

Per-instance CA (`GOOGLE_MANAGED_INTERNAL_CA`, the default) only:

Adapted (not in the official docs): changed `-p [PASSWORD]` (which makes `mysqldump` prompt and treat the bracketed word as a database name, and would put a password on the command line) to a bare `-p` password prompt, added `--ssl-mode=VERIFY_CA --ssl-ca=server-ca.pem` so the password is only sent after the server certificate is verified (enough only for a per-instance CA), replaced the bracketed placeholders with upper-case ones, and anchored the `sed` pattern to the `) ENGINE=MyISAM` line that closes each `CREATE TABLE` so row data and routine bodies are not rewritten.

```bash
mysqldump --databases DATABASE_NAME \
-h INSTANCE_IP -u USERNAME -p \
--ssl-mode=VERIFY_CA --ssl-ca=server-ca.pem \
--hex-blob --default-character-set=utf8mb4 | sed 's/^) ENGINE=MyISAM/) ENGINE=InnoDB/' > DATABASE_FILE.sql
```

Shared CA (`GOOGLE_MANAGED_CAS_CA`) or customer-managed CA (`CUSTOMER_MANAGED_CAS_CA`): take the instance DNS name from the `dnsNames:` field of the instance description (not from the certificate the server presents) and create a DNS record for it. Snippet taken from https://docs.cloud.google.com/sql/docs/mysql/configure-ssl-instance:

```bash
gcloud sql instances describe INSTANCE_NAME \
  --project=PROJECT_ID
```

Adapted (not in the official docs): same changes as above, but with `--ssl-mode=VERIFY_IDENTITY` and `-h DNS_NAME` (a name from `dnsNames`) instead of `--ssl-mode=VERIFY_CA` and `-h INSTANCE_IP`, so the password is only sent to a server whose certificate is issued by the CA and names this instance; the `sed` pattern is anchored the same way.

```bash
mysqldump --databases DATABASE_NAME \
-h DNS_NAME -u USERNAME -p \
--ssl-mode=VERIFY_IDENTITY --ssl-ca=server-ca.pem \
--hex-blob --default-character-set=utf8mb4 | sed 's/^) ENGINE=MyISAM/) ENGINE=InnoDB/' > DATABASE_FILE.sql
```

Replace `DATABASE_NAME`, `INSTANCE_IP` or `DNS_NAME`, `USERNAME` and `DATABASE_FILE` with your values; `-p` prompts for the password.

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
| DEFINER | Create the definer users on the target first, or change the definer in the source or dump to an account that exists on the target; for views and stored routines you can instead switch to `SQL SECURITY INVOKER` (see Notes). `'root'@'localhost'` metadata always fails, change the definer first |

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

- Source inconsistency: the source says to "update the `DEFINER` clause to `INVOKER`". `INVOKER` is not a valid `DEFINER` value: `DEFINER = 'user'@'host'` names the account, while running with the caller's privileges is the separate `SQL SECURITY INVOKER` characteristic, available only for views and stored procedures / functions (MySQL reference manual, "Stored Object Access Control"). Triggers and events always run as their definer, so for them change `DEFINER` to an account that exists on the target. Do not text-replace `DEFINER=` with `INVOKER` in a dump; that produces invalid SQL.
- MySQL variant; the PostgreSQL counterpart is https://docs.cloud.google.com/sql/docs/postgres/import-export.
- Corrected from the official docs: the original was `mysqldump --databases [DATABASE_NAME] -h [INSTANCE_IP] -u [USERNAME] -p [PASSWORD] ...`; with the MySQL client default `--ssl-mode=PREFERRED` the password could go to an unverified server, so `--ssl-mode=VERIFY_CA --ssl-ca=server-ca.pem` (Not from the source: standard MySQL client options; MariaDB clients use `--ssl-verify-server-cert`) was added. Verifying the CA verifies the server identity only for a per-instance CA (https://docs.cloud.google.com/sql/docs/mysql/configure-ssl-instance, "Server identity verification"). Get `server-ca.pem` as described in `cloud-sql-connectors-iam/iam-logins.md`, or run `mysqldump` through the Auth Proxy on `127.0.0.1` instead. Also, the source's `sed 's/ENGINE=MyISAM/ENGINE=InnoDB/g'` rewrites every occurrence in the dump, including string values in `INSERT` statements and routine bodies, which would change the restored data. The examples only rewrite lines that start with `) ENGINE=MyISAM` (the table-options line `mysqldump` writes at the end of `CREATE TABLE`). Not from the source: to be certain no data is touched, dump the schema with `--no-data` and the data with `--no-create-info` separately and convert only the schema file; review the converted file before importing.
- Adapted from the official docs: a shared CA is shared across instances, so the source requires hostname verification as well (for a customer-managed CA it says you can perform DNS name-based verification for any instance type); its steps take the DNS name from `dnsNames` in `gcloud sql instances describe`, create the DNS record, connect to that name and specify `--ssl-mode=VERIFY_IDENTITY` (https://docs.cloud.google.com/sql/docs/mysql/configure-ssl-instance). The shared-CA example applies that to the dump command; for a shared CA, `server-ca.pem` is then the root and regional CA bundle (https://docs.cloud.google.com/sql/docs/mysql/manage-ssl-instance, "Download root and regional CA certificate bundles for a shared CA").
- A public `INSTANCE_IP` needs your client in authorized networks; prefer private IP, PSC or the Auth Proxy.
- Instances can't be stopped mid-export; if a database exceeds about 500 GB, import and export take long and block backups. Verify the result after import by connecting and listing databases, tables and entries.
- Known limitations are in https://docs.cloud.google.com/sql/docs/mysql/known-issues#import-export. For migrating a whole database from on-premises, AWS or Google Cloud, Database Migration Service is an alternative.
- Dump and CSV step-by-step: https://docs.cloud.google.com/sql/docs/mysql/import-export/import-export-sql and https://docs.cloud.google.com/sql/docs/mysql/import-export/import-export-csv.
- Source inconsistency: the known-issues page says an import/export can be cancelled (https://docs.cloud.google.com/sql/docs/mysql/import-export/cancel-import-export), while this page says a long-running operation can't be stopped.
- Source: https://docs.cloud.google.com/sql/docs/mysql/import-export (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/mysql/configure-ssl-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0; the `gcloud sql instances describe` snippet)

## Related

- [known-issues.md](./known-issues.md)
- [features.md](./features.md)
- [replication.md](./replication.md)

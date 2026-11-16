---
source: https://docs.cloud.google.com/sql/docs/postgres/import-export/import-export-sql
---

# Export and import data using SQL dump files (Cloud SQL for PostgreSQL)

Export a database to a SQL dump file in Cloud Storage and import a SQL dump file back, using the Console, `gcloud` or the Admin REST API. The export runs `pg_dump` with the options needed for the file to be importable into Cloud SQL.

## Signature / Usage

### Find the instance service account

Look for the `serviceAccountEmailAddress` field in the output.

```bash
gcloud sql instances describe INSTANCE_NAME
```

### Grant the service account access to the bucket

```bash
gcloud storage buckets add-iam-policy-binding gs://BUCKET_NAME \
  --member=serviceAccount:SERVICE-ACCOUNT \
  --role=roles/storage.objectAdmin
```

Snippet taken from the import steps of this same page. Revoke the role afterwards if you don't need it (`gcloud storage buckets remove-iam-policy-binding`).

### Export to a SQL dump file

Use `--offload` for serverless export, `--clean` to include `DROP <object>` statements before objects, `--if-exists` to add `IF EXISTS` to each `DROP`. Remove the parameters you don't need.

```bash
gcloud sql export sql INSTANCE_NAME gs://BUCKET_NAME/sqldumpfile.gz \
--database=DATABASE_NAME \
--offload \
--clean \
--if-exists
```

The `export sql` command includes triggers, functions and stored procedures for PostgreSQL databases.

### Import a SQL dump file

```bash
gcloud sql import sql INSTANCE_NAME gs://BUCKET_NAME/IMPORT_FILE_NAME \
--database=DATABASE_NAME
```

If the command returns an error like `ERROR_RDBMS`, review the permissions.

### REST request bodies

Export endpoint `POST https://sqladmin.googleapis.com/v1/projects/PROJECT_ID/instances/INSTANCE_ID/export` (v1beta4 path: `/sql/v1beta4/projects/...`). Import goes to `.../instances/INSTANCE_ID/import` with `importContext`; set `importContext.importUser` to use a different user.

Adapted (not in the official docs): the source body uses the non-JSON placeholders `TRUE | FALSE` and `[TRUE|FALSE]`; replaced with JSON booleans so the body is valid (`offload` set to `false`, a standard export; `true` enables serverless export at extra cost).

```json
{
  "exportContext":
    {
       "fileType": "SQL",
       "uri": "gs://BUCKET_NAME/PATH_TO_DUMP_FILE",
       "databases": ["DATABASE_NAME"],
       "offload": false,
       "sqlExportOptions": {
        "clean": false,
        "ifExists": false
       }
    }
}
```

## Options / Props

| Role / permission | Needed for |
|-------------------|------------|
| Cloud SQL Editor, or custom role with `cloudsql.instances.get`, `cloudsql.instances.export` | User starting an export |
| Cloud SQL Admin, or custom role with `cloudsql.instances.get`, `cloudsql.instances.import` | User starting an import |
| Instance service account: `storage.objectAdmin`, or `storage.objects.create` (+ `storage.objects.list`, `storage.objects.delete` for parallel export only) | Export |
| Instance service account: `storage.objectAdmin`, or `storage.objects.get` (+ `storage.objects.list` for parallel import only) | Import |

| Field | Description |
|-------|-------------|
| `offload` | Serverless export; extra cost |
| `clean` / `ifExists` (REST: `sqlExportOptions`) | Add `DROP` / `IF EXISTS`; `gcloud` flags `--clean` / `--if-exists` |

## Notes

- Before a large export, ensure at least 25 percent of the database size is free on the instance to avoid aggressive autogrowth affecting availability.
- Import accepts `.gz` or `.sql`. The target database is chosen with `--database` (`gcloud sql import sql`), `importContext.database` (REST) or the Console's Destination field.
- Source inconsistency: the PostgreSQL page's Console import steps say that selecting the destination makes Cloud SQL run a `USE DATABASE_NAME` statement and that a `USE DATABASE_NAME` statement in the dump overrides it. PostgreSQL has no `USE` statement (that text matches the MySQL page); the PostgreSQL page's own gcloud and REST forms select the database with `--database` / `importContext.database`.
- Role and IAM changes can take a few minutes to propagate.
- Large objects (blobs) can make an export consume a lot of memory.
- Import and export can be canceled. PostgreSQL imports in a single transaction, so a canceled import persists no data (stated on https://docs.cloud.google.com/sql/docs/postgres/known-issues).
- Importing and `--clean` exports include destructive DROP statements. Try them on a disposable instance first.
- Corrected from the official docs: REST `"offload": TRUE | FALSE` and `[TRUE|FALSE]` replaced with booleans (`offload` resolved to `false`).
- The source also shows Console flows, REST v1 and v1beta4 curl / PowerShell forms, the response JSON and bucket creation (omitted).
- Distinct from Supabase Postgres (`supabase`) and Cloudflare D1 / Hyperdrive (`cloudflare-storage`); client code belongs to `mssql` / `drizzle`.
- Source: https://docs.cloud.google.com/sql/docs/postgres/import-export/import-export-sql (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/known-issues (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [import-export.md](./import-export.md)
- [known-issues.md](./known-issues.md)
- [troubleshooting.md](./troubleshooting.md)

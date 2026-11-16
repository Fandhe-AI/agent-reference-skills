---
source: https://docs.cloud.google.com/spanner/docs/schema-updates
---

# Make schema updates

Spanner applies schema updates with no downtime as long-running operations. This page lists supported and unsupported updates, which ones need background data validation, expected durations, and schema versioning.

## Signature / Usage

Ways to update a schema: `ALTER TABLE` on the Spanner Studio page of the console, `gcloud spanner databases ddl update` (https://docs.cloud.google.com/sdk/gcloud/reference/spanner/databases/ddl/update), client libraries, the `projects.instances.databases.updateDdl` REST API, or the `UpdateDatabaseDdl` RPC.

### Updates that require data validation

Example setup (GoogleSQL, with a `music.proto` defining `Songwriter` and `RecordLabel`):

```googlesql
CREATE PROTO BUNDLE (
  googlesql.example.music.Songwriter,
  googlesql.example.music.RecordLabel,
);

CREATE TABLE Songwriters (
  Id         INT64 NOT NULL,
  FirstName  STRING(1024),
  LastName   STRING(1024),
  Nickname   STRING(MAX),
  OpaqueData BYTES(MAX),
  SongWriter googlesql.example.music.Songwriter
) PRIMARY KEY (Id);

CREATE TABLE Albums (
  SongwriterId     INT64 NOT NULL,
  AlbumId          INT64 NOT NULL,
  AlbumTitle       STRING(MAX),
  Label            INT32
) PRIMARY KEY (SongwriterId, AlbumId);
```

Allowed but validated in the background (separate examples; run each on its own):

Adding the `NOT NULL` annotation to a non-key column:

```sql
ALTER TABLE Songwriters ALTER COLUMN Nickname STRING(MAX) NOT NULL;
```

Reducing the length of a column:

```sql
ALTER TABLE Songwriters ALTER COLUMN FirstName STRING(10);
```

Altering from `BYTES` to `STRING`:

```sql
ALTER TABLE Songwriters ALTER COLUMN OpaqueData STRING(MAX);
```

Altering from `INT64/INT32` to `ENUM`:

```sql
ALTER TABLE Albums ALTER COLUMN Label googlesql.example.music.RecordLabel;
```

Enabling commit timestamps on an existing `TIMESTAMP` column (the setup `Albums` table above has no `LastUpdateTime` column; this example assumes one exists):

```sql
ALTER TABLE Albums ALTER COLUMN LastUpdateTime SET OPTIONS (allow_commit_timestamp = true);
```

## Options / Props

### Supported updates (existing database)

| Update | Constraint |
|--------|------------|
| Add / drop named schema | — |
| Create table | Columns in new tables can be `NOT NULL`. |
| Delete table | Only if no other tables are interleaved within it and it has no secondary indexes. |
| Create / delete table with foreign key; add / remove foreign key | — |
| Add non-key column | New non-key columns cannot be `NOT NULL` (per this page; the DDL references allow `NOT NULL` with a `DEFAULT` or stored generated column, see Notes). |
| Drop non-key column | Unless used by a secondary index, foreign key, stored generated column, or check constraint. |
| Add `NOT NULL` to non-key column | Excludes `ARRAY` columns. |
| Remove `NOT NULL` from non-key column | — |
| `STRING` ↔ `BYTES`; `PROTO` ↔ `BYTES` | — |
| Change proto message type of `PROTO` column | — |
| `ALTER PROTO BUNDLE` | Add `ENUM` values, rename values; change messages arbitrarily if modified fields are not table keys and existing data satisfies new constraints. |
| Change `STRING` / `BYTES` length (including to `MAX`) | Not for a primary key column inherited by child tables. |
| Change `ARRAY<STRING>` / `ARRAY<BYTES>` / `ARRAY<PROTO>` length | Up to the maximum allowed. |
| Enable / disable commit timestamps | Value and primary key columns. |
| Secondary index, check constraint, stored generated column | Add or remove. |
| Optimizer statistics package, views, sequences, database roles and grants, column default values, change streams, ML models | Create / manage. |
| Database options | For example `default_leader`, `version_retention_period`. |

### Unsupported updates

- Removing `ENUM` values from proto enums when a `PROTO` field of the `ENUM` type is referenced by a table or index key (removal from enums used by `ENUM<>` columns is supported, including as keys).
- Changing `STRING(36)` to `UUID` or `UUID` to `STRING(36)`.

### Estimated durations

| Schema operation | Estimated duration |
|---|---|
| `CREATE TABLE` | Minutes |
| `CREATE INDEX` | Minutes to hours if the base table already exists; minutes if executed with the base table's `CREATE TABLE`. |
| `DROP TABLE` | Minutes |
| `DROP INDEX` | Minutes |
| `ALTER TABLE ... ADD COLUMN` | Minutes |
| `ALTER TABLE ... ALTER COLUMN` | Minutes to hours if background validation is required; minutes otherwise. |
| `ALTER TABLE ... DROP COLUMN` | Minutes |
| `ANALYZE` | Minutes to hours, depending on database size. |

### Updates requiring validation

Adding `NOT NULL`; reducing column length; `BYTES` to `STRING`; `INT64` / `INT32` to `ENUM`; removing values from an enum definition; enabling commit timestamps on an existing `TIMESTAMP` column; adding a check constraint, stored generated column, or foreign key; creating a table with a foreign key. They fail if existing data violates the new constraint.

## Notes

- Validation runs in the background at lower priority than production traffic and can take minutes to many hours (depends on dataset size, instance compute capacity, and load). Conflicting schema updates to the affected entities are disallowed meanwhile.
- Behavior can change before completion: with `NOT NULL`, Spanner almost immediately rejects writes that use `NULL`, even if the update later fails validation.
- Cancel a long-running validation with `projects.instances.databases.operations.cancel` or `gcloud spanner operations` (https://docs.cloud.google.com/sdk/gcloud/reference/spanner/operations).
- Schema updates are also validated against existing view definitions; a failing validation fails the update.
- Schema versions: Spanner keeps older versions to serve reads; a statement can produce several versions, and old versions use server and storage resources until they expire.
- Change streams: after changing a watched column's type, later records reflect the new type in `column_types` and `old_values`; `new_values` always matches the current type; earlier records are unaffected.
- Dropping a table deletes all of its rows; dropping an index removes only the index (table rows are kept) and re-creating it needs a full backfill. Not from the source: recovering a dropped table's data depends on PITR within the version retention period (the PITR page recovers a specific table by exporting it from an earlier timestamp; it doesn't say this covers a table that was since dropped) or on a backup restored into a new database (https://docs.cloud.google.com/spanner/docs/pitr). Try drops on a disposable database first. The source shows no `DROP` statement.
- Source inconsistency: this page says "New non-key columns cannot be `NOT NULL`", but both DDL references allow `NOT NULL` in `ALTER TABLE ... ADD COLUMN` when the column has `DEFAULT (expression)` or `AS (expression) STORED` (PostgreSQL: `DEFAULT expression` or `GENERATED ALWAYS AS (expression) STORED`); the value is backfilled into existing rows. Without one of those, adding a `NOT NULL` column to an existing table fails (https://docs.cloud.google.com/spanner/docs/reference/standard-sql/data-definition-language, https://docs.cloud.google.com/spanner/docs/reference/postgresql/data-definition-language).
- Spanner is Google Cloud's distributed relational database; it is not a PostgreSQL server even with the PostgreSQL interface, and is distinct from `supabase` and `drizzle`. Client library patterns: `gcp-client-libraries`.
- Source: https://docs.cloud.google.com/spanner/docs/schema-updates (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [schema-and-data-model.md](./schema-and-data-model.md)
- [foreign-keys-overview.md](./foreign-keys-overview.md)
- Schema updates best practices: https://docs.cloud.google.com/spanner/docs/schema-updates-best-practices

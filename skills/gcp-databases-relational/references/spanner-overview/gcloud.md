---
source: https://docs.cloud.google.com/spanner/docs/getting-started/gcloud
---

# Getting started with Spanner using the gcloud CLI

Create a Spanner instance, database and schema, write data, query it with SQL, then clean up, all with the gcloud CLI. The steps apply to GoogleSQL-dialect and PostgreSQL-dialect databases.

## Signature / Usage

### Before you begin

Complete the Spanner setup (default project, billing, Cloud Spanner API enabled) and run `gcloud auth application-default login` to set up credentials. Set the default project:

```bash
gcloud config set project PROJECT_ID
```

Without a default project, pass `--project PROJECT_ID` as the first argument to `gcloud` (for example `gcloud --project=PROJECT_ID spanner instance-configs list`).

### Instance configurations and instance

```bash
gcloud spanner instance-configs list
```

```bash
gcloud spanner instances create test-instance --config=regional-us-central1 \
    --description="My Instance" --nodes=1
```

Set the default instance:

```bash
gcloud config set spanner/instance test-instance
```

### Create a database

GoogleSQL (default dialect):

```bash
gcloud spanner databases create example-db
```

PostgreSQL:

```bash
gcloud spanner databases create example-db --database-dialect=POSTGRESQL
```

### Update the schema (GoogleSQL)

```bash
gcloud spanner databases ddl update example-db \
--ddl='CREATE TABLE Singers ( SingerId INT64 NOT NULL, FirstName STRING(1024), LastName STRING(1024), SingerInfo BYTES(MAX) ) PRIMARY KEY (SingerId)'

gcloud spanner databases ddl update example-db \
--ddl='CREATE TABLE Albums ( SingerId INT64 NOT NULL, AlbumId INT64 NOT NULL, AlbumTitle STRING(MAX)) PRIMARY KEY (SingerId, AlbumId), INTERLEAVE IN PARENT Singers ON DELETE CASCADE'
```

### Update the schema (PostgreSQL)

```bash
gcloud spanner databases ddl update example-db \
--ddl='CREATE TABLE Singers ( SingerId bigint NOT NULL, FirstName varchar(1024), LastName varchar(1024), SingerInfo bytea, PRIMARY KEY (SingerId) )'

gcloud spanner databases ddl update example-db \
--ddl='CREATE TABLE Albums ( SingerId bigint NOT NULL, AlbumId bigint NOT NULL, AlbumTitle varchar, PRIMARY KEY (SingerId, AlbumId) ) INTERLEAVE IN PARENT Singers ON DELETE CASCADE'
```

### Write data (GoogleSQL, mutations)

```bash
gcloud spanner rows insert --database=example-db \
  --table=Singers \
  --data=SingerId=1,FirstName=Marc,LastName=Richards

gcloud spanner rows insert --database=example-db \
  --table=Singers \
  --data=SingerId=2,FirstName=Catalina,LastName=Smith

gcloud spanner rows insert --database=example-db \
  --table=Singers \
  --data=SingerId=3,FirstName=Alice,LastName=Trentor

gcloud spanner rows insert --database=example-db \
  --table=Albums \
  --data=SingerId=1,AlbumId=1,AlbumTitle="Total Junk"

gcloud spanner rows insert --database=example-db \
  --table=Albums \
  --data=SingerId=2,AlbumId=1,AlbumTitle="Green"

gcloud spanner rows insert --database=example-db \
  --table=Albums \
  --data=^:^SingerId=2:AlbumId=2:AlbumTitle="Go, Go, Go"
```

`^:^` sets a colon delimiter (the default is a comma) so the last album title can contain a comma.

### Query

```bash
gcloud spanner databases execute-sql example-db \
    --sql='SELECT SingerId, AlbumId, AlbumTitle FROM Albums'
```

### Clean up

Deleting the database deletes its data (its backups, if any, survive and restore into a new database), and deleting the instance drops all of its databases and is not reversible (see Notes). Run them only against the tutorial resources.

```bash
gcloud spanner databases delete example-db
```

```bash
gcloud spanner instances delete test-instance
```

## Options / Props

| Flag | Command | Description |
|------|---------|-------------|
| `--config` | `instances create` | Instance configuration, for example `regional-us-central1` |
| `--description` | `instances create` | Display name; the instance ID and display name must be unique within a project |
| `--nodes` | `instances create` | Compute capacity in nodes |
| `--database-dialect=POSTGRESQL` | `databases create` | PostgreSQL dialect; omit for GoogleSQL |
| `--ddl` | `databases ddl update` | DDL statement to run |
| `--table`, `--data` | `rows insert` | Target table and comma-delimited `col=value` list |
| `--sql` | `databases execute-sql` | SQL to run |

## Notes

- Use the instance ID, not the display name, in gcloud commands.
- Known issue: gcloud cannot look up table names when writing mutations to a PostgreSQL database, so use DML there.
- Deleting a database or instance is destructive; the source states that deleting an instance is not reversible and drops all its databases (an instance with backups can't be deleted; a database's backups outlive it and restore into a new database, see `backup.md`). Try it on a disposable instance first. Disabling the Cloud Billing API does not stop charges.
- Spanner is Google Cloud's distributed relational database, not a PostgreSQL server even with the PostgreSQL interface; distinct from `supabase` and `drizzle`. gcloud install and auth are in `gcp-cli` and `gcp-foundation`.
- The source also shows `gcloud spanner operations list --type=DATABASE_UPDATE_DDL` / `operations describe` to check a schema-change operation (with a sample output) and a 90-day free trial pointer. The source's `describe` example passes a full path `projects/PROJECT-NAME/...` and defines `PROJECT-NAME` as "The project name."; resource names take the project ID, not the display name (editor's note; not from a Google source). The help form is `gcloud spanner operations describe OPERATION-ID --instance=test-instance --database=example-db`.
- The source also shows the PostgreSQL write step as six `gcloud spanner databases execute-sql example-db --sql="INSERT INTO ..."` DML statements (omitted here for size).
- Source: https://docs.cloud.google.com/spanner/docs/getting-started/gcloud (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [instances.md](./instances.md)
- [databases.md](./databases.md)
- [postgresql-interface.md](./postgresql-interface.md)

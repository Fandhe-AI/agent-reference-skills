---
source: https://docs.cloud.google.com/spanner/docs/getting-started/python
---

# Getting started with Spanner in Python (setup, database, cleanup)

Set up the Python samples, create a `test-instance` / `example-db` database with the `Singers` and `Albums` tables (GoogleSQL dialect shown), create the `spanner.Client` used by every other call, and clean up afterwards. Writes and reads are in [python-write-query-read.md](./python-write-query-read.md); schema, indexes and transactions are in [python-indexes-transactions.md](./python-indexes-transactions.md).

## Signature / Usage

### Prepare the environment

Run `gcloud auth application-default login` first (see Notes). Then:

```bash
git clone https://github.com/googleapis/google-cloud-python.git
```

```bash
cd google-cloud-python/packages/google-cloud-spanner/samples/samples
```

```bash
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```

### Create the database (sample runner)

```bash
python snippets.py test-instance --database-id example-db create_database
```

PostgreSQL dialect: `python pg_snippets.py test-instance --database-id example-db create_database`. Expected output: `Created database example-db on instance test-instance`.

### Create the database (code, GoogleSQL)

```python
def create_database(instance_id, database_id):
    """Creates a database and tables for sample data."""
    from google.cloud.spanner_admin_database_v1.types import spanner_database_admin

    spanner_client = spanner.Client()
    database_admin_api = spanner_client.database_admin_api

    request = spanner_database_admin.CreateDatabaseRequest(
        parent=database_admin_api.instance_path(spanner_client.project, instance_id),
        create_statement=f"CREATE DATABASE `{database_id}`",
        extra_statements=[
            """CREATE TABLE Singers (
            SingerId     INT64 NOT NULL,
            FirstName    STRING(1024),
            LastName     STRING(1024),
            SingerInfo   BYTES(MAX),
            FullName   STRING(2048) AS (
                ARRAY_TO_STRING([FirstName, LastName], " ")
            ) STORED
        ) PRIMARY KEY (SingerId)""",
            """CREATE TABLE Albums (
            SingerId     INT64 NOT NULL,
            AlbumId      INT64 NOT NULL,
            AlbumTitle   STRING(MAX)
        ) PRIMARY KEY (SingerId, AlbumId),
        INTERLEAVE IN PARENT Singers ON DELETE CASCADE""",
        ],
    )

    operation = database_admin_api.create_database(request=request)

    print("Waiting for operation to complete...")
    database = operation.result(OPERATION_TIMEOUT_SECONDS)

    print(
        "Created database {} on instance {}".format(
            database.name,
            database_admin_api.instance_path(spanner_client.project, instance_id),
        )
    )

```

### Create a database client

```python
# Imports the Google Cloud Client Library.
from google.cloud import spanner

# Your Cloud Spanner instance ID.
# instance_id = "my-instance-id"
#
# Your Cloud Spanner database ID.
# database_id = "my-database-id"
# Instantiate a client.
spanner_client = spanner.Client()

# Get a Cloud Spanner instance by ID.
instance = spanner_client.instance(instance_id)

# Get a Cloud Spanner database by ID.
database = instance.database(database_id)

# Execute a simple SQL statement.
with database.snapshot() as snapshot:
    results = snapshot.execute_sql("SELECT 1")

    for row in results:
        print(row)
```

### Cleanup

Delete the database (deleting an instance drops all of its databases automatically, but the instance keeps incurring charges until deleted):

```bash
gcloud spanner databases delete example-db --instance=test-instance
```

Delete the instance:

```bash
gcloud spanner instances delete test-instance
```

## Options / Props

| Item | Value | Description |
|------|-------|-------------|
| Instance name | `test-instance` | Name the tutorial assumes; create it via gcloud CLI, console or a client library |
| Database name | `example-db` | Passed as `--database-id` to the sample runners |
| Runner scripts | `snippets.py` (GoogleSQL), `pg_snippets.py` (PostgreSQL) | `python <script> <instance> --database-id <db> <command>` |
| Prerequisites | Cloud Spanner API enabled, billing enabled, ADC | From the Spanner "Set up" page |

## Notes

- Source: https://docs.cloud.google.com/spanner/docs/getting-started/python (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Client-library basics (ADC, retries, the emulator) belong to the `gcp-client-libraries` skill; this page only covers the Spanner tutorial.
- Spanner is Google Cloud's distributed relational database, not a PostgreSQL server even with the PostgreSQL interface; distinct from `supabase` and `drizzle`.
- Both `delete` commands are destructive. Deleting `example-db` removes the database and all of its data; deleting `test-instance` is not reversible and drops all of its databases (an instance with backups can't be deleted; see `spanner-operations/backup.md`). Try them on a disposable instance or database first. The source suggests a throwaway project for the whole tutorial.
- Spanner is billable; the source recommends a new Google Cloud project if you do not plan to keep the resources.
- Create one `Client` at startup and reuse it for reads, writes and transactions.
- The `create_database` snippet uses `spanner` (`from google.cloud import spanner`, shown in the client block below) and `OPERATION_TIMEOUT_SECONDS`, which the source does not define; import `spanner` and pass your own timeout before running it standalone. Not from the source: `database_id` is interpolated into the `CREATE DATABASE` DDL, so pass only a trusted database ID, never unvalidated user input.
- The source also shows the PostgreSQL-dialect `create_database` code (create the database, then `create_table_using_ddl`) and the Console delete steps; they are omitted here.

## Related

- [python-write-query-read.md](./python-write-query-read.md)
- [python-indexes-transactions.md](./python-indexes-transactions.md)
- [nodejs-setup-database.md](./nodejs-setup-database.md)

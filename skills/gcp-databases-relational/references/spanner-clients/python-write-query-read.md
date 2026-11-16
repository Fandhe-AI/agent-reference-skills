---
source: https://docs.cloud.google.com/spanner/docs/getting-started/python
---

# Getting started with Spanner in Python (write, query, read)

Write rows with DML in a read-write transaction (`execute_update()` inside `run_in_transaction`), query with `Snapshot.execute_sql()` or the gcloud CLI, and read with `Snapshot.read()` and a `KeySet`. Setup is in [python-setup-database.md](./python-setup-database.md).

## Signature / Usage

### Write data with DML

```python
# instance_id = "your-spanner-instance"
# database_id = "your-spanner-db-id"
spanner_client = spanner.Client()
instance = spanner_client.instance(instance_id)
database = instance.database(database_id)

def insert_singers(transaction):
    row_ct = transaction.execute_update(
        "INSERT INTO Singers (SingerId, FirstName, LastName) VALUES "
        "(12, 'Melissa', 'Garcia'), "
        "(13, 'Russell', 'Morales'), "
        "(14, 'Jacqueline', 'Long'), "
        "(15, 'Dylan', 'Shaw')"
    )
    print("{} record(s) inserted.".format(row_ct))

database.run_in_transaction(insert_singers)
```

```bash
python snippets.py test-instance --database-id example-db insert_with_dml
```

### Query on the command line

```bash
gcloud spanner databases execute-sql example-db --instance=test-instance \
    --sql='SELECT SingerId, AlbumId, AlbumTitle FROM Albums'
```

### Query with `execute_sql()`

```python
def query_data(instance_id, database_id):
    """Queries sample data from the database using SQL."""
    spanner_client = spanner.Client()
    instance = spanner_client.instance(instance_id)
    database = instance.database(database_id)

    with database.snapshot() as snapshot:
        results = snapshot.execute_sql(
            "SELECT SingerId, AlbumId, AlbumTitle FROM Albums"
        )

        for row in results:
            print("SingerId: {}, AlbumId: {}, AlbumTitle: {}".format(*row))

```

```bash
python snippets.py test-instance --database-id example-db query_data
```

### Query with a SQL parameter (GoogleSQL)

```python
# instance_id = "your-spanner-instance"
# database_id = "your-spanner-db-id"
spanner_client = spanner.Client()
instance = spanner_client.instance(instance_id)
database = instance.database(database_id)

with database.snapshot() as snapshot:
    results = snapshot.execute_sql(
        "SELECT SingerId, FirstName, LastName FROM Singers "
        "WHERE LastName = @lastName",
        params={"lastName": "Garcia"},
        param_types={"lastName": spanner.param_types.STRING},
    )

    for row in results:
        print("SingerId: {}, FirstName: {}, LastName: {}".format(*row))
```

### Read with `Snapshot.read()`

```python
def read_data(instance_id, database_id):
    """Reads sample data from the database."""
    spanner_client = spanner.Client()
    instance = spanner_client.instance(instance_id)
    database = instance.database(database_id)

    with database.snapshot() as snapshot:
        keyset = spanner.KeySet(all_=True)
        results = snapshot.read(
            table="Albums", columns=("SingerId", "AlbumId", "AlbumTitle"), keyset=keyset
        )

        for row in results:
            print("SingerId: {}, AlbumId: {}, AlbumTitle: {}".format(*row))

```

```bash
python snippets.py test-instance --database-id example-db read_data
```

## Options / Props

| Sample command | Runner | Purpose |
|----------------|--------|---------|
| `insert_with_dml` | `snippets.py` | Insert 4 Singers with DML (`4 record(s) inserted.`) |
| `insert_data` | `snippets.py` | Insert Singers and Albums with a mutation batch |
| `query_data` | `snippets.py` | `SELECT` from Albums |
| `query_data_with_parameter` | `snippets.py` / `pg_snippets.py` | Parameterized query on `LastName` |
| `read_data` | `snippets.py` | `Snapshot.read()` of Albums |

## Notes

- Source: https://docs.cloud.google.com/spanner/docs/getting-started/python (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Client-library basics (ADC, retries, the emulator) belong to the `gcp-client-libraries` skill.
- Spanner is Google Cloud's distributed relational database, not a PostgreSQL server even with the PostgreSQL interface; distinct from `supabase` and `drizzle`.
- All mutations in one batch are applied atomically across rows and tables. There are limits to commit size; see https://docs.cloud.google.com/spanner/quotas#limits-for
- Parameterized queries can be cached and reused, which reduces compilation costs: https://docs.cloud.google.com/spanner/docs/sql-best-practices#query-parameters
- `snapshot()` is used in a `with` statement; the PostgreSQL parameter form uses `$1` with `params={"p1": ...}` and `param_types={"p1": ...}` and is omitted here.
- The source also shows the mutation insert sample (`with database.batch() as batch: batch.insert(table=..., columns=..., values=[...])`, run with `insert_data`), the GoogleSQL pipe-syntax gcloud query (`FROM Albums |> SELECT ...`) and the expected outputs; they are omitted here.

## Related

- [python-setup-database.md](./python-setup-database.md)
- [python-indexes-transactions.md](./python-indexes-transactions.md)
- [nodejs-write-query-read.md](./nodejs-write-query-read.md)

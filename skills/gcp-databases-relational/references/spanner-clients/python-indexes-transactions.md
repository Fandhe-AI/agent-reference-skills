---
source: https://docs.cloud.google.com/spanner/docs/getting-started/python
---

# Getting started with Spanner in Python (schema, indexes, transactions)

Add a column and secondary indexes with `gcloud spanner databases ddl update`, read through an index with the `index` argument of `Snapshot.read()` (code omitted, see Notes), update data in a read-write transaction, and run consistent reads in a read-only snapshot (sample runner only; the code is on the Spanner transactions page). Earlier steps: [python-write-query-read.md](./python-write-query-read.md).

## Signature / Usage

### Schema updates on the command line

```bash
gcloud spanner databases ddl update example-db --instance=test-instance \
    --ddl='ALTER TABLE Albums ADD COLUMN MarketingBudget INT64'
```

PostgreSQL dialect uses `BIGINT` instead of `INT64`. Expected output: `Schema updating...done.`

```bash
gcloud spanner databases ddl update example-db --instance=test-instance \
    --ddl='CREATE INDEX AlbumsByAlbumTitle ON Albums(AlbumTitle)'
```

Adapted (not in the official docs): the source command lacks the closing single quote after `(MarketingBudget)`; it is added so the shell accepts the command.

```bash
gcloud spanner databases ddl update example-db --instance=test-instance \
    --ddl='CREATE INDEX AlbumsByAlbumTitle2 ON Albums(AlbumTitle) STORING (MarketingBudget)'
```

PostgreSQL dialect replaces `STORING` with `INCLUDE` in the same command.

### Update data in a read-write transaction

```python
# instance_id = "your-spanner-instance"
# database_id = "your-spanner-db-id"

spanner_client = spanner.Client()
instance = spanner_client.instance(instance_id)
database = instance.database(database_id)

def transfer_budget(transaction):
    # Transfer marketing budget from one album to another. Performed in a
    # single transaction to ensure that the transfer is atomic.
    second_album_result = transaction.execute_sql(
        "SELECT MarketingBudget from Albums " "WHERE SingerId = 2 and AlbumId = 2"
    )
    second_album_row = list(second_album_result)[0]
    second_album_budget = second_album_row[0]

    transfer_amount = 200000

    # Transaction will only be committed if this condition still holds at
    # the time of commit. Otherwise it will be aborted and the callable
    # will be rerun by the client library
    if second_album_budget >= transfer_amount:
        first_album_result = transaction.execute_sql(
            "SELECT MarketingBudget from Albums "
            "WHERE SingerId = 1 and AlbumId = 1"
        )
        first_album_row = list(first_album_result)[0]
        first_album_budget = first_album_row[0]

        second_album_budget -= transfer_amount
        first_album_budget += transfer_amount

        # Update first album
        transaction.execute_update(
            "UPDATE Albums "
            "SET MarketingBudget = @AlbumBudget "
            "WHERE SingerId = 1 and AlbumId = 1",
            params={"AlbumBudget": first_album_budget},
            param_types={"AlbumBudget": spanner.param_types.INT64},
        )

        # Update second album
        transaction.execute_update(
            "UPDATE Albums "
            "SET MarketingBudget = @AlbumBudget "
            "WHERE SingerId = 2 and AlbumId = 2",
            params={"AlbumBudget": second_album_budget},
            param_types={"AlbumBudget": spanner.param_types.INT64},
        )

        print(
            "Transferred {} from Album2's budget to Album1's".format(
                transfer_amount
            )
        )

database.run_in_transaction(transfer_budget)
```

```bash
python snippets.py test-instance --database-id example-db write_with_dml_transaction
```

### Read-only transaction

```bash
python snippets.py test-instance --database-id example-db read_only_transaction
```

## Options / Props

| Sample command | Purpose |
|----------------|---------|
| `add_column` | `ALTER TABLE Albums ADD COLUMN MarketingBudget INT64` |
| `update_data` | Set `MarketingBudget` to 100000 for Albums(1, 1) and 500000 for Albums(2, 2) |
| `query_data_with_new_column` | Query the new column |
| `write_with_dml_transaction` | Transfer 200000 between albums in one read-write transaction |
| `add_index` / `read_data_with_index` | Create and read `AlbumsByAlbumTitle` |
| `add_storing_index` / `read_data_with_storing_index` | Create and read `AlbumsByAlbumTitle2` with `STORING (MarketingBudget)` |
| `read_only_transaction` | Read-only snapshot (`snapshot(multi_use=True)`) |

All run as `python snippets.py test-instance --database-id example-db <command>`.

## Notes

- Source: https://docs.cloud.google.com/spanner/docs/getting-started/python (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Client-library basics (ADC, retries, the emulator) belong to the `gcp-client-libraries` skill.
- Spanner is Google Cloud's distributed relational database, not a PostgreSQL server even with the PostgreSQL interface; distinct from `supabase` and `drizzle`.
- Corrected from the official docs: the `STORING` gcloud command ended `... (MarketingBudget)` without the closing `'`; the PostgreSQL `INCLUDE` form in the source has the same missing quote.
- Schema updates run while the database keeps serving traffic; no offline time and no table or column locks. Adding an index backfills existing data automatically and can take a few minutes.
- After an index exists, SQL queries use it automatically when it is likely faster; `Snapshot.read()` requires the `index` argument. The read interface cannot join an index with the base table, so columns not in the index need a `STORING` (PostgreSQL: `INCLUDE`) index.
- The transfer callable can be rerun by the client library when the transaction aborts (stated in the sample's code comment). Spanner might execute a transaction's operations multiple times, so side effects (for example changes to external systems) might occur multiple times; keep them out of real transaction functions (from the Spanner transactions page). You can also update data with mutations: https://docs.cloud.google.com/spanner/docs/modify-mutation-api#updating_rows_in_a_table
- Read-only transactions observe a consistent prefix of the commit history, so both reads in the snapshot return the same data. The `read_only_transaction` code (`database.snapshot(multi_use=True)` with an `execute_sql` and a `read`) is on https://docs.cloud.google.com/spanner/docs/transactions (Read-only transactions, Python).
- Source: https://docs.cloud.google.com/spanner/docs/transactions (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- The source also shows the client-library `update_ddl` samples (`add_column`, `add_index`, `add_storing_index`), `update_data` (mutation `batch.update`), `query_data_with_new_column`, `read_data_with_index` (`snapshot.read(table="Albums", columns=("AlbumId", "AlbumTitle"), keyset=spanner.KeySet(all_=True), index="AlbumsByAlbumTitle")`) and `read_data_with_storing_index`; they are omitted here.

## Related

- [python-setup-database.md](./python-setup-database.md)
- [python-write-query-read.md](./python-write-query-read.md)
- [nodejs-indexes-transactions.md](./nodejs-indexes-transactions.md)

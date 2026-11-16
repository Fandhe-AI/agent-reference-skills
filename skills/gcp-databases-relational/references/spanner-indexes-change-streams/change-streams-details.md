---
source: https://docs.cloud.google.com/spanner/docs/change-streams/details
---

# Change streams partitions, records, and queries

Low-level model for reading Spanner change streams (GoogleSQL and PostgreSQL dialects): split-based partitions, the three record types (data change, heartbeat, child partitions), the `READ_<stream>` read function, and the query workflow. Applications that read through Dataflow do not need this model.

## Signature / Usage

### Read function (GoogleSQL)

Query with the `ExecuteStreamingSql` API. Spanner creates the read function `READ_change_stream_name` with the stream.

```googlesql
SELECT ChangeRecord
FROM READ_SingersNameStream (
    start_timestamp,
    end_timestamp,
    partition_token,
    heartbeat_milliseconds,
    read_options
)
```

### Read function (PostgreSQL)

The function is `spanner.read_json_change_stream_name`.

```postgresql
SELECT *
FROM "spanner"."read_json_SingersNameStream" (
    start_timestamp,
    end_timestamp,
    partition_token,
    heartbeat_milliseconds,
    read_options
)
```

### First query (partition_token NULL)

```googlesql
SELECT ChangeRecord FROM READ_SingersNameStream (
  start_timestamp => "2022-05-01T09:00:00Z",
  end_timestamp => NULL,
  partition_token => NULL,
  heartbeat_milliseconds => 10000
);
```

### Query a child partition

Use the child record's `start_timestamp`, the same `end_timestamp` and the same heartbeat interval. Run one query per child token, in parallel.

```googlesql
SELECT ChangeRecord FROM READ_SingersNameStream (
  start_timestamp => "2022-05-01T09:00:01Z",
  end_timestamp => NULL,
  partition_token => "child_token_1",
  heartbeat_milliseconds => 10000
);
```

## Options / Props

### Read function arguments (GoogleSQL types; PostgreSQL types in parentheses)

| Argument | Type | Required | Description |
|---|---|---|---|
| `start_timestamp` | `TIMESTAMP` (`timestamp with time zone`) | Required | Returns records with `commit_timestamp` >= this value. Must be within the retention period, <= current time, and >= the stream's creation timestamp. |
| `end_timestamp` | `TIMESTAMP` (`timestamp with time zone`) | Optional (default `NULL`) | Returns records with `commit_timestamp` <= this value; must be within the retention period and >= `start_timestamp`. If `NULL`, the query runs until all records are returned or the connection is terminated. |
| `partition_token` | `STRING` (`text`) | Optional (default `NULL`) | Partition to query, taken from child partition records. `NULL` means the first query with no tokens yet. |
| `heartbeat_milliseconds` | `INT64` (`bigint`) | Required | Heartbeat interval when no transactions commit in the partition. Between `100` (100 ms) and `300,000` (five minutes). |
| `read_options` | `ARRAY` (`text[]`) | Optional (default `NULL`) | Reserved for future use; the only permitted value is `NULL`. |

### Record envelope

| Dialect | `ChangeRecord` shape |
|---|---|
| GoogleSQL | One column of `ARRAY<STRUCT<...>>` with a single element: `STRUCT<data_change_record, heartbeat_record, child_partitions_record>`, each `ARRAY<STRUCT<...>>`; only one is populated per row. |
| PostgreSQL | One `JSON` column with keys `data_change_record`, `heartbeat_record`, `child_partitions_record`; only one key exists per row. |

### Data change record fields

| Field | Type (GoogleSQL) | Description |
|---|---|---|
| `commit_timestamp` | `TIMESTAMP` | When the change was committed. |
| `record_sequence` | `STRING` | Unique, monotonically increasing (not necessarily contiguous) within a transaction; sort by it per `server_transaction_id`. |
| `server_transaction_id` | `STRING` | Globally unique transaction string; not the Spanner API transaction id. |
| `is_last_record_in_transaction_in_partition` | `BOOL` | Last record of the transaction in this partition. |
| `table_name` | `STRING` | Affected table. |
| `value_capture_type` | `STRING` | `OLD_AND_NEW_VALUES` (default), `NEW_ROW`, `NEW_VALUES`, `NEW_ROW_AND_OLD_VALUES`. |
| `column_types` | array of `{name, type, is_primary_key, ordinal_position}` | Column name, type, primary-key flag, 1-based schema position. |
| `mods` | array of `{keys, new_values, old_values}` | Primary key values plus tracked old/new values; contents depend on `value_capture_type`. `new_values` / `old_values` hold only non-key columns. |
| `mod_type` | `STRING` | `INSERT`, `UPDATE`, or `DELETE`. |
| `number_of_records_in_transaction` | `INT64` | Data change records for the transaction across all partitions. |
| `number_of_partitions_in_transaction` | `INT64` | Partitions returning records for the transaction. |
| `transaction_tag` | `STRING` | Transaction tag of the transaction. |
| `is_system_transaction` | `BOOL` | Whether it is a system transaction. |

### Other record fields

| Record | Field | Description |
|---|---|---|
| Heartbeat | `timestamp` | All changes with `commit_timestamp` <= this have been returned; later records in the partition are higher. |
| Child partitions | `start_timestamp` | Child partition records start at this commit timestamp; query children with `start_timestamp` >= this. |
| Child partitions | `record_sequence` | Orders records with the same `start_timestamp`; partition token + `start_timestamp` + `record_sequence` identify a record. |
| Child partitions | `child_partitions` | Array of `{token, parent_partition_tokens}`. |

## Notes

- Change stream records are written synchronously in the same transaction as the data change, co-located with the changed split, so a committed transaction has captured the change.
- A partition holds an immutable key range for a time range; partitions split and merge dynamically. Within one partition records come in commit-timestamp order, each exactly once; ordering across partitions is not guaranteed. A given primary key appears in only one partition per time range.
- Process child-partition records only after all parent partitions are done, to keep per-key commit order. For a merged child (e.g. `child_token_4`), create only one query and appoint one parent to schedule it.
- Heartbeats let you synchronize partition readers: once every reader has seen a heartbeat, data or child record >= timestamp A, all records at or before A have arrived.
- Run queries with `ExecuteStreamingSql`, a single-use read-only transaction and a strong timestamp bound. Other `TransactionOptions` are invalid. If `return_read_timestamp` is `true`, the returned timestamp is `kint64max - 1`; discard it. No request deadline is needed.
- All records within the retention period are readable; `start_timestamp` / `end_timestamp` must fall inside it.
- Multiple transactions can share a commit timestamp. Use `commit_timestamp`, `server_transaction_id` and `record_sequence` for ordering.
- Example: a merged child `child_token_4` has `"parent_partition_tokens": ["child_token_2", "child_token_3"]` with `start_timestamp` `2022-05-01T09:30:15Z`; the PostgreSQL form of every query (for example `"spanner"."read_json_SingersNameStream"('2022-05-01T09:00:01Z', NULL, 'child_token_1', 10000, NULL)`) passes the same arguments positionally.
- In a data change record with value capture type `NEW_VALUES`, only new values are populated; if only `LastUpdate` was modified, only that column is returned in `new_values` and `old_values` is empty.
- The source's record examples (data change, heartbeat and child partitions records) are illustrative fragments with `//` comments, unquoted keys and missing or trailing commas, not valid JSON; they are not reproduced here and the field tables above hold their contents.
- The source also shows full examples for the other value capture types (`OLD_AND_NEW_VALUES`, `NEW_ROW`, `NEW_ROW_AND_OLD_VALUES`), the PostgreSQL field type table, the other child-token queries, and Java helper methods; the Dataflow connector parsing examples are in Apache Beam SpannerIO. Change stream creation DDL and retention configuration are not in this page.
- Spanner is Google Cloud's distributed relational database, not a PostgreSQL server even with the PostgreSQL interface; distinct from `supabase` and `drizzle`.
- Source: https://docs.cloud.google.com/spanner/docs/change-streams/details (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [secondary-indexes.md](./secondary-indexes.md)
- Change streams overview: https://docs.cloud.google.com/spanner/docs/change-streams
- Dataflow reader: https://docs.cloud.google.com/spanner/docs/change-streams/use-dataflow

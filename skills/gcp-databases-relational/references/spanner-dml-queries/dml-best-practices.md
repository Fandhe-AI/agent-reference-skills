---
source: https://docs.cloud.google.com/spanner/docs/dml-best-practices
---

# Data Manipulation Language (DML) best practices

Best practices for using DML and partitioned DML on GoogleSQL-dialect and PostgreSQL-dialect Spanner databases: narrow lock scope with a `WHERE` clause on the primary key, avoid mixing DML and mutations, write commit timestamps last, and cut latency with batch DML and the `last_statement` option.

## Signature / Usage

### Reduce lock scope with a WHERE clause

DML runs inside read-write transactions. Reads take shared locks on limited row ranges, which can include data that does not satisfy the `WHERE` filter; modifications take exclusive locks on the modified data. Filter on the primary key or a secondary index key.

Anti-pattern (the source's label: sending an update without the primary key column in the `WHERE` clause):

```googlesql
-- ANTI-PATTERN: SENDING AN UPDATE WITHOUT THE PRIMARY KEY COLUMN
-- IN THE WHERE CLAUSE

UPDATE Singers SET FirstName = "Marcel"
WHERE FirstName = "Marc" AND LastName = "Richards";
```

Recommended: run the `SELECT` in a separate, read-only transaction before the update transaction, then update by key.

Adapted (not in the official docs): split into the read-only SELECT (terminated with ;) and the UPDATE, which run in separate transactions; leading indentation removed.

```googlesql
SELECT SingerId
FROM Singers
WHERE FirstName = "Marc" AND LastName = "Richards";
```

```googlesql
-- Recommended: Including a seekable filter in the where clause

UPDATE Singers SET FirstName = "Marcel"
WHERE SingerId = 1;
```

### Batch DML: parameterized INSERT

Contiguous, structurally identical statements that differ only in parameter values are optimized into one server-side operation:

```sql
INSERT INTO Albums (SingerId, AlbumId, AlbumTitle) VALUES (@Singer, @Album, @Title);
```

Contiguous mixed statements without complex data dependencies are executed in parallel; writes are applied in statement order and batch DML semantics hold if a statement fails:

```googlesql
INSERT INTO Singers (SingerId, Name) VALUES(1, "John Doe");
INSERT INTO Singers (SingerId, Name) VALUES(2, "Marcel Richards");
INSERT INTO Albums(SingerId, AlbumId, AlbumTitle) VALUES (1, 10001, "Album 1");
INSERT INTO Albums(SingerId, AlbumId, AlbumTitle) VALUES (1, 10002, "Album 2");
INSERT INTO Albums(SingerId, AlbumId, AlbumTitle) VALUES (2, 10001, "Album 1");
UPDATE Accounts SET Balance = 100 WHERE AccountId = @AccountId;
```

### Client-side batching in JDBC

```java
String url = "jdbc:cloudspanner:/projects/my-project/instances/my-instance/databases/my-database;auto_batch_dml=true";
try (Connection connection = DriverManager.getConnection(url)) {
    // Include your DML statements for batching here
}
```

### The last_statement option (Python, GoogleSQL)

Adapted (not in the official docs): the function body and docstring were re-indented so the sample is valid Python; no other change.

```python
def dml_last_statement_option(instance_id, database_id):
    """Updates using DML where the update set the last statement option."""
    # [START spanner_dml_last_statement]
    # instance_id = "your-spanner-instance"
    # database_id = "your-spanner-db-id"

    spanner_client = spanner.Client()
    instance = spanner_client.instance(instance_id)
    database = instance.database(database_id)

    def update_singers(transaction):
        # other statements for the transaction if any.

        update_row_ct = transaction.execute_update(
            "UPDATE Singers SET LastName = 'Doe' WHERE SingerId = 54213",
            last_statement=True)

        print("{} record(s) updated.".format(update_row_ct))

    database.run_in_transaction(update_singers)
```

## Options / Props

### last_statement option

| Item | Source statement |
|---|---|
| API availability | `executeSql` and `executeStreamingSql` query APIs. |
| Effect | Defers some validation, such as unique constraint validation, until commit. |
| After use | Subsequent reads, queries and DML in the same transaction are rejected. |
| Mutations | Not compatible; including mutations in the same transaction returns an error. |
| Client libraries | Go 1.77.0 or later; Java 2.27.0 or later (see Notes); Python 3.53.0 or later; PGAdapter 0.45.0 or later. |
| Supported and enabled by default in autocommit mode | JDBC driver 6.87.0 or later (see Notes); Go database/sql driver 1.11.2 or later; Python dbapi driver 3.53.0 or later. |

### JDBC auto_batch_dml

| Property | Default | Description |
|---|---|---|
| `auto_batch_dml` | `false` | When `true`, buffers DML on the client and sends it as one batch when a non-DML statement runs or the transaction commits. Applies only to read-write transactions; autocommit DML runs directly. |
| `auto_batch_dml_update_count` | `1` | Update count reported for buffered DML statements. |

## Notes

- DML mutations are buffered server-side and visible to later SQL and DML in the same transaction. The Mutation API buffers client-side and sends at commit, so mutations are not visible to SQL or DML in the same transaction. Avoid using both in one transaction; if a request contains both, Spanner executes the DML statements before the mutations.
- `PENDING_COMMIT_TIMESTAMP` (GoogleSQL) / `SPANNER.PENDING_COMMIT_TIMESTAMP()` (PostgreSQL) writes the commit timestamp in a DML statement; Spanner selects it at commit. Afterwards the table and any derived index are unreadable to later SQL statements in the transaction, so write commit timestamps as the last statement; reading the table produces an error. In GoogleSQL a change stream also cannot extract the previous value if the column is modified again later in the same transaction.
- Partitioned DML runs in one or more transactions that can commit at different times, so date and timestamp functions can produce different values in the modified rows.
- Source inconsistency: the source shows a second anti-pattern block labelled "sending an update that must scan the entire table" that repeats the same `UPDATE` without a terminating semicolon; it is omitted here. The recommended block in the source is tagged `bash` although its content is SQL.
- Corrected from the official docs: the Python sample shows `def dml_last_statement_option(instance_id, database_id):` followed by an unindented `"""Updates using DML where the update set the last statement option."""` and body, which is not valid Python; only the indentation was fixed (editor's fix; not from a Google source). The sample also needs `from google.cloud import spanner`, which the source does not show.
- Corrected from the official docs: the recommended block put `SELECT SingerId FROM Singers WHERE FirstName = "Marc" AND LastName = "Richards"` (no `;`) and the `UPDATE` in one indented fence, although the source says the `SELECT` must run in a separate read-only transaction before the update transaction; it is now two fences with the `SELECT` terminated.
- The statements on this page use GoogleSQL syntax (double-quoted string literals); PostgreSQL-dialect databases need single-quoted strings, so those fences are tagged `googlesql`.
- The sample's `print` inside `update_singers` is log-only and repeats on each retry; put real side effects (external calls, messages) after `run_in_transaction` returns.
- If no secondary index exists on `FirstName` / `LastName`, locating the singer needs a full table scan; include `SingerId` in the `WHERE` clause instead of adding an index if you want to avoid that.
- Spanner is Google Cloud's distributed relational database, not a PostgreSQL server even with the PostgreSQL interface; it is distinct from `supabase` and `drizzle`.
- Source inconsistency: the Java version numbers look swapped. Maven Central has `com.google.cloud:google-cloud-spanner` (the Java client library) 6.87.0 but no 2.27.0, and `com.google.cloud:google-cloud-spanner-jdbc` (the JDBC driver) 2.27.0 but no 6.87.0 (https://repo1.maven.org/maven2/com/google/cloud/google-cloud-spanner/maven-metadata.xml and https://repo1.maven.org/maven2/com/google/cloud/google-cloud-spanner-jdbc/maven-metadata.xml, retrieved 2026-11-16). Read them as Java client 6.87.0 or later and JDBC driver 2.27.0 or later, and confirm in the release notes.
- The source also shows Go and Java `last_statement` samples and PostgreSQL-dialect variants.
- Source: https://docs.cloud.google.com/spanner/docs/dml-best-practices (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [dml-partitioned.md](./dml-partitioned.md)
- [isolation-levels.md](./isolation-levels.md)
- [sql-best-practices.md](./sql-best-practices.md)
- Batch DML: https://docs.cloud.google.com/spanner/docs/dml-tasks#use-batch
- Mutation API: https://docs.cloud.google.com/spanner/docs/modify-mutation-api

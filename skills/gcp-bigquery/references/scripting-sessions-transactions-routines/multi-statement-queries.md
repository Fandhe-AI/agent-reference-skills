---
source: https://docs.cloud.google.com/bigquery/docs/multi-statement-queries
---

# Multi-Statement Queries

A multi-statement query is a sequence of SQL statements separated by semicolons that run with shared state in one request. It can combine GoogleSQL with procedural language statements (variables, control flow) and DDL / DML. Multi-statement queries are often used inside stored procedures.

## Signature / Usage

### Write a multi-statement query

```sql
DECLARE day INT64;
SET day = (SELECT EXTRACT(DAYOFWEEK from CURRENT_DATE));
if day = 1 or day = 7 THEN
  SELECT 'Weekend';
ELSE
  SELECT 'Weekday';
END IF
```

BigQuery treats any request with multiple statements as a multi-statement query, unless the statements are only `CREATE TEMP FUNCTION` statements followed by a single `SELECT`. The following is not a multi-statement query:

```sql
CREATE TEMP FUNCTION Add(x INT64, y INT64) AS (x + y);
SELECT Add(3, 4);
```

### Declare and set user-created variables

Declare variables at the start of the multi-statement query or at the start of a `BEGIN` block. Variables declared at the start of the query are in scope for the whole query; variables declared inside a `BEGIN` block go out of scope after the matching `END`.

```sql
DECLARE x INT64;

BEGIN
DECLARE y INT64;
-- Here you can reference x and y
END;

-- Here you can reference x, but not y
```

```sql
DECLARE x INT64 DEFAULT 0;
SET x = 10;
```

If a variable and a column share the same name, the column takes precedence. This returns `column y` + `variable x`:

```sql
DECLARE x INT64 DEFAULT 0;
SET x = 10;

WITH Numbers AS (SELECT 50 AS y)
SELECT (y+x) AS result FROM Numbers;
```

### Set system variables

System variables are built in (not declared); you can override the default of some of them. Setting `@@dataset_project_id` and `@@dataset_id` makes them the default project and dataset for the rest of the query.

```sql
SET @@dataset_project_id = 'MyProject';
SET @@dataset_id = 'MyDataset';

BEGIN
  CREATE TABLE MyTempTableA (id STRING);
  CREATE TABLE MyTempTableB (id STRING);
END;
```

### Temporary tables

```sql
-- Find the top 100 names from the year 2017.
CREATE TEMP TABLE top_names(name STRING)
AS
 SELECT name
 FROM `bigquery-public-data`.usa_names.usa_1910_current
 WHERE year = 2017
 ORDER BY number DESC LIMIT 100
;
-- Which names appear as words in Shakespeare's plays?
SELECT
 name AS shakespeare_name
FROM top_names
WHERE name IN (
 SELECT word
 FROM `bigquery-public-data`.samples.shakespeare
);
```

Delete a temporary table before the query finishes with `DROP TABLE`:

```sql
CREATE TEMP TABLE table1(x INT64);
SELECT * FROM table1;  -- Succeeds
DROP TABLE table1;
SELECT * FROM table1;  -- Results in an error
```

Qualify a temporary table with `_SESSION` to refer to it explicitly:

```sql
-- Create a temp table
CREATE TEMP TABLE t1 (x INT64);

-- Create a temp table using the `_SESSION` qualifier
CREATE TEMP TABLE _SESSION.t2 (x INT64);

-- Select from a temporary table using the `_SESSION` qualifier
SELECT * FROM _SESSION.t1;
```

You cannot use `_SESSION` to create a non-temporary table:

```sql
CREATE TABLE _SESSION.t4 (x INT64);  -- Fails
```

### Count active multi-statement queries

```sql
SELECT
  COUNT(*)
FROM
  `region-us`.INFORMATION_SCHEMA.JOBS_BY_PROJECT
WHERE
  creation_time BETWEEN TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY) AND CURRENT_TIMESTAMP()
AND job_type = "QUERY"
AND state = 'RUNNING'
AND statement_type = 'SCRIPT'
```

### Dynamic SQL

The source marks the following pattern as vulnerable to SQL injection:

```sql
-- Risky query vulnerable to SQL injection attack.
EXECUTE IMMEDIATE CONCAT('SELECT * FROM SensitiveTable WHERE id = ', @id);
```

## Options / Props

### Job configuration query fields that cannot be set

| Field |
|---|
| `clustering` |
| `create_disposition` |
| `destination_table` |
| `destination_encryption_configuration` |
| `range_partitioning` |
| `schema_update_options` |
| `time_partitioning` |
| `user_defined_function_resources` |
| `write_disposition` |

### Variable limits

| Limit | Value |
|---|---|
| Maximum size of one variable | 1 MB |
| Maximum size of all variables in a multi-statement query | 10 MB |

### Dry-run handling by statement type

| Statement / query type | Dry-run behavior |
|---|---|
| `CALL` | Validates that the procedure exists and its signature matches the arguments; the procedure content and all later statements are not validated. |
| DDL | Validates the first DDL statement, then stops; later statements are skipped. Dry runs of `CREATE TEMP TABLE` aren't supported. |
| DML | Validates the statement and continues; byte estimates use original table sizes and ignore the DML outcome. |
| `EXECUTE IMMEDIATE` | Validates the query expression, does not evaluate the dynamic query; later statements are skipped. |
| Variables in a partition filter | Runtime value can't be calculated, which affects the bytes-read estimate. |
| Variables in `FOR SYSTEM TIME AS OF` | Uses the table's current content and ignores the clause. |
| `FOR`, `IF`, `WHILE` | Dry run stops immediately; conditions, bodies and later statements are not validated. |

### On-demand cost by statement

| Statement | Cost |
|---|---|
| `DECLARE` | Bytes scanned for tables referenced in the `DEFAULT` expression; none if no table is referenced. |
| `SET` | Bytes scanned for tables referenced in the expression. |
| `IF` | Bytes scanned for tables in the condition expression; statements in a non-executed block cost nothing. |
| `WHILE` | Bytes scanned for tables in the condition expression (each iteration); non-executed statements cost nothing. |
| `CONTINUE` / `ITERATE`, `BREAK` / `LEAVE`, `BEGIN` / `END` | No cost. |

## Notes

- Dry runs are best effort: a query that passes a dry run might fail at runtime, a query that runs might fail a dry run, and behavior may change in the future.
- Temporary tables are created in hidden `_script%` datasets with randomly generated names, can't be shared, and are referenceable only for the duration of the multi-statement query. They are deleted automatically 24 hours after the query finishes, and their storage is charged. Use `INFORMATION_SCHEMA.TABLE_STORAGE` or `TABLE_STORAGE_USAGE_TIMELINE` to see their storage. When creating one, don't use a project or dataset qualifier. In `CREATE TABLE`, the target is temporary if and only if `TEMP` / `TEMPORARY` is present. A `_SESSION`-qualified reference to a nonexistent temp table is an error even if a table of that name exists in the default dataset.
- Each statement runs as a child job (`jobs.insert` with the script text). Enumerate child jobs with `jobs.list` and `parentJobId` set to the multi-statement job ID. `jobs.getQueryResults` returns results of the last executed statement only; call it on each child job for all results. Data access audit events (`TableDataRead`, `TableDataChange`) are recorded against the child job.
- Permissions are checked at execution time, per statement. If a statement or expression is not executed, access is not checked. A failing statement fails the multi-statement job itself.
- Dynamic SQL: an `EXECUTE IMMEDIATE` query, expanded with parameters and variables, cannot embed multiple SQL statements. `BEGIN`/`END`, `CALL`, `CASE`, `IF`, `LOOP`, `WHILE` and `EXECUTE IMMEDIATE` cannot be executed dynamically.
- Debugging: `ASSERT`, `BEGIN...EXCEPTION...END`, `SELECT FORMAT("....")`; `bq query` shows the result of each step.
- Pricing: on-demand billing charges by bytes processed during execution (generally not known before execution, so consider capacity-based pricing or the sandbox); under reservations, query usage is covered by reservation charges. If a script fails, statements up to the failure are still charged. Pricing page: https://cloud.google.com/bigquery/pricing. The source's cost-annotated example (`DECLARE` / `CREATE TEMP TABLE` / `IF` / `WHILE`) is omitted. For quotas see https://docs.cloud.google.com/bigquery/quotas#multi_statement_query_limits.
- The `usa_names` query reads a public dataset and is billed by bytes processed on-demand. Try the `CREATE TABLE` examples on a disposable dataset first.
- The source also shows Console steps for viewing temporary tables and query results.
- Source: https://docs.cloud.google.com/bigquery/docs/multi-statement-queries (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [sessions-intro.md](./sessions-intro.md)
- [sessions.md](./sessions.md)
- [transactions.md](./transactions.md)
- [procedures.md](./procedures.md)
- Procedural language: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/procedural-language

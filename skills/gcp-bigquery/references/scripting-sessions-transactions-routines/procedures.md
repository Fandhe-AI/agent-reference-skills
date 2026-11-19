---
source: https://docs.cloud.google.com/bigquery/docs/procedures
---

# SQL Stored Procedures

SQL stored procedures encapsulate and reuse collections of statements across queries. They live in datasets, accept input arguments, return values, and can modify data across datasets and users. A procedure body can be a multi-statement query written with procedural language, or you can call built-in system procedures.

## Signature / Usage

### Create a stored procedure

Use `CREATE PROCEDURE`; the body appears between `BEGIN` and `END`:

```sql
CREATE PROCEDURE dataset_name.procedure_name()
BEGIN
-- statements here
END
```

A procedure containing a multi-statement query that sets a variable, runs an `INSERT`, and displays a formatted string:

```sql
CREATE OR REPLACE PROCEDURE mydataset.create_customer()
BEGIN
  DECLARE id STRING;
  SET id = GENERATE_UUID();
  INSERT INTO mydataset.customers (customer_id)
    VALUES(id);
  SELECT FORMAT("Created customer %s", id);
END
```

### Call a stored procedure

```sql
CALL mydataset.create_customer();
```

### Input parameter

An input parameter allows input but not output:

```sql
CREATE OR REPLACE PROCEDURE mydataset.create_customer(name STRING)
BEGIN
  DECLARE id STRING;
  SET id = GENERATE_UUID();
  INSERT INTO mydataset.customers (customer_id, name)
    VALUES(id, name);
  SELECT FORMAT("Created customer %s (%s)", id, name);
END
```

### Output parameter

Use the `OUT` keyword before the parameter name. The caller must pass a variable to receive the value:

```sql
CREATE OR REPLACE PROCEDURE mydataset.create_customer(name STRING, OUT id STRING)
BEGIN
  SET id = GENERATE_UUID();
  INSERT INTO mydataset.customers (customer_id, name)
    VALUES(id, name);
  SELECT FORMAT("Created customer %s (%s)", id, name);
END
```

```sql
--- Create a new customer record.
DECLARE id STRING;
CALL mydataset.create_customer("alice",id);

--- Display the record.
SELECT * FROM mydataset.customers
WHERE customer_id = id;
```

### Input/output parameter

Use the `INOUT` keyword before the parameter name to accept input and return a value (see Argument mode in the `CREATE PROCEDURE` reference).

### Call a system procedure

Adapted (not in the official docs): the source writes `CALL BQ.REFRESH_MATERIALIZED_VIEW;` with no argument, but the system-procedure reference requires `view_name`, a string `'[project_id.]dataset.table'`.

```sql
CALL BQ.REFRESH_MATERIALIZED_VIEW('mydataset.my_materialized_view');
```

## Options / Props

| Parameter mode | Keyword | Direction |
|---|---|---|
| Input | none | In only |
| Output | `OUT` | Out only |
| Input/output | `INOUT` | In and out |

## Notes

- Corrected from the official docs: `CALL BQ.REFRESH_MATERIALIZED_VIEW;` (no argument) replaced with a call that passes the view name, as the system procedures reference requires (https://docs.cloud.google.com/bigquery/docs/reference/system-procedures: `CALL BQ.REFRESH_MATERIALIZED_VIEW(view_name);`).
- Authorized routines: a stored procedure can be authorized as a routine to share query results with specific users or groups without granting access to the underlying tables. Authorized routines can create, drop and manipulate tables and call other stored procedures on the underlying table. See https://docs.cloud.google.com/bigquery/docs/authorized-routines.
- Calling a procedure instead of inlining its statements adds a small performance overhead.
- Each statement in the procedure body runs as a separate child job; Data Access audit log entries are recorded against those child jobs, not the job that runs `CALL`. See https://docs.cloud.google.com/bigquery/docs/reference/auditlogs#data_access.
- The source also shows a Terraform example (`google_bigquery_routine` with `routine_type = "PROCEDURE"`, `language = "SQL"`; requires the Cloud Resource Manager API and Application Default Credentials) and the Cloud Shell steps to apply it; Terraform itself is covered by the `gcp-iac` skill. Those blocks are omitted. `CREATE OR REPLACE PROCEDURE` replaces an existing procedure of the same name; try these on a disposable dataset first.
- Source: https://docs.cloud.google.com/bigquery/docs/procedures (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [multi-statement-queries.md](./multi-statement-queries.md)
- [transactions.md](./transactions.md)
- [user-defined-functions.md](./user-defined-functions.md)
- CREATE PROCEDURE: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_procedure
- System procedures: https://docs.cloud.google.com/bigquery/docs/reference/system-procedures

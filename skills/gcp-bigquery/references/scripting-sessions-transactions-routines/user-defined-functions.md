---
source: https://docs.cloud.google.com/bigquery/docs/user-defined-functions
---

# User-Defined Functions

User-defined functions (UDFs) encapsulate custom logic as SQL expressions or JavaScript code. A UDF is either persistent (stored in a dataset and reusable across queries) or temporary (expires when the query finishes). For temporary UDFs, `DROP FUNCTION` is supported only in multi-statement queries and procedures; a persistent UDF is dropped with `DROP FUNCTION [IF EXISTS] [[project_name.]dataset_name.]function_name`.

## Signature / Usage

### SQL UDF (temporary and persistent)

```sql
CREATE TEMP FUNCTION AddFourAndDivide(x INT64, y INT64)
RETURNS FLOAT64
AS (
  (x + 4) / y
);

SELECT
  val, AddFourAndDivide(val, 2)
FROM
  UNNEST([2,3,5,8]) AS val;
```

A persistent UDF must name a dataset:

```sql
CREATE FUNCTION mydataset.AddFourAndDivide(x INT64, y INT64)
RETURNS FLOAT64
AS (
  (x + 4) / y
);
```

### Templated parameters (`ANY TYPE`)

```sql
CREATE TEMP FUNCTION addFourAndDivideAny(x ANY TYPE, y ANY TYPE)
AS (
  (x + 4) / y
);

SELECT
  addFourAndDivideAny(3, 4) AS integer_input,
  addFourAndDivideAny(1.59, 3.14) AS floating_point_input;
```

### Default project in SQL expressions

References to tables or views in a SQL UDF body must include the project ID unless the entity is in the project that contains the UDF. This fails when run from a project other than `project1`:

```sql
CREATE FUNCTION project1.mydataset.myfunction()
AS (
  (SELECT COUNT(*) FROM mydataset.mytable)
);
```

Fix by including the project ID:

```sql
CREATE FUNCTION project1.mydataset.myfunction()
AS (
  (SELECT COUNT(*) FROM project1.mydataset.mytable)
);
```

### JavaScript UDF

```sql
CREATE TEMP FUNCTION multiplyInputs(x FLOAT64, y FLOAT64)
RETURNS FLOAT64
LANGUAGE js
AS r"""
  return x*y;
""";

WITH numbers AS
  (SELECT 1 AS x, 5 as y
  UNION ALL
  SELECT 2 AS x, 10 as y
  UNION ALL
  SELECT 3 as x, 15 as y)
SELECT x, y, multiplyInputs(x, y) AS product
FROM numbers;
```

One-line code can use a standard quoted string; use triple-quoted blocks for code with quotes or multiple lines:

```sql
CREATE TEMP FUNCTION plusOne(x FLOAT64)
RETURNS FLOAT64
LANGUAGE js
AS "return x+1;";

SELECT val, plusOne(val) AS result
FROM UNNEST([1, 2, 3, 4, 5]) AS val;
```

External libraries through `OPTIONS`:

```sql
CREATE TEMP FUNCTION myFunc(a FLOAT64, b STRING)
RETURNS STRING
LANGUAGE js
  OPTIONS (
    library=['gs://my-bucket/path/to/lib1.js', 'gs://my-bucket/path/to/lib2.js'])
AS r"""
  // Assumes 'doInterestingStuff' is defined in one of the library files.
  return doInterestingStuff(a, b);
""";

SELECT myFunc(3.14, 'foo');
```

### Custom masking routines

Requires a SQL UDF with `data_governance_type` set to `DATA_MASKING`. Hash with a user-provided salt:

```sql
CREATE OR REPLACE FUNCTION `project.dataset.masking_routine1`(
  ssn STRING)
RETURNS STRING OPTIONS (data_governance_type = 'DATA_MASKING')
AS (
  CAST(SHA256(CONCAT(ssn, 'salt')) AS STRING format 'HEX')
);
```

Mask a `DATETIME` column with a constant:

```sql
CREATE OR REPLACE FUNCTION `project.dataset.masking_routine2`(
  column DATETIME)
RETURNS DATETIME OPTIONS (data_governance_type = 'DATA_MASKING')
AS (
  SAFE_CAST('2023-09-07' AS DATETIME)
);
```

### VPC Service Controls egress rule for community UDFs

Required for projects where VPC Service Controls protects BigQuery, to use the `bigquery-public-data.persistent_udfs` dataset (project ID `1057666841514`):

```yaml
- egressFrom:
    identityType: ANY_IDENTITY
  egressTo:
    operations:
    - serviceName: 'bigquery.googleapis.com'
      methodSelectors:
      - permission: 'bigquery.routines.get'
      - permission: 'bigquery.tables.getData'
    resources:
    - projects/1057666841514 # bigquery-public-data
```

### Region-independent UDFs

A UDF must exist in every region where a query using it runs (for example one version per `EU` and `US` multi-region). To avoid maintaining copies, put UDFs in a dedicated dataset (for example `my_utils`) and enable cross-region dataset replication; BigQuery then uses the local replica:

```sql
SELECT
  id,
  my_utils.my_function(value)
FROM
  sales;
```

## Options / Props

### JavaScript UDF data types

| BigQuery type | JavaScript type |
|---|---|
| ARRAY | ARRAY |
| BOOL | BOOLEAN |
| BYTES | base64-encoded STRING |
| FLOAT64 | NUMBER |
| NUMERIC, BIGNUMERIC | Number if exactly representable as an IEEE 754 float with no fractional part (range \[-2^53, 2^53\]); otherwise STRING |
| STRING | STRING |
| STRUCT | OBJECT with named fields |
| TIMESTAMP | DATE with a `microsecond` field for the microsecond fraction |
| DATE | DATE |
| JSON | Equivalent JavaScript OBJECTS, ARRAYS and VALUES; only JSON numbers in \[-2^53, 2^53\] convert exactly, others are rounded |

`INT64` is unsupported as an input type for JavaScript UDFs (use `FLOAT64` or `STRING`) but supported as a return type (JavaScript Number or String is converted). A returned `Promise` is awaited; a rejected one returns an error.

### Custom masking routine requirements

| Requirement | Detail |
|---|---|
| Kind | Must be a SQL UDF; `data_governance_type` must be `DATA_MASKING` |
| Inputs | None, or one input of a BigQuery data type except `GEOGRAPHY` and `STRUCT` |
| Types | If an input is provided, input and output types must match; an output type must be provided |
| Body | No other UDFs, subqueries, tables or views; templated parameters not supported |
| Immutability | Once `DATA_MASKING`, `data_governance_type` can't be changed by DDL or API calls |
| `CASE` operators | `<`, `<=`, `>`, `>=`, `=`, `!=`, `IN`; `AND`, `OR`, `NOT`; `IS` |

Supported functions: `AEAD.DECRYPT_BYTES`, `AEAD.DECRYPT_STRING`, `AEAD.ENCRYPT`, `DETERMINISTIC_DECRYPT_BYTES`, `DETERMINISTIC_DECRYPT_STRING`, `DETERMINISTIC_ENCRYPT` (all with `KEYS.KEYSET_CHAIN`; raw key usage not supported), `KEYS.KEYSET_CHAIN`, `CAST`, `SAFE_CAST`, `CONCAT`, `CURRENT_DATETIME`, `CURRENT_DATE`, `CURRENT_TIMESTAMP`, `CURRENT_TIME`, `FARM_FINGERPRINT`, `MD5`, `SHA1`, `SHA256`, `SHA512`, `FROM_BASE32`, `FROM_BASE64`, `FROM_HEX`, `TO_BASE32`, `TO_BASE64`, `TO_HEX`, `GENERATE_UUID`, `LENGTH`, `LOWER`, `UPPER`, `LPAD`, `RPAD`, `LTRIM`, `RTRIM`, `TRIM`, `REGEXP_REPLACE`, `REGEXP_EXTRACT`, `REPLACE`, `STARTS_WITH`, `SUBSTRING`, `SUBSTR`.

### Limitations

| Scope | Limitation |
|---|---|
| All UDFs | DOM objects `Window`, `Document`, `Node` unsupported; JavaScript runs sandboxed (restricted system calls); JavaScript bitwise operations handle only the most significant 32 bits |
| All UDFs | A JavaScript UDF can time out (as short as 5 minutes, varies with CPU time and input / output size); UDF rate and quota limits apply (https://docs.cloud.google.com/bigquery/quotas#udf_limits) |
| Continuous queries | Only SQL UDFs; JavaScript, Python UDFs, remote functions and user-defined aggregate functions are not supported. Updating or deleting a persistent SQL UDF used by a running continuous query terminates that query |
| Persistent | One persistent UDF per name per dataset (may match a table name); references from another persistent UDF or logical view must be dataset-qualified; persistent UDFs can't mutate data, talk to external systems or send logs |
| Temporary | `function_name` can't contain periods; views and persistent UDFs can't reference temporary UDFs |
| System variables | Only `@@session_id` and `@@location` are supported in SQL UDFs |

## Notes

- JavaScript UDFs typically use more slot resources than standard SQL; prefer SQL when the logic can be expressed in it. Prefilter input, avoid persistent mutable state across calls, and use memory efficiently (the JavaScript environment has limited memory per query).
- Authorized routines share query results with specific users or groups without granting access to the underlying tables (https://docs.cloud.google.com/bigquery/docs/authorized-routines).
- Custom masking routines may not be available with reservations created with certain BigQuery editions (see https://docs.cloud.google.com/bigquery/docs/editions-intro). Create dedicated datasets and IAM permissions for masking UDFs. Use the `SAFE` prefix wherever possible to avoid exposing raw data through error messages. After creation the routine is available as a masking rule in data policies. The masking example hashes with a hardcoded `'salt'` string as the source shows; treat it as illustrative.
- The VPC Service Controls rule uses `identityType: ANY_IDENTITY`, which lets any identity in the perimeter reach the `bigquery-public-data` project for the two listed permissions.
- Community UDFs live in the `bigquery-public-data.persistent_udfs` public dataset and the open-source `bigquery-utils` GitHub repository. Replicating UDFs and procedures does not add cost, but tables in the replicated dataset are replicated (and cost more).
- To update a UDF description, recreate it with `CREATE OR REPLACE FUNCTION` and an `OPTIONS` `description` value (the source's block uses `...` placeholders and is omitted).
- The source also shows the scalar-subquery example, the JSON `SumFieldsNamedFoo` JavaScript example, an anti-pattern for mutable state (omitted on purpose), per-region query examples, the `SSN_Mask` example, and Console steps.
- The source writes "The `DROP FUNCTION` statement is only supported for temporary UDFs in multi-statement queries and procedures"; the GoogleSQL DDL reference documents `DROP FUNCTION [IF EXISTS] [[project_name.]dataset_name.]function_name` for persistent UDFs (example `DROP FUNCTION mydataset.parseJsonAsStruct;`), so the restriction is read as applying to dropping temporary UDFs.
- Source: https://docs.cloud.google.com/bigquery/docs/user-defined-functions (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [procedures.md](./procedures.md)
- [multi-statement-queries.md](./multi-statement-queries.md)
- CREATE FUNCTION: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_function_statement

---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax
---

# Query syntax (part 1 of 3)

## Signature / Usage

> [!WARNING]
> GoogleSQL is the new name for Google Standard SQL! New name, same great SQL dialect.

Query statements scan one or more tables or expressions and return the computed
result rows. This topic describes the syntax for SQL queries in
GoogleSQL for BigQuery.

### SQL syntax notation rules

The following table lists and describes the syntax notation rules that GoogleSQL
documentation commonly uses.

| Notation | Example | Description |
|---|---|---|
| Square brackets | `[ ]` | Optional clauses |
| Parentheses | `( )` | Literal parentheses |
| Vertical bar | `\|` | Logical `XOR` (exclusive `OR`) |
| Curly braces | `{ }` | A set of options, such as `{ a \| b \| c }`. Select one option. |
| Ellipsis | `...` | The preceding item can repeat. |
| Comma | `,` | Literal comma |
| Comma followed by an ellipsis | `, ...` | The preceding item can repeat in a comma-separated list. |
| Item list | `item [, ...]` | One or more items |
| Item list | `[item, ...]` | Zero or more items |
| Double quotes | `""` | The enclosed syntax characters (for example, `"{"..."}"`) are literal and required. |
| Angle brackets | `<>` | Literal angle brackets |

### SQL syntax

```text
query_statement:
  query_expr

query_expr:
  [ WITH [ RECURSIVE ] { non_recursive_cte | recursive_cte }[, ...] ]
  { select | ( query_expr ) | set_operation }
  [ ORDER BY expression [{ ASC | DESC }] [, ...] ]
  [ LIMIT count [ OFFSET skip_rows ] ]

select:
  SELECT
    [ WITH differential_privacy_clause ]
    [ { ALL | DISTINCT } ]
    [ AS { STRUCT | VALUE } ]
    select_list
  [ FROM from_clause[, ...] ]
  [ WHERE bool_expression ]
  [ GROUP BY group_by_specification ]
  [ HAVING bool_expression ]
  [ QUALIFY bool_expression ]
  [ WINDOW window_clause ]
```

### `SELECT` statement

```text
SELECT
  [ WITH differential_privacy_clause ]
  [ { ALL | DISTINCT } ]
  [ AS { STRUCT | VALUE } ]
  select_list

select_list:
  { select_all | select_expression } [, ...]

select_all:
  [ expression. ]*
  [ EXCEPT ( column_name [, ...] ) ]
  [ REPLACE ( expression AS column_name [, ...] ) ]

select_expression:
  expression [ [ AS ] alias ]
```

The `SELECT` list defines the columns that the query will return. Expressions in
the `SELECT` list can refer to columns in any of the `from_item`s in its
corresponding `FROM` clause.

Each item in the `SELECT` list is one of:

- `*`
- `expression`
- `expression.*`

#### `SELECT *`

`SELECT *`, often referred to as *select star*, produces one output column for
each column that's visible after executing the full query.

```sql
SELECT * FROM (SELECT "apple" AS fruit, "carrot" AS vegetable);

/*-------+-----------+
 | fruit | vegetable |
 +-------+-----------+
 | apple | carrot    |
 +-------+-----------*/
```

#### `SELECT expression`

Items in a `SELECT` list can be expressions. These expressions evaluate to a
single value and produce one output column, with an optional explicit `alias`.

If the expression doesn't have an explicit alias, it receives an implicit alias
according to the rules for [implicit aliases](query-syntax-3.md#implicit-aliases), if possible.
Otherwise, the column is anonymous and you can't refer to it by name elsewhere
in the query.

#### `SELECT expression.*`

An item in a `SELECT` list can also take the form of `expression.*`. This
produces one output column for each column or top-level field of `expression`.
The expression must either be a table alias or evaluate to a single value of a
data type with fields, such as a STRUCT.

> [!NOTE]
> **Note:** The `*` or `.*` wildcard preserves the order of the fields in the data structure on which they're operating.

The following query produces one output column for each column in the table
`groceries`, aliased as `g`.

```sql
WITH groceries AS
  (SELECT "milk" AS dairy,
   "eggs" AS protein,
   "bread" AS grain)
SELECT g.*
FROM groceries AS g;

/*-------+---------+-------+
 | dairy | protein | grain |
 +-------+---------+-------+
 | milk  | eggs    | bread |
 +-------+---------+-------*/
```

More examples:

```sql
WITH locations AS
  (SELECT STRUCT("Seattle" AS city, "Washington" AS state) AS location
  UNION ALL
  SELECT STRUCT("Phoenix" AS city, "Arizona" AS state) AS location)
SELECT l.location.*
FROM locations l;

/*---------+------------+
 | city    | state      |
 +---------+------------+
 | Seattle | Washington |
 | Phoenix | Arizona    |
 +---------+------------*/
```

```sql
WITH locations AS
  (SELECT ARRAY<STRUCT<city STRING, state STRING>>[("Seattle", "Washington"),
    ("Phoenix", "Arizona")] AS location)
SELECT l.LOCATION[offset(0)].*
FROM locations l;

/*---------+------------+
 | city    | state      |
 +---------+------------+
 | Seattle | Washington |
 +---------+------------*/
```

#### `SELECT * EXCEPT`

A `SELECT * EXCEPT` statement specifies the names of one or more columns to
exclude from the result. All matching column names are omitted from the output.

```sql
WITH orders AS
  (SELECT 5 as order_id,
  "sprocket" as item_name,
  200 as quantity)
SELECT * EXCEPT (order_id)
FROM orders;

/*-----------+----------+
 | item_name | quantity |
 +-----------+----------+
 | sprocket  | 200      |
 +-----------+----------*/
```

> [!NOTE]
> **Note:** `SELECT * EXCEPT` doesn't exclude columns that don't have names. Also, `SELECT * EXCEPT` and the [`EXCEPT`](query-syntax-3.md#except) set operator have different use cases and rules.

#### `SELECT * REPLACE`

A `SELECT * REPLACE` statement specifies one or more
`expression AS identifier` clauses. Each identifier must match a column name
from the `SELECT *` statement. In the output column list, the column that
matches the identifier in a `REPLACE` clause is replaced by the expression in
that `REPLACE` clause.

A `SELECT * REPLACE` statement doesn't change the names or order of columns.
However, it can change the value and the value type.

```sql
WITH orders AS
  (SELECT 5 as order_id,
  "sprocket" as item_name,
  200 as quantity)
SELECT * REPLACE ("widget" AS item_name)
FROM orders;

/*----------+-----------+----------+
 | order_id | item_name | quantity |
 +----------+-----------+----------+
 | 5        | widget    | 200      |
 +----------+-----------+----------*/

WITH orders AS
  (SELECT 5 as order_id,
  "sprocket" as item_name,
  200 as quantity)
SELECT * REPLACE (quantity/2 AS quantity)
FROM orders;

/*----------+-----------+----------+
 | order_id | item_name | quantity |
 +----------+-----------+----------+
 | 5        | sprocket  | 100      |
 +----------+-----------+----------*/
```

> [!NOTE]
> **Note:** `SELECT * REPLACE` doesn't replace columns that don't have names.

#### `SELECT DISTINCT`

A `SELECT DISTINCT` statement discards duplicate rows and returns only the
remaining rows. `SELECT DISTINCT` can't return columns of the following types:

- `GRAPH_ELEMENT`
- `GRAPH_PATH`

In the following example, `SELECT DISTINCT` is used to produce distinct arrays:

```sql
WITH PlayerStats AS (
  SELECT ['Coolidge', 'Adams'] as Name, 3 as PointsScored UNION ALL
  SELECT ['Adams', 'Buchanan'], 0 UNION ALL
  SELECT ['Coolidge', 'Adams'], 1 UNION ALL
  SELECT ['Kiran', 'Noam'], 1)
SELECT DISTINCT Name
FROM PlayerStats;

/*------------------+
 | Name             |
 +------------------+
 | [Coolidge,Adams] |
 | [Adams,Buchanan] |
 | [Kiran,Noam]     |
 +------------------*/
```

In the following example, `SELECT DISTINCT` is used to produce distinct structs:

```sql
WITH
  PlayerStats AS (
    SELECT
      STRUCT<last_name STRING, first_name STRING, age INT64>(
        'Adams', 'Noam', 20) AS Player,
      3 AS PointsScored UNION ALL
    SELECT ('Buchanan', 'Jie', 19), 0 UNION ALL
    SELECT ('Adams', 'Noam', 20), 4 UNION ALL
    SELECT ('Buchanan', 'Jie', 19), 13
  )
SELECT DISTINCT Player
FROM PlayerStats;

/*--------------------------+
 | player                   |
 +--------------------------+
 | {                        |
 |   last_name: "Adams",    |
 |   first_name: "Noam",    |
 |   age: 20                |
 |  }                       |
 +--------------------------+
 | {                        |
 |   last_name: "Buchanan", |
 |   first_name: "Jie",     |
 |   age: 19                |
 |  }                       |
 +---------------------------*/
```

#### `SELECT ALL`

A `SELECT ALL` statement returns all rows, including duplicate rows.
`SELECT ALL` is the default behavior of `SELECT`.

#### `SELECT AS STRUCT`

```sql
SELECT AS STRUCT expr [[AS] struct_field_name1] [,...]
```

This produces a [value table](query-syntax-3.md#value-tables) with a
STRUCT row type, where the
STRUCT field names and types match the column names
and types produced in the `SELECT` list.

Example:

```sql
SELECT ARRAY(SELECT AS STRUCT 1 a, 2 b)
```

`SELECT AS STRUCT` can be used in a scalar or array subquery to produce a single
STRUCT type grouping multiple values together. Scalar
and array subqueries (see [Subqueries](subqueries.md)) are normally not
allowed to return multiple columns, but can return a single column with
STRUCT type.

#### `SELECT AS VALUE`

`SELECT AS VALUE` produces a [value table](query-syntax-3.md#value-tables) from any
`SELECT` list that produces exactly one column. Instead of producing an
output table with one column, possibly with a name, the output will be a
value table where the row type is just the value type that was produced in the
one `SELECT` column. Any alias the column had will be discarded in the
value table.

Example:

```sql
SELECT AS VALUE STRUCT(1 AS a, 2 AS b) xyz
```

The query above produces a table with row type `STRUCT<a int64, b int64>`.

### `FROM` clause

```text
FROM from_clause[, ...]

from_clause:
  from_item
  [ { pivot_operator | unpivot_operator | match_recognize_clause } ]
  [ tablesample_operator ]

from_item:
  {
    table_name [ as_alias ] [ FOR SYSTEM_TIME AS OF timestamp_expression ] 
    | { join_operation | ( join_operation ) }
    | ( query_expr ) [ as_alias ]
    | field_path
    | unnest_operator
    | cte_name [ as_alias ]
    | graph_table_operator [ as_alias ]
  }

as_alias:
  [ AS ] alias
```

The `FROM` clause indicates the table or tables from which to retrieve rows,
and specifies how to join those rows together to produce a single stream of
rows for processing in the rest of the query.

##### `pivot_operator`

See [PIVOT operator](#pivot-operator).

##### `unpivot_operator`

See [UNPIVOT operator](#unpivot-operator).

##### `tablesample_operator`

See [TABLESAMPLE operator](#tablesample-operator).

##### `match_recognize_clause`

See [MATCH_RECOGNIZE clause](#match_recognize-clause).

##### `graph_table_operator`

See [GRAPH_TABLE operator](../graph-gql/sql-queries.md#graph_table-operator).

##### `table_name`

The name (optionally qualified) of an existing table.

```text
SELECT * FROM Roster;
SELECT * FROM dataset.Roster;
SELECT * FROM project.dataset.Roster;
```

##### `FOR SYSTEM_TIME AS OF`

`FOR SYSTEM_TIME AS OF` references the historical versions of the table
definition and rows that were current at `timestamp_expression`.

Limitations:

The source table in the `FROM` clause containing `FOR SYSTEM_TIME AS OF` must
not be any of the following:

- An array scan, including a [flattened array](https://docs.cloud.google.com/bigquery/docs/arrays#flattening_arrays) or the output of the `UNNEST` operator.
- A common table expression defined by a `WITH` clause.
- The source table in a `CREATE TABLE FUNCTION` statement creating a new table-valued function

`timestamp_expression` must be a constant expression. It can't
contain the following:

- Subqueries.
- Correlated references (references to columns of a table that appear at a higher level of the query statement, such as in the `SELECT` list).
- User-defined functions (UDFs).

The value of `timestamp_expression` can't fall into the following ranges:

- After the current timestamp (in the future).
- More than seven (7) days before the current timestamp.

A single query statement can't reference a single table at more than one point
in time, including the current time. That is, a query can reference a table
multiple times at the same timestamp, but not the current version and a
historical version, or two different historical versions.

> [!NOTE]
> **Note:** DML statements always operate on the current version of the destination table, so if the destination table is used multiple times in the query, all of them must use the current version.

The default time zone for `timestamp_expression` in a
`FOR SYSTEM_TIME AS OF` expression is `America/Los_Angeles`, even though the
default time zone for timestamp literals is `UTC`.

Examples:

The following query returns a historical version of the table from one hour ago.

```sql
SELECT *
FROM t
  FOR SYSTEM_TIME AS OF TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 HOUR);
```

The following query returns a historical version of the table at an absolute
point in time.

```sql
SELECT *
FROM t
  FOR SYSTEM_TIME AS OF '2017-01-01 10:00:00-07:00';
```

The following query returns an error because the `timestamp_expression` contains
a correlated reference to a column in the containing query.

```sql
SELECT *
FROM t1
WHERE t1.a IN (SELECT t2.a
               FROM t2 FOR SYSTEM_TIME AS OF t1.timestamp_column);
```

The following operations show accessing a historical version of the table before
table is replaced.

```sql
DECLARE before_replace_timestamp TIMESTAMP;

-- Create table books.
CREATE TABLE books AS
SELECT 'Hamlet' title, 'William Shakespeare' author;

-- Get current timestamp before table replacement.
SET before_replace_timestamp = CURRENT_TIMESTAMP();

-- Replace table with different schema(title and release_date).
CREATE OR REPLACE TABLE books AS
SELECT 'Hamlet' title, DATE '1603-01-01' release_date;

-- This query returns Hamlet, William Shakespeare as result.
SELECT * FROM books FOR SYSTEM_TIME AS OF before_replace_timestamp;
```

The following operations show accessing a historical version of the table
before a DML job.

```sql
DECLARE JOB_START_TIMESTAMP TIMESTAMP;

-- Create table books.
CREATE OR REPLACE TABLE books AS
SELECT 'Hamlet' title, 'William Shakespeare' author;

-- Insert two rows into the books.
INSERT books (title, author)
VALUES('The Great Gatsby', 'F. Scott Fizgerald'),
      ('War and Peace', 'Leo Tolstoy');

SELECT * FROM books;

SET JOB_START_TIMESTAMP = (
  SELECT start_time
  FROM `region-us`.INFORMATION_SCHEMA.JOBS_BY_USER
  WHERE job_type="QUERY"
    AND statement_type="INSERT"
  ORDER BY start_time DESC
  LIMIT 1
 );

-- This query only returns Hamlet, William Shakespeare as result.
SELECT * FROM books FOR SYSTEM_TIME AS OF JOB_START_TIMESTAMP;
```

The following query returns an error because the DML operates on the current
version of the table, and a historical version of the table from one day ago.

```sql
INSERT INTO t1
SELECT * FROM t1
  FOR SYSTEM_TIME AS OF TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY);
```

##### `join_operation`

See [Join operation](query-syntax-2.md#join-operation).

##### `query_expr`

`( query_expr ) [ [ AS ] alias ]` is a [table subquery](subqueries.md#table-subqueries).

##### `field_path`

In the `FROM` clause, `field_path` is any path that
resolves to a field within a data type. `field_path` can go
arbitrarily deep into a nested data structure.

Some examples of valid `field_path` values include:

```sql
SELECT * FROM T1 t1, t1.array_column;

SELECT * FROM T1 t1, t1.struct_column.array_field;

SELECT (SELECT ARRAY_AGG(c) FROM t1.array_column c) FROM T1 t1;

SELECT a.struct_field1 FROM T1 t1, t1.array_of_structs a;

SELECT (SELECT STRING_AGG(a.struct_field1) FROM t1.array_of_structs a) FROM T1 t1;
```

Field paths in the `FROM` clause must end in an
array field. In
addition, field paths can't contain arrays before the end of the path. For example, the path
`array_column.some_array.some_array_field` is invalid because it
contains an array before the end of the path.

> [!NOTE]
> **Note:** If a path has only one name, it's interpreted as a table. To work around this, wrap the path using `UNNEST`, or use the fully-qualified path.

> [!NOTE]
> **Note:** If a path has more than one name, and it matches a field name, it's interpreted as a field name. To force the path to be interpreted as a table name, wrap the path using `` ` ``.

##### `unnest_operator`

See [UNNEST operator](#unnest-operator).

##### `cte_name`

Common table expressions (CTEs) in a [`WITH` Clause](query-syntax-3.md#with-clause) act like
temporary tables that you can reference anywhere in the `FROM` clause.
In the example below, `subQ1` and `subQ2` are CTEs.

Example:

```sql
WITH
  subQ1 AS (SELECT * FROM Roster WHERE SchoolID = 52),
  subQ2 AS (SELECT SchoolID FROM subQ1)
SELECT DISTINCT * FROM subQ2;
```

The `WITH` clause hides any permanent tables with the same name
for the duration of the query, unless you qualify the table name, for example:

`dataset.Roster` or `project.dataset.Roster`.

### `UNNEST` operator

```text
unnest_operator:
  {
    UNNEST( array ) [ as_alias ]
    | array_path [ as_alias ]
  }
  [ WITH OFFSET [ as_alias ] ]

array:
  { array_expression | array_path }

as_alias:
  [AS] alias
```

The `UNNEST` operator takes an array and returns a table with one row for each
element in the array. The output of `UNNEST` is one [value table](query-syntax-3.md#value-tables) column.
For these `ARRAY` element types, `SELECT *` against the value table column
returns multiple columns:

- `STRUCT`

Input values:

- `array_expression`: An expression that produces an array and that's not an array path.
- `array_path`: The
  path to an `ARRAY` type.

  - In an implicit `UNNEST` operation, the path must start with a [range variable](query-syntax-3.md#range-variables) name.
  - In an explicit `UNNEST` operation, the path can optionally start with a [range variable](query-syntax-3.md#range-variables) name.

  The `UNNEST` operation with any [correlated](query-syntax-2.md#correlated-join-operation) `array_path` must
  be on the right side of a `CROSS JOIN`, `LEFT JOIN`, or
  `INNER JOIN` operation.
- `as_alias`: If specified, defines the explicit name of the value table
  column containing the array element values. It can be used to refer to
  the column elsewhere in the query.

- `WITH OFFSET`: `UNNEST` destroys the order of elements in the input
  array. Use this optional clause to return an additional column with
  the array element indexes, or *offsets* . Offset counting starts at zero for
  each row produced by the `UNNEST` operation. This column has an
  optional alias; If the optional alias isn't used, the default column name is
  `offset`.

  Example:

  ```sql
  SELECT * FROM UNNEST ([10,20,30]) as numbers WITH OFFSET;

  /*---------+--------+
   | numbers | offset |
   +---------+--------+
   | 10      | 0      |
   | 20      | 1      |
   | 30      | 2      |
   +---------+--------*/
  ```

You can also use `UNNEST` outside of the `FROM` clause with the
[`IN` operator](operators.md#in-operator).

For several ways to use `UNNEST`, including construction, flattening, and
filtering, see [Work with arrays](https://docs.cloud.google.com/bigquery/docs/arrays).

To learn more about the ways you can use `UNNEST` explicitly and implicitly,
see [Explicit and implicit `UNNEST`](#explicit-and-implicit-unnest).

#### `UNNEST` and structs

For an input array of structs, `UNNEST`
returns a row for each struct, with a separate column for each field in the
struct. The alias for each column is the name of the corresponding struct
field.

Example:

```sql
SELECT *
FROM UNNEST(
  ARRAY<
    STRUCT<
      x INT64,
      y STRING,
      z STRUCT<a INT64, b INT64>>>[
        (1, 'foo', (10, 11)),
        (3, 'bar', (20, 21))]);

/*---+-----+----------+
 | x | y   | z        |
 +---+-----+----------+
 | 1 | foo | {10, 11} |
 | 3 | bar | {20, 21} |
 +---+-----+----------*/
```

Because the `UNNEST` operator returns a
[value table](query-syntax-3.md#value-tables),
you can alias `UNNEST` to define a range variable that you can reference
elsewhere in the query. If you reference the range variable in the `SELECT`
list, the query returns a struct containing all of the fields of the original
struct in the input table.

Example:

```sql
SELECT *, struct_value
FROM UNNEST(
  ARRAY<
    STRUCT<
    x INT64,
    y STRING>>[
      (1, 'foo'),
      (3, 'bar')]) AS struct_value;

/*---+-----+--------------+
 | x | y   | struct_value |
 +---+-----+--------------+
 | 3 | bar | {3, bar}     |
 | 1 | foo | {1, foo}     |
 +---+-----+--------------*/
```

#### Explicit and implicit `UNNEST`

Array unnesting can be either explicit or implicit. To learn more, see the
following sections.

##### Explicit unnesting

The `UNNEST` keyword is required in explicit unnesting. For example:

```sql
WITH Coordinates AS (SELECT [1,2] AS position)
SELECT results FROM Coordinates, UNNEST(Coordinates.position) AS results;
```

This example and the following examples use the `array_path` called
`Coordinates.position` to illustrate unnesting.

##### Implicit unnesting

The `UNNEST` keyword isn't used in implicit unnesting.

For example:

```sql
WITH Coordinates AS (SELECT [1,2] AS position)
SELECT results FROM Coordinates, Coordinates.position AS results;
```

###### Tables and implicit unnesting

When you use `array_path` with implicit `UNNEST`, `array_path` must be prepended
with the table. For example:

```sql
WITH Coordinates AS (SELECT [1,2] AS position)
SELECT results FROM Coordinates, Coordinates.position AS results;
```

#### `UNNEST` and `NULL` values

`UNNEST` treats `NULL` values as follows:

- `NULL` and empty arrays produce zero rows.
- An array containing `NULL` values produces rows containing `NULL` values.

### `PIVOT` operator

```text
FROM from_item[, ...] pivot_operator

pivot_operator:
  PIVOT(
    aggregate_function_call [[AS] prefix][, ...]
    FOR input_column
    IN ( value [[AS] pivot_column][, ...] )
  ) [[AS] table_alias]
```

The `PIVOT` operator rotates rows into columns using aggregation.
`PIVOT` is part of the `FROM` clause.

- `PIVOT` can be used to modify any table expression.
- Combining `PIVOT` with `FOR SYSTEM_TIME AS OF` isn't allowed, although users may use `PIVOT` against a subquery input which itself uses `FOR SYSTEM_TIME AS OF`.
- A `WITH OFFSET` clause immediately preceding the `PIVOT` operator isn't allowed.

Conceptual example:

```sql
-- Before PIVOT is used to rotate sales and quarter into Q1, Q2, Q3, Q4 columns:
/*---------+-------+---------+------+
 | product | sales | quarter | year |
 +---------+-------+---------+------|
 | Kale    | 51    | Q1      | 2020 |
 | Kale    | 23    | Q2      | 2020 |
 | Kale    | 45    | Q3      | 2020 |
 | Kale    | 3     | Q4      | 2020 |
 | Kale    | 70    | Q1      | 2021 |
 | Kale    | 85    | Q2      | 2021 |
 | Apple   | 77    | Q1      | 2020 |
 | Apple   | 0     | Q2      | 2020 |
 | Apple   | 1     | Q1      | 2021 |
 +---------+-------+---------+------*/

-- After PIVOT is used to rotate sales and quarter into Q1, Q2, Q3, Q4 columns:
/*---------+------+----+------+------+------+
 | product | year | Q1 | Q2   | Q3   | Q4   |
 +---------+------+----+------+------+------+
 | Apple   | 2020 | 77 | 0    | NULL | NULL |
 | Apple   | 2021 | 1  | NULL | NULL | NULL |
 | Kale    | 2020 | 51 | 23   | 45   | 3    |
 | Kale    | 2021 | 70 | 85   | NULL | NULL |
 +---------+------+----+------+------+------*/
```

**Definitions**

Top-level definitions:

- `from_item`: The table, subquery, or table-valued function (TVF) on which to perform a pivot operation. The `from_item` must [follow these rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#rules_for_pivot_from_item).
- `pivot_operator`: The pivot operation to perform on a `from_item`.
- `table_alias`: An alias for the results of the `PIVOT` operation. This alias can be referenced elsewhere in the query.

`pivot_operator` definitions:

- `aggregate_function_call`: An aggregate function call that aggregates all input rows where `input_column` matches each `value`, [following these
  rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#rules_for_pivot_agg_function). Each aggregation corresponding to a different `value` produces a different column in the output.
  - `prefix`: An optional column prefix to assign to each column created by the pivot operation.
- `input_column`: Takes a column and retrieves the row values for the column, [following these rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#rules_input_column).
- `value`: A value to match against `input_column`. A `value` data type must
  match the data type in `input_column` so that the values can be compared.
  It's possible to have a `value` that doesn't match a value in `input_column`.
  A `value` must be a constant, [following these rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#rules_value).

  - `pivot_column`: An optional column name or suffix for the column created for this `value`. Output columns are constructed by concatenating:

  1. The `prefix`, if provided.
  2. An underscore, if `prefix` is present.
  3. The `pivot_column` name, if present, or a string representation of `value`.

**Rules**

Rules for a `from_item` passed to `PIVOT`:

- The `from_item` may consist of any table, subquery, or table-valued function (TVF) result.
- The `from_item` may not produce a value table.
- The `from_item` may not be a subquery using `SELECT AS STRUCT`.

Rules for `aggregate_function_call`:

- Must be an aggregate function. For example, `SUM`.
- You can't use [multi-level aggregation](../googlesql-functions/aggregate-function-calls.md#multi-level-aggregation) within a `PIVOT` operator call.
- You may reference columns in a table passed to `PIVOT`, as well as correlated columns, but may not access columns defined by the `PIVOT` clause itself.
- A table passed to `PIVOT` may be accessed through its alias if one is provided.
- You can only use an aggregate function that takes one argument.
- Except for `COUNT`, you can only use aggregate functions that ignore `NULL` inputs.
- If you are using `COUNT`, you can use `*` as an argument.

Rules for `input_column`:

- May access columns from the input table, as well as correlated columns, not columns defined by the `PIVOT` clause, itself.
- Evaluated against each row in the input table; aggregate and window function calls are prohibited.
- Non-determinism is okay.
- The type must be groupable.
- The input table may be accessed through its alias if one is provided.

Rules for `value`:

- A `value` must be a constant.
- Named constants, such as variables, aren't supported.
- Query parameters aren't supported.
- If a name is desired for a named constant or query parameter, specify it explicitly with `pivot_column`.
- Corner cases exist where distinct `value`s can end up with the same default `pivot_column` names. For example, an input column might contain both a `NULL` value and the string literal `"NULL"`. When this happens, multiple pivot columns are created with the same name. To avoid this situation, use explicit `pivot_column` names.
- If a `pivot_column` name isn't specified, a column name is constructed from `value` as follows:

| From | To | Example |
|---|---|---|
| NULL | NULL | Input: NULL Output: "NULL" |
| `INT64` `NUMERIC` `BIGNUMERIC` | The number in string format with the following rules: - Positive numbers are preceded with `_`. - Negative numbers are preceded with `minus_`. - A decimal point is replaced with `_point_`. | Input: 1 Output: _1 <hr> Input: -1 Output: minus_1 <hr> Input: 1.0 Output: _1_point_0 |
| BOOL | `TRUE` or `FALSE`. | Input: TRUE Output: TRUE <hr> Input: FALSE Output: FALSE |
| STRING | The string value. | Input: "PlayerName" Output: PlayerName |
| DATE | The date in `_YYYY_MM_DD` format. | Input: DATE '2013-11-25' Output: _2013_11_25 |
| ENUM | The name of the enumeration constant. | Input: COLOR.RED Output: RED |
| STRUCT | A string formed by computing the `pivot_column` name for each field and joining the results together with an underscore. The following rules apply: - If the field is named: `<field_name>_<pivot_column_name_for_field_name>`. - If the field is unnamed: `<pivot_column_name_for_field_name>`. `<pivot_column_name_for_field_name>` is determined by applying the rules in this table, recursively. If no rule is available for any `STRUCT` field, the entire pivot column is unnamed. Due to implicit type coercion from the `IN` list values to the type of `<value-expression>`, field names must be present in `input_column` to have an effect on the names of the pivot columns. | Input: STRUCT("one", "two") Output: one_two <hr> Input: STRUCT("one" AS a, "two" AS b) Output: one_a_two_b |
| All other data types | Not supported. You must provide an alias. |   |

**Examples**

The following examples reference a table called `Produce` that looks like this:

```sql
WITH Produce AS (
  SELECT 'Kale' as product, 51 as sales, 'Q1' as quarter, 2020 as year UNION ALL
  SELECT 'Kale', 23, 'Q2', 2020 UNION ALL
  SELECT 'Kale', 45, 'Q3', 2020 UNION ALL
  SELECT 'Kale', 3, 'Q4', 2020 UNION ALL
  SELECT 'Kale', 70, 'Q1', 2021 UNION ALL
  SELECT 'Kale', 85, 'Q2', 2021 UNION ALL
  SELECT 'Apple', 77, 'Q1', 2020 UNION ALL
  SELECT 'Apple', 0, 'Q2', 2020 UNION ALL
  SELECT 'Apple', 1, 'Q1', 2021)
SELECT * FROM Produce

/*---------+-------+---------+------+
 | product | sales | quarter | year |
 +---------+-------+---------+------|
 | Kale    | 51    | Q1      | 2020 |
 | Kale    | 23    | Q2      | 2020 |
 | Kale    | 45    | Q3      | 2020 |
 | Kale    | 3     | Q4      | 2020 |
 | Kale    | 70    | Q1      | 2021 |
 | Kale    | 85    | Q2      | 2021 |
 | Apple   | 77    | Q1      | 2020 |
 | Apple   | 0     | Q2      | 2020 |
 | Apple   | 1     | Q1      | 2021 |
 +---------+-------+---------+------*/
```

With the `PIVOT` operator, the rows in the `quarter` (`input_column`) column are
rotated into these new columns (`pivot_column`s): `Q1`, `Q2`, `Q3`, `Q4`. The
aggregate function `SUM` is implicitly grouped by all unaggregated columns other
than the `input_column`: `product` and `year`.

```sql
SELECT * FROM
  Produce
  PIVOT(SUM(sales) FOR quarter IN ('Q1', 'Q2', 'Q3', 'Q4'))

/*---------+------+----+------+------+------+
 | product | year | Q1 | Q2   | Q3   | Q4   |
 +---------+------+----+------+------+------+
 | Apple   | 2020 | 77 | 0    | NULL | NULL |
 | Apple   | 2021 | 1  | NULL | NULL | NULL |
 | Kale    | 2020 | 51 | 23   | 45   | 3    |
 | Kale    | 2021 | 70 | 85   | NULL | NULL |
 +---------+------+----+------+------+------*/
```

If you don't include `year`, then `SUM` is grouped only by `product`.

```sql
SELECT * FROM
  (SELECT product, sales, quarter FROM Produce)
  PIVOT(SUM(sales) FOR quarter IN ('Q1', 'Q2', 'Q3', 'Q4'))

/*---------+-----+-----+------+------+
 | product | Q1  | Q2  | Q3   | Q4   |
 +---------+-----+-----+------+------+
 | Apple   | 78  | 0   | NULL | NULL |
 | Kale    | 121 | 108 | 45   | 3    |
 +---------+-----+-----+------+------*/
```

You can select a subset of values from the `input_column`:

```sql
SELECT * FROM
  (SELECT product, sales, quarter FROM Produce)
  PIVOT(SUM(sales) FOR quarter IN ('Q1', 'Q2', 'Q3'))

/*---------+-----+-----+------+
 | product | Q1  | Q2  | Q3   |
 +---------+-----+-----+------+
 | Apple   | 78  | 0   | NULL |
 | Kale    | 121 | 108 | 45   |
 +---------+-----+-----+------*/
```

```sql
SELECT * FROM
  (SELECT sales, quarter FROM Produce)
  PIVOT(SUM(sales) FOR quarter IN ('Q1', 'Q2', 'Q3'))

/*-----+-----+----+
 | Q1  | Q2  | Q3 |
 +-----+-----+----+
 | 199 | 108 | 45 |
 +-----+-----+----*/
```

You can include multiple aggregation functions in the `PIVOT`. In this case, you
must specify a prefix for each aggregation. These prefixes are used to construct
the column names in the resulting table.

```sql
SELECT * FROM
  (SELECT product, sales, quarter FROM Produce)
  PIVOT(SUM(sales) AS total_sales, COUNT(*) AS num_records FOR quarter IN ('Q1', 'Q2'))

/*--------+----------------+----------------+----------------+----------------+
 |product | total_sales_Q1 | num_records_Q1 | total_sales_Q2 | num_records_Q2 |
 +--------+----------------+----------------+----------------+----------------+
 | Kale   | 121            | 2              | 108            | 2              |
 | Apple  | 78             | 2              | 0              | 1              |
 +--------+----------------+----------------+----------------+----------------*/
```

The following example includes a `prefix` (`sales`) for the pivot columns,
`pivot_column` aliases (`first_quarter` and `second_quarter`) for the rotated
columns, and a `table_alias` (`pivoted_sales`) for the result table. The
enclosing `SELECT` statement references the table alias to select the pivoted
columns:

```sql
SELECT
  pivoted_sales.product,
  pivoted_sales.sales_first_quarter,
  pivoted_sales.sales_second_quarter
FROM
  (SELECT product, sales, quarter FROM Produce)
  PIVOT(SUM(sales) AS sales FOR quarter IN ('Q1' AS first_quarter, 'Q2' AS second_quarter)) AS pivoted_sales;

/*---------+---------------------+----------------------+
 | product | sales_first_quarter | sales_second_quarter |
 +---------+---------------------+----------------------+
 | Apple   | 78                  | 0                    |
 | Kale    | 121                 | 108                  |
 +---------+---------------------+----------------------*/
```

### `UNPIVOT` operator

```text
FROM from_item[, ...] unpivot_operator

unpivot_operator:
  UNPIVOT [ { INCLUDE NULLS | EXCLUDE NULLS } ] (
    { single_column_unpivot | multi_column_unpivot }
  ) [unpivot_alias]

single_column_unpivot:
  values_column
  FOR name_column
  IN (columns_to_unpivot)

multi_column_unpivot:
  values_column_set
  FOR name_column
  IN (column_sets_to_unpivot)

values_column_set:
  (values_column[, ...])

columns_to_unpivot:
  unpivot_column [row_value_alias][, ...]

column_sets_to_unpivot:
  (unpivot_column [row_value_alias][, ...])

unpivot_alias and row_value_alias:
  [AS] alias
```

The `UNPIVOT` operator rotates columns into rows. `UNPIVOT` is part of the
`FROM` clause.

- `UNPIVOT` can be used to modify any table expression.
- Combining `UNPIVOT` with `FOR SYSTEM_TIME AS OF` isn't allowed, although users may use `UNPIVOT` against a subquery input which itself uses `FOR SYSTEM_TIME AS OF`.
- A `WITH OFFSET` clause immediately preceding the `UNPIVOT` operator isn't allowed.
- `PIVOT` aggregations can't be reversed with `UNPIVOT`.

Conceptual example:

```sql
-- Before UNPIVOT is used to rotate Q1, Q2, Q3, Q4 into sales and quarter columns:
/*---------+----+----+----+----+
 | product | Q1 | Q2 | Q3 | Q4 |
 +---------+----+----+----+----+
 | Kale    | 51 | 23 | 45 | 3  |
 | Apple   | 77 | 0  | 25 | 2  |
 +---------+----+----+----+----*/

-- After UNPIVOT is used to rotate Q1, Q2, Q3, Q4 into sales and quarter columns:
/*---------+-------+---------+
 | product | sales | quarter |
 +---------+-------+---------+
 | Kale    | 51    | Q1      |
 | Kale    | 23    | Q2      |
 | Kale    | 45    | Q3      |
 | Kale    | 3     | Q4      |
 | Apple   | 77    | Q1      |
 | Apple   | 0     | Q2      |
 | Apple   | 25    | Q3      |
 | Apple   | 2     | Q4      |
 +---------+-------+---------*/
```

**Definitions**

Top-level definitions:

- `from_item`: The table, subquery, or table-valued function (TVF) on which to perform a pivot operation. The `from_item` must [follow these rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#rules_for_unpivot_from_item).
- `unpivot_operator`: The pivot operation to perform on a `from_item`.

`unpivot_operator` definitions:

- `INCLUDE NULLS`: Add rows with `NULL` values to the result.
- `EXCLUDE NULLS`: don't add rows with `NULL` values to the result. By default, `UNPIVOT` excludes rows with `NULL` values.
- `single_column_unpivot`: Rotates columns into one `values_column` and one `name_column`.
- `multi_column_unpivot`: Rotates columns into multiple `values_column`s and one `name_column`.
- `unpivot_alias`: An alias for the results of the `UNPIVOT` operation. This alias can be referenced elsewhere in the query.

`single_column_unpivot` definitions:

- `values_column`: A column to contain the row values from `columns_to_unpivot`. [Follow these rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#rules_for_values_column) when creating a values column.
- `name_column`: A column to contain the column names from `columns_to_unpivot`. [Follow these rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#rules_for_name_column) when creating a name column.
- `columns_to_unpivot`: The columns from the `from_item` to populate `values_column` and `name_column`. [Follow these rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#rules_for_unpivot_column) when creating an unpivot column.
  - `row_value_alias`: An optional alias for a column that's displayed for the column in `name_column`. If not specified, the string value of the column name is used. [Follow these rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#rules_for_row_value_alias) when creating a row value alias.

`multi_column_unpivot` definitions:

- `values_column_set`: A set of columns to contain the row values from `columns_to_unpivot`. [Follow these rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#rules_for_values_column) when creating a values column.
- `name_column`: A set of columns to contain the column names from `columns_to_unpivot`. [Follow these rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#rules_for_name_column) when creating a name column.
- `column_sets_to_unpivot`: The columns from the `from_item` to unpivot. [Follow these rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#rules_for_unpivot_column) when creating an unpivot column.
  - `row_value_alias`: An optional alias for a column set that's displayed for the column set in `name_column`. If not specified, a string value for the column set is used and each column in the string is separated with an underscore (`_`). For example, `(col1, col2)` outputs `col1_col2`. [Follow these rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#rules_for_row_value_alias) when creating a row value alias.

**Rules**

Rules for a `from_item` passed to `UNPIVOT`:

- The `from_item` may consist of any table, subquery, or table-valued function (TVF) result.
- The `from_item` may not produce a value table.
- Duplicate columns in a `from_item` can't be referenced in the `UNPIVOT` clause.

Rules for `unpivot_operator`:

- Expressions aren't permitted.
- Qualified names aren't permitted. For example, `mytable.mycolumn` isn't allowed.
- In the case where the `UNPIVOT` result has duplicate column names:
  - `SELECT *` is allowed.
  - `SELECT values_column` causes ambiguity.

Rules for `values_column`:

- It can't be a name used for a `name_column` or an `unpivot_column`.
- It can be the same name as a column from the `from_item`.

Rules for `name_column`:

- It can't be a name used for a `values_column` or an `unpivot_column`.
- It can be the same name as a column from the `from_item`.

Rules for `unpivot_column`:

- Must be a column name from the `from_item`.
- It can't reference duplicate `from_item` column names.
- All columns in a column set must have equivalent data types.
  - Data types can't be coerced to a common supertype.
  - If the data types are exact matches (for example, a struct with different field names), the data type of the first input is the data type of the output.
- You can't have the same name in the same column set. For example, `(emp1, emp1)` results in an error.
- You can have a the same name in different column sets. For example, `(emp1, emp2), (emp1, emp3)` is valid.

Rules for `row_value_alias`:

- This can be a string or an `INT64` literal.
- The data type for all `row_value_alias` clauses must be the same.
- If the value is an `INT64`, the `row_value_alias` for each `unpivot_column` must be specified.

**Examples**

The following examples reference a table called `Produce` that looks like this:

```sql
WITH Produce AS (
  SELECT 'Kale' as product, 51 as Q1, 23 as Q2, 45 as Q3, 3 as Q4 UNION ALL
  SELECT 'Apple', 77, 0, 25, 2)
SELECT * FROM Produce

/*---------+----+----+----+----+
 | product | Q1 | Q2 | Q3 | Q4 |
 +---------+----+----+----+----+
 | Kale    | 51 | 23 | 45 | 3  |
 | Apple   | 77 | 0  | 25 | 2  |
 +---------+----+----+----+----*/
```

With the `UNPIVOT` operator, the columns `Q1`, `Q2`, `Q3`, and `Q4` are
rotated. The values of these columns now populate a new column called `Sales`
and the names of these columns now populate a new column called `Quarter`.
This is a single-column unpivot operation.

```sql
SELECT * FROM Produce
UNPIVOT(sales FOR quarter IN (Q1, Q2, Q3, Q4))

/*---------+-------+---------+
 | product | sales | quarter |
 +---------+-------+---------+
 | Kale    | 51    | Q1      |
 | Kale    | 23    | Q2      |
 | Kale    | 45    | Q3      |
 | Kale    | 3     | Q4      |
 | Apple   | 77    | Q1      |
 | Apple   | 0     | Q2      |
 | Apple   | 25    | Q3      |
 | Apple   | 2     | Q4      |
 +---------+-------+---------*/
```

In this example, we `UNPIVOT` four quarters into two semesters.
This is a multi-column unpivot operation.

```sql
SELECT * FROM Produce
UNPIVOT(
  (first_half_sales, second_half_sales)
  FOR semesters
  IN ((Q1, Q2) AS 'semester_1', (Q3, Q4) AS 'semester_2'))

/*---------+------------------+-------------------+------------+
 | product | first_half_sales | second_half_sales | semesters  |
 +---------+------------------+-------------------+------------+
 | Kale    | 51               | 23                | semester_1 |
 | Kale    | 45               | 3                 | semester_2 |
 | Apple   | 77               | 0                 | semester_1 |
 | Apple   | 25               | 2                 | semester_2 |
 +---------+------------------+-------------------+------------*/
```

### `TABLESAMPLE` operator

```text
TABLESAMPLE SYSTEM ( percent PERCENT )
```

**Description**

You can use the `TABLESAMPLE` operator to select a random sample of a dataset.
This operator is useful when you're working with tables that have large
amounts of data and you don't need precise answers.

Sampling returns a variety of records while avoiding the costs associated with
scanning and processing an entire table. Each execution of the query might
return different results because each execution processes an independently
computed sample. GoogleSQL doesn't cache the results of queries that
include a `TABLESAMPLE` clause.

Replace `percent` with the percentage of the dataset that you want to include in
the results. The value must be between `0` and `100`. The value can be a literal
value or a query parameter. It can't be a variable.

For more information, see [Table sampling](https://docs.cloud.google.com/bigquery/docs/table-sampling).

**Example**

The following query selects approximately 10% of a table's data:

```sql
SELECT * FROM dataset.my_table TABLESAMPLE SYSTEM (10 PERCENT)
```

### `MATCH_RECOGNIZE` clause

```text
FROM from_item
MATCH_RECOGNIZE (
  [ PARTITION BY partition_expr [, ... ] ]
  ORDER BY order_expr [{ ASC | DESC }] [{ NULLS FIRST | NULLS LAST }] [, ...]
  MEASURES { measures_expr [AS] alias } [, ... ]
  [ AFTER MATCH SKIP { PAST LAST ROW | TO NEXT ROW } ]
  PATTERN (pattern)
  DEFINE symbol AS boolean_expr [, ... ]
  [ OPTIONS ( [ use_longest_match = { TRUE | FALSE } ] ) ]
)
```

**Description**

The `MATCH_RECOGNIZE` clause is an optional sub-clause of the `FROM` clause,
used to filter and aggregate based on matches. A *match* is an ordered sequence
of rows that match a pattern that you specify.
Matching rows works similarly to matching with regular expressions, but
instead of matching characters in a string, the `MATCH_RECOGNIZE` clause finds
matches across rows in a table.

**Definitions**

- `from_item`: The data over which the `MATCH_RECOGNIZE` clause operates.
- `partition_expr`: An expression for how to partition the input. The expression can't contain floating point types, non-groupable types, constants, or window functions.
- `order_expr`: An orderable column or expression used to order the rows before matching.
- `measures_expr`: An aggregate expression that is evaluated per partition and match. The expression can reference columns and symbols.
- `alias`: The output column name for `measures_expr`.
- `PAST LAST ROW`: Don't allow overlapping matches. The next match must start from one or more rows past the last row in the previous match. The default value for `AFTER MATCH SKIP` is `PAST LAST ROW`.
- `TO NEXT ROW`: Allow overlapping matches. The next match can begin one row after the start of the previous match. Multiple matches that start at the same row aren't allowed.
- `pattern`: A sequence of symbols and [pattern elements](#pattern-clause) that defines a match.
- `symbol`: A name given to a boolean expression used to construct the pattern.
- `boolean_expr`: A boolean expression for a symbol that determines whether a row matches that symbol.
- `use_longest_match`: If true, then the chosen match starting from any given row is the match that includes the most rows. The default value is `FALSE`. For more information, see [Match disambiguation rules](#match-disambiguation).

**Output**

When you use the `MATCH_RECOGNIZE` clause, input data is transformed
in the following way:

If the `PARTITION BY` clause is present, then the output is the following:

- There is one row for each match in each partition. Partitions with no matches don't generate any rows.
- There is one column for each expression in the `PARTITION BY` clause, and one column for each expression in the `MEASURES` clause.

If the `PARTITION BY` clause is omitted, then the output is the following:

- There is one row for each match.
- There is one column for each expression in the `MEASURES` clause.

#### `PARTITION BY` clause

The `PARTITION BY` clause specifies a list of expressions that are used
to partition the input rows for pattern
matching. Each partition is sorted according to the `ORDER BY` clause and
matches must be entirely contained within a partition.
If the `PARTITION BY` clause is omitted,
then the entire input table belongs to a single partition.

You can't introduce an alias for a partition expression. If the expression is a
single column name, then that name is used as the column name in the output.
Otherwise, the output column for that partition is anonymous.

#### `ORDER BY` clause

The `ORDER BY` clause within a `MATCH_RECOGNIZE` clause orders the
rows of the input for pattern matching and
follows the same rules as the standard [`ORDER BY` clause](query-syntax-2.md#order-by-clause).
The data type of each
expression must be [orderable](data-types.md#orderable-data-types).
If all expressions in the `ORDER BY`
clause are tied, then the rows may be ordered arbitrarily.

#### `MEASURES` clause

The `MEASURES` clause lists which aggregate expressions to compute for each
match, subject to the following rules:

- You must provide an alias for each aggregate expression.
- Aggregate expressions must aggregate any columns that they reference, except for columns in the `PARTITION BY` clause, which are guaranteed to have the same value for every row in a match.
- To perform aggregation only on rows that matched a particular symbol, use the syntax `symbol_name.column_name`. You can't use a symbol without a column reference. You can't reference multiple symbols within the same aggregation function.
- A single row can match at most one symbol within a pattern. If a row satisfies the boolean expressions of multiple symbols in the `DEFINE` clause, only the symbol that that takes precedence can contribute to an aggregation expression. For more information about how to determine which symbol counts towards a match, see [match disambiguation](#match-disambiguation).

##### Order-sensitive aggregate functions

If an aggregate expression contains a function that depends on the order of
input, such as `ARRAY_AGG` or `STRING_AGG`, the inputs are ordered according
to the `ORDER BY` clause of the `MATCH_RECOGNIZE` clause, unless they include
the keyword `DISTINCT` or an explicit ordering.
If you explicitly specify an ordering within an
aggregate function call, such as `ARRAY_AGG(x ORDER BY x)`, then the function
uses the order that you specified.

##### `MEASURES` clause functions

In addition to the standard aggregate functions, you can use the following
functions in the `MEASURES` clause:

- `FIRST(x)`: Returns the value of `x` in the first row of the match, or `NULL` if the match is empty.
- `LAST(x)`: Returns the value of `x` in the last row of the match, or `NULL` if the match is empty.
- `MATCH_NUMBER()`: Returns the integer rank of the match, relative to other matches in the same partition, starting at 1. Matches are ranked according to the order of their starting rows using the `ORDER BY` clause. This function can be used with or without aggregation, because it returns the same value for every row in a match.
- `MATCH_ROW_NUMBER()`: Returns an integer specifying the row number of the current row, within the current match, starting at 1. The results of this function must be aggregated.
- `CLASSIFIER()`: Returns a `STRING` value for each row in the match that indicates the name of the symbol matched by the row. The results of this function must be aggregated.

The following SQL snippet references a table with columns called `sales`,
`sale_date`, and `customer`, and
shows examples of what is and isn't allowed in the `MEASURES` clause:

```sql
PARTITION BY customer
ORDER BY sale_date
MEASURES
  # Error. No alias.
  SUM(sales),

  # Correct. You don't need to aggregate a partition column.
  customer AS customer_name,

  # Error. You must aggregate all non-partition columns.
  sales AS customer_sales,

  # Correct. You can aggregate table columns.
  SUM(sales) AS total_sales,

  # Correct. Uses the symbol.column syntax.
  SUM(low_sales.sales) AS total_low_sales,

  # Correct. Multiple symbols appear in separate aggregations.
  SUM(low_sales.sales) + SUM(high_sales.sales) AS combined_low_high,

  # Error. Multiple symbols appear in a single aggregation.
  SUM(low_sales.sales + high_sales.sales) AS bad_combined_sales,

  # Error. A single aggregation can't combine symbol-qualified and
  # non-symbol-qualified terms.
  SUM(low_sales.sales + sales)
PATTERN (low_sales+ high_sales*)
DEFINE
  low_sales AS sales < 100,
  high_sales AS sales > 200
```

#### `PATTERN` clause

The `PATTERN` clause specifies a pattern to match. A pattern is a sequence of
symbols and operators. Adjacent symbols within a pattern must be separated by a
space or grouped separately using parentheses. Pattern matches are computed
based on the order specified in the `ORDER BY` clause. Each pattern match
must appear entirely within a partition. Patterns support the
following elements, listed in order of precedence:

| Element | Description |
|---|---|
| `(<pattern>)` | Matches `<pattern>`. Parentheses indicate grouping. |
| `<symbol>` | Matches a single row such that the associated expression in the `DEFINE` clause evaluates to `TRUE` for that row. See the [`DEFINE` clause](#define-clause) for details. |
| `()` | Matches an empty row sequence unconditionally. |
| `^` | Matches an empty row sequence, only before the first row of input. |
| `$` | Matches an empty row sequence, only after the last row of input. |
| `<pattern>?` | Matches `<pattern>` zero or one times; prefer once. |
| `<pattern>??` | Matches `<pattern>` zero or one times; prefer zero. |
| `<pattern>*` | Matches `<pattern>` zero or more times; prefer more. |
| `<pattern>*?` | Matches `<pattern>` zero or more times; prefer fewer. |
| `<pattern>+` | Matches `<pattern>` one or more times; prefer more. |
| `<pattern>+?` | Matches `<pattern>` one or more times; prefer fewer. |
| `<pattern>{n}` | Matches `<pattern>` exactly n times. |
| `<pattern>{m,}` | Matches `<pattern>` at least `m` times; prefer more. |
| `<pattern>{m,}?` | Matches `<pattern>` at least `m` times; prefer fewer. |
| `<pattern>{,n}` | Matches `<pattern>` at most `n` times; prefer more. |
| `<pattern>{,n}?` | Matches `<pattern>` at most `n` times; prefer fewer. |
| `<pattern>{m,n}` | Matches `<pattern>` between `m` and `n` times, inclusive; prefer more. |
| `<pattern>{m,n}?` | Matches `<pattern>` between `m` and `n` times, inclusive; prefer fewer. |
| `<pattern1> <pattern2>` | Matches `<pattern1>`, followed by `<pattern2>`. |
| `<pattern1> \| <pattern2>` | Matches either `<pattern1>` or `<pattern2>`; prefer `<pattern1>`. |
| `<pattern> \| ` | Matches either `<pattern>` or an empty row sequence; prefer `<pattern>`. This is equivalent to `<pattern>?`. |
| `\| <pattern>` | Matches either `<pattern>` or an empty row sequence; prefer the empty row sequence. This is equivalent to `<pattern>??`. |

The values of `m` and `n` must be non-null integer
literals or query parameters between
0 and 10,000. If a quantifier contains an upper and lower bound, such as
`{m,n}`, then the upper bound can't be less than the lower bound.

#### `DEFINE` clause

The `DEFINE` clause lists all symbols used in the pattern. Each symbol is
defined by a boolean expression. The symbol can
match a row if the expression evaluates to `TRUE` for that row.
Every symbol must appear at least once in the
`PATTERN` clause.

A single row can
match at most one symbol within a match, even if it satisfies the boolean
expressions of multiple symbols in the `DEFINE` clause. Multiple matches
can't start at the same row. For more information, see
[match disambiguation](#match-disambiguation).

For example, you can use the following pattern and symbols in
a `MATCH_RECOGNIZE` clause to
match pairs of adjacent rows in which the value of `sales` is less than 100 in
the first row and greater than 200 in the following row:

```sql
PATTERN (low_sales high_sales)
DEFINE
  low_sales AS sales < 100,
  high_sales AS sales > 200
```

The following example matches one or more rows with sales less than 100,
followed by at most one row with sales greater than 200, followed
by any number of rows with sales less than 100:

```sql
PATTERN (low_sales+ high_sales? low_sales*)
DEFINE
  low_sales AS sales < 100,
  high_sales AS sales > 200
```

There are two functions unique to the `DEFINE` clause, `PREV()` and `NEXT()`,
that you can use to define a symbol in relation to rows around the
current row. Each function accepts a column name and, optionally, a nonnegative
integer indicating how many rows away to look:

- `PREV(column_name [, num_rows])`: Returns the value of `column_name` that occurs `num_rows` before the current row, or `NULL` if that row doesn't exist. The default value of `num_rows` is 1.
- `NEXT(column_name [, num_rows])`: Returns the value of `column_name` that occurs `num_rows` after the current row, or `NULL` if that row doesn't exist. The default value of `num_rows` is 1.

You can't use navigation functions, such as `LEAD` or `LAG`, to reference other
row values.

The following example matches sequences of three rows in which the value of `x`
increases and then decreases:

```sql
PATTERN (incline peak decline)
DEFINE
  incline AS x < NEXT(x),
  peak AS PREV(x) < x AND x > NEXT(x),
  decline AS PREV(x) > x
```

#### Match disambiguation

When multiple matches exist with the same starting row, only one is selected
according to the following rules:

1. Longest match mode.

   - If the `OPTIONS` clause is present and `use_longest_match` is `TRUE`, then the chosen match is the one that includes the most rows. In case of a tie, the chosen match is decided by operator preference.
   - If the `OPTIONS` clause is not present or `use_longest_match` is `FALSE`, then the match is chosen based on operator preference.
2. Operator preference.

   - The `|` operator gives preference to the left operand over the right operand.
   - Greedy quantifiers, which include `?`, `*`, `+`, `{m,}`, `{,n}`, and `{m,n}`, give preference to matches that repeat the operand more times over matches that repeat it fewer times.
   - Reluctant quantifiers, which include `??`, `*?`, `{m,}?`, `{,n}?`, and `{m,n}?`, give preference to matches that repeat the operand fewer times over matches that repeat it more times.

When operator preferences in different parts of the pattern conflict with each
other, preferences that occur earlier in the match take priority over those that
occur later in the match. For example, the pattern `A* B+` first prioritizes
increasing the number of rows that match the `A` symbol, even if that
results in fewer rows that match the `B` symbol. In other words, `AAB` is
chosen over `ABB`.

The pattern `(A|B B)+` prioritizes starting the match with `AB` rather than
`BB`, even if that results in fewer repetitions overall.

**Examples**

In the following example, pattern matches are single rows. The pattern matches
the `low` symbol if `x` is less than or equal to 2. The pattern matches the
`high` symbol if `x` is greater than or equal to 2. There are three matches,
one for each row:

- The first row of input only satisfies the `low` symbol expression, so `x = 1` contributes to the `low_agg` aggregation but not the `high_agg` aggregation.
- In the second row of input, `x` satisfies both symbol expressions, but the `low` symbol takes precedence because in the `|` operator, preference is given to the symbol on the left. Therefore, `x = 2` contributes only to the `low_agg` aggregation.
- The third row of input only satisfies the `high` symbol expression, so `x = 3` contributes to the `high_agg` aggregation but not the `low_agg` aggregation.

  ```sql
  SELECT * FROM (
    SELECT 1 as x
    UNION ALL
    SELECT 2
    UNION ALL
    SELECT 3
  )
  MATCH_RECOGNIZE(
    ORDER BY x
    MEASURES
      ARRAY_AGG(high.x) AS high_agg,
      ARRAY_AGG(low.x) AS low_agg
    AFTER MATCH SKIP TO NEXT ROW
    PATTERN (low | high)
    DEFINE
      low AS x <= 2,
      high AS x >= 2
  );

  /*----------+---------+
   | high_agg | low_agg |
   +----------+---------+
   | NULL     | [1]     |
   | NULL     | [2]     |
   | [3]      | NULL    |
   +----------+---------*/
  ```

The following example is similar to the preceding example, except that the
pattern is changed to `low | high+` and the `use_longest_match` option is set to
`TRUE`. There are three potential pattern matches that start at the second row
of input:

1. Match the second row using the `low` symbol.
2. Match the second row using the `high` symbol.
3. Match the second row using the `high` symbol and the third row using the `high` symbol.

The third option is chosen because it's strictly longest. Since there is no
tie for length, operator preference isn't considered.

```sql
SELECT * FROM (
  SELECT 1 as x
  UNION ALL
  SELECT 2
  UNION ALL
  SELECT 3
)
MATCH_RECOGNIZE(
  ORDER BY x
  MEASURES
    ARRAY_AGG(high.x) AS high_agg,
    ARRAY_AGG(low.x) AS low_agg
  AFTER MATCH SKIP TO NEXT ROW
  PATTERN (low | high+)
  DEFINE
    low AS x <= 2,
    high AS x >= 2
  OPTIONS (use_longest_match = TRUE)
);

/*----------+---------+
 | high_agg | low_agg |
 +----------+---------+
 | NULL     | [1]     |
 | [2,3]    | NULL    |
 | [3]      | NULL    |
 +----------+---------*/
```

The following examples reference a table called `Sales`:

```sql
WITH Sales AS (
  SELECT 'Daisy' AS customer, DATE '2024-01-03' AS sale_date, 'Electronics' AS product_category, 500 AS amount UNION ALL
  SELECT 'Daisy', DATE '2024-01-04', 'Software', 30 UNION ALL
  SELECT 'Ian', DATE '2024-02-01', 'Books', 20 UNION ALL
  SELECT 'Ian', DATE '2024-02-08', 'Clothing', 30 UNION ALL
  SELECT 'Ian', DATE '2024-02-10', 'Clothing', 90 UNION ALL
  SELECT 'Daisy', DATE '2024-03-15', 'Software', 40 UNION ALL
  SELECT 'Ian', DATE '2024-03-15', 'Electronics', 300 UNION ALL
  SELECT 'Ian', DATE '2024-03-15', 'Electronics', 400 UNION ALL
  SELECT 'Ian', DATE '2024-03-21', 'Software', 30 UNION ALL
  SELECT 'Ian', DATE '2024-04-07', 'Books', 50 UNION ALL
  SELECT 'Daisy', DATE '2024-06-28', 'Electronics', 400 UNION ALL
  SELECT 'Daisy', DATE '2024-06-29', 'Clothing', 100 UNION ALL
  SELECT 'Daisy', DATE '2024-06-30', 'Software', 30 UNION ALL
  SELECT 'Ian', DATE '2024-07-07', 'Clothing', 110
)
SELECT * FROM Sales;

/*----------+------------+------------------+--------+
 | customer | sale_date  | product_category | amount |
 +----------+------------+------------------+--------+
 | Daisy    | 2024-01-03 | Electronics      | 500    |
 | Daisy    | 2024-01-04 | Software         | 30     |
 | Ian      | 2024-02-01 | Books            | 20     |
 | Ian      | 2024-02-08 | Clothing         | 30     |
 | Ian      | 2024-02-10 | Clothing         | 90     |
 | Daisy    | 2024-03-15 | Software         | 40     |
 | Ian      | 2024-03-15 | Electronics      | 300    |
 | Ian      | 2024-03-15 | Electronics      | 400    |
 | Ian      | 2024-03-21 | Software         | 30     |
 | Ian      | 2024-04-07 | Books            | 50     |
 | Daisy    | 2024-06-28 | Electronics      | 400    |
 | Daisy    | 2024-06-29 | Clothing         | 100    |
 | Daisy    | 2024-06-30 | Software         | 30     |
 | Ian      | 2024-07-07 | Clothing         | 110    |
 +----------+------------+------------------+--------*/
```

The following example finds electronics purchases, followed by any number of
other purchases of other types, followed by software purchases. The `MEASURES`
clause aggregates
the data in each match and computes total sales and software sales:

```sql
SELECT *
FROM
  Sales
MATCH_RECOGNIZE (
  PARTITION BY customer
  ORDER BY sale_date
  MEASURES
    ARRAY_AGG(STRUCT(sale_date, product_category, amount)) AS sales,
    SUM(amount) AS total_sale_amount,
    SUM(software.amount) AS software_sale_amount
  PATTERN (electronics+ any_category*? software+)
  DEFINE
    electronics AS product_category = 'Electronics',
    software AS product_category = 'Software',
    any_category AS TRUE
);

/*----------+-----------------+------------------------+--------------+-------------------+----------------------+
 | customer | sales.sale_date | sales.product_category | sales.amount | total_sale_amount | software_sale_amount |
 +----------+-----------------+------------------------+--------------+-------------------+----------------------+
 | Daisy    | 2024-01-03      | Electronics            | 500          | 570               | 70                   |
 |          | 2024-01-04      | Software               | 30           |                   |                      |
 |          | 2024-03-15      | Software               | 40           |                   |                      |
 | Daisy    | 2024-06-28      | Electronics            | 400          | 530               | 30                   |
 |          | 2024-06-29      | Clothing               | 100          |                   |                      |
 |          | 2024-06-30      | Software               | 30           |                   |                      |
 | Ian      | 2024-03-15      | Electronics            | 300          | 730               | 30                   |
 |          | 2024-03-15      | Electronics            | 400          |                   |                      |
 |          | 2024-03-21      | Software               | 30           |                   |                      |
 +----------+-----------------+------------------------+--------------+-------------------+----------------------*/
```

The following example, like the previous example, matches electronics
purchases that were eventually followed by software purchases. The query
uses the `LAST` and `FIRST` functions that are unique
to the `MEASURES` clause to compute the number of days between the final
electronics purchase in a match and the first following software purchase:

```sql
SELECT *
FROM
  Sales
MATCH_RECOGNIZE (
  PARTITION BY customer
  ORDER BY sale_date
  MEASURES
    LAST(electronics.sale_date) AS last_electronics_sale_date,
    FIRST(software.sale_date) AS first_software_sale_date,
    DATE_DIFF(FIRST(software.sale_date), LAST(electronics.sale_date), day) AS date_gap
  PATTERN (electronics+ any_category*? software+)
  DEFINE
    electronics AS product_category = 'Electronics',
    software AS product_category = 'Software',
    any_category AS TRUE
);

/*----------+----------------------------+--------------------------+----------+
 | customer | last_electronics_sale_date | first_software_sale_date | date_gap |
 +----------+----------------------------+--------------------------+----------+
 | Daisy    | 2024-01-03                 | 2024-01-04               | 1        |
 | Daisy    | 2024-06-28                 | 2024-06-30               | 2        |
 | Ian      | 2024-03-15                 | 2024-03-21               | 6        |
 +----------+----------------------------+--------------------------+----------*/
```

The following example matches a sequence of rows where `amount` is less than
50, followed by rows where `amount` is between 50 and 100, followed by rows
where `amount` is greater than 100. The query uses the
`MATCH_NUMBER`, `MATCH_ROW_NUMBER`, and `CLASSIFIER` functions in the `MEASURES`
clause to identify matches and their symbols in the results.

```sql
SELECT *
FROM
  Sales
MATCH_RECOGNIZE (
  PARTITION BY customer
  ORDER BY sale_date
  MEASURES
    MATCH_NUMBER() AS match_number,
    ARRAY_AGG(STRUCT(MATCH_ROW_NUMBER() AS row,
                     CLASSIFIER() AS symbol,
                     sale_date,
                     product_category)) AS sales
  PATTERN (low+ mid+ high+)
  DEFINE
    low AS amount < 50,
    mid AS amount >= 50 AND amount <= 100,
    high AS amount > 100
);

/*----------+--------------+-----------+--------------+-----------------+------------------------+
 | customer | match_number | sales.row | sales.symbol | sales.sale_date | sales.product_category |
 +----------+--------------+-----------+--------------+-----------------+------------------------+
 | Ian      | 1            | 1         | low          | 2024-02-01      | Books                  |
 |          |              | 2         | low          | 2024-02-08      | Clothing               |
 |          |              | 3         | mid          | 2024-02-10      | Clothing               |
 |          |              | 4         | high         | 2024-03-15      | Electronics            |
 |          |              | 5         | high         | 2024-03-15      | Electronics            |
 | Ian      | 2            | 1         | low          | 2024-03-21      | Software               |
 |          |              | 2         | mid          | 2024-04-07      | Books                  |
 |          |              | 3         | high         | 2024-07-07      | Clothing               |
 +----------+--------------+-----------+--------------+-----------------+------------------------*/
```

The following example is similar to the previous one, except it allows
overlapping matches:

```sql
SELECT *
FROM
  Sales
MATCH_RECOGNIZE (
  PARTITION BY customer
  ORDER BY sale_date
  MEASURES
    MATCH_NUMBER() AS match_number,
    ARRAY_AGG(STRUCT(MATCH_ROW_NUMBER() AS row,
                     CLASSIFIER() AS symbol,
                     sale_date,
                     product_category)) AS sales
  AFTER MATCH SKIP TO NEXT ROW
  PATTERN (low+ mid+ high+)
  DEFINE
    low AS amount < 50,
    mid AS amount >= 50 AND amount <= 100,
    high AS amount > 100
);

/*----------+--------------+-----------+--------------+-----------------+------------------------+
 | customer | match_number | sales.row | sales.symbol | sales.sale_date | sales.product_category |
 +----------+--------------+-----------+--------------+-----------------+------------------------+
 | Ian      | 1            | 1         | low          | 2024-02-01      | Books                  |
 |          |              | 2         | low          | 2024-02-08      | Clothing               |
 |          |              | 3         | mid          | 2024-02-10      | Clothing               |
 |          |              | 4         | high         | 2024-03-15      | Electronics            |
 |          |              | 5         | high         | 2024-03-15      | Electronics            |
 | Ian      | 2            | 1         | low          | 2024-02-08      | Clothing               |
 |          |              | 2         | mid          | 2024-02-10      | Clothing               |
 |          |              | 3         | high         | 2024-03-15      | Electronics            |
 |          |              | 4         | high         | 2024-03-15      | Electronics            |
 | Ian      | 3            | 1         | low          | 2024-03-21      | Software               |
 |          |              | 2         | mid          | 2024-04-07      | Books                  |
 |          |              | 3         | high         | 2024-07-07      | Clothing               |
 +----------+--------------+-----------+--------------+-----------------+------------------------*/
```

#### Best practices

To scale the performance of queries that contain the `MATCH_RECOGNIZE` clause,
use the following best practices:

- Use the `PARTITION BY` clause.
  - Within each partition, rows are processed one at a time. Separate partitions can be processed in parallel, subject to slot availability.
  - The `MATCH_RECOGNIZE` clause generally runs faster when you use a larger number of smaller partitions, rather than fewer large partitions.
  - Individual partitions which are too large, typically exceeding 1 million rows, might cause an [`Out of memory` error](https://docs.cloud.google.com/bigquery/docs/troubleshoot-queries#query_not_executed).
- Use simple patterns.
  - Avoid patterns with a large number of operators.
  - Avoid bounded quantifiers with large bound values. For example, matching the patterns `A+` or `A*` is faster than matching `A{,100}`.
- Use the `ORDER BY` clause to guarantee the order in which the input rows are processed. Otherwise the `MATCH_RECOGNIZE` clause can produce non-deterministic results.

For more example queries, see the [`MATCH_RECOGNIZE` notebook tutorial](https://github.com/GoogleCloudPlatform/bigquery-utils/blob/master/notebooks/bigquery_match_recognize_demo.ipynb).

### `GRAPH_TABLE` operator

To learn more about this operator, see
[`GRAPH_TABLE` operator](../graph-gql/sql-queries.md#graph_table-operator) in the
Graph Query Language (GQL) reference guide.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders; 2 code blocks whose twin text is damaged (links expanded into URLs, `<...>` dropped, table borders shortened) are matched to the rendered page by position and similarity, and the text is taken from the page; and horizontal rules inside table cells are written as `<hr>`. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- The official page is split into 3 files at section boundaries; this is part 1.
- Conflicting official statements: the `PIVOT` column-name rule for a named `STRUCT` field is `<field_name>_<pivot_column_name_for_field_name>`, which gives `a_one_b_two` for `STRUCT("one" AS a, "two" AS b)`, but the example in the same cell shows `one_a_two_b`. The official docs do not say which is correct.

## Related

- [Index of this directory](./README.md)
- [Query syntax (part 2 of 3)](./query-syntax-2.md)
- [Query syntax (part 3 of 3)](./query-syntax-3.md)

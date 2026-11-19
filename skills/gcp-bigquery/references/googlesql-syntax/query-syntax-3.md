---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax
---

# Query syntax (part 3 of 3)

## Signature / Usage

### `QUALIFY` clause

```text
QUALIFY bool_expression
```

The `QUALIFY` clause filters the results of window functions.
A window function is required to be present in the `QUALIFY` clause or the
`SELECT` list.

Only rows whose `bool_expression` evaluates to `TRUE` are included. Rows
whose `bool_expression` evaluates to `NULL` or `FALSE` are
discarded.

The evaluation of a query with a `QUALIFY` clause is typically completed in this
order:

- `FROM`
- `WHERE`
- `GROUP BY` and aggregation
- `HAVING`
- `WINDOW`
- `QUALIFY`
- `DISTINCT`
- `ORDER BY`
- `LIMIT`

Evaluation order doesn't always match syntax order.

**Examples**

The following query returns the most popular vegetables in the
[`Produce`](../googlesql-functions/window-function-calls.md#produce-table) table and their rank.

```sql
SELECT
  item,
  RANK() OVER (PARTITION BY category ORDER BY purchases DESC) as rank
FROM Produce
WHERE Produce.category = 'vegetable'
QUALIFY rank <= 3

/*---------+------+
 | item    | rank |
 +---------+------+
 | kale    | 1    |
 | lettuce | 2    |
 | cabbage | 3    |
 +---------+------*/
```

You don't have to include a window function in the `SELECT` list to use
`QUALIFY`. The following query returns the most popular vegetables in the
[`Produce`](../googlesql-functions/window-function-calls.md#produce-table) table.

```sql
SELECT item
FROM Produce
WHERE Produce.category = 'vegetable'
QUALIFY RANK() OVER (PARTITION BY category ORDER BY purchases DESC) <= 3

/*---------+
 | item    |
 +---------+
 | kale    |
 | lettuce |
 | cabbage |
 +---------*/
```

### `WINDOW` clause

```text
WINDOW named_window_expression [, ...]

named_window_expression:
  named_window AS { named_window | ( [ window_specification ] ) }
```

A `WINDOW` clause defines a list of named windows.
A named window represents a group of rows in a table upon which to use a
[window function](../googlesql-functions/window-function-calls.md). A named window can be defined with
a [window specification](../googlesql-functions/window-function-calls.md#defining-the-window-specification) or reference another
named window. If another named window is referenced, the definition of the
referenced window must precede the referencing window.

**Examples**

These examples reference a table called [`Produce`](../googlesql-functions/window-function-calls.md#produce-table).
They all return the same [result](../googlesql-functions/window-function-calls.md#use-a-named-window-in-a-window-frame-clause). Note the different
ways you can combine named windows and use them in a window function's
`OVER` clause.

```sql
SELECT item, purchases, category, LAST_VALUE(item)
  OVER (item_window) AS most_popular
FROM Produce
WINDOW item_window AS (
  PARTITION BY category
  ORDER BY purchases
  ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING)
```

```sql
SELECT item, purchases, category, LAST_VALUE(item)
  OVER (d) AS most_popular
FROM Produce
WINDOW
  a AS (PARTITION BY category),
  b AS (a ORDER BY purchases),
  c AS (b ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING),
  d AS (c)
```

```sql
SELECT item, purchases, category, LAST_VALUE(item)
  OVER (c ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING) AS most_popular
FROM Produce
WINDOW
  a AS (PARTITION BY category),
  b AS (a ORDER BY purchases),
  c AS b
```

### Set operators

```text
  query_expr
  [ { INNER | [ { FULL | LEFT } [ OUTER ] ] } ]
  {
    UNION { ALL | DISTINCT } |
    INTERSECT DISTINCT |
    EXCEPT DISTINCT
  }
  [ { BY NAME [ ON (column_list) ] | [ STRICT ] CORRESPONDING [ BY (column_list) ] } ]
  query_expr
```

Set operators combine or filter
results from two or more input queries into a single result set.

**Definitions**

- `query_expr`: One of two input queries whose results are combined or filtered into a single result set.
- `UNION`: Returns the combined results of the left and right input queries. Values in columns that are matched by position are concatenated vertically.
- `INTERSECT`: Returns rows that are found in the results of both the left and right input queries.
- `EXCEPT`: Returns rows from the left input query that aren't present in the right input query.
- `ALL`: Executes the set operation on all rows. The `ALL` modifier is supported by only the `UNION` set operator.
- `DISTINCT`: Excludes duplicate rows in the set operation.
- `BY NAME`, `CORRESPONDING`: Matches columns by name instead of by position. The `BY NAME` modifier is equivalent to `STRICT CORRESPONDING`. For details, see [`BY NAME` or `CORRESPONDING`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#by_name_or_corresponding).
- `INNER`, `FULL | LEFT [OUTER]`, `STRICT`, `ON`, `BY`: Adjust how the `BY NAME` or `CORRESPONDING` modifier behaves when the column names don't match exactly. For details, see [`BY NAME` or `CORRESPONDING`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#by_name_or_corresponding).

**Positional column matching**

By default, columns are matched positionally and follow these rules. If the
`BY NAME` or `CORRESPONDING` modifier is
used, columns are matched by name, as described in the next section.

- Columns from input queries are matched by their position in the queries. That is, the first column in the first input query is paired with the first column in the second input query and so on.
- The input queries on each side of the operator must return the same number of columns.

**Name-based column matching**

To make set operations match columns by name instead of by column position,
use the [`BY NAME` or `CORRESPONDING`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#by_name_or_corresponding) modifier.

With `BY NAME` or `STRICT CORRESPONDING`, the same column names
must exist in each input, but they can be in different orders. Additional
modifiers can be used to handle cases where the columns don't exactly match.

The `BY NAME` modifier is equivalent to `STRICT CORRESPONDING`, but
the `BY NAME` modifier is recommended because it's shorter and clearer.

Example:

```sql
SELECT 1 AS one_digit, 10 AS two_digit
UNION ALL BY NAME
SELECT 20 AS two_digit, 2 AS one_digit;

-- Column values match by name and not position in query.
/*-----------+-----------+
 | one_digit | two_digit |
 +-----------+-----------+
 | 1         | 10        |
 | 2         | 20        |
 +-----------+-----------*/
```

**Other column-related rules**

- For set operations other than `UNION
  ALL`, all column types must support equality comparison.
- The results of the set operation always use the column names from the first input query.
- The results of the set operation always use the supertypes of input types in corresponding columns, so paired columns must also have either the same data type or a common supertype.

**Parenthesized set operators**

- Parentheses must be used to separate different set operations. Set operations like `UNION ALL` and `UNION DISTINCT` are considered different.
- Parentheses are also used to group set operations and control order of operations. In `EXCEPT` set operations, for example, query results can vary depending on the operation grouping.

The following examples illustrate the use of parentheses with set
operations:

```sql
-- Same set operations, no parentheses.
query1
UNION ALL
query2
UNION ALL
query3;
```

```sql
-- Different set operations, parentheses needed.
query1
UNION ALL
(
  query2
  UNION DISTINCT
  query3
);
```

```sql
-- Invalid
query1
UNION ALL
query2
UNION DISTINCT
query3;
```

```sql
-- Same set operations, no parentheses.
query1
EXCEPT DISTINCT
query2
EXCEPT DISTINCT
query3;

-- Equivalent query with optional parentheses, returns same results.
(
  query1
  EXCEPT DISTINCT
  query2
)
EXCEPT DISTINCT
query3;
```

```sql
-- Different execution order with a subquery, parentheses needed.
query1
EXCEPT DISTINCT
(
  query2
  EXCEPT DISTINCT
  query3
);
```

**Set operator behavior with duplicate rows**

Consider a given row `R` that appears exactly `m` times in the first input query
and `n` times in the second input query, where `m >= 0` and `n >= 0`:

- For `UNION ALL`, row `R` appears exactly `m + n` times in the result.
- For `UNION DISTINCT`, the `DISTINCT` is computed after the `UNION` is computed, so row `R` appears exactly one time.
- For `INTERSECT DISTINCT`, row `R` appears once in the output if `m > 0` and `n > 0`.
- For `EXCEPT DISTINCT`, row `R` appears once in the output if `m > 0` and `n = 0`.
- If more than two input queries are used, the above operations generalize and the output is the same as if the input queries were combined incrementally from left to right.

**BY NAME or CORRESPONDING**

Use the `BY NAME` or `CORRESPONDING` modifier
with set operations to match columns by name instead of by position.
The `BY NAME` modifier is equivalent to `STRICT CORRESPONDING`, but the
`BY NAME` modifier is recommended because it's shorter and clearer.
You can use mode prefixes to adjust how
the `BY NAME` or `CORRESPONDING` modifier
behaves when the column names don't match exactly.

- `BY NAME`: Matches columns by name instead of by position.
  - Both input queries must have the same set of column names, but column order can be different. If a column in one input query doesn't appear in the other query, an error is raised.
  - Input queries can't contain duplicate columns.
  - Input queries that produce [value tables](#value-tables) aren't supported.
- `INNER`: Adjusts the `BY NAME` modifier behavior so that columns that appear in both input queries are included in the query results and any other columns are excluded.
  - No error is raised for the excluded columns that appear in one input query but not in the other input query.
  - At least one column must be common in both left and right input queries.
- `FULL [OUTER]`: Adjusts the `BY NAME` modifier behavior so that all columns from both input queries are included in the query results, even if some columns aren't present in both queries.
  - Columns from the left input query are returned first, followed by unique columns from the right input query.
  - For columns in one input query that aren't present in the other query, a `NULL` value is added as its column value for the other query in the results.
- `LEFT [OUTER]`: Adjusts the `BY NAME` modifier so that all columns from the left input query are included in the results, even if some columns in the left query aren't present in the right query.
  - For columns in the left query that aren't in the right query, a `NULL` value is added as its column value for the right query in the results.
  - At least one column name must be common in both left and right input queries.
- `OUTER`: If used alone, equivalent to `FULL OUTER`.
- `ON (column_list)`: Used after the `BY NAME` modifier to specify a comma-separated list of column names and the column order to return from the input queries.
  - If `BY NAME ON (column_list)` is used alone without mode prefixes like `INNER` or `FULL | LEFT [OUTER]`, then both the left and right input queries must contain all the columns in the `column_list`.
  - If any mode prefixes are used, then any column names not in the `column_list` are excluded from the results according to the mode used.
- `CORRESPONDING`: Equivalent to `INNER...BY NAME`.
  - Supports `FULL | LEFT [OUTER]` modes the same way they're supported by the `BY NAME` modifier.
  - Supports `INNER` mode, but this mode has no effect. The `INNER` mode is used with the `BY NAME` modifier to exclude unmatched columns between input queries, which is the default behavior of the `CORRESPONDING` modifier. Therefore, using `INNER...CORRESPONDING` produces the same results as `CORRESPONDING`.
- `STRICT`: Adjusts the `CORRESPONDING` modifier to be equivalent to the default `BY NAME` modifier, where input queries must have the same set of column names.
- `BY (column_list)`: Equivalent to `ON (column_list)` with `BY NAME`.

The following table shows the equivalent syntaxes between the `BY NAME` and
`CORRESPONDING` modifiers, using the `UNION ALL` set operator as an example:

| BY NAME syntax | Equivalent CORRESPONDING syntax |
|---|---|
| `UNION ALL BY NAME` | `UNION ALL STRICT CORRESPONDING` |
| `INNER UNION ALL BY NAME` | `UNION ALL CORRESPONDING` |
| `{LEFT \| FULL} [OUTER] UNION ALL BY NAME` | `{LEFT \| FULL} [OUTER] UNION ALL CORRESPONDING` |
| `[FULL] OUTER UNION ALL BY NAME` | `[FULL] OUTER UNION ALL CORRESPONDING` |
| `UNION ALL BY NAME ON (col1, col2, ...)` | `UNION ALL STRICT CORRESPONDING BY (col1, col2, ...)` |

The following table shows the behavior of the mode prefixes for the
`BY NAME` and `CORRESPONDING` modifiers
when left and right input columns don't match:

| Mode prefix and modifier | Behavior when left and right input columns don't match |
|---|---|
| `BY NAME` (no prefix) or `STRICT CORRESPONDING` | Error, all columns must match in both inputs. |
| `INNER BY NAME` or `CORRESPONDING` (no prefix) | Drop all unmatched columns in both inputs. |
| `FULL [OUTER] BY NAME` or `FULL [OUTER] CORRESPONDING` | Include all columns from both inputs. For column values that exist in one input but not in another, add `NULL` values. |
| `LEFT [OUTER] BY NAME` or `LEFT [OUTER] CORRESPONDING` | Include all columns from the left input. For column values that exist in the left input but not in the right input, add `NULL` values. Drop any columns from the right input that don't exist in the left input. |

For example set operations with modifiers, see the sections for each set
operator, such as [`UNION`](#union).

#### `UNION`

The `UNION` operator returns the combined results of the left and right input
queries. Columns are matched according to the rules described previously and
rows are concatenated vertically.

**Examples**

```sql
SELECT * FROM UNNEST(ARRAY<INT64>[1, 2, 3]) AS number
UNION ALL
SELECT 1;

/*--------+
 | number |
 +--------+
 | 1      |
 | 2      |
 | 3      |
 | 1      |
 +--------*/
```

```sql
SELECT * FROM UNNEST(ARRAY<INT64>[1, 2, 3]) AS number
UNION DISTINCT
SELECT 1;

/*--------+
 | number |
 +--------+
 | 1      |
 | 2      |
 | 3      |
 +--------*/
```

The following example shows multiple chained operators:

```sql
SELECT * FROM UNNEST(ARRAY<INT64>[1, 2, 3]) AS number
UNION DISTINCT
SELECT 1
UNION DISTINCT
SELECT 2;

/*--------+
 | number |
 +--------+
 | 1      |
 | 2      |
 | 3      |
 +--------*/
```

The following example shows input queries with multiple columns. Both
queries specify the same column names but in different orders. As a result, the
column values are matched by column position in the input query and the column
names are ignored.

```sql
SELECT 1 AS one_digit, 10 AS two_digit
UNION ALL
SELECT 20 AS two_digit, 2 AS one_digit;

-- Column values are matched by position and not column name.
/*-----------+-----------+
 | one_digit | two_digit |
 +-----------+-----------+
 | 1         | 10        |
 | 20        | 2         |
 +-----------+-----------*/
```

To resolve this ordering issue, the following example uses the
`BY NAME` modifier to match
the columns by name instead of by position in the query results.

```sql
SELECT 1 AS one_digit, 10 AS two_digit
UNION ALL BY NAME
SELECT 20 AS two_digit, 2 AS one_digit;

-- Column values now match.
/*-----------+-----------+
 | one_digit | two_digit |
 +-----------+-----------+
 | 1         | 10        |
 | 2         | 20        |
 +-----------+-----------*/
```

The previous set operation with `BY NAME` is equivalent to using the `STRICT
CORRESPONDING` modifier. The `BY NAME` modifier is recommended because it's
shorter and clearer than the `STRICT CORRESPONDING` modifier.

```sql
SELECT 1 AS one_digit, 10 AS two_digit
UNION ALL STRICT CORRESPONDING
SELECT 20 AS two_digit, 2 AS one_digit;

/*-----------+-----------+
 | one_digit | two_digit |
 +-----------+-----------+
 | 1         | 10        |
 | 2         | 20        |
 +-----------+-----------*/
```

The following example adds a `three_digit` column to the left input query and a
`four_digit` column to the right input query. Because these columns aren't
present in both queries, the `BY NAME`
modifier would trigger an error. Therefore, the example
adds the `INNER`
mode prefix so that the new columns are excluded from the results, executing the
query successfully.

```sql
SELECT 1 AS one_digit, 10 AS two_digit, 100 AS three_digit
INNER UNION ALL BY NAME
SELECT 20 AS two_digit, 2 AS one_digit, 1000 AS four_digit;

/*-----------+-----------+
 | one_digit | two_digit |
 +-----------+-----------+
 | 1         | 10        |
 | 2         | 20        |
 +-----------+-----------*/
```

To include the differing columns in the results, the following example uses
the `FULL OUTER` mode prefix to populate `NULL` values for the missing column in
each query.

```sql
SELECT 1 AS one_digit, 10 AS two_digit, 100 AS three_digit
FULL OUTER UNION ALL BY NAME
SELECT 20 AS two_digit, 2 AS one_digit, 1000 AS four_digit;

/*-----------+-----------+-------------+------------+
 | one_digit | two_digit | three_digit | four_digit |
 +-----------+-----------+-------------+------------+
 | 1         | 10        | 100         | NULL       |
 | 2         | 20        | NULL        | 1000       |
 +-----------+-----------+-------------+------------*/
```

Similarly, the following example uses the `LEFT OUTER` mode prefix to include
the new column from only the left input query and populate a `NULL` value for
the missing column in the right input query.

```sql
SELECT 1 AS one_digit, 10 AS two_digit, 100 AS three_digit
LEFT OUTER UNION ALL BY NAME
SELECT 20 AS two_digit, 2 AS one_digit, 1000 AS four_digit;

/*-----------+-----------+-------------+
 | one_digit | two_digit | three_digit |
 +-----------+-----------+-------------+
 | 1         | 10        | 100         |
 | 2         | 20        | NULL        |
 +-----------+-----------+-------------*/
```

The following example adds the modifier `ON (column_list)`
to return only the specified columns in the specified order.

```sql
SELECT 1 AS one_digit, 10 AS two_digit, 100 AS three_digit
FULL OUTER UNION ALL BY NAME ON (three_digit, two_digit)
SELECT 20 AS two_digit, 2 AS one_digit, 1000 AS four_digit;

/*-------------+-----------+
 | three_digit | two_digit |
 +-------------+-----------+
 | 100         | 10        |
 | NULL        | 20        |
 +-----------+-------------*/
```

#### `INTERSECT`

The `INTERSECT` operator returns rows that are found in the results of both the
left and right input queries.

**Examples**

```sql
SELECT * FROM UNNEST(ARRAY<INT64>[1, 2, 3, 3, 4]) AS number
INTERSECT DISTINCT
SELECT * FROM UNNEST(ARRAY<INT64>[2, 3, 3, 5]) AS number;

/*--------+
 | number |
 +--------+
 | 2      |
 | 3      |
 +--------*/
```

The following example shows multiple chained operations:

```sql
SELECT * FROM UNNEST(ARRAY<INT64>[1, 2, 3, 3, 4]) AS number
INTERSECT DISTINCT
SELECT * FROM UNNEST(ARRAY<INT64>[2, 3, 3, 5]) AS number
INTERSECT DISTINCT
SELECT * FROM UNNEST(ARRAY<INT64>[3, 3, 4, 5]) AS number;

/*--------+
 | number |
 +--------+
 | 3      |
 +--------*/
```

The following example shows input queries that specify multiple columns. Both
queries specify the same column names but in different orders. As a result, the
same columns in differing order are considered different columns, so the query
doesn't detect any intersecting row values. Therefore, no results are returned.

```sql
WITH
  NumbersTable AS (
    SELECT 1 AS one_digit, 10 AS two_digit
    UNION ALL
    SELECT 2, 20
    UNION ALL
    SELECT 3, 30
  )
SELECT one_digit, two_digit FROM NumbersTable
INTERSECT DISTINCT
SELECT 10 AS two_digit, 1 AS one_digit;

-- No intersecting values detected because columns aren't recognized as the same.
/*-----------+-----------+

 +-----------+-----------*/
```

To resolve this ordering issue, the following example uses the
`BY NAME` modifier to match
the columns by name instead of by position in the query results.

```sql
WITH
  NumbersTable AS (
    SELECT 1 AS one_digit, 10 AS two_digit
    UNION ALL
    SELECT 2, 20
    UNION ALL
    SELECT 3, 30
  )
SELECT one_digit, two_digit FROM NumbersTable
INTERSECT DISTINCT BY NAME
SELECT 10 AS two_digit, 1 AS one_digit;

/*-----------+-----------+
 | one_digit | two_digit |
 +-----------+-----------+
 | 1         | 10        |
 +-----------+-----------*/
```

The previous set operation with `BY NAME` is equivalent to using the `STRICT
CORRESPONDING` modifier. The `BY NAME` modifier is recommended because it's
shorter and clearer than the `STRICT CORRESPONDING` modifier.

```sql
WITH
  NumbersTable AS (
    SELECT 1 AS one_digit, 10 AS two_digit
    UNION ALL
    SELECT 2, 20
    UNION ALL
    SELECT 3, 30
  )
SELECT one_digit, two_digit FROM NumbersTable
INTERSECT DISTINCT STRICT CORRESPONDING
SELECT 10 AS two_digit, 1 AS one_digit;

/*-----------+-----------+
 | one_digit | two_digit |
 +-----------+-----------+
 | 1         | 10        |
 +-----------+-----------*/
```

For more syntax examples with the `BY NAME`
modifier, see the [`UNION`](#union) set operator.

#### `EXCEPT`

The `EXCEPT` operator returns rows from the left input query that aren't present
in the right input query.

**Examples**

```sql
SELECT * FROM UNNEST(ARRAY<INT64>[1, 2, 3, 3, 4]) AS number
EXCEPT DISTINCT
SELECT * FROM UNNEST(ARRAY<INT64>[1, 2]) AS number;

/*--------+
 | number |
 +--------+
 | 3      |
 | 4      |
 +--------*/
```

The following example shows multiple chained operations:

```sql
SELECT * FROM UNNEST(ARRAY<INT64>[1, 2, 3, 3, 4]) AS number
EXCEPT DISTINCT
SELECT * FROM UNNEST(ARRAY<INT64>[1, 2]) AS number
EXCEPT DISTINCT
SELECT * FROM UNNEST(ARRAY<INT64>[1, 4]) AS number;

/*--------+
 | number |
 +--------+
 | 3      |
 +--------*/
```

The following example modifies the execution behavior of the set operations. The
first input query is used against the result of the last two input queries
instead of the values of the last two queries individually. In this example,
the `EXCEPT` result of the last two input queries is `2`. Therefore, the
`EXCEPT` results of the entire query are any values other than `2` in the first
input query.

```sql
SELECT * FROM UNNEST(ARRAY<INT64>[1, 2, 3, 3, 4]) AS number
EXCEPT DISTINCT
(
  SELECT * FROM UNNEST(ARRAY<INT64>[1, 2]) AS number
  EXCEPT DISTINCT
  SELECT * FROM UNNEST(ARRAY<INT64>[1, 4]) AS number
);

/*--------+
 | number |
 +--------+
 | 1      |
 | 3      |
 | 4      |
 +--------*/
```

The following example shows input queries that specify multiple columns. Both
queries specify the same column names but in different orders. As a result, the
same columns in differing order are considered different columns, so the query
doesn't detect any common rows that should be excluded. Therefore, all column
values from the left input query are returned with no exclusions.

```sql
WITH
  NumbersTable AS (
    SELECT 1 AS one_digit, 10 AS two_digit
    UNION ALL
    SELECT 2, 20
    UNION ALL
    SELECT 3, 30
  )
SELECT one_digit, two_digit FROM NumbersTable
EXCEPT DISTINCT
SELECT 10 AS two_digit, 1 AS one_digit;

-- No values excluded because columns aren't recognized as the same.
/*-----------+-----------+
 | one_digit | two_digit |
 +-----------+-----------+
 | 1         | 10        |
 | 2         | 20        |
 | 3         | 30        |
 +-----------+-----------*/
```

To resolve this ordering issue, the following example uses the
`BY NAME` modifier to match
the columns by name instead of by position in the query results.

```sql
WITH
  NumbersTable AS (
    SELECT 1 AS one_digit, 10 AS two_digit
    UNION ALL
    SELECT 2, 20
    UNION ALL
    SELECT 3, 30
  )
SELECT one_digit, two_digit FROM NumbersTable
EXCEPT DISTINCT BY NAME
SELECT 10 AS two_digit, 1 AS one_digit;

/*-----------+-----------+
 | one_digit | two_digit |
 +-----------+-----------+
 | 2         | 20        |
 | 3         | 30        |
 +-----------+-----------*/
```

The previous set operation with `BY NAME` is equivalent to using the `STRICT
CORRESPONDING` modifier. The `BY NAME` modifier is recommended because it's
shorter and clearer than the `STRICT CORRESPONDING` modifier.

```sql
WITH
  NumbersTable AS (
    SELECT 1 AS one_digit, 10 AS two_digit
    UNION ALL
    SELECT 2, 20
    UNION ALL
    SELECT 3, 30
  )
SELECT one_digit, two_digit FROM NumbersTable
EXCEPT DISTINCT STRICT CORRESPONDING
SELECT 10 AS two_digit, 1 AS one_digit;

/*-----------+-----------+
 | one_digit | two_digit |
 +-----------+-----------+
 | 2         | 20        |
 | 3         | 30        |
 +-----------+-----------*/
```

For more syntax examples with the `BY NAME`
modifier, see the [`UNION`](#union) set operator.

### `LIMIT` and `OFFSET` clause

```sql
LIMIT count [ OFFSET skip_rows ]
```

Limits the number of rows to return in a query. Optionally includes
the ability to skip over rows.

**Definitions**

- `LIMIT`: Limits the number of rows to produce.

  `count` is an `INT64` constant expression that represents the
  non-negative, non-`NULL` limit. No more than `count` rows are produced.
  `LIMIT 0` returns 0 rows.

  If there is a set operation, `LIMIT` is applied after the set operation is
  evaluated.
- `OFFSET`: Skips a specific number of rows before applying `LIMIT`.

  `skip_rows` is an `INT64` constant expression that represents
  the non-negative, non-`NULL` number of rows to skip.

**Details**

The rows that are returned by `LIMIT` and `OFFSET` have undefined order unless
these clauses are used after `ORDER BY`.

A constant expression can be represented by a general expression, literal, or
parameter value.

> [!NOTE]
> **Note:** Although the `LIMIT` clause limits the rows that a query produces, it doesn't limit the amount of data processed by that query.

**Examples**

```sql
SELECT *
FROM UNNEST(ARRAY<STRING>['a', 'b', 'c', 'd', 'e']) AS letter
ORDER BY letter ASC LIMIT 2;

/*---------+
 | letter  |
 +---------+
 | a       |
 | b       |
 +---------*/
```

```sql
SELECT *
FROM UNNEST(ARRAY<STRING>['a', 'b', 'c', 'd', 'e']) AS letter
ORDER BY letter ASC LIMIT 3 OFFSET 1;

/*---------+
 | letter  |
 +---------+
 | b       |
 | c       |
 | d       |
 +---------*/
```

### `WITH` clause

```text
WITH [ RECURSIVE ] { non_recursive_cte | recursive_cte }[, ...]
```

A `WITH` clause contains one or more common table expressions (CTEs).
A CTE acts like a temporary table that you can reference within a single
query expression. Each CTE binds the results of a [subquery](subqueries.md)
to a table name, which can be used elsewhere in the same query expression,
but [rules apply](#cte-rules-and-constraints).

CTEs can be [non-recursive](#non-recursive-ctes) or
[recursive](#recursive-ctes) and you can include both of these in your
`WITH` clause. A recursive CTE references itself, where a
non-recursive CTE doesn't. If a recursive CTE is included in the `WITH` clause,
the `RECURSIVE` keyword must also be included.

You can include the `RECURSIVE` keyword in a `WITH` clause even if no
recursive CTEs are present. You can learn more about the `RECURSIVE` keyword
[here](#recursive-keyword).

GoogleSQL only materializes
the results of recursive CTEs, but doesn't materialize the results
of non-recursive CTEs inside the `WITH` clause. If a non-recursive CTE is
referenced in multiple places in a query, then the CTE is executed once for each
reference. The `WITH` clause with non-recursive CTEs is useful primarily for
readability.

#### `RECURSIVE` keyword

A `WITH` clause can optionally include the `RECURSIVE` keyword, which does
two things:

- Enables recursion in the `WITH` clause. If this keyword isn't present, you can only include non-recursive common table expressions (CTEs). If this keyword is present, you can use both [recursive](#recursive-ctes) and [non-recursive](#non-recursive-ctes) CTEs.
- [Changes the visibility](#cte-visibility) of CTEs in the `WITH` clause. If this keyword isn't present, a CTE is only visible to CTEs defined after it in the `WITH` clause. If this keyword is present, a CTE is visible to all CTEs in the `WITH` clause where it was defined.

#### Non-recursive CTEs

```text
non_recursive_cte:
  cte_name AS ( query_expr )
```

A non-recursive common table expression (CTE) contains
a non-recursive [subquery](subqueries.md)
and a name associated with the CTE.

- A non-recursive CTE can't reference itself.
- A non-recursive CTE can be referenced by the query expression that contains the `WITH` clause, but [rules apply](#cte-rules-and-constraints).

###### Examples

In this example, a `WITH` clause defines two non-recursive CTEs that
are referenced in the related set operation, where one CTE is referenced by
each of the set operation's input query expressions:

```sql
WITH subQ1 AS (SELECT SchoolID FROM Roster),
     subQ2 AS (SELECT OpponentID FROM PlayerStats)
SELECT * FROM subQ1
UNION ALL
SELECT * FROM subQ2
```

You can break up more complex queries into a `WITH` clause and
`WITH` `SELECT` statement instead of writing nested table subqueries.
For example:

```sql
WITH q1 AS (my_query)
SELECT *
FROM
  (WITH q2 AS (SELECT * FROM q1) SELECT * FROM q2)
```

```sql
WITH q1 AS (my_query)
SELECT *
FROM
  (WITH q2 AS (SELECT * FROM q1),  # q1 resolves to my_query
        q3 AS (SELECT * FROM q1),  # q1 resolves to my_query
        q1 AS (SELECT * FROM q1),  # q1 (in the query) resolves to my_query
        q4 AS (SELECT * FROM q1)   # q1 resolves to the WITH subquery on the previous line.
    SELECT * FROM q1)              # q1 resolves to the third inner WITH subquery.
```

#### Recursive CTEs

```text
recursive_cte:
  cte_name AS ( recursive_union_operation )

recursive_union_operation:
  base_term union_operator recursive_term

base_term:
  query_expr

recursive_term:
  query_expr

union_operator:
  UNION ALL
```

A recursive common table expression (CTE) contains a
recursive [subquery](subqueries.md) and a name associated with the CTE.

- A recursive CTE references itself.
- A recursive CTE can be referenced in the query expression that contains the `WITH` clause, but [rules apply](#cte-rules-and-constraints).
- When a recursive CTE is defined in a `WITH` clause, the [`RECURSIVE`](#recursive-keyword) keyword must be present.

A recursive CTE is defined by a *recursive union operation*. The
recursive union operation defines how input is recursively processed
to produce the final CTE result. The recursive union operation has the
following parts:

- `base_term`: Runs the first iteration of the recursive union operation. This term must follow the [base term rules](#base-term-rules).
- `union_operator`: The `UNION` operator returns the rows that are from the union of the base term and recursive term. With `UNION ALL`, each row produced in iteration `N` becomes part of the final CTE result and input for iteration `N+1`. Iteration stops when an iteration produces no rows to move into the next iteration.
- `recursive_term`: Runs the remaining iterations. It must include one self-reference (recursive reference) to the recursive CTE. Only this term can include a self-reference. This term must follow the [recursive term rules](#recursive-term-rules).

A recursive CTE looks like this:

```sql
WITH RECURSIVE
  T1 AS ( (SELECT 1 AS n) UNION ALL (SELECT n + 1 AS n FROM T1 WHERE n < 3) )
SELECT n FROM T1

/*---+
 | n |
 +---+
 | 2 |
 | 1 |
 | 3 |
 +---*/
```

The first iteration of a recursive union operation runs the base term.
Then, each subsequent iteration runs the recursive term and produces
*new rows* which are unioned with the previous iteration. The recursive
union operation terminates when a recursive term iteration produces no new
rows.

If recursion doesn't terminate, the query fails after reaching 500 iterations.

To learn more about recursive CTEs and troubleshooting iteration limit errors,
see [Work with recursive CTEs](https://docs.cloud.google.com/bigquery/docs/recursive-ctes).

###### Examples of allowed recursive CTEs

This is a simple recursive CTE:

```sql
WITH RECURSIVE
  T1 AS (
    (SELECT 1 AS n) UNION ALL
    (SELECT n + 2 FROM T1 WHERE n < 4))
SELECT * FROM T1 ORDER BY n

/*---+
 | n |
 +---+
 | 1 |
 | 3 |
 | 5 |
 +---*/
```

Multiple subqueries in the same recursive CTE are okay, as
long as each recursion has a cycle length of 1. It's also okay for recursive
entries to depend on non-recursive entries and vice-versa:

```sql
WITH RECURSIVE
  T0 AS (SELECT 1 AS n),
  T1 AS ((SELECT * FROM T0) UNION ALL (SELECT n + 1 FROM T1 WHERE n < 4)),
  T2 AS ((SELECT 1 AS n) UNION ALL (SELECT n + 1 FROM T2 WHERE n < 4)),
  T3 AS (SELECT * FROM T1 INNER JOIN T2 USING (n))
SELECT * FROM T3 ORDER BY n

/*---+
 | n |
 +---+
 | 1 |
 | 2 |
 | 3 |
 | 4 |
 +---*/
```

Aggregate functions can be invoked in subqueries, as long as they aren't
aggregating on the table being defined:

```sql
WITH RECURSIVE
  T0 AS (SELECT * FROM UNNEST ([60, 20, 30])),
  T1 AS ((SELECT 1 AS n) UNION ALL (SELECT n + (SELECT COUNT(*) FROM T0) FROM T1 WHERE n < 4))
SELECT * FROM T1 ORDER BY n

/*---+
 | n |
 +---+
 | 1 |
 | 4 |
 +---*/
```

`INNER JOIN` can be used inside subqueries:

```sql
WITH RECURSIVE
  T0 AS (SELECT 1 AS n),
  T1 AS ((SELECT 1 AS n) UNION ALL (SELECT n + 1 FROM T1 INNER JOIN T0 USING (n)))
SELECT * FROM T1 ORDER BY n

/*---+
 | n |
 +---+
 | 1 |
 | 2 |
 +---*/
```

`CROSS JOIN` can be used inside subqueries:

```sql
WITH RECURSIVE
  T0 AS (SELECT 2 AS p),
  T1 AS ((SELECT 1 AS n) UNION ALL (SELECT T1.n + T0.p FROM T1 CROSS JOIN T0 WHERE T1.n < 4))
SELECT * FROM T1 CROSS JOIN T0 ORDER BY n

/*---+---+
 | n | p |
 +---+---+
 | 1 | 2 |
 | 3 | 2 |
 | 5 | 2 |
 +---+---*/
```

Recursive CTEs can be used inside `CREATE TABLE AS SELECT` statements. The
following example creates a table named `new_table` in `mydataset`:

```sql
CREATE OR REPLACE TABLE `myproject.mydataset.new_table` AS
  WITH RECURSIVE
    T1 AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM T1 WHERE n < 3)
  SELECT * FROM T1
```

Recursive CTEs can be used inside `CREATE VIEW AS SELECT` statements. The
following example creates a view named `new_view` in `mydataset`:

```sql
CREATE OR REPLACE VIEW `myproject.mydataset.new_view` AS
  WITH RECURSIVE
    T1 AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM T1 WHERE n < 3)
  SELECT * FROM T1
```

Recursive CTEs can be used inside `INSERT` statements. The following example
demonstrates how to insert data into a table by using recursive CTEs:

```sql
-- create a temp table.
CREATE TEMP TABLE tmp_table (n INT64);

-- insert some values into the temp table by using recursive CTEs.
INSERT INTO tmp_table(n)
  WITH RECURSIVE
    T1 AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM T1 WHERE n < 3)
  SELECT * FROM T1
```

###### Examples of disallowed recursive CTEs

The following recursive CTE is disallowed because the
self-reference doesn't include a set operator, base term, and
recursive term.

```sql
WITH RECURSIVE
  T1 AS (SELECT * FROM T1)
SELECT * FROM T1

-- Error
```

The following recursive CTE is disallowed because the self-reference to `T1`
is in the base term. The self reference is only allowed in the recursive term.

```sql
WITH RECURSIVE
  T1 AS ((SELECT * FROM T1) UNION ALL (SELECT 1))
SELECT * FROM T1

-- Error
```

The following recursive CTE is disallowed because there are multiple
self-references in the recursive term when there must only be one.

```sql
WITH RECURSIVE
  T1 AS ((SELECT 1 AS n) UNION ALL ((SELECT * FROM T1) UNION ALL (SELECT * FROM T1)))
SELECT * FROM T1

-- Error
```

The following recursive CTE is disallowed because the self-reference is
inside an [expression subquery](subqueries.md#expression-subqueries)

```sql
WITH RECURSIVE
  T1 AS ((SELECT 1 AS n) UNION ALL (SELECT (SELECT n FROM T1)))
SELECT * FROM T1

-- Error
```

The following recursive CTE is disallowed because there is a
self-reference as an argument to a table-valued function (TVF).

```sql
WITH RECURSIVE
  T1 AS (
    (SELECT 1 AS n) UNION ALL
    (SELECT * FROM MY_TVF(T1)))
SELECT * FROM T1;

-- Error
```

The following recursive CTE is disallowed because there is a
self-reference as input to an outer join.

```sql
WITH RECURSIVE
  T0 AS (SELECT 1 AS n),
  T1 AS ((SELECT 1 AS n) UNION ALL (SELECT * FROM T1 FULL OUTER JOIN T0 USING (n)))
SELECT * FROM T1;

-- Error
```

The following recursive CTE is disallowed because you can't use aggregation
with a self-reference.

```sql
WITH RECURSIVE
  T1 AS (
    (SELECT 1 AS n) UNION ALL
    (SELECT COUNT(*) FROM T1))
SELECT * FROM T1;

-- Error
```

The following recursive CTE is disallowed because you can't use the
window function `OVER` clause with a self-reference.

```sql
WITH RECURSIVE
  T1 AS (
    (SELECT 1.0 AS n) UNION ALL
    SELECT 1 + AVG(n) OVER(ROWS between 2 PRECEDING and 0 FOLLOWING) FROM T1 WHERE n < 10)
SELECT n FROM T1;

-- Error
```

The following recursive CTE is disallowed because you can't use a
`LIMIT` clause with a self-reference.

```sql
WITH RECURSIVE
  T1 AS ((SELECT 1 AS n) UNION ALL (SELECT n FROM T1 LIMIT 3))
SELECT * FROM T1;

-- Error
```

The following recursive CTEs are disallowed because you can't use an
`ORDER BY` clause with a self-reference.

```sql
WITH RECURSIVE
  T1 AS ((SELECT 1 AS n) UNION ALL (SELECT n + 1 FROM T1 ORDER BY n))
SELECT * FROM T1;

-- Error
```

The following recursive CTE is disallowed because table `T1` can't be
recursively referenced from inside an inner `WITH` clause

```sql
WITH RECURSIVE
  T1 AS ((SELECT 1 AS n) UNION ALL (WITH t AS (SELECT n FROM T1) SELECT * FROM t))
SELECT * FROM T1

-- Error
```

#### CTE rules and constraints

Common table expressions (CTEs) can be referenced inside the query expression
that contains the `WITH` clause.

###### General rules

Here are some general rules and constraints to consider when working with CTEs:

- Each CTE in the same `WITH` clause must have a unique name.
- You must include the [`RECURSIVE` keyword](#recursive-keyword) keyword if the `WITH` clause contains a recursive CTE.
- The [`RECURSIVE` keyword](#recursive-keyword) in the `WITH` clause changes the visibility of CTEs to other CTEs in the same `WITH` clause. You can learn more [here](#recursive-keyword).
- `WITH` isn't allowed inside `WITH RECURSIVE`.
- `WITH RECURSIVE` is allowed in the `SELECT` statement.
- `WITH RECURSIVE` is only allowed at the top level of the query.
- `WITH RECURSIVE` isn't allowed in functions.
- `WITH RECURSIVE` isn't allowed in materialized views.
- The `WITH RECURSIVE` clause can't contain generative AI functions.
- `CREATE RECURSIVE VIEW` isn't supported. To work around this, use the `WITH RECURSIVE` clause as the `query_expression` in the `CREATE VIEW` statement. For more information, see [CREATE VIEW](data-definition-language-1.md#create-view-statement).
- A local CTE overrides an outer CTE or table with the same name.
- A CTE on a subquery may not reference correlated columns from the outer query.
- `UNION DISTINCT` isn't allowed inside a `WITH RECURSIVE` clause.

###### Base term rules

The following rules apply to the base term in a recursive CTE:

- The base term is required to be non-recursive.
- The base term determines the names and types of all of the table columns.

###### Recursive term rules

The following rules apply to the recursive term in a recursive CTE:

- The recursive term must include exactly one reference to the recursively-defined table in the base term.
- The recursive term must contain the same number of columns as the base term, and the type of each column must be implicitly coercible to the type of the corresponding column in the base term.
- A recursive table reference can't be used as an operand to a `FULL JOIN`, a right operand to a `LEFT JOIN`, or a left operand to a `RIGHT JOIN`.
- A recursive table reference can't be used with the `TABLESAMPLE` operator.
- A recursive table reference can't be used as an operand to a table-valued function (TVF).
- Use of the `IN` and `EXISTS` expression subqueries is limited within the recursive term. For example:
  - `[NOT] IN` and `[NOT] EXISTS` aren't allowed in the `SELECT` clause.
  - `NOT IN` isn't allowed in the `WHERE` clause.

The following rules apply to a subquery inside a recursive term:

- A subquery with a recursive table reference must be a `SELECT` expression, not a set operation, such as `UNION ALL`.
- A subquery can't contain, directly or indirectly, a recursive table reference anywhere outside of its `FROM` clause.
- A subquery with a recursive table reference can't contain an `ORDER BY` or `LIMIT` clause.
- A subquery with a recursive table reference can't invoke aggregate functions.
- A subquery with a recursive table reference can't invoke window functions.
- A subquery with a recursive table reference can't contain the `DISTINCT` keyword or `GROUP BY` clause.

#### CTE visibility

The visibility of a common table expression (CTE) within a query expression
is determined by whether or not you add the `RECURSIVE` keyword to the
`WITH` clause where the CTE was defined. You can learn more about these
differences in the following sections.

##### Visibility of CTEs in a `WITH` clause with the `RECURSIVE` keyword

When you include the `RECURSIVE` keyword, references between CTEs in the `WITH`
clause can go backwards and forwards. Cycles aren't allowed.

This is what happens when you have two CTEs that reference
themselves or each other in a `WITH` clause with the `RECURSIVE`
keyword. Assume that `A` is the first CTE and `B` is the second
CTE in the clause:

- A references A = Valid
- A references B = Valid
- B references A = Valid
- A references B references A = Invalid (cycles aren't allowed)

`A` can reference itself because self-references are supported:

```sql
WITH RECURSIVE
  A AS (SELECT 1 AS n UNION ALL (SELECT n + 1 FROM A WHERE n < 3))
SELECT * FROM A

/*---+
 | n |
 +---+
 | 1 |
 | 2 |
 | 3 |
 +---*/
```

`A` can reference `B` because references between CTEs can go forwards:

```sql
WITH RECURSIVE
  A AS (SELECT * FROM B),
  B AS (SELECT 1 AS n)
SELECT * FROM B

/*---+
 | n |
 +---+
 | 1 |
 +---*/
```

`B` can reference `A` because references between CTEs can go backwards:

```sql
WITH RECURSIVE
  A AS (SELECT 1 AS n),
  B AS (SELECT * FROM A)
SELECT * FROM B

/*---+
 | n |
 +---+
 | 1 |
 +---*/
```

This produces an error. `A` and `B` reference each other, which creates a cycle:

```sql
WITH RECURSIVE
  A AS (SELECT * FROM B),
  B AS (SELECT * FROM A)
SELECT * FROM B

-- Error
```

##### Visibility of CTEs in a `WITH` clause without the `RECURSIVE` keyword

When you don't include the `RECURSIVE` keyword in the `WITH` clause,
references between CTEs in the clause can go backward but not forward.

This is what happens when you have two CTEs that reference
themselves or each other in a `WITH` clause without
the `RECURSIVE` keyword. Assume that `A` is the first CTE and `B`
is the second CTE in the clause:

- A references A = Invalid
- A references B = Invalid
- B references A = Valid
- A references B references A = Invalid (cycles aren't allowed)

This produces an error. `A` can't reference itself because self-references
aren't supported:

```sql
WITH
  A AS (SELECT 1 AS n UNION ALL (SELECT n + 1 FROM A WHERE n < 3))
SELECT * FROM A

-- Error
```

This produces an error. `A` can't reference `B` because references between
CTEs can go backwards but not forwards:

```sql
WITH
  A AS (SELECT * FROM B),
  B AS (SELECT 1 AS n)
SELECT * FROM B

-- Error
```

`B` can reference `A` because references between CTEs can go backwards:

```sql
WITH
  A AS (SELECT 1 AS n),
  B AS (SELECT * FROM A)
SELECT * FROM B

/*---+
 | n |
 +---+
 | 1 |
 +---*/
```

This produces an error. `A` and `B` reference each other, which creates a
cycle:

```sql
WITH
  A AS (SELECT * FROM B),
  B AS (SELECT * FROM A)
SELECT * FROM B

-- Error
```

### `AGGREGATION_THRESHOLD` clause

Syntax for an aggregation threshold analysis rule--enforced query:

```text
WITH AGGREGATION_THRESHOLD OPTIONS (
  threshold = threshold_amount,
  privacy_unit_column = column_name
)
```

Syntax for an aggregation threshold analysis rule--enforced view:

```text
WITH AGGREGATION_THRESHOLD [ OPTIONS (
  [ threshold = threshold_amount ],
  [ privacy_unit_column = column_name ]
) ]
```

**Description**

Use the `AGGREGATION_THRESHOLD` clause to enforce an
aggregation threshold. This clause counts the number of distinct privacy units
(represented by the privacy unit column) for each group, and only outputs the
groups where the distinct privacy unit count satisfies the
aggregation threshold. If you want to use an
aggregation threshold analysis rule that you defined
for a view, use the syntax for an [analysis rule--enforced view](https://docs.cloud.google.com/bigquery/docs/analysis-rules#privacy_view).
When querying a privacy-enforced view, the `AGGREGATION_THRESHOLD` clause does
not need to include the `OPTIONS` clause.

You can't use the `AGGREGATION_THRESHOLD` clause with a
[multi-level aggregation](../googlesql-functions/aggregate-function-calls.md#multi-level-aggregation) query.

**Definitions:**

- `threshold`: The minimum number of distinct
  privacy units (privacy unit column values) that need to contribute to each row
  in the query results. If a potential row doesn't satisfy this threshold,
  that row is omitted from the query results. `threshold_amount` must be
  a positive `INT64` value.

  If you're using this query with an analysis rule--enforced view, you can
  optionally add this query parameter to override the `threshold` parameter for
  the view. The threshold for the query must be equal to or
  greater than the threshold for the view. If the threshold for the query
  is less than the threshold for the view, an error is produced.
- `privacy_unit_column`: The column that represents the
  privacy unit column. Replace `column_name` with the
  path expression for the column. The first identifier in the path can start
  with either a table name or a column name that's visible in the
  `FROM` clause.

  If you're using this query with an analysis rule--enforced view, you can
  optionally add this query parameter. However, it must match the
  value for `privacy_unit_column` on the view. If it doesn't, an error is
  produced.

**Details**

The following functions can be used on any column in a query with the
`AGGREGATION_THRESHOLD` clause, including the commonly used
`COUNT`, `SUM`, and `AVG` functions:

- `APPROX_COUNT_DISTINCT`
- `AVG`
- `COUNT`
- `COUNTIF`
- `LOGICAL_AND`
- `LOGICAL_OR`
- `SUM`
- `COVAR_POP`
- `COVAR_SAMP`
- `STDDEV_POP`
- `STDDEV_SAMP`
- `VAR_POP`
- `VAR_SAMP`

**Example**

In the following example, an aggregation threshold is enforced
on a query. Notice that some privacy units are dropped because
there aren't enough distinct instances.

```sql
WITH ExamTable AS (
  SELECT "Hansen" AS last_name, "P91" AS test_id, 510 AS test_score UNION ALL
  SELECT "Wang", "U25", 500 UNION ALL
  SELECT "Wang", "C83", 520 UNION ALL
  SELECT "Wang", "U25", 460 UNION ALL
  SELECT "Hansen", "C83", 420 UNION ALL
  SELECT "Hansen", "C83", 560 UNION ALL
  SELECT "Devi", "U25", 580 UNION ALL
  SELECT "Devi", "P91", 480 UNION ALL
  SELECT "Ivanov", "U25", 490 UNION ALL
  SELECT "Ivanov", "P91", 540 UNION ALL
  SELECT "Silva", "U25", 550)
SELECT WITH AGGREGATION_THRESHOLD
  OPTIONS(threshold=3, privacy_unit_column=last_name)
  test_id,
  COUNT(DISTINCT last_name) AS student_count,
  AVG(test_score) AS avg_test_score
FROM ExamTable
GROUP BY test_id;

/*---------+---------------+----------------+
 | test_id | student_count | avg_test_score |
 +---------+---------------+----------------+
 | P91     | 3             | 510.0          |
 | U25     | 4             | 516.0          |
 +---------+---------------+----------------*/
```

In the following example, an aggregation threshold analysis rule is enforced on
a view with the same results:

```sql
-- Create a table.
CREATE OR REPLACE TABLE mydataset.ExamTable AS (
  SELECT "Hansen" AS last_name, "P91" AS test_id, 510 AS test_score UNION ALL
  SELECT "Wang", "U25", 500 UNION ALL
  SELECT "Wang", "C83", 520 UNION ALL
  SELECT "Wang", "U25", 460 UNION ALL
  SELECT "Hansen", "C83", 420 UNION ALL
  SELECT "Hansen", "C83", 560 UNION ALL
  SELECT "Devi", "U25", 580 UNION ALL
  SELECT "Devi", "P91", 480 UNION ALL
  SELECT "Ivanov", "U25", 490 UNION ALL
  SELECT "Ivanov", "P91", 540 UNION ALL
  SELECT "Silva", "U25", 550);

-- Create a view for the table.
CREATE OR REPLACE VIEW mydataset.ExamView
OPTIONS(
  privacy_policy= '{"aggregation_threshold_policy": {"threshold": 3, "privacy_unit_column": "last_name"}}'
)
AS ( SELECT * FROM mydataset.ExamTable );

-- Query the aggregation threshold privacy-policy enforced view.
SELECT WITH AGGREGATION_THRESHOLD
  test_id,
  COUNT(DISTINCT last_name) AS student_count,
  AVG(test_score) AS avg_test_score
FROM mydataset.ExamView
GROUP BY test_id;

/*---------+---------------+----------------+
 | test_id | student_count | avg_test_score |
 +---------+---------------+----------------+
 | P91     | 3             | 510.0          |
 | U25     | 4             | 516.0          |
 +---------+---------------+----------------*/
```

In the following example, an aggregation threshold analysis rule is enforced on
the previous view, but the threshold is adjusted from `3` in the view to
`4` in the query:

```sql
SELECT WITH AGGREGATION_THRESHOLD
  OPTIONS(threshold=4)
  test_id,
  COUNT(DISTINCT last_name) AS student_count,
  AVG(test_score) AS avg_test_score
FROM mydataset.ExamView
GROUP BY test_id;

/*---------+---------------+----------------+
 | test_id | student_count | avg_test_score |
 +---------+---------------+----------------+
 | U25     | 4             | 516.0          |
 +---------+---------------+----------------*/
```

In the following example, an aggregation threshold analysis rule is enforced on
the previous view, but the threshold is adjusted from `3` in the view to
`5` in the query. While the analysis rule is satisfied, the query produces
no data.

```sql
-- No data is produced.
SELECT WITH AGGREGATION_THRESHOLD
  OPTIONS(threshold=5)
  test_id,
  COUNT(DISTINCT last_name) AS student_count,
  AVG(test_score) AS avg_test_score
FROM mydataset.ExamView
GROUP BY test_id;
```

In the following example, an aggregation threshold analysis rule is enforced on
the previous view, but the threshold is adjusted from `3` in the view to
`2` in the query:

```sql
-- Error: Aggregation threshold is too low.
SELECT WITH AGGREGATION_THRESHOLD
  OPTIONS(threshold=2)
  test_id,
  COUNT(DISTINCT last_name) AS student_count,
  AVG(test_score) AS avg_test_score
FROM mydataset.ExamView
GROUP BY test_id;
```

In the following example, an aggregation threshold analysis rule is enforced on
the previous view, but the privacy unit column is adjusted from `last_name` in the view
to `test_id` in the query:

```sql
-- Error: Can't override the privacy unit column set in view.
SELECT WITH AGGREGATION_THRESHOLD
  OPTIONS(privacy_unit_column=test_id)
  test_id,
  COUNT(DISTINCT last_name) AS student_count,
  AVG(test_score) AS avg_test_score
FROM mydataset.ExamView
GROUP BY test_id;
```

### Differential privacy clause

Adapted (not in the official docs): moved the comma inside the optional `max_groups_contributed` part.

```text
WITH DIFFERENTIAL_PRIVACY OPTIONS( privacy_parameters )

privacy_parameters:
  epsilon = expression,
  delta = expression,
  [ max_groups_contributed = expression, ]
  privacy_unit_column = column_name
```

**Description**

This clause lets you transform the results of a query with
[differentially private aggregations](../googlesql-functions/aggregate-dp-functions.md). To learn more about
differential privacy, see [Differential privacy](https://docs.cloud.google.com/bigquery/docs/differential-privacy).

You can't use differential privacy (or the deprecated `ANONYMIZATION` clause
it replaces) with a [multi-level aggregation](../googlesql-functions/aggregate-function-calls.md#multi-level-aggregation) query.

You can use the following syntax to build a differential privacy clause:

- [`epsilon`](#epsilon): Controls the amount of noise added to the results. A higher epsilon means less noise. `expression` must be a literal and return a `FLOAT64`.
- [`delta`](#delta): The probability that any row in the result fails to be epsilon-differentially private. `expression` must be a literal and return a `FLOAT64`.
- [`max_groups_contributed`](#max_groups_contributed): A positive integer identifying the limit on the number of groups that an entity is allowed to contribute to. This number is also used to scale the noise for each group. `expression` must be a literal and return an `INT64`.
- [`privacy_unit_column`](#privacy_unit_column): The column that represents the privacy unit column. Replace `column_name` with the path expression for the column. The first identifier in the path can start with either a table name or a column name that's visible in the `FROM` clause.

If you want to use this syntax, add it after the `SELECT` keyword with one or
more differentially private aggregate functions in the `SELECT` list.
To learn more about the privacy parameters in this syntax,
see [Privacy parameters](#privacy-parameters).

#### Privacy parameters

Privacy parameters control how the results of a query are transformed.
Appropriate values for these settings can depend on many things such
as the characteristics of your data, the exposure level, and the
privacy level.

In this section, you can learn more about how you can use
privacy parameters to control how the results are transformed.

##### `epsilon`

Noise is added primarily based on the specified `epsilon`
differential privacy parameter. The higher the epsilon the less noise is added.
More noise corresponding to smaller epsilons equals more privacy protection.

Noise can be eliminated by setting `epsilon` to `1e20`, which can be
useful during initial data exploration and experimentation with
differential privacy. Extremely large `epsilon` values, such as `1e308`,
cause query failure.

GoogleSQL splits `epsilon` between the differentially private
aggregates in the query. In addition to the explicit
differentially private aggregate functions, the differential privacy process
also injects an implicit differentially private aggregate into the plan for
removing small groups that computes a noisy entity count per group. If you have
`n` explicit differentially private aggregate functions in your query, then each
aggregate individually gets `epsilon/(n+1)` for its computation. If used with
`max_groups_contributed`, the effective `epsilon` per function per groups is
further split by `max_groups_contributed`. Additionally, if implicit clamping is
used for an aggregate differentially private function, then half of the
function's epsilon is applied towards computing implicit bounds, and half of the
function's epsilon is applied towards the differentially private aggregation
itself.

##### `delta`

The `delta` differential privacy parameter represents the probability that any
row fails to be `epsilon`-differentially private in the result of a
differentially private query.

##### `max_groups_contributed`

The `max_groups_contributed` differential privacy parameter is a
positive integer that, if specified, scales the noise and limits the number of
groups that each entity can contribute to.

`max_groups_contributed` is set by default, even if you don't specify it.
The default value is `1`. If `max_groups_contributed` is set to
`NULL`, then `max_groups_contributed` is unspecified and there is no limit to the number
of groups that each entity can contribute to.

If `max_groups_contributed` is unspecified, the language can't guarantee that
the results will be differentially private. We recommend that you specify
`max_groups_contributed`. If you don't specify `max_groups_contributed`, the
results might still be differentially private if certain preconditions are met.
For example, if you know that the privacy unit column in a table or view is
unique in the `FROM` clause, the entity can't contribute to more than one group
and therefore the results will be the same regardless of whether
`max_groups_contributed` is set.

##### `privacy_unit_column`

To learn about the privacy unit and how to define a privacy unit column, see
[Define a privacy unit column](https://docs.cloud.google.com/bigquery/docs/differential-privacy#dp_define_privacy_unit_id).

#### Differential privacy examples

This section contains examples that illustrate how to work with
differential privacy in GoogleSQL.

##### Tables for examples

The examples in this section reference the following tables:

```sql
CREATE OR REPLACE TABLE professors AS (
  SELECT 101 AS id, "pencil" AS item, 24 AS quantity UNION ALL
  SELECT 123, "pen", 16 UNION ALL
  SELECT 123, "pencil", 10 UNION ALL
  SELECT 123, "pencil", 38 UNION ALL
  SELECT 101, "pen", 19 UNION ALL
  SELECT 101, "pen", 23 UNION ALL
  SELECT 130, "scissors", 8 UNION ALL
  SELECT 150, "pencil", 72);
```

```sql
CREATE OR REPLACE TABLE students AS (
  SELECT 1 AS id, "pencil" AS item, 5 AS quantity UNION ALL
  SELECT 1, "pen", 2 UNION ALL
  SELECT 2, "pen", 1 UNION ALL
  SELECT 3, "pen", 4);
```

##### Add noise

You can add noise to a differentially private query. Smaller groups might not be
included. Smaller epsilons and more noise will provide greater
privacy protection.

```sql
-- This gets the average number of items requested per professor and adds
-- noise to the results
SELECT
  WITH DIFFERENTIAL_PRIVACY
    OPTIONS(epsilon=10, delta=.01, max_groups_contributed=2, privacy_unit_column=id)
    item,
    AVG(quantity, contribution_bounds_per_group => (0,100)) AS average_quantity
FROM professors
GROUP BY item;

-- These results will change each time you run the query.
-- The scissors group was removed this time, but might not be
-- removed the next time.
/*----------+------------------+
 | item     | average_quantity |
 +----------+------------------+
 | pencil   | 38.5038356810269 |
 | pen      | 13.4725028762032 |
 +----------+------------------*/
```

##### Remove noise

Removing noise removes privacy protection. Only remove noise for
testing queries on non-private data. When `epsilon` is high, noise is removed
from the results.

```sql
-- This gets the average number of items requested per professor and removes
-- noise from the results
SELECT
  WITH DIFFERENTIAL_PRIVACY
    OPTIONS(epsilon=1e20, delta=.01, max_groups_contributed=2, privacy_unit_column=id)
    item,
    AVG(quantity, contribution_bounds_per_group => (0,100)) AS average_quantity
FROM professors
GROUP BY item;

/*----------+------------------+
 | item     | average_quantity |
 +----------+------------------+
 | pencil   | 40               |
 | pen      | 18.5             |
 | scissors | 8                |
 +----------+------------------*/
```

In this example, `max_groups_contributed` is set to `2` because each professor
contributes to at most two groups (that is, each has at most two distinct `item`
values). A value of `2` or greater is needed to avoid dropping contributions
from any professor. Alternatively, `max_groups_contributed` could be set to
`NULL` to not limit contributions.

##### Limit the groups in which a privacy unit ID can exist

A privacy unit column can exist within multiple groups. For example, in the
`professors` table, the privacy unit column `123` exists in the `pencil` and
`pen` group. You can set `max_groups_contributed` to different values to limit how many
groups each privacy unit column will be included in.

```sql
SELECT
  WITH DIFFERENTIAL_PRIVACY
    OPTIONS(epsilon=1e20, delta=.01, privacy_unit_column=id)
    item,
    AVG(quantity, contribution_bounds_per_group => (0,100)) AS average_quantity
FROM professors
GROUP BY item;

-- The privacy unit column 123 was only included in the pen group in this example.
-- Noise was removed from this query for demonstration purposes only.
/*----------+------------------+
 | item     | average_quantity |
 +----------+------------------+
 | pencil   | 40               |
 | pen      | 18.5             |
 | scissors | 8                |
 +----------+------------------*/
```

### Using aliases

An alias is a temporary name given to a table, column, or expression present in
a query. You can introduce explicit aliases in the `SELECT` list or `FROM`
clause, or GoogleSQL infers an implicit alias for some expressions.
Expressions with neither an explicit nor implicit alias are anonymous and the
query can't reference them by name.

If you enable [reusable column aliases](https://cloud.google.com/bigquery/docs/column-aliases), you can
introduce an explicit or implicit alias in a `SELECT` clause and then use it in
a subsequent `SELECT` or `WHERE` clause.

#### Explicit aliases

You can introduce explicit aliases in either the `FROM` clause or the `SELECT`
list.

In a `FROM` clause, you can introduce explicit aliases for any item, including
tables, arrays, subqueries, and `UNNEST` clauses, using `[AS] alias`. The `AS`
keyword is optional.

Example:

```sql
SELECT s.FirstName, s2.SongName
FROM Singers AS s, (SELECT * FROM Songs) AS s2;
```

You can introduce explicit aliases for any expression in the `SELECT` list using
`[AS] alias`. The `AS` keyword is optional.

Example:

```sql
SELECT s.FirstName AS name, LOWER(s.FirstName) AS lname
FROM Singers s;
```

#### Implicit aliases

In the `SELECT` list, if there is an expression that doesn't have an explicit
alias, GoogleSQL assigns an implicit alias according to the following
rules. There can be multiple columns with the same alias in the `SELECT` list.

- For identifiers, the alias is the identifier. For example, `SELECT abc` implies `AS abc`.
- For path expressions, the alias is the last identifier in the path. For example, `SELECT abc.def.ghi` implies `AS ghi`.
- For field access using the "dot" member field access operator, the alias is the field name. For example, `SELECT (struct_function()).fname` implies `AS
  fname`.

> [!NOTE]
> **Note:** If you omit whitespace between a literal and an alias, GoogleSQL returns a "Missing whitespace" error. For example, `SELECT 123 abc` implies `SELECT 123 AS abc, but`SELECT 123abc\` produces the error.

In all other cases, there is no implicit alias, so the column is anonymous and
can't be referenced by name. The data from that column will still be returned
and the displayed query results may have a generated label for that column, but
the label can't be used like an alias.

In a `FROM` clause, `from_item`s aren't required to have an alias. The
following rules apply:

- If there is an expression that doesn't have an explicit alias, GoogleSQL assigns an implicit alias in these cases:
  - For identifiers, the alias is the identifier. For example, `FROM abc` implies `AS abc`.
  - For path expressions, the alias is the last identifier in the path. For example, `FROM abc.def.ghi` implies `AS ghi`
  - The column produced using `WITH OFFSET` has the implicit alias `offset`.
- Table subqueries don't have implicit aliases.
- `FROM UNNEST(x)` doesn't have an implicit alias.

#### Alias visibility

After you introduce an explicit alias in a query, there are restrictions on
where else in the query you can reference that alias. These restrictions on
alias visibility are the result of GoogleSQL name scoping rules.

##### Visibility in the `FROM` clause

GoogleSQL processes aliases in a `FROM` clause from left to right,
and aliases are visible only to subsequent path expressions in a `FROM`
clause.

Example:

Assume the `Singers` table had a `Concerts` column of `ARRAY` type.

```sql
SELECT FirstName
FROM Singers AS s, s.Concerts;
```

Invalid:

```sql
SELECT FirstName
FROM s.Concerts, Singers AS s;  // INVALID.
```

`FROM` clause aliases are **not** visible to subqueries in the same `FROM`
clause. Subqueries in a `FROM` clause can't contain correlated references to
other tables in the same `FROM` clause.

Invalid:

```sql
SELECT FirstName
FROM Singers AS s, (SELECT (2020 - ReleaseDate) FROM s)  // INVALID.
```

You can use any column name from a table in the `FROM` as an alias anywhere in
the query, with or without qualification with the table name.

Example:

```sql
SELECT FirstName, s.ReleaseDate
FROM Singers s WHERE ReleaseDate = 1975;
```

If the `FROM` clause contains an explicit alias, you must use the explicit alias
instead of the implicit alias for the remainder of the query (see
[Implicit Aliases](#implicit-aliases)). A table alias is useful for brevity or
to eliminate ambiguity in cases such as self-joins, where the same table is
scanned multiple times during query processing.

Example:

```sql
SELECT * FROM Singers as s, Songs as s2
ORDER BY s.LastName
```

Invalid --- `ORDER BY` doesn't use the table alias:

```sql
SELECT * FROM Singers as s, Songs as s2
ORDER BY Singers.LastName;  // INVALID.
```

##### Visibility in the `SELECT` list

Aliases in the `SELECT` list are visible only to the following clauses:

- `GROUP BY` clause
- `ORDER BY` clause
- `HAVING` clause

Example:

```sql
SELECT LastName AS last, SingerID
FROM Singers
ORDER BY last;
```

Invalid:

```sql
SELECT LastName AS last, SingerID
FROM Singers
WHERE last = "Smith";  // INVALID.
```

##### Visibility in the `GROUP BY`, `ORDER BY`, and `HAVING` clauses

These three clauses, `GROUP BY`, `ORDER BY`, and `HAVING`, can refer to only the
following values:

- Tables in the `FROM` clause and any of their columns.
- Aliases from the `SELECT` list.

`GROUP BY` and `ORDER BY` can also refer to a third group:

- Integer literals, which refer to items in the `SELECT` list. The integer `1` refers to the first item in the `SELECT` list, `2` refers to the second item, etc.

Example:

```sql
SELECT SingerID AS sid, COUNT(Songid) AS s2id
FROM Songs
GROUP BY 1
ORDER BY 2 DESC;
```

The previous query is equivalent to:

```sql
SELECT SingerID AS sid, COUNT(Songid) AS s2id
FROM Songs
GROUP BY sid
ORDER BY s2id DESC;
```

#### Duplicate aliases

A `SELECT` list or subquery containing multiple explicit or implicit aliases
of the same name is allowed, as long as the alias name isn't referenced
elsewhere in the query, since the reference would be
[ambiguous](#ambiguous-aliases).

When a top-level `SELECT` list contains duplicate column names and no
destination table is specified, all duplicate columns, except for the first one,
are automatically renamed to make them unique. The renamed columns appear in the
query result.

Example:

```sql
SELECT 1 AS a, 2 AS a;

/*---+-----+
 | a | a_1 |
 +---+-----+
 | 1 | 2   |
 +---+-----*/
```

Duplicate column names in a table or view definition aren't supported. These
statements with queries that contain duplicate column names will fail:

```sql
-- This query fails.
CREATE TABLE my_dataset.my_table AS (SELECT 1 AS a, 2 AS a);
```

```sql
-- This query fails.
CREATE VIEW my_dataset.my_view AS (SELECT 1 AS a, 2 AS a);
```

#### Ambiguous aliases

GoogleSQL provides an error if accessing a name is ambiguous, meaning
it can resolve to more than one unique object in the query or in a table schema,
including the schema of a destination table.

The following query contains column names that conflict between tables, since
both `Singers` and `Songs` have a column named `SingerID`:

```sql
SELECT SingerID
FROM Singers, Songs;
```

The following query contains aliases that are ambiguous in the `GROUP BY` clause
because they are duplicated in the `SELECT` list:

```sql
SELECT FirstName AS name, LastName AS name,
FROM Singers
GROUP BY name;
```

The following query contains aliases that are ambiguous in the `SELECT` list and
`FROM` clause because they share a column and field with same name.

- Assume the `Person` table has three columns: `FirstName`, `LastName`, and `PrimaryContact`.
- Assume the `PrimaryContact` column represents a struct with these fields: `FirstName` and `LastName`.

The alias `P` is ambiguous and will produce an error because `P.FirstName` in
the `GROUP BY` clause could refer to either `Person.FirstName` or
`Person.PrimaryContact.FirstName`.

```sql
SELECT FirstName, LastName, PrimaryContact AS P
FROM Person AS P
GROUP BY P.FirstName;
```

A name is *not* ambiguous in `GROUP BY`, `ORDER BY` or `HAVING` if it's both
a column name and a `SELECT` list alias, as long as the name resolves to the
same underlying object. In the following example, the alias `BirthYear` isn't
ambiguous because it resolves to the same underlying column,
`Singers.BirthYear`.

```sql
SELECT LastName, BirthYear AS BirthYear
FROM Singers
GROUP BY BirthYear;
```

#### Range variables

In GoogleSQL, a range variable is a table expression alias in the
`FROM` clause. Sometimes a range variable is known as a `table alias`. A
range variable lets you reference rows being scanned from a table expression.
A table expression represents an item in the `FROM` clause that returns a table.
Common items that this expression can represent include
tables,
[value tables](#value-tables),
[subqueries](subqueries.md),
[table-valued functions (TVFs)](https://cloud.google.com/bigquery/docs/table-functions),
[joins](query-syntax-2.md#join-operation), and [parenthesized joins](query-syntax-2.md#join-operation).

In general, a range variable provides a reference to the rows of a table
expression. A range variable can be used to qualify a column reference and
unambiguously identify the related table, for example `range_variable.column_1`.

When referencing a range variable on its own without a specified column suffix,
the result of a table expression is the row type of the related table.
Value tables have explicit row types, so for range variables related
to value tables, the result type is the value table's row type. Other tables
don't have explicit row types, and for those tables, the range variable
type is a dynamically defined struct that includes all of the
columns in the table.

**Examples**

In these examples, the `WITH` clause is used to emulate a temporary table
called `Grid`. This table has columns `x` and `y`. A range variable called
`Coordinate` refers to the current row as the table is scanned. `Coordinate`
can be used to access the entire row or columns in the row.

The following example selects column `x` from range variable `Coordinate`,
which in effect selects column `x` from table `Grid`.

```sql
WITH Grid AS (SELECT 1 x, 2 y)
SELECT Coordinate.x FROM Grid AS Coordinate;

/*---+
 | x |
 +---+
 | 1 |
 +---*/
```

The following example selects all columns from range variable `Coordinate`,
which in effect selects all columns from table `Grid`.

```sql
WITH Grid AS (SELECT 1 x, 2 y)
SELECT Coordinate.* FROM Grid AS Coordinate;

/*---+---+
 | x | y |
 +---+---+
 | 1 | 2 |
 +---+---*/
```

The following example selects the range variable `Coordinate`, which is a
reference to rows in table `Grid`. Since `Grid` isn't a value table,
the result type of `Coordinate` is a struct that contains all the columns
from `Grid`.

```sql
WITH Grid AS (SELECT 1 x, 2 y)
SELECT Coordinate FROM Grid AS Coordinate;

/*--------------+
 | Coordinate   |
 +--------------+
 | {x: 1, y: 2} |
 +--------------*/
```

### Value tables

In addition to standard SQL *tables* , GoogleSQL supports *value tables* .
In a value table, rather than having rows made up of a list of columns, each row
is a single value of type `STRUCT`, and there are no column names.

In the following example, a value table for a `STRUCT` is produced with the
`SELECT AS VALUE` statement:

```sql
SELECT * FROM (SELECT AS VALUE STRUCT(123 AS a, FALSE AS b))

/*-----+-------+
 | a   | b     |
 +-----+-------+
 | 123 | FALSE |
 +-----+-------*/
```

#### Return query results as a value table

You can use GoogleSQL to return query results as a value table. This
is useful when you want to store a query result with a
`STRUCT` type as a
table. To return a query result as a value table, use one of the following
statements:

- [`SELECT AS STRUCT`](query-syntax-1.md#select-statement)
- [`SELECT AS VALUE`](query-syntax-1.md#select-statement)

Value tables can also occur as the output of the [`UNNEST`](query-syntax-1.md#unnest-operator)
operator or a [subquery](subqueries.md). The [`WITH` clause](#with-clause)
introduces a value table if the subquery used produces a value table.

In contexts where a query with exactly one column is expected, a value table
query can be used instead. For example, scalar and
array [subqueries](subqueries.md) normally require a single-column query,
but in GoogleSQL, they also allow using a value table query.

#### Create a table with a value table

Value tables aren't supported as top-level queries in the
`CREATE TABLE` statement, but they can be included in subqueries and
`UNNEST` operations. For example, you can create a table from a
value table with this query:

```sql
CREATE TABLE Reviews AS
SELECT * FROM (SELECT AS VALUE STRUCT(5 AS star_rating, FALSE AS up_down_rating))
```

| Column Name | Data Type |
|---|---|
| star_rating | `INT64` |
| up_down_rating | `BOOL` |

#### Use a set operation on a value table

You can't combine tables and value tables in a `SET` operation.

### Table function calls

To call a TVF, use the function call in place of the table name in a `FROM`
clause.

### Appendix A: examples with sample data

These examples include statements which perform queries on the
[`Roster`](#roster-table) and [`TeamMascot`](#teammascot-table),
and [`PlayerStats`](#playerstats-table) tables.

#### Sample tables

The following tables are used to illustrate the behavior of different
query clauses in this reference.

##### Roster table

The `Roster` table includes a list of player names (`LastName`) and the
unique ID assigned to their school (`SchoolID`). It looks like this:

```sql
/*-----------------------+
 | LastName   | SchoolID |
 +-----------------------+
 | Adams      | 50       |
 | Buchanan   | 52       |
 | Coolidge   | 52       |
 | Davis      | 51       |
 | Eisenhower | 77       |
 +-----------------------*/
```

You can use this `WITH` clause to emulate a temporary table name for the
examples in this reference:

```sql
WITH Roster AS
 (SELECT 'Adams' as LastName, 50 as SchoolID UNION ALL
  SELECT 'Buchanan', 52 UNION ALL
  SELECT 'Coolidge', 52 UNION ALL
  SELECT 'Davis', 51 UNION ALL
  SELECT 'Eisenhower', 77)
SELECT * FROM Roster
```

##### PlayerStats table

The `PlayerStats` table includes a list of player names (`LastName`) and the
unique ID assigned to the opponent they played in a given game (`OpponentID`)
and the number of points scored by the athlete in that game (`PointsScored`).

```sql
/*----------------------------------------+
 | LastName   | OpponentID | PointsScored |
 +----------------------------------------+
 | Adams      | 51         | 3            |
 | Buchanan   | 77         | 0            |
 | Coolidge   | 77         | 1            |
 | Adams      | 52         | 4            |
 | Buchanan   | 50         | 13           |
 +----------------------------------------*/
```

You can use this `WITH` clause to emulate a temporary table name for the
examples in this reference:

```sql
WITH PlayerStats AS
 (SELECT 'Adams' as LastName, 51 as OpponentID, 3 as PointsScored UNION ALL
  SELECT 'Buchanan', 77, 0 UNION ALL
  SELECT 'Coolidge', 77, 1 UNION ALL
  SELECT 'Adams', 52, 4 UNION ALL
  SELECT 'Buchanan', 50, 13)
SELECT * FROM PlayerStats
```

##### TeamMascot table

The `TeamMascot` table includes a list of unique school IDs (`SchoolID`) and the
mascot for that school (`Mascot`).

```sql
/*---------------------+
 | SchoolID | Mascot   |
 +---------------------+
 | 50       | Jaguars  |
 | 51       | Knights  |
 | 52       | Lakers   |
 | 53       | Mustangs |
 +---------------------*/
```

You can use this `WITH` clause to emulate a temporary table name for the
examples in this reference:

```sql
WITH TeamMascot AS
 (SELECT 50 as SchoolID, 'Jaguars' as Mascot UNION ALL
  SELECT 51, 'Knights' UNION ALL
  SELECT 52, 'Lakers' UNION ALL
  SELECT 53, 'Mustangs')
SELECT * FROM TeamMascot
```

#### `GROUP BY` clause

Example:

```sql
SELECT LastName, SUM(PointsScored)
FROM PlayerStats
GROUP BY LastName;
```

| LastName | SUM |
|---|---|
| Adams | 7 |
| Buchanan | 13 |
| Coolidge | 1 |

#### `UNION`

The `UNION` operator combines the result sets of two or more `SELECT` statements
by pairing columns from the result set of each `SELECT` statement and vertically
concatenating them.

Example:

```sql
SELECT Mascot AS X, SchoolID AS Y
FROM TeamMascot
UNION ALL
SELECT LastName, PointsScored
FROM PlayerStats;
```

Results:

| X | Y |
|---|---|
| Jaguars | 50 |
| Knights | 51 |
| Lakers | 52 |
| Mustangs | 53 |
| Adams | 3 |
| Buchanan | 0 |
| Coolidge | 1 |
| Adams | 4 |
| Buchanan | 13 |

#### `INTERSECT`

This query returns the last names that are present in both Roster and
PlayerStats.

```sql
SELECT LastName
FROM Roster
INTERSECT DISTINCT
SELECT LastName
FROM PlayerStats;
```

Results:

| LastName |
|---|
| Adams |
| Coolidge |
| Buchanan |

#### `EXCEPT`

The query below returns last names in Roster that are **not** present in
PlayerStats.

```sql
SELECT LastName
FROM Roster
EXCEPT DISTINCT
SELECT LastName
FROM PlayerStats;
```

Results:

| LastName |
|---|
| Eisenhower |
| Davis |

Reversing the order of the `SELECT` statements will return last names in
PlayerStats that are **not** present in Roster:

```sql
SELECT LastName
FROM PlayerStats
EXCEPT DISTINCT
SELECT LastName
FROM Roster;
```

Results:

```sql
(empty)
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders; 2 code blocks whose twin text is damaged (links expanded into URLs, `<...>` dropped, table borders shortened) are matched to the rendered page by position and similarity, and the text is taken from the page; and horizontal rules inside table cells are written as `<hr>`. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- The official page is split into 3 files at section boundaries; this is part 3.
- Corrected from the official docs: the `WITH DIFFERENTIAL_PRIVACY` syntax puts the comma after the optional `[ max_groups_contributed = expression ]`, so omitting it leaves two commas in a row. The comma is moved inside the brackets.
- Caution: the `WITH AGGREGATION_THRESHOLD OPTIONS (...)` syntax lists `[ threshold = threshold_amount ],` and `[ privacy_unit_column = column_name ]` as separate optional items, so omitting one leaves a dangling comma. The official docs do not show the intended comma placement.
- Corrected from the official docs: the text says the threshold is adjusted from `last_name` to `test_id`, but the example sets `OPTIONS(privacy_unit_column=test_id)` and its comment says the privacy unit column set in the view can't be overridden. "threshold" is changed to "privacy unit column".
- Caution: in the `max_groups_contributed` examples, the comment "The privacy unit column 123 was only included in the pen group in this example" is followed by the same result values (pencil 40, pen 18.5, scissors 8) as the earlier example where 123 contributes to both groups. The correct values are not stated.

## Related

- [Index of this directory](./README.md)
- [Query syntax (part 1 of 3)](./query-syntax-1.md)
- [Query syntax (part 2 of 3)](./query-syntax-2.md)

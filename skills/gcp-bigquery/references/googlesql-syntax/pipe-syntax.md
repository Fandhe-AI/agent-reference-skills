---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/pipe-syntax
---

# Pipe query syntax

## Signature / Usage

Pipe query syntax is an extension to GoogleSQL that's simpler and more
concise than [standard query syntax](query-syntax-1.md). Pipe syntax supports the
same operations as standard syntax, and improves some areas of SQL query
functionality and usability.

For more background and details on pipe syntax design, see the research paper
[SQL Has Problems. We Can Fix Them: Pipe Syntax In SQL](https://research.google/pubs/sql-has-problems-we-can-fix-them-pipe-syntax-in-sql/).
For an introduction to pipe syntax, see
[Work with pipe syntax](https://docs.cloud.google.com/bigquery/docs/pipe-syntax-guide).
To see examples of more complex queries written in pipe syntax,
see [Analyze data using pipe syntax](https://docs.cloud.google.com/bigquery/docs/analyze-data-pipe-syntax).

### Pipe syntax

Pipe syntax has the following key characteristics:

- Each pipe operator in pipe syntax consists of the pipe symbol, `|>`, an operator name, and any arguments:   
  `|> operator_name argument_list`
- Pipe operators can be added to the end of any valid query.
- Pipe syntax works anywhere standard syntax is supported: in queries, views, table-valued functions (TVFs), and other contexts.
- Pipe syntax can be mixed with standard syntax in the same query. For example, subqueries can use different syntax from the parent query.
- A pipe operator can see every alias that exists in the table preceding the pipe.
- A query can [start with a `FROM` clause](#from-queries), and pipe operators can optionally be added after the `FROM` clause.

#### Query comparison

Consider the following table called `Produce`:

```sql
CREATE OR REPLACE TABLE Produce AS (
  SELECT 'apples' AS item, 2 AS sales, 'fruit' AS category
  UNION ALL
  SELECT 'carrots' AS item, 8 AS sales, 'vegetable' AS category
  UNION ALL
  SELECT 'apples' AS item, 7 AS sales, 'fruit' AS category
  UNION ALL
  SELECT 'bananas' AS item, 5 AS sales, 'fruit' AS category
);

SELECT * FROM Produce;

/*---------+-------+-----------+
 | item    | sales | category  |
 +---------+-------+-----------+
 | apples  | 2     | fruit     |
 | carrots | 8     | vegetable |
 | apples  | 7     | fruit     |
 | bananas | 5     | fruit     |
 +---------+-------+-----------*/
```

Compare the following equivalent queries that compute the number and total
amount of sales for each item in the `Produce` table:

**Standard syntax**

```sql
SELECT item, COUNT(*) AS num_items, SUM(sales) AS total_sales
FROM Produce
WHERE
  item != 'bananas'
  AND category IN ('fruit', 'nut')
GROUP BY item
ORDER BY item DESC;

/*--------+-----------+-------------+
 | item   | num_items | total_sales |
 +--------+-----------+-------------+
 | apples | 2         | 9           |
 +--------+-----------+-------------*/
```

**Pipe syntax**

```sql
FROM Produce
|> WHERE
    item != 'bananas'
    AND category IN ('fruit', 'nut')
|> AGGREGATE COUNT(*) AS num_items, SUM(sales) AS total_sales
   GROUP BY item
|> ORDER BY item DESC;

/*--------+-----------+-------------+
 | item   | num_items | total_sales |
 +--------+-----------+-------------+
 | apples | 2         | 9           |
 +--------+-----------+-------------*/
```

### Pipe operator semantics

Pipe operators have the following semantic behavior:

- Each pipe operator performs a self-contained operation.
- A pipe operator consumes the input table passed to it through the pipe symbol, `|>`, and produces a new table as output.
- A pipe operator can reference only columns from its immediate input table. Columns from earlier in the same query aren't visible. Inside subqueries, correlated references to outer columns are still allowed.

#### Order preservation

The following operators preserve row order if the input table is ordered:

- [`SELECT`](#select-pipe-operator) (except when using `SELECT DISTINCT` or window functions)
- [`EXTEND`](#extend-pipe-operator) (except when using window functions)
- [`SET`](#set-pipe-operator) (except when using window functions)
- [`DROP`](#drop-pipe-operator)
- [`RENAME`](#rename-pipe-operator)
- [`AS`](#as-pipe-operator)
- [`LIMIT`](#limit-pipe-operator)
- [`WITH`](#with-pipe-operator)

When you use these operators after an
[`ORDER BY` operator](#order-by-pipe-operator), the result remains ordered.
Additionally, if a
[`LIMIT` operator](#limit-pipe-operator) follows an order-preserving operator, the
query computes the top rows based on that order.

### `FROM` queries

In pipe syntax, a query can start with a standard [`FROM` clause](query-syntax-1.md#from-clause)
and use any standard `FROM` syntax, including tables, joins, subqueries,
and
table-valued functions (TVFs). Table aliases can be
assigned to each input item using the [`AS alias` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#using_aliases).

A query with only a `FROM` clause, like `FROM table_name`, is allowed in pipe
syntax and returns all rows from the table. For tables with columns,
`FROM table_name` in pipe syntax is similar to
[`SELECT * FROM table_name`](query-syntax-1.md#select-) in standard syntax.

**Examples**

The following queries use the [`Produce` table](#query-comparison):

```sql
FROM Produce;

/*---------+-------+-----------+
 | item    | sales | category  |
 +---------+-------+-----------+
 | apples  | 2     | fruit     |
 | carrots | 8     | vegetable |
 | apples  | 7     | fruit     |
 | bananas | 5     | fruit     |
 +---------+-------+-----------*/
```

```sql
-- Join tables in the FROM clause and then apply pipe operators.
FROM
  Produce AS p1
  JOIN Produce AS p2
    USING (item)
|> WHERE item = 'bananas'
|> SELECT p1.item, p2.sales;

/*---------+-------+
 | item    | sales |
 +---------+-------+
 | bananas | 5     |
 +---------+-------*/
```

### Pipe operators

GoogleSQL supports the following pipe operators. For operators that
correspond or relate to similar operations in standard syntax, the operator
descriptions highlight similarities and differences and link to more detailed
documentation on the corresponding syntax.

#### Pipe operator list

| Name | Summary |
|---|---|
| [`SELECT`](#select-pipe-operator) | Produces a new table with the listed columns. |
| [`EXTEND`](#extend-pipe-operator) | Propagates the existing table and adds computed columns. |
| [`SET`](#set-pipe-operator) | Replaces the values of columns in the input table. |
| [`DROP`](#drop-pipe-operator) | Removes listed columns from the input table. |
| [`RENAME`](#rename-pipe-operator) | Renames specified columns. |
| [`AS`](#as-pipe-operator) | Introduces a table alias for the input table. |
| [`WHERE`](#where-pipe-operator) | Filters the results of the input table. |
| [`AGGREGATE`](#aggregate-pipe-operator) | Performs aggregation on data across groups of rows or the full input table. |
| [`DISTINCT`](#distinct-pipe-operator) | Returns distinct rows from the input table, while preserving table aliases. |
| [`JOIN`](#join-pipe-operator) | Joins rows from the input table with rows from a second table provided as an argument. |
| [`CALL`](#call-pipe-operator) | Calls a table-valued function (TVF), passing the pipe input table as a table argument. |
| [`ORDER BY`](#order-by-pipe-operator) | Sorts results by a list of expressions. |
| [`LIMIT`](#limit-pipe-operator) | Limits the number of rows to return in a query, with an optional `OFFSET` clause to skip over rows. |
| [`UNION`](#union-pipe-operator) | Returns the combined results of the input queries to the left and right of the pipe operator. |
| [`INTERSECT`](#intersect-pipe-operator) | Returns rows that are found in the results of both the input query to the left of the pipe operator and all input queries to the right of the pipe operator. |
| [`EXCEPT`](#except-pipe-operator) | Returns rows from the input query to the left of the pipe operator that aren't present in any input queries to the right of the pipe operator. |
| [`TABLESAMPLE`](#tablesample-pipe-operator) | Selects a random sample of rows from the input table. |
| [`WITH`](#with-pipe-operator) | Introduces one or more common table expressions (CTEs). |
| [`PIVOT`](#pivot-pipe-operator) | Rotates rows into columns. |
| [`UNPIVOT`](#unpivot-pipe-operator) | Rotates columns into rows. |
| [`MATCH_RECOGNIZE`](#match_recognize-pipe-operator) | Filters and aggregates rows based on matches. |

#### `SELECT` pipe operator

```sql
|> SELECT expression [[AS] alias] [, ...]
   [WINDOW name AS window_spec, ...]
```

**Description**

Produces a new table with the listed columns, similar to the outermost
[`SELECT` clause](query-syntax-1.md#select-statement) in a table subquery in standard syntax. The
`SELECT` operator supports standard output modifiers like
`SELECT AS STRUCT` and `SELECT DISTINCT`.
The `SELECT` operator also supports [window functions](../googlesql-functions/window-function-calls.md),
including [named windows](../googlesql-functions/window-function-calls.md#use-a-named-window-in-a-window-frame-clause). Named windows are defined using the
`WINDOW` keyword and are only visible to the current pipe `SELECT` operator.
The `SELECT` operator doesn't support aggregations or anonymization.

In pipe syntax, the `SELECT` operator in a query is optional. The `SELECT`
operator can be used near the end of a query to specify the list of output
columns. The final query result contains the columns returned from the last pipe
operator. If the `SELECT` operator isn't used to select specific columns, the
output includes the full row, similar to what the
[`SELECT *` statement](query-syntax-1.md#select-) in standard syntax produces.

In pipe syntax, the `SELECT` clause doesn't perform aggregation. Use the
[`AGGREGATE` operator](#aggregate-pipe-operator) instead.

For cases where `SELECT` would be used in standard syntax to rearrange columns,
pipe syntax supports other operators:

- The [`EXTEND` operator](#extend-pipe-operator) adds columns.
- The [`SET` operator](#set-pipe-operator) updates the value of an existing column.
- The [`DROP` operator](#drop-pipe-operator) removes columns.
- The [`RENAME` operator](#rename-pipe-operator) renames columns.

**Examples**

```sql
FROM (SELECT 'apples' AS item, 2 AS sales)
|> SELECT item AS fruit_name;

/*------------+
 | fruit_name |
 +------------+
 | apples     |
 +------------*/
```

```sql
-- Window function with a named window
FROM Produce
|> SELECT item, sales, category, SUM(sales) OVER item_window AS category_total
   WINDOW item_window AS (PARTITION BY category);

/*---------+-------+-----------+----------------+
 | item    | sales | category  | category_total |
 +---------+-------+-----------+----------------+
 | apples  | 2     | fruit     | 14             |
 | apples  | 7     | fruit     | 14             |
 | bananas | 5     | fruit     | 14             |
 | carrots | 8     | vegetable | 8              |
 +---------+-------+-----------+----------------*/
```

#### `EXTEND` pipe operator

```sql
|> EXTEND expression [[AS] alias] [, ...]
   [WINDOW name AS window_spec, ...]
```

**Description**

Propagates the existing table and adds computed columns, similar to
[`SELECT *, new_column`](query-syntax-1.md#select-) in standard syntax. The `EXTEND` operator supports
[window functions](../googlesql-functions/window-function-calls.md)
, including [named windows](../googlesql-functions/window-function-calls.md#use-a-named-window-in-a-window-frame-clause). Named windows are defined using the
`WINDOW` keyword and are only visible to the current `EXTEND` operator.

**Examples**

```sql
(
  SELECT 'apples' AS item, 2 AS sales
  UNION ALL
  SELECT 'bananas' AS item, 8 AS sales
)
|> EXTEND item IN ('bananas', 'lemons') AS is_yellow;

/*---------+-------+------------+
 | item    | sales | is_yellow  |
 +---------+-------+------------+
 | apples  | 2     | FALSE      |
 | bananas | 8     | TRUE       |
 +---------+-------+------------*/
```

```sql
-- Window function, with `OVER`
(
  SELECT 'apples' AS item, 2 AS sales
  UNION ALL
  SELECT 'bananas' AS item, 5 AS sales
  UNION ALL
  SELECT 'carrots' AS item, 8 AS sales
)
|> EXTEND SUM(sales) OVER() AS total_sales;

/*---------+-------+-------------+
 | item    | sales | total_sales |
 +---------+-------+-------------+
 | apples  | 2     | 15          |
 | bananas | 5     | 15          |
 | carrots | 8     | 15          |
 +---------+-------+-------------*/
```

Adapted (not in the official docs): added the `sales` column to the `EXTEND` result.

```sql
-- Window function with a named window
FROM Produce
|> EXTEND SUM(sales) OVER item_window AS category_total
   WINDOW item_window AS (PARTITION BY category);

/*---------+-------+-----------+----------------+
 | item    | sales | category  | category_total |
 +---------+-------+-----------+----------------+
 | apples  | 2     | fruit     | 14             |
 | apples  | 7     | fruit     | 14             |
 | bananas | 5     | fruit     | 14             |
 | carrots | 8     | vegetable | 8              |
 +---------+-------+-----------+----------------*/
```

#### `SET` pipe operator

```sql
|> SET column = expression [, ...]
```

**Description**

Replaces the value of a column in the input table, similar to
[`SELECT * REPLACE (expression AS column)`](query-syntax-1.md#select--replace) in standard syntax.
Each referenced column must exist exactly once in the input table.

After a `SET` operation, the referenced top-level columns (like `x`) are
updated, but table aliases (like `t`) still refer to the original row values.
Therefore, `t.x` will still refer to the original value.

**Example**

```sql
(
  SELECT 1 AS x, 11 AS y
  UNION ALL
  SELECT 2 AS x, 22 AS y
)
|> SET x = x * x, y = 3;

/*---+---+
 | x | y |
 +---+---+
 | 1 | 3 |
 | 4 | 3 |
 +---+---*/
```

```sql
FROM (SELECT 2 AS x, 3 AS y) AS t
|> SET x = x * x, y = 8
|> SELECT t.x AS original_x, x, y;

/*------------+---+---+
 | original_x | x | y |
 +------------+---+---+
 | 2          | 4 | 8 |
 +------------+---+---*/
```

#### `DROP` pipe operator

```sql
|> DROP column [, ...]
```

**Description**

Removes listed columns from the input table, similar to
[`SELECT * EXCEPT (column)`](query-syntax-1.md#select--except) in standard syntax. Each
referenced column must exist at least once in the input table.

After a `DROP` operation, the referenced top-level columns (like `x`) are
removed, but table aliases (like `t`) still refer to the original row values.
Therefore, `t.x` will still refer to the original value.

**Example**

```sql
SELECT 'apples' AS item, 2 AS sales, 'fruit' AS category
|> DROP sales, category;

/*--------+
 | item   |
 +--------+
 | apples |
 +--------*/
```

```sql
FROM (SELECT 1 AS x, 2 AS y) AS t
|> DROP x
|> SELECT t.x AS original_x, y;

/*------------+---+
 | original_x | y |
 +------------+---+
 | 1          | 2 |
 +------------+---*/
```

#### `RENAME` pipe operator

```sql
|> RENAME old_column_name [AS] new_column_name [, ...]
```

**Description**

Renames specified columns. Each column to be renamed must exist exactly once in
the input table. The `RENAME` operator can't rename value table fields,
pseudo-columns, range variables, or objects that aren't columns in the input
table.

After a `RENAME` operation, the referenced top-level columns (like `x`) are
renamed, but table aliases (like `t`) still refer to the original row
values. Therefore, `t.x` will still refer to the original value.

**Example**

```sql
SELECT 1 AS x, 2 AS y, 3 AS z
|> AS t
|> RENAME y AS renamed_y
|> SELECT *, t.y AS t_y;

/*---+-----------+---+-----+
 | x | renamed_y | z | t_y |
 +---+-----------+---+-----+
 | 1 | 2         | 3 | 2   |
 +---+-----------+---+-----*/
```

#### `AS` pipe operator

```sql
|> AS alias
```

**Description**

Introduces a table alias for the input table, similar to applying the
[`AS alias` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#using_aliases) on a table subquery in standard syntax. Any
existing table aliases are removed and the new alias becomes the table alias for
all columns in the row.

The `AS` operator can be useful after operators like
[`SELECT`](#select-pipe-operator), [`EXTEND`](#extend-pipe-operator), or
[`AGGREGATE`](#aggregate-pipe-operator) that add columns but can't give table
aliases to them. You can use the table alias
to disambiguate columns after the `JOIN` operator.

**Example**

```sql
(
  SELECT "000123" AS id, "apples" AS item, 2 AS sales
  UNION ALL
  SELECT "000456" AS id, "bananas" AS item, 5 AS sales
) AS sales_table
|> AGGREGATE SUM(sales) AS total_sales GROUP BY id, item
-- AGGREGATE creates an output table, so the sales_table alias is now out of
-- scope. Add a t1 alias so the join can refer to its id column.
|> AS t1
|> JOIN (SELECT 456 AS id, "yellow" AS color) AS t2
   ON CAST(t1.id AS INT64) = t2.id
|> SELECT t2.id, total_sales, color;

/*-----+-------------+--------+
 | id  | total_sales | color  |
 +-----+-------------+--------+
 | 456 | 5           | yellow |
 +-----+-------------+--------*/
```

#### `WHERE` pipe operator

```sql
|> WHERE boolean_expression
```

**Description**

Filters the results of the input table. The `WHERE` operator behaves the same
as the [`WHERE` clause](query-syntax-2.md#where-clause) in standard syntax.

In pipe syntax, the `WHERE` operator also replaces the
[`HAVING` clause](query-syntax-2.md#having-clause) and [`QUALIFY` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#qualify_clause) in
standard syntax. For example, after performing aggregation with the
[`AGGREGATE` operator](#aggregate-pipe-operator), use the `WHERE` operator
instead of the `HAVING` clause. For [window functions](../googlesql-functions/window-function-calls.md) inside
a `QUALIFY` clause, use window functions inside a `WHERE` clause instead.

**Example**

```sql
(
  SELECT 'apples' AS item, 2 AS sales
  UNION ALL
  SELECT 'bananas' AS item, 5 AS sales
  UNION ALL
  SELECT 'carrots' AS item, 8 AS sales
)
|> WHERE sales >= 3;

/*---------+-------+
 | item    | sales |
 +---------+-------+
 | bananas | 5     |
 | carrots | 8     |
 +---------+-------*/
```

#### `AGGREGATE` pipe operator

```sql
-- Full-table aggregation
|> AGGREGATE aggregate_expression [[AS] alias] [, ...]
```

```sql
-- Aggregation with grouping
|> AGGREGATE [aggregate_expression [[AS] alias] [, ...]]
   GROUP BY group_by_specification

group_by_specification:
  {
    groupable_item [[AS] alias] [, ...]
    | grouping_sets_specification
    | rollup_specification
    | cube_specification
    | ()
  }
```

```sql
-- Aggregation with grouping and shorthand ordering syntax
|> AGGREGATE [aggregate_expression [[AS] alias] [order_suffix] [, ...]]
   GROUP [AND ORDER] BY groupable_item [[AS] alias] [order_suffix] [, ...]

order_suffix: {ASC | DESC} [{NULLS FIRST | NULLS LAST}]
```

**Description**

Performs aggregation on data across grouped rows or an entire table. The
`AGGREGATE` operator is similar to a query in standard syntax that contains a
[`GROUP BY` clause](query-syntax-2.md#group-by-clause) or a `SELECT` list with
[aggregate functions](../googlesql-functions/aggregate_functions.md) or both. In pipe syntax, the
`GROUP BY` clause is part of the `AGGREGATE` operator. Pipe syntax
doesn't support a standalone `GROUP BY` operator.

Without the `GROUP BY` clause, the `AGGREGATE` operator performs full-table
aggregation and produces one output row.

With the `GROUP BY` clause, the `AGGREGATE` operator performs aggregation with
grouping, producing one row for each set of distinct values for the grouping
expressions.

The `AGGREGATE` expression list corresponds to the aggregated expressions in a
`SELECT` list in standard syntax. Each expression in the `AGGREGATE` list must
include an aggregate function. Aggregate expressions can also include scalar
expressions (for example, `sqrt(SUM(x*x))`). Column aliases can be assigned
using the [`AS` operator](#as-pipe-operator). Window
functions aren't allowed, but the [`EXTEND` operator](#extend-pipe-operator) can
be used before the `AGGREGATE` operator to compute window functions.

**Grouping**

The `GROUP BY` clause in the `AGGREGATE` operator corresponds to the
[`GROUP BY` clause](query-syntax-2.md#group-by-clause) in standard syntax, with the following
differences:

- Unlike in standard syntax, you can't use a column ordinal (such as `GROUP BY 1, 2`), an alias from the `AGGREGATE` expression list, or `GROUP BY ALL`. Each `groupable_item` must be a [groupable](data-types.md#data-type-properties) expression evaluated on the input table.
- Unlike in standard syntax, you can assign a column alias (`[AS] alias`) to a standalone `groupable_item` in the `GROUP BY` clause.
- Standard grouping specifications such as [`GROUPING SETS`](query-syntax-2.md#group-rows-by-grouping-sets), [`ROLLUP`](query-syntax-2.md#group-rows-by-rollup), [`CUBE`](query-syntax-2.md#group-rows-by-cube), and `()` are supported, with the following rules:
  - `()` can't be combined with other grouping items.
  - Column aliases (`[AS] alias`) can't be applied to `GROUPING SETS`, `ROLLUP`, `CUBE`, or `()` clauses, or to expressions inside them.
  - Every `groupable_item` inside `GROUPING SETS`, `ROLLUP`, or `CUBE` must have an [implicit alias](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#implicit_aliases) (such as a column name or field path), which becomes its output column name. Anonymous expressions (such as `x + 1` or `MOD(x, 3)`) aren't allowed inside these clauses.
  - When the `GROUP BY` clause contains `GROUPING SETS`, `ROLLUP`, or `CUBE`, standalone `groupable_item` expressions outside them must also have an alias (implicit or explicit). For example, `GROUP BY ROLLUP(item), sales + 1` produces an error, but `GROUP BY ROLLUP(item), sales + 1 AS s` is supported.
  - To group by a computed expression in `GROUPING SETS`, `ROLLUP`, or `CUBE`, use the [`EXTEND` operator](#extend-pipe-operator) before the `AGGREGATE` operator to compute the expression and assign an alias, and then reference that column by name. To rename an existing column when grouping with these clauses, use the [`RENAME` operator](#rename-pipe-operator) before or after the `AGGREGATE` operator.
  - Duplicate grouping expressions in `GROUPING SETS`, `ROLLUP`, or `CUBE` are deduplicated in the output table, so each unique grouping column appears once in the output column list, in order of first appearance.

The output columns from the `AGGREGATE` operator include all grouping columns
first, followed by all aggregate columns, using their assigned or implicit
aliases as the column names.

Unlike in standard syntax, grouping expressions aren't repeated across `SELECT`
and `GROUP BY` clauses. In pipe syntax, the grouping expressions are listed
once, in the `GROUP BY` clause, and are automatically included as output columns
for the `AGGREGATE` operator.

Because output columns are fully specified by the `AGGREGATE` operator, the
`SELECT` operator isn't needed after the `AGGREGATE` operator unless
you want to produce a list of columns different from the default.

**Standard syntax**

```sql
-- Aggregation in standard syntax
SELECT SUM(col1) AS total, col2, col3, col4...
FROM table1
GROUP BY col2, col3, col4...
```

**Pipe syntax**

```sql
-- The same aggregation in pipe syntax
FROM table1
|> AGGREGATE SUM(col1) AS total
   GROUP BY col2, col3, col4...
```

**Examples**

```sql
-- Full-table aggregation
(
  SELECT 'apples' AS item, 2 AS sales
  UNION ALL
  SELECT 'bananas' AS item, 5 AS sales
  UNION ALL
  SELECT 'apples' AS item, 7 AS sales
)
|> AGGREGATE COUNT(*) AS num_items, SUM(sales) AS total_sales;

/*-----------+-------------+
 | num_items | total_sales |
 +-----------+-------------+
 | 3         | 14          |
 +-----------+-------------*/
```

```sql
-- Aggregation with grouping
(
  SELECT 'apples' AS item, 2 AS sales
  UNION ALL
  SELECT 'bananas' AS item, 5 AS sales
  UNION ALL
  SELECT 'apples' AS item, 7 AS sales
)
|> AGGREGATE COUNT(*) AS num_items, SUM(sales) AS total_sales
   GROUP BY item;

/*---------+-----------+-------------+
 | item    | num_items | total_sales |
 +---------+-----------+-------------+
 | apples  | 2         | 9           |
 | bananas | 1         | 5           |
 +---------+-----------+-------------*/
```

```sql
-- Aggregation with ROLLUP on a column computed with EXTEND
(
  SELECT 'apples' AS item, 2 AS sales
  UNION ALL
  SELECT 'bananas' AS item, 5 AS sales
  UNION ALL
  SELECT 'apples' AS item, 7 AS sales
)
|> EXTEND UPPER(item) AS bucket
|> AGGREGATE COUNT(*) AS num_items, SUM(sales) AS total_sales
   GROUP BY ROLLUP(bucket)
|> ORDER BY bucket;

/*---------+-----------+-------------+
 | bucket  | num_items | total_sales |
 +---------+-----------+-------------+
 | NULL    | 3         | 14          |
 | APPLES  | 2         | 9           |
 | BANANAS | 1         | 5           |
 +---------+-----------+-------------*/
```

##### Shorthand ordering syntax with `AGGREGATE`

The `AGGREGATE` operator supports a shorthand ordering syntax, which is
equivalent to applying the [`ORDER BY` operator](#order-by-pipe-operator) as part
of the `AGGREGATE` operator without repeating the column list:

```sql
-- Aggregation with grouping and shorthand ordering syntax
|> AGGREGATE [aggregate_expression [[AS] alias] [order_suffix] [, ...]]
   GROUP [AND ORDER] BY groupable_item [[AS] alias] [order_suffix] [, ...]

order_suffix: {ASC | DESC} [{NULLS FIRST | NULLS LAST}]
```

The `GROUP AND ORDER BY` clause is equivalent to an `ORDER BY` clause on all
`groupable_item`s. By default, each `groupable_item` is sorted in ascending
order with `NULL` values first. Other ordering suffixes like `DESC`
or `NULLS LAST` can be used for other orders.

Without the `GROUP AND ORDER BY` clause, the `ASC` or `DESC` suffixes can be
added on individual columns in the `GROUP BY` list or `AGGREGATE` list or both.
The `NULLS FIRST` and `NULLS LAST` suffixes can be used to further modify `NULL`
sorting.

Adding these suffixes is equivalent to adding an `ORDER BY` clause that includes
all of the suffixed columns with the suffixed grouping columns first, matching
the left-to-right output column order.

The `GROUP AND ORDER BY` clause and ordering suffixes on `GROUP BY` items are
supported only on standalone `groupable_item` expressions, and can't be used
with `GROUPING SETS`, `ROLLUP`, `CUBE`, or `()`.
To sort by grouping columns from these specifications, use a separate
[`ORDER BY` operator](#order-by-pipe-operator) after the `AGGREGATE` operator.

**Examples**

Consider the following table called `Produce`:

```sql
/*---------+-------+-----------+
 | item    | sales | category  |
 +---------+-------+-----------+
 | apples  | 2     | fruit     |
 | carrots | 8     | vegetable |
 | apples  | 7     | fruit     |
 | bananas | 5     | fruit     |
 +---------+-------+-----------*/
```

The following two equivalent examples show you how to order by all grouping
columns using the `GROUP AND ORDER BY` clause or a separate `ORDER BY` clause:

```sql
-- Order by all grouping columns using GROUP AND ORDER BY.
FROM Produce
|> AGGREGATE SUM(sales) AS total_sales
   GROUP AND ORDER BY category, item DESC;

/*-----------+---------+-------------+
 | category  | item    | total_sales |
 +-----------+---------+-------------+
 | fruit     | bananas | 5           |
 | fruit     | apples  | 9           |
 | vegetable | carrots | 8           |
 +-----------+---------+-------------*/
```

```sql
--Order by columns using ORDER BY after performing aggregation.
FROM Produce
|> AGGREGATE SUM(sales) AS total_sales
   GROUP BY category, item
|> ORDER BY category, item DESC;
```

You can add an ordering suffix to a column in the `AGGREGATE` list. Although the
`AGGREGATE` list appears before the `GROUP BY` list in the query, ordering
suffixes on columns in the `GROUP BY` list are applied first.

```sql
FROM Produce
|> AGGREGATE SUM(sales) AS total_sales ASC
   GROUP BY item, category DESC;

/*---------+-----------+-------------+
 | item    | category  | total_sales |
 +---------+-----------+-------------+
 | carrots | vegetable | 8           |
 | bananas | fruit     | 5           |
 | apples  | fruit     | 9           |
 +---------+-----------+-------------*/
```

The previous query is equivalent to the following:

```sql
-- Order by specified grouping and aggregate columns.
FROM Produce
|> AGGREGATE SUM(sales) AS total_sales
   GROUP BY item, category
|> ORDER BY category DESC, total_sales;
```

#### `DISTINCT` pipe operator

```sql
|> DISTINCT
```

**Description**

Returns distinct rows from the input table, while preserving table aliases.

Using the `DISTINCT` operator after a `SELECT` or `UNION ALL` clause is similar
to using a [`SELECT DISTINCT` clause](query-syntax-1.md#select-distinct) or
[`UNION DISTINCT` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#union) in standard syntax, but the `DISTINCT`
pipe operator can be applied anywhere. The `DISTINCT` operator computes distinct
rows based on the values of all visible columns. Pseudo-columns are ignored
while computing distinct rows and are dropped from the output.

The `DISTINCT` operator is similar to using a `|> SELECT DISTINCT *` clause, but
doesn't expand value table fields, and preserves table aliases from the input.

**Examples**

```sql
(
  SELECT 'apples' AS item, 2 AS sales
  UNION ALL
  SELECT 'bananas' AS item, 5 AS sales
  UNION ALL
  SELECT 'bananas' AS item, 5 AS sales
  UNION ALL
  SELECT 'carrots' AS item, 8 AS sales
)
|> DISTINCT
|> WHERE sales >= 3;

/*---------+-------+
 | item    | sales |
 +---------+-------+
 | bananas | 5     |
 | carrots | 8     |
 +---------+-------*/
```

In the following example, the table alias `Produce` can be used in
expressions after the `DISTINCT` pipe operator.

```sql
(
  SELECT 'apples' AS item, 2 AS sales
  UNION ALL
  SELECT 'bananas' AS item, 5 AS sales
  UNION ALL
  SELECT 'bananas' AS item, 5 AS sales
  UNION ALL
  SELECT 'carrots' AS item, 8 AS sales
)
|> AS Produce
|> DISTINCT
|> SELECT Produce.item;

/*---------+
 | item    |
 +---------+
 | apples  |
 | bananas |
 | carrots |
 +---------*/
```

By contrast, the table alias isn't visible after a `|> SELECT DISTINCT *`
clause.

```sql
-- Error, unrecognized name: Produce
(
  SELECT 'apples' AS item, 2 AS sales
  UNION ALL
  SELECT 'bananas' AS item, 5 AS sales
  UNION ALL
  SELECT 'bananas' AS item, 5 AS sales
  UNION ALL
  SELECT 'carrots' AS item, 8 AS sales
)
|> AS Produce
|> SELECT DISTINCT *
|> SELECT Produce.item;
```

In the following examples, the `DISTINCT` operator doesn't expand value table
fields and retains the `STRUCT` type in the result. By contrast, the
`|> SELECT DISTINCT *` clause expands the `STRUCT` type into two columns.

```sql
SELECT AS STRUCT 1 x, 2 y
|> DISTINCT;

/*---------+
 | $struct |
 +---------+
  {
    x: 1,
    y: 2
  }
 +----------*/
```

```sql
SELECT AS STRUCT 1 x, 2 y
|> SELECT DISTINCT *;

/*---+---+
 | x | y |
 +---+---+
 | 1 | 2 |
 +---+---*/
```

The following examples show equivalent ways to generate the same results with
distinct values from columns `a`, `b`, and `c`.

```sql
FROM table
|> SELECT DISTINCT a, b, c;

FROM table
|> SELECT a, b, c
|> DISTINCT;

FROM table
|> AGGREGATE
   GROUP BY a, b, c;
```

#### `JOIN` pipe operator

```sql
|> [join_type] JOIN from_item [[AS] alias] [{on_clause | using_clause}]
```

**Description**

Joins rows from the input table with rows from a second table provided as an
argument. The `JOIN` operator behaves the same as the
[`JOIN` operation](query-syntax-2.md#join-operation) in standard syntax. The input table is the
left side of the join and the `JOIN` argument is the right side of the join.
Standard join inputs are supported, including tables, subqueries, `UNNEST`
operations, and table-valued function (TVF) calls. Standard join modifiers like
`LEFT`, `INNER`, and `CROSS` are allowed before the `JOIN` keyword.

An alias can be assigned to the input table on the right side of the join, but
not to the input table on the left side of the join. If an alias on the
input table is needed, perhaps to disambiguate columns in an
[`ON` expression](query-syntax-2.md#on-clause), then an alias can be added using the
[`AS` operator](#as-pipe-operator) before the `JOIN` arguments.

**Example**

```sql
(
  SELECT 'apples' AS item, 2 AS sales
  UNION ALL
  SELECT 'bananas' AS item, 5 AS sales
)
|> AS produce_sales
|> LEFT JOIN
     (
       SELECT "apples" AS item, 123 AS id
     ) AS produce_data
   ON produce_sales.item = produce_data.item
|> SELECT produce_sales.item, sales, id;

/*---------+-------+------+
 | item    | sales | id   |
 +---------+-------+------+
 | apples  | 2     | 123  |
 | bananas | 5     | NULL |
 +---------+-------+------*/
```

#### `CALL` pipe operator

```sql
|> CALL table_function (argument [, ...]) [[AS] alias]
```

**Description**

Calls a [table-valued function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/table-functions#tvfs) (TVF) that accepts at least one table as
an argument, similar to
[table function calls](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#table_function_calls) in standard syntax.

TVFs in standard syntax can be called in the `FROM` clause or in a `JOIN`
operation. These are both allowed in pipe syntax as well.

In pipe syntax, TVFs that take a table argument can also be called with the
`CALL` operator. **By default, the pipe input table is passed as the first table
argument** and omitted from the argument list.

If `[AS] alias` is present, this adds a table alias for the TVF output table.

Multiple TVFs can be called by writing consecutive `|> CALL` operators.

**Examples**

Suppose you have TVFs defined as follows:

- `tvf1(inputTable1, arg1 STRING)`
- `tvf2(arg2 STRING, arg3 STRING, inputTable2)`

The following examples compare calling TVFs on an input table by using standard
syntax and by using the `CALL` pipe operator:

```sql
-- Standard syntax: Chained TVF calls are nested in the FROM clause.
SELECT *
FROM
  tvf2(arg2, arg3, TABLE tvf1(TABLE input_table, arg1));
```

```sql
-- Pipe syntax: Chained TVF calls are written sequentially with `|> CALL`.
-- The pipe input table is implicitly passed as the first table argument.
FROM input_table
|> CALL tvf1(arg1)
|> CALL tvf2(arg2, arg3);
```

#### `ORDER BY` pipe operator

```sql
|> ORDER BY expression [sort_options] [, ...]
```

**Description**

Sorts results by a list of expressions. The `ORDER BY` operator behaves the same
as the [`ORDER BY` clause](query-syntax-2.md#order-by-clause) in standard syntax. Suffixes like
`DESC` and `NULLS LAST` are supported for
customizing the ordering for each expression.

In pipe syntax, the [`AGGREGATE` operator](#aggregate-pipe-operator) also
supports [shorthand ordering suffixes](#shorthand-ordering-syntax-with-aggregate) to
apply `ORDER BY` behavior more concisely as part of aggregation.

**Example**

```sql
(
  SELECT 1 AS x
  UNION ALL
  SELECT 3 AS x
  UNION ALL
  SELECT 2 AS x
)
|> ORDER BY x DESC;

/*---+
 | x |
 +---+
 | 3 |
 | 2 |
 | 1 |
 +---*/
```

#### `LIMIT` pipe operator

```sql
|> LIMIT count [OFFSET skip_rows]
```

**Description**

Limits the number of rows to return in a query, with an
optional `OFFSET` clause to skip over rows. The `LIMIT` operator
behaves the same as the [`LIMIT` and `OFFSET`
clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#limit_and_offset_clause) in standard syntax.

**Examples**

```sql
(
  SELECT 'apples' AS item, 2 AS sales
  UNION ALL
  SELECT 'bananas' AS item, 5 AS sales
  UNION ALL
  SELECT 'carrots' AS item, 8 AS sales
)
|> ORDER BY item
|> LIMIT 1;

/*---------+-------+
 | item    | sales |
 +---------+-------+
 | apples  | 2     |
 +---------+-------*/
```

```sql
(
  SELECT 'apples' AS item, 2 AS sales
  UNION ALL
  SELECT 'bananas' AS item, 5 AS sales
  UNION ALL
  SELECT 'carrots' AS item, 8 AS sales
)
|> ORDER BY item
|> LIMIT 1 OFFSET 2;

/*---------+-------+
 | item    | sales |
 +---------+-------+
 | carrots | 8     |
 +---------+-------*/
```

#### `UNION` pipe operator

```sql
query
|> UNION {ALL | DISTINCT} (query) [, (query), ...]
```

**Description**

Returns the combined results of the input queries to the left and right of the
pipe operator. Columns are matched and rows are concatenated vertically.

The `UNION` pipe operator behaves the same as the
[`UNION` set operator](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#union) in standard syntax. However, in pipe
syntax, the `UNION` pipe operator can include multiple comma-separated queries
without repeating the `UNION` syntax. Queries following the operator
are enclosed in parentheses.

For example, compare the following equivalent queries:

```sql
-- Standard syntax
SELECT * FROM ...
UNION ALL
SELECT 1
UNION ALL
SELECT 2;

-- Pipe syntax
SELECT * FROM ...
|> UNION ALL
    (SELECT 1),
    (SELECT 2);
```

The `UNION` pipe operator supports the same modifiers as the
`UNION` set operator in standard syntax, such as the
`BY NAME` modifier (or `CORRESPONDING`) and `LEFT | FULL [OUTER]` mode prefixes.

**Examples**

```sql
SELECT * FROM UNNEST(ARRAY<INT64>[1, 2, 3]) AS number
|> UNION ALL (SELECT 1);

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
|> UNION DISTINCT (SELECT 1);

/*--------+
 | number |
 +--------+
 | 1      |
 | 2      |
 | 3      |
 +--------*/
```

The following example shows multiple input queries to the right of the pipe
operator:

```sql
SELECT * FROM UNNEST(ARRAY<INT64>[1, 2, 3]) AS number
|> UNION DISTINCT
    (SELECT 1),
    (SELECT 2);

/*--------+
 | number |
 +--------+
 | 1      |
 | 2      |
 | 3      |
 +--------*/
```

The following example uses the `BY NAME`
modifier to match results by column name instead of in the
order that the columns are given in the input queries.

```sql
SELECT 1 AS one_digit, 10 AS two_digit
|> UNION ALL BY NAME
    (SELECT 20 AS two_digit, 2 AS one_digit);

/*-----------+-----------+
 | one_digit | two_digit |
 +-----------+-----------+
 | 1         | 10        |
 | 2         | 20        |
 +-----------+-----------*/
```

Without the `BY NAME` modifier,
the results are matched by column position in the input query and the column
names are ignored.

```sql
SELECT 1 AS one_digit, 10 AS two_digit
|> UNION ALL
    (SELECT 20 AS two_digit, 2 AS one_digit);

-- Results follow column order from queries and ignore column names.
/*-----------+-----------+
 | one_digit | two_digit |
 +-----------+-----------+
 | 1         | 10        |
 | 20        | 2         |
 +-----------+-----------*/
```

#### `INTERSECT` pipe operator

```sql
query
|> INTERSECT DISTINCT (query) [, (query), ...]
```

**Description**

Returns rows that are found in the results of both the input query to the left
of the pipe operator and all input queries to the right of the pipe
operator.

The `INTERSECT` pipe operator behaves the same as the
[`INTERSECT` set operator](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#intersect) in standard syntax. However, in
pipe syntax, the `INTERSECT` pipe operator can include multiple
comma-separated queries without repeating the `INTERSECT` syntax. Queries
following the operator are enclosed in parentheses.

For example, compare the following equivalent queries:

```sql
-- Standard syntax
SELECT * FROM ...
INTERSECT DISTINCT
SELECT 1
INTERSECT DISTINCT
SELECT 2;

-- Pipe syntax
SELECT * FROM ...
|> INTERSECT DISTINCT
    (SELECT 1),
    (SELECT 2);
```

The `INTERSECT` pipe operator supports the same modifiers as the
`INTERSECT` set operator in standard syntax, such as the
`BY NAME` modifier (or `CORRESPONDING`)
and `LEFT | FULL [OUTER]` mode prefixes.

**Examples**

```sql
SELECT * FROM UNNEST(ARRAY<INT64>[1, 2, 3, 3, 4]) AS number
|> INTERSECT DISTINCT
    (SELECT * FROM UNNEST(ARRAY<INT64>[2, 3, 3, 5]) AS number);

/*--------+
 | number |
 +--------+
 | 2      |
 | 3      |
 +--------*/
```

The following example shows multiple input queries to the right of the pipe
operator:

```sql
SELECT * FROM UNNEST(ARRAY<INT64>[1, 2, 3, 3, 4]) AS number
|> INTERSECT DISTINCT
    (SELECT * FROM UNNEST(ARRAY<INT64>[2, 3, 3, 5]) AS number),
    (SELECT * FROM UNNEST(ARRAY<INT64>[3, 3, 4, 5]) AS number);

/*--------+
 | number |
 +--------+
 | 3      |
 +--------*/
```

The following example uses the `BY NAME`
modifier to return the intersecting row from the columns despite the differing
column order in the input queries.

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
|> INTERSECT DISTINCT BY NAME
    (SELECT 10 AS two_digit, 1 AS one_digit);

/*-----------+-----------+
 | one_digit | two_digit |
 +-----------+-----------+
 | 1         | 10        |
 +-----------+-----------*/
```

Without the `BY NAME` modifier, the same
columns in differing order are considered different columns, so the query
doesn't detect any intersecting row values.

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
|> INTERSECT DISTINCT
    (SELECT 10 AS two_digit, 1 AS one_digit);

-- No intersecting values detected because columns aren't recognized as the same.
/*-----------+-----------+

 +-----------+-----------*/
```

#### `EXCEPT` pipe operator

```sql
query
|> EXCEPT DISTINCT (query) [, (query), ...]
```

**Description**

Returns rows from the input query to the left of the pipe operator that aren't
present in any input queries to the right of the pipe operator.

The `EXCEPT` pipe operator behaves the same as the
[`EXCEPT` set operator](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#except) in standard syntax. However, in pipe
syntax, the `EXCEPT` pipe operator can include multiple comma-separated
queries without repeating the `EXCEPT` syntax. Queries following the
operator are enclosed in parentheses.

For example, compare the following equivalent queries:

```sql
-- Standard syntax
SELECT * FROM ...
EXCEPT DISTINCT
SELECT 1
EXCEPT DISTINCT
SELECT 2;

-- Pipe syntax
SELECT * FROM ...
|> EXCEPT DISTINCT
    (SELECT 1),
    (SELECT 2);
```

Parentheses can be used to group set operations and control order of operations.
In `EXCEPT` set operations, query results can vary depending on the operation
grouping.

```sql
-- Default operation grouping
(
  SELECT * FROM ...
  EXCEPT DISTINCT
  SELECT 1
)
EXCEPT DISTINCT
SELECT 2;

-- Modified operation grouping
SELECT * FROM ...
EXCEPT DISTINCT
(
  SELECT 1
  EXCEPT DISTINCT
  SELECT 2
);

-- Same modified operation grouping in pipe syntax
SELECT * FROM ...
|> EXCEPT DISTINCT
(
  SELECT 1
  |> EXCEPT DISTINCT (SELECT 2)
);
```

The `EXCEPT` pipe operator supports the same modifiers as the
`EXCEPT` set operator in standard syntax, such as the
`BY NAME` modifier (or `CORRESPONDING`) and `LEFT | FULL [OUTER]` mode prefixes.

**Examples**

```sql
SELECT * FROM UNNEST(ARRAY<INT64>[1, 2, 3, 3, 4]) AS number
|> EXCEPT DISTINCT
    (SELECT * FROM UNNEST(ARRAY<INT64>[1, 2]) AS number);

/*--------+
 | number |
 +--------+
 | 3      |
 | 4      |
 +--------*/
```

The following example shows multiple input queries to the right of the pipe
operator:

```sql
SELECT * FROM UNNEST(ARRAY<INT64>[1, 2, 3, 3, 4]) AS number
|> EXCEPT DISTINCT
    (SELECT * FROM UNNEST(ARRAY<INT64>[1, 2]) AS number),
    (SELECT * FROM UNNEST(ARRAY<INT64>[1, 4]) AS number);

/*--------+
 | number |
 +--------+
 | 3      |
 +--------*/
```

The following example groups the set operations to modify the order of
operations. The first input query is used against the result of the last two
queries instead of the values of the last two queries individually.

```sql
SELECT * FROM UNNEST(ARRAY<INT64>[1, 2, 3, 3, 4]) AS number
|> EXCEPT DISTINCT
(
  SELECT * FROM UNNEST(ARRAY<INT64>[1, 2]) AS number
  |> EXCEPT DISTINCT
      (SELECT * FROM UNNEST(ARRAY<INT64>[1, 4]) AS number)
);

/*--------+
 | number |
 +--------+
 | 1      |
 | 3      |
 | 4      |
 +--------*/
```

The following example uses the `BY NAME`
modifier to return unique rows from the input query to the left of the pipe
operator despite the differing column order in the input queries.

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
|> EXCEPT DISTINCT BY NAME
    (SELECT 10 AS two_digit, 1 AS one_digit);

/*-----------+-----------+
 | one_digit | two_digit |
 +-----------+-----------+
 | 2         | 20        |
 | 3         | 30        |
 +-----------+-----------*/
```

Without the `BY NAME` modifier, the same columns in
differing order are considered different columns, so the query doesn't detect
any common rows that should be excluded.

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
|> EXCEPT DISTINCT
    (SELECT 10 AS two_digit, 1 AS one_digit);

-- No values excluded because columns aren't recognized as the same.
/*-----------+-----------+
 | one_digit | two_digit |
 +-----------+-----------+
 | 1         | 10        |
 | 2         | 20        |
 | 3         | 30        |
 +-----------+-----------*/
```

#### `TABLESAMPLE` pipe operator

> [!WARNING]
> **Preview**
>
>
> This product or feature is subject to the "Pre-GA Offerings Terms"
> in the General Service Terms section of the
> [Service Specific Terms](https://cloud.google.com/terms/service-terms).
> Pre-GA products and features are available "as is" and might have
> limited support. For more information, see the
> [launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

> [!NOTE]
> **Note:** To provide feedback or request support for this feature, send an email to [bigquery-sql-preview-support@google.com](mailto:bigquery-sql-preview-support@google.com).

```sql
|> TABLESAMPLE SYSTEM (percent PERCENT)
```

**Description**

Selects a random sample of rows from the input table. The `TABLESAMPLE` pipe
operator behaves the same as [`TABLESAMPLE` operator](query-syntax-1.md#tablesample-operator) in
standard syntax.

**Example**

The following example samples approximately 1% of data from a table called
`LargeTable`:

```sql
FROM LargeTable
|> TABLESAMPLE SYSTEM (1 PERCENT);
```

#### `WITH` pipe operator

```sql
|> WITH alias AS query, ...
```

**Description**

Defines one or more common table expressions (CTEs) that the rest of the query
can reference, similar to standard [`WITH` clauses](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#with_clause). Ignores the
pipe input table and passes it through as the input to the next pipe operation.

**Examples**

```sql
SELECT 1 AS key
|> WITH t AS (
    SELECT 1 AS key, 'my_value' AS value
  )
|> INNER JOIN t USING (key)

/*---------+---------+
 | key     | value   |
 +---------+---------+
 | 1       | my_value|
 +---------+---------*/
```

```sql
SELECT 1 AS key
-- Define multiple CTEs.
|> WITH t1 AS (
    SELECT 2
  ), t2 AS (
    SELECT 3
  )
|> UNION ALL (FROM t1), (FROM t2)

/*-----+
 | key |
 +-----+
 | 1   |
 | 2   |
 | 3   |
 +-----*/
```

The pipe `WITH` operator allows a trailing comma:

```sql
SELECT 1 AS key
|> WITH t1 AS (
     SELECT 2
   ), t2 AS (
     SELECT 3
   ),
|> UNION ALL (FROM t1), (FROM t2)

/*-----+
 | key |
 +-----+
 | 1   |
 | 2   |
 | 3   |
 +-----*/
```

#### `PIVOT` pipe operator

```sql
|> PIVOT (aggregate_expression [[AS] prefix]
   FOR input_column IN (value [[AS] pivot_column] [, ...])) [[AS] table_alias]
```

**Description**

Rotates rows into columns. The `PIVOT` pipe operator behaves the same as the
[`PIVOT` operator](query-syntax-1.md#pivot-operator) in standard syntax.

The output table has one pivot column for each value provided in the list.
Each pivot column has an explicit name if provided, or a string
representation of `value` if not. If `prefix` is specified, the prefix is
appended to the `pivot_column` name with an underscore in the format
`prefix_pivot_column`.

Specify `table_alias` to assign an alias to the result table produced by the
pivot operation.

**Examples**

```sql
(
  SELECT "kale" AS product, 51 AS sales, "Q1" AS quarter
  UNION ALL
  SELECT "kale" AS product, 4 AS sales, "Q1" AS quarter
  UNION ALL
  SELECT "kale" AS product, 45 AS sales, "Q2" AS quarter
  UNION ALL
  SELECT "apple" AS product, 8 AS sales, "Q1" AS quarter
  UNION ALL
  SELECT "apple" AS product, 10 AS sales, "Q2" AS quarter
)
|> PIVOT(SUM(sales) FOR quarter IN ('Q1', 'Q2'));

/*---------+----+------+
 | product | Q1 | Q2   |
 +---------+-----------+
 | kale    | 55 | 45   |
 | apple   | 8  | 10   |
 +---------+----+------*/
```

The following example includes `pivot_column` aliases (`first_quarter` and
`second_quarter`) for the rotated columns and a `table_alias` (`pivoted_sales`)
for the result table. The subsequent `SELECT` operator references the table
alias to select all columns:

```sql
(
  SELECT "kale" AS product, 51 AS sales, "Q1" AS quarter
  UNION ALL
  SELECT "kale" AS product, 4 AS sales, "Q1" AS quarter
  UNION ALL
  SELECT "kale" AS product, 45 AS sales, "Q2" AS quarter
  UNION ALL
  SELECT "apple" AS product, 8 AS sales, "Q1" AS quarter
  UNION ALL
  SELECT "apple" AS product, 10 AS sales, "Q2" AS quarter
)
|> PIVOT(SUM(sales) FOR quarter IN ('Q1' AS first_quarter, 'Q2' AS second_quarter)) AS pivoted_sales
|> SELECT pivoted_sales.*;

/*---------+---------------+----------------+
 | product | first_quarter | second_quarter |
 +---------+---------------+----------------+
 | kale    | 55            | 45             |
 | apple   | 8             | 10             |
 +---------+---------------+----------------*/
```

#### `UNPIVOT` pipe operator

```sql
|> UNPIVOT (values_column FOR name_column IN (column_to_unpivot [, ...])) [[AS] alias]
```

**Description**

Rotates columns into rows. The `UNPIVOT` pipe operator behaves the same as the
[`UNPIVOT` operator](query-syntax-1.md#unpivot-operator) in standard syntax.

**Example**

```sql
(
  SELECT 'kale' as product, 55 AS Q1, 45 AS Q2
  UNION ALL
  SELECT 'apple', 8, 10
)
|> UNPIVOT(sales FOR quarter IN (Q1, Q2));

/*---------+-------+---------+
 | product | sales | quarter |
 +---------+-------+---------+
 | kale    | 55    | Q1      |
 | kale    | 45    | Q2      |
 | apple   | 8     | Q1      |
 | apple   | 10    | Q2      |
 +---------+-------+---------*/
```

#### `MATCH_RECOGNIZE` pipe operator

```sql
|> MATCH_RECOGNIZE (
   [ PARTITION BY partition_expr [, ... ] ]
   ORDER BY order_expr [ { ASC | DESC } ] [ { NULLS FIRST | NULLS LAST } ] [, ...]
   MEASURES { measures_expr [AS] alias } [, ... ]
   [ AFTER MATCH SKIP { PAST LAST ROW | TO NEXT ROW } ]
   PATTERN (pattern)
   DEFINE symbol AS boolean_expr [, ... ]
   [ OPTIONS ( [ use_longest_match = { TRUE | FALSE } ] ) ]
)
```

**Description**

Filters and aggregates rows based on matches. A *match* is an ordered sequence
of rows that match a pattern that you specify.
Matching rows works similarly to matching with regular expressions, but
instead of matching characters in a string, the `MATCH_RECOGNIZE` operator finds
matches across rows in a table. The `MATCH_RECOGNIZE` pipe operator behaves the
same as the
[`MATCH_RECOGNIZE` clause](query-syntax-1.md#match_recognize-clause) in standard syntax.

**Example**

```sql
(
  SELECT 1 as x
  UNION ALL
  SELECT 2
  UNION ALL
  SELECT 3
)
|> MATCH_RECOGNIZE(
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

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/pipe-syntax (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the `EXTEND` named-window result omits the `sales` column. `EXTEND` keeps all input columns, and the equivalent `SELECT item, sales, category, ...` example on the same page lists `sales` with values 2, 7, 5 and 8. The `sales` column is added.

## Related

- [Index of this directory](./README.md)

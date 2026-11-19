---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/aggregate-function-calls
---

# Aggregate function calls

## Signature / Usage

An aggregate function summarizes the rows of a group into a single value.
When an aggregate function is used with
the `OVER` clause, it becomes a window function, which computes values over a
group of rows and then returns a single result for each row.

### Aggregate function call syntax

```sql
function_name(
  [ DISTINCT ]
  function_arguments
  [ { IGNORE | RESPECT } NULLS ]
  [ WHERE where_expression ]
  [ { HAVING { MAX | MIN } having_expression | GROUP BY grouping_expression [, ... ] [ HAVING having_expression ] } ]
  [ ORDER BY key [ { ASC | DESC } ] [, ... ] ]
  [ LIMIT n ]
)
[ OVER over_clause ]
```

**Description**

Each aggregate function supports all or a subset of the aggregate function call
syntax. To build an aggregate function, use the following syntax:

- `DISTINCT`: Aggregate each distinct value of an expression only once into the result.
- `function_arguments`: Specify the input values, columns, or expressions that the aggregate function evaluates and summarizes across the rows of a group.
- `IGNORE NULLS` or `RESPECT NULLS`: If `IGNORE NULLS` is
  specified, the `NULL` values are excluded from the result. If
  `RESPECT NULLS` is specified, both `NULL` and non-`NULL` values can be
  included in the result.

  If neither `IGNORE NULLS` nor `RESPECT NULLS` is specified, most functions
  default to `IGNORE NULLS` behavior but in a few cases `NULL` values are
  respected.
- `WHERE`: ([Preview](https://cloud.google.com/products#product-launch-stages)) Filters the aggregate function input using a boolean expression.

- `HAVING MAX` or `HAVING MIN`: Restricts the set of rows that the
  function aggregates by a maximum or minimum value.
  For details, see [HAVING MAX and HAVING MIN clause](#restrict-aggregation-by-a-maximum-or-minimum-value).

- `GROUP BY`: Performs an additional grouping on input rows to the aggregate
  function. Used to define [multi-level aggregates](#multi-level-aggregation).
  The `HAVING` clause in the `GROUP BY` clause filters the grouped output. The
  `HAVING` clause must be a scalar expression or an aggregate expression that
  doesn't use window functions.

- `ORDER BY`: Specifies the order of the values.

  - For each sort key, the default sort direction is `ASC`.

  - `NULL` is the minimum possible value, so `NULL`s appear first
    in `ASC` sorts and last in `DESC` sorts.

  - If you're using floating point data types, see
    [Floating point semantics](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#floating_point_semantics)
    on ordering and grouping.

  - The `ORDER BY` clause is supported only for aggregate functions that
    depend on the order of their input. For those functions, if the
    `ORDER BY` clause is omitted, the output is nondeterministic.

  - This `ORDER BY` clause can't be used if the `OVER` clause is used.

  - If `DISTINCT` is also specified, then
    the sort key must be the same as `expression`.

- `LIMIT`: Specifies the maximum number of `expression` inputs in the
  result.

  - If the input is an `ARRAY` value, the limit applies to the number of input
    arrays, not the number of elements in the arrays. An empty array counts
    as `1`. A `NULL` array isn't counted.

  - If the input is a `STRING` value, the limit applies to the number of input
    strings, not the number of characters or bytes in the inputs. An empty
    string counts as `1`. A `NULL` string isn't counted.

  - The limit `n` must be a constant `INT64`.

- `OVER`: If the aggregate function is also a window function, use this clause
  to define a window of rows around the row being evaluated. For each row,
  the aggregate function result is computed using the selected window of rows as
  input. If the `OVER` clause is used, aggregate function
  clauses, such as
  `DISTINCT`, aren't supported, but function call
  modifiers, such as `IGNORE_NULLS`,
  are still supported. To learn more about the `OVER` clause,
  see [Window function calls](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/window-function-calls).

**Details**

The clauses in an aggregate function call are applied in the following order:

- `OVER`
- `WHERE`
- `HAVING MAX`/`HAVING MIN` or `GROUP BY` with `HAVING`
- `IGNORE NULLS` or `RESPECT NULLS`
- `DISTINCT`
- `ORDER BY`
- `LIMIT`

When used in conjunction with a `GROUP BY` clause, the groups summarized
typically have at least one row. When the associated `SELECT` statement has
no `GROUP BY` clause or when certain aggregate function modifiers filter rows
from the group to be summarized, it's possible that the aggregate function
needs to summarize an empty group.

### Restrict aggregation by a maximum or minimum value

Some aggregate functions support two optional clauses that are called
`HAVING MAX` and `HAVING MIN`. These clauses restrict the set of rows that a
function aggregates to rows that have a maximum or minimum value in a particular
column. These clauses are also
different from the `GROUP BY ... HAVING ...` clauses, which aggregate
specifically grouped output.

#### HAVING MAX clause

```sql
HAVING MAX having_expression
```

`HAVING MAX` restricts the set of input rows that the function aggregates to
only those with the maximum `having_expression` value. The maximum value is
computed as the result of `MAX(having_expression)` across rows in the group.
Only rows whose `having_expression` value is equal to this maximum value (using
SQL equality semantics) are included in the aggregation. All other rows are
ignored in the aggregation.

This clause supports all [orderable data types](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#data_type_properties),
except for `ARRAY`.

**Examples**

In the following query, rows with the most inches of precipitation, `4`, are
added to a group, and then the `year` for one of these rows is produced.
Which row is produced is nondeterministic, not random.

```sql
WITH
  Precipitation AS (
    SELECT 2009 AS year, 'spring' AS season, 3 AS inches
    UNION ALL
    SELECT 2001, 'winter', 4
    UNION ALL
    SELECT 2003, 'fall', 1
    UNION ALL
    SELECT 2002, 'spring', 4
    UNION ALL
    SELECT 2005, 'summer', 1
  )
SELECT ANY_VALUE(year HAVING MAX inches) AS any_year_with_max_inches FROM Precipitation;

/*--------------------------+
 | any_year_with_max_inches |
 +--------------------------+
 | 2001                     |
 +--------------------------*/
```

#### HAVING MIN clause

```sql
HAVING MIN having_expression
```

`HAVING MIN` restricts the set of input rows that the function aggregates to
only those with the minimum `having_expression` value. The minimum value is
computed as the result of `MIN(having_expression)` across rows in the group.
Only rows whose `having_expression` value is equal to this minimum value (using
SQL equality semantics) are included in the aggregation. All other rows are
ignored in the aggregation.

This clause supports all [orderable data types](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#data_type_properties),
except for `ARRAY`.

**Examples**

In the following query, rows with the fewest inches of precipitation, `1`,
are added to a group, and then the `year` for one of these rows is produced.
Which row is produced is nondeterministic, not random.

```sql
WITH
  Precipitation AS (
    SELECT 2009 AS year, 'spring' AS season, 3 AS inches
    UNION ALL
    SELECT 2001, 'winter', 4
    UNION ALL
    SELECT 2003, 'fall', 1
    UNION ALL
    SELECT 2002, 'spring', 4
    UNION ALL
    SELECT 2005, 'summer', 1
  )
SELECT ANY_VALUE(year HAVING MIN inches) AS any_year_with_min_inches FROM Precipitation;

/*--------------------------+
 | any_year_with_min_inches |
 +--------------------------+
 | 2003                     |
 +--------------------------*/
```

### Handle `NULL` values before aggregation

Most aggregate functions, such as `AVG`, `SUM`, `MIN`, `MAX`, and
`COUNT(expression)`, ignore `NULL` values by default. In contrast, `COUNT(*)`
counts all input rows, including rows with `NULL` values.

For example, the following query aggregates a set of values that includes
`NULL`:

```sql
SELECT
  COUNT(*) AS row_count,
  COUNT(x) AS non_null_rows,
  AVG(x) AS avg_x
FROM UNNEST([1, 2, 3, 4, 5, NULL]) AS x;

/*------------+---------------+-------+
 | row_count | non_null_rows | avg_x |
 +------------+---------------+-------+
 | 6          | 5             | 3     |
 +------------+---------------+-------*/
```

You can also exclude or replace `NULL` values in one of the following ways:

- Add a `WHERE` clause inside the aggregate function call; for example, `COUNT(* WHERE x IS NOT NULL)`.
- Use the `IGNORE NULLS` clause for aggregate functions that include `NULL` values by default, such as `ARRAY_AGG(x IGNORE NULLS)`.
- Use [`COALESCE`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conditional_expressions#coalesce) to replace `NULL` values with a default value before aggregating, such as `AVG(COALESCE(x, 0))`.

For example, to filter out `NULL` values for an individual aggregate function
call without removing rows from the rest of the query, use a `WHERE` clause
inside the function call:

```sql
SELECT
  COUNT(*) AS total_rows,
  COUNT(* WHERE x IS NOT NULL) AS filtered_rows,
  AVG(x) AS avg_x
FROM UNNEST([1, 2, 3, 4, 5, NULL]) AS x;

/*------------+---------------+-------+
 | total_rows | filtered_rows | avg_x |
 +------------+---------------+-------+
 | 6          | 5             | 3     |
 +------------+---------------+-------*/
```

### Aggregate function examples

A simple aggregate function call for `COUNT`, `MIN`, and `MAX` looks like this:

```sql
SELECT
  COUNT(*) AS total_count,
  COUNT(fruit) AS non_null_count,
  MIN(fruit) AS min,
  MAX(fruit) AS max
FROM
  (
    SELECT NULL AS fruit
    UNION ALL
    SELECT 'apple' AS fruit
    UNION ALL
    SELECT 'pear' AS fruit
    UNION ALL
    SELECT 'orange' AS fruit
  )

/*-------------+----------------+-------+------+
 | total_count | non_null_count | min   | max  |
 +-------------+----------------+-------+------+
 | 4           | 3              | apple | pear |
 +-------------+----------------+-------+------*/
```

In the following example, the average of `x` over a specified window is returned
for each row. To learn more about windows and how to use them, see
[Window function calls](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/window-function-calls).

```sql
SELECT
  x,
  AVG(x) OVER (ORDER BY x ROWS BETWEEN 1 PRECEDING AND CURRENT ROW) AS avg
FROM UNNEST([0, 2, 4, 4, 5]) AS x;

/*------+------+
 | x    | avg  |
 +------+------+
 | 0    | 0    |
 | 2    | 1    |
 | 4    | 3    |
 | 4    | 4    |
 | 5    | 4.5  |
 +------+------*/
```

The following example uses a `WHERE` clause to filter the `AVG` aggregate input
for average inches of precipitation in wet seasons compared to dry seasons.

```sql
WITH
  Precipitation AS (
    SELECT 2001 AS year, 'spring' AS season, 9 AS inches
    UNION ALL
    SELECT 2001, 'winter', 1
    UNION ALL
    SELECT 2000, 'fall', 3
    UNION ALL
    SELECT 2000, 'summer', 5
    UNION ALL
    SELECT 2000, 'spring', 7
    UNION ALL
    SELECT 2000, 'winter', 2
  )
SELECT
  AVG(inches WHERE season IN ('spring', 'summer')) AS wet_seasons_avg,
  AVG(inches WHERE season IN ('fall', 'winter')) AS dry_seasons_avg
FROM Precipitation;

/*-----------------+------------------+
 | wet_seasons_avg | dry_seasons_avg  |
 +-----------------+------------------+
 | 7               | 2                |
 +-----------------+------------------*/
```

The following example uses the `GROUP BY` clause to group input rows to the
aggregate function ([multi-level aggregation](#multi-level-aggregation)) and
filters the grouped output using the additional `HAVING` clause. The query
averages inches of precipitation in wet seasons compared to dry seasons, and
totals the averages for expected precipitation

```sql
WITH
  Precipitation AS (
    SELECT 2001 AS year, 'spring' AS season, 9 AS inches
    UNION ALL
    SELECT 2001, 'winter', 1
    UNION ALL
    SELECT 2000, 'fall', 3
    UNION ALL
    SELECT 2000, 'summer', 5
    UNION ALL
    SELECT 2000, 'spring', 7
    UNION ALL
    SELECT 2000, 'winter', 2
  )
SELECT
  SUM(AVG(inches) GROUP BY season HAVING season IN ('spring', 'summer')) AS expected_rainy_season_inches,
  SUM(AVG(inches) GROUP BY season HAVING season IN ('fall', 'winter')) AS expected_dry_season_inches
FROM Precipitation;

/*------------------------------+-----------------------------+
 | expected_rainy_season_inches | expected_dry_season_inches  |
 +------------------------------+-----------------------------+
 | 13                           | 4.5                         |
 +------------------------------+-----------------------------*/
```

The following example extends the previous example by further defining wet
seasons as having averages of more than three inches of precipitation and dry
seasons as three inches or less.

```sql
WITH
  Precipitation AS (
    SELECT 2001 AS year, 'spring' AS season, 9 AS inches
    UNION ALL
    SELECT 2001, 'winter', 1
    UNION ALL
    SELECT 2000, 'fall', 3
    UNION ALL
    SELECT 2000, 'summer', 5
    UNION ALL
    SELECT 2000, 'spring', 7
    UNION ALL
    SELECT 2000, 'winter', 2
  )
SELECT
  SUM(AVG(inches) GROUP BY season HAVING AVG(inches) > 3) AS expected_rainy_season_inches,
  SUM(AVG(inches) GROUP BY season HAVING AVG(inches) <= 3) AS expected_dry_season_inches
FROM Precipitation;

-- Results remain the same in this case.
/*------------------------------+-----------------------------+
 | expected_rainy_season_inches | expected_dry_season_inches  |
 +------------------------------+-----------------------------+
 | 13                           | 4.5                         |
 +------------------------------+-----------------------------*/
```

### Multi-level aggregation

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
> **Note:** To provide feedback or request support for this feature, send an email to [bigquery-sql-preview-support@googlegroups.com](mailto:bigquery-sql-preview-support@googlegroups.com).

Standard SQL doesn't allow an aggregate function to have other aggregate
functions as arguments. As a result, expressing multi-stage aggregation
typically requires using a subquery.

For example, say you have a table of sales data and want to calculate the
average daily sales by averaging the sums of the rows. You can do this with a
subquery:

```sql
WITH Sales AS (
  SELECT 'Apples' AS Product, 100 AS revenue, TIMESTAMP '2026-01-01 10:00:00' AS time UNION ALL
  SELECT 'Apples', 150, TIMESTAMP '2026-01-01 12:00:00' UNION ALL
  SELECT 'Apples', 200, TIMESTAMP '2026-01-02 10:00:00' UNION ALL
  SELECT 'Oranges', 50, TIMESTAMP '2026-01-01 10:00:00' UNION ALL
  SELECT 'Oranges', 60, TIMESTAMP '2026-01-02 10:00:00' UNION ALL
  SELECT 'Oranges', 70, TIMESTAMP '2026-01-02 12:00:00'
)
SELECT
  Product,
  AVG(daily_sales) AS avg_daily_sales
FROM
  (
    SELECT
      Product,
      SUM(revenue) AS daily_sales
    FROM Sales
    GROUP BY Product, DATE(time)
  )
GROUP BY Product
ORDER BY Product;

/*---------+-----------------+
 | Product | avg_daily_sales |
 +---------+-----------------+
 | Apples  |             225 |
 | Oranges |              90 |
 +---------+-----------------*/
```

*Multi-level aggregate* syntax removes this restriction by allowing you to add
an aggregate function as an argument to another aggregate function, when the
outer aggregate function has its own `GROUP BY` clause. Using multi-level
aggregation, the previous query can be simplified to the following:

```sql
WITH Sales AS (
  SELECT 'Apples' AS Product, 100 AS revenue, TIMESTAMP '2026-01-01 10:00:00' AS time UNION ALL
  SELECT 'Apples', 150, TIMESTAMP '2026-01-01 12:00:00' UNION ALL
  SELECT 'Apples', 200, TIMESTAMP '2026-01-02 10:00:00' UNION ALL
  SELECT 'Oranges', 50, TIMESTAMP '2026-01-01 10:00:00' UNION ALL
  SELECT 'Oranges', 60, TIMESTAMP '2026-01-02 10:00:00' UNION ALL
  SELECT 'Oranges', 70, TIMESTAMP '2026-01-02 12:00:00'
)
SELECT
  Product,
  AVG(SUM(revenue) GROUP BY DATE(time)) AS avg_daily_sales
FROM Sales
GROUP BY Product
ORDER BY Product;

/*---------+-----------------+
 | Product | avg_daily_sales |
 +---------+-----------------+
 | Apples  |             225 |
 | Oranges |              90 |
 +---------+-----------------*/
```

When an aggregate function has a `GROUP BY` clause, it becomes a multi-level
aggregate function. Multi-level aggregate functions work by first grouping the
input rows based the `GROUP BY` modifier on the aggregate function, and then
evaluating the inner aggregate function arguments over those groups. The
intermediate inner aggregation results are then passed to the enclosing
aggregate function.

In the previous example, the `SUM(revenue)` aggregation is effectively grouped
by both `Product` and `DATE(time)` to calculate an intermediate aggregation
result. This intermediate result is then averaged while grouping by `Product` to
get the final result per product.

#### Multi-level aggregation rules and constraints

The following rules and constraints apply to multi-level aggregation:

- Multi-level aggregation is supported in only function arguments, the `DISTINCT` clause, and the `GROUP BY` modifier within the aggregate function call.
- You can't use the `HAVING MIN` or `HAVING MAX` clause in addition to a `GROUP BY` clause in a multi-level aggregation function.
- You also can't use the following clauses in a multi-aggregation function:

  - `ORDER BY`

  - `LIMIT`

  - `IGNORE NULLS` or `RESPECT NULLS`

- You can't use multi-level aggregate functions in the [`PIVOT`
  operator](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#pivot_operator).

- You can't use a `GROUPING` function within a multi-level aggregate body, or
  with `GROUP BY` modifiers. For example, the following expressions result in
  an error:

  ```sql
    SUM(GROUPING(...) GROUP BY Y)   -- Error
    GROUPING(... GROUP BY Y)        -- Error
  ```

- You can't use multi-level aggregation with the [differential privacy
  clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#dp_clause).

- You can't use multi-level aggregation with the [aggregation threshold
  clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#agg_threshold_clause).

- You can't use grouping keys with collation in a multi-level aggregation.

- You can't use multi-level aggregation with continuous queries.

- You can't use an empty aggregate function list in the inner aggregation of a
  multi-level aggregation (for example, `COUNT(* GROUP BY field1)`).

- You can't use more than two nested aggregate functions in a multi-level
  aggregation:

  ```sql
  SUM(AVG(MIN(X) GROUP BY Y) GROUP BY Z) -- Error; 3 nested aggregate functions.
  ```

#### Avoid overcounting with multi-level aggregation

Aggregating over the result of a `JOIN` operation can result in *overcounting*
of the aggregated result. Consider the following query which attempts to
calculate the average salary of employees with at least one dependent child:

```sql
WITH Employees AS (
  SELECT 1 AS empno, 150000 AS salary UNION ALL
  SELECT 2, 100000 UNION ALL
  SELECT 3, 80000
),
Dependents AS (
  SELECT 1 AS empno, 'Child' AS relationship UNION ALL
  SELECT 2, 'Child' UNION ALL
  SELECT 2, 'Child' UNION ALL
  SELECT 3, 'Child' UNION ALL
  SELECT 3, 'Child'
)
SELECT
  empno,
  salary,
  relationship
FROM Employees
INNER JOIN Dependents
  USING (empno)
WHERE relationship = 'Child'
ORDER BY empno;

/*-------+--------+--------------+
 | empno | salary | relationship |
 +-------+--------+--------------+
 | 1     | 150000 | Child        |
 | 2     | 100000 | Child        |
 | 2     | 100000 | Child        |
 | 3     |  80000 | Child        |
 | 3     |  80000 | Child        |
 +-------+--------+--------------*/
```

The issue is that the `INNER JOIN` operation results in a table where the salary
for a given employee appears more than once if they have more than
one child listed in the `Dependents` table. For example, employees 2 and 3 are
repeated for each dependent child. Taking the average (`AVG`) of salary on this
table *overcounts* those two salaries, leading to an incorrect result.

Overcounting like in the previous example can be avoided with multi-level
aggregation. The following revised version of the previous query uses
multi-level aggregation with an `ANY_VALUE` function to get the correct average
without overcounting:

```sql
WITH Employees AS (
  SELECT 1 AS empno, 150000 AS salary UNION ALL
  SELECT 2, 100000 UNION ALL
  SELECT 3, 80000
),
Dependents AS (
  SELECT 1 AS empno, 'Child' AS relationship UNION ALL
  SELECT 2, 'Child' UNION ALL
  SELECT 2, 'Child' UNION ALL
  SELECT 3, 'Child' UNION ALL
  SELECT 3, 'Child'
)
SELECT
  AVG(ANY_VALUE(salary) GROUP BY empno) AS avg_salary
FROM Employees
INNER JOIN Dependents
  USING (empno)
WHERE relationship = 'Child'

-- Results of the ANY_VALUE intermediate aggregate:
/*-------+-------------------+
 | empno | ANY_VALUE(salary) |
 +-------+-------------------+
 | 1     |            150000 |
 | 2     |            100000 |
 | 3     |             80000 |
 +-------+-------------------*/

-- Final result:
/*------------+
 | avg_salary |
 +------------+
 |     110000 |
 +------------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/aggregate-function-calls (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

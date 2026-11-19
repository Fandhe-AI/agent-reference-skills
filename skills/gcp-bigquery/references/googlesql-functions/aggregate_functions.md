---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions
---

# Aggregate functions

## Signature / Usage

GoogleSQL for BigQuery supports the following general aggregate functions.
To learn about the syntax for aggregate function calls, see
[Aggregate function calls](aggregate-function-calls.md).

### Function list

| Name | Summary |
|---|---|
| [`AGG`](#agg) | Aggregates a measure type. |
| [`ANY_VALUE`](#any_value) | Gets an expression for some row. |
| [`APPROX_COUNT_DISTINCT`](approximate_aggregate_functions.md#approx_count_distinct) | Gets the approximate result for `COUNT(DISTINCT expression)`. For more information, see [Approximate aggregate functions](approximate_aggregate_functions.md). |
| [`APPROX_QUANTILES`](approximate_aggregate_functions.md#approx_quantiles) | Gets the approximate quantile boundaries. For more information, see [Approximate aggregate functions](approximate_aggregate_functions.md). |
| [`APPROX_TOP_COUNT`](approximate_aggregate_functions.md#approx_top_count) | Gets the approximate top elements and their approximate count. For more information, see [Approximate aggregate functions](approximate_aggregate_functions.md). |
| [`APPROX_TOP_SUM`](approximate_aggregate_functions.md#approx_top_sum) | Gets the approximate top elements and sum, based on the approximate sum of an assigned weight. For more information, see [Approximate aggregate functions](approximate_aggregate_functions.md). |
| [`ARRAY_AGG`](#array_agg) | Gets an array of values. |
| [`ARRAY_CONCAT_AGG`](#array_concat_agg) | Concatenates arrays and returns a single array as a result. |
| [`AVG`](#avg) | Gets the average of non-`NULL` values. |
| [`AVG` (Differential Privacy)](aggregate-dp-functions.md#avg-differential_privacy) | `DIFFERENTIAL_PRIVACY`-supported `AVG`. Gets the differentially-private average of non-`NULL`, non-`NaN` values in a query with a `DIFFERENTIAL_PRIVACY` clause. <br /> For more information, see [Differential privacy functions](aggregate-dp-functions.md). |
| [`BIT_AND`](#bit_and) | Performs a bitwise AND operation on an expression. |
| [`BIT_OR`](#bit_or) | Performs a bitwise OR operation on an expression. |
| [`BIT_XOR`](#bit_xor) | Performs a bitwise XOR operation on an expression. |
| [`CORR`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#corr) | Computes the Pearson coefficient of correlation of a set of number pairs. For more information, see [Statistical aggregate functions](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions). |
| [`COUNT`](#count) | Gets the number of rows in the input, or the number of rows with an expression evaluated to any value other than `NULL`. |
| [`COUNT` (Differential Privacy)](aggregate-dp-functions.md#count-differential_privacy) | `DIFFERENTIAL_PRIVACY`-supported `COUNT`. Signature 1: Gets the differentially-private count of rows in a query with a `DIFFERENTIAL_PRIVACY` clause. <br /> Signature 2: Gets the differentially-private count of rows with a non-`NULL` expression in a query with a `DIFFERENTIAL_PRIVACY` clause. <br /> For more information, see [Differential privacy functions](aggregate-dp-functions.md). |
| [`COUNTIF`](#countif) | Gets the number of `TRUE` values for an expression. |
| [`COVAR_POP`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#covar_pop) | Computes the population covariance of a set of number pairs. For more information, see [Statistical aggregate functions](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions). |
| [`COVAR_SAMP`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#covar_samp) | Computes the sample covariance of a set of number pairs. For more information, see [Statistical aggregate functions](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions). |
| [`GROUPING`](#grouping) | Checks if a groupable value in the `GROUP BY` clause is aggregated. |
| [`LOGICAL_AND`](#logical_and) | Gets the logical AND of all non-`NULL` expressions. |
| [`LOGICAL_OR`](#logical_or) | Gets the logical OR of all non-`NULL` expressions. |
| [`MAX`](#max) | Gets the maximum non-`NULL` value. |
| [`MAX_BY`](#max_by) | Synonym for `ANY_VALUE(x HAVING MAX y)`. |
| [`MIN`](#min) | Gets the minimum non-`NULL` value. |
| [`MIN_BY`](#min_by) | Synonym for `ANY_VALUE(x HAVING MIN y)`. |
| [`PERCENTILE_CONT`](navigation_functions.md#percentile_cont) | Computes the specified percentile for a value, using linear interpolation. For more information, see [Navigation functions](navigation_functions.md). |
| [`PERCENTILE_CONT` (Differential Privacy)](aggregate-dp-functions.md#percentile_cont-differential_privacy) | `DIFFERENTIAL_PRIVACY`-supported `PERCENTILE_CONT`. Computes a differentially-private percentile across privacy unit columns in a query with a `DIFFERENTIAL_PRIVACY` clause. <br /> For more information, see [Differential privacy functions](aggregate-dp-functions.md). |
| [`PERCENTILE_DISC`](navigation_functions.md#percentile_disc) | Computes the specified percentile for a discrete value. For more information, see [Navigation functions](navigation_functions.md). |
| [`ST_CENTROID_AGG`](geography_functions-1.md#st_centroid_agg) | Gets the centroid of a set of `GEOGRAPHY` values. For more information, see [Geography functions](geography_functions-1.md). |
| [`ST_EXTENT`](geography_functions-1.md#st_extent) | Gets the bounding box for a group of `GEOGRAPHY` values. For more information, see [Geography functions](geography_functions-1.md). |
| [`ST_UNION_AGG`](geography_functions-2.md#st_union_agg) | Aggregates over `GEOGRAPHY` values and gets their point set union. For more information, see [Geography functions](geography_functions-1.md). |
| [`STDDEV`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#stddev) | An alias of the `STDDEV_SAMP` function. For more information, see [Statistical aggregate functions](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions). |
| [`STDDEV_POP`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#stddev_pop) | Computes the population (biased) standard deviation of the values. For more information, see [Statistical aggregate functions](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions). |
| [`STDDEV_SAMP`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#stddev_samp) | Computes the sample (unbiased) standard deviation of the values. For more information, see [Statistical aggregate functions](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions). |
| [`STRING_AGG`](#string_agg) | Concatenates non-`NULL` `STRING` or `BYTES` values. |
| [`SUM`](#sum) | Gets the sum of non-`NULL` values. |
| [`SUM` (Differential Privacy)](aggregate-dp-functions.md#sum-differential_privacy) | `DIFFERENTIAL_PRIVACY`-supported `SUM`. Gets the differentially-private sum of non-`NULL`, non-`NaN` values in a query with a `DIFFERENTIAL_PRIVACY` clause. <br /> For more information, see [Differential privacy functions](aggregate-dp-functions.md). |
| [`VAR_POP`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#var_pop) | Computes the population (biased) variance of the values. For more information, see [Statistical aggregate functions](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions). |
| [`VAR_SAMP`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#var_samp) | Computes the sample (unbiased) variance of the values. For more information, see [Statistical aggregate functions](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions). |
| [`VARIANCE`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#variance) | An alias of `VAR_SAMP`. For more information, see [Statistical aggregate functions](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions). |

### `AGG`

```sql
AGG(measure_expression)
```

**Description**

Aggregates a [measure type](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#measure_type). A measure type encapsulates an
aggregate calculation to perform, locked to a specific granularity defined by
a key. The `AGG` function invokes the calculation exactly once per key
with the guarantee of avoiding overcounting. Measures are useful for defining
business metrics. You can perform aggregation using the `AGG`
function instead of complex aggregation queries.

The `AGG` function is used in two contexts:

- In SQL queries to aggregate measure columns or sub-fields of a `STRUCT` column returned by the `GRAPH_EXPAND` TVF.
- In `CREATE PROPERTY GRAPH` statements to define derived measures that compose multiple measures within the same element table, such as `MEASURE(AGG(total_revenue) - AGG(total_cost)) AS gross_profit`.

For more information about
overcounting with aggregations, see
[multi-level aggregation](aggregate-function-calls.md#avoid-overcounting-with-multi-level-aggregation).
For more information and examples of using the `AGG` function
with measures, see [work with measures](https://docs.cloud.google.com/bigquery/docs/graph-measures).

**Supported Argument Types**

A single `MEASURE` type

**Returned Data Types**

The type returned by the expression associated with the measure.

**Examples**

The following example creates a graph called `StoreGraph` based on the
`Stores` and `Locations` tables. The node table defined by location data has
a measure property called `total_population`. The measure is defined by the
aggregate calculation `SUM(population)` and the key `id`.

Adapted (not in the official docs): the `Locations` table is created before the `Stores` table, whose foreign key references it.

```sql
CREATE OR REPLACE TABLE mydataset.Locations (
  id INT64 PRIMARY KEY NOT ENFORCED,
  name STRING,
  population INT64
) AS (
  SELECT 101 AS id, 'Anytown' AS name, 1000 AS population
);

CREATE OR REPLACE TABLE mydataset.Stores (
  name STRING PRIMARY KEY NOT ENFORCED,
  location_id INT64 REFERENCES mydataset.Locations(id) NOT ENFORCED
) AS (
  SELECT 'Store 1' AS name, 101 AS location_id
  UNION ALL
  SELECT 'Store 2' AS name, 101 AS location_id
);

CREATE OR REPLACE PROPERTY GRAPH mydataset.StoreGraph
  NODE TABLES (
    mydataset.Stores AS S,
    mydataset.Locations AS L
    PROPERTIES(id, name, population, MEASURE(SUM(population)) AS total_population)
  )
  EDGE TABLES (
    mydataset.Stores AS SL
    SOURCE KEY (location_id) REFERENCES L (id)
    DESTINATION KEY (name) REFERENCES S (name)
  );
```

To access measures defined on a graph, you must call the
[`GRAPH_EXPAND` TVF](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-sql-queries#graph_expand), which performs a series of `LEFT JOIN`
operations on your graph's input tables to produce a flattened version of
the graph.

The following query calls the `GRAPH_EXPAND` function and omits the
`L_total_population` column from the output because
you can't directly select a column for a property defined by a measure without
using the `AGG` function:

```sql
SELECT * EXCEPT(L_total_population)
FROM GRAPH_EXPAND('mydataset.StoreGraph');

/*---------------+---------+------+---------+--------------+
 | S_location_id | S_name  | L_id | L_name  | L_population |
 +---------------+---------+------+---------+--------------+
 | 101           | Store 2 | 101  | Anytown | 1000         |
 | 101           | Store 1 | 101  | Anytown | 1000         |
 +---------------+---------+------+---------+--------------*/
```

The following query shows the difference between aggregating a measure and
a regular value. When you apply the `AGG` function to the `L_total_population`
measure, the population of a location is counted exactly once per distinct
`location_id` value.
If you call the `SUM` function on `L_population`, then the `L_population`
column contributes the population for every row in the table with a given
location ID.

```sql
SELECT
  S_location_id,
  AGG(L_total_population) AS true_total_population,
  SUM(L_population) AS overcounted_population
FROM GRAPH_EXPAND('mydataset.StoreGraph')
GROUP BY S_location_id;

/*---------------+-----------------------+------------------------+
 | S_location_id | true_total_population | overcounted_population |
 +---------------+-----------------------+------------------------+
 | 101           | 1000                  | 2000                   |
 +---------------+-----------------------+------------------------*/
```

### `ANY_VALUE`

```sql
ANY_VALUE(
  expression
  [ WHERE where_expression ]
  [ HAVING { MAX | MIN } having_expression ]
)
[ OVER over_clause ]

over_clause:
  { named_window | ( [ window_specification ] ) }

window_specification:
  [ named_window ]
  [ PARTITION BY partition_expression [, ...] ]
  [ ORDER BY expression [ { ASC | DESC }  ] [, ...] ]
  [ window_frame_clause ]
```

**Description**

Returns `expression` for some row chosen from the group. Which row is chosen is
nondeterministic, not random. Returns `NULL` when the input produces no
rows. Returns `NULL` when `expression`
or `having_expression` is
`NULL` for all rows in the group.

If `expression` contains any non-NULL values,
then `ANY_VALUE` behaves as if
`IGNORE NULLS` is specified;
rows for which `expression` is `NULL` aren't considered and won't be
selected.

If the `HAVING` clause is included in the `ANY_VALUE` function, the
`OVER` clause can't be used with this function.

To learn more about the optional aggregate clauses that you can pass
into this function, see
[Aggregate function calls](aggregate-function-calls.md).

To learn more about the `OVER` clause and how to use it, see
[Window function calls](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/window-function-calls).

**Supported Argument Types**

Any

**Returned Data Types**

Matches the input data type.

**Examples**

```sql
SELECT ANY_VALUE(fruit) as any_value
FROM UNNEST(["apple", "banana", "pear"]) as fruit;

/*-----------+
 | any_value |
 +-----------+
 | apple     |
 +-----------*/
```

```sql
SELECT
  fruit,
  ANY_VALUE(fruit) OVER (ORDER BY LENGTH(fruit) ROWS BETWEEN 1 PRECEDING AND CURRENT ROW) AS any_value
FROM UNNEST(["apple", "banana", "pear"]) as fruit;

/*--------+-----------+
 | fruit  | any_value |
 +--------+-----------+
 | pear   | pear      |
 | apple  | pear      |
 | banana | apple     |
 +--------+-----------*/
```

```sql
WITH
  Store AS (
    SELECT 20 AS sold, "apples" AS fruit
    UNION ALL
    SELECT 30 AS sold, "pears" AS fruit
    UNION ALL
    SELECT 30 AS sold, "bananas" AS fruit
    UNION ALL
    SELECT 10 AS sold, "oranges" AS fruit
  )
SELECT ANY_VALUE(fruit HAVING MAX sold) AS a_highest_selling_fruit FROM Store;

/*-------------------------+
 | a_highest_selling_fruit |
 +-------------------------+
 | pears                   |
 +-------------------------*/
```

```sql
WITH
  Store AS (
    SELECT 20 AS sold, "apples" AS fruit
    UNION ALL
    SELECT 30 AS sold, "pears" AS fruit
    UNION ALL
    SELECT 30 AS sold, "bananas" AS fruit
    UNION ALL
    SELECT 10 AS sold, "oranges" AS fruit
  )
SELECT ANY_VALUE(fruit HAVING MIN sold) AS a_lowest_selling_fruit FROM Store;

/*-------------------------+
 | a_lowest_selling_fruit  |
 +-------------------------+
 | oranges                 |
 +-------------------------*/
```

### `ARRAY_AGG`

```sql
ARRAY_AGG(
  [ DISTINCT ]
  expression
  [ { IGNORE | RESPECT } NULLS ]
  [ WHERE where_expression ]
  [ ORDER BY key [ { ASC | DESC } ] [, ... ] ]
  [ LIMIT n ]
)
[ OVER over_clause ]

over_clause:
  { named_window | ( [ window_specification ] ) }

window_specification:
  [ named_window ]
  [ PARTITION BY partition_expression [, ...] ]
  [ ORDER BY expression [ { ASC | DESC }  ] [, ...] ]
  [ window_frame_clause ]
```

**Description**

Returns an ARRAY of `expression` values. The order of elements
in the returned array is arbitrary. To order
the array elements, use an `ORDER BY` clause within the function call.

If you specify a `WHERE`
clause expression, then the `IGNORE NULLS` clause is required.

To learn more about the optional aggregate clauses that you can pass
into this function, see
[Aggregate function calls](aggregate-function-calls.md).

If this function is used with the `OVER` clause, it's part of a
window function call. In a window function call,
aggregate function clauses can't be used.
To learn more about the `OVER` clause and how to use it, see
[Window function calls](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/window-function-calls).

An error is raised if an array in the final query result contains a `NULL`
element.

**Supported Argument Types**

All data types except ARRAY.

**Returned Data Types**

ARRAY

If there are zero input rows, this function returns `NULL`.

**Examples**

```sql
SELECT ARRAY_AGG(x) AS array_agg FROM UNNEST([2, 1,-2, 3, -2, 1, 2]) AS x;

/*-------------------------+
 | array_agg               |
 +-------------------------+
 | [2, 1, -2, 3, -2, 1, 2] |
 +-------------------------*/
```

```sql
SELECT ARRAY_AGG(DISTINCT x) AS array_agg
FROM UNNEST([2, 1, -2, 3, -2, 1, 2]) AS x;

/*---------------+
 | array_agg     |
 +---------------+
 | [2, 1, -2, 3] |
 +---------------*/
```

```sql
SELECT ARRAY_AGG(x IGNORE NULLS) AS array_agg
FROM UNNEST([NULL, 1, -2, 3, -2, 1, NULL]) AS x;

/*-------------------+
 | array_agg         |
 +-------------------+
 | [1, -2, 3, -2, 1] |
 +-------------------*/
```

```sql
SELECT
  ARRAY_AGG(x IGNORE NULLS WHERE x < 0) AS negative_array_agg,
  ARRAY_AGG(x IGNORE NULLS WHERE x > 0) AS positive_array_agg
FROM UNNEST([NULL, 1, -2, 3, -2, 1, NULL]) AS x;

/*--------------------+--------------------+
 | negative_array_agg | positive_array_agg |
 +--------------------+--------------------+
 | [-2, -2]           | [1, 3, 1]          |
 +--------------------+--------------------*/
```

```sql
SELECT ARRAY_AGG(x ORDER BY ABS(x)) AS array_agg
FROM UNNEST([2, 1, -2, 3, -2, 1, 2]) AS x;

/*-------------------------+
 | array_agg               |
 +-------------------------+
 | [1, 1, 2, -2, -2, 2, 3] |
 +-------------------------*/
```

```sql
SELECT ARRAY_AGG(x LIMIT 5) AS array_agg
FROM UNNEST([2, 1, -2, 3, -2, 1, 2]) AS x;

/*-------------------+
 | array_agg         |
 +-------------------+
 | [2, 1, -2, 3, -2] |
 +-------------------*/
```

```sql
WITH vals AS
  (
    SELECT 1 x UNION ALL
    SELECT -2 x UNION ALL
    SELECT 3 x UNION ALL
    SELECT -2 x UNION ALL
    SELECT 1 x
  )
SELECT ARRAY_AGG(DISTINCT x ORDER BY x) as array_agg
FROM vals;

/*------------+
 | array_agg  |
 +------------+
 | [-2, 1, 3] |
 +------------*/
```

```sql
WITH vals AS
  (
    SELECT 1 x, 'a' y UNION ALL
    SELECT 1 x, 'b' y UNION ALL
    SELECT 2 x, 'a' y UNION ALL
    SELECT 2 x, 'c' y
  )
SELECT x, ARRAY_AGG(y) as array_agg
FROM vals
GROUP BY x;

/*---------------+
 | x | array_agg |
 +---------------+
 | 1 | [a, b]    |
 | 2 | [a, c]    |
 +---------------*/
```

```sql
SELECT
  x,
  ARRAY_AGG(x) OVER (ORDER BY ABS(x)) AS array_agg
FROM UNNEST([2, 1, -2, 3, -2, 1, 2]) AS x;

/*----+-------------------------+
 | x  | array_agg               |
 +----+-------------------------+
 | 1  | [1, 1]                  |
 | 1  | [1, 1]                  |
 | 2  | [1, 1, 2, -2, -2, 2]    |
 | -2 | [1, 1, 2, -2, -2, 2]    |
 | -2 | [1, 1, 2, -2, -2, 2]    |
 | 2  | [1, 1, 2, -2, -2, 2]    |
 | 3  | [1, 1, 2, -2, -2, 2, 3] |
 +----+-------------------------*/
```

### `ARRAY_CONCAT_AGG`

```sql
ARRAY_CONCAT_AGG(
  expression
  [ WHERE where_expression ]
  [ ORDER BY key [ { ASC | DESC } ] [, ... ] ]
  [ LIMIT n ]
)
```

**Description**

Concatenates elements from `expression` of type `ARRAY`, returning a single
array as a result.

This function ignores `NULL` input arrays, but respects the `NULL` elements in
non-`NULL` input arrays. An
error is raised, however, if an array in the final query result contains a
`NULL` element. Returns `NULL` if there are zero input rows or
`expression` evaluates to `NULL` for all rows.

To learn more about the optional aggregate clauses that you can pass
into this function, see
[Aggregate function calls](aggregate-function-calls.md).

**Supported Argument Types**

`ARRAY`

**Returned Data Types**

`ARRAY`

**Examples**

```sql
SELECT FORMAT("%T", ARRAY_CONCAT_AGG(x)) AS array_concat_agg FROM (
  SELECT [NULL, 1, 2, 3, 4] AS x
  UNION ALL SELECT NULL
  UNION ALL SELECT [5, 6]
  UNION ALL SELECT [7, 8, 9]
);

/*-----------------------------------+
 | array_concat_agg                  |
 +-----------------------------------+
 | [NULL, 1, 2, 3, 4, 5, 6, 7, 8, 9] |
 +-----------------------------------*/
```

```sql
SELECT FORMAT("%T", ARRAY_CONCAT_AGG(x ORDER BY ARRAY_LENGTH(x))) AS array_concat_agg FROM (
  SELECT [1, 2, 3, 4] AS x
  UNION ALL SELECT [5, 6]
  UNION ALL SELECT [7, 8, 9]
);

/*-----------------------------------+
 | array_concat_agg                  |
 +-----------------------------------+
 | [5, 6, 7, 8, 9, 1, 2, 3, 4]       |
 +-----------------------------------*/
```

```sql
SELECT FORMAT("%T", ARRAY_CONCAT_AGG(x LIMIT 2)) AS array_concat_agg FROM (
  SELECT [1, 2, 3, 4] AS x
  UNION ALL SELECT [5, 6]
  UNION ALL SELECT [7, 8, 9]
);

/*--------------------------+
 | array_concat_agg         |
 +--------------------------+
 | [1, 2, 3, 4, 5, 6]       |
 +--------------------------*/
```

```sql
SELECT FORMAT("%T", ARRAY_CONCAT_AGG(x ORDER BY ARRAY_LENGTH(x) LIMIT 2)) AS array_concat_agg FROM (
  SELECT [1, 2, 3, 4] AS x
  UNION ALL SELECT [5, 6]
  UNION ALL SELECT [7, 8, 9]
);

/*------------------+
 | array_concat_agg |
 +------------------+
 | [5, 6, 7, 8, 9]  |
 +------------------*/
```

### `AVG`

```sql
AVG(
  [ DISTINCT ]
  expression
  [ WHERE where_expression ]
)
[ OVER over_clause ]

over_clause:
  { named_window | ( [ window_specification ] ) }

window_specification:
  [ named_window ]
  [ PARTITION BY partition_expression [, ...] ]
  [ ORDER BY expression [ { ASC | DESC }  ] [, ...] ]
  [ window_frame_clause ]
```

**Description**

Returns the average of non-`NULL` values in an aggregated group.

To learn more about the optional aggregate clauses that you can pass
into this function, see
[Aggregate function calls](aggregate-function-calls.md).

This function can be used with the
[`AGGREGATION_THRESHOLD` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#agg_threshold_clause).

If this function is used with the `OVER` clause, it's part of a
window function call. In a window function call,
aggregate function clauses can't be used.
To learn more about the `OVER` clause and how to use it, see
[Window function calls](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/window-function-calls).

`AVG` can be used with differential privacy. For more information, see
[Differentially private aggregate functions](aggregate-dp-functions.md).

Caveats:

- If the aggregated group is empty or the argument is `NULL` for all rows in the group, returns `NULL`.
- If the argument is `NaN` for any row in the group, returns `NaN`.
- If the argument is `[+|-]Infinity` for any row in the group, returns either `[+|-]Infinity` or `NaN`.
- If there is numeric overflow, produces an error.
- If a [floating-point type](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#floating_point_types) is returned, the result is [non-deterministic](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#floating_point_semantics), which means you might receive a different result each time you use this function.

**Supported Argument Types**

- Any numeric input type
- `INTERVAL`

**Returned Data Types**

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` | `INTERVAL` |
| OUTPUT | `FLOAT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` | `INTERVAL` |
|---|---|---|---|---|---|

**Examples**

```sql
SELECT AVG(x) as avg
FROM UNNEST([0, 2, 4, 4, 5]) as x;

/*-----+
 | avg |
 +-----+
 | 3   |
 +-----*/
```

```sql
SELECT AVG(DISTINCT x) AS avg
FROM UNNEST([0, 2, 4, 4, 5]) AS x;

/*------+
 | avg  |
 +------+
 | 2.75 |
 +------*/
```

```sql
SELECT
  x,
  AVG(x) OVER (ORDER BY x ROWS BETWEEN 1 PRECEDING AND CURRENT ROW) AS avg
FROM UNNEST([0, 2, NULL, 4, 4, 5]) AS x;

/*------+------+
 | x    | avg  |
 +------+------+
 | NULL | NULL |
 | 0    | 0    |
 | 2    | 1    |
 | 4    | 3    |
 | 4    | 4    |
 | 5    | 4.5  |
 +------+------*/
```

### `BIT_AND`

```sql
BIT_AND(
  expression
  [ WHERE where_expression ]
)
```

**Description**

Performs a bitwise AND operation on `expression` and returns the result.

To learn more about the optional aggregate clauses that you can pass
into this function, see
[Aggregate function calls](aggregate-function-calls.md).

**Supported Argument Types**

- INT64

**Returned Data Types**

INT64

**Examples**

```sql
SELECT BIT_AND(x) as bit_and FROM UNNEST([0xF001, 0x00A1]) as x;

/*---------+
 | bit_and |
 +---------+
 | 1       |
 +---------*/
```

### `BIT_OR`

```sql
BIT_OR(
  expression
  [ WHERE where_expression ]
)
```

**Description**

Performs a bitwise OR operation on `expression` and returns the result.

To learn more about the optional aggregate clauses that you can pass
into this function, see
[Aggregate function calls](aggregate-function-calls.md).

**Supported Argument Types**

- INT64

**Returned Data Types**

INT64

**Examples**

```sql
SELECT BIT_OR(x) as bit_or FROM UNNEST([0xF001, 0x00A1]) as x;

/*--------+
 | bit_or |
 +--------+
 | 61601  |
 +--------*/
```

### `BIT_XOR`

```sql
BIT_XOR(
  [ DISTINCT ]
  expression
  [ WHERE where_expression ]
)
```

**Description**

Performs a bitwise XOR operation on `expression` and returns the result.

To learn more about the optional aggregate clauses that you can pass
into this function, see
[Aggregate function calls](aggregate-function-calls.md).

**Supported Argument Types**

- INT64

**Returned Data Types**

INT64

**Examples**

```sql
SELECT BIT_XOR(x) AS bit_xor FROM UNNEST([5678, 1234]) AS x;

/*---------+
 | bit_xor |
 +---------+
 | 4860    |
 +---------*/
```

```sql
SELECT BIT_XOR(x) AS bit_xor FROM UNNEST([1234, 5678, 1234]) AS x;

/*---------+
 | bit_xor |
 +---------+
 | 5678    |
 +---------*/
```

```sql
SELECT BIT_XOR(DISTINCT x) AS bit_xor FROM UNNEST([1234, 5678, 1234]) AS x;

/*---------+
 | bit_xor |
 +---------+
 | 4860    |
 +---------*/
```

### `COUNT`

```sql
COUNT(*)
[ OVER over_clause ]
```

```sql
COUNT(
  [ DISTINCT ]
  expression
  [ WHERE where_expression ]
)
[ OVER over_clause ]

over_clause:
  { named_window | ( [ window_specification ] ) }

window_specification:
  [ named_window ]
  [ PARTITION BY partition_expression [, ...] ]
  [ ORDER BY expression [ { ASC | DESC }  ] [, ...] ]
  [ window_frame_clause ]
```

**Description**

Gets the number of rows in the input or the number of rows with an
expression evaluated to any value other than `NULL`.

> [!NOTE]
> **Note:** If you're querying a large dataset, you can compute results faster and save resources by using [HLL++ functions](hll_functions.md) for approximate distinct counts. For more information, see [Sketches](https://docs.cloud.google.com/bigquery/docs/sketches).

**Definitions**

- `*`: Use this value to get the number of all rows in the input.
- `expression`: A value of any data type that represents the expression to evaluate. If `DISTINCT` is present, `expression` can only be a data type that is [groupable](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#groupable_data_types).
- Optional aggregate clauses: To learn more about the optional aggregate clauses that you can pass into this function, see [Aggregate function calls](aggregate-function-calls.md).

<!-- -->

- `OVER`: To learn more about the `OVER` clause and how to use it, see [Window function calls](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/window-function-calls).

**Details**

This function with `DISTINCT` supports specifying [collation](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/collation-concepts).

`COUNT` can be used with differential privacy. For more information, see
[Differentially private aggregate functions](aggregate-dp-functions.md).

**Return type**

`INT64`

**Examples**

You can use the `COUNT` function to return the number of rows in a table or the
number of distinct values of an expression. For example:

```sql
SELECT
  COUNT(*) AS count_star,
  COUNT(DISTINCT x) AS count_dist_x
FROM UNNEST([1, 4, 4, 5]) AS x;

/*------------+--------------+
 | count_star | count_dist_x |
 +------------+--------------+
 | 4          | 3            |
 +------------+--------------*/
```

```sql
SELECT
  x,
  COUNT(*) OVER (PARTITION BY MOD(x, 3)) AS count_star,
  COUNT(DISTINCT x) OVER (PARTITION BY MOD(x, 3)) AS count_dist_x
FROM UNNEST([1, 4, 4, 5]) AS x;

/*------+------------+--------------+
 | x    | count_star | count_dist_x |
 +------+------------+--------------+
 | 1    | 3          | 2            |
 | 4    | 3          | 2            |
 | 4    | 3          | 2            |
 | 5    | 1          | 1            |
 +------+------------+--------------*/
```

```sql
SELECT
  x,
  COUNT(*) OVER (PARTITION BY MOD(x, 3)) AS count_star,
  COUNT(x) OVER (PARTITION BY MOD(x, 3)) AS count_x
FROM UNNEST([1, 4, NULL, 4, 5]) AS x;

/*------+------------+---------+
 | x    | count_star | count_x |
 +------+------------+---------+
 | NULL | 1          | 0       |
 | 1    | 3          | 3       |
 | 4    | 3          | 3       |
 | 4    | 3          | 3       |
 | 5    | 1          | 1       |
 +------+------------+---------*/
```

The following query counts the number of distinct positive values of `x`:

```sql
SELECT COUNT(DISTINCT x WHERE x > 0) AS distinct_positive
FROM UNNEST([1, -2, 4, 1, -5, 4, 1, 3, -6, 1]) AS x;

/*-------------------+
 | distinct_positive |
 +-------------------+
 | 3                 |
 +-------------------*/
```

The following query counts the number of distinct dates on which a certain kind
of event occurred:

```sql
WITH Events AS (
  SELECT DATE '2021-01-01' AS event_date, 'SUCCESS' AS event_type
  UNION ALL
  SELECT DATE '2021-01-02' AS event_date, 'SUCCESS' AS event_type
  UNION ALL
  SELECT DATE '2021-01-02' AS event_date, 'FAILURE' AS event_type
  UNION ALL
  SELECT DATE '2021-01-03' AS event_date, 'SUCCESS' AS event_type
  UNION ALL
  SELECT DATE '2021-01-04' AS event_date, 'FAILURE' AS event_type
  UNION ALL
  SELECT DATE '2021-01-04' AS event_date, 'FAILURE' AS event_type
)
SELECT
  COUNT(DISTINCT event_date WHERE event_type = 'FAILURE')
    AS distinct_dates_with_failures
FROM Events;

/*------------------------------+
 | distinct_dates_with_failures |
 +------------------------------+
 | 2                            |
 +------------------------------*/
```

The following query counts the number of distinct `id`s that exist in both
the `customers` and `vendors` tables:

```sql
WITH
  customers AS (
    SELECT 1934 AS id, 'a' AS team UNION ALL
    SELECT 2991, 'b' UNION ALL
    SELECT 3988, 'c'),
  vendors AS (
    SELECT 1934 AS id, 'd' AS team UNION ALL
    SELECT 2991, 'e' UNION ALL
    SELECT 4366, 'f')
SELECT
  COUNT(DISTINCT id WHERE id IN (SELECT id FROM customers)) AS result
FROM vendors;

/*--------+
 | result |
 +--------+
 | 2      |
 +--------*/
```

### `COUNTIF`

```sql
COUNTIF(
  [ DISTINCT ]
  expression
  [ WHERE where_expression ]
)
[ OVER over_clause ]

over_clause:
  { named_window | ( [ window_specification ] ) }

window_specification:
  [ named_window ]
  [ PARTITION BY partition_expression [, ...] ]
  [ ORDER BY expression [ { ASC | DESC }  ] [, ...] ]
  [ window_frame_clause ]
```

**Description**

Gets the number of `TRUE` values for an expression.

**Definitions**

- `expression`: A `BOOL` value that represents the expression to evaluate.
- Optional aggregate clauses: To learn more about the optional aggregate clauses that you can pass into this function, see [Aggregate function calls](aggregate-function-calls.md).

<!-- -->

- `OVER`: To learn more about the `OVER` clause and how to use it, see [Window function calls](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/window-function-calls).

**Details**

The function signature `COUNTIF(DISTINCT ...)` is generally not useful. If you
would like to use `DISTINCT`, use `COUNT` with `DISTINCT IF`. For more
information, see the [`COUNT`](#count) function.

> [!NOTE]
> **Note:** `COUNTIF(expression)` is equivalent to `COUNT(expression WHERE expression)`.

**Return type**

`INT64`

**Examples**

```sql
SELECT COUNTIF(x<0) AS num_negative, COUNTIF(x>0) AS num_positive
FROM UNNEST([5, -2, 3, 6, -10, -7, 4, 0]) AS x;

/*--------------+--------------+
 | num_negative | num_positive |
 +--------------+--------------+
 | 3            | 4            |
 +--------------+--------------*/
```

```sql
SELECT
  x,
  COUNTIF(x<0) OVER (ORDER BY ABS(x) ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING) AS num_negative
FROM UNNEST([5, -2, 3, 6, -10, NULL, -7, 4, 0]) AS x;

/*------+--------------+
 | x    | num_negative |
 +------+--------------+
 | NULL | 0            |
 | 0    | 1            |
 | -2   | 1            |
 | 3    | 1            |
 | 4    | 0            |
 | 5    | 0            |
 | 6    | 1            |
 | -7   | 2            |
 | -10  | 2            |
 +------+--------------*/
```

### `GROUPING`

```sql
GROUPING(groupable_value)
```

**Description**

If a groupable item in the [`GROUP BY` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#group_by_clause) is aggregated
(and thus not grouped), this function returns `1`. Otherwise,
this function returns `0`.

Definitions:

- `groupable_value`: An expression that represents a value that can be grouped in the `GROUP BY` clause.

Details:

The `GROUPING` function is helpful if you need to determine which rows are
produced by which grouping sets. A grouping set is a group of columns by which
rows can be grouped together. So, if you need to filter rows by
a few specific grouping sets, you can use the `GROUPING` function to identify
which grouping sets grouped which rows by creating a matrix of the results.

In addition, you can use the `GROUPING` function to determine the type of
`NULL` produced by the `GROUP BY` clause. In some cases, the `GROUP BY` clause
produces a `NULL` placeholder. This placeholder represents all groupable items
that are aggregated (not grouped) in the current grouping set. This is different
from a standard `NULL`, which can also be produced by a query.

You can't use the `GROUPING` function with
[multi-level aggregation](aggregate-function-calls.md#multi-level-aggregation).

For more information, see the following examples.

**Returned Data Type**

`INT64`

**Examples**

In the following example, it's difficult to determine which rows are grouped by
the grouping value `product_type` or `product_name`. The `GROUPING` function
makes this easier to determine.

Pay close attention to what's in the `product_type_agg` and
`product_name_agg` column matrix. This determines how the rows are grouped.

| `product_type_agg` | `product_name_agg` | Notes |
|---|---|---|
| 1 | 0 | Rows are grouped by `product_name`. |
| 0 | 1 | Rows are grouped by `product_type`. |
| 0 | 0 | Rows are grouped by `product_type` and `product_name`. |
| 1 | 1 | Grand total row. |

```sql
WITH
  Products AS (
    SELECT 'shirt' AS product_type, 't-shirt' AS product_name, 3 AS product_count UNION ALL
    SELECT 'shirt', 't-shirt', 8 UNION ALL
    SELECT 'shirt', 'polo', 25 UNION ALL
    SELECT 'pants', 'jeans', 6
  )
SELECT
  product_type,
  product_name,
  SUM(product_count) AS product_sum,
  GROUPING(product_type) AS product_type_agg,
  GROUPING(product_name) AS product_name_agg,
FROM Products
GROUP BY GROUPING SETS(product_type, product_name, ())
ORDER BY product_name;

/*--------------+--------------+-------------+------------------+------------------+
 | product_type | product_name | product_sum | product_type_agg | product_name_agg |
 +--------------+--------------+-------------+------------------+------------------+
 | NULL         | NULL         | 42          | 1                | 1                |
 | shirt        | NULL         | 36          | 0                | 1                |
 | pants        | NULL         | 6           | 0                | 1                |
 | NULL         | jeans        | 6           | 1                | 0                |
 | NULL         | polo         | 25          | 1                | 0                |
 | NULL         | t-shirt      | 11          | 1                | 0                |
 +--------------+--------------+-------------+------------------+------------------*/
```

In the following example, it's difficult to determine
if `NULL` represents a `NULL` placeholder or a standard `NULL` value in the
`product_type` column. The `GROUPING` function makes it easier to
determine what type of `NULL` is being produced. If
`product_type_is_aggregated` is `1`, the `NULL` value for
the `product_type` column is a `NULL` placeholder.

```sql
WITH
  Products AS (
    SELECT 'shirt' AS product_type, 't-shirt' AS product_name, 3 AS product_count UNION ALL
    SELECT 'shirt', 't-shirt', 8 UNION ALL
    SELECT NULL, 'polo', 25 UNION ALL
    SELECT 'pants', 'jeans', 6
  )
SELECT
  product_type,
  product_name,
  SUM(product_count) AS product_sum,
  GROUPING(product_type) AS product_type_is_aggregated
FROM Products
GROUP BY GROUPING SETS(product_type, product_name)
ORDER BY product_name;

/*--------------+--------------+-------------+----------------------------+
 | product_type | product_name | product_sum | product_type_is_aggregated |
 +--------------+--------------+-------------+----------------------------+
 | shirt        | NULL         | 11          | 0                          |
 | NULL         | NULL         | 25          | 0                          |
 | pants        | NULL         | 6           | 0                          |
 | NULL         | jeans        | 6           | 1                          |
 | NULL         | polo         | 25          | 1                          |
 | NULL         | t-shirt      | 11          | 1                          |
 +--------------+--------------+-------------+----------------------------*/
```

### `LOGICAL_AND`

```sql
LOGICAL_AND(
  expression
  [ WHERE where_expression ]
)
```

**Description**

Returns the logical AND of all non-`NULL` expressions. Returns `NULL` if there
are zero input rows or `expression` evaluates to `NULL` for all rows.

To learn more about the optional aggregate clauses that you can pass
into this function, see
[Aggregate function calls](aggregate-function-calls.md).

This function can be used with the
[`AGGREGATION_THRESHOLD` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#agg_threshold_clause).

**Supported Argument Types**

`BOOL`

**Return Data Types**

`BOOL`

**Examples**

`LOGICAL_AND` returns `FALSE` because not all of the values in the array are
less than 3.

```sql
SELECT LOGICAL_AND(x < 3) AS logical_and FROM UNNEST([1, 2, 4]) AS x;

/*-------------+
 | logical_and |
 +-------------+
 | FALSE       |
 +-------------*/
```

### `LOGICAL_OR`

```sql
LOGICAL_OR(
  expression
  [ WHERE where_expression ]
)
```

**Description**

Returns the logical OR of all non-`NULL` expressions. Returns `NULL` if there
are zero input rows or `expression` evaluates to `NULL` for all rows.

To learn more about the optional aggregate clauses that you can pass
into this function, see
[Aggregate function calls](aggregate-function-calls.md).

This function can be used with the
[`AGGREGATION_THRESHOLD` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#agg_threshold_clause).

**Supported Argument Types**

`BOOL`

**Return Data Types**

`BOOL`

**Examples**

`LOGICAL_OR` returns `TRUE` because at least one of the values in the array is
less than 3.

```sql
SELECT LOGICAL_OR(x < 3) AS logical_or FROM UNNEST([1, 2, 4]) AS x;

/*------------+
 | logical_or |
 +------------+
 | TRUE       |
 +------------*/
```

### `MAX`

```sql
MAX(
  expression
  [ WHERE where_expression ]
)
[ OVER over_clause ]

over_clause:
  { named_window | ( [ window_specification ] ) }

window_specification:
  [ named_window ]
  [ PARTITION BY partition_expression [, ...] ]
  [ ORDER BY expression [ { ASC | DESC }  ] [, ...] ]
  [ window_frame_clause ]
```

**Description**

Returns the maximum non-`NULL` value in an aggregated group.

Caveats:

- If the aggregated group is empty or the argument is `NULL` for all rows in the group, returns `NULL`.
- If the argument is `NaN` for any row in the group, returns `NaN`.

To learn more about the optional aggregate clauses that you can pass
into this function, see
[Aggregate function calls](aggregate-function-calls.md).

To learn more about the `OVER` clause and how to use it, see
[Window function calls](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/window-function-calls).

This function supports specifying [collation](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/collation-concepts).

**Supported Argument Types**

Any [orderable data type](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#data_type_properties) except for `ARRAY`.

**Return Data Types**

The data type of the input values.

**Examples**

```sql
SELECT MAX(x) AS max
FROM UNNEST([8, 37, 55, 4]) AS x;

/*-----+
 | max |
 +-----+
 | 55  |
 +-----*/
```

```sql
SELECT x, MAX(x) OVER (PARTITION BY MOD(x, 2)) AS max
FROM UNNEST([8, NULL, 37, 55, NULL, 4]) AS x;

/*------+------+
 | x    | max  |
 +------+------+
 | NULL | NULL |
 | NULL | NULL |
 | 8    | 8    |
 | 4    | 8    |
 | 37   | 55   |
 | 55   | 55   |
 +------+------*/
```

### `MAX_BY`

```sql
MAX_BY(
  x, y
)
```

**Description**

Synonym for [`ANY_VALUE(x HAVING MAX y)`](#any_value).

**Return Data Types**

Matches the input `x` data type.

**Examples**

```sql
WITH fruits AS (
  SELECT "apple"  fruit, 3.55 price UNION ALL
  SELECT "banana"  fruit, 2.10 price UNION ALL
  SELECT "pear"  fruit, 4.30 price
)
SELECT MAX_BY(fruit, price) as fruit
FROM fruits;

/*-------+
 | fruit |
 +-------+
 | pear  |
 +-------*/
```

### `MIN`

```sql
MIN(
  expression
  [ WHERE where_expression ]
)
[ OVER over_clause ]

over_clause:
  { named_window | ( [ window_specification ] ) }

window_specification:
  [ named_window ]
  [ PARTITION BY partition_expression [, ...] ]
  [ ORDER BY expression [ { ASC | DESC }  ] [, ...] ]
  [ window_frame_clause ]
```

**Description**

Returns the minimum non-`NULL` value in an aggregated group.

Caveats:

- If the aggregated group is empty or the argument is `NULL` for all rows in the group, returns `NULL`.
- If the argument is `NaN` for any row in the group, returns `NaN`.

To learn more about the optional aggregate clauses that you can pass
into this function, see
[Aggregate function calls](aggregate-function-calls.md).

To learn more about the `OVER` clause and how to use it, see
[Window function calls](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/window-function-calls).

This function supports specifying [collation](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/collation-concepts).

**Supported Argument Types**

Any [orderable data type](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#data_type_properties) except for `ARRAY`.

**Return Data Types**

The data type of the input values.

**Examples**

```sql
SELECT MIN(x) AS min
FROM UNNEST([8, 37, 4, 55]) AS x;

/*-----+
 | min |
 +-----+
 | 4   |
 +-----*/
```

```sql
SELECT x, MIN(x) OVER (PARTITION BY MOD(x, 2)) AS min
FROM UNNEST([8, NULL, 37, 4, NULL, 55]) AS x;

/*------+------+
 | x    | min  |
 +------+------+
 | NULL | NULL |
 | NULL | NULL |
 | 8    | 4    |
 | 4    | 4    |
 | 37   | 37   |
 | 55   | 37   |
 +------+------*/
```

### `MIN_BY`

```sql
MIN_BY(
  x, y
)
```

**Description**

Synonym for [`ANY_VALUE(x HAVING MIN y)`](#any_value).

**Return Data Types**

Matches the input `x` data type.

**Examples**

```sql
WITH fruits AS (
  SELECT "apple"  fruit, 3.55 price UNION ALL
  SELECT "banana"  fruit, 2.10 price UNION ALL
  SELECT "pear"  fruit, 4.30 price
)
SELECT MIN_BY(fruit, price) as fruit
FROM fruits;

/*--------+
 | fruit  |
 +--------+
 | banana |
 +--------*/
```

### `STRING_AGG`

```sql
STRING_AGG(
  [ DISTINCT ]
  expression [, delimiter]
  [ WHERE where_expression ]
  [ ORDER BY key [ { ASC | DESC } ] [, ... ] ]
  [ LIMIT n ]
)
[ OVER over_clause ]

over_clause:
  { named_window | ( [ window_specification ] ) }

window_specification:
  [ named_window ]
  [ PARTITION BY partition_expression [, ...] ]
  [ ORDER BY expression [ { ASC | DESC }  ] [, ...] ]
  [ window_frame_clause ]
```

**Description**

Returns a value (either `STRING` or `BYTES`) obtained by concatenating
non-`NULL` values. Returns `NULL` if there are zero input rows or `expression`
evaluates to `NULL` for all rows.

If a `delimiter` is specified, concatenated values are separated by that
delimiter; otherwise, a comma is used as a delimiter.

To learn more about the optional aggregate clauses that you can pass
into this function, see
[Aggregate function calls](aggregate-function-calls.md).

If this function is used with the `OVER` clause, it's part of a
window function call. In a window function call,
aggregate function clauses can't be used.
To learn more about the `OVER` clause and how to use it, see
[Window function calls](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/window-function-calls).

**Supported Argument Types**

Either `STRING` or `BYTES`.

**Return Data Types**

Either `STRING` or `BYTES`.

**Examples**

```sql
SELECT STRING_AGG(fruit) AS string_agg
FROM UNNEST(["apple", NULL, "pear", "banana", "pear"]) AS fruit;

/*------------------------+
 | string_agg             |
 +------------------------+
 | apple,pear,banana,pear |
 +------------------------*/
```

```sql
SELECT STRING_AGG(fruit, " & ") AS string_agg
FROM UNNEST(["apple", "pear", "banana", "pear"]) AS fruit;

/*------------------------------+
 | string_agg                   |
 +------------------------------+
 | apple & pear & banana & pear |
 +------------------------------*/
```

```sql
SELECT STRING_AGG(DISTINCT fruit, " & ") AS string_agg
FROM UNNEST(["apple", "pear", "banana", "pear"]) AS fruit;

/*-----------------------+
 | string_agg            |
 +-----------------------+
 | apple & pear & banana |
 +-----------------------*/
```

```sql
SELECT STRING_AGG(fruit, " & " ORDER BY LENGTH(fruit)) AS string_agg
FROM UNNEST(["apple", "pear", "banana", "pear"]) AS fruit;

/*------------------------------+
 | string_agg                   |
 +------------------------------+
 | pear & pear & apple & banana |
 +------------------------------*/
```

```sql
SELECT STRING_AGG(fruit, " & " LIMIT 2) AS string_agg
FROM UNNEST(["apple", "pear", "banana", "pear"]) AS fruit;

/*--------------+
 | string_agg   |
 +--------------+
 | apple & pear |
 +--------------*/
```

```sql
SELECT STRING_AGG(DISTINCT fruit, " & " ORDER BY fruit DESC LIMIT 2) AS string_agg
FROM UNNEST(["apple", "pear", "banana", "pear"]) AS fruit;

/*---------------+
 | string_agg    |
 +---------------+
 | pear & banana |
 +---------------*/
```

```sql
SELECT
  fruit,
  STRING_AGG(fruit, " & ") OVER (ORDER BY LENGTH(fruit)) AS string_agg
FROM UNNEST(["apple", NULL, "pear", "banana", "pear"]) AS fruit;

/*--------+------------------------------+
 | fruit  | string_agg                   |
 +--------+------------------------------+
 | NULL   | NULL                         |
 | pear   | pear & pear                  |
 | pear   | pear & pear                  |
 | apple  | pear & pear & apple          |
 | banana | pear & pear & apple & banana |
 +--------+------------------------------*/
```

### `SUM`

```sql
SUM(
  [ DISTINCT ]
  expression
  [ WHERE where_expression ]
)
[ OVER over_clause ]

over_clause:
  { named_window | ( [ window_specification ] ) }

window_specification:
  [ named_window ]
  [ PARTITION BY partition_expression [, ...] ]
  [ ORDER BY expression [ { ASC | DESC }  ] [, ...] ]
  [ window_frame_clause ]
```

**Description**

Returns the sum of non-`NULL` values in an aggregated group.

To learn more about the optional aggregate clauses that you can pass
into this function, see
[Aggregate function calls](aggregate-function-calls.md).

This function can be used with the
[`AGGREGATION_THRESHOLD` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#agg_threshold_clause).

To learn more about the `OVER` clause and how to use it, see
[Window function calls](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/window-function-calls).

`SUM` can be used with differential privacy. For more information, see
[Differentially private aggregate functions](aggregate-dp-functions.md).

Caveats:

- If the aggregated group is empty or the argument is `NULL` for all rows in the group, returns `NULL`.
- If the argument is `NaN` for any row in the group, returns `NaN`.
- If the argument is `[+|-]Infinity` for any row in the group, returns either `[+|-]Infinity` or `NaN`.
- If there is numeric overflow, produces an error.
- If a [floating-point type](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#floating_point_types) is returned, the result is [non-deterministic](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#floating_point_semantics), which means you might receive a different result each time you use this function.

**Supported Argument Types**

- Any supported numeric data type
- `INTERVAL`

**Return Data Types**

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` | `INTERVAL` |
| OUTPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` | `INTERVAL` |
|---|---|---|---|---|---|

**Examples**

```sql
SELECT SUM(x) AS sum
FROM UNNEST([1, 2, 3, 4, 5, 4, 3, 2, 1]) AS x;

/*-----+
 | sum |
 +-----+
 | 25  |
 +-----*/
```

```sql
SELECT SUM(DISTINCT x) AS sum
FROM UNNEST([1, 2, 3, 4, 5, 4, 3, 2, 1]) AS x;

/*-----+
 | sum |
 +-----+
 | 15  |
 +-----*/
```

```sql
SELECT
  x,
  SUM(x) OVER (PARTITION BY MOD(x, 3)) AS sum
FROM UNNEST([1, 2, 3, 4, 5, 4, 3, 2, 1]) AS x;

/*---+-----+
 | x | sum |
 +---+-----+
 | 3 | 6   |
 | 3 | 6   |
 | 1 | 10  |
 | 4 | 10  |
 | 4 | 10  |
 | 1 | 10  |
 | 2 | 9   |
 | 5 | 9   |
 | 2 | 9   |
 +---+-----*/
```

```sql
SELECT
  x,
  SUM(DISTINCT x) OVER (PARTITION BY MOD(x, 3)) AS sum
FROM UNNEST([1, 2, 3, 4, 5, 4, 3, 2, 1]) AS x;

/*---+-----+
 | x | sum |
 +---+-----+
 | 3 | 3   |
 | 3 | 3   |
 | 1 | 5   |
 | 4 | 5   |
 | 4 | 5   |
 | 1 | 5   |
 | 2 | 7   |
 | 5 | 7   |
 | 2 | 7   |
 +---+-----*/
```

```sql
SELECT SUM(x) AS sum
FROM UNNEST([]) AS x;

/*------+
 | sum  |
 +------+
 | NULL |
 +------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the text named the table `vendor`, but the example defines and reads `vendors`; the name is changed to `vendors`.
- Corrected from the official docs: the `AGG` example creates `mydataset.Stores`, whose `location_id` column `REFERENCES mydataset.Locations(id)`, before `mydataset.Locations` exists. The two `CREATE TABLE` statements are swapped so that the referenced table is created first, the order that the same `StoreGraph` example uses in `graph-gql/sql-queries.md`.

## Related

- [Index of this directory](./README.md)

---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions
---

# Statistical aggregate functions

## Signature / Usage

GoogleSQL for BigQuery supports statistical aggregate functions.
To learn about the syntax for aggregate function calls, see
[Aggregate function calls](aggregate-function-calls.md).

### Function list

| Name | Summary |
|---|---|
| [`CORR`](#corr) | Computes the Pearson coefficient of correlation of a set of number pairs. |
| [`COVAR_POP`](#covar_pop) | Computes the population covariance of a set of number pairs. |
| [`COVAR_SAMP`](#covar_samp) | Computes the sample covariance of a set of number pairs. |
| [`STDDEV`](#stddev) | An alias of the `STDDEV_SAMP` function. |
| [`STDDEV_POP`](#stddev_pop) | Computes the population (biased) standard deviation of the values. |
| [`STDDEV_SAMP`](#stddev_samp) | Computes the sample (unbiased) standard deviation of the values. |
| [`VAR_POP`](#var_pop) | Computes the population (biased) variance of the values. |
| [`VAR_SAMP`](#var_samp) | Computes the sample (unbiased) variance of the values. |
| [`VARIANCE`](#variance) | An alias of `VAR_SAMP`. |

### `CORR`

```sql
CORR(
  X1, X2
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

Returns the [Pearson coefficient](https://en.wikipedia.org/wiki/Pearson_product-moment_correlation_coefficient)
of correlation of a set of number pairs. For each number pair, the first number
is the dependent variable and the second number is the independent variable.
The return result is between `-1` and `1`. A result of `0` indicates no
correlation.

All numeric types are supported. If the
input is `NUMERIC` or `BIGNUMERIC` then the internal aggregation is
stable with the final output converted to a `FLOAT64`.
Otherwise the input is converted to a `FLOAT64`
before aggregation, resulting in a potentially unstable result.

This function ignores any input pairs that contain one or more `NULL` values. If
there are fewer than two input pairs without `NULL` values, this function
returns `NULL`.

`NaN` is produced if:

- Any input value is `NaN`
- Any input value is positive infinity or negative infinity.
- The variance of `X1` or `X2` is `0`.
- The covariance of `X1` and `X2` is `0`.

To learn more about the optional aggregate clauses that you can pass
into this function, see
[Aggregate function calls](aggregate-function-calls.md).

To learn more about the `OVER` clause and how to use it, see
[Window function calls](window-function-calls.md).

**Return Data Type**

`FLOAT64`

**Examples**

```sql
SELECT CORR(y, x) AS results
FROM
  UNNEST(
    [
      STRUCT(1.0 AS y, 5.0 AS x),
      (3.0, 9.0),
      (4.0, 7.0)]);

/*--------------------+
 | results            |
 +--------------------+
 | 0.6546536707079772 |
 +--------------------*/
```

```sql
SELECT
  y,
  x,
  CORR(y, x)
    OVER (
      ORDER BY y
      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS results
FROM
  UNNEST(
    [
      STRUCT(1.0 AS y, 5.0 AS x),
      (3.0, 9.0),
      (4.0, 7.0)]);

/*-----+-----+--------------------+
 | y   | x   | results            |
 +-----+-----+--------------------+
 | 1.0 | 5.0 | NULL               |
 | 3.0 | 9.0 | 1                  |
 | 4.0 | 7.0 | 0.6546536707079772 |
 +-----+-----+--------------------*/
```

```sql
SELECT CORR(y, x) AS results
FROM
  UNNEST(
    [
      STRUCT(1.0 AS y, 5.0 AS x),
      (3.0, 9.0),
      (4.0, NULL)]);

/*---------+
 | results |
 +---------+
 | 1       |
 +---------*/
```

```sql
SELECT CORR(y, x) AS results
FROM UNNEST([STRUCT(1.0 AS y, NULL AS x),(9.0, 3.0)])

/*---------+
 | results |
 +---------+
 | NULL    |
 +---------*/
```

```sql
SELECT CORR(y, x) AS results
FROM UNNEST([STRUCT(1.0 AS y, NULL AS x),(9.0, NULL)])

/*---------+
 | results |
 +---------+
 | NULL    |
 +---------*/
```

```sql
SELECT CORR(y, x) AS results
FROM
  UNNEST(
    [
      STRUCT(1.0 AS y, 5.0 AS x),
      (3.0, 9.0),
      (4.0, 7.0),
      (5.0, 1.0),
      (7.0, CAST('Infinity' as FLOAT64))])

/*---------+
 | results |
 +---------+
 | NaN     |
 +---------*/
```

```sql
SELECT CORR(x, y) AS results
FROM
  (
    SELECT 0 AS x, 0 AS y
    UNION ALL
    SELECT 0 AS x, 0 AS y
  )

/*---------+
 | results |
 +---------+
 | NaN     |
 +---------*/
```

### `COVAR_POP`

```sql
COVAR_POP(
  X1, X2
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

Returns the population [covariance](https://en.wikipedia.org/wiki/Covariance) of
a set of number pairs. The first number is the dependent variable; the second
number is the independent variable. The return result is between `-Inf` and
`+Inf`.

All numeric types are supported. If the
input is `NUMERIC` or `BIGNUMERIC` then the internal aggregation is
stable with the final output converted to a `FLOAT64`.
Otherwise the input is converted to a `FLOAT64`
before aggregation, resulting in a potentially unstable result.

This function ignores any input pairs that contain one or more `NULL` values. If
there is no input pair without `NULL` values, this function returns `NULL`.
If there is exactly one input pair without `NULL` values, this function returns
`0`.

`NaN` is produced if:

- Any input value is `NaN`
- Any input value is positive infinity or negative infinity.

To learn more about the optional aggregate clauses that you can pass
into this function, see
[Aggregate function calls](aggregate-function-calls.md).

This function can be used with the
[`AGGREGATION_THRESHOLD` clause](../googlesql-syntax/query-syntax-3.md#aggregation_threshold-clause).

To learn more about the `OVER` clause and how to use it, see
[Window function calls](window-function-calls.md).

**Return Data Type**

`FLOAT64`

**Examples**

```sql
SELECT COVAR_POP(y, x) AS results
FROM
  UNNEST(
    [
      STRUCT(1.0 AS y, 1.0 AS x),
      (2.0, 6.0),
      (9.0, 3.0),
      (2.0, 6.0),
      (9.0, 3.0)])

/*---------------------+
 | results             |
 +---------------------+
 | -1.6800000000000002 |
 +---------------------*/
```

```sql
SELECT
  item,
  y,
  x,
  COVAR_POP(y, x)
    OVER (
      ORDER BY item
      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS results
FROM
  UNNEST(
    [
      STRUCT(1 AS item, 1.0 AS y, 1.0 AS x),
      (2, 2.0, 6.0),
      (3, 9.0, 3.0),
      (4, 2.0, 6.0),
      (5, 9.0, 3.0)]);

/*------+-----+-----+---------------------+
 | item | y   | x   | results             |
 +------+-----+-----+---------------------+
 | 1    | 1.0 | 1.0 | 0                   |
 | 2    | 2.0 | 6.0 | 1.25                |
 | 3    | 9.0 | 3.0 | 0                   |
 | 4    | 2.0 | 6.0 | -1                  |
 | 5    | 9.0 | 3.0 | -1.6800000000000002 |
 +------+-----+-----+---------------------*/
```

```sql
SELECT COVAR_POP(y, x) AS results
FROM UNNEST([STRUCT(1.0 AS y, NULL AS x),(9.0, 3.0)])

/*---------+
 | results |
 +---------+
 | 0       |
 +---------*/
```

```sql
SELECT COVAR_POP(y, x) AS results
FROM UNNEST([STRUCT(1.0 AS y, NULL AS x),(9.0, NULL)])

/*---------+
 | results |
 +---------+
 | NULL    |
 +---------*/
```

```sql
SELECT COVAR_POP(y, x) AS results
FROM
  UNNEST(
    [
      STRUCT(1.0 AS y, 1.0 AS x),
      (2.0, 6.0),
      (9.0, 3.0),
      (2.0, 6.0),
      (NULL, 3.0)])

/*---------+
 | results |
 +---------+
 | -1      |
 +---------*/
```

```sql
SELECT COVAR_POP(y, x) AS results
FROM
  UNNEST(
    [
      STRUCT(1.0 AS y, 1.0 AS x),
      (2.0, 6.0),
      (9.0, 3.0),
      (2.0, 6.0),
      (CAST('Infinity' as FLOAT64), 3.0)])

/*---------+
 | results |
 +---------+
 | NaN     |
 +---------*/
```

### `COVAR_SAMP`

```sql
COVAR_SAMP(
  X1, X2
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

Returns the sample [covariance](https://en.wikipedia.org/wiki/Covariance) of a
set of number pairs. The first number is the dependent variable; the second
number is the independent variable. The return result is between `-Inf` and
`+Inf`.

All numeric types are supported. If the
input is `NUMERIC` or `BIGNUMERIC` then the internal aggregation is
stable with the final output converted to a `FLOAT64`.
Otherwise the input is converted to a `FLOAT64`
before aggregation, resulting in a potentially unstable result.

This function ignores any input pairs that contain one or more `NULL` values. If
there are fewer than two input pairs without `NULL` values, this function
returns `NULL`.

`NaN` is produced if:

- Any input value is `NaN`
- Any input value is positive infinity or negative infinity.

To learn more about the optional aggregate clauses that you can pass
into this function, see
[Aggregate function calls](aggregate-function-calls.md).

This function can be used with the
[`AGGREGATION_THRESHOLD` clause](../googlesql-syntax/query-syntax-3.md#aggregation_threshold-clause).

To learn more about the `OVER` clause and how to use it, see
[Window function calls](window-function-calls.md).

**Return Data Type**

`FLOAT64`

**Examples**

```sql
SELECT COVAR_SAMP(y, x) AS results
FROM
  UNNEST(
    [
      STRUCT(1.0 AS y, 1.0 AS x),
      (2.0, 6.0),
      (9.0, 3.0),
      (2.0, 6.0),
      (9.0, 3.0)])

/*---------+
 | results |
 +---------+
 | -2.1    |
 +---------*/
```

```sql
SELECT
  item,
  y,
  x,
  COVAR_SAMP(y, x)
    OVER (
      ORDER BY item
      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS results
FROM
  UNNEST(
    [
      STRUCT(1 AS item, 1.0 AS y, 1.0 AS x),
      (2, 2.0, 6.0),
      (3, 9.0, 3.0),
      (4, 2.0, 6.0),
      (5, 9.0, 3.0)]);

/*------+-----+-----+---------------------+
 | item | y   | x   | results             |
 +------+-----+-----+---------------------+
 | 1    | 1.0 | 1.0 | NULL                |
 | 2    | 2.0 | 6.0 | 2.5                 |
 | 3    | 9.0 | 3.0 | 0                   |
 | 4    | 2.0 | 6.0 | -1.3333333333333333 |
 | 5    | 9.0 | 3.0 | -2.1                |
 +------+-----+-----+---------------------*/
```

```sql
SELECT COVAR_SAMP(y, x) AS results
FROM
  UNNEST(
    [
      STRUCT(1.0 AS y, 1.0 AS x),
      (2.0, 6.0),
      (9.0, 3.0),
      (2.0, 6.0),
      (NULL, 3.0)])

/*----------------------+
 | results              |
 +----------------------+
 | -1.3333333333333333  |
 +----------------------*/
```

```sql
SELECT COVAR_SAMP(y, x) AS results
FROM UNNEST([STRUCT(1.0 AS y, NULL AS x),(9.0, 3.0)])

/*---------+
 | results |
 +---------+
 | NULL    |
 +---------*/
```

```sql
SELECT COVAR_SAMP(y, x) AS results
FROM UNNEST([STRUCT(1.0 AS y, NULL AS x),(9.0, NULL)])

/*---------+
 | results |
 +---------+
 | NULL    |
 +---------*/
```

```sql
SELECT COVAR_SAMP(y, x) AS results
FROM
  UNNEST(
    [
      STRUCT(1.0 AS y, 1.0 AS x),
      (2.0, 6.0),
      (9.0, 3.0),
      (2.0, 6.0),
      (CAST('Infinity' as FLOAT64), 3.0)])

/*---------+
 | results |
 +---------+
 | NaN     |
 +---------*/
```

### `STDDEV`

```sql
STDDEV(
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

An alias of [STDDEV_SAMP](#stddev_samp).

### `STDDEV_POP`

```sql
STDDEV_POP(
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

Returns the population (biased) standard deviation of the values. The return
result is between `0` and `+Inf`.

All numeric types are supported. If the
input is `NUMERIC` or `BIGNUMERIC` then the internal aggregation is
stable with the final output converted to a `FLOAT64`.
Otherwise the input is converted to a `FLOAT64`
before aggregation, resulting in a potentially unstable result.

This function ignores any `NULL` inputs. If all inputs are ignored, this
function returns `NULL`. If this function receives a single non-`NULL` input,
it returns `0`.

`NaN` is produced if:

- Any input value is `NaN`
- Any input value is positive infinity or negative infinity.

To learn more about the optional aggregate clauses that you can pass
into this function, see
[Aggregate function calls](aggregate-function-calls.md).

This function can be used with the
[`AGGREGATION_THRESHOLD` clause](../googlesql-syntax/query-syntax-3.md#aggregation_threshold-clause).

If this function is used with the `OVER` clause, it's part of a
window function call. In a window function call,
aggregate function clauses can't be used.
To learn more about the `OVER` clause and how to use it, see
[Window function calls](window-function-calls.md).

**Return Data Type**

`FLOAT64`

**Examples**

```sql
SELECT STDDEV_POP(x) AS results FROM UNNEST([10, 14, 18]) AS x

/*-------------------+
 | results           |
 +-------------------+
 | 3.265986323710904 |
 +-------------------*/
```

```sql
SELECT
  x,
  STDDEV_POP(x)
    OVER (
      ORDER BY x
      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS results
FROM UNNEST([10, 14, 18]) AS x;

/*----+-------------------+
 | x  | results           |
 +----+-------------------+
 | 10 | 0                 |
 | 14 | 2                 |
 | 18 | 3.265986323710904 |
 +----+-------------------*/
```

```sql
SELECT STDDEV_POP(x) AS results FROM UNNEST([10, 14, NULL]) AS x

/*---------+
 | results |
 +---------+
 | 2       |
 +---------*/
```

```sql
SELECT STDDEV_POP(x) AS results FROM UNNEST([10, NULL]) AS x

/*---------+
 | results |
 +---------+
 | 0       |
 +---------*/
```

```sql
SELECT STDDEV_POP(x) AS results FROM UNNEST([NULL]) AS x

/*---------+
 | results |
 +---------+
 | NULL    |
 +---------*/
```

```sql
SELECT STDDEV_POP(x) AS results FROM UNNEST([10, 14, CAST('Infinity' as FLOAT64)]) AS x

/*---------+
 | results |
 +---------+
 | NaN     |
 +---------*/
```

### `STDDEV_SAMP`

```sql
STDDEV_SAMP(
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

Returns the sample (unbiased) standard deviation of the values. The return
result is between `0` and `+Inf`.

All numeric types are supported. If the
input is `NUMERIC` or `BIGNUMERIC` then the internal aggregation is
stable with the final output converted to a `FLOAT64`.
Otherwise the input is converted to a `FLOAT64`
before aggregation, resulting in a potentially unstable result.

This function ignores any `NULL` inputs. If there are fewer than two non-`NULL`
inputs, this function returns `NULL`.

`NaN` is produced if:

- Any input value is `NaN`
- Any input value is positive infinity or negative infinity.

To learn more about the optional aggregate clauses that you can pass
into this function, see
[Aggregate function calls](aggregate-function-calls.md).

This function can be used with the
[`AGGREGATION_THRESHOLD` clause](../googlesql-syntax/query-syntax-3.md#aggregation_threshold-clause).

If this function is used with the `OVER` clause, it's part of a
window function call. In a window function call,
aggregate function clauses can't be used.
To learn more about the `OVER` clause and how to use it, see
[Window function calls](window-function-calls.md).

**Return Data Type**

`FLOAT64`

**Examples**

```sql
SELECT STDDEV_SAMP(x) AS results FROM UNNEST([10, 14, 18]) AS x

/*---------+
 | results |
 +---------+
 | 4       |
 +---------*/
```

```sql
SELECT
  x,
  STDDEV_SAMP(x)
    OVER (
      ORDER BY x
      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS results
FROM UNNEST([10, 14, 18]) AS x;

/*----+--------------------+
 | x  | results            |
 +----+--------------------+
 | 10 | NULL               |
 | 14 | 2.8284271247461903 |
 | 18 | 4                  |
 +----+--------------------*/
```

```sql
SELECT STDDEV_SAMP(x) AS results FROM UNNEST([10, 14, NULL]) AS x

/*--------------------+
 | results            |
 +--------------------+
 | 2.8284271247461903 |
 +--------------------*/
```

```sql
SELECT STDDEV_SAMP(x) AS results FROM UNNEST([10, NULL]) AS x

/*---------+
 | results |
 +---------+
 | NULL    |
 +---------*/
```

```sql
SELECT STDDEV_SAMP(x) AS results FROM UNNEST([NULL]) AS x

/*---------+
 | results |
 +---------+
 | NULL    |
 +---------*/
```

```sql
SELECT STDDEV_SAMP(x) AS results FROM UNNEST([10, 14, CAST('Infinity' as FLOAT64)]) AS x

/*---------+
 | results |
 +---------+
 | NaN     |
 +---------*/
```

### `VAR_POP`

```sql
VAR_POP(
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

Returns the population (biased) variance of the values. The return result is
between `0` and `+Inf`.

All numeric types are supported. If the
input is `NUMERIC` or `BIGNUMERIC` then the internal aggregation is
stable with the final output converted to a `FLOAT64`.
Otherwise the input is converted to a `FLOAT64`
before aggregation, resulting in a potentially unstable result.

This function ignores any `NULL` inputs. If all inputs are ignored, this
function returns `NULL`. If this function receives a single non-`NULL` input,
it returns `0`.

`NaN` is produced if:

- Any input value is `NaN`
- Any input value is positive infinity or negative infinity.

If this function is used with the `OVER` clause, it's part of a
window function call. In a window function call,
aggregate function clauses can't be used.
To learn more about the `OVER` clause and how to use it, see
[Window function calls](window-function-calls.md).

**Return Data Type**

`FLOAT64`

**Examples**

```sql
SELECT VAR_POP(x) AS results FROM UNNEST([10, 14, 18]) AS x

/*--------------------+
 | results            |
 +--------------------+
 | 10.666666666666666 |
 +--------------------*/
```

```sql
SELECT
  x,
  VAR_POP(x)
    OVER (
      ORDER BY x
      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS results
FROM UNNEST([10, 14, 18]) AS x;

/*----+--------------------+
 | x  | results            |
 +----+--------------------+
 | 10 | 0                  |
 | 14 | 4                  |
 | 18 | 10.666666666666666 |
 +----+--------------------*/
```

```sql
SELECT VAR_POP(x) AS results FROM UNNEST([10, 14, NULL]) AS x

/*----------+
 | results |
 +---------+
 | 4       |
 +---------*/
```

```sql
SELECT VAR_POP(x) AS results FROM UNNEST([10, NULL]) AS x

/*----------+
 | results |
 +---------+
 | 0       |
 +---------*/
```

```sql
SELECT VAR_POP(x) AS results FROM UNNEST([NULL]) AS x

/*---------+
 | results |
 +---------+
 | NULL    |
 +---------*/
```

```sql
SELECT VAR_POP(x) AS results FROM UNNEST([10, 14, CAST('Infinity' as FLOAT64)]) AS x

/*---------+
 | results |
 +---------+
 | NaN     |
 +---------*/
```

### `VAR_SAMP`

```sql
VAR_SAMP(
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

Returns the sample (unbiased) variance of the values. The return result is
between `0` and `+Inf`.

All numeric types are supported. If the
input is `NUMERIC` or `BIGNUMERIC` then the internal aggregation is
stable with the final output converted to a `FLOAT64`.
Otherwise the input is converted to a `FLOAT64`
before aggregation, resulting in a potentially unstable result.

This function ignores any `NULL` inputs. If there are fewer than two non-`NULL`
inputs, this function returns `NULL`.

`NaN` is produced if:

- Any input value is `NaN`
- Any input value is positive infinity or negative infinity.

To learn more about the optional aggregate clauses that you can pass
into this function, see
[Aggregate function calls](aggregate-function-calls.md).

This function can be used with the
[`AGGREGATION_THRESHOLD` clause](../googlesql-syntax/query-syntax-3.md#aggregation_threshold-clause).

If this function is used with the `OVER` clause, it's part of a
window function call. In a window function call,
aggregate function clauses can't be used.
To learn more about the `OVER` clause and how to use it, see
[Window function calls](window-function-calls.md).

**Return Data Type**

`FLOAT64`

**Examples**

```sql
SELECT VAR_SAMP(x) AS results FROM UNNEST([10, 14, 18]) AS x

/*---------+
 | results |
 +---------+
 | 16      |
 +---------*/
```

```sql
SELECT
  x,
  VAR_SAMP(x)
    OVER (
      ORDER BY x
      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS results
FROM UNNEST([10, 14, 18]) AS x;

/*----+---------+
 | x  | results |
 +----+---------+
 | 10 | NULL    |
 | 14 | 8       |
 | 18 | 16      |
 +----+---------*/
```

```sql
SELECT VAR_SAMP(x) AS results FROM UNNEST([10, 14, NULL]) AS x

/*---------+
 | results |
 +---------+
 | 8       |
 +---------*/
```

```sql
SELECT VAR_SAMP(x) AS results FROM UNNEST([10, NULL]) AS x

/*---------+
 | results |
 +---------+
 | NULL    |
 +---------*/
```

```sql
SELECT VAR_SAMP(x) AS results FROM UNNEST([NULL]) AS x

/*---------+
 | results |
 +---------+
 | NULL    |
 +---------*/
```

```sql
SELECT VAR_SAMP(x) AS results FROM UNNEST([10, 14, CAST('Infinity' as FLOAT64)]) AS x

/*---------+
 | results |
 +---------+
 | NaN     |
 +---------*/
```

### `VARIANCE`

```sql
VARIANCE(
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

An alias of [VAR_SAMP](#var_samp).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: The result shows `--1.3333333333333333` with a doubled minus sign. The same four non-NULL pairs give `-1.3333333333333333` in the preceding window example on this page, so the sign is corrected.

## Related

- [Index of this directory](./README.md)

---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/aggregate-dp-functions
---

# Differentially private aggregate functions

## Signature / Usage

GoogleSQL for BigQuery supports differentially private aggregate functions.
For an explanation of how aggregate functions work, see
[Aggregate function calls](aggregate-function-calls.md).

You can only use differentially private aggregate functions with
[differentially private queries](https://docs.cloud.google.com/bigquery/docs/differential-privacy) in a
[differential privacy clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#dp_clause).

> [!NOTE]
> **Note:** In this topic, the privacy parameters in the examples aren't recommendations. You should work with your privacy or security officer to determine the optimal privacy parameters for your dataset and organization.

### Function list

| Name | Summary |
|---|---|
| [`AVG` (Differential Privacy)](#avg-differential_privacy) | `DIFFERENTIAL_PRIVACY`-supported `AVG`. Gets the differentially-private average of non-`NULL`, non-`NaN` values in a query with a `DIFFERENTIAL_PRIVACY` clause. |
| [`COUNT` (Differential Privacy)](#count-differential_privacy) | `DIFFERENTIAL_PRIVACY`-supported `COUNT`. Signature 1: Gets the differentially-private count of rows in a query with a `DIFFERENTIAL_PRIVACY` clause. <br /> Signature 2: Gets the differentially-private count of rows with a non-`NULL` expression in a query with a `DIFFERENTIAL_PRIVACY` clause. |
| [`PERCENTILE_CONT` (Differential Privacy)](#percentile_cont-differential_privacy) | `DIFFERENTIAL_PRIVACY`-supported `PERCENTILE_CONT`. Computes a differentially-private percentile across privacy unit columns in a query with a `DIFFERENTIAL_PRIVACY` clause. |
| [`SUM` (Differential Privacy)](#sum-differential_privacy) | `DIFFERENTIAL_PRIVACY`-supported `SUM`. Gets the differentially-private sum of non-`NULL`, non-`NaN` values in a query with a `DIFFERENTIAL_PRIVACY` clause. |

### `AVG` (`DIFFERENTIAL_PRIVACY`)

```sql
WITH DIFFERENTIAL_PRIVACY ...
  AVG(
    expression,
    [ contribution_bounds_per_group => (lower_bound, upper_bound) ]
  )
```

**Description**

Returns the average of non-`NULL`, non-`NaN` values in the expression.
This function first computes the average per privacy unit column, and then
computes the final result by averaging these averages.

You can't use an `AVG` (`DIFFERENTIAL_PRIVACY`) function with
[multi-level aggregation](aggregate-function-calls.md#multi-level-aggregation).

This function must be used with the [`DIFFERENTIAL_PRIVACY` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#dp_clause)
and can support the following arguments:

- `expression`: The input expression. This can be any numeric input type, such as `INT64`.
- `contribution_bounds_per_group`: A named argument with a [contribution bound](#explicitly-clamp-values). Performs clamping for each group separately before performing intermediate grouping on the privacy unit column.

**Return type**

`FLOAT64`

**Examples**

The following differentially private query gets the average number of each item
requested per professor. Smaller aggregations might not be included. This query
references a table called [`professors`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#dp_example_tables).

```sql
-- With noise, using the epsilon parameter.
SELECT
  WITH DIFFERENTIAL_PRIVACY
    OPTIONS(epsilon=10, delta=.01, max_groups_contributed=1, privacy_unit_column=id)
    item,
    AVG(quantity, contribution_bounds_per_group => (0,100)) average_quantity
FROM professors
GROUP BY item;

-- These results will change each time you run the query.
-- Smaller aggregations might be removed.
/*----------+------------------+
 | item     | average_quantity |
 +----------+------------------+
 | pencil   | 38.5038356810269 |
 | pen      | 13.4725028762032 |
 +----------+------------------*/
```

```sql
-- Without noise, using the epsilon parameter.
-- (this un-noised version is for demonstration only)
SELECT
  WITH DIFFERENTIAL_PRIVACY
    OPTIONS(epsilon=1e20, delta=.01, max_groups_contributed=1, privacy_unit_column=id)
    item,
    AVG(quantity) average_quantity
FROM professors
GROUP BY item;

-- These results will not change when you run the query.
/*----------+------------------+
 | item     | average_quantity |
 +----------+------------------+
 | scissors | 8                |
 | pencil   | 40               |
 | pen      | 18.5             |
 +----------+------------------*/
```

> [!NOTE]
> **Note:** For more information about when and when not to use noise, see [Remove noise](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#eliminate_noise).

### `COUNT` (`DIFFERENTIAL_PRIVACY`)

- [Signature 1](#signature-1): Returns the number of rows in a differentially private `FROM` clause.
- [Signature 2](#signature-2): Returns the number of non-`NULL` values in an expression.

##### Signature 1

```sql
WITH DIFFERENTIAL_PRIVACY ...
  COUNT(
    *,
    [ contribution_bounds_per_group => (lower_bound, upper_bound) ]
  )
```

**Description**

Returns the number of rows in the
[differentially private](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#dp_clause) `FROM` clause. The final result
is an aggregation across a privacy unit column.

You can't use a `COUNT` (`DIFFERENTIAL_PRIVACY`) function with
[multi-level aggregation](aggregate-function-calls.md#multi-level-aggregation).

This function must be used with the [`DIFFERENTIAL_PRIVACY` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#dp_clause)
and can support the following arguments:

- `contribution_bounds_per_group`: A named argument with a [contribution bound](#explicitly-clamp-values). Performs clamping for each group separately before performing intermediate grouping on the privacy unit column.

**Return type**

`INT64`

**Examples**

The following differentially private query counts the number of requests for
each item. This query references a table called
[`professors`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#dp_example_tables).

```sql
-- With noise, using the epsilon parameter.
SELECT
  WITH DIFFERENTIAL_PRIVACY
    OPTIONS(epsilon=10, delta=.01, max_groups_contributed=1, privacy_unit_column=id)
    item,
    COUNT(*, contribution_bounds_per_group=>(0, 100)) times_requested
FROM professors
GROUP BY item;

-- These results will change each time you run the query.
-- Smaller aggregations might be removed.
/*----------+-----------------+
 | item     | times_requested |
 +----------+-----------------+
 | pencil   | 5               |
 | pen      | 2               |
 +----------+-----------------*/
```

```sql
-- Without noise, using the epsilon parameter.
-- (this un-noised version is for demonstration only)
SELECT
  WITH DIFFERENTIAL_PRIVACY
    OPTIONS(epsilon=1e20, delta=.01, max_groups_contributed=1, privacy_unit_column=id)
    item,
    COUNT(*, contribution_bounds_per_group=>(0, 100)) times_requested
FROM professors
GROUP BY item;

-- These results will not change when you run the query.
/*----------+-----------------+
 | item     | times_requested |
 +----------+-----------------+
 | scissors | 1               |
 | pencil   | 4               |
 | pen      | 3               |
 +----------+-----------------*/
```

> [!NOTE]
> **Note:** For more information about when and when not to use noise, see [Remove noise](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#eliminate_noise).

##### Signature 2

```sql
WITH DIFFERENTIAL_PRIVACY ...
  COUNT(
    expression,
    [ contribution_bounds_per_group => (lower_bound, upper_bound) ]
  )
```

**Description**

Returns the number of non-`NULL` expression values. The final result is an
aggregation across a privacy unit column.

This function must be used with the [`DIFFERENTIAL_PRIVACY` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#dp_clause)
and can support these arguments:

- `expression`: The input expression. This expression can be any numeric input type, such as `INT64`.
- `contribution_bounds_per_group`: A named argument with a [contribution bound](#explicitly-clamp-values). Performs clamping per each group separately before performing intermediate grouping on the privacy unit column.

**Return type**

`INT64`

**Examples**

The following differentially private query counts the number of requests made
for each type of item. This query references a table called
[`professors`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#dp_example_tables).

```sql
-- With noise, using the epsilon parameter.
SELECT
  WITH DIFFERENTIAL_PRIVACY
    OPTIONS(epsilon=10, delta=.01, max_groups_contributed=1, privacy_unit_column=id)
    item,
    COUNT(item, contribution_bounds_per_group => (0,100)) times_requested
FROM professors
GROUP BY item;

-- These results will change each time you run the query.
-- Smaller aggregations might be removed.
/*----------+-----------------+
 | item     | times_requested |
 +----------+-----------------+
 | pencil   | 5               |
 | pen      | 2               |
 +----------+-----------------*/
```

```sql
-- Without noise, using the epsilon parameter.
-- (this un-noised version is for demonstration only)
SELECT
  WITH DIFFERENTIAL_PRIVACY
    OPTIONS(epsilon=1e20, delta=.01, max_groups_contributed=1, privacy_unit_column=id)
    item,
    COUNT(item, contribution_bounds_per_group => (0,100)) times_requested
FROM professors
GROUP BY item;

-- These results will not change when you run the query.
/*----------+-----------------+
 | item     | times_requested |
 +----------+-----------------+
 | scissors | 1               |
 | pencil   | 4               |
 | pen      | 3               |
 +----------+-----------------*/
```

> [!NOTE]
> **Note:** For more information about when and when not to use noise, see [Remove noise](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#eliminate_noise).

### `PERCENTILE_CONT` (`DIFFERENTIAL_PRIVACY`)

```sql
WITH DIFFERENTIAL_PRIVACY ...
  PERCENTILE_CONT(
    expression,
    percentile,
    contribution_bounds_per_row => (lower_bound, upper_bound)
  )
```

**Description**

Takes an expression and computes a percentile for it. The final result is an
aggregation across privacy unit columns.

You can't use a `PERCENTILE_CONT` (`DIFFERENTIAL_PRIVACY`) function with
[multi-level aggregation](aggregate-function-calls.md#multi-level-aggregation).

This function must be used with the [`DIFFERENTIAL_PRIVACY` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#dp_clause)
and can support these arguments:

- `expression`: The input expression. This can be most numeric input types, such as `INT64`. `NULL` values are always ignored.
- `percentile`: The percentile to compute. The percentile must be a literal in the range `[0, 1]`.
- `contribution_bounds_per_row`: A named argument with a [contribution bounds](#explicitly-clamp-values). Performs clamping for each row separately before performing intermediate grouping on the privacy unit column.

`NUMERIC` and `BIGNUMERIC` arguments aren't allowed.
If you need them, cast them as the
`FLOAT64` data type first.

**Return type**

`FLOAT64`

**Examples**

The following differentially private query gets the percentile of items
requested. Smaller aggregations might not be included. This query references a
view called [`professors`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#dp_example_tables).

```sql
-- With noise, using the epsilon parameter.
SELECT
  WITH DIFFERENTIAL_PRIVACY
    OPTIONS(epsilon=10, delta=.01, max_groups_contributed=1, privacy_unit_column=id)
    item,
    PERCENTILE_CONT(quantity, 0.5, contribution_bounds_per_row => (0,100)) percentile_requested
FROM professors
GROUP BY item;

-- These results will change each time you run the query.
-- Smaller aggregations might be removed.
 /*----------+----------------------+
  | item     | percentile_requested |
  +----------+----------------------+
  | pencil   | 72.00011444091797    |
  | scissors | 8.000175476074219    |
  | pen      | 23.001075744628906   |
  +----------+----------------------*/
```

### `SUM` (`DIFFERENTIAL_PRIVACY`)

```sql
WITH DIFFERENTIAL_PRIVACY ...
  SUM(
    expression,
    [ contribution_bounds_per_group => (lower_bound, upper_bound) ]
  )
```

**Description**

Returns the sum of non-`NULL`, non-`NaN` values in the expression. The final
result is an aggregation across privacy unit columns.

You can't use a `SUM` (`DIFFERENTIAL_PRIVACY`) function with
[multi-level aggregation](aggregate-function-calls.md#multi-level-aggregation).

This function must be used with the [`DIFFERENTIAL_PRIVACY` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#dp_clause)
and can support these arguments:

- `expression`: The input expression. This can be any numeric input type, such as `INT64`. `NULL` values are always ignored.
- `contribution_bounds_per_group`: A named argument with a [contribution bound](#explicitly-clamp-values). Performs clamping for each group separately before performing intermediate grouping on the privacy unit column.

**Return type**

One of the following [supertypes](../googlesql-syntax/conversion_rules.md#supertypes):

- `INT64`
- `FLOAT64`

**Examples**

The following differentially private query gets the sum of items requested.
Smaller aggregations might not be included. This query references a view called
[`professors`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#dp_example_tables).

```sql
-- With noise, using the epsilon parameter.
SELECT
  WITH DIFFERENTIAL_PRIVACY
    OPTIONS(epsilon=10, delta=.01, max_groups_contributed=1, privacy_unit_column=id)
    item,
    SUM(quantity, contribution_bounds_per_group => (0,100)) quantity
FROM professors
GROUP BY item;

-- These results will change each time you run the query.
-- Smaller aggregations might be removed.
/*----------+-----------+
 | item     | quantity  |
 +----------+-----------+
 | pencil   | 143       |
 | pen      | 59        |
 +----------+-----------*/
```

```sql
-- Without noise, using the epsilon parameter.
-- (this un-noised version is for demonstration only)
SELECT
  WITH DIFFERENTIAL_PRIVACY
    OPTIONS(epsilon=1e20, delta=.01, max_groups_contributed=1, privacy_unit_column=id)
    item,
    SUM(quantity) quantity
FROM professors
GROUP BY item;

-- These results will not change when you run the query.
/*----------+----------+
 | item     | quantity |
 +----------+----------+
 | scissors | 8        |
 | pencil   | 144      |
 | pen      | 58       |
 +----------+----------*/
```

> [!NOTE]
> **Note:** For more information about when and when not to use noise, see [Use differential privacy](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#eliminate_noise).

### Supplemental materials

#### Clamp values in a differentially private aggregate function

In [differentially private queries](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#dp_clause),
aggregation clamping is used to limit the contribution of outliers. You can
clamp explicitly or implicitly as follows:

- [Clamp explicitly in the `DIFFERENTIAL_PRIVACY` clause](#explicitly-clamp-values).
- [Clamp implicitly in the `DIFFERENTIAL_PRIVACY` clause](#implicitly-clamp-values).

##### Implicitly clamp values

If you don't include the contribution bounds named argument with the
`DIFFERENTIAL_PRIVACY` clause, clamping is implicit, which
means bounds are derived from the data itself in a differentially private way.

Implicit bounding works best when computed using large datasets. For more
information, see
[Implicit bounding limitations for small datasets](https://docs.cloud.google.com/bigquery/docs/differential-privacy#implicit_limits).

**Details**

In differentially private aggregate functions, explicit clamping is optional.
If you don't include this clause, clamping is implicit,
which means bounds are derived from the data itself in a differentially
private way. The process is somewhat random, so aggregations with identical
ranges can have different bounds.

Implicit bounds are determined for each aggregation. So if some
aggregations have a wide range of values, and others have a narrow range of
values, implicit bounding can identify different bounds for different
aggregations as appropriate. Implicit bounds might be an advantage or a
disadvantage depending on your use case. Different bounds for different
aggregations can result in lower error. Different bounds also means that
different aggregations have different levels of uncertainty, which might not be
directly comparable. [Explicit bounds](#explicitly-clamp-values), on the other hand,
apply uniformly to all aggregations and should be derived from public
information.

When clamping is implicit, part of the total epsilon is spent picking bounds.
This leaves less epsilon for aggregations, so these aggregations are noisier.

##### Explicitly clamp values

```sql
contribution_bounds_per_group => (lower_bound,upper_bound)
```

```sql
contribution_bounds_per_row => (lower_bound,upper_bound)
```

Use the contribution bounds named argument to explicitly clamp
values per group or per row between a lower and upper bound in a
`DIFFERENTIAL_PRIVACY` clause.

Input values:

- `contribution_bounds_per_row`: Contributions per privacy unit are clamped on a per-row (per-record) basis. This means the following:
  - Upper and lower bounds are applied to column values in individual rows produced by the input subquery independently.
  - The maximum possible contribution per privacy unit (and per grouping set) is the product of the per-row contribution limit and `max_groups_contributed` differential privacy parameter.
- `contribution_bounds_per_group`: Contributions per privacy unit are clamped on a unique set of entity-specified `GROUP BY` keys. The upper and lower bounds are applied to values per group after the values are aggregated per privacy unit.
- `lower_bound`: Numeric literal that represents the smallest value to include in an aggregation.
- `upper_bound`: Numeric literal that represents the largest value to include in an aggregation.

`NUMERIC` and `BIGNUMERIC` arguments aren't allowed.

**Details**

In differentially private aggregate functions, clamping explicitly clamps the
total contribution from each privacy unit column to within a specified
range.

Explicit bounds are uniformly applied to all aggregations. So even if some
aggregations have a wide range of values, and others have a narrow range of
values, the same bounds are applied to all of them. On the other hand, when
[implicit bounds](#implicitly-clamp-values) are inferred from the data, the bounds
applied to each aggregation can be different.

Explicit bounds should be chosen to reflect public information.
For example, bounding ages between 0 and 100 reflects public information
because the age of most people generally falls within this range.

> [!IMPORTANT]
> **Important:** The results of the query reveal the explicit bounds. Don't use explicit bounds based on the entity data; explicit bounds should be based on public information.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/aggregate-dp-functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

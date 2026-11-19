---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/kll_functions
---

# KLL quantile functions

## Signature / Usage

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

GoogleSQL for BigQuery supports KLL functions.

The KLL16 algorithm estimates
quantiles from [sketches](https://docs.cloud.google.com/bigquery/docs/sketches#sketches_kll). If you don't want
to work with sketches and don't need customized precision, consider
using [approximate aggregate functions](approximate_aggregate_functions.md)
with system-defined precision.

KLL functions are approximate aggregate functions.
Approximate aggregation requires significantly less memory than an exact
quantiles computation, but also introduces statistical error.
This makes approximate aggregation appropriate for large data streams for
which linear memory usage is impractical, as well as for data that is
already approximate.

Due to the non-deterministic nature of the KLL algorithm, sketches created
on the same set of data with the same precision might not be identical, leading
to variation in the approximate quantile results.

> [!NOTE]
> **Note:** While `APPROX_QUANTILES` is also returning approximate quantile results, the functions from this section allow for partial aggregations and re-aggregations.

### Function list

| Name | Summary |
|---|---|
| [`KLL_QUANTILES.EXTRACT_INT64`](#kll_quantilesextract_int64) | Gets a selected number of quantiles from an `INT64`-initialized KLL sketch. |
| [`KLL_QUANTILES.EXTRACT_FLOAT64`](#kll_quantilesextract_float64) | Gets a selected number of quantiles from a `FLOAT64`-initialized KLL sketch. |
| [`KLL_QUANTILES.EXTRACT_POINT_INT64`](#kll_quantilesextract_point_int64) | Gets a specific quantile from an `INT64`-initialized KLL sketch. |
| [`KLL_QUANTILES.EXTRACT_POINT_FLOAT64`](#kll_quantilesextract_point_float64) | Gets a specific quantile from a `FLOAT64`-initialized KLL sketch. |
| [`KLL_QUANTILES.INIT_INT64`](#kll_quantilesinit_int64) | Aggregates values into an `INT64`-initialized KLL sketch. |
| [`KLL_QUANTILES.INIT_FLOAT64`](#kll_quantilesinit_float64) | Aggregates values into a `FLOAT64`-initialized KLL sketch. |
| [`KLL_QUANTILES.MERGE_INT64`](#kll_quantilesmerge_int64) | Merges `INT64`-initialized KLL sketches into a new sketch, and then gets the quantiles from the new sketch. |
| [`KLL_QUANTILES.MERGE_FLOAT64`](#kll_quantilesmerge_float64) | Merges `FLOAT64`-initialized KLL sketches into a new sketch, and then gets the quantiles from the new sketch. |
| [`KLL_QUANTILES.MERGE_PARTIAL`](#kll_quantilesmerge_partial) | Merges KLL sketches of the same underlying type into a new sketch. |
| [`KLL_QUANTILES.MERGE_POINT_INT64`](#kll_quantilesmerge_point_int64) | Merges `INT64`-initialized KLL sketches into a new sketch, and then gets a specific quantile from the new sketch. |
| [`KLL_QUANTILES.MERGE_POINT_FLOAT64`](#kll_quantilesmerge_point_float64) | Merges `FLOAT64`-initialized KLL sketches into a new sketch, and then gets a specific quantile from the new sketch. |

### `KLL_QUANTILES.EXTRACT_INT64`

```sql
KLL_QUANTILES.EXTRACT_INT64(sketch, num_quantiles)
```

**Description**

Gets a selected number of approximate quantiles from an
`INT64`-initialized KLL sketch, including the minimum value and the
maximum value in the input set.

**Supported Argument Types**

- `sketch`: `BYTES` KLL sketch initialized on the `INT64` data type. If this isn't a valid KLL quantiles sketch, or if the underlying data type is different from `INT64`, an error is produced.
- `num_quantiles`: A positive `INT64` value that represents the number of roughly equal-sized subsets that the quantiles partition the sketch-captured input values into. The maximum value is 100,000.

**Details**

The number of returned values produced is always `num_quantiles + 1` as
an array in this order:

- minimum value in input set
- each approximate quantile
- maximum value in input set

For example, if `num_quantiles` is `3`, and the result of this function
is `[0, 34, 67, 100]`, this means that `0` is the minimum value,
`34` and `67` are the approximate quantiles, and `100` is the maximum value.
In addition, the result represents the following three segments:
`0 to 34`, `34 to 67`, and `67 to 100`.

> [!NOTE]
> **Note:** This scalar function is similar to the aggregate function `KLL_QUANTILES.MERGE_INT64`.

**Return Type**

`ARRAY<INT64>`

**Example**

The following query initializes a KLL sketch, `kll_sketch`, from `Data`, and
then extracts the minimum value (`1`), the maximum value (`100`), and
approximate quantiles in between.

```sql
WITH Data AS (
  SELECT x FROM UNNEST(GENERATE_ARRAY(1, 100)) AS x
)
SELECT
  KLL_QUANTILES.EXTRACT_INT64(kll_sketch, 2) AS halves,
  KLL_QUANTILES.EXTRACT_INT64(kll_sketch, 3) AS terciles,
  KLL_QUANTILES.EXTRACT_INT64(kll_sketch, 4) AS quartiles,
  KLL_QUANTILES.EXTRACT_INT64(kll_sketch, 6) AS sextiles,
FROM (SELECT KLL_QUANTILES.INIT_INT64(x, 1000) AS kll_sketch FROM Data);

/*------------+---------------+------------------+------------------------+
 | halves     | terciles      | quartiles        | sextiles               |
 +------------+---------------+------------------+------------------------+
 | [1,50,100] | [1,34,67,100] | [1,25,50,75,100] | [1,17,34,50,67,84,100] |
 +------------+---------------+------------------+------------------------*/
```

### `KLL_QUANTILES.EXTRACT_FLOAT64`

```sql
KLL_QUANTILES.EXTRACT_FLOAT64(sketch, num_quantiles)
```

**Description**

Like [`KLL_QUANTILES.EXTRACT_INT64`](#kll_quantilesextract_int64),
but accepts KLL sketches initialized on data of type
`FLOAT64`.

**Return Type**

`ARRAY<FLOAT64>`

### `KLL_QUANTILES.EXTRACT_POINT_INT64`

```sql
KLL_QUANTILES.EXTRACT_POINT_INT64(sketch, phi)
```

**Description**

Takes a single KLL sketch as `BYTES` and returns a single quantile.
The `phi` argument specifies the quantile to return as a fraction of the total
number of rows in the input, normalized between 0 and 1. This means that the
function will return a value *v* such that approximately Φ \* *n* inputs are less
than or equal to *v* , and a (1-Φ) \* *n* inputs are greater than or equal to *v*.
This is a scalar function.

Returns an error if the underlying type of the input sketch isn't compatible
with type `INT64`.

Returns an error if the input isn't a valid KLL quantiles sketch.

**Supported Argument Types**

- `sketch`: `BYTES` KLL sketch initialized on `INT64` data type
- `phi`: `FLOAT64` between 0 and 1

**Return Type**

`INT64`

**Example**

The following query initializes a KLL sketch from five rows of data. Then
it returns the value of the eighth decile or 80th percentile of the sketch.

```sql
SELECT KLL_QUANTILES.EXTRACT_POINT_INT64(kll_sketch, .8) AS quintile
FROM (SELECT KLL_QUANTILES.INIT_INT64(x, 1000) AS kll_sketch
      FROM (SELECT 1 AS x UNION ALL
            SELECT 2 AS x UNION ALL
            SELECT 3 AS x UNION ALL
            SELECT 4 AS x UNION ALL
            SELECT 5 AS x));

/*----------+
 | quintile |
 +----------+
 |      4   |
 +----------*/
```

### `KLL_QUANTILES.EXTRACT_POINT_FLOAT64`

```sql
KLL_QUANTILES.EXTRACT_POINT_FLOAT64(sketch, phi)
```

**Description**

Like [`KLL_QUANTILES.EXTRACT_POINT_INT64`](#kll_quantilesextract_point_int64),
but accepts KLL sketches initialized on data of type
`FLOAT64`.

**Supported Argument Types**

- `sketch`: `BYTES` KLL sketch initialized on `FLOAT64` data type
- `phi`: `FLOAT64` between 0 and 1

**Return Type**

`FLOAT64`

### `KLL_QUANTILES.INIT_INT64`

```sql
KLL_QUANTILES.INIT_INT64(
  input
  [, precision [, weight => input_weight ]]
)
```

**Description**

Takes one or more `input` values and aggregates them into a
[KLL](https://docs.cloud.google.com/bigquery/docs/sketches#sketches_kll) sketch. This function represents the output sketch
using the `BYTES` data type. This is an
aggregate function.

**Supported Argument Types**

- `input`: `INT64`
- `precision`: An `INT64` value that defines the exactness of the returned approximate quantile *q* . The default value is 1000. For more information about precision, see [Precision for KLL sketches](https://docs.cloud.google.com/bigquery/docs/sketches#precision_kll). The value of `precision` must be between 1 and 100,000.
- `input_weight`: `INT64`. By default, values in an initialized KLL sketch are weighted equally as `1`. To weight values differently, use the named argument, `weight`, which assigns a weight to each input in the resulting KLL sketch. `weight` is a multiplier. For example, if you assign a weight of `3` to an input value, it's as if three instances of the input value are included in the generation of the KLL sketch. The minimum value for `weight` is `1` and the maximum value is `2,147,483,647`.

**Return Type**

KLL sketch as `BYTES`

**Examples**

The following query takes a column of type `INT64` and outputs a sketch as
`BYTES` that allows you to retrieve values whose ranks are within
±1/1000 \* 5 = ±1/200 ≈ 0 ranks of their exact quantile.

```sql
SELECT KLL_QUANTILES.INIT_INT64(x, 1000) AS kll_sketch
FROM (SELECT 1 AS x UNION ALL
      SELECT 2 AS x UNION ALL
      SELECT 3 AS x UNION ALL
      SELECT 4 AS x UNION ALL
      SELECT 5 AS x);
```

The following examples illustrate how weight works when you initialize a
KLL sketch. The results are converted to quantiles.

```sql
WITH points AS (
  SELECT 1 AS x, 1 AS y UNION ALL
  SELECT 2 AS x, 1 AS y UNION ALL
  SELECT 3 AS x, 1 AS y UNION ALL
  SELECT 4 AS x, 1 AS y UNION ALL
  SELECT 5 AS x, 1 AS y)
SELECT KLL_QUANTILES.EXTRACT_INT64(kll_sketch, 2) AS halves
FROM
  (
    SELECT KLL_QUANTILES.INIT_INT64(x, 1000,  weight=>y) AS kll_sketch
    FROM points
  );

/*---------+
 | halves  |
 +---------+
 | [1,3,5] |
 +---------*/
```

```sql
WITH points AS (
  SELECT 1 AS x, 1 AS y UNION ALL
  SELECT 2 AS x, 3 AS y UNION ALL
  SELECT 3 AS x, 1 AS y UNION ALL
  SELECT 4 AS x, 1 AS y UNION ALL
  SELECT 5 AS x, 1 AS y)
SELECT KLL_QUANTILES.EXTRACT_INT64(kll_sketch, 2) AS halves
FROM
  (
    SELECT KLL_QUANTILES.INIT_INT64(x, 1000,  weight=>y) AS kll_sketch
    FROM points
  );

/*---------+
 | halves  |
 +---------+
 | [1,2,5] |
 +---------*/
```

### `KLL_QUANTILES.INIT_FLOAT64`

```sql
KLL_QUANTILES.INIT_FLOAT64(input[, precision[, weight => input_weight]])
```

**Description**

Like [`KLL_QUANTILES.INIT_INT64`](#kll_quantilesinit_int64),
but accepts `input` of type `FLOAT64`.

`KLL_QUANTILES.INIT_FLOAT64` orders values according to the GoogleSQL
[floating point sort order](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#comparison_operator_examples). For example, `NaN` orders before
`&#8209;inf`.

**Supported Argument Types**

- `input`: `FLOAT64`
- `precision`: `INT64`
- `input_weight`: `INT64`

**Return Type**

KLL sketch as `BYTES`

### `KLL_QUANTILES.MERGE_INT64`

```sql
KLL_QUANTILES.MERGE_INT64(sketch, num_quantiles)
```

**Description**

Takes KLL sketches as `BYTES` and merges them into
a new sketch, then returns the quantiles that divide the input into
`num_quantiles` equal-sized groups, along with the minimum and maximum values of the
input. The output is an `ARRAY` containing the exact minimum value from
the input data that you used to initialize the sketches, each
approximate quantile, and the exact maximum value from the initial input data.
This is an aggregate function.

If the merged sketches were initialized with different precisions, the precision
is downgraded to the lowest precision involved in the merge --- except if the
aggregations are small enough to still capture the input exactly --- then the
mergee's precision is maintained.

Returns an error if the underlying type of one or more input sketches isn't
compatible with type `INT64`.

Returns an error if the input isn't a valid KLL quantiles sketch.

**Supported Argument Types**

- `sketch`: `BYTES` KLL sketch initialized on `INT64` data type
- `num_quantiles`: A positive `INT64` value that represents the number of roughly equal-sized groups to divide the merged sketches into. The maximum value is 100,000.

**Return Type**

`ARRAY<INT64>`

**Example**

The following query initializes two KLL sketches from five rows of data each.
Then it merges these two sketches and returns an `ARRAY` containing the minimum,
median, and maximum values in the input sketches.

```sql
SELECT KLL_QUANTILES.MERGE_INT64(kll_sketch, 2) AS halves
FROM (SELECT KLL_QUANTILES.INIT_INT64(x, 1000) AS kll_sketch
      FROM (SELECT 1 AS x UNION ALL
            SELECT 2 AS x UNION ALL
            SELECT 3 AS x UNION ALL
            SELECT 4 AS x UNION ALL
            SELECT 5)
      UNION ALL
      SELECT KLL_QUANTILES.INIT_INT64(x, 1000) AS kll_sketch
      FROM (SELECT 6 AS x UNION ALL
            SELECT 7 AS x UNION ALL
            SELECT 8 AS x UNION ALL
            SELECT 9 AS x UNION ALL
            SELECT 10 AS x));

/*----------+
 | halves   |
 +----------+
 | [1,5,10] |
 +----------*/
```

### `KLL_QUANTILES.MERGE_FLOAT64`

```sql
KLL_QUANTILES.MERGE_FLOAT64(sketch, num_quantiles)
```

**Description**

Like [`KLL_QUANTILES.MERGE_INT64`](#kll_quantilesmerge_int64),
but accepts KLL sketches initialized on data of type
`FLOAT64`.

`KLL_QUANTILES.MERGE_FLOAT64` orders values according to the GoogleSQL
[floating point sort order](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#comparison_operator_examples). For example, `NaN` orders before
`&#8209;inf`.

**Supported Argument Types**

- `sketch`: `BYTES` KLL sketch initialized on `FLOAT64` data type
- `num_quantiles`: `INT64`

**Return Type**

`ARRAY<FLOAT64>`

### `KLL_QUANTILES.MERGE_PARTIAL`

```sql
KLL_QUANTILES.MERGE_PARTIAL(sketch)
```

**Description**

Takes KLL sketches of the same underlying type and merges them to return a new
sketch of the same underlying type. This is an aggregate function.

If the merged sketches were initialized with different precisions, the precision
is downgraded to the lowest precision involved in the merge --- except if the
aggregations are small enough to still capture the input exactly --- then the
mergee's precision is maintained.

Returns an error if two or more sketches don't have compatible underlying types,
such as one sketch of `INT64` values and another of
`FLOAT64` values.

Returns an error if one or more inputs aren't a valid KLL quantiles sketch.

Ignores `NULL` sketches. If the input contains zero rows or only `NULL`
sketches, the function returns `NULL`.

**Supported Argument Types**

- `sketch`: `BYTES` KLL sketch

**Return Type**

KLL sketch as `BYTES`

**Example**

The following query initializes two KLL sketches from five rows of data each.
Then it merges these two sketches into a new sketch, also as `BYTES`. Both
input sketches have the same underlying data type and precision.

```sql
SELECT KLL_QUANTILES.MERGE_PARTIAL(kll_sketch) AS merged_sketch
FROM (SELECT KLL_QUANTILES.INIT_INT64(x, 1000) AS kll_sketch
      FROM (SELECT 1 AS x UNION ALL
            SELECT 2 AS x UNION ALL
            SELECT 3 AS x UNION ALL
            SELECT 4 AS x UNION ALL
            SELECT 5)
      UNION ALL
      SELECT KLL_QUANTILES.INIT_INT64(x, 1000) AS kll_sketch
      FROM (SELECT 6 AS x UNION ALL
            SELECT 7 AS x UNION ALL
            SELECT 8 AS x UNION ALL
            SELECT 9 AS x UNION ALL
            SELECT 10 AS x));
```

### `KLL_QUANTILES.MERGE_POINT_INT64`

```sql
KLL_QUANTILES.MERGE_POINT_INT64(sketch, phi)
```

**Description**

Takes KLL sketches as `BYTES` and merges them, then extracts a single
quantile from the merged sketch. The `phi` argument specifies the quantile
to return as a fraction of the total number of rows in the input, normalized
between 0 and 1. This means that the function will return a value *v* such that
approximately Φ \* *n* inputs are less than or equal to *v* , and a (1-Φ) \* *n*
inputs are greater than or equal to *v*. This is an aggregate function.

If the merged sketches were initialized with different precisions, the precision
is downgraded to the lowest precision involved in the merge --- except if the
aggregations are small enough to still capture the input exactly --- then the
mergee's precision is maintained.

Returns an error if the underlying type of one or more input sketches isn't
compatible with type `INT64`.

Returns an error if the input isn't a valid KLL quantiles sketch.

**Supported Argument Types**

- `sketch`: `BYTES` KLL sketch initialized on `INT64` data type
- `phi`: `FLOAT64` between 0 and 1

**Return Type**

`INT64`

**Example**

The following query initializes two KLL sketches from five rows of data each.
Then it merges these two sketches and returns the value of the ninth decile or
90th percentile of the merged sketch.

```sql
SELECT KLL_QUANTILES.MERGE_POINT_INT64(kll_sketch, .9) AS quantile
FROM (SELECT KLL_QUANTILES.INIT_INT64(x, 1000) AS kll_sketch
      FROM (SELECT 1 AS x UNION ALL
            SELECT 2 AS x UNION ALL
            SELECT 3 AS x UNION ALL
            SELECT 4 AS x UNION ALL
            SELECT 5)
      UNION ALL
      SELECT KLL_QUANTILES.INIT_INT64(x, 1000) AS kll_sketch
      FROM (SELECT 6 AS x UNION ALL
            SELECT 7 AS x UNION ALL
            SELECT 8 AS x UNION ALL
            SELECT 9 AS x UNION ALL
            SELECT 10 AS x));

/*----------+
 | quantile |
 +----------+
 |        9 |
 +----------*/
```

### `KLL_QUANTILES.MERGE_POINT_FLOAT64`

```sql
KLL_QUANTILES.MERGE_POINT_FLOAT64(sketch, phi)
```

**Description**

Like [`KLL_QUANTILES.MERGE_POINT_INT64`](#kll_quantilesmerge_point_int64),
but accepts KLL sketches initialized on data of type
`FLOAT64`.

`KLL_QUANTILES.MERGE_POINT_FLOAT64` orders values according to the
GoogleSQL [floating point sort order](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#comparison_operator_examples). For example, `NaN`
orders before `&#8209;inf`.

**Supported Argument Types**

- `sketch`: `BYTES` KLL sketch initialized on `FLOAT64` data type
- `phi`: `FLOAT64` between 0 and 1

**Return Type**

`FLOAT64`

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/kll_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: The text gives the minimum as `0`, but the example data is `GENERATE_ARRAY(1, 100)` and the result shows `1` as the lowest value, so the text is changed to `1`.

## Related

- [Index of this directory](./README.md)

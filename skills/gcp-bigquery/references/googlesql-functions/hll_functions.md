---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/hll_functions
---

# HyperLogLog++ functions

## Signature / Usage

The [HyperLogLog++ algorithm (HLL++)](https://en.wikipedia.org/wiki/HyperLogLog) estimates
[cardinality](https://en.wikipedia.org/wiki/Cardinality) from sketches.

HLL++ functions are approximate aggregate functions.
Approximate aggregation typically uses fewer
resources than exact aggregation functions,
like [`COUNT(DISTINCT)`](aggregate_functions.md#count), but also introduces statistical error.
This makes HLL++ functions appropriate for large data streams for
which linear memory usage is impractical, as well as for data that is
already approximate.

A data sketch is a compact summary of a data
aggregation. For more information, see
[Sketches](https://docs.cloud.google.com/bigquery/docs/sketches). If you don't need to
store sketches, you can alternatively use an
[approximate aggregate function with system-defined precision](approximate_aggregate_functions.md),
such as [`APPROX_COUNT_DISTINCT`](approximate_aggregate_functions.md#approx_count_distinct). However,
`APPROX_COUNT_DISTINCT` doesn't allow partial aggregations, re-aggregations,
and custom precision.

GoogleSQL for BigQuery supports the following HLL++ functions.

### Function list

| Name | Summary |
|---|---|
| [`HLL_COUNT.EXTRACT`](#hll_countextract) | Extracts a cardinality estimate of an HLL++ sketch. |
| [`HLL_COUNT.INIT`](#hll_countinit) | Aggregates values of the same underlying type into a new HLL++ sketch. |
| [`HLL_COUNT.MERGE`](#hll_countmerge) | Merges HLL++ sketches of the same underlying type into a new sketch, and then gets the cardinality of the new sketch. |
| [`HLL_COUNT.MERGE_PARTIAL`](#hll_countmerge_partial) | Merges HLL++ sketches of the same underlying type into a new sketch. |

### `HLL_COUNT.EXTRACT`

```sql
HLL_COUNT.EXTRACT(sketch)
```

**Description**

A scalar function that extracts a cardinality estimate of a single
[HLL++](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/40671.pdf) sketch.

If `sketch` is `NULL`, this function returns a cardinality estimate of `0`.

**Supported input types**

`BYTES`

**Return type**

`INT64`

**Example**

The following query returns the number of distinct users for each country who
have at least one invoice.

```sql
SELECT
  country,
  HLL_COUNT.EXTRACT(HLL_sketch) AS distinct_customers_with_open_invoice
FROM
  (
    SELECT
      country,
      HLL_COUNT.INIT(customer_id) AS hll_sketch
    FROM
      UNNEST(
        ARRAY<STRUCT<country STRING, customer_id STRING, invoice_id STRING>>[
          ('UA', 'customer_id_1', 'invoice_id_11'),
          ('BR', 'customer_id_3', 'invoice_id_31'),
          ('CZ', 'customer_id_2', 'invoice_id_22'),
          ('CZ', 'customer_id_2', 'invoice_id_23'),
          ('BR', 'customer_id_3', 'invoice_id_31'),
          ('UA', 'customer_id_2', 'invoice_id_24')])
    GROUP BY country
  );

/*---------+--------------------------------------+
 | country | distinct_customers_with_open_invoice |
 +---------+--------------------------------------+
 | UA      |                                    2 |
 | BR      |                                    1 |
 | CZ      |                                    1 |
 +---------+--------------------------------------*/
```

### `HLL_COUNT.INIT`

```sql
HLL_COUNT.INIT(input [, precision])
```

**Description**

An aggregate function that takes one or more `input` values and aggregates them
into a [HLL++](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/40671.pdf) sketch. Each sketch
is represented using the `BYTES` data type. You can then merge sketches using
`HLL_COUNT.MERGE` or `HLL_COUNT.MERGE_PARTIAL`. If no merging is needed,
you can extract the final count of distinct values from the sketch using
`HLL_COUNT.EXTRACT`.

If the input is `NULL`, this function returns `NULL`.

For more information, see [HyperLogLog in Practice: Algorithmic Engineering of
a State of The Art Cardinality Estimation Algorithm](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/40671.pdf).

**Definitions**

- `precision`: Defines the accuracy of the estimate at the cost of additional memory required to process the sketches or store them on disk. The range for this value is `10` to `24`, where larger values indicate higher accuracy, with `24` being the most accurate. The default value is `15`. For more information about precision, see [Precision for sketches](https://docs.cloud.google.com/bigquery/docs/sketches#precision_hll).

**Supported input types**

- `INT64`
- `NUMERIC`
- `BIGNUMERIC`
- `STRING`
- `BYTES`

**Return type**

`BYTES`

**Example**

The following query creates HLL++ sketches that count the number of distinct
users with at least one invoice per country.

```sql
SELECT
  country,
  HLL_COUNT.INIT(customer_id, 10)
    AS hll_sketch
FROM
  UNNEST(
    ARRAY<STRUCT<country STRING, customer_id STRING, invoice_id STRING>>[
      ('UA', 'customer_id_1', 'invoice_id_11'),
      ('CZ', 'customer_id_2', 'invoice_id_22'),
      ('CZ', 'customer_id_2', 'invoice_id_23'),
      ('BR', 'customer_id_3', 'invoice_id_31'),
      ('UA', 'customer_id_2', 'invoice_id_24')])
GROUP BY country;

/*---------+------------------------------------------------------------------------------------+
 | country | hll_sketch                                                                         |
 +---------+------------------------------------------------------------------------------------+
 | UA      | "\010p\020\002\030\002 \013\202\007\r\020\002\030\n \0172\005\371\344\001\315\010" |
 | CZ      | "\010p\020\002\030\002 \013\202\007\013\020\001\030\n \0172\003\371\344\001"       |
 | BR      | "\010p\020\001\030\002 \013\202\007\013\020\001\030\n \0172\003\202\341\001"       |
 +---------+------------------------------------------------------------------------------------*/
```

### `HLL_COUNT.MERGE`

```sql
HLL_COUNT.MERGE(sketch)
```

**Description**

An aggregate function that returns the cardinality of several
[HLL++](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/40671.pdf) sketches by computing their union.

Each `sketch` must be initialized on the same type. Attempts to merge sketches
for different types results in an error. For example, you can't merge a sketch
initialized from `INT64` data with one initialized from `STRING` data.

If the merged sketches were initialized with different precisions, the precision
will be downgraded to the lowest precision involved in the merge.

This function ignores `NULL` values when merging sketches. If the merge happens
over zero rows or only over `NULL` values, the function returns `0`.

**Supported input types**

`BYTES`

**Return type**

`INT64`

**Example**

The following query counts the number of distinct users across all countries
who have at least one invoice. The inner query produces one sketch per country
by grouping on `country`, and the outer query merges those sketches into a
single distinct count.

```sql
SELECT HLL_COUNT.MERGE(hll_sketch) AS distinct_customers_with_open_invoice
FROM
  (
    SELECT
      country,
      HLL_COUNT.INIT(customer_id) AS hll_sketch
    FROM
      UNNEST(
        ARRAY<STRUCT<country STRING, customer_id STRING, invoice_id STRING>>[
          ('UA', 'customer_id_1', 'invoice_id_11'),
          ('BR', 'customer_id_3', 'invoice_id_31'),
          ('CZ', 'customer_id_2', 'invoice_id_22'),
          ('CZ', 'customer_id_2', 'invoice_id_23'),
          ('BR', 'customer_id_3', 'invoice_id_31'),
          ('UA', 'customer_id_2', 'invoice_id_24')])
    GROUP BY country
  );

/*--------------------------------------+
 | distinct_customers_with_open_invoice |
 +--------------------------------------+
 |                                    3 |
 +--------------------------------------*/
```

### `HLL_COUNT.MERGE_PARTIAL`

```sql
HLL_COUNT.MERGE_PARTIAL(sketch)
```

**Description**

An aggregate function that takes one or more
[HLL++](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/40671.pdf) `sketch`
inputs and merges them into a new sketch.

Each `sketch` must be initialized on the same type. Attempts to merge sketches
for different types results in an error. For example, you can't merge a sketch
initialized from `INT64` data with one initialized from `STRING` data.

If the merged sketches were initialized with different precisions, the precision
will be downgraded to the lowest precision involved in the merge. For example,
if `MERGE_PARTIAL` encounters sketches of precision 14 and 15, the returned new
sketch will have precision 14.

This function returns `NULL` if there is no input or all inputs are `NULL`.

**Supported input types**

`BYTES`

**Return type**

`BYTES`

**Example**

The following query returns an HLL++ sketch that counts the number of distinct
users who have at least one invoice across all countries. The inner query
produces one sketch per country by grouping on `country`, and the outer query
merges those sketches into a new sketch.

```sql
SELECT HLL_COUNT.MERGE_PARTIAL(HLL_sketch) AS distinct_customers_with_open_invoice
FROM
  (
    SELECT
      country,
      HLL_COUNT.INIT(customer_id) AS hll_sketch
    FROM
      UNNEST(
        ARRAY<STRUCT<country STRING, customer_id STRING, invoice_id STRING>>[
          ('UA', 'customer_id_1', 'invoice_id_11'),
          ('BR', 'customer_id_3', 'invoice_id_31'),
          ('CZ', 'customer_id_2', 'invoice_id_22'),
          ('CZ', 'customer_id_2', 'invoice_id_23'),
          ('BR', 'customer_id_3', 'invoice_id_31'),
          ('UA', 'customer_id_2', 'invoice_id_24')])
    GROUP BY country
  );

/*----------------------------------------------------------------------------------------------+
 | distinct_customers_with_open_invoice                                                         |
 +----------------------------------------------------------------------------------------------+
 | "\010p\020\006\030\002 \013\202\007\020\020\003\030\017 \0242\010\320\2408\352}\244\223\002" |
 +----------------------------------------------------------------------------------------------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/hll_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

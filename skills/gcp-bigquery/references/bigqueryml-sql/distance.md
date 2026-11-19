---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-distance
---

# The ML.DISTANCE function

## Signature / Usage

This document describes the `ML.DISTANCE` scalar function, which lets you
compute the distance between two vectors.

> [!NOTE]
> **Note:** The [`VECTOR_SEARCH` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions#vector_search) is another vector function that calculates the distance between vectors. You should use the `VECTOR_SEARCH` function if you need to search a dataset for vectors similar to an input vector. You should use the `ML.DISTANCE` function if you need to compare two specific vectors to determine the distance between them.

### Syntax

```sql
ML.DISTANCE(vector1, vector2 [, type])
```

#### Arguments

`ML.DISTANCE` has the following arguments:

- `vector1`: an `ARRAY` value that represents the first vector, in one of the
  following forms:

  - `ARRAY<Numerical type>`
  - `ARRAY<STRUCT<STRING, Numerical type>>`
  - `ARRAY<STRUCT<INT64, Numerical type>>`

  where `Numerical type` is `BIGNUMERIC`, `FLOAT64`, `INT64` or `NUMERIC`.
  For example `ARRAY<STRUCT<INT64, BIGNUMERIC>>`.

  When a vector is expressed as `ARRAY<Numerical type>`, each element
  of the array denotes one dimension of the vector. An example of a
  four-dimensional vector is `[0.0, 1.0, 1.0, 0.0]`.

  When a vector is expressed as `ARRAY<STRUCT<STRING, Numerical type>>` or
  `ARRAY<STRUCT<INT64, Numerical type>>`, each `STRUCT` array item
  denotes one dimension of the vector. An example of a three-dimensional
  vector is `[("a", 0.0), ("b", 1.0), ("c", 1.0)]`.

  The initial `INT64` or `STRING` value in the `STRUCT` is used as an
  identifier to match the `STRUCT` values in `vector2`. The ordering of data
  in the array doesn't matter; the values are matched by the identifier rather
  than by their position in the array. If either vector has any `STRUCT`
  values with duplicate identifiers, running this function returns an error.
- `vector2`: an `ARRAY` value that represents the second vector.

  `vector2` must have the same type as `vector1`.

  For example, if `vector1`
  is an `ARRAY<STRUCT<STRING, FLOAT64>>` column with three elements, like
  `[("a", 0.0), ("b", 1.0), ("c", 1.0)]`, then `vector2` must also be an
  `ARRAY<STRUCT<STRING, FLOAT64>>` column.

  When `vector1` and `vector2` are `ARRAY<Numerical type>` columns,
  they must have the same array length.
- `type`: a `STRING` value that specifies the type of distance to calculate.
  Valid values are
  [`EUCLIDEAN`](https://en.wikipedia.org/wiki/Euclidean_distance),
  [`MANHATTAN`](https://en.wikipedia.org/wiki/Taxicab_geometry), and
  [`COSINE`](https://en.wikipedia.org/wiki/Cosine_similarity#Cosine_distance).
  If this argument isn't specified, the default value is `EUCLIDEAN`.

### Output

`ML.DISTANCE` returns a `FLOAT64` value that represents the distance between
the vectors. Returns `NULL` if either `vector1` or `vector2` is `NULL`.

### Example

Get the Euclidean distance for two tensors of `ARRAY<FLOAT64>` values:

1. Create the table `t1`:

   ```sql
   CREATE TABLE mydataset.t1
   (
   v1 ARRAY<FLOAT64>,
   v2 ARRAY<FLOAT64>
   )
   ```
2. Populate `t1`:

   ```sql
   INSERT mydataset.t1 (v1,v2)
   VALUES ([4.1,0.5,1.0], [3.0,0.0,2.5])
   ```
3. Calculate the Euclidean norm for `v1` and `v2`:

   ```sql
   SELECT v1, v2, ML.DISTANCE(v1, v2, 'EUCLIDEAN') AS output FROM mydataset.t1
   ```

   This query produces the following output:

   ```sql
   +---------------+---------------+-------------------+
   | v1            | v2            | output            |
   +---------------+---------------+-------------------|
   | [4.1,0.5,1.0] | [3.0,0.0,2.5] | 1.926136028425822 |
   +------------+------------------+-------------------+
   ```

### What's next

- For information about the supported SQL statements and functions for each model type, see [End-to-end user journey for each model](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-distance (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

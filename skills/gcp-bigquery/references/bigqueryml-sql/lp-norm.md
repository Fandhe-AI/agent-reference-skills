---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-lp-norm
---

# The ML.LP_NORM function

## Signature / Usage

This document describes the `ML.LP_NORM` scalar function, which lets you
compute the [L^p^](https://en.wikipedia.org/wiki/Lp_space) norm for
a vector, where ^p^ is the degree.

### Syntax

```sql
ML.LP_NORM(vector, degree)
```

#### Arguments

`ML.LP_NORM` has the following arguments:

- `vector`: an `ARRAY<Numerical type>` value that represents a vector,
  where `Numerical type` can be `BIGNUMERIC`, `FLOAT64`,
  `INT64` or `NUMERIC`. For example `ARRAY<BIGNUMERIC>`.

  Each element of the array denotes one dimension of the vector. An example
  of a four-dimensional vector is `[0.0, 1.0, 1.0, 0.0]`.

  The function calculates the ^p^ degree norm of the numerical type
  values in all the values in the array.
- `degree`: a `FLOAT64` value that specifies the degree. This can be `0.0`,
  any value \>= `1.0`, or `CAST('INF' AS FLOAT64)` to return the L_infinity
  norm of the vector, which is the largest magnitude of the values in
  the vector.

  Commonly used values are `1.0` to calculate the [Manhattan
  norm](https://en.wikipedia.org/wiki/Norm_(mathematics)#Taxicab_norm_or_Manhattan_norm)
  of the vector and `2.0` to calculate the [Euclidean
  norm](https://en.wikipedia.org/wiki/Norm_(mathematics)#Euclidean_norm) of
  the vector.

### Output

`ML.LP_NORM` returns a `FLOAT64` value that represents the L^p^ norm
for the vector. Returns `NULL` if `vector` is `NULL`.

### Example

The following example gets the Euclidean norm for vectors consisting of
`ARRAY<FLOAT64>` values:

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
   SELECT v1, ML.LP_NORM(v1, 2.0) AS v1_norm, v2, ML.LP_NORM(v2, 2.0) AS v2_norm
   FROM mydataset.t1;
   ```

   This query produces the following output:

   ```sql
   +---------------------------+-----+-------------------+
   | v1  | v1_norm             | v2  | v2_norm           |
   +---------------------------+-----+-------------------+
   | 4.1 | 4.2497058721751557  | 3.0 | 3.905124837953327 |
   +-----|                     |-----|                   |
   | 0.5 |                     | 0.0 |                   |
   +-----|                     |-----+                   |
   | 1.0 |                     | 2.5 |                   |
   +---------------------------+-----+-------------------+
   ```

### What's next

- For information about the supported SQL statements and functions for each model type, see [End-to-end user journey for each model](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-lp-norm (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

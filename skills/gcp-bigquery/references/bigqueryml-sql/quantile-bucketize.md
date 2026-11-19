---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-quantile-bucketize
---

# The ML.QUANTILE_BUCKETIZE function

## Signature / Usage

This document describes the `ML.QUANTILE_BUCKETIZE` function, which lets you
break a continuous numerical feature into buckets based on quantiles.

When used in the
[`TRANSFORM` clause](create.md#transform),
the same quantiles are automatically used in prediction.

You can use this function with models that support
[manual feature preprocessing](https://docs.cloud.google.com/bigquery/docs/manual-preprocessing). For more
information, see the following documents:

- [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey)
- [Contribution analysis user journey](https://docs.cloud.google.com/bigquery/docs/contribution-analysis#contribution_analysis_user_journey)

### Syntax

```sql
ML.QUANTILE_BUCKETIZE(numerical_expression, num_buckets [, output_format]) OVER()
```

#### Arguments

`ML.QUANTILE_BUCKETIZE` takes the following arguments:

- `numerical_expression`: the [numerical](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#numeric_types) expression to bucketize.
- `num_buckets`: an `INT64` value that specifies the number of buckets to split `numerical_expression` into.
- `output_format`: a `STRING` value that specifies the output format of the bucket. Valid output formats are as follows:
  - `bucket_names`: returns a `STRING` value in the format `bin_<bucket_index>`. For example, `bin_3`. The `bucket_index` value starts at 1. This is the default bucket format.
  - `bucket_ranges`: returns a `STRING` value in the format `[lower_bound, upper_bound)` in [interval notation](https://en.wikipedia.org/wiki/Interval_(mathematics)). For example, `(-inf, 2.5)`, `[2.5, 4.6)`, `[4.6, +inf)`.
  - `bucket_ranges_json`: returns a JSON-formatted `STRING` value in the format `{"start": "lower_bound", "end": "upper_bound"}`. For example, `{"start": "-Infinity", "end": "2.5"}`, `{"start": "2.5", "end": "4.6"}`, `{"start": "4.6", "end": "Infinity"}`. The inclusivity and exclusivity of the lower and upper bound follow the same pattern as the `bucket_ranges` option.

### Output

`ML.QUANTILE_BUCKETIZE` returns a `STRING` value that contains the name of the bucket, in the format specified by the `output_format` argument.

### Example

The following example breaks a numerical expression of five elements into
three buckets:

```sql
SELECT
  f,
  ML.QUANTILE_BUCKETIZE(f, 3) OVER() AS bucket,
  ML.QUANTILE_BUCKETIZE(f, 3, "bucket_ranges") OVER() AS bucket_ranges,
  ML.QUANTILE_BUCKETIZE(f, 3, "bucket_ranges_json") OVER() AS bucket_ranges_json
FROM
  UNNEST([1,2,3,4,5]) AS f
ORDER BY f;
```

The output looks similar to the following:

```text
+---+--------+---------------+------------------------------------+
| f | bucket | bucket_ranges | bucket_ranges_json                 |
|---|--------|---------------|------------------------------------|
| 1 | bin_1  | (-inf, 2)     | {"start": "-Infinity", "end": "2"} |
| 2 | bin_2  | [2, 4)        | {"start": "2", "end": "4"}         |
| 3 | bin_2  | [2, 4)        | {"start": "2", "end": "4"}         |
| 4 | bin_3  | [4, +inf)     | {"start": "4", "end": "Infinity"}  |
| 5 | bin_3  | [4, +inf)     | {"start": "4", "end": "Infinity"}  |
+---+--------+---------------+------------------------------------+
```

### What's next

- For information about feature preprocessing, see [Feature preprocessing overview](https://docs.cloud.google.com/bigquery/docs/preprocess-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-quantile-bucketize (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

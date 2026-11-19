---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-bucketize
---

# The ML.BUCKETIZE function

## Signature / Usage

This document describes the `ML.BUCKETIZE` function, which lets you split
a numerical expression into buckets.

You can use this function with models that support
[manual feature preprocessing](https://docs.cloud.google.com/bigquery/docs/manual-preprocessing). For more
information, see the following documents:

- [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey)
- [Contribution analysis user journey](https://docs.cloud.google.com/bigquery/docs/contribution-analysis#contribution_analysis_user_journey)

### Syntax

```sql
ML.BUCKETIZE(numerical_expression, array_split_points [, exclude_boundaries] [, output_format])
```

#### Arguments

`ML.BUCKETIZE` takes the following arguments:

- `numerical_expression`: the [numerical](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#numeric_types) expression to bucketize.
- `array_split_points`: an array of numerical values that provide the points at which to split the `numerical_expression` value. The numerical values in the array must be finite, so not `-inf`, `inf`, or `NaN`. Provide the numerical values in order, lowest to highest. The range of possible buckets is determined by the upper and lower boundaries of the array. For example, if the `array_split_points` value is `[1, 2, 3, 4]`, then there are five potential buckets that the `numerical_expression` value can be bucketized into.
- `exclude_boundaries`: a `BOOL` value that determines whether the upper and lower boundaries from `array_split_points` are used. If `TRUE`, then the boundary values aren't used to create buckets. For example, if the `array_split_points` value is `[1, 2, 3, 4]` and `exclude_boundaries` is `TRUE`, then there are three potential buckets that the `numerical_expression` value can be bucketized into. The default value is `FALSE`.
- `output_format`: a `STRING` value that specifies the output format of the bucket. Valid output formats are as follows:
  - `bucket_names`: returns a `STRING` value in the format `bin_<bucket_index>`. For example, `bin_3`. The `bucket_index` value starts at 1. This is the default bucket format.
  - `bucket_ranges`: returns a `STRING` value in the format `[lower_bound, upper_bound)` in [interval notation](https://en.wikipedia.org/wiki/Interval_(mathematics)). For example, `(-inf, 2.5)`, `[2.5, 4.6)`, `[4.6, +inf)`.
  - `bucket_ranges_json`: returns a JSON-formatted `STRING` value in the format `{"start": "lower_bound", "end": "upper_bound"}`. For example, `{"start": "-Infinity", "end": "2.5"}`, `{"start": "2.5", "end": "4.6"}`, `{"start": "4.6", "end": "Infinity"}`. The inclusivity and exclusivity of the lower and upper bound follow the same pattern as the `bucket_ranges` option.

### Output

`ML.BUCKETIZE` returns a `STRING` value that contains the name of the bucket, in the format specified by the `output_format` argument.

### Example

The following example bucketizes a numerical expression both with and without
boundaries:

```sql
SELECT
  ML.BUCKETIZE(2.5, [1, 2, 3]) AS bucket,
  ML.BUCKETIZE(2.5, [1, 2, 3], TRUE) AS bucket_without_boundaries,
  ML.BUCKETIZE(2.5, [1, 2, 3], FALSE, "bucket_ranges") AS bucket_ranges,
  ML.BUCKETIZE(2.5, [1, 2, 3], FALSE, "bucket_ranges_json") AS bucket_ranges_json;
```

The output looks similar to the following:

```text
+--------+---------------------------+---------------+----------------------------+
| bucket | bucket_without_boundaries | bucket_ranges | bucket_ranges_json         |
|--------|---------------------------|---------------|----------------------------|
| bin_3  | bin_2                     | [2, 3)        | {"start": "2", "end": "3"} |
+--------+---------------------------+---------------+----------------------------+
```

### What's next

- For information about feature preprocessing, see [Feature preprocessing overview](https://docs.cloud.google.com/bigquery/docs/preprocess-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-bucketize (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

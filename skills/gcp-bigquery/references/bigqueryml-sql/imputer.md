---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-imputer
---

# The ML.IMPUTER function

## Signature / Usage

This document describes the `ML.IMPUTER` function, which lets you replace
`NULL` values in a string or numerical expression. You can replace `NULL` values
with the most frequently used value for string expressions, or the
[mean](https://en.wikipedia.org/wiki/Mean) or
[median](https://en.wikipedia.org/wiki/Median) value for numerical expressions.

When used in the
[`TRANSFORM` clause](create.md#transform),
the values calculated during training for mean, median, and most frequently
used value are automatically used in prediction.

You can use this function with models that support
[manual feature preprocessing](https://docs.cloud.google.com/bigquery/docs/manual-preprocessing). For more
information, see the following documents:

- [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey)
- [Contribution analysis user journey](https://docs.cloud.google.com/bigquery/docs/contribution-analysis#contribution_analysis_user_journey)

### Syntax

```sql
ML.IMPUTER(expression, strategy) OVER()
```

### Arguments

`ML.IMPUTER` takes the following arguments:

- `expression`: the [numerical](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#numeric_types) or `STRING` expression to impute.
- `strategy`: a `STRING` value that specifies how to replace `NULL` values. Valid values are as follows:
  - `mean`: the mean of `expression`. You can only use this value with numerical expressions.
  - `median`: the median of `expression`. You can only use this value with numerical expressions.
  - `most_frequent`: the most frequent value in `expression`.

### Output

`ML.IMPUTER` returns a `FLOAT64` (for numerical expressions) or `STRING`
(for string expressions) value that contains the replacement for the
`NULL` value.

### Examples

**Example 1**

The following example imputes numerical expressions:

```sql
SELECT f, ML.IMPUTER(f, 'mean') OVER () AS output
FROM
  UNNEST([NULL, -3, -3, -3, 1, 2, 3, 4, 5]) AS f
ORDER BY f;
```

The output looks similar to the following:

```text
+------+--------+
|  f   | output |
+------+--------+
| NULL |   0.75 |
|   -3 |   -3.0 |
|   -3 |   -3.0 |
|   -3 |   -3.0 |
|    1 |    1.0 |
|    2 |    2.0 |
|    3 |    3.0 |
|    4 |    4.0 |
|    5 |    5.0 |
+------+--------+
```

**Example 2**

The following example imputes string expressions:

```sql
SELECT f, ML.IMPUTER(f, 'most_frequent') OVER () AS output
FROM
  UNNEST([NULL, NULL, NULL, NULL, 'a', 'a', 'b', 'b', 'c', 'c', 'c']) AS f
ORDER BY f;
```

The output looks similar to the following:

```text
+------+--------+
|  f   | output |
+------+--------+
| NULL | c      |
| NULL | c      |
| NULL | c      |
| NULL | c      |
| a    | a      |
| a    | a      |
| b    | b      |
| b    | b      |
| c    | c      |
| c    | c      |
| c    | c      |
+------+--------+
```

### What's next

- For information about feature preprocessing, see [Feature preprocessing overview](https://docs.cloud.google.com/bigquery/docs/preprocess-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-imputer (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

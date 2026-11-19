---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-normalizer
---

# The ML.NORMALIZER function

## Signature / Usage

This document describes the `ML.NORMALIZER` function, which lets you normalize
an array of numerical expressions using a given
[p-norm](https://ncatlab.org/nlab/show/p-norm).

You can use this function with models that support
[manual feature preprocessing](https://docs.cloud.google.com/bigquery/docs/manual-preprocessing). For more
information, see the following documents:

- [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey)
- [Contribution analysis user journey](https://docs.cloud.google.com/bigquery/docs/contribution-analysis#contribution_analysis_user_journey)

### Syntax

```sql
ML.NORMALIZER(array_expression [, p])
```

#### Arguments

`ML.NORMALIZER` takes the following arguments:

- `array_expression`: an array of [numerical](../googlesql-syntax/data-types.md#numeric-types) expressions to normalize.
- `p`: a `FLOAT64` value that specifies the degree of p-norm. This can be `0.0`, any value greater than or equal to `1.0`, or `CAST('+INF' AS FLOAT64)`. The default value is `2`.

### Output

`ML.NORMALIZER` returns an array of `FLOAT64` values that represent the
normalized numerical expressions.

### Example

The following example normalizes a set of numerical expressions using a p-norm
of `2`:

```sql
SELECT ML.NORMALIZER([4.0, 1.0, 2.0, 2.0, 0.0]) AS output;
```

The output looks similar to the following:

```text
+--------+
| output |
+--------+
| 0.8    |
| 0.2    |
| 0.4    |
| 0.4    |
| 0.0    |
+--------+
```

### What's next

- For information about feature preprocessing, see [Feature preprocessing overview](https://docs.cloud.google.com/bigquery/docs/preprocess-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-normalizer (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

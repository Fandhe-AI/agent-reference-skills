---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-standard-scaler
---

# The ML.STANDARD_SCALER function

## Signature / Usage

This document describes the `ML.STANDARD_SCALER` function, which lets you scale
a numerical expression by using
[z-score](https://developers.google.com/machine-learning/data-prep/transform/normalization#z-score).

When used in the
[`TRANSFORM` clause](create.md#transform),
the [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) and
[mean](https://en.wikipedia.org/wiki/Mean) values calculated to standardize the
expression are automatically used in prediction.

You can use this function with models that support
[manual feature preprocessing](https://docs.cloud.google.com/bigquery/docs/manual-preprocessing). For more
information, see the following documents:

- [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey)
- [Contribution analysis user journey](https://docs.cloud.google.com/bigquery/docs/contribution-analysis#contribution_analysis_user_journey)

### Syntax

```sql
ML.STANDARD_SCALER(numerical_expression) OVER()
```

#### Arguments

`ML.STANDARD_SCALER` takes the following argument:

- `numerical_expression`: the [numerical](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#numeric_types) expression to scale.

### Output

`ML.STANDARD_SCALER` returns a `FLOAT64` value that represents the scaled
numerical expression.

### Example

The following example scales a set of numerical expressions to have a
mean of `0` and standard deviation of `1`:

```sql
SELECT
  f, ML.STANDARD_SCALER(f) OVER() AS output
FROM
  UNNEST([1,2,3,4,5]) AS f;
```

The output looks similar to the following:

```text
+---+---------------------+
| f |       output        |
+---+---------------------+
| 1 | -1.2649110640673518 |
| 5 |  1.2649110640673518 |
| 2 | -0.6324555320336759 |
| 4 |  0.6324555320336759 |
| 3 |                 0.0 |
+---+---------------------+
```

### What's next

- For information about feature preprocessing, see [Feature preprocessing overview](https://docs.cloud.google.com/bigquery/docs/preprocess-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-standard-scaler (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

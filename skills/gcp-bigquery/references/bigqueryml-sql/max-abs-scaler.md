---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-max-abs-scaler
---

# The ML.MAX_ABS_SCALER function

## Signature / Usage

This document describes the `ML.MAX_ABS_SCALER` function, which lets you
scale a numerical expression to the range
`[-1, 1]` by dividing with the maximum absolute value. It doesn't
shift or center the data, and so doesn't destroy any sparsity.

When used in the
[`TRANSFORM` clause](create.md#transform),
the maximum absolute value calculated during training is automatically
used in prediction.

You can use this function with models that support
[manual feature preprocessing](https://docs.cloud.google.com/bigquery/docs/manual-preprocessing). For more
information, see the following documents:

- [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey)
- [Contribution analysis user journey](https://docs.cloud.google.com/bigquery/docs/contribution-analysis#contribution_analysis_user_journey)

### Syntax

```sql
ML.MAX_ABS_SCALER(numerical_expression) OVER()
```

#### Arguments

`ML.MAX_ABS_SCALER` takes the following argument:

- `numerical_expression`: the [numerical](../googlesql-syntax/data-types.md#numeric-types) expression to scale.

### Output

`ML.MAX_ABS_SCALER` returns a `FLOAT64` value that represents the scaled
numerical expression.

### Example

The following example scales a set of numerical expressions to have values
between `-1` and `1`:

```sql
SELECT f, ML.MAX_ABS_SCALER(f) OVER () AS output
FROM
  UNNEST([NULL, -3, 1, 2, 3, 4, 5]) AS f
ORDER BY f;
```

The output looks similar to the following:

```text
+------+--------+
|  f   | output |
+------+--------+
| NULL |   NULL |
|   -3 |   -0.6 |
|    1 |    0.2 |
|    2 |    0.4 |
|    3 |    0.6 |
|    4 |    0.8 |
|    5 |    1.0 |
+------+--------+
```

### What's next

- For information about feature preprocessing, see [Feature preprocessing overview](https://docs.cloud.google.com/bigquery/docs/preprocess-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-max-abs-scaler (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

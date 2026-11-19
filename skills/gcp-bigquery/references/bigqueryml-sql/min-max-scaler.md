---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-min-max-scaler
---

# The ML.MIN_MAX_SCALER function

## Signature / Usage

This document describes the `ML.MIN_MAX_SCALER` function, which lets you scale
a numerical_expression to the range `[0, 1]`. Negative values are set to `0`,
and values above `1` are set to `1`.

When used in the
[`TRANSFORM` clause](create.md#transform),
the range of `[0,1]` is automatically used in prediction, and predicted
values outside that range are similarly capped.

You can use this function with models that support
[manual feature preprocessing](https://docs.cloud.google.com/bigquery/docs/manual-preprocessing). For more
information, see the following documents:

- [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey)
- [Contribution analysis user journey](https://docs.cloud.google.com/bigquery/docs/contribution-analysis#contribution_analysis_user_journey)

### Syntax

```sql
ML.MIN_MAX_SCALER(numerical_expression) OVER()
```

#### Arguments

`ML.MIN_MAX_SCALER` takes the following argument:

- `numerical_expression`: the [numerical](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#numeric_types) expression to scale.

### Output

`ML.MIN_MAX_SCALER` returns a `FLOAT64` value that represents the scaled
numerical expression.

### Example

The following example scales a set of numerical expressions to values between
`0` and `1`:

```sql
SELECT
  f, ML.MIN_MAX_SCALER(f) OVER() AS output
FROM
  UNNEST([1,2,3,4,5]) AS f;
```

The output looks similar to the following:

```text
+---+--------+
| f | output |
+---+--------+
| 4 |   0.75 |
| 2 |   0.25 |
| 1 |    0.0 |
| 3 |    0.5 |
| 5 |    1.0 |
+---+--------+
```

### What's next

- For information about feature preprocessing, see [Feature preprocessing overview](https://docs.cloud.google.com/bigquery/docs/preprocess-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-min-max-scaler (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

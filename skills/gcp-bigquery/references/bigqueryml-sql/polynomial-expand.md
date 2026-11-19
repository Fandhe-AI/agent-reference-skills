---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-polynomial-expand
---

# The ML.POLYNOMIAL_EXPAND function

## Signature / Usage

This document describes the `ML.POLYNOMIAL_EXPAND` function, which lets you
calculate all polynomial combinations of the input features.

You can use this function with models that support
[manual feature preprocessing](https://docs.cloud.google.com/bigquery/docs/manual-preprocessing). For more
information, see the following documents:

- [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey)
- [Contribution analysis user journey](https://docs.cloud.google.com/bigquery/docs/contribution-analysis#contribution_analysis_user_journey)

### Syntax

```sql
ML.POLYNOMIAL_EXPAND(struct_numerical_features [, degree])
```

#### Arguments

`ML.POLYNOMIAL_EXPAND` takes the following arguments:

- `struct_numerical_features`: a `STRUCT` value that contains the [numerical](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#numeric_types) input features to expand. You can specify less than or equal to `10` input features. Don't specify unnamed features or duplicate features.
- `degree`: an `INT64` value that specifies the highest degree of all combinations in the range of `[1, 4]`. The default value is `2`.

### Output

`ML.POLYNOMIAL_EXPAND` returns a `STRUCT` value that contain all
polynomial combinations of the numerical input features with a degree no larger
than the passed-in degree, including the original features. The field names of
the output struct are concatenations of the original feature names.

### Example

The following example calculates the polynomial expansion of two
numerical features:

```sql
SELECT
  ML.POLYNOMIAL_EXPAND(STRUCT(2 AS f1, 3 AS f2)) AS output;
```

The output looks similar to the following:

```text
+-------------------------------------------------------------------+
|                              output                               |
+-------------------------------------------------------------------+
| {"f1":"2.0","f1_f1":"4.0","f1_f2":"6.0","f2":"3.0","f2_f2":"9.0"} |
+-------------------------------------------------------------------+
```

### What's next

- For information about feature preprocessing, see [Feature preprocessing overview](https://docs.cloud.google.com/bigquery/docs/preprocess-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-polynomial-expand (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the output is described as a `STRUCT<STRING>` value, but its fields are polynomial combinations of numerical input features, so they are numbers, not strings (the quoted values in the JSON-formatted example output don't mean `STRING`); it is written as a `STRUCT` value. The source does not give the field type.

## Related

- [Index of this directory](./README.md)

---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-feature-cross
---

# The ML.FEATURE_CROSS function

## Signature / Usage

This document describes the `ML.FEATURE_CROSS` function, which lets you create
[feature crosses](https://developers.google.com/machine-learning/crash-course/feature-crosses/video-lecture).

You can use this function with models that support
[manual feature preprocessing](https://docs.cloud.google.com/bigquery/docs/manual-preprocessing). For more
information, see the following documents:

- [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey)
- [Contribution analysis user journey](https://docs.cloud.google.com/bigquery/docs/contribution-analysis#contribution_analysis_user_journey)

### Syntax

```sql
ML.FEATURE_CROSS(struct_categorical_features [, degree])
```

#### Arguments

`ML.FEATURE_CROSS` takes the following arguments:

- `struct_categorical_features`: a `STRUCT<STRING>` value that specifies the categorical features to cross. The maximum number of input features is 10. Don't specify unnamed features or duplicate features in `struct_numerical_features`.
- `degree`: an `INT64` value that specifies the highest degree of all combinations of features in the range of `[2, 4]`. The default value is `2`.

### Output

`ML.FEATURE_CROSS` returns a `STRUCT<STRING>` value that identifies all
combinations of the crossed categorical features with a degree no larger than
the `degree` value, except for 1-degree items (the original features) and
self-crossing items. The field names in the output struct are concatenations
of the original feature names.

### Example

The following example crosses three features:

```sql
SELECT
  ML.FEATURE_CROSS(STRUCT('a' AS f1, 'b' AS f2, 'c' AS f3)) AS output;
```

The output looks similar to the following:

```text
+---------------------------------------------+
|                   output                    |
+---------------------------------------------+
| {"f1_f2":"a_b","f1_f3":"a_c","f2_f3":"b_c"} |
+---------------------------------------------+
```

### What's next

- For information about feature preprocessing, see [Feature preprocessing overview](https://docs.cloud.google.com/bigquery/docs/preprocess-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-feature-cross (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

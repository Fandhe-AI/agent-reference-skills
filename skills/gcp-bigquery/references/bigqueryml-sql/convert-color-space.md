---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-convert-color-space
---

# The ML.CONVERT_COLOR_SPACE function

## Signature / Usage

This document describes the `ML.CONVERT_COLOR_SPACE` scalar function, which lets
you convert images that have an `RGB` color space to a different color space.
You can use `ML.CONVERT_COLOR_SPACE` with the [`ML.PREDICT`
function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-predict) or
chain it with other functions or subqueries.

### Syntax

```sql
ML.CONVERT_COLOR_SPACE(image, target_color_space)
```

#### Arguments

`ML.CONVERT_COLOR_SPACE` takes the following arguments:

- `image`: a `STRUCT` value that represents an `RGB` image in one of the
  following forms:

  - `STRUCT<ARRAY<INT64>, ARRAY<FLOAT64>>`
  - `STRUCT<ARRAY<INT64>, ARRAY<INT64>>`

  The first array in the struct must contain the dimensions of the image.
  It must contain three `INT64` values, which represent the image height (H),
  width (W), and number of channels (C).

  The second array in the struct must contain the image data. The
  length of the array must be equivalent to H x W x C from the preceding
  array. If the image data is in `FLOAT64`, each value in the array must be
  between `[0, 1)`. If the image data is in `INT64`, each value in the array
  must be between `[0, 255)`.

  The struct value must be \<= 60 MB.
- `target_color_space`: a `STRING` value that specifies the target color space.
  Valid values are `HSV`, `GRAYSCALE`, `YIQ`, and `YUV`.

### Output

`ML.CONVERT_COLOR_SPACE` returns a `STRUCT` value that represents the
modified image in the form `STRUCT<ARRAY<INT64>, ARRAY<FLOAT64>>`.

The first array in the struct represents the dimensions of the image, and
the second array in the struct contains the image data, similar
to the `image` input argument. Each value in the second array is between
`[0, 1)`.

> [!NOTE]
> **Note:** If you reference `ML.CONVERT_COLOR_SPACE` in SQL statements in the BigQuery editor, it is possible for the function output to be too large to display. If this occurs, write the output to a table instead.

### Example

The following example uses the `ML.CONVERT_COLOR_SPACE` function within the
`ML.PREDICT` function to change the color space for input images from `RGB` to
`GRAYSCALE`:

Adapted (not in the official docs): the input query of `ML.PREDICT` is enclosed in parentheses, as the `ML.PREDICT` syntax requires for a query argument.

```sql
CREATE OR REPLACE TABLE mydataset.model_output
AS (
  SELECT *
  FROM
    ML.PREDICT(
      MODEL `mydataset.mymodel`,
      (SELECT
        ML.CONVERT_COLOR_SPACE(ML.DECODE_IMAGE(data), 'GRAYSCALE')
          AS image,
        uri
      FROM `mydataset.images`))
);
```

### What's next

- For information about feature preprocessing, see [Feature preprocessing overview](https://docs.cloud.google.com/bigquery/docs/preprocess-overview).
- For more information about supported SQL statements and functions for each
  model type, see the following documents:

  - [End-to-end user journeys for generative AI models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-genai)
  - [End-to-end user journeys for time series forecasting models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-forecast)
  - [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey)
  - [End-to-end user journeys for imported models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-import)
  - [Contribution analysis user journey](https://docs.cloud.google.com/bigquery/docs/contribution-analysis#contribution_analysis_user_journey)

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-convert-color-space (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the `ML.PREDICT` example that calls `ML.CONVERT_COLOR_SPACE` passes `SELECT ... FROM` as the second argument without parentheses; the `ML.PREDICT` syntax takes ``{ TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) }``, so the query is enclosed in parentheses.

## Related

- [Index of this directory](./README.md)

---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-convert-image-type
---

# The ML.CONVERT_IMAGE_TYPE function

## Signature / Usage

This document describes the `ML.CONVERT_IMAGE_TYPE` scalar function, which lets
you convert the data type of pixel values in an image to `INT64` with a range
of `[0, 255)`. You can use `ML.CONVERT_IMAGE_TYPE` with the
[`ML.PREDICT` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-predict)
or chain it with other functions or subqueries.

### Syntax

```sql
ML.CONVERT_IMAGE_TYPE(image)
```

#### Arguments

`ML.CONVERT_IMAGE_TYPE` takes the following argument:

- `image`: a `STRUCT<ARRAY<INT64>, ARRAY<FLOAT64>>` value that
  represents an image.

  The first array in the struct must contain the dimensions of the image.
  It must contain three `INT64` values, which represent the image height (H),
  width (W), and number of channels (C).

  The second array in the struct must contain the image data. The
  length of the array must be equivalent to H x W x C from the preceding
  array. Each value in the array must be between `[0, 1)`.

  The struct value must be \<= 60 MB.

### Output

`ML.CONVERT_IMAGE_TYPE` returns a `STRUCT<ARRAY<INT64>, ARRAY<INT64>>` value
that represents the image.

The first array in the struct represents the dimensions of the image, and
the second array in the struct contains the image data, similar
to the `image` input argument. Each value in the second array is between
`[0, 255)`.

> [!NOTE]
> **Note:** If you reference `ML.CONVERT_IMAGE_TYPE` in SQL statements in the BigQuery editor, it is possible for the function output to be too large to display. If this occurs, write the output to a table instead.

### Example

The [SSD Mobilenet V2 Object detection model](https://tfhub.dev/tensorflow/ssd_mobilenet_v2/2)
model requires input to be in `tf.uint8`. The following example changes the
pixel values for the input images from floating point numbers to integers
so that they work with this model:

```sql
CREATE OR REPLACE TABLE mydataset.detections
AS (
  SELECT uri, detection_scores
  FROM
    ML.PREDICT(
      MODEL `mydataset.mobilenet`,
      SELECT
        ML.CONVERT_IMAGE_TYPE(ML.DECODE_IMAGE(data))
          AS image,
        uri
      FROM `mydataset.images`)
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

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-convert-image-type (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

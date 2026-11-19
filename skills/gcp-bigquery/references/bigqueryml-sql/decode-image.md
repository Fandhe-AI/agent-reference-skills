---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-decode-image
---

# The ML.DECODE_IMAGE function

## Signature / Usage

This document describes the `ML.DECODE_IMAGE` scalar function, which lets you
convert image bytes to a multi-dimensional `ARRAY` representation. This
conversion lets you do inference using the
[`ML.PREDICT` function](predict.md)
on vision models that require images to be in `ARRAY` format.

### Syntax

```sql
ML.DECODE_IMAGE(data) AS input_field
```

#### Arguments

`ML.DECODE_IMAGE` takes the following argument:

- `data`: this argument must be a reference to one of the following:

  - A `BYTES` value that represents an image in one of the following
    formats:

    - JPEG
    - PNG
    - BMP
  - The `data` pseudocolumn of an object table.

    If you are referencing
    only the object table in the
    [`query_statement`](predict.md#arguments)
    of the `ML.PREDICT` function, you can specify `data` as the value. If you are
    joining the object table with other tables in the `query_statement` of the
    `ML.PREDICT` function, then you should fully qualify the `data` value as
    `dataset_name`.`object_table_name`.`data`.
    This lets you avoid ambiguity if the tables share any column names.

  The `data` argument value must be \<= 10 MB (10,000,000 bytes).

### Output

`ML.DECODE_IMAGE` returns a `STRUCT<ARRAY<INT64>, ARRAY<FLOAT64>>` value that
represents the image.

The first array in the struct represents the dimensions of the image.
It contains three `INT64` values, which represent the image height (H),
width (W), and number of channels (C).

The second array in the struct contains the decoded image data. The length of
the array is equivalent to H x W x C from the preceding array. Each value
in the array is between `[0, 1)`.

For example, a 1x2 image in the `RGB` color space might have a form
similar to `[[0.1,0.2,0.3],[0.4,0.5,0.6]]`, which would be represented
as a struct in the form `([1,2,3],[0.1,0.2,0.3,0.4,0.5,0.6])`.

If the struct value is larger than 60 MB, it is downscaled to that size
while preserving aspect ratio.

You can use `ML.DECODE_IMAGE` output directly in an `ML.PREDICT` function,
or you can write the results to a table column and reference that column
when you call `ML.PREDICT`. You can also pass `ML.DECODE_IMAGE` output to
another image processing function for additional preprocessing.

> [!NOTE]
> **Note:** If you reference `ML.DECODE_IMAGE` in SQL statements in the BigQuery editor, it is possible for the function output to be too large to display. If this occurs, write the output to a table instead.

If you are using `ML.DECODE_IMAGE` output directly
in an `ML.PREDICT` function, you must alias the output of this function
with the name of an input field for the model that is referenced in the
`ML.PREDICT` function. You can find this information by
[inspecting the model](https://docs.cloud.google.com/bigquery/docs/object-table-inference#inspect_the_model)
and looking at the field names in the **Features** section. For more
information, see
[Run inference on image object tables](https://docs.cloud.google.com/bigquery/docs/object-table-inference).

### Examples

The following examples show different ways you can use the `ML.DECODE_IMAGE`
function.

**Example 1**

The following example uses the `ML.DECODE_IMAGE` function directly in the
`ML.PREDICT` function. It returns the inference results for all images in the
object table, for a model with an input field of `input` and an output
field of `feature`:

```googlesql
SELECT * FROM
ML.PREDICT(
  MODEL `my_dataset.vision_model`,
  (SELECT uri, ML.RESIZE_IMAGE(ML.DECODE_IMAGE(data), 480, 480, FALSE) AS input
  FROM `my_dataset.object_table`)
);
```

**Example 2**

The following example uses the `ML.DECODE_IMAGE` function directly in the
`ML.PREDICT` function, and uses the `ML.CONVERT_COLOR_SPACE` function in the
`ML.PREDICT` function to convert
the image color space from `RBG` to `YIQ`. It also shows how to
use object table fields to filter the objects included in inference.
It returns the inference results for all JPG images in the
object table, for a model with an input field of `input` and an output
field of `feature`:

```googlesql
SELECT * FROM
  ML.PREDICT(
    MODEL `my_dataset.vision_model`,
    (SELECT uri, ML.CONVERT_COLOR_SPACE(ML.RESIZE_IMAGE(ML.DECODE_IMAGE(data), 224, 280, TRUE), 'YIQ') AS input
    FROM `my_dataset.object_table`
    WHERE content_type = 'image/jpeg')
  );
```

**Example 3**

The following example uses results from `ML.DECODE_IMAGE` that have been
written to a table column but not processed any further. It uses
`ML.RESIZE_IMAGE` and `ML.CONVERT_IMAGE_TYPE` in the `ML.PREDICT` function to
process the image data. It returns the inference results for all images in the
decoded images table, for a model with an input field of `input` and an output
field of `feature`.

Create the decoded images table:

Adapted (not in the official docs): the table also keeps the `uri` column, which the inference query selects.

```googlesql
CREATE OR REPLACE TABLE `my_dataset.decoded_images`
  AS (SELECT uri, ML.DECODE_IMAGE(data) AS decoded_image
  FROM `my_dataset.object_table`);
```

Run inference on the decoded images table:

```googlesql
SELECT * FROM
ML.PREDICT(
  MODEL`my_dataset.vision_model`,
  (SELECT uri, ML.CONVERT_IMAGE_TYPE(ML.RESIZE_IMAGE(decoded_image, 480, 480, FALSE)) AS input
  FROM `my_dataset.decoded_images`)
);
```

**Example 4**

The following example uses results from `ML.DECODE_IMAGE` that have been
written to a table column and preprocessed using
`ML.RESIZE_IMAGE`. It returns the inference results for all images in the
decoded images table, for a model with an input field of `input` and an output
field of `feature`.

Create the table:

Adapted (not in the official docs): the missing comma after `ML.DECODE_IMAGE(data)` is added, and the table also keeps the `uri` column, which the inference query selects.

```googlesql
CREATE OR REPLACE TABLE `my_dataset.decoded_images`
  AS (SELECT uri, ML.RESIZE_IMAGE(ML.DECODE_IMAGE(data), 480, 480, FALSE) AS decoded_image
  FROM `my_dataset.object_table`);
```

Run inference on the decoded images table:

```googlesql
SELECT * FROM
ML.PREDICT(
  MODEL `my_dataset.vision_model`,
  (SELECT uri, decoded_image AS input
  FROM `my_dataset.decoded_images`)
);
```

**Example 5**

The following example uses the `ML.DECODE_IMAGE` function directly in the
`ML.PREDICT` function. In this example, the model has an output field of
`embeddings` and two input fields: one that expects an
image, `f_img`, and one that expects a string, `f_txt`. The image
input comes from the object table and the string input comes from a
standard BigQuery table that is joined with the object table
by using the `uri` column.

Adapted (not in the official docs): the columns are qualified with the table names used in `FROM` and `JOIN` (`object_table`, `image_description`), and `uri` is qualified because both tables have it.

```googlesql
SELECT * FROM
  ML.PREDICT(
    MODEL `my_dataset.mixed_model`,
    (SELECT object_table.uri, ML.RESIZE_IMAGE(ML.DECODE_IMAGE(object_table.data), 224, 224, FALSE) AS f_img,
      image_description.description AS f_txt
    FROM `my_dataset.object_table`
    JOIN `my_dataset.image_description`
    ON object_table.uri = image_description.uri)
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

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-decode-image (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the decoded images tables in the examples that write `ML.DECODE_IMAGE` results to a table keep only `decoded_image`, but the inference queries select `uri`; the tables also keep `uri`. The resize example also lacks the comma after `ML.DECODE_IMAGE(data)` in `ML.RESIZE_IMAGE`, which is added.
- Corrected from the official docs: the example that joins the object table with `my_dataset.image_description` qualifies the image column as `my_dataset.my_object_table.data` although the `FROM` clause reads `my_dataset.object_table`, and selects the unqualified `uri` that both joined tables have; the columns are qualified as `object_table.uri`, `object_table.data` and `image_description.description`.

## Related

- [Index of this directory](./README.md)

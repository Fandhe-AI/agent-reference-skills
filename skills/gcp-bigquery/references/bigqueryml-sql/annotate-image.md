---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-annotate-image
---

# The ML.ANNOTATE_IMAGE function

## Signature / Usage

This document describes the `ML.ANNOTATE_IMAGE` function, which lets you
annotate images that are stored in BigQuery
[object tables](https://docs.cloud.google.com/bigquery/docs/object-table-introduction) by using the
[Cloud Vision API](https://docs.cloud.google.com/vision).

### Syntax

```sql
ML.ANNOTATE_IMAGE(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`,
  TABLE `PROJECT_ID.DATASET.OBJECT_TABLE`,
  STRUCT( [VISION_FEATURES] AS vision_features )
)
```

#### Arguments

`ML.ANNOTATE_IMAGE` takes the following arguments:

- `PROJECT_ID`: the project that
  contains the resource.

- `DATASET`: the BigQuery dataset that
  contains the resource.

- `MODEL_NAME`: the name of a
  [remote model](create-remote-model-service.md)
  with a
  [`REMOTE_SERVICE_TYPE` argument](create-remote-model-service.md#remote_service_type)
  of `CLOUD_AI_VISION_V1`.

- `OBJECT_TABLE` : the name of the
  [object table](https://docs.cloud.google.com/bigquery/docs/object-table-introduction)
  that contains URIs of the images.

- `VISION_FEATURES`: a `ARRAY<STRING>` value that
  specifies one or more feature
  names of supported Vision API features, in the format
  `['feature_name_1', 'feature_name_2', ...]`. The supported features are
  as follows:

  - [`FACE_DETECTION`](https://docs.cloud.google.com/vision/docs/detecting-faces)

  - [`LANDMARK_DETECTION`](https://docs.cloud.google.com/vision/docs/detecting-landmarks)

  - [`LOGO_DETECTION`](https://docs.cloud.google.com/vision/docs/detecting-logos)

  - [`LABEL_DETECTION`](https://docs.cloud.google.com/vision/docs/labels)

  - [`TEXT_DETECTION`](https://docs.cloud.google.com/vision/docs/ocr)

  - [`DOCUMENT_TEXT_DETECTION`](https://docs.cloud.google.com/vision/docs/pdf)

  - [`IMAGE_PROPERTIES`](https://docs.cloud.google.com/vision/docs/detecting-properties)

  - [`OBJECT_LOCALIZATION`](https://docs.cloud.google.com/vision/docs/object-localizer)

### Output

`ML.ANNOTATE_IMAGE` returns the input table plus the following columns:

- `ml_annotate_image_result`: a `JSON` value that contains the image annotation result from the Vision API.
- `ml_annotate_image_status`: a `STRING` value that contains the API response status for the corresponding row. This value is empty if the operation was successful.

### Quotas

See [Cloud AI service functions quotas and limits](https://docs.cloud.google.com/bigquery/quotas#cloud_ai_service_functions).

### Known issues

Sometimes after a query job that uses this function finishes successfully,
some returned rows contain the following error message:

```sql
A retryable error occurred: RESOURCE EXHAUSTED error from <remote endpoint>
```

This issue occurs because BigQuery query jobs finish successfully
even if the function fails for some of the rows. The function fails when the
volume of API calls to the remote endpoint exceeds the quota limits for that
service. This issue occurs most often when you are running multiple parallel
batch queries. BigQuery retries these calls, but if the retries
fail, the `resource exhausted` error message is returned.

To iterate through inference calls until all rows are successfully processed,
you can use the
[BigQuery remote inference SQL scripts](https://github.com/GoogleCloudPlatform/bigquery-ml-utils/tree/master/sql_scripts/remote_inference)
or the
[BigQuery remote inference pipeline Dataform package](https://github.com/dataform-co/dataform-bqml).

### Locations

`ML.ANNOTATE_IMAGE` must run in the same region as the remote model that the
function references. For more information about supported locations for models
based on the Vision API, see [Locations for remote models](https://docs.cloud.google.com/bigquery/docs/locations#locations-for-remote-models).

### Examples

**Example 1**

The following example performs label detection on the object table `mytable` in
`mydataset`:

```sql
# Create model
CREATE OR REPLACE MODEL
`myproject.mydataset.myvisionmodel`
REMOTE WITH CONNECTION `myproject.myregion.myconnection`
OPTIONS (remote_service_type = 'cloud_ai_vision_v1');
```

```sql
# Annotate image
SELECT *
FROM ML.ANNOTATE_IMAGE(
  MODEL `mydataset.myvisionmodel`,
  TABLE `mydataset.mytable`,
  STRUCT(['label_detection'] AS vision_features)
);
```

The result is similar to the following:

```sh
ml_annotate_image_result  | ml_annotate_image_status | uri | generation | content_type |  size   |  md5_hash  |  updated | metadata |
------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | --------
{"label_annotations":[{"description":"Food","mid":"/m/02wbm","score":0.97591567,"topicality":0.97591567}]}  | | gs://my-bucket/images/Cheeseburger.jpg | 1661921874516197 | image/jpeg   |  174600 | a259a5076c22696848a1bc10b7162cc2 | 2022-08-31 04:57:54 | []
```

**Example 2**

The following example annotates images in the object table `mytable`, selects
the rows where the detected label is `food` and the score is higher than `0.97`,
and then returns the results in separate columns:

```sql
CREATE TABLE
  `mydataset.label_score` AS (
  SELECT
    uri AS `Input image path`,
    STRING(ml_annotate_image_result.label_annotations[0].description) AS `Detected label`,
    FLOAT64(ml_annotate_image_result.label_annotations[0].score) AS Score,
    FLOAT64(ml_annotate_image_result.label_annotations[0].topicality) AS Topicality,
    ml_annotate_image_status AS Status
  FROM
    ML.ANNOTATE_IMAGE( MODEL `mydataset.myvisionmodel`,
      TABLE `mydataset.mytable`,
      STRUCT(['label_detection'] AS vision_features))
  );

SELECT
  *
FROM
  `mydataset.label_score`
WHERE
  `Detected label` ='Food'
  AND Score > 0.97;
```

The result is similar to the following:

```sh
Input image path  | Detected label | Score | Topicality | Status |
------- | -------- | -------- | -------- | --------
gs://my-bucket/images/Cheeseburger.jpg | Food |  0.97591567 | 0.97591567 | |
```

If you get an error like `query limit exceeded`, you might have exceeded the
[quota](https://docs.cloud.google.com/bigquery/quotas#cloud_ai_service_functions) for this function, which
can leave you with unprocessed rows. Use the following query to complete
processing the unprocessed rows:

```sql
CREATE TABLE
  `mydataset.label_score_next` AS (
  SELECT
    uri AS `Input image path`,
    STRING(ml_annotate_image_result.label_annotations[0].description) AS `Detected label`,
    FLOAT64(ml_annotate_image_result.label_annotations[0].score) AS Score,
    FLOAT64(ml_annotate_image_result.label_annotations[0].topicality) AS Topicality,
    ml_annotate_image_status AS Status
  FROM
    ML.ANNOTATE_IMAGE( MODEL `mydataset.myvisionmodel`,
      TABLE `mydataset.mytable`,
      STRUCT(['label_detection'] AS vision_features))
  WHERE uri NOT IN (
    SELECT `Input image path` FROM `mydataset.label_score`
    WHERE STATUS = '')
  );

SELECT * FROM `mydataset.label_score_next`;
```

### What's next

- Get step-by-step instructions on how to [annotate images in an object table](https://docs.cloud.google.com/bigquery/docs/annotate-image) using the `ML.ANNOTATE_IMAGE` function.
- Learn more about [other functions you can use](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/inference-overview#pretrained-models) to analyze BigQuery data.
- For information about model inference, see [Model inference overview](https://docs.cloud.google.com/bigquery/docs/inference-overview).
- For more information about supported SQL statements and functions for generative AI models, see [End-to-end user journeys for generative AI models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-genai).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-annotate-image (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

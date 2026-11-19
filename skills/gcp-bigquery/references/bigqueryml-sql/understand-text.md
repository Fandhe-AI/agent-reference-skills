---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-understand-text
---

# The ML.UNDERSTAND_TEXT function

## Signature / Usage

This document describes the `ML.UNDERSTAND_TEXT` function, which lets you
analyze text that's stored in BigQuery tables by using the Cloud Natural Language API.

### Syntax

```sql
ML.UNDERSTAND_TEXT(
  MODEL `PROJECT_ID.DATASET.MODEL`,
  { TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) },
  STRUCT('OPTION_NAME' AS nlu_option
  [, FLATTEN_JSON_OUTPUT AS flatten_json_output]
  [, ENCODING_TYPE AS encoding_type])
)
```

#### Arguments

`ML.UNDERSTAND_TEXT` takes the following arguments:

- `PROJECT_ID`: the project that contains the
  resource.

- `DATASET`: the dataset that contains the
  resource.

- `MODEL`: the name of a
  [remote model](create-remote-model-service.md)
  with a
  [`REMOTE_SERVICE_TYPE`](create-remote-model-service.md#remote_service_type)
  of
  `CLOUD_AI_NATURAL_LANGUAGE_V1`.

- `TABLE`: the name of the BigQuery table
  that contains text data. The text analysis is applied on the column with name
  `text_content` in this table. If your table does not have `text_content`
  column, use a `SELECT` statement for this argument to provide an alias for an
  existing table column, as shown in the following example:

  Adapted (not in the official docs): the model argument is written as `MODEL `mydataset.mymodel``, as in the syntax block.

  ```sql
  SELECT * from ML.UNDERSTAND_TEXT(
    MODEL `mydataset.mymodel`,
    (SELECT comment AS text_content from mydataset.mytable),
    STRUCT('ANALYZE_SYNTAX' AS nlu_option)
  );
  ```

  An error occurs if no `text_content` column is available.
- `QUERY_STATEMENT`: a query whose result contains the
  text data. The text analysis is applied on the column in the query named
  `text_content`. You can alias an existing table column as `text_content` if
  necessary. For information about the supported SQL syntax of the
  `QUERY_STATEMENT` clause, see
  [GoogleSQL query syntax](../googlesql-syntax/query-syntax-1.md#sql-syntax).

- `OPTION_NAME`: a `STRING` value that specifies the
  feature name of a supported
  Natural Language API feature. The supported features are as follows:

  - [`ANALYZE_ENTITIES`](https://docs.cloud.google.com/natural-language/docs/analyzing-entities)

  - [`ANALYZE_ENTITY_SENTIMENT`](https://docs.cloud.google.com/natural-language/docs/analyzing-entity-sentiment)

  - [`ANALYZE_SENTIMENT`](https://docs.cloud.google.com/natural-language/docs/analyzing-sentiment)

  - [`ANALYZE_SYNTAX`](https://docs.cloud.google.com/natural-language/docs/analyzing-syntax)

  - [`CLASSIFY_TEXT`](https://docs.cloud.google.com/natural-language/docs/classifying-text)

- `FLATTEN_JSON_OUTPUT`: a `BOOL` value that determines
  whether the JSON content returned by the function is parsed into separate
  columns. The default is `FALSE`.

- `ENCODING_TYPE`: a `STRING` value that specifies the
  encoding that the Cloud Natural Language API uses to determine encoding-dependent information such as the [`beginOffset`](https://docs.cloud.google.com/natural-language/docs/reference/rest/v2/TextSpan) value. For more information, see [`EncodingType`](https://docs.cloud.google.com/natural-language/docs/reference/rest/v1/EncodingType). You can specify this option for any NLU option except for `CLASSIFY_TEXT`. The default value is `NONE`. The supported types are as follows:

  - `NONE`

  - `UTF8`

  - `UTF16`

  - `UTF32`

### Output

`ML.UNDERSTAND_TEXT` returns the input table plus the following columns:

- `ml_understand_text_result`: a `JSON` value that contains the text analysis result from Natural Language API. This column is returned when `flatten_json_output` is `FALSE`.
- `entities`: a `JSON` value that contains the recognized entities in the input document. This column is returned when `flatten_json_output` is `TRUE` and `option_name` is `ANALYZE_ENTITIES` or `ANALYZE_ENTITY_SENTIMENT`.
- `language`: a `STRING` value that gives the language of the text. This column is returned when `flatten_json_output` is `TRUE` and `option_name` is `ANALYZE_ENTITIES`, `ANALYZE_ENTITY_SENTIMENT`, `ANALYZE_SENTIMENT`, or `ANALYZE_SYNTAX`.
- `sentiment`: a `JSON` value that contains the overall sentiment of the input document. This column is returned when `flatten_json_output` is `TRUE` and `option_name` is `ANALYZE_SENTIMENT`.
- `sentences`: a `JSON` value that contains the sentiment for all sentences in the document. This column is returned when `flatten_json_output` is `TRUE` and `option_name` is `ANALYZE_SENTIMENT` or `ANALYZE_SYNTAX`.
- `tokens`: a `JSON` value that contains the tokens, along with their syntactic information, in the input document. This column is returned when `flatten_json_output` is `TRUE` and `option_name` is `ANALYZE_SYNTAX`.
- `categories`: a `JSON` value that contains the categories representing the input document. This column is returned when `flatten_json_output` is `TRUE` and `option_name` is `CLASSIFY_TEXT`.
- `ml_understand_text_status`: a `STRING` value that contains the API response status for the corresponding row. This value is empty if the operation was successful.

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

`ML.UNDERSTAND_TEXT` must run in the same region as the remote model that the
function references. For more information about supported locations for models
based on the Natural Language API, see [Locations for remote models](https://docs.cloud.google.com/bigquery/docs/locations#locations-for-remote-models).

### Examples

**Example 1**

The following example applies classify_text on the bq table `mybqtable` in
`mydataset`.

```sql
# Create Model
CREATE OR REPLACE MODEL
`myproject.mydataset.mynlpmodel`
REMOTE WITH CONNECTION `myproject.myregion.myconnection`
OPTIONS (remote_service_type ='cloud_ai_natural_language_v1');
```

```sql
# Understand Text
SELECT * FROM ML.UNDERSTAND_TEXT(
  MODEL `mydataset.mynlpmodel`,
  TABLE `mydataset.mybqtable`,
  STRUCT('classify_text' AS nlu_option)
);
```

The output is similar to the following:

```sh
ml_understand_text_result  | ml_understand_text_status | text_content |
------- | -------- | --------
{"categories":[{"confidence":0.51999998,"name":"/Arts & Entertainment/TV & Video/TV Shows & Programs"}]} | | That actor on TV makes movies in Hollywood and also stars in a variety of popular new TV shows.
```

**Example 2**

The following example classify the text in the column `text_content` in the
table `mybqtable`, selects the rows where confidence is higher than `0.5`, and
then returns the results in separate columns.

```sql
CREATE TABLE
  `mydataset.classfied_result` AS (
  SELECT
    text_content AS `Original Input`,
    STRING(ml_understand_text_result.categories[0].name) AS `Classified Name`,
    FLOAT64(ml_understand_text_result.categories[0].confidence) AS `Confidence`,
    ml_understand_text_status AS `Status`
  FROM
    ML.UNDERSTAND_TEXT( MODEL `mydataset.mynlpmodel`,
      TABLE `mydataset.mybqtable`,
      STRUCT('classify_text' AS nlu_option))
  );

SELECT
  *
FROM
  `mydataset.classfied_result`
WHERE
  confidence > 0.5;
```

The output is similar to the following:

```sh
Original Input  | Classified Name | Confidence | Status |
------- | -------- | -------- | --------
That actor on TV makes movies in Hollywood and also stars in a variety of popular new TV shows. | /Arts & Entertainment/TV & Video/TV Shows & Programs| 0.51999998 | |
```

If you get an error like `query limit exceeded`, you might have exceeded the
[quota](https://docs.cloud.google.com/bigquery/quotas#cloud_ai_service_functions) for this function, which
can leave you with unprocessed rows. Use the following query to complete
processing the unprocessed rows:

```sql
CREATE TABLE
  `mydataset.classfied_result_next` AS (
  SELECT
    text_content AS `Original Input`,
    STRING(ml_understand_text_result.categories[0].name) AS `Classified Name`,
    FLOAT64(ml_understand_text_result.categories[0].confidence) AS `Confidence`,
    ml_understand_text_status AS `Status`
  FROM
    ML.UNDERSTAND_TEXT( MODEL `mydataset.mynlpmodel`,
      (SELECT `Original Input` as text_content FROM `mydataset.classfied_result`
       WHERE Status != ''),
      STRUCT('classify_text' AS nlu_option))
  );

SELECT * FROM `mydataset.classfied_result_next`;
```

### What's next

- Get step-by-step instructions on how to [analyze text in a BigQuery table](https://docs.cloud.google.com/bigquery/docs/understand-text) using the `ML.UNDERSTAND_TEXT` function.
- Learn more about [other functions you can use](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/inference-overview#pretrained-models) to analyze BigQuery data.
- For information about model inference, see [Model inference overview](https://docs.cloud.google.com/bigquery/docs/inference-overview).
- For more information about supported SQL statements and functions for generative AI models, see [End-to-end user journeys for generative AI models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-genai).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-understand-text (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: six `Output` bullets say `flattened_json_output`. The argument is named `flatten_json_output` elsewhere on this page (the `FLATTEN_JSON_OUTPUT` argument and the `ml_understand_text_result` bullet), so the name is changed in all six bullets.
- Corrected from the official docs: the example passes `mydataset.mymodel` without the `MODEL` keyword or backticks, but the syntax block on this page is `MODEL `PROJECT_ID.DATASET.MODEL`,`. The example is changed to `MODEL `mydataset.mymodel``.

## Related

- [Index of this directory](./README.md)

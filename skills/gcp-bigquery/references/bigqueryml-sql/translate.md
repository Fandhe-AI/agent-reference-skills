---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-translate
---

# The ML.TRANSLATE function

## Signature / Usage

This document describes the `ML.TRANSLATE` function, which lets you translate
text stored in BigQuery tables by using the Cloud Translation API.

> [!NOTE]
> **Note:** For new translation queries, use the scalar [`AI.TRANSLATE` function](ai-translate.md), which uses your Google Account user credentials and doesn't require a remote model.

### Syntax

```sql
ML.TRANSLATE(
  MODEL `PROJECT_ID.DATASET.MODEL`,
  { TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) },
  STRUCT('MODE_NAME' AS translate_mode [, 'TARGET_LANGUAGE_CODE' AS target_language_code ])
)
```

#### Arguments

`ML.TRANSLATE` takes the following arguments:

- `PROJECT_ID`: the project that contains the
  resource.

- `DATASET`: the dataset that contains the
  resource.

- `MODEL`: the name of a
  [remote model](create-remote-model-service.md)
  with a
  [`REMOTE_SERVICE_TYPE`](create-remote-model-service.md#remote_service_type)
  of
  `CLOUD_AI_TRANSLATE_V3`.

- `TABLE`: the name of the BigQuery table that contains text
  data. The text analysis is applied on the column named `text_content` in
  this table. If your table does not have a `text_content` column, use a `SELECT`
  statement for this argument to provide an alias for an existing table column,
  as shown in the following example:

  ```sql
  SELECT * from ML.TRANSLATE(
    MODEL `mydataset.mymodel`,
    (SELECT comment AS text_content from mydataset.mytable),
    STRUCT('translate_text' AS translate_mode, 'en' AS target_language_code)
  );
  ```

  An error occurs if no `text_content` column is available.
- `QUERY_STATEMENT`: a query whose result contains the
  text data. The text analysis is applied on the column in the query named
  `text_content`. You can alias an existing table column as `text_content` if
  necessary. For information about the supported SQL syntax of the
  `QUERY_STATEMENT` clause, see
  [GoogleSQL query syntax](../googlesql-syntax/query-syntax-1.md#sql-syntax).

- `MODE_NAME`: a `STRING` value that specifies one of the
  following supported translation modes:

  - [`TRANSLATE_TEXT`](https://docs.cloud.google.com/translate/docs/advanced/translating-text-v3)

  - [`DETECT_LANGUAGE`](https://docs.cloud.google.com/translate/docs/advanced/detecting-language-v3)

- `TARGET_LANGUAGE_CODE`: a `STRING` value that specifies
  a [supported language code](https://docs.cloud.google.com/translate/docs/languages) for translation. This
  argument is only required when you use the `TRANSLATE_TEXT` translation mode.

### Output

`ML.TRANSLATE` returns the input table plus the following columns:

- `ml_translate_result`: a `JSON` value that contains the translation result from Cloud Translation API.
- `ml_translate_status`: a `STRING` value that contains the API response status for the corresponding row. This value is empty if the operation was successful.

### Quotas

See [Cloud AI service functions quotas and limits](https://docs.cloud.google.com/bigquery/quotas#cloud_ai_service_functions).

### Known issues

Sometimes after a query job that uses this function finishes successfully,
some returned rows contain the following error message:

```googlesql
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

`ML.TRANSLATE` must run in the same region as the remote model that the
function references. For more information about supported locations for models
based on the Cloud Translation API, see [Locations for remote models](https://docs.cloud.google.com/bigquery/docs/locations#locations-for-remote-models).

### Example

**Example 1**

The following example applies text translation on the column name
`text_content` on the bq table `mybqtable` in `mydataset` to Chinese.

```sql
# Create model
CREATE OR REPLACE MODEL
`myproject.mydataset.mytranslatemodel`
REMOTE WITH CONNECTION `myproject.myregion.myconnection`
OPTIONS (remote_service_type = 'cloud_ai_translate_v3')
```

```sql
# Translate text
SELECT * FROM ML.TRANSLATE(
  MODEL `mydataset.mytranslatemodel`,
  TABLE `mydataset.mybqtable`,
  STRUCT('translate_text' AS translate_mode, 'zh-CN' AS target_language_code));
```

The output is similar to the following:

```bash
ml_translate_result  | ml_translate_status | text_content |
------- | -------- | --------
{"glossary_translations":[],"translation_memory_translations":[],"translations":[{"detected_language_code":"en","translated_text":"苹果"}]} | | apple
```

**Example 2**

The following example translates the text in the column `text_content` in the
table `mybqtable` to Chinese, and parses the JSON results into separate columns.

```sql
# Translate text and parse the json
CREATE TABLE
  `mydataset.translate_result` AS (
  SELECT
    STRING(ml_translate_result.translations[0].detected_language_code) AS `Original Language`,
    text_content AS `Original Text`,
    "zh-CN" AS `Destination Language`,
    STRING(ml_translate_result.translations[0].translated_text) AS Translation,
    ml_translate_status as `Status`
  FROM ML.TRANSLATE(
    MODEL `mydataset.mytranslatemodel`,
    TABLE `mydataset.mybqtable`,
    STRUCT('translate_text' AS translate_mode, 'zh-CN' AS target_language_code)));

SELECT * FROM `mydataset.translate_result`;
```

The output is similar to the following:

Adapted (not in the official docs): the destination language in the result row is changed from `zh-cn.` to `zh-CN`.

```bash
Original Language  | Original Text | Destination Language | Translation  |  Status  |
------- | -------- | -------- | -------- | --------
en  |  apple  |  zh-CN |  苹果   | |
```

If you get an error like `query limit exceeded`, you might have exceeded the
[quota](https://docs.cloud.google.com/bigquery/quotas#cloud_ai_service_functions) for this function, which
can leave you with unprocessed rows. Use the following query to complete
processing the unprocessed rows:

```sql
CREATE TABLE
  `mydataset.translate_result_next` AS (
  SELECT
    STRING(ml_translate_result.translations[0].detected_language_code) AS `Original Language`,
    text_content AS `Original Text`,
    'zh-CN' AS `Destination Language`,
    STRING(ml_translate_result.translations[0].translated_text) AS Translation,
    ml_translate_status as `Status`
  FROM ML.TRANSLATE(
    MODEL `mydataset.mytranslatemodel`,
    (SELECT `Original Text` AS text_content
     FROM `mydataset.translate_result`
     WHERE Status != ''),
    STRUCT('translate_text' AS translate_mode, 'zh-CN' AS target_language_code)));

SELECT * FROM `mydataset.translate_result_next`;
```

### What's next

- Learn more about the scalar [`AI.TRANSLATE` function](ai-translate.md).
- Get step-by-step instructions on how to [translate text in BigQuery](https://docs.cloud.google.com/bigquery/docs/translate-text) by using the `AI.TRANSLATE` function.
- Learn more about [other functions you can use](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/inference-overview#pretrained-models) to analyze BigQuery data.
- For information about model inference, see [Model inference overview](https://docs.cloud.google.com/bigquery/docs/inference-overview).
- For more information about supported SQL statements and functions for generative AI models, see [End-to-end user journeys for generative AI models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-genai).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-translate (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the example result shows `zh-cn.` as the destination language, but the query on this page sets `"zh-CN" AS `Destination Language``. The result is changed to `zh-CN`.

## Related

- [Index of this directory](./README.md)

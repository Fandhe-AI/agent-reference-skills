---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-generate-bool
---

# The AI.GENERATE_BOOL function

## Signature / Usage

> [!WARNING]
>
> **Preview**
>
>
> This product or feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section
> of the [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA products and features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

> [!NOTE]
> **Note:** For support during the preview, contact [bqml-feedback@google.com](mailto:bqml-feedback@google.com).

This document describes the `AI.GENERATE_BOOL` function, which lets you
analyze any combination of text and unstructured data. For each row
in the table, the function generates a `STRUCT` that contains a `BOOL` value.

For example, you could use the following query to determine if titles from
a table of news articles are about technology:

```googlesql
SELECT title, AI.GENERATE_BOOL((title, 'Is this article about technology?')).result
FROM `bigquery-public-data.bbc_news.fulltext`
LIMIT 5;
```

The function works by sending requests to a Gemini Enterprise Agent Platform Gemini
model, and then returning that model's response.

You can use the `AI.GENERATE_BOOL` function to perform tasks such as
classification and sentiment analysis.

Prompt design can strongly affect the responses returned by the
model. For more information, see
[Introduction to prompting](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/introduction-prompt-design).

### Input

Using the `AI.GENERATE_BOOL` function, you can use the following types
of input:

- Text data from standard tables.
- [`ObjectRef` values](https://docs.cloud.google.com/bigquery/docs/work-with-objectref). You can create an `ObjectRef` value by passing a Cloud Storage URI to the [`OBJ.MAKE_REF` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions#objmake_ref) or using an `ObjectRef` column from a table.
- Combinations of unstructured data, including text, images, audio, video, and PDFs, represented by a `STRUCT` that contains `STRING`, `ARRAY<STRING>`, `ObjectRef`, and `ARRAY<ObjectRef>` values.

When you analyze unstructured data, that data must meet the following
requirements:

- Content must be in one of the supported formats that are described in the Gemini API model [`mimeType` parameter](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/gemini#parameters).
- If you are analyzing a video, the maximum supported length is two minutes. If the video is longer than two minutes, `AI.GENERATE_BOOL` only returns results based on the first two minutes.

### Syntax

```googlesql
AI.GENERATE_BOOL(
  [ prompt => ] 'PROMPT',
  [, endpoint => 'ENDPOINT']
  [, model_params => MODEL_PARAMS]
  [, connection_id => 'CONNECTION']
  [, request_type => 'REQUEST_TYPE']
)
```

#### Arguments

`AI.GENERATE_BOOL` takes the following arguments:

- `PROMPT`: a `STRING` or `STRUCT` value that specifies the `PROMPT` value to send to the model. The prompt must be the first argument that you specify. You can provide the value in the following ways:
  - Specify a `STRING` value. For example, `'This is a prompt.'`
  - Specify a `STRUCT` value that contains one or more fields. You can use the following types of fields within the `STRUCT` value:

    | Field type | Description | Examples |
    |---|---|---|
    | `STRING` or `ARRAY<STRING>` | A string literal, array of string literals, or the name of a `STRING` column. | String literal: ` 'This is a prompt.'` String column name: `my_string_column` |
    | `ObjectRef` or `ARRAY<ObjectRef>` | An [`ObjectRef`](https://docs.cloud.google.com/bigquery/docs/work-with-objectref) literal, array of `ObjectRef` literals, or the name of an `ObjectRef` column. Your input can contain at most one video object. | `OBJ.MAKE_REF('gs://my_image.jpg')` |

    The function combines `STRUCT` fields similarly to a [`CONCAT`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#concat) operation and concatenates the fields in their specified order. The same is true for the elements of any arrays used within the struct. The following table shows some examples of `STRUCT` prompt values and how they are interpreted:

    | Struct field types | Struct value | Semantic equivalent |
    |---|---|---|
    | `STRUCT<STRING, STRING, STRING>` | ` ('Describe the city of ', my_city_column, ' in 15 words')` | 'Describe the city of <var translate="no">my_city_column_value</var> in 15 words' |
    | `STRUCT<STRING, ObjectRef>` | `('Describe the following city', image_objectref_column)` | 'Describe the following city <var translate="no">image</var>' |

<!-- -->

- `ENDPOINT`: a `STRING` value that specifies the Agent Platform
  endpoint to use for the model. You can specify any
  [generally available](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models#generally_available_models)
  or
  [preview](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models#preview_models)
  Gemini model. If you specify the model name,
  BigQuery ML automatically identifies and uses the full endpoint
  of the model. If you don't specify an `ENDPOINT` value,
  BigQuery ML selects a recent stable version of
  Gemini to use. The default endpoint is
  `gemini-3.5-flash-lite`.
  You can also specify the
  [global endpoint](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/locations#use_the_global_endpoint).
  For example, specify the following endpoint:

  ```bash
  https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/GEMINI_ENDPOINT
  ```

  > [!NOTE]
  > **Note:** Don't use the global endpoint if you have requirements for the data processing location, because when you use the global endpoint, you can't control or know the region where your processing requests are handled.

  BigQuery supports the following models:
  - `gemini-4-hydrogen`
  - `gemini-4-carbon`
  - `gemini-4-argon`
  - `gemini-3.8-flash`
  - `gemini-3.7-flash`
  - `gemini-3.6-flash`
  - `gemini-3.5-flash-lite`
  - `gemini-3.5-flash`
  - `gemini-3.1-flash-lite`

  Agent Platform only supports multi-regional endpoints for these models. Regional endpoints aren't supported. If you specify a short endpoint name that omits the region, such as `gemini-3.5-flash`, then BigQuery selects an endpoint according to the following rules:
  - If your query is run in the `us` region, or any single region in the US, then BigQuery uses the `us` endpoint.
  - If your query is run in the `eu` region, or any single region in the EU other than `europe-west2` or `europe-west6`, then BigQuery uses the `eu` endpoint.
  - For all other locations, including `europe-west2` and `europe-west6`, BigQuery uses the `global` endpoint.

  To specify a specific endpoint, use a fully qualified multi-regional endpoint name in one of the following formats:
  <!-- -->

  - `https://aiplatform.us.rep.googleapis.com/v1/projects/PROJECT_ID/locations/us/publishers/google/models/MODEL_ID`
  - `https://aiplatform.eu.rep.googleapis.com/v1/projects/PROJECT_ID/locations/eu/publishers/google/models/MODEL_ID`
  - `https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/MODEL_ID`

  If your query runs in the `asia-south1` region, then you must use the fully qualified global endpoint name.

  <br />

  Using Gemini 2.5 and later models incurs charges for the
  [thinking process](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/thinking).
  You can control the thinking process by using the `model_params` argument to
  set fields in the
  [`ThinkingConfig` object](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/GenerationConfig#ThinkingConfig).
  Setting these fields lets you balance the model's reasoning depth with
  response latency and cost. For tasks where extensive internal
  reasoning isn't required, you can adjust the thinking configuration to
  receive faster responses and reduce token usage. For more information, see
  [Thinking budgets](https://ai.google.dev/gemini-api/docs/thinking#set-budget) and
  [Thinking levels](https://ai.google.dev/gemini-api/docs/thinking#thinking-levels).
  For an example of this, see
  [Disable the thinking budget](#disable-the-thinking-budget).
- `MODEL_PARAMS`: a `JSON` literal that provides additional parameters to
  the model. The `MODEL_PARAMS` value must conform to the
  [`generateContent` request body format](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.publishers.models/generateContent#request-body).
  You can provide a value for any field in the request body except for the
  `contents` field; the `contents` field is populated with the `PROMPT`
  argument value.

- `CONNECTION`: a `STRING` value specifying the connection
  to use to communicate with the model, in the format
  `[PROJECT_ID].LOCATION.CONNECTION_ID`.
  For example, `myproject.us.myconnection`.

  If you don't specify a connection, then the query uses your
  [Google Account user credentials](https://docs.cloud.google.com/bigquery/docs/permissions-for-ai-functions#run_generative_ai_queries_with_end-user_credentials).

  For information about configuring permissions, see [Set
  permissions for BigQuery ML generative AI functions that call Vertex AI models](https://docs.cloud.google.com/bigquery/docs/permissions-for-ai-functions).
- `REQUEST_TYPE`: a `STRING` value that specifies the type of inference
  request to send to the Gemini model. The request type
  determines what quota the request uses. Valid values are as
  follows:

  - `SHARED`: The function only uses [dynamic shared quota (DSQ)](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/dynamic-shared-quota).
  - `DEDICATED`: The function only uses [Provisioned Throughput](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput/overview) quota. The function returns an invalid query error if Provisioned Throughput quota isn't available. For more information, see [Use Agent Platform Provisioned Throughput](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-generate#provisioned-throughput).
  - `UNSPECIFIED`: The function uses quota as follows:

    - If you haven't purchased Provisioned Throughput quota, the function uses DSQ quota.
    - If you have purchased Provisioned Throughput quota, the function uses the Provisioned Throughput quota first. If requests exceed the Provisioned Throughput quota, the overflow traffic uses DSQ quota.

  The default value is `UNSPECIFIED`.

### Output

`AI.GENERATE_BOOL` returns a `STRUCT` value for each row in the table. The struct
contains the following fields:

- `result`: a `BOOL` value containing the model's response to the prompt. The result is `NULL` if the request fails or is filtered by [responsible AI](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/responsible-ai).
- `full_response`: a JSON value containing the [response](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/GenerateContentResponse) from the [`projects.locations.endpoints.generateContent`](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.endpoints/generateContent) call to the model. The generated text is in the `text` element.
- `status`: a `STRING` value that contains the API response status for the corresponding row. This value is empty if the operation was successful.

### Examples

The following examples assume that you have granted the [Agent Platform User role](https://docs.cloud.google.com/vertex-ai/docs/general/access-control#aiplatform.user) to your personal account.
For more information, see [Run generative AI queries with Google Account user credentials](https://docs.cloud.google.com/bigquery/docs/permissions-for-ai-functions#run_generative_ai_queries_with_end-user_credentials).

#### Use string input

To determine whether each city is located in the US, call the
`AI.GENERATE_BOOL` function and select the `result` field in the output
by running the following query:

```googlesql
SELECT
  city,
  AI.GENERATE_BOOL(('Is ', city, ' a US city?')).result
FROM UNNEST(["Seattle", "Beijing", "Paris", "London"]) city;
```

The result is similar to the following:

```text
+---------+--------+
| city    | result |
+---------+--------+
| Seattle | true   |
| Beijing | false  |
| Paris   | false  |
| London  | false  |
+---------+--------+
```

#### Filter rows using AI.GENERATE_BOOL

You can use the `AI.GENERATE_BOOL` function in a `WHERE` clause to filter rows
based on a condition described in natural language. The following example uses
`AI.GENERATE_BOOL` to filter news articles, and then uses
the [`AI.GENERATE` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-generate)
to summarize the filtered articles:

```googlesql
SELECT
  title,
  AI.GENERATE((body, "Summarize the article in a single sentence.")).result
FROM `bigquery-public-data.bbc_news.fulltext`
WHERE
  AI.GENERATE_BOOL(
    (body, "Is this news article focused on US technology? ")).result
  AND category = "tech"
LIMIT 3;
```

The result is similar to the following:

```text
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
|               title               |                                                                          result                                                                          |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| Commodore finds new lease of life | Legendary Commodore brand sold to Yeahronimo Media Ventures for £17m, with plans for new computers and a global entertainment concept.                   |
| Sony PSP handheld console hits US | Sony's PSP launches in US for $250, a portable entertainment device. It competes with Nintendo DS, offering games, music, video.                         |
| Gates opens biggest gadget fair   | Gates at CES: seamless device interoperability for managing multimedia content, online gaming, and strong electronics growth expected. No next-gen Xbox. |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
```

#### Process images in a Cloud Storage bucket

The following query creates an external table from images of pet products
stored in a publicly available Cloud Storage bucket:

```googlesql
CREATE SCHEMA IF NOT EXISTS bqml_tutorial;

CREATE OR REPLACE EXTERNAL TABLE bqml_tutorial.product_images
  WITH CONNECTION DEFAULT OPTIONS (
    object_metadata = 'SIMPLE',
    uris = ['gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/images/*.png']);
```

To determine which items show cat food, call the `AI.GENERATE_BOOL` function
and select the `result` field in the output by running the following query:

```googlesql
SELECT
  uri,
  OBJ.GET_READ_URL(ref).url AS signed_url,
  AI.GENERATE_BOOL(("Is this cat food?", ref)).result
FROM bqml_tutorial.product_images
WHERE uri LIKE '%cat%';
```

The result is similar to the following:

![AI_GENERATE_WITH_IMAGE](https://docs.cloud.google.com/static/bigquery/images/ai-generate-bool-with-image.png)

#### Disable the thinking budget

Disabling the thinking budget is useful for tasks that don't require
complex reasoning. By setting the `thinking_budget` to `0`, you can reduce the
model's response latency and lower the cost of the request by avoiding
additional "thinking" tokens. For more information, see
[Thinking budgets](https://ai.google.dev/gemini-api/docs/thinking#set-budget).

The following query shows how to set the `model_params` argument to set the
model's thinking budget to `0` for the request:

```googlesql
SELECT
  city,
  AI.GENERATE_BOOL(('Is ', city, ' a US city?'),
    model_params => JSON '{"generation_config":{"thinking_config": {"thinking_budget": 0}}}')
FROM mydataset.cities;
```

### Manage inference costs

Inference using the Vertex AI Gemini model can be a
relatively expensive operation. Due to the nature of query processing in
BigQuery, the actual number of rows processed by the model might differ
from what you expect, particularly when running complex queries, such as
`JOIN` or `ORDER BY ... LIMIT` clauses. To strictly control the number of rows
processed by your complex queries, we
recommended that you write the results of your query
to a separate table beforehand, and then
perform the Gemini inference directly on that materialized table.
For information about how to view inference charges that you incur in Agent Platform, see
[Track costs](https://docs.cloud.google.com/bigquery/docs/generative-ai-overview#track_costs). To estimate
the token count of text input, use the
[`AI.COUNT_TOKENS` function](ai-count-tokens.md).

### Use Agent Platform Provisioned Throughput

You can use
[Agent Platform Provisioned Throughput](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput/overview)
with the `AI.GENERATE_BOOL` function to provide consistent high throughput for
requests. The remote model that you reference in the `AI.GENERATE_BOOL` function
must use a
[supported Gemini model](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput/supported-models)
in order for you to use Provisioned Throughput.

To use Provisioned Throughput,
[calculate your Provisioned Throughput requirements](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput/measure-provisioned-throughput)
and then
[purchase Provisioned Throughput](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput/purchase-provisioned-throughput)
quota before running the `AI.GENERATE_BOOL` function. When you purchase
Provisioned Throughput, do the following:

- For **Model** , select the same Gemini model as the one used by the remote model that you reference in the `AI.GENERATE_BOOL` function.
- For **Region** , select the same region as the dataset that contains
  the remote model that you reference in the `AI.GENERATE_BOOL` function, with
  the following exceptions:

  - If the dataset is in the `US` multi-region, select the `us-central1` region.
  - If the dataset is in the `EU` multi-region, select the `europe-west4` region.

After you submit the order, wait for the order to be approved and appear on the
[**Orders**](https://console.cloud.google.com/vertex-ai/provisioned-throughput) page.

After you have purchased Provisioned Throughput quota, use the
`REQUEST_TYPE` argument to determine how the `AI.GENERATE_BOOL` function uses
the quota.

### Related functions

The [`AI.IF`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-if) and
[`AI.GENERATE_BOOL`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-generate-bool)
functions both use models to generate a
boolean value in response to a prompt. The following differences can help you
choose which function to use:

- **Optimized mode** : `AI.IF` supports [optimized mode](https://docs.cloud.google.com/bigquery/docs/optimize-ai-functions), which lets you process large-scale datasets with reduced cost and latency by training a distilled model. `AI.GENERATE_BOOL` doesn't support optimized mode.
- **Prompt Optimization** : `AI.IF` automatically [structures](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/structure-prompts) your prompts to improve the quality of the output.
- **Input** : `AI.GENERATE_BOOL` lets you specify model parameters to use.
- **Output** : `AI.IF` returns a `BOOL` value, which makes it easier to work with in queries. `AI.GENERATE_BOOL` returns a `STRUCT` value that contains a `BOOL` value, as well as additional information about the model call, which is useful if you need to view details such as the [safety rating](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/configure-safety-filters) or API response status.
- **Error handling** : If `AI.IF` produces an error for any input, then the function returns `NULL`. `AI.GENERATE_BOOL` records details about the errors in its output.

### Locations

You can run `AI.GENERATE_BOOL` in all of the
[regions](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/locations#google_model_endpoint_locations)
that support Gemini models, and also in the `US` and `EU`
multi-regions.

### Quotas and limits

<br />

For quota and limit information, see
[Generative AI functions](https://docs.cloud.google.com/bigquery/quotas#generative_ai_functions) in the
BigQuery quotas and limits reference.
For information about managing the cost of this function, see
[Control costs with token quotas](https://docs.cloud.google.com/bigquery/docs/control-genai-costs).

### What's next

- For more information about using Agent Platform models to generate text and embeddings, see [Generative AI overview](https://docs.cloud.google.com/bigquery/docs/generative-ai-overview).
- For more information about using Cloud AI APIs to perform AI tasks, see [AI application overview](https://docs.cloud.google.com/bigquery/docs/ai-application-overview).
- For more information about supported SQL statements and functions for generative AI models, see [End-to-end user journeys for generative AI models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-genai).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-generate-bool (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

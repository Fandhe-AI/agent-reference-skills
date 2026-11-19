---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-if
---

# The AI.IF function

## Signature / Usage

This document describes the `AI.IF` function, which uses a
Gemini Enterprise Agent Platform Gemini model to
evaluate a condition described in natural language and returns a `BOOL`.

> [!TIP]
> **Tip:** When processing large datasets, use the [optimized mode](https://docs.cloud.google.com/bigquery/docs/optimize-ai-functions) with `AI.IF` to reduce large language model (LLM) token costs and query latency.

You can use the `AI.IF` function to filter and join data based on conditions
described in natural language or multimodal input.
The following are common use cases:

- **Sentiment analysis**: Find customer reviews with negative sentiment.
- **Topic analysis**: Identify news articles related to a specific subject.
- **Image analysis**: Select images that contain a specific item.
- **Security**: Identify suspicious emails.

For example, you can use the `AI.IF` function to identify extremely negative
product reviews:

```googlesql
SELECT *
FROM mydataset.product_reviews
WHERE AI.IF(('This review is extremely negative', review));
```

### Input

`AI.IF` accepts the following types of input:

- Text data from standard tables.
- [`ObjectRef` values](https://docs.cloud.google.com/bigquery/docs/work-with-objectref). You can create an `ObjectRef` value by passing a Cloud Storage URI to the [`OBJ.MAKE_REF` function](../googlesql-functions/objectref_functions.md#objmake_ref) or using an `ObjectRef` column from a table.

When you analyze unstructured data, that data must meet the following
requirements:

- Content must be in one of the supported formats that are described in the Gemini API model [`mimeType` parameter](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference#blob).
- For more information about accepted multimodal input, see the [technical specifications](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash#technical-specifications) for Gemini.

This function passes your input to a Gemini model and
incurs charges in Gemini Enterprise Agent Platform each time it's called.
For information about how to view these charges, see
[Track costs](https://docs.cloud.google.com/bigquery/docs/generative-ai-overview#track_costs).

### Syntax

```googlesql
AI.IF(
  [ prompt => ] PROMPT
  [, examples => EXAMPLES ]
  [, connection_id => 'CONNECTION' ]
  [, endpoint => 'ENDPOINT' ]
  [, embeddings => EMBEDDINGS ]
  [, optimization_mode => 'OPTIMIZATION_MODE' ]
  [, max_error_ratio => MAX_ERROR_RATIO ]
)
```

#### Arguments

`AI.IF` takes the following arguments.

- `PROMPT`: a `STRING` or `STRUCT` value that specifies the `PROMPT` value to send to the model. The prompt must be the first argument that you specify. You can provide the value in the following ways:
  - Specify a `STRING` value. For example, `'This is a prompt.'`
  - Specify a `STRUCT` value that contains one or more fields. You can use the following types of fields within the `STRUCT` value:

    | Field type | Description | Examples |
    |---|---|---|
    | `STRING` or `ARRAY<STRING>` | A string literal, array of string literals, or the name of a `STRING` column. | String literal: ` 'This is a prompt.'` String column name: `my_string_column` |
    | `ObjectRef` or `ARRAY<ObjectRef>` | An [`ObjectRef`](https://docs.cloud.google.com/bigquery/docs/work-with-objectref) literal, array of `ObjectRef` literals, or the name of an `ObjectRef` column. Your input can contain at most one video object. | `OBJ.MAKE_REF('gs://my_image.jpg')` |

    The function combines `STRUCT` fields similarly to a [`CONCAT`](../googlesql-functions/string_functions-1.md#concat) operation and concatenates the fields in their specified order. The same is true for the elements of any arrays used within the struct. The following table shows some examples of `STRUCT` prompt values and how they are interpreted:

    | Struct field types | Struct value | Semantic equivalent |
    |---|---|---|
    | `STRUCT<STRING, STRING, STRING>` | ` ('Describe the city of ', my_city_column, ' in 15 words')` | 'Describe the city of <var translate="no">my_city_column_value</var> in 15 words' |
    | `STRUCT<STRING, ObjectRef>` | `('Describe the following city', image_objectref_column)` | 'Describe the following city <var translate="no">image</var>' |

<!-- -->

- `EXAMPLES`: an
  `ARRAY<STRUCT<STRING, BOOL>>` value that
  contains representative examples of input strings and the output truth value
  that you expect. You can provide examples to help the model understand your
  intended threshold for a condition with nuanced or subjective logic. We
  recommend that you provide at most 5 examples.

- `CONNECTION`: a `STRING` value specifying the connection
  to use to communicate with the model, in the format
  `[PROJECT_ID].LOCATION.CONNECTION_ID`.
  For example, `myproject.us.myconnection`.

  If you don't specify a connection, then the query uses your
  [Google Account user credentials](https://docs.cloud.google.com/bigquery/docs/permissions-for-ai-functions#run_generative_ai_queries_with_end-user_credentials).

  For information about configuring permissions, see [Set
  permissions for BigQuery ML generative AI functions that call Vertex AI models](https://docs.cloud.google.com/bigquery/docs/permissions-for-ai-functions).

  <br />

- `ENDPOINT`: a `STRING` value that specifies the Agent Platform
  endpoint to use for the model. You can specify any
  [generally available](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models#generally_available_models)
  or
  [preview](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models#preview_models)
  Gemini model. If you specify the model name,
  BigQuery ML automatically identifies and uses the full endpoint
  of the model. If you don't specify an `ENDPOINT` value,
  BigQuery ML dynamically chooses a model based on your query to
  have the best cost to quality tradeoff for the task.
  You can also specify the
  [global endpoint](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/locations#use_the_global_endpoint):

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

- `EMBEDDINGS`: the embeddings to use for
  [optimized mode](https://docs.cloud.google.com/bigquery/docs/optimize-ai-functions).
  This argument is optional. If you don't specify this argument, then the query
  uses standard LLM inference for all rows unless the table has
  [autonomous embedding generation](https://docs.cloud.google.com/bigquery/docs/autonomous-embedding-generation)
  enabled.

  This argument accepts the following data types:
  - `ARRAY<FLOAT64>`: use this for a single column reference.
  - `ARRAY<STRUCT<STRING, ARRAY<FLOAT64>>>`: use this to map multiple columns to their corresponding embeddings. For example: `[STRUCT('title', title_embedding), STRUCT('body', body_embedding)]`.
  - `ARRAY<STRUCT<ARRAY<STRING>, ARRAY<FLOAT64>>>`: use this for advanced mapping scenarios.
- `OPTIMIZATION_MODE`: a `STRING` value that specifies the
  optimization strategy to use. Supported values are as follows:

  - `MINIMIZE_COST` (default): uses a local, distilled model to process the majority of rows, reducing latency and cost. This mode requires input embeddings and that the input to the AI function contain approximately 3,000 rows to ensure enough data for model training.
  - `MAXIMIZE_QUALITY`: always uses the remote LLM for inference.
- `MAX_ERROR_RATIO`: a `FLOAT64` value between `0.0` and
  `1.0` that contains the maximum acceptable ratio of row-level inference
  failures to rows processed on this function. If this value is exceeded, then
  the query fails and BigQuery returns an error message that
  describes the most frequent types of errors. For example, if the value is
  `0.3` then the query fails if more than 30% of rows processed have failed to
  return results. If `max_error_ratio` is set for multiple functions, the query
  fails if the ratio is exceeded on any function. The default value is `1.0`.
  However, the query still fails if inference fails for every row. This argument
  isn't supported when `optimization_mode` is set to `MINIMIZE_COST`.

### Output

`AI.IF` returns a `BOOL` based on evaluation of the condition in the
input prompt.

If the call to Gemini Enterprise Agent Platform is unsuccessful for any reason,
such as exceeding quota or model unavailability, then the function returns
`NULL`.

### Examples

The following examples show how to use the `AI.IF` function to filter text
and join multimodal data.

#### Filter text by topic

The following query uses the `AI.IF` function to filter news
stories to those that cover a natural disaster:

```googlesql
SELECT
  title, body
FROM
  `bigquery-public-data.bbc_news.fulltext`
WHERE
  AI.IF(('The following news story is about a natural disaster: ', body));
```

The result is similar to the following:

```text
+----------------------------------+---------------------------------------------+
| title                            | body                                        |
+----------------------------------+---------------------------------------------+
| Tsunami 'to hit Sri Lanka banks' | Sri Lanka's banks face hard times following |
|                                  | December's tsunami disaster...              |
| ...                              | ...                                         |
+----------------------------------+---------------------------------------------+
```

#### Filter text by topic with optimized mode

The following query uses `AI.IF` to find news about technology companies
using optimized mode (Preview):

```googlesql
SELECT
  title,
  body
FROM
  `bigquery-public-data.bbc_news.fulltext`
WHERE
  AI.IF(
    ('The following news story is about technology companies: ', body),
    embeddings => AI.EMBED(body, endpoint => 'text-embedding-005', task_type => 'CLASSIFICATION').result,
    optimization_mode => 'MINIMIZE_COST'
  );
```

For this example, embeddings are generated on-the-fly. In practice, we
recommend that you materialize embeddings so that they can be reused. For more
information, see [Optimize AI function costs](https://docs.cloud.google.com/bigquery/docs/optimize-ai-functions).

#### Use a subjective condition

The following query provides examples to the `AI.IF` function to show what
counts as an emotional review. Because "emotion" is a subjective quality, you
might provide different expected results in different contexts.

```googlesql
SELECT
  review,
  AI.IF(
    ("The review is emotional:", review),
    examples => [
      ("I really love this product", TRUE),
      ("The product performed extremely well", FALSE)]) AS is_emotional
FROM (
    SELECT "This product did everything it was supposed to" AS review
    UNION ALL
    SELECT "This product was absolutely incredible!!" AS review);
```

The result is similar to the following:

```text
+------------------------------------------------+--------------+
| review                                         | is_emotional |
+------------------------------------------------+--------------+
| This product was absolutely incredible!!       | true         |
| This product did everything it was supposed to | false        |
+------------------------------------------------+--------------+
```

#### Filter images

The following query creates an external table from images of pet products
stored in a publicly available Cloud Storage bucket. Then, it filters the
results to images that contain a ball.

```googlesql
-- Create a dataset
CREATE SCHEMA IF NOT EXISTS cymbal_pets;

-- Create an object table
CREATE OR REPLACE EXTERNAL TABLE cymbal_pets.product_images
WITH CONNECTION us.example_connection
OPTIONS (
  object_metadata = 'SIMPLE',
  uris = ['gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/images/*.png']
);

-- Filter images in the object table
SELECT
  OBJ.GET_READ_URL(ref).url AS signed_url,
FROM
  `cymbal_pets.product_images`
WHERE
  AI.IF(('The image contains a ball.', ref));
```

#### Join tables based on image content

The following queries create a table of product data and a table of product
images. The tables are joined based on whether the image is of the product.

```googlesql
-- Create a dataset
CREATE SCHEMA IF NOT EXISTS cymbal_pets;

-- Load a non-object table
LOAD DATA OVERWRITE cymbal_pets.products
FROM
  FILES(
    format = 'avro',
    uris = [
      'gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/tables/products/products_*.avro']);

-- Create an object table
CREATE OR REPLACE EXTERNAL TABLE cymbal_pets.product_images
  WITH CONNECTION us.example_connection
  OPTIONS (
    object_metadata = 'SIMPLE',
    uris = ['gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/images/*.png']);

-- Join the standard table and object table
SELECT product_name, brand, signed_url
FROM
  cymbal_pets.products INNER JOIN
  EXTERNAL_OBJECT_TRANSFORM(TABLE `cymbal_pets.product_images`, ['SIGNED_URL']) as images
ON
  AI.IF(
    (
      """You will be provided an image of a pet product.
      Determine if the image is of the following pet toy: """,
      products.product_name,
      images.ref
    ))
WHERE
  products.category = "Toys" AND
  products.brand = "Fluffy Buns";
```

#### Filter audio by speech topic

The following queries create a table of audio data stored in a publicly
available Cloud Storage bucket. The query filters the audio samples to those
that contain speech discussing a large language model.

```googlesql
-- Create a dataset
CREATE SCHEMA IF NOT EXISTS audio_repo;

-- Create an object table with audios
CREATE OR REPLACE EXTERNAL TABLE audio_repo.prompt_audio
WITH CONNECTION us.test_connection
OPTIONS (
  object_metadata = 'SIMPLE',
  uris = ['gs://cloud-samples-data/generative-ai/audio/*.mp3']
);

-- Filter audios in the object table
SELECT
  OBJ.GET_READ_URL(ref).url AS signed_url,
FROM
  `audio_repo.prompt_audio`
WHERE
  AI.IF(('Does the audio talk about large language models? ', ref));
```

#### Handle inference errors

The following query filters news stories but sets `max_error_ratio` to `0.05`,
meaning the query fails if more than 5% of rows return an error during
inference:

```googlesql
SELECT
  title, body
FROM
  `bigquery-public-data.bbc_news.fulltext`
WHERE
  AI.IF(('The following news story is about a natural disaster: ', body)
    max_error_ratio => 0.05);
```

If the query exceeds the 0.05 error ratio, it fails and returns an error message
similar to the following:
`Query failed because AI functions exceeded their allowed error ratio`

### Related functions

The [`AI.IF`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-if) and
[`AI.GENERATE_BOOL`](ai-generate-bool.md)
functions both use models to generate a
boolean value in response to a prompt. The following differences can help you
choose which function to use:

- **Optimized mode** : `AI.IF` supports [optimized mode](https://docs.cloud.google.com/bigquery/docs/optimize-ai-functions), which lets you process large-scale datasets with reduced cost and latency by training a distilled model. `AI.GENERATE_BOOL` doesn't support optimized mode.
- **Prompt Optimization** : `AI.IF` automatically [structures](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/structure-prompts) your prompts to improve the quality of the output.
- **Input** : `AI.GENERATE_BOOL` lets you specify model parameters to use.
- **Output** : `AI.IF` returns a `BOOL` value, which makes it easier to work with in queries. `AI.GENERATE_BOOL` returns a `STRUCT` value that contains a `BOOL` value, as well as additional information about the model call, which is useful if you need to view details such as the [safety rating](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/configure-safety-filters) or API response status.
- **Error handling** : If `AI.IF` produces an error for any input, then the function returns `NULL`. `AI.GENERATE_BOOL` records details about the errors in its output.

### Locations

You can run `AI.IF` in all of the
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
- To use this function in a tutorial, see [Perform semantic analysis with managed AI functions](https://docs.cloud.google.com/bigquery/docs/semantic-analysis).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-if (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

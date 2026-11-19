---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-score
---

# The AI.SCORE function

## Signature / Usage

This document describes the `AI.SCORE` function, which uses a
Gemini Enterprise Agent Platform Gemini
model to rate inputs based
on a scoring system that you describe and returns a `FLOAT64` value.
BigQuery rewrites your input prompt to generate a scoring rubric
that can improve the consistency and quality of the results.

The `AI.SCORE` function is commonly used with the `ORDER BY` clause and works
well when you want to rank items. The following are common use cases:

- **Retail**: Find the top 5 most negative customer reviews about a product.
- **Hiring**: Find the top 10 resumes that appear most qualified for a job post.
- **Customer success**: Find the top 20 best customer support interactions.

For example, you can use the `AI.SCORE` function to triage customer feedback:

```googlesql
SELECT
  feedback,
  AI.SCORE(('On a scale from 1 to 10, rate how urgent this feedback is: ', feedback)) AS score
FROM mydataset.customer_feedback
ORDER BY score DESC LIMIT 5;
```

### Input

`AI.SCORE` accepts the following types of input:

- Text data from standard tables.
- [`ObjectRef` values](https://docs.cloud.google.com/bigquery/docs/work-with-objectref). You can create an `ObjectRef` value by passing a Cloud Storage URI to the [`OBJ.MAKE_REF` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions#objmake_ref) or using an `ObjectRef` column from a table.

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
AI.SCORE(
  [ prompt => ] PROMPT
  [, connection_id => 'CONNECTION' ]
  [, endpoint => 'ENDPOINT' ]
  [, max_error_ratio => MAX_ERROR_RATIO ]
)
```

#### Arguments

`AI.SCORE` takes the following arguments.

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
    | `STRUCT<STRING, STRING, STRING>` | ` ('Rate this review ', review_column, ' from 1 to 10') ` | 'Rate this review review_column from 1 to 10' |
    | `STRUCT<STRING, ObjectRef>` | `('Rate the following city', image_objectref_column)` | 'Rate the following city <var translate="no">image</var>' |

<!-- -->

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

- `MAX_ERROR_RATIO`: a `FLOAT64` value between `0.0` and
  `1.0` that contains the maximum acceptable ratio of row-level inference
  failures to rows processed on this function. If this value is exceeded, then
  the query fails and
  BigQuery returns an error message that describes the most
  frequent types of errors. For example, if the value is `0.3` then the query
  fails if more than 30% of rows processed have failed to return results. If
  `max_error_ratio` is set for multiple functions, the query fails if the ratio
  is exceeded on any function. The default value is `1.0`. However, the query
  still fails if inference fails for every row.

### Output

`AI.SCORE` returns a `FLOAT64` indicating the score assigned to the input. There
is no fixed default range for the score. For best results, provide a scoring
range in your prompt.

If the call to Gemini Enterprise Agent Platform is unsuccessful for any reason,
such as exceeding quota or model unavailability, then the function returns
`NULL`.

### Examples

The following examples show how to use the `AI.SCORE` function to assign
ratings.

#### Rate reviews

The following query uses the `AI.SCORE` function to assign ratings based
on movie reviews of 'The English Patient', alongside the ratings that the
human reviewers gave. It returns the top 10 highest AI rated reviews.

```googlesql
SELECT
  AI.SCORE((
    """
    On a scale from 1 to 10, rate how much the reviewer liked the movie.
    Review:
    """, review)) AS ai_rating,
  reviewer_rating AS human_rating,
  review
FROM
  `bigquery-public-data.imdb.reviews`
WHERE
  title = 'The English Patient'
ORDER BY ai_rating DESC
LIMIT 10;
```

The result is similar to the following:

```text
+-----------+--------------+----------------------------------------------------+
| ai_rating | human_rating | review                                             |
+-----------+--------------+----------------------------------------------------+
| 10.0      | 10           | Even after all these years, this remain "a perfect |
|           |              | movie" for me. I still remember sitting for a ...  |
| ...       | ...          |                                                    |
+-----------+--------------+----------------------------------------------------+
```

#### Rate and filter reviews

The following query builds on the previous example by using the `AI.IF` function
to filter the results to reviews that mention at least one of the film's main
characters:

```googlesql
SELECT
  AI.SCORE((
    """
    On a scale from 1 to 10, rate how much the reviewer liked the movie.
    Review:
    """, review)) AS ai_rating,
  reviewer_rating AS human_rating,
  review
FROM
  `bigquery-public-data.imdb.reviews`
WHERE
  title = 'The English Patient' AND
  AI.IF(
    ("This review mentions at least one of the film's main cast members: ", review))
ORDER BY ai_rating DESC
LIMIT 10;
```

#### Rate images

The following query creates an external table from images of pet products
stored in a publicly available Cloud Storage bucket.
Then, it uses the `AI.SCORE` function to rate the images
on a scale of 1 to 10 based on how fun they look for a pet, and returns the
top 5 most fun looking items:

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

-- Find the top 5 most fun pet products
SELECT
  OBJ.GET_READ_URL(ref).url AS signed_url,
  AI.SCORE(
    ('Rate the product from 1-10 based on how fun it looks for a pet: ',
     ref)) AS fun_score
FROM
  `cymbal_pets.product_images`
ORDER BY
  fun_score DESC
LIMIT 5;
```

#### Handle inference errors

The following query rates reviews but sets `max_error_ratio` to `0.05`, meaning
the query fails if more than 5% of rows return an error during inference:

```googlesql
SELECT
  AI.SCORE((
    """
    On a scale from 1 to 10, rate how much the reviewer liked the movie.
    Review:
    """, review),
    max_error_ratio => 0.05) AS ai_rating,
  reviewer_rating AS human_rating,
  review
FROM
  `bigquery-public-data.imdb.reviews`
WHERE
  title = 'The English Patient'
ORDER BY ai_rating DESC
LIMIT 10;
```

If the query exceeds the 0.05 error ratio, it fails and returns an error message
similar to the following:
`Query failed because AI functions exceeded their allowed error ratio`

### Related functions

The `AI.SCORE` and
[`AI.GENERATE_DOUBLE`](ai-generate-double.md)
functions both use models to generate a
number in response to a prompt. The following differences can help you
choose which function to use:

- **Prompt optimization** : `AI.SCORE` automatically rewrites your prompt to generate a scoring rubric, which is especially helpful if you don't provide clear instructions for how to score input in your prompt.
- **Input** : `AI.GENERATE_DOUBLE` lets you specify specific model parameters to use.
- **Output** : `AI.SCORE` returns a `FLOAT64` value, which makes it easier to work with in queries. `AI.GENERATE_DOUBLE` returns a `STRUCT` that contains a `FLOAT64`, as well as additional information about the model call, which is useful if you need to view details such as the [safety rating](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/configure-safety-filters) or API response status.
- **Error handling** : If `AI.SCORE` produces an error for any input, then the function returns `NULL`. `AI.GENERATE_DOUBLE` records details about the errors in its output.

### Locations

You can run `AI.SCORE` in all of the
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

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-score (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

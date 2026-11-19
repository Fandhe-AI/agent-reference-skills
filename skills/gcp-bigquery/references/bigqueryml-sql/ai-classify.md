---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-classify
---

# The AI.CLASSIFY function

## Signature / Usage

This document describes the `AI.CLASSIFY` function, which uses a
Gemini Enterprise Agent Platform Gemini model to classify
inputs into categories that you provide. BigQuery automatically
[structures](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/structure-prompts)
your input to improve the quality of the classification.

The following are common use cases:

- **Retail**: Classify reviews by sentiment or classify products by categories.
- **Text analysis**: Classify support tickets or emails by topic.
- **Image analysis**: Classify an image by its style or contents.

For example, you can use the `AI.CLASSIFY` function to classify product reviews
into categories:

```googlesql
SELECT
  AI.CLASSIFY(review, ['Billing', 'Shipping', 'Product Quality', 'Customer Service']) AS category,
FROM  mydataset.product_reviews;
```

### Input

`AI.CLASSIFY` accepts the following types of input:

- Text data from standard tables.
- [`ObjectRef` values](https://docs.cloud.google.com/bigquery/docs/work-with-objectref). You can create an `ObjectRef` value by passing a Cloud Storage URI to the [`OBJ.MAKE_REF` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions#objmake_ref) or using an `ObjectRef` column from a table.

This function passes your input to a Gemini model and
incurs charges in Gemini Enterprise Agent Platform each time it's called.
For information about how to view these charges, see
[Track costs](https://docs.cloud.google.com/bigquery/docs/generative-ai-overview#track_costs).

### Syntax

```googlesql
AI.CLASSIFY(
  [ input => ] INPUT,
  [ categories => ] CATEGORIES
  [, examples => EXAMPLES ]
  [, connection_id => 'CONNECTION' ]
  [, endpoint => 'ENDPOINT' ]
  [, output_mode => 'OUTPUT_MODE' ]
  [, embeddings => EMBEDDINGS ]
  [, optimization_mode => 'OPTIMIZATION_MODE' ]
  [, max_error_ratio => MAX_ERROR_RATIO ]
)
```

#### Arguments

`AI.CLASSIFY` takes the following arguments.

- `INPUT`: a `STRING` or `STRUCT` value that specifies the input to classify. The input must be the first argument that you specify. You can provide the input value in the following ways:
  - Specify a `STRING` value. For example, `'apples'`
  - Specify a `STRUCT` value that contains one or more fields. You can use the following types of fields within the `STRUCT` value:

    | Field type | Description | Examples |
    |---|---|---|
    | `STRING` or `ARRAY<STRING>` | A string literal, array of string literals, or the name of a `STRING` column. | String literal: ` 'apples' ` String column name: `my_string_column` |
    | `ObjectRef` or `ARRAY<ObjectRef>` | An [`ObjectRef`](https://docs.cloud.google.com/bigquery/docs/work-with-objectref) literal, array of `ObjectRef` literals, or the name of an `ObjectRef` column. Your input can contain at most one video object. | `OBJ.MAKE_REF('gs://my_image.jpg')` |

    The function combines `STRUCT` fields similarly to a [`CONCAT`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#concat) operation and concatenates the fields in their specified order. The same is true for the elements of any arrays used within the struct. The following table shows some examples of `STRUCT` prompt values and how they are interpreted:

    | Struct field types | Struct value | Semantic equivalent |
    |---|---|---|
    | `STRUCT<STRING, STRING, STRING>` | ` ('crisp', color_column, 'apples') ` | 'crisp color_column apples' |
    | `STRUCT<STRING, ObjectRef>` | `('Classify the following city', image_objectref_column)` | 'Classify the following city <var translate="no">image</var>' |

<!-- -->

- `CATEGORIES`: the categories by which to classify
  the input. You can specify categories with or without descriptions:

  - With descriptions: Use an `ARRAY<STRUCT<STRING, STRING>>` value where each
    struct contains the category name, followed by a description of the
    category. The array can only contain string literals. For example,
    you could use colors to classify sentiment:

    `[('green', 'positive'), ('yellow', 'neutral'), ('red', 'negative')]`

    You can optionally name the fields of the struct for your own readability,
    but the field names aren't used by the function:

    ```text
      [STRUCT('green' AS label, 'positive' AS description),
       STRUCT('yellow' AS label, 'neutral' AS description),
       STRUCT('red' AS label, 'negative' AS description)]
    ```

  - Without descriptions: Use an `ARRAY<STRING>` value. The array can only
    contain string literals. This works well when your categories are
    self-explanatory. For example, you could use the following categories
    to classify sentiment:

    `['positive', 'neutral', 'negative']`

  To handle input that doesn't closely match a
  category, consider including an `'Other'` category.

  To use categories that come from a column of a table, you can
  [define a variable](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/procedural-language)
  based on that column and then use that variable as your categories argument.
- `EXAMPLES`: an
  `ARRAY<STRUCT<STRING, STRING>>` value that
  contains representative examples of input strings and the output category
  that you expect. You can provide examples to help the model understand your
  intended threshold for a condition with nuanced or subjective logic. We
  recommend that you provide at most 5 examples.

  If you specify `output_mode => 'multi'`, then your examples must have the type
  `ARRAY<STRUCT<STRING, ARRAY<STRING>>>`.
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

- `OUTPUT_MODE`: a `STRING` value that
  indicates whether a single input can be classified into multiple categories.
  Specifying an output mode changes the return type of the function to
  `ARRAY<STRING>`.
  The supported values are the following:

  - `single` (default): Each input is classified into exactly one category.
  - `multi`: Each value is classified into zero or more categories. In this case, the function returns an array that contains each relevant category, or an empty array if no category applies.
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
  the query fails and
  BigQuery returns an error message that describes the most
  frequent types of errors. For example, if the value is `0.3` then the query
  fails if more than 30% of rows processed have failed to return results. If
  `max_error_ratio` is set for multiple functions, the query fails if the ratio
  is exceeded on any function. The default value is `1.0`. However, the query
  still fails if inference fails for every row. This argument isn't supported
  when `optimization_mode` is set to `MINIMIZE_COST`.

### Output

If you don't specify an `OUTPUT_MODE`,
then `AI.CLASSIFY` returns a `STRING` value containing the category
that best fits the input.

If you specify an `OUTPUT_MODE`, then `AI.CLASSIFY` returns an
`ARRAY<STRING>` value that contains all categories that the input is classified
into. If `OUTPUT_MODE` is `single` then the array always has length 1. If
`OUTPUT_MODE` is `multi` then the array length is between 0 and the number
of categories.

If the call to Gemini Enterprise Agent Platform is unsuccessful for any reason, such
as exceeding quota or model unavailability, then the function returns `NULL` for
that row. However, if the ratio of unsuccessful rows exceeds the value of
`max_error_ratio`, then the entire query fails.

### Examples

The following examples show how to use the `AI.CLASSIFY` function to classify
text and images into predefined categories.

#### Classify text by topic

The following query categorizes BBC news articles into high-level categories:

```googlesql
SELECT
  title,
  body,
  AI.CLASSIFY(
    body,
    categories => ['tech', 'sport', 'business', 'politics', 'entertainment', 'other']) AS category
FROM
  `bigquery-public-data.bbc_news.fulltext`
LIMIT 100;
```

The result is similar to the following:

```text
+-------------------------------+------------------------------------+----------+
| title                         | body                               | category |
+-------------------------------+------------------------------------+----------+
| Anti-spam screensave scrapped | A contentious campaign to bump up  | tech     |
|                               | the bandwidth bills of spammers... |          |
| ...                           | ...                                | ...      |
+-------------------------------+------------------------------------+----------+
```

To extract your categories from a table instead of using an array of string
literals directly in your query, you can use variables. Suppose you have a table
called `mydataset.categories` with a string column
called `category` that contains each of the categories from the previous
example. You can rewrite the previous query using a variable in the following
way:

```googlesql
DECLARE article_types ARRAY<STRING>
  DEFAULT (SELECT ARRAY_AGG(category) FROM mydataset.categories);

SELECT
  title,
  body,
  AI.CLASSIFY(
    body,
    categories => article_types) AS category
FROM
  `bigquery-public-data.bbc_news.fulltext`
LIMIT 100;
```

#### Classify text into multiple topics

The following query categorizes each news article into one or more high-level
categories and provides two examples of categorization to the function:

```googlesql
WITH NewsArticles AS (
  SELECT
    'A major streaming platform announced a high-tech virtual reality broadcast for the upcoming championship game.' AS article_text
  UNION ALL
  SELECT
    'New legislation has been proposed to regulate the use of facial recognition technology in government buildings.' AS article_text
  UNION ALL
  SELECT
    'The superstar athlete announced a multi-million dollar movie deal and a new sports apparel venture.' AS article_text
)
SELECT
  article_text,
  AI.CLASSIFY(
    ('Main topics of this news article: ', article_text),
    categories => ['Politics', 'Finance', 'Technology', 'Sports', 'Entertainment'],
    output_mode => 'multi',
    examples => [
      ('The new stock market app is a hit with investors.', ['Finance', 'Technology']),
      ('The senator\'s speech on the economy was widely criticized.', ['Politics', 'Finance'])
    ]
  ) AS topics
FROM NewsArticles;
```

The result is similar to the following:

```text
+----------------------+-------------------------------------+
| article_text         | topics                              |
+----------------------+-------------------------------------+
| New legislation...   | [Politics, Technology]              |
| The superstar...     | [Sports, Entertainment, Finance]    |
| A major streaming... | [Technology, Sports, Entertainment] |
+----------------------+-------------------------------------+
```

#### Classify text with optimized mode

The following query categorizes BBC news articles using optimized mode:

```googlesql
SELECT
  title,
  body,
  AI.CLASSIFY(
    body,
    categories => ['tech', 'sport', 'business', 'other'],
    embeddings => AI.EMBED(body, endpoint => 'text-embedding-005', task_type => 'CLASSIFICATION').result,
    optimization_mode => 'MINIMIZE_COST'
   ) AS category
FROM
  `bigquery-public-data.bbc_news.fulltext`;
```

For this example, embeddings are generated on-the-fly. In practice, we
recommend that you materialize embeddings so that they can be reused. For more
information, see [Optimize AI function costs](https://docs.cloud.google.com/bigquery/docs/optimize-ai-functions).

#### Classify reviews by sentiment

The following query classifies movie reviews of The English Patient
by sentiment according to a custom
color scheme. For example, a review that is very positive is classified as
'green'.

```googlesql
SELECT
  AI.CLASSIFY(
    ('Classify the review by sentiment: ', review),
    categories =>
         [('green', 'The review is positive.'),
          ('yellow', 'The review is neutral.'),
          ('red', 'The review is negative.')]) AS ai_review_rating,
  reviewer_rating AS human_provided_rating,
  review,
FROM
  `bigquery-public-data.imdb.reviews`
WHERE
  title = 'The English Patient'
```

#### Classify images by type

The following query creates an external table from images of pet products
stored in a publicly available Cloud Storage bucket. Then, it classifies each
image as a box, ball, bottle, stand, or other type of item.

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

-- Classify images in the object table
SELECT
  OBJ.GET_READ_URL(ref).url AS signed_url,
  AI.CLASSIFY(
    images.ref,
    ['box', 'ball', 'bottle', 'stand', 'other']) AS category
FROM
  `cymbal_pets.product_images` AS images
LIMIT 10;
```

#### Calculate classification metrics

The following example uses the
[`ML.METRICS` function](metrics.md)
to calculate classification metrics for news categories
predicted by the `AI.CLASSIFY` function against actual labeled categories:

```googlesql
SELECT *
FROM ML.METRICS(
  (
    SELECT
      category,
      AI.CLASSIFY(
        body,
        categories => ['business', 'entertainment', 'politics', 'sport', 'tech']
      ) AS predicted_category
    FROM
      `bigquery-public-data.bbc_news.fulltext`
    LIMIT 100
  ),
  predicted_col => 'predicted_category',
  actual_col => 'category',
  task_type => 'classification');
```

The result is similar to the following:

```text
+-----------+--------+----------+----------+
| precision | recall | accuracy | f1_score |
+-----------+--------+----------+----------+
| 0.33      | 0.28   | 0.84     | 0.30     |
+-----------+--------+----------+----------+
```

#### Handle inference errors

The following query classifies news articles but sets `max_error_ratio` to
`0.05`, meaning the query fails if more than 5% of rows return an error
during inference:

```googlesql
SELECT
  title,
  body,
  AI.CLASSIFY(
    body,
    categories => ['tech', 'sport', 'business', 'politics', 'entertainment', 'other'],
    max_error_ratio => 0.05) AS category
FROM
  `bigquery-public-data.bbc_news.fulltext`
LIMIT 100;
```

If the query exceeds the 0.05 error ratio, it fails and returns an error message
similar to the following:
`Query failed because AI functions exceeded their allowed error ratio`

### Locations

You can run `AI.CLASSIFY` in all of the
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

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-classify (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

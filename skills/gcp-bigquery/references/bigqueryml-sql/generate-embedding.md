---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-generate-embedding
---

# The ML.GENERATE_EMBEDDING function

## Signature / Usage

This document describes the `ML.GENERATE_EMBEDDING` function, which
lets you create [embeddings](#embeddings) that describe an entity---for example,
a piece of text or an image.

> [!NOTE]
> **Note:** The [`AI.GENERATE_EMBEDDING` function](ai-generate-embedding.md) offers the same functionality with simplified column names in the output. For new queries, we recommend that you use `AI.GENERATE_EMBEDDING` instead.

You can create embeddings for the following types of data:

- Text data from standard tables.
- [`ObjectRef` values](https://docs.cloud.google.com/bigquery/docs/work-with-objectref). You can create an `ObjectRef` value by passing a Cloud Storage URI to the [`OBJ.MAKE_REF` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions#objmake_ref) or using an `ObjectRef` column from a table.
- Visual data in [object tables](https://docs.cloud.google.com/bigquery/docs/object-table-introduction).
- Combinations of unstructured data, including text, images, audio, video, and PDFs, represented by a `STRUCT` that contains `STRING`, `ARRAY<STRING>`, `ObjectRef`, and `ARRAY<ObjectRef>` values.
- Output data from [PCA](create-pca.md), [autoencoder](create-autoencoder.md), or [matrix factorization](create-matrix-factorization.md) models.

### Embeddings

Embeddings are high-dimensional numerical vectors that represent a given entity.
Machine learning (ML) models use embeddings to encode semantics about entities
to make it easier to reason about and compare them. If two entities are
semantically similar, then their respective embeddings are located near each
other in the embedding vector space.

Embeddings help you perform the following tasks:

- **Semantic search**: search entities ranked by semantic similarity.
- **Recommendation**: return entities with attributes similar to a given entity.
- **Classification**: return the class of entities whose attributes are similar to the given entity.
- **Clustering**: cluster entities whose attributes are similar to a given entity.
- **Outlier detection**: return entities whose attributes are least related to the given entity.
- **Matrix factorization**: return entities that represent the underlying weights that a model uses during prediction.
- **Principal component analysis (PCA)**: return entities (principal components) that represent the input data in such a way that it is easier to identify patterns, clusters, and outliers.
- **Autoencoding**: return the latent space representations of the input data.

### Function processing

Depending on the task, the `ML.GENERATE_EMBEDDING` function works in one of the
following ways:

- To generate embeddings from text or visual content,
  `ML.GENERATE_EMBEDDING` sends the request to a BigQuery ML
  [remote model](create-remote-model.md)
  that represents a
  [Gemini Enterprise Agent Platform embedding model](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models#embeddings-models)
  or a
  [supported open model](create-remote-model-open.md#supported-open-models),
  and then returns the model's response.

  The `ML.GENERATE_EMBEDDING` function works with the Agent Platform
  model to perform embedding tasks supported by that model. For more information
  on the types of tasks these models can perform, see the following documentation:
  - [Text embedding model use cases](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/embeddings#text-use-cases)
  - [Multimodal embedding model use cases](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/embeddings#multimodal-use-cases)

  Typically, you want to use text embedding models for text-only use cases, and
  use multimodal models for cross-modal search use cases, where embeddings for
  text and visual content are generated in the same semantic space.
- For PCA and autoencoding, `ML.GENERATE_EMBEDDING` processes the request using
  a BigQuery ML PCA or autoencoder model
  [`ML.PREDICT` function](predict.md).
  `ML.GENERATE_EMBEDDING` gathers the `ML.PREDICT` output for the model into
  an array and outputs it as the `ml_generate_embedding_result` column.
  Having all of the embeddings in a single column lets you directly use the
  [`VECTOR_SEARCH` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions#vector_search)
  on the`ML.GENERATE_EMBEDDING` output.

- For matrix factorization, `ML.GENERATE_EMBEDDING` processes the request using
  a BigQuery ML matrix factorization model and the
  [`ML.WEIGHTS` function](weights.md).
  `ML.GENERATE_EMBEDDING` gathers the `factor_weights.weight` and `intercept`
  values from the `ML.WEIGHTS` output for the model into
  an array and outputs it as the `ml_generate_embedding_result` column.
  Having all of the embeddings in a single column lets you directly use the
  [`VECTOR_SEARCH` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions#vector_search)
  on the`ML.GENERATE_EMBEDDING` output.

### Syntax

`ML.GENERATE_EMBEDDING` syntax differs depending on the
BigQuery ML model you choose. If you use a remote model, it also
differs depending on the Agent Platform model that your remote models
targets. Choose the option appropriate for your use case.

#### Text embedding

```googlesql
ML.GENERATE_EMBEDDING(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`,
  { TABLE `PROJECT_ID.DATASET.TABLE_NAME` | (QUERY_STATEMENT) },
  STRUCT(
    [FLATTEN_JSON_OUTPUT AS flatten_json_output]
    [, TASK_TYPE AS task_type]
    [, OUTPUT_DIMENSIONALITY AS output_dimensionality])
)
```

<br />

#### Arguments

`ML.GENERATE_EMBEDDING` takes the following arguments:

- `PROJECT_ID`: the project that contains the
  resource.

- `DATASET`: the BigQuery dataset that
  contains the resource.

- `MODEL_NAME`: the name of
  a remote model over an Agent Platform
  text embedding model.

  You can confirm what LLM is used by the remote model by opening the
  Google Cloud console and looking at the **Remote endpoint** field in
  the model details page.
- `TABLE_NAME`: the name of the
  BigQuery table that contains a `STRING` column to embed.
  The text in the column that's named `content` is sent to the model. If
  your table doesn't have a `content` column, use a `SELECT` statement for
  this argument to provide an alias for an existing table column. An error
  occurs if no `content` column exists.

  <br />

- `QUERY_STATEMENT`: a query whose result contains a
  `STRING` column that's named `content`. For information about the
  supported SQL syntax of the `QUERY_STATEMENT` clause, see
  [GoogleSQL query
  syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax).

  <br />

  <br />

- `FLATTEN_JSON_OUTPUT`: a `BOOL` value that
  determines whether the `JSON` content returned by the function is parsed
  into separate columns. The default is `TRUE`.

- `TASK_TYPE`: a `STRING` literal that specifies the
  intended downstream application to help the model produce better quality
  embeddings. The `TASK_TYPE` argument accepts the following values:

  - `RETRIEVAL_QUERY`: specifies that the given text is a query in a search or retrieval setting.
  - `RETRIEVAL_DOCUMENT`: specifies that the given text is a document in a
    search or retrieval setting.

    When using this task type, it is helpful to include the document title
    in the query statement in order to improve embedding quality.
    The document title must be in a column either named `title` or
    aliased as `title`, for example:

    ```googlesql
    SELECT *
    FROM
    ML.GENERATE_EMBEDDING(
      MODEL `mydataset.embedding_model`,
      (SELECT abstract as content, header as title, publication_number
      FROM `mydataset.publications`),
      STRUCT(TRUE AS flatten_json_output, 'RETRIEVAL_DOCUMENT' as task_type)
    );
    ```

    Specifying the title column in the input query populates the
    [`title` field](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings-api#request_body)
    of the request body sent to the model.
    If you specify a `title` value when using any other task type, that
    input is ignored and has no effect on the embedding results.
  - `SEMANTIC_SIMILARITY`: specifies that the given text will be used for
    Semantic Textual Similarity (STS).

  - `CLASSIFICATION`: specifies that the embeddings will be used for
    classification.

  - `CLUSTERING`: specifies that the embeddings will be used for
    clustering.

  - `QUESTION_ANSWERING`: specifies that the embeddings will be used for question answering.

  - `FACT_VERIFICATION`: specifies that the embeddings will be used for fact verification.

  - `CODE_RETRIEVAL_QUERY`: specifies that the embeddings will be used for code retrieval.

- `OUTPUT_DIMENSIONALITY`: an `INT64` value in the range
  `[1, 768]`
  that specifies the number of dimensions to use when generating
  embeddings. For example, if you specify `256 AS output_dimensionality`,
  then the `ml_generate_embedding_result` output column contains 256
  embeddings for each input value.
  The default value is `768`.

#### Details

- The model and input table must be in the same region.

#### Open models

```googlesql
ML.GENERATE_EMBEDDING(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`,
  { TABLE `PROJECT_ID.DATASET.TABLE_NAME` | (QUERY_STATEMENT) },
  STRUCT([FLATTEN_JSON_OUTPUT AS flatten_json_output])
)
```

<br />

#### Arguments

`ML.GENERATE_EMBEDDING` takes the following arguments:

- `PROJECT_ID`: the project that contains the
  resource.

- `DATASET`: the BigQuery dataset that
  contains the resource.

- `MODEL_NAME`: the name of
  a remote model over a supported open model.

  You can confirm the type of model by opening the Google Cloud console
  and looking at the **Model type** field in the model details page.
- `TABLE_NAME`: the name of the
  BigQuery table that contains a `STRING` column to embed.
  The text in the column that's named `content` is sent to the model. If
  your table doesn't have a `content` column, use a `SELECT` statement for
  this argument to provide an alias for an existing table column. An error
  occurs if no `content` column exists.

  <br />

- `QUERY_STATEMENT`: a query whose result contains a
  `STRING` column that's named `content`. For information about the
  supported SQL syntax of the `QUERY_STATEMENT` clause, see
  [GoogleSQL query
  syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax).

  <br />

  <br />

- `FLATTEN_JSON_OUTPUT`: a `BOOL` value that
  determines whether the `JSON` content returned by the function is parsed
  into separate columns. The default is `TRUE`.

  <br />

#### Details

- The model and input table must be in the same region.

#### Multimodal embedding

```googlesql
# Syntax for standard tables
ML.GENERATE_EMBEDDING(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`,
  { TABLE `PROJECT_ID.DATASET.TABLE_NAME` | (QUERY_STATEMENT) },
  STRUCT(
    [FLATTEN_JSON_OUTPUT AS flatten_json_output]
    [, OUTPUT_DIMENSIONALITY AS output_dimensionality])
)
```

```googlesql
# Syntax for object tables
ML.GENERATE_EMBEDDING(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`,
  { TABLE `PROJECT_ID.DATASET.TABLE_NAME` | (QUERY_STATEMENT) },
  STRUCT(
    [FLATTEN_JSON_OUTPUT AS flatten_json_output]
    [, START_SECOND AS start_second]
    [, END_SECOND AS end_second]
    [, INTERVAL_SECONDS AS interval_seconds]
    [, OUTPUT_DIMENSIONALITY AS output_dimensionality])
)
```

<br />

#### Arguments

`ML.GENERATE_EMBEDDING` takes the following arguments:

- `PROJECT_ID`: the project that contains the
  resource.

- `DATASET`: the BigQuery dataset that
  contains the resource.

- `MODEL_NAME`: the name of
  a remote model over an Gemini Enterprise Agent Platform model.
  Supported models include `multimodalembedding@001` and
  `gemini-embedding-2`.

  You can confirm what LLM is used by the remote model by opening the
  Google Cloud console and looking at the **Remote endpoint** field in
  the model details page.

  <br />

- `TABLE_NAME`: one of the following:

  - If you are creating embeddings for text in
    a standard table, the name of the BigQuery table
    that contains the content. The content must be in a `STRING`
    column named `content`. If your table does not have a
    `content` column, use the `QUERY_STATEMENT` argument instead and
    provide a `SELECT` statement that includes an alias for an existing
    table column. An error occurs if no `content` column is available.

  - If you are creating embeddings for visual content using data from an
    object table, the name of a BigQuery
    [object table](https://docs.cloud.google.com/bigquery/docs/object-table-introduction) that
    contains the visual content.

  - If you use the `gemini-embedding-2` model,
    you can also specify a `STRUCT` column that contains a
    combination of `STRING`, `ARRAY<STRING>`, `ObjectRef`,
    and `ARRAY<ObjectRef>` values.

  <br />

- `QUERY_STATEMENT`: the GoogleSQL query
  that generates the input data for the function.

  - If you are creating embeddings from a standard table, the query must
    produce a column named `content`, which you can generate as follows:

    - For text embeddings, you can pull the value from a `STRING`
      column, or you can specify a string literal in the query.

    - For visual content embeddings, you can provide an
      [`ObjectRefRuntime`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions#objectrefruntime)
      value for the `content` column. You can generate
      `ObjectRefRuntime` values by using the
      [`OBJ.GET_ACCESS_URL` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions#objget_access_url).
      The `OBJ.GET_ACCESS_URL` function takes an
      [`ObjectRef`](https://docs.cloud.google.com/bigquery/docs/analyze-multimodal-data#objectref_values)
      value as input, which you can provide by either specifying
      the name of a column that contains `ObjectRef` values, or by
      constructing an `ObjectRef` value.

      `ObjectRefRuntime` values must have the `access_url.read_url` and
      `details.gcs_metadata.content_type` elements of the JSON value
      populated.
  - If you are creating embeddings from an object table, the query doesn't
    have to return a `content` column. You can only specify `WHERE`,
    `ORDER BY`, and `LIMIT` clauses in the query.

  <br />

- `FLATTEN_JSON_OUTPUT`: a `BOOL` value that
  determines whether the `JSON` content returned by the function is parsed
  into separate columns. The default is `TRUE`.

- `START_SECOND`: a `FLOAT64` value that specifies the
  second in the video
  at which to start the embedding. The default value is `0`.
  If you specify this argument, you must
  also specify the `END_SECOND` argument. This value must be positive and
  less than the `END_SECOND` value. This argument only applies to video
  content.

- `END_SECOND`: a `FLOAT64` value that specifies the
  second in the video at which to end the embedding. The `END_SECOND` value
  can't be higher than `120`. The default value is `120`. If you specify
  this argument, you must also specify the `START_SECOND` argument. This
  value must be positive and greater than the `START_SECOND` value. This
  argument only applies to video content.

- `INTERVAL_SECONDS`: a `FLOAT64` value that specifies
  the interval to use when creating embeddings. For example, if you set
  `START_SECOND` = `0`, `END_SECOND` = `120`, and `INTERVAL_SECONDS` = `10`,
  then the video is split into twelve 10 second segments (`[0, 10), [10,
  20), [20, 30)...`) and embeddings are generated for each segment. This
  value must be greater than
  or equal to `4` and less than `120`. The default value is `16`.
  This argument only applies to video content.

- `OUTPUT_DIMENSIONALITY`: an `INT64` value that
  specifies the number of dimensions to use when generating embeddings.
  For more information, see how to
  [specify lower-dimensional embeddings](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings#low-dimension).

  You can only use this argument when creating text or image embeddings.
  If you use this argument when creating video embeddings, the function
  returns an error.

  <br />

  <br />

#### Details

The model and input table must be in the same region.

#### PCA

```googlesql
ML.GENERATE_EMBEDDING(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`,
  { TABLE `PROJECT_ID.DATASET.TABLE_NAME` | (QUERY_STATEMENT) }
)
```

<br />

#### Arguments

`ML.GENERATE_EMBEDDING` takes the following arguments:

- `PROJECT_ID`: the project that contains the
  resource.

- `DATASET`: the BigQuery dataset that
  contains the resource.

- `MODEL_NAME`: the name of
  a PCA model.

  You can confirm the type of model by opening the Google Cloud console
  and looking at the **Model type** field in the model details page.

  <br />

- `TABLE_NAME`: the name of the
  BigQuery table that contains the input data for the PCA
  model.

  <br />

<br />

- `QUERY_STATEMENT`: a query whose result contains the
  input data for the PCA model.

  <br />

  <br />

  <br />

  <br />

#### Details

- The model and input table must be in the same region.

#### Autoencoder

```googlesql
ML.GENERATE_EMBEDDING(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`,
  { TABLE `PROJECT_ID.DATASET.TABLE_NAME` | (QUERY_STATEMENT) },
  STRUCT([TRIAL_ID AS trial_id])
)
```

<br />

#### Arguments

`ML.GENERATE_EMBEDDING` takes the following arguments:

- `PROJECT_ID`: the project that contains the
  resource.

- `DATASET`: the BigQuery dataset that
  contains the resource.

- `MODEL_NAME`: the name of
  an autoencoder model.

  You can confirm the type of model by opening the Google Cloud console
  and looking at the **Model type** field in the model details page.

  <br />

- `TABLE_NAME`: the name of the
  BigQuery table that contains the input data for the
  autoencoder model.

  <br />

<br />

- `QUERY_STATEMENT`: a query whose result contains the
  input data for the autoencoder model.

- `TRIAL_ID`: an `INT64` value that identifies the
  hyperparameter tuning trial that you want the function to evaluate. The
  function uses the optimal trial by default. Only specify this argument if
  you ran hyperparameter tuning when creating the model.

  <br />

  <br />

  <br />

#### Details

- The model and input table must be in the same region.

#### Matrix factorization

```googlesql
ML.GENERATE_EMBEDDING(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`,
  STRUCT([TRIAL_ID AS trial_id])
)
```

<br />

#### Arguments

`ML.GENERATE_EMBEDDING` takes the following arguments:

- `PROJECT_ID`: the project that contains the
  resource.

- `DATASET`: the BigQuery dataset that
  contains the resource.

- `MODEL_NAME`: the name of
  a matrix factorization model.

  You can confirm the type of model by opening the Google Cloud console
  and looking at the **Model type** field in the model details page.

  <br />

  <br />

<br />

- `TRIAL_ID`: an `INT64` value that identifies the
  hyperparameter tuning trial that you want the function to evaluate. The
  function uses the optimal trial by default. Only specify this argument if
  you ran hyperparameter tuning when creating the model.

  <br />

  <br />

  <br />

### Output

#### Text embedding

`ML.GENERATE_EMBEDDING` returns the input table and the following columns:

- `ml_generate_embedding_result`:

  - If `flatten_json_output` is `FALSE`, this is the [JSON response](https://docs.cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.endpoints/predict#response-body) from the [`projects.locations.endpoints.predict`](https://docs.cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.endpoints/predict) call to the model. The generated embeddings are in the `values` element.
  - If `flatten_json_output` is `TRUE`, this is an `ARRAY<FLOAT64>` value that contains the generated embeddings.
- `ml_generate_embedding_statistics`: a `JSON` value that contains a
  `token_count` field with the number of tokens in the content, and a
  `truncated` field that indicates whether the content was truncated. This
  column is returned when `flatten_json_output` is `TRUE`.

- `ml_generate_embedding_status`: a `STRING` value that contains the API
  response status for the corresponding row. This value is empty if the
  operation was successful.

<br />

<br />

#### Open models

`ML.GENERATE_EMBEDDING` returns the input table and the following columns:

- `ml_generate_embedding_result`:

  - If `flatten_json_output` is `FALSE`, this is the [JSON response](https://docs.cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.endpoints/predict#response-body) from the [`projects.locations.endpoints.predict`](https://docs.cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.endpoints/predict) call to the model. The generated embeddings are in the first element of the `predictions` array.
  - If `flatten_json_output` is `TRUE`, this is an `ARRAY<FLOAT64>` value that contains the generated embeddings.
- `ml_generate_embedding_status`: a `STRING` value that contains the API
  response status for the corresponding row. This value is empty if the
  operation was successful.

<br />

#### Multimodal embedding

<br />

`ML.GENERATE_EMBEDDING` returns the input table and the following columns:

- `ml_generate_embedding_result`:

  - If `flatten_json_output` is `FALSE`, this is the [JSON response](https://docs.cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.endpoints/predict#response-body) from the [`projects.locations.endpoints.predict`](https://docs.cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.endpoints/predict) call to the model. The generated embeddings are in the `textEmbedding`, `imageEmbedding`, or `videoEmbeddings` element, depending on the type of input data you used.
  - If `flatten_json_output` is `TRUE`, this is an `ARRAY<FLOAT64>` value that contains the generated embeddings.
- `ml_generate_embedding_status`: a `STRING` value that contains the API
  response status for the corresponding row. This value is empty if the
  operation was successful.

- Additional output fields depend on which embedding model you use:

  - The `gemini-embedding-2` model also outputs the following
    field:

    - `ml_generate_embedding_statistics`: a `JSON` value that contains information about the token count for each modality of input that you provide.
  - The `multimodalembedding@001` model also outputs the following fields:

    - `ml_generate_embedding_start_sec`: for video content, an `INT64` value
      that contains the starting second of the portion of the video that the
      embedding represents. For image content, the value is `NULL`.
      This column isn't returned for text content.

    - `ml_generate_embedding_end_sec`: for video content, an `INT64` value
      that contains the ending second of the portion of the video that the
      embedding represents. For image content, the value is `NULL`.
      This column isn't returned for text content.

#### PCA

<br />

<br />

`ML.GENERATE_EMBEDDING` returns the input table and the following column:

- `ml_generate_embedding_result`: this is an `ARRAY<FLOAT>` value that contains the principal components for the input data. The number of array dimensions is equal to the PCA model's [`NUM_PRINCIPAL_COMPONENTS` option](create-pca.md#num_principal_components) value if that option is used when the model is created. If the [`PCA_EXPLAINED_VARIANCE_RATIO` option](create-pca.md#pca_explained_variance_ratio) is used instead, the array dimensions vary depending on the input table and the option ratio determined by BigQuery ML.

#### Autoencoder

<br />

<br />

`ML.GENERATE_EMBEDDING` returns the input table and the following column:

- `trial_id`: an `INT64` value that identifies the hyperparameter tuning trial used by the function. This column is only returned if you ran hyperparameter tuning when creating the model.
- `ml_generate_embedding_result`: this is an `ARRAY<FLOAT>` value that contains the latent space dimensions for the input data. The number of array dimensions is equal to the number in the middle of the autoencoder model's [`HIDDEN_UNITS` option](create-autoencoder.md#hidden_units) array value.

#### Matrix factorization

<br />

<br />

`ML.GENERATE_EMBEDDING` returns the following columns:

- `trial_id`: an `INT64` value that identifies the hyperparameter tuning trial used by the function. This column is only returned if you ran hyperparameter tuning when creating the model.
- `ml_generate_embedding_result`: this is an `ARRAY<FLOAT>` value that contains the weights of the feature, and also the intercept or bias term for the feature. The intercept value is the last value in the array. The number of array dimensions is equal to the matrix factorization model's [`NUM_FACTORS` option](create-matrix-factorization.md#num_factors) value.
- `processed_input`: a `STRING` value that contains the name of the user or item column. The value of this column matches the name of the user or item column provided in the [`query_statement` clause](create.md#query_statement) that was used when the matrix factorization model was trained.
- `feature`: a `STRING` value that contains the names of the specific users or items used during training.

### Supported multimodal content

You can use the
`ML.GENERATE_EMBEDDING`
function to generate embeddings for different modalities that meet the requirements described in
[API limits](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings#api-limits).

| Model name | Supported data types | Output dimensions | Description |
|---|---|---|---|
| `gemini-embedding-2` | Text, image, video, audio, PDF | Up to 3072 | Multimodal model supporting a wide range of inputs. |
| `multimodalembedding@001` | Text, image, video | Up to 1408 | Generates embeddings for text, images, and video. |

There is no limitation on the length of the video files you can use
with this function. However, the function only processes the first two minutes
of a video. If a video is longer than two minutes, the
`ML.GENERATE_EMBEDDING`
function only returns embeddings for the first two minutes.

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

### Examples

#### Text embedding

This example shows how to generate an embedding of a single piece of
sample text by using a remote model that references a
text embedding model.

Create the remote model:

```sql
CREATE OR REPLACE MODEL `mydataset.text_embedding`
REMOTE WITH CONNECTION DEFAULT
OPTIONS(ENDPOINT = 'text-embedding-005')
```

Generate the embedding:

```sql
SELECT *
FROM
  ML.GENERATE_EMBEDDING(
    MODEL `mydataset.text_embedding`,
    (SELECT "Example text to embed" AS content),
    STRUCT(TRUE AS flatten_json_output)
);
```

#### Multimodal embedding

This example shows how to generate embeddings from visual content by using a
remote model that references a multimodal embedding model.

Create the remote model:

```sql
CREATE OR REPLACE MODEL `mydataset.multimodalembedding`
REMOTE WITH CONNECTION DEFAULT
OPTIONS(ENDPOINT = 'gemini-embedding-2')
```

**Use an `ObjectRef` value**

Generate embeddings from visual content in an `ObjectRef` value:

```sql
SELECT *
FROM ML.GENERATE_EMBEDDING(
  MODEL `mydataset.multimodalembedding`,
    (
      SELECT
        OBJ.MAKE_REF("gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/images/aquaclear-aquarium-background-poster.png",
          "us.test_connection") AS content
    )
 );
```

**Use an object table**

Generate embeddings from visual content in an object table:

```sql
SELECT *
FROM ML.GENERATE_EMBEDDING(
  MODEL `mydataset.multimodalembedding`,
  TABLE `mydataset.my_object_table`);
```

#### PCA

This example shows how to generate embeddings that represent the principal
components of a PCA model.

Create the PCA model:

```sql
CREATE OR REPLACE MODEL `mydataset.pca_nyc_trees`
  OPTIONS (
    MODEL_TYPE = 'PCA',
    PCA_EXPLAINED_VARIANCE_RATIO = 0.9)
AS (
  SELECT
    tree_id,
    block_id,
    tree_dbh,
    stump_diam,
    curb_loc,
    status,
    health,
    spc_latin
  FROM
    `bigquery-public-data.new_york_trees.tree_census_2015`
);
```

Generate embeddings that represent principal components:

```sql
SELECT *
FROM
  ML.GENERATE_EMBEDDING(
    MODEL `mydataset.pca_nyc_trees`,
(
  SELECT
    tree_id,
    block_id,
    tree_dbh,
    stump_diam,
    curb_loc,
    status,
    health,
    spc_latin
  FROM
    `bigquery-public-data.new_york_trees.tree_census_2015`
));
```

#### Autoencoder

This example shows how to generate embeddings that represent the latent space
dimensions of an autoencoder model.

Create the autoencoder model:

```sql
CREATE OR REPLACE MODEL `mydataset.my_autoencoder_model`
  OPTIONS (
    model_type = 'autoencoder',
    activation_fn = 'relu',
    batch_size = 8,
    dropout = 0.2,
    hidden_units =
      [
        32,
        16,
        4,
        16,
        32],
    learn_rate = 0.001,
    l1_reg_activation = 0.0001,
    max_iterations = 10,
    optimizer = 'adam')
AS
SELECT * EXCEPT (
    Time,
    Class)
FROM
  `bigquery-public-data.ml_datasets.ulb_fraud_detection`;
```

Generate embeddings that represent latent space dimensions:

```sql
SELECT
  *
FROM
  ML.GENERATE_EMBEDDING(
    MODEL `mydataset.my_autoencoder_model`,
    TABLE `bigquery-public-data.ml_datasets.ulb_fraud_detection`);
```

#### Matrix factorization

This example shows how to generate embeddings that represent the underlying
weights that the matrix factorization model uses during prediction.

Create the matrix factorization model:

```sql
CREATE OR REPLACE MODEL
  `mydataset.my_mf_model`
OPTIONS (
  model_type='matrix_factorization',
  user_col='user_id',
  item_col='item_id',
  l2_reg=9.83,
  num_factors=34)
AS SELECT
  user_id,
  item_id,
  AVG(rating) as rating
FROM
  movielens.movielens_1m
GROUP BY user_id, item_id;
```

Generate embeddings that represent model weights and intercepts:

```sql
SELECT
  *
FROM
  ML.GENERATE_EMBEDDING(MODEL `mydataset.my_mf_model`)
```

### Locations

The `ML.GENERATE_EMBEDDING` function must run in the same
[region or multi-region](https://docs.cloud.google.com/bigquery/docs/locations) as the model that the
function references. For more information on supported regions for
embedding models, see
[Google model endpoint locations](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/locations#google_model_endpoint_locations).

The `gemini-embedding-2` model is only available in multi-regional or global
endpoints. If you specify the short endpoint name `gemini-embedding-2`,
then BigQuery selects an endpoint according to the following rules:

- If your query is run in the `us` region, or any single region in the US, then BigQuery uses the `us` endpoint.
- If your query is run in the `eu` region, or any single region in the EU other than `europe-west2` or `europe-west6`, then BigQuery uses the `eu` endpoint.
- For all other locations, including `europe-west2` and `europe-west6`, BigQuery uses the `global` endpoint.

To specify a specific endpoint, use a fully qualified multi-regional endpoint name in one of the following formats:

<!-- -->

- `https://aiplatform.us.rep.googleapis.com/v1/projects/PROJECT_ID/locations/us/publishers/google/models/gemini-embedding-2`
- `https://aiplatform.eu.rep.googleapis.com/v1/projects/PROJECT_ID/locations/eu/publishers/google/models/gemini-embedding-2`
- `https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-embedding-2`

<br />

### Quotas

Quotas apply when you use the `ML.GENERATE_EMBEDDING` function with remote
models. For more information, see
[generative AI functions quotas and limits](https://docs.cloud.google.com/bigquery/quotas#generative_ai_functions).

To request more quota for the Agent Platform models, use the process described in
[Manage your quota using the console](https://docs.cloud.google.com/docs/quotas/view-manage#managing_your_quota_console).

### What's next

- Try creating embeddings:
  - [Creating text embeddings](https://docs.cloud.google.com/bigquery/docs/generate-text-embedding)
  - [Creating image embeddings](https://docs.cloud.google.com/bigquery/docs/generate-visual-content-embedding)
  - [Creating video embeddings](https://docs.cloud.google.com/bigquery/docs/generate-video-embedding)
- For more information about using Agent Platform models to generate text and embeddings, see [Generative AI overview](https://docs.cloud.google.com/bigquery/docs/generative-ai-overview).
- Try the [Perform semantic search and retrieval-augmented generation](https://docs.cloud.google.com/bigquery/docs/vector-index-text-search-tutorial)
  tutorial to learn how to do the following tasks:

  - Generate text embeddings.
  - Create a vector index on the embeddings.
  - Perform a vector search with the embeddings to search for similar text.
  - Perform retrieval-augmented generation (RAG) by using vector search results to augment the prompt input and improve results.
- Try the [Parse PDFs in a retrieval-augmented generation pipeline](https://docs.cloud.google.com/bigquery/docs/rag-pipeline-pdf)
  tutorial to learn how to create a RAG pipeline based on parsed PDF content.

- For more information about using Cloud AI APIs to perform AI tasks, see
  [AI application overview](https://docs.cloud.google.com/bigquery/docs/ai-application-overview).

- For more information about supported SQL statements and functions for
  generative AI models, see
  [End-to-end user journeys for generative AI models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-genai).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-generate-embedding (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Conflicting official statements: for matrix factorization models, `ml_generate_embedding_result` is said to contain the feature weights and also the intercept as the last value, while its number of dimensions is said to equal `NUM_FACTORS`; with the intercept appended the length would be `NUM_FACTORS + 1`. The source does not say which one is right.

## Related

- [Index of this directory](./README.md)

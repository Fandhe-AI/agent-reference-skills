---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-embed
---

# The AI.EMBED function

## Signature / Usage

This document describes the `AI.EMBED` function, which lets you create
[embeddings](#embeddings) from text or image data in BigQuery.
For example, the following query creates an embedding for a piece of text:

The function works by sending a request to a
[stable Gemini Enterprise Agent Platform embedding model](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versions#latest-stable)
or a [built-in embedding model](#choose-a-model) in BigQuery,
and then returning that model's response.

```sql
SELECT AI.EMBED("Some text to embed!", endpoint => 'text-embedding-005');
```

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

### Input

Using the `AI.EMBED` function, you can use the following types
of input:

- Text data.
- [`ObjectRef` values](https://docs.cloud.google.com/bigquery/docs/work-with-objectref). You can create an `ObjectRef` value by passing a Cloud Storage URI to the [`OBJ.MAKE_REF` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions#objmake_ref) or using an `ObjectRef` column from a table.
- Combinations of unstructured data, including text, images, audio, video, and PDFs, represented by a `STRUCT` that contains `STRING`, `ARRAY<STRING>`, `ObjectRef`, and `ARRAY<ObjectRef>` values.

When you analyze image data, the content must be in one of the supported image
formats that are described in the Gemini API model
[`mimeType` parameter](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/gemini#parameters).

### Syntax

#### Text embedding

```googlesql
AI.EMBED(
  [ content => ] 'content',
  { endpoint => 'endpoint' | model => 'model' }
  [, task_type => 'task_type']
  [, title => 'title']
  [, model_params => model_params]
  [, connection_id => 'connection']
)
```

#### Arguments

`AI.EMBED` takes the following arguments:

- `content`: a `STRING` value that provides the text to embed.

  The `content` value can be a string literal, the name of a table
  column, or the output of an expression that evaluates to a string.
- `endpoint`: a `STRING` value that specifies a supported Gemini Enterprise Agent Platform [text
  embedding model](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/text-embeddings-api) endpoint to use. The function incurs charges in Agent Platform each time it's called.

  Different embedding models are generally mathematically incompatible. For information about
  model retirement dates and how to migrate to a replacement
  model, see [Handle
  embedding model deprecation](https://docs.cloud.google.com/bigquery/docs/vector-search-intro#handle-model-deprecation).

  The endpoint value that you specify must include the model version, for example,
  `gemini-embedding-001`. If you specify the model name rather than a
  URL, BigQuery automatically identifies the model and uses the
  model's full endpoint. For more information, see [Choose a
  model](#choose-a-model).

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

- `model` ([Preview](https://cloud.google.com/products#product-launch-stages)): a `STRING` value that specifies a built-in text embedding model. The only supported value is the [`embeddinggemma-300m` model](https://ai.google.dev/gemma/docs/embeddinggemma/model_card). For more information, see [Choose a model](#choose-a-model).

  If you specify
  this parameter, you can't specify the `endpoint`, `title`,
  `model_params`, or `connection_id` parameters.
  Your data stays in BigQuery and your slots are used to create the embeddings;
  no data is sent to Agent Platform and no charges are incurred in
  Agent Platform.

  To request feedback or support for this feature, send email to
  [bqml-feedback@google.com](mailto:bqml-feedback@google.com).
- `task_type`: a `STRING` literal that specifies the intended downstream application to help the model produce better quality embeddings. The `task_type` argument accepts the following values:
  - `RETRIEVAL_QUERY`: specifies that the given text is a query in a search or retrieval setting.
  - `RETRIEVAL_DOCUMENT`: specifies that the given text is a document in a search or retrieval setting.
  - `SEMANTIC_SIMILARITY`: specifies that the given text will be used for Semantic Textual Similarity (STS).
  - `CLASSIFICATION`: specifies that the embeddings will be used for classification.
  - `CLUSTERING`: specifies that the embeddings will be used for clustering.
  - `QUESTION_ANSWERING`: specifies that the embeddings will be used for question answering.
  - `FACT_VERIFICATION`: specifies that the embeddings will be used for fact verification.
  - `CODE_RETRIEVAL_QUERY`: specifies that the embeddings will be used for code retrieval.

  Not compatible with the `gemini-embedding-2` model endpoint.
- `title`: A `STRING` value that specifies the document title, which the model uses to improve embedding quality. You can only use this parameter if you specify `RETRIEVAL_DOCUMENT` for the `task_type` value. Not compatible with the `gemini-embedding-2` model endpoint.
- `model_params`: a `JSON` literal that provides additional parameters to the model. You can use any of the [`parameters`
  object](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings-api#parameter-list) fields. One of these fields, `outputDimensionality`, lets you specify the number of dimensions to use when generating embeddings. For example, if you specify `256` for the `outputDimensionality` field, then the model returns a 256-dimensional embedding for each input value.
- `connection_id`: a `STRING` value specifying the connection to use to communicate with the model, in the format `PROJECT_ID`.`LOCATION`.`CONNECTION_ID`. For example, `myproject.us.myconnection`.

  <br />

  For user-initiated queries, the `CONNECTION` argument is optional. When a
  user initiates a query, BigQuery ML uses the credentials of the user who submitted the
  query to run it.

  If your query job is expected to run for 48 hours or longer, you should use the
  `CONNECTION` argument to run the query using a service account.

  Replace the following:
  - <var translate="no">`PROJECT_ID`</var>: the project ID of the project that contains the connection.
  - <var translate="no">`LOCATION`</var>: the [location](https://docs.cloud.google.com/bigquery/docs/locations) used by the connection. The connection must be in the same region in which the query is run.
  - <var translate="no">`CONNECTION_ID`</var>: the connection ID---for example, `myconnection`.

    You can get this value by
    [viewing the
    connection details](https://docs.cloud.google.com/bigquery/docs/working-with-connections#view-connections) in the Google Cloud console and copying the value in the
    last section of the fully qualified connection ID that is shown in
    **Connection ID** . For example,
    `projects/myproject/locations/connection_location/connections/*myconnection*`.

  You need to grant the
  [Agent Platform User
  role](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/access-control#aiplatform.user) to the connection's service account in the project where you run the
  function.

#### Multimodal embedding

```googlesql
AI.EMBED(
  [ content => ] 'content',
  endpoint => 'endpoint'
  [, connection_id => 'connection']
  [, model_params => model_params]
)
```

#### Arguments

`AI.EMBED` takes the following arguments:

- `content`: a `STRING` or `ObjectRef` value that provides the data to embed.
  - For text embeddings, you can specify one of the following:
    - A string literal.
    - The name of a `STRING` column.
    - The output of an expression that evaluates to a string.
  - For image content embeddings, you can specify one of the following:
    - The name of an `ObjectRef` column.
    - An [`ObjectRef`](https://docs.cloud.google.com/bigquery/docs/work-with-objectref) value.
  - If you use the `gemini-embedding-2` model, you can also specify a `STRUCT` that contains a combination of `STRING`, `ARRAY<STRING>`, `ObjectRef`, and `ARRAY<ObjectRef>` values.

  `ObjectRef` values must have the
  `details.gcs_metadata.content_type` elements of the JSON value
  populated.
- `connection_id`: a `STRING` value specifying the connection to use to communicate with the model, in the format `PROJECT_ID`.`LOCATION`.`CONNECTION_ID`. For example, `myproject.us.myconnection`.

  <br />

  Replace the following:
  - <var translate="no">`PROJECT_ID`</var>: the project ID of the project that contains the connection.
  - <var translate="no">`LOCATION`</var>: the [location](https://docs.cloud.google.com/bigquery/docs/locations) used by the connection. The connection must be in the same region in which the query is run.
  - <var translate="no">`CONNECTION_ID`</var>: the connection ID---for example, `myconnection`.

    You can get this value by
    [viewing the
    connection details](https://docs.cloud.google.com/bigquery/docs/working-with-connections#view-connections) in the Google Cloud console and copying the value in the
    last section of the fully qualified connection ID that is shown in
    **Connection ID** . For example,
    `projects/myproject/locations/connection_location/connections/*myconnection*`.

  You need to grant the
  [Agent Platform User
  role](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/access-control#aiplatform.user) to the connection's service account in the project where you run the
  function.
- `endpoint`: a `STRING` value that specifies a supported Agent Platform [multimodal
  embedding model](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/multimodal-embeddings-api) endpoint to use for the multimodal embedding model.

  Different embedding models are generally mathematically incompatible. For information about
  model retirement dates and how to migrate to a replacement
  model, see [Handle
  embedding model deprecation](https://docs.cloud.google.com/bigquery/docs/vector-search-intro#handle-model-deprecation).
  The endpoint value that you specify must include the model version, for example `gemini-embedding-2`. If you specify the model name rather than a URL, BigQuery automatically identifies the model and uses the model's full endpoint.

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

- `model_params`: a `JSON` literal that provides additional parameters to the model. Only the `dimension` field is supported. You can use the `dimension` field to specify the number of dimensions to use when generating embeddings. For example, if you specify `256` for the `dimension` field, then the model returns a 256-dimensional embedding for each input value. For more information, see how to [specify lower-dimensional embeddings](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings#low-dimension).

### Output

`AI.EMBED` returns a `STRUCT` value for each row in the table. The struct
contains the following fields:

- `result`: an `ARRAY<FLOAT64>` value containing the generated embeddings.
- `status`: a `STRING` value that contains the API response status for the corresponding row. This value is empty if the operation was successful.

### Examples

#### text embedding

The following example shows how to embed a string literal using an
Agent Platform endpoint:

```sql
SELECT
  AI.EMBED(
    'A piece of text to embed',
    endpoint => 'text-embedding-005') AS embedding;
```

The result is similar to the following:

```text
+-----------------------+------------------+
| embedding.result      | embedding.status |
+-----------------------+------------------+
| 0.11416172981262207   |                  |
| 0.0041960999369621277 |                  |
| ...                   |                  |
+-----------------------+------------------+
```

The `embedding.result` column contains a single row with an array of
length 768. The `embedding.status` column contains an empty string, which
indicates that the embedding was successful.

Alternatively, you can perform the embedding by using a built-in embedding
model in BigQuery:

```sql
SELECT
  AI.EMBED(
    'A piece of text to embed',
    model => 'embeddinggemma-300m') AS embedding;
```

If you need to reuse embeddings of the same data across many queries, you
should save the results to table. The following example generates
768-dimensional embeddings for publicly
available BBC news articles and writes the results to a table:

```sql
CREATE OR REPLACE TABLE mydataset.bbc_news_embeddings AS
SELECT
  title,
  body,
  AI.EMBED(
    body,
    endpoint => 'text-embedding-005',
    model_params => JSON '{"outputDimensionality": 768}'
  ).result AS embedding
FROM
  `bigquery-public-data.bbc_news.fulltext`;
```

The following example queries the table that you just created for the
five articles that are most related to the topic "latest news in tech".
It calls the `VECTOR_SEARCH` function and uses `AI.EMBED` to create
an embedding to pass to the function as the search query.

```sql
SELECT base.title, base.body
FROM
  VECTOR_SEARCH(
    TABLE mydataset.bbc_news_embeddings,
    # The name of the column that contains the embedding
    'embedding',
    # The embedding to search
    (SELECT AI.EMBED('latest news in tech', endpoint => 'text-embedding-005').result),
    top_k => 5);
```

#### multimodal embedding

The following query creates an external table from images of pet products
stored in a publicly available Cloud Storage bucket. Then, it generates
embeddings for two of the images:

```googlesql
# Create a dataset
CREATE SCHEMA IF NOT EXISTS cymbal_pets;

# Create an object table
CREATE OR REPLACE EXTERNAL TABLE cymbal_pets.product_images
WITH CONNECTION DEFAULT
OPTIONS (
  object_metadata = 'SIMPLE',
  uris = ['gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/images/*.png']
);

SELECT
  ref.uri,
  OBJ.GET_READ_URL(ref).url AS signed_url,
  AI.EMBED(
    ref,
    endpoint => 'gemini-embedding-2') AS embedding
FROM
  `cymbal_pets.product_images`
LIMIT 2;
```

The following query uses the `gemini-embedding-2` model to embed
the combination of a text description and an image:

```googlesql
SELECT
  AI.EMBED(
    ('Made of tempered glass',
    OBJ.MAKE_REF('gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/images/aquaclear-20-gallon-aquarium.png')),
    endpoint => 'gemini-embedding-2');
```

### Choose a model

Use the following table to help you choose an embedding model for your data:

| Model specification | Output dimension | Max sequence length | Supported text languages | Description | Embedding location | Billing and permissions |
|---|---|---|---|---|---|---|
| `model => 'embeddinggemma-300m'` | 768 | 2048 tokens | [Supported text languages](https://ai.google.dev/gemma/docs/embeddinggemma) | Best for embedding short strings (\<= 128 tokens). Specialized for multilingual tasks. | BigQuery query engine | Uses and scales with BigQuery slots. No Gemini Enterprise Agent Platform charges or setup. |
| `endpoint => 'gemini-embedding-001'` | up to 3072 | 2048 tokens | [Supported text languages](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings-api#supported_text_languages) | Best performance for multilingual and coding tasks. | Agent Platform endpoint | Incurs Agent Platform charges. Might require Agent Platform permission setup depending on your project settings. |
| `endpoint => 'text-embedding-005'` | up to 768 | 2048 tokens | English | Best for embedding long English strings. Specialized in English and coding tasks. | Agent Platform endpoint | Incurs Agent Platform charges. Might require Agent Platform permission setup depending on your project settings. |
| `endpoint => 'text-multilingual-embedding-002'` | up to 768 | 2048 tokens | [Supported text languages](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings-api#supported_text_languages) | Best for embedding long strings. Specialized in multilingual tasks. | Agent Platform endpoint | Incurs Agent Platform charges. Might require Agent Platform permission setup depending on your project settings. |
| `endpoint => 'gemini-embedding-2'` | up to 3072 | 8192 tokens | [Supported text languages](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models#expandable-4) | Best for embedding long strings, including multilingual and unstructured data. Supports a mix of text, images, audio, video, and PDF files. | Agent Platform endpoint | Incurs Agent Platform charges. Might require Agent Platform permission setup depending on your project settings. |

### Billing and permissions

The project that is billed for Agent Platform usage and the
permissions required for the connection depend on how you specify the
`endpoint` value and the context in which the `AI.EMBED` function is called.

#### Billing model

The following table describes which project is billed for
Agent Platform usage based on the `endpoint` value and the context:

| Endpoint format | Context | Billed project |
|---|---|---|
| Full path URL. For example, `projects/PROJECT_ID/locations/us-central1/publishers/google/models/text-embedding-005` | Standard query or search query | The project ID specified in the full path URL. |
| Full path URL. For example, `projects/PROJECT_ID/locations/us-central1/publishers/google/models/text-embedding-005` | Autonomous embedding background job | The project ID specified in the full path URL. |
| Model name only. For example, `text-embedding-005` | Standard query or search query | The project ID in which the query is run. |
| Model name only. For example, `text-embedding-005` | Autonomous embedding background job | The project ID that contains the table. |

#### Connection permissions

The connection used by the `AI.EMBED` function must have the Agent Platform User
(`roles/aiplatform.user`) role in the project that is billed for
Agent Platform usage.

- If you specify a full path for the endpoint, the connection must have permissions in the project specified in that path.
- If you specify only a model name:
  - For standard queries or search queries, the connection must have permissions in the project in which the query is run.
  - For autonomous embedding background jobs, the connection must have permissions in the project that contains the table.

### Locations

You can run `AI.EMBED` in all of the
[locations](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/locations)
that support Agent Platform embedding models, and also in the `US`
and `EU` multi-regions.

### Quotas

See [generative AI functions quotas and limits](https://docs.cloud.google.com/bigquery/quotas#generative_ai_functions).

### What's next

- For more information about using Agent Platform models to generate text and embeddings, see [Generative AI overview](https://docs.cloud.google.com/bigquery/docs/generative-ai-overview).
- For more information about using Cloud AI APIs to perform AI tasks, see [AI application overview](https://docs.cloud.google.com/bigquery/docs/ai-application-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-embed (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

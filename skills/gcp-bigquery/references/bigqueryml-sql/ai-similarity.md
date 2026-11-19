---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-similarity
---

# The AI.SIMILARITY function

## Signature / Usage

This document describes the `AI.SIMILARITY` function, which lets you
find the [cosine similarity](https://wikipedia.org/wiki/Cosine_similarity)
between two inputs. Values closer to 1 indicate more similar inputs and values
closer to 0 indicate less similar inputs.

Use cases include the following:

- **Semantic search**: Search for text or images based off a description, without having to match specific keywords.
- **Recommendation**: Return entities with attributes similar to a given entity.
- **Classification**: Return the class of entities whose attributes are similar to the given entity.

The function works by creating embeddings for the inputs, and then
determining the cosine similarity between the embeddings.
The function works by sending a request to a
[stable Gemini Enterprise Agent Platform embedding model](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versions#latest-stable)
or a [built-in embedding model](#choose-a-model) in BigQuery,
and then returning that model's response.

```sql
# Returns 0.9166 because 'happy' and 'glad' are synonyms.
SELECT AI.SIMILARITY('happy', 'glad', endpoint => 'text-embedding-005');
```

### Input

You can use the `AI.SIMILARITY` function with data from BigQuery
[standard tables](https://docs.cloud.google.com/bigquery/docs/tables-intro#standard-tables). `AI.SIMILARITY`
accepts the following types of input:

- Text data.
- Image data represented by [`ObjectRef` values](https://docs.cloud.google.com/bigquery/docs/work-with-objectref). You can create an `ObjectRef` value by passing a Cloud Storage URI to the [`OBJ.MAKE_REF` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions#objmake_ref) or using an `ObjectRef` column from a table.
- Combinations of unstructured data, including text, images, audio, video, and PDFs, represented by a `STRUCT` that contains `STRING`, `ARRAY<STRING>`, `ObjectRef`, and `ARRAY<ObjectRef>` values.

When you analyze image data, the content must be in one of the supported image
formats that are described in the Gemini API model
[`mimeType` parameter](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/gemini#parameters).

### Syntax

#### Text embedding

```googlesql
AI.SIMILARITY(
  content1 => 'CONTENT1',
  content2 => 'CONTENT2',
  [, { endpoint => 'ENDPOINT' | model => 'MODEL' }]
  [, model_params => MODEL_PARAMS]
  [, connection_id => 'CONNECTION_ID']
)
```

#### Arguments

`AI.SIMILARITY` takes the following arguments:

- `CONTENT1`: a `STRING` value that provides the first value to compare. The value of `CONTENT1` can be a string literal, the name of a table column, or the output of an expression that evaluates to a string.
- `CONTENT2`: a `STRING` value that provides the second value to compare. The value of `CONTENT2` can be a string literal, the name of a table column, or the output of an expression that evaluates to a string.
- `ENDPOINT`: a `STRING` value that specifies the Gemini Enterprise Agent Platform endpoint to use for the text embedding model. If you specify the model name, such as `'gemini-embedding-001'`, rather than a URL, then BigQuery automatically identifies the model and uses the model's full endpoint. For more information, see [Choose a model](#choose-a-model).

  Different embedding models are generally mathematically incompatible. For information about
  model retirement dates and how to migrate to a replacement
  model, see [Handle
  embedding model deprecation](https://docs.cloud.google.com/bigquery/docs/vector-search-intro#handle-model-deprecation).

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

- `MODEL` ([Preview](https://cloud.google.com/products#product-launch-stages)): a `STRING` value that specifies a built-in text embedding model. The only supported value is the [`embeddinggemma-300m` model](https://ai.google.dev/gemma/docs/embeddinggemma/model_card). For more information, see [Choose a model](#choose-a-model).

  If you specify
  this parameter, you can't specify the `endpoint`,
  `model_params`, or `connection_id` parameters.
  Your data stays in BigQuery and your slots are used to create the embeddings;
  no data is sent to Agent Platform and no charges are incurred in
  Agent Platform.
- `MODEL_PARAMS`: a `JSON` literal that provides additional parameters to the model. You can use any of the [`parameters`
  object](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings-api#parameter-list) fields. One of these fields, `outputDimensionality`, lets you specify the number of dimensions to use when generating embeddings. For example, if you specify `256` for the `outputDimensionality` field, then the model returns a 256-dimensional embedding for each input value.
- `CONNECTION_ID`: a `STRING` value specifying the connection to use to communicate with the model, in the format `PROJECT_ID`.`LOCATION`.`CONNECTION_ID`. For example, `myproject.us.myconnection`.

  For user-initiated queries, the `CONNECTION` argument is optional. When a
  user initiates a query, BigQuery ML uses the credentials of the user who submitted the
  query to run it.

  If your query job is expected to run for 48 hours or longer, you should use the
  `CONNECTION` argument to run the query using a service account.

  Replace the following:
  - `PROJECT_ID`: the project ID of the project that contains the connection.
  - `LOCATION`: the [location](https://docs.cloud.google.com/bigquery/docs/locations) used by the connection. The connection must be in the same region in which the query is run.
  - `CONNECTION_ID`: the connection ID---for example, `myconnection`.

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
AI.SIMILARITY(
  content1 => 'CONTENT1',
  content2 => 'CONTENT2',
  connection_id => 'CONNECTION_ID',
  endpoint => 'ENDPOINT'
  [, model_params => MODEL_PARAMS]
)
```

#### Arguments

`AI.SIMILARITY` takes the following arguments:

- `CONTENT1`: a `STRING` or `ObjectRef` value that provides the first value to compare.
  - For text embeddings, you can specify one of the following:
    - A string literal.
    - The name of a `STRING` column.
    - The output of an expression that evaluates to a string.
  - For image content embeddings, you can specify one of the following:
    - The name of an `ObjectRef` column.
    - An `ObjectRef` value generated by a combination of the `OBJ.FETCH_METADATA` and `OBJ.MAKE_REF` functions. For example `SELECT OBJ.FETCH_METADATA(OBJ.MAKE_REF("gs://mybucket/path/to/file.jpg", "us.connection1"));`.
  - If you use the `gemini-embedding-2` model, you can also specify a `STRUCT` that contains a combination of `STRING`, `ARRAY<STRING>`, `ObjectRef`, and `ARRAY<ObjectRef>` values.

  `ObjectRef` values must have the
  `details.gcs_metadata.content_type` elements of the `JSON`
  value populated.
- `CONTENT2`: a `STRING` or `ObjectRef` value that provides the second value to compare.
  - For text embeddings, you can specify one of the following:
    - A string literal.
    - The name of a `STRING` column.
    - The output of an expression that evaluates to a string.
  - For image content embeddings, you can specify one of the following:
    - The name of an `ObjectRef` column.
    - An `ObjectRef` value generated by a combination of the `OBJ.FETCH_METADATA` and `OBJ.MAKE_REF` functions. For example `SELECT OBJ.FETCH_METADATA(OBJ.MAKE_REF("gs://mybucket/path/to/file.jpg", "us.connection1"));`.
- `CONNECTION_ID`: a `STRING` value specifying the connection to use to communicate with the model, in the format `PROJECT_ID`.`LOCATION`.`CONNECTION_ID`. For example, `myproject.us.myconnection`.

  Replace the following:
  - `PROJECT_ID`: the project ID of the project that contains the connection.
  - `LOCATION`: the [location](https://docs.cloud.google.com/bigquery/docs/locations) used by the connection. The connection must be in the same location as the dataset that contains the model.
  - `CONNECTION_ID`: the connection ID---for example, `myconnection`.

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
- `ENDPOINT`: a `STRING` value that specifies the Agent Platform endpoint to use for the multimodal embedding model. If you specify the model name rather than a URL, BigQuery automatically identifies the model and uses the model's full endpoint.

  Different embedding models are generally mathematically incompatible. For information about
  model retirement dates and how to migrate to a replacement
  model, see [Handle
  embedding model deprecation](https://docs.cloud.google.com/bigquery/docs/vector-search-intro#handle-model-deprecation).

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

- `MODEL_PARAMS`: a `JSON` literal that provides additional parameters to the model. Only the `dimension` field is supported. You can use the `dimension` field to specify the number of dimensions to use when generating embeddings. For example, if you specify `256` for the `dimension` field, then the model returns a 256-dimensional embedding for each input value. For more information, see how to [specify lower-dimensional embeddings](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings#low-dimension).

### Output

`AI.SIMILARITY` returns a `FLOAT64` value that represents the cosine similarity
between the two inputs. If an error occurs, the function returns `NULL`.

### Examples

The following examples demonstrate how to use the
`AI.SIMILARITY` function.

#### Compare text values

The following example uses the named `model` parameter to call the built-in
model `embeddinggemma-300m` and returns the similarity between two string
literals:

```googlesql
SELECT
  AI.SIMILARITY(
    'How to bake a cake',
    'Recipes for desserts',
    model => 'embeddinggemma-300m'
  ) AS score;
```

The result is similar to the following:

```text
+--------------------+
| score              |
+--------------------+
| 0.7175671203214448 |
+--------------------+
```

#### Find similar articles

The following example queries publicly available BBC news articles and shows
the top five articles most related to downward trends in the housing market:

```googlesql
SELECT
  title,
  body,
  AI.SIMILARITY(
    "housing market downward trends", body, endpoint => "text-embedding-005")
    AS similarity_score
FROM `bigquery-public-data.bbc_news.fulltext`
ORDER BY similarity_score DESC
LIMIT 5;
```

The result is similar to the following:

```text
+----------------------------------+--------------------------------+---------------------+
| title                            | body                           | similarity_score    |
+----------------------------------+--------------------------------+---------------------+
| House prices suffer festive fall | UK house prices fell 0.7% in   | 0.73263530260118381 |
|                                  | December, according to figures |                     |
|                                  | from the Office of the...      |                     |
| ...                              | ...                            | ...                 |
+----------------------------------+--------------------------------+---------------------+
```

#### Compare text and `ObjectRef` values

The following query creates an external table from images of pet products
stored in a publicly available Cloud Storage bucket. Then, it queries the
table for images for those that are similar to the text "aquarium device."
The results include images of
products for maintaining water and air quality in an aquarium.

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
  uri,
  OBJ.GET_READ_URL(ref).url AS signed_url,
  ai.similarity(
    "aquarium device",
    ref,
    endpoint => 'gemini-embedding-2',
    connection_id => 'us.example_connection') AS similarity_score
FROM cymbal_pets.product_images
ORDER BY similarity_score DESC
LIMIT 3;
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

### Related functions

The `AI.SIMILARITY` and
[`VECTOR_SEARCH`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions#vector_search)
functions support overlapping use cases. In general, you should use
`AI.SIMILARITY`
when you want to perform a small number of comparisons and you haven't
precomputed any embeddings. You should use `VECTOR_SEARCH` when performance
is critical and you're working with a large number of embeddings. The following
table summarizes the differences:

| Feature | `AI.SIMILARITY` | `VECTOR_SEARCH` |
|---|---|---|
| Function type | A scalar function that takes a single value as input and returns a single value as output. | A table-valued function (TVF) that takes a table as input and returns a table as output. |
| Primary purpose | Computes the semantic similarity score between two specific content inputs. | Finds the top-K closest embeddings from a base table or query to a given embedding. |
| Input | Typically two `STRING` or ObjectRef columns or values. | A query, a base table, and columns to search. Traditionally operates on pre-computed embedding columns of type `ARRAY<FLOAT64>`. |
| Output | A single `FLOAT64` value per row, representing the cosine similarity between the inputs. | A table containing the nearest neighbor rows from the base table, and the distance or similarity scores depending on options passed to the function. |
| Embedding | Always generates embeddings for both content inputs at runtime using Agent Platform embedding LLMs. | Uses pre-computed embeddings. |
| Indexing | Does not use vector indexes. Performs a direct comparison, including the cost of two embedding generations per call. | Designed to use a [vector index](https://docs.cloud.google.com/bigquery/docs/vector-index) for efficient approximate nearest neighbor (ANN) search over large datasets. Can also perform brute-force search without an index. |
| Common Use Case | Calculating similarity between pairs of items in a row, such as in a `SELECT` or `WHERE` clause. Useful to prototype queries while iterating on a design. | Useful for semantic search, recommendation systems, and retrieval augmented generation (RAG) to find the best matches from a large corpus. |

### Locations

You can run `AI.SIMILARITY` in all of the
[regions](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/locations#genai-locations)
that support Gemini models, and also in the `US` and `EU`
multi-regions.

### Quotas

See [generative AI functions quotas and limits](https://docs.cloud.google.com/bigquery/quotas#generative_ai_functions).

### What's next

- For more information about using Agent Platform models to generate text and embeddings, see [Generative AI overview](https://docs.cloud.google.com/bigquery/docs/generative-ai-overview).
- For more information about using Cloud AI APIs to perform AI tasks, see [AI application overview](https://docs.cloud.google.com/bigquery/docs/ai-application-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-similarity (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Conflicting official statements: the comparison table says `AI.SIMILARITY` always generates embeddings with Agent Platform embedding LLMs, but the `MODEL` argument and the model table describe the built-in `embeddinggemma-300m` model, whose embedding location is the BigQuery query engine (it uses BigQuery slots, with no Agent Platform charges or setup). The table describes the `endpoint` case; with `model => 'embeddinggemma-300m'` the embeddings are generated by the built-in model.

## Related

- [Index of this directory](./README.md)

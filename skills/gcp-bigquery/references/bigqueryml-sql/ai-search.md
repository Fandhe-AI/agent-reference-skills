---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-search
---

# The AI.SEARCH function

## Signature / Usage

This document describes the `AI.SEARCH` function, which is a table-valued
function for semantic search and hybrid search on tables that have
[autonomous embedding generation](https://docs.cloud.google.com/bigquery/docs/autonomous-embedding-generation)
enabled.

For example, you could use a query like the following to search a table of
product descriptions for anything described as a fun toy. In this example,
the `product_description` column has autonomous embedding generation enabled.

```googlesql
SELECT *
FROM AI.SEARCH(TABLE product_table, 'product_description', "A really fun toy");
```

You can also perform semantic search using an `ObjectRef` input if the base table
has autonomous embedding generation enabled for an `ObjectRef` column, as long as
that table's embedding generation model supports the `ObjectRef` data type:

```googlesql
SELECT *
FROM AI.SEARCH(
  TABLE mydataset.images,
  'ref',
  'A really fun toy'  -- Searching a table of images with a text query is
                      -- possible with a multimodal embedding model
);
```

Embeddings are high-dimensional numerical vectors that represent a given entity.
Embeddings encode semantics about entities
to make it easier to reason about and compare them. If two entities are
semantically similar, then their respective embeddings are located near each
other in the embedding vector space. The `AI.SEARCH` function embeds your
search query and searches the table that you provide for embeddings in the input
table that are close to it.

You can also perform a **hybrid search** that combines a semantic vector search
with a lexical (keyword) search. By default, the `mode` parameter is set to
`AUTO` which enables `AI.SEARCH` to automatically perform a hybrid search if
your table has a vector index configured with lexical search columns. If your
table has a vector index on the embedding column, then `AI.SEARCH` uses it to
optimize the search.

To improve the precision of your search results, you can enable semantic
[reranking](https://docs.cloud.google.com/generative-ai-app-builder/docs/ranking) by setting the `rerank`
argument to `TRUE`. When reranking is enabled, `AI.SEARCH` retrieves an initial
set of candidate rows using semantic or hybrid search, and then evaluates
`query_value` and each row's `column_to_search` text together to score and
reorder the candidates by how well the text answers the search query, similar
to the
[`AI.RANK` function](ai-rank.md).

You can use `AI.SEARCH` to help with the following tasks:

- **Semantic search**: search entities ranked by semantic similarity.
- **Hybrid search**: search entities combining semantic similarity and lexical keyword matching.
- **Recommendation**: return entities with attributes similar to a given entity.
- **Classification**: return the class of entities whose attributes are similar to the given entity.
- **Clustering**: cluster entities whose attributes are similar to a given entity.
- **Outlier detection**: return entities whose attributes are least related to the given entity.

### Syntax

```googlesql
AI.SEARCH(
  { TABLE base_table | base_table_query },
  column_to_search,
  query_value,
  mode => mode_value
  [, top_k => top_k_value ]
  [, distance_type => distance_type_value ]
  [, rerank => rerank_value ]
  [, options => options_value]
)
```

#### Arguments

`AI.SEARCH` takes the following arguments:

- `base_table`: The table to search for nearest neighbor embeddings. The table must have [autonomous embedding generation](https://docs.cloud.google.com/bigquery/docs/autonomous-embedding-generation) enabled.
- `base_table_query`: A query that you can use to pre-filter the base table. Only `SELECT`, `FROM`, and `WHERE` clauses are allowed in this query. Don't apply any filters to the embedding column. You can't use [logical views](https://docs.cloud.google.com/bigquery/docs/views-intro) in this query. Using a [subquery](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/subqueries) might interfere with index usage or cause your query to fail. If the base table is indexed and the `WHERE` clause contains columns that are not stored in the index, then `AI.SEARCH` uses post-filters on those columns instead. To learn more, see [Store columns and pre-filter](https://docs.cloud.google.com/bigquery/docs/vector-index#stored-columns).
- `column_to_search`: A `STRING` literal that contains the name of the column to search. This must be the name of the source column (of type `STRING` or `ObjectRef`) that the automatically generated embedding column is based on, but it's not the name of the generated embedding column itself. If the column has a vector index, BigQuery attempts to use it. To determine if an index was used in the vector search, see [Vector index usage](https://docs.cloud.google.com/bigquery/docs/vector-index#vector_index_usage).
- `query_value`: A string literal or `ObjectRef` value that represents the search query. This value is embedded at runtime using the same connection and endpoint specified for the base table's embedding generation. If the base table's embedding generation uses a `task_type` of `RETRIEVAL_DOCUMENT`, whether by default or explicitly specified, then `AI.SEARCH` uses a `task_type` of `RETRIEVAL_QUERY` to embed `query_value`. Otherwise, `AI.SEARCH` uses the same `task_type` configured for the base table. You must have the BigQuery Connection User role (`roles/bigquery.connectionUser`) on the connection that the base table uses for background embedding generation. If embedding generation fails for `query_value`, then the whole query fails. Rows with missing embeddings in the base table are skipped during the search.
- `mode` ([Preview](https://cloud.google.com/products#product-launch-stages)): One of the following values: `VECTOR`, `HYBRID`, or `AUTO`. The default value is `AUTO`. When the mode is set to `AUTO`, a hybrid search is performed if a hybrid index exists. If no hybrid index exists, a semantic-only search is performed. To run a [hybrid search](../googlesql-functions/search_functions.md#vector_search), set the mode to `HYBRID`. To run a semantic-only search, set the mode to `VECTOR`.
- `top_k`: A named argument with an `INT64` value. `top_k_value` specifies the number of nearest neighbors to return. The default is `10`. If the value is negative, all values are counted as neighbors and returned.
- `distance_type`: A named argument with a `STRING` value.
  `distance_type_value` specifies the type of metric to use to
  compute the distance between two vectors. Supported distance types are
  [`EUCLIDEAN`](https://en.wikipedia.org/wiki/Euclidean_distance),
  [`COSINE`](https://en.wikipedia.org/wiki/Cosine_similarity#Cosine_Distance),
  and
  [`DOT_PRODUCT`](https://en.wikipedia.org/wiki/Dot_product).
  The default is `EUCLIDEAN`.

  If you don't specify `distance_type_value` and the `column_to_search`
  column has a vector index that's used, then `AI.SEARCH` uses the distance
  type specified in the
  [`distance_type` option](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#vector_index_option_list)
  of the `CREATE VECTOR INDEX` statement.
- `rerank`: A `BOOL` value that specifies whether to rerank the retrieved
  candidates using the [ranking API](https://docs.cloud.google.com/generative-ai-app-builder/docs/ranking):

  - `TRUE`: Enables semantic reranking. `AI.SEARCH` retrieves an initial set of candidates from the vector search or hybrid search stage and then evaluates `query_value` and each candidate row's `column_to_search` text together to score and reorder the candidates by relevance.
  - `FALSE` (default): Disables semantic reranking.

  When you set `rerank` to `TRUE`, the following requirements apply:
  - `column_to_search` must be of type `STRING`. Candidate rows with `NULL` or empty string values in `column_to_search` are excluded prior to reranking.
  - `query_value` must be a non-empty `STRING` literal or query parameter. `ObjectRef` values aren't supported.
  - Reranking uses your [end-user credentials](https://docs.cloud.google.com/bigquery/docs/permissions-for-ai-functions#run_generative_ai_queries_with_end-user_credentials) to call the Agent Search ranking API in the project that runs the query. You must enable the Discovery Engine API (`discoveryengine.googleapis.com`) in that project, and your account must have the `discoveryengine.rankingConfigs.rank` permission on the project. This permission is included in the Discovery Engine Viewer role (`roles/discoveryengine.viewer`). For more information, read about [access control for Agent Search](https://docs.cloud.google.com/generative-ai-app-builder/docs/access-control).
- `options`: A named argument with a JSON-formatted `STRING` value.
  `options_value` is a literal that specifies the following search
  options:

  - `fraction_lists_to_search`: A JSON number that specifies the
    percentage of lists to search. For example,
    `options => '{"fraction_lists_to_search":0.15}'`. The
    `fraction_lists_to_search` value must be in the range `0.0` to `1.0`,
    exclusive.

    Specifying a higher percentage leads to higher recall and slower
    performance, and the converse is true when specifying a lower percentage.

    `fraction_lists_to_search` is only used when a vector index is also used.
    If you don't specify a `fraction_lists_to_search` value but an index is
    matched, an appropriate value is picked.

    The number of available lists to search is determined by the
    [`num_lists` option](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#vector_index_option_list)
    in the `ivf_options` option or derived from
    the [`leaf_node_embedding_count` option](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#vector_index_option_list)
    in the
    `tree_ah_options` option of the `CREATE VECTOR INDEX` statement if
    specified. Otherwise, BigQuery calculates an appropriate number.

    You can't specify `fraction_lists_to_search` when `use_brute_force` is
    set to `true`.
  - `use_brute_force`: A JSON boolean that determines whether to use brute
    force search by skipping the vector index if one is available. For
    example, `options => '{"use_brute_force":true}'`. The
    default is `false`. If you specify `use_brute_force=false` and there is
    no usable vector index available, brute force is used anyway.

  - `reranker`: A JSON object that configures semantic reranking. You can
    only specify `reranker` when `rerank` is set to `TRUE`. For example,
    `options => '{"reranker": {"num_candidates": 50}}'`. The `reranker`
    object supports the following fields:

    - `num_candidates`: A JSON integer that specifies the number of candidates retrieved from vector or hybrid search to pass to the reranker for reordering. For example, `options => '{"reranker": {"num_candidates": 30}}'`. The default is `top_k * 5`. When `top_k` is positive, `num_candidates` must be at least `top_k`, or negative to rerank all rows in the base table. When `top_k` is negative, `num_candidates` must be negative or omitted. The number of candidate rows passed to the reranker can't exceed 10,000,000.
    - `model`: A JSON string that specifies the [ranking model](https://docs.cloud.google.com/generative-ai-app-builder/docs/ranking#models) to use. If you don't specify this option, `semantic-ranker-default@latest` is used, which always points to the latest available ranking model. We recommend that you omit this option so that your queries pick up model improvements automatically.

  `options` defaults to `'{}'` to denote that all underlying options use their
  corresponding default values.

### Details

You can optionally use `AI.SEARCH` with a
[vector index](https://docs.cloud.google.com/bigquery/docs/vector-index). When
a vector index is used, `AI.SEARCH` uses the [Approximate Nearest
Neighbor](https://en.wikipedia.org/wiki/Nearest_neighbor_search#Approximation_methods)
search technique to help improve vector search performance, with
the trade-off of reducing
[recall](https://developers.google.com/machine-learning/crash-course/classification/precision-and-recall#recallsearch_term_rules)
and so returning more approximate
results. When a base table is large, the use of an index typically improves
performance without significantly sacrificing recall. Brute force is used to
return exact results when a vector index isn't available, and you can
choose to use brute force to get exact results even when a vector index
is available.

### Output

The output includes the following columns:

- `base`: A `STRUCT` value that contains all columns from `base_table` or a subset of the columns from `base_table` that you selected in the `base_table_query` query.
- `distance`: A `FLOAT64` value that represents the distance between the `query_value` and the embedding in `column_to_search`.
- `rerank_score`: A `FLOAT64` value that contains the relevance of the text in
  `column_to_search` to `query_value`, in the range of `0.0` to `1.0`. Higher
  values indicate greater relevance. This column is only included in the
  output when `rerank` is set to `TRUE`, and the output rows are sorted by
  `rerank_score` in descending order.

  The `rerank_score` value is intended for comparing rows within a single
  result set. Because scores aren't calibrated across queries, a static
  threshold (such as `rerank_score > 0.5`) might work well for one query while
  excluding relevant results for another. To constrain result sets, use the
  `top_k` argument.

Rows that are missing a generated embedding are skipped during the search. When
`rerank` is set to `TRUE`, candidate rows with `NULL` or empty string values in
`column_to_search` are excluded prior to reranking without raising an error.

### Examples

The following example shows how to create a table of products and descriptions
with autonomous embedding enabled on the description column,
add some data to the table, and then search it for products that would be
fun to play with.

```googlesql
# Create a table of products and descriptions with a generated embedding column.
CREATE TABLE mydataset.products (
  name STRING,
  description STRING,
  description_embedding STRUCT<result ARRAY<FLOAT64>, status STRING>
    GENERATED ALWAYS AS (AI.EMBED(
      description,
      connection_id => 'us.example_connection',
      endpoint => 'text-embedding-005'
    ))
    STORED OPTIONS( asynchronous = TRUE )
);

# Insert product descriptions into the table.
# The description_embedding column is automatically updated.
INSERT INTO mydataset.products (name, description) VALUES
  ("Lounger chair", "A comfortable chair for relaxing in."),
  ("Super slingers", "An exciting board game for the whole family."),
  ("Encyclopedia set", "A collection of informational books.");

# Search for products that are fun to play with.
SELECT base.name, base.description, distance
FROM AI.SEARCH(TABLE mydataset.products, 'description', "A really fun toy");

/*------------------+----------------------------------------------+----------------------+
 | name             | description                                  | distance             |
 +------------------+----------------------------------------------+----------------------+
 | Super slingers   | An exciting board game for the whole family. | 0.9147342919053343   |
 | Lounger chair    | A comfortable chair for relaxing in.         | 0.9782074503966303   |
 | Encyclopedia set | A collection of informational books.         | 1.0836052217341476   |
 +------------------+----------------------------------------------+----------------------*/
```

The following example uses a hybrid search to find products that are fun to
play with.

```googlesql
SELECT base.name, base.description, distance
FROM
  AI.SEARCH(
    TABLE mydataset.products,
    'description',
    "A really fun toy",
    mode => 'HYBRID');

/*------------------+----------------------------------------------+--------------------+
 | name             | description                                  | distance           |
 +------------------+----------------------------------------------+--------------------+
 | Super slingers   | An exciting board game for the whole family. | 0.9677335415040333 |
 | Lounger chair    | A comfortable chair for relaxing in.         | 0.9677335415040333 |
 | Encyclopedia set | A collection of informational books.         | 0.967741935483871  |
 +------------------+----------------------------------------------+--------------------*/
```

The following example searches for products that are fun to play with and
enables semantic reranking on the results.

```googlesql
SELECT base.name, base.description, distance, rerank_score
FROM
  AI.SEARCH(
    TABLE mydataset.products,
    'description',
    "A really fun toy",
    rerank => TRUE);

/*------------------+----------------------------------------------+--------------------+---------------------+
 | name             | description                                  | distance           | rerank_score        |
 +------------------+----------------------------------------------+--------------------+---------------------+
 | Super slingers   | An exciting board game for the whole family. | 0.9147342919053343 | 0.2777999937534332  |
 | Encyclopedia set | A collection of informational books.         | 1.0836052217341476 | 0.03830000013113022 |
 | Lounger chair    | A comfortable chair for relaxing in.         | 0.9782074503966303 | 0.03720000013709068 |
 +------------------+----------------------------------------------+--------------------+---------------------*/
```

### Related functions

The `AI.SEARCH` and
[`VECTOR_SEARCH`](../googlesql-functions/search_functions.md#vector_search)
functions support overlapping use cases. In general, you should use `AI.SEARCH`
when your base table has autonomous embedding generation enabled and you want
to search for results close to a single string literal. It offers a simplified
syntax compared to `VECTOR_SEARCH` and doesn't require you to embed your
search query. You should use
`VECTOR_SEARCH` when you want to batch your search queries, when you want
to generate your
own embeddings as input, or if your base table doesn't use autonomous embedding
generation.

You can set `rerank => TRUE` in `AI.SEARCH` to semantically rerank candidate
rows as part of the search call, or use the
[`AI.RANK`](ai-rank.md)
function directly when you want to rerank the results of `VECTOR_SEARCH`, rank
an arbitrary table or query statement, or rank a column other than
`column_to_search`.

### Locations

You can run `AI.SEARCH` in all of the
[locations](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/locations)
that support Gemini Enterprise Agent Platform embedding models, and also in the `US`
and `EU` multi-regions.

### Pricing

The `AI.SEARCH` function uses
[BigQuery compute pricing](https://cloud.google.com/bigquery/pricing#analysis_pricing_models)
for vector and hybrid search. When `rerank` is set to `TRUE`, `AI.SEARCH` also
uses your credentials to call the Agent Search ranking API in the project that
runs the query. This usage is billed using
[ranking API pricing](https://cloud.google.com/generative-ai-app-builder/pricing#ranking-api-pricing).

### Quotas and limits

See [Generative AI functions quotas and limits](https://docs.cloud.google.com/bigquery/quotas#generative_ai_functions).

When `rerank` is set to `TRUE`:

- Ranking requests count toward the Agent Search ranking API quota of the project that runs the query. For more information, see [Agent Search quotas and limits](https://docs.cloud.google.com/generative-ai-app-builder/quotas).
- If a row's text in `column_to_search` is longer than the ranking model's token limit, the extra text is truncated. For each model's limit, see [Supported models](https://docs.cloud.google.com/generative-ai-app-builder/docs/ranking#models).

### What's next

- Learn more about [autonomous embedding generation](https://docs.cloud.google.com/bigquery/docs/autonomous-embedding-generation).
- Learn more about [creating and managing vector indexes](https://docs.cloud.google.com/bigquery/docs/vector-index).
- Learn more about [embeddings and search](https://docs.cloud.google.com/bigquery/docs/vector-search-intro).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-search (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

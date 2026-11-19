---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-rank
---

# The AI.RANK function

## Signature / Usage

The `AI.RANK` function reorders the rows of a table by how well the text in a
specified column answers a search query. It evaluates the query and each row's
text together, so that, for example, it can recognize that an article titled
"Update your login information" answers "how do I reset my password" even though
they share no words.

The `AI.RANK` function offers the following features:

- **Semantic ranking**: evaluates the search query and each row's text together, rather than comparing them independently as keyword search and vector search do.
- **Ranked output**: returns each row with a relevance score and rank position, sorted from most to least relevant.
- **Column passthrough**: returns all columns of the input data alongside the ranking columns, so no join is required to retrieve the original rows.

[Keyword search](https://docs.cloud.google.com/bigquery/docs/search-intro),
[vector search](https://docs.cloud.google.com/bigquery/docs/vector-search-intro), and
[hybrid search](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions#hybrid-search)
score the query and each row of a table separately. They can use an index,
so they scale to large tables. The `AI.RANK` function evaluates
the query and each row's text together. This approach gives a more precise
score of how well each row answers the query, but `AI.RANK` doesn't use an
index, and its cost grows with every row it ranks.

Consider using these functions together: retrieve candidates with
`VECTOR_SEARCH` or `AI.SEARCH`, and then re-rank the top results
with `AI.RANK`. For an
example, see [Rerank the results of a related-article
search](#rerank-the-results-of-a-related-article-search).

### Before you begin

Enable the Discovery Engine API, if it is not already enabled.

**Roles required to enable APIs**

To enable APIs, you need the `serviceusage.services.enable` permission. If you
created the project, then you likely already have this permission through the
Owner role (`roles/owner`). Otherwise, you can get this permission through the
Service Usage Admin role (`roles/serviceusage.serviceUsageAdmin`).
[Learn how to grant roles](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

[Enable the API](https://console.cloud.google.com/apis/enableflow?apiid=discoveryengine.googleapis.com&redirect=https://console.cloud.google.com)

#### Required roles

To get the permission that
you need to call the `AI.RANK` function,

ask your administrator to grant you the
[Discovery Engine Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/discoveryengine#discoveryengine.viewer) (`roles/discoveryengine.viewer`) IAM role on the project.

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

This predefined role contains the
`discoveryengine.rankingConfigs.rank`
permission,
which is required to
call the `AI.RANK` function.

You might also be able to get
this permission
with [custom roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or
other [predefined roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

For more information, read about
[access control for Agent Search](https://docs.cloud.google.com/generative-ai-app-builder/docs/access-control).

### Syntax

```googlesql
AI.RANK(
  { TABLE table_name | (query_statement) },
  column_to_rank,
  query
  [, model => 'model' ]
  [, top_n => top_n ]
)
```

#### Arguments

`AI.RANK` takes the following arguments:

- `table_name`: the name of a BigQuery table that contains the data to rank. Supply either `table_name` or `query_statement`.
- `query_statement`: a SQL query whose results contain the data to rank. Supply either `table_name` or `query_statement`.
- `column_to_rank`: a `STRING` value that specifies the name of the column that holds the text to rank. The column must be of type `STRING`. The input data can't contain a column named `rank` or `score`, in any combination of letter cases, because those names are used by the output.
- `query`: a `STRING` value that specifies the search query to rank the text against. The value can't be empty.
- `model`: a `STRING` value that specifies the [ranking model](https://docs.cloud.google.com/generative-ai-app-builder/docs/ranking#models) to use. If you don't specify this argument, `semantic-ranker-default@latest` is used, which always points to the latest available ranking model. We recommend that you omit this argument so that your queries pick up model improvements automatically.
- `top_n`: an `INT64` value that specifies the maximum number of rows to return. The value must be positive. If you don't specify this argument, all ranked rows are returned.

### Output

The `AI.RANK` function returns a table in which each row contains the input data
and its
relevance to the search query. The results are sorted by `rank` in ascending
order. The output table contains the following columns:

- `rank`: an `INT64` value that contains the position of the row within the ranked results, starting at 1.
- `score`: a `FLOAT64` value that contains the relevance of the row's text to the search query, in the range of 0.0 to 1.0. Higher values indicate greater relevance.
- Input columns: the columns of the input data.

The `score` value is intended solely for comparing rows within a single result
set. Because scores are not calibrated across queries, a static threshold (such
as `score > 0.5`) might work well for one query, whereas it might exclude
relevant results
for another. Additionally, a score of 0.0 is ambiguous, as it indicates either
an irrelevant text or an unranked entry. To constrain result sets, use the
`top_n` parameter or filter by the `rank` column.

The output set might contain fewer rows than the input table, and neither
of the following conditions raises an error:

- Rows with `NULL` or empty string values in `column_to_rank` are excluded prior to ranking.
- Rows falling beyond the specified `top_n` threshold are omitted from the output.

### Examples

The following examples use the publicly available
`bigquery-public-data.bbc_news.fulltext` table, which contains BBC news articles
with `title`, `body`, and `category` columns, and a `body_embedded` column
holding a precomputed embedding of each article's body text.

#### Rank rows by relevance to a search query

The following query returns the five articles whose `title` column best answers
a search query about the housing market:

```googlesql
SELECT rank, score, title
FROM AI.RANK(
  TABLE `bigquery-public-data.bbc_news.fulltext`,
  'title',
  'downward trends in the housing market',
  top_n => 5
);
```

The result is similar to the following:

```text
+------+--------+-----------------------------------+
| rank | score  | title                             |
+------+--------+-----------------------------------+
| 1    | 0.6353 | House prices drop as sales slow   |
| 2    | 0.4060 | House prices suffer festive fall  |
| 3    | 0.3988 | Survey confirms property slowdown |
| 4    | 0.3728 | UK house prices dip in November   |
| 5    | 0.2671 | No seasonal lift for house market |
+------+--------+-----------------------------------+
```

Scores vary between runs and between models. Compare rows by `rank` rather than
by the absolute value of `score`.

#### Choose which column to rank

`column_to_rank` should name the column whose text most directly answers the
kind of question you're asking.

When the query describes a subject, a short column such as a title or summary
usually ranks best because a long body dilutes the subject across unrelated
paragraphs. When the query describes a detail that a headline wouldn't mention,
rank the longer column instead. Searching this table for *executives who
resigned after an accounting scandal* finds *Executive trio leave Aer Lingus*
when `body` is ranked, but misses it when `title` is ranked because the
resignations are described in the article text and not in the headline.

#### Rank the results of a query statement

The following query passes a query statement instead of a table, so that only
articles in the `business` category are ranked. It ranks `body` because the
query asks about circumstances that article headlines rarely state:

```googlesql
SELECT rank, score, title
FROM AI.RANK(
  (
    SELECT title, body
    FROM `bigquery-public-data.bbc_news.fulltext`
    WHERE category = 'business'
  ),
  'body',
  'executives who resigned after an accounting scandal',
  top_n => 3
);
```

The result is similar to the following:

```text
+------+--------+-----------------------------------+
| rank | score  | title                             |
+------+--------+-----------------------------------+
| 1    | 0.9338 | Senior Fannie Mae bosses resign   |
| 2    | 0.9296 | $1m payoff for former Shell boss  |
| 3    | 0.8640 | Japanese mogul arrested for fraud |
+------+--------+-----------------------------------+
```

Filtering before ranking is a good way to control cost because
`AI.RANK` ranks every row it receives.

#### Rerank the results of a related-article search

`AI.RANK` is most useful as the second stage of a two-stage search: an
inexpensive step selects candidates, and `AI.RANK` reorders them. The following
query finds the 50 articles most similar to a given article by comparing the
precomputed `body_embedded` vectors, and then ranks those candidates by how
well their `body` text answers a question:

```googlesql
SELECT rank, score, title
FROM AI.RANK(
  (
    SELECT base.title AS title, base.body AS body
    FROM VECTOR_SEARCH(
      TABLE `bigquery-public-data.bbc_news.fulltext`,
      'body_embedded',
      (
        SELECT body_embedded
        FROM `bigquery-public-data.bbc_news.fulltext`
        WHERE title = 'Bank opts to leave rates on hold'
      ),
      top_k => 50)
  ),
  'body',
  'downward trends in the housing market',
  top_n => 5
);
```

The result is similar to the following:

```text
+------+--------+-----------------------------------+
| rank | score  | title                             |
+------+--------+-----------------------------------+
| 1    | 0.9268 | No seasonal lift for house market |
| 2    | 0.9170 | House prices drop as sales slow   |
| 3    | 0.8830 | 'Post-Christmas lull' in lending  |
| 4    | 0.7935 | House prices show slight increase |
| 5    | 0.7747 | House prices rebound says Halifax |
+------+--------+-----------------------------------+
```

`VECTOR_SEARCH` compares vectors rather than text, so the subquery supplies the
embedding of an existing article to search with. To search with a phrase of your
own instead, generate an embedding for it with `AI.EMBED` and pass
that value.

Ranking 50 candidates rather than the whole table keeps the query fast and the
cost bounded.

### Pricing

The `AI.RANK` function uses your credentials to call the
[Agent Search ranking API](https://docs.cloud.google.com/generative-ai-app-builder/docs/ranking)
in the project that runs the query. This usage is billed using
[ranking API pricing](https://cloud.google.com/generative-ai-app-builder/pricing#ranking-api-pricing).
To control cost, filter the input before ranking.

### Quotas and limits

Ranking requests count toward the Agent Search ranking API quota
of the project that runs the query. For more information, see
[Agent Search quotas and limits](https://docs.cloud.google.com/generative-ai-app-builder/quotas).

If a row's text is longer than the model's token limit, the extra text is
truncated. For each model's limit, see
[Supported models](https://docs.cloud.google.com/generative-ai-app-builder/docs/ranking#models).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-rank (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

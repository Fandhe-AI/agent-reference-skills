---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-bag-of-words
---

# The ML.BAG_OF_WORDS function

## Signature / Usage

Use the `ML.BAG_OF_WORDS` function to compute a representation of tokenized
documents as the bag (multiset) of its words, disregarding word ordering and
grammar.

You can use this function with models that support
[manual feature preprocessing](https://docs.cloud.google.com/bigquery/docs/manual-preprocessing). For more
information, see the following documents:

- [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey)
- [Contribution analysis user journey](https://docs.cloud.google.com/bigquery/docs/contribution-analysis#contribution_analysis_user_journey)

### Syntax

```sql
ML.BAG_OF_WORDS(
  tokenized_document
  [, top_k]
  [, frequency_threshold]
)
OVER()
```

#### Arguments

`ML.BAG_OF_WORDS` takes the following arguments:

- `tokenized_document`: `ARRAY<STRING>` value that represents a document that has been tokenized. A tokenized document is a collection of terms (tokens), which are used for text analysis. For more information about tokenization in BigQuery, see [`TEXT_ANALYZE`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/text-analysis-functions#text_analyze).
- `top_k`: Optional argument. Takes an `INT64` value, which represents the size of the dictionary, excluding the unknown term. The `top_k` terms that appear in the most documents are added to the dictionary until this threshold is met. For example, if this value is `20`, the top 20 unique terms that appear in the most documents are added and then no additional terms are added.
- `frequency_threshold`: Optional argument. Takes an `INT64` value that represents the minimum number of documents a term must appear in to be included in the dictionary. For example, if this value is `3`, a term must appear at least three times in the tokenized document to be added to the dictionary.

Terms are added to a dictionary of terms if they satisfy the criteria for
`top_k` and `frequency_threshold`, otherwise they are considered
the *unknown term* . The unknown term is always the first term in the dictionary
and represented as `0`. The rest of the dictionary is ordered alphabetically.

### Output

`ML.BAG_OF_WORDS` returns a value for every row in the input. Each value has the
following type:

`ARRAY<STRUCT<index INT64, value FLOAT64>>`

Definitions:

- `index`: The index of the term that was added to the dictionary. Unknown terms have an index of `0`.
- `value`: The corresponding counts in the document.

### Quotas

See [Cloud AI service functions quotas and limits](https://docs.cloud.google.com/bigquery/quotas#cloud_ai_service_functions).

### Example

The following example calls the `ML.BAG_OF_WORDS` function on an input column
`f`, with no unknown terms:

```sql
WITH ExampleTable AS (
  SELECT 1 AS id, ['a', 'b', 'b', 'c'] AS f
  UNION ALL
  SELECT 2 AS id, ['a', 'c'] AS f
)

SELECT ML.BAG_OF_WORDS(f, 32, 1) OVER() AS results
FROM ExampleTable
ORDER BY id;
```

The output is similar to the following:

```text
+----+---------------------------------------------------------------------------------------+
| id |                                        results                                        |
+----+---------------------------------------------------------------------------------------+
|  1 | [{"index":"1","value":"1.0"},{"index":"2","value":"2.0"},{"index":"3","value":"1.0"}] |
|  2 |                             [{"index":"1","value":"1.0"},{"index":"3","value":"1.0"}] |
+----+---------------------------------------------------------------------------------------+
```

<br />

Notice that there is no index `0` in the result, as there are no unknown terms.

The following example calls the `ML.BAG_OF_WORDS` function on an input column
`f`:

```sql
WITH ExampleTable AS (
  SELECT 1 AS id, ['a', 'b', 'b', 'b', 'c', 'c', 'c', 'c', 'd', 'd'] AS f
  UNION ALL
  SELECT 2 AS id, ['a', 'c', NULL] AS f
)

SELECT ML.BAG_OF_WORDS(f, 4, 2) OVER() AS results
FROM ExampleTable
ORDER BY id;
```

The output is similar to the following:

```text
+----+---------------------------------------------------------------------------------------+
| id |                                        results                                        |
+----+---------------------------------------------------------------------------------------+
|  1 | [{"index":"0","value":"5.0"},{"index":"1","value":"1.0"},{"index":"2","value":"4.0"}] |
|  2 | [{"index":"0","value":"1.0"},{"index":"1","value":"1.0"},{"index":"2","value":"1.0"}] |
+----+---------------------------------------------------------------------------------------+

```

<br />

Notice that the values for `b` and `d` are not returned as they appear in only
one document when the value of `frequency_threshold` is set to `2`.

The following example calls the `ML.BAG_OF_WORDS` function with a lower value of
`top_k`:

```sql
WITH ExampleTable AS (
  SELECT 1 AS id, ['a', 'b', 'b', 'c'] AS f
  UNION ALL
  SELECT 2 AS id, ['a', 'c', 'c'] AS f
)

SELECT ML.BAG_OF_WORDS(f, 2, 1) OVER() AS results
FROM ExampleTable
ORDER BY id;
```

The output is similar to the following:

```text
+----+---------------------------------------------------------------------------------------+
| id |                                        results                                        |
+----+---------------------------------------------------------------------------------------+
|  1 | [{"index":"0","value":"2.0"},{"index":"1","value":"1.0"},{"index":"2","value":"1.0"}] |
|  2 |                             [{"index":"1","value":"1.0"},{"index":"2","value":"2.0"}] |
+----+---------------------------------------------------------------------------------------+

```

<br />

Notice how the value for `b` is not returned since we specify we want the top
two terms, and `b` only appears in one document.

The following example contains two terms with the same frequency. One of the terms is excluded from the results due to the alphabetical order.

```sql
WITH ExampleData AS (
  SELECT 1 AS id, ['a', 'b', 'b', 'c', 'd', 'd', 'd'] as f
  UNION ALL
  SELECT 2 AS id, ['a', 'c', 'c', 'd', 'd', 'd'] as f
)

SELECT id, ML.BAG_OF_WORDS(f, 2 ,2) OVER() as result
FROM ExampleData
ORDER BY id;
```

The results look like the following:

```text
+----+---------------------------------------------------------------------------------------+
| id |                                         result                                        |
+----+---------------------------------------------------------------------------------------+
|  1 | [{"index":"0","value":"5.0"},{"index":"1","value":"1.0"},{"index":"2","value":"1.0"}] |
|  2 | [{"index":"0","value":"3.0"},{"index":"1","value":"1.0"},{"index":"2","value":"2.0"}] |
+----+---------------------------------------------------------------------------------------+
```

### What's next

- Learn about the [`BAG_OF_WORDS`
  function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/text-analysis-functions#bag_of_words) outside of machine learning.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-bag-of-words (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Conflicting official statements: the `frequency_threshold` description defines it as "the minimum number of documents a term must appear in", but its example says that with `3` "a term must appear at least three times in the tokenized document". The definition, the `ML.TF_IDF` page and this page's examples (`b` and `d` are excluded with `frequency_threshold` set to `2` because they appear in only one document) count documents, so with `3` a term must appear in at least three documents.

## Related

- [Index of this directory](./README.md)

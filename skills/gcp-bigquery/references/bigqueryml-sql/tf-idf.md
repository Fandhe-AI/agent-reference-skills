---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-tf-idf
---

# The ML.TF_IDF function

## Signature / Usage

The term frequency-inverse document frequency (TF-IDF) reflects how important a word
is to a document in a collection or corpus. Use the `ML.TF_IDF` function to
compute TF-IDF of terms in a document, given the precomputed inverse-document
frequency for use in machine learning model creation.

This function uses a TF-IDF algorithm to compute the relevance of terms in a set
of tokenized documents. TF-IDF multiplies two metrics: how many times a term
appears in a document (term frequency), and the inverse document frequency of
the term across a collection of documents (inverse document frequency).

- TF-IDF:

  ```text
  term frequency * inverse document frequency
  ```

- Term frequency:

  ```text
  (count of term in document) / (document size)
  ```

- Inverse document frequency:

  ```text
  log(1 + num_documents / (1 + token_document_count))
  ```

Terms are added to a dictionary of terms if they satisfy the criteria for
`top_k` and `frequency_threshold`, otherwise they are considered
the *unknown term* . The unknown term is always the first term in the dictionary
and represented as `0`. The rest of the dictionary is ordered alphabetically.

You can use this function with models that support
[manual feature preprocessing](https://docs.cloud.google.com/bigquery/docs/manual-preprocessing). For more
information, see the following documents:

- [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey)
- [Contribution analysis user journey](https://docs.cloud.google.com/bigquery/docs/contribution-analysis#contribution_analysis_user_journey)

### Syntax

```sql
ML.TF_IDF(
  tokenized_document
  [, top_k]
  [, frequency_threshold]
)
OVER()
```

#### Arguments

`ML.TF_IDF` takes the following arguments:

- `tokenized_document`: `ARRAY<STRING>` value that represents a document that has been tokenized. A tokenized document is a collection of terms (tokens), which are used for text analysis.
- `top_k`: Optional argument. Takes an `INT64` value, which represents the size of the dictionary, excluding the unknown term. The `top_k` terms that appear in the most documents are added to the dictionary until this threshold is met. For example, if this value is `20`, the top 20 unique terms that appear in the most documents are added and then no additional terms are added.
- `frequency_threshold`: Optional argument. Take an `INT64` value that represents the minimum number of documents a term must appear in to be included in the dictionary. For example, if this value is `3`, a term must appear in at least three documents to be added to the dictionary.

### Output

`ML.TF_IDF` returns the input table plus the following two columns:

`ARRAY<STRUCT<index INT64, value FLOAT64>>`

Definitions:

- `index`: The index of the term that was added to the dictionary. Unknown terms
  have an index of 0.

- `value`: The TF-IDF computation for the term.

### Quotas

See [Cloud AI service functions quotas and limits](https://docs.cloud.google.com/bigquery/quotas#cloud_ai_service_functions).

### Example

The following example creates a table `ExampleTable` and applies the `ML.TF_IDF`
function:

```sql
WITH
  ExampleTable AS (
    SELECT 1 AS id, ['I', 'like', 'pie', 'pie', 'pie', NULL] AS f
    UNION ALL
    SELECT 2 AS id, ['yum', 'yum', 'pie', NULL] AS f
    UNION ALL
    SELECT 3 AS id, ['I', 'yum', 'pie', NULL] AS f
    UNION ALL
    SELECT 4 AS id, ['you', 'like', 'pie', NULL] AS f
  )
SELECT id, ML.TF_IDF(f, 3, 1) OVER () AS results
FROM ExampleTable
ORDER BY id;
```

The output is similar to the following:

```text
+----+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| id |                                                                                     results                                                                                     |
+----+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|  1 | [{"index":"0","value":"0.12679902142647365"},{"index":"1","value":"0.1412163100645339"},{"index":"2","value":"0.1412163100645339"},{"index":"3","value":"0.29389333245105953"}] |
|  2 |                                                                                        [{"index":"0","value":"0.5705955964191315"},{"index":"3","value":"0.14694666622552977"}] |
|  3 |                                             [{"index":"0","value":"0.380397064279421"},{"index":"1","value":"0.21182446509680086"},{"index":"3","value":"0.14694666622552977"}] |
|  4 |                                             [{"index":"0","value":"0.380397064279421"},{"index":"2","value":"0.21182446509680086"},{"index":"3","value":"0.14694666622552977"}] |
+----+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

### What's next

- Learn more about [TF-IDF](../googlesql-functions/text-analysis-functions.md#tf_idf) outside of machine learning.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-tf-idf (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

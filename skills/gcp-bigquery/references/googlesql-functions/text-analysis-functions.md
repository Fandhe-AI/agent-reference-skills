---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/text-analysis-functions
---

# Text analysis functions

## Signature / Usage

GoogleSQL for BigQuery supports the following text analysis functions.

### Function list

| Name | Summary |
|---|---|
| [`BAG_OF_WORDS`](#bag_of_words) | Gets the frequency of each term (token) in a tokenized document. |
| [`TEXT_ANALYZE`](#text_analyze) | Extracts terms (tokens) from text and converts them into a tokenized document. |
| [`TF_IDF`](#tf_idf) | Evaluates how relevant a term (token) is to a tokenized document in a set of tokenized documents. |

### `BAG_OF_WORDS`

```sql
BAG_OF_WORDS(tokenized_document)
```

**Definition**

Gets the frequency of each term (token) in a tokenized document.

**Definitions**

- `tokenized_document`: `ARRAY<STRING>` value that represents a document that has been tokenized. A tokenized document is a collection of terms (tokens), which are used for text analysis.

**Return type**

`ARRAY<STRUCT<term STRING, count INT64>>`

Definitions:

- `term`: A unique term in the tokenized document.
- `count`: The number of times the term was found in the tokenized document.

**Examples**

The following query produces terms and their frequencies in two
tokenized documents:

```sql
WITH
  ExampleTable AS (
    SELECT 1 AS id, ['I', 'like', 'pie', 'pie', 'pie', NULL] AS f UNION ALL
    SELECT 2 AS id, ['yum', 'yum', 'pie', NULL] AS f
  )
SELECT id, BAG_OF_WORDS(f) AS results
FROM ExampleTable
ORDER BY id;

/*----+------------------------------------------------+
 | id | results                                        |
 +----+------------------------------------------------+
 | 1  | [(null, 1), ('I', 1), ('like', 1), ('pie', 3)] |
 | 2  | [(null, 1), ('pie', 1), ('yum', 2)]            |
 +----+------------------------------------------------*/
```

### `TEXT_ANALYZE`

```sql
TEXT_ANALYZE(
  text
  [, analyzer => { 'LOG_ANALYZER' | 'NO_OP_ANALYZER' | 'PATTERN_ANALYZER' } ]
  [, analyzer_options => analyzer_options_values ]
)
```

**Description**

Extracts terms (tokens) from text and converts them into a tokenized document.

**Definitions**

- `text`: `STRING` value that represents the input text to tokenize.
- `analyzer`: A named argument with a `STRING` value. Determines which
  analyzer to use to convert `text` into an array of terms (tokens). This can
  be:

  - `'LOG_ANALYZER'` (default): Breaks the input into terms when delimiters
    are encountered and then normalizes the terms. If `analyzer` isn't
    specified, this is used by default.
    For more information, see [`LOG_ANALYZER` text analyzer](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/text-analysis#log_analyzer).

  - `'NO_OP_ANALYZER'`: Extracts the text as a single term (token), but
    doesn't apply normalization.
    For more information, see [`NO_OP_ANALYZER` text analyzer](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/text-analysis#no_op_analyzer).

  - `'PATTERN_ANALYZER'`: Breaks the input into terms that match a
    regular expression. For more information, see
    [`PATTERN_ANALYZER` text analyzer](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/text-analysis#pattern_analyzer).

- `analyzer_options`: A named argument with a JSON-formatted `STRING` value.
  Takes a list of text analysis rules. For more information, see
  [Text analyzer options](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/text-analysis#text_analyzer_options).

**Details**

There is no guarantee on the order of the tokens produced by this function.

If no analyzer is specified, the `LOG_ANALYZER` analyzer is used by default.

**Return type**

`ARRAY<STRING>`

**Examples**

The following query uses the default text analyzer,
[`LOG_ANALYZER`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/text-analysis#log_analyzer), with the input text:

```sql
SELECT TEXT_ANALYZE('I like pie, you like-pie, they like 2 PIEs.') AS results

/*--------------------------------------------------------------------------+
 | results                                                                  |
 +--------------------------------------------------------------------------+
 | ['i', 'like', 'pie', 'you', 'like', 'pie', 'they', 'like', '2', 'pies' ] |
 +--------------------------------------------------------------------------*/
```

The following query uses the [`NO_OP_ANALYZER`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/text-analysis#no_op_analyzer) text analyzer
with the input text:

```sql
SELECT TEXT_ANALYZE(
  'I like pie, you like-pie, they like 2 PIEs.',
  analyzer=>'NO_OP_ANALYZER'
) AS results

/*-----------------------------------------------+
 | results                                       |
 +-----------------------------------------------+
 | 'I like pie, you like-pie, they like 2 PIEs.' |
 +-----------------------------------------------*/
```

The following query uses the [`PATTERN_ANALYZER`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/text-analysis#pattern_analyzer)
text analyzer with the input text:

```sql
SELECT TEXT_ANALYZE(
  'I like pie, you like-pie, they like 2 PIEs.',
  analyzer=>'PATTERN_ANALYZER'
) AS results

/*----------------------------------------------------------------+
 | results                                                        |
 +----------------------------------------------------------------+
 | ['like', 'pie', 'you', 'like', 'pie', 'they', 'like', 'pies' ] |
 +----------------------------------------------------------------*/
```

For additional examples that include analyzer options,
see [Text analysis](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/text-analysis).

For helpful analyzer recipes that you can use to enhance
analyzer-supported queries, see
[Search with text analyzers](https://docs.cloud.google.com/bigquery/docs/text-analysis-search).

### `TF_IDF`

```sql
TF_IDF(tokenized_document) OVER()
```

```sql
TF_IDF(tokenized_document, max_distinct_tokens) OVER()
```

```sql
TF_IDF(tokenized_document, max_distinct_tokens, frequency_threshold) OVER()
```

**Description**

Evaluates how relevant a term is to a tokenized document in a set of
tokenized documents, using the TF-IDF (term frequency-inverse document frequency)
algorithm.

**Definitions**

- `tokenized_document`: `ARRAY<STRING>` value that represents a document that has been tokenized. A tokenized document is a collection of terms (tokens), which are used for text analysis.
- `max_distinct_tokens`: Optional argument. Takes a non-negative
  `INT64` value, which represents the size of the dictionary, excluding the
  unknown term.

  Terms are added to the dictionary until this threshold is met. So, if this
  value is `20`, the first 20 unique terms are added and then no additional
  terms are added.

  If this argument isn't provided, the default value is `32000`.
  If this argument is specified, the maximum value is `1048576`.
- `frequency_threshold`: Optional argument. Takes a non-negative `INT64` value
  that represents the minimum number of tokenized documents a term must
  appear in to be included in the dictionary. So, if this value is
  `3`, a term must appear in at least three tokenized documents to
  be added to the dictionary.

  If this argument isn't provided, the default value is `5`.

**Details**

This function uses a TF-IDF (term frequency-inverse document frequency)
algorithm to compute the relevance of terms in a set of tokenized documents.
TF-IDF multiplies two metrics: how many times a term appears in a document
(term frequency), and the inverse document frequency of the term across a
collection of documents (inverse document frequency).

- TDIF:

  ```sql
  term frequency * inverse document frequency
  ```

- term frequency:

  ```sql
  (count of term in document) / (document size)
  ```

- inverse document frequency:

  ```sql
  log(1 + document set size / (1 + count of documents containing term))
  ```

Terms are added to a dictionary of terms if they satisfy the criteria for
`max_distinct_tokens` and `frequency_threshold`, otherwise they are considered
the *unknown term* . The unknown term is always the first term in the dictionary
and represented as `NULL`. The rest of the dictionary is ordered by
term frequency rather than alphabetically.

**Return type**

`ARRAY<STRUCT<term STRING, tf_idf FLOAT64>>`

Definitions:

- `term`: The unique term that was added to the dictionary.
- `tf_idf`: The TF-IDF computation for the term.

**Examples**

The following query computes the relevance of up to 10 terms that appear in at
least two of a set of tokenized documents. In this example, `10` represents
`max_distinct_tokens` and `2` represents `frequency_threshold`:

```sql
WITH ExampleTable AS (
  SELECT 1 AS id, ['I', 'like', 'pie', 'pie', 'pie', NULL] AS f UNION ALL
  SELECT 2 AS id, ['yum', 'yum', 'pie', NULL] AS f UNION ALL
  SELECT 3 AS id, ['I', 'yum', 'pie', NULL] AS f UNION ALL
  SELECT 4 AS id, ['you', 'like', 'pie', 'too', NULL] AS f
)
SELECT id, TF_IDF(f, 10, 2) OVER() AS results
FROM ExampleTable
ORDER BY id;

/*----+-------------------------------------------------+
 | id | results                                         |
 +----+-------------------------------------------------+
 | 1  | [{"index":null,"value":"0.1304033435859887"},   |
 |    |  {"index":"I","value":"0.1412163100645339"},    |
 |    |  {"index":"like","value":"0.1412163100645339"}, |
 |    |  {"index":"pie","value":"0.29389333245105953"}] |
 +----+-------------------------------------------------+
 | 2  | [{"index":null,"value":"0.1956050153789831"},   |
 |    |  {"index":"pie","value":"0.14694666622552977"}, |
 |    |  {"index":"yum","value":"0.4236489301936017"}]  |
 +----+-------------------------------------------------+
 | 3  | [{"index":null,"value":"0.1956050153789831"},   |
 |    |  {"index":"I","value":"0.21182446509680086"},   |
 |    |  {"index":"pie","value":"0.14694666622552977"}, |
 |    |  {"index":"yum","value":"0.21182446509680086"}] |
 +----+-------------------------------------------------+
 | 4  | [{"index":null,"value":"0.4694520369095594"},   |
 |    |  {"index":"like","value":"0.1694595720774407"}, |
 |    |  {"index":"pie","value":"0.11755733298042381"}] |
 +----+-------------------------------------------------*/
```

The following query computes the relevance of up to three terms that appear in at
least two of a set of tokenized documents:

```sql
WITH ExampleTable AS (
  SELECT 1 AS id, ['I', 'like', 'pie', 'pie', 'pie', NULL] AS f UNION ALL
  SELECT 2 AS id, ['yum', 'yum', 'pie', NULL] AS f UNION ALL
  SELECT 3 AS id, ['I', 'yum', 'pie', NULL] AS f UNION ALL
  SELECT 4 AS id, ['you', 'like', 'pie', 'too', NULL] AS f
)
SELECT id, TF_IDF(f, 3, 2) OVER() AS results
FROM ExampleTable
ORDER BY id;

/*----+-------------------------------------------------+
 | id | results                                         |
 +----+-------------------------------------------------+
 | 1  | [{"index":null,"value":"0.12679902142647365"},  |
 |    |  {"index":"I","value":"0.1412163100645339"},    |
 |    |  {"index":"like","value":"0.1412163100645339"}, |
 |    |  {"index":"pie","value":"0.29389333245105953"}] |
 +----+-------------------------------------------------+
 | 2  | [{"index":null,"value":"0.5705955964191315"},   |
 |    |  {"index":"pie","value":"0.14694666622552977"}] |
 +----+-------------------------------------------------+
 | 3  | [{"index":null,"value":"0.380397064279421"},    |
 |    |  {"index":"I","value":"0.21182446509680086"},   |
 |    |  {"index":"pie","value":"0.14694666622552977"}] |
 +----+-------------------------------------------------+
 | 4  | [{"index":null,"value":"0.45647647713530515"},  |
 |    |  {"index":"like","value":"0.1694595720774407"}, |
 |    |  {"index":"pie","value":"0.11755733298042381"}] |
 +----+-------------------------------------------------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/text-analysis-functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: The text says terms that appear at least once, but the call is `TF_IDF(f, 3, 2)` and the previous example on this page explains that `2` is `frequency_threshold`, which counts the documents a term appears in. The text is changed to "in at least two of a set" of tokenized documents.
- Corrected from the official docs: The return type uses `DOUBLE`, which is not a GoogleSQL type. It is changed to `FLOAT64`, the name used for floating-point values elsewhere in these references.
- Caution: The `TF_IDF` return type is `ARRAY<STRUCT<term STRING, tf_idf FLOAT64>>`, but the example results print the fields as `index` and `value`. The official docs do not explain the difference (it may be a JSON rendering); the results are kept as published.
- Corrected from the official docs: the `frequency_threshold` definition says it is the minimum number of times a term must appear in a tokenized document. The `TF_IDF(f, 3, 2)` example on this page includes `I` and `like`, which appear only once in each document but in two documents each, and the `ML.TF_IDF` page (`bigqueryml-sql/tf-idf.md`) defines the same argument as the minimum number of documents a term must appear in. The definition is changed to count documents.
- Corrected from the official docs: the first `TF_IDF` example says the terms appear "at least twice"; because `frequency_threshold` counts documents, it is changed to "in at least two of a set" of tokenized documents.

## Related

- [Index of this directory](./README.md)

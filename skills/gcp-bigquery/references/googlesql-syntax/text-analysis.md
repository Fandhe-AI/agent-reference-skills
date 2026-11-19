---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/text-analysis
---

# Text analysis

## Signature / Usage

This document provides an overview of text analysis, also known as
text mining, in GoogleSQL for BigQuery.

GoogleSQL supports text analysis, which is a technique that you can
use to identify terms (tokens) in unstructured text, and then use those terms
for actionable insight, such as indexing and searching, or as inputs for
vectorizations to be used in ML training pipelines. You can use a
text analyzer to analyze information in a specific way and
text analysis options to apply your own analyzation customizations.

Text analysis is supported in the following GoogleSQL functions and
statements:

- [`SEARCH` function](../googlesql-functions/search_functions.md#search)
- [`TEXT_ANALYZE` function](../googlesql-functions/text-analysis-functions.md#text_analyze)
- [`CREATE SEARCH INDEX` statement](data-definition-language-2.md#create-search-index-statement)

### Text analyzers

GoogleSQL for BigQuery supports several types of text analyzers, which you can use
to extract data from unstructured text. You can pass an analyzer into some
functions and statements with the `analyzer` argument.
Each text analyzer has a unique way of extracting information. Your choices are:

- [`NO_OP_ANALYZER`](#no_op_analyzer-analyzer): Extracts the input as a single term (token).
- [`LOG_ANALYZER`](#log_analyzer-analyzer): Breaks the input into terms when delimiters are encountered.
- [`PATTERN_ANALYZER`](#pattern_analyzer-analyzer): Breaks the input into terms that match a regular expression.

#### `NO_OP_ANALYZER` analyzer

The `NO_OP_ANALYZER` analyzer is a no-operation analyzer, which extracts
the input text as a single term (token). No formatting is applied to the
resulting term.

This analyzer doesn't support any text analyzer options or token filters.

**Example**

The following query uses `NO_OP_ANALYZER` as the text analyzer:

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

#### `LOG_ANALYZER` analyzer

The `LOG_ANALYZER` analyzer extracts the input text as terms (tokens) when
a delimiter is encountered, discards the delimiters, and then changes any
uppercase letters to lowercase letters in the results.

Details:

- An uppercase letter in a term is made lowercase, but ASCII values greater than 127 are kept as is.
- Text is split into individual terms when one the following delimiters,
  such as a space, period, or other non-letter character, is encountered:

  ```text
  [ ] < > ( ) { } | ! ; , ' " * & ? + / : = @ . - $ % \ _ \n \r \s \t %21 %26
  %2526 %3B %3b %7C %7c %20 %2B %2b %3D %3d %2520 %5D %5d %5B %5b %3A %3a %0A
  %0a %2C %2c %28 %29
  ```

  If you don't want to use these default delimiters, you can specify the
  specific delimiters you want to use as text analyzer options. For more
  information, see [`delimiters` option](#delimiters-analyzer-option).

This analyzer supports token filters. For more information, see
[`token_filters` option](#token_filters-analyzer-option). If the `token_filters` option
isn't specified, [ASCII lowercase normalization](#convert-to-lowercase-ascii)
is used by default.

**Example**

The following query uses `LOG_ANALYZER` as the text analyzer:

```sql
SELECT TEXT_ANALYZE(
  'I like pie, you like-pie, they like 2 PIEs.',
  analyzer=>'LOG_ANALYZER'
) AS results

/*---------------------------------------------------------------------------+
 | results                                                                   |
 +---------------------------------------------------------------------------+
 | [ 'i', 'like', 'pie', 'you', 'like', 'pie', 'they', 'like', '2', 'pies' ] |
 +---------------------------------------------------------------------------*/
```

Because `LOG_ANALYZER` is the default text analyzer, you don't need to
specify it in the query. For example, the following query produces the same
results as the preceding query:

```sql
SELECT TEXT_ANALYZE(
  'I like pie, you like-pie, they like 2 PIEs.'
) AS results
```

#### `PATTERN_ANALYZER` analyzer

The `PATTERN_ANALYZER` analyzer extracts terms (tokens) from unstructured text,
using a [re2](https://github.com/google/re2/wiki/Syntax) regular expression.

This analyzer finds the first term from the left side of the input text that
matches the regular expression and adds this term to the output. Then, it
removes the prefix in the input text up to the newly found term. This process
is repeated until the input text is empty.

By default, the regular expression `\b\w{2,}\b` is used. This regular expression
matches non-Unicode words that have at least two characters. If you
would like to use another regular expression, see
[`patterns` option](#patterns-analyzer-option).

This analyzer supports token filters. For more information, see
[`token_filters` option](#token_filters-analyzer-option). If the `token_filters` option
isn't specified, [ASCII lowercase normalization](#convert-to-lowercase-ascii)
is used by default.

**Example**

The following query uses `PATTERN_ANALYZER` as the text analyzer.
Because the default regular expression is used, only words that have two or
more characters are included as terms. Also, the results are lowercase.
Notice that `i` and `2` don't appear in the results.

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

### Text analyzer options

Text analyzers support custom options that determine how input text is
analyzed. You can pass analyzer options into some functions and statements
with the `analyzer_options` argument. This argument
takes a JSON-formatted `STRING` value.

Your choices are:

- [`delimiters`](#delimiters-analyzer-option): Breaks the input into terms when these delimiters are encountered.
- [`patterns`](#patterns-analyzer-option): Breaks the input into terms that match a regular expression.
- [`token_filters`](#token_filters-analyzer-option): After the input text has been tokenized into terms, apply filters on the terms.

#### `delimiters` analyzer option

```text
'{
  "delimiters": array_of_delimiters
}'
```

**Description**

If you are using the [`LOG_ANALYZER` text analyzer](#log_analyzer-analyzer) and you don't
want to use the default delimiters, you can specify the specific delimiters that
you want to use to filter the input text.

**Definitions**

- `delimiters`: A JSON array containing strings that represent the delimiters to use to tokenize the input text.

**Details**

When there are two delimiters with the same prefix, for example: `%` and
`%2`, the longer delimiter has higher precedence and is analyzed first.

You can add any ASCII string as a delimiter. The length of a delimiter must be
less than or equal to 16 characters. Some common delimiters that you might
want to include are:

```text
[ ] < > ( ) { } | ! ; , ' " * & ? + / : = @ . - $ % \ _ \n \r \s \t %21 %26
%2526 %3B %3b %7C %7c %20 %2B %2b %3D %3d %2520 %5D %5d %5B %5b %3A %3a %0A
%0a %2C %2c %28 %29
```

**Example**

Adapted (not in the official docs): moved the misplaced closing quote and bracket in the result array.

```sql
SELECT TEXT_ANALYZE(
  'I like pie, you like-pie, they like 2 PIEs.',
  analyzer=>'LOG_ANALYZER',
  analyzer_options=>'{"delimiters": [",", ".", "-"]}'
) AS results

/*-------------------------------------------------------+
 | results                                               |
 +-------------------------------------------------------+
 | ['i like pie', 'you like', 'pie', 'they like 2 pies' ] |
 +-------------------------------------------------------*/
```

#### `patterns` analyzer option

```text
'{
  "patterns": array_of_regex_patterns
}'
```

**Description**

If you are using the [`PATTERN_ANALYZER` text analyzer](#pattern_analyzer-analyzer) and
you don't want to use the default regular expression, you can specify the
regular expression that you want to use to filter the input text.

**Definitions**

- `patterns`: A JSON array which contains one string that represents the regular expression.

**Details**

If this analyzer option isn't provided for the
`PATTERN_ANALYZER` text analyzer, the regular expression `\b\w{2,}\b` is
used by default to match non-Unicode words that have at least two characters.

**Example**

```sql
SELECT TEXT_ANALYZE(
  'I like pie, you like-pie, they like 2 PIEs.',
  analyzer=>'PATTERN_ANALYZER',
  analyzer_options=>'{"patterns": ["[a-zA-Z]*"]}'
) AS results

/*----------------------------------------------------------------+
 | results                                                        |
 +----------------------------------------------------------------+
 | ['like', 'pie', 'you', 'like', 'pie', 'they', 'like', 'pies' ] |
 +----------------------------------------------------------------*/
```

#### `token_filters` analyzer option

```text
'{
  "token_filters": array_of_token_filters
}'
```

**Description**

If you are using the [`LOG_ANALYZER`](#log_analyzer-analyzer) or
[`PATTERN_ANALYZER`](#pattern_analyzer-analyzer) text analyzer, you can sequentially apply
one or more token filters to the input text after the input text has been
tokenized.

**Definitions**

- `array_of_token_filters`: A JSON array containing objects that represent token filters.

**Details**

For more information about the specific
token filters you can add, see [Token filters](#token-filters).

**Example**

For example, this query contains both
`patterns` and `token_filters` options:

Adapted (not in the official docs): added the missing closing quote.

```sql
SELECT TEXT_ANALYZE(
  'I like pie, you like-pie, they like 2 PIEs.',
  analyzer=>'PATTERN_ANALYZER',
  analyzer_options=>'''
  {
    "patterns": ["[a-zA-Z]*"],
    "token_filters": [
      {
        "normalizer": {
          "mode": "LOWER"
        }
      },
      {
        "stop_words": ["they", "pie"]
      }
    ]
  }
  '''
) AS results

/*----------------------------------------------+
 | results                                      |
 +----------------------------------------------+
 | ['i', 'like', 'you', 'like', 'like', 'pies' ] |
 +----------------------------------------------*/
```

### Token filters

```text
'{
  "token_filters": [
    {
      "normalizer": {
        "mode": json_string,
        "icu_normalize_mode": json_string,
        "icu_case_folding": json_boolean
      }
    },
    {
      "stop_words": json_string_array
    }
  ]
}'
```

Token filters can modify or delete terms (tokens) that are extracted from
input text. If no token filters are specified for a text analyzer that supports
token filters, the [ASCII lowercase normalization](#convert-to-lowercase-ascii)
token filter is applied by default. If multiple token filters are added, they
are applied in the order in which they are specified. The same token filter can
be included multiple times in the `token_filters` array. See the examples in
this section for details.

**Definitions**

Each token filter has a unique JSON syntax that contains some of these
JSON key-value pairs, depending upon the type of token filter you want to use:

- `token_filters`: JSON array of objects that contain token filters. The same
  type of token filter can be included multiple times in this array.

  - `stop_words`: JSON array of strings that represent the words to remove
    from the list of terms.

  - `normalizer`: JSON object that contains the normalization settings for a
    token filter. The settings include:

    - `mode`: JSON string that represents the normalization mode. Your
      choices are:

      - `NONE`: Don't apply normalization mode to terms.

      - `LOWER`: ASCII lowercase terms. If no token filters are
        specified for a text analyzer that supports token filters, this
        is used by default.

      - `UNICODE_LOWER`: Unicode lowercase terms. Mapping between
        lowercase and uppercase is done according to the [Unicode
        Character Database](https://unicode.org/ucd/) without taking
        into account language-specific mappings.

      - `ICU_NORMALIZE`: ICU normalize terms.

    - `icu_normalize_mode`: JSON string that represents the ICU
      normalization mode. Your choices are:

      - `NFC`: Apply [ICU NFC normalization](https://en.wikipedia.org/wiki/Unicode_equivalence) to terms.
      - `NFKC`: Apply [ICU NFKC normalization](https://en.wikipedia.org/wiki/Unicode_equivalence) to terms.
      - `NFD`: Apply [ICU NFD normalization](https://en.wikipedia.org/wiki/Unicode_equivalence) to terms.
      - `NFKD`: Apply [ICU NFKD normalization](https://en.wikipedia.org/wiki/Unicode_equivalence) to terms.

      You can use this if `mode` is `ICU_NORMALIZE`. If `mode` is
      `ICU_NORMALIZE` and this key-value pair isn't set,
      `icu_normalize_mode` is `NFKC` by default.
    - `icu_case_folding`: JSON boolean that determines whether to apply
      ICU case folding to terms. `true` to apply ICU case folding to
      terms. Otherwise `false`.

      You can use this if `mode` is `ICU_NORMALIZE`. If `mode` is
      `ICU_NORMALIZE` and this value isn't used, `icu_case_folding` is
      `true` by default.

**Details**

Token filters can be used with all but the
`NO_OP_ANALYZER` text analyzer in the same query. Token filters are applied
after the text analyzer breaks input text into terms.

If `token_filters` isn't specified for an analyzer that supports token filters,
[ASCII lowercase normalization](#convert-to-lowercase-ascii) is applied by
default.

You can add multiple token filters to the token filters array (`token_filters`).
If multiple token filters are added, they are applied to the terms in the
order in which they are specified. For more information, see the examples in
this section.

You can add the same token filter multiple times to the token filters
array. For more information, see the examples in
this section.

Here are some of the filters that you can apply to terms, using the
token filter JSON syntax:

- [No normalization](#no-normalization)
- [Convert to lowercase (ASCII)](#convert-to-lowercase-ascii)
- [Convert to lowercase (UNICODE_LOWER)](#convert-to-lowercase-unicode)
- [Convert to lowercase (ICU case folding)](#convert-to-lowercase-icu-case-folding)
- [Preserve uppercase](#preserve-uppercase)
- [ICU normalize with NFC](#icu-normalize-with-nfc)
- [ICU normalize with NFKC](#icu-normalize-with-nfkc)
- [ICU normalize with NFD](#icu-normalize-with-nfd)
- [ICU normalize with NFKD](#icu-normalize-with-nfkd)
- [Remove words](#remove-words)

**Examples**

In the following example, the terms are NFKC normalized, and then because
ICU case folding is `true`, the terms are converted to lowercase. Finally,
the lowercase words `pies` and `2` are removed from the query.

```sql
SELECT TEXT_ANALYZE(
  'I like ❶ ② pies, you like Ño PIEs',
  analyzer=>'LOG_ANALYZER',
  analyzer_options=>'''
  {
    "token_filters": [
      {
        "normalizer": {
          "mode": "ICU_NORMALIZE",
          "icu_normalize_mode": "NFKC",
          "icu_case_folding": true
        }
      },
      {
        "stop_words": ["pies", "2"]
      }
    ]
  }
  '''
) AS results

/*------------------------------------------+
 | results                                  |
 +------------------------------------------+
 | ['i', 'like', '❶', 'you', 'like', 'ño' ] |
 +------------------------------------------*/
```

The following query is similar to the preceding one, but the order of
token filters is re-ordered, and this affects the outcome of the query. In the
results, `2` and `PIEs` is retained because `②` is normalized to `2`
and `PIEs` is normalized to `pies` after the stop words token filter is applied:

```sql
SELECT TEXT_ANALYZE(
  'I like ❶ ② pies, you like Ño PIEs',
  analyzer=>'LOG_ANALYZER',
  analyzer_options=>'''
  {
    "token_filters": [
      {
        "stop_words": ["pies", "2"]
      },
      {
        "normalizer": {
          "mode": "ICU_NORMALIZE",
          "icu_normalize_mode": "NFKC",
          "icu_case_folding": true
        }
      }
    ]
  }
  '''
) AS results

/*-------------------------------------------------------+
 | results                                               |
 +-------------------------------------------------------+
 | ['i', 'like', '❶', '2', 'you', 'like', 'ño', 'pies' ] |
 +-------------------------------------------------------*/
```

You can use the same token filter as many times as you'd like in a query. In
the following query, `stop_words` is used twice:

```sql
SELECT TEXT_ANALYZE(
  'I like ❶ ② pies, you like Ño PIEs',
  analyzer=>'LOG_ANALYZER',
  analyzer_options=>'''
  {
    "token_filters": [
      {
        "stop_words": ["like", "you"]
      },
      {
        "normalizer": {
          "mode": "ICU_NORMALIZE",
          "icu_normalize_mode": "NFKC",
          "icu_case_folding": true
        }
      },
      {
        "stop_words": ["ño"]
      }
    ]
  }
  '''
) AS results

/*----------------------------------+
 | results                          |
 +----------------------------------+
 | ['i', '❶', '2', 'pies', 'pies' ] |
 +----------------------------------*/
```

#### No normalization

Adapted (not in the official docs): wrapped the filter in `{ }` so the array holds an object.

```text
'{
  "token_filters": [
    {
      "normalizer": {
        "mode": "NONE"
      }
    }
  ]
}'
```

**Description**

Normalization isn't applied to terms.

**Example**

In the following query, normalization isn't applied to the results:

```sql
SELECT TEXT_ANALYZE(
  'I like ❶ ② pies, you like Ño PIEs',
  analyzer=>'LOG_ANALYZER',
  analyzer_options=>'''
  {
    "token_filters": [
      {
        "normalizer": {
          "mode": "NONE"
        }
      }
    ]
  }
  '''
) AS results

/*----------------------------------------------------------------+
 | results                                                        |
 +----------------------------------------------------------------+
 | ['I', 'like', '❶', '②', 'pies', 'you', 'like', 'Ño', 'PIEs' ] |
 +----------------------------------------------------------------*/
```

#### Convert to lowercase (ASCII)

Adapted (not in the official docs): wrapped the filter in `{ }` so the array holds an object.

```text
'{
  "token_filters": [
    {
      "normalizer": {
        "mode": "LOWER"
      }
    }
  ]
}'
```

**Description**

Performs ASCII lowercasing on the resulting terms.

**Example**

In the following query, ASCII lowercasing is applied to the results:

```sql
SELECT TEXT_ANALYZE(
  'I like ❶ ② pies, you like Ño PIEs',
  analyzer=>'LOG_ANALYZER',
  analyzer_options=>'''
  {
    "token_filters": [
      {
        "normalizer": {
          "mode": "LOWER"
        }
      }
    ]
  }
  '''
) AS results

/*----------------------------------------------------------------+
 | results                                                        |
 +----------------------------------------------------------------+
 | ['i', 'like', '❶', '②', 'pies', 'you', 'like', 'Ño', 'pies' ] |
 +----------------------------------------------------------------*/
```

#### Convert to lowercase (Unicode)

Adapted (not in the official docs): wrapped the filter in `{ }` so the array holds an object.

```text
'{
  "token_filters": [
    {
      "normalizer": {
        "mode": "UNICODE_LOWER"
      }
    }
  ]
}'
```

**Description**

Performs Unicode lowercasing on the resulting terms. Mapping between lowercase
and uppercase is done according to the [Unicode Character
Database](https://unicode.org/ucd/) without taking into account
language-specific mappings.

**Example**

In the following query, Unicode lowercasing is applied to the results:

```sql
SELECT TEXT_ANALYZE(
  'I like ❶ ② pies, you like Ño PIEs',
  analyzer=>'LOG_ANALYZER',
  analyzer_options=>'''
  {
    "token_filters": [
      {
        "normalizer": {
          "mode": "UNICODE_LOWER"
        }
      }
    ]
  }
  '''
) AS results

/*----------------------------------------------------------------+
 | results                                                        |
 +----------------------------------------------------------------+
 | ['i', 'like', '❶', '②', 'pies', 'you', 'like', 'ño', 'pies' ] |
 +----------------------------------------------------------------*/
```

#### Convert to lowercase (ICU case folding)

Adapted (not in the official docs): wrapped the filter in `{ }` so the array holds an object.

```text
'{
  "token_filters": [
    {
      "normalizer": {
        "mode": "ICU_NORMALIZE",
        "icu_case_folding": true
      }
    }
  ]
}'
```

**Description**

Performs ICU case folding, which converts the resulting terms to lowercase.

**Example**

In the following query, ICU case folding is applied to the results:

Adapted (not in the official docs): added the missing comma between result elements.

```sql
SELECT TEXT_ANALYZE(
  'I like ❶ ② pies, you like Ño PIEs',
  analyzer=>'LOG_ANALYZER',
  analyzer_options=>'''
  {
    "token_filters": [
      {
        "normalizer": {
          "mode": "ICU_NORMALIZE",
          "icu_case_folding": true
        }
      }
    ]
  }
  '''
) AS results

/*--------------------------------------------------------------+
 | results                                                      |
 +--------------------------------------------------------------+
 | ['i', 'like', '❶', '2', 'pies', 'you', 'like', 'ño', 'pies' ] |
 +--------------------------------------------------------------*/
```

#### Preserve uppercase

Adapted (not in the official docs): wrapped the filter in `{ }` so the array holds an object.

```text
'{
  "token_filters": [
    {
      "normalizer": {
        "mode": "ICU_NORMALIZE",
        "icu_case_folding": false
      }
    }
  ]
}'
```

**Description**

Don't convert uppercase characters to lowercase characters in the resulting
terms.

**Example**

In the following query, ICU case folding isn't applied to the results:

Adapted (not in the official docs): added the missing comma between result elements.

```sql
SELECT TEXT_ANALYZE(
  'I like ❶ ② pies, you like Ño PIEs',
  analyzer=>'LOG_ANALYZER',
  analyzer_options=>'''
  {
    "token_filters": [
      {
        "normalizer": {
          "mode": "ICU_NORMALIZE",
          "icu_case_folding": false
        }
      }
    ]
  }
  '''
) AS results

/*---------------------------------------------------------------+
 | results                                                       |
 +---------------------------------------------------------------+
 | ['I', 'like', '❶', '2', 'pies', 'you', 'like', 'Ño', 'PIEs' ] |
 +---------------------------------------------------------------*/
```

#### ICU normalize with NFC

Adapted (not in the official docs): wrapped the filter in `{ }` so the array holds an object.

```text
'{
  "token_filters": [
    {
      "normalizer": {
        "mode": "ICU_NORMALIZE",
        "icu_normalize_mode": "NFC"
      }
    }
  ]
}'
```

**Description**

Normalizes text with [ICU NFC normalization](https://en.wikipedia.org/wiki/Unicode_equivalence), which decomposes and
recomposes characters by canonical equivalence.

**Example**

In the following query, NFC normalization is applied to the results:

Adapted (not in the official docs): added the missing comma between result elements.

```sql
SELECT TEXT_ANALYZE(
  'I like ❶ ② pies, you like Ño PIEs',
  analyzer=>'LOG_ANALYZER',
  analyzer_options=>'''
  {
    "token_filters": [
      {
        "normalizer": {
          "mode": "ICU_NORMALIZE",
          "icu_normalize_mode": "NFC"
        }
      }
    ]
  }
  '''
) AS results

/*---------------------------------------------------------------+
 | results                                                       |
 +---------------------------------------------------------------+
 | ['i', 'like', '❶', '②', 'pies', 'you', 'like', 'ño', 'pies' ] |
 +---------------------------------------------------------------*/
```

#### ICU normalize with NFKC

Adapted (not in the official docs): wrapped the filter in `{ }` so the array holds an object.

```text
'{
  "token_filters": [
    {
      "normalizer": {
        "mode": "ICU_NORMALIZE",
        "icu_normalize_mode": "NFKC"
      }
    }
  ]
}'
```

**Description**

Normalizes text with [ICU NFKC normalization](https://en.wikipedia.org/wiki/Unicode_equivalence), which decomposes
characters by compatibility, and then recomposes the characters by
canonical equivalence.

**Example**

In the following query, NFKC normalization is applied to the results:

Adapted (not in the official docs): added the missing comma between result elements.

```sql
SELECT TEXT_ANALYZE(
  'I like ❶ ② pies, you like Ño PIEs',
  analyzer=>'LOG_ANALYZER',
  analyzer_options=>'''
  {
    "token_filters": [
      {
        "normalizer": {
          "mode": "ICU_NORMALIZE",
          "icu_normalize_mode": "NFKC"
        }
      }
    ]
  }'''
) AS results

/*---------------------------------------------------------------+
 | results                                                       |
 +---------------------------------------------------------------+
 | ['i', 'like', '❶', '2', 'pies', 'you', 'like', 'ño', 'pies' ] |
 +---------------------------------------------------------------*/
```

#### ICU normalize with NFD

Adapted (not in the official docs): wrapped the filter in `{ }` so the array holds an object.

```text
'{
  "token_filters": [
    {
      "normalizer": {
        "mode": "ICU_NORMALIZE",
        "icu_normalize_mode": "NFD"
      }
    }
  ]
}'
```

**Description**

Normalizes text with [ICU NFD normalization](https://en.wikipedia.org/wiki/Unicode_equivalence), which decomposes
characters by canonical equivalence, and then arranges multiple combining
characters in a specific order.

**Example**

In the following query, although the input and output for `ñ` look
the same, the bytes are different (input is `\u00f1`, output is
`\u006e \u0303`).

Adapted (not in the official docs): added the missing comma between result elements.

```sql
SELECT TEXT_ANALYZE(
  'I like ❶ ② pies, you like Ño PIEs',
  analyzer=>'LOG_ANALYZER',
  analyzer_options=>'''
  {
    "token_filters": [
      {
        "normalizer": {
          "mode": "ICU_NORMALIZE",
          "icu_normalize_mode": "NFD"
        }
      }
    ]
  }
  '''
) AS results

/*---------------------------------------------------------------+
 | results                                                       |
 +---------------------------------------------------------------+
 | ['i', 'like', '❶', '2', 'pies', 'you', 'like', 'ño', 'pies' ] |
 +---------------------------------------------------------------*/
```

#### ICU normalize with NFKD

Adapted (not in the official docs): wrapped the filter in `{ }` so the array holds an object.

```text
'{
  "token_filters": [
    {
      "normalizer": {
        "mode": "ICU_NORMALIZE",
        "icu_normalize_mode": "NFKD"
      }
    }
  ]
}'
```

**Description**

Normalizes text with [ICU NFKD normalization](https://en.wikipedia.org/wiki/Unicode_equivalence), which decomposes
characters by compatibility, and then arranges multiple combining
characters in a specific order.

**Example**

In the following query, although the input and output for `ñ` look
the same, the bytes are different (input is `\u00f1`, output is
`\u006e \u0303`).

Adapted (not in the official docs): added the missing comma between result elements.

```sql
SELECT TEXT_ANALYZE(
  'I like ❶ ② pies, you like Ño PIEs',
  analyzer=>'LOG_ANALYZER',
  analyzer_options=>'''
  {
    "token_filters": [
      {"normalizer": {
        "mode": "ICU_NORMALIZE",
        "icu_normalize_mode": "NFKD"
        }
      }
    ]
  }'''
) AS results

/*---------------------------------------------------------------+
 | results                                                       |
 +---------------------------------------------------------------+
 | ['i', 'like', '❶', '2', 'pies', 'you', 'like', 'ño', 'pies' ] |
 +---------------------------------------------------------------*/
```

#### Remove words

Adapted (not in the official docs): wrapped the filter in `{ }` so the array holds an object.

```text
'{
  "token_filters": [
    {
      "stop_words": array_of_stop_words
    }
  ]
}'
```

**Description**

Exclude a list of terms (tokens) from the results.

**Definitions**

- `array_of_stop_words`: A JSON array containing strings that represent terms. These terms shouldn't be included in the results. The array must have at least one element. An empty string is a valid array element.

**Example**

In the following query, the words `they` and `pie` are excluded from the
results:

Adapted (not in the official docs): added the missing closing quote.

```sql
SELECT TEXT_ANALYZE(
  'I like pie, you like-pie, they like 2 PIEs.',
  analyzer=>'LOG_ANALYZER',
  analyzer_options=>'''
  {
    "token_filters": [
      {
        "stop_words": ["they", "pie"]
      }
    ]
  }
  '''
) AS results

/*---------------------------------------------------+
 | results                                           |
 +---------------------------------------------------+
 | ['I', 'like', 'you', 'like', 'like', '2', 'PIEs' ] |
 +---------------------------------------------------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/text-analysis (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the ten `token_filters` syntax blocks (No normalization through Remove words) put a bare `"normalizer": {...}` or `"stop_words": ...` pair directly inside the JSON array. A JSON array holds values, and the Token filters syntax and every example on this page wrap each filter in `{ }`. The element is wrapped in braces.
- Corrected from the official docs: the `LOG_ANALYZER` result is `['i like pie', 'you like', 'pie', 'they like 2 pies]' ]` with the closing bracket inside the last quoted element. The quote and bracket are put in the order every other result array uses.
- Corrected from the official docs: two results contain `'like, 'pies'` with an unbalanced quote. The closing quote is added so the token is `'like'`.
- Corrected from the official docs: six results in the token-filter examples (ICU normalization modes) have no comma between `'2'` or `'②'` and `'pies'`. A comma is added. Where the row has a double space after `'like',`, one space is removed so the table border still lines up.
- Caution: the `[a-zA-Z]*` pattern example returns `['like', 'pie', 'you', ...]` without `'i'`, although `[a-zA-Z]*` matches the single letter `I`. The page explains the missing `'i'` only for the default pattern `\b\w{2,}\b`. The expected output is not stated.
- Caution: the `NFD` example result shows `'2'`, while the `NFC` example keeps `'②'`. The page describes `NFD` as canonical decomposition only, and shows `'2'` in the `NFKC` and `NFKD` results. Which output is correct is not stated.

## Related

- [Index of this directory](./README.md)

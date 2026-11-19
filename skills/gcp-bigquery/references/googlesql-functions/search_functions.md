---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions
---

# Search functions

## Signature / Usage

GoogleSQL for BigQuery supports the following search functions.

### Function list

| Name | Summary |
|---|---|
| [`SEARCH`](#search) | Checks to see whether a table or other search data contains a set of search terms. |
| [`VECTOR_SEARCH`](#vector_search) | Performs a semantic search or a hybrid search on embeddings to find similar entities. |

### `SEARCH`

```sql
SEARCH(
  data_to_search, search_query
  [, json_scope => { 'JSON_VALUES' | 'JSON_KEYS' | 'JSON_KEYS_AND_VALUES' } ]
  [, analyzer => { 'LOG_ANALYZER' | 'NO_OP_ANALYZER' | 'PATTERN_ANALYZER'} ]
  [, analyzer_options => analyzer_options_values ]
)
```

**Description**

The `SEARCH` function checks to see whether a BigQuery table or other
search data contains a set of search terms (tokens). It returns `TRUE` if all
search terms appear in the data, based on the [rules for search_query](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions#search_query_rules)
and text analysis described in the [text analyzer](../googlesql-syntax/text-analysis.md). Otherwise,
this function returns `FALSE`.

**Definitions**

- `data_to_search`: The data to search over. The value can be:

  - Any GoogleSQL data type literal
  - A list of columns
  - A table reference
  - A column of any type

  A table reference is evaluated as a `STRUCT` whose fields are the columns of
  the table. `data_to_search` can be any type, but `SEARCH` will return
  `FALSE` for all types except those listed here:
  - `ARRAY<STRING>`
  - `ARRAY<STRUCT>`
  - `JSON`
  - `STRING`
  - `STRUCT`

  You can search for string literals in columns of the preceding types.
  For additional rules, see [Search data rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions#data_to_search_rules).

- `search_query`: A `STRING` literal, or a `STRING` constant expression that represents the terms of the search query. If `search_query` is `NULL`, an error is returned. If `search_query` produces no search tokens, and the text analyzer is `LOG_ANALYZER` or `PATTERN_ANALYZER`, an error is produced.
- `json_scope`: A named argument with a `STRING` value.
  Takes one of the following values to indicate the scope of JSON data to be
  searched. It has no effect if `data_to_search` isn't a JSON value or
  doesn't contain a JSON field.

  - `'JSON_VALUES'` (default): Only the JSON values are searched. If
    `json_scope` isn't provided, this is used by default.

  - `'JSON_KEYS'`: Only the JSON keys are searched.

  - `'JSON_KEYS_AND_VALUES'`: The JSON keys and values are searched.

- `analyzer`: A named argument with a `STRING` value. Takes
  one of the following values to indicate the text analyzer to use:

  - `'LOG_ANALYZER'` (default): Breaks the input into tokens when delimiters
    are encountered and then normalizes the tokens.
    For more information, see [`LOG_ANALYZER`](../googlesql-syntax/text-analysis.md#log_analyzer-analyzer).

  - `'NO_OP_ANALYZER'`: Extracts the text as a single token, but
    doesn't apply normalization. For more information about this analyzer,
    see [`NO_OP_ANALYZER`](../googlesql-syntax/text-analysis.md#no_op_analyzer-analyzer).

  - `'PATTERN_ANALYZER'`: Breaks the input into tokens that match a
    regular expression. For more information, see
    [`PATTERN_ANALYZER` text analyzer](../googlesql-syntax/text-analysis.md#pattern_analyzer-analyzer).

- `analyzer_options`: A named argument with a JSON-formatted `STRING` value.
  Takes a list of text analysis rules. For more information,
  see [Text analyzer options](../googlesql-syntax/text-analysis.md#text-analyzer-options).

**Details**

The `SEARCH` function is designed to work with [search indexes](https://docs.cloud.google.com/bigquery/docs/search-index) to
optimize point lookups. Although the `SEARCH` function works for
tables that aren't indexed, its performance will be greatly improved with a
search index. If both the analyzer and analyzer options match the one used
to create the index, the search index will be used.

**Rules for `search_query`**

The `'NO_OP_ANALYZER'` extracts the search query as a single token without
parsing it. The following rules apply only when using the `'LOG_ANALYZER'` or
`'PATTERN_ANALYZER'`.

A search query is a set of one or more terms that are combined
using the logical operators `AND` and `OR` along with parenthesis. Any
whitespace in the search query that is not in a *phrase* or *backtick* term is
considered an (implicit) `AND`. First, a search query is broken down into
terms using logical operators and parenthesis in the search query. Then, each
term is evaluated based on whether or not it appears in the data to search. The
final outcome of the `SEARCH` function is the result of the logical expression
represented by the search query.

The following grammar is used to transform the search query into a logical
expression of terms. The grammar is defined using the
[ANTLR meta-language](https://www.antlr2.org/doc/metalang.html):

```text
query_string : expression EOF;

expression  : '(' expression  ')'
            | expression 'AND' expression
            | expression '\s' expression
            | expression 'OR' expression
            | term
            ;

term : single_term
     | phrase_term
     | backtick_term
     ;

backtick_term : '`' ( '\`' | ~[`] )+ '`';

phrase_term : '"' ( '\"' | ~["] )+ '"';

single_term : ( '\' reserved_char | ~[reserved_char] )+;
```

To evaluate each term, it is further broken down into zero or more searchable
tokens based on the text analyzer. The following section contains the rules for
how different types of terms are analyzed and evaluated.

Rules for `backtick_term` in [`search_query`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions#search_query_arg):

- If the `LOG_ANALYZER` text analyzer is used, text enclosed in backticks
  forces an exact match.

  For example, `` `Hello World` happy days `` becomes `Hello World`, `happy`,
  and `days`.
- Search terms enclosed in backticks must match exactly in `data_to_search`,
  subject to the following conditions:

  - It appears at the start of `data_to_search` or is immediately preceded
    by a delimiter.

  - It appears at the end of `data_to_search` or is immediately followed by
    a delimiter.

  For example, ``SEARCH('foo.bar', '`foo.`')`` returns `FALSE` because the
  text enclosed in the backticks `foo.` is immediately followed by the
  character `b` in the search data `foo.bar`, rather than by a delimiter or
  the end of the string. However, ``SEARCH('foo..bar', '`foo.`')`` returns
  `TRUE` because `foo.` is immediately followed by the delimiter `.` in the
  search data.
- Search terms enclosed in backticks must match case exactly, regardless of
  any normalization settings in `analyzer_options`.

  For example:

  ```sql
  -- FALSE because backticks require an exact match, including capitalization
  SELECT
    SEARCH( 'Hello-world', '`WORLD`',
      analyzer=>'LOG_ANALYZER',
      analyzer_options=>'''
      {
        "token_filters": [
          {
            "normalizer": {"mode": "LOWER"}
          }
        ]
      }'''
    ) AS results
  ```

- The backtick itself can be escaped using a backslash,
  as in `` \`foobar\` ``.

- The following are reserved words and must be enclosed
  in backticks:

  `AND`, `NOT`, `OR`, `IN`, and `NEAR`

Rules for `reserved_char` in [`search_query`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions#search_query_arg):

- Text not enclosed in backticks requires the following
  reserved characters to be escaped by a double backslash
  `\\`:

  - `[ ] < > ( ) { } | ! ' " * & ? + / : = - \ ~ ^`

  - If the quoted string is preceded by the character `r` or `R`, such as
    `r"my\+string"`, then it's treated as a raw string and only a single
    backslash is required to escape the reserved characters. For more
    information about raw strings and escape
    sequences, see [String and byte literals](../googlesql-syntax/lexical.md#literals).

Rules for `phrase_term` in [`search_query`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions#search_query_arg):

- A phrase is a type of term. If text is enclosed in double quotes and the `analyzer` is `LOG_ANALYZER`, `PATTERN_ANALYZER`, or not set (`LOG_ANALYZER` by default), the term represents a phrase.
- When a phrase is analyzed, a subset of tokens is created for that phrase. For example, from the phrase `"foo baz.bar"`, the analyzer called `LOG_ANALYZER` generates the phrase-specific tokens `foo`, `baz`, and `bar`.
- The order of terms in a phrase matters. A match is only returned if
  the tokens that were produced for the phrase are next to each other and in
  the same order as the tokens for [`data_to_search`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions#data_to_search_arg).

  For example:

  ```sql
  -- FALSE because 'foo' and 'bar' aren't next to each other in
  -- 'foo baz.bar'.
  SEARCH('foo baz.bar', '"foo bar"')
  ```

  ```sql
  -- TRUE because 'foo' and 'baz' are next to each other in
  -- 'foo baz.bar'.
  SEARCH('foo baz.bar', '"foo baz"')
  ```

- A single quote inside of the phrase is analyzed as a special character.

- An escaped double quote (double quote after a backslash) is analyzed
  as a double quote character.

**How `data_to_search` is broken into searchable tokens**

The following table shows how [`data_to_search`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions#data_to_search_arg) is broken
into searchable tokens by the `LOG_ANALYZER` text analyzer. All entries are
strings.

| data_to_search | searchable tokens |
|---|---|
| 127.0.0.1 | 127 0 1 127.0.0.1 . 127.0.0 127.0 0.0 0.0.1 0.1 |
| foobar@example.com | foobar example com foobar@example example.com foobar@example.com |
| The fox. | the fox The The fox The fox. fox fox. |

**How `search_query` is broken into query terms**

The following table shows how [`search_query`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions#search_query_arg) is broken into
query terms by the `LOG_ANALYZER` text analyzer. All entries are strings.

| search_query | query terms |
|---|---|
| 127.0.0.1 | 127 0 1 |
| \`127.0.0.1\` | 127.0.0.1 |
| foobar@example.com | foobar example com |
| \`foobar@example.com\` | foobar@example.com |

**Rules for `data_to_search`**

General rules for [`data_to_search`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions#data_to_search_arg):

- `data_to_search` must contain all tokens produced for `search_query` for the function to return `TRUE`.
- To perform a cross-field search, `data_to_search` must be a `STRUCT`, `ARRAY`, or `JSON` data type.
- Each `STRING` field in a compound data type is individually searched for terms.
- If at least one field in `data_to_search` includes all search terms
  produced by `search_query`, `SEARCH` returns `TRUE`. Otherwise it has the
  following behavior:

  - If at least one `STRING` field is `NULL`, `SEARCH` returns `NULL`.

  - Otherwise, `SEARCH` returns `FALSE`.

**Return type**

`BOOL`

**Examples**

The following queries show how tokens in `search_query` are analyzed
by a `SEARCH` function call using the default analyzer, `LOG_ANALYZER`:

```sql
SELECT
  -- ERROR: `search_query` is NULL.
  SEARCH('foobarexample', NULL) AS a,

  -- ERROR: `search_query` contains no tokens.
  SEARCH('foobarexample', '') AS b,
```

```sql
SELECT
  -- TRUE: '-' and ' ' are delimiters.
  SEARCH('foobar-example', 'foobar example') AS a,

  -- TRUE: The search query is a constant expression evaluated to 'foobar'.
  SEARCH('foobar-example', CONCAT('foo', 'bar')) AS b,

  -- FALSE: The search_query isn't split.
  SEARCH('foobar-example', 'foobarexample') AS c,

  -- TRUE: The double backslash escapes the ampersand which is a delimiter.
  SEARCH('foobar-example', 'foobar\\&example') AS d,

  -- TRUE: The single backslash escapes the ampersand in a raw string.
  SEARCH('foobar-example', R'foobar\&example')AS e,

  -- FALSE: The backticks indicate that there must be an exact match for
  -- foobar&example.
  SEARCH('foobar-example', '`foobar&example`') AS f,

  -- TRUE: An exact match is found.
  SEARCH('foobar&example', '`foobar&example`') AS g

/*-------+-------+-------+-------+-------+-------+-------+
 | a     | b     | c     | d     | e     | f     | g     |
 +-------+-------+-------+-------+-------+-------+-------+
 | true  | true  | false | true  | true  | false | true  |
 +-------+-------+-------+-------+-------+-------+-------*/
```

```sql
SELECT
  -- TRUE: The order of terms doesn't matter.
  SEARCH('foobar-example', 'example foobar') AS a,

  -- TRUE: Tokens are made lower-case.
  SEARCH('foobar-example', 'Foobar Example') AS b,

  -- TRUE: An exact match is found.
  SEARCH('foobar-example', '`foobar-example`') AS c,

  -- FALSE: Backticks preserve capitalization.
  SEARCH('foobar-example', '`Foobar`') AS d,

  -- FALSE: Backticks don't have special meaning for search_data and are
  -- not delimiters in the default LOG_ANALYZER.
  SEARCH('`foobar-example`', '`foobar-example`') AS e,

  -- TRUE: An exact match is found after the delimiter in search_data.
  SEARCH('foobar@example.com', '`example.com`') AS f,

  -- TRUE: An exact match is found between the space delimiters.
  SEARCH('a foobar-example b', '`foobar-example`') AS g;

/*-------+-------+-------+-------+-------+-------+-------+
 | a     | b     | c     | d     | e     | f     | g     |
 +-------+-------+-------+-------+-------+-------+-------+
 | true  | true  | true  | false | false | true  | true  |
 +-------+-------+-------+-------+-------+-------+-------*/
```

```sql
SELECT
  -- FALSE: No single array entry matches all search terms.
  SEARCH(['foobar', 'example'], 'foobar example') AS a,

  -- FALSE: The search query is equivalent to foobar\\=.
  SEARCH('foobar=', '`foobar\\=`') AS b,

  -- FALSE: This is equivalent to the previous example.
  SEARCH('foobar=', R'`\foobar=`') AS c,

  -- TRUE: The equals sign is a delimiter in the data and query.
  SEARCH('foobar=', 'foobar\\=') AS d,

  -- TRUE: This is equivalent to the previous example.
  SEARCH('foobar=', R'foobar\=') AS e,

  -- TRUE: An exact match is found.
  SEARCH('foobar.example', '`foobar`') AS f,

  -- FALSE: `foobar.\` isn't analyzed because of backticks; it isn't
  -- followed by a delimiter in search_data 'foobar.example'.
  SEARCH('foobar.example', '`foobar.\`') AS g,

  -- TRUE: `foobar.` isn't analyzed because of backticks; it is
  -- followed by the delimiter '.' in search_data 'foobar..example'.
  SEARCH('foobar..example', '`foobar.`') AS h;

/*-------+-------+-------+-------+-------+-------+-------+-------+
 | a     | b     | c     | d     | e     | f     | g     | h     |
 +-------+-------+-------+-------+-------+-------+-------+-------+
 | false | false | false | true  | true  | true  | false | true  |
 +-------+-------+-------+-------+-------+-------+-------+-------*/
```

The following queries show how logical expression can be used in `search_query`
to perform a `SEARCH` function call:

Adapted (not in the official docs): Renamed the last select item alias from `c` to `e`, removed the trailing comma, and closed the result comment with `*/`.

```sql
SELECT
  -- TRUE: A whitespace is an implicit AND.
  -- Both `foo` and `bar` are in `foo bar baz`.
  SEARCH(R'foo bar baz', R'foo bar') AS a,

  -- TRUE: Similar to previous case
  -- `foo` and `bar` are in `foo bar baz`.
  SEARCH(R'foo bar baz', R'foo AND bar') AS b,

  -- TRUE: Only one of `foo` or `bar` should be in `foo`.
  SEARCH(R'foo', R'foo OR bar') AS c,

  -- TRUE: `foo` and one of `bar` or `baz` should be in `foo bar`.
  SEARCH(R'foo bar', R'"foo AND (bar OR baz)"') AS d,

  -- FALSE: Neither `bar` or `baz` are in `foo`.
  SEARCH(R'foo', R'foo AND (bar OR baz)') AS e

/*-------+-------+-------+-------+-------+
 | a     | b     | c     | d     | e     |
 +-------+-------+-------+-------+-------+
 | true  | true  | true  | true  | false |
 +-------+-------+-------+-------+-------*/
```

The following queries show how phrases in `search_query` are analyzed
by a `SEARCH` function call:

Adapted (not in the official docs): Changed result column `c` from false to true to match the comment for `c`.

```sql
SELECT
  -- TRUE: The phrase `foo bar` is in `foo bar baz`.
  -- The tokens in `data_to_search` are `foo`, `bar`, and `baz`.
  -- The searchable tokens in `query_string` are `foo` and `bar`
  -- and because they appear in that exact order in `data_to_search`,
  -- the function returns TRUE.
  SEARCH(R'foo bar baz', R'"foo bar"') AS a,

  -- TRUE: Case is ignored.
  -- The tokens in `data_to_search` are `foo`, `bar`, and `baz`.
  -- The searchable tokens in `query_string` are `foo` and `bar`
  -- and because they appear in that exact order in `data_to_search`,
  -- the function return TRUE.
  SEARCH(R'Foo bar baz', R'"foo Bar"') AS b,

  -- TRUE: Both `-` and `&` are delimiters used during tokenization.
  -- The tokens in `data_to_search` are `foo`, `bar`, and `baz`.
  -- The searchable tokens in `query_string` are `foo` and `bar`
  -- and because they appear in that exact order in `data_to_search`,
  -- the function returns TRUE.
  SEARCH(R'foo-bar baz', R'"foo&bar"') AS c,

  -- FALSE: Backticks in a phrase are treated as normal characters.
  -- The tokens in `data_to_search` are `foo`, `bar`, and `baz`.
  -- The searchable tokens in `query_string` are:
  -- `foo
  -- bar`
  -- Because these searchable tokens don't appear in `data_to_search`,
  -- the function returns FALSE.
  SEARCH(R'foo bar baz', R'"`foo bar`"') AS d,

  -- FALSE: `foo bar` isn't in `foo else bar`.
  -- The tokens in `data_to_search` are `foo`, `else`, and `bar`.
  -- The searchable tokens in `query_string` are `foo` and `bar`.
  -- Even though they appear in `data_to_search`, but because they
  -- don't appear in that exact order (`foo` before `bar`),
  -- the function returns FALSE.
  SEARCH(R'foo else bar', R'"foo bar"') AS e,

  -- FALSE: `foo baz` isn't in `foo bar baz`.
  -- The `search_query` produces two terms. The first term is `bar`, which
  -- matches with the similar token in `data_to_search`. However, the second
  -- term is the phrase "foo&baz" with two tokens, `foo` and `baz`. Because
  -- `foo` and `baz` don't appear next to each other in `data_to_search`
  -- (`bar` is in between), the function returns FALSE.
  SEARCH(R'foo-bar-baz', R'bar "foo&baz"') AS f;

/*-------+-------+-------+-------+-------+-------+
 | a     | b     | c     | d     | e     | f     |
 +-------+-------+-------+-------+-------+-------+
 | true  | true  | true  | false | false | false |
 +-------+-------+-------+-------+-------+-------*/
```

```sql
SELECT
  -- FALSE: Only double quotes need to be escaped in a phrase.
  -- The tokens in `data_to_search` are `foo`, `bar`, and `baz`.
  -- The searchable tokens in `query_string` are `foo\` and `bar` and they
  -- must appear in that exact order in `data_to_search`, but don't.
  SEARCH(
    R'foo bar baz',
    R'"foo\ bar"',
    analyzer_options=>'{"delimiters": [" "]}') AS a,

  -- TRUE: `foo bar` is in `foo bar baz` after tokenization with the given
  -- delimiters.
  -- The tokens in `data_to_search` are `foo`, `bar`, and `baz`.
  -- The searchable tokens in `query_string` are `foo` and `bar` and they
  -- must appear in that exact order in `data_to_search`.
  SEARCH(
    R'foo bar baz',
    R'"foo? bar"',
    analyzer_options=>'{"delimiters": [" ", "?"]}') AS b,

  -- TRUE: `read book` is in `read book now` after `the` is ignored.
  -- The tokens in `data_to_search` are `read`, `book`, and `now`.
  -- The searchable tokens in `query_string` are `read` and `book` and they
  -- must appear in that exact order in `data_to_search`.
  SEARCH(
    'read the book now',
    R'"read the book"',
    analyzer_options => '{ "token_filters": [{"stop_words": ["the"]}] }') AS c,

  -- FALSE: `c d` isn't in `a`, `b`, `cd`, `e` or `f` after tokenization with
  -- the given pattern.
  -- The tokens in `data_to_search` are `a`, `b`, `cd`, `e` and `f`.
  -- The searchable tokens in `query_string` are `c` and `d` and they
  -- must appear in that exact order in `data_to_search`. `data_to_search`
  -- contains a `cd` token, but not a `c` or `d` token.
  SEARCH(
    R'abcdef',
    R'"c d"',
    analyzer=>'PATTERN_ANALYZER',
    analyzer_options=>'{"patterns": ["(?:cd)|[a-z]"]}') AS d,

  -- TRUE: `ant apple` is in `ant apple avocado` after tokenization with
  -- the given pattern.
  -- The tokens in `data_to_search` are `ant`, `apple`, and `avocado`.
  -- The searchable tokens in `query_string` are `ant` and `apple` and they
  -- must appear in that exact order in `data_to_search`.
  SEARCH(
    R'ant orange apple avocado',
    R'"ant apple"',
    analyzer=>'PATTERN_ANALYZER',
    analyzer_options=>'{"patterns": ["a[a-z]"]}') AS e;

/*-------+-------+-------+-------+-------+
 | a     | b     | c     | d     | e     |
 +-------+-------+-------+-------+-------+
 | false | true  | true  | false | true  |
 +-------+-------+-------+-------+-------*/
```

The following query shows examples of calls to the `SEARCH` function using the
`NO_OP_ANALYZER` text analyzer and reasons for various return values:

Adapted (not in the official docs): Changed the comment and result for `g` to FALSE because `NO_OP_ANALYZER` applies no normalization, and replaced the `;` after `AS g` with a comma so that `h` is part of the same query.

```sql
SELECT
  -- TRUE: exact match
  SEARCH('foobar', 'foobar', analyzer=>'NO_OP_ANALYZER') AS a,

  -- FALSE: Backticks aren't special characters for `NO_OP_ANALYZER`.
  SEARCH('foobar', '\`foobar\`', analyzer=>'NO_OP_ANALYZER') AS b,

  -- FALSE: The capitalization doesn't match.
  SEARCH('foobar', 'Foobar', analyzer=>'NO_OP_ANALYZER') AS c,

  -- FALSE: There are no delimiters for `NO_OP_ANALYZER`.
  SEARCH('foobar example', 'foobar', analyzer=>'NO_OP_ANALYZER') AS d,

  -- TRUE: An exact match is found.
  SEARCH('', '', analyzer=>'NO_OP_ANALYZER') AS e,

  -- FALSE: 'foo bar' and "foo bar" aren't considered an exact match.
  SEARCH( R'foo bar baz', R'"foo bar"', analyzer=>'NO_OP_ANALYZER') AS f,

  -- FALSE: The capitalization doesn't match.
  SEARCH( R'"foo bar"', R'"foo Bar"', analyzer=>'NO_OP_ANALYZER') AS g,

  -- FALSE: With NO_OP_ANALYZER the query string is analyzed as "foo OR bar"
  -- which is not an exact match with "foo".
  SEARCH( R'foo', R'foo OR bar', analyzer=>'NO_OP_ANALYZER') AS h;

/*-------+-------+-------+-------+-------+-------+-------+-------+
 | a     | b     | c     | d     | e     | f     | g     | h     |
 +-------+-------+-------+-------+-------+-------+-------+-------+
 | true  | false | false | false | true  | false | false | false |
 +-------+-------+-------+-------+-------+-------+-------+-------*/
```

Consider the following table called `meals` with columns `breakfast`, `lunch`,
and `dinner`:

```sql
/*-------------------+-------------------------+------------------+
 | breakfast         | lunch                   | dinner           |
 +-------------------+-------------------------+------------------+
 | Potato pancakes   | Toasted cheese sandwich | Beef soup        |
 | Avocado toast     | Tomato soup             | Chicken soup     |
 +-------------------+-------------------------+------------------*/
```

The following query shows how to search single columns, multiple columns, and
whole tables, using the default [`LOG_ANALYZER`](../googlesql-syntax/text-analysis.md#log_analyzer-analyzer) text analyzer
with the default analyzer options:

```sql
WITH
  meals AS (
    SELECT
      'Potato pancakes' AS breakfast,
      'Toasted cheese sandwich' AS lunch,
      'Beef soup' AS dinner
    UNION ALL
    SELECT
      'Avocado toast' AS breakfast,
      'Tomato soup' AS lunch,
      'Chicken soup' AS dinner
  )
SELECT
  SEARCH(lunch, 'soup') AS lunch_soup,
  SEARCH((breakfast, dinner), 'soup') AS breakfast_or_dinner_soup,
  SEARCH(meals, 'soup') AS anytime_soup
FROM meals;

/*------------+--------------------------+--------------+
 | lunch_soup | breakfast_or_dinner_soup | anytime_soup |
 +------------+--------------------------+--------------+
 | false      | true                     | true         |
 | true       | true                     | true         |
 +------------+--------------------------+--------------*/
```

The following query shows additional ways to search, using the
default [`LOG_ANALYZER`](../googlesql-syntax/text-analysis.md#log_analyzer-analyzer) text analyzer with
default analyzer options:

```sql
WITH data AS ( SELECT 'Please use foobar@example.com as your email.' AS email )
SELECT
  SEARCH(email, 'exam') AS a,
  SEARCH(email, 'foobar') AS b,
  SEARCH(email, 'example.com') AS c,
  SEARCH(email, R'"please use"') AS d,
  SEARCH(email, R'"as email"') AS e
FROM data;

/*-------+-------+-------+-------+-------+
 | a     | b     | c     | d     | e     |
 +-------+-------+-------+-------+-------+
 | false | true  | true  | true  | false |
 +-------+-------+-------+-------+-------*/
```

The following query shows additional ways to search, using the
default [`LOG_ANALYZER`](../googlesql-syntax/text-analysis.md#log_analyzer-analyzer) text analyzer with custom
analyzer options. Terms are only split when a space or `@` symbol is
encountered.

```sql
WITH data AS ( SELECT 'Please use foobar@example.com as your email.' AS email )
SELECT
  SEARCH(email, 'foobar', analyzer_options=>'{"delimiters": [" ", "@"]}') AS a,
  SEARCH(email, 'example', analyzer_options=>'{"delimiters": [" ", "@"]}') AS b,
  SEARCH(email, 'example.com', analyzer_options=>'{"delimiters": [" ", "@"]}') AS c,
  SEARCH(email, 'foobar@example.com', analyzer_options=>'{"delimiters": [" ", "@"]}') AS d,
  SEARCH(email, R'use "foobar example.com" "as your"', analyzer_options=>'{"delimiters": [" ", "@"]}') AS e
FROM data;

/*-------+-------+-------+-------+-------+
 | a     | b     | c     | d     | e     |
 +-------+-------+-------+-------+-------+
 | true  | false | true  | true  | true  |
 +-------+-------+-------+-------+-------*/
```

The following query shows how to search, using the
[`NO_OP_ANALYZER`](../googlesql-syntax/text-analysis.md#no_op_analyzer-analyzer) text analyzer:

```sql
WITH meals AS ( SELECT 'Tomato soup' AS lunch )
SELECT
  SEARCH(lunch, 'Tomato soup', analyzer=>'NO_OP_ANALYZER') AS a,
  SEARCH(lunch, 'soup', analyzer=>'NO_OP_ANALYZER') AS b,
  SEARCH(lunch, 'tomato soup', analyzer=>'NO_OP_ANALYZER') AS c,
  SEARCH(lunch, R'"Tomato soup"', analyzer=>'NO_OP_ANALYZER') AS d
FROM meals;

/*-------+-------+-------+-------+
 | a     | b     | c     | d     |
 +-------+-------+-------+-------+
 | true  | false | false | false |
 +-------+-------+-------+-------*/
```

The following query shows how to use the [`PATTERN_ANALYZER`](../googlesql-syntax/text-analysis.md#pattern_analyzer-analyzer)
text analyzer with default analyzer options:

```sql
WITH data AS ( SELECT 'Please use foobar@example.com as your email.' AS email )
SELECT
  SEARCH(email, 'exam', analyzer=>'PATTERN_ANALYZER') AS a,
  SEARCH(email, 'foobar', analyzer=>'PATTERN_ANALYZER') AS b,
  SEARCH(email, 'example.com', analyzer=>'PATTERN_ANALYZER') AS c,
  SEARCH(email, R'foobar "EXAMPLE.com as" email', analyzer=>'PATTERN_ANALYZER') AS d
FROM data;

/*-------+-------+-------+-------+
 | a     | b     | c     | d     |
 +-------+-------+-------+-------+
 | false | true  | true  | true  |
 +-------+-------+-------+-------*/
```

The following query shows additional ways to search, using the
[`PATTERN_ANALYZER`](../googlesql-syntax/text-analysis.md#pattern_analyzer-analyzer) text analyzer with
custom analyzer options:

Adapted (not in the official docs): Removed the nonexistent column `e` from the result table.

```sql
WITH data AS ( SELECT 'Please use foobar@EXAMPLE.com as your email.' AS email )
SELECT
  SEARCH(email, 'EXAMPLE', analyzer=>'PATTERN_ANALYZER', analyzer_options=>'{"patterns": ["[A-Z]*"]}') AS a,
  SEARCH(email, 'example', analyzer=>'PATTERN_ANALYZER', analyzer_options=>'{"patterns": ["[a-z]*"]}') AS b,
  SEARCH(email, 'example.com', analyzer=>'PATTERN_ANALYZER', analyzer_options=>'{"patterns": ["[a-z]*"]}') AS c,
  SEARCH(email, 'example.com', analyzer=>'PATTERN_ANALYZER', analyzer_options=>'{"patterns": ["[a-zA-Z.]*"]}') AS d
FROM data;

/*-------+-------+-------+-------+
 | a     | b     | c     | d     |
 +-------+-------+-------+-------+
 | true  | false | false | true  |
 +-------+-------+-------+-------*/
```

For additional examples that include analyzer options,
see the [Text analysis](../googlesql-syntax/text-analysis.md) reference guide.

For helpful analyzer recipes that you can use to enhance
analyzer-supported queries, see the
[Search with text analyzers](https://docs.cloud.google.com/bigquery/docs/text-analysis-search) user guide.

### `VECTOR_SEARCH`

Use the following syntax for batch searches, when you want to perform a vector
search for multiple rows in a table or query result:

Adapted (not in the official docs): Removed the comma before the optional argument, which already starts with a comma.

```sql
VECTOR_SEARCH(
  { TABLE base_table | (base_table_query) },
  column_to_search,
  { TABLE query_table | (query_table_query) }
  [, query_column_to_search => query_column_to_search_value]
  [, top_k => top_k_value ]
  [, distance_type => distance_type_value ]
  [, options => options_value ]
)
```

Use the following syntax (in [Preview](https://cloud.google.com/products#product-launch-stages)) for single searches, when you
want to find the vectors closest to a single embedding value. When you call the
function with this syntax, it's optimized to perform better than if you call the
batch version on a table with a single row. Using single query syntax, you can
also perform a hybrid search (in [Preview](https://cloud.google.com/products#product-launch-stages)) that combines a semantic
search with a lexical search.

> [!NOTE]
> **Note:** To give feedback or request support for this feature, contact [bq-vector-search@google.com](mailto:bq-vector-search@google.com)

Adapted (not in the official docs): Removed the comma before the optional argument, which already starts with a comma.

```sql
VECTOR_SEARCH(
  { TABLE base_table | (base_table_query) },
  column_to_search,
  query_value => single_query_value
  [, lexical_search_columns => lexical_search_columns_value]
  [, lexical_search_query_value => single_lexical_search_query_value]
  [, top_k => top_k_value ]
  [, distance_type => distance_type_value ]
  [, options => options_value ]
)
```

**Description**

The `VECTOR_SEARCH` function lets you search embeddings to find semantically
similar entities. You can also use the `VECTOR_SEARCH` function to perform a
[hybrid search](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions#hybrid-search) that combines a semantic search with a lexical
(keyword) search.

For tables with autonomous embedding generation enabled, you can simplify your
search syntax for semantic or hybrid searches by using the
[`AI.SEARCH` function](../bigqueryml-sql/ai-search.md).

Embeddings are high-dimensional numerical vectors that represent a given entity,
like a piece of text or an audio file. Machine learning (ML) models use
embeddings to encode semantics about such entities to make it easier to reason
about and compare them. For example, a common operation in clustering,
classification, and recommendation models is to measure the distance between
vectors in an [embedding space](https://en.wikipedia.org/wiki/Latent_space) to find items that are most
semantically similar.

You can also use the `VECTOR_SEARCH` function
with `ObjectRef` input. For more information, see
[Search with `ObjectRef` input](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions#objectref-search).

**Definitions**

- `base_table`: The table to search for nearest neighbor embeddings.
- `base_table_query`: A query that you can use to pre-filter the base table. Only `SELECT`, `FROM`, and `WHERE` clauses are allowed in this query. Don't apply any filters to the embedding column. You can't use [logical views](https://docs.cloud.google.com/bigquery/docs/views-intro) in this query. Using a [subquery](../googlesql-syntax/subqueries.md) might interfere with index usage or cause your query to fail. If the base table is indexed and the `WHERE` clause contains columns that are not stored in the index, then `VECTOR_SEARCH` post-filters on those columns instead. To learn more, see [Store columns and pre-filter](https://docs.cloud.google.com/bigquery/docs/vector-index#stored-columns).
- `column_to_search`: The name of the base table column
  to search for nearest neighbor embeddings. The column must be one of the
  following types:

  - `ARRAY<FLOAT64>`: All elements in the array must be non-`NULL`, and all values in the column must have the same array dimensions.
  - `STRING`: The table must have [autonomous embedding generation](https://docs.cloud.google.com/bigquery/docs/autonomous-embedding-generation) enabled on this column. Rows with missing embeddings in the base table are skipped during the search.
  - `STRUCT`: An `ObjectRef` column. An `ObjectRef` is a `STRUCT` with fixed fields that can reference unstructured data. For more information, see [Work with object references](https://docs.cloud.google.com/bigquery/docs/work-with-objectref). The table must have [autonomous embedding generation](https://docs.cloud.google.com/bigquery/docs/autonomous-embedding-generation) enabled on this column. Rows with missing embeddings in the base table are skipped during the search.

  If the column has a vector index, BigQuery attempts to use it.
  To determine if an index was used in the vector search, see
  [Vector index usage](https://docs.cloud.google.com/bigquery/docs/vector-index#vector_index_usage).
- `query_table`: The table that provides the
  embeddings, strings, or `ObjectRef`s for which to find nearest neighbors.
  All columns are passed through as output columns.

- `query_table_query`: A query that provides the
  embeddings, strings, or `ObjectRef`s for which to find nearest neighbors.
  All columns are passed through as output columns.

- `query_column_to_search`: A `STRING` value. `query_column_to_search_value`
  specifies the name of the column in the query table or statement that contains
  the strings or embeddings for which to find nearest neighbors. The column must
  be one of the following types:

  - `ARRAY<FLOAT64>`: All elements in the array must be non-`NULL`and all values in the column must have the same array dimensions as the values in the `column_to_search` column.
  - `STRING`: The `base_table` must have [autonomous embedding generation](https://docs.cloud.google.com/bigquery/docs/autonomous-embedding-generation) enabled. The string values are embedded at runtime using the same connection and endpoint specified for the base table's embedding generation. If the base table's embedding generation uses a `task_type` of `RETRIEVAL_DOCUMENT`, whether by default or explicitly specified, then `VECTOR_SEARCH` uses a `task_type` of `RETRIEVAL_QUERY` to embed the string values. Otherwise, `VECTOR_SEARCH` uses the same `task_type` configured for the base table. These embeddings are used to return query results but aren't stored anywhere. You must have the BigQuery Connection User role (`roles/bigquery.connectionUser`) on the connection that the base table uses for background embedding generation.
  - `STRUCT`: An `ObjectRef` column. An `ObjectRef` is a `STRUCT` with fixed fields that can reference unstructured data. For more information, see [Work with object references](https://docs.cloud.google.com/bigquery/docs/work-with-objectref). The `base_table` must have [autonomous embedding generation](https://docs.cloud.google.com/bigquery/docs/autonomous-embedding-generation) enabled. The `ObjectRef` values are embedded at runtime using the same connection and endpoint specified for the base table's embedding generation. These embeddings are used to return query results but aren't stored anywhere. You must have the BigQuery Connection User role (`roles/bigquery.connectionUser`) on the connection that the base table uses for background embedding generation. Rows with missing embeddings in the base table are skipped during the search.

  If you don't specify `query_column_to_search_value`, the function uses the
  `column_to_search` value or picks the most appropriate column.
- `query_value`: One of the following types:

  - `ARRAY<FLOAT64>`: The `single_query_value` is a single embedding for which to find nearest neighbors.
  - `STRING`: The `base_table` must have [autonomous embedding generation](https://docs.cloud.google.com/bigquery/docs/autonomous-embedding-generation) enabled. The `single_query_value` is embedded at runtime using the same connection and endpoint specified for the base table's embedding generation. If the base table's embedding generation uses a `task_type` of `RETRIEVAL_DOCUMENT`, whether by default or explicitly specified, then `VECTOR_SEARCH` uses a `task_type` of `RETRIEVAL_QUERY` to embed `single_query_value`. Otherwise, `VECTOR_SEARCH` uses the same `task_type` configured for the base table. The embedding is used to return query results but isn't stored anywhere. You must have the BigQuery Connection User role (`roles/bigquery.connectionUser`) on the connection that the base table uses for background embedding generation.
  - `STRUCT`: The `single_query_value` is an `ObjectRef` for which to find nearest neighbors. An `ObjectRef` is a `STRUCT` with fixed fields that can reference unstructured data. For more information, see [Work with object references](https://docs.cloud.google.com/bigquery/docs/work-with-objectref). The `base_table` must have [autonomous embedding generation](https://docs.cloud.google.com/bigquery/docs/autonomous-embedding-generation) enabled. The `single_query_value` is embedded at runtime using the same connection and endpoint specified for the base table's embedding generation. The embedding is used to return query results but isn't stored anywhere. You must have the BigQuery Connection User role (`roles/bigquery.connectionUser`) on the connection that the base table uses for background embedding generation.
- `lexical_search_columns`: An `ARRAY<STRING>` that contains a list of unique
  column names. Each specified column name should refer to a column of type
  `STRING` in the `base_table`. These columns are used in the lexical search
  portion of a [hybrid search](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions#hybrid-search).

  A non-empty list indicates the search is hybrid. `lexical_search_columns`
  can be used only when `query_value` is specified with single search. Hybrid
  search doesn't support batch queries.
- `lexical_search_query_value`: A `STRING` value that represents the query
  text for the lexical search portion of a [hybrid search](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions#hybrid-search).
  This query value is matched against all the lexical search column
  values in the `lexical_search_columns` parameter. This parameter must be
  specified when `lexical_search_columns` is used.

- `top_k`: An `INT64` value. `top_k_value` specifies the number of nearest
  neighbors to return. The default is `10`. If the value is negative, all values
  are counted as neighbors and returned.

- `distance_type`: A `STRING` value. `distance_type_value` specifies the type of
  metric to use to compute the distance between two vectors. Supported distance
  types are [`EUCLIDEAN`](https://en.wikipedia.org/wiki/Euclidean_distance), [`COSINE`](https://en.wikipedia.org/wiki/Cosine_similarity#Cosine_Distance), and
  [`DOT_PRODUCT`](https://en.wikipedia.org/wiki/Dot_product). The default is `EUCLIDEAN`.

  If you don't specify `distance_type_value` and the `column_to_search`
  column has a vector index that's used, `VECTOR_SEARCH` uses the distance
  type specified in the [`distance_type` option](../googlesql-syntax/data-definition-language-2.md#index_option_list-1) of the
  `CREATE VECTOR INDEX` statement.
- `options`: A JSON-formatted `STRING` value. `options_value` is a literal that
  specifies the following vector search options:

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
    [`num_lists` option](../googlesql-syntax/data-definition-language-2.md#index_option_list-1) in the `ivf_options` option or derived from
    the [`leaf_node_embedding_count` option](../googlesql-syntax/data-definition-language-2.md#index_option_list-1) in the
    `tree_ah_options` option of the `CREATE VECTOR INDEX` statement if
    specified. Otherwise, BigQuery calculates an appropriate number.

    You can't specify `fraction_lists_to_search` when `use_brute_force` is
    set to `true`.
  - `use_brute_force`: A JSON boolean that determines whether to use brute
    force search by skipping the vector index if one is available. For
    example, `options => '{"use_brute_force":true}'`. The
    default is `false`. If you specify `use_brute_force=false` and there is
    no usable vector index available, brute force is used anyway.

  `options` defaults to `'{}'` to denote that all underlying options use their
  corresponding default values.

**Details**

You can optionally use `VECTOR_SEARCH` with a [vector index](https://docs.cloud.google.com/bigquery/docs/vector-index). When
a vector index is used, `VECTOR_SEARCH` uses the [Approximate Nearest
Neighbor](https://en.wikipedia.org/wiki/Nearest_neighbor_search#Approximation_methods) search technique to help improve vector search performance, with
the trade-off of reducing [recall](https://developers.google.com/machine-learning/crash-course/classification/precision-and-recall#recallsearch_term_rules) and so returning more approximate
results. When a base table is large, the use of an index typically improves
performance without significantly sacrificing recall. Brute force is used to
return exact results when a vector index isn't available, and you can
choose to use brute force to get exact results even when a vector index
is available.

If the base table has autonomous embedding generation enabled, then you can
alternatively use the [`AI.SEARCH` function](../bigqueryml-sql/ai-search.md) to simplify your search
syntax.

**Hybrid search**

> [!WARNING]
> **Preview**
>
>
> This product or feature is subject to the "Pre-GA Offerings Terms"
> in the General Service Terms section of the
> [Service Specific Terms](https://cloud.google.com/terms/service-terms).
> Pre-GA products and features are available "as is" and might have
> limited support. For more information, see the
> [launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

> [!NOTE]
> **Note:** To provide feedback or request support for this feature, send an email to [bq-vector-search@google.com](mailto:bq-vector-search@google.com).

A hybrid search lets you use the `VECTOR_SEARCH` function to combine a semantic
search with a lexical (keyword) search. You can extend a
[vector index](../googlesql-syntax/data-definition-language-2.md#create-vector-index-statement)
to include keyword information to improve the speed of the lexical search
portion of a hybrid search.

The lexical portion of a hybrid search can be performed on one or more `STRING`
columns in the base table. The `lexical_search_columns` value doesn't have to
correspond to the column from which embeddings were generated. This allows
hybrid search to perform a cross-column search on the base table. Similarly, the
`lexical_search_query_value` doesn't have to correspond to `query_value`.

**Output**

For each row in the query data, the output contains multiple rows from the
base table that satisfy the search criteria. The number of results rows per
query table row is either 10 or the `top_k` value if it's specified. The
order of the output isn't guaranteed.

The output includes the following columns:

- `query`: A `STRUCT` value that contains all selected columns from the query data. This column is only included in the output if you use the batch search syntax. For single vector searches, this column is omitted.
- `base`: A `STRUCT` value that contains all columns from `base_table` or a subset of the columns from `base_table` that you selected in the `base_table_query` query.
- `distance`: A `FLOAT64` value that represents the distance between the base data and the query data for the semantic search portion of a vector search.

**Search with `ObjectRef` input**

In addition to performing `VECTOR_SEARCH` using `STRING` input,
you can also use `ObjectRef` input.

The following example shows how to use the `VECTOR_SEARCH` function to perform
semantic search on `ObjectRef`s:

```sql
SELECT *
FROM
  VECTOR_SEARCH(
    TABLE mydataset.images,
    'image_ref',
    (SELECT image_ref FROM mydataset.images_query)
);
```

**Limitations**

BigQuery data security and governance rules apply to the use of
`VECTOR_SEARCH`, which results in the following behavior:

- If the base table has [row-level security policies](https://docs.cloud.google.com/bigquery/docs/row-level-security-intro), `VECTOR_SEARCH` applies the row-level access policies to the query results.
- If the indexed column from the base table has [data masking policies](https://docs.cloud.google.com/bigquery/docs/column-data-masking-intro), `VECTOR_SEARCH` succeeds only if the user running the query has the [`Fine-Grained Reader`](https://docs.cloud.google.com/iam/docs/understanding-roles#datacatalog.categoryFineGrainedReader) role on the policy tags that are used. Otherwise, `VECTOR_SEARCH` fails with an invalid query error.
- If any base table column or any column in the query table or statement has
  [column-level security policies](https://docs.cloud.google.com/bigquery/docs/column-level-security) and you don't have appropriate
  permissions to access the column, `VECTOR_SEARCH` fails with a permission
  denied error.

- The project that runs the query containing `VECTOR_SEARCH` must match the
  project that contains the base table.

- If the base table has [autonomous embedding generation](https://docs.cloud.google.com/bigquery/docs/autonomous-embedding-generation)
  enabled and your `query_column_to_search` column is a `STRING` or `ObjectRef`
  column, then the following limitations apply:

  - If embedding generation for the query `STRING` or `ObjectRef` fails, then the entire query fails.
  - Your query is subject to the [generative AI function limits](https://docs.cloud.google.com/bigquery/quotas#generative_ai_functions).

**Examples**

The following queries create test tables `base_table` and `query_table` to use
in subsequent query examples. These tables use a fictional 2-dimensional
embedding of various animal names for readability, but a typical text embedding
uses hundreds or thousands of dimensions.

```sql
CREATE OR REPLACE TABLE mydataset.base_table
(
  id STRING,
  description STRING,
  my_embedding ARRAY<FLOAT64>
);

INSERT mydataset.base_table (id, description, my_embedding)
VALUES('dog', 'Man\'s best friend', [1.0, 2.0]),
('wolf', 'The ultimate pack hunter', [2.0, 4.0]),
('snake', 'The slithering serpent', [-2.0, 3.0]),
('lion', 'King of the jungle', [2.0, -2.5]),
('tiger', 'The striped stalker', [3.0, -2.0]),
('otter', 'The river\'s playful acrobat', [-3.0, -1.0]),
('whale', 'The ocean\'s gentle giant', [-5.0, -1.0]);
```

```sql
CREATE OR REPLACE TABLE mydataset.query_table
(
  query_id STRING,
  embedding ARRAY<FLOAT64>
);

INSERT mydataset.query_table (query_id, embedding)
VALUES('dog', [1.0, 2.0]),
('cat', [1.0, -1.0]);
```

The following example searches the `my_embedding` column of `base_table` for
the top two embeddings that match each row of data in the `embedding` column of
`query_table`:

```sql
SELECT
  query.query_id, query.embedding, base.id, base.my_embedding, distance
FROM
  VECTOR_SEARCH(
    TABLE mydataset.base_table,
    'my_embedding',
    (SELECT query_id, embedding FROM mydataset.query_table),
    'embedding',
    top_k => 2);

/*----------------+-----------------+---------+-------------------+--------------------+
 | query_id       | embedding       | id      | my_embedding      | distance           |
 +----------------+-----------------+---------+-------------------+--------------------+
 | dog            |  1.0            | dog     |  1.0              | 0.0                |
 |                |  2.0            |         |  2.0              |                    |
 +----------------+-----------------+---------+-------------------+--------------------+
 | dog            |  1.0            | wolf    |  2.0              | 2.23606797749979   |
 |                |  2.0            |         |  4.0              |                    |
 +----------------+-----------------+---------+-------------------+--------------------+
 | cat            |  1.0            | lion    |  2.0              | 1.8027756377319946 |
 |                | -1.0            |         | -2.5              |                    |
 +----------------+-----------------+---------+-------------------+--------------------+
 | cat            |  1.0            | tiger   |  3.0              | 2.23606797749979   |
 |                | -1.0            |         | -2.0              |                    |
 +----------------+-----------------+---------+-------------------+--------------------*/
```

The following example pre-filters `base_table` to rows where `id` isn't equal to
"wolf" and then searches the `my_embedding` column of `base_table` for the top
two embeddings that match each row of data in the `embedding` column of
`query_table`.

```sql
SELECT
  query.query_id, query.embedding, base.id, base.my_embedding, distance
FROM
  VECTOR_SEARCH(
    (SELECT * FROM mydataset.base_table WHERE id != 'wolf'),
    'my_embedding',
    (SELECT query_id, embedding FROM mydataset.query_table),
    'embedding',
    top_k => 2);

/*----------------+-----------------+---------+-------------------+--------------------+
 | query_id       | embedding       | id      | my_embedding      | distance           |
 +----------------+-----------------+---------+-------------------+--------------------+
 | cat            |  1.0            | lion    |  2.0              | 1.8027756377319946 |
 |                | -1.0            |         | -2.5              |                    |
 +----------------+-----------------+---------+-------------------+--------------------+
 | cat            |  1.0            | tiger   |  3.0              | 2.23606797749979   |
 |                | -1.0            |         | -2.0              |                    |
 +----------------+-----------------+---------+-------------------+--------------------+
 | dog            |  1.0            | dog     |  1.0              | 0.0                |
 |                |  2.0            |         |  2.0              |                    |
 +----------------+-----------------+---------+-------------------+--------------------+
 | dog            |  1.0            | snake   | -2.0              | 3.1622776601683795 |
 |                |  2.0            |         |  3.0              |                    |
 +----------------+-----------------+---------+-------------------+--------------------*/
```

The following example searches the `my_embedding` column of `base_table` for
the top two embeddings that match each row of data in the `embedding` column of
`query_table`, and uses the `COSINE` distance type to measure the distance
between the embeddings:

```sql
SELECT
  query.query_id, query.embedding, base.id, base.my_embedding, distance
FROM
  VECTOR_SEARCH(
    TABLE mydataset.base_table,
    'my_embedding',
    TABLE mydataset.query_table,
    'embedding',
    top_k => 2,
    distance_type => 'COSINE');

/*----------------+-----------------+---------+-------------------+-----------------------+
 | query_id       | embedding       | id      | my_embedding      | distance              |
 +----------------+-----------------+---------+-------------------+-----------------------+
 | cat            |  1.0            | lion    |  2.0              | 0.0061162653263812095 |
 |                | -1.0            |         | -2.5              |                       |
 +----------------+-----------------+---------+-------------------+-----------------------+
 | cat            |  1.0            | tiger   |  3.0              | 0.019419324309079777  |
 |                | -1.0            |         | -2.0              |                       |
 +----------------+-----------------+---------+-------------------+-----------------------+
 | dog            |  1.0            | dog     |  1.0              | 0.0                   |
 |                |  2.0            |         |  2.0              |                       |
 +----------------+-----------------+---------+-------------------+-----------------------+
 | dog            |  1.0            | wolf    |  2.0              | 0.0                   |
 |                |  2.0            |         |  4.0              |                       |
 +----------------+-----------------+---------+-------------------+-----------------------*/
```

The following example searches the `my_embedding` column of `base_table` for
the top two embeddings that match the single embedding value `[1.0, -1.0]`.
It uses the optimized syntax for single searches:

```sql
SELECT
  base.id, base.my_embedding, distance
FROM
  VECTOR_SEARCH(
    TABLE mydataset.base_table,
    'my_embedding',
    query_value => [1.0, -1.0],
    top_k => 2);

/*---------+-------------------+--------------------+
 | id      | my_embedding      | distance           |
 +---------+-------------------+--------------------+
 | lion    |  2.0              | 1.8027756377319946 |
 |         | -2.5              |                    |
 +---------+-------------------+--------------------+
 | tiger   |  3.0              | 2.23606797749979   |
 |         | -2.0              |                    |
 +---------+-------------------+--------------------*/
```

Instead of including the embedding value as a literal in your query, you can
generate it by using an embedding function such as `AI.EMBED`. The following
example shows how you could search the `my_embedding` column of `base_table` for
the top two embeddings that match the computed embedding value for
`'butterfly'`. It uses the optimized syntax for single searches:

```sql
SELECT *
FROM
  VECTOR_SEARCH(
    TABLE mydataset.base_table,
    'my_embedding',
    query_value => AI.EMBED("butterfly",
                    endpoint => 'text-embedding-005',
                    model_params => JSON '{"outputDimensionality": 2}').result,
    top_k => 2);
```

The following example shows a hybrid search query. The query combines a semantic
search of the embedded name column `my_embedding` with a keyword search of the
`description` column for `striped hunter`:

```sql
SELECT *
FROM
  VECTOR_SEARCH(
    TABLE mydataset.base_table,
    "my_embedding",
    query_value => [1.0, -1.0],
    lexical_search_columns => ["description"],
    lexical_search_query_value => "striped hunter",
    top_k => 2);

/*-----------+-------------------------+-------------------+---------------------+
 | base.id   | base.description        | base.my_embedding | distance            |
 +-----------+-------------------------+-------------------+---------------------+
 | tiger     | The striped stalker     | 3.0               | 0.967741935483871   |
 |           |                         | -2.0              |                     |
 +-----------+-------------------------+-----------------------------+-----------+
 | lion      | King of the jungle      | 2.0               | 0.96798155737704916 |
 |           |                         | -2.5              |                     |
 +-----------+-------------------------+-------------------+---------------------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: The last select item reuses the alias `c`, but the result table has columns `a` to `e`. The alias is changed to `e` and the trailing comma before the end of the query is removed. The result comment ends with `+/` instead of `*/`, which leaves the `/*` comment unterminated; it is closed with `*/`.
- Corrected from the official docs: The comment for `SEARCH(R'foo-bar baz', R'"foo&bar"') AS c` says the function returns TRUE because `-` and `&` are both delimiters, but the result row shows false. The result for `c` is changed to true.
- Corrected from the official docs: The `g` example says `"foo bar"` and `"foo Bar"` match because the analysis is case-insensitive, but this page says `NO_OP_ANALYZER` extracts a single token without normalization and an earlier example marks a capitalization mismatch as FALSE. The comment and result for `g` are changed to FALSE. The `;` after `AS g` is also changed to a comma, because `AS h` follows and the result table has an `h` column.
- Corrected from the official docs: The query selects four columns (`a` to `d`), but the result table has a fifth column `e`. The column is removed from the result table.
- Corrected from the official docs: The batch `VECTOR_SEARCH` syntax has a comma after the query table argument and another at the start of the optional `[, query_column_to_search => ...]`, which gives a doubled comma. The first comma is removed.
- Corrected from the official docs: The single-search `VECTOR_SEARCH` syntax has a comma after `query_value => single_query_value` and another at the start of the optional `[, lexical_search_columns => ...]`, which gives a doubled comma. The first comma is removed.
- Caution: The `SEARCH(R'foo bar', R'"foo AND (bar OR baz)"') AS d` example is commented as TRUE (`foo` and one of `bar` or `baz` are in `foo bar`), but the query text is wrapped in double quotes, which this page describes as a phrase search, so `AND` and `OR` would not act as operators. The official docs do not say which is intended; the example is kept as published.

## Related

- [Index of this directory](./README.md)

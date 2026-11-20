---
source: https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql
---

# Legacy SQL Syntax, Functions and Operators (part 2 of 2)

## Signature / Usage

### Regular expression functions

BigQuery provides regular expression support using the [re2](https://github.com/google/re2) library;
see that documentation for its [regular expression syntax](https://github.com/google/re2/wiki/Syntax).

Note that the regular expressions are global matches; to start matching at the beginning of the string you must use the \^ character. To match at a word boundary inside the string, use `\b`.

#### Syntax

| Regular expression functions ||
|---|---|
| [`REGEXP_MATCH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#regexp_match) | Returns true if the argument matches the regular expression. |
| [`REGEXP_EXTRACT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#regexp_extract) | Returns the portion of the argument that matches the capturing group within the regular expression. |
| [`REGEXP_REPLACE()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#regexp_replace) | Replaces a substring that matches a regular expression. |

`REGEXP_MATCH('str', 'reg_exp')`

:   Returns true if *str* matches the regular expression. For string matching without regular expressions, use [CONTAINS](#string-functions) instead of REGEXP_MATCH.

**Example:**

```sql
#legacySQL
SELECT
   word,
   COUNT(word) AS count
FROM
   [bigquery-public-data:samples.shakespeare]
WHERE
   (REGEXP_MATCH(word,r'\w\w\'\w\w'))
GROUP BY word
ORDER BY count DESC
LIMIT 3;
```

**Returns:**

```text
+-------+-------+
| word  | count |
+-------+-------+
| ne'er |    42 |
| we'll |    35 |
| We'll |    33 |
+-------+-------+
```

`REGEXP_EXTRACT('str', 'reg_exp')`

:   Returns the portion of *str* that matches the capturing group within the regular expression.

**Example:**

```sql
#legacySQL
SELECT
   REGEXP_EXTRACT(word,r'(\w\w\'\w\w)') AS fragment
FROM
   [bigquery-public-data:samples.shakespeare]
GROUP BY fragment
ORDER BY fragment
LIMIT 3;
```

**Returns:**

```text
+----------+
| fragment |
+----------+
| NULL     |
| Al'ce    |
| As'es    |
+----------+
```

`REGEXP_REPLACE('orig_str', 'reg_exp', 'replace_str')`

:   Returns a string where any substring of *orig_str* that matches *reg_exp* is replaced with *replace_str*. For example, REGEXP_REPLACE ('Hello', 'lo', 'p') returns Help.

**Example:**

```sql
#legacySQL
SELECT
  REGEXP_REPLACE(word, r'ne\'er', 'never') AS expanded_word
FROM
  [bigquery-public-data:samples.shakespeare]
WHERE
  REGEXP_MATCH(word, r'ne\'er')
GROUP BY expanded_word
ORDER BY expanded_word
LIMIT 5;
```

**Returns:**

```text
+---------------+
| expanded_word |
+---------------+
| Whenever      |
| never         |
| nevertheless  |
| whenever      |
+---------------+
```

#### Advanced examples

- **Filter result set by regular expression match**

  BigQuery's regular expression functions can be used to filter results in a `WHERE` clause, as well as to display results in the `SELECT`. The following example combines both of these regular expression use cases into a single query.

  **Example:**

  ```sql
  #legacySQL
  SELECT
    /* Replace white spaces in the title with underscores. */
    REGEXP_REPLACE(title, r'\s+', '_') AS regexp_title, revisions
  FROM
    (SELECT title, COUNT(revision_id) as revisions
    FROM
      [bigquery-public-data:samples.wikipedia]
    WHERE
      wp_namespace=0
      /* Match titles that start with 'G', end with
       * 'e', and contain at least two 'o's.
       */
      AND REGEXP_MATCH(title, r'^G.*o.*o.*e$')
    GROUP BY
      title
    ORDER BY
      revisions DESC
    LIMIT 100);
  ```
- **Using regular expressions on integer or float data**

  While BigQuery's regular expression functions only work for string data, it's possible to use the `STRING()` function to cast integer or float data into string format. In this example, `STRING()` is used to cast the integer value `corpus_date` to a string, which is then altered by `REGEXP_REPLACE`.

  **Example:**

  ```sql
  #legacySQL
  SELECT
    corpus_date,
    /* Cast the corpus_date to a string value  */
    REGEXP_REPLACE(STRING(corpus_date),
      '^16',
      'Written in the sixteen hundreds, in the year \''
      ) AS date_string
  FROM [bigquery-public-data:samples.shakespeare]
  /* Cast the corpus_date to string, */
  /* match values that begin with '16' */
  WHERE
    REGEXP_MATCH(STRING(corpus_date), '^16')
  GROUP BY
    corpus_date, date_string
  ORDER BY
    date_string DESC
  LIMIT 5;
  ```

### String functions

String functions operate on string data. String constants must be enclosed
with single or double quotes. String functions are case-sensitive by default.
You can append `IGNORE CASE` to the end of a query to enable case-
insensitive matching. `IGNORE CASE` works only on ASCII characters
and only at the top level of the query.

Wildcards are not supported in these functions; for regular expression
functionality, use [regular expression
functions](#regular-expression-functions).

#### Syntax

| String functions ||
|---|---|
| [`CONCAT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#concat) | Returns the concatenation of two or more strings, or NULL if any of the values are NULL. |
| [`expr CONTAINS 'str'`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#contains) | Returns `true` if `expr` contains the specified string argument. |
| [`INSTR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#instr) | Returns the one-based index of the first occurrence of a string. |
| [`LEFT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#left) | Returns the leftmost characters of a string. |
| [`LENGTH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#length) | Returns the length of the string. |
| [`LOWER()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#lower) | Returns the original string with all characters in lower case. |
| [`LPAD()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#lpad) | Inserts characters to the left of a string. |
| [`LTRIM()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#ltrim) | Removes characters from the left side of a string. |
| [`REPLACE()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#replace) | Replaces all occurrences of a substring. |
| [`RIGHT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#right) | Returns the rightmost characters of a string. |
| [`RPAD()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#rpad) | Inserts characters to the right side of a string. |
| [`RTRIM()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#rtrim) | Removes trailing characters from the right side of a string. |
| [`SPLIT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#split) | Splits a string into repeated substrings. |
| [`SUBSTR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#substr) | Returns a substring ... |
| [`UPPER()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#upper) | Returns the original string with all characters in upper case. |

`CONCAT('str1', 'str2', '...')
str1 + str2 + ...`
:   Returns the concatenation of two or more strings, or NULL if any of the values are NULL. **Example:** if `str1` is `Java` and `str2` is `Script`, `CONCAT` returns `JavaScript`.

`expr CONTAINS 'str'`
:   Returns `true` if `expr` contains the specified string argument. This is a case-sensitive comparison.

`INSTR('str1', 'str2')`
:   Returns the one-based index of the first occurrence of *str2* in *str1* , or returns 0 if *str2* does not occur in *str1*.

`LEFT('str', numeric_expr)`
:   Returns the leftmost *numeric_expr* characters of `str`. If the number is longer than *str* , the full string will be returned. **Example:** `LEFT('seattle', 3)` returns `sea`.

`LENGTH('str')`
:   Returns a numerical value for the length of the string. **Example:** if `str` is `'123456'`, `LENGTH` returns `6`.

`LOWER('str')`
:   Returns the original string with all characters in lower case.

`LPAD('str1', numeric_expr, 'str2')`
:   Pads `str1` on the left with `str2`, repeating `str2` until the result string is exactly `numeric_expr` characters. **Example:** `LPAD('1', 7, '?')` returns `??????1`.

`LTRIM('str1' [, str2])`

:   Removes characters from the left side of *str1* . If *str2* is omitted, `LTRIM` removes spaces from the left side of *str1* . Otherwise, `LTRIM` removes any characters in *str2* from the left side of *str1* (case-sensitive).

**Examples:**

`SELECT LTRIM("Say hello", "yaS")` returns `" hello"`.

`SELECT LTRIM("Say hello", " ySa")` returns `"hello"`.

`REPLACE('str1', 'str2', 'str3')`

:   Replaces all instances of *str2* within *str1* with *str3*.

`RIGHT('str', numeric_expr)`
:   Returns the rightmost *numeric_expr* characters of `str`. If the number is longer than the string, it will return the whole string. **Example:** `RIGHT('kirkland', 4)` returns `land`.

`RPAD('str1', numeric_expr, 'str2')`
:   Pads `str1` on the right with `str2`, repeating `str2` until the result string is exactly `numeric_expr` characters. **Example:** `RPAD('1', 7, '?')` returns `1??????`.

`RTRIM('str1' [, str2])`

:   Removes trailing characters from the right side of *str1* . If *str2* is omitted, `RTRIM` removes trailing spaces from *str1* . Otherwise, `RTRIM` removes any characters in *str2* from the right side of *str1* (case-sensitive).

**Examples:**

`SELECT RTRIM("Say hello", "leo")` returns `"Say h"`.

`SELECT RTRIM("Say hello ", " hloe")` returns `"Say"`.

`SPLIT('str' [, 'delimiter'])`
:   Splits a string into repeated substrings. If `delimiter` is specified, the `SPLIT` function breaks `str` into substrings, using `delimiter` as the delimiter.

`SUBSTR('str', index [, max_len])`
:   Returns a substring of `str`, starting at `index`. If the optional `max_len` parameter is used, the returned string is a maximum of `max_len` characters long. Counting starts at 1, so the first character in the string is in position 1 (not zero). If `index` is `5`, the substring begins with the 5th character from the left in `str`. If `index` is `-4`, the substring begins with the 4th character from the right in `str`. **Example:** `SUBSTR('awesome', -4, 4)` returns the substring `some`.

`UPPER('str')`
:   Returns the original string with all characters in upper case.
**Escaping special characters in strings**

To escape special characters, use one of the following methods:

- Use`'\xDD'` notation, where `'\x'` is followed by the two-digit hex representation of the character.
- Use an escaping slash in front of slashes, single quotes, and double quotes.
- Use C-style sequences (`'\a', '\b', '\f', '\n', '\r', '\t',` and `'\v'`) for other characters.

Some examples of escaping:

```text
'this is a space: \x20'
'this string has \'single quote\' inside it'
'first line \n second line'
"double quotes are also ok"
'\070' -> ERROR: octal escaping is not supported
```

### Table wildcard functions

Table wildcard functions are a convenient way to query data from a specific
set of tables. A table wildcard function is equivalent to a comma-separated
union of all the tables matched by the wildcard function. When you use a table
wildcard function, BigQuery only accesses and charges you for tables that match
the wildcard. Table wildcard functions are specified in the query's [FROM clause](https://docs.cloud.google.com/bigquery/query-reference#from).

If you use table wildcard functions in a query, the functions no longer need
to be contained in parentheses. For example, some of the following examples use
parentheses, whereas others don't.

Cached results are not supported for queries against multiple tables
using a wildcard function (even if the **Use Cached Results** option is checked).
If you run the same wildcard query multiple times, you are billed for each query.

#### Syntax

| Table wildcard functions ||
|---|---|
| [`TABLE_DATE_RANGE()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#table-date-range) | Queries multiple daily tables that span a date range. |
| [`TABLE_DATE_RANGE_STRICT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#table-date-range-strict) | Queries multiple daily tables that span a date range, with no missing dates. |
| [`TABLE_QUERY()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#table-query) | Queries tables whose names match a specified predicate. |

`TABLE_DATE_RANGE(prefix, timestamp1, timestamp2)`

:   Queries daily tables that overlap with the time range between `\<timestamp1\>` and `\<timestamp2\>`.

Table names must have the following format: `\<prefix\>\<day\>`, where `\<day\>` is in the format `YYYYMMDD`.

You can use [date and time functions](https://docs.cloud.google.com/bigquery/query-reference#datetimefunctions) to generate the timestamp parameters. For example:

- `TIMESTAMP('2012-10-01 02:03:04')`
- `DATE_ADD(CURRENT_TIMESTAMP(), -7, 'DAY')`

**Example: get tables between two days**

This example assumes the following tables exist:

- mydata.people20140325
- mydata.people20140326
- mydata.people20140327

```sql
#legacySQL
SELECT
  name
FROM
  TABLE_DATE_RANGE([myproject-1234:mydata.people],
                    TIMESTAMP('2014-03-25'),
                    TIMESTAMP('2014-03-27'))
WHERE
  age >= 35
```

Matches the following tables:

- mydata.people20140325
- mydata.people20140326
- mydata.people20140327

**Example: get tables in a two-day range up to "now"**

This example assumes the following tables exist in a project named `myproject-1234`:

- mydata.people20140323
- mydata.people20140324
- mydata.people20140325

```sql
#legacySQL
SELECT
  name
FROM
  (TABLE_DATE_RANGE([myproject-1234:mydata.people],
                    DATE_ADD(CURRENT_TIMESTAMP(), -2, 'DAY'),
                    CURRENT_TIMESTAMP()))
WHERE
  age >= 35
```

Matches the following tables:

- mydata.people20140323
- mydata.people20140324
- mydata.people20140325

`TABLE_DATE_RANGE_STRICT(prefix, timestamp1, timestamp2)`

:   This function is equivalent to `TABLE_DATE_RANGE`. The only difference is that if any daily table is missing in the sequence, `TABLE_DATE_RANGE_STRICT` fails and returns a `Not Found: Table \<table_name\>` error.

**Example: error on missing table**

This example assumes the following tables exist:

- people20140325
- people20140327

```sql
#legacySQL
SELECT
  name
FROM
  (TABLE_DATE_RANGE_STRICT([myproject-1234:mydata.people],
                    TIMESTAMP('2014-03-25'),
                    TIMESTAMP('2014-03-27')))
WHERE age >= 35
```

The above example returns an error "Not Found" for the table "people20140326".

`TABLE_QUERY(dataset, expr)`

:   Queries tables whose names match the supplied `expr`. The `expr` parameter must be represented as a string and must contain an expression to evaluate. For example, `'length(table_id) < 3'`.

**Example: match tables whose names contain "oo" and have a length of at least 4**

This example assumes the following tables exist:

- mydata.boo
- mydata.fork
- mydata.ooze
- mydata.spoon

```sql
#legacySQL
SELECT
  speed
FROM (TABLE_QUERY([myproject-1234:mydata],
                  'table_id CONTAINS "oo" AND length(table_id) >= 4'))
```

Matches the following tables:

- mydata.ooze
- mydata.spoon

**Example: match tables whose names start with "boo", followed by an optional lowercase letter and 3-5 numeric digits at the end**

This example assumes the following tables exist in a project named `myproject-1234`:

- mydata.book4
- mydata.book418
- mydata.boom12345
- mydata.boom123456789
- mydata.taboo999

Adapted (not in the official docs): changed the regular expression so that it matches the listed tables.

```sql
#legacySQL
SELECT
  speed
FROM
  TABLE_QUERY([myproject-1234:mydata],
               'REGEXP_MATCH(table_id, r"^boo[a-z]?[\d]{3,5}$")')
```

Matches the following tables:

- mydata.book418
- mydata.boom12345

### URL functions

#### Syntax

| URL functions ||
|---|---|
| [`HOST()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#host) | Given a URL, returns the hostname as a string. |
| [`DOMAIN()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#domain) | Given a URL, returns the domain as a string. |
| [`TLD()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#tld) | Given a URL, returns the top-level domain plus any country domain in the URL. |

`HOST('url_str')`
:   Given a URL, returns the host name as a string. **Example:**
HOST('http://www.google.com:80/index.html') returns 'www.google.com'

`DOMAIN('url_str')`
:   Given a URL, returns the domain as a string. **Example:**
DOMAIN('http://www.google.com:80/index.html') returns 'google.com'.

`TLD('url_str')`
:   Given a URL, returns the top level domain plus any country domain in the URL.
**Example:** TLD('http://www.google.com:80/index.html') returns '.com'.
TLD('http://www.google.co.uk:80/index.html') returns '.co.uk'.

Notes:

- These functions don't perform reverse DNS lookup, so if you call these functions using an IP address the functions will return segments of the IP address rather than segments of the host name.
- All of the URL parsing functions expect lower-case characters. Upper-case characters in the URL will result in a NULL or otherwise incorrect result. Consider passing input to this function through LOWER() if your data has mixed casing.

#### Advanced example

**Parse domain names from URL data**

This query uses the
[`DOMAIN()`](https://developers.google.com/bigquery/docs/query-reference#urlfunctions)
function to return the most popular domains listed as repository homepages on GitHub. Note the
use of HAVING to filter records using the result of the `DOMAIN()` function. This
is a useful function to determine referrer information from URL data.

**Examples:**

```sql
#legacySQL
SELECT
  DOMAIN(repository_homepage) AS user_domain,
  COUNT(*) AS activity_count
FROM
  [bigquery-public-data:samples.github_timeline]
GROUP BY
  user_domain
HAVING
  user_domain IS NOT NULL AND user_domain != ''
ORDER BY
  activity_count DESC
LIMIT 5;
```

**Returns:**

```text
+-----------------+----------------+
|   user_domain   | activity_count |
+-----------------+----------------+
| github.com      |         281879 |
| google.com      |          34769 |
| khanacademy.org |          17316 |
| sourceforge.net |          15103 |
| mozilla.org     |          14091 |
+-----------------+----------------+
```

To look specifically at TLD information, use the `TLD()` function. This
example displays the top TLDs that are not in a list of common examples.

Adapted (not in the official docs): the second comment is changed to say that TLDs in the list are excluded.

```sql
#legacySQL
SELECT
  TLD(repository_homepage) AS user_tld,
  COUNT(*) AS activity_count
FROM
  [bigquery-public-data:samples.github_timeline]
GROUP BY
  user_tld
HAVING
  /* Only consider TLDs that are NOT NULL */
  /* or not in our list of common TLDs */
  user_tld IS NOT NULL AND NOT user_tld
  IN ('','.com','.net','.org','.info','.edu')
ORDER BY
  activity_count DESC
LIMIT 5;
```

**Returns:**

```text
+----------+----------------+
| user_tld | activity_count |
+----------+----------------+
| .de      |          22934 |
| .io      |          17528 |
| .me      |          13652 |
| .fr      |          12895 |
| .co.uk   |           9135 |
+----------+----------------+
```

### Window functions

Window functions, also known as analytic functions, enable calculations on a
specific subset, or "window", of a result set. Window functions make it
easier to create reports that include complex analytics such as trailing
averages and running totals.

Each window function requires an `OVER` clause that specifies
the window top and bottom. The three components of the `OVER`
clause (partitioning, ordering, and framing) provide additional control
over the window. Partitioning enables you to divide the input data into
logical groups that have a common characteristic. Ordering enables you
to order the results within a partition. Framing enables
you to create a sliding window frame within a partition that moves
relative to the current row. You can configure the size of the moving window frame
based on a number of rows or a range of values, such as a time interval.

The results shown for the `CUME_DIST`, `LEAD`, `NTILE`, `PERCENT_RANK` and
`RATIO_TO_REPORT` examples below are computed over the 5 rows shown only (for
example, the `RATIO_TO_REPORT` values add up to 1 over those rows). `LIMIT 5`
limits the rows in the result, not the rows in the window, and more rows match the
`WHERE` clause (the `LAST_VALUE` example returns `imperfectly`, which is not among
the 5 rows), so these queries return different values when you run them.

```sql
#legacySQL
SELECT <window_function>
  OVER (
      [PARTITION BY <expr>]
      [ORDER BY <expr> [ASC | DESC]]
      [<window-frame-clause>]
     )
```

`PARTITION BY`
:   Defines the base partition over which this function operates.
Specify one or more comma-separated column names; one partition will be
created for each distinct set of values for these columns, similar
to a `GROUP BY` clause. If `PARTITION BY` is omitted,
the base partition is all rows in the input to the window function.
:   The `PARTITION BY` clause also allows window functions to
partition data and parallelize execution. If you wish to use a window
function with `allowLargeResults`, or if you intend to apply
further joins or aggregations to the output of your window function,
use `PARTITION BY` to parallelize execution.
:   `JOIN EACH` and `GROUP EACH BY` clauses can't
be used on the output of window functions. To generate
[large query results](https://docs.cloud.google.com/bigquery/docs/writing-results#large-results)
when using window functions, you must use `PARTITION BY`.

`ORDER BY`
:   Sorts the partition. If `ORDER BY` is absent, there is no guarantee of
any default sorting order. Sorting occurs at the partition level, before
any window frame clause is applied. If you specify a `RANGE` window,
you should add an `ORDER BY` clause. Default order is `ASC`.
:   `ORDER BY` is optional in some cases, but certain window functions,
such as [rank()](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#rank) or [dense_rank()](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#dense_rank),
require the clause.
:   If you use `ORDER BY` without specifying `ROWS`
or `RANGE`, `ORDER BY` implies that the window
extends from the beginning of the partition to the current row. In the
absence of an `ORDER BY` clause, the window is the entire partition.

`<window-frame-clause>`
:

```text
{ROWS | RANGE} {BETWEEN <start> AND <end> | <start> | <end>}
```

:   A subset of the partition over which to operate. This can be the same
size as the partition or smaller. If you use `ORDER BY` without
a `window-frame-clause`, the default window frame
is `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. If you
omit both `ORDER BY` and the `window-frame-clause`,
the default window frame is the entire partition.

- `ROWS` - Defines a window in terms of row position, relative to the current row. For example, to add a column showing the sum of the preceding 5 rows of salary values, you would query `SUM(salary) OVER
  (ROWS BETWEEN 5 PRECEDING AND CURRENT ROW)`. The set of rows typically includes the current row, but that is not required.
- `RANGE` - Defines a window in terms of a range of values in a given column, relative to that column's value in the current row. Only operates on numbers and dates, where date values are simple integers (microseconds since the epoch). Neighboring rows with the same value are called *peer* rows. Peer rows of the `CURRENT ROW` are included in a window frame that specifies `CURRENT ROW`. For example, if you specify the window end to be `CURRENT ROW` and the following row in the window has the same value, it will be included in the function calculation.
- `BETWEEN <start> AND <end>` - A range, inclusive of the start and end rows. The range need not include the current row, but `<start>` must precede or equal `<end>`.
- `<start>` - Specifies the start offset for this window, relative to the current row. The following options are supported:

  ```text
  {UNBOUNDED PRECEDING | CURRENT ROW | <expr> PRECEDING | <expr> FOLLOWING}
  ```
  where `<expr>` is a positive integer, `PRECEDING` indicates a preceding row number or range value, and `FOLLOWING` indicates a following row number or range value. `UNBOUNDED PRECEDING` means the first row of the partition. If the start precedes the window, it will be set to the first row of the partition.
- `<end>` - Specifies the end offset for this window, relative to the current row. The following options are supported:

  ```text
  {UNBOUNDED FOLLOWING | CURRENT ROW | <expr> PRECEDING | <expr> FOLLOWING}
  ```
  where `<expr>` is a positive integer, `PRECEDING` indicates a preceding row number or range value, and `FOLLOWING` indicates a following row number or range value. `UNBOUNDED FOLLOWING` means the last row of the partition. If end is beyond the end of the window, it will be set to the last row of the partition.

Unlike aggregation functions, which collapse many input rows into one
output row, window functions return one row of output for each row of input.
This feature makes it easier to create queries that calculate running totals
and moving averages. For example, the following query returns a running total
for a small dataset of five rows defined by `SELECT` statements:

```sql
#legacySQL
SELECT name, value, SUM(value) OVER (ORDER BY value) AS RunningTotal
FROM
  (SELECT "a" AS name, 0 AS value),
  (SELECT "b" AS name, 1 AS value),
  (SELECT "c" AS name, 2 AS value),
  (SELECT "d" AS name, 3 AS value),
  (SELECT "e" AS name, 4 AS value);
```

Return value:

```text
+------+-------+--------------+
| name | value | RunningTotal |
+------+-------+--------------+
| a    |     0 |            0 |
| b    |     1 |            1 |
| c    |     2 |            3 |
| d    |     3 |            6 |
| e    |     4 |           10 |
+------+-------+--------------+
```

The following example calculates a moving average of the values in the
current row and the row preceding it. The window frame comprises two rows
that move with the current row.

```sql
#legacySQL
SELECT
  name,
  value,
  AVG(value)
    OVER (ORDER BY value
          ROWS BETWEEN 1 PRECEDING AND CURRENT ROW)
    AS MovingAverage
FROM
  (SELECT "a" AS name, 0 AS value),
  (SELECT "b" AS name, 1 AS value),
  (SELECT "c" AS name, 2 AS value),
  (SELECT "d" AS name, 3 AS value),
  (SELECT "e" AS name, 4 AS value);
```

Return value:

```text
+------+-------+---------------+
| name | value | MovingAverage |
+------+-------+---------------+
| a    |     0 |           0.0 |
| b    |     1 |           0.5 |
| c    |     2 |           1.5 |
| d    |     3 |           2.5 |
| e    |     4 |           3.5 |
+------+-------+---------------+
```

#### Syntax

| Window functions ||
|---|---|
| [`AVG()` `COUNT(*)` `COUNT([DISTINCT])` `MAX()` `MIN()` `STDDEV()` `SUM()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#analytics) | The same operation as the corresponding [Aggregate functions](legacy-sql-1.md#aggregate-functions), but are computed over a window defined by the OVER clause. |
| [`CUME_DIST()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#cume_dist) | Returns a double that indicates the cumulative distribution of a value in a group of values ... |
| [`DENSE_RANK()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#dense_rank) | Returns the integer rank of a value in a group of values. |
| [`FIRST_VALUE()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#first_value) | Returns the first value of the specified field in the window. |
| [`LAG()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#lag) | Enables you to read data from a previous row within a window. |
| [`LAST_VALUE()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#last_value) | Returns the last value of the specified field in the window. |
| [`LEAD()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#lead) | Enables you to read data from a following row within a window. |
| [`NTH_VALUE()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#nthvalue) | Returns the value of `\<expr\>` at position `\<n\>` of the window frame ... |
| [`NTILE()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#ntile) | Divides the window into the specified number of buckets. |
| [`PERCENT_RANK()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#percent_rank) | Returns the rank of the current row, relative to the other rows in the partition. |
| [`PERCENTILE_CONT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#percentile_cont) | Returns an interpolated value that would map to the percentile argument with respect to the window ... |
| [`PERCENTILE_DISC()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#percentile_disc) | Returns the value nearest the percentile of the argument over the window. |
| [`RANK()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#rank) | Returns the integer rank of a value in a group of values. |
| [`RATIO_TO_REPORT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#ratio-to-report) | Returns the ratio of each value to the sum of the values. |
| [`ROW_NUMBER()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#row-number) | Returns the current row number of the query result over the window. |

`AVG(numeric_expr)`  

`COUNT(*)`  

`COUNT([DISTINCT] field)`  

`MAX(field)`  

`MIN(field)`  

`STDDEV(numeric_expr)`  

`SUM(field)`  

:
These window functions perform the same operation as the corresponding
[Aggregate functions](legacy-sql-1.md#aggregate-functions), but are computed
over a window defined by the OVER clause.

Another significant difference is that the
`COUNT([DISTINCT] field)` function
produces exact results when used as a window function, with behavior
similar to the `EXACT_COUNT_DISTINCT()` aggregate function.

In the example query, the `ORDER BY` clause causes
the window to be computed from the start of the partition to
the current row, which generates a cumulative sum for that year.

```sql
#legacySQL
SELECT
   corpus_date,
   corpus,
   word_count,
   SUM(word_count) OVER (
     PARTITION BY corpus_date
     ORDER BY word_count) annual_total
FROM
   [bigquery-public-data:samples.shakespeare]
WHERE
   word='love'
ORDER BY
   corpus_date, word_count

```

**Returns:**

| corpus_date | corpus | word_count | annual_total |
|---|---|---|---|
| 0 | various | 37 | 37 |
| 0 | sonnets | 157 | 194 |
| 1590 | 2kinghenryvi | 18 | 18 |
| 1590 | 1kinghenryvi | 24 | 42 |
| 1590 | 3kinghenryvi | 40 | 82 |

`CUME_DIST()`

:   Returns a double that indicates the cumulative distribution of a value
in a group of values, calculated using the formula `\<number
of rows preceding or tied with the current row\> / \<total
rows\>`. Tied values return the same cumulative distribution
value.

This window function requires `ORDER BY` in the `OVER` clause.

```sql
#legacySQL
SELECT
   word,
   word_count,
   CUME_DIST() OVER (PARTITION BY corpus ORDER BY word_count DESC) cume_dist,
FROM
   [bigquery-public-data:samples.shakespeare]
WHERE
   corpus='othello' and length(word) > 10
LIMIT 5
```

**Returns:**

| word | word_count | cume_dist |
|---|---|---|
| handkerchief | 29 | 0.2 |
| satisfaction | 5 | 0.4 |
| displeasure | 4 | 0.8 |
| instruments | 4 | 0.8 |
| circumstance | 3 | 1.0 |

`DENSE_RANK()`

:   Returns the integer rank of a value in a group of values. The rank is calculated based on
comparisons with other values in the group.

Tied values display as the same rank. The rank of the next value is incremented by 1. For
example, if two values tie for rank 2, the next ranked value is 3. If you prefer a gap in the
ranking list, use [rank()](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#rank).

This window function requires `ORDER BY` in the `OVER` clause.

```sql
#legacySQL
SELECT
   word,
   word_count,
   DENSE_RANK() OVER (PARTITION BY corpus ORDER BY word_count DESC) dense_rank,
FROM
   [bigquery-public-data:samples.shakespeare]
WHERE
   corpus='othello' and length(word) > 10
LIMIT 5
```
**Returns:**

| word | word_count | dense_rank |
|---|---|---|
| handkerchief | 29 | 1 |
| satisfaction | 5 | 2 |
| displeasure | 4 | 3 |
| instruments | 4 | 3 |
| circumstance | 3 | 4 |

`FIRST_VALUE(\<field_name\>)`

:   Returns the first value of `\<field_name\>` in the window.

Adapted (not in the official docs): added an outer `ORDER BY word_count DESC`, so that `LIMIT 1` returns a fixed row.

```sql
#legacySQL
SELECT
   word,
   word_count,
   FIRST_VALUE(word) OVER (PARTITION BY corpus ORDER BY word_count DESC) fv,
FROM
   [bigquery-public-data:samples.shakespeare]
WHERE
   corpus='othello' and length(word) > 10
ORDER BY
   word_count DESC
LIMIT 1
```
**Returns:**

| word | word_count | fv |
|---|---|---|
| handkerchief | 29 | handkerchief |

`LAG(\<expr\>[, \<offset\>[, \<default_value\>]])`

:   Enables you to read data from a previous row within a window.
Specifically, `LAG()`
returns the value of `\<expr\>` for the row
located `\<offset\>` rows before the current row.
If the row doesn't exist, `\<default_value\>`
returns.

```sql
#legacySQL
SELECT
   word,
   word_count,
   LAG(word, 1) OVER (PARTITION BY corpus ORDER BY word_count DESC) lag,
FROM
   [bigquery-public-data:samples.shakespeare]
WHERE
   corpus='othello' and length(word) > 10
LIMIT 5
```

**Returns:**

| word | word_count | lag |
|---|---|---|
| handkerchief | 29 | null |
| satisfaction | 5 | handkerchief |
| displeasure | 4 | satisfaction |
| instruments | 4 | displeasure |
| circumstance | 3 | instruments |

`LAST_VALUE(\<field_name\>)`

:   Returns the last value of `\<field_name\>` in the window.

```sql
#legacySQL
SELECT
   word,
   word_count,
   LAST_VALUE(word) OVER (PARTITION BY corpus ORDER BY word_count DESC) lv,
FROM
   [bigquery-public-data:samples.shakespeare]
WHERE
   corpus='othello' and length(word) > 10
LIMIT 1
```

**Returns:**

| word | word_count | lv |
|---|---|---|
| imperfectly | 1 | imperfectly |

`LEAD(\<expr\>[, \<offset\>[, \<default_value\>]])`

:   Enables you to read data from a following row within a window.
Specifically, `LEAD()`
returns the value of `\<expr\>` for the row
located `\<offset\>` rows after the current row.
If the row doesn't exist, `\<default_value\>`
returns.

```sql
#legacySQL
SELECT
   word,
   word_count,
   LEAD(word, 1) OVER (PARTITION BY corpus ORDER BY word_count DESC) lead,
FROM
   [bigquery-public-data:samples.shakespeare]
WHERE
   corpus='othello' and length(word) > 10
LIMIT 5
```
**Returns:**

| word | word_count | lead |
|---|---|---|
| handkerchief | 29 | satisfaction |
| satisfaction | 5 | displeasure |
| displeasure | 4 | instruments |
| instruments | 4 | circumstance |
| circumstance | 3 | null |

`NTH_VALUE(\<expr\>, \<n\>)`

:   Returns the value of `\<expr\>` at position
`\<n\>` of the window frame, where
`\<n\>` is a one-based index.

`NTILE(\<num_buckets\>)`

:   Divides a sequence of rows into
`\<num_buckets\>` buckets and assigns a
corresponding bucket number, as an integer, with each row. The
`ntile()` function assigns the bucket numbers as equally as
possible and returns a value from 1 to
`\<num_buckets\>` for each row.

```sql
#legacySQL
SELECT
   word,
   word_count,
   NTILE(2) OVER (PARTITION BY corpus ORDER BY word_count DESC) ntile,
FROM
   [bigquery-public-data:samples.shakespeare]
WHERE
   corpus='othello' and length(word) > 10
LIMIT 5
```
**Returns:**

| word | word_count | ntile |
|---|---|---|
| handkerchief | 29 | 1 |
| satisfaction | 5 | 1 |
| displeasure | 4 | 1 |
| instruments | 4 | 2 |
| circumstance | 3 | 2 |

`PERCENT_RANK()`

:   Returns the rank of the current row, relative to the other rows in the
partition. Returned values range between 0 and 1, inclusively. The first
value returned is 0.0.

This window function requires `ORDER
BY` in the `OVER` clause.

```sql
#legacySQL
SELECT
   word,
   word_count,
   PERCENT_RANK() OVER (PARTITION BY corpus ORDER BY word_count DESC) p_rank,
FROM
   [bigquery-public-data:samples.shakespeare]
WHERE
   corpus='othello' and length(word) > 10
LIMIT 5
```
**Returns:**

| word | word_count | p_rank |
|---|---|---|
| handkerchief | 29 | 0.0 |
| satisfaction | 5 | 0.25 |
| displeasure | 4 | 0.5 |
| instruments | 4 | 0.5 |
| circumstance | 3 | 1.0 |

`PERCENTILE_CONT(\<percentile\>)`

:   Returns an interpolated value that would map to the percentile argument with respect to
the window, after ordering them per the `ORDER BY` clause.

`\<percentile\>` must be between 0 and 1.

This window function requires `ORDER BY` in the `OVER` clause.

```sql
#legacySQL
SELECT
   word,
   word_count,
   PERCENTILE_CONT(0.5) OVER (PARTITION BY corpus ORDER BY word_count DESC) p_cont,
FROM
   [bigquery-public-data:samples.shakespeare]
WHERE
   corpus='othello' and length(word) > 10
LIMIT 5
```
**Returns:**

| word | word_count | p_cont |
|---|---|---|
| handkerchief | 29 | 4 |
| satisfaction | 5 | 4 |
| displeasure | 4 | 4 |
| instruments | 4 | 4 |
| circumstance | 3 | 4 |

`PERCENTILE_DISC(\<percentile\>)`

:   Returns the value nearest the percentile of the argument over the window.

`\<percentile\>` must be between 0 and 1.

This window function requires `ORDER BY` in the `OVER` clause.

```sql
#legacySQL
SELECT
   word,
   word_count,
   PERCENTILE_DISC(0.5) OVER (PARTITION BY corpus ORDER BY word_count DESC) p_disc,
FROM
   [bigquery-public-data:samples.shakespeare]
WHERE
   corpus='othello' and length(word) > 10
LIMIT 5
```
**Returns:**

| word | word_count | p_disc |
|---|---|---|
| handkerchief | 29 | 4 |
| satisfaction | 5 | 4 |
| displeasure | 4 | 4 |
| instruments | 4 | 4 |
| circumstance | 3 | 4 |

`RANK()`

:   Returns the integer rank of a value in a group of values. The rank is calculated based on
comparisons with other values in the group.

Tied values display as the same rank. The rank of the next value is incremented according
to how many tied values occurred before it. For example, if two values tie for rank 2, the
next ranked value is 4, not 3. If you prefer no gaps in the ranking list, use
[dense_rank()](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#dense_rank).

This window function requires `ORDER BY` in the `OVER` clause.

```sql
#legacySQL
SELECT
   word,
   word_count,
   RANK() OVER (PARTITION BY corpus ORDER BY word_count DESC) rank,
FROM
   [bigquery-public-data:samples.shakespeare]
WHERE
   corpus='othello' and length(word) > 10
LIMIT 5
```
**Returns:**

| word | word_count | rank |
|---|---|---|
| handkerchief | 29 | 1 |
| satisfaction | 5 | 2 |
| displeasure | 4 | 3 |
| instruments | 4 | 3 |
| circumstance | 3 | 5 |

`RATIO_TO_REPORT(\<column\>)`

:   Returns the ratio of each value to the sum of the values, as a double between 0 and 1.

```sql
#legacySQL
SELECT
   word,
   word_count,
   RATIO_TO_REPORT(word_count) OVER (PARTITION BY corpus ORDER BY word_count DESC) r_to_r,
FROM
   [bigquery-public-data:samples.shakespeare]
WHERE
   corpus='othello' and length(word) > 10
LIMIT 5
```
**Returns:**

| word | word_count | r_to_r |
|---|---|---|
| handkerchief | 29 | 0.6444444444444445 |
| satisfaction | 5 | 0.1111111111111111 |
| displeasure | 4 | 0.08888888888888889 |
| instruments | 4 | 0.08888888888888889 |
| circumstance | 3 | 0.06666666666666667 |

`ROW_NUMBER()`

:   Returns the current row number of the query result over the window, starting with 1.

```sql
#legacySQL
SELECT
   word,
   word_count,
   ROW_NUMBER() OVER (PARTITION BY corpus ORDER BY word_count DESC) row_num,
FROM
   [bigquery-public-data:samples.shakespeare]
WHERE
   corpus='othello' and length(word) > 10
LIMIT 5
```
**Returns:**

| word | word_count | row_num |
|---|---|---|
| handkerchief | 29 | 1 |
| satisfaction | 5 | 2 |
| displeasure | 4 | 3 |
| instruments | 4 | 4 |
| circumstance | 3 | 5 |

### Other functions

#### Syntax

| Other functions ||
|---|---|
| [`CASE WHEN ... THEN`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#case_when) | Use CASE to choose among two or more alternate expressions in your query. |
| [`CURRENT_USER()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#current_user) | Returns the email address of the user running the query. |
| [`EVERY()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#every) | Returns true if the argument is true for all of its inputs. |
| [`FROM_BASE64()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#from-base64) | Converts the base-64 encoded input string into BYTES format. |
| [`HASH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#hash) | Computes and returns a 64-bit signed hash value ... |
| [`FARM_FINGERPRINT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#farm_fingerprint) | Computes and returns a 64-bit signed fingerprint value ... |
| [`IF()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#if) | If first argument is true, returns second argument; otherwise returns third argument. |
| [`POSITION()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#position) | Returns the one-based, sequential position of the argument. |
| [`SHA1()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#sha1) | Returns a [SHA1](https://www.w3.org/PICS/DSig/SHA1_1_0.html) hash, in BYTES format. |
| [`SOME()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#some) | Returns true if argument is true for at least one of its inputs. |
| [`TO_BASE64()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#to-base64) | Converts the BYTES argument to a base-64 encoded string. |

`CASE WHEN when_expr1 THEN then_expr1

WHEN when_expr2 THEN then_expr2 ...

ELSE else_expr END`
:   Use CASE to choose among two or more alternate expressions in your query. WHEN
expressions must be boolean, and all the expressions in THEN clauses and ELSE clause must be
compatible types.

`CURRENT_USER()`
:   Returns the email address of the user running the query.

`EVERY(\<condition\>)`
:   Returns `true` if `condition` is true for all of
its inputs. When used with the `OMIT IF` clause, this function is useful for queries
that involve repeated fields.

`FROM_BASE64(\<str\>)`
:   Converts the base64-encoded input string `str`
into [BYTES](https://docs.cloud.google.com/bigquery/data-types#bytes-type) format.
To convert BYTES to a base64-encoded string, use [TO_BASE64()](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#to-base64).

`HASH(expr)`
:   Computes and returns a 64-bit signed hash value of the bytes of `expr` as
defined by the [CityHash](https://github.com/google/cityhash)
library (version 1.0.3). Any string or integer expression is supported and the function
respects `IGNORE CASE` for strings, returning case invariant values.

`FARM_FINGERPRINT(expr)`
:   Computes and returns a 64-bit signed fingerprint value of the `STRING` or
`BYTES` input using the
`Fingerprint64` function from the
[open-source FarmHash library](https://github.com/google/farmhash). The output of
this function for a particular input will never change and matches the output of the
[`FARM_FINGERPRINT`](https://cloud.google.com/bigquery/docs/reference/standard-sql/hash_functions#farm_fingerprint)
function when using
[GoogleSQL](https://cloud.google.com/bigquery/docs/reference/standard-sql/).
Respects `IGNORE CASE` for strings, returning case invariant values.

`IF(condition, true_return, false_return)`
:   Returns either `true_return` or `false_return`,
depending on whether `condition` is true or false. The return values can
be literals or field-derived values, but they must be the same data type. Field-derived values
do not need to be included in the `SELECT` clause.

`POSITION(field)`
:   Returns the one-based, sequential position of *field* within a set of repeated
fields.

`SHA1(\<str\>)`
:   Returns a [SHA1](https://www.w3.org/PICS/DSig/SHA1_1_0.html) hash, in BYTES format, of the input string `str`.
You can convert the result to base64 using TO_BASE64(). For example:

```sql
#legacySQL
SELECT
  TO_BASE64(SHA1(corpus))
FROM
  [bigquery-public-data:samples.shakespeare]
LIMIT
  100;
```

`SOME(\<condition\>)`
:   Returns `true` if `condition` is true for at
least one of its inputs. When used with the `OMIT IF` clause, this function is
useful for queries that involve repeated fields.

`TO_BASE64(\<bin_data\>)`
:   Converts the [BYTES](https://docs.cloud.google.com/bigquery/data-types#bytes-type) input
`bin_data` to a base64-encoded string. For example:

```sql
#legacySQL
SELECT
  TO_BASE64(SHA1(title))
FROM
  [bigquery-public-data:samples.wikipedia]
LIMIT
  100;
```

To convert a base64-encoded string to BYTES, use [FROM_BASE64()](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#from-base64).

#### Advanced examples

- **Bucketing results into categories using conditionals**

  The following query uses a `CASE/WHEN` block to bucket results into "region"
  categories based on a list of states. If the state does not appear as an option in one of the
  `WHEN` statements, the state value will default to "None."

  **Example:**

  ```sql
  #legacySQL
  SELECT
    CASE
      WHEN state IN ('WA', 'OR', 'CA', 'AK', 'HI', 'ID',
                     'MT', 'WY', 'NV', 'UT', 'CO', 'AZ', 'NM')
        THEN 'West'
      WHEN state IN ('OK', 'TX', 'AR', 'LA', 'TN', 'MS', 'AL',
                     'KY', 'GA', 'FL', 'SC', 'NC', 'VA', 'WV',
                     'MD', 'DC', 'DE')
        THEN 'South'
      WHEN state IN ('ND', 'SD', 'NE', 'KS', 'MN', 'IA',
                     'MO', 'WI', 'IL', 'IN', 'MI', 'OH')
        THEN 'Midwest'
      WHEN state IN ('NY', 'PA', 'NJ', 'CT',
                     'RI', 'MA', 'VT', 'NH', 'ME')
        THEN 'Northeast'
      ELSE 'None'
    END as region,
    average_mother_age,
    average_father_age,
    state, year
  FROM
    (SELECT
       year, state,
       SUM(mother_age)/COUNT(mother_age) as average_mother_age,
       SUM(father_age)/COUNT(father_age) as average_father_age
     FROM
       [bigquery-public-data:samples.natality]
     WHERE
       father_age < 99
     GROUP BY
       year, state)
  ORDER BY
    year
  LIMIT 5;
  ```

  **Returns:**

  ```text
  +--------+--------------------+--------------------+-------+------+
  | region | average_mother_age | average_father_age | state | year |
  +--------+--------------------+--------------------+-------+------+
  | South  | 24.342600163532296 | 27.683769419460344 | AR    | 1969 |
  | West   | 25.185041908446163 | 28.268214055448098 | AK    | 1969 |
  | West   | 24.780776677578217 | 27.831181063905248 | CA    | 1969 |
  | West   | 25.005834769924412 | 27.942978384829598 | AZ    | 1969 |
  | South  | 24.541730952905738 | 27.686430093306885 | AL    | 1969 |
  +--------+--------------------+--------------------+-------+------+
  ```
- **Simulating a Pivot Table**

  Use conditional statements to organize the results of a subselect query into rows and
  columns. In the example below, results from a search for most revised Wikipedia articles that
  start with the value 'Google' are organized into columns where the revision counts are
  displayed if they meet various criteria.

  **Example:**

  ```sql
  #legacySQL
  SELECT
    page_title,
    /* Populate these columns as True or False, */
    /*  depending on the condition */
    IF (page_title CONTAINS 'search',
        INTEGER(total), 0) AS search,
    IF (page_title CONTAINS 'Earth' OR
        page_title CONTAINS 'Maps', INTEGER(total), 0) AS geo,
  FROM
    /* Subselect to return top revised Wikipedia articles */
    /* containing 'Google', followed by additional text. */
    (SELECT
      TOP (title, 5) as page_title,
      COUNT (*) as total
     FROM
       [bigquery-public-data:samples.wikipedia]
     WHERE
       REGEXP_MATCH (title, r'^Google.+') AND wp_namespace = 0
    );
  ```

  **Returns:**

  ```text
  +---------------+--------+------+
  |  page_title   | search | geo  |
  +---------------+--------+------+
  | Google search |   4261 |    0 |
  | Google Earth  |      0 | 3874 |
  | Google Chrome |      0 |    0 |
  | Google Maps   |      0 | 2617 |
  | Google bomb   |      0 |    0 |
  +---------------+--------+------+
  ```
- **Using HASH to select a random sample of your data**

  Some queries can provide a useful result using random subsampling of
  the result set. To retrieve a random sampling of values, use the
  `HASH` function to return results in which the modulo "n" of
  the hash equals zero.

  For example, the following query will find the `HASH()` of
  the "title" value, and then checks if that value modulo "2" is zero. This
  should result in about 50% of the values being labeled as "sampled." To
  sample fewer values, increase the value of the modulo operation from "2"
  to something larger. The query uses the `ABS` function in
  combination with `HASH`, because `HASH` can return
  negative values, and the [modulo
  operator](legacy-sql-1.md#arithmetic-operators) on a negative value yields a negative value.

  **Example:**

  Adapted (not in the official docs): the comparison is changed from `== 1` to `== 0`, so the query tests that the modulo is zero.

  ```sql
  #legacySQL
  SELECT
    title,
    HASH(title) AS hash_value,
    IF(ABS(HASH(title)) % 2 == 0, 'True', 'False')
      AS included_in_sample
  FROM
    [bigquery-public-data:samples.wikipedia]
  WHERE
    wp_namespace = 0
  LIMIT 5;
  ```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page (level-6 headings become bold lines); definition-list bodies are un-indented by four spaces so that they are not read as code; the `:` markers of the twin are kept (GitHub Markdown has no definition lists); the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders; 2 code blocks whose twin text is damaged (links expanded into URLs, `<...>` dropped, table borders shortened) are matched to the rendered page by position and similarity, and the text is taken from the page; and inline code that the twin replaces with its link URL ([`DOMAIN()`](https://developers.google.com/bigquery/docs/query-reference#urlfunctions)) is restored from the link text of the rendered page. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- The official page is split into 2 files at section boundaries; this is part 2.
- Corrected from the official docs: the table-wildcard example heading says names "have a length greater than 4", but the query uses `length(table_id) >= 4` and the result lists `mydata.ooze`, whose name has length 4. The heading is changed to "a length of at least 4".
- Corrected from the official docs: the `HAVING` clause has the comments "Only consider TLDs that are NOT NULL" and "or in our list of common TLDs", but the condition `user_tld IS NOT NULL AND NOT user_tld IN (...)` excludes the listed TLDs, as the text above the query says ("TLDs that are not in a list of common examples"). The comment is changed to "or not in our list of common TLDs".
- Corrected from the official docs: the text says the query checks whether the hash modulo `2` is zero ("the modulo n of the hash equals zero"), but the query tests `ABS(HASH(title)) % 2 == 1`. The comparison is changed to `== 0` to match the text.
- Corrected from the official docs: the `TABLE_QUERY` example that matches table names starting with `boo` followed by 3 to 5 digits uses `^boo[\d]{3,5}`, which needs the digits right after `boo`, so it matches none of the listed tables (`book418` and `boom12345` have a letter after `boo`), and without `$` it also matches a name with more digits by its prefix. The expression is changed to `^boo[a-z]?[\d]{3,5}$`, which matches `book418` and `boom12345` and not `book4`, `boom123456789` or `taboo999`.
- Corrected from the official docs: the `FIRST_VALUE` example orders the window by `word_count DESC`, so `fv` is the word with the largest `word_count` in the partition, but the shown result has `imperfectly` (`word_count` 1) as `fv`; the query also uses `LIMIT 1` without an outer `ORDER BY`, so the returned row is not fixed. The query now orders the output by `word_count DESC`, and the result row is changed to `handkerchief`, `29`, `handkerchief`, the first row of the `DENSE_RANK` example with the same data and filter on this page.
- Corrected from the official docs: the heading of the `TABLE_QUERY` example said that the names start with `boo` followed by 3-5 numeric digits. It is changed to match the corrected expression `^boo[a-z]?[\d]{3,5}$`: an optional lowercase letter after `boo`, and 3-5 digits at the end of the name.
- Corrected from the official docs: the text said that the `^` character starts matching at the beginning of a word. In the RE2 syntax linked above, `^` matches at the beginning of the text (or of a line with the `m` flag), so `^foo` does not match the `foo` in `bar foo`, and `\b` matches at an ASCII word boundary. The sentence now says the beginning of the string and adds `\b` for a word boundary.
- Caution: the results shown for the `CUME_DIST`, `LEAD`, `NTILE`, `PERCENT_RANK` and `RATIO_TO_REPORT` examples are computed over the 5 rows shown only: the `RATIO_TO_REPORT` values add up to 1 over them, and `LEAD` returns `null` for the fifth row. The same `WHERE` clause also matches `imperfectly`, which the `LAST_VALUE` example returns and which is not among the 5 rows, so the window covers more rows than the `LIMIT 5` output. A sentence that says so is added before the examples; the queries and results are kept as in the official docs, because the rows that a 5-row input would contain are not known.

## Related

- [Index of this directory](./README.md)
- [Legacy SQL Syntax, Functions and Operators (part 1 of 2)](./legacy-sql-1.md)

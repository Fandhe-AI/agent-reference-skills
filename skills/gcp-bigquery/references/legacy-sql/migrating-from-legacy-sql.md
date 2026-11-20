---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/migrating-from-legacy-sql
---

<!-- markdownlint-disable MD037 -->

# Migrating to GoogleSQL

## Signature / Usage

BigQuery supports two SQL dialects:
[GoogleSQL](https://docs.cloud.google.com/bigquery/docs/introduction-sql) and
[legacy SQL](legacy-sql-1.md). This document explains the
differences between the two dialects, including [syntax](#syntax-differences),
[functions](#function-comparison), and [semantics](#semantic-differences),
and gives examples of some of the
[highlights of GoogleSQL](#googlesql-highlights).

### Comparison of legacy and GoogleSQL

When initially released, BigQuery ran queries using a
non-GoogleSQL dialect known as [BigQuery
SQL](legacy-sql-1.md). With the launch of
BigQuery 2.0, BigQuery released support for
[GoogleSQL](https://docs.cloud.google.com/bigquery/docs/introduction-sql), and
renamed BigQuery SQL to legacy SQL. GoogleSQL is the
preferred SQL dialect for querying data stored in BigQuery.

#### Do I have to migrate to GoogleSQL?

We recommend migrating from legacy SQL to GoogleSQL, but it's not
required for existing queries that use legacy SQL in some cases. For more
information, see [Legacy SQL feature availability](https://docs.cloud.google.com/bigquery/docs/legacy-sql-feature-availability).

#### Enabling GoogleSQL

You have a choice of whether to use legacy or GoogleSQL when you run a
query. For information about switching between SQL dialects, see
[BigQuery SQL dialects](https://docs.cloud.google.com/bigquery/docs/introduction-sql#bigquery-sql-dialects).

#### Advantages of GoogleSQL

GoogleSQL complies with the SQL 2011 standard, and has extensions that
support querying nested and repeated data. It has several advantages over legacy
SQL, including:

- Composability using [`WITH` clauses](#composability-using-with-clauses) and [SQL functions](#composability-using-sql-functions)
- [Subqueries in the `SELECT` list and `WHERE` clause](#subqueries-in-more-places)
- [Correlated subqueries](#correlated-subqueries)
- [`ARRAY` and `STRUCT` data types](#arrays-and-structs)
- [Inserts, updates, and deletes](https://docs.cloud.google.com/bigquery/docs/data-manipulation-language)
- `COUNT(DISTINCT <expr>)` is exact and scalable, providing the accuracy of `EXACT_COUNT_DISTINCT` without its limitations
- Automatic predicate push-down through `JOIN`s
- Complex `JOIN` predicates, including arbitrary expressions

For examples that demonstrate some of these features, see
[GoogleSQL highlights](#googlesql-highlights).

### GoogleSQL highlights

This section discusses some of the highlights of GoogleSQL compared to
legacy SQL.

#### Composability using `WITH` clauses

Some of the GoogleSQL examples on this page make use of a
[`WITH` clause](../googlesql-syntax/query-syntax-3.md#with-clause),
which enables extraction or reuse of named subqueries. For example:

```sql
#GoogleSQL
WITH T AS (
  SELECT x FROM UNNEST([1, 2, 3, 4]) AS x
)
SELECT x / (SELECT SUM(x) FROM T) AS weighted_x
FROM T;
```

This query defines a named subquery `T` that contains `x` values of 1, 2, 3,
and 4. It selects `x` values from `T` and divides them by the sum of all `x`
values in `T`. This query is equivalent to a query where the contents of `T`
are inline:

```sql
#GoogleSQL
SELECT
  x / (SELECT SUM(x)
       FROM (SELECT x FROM UNNEST([1, 2, 3, 4]) AS x)) AS weighted_x
FROM (SELECT x FROM UNNEST([1, 2, 3, 4]) AS x);
```

As another example, consider this query, which uses multiple named subqueries:

```sql
#GoogleSQL
WITH T AS (
  SELECT x FROM UNNEST([1, 2, 3, 4]) AS x
),
TPlusOne AS (
  SELECT x + 1 AS y
  FROM T
),
TPlusOneTimesTwo AS (
  SELECT y * 2 AS z
  FROM TPlusOne
)
SELECT z
FROM TPlusOneTimesTwo;
```

This query defines a sequence of transformations of the original data, followed
by a `SELECT` statement over `TPlusOneTimesTwo`. This query is equivalent to the
following query, which inlines the computations:

```sql
#GoogleSQL
SELECT (x + 1) * 2 AS z
FROM (SELECT x FROM UNNEST([1, 2, 3, 4]) AS x);
```

For more information, see
[`WITH` clause](../googlesql-syntax/query-syntax-3.md#with-clause).

#### Composability using SQL functions

GoogleSQL supports
[user-defined SQL functions](https://docs.cloud.google.com/bigquery/docs/user-defined-functions#sql-udf-structure).
You can use user-defined SQL functions to define common expressions and then
reference them from the query. For example:

```sql
#GoogleSQL
-- Computes the harmonic mean of the elements in 'arr'.
-- The harmonic mean of x_1, x_2, ..., x_n can be expressed as:
--   n / ((1 / x_1) + (1 / x_2) + ... + (1 / x_n))
CREATE TEMPORARY FUNCTION HarmonicMean(arr ARRAY<FLOAT64>) AS
(
  ARRAY_LENGTH(arr) / (SELECT SUM(1 / x) FROM UNNEST(arr) AS x)
);

WITH T AS (
  SELECT GENERATE_ARRAY(1.0, x * 4, x) AS arr
  FROM UNNEST([1, 2, 3, 4, 5]) AS x
)
SELECT arr, HarmonicMean(arr) AS h_mean
FROM T;
```

This query defines a SQL function named `HarmonicMean` and then applies it to
the array column `arr` from `T`.

#### Subqueries in more places

GoogleSQL supports subqueries in the `SELECT` list, `WHERE` clause, and
anywhere else in the query that expects an expression. For example, consider the
following GoogleSQL query that computes the fraction of warm days in Seattle
in 2015:

```sql
#GoogleSQL
WITH SeattleWeather AS (
  SELECT *
  FROM `bigquery-public-data.noaa_gsod.gsod2015`
  WHERE stn = '994014'
)
SELECT
  COUNTIF(max >= 70) /
    (SELECT COUNT(*) FROM SeattleWeather) AS warm_days_fraction
FROM SeattleWeather;
```

The Seattle weather station has an ID of `'994014'`. The query computes the
number of warm days based on those where the temperature reached 70 degrees
Fahrenheit, or approximately 21 degrees Celsius, divided by the total number of
recorded days for that station in 2015.

#### Correlated subqueries

In GoogleSQL, subqueries can reference correlated columns; that is, columns
that originate from the outer query. For example, consider the following
GoogleSQL query:

```sql
#GoogleSQL
WITH WashingtonStations AS (
  SELECT weather.stn AS station_id, ANY_VALUE(station.name) AS name
  FROM `bigquery-public-data.noaa_gsod.stations` AS station
  INNER JOIN `bigquery-public-data.noaa_gsod.gsod2015` AS weather
  ON station.usaf = weather.stn
  WHERE station.state = 'WA' AND station.usaf != '999999'
  GROUP BY station_id
)
SELECT washington_stations.name,
  (SELECT COUNT(*)
   FROM `bigquery-public-data.noaa_gsod.gsod2015` AS weather
   WHERE washington_stations.station_id = weather.stn
   AND max >= 70) AS warm_days
FROM WashingtonStations AS washington_stations
ORDER BY warm_days DESC;
```

This query computes the names of weather stations in Washington state and the
number of days in 2015 that the temperature reached 70 degrees Fahrenheit, or
approximately 21 degrees Celsius. Notice that there is a subquery in the
`SELECT` list, and that the subquery references `washington_stations.station_id`
from the outer scope, namely `FROM WashingtonStations AS washington_stations`.

#### Arrays and structs

`ARRAY` and `STRUCT` are powerful concepts in GoogleSQL. As an example that
uses both, consider the following query, which computes the top two articles
for each day in the HackerNews dataset:

```sql
#GoogleSQL
WITH TitlesAndScores AS (
  SELECT
    ARRAY_AGG(STRUCT(title, score)) AS titles,
    EXTRACT(DATE FROM time_ts) AS date
  FROM `bigquery-public-data.hacker_news.stories`
  WHERE score IS NOT NULL AND title IS NOT NULL
  GROUP BY date)
SELECT date,
  ARRAY(SELECT AS STRUCT title, score
        FROM UNNEST(titles)
        ORDER BY score DESC
        LIMIT 2)
  AS top_articles
FROM TitlesAndScores
ORDER BY date DESC;
```

The `WITH` clause defines `TitlesAndScores`, which contains two columns. The
first is an array of structs, where one field is an article title and the second
is a score. The `ARRAY_AGG` expression returns an array of these structs for
each day.

The `SELECT` statement following the `WITH` clause uses an `ARRAY` subquery to
sort and return the top two articles within each array in accordance with the
`score`, then returns the results in descending order by date.

For more information about arrays and `ARRAY` subqueries, see
[Working with arrays](https://docs.cloud.google.com/bigquery/docs/arrays). See also the
references for [arrays](../googlesql-syntax/data-types.md#array-type)
and [structs](../googlesql-syntax/data-types.md#struct-type).

### Data type differences

Legacy SQL types have an equivalent in GoogleSQL. In
some cases, the type has a different name. The following table lists each legacy
SQL data type and its GoogleSQL equivalent.

| Legacy SQL | GoogleSQL | Notes |
|---|---|---|
| `BOOLEAN` | `BOOLEAN` |   |
| `INTEGER` | `INT64` |   |
| `FLOAT` | `FLOAT64` |   |
| `NUMERIC` | `NUMERIC` | Legacy SQL has limited support for `NUMERIC` |
| `BIGNUMERIC` | `BIGNUMERIC` | Legacy SQL has limited support for `BIGNUMERIC` |
| `STRING` | `STRING` |   |
| `BYTES` | `BYTES` |   |
| `RECORD` | `STRUCT` |   |
| `REPEATED` | `ARRAY` |   |
| `TIMESTAMP` | `TIMESTAMP` | See [`TIMESTAMP` differences](#timestamp-type-differences) |
| `DATE` | `DATE` | Legacy SQL has limited support for `DATE` |
| `TIME` | `TIME` | Legacy SQL has limited support for `TIME` |
| `DATETIME` | `DATETIME` | Legacy SQL has limited support for `DATETIME` |

For more information see:

- [GoogleSQL data types reference](../googlesql-syntax/data-types.md)
- [Legacy SQL data types reference](https://docs.cloud.google.com/bigquery/docs/data-types)

#### `TIMESTAMP` type differences

GoogleSQL has a
[stricter range of valid `TIMESTAMP` values](../googlesql-syntax/data-types.md#timestamp-type)
than legacy SQL does. In GoogleSQL, valid `TIMESTAMP` values are in the
range of `0001-01-01 00:00:00.000000` to `9999-12-31 23:59:59.999999`. For
example, you can select the minimum and maximum `TIMESTAMP` values using
GoogleSQL:

```sql
#GoogleSQL
SELECT
  min_timestamp,
  max_timestamp,
  UNIX_MICROS(min_timestamp) AS min_unix_micros,
  UNIX_MICROS(max_timestamp) AS max_unix_micros
FROM (
  SELECT
    TIMESTAMP '0001-01-01 00:00:00.000000' AS min_timestamp,
    TIMESTAMP '9999-12-31 23:59:59.999999' AS max_timestamp
);
```

This query returns `-62135596800000000` as `min_unix_micros` and
`253402300799999999` as `max_unix_micros`.

If you select a column that contains timestamp values outside of this
range, you receive an error:

```sql
#GoogleSQL
SELECT timestamp_column_with_invalid_values
FROM MyTableWithInvalidTimestamps;
```

This query returns the following error:

```sql
Cannot return an invalid timestamp value of -8446744073709551617
microseconds relative to the Unix epoch. The range of valid
timestamp values is [0001-01-1 00:00:00, 9999-12-31 23:59:59.999999]
```

To correct the error, one option is to define and use a
[user-defined function](https://docs.cloud.google.com/bigquery/docs/user-defined-functions)
to filter the invalid timestamps:

```sql
#GoogleSQL
CREATE TEMP FUNCTION TimestampIsValid(t TIMESTAMP) AS (
  t >= TIMESTAMP('0001-01-01 00:00:00') AND
  t <= TIMESTAMP('9999-12-31 23:59:59.999999')
);

SELECT timestamp_column_with_invalid_values
FROM MyTableWithInvalidTimestamps
WHERE TimestampIsValid(timestamp_column_with_invalid_values);
```

Another option to correct the error is to use the
[`SAFE_CAST`](../googlesql-functions/conversion_functions.md#safe_cast)
function with the timestamp column. For example:

```sql
#GoogleSQL
SELECT SAFE_CAST(timestamp_column_with_invalid_values AS STRING) AS timestamp_string
FROM MyTableWithInvalidTimestamps;
```

This query returns `NULL` rather than a timestamp string for invalid
timestamp values.

#### Automatic data type coercions

Both legacy and GoogleSQL support coercions (automatic conversions) between
certain data types. For example, BigQuery coerces a value of type `INT64` to
`FLOAT64` if the query passes it to a function that requires `FLOAT64` as input.

The following legacy SQL coercions are not supported in GoogleSQL and need to be explicitly cast to the correct type:

| Coercion | Translation |
|---|---|
| `BOOLEAN` to `INT64` or `FLOAT64` | Use `SAFE_CAST(bool AS INT64)` or `SAFE_CAST(SAFE_CAST(bool AS INT64) AS FLOAT64)` |
| `INT64` to `TIMESTAMP` | Use `TIMESTAMP_MICROS(micros_value)` |
| `STRING` to `BYTES` | Use `SAFE_CAST(str AS BYTES)` |
| `STRING` to `INT64`, `FLOAT64`, or `BOOL` | Use `SAFE_CAST(str AS INT64)`, `SAFE_CAST(str AS FLOAT64)`, or `SAFE_CAST(str AS BOOL)` |
| `STRING` to `TIMESTAMP` | Supported by GoogleSQL for `STRING` literals and `STRING` query parameters. For other `STRING` expressions, such as columns, use `TIMESTAMP(str)` or `SAFE_CAST(str AS TIMESTAMP)` |

For example, the following legacy SQL query uses implicit coercions:

```sql
#legacySQL
SELECT
  1 + true as boolean_int_coercion,
  TIMESTAMP(1234567890) as integer_timestamp_coercion;
```

In GoogleSQL, this query is invalid. To achieve the same result, you must use explicit casting:

```sql
#GoogleSQL
SELECT
  1 + SAFE_CAST(true AS INT64) as boolean_coercion,
  TIMESTAMP_MICROS(1234567890) as integer_timestamp_coercion;
```

### Syntax differences

While GoogleSQL and legacy SQL syntaxes are similar, there are some crucial differences.

#### Escaping reserved keywords and invalid identifiers

In legacy SQL, you escape reserved keywords and identifiers that contain
invalid characters such as a space or hyphen `-` using square brackets `[]`.
In GoogleSQL, you escape such keywords and identifiers using backticks
`` ` ``. For example:

```sql
#GoogleSQL
SELECT
  word,
  SUM(word_count) AS word_count
FROM
  `bigquery-public-data.samples.shakespeare`
WHERE word IN ('me', 'I', 'you')
GROUP BY word;
```

Legacy SQL allows reserved keywords in some places that GoogleSQL does not.
For example, the following query fails due to a `Syntax error` using standard
SQL:

```sql
#GoogleSQL
SELECT
  COUNT(*) AS rows
FROM
  `bigquery-public-data.samples.shakespeare`;
```

To fix the error, escape the alias `rows` using backticks:

```sql
#GoogleSQL
SELECT
  COUNT(*) AS `rows`
FROM
  `bigquery-public-data.samples.shakespeare`;
```

The following is a list of keywords allowed in legacy SQL, but not in GoogleSQL:

|---|---|---|---|
| - `ALL` - `AND` - `ANY` - `ARRAY` - `ASSERT_ROWS_MODIFIED` - `AT` - `COLLATE` - `CURRENT` - `DEFAULT` - `DESC` - `END` - `ENUM` | - `ESCAPE` - `EXCEPT` - `EXCLUDE` - `EXTRACT` - `FETCH` - `FOR` - `GROUP` - `GROUPING` - `GROUPS` - `IF` - `INTERVAL` - `IS` | - `LATERAL` - `NATURAL` - `NEW` - `NO` - `NULLS` - `OF` - `ORDER` - `PROTO` - `QUALIFY` - `RANGE` - `RECURSIVE` | - `RESPECT` - `ROLLUP` - `ROWS` - `SOME` - `STRUCT` - `TABLESAMPLE` - `TO` - `TREAT` - `UNNEST` - `WHEN` - `WINDOW` |

For a more comprehensive list of reserved keywords and what constitutes valid identifiers, see the [Reserved keywords](../googlesql-syntax/lexical.md#reserved-keywords) section in [Lexical structure](../googlesql-syntax/lexical.md).

#### Project-qualified table names

In legacy SQL, to query a table with a project-qualified name, you can use either a colon `:` or a period `.`.
In GoogleSQL however, you must use only periods `.`.

Example legacy SQL query:

```sql
#legacySQL
SELECT
  word
FROM
  [bigquery-public-data:samples.shakespeare]
LIMIT 1;
```

The GoogleSQL equivalent is:

```sql
#GoogleSQL
SELECT
  word
FROM
  `bigquery-public-data.samples.shakespeare`
LIMIT 1;
```

If your project name includes a domain, such as `example.com:myproject`, you use
`example.com:myproject` as the project name, including the `:`.

#### Table decorators

[Table decorators](https://docs.cloud.google.com/bigquery/docs/table-decorators) are used to run a query on a subset of data.

##### Time decorator (snapshot decorator)

You can achieve the semantics of time decorators (formerly known as *snapshot
decorators* ) by using the
[`FOR SYSTEM_TIME AS OF`](../googlesql-syntax/query-syntax-1.md#for-system_time-as-of)
clause, which references the historical version of a table at a specified
timestamp. For more information, see
[Accessing historical data using time travel](https://docs.cloud.google.com/bigquery/docs/time-travel).

##### Range decorator

There is no exact equivalent to range decorators in GoogleSQL. You can
achieve similar semantics by creating a time-partitioned table and using a
partition filter when querying data. For more information, see
[Querying partitioned tables](https://docs.cloud.google.com/bigquery/docs/querying-partitioned-tables).

Another option is to create date-sharded tables and filter on the
`_TABLE_SUFFIX` pseudocolumn. For more information, see
[GoogleSQL wildcard tables](https://docs.cloud.google.com/bigquery/docs/querying-wildcard-tables#wildcard_table_syntax).

##### Partition decorator

The equivalent of a partition decorator in GoogleSQL is a filter on the partitioning column. For more information, see
[Querying partitioned tables](https://docs.cloud.google.com/bigquery/docs/querying-partitioned-tables).

For example, consider a legacy SQL query using a `table` partitioned over the `_PARTITIONTIME` pseudocolumn:

```sql
#legacySQL
SELECT * FROM dataset.table$20160501;
```

The GoogleSQL equivalent is:

```sql
#GoogleSQL
SELECT * FROM dataset.table
WHERE _PARTITIONTIME=TIMESTAMP('2016-05-01');
```

If the data is in a separate table for each date (date-sharded tables) instead of one
partitioned table, query them through a wildcard table and filter on the `_TABLE_SUFFIX`
pseudocolumn instead. `_TABLE_SUFFIX` is the part of a table name that the wildcard
matches, so it does not select a partition of one table. For more information, see
[GoogleSQL wildcard tables](https://docs.cloud.google.com/bigquery/docs/querying-wildcard-tables#wildcard_table_syntax).

#### Table wildcard functions

In legacy SQL, you can use the following
[table wildcard functions](legacy-sql-2.md#table-wildcard-functions)
to query multiple tables.

- `TABLE_DATE_RANGE`
- `TABLE_DATE_RANGE_STRICT`
- `TABLE_QUERY`

These functions are not supported in GoogleSQL, but they can be migrated using a filter on `_TABLE_SUFFIX` pseudocolumn.

For example, consider the following legacy SQL query, which counts the number of rows across 2010 and 2011
in the National Oceanic and Atmospheric Administration GSOD (global summary of
the day) tables:

```sql
#legacySQL
SELECT COUNT(*)
FROM TABLE_QUERY([bigquery-public-data:noaa_gsod],
                 'table_id IN ("gsod2010", "gsod2011")');
```

An equivalent query using GoogleSQL is:

```sql
#GoogleSQL
SELECT COUNT(*)
FROM `bigquery-public-data.noaa_gsod.*`
WHERE _TABLE_SUFFIX IN ("gsod2010", "gsod2011");
```

For more information, including examples of all wildcard functions, see
[Migrating table wildcard functions](#migrating-table-wildcard-functions).

#### Comma operator with tables

In legacy SQL, the comma operator `,` has the non-standard meaning of
[`UNION ALL BY NAME`](../googlesql-syntax/query-syntax-3.md#set-operators) when applied to tables. In GoogleSQL, the comma operator has the
standard meaning of `JOIN`.

For example, consider the following legacy SQL query:

```sql
#legacySQL
SELECT
  x,
  y
FROM
  (SELECT 1 AS x, "foo" AS y),
  (SELECT 2 AS x, "bar" AS y);
```

This is equivalent to the GoogleSQL query:

```sql
#GoogleSQL
SELECT
  x,
  y
FROM
  (SELECT 1 AS x, "foo" AS y UNION ALL BY NAME
   SELECT 2 AS x, "bar" AS y);
```

Legacy SQL associates columns by name instead of by position. To get the same behavior in GoogleSQL, use `UNION ALL BY NAME` when both inputs have the same set of column names, in any order.
`UNION ALL BY NAME` raises an error if a column of one input is missing from the other. For inputs with different columns, use `FULL OUTER UNION ALL BY NAME`, which returns the columns of both inputs and adds `NULL` for a column that an input lacks.
For example, the following query shows a translation where the column names and order are swapped:

```sql
#legacySQL
SELECT * FROM (SELECT 1 AS A, 2 as B), (SELECT 3 AS B, 4 as A);
```

The GoogleSQL equivalent will look like:

```sql
#GoogleSQL
SELECT * FROM (SELECT 1 AS A, 2 as B) UNION ALL BY NAME (SELECT 3 AS B, 4 as A);
```

Where the result in both cases will be:

```sql
+---+---+
| A | B |
+---+---+
| 1 | 2 |
| 4 | 3 |
+---+---+
```

#### Logical views

You cannot query a logical view defined with legacy SQL using GoogleSQL, and
conversely, you cannot query a logical view defined with GoogleSQL using legacy SQL due to differences in syntax and semantics between the dialects.
Instead, you would need to create a new view that uses GoogleSQL -- possibly
under a different name -- to replace a view that uses legacy SQL.

As an example, suppose that view `V` is defined using legacy SQL as:

```sql
#legacySQL
SELECT *, UTC_USEC_TO_DAY(timestamp_col) AS day
FROM MyTable;
```

Suppose that view `W` is defined using legacy SQL as:

```sql
#legacySQL
SELECT user, action, day
FROM V;
```

Suppose that you execute the following legacy SQL query daily, but you want to
migrate it to use GoogleSQL instead:

```sql
#legacySQL
SELECT EXACT_COUNT_DISTINCT(user), action, day
FROM W
GROUP BY action, day;
```

One possible migration path is to create new views using different names. The
steps involved are:

Create a view named `V2` using GoogleSQL with the following contents:

Adapted (not in the official docs): replaced `EXTRACT(DAY FROM timestamp_col)` with the `UTC_USEC_TO_DAY` equivalent from the function comparison table on this page, which takes `timestamp_col` as a UNIX timestamp in microseconds.

```sql
#GoogleSQL
SELECT *, UNIX_MICROS(TIMESTAMP_TRUNC(TIMESTAMP_MICROS(timestamp_col), DAY)) AS day
FROM MyTable;
```

Create a view named `W2` using GoogleSQL with the following contents:

```sql
#GoogleSQL
SELECT user, action, day
FROM V2;
```

Change your query that executes daily to use GoogleSQL and refer to `W2`
instead:

```sql
#GoogleSQL
SELECT COUNT(DISTINCT user), action, day
FROM W2
GROUP BY action, day;
```

Another option is to delete views `V` and `W`, then recreate them using standard
SQL under the same names. With this option, you would need to migrate all of
your queries that reference `V` or `W` to use GoogleSQL at the same time,
however.

### Function comparison

The following is a partial list of legacy SQL functions and their GoogleSQL
equivalents.

| Legacy SQL | GoogleSQL | Notes |
|---|---|---|
| `INTEGER(x)` | [`SAFE_CAST(x AS INT64)`](../googlesql-functions/conversion_functions.md#safe_cast) | for a `TIMESTAMP` input, use [`UNIX_MICROS(x)`](../googlesql-functions/timestamp_functions.md#unix_micros) |
| `CAST(x AS INTEGER)` | [`SAFE_CAST(x AS INT64)`](../googlesql-functions/conversion_functions.md#safe_cast) |   |
| `DATEDIFF(t1, t2)` | [`DATE_DIFF(DATE(t1), DATE(t2), DAY)`](../googlesql-functions/date_functions.md#date_diff) |   |
| `NOW()` | [`UNIX_MICROS(CURRENT_TIMESTAMP())`](../googlesql-functions/timestamp_functions.md#current_timestamp) |   |
| `STRFTIME_UTC_USEC(ts_usec, fmt)` | [`FORMAT_TIMESTAMP(fmt, TIMESTAMP_MICROS(ts_usec))`](../googlesql-functions/timestamp_functions.md#format_timestamp) |   |
| `UTC_USEC_TO_DAY(ts_usec)` | [`UNIX_MICROS(TIMESTAMP_TRUNC(TIMESTAMP_MICROS(ts_usec), DAY))`](../googlesql-functions/timestamp_functions.md#timestamp_trunc) |   |
| `UTC_USEC_TO_WEEK(ts_usec, day_of_week)` | [`UNIX_MICROS(TIMESTAMP_ADD(TIMESTAMP_TRUNC(TIMESTAMP_MICROS(ts_usec), WEEK),INTERVAL day_of_week DAY))`](../googlesql-functions/timestamp_functions.md#timestamp_trunc) |   |
| `REGEXP_MATCH(s, pattern)` | [`REGEXP_CONTAINS(s, pattern)`](../googlesql-functions/string_functions-1.md#regexp_contains) |   |
| `IS_NULL(x)` | [`x IS NULL`](../googlesql-syntax/operators.md#is-operators) |   |
| `LEFT(s, len)` | [`SUBSTR(s, 0, len)`](../googlesql-functions/string_functions-2.md#substr) |   |
| `RIGHT(s, len)` | [`RIGHT(s, len)`](../googlesql-functions/string_functions-2.md#right) |   |
| `s CONTAINS "foo"` | [`STRPOS(s, "foo") > 0`](../googlesql-functions/string_functions-2.md#strpos) or [`s LIKE '%foo%'`](../googlesql-syntax/operators.md#comparison-operators) |   |
| `INSTR(s, "foo")` | [`STRPOS(s, "foo")`](../googlesql-functions/string_functions-2.md#strpos) |   |
| `x % y` | [`MOD(x, y)`](../googlesql-functions/mathematical_functions.md#mod) |   |
| `NEST(x)` | [`ARRAY_AGG(x)`](../googlesql-functions/aggregate_functions.md#array_agg) | `ARRAY_AGG` returns an array also in the top-level query result, while legacy SQL flattens the repeated field that a top-level `NEST` produces; use `ARRAY_AGG` where `NEST` builds an intermediate result in a subselect, and expand the array with `UNNEST` where the legacy output rows are needed |
| `GROUP_CONCAT_UNQUOTED(s, sep)` | [`STRING_AGG(s, sep)`](../googlesql-functions/aggregate_functions.md#string_agg) |   |
| `SOME(x)` | `IFNULL(`[`LOGICAL_OR(x)`](../googlesql-functions/aggregate_functions.md#logical_or)`, false)` |   |
| `EVERY(x)` | `IFNULL(`[`LOGICAL_AND(x)`](../googlesql-functions/aggregate_functions.md#logical_and)`, true)` |   |
| `COUNT(DISTINCT x)` | [`COUNT(DISTINCT x)`](../googlesql-functions/aggregate_functions.md#count) for an exact count, or [`APPROX_COUNT_DISTINCT(x)`](../googlesql-functions/approximate_aggregate_functions.md#approx_count_distinct) for an approximate count | see [notes below](#count-function-comparison) |
| `EXACT_COUNT_DISTINCT(x)` | [`COUNT(DISTINCT x)`](../googlesql-functions/aggregate_functions.md#count) | see [notes below](#count-function-comparison) |
| `QUANTILES(x, boundaries)` | [`APPROX_QUANTILES(x, boundaries-1)`](../googlesql-functions/approximate_aggregate_functions.md#approx_quantiles) | output needs to be [unnested](#removing-repetition-with-flatten) |
| `TOP(x, num), COUNT(*)` | [`APPROX_TOP_COUNT(x, num)`](../googlesql-functions/approximate_aggregate_functions.md#approx_top_count) | `APPROX_TOP_COUNT` returns one `ARRAY<STRUCT>` value whose fields are `value` and `count`, while the legacy SQL query returns one row for each value; to get those rows, expand the array with `UNNEST` and select its `value` and `count` fields |
| `NTH(index, arr) WITHIN RECORD` | [`arr[SAFE_ORDINAL(index)]`](../googlesql-syntax/operators.md#array-subscript-operator) |   |
| `COUNT(arr) WITHIN RECORD` | [`ARRAY_LENGTH(arr)`](../googlesql-functions/array_functions.md#array_length) | `ARRAY_LENGTH` counts every element; to count only the non-`NULL` values of a field in a repeated record, use `(SELECT COUNT(field) FROM UNNEST(record))` |
| `HOST(url)` | [`NET.HOST(url)`](../googlesql-functions/net_functions.md#nethost) | see [differences below](#url-function-comparison) |
| `TLD(url)` | [`NET.PUBLIC_SUFFIX(url)`](../googlesql-functions/net_functions.md#netpublic_suffix) | see [differences below](#url-function-comparison) |
| `DOMAIN(url)` | [`NET.REG_DOMAIN(url)`](../googlesql-functions/net_functions.md#netreg_domain) | see [differences below](#url-function-comparison) |
| `PARSE_IP(addr_string)` | `IF(BYTE_LENGTH(`[`NET.SAFE_IP_FROM_STRING`](../googlesql-functions/net_functions.md#netsafe_ip_from_string)`(addr_string)) = 4, `[`NET.IPV4_TO_INT64`](../googlesql-functions/net_functions.md#netipv4_to_int64)`(NET.SAFE_IP_FROM_STRING(addr_string)), NULL)` | returns `NULL` for an input that is not a valid IPv4 address, as `PARSE_IP` does |
| `FORMAT_IP(addr_int64)` | [`NET.IP_TO_STRING`](../googlesql-functions/net_functions.md#netip_to_string)`(`[`NET.IPV4_FROM_INT64`](../googlesql-functions/net_functions.md#netipv4_from_int64)`(addr_int64 & 0xFFFFFFFF))` |   |
| `PARSE_PACKED_IP(addr_string)` | [`NET.SAFE_IP_FROM_STRING(addr_string)`](../googlesql-functions/net_functions.md#netsafe_ip_from_string) | returns `NULL` for an invalid address, as `PARSE_PACKED_IP` does |
| `FORMAT_PACKED_IP(addr_bytes)` | [`NET.IP_TO_STRING(addr_bytes)`](../googlesql-functions/net_functions.md#netip_to_string) |   |
| `NVL(expr, null_default)` | [`IFNULL(expr, null_default)`](../googlesql-functions/conditional_expressions.md#ifnull) |   |

For more information about GoogleSQL functions, see
[All functions](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/functions-all).

#### `COUNT` function comparison

Both legacy SQL and GoogleSQL contain a COUNT function. However, each
function behaves differently, depending on the SQL dialect you use.

In legacy SQL, `COUNT(DISTINCT x)` returns an approximate count, which is exact
up to a threshold: 1,000 distinct values by default, or the value of the
optional second parameter `n`. In standard SQL, it returns an exact count, so
use `COUNT(DISTINCT x)` to keep exact results when you migrate. For an approximate count of distinct values
that runs faster and requires fewer resources, use
[`APPROX_COUNT_DISTINCT`](../googlesql-functions/approximate_aggregate_functions.md#approx_count_distinct).

#### URL function comparison

Both legacy SQL and GoogleSQL contain functions for parsing URLs. In legacy
SQL, these functions are `HOST(url)`, `TLD(url)`, and `DOMAIN(url)`. In standard
SQL, these functions are
[`NET.HOST(url)`](../googlesql-functions/net_functions.md#nethost),
[`NET.PUBLIC_SUFFIX(url)`](../googlesql-functions/net_functions.md#netpublic_suffix),
and [`NET.REG_DOMAIN(url)`](../googlesql-functions/net_functions.md#netreg_domain).

<br />

**Improvements in GoogleSQL functions**

<br />

- GoogleSQL URL functions can parse URLs starting with "//".
- When the input is not compliant with [RFC 3986](https://tools.ietf.org/html/rfc3986#appendix-A) or is not a URL (for example, "mailto:?to=\&subject=\&body="), different rules are applied to parse the input. In particular, GoogleSQL URL functions can parse non-standard inputs without "//", such as "www.google.com". For best results, it is recommended that you ensure that inputs are URLs and comply with RFC 3986.
- `NET.PUBLIC_SUFFIX` returns results without leading dots. For example, it returns "com" instead of ".com". This complies with the format in the [public suffix list](https://publicsuffix.org/list/public_suffix_list.dat).
- `NET.PUBLIC_SUFFIX` and `NET.REG_DOMAIN` support uppercase letters and internationalized domain names. `TLD` and `DOMAIN` don't support them (might return unexpected results).

<br />

<br />

<br />

**Minor differences on edge cases**

<br />

- If the input does not contain any suffix in the [public suffix list](https://publicsuffix.org/list/public_suffix_list.dat), `NET.PUBLIC_SUFFIX` and `NET.REG_DOMAIN` return NULL, while `TLD` and `DOMAIN` return non-NULL values as best effort guesses.
- If the input contains only a public suffix without a preceding label (for example, "http://com"), `NET.PUBLIC_SUFFIX` returns the public suffix, while `TLD` returns an empty string. Similarly, `NET.REG_DOMAIN` returns NULL, while `DOMAIN` returns the public suffix.
- For inputs with IPv6 hosts, `NET.HOST` does not remove brackets from the result, as specified by [RFC 3986](https://tools.ietf.org/html/rfc3986#appendix-A).
- For inputs with IPv4 hosts, `NET.REG_DOMAIN` returns NULL, while `DOMAIN` returns the first 3 octets.

<br />

<br />

<br />

**Examples**

<br />

In the following table, gray text color indicates results
that are the same between legacy and GoogleSQL.

| URL (description) | HOST | NET.HOST | TLD | NET.PUBLIC _SUFFIX | DOMAIN | NET.REG_DOMAIN |
|---|---|---|---|---|---|---|
| "//google.com" (starting with "//") | NULL | "google.com" | NULL | "com" | NULL | "google.com" |
| "google.com" (non-standard; no "//") | NULL | "google.com" | NULL | "com" | NULL | "google.com" |
| "http://user:pass@word@x.com" (non-standard with multiple "@") | "word@x.com" | "x.com" | ".com" | "com" | "word@x.com" | "x.com" |
| "http://foo.com:1:2" (non-standard with multiple ":") | "foo.com:1" | "foo.com" | ".com:1" | "com" | "foo.com" | "foo.com" |
| "http://x.Co.uk" (upper case letters) | "x.Co.uk" | "x.Co.uk" | ".uk" | "Co.uk" | "Co.uk" | "x.Co.uk" |
| "http://a.b" (public suffix not found) | "a.b" | "a.b" | ".b" | NULL | "a.b" | NULL |
| "http://com" (host contains only a public suffix) | "com" | "com" | "" | "com" | "com" | NULL |
| "http://\[::1\]" (IPv6 host; no public suffix) | "::1" | "\[::1\]" | "" | NULL | "::1" | NULL |
| "http://1.2.3.4" (IPv4 host; no public suffix) | "1.2.3.4" | "1.2.3.4" | "" | NULL | "1.2.3" | NULL |

<br />

<br />

### Differences in repeated field handling

A `REPEATED` type in legacy SQL is equivalent to an `ARRAY` of that type in
GoogleSQL. For example, `REPEATED INTEGER` is equivalent to `ARRAY<INT64>` in
GoogleSQL. The following section discusses some of the differences in
operations on repeated fields between legacy and GoogleSQL.

#### `NULL` elements and `NULL` arrays

GoogleSQL supports `NULL` array elements, but raises an error if there is a
`NULL` array element in the query result. If there is a `NULL` array column in
the query result, GoogleSQL stores it as an empty array.

#### Selecting nested repeated leaf fields

Using legacy SQL, you can "dot" into a nested repeated field without needing to
consider where the repetition occurs. In GoogleSQL, attempting to "dot" into
a nested repeated field results in an error. For example:

```sql
#GoogleSQL
SELECT
  repository.url,
  payload.pages.page_name
FROM
  `bigquery-public-data.samples.github_nested`
LIMIT 5;
```

Attempting to execute this query returns:

```text
Cannot access field page_name on a value with type
ARRAY<STRUCT<action STRING, html_url STRING, page_name STRING, ...>>
```

To correct the error and return an array of `page_name`s in the result, use an
`ARRAY` subquery instead. For example:

Adapted (not in the official docs): excluded `NULL` page names, because a query result can't contain an array with `NULL` elements, and kept the order of the pages with `WITH OFFSET`.

```sql
#GoogleSQL
SELECT
  repository.url,
  ARRAY(SELECT page_name FROM UNNEST(payload.pages) WITH OFFSET AS pos
        WHERE page_name IS NOT NULL ORDER BY pos) AS page_names
FROM
  `bigquery-public-data.samples.github_nested`
LIMIT 5;
```

For more information about arrays and `ARRAY` subqueries, see
[Working with arrays](https://docs.cloud.google.com/bigquery/docs/arrays).

#### Filtering repeated fields

Using legacy SQL, you can filter repeated fields directly using a `WHERE`
clause. In GoogleSQL, you can express similar logic with a `JOIN` comma
operator followed by a filter. For example, consider the following legacy SQL
query:

```sql
#legacySQL
SELECT
  payload.pages.title
FROM
  [bigquery-public-data:samples.github_nested]
WHERE payload.pages.page_name IN ('db_jobskill', 'Profession');
```

This query returns all `title`s of pages for which the `page_name` is either
`db_jobskill` or `Profession`. You can express a similar query in GoogleSQL
as:

```sql
#GoogleSQL
SELECT
  page.title
FROM
  `bigquery-public-data.samples.github_nested`,
  UNNEST(payload.pages) AS page
WHERE page.page_name IN ('db_jobskill', 'Profession');
```

One difference between the preceding legacy SQL and GoogleSQL queries is that
if you unset the **Flatten Results** option and execute the legacy SQL query,
`payload.pages.title` is `REPEATED` in the query result. To achieve the
same semantics in GoogleSQL and return an array for the `title` column, use
an `ARRAY` subquery instead:

Adapted (not in the official docs): excluded `NULL` titles, because a query result can't contain an array with `NULL` elements, kept the order of the pages with `WITH OFFSET`, and kept the rows with an `EXISTS` test on `page_name`.

```sql
#GoogleSQL
SELECT
  title
FROM (
  SELECT
    ARRAY(SELECT title FROM UNNEST(payload.pages) WITH OFFSET AS pos
          WHERE page_name IN ('db_jobskill', 'Profession')
            AND title IS NOT NULL
          ORDER BY pos) AS title,
    EXISTS(SELECT 1 FROM UNNEST(payload.pages)
           WHERE page_name IN ('db_jobskill', 'Profession')) AS has_page
  FROM
    `bigquery-public-data.samples.github_nested`)
WHERE has_page;
```

This query creates an array of `title`s where the `page_name` is either
`'db_jobskill'` or `'Profession'`, in the order of the pages, then keeps only the
rows that have such a page, using `EXISTS`. `NULL` titles are left out of the
array, so a row whose matching pages all have a `NULL` title has an empty array.
Because of that, the array can have fewer elements than the matching pages, and
the position of a title in the array can differ from the position of its page
among them. To keep one element for each matching page, including a page with a
`NULL` title, return an array of `STRUCT`s instead, for example
`ARRAY(SELECT AS STRUCT title FROM UNNEST(payload.pages) WITH OFFSET AS pos WHERE page_name IN ('db_jobskill', 'Profession') ORDER BY pos)`:
an element is a `STRUCT` that is not `NULL`, even when its `title` field is.

For more information about arrays, see [Working with arrays](https://docs.cloud.google.com/bigquery/docs/arrays).

#### Structure of selected nested leaf fields

Legacy SQL preserves the structure of nested leaf fields in the `SELECT` list
when the **Flatten Results** option is unset, whereas GoogleSQL does not. For
example, consider the following legacy SQL query:

```sql
#legacySQL
SELECT
  repository.url,
  repository.has_downloads
FROM
  [bigquery-public-data.samples.github_nested]
LIMIT 5;
```

This query returns `url` and `has_downloads` within a record named `repository`
when **Flatten Results** is unset. Now consider the following GoogleSQL query:

```sql
#GoogleSQL
SELECT
  repository.url,
  repository.has_downloads
FROM
  `bigquery-public-data.samples.github_nested`
LIMIT 5;
```

This query returns `url` and `has_downloads` as top-level columns; they are not
part of a `repository` record or struct. To return them as part of a struct, use
the `STRUCT` operator:

```sql
#GoogleSQL
SELECT
  STRUCT(
    repository.url,
    repository.has_downloads) AS repository
FROM
  `bigquery-public-data.samples.github_nested`
LIMIT 5;
```

#### Removing repetition with `FLATTEN`

GoogleSQL does not have a `FLATTEN` function as in legacy SQL, but you can
achieve similar semantics using the `JOIN` (comma) operator. For example,
consider the following legacy SQL query:

```sql
#legacySQL
SELECT
  repository.url,
  payload.pages.page_name
FROM
  FLATTEN([bigquery-public-data:samples.github_nested], payload.pages.page_name)
LIMIT 5;
```

You can express a similar query in GoogleSQL as follows:

```sql
#GoogleSQL
SELECT
  repository.url,
  page.page_name
FROM
  `bigquery-public-data.samples.github_nested`,
  UNNEST(payload.pages) AS page
LIMIT 5;
```

Or, equivalently, use `JOIN` rather than the comma `,` operator:

```sql
#GoogleSQL
SELECT
  repository.url,
  page.page_name
FROM
  `bigquery-public-data.samples.github_nested`
JOIN
  UNNEST(payload.pages) AS page
LIMIT 5;
```

One important difference is that the legacy SQL query returns a row where
`payload.pages.page_name` is `NULL` if `payload.pages` is empty. The standard
SQL query, however, does not return a row if `payload.pages` is empty. To
achieve exactly the same semantics, use a `LEFT JOIN` or `LEFT OUTER JOIN`. For
example:

```sql
#GoogleSQL
SELECT
  repository.url,
  page.page_name
FROM
  `bigquery-public-data.samples.github_nested`
LEFT JOIN
  UNNEST(payload.pages) AS page
LIMIT 5;
```

For more information about arrays, see
[Working with arrays](https://docs.cloud.google.com/bigquery/docs/arrays). For more
information about `UNNEST`, see the
[`UNNEST`](../googlesql-syntax/query-syntax-1.md#unnest-operator) topic.

#### Filtering rows with `OMIT RECORD IF`

The `OMIT IF` clause from legacy SQL lets you filter rows based on a
condition that can apply to repeated fields. In GoogleSQL, you can model
an `OMIT IF` clause with an `EXISTS` clause, `IN` clause, or simple filter.
For example, consider the following legacy SQL query:

```sql
#legacySQL
SELECT
  repository.url,
FROM
  [bigquery-public-data:samples.github_nested]
OMIT RECORD IF
  EVERY(payload.pages.page_name != 'db_jobskill'
        AND payload.pages.page_name != 'Profession');
```

The analogous GoogleSQL query is:

```sql
#GoogleSQL
SELECT
  repository.url
FROM
  `bigquery-public-data.samples.github_nested`
WHERE EXISTS (
  SELECT 1 FROM UNNEST(payload.pages)
  WHERE page_name = 'db_jobskill'
    OR page_name = 'Profession');
```

Here the `EXISTS` clause evaluates to `true` if there is at least one element of
`payload.pages` where the page name is `'db_jobskill'` or `'Profession'`.

Alternatively, suppose that the legacy SQL query uses `IN`:

```sql
#legacySQL
SELECT
  repository.url,
FROM
  [bigquery-public-data:samples.github_nested]
OMIT RECORD IF NOT
  SOME(payload.pages.page_name IN ('db_jobskill', 'Profession'));
```

In GoogleSQL, you can express the query using an `EXISTS` clause with `IN`:

```sql
#GoogleSQL
SELECT
  repository.url
FROM
  `bigquery-public-data.samples.github_nested`
WHERE EXISTS (
  SELECT 1 FROM UNNEST(payload.pages)
  WHERE page_name IN ('db_jobskill', 'Profession'));
```

Consider the following legacy SQL query that filters records with 80 or fewer
pages:

```sql
#legacySQL
SELECT
  repository.url,
FROM
  [bigquery-public-data:samples.github_nested]
OMIT RECORD IF
  COUNT(payload.pages.page_name) <= 80;
```

In this case, you can use a filter that counts the page names in an `UNNEST` subquery in GoogleSQL:

Adapted (not in the official docs): counted the non-`NULL` page names in an `UNNEST` subquery instead of the array length, as the legacy SQL query counts `payload.pages.page_name`.

```sql
#GoogleSQL
SELECT
  repository.url
FROM
  `bigquery-public-data.samples.github_nested`
WHERE
  (SELECT COUNT(page_name) FROM UNNEST(payload.pages)) > 80;
```

Note that `COUNT(page_name)` counts only the pages whose nested field
`page_name` is not `NULL`, as `COUNT(payload.pages.page_name)` does in the
legacy SQL query.

For more information about arrays and `ARRAY` subqueries, see
[Working with arrays](https://docs.cloud.google.com/bigquery/docs/arrays).

### Semantic differences

The semantics of some operations differ between legacy and GoogleSQL.

#### Runtime errors

Some functions in legacy SQL return `NULL` for invalid input, potentially
masking problems in queries or in data. GoogleSQL is generally more strict,
and raises an error if an input is invalid.

- For all mathematical functions and operators, legacy SQL does not check for overflows. GoogleSQL adds overflow checks, and raises an error if a computation overflows. This includes the `+`, `-`, `*` operators, the `SUM`, `AVG`, and `STDDEV` aggregate functions, and others.
- GoogleSQL raises an error upon division by zero, whereas legacy SQL returns `NULL`. To return `NULL` for division by zero in GoogleSQL, use [`SAFE_DIVIDE`](../googlesql-functions/mathematical_functions.md#safe_divide).
- GoogleSQL raises an error for `CAST`s where the input format is invalid or out of range for the target type, whereas legacy SQL returns `NULL`. To avoid raising an error for an invalid cast in GoogleSQL, use [`SAFE_CAST`](../googlesql-functions/conversion_functions.md#safe_cast).

#### Nested repeated results

Queries executed using GoogleSQL preserve any nesting and repetition of the
columns in the result, and the **Flatten Results** option has no effect. To
return top-level columns for nested fields, use the `.*` operator on struct
columns. For example:

```sql
#GoogleSQL
SELECT
  repository.*
FROM
  `bigquery-public-data.samples.github_nested`
LIMIT 5;
```

To return top-level columns for repeated nested fields (`ARRAY`s of `STRUCT`s),
use a `JOIN` to take the cross product of the table's rows and the elements of
the repeated nested field. For example:

```sql
#GoogleSQL
SELECT
  repository.url,
  page.*
FROM
  `bigquery-public-data.samples.github_nested`
JOIN
  UNNEST(payload.pages) AS page
LIMIT 5;
```

For more information about arrays and `ARRAY` subqueries, see
[Working with arrays](https://docs.cloud.google.com/bigquery/docs/arrays).

#### NOT IN conditions and NULL

Legacy SQL does not comply with the SQL standard in its handling of `NULL` with
`NOT IN` conditions, whereas GoogleSQL does. Consider the following legacy
SQL query, which finds the number of words that don't appear in the GitHub
sample table as locations:

```sql
#legacySQL
SELECT COUNT(*)
FROM [bigquery-public-data.samples.shakespeare]
WHERE word NOT IN (
  SELECT actor_attributes.location
  FROM [bigquery-public-data.samples.github_nested]
);
```

This query returns 163,716 as the count, indicating that there are 163,716 words
that don't appear as locations in the GitHub table. Now consider the following
GoogleSQL query:

```sql
#GoogleSQL
SELECT COUNT(*)
FROM `bigquery-public-data.samples.shakespeare`
WHERE word NOT IN (
  SELECT actor_attributes.location
  FROM `bigquery-public-data.samples.github_nested`
);
```

This query returns 0 as the count. The difference is due to the semantics of
`NOT IN` with GoogleSQL, which returns `NULL` if the value on the left matches no
value on the right hand side and any value on the right hand side is `NULL`. To achieve the same results as with the legacy SQL query, use a
`WHERE` clause to exclude the `NULL` values:

```sql
#GoogleSQL
SELECT COUNT(*)
FROM `bigquery-public-data.samples.shakespeare`
WHERE word NOT IN (
  SELECT actor_attributes.location
  FROM `bigquery-public-data.samples.github_nested`
  WHERE actor_attributes.location IS NOT NULL
);
```

This query returns 163,716 as the count. Alternatively, use a `NOT EXISTS`
condition:

```sql
#GoogleSQL
SELECT COUNT(*)
FROM `bigquery-public-data.samples.shakespeare` AS t
WHERE NOT EXISTS (
  SELECT 1
  FROM `bigquery-public-data.samples.github_nested`
  WHERE t.word = actor_attributes.location
);
```

This query also returns 163,716 as the count. For further reading, see the
[comparison operators](../googlesql-syntax/operators.md#comparison-operators)
section of the documentation, which explains the semantics of `IN`, `NOT IN`,
`EXISTS`, and other comparison operators.

### Differences in user-defined JavaScript functions

The [User-defined functions](https://docs.cloud.google.com/bigquery/docs/user-defined-functions)
topic documents how to use JavaScript user-defined functions with GoogleSQL.
This section explains some of the key differences between user-defined functions
in legacy and GoogleSQL.

#### Functions in the query text

With GoogleSQL, you use `CREATE TEMPORARY FUNCTION` as part of the query body
rather than specifying user-defined functions separately. Examples of defining
functions separately include using the UDF Editor in the Google Cloud console
or using the `--udf_resource` flag in
[the bq command-line tool](../bq-cli/bq-cli-reference-1.md).

Consider the following GoogleSQL query:

```sql
#GoogleSQL
-- Computes the harmonic mean of the elements in 'arr'.
-- The harmonic mean of x_1, x_2, ..., x_n can be expressed as:
--   n / ((1 / x_1) + (1 / x_2) + ... + (1 / x_n))
CREATE TEMPORARY FUNCTION HarmonicMean(arr ARRAY<FLOAT64>)
  RETURNS FLOAT64 LANGUAGE js AS """
var sum_of_reciprocals = 0;
for (var i = 0; i < arr.length; ++i) {
  sum_of_reciprocals += 1 / arr[i];
}
return arr.length / sum_of_reciprocals;
""";

WITH T AS (
  SELECT GENERATE_ARRAY(1.0, x * 4, x) AS arr
  FROM UNNEST([1, 2, 3, 4, 5]) AS x
)
SELECT arr, HarmonicMean(arr) AS h_mean
FROM T;
```

This query defines a JavaScript function named `HarmonicMean` and then applies
it to the array column `arr` from `T`.

For more information about user-defined functions, see the
[User-defined functions](https://docs.cloud.google.com/bigquery/docs/user-defined-functions) topic.

#### Functions operate on values rather than rows

In legacy SQL, JavaScript functions operate on rows from a table. In standard
SQL, as in the preceding example, JavaScript functions operate on values. To pass a
row value to a JavaScript function using GoogleSQL, define a function that
takes a struct of the same row type as the table. For example:

```sql
#GoogleSQL
-- Takes a struct of x, y, and z and returns a struct with a new field foo.
CREATE TEMPORARY FUNCTION AddField(s STRUCT<x FLOAT64, y BOOL, z STRING>)
  RETURNS STRUCT<x FLOAT64, y BOOL, z STRING, foo STRING> LANGUAGE js AS """
var new_struct = new Object();
new_struct.x = s.x;
new_struct.y = s.y;
new_struct.z = s.z;
if (s.y) {
  new_struct.foo = 'bar';
} else {
  new_struct.foo = 'baz';
}

return new_struct;
""";

WITH T AS (
  SELECT x, MOD(off, 2) = 0 AS y, CAST(x AS STRING) AS z
  FROM UNNEST([5.0, 4.0, 3.0, 2.0, 1.0]) AS x WITH OFFSET off
)
SELECT AddField(t).*
FROM T AS t;
```

This query defines a JavaScript function that takes a struct with the same row
type as `T` and creates a new struct with an additional field named `foo`. The
`SELECT` statement passes the row `t` as input to the function and uses `.*` to
return the fields of the resulting struct in the output.

### Migrating table wildcard functions

This section describes in detail how to migrate legacy SQL [table wildcard functions](legacy-sql-2.md#table-wildcard-functions) to GoogleSQL.

#### The TABLE_DATE_RANGE function

The legacy SQL `TABLE_DATE_RANGE` functions work on tables that conform to a
specific naming scheme: `<prefix>YYYYMMDD`, where the `<prefix>` represents the
first part of a table name and `YYYYMMDD` represents the date associated with
that table's data.

For example, the following legacy SQL query finds the average temperature from
a set of daily tables that contain Seattle area weather data:

```sql
#legacySQL
SELECT
  ROUND(AVG(TemperatureF),1) AS AVG_TEMP_F
FROM
  TABLE_DATE_RANGE([mydataset.sea_weather_],
                    TIMESTAMP("2016-05-01"),
                    TIMESTAMP("2016-05-09"))
```

In GoogleSQL, an equivalent query uses a table wildcard and the `BETWEEN`
clause. A wildcard table query can't reference a view, so this example and the
`TABLE_DATE_RANGE_STRICT` examples that follow assume that no view in
`mydataset` has a name that starts with `sea_weather_`. They also assume that
every table whose name starts with `sea_weather_` has a compatible schema:
BigQuery uses the schema of the most recently created table that matches the
wildcard, even when a `_TABLE_SUFFIX` filter excludes that table. If either
assumption is not met, list the tables for the dates explicitly and combine
them with `UNION ALL`.

Adapted (not in the official docs): required an 8-character suffix, so that only the tables for the dates in the range are read.

```sql
#GoogleSQL
SELECT
  ROUND(AVG(TemperatureF),1) AS AVG_TEMP_F
FROM
  `mydataset.sea_weather_*`
WHERE
  _TABLE_SUFFIX BETWEEN '20160501' AND '20160509'
  AND LENGTH(_TABLE_SUFFIX) = 8
```

#### The TABLE_DATE_RANGE_STRICT function

This function is equivalent to `TABLE_DATE_RANGE`, except that it fails with an error if any daily table in the sequence is missing.

> [!NOTE]
> **Note:** If you don't need the query to fail when tables are missing, use the simpler `_TABLE_SUFFIX` filter, as shown in the [`TABLE_DATE_RANGE` migration example](#the-table_date_range-function).

<br />

**Detailed migration for the TABLE_DATE_RANGE_STRICT function**

<br />

Consider the same query as in the previous example, with the `TABLE_DATE_RANGE_STRICT` function:

```sql
#legacySQL
SELECT
  ROUND(AVG(TemperatureF),1) AS AVG_TEMP_F
FROM
  TABLE_DATE_RANGE_STRICT([mydataset.sea_weather_],
                    TIMESTAMP("2016-05-01"),
                    TIMESTAMP("2016-05-09"))
```

To make an equivalent GoogleSQL query with error handling, the query should be split into two phases: validation and query execution. Depending on the application and query complexity, it can be achieved using [Composability using WITH clauses](#composability-using-with-clauses) or [BigQuery Scripting (procedural SQL)](../googlesql-syntax/procedural-language.md).

Translated query using [`WITH` clause](#composability-using-with-clauses) and conditional `ERROR`. This query references the wildcard table in the same statement as the check, so if no table matches the wildcard, it can fail on that reference before it reports the missing suffixes. To report them in that case too, use the scripting version that follows. Both versions read `INFORMATION_SCHEMA.TABLES` to check which tables exist, so in addition to read access to the tables, they need the permissions that
[Required permissions](../information-schema/tables.md#required-permissions) of that view lists, such as `bigquery.tables.list` on the dataset
(for example, from `roles/bigquery.metadataViewer`):

Adapted (not in the official docs): checked which tables exist with the `table_name` column of `INFORMATION_SCHEMA.TABLES`, instead of the `_TABLE_SUFFIX` values of the rows that the wildcard table returns, counted only base tables, and required an 8-character suffix in the wildcard filter.

```sql
#GoogleSQL
WITH MissingTables AS (
  SELECT
    STRING_AGG(FORMAT_DATE('%Y%m%d', day), ', ') AS missing_suffixes
  FROM
    UNNEST(GENERATE_DATE_ARRAY(DATE '2016-05-01', DATE '2016-05-09')) AS day
  WHERE
    FORMAT_DATE('%Y%m%d', day) NOT IN (
      SELECT SUBSTR(table_name, LENGTH('sea_weather_') + 1)
      FROM mydataset.INFORMATION_SCHEMA.TABLES
      WHERE STARTS_WITH(table_name, 'sea_weather_')
        AND table_type = 'BASE TABLE'
    )
)
SELECT
  IF(missing_suffixes IS NOT NULL,
    ERROR(FORMAT("Not found suffixes: %s", missing_suffixes)),
    (
      SELECT ROUND(AVG(TemperatureF),1)
      FROM `mydataset.sea_weather_*`
      WHERE _TABLE_SUFFIX BETWEEN '20160501' AND '20160509'
        AND LENGTH(_TABLE_SUFFIX) = 8
    )
  ) AS AVG_TEMP_F
FROM MissingTables
```

And using [BigQuery Scripting (procedural SQL)](../googlesql-syntax/procedural-language.md):

Adapted (not in the official docs): checked which tables exist with the `table_name` column of `INFORMATION_SCHEMA.TABLES`, instead of the `_TABLE_SUFFIX` values of the rows that the wildcard table returns, counted only base tables, and required an 8-character suffix in the wildcard filter.

```sql
#GoogleSQL
BEGIN
  DECLARE missing_suffixes STRING;

  SET missing_suffixes = (
    SELECT STRING_AGG(FORMAT_DATE('%Y%m%d', day), ', ')
    FROM UNNEST(GENERATE_DATE_ARRAY(DATE '2016-05-01', DATE '2016-05-09')) AS day
    WHERE FORMAT_DATE('%Y%m%d', day) NOT IN (
      SELECT SUBSTR(table_name, LENGTH('sea_weather_') + 1)
      FROM mydataset.INFORMATION_SCHEMA.TABLES
      WHERE STARTS_WITH(table_name, 'sea_weather_')
        AND table_type = 'BASE TABLE'
    )
  );

  -- Raise error or run query
  IF missing_suffixes IS NOT NULL THEN
    SELECT ERROR(FORMAT("Not found suffixes: %s", missing_suffixes));
  ELSE
    SELECT
      ROUND(AVG(TemperatureF),1) AS AVG_TEMP_F
    FROM
      `mydataset.sea_weather_*`
    WHERE
      _TABLE_SUFFIX BETWEEN '20160501' AND '20160509'
      AND LENGTH(_TABLE_SUFFIX) = 8;
  END IF;
END;
```

<br />

<br />

#### The TABLE_QUERY function

The legacy SQL `TABLE_QUERY` function lets you find table names based
on patterns. When migrating a `TABLE_QUERY` function to GoogleSQL, which
does not support the `TABLE_QUERY` function, you can instead filter using
the `_TABLE_SUFFIX` pseudocolumn. Keep the following differences in mind when
migrating:

- In legacy SQL, you place the `TABLE_QUERY` function in the `FROM` clause,
  whereas in GoogleSQL, you filter using the `_TABLE_SUFFIX` pseudocolumn in
  the `WHERE` clause.

- In legacy SQL, the `TABLE_QUERY` function operates on the entire table name
  (or `table_id`), whereas in GoogleSQL, the `_TABLE_SUFFIX` pseudocolumn
  contains part or all of the table name, depending on how you use the wildcard
  character.

##### Filter in the WHERE clause

When migrating from legacy SQL to GoogleSQL, move the filter to the `WHERE`
clause. For example, the following query finds the maximum temperatures across
all years that end in the number `0`:

```sql
#legacySQL
SELECT
  max,
  ROUND((max-32)*5/9,1) celsius,
  year
FROM
  TABLE_QUERY([bigquery-public-data:noaa_gsod],
               'REGEXP_MATCH(table_id, r"0$")')
WHERE
  max != 9999.9 # code for missing data
  AND max > 100 # to improve ORDER BY performance
ORDER BY
  max DESC
```

In GoogleSQL, an equivalent query uses a table wildcard and places the
regular expression function, `REGEXP_CONTAINS`, in the `WHERE` clause. A filter on
`_TABLE_SUFFIX` limits the tables scanned only when its condition is a constant
expression, and the official docs don't say that a `REGEXP_CONTAINS` condition
qualifies. So assume that this example and the next one can scan every table that
matches the prefix `gsod`, which can read and bill more data than `TABLE_QUERY`,
which selects the tables first. To read only the tables that you need, list every
suffix that you need in a literal `IN` condition instead, for example
`_TABLE_SUFFIX IN ('1930', '1940', '1950')` for those three years. The example with
`REGEXP_CONTAINS`:

```sql
#GoogleSQL
SELECT
  max,
  ROUND((max-32)*5/9,1) celsius,
  year
FROM
  `bigquery-public-data.noaa_gsod.gsod*`
WHERE
  max != 9999.9 # code for missing data
  AND max > 100 # to improve ORDER BY performance
  AND REGEXP_CONTAINS(_TABLE_SUFFIX, r"0$")
ORDER BY
  max DESC
```

##### Differences between table_id and _TABLE_SUFFIX

In the legacy SQL `TABLE_QUERY(dataset, expr)` function, the second parameter
is an expression that operates over the entire table name, using the value
`table_id`. When migrating to GoogleSQL, the filter that you create in the
`WHERE` clause operates on the value of `_TABLE_SUFFIX`, which can include part
or all of the table name, depending on your use of the wildcard character.

For example, the following legacy SQL query uses the entire table name in a
regular expression to find the maximum temperatures across all years that end
in the number `0`:

Adapted (not in the official docs): anchored the regular expression to the whole table name, so that only the tables for years that end in `0` match, and wrote the digit class as `[0-9]`, because the outer argument is a single-quoted string and the escapes listed for legacy SQL strings do not include `\d`.

```sql
#legacySQL
SELECT
  max,
  ROUND((max-32)*5/9,1) celsius,
  year
FROM
  TABLE_QUERY([bigquery-public-data:noaa_gsod], 'REGEXP_MATCH(table_id, r"^gsod[0-9]{3}0$")')
WHERE
  max != 9999.9 # code for missing data
  AND max > 100 # to improve ORDER BY performance
ORDER BY
  max DESC
```

In GoogleSQL, an equivalent query can use the entire table name or only a
part of the table name. You can use an empty prefix in GoogleSQL so that
your filter operates over the entire table name `` FROM `bigquery-public-data.noaa_gsod.*` ``.

However, longer prefixes perform better than empty prefixes, so the following
example uses a longer prefix, which means that the value of `_TABLE_SUFFIX`
is only part of the table name.

Adapted (not in the official docs): anchored the regular expression to the whole suffix, so that only the tables for years that end in `0` match.

```sql
#GoogleSQL
SELECT
  max,
  ROUND((max-32)*5/9,1) celsius,
  year
FROM
  `bigquery-public-data.noaa_gsod.gsod*`
WHERE
  max != 9999.9 # code for missing data
  AND max > 100 # to improve ORDER BY performance
  AND REGEXP_CONTAINS(_TABLE_SUFFIX, r"^\d{3}0$")
ORDER BY
  max DESC
```

### Migrating the partition meta-table decorator

In legacy SQL, you can query the [`__PARTITIONS_SUMMARY__` meta-table](https://docs.cloud.google.com/bigquery/docs/managing-partitioned-tables#get_partition_metadata) to get partition metadata for a specific table.

```googlesql
#legacySQL
SELECT
  partition_id,
  project_id,
  dataset_id,
  table_id,
  creation_time,
  last_modified_time
FROM
  [DATASET_ID.TABLE_NAME$__PARTITIONS_SUMMARY__];
```

In GoogleSQL, you can query the
[`INFORMATION_SCHEMA.PARTITIONS`](../information-schema/partitions.md)
view instead.

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA.PARTITIONS` is in [Preview](https://cloud.google.com/products/#product-launch-stages). For more information, see the [documentation](../information-schema/partitions.md).

To migrate a query that uses `__PARTITIONS_SUMMARY__` and keep the output schema and error handling consistent, use the following GoogleSQL query. Unlike the meta-table, this query returns no rows instead of an error when the table doesn't exist, so if you need that error, check first that the table exists in `INFORMATION_SCHEMA.TABLES`:

Adapted (not in the official docs): grouped the rows by partition and took the latest `last_modified_time`, because the view can return two rows for the `__UNPARTITIONED__` partition, and typed the `creation_time` placeholder as `INT64`, like `last_modified_time`.

```googlesql
#GoogleSQL
SELECT
  IF(partition_id IS NOT NULL, partition_id, ERROR('Table is not partitioned')) AS partition_id,
  table_catalog AS project_id,
  table_schema AS dataset_id,
  table_name AS table_id,
  CAST(NULL AS INT64) AS creation_time, -- Partition creation time not available
  UNIX_MILLIS(MAX(last_modified_time)) AS last_modified_time
FROM
  `DATASET_ID.INFORMATION_SCHEMA.PARTITIONS`
WHERE
  table_name = 'TABLE_NAME'
GROUP BY 1, 2, 3, 4;
```

> [!WARNING]
> **Warning:** Partition-level `creation_time` isn't available in `INFORMATION_SCHEMA.PARTITIONS` and is set to `NULL` in the example. For table-level creation time, use the [`INFORMATION_SCHEMA.TABLES` `creation_time`](../information-schema/tables.md#schema) field.

The permissions required to access the partition metadata differ between legacy SQL and GoogleSQL:

- Legacy SQL: The [meta-table](https://docs.cloud.google.com/bigquery/docs/managing-partitioned-tables#get_partition_metadata) requires the `bigquery.tables.getData` permission.
- GoogleSQL: The `INFORMATION_SCHEMA.PARTITIONS` view requires the [`bigquery.tables.get` and `bigquery.tables.list`](../information-schema/partitions.md#required-permissions) permissions. This change in permissions for GoogleSQL lets you grant metadata-only roles (for example, [`roles/bigquery.metadataViewer`](https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.metadataViewer)) without providing access to the underlying table data.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/migrating-from-legacy-sql (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Caution: the error message example gives the valid timestamp range as `[0001-01-1 00:00:00, 9999-12-31 23:59:59.999999]`, while the same page writes the minimum as `0001-01-01 00:00:00.000000`. The official text is kept as published.
- Corrected from the official docs: the GoogleSQL view `V2` that replaces the legacy SQL view `V` computes `day` as `EXTRACT(DAY FROM timestamp_col)`, which is the day of the month (1 to 31), so the same day number in different months and years would be grouped together. `V` uses `UTC_USEC_TO_DAY(timestamp_col)`, which shifts a UNIX timestamp in microseconds to the beginning of its day (legacy-sql-1.md). The view now uses `UNIX_MICROS(TIMESTAMP_TRUNC(TIMESTAMP_MICROS(timestamp_col), DAY))`, the equivalent given in the function comparison table on this page. The page does not state the type of `timestamp_col`: this form follows `UTC_USEC_TO_DAY`, whose argument is a UNIX timestamp in microseconds (`INT64`), while `EXTRACT` in the official view needs a date or time type. If `timestamp_col` is a `TIMESTAMP` column, `TIMESTAMP_MICROS` fails on it; use `UNIX_MICROS(TIMESTAMP_TRUNC(timestamp_col, DAY))` instead.
- Corrected from the official docs: the two `TABLE_DATE_RANGE_STRICT` migration examples find missing tables by selecting `_TABLE_SUFFIX` from the wildcard table `mydataset.sea_weather_*`. A table that exists but has no rows returns no `_TABLE_SUFFIX` value, so it was reported as missing and the query raised an error. Both examples now take the suffixes from the `table_name` column of `mydataset.INFORMATION_SCHEMA.TABLES` (information-schema/tables.md), counting only the rows whose `table_type` is `BASE TABLE`, because the view also lists views and other table types.
- Corrected from the official docs: the coercion table translates `BOOLEAN` to `FLOAT64` as `SAFE_CAST(bool AS FLOAT64)`, but `BOOL` can be cast only to `BOOL`, `INT64` and `STRING` (googlesql-syntax/conversion_rules.md). The translation is changed to `SAFE_CAST(SAFE_CAST(bool AS INT64) AS FLOAT64)`.
- Corrected from the official docs: the function comparison table translates `RIGHT(s, len)` as `SUBSTR(s, -len)`. When `len` is `0`, that is `SUBSTR(s, 0)`, and a `position` of `0` is set to `1` (googlesql-functions/string_functions-2.md), so the whole string is returned instead of an empty string. The translation is changed to the GoogleSQL `RIGHT(s, len)` function.
- Corrected from the official docs: the example that migrates `OMIT RECORD IF COUNT(payload.pages.page_name) <= 80` used `ARRAY_LENGTH(payload.pages) > 80`. `COUNT(payload.pages.page_name)` counts only the pages whose `page_name` is not `NULL`, while `ARRAY_LENGTH` counts every element, so a record with more than 80 pages of which some have a `NULL` `page_name` was kept by the GoogleSQL query and omitted by the legacy SQL query. The filter is changed to `(SELECT COUNT(page_name) FROM UNNEST(payload.pages)) > 80`, and the two sentences around the example that described `ARRAY_LENGTH` are changed to match.
- Corrected from the official docs: the function comparison table maps `COUNT(arr) WITHIN RECORD` to `ARRAY_LENGTH(arr)` with no note. `COUNT` counts only non-`NULL` values, while `ARRAY_LENGTH` counts every element, so for a field in a repeated record, such as `payload.pages.page_name`, the results differ. A note with the subquery form is added to the row.
- Corrected from the official docs: the text says that the GoogleSQL query that replaces `__PARTITIONS_SUMMARY__` keeps the error handling consistent. It keeps the error for a table that is not partitioned, but the legacy SQL meta-table reads the table directly and fails when it doesn't exist, while the GoogleSQL query filters `INFORMATION_SCHEMA.PARTITIONS` by `table_name` and returns no rows for a missing table. A sentence that says so is added before the example.
- Corrected from the official docs: the coercion table said that `STRING` to `INT64`, `FLOAT64` or `BOOL`, and `STRING` to `TIMESTAMP`, are mostly supported by GoogleSQL. In googlesql-syntax/conversion_rules.md, `STRING` coerces to no other type, and only `STRING` literals and `STRING` query parameters coerce, to `DATE`, `DATETIME`, `TIME` and `TIMESTAMP` (Literal coercion and Query parameter coercion). The first row now says to cast explicitly, and the second says that only literals and query parameters are coerced, and that other `STRING` expressions such as columns need an explicit conversion.
- Corrected from the official docs: the function comparison table maps `INTEGER(x)` to `SAFE_CAST(x AS INT64)` with no note. Legacy SQL `INTEGER` returns the number of microseconds since the Unix epoch for a timestamp (legacy-sql/legacy-sql-1.md), while GoogleSQL cannot cast `TIMESTAMP` to `INT64` (googlesql-syntax/conversion_rules.md). A note that points to `UNIX_MICROS` for a `TIMESTAMP` input is added to the row.
- Corrected from the official docs: the text said that GoogleSQL `NOT IN` returns `NULL` if any value on the right hand side is `NULL`. In googlesql-syntax/operators.md, `NOT IN` returns `FALSE` first when the value set contains an equal value, so `1 NOT IN (1, NULL)` is `FALSE`; it returns `NULL` only when no value matches and a comparison produces `NULL`. The sentence is changed to that condition.
- Corrected from the official docs: the `TABLE_DATE_RANGE_STRICT` example that uses a `WITH` clause references the wildcard table `mydataset.sea_weather_*` in the same query as the check. If no table matches the wildcard, that reference can fail before the `IF` is evaluated, so the query may not return the `Not found suffixes` error. A sentence that says so and points to the scripting example, which runs the wildcard query only in the `ELSE` branch after the check, is added before the example. Because the existence check of both versions reads `INFORMATION_SCHEMA.TABLES`, the sentence also says that they need the permissions of that view (information-schema/tables.md), such as `bigquery.tables.list`, which access granted on the tables alone does not give.
- Corrected from the official docs: the GoogleSQL examples that replace `TABLE_DATE_RANGE` and `TABLE_DATE_RANGE_STRICT` filter the wildcard table with `_TABLE_SUFFIX BETWEEN '20160501' AND '20160509'`. That is a string comparison, so a table such as `sea_weather_20160501_backup` (suffix `20160501_backup`) is also read, while the legacy SQL functions read only the tables for the dates in the range. The three examples now also require `LENGTH(_TABLE_SUFFIX) = 8`, which with these bounds leaves only the suffixes `20160501` to `20160509`, and the note after the first example no longer names the `BETWEEN` filter alone.
- Corrected from the official docs: the function comparison table mapped legacy SQL `COUNT(DISTINCT x)` only to `APPROX_COUNT_DISTINCT(x)`, and the `COUNT` comparison said that the legacy SQL function returns an approximate count. In legacy-sql/legacy-sql-1.md, legacy SQL `COUNT(DISTINCT)` is exact up to a threshold, 1,000 by default or the second parameter `n` (that page calls `n` the threshold below which exact results are guaranteed and also says that results are exact up to that value; the comparison follows the second statement, which includes `n`). The row now gives GoogleSQL `COUNT(DISTINCT x)` for an exact count and `APPROX_COUNT_DISTINCT(x)` for an approximate count, and the comparison states the threshold.
- Corrected from the official docs: the function comparison table translated `PARSE_IP(addr_string)` as `NET.IPV4_TO_INT64(NET.IP_FROM_STRING(addr_string))` and `PARSE_PACKED_IP(addr_string)` as `NET.IP_FROM_STRING(addr_string)`. The legacy SQL functions return `NULL` for an invalid address (legacy-sql/legacy-sql-1.md), while `NET.IP_FROM_STRING` produces an error and `NET.IPV4_TO_INT64` throws an error when the input length isn't 4 (googlesql-functions/net_functions.md). The rows now use `NET.SAFE_IP_FROM_STRING`, and the `PARSE_IP` row calls `NET.IPV4_TO_INT64` only for a 4-byte address inside `IF`, whose unchosen branch is not evaluated (googlesql-functions/conditional_expressions.md).
- Corrected from the official docs: the `TABLE_DATE_RANGE` and `TABLE_DATE_RANGE_STRICT` examples query the wildcard table `mydataset.sea_weather_*`, and a wildcard table query cannot reference a view (tables-schemas-views/views-intro.md), so the query fails if a view such as `sea_weather_20160501_backup` shares the prefix, even when the `WHERE` filter excludes its suffix. The wildcard table also takes the schema of the most recently created matching table even when a `_TABLE_SUFFIX` filter excludes that table (https://docs.cloud.google.com/bigquery/docs/querying-wildcard-tables , retrieved 2026-11-20), so a matching backup table that lacks a selected column or gives it another type makes the query fail. Sentences that state both assumptions, and the `UNION ALL` alternative, are added before the first example.
- Corrected from the official docs: the two `ARRAY` subquery examples that return `page_names` and `title` could put `NULL` elements in an array of the query result, and GoogleSQL raises an error if the query result has an array which contains `NULL` elements (googlesql-syntax/data-types.md). Both examples now exclude `NULL` values in the subquery, so the arrays hold only the non-`NULL` values. Because `UNNEST` destroys the order of elements in the input array (googlesql-syntax/query-syntax-1.md, `WITH OFFSET`), both subqueries also take the offset with `WITH OFFSET` and order by it, so the arrays keep the order of the repeated field. In the `title` example, the rows are kept with an `EXISTS` test on `page_name` instead of `ARRAY_LENGTH(title) > 0`, so a row whose matching pages all have a `NULL` title is not dropped; the sentence after the example says so.
- Corrected from the official docs: `TABLE_QUERY` selects the tables before reading them, while the GoogleSQL examples filter `_TABLE_SUFFIX` with `REGEXP_CONTAINS`. The official docs say that a `_TABLE_SUFFIX` filter limits the tables scanned only when its condition is a constant expression (https://docs.cloud.google.com/bigquery/docs/querying-wildcard-tables , retrieved 2026-11-20) and don't say that a `REGEXP_CONTAINS` condition qualifies (the page has no mention of `REGEXP_CONTAINS`), so a sentence is added that says the examples can scan every table that matches the prefix, and so read more data than `TABLE_QUERY`, and that suggests a literal `IN` condition listing every needed suffix; the examples are kept as in the official docs.
- Corrected from the official docs: `INFORMATION_SCHEMA.PARTITIONS` returns two rows for the `__UNPARTITIONED__` partition when it has both long-term and active storage tier data, one for each storage tier (information-schema/partitions.md), so the migrated `__PARTITIONS_SUMMARY__` query could return that partition twice. The query now groups the rows by partition and returns the latest `last_modified_time` of the tiers. The `NULL` placeholder for `creation_time` is cast to `INT64`, so the column keeps an integer type like `last_modified_time`, which is milliseconds since the epoch from `UNIX_MILLIS`.
- Corrected from the official docs: the `ARRAY` subquery that returns `title` now leaves out `NULL` titles (see the note on the two `ARRAY` subquery examples), so its array can have fewer elements than the matching pages, and positions no longer match them. A sentence that says so and shows an array of `STRUCT`s (`SELECT AS STRUCT`, googlesql-syntax/query-syntax-1.md), whose elements are not `NULL` even when the `title` field is, is added for the case that needs one element for each page.
- Corrected from the official docs: the function comparison table maps `NEST(x)` to `ARRAY_AGG(x)` without a condition, but legacy SQL automatically flattens query results, so a `NEST` in the top-level query returns no repeated field, and `NEST` is meant for subselects that produce intermediate results (legacy-sql/legacy-sql-1.md). `ARRAY_AGG` returns an array in the result, so the row now says where it matches `NEST` and that `UNNEST` gives the flattened rows.
- Corrected from the official docs: the function comparison table maps `TOP(x, num), COUNT(*)`, which returns the values and their counts as rows, to `APPROX_TOP_COUNT(x, num)` with no note. `APPROX_TOP_COUNT` returns an array of `STRUCT`s with the fields `value` and `count` (googlesql-functions/approximate_aggregate_functions.md), so a note that says to expand it with `UNNEST` to get the rows is added.
- Corrected from the official docs: the `TABLE_QUERY` example that uses the entire table name and its GoogleSQL equivalent matched `gsod\d{3}0` and `\d{3}0` anywhere in the name, so a table such as `gsod2020_backup` also matched. The expressions are anchored as `^gsod[0-9]{3}0$` and `^\d{3}0$`, to match the years that end in `0` that the text describes. In the legacy SQL query, the digit class is written as `[0-9]`, because the second argument of `TABLE_QUERY` is a single-quoted string, which is read before the inner `r"..."` expression, and the escapes listed for legacy SQL strings do not include `\d` (legacy-sql/legacy-sql-2.md, Escaping special characters in strings); the GoogleSQL query uses a raw string, which keeps `\d`.
- Corrected from the official docs: the function comparison table linked `LOGICAL_OR` and `LOGICAL_AND`, which replace `SOME` and `EVERY`, to the logical operators (`AND`, `OR`, `NOT`) in googlesql-syntax/operators.md. The links now point to the aggregate functions `LOGICAL_OR` and `LOGICAL_AND` in googlesql-functions/aggregate_functions.md.
- Corrected from the official docs: after the partition example, the text offered filtering on `_TABLE_SUFFIX` as another option. `_TABLE_SUFFIX` contains the values matched by the table wildcard (https://docs.cloud.google.com/bigquery/docs/querying-wildcard-tables , retrieved 2026-11-20), so it cannot select a partition of the single partitioned table in the example. The sentence now limits it to date-sharded tables queried through a wildcard table.
- Corrected from the official docs: the comma operator section translates the legacy SQL comma between tables to `UNION ALL BY NAME` without a condition. In googlesql-syntax/query-syntax-3.md, `BY NAME` requires both inputs to have the same set of column names and raises an error otherwise, while `FULL [OUTER]` with `BY NAME` returns all columns and adds `NULL` for the missing ones. A sentence that says which form to use for inputs with different columns is added.
- `MD037` is disabled for this file because a verbatim string in the official text is a false positive for that rule.

## Related

- [Index of this directory](./README.md)

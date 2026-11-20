---
source: https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql
---

# Legacy SQL Syntax, Functions and Operators (part 1 of 2)

## Signature / Usage

This document details legacy SQL query syntax, functions and operators. The preferred query syntax
for BigQuery is [GoogleSQL syntax](../googlesql-syntax/query-syntax-1.md). For more information, see
[Legacy SQL feature
availability](https://docs.cloud.google.com/bigquery/docs/legacy-sql-feature-availability).

### Query syntax

**Note:** Keywords are *not* case-sensitive. In this document, keywords such
as `SELECT` are capitalized for illustration purposes.

#### SELECT clause

The `SELECT` clause specifies a list of expressions to be computed. Expressions in the
`SELECT` clause can contain field names, literals, and
[function calls](#supported-functions-and-operators) (including [aggregate functions](#aggregate-functions)
and [window functions](legacy-sql-2.md#window-functions)) as well as combinations of the three. The
expression list is comma-separated.

Each expression can be given an alias by adding a space followed by an identifier after the
expression. The optional `AS` keyword can be added between the expression and the alias
for improved readability. Aliases defined in a `SELECT` clause can be referenced in the
`GROUP BY`, `HAVING`, and `ORDER BY` clauses of the query, but
not by the `FROM`, `WHERE`, or `OMIT RECORD IF` clauses nor by
other expressions in the same `SELECT` clause.

**Notes:**

- If you use an [aggregate function](#aggregate-functions) in your `SELECT` clause, you must either use an aggregate function in all expressions or your query must have a `GROUP BY` clause which includes all non-aggregated fields in your `SELECT
  ` clause as grouping keys. For example:

  ```sql
  #legacySQL
  SELECT
    word,
    corpus,
    COUNT(word)
  FROM
    [bigquery-public-data:samples.shakespeare]
  WHERE
    word CONTAINS "th"
  GROUP BY
    word,
    corpus; /* Succeeds because all non-aggregated fields are group keys. */
  ```

  ```sql
  #legacySQL
  SELECT
    word,
    corpus,
    COUNT(word)
  FROM
    [bigquery-public-data:samples.shakespeare]
  WHERE
    word CONTAINS "th"
  GROUP BY
    word; /* Fails because corpus is not aggregated nor is it a group key. */
  ```
- You can use square brackets to escape [reserved words](../googlesql-syntax/lexical.md#reserved-keywords) so that you can use them as field name and aliases. For example, if you have a column named "partition", which is a reserved word in BigQuery syntax, the queries referencing that field fail with obscure error messages unless you escape it with square brackets:

  ```sql
  SELECT [partition] FROM ...
  ```

###### Example

This example defines aliases in the `SELECT` clause and then references one of them in
the `ORDER BY` clause. Notice that the *word* column can not be referenced using
the *word_alias* in the `WHERE` clause; it must be referenced by name. The
*len* alias also is not visible in the `WHERE` clause. It would be visible to a
`HAVING` clause.

```sql
#legacySQL
SELECT
  word AS word_alias,
  LENGTH(word) AS len
FROM
  [bigquery-public-data:samples.shakespeare]
WHERE
  word CONTAINS 'th'
ORDER BY
  len;
```

##### WITHIN modifier for aggregate functions

```text
aggregate_function WITHIN RECORD [ [ AS ] alias ]
```

The `WITHIN` keyword causes the aggregate function to aggregate across repeated values
within each record. For every input record, exactly one aggregated output will be produced. This
type of aggregation is referred to as *scoped aggregation* . Since scoped aggregation
produces output for every record, non-aggregated expressions can be selected alongside
scoped-aggregated expressions without using a `GROUP BY` clause.

Most commonly you will use the `RECORD` scope when using scoped aggregation. If you
have a very complex nested, repeated schema, you may find a need to perform aggregations within
sub-record scopes. This can be done by replacing the `RECORD` keyword in the syntax
above with the name of the node in your schema where you want the aggregation to be performed.
For more information about that advanced behavior, see
[Dealing with data](https://docs.cloud.google.com/bigquery/docs/data#within).

###### Example

This example performs a scoped `COUNT` aggregation and then filters and sorts the
records by the aggregated value.

```sql
#legacySQL
SELECT
  repository.url,
  COUNT(payload.pages.page_name) WITHIN RECORD AS page_count
FROM
  [bigquery-public-data:samples.github_nested]
HAVING
  page_count > 80
ORDER BY
  page_count DESC;
```

#### FROM clause

```text
FROM
  [project_name:]datasetId.tableId [ [ AS ] alias ] |
  (subquery) [ [ AS ] alias ] |
  JOIN clause |
  FLATTEN clause |
  table wildcard function
```

The `FROM` clause specifies the source data to be queried. BigQuery queries
can execute directly over tables, over subqueries, over joined tables, and over tables modified by
special-purpose operators described below. Combinations of these data sources can be queried using
the [comma](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#comma_as_union_all), which is the `UNION ALL` operator in
BigQuery.

##### Referencing tables

When referencing a table, both *datasetId* and *tableId* must be specified;
*project_name* is optional. If *project_name* is not specified, BigQuery
defaults to the current project. If your project name includes a dash, you must surround the entire
table reference with brackets.

###### Example

```text
[my-dashed-project:dataset1.tableName]
```

Tables can be given an alias by adding a space followed by an identifier after the table name. The
optional `AS` keyword can be added between the *tableId* and the alias for
improved readability.

When referencing columns from a table, you can use the simple column name or you can prefix the
column name with either the alias, if you specified one, or with the *datasetId* and
*tableId* as long as no *project_name* was specified. The *project_name*
cannot be included in the column prefix because the colon character is not allowed in field names.

###### Examples

This example references a column with no table prefix.

```sql
#legacySQL
SELECT
  word
FROM
  [bigquery-public-data:samples.shakespeare];
```

This example prefixes the column name with the *datasetId* and *tableId* . Notice
that the *project_name* cannot be included in this example. This method will only work if
the dataset is in your current default project.

```sql
#legacySQL
SELECT
  samples.shakespeare.word
FROM
  samples.shakespeare;
```

This example prefixes the column name with a table alias.

```sql
#legacySQL
SELECT
  t.word
FROM
  [bigquery-public-data:samples.shakespeare] AS t;
```

##### Integer-range partitioned tables

Legacy SQL supports using table
decorators to address a specific partition in an integer-range partitioned table.
The key to address a range partition is the start of the range.

The following example queries the range partition that starts with 30:

```sql
#legacySQL
SELECT
  *
FROM
  dataset.table$30;
```

Note that you cannot use legacy SQL to query across an entire integer-range partitioned table.
Instead, the query returns an error like the following:
`Querying tables partitioned on a field is not supported in Legacy SQL`

##### Using subqueries

A *subquery* is a nested `SELECT` statement wrapped in parentheses. The
expressions computed in the `SELECT` clause of the subquery are available to the outer
query just as columns of a [table](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#from_tables) would be available.

Subqueries can be used to compute aggregations and other expressions. The full range of SQL
operators are available in the subquery. This means a subquery can itself contain other
subqueries, subqueries can perform joins and grouping aggregations, etc.

##### Comma as `UNION ALL`

Unlike GoogleSQL, legacy SQL uses the comma as a `UNION ALL` operator rather
than a `CROSS JOIN` operator. This is a legacy behavior that evolved because
historically BigQuery did not support `CROSS JOIN` and BigQuery users regularly needed to write
`UNION ALL` queries. In GoogleSQL, queries that perform unions are particularly
verbose. Using the comma as the union operator allows such queries to be written much more
efficiently. For example, this query can be used to run a single query over logs from multiple
days.

```sql
#legacySQL
SELECT
  FORMAT_UTC_USEC(event.timestamp_in_usec) AS time,
  request_url
FROM
  [applogs.events_20120501],
  [applogs.events_20120502],
  [applogs.events_20120503]
WHERE
  event.username = 'root' AND
  NOT event.source_ip.is_internal;
```

Queries that union a large number of tables typically run more slowly than queries that process
the same amount of data from a single table. The difference in performance can be up to 50 ms per
additional table. A single query can union at most 1,000 tables.

##### Table wildcard functions

The term *table wildcard function* refers to a special type of function unique to BigQuery.
These functions are used in the `FROM` clause to match a collection of table names
using one of several types of filters. For example, the `TABLE_DATE_RANGE` function
can be used to query only a specific set of daily tables. For more information on these functions,
see [Table wildcard functions](legacy-sql-2.md#table-wildcard-functions).

##### FLATTEN operator

```text
(FLATTEN([project_name:]datasetId.tableId, field_to_be_flattened))
(FLATTEN((subquery), field_to_be_flattened))
```

Unlike typical SQL-processing systems, BigQuery is designed to handle repeated data. Because of
this, BigQuery users sometimes need to write queries that manipulate the structure of repeated
records. One way to do this is by using the `FLATTEN` operator.

`FLATTEN` converts one node in the schema from repeated to optional. Given a record
with one or more values for a repeated field, `FLATTEN` will create multiple records,
one for each value in the repeated field. All other fields selected from the record are duplicated
in each new output record. `FLATTEN` can be applied repeatedly in order to remove
multiple levels of repetition.

For more information and examples, see
[Dealing with data](https://docs.cloud.google.com/bigquery/docs/data#flatten).

##### JOIN operator

BigQuery supports multiple `JOIN` operators in each `FROM` clause.
Subsequent `JOIN` operations use the results of the previous `JOIN`
operation as the left `JOIN` input. Fields from any preceding `JOIN` input
can be used as keys in the `ON` clauses of subsequent `JOIN` operators.

###### JOIN types

BigQuery supports `INNER`, `[FULL|RIGHT|LEFT] OUTER` and
`CROSS JOIN` operations. If left unspecified, the default is `INNER`.

`CROSS JOIN` operations do not allow `ON` clauses. `CROSS JOIN`
can return a large amount of data and might result in a slow and inefficient query or in a query
that exceeds the maximum allowed per-query resources. Such queries will fail with an error. When
possible, prefer queries that do not use `CROSS JOIN`. For example, `CROSS JOIN
` is often used in places where [window functions](legacy-sql-2.md#window-functions) would
be more efficient.

###### EACH modifier

The `EACH` modifier is a hint that tells BigQuery to execute the `JOIN`
using multiple partitions. This is particularly useful when you know that both sides of the
`JOIN` are large. The `EACH` modifier can't be used in
`CROSS JOIN` clauses.

`EACH` used to be encouraged in many cases, but this is no longer the case. When
possible, use `JOIN` without the `EACH` modifier for better performance.
Use `JOIN EACH` when your query has failed with a resources exceeded error message.

###### Semi-join and Anti-join

In addition to supporting `JOIN` in the `FROM` clause, BigQuery also
supports two types of joins in the `WHERE` clause: semi-join and anti-semi-join. A
semi-join is specified using the `IN` keyword with a subquery; anti-join, using the
`NOT IN` keywords.

**Examples**

The following query uses a semi-join to find ngrams where the first word in the ngram is also
the second word in another ngram that has "AND" as the third word in the ngram.

```sql
#legacySQL
SELECT
  ngram
FROM
  [bigquery-public-data:samples.trigrams]
WHERE
  first IN (SELECT
              second
            FROM
              [bigquery-public-data:samples.trigrams]
            WHERE
              third = "AND")
LIMIT 10;
```

The following query uses a semi-join to return the number of women over age 50 who gave birth in
the 10 states with the most births.

```sql
#legacySQL
SELECT
  mother_age,
  COUNT(mother_age) total
FROM
  [bigquery-public-data:samples.natality]
WHERE
  state IN (SELECT
              state
            FROM
              (SELECT
                 state,
                 COUNT(state) total
               FROM
                 [bigquery-public-data:samples.natality]
               GROUP BY
                 state
               ORDER BY
                 total DESC
               LIMIT 10))
  AND mother_age > 50
GROUP BY
  mother_age
ORDER BY
  mother_age DESC
```

To see the numbers for the other 40 states, you can use an anti-join. The following query is
nearly identical to the previous example, but uses `NOT IN` instead of `IN`
to return the number of women over age 50 who gave birth in the 40 states with the least births.

```sql
#legacySQL
SELECT
  mother_age,
  COUNT(mother_age) total
FROM
  [bigquery-public-data:samples.natality]
WHERE
  state NOT IN (SELECT
                  state
                FROM
                  (SELECT
                     state,
                     COUNT(state) total
                   FROM
                     [bigquery-public-data:samples.natality]
                   GROUP BY
                     state
                   ORDER BY
                     total DESC
                   LIMIT 10))
  AND mother_age > 50
GROUP BY
  mother_age
ORDER BY
  mother_age DESC
```

Notes:

- BigQuery does not support correlated semi- or anti-semi-joins. The subquery can not reference any fields from the outer query.
- The subquery used in a semi- or anti-semi-join must select exactly one field.
- The types of the selected field and the field being used from the outer query in the `
  WHERE` clause must match exactly. BigQuery will not do any type coercion for semi- or anti-semi-joins.

#### WHERE clause

The `WHERE` clause, sometimes called the predicate, filters records produced by the
`FROM` clause using a boolean expression. Multiple conditions can be joined by boolean
`AND` and `OR` clauses, optionally surrounded by parentheses---()---
to group them. The fields listed in a `WHERE` clause do not need to be selected in the
corresponding `SELECT` clause and the `WHERE` clause expression cannot
reference expressions computed in the `SELECT` clause of the query to which the
`WHERE` clause belongs.

**Note:** Aggregate functions cannot be used in the `WHERE` clause. Use a
[`HAVING`](#having-clause) clause and an outer query if you need to filter on the
output of an aggregate function.

###### Example

The following example uses a disjunction of boolean expressions in the `WHERE`
clause---the two expressions joined by an `OR` operator. An input record will pass
through the `WHERE` filter if either of the expressions returns `true`.

```sql
#legacySQL
SELECT
  word
FROM
  [bigquery-public-data:samples.shakespeare]
WHERE
  (word CONTAINS 'prais' AND word CONTAINS 'ing') OR
  (word CONTAINS 'laugh' AND word CONTAINS 'ed');
```

#### OMIT RECORD IF clause

The `OMIT RECORD IF` clause is a construct that is unique to BigQuery. It is
particularly useful for dealing with nested, repeated schemas. It is similar to a `WHERE
` clause, but different in two important ways. First, it uses an exclusionary condition,
which means that records are omitted if the expression returns `true`, but kept if the
expression returns `false` or `null`. Second, the `OMIT RECORD IF
` clause can (and usually does) use scoped aggregate functions in its condition.

In addition to filtering full records, `OMIT...IF` can specify a more narrow scope
to filter just portions of a record. This is done by using the name of a non-leaf node in your
schema rather than `RECORD` in your `OMIT...IF` clause. This functionality
is rarely used by BigQuery users. You can find more documentation about this advanced behavior
linked from the [`WITHIN`](#within-modifier-for-aggregate-functions) documentation above.

If you use [`OMIT...IF`](#omit-record-if-clause)
to exclude a portion of a record in a repeating field, and the query also
selects other independently repeating fields, BigQuery omits a
portion of the other repeated records in the query. If you see the error
`Cannot perform OMIT IF on repeated scope <scope> with independently repeating pass through field <field>,`
we recommend that you switch to GoogleSQL. For information about migrating
`OMIT...IF` statements to GoogleSQL, see
[Migrating
to GoogleSQL](migrating-from-legacy-sql.md#filtering-rows-with-omit-record-if).

###### Example

Referring back to the example used for the `WITHIN` modifier, `OMIT RECORD IF
` can be used to accomplish the same thing `WITHIN` and `HAVING` were
used to do in that example.

```sql
#legacySQL
SELECT
  repository.url
FROM
  [bigquery-public-data:samples.github_nested]
OMIT RECORD IF
  COUNT(payload.pages.page_name) <= 80;
```

#### GROUP BY clause

The `GROUP BY` clause lets you group rows that have the same values for a given
field or set of fields so that you can compute aggregations of related fields. Grouping occurs
after the filtering performed in the `WHERE` clause but before the expressions in the
`SELECT` clause are computed. The expression results cannot be used as group keys in
the `GROUP BY` clause.

###### Example

This query finds the top ten most common *first words* in the trigrams sample dataset.
In addition to demonstrating the use of the `GROUP BY` clause, it demonstrates how
positional indexes can be used instead of field names in the `GROUP BY` and
`ORDER BY` clauses.

```sql
#legacySQL
SELECT
  first,
  COUNT(ngram)
FROM
  [bigquery-public-data:samples.trigrams]
GROUP BY
  1
ORDER BY
  2 DESC
LIMIT 10;
```

Aggregation performed using a `GROUP BY` clause is called *grouped aggregation* . Unlike [scoped aggregation](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#scopedaggregation), grouped aggregation is
common in most SQL processing systems.

##### The `EACH` modifier

The `EACH` modifier is a hint that tells BigQuery to execute the `GROUP BY`
using multiple partitions. This is particularly useful when you know that your dataset contains a
large number of distinct values for the group keys.

`EACH` used to be encouraged in many cases, but this is no longer the case.
Using `GROUP BY` without the `EACH` modifier usually provides better performance.
Use `GROUP EACH BY` when your query has failed with a resources exceeded error message.

##### The `ROLLUP` function

When the `ROLLUP` function is used, BigQuery adds extra rows to the query result that
represent *rolled up* aggregations. All fields listed after `ROLLUP` must be
enclosed in a single set of parentheses. In rows added because of the `ROLLUP`
function, `NULL` indicates the columns for which the aggregation is rolled up.

###### Example

This query generates per-year counts of male and female births from the sample natality dataset.

```sql
#legacySQL
SELECT
  year,
  is_male,
  COUNT(1) as count
FROM
  [bigquery-public-data:samples.natality]
WHERE
  year >= 2000
  AND year <= 2002
GROUP BY
  ROLLUP(year, is_male)
ORDER BY
  year,
  is_male;
```

These are the results of the query. Notice that there are rows where one or both of the group keys
are `NULL`. These rows are the *rollup* rows.

```text
+------+---------+----------+
| year | is_male |  count   |
+------+---------+----------+
| NULL |    NULL | 12122730 |
| 2000 |    NULL |  4063823 |
| 2000 |   false |  1984255 |
| 2000 |    true |  2079568 |
| 2001 |    NULL |  4031531 |
| 2001 |   false |  1970770 |
| 2001 |    true |  2060761 |
| 2002 |    NULL |  4027376 |
| 2002 |   false |  1966519 |
| 2002 |    true |  2060857 |
+------+---------+----------+
```

When using the `ROLLUP` function, you can use the `GROUPING` function
to distinguish between rows that were added because of the `ROLLUP` function and rows
that actually have a `NULL` value for the group key.

###### Example

This query adds the `GROUPING` function to the previous example to better identify the
rows added because of the `ROLLUP` function.

```sql
#legacySQL
SELECT
  year,
  GROUPING(year) as rollup_year,
  is_male,
  GROUPING(is_male) as rollup_gender,
  COUNT(1) as count
FROM
  [bigquery-public-data:samples.natality]
WHERE
  year >= 2000
  AND year <= 2002
GROUP BY
  ROLLUP(year, is_male)
ORDER BY
  year,
  is_male;
```

These are the result the new query returns.

```text
+------+-------------+---------+---------------+----------+
| year | rollup_year | is_male | rollup_gender |  count   |
+------+-------------+---------+---------------+----------+
| NULL |           1 |    NULL |             1 | 12122730 |
| 2000 |           0 |    NULL |             1 |  4063823 |
| 2000 |           0 |   false |             0 |  1984255 |
| 2000 |           0 |    true |             0 |  2079568 |
| 2001 |           0 |    NULL |             1 |  4031531 |
| 2001 |           0 |   false |             0 |  1970770 |
| 2001 |           0 |    true |             0 |  2060761 |
| 2002 |           0 |    NULL |             1 |  4027376 |
| 2002 |           0 |   false |             0 |  1966519 |
| 2002 |           0 |    true |             0 |  2060857 |
+------+-------------+---------+---------------+----------+
```

**Notes:**

- Non-aggregated fields in the `SELECT` clause *must* be listed in the `GROUP BY` clause.

  ```sql
  #legacySQL
  SELECT
    word,
    corpus,
    COUNT(word)
  FROM
    [bigquery-public-data:samples.shakespeare]
  WHERE
    word CONTAINS "th"
  GROUP BY
    word,
    corpus; /* Succeeds because all non-aggregated fields are group keys. */
  ```

  ```sql
  #legacySQL
  SELECT
    word,
    corpus,
    COUNT(word)
  FROM
    [bigquery-public-data:samples.shakespeare]
  WHERE
    word CONTAINS "th"
  GROUP BY
    word;  /* Fails because corpus is not aggregated nor is it a group key. */
  ```
- Expressions computed in the `SELECT` clause cannot be used in the corresponding `
  GROUP BY` clause.

  ```sql
  #legacySQL
  SELECT
    word,
    corpus,
    COUNT(word) word_count
  FROM
    [bigquery-public-data:samples.shakespeare]
  WHERE
    word CONTAINS "th"
  GROUP BY
    word,
    corpus,
    word_count;  /* Fails because word_count is not visible to this GROUP BY clause. */
  ```
- Grouping by float and double values is not supported, because the equality function for those types is not well-defined.
- Because the system is interactive, queries that produce a large number of groups might fail. The use of the [`TOP`](#top-function) [function](#top-function) instead of `GROUP BY` might solve some scaling problems.

#### HAVING clause

The `HAVING` clause behaves exactly like the [`WHERE`](#where-clause)
clause except that it is evaluated after the `SELECT` clause so the results of all
computed expressions are visible to the `HAVING` clause. The HAVING clause can only
refer to outputs of the corresponding `SELECT`clause.

###### Example

This query computes the most common *first* words in the ngram sample dataset that contain
the letter a and occur at most 10,000 times.

```sql
#legacySQL
SELECT
  first,
  COUNT(ngram) ngram_count
FROM
  [bigquery-public-data:samples.trigrams]
GROUP BY
  1
HAVING
  first contains "a"
  AND ngram_count < 10000
ORDER BY
  2 DESC
LIMIT 10;
```

#### ORDER BY clause

The `ORDER BY` clause sorts the results of a query in ascending or descending order
using one or more key fields. To sort by multiple fields or aliases, enter them as a
comma-separated list. The results are sorted on the fields in the order in which they are listed.
Use `DESC` (descending) or `ASC` (ascending) to specify the sort direction.
`ASC` is the default. A different sort direction can be specified for each sort key.

The `ORDER BY` clause is evaluated after the `SELECT` clause so it can
reference the output of any expression computed in the `SELECT`. If a field is given
an alias in the `SELECT` clause, the alias must be used in the `ORDER BY`
clause.

#### LIMIT clause

The `LIMIT` clause limits the number of rows in the returned result set. Since BigQuery
queries regularly operate over very large numbers of rows, `LIMIT` is a good way to
avoid long-running queries by processing only a subset of the rows.

**Notes:**

- The `LIMIT` clause will stop processing and return results when it satisfies your requirements. This can reduce processing time for some queries, but when you specify aggregate functions such as COUNT or `ORDER BY` clauses, the full result set must still be processed before returning results. The `LIMIT` clause is the last to be evaluated.
- A query with a `LIMIT` clause may still be non-deterministic if there is no operator in the query that guarantees the ordering of the output result set. This is because BigQuery executes using a large number of parallel workers. The order in which parallel jobs return is not guaranteed.
- The `LIMIT` clause cannot contain any functions; it takes only a numeric constant.
- When the `LIMIT` clause is used, the total bytes processed and the bytes billed can vary for the same query.

### Query grammar

The individual clauses of BigQuery `SELECT` statements are described in detail
[above](#query-syntax). Here we present the full grammar of `SELECT`
statements in a compact form with links back to the individual sections.

```sql
query:
    SELECT { * | field_path.* | expression } [ [ AS ] alias ] [ , ... ]
    [ FROM from_body
      [ WHERE bool_expression ]
      [ OMIT RECORD IF bool_expression]
      [ GROUP [ EACH ] BY [ ROLLUP ] { field_name_or_alias } [ , ... ] ]
      [ HAVING bool_expression ]
      [ ORDER BY field_name_or_alias [ { DESC | ASC } ] [, ... ] ]
      [ LIMIT n ]
    ];

from_body:
    {
      from_item [, ...] |  # Warning: Comma means UNION ALL here
      from_item [ join_type ] JOIN [ EACH ] from_item [ ON join_predicate ] |
      (FLATTEN({ table_name | (query) }, field_name_or_alias)) |
      table_wildcard_function
    }

from_item:
    { table_name | (query) } [ [ AS ] alias ]

join_type:
    { INNER | [ FULL ] [ OUTER ] | RIGHT [ OUTER ] | LEFT [ OUTER ] | CROSS }

join_predicate:
    field_from_one_side_of_the_join = field_from_the_other_side_of_the_join [ AND ...]

expression:
    {
      literal_value |
      field_name_or_alias |
      function_call
    }

bool_expression:
    {
      expression_which_results_in_a_boolean_value |
      bool_expression AND bool_expression |
      bool_expression OR bool_expression |
      NOT bool_expression
    }
```

**Notation:**

- Square brackets "\[ \]" indicate optional clauses.
- Curly braces "{ }" enclose a set of options.
- The vertical bar "\|" indicates a logical OR.
- A comma or keyword followed by an ellipsis within square brackets "\[, ... \]" indicates that the preceding item can repeat in a list with the specified separator.
- Parentheses "( )" indicate literal parentheses.

### Supported functions and operators

Most `SELECT` statement clauses support functions. Fields
referenced in a function don't need to be listed in any `SELECT`
clause. Therefore, the following query is valid, even though the
`clicks` field is not displayed directly:

```sql
#legacySQL
SELECT country, SUM(clicks) FROM table GROUP BY country;
```

| Aggregate functions ||
|---|---|
| [`AVG()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#avg) | Returns the average of the values for a group of rows ... |
| [`BIT_AND()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#bit_and) | Returns the result of a bitwise AND operation ... |
| [`BIT_OR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#bit_or) | Returns the result of a bitwise OR operation ... |
| [`BIT_XOR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#bit_xor) | Returns the result of a bitwise XOR operation ... |
| [`CORR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#corr) | Returns the Pearson correlation coefficient of a set of number pairs. |
| [`COUNT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#count) | Returns the total number of values ... |
| [`COUNT([DISTINCT])`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#countdistinct) | Returns the total number of non-NULL values ... |
| [`COVAR_POP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#covar_pop) | Computes the population covariance of the values ... |
| [`COVAR_SAMP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#covar_samp) | Computes the sample covariance of the values ... |
| [`EXACT_COUNT_DISTINCT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#exact_count_distinct) | Returns the exact number of non-NULL, distinct values for the specified field. |
| [`FIRST()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#first) | Returns the first sequential value in the scope of the function. |
| [`GROUP_CONCAT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#group_concat) | Concatenates multiple strings into a single string ... |
| [`GROUP_CONCAT_UNQUOTED()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#group_concat_unquoted) | Concatenates multiple strings into a single string ... will not add double quotes ... |
| [`LAST()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#last) | Returns the last sequential value ... |
| [`MAX()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#max) | Returns the maximum value ... |
| [`MIN()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#min) | Returns the minimum value ... |
| [`NEST()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#nest) | Aggregates all values in the current aggregation scope into a repeated field. |
| [`NTH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#nth) | Returns the nth sequential value ... |
| [`QUANTILES()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#quantiles) | Computes approximate minimum, maximum, and quantiles ... |
| [`STDDEV()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#stddev) | Returns the standard deviation ... |
| [`STDDEV_POP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#stddev_pop) | Computes the population standard deviation ... |
| [`STDDEV_SAMP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#stddev_samp) | Computes the sample standard deviation ... |
| [`SUM()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#sum) | Returns the sum total of the values ... |
| [`TOP() ... COUNT(*)`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#top) | Returns the top max_values records by frequency. |
| [`UNIQUE()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#unique) | Returns the set of unique, non-NULL values ... |
| [`VARIANCE()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#variance) | Computes the variance of the values ... |
| [`VAR_POP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#var_pop) | Computes the population variance of the values ... |
| [`VAR_SAMP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#var_samp) | Computes the sample variance of the values ... |

| Arithmetic operators ||
|---|---|
| [`+`](#arithmetic-operators) | Addition |
| [`-`](#arithmetic-operators) | Subtraction |
| [`*`](#arithmetic-operators) | Multiplication |
| [`/`](#arithmetic-operators) | Division |
| [`%`](#arithmetic-operators) | Modulo |

| Bitwise functions ||
|---|---|
| [`&`](#bitwise-functions) | Bitwise AND |
| [`\|`](#bitwise-functions) | Bitwise OR |
| [`^`](#bitwise-functions) | Bitwise XOR |
| [`<<`](#bitwise-functions) | Bitwise shift left |
| [`>>`](#bitwise-functions) | Bitwise shift right |
| [`~`](#bitwise-functions) | Bitwise NOT |
| [`BIT_COUNT()`](#bitwise-functions) | Returns the number of bits ... |

| Casting functions ||
|---|---|
| [`BOOLEAN()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#boolean) | Cast to boolean. |
| [`BYTES()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#bytes) | Cast to bytes. |
| [`CAST(expr AS type)`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#cast) | Converts `expr` into a variable of type `type`. |
| [`FLOAT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#float) | Cast to double. |
| [`HEX_STRING()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#hex_string) | Cast to hexadecimal string. |
| [`INTEGER()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#integer) | Cast to integer. |
| [`STRING()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#string) | Cast to string. |

| Comparison functions ||
|---|---|
| [`expr1 = expr2`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#equals) | Returns `true` if the expressions are equal. |
| [`expr1 != expr2` `expr1 <> expr2`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#not-equals) | Returns `true` if the expressions are not equal. |
| [`expr1 > expr2`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#greater-than) | Returns `true` if `expr1` is greater than `expr2`. |
| [`expr1 < expr2`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#less-than) | Returns `true` if `expr1` is less than `expr2`. |
| [`expr1 >= expr2`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#greater-or-equal) | Returns `true` if `expr1` is greater than or equal to `expr2`. |
| [`expr1 <= expr2`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#less-or-equal) | Returns `true` if `expr1` is less than or equal to `expr2`. |
| [`expr1 BETWEEN expr2 AND expr3`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#between) | Returns `true` if the value of `expr1` is between `expr2` and `expr3`, inclusive. |
| [`expr IS NULL`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#is-null) | Returns `true` if `expr` is NULL. |
| [`expr IN()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#in) | Returns `true` if `expr` matches `expr1`, `expr2`, or any value in the parentheses. |
| [`COALESCE()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#coalesce) | Returns the first argument that isn't NULL. |
| [`GREATEST()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#greatest) | Returns the largest `numeric_expr` parameter. |
| [`IFNULL()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#ifnull) | If argument is not null, returns the argument. |
| [`IS_INF()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#is_inf) | Returns `true` if positive or negative infinity. |
| [`IS_NAN()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#is_nan) | Returns `true` if argument is `NaN`. |
| [`IS_EXPLICITLY_DEFINED()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#is_explicitly_defined) | deprecated: Use `expr IS NOT NULL` instead. |
| [`LEAST()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#least) | Returns the smallest argument `numeric_expr` parameter. |
| [`NVL()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#nvl) | If `expr` is not null, returns `expr`, otherwise returns `null_default`. |

| Date and time functions ||
|---|---|
| [`CURRENT_DATE()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#current_date) | Returns current date in the format `%Y-%m-%d`. |
| [`CURRENT_TIME()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#current_time) | Returns the server's current time in the format `%H:%M:%S`. |
| [`CURRENT_TIMESTAMP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#current_timestamp) | Returns the server's current time in the format `%Y-%m-%d %H:%M:%S`. |
| [`DATE()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#date) | Returns the date in the format `%Y-%m-%d`. |
| [`DATE_ADD()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#date_add) | Adds the specified interval to a TIMESTAMP data type. |
| [`DATEDIFF()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#datediff) | Returns the number of days between two TIMESTAMP data types. |
| [`DAY()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#day) | Returns the day of the month as an integer between 1 and 31. |
| [`DAYOFWEEK()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#dayofweek) | Returns the day of the week as an integer between 1 (Sunday) and 7 (Saturday). |
| [`DAYOFYEAR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#dayofyear) | Returns the day of the year as an integer between 1 and 366. |
| [`FORMAT_UTC_USEC()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#format_utc_usec) | Returns a UNIX timestamp in the format `YYYY-MM-DD HH:MM:SS.uuuuuu`. |
| [`HOUR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#hour) | Returns the hour of a TIMESTAMP as an integer between 0 and 23. |
| [`MINUTE()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#minute) | Returns the minutes of a TIMESTAMP as an integer between 0 and 59. |
| [`MONTH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#month) | Returns the month of a TIMESTAMP as an integer between 1 and 12. |
| [`MSEC_TO_TIMESTAMP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#msec_to_timestamp) | Converts a UNIX timestamp in milliseconds to a TIMESTAMP. |
| [`NOW()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#now) | Returns the current UNIX timestamp in microseconds. |
| [`PARSE_UTC_USEC()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#parse_utc_usec) | Converts a date string to a UNIX timestamp in microseconds. |
| [`QUARTER()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#quarter) | Returns the quarter of the year of a TIMESTAMP as an integer between 1 and 4. |
| [`SEC_TO_TIMESTAMP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#sec_to_timestamp) | Converts a UNIX timestamp in seconds to a TIMESTAMP. |
| [`SECOND()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#second) | Returns the seconds of a TIMESTAMP as an integer between 0 and 59. |
| [`STRFTIME_UTC_USEC()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#strftime_utc_usec) | Returns a date string in the format *date_format_str*. |
| [`TIME()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#time) | Returns a TIMESTAMP in the format `%H:%M:%S`. |
| [`TIMESTAMP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#timestamp) | Convert a date string to a TIMESTAMP. |
| [`TIMESTAMP_TO_MSEC()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#timestamp_to_msec) | Converts a TIMESTAMP to a UNIX timestamp in milliseconds. |
| [`TIMESTAMP_TO_SEC()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#timestamp_to_sec) | Converts a TIMESTAMP to a UNIX timestamp in seconds. |
| [`TIMESTAMP_TO_USEC()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#timestamp_to_usec) | Converts a TIMESTAMP to a UNIX timestamp in microseconds. |
| [`USEC_TO_TIMESTAMP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#usec_to_timestamp) | Converts a UNIX timestamp in microseconds to a TIMESTAMP. |
| [`UTC_USEC_TO_DAY()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#utc_usec_to_day) | Shifts a UNIX timestamp in microseconds to the beginning of the day it occurs in. |
| [`UTC_USEC_TO_HOUR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#utc_usec_to_hour) | Shifts a UNIX timestamp in microseconds to the beginning of the hour it occurs in. |
| [`UTC_USEC_TO_MONTH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#utc_usec_to_month) | Shifts a UNIX timestamp in microseconds to the beginning of the month it occurs in. |
| [`UTC_USEC_TO_WEEK()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#utc_usec_to_week) | Returns a UNIX timestamp in microseconds that represents a day in the week. |
| [`UTC_USEC_TO_YEAR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#utc_usec_to_year) | Returns a UNIX timestamp in microseconds that represents the year. |
| [`WEEK()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#week) | Returns the week of a TIMESTAMP as an integer between 1 and 53. |
| [`YEAR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#year) | Returns the year of a TIMESTAMP. |

| IP functions ||
|---|---|
| [`FORMAT_IP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#format_ip) | Converts 32 least significant bits of `integer_value` to human-readable IPv4 address string. |
| [`PARSE_IP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#parse_ip) | Converts a string representing IPv4 address to unsigned integer value. |
| [`FORMAT_PACKED_IP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#format-packed-ip) | Returns a human-readable IP address in the form `10.1.5.23` or `2620:0:1009:1:216:36ff:feef:3f`. |
| [`PARSE_PACKED_IP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#parse-packed-ip) | Returns an IP address in [BYTES](https://docs.cloud.google.com/bigquery/data-types#bytes-type). |

| JSON functions ||
|---|---|
| [`JSON_EXTRACT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#json_extract) | Selects a value according to the JSONPath expression and returns a JSON string. |
| [`JSON_EXTRACT_SCALAR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#json_extract_scalar) | Selects a value according to the JSONPath expression and returns a JSON scalar. |

| Logical operators ||
|---|---|
| [`expr AND expr`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#and) | Returns `true` if both expressions are true. |
| [`expr OR expr`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#or) | Returns `true` if one or both expressions are true. |
| [`NOT expr`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#not) | Returns `true` if the expression is false. |

| Mathematical functions ||
|---|---|
| [`ABS()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#abs) | Returns the absolute value of the argument. |
| [`ACOS()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#acos) | Returns the arc cosine of the argument. |
| [`ACOSH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#acosh) | Returns the arc hyperbolic cosine of the argument. |
| [`ASIN()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#asin) | Returns the arc sine of the argument. |
| [`ASINH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#asinh) | Returns the arc hyperbolic sine of the argument. |
| [`ATAN()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#atan) | Returns the arc tangent of the argument. |
| [`ATANH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#atanh) | Returns the arc hyperbolic tangent of the argument. |
| [`ATAN2()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#atan2) | Returns the arc tangent of the two arguments. |
| [`CEIL()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#ceil) | Rounds the argument up to the nearest whole number and returns the rounded value. |
| [`COS()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#cos) | Returns the cosine of the argument. |
| [`COSH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#cosh) | Returns the hyperbolic cosine of the argument. |
| [`DEGREES()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#degrees) | Converts from radians to degrees. |
| [`EXP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#exp) | Returns `e` to the power of the argument. |
| [`FLOOR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#floor) | Rounds the argument down to the nearest whole number. |
| [`LN()` `LOG()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#ln) | Returns the natural logarithm of the argument. |
| [`LOG2()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#log2) | Returns the Base-2 logarithm of the argument. |
| [`LOG10()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#log10) | Returns the Base-10 logarithm of the argument. |
| [`PI()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#pi) | Returns the constant π. |
| [`POW()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#pow) | Returns first argument to the power of the second argument. |
| [`RADIANS()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#radians) | Converts from degrees to radians. |
| [`RAND()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#rand) | Returns a random float value in the range 0.0 \<= value \< 1.0. |
| [`ROUND()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#round) | Rounds the argument either up or down to the nearest whole number. |
| [`SIN()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#sin) | Returns the sine of the argument. |
| [`SINH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#sinh) | Returns the hyperbolic sine of the argument. |
| [`SQRT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#sqrt) | Returns the square root of the expression. |
| [`TAN()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#tan) | Returns the tangent of the argument. |
| [`TANH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#tanh) | Returns the hyperbolic tangent of the argument. |

| Regular expression functions ||
|---|---|
| [`REGEXP_MATCH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#regexp_match) | Returns true if the argument matches the regular expression. |
| [`REGEXP_EXTRACT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#regexp_extract) | Returns the portion of the argument that matches the capturing group within the regular expression. |
| [`REGEXP_REPLACE()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#regexp_replace) | Replaces a substring that matches a regular expression. |

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

| Table wildcard functions ||
|---|---|
| [`TABLE_DATE_RANGE()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#table-date-range) | Queries multiple daily tables that span a date range. |
| [`TABLE_DATE_RANGE_STRICT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#table-date-range-strict) | Queries multiple daily tables that span a date range, with no missing dates. |
| [`TABLE_QUERY()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#table-query) | Queries tables whose names match a specified predicate. |

| URL functions ||
|---|---|
| [`HOST()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#host) | Given a URL, returns the hostname as a string. |
| [`DOMAIN()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#domain) | Given a URL, returns the domain as a string. |
| [`TLD()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#tld) | Given a URL, returns the top-level domain plus any country domain in the URL. |

| Window functions ||
|---|---|
| [`AVG()` `COUNT(*)` `COUNT([DISTINCT])` `MAX()` `MIN()` `STDDEV()` `SUM()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#analytics) | The same operation as the corresponding [Aggregate functions](#aggregate-functions), but are computed over a window defined by the OVER clause. |
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

### Aggregate functions

Aggregate functions return values that represent summaries of larger sets of data, which makes these functions particularly useful for analyzing logs. An aggregate function operates against a collection of values and returns a single value per table, group, or scope:

- Table aggregation Uses an aggregate function to summarize all qualifying rows in the table. For example:

  `SELECT COUNT(f1) FROM ds.Table;`
- Group aggregation Uses an aggregate function and a `GROUP BY` clause that specifies a non-aggregated field to summarize rows by group. For example:

  `SELECT COUNT(f1) FROM ds.Table GROUP BY b1;`

  The [TOP](https://docs.cloud.google.com/bigquery/docs/query-reference#top-function) function represents a specialized case of group aggregation.
- Scoped aggregation

  *This feature applies only to tables that have [nested fields](https://docs.cloud.google.com/bigquery/docs/data#nested).* Uses an aggregate function and the [`WITHIN`](https://docs.cloud.google.com/bigquery/docs/data#within) keyword to aggregate repeated values within a defined scope. For example:

  `SELECT COUNT(m1.f2) WITHIN RECORD FROM Table;`

  The scope can be `RECORD`, which corresponds to entire row, or a node (repeated field in a row). Aggregation functions operate over the values within the scope and return aggregated results for each record or node.

You can apply a restriction to an aggregate function using one of the following options:

- An alias in a subselect query. The restriction is specified in the outer `WHERE` clause.

  ```sql
  #legacySQL
  SELECT corpus, count_corpus_words
  FROM
    (SELECT corpus, count(word) AS count_corpus_words
    FROM [bigquery-public-data:samples.shakespeare]
    GROUP BY corpus) AS sub_shakespeare
  WHERE count_corpus_words > 4000
  ```
- An alias in a [HAVING clause](https://docs.cloud.google.com/bigquery/query-reference#having).

  ```sql
  #legacySQL
  SELECT corpus, count(word) AS count_corpus_words
  FROM [bigquery-public-data:samples.shakespeare]
  GROUP BY corpus
  HAVING count_corpus_words > 4000;
  ```

You can also refer to an alias in the `GROUP BY` or `ORDER BY` clauses.

#### Syntax

| Aggregate functions ||
|---|---|
| [`AVG()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#avg) | Returns the average of the values for a group of rows ... |
| [`BIT_AND()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#bit_and) | Returns the result of a bitwise AND operation ... |
| [`BIT_OR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#bit_or) | Returns the result of a bitwise OR operation ... |
| [`BIT_XOR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#bit_xor) | Returns the result of a bitwise XOR operation ... |
| [`CORR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#corr) | Returns the Pearson correlation coefficient of a set of number pairs. |
| [`COUNT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#count) | Returns the total number of values ... |
| [`COUNT([DISTINCT])`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#countdistinct) | Returns the total number of non-NULL values ... |
| [`COVAR_POP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#covar_pop) | Computes the population covariance of the values ... |
| [`COVAR_SAMP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#covar_samp) | Computes the sample covariance of the values ... |
| [`EXACT_COUNT_DISTINCT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#exact_count_distinct) | Returns the exact number of non-NULL, distinct values for the specified field. |
| [`FIRST()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#first) | Returns the first sequential value in the scope of the function. |
| [`GROUP_CONCAT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#group_concat) | Concatenates multiple strings into a single string ... |
| [`GROUP_CONCAT_UNQUOTED()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#group_concat_unquoted) | Concatenates multiple strings into a single string ... will not add double quotes ... |
| [`LAST()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#last) | Returns the last sequential value ... |
| [`MAX()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#max) | Returns the maximum value ... |
| [`MIN()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#min) | Returns the minimum value ... |
| [`NEST()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#nest) | Aggregates all values in the current aggregation scope into a repeated field. |
| [`NTH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#nth) | Returns the nth sequential value ... |
| [`QUANTILES()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#quantiles) | Computes approximate minimum, maximum, and quantiles ... |
| [`STDDEV()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#stddev) | Returns the standard deviation ... |
| [`STDDEV_POP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#stddev_pop) | Computes the population standard deviation ... |
| [`STDDEV_SAMP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#stddev_samp) | Computes the sample standard deviation ... |
| [`SUM()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#sum) | Returns the sum total of the values ... |
| [`TOP() ... COUNT(*)`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#top) | Returns the top max_values records by frequency. |
| [`UNIQUE()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#unique) | Returns the set of unique, non-NULL values ... |
| [`VARIANCE()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#variance) | Computes the variance of the values ... |
| [`VAR_POP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#var_pop) | Computes the population variance of the values ... |
| [`VAR_SAMP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#var_samp) | Computes the sample variance of the values ... |

`AVG(numeric_expr)`
:   Returns the average of the values for a group of rows computed by
`numeric_expr`. Rows with a NULL value are not included in the
calculation.

`BIT_AND(numeric_expr)`
:   Returns the result of a bitwise `AND` operation between each
instance of `numeric_expr` across all rows.
`NULL` values are ignored. This function returns `NULL`
if all instances of `numeric_expr` evaluate to `NULL`.

`BIT_OR(numeric_expr)`
:   Returns the result of a bitwise `OR` operation between each
instance of `numeric_expr` across all rows.
`NULL` values are ignored. This function returns `NULL`
if all instances of `numeric_expr` evaluate to `NULL`.

`BIT_XOR(numeric_expr)`
:   Returns the result of a bitwise `XOR` operation between each
instance of `numeric_expr` across all rows.
`NULL` values are ignored. This function returns `NULL`
if all instances of `numeric_expr` evaluate to `NULL`.

`CORR(numeric_expr, numeric_expr)`
:   Returns the [Pearson correlation coefficient](https://en.wikipedia.org/wiki/Pearson_product-moment_correlation_coefficient) of a set of number pairs.

`COUNT(*)`
:   Returns the total number of values (NULL and non-NULL) in the scope of the function. Unless you are using `COUNT(*)` with the `TOP` function, it is better to explicitly specify the field to count.

`COUNT([DISTINCT] field [, n])`

:   Returns the total number of non-NULL values in the scope of the function. If you use the `DISTINCT` keyword, the function returns the number of **distinct** values for the specified field. Note that the returned value for `DISTINCT` is a **statistical approximation** and is not guaranteed to be exact.

Use `EXACT_COUNT_DISTINCT()` for an exact answer.

If you require greater accuracy from `` `COUNT(DISTINCT)` ``, you can specify a second parameter, `n`, which gives the threshold below which exact results are guaranteed. By default, `n` is 1000, but if you give a larger `n`, you will get exact results for `COUNT(DISTINCT)` up to that value of `n`. However, giving larger values of `n` will reduce scalability of this operator and may substantially increase query execution time or cause the query to fail.

To compute the exact number of distinct values, use [EXACT_COUNT_DISTINCT](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#exact_count_distinct). Or, for a more scalable approach, consider using `GROUP EACH BY` on the relevant field(s) and then applying `COUNT(*)`. The `GROUP EACH BY` approach is more scalable but might incur a slight up-front performance penalty.

`COVAR_POP(numeric_expr1, numeric_expr2)`
:   Computes the **population** covariance of the values computed by `numeric_expr1` and `numeric_expr2`.

`COVAR_SAMP(numeric_expr1, numeric_expr2)`
:   Computes the **sample** covariance of the values computed by `numeric_expr1` and `numeric_expr2`.

`EXACT_COUNT_DISTINCT(field)`
:   Returns the exact number of non-NULL, distinct values for the specified field. For better scalability and performance, use [COUNT(DISTINCT *field*)](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#countdistinct).

`FIRST(expr)`
:   Returns the first sequential value in the scope of the function.

`GROUP_CONCAT('str' [, separator])`

:   Concatenates multiple strings into a single string, where each value is separated by the optional `separator` parameter. If `separator` is omitted, BigQuery returns a comma-separated string.

If a string in the source data contains a double quote character, `GROUP_CONCAT` returns the string with double quotes added. For example, the string `a"b` would return as `"a""b"`. Use `GROUP_CONCAT_UNQUOTED` if you prefer that these strings do not return with double quotes added.

**Example:**

```sql
#legacySQL
SELECT
  GROUP_CONCAT(x)
FROM (
  SELECT
    'a"b' AS x),
  (
  SELECT
    'cd' AS x);
```

`GROUP_CONCAT_UNQUOTED('str' [, separator])`

:   Concatenates multiple strings into a single string, where each value is separated by the optional `separator` parameter. If `separator` is omitted, BigQuery returns a comma-separated string.

Unlike `GROUP_CONCAT`, this function will not add double quotes to returned values that include a double quote character. For example, the string `a"b` would return as `a"b`.

**Example:**

```sql
#legacySQL
SELECT
  GROUP_CONCAT_UNQUOTED(x)
FROM (
  SELECT
    'a"b' AS x),
  (
  SELECT
    'cd' AS x);
```

`LAST(field)`
:   Returns the last sequential value in the scope of the function.

`MAX(field)`
:   Returns the maximum value in the scope of the function.

`MIN(field)`
:   Returns the minimum value in the scope of the function.

`NEST(expr)`

:   Aggregates all values in the current aggregation scope into a repeated field. For example, the query `"SELECT x, NEST(y) FROM ... GROUP BY x"` returns one output record for each distinct `x` value, and contains a repeated field for all `y` values paired with `x` in the query input. The `NEST` function requires a `GROUP BY` clause.

BigQuery automatically flattens query results, so if you use the `NEST` function on the top level query, the results won't contain repeated fields. Use the `NEST` function when using a subselect that produces intermediate results for immediate use by the same query.

`NTH(n, field)`
:   Returns the `n`th sequential value in the scope of the function, where `n` is a constant. The `NTH` function starts counting at 1, so there is no zeroth term. If the scope of the function has less than `n` values, the function returns `NULL`.

`QUANTILES(expr[, buckets])`

:   Computes approximate minimum, maximum, and quantiles for the input expression. `NULL` input values are ignored. Empty or exclusively-`NULL` input results in `NULL` output. The number of quantiles computed is controlled with the optional `buckets` parameter, which includes the minimum and maximum in the count. To compute approximate N-tiles, use N+1 `buckets`. The default value of `buckets` is 100. (Note: The default of 100 does not estimate percentiles. To estimate percentiles, use 101 `buckets` at minimum.) If specified explicitly, `buckets` must be at least 2.

The fractional error per quantile is epsilon = 1 / `buckets`,
which means that the error decreases as the number of buckets increases.
For example:

```text
QUANTILES(<expr>, 2) # computes min and max with 50% error.
QUANTILES(<expr>, 3) # computes min, median, and max with 33% error.
QUANTILES(<expr>, 5) # computes quartiles with 25% error.
QUANTILES(<expr>, 11) # computes deciles with 10% error.
QUANTILES(<expr>, 21) # computes vigintiles with 5% error.
QUANTILES(<expr>, 101) # computes percentiles with 1% error.
```

The `NTH` function can be used to pick a particular quantile, but remember that `NTH` is 1-based, and that `QUANTILES` returns the minimum ("0th" quantile) in the first position, and the maximum ("100th" percentile or "Nth" N-tile) in the last position. For example, `NTH(11, QUANTILES(expr, 21))` estimates the median of `expr`, whereas `NTH(20, QUANTILES(expr, 21))` estimates the 19th vigintile (95th percentile) of `expr`. Both estimates have a 5% margin of error.

To improve accuracy, use more buckets. For example, to
reduce the margin of error for the previous calculations from 5% to 0.1%,
use 1001 buckets instead of 21, and adjust the argument to the
`NTH` function accordingly. To calculate the median with
0.1% error, use `NTH(501, QUANTILES(expr, 1001))`; for the 95th percentile
with 0.1% error, use `NTH(951, QUANTILES(expr, 1001))`.

`STDDEV(numeric_expr)`
:   Returns the standard deviation of the values computed by `numeric_expr`. Rows with a NULL value are not included in the calculation. The `STDDEV` function is an alias for `STDDEV_SAMP`.

`STDDEV_POP(numeric_expr)`
:   Computes the **population** standard deviation of the value computed by `numeric_expr`.
Use `STDDEV_POP()` to compute the standard deviation of a dataset that encompasses the entire population of interest.
If your dataset comprises only a representative sample of the population, use `STDDEV_SAMP()` instead.
For more information about population versus sample standard deviation, see [Standard deviation on Wikipedia](https://en.wikipedia.org/wiki/Standard_deviation).

`STDDEV_SAMP(numeric_expr)`
:   Computes the **sample** standard deviation of the value computed by `numeric_expr`.
Use `STDDEV_SAMP()` to compute the standard deviation of an entire population based on a representative sample of the population.
If your dataset comprises the entire population, use `STDDEV_POP()` instead.
For more information about population versus sample standard deviation, see [Standard deviation on Wikipedia](https://en.wikipedia.org/wiki/Standard_deviation).

`SUM(field)`
:   Returns the sum total of the values in the scope of the function. For use with numerical data types only.

`TOP(field|alias[, max_values][,multiplier]) ... COUNT(*)`
:   Returns the top *max_values* records by frequency. See the [TOP description below](https://docs.cloud.google.com/bigquery/docs/query-reference#top-function) for details.

`UNIQUE(expr)`
:   Returns the set of unique, non-NULL values in the scope of the function in an undefined order. Similar to a large `GROUP BY` clause without the `EACH` keyword, the query will fail with a "Resources Exceeded" error if there are too many distinct values. Unlike `GROUP BY`, however, the `UNIQUE` function can be applied with scoped aggregation, allowing efficient operation on nested fields with a limited number of values.

`VARIANCE(numeric_expr)`
:   Computes the variance of the values computed by `numeric_expr`. Rows with a NULL value are not included in the calculation. The `VARIANCE` function is an alias for `VAR_SAMP`.

`VAR_POP(numeric_expr)`
:   Computes the **population** variance of the values computed by `numeric_expr`. For more information about population versus sample standard deviation, see [Standard deviation on Wikipedia](https://en.wikipedia.org/wiki/Standard_deviation).

`VAR_SAMP(numeric_expr)`
:   Computes the **sample** variance of the values computed by `numeric_expr`. For more information about population versus sample standard deviation, see [Standard deviation on Wikipedia](https://en.wikipedia.org/wiki/Standard_deviation).

##### TOP() function

TOP is a function that is an alternative to the GROUP BY clause. It is used as simplified syntax for `GROUP BY ... ORDER BY ... LIMIT ...`. Generally, the TOP function performs faster than the full `... GROUP BY ... ORDER BY ... LIMIT ...` query, but may only return approximate results. The following is the syntax for the TOP function:

```text
TOP(field|alias[, max_values][,multiplier]) ... COUNT(*)
```

When using TOP in a `SELECT` clause, you must include `COUNT(*)` as one of the fields.

A query that uses the TOP() function can return only two fields: the TOP field, and the COUNT(\*) value.

`field|alias`
:   The field or alias to return.

`max_values`
:   \[*Optional*\] The maximum number of results to return. Default is 20.

`multiplier`
:   A positive integer that increases the value(s) returned by `COUNT(*)` by the multiple specified.

#### TOP() examples

- **Basic example queries that use `TOP()`**

  The following queries use `TOP()` to return 10 rows.

  **Example 1:**

  ```sql
  #legacySQL
  SELECT
    TOP(word, 10) as word, COUNT(*) as cnt
  FROM
    [bigquery-public-data:samples.shakespeare]
  WHERE
    word CONTAINS "th";
  ```

  **Example 2:**

  ```sql
  #legacySQL
  SELECT
    word, left(word, 3)
  FROM
    (SELECT TOP(word, 10) AS word, COUNT(*)
       FROM [bigquery-public-data:samples.shakespeare]
       WHERE word CONTAINS "th");
  ```
- **Compare `TOP()` to `GROUP BY...ORDER BY...LIMIT`**

  The query returns, in order, the top 10 most frequently used words containing
  "th", and the number of documents the words was used in. The
  `TOP` query will execute much faster:

  **Example without `TOP()`:**

  ```sql
  #legacySQL
  SELECT
    word, COUNT(*) AS cnt
  FROM
    ds.Table
  WHERE
    word CONTAINS 'th'
  GROUP BY
    word
  ORDER BY
    cnt DESC LIMIT 10;
  ```

  **Example with `TOP()`:**

  ```sql
  #legacySQL
  SELECT
    TOP(word, 10), COUNT(*)
  FROM
    ds.Table
  WHERE
    word contains 'th';
  ```
- **Using the `multiplier` parameter.**

  The following queries show how the `multiplier` parameter affects the query result.
  The first query returns the number of births per month in Wyoming.
  The second query uses to `multiplier` parameter to multiply the `cnt` values by 100.

  **Example without the `multiplier` parameter:**

  ```sql
  #legacySQL
  SELECT
    TOP(month,3) as month, COUNT(*) as cnt
  FROM
    [bigquery-public-data:samples.natality]
  WHERE
    state = "WY";
  ```

  **Returns:**

  ```text
  +-------+-------+
  | month |  cnt  |
  +-------+-------+
  |   7   | 19594 |
  |   5   | 19038 |
  |   8   | 19030 |
  +-------+-------+
  ```

  **Example with the `multiplier` parameter:**

  ```sql
  #legacySQL
  SELECT
    TOP(month,3,100) as month, COUNT(*) as cnt
  FROM
    [bigquery-public-data:samples.natality]
  WHERE
    state = "WY";
  ```

  **Returns:**

  ```text
  +-------+---------+
  | month |   cnt   |
  +-------+---------+
  |   7   | 1959400 |
  |   5   | 1903800 |
  |   8   | 1903000 |
  +-------+---------+
  ```

**Note:** You must include `COUNT(*)` in the `SELECT` clause to use `TOP`.

#### Advanced examples

- **Average and standard deviation grouped by condition**

  The following query returns the average and standard deviation of birth weights in Ohio in 2003, grouped by mothers who do and do not smoke.

  **Example:**

  ```sql
  #legacySQL
  SELECT
    cigarette_use,
    /* Finds average and standard deviation */
    AVG(weight_pounds) baby_weight,
    STDDEV(weight_pounds) baby_weight_stdev,
    AVG(mother_age) mother_age
  FROM
    [bigquery-public-data:samples.natality]
  WHERE
    year=2003 AND state='OH'
  /* Group the result values by those */
  /* who smoked and those who didn't.  */
  GROUP BY
    cigarette_use;
  ```
- **Filter query results using an aggregated value**

  In order to filter query results using an aggregated value (for example,
  filtering by the value of a `SUM`), use the `HAVING`
  function. `HAVING` compares a value to a result determined by an
  aggregation function, as opposed to `WHERE`, which operates on
  each row prior to aggregation.

  **Example:**

  ```sql
  #legacySQL
  SELECT
    state,
    /* If 'is_male' is True, return 'Male', */
    /* otherwise return 'Female' */
    IF (is_male, 'Male', 'Female') AS sex,
    /* The count value is aliased as 'cnt' */
    /* and used in the HAVING clause below. */
    COUNT(*) AS cnt
  FROM
    [bigquery-public-data:samples.natality]
  WHERE
    state != ''
  GROUP BY
    state, sex
  HAVING
    cnt > 3000000
  ORDER BY
    cnt DESC
  ```

  **Returns:**

  ```text
  +-------+--------+---------+
  | state |  sex   |   cnt   |
  +-------+--------+---------+
  | CA    | Male   | 7060826 |
  | CA    | Female | 6733288 |
  | TX    | Male   | 5107542 |
  | TX    | Female | 4879247 |
  | NY    | Male   | 4442246 |
  | NY    | Female | 4227891 |
  | IL    | Male   | 3089555 |
  +-------+--------+---------+
  ```

### Arithmetic operators

Arithmetic operators take numeric arguments and return a numeric result. Each argument can be a numeric literal or a numeric value returned by a query. If the arithmetic operation evaluates to an undefined result, the operation returns `NULL`.

#### Syntax

| Operator | Description | Example |
|---|---|---|
| + | Addition | `SELECT 6 + (5 - 1);` Returns: **10** |
| - | Subtraction | `SELECT 6 - (4 + 1);` Returns: **1** |
| \* | Multiplication | `SELECT 6 * (5 - 1);` Returns: **24** |
| / | Division | `SELECT 6 / (2 + 2);` Returns: **1.5** |
| % | Modulo | `SELECT 6 % (2 + 2);` Returns: **2** |

### Bitwise functions

Bitwise functions operate at the level of individual bits and require numerical arguments. For more information about bitwise functions, see [Bitwise operation](https://en.wikipedia.org/wiki/Bitwise_operation).

Three additional bitwise functions, `BIT_AND`, `BIT_OR` and `BIT_XOR`, are documented in [aggregate functions](https://docs.cloud.google.com/bigquery/query-reference#aggfunctions).

#### Syntax

| Operator | Description | Example |
|---|---|---|
| \& | Bitwise AND | `SELECT (1 + 3) & 1` Returns: **0** |
| \| | Bitwise OR | `SELECT 24 \| 12` Returns: **28** |
| \^ | Bitwise XOR | `SELECT 1 ^ 0` Returns: **1** |
| \<\< | Bitwise shift left | `SELECT 1 << (2 + 2)` Returns: **16** |
| \>\> | Bitwise shift right | `SELECT (6 + 2) >> 2` Returns: **2** |
| \~ | Bitwise NOT | `SELECT ~2` Returns: **-3** |
| `BIT_COUNT(\<numeric_expr\>)` | Returns the number of bits that are set in `\<numeric_expr\>`. | `SELECT BIT_COUNT(29);` Returns: **4** |

### Casting functions

Casting functions change the data type of a numeric expression. Casting functions are particularly useful for ensuring that arguments in a comparison function have the same data type.

#### Syntax

| Casting functions ||
|---|---|
| [`BOOLEAN()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#boolean) | Cast to boolean. |
| [`BYTES()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#bytes) | Cast to bytes. |
| [`CAST(expr AS type)`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#cast) | Converts `expr` into a variable of type `type`. |
| [`FLOAT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#float) | Cast to double. |
| [`HEX_STRING()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#hex_string) | Cast to hexadecimal string. |
| [`INTEGER()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#integer) | Cast to integer. |
| [`STRING()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#string) | Cast to string. |

`BOOLEAN(\<numeric_expr\>)`
:
- Returns `true` if `\<numeric_expr\>` is not 0 and not NULL.
- Returns `false` if `\<numeric_expr\>` is 0.
- Returns `NULL` if `\<numeric_expr\>` is NULL.

`BYTES(string_expr)`
:   Returns `string_expr` as a value of type `bytes`.

`CAST(expr AS type)`
:   Converts `expr` into a variable of type `type`.

`FLOAT(expr)`
:
Returns `expr` as a double. The `expr`
can be a string like `'45.78'`, but the function returns
`NULL` for non-numeric values.

`HEX_STRING(numeric_expr)`
:   Returns `numeric_expr` as a hexadecimal string.

`INTEGER(expr)`
:
Casts `expr` to a 64-bit integer.

- Returns NULL if `expr` is a string that doesn't correspond to an integer value.
- Returns the number of microseconds since the unix epoch if `expr` is a timestamp.

`STRING(numeric_expr)`
:   Returns `numeric_expr` as a string.

### Comparison functions

Comparison functions return `true` or `false`, based on the following types of comparisons:

- A comparison of two expressions.
- A comparison of an expression or set of expressions to a specific criteria, such as being in a specified list, being NULL, or being a non-default optional value.

Some of the functions listed below return values other than `true` or `false`, but the values they return are based on comparison operations.

You can use either numeric or string expressions as arguments for comparison functions. (String constants must be enclosed in single or double quotes.) The expressions can be literals or values fetched by a query. Comparison functions are most often used as filtering conditions in `WHERE` clauses, but they can be used in other clauses.

#### Syntax

| Comparison functions ||
|---|---|
| [`expr1 = expr2`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#equals) | Returns `true` if the expressions are equal. |
| [`expr1 != expr2` `expr1 <> expr2`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#not-equals) | Returns `true` if the expressions are not equal. |
| [`expr1 > expr2`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#greater-than) | Returns `true` if `expr1` is greater than `expr2`. |
| [`expr1 < expr2`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#less-than) | Returns `true` if `expr1` is less than `expr2`. |
| [`expr1 >= expr2`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#greater-or-equal) | Returns `true` if `expr1` is greater than or equal to `expr2`. |
| [`expr1 <= expr2`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#less-or-equal) | Returns `true` if `expr1` is less than or equal to `expr2`. |
| [`expr1 BETWEEN expr2 AND expr3`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#between) | Returns `true` if the value of `expr1` is between `expr2` and `expr3`, inclusive. |
| [`expr IS NULL`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#is-null) | Returns `true` if `expr` is NULL. |
| [`expr IN()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#in) | Returns `true` if `expr` matches `expr1`, `expr2`, or any value in the parentheses. |
| [`COALESCE()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#coalesce) | Returns the first argument that isn't NULL. |
| [`GREATEST()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#greatest) | Returns the largest `numeric_expr` parameter. |
| [`IFNULL()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#ifnull) | If argument is not null, returns the argument. |
| [`IS_INF()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#is_inf) | Returns `true` if positive or negative infinity. |
| [`IS_NAN()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#is_nan) | Returns `true` if argument is `NaN`. |
| [`IS_EXPLICITLY_DEFINED()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#is_explicitly_defined) | deprecated: Use `expr IS NOT NULL` instead. |
| [`LEAST()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#least) | Returns the smallest argument `numeric_expr` parameter. |
| [`NVL()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#nvl) | If `expr` is not null, returns `expr`, otherwise returns `null_default`. |

`expr1 = expr2`
:   Returns `true` if the expressions are equal.

`expr1 != expr2`  

`expr1 <> expr2`
:   Returns `true` if the expressions are not equal.

`expr1 > expr2`
:   Returns `true` if `expr1` is greater than `expr2`.

`expr1 < expr2`
:   Returns `true` if `expr1` is less than `expr2`.

`expr1 >= expr2`
:   Returns `true` if `expr1` is greater than or equal to `expr2`.

`expr1 <= expr2`
:   Returns `true` if `expr1` is less than or equal to `expr2`.

`expr1 BETWEEN expr2 AND expr3`

:   Returns `true` if the value of `expr1` is greater than or equal to `expr2`, and less than or equal to `expr3`.

`expr IS NULL`
:   Returns `true` if `expr` is NULL.

`expr IN(expr1, expr2, ...)`
:   Returns `true` if `expr` matches `expr1`, `expr2`, or any value in the parentheses. The `IN` keyword is an efficient shorthand for `(expr = expr1 || expr = expr2 || ...)`. The expressions used with the `IN` keyword must be constants and they must match the data type of `expr`.
The `IN` clause can also be used to create semi-joins and anti-joins. For more information, see [Semi-join and Anti-join](#semi-join-and-anti-join).

`COALESCE(\<expr1\>, \<expr2\>, ...)`
:   Returns the first argument that isn't NULL.

`GREATEST(numeric_expr1, numeric_expr2, ...)`

:   Returns the largest `numeric_expr` parameter. All parameters must be numeric, and all parameters must be the same type. If any parameter is `NULL`, this function returns `NULL`.

To ignore `NULL` values, use the `IFNULL` function to change `NULL` values to a value that doesn't affect the comparison. In the following code example, the `IFNULL` function is used to change `NULL` values to `-1`, which doesn't affect the comparison between positive numbers.

```sql
SELECT GREATEST(IFNULL(a,-1), IFNULL(b,-1)) FROM (SELECT 1 as a, NULL as b);
```

`IFNULL(expr, null_default)`
:   If `expr` is not null, returns `expr`, otherwise returns `null_default`.

`IS_INF(numeric_expr)`
:   Returns `true` if `numeric_expr` is positive or negative infinity.

`IS_NAN(numeric_expr)`
:   Returns `true` if `numeric_expr` is the special `NaN` numeric value.

`IS_EXPLICITLY_DEFINED(expr)`

:   This function is deprecated. Use `expr IS NOT NULL` instead.

`LEAST(numeric_expr1, numeric_expr2, ...)`

:   Returns the smallest `numeric_expr` parameter. All parameters must be numeric, and all parameters must be the same type. If any parameter is `NULL`, this function returns `NULL`

`NVL(expr, null_default)`
:   If `expr` is not null, returns `expr`, otherwise returns `null_default`. The `NVL` function is an alias for `IFNULL`.

### Date and time functions

The following functions enable date and time manipulation for UNIX timestamps,
date strings and TIMESTAMP data types. For more information about working with
the TIMESTAMP data type, see [Using TIMESTAMP](https://docs.cloud.google.com/bigquery/docs/timestamp).

Date and time functions that work with UNIX timestamps operate on
[UNIX time](https://en.wikipedia.org/wiki/Unix_time). Date and time
functions return values based upon the UTC time zone.

#### Syntax

| Date and time functions ||
|---|---|
| [`CURRENT_DATE()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#current_date) | Returns current date in the format `%Y-%m-%d`. |
| [`CURRENT_TIME()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#current_time) | Returns the server's current time in the format `%H:%M:%S`. |
| [`CURRENT_TIMESTAMP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#current_timestamp) | Returns the server's current time in the format `%Y-%m-%d %H:%M:%S`. |
| [`DATE()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#date) | Returns the date in the format `%Y-%m-%d`. |
| [`DATE_ADD()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#date_add) | Adds the specified interval to a TIMESTAMP data type. |
| [`DATEDIFF()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#datediff) | Returns the number of days between two TIMESTAMP data types. |
| [`DAY()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#day) | Returns the day of the month as an integer between 1 and 31. |
| [`DAYOFWEEK()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#dayofweek) | Returns the day of the week as an integer between 1 (Sunday) and 7 (Saturday). |
| [`DAYOFYEAR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#dayofyear) | Returns the day of the year as an integer between 1 and 366. |
| [`FORMAT_UTC_USEC()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#format_utc_usec) | Returns a UNIX timestamp in the format `YYYY-MM-DD HH:MM:SS.uuuuuu`. |
| [`HOUR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#hour) | Returns the hour of a TIMESTAMP as an integer between 0 and 23. |
| [`MINUTE()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#minute) | Returns the minutes of a TIMESTAMP as an integer between 0 and 59. |
| [`MONTH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#month) | Returns the month of a TIMESTAMP as an integer between 1 and 12. |
| [`MSEC_TO_TIMESTAMP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#msec_to_timestamp) | Converts a UNIX timestamp in milliseconds to a TIMESTAMP. |
| [`NOW()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#now) | Returns the current UNIX timestamp in microseconds. |
| [`PARSE_UTC_USEC()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#parse_utc_usec) | Converts a date string to a UNIX timestamp in microseconds. |
| [`QUARTER()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#quarter) | Returns the quarter of the year of a TIMESTAMP as an integer between 1 and 4. |
| [`SEC_TO_TIMESTAMP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#sec_to_timestamp) | Converts a UNIX timestamp in seconds to a TIMESTAMP. |
| [`SECOND()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#second) | Returns the seconds of a TIMESTAMP as an integer between 0 and 59. |
| [`STRFTIME_UTC_USEC()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#strftime_utc_usec) | Returns a date string in the format *date_format_str*. |
| [`TIME()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#time) | Returns a TIMESTAMP in the format `%H:%M:%S`. |
| [`TIMESTAMP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#timestamp) | Convert a date string to a TIMESTAMP. |
| [`TIMESTAMP_TO_MSEC()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#timestamp_to_msec) | Converts a TIMESTAMP to a UNIX timestamp in milliseconds. |
| [`TIMESTAMP_TO_SEC()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#timestamp_to_sec) | Converts a TIMESTAMP to a UNIX timestamp in seconds. |
| [`TIMESTAMP_TO_USEC()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#timestamp_to_usec) | Converts a TIMESTAMP to a UNIX timestamp in microseconds. |
| [`USEC_TO_TIMESTAMP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#usec_to_timestamp) | Converts a UNIX timestamp in microseconds to a TIMESTAMP. |
| [`UTC_USEC_TO_DAY()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#utc_usec_to_day) | Shifts a UNIX timestamp in microseconds to the beginning of the day it occurs in. |
| [`UTC_USEC_TO_HOUR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#utc_usec_to_hour) | Shifts a UNIX timestamp in microseconds to the beginning of the hour it occurs in. |
| [`UTC_USEC_TO_MONTH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#utc_usec_to_month) | Shifts a UNIX timestamp in microseconds to the beginning of the month it occurs in. |
| [`UTC_USEC_TO_WEEK()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#utc_usec_to_week) | Returns a UNIX timestamp in microseconds that represents a day in the week. |
| [`UTC_USEC_TO_YEAR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#utc_usec_to_year) | Returns a UNIX timestamp in microseconds that represents the year. |
| [`WEEK()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#week) | Returns the week of a TIMESTAMP as an integer between 1 and 53. |
| [`YEAR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#year) | Returns the year of a TIMESTAMP. |

`CURRENT_DATE()`

:   Returns a human-readable string of the current date in the format `%Y-%m-%d`.

**Example:**

`SELECT CURRENT_DATE();`

Returns: **2013-02-01**

`CURRENT_TIME()`

:   Returns a human-readable string of the server's current time in the format `%H:%M:%S`.

**Example:**

`SELECT CURRENT_TIME();`

Returns: **01:32:56**

`CURRENT_TIMESTAMP()`

:   Returns a TIMESTAMP data type of the server's current time in the format `%Y-%m-%d %H:%M:%S`.

**Example:**

`SELECT CURRENT_TIMESTAMP();`

Returns: **2013-02-01 01:33:35 UTC**

`DATE(\<timestamp\>)`

:   Returns a human-readable string of a TIMESTAMP data type in the format `%Y-%m-%d`.

**Example:**

`SELECT DATE(TIMESTAMP('2012-10-01 02:03:04'));`

Returns: **2012-10-01**

`DATE_ADD(\<timestamp\>,\<interval\>,

\<interval_units\>)`

:   Adds the specified interval to a TIMESTAMP data type. Possible `interval_units` values include `YEAR`, `MONTH`, `DAY`, `HOUR`, `MINUTE`, and `SECOND`. If `interval` is a negative number, the interval is subtracted from the TIMESTAMP data type.

**Example:**

`SELECT DATE_ADD(TIMESTAMP("2012-10-01 02:03:04"), 5, "YEAR");`

Returns: **2017-10-01 02:03:04 UTC**

`SELECT DATE_ADD(TIMESTAMP("2012-10-01 02:03:04"), -5, "YEAR");`

Returns: **2007-10-01 02:03:04 UTC**

`DATEDIFF(\<timestamp1\>,\<timestamp2\>)`

:   Returns the number of days between two TIMESTAMP data types. The result is positive if the
first TIMESTAMP data type comes after the second TIMESTAMP data type, and otherwise the result is negative.

**Example:**

`SELECT DATEDIFF(TIMESTAMP('2012-10-02 05:23:48'), TIMESTAMP('2011-06-24 12:18:35'));`

Returns: **466**

**Example:**

`SELECT DATEDIFF(TIMESTAMP('2011-06-24 12:18:35'), TIMESTAMP('2012-10-02 05:23:48'));`

Returns: **-466**

`DAY(\<timestamp\>)`

:   Returns the day of the month of a TIMESTAMP data type as an integer between 1 and 31, inclusively.

**Example:**

`SELECT DAY(TIMESTAMP('2012-10-02 05:23:48'));`

Returns: **2**

`DAYOFWEEK(\<timestamp\>)`

:   Returns the day of the week of a TIMESTAMP data type as an integer between 1 (Sunday) and 7 (Saturday), inclusively.

**Example:**

`SELECT DAYOFWEEK(TIMESTAMP("2012-10-01 02:03:04"));`

Returns: **2**

`DAYOFYEAR(\<timestamp\>)`

:   Returns the day of the year of a TIMESTAMP data type as an integer between 1 and 366, inclusively. The integer 1 refers to January 1.

**Example:**

`SELECT DAYOFYEAR(TIMESTAMP("2012-10-01 02:03:04"));`

Returns: **275**

`FORMAT_UTC_USEC(\<unix_timestamp\>)`

:   Returns a human-readable string representation of a UNIX timestamp in the format `YYYY-MM-DD HH:MM:SS.uuuuuu`.

**Example:**

`SELECT FORMAT_UTC_USEC(1274259481071200);`

Returns: **2010-05-19 08:58:01.071200**

`HOUR(\<timestamp\>)`

:   Returns the hour of a TIMESTAMP data type as an integer between 0 and 23, inclusively.

**Example:**

`SELECT HOUR(TIMESTAMP('2012-10-02 05:23:48'));`

Returns: **5**

`MINUTE(\<timestamp\>)`

:   Returns the minutes of a TIMESTAMP data type as an integer between 0 and 59, inclusively.

**Example:**

`SELECT MINUTE(TIMESTAMP('2012-10-02 05:23:48'));`

Returns: **23**

`MONTH(\<timestamp\>)`

:   Returns the month of a TIMESTAMP data type as an integer between 1 and 12, inclusively.

**Example:**

`SELECT MONTH(TIMESTAMP('2012-10-02 05:23:48'));`

Returns: **10**

`MSEC_TO_TIMESTAMP(\<expr\>)`

:   Converts a UNIX timestamp in milliseconds to a TIMESTAMP data type. **Example:**

`SELECT MSEC_TO_TIMESTAMP(1349053323000);`

Returns: **2012-10-01 01:02:03 UTC**

`SELECT MSEC_TO_TIMESTAMP(1349053323000 + 1000)`

Returns: **2012-10-01 01:02:04 UTC**

`NOW()`

:   Returns the current UNIX timestamp in microseconds.

**Example:**

`SELECT NOW();`

Returns: **1359685811687920**

`PARSE_UTC_USEC(\<date_string\>)`

:   Converts a date string to a UNIX timestamp in microseconds. `date_string` must have the format `YYYY-MM-DD HH:MM:SS[.uuuuuu]`. The fractional part of the second can be up to 6 digits long or can be omitted.

[TIMESTAMP_TO_USEC](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#timestamp_to_usec) is an equivalent function that converts a TIMESTAMP data type argument instead of a date string.

**Example:**

`SELECT PARSE_UTC_USEC("2012-10-01 02:03:04");`

Returns: **1349056984000000**

`QUARTER(\<timestamp\>)`

:   Returns the quarter of the year of a TIMESTAMP data type as an integer between 1 and 4, inclusively.

**Example:**

`SELECT QUARTER(TIMESTAMP("2012-10-01 02:03:04"));`

Returns: **4**

`SEC_TO_TIMESTAMP(\<expr\>)`

:   Converts a UNIX timestamp in seconds to a TIMESTAMP data type.

**Example:**

`SELECT SEC_TO_TIMESTAMP(1355968987);`

Returns: **2012-12-20 02:03:07 UTC**

`SELECT SEC_TO_TIMESTAMP(INTEGER(1355968984 + 3));`

Returns: **2012-12-20 02:03:07 UTC**

`SECOND(\<timestamp\>)`

:   Returns the seconds of a TIMESTAMP data type as an integer between 0 and 59, inclusively.

During a [leap second](https://en.wikipedia.org/wiki/Leap_second), the integer range is between 0 and 60, inclusively.

**Example:**

`SELECT SECOND(TIMESTAMP('2012-10-02 05:23:48'));`

Returns: **48**

`STRFTIME_UTC_USEC(\<unix_timestamp\>,

\<date_format_str\>)`

:   Returns a human-readable date string in the format *date_format_str* .
*date_format_str* can include date-related punctuation characters
(such as */* and *-* ) and special characters accepted by the
[strftime function in C++](https://cplusplus.com/reference/ctime/strftime/)
(such as *%d* for day of month).

Use the `UTC_USEC_TO_\<function_name\>` functions if you plan to group query data by time intervals, such as getting all data for a certain month, because the functions are more efficient.

**Example:**

`SELECT STRFTIME_UTC_USEC(1274259481071200, "%Y-%m-%d");`

Returns: **2010-05-19**

`TIME(\<timestamp\>)`

:   Returns a human-readable string of a TIMESTAMP data type, in the format `%H:%M:%S`.

**Example:**

`SELECT TIME(TIMESTAMP('2012-10-01 02:03:04'));`

Returns: **02:03:04**

`TIMESTAMP(\<date_string\>)`

:   Convert a date string to a TIMESTAMP data type.

**Example:**

`SELECT TIMESTAMP("2012-10-01 01:02:03");`

Returns: **2012-10-01 01:02:03 UTC**

`TIMESTAMP_TO_MSEC(\<timestamp\>)`

:   Converts a TIMESTAMP data type to a UNIX timestamp in milliseconds.

**Example:**

`SELECT TIMESTAMP_TO_MSEC(TIMESTAMP("2012-10-01 01:02:03"));`

Returns: **1349053323000**

`TIMESTAMP_TO_SEC(\<timestamp\>)`

:   Converts a TIMESTAMP data type to a UNIX timestamp in seconds. **Example:**

`SELECT TIMESTAMP_TO_SEC(TIMESTAMP("2012-10-01 01:02:03"));`

Returns: **1349053323**

`TIMESTAMP_TO_USEC(\<timestamp\>)`

:   Converts a TIMESTAMP data type to a UNIX timestamp in microseconds.

[PARSE_UTC_USEC](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#parse_utc_usec) is an equivalent function that converts a data string argument instead of a TIMESTAMP data type.

**Example:**

`SELECT TIMESTAMP_TO_USEC(TIMESTAMP("2012-10-01 01:02:03"));`

Returns: **1349053323000000**

`USEC_TO_TIMESTAMP(\<expr\>)`

:   Converts a UNIX timestamp in microseconds to a TIMESTAMP data type.

**Example:**

`SELECT USEC_TO_TIMESTAMP(1349053323000000);`

Returns: **2012-10-01 01:02:03 UTC**

`SELECT USEC_TO_TIMESTAMP(1349053323000000 + 1000000)`

Returns: **2012-10-01 01:02:04 UTC**

`UTC_USEC_TO_DAY(\<unix_timestamp\>)`

:   Shifts a UNIX timestamp in microseconds to the beginning of the day it occurs in.

For example, if `unix_timestamp` occurs on May 19th at 08:58, this function returns a UNIX timestamp for May 19th at 00:00 (midnight).

**Example:**

`SELECT UTC_USEC_TO_DAY(1274259481071200);`

Returns: **1274227200000000**

`UTC_USEC_TO_HOUR(\<unix_timestamp\>)`

:   Shifts a UNIX timestamp in microseconds to the beginning of the hour it occurs in.

For example, if `unix_timestamp` occurs at 08:58, this function returns a UNIX timestamp for 08:00 on the same day.

**Example:**

`SELECT UTC_USEC_TO_HOUR(1274259481071200);`

Returns: **1274256000000000**

`UTC_USEC_TO_MONTH(\<unix_timestamp\>)`

:   Shifts a UNIX timestamp in microseconds to the beginning of the month it occurs in.

For example, if `unix_timestamp` occurs on March 19th, this function returns a UNIX timestamp for March 1st of the same year.

**Example:**

`SELECT UTC_USEC_TO_MONTH(1274259481071200);`

Returns: **1272672000000000**

`UTC_USEC_TO_WEEK(\<unix_timestamp\>,

\<day_of_week\>)`

:   Returns a UNIX timestamp in microseconds that represents a day in the week of the `unix_timestamp` argument. This function takes two arguments: a UNIX timestamp in microseconds, and a day of the week from 0 (Sunday) to 6 (Saturday).

For example, if `unix_timestamp` occurs on Friday, 2008-04-11, and you set `day_of_week` to 2 (Tuesday), the function returns a UNIX timestamp for Tuesday, 2008-04-08.

**Example:**

`SELECT UTC_USEC_TO_WEEK(1207929480000000, 2) AS tuesday;`

Returns: **1207612800000000**

`UTC_USEC_TO_YEAR(\<unix_timestamp\>)`

:   Returns a UNIX timestamp in microseconds that represents the year of the `unix_timestamp` argument.

For example, if `unix_timestamp` occurs in 2010, the function returns `1262304000000000`, the microsecond representation of `2010-01-01 00:00`.

**Example:**

`SELECT UTC_USEC_TO_YEAR(1274259481071200);`

Returns: **1262304000000000**

`WEEK(\<timestamp\>)`

:   Returns the week of a TIMESTAMP data type as an integer between 1 and 53, inclusively.

Weeks begin on Sunday, so if January 1 is on a day other than
Sunday, week 1 has fewer than 7 days and the first Sunday
of the year is the first day of week 2.

**Example:**

`SELECT WEEK(TIMESTAMP('2014-12-31'));`

Returns: **53**

`YEAR(\<timestamp\>)`

:   Returns the year of a TIMESTAMP data type. **Example:**

`SELECT YEAR(TIMESTAMP('2012-10-02 05:23:48'));`

Returns: **2012**

#### Advanced examples

- **Convert integer timestamp results into human-readable format**

  The following query finds the top 5 moments in time in which the most Wikipedia revisions took place. In order to display results in a human-readable
  format, use BigQuery's [`FORMAT_UTC_USEC()`](https://developers.google.com/bigquery/docs/query-reference#timestampfunctions) function, which takes a timestamp, in microseconds, as an input. This query multiplies the Wikipedia POSIX format timestamps (in seconds) by 1000000 to convert the value into microseconds.

  **Example:**

  ```sql
  #legacySQL
  SELECT
    /* Multiply timestamp by 1000000 and convert */
    /* into a more human-readable format. */
    TOP (FORMAT_UTC_USEC(timestamp * 1000000), 5)
      AS top_revision_time,
    COUNT (*) AS revision_count
  FROM
    [bigquery-public-data:samples.wikipedia];
  ```

  **Returns:**

  ```text
  +----------------------------+----------------+
  |     top_revision_time      | revision_count |
  +----------------------------+----------------+
  | 2002-02-25 15:51:15.000000 |          20976 |
  | 2002-02-25 15:43:11.000000 |          15974 |
  | 2010-02-02 03:34:51.000000 |              3 |
  | 2010-02-02 01:04:59.000000 |              3 |
  | 2010-02-01 23:55:05.000000 |              3 |
  +----------------------------+----------------+
  ```
- **Bucketing Results by Timestamp**

  It's useful to use date and time functions to group query results into buckets corresponding to particular years, months, or days. The following example uses the `UTC_USEC_TO_MONTH()` function to display how many characters each Wikipedia contributor uses in their revision comments per month.

  **Example:**

  ```sql
  #legacySQL
  SELECT
    contributor_username,
    /* Return the timestamp shifted to the
     * start of the month, formatted in
     * a human-readable format. Uses the
     * 'LEFT()' string function to return only
     * the first 7 characters of the formatted timestamp.
     */
    LEFT (FORMAT_UTC_USEC(
      UTC_USEC_TO_MONTH(timestamp * 1000000)),7)
      AS month,
    SUM(LENGTH(comment)) as total_chars_used
  FROM
    [bigquery-public-data:samples.wikipedia]
  WHERE
    (contributor_username != '' AND
     contributor_username IS NOT NULL)
    AND timestamp > 1133395200
    AND timestamp < 1157068800
  GROUP BY
    contributor_username, month
  ORDER BY
    total_chars_used DESC;
  ```

  **Returns (truncated):**

  ```text
  +--------------------------------+---------+-----------------------+
  |      contributor_username      |  month  | total_chars_used      |
  +--------------------------------+---------+-----------------------+
  | Kingbotk                       | 2006-08 |              18015066 |
  | SmackBot                       | 2006-03 |               7838365 |
  | SmackBot                       | 2006-05 |               5148863 |
  | Tawkerbot2                     | 2006-05 |               4434348 |
  | Cydebot                        | 2006-06 |               3380577 |
  etc ...
  ```

### IP functions

IP functions convert IP addresses to and from human-readable form.

#### Syntax

| IP functions ||
|---|---|
| [`FORMAT_IP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#format_ip) | Converts 32 least significant bits of `integer_value` to human-readable IPv4 address string. |
| [`PARSE_IP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#parse_ip) | Converts a string representing IPv4 address to unsigned integer value. |
| [`FORMAT_PACKED_IP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#format-packed-ip) | Returns a human-readable IP address in the form `10.1.5.23` or `2620:0:1009:1:216:36ff:feef:3f`. |
| [`PARSE_PACKED_IP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#parse-packed-ip) | Returns an IP address in [BYTES](https://docs.cloud.google.com/bigquery/data-types#bytes-type). |

`FORMAT_IP(integer_value)`
:   Converts 32 least significant bits of `integer_value` to human-readable IPv4 address string. For example, `FORMAT_IP(1)` will return string `'0.0.0.1'`.

`PARSE_IP(readable_ip)`
:   Converts a string representing IPv4 address to unsigned integer value. For example, `PARSE_IP('0.0.0.1')` will return `1`. If string is not a valid IPv4 address, `PARSE_IP` will return `NULL`.

BigQuery supports writing IPv4 and IPv6 addresses in packed strings, as
4- or 16-byte binary data in network byte order. The functions described below
support parsing the addresses to and from human readable form. These functions
work only on string fields with IPs.

#### Syntax

`FORMAT_PACKED_IP(packed_ip)`

:   Returns a human-readable IP address, in the form
`10.1.5.23` or `2620:0:1009:1:216:36ff:feef:3f`. **Examples:**

- `FORMAT_PACKED_IP('0123456789@ABCDE')` returns `'3031:3233:3435:3637:3839:4041:4243:4445'`
- `FORMAT_PACKED_IP('0123')` returns `'48.49.50.51'`

`PARSE_PACKED_IP(readable_ip)`

:   Returns an IP address in [BYTES](https://docs.cloud.google.com/bigquery/data-types#bytes-type).
If the input string is not a valid IPv4 or IPv6 address, `PARSE_PACKED_IP`
will return `NULL`. **Examples:**

- `PARSE_PACKED_IP('48.49.50.51')` returns `'MDEyMw=='`
- `PARSE_PACKED_IP('3031:3233:3435:3637:3839:4041:4243:4445')` returns `'MDEyMzQ1Njc4OUBBQkNERQ=='`

### JSON functions

BigQuery's JSON functions give you the ability to find values within your stored JSON data, by using [JSONPath](https://github.com/json-path/JsonPath#operators)-like expressions.

Storing JSON data can be more flexible than declaring all of your individual fields in your table schema, but can lead to higher costs. When you select data from a JSON string, you are charged for scanning the entire string, which is more expensive than if each field is in a separate column. The query is also slower since the entire string needs to be parsed at query time. But for ad-hoc or rapidly-changing schemas, the flexibility of JSON can be worth the extra cost.

Use JSON functions instead of BigQuery's [regular expression functions](legacy-sql-2.md#regular-expression-functions) if working with structured data, as JSON functions are easier to use.

#### Syntax

| JSON functions ||
|---|---|
| [`JSON_EXTRACT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#json_extract) | Selects a value according to the JSONPath expression and returns a JSON string. |
| [`JSON_EXTRACT_SCALAR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#json_extract_scalar) | Selects a value according to the JSONPath expression and returns a JSON scalar. |

`JSON_EXTRACT(json, json_path)`

:   Selects a value in `json` according to the JSONPath expression `json_path`. `json_path` must be a string constant. Returns the value in JSON string format.

`JSON_EXTRACT_SCALAR(json, json_path)`

:   Selects a value in `json` according to the JSONPath expression `json_path`. `json_path` must be a string constant. Returns a scalar JSON value.

### Logical operators

Logical operators perform binary or ternary logic on expressions. Binary logic returns `true` or `false`. Ternary logic accommodates `NULL` values and returns `true`, `false`, or `NULL`.

#### Syntax

| Logical operators ||
|---|---|
| [`expr AND expr`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#and) | Returns `true` if both expressions are true. |
| [`expr OR expr`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#or) | Returns `true` if one or both expressions are true. |
| [`NOT expr`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#not) | Returns `true` if the expression is false. |

`expr AND expr`
:
- Returns `true` if both expressions are true.
- Returns `false` if one or both of the expressions are false.
- Returns `NULL` if both expressions are NULL or one expression is true and the other is NULL.

`expr OR expr`
:
- Returns `true` if one or both expressions are true.
- Returns `false` if both expressions are false.
- Returns `NULL` if both expressions are NULL or one expression is false and the other is NULL.

`NOT expr`
:
- Returns `true` if the expression is false.
- Returns `false` if the expression if true.
- Returns `NULL` if the expression is NULL.

You can use `NOT` with other functions as an negation operator. For example, `NOT IN(expr1, expr2)` or `IS NOT NULL`.

### Mathematical functions

Mathematical functions take numeric arguments and return a numeric result. Each argument can be a numeric literal or a numeric value returned by a query. If the mathematical function evaluates to an undefined result, the operation returns `NULL`.

#### Syntax

| Mathematical functions ||
|---|---|
| [`ABS()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#abs) | Returns the absolute value of the argument. |
| [`ACOS()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#acos) | Returns the arc cosine of the argument. |
| [`ACOSH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#acosh) | Returns the arc hyperbolic cosine of the argument. |
| [`ASIN()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#asin) | Returns the arc sine of the argument. |
| [`ASINH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#asinh) | Returns the arc hyperbolic sine of the argument. |
| [`ATAN()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#atan) | Returns the arc tangent of the argument. |
| [`ATANH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#atanh) | Returns the arc hyperbolic tangent of the argument. |
| [`ATAN2()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#atan2) | Returns the arc tangent of the two arguments. |
| [`CEIL()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#ceil) | Rounds the argument up to the nearest whole number and returns the rounded value. |
| [`COS()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#cos) | Returns the cosine of the argument. |
| [`COSH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#cosh) | Returns the hyperbolic cosine of the argument. |
| [`DEGREES()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#degrees) | Converts from radians to degrees. |
| [`EXP()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#exp) | Returns `e` to the power of the argument. |
| [`FLOOR()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#floor) | Rounds the argument down to the nearest whole number. |
| [`LN()` `LOG()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#ln) | Returns the natural logarithm of the argument. |
| [`LOG2()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#log2) | Returns the Base-2 logarithm of the argument. |
| [`LOG10()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#log10) | Returns the Base-10 logarithm of the argument. |
| [`PI()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#pi) | Returns the constant π. |
| [`POW()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#pow) | Returns first argument to the power of the second argument. |
| [`RADIANS()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#radians) | Converts from degrees to radians. |
| [`RAND()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#rand) | Returns a random float value in the range 0.0 \<= value \< 1.0. |
| [`ROUND()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#round) | Rounds the argument either up or down to the nearest whole number. |
| [`SIN()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#sin) | Returns the sine of the argument. |
| [`SINH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#sinh) | Returns the hyperbolic sine of the argument. |
| [`SQRT()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#sqrt) | Returns the square root of the expression. |
| [`TAN()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#tan) | Returns the tangent of the argument. |
| [`TANH()`](https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql#tanh) | Returns the hyperbolic tangent of the argument. |

`ABS(numeric_expr)`
:   Returns the absolute value of the argument.

`ACOS(numeric_expr)`
:   Returns the arc cosine of the argument.

`ACOSH(numeric_expr)`
:   Returns the arc hyperbolic cosine of the argument.

`ASIN(numeric_expr)`
:   Returns the arc sine of the argument.

`ASINH(numeric_expr)`
:   Returns the arc hyperbolic sine of the argument.

`ATAN(numeric_expr)`
:   Returns the arc tangent of the argument.

`ATANH(numeric_expr)`
:   Returns the arc hyperbolic tangent of the argument.

`ATAN2(numeric_expr1, numeric_expr2)`
:   Returns the arc tangent of the two arguments.

`CEIL(numeric_expr)`
:   Rounds the argument up to the nearest whole number and returns the rounded value.

`COS(numeric_expr)`
:   Returns the cosine of the argument.

`COSH(numeric_expr)`
:   Returns the hyperbolic cosine of the argument.

`DEGREES(numeric_expr)`
:   Returns `numeric_expr`, converted from radians to degrees.

`EXP(numeric_expr)`
:   Returns the result of raising the constant "e" - the base of the natural logarithm - to the power of *numeric_expr*.

`FLOOR(numeric_expr)`
:   Rounds the argument down to the nearest whole number and returns the rounded value.

`LN(numeric_expr)`  

`LOG(numeric_expr)`
:   Returns the natural logarithm of the argument.

`LOG2(numeric_expr)`
:   Returns the Base-2 logarithm of the argument.

`LOG10(numeric_expr)`
:   Returns the Base-10 logarithm of the argument.

`PI()`
:   Returns the constant π. The `PI()` function requires parentheses to signify that it is a function, but takes no arguments in those parentheses. You can use `PI()` like a constant with mathematical and arithmetic functions.

`POW(numeric_expr1, numeric_expr2)`
:   Returns the result of raising `numeric_expr1` to the power of `numeric_expr2`.

`RADIANS(numeric_expr)`
:   Returns `numeric_expr`, converted from degrees to radians. (Note that π radians equals 180 degrees.)

`RAND([int32_seed])`
:   Returns a random float value in the range 0.0 \<= value \< 1.0. Each `int32_seed` value always generates the same sequence of random numbers within a given query, as long as you don't use a `LIMIT` clause. If `int32_seed` is not specified, BigQuery uses the current timestamp as the seed value.

`ROUND(numeric_expr [, digits])`
:   Rounds the argument either up or down to the nearest whole number (or if specified, to the specified number of digits) and returns the rounded value.

`SIN(numeric_expr)`
:   Returns the sine of the argument.

`SINH(numeric_expr)`
:   Returns the hyperbolic sine of the argument.

`SQRT(numeric_expr)`
:   Returns the square root of the expression.

`TAN(numeric_expr)`
:   Returns the tangent of the argument.

`TANH(numeric_expr)`
:   Returns the hyperbolic tangent of the argument.

#### Advanced examples

- **Bounding box query**

  The following query returns a collection of points within a rectangular bounding box centered around San Francisco (37.46, -122.50).

  **Example:**

  ```sql
  #legacySQL
  SELECT
    year, month,
    AVG(mean_temp) avg_temp,
    MIN(min_temperature) min_temp,
    MAX(max_temperature) max_temp
  FROM
    [weather_geo.table]
  WHERE
    /* Return values between a pair of */
    /* latitude and longitude coordinates */
    lat / 1000 > 37.46 AND
    lat / 1000 < 37.65 AND
    long / 1000 > -122.50 AND
    long / 1000 < -122.30
  GROUP BY
    year, month
  ORDER BY
    year, month ASC;
  ```
- **Approximate Bounding Circle Query**

  Return a collection of up to 100 points within an approximated circle determined by the
  using the
  [Spherical Law of Cosines](https://www.movable-type.co.uk/scripts/latlong.html),
  centered around Denver Colorado (39.73, -104.98). This query makes use of
  BigQuery's mathematical and trigonometric functions, such as `PI()`,
  `SIN()`, and `COS()`.

  Because the Earth isn't an absolute sphere, and longitude+latitude converges at
  the poles, this query returns an approximation that can be useful for many types of data.

  **Example:**

  ```sql
  #legacySQL
  SELECT
    distance, lat, long, temp
  FROM
    (SELECT
      ((ACOS(SIN(39.73756700 * PI() / 180) *
             SIN((lat/1000) * PI() / 180) +
             COS(39.73756700 * PI() / 180) *
             COS((lat/1000) * PI() / 180) *
             COS((-104.98471790 -
             (long/1000)) * PI() / 180)) *
             180 / PI()) * 60 * 1.1515)
        AS distance,
       AVG(mean_temp) AS temp,
       AVG(lat/1000) lat, AVG(long/1000) long
  FROM
    [weather_geo.table]
  WHERE
    month=1 GROUP BY distance)
  WHERE
    distance < 100
  ORDER BY
    distance ASC
  LIMIT 100;
  ```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/legacy-sql (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page (level-6 headings become bold lines); definition-list bodies are un-indented by four spaces so that they are not read as code; the `:` markers of the twin are kept (GitHub Markdown has no definition lists); the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders; 2 code blocks whose twin text is damaged (links expanded into URLs, `<...>` dropped, table borders shortened) are matched to the rendered page by position and similarity, and the text is taken from the page; and inline code that the twin replaces with its link URL ([`FORMAT_UTC_USEC()`](https://developers.google.com/bigquery/docs/query-reference#timestampfunctions)) is restored from the link text of the rendered page. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- The official page is split into 2 files at section boundaries; this is part 1.
- Corrected from the official docs: the `UTC_USEC_TO_YEAR` description says the function returns `1274259481071200`, which is the input value of the example below it (a timestamp in May 2010). That example shows `1262304000000000` as the result, the microsecond value of `2010-01-01 00:00`, so the description is changed to match.
- Corrected from the official docs: the `TOP()` summary rows in both aggregate-function tables, and the `TOP` description, say "top max_records records". The syntax on this page is `TOP(field|alias[, max_values][,multiplier])` and the parameter is `max_values`, so `max_records` is changed to `max_values`.
- Conflicting official statements: the `GROUP BY` text says expressions computed in the `SELECT` clause (and their results) cannot be used as group keys, but the examples on this page group by the alias of a computed `IF(...)` expression (`GROUP BY state, sex`) and by the alias of a computed distance, and the introduction says aliases can be used in `GROUP BY`. The official text is kept as published.
- Caution: the n-gram example text says terms occur "at most 10,000 times", but the query tests `ngram_count < 10000`, which excludes exactly 10,000. The official text is kept as published.
- Caution: the `join_type` grammar contains `[ FULL ] [ OUTER ]`, which also allows an empty join type, while the text on this page lists `INNER`, `[FULL|RIGHT|LEFT] OUTER` and `CROSS JOIN`. The official text is kept as published.
- Caution: the bounding-box example is described as "centered around San Francisco (37.46, -122.50)", but the query bounds latitude from 37.46 to 37.65 and longitude from -122.50 to -122.30, so that point is a corner rather than the center. The official text is kept as published.

## Related

- [Index of this directory](./README.md)
- [Legacy SQL Syntax, Functions and Operators (part 2 of 2)](./legacy-sql-2.md)

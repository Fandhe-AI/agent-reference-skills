---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax
---

# Query syntax (part 2 of 3)

## Signature / Usage

### Join operation

```text
join_operation:
  { cross_join_operation | condition_join_operation }

cross_join_operation:
  from_item cross_join_operator from_item

condition_join_operation:
  from_item condition_join_operator from_item join_condition

cross_join_operator:
  { CROSS JOIN | , }

condition_join_operator:
  {
    [INNER] JOIN
    | FULL [OUTER] JOIN
    | LEFT [OUTER] JOIN
    | RIGHT [OUTER] JOIN
  }

join_condition:
  { on_clause | using_clause }

on_clause:
  ON bool_expression

using_clause:
  USING ( column_list )
```

The `JOIN` operation combines two `from_item`s so that the `SELECT` clause can
query them as one source. The join operation pairs rows from the two
`from_item`s, and a join condition filters those pairs to determine which rows
appear in the output.

#### `[INNER] JOIN`

An `INNER JOIN`, or simply `JOIN`, effectively calculates the Cartesian product
of the two `from_item`s and discards all rows that don't meet the join
condition. *Effectively* means that it's possible to implement an `INNER JOIN`
without actually calculating the Cartesian product.

```sql
FROM A INNER JOIN B ON A.w = B.y

/*
Table A       Table B       Result
+-------+     +-------+     +---------------+
| w | x |  *  | y | z |  =  | w | x | y | z |
+-------+     +-------+     +---------------+
| 1 | a |     | 2 | k |     | 2 | b | 2 | k |
| 2 | b |     | 3 | m |     | 3 | c | 3 | m |
| 3 | c |     | 3 | n |     | 3 | c | 3 | n |
| 3 | d |     | 4 | p |     | 3 | d | 3 | m |
+-------+     +-------+     | 3 | d | 3 | n |
                            +---------------+
*/
```

```sql
FROM A INNER JOIN B USING (x)

/*
Table A       Table B       Result
+-------+     +-------+     +-----------+
| x | y |  *  | x | z |  =  | x | y | z |
+-------+     +-------+     +-----------+
| 1 | a |     | 2 | k |     | 2 | b | k |
| 2 | b |     | 3 | m |     | 3 | c | m |
| 3 | c |     | 3 | n |     | 3 | c | n |
| 3 | d |     | 4 | p |     | 3 | d | m |
+-------+     +-------+     | 3 | d | n |
                            +-----------+
*/
```

**Example**

This query performs an `INNER JOIN` on the [`Roster`](query-syntax-3.md#roster-table)
and [`TeamMascot`](query-syntax-3.md#teammascot-table) tables.

```sql
SELECT Roster.LastName, TeamMascot.Mascot
FROM Roster JOIN TeamMascot ON Roster.SchoolID = TeamMascot.SchoolID;

/*---------------------------+
 | LastName   | Mascot       |
 +---------------------------+
 | Adams      | Jaguars      |
 | Buchanan   | Lakers       |
 | Coolidge   | Lakers       |
 | Davis      | Knights      |
 +---------------------------*/
```

You can use a [correlated](#correlated-join-operation) `INNER JOIN` to flatten an array
into a set of rows. To learn more, see
[Convert elements in an array to rows in a table](https://docs.cloud.google.com/bigquery/docs/arrays#flattening_arrays).

#### `CROSS JOIN`

`CROSS JOIN` returns the Cartesian product of the two `from_item`s. In other
words, it combines each row from the first `from_item` with each row from the
second `from_item`.

If the rows of the two `from_item`s are independent, then the result has
*M \* N* rows, given *M* rows in one `from_item` and *N* in the other. Note that
this still holds for the case when either `from_item` has zero rows.

In a `FROM` clause, a `CROSS JOIN` can be written like this:

```sql
FROM A CROSS JOIN B

/*
Table A       Table B       Result
+-------+     +-------+     +---------------+
| w | x |  *  | y | z |  =  | w | x | y | z |
+-------+     +-------+     +---------------+
| 1 | a |     | 2 | c |     | 1 | a | 2 | c |
| 2 | b |     | 3 | d |     | 1 | a | 3 | d |
+-------+     +-------+     | 2 | b | 2 | c |
                            | 2 | b | 3 | d |
                            +---------------+
*/
```

You can use a [correlated](#correlated-join-operation) cross join to convert or
flatten an array into a set of rows, though the (equivalent) `INNER JOIN` is
preferred over `CROSS JOIN` for this case. To learn more, see
[Convert elements in an array to rows in a table](https://docs.cloud.google.com/bigquery/docs/arrays#flattening_arrays).

**Examples**

This query performs an `CROSS JOIN` on the [`Roster`](query-syntax-3.md#roster-table)
and [`TeamMascot`](query-syntax-3.md#teammascot-table) tables.

```sql
SELECT Roster.LastName, TeamMascot.Mascot
FROM Roster CROSS JOIN TeamMascot;

/*---------------------------+
 | LastName   | Mascot       |
 +---------------------------+
 | Adams      | Jaguars      |
 | Adams      | Knights      |
 | Adams      | Lakers       |
 | Adams      | Mustangs     |
 | Buchanan   | Jaguars      |
 | Buchanan   | Knights      |
 | Buchanan   | Lakers       |
 | Buchanan   | Mustangs     |
 | ...                       |
 +---------------------------*/
```

#### Comma cross join (,)

[`CROSS JOIN`](#cross-join)s can be written implicitly with a comma. This is
called a comma cross join.

A comma cross join looks like this in a `FROM` clause:

```sql
FROM A, B

/*
Table A       Table B       Result
+-------+     +-------+     +---------------+
| w | x |  *  | y | z |  =  | w | x | y | z |
+-------+     +-------+     +---------------+
| 1 | a |     | 2 | c |     | 1 | a | 2 | c |
| 2 | b |     | 3 | d |     | 1 | a | 3 | d |
+-------+     +-------+     | 2 | b | 2 | c |
                            | 2 | b | 3 | d |
                            +---------------+
*/
```

You can't write comma cross joins inside parentheses. To learn more, see
[Join operations in a sequence](#join-operations-in-a-sequence).

```sql
FROM (A, B)  // INVALID
```

You can use a [correlated](#correlated-join-operation) comma cross join to convert or
flatten an array into a set of rows. To learn more, see
[Convert elements in an array to rows in a table](https://docs.cloud.google.com/bigquery/docs/arrays#flattening_arrays).

**Examples**

This query performs a comma cross join on the [`Roster`](query-syntax-3.md#roster-table)
and [`TeamMascot`](query-syntax-3.md#teammascot-table) tables.

```sql
SELECT Roster.LastName, TeamMascot.Mascot
FROM Roster, TeamMascot;

/*---------------------------+
 | LastName   | Mascot       |
 +---------------------------+
 | Adams      | Jaguars      |
 | Adams      | Knights      |
 | Adams      | Lakers       |
 | Adams      | Mustangs     |
 | Buchanan   | Jaguars      |
 | Buchanan   | Knights      |
 | Buchanan   | Lakers       |
 | Buchanan   | Mustangs     |
 | ...                       |
 +---------------------------*/
```

#### `FULL [OUTER] JOIN`

A `FULL OUTER JOIN` (or simply `FULL JOIN`) returns all fields for all matching
rows in both `from_items` that meet the join condition. If a given row from one
`from_item` doesn't join to any row in the other `from_item`, the row returns
with `NULL` values for all columns from the other `from_item`.

```sql
FROM A FULL OUTER JOIN B ON A.w = B.y

/*
Table A       Table B       Result
+-------+     +-------+     +---------------------------+
| w | x |  *  | y | z |  =  | w    | x    | y    | z    |
+-------+     +-------+     +---------------------------+
| 1 | a |     | 2 | k |     | 1    | a    | NULL | NULL |
| 2 | b |     | 3 | m |     | 2    | b    | 2    | k    |
| 3 | c |     | 3 | n |     | 3    | c    | 3    | m    |
| 3 | d |     | 4 | p |     | 3    | c    | 3    | n    |
+-------+     +-------+     | 3    | d    | 3    | m    |
                            | 3    | d    | 3    | n    |
                            | NULL | NULL | 4    | p    |
                            +---------------------------+
*/
```

```sql
FROM A FULL OUTER JOIN B USING (x)

/*
Table A       Table B       Result
+-------+     +-------+     +--------------------+
| x | y |  *  | x | z |  =  | x    | y    | z    |
+-------+     +-------+     +--------------------+
| 1 | a |     | 2 | k |     | 1    | a    | NULL |
| 2 | b |     | 3 | m |     | 2    | b    | k    |
| 3 | c |     | 3 | n |     | 3    | c    | m    |
| 3 | d |     | 4 | p |     | 3    | c    | n    |
+-------+     +-------+     | 3    | d    | m    |
                            | 3    | d    | n    |
                            | 4    | NULL | p    |
                            +--------------------+
*/
```

**Example**

This query performs a `FULL JOIN` on the [`Roster`](query-syntax-3.md#roster-table)
and [`TeamMascot`](query-syntax-3.md#teammascot-table) tables.

```sql
SELECT Roster.LastName, TeamMascot.Mascot
FROM Roster FULL JOIN TeamMascot ON Roster.SchoolID = TeamMascot.SchoolID;

/*---------------------------+
 | LastName   | Mascot       |
 +---------------------------+
 | Adams      | Jaguars      |
 | Buchanan   | Lakers       |
 | Coolidge   | Lakers       |
 | Davis      | Knights      |
 | Eisenhower | NULL         |
 | NULL       | Mustangs     |
 +---------------------------*/
```

#### `LEFT [OUTER] JOIN`

The result of a `LEFT OUTER JOIN` (or simply `LEFT JOIN`) for two
`from_item`s always retains all rows of the left `from_item` in the
`JOIN` operation, even if no rows in the right `from_item` satisfy the join
predicate.

All rows from the *left* `from_item` are retained;
if a given row from the left `from_item` doesn't join to any row
in the *right* `from_item`, the row will return with `NULL` values for all
columns exclusively from the right `from_item`. Rows from the right
`from_item` that don't join to any row in the left `from_item` are discarded.

```sql
FROM A LEFT OUTER JOIN B ON A.w = B.y

/*
Table A       Table B       Result
+-------+     +-------+     +---------------------------+
| w | x |  *  | y | z |  =  | w    | x    | y    | z    |
+-------+     +-------+     +---------------------------+
| 1 | a |     | 2 | k |     | 1    | a    | NULL | NULL |
| 2 | b |     | 3 | m |     | 2    | b    | 2    | k    |
| 3 | c |     | 3 | n |     | 3    | c    | 3    | m    |
| 3 | d |     | 4 | p |     | 3    | c    | 3    | n    |
+-------+     +-------+     | 3    | d    | 3    | m    |
                            | 3    | d    | 3    | n    |
                            +---------------------------+
*/
```

```sql
FROM A LEFT OUTER JOIN B USING (x)

/*
Table A       Table B       Result
+-------+     +-------+     +--------------------+
| x | y |  *  | x | z |  =  | x    | y    | z    |
+-------+     +-------+     +--------------------+
| 1 | a |     | 2 | k |     | 1    | a    | NULL |
| 2 | b |     | 3 | m |     | 2    | b    | k    |
| 3 | c |     | 3 | n |     | 3    | c    | m    |
| 3 | d |     | 4 | p |     | 3    | c    | n    |
+-------+     +-------+     | 3    | d    | m    |
                            | 3    | d    | n    |
                            +--------------------+
*/
```

**Example**

This query performs a `LEFT JOIN` on the [`Roster`](query-syntax-3.md#roster-table)
and [`TeamMascot`](query-syntax-3.md#teammascot-table) tables.

```sql
SELECT Roster.LastName, TeamMascot.Mascot
FROM Roster LEFT JOIN TeamMascot ON Roster.SchoolID = TeamMascot.SchoolID;

/*---------------------------+
 | LastName   | Mascot       |
 +---------------------------+
 | Adams      | Jaguars      |
 | Buchanan   | Lakers       |
 | Coolidge   | Lakers       |
 | Davis      | Knights      |
 | Eisenhower | NULL         |
 +---------------------------*/
```

#### `RIGHT [OUTER] JOIN`

The result of a `RIGHT OUTER JOIN` (or simply `RIGHT JOIN`) for two
`from_item`s always retains all rows of the right `from_item` in the
`JOIN` operation, even if no rows in the left `from_item` satisfy the join
predicate.

All rows from the *right* `from_item` are returned;
if a given row from the right `from_item` doesn't join to any row
in the *left* `from_item`, the row will return with `NULL` values for all
columns exclusively from the left `from_item`. Rows from the left `from_item`
that don't join to any row in the right `from_item` are discarded.

```sql
FROM A RIGHT OUTER JOIN B ON A.w = B.y

/*
Table A       Table B       Result
+-------+     +-------+     +---------------------------+
| w | x |  *  | y | z |  =  | w    | x    | y    | z    |
+-------+     +-------+     +---------------------------+
| 1 | a |     | 2 | k |     | 2    | b    | 2    | k    |
| 2 | b |     | 3 | m |     | 3    | c    | 3    | m    |
| 3 | c |     | 3 | n |     | 3    | c    | 3    | n    |
| 3 | d |     | 4 | p |     | 3    | d    | 3    | m    |
+-------+     +-------+     | 3    | d    | 3    | n    |
                            | NULL | NULL | 4    | p    |
                            +---------------------------+
*/
```

```sql
FROM A RIGHT OUTER JOIN B USING (x)

/*
Table A       Table B       Result
+-------+     +-------+     +--------------------+
| x | y |  *  | x | z |  =  | x    | y    | z    |
+-------+     +-------+     +--------------------+
| 1 | a |     | 2 | k |     | 2    | b    | k    |
| 2 | b |     | 3 | m |     | 3    | c    | m    |
| 3 | c |     | 3 | n |     | 3    | c    | n    |
| 3 | d |     | 4 | p |     | 3    | d    | m    |
+-------+     +-------+     | 3    | d    | n    |
                            | 4    | NULL | p    |
                            +--------------------+
*/
```

**Example**

This query performs a `RIGHT JOIN` on the [`Roster`](query-syntax-3.md#roster-table)
and [`TeamMascot`](query-syntax-3.md#teammascot-table) tables.

```sql
SELECT Roster.LastName, TeamMascot.Mascot
FROM Roster RIGHT JOIN TeamMascot ON Roster.SchoolID = TeamMascot.SchoolID;

/*---------------------------+
 | LastName   | Mascot       |
 +---------------------------+
 | Adams      | Jaguars      |
 | Buchanan   | Lakers       |
 | Coolidge   | Lakers       |
 | Davis      | Knights      |
 | NULL       | Mustangs     |
 +---------------------------*/
```

#### Join conditions

A [join operation](#join-operation) pairs rows from two `from_item`s, and a join
condition filters those pairs to determine which rows appear in the output.

The two types of join conditions are the [`ON` clause](#on-clause) and
[`USING` clause](#using-clause).

When you use the `JOIN` keyword, you typically need an
`ON` or `USING` clause to specify the join
condition. An
exception is the [`CROSS JOIN` operator](#cross-join), which doesn't support an
`ON` or `USING` clause.

##### `ON` clause

```sql
ON bool_expression
```

**Description**

The `ON` clause determines which rows from a join operation appear in the
output. Given a row from the Cartesian product of two `from_item`s, if
`bool_expression` evaluates to `TRUE`, the join includes that row in the
output.

Definitions:

- `bool_expression`: The boolean expression that specifies the condition for the join. This is frequently a [comparison operation](operators.md#comparison-operators) or logical combination of comparison operators.

Details:

Similarly to `CROSS JOIN`, `ON` produces a column once for each column in each
input table.

A `NULL` join condition evaluation is equivalent to a `FALSE` evaluation.

If a column-order sensitive operation such as `UNION` or `SELECT *` is used with
the `ON` join condition, the resulting table contains all of the columns from
the left input in order, and then all of the columns from the right input in
order.

**Examples**

The following examples show how to use the `ON` clause:

```sql
WITH
  A AS ( SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3),
  B AS ( SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4)
SELECT * FROM A INNER JOIN B ON A.x = B.x;

WITH
  A AS ( SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3),
  B AS ( SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4)
SELECT A.x, B.x FROM A INNER JOIN B ON A.x = B.x;

/*
Table A   Table B   Result (A.x, B.x)
+---+     +---+     +-------+
| x |  *  | x |  =  | x | x |
+---+     +---+     +-------+
| 1 |     | 2 |     | 2 | 2 |
| 2 |     | 3 |     | 3 | 3 |
| 3 |     | 4 |     +-------+
+---+     +---+
*/
```

```sql
WITH
  A AS ( SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT NULL),
  B AS ( SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5)
SELECT * FROM A LEFT OUTER JOIN B ON A.x = B.x;

WITH
  A AS ( SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT NULL),
  B AS ( SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5)
SELECT A.x, B.x FROM A LEFT OUTER JOIN B ON A.x = B.x;

/*
Table A    Table B   Result
+------+   +---+     +-------------+
| x    | * | x |  =  | x    | x    |
+------+   +---+     +-------------+
| 1    |   | 2 |     | 1    | NULL |
| 2    |   | 3 |     | 2    | 2    |
| 3    |   | 4 |     | 3    | 3    |
| NULL |   | 5 |     | NULL | NULL |
+------+   +---+     +-------------+
*/
```

```sql
WITH
  A AS ( SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT NULL),
  B AS ( SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5)
SELECT * FROM A FULL OUTER JOIN B ON A.x = B.x;

WITH
  A AS ( SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT NULL),
  B AS ( SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5)
SELECT A.x, B.x FROM A FULL OUTER JOIN B ON A.x = B.x;

/*
Table A    Table B   Result
+------+   +---+     +-------------+
| x    | * | x |  =  | x    | x    |
+------+   +---+     +-------------+
| 1    |   | 2 |     | 1    | NULL |
| 2    |   | 3 |     | 2    | 2    |
| 3    |   | 4 |     | 3    | 3    |
| NULL |   | 5 |     | NULL | NULL |
+------+   +---+     | NULL | 4    |
                     | NULL | 5    |
                     +-------------+
*/
```

##### `USING` clause

```sql
USING ( column_name_list )

column_name_list:
    column_name[, ...]
```

**Description**

The `USING` clause determines which rows from a join operation appear in the
output. The `USING` clause performs an
[equality comparison operation](operators.md#comparison-operators) on the columns named in
`column_name_list`. Each column name in `column_name_list` must appear in both
input tables. Given a row from the Cartesian product of two `from_item`s, if
the equality comparisons all evaluate to `TRUE`, the join includes that row
in the output.

Definitions:

- `column_name_list`: A list of columns to include in the join condition.
- `column_name`: The column that exists in both of the tables that you are joining.

Details:

A `NULL` join condition evaluation is equivalent to a `FALSE` evaluation.

If a column-order sensitive operation such as `UNION` or `SELECT *` is used
with the `USING` join condition, the resulting table contains columns in this
order:

- The columns from `column_name_list` in the order they appear in the `USING` clause.
- All other columns of the left input in the order they appear in the input.
- All other columns of the right input in the order they appear in the input.

A column name in the `USING` clause must not be qualified by a
table name.

If the join is an `INNER JOIN` or a `LEFT OUTER JOIN`, the output
columns are populated from the values in the first table. If the
join is a `RIGHT OUTER JOIN`, the output columns are populated from the values
in the second table. If the join is a `FULL OUTER JOIN`, the output columns
are populated by [coalescing](../googlesql-functions/conditional_expressions.md#coalesce) the values from the left and right
tables in that order.

**Examples**

The following example shows how to use the `USING` clause with one
column name in the column name list:

```sql
WITH
  A AS ( SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 9 UNION ALL SELECT NULL),
  B AS ( SELECT 2 as x UNION ALL SELECT 9 UNION ALL SELECT 9 UNION ALL SELECT 5)
SELECT * FROM A INNER JOIN B USING (x);

/*
Table A    Table B   Result
+------+   +---+     +---+
| x    | * | x |  =  | x |
+------+   +---+     +---+
| 1    |   | 2 |     | 2 |
| 2    |   | 9 |     | 9 |
| 9    |   | 9 |     | 9 |
| NULL |   | 5 |     +---+
+------+   +---+
*/
```

The following example shows how to use the `USING` clause with
multiple column names in the column name list:

```sql
WITH
  A AS (
    SELECT 1 as x, 15 as y UNION ALL
    SELECT 2, 10 UNION ALL
    SELECT 9, 16 UNION ALL
    SELECT NULL, 12),
  B AS (
    SELECT 2 as x, 10 as y UNION ALL
    SELECT 9, 17 UNION ALL
    SELECT 9, 16 UNION ALL
    SELECT 5, 15)
SELECT * FROM A INNER JOIN B USING (x, y);

/*
Table A         Table B        Result
+-----------+   +---------+     +---------+
| x    | y  | * | x  | y  |  =  | x  | y  |
+-----------+   +---------+     +---------+
| 1    | 15 |   | 2  | 10 |     | 2  | 10 |
| 2    | 10 |   | 9  | 17 |     | 9  | 16 |
| 9    | 16 |   | 9  | 16 |     +---------+
| NULL | 12 |   | 5  | 15 |
+-----------+   +---------+
*/
```

The following examples show additional ways in which to use the `USING` clause
with one column name in the column name list:

```sql
WITH
  A AS ( SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 9 UNION ALL SELECT NULL),
  B AS ( SELECT 2 as x UNION ALL SELECT 9 UNION ALL SELECT 9 UNION ALL SELECT 5)
SELECT x, A.x, B.x FROM A INNER JOIN B USING (x)

/*
Table A    Table B   Result
+------+   +---+     +--------------------+
| x    | * | x |  =  | x    | A.x  | B.x  |
+------+   +---+     +--------------------+
| 1    |   | 2 |     | 2    | 2    | 2    |
| 2    |   | 9 |     | 9    | 9    | 9    |
| 9    |   | 9 |     | 9    | 9    | 9    |
| NULL |   | 5 |     +--------------------+
+------+   +---+
*/
```

```sql
WITH
  A AS ( SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 9 UNION ALL SELECT NULL),
  B AS ( SELECT 2 as x UNION ALL SELECT 9 UNION ALL SELECT 9 UNION ALL SELECT 5)
SELECT x, A.x, B.x FROM A LEFT OUTER JOIN B USING (x)

/*
Table A    Table B   Result
+------+   +---+     +--------------------+
| x    | * | x |  =  | x    | A.x  | B.x  |
+------+   +---+     +--------------------+
| 1    |   | 2 |     | 1    | 1    | NULL |
| 2    |   | 9 |     | 2    | 2    | 2    |
| 9    |   | 9 |     | 9    | 9    | 9    |
| NULL |   | 5 |     | 9    | 9    | 9    |
+------+   +---+     | NULL | NULL | NULL |
                     +--------------------+
*/
```

```sql
WITH
  A AS ( SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 2 UNION ALL SELECT NULL),
  B AS ( SELECT 2 as x UNION ALL SELECT 9 UNION ALL SELECT 9 UNION ALL SELECT 5)
SELECT x, A.x, B.x FROM A RIGHT OUTER JOIN B USING (x)

/*
Table A    Table B   Result
+------+   +---+     +--------------------+
| x    | * | x |  =  | x    | A.x  | B.x  |
+------+   +---+     +--------------------+
| 1    |   | 2 |     | 2    | 2    | 2    |
| 2    |   | 9 |     | 2    | 2    | 2    |
| 2    |   | 9 |     | 9    | NULL | 9    |
| NULL |   | 5 |     | 9    | NULL | 9    |
+------+   +---+     | 5    | NULL | 5    |
                     +--------------------+
*/
```

```sql
WITH
  A AS ( SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 2 UNION ALL SELECT NULL),
  B AS ( SELECT 2 as x UNION ALL SELECT 9 UNION ALL SELECT 9 UNION ALL SELECT 5)
SELECT x, A.x, B.x FROM A FULL OUTER JOIN B USING (x);

/*
Table A    Table B   Result
+------+   +---+     +--------------------+
| x    | * | x |  =  | x    | A.x  | B.x  |
+------+   +---+     +--------------------+
| 1    |   | 2 |     | 1    | 1    | NULL |
| 2    |   | 9 |     | 2    | 2    | 2    |
| 2    |   | 9 |     | 2    | 2    | 2    |
| NULL |   | 5 |     | NULL | NULL | NULL |
+------+   +---+     | 9    | NULL | 9    |
                     | 9    | NULL | 9    |
                     | 5    | NULL | 5    |
                     +--------------------+
*/
```

The following example shows how to use the `USING` clause with
only some column names in the column name list.

```sql
WITH
  A AS (
    SELECT 1 as x, 15 as y UNION ALL
    SELECT 2, 10 UNION ALL
    SELECT 9, 16 UNION ALL
    SELECT NULL, 12),
  B AS (
    SELECT 2 as x, 10 as y UNION ALL
    SELECT 9, 17 UNION ALL
    SELECT 9, 16 UNION ALL
    SELECT 5, 15)
SELECT * FROM A INNER JOIN B USING (x);

/*
Table A         Table B         Result
+-----------+   +---------+     +-----------------+
| x    | y  | * | x  | y  |  =  | x   | A.y | B.y |
+-----------+   +---------+     +-----------------+
| 1    | 15 |   | 2  | 10 |     | 2   | 10  | 10  |
| 2    | 10 |   | 9  | 17 |     | 9   | 16  | 17  |
| 9    | 16 |   | 9  | 16 |     | 9   | 16  | 16  |
| NULL | 12 |   | 5  | 15 |     +-----------------+
+-----------+   +---------+
*/
```

The following query performs an `INNER JOIN` on the
[`Roster`](query-syntax-3.md#roster-table) and [`TeamMascot`](query-syntax-3.md#teammascot-table) table.
The query returns the rows from `Roster` and `TeamMascot` where
`Roster.SchoolID` is the same as `TeamMascot.SchoolID`. The results include a
single `SchoolID` column.

```sql
SELECT * FROM Roster INNER JOIN TeamMascot USING (SchoolID);

/*----------------------------------------+
 | SchoolID   | LastName   | Mascot       |
 +----------------------------------------+
 | 50         | Adams      | Jaguars      |
 | 52         | Buchanan   | Lakers       |
 | 52         | Coolidge   | Lakers       |
 | 51         | Davis      | Knights      |
 +----------------------------------------*/
```

##### `ON` and `USING` equivalency

The [`ON`](#on-clause) and [`USING`](#using-clause) join conditions aren't
equivalent, but they share some rules and sometimes they can produce similar
results.

In the following examples, observe what is returned when all rows
are produced for inner and outer joins. Also, look at how
each join condition handles `NULL` values.

```sql
WITH
  A AS (SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3),
  B AS (SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4)
SELECT * FROM A INNER JOIN B ON A.x = B.x;

WITH
  A AS (SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3),
  B AS (SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4)
SELECT * FROM A INNER JOIN B USING (x);

/*
Table A   Table B   Result ON     Result USING
+---+     +---+     +-------+     +---+
| x |  *  | x |  =  | x | x |     | x |
+---+     +---+     +-------+     +---+
| 1 |     | 2 |     | 2 | 2 |     | 2 |
| 2 |     | 3 |     | 3 | 3 |     | 3 |
| 3 |     | 4 |     +-------+     +---+
+---+     +---+
*/
```

```sql
WITH
  A AS (SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT NULL),
  B AS (SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5)
SELECT * FROM A LEFT OUTER JOIN B ON A.x = B.x;

WITH
  A AS (SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT NULL),
  B AS (SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5)
SELECT * FROM A LEFT OUTER JOIN B USING (x);

/*
Table A    Table B   Result ON           Result USING
+------+   +---+     +-------------+     +------+
| x    | * | x |  =  | x    | x    |     | x    |
+------+   +---+     +-------------+     +------+
| 1    |   | 2 |     | 1    | NULL |     | 1    |
| 2    |   | 3 |     | 2    | 2    |     | 2    |
| 3    |   | 4 |     | 3    | 3    |     | 3    |
| NULL |   | 5 |     | NULL | NULL |     | NULL |
+------+   +---+     +-------------+     +------+
*/
```

```sql
WITH
  A AS (SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3),
  B AS (SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4)
SELECT * FROM A FULL OUTER JOIN B ON A.x = B.x;

WITH
  A AS (SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3),
  B AS (SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4)
SELECT * FROM A FULL OUTER JOIN B USING (x);

/*
Table A   Table B   Result ON           Result USING
+---+     +---+     +-------------+     +---+
| x |  *  | x |  =  | x    | x    |     | x |
+---+     +---+     +-------------+     +---+
| 1 |     | 2 |     | 1    | NULL |     | 1 |
| 2 |     | 3 |     | 2    | 2    |     | 2 |
| 3 |     | 4 |     | 3    | 3    |     | 3 |
+---+     +---+     | NULL | 4    |     | 4 |
                    +-------------+     +---+
*/
```

Although `ON` and `USING` aren't equivalent, they can return the same
results in some situations if you specify the columns you want to return.

In the following examples, observe what is returned when a specific row
is produced for inner and outer joins. Also, look at how each
join condition handles `NULL` values.

```sql
WITH
  A AS (SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT NULL),
  B AS (SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5)
SELECT A.x FROM A INNER JOIN B ON A.x = B.x;

WITH
  A AS (SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT NULL),
  B AS (SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5)
SELECT x FROM A INNER JOIN B USING (x);

/*
Table A    Table B   Result ON     Result USING
+------+   +---+     +---+         +---+
| x    | * | x |  =  | x |         | x |
+------+   +---+     +---+         +---+
| 1    |   | 2 |     | 2 |         | 2 |
| 2    |   | 3 |     | 3 |         | 3 |
| 3    |   | 4 |     +---+         +---+
| NULL |   | 5 |
+------+   +---+
*/
```

```sql
WITH
  A AS (SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT NULL),
  B AS (SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5)
SELECT A.x FROM A LEFT OUTER JOIN B ON A.x = B.x;

WITH
  A AS (SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT NULL),
  B AS (SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5)
SELECT x FROM A LEFT OUTER JOIN B USING (x);

/*
Table A    Table B   Result ON    Result USING
+------+   +---+     +------+     +------+
| x    | * | x |  =  | x    |     | x    |
+------+   +---+     +------+     +------+
| 1    |   | 2 |     | 1    |     | 1    |
| 2    |   | 3 |     | 2    |     | 2    |
| 3    |   | 4 |     | 3    |     | 3    |
| NULL |   | 5 |     | NULL |     | NULL |
+------+   +---+     +------+     +------+
*/
```

```sql
WITH
  A AS (SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT NULL),
  B AS (SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5)
SELECT A.x FROM A FULL OUTER JOIN B ON A.x = B.x;

WITH
  A AS (SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT NULL),
  B AS (SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5)
SELECT x FROM A FULL OUTER JOIN B USING (x);

/*
Table A    Table B   Result ON    Result USING
+------+   +---+     +------+     +------+
| x    | * | x |  =  | x    |     | x    |
+------+   +---+     +------+     +------+
| 1    |   | 2 |     | 1    |     | 1    |
| 2    |   | 3 |     | 2    |     | 2    |
| 3    |   | 4 |     | 3    |     | 3    |
| NULL |   | 5 |     | NULL |     | NULL |
+------+   +---+     | NULL |     | 4    |
                     | NULL |     | 5    |
                     +------+     +------+
*/
```

```sql
WITH
  A AS (SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT NULL),
  B AS (SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5)
SELECT B.x FROM A FULL OUTER JOIN B ON A.x = B.x;

WITH
  A AS (SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT NULL),
  B AS (SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5)
SELECT x FROM A FULL OUTER JOIN B USING (x);

/*
Table A    Table B   Result ON    Result USING
+------+   +---+     +------+     +------+
| x    | * | x |  =  | x    |     | x    |
+------+   +---+     +------+     +------+
| 1    |   | 2 |     | 2    |     | 1    |
| 2    |   | 3 |     | 3    |     | 2    |
| 3    |   | 4 |     | NULL |     | 3    |
| NULL |   | 5 |     | NULL |     | NULL |
+------+   +---+     | 4    |     | 4    |
                     | 5    |     | 5    |
                     +------+     +------+
*/
```

In the following example, observe what is returned when `COALESCE` is used
with the `ON` clause. It provides the same results as a query
with the `USING` clause.

```sql
WITH
  A AS (SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT NULL),
  B AS (SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5)
SELECT COALESCE(A.x, B.x) FROM A FULL OUTER JOIN B ON A.x = B.x;

WITH
  A AS (SELECT 1 as x UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT NULL),
  B AS (SELECT 2 as x UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5)
SELECT x FROM A FULL OUTER JOIN B USING (x);

/*
Table A    Table B   Result ON    Result USING
+------+   +---+     +------+     +------+
| x    | * | x |  =  | x    |     | x    |
+------+   +---+     +------+     +------+
| 1    |   | 2 |     | 1    |     | 1    |
| 2    |   | 3 |     | 2    |     | 2    |
| 3    |   | 4 |     | 3    |     | 3    |
| NULL |   | 5 |     | NULL |     | NULL |
+------+   +---+     | 4    |     | 4    |
                     | 5    |     | 5    |
                     +------+     +------+
*/
```

#### Join operations in a sequence

The `FROM` clause can contain multiple `JOIN` operations in a sequence.
`JOIN`s are bound from left to right. For example:

```sql
FROM A JOIN B USING (x) JOIN C USING (x)

-- A JOIN B USING (x)        = result_1
-- result_1 JOIN C USING (x) = result_2
-- result_2                  = return value
```

You can also insert parentheses to group `JOIN`s:

```sql
FROM ( (A JOIN B USING (x)) JOIN C USING (x) )

-- A JOIN B USING (x)        = result_1
-- result_1 JOIN C USING (x) = result_2
-- result_2                  = return value
```

With parentheses, you can group `JOIN`s so that they are bound in a different
order:

```sql
FROM ( A JOIN (B JOIN C USING (x)) USING (x) )

-- B JOIN C USING (x)       = result_1
-- A JOIN result_1          = result_2
-- result_2                 = return value
```

A `FROM` clause can have multiple joins. Provided there are no comma cross joins
in the `FROM` clause, joins don't require parenthesis, though parenthesis can
help readability:

```sql
FROM A JOIN B JOIN C JOIN D USING (w) ON B.x = C.y ON A.z = B.x
```

If your clause contains comma cross joins, you must use parentheses:

```sql
FROM A, B JOIN C JOIN D ON C.x = D.y ON B.z = C.x    // INVALID
```

```sql
FROM A, B JOIN (C JOIN D ON C.x = D.y) ON B.z = C.x  // VALID
```

When comma cross joins are present in a query with a sequence of JOINs, they
group from left to right like other `JOIN` types:

```sql
FROM A JOIN B USING (x) JOIN C USING (x), D

-- A JOIN B USING (x)        = result_1
-- result_1 JOIN C USING (x) = result_2
-- result_2 CROSS JOIN D     = return value
```

There can't be a `RIGHT JOIN` or `FULL JOIN` after a comma cross join unless
it's parenthesized:

```sql
FROM A, B RIGHT JOIN C ON TRUE // INVALID
```

```sql
FROM A, B FULL JOIN C ON TRUE  // INVALID
```

```sql
FROM A, B JOIN C ON TRUE       // VALID
```

```sql
FROM A, (B RIGHT JOIN C ON TRUE) // VALID
```

```sql
FROM A, (B FULL JOIN C ON TRUE)  // VALID
```

#### Correlated join operation

A join operation is *correlated* when the right `from_item` contains a
reference to at least one range variable or
column name introduced by the left `from_item`.

In a correlated join operation, rows from the right `from_item` are determined
by a row from the left `from_item`. Consequently, `RIGHT OUTER` and `FULL OUTER`
joins can't be correlated because right `from_item` rows can't be determined
in the case when there is no row from the left `from_item`.

All correlated join operations must reference an array in the right `from_item`.

This is a conceptual example of a correlated join operation that includes
a [correlated subquery](subqueries.md#correlated-subqueries):

```sql
FROM A JOIN UNNEST(ARRAY(SELECT AS STRUCT * FROM B WHERE A.ID = B.ID)) AS C
```

- Left `from_item`: `A`
- Right `from_item`: `UNNEST(...) AS C`
- A correlated subquery: `(SELECT AS STRUCT * FROM B WHERE A.ID = B.ID)`

This is another conceptual example of a correlated join operation.
`array_of_IDs` is part of the left `from_item` but is referenced in the
right `from_item`.

```sql
FROM A JOIN UNNEST(A.array_of_IDs) AS C
```

The [`UNNEST` operator](query-syntax-1.md#unnest-operator) can be explicit or implicit.
These are both allowed:

```sql
FROM A JOIN UNNEST(A.array_of_IDs) AS IDs
```

```sql
FROM A JOIN A.array_of_IDs AS IDs
```

In a correlated join operation, the right `from_item` is re-evaluated
against each distinct row from the left `from_item`. In the following
conceptual example, the correlated join operation first
evaluates `A` and `B`, then `A` and `C`:

```sql
FROM
  A
  JOIN
  UNNEST(ARRAY(SELECT AS STRUCT * FROM B WHERE A.ID = B.ID)) AS C
  ON A.Name = C.Name
```

**Caveats**

- In a correlated `LEFT JOIN`, when the input table on the right side is empty for some row from the left side, it's as if no rows from the right side satisfied the join condition in a regular `LEFT JOIN`. When there are no joining rows, a row with `NULL` values for all columns on the right side is generated to join with the row from the left side.
- In a correlated `CROSS JOIN`, when the input table on the right side is empty for some row from the left side, it's as if no rows from the right side satisfied the join condition in a regular correlated `INNER JOIN`. This means that the row is dropped from the results.

**Examples**

This is an example of a correlated join, using the
[Roster](query-syntax-3.md#roster-table) and [PlayerStats](query-syntax-3.md#playerstats-table) tables:

```sql
SELECT *
FROM
  Roster
JOIN
  UNNEST(
    ARRAY(
      SELECT AS STRUCT *
      FROM PlayerStats
      WHERE PlayerStats.OpponentID = Roster.SchoolID
    )) AS PlayerMatches
  ON PlayerMatches.LastName = 'Buchanan'

/*------------+----------+----------+------------+--------------+
 | LastName   | SchoolID | LastName | OpponentID | PointsScored |
 +------------+----------+----------+------------+--------------+
 | Adams      | 50       | Buchanan | 50         | 13           |
 | Eisenhower | 77       | Buchanan | 77         | 0            |
 +------------+----------+----------+------------+--------------*/
```

A common pattern for a correlated `LEFT JOIN` is to have an `UNNEST` operation
on the right side that references an array from some column introduced by
input on the left side. For rows where that array is empty or `NULL`,
the `UNNEST` operation produces no rows on the right input. In that case, a row
with a `NULL` entry in each column of the right input is created to join with
the row from the left input. For example:

```sql
SELECT A.name, item, ARRAY_LENGTH(A.items) item_count_for_name
FROM
  UNNEST(
    [
      STRUCT(
        'first' AS name,
        [1, 2, 3, 4] AS items),
      STRUCT(
        'second' AS name,
        [] AS items)]) AS A
LEFT JOIN
  A.items AS item;

/*--------+------+---------------------+
 | name   | item | item_count_for_name |
 +--------+------+---------------------+
 | first  | 1    | 4                   |
 | first  | 2    | 4                   |
 | first  | 3    | 4                   |
 | first  | 4    | 4                   |
 | second | NULL | 0                   |
 +--------+------+---------------------*/
```

In the case of a correlated `INNER JOIN` or `CROSS JOIN`, when the input on the
right side is empty for some row from the left side, the final row is dropped
from the results. For example:

```sql
SELECT A.name, item
FROM
  UNNEST(
    [
      STRUCT(
        'first' AS name,
        [1, 2, 3, 4] AS items),
      STRUCT(
        'second' AS name,
        [] AS items)]) AS A
INNER JOIN
  A.items AS item;

/*-------+------+
 | name  | item |
 +-------+------+
 | first | 1    |
 | first | 2    |
 | first | 3    |
 | first | 4    |
 +-------+------*/
```

### `WHERE` clause

```text
WHERE bool_expression
```

The `WHERE` clause filters the results of the `FROM` clause.

Only rows whose `bool_expression` evaluates to `TRUE` are included. Rows
whose `bool_expression` evaluates to `NULL` or `FALSE` are
discarded.

The evaluation of a query with a `WHERE` clause is typically completed in this
order:

- `FROM`
- `WHERE`
- `GROUP BY` and aggregation
- `HAVING`
- `WINDOW`
- `QUALIFY`
- `DISTINCT`
- `ORDER BY`
- `LIMIT`

Evaluation order doesn't always match syntax order.

The `WHERE` clause only references columns available via the `FROM` clause;
it can't reference `SELECT` list aliases.

**Examples**

This query returns all rows from the [`Roster`](query-syntax-3.md#roster-table) table
where the `SchoolID` column has the value `52`:

```sql
SELECT * FROM Roster
WHERE SchoolID = 52;
```

The `bool_expression` can contain multiple sub-conditions:

```sql
SELECT * FROM Roster
WHERE STARTS_WITH(LastName, "Mc") OR STARTS_WITH(LastName, "Mac");
```

Expressions in an `INNER JOIN` have an equivalent expression in the
`WHERE` clause. For example, a query using `INNER` `JOIN` and `ON` has an
equivalent expression using `CROSS JOIN` and `WHERE`. For example,
the following two queries are equivalent:

```sql
SELECT Roster.LastName, TeamMascot.Mascot
FROM Roster INNER JOIN TeamMascot
ON Roster.SchoolID = TeamMascot.SchoolID;
```

```sql
SELECT Roster.LastName, TeamMascot.Mascot
FROM Roster CROSS JOIN TeamMascot
WHERE Roster.SchoolID = TeamMascot.SchoolID;
```

### `GROUP BY` clause

```text
GROUP BY group_by_specification

group_by_specification:
  {
    groupable_items
    | ALL
    | grouping_sets_specification
    | rollup_specification
    | cube_specification
    | ()
  }
```

**Description**

The `GROUP BY` clause groups together rows in a table that share common values
for certain columns. For a group of rows in the source table with
non-distinct values, the `GROUP BY` clause aggregates them into a single
combined row. This clause is commonly used when aggregate functions are
present in the `SELECT` list, or to eliminate redundancy in the output.

**Definitions**

- `groupable_items`: Group rows in a table that share common values for certain columns. To learn more, see [Group rows by groupable items](#group-rows-by-groupable-items).
- `ALL`: Automatically group rows. To learn more, see [Group rows automatically](#group-rows-by-all).
- `grouping_sets_specification`: Group rows with the `GROUP BY GROUPING SETS` clause. To learn more, see [Group rows by `GROUPING SETS`](#group-rows-by-grouping-sets).
- `rollup_specification`: Group rows with the `GROUP BY ROLLUP` clause. To learn more, see [Group rows by `ROLLUP`](#group-rows-by-rollup).
- `cube_specification`: Group rows with the `GROUP BY CUBE` clause. To learn more, see [Group rows by `CUBE`](#group-rows-by-cube).
- `()`: Group all rows and produce a grand total. Equivalent to no `group_by_specification`.

#### Group rows by groupable items

```text
GROUP BY groupable_item[, ...]

groupable_item:
  {
    value
    | value_alias
    | column_ordinal
  }
```

**Description**

The `GROUP BY` clause can include [groupable](data-types.md#data-type-properties) expressions
and their ordinals.

**Definitions**

- `value`: An expression that represents a non-distinct, groupable value. To learn more, see [Group rows by values](#group-rows-by-values).
- `value_alias`: An alias for `value`. To learn more, see [Group rows by values](#group-rows-by-values).
- `column_ordinal`: An `INT64` value that represents the ordinal assigned to a groupable expression in the `SELECT` list. To learn more, see [Group rows by column ordinals](#group-rows-by-column-ordinals).

##### Group rows by values

The `GROUP BY` clause can group rows in a table with non-distinct
values in the `GROUP BY` clause. For example:

```sql
WITH PlayerStats AS (
  SELECT 'Adams' as LastName, 'Noam' as FirstName, 3 as PointsScored UNION ALL
  SELECT 'Buchanan', 'Jie', 0 UNION ALL
  SELECT 'Coolidge', 'Kiran', 1 UNION ALL
  SELECT 'Adams', 'Noam', 4 UNION ALL
  SELECT 'Buchanan', 'Jie', 13)
SELECT SUM(PointsScored) AS total_points, LastName
FROM PlayerStats
GROUP BY LastName;

/*--------------+----------+
 | total_points | LastName |
 +--------------+----------+
 | 7            | Adams    |
 | 13           | Buchanan |
 | 1            | Coolidge |
 +--------------+----------*/
```

`GROUP BY` clauses may also refer to aliases. If a query contains aliases in
the `SELECT` clause, those aliases override names in the corresponding `FROM`
clause. For example:

```sql
WITH PlayerStats AS (
  SELECT 'Adams' as LastName, 'Noam' as FirstName, 3 as PointsScored UNION ALL
  SELECT 'Buchanan', 'Jie', 0 UNION ALL
  SELECT 'Coolidge', 'Kiran', 1 UNION ALL
  SELECT 'Adams', 'Noam', 4 UNION ALL
  SELECT 'Buchanan', 'Jie', 13)
SELECT SUM(PointsScored) AS total_points, LastName AS last_name
FROM PlayerStats
GROUP BY last_name;

/*--------------+-----------+
 | total_points | last_name |
 +--------------+-----------+
 | 7            | Adams     |
 | 13           | Buchanan  |
 | 1            | Coolidge  |
 +--------------+-----------*/
```

You can use the `GROUP BY` clause with arrays. The following query executes
because the array elements being grouped are the same length and group type:

```sql
WITH PlayerStats AS (
  SELECT ['Coolidge', 'Adams'] as Name, 3 as PointsScored UNION ALL
  SELECT ['Adams', 'Buchanan'], 0 UNION ALL
  SELECT ['Coolidge', 'Adams'], 1 UNION ALL
  SELECT ['Kiran', 'Noam'], 1)
SELECT SUM(PointsScored) AS total_points, name
FROM PlayerStats
GROUP BY Name;

/*--------------+------------------+
 | total_points | name             |
 +--------------+------------------+
 | 4            | [Coolidge,Adams] |
 | 0            | [Adams,Buchanan] |
 | 1            | [Kiran,Noam]     |
 +--------------+------------------*/
```

You can use the `GROUP BY` clause with structs. The following query executes
because the struct fields being grouped have the same group types:

Adapted (not in the official docs): changed the result column name from `teams` to `Team`.

```sql
WITH
  TeamStats AS (
    SELECT
      ARRAY<STRUCT<last_name STRING, first_name STRING, age INT64>>[
        ('Adams', 'Noam', 20), ('Buchanan', 'Jie', 19)] AS Team,
      3 AS PointsScored
    UNION ALL
    SELECT [('Coolidge', 'Kiran', 21), ('Yang', 'Jason', 22)], 4
    UNION ALL
    SELECT [('Adams', 'Noam', 20), ('Buchanan', 'Jie', 19)], 10
    UNION ALL
    SELECT [('Coolidge', 'Kiran', 21), ('Yang', 'Jason', 22)], 7
  )
SELECT
  SUM(PointsScored) AS total_points,
  Team
FROM TeamStats
GROUP BY Team;

/*--------------+--------------------------+
 | total_points | Team                     |
 +--------------+--------------------------+
 | 13           | [{                       |
 |              |    last_name: "Adams",   |
 |              |    first_name: "Noam",   |
 |              |    age: 20               |
 |              |  },{                     |
 |              |    last_name: "Buchanan",|
 |              |    first_name: "Jie",    |
 |              |    age: 19               |
 |              |  }]                      |
 +-----------------------------------------+
 | 11           | [{                       |
 |              |    last_name: "Coolidge",|
 |              |    first_name: "Kiran",  |
 |              |    age: 21               |
 |              |  },{                     |
 |              |    last_name: "Yang",    |
 |              |    first_name: "Jason",  |
 |              |    age: 22               |
 |              |  }]                      |
 +--------------+--------------------------*/
```

To learn more about the data types that are supported for values in the
`GROUP BY` clause, see [Groupable data types](data-types.md#data-type-properties).

##### Group rows by column ordinals

The `GROUP BY` clause can refer to expression names in the `SELECT` list. The
`GROUP BY` clause also allows ordinal references to expressions in the `SELECT`
list, using integer values. `1` refers to the first value in the
`SELECT` list, `2` the second, and so forth. The value list can combine
ordinals and value names. The following queries are equivalent:

```sql
WITH PlayerStats AS (
  SELECT 'Adams' as LastName, 'Noam' as FirstName, 3 as PointsScored UNION ALL
  SELECT 'Buchanan', 'Jie', 0 UNION ALL
  SELECT 'Coolidge', 'Kiran', 1 UNION ALL
  SELECT 'Adams', 'Noam', 4 UNION ALL
  SELECT 'Buchanan', 'Jie', 13)
SELECT SUM(PointsScored) AS total_points, LastName, FirstName
FROM PlayerStats
GROUP BY LastName, FirstName;

/*--------------+----------+-----------+
 | total_points | LastName | FirstName |
 +--------------+----------+-----------+
 | 7            | Adams    | Noam      |
 | 13           | Buchanan | Jie       |
 | 1            | Coolidge | Kiran     |
 +--------------+----------+-----------*/
```

```sql
WITH PlayerStats AS (
  SELECT 'Adams' as LastName, 'Noam' as FirstName, 3 as PointsScored UNION ALL
  SELECT 'Buchanan', 'Jie', 0 UNION ALL
  SELECT 'Coolidge', 'Kiran', 1 UNION ALL
  SELECT 'Adams', 'Noam', 4 UNION ALL
  SELECT 'Buchanan', 'Jie', 13)
SELECT SUM(PointsScored) AS total_points, LastName, FirstName
FROM PlayerStats
GROUP BY 2, 3;

/*--------------+----------+-----------+
 | total_points | LastName | FirstName |
 +--------------+----------+-----------+
 | 7            | Adams    | Noam      |
 | 13           | Buchanan | Jie       |
 | 1            | Coolidge | Kiran     |
 +--------------+----------+-----------*/
```

#### Group rows by `ALL`

```text
GROUP BY ALL
```

**Description**

The `GROUP BY ALL` clause groups rows by inferring grouping keys from the
`SELECT` items.

The following `SELECT` items are excluded from the `GROUP BY ALL` clause:

- Expressions that include [aggregate functions](../googlesql-functions/aggregate-function-calls.md).
- Expressions that include [window functions](../googlesql-functions/window-function-calls.md).
- Expressions that don't reference a name from the `FROM` clause. This includes:
  - Constants
  - Query parameters
  - Correlated column references
  - Expressions that only reference `GROUP BY` keys inferred from other `SELECT` items.

After exclusions are applied, an error is produced if any remaining `SELECT`
item includes a volatile function or has a non-groupable type.

If the set of inferred grouping keys is empty after exclusions are applied, all
input rows are considered a single group for aggregation. This
behavior is equivalent to writing `GROUP BY ()`.

**Examples**

In the following example, the query groups rows by `first_name` and
`last_name`. `total_points` is excluded because it represents an
aggregate function.

```sql
WITH PlayerStats AS (
  SELECT 'Adams' as LastName, 'Noam' as FirstName, 3 as PointsScored UNION ALL
  SELECT 'Buchanan', 'Jie', 0 UNION ALL
  SELECT 'Coolidge', 'Kiran', 1 UNION ALL
  SELECT 'Adams', 'Noam', 4 UNION ALL
  SELECT 'Buchanan', 'Jie', 13)
SELECT
  SUM(PointsScored) AS total_points,
  FirstName AS first_name,
  LastName AS last_name
FROM PlayerStats
GROUP BY ALL;

/*--------------+------------+-----------+
 | total_points | first_name | last_name |
 +--------------+------------+-----------+
 | 7            | Noam       | Adams     |
 | 13           | Jie        | Buchanan  |
 | 1            | Kiran      | Coolidge  |
 +--------------+------------+-----------*/
```

If the select list contains an analytic function, the query groups rows by
`first_name` and `last_name`. `total_people` is excluded because it
contains a window function.

```sql
WITH PlayerStats AS (
  SELECT 'Adams' as LastName, 'Noam' as FirstName, 3 as PointsScored UNION ALL
  SELECT 'Buchanan', 'Jie', 0 UNION ALL
  SELECT 'Coolidge', 'Kiran', 1 UNION ALL
  SELECT 'Adams', 'Noam', 4 UNION ALL
  SELECT 'Buchanan', 'Jie', 13)
SELECT
  COUNT(*) OVER () AS total_people,
  FirstName AS first_name,
  LastName AS last_name
FROM PlayerStats
GROUP BY ALL;

/*--------------+------------+-----------+
 | total_people | first_name | last_name |
 +--------------+------------+-----------+
 | 3            | Noam       | Adams     |
 | 3            | Jie        | Buchanan  |
 | 3            | Kiran      | Coolidge  |
 +--------------+------------+-----------*/
```

If multiple `SELECT` items reference the same `FROM` item, and any of them is
a path expression prefix of another, only the prefix path is used for grouping.
In the following example, `coordinates` is excluded because `x_coordinate` and
`y_coordinate` have already referenced `Values.x` and `Values.y` in the
`FROM` clause, and they are prefixes of the path expression used in
`coordinates`:

```sql
WITH Values AS (
  SELECT 1 AS x, 2 AS y
  UNION ALL SELECT 1 AS x, 4 AS y
  UNION ALL SELECT 2 AS x, 5 AS y
)
SELECT
  Values.x AS x_coordinate,
  Values.y AS y_coordinate,
  [Values.x, Values.y] AS coordinates
FROM Values
GROUP BY ALL

/*--------------+--------------+-------------+
 | x_coordinate | y_coordinate | coordinates |
 +--------------+--------------+-------------+
 | 1            | 4            | [1, 4]      |
 | 1            | 2            | [1, 2]      |
 | 2            | 5            | [2, 5]      |
 +--------------+--------------+-------------*/
```

In the following example, the inferred set of grouping keys is empty. The query
returns one row even when the input contains zero rows.

```sql
SELECT COUNT(*) AS num_rows
FROM UNNEST([])
GROUP BY ALL

/*----------+
 | num_rows |
 +----------+
 | 0        |
 +----------*/
```

#### Group rows by `GROUPING SETS`

```text
GROUP BY GROUPING SETS ( grouping_list )

grouping_list:
  {
    rollup_specification
    | cube_specification
    | groupable_item
    | groupable_item_set
  }[, ...]

groupable_item_set:
  ( [ groupable_item[, ...] ] )
```

**Description**

The `GROUP BY GROUPING SETS` clause produces aggregated data for one or more
*grouping sets* . A grouping set is a group of columns by which rows can
be grouped together. This clause is helpful if you want to produce
aggregated data for sets of data without using the `UNION` operation.
For example, `GROUP BY GROUPING SETS(x,y)` is roughly equivalent to
`GROUP BY x UNION ALL GROUP BY y`.

**Definitions**

- `grouping_list`: A list of items that you can add to the `GROUPING SETS` clause. Grouping sets are generated based upon what is in this list.
- `rollup_specification`: Group rows with the `ROLLUP` clause. Don't include `GROUP BY` if you use this inside the `GROUPING SETS` clause. To learn more, see [Group rows by `ROLLUP`](#group-rows-by-rollup).
- `cube_specification`: Group rows with the `CUBE` clause. Don't include `GROUP BY` if you use this inside the `GROUPING SETS` clause. To learn more, see [Group rows by `CUBE`](#group-rows-by-cube).
- `groupable_item`: Group rows in a table that share common values for certain columns. To learn more, see [Group rows by groupable items](#group-rows-by-groupable-items). [Anonymous `STRUCT` values](data-types.md#tuple-syntax) aren't allowed.
- `groupable_item_set`: Group rows by a set of [groupable items](#group-rows-by-groupable-items). If the set contains no groupable items, group all rows and produce a grand total.

**Details**

`GROUP BY GROUPING SETS` works by taking a grouping list, generating
grouping sets from it, and then producing a table as a union of queries
grouped by each grouping set.

For example, `GROUP BY GROUPING SETS (a, b, c)` generates the
following grouping sets from the grouping list, `a, b, c`, and
then produces aggregated rows for each of them:

- `(a)`
- `(b)`
- `(c)`

Here is an example that includes groupable item sets in
`GROUP BY GROUPING SETS (a, (b, c), d)`:

| Conceptual grouping sets | Actual grouping sets |
|---|---|
| `(a)` | `(a)` |
| `((b, c))` | `(b, c)` |
| `(d)` | `(d)` |

`GROUP BY GROUPING SETS` can include `ROLLUP` and `CUBE` operations, which
generate grouping sets. If `ROLLUP` is added, it generates rolled up
grouping sets. If `CUBE` is added, it generates all grouping set combinations.

`ROLLUP` and `CUBE` are expanded into a list of grouping sets using the normal
rules, and the resulting list is combined with the sets explicitly listed in the
grouping sets list.

For more details, see [Group rows by `ROLLUP`](#group-rows-by-rollup) and
[Group rows by `CUBE`](#group-rows-by-cube).

The following grouping sets are generated for
`GROUP BY GROUPING SETS (a, ROLLUP(b, c), d)`.

| Conceptual grouping sets | Actual grouping sets |
|---|---|
| `(a)` | `(a)` |
| `((b, c))` | `(b, c)` |
| `((b))` | `(b)` |
| `(())` | `()` |
| `(d)` | `(d)` |

The following grouping sets are generated for
`GROUP BY GROUPING SETS (a, CUBE(b, c), d)`:

| Conceptual grouping sets | Actual grouping sets |
|---|---|
| `(a)` | `(a)` |
| `((b, c))` | `(b, c)` |
| `((b))` | `(b)` |
| `((c))` | `(c)` |
| `(())` | `()` |
| `(d)` | `(d)` |

When evaluating the results for a particular grouping set,
expressions that aren't in the grouping set are aggregated and produce a
`NULL` placeholder.

You can filter results for specific groupable items. To learn more, see the
[`GROUPING` function](../googlesql-functions/aggregate_functions.md#grouping)

`GROUPING SETS` allows up to 4096 groupable items from at most 50 unique
columns.

**Examples**

The following queries produce the same results, but
the first one uses `GROUP BY GROUPING SETS` and the second one doesn't:

```sql
-- GROUP BY with GROUPING SETS
WITH
  Products AS (
    SELECT 'shirt' AS product_type, 't-shirt' AS product_name, 3 AS product_count UNION ALL
    SELECT 'shirt', 't-shirt', 8 UNION ALL
    SELECT 'shirt', 'polo', 25 UNION ALL
    SELECT 'pants', 'jeans', 6
  )
SELECT product_type, product_name, SUM(product_count) AS product_sum
FROM Products
GROUP BY GROUPING SETS (product_type, product_name)
ORDER BY product_name

/*--------------+--------------+-------------+
 | product_type | product_name | product_sum |
 +--------------+--------------+-------------+
 | shirt        | NULL         | 36          |
 | pants        | NULL         | 6           |
 | NULL         | jeans        | 6           |
 | NULL         | polo         | 25          |
 | NULL         | t-shirt      | 11          |
 +--------------+--------------+-------------*/
```

```sql
-- GROUP BY without GROUPING SETS
-- (produces the same results as GROUPING SETS)
WITH
  Products AS (
    SELECT 'shirt' AS product_type, 't-shirt' AS product_name, 3 AS product_count UNION ALL
    SELECT 'shirt', 't-shirt', 8 UNION ALL
    SELECT 'shirt', 'polo', 25 UNION ALL
    SELECT 'pants', 'jeans', 6
  )
SELECT product_type, NULL AS product_name, SUM(product_count) AS product_sum
FROM Products
GROUP BY product_type
UNION ALL
SELECT NULL AS product_type, product_name, SUM(product_count) AS product_sum
FROM Products
GROUP BY product_name
ORDER BY product_name
```

You can include groupable item sets in a `GROUP BY GROUPING SETS` clause.
In the example below, `(product_type, product_name)` is a groupable item set.

```sql
-- GROUP BY with GROUPING SETS and a groupable item set
WITH
  Products AS (
    SELECT 'shirt' AS product_type, 't-shirt' AS product_name, 3 AS product_count UNION ALL
    SELECT 'shirt', 't-shirt', 8 UNION ALL
    SELECT 'shirt', 'polo', 25 UNION ALL
    SELECT 'pants', 'jeans', 6
  )
SELECT product_type, product_name, SUM(product_count) AS product_sum
FROM Products
GROUP BY GROUPING SETS (
  product_type,
  (product_type, product_name))
ORDER BY product_type, product_name;

/*--------------+--------------+-------------+
 | product_type | product_name | product_sum |
 +--------------+--------------+-------------+
 | pants        | NULL         | 6           |
 | pants        | jeans        | 6           |
 | shirt        | NULL         | 36          |
 | shirt        | polo         | 25          |
 | shirt        | t-shirt      | 11          |
 +--------------+--------------+-------------*/
```

```sql
-- GROUP BY with GROUPING SETS but without a groupable item set
-- (produces the same results as GROUPING SETS with a groupable item set)
WITH
  Products AS (
    SELECT 'shirt' AS product_type, 't-shirt' AS product_name, 3 AS product_count UNION ALL
    SELECT 'shirt', 't-shirt', 8 UNION ALL
    SELECT 'shirt', 'polo', 25 UNION ALL
    SELECT 'pants', 'jeans', 6
  )
SELECT product_type, NULL AS product_name, SUM(product_count) AS product_sum
FROM Products
GROUP BY product_type
UNION ALL
SELECT product_type, product_name, SUM(product_count) AS product_sum
FROM Products
GROUP BY product_type, product_name
ORDER BY product_type, product_name;
```

You can include [`ROLLUP`](#group-rows-by-rollup) in a
`GROUP BY GROUPING SETS` clause. For example:

```sql
-- GROUP BY with GROUPING SETS and ROLLUP
WITH
  Products AS (
    SELECT 'shirt' AS product_type, 't-shirt' AS product_name, 3 AS product_count UNION ALL
    SELECT 'shirt', 't-shirt', 8 UNION ALL
    SELECT 'shirt', 'polo', 25 UNION ALL
    SELECT 'pants', 'jeans', 6
  )
SELECT product_type, product_name, SUM(product_count) AS product_sum
FROM Products
GROUP BY GROUPING SETS (
  product_type,
  ROLLUP (product_type, product_name))
ORDER BY product_type, product_name;

/*--------------+--------------+-------------+
 | product_type | product_name | product_sum |
 +--------------+--------------+-------------+
 | NULL         | NULL         | 42          |
 | pants        | NULL         | 6           |
 | pants        | NULL         | 6           |
 | pants        | jeans        | 6           |
 | shirt        | NULL         | 36          |
 | shirt        | NULL         | 36          |
 | shirt        | polo         | 25          |
 | shirt        | t-shirt      | 11          |
 +--------------+--------------+-------------*/
```

```sql
-- GROUP BY with GROUPING SETS, but without ROLLUP
-- (produces the same results as GROUPING SETS with ROLLUP)
WITH
  Products AS (
    SELECT 'shirt' AS product_type, 't-shirt' AS product_name, 3 AS product_count UNION ALL
    SELECT 'shirt', 't-shirt', 8 UNION ALL
    SELECT 'shirt', 'polo', 25 UNION ALL
    SELECT 'pants', 'jeans', 6
  )
SELECT product_type, product_name, SUM(product_count) AS product_sum
FROM Products
GROUP BY GROUPING SETS(
  product_type,
  (product_type, product_name),
  product_type,
  ())
ORDER BY product_type, product_name;
```

You can include [`CUBE`](#group-rows-by-cube) in a `GROUP BY GROUPING SETS` clause.
For example:

```sql
-- GROUP BY with GROUPING SETS and CUBE
WITH
  Products AS (
    SELECT 'shirt' AS product_type, 't-shirt' AS product_name, 3 AS product_count UNION ALL
    SELECT 'shirt', 't-shirt', 8 UNION ALL
    SELECT 'shirt', 'polo', 25 UNION ALL
    SELECT 'pants', 'jeans', 6
  )
SELECT product_type, product_name, SUM(product_count) AS product_sum
FROM Products
GROUP BY GROUPING SETS (
  product_type,
  CUBE (product_type, product_name))
ORDER BY product_type, product_name;

/*--------------+--------------+-------------+
 | product_type | product_name | product_sum |
 +--------------+--------------+-------------+
 | NULL         | NULL         | 42          |
 | NULL         | jeans        | 6           |
 | NULL         | polo         | 25          |
 | NULL         | t-shirt      | 11          |
 | pants        | NULL         | 6           |
 | pants        | NULL         | 6           |
 | pants        | jeans        | 6           |
 | shirt        | NULL         | 36          |
 | shirt        | NULL         | 36          |
 | shirt        | polo         | 25          |
 | shirt        | t-shirt      | 11          |
 +--------------+--------------+-------------*/
```

```sql
-- GROUP BY with GROUPING SETS, but without CUBE
-- (produces the same results as GROUPING SETS with CUBE)
WITH
  Products AS (
    SELECT 'shirt' AS product_type, 't-shirt' AS product_name, 3 AS product_count UNION ALL
    SELECT 'shirt', 't-shirt', 8 UNION ALL
    SELECT 'shirt', 'polo', 25 UNION ALL
    SELECT 'pants', 'jeans', 6
  )
SELECT product_type, product_name, SUM(product_count) AS product_sum
FROM Products
GROUP BY GROUPING SETS(
  product_type,
  (product_type, product_name),
  product_type,
  product_name,
  ())
ORDER BY product_type, product_name;
```

#### Group rows by `ROLLUP`

```text
GROUP BY ROLLUP ( grouping_list )

grouping_list:
  { groupable_item | groupable_item_set }[, ...]

groupable_item_set:
  ( groupable_item[, ...] )
```

**Description**

The `GROUP BY ROLLUP` clause produces aggregated data for rolled up
*grouping sets*. A grouping set is a group of columns by which rows can
be grouped together. This clause is helpful if you need to roll up totals
in a set of data.

**Definitions**

- `grouping_list`: A list of items that you can add to the `GROUPING SETS` clause. This is used to create a generated list of grouping sets when the query is run.
- `groupable_item`: Group rows in a table that share common values for certain columns. To learn more, see [Group rows by groupable items](#group-rows-by-groupable-items).[anonymous `STRUCT` values](data-types.md#tuple-syntax) aren't allowed.
- `groupable_item_set`: Group rows by a subset of [groupable items](#group-rows-by-groupable-items).

**Details**

`GROUP BY ROLLUP` works by taking a grouping list, generating
grouping sets from the prefixes inside this list, and then producing a
table as a union of queries grouped by each grouping set. The resulting
grouping sets include an empty grouping set. In the empty grouping set, all
rows are aggregated down to a single group.

For example, `GROUP BY ROLLUP (a, b, c)` generates the
following grouping sets from the grouping list, `a, b, c`, and then produces
aggregated rows for each of them:

- `(a, b, c)`
- `(a, b)`
- `(a)`
- `()`

Here is an example that includes groupable item sets in
`GROUP BY ROLLUP (a, (b, c), d)`:

| Conceptual grouping sets | Actual grouping sets |
|---|---|
| `(a, (b, c), d)` | `(a, b, c, d)` |
| `(a, (b, c))` | `(a, b, c)` |
| `(a)` | `(a)` |
| `()` | `()` |

When evaluating the results for a particular grouping set,
expressions that aren't in the grouping set are aggregated and produce a
`NULL` placeholder.

You can filter results by specific groupable items. To learn more, see the
[`GROUPING` function](../googlesql-functions/aggregate_functions.md#grouping)

`ROLLUP` allows up to 4095 groupable items (equivalent to 4096 grouping sets)
from at most 50 unique columns.

**Examples**

The following queries produce the same subtotals and a grand total, but
the first one uses `GROUP BY` with `ROLLUP` and the second one doesn't:

Adapted (not in the official docs): swapped the `polo` and `t-shirt` rows to follow the `ORDER BY`.

```sql
-- GROUP BY with ROLLUP
WITH
  Products AS (
    SELECT 'shirt' AS product_type, 't-shirt' AS product_name, 3 AS product_count UNION ALL
    SELECT 'shirt', 't-shirt', 8 UNION ALL
    SELECT 'shirt', 'polo', 25 UNION ALL
    SELECT 'pants', 'jeans', 6
  )
SELECT product_type, product_name, SUM(product_count) AS product_sum
FROM Products
GROUP BY ROLLUP (product_type, product_name)
ORDER BY product_type, product_name;

/*--------------+--------------+-------------+
 | product_type | product_name | product_sum |
 +--------------+--------------+-------------+
 | NULL         | NULL         | 42          |
 | pants        | NULL         | 6           |
 | pants        | jeans        | 6           |
 | shirt        | NULL         | 36          |
 | shirt        | polo         | 25          |
 | shirt        | t-shirt      | 11          |
 +--------------+--------------+-------------*/
```

```sql
-- GROUP BY without ROLLUP (produces the same results as ROLLUP)
WITH
  Products AS (
    SELECT 'shirt' AS product_type, 't-shirt' AS product_name, 3 AS product_count UNION ALL
    SELECT 'shirt', 't-shirt', 8 UNION ALL
    SELECT 'shirt', 'polo', 25 UNION ALL
    SELECT 'pants', 'jeans', 6
  )
SELECT product_type, product_name, SUM(product_count) AS product_sum
FROM Products
GROUP BY product_type, product_name
UNION ALL
SELECT product_type, NULL, SUM(product_count)
FROM Products
GROUP BY product_type
UNION ALL
SELECT NULL, NULL, SUM(product_count) FROM Products
ORDER BY product_type, product_name;
```

You can include groupable item sets in a `GROUP BY ROLLUP` clause.
In the following example, `(product_type, product_name)` is a
groupable item set.

```sql
WITH
  Products AS (
    SELECT 'shirt' AS product_type, 't-shirt' AS product_name, 3 AS product_count UNION ALL
    SELECT 'shirt', 't-shirt', 8 UNION ALL
    SELECT 'shirt', 'polo', 25 UNION ALL
    SELECT 'pants', 'jeans', 6
  )
SELECT product_type, product_name, SUM(product_count) AS product_sum
FROM Products
GROUP BY ROLLUP (product_type, (product_type, product_name))
ORDER BY product_type, product_name;

/*--------------+--------------+-------------+
 | product_type | product_name | product_sum |
 +--------------+--------------+-------------+
 | NULL         | NULL         | 42          |
 | pants        | NULL         | 6           |
 | pants        | jeans        | 6           |
 | shirt        | NULL         | 36          |
 | shirt        | polo         | 25          |
 | shirt        | t-shirt      | 11          |
 +--------------+--------------+-------------*/
```

#### Group rows by `CUBE`

```text
GROUP BY CUBE ( grouping_list )

grouping_list:
  { groupable_item | groupable_item_set }[, ...]

groupable_item_set:
  ( groupable_item[, ...] )
```

**Description**

The `GROUP BY CUBE` clause produces aggregated data for all *grouping set*
combinations. A grouping set is a group of columns by which rows
can be grouped together. This clause is helpful if you need to create a
[contingency table](https://en.wikipedia.org/wiki/Contingency_table) to find interrelationships
between items in a set of data.

**Definitions**

- `grouping_list`: A list of items that you can add to the `GROUPING SETS` clause. This is used to create a generated list of grouping sets when the query is run.
- `groupable_item`: Group rows in a table that share common values for certain columns. To learn more, see [Group rows by groupable items](#group-rows-by-groupable-items). [Anonymous `STRUCT` values](data-types.md#tuple-syntax) aren't allowed.
- `groupable_item_set`: Group rows by a set of [groupable items](#group-rows-by-groupable-items).

**Details**

`GROUP BY CUBE` is similar to `GROUP BY ROLLUP`, except that it takes a
grouping list and generates grouping sets from all combinations in this
list, including an empty grouping set. In the empty grouping set, all rows
are aggregated down to a single group.

For example, `GROUP BY CUBE (a, b, c)` generates the following
grouping sets from the grouping list, `a, b, c`, and then produces
aggregated rows for each of them:

- `(a, b, c)`
- `(a, b)`
- `(a, c)`
- `(a)`
- `(b, c)`
- `(b)`
- `(c)`
- `()`

Here is an example that includes groupable item sets in
`GROUP BY CUBE (a, (b, c), d)`:

| Conceptual grouping sets | Actual grouping sets |
|---|---|
| `(a, (b, c), d)` | `(a, b, c, d)` |
| `(a, (b, c))` | `(a, b, c)` |
| `(a, d)` | `(a, d)` |
| `(a)` | `(a)` |
| `((b, c), d)` | `(b, c, d)` |
| `((b, c))` | `(b, c)` |
| `(d)` | `(d)` |
| `()` | `()` |

When evaluating the results for a particular grouping set,
expressions that aren't in the grouping set are aggregated and produce a
`NULL` placeholder.

You can filter results by specific groupable items. To learn more, see the
[`GROUPING` function](../googlesql-functions/aggregate_functions.md#grouping)

`CUBE` allows up to 12 groupable items (equivalent to 4096 grouping sets).

**Examples**

The following query groups rows by all combinations of `product_type` and
`product_name` to produce a contingency table:

```sql
-- GROUP BY with CUBE
WITH
  Products AS (
    SELECT 'shirt' AS product_type, 't-shirt' AS product_name, 3 AS product_count UNION ALL
    SELECT 'shirt', 't-shirt', 8 UNION ALL
    SELECT 'shirt', 'polo', 25 UNION ALL
    SELECT 'pants', 'jeans', 6
  )
SELECT product_type, product_name, SUM(product_count) AS product_sum
FROM Products
GROUP BY CUBE (product_type, product_name)
ORDER BY product_type, product_name;

/*--------------+--------------+-------------+
 | product_type | product_name | product_sum |
 +--------------+--------------+-------------+
 | NULL         | NULL         | 42          |
 | NULL         | jeans        | 6           |
 | NULL         | polo         | 25          |
 | NULL         | t-shirt      | 11          |
 | pants        | NULL         | 6           |
 | pants        | jeans        | 6           |
 | shirt        | NULL         | 36          |
 | shirt        | polo         | 25          |
 | shirt        | t-shirt      | 11          |
 +--------------+--------------+-------------*/
```

You can include groupable item sets in a `GROUP BY CUBE` clause.
In the following example, `(product_type, product_name)` is a
groupable item set.

```sql
WITH
  Products AS (
    SELECT 'shirt' AS product_type, 't-shirt' AS product_name, 3 AS product_count UNION ALL
    SELECT 'shirt', 't-shirt', 8 UNION ALL
    SELECT 'shirt', 'polo', 25 UNION ALL
    SELECT 'pants', 'jeans', 6
  )
SELECT product_type, product_name, SUM(product_count) AS product_sum
FROM Products
GROUP BY CUBE (product_type, (product_type, product_name))
ORDER BY product_type, product_name;

/*--------------+--------------+-------------+
 | product_type | product_name | product_sum |
 +--------------+--------------+-------------+
 | NULL         | NULL         | 42          |
 | pants        | NULL         | 6           |
 | pants        | jeans        | 6           |
 | pants        | jeans        | 6           |
 | shirt        | NULL         | 36          |
 | shirt        | polo         | 25          |
 | shirt        | polo         | 25          |
 | shirt        | t-shirt      | 11          |
 | shirt        | t-shirt      | 11          |
 +--------------+--------------+-------------*/
```

### `HAVING` clause

```text
HAVING bool_expression
```

The `HAVING` clause filters the results produced by `GROUP BY` or
aggregation. `GROUP BY` or aggregation must be present in the query. If
aggregation is present, the `HAVING` clause is evaluated once for every
aggregated row in the result set.

Only rows whose `bool_expression` evaluates to `TRUE` are included. Rows
whose `bool_expression` evaluates to `NULL` or `FALSE` are
discarded.

The evaluation of a query with a `HAVING` clause is typically completed in this
order:

- `FROM`
- `WHERE`
- `GROUP BY` and aggregation
- `HAVING`
- `WINDOW`
- `QUALIFY`
- `DISTINCT`
- `ORDER BY`
- `LIMIT`

Evaluation order doesn't always match syntax order.

The `HAVING` clause references columns available via the `FROM` clause, as
well as `SELECT` list aliases. Expressions referenced in the `HAVING` clause
must either appear in the `GROUP BY` clause or they must be the result of an
aggregate function:

Adapted (not in the official docs): changed the table from `Roster` to `PlayerStats`.

```sql
SELECT LastName
FROM PlayerStats
GROUP BY LastName
HAVING SUM(PointsScored) > 15;
```

If a query contains aliases in the `SELECT` clause, those aliases override names
in a `FROM` clause.

Adapted (not in the official docs): changed the table from `Roster` to `PlayerStats`.

```sql
SELECT LastName, SUM(PointsScored) AS ps
FROM PlayerStats
GROUP BY LastName
HAVING ps > 0;
```

#### Mandatory aggregation

Aggregation doesn't have to be present in the `HAVING` clause itself, but
aggregation must be present in at least one of the following forms:

##### Aggregation function in the `SELECT` list.

```sql
SELECT LastName, SUM(PointsScored) AS total
FROM PlayerStats
GROUP BY LastName
HAVING total > 15;
```

##### Aggregation function in the `HAVING` clause.

```sql
SELECT LastName
FROM PlayerStats
GROUP BY LastName
HAVING SUM(PointsScored) > 15;
```

##### Aggregation in both the `SELECT` list and `HAVING` clause.

When aggregation functions are present in both the `SELECT` list and `HAVING`
clause, the aggregation functions and the columns they reference don't need
to be the same. In the example below, the two aggregation functions,
`COUNT()` and `SUM()`, are different and also use different columns.

```sql
SELECT LastName, COUNT(*)
FROM PlayerStats
GROUP BY LastName
HAVING SUM(PointsScored) > 15;
```

### `ORDER BY` clause

```text
ORDER BY expression
  [{ ASC | DESC }]
  [{ NULLS FIRST | NULLS LAST }]
  [, ...]
```

The `ORDER BY` clause specifies a column or expression as the sort criterion for
the result set. If an `ORDER BY` clause isn't present, the order of the results
of a query isn't defined. Column aliases from a `FROM` clause or `SELECT` list
are allowed. If a query contains aliases in the `SELECT` clause, those aliases
override names in the corresponding `FROM` clause. The data type of
`expression` must be [orderable](data-types.md#orderable-data-types).

When using the `ORDER BY` clause with either
[recursive](query-syntax-3.md#recursive-ctes) or [non-recursive](query-syntax-3.md#non-recursive-ctes) common table
expressions (CTEs), specify the `ORDER BY` clause within the main query
definition, and not in the CTE definition itself. This evenly distributes the
execution of your queries as tables grow over time and prevents a single
processing unit from having to process all query data.

**Optional Clauses**

- `NULLS FIRST | NULLS LAST`:
  - `NULLS FIRST`: Sort null values before non-null values.
  - `NULLS LAST`. Sort null values after non-null values.
- `ASC | DESC`: Sort the results in ascending or descending order of `expression` values. `ASC` is the default value. If null ordering isn't specified with `NULLS FIRST` or `NULLS LAST`:
  - `NULLS FIRST` is applied by default if the sort order is ascending.
  - `NULLS LAST` is applied by default if the sort order is descending.

**Examples**

Use the default sort order (ascending).

```sql
SELECT x, y
FROM (SELECT 1 AS x, true AS y UNION ALL
      SELECT 9, true UNION ALL
      SELECT NULL, false)
ORDER BY x;

/*------+-------+
 | x    | y     |
 +------+-------+
 | NULL | false |
 | 1    | true  |
 | 9    | true  |
 +------+-------*/
```

Use the default sort order (ascending), but return null values last.

```sql
SELECT x, y
FROM (SELECT 1 AS x, true AS y UNION ALL
      SELECT 9, true UNION ALL
      SELECT NULL, false)
ORDER BY x NULLS LAST;

/*------+-------+
 | x    | y     |
 +------+-------+
 | 1    | true  |
 | 9    | true  |
 | NULL | false |
 +------+-------*/
```

Use descending sort order.

```sql
SELECT x, y
FROM (SELECT 1 AS x, true AS y UNION ALL
      SELECT 9, true UNION ALL
      SELECT NULL, false)
ORDER BY x DESC;

/*------+-------+
 | x    | y     |
 +------+-------+
 | 9    | true  |
 | 1    | true  |
 | NULL | false |
 +------+-------*/
```

Use descending sort order, but return null values first.

```sql
SELECT x, y
FROM (SELECT 1 AS x, true AS y UNION ALL
      SELECT 9, true UNION ALL
      SELECT NULL, false)
ORDER BY x DESC NULLS FIRST;

/*------+-------+
 | x    | y     |
 +------+-------+
 | NULL | false |
 | 9    | true  |
 | 1    | true  |
 +------+-------*/
```

It's possible to order by multiple columns. In the example below, the result
set is ordered first by `SchoolID` and then by `LastName`:

```sql
SELECT LastName, PointsScored, OpponentID
FROM PlayerStats
ORDER BY SchoolID, LastName;
```

When used in conjunction with
[set operators](query-syntax-3.md#set-operators),
the `ORDER BY` clause applies to the result set of the entire query; it doesn't
apply only to the closest `SELECT` statement. For this reason, it can be helpful
(though it isn't required) to use parentheses to show the scope of the `ORDER
BY`.

This query without parentheses:

```sql
SELECT * FROM Roster
UNION ALL
SELECT * FROM TeamMascot
ORDER BY SchoolID;
```

is equivalent to this query with parentheses:

```sql
( SELECT * FROM Roster
  UNION ALL
  SELECT * FROM TeamMascot )
ORDER BY SchoolID;
```

but isn't equivalent to this query, where the `ORDER BY` clause applies only to
the second `SELECT` statement:

```sql
SELECT * FROM Roster
UNION ALL
( SELECT * FROM TeamMascot
  ORDER BY SchoolID );
```

You can also use integer literals as column references in `ORDER BY` clauses. An
integer literal becomes an ordinal (for example, counting starts at 1) into
the `SELECT` list.

Example - the following two queries are equivalent:

```sql
SELECT SUM(PointsScored), LastName
FROM PlayerStats
GROUP BY LastName
ORDER BY LastName;
```

```sql
SELECT SUM(PointsScored), LastName
FROM PlayerStats
GROUP BY 2
ORDER BY 2;
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders; 2 code blocks whose twin text is damaged (links expanded into URLs, `<...>` dropped, table borders shortened) are matched to the rendered page by position and similarity, and the text is taken from the page; and horizontal rules inside table cells are written as `<hr>`. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- The official page is split into 3 files at section boundaries; this is part 2.
- Corrected from the official docs: the `ROLLUP` result lists `t-shirt` before `polo`, but the query has `ORDER BY product_type, product_name`, and the other results for the same data on this page list `polo` first. The two rows are swapped.
- Corrected from the official docs: the `GROUP BY` struct example selects `SUM(PointsScored) AS total_points, Team`, but its result header names the second column `teams`. The header is changed to `Team`.
- Corrected from the official docs: the text says `x_coordinate` and `y_coordinate` are prefixes of the path expression used in `x_coordinate`. The expression that contains them is `[Values.x, Values.y] AS coordinates`, so the name is changed to `coordinates`.
- Corrected from the official docs: the two `HAVING` examples (with and without a `SELECT` alias) read `PointsScored` from `Roster`, but `Roster` has only `LastName` and `SchoolID`; `PointsScored` is a `PlayerStats` column, and the next `HAVING` examples use `PlayerStats`. Both are changed to `FROM PlayerStats`.
- Caution: the `ORDER BY SchoolID, LastName` example selects from `PlayerStats`, which has the columns `LastName`, `OpponentID` and `PointsScored` but no `SchoolID`, while the text says the result is ordered first by `SchoolID`. The official docs do not say whether the query should use `OpponentID` or select from `Roster`.
- Caution: the example `SELECT * FROM Roster UNION ALL SELECT * FROM TeamMascot ORDER BY SchoolID` combines `Roster` (`LastName`, `SchoolID`) with `TeamMascot` (`SchoolID`, `Mascot`). Set operations match columns by position, so the first columns are STRING and INT64. The intended example is not stated.

## Related

- [Index of this directory](./README.md)
- [Query syntax (part 1 of 3)](./query-syntax-1.md)
- [Query syntax (part 3 of 3)](./query-syntax-3.md)

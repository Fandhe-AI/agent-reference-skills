---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/procedural-language
---

# Procedural language

## Signature / Usage

The GoogleSQL procedural language lets you execute multiple statements
in one query as a multi-statement query. You can use
a multi-statement query to:

- Run multiple statements in a sequence, with shared state.
- Automate management tasks such as creating or dropping tables.
- Implement complex logic using programming constructs such as `IF` and `WHILE`.

This reference contains the statements that are part of the GoogleSQL
procedural language. To learn more about how you can use this
procedural language to write multi-statement queries, see
[Work with multi-statement queries](https://docs.cloud.google.com/bigquery/docs/multi-statement-queries). To learn how you
can convert multi-statement queries into stored procedures, see
[Work with stored procedures](https://docs.cloud.google.com/bigquery/docs/procedures).

### `DECLARE`

```sql
DECLARE variable_name[, ...] [variable_type] [DEFAULT expression];
```

`variable_name` must be a valid identifier, and `variable_type` is any
GoogleSQL [type](data-types.md).

**Description**

Declares a variable of the specified type. If the `DEFAULT` clause is specified,
the variable is initialized with the value of the expression; if no
`DEFAULT` clause is present, the variable is initialized with the value
`NULL`.

If `[variable_type]` is omitted then a `DEFAULT` clause must be specified. The
variable's type will be inferred by the type of the expression in the `DEFAULT`
clause.

Variable declarations must appear before other procedural statements, or at the
start of a `BEGIN` block. Variable names are case-insensitive.

Multiple variable names can appear in a single `DECLARE` statement, but only
one `variable_type` and `expression`.

It's an error to declare a variable with the same name as a variable
declared earlier in the current block or in a containing block.

If the `DEFAULT` clause is present, the value of the expression must be
coercible to the specified type. The expression may reference other variables
declared previously within the same block or a containing block.

GoogleSQL also supports [system variables](system-variables.md). You don't
need to declare system variables, but you can set any of them that aren't
marked read-only. You can reference system variables in queries.

**Examples**

The following example initializes the variable `x` as an
`INT64` with the value `NULL`.

```sql
DECLARE x INT64;
```

The following example initializes the variable `d` as a
`DATE` object with the value of the current date.

```sql
DECLARE d DATE DEFAULT CURRENT_DATE();
```

The following example initializes the variables `x`, `y`, and `z` as
`INT64` with the value 0.

```sql
DECLARE x, y, z INT64 DEFAULT 0;
```

The following example declares a variable named `item` corresponding to an
arbitrary item in the `schema1.products` table. The type of `item` is inferred
from the table schema.

```sql
DECLARE item DEFAULT (SELECT item FROM schema1.products LIMIT 1);
```

### `SET`

**Syntax**

```sql
SET variable_name = expression;
```

```sql
SET (variable_name[, ...]) = (expression[, ...]);
```

**Description**

Sets a variable to have the value of the provided expression, or sets multiple
variables at the same time based on the result of multiple expressions.

The `SET` statement may appear anywhere within a multi-statement query.

**Examples**

The following example sets the variable `x` to have the value 5.

```sql
SET x = 5;
```

The following example sets the variable `a` to have the value 4, `b` to have the
value 'foo', and the variable `c` to have the value `false`.

```sql
SET (a, b, c) = (1 + 3, 'foo', false);
```

The following example assigns the result of a query to multiple variables.
First, it declares two variables, `target_word` and `corpus_count`; next, it
assigns the results of a
[`SELECT AS STRUCT` query](query-syntax-1.md#select-as-struct)
to the two variables. The result of the query is a single row containing a
`STRUCT` with two fields; the first element is
assigned to the first variable, and the second element is assigned to the second
variable.

```sql
DECLARE target_word STRING DEFAULT 'methinks';
DECLARE corpus_count, word_count INT64;

SET (corpus_count, word_count) = (
  SELECT AS STRUCT COUNT(DISTINCT corpus), SUM(word_count)
  FROM bigquery-public-data.samples.shakespeare
  WHERE LOWER(word) = target_word
);

SELECT
  FORMAT('Found %d occurrences of "%s" across %d Shakespeare works',
         word_count, target_word, corpus_count) AS result;
```

This statement list outputs the following string:

```sql
Found 151 occurrences of "methinks" across 38 Shakespeare works
```

### `EXECUTE IMMEDIATE`

**Syntax**

```sql
EXECUTE IMMEDIATE sql_expression [ INTO variable[, ...] ] [ USING identifier[, ...] ];

sql_expression:
  { "query_statement" | expression("query_statement") }

identifier:
  { variable | value } [ AS alias ]
```

**Description**

Executes a dynamic SQL statement on the fly.

- `sql_expression`: An expression that can represent one of the following:

  - A [query statement](query-syntax-1.md)
  - An expression that you can use on a query statement
  - A single [DDL statement](data-definition-language-1.md)
  - A single [DML statement](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-manipulation-language)

  - A single [DCL statement](data-control-language.md)

  This expression can't be a control statement like `IF`.
- `expression`: Can be a
  [function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/functions-all), [conditional expression](../googlesql-functions/conditional_expressions.md), or
  [expression subquery](subqueries.md#expression-subqueries).

- `query_statement`: Represents a valid standalone SQL statement to execute.
  If this returns a value, the `INTO` clause must contain values of the same
  type. You may access both system variables and values present in the `USING`
  clause; all other local variables and query parameters aren't exposed to
  the query statement.

- `INTO` clause: After the SQL expression is executed, you can store the
  results in one or more [variables](#declare), using the `INTO` clause.

- `USING` clause: Before you execute your SQL expression, you can pass in one
  or more identifiers from the `USING` clause into the SQL expression.
  These identifiers function similarly to query parameters, exposing values to
  the query statement. An identifier can be a variable or a value.

You can include these placeholders in the `query_statement` for identifiers
referenced in the `USING` clause:

- `?`: The value for this placeholder is bound to an identifier in the `USING`
  clause by index.

  ```sql
  DECLARE y INT64;
  -- y = 1 * (3 + 2) = 5
  EXECUTE IMMEDIATE "SELECT ? * (? + 2)" INTO y USING 1, 3;
  ```

- `@identifier`: The value for this placeholder is bound to an identifier in
  the `USING` clause by name. This syntax is identical to
  the query parameter syntax.

  ```sql
  DECLARE y INT64;
  -- y = 1 * (3 + 2) = 5
  EXECUTE IMMEDIATE "SELECT @a * (@b + 2)" INTO y USING 1 as a, 3 as b;
  ```

Here are some additional notes about the behavior of the `EXECUTE IMMEDIATE`
statement:

- `EXECUTE IMMEDIATE` is restricted from being executed dynamically as a nested element. This means `EXECUTE IMMEDIATE` can't be nested in another `EXECUTE IMMEDIATE` statement.
- If an `EXECUTE IMMEDIATE` statement returns results, then those results become the result of the entire statement and any appropriate system variables are updated.
- The same variable can appear in both the `INTO` and `USING` clauses.
- `query_statement` can contain a single parsed statement that contains other statements (for example, BEGIN...END)
- If zero rows are returned from `query_statement`, including from zero-row value tables, all variables in the `INTO` clause are set to NULL.
- If one row is returned from `query_statement`, including from zero-row value tables, values are assigned by position, not variable name.
- If an `INTO` clause is present, an error is thrown if you attempt to return more than one row from `query_statement`.

**Examples**

In this example, we create a table of books and populate it with data. Note
the different ways that you can reference variables, save values to
variables, and use expressions.

```sql
-- Create some variables.
DECLARE book_name STRING DEFAULT 'Ulysses';
DECLARE book_year INT64 DEFAULT 1922;
DECLARE first_date INT64;

-- Create a temporary table called Books.
EXECUTE IMMEDIATE
  "CREATE TEMP TABLE Books (title STRING, publish_date INT64)";

-- Add a row for Hamlet (less secure).
EXECUTE IMMEDIATE
  "INSERT INTO Books (title, publish_date) VALUES('Hamlet', 1599)";

-- Add a row for Ulysses, using the variables declared and the ? placeholder.
EXECUTE IMMEDIATE
  "INSERT INTO Books (title, publish_date) VALUES(?, ?)"
  USING book_name, book_year;

-- Add a row for Emma, using the identifier placeholder.
EXECUTE IMMEDIATE
  "INSERT INTO Books (title, publish_date) VALUES(@name, @year)"
  USING 1815 as year, "Emma" as name;

-- Add a row for Middlemarch, using an expression.
EXECUTE IMMEDIATE
  CONCAT(
    "INSERT INTO Books (title, publish_date)", "VALUES('Middlemarch', 1871)"
  );

-- The table looks similar to the following:
/*------------------+------------------+
 | title            | publish_date     |
 +------------------+------------------+
 | Hamlet           | 1599             |
 | Ulysses          | 1922             |
 | Emma             | 1815             |
 | Middlemarch      | 1871             |
 +------------------+------------------*/

-- Save the publish date of the earliest book, Hamlet, to a variable called
-- first_date.
EXECUTE IMMEDIATE "SELECT MIN(publish_date) FROM Books LIMIT 1" INTO first_date;
```

### `BEGIN...END`

**Syntax**

```sql
BEGIN
  sql_statement_list
END;
```

**Description**

`BEGIN` initiates a block of statements where declared variables exist only
until the corresponding `END`. `sql_statement_list` is a list of zero or more
SQL statements ending with semicolons.

Variable declarations must appear at the start of the block, prior to other
types of statements. Variables declared inside a block may only be referenced
within that block and in any nested blocks. It's an error to declare a variable
with the same name as a variable declared in the same block or an outer block.

There is a maximum nesting level of 50 for blocks and conditional statements
such as `BEGIN`/`END`, `IF`/`ELSE`/`END IF`, and `WHILE`/`END WHILE`.

`BEGIN`/`END` is restricted from being executed dynamically as a nested element.

You can use a label with this statement. To learn more, see [Labels](#labels).

**Examples**

The following example declares a variable `x` with the default value 10; then,
it initiates a block, in which a variable `y` is assigned the value of `x`,
which is 10, and returns this value; next, the `END` statement ends the
block, ending the scope of variable `y`; finally, it returns the value of `x`.

```sql
DECLARE x INT64 DEFAULT 10;
BEGIN
  DECLARE y INT64;
  SET y = x;
  SELECT y;
END;
SELECT x;
```

### `BEGIN...EXCEPTION...END`

**Syntax**

```sql
BEGIN
  sql_statement_list
EXCEPTION WHEN ERROR THEN
  sql_statement_list
END;
```

**Description**

`BEGIN...EXCEPTION` executes a block of statements. If any of the statements
encounter an error, the remainder of the block is skipped and the statements in
the `EXCEPTION` clause are executed.

Within the `EXCEPTION` clause, you can access details about the error using the
following `EXCEPTION` system variables:

| Name | Type | Description |
|---|---|---|
| `@@error.formatted_stack_trace` | `STRING` | The content of `@@error.stack_trace` expressed as a human readable string. This value is intended for display purposes, and is subject to change without notice. Programmatic access to an error's stack trace should use `@@error.stack_trace` instead. |
| `@@error.message` | `STRING` | Specifies a human-readable error message. |
| `@@error.stack_trace` | See [1](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/procedural-language#footnote-1). | Each element of the array corresponds to a statement or procedure call executing at the time of the error, with the currently executing stack frame appearing first. The meaning of each field is defined as follows: - line/column: Specifies the line and column number of the stack frame, starting with 1. If the frame occurs within a procedure body, then `line 1 column 1` corresponds to the `BEGIN` keyword at the start of the procedure body. - location: If the frame occurs within a procedure body, specifies the full name of the procedure, in the form `[project_name].[schema_name].[procedure_name]`. If the frame refers to a location in a top-level multi-statement query, this field is `NULL`. - filename: Reserved for future use. Always `NULL`. |
| `@@error.statement_text` | `STRING` | Specifies the text of the statement which caused the error. |

^1^ The type for `@@error.stack_trace` is
`ARRAY<STRUCT<line INT64, column INT64, filename STRING, location STRING>>`.

As BigQuery reserves the right to revise error messages at any time,
consumers of `@@error.message` shouldn't rely on error messages remaining the
same or following any particular pattern. Don't obtain error location
information by extracting text out of the error message --- use
`@@error.stack_trace` and `@@error.statement_text` instead.

To handle exceptions that are thrown (and not handled) by an exception handler
itself, you must wrap the block in an outer block with a separate exception
handler.

The following shows how to use an outer block with a separate exception handler:

```sql
BEGIN
  BEGIN
    ...
  EXCEPTION WHEN ERROR THEN
    SELECT 1/0;
  END;
EXCEPTION WHEN ERROR THEN
  -- The exception thrown from the inner exception handler lands here.
END;
```

`BEGIN...EXCEPTION` blocks also support `DECLARE` statements, just like any
other `BEGIN` block. Variables declared in a `BEGIN` block are valid only in
the `BEGIN` section, and may not be used in the block's exception handler.

You can use a label with this statement. To learn more, see [Labels](#labels).

**Examples**

In this example, when the division by zero error occurs, instead of
stopping the entire multi-statement query, GoogleSQL stops
`schema1.proc1()` and `schema1.proc2()` and execute the `SELECT` statement in
the exception handler.

```sql
CREATE OR REPLACE PROCEDURE schema1.proc1() BEGIN
  SELECT 1/0;
END;

CREATE OR REPLACE PROCEDURE schema1.proc2() BEGIN
  CALL schema1.proc1();
END;

BEGIN
  CALL schema1.proc2();
EXCEPTION WHEN ERROR THEN
  SELECT
    @@error.message,
    @@error.stack_trace,
    @@error.statement_text,
    @@error.formatted_stack_trace;
END;
```

When the exception handler runs, the variables will have
the following values:

| Variable | Value |
|---|---|
| `@@error.message` | `"Query error: division by zero: 1 / 0 at <project>.schema1.proc1:2:3]"` |
| `@@error.stack_trace` | `[` `STRUCT(2 AS line, 3 AS column, NULL AS filename, "<project>.schema1.proc1:2:3" AS location),` `STRUCT(2 AS line, 3 AS column, NULL AS filename, "<project>.schema1.proc2:2:3" AS location),` `STRUCT(10 AS line, 3 AS column, NULL AS filename, NULL AS location),` `]` |
| `@@error.statement_text` | `"SELECT 1/0"` |
| `@@error.formatted_stack_trace` | `"At <project>.schema1.proc1[2:3]\nAt <project>.schema1.proc2[2:3]\nAt [10:3]"` |

### `CASE`

**Syntax**

```sql
CASE
  WHEN boolean_expression THEN sql_statement_list
  [...]
  [ELSE sql_statement_list]
END CASE;
```

**Description**

Executes the `THEN sql_statement_list` where the boolean expression is true,
or the optional `ELSE sql_statement_list` if no conditions match.

`CASE` can have a maximum of 50 nesting levels.

`CASE` is restricted from being executed dynamically as a nested element. This
means `CASE` can't be nested in an `EXECUTE IMMEDIATE` statement.

**Examples**

In this example, a search if conducted for the `target_product_ID` in the
`products_a` table. If the ID isn't found there, a search is conducted for
the ID in the `products_b` table. If the ID isn't found there, the statement in
the `ELSE` block is executed.

```sql
DECLARE target_product_id INT64 DEFAULT 103;
CASE
  WHEN
    EXISTS(SELECT 1 FROM schema.products_a WHERE product_id = target_product_id)
    THEN SELECT 'found product in products_a table';
  WHEN
    EXISTS(SELECT 1 FROM schema.products_b WHERE product_id = target_product_id)
    THEN SELECT 'found product in products_b table';
  ELSE
    SELECT 'did not find product';
END CASE;
```

### `CASE search_expression`

**Syntax**

```sql
CASE search_expression
  WHEN expression THEN sql_statement_list
  [...]
  [ELSE sql_statement_list]
END CASE;
```

**Description**

Executes the first `sql_statement_list` where the search expression is matches
a `WHEN` expression. The `search_expression` is evaluated once and then
tested against each `WHEN` expression for equality until a match is found.
If no match is found, then the optional `ELSE` `sql_statement_list`
is executed.

`CASE` can have a maximum of 50 nesting levels.

`CASE` is restricted from being executed dynamically as a nested element. This
means `CASE` can't be nested in an `EXECUTE IMMEDIATE` statement.

**Examples**

The following example uses the product ID as the search expression. If the
ID is `1`, `'Product one'` is returned. If the ID is `2`, `'Product two'`
is returned. If the ID is anything else, `Invalid product` is returned.

```sql
DECLARE product_id INT64 DEFAULT 1;
CASE product_id
  WHEN 1 THEN
    SELECT CONCAT('Product one');
  WHEN 2 THEN
    SELECT CONCAT('Product two');
  ELSE
    SELECT CONCAT('Invalid product');
END CASE;
```

### `IF`

**Syntax**

```sql
IF condition THEN [sql_statement_list]
  [ELSEIF condition THEN [sql_statement_list]]
  [...]
  [ELSE [sql_statement_list]]
END IF;
```

**Description**

Executes the first `sql_statement_list` where the condition is true, or the
optional `ELSE` `sql_statement_list` if no conditions match.

Each `sql_statement_list` in the `THEN`, `ELSEIF`, or `ELSE` branches is a list
of zero or more SQL statements ending with semicolons. To do nothing in a
branch, leave `sql_statement_list` empty (optionally with an explanatory
comment). Don't use a bare semicolon (`;`) to indicate an empty branch or
statement. Empty statements aren't valid in a multi-statement query and produce
a syntax error.

There is a maximum nesting level of 50 for blocks and conditional statements
such as `BEGIN`/`END`, `IF`/`ELSE`/`END IF`, and `WHILE`/`END WHILE`.

`IF` is restricted from being executed dynamically as a nested element. This
means `IF` can't be nested in an `EXECUTE IMMEDIATE` statement.

**Examples**

The following example declares a INT64 variable
`target_product_id` with a default value of 103; then, it checks whether the
table `schema.products` contains a row with the `product_id` column matches
the value of `target_product_id`; if so, it outputs a string stating that the
product has been found, along with the value of `target_product_id`; if not,
it outputs a string stating that the product hasn't been found, also with the
value of `target_product_id`.

```sql
DECLARE target_product_id INT64 DEFAULT 103;
IF EXISTS(SELECT 1 FROM schema.products
           WHERE product_id = target_product_id) THEN
  SELECT CONCAT('found product ', CAST(target_product_id AS STRING));
  ELSEIF EXISTS(SELECT 1 FROM schema.more_products
           WHERE product_id = target_product_id) THEN
  SELECT CONCAT('found product from more_products table',
  CAST(target_product_id AS STRING));
ELSE
  SELECT CONCAT('did not find product ', CAST(target_product_id AS STRING));
END IF;
```

The following example leaves the `THEN` statement list empty to do nothing when
the condition is met:

```sql
DECLARE target_product_id INT64 DEFAULT 103;
IF target_product_id IS NULL THEN
  -- Do nothing.
ELSE
  SELECT CONCAT('Product ID: ', CAST(target_product_id AS STRING));
END IF;
```

### Labels

**Syntax**

```sql
label_name: BEGIN
  block_statement_list
END [label_name];
```

```sql
label_name: LOOP
  loop_statement_list
END LOOP [label_name];
```

```sql
label_name: WHILE condition DO
  loop_statement_list
END WHILE [label_name];
```

```sql
label_name: FOR variable IN query DO
  loop_statement_list
END FOR [label_name];
```

```sql
label_name: REPEAT
  loop_statement_list
  UNTIL boolean_condition
END REPEAT [label_name];
```

```sql
block_statement_list:
  { statement | break_statement_with_label }[, ...]

loop_statement_list:
  { statement | break_continue_statement_with_label }[, ...]

break_statement_with_label:
  { BREAK | LEAVE } label_name;

break_continue_statement_with_label:
  { BREAK | LEAVE | CONTINUE | ITERATE } label_name;
```

**Description**

A BREAK or CONTINUE statement with a label provides an unconditional jump to
the end of the block or loop associated with that label. To use a label with a
block or loop, the label must appear at the beginning of the block or loop, and
optionally at the end.

- A label name may consist of any GoogleSQL identifier, including the use of backticks to include reserved characters or keywords.
- Multipart path names can be used, but only as quoted identifiers.

  ```text
  `foo.bar`: BEGIN ... END -- Works
  foo.bar: BEGIN ... END -- Doesn't work
  ```

- Label names are case-insensitive.

- Each stored procedure has an independent store of label names. For example,
  a procedure may redefine a label already used in a calling procedure.

- A loop or block may not repeat a label name used in an enclosing loop or
  block.

- Repeated label names are allowed in non-overlapping parts in
  procedural statements.

- A label and variable with the same name is allowed.

- When the `BREAK`, `LEAVE`, `CONTINUE`, or `ITERATE` statement specifies a
  label, it exits or continues the loop matching the label name, rather than
  always picking the innermost loop.

**Examples**

You can only reference a block or loop while inside of it.

```sql
label_1: BEGIN
  SELECT 1;
  BREAK label_1;
  SELECT 2; -- Unreached
END;
```

```sql
label_1: LOOP
  BREAK label_1;
END LOOP label_1;

WHILE x < 1 DO
  CONTINUE label_1; -- Error
END WHILE;
```

Repeated label names are allowed in non-overlapping parts of
the multi-statement query. This works:

```sql
label_1: BEGIN
  BREAK label_1;
END;

label_2: BEGIN
  BREAK label_2;
END;

label_1: BEGIN
  BREAK label_1;
END;
```

A loop or block may not repeat a label name used in an enclosing loop or block.
This throws an error:

```sql
label_1: BEGIN
   label_1: BEGIN -- Error
     BREAK label_1;
   END;
END;
```

A label and variable can have same name. This works:

```sql
label_1: BEGIN
   DECLARE label_1 INT64;
   BREAK label_1;
END;
```

The `END` keyword terminating a block or loop may specify a label name, but
this is optional. These both work:

```sql
label_1: BEGIN
  BREAK label_1;
END label_1;
```

```sql
label_1: BEGIN
  BREAK label_1;
END;
```

You can't have a label at the end of a block or loop if there isn't a label
at the beginning of the block or loop. This throws an error:

```sql
BEGIN
  BREAK label_1;
END label_1;
```

In this example, the `BREAK` and `CONTINUE` statements target the outer
`label_1: LOOP`, rather than the inner `WHILE x < 1 DO` loop:

Adapted (not in the official docs): added the missing `END IF;` and the final semicolon.

```sql
label_1: LOOP
  WHILE x < 1 DO
    IF y < 1 THEN
      CONTINUE label_1;
    ELSE
      BREAK label_1;
    END IF;
  END WHILE;
END LOOP label_1;
```

A `BREAK`, `LEAVE`, or `CONTINUE`, or `ITERATE` statement that specifies a label
that doesn't exist throws an error:

```sql
WHILE x < 1 DO
  BREAK label_1; -- Error
END WHILE;
```

Exiting a block from within the exception handler section is allowed:

```sql
label_1: BEGIN
  SELECT 1;
  EXCEPTION WHEN ERROR THEN
    BREAK label_1;
    SELECT 2; -- Unreached
END;
```

`CONTINUE` can't be used with a block label. This throws an error:

```sql
label_1: BEGIN
  SELECT 1;
  CONTINUE label_1; -- Error
  SELECT 2;
END;
```

### Loops

#### `LOOP`

**Syntax**

```sql
LOOP
  sql_statement_list
END LOOP;
```

**Description**

Executes `sql_statement_list` until a `BREAK` or `LEAVE` statement exits the
loop. `sql_statement_list` is a list of zero or more SQL statements ending with
semicolons.

`LOOP` is restricted from being executed dynamically as a nested element. This
means `LOOP` can't be nested in an `EXECUTE IMMEDIATE` statement.

You can use a label with this statement. To learn more, see [Labels](#labels).

**Examples**

The following example declares a variable `x` with the default value 0; then,
it uses the `LOOP` statement to create a loop that executes until the variable
`x` is greater than or equal to 10; after the loop exits, the example
outputs the value of `x`.

```sql
DECLARE x INT64 DEFAULT 0;
LOOP
  SET x = x + 1;
  IF x >= 10 THEN
    LEAVE;
  END IF;
END LOOP;
SELECT x;
```

This example outputs the following:

```sql
/*----+
 | x  |
 +----+
 | 10 |
 +----*/
```

#### `REPEAT`

**Syntax**

```sql
REPEAT
  sql_statement_list
  UNTIL boolean_condition
END REPEAT;
```

**Description**

Repeatedly executes a list of zero or more SQL statements until the
boolean condition at the end of the list is `TRUE`. The boolean condition
must be an expression. You can exit this loop early with the `BREAK` or `LEAVE`
statement.

`REPEAT` is restricted from being executed dynamically as a nested element. This
means `REPEAT` can't be nested in an `EXECUTE IMMEDIATE` statement.

You can use a label with this statement. To learn more, see [Labels](#labels).

**Examples**

The following example declares a variable `x` with the default value `0`; then,
it uses the `REPEAT` statement to create a loop that executes until the variable
`x` is greater than or equal to `3`.

```sql
DECLARE x INT64 DEFAULT 0;

REPEAT
  SET x = x + 1;
  SELECT x;
  UNTIL x >= 3
END REPEAT;
```

This example outputs the following:

```sql
/*---+
 | x |
 +---+
 | 1 |
 +---*/

/*---+
 | x |
 +---+
 | 2 |
 +---*/

/*---+
 | x |
 +---+
 | 3 |
 +---*/
```

#### `WHILE`

**Syntax**

```sql
WHILE boolean_expression DO
  sql_statement_list
END WHILE;
```

There is a maximum nesting level of 50 for blocks and conditional statements
such as `BEGIN`/`END`, `IF`/`ELSE`/`END IF`, and `WHILE`/`END WHILE`.

**Description**

While `boolean_expression` is true, executes `sql_statement_list`.
`boolean_expression` is evaluated for each iteration of the loop.

`WHILE` is restricted from being executed dynamically as a nested element. This
means `WHILE` can't be nested in an `EXECUTE IMMEDIATE` statement.

You can use a label with this statement. To learn more, see [Labels](#labels).

#### `BREAK`

**Syntax**

```sql
BREAK;
```

**Description**

Exit the current loop.

It's an error to use `BREAK` outside of a loop.

You can use a label with this statement. To learn more, see [Labels](#labels).

**Examples**

The following example declares two variables, `heads` and `heads_count`; next,
it initiates a loop, which assigns a random boolean value to `heads`, then
checks to see whether `heads` is true; if so, it outputs "Heads!" and increments
`heads_count`; if not, it outputs "Tails!" and exits the loop; finally, it
outputs a string stating how many times the "coin flip" resulted in "heads."

```sql
DECLARE heads BOOL;
DECLARE heads_count INT64 DEFAULT 0;
LOOP
  SET heads = RAND() < 0.5;
  IF heads THEN
    SELECT 'Heads!';
    SET heads_count = heads_count + 1;
  ELSE
    SELECT 'Tails!';
    BREAK;
  END IF;
END LOOP;
SELECT CONCAT(CAST(heads_count AS STRING), ' heads in a row');
```

#### `LEAVE`

Synonym for [`BREAK`](#break).

#### `CONTINUE`

**Syntax**

```sql
CONTINUE;
```

**Description**

Skip any following statements in the current loop and return to the start of
the loop.

It's an error to use `CONTINUE` outside of a loop.

You can use a label with this statement. To learn more, see [Labels](#labels).

**Examples**

The following example declares two variables, `heads` and `heads_count`; next,
it initiates a loop, which assigns a random boolean value to `heads`, then
checks to see whether `heads` is true; if so, it outputs "Heads!", increments
`heads_count`, and restarts the loop, skipping any remaining statements; if not,
it outputs "Tails!" and exits the loop; finally, it outputs a string stating how
many times the "coin flip" resulted in "heads."

```sql
DECLARE heads BOOL;
DECLARE heads_count INT64 DEFAULT 0;
LOOP
  SET heads = RAND() < 0.5;
  IF heads THEN
    SELECT 'Heads!';
    SET heads_count = heads_count + 1;
    CONTINUE;
  END IF;
  SELECT 'Tails!';
  BREAK;
END LOOP;
SELECT CONCAT(CAST(heads_count AS STRING), ' heads in a row');
```

#### `ITERATE`

Synonym for [`CONTINUE`](#continue).

#### `FOR...IN`

**Syntax**

```sql
FOR loop_variable_name IN (table_expression)
DO
  sql_expression_list
END FOR;
```

**Description**

Loops over every row in `table_expression` and assigns the row to
`loop_variable_name`. Inside each loop, the SQL statements in
`sql_expression_list` are executed using the current value of
`loop_variable_name`.

The value of `table_expression` is evaluated once at the start of the loop. On
each iteration, the value of `loop_variable_name` is a `STRUCT` that contains
the top-level columns of the table expression as fields. The order in which
values are assigned to `loop_variable_name` isn't defined, unless the table
expression has a top-level `ORDER BY` clause or `UNNEST` array operator.

The scope of `loop_variable_name` is the body of the loop. The name of
`loop_variable_name` can't conflict with other variables within the same
scope.

You can use a label with this statement. To learn more, see [Labels](#labels).

**Example**

```sql
FOR record IN
  (SELECT word, word_count
   FROM bigquery-public-data.samples.shakespeare
   LIMIT 5)
DO
  SELECT record.word, record.word_count;
END FOR;
```

### Transactions

#### `BEGIN TRANSACTION`

**Syntax**

```sql
BEGIN [TRANSACTION];
```

**Description**

Begins a transaction.

The transaction ends when a [`COMMIT TRANSACTION`](#commit-transaction) or
[`ROLLBACK TRANSACTION`](#rollback-transaction) statement is reached. If
execution ends before reaching either of these statements,
an automatic rollback occurs.

For more information about transactions in BigQuery, see
[Multi-statement transactions](https://docs.cloud.google.com/bigquery/docs/transactions).

**Example**

The following example performs a transaction that selects rows from an
existing table into a temporary table, deletes those rows from the original
table, and merges the temporary table into another table.

```sql
BEGIN TRANSACTION;

-- Create a temporary table of new arrivals from warehouse #1
CREATE TEMP TABLE tmp AS
SELECT * FROM myschema.NewArrivals WHERE warehouse = 'warehouse #1';

-- Delete the matching records from the original table.
DELETE myschema.NewArrivals WHERE warehouse = 'warehouse #1';

-- Merge the matching records into the Inventory table.
MERGE myschema.Inventory AS I
USING tmp AS T
ON I.product = T.product
WHEN NOT MATCHED THEN
 INSERT(product, quantity, supply_constrained)
 VALUES(product, quantity, false)
WHEN MATCHED THEN
 UPDATE SET quantity = I.quantity + T.quantity;

DROP TABLE tmp;

COMMIT TRANSACTION;
```

#### `COMMIT TRANSACTION`

**Syntax**

```sql
COMMIT [TRANSACTION];
```

**Description**

Commits an open transaction. If no open transaction is in progress, then the
statement fails.

For more information about transactions in BigQuery, see
[Multi-statement transactions](https://docs.cloud.google.com/bigquery/docs/transactions).

**Example**

```sql
BEGIN TRANSACTION;

-- SQL statements for the transaction go here.

COMMIT TRANSACTION;
```

#### `ROLLBACK TRANSACTION`

**Syntax**

```sql
ROLLBACK [TRANSACTION];
```

**Description**

Rolls back an open transaction. If there is no open transaction in progress,
then the statement fails.

For more information about transactions in BigQuery, see
[Multi-statement transactions](https://docs.cloud.google.com/bigquery/docs/transactions).

**Example**

The following example rolls back a transaction if an error occurs during the
transaction. To illustrate the logic, the example triggers a divide-by-zero
error after inserting a row into a table. After these statements run, the table
is unaffected.

```sql
BEGIN

  BEGIN TRANSACTION;
  INSERT INTO myschema.NewArrivals
    VALUES ('top load washer', 100, 'warehouse #1');
  -- Trigger an error.
  SELECT 1/0;
  COMMIT TRANSACTION;

EXCEPTION WHEN ERROR THEN
  -- Roll back the transaction inside the exception handler.
  SELECT @@error.message;
  ROLLBACK TRANSACTION;
END;
```

### `RAISE`

**Syntax**

```sql
RAISE [USING MESSAGE = message];
```

**Description**

Raises an error, optionally using the specified error message when `USING
MESSAGE = message` is supplied.

##### When `USING MESSAGE` isn't supplied

The `RAISE` statement must only be used within an `EXCEPTION` clause. The
`RAISE` statement will re-raise the exception that was caught, and preserve the
original stack trace.

##### When `USING MESSAGE` is supplied

If the `RAISE` statement is contained within the `BEGIN` section of a
`BEGIN...EXCEPTION` block:

- The handler will be invoked.
- The value of `@@error.message` will exactly match the `message` string
  supplied (which may be `NULL` if `message` is `NULL`).

- The stack trace will be set to the `RAISE` statement.

If the `RAISE` statement isn't contained within the `BEGIN` section of a
`BEGIN...EXCEPTION` block, the `RAISE` statement stops execution of the
multi-statement query with the error message supplied.

### `RETURN`

`RETURN` stops execution of the multi-statements query.

### `CALL`

**Syntax**

```sql
CALL procedure_name (procedure_argument[, …])
```

**Description**

Calls a [procedure](https://docs.cloud.google.com/bigquery/docs/procedures) with an argument list.
`procedure_argument` may be a variable or an expression.

For `OUT` or `INOUT` arguments, a variable passed as an argument must have the
proper GoogleSQL [type](data-types.md). The same variable may not appear
multiple times as an `OUT` or `INOUT` argument in the procedure's argument list.

The maximum depth of procedure calls is 50 frames.

`CALL` is restricted from being executed dynamically as a nested element. This
means `CALL` can't be nested in an `EXECUTE IMMEDIATE` statement.

**Examples**

The following example declares a variable `retCode`. Then, it calls the
procedure `updateSomeTables` in the schema `mySchema`, passing the arguments
`'someAccountId'` and `retCode`. Finally, it returns the value of `retCode`.

```sql
DECLARE retCode INT64;
-- Procedure signature: (IN account_id STRING, OUT retCode INT64)
CALL mySchema.UpdateSomeTables('someAccountId', retCode);
SELECT retCode;
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/procedural-language (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the description of the `IF` example refers to `default_product_id`, but the example declares `target_product_id`. Both mentions are changed to `target_product_id`.
- Corrected from the official docs: the nested `IF ... THEN ... ELSE` has no `END IF;`, and the last line `END LOOP label_1` has no semicolon. Both are added, following the `IF` syntax on the same page, which ends with `END IF;`.
- Caution: under `EXECUTE IMMEDIATE ... INTO`, the bullet "If one row is returned from `query_statement`, including from zero-row value tables, values are assigned by position" repeats "zero-row value tables" from the previous bullet about zero rows. The intended wording is not stated.

## Related

- [Index of this directory](./README.md)

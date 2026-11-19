---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/functions-reference
---

# Function calls

## Signature / Usage

When you call a function, specific rules may apply. You can also add the
`SAFE.` prefix, which prevents functions from generating some types of errors.
To learn more, see the next sections.

### Function call rules

The following rules apply to all built-in GoogleSQL functions unless
explicitly indicated otherwise in the function description:

- If an operand is `NULL`, the function result is `NULL`.
- For functions that are time zone sensitive, the default time zone, UTC, is used when a time zone isn't specified.

### Named arguments

```sql
named_argument => value
```

You can provide parameter arguments by name when calling some functions and
procedures. These arguments are called *named arguments* . An argument that isn't
named is called a *positional argument*.

- Named arguments are optional, unless specified as required in the function signature.
- Named arguments don't need to be in order.
- You can specify positional arguments before named arguments.
- You can't specify positional arguments after named arguments.
- An optional positional argument that isn't used doesn't need to be added before a named argument.

**Examples**

These examples reference a function called `CountTokensInText`, which counts
the number of tokens in a paragraph. The function signature looks like this:

```sql
CountTokensInText(paragraph STRING, tokens ARRAY<STRING>, delimiters STRING)
```

`CountTokensInText` contains three arguments: `paragraph`, `tokens`, and
`delimiters`. `paragraph` represents a body of text to analyze,
`tokens` represents the tokens to search for in the paragraph,
and `delimiters` represents the characters that specify a boundary
between tokens in the paragraph.

This is a query that includes `CountTokensInText`
without named arguments:

```sql
SELECT token, count
FROM CountTokensInText(
  'Would you prefer softball, baseball, or tennis? There is also swimming.',
  ['baseball', 'football', 'tennis'],
  ' .,!?()')
```

This is the query with named arguments:

```sql
SELECT token, count
FROM CountTokensInText(
  paragraph => 'Would you prefer softball, baseball, or tennis? There is also swimming.',
  tokens => ['baseball', 'football', 'tennis'],
  delimiters => ' .,!?()')
```

If named arguments are used, the order of the arguments doesn't matter. This
works:

```sql
SELECT token, count
FROM CountTokensInText(
  tokens => ['baseball', 'football', 'tennis'],
  delimiters => ' .,!?()',
  paragraph => 'Would you prefer softball, baseball, or tennis? There is also swimming.')
```

You can mix positional arguments and named arguments, as long as the positional
arguments in the function signature come first:

```sql
SELECT token, count
FROM CountTokensInText(
  'Would you prefer softball, baseball, or tennis? There is also swimming.',
  tokens => ['baseball', 'football', 'tennis'],
  delimiters => ' .,!?()')
```

This doesn't work because a positional argument appears after a named argument:

```sql
SELECT token, count
FROM CountTokensInText(
  paragraph => 'Would you prefer softball, baseball, or tennis? There is also swimming.',
  ['baseball', 'football', 'tennis'],
  delimiters => ' .,!?()')
```

If you want to use `tokens` as a positional argument, any arguments that appear
before it in the function signature must also be positional arguments.
If you try to use a named argument for `paragraph` and a positional
argument for `tokens`, this will not work.

```sql
-- This doesn't work.
SELECT token, count
FROM CountTokensInText(
  ['baseball', 'football', 'tennis'],
  delimiters => ' .,!?()',
  paragraph => 'Would you prefer softball, baseball, or tennis? There is also swimming.')

-- This works.
SELECT token, count
FROM CountTokensInText(
  'Would you prefer softball, baseball, or tennis? There is also swimming.',
  ['baseball', 'football', 'tennis'],
  delimiters => ' .,!?()')
```

### Chained function calls

Writing nested expressions in GoogleSQL is common, particularly when
you're cleaning or transforming data. Deeply nested expressions can be hard to
read and maintain.

Here's an example of an expression with deep nesting. The nesting makes it
difficult to read:

```sql
SELECT
  REPLACE(
    REPLACE(
      REPLACE(
        REPLACE(
          REPLACE('one two three four five', 'one', '1'),
          'two', '2'),
        'three', '3'),
      'four', '4'),
    'five', '5');
```

Here is the same example rewritten using chained function syntax:

```sql
SELECT
  ('one two three four five')
  .REPLACE('one', '1')
  .REPLACE('two', '2')
  .REPLACE('three', '3')
  .REPLACE('four', '4')
  .REPLACE('five', '5');
```

*Chained function calls* provide a syntax for simplifying nested
function calls. Chained function calls have the following properties:

- Chained function calls consist of functions connected together with a `.` character.
- Each function in the chain must meet certain [requirements](#chained-function-requirements).
- Each function in the chain uses the output from the previous function as its first argument.
- If the chain starts from a column name (or other identifier), that initial argument must be surrounded by `()` characters, for example: `(x).UPPER()`. Parentheses aren't required on the input for other cases.
- For functions with multi-part names, like `SAFE.SQRT`, the function name must be parenthesized. For example, `(x).(SAFE.SQRT)()`.

Chained function calls are generally easier to read, understand, and maintain
than deeply nested function calls because they're applied in the order in which
they're written.

#### Chained function requirements

You can write function calls in chained call syntax if the functions meet these
requirements:

- The function must use standard function call syntax, using comma-separated arguments. Function-like syntaxes that include special-case keywords, such as `CAST(value AS type)`, aren't included.
- The function must have at least one argument. The first argument becomes the chained input, and must meet the following requirements:
  - It must be an expression. It can't be a table, connection, model, descriptor, or other non-expression argument type.
  - It must be a positional argument. It can't be a [named argument](#named-arguments) (`name => value`).
  - It can't have an `AS` alias (as in `value AS alias`).

There are a few additional special cases. Chained function calls are allowed
for these functions:

- Aggregate functions with standard modifiers like `DISTINCT`, `ORDER BY`, etc. You write the modifiers inside the parentheses with their usual syntax. For example, you write `COUNT(DISTINCT x)` as `(x).COUNT(DISTINCT)`.
- `FLATTEN` (and other functions that do implicit flattening)

Chained function calls aren't allowed for these functions:

- `GROUPING`
- Aggregate functions with [multi-level aggregation](aggregate-function-calls.md#multi-level-aggregation)

#### Example chained function calls

The following examples show the chained function call equivalent
of some standard syntax calls:

```sql
UPPER(x)
(x).UPPER()  # Chained function call equivalent; the x must be within ()

SUBSTR(x, 1, 4)
(x).SUBSTR(1, 4)  # Chained function call equivalent

STRPOS(x, 'pattern string')
(x).STRPOS('pattern string')  # Chained function call equivalent

FUNC(x, y, named_argument=>z)  # Some function that meets the chained function call requirements
(x).FUNC(y, named_argument=>z)  # Chained function call equivalent

ARRAY_CONCAT(array1, array2)
(array1).ARRAY_CONCAT(array2)  # Chained function call equivalent

SELECT SAFE.LEFT(x, count) AS result;      # Multi-part function name
SELECT (x).(SAFE.LEFT)(count) AS result;   # Chained function call equivalent
```

Here are chained function call examples with multiple function calls:

```sql
SELECT "Two birds and one mouse"
  .REPLACE("bird", "dog")
  .REPLACE("mouse", "cat") AS result;

/*----------------------+
 |      result          |
 +----------------------+
 | Two dogs and one cat |
 +----------------------*/
```

The following examples result in errors because the function being called
doesn't meet the necessary requirements.

Adapted (not in the official docs): removed a stray trailing period after `FUNC(named_argument=>x)`.

```sql
FUNC(named_argument=>x)  # Some function
(x).FUNC()  # Error: The first argument can't be a named argument.

CAST(x AS INT64)
(x).CAST(AS INT64)  # Error: CAST syntax isn't supported in chained function calls.

GROUPING(x)
(x).GROUPING()  # Error: The argument isn't an expression.
```

### SAFE. prefix

**Syntax:**

```sql
SAFE.function_name()
```

**Description**

If you begin a function with
the `SAFE.` prefix, it will return `NULL` instead of an error.
The `SAFE.` prefix only prevents errors from the prefixed function
itself: it doesn't prevent errors that occur while evaluating argument
expressions. The `SAFE.` prefix only prevents errors that occur because of the
value of the function inputs, such as "value out of range" errors; other
errors, such as internal or system errors, may still occur. If the function
doesn't return an error, `SAFE.` has no effect on the output.

**Exclusions**

- [Operators](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/operators), such as `+` and `=`, don't support the `SAFE.` prefix. To prevent errors from a division operation, use [SAFE_DIVIDE](mathematical_functions.md#safe_divide).
- Some operators, such as `IN`, `ARRAY`, and `UNNEST`, resemble functions but don't support the `SAFE.` prefix.
- The `CAST`, `EXTRACT`, and `SECURE_CONTEXT` functions don't support the `SAFE.` prefix. To prevent errors from casting, use [SAFE_CAST](conversion_functions.md#safe_cast).

**Example**

In the following example, the first use of the `SUBSTR` function would normally
return an error, because the function doesn't support length arguments with
negative values. However, the `SAFE.` prefix causes the function to return
`NULL` instead. The second use of the `SUBSTR` function provides the expected
output: the `SAFE.` prefix has no effect.

```sql
SELECT SAFE.SUBSTR('foo', 0, -2) AS safe_output UNION ALL
SELECT SAFE.SUBSTR('bar', 0, 2) AS safe_output;

/*-------------+
 | safe_output |
 +-------------+
 | NULL        |
 | ba          |
 +-------------*/
```

**Supported functions**

BigQuery supports the use of the `SAFE.` prefix with most
scalar functions that can raise errors, including
[STRING functions](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions),
[math functions](mathematical_functions.md), [DATE functions](date_functions.md),
[DATETIME functions](datetime_functions.md),
[TIMESTAMP functions](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions), and [JSON functions](json_functions-1.md).
BigQuery does not support the use of the `SAFE.` prefix with
[aggregate](aggregate_functions.md), [window](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/window-function-calls), or
[user-defined functions](https://docs.cloud.google.com/bigquery/docs/user-defined-functions).

### Calling persistent user-defined functions (UDFs)

After [creating a persistent UDF](https://docs.cloud.google.com/bigquery/docs/data-definition-language#create_function_statement),
you can call it as you would any other function, prepended with the name of
the dataset in which it is defined as a prefix.

**Syntax**

```sql
[`project_name`].dataset_name.function_name([parameter_value[, ...]])
```

To call a UDF in a project other than the project that you are using to run
the query, `project_name` is required.

**Examples**

The following example creates a UDF named `multiply_by_three` and calls it
from the same project.

```sql
CREATE FUNCTION my_dataset.multiply_by_three(x INT64) AS (x * 3);

SELECT my_dataset.multiply_by_three(5) AS result; -- returns 15
```

The following example calls a persistent UDF from a different project.

Adapted (not in the official docs): the `FUNCTION` keyword, which `CREATE` requires for a persistent UDF, is added.

```sql
CREATE FUNCTION `other_project`.other_dataset.other_function(x INT64, y INT64)
  AS (x * y * 2);

SELECT `other_project`.other_dataset.other_function(3, 4); --returns 24
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/functions-reference (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the example that calls a persistent UDF from a different project writes `CREATE` followed by the function name without the `FUNCTION` keyword; it is written `CREATE FUNCTION`.
- Corrected from the official docs: the first line of the error examples ended with a stray `.` after `FUNC(named_argument=>x)`; the other lines in the block have none, so it is removed.

## Related

- [Index of this directory](./README.md)

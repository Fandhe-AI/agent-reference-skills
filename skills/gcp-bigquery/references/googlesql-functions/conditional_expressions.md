---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conditional_expressions
---

# Conditional expressions

## Signature / Usage

GoogleSQL for BigQuery supports conditional expressions.

#### Evaluation order and short-circuiting

In contrast to regular functions, where all inputs are evaluated before calling
the function, conditional expressions impose constraints on the evaluation
semantics of their inputs:

- Conditional expressions behave as if input expressions are evaluated from left to right and only up to the chosen output expression. Evaluation errors in unchosen expressions are ignored. If an expression that must be evaluated to determine the result produces an evaluation error, the query fails with that error. You can use short-circuiting semantics for error handling, such as avoiding division-by-zero errors. For more information, see [short-circuiting](https://en.wikipedia.org/wiki/Short-circuit_evaluation).
- If the final result and error-handling behavior match short-circuiting semantics, input expressions might be evaluated in parallel or before the conditional expression is evaluated. These input expressions include scalar expressions and scalar subqueries in unchosen branches. Because all input expressions might still execute, don't rely solely on conditional expressions for performance tuning. To conditionally execute subqueries, use procedural control flow statements (such as `IF ... THEN` statements in procedural SQL) rather than conditional expressions. For more information, see [lazy physical execution](https://en.wikipedia.org/wiki/Lazy_evaluation).

#### Expression list

| Name | Summary |
|---|---|
| [`CASE expr`](#case-expr) | Compares the given expression to each successive `WHEN` clause and produces the first result where the values are equal. |
| [`CASE`](#case) | Evaluates the condition of each successive `WHEN` clause and produces the first result where the condition evaluates to `TRUE`. |
| [`COALESCE`](#coalesce) | Produces the value of the first non-`NULL` expression, if any, otherwise `NULL`. |
| [`IF`](#if) | If an expression evaluates to `TRUE`, produces a specified result, otherwise produces the evaluation for an *else result*. |
| [`IFNULL`](#ifnull) | If an expression evaluates to `NULL`, produces a specified result, otherwise produces the expression. |
| [`NULLIF`](#nullif) | Produces `NULL` if the first expression that matches another evaluates to `TRUE`, otherwise returns the first expression. |

#### `CASE expr`

```sql
CASE expr
  WHEN expr_to_match THEN result
  [ ... ]
  [ ELSE else_result ]
  END
```

**Description**

Compares `expr` to `expr_to_match` of each successive `WHEN` clause and returns
the first result where this comparison evaluates to `TRUE`. The expression
behaves as if the remaining `WHEN` clauses and `else_result` aren't evaluated.
For more information, see
[Evaluation order and short-circuiting](#evaluation-order-and-short-circuiting).

If the `expr = expr_to_match` comparison evaluates to `FALSE` or `NULL` for all
`WHEN` clauses, returns the evaluation of `else_result` if present; if
`else_result` isn't present, then returns `NULL`.

Consistent with [equality comparisons](../googlesql-syntax/operators.md#logical-operators) elsewhere, if both
`expr` and `expr_to_match` are `NULL`, then `expr = expr_to_match` evaluates to
`NULL`, which returns `else_result`. If a CASE statement needs to distinguish a
`NULL` value, then the alternate [CASE](#case) syntax should be used.

`expr` and `expr_to_match` can be any type. They must be implicitly
coercible to a common [supertype](../googlesql-syntax/conversion_rules.md#supertypes); equality comparisons are
done on coerced values. There may be multiple `result` types. `result` and
`else_result` expressions must be coercible to a common supertype.

This expression supports specifying [collation](../googlesql-syntax/collation-concepts.md).

**Return Data Type**

[Supertype](../googlesql-syntax/conversion_rules.md#supertypes) of `result`\[, ...\] and `else_result`.

**Example**

```sql
WITH Numbers AS (
  SELECT 90 as A, 2 as B UNION ALL
  SELECT 50, 8 UNION ALL
  SELECT 60, 6 UNION ALL
  SELECT 50, 10
)
SELECT
  A,
  B,
  CASE A
    WHEN 90 THEN 'red'
    WHEN 50 THEN 'blue'
    ELSE 'green'
    END
    AS result
FROM Numbers

/*------------------+
 | A  | B  | result |
 +------------------+
 | 90 | 2  | red    |
 | 50 | 8  | blue   |
 | 60 | 6  | green  |
 | 50 | 10 | blue   |
 +------------------*/
```

#### `CASE`

```sql
CASE
  WHEN condition THEN result
  [ ... ]
  [ ELSE else_result ]
  END
```

**Description**

Evaluates the condition of each successive `WHEN` clause and returns the
first result where the condition evaluates to `TRUE`. The expression behaves
as if any remaining `WHEN` clauses and `else_result` aren't evaluated. For
more information, see
[Evaluation order and short-circuiting](#evaluation-order-and-short-circuiting).

If all conditions evaluate to `FALSE` or `NULL`, returns evaluation of
`else_result` if present; if `else_result` isn't present, then returns `NULL`.

For additional rules on how values are evaluated, see the
three-valued logic table in [Logical operators](../googlesql-syntax/operators.md#logical-operators).

`condition` must be a boolean expression. There may be multiple `result` types.
`result` and `else_result` expressions must be implicitly coercible to a common
[supertype](../googlesql-syntax/conversion_rules.md#supertypes).

To improve performance when you filter within an aggregate
function, use the `WHERE` clause in the
[aggregate function call](aggregate-function-calls.md) instead.

This expression supports specifying [collation](../googlesql-syntax/collation-concepts.md).

**Return Data Type**

[Supertype](../googlesql-syntax/conversion_rules.md#supertypes) of `result`\[, ...\] and `else_result`.

**Example**

```sql
WITH Numbers AS (
  SELECT 90 as A, 2 as B UNION ALL
  SELECT 50, 6 UNION ALL
  SELECT 20, 10
)
SELECT
  A,
  B,
  CASE
    WHEN A > 60 THEN 'red'
    WHEN B = 6 THEN 'blue'
    ELSE 'green'
    END
    AS result
FROM Numbers

/*------------------+
 | A  | B  | result |
 +------------------+
 | 90 | 2  | red    |
 | 50 | 6  | blue   |
 | 20 | 10 | green  |
 +------------------*/
```

#### `COALESCE`

```sql
COALESCE(expr[, ...])
```

**Description**

Returns the value of the first non-`NULL` expression, if any, otherwise
`NULL`.

The expression behaves as if the remaining expressions aren't evaluated:
evaluation errors in an expression are ignored if any preceding expression
evaluates to a non-`NULL` value, even though all input expressions might still
be evaluated. If no preceding expression evaluates to a non-`NULL` value and an
expression produces an evaluation error, the query fails with that error. For
more information, see
[Evaluation order and short-circuiting](#evaluation-order-and-short-circuiting).

An input expression can be any type. There can be multiple input expression
types. All input expressions must be implicitly coercible to a common
[supertype](../googlesql-syntax/conversion_rules.md#supertypes).

**Return Data Type**

[Supertype](../googlesql-syntax/conversion_rules.md#supertypes) of `expr`\[, ...\].

**Examples**

```sql
SELECT COALESCE('A', 'B', 'C') as result

/*--------+
 | result |
 +--------+
 | A      |
 +--------*/
```

```sql
SELECT COALESCE(NULL, 'B', 'C') as result

/*--------+
 | result |
 +--------+
 | B      |
 +--------*/
```

```sql
-- The first expression is non-NULL, so it's used. The division-by-zero error
-- from the second expression isn't produced.
SELECT COALESCE(10, 1 / 0) as result

/*--------+
 | result |
 +--------+
 | 10     |
 +--------*/
```

In the following example, `COALESCE` includes scalar subqueries as fallback
arguments. Because conditional expressions don't guarantee lazy execution, all
three subqueries might be evaluated even if the first subquery returns a
non-`NULL` value:

```sql
SELECT COALESCE(
  (SELECT event_date FROM recent_events LIMIT 1),
  (SELECT MAX(event_date) FROM weekly_events),
  (SELECT MAX(event_date) FROM all_events)
)
```

#### `IF`

```sql
IF(expr, true_result, else_result)
```

**Description**

If `expr` evaluates to `TRUE`, returns `true_result`, else returns the
evaluation for `else_result`. The expression behaves as if `else_result` isn't
evaluated when `expr` evaluates to `TRUE`, and as if `true_result` isn't
evaluated when `expr` evaluates to `FALSE` or `NULL`. For more information,
see [Evaluation order and short-circuiting](#evaluation-order-and-short-circuiting).

`expr` must be a boolean expression. `true_result` and `else_result`
must be coercible to a common [supertype](../googlesql-syntax/conversion_rules.md#supertypes).

**Return Data Type**

[Supertype](../googlesql-syntax/conversion_rules.md#supertypes) of `true_result` and `else_result`.

**Examples**

```sql
SELECT
  10 AS A,
  20 AS B,
  IF(10 < 20, 'true', 'false') AS result

/*------------------+
 | A  | B  | result |
 +------------------+
 | 10 | 20 | true   |
 +------------------*/
```

```sql
SELECT
  30 AS A,
  20 AS B,
  IF(30 < 20, 'true', 'false') AS result

/*------------------+
 | A  | B  | result |
 +------------------+
 | 30 | 20 | false  |
 +------------------*/
```

#### `IFNULL`

```sql
IFNULL(expr, null_result)
```

**Description**

If `expr` evaluates to `NULL`, returns `null_result`. Otherwise, returns
`expr`.

If `expr` is non-`NULL`, the expression behaves as if `null_result` isn't
evaluated: evaluation errors in `null_result` are ignored, even though both
input expressions might still be evaluated. If `expr` evaluates to `NULL` and
`null_result` produces an evaluation error, the query fails with that error.
For more information, see
[Evaluation order and short-circuiting](#evaluation-order-and-short-circuiting).

`expr` and `null_result` can be any type and must be implicitly coercible to
a common [supertype](../googlesql-syntax/conversion_rules.md#supertypes). Synonym for
`COALESCE(expr, null_result)`.

**Return Data Type**

[Supertype](../googlesql-syntax/conversion_rules.md#supertypes) of `expr` or `null_result`.

**Examples**

```sql
SELECT IFNULL(NULL, 0) as result

/*--------+
 | result |
 +--------+
 | 0      |
 +--------*/
```

```sql
SELECT IFNULL(10, 0) as result

/*--------+
 | result |
 +--------+
 | 10     |
 +--------*/
```

```sql
-- The first expression is non-NULL, so it's used. The division-by-zero error
-- from the second expression isn't produced.
SELECT IFNULL(10, 1 / 0) as result

/*--------+
 | result |
 +--------+
 | 10     |
 +--------*/
```

#### `NULLIF`

```sql
NULLIF(expr, expr_to_match)
```

**Description**

Returns `NULL` if `expr = expr_to_match` evaluates to `TRUE`, otherwise
returns `expr`.

`expr` and `expr_to_match` must be implicitly coercible to a
common [supertype](../googlesql-syntax/conversion_rules.md#supertypes), and must be comparable.

This expression supports specifying [collation](../googlesql-syntax/collation-concepts.md).

**Return Data Type**

[Supertype](../googlesql-syntax/conversion_rules.md#supertypes) of `expr` and `expr_to_match`.

**Example**

```sql
SELECT NULLIF(0, 0) as result

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/
```

```sql
SELECT NULLIF(10, 0) as result

/*--------+
 | result |
 +--------+
 | 10     |
 +--------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conditional_expressions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

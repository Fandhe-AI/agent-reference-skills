---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_rules
---

# Conversion rules

## Signature / Usage

GoogleSQL for BigQuery supports conversion.
Conversion includes, but isn't limited to, casting, coercion, and
supertyping.

- Casting is explicit conversion and uses the [`CAST()`](../googlesql-functions/conversion_functions.md#cast) function.
- Coercion is implicit conversion, which GoogleSQL performs automatically under the conditions described below.
- A supertype is a common type to which two or more expressions can be coerced.

There are also conversions that have their own function names, such as
`PARSE_DATE()`. To learn more about these functions, see
[Conversion functions](../googlesql-functions/conversion_functions.md).

#### Comparison of casting and coercion

The following table summarizes all possible cast and coercion possibilities for
GoogleSQL data types. The *Coerce to* column applies to all
expressions of a given data type, (for example, a
column), but
literals and parameters can also be coerced. See
[literal coercion](#literal-coercion) and
[query parameter coercion](#query-parameter-coercion) for details.

| From type | Cast to | Coerce to |
|---|---|---|
| `INT64` | `BOOL` `INT64` `NUMERIC` `BIGNUMERIC` `FLOAT64` `STRING` | `NUMERIC` `BIGNUMERIC` `FLOAT64` |
| `NUMERIC` | `INT64` `NUMERIC` `BIGNUMERIC` `FLOAT64` `STRING` | `BIGNUMERIC` `FLOAT64` |
| `BIGNUMERIC` | `INT64` `NUMERIC` `BIGNUMERIC` `FLOAT64` `STRING` | `FLOAT64` |
| `FLOAT64` | `INT64` `NUMERIC` `BIGNUMERIC` `FLOAT64` `STRING` |   |
| `BOOL` | `BOOL` `INT64` `STRING` |   |
| `STRING` | `BOOL` `INT64` `NUMERIC` `BIGNUMERIC` `FLOAT64` `STRING` `BYTES` `DATE` `DATETIME` `TIME` `TIMESTAMP` `RANGE` |   |
| `BYTES` | `STRING` `BYTES` |   |
| `DATE` | `STRING` `DATE` `DATETIME` `TIMESTAMP` | `DATETIME` |
| `DATETIME` | `STRING` `DATE` `DATETIME` `TIME` `TIMESTAMP` |   |
| `TIME` | `STRING` `TIME` |   |
| `TIMESTAMP` | `STRING` `DATE` `DATETIME` `TIME` `TIMESTAMP` |   |
| `ARRAY` | `ARRAY` |   |
| `STRUCT` | `STRUCT` |   |
| `RANGE` | `RANGE` `STRING` |   |

#### Casting

Most data types can be cast from one type to another with the `CAST` function.
When using `CAST`, a query can fail if GoogleSQL is unable to perform
the cast. If you want to protect your queries from these types of errors, you
can use `SAFE_CAST`. To learn more about the rules for `CAST`, `SAFE_CAST` and
other casting functions, see
[Conversion functions](../googlesql-functions/conversion_functions.md).

#### Coercion

GoogleSQL coerces the result type of an argument expression to another
type if needed to match function signatures. For example, if function `func()`
is defined to take a single argument of type `FLOAT64`
and an expression is used as an argument that has a result type of
`INT64`, then the result of the expression will be
coerced to `FLOAT64` type before `func()` is computed.

##### Literal coercion

GoogleSQL supports the following literal coercions:

| Input data type | Result data type | Notes |
|---|---|---|
| `FLOAT64` literal | `NUMERIC` | Coercion may not be exact, and returns a close value. |
| `STRING` literal | `DATE` `DATETIME` `TIME` `TIMESTAMP` |   |

Literal coercion is needed when the actual literal type is different from the
type expected by the function in question. For
example, if function `func()` takes a DATE argument,
then the expression `func("2014-09-27")` is valid because the
string literal `"2014-09-27"` is coerced to
`DATE`.

Literal conversion is evaluated at analysis time, and gives an error if the
input literal can't be converted successfully to the target type.

> [!NOTE]
> **Note:** String literals don't coerce to numeric types.

##### Query parameter coercion

GoogleSQL supports the following query parameter coercions:

| Input data type | Result data type |
|---|---|
| `STRING parameter` | `DATE` `DATETIME` `TIME` `TIMESTAMP` |

If the parameter value can't be coerced successfully to the target type, an
error is provided.

#### Supertypes

A supertype is a common type to which two or more expressions can be coerced.
Supertypes are used with set operations such as `UNION ALL` and expressions such
as `CASE` that expect multiple arguments with matching types. Each type has one
or more supertypes, including itself, which defines its set of supertypes.

| Input type | Supertypes |
|---|---|
| `BOOL` | `BOOL` |
| `INT64` | `INT64` `FLOAT64` `NUMERIC` `BIGNUMERIC` |
| `FLOAT64` | `FLOAT64` |
| `NUMERIC` | `NUMERIC` `BIGNUMERIC` `FLOAT64` |
| `DECIMAL` | `DECIMAL` `BIGDECIMAL` `FLOAT64` |
| `BIGNUMERIC` | `BIGNUMERIC` `FLOAT64` |
| `BIGDECIMAL` | `BIGDECIMAL` `FLOAT64` |
| `STRING` | `STRING` |
| `DATE` | `DATE` |
| `TIME` | `TIME` |
| `DATETIME` | `DATETIME` |
| `TIMESTAMP` | `TIMESTAMP` |
| `BYTES` | `BYTES` |
| `STRUCT` | `STRUCT` with the same field position types. |
| `ARRAY` | `ARRAY` with the same element types. |
| `GEOGRAPHY` | `GEOGRAPHY` |
| `GRAPH_ELEMENT` | `GRAPH_ELEMENT`. Graph element `a` is a supertype of graph element `b`if the following are true: - Graph element `a` and `b` are the same element kind. - Graph element `a`'s property type list is a compatible superset of graph element `b`'s property type list. This means that properties with the same name must also have the same type. |
| `GRAPH_PATH` | `GRAPH_PATH`. Graph path `a` is a supertype of graph path `b` if the following are true: - The node type for `a` is a supertype of the node type for `b`. - The edge type for `a` is a supertype of the edge type for `b`. - Graph path `a`'s property type list is a compatible superset of graph path `b`'s property type list. This means that properties with the same name must also have the same type. |
| `RANGE` | `RANGE` with the same subtype. |

If you want to find the supertype for a set of input types, first determine the
intersection of the set of supertypes for each input type. If that set is empty
then the input types have no common supertype. If that set is non-empty, then
the common supertype is generally the
[most specific](#types-specificity) type in that set. Generally,
the most specific type is the type with the most restrictive domain.

**Examples**

| Input types | Common supertype | Returns | Notes |
|---|---|---|---|
| `INT64` `FLOAT64` | `FLOAT64` | `FLOAT64` | If you apply supertyping to `INT64` and `FLOAT64`, supertyping succeeds because they share a supertype, `FLOAT64`. |
| `INT64` `BOOL` | None | Error | If you apply supertyping to `INT64` and `BOOL`, supertyping fails because they don't share a common supertype. |

##### Exact and inexact types

Numeric types can be exact or inexact. For supertyping, if all of the
input types are exact types, then the resulting supertype can only be an
exact type.

The following table contains a list of exact and inexact numeric data types.

| Exact types | Inexact types |
|---|---|
| `INT64` `NUMERIC` `BIGNUMERIC` | `FLOAT64` |

**Examples**

| Input types | Common supertype | Returns | Notes |
|---|---|---|---|
| `INT64` `FLOAT64` | `FLOAT64` | `FLOAT64` | If supertyping is applied to `INT64` and `FLOAT64`, supertyping succeeds because there are exact and inexact numeric types being supertyped. |

##### Types specificity

Each type has a domain of values that it supports. A type with a
narrow domain is more specific than a type with a wider domain. Exact types
are more specific than inexact types because inexact types have a wider range
of domain values that are supported than exact types. For example,
`INT64` is more specific than `FLOAT64`.

##### Supertypes and literals

Supertype rules for literals are more permissive than for normal expressions,
and are consistent with implicit coercion rules. The following algorithm is used
when the input set of types includes types related to literals:

- If there exists non-literals in the set, find the set of common supertypes of the non-literals.
- If there is at least one possible supertype, find the [most specific](#types-specificity) type to which the remaining literal types can be implicitly coerced and return that supertype. Otherwise, there is no supertype.
- If the set only contains types related to literals, compute the supertype of the literal types.
- If all input types are related to `NULL` literals, then the resulting supertype is `INT64`.
- If no common supertype is found, an error is produced.

**Examples**

| Input types | Common supertype | Returns |
|---|---|---|
| `INT64` literal `UINT64` expression | `UINT64` | `UINT64` |
| `TIMESTAMP` expression `STRING` literal | `TIMESTAMP` | `TIMESTAMP` |
| `NULL` literal `NULL` literal | `INT64` | `INT64` |
| `BOOL` literal `TIMESTAMP` literal | None | Error |

Snippet taken from https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions#cast

```sql
CAST(expression AS typename [format_clause])
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_rules (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- The official page has no code example; the snippet is taken verbatim from a related page of the same reference (https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions#cast).
- Caution: The first example row (`INT64` literal and `UINT64` expression) uses `UINT64`, which is not a GoogleSQL data type (it is in neither data-types.md nor the supertype table of this page). The official page gives no replacement example.

## Related

- [Index of this directory](./README.md)

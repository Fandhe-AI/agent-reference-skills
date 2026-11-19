---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions
---

# Mathematical functions

## Signature / Usage

GoogleSQL for BigQuery supports mathematical functions.
All mathematical functions have the following behaviors:

- They return `NULL` if any of the input parameters is `NULL`.
- They return `NaN` if any of the arguments is `NaN`.

### Categories

| Category | Functions |
|---|---|
| Trigonometric | [`ACOS`](#acos) [`ACOSH`](#acosh) [`ASIN`](#asin) [`ASINH`](#asinh) [`ATAN`](#atan) [`ATAN2`](#atan2) [`ATANH`](#atanh) [`COS`](#cos) [`COSH`](#cosh) [`COT`](#cot) [`COTH`](#coth) [`CSC`](#csc) [`CSCH`](#csch) [`SEC`](#sec) [`SECH`](#sech) [`SIN`](#sin) [`SINH`](#sinh) [`TAN`](#tan) [`TANH`](#tanh) |
| Exponential and logarithmic | [`EXP`](#exp) [`LN`](#ln) [`LOG`](#log) [`LOG10`](#log10) |
| Rounding and truncation | [`CEIL`](#ceil) [`CEILING`](#ceiling) [`FLOOR`](#floor) [`ROUND`](#round) [`TRUNC`](#trunc) |
| Power and root | [`CBRT`](#cbrt) [`POW`](#pow) [`POWER`](#power) [`SQRT`](#sqrt) |
| Sign | [`ABS`](#abs) [`SIGN`](#sign) |
| Distance | [`COSINE_DISTANCE`](#cosine_distance) [`EUCLIDEAN_DISTANCE`](#euclidean_distance) |
| Comparison | [`GREATEST`](#greatest) [`LEAST`](#least) |
| Random number generator | [`RAND`](#rand) |
| Arithmetic and error handling | [`DIV`](#div) [`IEEE_DIVIDE`](#ieee_divide) [`IS_INF`](#is_inf) [`IS_NAN`](#is_nan) [`MOD`](#mod) [`SAFE_ADD`](#safe_add) [`SAFE_DIVIDE`](#safe_divide) [`SAFE_MULTIPLY`](#safe_multiply) [`SAFE_NEGATE`](#safe_negate) [`SAFE_SUBTRACT`](#safe_subtract) |
| Bucket | [`RANGE_BUCKET`](#range_bucket) |

### Function list

| Name | Summary |
|---|---|
| [`ABS`](#abs) | Computes the absolute value of `X`. |
| [`ACOS`](#acos) | Computes the inverse cosine of `X`. |
| [`ACOSH`](#acosh) | Computes the inverse hyperbolic cosine of `X`. |
| [`ASIN`](#asin) | Computes the inverse sine of `X`. |
| [`ASINH`](#asinh) | Computes the inverse hyperbolic sine of `X`. |
| [`ATAN`](#atan) | Computes the inverse tangent of `X`. |
| [`ATAN2`](#atan2) | Computes the inverse tangent of `X/Y`, using the signs of `X` and `Y` to determine the quadrant. |
| [`ATANH`](#atanh) | Computes the inverse hyperbolic tangent of `X`. |
| [`AVG`](aggregate_functions.md#avg) | Gets the average of non-`NULL` values. For more information, see [Aggregate functions](aggregate_functions.md). |
| [`AVG` (Differential Privacy)](aggregate-dp-functions.md#avg-differential_privacy) | `DIFFERENTIAL_PRIVACY`-supported `AVG`. Gets the differentially-private average of non-`NULL`, non-`NaN` values in a query with a `DIFFERENTIAL_PRIVACY` clause. <br /> For more information, see [Differential privacy functions](aggregate-dp-functions.md). |
| [`CBRT`](#cbrt) | Computes the cube root of `X`. |
| [`CEIL`](#ceil) | Gets the smallest integral value that isn't less than `X`. |
| [`CEILING`](#ceiling) | Synonym of `CEIL`. |
| [`COS`](#cos) | Computes the cosine of `X`. |
| [`COSH`](#cosh) | Computes the hyperbolic cosine of `X`. |
| [`COSINE_DISTANCE`](#cosine_distance) | Computes the cosine distance between two vectors. |
| [`COT`](#cot) | Computes the cotangent of `X`. |
| [`COTH`](#coth) | Computes the hyperbolic cotangent of `X`. |
| [`CSC`](#csc) | Computes the cosecant of `X`. |
| [`CSCH`](#csch) | Computes the hyperbolic cosecant of `X`. |
| [`DIV`](#div) | Divides integer `X` by integer `Y`. |
| [`EXP`](#exp) | Computes `e` to the power of `X`. |
| [`EUCLIDEAN_DISTANCE`](#euclidean_distance) | Computes the Euclidean distance between two vectors. |
| [`FLOOR`](#floor) | Gets the largest integral value that isn't greater than `X`. |
| [`GREATEST`](#greatest) | Gets the greatest value among `X1,...,XN`. |
| [`IEEE_DIVIDE`](#ieee_divide) | Divides `X` by `Y`, but doesn't generate errors for division by zero or overflow. |
| [`IS_INF`](#is_inf) | Checks if `X` is positive or negative infinity. |
| [`IS_NAN`](#is_nan) | Checks if `X` is a `NaN` value. |
| [`LEAST`](#least) | Gets the least value among `X1,...,XN`. |
| [`LN`](#ln) | Computes the natural logarithm of `X`. |
| [`LOG`](#log) | Computes the natural logarithm of `X` or the logarithm of `X` to base `Y`. |
| [`LOG10`](#log10) | Computes the logarithm of `X` to base 10. |
| [`MAX`](aggregate_functions.md#max) | Gets the maximum non-`NULL` value. For more information, see [Aggregate functions](aggregate_functions.md). |
| [`MAX_BY`](aggregate_functions.md#max_by) | Synonym for `ANY_VALUE(x HAVING MAX y)`. For more information, see [Aggregate functions](aggregate_functions.md). |
| [`MIN_BY`](aggregate_functions.md#min_by) | Synonym for `ANY_VALUE(x HAVING MIN y)`. For more information, see [Aggregate functions](aggregate_functions.md). |
| [`MOD`](#mod) | Gets the remainder of the division of `X` by `Y`. |
| [`POW`](#pow) | Produces the value of `X` raised to the power of `Y`. |
| [`POWER`](#power) | Synonym of `POW`. |
| [`RAND`](#rand) | Generates a pseudo-random value of type `FLOAT64` in the range of `[0, 1)`. |
| [`RANGE_BUCKET`](#range_bucket) | Scans through a sorted array and returns the 0-based position of a point's upper bound. |
| [`ROUND`](#round) | Rounds `X` to the nearest integer or rounds `X` to `N` decimal places after the decimal point. |
| [`SAFE_ADD`](#safe_add) | Equivalent to the addition operator (`X + Y`), but returns `NULL` if overflow occurs. |
| [`SAFE_DIVIDE`](#safe_divide) | Equivalent to the division operator (`X / Y`), but returns `NULL` if an error occurs. |
| [`SAFE_MULTIPLY`](#safe_multiply) | Equivalent to the multiplication operator (`X * Y`), but returns `NULL` if overflow occurs. |
| [`SAFE_NEGATE`](#safe_negate) | Equivalent to the unary minus operator (`-X`), but returns `NULL` if overflow occurs. |
| [`SAFE_SUBTRACT`](#safe_subtract) | Equivalent to the subtraction operator (`X - Y`), but returns `NULL` if overflow occurs. |
| [`SEC`](#sec) | Computes the secant of `X`. |
| [`SECH`](#sech) | Computes the hyperbolic secant of `X`. |
| [`SIGN`](#sign) | Produces -1 , 0, or +1 for negative, zero, and positive arguments respectively. |
| [`SIN`](#sin) | Computes the sine of `X`. |
| [`SINH`](#sinh) | Computes the hyperbolic sine of `X`. |
| [`SQRT`](#sqrt) | Computes the square root of `X`. |
| [`SUM`](aggregate_functions.md#sum) | Gets the sum of non-`NULL` values. For more information, see [Aggregate functions](aggregate_functions.md). |
| [`SUM` (Differential Privacy)](aggregate-dp-functions.md#sum-differential_privacy) | `DIFFERENTIAL_PRIVACY`-supported `SUM`. Gets the differentially-private sum of non-`NULL`, non-`NaN` values in a query with a `DIFFERENTIAL_PRIVACY` clause. <br /> For more information, see [Differential privacy functions](aggregate-dp-functions.md). |
| [`TAN`](#tan) | Computes the tangent of `X`. |
| [`TANH`](#tanh) | Computes the hyperbolic tangent of `X`. |
| [`TRUNC`](#trunc) | Rounds a number like `ROUND(X)` or `ROUND(X, N)`, but always rounds towards zero and never overflows. |

### `ABS`

```sql
ABS(X)
```

**Description**

Computes absolute value. Returns an error if the argument is an integer and the
output value can't be represented as the same type; this happens only for the
largest negative input value, which has no positive representation.

| X | ABS(X) |
|---|---|
| 25 | 25 |
| -25 | 25 |
| `+inf` | `+inf` |
| `-inf` | `+inf` |

**Return Data Type**

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| OUTPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
|---|---|---|---|---|

### `ACOS`

```sql
ACOS(X)
```

**Description**

Computes the principal value of the inverse cosine of X. The return value is in
the range \[0,π\]. Generates an error if X is a value outside of the
range \[-1, 1\].

| X | ACOS(X) |
|---|---|
| `+inf` | `NaN` |
| `-inf` | `NaN` |
| `NaN` | `NaN` |
| X \< -1 | Error |
| X \> 1 | Error |

### `ACOSH`

```sql
ACOSH(X)
```

**Description**

Computes the inverse hyperbolic cosine of X. Generates an error if X is a value
less than 1.

| X | ACOSH(X) |
|---|---|
| `+inf` | `+inf` |
| `-inf` | `NaN` |
| `NaN` | `NaN` |
| X \< 1 | Error |

### `ASIN`

```sql
ASIN(X)
```

**Description**

Computes the principal value of the inverse sine of X. The return value is in
the range \[-π/2,π/2\]. Generates an error if X is outside of
the range \[-1, 1\].

| X | ASIN(X) |
|---|---|
| `+inf` | `NaN` |
| `-inf` | `NaN` |
| `NaN` | `NaN` |
| X \< -1 | Error |
| X \> 1 | Error |

### `ASINH`

```sql
ASINH(X)
```

**Description**

Computes the inverse hyperbolic sine of X. Doesn't fail.

| X | ASINH(X) |
|---|---|
| `+inf` | `+inf` |
| `-inf` | `-inf` |
| `NaN` | `NaN` |

### `ATAN`

```sql
ATAN(X)
```

**Description**

Computes the principal value of the inverse tangent of X. The return value is
in the range \[-π/2,π/2\]. Doesn't fail.

| X | ATAN(X) |
|---|---|
| `+inf` | π/2 |
| `-inf` | -π/2 |
| `NaN` | `NaN` |

### `ATAN2`

```sql
ATAN2(X, Y)
```

**Description**

Calculates the principal value of the inverse tangent of X/Y using the signs of
the two arguments to determine the quadrant. The return value is in the range
\[-π,π\].

| X | Y | ATAN2(X, Y) |
|---|---|---|
| `NaN` | Any value | `NaN` |
| Any value | `NaN` | `NaN` |
| 0.0 | 0.0 | 0.0 |
| Positive Finite value | `-inf` | π |
| Negative Finite value | `-inf` | -π |
| Finite value | `+inf` | 0.0 |
| `+inf` | Finite value | π/2 |
| `-inf` | Finite value | -π/2 |
| `+inf` | `-inf` | ¾π |
| `-inf` | `-inf` | -¾π |
| `+inf` | `+inf` | π/4 |
| `-inf` | `+inf` | -π/4 |

### `ATANH`

```sql
ATANH(X)
```

**Description**

Computes the inverse hyperbolic tangent of X. Generates an error if X is outside
of the range (-1, 1).

| X | ATANH(X) |
|---|---|
| `+inf` | `NaN` |
| `-inf` | `NaN` |
| `NaN` | `NaN` |
| X \< -1 | Error |
| X \> 1 | Error |

### `CBRT`

```sql
CBRT(X)
```

**Description**

Computes the cube root of `X`. `X` can be any data type
that [coerces to `FLOAT64`](../googlesql-syntax/conversion_rules.md).

| X | CBRT(X) |
|---|---|
| `+inf` | `inf` |
| `-inf` | `-inf` |
| `NaN` | `NaN` |
| `0` | `0` |
| `NULL` | `NULL` |

**Return Data Type**

`FLOAT64`

**Example**

```sql
SELECT CBRT(27) AS cube_root;

/*--------------------+
 | cube_root          |
 +--------------------+
 | 3.0000000000000004 |
 +--------------------*/
```

### `CEIL`

```sql
CEIL(X)
```

**Description**

Returns the smallest integral value that isn't less than X.

| X | CEIL(X) |
|---|---|
| 2.0 | 2.0 |
| 2.3 | 3.0 |
| 2.8 | 3.0 |
| 2.5 | 3.0 |
| -2.3 | -2.0 |
| -2.8 | -2.0 |
| -2.5 | -2.0 |
| 0 | 0 |
| `+inf` | `+inf` |
| `-inf` | `-inf` |
| `NaN` | `NaN` |

**Return Data Type**

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| OUTPUT | `FLOAT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
|---|---|---|---|---|

### `CEILING`

```sql
CEILING(X)
```

**Description**

Synonym of CEIL(X)

### `COS`

```sql
COS(X)
```

**Description**

Computes the cosine of X where X is specified in radians. Never fails.

| X | COS(X) |
|---|---|
| `+inf` | `NaN` |
| `-inf` | `NaN` |
| `NaN` | `NaN` |

### `COSH`

```sql
COSH(X)
```

**Description**

Computes the hyperbolic cosine of X where X is specified in radians.
Generates an error if overflow occurs.

| X | COSH(X) |
|---|---|
| `+inf` | `+inf` |
| `-inf` | `+inf` |
| `NaN` | `NaN` |

### `COSINE_DISTANCE`

```sql
COSINE_DISTANCE(vector1, vector2)
```

**Description**

Computes the [cosine distance](https://en.wikipedia.org/wiki/Cosine_similarity#Cosine_distance) between two vectors.

**Definitions**

- `vector1`: A vector that's represented by an `ARRAY<T>` value or a sparse vector that is represented by an `ARRAY<STRUCT<dimension,magnitude>>` value.
- `vector2`: A vector that's represented by an `ARRAY<T>` value or a sparse vector that is represented by an `ARRAY<STRUCT<dimension,magnitude>>` value.

**Details**

- `ARRAY<T>` can be used to represent a vector. Each zero-based index in this
  array represents a dimension. The value for each element in this array
  represents a magnitude.

  `T` can represent the following and must be the same for both
  vectors:
  - `FLOAT64`

  In the following example vector, there are four dimensions. The magnitude
  is `10.0` for dimension `0`, `55.0` for dimension `1`, `40.0` for
  dimension `2`, and `34.0` for dimension `3`:

```sql
[10.0, 55.0, 40.0, 34.0]
```

- `ARRAY<STRUCT<dimension,magnitude>>` can be used to represent a
  sparse vector. With a sparse vector, you only need to include
  dimension-magnitude pairs for non-zero magnitudes. If a magnitude isn't
  present in the sparse vector, the magnitude is implicitly understood to be
  zero.

  For example, if you have a vector with 10,000 dimensions, but only 10
  dimensions have non-zero magnitudes, then the vector is a sparse vector.
  As a result, it's more efficient to describe a sparse vector by only
  mentioning its non-zero magnitudes.

  In `ARRAY<STRUCT<dimension,magnitude>>`, `STRUCT<dimension,magnitude>`
  represents a dimension-magnitude pair for each non-zero magnitude in a
  sparse vector. These parts need to be included for each dimension-magnitude
  pair:
  - `dimension`: A `STRING` or `INT64` value that represents a
    dimension in a vector.

  - `magnitude`: A `FLOAT64` value that represents a
    non-zero magnitude for a specific dimension in a vector.

  You don't need to include empty dimension-magnitude pairs in a
  sparse vector. For example, the following sparse vector and
  non-sparse vector are equivalent:

```sql
-- sparse vector ARRAY<STRUCT<INT64, FLOAT64>>
[(1, 10.0), (2, 30.0), (5, 40.0)]
```

```sql
-- vector ARRAY<FLOAT64>
[0.0, 10.0, 30.0, 0.0, 0.0, 40.0]
```

  In a sparse vector, dimension-magnitude pairs don't need to be in any
  particular order. The following sparse vectors are equivalent:

```sql
[('a', 10.0), ('b', 30.0), ('d', 40.0)]
```

```sql
[('d', 40.0), ('a', 10.0), ('b', 30.0)]
```

- Both non-sparse vectors
  in this function must share the same dimensions, and if they don't, an error
  is produced.

- A vector can't be a zero vector. A vector is a zero vector if it has
  no dimensions or all dimensions have a magnitude of `0`, such as `[]` or
  `[0.0, 0.0]`. If a zero vector is encountered, an error is produced.

- An error is produced if a magnitude in a vector is `NULL`.

- If a vector is `NULL`, `NULL` is returned.

**Return type**

`FLOAT64`

**Examples**

In the following example, non-sparsevectors
are used to compute the cosine distance:

```sql
SELECT COSINE_DISTANCE([1.0, 2.0], [3.0, 4.0]) AS results;

/*----------+
 | results  |
 +----------+
 | 0.016130 |
 +----------*/
```

In the following example, sparse vectors are used to compute the
cosine distance:

```sql
SELECT COSINE_DISTANCE(
 [(1, 1.0), (2, 2.0)],
 [(2, 4.0), (1, 3.0)]) AS results;

 /*----------+
  | results  |
  +----------+
  | 0.016130 |
  +----------*/
```

The ordering of numeric values in a vector doesn't impact the results
produced by this function. For example these queries produce the same results
even though the numeric values in each vector is in a different order:

```sql
SELECT COSINE_DISTANCE([1.0, 2.0], [3.0, 4.0]) AS results;
```

```sql
SELECT COSINE_DISTANCE([2.0, 1.0], [4.0, 3.0]) AS results;
```

```sql
SELECT COSINE_DISTANCE([(1, 1.0), (2, 2.0)], [(1, 3.0), (2, 4.0)]) AS results;
```

```sql
 /*----------+
  | results  |
  +----------+
  | 0.016130 |
  +----------*/
```

In the following example, the function can't compute cosine distance against
the first vector, which is a zero vector:

```sql
-- ERROR
SELECT COSINE_DISTANCE([0.0, 0.0], [3.0, 4.0]) AS results;
```

```sql
-- ERROR
SELECT COSINE_DISTANCE([(1, 0.0), (2, 0.0)], [(1, 3.0), (2, 4.0)]) AS results;
```

Both non-sparse vectors must have the same
dimensions. If not, an error is produced. In the following example, the
first vector has two dimensions and the second vector has three:

```sql
-- ERROR
SELECT COSINE_DISTANCE([9.0, 7.0], [8.0, 4.0, 5.0]) AS results;
```

If you use sparse vectors and you repeat a dimension, an error is
produced:

```sql
-- ERROR
SELECT COSINE_DISTANCE(
  [(1, 9.0), (2, 7.0), (2, 8.0)], [(1, 8.0), (2, 4.0), (3, 5.0)]) AS results;
```

### `COT`

```sql
COT(X)
```

**Description**

Computes the cotangent for the angle of `X`, where `X` is specified in radians.
`X` can be any data type
that [coerces to `FLOAT64`](../googlesql-syntax/conversion_rules.md).

| X | COT(X) |
|---|---|
| `+inf` | `NaN` |
| `-inf` | `NaN` |
| `NaN` | `NaN` |
| `0` | `Error` |
| `NULL` | `NULL` |

**Return Data Type**

`FLOAT64`

**Example**

```sql
SELECT COT(1) AS a, SAFE.COT(0) AS b;

/*---------------------+------+
 | a                   | b    |
 +---------------------+------+
 | 0.64209261593433065 | NULL |
 +---------------------+------*/
```

### `COTH`

```sql
COTH(X)
```

**Description**

Computes the hyperbolic cotangent for the angle of `X`, where `X` is specified
in radians. `X` can be any data type
that [coerces to `FLOAT64`](../googlesql-syntax/conversion_rules.md).

| X | COTH(X) |
|---|---|
| `+inf` | `1` |
| `-inf` | `-1` |
| `NaN` | `NaN` |
| `0` | `Error` |
| `NULL` | `NULL` |

**Return Data Type**

`FLOAT64`

**Example**

```sql
SELECT COTH(1) AS a, SAFE.COTH(0) AS b;

/*----------------+------+
 | a              | b    |
 +----------------+------+
 | 1.313035285499 | NULL |
 +----------------+------*/
```

### `CSC`

```sql
CSC(X)
```

**Description**

Computes the cosecant of the input angle, which is in radians.
`X` can be any data type
that [coerces to `FLOAT64`](../googlesql-syntax/conversion_rules.md).

| X | CSC(X) |
|---|---|
| `+inf` | `NaN` |
| `-inf` | `NaN` |
| `NaN` | `NaN` |
| `0` | `Error` |
| `NULL` | `NULL` |

**Return Data Type**

`FLOAT64`

**Example**

```sql
SELECT CSC(100) AS a, CSC(-1) AS b, SAFE.CSC(0) AS c;

/*----------------+-----------------+------+
 | a              | b               | c    |
 +----------------+-----------------+------+
 | -1.97485753142 | -1.188395105778 | NULL |
 +----------------+-----------------+------*/
```

### `CSCH`

```sql
CSCH(X)
```

**Description**

Computes the hyperbolic cosecant of the input angle, which is in radians.
`X` can be any data type
that [coerces to `FLOAT64`](../googlesql-syntax/conversion_rules.md).

| X | CSCH(X) |
|---|---|
| `+inf` | `0` |
| `-inf` | `0` |
| `NaN` | `NaN` |
| `0` | `Error` |
| `NULL` | `NULL` |

**Return Data Type**

`FLOAT64`

**Example**

```sql
SELECT CSCH(0.5) AS a, CSCH(-2) AS b, SAFE.CSCH(0) AS c;

/*----------------+----------------+------+
 | a              | b              | c    |
 +----------------+----------------+------+
 | 1.919034751334 | -0.27572056477 | NULL |
 +----------------+----------------+------*/
```

### `DIV`

```sql
DIV(X, Y)
```

**Description**

Returns the result of integer division of X by Y. Division by zero returns
an error. Division by -1 may overflow.

| X | Y | DIV(X, Y) |
|---|---|---|
| 20 | 4 | 5 |
| 12 | -7 | -1 |
| 20 | 3 | 6 |
| 0 | 20 | 0 |
| 20 | 0 | Error |

**Return Data Type**

The return data type is determined by the argument types with the following
table.

<br />

<br />

<br />

<br />

<br />

<br />

<br />

<br />

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` |
| `INT64` | `INT64` | `NUMERIC` | `BIGNUMERIC` |
| `NUMERIC` | `NUMERIC` | `NUMERIC` | `BIGNUMERIC` |
| `BIGNUMERIC` | `BIGNUMERIC` | `BIGNUMERIC` | `BIGNUMERIC` |
|---|---|---|---|

<br />

### `EXP`

```sql
EXP(X)
```

**Description**

Computes *e* to the power of X, also called the natural exponential function. If
the result underflows, this function returns a zero. Generates an error if the
result overflows.

| X | EXP(X) |
|---|---|
| 0.0 | 1.0 |
| `+inf` | `+inf` |
| `-inf` | 0.0 |

**Return Data Type**

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| OUTPUT | `FLOAT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
|---|---|---|---|---|

### `EUCLIDEAN_DISTANCE`

```sql
EUCLIDEAN_DISTANCE(vector1, vector2)
```

**Description**

Computes the [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) between two vectors.

**Definitions**

- `vector1`: A vector that's represented by an `ARRAY<T>` value or a sparse vector that is represented by an `ARRAY<STRUCT<dimension,magnitude>>` value.
- `vector2`: A vector that's represented by an `ARRAY<T>` value or a sparse vector that is represented by an `ARRAY<STRUCT<dimension,magnitude>>` value.

**Details**

- `ARRAY<T>` can be used to represent a vector. Each zero-based index in this
  array represents a dimension. The value for each element in this array
  represents a magnitude.

  `T` can represent the following and must be the same for both
  vectors:
  - `FLOAT64`

  In the following example vector, there are four dimensions. The magnitude
  is `10.0` for dimension `0`, `55.0` for dimension `1`, `40.0` for
  dimension `2`, and `34.0` for dimension `3`:

```sql
[10.0, 55.0, 40.0, 34.0]
```

- `ARRAY<STRUCT<dimension,magnitude>>` can be used to represent a
  sparse vector. With a sparse vector, you only need to include
  dimension-magnitude pairs for non-zero magnitudes. If a magnitude isn't
  present in the sparse vector, the magnitude is implicitly understood to be
  zero.

  For example, if you have a vector with 10,000 dimensions, but only 10
  dimensions have non-zero magnitudes, then the vector is a sparse vector.
  As a result, it's more efficient to describe a sparse vector by only
  mentioning its non-zero magnitudes.

  In `ARRAY<STRUCT<dimension,magnitude>>`, `STRUCT<dimension,magnitude>`
  represents a dimension-magnitude pair for each non-zero magnitude in a
  sparse vector. These parts need to be included for each dimension-magnitude
  pair:
  - `dimension`: A `STRING` or `INT64` value that represents a
    dimension in a vector.

  - `magnitude`: A `FLOAT64` value that represents a
    non-zero magnitude for a specific dimension in a vector.

  You don't need to include empty dimension-magnitude pairs in a
  sparse vector. For example, the following sparse vector and
  non-sparse vector are equivalent:

```sql
-- sparse vector ARRAY<STRUCT<INT64, FLOAT64>>
[(1, 10.0), (2, 30.0), (5, 40.0)]
```

```sql
-- vector ARRAY<FLOAT64>
[0.0, 10.0, 30.0, 0.0, 0.0, 40.0]
```

  In a sparse vector, dimension-magnitude pairs don't need to be in any
  particular order. The following sparse vectors are equivalent:

```sql
[('a', 10.0), ('b', 30.0), ('d', 40.0)]
```

```sql
[('d', 40.0), ('a', 10.0), ('b', 30.0)]
```

- Both non-sparse vectors
  in this function must share the same dimensions, and if they don't, an error
  is produced.

- A vector can be a zero vector. A vector is a zero vector if it has
  no dimensions or all dimensions have a magnitude of `0`, such as `[]` or
  `[0.0, 0.0]`.

- An error is produced if a magnitude in a vector is `NULL`.

- If a vector is `NULL`, `NULL` is returned.

**Return type**

`FLOAT64`

**Examples**

In the following example, non-sparse vectors
are used to compute the Euclidean distance:

```sql
SELECT EUCLIDEAN_DISTANCE([1.0, 2.0], [3.0, 4.0]) AS results;

/*----------+
 | results  |
 +----------+
 | 2.828    |
 +----------*/
```

In the following example, sparse vectors are used to compute the
Euclidean distance:

```sql
SELECT EUCLIDEAN_DISTANCE(
 [(1, 1.0), (2, 2.0)],
 [(2, 4.0), (1, 3.0)]) AS results;

 /*----------+
  | results  |
  +----------+
  | 2.828    |
  +----------*/
```

The ordering of magnitudes in a vector doesn't impact the results
produced by this function. For example these queries produce the same results
even though the magnitudes in each vector is in a different order:

```sql
SELECT EUCLIDEAN_DISTANCE([1.0, 2.0], [3.0, 4.0]);
```

```sql
SELECT EUCLIDEAN_DISTANCE([2.0, 1.0], [4.0, 3.0]);
```

```sql
SELECT EUCLIDEAN_DISTANCE([(1, 1.0), (2, 2.0)], [(1, 3.0), (2, 4.0)]) AS results;
```

```sql
 /*----------+
  | results  |
  +----------+
  | 2.828    |
  +----------*/
```

Both non-sparse vectors must have the same
dimensions. If not, an error is produced. In the following example, the first
vector has two dimensions and the second vector has three:

```sql
-- ERROR
SELECT EUCLIDEAN_DISTANCE([9.0, 7.0], [8.0, 4.0, 5.0]) AS results;
```

If you use sparse vectors and you repeat a dimension, an error is
produced:

```sql
-- ERROR
SELECT EUCLIDEAN_DISTANCE(
  [(1, 9.0), (2, 7.0), (2, 8.0)], [(1, 8.0), (2, 4.0), (3, 5.0)]) AS results;
```

### `FLOOR`

```sql
FLOOR(X)
```

**Description**

Returns the largest integral value that isn't greater than X.

| X | FLOOR(X) |
|---|---|
| 2.0 | 2.0 |
| 2.3 | 2.0 |
| 2.8 | 2.0 |
| 2.5 | 2.0 |
| -2.3 | -3.0 |
| -2.8 | -3.0 |
| -2.5 | -3.0 |
| 0 | 0 |
| `+inf` | `+inf` |
| `-inf` | `-inf` |
| `NaN` | `NaN` |

**Return Data Type**

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| OUTPUT | `FLOAT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
|---|---|---|---|---|

### `GREATEST`

```sql
GREATEST(X1,...,XN)
```

**Description**

Returns the greatest value among `X1,...,XN`. If any argument is `NULL`, returns
`NULL`. Otherwise, in the case of floating-point arguments, if any argument is
`NaN`, returns `NaN`. In all other cases, returns the value among `X1,...,XN`
that has the greatest value according to the ordering used by the `ORDER BY`
clause. The arguments `X1, ..., XN` must be coercible to a common supertype, and
the supertype must support ordering.

| X1,...,XN | GREATEST(X1,...,XN) |
|---|---|
| 3,5,1 | 5 |

This function supports specifying [collation](../googlesql-syntax/collation-concepts.md).

**Return Data Types**

Data type of the input values.

### `IEEE_DIVIDE`

```sql
IEEE_DIVIDE(X, Y)
```

**Description**

Divides X by Y; this function never fails. Returns
`FLOAT64`. Unlike the division operator (/),
this function doesn't generate errors for division by zero or overflow.

| X | Y | IEEE_DIVIDE(X, Y) |
|---|---|---|
| 20.0 | 4.0 | 5.0 |
| 20.0 | 6.0 | 3.3333333333333335 |
| 0.0 | 25.0 | 0.0 |
| 25.0 | 0.0 | `+inf` |
| -25.0 | 0.0 | `-inf` |
| 25.0 | -0.0 | `-inf` |
| 0.0 | 0.0 | `NaN` |
| 0.0 | `NaN` | `NaN` |
| `NaN` | 0.0 | `NaN` |
| `+inf` | `+inf` | `NaN` |
| `-inf` | `-inf` | `NaN` |

### `IS_INF`

```sql
IS_INF(X)
```

**Description**

Returns `TRUE` if the value is positive or negative infinity.

| X | IS_INF(X) |
|---|---|
| `+inf` | `TRUE` |
| `-inf` | `TRUE` |
| 25 | `FALSE` |

### `IS_NAN`

```sql
IS_NAN(X)
```

**Description**

Returns `TRUE` if the value is a `NaN` value.

| X | IS_NAN(X) |
|---|---|
| `NaN` | `TRUE` |
| 25 | `FALSE` |

### `LEAST`

```sql
LEAST(X1,...,XN)
```

**Description**

Returns the least value among `X1,...,XN`. If any argument is `NULL`, returns
`NULL`. Otherwise, in the case of floating-point arguments, if any argument is
`NaN`, returns `NaN`. In all other cases, returns the value among `X1,...,XN`
that has the least value according to the ordering used by the `ORDER BY`
clause. The arguments `X1, ..., XN` must be coercible to a common supertype, and
the supertype must support ordering.

| X1,...,XN | LEAST(X1,...,XN) |
|---|---|
| 3,5,1 | 1 |

This function supports specifying [collation](../googlesql-syntax/collation-concepts.md).

**Return Data Types**

Data type of the input values.

### `LN`

```sql
LN(X)
```

**Description**

Computes the natural logarithm of X. Generates an error if X is less than or
equal to zero.

| X | LN(X) |
|---|---|
| 1.0 | 0.0 |
| `+inf` | `+inf` |
| `X <= 0` | Error |

**Return Data Type**

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| OUTPUT | `FLOAT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
|---|---|---|---|---|

### `LOG`

```sql
LOG(X [, Y])
```

**Description**

If only X is present, `LOG` is a synonym of `LN`. If Y is also present,
`LOG` computes the logarithm of X to base Y.

| X | Y | LOG(X, Y) |
|---|---|---|
| 100.0 | 10.0 | 2.0 |
| `-inf` | Any value | `NaN` |
| Any value | `+inf` | `NaN` |
| `+inf` | 0.0 \< Y \< 1.0 | `-inf` |
| `+inf` | Y \> 1.0 | `+inf` |
| X \<= 0 | Any value | Error |
| Any value | Y \<= 0 | Error |
| Any value | 1.0 | Error |

**Return Data Type**

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `INT64` | `FLOAT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `NUMERIC` | `NUMERIC` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `BIGNUMERIC` | `BIGNUMERIC` | `BIGNUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `FLOAT64` | `FLOAT64` | `FLOAT64` | `FLOAT64` | `FLOAT64` |
|---|---|---|---|---|

### `LOG10`

```sql
LOG10(X)
```

**Description**

Similar to `LOG`, but computes logarithm to base 10.

| X | LOG10(X) |
|---|---|
| 100.0 | 2.0 |
| `-inf` | `NaN` |
| `+inf` | `+inf` |
| X \<= 0 | Error |

**Return Data Type**

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| OUTPUT | `FLOAT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
|---|---|---|---|---|

### `MOD`

```sql
MOD(X, Y)
```

**Description**

Modulo function: returns the remainder of the division of X by Y. Returned
value has the same sign as X. An error is generated if Y is 0.

| X | Y | MOD(X, Y) |
|---|---|---|
| 25 | 12 | 1 |
| 25 | 0 | Error |

**Return Data Type**

The return data type is determined by the argument types with the following
table.

<br />

<br />

<br />

<br />

<br />

<br />

<br />

<br />

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` |
| `INT64` | `INT64` | `NUMERIC` | `BIGNUMERIC` |
| `NUMERIC` | `NUMERIC` | `NUMERIC` | `BIGNUMERIC` |
| `BIGNUMERIC` | `BIGNUMERIC` | `BIGNUMERIC` | `BIGNUMERIC` |
|---|---|---|---|

<br />

### `POW`

```sql
POW(X, Y)
```

**Description**

Returns the value of X raised to the power of Y. If the result underflows and
isn't representable, then the function returns a value of zero.

| X | Y | POW(X, Y) |
|---|---|---|
| 2.0 | 3.0 | 8.0 |
| 1.0 | Any value including `NaN` | 1.0 |
| Any value including `NaN` | 0 | 1.0 |
| -1.0 | `+inf` | 1.0 |
| -1.0 | `-inf` | 1.0 |
| ABS(X) \< 1 | `-inf` | `+inf` |
| ABS(X) \> 1 | `-inf` | 0.0 |
| ABS(X) \< 1 | `+inf` | 0.0 |
| ABS(X) \> 1 | `+inf` | `+inf` |
| `-inf` | Y \< 0 | 0.0 |
| `-inf` | Y \> 0 | `-inf` if Y is an odd integer, `+inf` otherwise |
| `+inf` | Y \< 0 | 0 |
| `+inf` | Y \> 0 | `+inf` |
| Finite value \< 0 | Non-integer | Error |
| 0 | Finite value \< 0 | Error |

**Return Data Type**

The return data type is determined by the argument types with the following
table.

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `INT64` | `FLOAT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `NUMERIC` | `NUMERIC` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `BIGNUMERIC` | `BIGNUMERIC` | `BIGNUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `FLOAT64` | `FLOAT64` | `FLOAT64` | `FLOAT64` | `FLOAT64` |
|---|---|---|---|---|

### `POWER`

```sql
POWER(X, Y)
```

**Description**

Synonym of [`POW(X, Y)`](#pow).

### `RAND`

```sql
RAND()
```

**Description**

Generates a pseudo-random value of type `FLOAT64` in
the range of \[0, 1), inclusive of 0 and exclusive of 1.

### `RANGE_BUCKET`

```sql
RANGE_BUCKET(point, boundaries_array)
```

**Description**

`RANGE_BUCKET` scans through a sorted array and returns the 0-based position
of the point's upper bound. This can be useful if you need to group your data to
build partitions, histograms, business-defined rules, and more.

`RANGE_BUCKET` follows these rules:

- If the point exists in the array, returns the index of the next larger value.

  ```sql
  RANGE_BUCKET(20, [0, 10, 20, 30, 40]) -- 3 is return value
  RANGE_BUCKET(20, [0, 10, 20, 20, 40, 40]) -- 4 is return value
  ```

- If the point doesn't exist in the array, but it falls between two values,
  returns the index of the larger value.

  ```sql
  RANGE_BUCKET(25, [0, 10, 20, 30, 40]) -- 3 is return value
  ```

- If the point is smaller than the first value in the array, returns 0.

  ```sql
  RANGE_BUCKET(-10, [5, 10, 20, 30, 40]) -- 0 is return value
  ```

- If the point is greater than or equal to the last value in the array,
  returns the length of the array.

  ```sql
  RANGE_BUCKET(80, [0, 10, 20, 30, 40]) -- 5 is return value
  ```

- If the array is empty, returns 0.

  ```sql
  RANGE_BUCKET(80, []) -- 0 is return value
  ```

- If the point is `NULL` or `NaN`, returns `NULL`.

  ```sql
  RANGE_BUCKET(NULL, [0, 10, 20, 30, 40]) -- NULL is return value
  ```

- The data type for the point and array must be compatible.

  ```sql
  RANGE_BUCKET('a', ['a', 'b', 'c', 'd']) -- 1 is return value
  RANGE_BUCKET(1.2, [1, 1.2, 1.4, 1.6]) -- 2 is return value
  RANGE_BUCKET(1.2, [1, 2, 4, 6]) -- execution failure
  ```

Execution failure occurs when:

- The array has a `NaN` or `NULL` value in it.

  ```sql
  RANGE_BUCKET(80, [NULL, 10, 20, 30, 40]) -- execution failure
  ```

- The array isn't sorted in ascending order.

  ```sql
  RANGE_BUCKET(30, [10, 30, 20, 40, 50]) -- execution failure
  ```

**Parameters**

- `point`: A generic value.
- `boundaries_array`: A generic array of values.

> [!NOTE]
> **Note:** The data type for `point` and the element type of `boundaries_array` must be equivalent. The data type must be [comparable](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#data_type_properties).

**Return Value**

`INT64`

**Examples**

In a table called `students`, check to see how many records would
exist in each `age_group` bucket, based on a student's age:

- age_group 0 (age \< 10)
- age_group 1 (age \>= 10, age \< 20)
- age_group 2 (age \>= 20, age \< 30)
- age_group 3 (age \>= 30)

  ```sql
  WITH students AS
  (
    SELECT 9 AS age UNION ALL
    SELECT 20 AS age UNION ALL
    SELECT 25 AS age UNION ALL
    SELECT 31 AS age UNION ALL
    SELECT 32 AS age UNION ALL
    SELECT 33 AS age
  )
  SELECT RANGE_BUCKET(age, [10, 20, 30]) AS age_group, COUNT(*) AS count
  FROM students
  GROUP BY 1

  /*--------------+-------+
   | age_group    | count |
   +--------------+-------+
   | 0            | 1     |
   | 2            | 2     |
   | 3            | 3     |
   +--------------+-------*/
  ```

### `ROUND`

```sql
ROUND(X [, N [, rounding_mode]])
```

**Description**

If only X is present, rounds X to the nearest integer. If N is present,
rounds X to N decimal places after the decimal point. If N is negative,
rounds off digits to the left of the decimal point. Rounds halfway cases
away from zero. Generates an error if overflow occurs.

If X is a `NUMERIC` or `BIGNUMERIC` type, then you can
explicitly set `rounding_mode`
to one of the following:

- [`"ROUND_HALF_AWAY_FROM_ZERO"`](https://en.wikipedia.org/wiki/Rounding#Rounding_half_away_from_zero): (Default) Rounds halfway cases away from zero.
- [`"ROUND_HALF_EVEN"`](https://en.wikipedia.org/wiki/Rounding#Rounding_half_to_even): Rounds halfway cases towards the nearest even digit.

If you set the `rounding_mode` and X isn't a `NUMERIC` or `BIGNUMERIC` type,
then the function generates an error.

| Expression | Return Value |
|---|---|
| `ROUND(2.0)` | 2.0 |
| `ROUND(2.3)` | 2.0 |
| `ROUND(2.8)` | 3.0 |
| `ROUND(2.5)` | 3.0 |
| `ROUND(-2.3)` | -2.0 |
| `ROUND(-2.8)` | -3.0 |
| `ROUND(-2.5)` | -3.0 |
| `ROUND(0)` | 0 |
| `ROUND(+inf)` | `+inf` |
| `ROUND(-inf)` | `-inf` |
| `ROUND(NaN)` | `NaN` |
| `ROUND(123.7, -1)` | 120.0 |
| `ROUND(1.235, 2)` | 1.24 |
| `ROUND(NUMERIC "2.25", 1, "ROUND_HALF_EVEN")` | 2.2 |
| `ROUND(NUMERIC "2.35", 1, "ROUND_HALF_EVEN")` | 2.4 |
| `ROUND(NUMERIC "2.251", 1, "ROUND_HALF_EVEN")` | 2.3 |
| `ROUND(NUMERIC "-2.5", 0, "ROUND_HALF_EVEN")` | -2 |
| `ROUND(NUMERIC "2.5", 0, "ROUND_HALF_AWAY_FROM_ZERO")` | 3 |
| `ROUND(NUMERIC "-2.5", 0, "ROUND_HALF_AWAY_FROM_ZERO")` | -3 |

**Return Data Type**

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| OUTPUT | `FLOAT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
|---|---|---|---|---|

### `SAFE_ADD`

```sql
SAFE_ADD(X, Y)
```

**Description**

Equivalent to the addition operator (`+`), but returns
`NULL` if overflow occurs.

| X | Y | SAFE_ADD(X, Y) |
|---|---|---|
| 5 | 4 | 9 |

**Return Data Type**

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `INT64` | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `NUMERIC` | `NUMERIC` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `BIGNUMERIC` | `BIGNUMERIC` | `BIGNUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `FLOAT64` | `FLOAT64` | `FLOAT64` | `FLOAT64` | `FLOAT64` |
|---|---|---|---|---|

### `SAFE_DIVIDE`

```sql
SAFE_DIVIDE(X, Y)
```

**Description**

Equivalent to the division operator (`X / Y`), but returns
`NULL` if an error occurs, such as a division by zero error.

| X | Y | SAFE_DIVIDE(X, Y) |
|---|---|---|
| 20 | 4 | 5 |
| 0 | 20 | `0` |
| 20 | 0 | `NULL` |

**Return Data Type**

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `INT64` | `FLOAT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `NUMERIC` | `NUMERIC` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `BIGNUMERIC` | `BIGNUMERIC` | `BIGNUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `FLOAT64` | `FLOAT64` | `FLOAT64` | `FLOAT64` | `FLOAT64` |
|---|---|---|---|---|

### `SAFE_MULTIPLY`

```sql
SAFE_MULTIPLY(X, Y)
```

**Description**

Equivalent to the multiplication operator (`*`), but returns
`NULL` if overflow occurs.

| X | Y | SAFE_MULTIPLY(X, Y) |
|---|---|---|
| 20 | 4 | 80 |

**Return Data Type**

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `INT64` | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `NUMERIC` | `NUMERIC` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `BIGNUMERIC` | `BIGNUMERIC` | `BIGNUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `FLOAT64` | `FLOAT64` | `FLOAT64` | `FLOAT64` | `FLOAT64` |
|---|---|---|---|---|

### `SAFE_NEGATE`

```sql
SAFE_NEGATE(X)
```

**Description**

Equivalent to the unary minus operator (`-`), but returns
`NULL` if overflow occurs.

| X | SAFE_NEGATE(X) |
|---|---|
| +1 | -1 |
| -1 | +1 |
| 0 | 0 |

**Return Data Type**

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| OUTPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
|---|---|---|---|---|

### `SAFE_SUBTRACT`

```sql
SAFE_SUBTRACT(X, Y)
```

**Description**

Returns the result of Y subtracted from X.
Equivalent to the subtraction operator (`-`), but returns
`NULL` if overflow occurs.

| X | Y | SAFE_SUBTRACT(X, Y) |
|---|---|---|
| 5 | 4 | 1 |

**Return Data Type**

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `INT64` | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `NUMERIC` | `NUMERIC` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `BIGNUMERIC` | `BIGNUMERIC` | `BIGNUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `FLOAT64` | `FLOAT64` | `FLOAT64` | `FLOAT64` | `FLOAT64` |
|---|---|---|---|---|

### `SEC`

```sql
SEC(X)
```

**Description**

Computes the secant for the angle of `X`, where `X` is specified in radians.
`X` can be any data type
that [coerces to `FLOAT64`](../googlesql-syntax/conversion_rules.md).

| X | SEC(X) |
|---|---|
| `+inf` | `NaN` |
| `-inf` | `NaN` |
| `NaN` | `NaN` |
| `NULL` | `NULL` |

**Return Data Type**

`FLOAT64`

**Example**

```sql
SELECT SEC(100) AS a, SEC(-1) AS b;

/*----------------+---------------+
 | a              | b             |
 +----------------+---------------+
 | 1.159663822905 | 1.85081571768 |
 +----------------+---------------*/
```

### `SECH`

```sql
SECH(X)
```

**Description**

Computes the hyperbolic secant for the angle of `X`, where `X` is specified
in radians. `X` can be any data type
that [coerces to `FLOAT64`](../googlesql-syntax/conversion_rules.md).
Never produces an error.

| X | SECH(X) |
|---|---|
| `+inf` | `0` |
| `-inf` | `0` |
| `NaN` | `NaN` |
| `NULL` | `NULL` |

**Return Data Type**

`FLOAT64`

**Example**

```sql
SELECT SECH(0.5) AS a, SECH(-2) AS b, SECH(100) AS c;

/*----------------+----------------+---------------------+
 | a              | b              | c                   |
 +----------------+----------------+---------------------+
 | 0.88681888397  | 0.265802228834 | 7.4401519520417E-44 |
 +----------------+----------------+---------------------*/
```

### `SIGN`

```sql
SIGN(X)
```

**Description**

Returns `-1`, `0`, or `+1` for negative, zero and positive arguments
respectively. For floating point arguments, this function doesn't distinguish
between positive and negative zero.

| X | SIGN(X) |
|---|---|
| 25 | +1 |
| 0 | 0 |
| -25 | -1 |
| NaN | NaN |

**Return Data Type**

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| OUTPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
|---|---|---|---|---|

### `SIN`

```sql
SIN(X)
```

**Description**

Computes the sine of X where X is specified in radians. Never fails.

| X | SIN(X) |
|---|---|
| `+inf` | `NaN` |
| `-inf` | `NaN` |
| `NaN` | `NaN` |

### `SINH`

```sql
SINH(X)
```

**Description**

Computes the hyperbolic sine of X where X is specified in radians. Generates
an error if overflow occurs.

| X | SINH(X) |
|---|---|
| `+inf` | `+inf` |
| `-inf` | `-inf` |
| `NaN` | `NaN` |

### `SQRT`

```sql
SQRT(X)
```

**Description**

Computes the square root of X. Generates an error if X is less than 0.

| X | SQRT(X) |
|---|---|
| `25.0` | `5.0` |
| `+inf` | `+inf` |
| `X < 0` | Error |

**Return Data Type**

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| OUTPUT | `FLOAT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
|---|---|---|---|---|

### `TAN`

```sql
TAN(X)
```

**Description**

Computes the tangent of X where X is specified in radians. Generates an error if
overflow occurs.

| X | TAN(X) |
|---|---|
| `+inf` | `NaN` |
| `-inf` | `NaN` |
| `NaN` | `NaN` |

### `TANH`

```sql
TANH(X)
```

**Description**

Computes the hyperbolic tangent of X where X is specified in radians. Doesn't
fail.

| X | TANH(X) |
|---|---|
| `+inf` | 1.0 |
| `-inf` | -1.0 |
| `NaN` | `NaN` |

### `TRUNC`

```sql
TRUNC(X [, N])
```

**Description**

If only X is present, `TRUNC` rounds X to the nearest integer whose absolute
value isn't greater than the absolute value of X. If N is also present, `TRUNC`
behaves like `ROUND(X, N)`, but always rounds towards zero and never overflows.

| X | TRUNC(X) |
|---|---|
| 2.0 | 2.0 |
| 2.3 | 2.0 |
| 2.8 | 2.0 |
| 2.5 | 2.0 |
| -2.3 | -2.0 |
| -2.8 | -2.0 |
| -2.5 | -2.0 |
| 0 | 0 |
| `+inf` | `+inf` |
| `-inf` | `-inf` |
| `NaN` | `NaN` |

**Return Data Type**

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| OUTPUT | `FLOAT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
|---|---|---|---|---|

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: The function list calls `LOG10` the "natural logarithm of `X` to base 10", which contradicts itself and the `LOG10` description ("computes logarithm to base 10"). The word "natural" is removed.

## Related

- [Index of this directory](./README.md)

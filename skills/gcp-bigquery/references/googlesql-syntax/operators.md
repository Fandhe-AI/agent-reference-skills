---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/operators
---

# Operators

## Signature / Usage

GoogleSQL for BigQuery supports operators.
Operators are represented by special characters or keywords; they don't use
function call syntax. An operator manipulates any number of data inputs, also
called operands, and returns a result.

Common conventions:

- Unless otherwise specified, all operators return `NULL` when one of the operands is `NULL`.
- All operators will throw an error if the computation result overflows.
- For all floating point operations, `+/-inf` and `NaN` may only be returned if one of the operands is `+/-inf` or `NaN`. In other cases, an error is returned.

#### Operator precedence

The following table lists all GoogleSQL operators from highest to
lowest precedence, i.e., the order in which they will be evaluated within a
statement.

| Order of Precedence | Operator | Input Data Types | Name | Operator Arity |
|---|---|---|---|---|
| 1 | Field access operator | `STRUCT` `JSON` | Field access operator | Binary |
|   | Array subscript operator | `ARRAY` | Array position. Must be used with `OFFSET` or `ORDINAL`---see [Array Functions](../googlesql-functions/array_functions.md) . | Binary |
|   | JSON subscript operator | `JSON` | Field name or array position in JSON. | Binary |
| 2 | `+` | All numeric types | Unary plus | Unary |
|   | `-` | All numeric types | Unary minus | Unary |
|   | `~` | Integer or `BYTES` | Bitwise not | Unary |
| 3 | `*` | All numeric types | Multiplication | Binary |
|   | `/` | All numeric types | Division | Binary |
|   | `||` | `STRING`, `BYTES`, or `ARRAY<T>` | Concatenation operator | Binary |
| 4 | `+` | All numeric types, `DATE` with `INT64` , `INTERVAL` | Addition | Binary |
|   | `-` | All numeric types, `DATE` with `INT64` , `INTERVAL` | Subtraction | Binary |
| 5 | `<<` | Integer or `BYTES` | Bitwise left-shift | Binary |
|   | `>>` | Integer or `BYTES` | Bitwise right-shift | Binary |
| 6 | `&` | Integer or `BYTES` | Bitwise and | Binary |
| 7 | `^` | Integer or `BYTES` | Bitwise xor | Binary |
| 8 | `|` | Integer or `BYTES` | Bitwise or | Binary |
| 9 (Comparison Operators) | `=` | Any comparable type. See [Data Types](data-types.md) for a complete list. | Equal | Binary |
|   | `<` | Any comparable type. See [Data Types](data-types.md) for a complete list. | Less than | Binary |
|   | `>` | Any comparable type. See [Data Types](data-types.md) for a complete list. | Greater than | Binary |
|   | `<=` | Any comparable type. See [Data Types](data-types.md) for a complete list. | Less than or equal to | Binary |
|   | `>=` | Any comparable type. See [Data Types](data-types.md) for a complete list. | Greater than or equal to | Binary |
|   | `!=`, `<>` | Any comparable type. See [Data Types](data-types.md) for a complete list. | Not equal | Binary |
|   | `[NOT] LIKE` | `STRING` and `BYTES` | Value does \[not\] match the pattern specified | Binary |
|   | Quantified LIKE | `STRING` and `BYTES` | Checks a search value for matches against several patterns. | Binary |
|   | `[NOT] BETWEEN` | Any comparable types. See [Data Types](data-types.md) for a complete list. | Value is \[not\] within the range specified | Binary |
|   | `[NOT] IN` | Any comparable types. See [Data Types](data-types.md) for a complete list. | Value is \[not\] in the set of values specified | Binary |
|   | `IS [NOT] DISTINCT FROM` | All | Value is \[not\] `DISTINCT FROM` | Binary |
|   | `IS [NOT] NULL` | All | Value is \[not\] `NULL` | Unary |
|   | `IS [NOT] TRUE` | `BOOL` | Value is \[not\] `TRUE`. | Unary |
|   | `IS [NOT] FALSE` | `BOOL` | Value is \[not\] `FALSE`. | Unary |
| 10 | `NOT` | `BOOL` | Logical `NOT` | Unary |
| 11 | `AND` | `BOOL` | Logical `AND` | Binary |
| 12 | `OR` | `BOOL` | Logical `OR` | Binary |

For example, the logical expression:

`x OR y AND z`

is interpreted as:

`( x OR ( y AND z ) )`

Operators with the same precedence are left associative. This means that those
operators are grouped together starting from the left and moving right. For
example, the expression:

`x AND y AND z`

is interpreted as:

`( ( x AND y ) AND z )`

The expression:

`x * y / z`

is interpreted as:

`( ( x * y ) / z )`

All comparison operators have the same priority, but comparison operators
aren't associative. Therefore, parentheses are required to resolve
ambiguity. For example:

`(x < y) IS FALSE`

#### Operator list

| Name | Summary |
|---|---|
| [Field access operator](#field-access-operator) | Gets the value of a field. |
| [Array subscript operator](#array-subscript-operator) | Gets a value from an array at a specific position. |
| [Struct subscript operator](#struct-subscript-operator) | Gets the value of a field at a selected position in a struct. |
| [JSON subscript operator](#json-subscript-operator) | Gets a value of an array element or field in a JSON expression. |
| [Arithmetic operators](#arithmetic-operators) | Performs arithmetic operations. |
| [Date arithmetics operators](#date-arithmetics-operators) | Performs arithmetic operations on dates. |
| [Datetime subtraction](#datetime-subtraction) | Computes the difference between two datetimes as an interval. |
| [Interval arithmetic operators](#interval-arithmetic-operators) | Adds an interval to a datetime or subtracts an interval from a datetime. |
| [Bitwise operators](#bitwise-operators) | Performs bit manipulation. |
| [Logical operators](#logical-operators) | Tests for the truth of some condition and produces `TRUE`, `FALSE`, or `NULL`. |
| [Graph logical operators](#graph-logical-operators) | Tests for the truth of a condition in a graph label and produces either `TRUE` or `FALSE`. |
| [Graph predicates](#graph-predicates) | Tests for the truth of a condition for a graph element and produces `TRUE`, `FALSE`, or `NULL`. |
| [`ALL_DIFFERENT` predicate](#all_different-predicate) | In a graph, checks to see if the elements in a list are all different. |
| [`IS DESTINATION` predicate](#is-destination-predicate) | In a graph, checks to see if a node is or isn't the destination of an edge. |
| [`IS SOURCE` predicate](#is-source-predicate) | In a graph, checks to see if a node is or isn't the source of an edge. |
| [`SAME` predicate](#same-predicate) | In a graph, checks if all graph elements in a list bind to the same node or edge. |
| [Comparison operators](#comparison-operators) | Compares operands and produces the results of the comparison as a `BOOL` value. |
| [`EXISTS` operator](#exists-operator) | Checks if a subquery produces one or more rows. |
| [`IN` operator](#in-operator) | Checks for an equal value in a set of values. |
| [`IS` operators](#is-operators) | Checks for the truth of a condition and produces either `TRUE` or `FALSE`. |
| [`IS DISTINCT FROM` operator](#is-distinct-from-operator) | Checks if values are considered to be distinct from each other. |
| [`LIKE` operator](#like-operator) | Checks if values are like or not like one another. |
| [Quantified `LIKE` operator](#quantified-like-operator) | Checks a search value for matches against several patterns. |
| [Concatenation operator](#concatenation-operator) | Combines multiple values into one. |
| [`WITH` expression](#with-expression) | Creates variables for re-use and produces a result expression. |

#### Field access operator

```sql
expression.fieldname[. ...]
```

**Description**

Gets the value of a field. Alternatively known as the dot operator. Can be
used to access nested fields. For example, `expression.fieldname1.fieldname2`.

Input values:

- `STRUCT`
- `JSON`
- `GRAPH_ELEMENT`

> [!NOTE]
> **Note:** If the field to access is within a `STRUCT`, you can use the [struct subscript operator](#struct-subscript-operator) to access the field by its position within the `STRUCT` instead of by its name. Accessing by a field by position is useful when fields are un-named or have ambiguous names.

**Return type**

- For `STRUCT`: SQL data type of `fieldname`. If a field isn't found in the struct, an error is thrown.
- For `JSON`: `JSON`. If a field isn't found in a JSON value, a SQL `NULL` is returned.
- For `GRAPH_ELEMENT`: SQL data type of `fieldname`. If a field (property) isn't found in the graph element, an error is returned.

**Example**

In the following example, the field access operations are `.address` and
`.country`.

```sql
SELECT
  STRUCT(
    STRUCT('Yonge Street' AS street, 'Canada' AS country)
      AS address).address.country

/*---------+
 | country |
 +---------+
 | Canada  |
 +---------*/
```

#### Array subscript operator

> [!NOTE]
> **Note:** Syntax characters enclosed in double quotes (`""`) are literal and required.

```sql
array_expression "[" array_subscript_specifier "]"

array_subscript_specifier:
  { index | position_keyword(index) }

position_keyword:
  { OFFSET | SAFE_OFFSET | ORDINAL | SAFE_ORDINAL }
```

**Description**

Gets a value from an array at a specific position.

Input values:

- `array_expression`: The input array.
- `position_keyword(index)`: Determines where the index for the array should start and how out-of-range indexes are handled. The index is an integer that represents a specific position in the array.
  - `OFFSET(index)`: The index starts at zero. Produces an error if the index is out of range. To produce `NULL` instead of an error, use `SAFE_OFFSET(index)`. This position keyword produces the same result as `index` by itself.
  - `SAFE_OFFSET(index)`: The index starts at zero. Returns `NULL` if the index is out of range.
  - `ORDINAL(index)`: The index starts at one. Produces an error if the index is out of range. To produce `NULL` instead of an error, use `SAFE_ORDINAL(index)`.
  - `SAFE_ORDINAL(index)`: The index starts at one. Returns `NULL` if the index is out of range.
- `index`: An integer that represents a specific position in the array. If used by itself without a position keyword, the index starts at zero and produces an error if the index is out of range. To produce `NULL` instead of an error, use the `SAFE_OFFSET(index)` or `SAFE_ORDINAL(index)` position keyword.

> [!TIP]
> **Tip:** To access the first or last element in an array, use the [`ARRAY_FIRST`](../googlesql-functions/array_functions.md#array_first) or [`ARRAY_LAST`](../googlesql-functions/array_functions.md#array_last) function.

**Return type**

`T` where `array_expression` is `ARRAY<T>`.

**Examples**

In following query, the array subscript operator is used to return values at
specific position in `item_array`. This query also shows what happens when you
reference an index (`6`) in an array that's out of range. If the `SAFE` prefix
is included, `NULL` is returned, otherwise an error is produced.

```sql
SELECT
  ["coffee", "tea", "milk"] AS item_array,
  ["coffee", "tea", "milk"][0] AS item_index,
  ["coffee", "tea", "milk"][OFFSET(0)] AS item_offset,
  ["coffee", "tea", "milk"][ORDINAL(1)] AS item_ordinal,
  ["coffee", "tea", "milk"][SAFE_OFFSET(6)] AS item_safe_offset

/*---------------------+------------+-------------+--------------+------------------+
 | item_array          | item_index | item_offset | item_ordinal | item_safe_offset |
 +---------------------+------------+-------------+--------------+------------------+
 | [coffee, tea, milk] | coffee     | coffee      | coffee       | NULL             |
 +----------------------------------+-------------+--------------+------------------*/
```

When you reference an index that's out of range in an array, and a positional
keyword that begins with `SAFE` isn't included, an error is produced.
For example:

```sql
-- Error. Array index 6 is out of bounds.
SELECT ["coffee", "tea", "milk"][6] AS item_offset
```

```sql
-- Error. Array index 6 is out of bounds.
SELECT ["coffee", "tea", "milk"][OFFSET(6)] AS item_offset
```

#### Struct subscript operator

> [!NOTE]
> **Note:** Syntax characters enclosed in double quotes (`""`) are literal and required.

```sql
struct_expression "[" struct_subscript_specifier "]"

struct_subscript_specifier:
  { index | position_keyword(index) }

position_keyword:
  { OFFSET | ORDINAL }
```

**Description**

Gets the value of a field at a selected position in a struct.

**Input types**

- `struct_expression`: The input struct.
- `position_keyword(index)`: Determines where the index for the struct should start and how out-of-range indexes are handled. The index is an integer literal or constant that represents a specific position in the struct.
  - `OFFSET(index)`: The index starts at zero. Produces an error if the index is out of range. Produces the same result as `index` by itself.
  - `ORDINAL(index)`: The index starts at one. Produces an error if the index is out of range.
- `index`: An integer literal or constant that represents a specific position in the struct. If used by itself without a position keyword, the index starts at zero and produces an error if the index is out of range.

> [!NOTE]
> **Note:** The struct subscript operator doesn't support `SAFE` positional keywords at this time.

**Examples**

In following query, the struct subscript operator is used to return values at
specific locations in `item_struct` using position keywords. This query also
shows what happens when you reference an index (`6`) in an struct that's out of
range.

```sql
SELECT
  STRUCT<INT64, STRING, BOOL>(23, "tea", FALSE)[0] AS field_index,
  STRUCT<INT64, STRING, BOOL>(23, "tea", FALSE)[OFFSET(0)] AS field_offset,
  STRUCT<INT64, STRING, BOOL>(23, "tea", FALSE)[ORDINAL(1)] AS field_ordinal

/*-------------+--------------+---------------+
 | field_index | field_offset | field_ordinal |
 +-------------+--------------+---------------+
 | 23          | 23           | 23            |
 +-------------+--------------+---------------*/
```

When you reference an index that's out of range in a struct, an error is
produced. For example:

```sql
-- Error: Field ordinal 6 is out of bounds in STRUCT
SELECT STRUCT<INT64, STRING, BOOL>(23, "tea", FALSE)[6] AS field_offset
```

```sql
-- Error: Field ordinal 6 is out of bounds in STRUCT
SELECT STRUCT<INT64, STRING, BOOL>(23, "tea", FALSE)[OFFSET(6)] AS field_offset
```

#### JSON subscript operator

> [!NOTE]
> **Note:** Syntax characters enclosed in double quotes (`""`) are literal and required.

```sql
json_expression "[" array_element_id "]"
```

```sql
json_expression "[" field_name "]"
```

**Description**

Gets a value of an array element or field in a JSON expression. Can be
used to access nested data.

Input values:

- `JSON expression`: The `JSON` expression that contains an array element or field to return.
- `[array_element_id]`: An `INT64` expression that represents a zero-based index in the array. If a negative value is entered, or the value is greater than or equal to the size of the array, or the JSON expression doesn't represent a JSON array, a SQL `NULL` is returned.
- `[field_name]`: A `STRING` expression that represents the name of a field in JSON. If the field name isn't found, or the JSON expression isn't a JSON object, a SQL `NULL` is returned.

**Return type**

`JSON`

**Example**

In the following example:

- `json_value` is a JSON expression.
- `.class` is a JSON field access.
- `.students` is a JSON field access.
- `[0]` is a JSON subscript expression with an element offset that accesses the zeroth element of an array in the JSON value.
- `['name']` is a JSON subscript expression with a field name that accesses a field.

  ```sql
  SELECT json_value.class.students[0]['name'] AS first_student
  FROM
    UNNEST(
      [
        JSON '{"class" : {"students" : [{"name" : "Jane"}]}}',
        JSON '{"class" : {"students" : []}}',
        JSON '{"class" : {"students" : [{"name" : "John"}, {"name": "Jamie"}]}}'])
      AS json_value;

  /*-----------------+
   | first_student   |
   +-----------------+
   | "Jane"          |
   | NULL            |
   | "John"          |
   +-----------------*/
  ```

#### Arithmetic operators

All arithmetic operators accept input of numeric type `T`, and the result type
has type `T` unless otherwise indicated in the description below:

| Name | Syntax |
|---|---|
| Addition | `X + Y` |
| Subtraction | `X - Y` |
| Multiplication | `X * Y` |
| Division | `X / Y` |
| Unary Plus | `+ X` |
| Unary Minus | `- X` |

> [!NOTE]
> **Note:** Divide by zero operations return an error. To return a different result, consider the `IEEE_DIVIDE` or `SAFE_DIVIDE` functions.

Result types for Addition, Subtraction and Multiplication:

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `INT64` | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `NUMERIC` | `NUMERIC` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `BIGNUMERIC` | `BIGNUMERIC` | `BIGNUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `FLOAT64` | `FLOAT64` | `FLOAT64` | `FLOAT64` | `FLOAT64` |
|---|---|---|---|---|

Result types for Division:

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `INT64` | `FLOAT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `NUMERIC` | `NUMERIC` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `BIGNUMERIC` | `BIGNUMERIC` | `BIGNUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| `FLOAT64` | `FLOAT64` | `FLOAT64` | `FLOAT64` | `FLOAT64` |
|---|---|---|---|---|

Result types for Unary Plus:

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| OUTPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
|---|---|---|---|---|

Result types for Unary Minus:

| INPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
| OUTPUT | `INT64` | `NUMERIC` | `BIGNUMERIC` | `FLOAT64` |
|---|---|---|---|---|

#### Date arithmetics operators

Operators '+' and '-' can be used for arithmetic operations on dates.

```sql
date_expression + int64_expression
int64_expression + date_expression
date_expression - int64_expression
```

**Description**

Adds or subtracts `int64_expression` days to or from `date_expression`. This is
equivalent to `DATE_ADD` or `DATE_SUB` functions, when interval is expressed in
days.

**Return Data Type**

`DATE`

**Example**

```sql
SELECT DATE "2020-09-22" + 1 AS day_later, DATE "2020-09-22" - 7 AS week_ago

/*------------+------------+
 | day_later  | week_ago   |
 +------------+------------+
 | 2020-09-23 | 2020-09-15 |
 +------------+------------*/
```

#### Datetime subtraction

```sql
date_expression - date_expression
timestamp_expression - timestamp_expression
datetime_expression - datetime_expression
```

**Description**

Computes the difference between two datetime values as an interval.

**Return Data Type**

`INTERVAL`

**Example**

```sql
SELECT
  DATE "2021-05-20" - DATE "2020-04-19" AS date_diff,
  TIMESTAMP "2021-06-01 12:34:56.789" - TIMESTAMP "2021-05-31 00:00:00" AS time_diff

/*-------------------+------------------------+
 | date_diff         | time_diff              |
 +-------------------+------------------------+
 | 0-0 396 0:0:0     | 0-0 0 36:34:56.789     |
 +-------------------+------------------------*/
```

#### Interval arithmetic operators

**Addition and subtraction**

```sql
date_expression + interval_expression = DATETIME
date_expression - interval_expression = DATETIME
timestamp_expression + interval_expression = TIMESTAMP
timestamp_expression - interval_expression = TIMESTAMP
datetime_expression + interval_expression = DATETIME
datetime_expression - interval_expression = DATETIME
```

**Description**

Adds an interval to a datetime value or subtracts an interval from a datetime
value.

**Example**

```sql
SELECT
  DATE "2021-04-20" + INTERVAL 25 HOUR AS date_plus,
  TIMESTAMP "2021-05-02 00:01:02.345+00" - INTERVAL 10 SECOND AS time_minus;

/*-------------------------+--------------------------------+
 | date_plus               | time_minus                     |
 +-------------------------+--------------------------------+
 | 2021-04-21 01:00:00     | 2021-05-02 00:00:52.345+00     |
 +-------------------------+--------------------------------*/
```

**Multiplication and division**

```sql
interval_expression * integer_expression = INTERVAL
interval_expression / integer_expression = INTERVAL
```

**Description**

Multiplies or divides an interval value by an integer.

**Example**

```sql
SELECT
  INTERVAL '1:2:3' HOUR TO SECOND * 10 AS mul1,
  INTERVAL 35 SECOND * 4 AS mul2,
  INTERVAL 10 YEAR / 3 AS div1,
  INTERVAL 1 MONTH / 12 AS div2

/*----------------+--------------+-------------+--------------+
 | mul1           | mul2         | div1        | div2         |
 +----------------+--------------+-------------+--------------+
 | 0-0 0 10:20:30 | 0-0 0 0:2:20 | 3-4 0 0:0:0 | 0-0 2 12:0:0 |
 +----------------+--------------+-------------+--------------*/
```

#### Bitwise operators

All bitwise operators return the same type
and the same length as
the first operand.

| Name | Syntax | Input Data Type | Description |
|---|---|---|---|
| Bitwise not | `~ X` | Integer or `BYTES` | Performs logical negation on each bit, forming the ones' complement of the given binary value. |
| Bitwise or | `X | Y` | `X`: Integer or `BYTES` `Y`: Same type as `X` | Takes two bit patterns of equal length and performs the logical inclusive `OR` operation on each pair of the corresponding bits. This operator throws an error if `X` and `Y` are bytes of different lengths. |
| Bitwise xor | `X ^ Y` | `X`: Integer or `BYTES` `Y`: Same type as `X` | Takes two bit patterns of equal length and performs the logical exclusive `OR` operation on each pair of the corresponding bits. This operator throws an error if `X` and `Y` are bytes of different lengths. |
| Bitwise and | `X & Y` | `X`: Integer or `BYTES` `Y`: Same type as `X` | Takes two bit patterns of equal length and performs the logical `AND` operation on each pair of the corresponding bits. This operator throws an error if `X` and `Y` are bytes of different lengths. |
| Left shift | `X << Y` | `X`: Integer or `BYTES` `Y`: `INT64` | Shifts the first operand `X` to the left. This operator returns `0` or a byte sequence of `b'\x00'` if the second operand `Y` is greater than or equal to the bit length of the first operand `X` (for example, `64` if `X` has the type `INT64`). This operator throws an error if `Y` is negative. |
| Right shift | `X >> Y` | `X`: Integer or `BYTES` `Y`: `INT64` | Shifts the first operand `X` to the right. This operator doesn't perform sign bit extension with a signed type (i.e., it fills vacant bits on the left with `0`). This operator returns `0` or a byte sequence of `b'\x00'` if the second operand `Y` is greater than or equal to the bit length of the first operand `X` (for example, `64` if `X` has the type `INT64`). This operator throws an error if `Y` is negative. |

#### Logical operators

GoogleSQL supports the `AND`, `OR`, and `NOT` logical operators.
Logical operators allow only `BOOL` or `NULL` input
and use [three-valued logic](https://en.wikipedia.org/wiki/Three-valued_logic)
to produce a result. The result can be `TRUE`, `FALSE`, or `NULL`:

| `x` | `y` | `x AND y` | `x OR y` |
|---|---|---|---|
| `TRUE` | `TRUE` | `TRUE` | `TRUE` |
| `TRUE` | `FALSE` | `FALSE` | `TRUE` |
| `TRUE` | `NULL` | `NULL` | `TRUE` |
| `FALSE` | `TRUE` | `FALSE` | `TRUE` |
| `FALSE` | `FALSE` | `FALSE` | `FALSE` |
| `FALSE` | `NULL` | `FALSE` | `NULL` |
| `NULL` | `TRUE` | `NULL` | `TRUE` |
| `NULL` | `FALSE` | `FALSE` | `NULL` |
| `NULL` | `NULL` | `NULL` | `NULL` |

| `x` | `NOT x` |
|---|---|
| `TRUE` | `FALSE` |
| `FALSE` | `TRUE` |
| `NULL` | `NULL` |

The order of evaluation of operands to `AND` and `OR` can vary, and evaluation
can be skipped if unnecessary.

**Examples**

The examples in this section reference a table called `entry_table`:

```sql
/*-------+
 | entry |
 +-------+
 | a     |
 | b     |
 | c     |
 | NULL  |
 +-------*/
```

Adapted (not in the official docs): changed the selected expression from `'a'` to the column `entry`.

```sql
SELECT entry FROM entry_table WHERE entry = 'a'

-- a => 'a' = 'a' => TRUE
-- b => 'b' = 'a' => FALSE
-- NULL => NULL = 'a' => NULL

/*-------+
 | entry |
 +-------+
 | a     |
 +-------*/
```

```sql
SELECT entry FROM entry_table WHERE NOT (entry = 'a')

-- a => NOT('a' = 'a') => NOT(TRUE) => FALSE
-- b => NOT('b' = 'a') => NOT(FALSE) => TRUE
-- NULL => NOT(NULL = 'a') => NOT(NULL) => NULL

/*-------+
 | entry |
 +-------+
 | b     |
 | c     |
 +-------*/
```

```sql
SELECT entry FROM entry_table WHERE entry IS NULL

-- a => 'a' IS NULL => FALSE
-- b => 'b' IS NULL => FALSE
-- NULL => NULL IS NULL => TRUE

/*-------+
 | entry |
 +-------+
 | NULL  |
 +-------*/
```

#### Graph logical operators

GoogleSQL supports the following logical operators in
[element pattern label expressions](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-patterns#element_pattern_definition):

| Name | Syntax | Description |
|---|---|---|
| `NOT` | `!X` | Returns `TRUE` if `X` isn't included, otherwise, returns `FALSE`. |
| `OR` | `X | Y` | Returns `TRUE` if either `X` or `Y` is included, otherwise, returns `FALSE`. |
| `AND` | `X & Y` | Returns `TRUE` if both `X` and `Y` are included, otherwise, returns `FALSE`. |

#### Graph predicates

GoogleSQL supports the following graph-specific predicates in
graph expressions. A predicate can produce `TRUE`, `FALSE`, or `NULL`.

- [`ALL_DIFFERENT` predicate](#all_different-predicate)
- [`IS SOURCE` predicate](#is-source-predicate)
- [`IS DESTINATION` predicate](#is-destination-predicate)
- [`SAME` predicate](#same-predicate)

#### `ALL_DIFFERENT` predicate

```sql
ALL_DIFFERENT(element, element[, ...])
```

**Description**

In a graph, checks to see if the elements in a list are all different.
Returns `TRUE` if none of the elements in the list equal one another,
otherwise `FALSE`.

**Definitions**

- `element`: The graph pattern variable for a node or edge element.

**Details**

Produces an error if `element` is `NULL`.

**Return type**

`BOOL`

**Examples**

```sql
GRAPH graph_db.FinGraph
MATCH
  (a1:Account)-[t1:Transfers]->(a2:Account)-[t2:Transfers]->
  (a3:Account)-[t3:Transfers]->(a4:Account)
WHERE a1.id < a4.id
RETURN
  ALL_DIFFERENT(t1, t2, t3) AS results

/*---------+
 | results |
 +---------+
 | FALSE   |
 | TRUE    |
 | TRUE    |
 +---------*/
```

#### `IS DESTINATION` predicate

```sql
node IS [ NOT ] DESTINATION [ OF ] edge
```

**Description**

In a graph, checks to see if a node is or isn't the destination of an edge.
Can produce `TRUE`, `FALSE`, or `NULL`.

Arguments:

- `node`: The graph pattern variable for the node element.
- `edge`: The graph pattern variable for the edge element.

**Examples**

```sql
GRAPH graph_db.FinGraph
MATCH (a:Account)-[transfer:Transfers]-(b:Account)
WHERE a IS DESTINATION of transfer
RETURN a.id AS a_id, b.id AS b_id

/*-------------+
 | a_id | b_id |
 +-------------+
 | 16   | 7    |
 | 16   | 7    |
 | 20   | 16   |
 | 7    | 20   |
 | 16   | 20   |
 +-------------*/
```

```sql
GRAPH graph_db.FinGraph
MATCH (a:Account)-[transfer:Transfers]-(b:Account)
WHERE b IS DESTINATION of transfer
RETURN a.id AS a_id, b.id AS b_id

/*-------------+
 | a_id | b_id |
 +-------------+
 | 7    | 16   |
 | 7    | 16   |
 | 16   | 20   |
 | 20   | 7    |
 | 20   | 16   |
 +-------------*/
```

#### `IS SOURCE` predicate

```sql
node IS [ NOT ] SOURCE [ OF ] edge
```

**Description**

In a graph, checks to see if a node is or isn't the source of an edge.
Can produce `TRUE`, `FALSE`, or `NULL`.

Arguments:

- `node`: The graph pattern variable for the node element.
- `edge`: The graph pattern variable for the edge element.

**Examples**

```sql
GRAPH graph_db.FinGraph
MATCH (a:Account)-[transfer:Transfers]-(b:Account)
WHERE a IS SOURCE of transfer
RETURN a.id AS a_id, b.id AS b_id

/*-------------+
 | a_id | b_id |
 +-------------+
 | 20   | 7    |
 | 7    | 16   |
 | 7    | 16   |
 | 20   | 16   |
 | 16   | 20   |
 +-------------*/
```

```sql
GRAPH graph_db.FinGraph
MATCH (a:Account)-[transfer:Transfers]-(b:Account)
WHERE b IS SOURCE of transfer
RETURN a.id AS a_id, b.id AS b_id

/*-------------+
 | a_id | b_id |
 +-------------+
 | 7    | 20   |
 | 16   | 7    |
 | 16   | 7    |
 | 16   | 20   |
 | 20   | 16   |
 +-------------*/
```

#### `SAME` predicate

```sql
SAME (element, element[, ...])
```

**Description**

In a graph, checks if all graph elements in a list bind to the same node or
edge. Returns `TRUE` if the elements bind to the same node or edge, otherwise
`FALSE`.

Arguments:

- `element`: The graph pattern variable for a node or edge element.

**Details**

Produces an error if `element` is `NULL`.

**Example**

The following query returns the source and destination IDs for transfers
between different accounts:

```sql
GRAPH graph_db.FinGraph
MATCH (src:Account)<-[transfer:Transfers]-(dest:Account)
WHERE NOT SAME(src, dest)
RETURN src.id AS source_id, dest.id AS destination_id

/*----------------------------+
 | source_id | destination_id |
 +----------------------------+
 | 7         | 20             |
 | 16        | 7              |
 | 16        | 7              |
 | 16        | 20             |
 | 20        | 16             |
 +----------------------------*/
```

#### Comparison operators

Compares operands and produces the results of the comparison as a `BOOL`
value. These comparison operators are available:

| Name | Syntax | Description |
|---|---|---|
| Less Than | `X < Y` | Returns `TRUE` if `X` is less than `Y`. This operator supports specifying [collation](collation-concepts.md). |
| Less Than or Equal To | `X <= Y` | Returns `TRUE` if `X` is less than or equal to `Y`. This operator supports specifying [collation](collation-concepts.md). |
| Greater Than | `X > Y` | Returns `TRUE` if `X` is greater than `Y`. This operator supports specifying [collation](collation-concepts.md). |
| Greater Than or Equal To | `X >= Y` | Returns `TRUE` if `X` is greater than or equal to `Y`. This operator supports specifying [collation](collation-concepts.md). |
| Equal | `X = Y` | Returns `TRUE` if `X` is equal to `Y`. This operator supports specifying [collation](collation-concepts.md). |
| Not Equal | `X != Y` `X <> Y` | Returns `TRUE` if `X` isn't equal to `Y`. This operator supports specifying [collation](collation-concepts.md). |
| `BETWEEN` | `X [NOT] BETWEEN Y AND Z` | Returns `TRUE` if `X` is \[not\] within the range specified. The result of `X BETWEEN Y AND Z` is equivalent to `Y <= X AND X <= Z` but `X` is evaluated only once in the former. This operator supports specifying [collation](collation-concepts.md). |
| `LIKE` | `X [NOT] LIKE Y` | See the [`LIKE` operator](#like-operator) for details. |
| `IN` | Multiple | See the [`IN` operator](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/operators#in_operator) for details. |
| `IS DISTINCT FROM` | `x IS [NOT] DISTINCT FROM y` | See the [`IS DISTINCT FROM` operator](#is-distinct-from-operator) for details. |

The following rules apply to operands in a comparison operator:

- The operands must be [comparable](data-types.md#comparable-data-types).
- A comparison operator generally requires both operands to be of the same type.
- If the operands are of different types, and the values of those types can be converted to a common type without loss of precision, they are generally coerced to that common type for the comparison.
- A literal operand is generally coerced to the same data type of a non-literal operand that's part of the comparison.
- Struct operands support only these comparison operators: equal (`=`), not equal (`!=` and `<>`), and `IN`.

The following rules apply when comparing these data types:

- `FLOAT64`: All comparisons with `NaN` return `FALSE`, except for `!=` and `<>`, which return `TRUE`.
- `BOOL`: `FALSE` is less than `TRUE`.
- `STRING`: Strings are compared codepoint-by-codepoint, which means that canonically equivalent strings are only guaranteed to compare as equal if they have been normalized first.
- `JSON`: You can't compare JSON, but you can compare the values inside of JSON if you convert the values to SQL values first. For more information, see [`JSON` functions](../googlesql-functions/json_functions-1.md).
- `NULL`: Any operation with a `NULL` input returns `NULL`.
- `STRUCT`: When testing a struct for equality, it's possible that one or more
  fields are `NULL`. In such cases:

  - If all non-`NULL` field values are equal, the comparison returns `NULL`.
  - If any non-`NULL` field values aren't equal, the comparison returns `FALSE`.

  The following table demonstrates how `STRUCT` data types are compared when
  they have fields that are `NULL` valued.

  | Struct1 | Struct2 | Struct1 = Struct2 |
  |---|---|---|
  | `STRUCT(1, NULL)` | `STRUCT(1, NULL)` | `NULL` |
  | `STRUCT(1, NULL)` | `STRUCT(2, NULL)` | `FALSE` |
  | `STRUCT(1,2)` | `STRUCT(1, NULL)` | `NULL` |

#### `EXISTS` operator

```sql
EXISTS( subquery )
```

**Description**

Returns `TRUE` if the subquery produces one or more rows. Returns `FALSE` if
the subquery produces zero rows. Never returns `NULL`. To learn more about
how you can use a subquery with `EXISTS`,
see [`EXISTS` subqueries](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/subqueries#exists_subquery_concepts).

**Examples**

In this example, the `EXISTS` operator returns `FALSE` because there are no
rows in `Words` where the direction is `south`:

```sql
WITH Words AS (
  SELECT 'Intend' as value, 'east' as direction UNION ALL
  SELECT 'Secure', 'north' UNION ALL
  SELECT 'Clarity', 'west'
 )
SELECT EXISTS( SELECT value FROM Words WHERE direction = 'south' ) as result;

/*--------+
 | result |
 +--------+
 | FALSE  |
 +--------*/
```

#### `IN` operator

The `IN` operator supports the following syntax:

```sql
search_value [NOT] IN value_set

value_set:
  {
    (expression[, ...])
    | (subquery)
    | UNNEST(array_expression)
  }
```

**Description**

Checks for an equal value in a set of values.
[Semantic rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/operators#semantic_rules_in) apply, but in general, `IN` returns `TRUE`
if an equal value is found, `FALSE` if an equal value is excluded, otherwise
`NULL`. `NOT IN` returns `FALSE` if an equal value is found, `TRUE` if an
equal value is excluded, otherwise `NULL`.

- `search_value`: The expression that's compared to a set of values.
- `value_set`: One or more values to compare to a search value.

  - `(expression[, ...])`: A list of expressions.
  - `(subquery)`: A [subquery](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/subqueries#about_subqueries) that returns a single column. The values in that column are the set of values. If no rows are produced, the set of values is empty.
  - `UNNEST(array_expression)`: An [UNNEST operator](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#unnest_operator)
    that returns a column of values from an array expression. This is
    equivalent to:

    ```sql
    IN (SELECT element FROM UNNEST(array_expression) AS element)
    ```

This operator supports [collation](collation-concepts.md#functions-operators-and-conditional-expressions), but these limitations apply:

- `[NOT] IN UNNEST` doesn't support collation.
- If collation is used with a list of expressions, there must be at least one item in the list.

**Semantic rules**

When using the `IN` operator, the following semantics apply in this order:

- Returns `FALSE` if `value_set` is empty.
- Returns `TRUE` if `value_set` contains a value equal to `search_value`.
- Returns `NULL` if the equality comparison between `search_value` and any value in `value_set` produces `NULL`.
- Returns `FALSE`.

When using the `NOT IN` operator, the following semantics apply in this order:

- Returns `TRUE` if `value_set` is empty.
- Returns `FALSE` if `value_set` contains a value equal to `search_value`.
- Returns `NULL` if the equality comparison between `search_value` and any value in `value_set` produces `NULL`.
- Returns `TRUE`.

For example:

- `1 IN UNNEST([NULL, 1])` returns `TRUE`
- `1 IN UNNEST([2, 3])` returns `FALSE`
- `1 [NOT] IN UNNEST([NULL])` returns `NULL`
- `(NULL, 1) [NOT] IN UNNEST([(NULL, 1)])` returns `NULL`
- `(NULL, 2) IN UNNEST([(NULL, 1)])` returns `FALSE`
- `(NULL, 2) NOT IN UNNEST([(NULL, 1)])` returns `TRUE`

The semantics of:

```sql
x IN (y, z, ...)
```

are defined as equivalent to:

```sql
(x = y) OR (x = z) OR ...
```

and the subquery and array forms are defined similarly.

```sql
x NOT IN ...
```

is equivalent to:

```sql
NOT(x IN ...)
```

The `UNNEST` form treats an array scan like `UNNEST` in the
[`FROM`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#from_clause) clause:

```sql
x [NOT] IN UNNEST(<array expression>)
```

This form is often used with array parameters. For example:

```sql
x IN UNNEST(@array_parameter)
```

See the [Arrays](https://docs.cloud.google.com/bigquery/docs/arrays#filtering_arrays) topic for more information
on how to use this syntax.

`IN` can be used with multi-part keys by using the struct constructor syntax.
For example:

```sql
(Key1, Key2) IN ( (12,34), (56,78) )
(Key1, Key2) IN ( SELECT (table.a, table.b) FROM table )
```

See the [Struct Type](data-types.md#struct-type) topic for more information.

**Return Data Type**

`BOOL`

**Examples**

You can use these `WITH` clauses to emulate temporary tables for
`Words` and `Items` in the following examples:

```sql
WITH Words AS (
  SELECT 'Intend' as value UNION ALL
  SELECT 'Secure' UNION ALL
  SELECT 'Clarity' UNION ALL
  SELECT 'Peace' UNION ALL
  SELECT 'Intend'
 )
SELECT * FROM Words;

/*----------+
 | value    |
 +----------+
 | Intend   |
 | Secure   |
 | Clarity  |
 | Peace    |
 | Intend   |
 +----------*/
```

```sql
WITH
  Items AS (
    SELECT STRUCT('blue' AS color, 'round' AS shape) AS info UNION ALL
    SELECT STRUCT('blue', 'square') UNION ALL
    SELECT STRUCT('red', 'round')
  )
SELECT * FROM Items;

/*----------------------------+
 | info                       |
 +----------------------------+
 | {blue color, round shape}  |
 | {blue color, square shape} |
 | {red color, round shape}   |
 +----------------------------*/
```

Example with `IN` and an expression:

```sql
SELECT * FROM Words WHERE value IN ('Intend', 'Secure');

/*----------+
 | value    |
 +----------+
 | Intend   |
 | Secure   |
 | Intend   |
 +----------*/
```

Example with `NOT IN` and an expression:

```sql
SELECT * FROM Words WHERE value NOT IN ('Intend');

/*----------+
 | value    |
 +----------+
 | Secure   |
 | Clarity  |
 | Peace    |
 +----------*/
```

Example with `IN`, a scalar subquery, and an expression:

```sql
SELECT * FROM Words WHERE value IN ((SELECT 'Intend'), 'Clarity');

/*----------+
 | value    |
 +----------+
 | Intend   |
 | Clarity  |
 | Intend   |
 +----------*/
```

Example with `IN` and an `UNNEST` operation:

```sql
SELECT * FROM Words WHERE value IN UNNEST(['Secure', 'Clarity']);

/*----------+
 | value    |
 +----------+
 | Secure   |
 | Clarity  |
 +----------*/
```

Example with `IN` and a struct:

```sql
SELECT
  Items.info as item
FROM
  Items
WHERE (info.shape, info.color) IN (('round', 'blue'));

/*------------------------------------+
 | item                               |
 +------------------------------------+
 | { {blue color, round shape} info } |
 +------------------------------------*/
```

#### `IS` operators

IS operators return TRUE or FALSE for the condition they are testing. They never
return `NULL`, even for `NULL` inputs, unlike the `IS_INF` and `IS_NAN`
functions defined in [Mathematical Functions](../googlesql-functions/mathematical_functions.md).
If `NOT` is present, the output `BOOL` value is
inverted.

| Function Syntax | Input Data Type | Result Data Type | Description |
|---|---|---|---|
| `X IS TRUE` | `BOOL` | `BOOL` | Evaluates to `TRUE` if `X` evaluates to `TRUE`. Otherwise, evaluates to `FALSE`. |
| `X IS NOT TRUE` | `BOOL` | `BOOL` | Evaluates to `FALSE` if `X` evaluates to `TRUE`. Otherwise, evaluates to `TRUE`. |
| `X IS FALSE` | `BOOL` | `BOOL` | Evaluates to `TRUE` if `X` evaluates to `FALSE`. Otherwise, evaluates to `FALSE`. |
| `X IS NOT FALSE` | `BOOL` | `BOOL` | Evaluates to `FALSE` if `X` evaluates to `FALSE`. Otherwise, evaluates to `TRUE`. |
| `X IS NULL` | Any value type | `BOOL` | Evaluates to `TRUE` if `X` evaluates to `NULL`. Otherwise evaluates to `FALSE`. |
| `X IS NOT NULL` | Any value type | `BOOL` | Evaluates to `FALSE` if `X` evaluates to `NULL`. Otherwise evaluates to `TRUE`. |
| `X IS UNKNOWN` | `BOOL` | `BOOL` | Evaluates to `TRUE` if `X` evaluates to `NULL`. Otherwise evaluates to `FALSE`. |
| `X IS NOT UNKNOWN` | `BOOL` | `BOOL` | Evaluates to `FALSE` if `X` evaluates to `NULL`. Otherwise, evaluates to `TRUE`. |

#### `IS DISTINCT FROM` operator

```sql
expression_1 IS [NOT] DISTINCT FROM expression_2
```

**Description**

`IS DISTINCT FROM` returns `TRUE` if the input values are considered to be
distinct from each other by the
[`GROUP BY`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#group_by_clause) clause. Otherwise, returns `FALSE`.

`a IS DISTINCT FROM b` being `TRUE` is equivalent to:

- `SELECT * FROM UNNEST([a,b]) x GROUP BY x` returning 2 rows.

`a IS DISTINCT FROM b` is equivalent to `NOT (a = b)`, except for the
following cases:

- This operator never returns `NULL` so `NULL` values are considered to be distinct from non-`NULL` values, not other `NULL` values.
- `NaN` values are considered to be distinct from non-`NaN` values, but not other `NaN` values.

You can use this operation with fields in a complex data type, but not on
the complex data types themselves. These complex data types can't be compared
directly:

- `STRUCT`
- `ARRAY`
- `GRAPH_ELEMENT`
- `GRAPH_PATH`

Input values:

- `expression_1`: The first value to compare. This can be a groupable data type, `NULL` or `NaN`.
- `expression_2`: The second value to compare. This can be a groupable data type, `NULL` or `NaN`.
- `NOT`: If present, the output `BOOL` value is inverted.

**Return type**

`BOOL`

**Examples**

These return `TRUE`:

```sql
SELECT 1 IS DISTINCT FROM 2
```

```sql
SELECT 1 IS DISTINCT FROM NULL
```

```sql
SELECT 1 IS NOT DISTINCT FROM 1
```

```sql
SELECT NULL IS NOT DISTINCT FROM NULL
```

These return `FALSE`:

```sql
SELECT NULL IS DISTINCT FROM NULL
```

```sql
SELECT 1 IS DISTINCT FROM 1
```

```sql
SELECT 1 IS NOT DISTINCT FROM 2
```

```sql
SELECT 1 IS NOT DISTINCT FROM NULL
```

#### `LIKE` operator

```sql
expression [NOT] LIKE pattern
```

**Description**

`LIKE` returns `TRUE` if the string in the first operand `expression`
matches a pattern specified by the second operand `pattern`,
otherwise returns `FALSE`.

`NOT LIKE` returns `TRUE` if the string in the first operand `expression`
doesn't match a pattern specified by the second operand `pattern`,
otherwise returns `FALSE`.

Expressions can contain these characters:

- A percent sign (`%`) matches any number of characters or bytes.
- An underscore (`_`) matches a single character or byte.
- You can escape `\`, `_`, or `%` using two backslashes. For example, `\\%`. If you are using raw strings, only a single backslash is required. For example, `r'\%'`.

This operator supports [collation](collation-concepts.md#functions-operators-and-conditional-expressions), but caveats apply:

- Each `%` character in `pattern` represents an *arbitrary string specifier* . An arbitrary string specifier can represent any sequence of `0` or more characters.
- A character in the expression represents itself and is considered a
  *single character specifier* unless:

  - The character is a percent sign (`%`).

  - The character is an underscore (`_`) and the collator isn't `und:ci`.

- These additional rules apply to the underscore (`_`) character:

  - If the collator isn't `und:ci`, an error is produced when an underscore
    isn't escaped in `pattern`.

  - If the collator isn't `und:ci`, the underscore isn't allowed when the
    operands have collation specified.

  - Some *compatibility composites* , such as the fi-ligature (`ﬁ`) and the
    telephone sign (`℡`), will produce a match if they are compared to an
    underscore.

  - A single underscore matches the idea of what a character is, based on
    an approximation known as a [*grapheme cluster*](https://www.unicode.org/reports/tr29/#Grapheme_Cluster_Boundaries).

- For a contiguous sequence of single character specifiers, equality
  depends on the collator and its language tags and tailoring.

  - By default, the `und:ci` collator doesn't fully normalize a string.
    Some canonically equivalent strings are considered unequal for
    both the `=` and `LIKE` operators.

  - The `LIKE` operator with collation has the same behavior as the `=`
    operator when there are no wildcards in the strings.

  - Character sequences with secondary or higher-weighted differences are
    considered unequal. This includes accent differences and some
    special cases.

    For example there are three ways to produce German sharp `ß`:
    - `\u1E9E`
    - `\U00DF`
    - `ss`

    `\u1E9E` and `\U00DF` are considered equal but differ in tertiary.
    They are considered equal with `und:ci` collation but different from
    `ss`, which has secondary differences.
  - Character sequences with tertiary or lower-weighted differences are
    considered equal. This includes case differences and
    kana subtype differences, which are considered equal.

- There are [ignorable characters](https://www.unicode.org/charts/collation/chart_Ignored.html) defined in Unicode.
  Ignorable characters are ignored in the pattern matching.

**Return type**

`BOOL`

**Examples**

The following examples illustrate how you can check to see if the string in the
first operand matches a pattern specified by the second operand.

```sql
-- Returns TRUE
SELECT 'apple' LIKE 'a%';
```

```sql
-- Returns FALSE
SELECT '%a' LIKE 'apple';
```

```sql
-- Returns FALSE
SELECT 'apple' NOT LIKE 'a%';
```

```sql
-- Returns TRUE
SELECT '%a' NOT LIKE 'apple';
```

```sql
-- Produces an error
SELECT NULL LIKE 'a%';
```

```sql
-- Produces an error
SELECT 'apple' LIKE NULL;
```

The following example illustrates how to search multiple patterns in an array
to find a match with the `LIKE` operator:

```sql
WITH Words AS
 (SELECT 'Intend with clarity.' as value UNION ALL
  SELECT 'Secure with intention.' UNION ALL
  SELECT 'Clarity and security.')
SELECT value
FROM Words WHERE
  EXISTS(
    SELECT value FROM UNNEST(['%ity%', '%and%']) AS pattern
    WHERE value LIKE pattern
  );

/*------------------------+
 | value                  |
 +------------------------+
 | Intend with clarity.   |
 | Clarity and security.  |
 +------------------------*/
```

The following examples illustrate how collation can be used with the `LIKE`
operator.

```sql
-- Returns FALSE
'Foo' LIKE '%foo%'
```

```sql
-- Returns TRUE
COLLATE('Foo', 'und:ci') LIKE COLLATE('%foo%', 'und:ci');
```

```sql
-- Returns TRUE
COLLATE('Foo', 'und:ci') = COLLATE('foo', 'und:ci');
```

```sql
-- Produces an error
COLLATE('Foo', 'und:ci') LIKE COLLATE('%foo%', 'binary');
```

```sql
-- Produces an error
COLLATE('Foo', 'und:ci') LIKE COLLATE('%f_o%', 'und:ci');
```

```sql
-- Returns TRUE
COLLATE('Foo_', 'und:ci') LIKE COLLATE('%foo\\_%', 'und:ci');
```

There are two capital forms of `ß`. We can use either `SS` or `ẞ` as upper
case. While the difference between `ß` and `ẞ` is case difference (tertiary
difference), the difference between sharp `s` and `ss` is secondary and
considered not equal using the `und:ci` collator. For example:

```sql
-- Returns FALSE
'MASSE' LIKE 'Maße';
```

```sql
-- Returns FALSE
COLLATE('MASSE', 'und:ci') LIKE '%Maße%';
```

```sql
-- Returns FALSE
COLLATE('MASSE', 'und:ci') = COLLATE('Maße', 'und:ci');
```

The kana differences in Japanese are considered as tertiary or quaternary
differences, and should be considered as equal in the `und:ci` collator with
secondary strength.

- `'\u3042'` is `'あ'` (hiragana)
- `'\u30A2'` is `'ア'` (katakana)

For example:

```sql
-- Returns FALSE
'\u3042' LIKE '%\u30A2%';
```

```sql
-- Returns TRUE
COLLATE('\u3042', 'und:ci') LIKE COLLATE('%\u30A2%', 'und:ci');
```

```sql
-- Returns TRUE
COLLATE('\u3042', 'und:ci') = COLLATE('\u30A2', 'und:ci');
```

When comparing two strings, the `und:ci` collator compares the collation units
based on the specification of the collation. Even though the number of
code points is different, the two strings are considered equal when the
collation units are considered the same.

- `'\u0041\u030A'` is `'Å'` (two code points)
- `'\u0061\u030A'` is `'å'` (two code points)
- `'\u00C5'` is `'Å'` (one code point)

In the following examples, the difference between `'\u0061\u030A'` and
`'\u00C5'` is tertiary.

```sql
-- Returns FALSE
'\u0061\u030A' LIKE '%\u00C5%';
```

```sql
-- Returns TRUE
COLLATE('\u0061\u030A', 'und:ci') LIKE '%\u00C5%';
```

```sql
-- Returns TRUE
COLLATE('\u0061\u030A', 'und:ci') = COLLATE('\u00C5', 'und:ci');
```

In the following example, `'\u0083'` is a `NO BREAK HERE` character and
is ignored.

```sql
-- Returns FALSE
'\u0083' LIKE '';
```

```sql
-- Returns TRUE
COLLATE('\u0083', 'und:ci') LIKE '';
```

#### Quantified `LIKE` operator

The quantified `LIKE` operator supports the following syntax:

Adapted (not in the official docs): added the missing `|` separator between the two `patterns` alternatives.

```sql
search_value [NOT] LIKE quantifier patterns

quantifier:
 { ANY | SOME | ALL }

patterns:
  {
    (expression[, ...])
    | UNNEST(array_expression)
  }
```

**Description**

Checks `search_value` for matches against several patterns. Each comparison is
case-sensitive. Wildcard searches are supported.
[Semantic rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/operators#semantic_rules_quant_like) apply, but in general, `LIKE`
returns `TRUE` if a matching pattern is found, `FALSE` if a matching pattern
isn't found, or otherwise `NULL`. `NOT LIKE` returns `FALSE` if a
matching pattern is found, `TRUE` if a matching pattern isn't found, or
otherwise `NULL`.

- `search_value`: The value to search for matching patterns. This value can be a `STRING` or `BYTES` type.
- `patterns`: The patterns to look for in the search value. Each pattern must
  resolve to the same type as `search_value`. Each pattern is one of the
  following:

  - A list of one or more patterns that match the `search_value` type.

  - An
    [`UNNEST`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#unnest_operator) operation that returns a column of values
    with the same type as `search_value` from an array expression.

  The regular expressions that are supported by the
  [`LIKE` operator](#like-operator) are also supported by `patterns` in the
  [quantified `LIKE` operator](#quantified-like-operator).
- `quantifier`: Condition for pattern matching.

  - `ANY`: Checks if the set of patterns contains at least one pattern that
    matches the search value.

  - `SOME`: Synonym for `ANY`.

  - `ALL`: Checks if every pattern in the set of patterns matches the
    search value.

**Collation caveats**

[Collation](collation-concepts.md#functions-operators-and-conditional-expressions) is supported, but with the following caveats:

- The collation caveats that apply to the [`LIKE` operator](#like-operator) also apply to the quantified `LIKE` operator.
- If a collation-supported input contains no collation specification or an empty collation specification and another input contains an explicitly defined collation, the explicitly defined collation is used for all of the inputs.
- All inputs with a non-empty, explicitly defined collation specification must have the same type of collation specification, otherwise an error is thrown.

**Semantics rules**

When using the quantified `LIKE` operator with `ANY` or `SOME`, the
following semantics apply in this order:

1. Returns `FALSE` if `patterns` is empty.
2. Returns `NULL` if `search_value` is `NULL`.
3. Returns `TRUE` `search_value LIKE pattern` is `TRUE` for at least one value in `patterns`.
4. Returns `NULL` if a pattern in `patterns` is `NULL`.
5. Returns `FALSE`.

When using the quantified `LIKE` operator with `ALL`, the following semantics
apply in this order:

1. Returns `TRUE` if `patterns` is empty.
2. Returns `NULL` if `search_value` is `NULL`.
3. Returns `FALSE` if `search_value LIKE pattern` is `FALSE` for at least one value in `patterns`.
4. Returns `NULL` if a pattern in `patterns` is `NULL`.
5. Returns `TRUE`.

When using the quantified `NOT LIKE` operator with `ANY` or `SOME`, the
following semantics apply in this order:

1. Returns `FALSE` if `patterns` is empty.
2. Returns `NULL` if `search_value` is `NULL`.
3. Returns `TRUE` if `search_value LIKE pattern` is `FALSE` for at least one value in `patterns`.
4. Returns `NULL` if a pattern in `patterns` is `NULL`.
5. Returns `FALSE`.

When using the quantified `NOT LIKE` operator with `ALL`, the following
semantics apply in this order:

1. Returns `TRUE` if `patterns` is empty.
2. For `pattern_array`, returns `TRUE` if `patterns` is empty.
3. Returns `NULL` if `search_value` is `NULL`.
4. Returns `FALSE` if `search_value LIKE pattern` is `TRUE` for at least one value in `patterns`.
5. Returns `NULL` if a pattern in `patterns` is `NULL`.
6. Returns `TRUE`.

**Return Data Type**

`BOOL`

**Examples**

You can use these `WITH` clauses to emulate temporary tables for
`Words` in the following examples:

```sql
WITH Words AS
 (SELECT 'Intend with clarity.' as value UNION ALL
  SELECT 'Secure with intention.' UNION ALL
  SELECT 'Clarity and security.')

/*------------------------+
 | value                  |
 +------------------------+
 | Intend with clarity.   |
 | Secure with intention. |
 | Clarity and security.  |
 +------------------------*/
```

The following example checks to see if the `Intend%` or `%intention%`
pattern exists in a value and produces that value if either pattern is found:

```sql
SELECT * FROM Words WHERE value LIKE ANY ('Intend%', '%intention%');

/*------------------------+
 | value                  |
 +------------------------+
 | Intend with clarity.   |
 | Secure with intention. |
 +------------------------*/
```

The following example checks to see if the `%ity%`
pattern exists in a value and produces that value if the pattern is found.

Example with `LIKE ALL`:

```sql
SELECT * FROM Words WHERE value LIKE ALL ('%ity%');

/*-----------------------+
 | value                 |
 +-----------------------+
 | Intend with clarity.  |
 | Clarity and security. |
 +-----------------------*/
```

The following example checks to see if the `%ity%`
pattern exists in a value produces that value if the pattern
isn't found:

```sql
SELECT * FROM Words WHERE value NOT LIKE ('%ity%');

/*------------------------+
 | value                  |
 +------------------------+
 | Secure with intention. |
 +------------------------*/
```

You can pass in an array for `patterns`. For example:

```sql
SELECT * FROM Words WHERE value LIKE ANY UNNEST(['%ion%', '%and%']);

/*------------------------+
 | value                  |
 +------------------------+
 | Secure with intention. |
 | Clarity and security.  |
 +------------------------*/
```

The following queries illustrate some of the semantic rules for the
quantified `LIKE` operator:

```sql
SELECT
  NULL LIKE ANY ('a', 'b'), -- NULL
  'a' LIKE ANY ('a', 'c'), -- TRUE
  'a' LIKE ANY ('b', 'c'), -- FALSE
  'a' LIKE ANY ('a', NULL), -- TRUE
  'a' LIKE ANY ('b', NULL), -- NULL
  NULL NOT LIKE ANY ('a', 'b'), -- NULL
  'a' NOT LIKE ANY ('a', 'b'), -- TRUE
  'a' NOT LIKE ANY ('a', '%a%'), -- FALSE
  'a' NOT LIKE ANY ('a', NULL), -- NULL
  'a' NOT LIKE ANY ('b', NULL); -- TRUE
```

```sql
SELECT
  NULL LIKE SOME ('a', 'b'), -- NULL
  'a' LIKE SOME ('a', 'c'), -- TRUE
  'a' LIKE SOME ('b', 'c'), -- FALSE
  'a' LIKE SOME ('a', NULL), -- TRUE
  'a' LIKE SOME ('b', NULL), -- NULL
  NULL NOT LIKE SOME ('a', 'b'), -- NULL
  'a' NOT LIKE SOME ('a', 'b'), -- TRUE
  'a' NOT LIKE SOME ('a', '%a%'), -- FALSE
  'a' NOT LIKE SOME ('a', NULL), -- NULL
  'a' NOT LIKE SOME ('b', NULL); -- TRUE
```

```sql
SELECT
  NULL LIKE ALL ('a', 'b'), -- NULL
  'a' LIKE ALL ('a', '%a%'), -- TRUE
  'a' LIKE ALL ('a', 'c'), -- FALSE
  'a' LIKE ALL ('a', NULL), -- NULL
  'a' LIKE ALL ('b', NULL), -- FALSE
  NULL NOT LIKE ALL ('a', 'b'), -- NULL
  'a' NOT LIKE ALL ('b', 'c'), -- TRUE
  'a' NOT LIKE ALL ('a', 'c'), -- FALSE
  'a' NOT LIKE ALL ('a', NULL), -- FALSE
  'a' NOT LIKE ALL ('b', NULL); -- NULL
```

The following queries illustrate some of the semantic rules for the
quantified `LIKE` operator and collation:

```sql
SELECT
  COLLATE('a', 'und:ci') LIKE ALL ('a', 'A'), -- TRUE
  'a' LIKE ALL (COLLATE('a', 'und:ci'), 'A'), -- TRUE
  'a' LIKE ALL ('%A%', COLLATE('a', 'und:ci')); -- TRUE
```

```sql
-- ERROR: BYTES and STRING values can't be used together.
SELECT b'a' LIKE ALL (COLLATE('a', 'und:ci'), 'A');
```

#### Concatenation operator

The concatenation operator combines multiple values into one.

| Function Syntax | Input Data Type | Result Data Type |
|---|---|---|
| `STRING || STRING [ || ... ]` | `STRING` | `STRING` |
| `BYTES || BYTES [ || ... ]` | `BYTES` | `BYTES` |
| `ARRAY<T> || ARRAY<T> [ || ... ]` | `ARRAY<T>` | `ARRAY<T>` |

> [!NOTE]
> **Note:** The concatenation operator is translated into a nested [`CONCAT`](../googlesql-functions/string_functions-1.md#concat) function call. For example, `'A' || 'B' || 'C'` becomes `CONCAT('A', CONCAT('B', 'C'))`.

#### `WITH` expression

```sql
WITH(variable_assignment[, ...], result_expression)

variable_assignment:
  variable_name AS expression
```

**Description**

Creates one or more variables. Each variable can be used in subsequent
expressions within the `WITH` expression. Returns the value of
`result_expression`.

- `variable_assignment`: Introduces a variable. The variable name must be
  unique within a given `WITH` expression. Each expression can reference the
  variables that come before it. For example, if you create variable `a`,
  then follow it with variable `b`, then you can reference `a` inside of the
  expression for `b`.

  - `variable_name`: The name of the variable.

  - `expression`: The value to assign to the variable.

- `result_expression`: An expression that can use all of the variables defined
  before it. The value of `result_expression` is returned by the `WITH`
  expression.

**Return Type**

- The type of the `result_expression`.

**Requirements and Caveats**

- A variable can only be assigned once within a `WITH` expression.
- Variables created during `WITH` may not be used in analytic or aggregate function arguments. For example, `WITH(a AS ..., SUM(a))` produces an error.
- A `WITH` expression cannot be used within a user-defined function with `ANY TYPE` arguments.
- Each variable's expression is evaluated only once.

**Examples**

The following example first concatenates variable `a` with `b`, then variable
`b` with `c`:

```sql
SELECT WITH(a AS '123',               -- a is '123'
            b AS CONCAT(a, '456'),    -- b is '123456'
            c AS '789',               -- c is '789'
            CONCAT(b, c)) AS result;  -- b + c is '123456789'

/*-------------+
 | result      |
 +-------------+
 | '123456789' |
 +-------------*/
```

In the following example, the volatile expression `RAND()` is evaluated once.
The value of the result expression is always `0.0`:

```sql
SELECT WITH(a AS RAND(), a - a);

/*---------+
 | result  |
 +---------+
 | 0.0     |
 +---------*/
```

Aggregate or analytic function
results can be stored in variables.

```sql
SELECT WITH(s AS SUM(input), c AS COUNT(input), s/c)
FROM UNNEST([1.0, 2.0, 3.0]) AS input;

/*---------+
 | result  |
 +---------+
 | 2.0     |
 +---------*/
```

Variables can't be used in aggregate or
analytic function call arguments.

```sql
SELECT WITH(diff AS a - b, AVG(diff))
FROM UNNEST([
              STRUCT(1 AS a, 2 AS b),
              STRUCT(3 AS a, 4 AS b),
              STRUCT(5 AS a, 6 AS b)
            ]);

-- ERROR: WITH variables like 'diff' can't be used in aggregate or analytic
-- function arguments.
```

A `WITH` expression is different from a `WITH` clause. The following example
shows a query that uses both:

```sql
WITH my_table AS (
  SELECT 1 AS x, 2 AS y
  UNION ALL
  SELECT 3 AS x, 4 AS y
  UNION ALL
  SELECT 5 AS x, 6 AS y
)
SELECT WITH(a AS SUM(x), b AS COUNT(x), a/b) AS avg_x, AVG(y) AS avg_y
FROM my_table
WHERE x > 1;

/*-------+-------+
 | avg_x | avg_y |
 +-------+-------+
 | 4     | 5     |
 +-------+-------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/operators (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the `patterns` syntax of the quantified `LIKE` operator lists `(expression[, ...])` and `UNNEST(array_expression)` with no `|` between them. A `|` is added, matching the `value_set` syntax of the `IN` operator on the same page, which separates its alternatives with `|`.
- Corrected from the official docs: the link text "quantified `LIKE` operator" points to `#like-operator`, the plain `LIKE` section. It is changed to `#quantified-like-operator`, the `Quantified LIKE operator` heading on the same page.
- Corrected from the official docs: the first `entry_table` example selects the literal `'a'`, but its result table has an `entry` column and the following examples use `SELECT entry`. The query is changed to `SELECT entry`.
- Conflicting official statements: the examples for `SELECT NULL LIKE 'a%'` and `SELECT 'apple' LIKE NULL` are commented "Produces an error", but the page states that unless otherwise specified all operators return `NULL` when an operand is `NULL`, and the quantified `LIKE` rules return `NULL` for a `NULL` search value. The official docs do not say which is correct.
- Conflicting official statements: the rule says an error is produced when an underscore is not escaped "if the collator isn't `und:ci`", but the example `COLLATE('Foo', 'und:ci') LIKE COLLATE('%f_o%', 'und:ci')` is commented "Produces an error" while using `und:ci`. The official docs do not say which side is correct.
- Caution: the quantified `NOT LIKE` rules with `ALL` list "1. Returns `TRUE` if `patterns` is empty" and "2. For `pattern_array`, returns `TRUE` if `patterns` is empty". `pattern_array` is not defined on this page, and rule 2 repeats rule 1. The intended meaning is not stated.

## Related

- [Index of this directory](./README.md)

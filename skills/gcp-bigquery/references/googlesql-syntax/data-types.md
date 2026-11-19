---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types
---

# Data types

## Signature / Usage

This page provides an overview of all GoogleSQL for BigQuery
data types, including information about their value
domains. For
information on data type literals and constructors, see
[Lexical Structure and Syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#literals).

### Data type list

| Name | Summary |
|---|---|
| [Array type](#array-type) | An ordered list of zero or more elements of non-array values. SQL type name: `ARRAY` |
| [Boolean type](#boolean-type) | A value that can be either `TRUE` or `FALSE`. SQL type name: `BOOL` SQL aliases: `BOOLEAN` |
| [Bytes type](#bytes-type) | Variable-length binary data. SQL type name: `BYTES` |
| [Date type](#date-type) | A Gregorian calendar date, independent of time zone. SQL type name: `DATE` |
| [Datetime type](#datetime-type) | A Gregorian date and a time, as they might be displayed on a watch, independent of time zone. SQL type name: `DATETIME` |
| [Geography type](#geography-type) | A collection of points, linestrings, and polygons, which is represented as a point set, or a subset of the surface of the Earth. SQL type name: `GEOGRAPHY` |
| [Graph element type](#graph-element-type) | An element in a property graph. Can be a `GRAPH_NODE` or `GRAPH_EDGE`. SQL type name: `GRAPH_ELEMENT` |
| [Graph path type](#graph-path-type) | A path in a property graph. SQL type name: `GRAPH_PATH` |
| [Interval type](#interval-type) | A duration of time, without referring to any specific point in time. SQL type name: `INTERVAL` |
| [JSON type](#json-type) | Represents JSON, a lightweight data-interchange format. SQL type name: `JSON` |
| [Measure type](#measure-type) | An aggregate calculation that doesn't overcount. SQL type name: `MEASURE` |
| [Numeric types](#numeric-types) | A numeric value. Several types are supported. A 64-bit integer. SQL type name: `INT64` SQL aliases: `INT`, `SMALLINT`, `INTEGER`, `BIGINT`, `TINYINT`, `BYTEINT` A decimal value with precision of 38 digits. SQL type name: `NUMERIC` SQL aliases: `DECIMAL` A decimal value with precision of approximately 76.8 digits (the 77th digit is partial). SQL type name: `BIGNUMERIC` SQL aliases: `BIGDECIMAL` An approximate double precision numeric value. SQL type name: `FLOAT64` |
| [Range type](#range-type) | Contiguous range between two dates, datetimes, or timestamps. SQL type name: `RANGE` |
| [String type](#string-type) | Variable-length character data. SQL type name: `STRING` |
| [Struct type](#struct-type) | Container of ordered fields. SQL type name: `STRUCT` |
| [Time type](#time-type) | A time of day, as might be displayed on a clock, independent of a specific date and time zone. SQL type name: `TIME` |
| [Timestamp type](#timestamp-type) | A timestamp value represents an absolute point in time, independent of any time zone or convention such as daylight saving time (DST). SQL type name: `TIMESTAMP` |

### Data type properties

When storing and querying data, it's helpful to keep the following data type
properties in mind:

#### Nullable data types

For nullable data types, `NULL` is a valid value. Currently, all existing
data types are nullable. Conditions apply for
[arrays](#nulls-and-the-array-type).

#### Orderable data types

Expressions of orderable data types can be used in an `ORDER BY` clause.
Applies to all data types except for:

- `ARRAY`
- `STRUCT`
- `GEOGRAPHY`
- `JSON`
- `GRAPH_ELEMENT`
- `GRAPH_PATH`

##### Ordering `NULL`s

In the context of the `ORDER BY` clause, `NULL`s are the minimum
possible value; that is, `NULL`s appear first in `ASC` sorts and last in
`DESC` sorts.

`NULL` values can be specified as the first or last values for a column
irrespective of `ASC` or `DESC` by using the `NULLS FIRST` or `NULLS LAST`
modifiers respectively.

To learn more about using `ASC`, `DESC`, `NULLS FIRST` and `NULLS LAST`, see
the [`ORDER BY` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#order_by_clause).

##### Ordering floating points

Floating point values are sorted in this order, from least to greatest:

1. `NULL`
2. `NaN` --- All `NaN` values are considered equal when sorting.
3. `-inf`
4. Negative numbers
5. 0 or -0 --- All zero values are considered equal when sorting.
6. Positive numbers
7. `+inf`

#### Groupable data types

Groupable data types can generally appear in an expression following `GROUP BY`,
`DISTINCT`, and `PARTITION BY`. All data types are supported except for:

- `GEOGRAPHY`
- `JSON`
- `GRAPH_PATH`

##### Grouping with floating point types

Groupable floating point types can appear in an expression following `GROUP BY`
and `DISTINCT`. `PARTITION BY` expressions can't
include [floating point types](#floating-point-type).

Special floating point values are grouped in the following way, including
both grouping done by a `GROUP BY` clause and grouping done by the
`DISTINCT` keyword:

- `NULL`
- `NaN` --- All `NaN` values are considered equal when grouping.
- `-inf`
- 0 or -0 --- All zero values are considered equal when grouping.
- `+inf`

##### Grouping with arrays

An `ARRAY` type is groupable if its element type is
groupable. An `ARRAY` type
is only groupable in a `GROUP BY` clause or in a
`SELECT DISTINCT` clause.

Two arrays are in the same group if and only if one of the following statements
is true:

- The two arrays are both `NULL`.
- The two arrays have the same number of elements and all corresponding elements are in the same groups.

##### Grouping with structs

A `STRUCT` type is groupable if its field types are
groupable. A `STRUCT` type
is only groupable in a `GROUP BY` clause or in a
`SELECT DISTINCT` clause.

Two structs are in the same group if and only if one of the following statements
is true:

- The two structs are both `NULL`.
- All corresponding field values between the structs are in the same groups.

#### Comparable data types

Values of the same comparable data type can be compared to each other.
All data types are supported except for:

- `GEOGRAPHY`
- `JSON`
- `ARRAY`

Notes:

- Equality comparisons for structs are supported field by field, in field order. Field names are ignored. Less than and greater than comparisons aren't supported.
- To compare geography values, use [ST_Equals](../googlesql-functions/geography_functions-1.md#st_equals).
- When comparing ranges, the lower bounds are compared. If the lower bounds are equal, the upper bounds are compared, instead.
- When comparing ranges, `NULL` values are handled as follows:
  - `NULL` lower bounds are sorted before non-`NULL` lower bounds.
  - `NULL` upper bounds are sorted after non-`NULL` upper bounds.
  - If two bounds that are being compared are `NULL`, the comparison is `TRUE`.
  - An `UNBOUNDED` bound is treated as a `NULL` bound.
- All types that support comparisons can be used in a `JOIN` condition. See [JOIN Types](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#join_types) for an explanation of join conditions.

#### Collatable data types

Collatable data types support collation, which determines how to sort and
compare strings. These data types support collation:

- String
- String fields in a struct
- String elements in an array

### Data type sizes

Use the following table to see the size in logical bytes for each supported data
type.

| Data type | Size |
|---|---|
| `ARRAY` | The sum of the size of its elements. For example, an array defined as (`ARRAY<INT64>`) that contains 4 entries is calculated as 32 logical bytes (4 entries x 8 logical bytes). |
| `BIGNUMERIC` | 32 logical bytes |
| `BOOL` | 1 logical byte |
| `BYTES` | 2 logical bytes + the number of logical bytes in the value |
| `DATE` | 8 logical bytes |
| `DATETIME` | 8 logical bytes |
| `FLOAT64` | 8 logical bytes |
| `GEOGRAPHY` | 16 logical bytes + 24 logical bytes \* the number of vertices in the geography type. To verify the number of vertices, use the [`ST_NumPoints`](../googlesql-functions/geography_functions-2.md#st_numpoints) function. |
| `INT64` | 8 logical bytes |
| `INTERVAL` | 16 logical bytes |
| `JSON` | The number of logical bytes in UTF-8 encoding of the JSON-formatted string equivalent after canonicalization. |
| `NUMERIC` | 16 logical bytes |
| `RANGE` | 16 logical bytes |
| `STRING` | 2 logical bytes + the UTF-8 encoded string size |
| `STRUCT` | 0 logical bytes + the size of the contained fields |
| `TIME` | 8 logical bytes |
| `TIMESTAMP` | 8 logical bytes |

A `NULL` value for any data type is calculated as 0 logical bytes.

A repeated column is stored as an array, and the size is calculated based on the
column data type and the number of values. For example, an integer column
(`INT64`) that's repeated (`ARRAY<INT64>`) and contains 4 entries is calculated
as 32 logical bytes (4 entries x 8 logical bytes). The total size of all values
in a table row can't exceed the
[maximum row size](https://docs.cloud.google.com/bigquery/quotas#max_row_size).

### Parameterized data types

Syntax:

```sql
DATA_TYPE(param[, ...])
```

You can use parameters to specify constraints for the following data types:

- `STRING`
- `BYTES`
- `NUMERIC`
- `BIGNUMERIC`

A data type that's declared with parameters is called a parameterized data
type. You can only use parameterized data types with columns and script
variables. A column with a parameterized data type is a *parameterized column*
and a script variable with a parameterized data type is a *parameterized script
variable*. Parameterized type constraints are enforced when writing a value to a
parameterized column or when assigning a value to a parameterized script
variable.

A data type's parameters aren't propagated in an expression, only the data type
is.

**Examples**

```sql
-- Declare a variable with type parameters.
DECLARE x STRING(10);

-- This is a valid assignment to x.
SET x = "hello";

-- This assignment to x violates the type parameter constraint and results in an OUT_OF_RANGE error.
SET x = "this string is too long"
```

```sql
-- Declare variables with type parameters.
DECLARE x NUMERIC(10) DEFAULT 12345;
DECLARE y NUMERIC(5, 2) DEFAULT 123.45;

-- The variable x is treated as a NUMERIC value when read, so the result of this query
-- is a NUMERIC without type parameters.
SELECT x;

-- Type parameters aren't propagated within expressions, so variables x and y are treated
-- as NUMERIC values when read and the result of this query is a NUMERIC without type parameters.
SELECT x + y;
```

### Array type

| Name | Description |
|---|---|
| `ARRAY` | Ordered list of zero or more elements of any non-array type. |

An array is an ordered list of zero or more elements of non-array values.
Elements in an array must share the same type.

Arrays of arrays aren't allowed. Queries that would produce an array of
arrays return an error. Instead, a struct must be inserted between the
arrays using the `SELECT AS STRUCT` construct.

To learn more about the literal representation of an array type,
see [Array literals](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#array_literals).

To learn more about using arrays in GoogleSQL, see [Work with
arrays](https://docs.cloud.google.com/bigquery/docs/arrays#constructing_arrays).

#### `NULL`s and the array type

Currently, GoogleSQL for BigQuery has the following rules with respect to `NULL`s and
arrays:

- An array can be `NULL`.

  For example:

  ```sql
  SELECT CAST(NULL AS ARRAY<INT64>) IS NULL AS array_is_null;

  /*---------------+
   | array_is_null |
   +---------------+
   | TRUE          |
   +---------------*/
  ```

- GoogleSQL for BigQuery translates a `NULL` array into an empty array in the query
  result, although inside the query, `NULL` and empty arrays are two distinct
  values.

  For example:

  ```sql
  WITH Items AS (
    SELECT [] AS numbers, "Empty array in query" AS description UNION ALL
    SELECT CAST(NULL AS ARRAY<INT64>), "NULL array in query")
  SELECT numbers, description, numbers IS NULL AS numbers_null
  FROM Items;

  /*---------+----------------------+--------------+
   | numbers | description          | numbers_null |
   +---------+----------------------+--------------+
   | []      | Empty array in query | false        |
   | []      | NULL array in query  | true         |
   +---------+----------------------+--------------*/
  ```

  When you write a `NULL` array to a table, it's converted to an
  empty array. If you write `Items` to a table from the previous query,
  then each array is written as an empty array:

  ```sql
  SELECT numbers, description, numbers IS NULL AS numbers_null
  FROM Items;

  /*---------+----------------------+--------------+
   | numbers | description          | numbers_null |
   +---------+----------------------+--------------+
   | []      | Empty array in query | false        |
   | []      | NULL array in query  | false        |
   +---------+----------------------+--------------*/
  ```

- GoogleSQL for BigQuery raises an error if the query result has an array which
  contains `NULL` elements, although such an array can be used inside the query.

  For example, this works:

  ```sql
  SELECT FORMAT("%T", [1, NULL, 3]) as numbers;

  /*--------------+
   | numbers      |
   +--------------+
   | [1, NULL, 3] |
   +--------------*/
  ```

  But this raises an error:

  ```sql
  -- error
  SELECT [1, NULL, 3] as numbers;
  ```

#### Declaring an array type

```sql
ARRAY<T>
```

Array types are declared using the angle brackets (`<` and `>`). The type
of the elements of an array can be arbitrarily complex with the exception that
an array can't directly contain another array.

**Examples**

| Type Declaration | Meaning |
|---|---|
| ` ARRAY<INT64> ` | Simple array of 64-bit integers. |
| ` ARRAY<BYTES(5)> ` | Simple array of parameterized bytes. |
| ` ARRAY<STRUCT<INT64, INT64>> ` | An array of structs, each of which contains two 64-bit integers. |
| ` ARRAY<ARRAY<INT64>> ` (not supported) | This is an **invalid** type declaration which is included here just in case you came looking for how to create a multi-level array. Arrays can't contain arrays directly. Instead see the next example. |
| ` ARRAY<STRUCT<ARRAY<INT64>>> ` | An array of arrays of 64-bit integers. Notice that there is a struct between the two arrays because arrays can't hold other arrays directly. |

#### Constructing an array

You can construct an array using array literals or array functions.

##### Using array literals

You can build an array literal in GoogleSQL using brackets (`[` and
`]`). Each element in an array is separated by a comma.

```sql
SELECT [1, 2, 3] AS numbers;

SELECT ["apple", "pear", "orange"] AS fruit;

SELECT [true, false, true] AS booleans;
```

You can also create arrays from any expressions that have compatible types. For
example:

```sql
SELECT [a, b, c]
FROM
  (SELECT 5 AS a,
          37 AS b,
          406 AS c);

SELECT [a, b, c]
FROM
  (SELECT CAST(5 AS INT64) AS a,
          CAST(37 AS FLOAT64) AS b,
          406 AS c);
```

Notice that the second example contains three expressions: one that returns an
`INT64`, one that returns a `FLOAT64`, and one that
declares a literal. This expression works because all three expressions share
`FLOAT64` as a supertype.

To declare a specific data type for an array, use angle
brackets (`<` and `>`). For example:

```sql
SELECT ARRAY<FLOAT64>[1, 2, 3] AS floats;
```

Arrays of most data types, such as `INT64` or `STRING`, don't require
that you declare them first.

```sql
SELECT [1, 2, 3] AS numbers;
```

You can write an empty array of a specific type using `ARRAY<type>[]`. You can
also write an untyped empty array using `[]`, in which case GoogleSQL
attempts to infer the array type from the surrounding context. If
GoogleSQL can't infer a type, the default type `ARRAY<INT64>` is used.

##### Using generated values

You can also construct an `ARRAY` with generated values.

###### Generating arrays of integers

[`GENERATE_ARRAY`](../googlesql-functions/array_functions.md#generate_array)
generates an array of values from a starting and ending value and a step value.
For example, the following query generates an array that contains all of the odd
integers from 11 to 33, inclusive:

```sql
SELECT GENERATE_ARRAY(11, 33, 2) AS odds;

/*--------------------------------------------------+
 | odds                                             |
 +--------------------------------------------------+
 | [11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33] |
 +--------------------------------------------------*/
```

You can also generate an array of values in descending order by giving a
negative step value:

```sql
SELECT GENERATE_ARRAY(21, 14, -1) AS countdown;

/*----------------------------------+
 | countdown                        |
 +----------------------------------+
 | [21, 20, 19, 18, 17, 16, 15, 14] |
 +----------------------------------*/
```

###### Generating arrays of dates

[`GENERATE_DATE_ARRAY`](../googlesql-functions/array_functions.md#generate_date_array)
generates an array of `DATE`s from a starting and ending `DATE` and a step
`INTERVAL`.

You can generate a set of `DATE` values using `GENERATE_DATE_ARRAY`. For
example, this query returns the current `DATE` and the following
`DATE`s at 1 `WEEK` intervals up to and including a later `DATE`:

```sql
SELECT
  GENERATE_DATE_ARRAY('2017-11-21', '2017-12-31', INTERVAL 1 WEEK)
    AS date_array;

/*--------------------------------------------------------------------------+
 | date_array                                                               |
 +--------------------------------------------------------------------------+
 | [2017-11-21, 2017-11-28, 2017-12-05, 2017-12-12, 2017-12-19, 2017-12-26] |
 +--------------------------------------------------------------------------*/
```

### Boolean type

| Name | Description |
|---|---|
| `BOOL` `BOOLEAN` | Boolean values are represented by the keywords `TRUE` and `FALSE` (case-insensitive). |

`BOOLEAN` is an alias for `BOOL`.

Boolean values are sorted in this order, from least to greatest:

1. `NULL`
2. `FALSE`
3. `TRUE`

### Bytes type

| Name | Description |
|---|---|
| `BYTES` | Variable-length binary data. |

String and bytes are separate types that can't be used interchangeably.
Most functions on strings are also defined on bytes. The bytes version
operates on raw bytes rather than Unicode characters. Casts between string and
bytes enforce that the bytes are encoded using UTF-8.

You can convert a base64-encoded `STRING` expression into the `BYTES` format
using the
[`FROM_BASE64` function](../googlesql-functions/string_functions-1.md#from_base64).
You can also convert a sequence of `BYTES` into a base64-encoded `STRING`
expression using the
[`TO_BASE64` function](../googlesql-functions/string_functions-2.md#to_base64).

To learn more about the literal representation of a bytes type,
see [Bytes literals](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#string_and_bytes_literals).

#### Parameterized bytes type

| Parameterized Type | Description |
|---|---|
| `BYTES(L)` | Sequence of bytes with a maximum of <var translate="no">L</var> bytes allowed in the binary string, where <var translate="no">L</var> is a positive `INT64` value. If a sequence of bytes has more than <var translate="no">L</var> bytes, throws an `OUT_OF_RANGE` error. |

See [Parameterized Data Types](#parameterized-data-types) for more information on
parameterized types and where they can be used.

### Date type

| Name | Range |
|---|---|
| `DATE` | 0001-01-01 to 9999-12-31. |

The date type represents a Gregorian calendar date, independent of time zone. A
date value doesn't represent a specific 24-hour time period. Rather, a given
date value represents a different 24-hour period when interpreted in different
time zones, and may represent a shorter or longer day during daylight saving
time (DST) transitions.
To represent an absolute point in time,
use a [timestamp](#timestamp-type).

###### Canonical format

```sql
YYYY-[M]M-[D]D
```

- `YYYY`: Four-digit year.
- `[M]M`: One or two digit month.
- `[D]D`: One or two digit day.

To learn more about the literal representation of a date type,
see [Date literals](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#date_literals).

### Datetime type

| Name | Range |
|---|---|
| `DATETIME` | 0001-01-01 00:00:00 to 9999-12-31 23:59:59.999999 |

A datetime value represents a Gregorian date and a time,
as they might be displayed on a watch, independent of time zone.
It includes the year, month, day, hour, minute, second,
and subsecond.
To represent an absolute point in time,
use a [timestamp](#timestamp-type).

###### Canonical format

```sql
civil_date_part[time_part]

civil_date_part:
    YYYY-[M]M-[D]D

time_part:
    { |T|t}[H]H:[M]M:[S]S[.F]
```

- `YYYY`: Four-digit year.
- `[M]M`: One or two digit month.
- `[D]D`: One or two digit day.
- `{ |T|t}`: A space or a `T` or `t` separator. The `T` and `t` separators are flags for time.
- `[H]H`: One or two digit hour (valid values from 00 to 23).
- `[M]M`: One or two digit minutes (valid values from 00 to 59).
- `[S]S`: One or two digit seconds (valid values from 00 to 60).
- `[.F]`: Up to six fractional digits (microsecond precision).

To learn more about the literal representation of a datetime type,
see [Datetime literals](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#datetime_literals).

### Geography type

| Name | Description |
|---|---|
| `GEOGRAPHY` | A collection of points, linestrings, and polygons, which is represented as a point set, or a subset of the surface of the Earth. |

The geography type is based on the [OGC Simple
Features specification (SFS)](http://www.opengeospatial.org/standards/sfs#downloads),
and can contain the following objects:

| Geography object | Description |
|---|---|
| `Point` | A single location in coordinate space known as a point. A point has an x-coordinate value and a y-coordinate value, where the x-coordinate is longitude and the y-coordinate is latitude of the point on the [WGS84 reference ellipsoid](https://en.wikipedia.org/wiki/World_Geodetic_System). Syntax: ```sql POINT(x_coordinate y_coordinate) ``` Examples: ```sql POINT(32 210) ``` ```sql POINT EMPTY ``` <br /> |
| `LineString` | Represents a linestring, which is a one-dimensional geometric object, with a sequence of points and geodesic edges between them. Syntax: ```sql LINESTRING(point[, ...]) ``` Examples: ```sql LINESTRING(1 1, 2 1, 3.1 2.88, 3 -3) ``` ```sql LINESTRING EMPTY ``` <br /> |
| `Polygon` | A polygon, which is represented as a planar surface defined by 1 exterior boundary and 0 or more interior boundaries. Each interior boundary defines a hole in the polygon. The boundary loops of polygons are oriented so that if you traverse the boundary vertices in order, the interior of the polygon is on the left. Syntax: ```sql POLYGON(interior_ring[, ...]) interior_ring: (point[, ...]) ``` Examples: ```sql POLYGON((0 0, 2 2, 2 0, 0 0), (2 2, 3 4, 2 4, 2 2)) ``` ```sql POLYGON EMPTY ``` <br /> |
| `MultiPoint` | A collection of points. Syntax: ```sql MULTIPOINT(point[, ...]) ``` Examples: ```sql MULTIPOINT(0 32, 123 9, 48 67) ``` ```sql MULTIPOINT EMPTY ``` <br /> |
| `MultiLineString` | Represents a multilinestring, which is a collection of linestrings. Syntax: ```sql MULTILINESTRING((linestring)[, ...]) ``` Examples: ```sql MULTILINESTRING((2 2, 3 4), (5 6, 7 7)) ``` ```sql MULTILINESTRING EMPTY ``` <br /> |
| `MultiPolygon` | Represents a multipolygon, which is a collection of polygons. Syntax: ```sql MULTIPOLYGON((polygon)[, ...]) ``` Examples: ```sql MULTIPOLYGON(((0 -1, 1 0, 1 1, 0 -1)), ((0 0, 2 2, 3 0, 0 0), (2 2, 3 4, 2 4, 1 9))) ``` ```sql MULTIPOLYGON EMPTY ``` <br /> |
| `GeometryCollection` | Represents a geometry collection with elements of different dimensions or an empty geography. Syntax: ```sql GEOMETRYCOLLECTION(geography_object[, ...]) ``` Examples: ```sql GEOMETRYCOLLECTION(MULTIPOINT(-1 2, 0 12), LINESTRING(-2 4, 0 6)) ``` ```sql GEOMETRYCOLLECTION EMPTY ``` <br /> |

The points, linestrings and polygons of a geography value form a simple
arrangement on the [WGS84 reference ellipsoid](https://en.wikipedia.org/wiki/World_Geodetic_System).
A simple arrangement is one where no point on the WGS84 surface is contained
by multiple elements of the collection. If self intersections exist, they
are automatically removed.

The geography that contains no points, linestrings or polygons is called an
empty geography. An empty geography isn't associated with a particular
geometry shape. For example, the following query produces the same results:

```sql
SELECT
  ST_GEOGFROMTEXT('POINT EMPTY') AS a,
  ST_GEOGFROMTEXT('GEOMETRYCOLLECTION EMPTY') AS b

/*--------------------------+--------------------------+
 | a                        | b                        |
 +--------------------------+--------------------------+
 | GEOMETRYCOLLECTION EMPTY | GEOMETRYCOLLECTION EMPTY |
 +--------------------------+--------------------------*/
```

The structure of compound geometry objects isn't preserved if a
simpler type can be produced. For example, in column `b`,
`GEOMETRYCOLLECTION` with `(POINT(1 1)` and `POINT(2 2)` is converted into the
simplest possible geometry, `MULTIPOINT(1 1, 2 2)`.

```sql
SELECT
  ST_GEOGFROMTEXT('MULTIPOINT(1 1, 2 2)') AS a,
  ST_GEOGFROMTEXT('GEOMETRYCOLLECTION(POINT(1 1), POINT(2 2))') AS b

/*----------------------+----------------------+
 | a                    | b                    |
 +----------------------+----------------------+
 | MULTIPOINT(1 1, 2 2) | MULTIPOINT(1 1, 2 2) |
 +----------------------+----------------------*/
```

A geography is the result of, or an argument to, a
[Geography Function](../googlesql-functions/geography_functions-1.md).

### Graph element type

| Name | Description |
|---|---|
| `GRAPH_ELEMENT` | An element in a property graph. |

A variable with a `GRAPH_ELEMENT` type is produced by a graph query.
The generated type has this format:

```sql
GRAPH_ELEMENT<T>
```

A graph element is either a node or an edge, representing data from a
matching node or edge table based on its label. Each graph element holds a
set of properties that can be accessed with a case-insensitive name,
similar to fields of a struct.

**Example**

In the following example, `n` represents a graph element in the
[`FinGraph`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-schema-statements#fin_graph) property graph:

```sql
GRAPH graph_db.FinGraph
MATCH (n:Person)
RETURN n.name
```

In the following example, the [`TYPEOF`](../googlesql-functions/utility-functions.md#typeof) function is used to inspect the
set of properties defined in the graph element type.

```sql
GRAPH graph_db.FinGraph
MATCH (n:Person)
RETURN TYPEOF(n) AS t
LIMIT 1

/*--------------------------------------------------------+
 | t                                                      |
 +--------------------------------------------------------+
 | GRAPH_NODE(myproject.graph_db.FinGraph)<id INT64, ...> |
 +--------------------------------------------------------*/
```

### Graph path type

| Name | Description |
|---|---|
| `GRAPH_PATH` | A path in a property graph. |

The graph path data type represents a sequence of nodes interleaved
with edges and has this format:

```sql
GRAPH_PATH<NODE_TYPE, EDGE_TYPE>
```

### Interval type

> [!WARNING]
> **Preview**
>
>
> This product or feature is subject to the "Pre-GA Offerings Terms"
> in the General Service Terms section of the
> [Service Specific Terms](https://cloud.google.com/terms/service-terms).
> Pre-GA products and features are available "as is" and might have
> limited support. For more information, see the
> [launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

> [!NOTE]
> **Note:** To provide feedback or request support for this feature, send an email to [bigquery-sql-preview-support@google.com](mailto:bigquery-sql-preview-support@google.com).

| Name | Range |
|---|---|
| `INTERVAL` | -10000-0 -3660000 -87840000:0:0 to 10000-0 3660000 87840000:0:0 |

An `INTERVAL` object represents duration or amount of time, without referring
to any specific point in time.

###### Canonical format

```sql
[sign]Y-M [sign]D [sign]H:M:S[.F]
```

- `sign`: `+` or `-`
- `Y`: Year
- `M`: Month
- `D`: Day
- `H`: Hour
- `M`: Minute
- `S`: Second
- `[.F]`: Up to six fractional digits (microsecond precision)

To learn more about the literal representation of an interval type,
see [Interval literals](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#interval_literals).

#### Constructing an interval

You can construct an interval with an interval literal that supports
a [single datetime part](#construct-an-interval-with-a-single-datetime-part) or a
[datetime part range](#construct-an-interval-with-a-datetime-part-range).

##### Construct an interval with a single datetime part

```sql
INTERVAL step_size step_unit
```

You can construct an `INTERVAL` object with an `INT64` expression and one
[interval-supported datetime part](#interval-supported-date-and-time-parts). For example:

```sql
-- 1 year, 0 months, 0 days, 0 hours, 0 minutes, and 0 seconds (1-0 0 0:0:0)
INTERVAL 1 YEAR
INTERVAL 4 QUARTER
INTERVAL 12 MONTH

-- 0 years, 3 months, 0 days, 0 hours, 0 minutes, and 0 seconds (0-3 0 0:0:0)
INTERVAL 1 QUARTER
INTERVAL 3 MONTH

-- 0 years, 0 months, 42 days, 0 hours, 0 minutes, and 0 seconds (0-0 42 0:0:0)
INTERVAL 6 WEEK
INTERVAL 42 DAY

-- 0 years, 0 months, 0 days, 25 hours, 0 minutes, and 0 seconds (0-0 0 25:0:0)
INTERVAL 25 HOUR
INTERVAL 1500 MINUTE
INTERVAL 90000 SECOND

-- 0 years, 0 months, 0 days, 1 hours, 30 minutes, and 0 seconds (0-0 0 1:30:0)
INTERVAL 90 MINUTE

-- 0 years, 0 months, 0 days, 0 hours, 1 minutes, and 30 seconds (0-0 0 0:1:30)
INTERVAL 90 SECOND

-- 0 years, 0 months, -5 days, 0 hours, 0 minutes, and 0 seconds (0-0 -5 0:0:0)
INTERVAL -5 DAY
```

For additional examples, see [Interval literals](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#interval_literal_single).

##### Construct an interval with a datetime part range

```sql
INTERVAL datetime_parts_string starting_datetime_part TO ending_datetime_part
```

You can construct an `INTERVAL` object with a `STRING` that contains the
datetime parts that you want to include, a starting datetime part, and an ending
datetime part. The resulting `INTERVAL` object only includes datetime parts in
the specified range.

You can use one of the following formats with the
[interval-supported datetime parts](#interval-supported-date-and-time-parts):

| Datetime part string | Datetime parts | Example |
|---|---|---|
| `Y-M` | `YEAR TO MONTH` | `INTERVAL '2-11' YEAR TO MONTH` |
| `Y-M D` | `YEAR TO DAY` | `INTERVAL '2-11 28' YEAR TO DAY` |
| `Y-M D H` | `YEAR TO HOUR` | `INTERVAL '2-11 28 16' YEAR TO HOUR` |
| `Y-M D H:M` | `YEAR TO MINUTE` | `INTERVAL '2-11 28 16:15' YEAR TO MINUTE` |
| `Y-M D H:M:S` | `YEAR TO SECOND` | `INTERVAL '2-11 28 16:15:14' YEAR TO SECOND` |
| `M D` | `MONTH TO DAY` | `INTERVAL '11 28' MONTH TO DAY` |
| `M D H` | `MONTH TO HOUR` | `INTERVAL '11 28 16' MONTH TO HOUR` |
| `M D H:M` | `MONTH TO MINUTE` | `INTERVAL '11 28 16:15' MONTH TO MINUTE` |
| `M D H:M:S` | `MONTH TO SECOND` | `INTERVAL '11 28 16:15:14' MONTH TO SECOND` |
| `D H` | `DAY TO HOUR` | `INTERVAL '28 16' DAY TO HOUR` |
| `D H:M` | `DAY TO MINUTE` | `INTERVAL '28 16:15' DAY TO MINUTE` |
| `D H:M:S` | `DAY TO SECOND` | `INTERVAL '28 16:15:14' DAY TO SECOND` |
| `H:M` | `HOUR TO MINUTE` | `INTERVAL '16:15' HOUR TO MINUTE` |
| `H:M:S` | `HOUR TO SECOND` | `INTERVAL '16:15:14' HOUR TO SECOND` |
| `M:S` | `MINUTE TO SECOND` | `INTERVAL '15:14' MINUTE TO SECOND` |

For example:

```sql
-- 0 years, 8 months, 20 days, 17 hours, 0 minutes, and 0 seconds (0-8 20 17:0:0)
INTERVAL '8 20 17' MONTH TO HOUR

-- 0 years, 8 months, -20 days, 17 hours, 0 minutes, and 0 seconds (0-8 -20 17:0:0)
INTERVAL '8 -20 17' MONTH TO HOUR
```

For additional examples, see [Interval literals](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#interval_literal_range).

##### Interval-supported date and time parts

You can use the following date parts to construct an interval:

- `YEAR`: Number of years, `Y`.
- `QUARTER`: Number of quarters; each quarter is converted to `3` months, `M`.
- `MONTH`: Number of months, `M`. Each `12` months is converted to `1` year.
- `WEEK`: Number of weeks; Each week is converted to `7` days, `D`.
- `DAY`: Number of days, `D`.

You can use the following time parts to construct an interval:

- `HOUR`: Number of hours, `H`.
- `MINUTE`: Number of minutes, `M`. Each `60` minutes is converted to `1` hour.
- `SECOND`: Number of seconds, `S`. Each `60` seconds is converted to `1` minute. Can include up to six fractional digits (microsecond precision).
- `MILLISECOND`: Number of milliseconds.
- `MICROSECOND`: Number of microseconds.

### JSON type

| Name | Description |
|---|---|
| `JSON` | Represents JSON, a lightweight data-interchange format. |

Expect these canonicalization behaviors when creating a value of JSON type:

- Booleans, strings, and nulls are preserved exactly.
- Whitespace characters aren't preserved.
- A JSON value can store integers in the range of -9,223,372,036,854,775,808 (minimum signed 64-bit integer) to 18,446,744,073,709,551,615 (maximum unsigned 64-bit integer) and floating point numbers within a domain of `FLOAT64`.
- The order of elements in an array is preserved exactly.
- The order of the members of an object isn't guaranteed or preserved.
- If an object has duplicate keys, the first key that's found is preserved.
- Up to 500 levels can be nested.
- The format of the original string representation of a JSON number may not be preserved.

To learn more about the literal representation of a JSON type,
see [JSON literals](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#json_literals).

### Measure type

| Name | Description |
|---|---|
| `MEASURE` | An aggregate calculation that doesn't overcount. |

A measure is a special type that aggregates data without overcounting.
The measure type is used by only the [`AGG` function](../googlesql-functions/aggregate_functions.md#agg). Measures
are useful for defining business metrics that you can query using the
`AGG` function instead of complex aggregation queries.
For more information about
overcounting with aggregations, see
[multi-level aggregation](../googlesql-functions/aggregate-function-calls.md#avoid-overcounting-with-multi-level-aggregation).

A measure is defined by a measure expression, and the key of the graph element.
A measure expression is an aggregate function over an expression, a scalar
calculation over aggregates, or a composition of measures using `AGG`. When you
call the `AGG` function on a measure, the calculation is evaluated once per
unique key. For information about where to define a measure, see the
[element properties definition](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-schema-statements#element_table_property_definition).

A measure expression can include the following:

- Aggregate function calls using the following functions:
  `SUM`, `AVG`, `MIN`, `MAX`, `COUNT`, and `AGG`. You can use the
  `DISTINCT` modifier with these functions, except for `AGG`.

- Expressions within aggregate functions. For example, you can aggregate
  multiple columns:

  - `MEASURE(SUM(principal + interest)) AS debt`
- Conditional logic within aggregate functions:

  - `MEASURE(AVG(CASE WHEN rate > 5.0 THEN balance ELSE 0.0 END)) AS high_rate_balance`
- Conditional distinct counting:

  - `MEASURE(COUNT(DISTINCT CASE WHEN is_active = TRUE THEN user_id ELSE NULL END)) AS active_user_count`
- Scalar operations and expressions outside of aggregate function calls:

  - `MEASURE(SUM(net_sales) * 1.15) AS sales_with_tax`
- Combinations of measures wrapped in the `AGG` function that are
  defined on the same element table, also called *derived measures*:

  - `MEASURE(AGG(total_revenue) - AGG(total_cost)) AS gross_profit`

The following restrictions apply to measure expressions:

- `COUNT(*)` / `COUNT(1)` is not allowed. You must explicitly specify a column
  or expression.

- `GROUP BY` clauses, window functions (`OVER (...)`), and subqueries aren't
  allowed in a measure expression.

- Aggregate function calls that contain a `WHERE` clause aren't supported.

- Graph properties can only be referenced within aggregate function calls.

- Compositions of measures can't contain circular dependencies.

- User-defined aggregate functions aren't supported.

The measure type has the following limitations:

- Supported by only the `AGG` function, either on output from the [`GRAPH_EXPAND` TVF](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-sql-queries#graph_expand) or inside derived measure definitions in `CREATE PROPERTY GRAPH`.
- Can't be explicitly defined as a member type of container types, such as a `STRUCT` or `ARRAY` type. When you query the output of the `GRAPH_EXPAND` function with `flatten_results => FALSE`, measures appear inside the resulting `STRUCT` columns.
- Defined only as a property in a graph. For more information and examples, see [Work with measures](https://docs.cloud.google.com/bigquery/docs/graph-measures).

### Numeric types

Numeric types include the following types:

- `INT64`
  with alias `INT`, `SMALLINT`, `INTEGER`, `BIGINT`, `TINYINT`, `BYTEINT`

- `NUMERIC` with alias `DECIMAL`

- `BIGNUMERIC` with alias `BIGDECIMAL`

- `FLOAT64`

#### Integer type

Integers are numeric values that don't have fractional components.

| Name | Range |
|---|---|
| `INT64` `INT` `SMALLINT` `INTEGER` `BIGINT` `TINYINT` `BYTEINT` | -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 |

`INT`, `SMALLINT`, `INTEGER`, `BIGINT`, `TINYINT`, and `BYTEINT` are aliases
for `INT64`.

To learn more about the literal representation of an integer type,
see [Integer literals](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#integer_literals).

#### Decimal types

Decimal type values are numeric values with fixed decimal precision and scale.
Precision is the number of digits that the number contains. Scale is
how many of these digits appear after the decimal point.

This type can represent decimal fractions exactly, and is suitable for financial
calculations.

| Name | Precision, Scale, and Range |
|---|---|
| `NUMERIC` `DECIMAL` | Precision: 38 Scale: 9 Minimum value greater than 0 that can be handled: 1e-9 Min: -9.9999999999999999999999999999999999999E+28 Max: 9.9999999999999999999999999999999999999E+28 |
| `BIGNUMERIC` `BIGDECIMAL` | Precision: approximately 76.8 digits (the 77th digit is partial) Scale: 38 Minimum value greater than 0 that can be handled: 1e-38 Min: -5.7896044618658097711785492504343953926634992332820282019728792003956564819968E+38 Max: 5.7896044618658097711785492504343953926634992332820282019728792003956564819967E+38 |

`DECIMAL` is an alias for `NUMERIC`.

`BIGDECIMAL` is an alias for `BIGNUMERIC`.

To learn more about the literal representation of a `NUMERIC` type,
see [`NUMERIC` literals](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#numeric_literals).

To learn more about the literal representation of a `BIGNUMERIC` type,
see [`BIGNUMERIC` literals](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#bignumeric_literals).

To learn more about how BigQuery rounds values stored as a `DECIMAL`
type, see [rounding mode](https://docs.cloud.google.com/bigquery/docs/schemas#rounding_mode).

##### Parameterized decimal type

| Parameterized Type | Description |
|---|---|
| `NUMERIC(P[,S])` `DECIMAL(P[,S])` | A `NUMERIC` or `DECIMAL` type with a maximum precision of <var translate="no">P</var> and maximum scale of <var translate="no">S</var>, where <var translate="no">P</var> and <var translate="no">S</var> are `INT64` types. <var translate="no">S</var> is interpreted to be 0 if unspecified. Maximum scale range: 0 ≤ <var translate="no">S</var> ≤ 9 Maximum precision range: max(1, <var translate="no">S</var>) ≤ <var translate="no">P</var> ≤ <var translate="no">S</var> + 29 |
| `BIGNUMERIC(P[, S])` `BIGDECIMAL(P[, S])` | A `BIGNUMERIC` or `BIGDECIMAL` type with a maximum precision of <var translate="no">P</var> and maximum scale of <var translate="no">S</var>, where <var translate="no">P</var> and <var translate="no">S</var> are `INT64` types. <var translate="no">S</var> is interpreted to be 0 if unspecified. Maximum scale range: 0 ≤ <var translate="no">S</var> ≤ 38 Maximum precision range: max(1, <var translate="no">S</var>) ≤ <var translate="no">P</var> ≤ <var translate="no">S</var> + 38 |

If a value has more than `S` decimal digits, the value is rounded to
`S` decimal digits. For example, inserting the value `1.125` into a
`NUMERIC(5, 2)` column rounds `1.125` half-up to `1.13`.

If a value has more than `P` digits, throws an `OUT_OF_RANGE` error.
For example, inserting `1111` into a `NUMERIC(5, 2)` column returns an
`OUT_OF_RANGE` error since `1111` is larger than `999.99`, the maximum allowed
value in a `NUMERIC(5, 2)` column.

See [Parameterized Data Types](#parameterized-data-types) for more information on
parameterized types and where they can be used.

> [!NOTE]
> **Note:** Applying restrictions with precision and scale doesn't impact the storage size of the underlying data type.

#### Floating point type

Floating point values are approximate numeric values with fractional components.

| Name | Description |
|---|---|
| `FLOAT64` | Double precision (approximate) numeric values. |

To learn more about the literal representation of a floating point type,
see [Floating point literals](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#floating_point_literals).

##### Floating point semantics

When working with floating point numbers, there are special non-numeric values
that need to be considered: `NaN` and `+/-inf`

Arithmetic operators provide standard IEEE-754 behavior for all finite input
values that produce finite output and for all operations for which at least one
input is non-finite. You can perform arithmetic operations
with signed zeros but you can't store a negative zero,
`-0.0`, in a table.

Function calls and operators return an overflow error if the input is finite
but the output would be non-finite. If the input contains non-finite values, the
output can be non-finite. In general functions don't introduce `NaN`s or
`+/-inf`. However, specific functions like `IEEE_DIVIDE` can return non-finite
values on finite input. All such cases are noted explicitly in
[Mathematical functions](../googlesql-functions/mathematical_functions.md).

Floating point values are approximations.

- The binary format used to represent floating point values can only represent a subset of the numbers between the most positive number and most negative number in the value range. This enables efficient handling of a much larger range than would be possible otherwise. Numbers that aren't exactly representable are approximated by utilizing a close value instead. For example, `0.1` can't be represented as an integer scaled by a power of `2`. When this value is displayed as a string, it's rounded to a limited number of digits, and the value approximating `0.1` might appear as `"0.1"`, hiding the fact that the value isn't precise. In other situations, the approximation can be visible.
- Summation of floating point values might produce surprising results because of [limited precision](https://en.wikipedia.org/wiki/Floating-point_arithmetic#Accuracy_problems). For example, `(1e30 + 1) - 1e30 = 0`, while `(1e30 - 1e30) + 1 = 1.0`. This is because the floating point value doesn't have enough precision to represent `(1e30 + 1)`, and the result is rounded to `1e30`. This example also shows that the result of the `SUM` aggregate function of floating points values depends on the order in which the values are accumulated. In general, this order isn't deterministic and therefore the result isn't deterministic. Thus, the resulting `SUM` of floating point values might not be deterministic and two executions of the same query on the same tables might produce different results.
- If the above points are concerning, use a [decimal type](#decimal-types) instead.

###### Mathematical function examples

| Left Term | Operator | Right Term | Returns |
|---|---|---|---|
| Any value | `+` | `NaN` | `NaN` |
| 1.0 | `+` | `+inf` | `+inf` |
| 1.0 | `+` | `-inf` | `-inf` |
| `-inf` | `+` | `+inf` | `NaN` |
| Maximum `FLOAT64` value | `+` | Maximum `FLOAT64` value | Overflow error |
| Minimum `FLOAT64` value | `/` | 2.0 | 0.0 |
| 1.0 | `/` | `0.0` | "Divide by zero" error |

Comparison operators provide standard IEEE-754 behavior for floating point
input.

###### Comparison operator examples

| Left Term | Operator | Right Term | Returns |
|---|---|---|---|
| `NaN` | `=` | Any value | `FALSE` |
| `NaN` | `<` | Any value | `FALSE` |
| Any value | `<` | `NaN` | `FALSE` |
| -0.0 | `=` | 0.0 | `TRUE` |
| -0.0 | `<` | 0.0 | `FALSE` |

For more information on how these values are ordered and grouped so they
can be compared,
see [Ordering floating point values](#ordering-floating-points).

### Range type

| Name | Range |
|---|---|
| `RANGE` | Contiguous range between two dates, datetimes, or timestamps. The lower and upper bound for the range are optional. The lower bound is inclusive and the upper bound is exclusive. |

#### Declare a range type

A range type can be declared as follows:

| Type Declaration | Meaning |
|---|---|
| `RANGE<DATE>` | Contiguous range between two dates. |
| `RANGE<DATETIME>` | Contiguous range between two datetimes. |
| `RANGE<TIMESTAMP>` | Contiguous range between two timestamps. |

#### Construct a range

You can construct a range with the [`RANGE` constructor](#construct-a-range-with-a-constructor)
or a [range literal](#construct-a-range-with-a-literal).

##### Construct a range with a constructor

You can construct a range with the `RANGE` constructor. To learn more,
see [`RANGE`](../googlesql-functions/range-functions.md#range).

##### Construct a range with a literal

You can construct a range with a range literal. The canonical format for a
range literal has the following parts:

```sql
RANGE<T> '[lower_bound, upper_bound)'
```

- `T`: The type of range. This can be `DATE`, `DATETIME`, or `TIMESTAMP`.
- `lower_bound`: The range starts from this value. This can be a [date](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#date_literals), [datetime](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#datetime_literals), or [timestamp](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#timestamp_literals) literal. If this value is `UNBOUNDED` or `NULL`, the range doesn't include a lower bound.
- `upper_bound`: The range ends before this value. This can be a [date](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#date_literals), [datetime](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#datetime_literals), or [timestamp](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#timestamp_literals) literal. If this value is `UNBOUNDED` or `NULL`, the range doesn't include an upper bound.

`T`, `lower_bound`, and `upper_bound` must be of the same data type.

To learn more about the literal representation of a range type,
see [Range literals](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#range_literals).

#### Additional details

The range type doesn't support arithmetic operators.

### String type

| Name | Description |
|---|---|
| `STRING` | Variable-length character (Unicode) data. |

Input string values must be UTF-8 encoded and output string values will be UTF-8
encoded. Alternate encodings like CESU-8 and Modified UTF-8 aren't treated as
valid UTF-8.

All functions and operators that act on string values operate on Unicode
characters rather than bytes. For example, functions like `SUBSTR` and `LENGTH`
applied to string input count the number of characters, not bytes.

Each Unicode character has a numeric value called a code point assigned to it.
Lower code points are assigned to lower characters. When characters are
compared, the code points determine which characters are less than or greater
than other characters.

Most functions on strings are also defined on bytes. The bytes version
operates on raw bytes rather than Unicode characters. Strings and bytes are
separate types that can't be used interchangeably. There is no implicit casting
in either direction. Explicit casting between string and bytes does
UTF-8 encoding and decoding. Casting bytes to string returns an error if the
bytes aren't valid UTF-8.

To learn more about the literal representation of a string type,
see [String literals](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#string_and_bytes_literals).

#### Parameterized string type

| Parameterized Type | Description |
|---|---|
| `STRING(L)` | String with a maximum of <var translate="no">L</var> Unicode characters allowed in the string, where <var translate="no">L</var> is a positive `INT64` value. If a string with more than <var translate="no">L</var> Unicode characters is assigned, throws an `OUT_OF_RANGE` error. |

See [Parameterized Data Types](#parameterized-data-types) for more information on
parameterized types and where they can be used.

### Struct type

| Name | Description |
|---|---|
| `STRUCT` | Container of ordered fields each with a type (required) and field name (optional). |

To learn more about the literal representation of a struct type,
see [Struct literals](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#struct_literals).

#### Declaring a struct type

```sql
STRUCT<T>
```

Struct types are declared using the angle brackets (`<` and `>`). The type of
the elements of a struct can be arbitrarily complex.

**Examples**

| Type Declaration | Meaning |
|---|---|
| ` STRUCT<INT64> ` | Simple struct with a single unnamed 64-bit integer field. |
| ` STRUCT<x STRING(10)> ` | Simple struct with a single parameterized string field named x. |
| ` STRUCT<x STRUCT<y INT64, z INT64>> ` | A struct with a nested struct named `x` inside it. The struct `x` has two fields, `y` and `z`, both of which are 64-bit integers. |
| ` STRUCT<inner_array ARRAY<INT64>> ` | A struct containing an array named `inner_array` that holds 64-bit integer elements. |

#### Constructing a struct

You can construct a struct using tuple syntax, typeless struct syntax, or
typed struct syntax.

##### Tuple syntax

```sql
(expr1, expr2 [, ... ])
```

The output type is an anonymous struct type with anonymous fields with types
matching the types of the input expressions. There must be at least two
expressions specified. Otherwise this syntax is indistinguishable from an
expression wrapped with parentheses.

**Examples**

| Syntax | Output Type | Notes |
|---|---|---|
| `(x, x+y)` | `STRUCT<?,?>` | If column names are used (unquoted strings), the struct field data type is derived from the column data type. `x` and `y` are columns, so the data types of the struct fields are derived from the column types and the output type of the addition operator. |

This syntax can also be used with struct comparison for comparison expressions
using multi-part keys, e.g., in a `WHERE` clause:

```sql
WHERE (Key1,Key2) IN ( (12,34), (56,78) )
```

##### Typeless struct syntax

```sql
STRUCT( expr1 [AS field_name] [, ... ])
```

Duplicate field names are allowed. Fields without names are considered anonymous
fields and can't be referenced by name. struct values can be `NULL`, or can
have `NULL` field values.

**Examples**

| Syntax | Output Type |
|---|---|
| `STRUCT(1,2,3)` | `STRUCT<int64,int64,int64>` |
| `STRUCT()` | `STRUCT<>` |
| `STRUCT('abc')` | `STRUCT<string>` |
| `STRUCT(1, t.str_col)` | `STRUCT<int64, str_col string>` |
| `STRUCT(1 AS a, 'abc' AS b)` | `STRUCT<a int64, b string>` |
| `STRUCT(str_col AS abc)` | `STRUCT<abc string>` |

##### Typed struct syntax

```sql
STRUCT<[field_name] field_type, ...>( expr1 [, ... ])
```

Typed syntax allows constructing structs with an explicit struct data type. The
output type is exactly the `field_type` provided. The input expression is
coerced to `field_type` if the two types aren't the same, and an error is
produced if the types aren't compatible. `AS alias` isn't allowed on the input
expressions. The number of expressions must match the number of fields in the
type, and the expression types must be coercible or literal-coercible to the
field types.

**Examples**

| Syntax | Output Type |
|---|---|
| `STRUCT<int64>(5)` | `STRUCT<int64>` |
| `STRUCT<date>("2011-05-05")` | `STRUCT<date>` |
| `STRUCT<x int64, y string>(1, t.str_col)` | `STRUCT<x int64, y string>` |
| `STRUCT<int64>(int_col)` | `STRUCT<int64>` |
| `STRUCT<x int64>(5 AS x)` | Error - Typed syntax doesn't allow `AS` |

#### Limited comparisons for structs

Structs can be directly compared using equality operators:

- Equal (`=`)
- Not Equal (`!=` or `<>`)
- \[`NOT`\] `IN`

Notice, though, that these direct equality comparisons compare the fields of
the struct pairwise in ordinal order ignoring any field names. If instead you
want to compare identically named fields of a struct, you can compare the
individual fields directly.

### Time type

| Name | Range |
|---|---|
| `TIME` | 00:00:00 to 23:59:59.999999 |

A time value represents a time of day, as might be displayed on a clock,
independent of a specific date and time zone.
To represent
an absolute point in time, use a [timestamp](#timestamp-type).

###### Canonical format

```sql
[H]H:[M]M:[S]S[.F]
```

- `[H]H`: One or two digit hour (valid values from 00 to 23).
- `[M]M`: One or two digit minutes (valid values from 00 to 59).
- `[S]S`: One or two digit seconds (valid values from 00 to 60).
- `[.F]`: Up to six fractional digits (microsecond precision).

To learn more about the literal representation of a time type,
see [Time literals](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#time_literals).

### Timestamp type

| Name | Range |
|---|---|
| `TIMESTAMP` | 0001-01-01 00:00:00 to 9999-12-31 23:59:59.999999 UTC |

A timestamp value represents an absolute point in time,
independent of any time zone or convention such as daylight saving time (DST),
with
microsecond
precision.

A timestamp is typically represented internally as the number of elapsed
microseconds since a fixed initial point in time.

Note that a timestamp itself doesn't have a time zone; it represents the same
instant in time globally. However, the *display* of a timestamp for human
readability usually includes a Gregorian date, a time, and a time zone, in an
implementation-dependent format. For example, the displayed values "2020-01-01
00:00:00 UTC", "2019-12-31 19:00:00 America/New_York", and "2020-01-01 05:30:00
Asia/Kolkata" all represent the same instant in time and therefore represent the
same timestamp value.

- To represent a Gregorian date as it might appear on a calendar (a civil date), use a [date](#date-type) value.
- To represent a time as it might appear on a clock (a civil time), use a [time](#time-type) value.
- To represent a Gregorian date and time as they might appear on a watch, use a [datetime](#datetime-type) value.

###### Canonical format

The canonical format for a timestamp literal has the following parts:

```sql
{
  civil_date_part[time_part [time_zone]] |
  civil_date_part[time_part[time_zone_offset]] |
  civil_date_part[time_part[utc_time_zone]]
}

civil_date_part:
    YYYY-[M]M-[D]D

time_part:
    { |T|t}[H]H:[M]M:[S]S[.F]
```

- `YYYY`: Four-digit year.
- `[M]M`: One or two digit month.
- `[D]D`: One or two digit day.
- `{ |T|t}`: A space or a `T` or `t` separator. The `T` and `t` separators are flags for time.
- `[H]H`: One or two digit hour (valid values from 00 to 23).
- `[M]M`: One or two digit minutes (valid values from 00 to 59).
- `[S]S`: One or two digit seconds (valid values from 00 to 60).
- `[.F]`: Up to six fractional digits (microsecond precision).
- `[time_zone]`: String representing the time zone. When a time zone isn't explicitly specified, the default time zone, UTC, is used. For details, see [time
  zones](#time-zones).
- `[time_zone_offset]`: String representing the offset from the Coordinated Universal Time (UTC) time zone. For details, see [time zones](#time-zones).
- `[utc_time_zone]`: String representing the Coordinated Universal Time (UTC), usually the letter `Z` or `z`. For details, see [time zones](#time-zones).

To learn more about the literal representation of a timestamp type,
see [Timestamp literals](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#timestamp_literals).

#### Time zones

A time zone is used when converting from a civil date or time (as might appear
on a calendar or clock) to a timestamp (an absolute time), or vice versa. This
includes the operation of parsing a string containing a civil date and time like
"2020-01-01 00:00:00" and converting it to a timestamp. The resulting timestamp
value itself doesn't store a specific time zone, because it represents one
instant in time globally.

Time zones are represented by strings in one of these canonical formats:

- Offset from Coordinated Universal Time (UTC), or the letter `Z` or `z` for UTC.
- Time zone name from the [tz database](http://www.iana.org/time-zones). BigQuery syncs intermittently with the database.

The following timestamps are identical because the time zone offset
for `America/Los_Angeles` is `-08` for the specified date and time.

```sql
SELECT UNIX_MILLIS(TIMESTAMP '2008-12-25 15:30:00 America/Los_Angeles') AS millis;
```

```sql
SELECT UNIX_MILLIS(TIMESTAMP '2008-12-25 15:30:00-08:00') AS millis;
```

##### Specify Coordinated Universal Time (UTC)

You can specify UTC using the following suffix:

```sql
{Z|z}
```

You can also specify UTC using the following time zone name:

```sql
{Etc/UTC}
```

The `Z` suffix is a placeholder that implies UTC when converting an [RFC
3339-format](https://datatracker.ietf.org/doc/html/rfc3339#page-10) value to a `TIMESTAMP` value. The value `Z` isn't
a valid time zone for functions that accept a time zone. If you're specifying a
time zone, or you're unsure of the format to use to specify UTC, we recommend
using the `Etc/UTC` time zone name.

The `Z` suffix isn't case sensitive. When using the `Z` suffix, no space is
allowed between the `Z` and the rest of the timestamp. The following are
examples of using the `Z` suffix and the `Etc/UTC` time zone name:

```sql
SELECT TIMESTAMP '2014-09-27T12:30:00.45Z'
SELECT TIMESTAMP '2014-09-27 12:30:00.45z'
SELECT TIMESTAMP '2014-09-27T12:30:00.45 Etc/UTC'
```

##### Specify an offset from Coordinated Universal Time (UTC)

You can specify the offset from UTC using the following format:

```sql
{+|-}H[H][:M[M]]
```

Examples:

```sql
-08:00
-8:15
+3:00
+07:30
-7
```

When using this format, no space is allowed between the time zone and the rest
of the timestamp.

```sql
2014-09-27 12:30:00.45-8:00
```

##### Time zone name

Format:

```sql
tz_identifier
```

A time zone name is a tz identifier from the
[tz database](http://www.iana.org/time-zones).
For a less comprehensive but simpler reference, see the
[List of tz database time zones](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
on Wikipedia.

Examples:

```sql
America/Los_Angeles
America/Argentina/Buenos_Aires
Etc/UTC
Pacific/Auckland
```

When using a time zone name, a space is required between the name and the rest
of the timestamp:

```sql
2014-09-27 12:30:00.45 America/Los_Angeles
```

Note that not all time zone names are interchangeable even if they do happen to
report the same time during a given part of the year. For example,
`America/Los_Angeles` reports the same time as `UTC-7:00` during daylight
saving time (DST), but reports the same time as `UTC-8:00` outside of DST.

If a time zone isn't specified, the default time zone value is used.

##### Leap seconds

A timestamp is simply an offset from 1970-01-01 00:00:00 UTC, assuming there are
exactly 60 seconds per minute. Leap seconds aren't represented as part of a
stored timestamp.

If the input contains values that use ":60" in the seconds field to represent a
leap second, that leap second isn't preserved when converting to a timestamp
value. Instead that value is interpreted as a timestamp with ":00" in the
seconds field of the following minute.

Leap seconds don't affect timestamp computations. All timestamp computations
are done using Unix-style timestamps, which don't reflect leap seconds. Leap
seconds are only observable through functions that measure real-world time. In
these functions, it's possible for a timestamp second to be skipped or repeated
when there is a leap second.

##### Daylight saving time

A timestamp is unaffected by daylight saving time (DST) because it represents a
point in time. When you display a timestamp as a civil time,
with a timezone that observes DST, the following rules apply:

- During the transition from standard time to DST, one hour is skipped. A
  civil time from the skipped hour is treated the same as if it were written
  an hour later. For example, in the `America/Los_Angeles` time zone, the hour
  between 2 AM and 3 AM on March 10, 2024 is skipped on a clock. The times
  2:30 AM and 3:30 AM on that date are treated as the same point in time:

  ```sql
  SELECT
  FORMAT_TIMESTAMP("%c %Z", "2024-03-10 02:30:00 America/Los_Angeles", "UTC") AS two_thirty,
  FORMAT_TIMESTAMP("%c %Z", "2024-03-10 03:30:00 America/Los_Angeles", "UTC") AS three_thirty;

  /*------------------------------+------------------------------+
   | two_thirty                   | three_thirty                 |
   +------------------------------+------------------------------+
   | Sun Mar 10 10:30:00 2024 UTC | Sun Mar 10 10:30:00 2024 UTC |
   +------------------------------+------------------------------*/
  ```

- When there's ambiguity in how to represent a civil time in a particular
  timezone because of DST, the later time is chosen:

  ```sql
  SELECT
  FORMAT_TIMESTAMP("%c %Z", "2024-03-10 10:30:00 UTC", "America/Los_Angeles") as ten_thirty;

  /*--------------------------------+
   | ten_thirty                     |
   +--------------------------------+
   | Sun Mar 10 03:30:00 2024 UTC-7 |
   +--------------------------------*/
  ```

- During the transition from DST to standard time, one hour is repeated. A
  civil time that shows a time during that hour is treated as if it's the
  earlier instance of that time. For example, in the `America/Los_Angeles` time
  zone, the hour between 1 AM and 2 AM on November 3, 2024, is repeated on a
  clock. The time 1:30 AM on that date is treated as the earlier (DST) instance
  of that time.

  ```sql
  SELECT
  FORMAT_TIMESTAMP("%c %Z", "2024-11-03 01:30:00 America/Los_Angeles", "UTC") as one_thirty,
  FORMAT_TIMESTAMP("%c %Z", "2024-11-03 02:30:00 America/Los_Angeles", "UTC") as two_thirty;

  /*------------------------------+------------------------------+
   | one_thirty                   | two_thirty                   |
   +------------------------------+------------------------------+
   | Sun Nov 3 08:30:00 2024 UTC  | Sun Nov 3 10:30:00 2024 UTC  |
   +------------------------------+------------------------------*/
  ```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Caution: The `Point` example `POINT(32 210)` has a latitude of 210, outside the range [-90, 90] that googlesql-functions/geography_functions-1.md states for latitudes. The official example is kept as is.
- Caution: The `MultiPolygon` example has an inner ring `(2 2, 3 4, 2 4, 1 9)` that does not end at its first point, unlike the closed ring `(2 2, 3 4, 2 4, 2 2)` in the `Polygon` example on this page. The official example is kept as is.

## Related

- [Index of this directory](./README.md)

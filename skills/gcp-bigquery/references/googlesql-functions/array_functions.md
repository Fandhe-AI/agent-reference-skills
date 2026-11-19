---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/array_functions
---

# Array functions

## Signature / Usage

GoogleSQL for BigQuery supports the following array functions.

### Function list

| Name | Summary |
|---|---|
| [`ARRAY`](#array) | Produces an array with one element for each row in a subquery. |
| [`ARRAY_AGG`](aggregate_functions.md#array_agg) | Gets an array of values. For more information, see [Aggregate functions](aggregate_functions.md). |
| [`ARRAY_CONCAT`](#array_concat) | Concatenates one or more arrays with the same element type into a single array. |
| [`ARRAY_CONCAT_AGG`](aggregate_functions.md#array_concat_agg) | Concatenates arrays and returns a single array as a result. For more information, see [Aggregate functions](aggregate_functions.md). |
| [`ARRAY_FIRST`](#array_first) | Gets the first element in an array. |
| [`ARRAY_LAST`](#array_last) | Gets the last element in an array. |
| [`ARRAY_LENGTH`](#array_length) | Gets the number of elements in an array. |
| [`ARRAY_REVERSE`](#array_reverse) | Reverses the order of elements in an array. |
| [`ARRAY_SLICE`](#array_slice) | Produces an array containing zero or more consecutive elements from an input array. |
| [`ARRAY_TO_STRING`](#array_to_string) | Produces a concatenation of the elements in an array as a `STRING` value. |
| [`GENERATE_ARRAY`](#generate_array) | Generates an array of values in a range. |
| [`GENERATE_DATE_ARRAY`](#generate_date_array) | Generates an array of dates in a range. |
| [`GENERATE_RANGE_ARRAY`](range-functions.md#generate_range_array) | Splits a range into an array of subranges. For more information, see [Range functions](range-functions.md). |
| [`GENERATE_TIMESTAMP_ARRAY`](#generate_timestamp_array) | Generates an array of timestamps in a range. |
| [`JSON_ARRAY`](json_functions-1.md#json_array) | Creates a JSON array. For more information, see [JSON functions](json_functions-1.md). |
| [`JSON_ARRAY_APPEND`](json_functions-1.md#json_array_append) | Appends JSON data to the end of a JSON array. For more information, see [JSON functions](json_functions-1.md). |
| [`JSON_ARRAY_INSERT`](json_functions-1.md#json_array_insert) | Inserts JSON data into a JSON array. For more information, see [JSON functions](json_functions-1.md). |
| [`JSON_EXTRACT_ARRAY`](json_functions-1.md#json_extract_array) | (Deprecated) Extracts a JSON array and converts it to a SQL `ARRAY<JSON-formatted STRING>` or `ARRAY<JSON>` value. For more information, see [JSON functions](json_functions-1.md). |
| [`JSON_EXTRACT_STRING_ARRAY`](json_functions-1.md#json_extract_string_array) | (Deprecated) Extracts a JSON array of scalar values and converts it to a SQL `ARRAY<STRING>` value. For more information, see [JSON functions](json_functions-1.md). |
| [`JSON_QUERY_ARRAY`](json_functions-2.md#json_query_array) | Extracts a JSON array and converts it to a SQL `ARRAY<JSON-formatted STRING>` or `ARRAY<JSON>` value. For more information, see [JSON functions](json_functions-1.md). |
| [`JSON_VALUE_ARRAY`](json_functions-2.md#json_value_array) | Extracts a JSON array of scalar values and converts it to a SQL `ARRAY<STRING>` value. For more information, see [JSON functions](json_functions-1.md). |
| [`RANGE_BUCKET`](mathematical_functions.md#range_bucket) | Scans through a sorted array and returns the 0-based position of a point's upper bound. For more information, see [Mathematical functions](mathematical_functions.md). |

### `ARRAY`

```sql
ARRAY(subquery)
```

**Description**

The `ARRAY` function returns an `ARRAY` with one element for each row in a
[subquery](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/subqueries).

If `subquery` produces a
SQL table,
the table must have exactly one column. Each element in the output `ARRAY` is
the value of the single column of a row in the table.

If `subquery` produces a
value table,
then each element in the output `ARRAY` is the entire corresponding row of the
value table.

**Constraints**

- Subqueries are unordered, so the elements of the output `ARRAY` aren't guaranteed to preserve any order in the source table for the subquery. However, if the subquery includes an `ORDER BY` clause, the `ARRAY` function will return an `ARRAY` that honors that clause.
- If the subquery returns more than one column, the `ARRAY` function returns an error.
- If the subquery returns an `ARRAY` typed column or `ARRAY` typed rows, the `ARRAY` function returns an error that GoogleSQL doesn't support `ARRAY`s with elements of type [`ARRAY`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#array_type).
- If the subquery returns zero rows, the `ARRAY` function returns an empty `ARRAY`. It never returns a `NULL` `ARRAY`.

**Return type**

`ARRAY`

**Examples**

```sql
SELECT ARRAY
  (SELECT 1 UNION ALL
   SELECT 2 UNION ALL
   SELECT 3) AS new_array;

/*-----------+
 | new_array |
 +-----------+
 | [1, 2, 3] |
 +-----------*/
```

To construct an `ARRAY` from a subquery that contains multiple
columns, change the subquery to use `SELECT AS STRUCT`. Now
the `ARRAY` function will return an `ARRAY` of `STRUCT`s. The `ARRAY` will
contain one `STRUCT` for each row in the subquery, and each of these `STRUCT`s
will contain a field for each column in that row.

```sql
SELECT
  ARRAY
    (SELECT AS STRUCT 1, 2, 3
     UNION ALL SELECT AS STRUCT 4, 5, 6) AS new_array;

/*------------------------+
 | new_array              |
 +------------------------+
 | [{1, 2, 3}, {4, 5, 6}] |
 +------------------------*/
```

Similarly, to construct an `ARRAY` from a subquery that contains
one or more `ARRAY`s, change the subquery to use `SELECT AS STRUCT`.

```sql
SELECT ARRAY
  (SELECT AS STRUCT [1, 2, 3] UNION ALL
   SELECT AS STRUCT [4, 5, 6]) AS new_array;

/*----------------------------+
 | new_array                  |
 +----------------------------+
 | [{[1, 2, 3]}, {[4, 5, 6]}] |
 +----------------------------*/
```

### `ARRAY_CONCAT`

```sql
ARRAY_CONCAT(array_expression[, ...])
```

**Description**

Concatenates one or more arrays with the same element type into a single array.

The function returns `NULL` if any input argument is `NULL`.

> [!NOTE]
> **Note:** You can also use the [\|\| concatenation operator](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/operators) to concatenate arrays.

**Return type**

`ARRAY`

**Examples**

```sql
SELECT ARRAY_CONCAT([1, 2], [3, 4], [5, 6]) as count_to_six;

/*--------------------------------------------------+
 | count_to_six                                     |
 +--------------------------------------------------+
 | [1, 2, 3, 4, 5, 6]                               |
 +--------------------------------------------------*/
```

### `ARRAY_FIRST`

```sql
ARRAY_FIRST(array_expression)
```

**Description**

Takes an array and returns the first element in the array.

Produces an error if the array is empty.

Returns `NULL` if `array_expression` is `NULL`.

> [!NOTE]
> **Note:** To get the last element in an array, see [`ARRAY_LAST`](#array_last).

**Return type**

Matches the data type of elements in `array_expression`.

**Example**

```sql
SELECT ARRAY_FIRST(['a','b','c','d']) as first_element

/*---------------+
 | first_element |
 +---------------+
 | a             |
 +---------------*/
```

### `ARRAY_LAST`

```sql
ARRAY_LAST(array_expression)
```

**Description**

Takes an array and returns the last element in the array.

Produces an error if the array is empty.

Returns `NULL` if `array_expression` is `NULL`.

> [!NOTE]
> **Note:** To get the first element in an array, see [`ARRAY_FIRST`](#array_first).

**Return type**

Matches the data type of elements in `array_expression`.

**Example**

```sql
SELECT ARRAY_LAST(['a','b','c','d']) as last_element

/*---------------+
 | last_element  |
 +---------------+
 | d             |
 +---------------*/
```

### `ARRAY_LENGTH`

```sql
ARRAY_LENGTH(array_expression)
```

**Description**

Returns the size of the array. Returns 0 for an empty array. Returns `NULL` if
the `array_expression` is `NULL`.

**Return type**

`INT64`

**Examples**

```sql
SELECT
  ARRAY_LENGTH(["coffee", NULL, "milk" ]) AS size_a,
  ARRAY_LENGTH(["cake", "pie"]) AS size_b;

/*--------+--------+
 | size_a | size_b |
 +--------+--------+
 | 3      | 2      |
 +--------+--------*/
```

### `ARRAY_REVERSE`

```sql
ARRAY_REVERSE(value)
```

**Description**

Returns the input `ARRAY` with elements in reverse order.

**Return type**

`ARRAY`

**Examples**

```sql
SELECT ARRAY_REVERSE([1, 2, 3]) AS reverse_arr

/*-------------+
 | reverse_arr |
 +-------------+
 | [3, 2, 1]   |
 +-------------*/
```

### `ARRAY_SLICE`

```sql
ARRAY_SLICE(array_to_slice, start_offset, end_offset)
```

**Description**

Returns an array containing zero or more consecutive elements from the
input array.

- `array_to_slice`: The array that contains the elements you want to slice.
- `start_offset`: The inclusive starting offset.
- `end_offset`: The inclusive ending offset.

An offset can be positive or negative. A positive offset starts from the
beginning of the input array and is 0-based. A negative offset starts from
the end of the input array. Out-of-bounds offsets are supported. Here are some
examples:

<br />

| Input offset | Final offset in array | Notes |
|---|---|---|
| 0 | \[**'a'**, 'b', 'c', 'd'\] | The final offset is `0`. |
| 3 | \['a', 'b', 'c', **'d'**\] | The final offset is `3`. |
| 5 | \['a', 'b', 'c', **'d'**\] | Because the input offset is out of bounds, the final offset is `3` (`array length - 1`). |
| -1 | \['a', 'b', 'c', **'d'**\] | Because a negative offset is used, the offset starts at the end of the array. The final offset is `3` (`array length - 1`). |
| -2 | \['a', 'b', **'c'**, 'd'\] | Because a negative offset is used, the offset starts at the end of the array. The final offset is `2` (`array length - 2`). |
| -4 | \[**'a'**, 'b', 'c', 'd'\] | Because a negative offset is used, the offset starts at the end of the array. The final offset is `0` (`array length - 4`). |
| -5 | \[**'a'**, 'b', 'c', 'd'\] | Because the offset is negative and out of bounds, the final offset is `0` (`array length - array length`). |

<br />

Additional details:

- The input array can contain `NULL` elements. `NULL` elements are included in the resulting array.
- Returns `NULL` if `array_to_slice`, `start_offset`, or `end_offset` is `NULL`.
- Returns an empty array if `array_to_slice` is empty.
- Returns an empty array if the position of the `start_offset` in the array is after the position of the `end_offset`.

**Return type**

`ARRAY`

**Examples**

```sql
SELECT ARRAY_SLICE(['a', 'b', 'c', 'd', 'e'], 1, 3) AS result

/*-----------+
 | result    |
 +-----------+
 | [b, c, d] |
 +-----------*/
```

```sql
SELECT ARRAY_SLICE(['a', 'b', 'c', 'd', 'e'], -1, 3) AS result

/*-----------+
 | result    |
 +-----------+
 | []        |
 +-----------*/
```

```sql
SELECT ARRAY_SLICE(['a', 'b', 'c', 'd', 'e'], 1, -3) AS result

/*--------+
 | result |
 +--------+
 | [b, c] |
 +--------*/
```

```sql
SELECT ARRAY_SLICE(['a', 'b', 'c', 'd', 'e'], -1, -3) AS result

/*-----------+
 | result    |
 +-----------+
 | []        |
 +-----------*/
```

```sql
SELECT ARRAY_SLICE(['a', 'b', 'c', 'd', 'e'], -3, -1) AS result

/*-----------+
 | result    |
 +-----------+
 | [c, d, e] |
 +-----------*/
```

```sql
SELECT ARRAY_SLICE(['a', 'b', 'c', 'd', 'e'], 3, 3) AS result

/*--------+
 | result |
 +--------+
 | [d]    |
 +--------*/
```

```sql
SELECT ARRAY_SLICE(['a', 'b', 'c', 'd', 'e'], -3, -3) AS result

/*--------+
 | result |
 +--------+
 | [c]    |
 +--------*/
```

```sql
SELECT ARRAY_SLICE(['a', 'b', 'c', 'd', 'e'], 1, 30) AS result

/*--------------+
 | result       |
 +--------------+
 | [b, c, d, e] |
 +--------------*/
```

```sql
SELECT ARRAY_SLICE(['a', 'b', 'c', 'd', 'e'], 1, -30) AS result

/*-----------+
 | result    |
 +-----------+
 | []        |
 +-----------*/
```

```sql
SELECT ARRAY_SLICE(['a', 'b', 'c', 'd', 'e'], -30, 30) AS result

/*-----------------+
 | result          |
 +-----------------+
 | [a, b, c, d, e] |
 +-----------------*/
```

```sql
SELECT ARRAY_SLICE(['a', 'b', 'c', 'd', 'e'], -30, -5) AS result

/*--------+
 | result |
 +--------+
 | [a]    |
 +--------*/
```

```sql
SELECT ARRAY_SLICE(['a', 'b', 'c', 'd', 'e'], 5, 30) AS result

/*--------+
 | result |
 +--------+
 | []     |
 +--------*/
```

```sql
SELECT ARRAY_SLICE(['a', 'b', 'c', 'd', 'e'], 1, NULL) AS result

/*-----------+
 | result    |
 +-----------+
 | NULL      |
 +-----------*/
```

### `ARRAY_TO_STRING`

```sql
ARRAY_TO_STRING(array_expression, delimiter[, null_text])
```

**Description**

Returns a concatenation of the elements in `array_expression` as a `STRING`
or `BYTES` value. The value for `array_expression` can
either be an array of `STRING` or `BYTES` data type.

If the `null_text` parameter is used, the function replaces any `NULL` values in
the array with the value of `null_text`.

If the `null_text` parameter isn't used, the function omits the `NULL` value
and its preceding delimiter.

**Return type**

- `STRING` for a function signature with `STRING` input.
- `BYTES` for a function signature with `BYTES` input.

**Examples**

```sql
SELECT ARRAY_TO_STRING(['coffee', 'tea', 'milk', NULL], '--', 'MISSING') AS text

/*--------------------------------+
 | text                           |
 +--------------------------------+
 | coffee--tea--milk--MISSING     |
 +--------------------------------*/
```

```sql
SELECT ARRAY_TO_STRING(['cake', 'pie', NULL], '--', 'MISSING') AS text

/*--------------------------------+
 | text                           |
 +--------------------------------+
 | cake--pie--MISSING             |
 +--------------------------------*/
```

```sql
SELECT ARRAY_TO_STRING([b'prefix', b'middle', b'suffix', b'\x00'], b'--') AS data

/*--------------------------------+
 | data                           |
 +--------------------------------+
 | prefix--middle--suffix--\x00   |
 +--------------------------------*/
```

### `GENERATE_ARRAY`

```sql
GENERATE_ARRAY(start_expression, end_expression[, step_expression])
```

**Description**

Returns an array of values. The `start_expression` and `end_expression`
parameters determine the inclusive start and end of the array.

The `GENERATE_ARRAY` function accepts the following data types as inputs:

- `INT64`
- `NUMERIC`
- `BIGNUMERIC`
- `FLOAT64`

The `step_expression` parameter determines the increment used to
generate array values. The default value for this parameter is `1`.

The `GENERATE_ARRAY` function returns an error if any of the following are true:

- `step_expression` evaluates to 0.
- Any input is `NaN`.
- The resulting array is too large. BigQuery has a hard limit of 1,048,576 elements.

If any argument is `NULL`, the function returns a `NULL` array.

**Return Data Type**

`ARRAY`

**Examples**

The following returns an array of integers, with a default step of 1.

```sql
SELECT GENERATE_ARRAY(1, 5) AS example_array;

/*-----------------+
 | example_array   |
 +-----------------+
 | [1, 2, 3, 4, 5] |
 +-----------------*/
```

The following returns an array using a user-specified step size.

```sql
SELECT GENERATE_ARRAY(0, 10, 3) AS example_array;

/*---------------+
 | example_array |
 +---------------+
 | [0, 3, 6, 9]  |
 +---------------*/
```

The following returns an array using a negative value, `-3` for its step size.

```sql
SELECT GENERATE_ARRAY(10, 0, -3) AS example_array;

/*---------------+
 | example_array |
 +---------------+
 | [10, 7, 4, 1] |
 +---------------*/
```

The following returns an array using the same value for the `start_expression`
and `end_expression`.

```sql
SELECT GENERATE_ARRAY(4, 4, 10) AS example_array;

/*---------------+
 | example_array |
 +---------------+
 | [4]           |
 +---------------*/
```

The following returns an empty array, because the `start_expression` is greater
than the `end_expression`, and the `step_expression` value is positive.

```sql
SELECT GENERATE_ARRAY(10, 0, 3) AS example_array;

/*---------------+
 | example_array |
 +---------------+
 | []            |
 +---------------*/
```

The following returns a `NULL` array because `end_expression` is `NULL`.

```sql
SELECT GENERATE_ARRAY(5, NULL, 1) AS example_array;

/*---------------+
 | example_array |
 +---------------+
 | NULL          |
 +---------------*/
```

The following returns multiple arrays.

```sql
SELECT GENERATE_ARRAY(start, 5) AS example_array
FROM UNNEST([3, 4, 5]) AS start;

/*---------------+
 | example_array |
 +---------------+
 | [3, 4, 5]     |
 | [4, 5]        |
 | [5]           |
 +---------------*/
```

### `GENERATE_DATE_ARRAY`

```sql
GENERATE_DATE_ARRAY(start_date, end_date[, INTERVAL step_size step_unit])
```

**Description**

Returns an array of dates. The `start_date` and `end_date`
parameters determine the inclusive start and end of the array.

The `GENERATE_DATE_ARRAY` function accepts the following data types as inputs:

- `start_date`: `DATE`
- `end_date`: `DATE`
- `step_size`: `INT64`
- `step_unit`: `DAY`, `WEEK`, `MONTH`, `QUARTER`, or `YEAR`.

The `step_size` parameter determines the increment used to generate dates. The
default value for this parameter is 1 day.

The `GENERATE_DATE_ARRAY` function returns an error if any of the following are
true:

- `step_size` is set to 0.
- The resulting array exceeds the maximum size allowed by the engine. BigQuery has a hard limit of 1,048,576 elements.

**Return Data Type**

`ARRAY` containing 0 or more `DATE` values.

**Examples**

The following returns an array of dates, with a default step of 1.

```sql
SELECT GENERATE_DATE_ARRAY('2016-10-05', '2016-10-08') AS example;

/*--------------------------------------------------+
 | example                                          |
 +--------------------------------------------------+
 | [2016-10-05, 2016-10-06, 2016-10-07, 2016-10-08] |
 +--------------------------------------------------*/
```

The following returns an array using a user-specified step size.

```sql
SELECT GENERATE_DATE_ARRAY(
 '2016-10-05', '2016-10-09', INTERVAL 2 DAY) AS example;

/*--------------------------------------+
 | example                              |
 +--------------------------------------+
 | [2016-10-05, 2016-10-07, 2016-10-09] |
 +--------------------------------------*/
```

The following returns an array using a negative value, `-3` for its step size.

```sql
SELECT GENERATE_DATE_ARRAY('2016-10-05',
  '2016-10-01', INTERVAL -3 DAY) AS example;

/*--------------------------+
 | example                  |
 +--------------------------+
 | [2016-10-05, 2016-10-02] |
 +--------------------------*/
```

The following returns an array using the same value for the `start_date`and
`end_date`.

```sql
SELECT GENERATE_DATE_ARRAY('2016-10-05',
  '2016-10-05', INTERVAL 8 DAY) AS example;

/*--------------+
 | example      |
 +--------------+
 | [2016-10-05] |
 +--------------*/
```

The following returns an empty array, because the `start_date` is greater
than the `end_date`, and the `step` value is positive.

```sql
SELECT GENERATE_DATE_ARRAY('2016-10-05',
  '2016-10-01', INTERVAL 1 DAY) AS example;

/*---------+
 | example |
 +---------+
 | []      |
 +---------*/
```

The following returns a `NULL` array, because one of its inputs is
`NULL`.

```sql
SELECT GENERATE_DATE_ARRAY('2016-10-05', NULL) AS example;

/*---------+
 | example |
 +---------+
 | NULL    |
 +---------*/
```

The following returns an array of dates, using MONTH as the `step_unit`
interval:

```sql
SELECT GENERATE_DATE_ARRAY('2016-01-01',
  '2016-12-31', INTERVAL 2 MONTH) AS example;

/*--------------------------------------------------------------------------+
 | example                                                                  |
 +--------------------------------------------------------------------------+
 | [2016-01-01, 2016-03-01, 2016-05-01, 2016-07-01, 2016-09-01, 2016-11-01] |
 +--------------------------------------------------------------------------*/
```

The following uses non-constant dates to generate an array.

```sql
SELECT GENERATE_DATE_ARRAY(date_start, date_end, INTERVAL 1 WEEK) AS date_range
FROM (
  SELECT DATE '2016-01-01' AS date_start, DATE '2016-01-31' AS date_end
  UNION ALL SELECT DATE "2016-04-01", DATE "2016-04-30"
  UNION ALL SELECT DATE "2016-07-01", DATE "2016-07-31"
  UNION ALL SELECT DATE "2016-10-01", DATE "2016-10-31"
) AS items;

/*--------------------------------------------------------------+
 | date_range                                                   |
 +--------------------------------------------------------------+
 | [2016-01-01, 2016-01-08, 2016-01-15, 2016-01-22, 2016-01-29] |
 | [2016-04-01, 2016-04-08, 2016-04-15, 2016-04-22, 2016-04-29] |
 | [2016-07-01, 2016-07-08, 2016-07-15, 2016-07-22, 2016-07-29] |
 | [2016-10-01, 2016-10-08, 2016-10-15, 2016-10-22, 2016-10-29] |
 +--------------------------------------------------------------*/
```

### `GENERATE_TIMESTAMP_ARRAY`

```sql
GENERATE_TIMESTAMP_ARRAY(start_timestamp, end_timestamp,
                         INTERVAL step_size step_unit)
```

**Description**

Returns an `ARRAY` of `TIMESTAMPS` separated by a given interval. The
`start_timestamp` and `end_timestamp` parameters determine the inclusive
lower and upper bounds of the `ARRAY`.

The `GENERATE_TIMESTAMP_ARRAY` function accepts the following data types as
inputs:

- `start_timestamp`: `TIMESTAMP`
- `end_timestamp`: `TIMESTAMP`
- `step_size`: `INT64`
- `step_unit`: `MICROSECOND`, `MILLISECOND`, `SECOND`, `MINUTE`, `HOUR`, or `DAY`.

The `step_size` parameter determines the increment used to generate
timestamps.

The `GENERATE_TIMESTAMP_ARRAY` function returns an error if any of the following
are true:

- `step_size` evaluates to 0.
- The resulting array exceeds the maximum size allowed by the engine. BigQuery has a hard limit of 1,048,576 elements.

**Return Data Type**

An `ARRAY` containing 0 or more `TIMESTAMP` values.

**Examples**

The following example returns an `ARRAY` of `TIMESTAMP`s at intervals of 1 day.

```sql
SELECT GENERATE_TIMESTAMP_ARRAY('2016-10-05 00:00:00', '2016-10-07 00:00:00',
                                INTERVAL 1 DAY) AS timestamp_array;

/*--------------------------------------------------------------------------+
 | timestamp_array                                                          |
 +--------------------------------------------------------------------------+
 | [2016-10-05 00:00:00+00, 2016-10-06 00:00:00+00, 2016-10-07 00:00:00+00] |
 +--------------------------------------------------------------------------*/
```

The following example returns an `ARRAY` of `TIMESTAMP`s at intervals of 1
second.

```sql
SELECT GENERATE_TIMESTAMP_ARRAY('2016-10-05 00:00:00', '2016-10-05 00:00:02',
                                INTERVAL 1 SECOND) AS timestamp_array;

/*--------------------------------------------------------------------------+
 | timestamp_array                                                          |
 +--------------------------------------------------------------------------+
 | [2016-10-05 00:00:00+00, 2016-10-05 00:00:01+00, 2016-10-05 00:00:02+00] |
 +--------------------------------------------------------------------------*/
```

The following example returns an `ARRAY` of `TIMESTAMPS` with a negative
interval.

```sql
SELECT GENERATE_TIMESTAMP_ARRAY('2016-10-06 00:00:00', '2016-10-01 00:00:00',
                                INTERVAL -2 DAY) AS timestamp_array;

/*--------------------------------------------------------------------------+
 | timestamp_array                                                          |
 +--------------------------------------------------------------------------+
 | [2016-10-06 00:00:00+00, 2016-10-04 00:00:00+00, 2016-10-02 00:00:00+00] |
 +--------------------------------------------------------------------------*/
```

The following example returns an `ARRAY` with a single element, because
`start_timestamp` and `end_timestamp` have the same value.

```sql
SELECT GENERATE_TIMESTAMP_ARRAY('2016-10-05 00:00:00', '2016-10-05 00:00:00',
                                INTERVAL 1 HOUR) AS timestamp_array;

/*--------------------------+
 | timestamp_array          |
 +--------------------------+
 | [2016-10-05 00:00:00+00] |
 +--------------------------*/
```

The following example returns an empty `ARRAY`, because `start_timestamp` is
later than `end_timestamp`.

```sql
SELECT GENERATE_TIMESTAMP_ARRAY('2016-10-06 00:00:00', '2016-10-05 00:00:00',
                                INTERVAL 1 HOUR) AS timestamp_array;

/*-----------------+
 | timestamp_array |
 +-----------------+
 | []              |
 +-----------------*/
```

The following example returns a null `ARRAY`, because one of the inputs is
`NULL`.

```sql
SELECT GENERATE_TIMESTAMP_ARRAY('2016-10-05 00:00:00', NULL, INTERVAL 1 HOUR)
  AS timestamp_array;

/*-----------------+
 | timestamp_array |
 +-----------------+
 | NULL            |
 +-----------------*/
```

The following example generates `ARRAY`s of `TIMESTAMP`s from columns containing
values for `start_timestamp` and `end_timestamp`.

```sql
SELECT GENERATE_TIMESTAMP_ARRAY(start_timestamp, end_timestamp, INTERVAL 1 HOUR)
  AS timestamp_array
FROM
  (SELECT
    TIMESTAMP '2016-10-05 00:00:00' AS start_timestamp,
    TIMESTAMP '2016-10-05 02:00:00' AS end_timestamp
   UNION ALL
   SELECT
    TIMESTAMP '2016-10-05 12:00:00' AS start_timestamp,
    TIMESTAMP '2016-10-05 14:00:00' AS end_timestamp
   UNION ALL
   SELECT
    TIMESTAMP '2016-10-05 23:59:00' AS start_timestamp,
    TIMESTAMP '2016-10-06 01:59:00' AS end_timestamp);

/*--------------------------------------------------------------------------+
 | timestamp_array                                                          |
 +--------------------------------------------------------------------------+
 | [2016-10-05 00:00:00+00, 2016-10-05 01:00:00+00, 2016-10-05 02:00:00+00] |
 | [2016-10-05 12:00:00+00, 2016-10-05 13:00:00+00, 2016-10-05 14:00:00+00] |
 | [2016-10-05 23:59:00+00, 2016-10-06 00:59:00+00, 2016-10-06 01:59:00+00] |
 +--------------------------------------------------------------------------*/
```

### Supplemental materials

#### OFFSET and ORDINAL

For information about using `OFFSET` and `ORDINAL` with arrays, see
[Array subscript operator](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/operators#array_subscript_operator) and [Accessing array
elements](https://docs.cloud.google.com/bigquery/docs/arrays#accessing_array_elements).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/array_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

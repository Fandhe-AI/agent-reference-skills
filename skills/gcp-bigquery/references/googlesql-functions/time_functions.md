---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/time_functions
---

# Time functions

## Signature / Usage

GoogleSQL for BigQuery supports the following time functions.

### Function list

| Name | Summary |
|---|---|
| [`CURRENT_TIME`](#current_time) | Returns the current time as a `TIME` value. |
| [`EXTRACT`](#extract) | Extracts part of a `TIME` value. |
| [`FORMAT_TIME`](#format_time) | Formats a `TIME` value according to the specified format string. |
| [`PARSE_TIME`](#parse_time) | Converts a `STRING` value to a `TIME` value. |
| [`TIME`](#time) | Constructs a `TIME` value. |
| [`TIME_ADD`](#time_add) | Adds a specified time interval to a `TIME` value. |
| [`TIME_DIFF`](#time_diff) | Gets the number of unit boundaries between two `TIME` values at a particular time granularity. |
| [`TIME_SUB`](#time_sub) | Subtracts a specified time interval from a `TIME` value. |
| [`TIME_TRUNC`](#time_trunc) | Truncates a `TIME` value at a particular granularity. |

### `CURRENT_TIME`

```sql
CURRENT_TIME([time_zone])
```

```sql
CURRENT_TIME
```

**Description**

Returns the current time as a `TIME` object. Parentheses are optional when
called with no arguments.

This function supports an optional `time_zone` parameter.
See [Time zone definitions](timestamp_functions.md#how-time-zones-work-with-timestamp-functions) for information
on how to specify a time zone.

The current time value is set at the start of the query statement that contains
this function. All invocations of `CURRENT_TIME()` within a query statement
yield the same value.

**Return Data Type**

`TIME`

**Example**

```sql
SELECT CURRENT_TIME() as now;

/*----------------------------+
 | now                        |
 +----------------------------+
 | 15:31:38.776361            |
 +----------------------------*/
```

### `EXTRACT`

```sql
EXTRACT(part FROM time_expression)
```

**Description**

Returns a value that corresponds to the specified `part` from
a supplied `time_expression`.

Allowed `part` values are:

- `MICROSECOND`
- `MILLISECOND`
- `SECOND`
- `MINUTE`
- `HOUR`

Returned values truncate lower order time periods. For example, when extracting
seconds, `EXTRACT` truncates the millisecond and microsecond values.

**Return Data Type**

`INT64`

**Example**

In the following example, `EXTRACT` returns a value corresponding to the `HOUR`
time part.

```sql
SELECT EXTRACT(HOUR FROM TIME "15:30:00") as hour;

/*------------------+
 | hour             |
 +------------------+
 | 15               |
 +------------------*/
```

### `FORMAT_TIME`

```sql
FORMAT_TIME(format_string, time_expr)
```

**Description**

Formats a `TIME` value according to the specified format string.

**Definitions**

- `format_string`: A `STRING` value that contains the [format elements](../googlesql-syntax/format-elements.md#format-elements-for-date-and-time-parts) to use with `time_expr`.
- `time_expr`: A `TIME` value that represents the time to format.

**Return Data Type**

`STRING`

**Example**

```sql
SELECT FORMAT_TIME("%R", TIME "15:30:00") as formatted_time;

/*----------------+
 | formatted_time |
 +----------------+
 | 15:30          |
 +----------------*/
```

### `PARSE_TIME`

```sql
PARSE_TIME(format_string, time_string)
```

**Description**

Converts a `STRING` value to a `TIME` value.

**Definitions**

- `format_string`: A `STRING` value that contains the [format elements](../googlesql-syntax/format-elements.md#format-elements-for-date-and-time-parts) to use with `time_string`.
- `time_string`: A `STRING` value that represents the time to parse.

**Details**

Each element in `time_string` must have a corresponding element in
`format_string`. The location of each element in `format_string` must match the
location of each element in `time_string`.

```sql
-- This works because elements on both sides match.
SELECT PARSE_TIME("%I:%M:%S", "07:30:00");

-- This produces an error because the seconds element is in different locations.
SELECT PARSE_TIME("%S:%I:%M", "07:30:00");

-- This produces an error because one of the seconds elements is missing.
SELECT PARSE_TIME("%I:%M", "07:30:00");

-- This works because %T can find all matching elements in time_string.
SELECT PARSE_TIME("%T", "07:30:00");
```

The format string fully supports most format elements except for `%P`.

The following additional considerations apply when using the `PARSE_TIME`
function:

- Unspecified fields. Any unspecified field is initialized from `00:00:00.0`. For instance, if `seconds` is unspecified then it defaults to `00`, and so on.
- Whitespace. One or more consecutive white spaces in the format string matches zero or more consecutive white spaces in the `TIME` string. In addition, leading and trailing white spaces in the `TIME` string are always allowed, even if they aren't in the format string.
- Format precedence. When two (or more) format elements have overlapping information, the last one generally overrides any earlier ones.
- Format divergence. `%p` can be used with `am`, `AM`, `pm`, and `PM`.

**Return Data Type**

`TIME`

**Example**

```sql
SELECT PARSE_TIME("%H", "15") as parsed_time;

/*-------------+
 | parsed_time |
 +-------------+
 | 15:00:00    |
 +-------------*/
```

```sql
SELECT PARSE_TIME('%I:%M:%S %p', '2:23:38 pm') AS parsed_time;

/*-------------+
 | parsed_time |
 +-------------+
 | 14:23:38    |
 +-------------*/
```

### `TIME`

Adapted (not in the official docs): Moved the comma inside the brackets of the optional `time_zone`.

```sql
1. TIME(hour, minute, second)
2. TIME(timestamp[, time_zone])
3. TIME(datetime)
```

**Description**

1. Constructs a `TIME` object using `INT64` values representing the hour, minute, and second.
2. Constructs a `TIME` object using a `TIMESTAMP` object. It supports an optional parameter to [specify a time zone](timestamp_functions.md#how-time-zones-work-with-timestamp-functions). If no time zone is specified, the default time zone, UTC, is used.
3. Constructs a `TIME` object using a `DATETIME` object.

**Return Data Type**

`TIME`

**Example**

```sql
SELECT
  TIME(15, 30, 00) as time_hms,
  TIME(TIMESTAMP "2008-12-25 15:30:00+08", "America/Los_Angeles") as time_tstz;

/*----------+-----------+
 | time_hms | time_tstz |
 +----------+-----------+
 | 15:30:00 | 23:30:00  |
 +----------+-----------*/
```

```sql
SELECT TIME(DATETIME "2008-12-25 15:30:00.000000") AS time_dt;

/*----------+
 | time_dt  |
 +----------+
 | 15:30:00 |
 +----------*/
```

### `TIME_ADD`

```sql
TIME_ADD(time_expression, INTERVAL step_size step_unit)
```

**Description**

Adds `step_size` units of `step_unit` to the `TIME` object.

`TIME_ADD` supports the following values for `step_unit`:

- `MICROSECOND`
- `MILLISECOND`
- `SECOND`
- `MINUTE`
- `HOUR`

This function automatically adjusts when values fall outside of the 00:00:00 to
24:00:00 boundary. For example, if you add an hour to `23:30:00`, the returned
value is `00:30:00`.

**Return Data Types**

`TIME`

**Example**

```sql
SELECT
  TIME "15:30:00" as original_time,
  TIME_ADD(TIME "15:30:00", INTERVAL 10 MINUTE) as later;

/*-----------------------------+------------------------+
 | original_time               | later                  |
 +-----------------------------+------------------------+
 | 15:30:00                    | 15:40:00               |
 +-----------------------------+------------------------*/
```

### `TIME_DIFF`

```sql
TIME_DIFF(end_time, start_time, granularity)
```

**Description**

Gets the number of unit boundaries between two `TIME` values (`end_time` -
`start_time`) at a particular time granularity.

**Definitions**

- `start_time`: The starting `TIME` value.
- `end_time`: The ending `TIME` value.
- `granularity`: The time part that represents the granularity. If
  you passed in `TIME` values for the first arguments, `granularity` can
  be:

  - `MICROSECOND`
  - `MILLISECOND`
  - `SECOND`
  - `MINUTE`
  - `HOUR`

**Details**

If `end_time` is earlier than `start_time`, the output is 0 or negative.
Decimals are always truncated rather than rounded. For example, both 3.9 and 3.1
become 3, while -3.9 and -3.1 become -3 (instead of -4).

Produces an error if the computation overflows, such as if the difference
in microseconds
between the two `TIME` values overflows.

> [!NOTE]
> **Note:** The behavior of the this function follows the type of arguments passed in. For example, `TIME_DIFF(TIMESTAMP, TIMESTAMP, PART)` behaves like `TIMESTAMP_DIFF(TIMESTAMP, TIMESTAMP, PART)`.

**Return Data Type**

`INT64`

**Examples**

```sql
SELECT
  TIME "15:30:00" as first_time,
  TIME "14:35:00" as second_time,
  TIME_DIFF(TIME "15:30:00", TIME "14:35:00", MINUTE) as difference;

/*----------------------------+------------------------+------------------------+
 | first_time                 | second_time            | difference             |
 +----------------------------+------------------------+------------------------+
 | 15:30:00                   | 14:35:00               | 55                     |
 +----------------------------+------------------------+------------------------*/
```

In the following example, `TIME_DIFF` truncates the output rather than
rounding it. Both 3 hours 54 minutes (3.9 hours) and 3 hours 6 minutes (3.1
hours) truncate to 3 hours, and their negative counterparts truncate to -3
hours:

```sql
SELECT
  TIME_DIFF(TIME '04:54:00', TIME '01:00:00', HOUR) AS diff_3_9,
  TIME_DIFF(TIME '04:06:00', TIME '01:00:00', HOUR) AS diff_3_1,
  TIME_DIFF(TIME '01:00:00', TIME '04:54:00', HOUR) AS diff_negative_3_9,
  TIME_DIFF(TIME '01:00:00', TIME '04:06:00', HOUR) AS diff_negative_3_1;

/*----------+----------+-------------------+-------------------+
 | diff_3_9 | diff_3_1 | diff_negative_3_9 | diff_negative_3_1 |
 +----------+----------+-------------------+-------------------+
 | 3        | 3        | -3                | -3                |
 +----------+----------+-------------------+-------------------*/
```

### `TIME_SUB`

```sql
TIME_SUB(time_expression, INTERVAL step_size step_unit)
```

**Description**

Subtracts `step_size` units of `step_unit` from the `TIME` object.

`TIME_SUB` supports the following values for `step_unit`:

- `MICROSECOND`
- `MILLISECOND`
- `SECOND`
- `MINUTE`
- `HOUR`

This function automatically adjusts when values fall outside of the 00:00:00 to
24:00:00 boundary. For example, if you subtract an hour from `00:30:00`, the
returned value is `23:30:00`.

**Return Data Type**

`TIME`

**Example**

```sql
SELECT
  TIME "15:30:00" as original_date,
  TIME_SUB(TIME "15:30:00", INTERVAL 10 MINUTE) as earlier;

/*-----------------------------+------------------------+
 | original_date               | earlier                |
 +-----------------------------+------------------------+
 | 15:30:00                    | 15:20:00               |
 +-----------------------------+------------------------*/
```

### `TIME_TRUNC`

```sql
TIME_TRUNC(time_value, time_granularity)
```

**Description**

Truncates a `TIME` value at a particular granularity.

**Definitions**

- `time_value`: The `TIME` value to truncate.
- `time_granularity`: The truncation granularity for a `TIME` value. [Time granularities](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/time_functions#time_trunc_granularity_time) can be used.

**Time granularity definitions**

- `MICROSECOND`: If used, nothing is truncated from the value.

- `MILLISECOND`: The nearest lesser than or equal millisecond.

- `SECOND`: The nearest lesser than or equal second.

- `MINUTE`: The nearest lesser than or equal minute.

- `HOUR`: The nearest lesser than or equal hour.

**Details**

The resulting value is always rounded to the beginning of `granularity`.

**Return Data Type**

`TIME`

**Example**

```sql
SELECT
  TIME "15:30:00" as original,
  TIME_TRUNC(TIME "15:30:00", HOUR) as truncated;

/*----------------------------+------------------------+
 | original                   | truncated              |
 +----------------------------+------------------------+
 | 15:30:00                   | 15:00:00               |
 +----------------------------+------------------------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/time_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: The second `TIME` signature writes the comma outside the brackets, so omitting `time_zone` leaves a trailing comma. The comma is moved inside the brackets, as in `CURRENT_TIME([time_zone])`.

## Related

- [Index of this directory](./README.md)

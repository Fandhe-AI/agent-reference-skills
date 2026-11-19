---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions
---

# Timestamp functions

## Signature / Usage

GoogleSQL for BigQuery supports the following timestamp functions.

> [!IMPORTANT]
> **Important:** Before working with these functions, you need to understand the difference between the formats in which timestamps are stored and displayed, and how time zones are used for the conversion between these formats. To learn more, see [How time zones work with timestamp functions](#how-time-zones-work-with-timestamp-functions).

> [!NOTE]
> **Note:** These functions return a runtime error if overflow occurs; result values are bounded by the defined [`DATE` range](../googlesql-syntax/data-types.md#date-type) and [`TIMESTAMP` range](../googlesql-syntax/data-types.md#timestamp-type).

### Function list

| Name | Summary |
|---|---|
| [`CURRENT_TIMESTAMP`](#current_timestamp) | Returns the current date and time as a `TIMESTAMP` object. |
| [`EXTRACT`](#extract) | Extracts part of a `TIMESTAMP` value. |
| [`FORMAT_TIMESTAMP`](#format_timestamp) | Formats a `TIMESTAMP` value according to the specified format string. |
| [`GENERATE_TIMESTAMP_ARRAY`](array_functions.md#generate_timestamp_array) | Generates an array of timestamps in a range. For more information, see [Array functions](array_functions.md). |
| [`PARSE_TIMESTAMP`](#parse_timestamp) | Converts a `STRING` value to a `TIMESTAMP` value. |
| [`STRING` (Timestamp)](#string) | Converts a `TIMESTAMP` value to a `STRING` value. |
| [`TIMESTAMP`](#timestamp) | Constructs a `TIMESTAMP` value. |
| [`TIMESTAMP_ADD`](#timestamp_add) | Adds a specified time interval to a `TIMESTAMP` value. |
| [`TIMESTAMP_DIFF`](#timestamp_diff) | Gets the number of unit boundaries between two `TIMESTAMP` values at a particular time granularity. |
| [`TIMESTAMP_MICROS`](#timestamp_micros) | Converts the number of microseconds since 1970-01-01 00:00:00 UTC to a `TIMESTAMP`. |
| [`TIMESTAMP_MILLIS`](#timestamp_millis) | Converts the number of milliseconds since 1970-01-01 00:00:00 UTC to a `TIMESTAMP`. |
| [`TIMESTAMP_SECONDS`](#timestamp_seconds) | Converts the number of seconds since 1970-01-01 00:00:00 UTC to a `TIMESTAMP`. |
| [`TIMESTAMP_SUB`](#timestamp_sub) | Subtracts a specified time interval from a `TIMESTAMP` value. |
| [`TIMESTAMP_TRUNC`](#timestamp_trunc) | Truncates a `TIMESTAMP` or `DATETIME` value at a particular granularity. |
| [`UNIX_MICROS`](#unix_micros) | Converts a `TIMESTAMP` value to the number of microseconds since 1970-01-01 00:00:00 UTC. |
| [`UNIX_MILLIS`](#unix_millis) | Converts a `TIMESTAMP` value to the number of milliseconds since 1970-01-01 00:00:00 UTC. |
| [`UNIX_SECONDS`](#unix_seconds) | Converts a `TIMESTAMP` value to the number of seconds since 1970-01-01 00:00:00 UTC. |

### `CURRENT_TIMESTAMP`

```sql
CURRENT_TIMESTAMP()
```

```sql
CURRENT_TIMESTAMP
```

**Description**

Returns the current date and time as a timestamp object. The timestamp is
continuous, non-ambiguous, has exactly 60 seconds per minute and doesn't repeat
values over the leap second. Parentheses are optional.

This function handles leap seconds by smearing them across a window of 20 hours
around the inserted leap second.

The current timestamp value is set at the start of the query statement that
contains this function. All invocations of `CURRENT_TIMESTAMP()` within a query
statement yield the same value.

**Supported Input Types**

Not applicable

**Result Data Type**

`TIMESTAMP`

**Examples**

```sql
SELECT CURRENT_TIMESTAMP() AS now;

/*--------------------------------+
 | now                            |
 +--------------------------------+
 | 2020-06-02 23:57:12.120174 UTC |
 +--------------------------------*/
```

### `EXTRACT`

```sql
EXTRACT(part FROM timestamp_expression [AT TIME ZONE time_zone])
```

**Description**

Returns a value that corresponds to the specified `part` from
a supplied `timestamp_expression`. This function supports an optional
`time_zone` parameter. See
[Time zone definitions](#how-time-zones-work-with-timestamp-functions) for information
on how to specify a time zone.

Allowed `part` values are:

- `MICROSECOND`
- `MILLISECOND`
- `SECOND`
- `MINUTE`
- `HOUR`
- `DAYOFWEEK`: Returns values in the range \[1,7\] with Sunday as the first day of of the week.
- `DAY`
- `DAYOFYEAR`
- `WEEK`: Returns the week number of the date in the range \[0, 53\]. Weeks begin with Sunday, and dates prior to the first Sunday of the year are in week 0.
- `WEEK(<WEEKDAY>)`: Returns the week number of `timestamp_expression` in the range \[0, 53\]. Weeks begin on `WEEKDAY`. `datetime`s prior to the first `WEEKDAY` of the year are in week 0. Valid values for `WEEKDAY` are `SUNDAY`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, and `SATURDAY`.
- `ISOWEEK`: Returns the [ISO 8601 week](https://en.wikipedia.org/wiki/ISO_week_date) number of the `datetime_expression`. `ISOWEEK`s begin on Monday. Return values are in the range \[1, 53\]. The first `ISOWEEK` of each ISO year begins on the Monday before the first Thursday of the Gregorian calendar year.
- `MONTH`
- `QUARTER`
- `YEAR`
- `ISOYEAR`: Returns the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) week-numbering year, which is the Gregorian calendar year containing the Thursday of the week to which `date_expression` belongs.
- `DATE`
- `DATETIME`
- `TIME`

Returned values truncate lower order time periods. For example, when extracting
seconds, `EXTRACT` truncates the millisecond and microsecond values.

**Return Data Type**

`INT64`, except in the following cases:

- If `part` is `DATE`, the function returns a `DATE` object.
- If `part` is `DATETIME`, the function returns a `DATETIME` object.
- If `part` is `TIME`, the function returns a `TIME` object.

**Examples**

In the following example, `EXTRACT` returns a value corresponding to the `DAY`
time part.

```sql
SELECT
  EXTRACT(
    DAY
    FROM TIMESTAMP('2008-12-25 05:30:00+00') AT TIME ZONE 'UTC')
    AS the_day_utc,
  EXTRACT(
    DAY
    FROM TIMESTAMP('2008-12-25 05:30:00+00') AT TIME ZONE 'America/Los_Angeles')
    AS the_day_california

/*-------------+--------------------+
 | the_day_utc | the_day_california |
 +-------------+--------------------+
 | 25          | 24                 |
 +-------------+--------------------*/
```

In the following examples, `EXTRACT` returns values corresponding to different
time parts from a column of type `TIMESTAMP`.

```sql
SELECT
  EXTRACT(ISOYEAR FROM TIMESTAMP("2005-01-03 12:34:56+00")) AS isoyear,
  EXTRACT(ISOWEEK FROM TIMESTAMP("2005-01-03 12:34:56+00")) AS isoweek,
  EXTRACT(YEAR FROM TIMESTAMP("2005-01-03 12:34:56+00")) AS year,
  EXTRACT(WEEK FROM TIMESTAMP("2005-01-03 12:34:56+00")) AS week

-- Display of results may differ, depending upon the environment and
-- time zone where this query was executed.
/*---------+---------+------+------+
 | isoyear | isoweek | year | week |
 +---------+---------+------+------+
 | 2005    | 1       | 2005 | 1    |
 +---------+---------+------+------*/
```

Adapted (not in the official docs): removed the `timestamp_value` select item, which the result table doesn't show.

```sql
SELECT
  EXTRACT(ISOYEAR FROM TIMESTAMP("2007-12-31 12:00:00+00")) AS isoyear,
  EXTRACT(ISOWEEK FROM TIMESTAMP("2007-12-31 12:00:00+00")) AS isoweek,
  EXTRACT(YEAR FROM TIMESTAMP("2007-12-31 12:00:00+00")) AS year,
  EXTRACT(WEEK FROM TIMESTAMP("2007-12-31 12:00:00+00")) AS week

-- Display of results may differ, depending upon the environment and time zone
-- where this query was executed.
/*---------+---------+------+------+
 | isoyear | isoweek | year | week |
 +---------+---------+------+------+
 | 2008    | 1       | 2007 | 52    |
 +---------+---------+------+------*/
```

Adapted (not in the official docs): removed the `timestamp_value` select item, which the result table doesn't show.

```sql
SELECT
  EXTRACT(ISOYEAR FROM TIMESTAMP("2009-01-01 12:00:00+00")) AS isoyear,
  EXTRACT(ISOWEEK FROM TIMESTAMP("2009-01-01 12:00:00+00")) AS isoweek,
  EXTRACT(YEAR FROM TIMESTAMP("2009-01-01 12:00:00+00")) AS year,
  EXTRACT(WEEK FROM TIMESTAMP("2009-01-01 12:00:00+00")) AS week

-- Display of results may differ, depending upon the environment and time zone
-- where this query was executed.
/*---------+---------+------+------+
 | isoyear | isoweek | year | week |
 +---------+---------+------+------+
 | 2009    | 1       | 2009 | 0    |
 +---------+---------+------+------*/
```

Adapted (not in the official docs): removed the `timestamp_value` select item, which the result table doesn't show.

```sql
SELECT
  EXTRACT(ISOYEAR FROM TIMESTAMP("2009-12-31 12:00:00+00")) AS isoyear,
  EXTRACT(ISOWEEK FROM TIMESTAMP("2009-12-31 12:00:00+00")) AS isoweek,
  EXTRACT(YEAR FROM TIMESTAMP("2009-12-31 12:00:00+00")) AS year,
  EXTRACT(WEEK FROM TIMESTAMP("2009-12-31 12:00:00+00")) AS week

-- Display of results may differ, depending upon the environment and time zone
-- where this query was executed.
/*---------+---------+------+------+
 | isoyear | isoweek | year | week |
 +---------+---------+------+------+
 | 2009    | 53      | 2009 | 52   |
 +---------+---------+------+------*/
```

Adapted (not in the official docs): removed the `timestamp_value` select item, which the result table doesn't show.

```sql
SELECT
  EXTRACT(ISOYEAR FROM TIMESTAMP("2017-01-02 12:00:00+00")) AS isoyear,
  EXTRACT(ISOWEEK FROM TIMESTAMP("2017-01-02 12:00:00+00")) AS isoweek,
  EXTRACT(YEAR FROM TIMESTAMP("2017-01-02 12:00:00+00")) AS year,
  EXTRACT(WEEK FROM TIMESTAMP("2017-01-02 12:00:00+00")) AS week

-- Display of results may differ, depending upon the environment and time zone
-- where this query was executed.
/*---------+---------+------+------+
 | isoyear | isoweek | year | week |
 +---------+---------+------+------+
 | 2017    | 1       | 2017 | 1    |
 +---------+---------+------+------*/
```

Adapted (not in the official docs): removed the `timestamp_value` select item, which the result table doesn't show.

```sql
SELECT
  EXTRACT(ISOYEAR FROM TIMESTAMP("2017-05-26 12:00:00+00")) AS isoyear,
  EXTRACT(ISOWEEK FROM TIMESTAMP("2017-05-26 12:00:00+00")) AS isoweek,
  EXTRACT(YEAR FROM TIMESTAMP("2017-05-26 12:00:00+00")) AS year,
  EXTRACT(WEEK FROM TIMESTAMP("2017-05-26 12:00:00+00")) AS week

-- Display of results may differ, depending upon the environment and time zone
-- where this query was executed.
/*---------+---------+------+------+
 | isoyear | isoweek | year | week |
 +---------+---------+------+------+
 | 2017    | 21      | 2017 | 21   |
 +---------+---------+------+------*/
```

In the following example, `timestamp_expression` falls on a Monday. `EXTRACT`
calculates the first column using weeks that begin on Sunday, and it calculates
the second column using weeks that begin on Monday.

```sql
SELECT
  EXTRACT(WEEK(SUNDAY) FROM TIMESTAMP("2017-11-06 00:00:00+00")) AS week_sunday,
  EXTRACT(WEEK(MONDAY) FROM TIMESTAMP("2017-11-06 00:00:00+00")) AS week_monday

-- Display of results may differ, depending upon the environment and time zone
-- where this query was executed.
/*-------------+---------------+
 | week_sunday | week_monday   |
 +-------------+---------------+
 | 45          | 44            |
 +-------------+---------------*/
```

### `FORMAT_TIMESTAMP`

```sql
FORMAT_TIMESTAMP(format_string, timestamp_expr[, time_zone])
```

**Description**

Formats a `TIMESTAMP` value according to the specified format string.

**Definitions**

- `format_string`: A `STRING` value that contains the [format elements](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#format_elements_date_time) to use with `timestamp_expr`.
- `timestamp_expr`: A `TIMESTAMP` value that represents the timestamp to format.
- `time_zone`: A `STRING` value that represents a time zone. For more information about how to use a time zone with a timestamp, see [Time zone definitions](#how-time-zones-work-with-timestamp-functions).

**Return Data Type**

`STRING`

**Examples**

```sql
SELECT FORMAT_TIMESTAMP("%c", TIMESTAMP "2050-12-25 15:30:55+00", "UTC")
  AS formatted;

/*--------------------------+
 | formatted                |
 +--------------------------+
 | Sun Dec 25 15:30:55 2050 |
 +--------------------------*/
```

```sql
SELECT FORMAT_TIMESTAMP("%b-%d-%Y", TIMESTAMP "2050-12-25 15:30:55+00")
  AS formatted;

/*-------------+
 | formatted   |
 +-------------+
 | Dec-25-2050 |
 +-------------*/
```

```sql
SELECT FORMAT_TIMESTAMP("%b %Y", TIMESTAMP "2050-12-25 15:30:55+00")
  AS formatted;

/*-------------+
 | formatted   |
 +-------------+
 | Dec 2050    |
 +-------------*/
```

```sql
SELECT FORMAT_TIMESTAMP("%Y-%m-%dT%H:%M:%S%Z", TIMESTAMP "2050-12-25 15:30:55", "UTC")
  AS formatted;

/*+-----------------------+
 |       formatted        |
 +------------------------+
 | 2050-12-25T15:30:55UTC |
 +------------------------*/
```

### `PARSE_TIMESTAMP`

```sql
PARSE_TIMESTAMP(format_string, timestamp_string[, time_zone])
```

**Description**

Converts a `STRING` value to a `TIMESTAMP` value.

**Definitions**

- `format_string`: A `STRING` value that contains the [format elements](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#format_elements_date_time) to use with `timestamp_string`.
- `timestamp_string`: A `STRING` value that represents the timestamp to parse.
- `time_zone`: A `STRING` value that represents a time zone. For more information about how to use a time zone with a timestamp, see [Time zone definitions](#how-time-zones-work-with-timestamp-functions).

**Details**

Each element in `timestamp_string` must have a corresponding element in
`format_string`. The location of each element in `format_string` must match the
location of each element in `timestamp_string`.

```sql
-- This works because elements on both sides match.
SELECT PARSE_TIMESTAMP("%a %b %e %I:%M:%S %Y", "Thu Dec 25 07:30:00 2008");

-- This produces an error because the year element is in different locations.
SELECT PARSE_TIMESTAMP("%a %b %e %Y %I:%M:%S", "Thu Dec 25 07:30:00 2008");

-- This produces an error because one of the year elements is missing.
SELECT PARSE_TIMESTAMP("%a %b %e %I:%M:%S", "Thu Dec 25 07:30:00 2008");

-- This works because %c can find all matching elements in timestamp_string.
SELECT PARSE_TIMESTAMP("%c", "Thu Dec 25 07:30:00 2008");
```

The format string fully supports most format elements, except for
`%P`.

The following additional considerations apply when using the `PARSE_TIMESTAMP`
function:

- Unspecified fields. Any unspecified field is initialized from `1970-01-01
  00:00:00.0`. This initialization value uses the time zone specified by the function's time zone argument, if present. If not, the initialization value uses the default time zone, UTC. For instance, if the year is unspecified then it defaults to `1970`, and so on.
- Case insensitivity. Names, such as `Monday`, `February`, and so on, are case insensitive.
- Whitespace. One or more consecutive white spaces in the format string matches zero or more consecutive white spaces in the timestamp string. In addition, leading and trailing white spaces in the timestamp string are always allowed, even if they aren't in the format string.
- Format precedence. When two (or more) format elements have overlapping information (for example both `%F` and `%Y` affect the year), the last one generally overrides any earlier ones, with some exceptions (see the descriptions of `%s`, `%C`, and `%y`).
- Format divergence. `%p` can be used with `am`, `AM`, `pm`, and `PM`.
- Mixed ISO and non-ISO elements. The ISO format elements are `%G`, `%g`, `%J`, and `%V`. When these ISO elements are used together with other non-ISO elements, the ISO elements are ignored, resulting in different values. For example, the function arguments `('%g %J', '8405')` return a value with the year `1984`, whereas the arguments `('%g %j', '8405')` return a value with the year `1970` because the ISO element `%g` is ignored.
- Numeric values after `%G` input values. Any input string value that corresponds to the `%G` format element requires a whitespace or non-digit character as a separator from numeric values that follow. This is a known issue in GoogleSQL. For example, the function arguments `('%G
  %V','2020 50')` or `('%G-%V','2020-50')` work, but not `('%G%V','202050')`. For input values before the corresponding `%G` value, no separator is needed. For example, the arguments `('%V%G','502020')` work. The separator after the `%G` values identifies the end of the specified ISO year value so that the function can parse properly.

**Return Data Type**

`TIMESTAMP`

**Example**

```sql
SELECT PARSE_TIMESTAMP("%c", "Thu Dec 25 07:30:00 2008") AS parsed;

-- Display of results may differ, depending upon the environment and time zone where this query was executed.
/*-------------------------+
 | parsed                  |
 +-------------------------+
 | 2008-12-25 07:30:00 UTC |
 +-------------------------*/
```

### `STRING`

```sql
STRING(timestamp_expression[, time_zone])
```

**Description**

Converts a timestamp to a string. Supports an optional
parameter to specify a time zone. See
[Time zone definitions](#how-time-zones-work-with-timestamp-functions) for information
on how to specify a time zone.

**Return Data Type**

`STRING`

**Example**

```sql
SELECT STRING(TIMESTAMP "2008-12-25 15:30:00+00", "UTC") AS string;

/*-------------------------------+
 | string                        |
 +-------------------------------+
 | 2008-12-25 15:30:00+00        |
 +-------------------------------*/
```

### `TIMESTAMP`

```sql
TIMESTAMP(string_expression[, time_zone])
TIMESTAMP(date_expression[, time_zone])
TIMESTAMP(datetime_expression[, time_zone])
```

**Description**

- `string_expression[, time_zone]`: Converts a string to a timestamp. `string_expression` must include a timestamp literal. If `string_expression` includes a time zone in the timestamp literal, don't include an explicit `time_zone` argument.
- `date_expression[, time_zone]`: Converts a date to a timestamp. The value returned is the earliest timestamp that falls within the given date.
- `datetime_expression[, time_zone]`: Converts a datetime to a timestamp.

This function supports an optional
parameter to [specify a time zone](#how-time-zones-work-with-timestamp-functions). If
no time zone is specified, the default time zone, UTC,
is used.

**Return Data Type**

`TIMESTAMP`

**Examples**

```sql
SELECT TIMESTAMP("2008-12-25 15:30:00+00") AS timestamp_str;

-- Display of results may differ, depending upon the environment and time zone where this query was executed.
/*-------------------------+
 | timestamp_str           |
 +-------------------------+
 | 2008-12-25 15:30:00 UTC |
 +-------------------------*/
```

```sql
SELECT TIMESTAMP("2008-12-25 15:30:00", "America/Los_Angeles") AS timestamp_str;

-- Display of results may differ, depending upon the environment and time zone where this query was executed.
/*-------------------------+
 | timestamp_str           |
 +-------------------------+
 | 2008-12-25 23:30:00 UTC |
 +-------------------------*/
```

```sql
SELECT TIMESTAMP("2008-12-25 15:30:00 UTC") AS timestamp_str;

-- Display of results may differ, depending upon the environment and time zone where this query was executed.
/*-------------------------+
 | timestamp_str           |
 +-------------------------+
 | 2008-12-25 15:30:00 UTC |
 +-------------------------*/
```

```sql
SELECT TIMESTAMP(DATETIME "2008-12-25 15:30:00") AS timestamp_datetime;

-- Display of results may differ, depending upon the environment and time zone where this query was executed.
/*-------------------------+
 | timestamp_datetime      |
 +-------------------------+
 | 2008-12-25 15:30:00 UTC |
 +-------------------------*/
```

```sql
SELECT TIMESTAMP(DATE "2008-12-25") AS timestamp_date;

-- Display of results may differ, depending upon the environment and time zone where this query was executed.
/*-------------------------+
 | timestamp_date          |
 +-------------------------+
 | 2008-12-25 00:00:00 UTC |
 +-------------------------*/
```

### `TIMESTAMP_ADD`

```sql
TIMESTAMP_ADD(timestamp_expression, INTERVAL step_size step_unit)
```

**Description**

Adds `step_size` units of `step_unit` to the `TIMESTAMP` object, independent of
any time zone.

`TIMESTAMP_ADD` supports the following values for `step_unit`:

- `MICROSECOND`
- `MILLISECOND`
- `SECOND`
- `MINUTE`
- `HOUR`. Equivalent to 60 `MINUTE` parts.
- `DAY`. Equivalent to 24 `HOUR` parts.

**Return Data Types**

`TIMESTAMP`

**Example**

```sql
SELECT
  TIMESTAMP("2008-12-25 15:30:00+00") AS original,
  TIMESTAMP_ADD(TIMESTAMP "2008-12-25 15:30:00+00", INTERVAL 10 MINUTE) AS later;

-- Display of results may differ, depending upon the environment and time zone where this query was executed.
/*-------------------------+-------------------------+
 | original                | later                   |
 +-------------------------+-------------------------+
 | 2008-12-25 15:30:00 UTC | 2008-12-25 15:40:00 UTC |
 +-------------------------+-------------------------*/
```

### `TIMESTAMP_DIFF`

```sql
TIMESTAMP_DIFF(end_timestamp, start_timestamp, granularity)
```

**Description**

Gets the number of unit boundaries between two `TIMESTAMP` values
(`end_timestamp` - `start_timestamp`) at a particular time granularity.

**Definitions**

- `start_timestamp`: The starting `TIMESTAMP` value.
- `end_timestamp`: The ending `TIMESTAMP` value.
- `granularity`: The timestamp part that represents the granularity. If
  you passed in `TIMESTAMP` values for the first arguments, `granularity` can
  be:

  - `MICROSECOND`
  - `MILLISECOND`
  - `SECOND`
  - `MINUTE`
  - `HOUR`. Equivalent to 60 `MINUTE`s.
  - `DAY`. Equivalent to 24 `HOUR`s.

**Details**

If `end_timestamp` is earlier than `start_timestamp`, the output is 0 or
negative. Decimals are always truncated rather than rounded. For example, both
3.9 and 3.1 become 3, while -3.9 and -3.1 become -3 (instead of -4).

Produces an error if the computation overflows, such as if the difference in
microseconds between
the two `TIMESTAMP` values overflows.

> [!NOTE]
> **Note:** The behavior of the this function follows the type of arguments passed in. For example, `TIMESTAMP_DIFF(DATE, DATE, PART)` behaves like `DATE_DIFF(DATE, DATE, PART)`.

**Return Data Type**

`INT64`

**Examples**

```sql
SELECT
  TIMESTAMP("2010-07-07 10:20:00+00") AS later_timestamp,
  TIMESTAMP("2008-12-25 15:30:00+00") AS earlier_timestamp,
  TIMESTAMP_DIFF(TIMESTAMP "2010-07-07 10:20:00+00", TIMESTAMP "2008-12-25 15:30:00+00", HOUR) AS hours;

-- Display of results may differ, depending upon the environment and time zone where this query was executed.
/*-------------------------+-------------------------+-------+
 | later_timestamp         | earlier_timestamp       | hours |
 +-------------------------+-------------------------+-------+
 | 2010-07-07 10:20:00 UTC | 2008-12-25 15:30:00 UTC | 13410 |
 +-------------------------+-------------------------+-------*/
```

In the following example, the first timestamp occurs before the
second timestamp, resulting in a negative output.

```sql
SELECT TIMESTAMP_DIFF(TIMESTAMP "2018-08-14", TIMESTAMP "2018-10-14", DAY) AS negative_diff;

/*---------------+
 | negative_diff |
 +---------------+
 | -61           |
 +---------------*/
```

In this example, the result is 0 because only the number of whole specified
`HOUR` intervals are included.

```sql
SELECT TIMESTAMP_DIFF("2001-02-01 01:00:00", "2001-02-01 00:00:01", HOUR) AS diff;

/*---------------+
 | diff          |
 +---------------+
 | 0             |
 +---------------*/
```

In the following example, `TIMESTAMP_DIFF` truncates the output rather than
rounding it. Both 3 hours 54 minutes (3.9 hours) and 3 hours 6 minutes (3.1
hours) truncate to 3 hours, and their negative counterparts truncate to -3
hours:

```sql
SELECT
  TIMESTAMP_DIFF(TIMESTAMP '2021-05-01 04:54:00+00',
    TIMESTAMP '2021-05-01 01:00:00+00', HOUR) AS diff_3_9,
  TIMESTAMP_DIFF(TIMESTAMP '2021-05-01 04:06:00+00',
    TIMESTAMP '2021-05-01 01:00:00+00', HOUR) AS diff_3_1,
  TIMESTAMP_DIFF(TIMESTAMP '2021-05-01 01:00:00+00',
    TIMESTAMP '2021-05-01 04:54:00+00', HOUR) AS diff_negative_3_9,
  TIMESTAMP_DIFF(TIMESTAMP '2021-05-01 01:00:00+00',
    TIMESTAMP '2021-05-01 04:06:00+00', HOUR) AS diff_negative_3_1;

/*----------+----------+-------------------+-------------------+
 | diff_3_9 | diff_3_1 | diff_negative_3_9 | diff_negative_3_1 |
 +----------+----------+-------------------+-------------------+
 | 3        | 3        | -3                | -3                |
 +----------+----------+-------------------+-------------------*/
```

### `TIMESTAMP_MICROS`

```sql
TIMESTAMP_MICROS(int64_expression)
```

**Description**

Interprets `int64_expression` as the number of microseconds since 1970-01-01
00:00:00 UTC and returns a timestamp.

**Return Data Type**

`TIMESTAMP`

**Example**

```sql
SELECT TIMESTAMP_MICROS(1230219000000000) AS timestamp_value;

-- Display of results may differ, depending upon the environment and time zone where this query was executed.
/*-------------------------+
 | timestamp_value         |
 +-------------------------+
 | 2008-12-25 15:30:00 UTC |
 +-------------------------*/
```

### `TIMESTAMP_MILLIS`

```sql
TIMESTAMP_MILLIS(int64_expression)
```

**Description**

Interprets `int64_expression` as the number of milliseconds since 1970-01-01
00:00:00 UTC and returns a timestamp.

**Return Data Type**

`TIMESTAMP`

**Example**

```sql
SELECT TIMESTAMP_MILLIS(1230219000000) AS timestamp_value;

-- Display of results may differ, depending upon the environment and time zone where this query was executed.
/*-------------------------+
 | timestamp_value         |
 +-------------------------+
 | 2008-12-25 15:30:00 UTC |
 +-------------------------*/
```

### `TIMESTAMP_SECONDS`

```sql
TIMESTAMP_SECONDS(int64_expression)
```

**Description**

Interprets `int64_expression` as the number of seconds since 1970-01-01 00:00:00
UTC and returns a timestamp.

**Return Data Type**

`TIMESTAMP`

**Example**

```sql
SELECT TIMESTAMP_SECONDS(1230219000) AS timestamp_value;

-- Display of results may differ, depending upon the environment and time zone where this query was executed.
/*-------------------------+
 | timestamp_value         |
 +-------------------------+
 | 2008-12-25 15:30:00 UTC |
 +-------------------------*/
```

### `TIMESTAMP_SUB`

```sql
TIMESTAMP_SUB(timestamp_expression, INTERVAL step_size step_unit)
```

**Description**

Subtracts `step_size` units of `step_unit` from the `TIMESTAMP` object,
independent of any time zone.

`TIMESTAMP_SUB` supports the following values for `step_unit`:

- `MICROSECOND`
- `MILLISECOND`
- `SECOND`
- `MINUTE`
- `HOUR`. Equivalent to 60 `MINUTE` parts.
- `DAY`. Equivalent to 24 `HOUR` parts.

**Return Data Type**

`TIMESTAMP`

**Example**

```sql
SELECT
  TIMESTAMP("2008-12-25 15:30:00+00") AS original,
  TIMESTAMP_SUB(TIMESTAMP "2008-12-25 15:30:00+00", INTERVAL 10 MINUTE) AS earlier;

-- Display of results may differ, depending upon the environment and time zone where this query was executed.
/*-------------------------+-------------------------+
 | original                | earlier                 |
 +-------------------------+-------------------------+
 | 2008-12-25 15:30:00 UTC | 2008-12-25 15:20:00 UTC |
 +-------------------------+-------------------------*/
```

### `TIMESTAMP_TRUNC`

```sql
TIMESTAMP_TRUNC(timestamp_value, timestamp_granularity[, time_zone])
```

```sql
TIMESTAMP_TRUNC(datetime_value, datetime_granularity)
```

**Description**

Truncates a `TIMESTAMP` or `DATETIME` value at a particular granularity.

**Definitions**

- `timestamp_value`: A `TIMESTAMP` value to truncate.
- `timestamp_granularity`: The truncation granularity for a `TIMESTAMP` value. [Date granularities](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_trunc_granularity_date) and [time granularities](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_trunc_granularity_time) can be used.
- `time_zone`: A time zone to use with the `TIMESTAMP` value.
  [Time zone parts](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_time_zone_parts) can be used.
  Use this argument if you want to use a time zone other than
  the default time zone, UTC, as part of the
  truncate operation.

  > [!NOTE]
  > **Note:** When truncating a timestamp to `MINUTE` or `HOUR` parts, this function determines the civil time of the timestamp in the specified (or default) time zone and subtracts the minutes and seconds (when truncating to `HOUR`) or the seconds (when truncating to `MINUTE`) from that timestamp. While this provides intuitive results in most cases, the result is non-intuitive near daylight savings transitions that aren't hour-aligned.

- `datetime_value`: A `DATETIME` value to truncate.

- `datetime_granularity`: The truncation granularity for a `DATETIME` value.
  [Date granularities](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_trunc_granularity_date) and
  [time granularities](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_trunc_granularity_time) can be used.

**Date granularity definitions**

- `DAY`: The day in the Gregorian calendar year that contains the
  value to truncate.

- `WEEK`: The first day in the week that contains the
  value to truncate. Weeks begin on Sundays. `WEEK` is equivalent to
  `WEEK(SUNDAY)`.

- `WEEK(WEEKDAY)`: The first day in the week that contains the
  value to truncate. Weeks begin on `WEEKDAY`. `WEEKDAY` must be one of the
  following: `SUNDAY`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`,
  or `SATURDAY`.

- `ISOWEEK`: The first day in the [ISO 8601 week](https://en.wikipedia.org/wiki/ISO_week_date) that contains
  the value to truncate. The ISO week begins on
  Monday. The first ISO week of each ISO year contains the first Thursday of the
  corresponding Gregorian calendar year.

- `MONTH`: The first day in the month that contains the
  value to truncate.

- `QUARTER`: The first day in the quarter that contains the
  value to truncate.

- `YEAR`: The first day in the year that contains the
  value to truncate.

- `ISOYEAR`: The first day in the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) week-numbering year
  that contains the value to truncate. The ISO year is the
  Monday of the first week where Thursday belongs to the corresponding
  Gregorian calendar year.

**Time granularity definitions**

- `MICROSECOND`: If used, nothing is truncated from the value.

- `MILLISECOND`: The nearest lesser than or equal millisecond.

- `SECOND`: The nearest lesser than or equal second.

- `MINUTE`: The nearest lesser than or equal minute.

- `HOUR`: The nearest lesser than or equal hour.

**Time zone part definitions**

- `MINUTE`
- `HOUR`
- `DAY`
- `WEEK`
- `WEEK(<WEEKDAY>)`
- `ISOWEEK`
- `MONTH`
- `QUARTER`
- `YEAR`
- `ISOYEAR`

**Details**

The resulting value is always rounded to the beginning of `granularity`.

**Return Data Type**

The same data type as the first argument passed into this function.

**Examples**

```sql
SELECT
  TIMESTAMP_TRUNC(TIMESTAMP "2008-12-25 15:30:00+00", DAY, "UTC") AS utc,
  TIMESTAMP_TRUNC(TIMESTAMP "2008-12-25 15:30:00+00", DAY, "America/Los_Angeles") AS la;

-- Display of results may differ, depending upon the environment and time zone where this query was executed.
/*-------------------------+-------------------------+
 | utc                     | la                      |
 +-------------------------+-------------------------+
 | 2008-12-25 00:00:00 UTC | 2008-12-25 08:00:00 UTC |
 +-------------------------+-------------------------*/
```

In the following example, `timestamp_expression` has a time zone offset of +12.
The first column shows the `timestamp_expression` in UTC time. The second
column shows the output of `TIMESTAMP_TRUNC` using weeks that start on Monday.
Because the `timestamp_expression` falls on a Sunday in UTC, `TIMESTAMP_TRUNC`
truncates it to the preceding Monday. The third column shows the same function
with the optional [Time zone definition](#how-time-zones-work-with-timestamp-functions)
argument 'Pacific/Auckland'. Here, the function truncates the
`timestamp_expression` using New Zealand Daylight Time, where it falls on a
Monday.

```sql
SELECT
  timestamp_value AS timestamp_value,
  TIMESTAMP_TRUNC(timestamp_value, WEEK(MONDAY), "UTC") AS utc_truncated,
  TIMESTAMP_TRUNC(timestamp_value, WEEK(MONDAY), "Pacific/Auckland") AS nzdt_truncated
FROM (SELECT TIMESTAMP("2017-11-06 00:00:00+12") AS timestamp_value);

-- Display of results may differ, depending upon the environment and time zone where this query was executed.
/*-------------------------+-------------------------+-------------------------+
 | timestamp_value         | utc_truncated           | nzdt_truncated          |
 +-------------------------+-------------------------+-------------------------+
 | 2017-11-05 12:00:00 UTC | 2017-10-30 00:00:00 UTC | 2017-11-05 11:00:00 UTC |
 +-------------------------+-------------------------+-------------------------*/
```

In the following example, the original `timestamp_expression` is in the
Gregorian calendar year 2015. However, `TIMESTAMP_TRUNC` with the `ISOYEAR` date
part truncates the `timestamp_expression` to the beginning of the ISO year, not
the Gregorian calendar year. The first Thursday of the 2015 calendar year was
2015-01-01, so the ISO year 2015 begins on the preceding Monday, 2014-12-29.
Therefore the ISO year boundary preceding the `timestamp_expression`
2015-06-15 00:00:00+00 is 2014-12-29.

```sql
SELECT
  TIMESTAMP_TRUNC("2015-06-15 00:00:00+00", ISOYEAR) AS isoyear_boundary,
  EXTRACT(ISOYEAR FROM TIMESTAMP "2015-06-15 00:00:00+00") AS isoyear_number;

-- Display of results may differ, depending upon the environment and time zone where this query was executed.
/*-------------------------+----------------+
 | isoyear_boundary        | isoyear_number |
 +-------------------------+----------------+
 | 2014-12-29 00:00:00 UTC | 2015           |
 +-------------------------+----------------*/
```

### `UNIX_MICROS`

```sql
UNIX_MICROS(timestamp_expression)
```

**Description**

Returns the number of microseconds since `1970-01-01 00:00:00 UTC`.

**Return Data Type**

`INT64`

**Examples**

```sql
SELECT UNIX_MICROS(TIMESTAMP "2008-12-25 15:30:00+00") AS micros;

/*------------------+
 | micros           |
 +------------------+
 | 1230219000000000 |
 +------------------*/
```

### `UNIX_MILLIS`

```sql
UNIX_MILLIS(timestamp_expression)
```

**Description**

Returns the number of milliseconds since `1970-01-01 00:00:00 UTC`. Truncates
higher levels of precision by rounding down to the beginning of the millisecond.

**Return Data Type**

`INT64`

**Examples**

```sql
SELECT UNIX_MILLIS(TIMESTAMP "2008-12-25 15:30:00+00") AS millis;

/*---------------+
 | millis        |
 +---------------+
 | 1230219000000 |
 +---------------*/
```

```sql
SELECT UNIX_MILLIS(TIMESTAMP "1970-01-01 00:00:00.0018+00") AS millis;

/*---------------+
 | millis        |
 +---------------+
 | 1             |
 +---------------*/
```

### `UNIX_SECONDS`

```sql
UNIX_SECONDS(timestamp_expression)
```

**Description**

Returns the number of seconds since `1970-01-01 00:00:00 UTC`. Truncates higher
levels of precision by rounding down to the beginning of the second.

**Return Data Type**

`INT64`

**Examples**

```sql
SELECT UNIX_SECONDS(TIMESTAMP "2008-12-25 15:30:00+00") AS seconds;

/*------------+
 | seconds    |
 +------------+
 | 1230219000 |
 +------------*/
```

```sql
SELECT UNIX_SECONDS(TIMESTAMP "1970-01-01 00:00:01.8+00") AS seconds;

/*------------+
 | seconds    |
 +------------+
 | 1          |
 +------------*/
```

### Supplemental materials

#### How time zones work with timestamp functions

A timestamp represents an absolute point in time, independent of any time
zone. However, when a timestamp value is displayed, it's usually converted to
a human-readable format consisting of a civil date and time
(YYYY-MM-DD HH:MM:SS)
and a time zone. This isn't the internal representation of the
`TIMESTAMP`; it's only a human-understandable way to describe the point in time
that the timestamp represents.

Some timestamp functions have a time zone argument. A time zone is needed to
convert between civil time (YYYY-MM-DD HH:MM:SS) and the absolute time
represented by a timestamp.
A function like `PARSE_TIMESTAMP` takes an input string that represents a
civil time and returns a timestamp that represents an absolute time. A
time zone is needed for this conversion. A function like `EXTRACT` takes an
input timestamp (absolute time) and converts it to civil time in order to
extract a part of that civil time. This conversion requires a time zone.
If no time zone is specified, the default time zone, UTC,
is used.

Certain date and timestamp functions allow you to override the default time zone
and specify a different one. You can specify a time zone by either supplying
the time zone name (for example, `America/Los_Angeles`)
or time zone offset from UTC (for example, -08).

To learn more about how time zones work with the `TIMESTAMP` type, see
[Time zones](../googlesql-syntax/data-types.md#time-zones).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Caution: In the `EXTRACT(WEEK(MONDAY) ...)` example for `2017-11-06`, the result shows `week_monday` as 44. By the `WEEK(<WEEKDAY>)` rule above (weeks begin on `WEEKDAY`, earlier days are in week 0), 2017-01-02 is the first Monday of the year and 2017-11-06 is exactly 44 weeks later, which would be week 45. The official docs do not explain this value, and it is kept as published.
- Corrected from the official docs: the return type says `EXTRACT` returns `INT64` except for `DATE`, although `DATETIME` and `TIME` are listed as allowed parts. The GoogleSQL reference implementation (google/zetasql commit 762ca7a16f2b, `googlesql/common/builtin_function_internal_2.cc`) registers `$extract_datetime` as `DATETIME` from `TIMESTAMP` and `$extract_time` as `TIME` from `TIMESTAMP`, and the datetime functions page states that `EXTRACT` with `TIME` returns a `TIME` object. The two cases are added.
- Corrected from the official docs: in the `EXTRACT` example for 2007-12-31, the query selects `timestamp_value` as its first column, but the result table shows only `isoyear`, `isoweek`, `year` and `week`. The `timestamp_value` select item is removed so that the query matches its result.
- Corrected from the official docs: in the `EXTRACT` example for 2009-01-01, the query selects `timestamp_value` as its first column, but the result table shows only `isoyear`, `isoweek`, `year` and `week`. The `timestamp_value` select item is removed so that the query matches its result.
- Corrected from the official docs: in the `EXTRACT` example for 2009-12-31, the query selects `timestamp_value` as its first column, but the result table shows only `isoyear`, `isoweek`, `year` and `week`. The `timestamp_value` select item is removed so that the query matches its result.
- Corrected from the official docs: in the `EXTRACT` example for 2017-01-02, the query selects `timestamp_value` as its first column, but the result table shows only `isoyear`, `isoweek`, `year` and `week`. The `timestamp_value` select item is removed so that the query matches its result.
- Corrected from the official docs: in the `EXTRACT` example for 2017-05-26, the query selects `timestamp_value` as its first column, but the result table shows only `isoyear`, `isoweek`, `year` and `week`. The `timestamp_value` select item is removed so that the query matches its result.

## Related

- [Index of this directory](./README.md)

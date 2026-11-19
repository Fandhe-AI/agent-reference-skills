---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/date_functions
---

# Date functions

## Signature / Usage

GoogleSQL for BigQuery supports the following date functions.

### Function list

| Name | Summary |
|---|---|
| [`CURRENT_DATE`](#current_date) | Returns the current date as a `DATE` value. |
| [`DATE`](#date) | Constructs a `DATE` value. |
| [`DATE_ADD`](#date_add) | Adds a specified time interval to a `DATE` value. |
| [`DATE_DIFF`](#date_diff) | Gets the number of unit boundaries between two `DATE` values at a particular time granularity. |
| [`DATE_FROM_UNIX_DATE`](#date_from_unix_date) | Interprets an `INT64` expression as the number of days since 1970-01-01. |
| [`DATE_SUB`](#date_sub) | Subtracts a specified time interval from a `DATE` value. |
| [`DATE_TRUNC`](#date_trunc) | Truncates a `DATE`, `DATETIME`, or `TIMESTAMP` value at a particular granularity. |
| [`EXTRACT`](#extract) | Extracts part of a date from a `DATE` value. |
| [`FORMAT_DATE`](#format_date) | Formats a `DATE` value according to a specified format string. |
| [`GENERATE_DATE_ARRAY`](array_functions.md#generate_date_array) | Generates an array of dates in a range. For more information, see [Array functions](array_functions.md). |
| [`LAST_DAY`](#last_day) | Gets the last day in a specified time period that contains a `DATE` value. |
| [`PARSE_DATE`](#parse_date) | Converts a `STRING` value to a `DATE` value. |
| [`UNIX_DATE`](#unix_date) | Converts a `DATE` value to the number of days since 1970-01-01. |

### `CURRENT_DATE`

```sql
CURRENT_DATE()
```

```sql
CURRENT_DATE(time_zone_expression)
```

```sql
CURRENT_DATE
```

**Description**

Returns the current date as a `DATE` object. Parentheses are optional when
called with no arguments.

This function supports the following arguments:

- `time_zone_expression`: A `STRING` expression that represents a [time zone](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timezone_definitions). If no time zone is specified, the default time zone, UTC, is used. If this expression is used and it evaluates to `NULL`, this function returns `NULL`.

The current date value is set at the start of the query statement that contains
this function. All invocations of `CURRENT_DATE()` within a query statement
yield the same value.

**Return Data Type**

`DATE`

**Examples**

The following query produces the current date in the default time zone:

```sql
SELECT CURRENT_DATE() AS the_date;

/*--------------+
 | the_date     |
 +--------------+
 | 2016-12-25   |
 +--------------*/
```

The following queries produce the current date in a specified time zone:

```sql
SELECT CURRENT_DATE('America/Los_Angeles') AS the_date;

/*--------------+
 | the_date     |
 +--------------+
 | 2016-12-25   |
 +--------------*/
```

```sql
SELECT CURRENT_DATE('-08') AS the_date;

/*--------------+
 | the_date     |
 +--------------+
 | 2016-12-25   |
 +--------------*/
```

The following query produces the current date in the default time zone.
Parentheses aren't needed if the function has no arguments.

```sql
SELECT CURRENT_DATE AS the_date;

/*--------------+
 | the_date     |
 +--------------+
 | 2016-12-25   |
 +--------------*/
```

### `DATE`

```sql
DATE(year, month, day)
```

```sql
DATE(timestamp_expression)
```

```sql
DATE(timestamp_expression, time_zone_expression)
```

```sql
DATE(datetime_expression)
```

**Description**

Constructs or extracts a date.

This function supports the following arguments:

- `year`: The `INT64` value for year.
- `month`: The `INT64` value for month.
- `day`: The `INT64` value for day.
- `timestamp_expression`: A `TIMESTAMP` expression that contains the date.
- `time_zone_expression`: A `STRING` expression that represents a [time zone](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timezone_definitions). If no time zone is specified with `timestamp_expression`, the default time zone, UTC, is used.
- `datetime_expression`: A `DATETIME` expression that contains the date.

**Return Data Type**

`DATE`

**Example**

```sql
SELECT
  DATE(2016, 12, 25) AS date_ymd,
  DATE(DATETIME '2016-12-25 23:59:59') AS date_dt,
  DATE(TIMESTAMP '2016-12-25 05:30:00+07', 'America/Los_Angeles') AS date_tstz;

/*------------+------------+------------+
 | date_ymd   | date_dt    | date_tstz  |
 +------------+------------+------------+
 | 2016-12-25 | 2016-12-25 | 2016-12-24 |
 +------------+------------+------------*/
```

### `DATE_ADD`

```sql
DATE_ADD(date_expression, INTERVAL step_size step_unit)
```

**Description**

Adds a specified time interval to a `DATE` object.

`DATE_ADD` supports the following `step_unit` values:

- `DAY`
- `WEEK`. Equivalent to 7 `DAY`s.
- `MONTH`
- `QUARTER`
- `YEAR`

Special handling is required for MONTH, QUARTER, and YEAR parts when
the date is at (or near) the last day of the month. If the resulting
month has fewer days than the original `DATE` object's day, then the resulting
date is the last date of that month.

**Return Data Type**

DATE

**Example**

```sql
SELECT DATE_ADD(DATE '2008-12-25', INTERVAL 5 DAY) AS five_days_later;

/*--------------------+
 | five_days_later    |
 +--------------------+
 | 2008-12-30         |
 +--------------------*/
```

### `DATE_DIFF`

```sql
DATE_DIFF(end_date, start_date, granularity)
```

**Description**

Gets the number of unit boundaries between two `DATE` values (`end_date` -
`start_date`) at a particular time granularity.

**Definitions**

- `start_date`: The starting `DATE` value.
- `end_date`: The ending `DATE` value.
- `granularity`: The date part that represents the granularity. If
  you have passed in `DATE` values for the first arguments, `granularity` can
  be:

  - `DAY`
  - `WEEK` This date part begins on Sunday.
  - `WEEK(<WEEKDAY>)`: This date part begins on `WEEKDAY`. Valid values for `WEEKDAY` are `SUNDAY`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, and `SATURDAY`.
  - `ISOWEEK`: Uses [ISO 8601 week](https://en.wikipedia.org/wiki/ISO_week_date) boundaries. ISO weeks begin on Monday.
  - `MONTH`
  - `QUARTER`
  - `YEAR`
  - `ISOYEAR`: Uses the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) week-numbering year boundary. The ISO year boundary is the Monday of the first week whose Thursday belongs to the corresponding Gregorian calendar year.

**Details**

If `end_date` is earlier than `start_date`, the output is 0 or negative.
Decimals are always truncated rather than rounded. For example, both 3.9 and 3.1
become 3, while -3.9 and -3.1 become -3 (instead of -4).

> [!NOTE]
> **Note:** The behavior of the this function follows the type of arguments passed in. For example, `DATE_DIFF(TIMESTAMP, TIMESTAMP, PART)` behaves like `TIMESTAMP_DIFF(TIMESTAMP, TIMESTAMP, PART)`.

**Return Data Type**

`INT64`

**Examples**

```sql
SELECT DATE_DIFF(DATE '2010-07-07', DATE '2008-12-25', DAY) AS days_diff;

/*-----------+
 | days_diff |
 +-----------+
 | 559       |
 +-----------*/
```

In the following example, `DATE_DIFF` truncates the output rather than rounding
it. Both 3 years 11 months (3.9 years) and 3 years 1 month (3.1 years)
truncate to 3 years, and their negative counterparts truncate to -3 years:

```sql
SELECT
  DATE_DIFF(DATE '2023-11-30', DATE '2020-01-01', YEAR) AS diff_3_9,
  DATE_DIFF(DATE '2023-02-01', DATE '2020-01-01', YEAR) AS diff_3_1,
  DATE_DIFF(DATE '2020-01-01', DATE '2023-11-30', YEAR) AS diff_negative_3_9,
  DATE_DIFF(DATE '2020-01-01', DATE '2023-02-01', YEAR) AS diff_negative_3_1;

/*----------+----------+-------------------+-------------------+
 | diff_3_9 | diff_3_1 | diff_negative_3_9 | diff_negative_3_1 |
 +----------+----------+-------------------+-------------------+
 | 3        | 3        | -3                | -3                |
 +----------+----------+-------------------+-------------------*/
```

```sql
SELECT
  DATE_DIFF(DATE '2017-10-15', DATE '2017-10-14', DAY) AS days_diff,
  DATE_DIFF(DATE '2017-10-15', DATE '2017-10-14', WEEK) AS weeks_diff;

/*-----------+------------+
 | days_diff | weeks_diff |
 +-----------+------------+
 | 1         | 1          |
 +-----------+------------*/
```

The example above shows the result of `DATE_DIFF` for two days in succession.
`DATE_DIFF` with the date part `WEEK` returns 1 because `DATE_DIFF` counts the
number of date part boundaries in this range of dates. Each `WEEK` begins on
Sunday, so there is one date part boundary between Saturday, 2017-10-14
and Sunday, 2017-10-15.

The following example shows the result of `DATE_DIFF` for two dates in different
years. `DATE_DIFF` with the date part `YEAR` returns 3 because it counts the
number of Gregorian calendar year boundaries between the two dates. `DATE_DIFF`
with the date part `ISOYEAR` returns 2 because the second date belongs to the
ISO year 2015. The first Thursday of the 2015 calendar year was 2015-01-01, so
the ISO year 2015 begins on the preceding Monday, 2014-12-29.

```sql
SELECT
  DATE_DIFF('2017-12-30', '2014-12-30', YEAR) AS year_diff,
  DATE_DIFF('2017-12-30', '2014-12-30', ISOYEAR) AS isoyear_diff;

/*-----------+--------------+
 | year_diff | isoyear_diff |
 +-----------+--------------+
 | 3         | 2            |
 +-----------+--------------*/
```

The following example shows the result of `DATE_DIFF` for two days in
succession. The first date falls on a Monday and the second date falls on a
Sunday. `DATE_DIFF` with the date part `WEEK` returns 0 because this date part
uses weeks that begin on Sunday. `DATE_DIFF` with the date part `WEEK(MONDAY)`
returns 1. `DATE_DIFF` with the date part `ISOWEEK` also returns 1 because
ISO weeks begin on Monday.

```sql
SELECT
  DATE_DIFF('2017-12-18', '2017-12-17', WEEK) AS week_diff,
  DATE_DIFF('2017-12-18', '2017-12-17', WEEK(MONDAY)) AS week_weekday_diff,
  DATE_DIFF('2017-12-18', '2017-12-17', ISOWEEK) AS isoweek_diff;

/*-----------+-------------------+--------------+
 | week_diff | week_weekday_diff | isoweek_diff |
 +-----------+-------------------+--------------+
 | 0         | 1                 | 1            |
 +-----------+-------------------+--------------*/
```

### `DATE_FROM_UNIX_DATE`

```sql
DATE_FROM_UNIX_DATE(int64_expression)
```

**Description**

Interprets `int64_expression` as the number of days since 1970-01-01.

**Return Data Type**

DATE

**Example**

```sql
SELECT DATE_FROM_UNIX_DATE(14238) AS date_from_epoch;

/*-----------------+
 | date_from_epoch |
 +-----------------+
 | 2008-12-25      |
 +-----------------+*/
```

### `DATE_SUB`

```sql
DATE_SUB(date_expression, INTERVAL step_size step_unit)
```

**Description**

Subtracts a specified time interval from a `DATE` object.

`DATE_SUB` supports the following `step_unit` values:

- `DAY`
- `WEEK`. Equivalent to 7 `DAY`s.
- `MONTH`
- `QUARTER`
- `YEAR`

Special handling is required for MONTH, QUARTER, and YEAR parts when
the date is at (or near) the last day of the month. If the resulting
month has fewer days than the original `DATE` object's day, then the resulting
date is the last date of that month.

**Return Data Type**

DATE

**Example**

```sql
SELECT DATE_SUB(DATE '2008-12-25', INTERVAL 5 DAY) AS five_days_ago;

/*---------------+
 | five_days_ago |
 +---------------+
 | 2008-12-20    |
 +---------------*/
```

### `DATE_TRUNC`

```sql
DATE_TRUNC(date_value, date_granularity)
```

```sql
DATE_TRUNC(datetime_value, datetime_granularity)
```

```sql
DATE_TRUNC(timestamp_value, timestamp_granularity[, time_zone])
```

**Description**

Truncates a `DATE`, `DATETIME`, or `TIMESTAMP` value at a particular
granularity.

**Definitions**

- `date_value`: A `DATE` value to truncate.
- `date_granularity`: The truncation granularity for a `DATE` value. [Date granularities](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/date_functions#date_trunc_granularity_date) can be used.
- `datetime_value`: A `DATETIME` value to truncate.
- `datetime_granularity`: The truncation granularity for a `DATETIME` value. [Date granularities](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/date_functions#date_trunc_granularity_date) and [time granularities](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/date_functions#date_trunc_granularity_time) can be used.
- `timestamp_value`: A `TIMESTAMP` value to truncate.
- `timestamp_granularity`: The truncation granularity for a `TIMESTAMP` value. [Date granularities](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/date_functions#date_trunc_granularity_date) and [time granularities](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/date_functions#date_trunc_granularity_time) can be used.
- `time_zone`: A time zone to use with the `TIMESTAMP` value.
  [Time zone parts](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/date_functions#date_time_zone_parts) can be used.
  Use this argument if you want to use a time zone other than
  the default time zone, UTC, as part of the
  truncate operation.

  > [!NOTE]
  > **Note:** When truncating a timestamp to `MINUTE` or `HOUR` parts, this function determines the civil time of the timestamp in the specified (or default) time zone and subtracts the minutes and seconds (when truncating to `HOUR`) or the seconds (when truncating to `MINUTE`) from that timestamp. While this provides intuitive results in most cases, the result is non-intuitive near daylight savings transitions that aren't hour-aligned.

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
SELECT DATE_TRUNC(DATE '2008-12-25', MONTH) AS month;

/*------------+
 | month      |
 +------------+
 | 2008-12-01 |
 +------------*/
```

In the following example, the original date falls on a Sunday. Because
the `date_part` is `WEEK(MONDAY)`, `DATE_TRUNC` returns the `DATE` for the
preceding Monday.

```sql
SELECT date AS original, DATE_TRUNC(date, WEEK(MONDAY)) AS truncated
FROM (SELECT DATE('2017-11-05') AS date);

/*------------+------------+
 | original   | truncated  |
 +------------+------------+
 | 2017-11-05 | 2017-10-30 |
 +------------+------------*/
```

In the following example, the original `date_expression` is in the Gregorian
calendar year 2015. However, `DATE_TRUNC` with the `ISOYEAR` date part
truncates the `date_expression` to the beginning of the ISO year, not the
Gregorian calendar year. The first Thursday of the 2015 calendar year was
2015-01-01, so the ISO year 2015 begins on the preceding Monday, 2014-12-29.
Therefore the ISO year boundary preceding the `date_expression` 2015-06-15 is
2014-12-29.

```sql
SELECT
  DATE_TRUNC('2015-06-15', ISOYEAR) AS isoyear_boundary,
  EXTRACT(ISOYEAR FROM DATE '2015-06-15') AS isoyear_number;

/*------------------+----------------+
 | isoyear_boundary | isoyear_number |
 +------------------+----------------+
 | 2014-12-29       | 2015           |
 +------------------+----------------*/
```

### `EXTRACT`

```sql
EXTRACT(part FROM date_expression)
```

**Description**

Returns the value corresponding to the specified date part. The `part` must
be one of:

- `DAYOFWEEK`: Returns values in the range \[1,7\] with Sunday as the first day of the week.
- `DAY`
- `DAYOFYEAR`
- `WEEK`: Returns the week number of the date in the range \[0, 53\]. Weeks begin with Sunday, and dates prior to the first Sunday of the year are in week 0.
- `WEEK(<WEEKDAY>)`: Returns the week number of the date in the range \[0, 53\]. Weeks begin on `WEEKDAY`. Dates prior to the first `WEEKDAY` of the year are in week 0. Valid values for `WEEKDAY` are `SUNDAY`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, and `SATURDAY`.
- `ISOWEEK`: Returns the [ISO 8601 week](https://en.wikipedia.org/wiki/ISO_week_date) number of the `date_expression`. `ISOWEEK`s begin on Monday. Return values are in the range \[1, 53\]. The first `ISOWEEK` of each ISO year begins on the Monday before the first Thursday of the Gregorian calendar year.
- `MONTH`
- `QUARTER`: Returns values in the range \[1,4\].
- `YEAR`
- `ISOYEAR`: Returns the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) week-numbering year, which is the Gregorian calendar year containing the Thursday of the week to which `date_expression` belongs.

**Return Data Type**

INT64

**Examples**

In the following example, `EXTRACT` returns a value corresponding to the `DAY`
date part.

```sql
SELECT EXTRACT(DAY FROM DATE '2013-12-25') AS the_day;

/*---------+
 | the_day |
 +---------+
 | 25      |
 +---------*/
```

In the following example, `EXTRACT` returns values corresponding to different
date parts from a column of dates near the end of the year.

```sql
SELECT
  date,
  EXTRACT(ISOYEAR FROM date) AS isoyear,
  EXTRACT(ISOWEEK FROM date) AS isoweek,
  EXTRACT(YEAR FROM date) AS year,
  EXTRACT(WEEK FROM date) AS week
FROM UNNEST(GENERATE_DATE_ARRAY('2015-12-23', '2016-01-09')) AS date
ORDER BY date;

/*------------+---------+---------+------+------+
 | date       | isoyear | isoweek | year | week |
 +------------+---------+---------+------+------+
 | 2015-12-23 | 2015    | 52      | 2015 | 51   |
 | 2015-12-24 | 2015    | 52      | 2015 | 51   |
 | 2015-12-25 | 2015    | 52      | 2015 | 51   |
 | 2015-12-26 | 2015    | 52      | 2015 | 51   |
 | 2015-12-27 | 2015    | 52      | 2015 | 52   |
 | 2015-12-28 | 2015    | 53      | 2015 | 52   |
 | 2015-12-29 | 2015    | 53      | 2015 | 52   |
 | 2015-12-30 | 2015    | 53      | 2015 | 52   |
 | 2015-12-31 | 2015    | 53      | 2015 | 52   |
 | 2016-01-01 | 2015    | 53      | 2016 | 0    |
 | 2016-01-02 | 2015    | 53      | 2016 | 0    |
 | 2016-01-03 | 2015    | 53      | 2016 | 1    |
 | 2016-01-04 | 2016    | 1       | 2016 | 1    |
 | 2016-01-05 | 2016    | 1       | 2016 | 1    |
 | 2016-01-06 | 2016    | 1       | 2016 | 1    |
 | 2016-01-07 | 2016    | 1       | 2016 | 1    |
 | 2016-01-08 | 2016    | 1       | 2016 | 1    |
 | 2016-01-09 | 2016    | 1       | 2016 | 1    |
 +------------+---------+---------+------+------*/
```

In the following example, `date_expression` falls on a Sunday. `EXTRACT`
calculates the first column using weeks that begin on Sunday, and it calculates
the second column using weeks that begin on Monday.

```sql
WITH table AS (SELECT DATE('2017-11-05') AS date)
SELECT
  date,
  EXTRACT(WEEK(SUNDAY) FROM date) AS week_sunday,
  EXTRACT(WEEK(MONDAY) FROM date) AS week_monday FROM table;

/*------------+-------------+-------------+
 | date       | week_sunday | week_monday |
 +------------+-------------+-------------+
 | 2017-11-05 | 45          | 44          |
 +------------+-------------+-------------*/
```

### `FORMAT_DATE`

```sql
FORMAT_DATE(format_string, date_expr)
```

**Description**

Formats a `DATE` value according to a specified format string.

**Definitions**

- `format_string`: A `STRING` value that contains the [format elements](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#format_elements_date_time) to use with `date_expr`.
- `date_expr`: A `DATE` value that represents the date to format.

**Return Data Type**

`STRING`

**Examples**

```sql
SELECT FORMAT_DATE('%x', DATE '2008-12-25') AS US_format;

/*------------+
 | US_format  |
 +------------+
 | 12/25/08   |
 +------------*/
```

```sql
SELECT FORMAT_DATE('%b-%d-%Y', DATE '2008-12-25') AS formatted;

/*-------------+
 | formatted   |
 +-------------+
 | Dec-25-2008 |
 +-------------*/
```

```sql
SELECT FORMAT_DATE('%b %Y', DATE '2008-12-25') AS formatted;

/*-------------+
 | formatted   |
 +-------------+
 | Dec 2008    |
 +-------------*/
```

### `LAST_DAY`

```sql
LAST_DAY(date_expression[, date_part])
```

**Description**

Returns the last day from a date expression. This is commonly used to return
the last day of the month.

You can optionally specify the date part for which the last day is returned.
If this parameter isn't used, the default value is `MONTH`.
`LAST_DAY` supports the following values for `date_part`:

- `YEAR`
- `QUARTER`
- `MONTH`
- `WEEK`. Weeks begin on Sunday, so the last day of the week is Saturday. `WEEK` is equivalent to `WEEK(SUNDAY)`.
- `WEEK(<WEEKDAY>)`. `<WEEKDAY>` represents the starting day of the week. Valid values are `SUNDAY`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, and `SATURDAY`.
- `ISOWEEK`. Uses [ISO 8601](https://en.wikipedia.org/wiki/ISO_week_date) week boundaries. ISO weeks begin on Monday, so the last day of the ISO week is Sunday.
- `ISOYEAR`. Uses the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) week-numbering year boundary. The ISO year boundary is the Monday of the first week whose Thursday belongs to the corresponding Gregorian calendar year, so the last day of the ISO year is the Sunday before the next ISO year boundary.

If `date_expression` is `NULL`, this function returns `NULL`. If the resulting
date exceeds `9999-12-31`, this function returns an out-of-range error.

**Return Data Type**

`DATE`

**Examples**

These both return the last day of the month:

```sql
SELECT LAST_DAY(DATE '2008-11-25', MONTH) AS last_day

/*------------+
 | last_day   |
 +------------+
 | 2008-11-30 |
 +------------*/
```

```sql
SELECT LAST_DAY(DATE '2008-11-25') AS last_day

/*------------+
 | last_day   |
 +------------+
 | 2008-11-30 |
 +------------*/
```

This returns the last day of the year:

```sql
SELECT LAST_DAY(DATE '2008-11-25', YEAR) AS last_day

/*------------+
 | last_day   |
 +------------+
 | 2008-12-31 |
 +------------*/
```

This returns the last day of the week for a week that starts on a Sunday:

```sql
SELECT LAST_DAY(DATE '2008-11-10', WEEK(SUNDAY)) AS last_day

/*------------+
 | last_day   |
 +------------+
 | 2008-11-15 |
 +------------*/
```

This returns the last day of the week for a week that starts on a Monday:

```sql
SELECT LAST_DAY(DATE '2008-11-10', WEEK(MONDAY)) AS last_day

/*------------+
 | last_day   |
 +------------+
 | 2008-11-16 |
 +------------*/
```

### `PARSE_DATE`

```sql
PARSE_DATE(format_string, date_string)
```

**Description**

Converts a `STRING` value to a `DATE` value.

**Definitions**

- `format_string`: A `STRING` value that contains the [format elements](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#format_elements_date_time) to use with `date_string`.
- `date_string`: A `STRING` value that represents the date to parse.

**Details**

Each element in `date_string` must have a corresponding element in
`format_string`. The location of each element in `format_string` must match the
location of each element in `date_string`.

```sql
-- This works because elements on both sides match.
SELECT PARSE_DATE('%A %b %e %Y', 'Thursday Dec 25 2008');

-- This produces an error because the year element is in different locations.
SELECT PARSE_DATE('%Y %A %b %e', 'Thursday Dec 25 2008');

-- This produces an error because one of the year elements is missing.
SELECT PARSE_DATE('%A %b %e', 'Thursday Dec 25 2008');

-- This works because %F can find all matching elements in date_string.
SELECT PARSE_DATE('%F', '2000-12-30');
```

The following additional considerations apply when using the `PARSE_DATE`
function:

- Unspecified fields. Any unspecified field is initialized from `1970-01-01`.
- Case insensitivity. Names, such as `Monday`, `February`, and so on, are case insensitive.
- Whitespace. One or more consecutive white spaces in the format string matches zero or more consecutive white spaces in the date string. In addition, leading and trailing white spaces in the date string are always allowed, even if they aren't in the format string.
- Format precedence. When two (or more) format elements have overlapping information (for example both `%F` and `%Y` affect the year), the last one generally overrides any earlier ones.
- Mixed ISO and non-ISO elements. The ISO format elements are `%G`, `%g`, `%J`, and `%V`. When these ISO elements are used together with other non-ISO elements, the ISO elements are ignored, resulting in different values. For example, the function arguments `('%g %J', '8405')` return a value with the year `1984`, whereas the arguments `('%g %j', '8405')` return a value with the year `1970` because the ISO element `%g` is ignored.
- Numeric values after `%G` input values. Any input string value that corresponds to the `%G` format element requires a whitespace or non-digit character as a separator from numeric values that follow. This is a known issue in GoogleSQL. For example, the function arguments `('%G
  %V','2020 50')` or `('%G-%V','2020-50')` work, but not `('%G%V','202050')`. For input values before the corresponding `%G` value, no separator is needed. For example, the arguments `('%V%G','502020')` work. The separator after the `%G` values identifies the end of the specified ISO year value so that the function can parse properly.

**Return Data Type**

`DATE`

**Examples**

This example converts a `MM/DD/YY` formatted string to a `DATE` object:

```sql
SELECT PARSE_DATE('%x', '12/25/08') AS parsed;

/*------------+
 | parsed     |
 +------------+
 | 2008-12-25 |
 +------------*/
```

This example converts a `YYYYMMDD` formatted string to a `DATE` object:

```sql
SELECT PARSE_DATE('%Y%m%d', '20081225') AS parsed;

/*------------+
 | parsed     |
 +------------+
 | 2008-12-25 |
 +------------*/
```

### `UNIX_DATE`

```sql
UNIX_DATE(date_expression)
```

**Description**

Returns the number of days since `1970-01-01`.

**Return Data Type**

INT64

**Example**

```sql
SELECT UNIX_DATE(DATE '2008-12-25') AS days_from_epoch;

/*-----------------+
 | days_from_epoch |
 +-----------------+
 | 14238           |
 +-----------------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/date_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Conflicting official statements: the `DATE_DIFF` description says it returns the number of unit boundaries between the two dates, and the `WEEK` and `YEAR` examples on this page explain their results the same way (Saturday 2017-10-14 to Sunday 2017-10-15 returns 1 `WEEK` although the dates are one day apart). The Details paragraph and the 3.9 / 3.1 years example instead describe the result as an elapsed fraction truncated toward zero. The two readings agree only when `start_date` falls on a unit boundary, as it does in that example (`2020-01-01`); when it doesn't, the result is the boundary count. The official text is kept as published.

## Related

- [Index of this directory](./README.md)

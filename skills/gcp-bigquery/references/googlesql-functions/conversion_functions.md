---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions
---

# Conversion functions

## Signature / Usage

GoogleSQL for BigQuery supports conversion functions. These data type
conversions are explicit, but some conversions can happen implicitly. You can
learn more about implicit and explicit conversion [here](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_rules).

### Function list

| Name | Summary |
|---|---|
| [`ARRAY_TO_STRING`](array_functions.md#array_to_string) | Produces a concatenation of the elements in an array as a `STRING` value. For more information, see [Array functions](array_functions.md). |
| [`BOOL`](json_functions-1.md#bool) | Converts a JSON boolean to a SQL `BOOL` value. For more information, see [JSON functions](json_functions-1.md). |
| [`CAST`](#cast) | Convert the results of an expression to the given type. |
| [`CHR`](string_functions-1.md#chr) | Converts a Unicode code point to a character. For more information, see [String functions](string_functions-1.md). |
| [`CODE_POINTS_TO_BYTES`](string_functions-1.md#code_points_to_bytes) | Converts an array of extended ASCII code points to a `BYTES` value. For more information, see [String aggregate functions](string_functions-1.md). |
| [`CODE_POINTS_TO_STRING`](string_functions-1.md#code_points_to_string) | Converts an array of extended ASCII code points to a `STRING` value. For more information, see [String aggregate functions](string_functions-1.md). |
| [`DATE_FROM_UNIX_DATE`](date_functions.md#date_from_unix_date) | Interprets an `INT64` expression as the number of days since 1970-01-01. For more information, see [Date functions](date_functions.md). |
| [`FROM_BASE32`](string_functions-1.md#from_base32) | Converts a base32-encoded `STRING` value into a `BYTES` value. For more information, see [String functions](string_functions-1.md). |
| [`FROM_BASE64`](string_functions-1.md#from_base64) | Converts a base64-encoded `STRING` value into a `BYTES` value. For more information, see [String functions](string_functions-1.md). |
| [`FROM_HEX`](string_functions-1.md#from_hex) | Converts a hexadecimal-encoded `STRING` value into a `BYTES` value. For more information, see [String functions](string_functions-1.md). |
| [`INT64`](json_functions-1.md#int64) | Converts a JSON number to a SQL `INT64` value. For more information, see [JSON functions](json_functions-1.md). |
| [`LAX_BOOL`](json_functions-2.md#lax_bool) | Attempts to convert a JSON value to a SQL `BOOL` value. For more information, see [JSON functions](json_functions-1.md). |
| [`LAX_FLOAT64`](json_functions-2.md#lax_float64) | Attempts to convert a JSON value to a SQL `FLOAT64` value. For more information, see [JSON functions](json_functions-1.md). |
| [`LAX_INT64`](json_functions-2.md#lax_int64) | Attempts to convert a JSON value to a SQL `INT64` value. For more information, see [JSON functions](json_functions-1.md). |
| [`LAX_STRING`](json_functions-2.md#lax_string) | Attempts to convert a JSON value to a SQL `STRING` value. For more information, see [JSON functions](json_functions-1.md). |
| [`PARSE_BIGNUMERIC`](#parse_bignumeric) | Converts a `STRING` value to a `BIGNUMERIC` value. |
| [`PARSE_DATE`](date_functions.md#parse_date) | Converts a `STRING` value to a `DATE` value. For more information, see [Date functions](date_functions.md). |
| [`PARSE_DATETIME`](datetime_functions.md#parse_datetime) | Converts a `STRING` value to a `DATETIME` value. For more information, see [Datetime functions](datetime_functions.md). |
| [`PARSE_JSON`](json_functions-2.md#parse_json) | Converts a JSON-formatted `STRING` value to a `JSON` value. For more information, see [JSON functions](json_functions-1.md). |
| [`PARSE_NUMERIC`](#parse_numeric) | Converts a `STRING` value to a `NUMERIC` value. |
| [`PARSE_TIME`](time_functions.md#parse_time) | Converts a `STRING` value to a `TIME` value. For more information, see [Time functions](time_functions.md). |
| [`PARSE_TIMESTAMP`](timestamp_functions.md#parse_timestamp) | Converts a `STRING` value to a `TIMESTAMP` value. For more information, see [Timestamp functions](timestamp_functions.md). |
| [`SAFE_CAST`](#safe_cast) | Similar to the `CAST` function, but returns `NULL` when a runtime error is produced. |
| [`SAFE_CONVERT_BYTES_TO_STRING`](string_functions-2.md#safe_convert_bytes_to_string) | Converts a `BYTES` value to a `STRING` value and replace any invalid UTF-8 characters with the Unicode replacement character, `U+FFFD`. For more information, see [String functions](string_functions-1.md). |
| [`STRING` (JSON)](json_functions-2.md#string) | Converts a JSON string to a SQL `STRING` value. For more information, see [JSON functions](json_functions-1.md). |
| [`STRING` (Timestamp)](timestamp_functions.md#string) | Converts a `TIMESTAMP` value to a `STRING` value. For more information, see [Timestamp functions](timestamp_functions.md). |
| [`TIMESTAMP_MICROS`](timestamp_functions.md#timestamp_micros) | Converts the number of microseconds since 1970-01-01 00:00:00 UTC to a `TIMESTAMP`. For more information, see [Timestamp functions](timestamp_functions.md). |
| [`TIMESTAMP_MILLIS`](timestamp_functions.md#timestamp_millis) | Converts the number of milliseconds since 1970-01-01 00:00:00 UTC to a `TIMESTAMP`. For more information, see [Timestamp functions](timestamp_functions.md). |
| [`TIMESTAMP_SECONDS`](timestamp_functions.md#timestamp_seconds) | Converts the number of seconds since 1970-01-01 00:00:00 UTC to a `TIMESTAMP`. For more information, see [Timestamp functions](timestamp_functions.md). |
| [`TO_BASE32`](string_functions-2.md#to_base32) | Converts a `BYTES` value to a base32-encoded `STRING` value. For more information, see [String functions](string_functions-1.md). |
| [`TO_BASE64`](string_functions-2.md#to_base64) | Converts a `BYTES` value to a base64-encoded `STRING` value. For more information, see [String functions](string_functions-1.md). |
| [`TO_CODE_POINTS`](string_functions-2.md#to_code_points) | Converts a `STRING` or `BYTES` value into an array of extended ASCII code points. For more information, see [String functions](string_functions-1.md). |
| [`TO_HEX`](string_functions-2.md#to_hex) | Converts a `BYTES` value to a hexadecimal `STRING` value. For more information, see [String functions](string_functions-1.md). |
| [`TO_JSON`](json_functions-2.md#to_json) | Converts a SQL value to a JSON value. For more information, see [JSON functions](json_functions-1.md). |
| [`TO_JSON_STRING`](json_functions-2.md#to_json_string) | Converts a SQL value to a JSON-formatted `STRING` value. For more information, see [JSON functions](json_functions-1.md). |
| [`UNIX_DATE`](date_functions.md#unix_date) | Converts a `DATE` value to the number of days since 1970-01-01. For more information, see [Date functions](date_functions.md). |
| [`UNIX_MICROS`](timestamp_functions.md#unix_micros) | Converts a `TIMESTAMP` value to the number of microseconds since 1970-01-01 00:00:00 UTC. For more information, see [Timestamp functions](timestamp_functions.md). |
| [`UNIX_MILLIS`](timestamp_functions.md#unix_millis) | Converts a `TIMESTAMP` value to the number of milliseconds since 1970-01-01 00:00:00 UTC. For more information, see [Timestamp functions](timestamp_functions.md). |
| [`UNIX_SECONDS`](timestamp_functions.md#unix_seconds) | Converts a `TIMESTAMP` value to the number of seconds since 1970-01-01 00:00:00 UTC. For more information, see [Timestamp functions](timestamp_functions.md). |

### `CAST`

```sql
CAST(expression AS typename [format_clause])
```

**Description**

Cast syntax is used in a query to indicate that the result type of an
expression should be converted to some other type.

When using `CAST`, a query can fail if GoogleSQL is unable to perform
the cast. If you want to protect your queries from these types of errors, you
can use [SAFE_CAST](#safe_cast).

Casts between supported types that don't successfully map from the original
value to the target domain produce runtime errors. For example, casting
`BYTES` to `STRING` where the byte sequence isn't valid UTF-8 results in a
runtime error.

Some casts can include a [format clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#formatting_syntax), which provides
instructions for how to conduct the
cast. For example, you could
instruct a cast to convert a sequence of bytes to a BASE64-encoded string
instead of a UTF-8-encoded string.

The structure of the format clause is unique to each type of cast and more
information is available in the section for that cast.

**Examples**

The following query results in `"true"` if `x` is `1`, `"false"` for any other
non-`NULL` value, and `NULL` if `x` is `NULL`.

```sql
CAST(x=1 AS STRING)
```

#### CAST AS ARRAY

```sql
CAST(expression AS ARRAY<element_type>)
```

**Description**

GoogleSQL supports [casting](#cast) to `ARRAY`. The
`expression` parameter can represent an expression for these data types:

- `ARRAY`

**Conversion rules**

| From | To | Rule(s) when casting `x` |
|---|---|---|
| `ARRAY` | `ARRAY` | Must be the exact same array type. |
| `NULL` | `ARRAY` | Casts a `NULL` value to a specific type of array. For example, `CAST(NULL AS ARRAY<FLOAT64>)` returns a `NULL` literal of type `ARRAY<FLOAT64>`. |

#### CAST AS BIGNUMERIC

```sql
CAST(expression AS BIGNUMERIC)
```

**Description**

GoogleSQL supports [casting](#cast) to `BIGNUMERIC`. The
`expression` parameter can represent an expression for these data types:

- `INT64`
- `FLOAT64`
- `NUMERIC`
- `BIGNUMERIC`
- `STRING`

**Conversion rules**

| From | To | Rule(s) when casting `x` |
|---|---|---|
| FLOAT64 | `BIGNUMERIC` | The floating point number will round [half away from zero](https://en.wikipedia.org/wiki/Rounding#Round_half_away_from_zero). Casting a `NaN`, `+inf` or `-inf` will return an error. Casting a value outside the range of `BIGNUMERIC` returns an overflow error. |
| `STRING` | `BIGNUMERIC` | The numeric literal contained in the string must not exceed the maximum precision or range of the `BIGNUMERIC` type, or an error will occur. If the number of digits after the decimal point exceeds 38, then the resulting `BIGNUMERIC` value will round [half away from zero](https://en.wikipedia.org/wiki/Rounding#Round_half_away_from_zero) to have 38 digits after the decimal point. |

#### CAST AS BOOL

```sql
CAST(expression AS BOOL)
```

**Description**

GoogleSQL supports [casting](#cast) to `BOOL`. The
`expression` parameter can represent an expression for these data types:

- `INT64`
- `BOOL`
- `STRING`

**Conversion rules**

| From | To | Rule(s) when casting `x` |
|---|---|---|
| INT64 | `BOOL` | Returns `FALSE` if `x` is `0`, `TRUE` otherwise. |
| `STRING` | `BOOL` | Returns `TRUE` if `x` is `"true"` and `FALSE` if `x` is `"false"` All other values of `x` are invalid and throw an error instead of casting to a boolean. A string is case-insensitive when converting to a boolean. |

#### CAST AS BYTES

```sql
CAST(expression AS BYTES [format_clause])
```

**Description**

GoogleSQL supports [casting](#cast) to `BYTES`. The
`expression` parameter can represent an expression for these data types:

- `BYTES`
- `STRING`

**Format clause**

When an expression of one type is cast to another type, you can use the
[format clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#formatting_syntax) to provide instructions for how to conduct
the cast. You can use the format clause in this section if `expression` is a
`STRING`.

- [Format string as bytes](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#format_string_as_bytes)

**Conversion rules**

| From | To | Rule(s) when casting `x` |
|---|---|---|
| `STRING` | `BYTES` | Strings are cast to bytes using UTF-8 encoding. For example, the string "©", when cast to bytes, would become a 2-byte sequence with the hex values C2 and A9. |

#### CAST AS DATE

```sql
CAST(expression AS DATE [format_clause])
```

**Description**

GoogleSQL supports [casting](#cast) to `DATE`. The `expression`
parameter can represent an expression for these data types:

- `STRING`
- `DATETIME`
- `TIMESTAMP`

**Format clause**

When an expression of one type is cast to another type, you can use the
[format clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#formatting_syntax) to provide instructions for how to conduct
the cast. You can use the format clause in this section if `expression` is a
`STRING`.

- [Format string as date and time](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#format_string_as_datetime)

**Conversion rules**

| From | To | Rule(s) when casting `x` |
|---|---|---|
| `STRING` | `DATE` | When casting from string to date, the string must conform to the supported date literal format, and is independent of time zone. If the string expression is invalid or represents a date that's outside of the supported min/max range, then an error is produced. |
| `TIMESTAMP` | `DATE` | Casting from a timestamp to date effectively truncates the timestamp as of the default time zone. |

#### CAST AS DATETIME

```sql
CAST(expression AS DATETIME [format_clause])
```

**Description**

GoogleSQL supports [casting](#cast) to `DATETIME`. The
`expression` parameter can represent an expression for these data types:

- `STRING`
- `DATETIME`
- `TIMESTAMP`

**Format clause**

When an expression of one type is cast to another type, you can use the
[format clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#formatting_syntax) to provide instructions for how to conduct
the cast. You can use the format clause in this section if `expression` is a
`STRING`.

- [Format string as date and time](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#format_string_as_datetime)

**Conversion rules**

| From | To | Rule(s) when casting `x` |
|---|---|---|
| `STRING` | `DATETIME` | When casting from string to datetime, the string must conform to the supported datetime literal format, and is independent of time zone. If the string expression is invalid or represents a datetime that's outside of the supported min/max range, then an error is produced. |
| `TIMESTAMP` | `DATETIME` | Casting from a timestamp to datetime effectively truncates the timestamp as of the default time zone. |

#### CAST AS FLOAT64

```sql
CAST(expression AS FLOAT64)
```

**Description**

GoogleSQL supports [casting](#cast) to floating point types.
The `expression` parameter can represent an expression for these data types:

- `INT64`
- `FLOAT64`
- `NUMERIC`
- `BIGNUMERIC`
- `STRING`

**Conversion rules**

| From | To | Rule(s) when casting `x` |
|---|---|---|
| INT64 | FLOAT64 | Returns a close but potentially not exact floating point value. |
| `NUMERIC` | FLOAT64 | `NUMERIC` will convert to the closest floating point number with a possible loss of precision. |
| `BIGNUMERIC` | FLOAT64 | `BIGNUMERIC` will convert to the closest floating point number with a possible loss of precision. |
| `STRING` | FLOAT64 | Returns `x` as a floating point value, interpreting it as having the same form as a valid floating point literal. Also supports casts from `"[+,-]inf"` to `[,-]Infinity`, `"[+,-]infinity"` to `[,-]Infinity`, and `"[+,-]nan"` to `NaN`. Conversions are case-insensitive. |

#### CAST AS INT64

```sql
CAST(expression AS INT64)
```

**Description**

GoogleSQL supports [casting](#cast) to integer types.
The `expression` parameter can represent an expression for these data types:

- `INT64`
- `FLOAT64`
- `NUMERIC`
- `BIGNUMERIC`
- `BOOL`
- `STRING`

**Conversion rules**

| From | To | Rule(s) when casting `x` |
|---|---|---|
| FLOAT64 | INT64 | Returns the closest integer value. Halfway cases such as 1.5 or -0.5 round away from zero. |
| `BOOL` | INT64 | Returns `1` if `x` is `TRUE`, `0` otherwise. |
| `STRING` | INT64 | A hex string can be cast to an integer. For example, `0x123` to `291` or `-0x123` to `-291`. |

**Examples**

If you are working with hex strings (`0x123`), you can cast those strings as
integers:

```sql
SELECT '0x123' as hex_value, CAST('0x123' as INT64) as hex_to_int;

/*-----------+------------+
 | hex_value | hex_to_int |
 +-----------+------------+
 | 0x123     | 291        |
 +-----------+------------*/
```

```sql
SELECT '-0x123' as hex_value, CAST('-0x123' as INT64) as hex_to_int;

/*-----------+------------+
 | hex_value | hex_to_int |
 +-----------+------------+
 | -0x123    | -291       |
 +-----------+------------*/
```

#### CAST AS INTERVAL

```sql
CAST(expression AS INTERVAL)
```

**Description**

GoogleSQL supports [casting](#cast) to `INTERVAL`. The
`expression` parameter can represent an expression for these data types:

- `STRING`

**Conversion rules**

| From | To | Rule(s) when casting `x` |
|---|---|---|
| `STRING` | `INTERVAL` | When casting from string to interval, the string must conform to either [ISO 8601 Duration](https://en.wikipedia.org/wiki/ISO_8601#Durations) standard or to interval literal format 'Y-M D H:M:S.F'. Partial interval literal formats are also accepted when they aren't ambiguous, for example 'H:M:S'. If the string expression is invalid or represents an interval that is outside of the supported min/max range, then an error is produced. |

**Examples**

```sql
SELECT input, CAST(input AS INTERVAL) AS output
FROM UNNEST([
  '1-2 3 10:20:30.456',
  '1-2',
  '10:20:30',
  'P1Y2M3D',
  'PT10H20M30,456S'
]) input

/*--------------------+--------------------+
 | input              | output             |
 +--------------------+--------------------+
 | 1-2 3 10:20:30.456 | 1-2 3 10:20:30.456 |
 | 1-2                | 1-2 0 0:0:0        |
 | 10:20:30           | 0-0 0 10:20:30     |
 | P1Y2M3D            | 1-2 3 0:0:0        |
 | PT10H20M30,456S    | 0-0 0 10:20:30.456 |
 +--------------------+--------------------*/
```

#### CAST AS NUMERIC

```sql
CAST(expression AS NUMERIC)
```

**Description**

GoogleSQL supports [casting](#cast) to `NUMERIC`. The
`expression` parameter can represent an expression for these data types:

- `INT64`
- `FLOAT64`
- `NUMERIC`
- `BIGNUMERIC`
- `STRING`

**Conversion rules**

| From | To | Rule(s) when casting `x` |
|---|---|---|
| `FLOAT64` | `NUMERIC` | The floating point number will round [half away from zero](https://en.wikipedia.org/wiki/Rounding#Round_half_away_from_zero). Casting a `NaN`, `+inf` or `-inf` will return an error. Casting a value outside the range of `NUMERIC` returns an overflow error. |
| `STRING` | `NUMERIC` | The numeric literal contained in the string must not exceed the maximum precision or range of the `NUMERIC` type, or an error will occur. If the number of digits after the decimal point exceeds nine, then the resulting `NUMERIC` value will round [half away from zero](https://en.wikipedia.org/wiki/Rounding#Round_half_away_from_zero). to have nine digits after the decimal point. |

#### CAST AS RANGE

```sql
CAST(expression AS RANGE)
```

**Description**

GoogleSQL supports [casting](#cast) to `RANGE`. The
`expression` parameter can represent an expression for these data types:

- `STRING`

**Conversion rules**

| From | To | Rule(s) when casting `x` |
|---|---|---|
| `STRING` | `RANGE` | When casting from string to range, the string must conform to the supported range literal format. If the string expression is invalid or represents a range that's outside of the supported subtype min/max range, then an error is produced. |

**Examples**

```sql
SELECT CAST(
  '[2020-01-01, 2020-01-02)'
  AS RANGE<DATE>) AS string_to_range

/*----------------------------------------+
 | string_to_range                        |
 +----------------------------------------+
 | [DATE '2020-01-01', DATE '2020-01-02') |
 +----------------------------------------*/
```

```sql
SELECT CAST(
  '[2014-09-27 12:30:00.45, 2016-10-17 11:15:00.33)'
  AS RANGE<DATETIME>) AS string_to_range

/*------------------------------------------------------------------------+
 | string_to_range                                                        |
 +------------------------------------------------------------------------+
 | [DATETIME '2014-09-27 12:30:00.45', DATETIME '2016-10-17 11:15:00.33') |
 +------------------------------------------------------------------------*/
```

```sql
SELECT CAST(
  '[2014-09-27 12:30:00+08, 2016-10-17 11:15:00+08)'
  AS RANGE<TIMESTAMP>) AS string_to_range

-- Results depend upon where this query was executed.
/*---------------------------------------------------------------------------+
 | string_to_range                                                           |
 +---------------------------------------------------------------------------+
 | [TIMESTAMP '2014-09-27 12:30:00+08', TIMESTAMP '2016-10-17 11:15:00 UTC') |
 +---------------------------------------------------------------------------*/
```

```sql
SELECT CAST(
  '[UNBOUNDED, 2020-01-02)'
  AS RANGE<DATE>) AS string_to_range

/*--------------------------------+
 | string_to_range                |
 +--------------------------------+
 | [UNBOUNDED, DATE '2020-01-02') |
 +--------------------------------*/
```

```sql
SELECT CAST(
  '[2020-01-01, NULL)'
  AS RANGE<DATE>) AS string_to_range

/*--------------------------------+
 | string_to_range                |
 +--------------------------------+
 | [DATE '2020-01-01', UNBOUNDED) |
 +--------------------------------*/
```

#### CAST AS STRING

```sql
CAST(expression AS STRING [format_clause [AT TIME ZONE timezone_expr]])
```

**Description**

GoogleSQL supports [casting](#cast) to `STRING`. The
`expression` parameter can represent an expression for these data types:

- `INT64`
- `FLOAT64`
- `NUMERIC`
- `BIGNUMERIC`
- `BOOL`
- `BYTES`
- `TIME`
- `DATE`
- `DATETIME`
- `TIMESTAMP`
- `RANGE`
- `INTERVAL`
- `STRING`

**Format clause**

When an expression of one type is cast to another type, you can use the
[format clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#formatting_syntax) to provide instructions for how to conduct
the cast. You can use the format clause in this section if `expression` is one
of these data types:

- `INT64`
- `FLOAT64`
- `NUMERIC`
- `BIGNUMERIC`
- `BYTES`
- `TIME`
- `DATE`
- `DATETIME`
- `TIMESTAMP`

The format clause for `STRING` has an additional optional clause called
`AT TIME ZONE timezone_expr`, which you can use to specify a specific time zone
to use during formatting of a `TIMESTAMP`. If this optional clause isn't
included when formatting a `TIMESTAMP`, the default time zone,
UTC, is used.

For more information, see the following topics:

- [Format bytes as string](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#format_bytes_as_string)
- [Format date and time as string](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#format_date_time_as_string)
- [Format numeric type as string](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#format_numeric_type_as_string)

**Conversion rules**

| From | To | Rule(s) when casting `x` |
|---|---|---|
| FLOAT64 | `STRING` | Returns an approximate string representation. A returned `NaN` or `0` will not be signed. |
| `BOOL` | `STRING` | Returns `"true"` if `x` is `TRUE`, `"false"` otherwise. |
| `BYTES` | `STRING` | Returns `x` interpreted as a UTF-8 string. For example, the bytes literal `b'\xc2\xa9'`, when cast to a string, is interpreted as UTF-8 and becomes the unicode character "©". An error occurs if `x` isn't valid UTF-8. |
| `TIME` | `STRING` | Casting from a time type to a string is independent of time zone and is of the form `HH:MM:SS`. |
| `DATE` | `STRING` | Casting from a date type to a string is independent of time zone and is of the form `YYYY-MM-DD`. |
| `DATETIME` | `STRING` | Casting from a datetime type to a string is independent of time zone and is of the form `YYYY-MM-DD HH:MM:SS`. |
| `TIMESTAMP` | `STRING` | When casting from timestamp types to string, the timestamp is interpreted using the default time zone, UTC. The number of subsecond digits produced depends on the number of trailing zeroes in the subsecond part: the CAST function will truncate zero, three, or six digits. |
| `INTERVAL` | `STRING` | Casting from an interval to a string is of the form `Y-M D H:M:S`. |

**Examples**

```sql
SELECT CAST(CURRENT_DATE() AS STRING) AS current_date

/*---------------+
 | current_date  |
 +---------------+
 | 2021-03-09    |
 +---------------*/
```

```sql
SELECT CAST(CURRENT_DATE() AS STRING FORMAT 'DAY') AS current_day

/*-------------+
 | current_day |
 +-------------+
 | MONDAY      |
 +-------------*/
```

```sql
SELECT CAST(
  TIMESTAMP '2008-12-25 00:00:00+00:00'
  AS STRING FORMAT 'YYYY-MM-DD HH24:MI:SS TZH:TZM') AS date_time_to_string

-- Results depend upon where this query was executed.
/*------------------------------+
 | date_time_to_string          |
 +------------------------------+
 | 2008-12-24 16:00:00 -08:00   |
 +------------------------------*/
```

```sql
SELECT CAST(
  TIMESTAMP '2008-12-25 00:00:00+00:00'
  AS STRING FORMAT 'YYYY-MM-DD HH24:MI:SS TZH:TZM'
  AT TIME ZONE 'Asia/Kolkata') AS date_time_to_string

-- Because the time zone is specified, the result is always the same.
/*------------------------------+
 | date_time_to_string          |
 +------------------------------+
 | 2008-12-25 05:30:00 +05:30   |
 +------------------------------*/
```

```sql
SELECT CAST(INTERVAL 3 DAY AS STRING) AS interval_to_string

/*--------------------+
 | interval_to_string |
 +--------------------+
 | 0-0 3 0:0:0        |
 +--------------------*/
```

```sql
SELECT CAST(
  INTERVAL "1-2 3 4:5:6.789" YEAR TO SECOND
  AS STRING) AS interval_to_string

/*--------------------+
 | interval_to_string |
 +--------------------+
 | 1-2 3 4:5:6.789    |
 +--------------------*/
```

#### CAST AS STRUCT

```sql
CAST(expression AS STRUCT)
```

**Description**

GoogleSQL supports [casting](#cast) to `STRUCT`. The
`expression` parameter can represent an expression for these data types:

- `STRUCT`

**Conversion rules**

| From | To | Rule(s) when casting `x` |
|---|---|---|
| `STRUCT` | `STRUCT` | Allowed if the following conditions are met: 1. The two structs have the same number of fields. 2. The original struct field types can be explicitly cast to the corresponding target struct field types (as defined by field order, not field name). |

#### CAST AS TIME

```sql
CAST(expression AS TIME [format_clause])
```

**Description**

GoogleSQL supports [casting](#cast) to TIME. The `expression`
parameter can represent an expression for these data types:

- `STRING`
- `TIME`
- `DATETIME`
- `TIMESTAMP`

**Format clause**

When an expression of one type is cast to another type, you can use the
[format clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#formatting_syntax) to provide instructions for how to conduct
the cast. You can use the format clause in this section if `expression` is a
`STRING`.

- [Format string as date and time](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#format_string_as_datetime)

**Conversion rules**

| From | To | Rule(s) when casting `x` |
|---|---|---|
| `STRING` | `TIME` | When casting from string to time, the string must conform to the supported time literal format, and is independent of time zone. If the string expression is invalid or represents a time that's outside of the supported min/max range, then an error is produced. |

#### CAST AS TIMESTAMP

```sql
CAST(expression AS TIMESTAMP [format_clause [AT TIME ZONE timezone_expr]])
```

**Description**

GoogleSQL supports [casting](#cast) to `TIMESTAMP`. The
`expression` parameter can represent an expression for these data types:

- `DATE`
- `DATETIME`
- `STRING`
- `TIMESTAMP`

**Format clause**

When an expression of one type is cast to another type, you can use the
[format clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#formatting_syntax) to provide instructions for how to conduct
the cast. You can use the format clause in this section if `expression` is a
`STRING`.

- [Format string as date and time](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#format_string_as_datetime)

The format clause for `TIMESTAMP` has an additional optional clause called
`AT TIME ZONE timezone_expr`, which you can use to specify a specific time zone
to use during formatting. If this optional clause isn't included, the default
time zone, UTC, is used.

**Conversion rules**

| From | To | Rule(s) when casting `x` |
|---|---|---|
| `STRING` | `TIMESTAMP` | When casting from string to a timestamp, `string_expression` must conform to the supported timestamp literal formats, or else a runtime error occurs. The `string_expression` may itself contain a time zone. <br /> If there is a time zone in the `string_expression`, that time zone is used for conversion, otherwise the default time zone, UTC, is used. If the string has fewer than six digits, then it's implicitly widened. <br /> An error is produced if the `string_expression` is invalid, has more than six subsecond digits (i.e., precision greater than microseconds), or represents a time outside of the supported timestamp range. |
| `DATE` | `TIMESTAMP` | Casting from a date to a timestamp interprets `date_expression` as of midnight (start of the day) in the default time zone, UTC. |
| `DATETIME` | `TIMESTAMP` | Casting from a datetime to a timestamp interprets `datetime_expression` in the default time zone, UTC. <br /> Most valid datetime values have exactly one corresponding timestamp in each time zone. However, there are certain combinations of valid datetime values and time zones that have zero or two corresponding timestamp values. This happens in a time zone when clocks are set forward or set back, such as for Daylight Savings Time. When there are two valid timestamps, the earlier one is used. When there is no valid timestamp, the length of the gap in time (typically one hour) is added to the datetime. |

**Examples**

The following example casts a string-formatted timestamp as a timestamp:

Adapted (not in the official docs): changed the shown result to `2020-06-02 17:00:53.110 UTC`, the instant the input string denotes.

```sql
SELECT CAST("2020-06-02 17:00:53.110+00:00" AS TIMESTAMP) AS as_timestamp

-- Results depend upon where this query was executed.
/*-----------------------------+
 | as_timestamp                |
 +-----------------------------+
 | 2020-06-02 17:00:53.110 UTC |
 +-----------------------------*/
```

The following examples cast a string-formatted date and time as a timestamp.
These examples return the same output as the previous example.

```sql
SELECT CAST('06/02/2020 17:00:53.110' AS TIMESTAMP FORMAT 'MM/DD/YYYY HH24:MI:SS.FF3' AT TIME ZONE 'UTC') AS as_timestamp
```

```sql
SELECT CAST('06/02/2020 17:00:53.110' AS TIMESTAMP FORMAT 'MM/DD/YYYY HH24:MI:SS.FF3' AT TIME ZONE '+00') AS as_timestamp
```

```sql
SELECT CAST('06/02/2020 17:00:53.110 +00' AS TIMESTAMP FORMAT 'MM/DD/YYYY HH24:MI:SS.FF3 TZH') AS as_timestamp
```

### `PARSE_BIGNUMERIC`

```sql
PARSE_BIGNUMERIC(string_expression)
```

**Description**

Converts a `STRING` to a `BIGNUMERIC` value.

The numeric literal contained in the string must not exceed the
[maximum precision or range](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#decimal_types) of the `BIGNUMERIC` type, or an
error occurs. If the number of digits after the decimal point exceeds 38, then
the resulting `BIGNUMERIC` value rounds
[half away from zero](https://en.wikipedia.org/wiki/Rounding#Round_half_away_from_zero) to have 38 digits after the
decimal point.

Adapted (not in the official docs): changed the input `123.456E37` to `12.34E37` so it matches the result shown.

```sql
-- This example shows how a string with a decimal point is parsed.
SELECT PARSE_BIGNUMERIC("123.45") AS parsed;

/*--------+
 | parsed |
 +--------+
 | 123.45 |
 +--------*/

-- This example shows how a string with an exponent is parsed.
SELECT PARSE_BIGNUMERIC("12.34E37") AS parsed;

/*-----------------------------------------+
 | parsed                                  |
 +-----------------------------------------+
 | 123400000000000000000000000000000000000 |
 +-----------------------------------------*/

-- This example shows the rounding when digits after the decimal point exceeds 38.
SELECT PARSE_BIGNUMERIC("1.123456789012345678901234567890123456789") as parsed;

/*------------------------------------------+
 | parsed                                   |
 +------------------------------------------+
 | 1.12345678901234567890123456789012345679 |
 +------------------------------------------*/
```

This function is similar to using the [`CAST AS BIGNUMERIC`](#cast-as-bignumeric)
function except that the `PARSE_BIGNUMERIC` function only accepts string inputs
and allows the following in the string:

- Spaces between the sign (+/-) and the number
- Signs (+/-) after the number

Rules for valid input strings:

| Rule | Example Input | Output |
|---|---|---|
| The string can only contain digits, commas, decimal points and signs. | "- 12,34567,89.0" | -123456789 |
| Whitespaces are allowed anywhere except between digits. | " - 12.345 " | -12.345 |
| Only digits and commas are allowed before the decimal point. | " 12,345,678" | 12345678 |
| Only digits are allowed after the decimal point. | "1.234 " | 1.234 |
| Use `E` or `e` for exponents. After the `e`, digits and a leading sign indicator are allowed. | " 123.45e-1" | 12.345 |
| If the integer part isn't empty, then it must contain at least one digit. | " 0,.12 -" | -0.12 |
| If the string contains a decimal point, then it must contain at least one digit. | " .1" | 0.1 |
| The string can't contain more than one sign. | " 0.5 +" | 0.5 |

**Return Data Type**

`BIGNUMERIC`

**Examples**

This example shows an input with spaces before, after, and between the
sign and the number:

```sql
SELECT PARSE_BIGNUMERIC("  -  12.34 ") as parsed;

/*--------+
 | parsed |
 +--------+
 | -12.34 |
 +--------*/
```

This example shows an input with an exponent as well as the sign after the
number:

```sql
SELECT PARSE_BIGNUMERIC("12.34e-1-") as parsed;

/*--------+
 | parsed |
 +--------+
 | -1.234 |
 +--------*/
```

This example shows an input with multiple commas in the integer part of the
number:

```sql
SELECT PARSE_BIGNUMERIC("  1,2,,3,.45 + ") as parsed;

/*--------+
 | parsed |
 +--------+
 | 123.45 |
 +--------*/
```

This example shows an input with a decimal point and no digits in the whole
number part:

```sql
SELECT PARSE_BIGNUMERIC(".1234  ") as parsed;

/*--------+
 | parsed |
 +--------+
 | 0.1234 |
 +--------*/
```

**Examples of invalid inputs**

This example is invalid because the whole number part contains no digits:

```sql
SELECT PARSE_BIGNUMERIC(",,,.1234  ") as parsed;
```

This example is invalid because there are whitespaces between digits:

```sql
SELECT PARSE_BIGNUMERIC("1  23.4 5  ") as parsed;
```

This example is invalid because the number is empty except for an exponent:

```sql
SELECT PARSE_BIGNUMERIC("  e1 ") as parsed;
```

This example is invalid because the string contains multiple signs:

```sql
SELECT PARSE_BIGNUMERIC("  - 12.3 - ") as parsed;
```

This example is invalid because the value of the number falls outside the range
of `BIGNUMERIC`:

```sql
SELECT PARSE_BIGNUMERIC("12.34E100 ") as parsed;
```

This example is invalid because the string contains invalid characters:

```sql
SELECT PARSE_BIGNUMERIC("$12.34") as parsed;
```

### `PARSE_NUMERIC`

```sql
PARSE_NUMERIC(string_expression)
```

**Description**

Converts a `STRING` to a `NUMERIC` value.

The numeric literal contained in the string must not exceed the
[maximum precision or range](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#decimal_types) of the `NUMERIC` type, or an error
occurs. If the number of digits after the decimal point exceeds nine, then the
resulting `NUMERIC` value rounds
[half away from zero](https://en.wikipedia.org/wiki/Rounding#Round_half_away_from_zero) to have nine digits after the
decimal point.

```sql
-- This example shows how a string with a decimal point is parsed.
SELECT PARSE_NUMERIC("123.45") AS parsed;

/*--------+
 | parsed |
 +--------+
 | 123.45 |
 +--------*/

-- This example shows how a string with an exponent is parsed.
SELECT PARSE_NUMERIC("12.34E27") as parsed;

/*-------------------------------+
 | parsed                        |
 +-------------------------------+
 | 12340000000000000000000000000 |
 +-------------------------------*/

-- This example shows the rounding when digits after the decimal point exceeds 9.
SELECT PARSE_NUMERIC("1.0123456789") as parsed;

/*-------------+
 | parsed      |
 +-------------+
 | 1.012345679 |
 +-------------*/
```

This function is similar to using the [`CAST AS NUMERIC`](#cast-as-numeric) function
except that the `PARSE_NUMERIC` function only accepts string inputs and allows
the following in the string:

- Spaces between the sign (+/-) and the number
- Signs (+/-) after the number

Rules for valid input strings:

| Rule | Example Input | Output |
|---|---|---|
| The string can only contain digits, commas, decimal points and signs. | "- 12,34567,89.0" | -123456789 |
| Whitespaces are allowed anywhere except between digits. | " - 12.345 " | -12.345 |
| Only digits and commas are allowed before the decimal point. | " 12,345,678" | 12345678 |
| Only digits are allowed after the decimal point. | "1.234 " | 1.234 |
| Use `E` or `e` for exponents. After the `e`, digits and a leading sign indicator are allowed. | " 123.45e-1" | 12.345 |
| If the integer part isn't empty, then it must contain at least one digit. | " 0,.12 -" | -0.12 |
| If the string contains a decimal point, then it must contain at least one digit. | " .1" | 0.1 |
| The string can't contain more than one sign. | " 0.5 +" | 0.5 |

**Return Data Type**

`NUMERIC`

**Examples**

This example shows an input with spaces before, after, and between the
sign and the number:

```sql
SELECT PARSE_NUMERIC("  -  12.34 ") as parsed;

/*--------+
 | parsed |
 +--------+
 | -12.34 |
 +--------*/
```

This example shows an input with an exponent as well as the sign after the
number:

```sql
SELECT PARSE_NUMERIC("12.34e-1-") as parsed;

/*--------+
 | parsed |
 +--------+
 | -1.234 |
 +--------*/
```

This example shows an input with multiple commas in the integer part of the
number:

```sql
SELECT PARSE_NUMERIC("  1,2,,3,.45 + ") as parsed;

/*--------+
 | parsed |
 +--------+
 | 123.45 |
 +--------*/
```

This example shows an input with a decimal point and no digits in the whole
number part:

```sql
SELECT PARSE_NUMERIC(".1234  ") as parsed;

/*--------+
 | parsed |
 +--------+
 | 0.1234 |
 +--------*/
```

**Examples of invalid inputs**

This example is invalid because the whole number part contains no digits:

```sql
SELECT PARSE_NUMERIC(",,,.1234  ") as parsed;
```

This example is invalid because there are whitespaces between digits:

```sql
SELECT PARSE_NUMERIC("1  23.4 5  ") as parsed;
```

This example is invalid because the number is empty except for an exponent:

```sql
SELECT PARSE_NUMERIC("  e1 ") as parsed;
```

This example is invalid because the string contains multiple signs:

```sql
SELECT PARSE_NUMERIC("  - 12.3 - ") as parsed;
```

This example is invalid because the value of the number falls outside the range
of `NUMERIC`:

```sql
SELECT PARSE_NUMERIC("12.34E100 ") as parsed;
```

This example is invalid because the string contains invalid characters:

```sql
SELECT PARSE_NUMERIC("$12.34") as parsed;
```

### `SAFE_CAST`

```sql
SAFE_CAST(expression AS typename [format_clause])
```

**Description**

When using `CAST`, a query can fail if GoogleSQL is unable to perform
the cast. For example, the following query generates an error:

```sql
SELECT CAST("apple" AS INT64) AS not_a_number;
```

If you want to protect your queries from these types of errors, you can use
`SAFE_CAST`. `SAFE_CAST` replaces runtime errors with `NULL`s. However, during
static analysis, impossible casts between two non-castable types still produce
an error because the query is invalid.

```sql
SELECT SAFE_CAST("apple" AS INT64) AS not_a_number;

/*--------------+
 | not_a_number |
 +--------------+
 | NULL         |
 +--------------*/
```

Some casts can include a [format clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#formatting_syntax), which provides
instructions for how to conduct the
cast. For example, you could
instruct a cast to convert a sequence of bytes to a BASE64-encoded string
instead of a UTF-8-encoded string.

The structure of the format clause is unique to each type of cast and more
information is available in the section for that cast.

If you are casting from bytes to strings, you can also use the
function, [`SAFE_CONVERT_BYTES_TO_STRING`](string_functions-2.md#safe_convert_bytes_to_string). Any invalid UTF-8 characters
are replaced with the unicode replacement character, `U+FFFD`.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the input `123.456E37` is 1.23456e39, which is outside the BIGNUMERIC range and cannot give the 39-digit result `1234` followed by zeros that is shown. The input is changed to `12.34E37`, which gives that result (the NUMERIC example uses the same pattern, `12.34E27`).
- Corrected from the official docs: the invalid `PARSE_NUMERIC` example said the value falls outside the range of `BIGNUMERIC`; `PARSE_NUMERIC` returns `NUMERIC` (the same sentence is correct for `PARSE_BIGNUMERIC`), so it is changed to `NUMERIC`.
- Corrected from the official docs: the input `2020-06-02 17:00:53.110+00:00` has offset 0, so the result is `2020-06-02 17:00:53.110 UTC`, not `2020-06-03 00:00:53.110 UTC`. The next paragraph says the `FORMAT` examples return the same output, and they parse 17:00:53.110 at offset 0.
- Conflicting official statements: in the `RANGE<TIMESTAMP>` example the two inputs are both written with `+08`, but the result shows the lower bound as `TIMESTAMP '2014-09-27 12:30:00+08'` and the upper bound as `TIMESTAMP '2016-10-17 11:15:00 UTC'`. The two bounds use different forms, and the page does not say which is right; the result is kept as published.
- Conflicting official statements: the text says the default time zone is UTC when `AT TIME ZONE` is omitted, but the `TZH:TZM` example for `TIMESTAMP '2008-12-25 00:00:00+00:00'` shows `2008-12-24 16:00:00 -08:00`, and its comment says results depend on where the query was run. The page does not say which applies; the result is kept as published.

## Related

- [Index of this directory](./README.md)

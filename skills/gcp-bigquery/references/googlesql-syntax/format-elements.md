---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements
---

<!-- markdownlint-disable MD011 -->

# Format elements

## Signature / Usage

GoogleSQL for BigQuery supports the following format elements.

### Format elements for date and time parts

Many GoogleSQL parsing and formatting functions rely on a format string
to describe the format of parsed or formatted values. A format string represents
the textual form of date and time and contains separate format elements that are
applied left-to-right.

These functions use format strings:

- [`FORMAT_DATE`](../googlesql-functions/date_functions.md#format_date)
- [`FORMAT_DATETIME`](../googlesql-functions/datetime_functions.md#format_datetime)
- [`FORMAT_TIME`](../googlesql-functions/time_functions.md#format_time)
- [`FORMAT_TIMESTAMP`](../googlesql-functions/timestamp_functions.md#format_timestamp)
- [`PARSE_DATE`](../googlesql-functions/date_functions.md#parse_date)
- [`PARSE_DATETIME`](../googlesql-functions/datetime_functions.md#parse_datetime)
- [`PARSE_TIME`](../googlesql-functions/time_functions.md#parse_time)
- [`PARSE_TIMESTAMP`](../googlesql-functions/timestamp_functions.md#parse_timestamp)

Format strings generally support the following elements:

| Format element | Type | Description | Example |
|---|---|---|---|
| `%A` | `DATE` `DATETIME` `TIMESTAMP` | The full weekday name (English). | `Wednesday` |
| `%a` | `DATE` `DATETIME` `TIMESTAMP` | The abbreviated weekday name (English). | `Wed` |
| `%B` | `DATE` `DATETIME` `TIMESTAMP` | The full month name (English). | `January` |
| `%b` | `DATE` `DATETIME` `TIMESTAMP` | The abbreviated month name (English). | `Jan` |
| `%C` | `DATE` `DATETIME` `TIMESTAMP` | The century (a year divided by 100 and truncated to an integer) as a decimal number (00-99). | `20` |
| `%c` | `DATETIME` `TIMESTAMP` | The date and time representation (English). | `Wed Jan 20 21:47:00 2021` |
| `%D` | `DATE` `DATETIME` `TIMESTAMP` | The date in the format %m/%d/%y. | `01/20/21` |
| `%d` | `DATE` `DATETIME` `TIMESTAMP` | The day of the month as a decimal number (01-31). | `20` |
| `%e` | `DATE` `DATETIME` `TIMESTAMP` | The day of month as a decimal number (1-31); single digits are preceded by a space. | `20` |
| `%F` | `DATE` `DATETIME` `TIMESTAMP` | The date in the format %Y-%m-%d. When formatting, this element removes leading zeros from the year. | `2021-01-20` |
| `%G` | `DATE` `DATETIME` `TIMESTAMP` | The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) year with century as a decimal number. Each ISO year begins on the Monday before the first Thursday of the Gregorian calendar year. Note that %G and %Y may produce different results near Gregorian year boundaries, where the Gregorian year and ISO year can diverge. | `2021` |
| `%g` | `DATE` `DATETIME` `TIMESTAMP` | The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) year without century as a decimal number (00-99). Each ISO year begins on the Monday before the first Thursday of the Gregorian calendar year. Note that %g and %y may produce different results near Gregorian year boundaries, where the Gregorian year and ISO year can diverge. | `21` |
| `%H` | `TIME` `DATETIME` `TIMESTAMP` | The hour (24-hour clock) as a decimal number (00-23). | `21` |
| `%h` | `DATE` `DATETIME` `TIMESTAMP` | The abbreviated month name (English). | `Jan` |
| `%I` | `TIME` `DATETIME` `TIMESTAMP` | The hour (12-hour clock) as a decimal number (01-12). | `09` |
| `%J` | `DATE` `DATETIME` `TIMESTAMP` | The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) 1-based day of the year (001-364 or 001-371 days). If the ISO year isn't set, this format element is ignored. | `364` |
| `%j` | `DATE` `DATETIME` `TIMESTAMP` | The day of the year as a decimal number (001-366). | `020` |
| `%k` | `TIME` `DATETIME` `TIMESTAMP` | The hour (24-hour clock) as a decimal number (0-23); single digits are preceded by a space. | `21` |
| `%l` | `TIME` `DATETIME` `TIMESTAMP` | The hour (12-hour clock) as a decimal number (1-12); single digits are preceded by a space. | ` 9` |
| `%M` | `TIME` `DATETIME` `TIMESTAMP` | The minute as a decimal number (00-59). | `47` |
| `%m` | `DATE` `DATETIME` `TIMESTAMP` | The month as a decimal number (01-12). | `01` |
| `%n` | All | A newline character. |   |
| `%P` | `TIME` `DATETIME` `TIMESTAMP` | When formatting, this is either am or pm. This can't be used with parsing. Instead, use %p. <br /> | `pm` |
| `%p` | `TIME` `DATETIME` `TIMESTAMP` | When formatting, this is either AM or PM. When parsing, this can be used with am, pm, AM, or PM. | `PM` |
| `%Q` | `DATE` `DATETIME` `TIMESTAMP` | The quarter as a decimal number (1-4). | `1` |
| `%R` | `TIME` `DATETIME` `TIMESTAMP` | The time in the format %H:%M. | `21:47` |
| `%S` | `TIME` `DATETIME` `TIMESTAMP` | The second as a decimal number (00-60). | `00` |
| `%s` | `TIME` `DATETIME` `TIMESTAMP` | The number of seconds since 1970-01-01 00:00:00. Always overrides all other format elements, independent of where %s appears in the string. If multiple %s elements appear, then the last one takes precedence. | `1611179220` |
| `%T` | `TIME` `DATETIME` `TIMESTAMP` | The time in the format %H:%M:%S. | `21:47:00` |
| `%t` | All | A tab character. |   |
| `%U` | `DATE` `DATETIME` `TIMESTAMP` | The week number of the year (Sunday as the first day of the week) as a decimal number (00-53). | `03` |
| `%u` | `DATE` `DATETIME` `TIMESTAMP` | The weekday (Monday as the first day of the week) as a decimal number (1-7). | `3` |
| `%V` | `DATE` `DATETIME` `TIMESTAMP` | The [ISO 8601](https://en.wikipedia.org/wiki/ISO_week_date) week number of the year (Monday as the first day of the week) as a decimal number (01-53). If the week containing January 1 has four or more days in the new year, then it's week 1; otherwise it's week 53 of the previous year, and the next week is week 1. | `03` |
| `%W` | `DATE` `DATETIME` `TIMESTAMP` | The week number of the year (Monday as the first day of the week) as a decimal number (00-53). | `03` |
| `%w` | `DATE` `DATETIME` `TIMESTAMP` | The weekday (Sunday as the first day of the week) as a decimal number (0-6). | `3` |
| `%X` | `TIME` `DATETIME` `TIMESTAMP` | The time representation in HH:MM:SS format. | `21:47:00` |
| `%x` | `DATE` `DATETIME` `TIMESTAMP` | The date representation in MM/DD/YY format. | `01/20/21` |
| `%Y` | `DATE` `DATETIME` `TIMESTAMP` | The year with century as a decimal number. When formatting, this element removes leading zeros. To retain leading zeros for four-character years (0001 ... 9999), use `%E4Y`. | `2021` |
| `%y` | `DATE` `DATETIME` `TIMESTAMP` | The year without century as a decimal number (00-99), with an optional leading zero. Can be mixed with %C. If %C isn't specified, years 00-68 are 2000s, while years 69-99 are 1900s. | `21` |
| `%Z` | `TIMESTAMP` | The time zone name. | `UTC-5` |
| `%z` | `TIMESTAMP` | The offset from the Prime Meridian in the format +HHMM or -HHMM as appropriate, with positive values representing locations east of Greenwich. | `-0500` |
| `%%` | All | A single % character. | `%` |
| `%Ez` | `TIMESTAMP` | RFC 3339-compatible numeric time zone (+HH:MM or -HH:MM). | `-05:00` |
| `%E<number>S` | `TIME` `DATETIME` `TIMESTAMP` | Seconds with \<number\> digits of fractional precision. | `00.000 for %E3S` |
| `%E*S` | `TIME` `DATETIME` `TIMESTAMP` | Seconds with full fractional precision (a literal '\*'). | `00.123456` |
| `%E4Y` | `DATE` `DATETIME` `TIMESTAMP` | Four-character years (0001 ... 9999) that include leading zeros, unlike `%Y` that only uses as many characters as needed to render the year without leading zeros. | `2021` |

Examples:

```sql
SELECT FORMAT_DATE("%b-%d-%Y", DATE "2008-12-25") AS formatted;

/*-------------+
 | formatted   |
 +-------------+
 | Dec-25-2008 |
 +-------------*/
```

```sql
SELECT
  FORMAT_DATETIME("%c", DATETIME "2008-12-25 15:30:00")
  AS formatted;

/*--------------------------+
 | formatted                |
 +--------------------------+
 | Thu Dec 25 15:30:00 2008 |
 +--------------------------*/
```

```sql
SELECT FORMAT_TIME("%R", TIME "15:30:00") as formatted_time;

/*----------------+
 | formatted_time |
 +----------------+
 | 15:30          |
 +----------------*/
```

```sql
SELECT FORMAT_TIMESTAMP("%b %Y %Ez", TIMESTAMP "2008-12-25 15:30:00+00")
  AS formatted;

/*-----------------+
 | formatted       |
 +-----------------+
 | Dec 2008 +00:00 |
 +-----------------*/
```

```sql
SELECT PARSE_DATE("%Y%m%d", "20081225") AS parsed;

/*------------+
 | parsed     |
 +------------+
 | 2008-12-25 |
 +------------*/
```

```sql
SELECT PARSE_DATETIME('%Y-%m-%d %H:%M:%S', '1998-10-18 13:45:55') AS datetime;

/*---------------------+
 | datetime            |
 +---------------------+
 | 1998-10-18T13:45:55 |
 +---------------------*/
```

```sql
SELECT PARSE_TIME('%I:%M:%S %p', '2:23:38 pm') AS parsed_time

/*-------------+
 | parsed_time |
 +-------------+
 | 14:23:38    |
 +-------------*/
```

```sql
SELECT PARSE_TIMESTAMP("%c", "Thu Dec 25 07:30:00 2008") AS parsed;

-- Display of results may differ, depending upon the environment and
-- time zone where this query was executed.
/*-------------------------+
 | parsed                  |
 +-------------------------+
 | 2008-12-25 07:30:00 UTC |
 +-------------------------*/
```

### Format clause for CAST

```sql
format_clause:
  FORMAT format_model

format_model:
  format_string_expression
```

The format clause can be used in some [`CAST` functions](../googlesql-functions/conversion_functions.md#cast). You
use a format clause to provide instructions for how to conduct a
cast. For example, you could
instruct a cast to convert a sequence of bytes to a base64-encoded string
instead of a UTF-8-encoded string.

The format clause includes a format model. The format model can contain
format elements combined together as a format string.

#### Format bytes as string

```sql
CAST(bytes_expression AS STRING FORMAT format_string_expression)
```

You can cast a sequence of bytes to a string with a format element in the
format string. If the bytes can't be formatted with a
format element, an error is returned. If the sequence of bytes is `NULL`, the
result is `NULL`. Format elements are case-insensitive.

| Format element | Returns | Example |
|---|---|---|
| HEX | Converts a sequence of bytes into a hexadecimal string. | Input: b'\\x00\\x01\\xEF\\xFF' Output: 0001efff |
| BASEX | Converts a sequence of bytes into a [BASEX](#about-base-encoding) encoded string. X represents one of these numbers: 2, 8, 16, 32, 64. | Input as BASE8: b'\\x02\\x11\\x3B' Output: 00410473 |
| BASE64M | Converts a sequence of bytes into a [base64](#about-base-encoding)-encoded string based on [rfc 2045](https://tools.ietf.org/html/rfc2045#section-6.8) for MIME. Generates a newline character ("\\n") every 76 characters. | Input: b'\\xde\\xad\\xbe\\xef' Output: 3q2+7w== |
| ASCII | Converts a sequence of bytes that are ASCII values to a string. If the input contains bytes that aren't a valid ASCII encoding, an error is returned. | Input: b'\\x48\\x65\\x6c\\x6c\\x6f' Output: Hello |
| UTF-8 | Converts a sequence of bytes that are UTF-8 values to a string. If the input contains bytes that aren't a valid UTF-8 encoding, an error is returned. | Input: b'\\x24' Output: $ |
| UTF8 | Same behavior as UTF-8. |   |

**Return type**

`STRING`

**Example**

```sql
SELECT CAST(b'\x48\x65\x6c\x6c\x6f' AS STRING FORMAT 'ASCII') AS bytes_to_string;

/*-----------------+
 | bytes_to_string |
 +-----------------+
 | Hello           |
 +-----------------*/
```

#### Format string as bytes

```sql
CAST(string_expression AS BYTES FORMAT format_string_expression)
```

You can cast a string to bytes with a format element in the
format string. If the string can't be formatted with the
format element, an error is returned. Format elements are case-insensitive.

In the string expression, whitespace characters, such as `\n`, are ignored
if the `BASE64` or `BASE64M` format element is used.

> [!NOTE]
> **Note:** The bytes output value is displayed as a base64-encoded string. For example, `b'\x00\x01\xEF\xFF'` is displayed as `0001efff` when you use the `HEX` format element.

| Format element | Returns | Example |
|---|---|---|
| HEX | Converts a hexadecimal-encoded string to bytes. If the input contains characters that aren't part of the HEX encoding alphabet (0\~9, case-insensitive a\~f), an error is returned. | Input: '0001efff' Output: b'\\x00\\x01\\xEF\\xFF' |
| BASEX | Converts a [BASEX](#about-base-encoding)-encoded string to bytes. X represents one of these numbers: 2, 8, 16, 32, 64. An error is returned if the input contains characters that aren't part of the BASEX encoding alphabet, except whitespace characters if the format element is `BASE64`. | Input as BASE8: '00410473' Output: b'\\x02\\x11\\x3B' |
| BASE64M | Converts a [base64](#about-base-encoding)-encoded string to bytes. If the input contains characters that aren't whitespace and not part of the base64 encoding alphabet defined at [rfc 2045](https://tools.ietf.org/html/rfc2045#section-6.8), an error is returned. `BASE64M` and `BASE64` decoding have the same behavior. | Input: '3q2+7w==' Output: b'\\xde\\xad\\xbe\\xef' |
| ASCII | Converts a string with only ASCII characters to bytes. If the input contains characters that aren't ASCII characters, an error is returned. | Input: 'Hello' Output: b'\\x48\\x65\\x6c\\x6c\\x6f' |
| UTF-8 | Converts a string to a sequence of UTF-8 bytes. | Input: '$' Output: b'\\x24' |
| UTF8 | Same behavior as UTF-8. |   |

**Return type**

`BYTES`

**Example**

```sql
SELECT CAST('Hello' AS BYTES FORMAT 'ASCII') AS string_to_bytes

-- Displays the bytes output value (b'\x48\x65\x6c\x6c\x6f').

/*-------------------------+
 | string_to_bytes         |
 +-------------------------+
 | b'\x48\x65\x6c\x6c\x6f' |
 +-------------------------*/
```

#### Format date and time as string

You can format these date and time parts as a string:

- [Format year part as string](#format-year-part-as-string)
- [Format month part as string](#format-month-part-as-string)
- [Format day part as string](#format-day-part-as-string)
- [Format hour part as string](#format-hour-part-as-string)
- [Format minute part as string](#format-minute-part-as-string)
- [Format second part as string](#format-second-part-as-string)
- [Format meridian indicator as string](#format-meridian-indicator-part-as-string)
- [Format time zone as string](#format-time-zone-part-as-string)
- [Format literal as string](#format-literal-as-string)

Case matching is supported when you format some date or time parts as a string
and the output contains letters. To learn more,
see [Case matching](#case-matching).

##### Case matching

When the output of some format element contains letters, the letter cases of
the output is matched with the letter cases of the format element,
meaning the words in the output are capitalized according to how the
format element is capitalized. This is called case matching. The rules are:

- If the first two letters of the element are both upper case, the words in the output are capitalized. For example `DAY` = `THURSDAY`.
- If the first letter of the element is upper case, and the second letter is lowercase, the first letter of each word in the output is capitalized and other letters are lowercase. For example `Day` = `Thursday`.
- If the first letter of the element is lowercase, then all letters in the output are lowercase. For example, `day` = `thursday`.

##### Format year part as string

```sql
CAST(expression AS STRING FORMAT format_string_expression)
```

Casts a data type that contains the year part to a string. Includes
format elements, which provide instructions for how to conduct the cast.

- `expression`: This expression contains the data type with the year that you need to format.
- `format_string_expression`: A string which contains format elements, including the year format element.

These data types include a year part:

- `DATE`
- `DATETIME`
- `TIMESTAMP`

If `expression` or `format_string_expression` is `NULL` the return value is
`NULL`. If `format_string_expression` is an empty string, the output is an
empty string. An error is generated if a value that isn't a supported
format element appears in `format_string_expression` or `expression` doesn't
contain a value specified by a format element.

| Format element | Returns | Example |
|---|---|---|
| YYYY | Year, 4 or more digits. | Input: DATE '2018-01-30' Output: 2018 <hr> Input: DATE '76-01-30' Output: 0076 <hr> Input: DATE '10000-01-30' Output: 10000 |
| YYY | Year, last 3 digits only. | Input: DATE '2018-01-30' Output: 018 <hr> Input: DATE '98-01-30' Output: 098 |
| YY | Year, last 2 digits only. | Input: DATE '2018-01-30' Output: 18 <hr> Input: DATE '8-01-30' Output: 08 |
| Y | Year, last digit only. | Input: DATE '2018-01-30' Output: 8 |
| RRRR | Same behavior as YYYY. |   |
| RR | Same behavior as YY. |   |

**Return type**

`STRING`

**Example**

```sql
SELECT CAST(DATE '2018-01-30' AS STRING FORMAT 'YYYY') AS date_time_to_string;

/*---------------------+
 | date_time_to_string |
 +---------------------+
 | 2018                |
 +---------------------*/
```

##### Format month part as string

```sql
CAST(expression AS STRING FORMAT format_string_expression)
```

Casts a data type that contains the month part to a string. Includes
format elements, which provide instructions for how to conduct the cast.

- `expression`: This expression contains the data type with the month that you need to format.
- `format_string_expression`: A string which contains format elements, including the month format element.

These data types include a month part:

- `DATE`
- `DATETIME`
- `TIMESTAMP`

If `expression` or `format_string_expression` is `NULL` the return value is
`NULL`. If `format_string_expression` is an empty string, the output is an
empty string. An error is generated if a value that isn't a supported
format element appears in `format_string_expression` or `expression` doesn't
contain a value specified by a format element.

| Format element | Returns | Example |
|---|---|---|
| MM | Month, 2 digits. | Input: DATE '2018-01-30' Output: 01 |
| MON | Abbreviated, 3-character name of the month. The abbreviated month names for locale en-US are: JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC. [Case matching](#case-matching) is supported. | Input: DATE '2018-01-30' Output: JAN |
| MONTH | Name of the month. [Case matching](#case-matching) is supported. | Input: DATE '2018-01-30' Output: JANUARY |

**Return type**

`STRING`

**Example**

```sql
SELECT CAST(DATE '2018-01-30' AS STRING FORMAT 'MONTH') AS date_time_to_string;

/*---------------------+
 | date_time_to_string |
 +---------------------+
 | JANUARY             |
 +---------------------*/
```

##### Format day part as string

```sql
CAST(expression AS STRING FORMAT format_string_expression)
```

Casts a data type that contains the day part to a string. Includes
format elements, which provide instructions for how to conduct the cast.

- `expression`: This expression contains the data type with the day that you need to format.
- `format_string_expression`: A string which contains format elements, including the day format element.

These data types include a day part:

- `DATE`
- `DATETIME`
- `TIMESTAMP`

If `expression` or `format_string_expression` is `NULL` the return value is
`NULL`. If `format_string_expression` is an empty string, the output is an
empty string. An error is generated if a value that isn't a supported
format element appears in `format_string_expression` or `expression` doesn't
contain a value specified by a format element.

| Format element | Returns | Example |
|---|---|---|
| DAY | Name of the day of the week, localized. Spaces are padded on the right side to make the output size exactly 9. [Case matching](#case-matching) is supported. | Input: DATE '2020-12-31' Output: THURSDAY |
| DY | Abbreviated, 3-character name of the weekday, localized. The abbreviated weekday names for locale en-US are: MON, TUE, WED, THU, FRI, SAT, SUN. [Case matching](#case-matching) is supported. | Input: DATE '2020-12-31' Output: THU |
| D | Day of the week (1 to 7), starting with Sunday as 1. | Input: DATE '2020-12-31' Output: 5 |
| DD | 2-digit day of the month. | Input: DATE '2018-12-02' Output: 02 |
| DDD | 3-digit day of the year. | Input: DATE '2018-02-03' Output: 034 |

**Return type**

`STRING`

**Example**

```sql
SELECT CAST(DATE '2018-02-15' AS STRING FORMAT 'DD') AS date_time_to_string;

/*---------------------+
 | date_time_to_string |
 +---------------------+
 | 15                  |
 +---------------------*/
```

##### Format hour part as string

```sql
CAST(expression AS STRING FORMAT format_string_expression)
```

Casts a data type that contains the hour part to a string. Includes
format elements, which provide instructions for how to conduct the cast.

- `expression`: This expression contains the data type with the hour that you need to format.
- `format_string_expression`: A string which contains format elements, including the hour format element.

These data types include a hour part:

- `TIME`
- `DATETIME`
- `TIMESTAMP`

If `expression` or `format_string_expression` is `NULL` the return value is
`NULL`. If `format_string_expression` is an empty string, the output is an
empty string. An error is generated if a value that isn't a supported
format element appears in `format_string_expression` or `expression` doesn't
contain a value specified by a format element.

| Format element | Returns | Example |
|---|---|---|
| HH | Hour of the day, 12-hour clock, 2 digits. | Input: TIME '21:30:00' Output: 09 |
| HH12 | Hour of the day, 12-hour clock. | Input: TIME '21:30:00' Output: 09 |
| HH24 | Hour of the day, 24-hour clock, 2 digits. | Input: TIME '21:30:00' Output: 21 |

**Return type**

`STRING`

**Examples**

```sql
SELECT CAST(TIME '21:30:00' AS STRING FORMAT 'HH24') AS date_time_to_string;

/*---------------------+
 | date_time_to_string |
 +---------------------+
 | 21                  |
 +---------------------*/
```

```sql
SELECT CAST(TIME '21:30:00' AS STRING FORMAT 'HH12') AS date_time_to_string;

/*---------------------+
 | date_time_to_string |
 +---------------------+
 | 09                  |
 +---------------------*/
```

##### Format minute part as string

```sql
CAST(expression AS STRING FORMAT format_string_expression)
```

Casts a data type that contains the minute part to a string. Includes
format elements, which provide instructions for how to conduct the cast.

- `expression`: This expression contains the data type with the minute that you need to format.
- `format_string_expression`: A string which contains format elements, including the minute format element.

These data types include a minute part:

- `TIME`
- `DATETIME`
- `TIMESTAMP`

If `expression` or `format_string_expression` is `NULL` the return value is
`NULL`. If `format_string_expression` is an empty string, the output is an
empty string. An error is generated if a value that isn't a supported
format element appears in `format_string_expression` or `expression` doesn't
contain a value specified by a format element.

| Format element | Returns | Example |
|---|---|---|
| MI | Minute, 2 digits. | Input: TIME '01:02:03' Output: 02 |

**Return type**

`STRING`

**Example**

```sql
SELECT CAST(TIME '21:30:00' AS STRING FORMAT 'MI') AS date_time_to_string;

/*---------------------+
 | date_time_to_string |
 +---------------------+
 | 30                  |
 +---------------------*/
```

##### Format second part as string

```sql
CAST(expression AS STRING FORMAT format_string_expression)
```

Casts a data type that contains the second part to a string. Includes
format elements, which provide instructions for how to conduct the cast.

- `expression`: This expression contains the data type with the second that you need to format.
- `format_string_expression`: A string which contains format elements, including the second format element.

These data types include a second part:

- `TIME`
- `DATETIME`
- `TIMESTAMP`

If `expression` or `format_string_expression` is `NULL` the return value is
`NULL`. If `format_string_expression` is an empty string, the output is an
empty string. An error is generated if a value that isn't a supported
format element appears in `format_string_expression` or `expression` doesn't
contain a value specified by a format element.

| Format element | Returns | Example |
|---|---|---|
| SS | Seconds of the minute, 2 digits. | Input: TIME '01:02:03' Output: 03 |
| SSSSS | Seconds of the day, 5 digits. | Input: TIME '01:02:03' Output: 03723 |
| FFn | Fractional part of the second, `n` digits long. Replace `n` with a value from 1 to 9. For example, FF5. The fractional part of the second is rounded to fit the size of the output. | Input for FF1: TIME '01:05:07.16' Output: 1 <hr> Input for FF2: TIME '01:05:07.16' Output: 16 <hr> Input for FF3: TIME '01:05:07.16' Output: 160 |

**Return type**

`STRING`

**Examples**

```sql
SELECT CAST(TIME '21:30:25.16' AS STRING FORMAT 'SS') AS date_time_to_string;

/*---------------------+
 | date_time_to_string |
 +---------------------+
 | 25                  |
 +---------------------*/
```

```sql
SELECT CAST(TIME '21:30:25.16' AS STRING FORMAT 'FF2') AS date_time_to_string;

/*---------------------+
 | date_time_to_string |
 +---------------------+
 | 16                  |
 +---------------------*/
```

##### Format meridian indicator part as string

```sql
CAST(expression AS STRING FORMAT format_string_expression)
```

Casts a data type that contains the meridian indicator part to a string. Includes
format elements, which provide instructions for how to conduct the cast.

- `expression`: This expression contains the data type with the meridian indicator that you need to format.
- `format_string_expression`: A string which contains format elements, including the meridian indicator format element.

These data types include a meridian indicator part:

- `TIME`
- `DATETIME`
- `TIMESTAMP`

If `expression` or `format_string_expression` is `NULL` the return value is
`NULL`. If `format_string_expression` is an empty string, the output is an
empty string. An error is generated if a value that isn't a supported
format element appears in `format_string_expression` or `expression` doesn't
contain a value specified by a format element.

| Format element | Returns | Example |
|---|---|---|
| A.M. | A.M. if the time is less than 12, otherwise P.M. The letter case of the output is determined by the first letter case of the format element. | Input for A.M.: TIME '01:02:03' Output: A.M. <hr> Input for A.M.: TIME '16:02:03' Output: P.M. <hr> Input for a.m.: TIME '01:02:03' Output: a.m. <hr> Input for a.M.: TIME '01:02:03' Output: a.m. |
| AM | AM if the time is less than 12, otherwise PM. The letter case of the output is determined by the first letter case of the format element. | Input for AM: TIME '01:02:03' Output: AM <hr> Input for AM: TIME '16:02:03' Output: PM <hr> Input for am: TIME '01:02:03' Output: am <hr> Input for aM: TIME '01:02:03' Output: am |
| P.M. | Output is the same as A.M. format element. |   |
| PM | Output is the same as AM format element. |   |

**Return type**

`STRING`

**Examples**

```sql
SELECT CAST(TIME '21:30:00' AS STRING FORMAT 'AM') AS date_time_to_string;
SELECT CAST(TIME '21:30:00' AS STRING FORMAT 'PM') AS date_time_to_string;

/*---------------------+
 | date_time_to_string |
 +---------------------+
 | PM                  |
 +---------------------*/
```

```sql
SELECT CAST(TIME '01:30:00' AS STRING FORMAT 'AM') AS date_time_to_string;
SELECT CAST(TIME '01:30:00' AS STRING FORMAT 'PM') AS date_time_to_string;

/*---------------------+
 | date_time_to_string |
 +---------------------+
 | AM                  |
 +---------------------*/
```

##### Format time zone part as string

```sql
CAST(expression AS STRING FORMAT format_string_expression)
```

Casts a data type that contains the time zone part to a string. Includes
format elements, which provide instructions for how to conduct the cast.

- `expression`: This expression contains the data type with the time zone that you need to format.
- `format_string_expression`: A string which contains format elements, including the time zone format element.

These data types include a time zone part:

- `DATE`
- `TIME`
- `DATETIME`
- `TIMESTAMP`

If `expression` or `format_string_expression` is `NULL` the return value is
`NULL`. If `format_string_expression` is an empty string, the output is an
empty string. An error is generated if a value that isn't a supported
format element appears in `format_string_expression` or `expression` doesn't
contain a value specified by a format element.

| Format element | Returns | Example |
|---|---|---|
| TZH | Hour offset for a time zone. This includes the `+/-` sign and 2-digit hour. | Inputstamp: TIMESTAMP '2008-12-25 05:30:00+00' Output: −08 |
| TZM | Minute offset for a time zone. This includes only the 2-digit minute. | Inputstamp: TIMESTAMP '2008-12-25 05:30:00+00' Output: 00 |

**Return type**

`STRING`

**Examples**

```sql
SELECT CAST(TIMESTAMP '2008-12-25 00:00:00+00:00' AS STRING FORMAT 'TZH') AS date_time_to_string;

-- Results depend upon where this query was executed.
/*---------------------+
 | date_time_to_string |
 +---------------------+
 | -08                 |
 +---------------------*/
```

```sql
SELECT CAST(TIMESTAMP '2008-12-25 00:00:00+00:00' AS STRING FORMAT 'TZH' AT TIME ZONE 'Asia/Kolkata')
AS date_time_to_string;

-- Because the time zone is specified, the result is always the same.
/*---------------------+
 | date_time_to_string |
 +---------------------+
 | +05                 |
 +---------------------*/
```

```sql
SELECT CAST(TIMESTAMP '2008-12-25 00:00:00+00:00' AS STRING FORMAT 'TZM') AS date_time_to_string;

-- Results depend upon where this query was executed.
/*---------------------+
 | date_time_to_string |
 +---------------------+
 | 00                  |
 +---------------------*/
```

```sql
SELECT CAST(TIMESTAMP '2008-12-25 00:00:00+00:00' AS STRING FORMAT 'TZM' AT TIME ZONE 'Asia/Kolkata')
AS date_time_to_string;

-- Because the time zone is specified, the result is always the same.
/*---------------------+
 | date_time_to_string |
 +---------------------+
 | 30                  |
 +---------------------*/
```

##### Format literal as string

```sql
CAST(expression AS STRING FORMAT format_string_expression)
```

| Format element | Returns | Example |
|---|---|---|
| - | Output is the same as the input. | - |
| . | Output is the same as the input. | . |
| / | Output is the same as the input. | / |
| , | Output is the same as the input. | , |
| ' | Output is the same as the input. | ' |
| ; | Output is the same as the input. | ; |
| : | Output is the same as the input. | : |
| Whitespace | Output is the same as the input. Whitespace means the space character, ASCII 32. It doesn't mean other types of space like tab or new line. Any whitespace character that isn't the ASCII 32 character in the format model generates an error. |   |
| "text" | Output is the value within the double quotes. To preserve a double quote or backslash character, use the `\"` or `\\` escape sequence. Other escape sequences aren't supported. | Input: "abc" Output: abc <hr> Input: "a\\"b\\\\c" Output: a"b\\c |

#### Format string as date and time

You can format a string with these date and time parts:

- [Format string as year part](#format-string-as-year-part)
- [Format string as month part](#format-string-as-month-part)
- [Format string as day part](#format-string-as-day-part)
- [Format string as hour part](#format-string-as-hour-part)
- [Format string as minute part](#format-string-as-minute-part)
- [Format string as second part](#format-string-as-second-part)
- [Format string as meridian indicator part](#format-string-as-meridian-indicator-part)
- [Format string as time zone part](#format-string-as-time-zone-part)
- [Format string as literal part](#format-string-as-literal)

When formatting a string with date and time parts, you must follow the
[format model rules](#format-model-rules).

##### Format model rules

When casting a string to date and time parts, you must ensure the *format model*
is valid. The format model represents the elements passed into
`CAST(string_expression AS type FORMAT format_string_expression)` as the
`format_string_expression` and is validated according to the following
rules:

- It contains at most one of each of the following parts: meridian indicator, year, month, day, hour.
- A non-literal, non-whitespace format element can't appear more than once.
- If it contains the day of year format element, `DDD`, then it can't contain the month.
- If it contains the 24-hour format element, `HH24`, then it can't contain the 12-hour format element or a meridian indicator.
- If it contains the 12-hour format element, `HH12` or `HH`, then it must also contain a meridian indicator.
- If it contains a meridian indicator, then it must also contain a 12-hour format element.
- If it contains the second of the day format element, `SSSSS`, then it can't contain any of the following: hour, minute, second, or meridian indicator.
- It can't contain a format element such that the value it sets doesn't exist in the target type. For example, an hour format element such as `HH24` can't appear in a string you are casting as a `DATE`.

##### Format string as year part

```sql
CAST(string_expression AS type FORMAT format_string_expression)
```

Casts a string-formatted year to a data type that contains
the year part. Includes format elements, which provide instructions for how
to conduct the cast.

- `string_expression`: This expression contains the string with the year that you need to format.
- `type`: The data type to which you are casting. Must include the year part.
- `format_string_expression`: A string which contains format elements, including the year format element. The formats elements in this string are defined collectively as the format model, which must follow [these rules](#format-model-rules).

These data types include a year part:

- `DATE`
- `DATETIME`
- `TIMESTAMP`

If the `YEAR` part is missing from `string_expression` and the return type
includes this part, `YEAR` is set to the current year.

An error is generated if a value that isn't a supported format element appears
in `format_string_expression` or `string_expression` doesn't contain a value
specified by a format element.

| Format element | Returns | Example |
|---|---|---|
| YYYY | If it's delimited, matches 1 to 5 digits. If it isn't delimited, matches 4 digits. Sets the year part to the matched number. | Input for MM-DD-YYYY: '03-12-2018' Output as DATE: 2018-03-12 <hr> Input for YYYY-MMDD: '10000-1203' Output as DATE: 10000-12-03 <hr> Input for YYYY: '18' Output as DATE: 2018-03-01 (Assume current date is March 23, 2021) |
| YYY | Matches 3 digits. Sets the last 3 digits of the year part to the matched number. | Input for YYY-MM-DD: '018-12-03' Output as DATE: 2018-12-03 <hr> Input for YYY-MM-DD: '038-12-03' Output as DATE: 2038-12-03 |
| YY | Matches 2 digits. Sets the last 2 digits of the year part to the matched number. | Input for YY-MM-DD: '18-12-03' Output as DATE: 2018-12-03 <hr> Input for YY-MM-DD: '38-12-03' Output as DATE: 2038-12-03 |
| Y | Matches 1 digit. Sets the last digit of the year part to the matched number. | Input for Y-MM-DD: '8-12-03' Output as DATE: 2008-12-03 |
| Y,YYY | Matches the pattern of 1 to 2 digits, comma, then exactly 3 digits. Sets the year part to the matched number. | Input for Y,YYY-MM-DD: '2,018-12-03' Output as DATE: 2018-12-03 |
| RRRR | Same behavior as YYYY. |   |
| RR | Matches 2 digits. If the 2 digits entered are between 00 and 49 and the last 2 digits of the current year are between 00 and 49, the returned year has the same first 2 digits as the current year. If the last 2 digits of the current year are between 50 and 99, the first 2 digits of the returned year is 1 greater than the first 2 digits of the current year. If the 2 digits entered are between 50 and 99 and the last 2 digits of the current year are between 00 and 49, the first 2 digits of the returned year are 1 less than the first 2 digits of the current year. If the last 2 digits of the current year are between 50 and 99, the returned year has the same first 2 digits as the current year. | Input for RR-MM-DD: '18-12-03' Output as DATE: 2018-12-03 (executed in the year 2021) Output as DATE: 2118-12-03 (executed in the year 2050) <hr> Input for RR-MM-DD: '50-12-03' Output as DATE: 1950-12-03 (executed in the year 2021) Output as DATE: 2050-12-03 (executed in the year 2050) |

**Return type**

The data type to which the string was cast. This can be:

- `DATE`
- `DATETIME`
- `TIMESTAMP`

**Examples**

```sql
SELECT CAST('18-12-03' AS DATE FORMAT 'YY-MM-DD') AS string_to_date

/*----------------+
 | string_to_date |
 +----------------+
 | 2018-12-03     |
 +----------------*/
```

##### Format string as month part

```sql
CAST(string_expression AS type FORMAT format_string_expression)
```

Casts a string-formatted month to a data type that contains
the month part. Includes format elements, which provide instructions for how
to conduct the cast.

- `string_expression`: This expression contains the string with the month that you need to format.
- `type`: The data type to which you are casting. Must include the month part.
- `format_string_expression`: A string which contains format elements, including the month format element. The formats elements in this string are defined collectively as the format model, which must follow [these rules](#format-model-rules).

These data types include a month part:

- `DATE`
- `DATETIME`
- `TIMESTAMP`

If the `MONTH` part is missing from `string_expression` and the return type
includes this part, `MONTH` is set to the current month.

An error is generated if a value that isn't a supported format element appears
in `format_string_expression` or `string_expression` doesn't contain a value
specified by a format element.

| Format element | Returns | Example |
|---|---|---|
| MM | Matches 2 digits. Sets the month part to the matched number. | Input for MM-DD-YYYY: '03-12-2018' Output as DATE: 2018-03-12 |
| MON | Matches 3 letters. Sets the month part to the matched string interpreted as the abbreviated name of the month. | Input for MON DD, YYYY: 'DEC 03, 2018' Output as DATE: 2018-12-03 |
| MONTH | Matches 9 letters. Sets the month part to the matched string interpreted as the name of the month. | Input for MONTH DD, YYYY: 'DECEMBER 03, 2018' Output as DATE: 2018-12-03 |

**Return type**

The data type to which the string was cast. This can be:

- `DATE`
- `DATETIME`
- `TIMESTAMP`

**Examples**

```sql
SELECT CAST('DEC 03, 2018' AS DATE FORMAT 'MON DD, YYYY') AS string_to_date

/*----------------+
 | string_to_date |
 +----------------+
 | 2018-12-03     |
 +----------------*/
```

##### Format string as day part

```sql
CAST(string_expression AS type FORMAT format_string_expression)
```

Casts a string-formatted day to a data type that contains
the day part. Includes format elements, which provide instructions for how
to conduct the cast.

- `string_expression`: This expression contains the string with the day that you need to format.
- `type`: The data type to which you are casting. Must include the day part.
- `format_string_expression`: A string which contains format elements, including the day format element. The formats elements in this string are defined collectively as the format model, which must follow [these rules](#format-model-rules).

These data types include a day part:

- `DATE`
- `DATETIME`
- `TIMESTAMP`

If the `DAY` part is missing from `string_expression` and the return type
includes this part, `DAY` is set to `1`.

An error is generated if a value that isn't a supported format element appears
in `format_string_expression` or `string_expression` doesn't contain a value
specified by a format element.

| Format element | Returns | Example |
|---|---|---|
| DD | Matches 2 digits. Sets the day part to the matched number. | Input for MONTH DD, YYYY: 'DECEMBER 03, 2018' Output as DATE: 2018-12-03 |

**Return type**

The data type to which the string was cast. This can be:

- `DATE`
- `DATETIME`
- `TIMESTAMP`

**Examples**

```sql
SELECT CAST('DECEMBER 03, 2018' AS DATE FORMAT 'MONTH DD, YYYY') AS string_to_date

/*----------------+
 | string_to_date |
 +----------------+
 | 2018-12-03     |
 +----------------*/
```

##### Format string as hour part

```sql
CAST(string_expression AS type FORMAT format_string_expression)
```

Casts a string-formatted hour to a data type that contains
the hour part. Includes format elements, which provide instructions for how
to conduct the cast.

- `string_expression`: This expression contains the string with the hour that you need to format.
- `type`: The data type to which you are casting. Must include the hour part.
- `format_string_expression`: A string which contains format elements, including the hour format element. The formats elements in this string are defined collectively as the format model, which must follow [these rules](#format-model-rules).

These data types include a hour part:

- `TIME`
- `DATETIME`
- `TIMESTAMP`

If the `HOUR` part is missing from `string_expression` and the return type
includes this part, `HOUR` is set to `0`.

An error is generated if a value that isn't a supported format element appears
in `format_string_expression` or `string_expression` doesn't contain a value
specified by a format element.

| Format element | Returns | Example |
|---|---|---|
| HH | Matches 2 digits. If the matched number `n` is `12`, sets `temp = 0`; otherwise, sets `temp = n`. If the matched value of the A.M./P.M. format element is P.M., sets `temp = n + 12`. Sets the hour part to `temp`. A meridian indicator must be present in the format model, when HH is present. | Input for HH:MI P.M.: '03:30 P.M.' Output as TIME: 15:30:00 |
| HH12 | Same behavior as HH. |   |
| HH24 | Matches 2 digits. Sets the hour part to the matched number. | Input for HH24:MI: '15:30' Output as TIME: 15:30:00 |

**Return type**

The data type to which the string was cast. This can be:

- `TIME`
- `DATETIME`
- `TIMESTAMP`

**Examples**

```sql
SELECT CAST('15:30' AS TIME FORMAT 'HH24:MI') AS string_to_date_time

/*---------------------+
 | string_to_date_time |
 +---------------------+
 | 15:30:00            |
 +---------------------*/
```

##### Format string as minute part

```sql
CAST(string_expression AS type FORMAT format_string_expression)
```

Casts a string-formatted minute to a data type that contains
the minute part. Includes format elements, which provide instructions for how
to conduct the cast.

- `string_expression`: This expression contains the string with the minute that you need to format.
- `type`: The data type to which you are casting. Must include the minute part.
- `format_string_expression`: A string which contains format elements, including the minute format element. The formats elements in this string are defined collectively as the format model, which must follow [these rules](#format-model-rules).

These data types include a minute part:

- `TIME`
- `DATETIME`
- `TIMESTAMP`

If the `MINUTE` part is missing from `string_expression` and the return type
includes this part, `MINUTE` is set to `0`.

An error is generated if a value that isn't a supported format element appears
in `format_string_expression` or `string_expression` doesn't contain a value
specified by a format element.

| Format element | Returns | Example |
|---|---|---|
| MI | Matches 2 digits. Sets the minute part to the matched number. | Input for HH:MI P.M.: '03:30 P.M.' Output as TIME: 15:30:00 |

**Return type**

The data type to which the string was cast. This can be:

- `TIME`
- `DATETIME`
- `TIMESTAMP`

**Examples**

```sql
SELECT CAST('03:30 P.M.' AS TIME FORMAT 'HH:MI P.M.') AS string_to_date_time

/*---------------------+
 | string_to_date_time |
 +---------------------+
 | 15:30:00            |
 +---------------------*/
```

##### Format string as second part

```sql
CAST(string_expression AS type FORMAT format_string_expression)
```

Casts a string-formatted second to a data type that contains
the second part. Includes format elements, which provide instructions for how
to conduct the cast.

- `string_expression`: This expression contains the string with the second that you need to format.
- `type`: The data type to which you are casting. Must include the second part.
- `format_string_expression`: A string which contains format elements, including the second format element. The formats elements in this string are defined collectively as the format model, which must follow [these rules](#format-model-rules).

These data types include a second part:

- `TIME`
- `DATETIME`
- `TIMESTAMP`

If the `SECOND` part is missing from `string_expression` and the return type
includes this part, `SECOND` is set to `0`.

An error is generated if a value that isn't a supported format element appears
in `format_string_expression` or `string_expression` doesn't contain a value
specified by a format element.

| Format element | Returns | Example |
|---|---|---|
| SS | Matches 2 digits. Sets the second part to the matched number. | Input for HH:MI:SS P.M.: '03:30:02 P.M.' Output as TIME: 15:30:02 |
| SSSSS | Matches 5 digits. Sets the hour, minute and second parts by interpreting the matched number as the number of seconds past midnight. | Input for SSSSS: '03723' Output as TIME: 01:02:03 |
| FFn | Matches `n` digits, where `n` is the number following FF in the format element. Sets the fractional part of the second part to the matched number. | Input for HH24:MI:SS.FF1: '01:05:07.16' Output as TIME: 01:05:07.2 <hr> Input for HH24:MI:SS.FF2: '01:05:07.16' Output as TIME: 01:05:07.16 <hr> Input for HH24:MI:SS.FF3: '01:05:07.16' Output as TIME: 01:05:07.160 |

**Return type**

The data type to which the string was cast. This can be:

- `TIME`
- `DATETIME`
- `TIMESTAMP`

**Examples**

```sql
SELECT CAST('01:05:07.16' AS TIME FORMAT 'HH24:MI:SS.FF1') AS string_to_date_time

/*---------------------+
 | string_to_date_time |
 +---------------------+
 | 01:05:07.2          |
 +---------------------*/
```

##### Format string as meridian indicator part

```sql
CAST(string_expression AS type FORMAT format_string_expression)
```

Casts a string-formatted meridian indicator to a data type that contains
the meridian indicator part. Includes format elements, which provide instructions for how
to conduct the cast.

- `string_expression`: This expression contains the string with the meridian indicator that you need to format.
- `type`: The data type to which you are casting. Must include the meridian indicator part.
- `format_string_expression`: A string which contains format elements, including the meridian indicator format element. The formats elements in this string are defined collectively as the format model, which must follow [these rules](#format-model-rules).

These data types include a meridian indicator part:

- `TIME`
- `DATETIME`
- `TIMESTAMP`

An error is generated if a value that isn't a supported format element appears
in `format_string_expression` or `string_expression` doesn't contain a value
specified by a format element.

| Format element | Returns | Example |
|---|---|---|
| A.M. or P.M. | Matches using the regular expression `'(A|P)\.M\.'`. | Input for HH:MI A.M.: '03:30 A.M.' Output as TIME: 03:30:00 <hr> Input for HH:MI P.M.: '03:30 P.M.' Output as TIME: 15:30:00 <hr> Input for HH:MI P.M.: '03:30 A.M.' Output as TIME: 03:30:00 <hr> Input for HH:MI A.M.: '03:30 P.M.' Output as TIME: 15:30:00 <hr> Input for HH:MI a.m.: '03:30 a.m.' Output as TIME: 03:30:00 |

**Return type**

The data type to which the string was cast. This can be:

- `TIME`
- `DATETIME`
- `TIMESTAMP`

**Examples**

```sql
SELECT CAST('03:30 P.M.' AS TIME FORMAT 'HH:MI A.M.') AS string_to_date_time

/*---------------------+
 | string_to_date_time |
 +---------------------+
 | 15:30:00            |
 +---------------------*/
```

##### Format string as time zone part

```sql
CAST(string_expression AS type FORMAT format_string_expression)
```

Casts a string-formatted time zone to a data type that contains
the time zone part. Includes format elements, which provide instructions for how
to conduct the cast.

- `string_expression`: This expression contains the string with the time zone that you need to format.
- `type`: The data type to which you are casting. Must include the time zone part.
- `format_string_expression`: A string which contains format elements, including the time zone format element. The formats elements in this string are defined collectively as the format model, which must follow [these rules](#format-model-rules).

These data types include a time zone part:

- `DATE`
- `TIME`
- `DATETIME`
- `TIMESTAMP`

An error is generated if a value that isn't a supported format element appears
in `format_string_expression` or `string_expression` doesn't contain a value
specified by a format element.

| Format element | Returns | Example |
|---|---|---|
| TZH | Matches using the regular expression `'(\+|\-| )[0-9]{2}'`. Sets the time zone and hour parts to the matched sign and number. Sets the time zone sign to be the first letter of the matched string. The number 2 means matching up to 2 digits for non-exact matching, and exactly 2 digits for exact matching. | Input for YYYY-MM-DD HH:MI:SSTZH: '2008-12-25 05:30:00-08' Output as TIMESTAMP: 2008-12-25 05:30:00-08 |
| TZM | Matches 2 digits. Let `n` be the matched number. If the time zone sign is the minus sign, sets the time zone minute part to `-n`. Otherwise, sets the time zone minute part to `n`. | Input for YYYY-MM-DD HH:MI:SSTZHTZM: '2008-12-25 05:30:00+0530' Output as TIMESTAMP: 2008-12-25 05:30:00+0530 |

**Return type**

The data type to which the string was cast. This can be:

- `DATE`
- `TIME`
- `DATETIME`
- `TIMESTAMP`

**Examples**

Adapted (not in the official docs): changed the result column header from `as_timestamp` to `string_to_date_time` to match the alias in the query.

```sql
SELECT CAST('2020.06.03 00:00:53+00' AS TIMESTAMP FORMAT 'YYYY.MM.DD HH:MI:SSTZH') AS string_to_date_time

/*-----------------------------+
 | string_to_date_time         |
 +-----------------------------+
 | 2020-06-03 00:00:53.110 UTC |
 +-----------------------------*/
```

##### Format string as literal

```sql
CAST(string_expression AS data_type FORMAT format_string_expression)
```

| Format element | Returns | Example |
|---|---|---|
| - | Output is the same as the input. |   |
| . | Output is the same as the input. | . |
| / | Output is the same as the input. | / |
| , | Output is the same as the input. | , |
| ' | Output is the same as the input. | ' |
| ; | Output is the same as the input. | ; |
| : | Output is the same as the input. | : |
| Whitespace | A consecutive sequence of one or more spaces in the format model is matched with one or more consecutive Unicode whitespace characters in the input. Space means the ASCII 32 space character. It doesn't mean the general whitespace such as a tab or new line. Any whitespace character that isn't the ASCII 32 character in the format model generates an error. |   |
| "text" | Output generated by the format element in formatting, using this regular expression, with `s` representing the string input: `regex.escape(s)`. | Input: "abc" Output: abc <hr> Input: "a\\"b\\\\c" Output: a"b\\c |

#### Format numeric type as string

```sql
CAST(numeric_expression AS STRING FORMAT format_string_expression)
```

You can cast a [numeric type](data-types.md#numeric-types) to a string by combining the
following format elements:

- [Digits](#format-digits-as-string)
- [Decimal point](#format-decimal-point-as-string)
- [Sign](#format-sign-as-string)
- [Currency symbol](#format-currency-symbol-as-string)
- [Group separator](#format-group-separator-as-string)
- [Other format elements](#other-numeric-format-elements)

Except for the exponent format element (`EEEE`), all of the format elements
generate a fixed number of characters in the output, and the output is aligned
by the decimal point. The first character outputs a `-` for negative numbers;
otherwise a space. To suppress blank characters and trailing zeroes, use the
`FM` flag.

> [!NOTE]
> **Note:** Some format elements are locale-specific. GoogleSQL always uses the `'en-us'` locale.

**Return type**

`STRING`

**Example**

```sql
SELECT input, CAST(input AS STRING FORMAT '$999,999.999') AS output
FROM UNNEST([1.2, 12.3, 123.456, 1234.56, -12345.678, 1234567.89]) AS input

/*------------+---------------+
 |   input    |    output     |
 +------------+---------------+
 |        1.2 |        $1.200 |
 |       12.3 |       $12.300 |
 |    123.456 |      $123.456 |
 |    1234.56 |    $1,234.560 |
 | -12345.678 |  -$12,345.678 |
 | 1234567.89 |  $###,###.### |
 +------------+---------------*/
```

##### Format digits as string

The following format elements output digits. If there aren't enough
digit format elements to represent the input, all digit format elements are
replaced with `#` in the output.
If there are no sign format elements, one extra space is reserved for the sign.
For example, if the input is `12` and the format string is
`'99'`, then the output is `' 12'`, with a length of three
characters.

| Format element | Returns | Example |
|---|---|---|
| 0 | A decimal digit. Leading and trailing zeros are included. | Input: `12` Format: `'000'` Output: `' 012'` <hr> Input: `12` Format: `'000.000'` Output: `' 012.000'` <hr> Input: `-12` Format: `'000.000'` Output: `'-012.000'` |
| 9 | A decimal digit. Leading zeros are replaced with spaces. Trailing zeros are included. | Input: `12` Format: `'999'` Output: `' 12'` <hr> Input: `12` Format: `'999.999'` Output: `' 12.000'` |
| X or x | A hexadecimal digit. Can't appear with other format elements except 0, FM, and the sign format elements. The maximum number of hexadecimal digits in the format string is 16. X generates uppercase letters and x generates lowercase letters. When 0 is combined with the hexadecimal format element, the letter generated by 0 matches the case of the next X or x element. If there is no subsequent X or x, then 0 generates an uppercase letter. | Input: `43981` Format: `'XXXX'` Output: `' ABCD'` <hr> Input: `43981` Format: `'xxxx'` Output: `' abcd'` <hr> Input: `43981` Format: `'0X0x'` Output: `' ABcd'` <hr> Input: `43981` Format: `'0000000X'` Output: `' 0000ABCD'` |

**Return type**

`STRING`

**Example**

```sql
SELECT
  CAST(12 AS STRING FORMAT '999') as a,
  CAST(-12 AS STRING FORMAT '999') as b;

/*------+------+
 | a    | b    |
 +------+------+
 |   12 |  -12 |
 +------+------*/
```

##### Format decimal point as string

The following format elements output a decimal point. These format elements are
mutually exclusive. At most one can appear in the format string.

| Format element | Returns | Example |
|---|---|---|
| . (period) | Decimal point. | Input: `123.58` Format: `'999.999'` Output: `' 123.580'` |
| D | The decimal point of the current locale. | Input: `123.58` Format: `'999D999'` Output: `' 123.580'` |

**Return type**

`STRING`

**Example**

```sql
SELECT CAST(12.5 AS STRING FORMAT '99.99') as a;

/*--------+
 | a      |
 +--------+
 |  12.50 |
 +--------*/
```

##### Format sign as string

The following format elements output the sign (+/-). These format elements are
mutually exclusive. At most one can appear in the format string.

If there are no sign format elements, one extra space is reserved for the sign.
For example, if the input is `12` and the format string is
`'99'`, then the output is `' 12'`, with a length of three
characters.

The sign appears before the number. If the format model includes a currency
symbol element, then the sign appears before the currency symbol.

| Format element | Returns | Example |
|---|---|---|
| S | Explicit sign. Outputs `+` for positive numbers and `-` for negative numbers. The position in the output is anchored to the number. `NaN` and `0` will not be signed. | Input: `-12` Format: `'S9999'` Output: `' -12'` <hr> Input: `-12` Format: `'9999S'` Output: `' 12-'` |
| MI | Explicit sign. Outputs a space for positive numbers and `-` for negative numbers. This element can only appear in the last position. | Input: `12` Format: `'9999MI'` Output: `' 12 '` <hr> Input: `-12` Format: `'9999MI'` Output: `' 12-'` |
| PR | For negative numbers, the value is enclosed in angle brackets. For positive numbers, the value is returned with a leading and trailing space. This element can only appear in the last position. | Input: `12` Format: `'9999PR'` Output: `' 12 '` <hr> Input: `-12` Format: `'9999PR'` Output: `' <12>'` |

**Return type**

`STRING`

**Example**

```sql
SELECT
  CAST(12 AS STRING FORMAT 'S99') as a,
  CAST(-12 AS STRING FORMAT 'S99') as b;

/*-----+-----+
 | a   | b   |
 +-----+-----+
 | +12 | -12 |
 +-----+-----*/
```

##### Format currency symbol as string

The following format elements output a currency symbol. These format elements
are mutually exclusive. At most one can appear in the format string. In the
output, the currency symbol appears before the first digit or decimal point.

| Format element | Returns | Example |
|---|---|---|
| $ | Dollar sign ($). | Input: `-12` Format: `'$999'` Output: `' -$12'` |
| C or c | The ISO-4217 currency code of the current locale. | Input: `-12` Format: `'C999'` Output: `' -USD12'` <hr> Input: `-12` Format: `'c999'` Output: `' -usd12'` |
| L | The currency symbol of the current locale. | Input: `-12` Format: `'L999'` Output: `' -$12'` |

**Return type**

`STRING`

**Example**

```sql
SELECT
  CAST(12 AS STRING FORMAT '$99') as a,
  CAST(-12 AS STRING FORMAT '$99') as b;

/*------+------+
 | a    | b    |
 +------+------+
 |  $12 | -$12 |
 +------+------*/
```

##### Format group separator as string

The following format elements output a group separator.

| Format element | Returns | Example |
|---|---|---|
| , (comma) | Group separator. | Input: `12345` Format: `'999,999'` Output: `' 12,345'` |
| G | The group separator point of the current locale. | Input: `12345` Format: `'999G999'` Output: `' 12,345'` |

**Return type**

`STRING`

**Example**

```sql
SELECT CAST(1234 AS STRING FORMAT '999,999') as a;

/*----------+
 | a        |
 +----------+
 |    1,234 |
 +----------*/
```

##### Other numeric format elements

| Format element | Returns | Example |
|---|---|---|
| B | Outputs spaces when the integer part is zero. If the integer part of the number is 0, then the following format elements generate spaces in the output: digits (9, X, 0), decimal point, group separator, currency, sign, and exponent. | Input: `0.23` Format: `'B99.999S'` Output: `' '` <hr> Input: `1.23` Format: `'B99.999S'` Output: `' 1.230+'` |
| EEEE | Outputs the exponent part of the value in scientific notation. If the exponent value is between -99 and 99, the output is four characters. Otherwise, the minimum number of digits is used in the output. | Input: `20` Format: `'9.99EEEE'` Output: `' 2.00E+01'` <hr> Input: `299792458` Format: `'S9.999EEEE'` Output: `'+2.998E+08'` |
| FM | Removes all spaces and trailing zeroes from the output. You can use this element to suppress spaces and trailing zeroes that are generated by other format elements. | Input: `12.5` Format: `'999999.000FM'` Output: `'12.5'` |
| RN | Returns the value as Roman numerals, rounded to the nearest integer. The input must be between 1 and 3999. The output is padded with spaces to the left to a length of 15. This element can't be used with other format elements except `FM`. | Input: `2021` Format: `'RN'` Output: `' MMXXI'` |
| V | The input value is multiplied by 10\^n, where n is the number of 9s after the `V`. This element can't be used with a decimal point or exponent format element. | Input: `23.5` Format: `'S000V00'` Output: `'+02350'` |

**Return type**

`STRING`

**Example**

Adapted (not in the official docs): removed the stray double quote after the statement terminator.

```sql
SELECT CAST(-123456 AS STRING FORMAT '9.999EEEE') as a;

/*------------+
 | a          |
 +------------+
 | -1.235E+05 |
 +------------*/
```

#### About BASE encoding

BASE encoding translates binary data in string format into a radix-X
representation.

If X is 2, 8, or 16, Arabic numerals 0--9 and the Latin letters
a--z are used in the encoded string. So for example, BASE16/Hexadecimal encoding
results contain 0\~9 and a\~f.

If X is 32 or 64, the default character tables are defined in
[rfc 4648](https://tools.ietf.org/html/rfc4648#section-3.3). When you decode a BASE string where X is 2, 8, or 16,
the Latin letters in the input string are case-insensitive. For example, both
"3a" and "3A" are valid input strings for BASE16/Hexadecimal decoding, and
will output the same result.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders; and horizontal rules inside table cells are written as `<hr>`. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the `D` example shows `Output: 4` for `DATE '2020-12-31'`; changed to `5`. The `DAY` example on the same page shows that date is a Thursday, and `D` counts Sunday as 1.
- Corrected from the official docs: the `YYYY` and `MM` examples show `'03-12-2018'` parsed with `MM-DD-YYYY` as `2018-12-03`; changed to `2018-03-12` (month 03, day 12) in both rows.
- Corrected from the official docs: the `Y,YYY` example shows `'2,018-12-03'` parsed as `2008-12-03`; changed to `2018-12-03`, since the row says the year part is set to the matched number (2,018).
- Corrected from the official docs: the `RR` example shows `'50-12-03'` run in 2021 giving `2050-12-03`; changed to `1950-12-03`. The rule in the same cell says that for an input of 50-99 and a current year ending in 00-49, the first 2 digits are 1 less than the current year's.
- Corrected from the official docs: the `FFn` example input contains the stray text `FF3: ` inside the quoted value; removed, matching the FF1 and FF2 inputs in the same cell.
- Corrected from the official docs: the result header `as_timestamp` does not match the query alias `string_to_date_time`; the header was changed to the alias.
- Corrected from the official docs: the `EEEE` example shows `' 2.0E+01'` for format `'9.99EEEE'`; changed to `' 2.00E+01'` so the output has the two decimal digits of the format, consistent with the three-digit `'9.999EEEE'` examples on the same page.
- Corrected from the official docs: the example statement ends with a stray `"` after the semicolon; removed.
- Caution: The note under the bytes `FORMAT` elements says the output "is displayed as a base64-encoded string", but its example `0001efff` is hexadecimal (the `HEX` format element). The official wording is kept as is.
- Caution: The `YYYY`, `YYY` and `YY` examples use `DATE '76-01-30'`, `DATE '98-01-30'`, `DATE '8-01-30'` and `DATE '10000-01-30'`, which do not fit the `YYYY-[M]M-[D]D` DATE literal form (four-digit year, 0001 to 9999) given in data-types.md. The official examples are kept as is.
- Conflicting official statements: The `FFn` row of the TIME formatting table says the fractional part "is rounded to fit", but its example formats `TIME '01:05:07.16'` with `FF1` as `1` (truncation; rounding would give `2`). The parsing table's `FF1` example turns `.16` into `.2`.
- Caution: The `HH` parsing rule sets `temp = n` (`0` if `n` is `12`) and then, for P.M., `temp = n + 12`; read literally, 12 P.M. gives 24. The intended rule (probably `temp + 12`) is not stated.
- Caution: The `TIMESTAMP FORMAT` example uses `'YYYY.MM.DD HH:MI:SSTZH'` with `HH` and no meridian indicator, which the `HH` rule on this page requires, and its result shows `.110` although the input `'2020.06.03 00:00:53+00'` has no fractional part. The official example is kept as is.
- Corrected from the official docs: the `FFn` formatting example shows `016` as the `FF3` output for `TIME '01:05:07.16'`. Three digits of the fractional part `.16` are `160` (`016` would mean `.016`), which matches the parsing table's `FF3` example that turns `.16` into `01:05:07.160`. The output was changed to `160`.
- `MD011` is disabled for this file because a verbatim string in the official text is a false positive for that rule.

## Related

- [Index of this directory](./README.md)

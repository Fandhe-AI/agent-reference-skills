---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions
---

# String functions (part 1 of 2)

## Signature / Usage

GoogleSQL for BigQuery supports string functions.
These string functions work on two different values:
`STRING` and `BYTES` data types. `STRING` values must be well-formed UTF-8.

Functions that return position values, such as [STRPOS](string_functions-2.md#strpos),
encode those positions as `INT64`. The value `1`
refers to the first character (or byte), `2` refers to the second, and so on.
The value `0` indicates an invalid position. When working on `STRING` types, the
returned positions refer to character positions.

All string comparisons are done byte-by-byte, without regard to Unicode
canonical equivalence.

### Function list

| Name | Summary |
|---|---|
| [`ARRAY_TO_STRING`](array_functions.md#array_to_string) | Produces a concatenation of the elements in an array as a `STRING` value. For more information, see [Array functions](array_functions.md). |
| [`ASCII`](#ascii) | Gets the ASCII code for the first character or byte in a `STRING` or `BYTES` value. |
| [`BYTE_LENGTH`](#byte_length) | Gets the number of `BYTES` in a `STRING` or `BYTES` value. |
| [`CHAR_LENGTH`](#char_length) | Gets the number of characters in a `STRING` value. |
| [`CHARACTER_LENGTH`](#character_length) | Synonym for `CHAR_LENGTH`. |
| [`CHR`](#chr) | Converts a Unicode code point to a character. |
| [`CODE_POINTS_TO_BYTES`](#code_points_to_bytes) | Converts an array of extended ASCII code points to a `BYTES` value. |
| [`CODE_POINTS_TO_STRING`](#code_points_to_string) | Converts an array of Unicode code points to a `STRING` value. |
| [`COLLATE`](#collate) | Combines a `STRING` value and a collation specification into a collation specification-supported `STRING` value. |
| [`CONCAT`](#concat) | Concatenates one or more `STRING` or `BYTES` values into a single result. |
| [`CONTAINS_SUBSTR`](#contains_substr) | Performs a normalized, case-insensitive search to see if a value exists as a substring in an expression. |
| [`EDIT_DISTANCE`](#edit_distance) | Computes the Levenshtein distance between two `STRING` or `BYTES` values. |
| [`ENDS_WITH`](#ends_with) | Checks if a `STRING` or `BYTES` value is the suffix of another value. |
| [`FORMAT`](#format) | Formats data and produces the results as a `STRING` value. |
| [`FROM_BASE32`](#from_base32) | Converts a base32-encoded `STRING` value into a `BYTES` value. |
| [`FROM_BASE64`](#from_base64) | Converts a base64-encoded `STRING` value into a `BYTES` value. |
| [`FROM_HEX`](#from_hex) | Converts a hexadecimal-encoded `STRING` value into a `BYTES` value. |
| [`INITCAP`](#initcap) | Formats a `STRING` as proper case, which means that the first character in each word is uppercase and all other characters are lowercase. |
| [`INSTR`](#instr) | Finds the position of a subvalue inside another value, optionally starting the search at a given offset or occurrence. |
| [`LAX_STRING`](json_functions-2.md#lax_string) | Attempts to convert a JSON value to a SQL `STRING` value. For more information, see [JSON functions](json_functions-1.md). |
| [`LEFT`](#left) | Gets the specified leftmost portion from a `STRING` or `BYTES` value. |
| [`LENGTH`](#length) | Gets the length of a `STRING` or `BYTES` value. |
| [`LOWER`](#lower) | Formats alphabetic characters in a `STRING` value as lowercase. <br /> Formats ASCII characters in a `BYTES` value as lowercase. |
| [`LPAD`](#lpad) | Prepends a `STRING` or `BYTES` value with a pattern. |
| [`LTRIM`](#ltrim) | Identical to the `TRIM` function, but only removes leading characters. |
| [`NORMALIZE`](#normalize) | Case-sensitively normalizes the characters in a `STRING` value. |
| [`NORMALIZE_AND_CASEFOLD`](#normalize_and_casefold) | Case-insensitively normalizes the characters in a `STRING` value. |
| [`OCTET_LENGTH`](#octet_length) | Alias for `BYTE_LENGTH`. |
| [`REGEXP_CONTAINS`](#regexp_contains) | Checks if a value is a partial match for a regular expression. |
| [`REGEXP_EXTRACT`](#regexp_extract) | Produces a substring that matches a regular expression. |
| [`REGEXP_EXTRACT_GROUPS`](#regexp_extract_groups) | Produces substrings that match multiple capturing groups in a regular expression. |
| [`REGEXP_EXTRACT_ALL`](#regexp_extract_all) | Produces an array of all substrings that match a regular expression. |
| [`REGEXP_INSTR`](string_functions-2.md#regexp_instr) | Finds the position of a regular expression match in a value, optionally starting the search at a given offset or occurrence. |
| [`REGEXP_REPLACE`](string_functions-2.md#regexp_replace) | Produces a `STRING` value where all substrings that match a regular expression are replaced with a specified value. |
| [`REGEXP_SUBSTR`](string_functions-2.md#regexp_substr) | Synonym for `REGEXP_EXTRACT`. |
| [`REPEAT`](string_functions-2.md#repeat) | Produces a `STRING` or `BYTES` value that consists of an original value, repeated. |
| [`REPLACE`](string_functions-2.md#replace) | Replaces all occurrences of a pattern with another pattern in a `STRING` or `BYTES` value. |
| [`REVERSE`](string_functions-2.md#reverse) | Reverses a `STRING` or `BYTES` value. |
| [`RIGHT`](string_functions-2.md#right) | Gets the specified rightmost portion from a `STRING` or `BYTES` value. |
| [`RPAD`](string_functions-2.md#rpad) | Appends a `STRING` or `BYTES` value with a pattern. |
| [`RTRIM`](string_functions-2.md#rtrim) | Identical to the `TRIM` function, but only removes trailing characters. |
| [`SAFE_CONVERT_BYTES_TO_STRING`](string_functions-2.md#safe_convert_bytes_to_string) | Converts a `BYTES` value to a `STRING` value and replace any invalid UTF-8 characters with the Unicode replacement character, `U+FFFD`. |
| [`SOUNDEX`](string_functions-2.md#soundex) | Gets the Soundex codes for words in a `STRING` value. |
| [`SPLIT`](string_functions-2.md#split) | Splits a `STRING` or `BYTES` value, using a delimiter. |
| [`STARTS_WITH`](string_functions-2.md#starts_with) | Checks if a `STRING` or `BYTES` value is a prefix of another value. |
| [`STRING` (JSON)](json_functions-2.md#string) | Converts a JSON string to a SQL `STRING` value. For more information, see [JSON functions](json_functions-1.md). |
| [`STRING` (Timestamp)](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#string) | Converts a `TIMESTAMP` value to a `STRING` value. For more information, see [Timestamp functions](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions). |
| [`STRING_AGG`](aggregate_functions.md#string_agg) | Concatenates non-`NULL` `STRING` or `BYTES` values. For more information, see [Aggregate functions](aggregate_functions.md). |
| [`STRPOS`](string_functions-2.md#strpos) | Finds the position of the first occurrence of a subvalue inside another value. |
| [`SUBSTR`](string_functions-2.md#substr) | Gets a portion of a `STRING` or `BYTES` value. |
| [`SUBSTRING`](string_functions-2.md#substring) | Alias for `SUBSTR` |
| [`TO_BASE32`](string_functions-2.md#to_base32) | Converts a `BYTES` value to a base32-encoded `STRING` value. |
| [`TO_BASE64`](string_functions-2.md#to_base64) | Converts a `BYTES` value to a base64-encoded `STRING` value. |
| [`TO_CODE_POINTS`](string_functions-2.md#to_code_points) | Converts a `STRING` or `BYTES` value into an array of extended ASCII code points. |
| [`TO_HEX`](string_functions-2.md#to_hex) | Converts a `BYTES` value to a hexadecimal `STRING` value. |
| [`TRANSLATE`](string_functions-2.md#translate) | Within a value, replaces each source character with the corresponding target character. |
| [`TRIM`](string_functions-2.md#trim) | Removes the specified leading and trailing Unicode code points or bytes from a `STRING` or `BYTES` value. |
| [`UNICODE`](string_functions-2.md#unicode) | Gets the Unicode code point for the first character in a value. |
| [`UPPER`](string_functions-2.md#upper) | Formats alphabetic characters in a `STRING` value as uppercase. <br /> Formats ASCII characters in a `BYTES` value as uppercase. |

### `ASCII`

```sql
ASCII(value)
```

**Description**

Returns the ASCII code for the first character or byte in `value`. Returns
`0` if `value` is empty or the ASCII code is `0` for the first character
or byte.

**Return type**

`INT64`

**Examples**

```sql
SELECT ASCII('abcd') as A, ASCII('a') as B, ASCII('') as C, ASCII(NULL) as D;

/*-------+-------+-------+-------+
 | A     | B     | C     | D     |
 +-------+-------+-------+-------+
 | 97    | 97    | 0     | NULL  |
 +-------+-------+-------+-------*/
```

### `BYTE_LENGTH`

```sql
BYTE_LENGTH(value)
```

**Description**

Gets the number of `BYTES` in a `STRING` or `BYTES` value,
regardless of whether the value is a `STRING` or `BYTES` type.

**Return type**

`INT64`

**Examples**

```sql
SELECT BYTE_LENGTH('абвгд') AS string_example;

/*----------------+
 | string_example |
 +----------------+
 | 10             |
 +----------------*/
```

```sql
SELECT BYTE_LENGTH(b'абвгд') AS bytes_example;

/*----------------+
 | bytes_example  |
 +----------------+
 | 10             |
 +----------------*/
```

### `CHAR_LENGTH`

```sql
CHAR_LENGTH(value)
```

**Description**

Gets the number of characters in a `STRING` value.

**Return type**

`INT64`

**Examples**

```sql
SELECT CHAR_LENGTH('абвгд') AS char_length;

/*-------------+
 | char_length |
 +-------------+
 | 5           |
 +------------ */
```

### `CHARACTER_LENGTH`

```sql
CHARACTER_LENGTH(value)
```

**Description**

Synonym for [CHAR_LENGTH](#char_length).

**Return type**

`INT64`

**Examples**

```sql
SELECT
  'абвгд' AS characters,
  CHARACTER_LENGTH('абвгд') AS char_length_example

/*------------+---------------------+
 | characters | char_length_example |
 +------------+---------------------+
 | абвгд      |                   5 |
 +------------+---------------------*/
```

### `CHR`

```sql
CHR(value)
```

**Description**

Takes a Unicode [code point](https://en.wikipedia.org/wiki/Code_point) and returns
the character that matches the code point. Each valid code point should fall
within the range of \[0, 0xD7FF\] and \[0xE000, 0x10FFFF\]. Returns an empty string
if the code point is `0`. If an invalid Unicode code point is specified, an
error is returned.

To work with an array of Unicode code points, see
[`CODE_POINTS_TO_STRING`](#code_points_to_string)

**Return type**

`STRING`

**Examples**

```sql
SELECT CHR(65) AS A, CHR(255) AS B, CHR(513) AS C, CHR(1024)  AS D;

/*-------+-------+-------+-------+
 | A     | B     | C     | D     |
 +-------+-------+-------+-------+
 | A     | ÿ     | ȁ     | Ѐ     |
 +-------+-------+-------+-------*/
```

```sql
SELECT CHR(97) AS A, CHR(0xF9B5) AS B, CHR(0) AS C, CHR(NULL) AS D;

/*-------+-------+-------+-------+
 | A     | B     | C     | D     |
 +-------+-------+-------+-------+
 | a     | 例    |       | NULL  |
 +-------+-------+-------+-------*/
```

### `CODE_POINTS_TO_BYTES`

```sql
CODE_POINTS_TO_BYTES(ascii_code_points)
```

**Description**

Takes an array of extended ASCII
[code points](https://en.wikipedia.org/wiki/Code_point)
as `ARRAY<INT64>` and returns `BYTES`.

To convert from `BYTES` to an array of code points, see
[TO_CODE_POINTS](string_functions-2.md#to_code_points).

**Return type**

`BYTES`

**Examples**

The following is a basic example using `CODE_POINTS_TO_BYTES`.

```sql
SELECT CODE_POINTS_TO_BYTES([65, 98, 67, 100]) AS bytes;

-- Note that the result of CODE_POINTS_TO_BYTES is of type BYTES, displayed as a base64-encoded string.
-- In BYTES format, b'AbCd' is the result.
/*----------+
 | bytes    |
 +----------+
 | QWJDZA== |
 +----------*/
```

The following example uses a rotate-by-13 places (ROT13) algorithm to encode a
string.

```sql
SELECT CODE_POINTS_TO_BYTES(ARRAY_AGG(
  (SELECT
      CASE
        WHEN chr BETWEEN b'a' and b'z'
          THEN TO_CODE_POINTS(b'a')[offset(0)] +
            MOD(code+13-TO_CODE_POINTS(b'a')[offset(0)],26)
        WHEN chr BETWEEN b'A' and b'Z'
          THEN TO_CODE_POINTS(b'A')[offset(0)] +
            MOD(code+13-TO_CODE_POINTS(b'A')[offset(0)],26)
        ELSE code
      END
   FROM
     (SELECT code, CODE_POINTS_TO_BYTES([code]) chr)
  ) ORDER BY OFFSET)) AS encoded_string
FROM UNNEST(TO_CODE_POINTS(b'Test String!')) code WITH OFFSET;

-- Note that the result of CODE_POINTS_TO_BYTES is of type BYTES, displayed as a base64-encoded string.
-- In BYTES format, b'Grfg Fgevat!' is the result.
/*------------------+
 | encoded_string   |
 +------------------+
 | R3JmZyBGZ2V2YXQh |
 +------------------*/
```

### `CODE_POINTS_TO_STRING`

```sql
CODE_POINTS_TO_STRING(unicode_code_points)
```

**Description**

Takes an array of Unicode [code points](https://en.wikipedia.org/wiki/Code_point)
as `ARRAY<INT64>` and returns a `STRING`.

To convert from a string to an array of code points, see
[TO_CODE_POINTS](string_functions-2.md#to_code_points).

**Return type**

`STRING`

**Examples**

The following are basic examples using `CODE_POINTS_TO_STRING`.

```sql
SELECT CODE_POINTS_TO_STRING([65, 255, 513, 1024]) AS string;

/*--------+
 | string |
 +--------+
 | AÿȁЀ   |
 +--------*/
```

```sql
SELECT CODE_POINTS_TO_STRING([97, 0, 0xF9B5]) AS string;

/*--------+
 | string |
 +--------+
 | a例    |
 +--------*/
```

```sql
SELECT CODE_POINTS_TO_STRING([65, 255, NULL, 1024]) AS string;

/*--------+
 | string |
 +--------+
 | NULL   |
 +--------*/
```

The following example computes the frequency of letters in a set of words.

```sql
WITH Words AS (
  SELECT word
  FROM UNNEST(['foo', 'bar', 'baz', 'giraffe', 'llama']) AS word
)
SELECT
  CODE_POINTS_TO_STRING([code_point]) AS letter,
  COUNT(*) AS letter_count
FROM Words,
  UNNEST(TO_CODE_POINTS(word)) AS code_point
GROUP BY 1
ORDER BY 2 DESC;

/*--------+--------------+
 | letter | letter_count |
 +--------+--------------+
 | a      | 5            |
 | f      | 3            |
 | r      | 2            |
 | b      | 2            |
 | l      | 2            |
 | o      | 2            |
 | g      | 1            |
 | z      | 1            |
 | e      | 1            |
 | m      | 1            |
 | i      | 1            |
 +--------+--------------*/
```

### `COLLATE`

```sql
COLLATE(value, collate_specification)
```

Takes a `STRING` and a [collation specification](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/collation-concepts#collate_spec_details). Returns
a `STRING` with a collation specification. If `collate_specification` is empty,
returns a value with collation removed from the `STRING`.

The collation specification defines how the resulting `STRING` can be compared
and sorted. To learn more, see
[Collation](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/collation-concepts).

- `collation_specification` must be a string literal, otherwise an error is thrown.
- Returns `NULL` if `value` is `NULL`.

**Return type**

`STRING`

**Examples**

In this example, the weight of `a` is less than the weight of `Z`. This
is because the collate specification, `und:ci` assigns more weight to `Z`.

```sql
WITH Words AS (
  SELECT
    COLLATE('a', 'und:ci') AS char1,
    COLLATE('Z', 'und:ci') AS char2
)
SELECT ( Words.char1 < Words.char2 ) AS a_less_than_Z
FROM Words;

/*----------------+
 | a_less_than_Z  |
 +----------------+
 | TRUE           |
 +----------------*/
```

In this example, the weight of `a` is greater than the weight of `Z`. This
is because the default collate specification assigns more weight to `a`.

```sql
WITH Words AS (
  SELECT
    'a' AS char1,
    'Z' AS char2
)
SELECT ( Words.char1 < Words.char2 ) AS a_less_than_Z
FROM Words;

/*----------------+
 | a_less_than_Z  |
 +----------------+
 | FALSE          |
 +----------------*/
```

### `CONCAT`

```sql
CONCAT(value1[, ...])
```

**Description**

Concatenates one or more values into a single result. All values must be
`BYTES` or data types that can be cast to `STRING`.

The function returns `NULL` if any input argument is `NULL`.

> [!NOTE]
> **Note:** You can also use the [\|\| concatenation operator](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/operators) to concatenate values into a string.

**Return type**

`STRING` or `BYTES`

**Examples**

```sql
SELECT CONCAT('T.P.', ' ', 'Bar') as author;

/*---------------------+
 | author              |
 +---------------------+
 | T.P. Bar            |
 +---------------------*/
```

```sql
SELECT CONCAT('Summer', ' ', 1923) as release_date;

/*---------------------+
 | release_date        |
 +---------------------+
 | Summer 1923         |
 +---------------------*/
```

```sql
With Employees AS
  (SELECT
    'John' AS first_name,
    'Doe' AS last_name
  UNION ALL
  SELECT
    'Jane' AS first_name,
    'Smith' AS last_name
  UNION ALL
  SELECT
    'Joe' AS first_name,
    'Jackson' AS last_name)

SELECT
  CONCAT(first_name, ' ', last_name)
  AS full_name
FROM Employees;

/*---------------------+
 | full_name           |
 +---------------------+
 | John Doe            |
 | Jane Smith          |
 | Joe Jackson         |
 +---------------------*/
```

### `CONTAINS_SUBSTR`

```sql
CONTAINS_SUBSTR(
  expression,
  search_value_literal
  [, json_scope => json_scope_value ]
)
```

**Description**

Performs a normalized, case-insensitive search to see if a value exists as a
substring in an expression. Returns `TRUE` if the value exists, otherwise
returns `FALSE`.

Before values are compared, they are [normalized and case folded with `NFKC`
normalization](#normalize_and_casefold). Wildcard searches aren't
supported.

**Arguments**

- `search_value_literal`: The value to search for. It must be a `STRING` literal or a `STRING` constant expression.
- `expression`: The data to search over. The expression can be a column or
  table reference. A table reference is evaluated as a `STRUCT` whose fields
  are the columns of the table. A column reference is evaluated as one the
  following data types:

  - `STRING`
  - `INT64`
  - `BOOL`
  - `NUMERIC`
  - `BIGNUMERIC`
  - `TIMESTAMP`
  - `TIME`
  - `DATE`
  - `DATETIME`
  - `ARRAY`
  - `STRUCT`

  When the expression is evaluated, the result is cast to a `STRING`, and then
  the function looks for the search value in the result.

  You can perform a cross-field search on an expression that evaluates to a
  `STRUCT` or `ARRAY`. If the expression evaluates to a `STRUCT`, the
  cross-field search is recursive and includes all subfields inside the
  `STRUCT`.

  In a cross-field search, each field and subfield is individually converted
  to a string and searched for the value. The function returns `TRUE` if at
  least one field includes the search value; otherwise, if at least one field
  is `NULL`, it returns `NULL`; otherwise, if the search value isn't found
  and all fields are non-`NULL`, it returns `FALSE`.

  If the expression is `NULL`, the return value is `NULL`.
- `json_scope`: A named argument with a `STRING` value.
  Takes one of the following values to indicate the scope of `JSON` data to be
  searched. It has no effect if `expression` isn't `JSON` or doesn't
  contain a `JSON` field.

  - `'JSON_VALUES'`: Only the `JSON` values are searched. If `json_scope` is not provided, this is used by default.
  - `'JSON_KEYS'`: Only the `JSON` keys are searched.
  - `'JSON_KEYS_AND_VALUES'`: The `JSON` keys and values are searched.

**Return type**

`BOOL`

**Examples**

The following query returns `TRUE` because this case-insensitive match
was found: `blue house` and `Blue house`.

```sql
SELECT CONTAINS_SUBSTR('the blue house', 'Blue house') AS result;

/*--------+
 | result |
 +--------+
 | true   |
 +--------*/
```

The following query returns `TRUE` similar to the above example, but in this
case the search value is a constant expression with CONCAT function.

```sql
SELECT CONTAINS_SUBSTR('the blue house', CONCAT('Blue ', 'house')) AS result;

/*--------+
 | result |
 +--------+
 | true   |
 +--------*/
```

The following query returns `FALSE` because `blue` wasn't found
in `the red house`.

```sql
SELECT CONTAINS_SUBSTR('the red house', 'blue') AS result;

/*--------+
 | result |
 +--------+
 | false  |
 +--------*/
```

The following query returns `TRUE` because `Ⅸ` and `IX` represent the same
normalized value.

```sql
SELECT '\u2168 day' AS a, 'IX' AS b, CONTAINS_SUBSTR('\u2168', 'IX') AS result;

/*----------------------+
 | a      | b  | result |
 +----------------------+
 | Ⅸ day | IX | true   |
 +----------------------*/
```

The following query returns `TRUE` because `35` was found inside a
`STRUCT` field.

```sql
SELECT CONTAINS_SUBSTR((23, 35, 41), '35') AS result;

/*--------+
 | result |
 +--------+
 | true   |
 +--------*/
```

The following query returns `TRUE` because `jk` was found during a
recursive search inside a `STRUCT`.

Adapted (not in the official docs): Added the missing `AS result` alias so that the column matches the result table header.

```sql
SELECT CONTAINS_SUBSTR(('abc', ['def', 'ghi', 'jkl'], 'mno'), 'jk') AS result;

/*--------+
 | result |
 +--------+
 | true   |
 +--------*/
```

The following query returns `TRUE` because `NULL`s are ignored when
a match is found inside a `STRUCT` or `ARRAY`.

```sql
SELECT CONTAINS_SUBSTR((23, NULL, 41), '41') AS result;

/*--------+
 | result |
 +--------+
 | true   |
 +--------*/
```

The following query returns `NULL` because a `NULL` existed in a `STRUCT` that
didn't result in a match.

```sql
SELECT CONTAINS_SUBSTR((23, NULL, 41), '35') AS result;

/*--------+
 | result |
 +--------+
 | null   |
 +--------*/
```

In the following query, an error is thrown because the search value can't be
a literal `NULL`.

```sql
SELECT CONTAINS_SUBSTR('hello', NULL) AS result;
-- Throws an error
```

The following examples reference a table called `Recipes` that you can emulate
with a `WITH` clause like this:

Adapted (not in the official docs): corrected the misspelled result values to match the `WITH Recipes` setup.

```sql
WITH Recipes AS
 (SELECT 'Blueberry pancakes' as Breakfast, 'Egg salad sandwich' as Lunch, 'Potato dumplings' as Dinner UNION ALL
  SELECT 'Potato pancakes', 'Toasted cheese sandwich', 'Beef stroganoff' UNION ALL
  SELECT 'Ham scramble', 'Steak avocado salad', 'Tomato pasta' UNION ALL
  SELECT 'Avocado toast', 'Tomato soup', 'Blueberry salmon' UNION ALL
  SELECT 'Corned beef hash', 'Lentil potato soup', 'Glazed ham')
SELECT * FROM Recipes;

/*--------------------+-------------------------+------------------+
 | Breakfast          | Lunch                   | Dinner           |
 +--------------------+-------------------------+------------------+
 | Blueberry pancakes | Egg salad sandwich      | Potato dumplings |
 | Potato pancakes    | Toasted cheese sandwich | Beef stroganoff  |
 | Ham scramble       | Steak avocado salad     | Tomato pasta     |
 | Avocado toast      | Tomato soup             | Blueberry salmon |
 | Corned beef hash   | Lentil potato soup      | Glazed ham       |
 +--------------------+-------------------------+------------------*/
```

The following query searches across all columns of the `Recipes` table for the
value `toast` and returns the rows that contain this value.

Adapted (not in the official docs): corrected the misspelled result values to match the `WITH Recipes` setup.

```sql
SELECT * FROM Recipes WHERE CONTAINS_SUBSTR(Recipes, 'toast');

/*-------------------+-------------------------+------------------+
 | Breakfast         | Lunch                   | Dinner           |
 +-------------------+-------------------------+------------------+
 | Potato pancakes   | Toasted cheese sandwich | Beef stroganoff  |
 | Avocado toast     | Tomato soup             | Blueberry salmon |
 +-------------------+-------------------------+------------------*/
```

The following query searches the `Lunch` and `Dinner` columns of the
`Recipe` table for the value `potato` and returns the row if either column
contains this value.

Adapted (not in the official docs): corrected the misspelled result values to match the `WITH Recipes` setup.

```sql
SELECT * FROM Recipes WHERE CONTAINS_SUBSTR((Lunch, Dinner), 'potato');

/*--------------------+-------------------------+------------------+
 | Breakfast          | Lunch                   | Dinner           |
 +--------------------+-------------------------+------------------+
 | Blueberry pancakes | Egg salad sandwich      | Potato dumplings |
 | Corned beef hash   | Lentil potato soup      | Glazed ham       |
 +--------------------+-------------------------+------------------*/
```

The following query searches across all columns of the `Recipes` table
except for the `Lunch` and `Dinner` columns. It returns the rows of any
columns other than `Lunch` or `Dinner` that contain the value `potato`.

```sql
SELECT *
FROM Recipes
WHERE CONTAINS_SUBSTR(
  (SELECT AS STRUCT Recipes.* EXCEPT (Lunch, Dinner)),
  'potato'
);

/*-------------------+-------------------------+------------------+
 | Breakfast         | Lunch                   | Dinner           |
 +-------------------+-------------------------+------------------+
 | Potato pancakes   | Toasted cheese sandwich | Beef stroganoff  |
 +-------------------+-------------------------+------------------*/
```

The following query searches for the value `lunch` in the JSON
`{"lunch":"soup"}` and returns `FALSE` because the default `json_scope` is
`"JSON_VALUES"`, and `lunch` is a `JSON` key, not a `JSON` value.

```sql
SELECT CONTAINS_SUBSTR(JSON '{"lunch":"soup"}',"lunch") AS result;

/*--------+
 | result |
 +--------+
 | FALSE  |
 +--------*/
```

The following query searches for the value `lunch` in the values of the JSON
`{"lunch":"soup"}` and returns `FALSE` because `lunch` is a `JSON` key, not a
`JSON` value.

```sql
SELECT CONTAINS_SUBSTR(JSON '{"lunch":"soup"}',
                       "lunch",
                       json_scope=>"JSON_VALUES") AS result;

/*--------+
 | result |
 +--------+
 | FALSE  |
 +--------*/
```

The following query searches for the value `lunch` in the keys and values of the
JSON `{"lunch":"soup"}` and returns `TRUE` because `lunch` is a `JSON` key.

```sql
SELECT CONTAINS_SUBSTR(JSON '{"lunch":"soup"}',
                       "lunch",
                       json_scope=>"JSON_KEYS_AND_VALUES") AS result;

/*--------+
 | result |
 +--------+
 | TRUE   |
 +--------*/
```

The following query searches for the value `lunch` in the keys of the JSON
`{"lunch":"soup"}` and returns `TRUE` because `lunch` is a `JSON` key.

```sql
SELECT CONTAINS_SUBSTR(JSON '{"lunch":"soup"}',
                       "lunch",
                       json_scope=>"JSON_KEYS") AS result;

/*--------+
 | result |
 +--------+
 | TRUE   |
 +--------*/
```

### `EDIT_DISTANCE`

```sql
EDIT_DISTANCE(
  value1,
  value2,
  [ max_distance => max_distance_value ]
)
```

**Description**

Computes the [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) between two `STRING` or
`BYTES` values.

**Definitions**

- `value1`: The first `STRING` or `BYTES` value to compare.
- `value2`: The second `STRING` or `BYTES` value to compare.
- `max_distance`: A named argument with a `INT64` value that's greater than
  or equal to zero. Represents the maximum distance between the two values
  to compute.

  If this distance is exceeded, the function returns this value.
  The default value for this argument is the maximum size of
  `value1` and `value2`.

**Details**

If `value1` or `value2` is `NULL`, `NULL` is returned.

You can only compare values of the same type. Otherwise, an error is produced.

**Return type**

`INT64`

**Examples**

In the following example, the first character in both strings is different:

```sql
SELECT EDIT_DISTANCE('a', 'b') AS results;

/*---------+
 | results |
 +---------+
 | 1       |
 +---------*/
```

In the following example, the first and second characters in both strings are
different:

```sql
SELECT EDIT_DISTANCE('aa', 'b') AS results;

/*---------+
 | results |
 +---------+
 | 2       |
 +---------*/
```

In the following example, only the first character in both strings is
different:

```sql
SELECT EDIT_DISTANCE('aa', 'ba') AS results;

/*---------+
 | results |
 +---------+
 | 1       |
 +---------*/
```

In the following example, the last six characters are different, but because
the maximum distance is `2`, this function exits early and returns `2`, the
maximum distance:

```sql
SELECT EDIT_DISTANCE('abcdefg', 'a', max_distance => 2) AS results;

/*---------+
 | results |
 +---------+
 | 2       |
 +---------*/
```

### `ENDS_WITH`

```sql
ENDS_WITH(value, suffix)
```

**Description**

Takes two `STRING` or `BYTES` values. Returns `TRUE` if `suffix`
is a suffix of `value`.

This function supports specifying [collation](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/collation-concepts).

**Return type**

`BOOL`

**Examples**

```sql
SELECT ENDS_WITH('apple', 'e') as example

/*---------+
 | example |
 +---------+
 |    True |
 +---------*/
```

### `FORMAT`

```sql
FORMAT(format_string_expression, data_type_expression[, ...])
```

**Description**

`FORMAT` formats a data type expression as a string.

- `format_string_expression`: Can contain zero or more [format specifiers](#supported-format-specifiers). Each format specifier is introduced by the `%` symbol, and must map to one or more of the remaining arguments. In general, this is a one-to-one mapping, except when the `*` specifier is present. For example, `%.*i` maps to two arguments---a length argument and a signed integer argument. If the number of arguments related to the format specifiers isn't the same as the number of arguments, an error occurs.
- `data_type_expression`: The value to format as a string. This can be any GoogleSQL data type.

**Return type**

`STRING`

**Examples**

| Description | Statement | Result |
|---|---|---|
| Simple integer | FORMAT('%d', 10) | 10 |
| Integer with left blank padding | FORMAT('\|%10d\|', 11) | \| 11\| |
| Integer with left zero padding | FORMAT('+%010d+', 12) | +0000000012+ |
| Integer with commas | FORMAT("%'d", 123456789) | 123,456,789 |
| STRING | FORMAT('-%s-', 'abcd efg') | -abcd efg- |
| FLOAT64 | FORMAT('%f %E', 1.1, 2.2) | 1.100000 2.200000E+00 |
| DATE | FORMAT('%t', date '2015-09-01') | 2015-09-01 |
| TIMESTAMP | FORMAT('%t', timestamp '2015-09-01 12:34:56 America/Los_Angeles') | 2015‑09‑01 19:34:56+00 |

The `FORMAT()` function doesn't provide fully customizable formatting for all
types and values, nor formatting that's sensitive to locale.

If custom formatting is necessary for a type, you must first format it using
type-specific format functions, such as `FORMAT_DATE()` or `FORMAT_TIMESTAMP()`.
For example:

```sql
SELECT FORMAT('date: %s!', FORMAT_DATE('%B %d, %Y', date '2015-01-02'));
```

Returns

```sql
date: January 02, 2015!
```

##### Supported format specifiers

```sql
%[flags][width][.precision]specifier
```

A [format specifier](#format-specifiers) adds formatting when casting a
value to a string. It can optionally contain these sub-specifiers:

- [Flags](#flags)
- [Width](#width)
- [Precision](#precision)

Additional information about format specifiers:

- [%g and %G behavior](#g-and-g-behavior)
- [%p and %P behavior](#p-and-p-behavior)
- [%t and %T behavior](#t-and-t-behavior)
- [Error conditions](#error-conditions)
- [NULL argument handling](#null-argument-handling)
- [Additional semantic rules](#additional-semantic-rules)

###### Format specifiers

|---|---|---|---|
| Specifier | Description | Examples | Types |
| `d` or `i` | Decimal integer | 392 | `INT64` |
| `o` | Octal <br /> Note: If an `INT64` value is negative, an error is produced. | 610 | `INT64` |
| `x` | Hexadecimal integer <br /> Note: If an `INT64` value is negative, an error is produced. | 7fa | `INT64` |
| `X` | Hexadecimal integer (uppercase) <br /> Note: If an `INT64` value is negative, an error is produced. | 7FA | `INT64` |
| `f` | Decimal notation, in \[-\](integer part).(fractional part) for finite values, and in lowercase for non-finite values | 392.650000 inf nan | `NUMERIC` `BIGNUMERIC` `FLOAT64` |
| `F` | Decimal notation, in \[-\](integer part).(fractional part) for finite values, and in uppercase for non-finite values | 392.650000 INF NAN | `NUMERIC` `BIGNUMERIC` `FLOAT64` |
| `e` | Scientific notation (mantissa/exponent), lowercase | 3.926500e+02 inf nan | `NUMERIC` `BIGNUMERIC` `FLOAT64` |
| `E` | Scientific notation (mantissa/exponent), uppercase | 3.926500E+02 INF NAN | `NUMERIC` `BIGNUMERIC` `FLOAT64` |
| `g` | Either decimal notation or scientific notation, depending on the input value's exponent and the specified precision. Lowercase. See [%g and %G behavior](#g-and-g-behavior) for details. | 392.65 3.9265e+07 inf nan | `NUMERIC` `BIGNUMERIC` `FLOAT64` |
| `G` | Either decimal notation or scientific notation, depending on the input value's exponent and the specified precision. Uppercase. See [%g and %G behavior](#g-and-g-behavior) for details. | 392.65 3.9265E+07 INF NAN | `NUMERIC` `BIGNUMERIC` `FLOAT64` |
| `p` | Produces a one-line printable string representing JSON. See [%p and %P behavior](#p-and-p-behavior). | ``` {"month":10,"year":2019} ``` | `JSON` |
| `P` | Produces a multi-line printable string representing JSON. See [%p and %P behavior](#p-and-p-behavior). | ``` { "month": 10, "year": 2019 } ``` | `JSON` |
| `s` | String of characters | sample | `STRING` |
| `t` | Returns a printable string representing the value. Often looks similar to casting the argument to `STRING`. See [%t and %T behavior](#t-and-t-behavior). | sample 2014‑01‑01 | Any type |
| `T` | Produces a string that's a valid GoogleSQL constant with a similar type to the value's type (maybe wider, or maybe string). See [%t and %T behavior](#t-and-t-behavior). | 'sample' b'bytes sample' 1234 2.3 date '2014‑01‑01' | Any type |
| `%` | '%%' produces a single '%' | % | n/a |

The format specifier can optionally contain the sub-specifiers identified above
in the specifier prototype.

These sub-specifiers must comply with the following specifications.

###### Flags

|---|---|
| Flags | Description |
| `-` | Left-justify within the given field width; Right justification is the default (see width sub-specifier) |
| `+` | Forces to precede the result with a plus or minus sign (`+` or `-`) even for positive numbers. By default, only negative numbers are preceded with a `-` sign |
| \<space\> | If no sign is going to be written, a blank space is inserted before the value |
| `#` | - For \`%o\`, \`%x\`, and \`%X\`, this flag means to precede the value with 0, 0x or 0X respectively for values different than zero. - For \`%f\`, \`%F\`, \`%e\`, and \`%E\`, this flag means to add the decimal point even when there is no fractional part, unless the value is non-finite. - For \`%g\` and \`%G\`, this flag means to add the decimal point even when there is no fractional part unless the value is non-finite, and never remove the trailing zeros after the decimal point. |
| `0` | Left-pads the number with zeroes (0) instead of spaces when padding is specified (see width sub-specifier) |
| `'` | Formats integers using the appropriating grouping character. For example: - `FORMAT("%'d", 12345678)` returns `12,345,678` - `FORMAT("%'x", 12345678)` returns `bc:614e` - `FORMAT("%'o", 55555)` returns `15,4403` - This flag is only relevant for decimal, hex, and octal values. |

Flags may be specified in any order. Duplicate flags aren't an error. When
flags aren't relevant for some element type, they are ignored.

###### Width

|---|---|
| Width | Description |
| \<number\> | Minimum number of characters to be printed. If the value to be printed is shorter than this number, the result is padded with blank spaces. The value isn't truncated even if the result is larger |
| `*` | The width isn't specified in the format string, but as an additional integer value argument preceding the argument that has to be formatted |

###### Precision

|---|---|
| Precision | Description |
| `.`\<number\> | - For integer specifiers \`%d\`, \`%i\`, \`%o\`, \`%x\`, and \`%X\`: precision specifies the minimum number of digits to be written. If the value to be written is shorter than this number, the result is padded with leading zeros. The value isn't truncated even if the result is longer. A precision of 0 means that no character is written for the value 0. - For specifiers \`%e\`, \`%E\`, \`%f\`, and \`%F\`: this is the number of digits to be printed after the decimal point. The default value is 6. - For specifiers \`%g\` and \`%G\`: this is the number of significant digits to be printed, before the removal of the trailing zeros after the decimal point. The default value is 6. |
| `.*` | The precision isn't specified in the format string, but as an additional integer value argument preceding the argument that has to be formatted |

###### %g and %G behavior

The `%g` and `%G` format specifiers choose either the decimal notation (like
the `%f` and `%F` specifiers) or the scientific notation (like the `%e` and `%E`
specifiers), depending on the input value's exponent and the specified
[precision](#precision).

Let p stand for the specified [precision](#precision) (defaults to 6; 1 if the
specified precision is less than 1). The input value is first converted to
scientific notation with precision = (p - 1). If the resulting exponent part x
is less than -4 or no less than p, the scientific notation with precision =
(p - 1) is used; otherwise the decimal notation with precision = (p - 1 - x) is
used.

Unless [`#` flag](#flags) is present, the trailing zeros after the decimal point
are removed, and the decimal point is also removed if there is no digit after
it.

###### %p and %P behavior

The `%p` format specifier produces a one-line printable string. The `%P`
format specifier produces a multi-line printable string. You can use these
format specifiers with the following data types:

|---|---|---|
| **Type** | **%p** | **%P** |
| JSON | JSON input: ``` JSON ' { "month": 10, "year": 2019 } ' ``` Produces a one-line printable string representing JSON: ``` {"month":10,"year":2019} ``` | JSON input: ``` JSON ' { "month": 10, "year": 2019 } ' ``` Produces a multi-line printable string representing JSON: ``` { "month": 10, "year": 2019 } ``` |

###### %t and %T behavior

The `%t` and `%T` format specifiers are defined for all types. The
[width](#width), [precision](#precision), and [flags](#flags) act as they do
for `%s`: the [width](#width) is the minimum width and the `STRING` will be
padded to that size, and [precision](#precision) is the maximum width
of content to show and the `STRING` will be truncated to that size, prior to
padding to width.

The `%t` specifier is always meant to be a readable form of the value.

The `%T` specifier is always a valid SQL literal of a similar type, such as a
wider numeric type. The literal will not include casts or a type name,
except for the special case of non-finite floating point values.

The `STRING` is formatted as follows:

|---|---|---|
| **Type** | **%t** | **%T** |
| `NULL` of any type | NULL | NULL |
| `INT64` | 123 | 123 |
| NUMERIC | 123.0 *(always with .0)* | NUMERIC "123.0" |
| FLOAT64 | 123.0 *(always with .0)* 123e+10 `inf` `-inf` `NaN` | 123.0 *(always with .0)* 123e+10 CAST("inf" AS \<type\>) CAST("-inf" AS \<type\>) CAST("nan" AS \<type\>) |
| STRING | unquoted string value | quoted string literal |
| BYTES | unquoted escaped bytes e.g., abc\\x01\\x02 | quoted bytes literal e.g., b"abc\\x01\\x02" |
| BOOL | boolean value | boolean value |
| DATE | 2011-02-03 | DATE "2011-02-03" |
| TIMESTAMP | 2011-02-03 04:05:06+00 | TIMESTAMP "2011-02-03 04:05:06+00" |
| INTERVAL | 1-2 3 4:5:6.789 | INTERVAL "1-2 3 4:5:6.789" YEAR TO SECOND |
| ARRAY | \[value, value, ...\] where values are formatted with %t | \[value, value, ...\] where values are formatted with %T |
| STRUCT | (value, value, ...) where fields are formatted with %t | (value, value, ...) where fields are formatted with %T <br /> Special cases: Zero fields: STRUCT() One field: STRUCT(value) |
| JSON | one-line printable string representing JSON. ```json {"name":"apple","stock":3} ``` | one-line printable string representing a JSON literal. ```sql JSON '{"name":"apple","stock":3}' ``` |

###### Error conditions

If a format specifier is invalid, or isn't compatible with the related
argument type, or the wrong number or arguments are provided, then an error is
produced. For example, the following `<format_string>` expressions are invalid:

```sql
FORMAT('%s', 1)
```

```sql
FORMAT('%')
```

###### NULL argument handling

A `NULL` format string results in a `NULL` output `STRING`. Any other arguments
are ignored in this case.

The function generally produces a `NULL` value if a `NULL` argument is present.
For example, `FORMAT('%i', NULL_expression)` produces a `NULL STRING` as
output.

However, there are some exceptions: if the format specifier is %t or %T
(both of which produce `STRING`s that effectively match CAST and literal value
semantics), a `NULL` value produces 'NULL' (without the quotes) in the result
`STRING`. For example, the function:

```sql
FORMAT('00-%t-00', NULL_expression);
```

Returns

```sql
00-NULL-00
```

###### Additional semantic rules

`FLOAT64` values can be `+/-inf` or `NaN`.
When an argument has one of those values, the result of the format specifiers
`%f`, `%F`, `%e`, `%E`, `%g`, `%G`, and `%t` are `inf`, `-inf`, or `nan`
(or the same in uppercase) as appropriate. This is consistent with how
GoogleSQL casts these values to `STRING`. For `%T`,
GoogleSQL returns quoted strings for
`FLOAT64` values that don't have non-string literal
representations.

### `FROM_BASE32`

```sql
FROM_BASE32(string_expr)
```

**Description**

Converts the base32-encoded input `string_expr` into `BYTES` format. To convert
`BYTES` to a base32-encoded `STRING`, use [TO_BASE32](string_functions-2.md#to_base32).

**Return type**

`BYTES`

**Example**

```sql
SELECT FROM_BASE32('MFRGGZDF74======') AS byte_data;

-- Note that the result of FROM_BASE32 is of type BYTES, displayed as a base64-encoded string.
/*-----------+
 | byte_data |
 +-----------+
 | YWJjZGX/  |
 +-----------*/
```

### `FROM_BASE64`

```sql
FROM_BASE64(string_expr)
```

**Description**

Converts the base64-encoded input `string_expr` into
`BYTES` format. To convert
`BYTES` to a base64-encoded `STRING`,
use [TO_BASE64](string_functions-2.md#to_base64).

There are several base64 encodings in common use that vary in exactly which
alphabet of 65 ASCII characters are used to encode the 64 digits and padding.
See [RFC 4648](https://tools.ietf.org/html/rfc4648#section-4) for details. This
function expects the alphabet `[A-Za-z0-9+/=]`.

**Return type**

`BYTES`

**Example**

```sql
SELECT FROM_BASE64('/+A=') AS byte_data;

-- Note that the result of FROM_BASE64 is of type BYTES, displayed as a base64-encoded string.
/*-----------+
 | byte_data |
 +-----------+
 | /+A=      |
 +-----------*/
```

To work with an encoding using a different base64 alphabet, you might need to
compose `FROM_BASE64` with the `REPLACE` function. For instance, the
`base64url` url-safe and filename-safe encoding commonly used in web programming
uses `-_=` as the last characters rather than `+/=`. To decode a
`base64url`-encoded string, replace `-` and `_` with `+` and `/` respectively.

```sql
SELECT FROM_BASE64(REPLACE(REPLACE('_-A=', '-', '+'), '_', '/')) AS binary;

-- Note that the result of FROM_BASE64 is of type BYTES, displayed as a base64-encoded string.
/*--------+
 | binary |
 +--------+
 | /+A=   |
 +--------*/
```

### `FROM_HEX`

```sql
FROM_HEX(string)
```

**Description**

Converts a hexadecimal-encoded `STRING` into `BYTES` format. Returns an error
if the input `STRING` contains characters outside the range
`(0..9, A..F, a..f)`. The lettercase of the characters doesn't matter. If the
input `STRING` has an odd number of characters, the function acts as if the
input has an additional leading `0`. To convert `BYTES` to a hexadecimal-encoded
`STRING`, use [TO_HEX](string_functions-2.md#to_hex).

**Return type**

`BYTES`

**Example**

```sql
WITH Input AS (
  SELECT '00010203aaeeefff' AS hex_str UNION ALL
  SELECT '0AF' UNION ALL
  SELECT '666f6f626172'
)
SELECT hex_str, FROM_HEX(hex_str) AS bytes_str
FROM Input;

-- Note that the result of FROM_HEX is of type BYTES, displayed as a base64-encoded string.
/*------------------+--------------+
 | hex_str          | bytes_str    |
 +------------------+--------------+
 | 0AF              | AK8=         |
 | 00010203aaeeefff | AAECA6ru7/8= |
 | 666f6f626172     | Zm9vYmFy     |
 +------------------+--------------*/
```

### `INITCAP`

```sql
INITCAP(value[, delimiters])
```

**Description**

Takes a `STRING` and returns it with the first character in each word in
uppercase and all other characters in lowercase. Non-alphabetic characters
remain the same.

`delimiters` is an optional string argument that's used to override the default
set of characters used to separate words. If `delimiters` isn't specified, it
defaults to the following characters:   

`<whitespace> [ ] ( ) { } / | \ < > ! ? @ " ^ # $ & ~ _ , . : ; * % + -`

If `value` or `delimiters` is `NULL`, the function returns `NULL`.

**Return type**

`STRING`

**Examples**

```sql
SELECT
  'Hello World-everyone!' AS value,
  INITCAP('Hello World-everyone!') AS initcap_value

/*-------------------------------+-------------------------------+
 | value                         | initcap_value                 |
 +-------------------------------+-------------------------------+
 | Hello World-everyone!         | Hello World-Everyone!         |
 +-------------------------------+-------------------------------*/
```

```sql
SELECT
  'Apples1oranges2pears' as value,
  '12' AS delimiters,
  INITCAP('Apples1oranges2pears' , '12') AS initcap_value

/*----------------------+------------+----------------------+
 | value                | delimiters | initcap_value        |
 +----------------------+------------+----------------------+
 | Apples1oranges2pears | 12         | Apples1Oranges2Pears |
 +----------------------+------------+----------------------*/
```

### `INSTR`

```sql
INSTR(value, subvalue[, position[, occurrence]])
```

**Description**

Returns the lowest 1-based position of `subvalue` in `value`.
`value` and `subvalue` must be the same type, either
`STRING` or `BYTES`.

If `position` is specified, the search starts at this position in
`value`, otherwise it starts at `1`, which is the beginning of
`value`. If `position` is negative, the function searches backwards
from the end of `value`, with `-1` indicating the last character.
`position` is of type `INT64` and can't be `0`.

If `occurrence` is specified, the search returns the position of a specific
instance of `subvalue` in `value`. If not specified, `occurrence`
defaults to `1` and returns the position of the first occurrence.
For `occurrence` \> `1`, the function includes overlapping occurrences.
`occurrence` is of type `INT64` and must be positive.

This function supports specifying [collation](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/collation-concepts).

Returns `0` if:

- No match is found.
- If `occurrence` is greater than the number of matches found.
- If `position` is greater than the length of `value`.

Returns `NULL` if:

- Any input argument is `NULL`.

Returns an error if:

- `position` is `0`.
- `occurrence` is `0` or negative.

**Return type**

`INT64`

**Examples**

```sql
SELECT
  'banana' AS value, 'an' AS subvalue, 1 AS position, 1 AS occurrence,
  INSTR('banana', 'an', 1, 1) AS instr;

/*--------------+--------------+----------+------------+-------+
 | value        | subvalue     | position | occurrence | instr |
 +--------------+--------------+----------+------------+-------+
 | banana       | an           | 1        | 1          | 2     |
 +--------------+--------------+----------+------------+-------*/
```

```sql
SELECT
  'banana' AS value, 'an' AS subvalue, 1 AS position, 2 AS occurrence,
  INSTR('banana', 'an', 1, 2) AS instr;

/*--------------+--------------+----------+------------+-------+
 | value        | subvalue     | position | occurrence | instr |
 +--------------+--------------+----------+------------+-------+
 | banana       | an           | 1        | 2          | 4     |
 +--------------+--------------+----------+------------+-------*/
```

```sql
SELECT
  'banana' AS value, 'an' AS subvalue, 1 AS position, 3 AS occurrence,
  INSTR('banana', 'an', 1, 3) AS instr;

/*--------------+--------------+----------+------------+-------+
 | value        | subvalue     | position | occurrence | instr |
 +--------------+--------------+----------+------------+-------+
 | banana       | an           | 1        | 3          | 0     |
 +--------------+--------------+----------+------------+-------*/
```

```sql
SELECT
  'banana' AS value, 'an' AS subvalue, 3 AS position, 1 AS occurrence,
  INSTR('banana', 'an', 3, 1) AS instr;

/*--------------+--------------+----------+------------+-------+
 | value        | subvalue     | position | occurrence | instr |
 +--------------+--------------+----------+------------+-------+
 | banana       | an           | 3        | 1          | 4     |
 +--------------+--------------+----------+------------+-------*/
```

```sql
SELECT
  'banana' AS value, 'an' AS subvalue, -1 AS position, 1 AS occurrence,
  INSTR('banana', 'an', -1, 1) AS instr;

/*--------------+--------------+----------+------------+-------+
 | value        | subvalue     | position | occurrence | instr |
 +--------------+--------------+----------+------------+-------+
 | banana       | an           | -1       | 1          | 4     |
 +--------------+--------------+----------+------------+-------*/
```

```sql
SELECT
  'banana' AS value, 'an' AS subvalue, -3 AS position, 1 AS occurrence,
  INSTR('banana', 'an', -3, 1) AS instr;

/*--------------+--------------+----------+------------+-------+
 | value        | subvalue     | position | occurrence | instr |
 +--------------+--------------+----------+------------+-------+
 | banana       | an           | -3       | 1          | 4     |
 +--------------+--------------+----------+------------+-------*/
```

```sql
SELECT
  'banana' AS value, 'ann' AS subvalue, 1 AS position, 1 AS occurrence,
  INSTR('banana', 'ann', 1, 1) AS instr;

/*--------------+--------------+----------+------------+-------+
 | value        | subvalue     | position | occurrence | instr |
 +--------------+--------------+----------+------------+-------+
 | banana       | ann          | 1        | 1          | 0     |
 +--------------+--------------+----------+------------+-------*/
```

```sql
SELECT
  'helloooo' AS value, 'oo' AS subvalue, 1 AS position, 1 AS occurrence,
  INSTR('helloooo', 'oo', 1, 1) AS instr;

/*--------------+--------------+----------+------------+-------+
 | value        | subvalue     | position | occurrence | instr |
 +--------------+--------------+----------+------------+-------+
 | helloooo     | oo           | 1        | 1          | 5     |
 +--------------+--------------+----------+------------+-------*/
```

```sql
SELECT
  'helloooo' AS value, 'oo' AS subvalue, 1 AS position, 2 AS occurrence,
  INSTR('helloooo', 'oo', 1, 2) AS instr;

/*--------------+--------------+----------+------------+-------+
 | value        | subvalue     | position | occurrence | instr |
 +--------------+--------------+----------+------------+-------+
 | helloooo     | oo           | 1        | 2          | 6     |
 +--------------+--------------+----------+------------+-------*/
```

### `LEFT`

```sql
LEFT(value, length)
```

**Description**

Returns a `STRING` or `BYTES` value that consists of the specified
number of leftmost characters or bytes from `value`. The `length` is an
`INT64` that specifies the length of the returned
value. If `value` is of type `BYTES`, `length` is the number of leftmost bytes
to return. If `value` is `STRING`, `length` is the number of leftmost characters
to return.

If `length` is 0, an empty `STRING` or `BYTES` value will be
returned. If `length` is negative, an error will be returned. If `length`
exceeds the number of characters or bytes from `value`, the original `value`
will be returned.

**Return type**

`STRING` or `BYTES`

**Examples**

```sql
SELECT LEFT('banana', 3) AS results

/*---------+
 | results |
  +--------+
 | ban     |
 +---------*/
```

```sql
SELECT LEFT(b'\xab\xcd\xef\xaa\xbb', 3) AS results

-- Note that the result of LEFT is of type BYTES, displayed as a base64-encoded string.
/*---------+
 | results |
 +---------+
 | q83v    |
 +---------*/
```

### `LENGTH`

```sql
LENGTH(value)
```

**Description**

Returns the length of the `STRING` or `BYTES` value. The returned
value is in characters for `STRING` arguments and in bytes for the `BYTES`
argument.

**Return type**

`INT64`

**Examples**

```sql
SELECT
  LENGTH('абвгд') AS string_example,
  LENGTH(CAST('абвгд' AS BYTES)) AS bytes_example;

/*----------------+---------------+
 | string_example | bytes_example |
 +----------------+---------------+
 | 5              | 10            |
 +----------------+---------------*/
```

### `LOWER`

```sql
LOWER(value)
```

**Description**

For `STRING` arguments, returns the original string with all alphabetic
characters in lowercase. Mapping between lowercase and uppercase is done
according to the
[Unicode Character Database](http://unicode.org/ucd/)
without taking into account language-specific mappings.

For `BYTES` arguments, the argument is treated as ASCII text, with all bytes
greater than 127 left intact.

**Return type**

`STRING` or `BYTES`

**Examples**

```sql
SELECT
  LOWER('FOO BAR BAZ') AS example
FROM items;

/*-------------+
 | example     |
 +-------------+
 | foo bar baz |
 +-------------*/
```

### `LPAD`

```sql
LPAD(original_value, return_length[, pattern])
```

**Description**

Returns a `STRING` or `BYTES` value that consists of `original_value` prepended
with `pattern`. The `return_length` is an `INT64` that
specifies the length of the returned value. If `original_value` is of type
`BYTES`, `return_length` is the number of bytes. If `original_value` is
of type `STRING`, `return_length` is the number of characters.

The default value of `pattern` is a blank space.

Both `original_value` and `pattern` must be the same data type.

If `return_length` is less than or equal to the `original_value` length, this
function returns the `original_value` value, truncated to the value of
`return_length`. For example, `LPAD('hello world', 7);` returns `'hello w'`.

If `original_value`, `return_length`, or `pattern` is `NULL`, this function
returns `NULL`.

This function returns an error if:

- `return_length` is negative
- `pattern` is empty

**Return type**

`STRING` or `BYTES`

**Examples**

```sql
SELECT FORMAT('%T', LPAD('c', 5)) AS results

/*---------+
 | results |
 +---------+
 | "    c" |
 +---------*/
```

```sql
SELECT LPAD('b', 5, 'a') AS results

/*---------+
 | results |
 +---------+
 | aaaab   |
 +---------*/
```

```sql
SELECT LPAD('abc', 10, 'ghd') AS results

/*------------+
 | results    |
 +------------+
 | ghdghdgabc |
 +------------*/
```

```sql
SELECT LPAD('abc', 2, 'd') AS results

/*---------+
 | results |
 +---------+
 | ab      |
 +---------*/
```

```sql
SELECT FORMAT('%T', LPAD(b'abc', 10, b'ghd')) AS results

/*---------------+
 | results       |
 +---------------+
 | b"ghdghdgabc" |
 +---------------*/
```

### `LTRIM`

```sql
LTRIM(value1[, value2])
```

**Description**

Identical to [TRIM](string_functions-2.md#trim), but only removes leading characters.

**Return type**

`STRING` or `BYTES`

**Examples**

```sql
SELECT CONCAT('#', LTRIM('   apple   '), '#') AS example

/*-------------+
 | example     |
 +-------------+
 | #apple   #  |
 +-------------*/
```

```sql
SELECT LTRIM('***apple***', '*') AS example

/*-----------+
 | example   |
 +-----------+
 | apple***  |
 +-----------*/
```

```sql
SELECT LTRIM('xxxapplexxx', 'xyz') AS example

/*-----------+
 | example   |
 +-----------+
 | applexxx  |
 +-----------*/
```

### `NORMALIZE`

```sql
NORMALIZE(value[, normalization_mode])
```

**Description**

Takes a string value and returns it as a normalized string. If you don't
provide a normalization mode, `NFC` is used.

[Normalization](https://en.wikipedia.org/wiki/Unicode_equivalence#Normalization) is used to ensure that
two strings are equivalent. Normalization is often used in situations in which
two strings render the same on the screen but have different Unicode code
points.

`NORMALIZE` supports four optional normalization modes:

| Value | Name | Description |
|---|---|---|
| `NFC` | Normalization Form Canonical Composition | Decomposes and recomposes characters by canonical equivalence. |
| `NFKC` | Normalization Form Compatibility Composition | Decomposes characters by compatibility, then recomposes them by canonical equivalence. |
| `NFD` | Normalization Form Canonical Decomposition | Decomposes characters by canonical equivalence, and multiple combining characters are arranged in a specific order. |
| `NFKD` | Normalization Form Compatibility Decomposition | Decomposes characters by compatibility, and multiple combining characters are arranged in a specific order. |

**Return type**

`STRING`

**Examples**

The following example normalizes different language characters:

```sql
SELECT
  NORMALIZE('\u00ea') as a,
  NORMALIZE('\u0065\u0302') as b,
  NORMALIZE('\u00ea') = NORMALIZE('\u0065\u0302') as normalized;

/*---+---+------------+
 | a | b | normalized |
 +---+---+------------+
 | ê | ê | TRUE       |
 +---+---+------------*/
```

The following examples normalize different space characters:

```sql
SELECT NORMALIZE('Raha\u2004Mahan', NFKC) AS normalized_name

/*-----------------+
 | normalized_name |
 +-----------------+
 | Raha Mahan      |
 +-----------------*/
```

```sql
SELECT NORMALIZE('Raha\u2005Mahan', NFKC) AS normalized_name

/*-----------------+
 | normalized_name |
 +-----------------+
 | Raha Mahan      |
 +-----------------*/
```

```sql
SELECT NORMALIZE('Raha\u2006Mahan', NFKC) AS normalized_name

/*-----------------+
 | normalized_name |
 +-----------------+
 | Raha Mahan      |
 +-----------------*/
```

```sql
SELECT NORMALIZE('Raha Mahan', NFKC) AS normalized_name

/*-----------------+
 | normalized_name |
 +-----------------+
 | Raha Mahan      |
 +-----------------*/
```

### `NORMALIZE_AND_CASEFOLD`

```sql
NORMALIZE_AND_CASEFOLD(value[, normalization_mode])
```

**Description**

Takes a string value and returns it as a normalized string. If you don't
provide a normalization mode, `NFC` is used.

[Normalization](https://en.wikipedia.org/wiki/Unicode_equivalence#Normalization) is used to ensure that
two strings are equivalent. Normalization is often used in situations in which
two strings render the same on the screen but have different Unicode code
points.

[Case folding](https://en.wikipedia.org/wiki/Letter_case#Case_folding) is used for the caseless
comparison of strings. If you need to compare strings and case shouldn't be
considered, use `NORMALIZE_AND_CASEFOLD`, otherwise use
[`NORMALIZE`](#normalize).

`NORMALIZE_AND_CASEFOLD` supports four optional normalization modes:

| Value | Name | Description |
|---|---|---|
| `NFC` | Normalization Form Canonical Composition | Decomposes and recomposes characters by canonical equivalence. |
| `NFKC` | Normalization Form Compatibility Composition | Decomposes characters by compatibility, then recomposes them by canonical equivalence. |
| `NFD` | Normalization Form Canonical Decomposition | Decomposes characters by canonical equivalence, and multiple combining characters are arranged in a specific order. |
| `NFKD` | Normalization Form Compatibility Decomposition | Decomposes characters by compatibility, and multiple combining characters are arranged in a specific order. |

**Return type**

`STRING`

**Examples**

```sql
SELECT
  NORMALIZE('The red barn') = NORMALIZE('The Red Barn') AS normalized,
  NORMALIZE_AND_CASEFOLD('The red barn')
    = NORMALIZE_AND_CASEFOLD('The Red Barn') AS normalized_with_case_folding;

/*------------+------------------------------+
 | normalized | normalized_with_case_folding |
 +------------+------------------------------+
 | FALSE      | TRUE                         |
 +------------+------------------------------*/
```

```sql
SELECT
  '\u2168' AS a,
  'IX' AS b,
  NORMALIZE_AND_CASEFOLD('\u2168', NFD)=NORMALIZE_AND_CASEFOLD('IX', NFD) AS nfd,
  NORMALIZE_AND_CASEFOLD('\u2168', NFC)=NORMALIZE_AND_CASEFOLD('IX', NFC) AS nfc,
  NORMALIZE_AND_CASEFOLD('\u2168', NFKD)=NORMALIZE_AND_CASEFOLD('IX', NFKD) AS nfkd,
  NORMALIZE_AND_CASEFOLD('\u2168', NFKC)=NORMALIZE_AND_CASEFOLD('IX', NFKC) AS nfkc;

/*---+----+-------+-------+------+------+
 | a | b  | nfd   | nfc   | nfkd | nfkc |
 +---+----+-------+-------+------+------+
 | Ⅸ | IX | false | false | true | true |
 +---+----+-------+-------+------+------*/
```

```sql
SELECT
  '\u0041\u030A' AS a,
  '\u00C5' AS b,
  NORMALIZE_AND_CASEFOLD('\u0041\u030A', NFD)=NORMALIZE_AND_CASEFOLD('\u00C5', NFD) AS nfd,
  NORMALIZE_AND_CASEFOLD('\u0041\u030A', NFC)=NORMALIZE_AND_CASEFOLD('\u00C5', NFC) AS nfc,
  NORMALIZE_AND_CASEFOLD('\u0041\u030A', NFKD)=NORMALIZE_AND_CASEFOLD('\u00C5', NFKD) AS nkfd,
  NORMALIZE_AND_CASEFOLD('\u0041\u030A', NFKC)=NORMALIZE_AND_CASEFOLD('\u00C5', NFKC) AS nkfc;

/*---+----+-------+-------+------+------+
 | a | b  | nfd   | nfc   | nkfd | nkfc |
 +---+----+-------+-------+------+------+
 | Å | Å  | true  | true  | true | true |
 +---+----+-------+-------+------+------*/
```

### `OCTET_LENGTH`

```sql
OCTET_LENGTH(value)
```

Alias for [`BYTE_LENGTH`](#byte_length).

### `REGEXP_CONTAINS`

```sql
REGEXP_CONTAINS(value, regexp)
```

**Description**

Returns `TRUE` if `value` is a partial match for the regular expression,
`regexp`.

If the `regexp` argument is invalid, the function returns an error.

You can search for a full match by using `^` (beginning of text) and `$` (end of
text). Due to regular expression operator precedence, it's good practice to use
parentheses around everything between `^` and `$`.

> [!NOTE]
> **Note:** GoogleSQL provides regular expression support using the [re2](https://github.com/google/re2/wiki/Syntax) library; see that documentation for its regular expression syntax.

**Return type**

`BOOL`

**Examples**

The following queries check to see if an email is valid:

```sql
SELECT
  'foo@example.com' AS email,
  REGEXP_CONTAINS('foo@example.com', r'@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+') AS is_valid

/*-----------------+----------+
 | email           | is_valid |
 +-----------------+----------+
 | foo@example.com | TRUE     |
 +-----------------+----------*/
```

```sql
SELECT
  'www.example.net' AS email,
  REGEXP_CONTAINS('www.example.net', r'@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+') AS is_valid

/*-----------------+----------+
 | email           | is_valid |
 +-----------------+----------+
 | www.example.net | FALSE    |
 +-----------------+----------*/
```

The following queries check to see if an email is valid. They
perform a full match, using `^` and `$`. Due to regular expression operator
precedence, it's good practice to use parentheses around everything between `^`
and `$`.

```sql
SELECT
  'a@foo.com' AS email,
  REGEXP_CONTAINS('a@foo.com', r'^([\w.+-]+@foo\.com|[\w.+-]+@bar\.org)$') AS valid_email_address,
  REGEXP_CONTAINS('a@foo.com', r'^[\w.+-]+@foo\.com|[\w.+-]+@bar\.org$') AS without_parentheses;

/*----------------+---------------------+---------------------+
 | email          | valid_email_address | without_parentheses |
 +----------------+---------------------+---------------------+
 | a@foo.com      | true                | true                |
 +----------------+---------------------+---------------------*/
```

```sql
SELECT
  'a@foo.computer' AS email,
  REGEXP_CONTAINS('a@foo.computer', r'^([\w.+-]+@foo\.com|[\w.+-]+@bar\.org)$') AS valid_email_address,
  REGEXP_CONTAINS('a@foo.computer', r'^[\w.+-]+@foo\.com|[\w.+-]+@bar\.org$') AS without_parentheses;

/*----------------+---------------------+---------------------+
 | email          | valid_email_address | without_parentheses |
 +----------------+---------------------+---------------------+
 | a@foo.computer | false               | true                |
 +----------------+---------------------+---------------------*/
```

```sql
SELECT
  'b@bar.org' AS email,
  REGEXP_CONTAINS('b@bar.org', r'^([\w.+-]+@foo\.com|[\w.+-]+@bar\.org)$') AS valid_email_address,
  REGEXP_CONTAINS('b@bar.org', r'^[\w.+-]+@foo\.com|[\w.+-]+@bar\.org$') AS without_parentheses;

/*----------------+---------------------+---------------------+
 | email          | valid_email_address | without_parentheses |
 +----------------+---------------------+---------------------+
 | b@bar.org      | true                | true                |
 +----------------+---------------------+---------------------*/
```

```sql
SELECT
  '!b@bar.org' AS email,
  REGEXP_CONTAINS('!b@bar.org', r'^([\w.+-]+@foo\.com|[\w.+-]+@bar\.org)$') AS valid_email_address,
  REGEXP_CONTAINS('!b@bar.org', r'^[\w.+-]+@foo\.com|[\w.+-]+@bar\.org$') AS without_parentheses;

/*----------------+---------------------+---------------------+
 | email          | valid_email_address | without_parentheses |
 +----------------+---------------------+---------------------+
 | !b@bar.org     | false               | true                |
 +----------------+---------------------+---------------------*/
```

```sql
SELECT
  'c@buz.net' AS email,
  REGEXP_CONTAINS('c@buz.net', r'^([\w.+-]+@foo\.com|[\w.+-]+@bar\.org)$') AS valid_email_address,
  REGEXP_CONTAINS('c@buz.net', r'^[\w.+-]+@foo\.com|[\w.+-]+@bar\.org$') AS without_parentheses;

/*----------------+---------------------+---------------------+
 | email          | valid_email_address | without_parentheses |
 +----------------+---------------------+---------------------+
 | c@buz.net      | false               | false               |
 +----------------+---------------------+---------------------*/
```

### `REGEXP_EXTRACT`

```sql
REGEXP_EXTRACT(value, regexp[, position[, occurrence]])
```

**Description**

Returns the substring in `value` that matches the
[re2 regular expression](https://github.com/google/re2/wiki/Syntax), `regexp`.
Returns `NULL` if there is no match.

If the regular expression contains a capturing group (`(...)`), and there is a
match for that capturing group, that match is returned. If there
are multiple matches for a capturing group, the first match is returned.

To extract matches for multiple capturing groups in a single call, use
[`REGEXP_EXTRACT_GROUPS`](#regexp_extract_groups).

If `position` is specified, the search starts at this
position in `value`, otherwise it starts at the beginning of `value`. The
`position` must be a positive integer and can't be 0. If `position` is greater
than the length of `value`, `NULL` is returned.

If `occurrence` is specified, the search returns a specific occurrence of the
`regexp` in `value`, otherwise returns the first match. If `occurrence` is
greater than the number of matches found, `NULL` is returned. For
`occurrence` \> 1, the function searches for additional occurrences beginning
with the character following the previous occurrence.

Returns an error if:

- The regular expression is invalid
- The regular expression has more than one capturing group
- The `position` isn't a positive integer
- The `occurrence` isn't a positive integer

**Return type**

`STRING` or `BYTES`

**Examples**

```sql
SELECT REGEXP_EXTRACT('foo@example.com', r'^[a-zA-Z0-9_.+-]+') AS user_name

/*-----------+
 | user_name |
 +-----------+
 | foo       |
 +-----------*/
```

```sql
SELECT REGEXP_EXTRACT('foo@example.com', r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.([a-zA-Z0-9-.]+$)')

/*------------------+
 | top_level_domain |
 +------------------+
 | com              |
 +------------------*/
```

```sql
SELECT
  REGEXP_EXTRACT('ab', '.b') AS result_a,
  REGEXP_EXTRACT('ab', '(.)b') AS result_b,
  REGEXP_EXTRACT('xyztb', '(.)+b') AS result_c,
  REGEXP_EXTRACT('ab', '(z)?b') AS result_d

/*-------------------------------------------+
 | result_a | result_b | result_c | result_d |
 +-------------------------------------------+
 | ab       | a        | t        | NULL     |
 +-------------------------------------------*/
```

```sql
WITH example AS
(SELECT 'Hello Helloo and Hellooo' AS value, 'H?ello+' AS regex, 1 as position,
1 AS occurrence UNION ALL
SELECT 'Hello Helloo and Hellooo', 'H?ello+', 1, 2 UNION ALL
SELECT 'Hello Helloo and Hellooo', 'H?ello+', 1, 3 UNION ALL
SELECT 'Hello Helloo and Hellooo', 'H?ello+', 1, 4 UNION ALL
SELECT 'Hello Helloo and Hellooo', 'H?ello+', 2, 1 UNION ALL
SELECT 'Hello Helloo and Hellooo', 'H?ello+', 3, 1 UNION ALL
SELECT 'Hello Helloo and Hellooo', 'H?ello+', 3, 2 UNION ALL
SELECT 'Hello Helloo and Hellooo', 'H?ello+', 3, 3 UNION ALL
SELECT 'Hello Helloo and Hellooo', 'H?ello+', 20, 1 UNION ALL
SELECT 'cats&dogs&rabbits' ,'\\w+&', 1, 2 UNION ALL
SELECT 'cats&dogs&rabbits', '\\w+&', 2, 3
)
SELECT value, regex, position, occurrence, REGEXP_EXTRACT(value, regex,
position, occurrence) AS regexp_value FROM example;

/*--------------------------+---------+----------+------------+--------------+
 | value                    | regex   | position | occurrence | regexp_value |
 +--------------------------+---------+----------+------------+--------------+
 | Hello Helloo and Hellooo | H?ello+ | 1        | 1          | Hello        |
 | Hello Helloo and Hellooo | H?ello+ | 1        | 2          | Helloo       |
 | Hello Helloo and Hellooo | H?ello+ | 1        | 3          | Hellooo      |
 | Hello Helloo and Hellooo | H?ello+ | 1        | 4          | NULL         |
 | Hello Helloo and Hellooo | H?ello+ | 2        | 1          | ello         |
 | Hello Helloo and Hellooo | H?ello+ | 3        | 1          | Helloo       |
 | Hello Helloo and Hellooo | H?ello+ | 3        | 2          | Hellooo      |
 | Hello Helloo and Hellooo | H?ello+ | 3        | 3          | NULL         |
 | Hello Helloo and Hellooo | H?ello+ | 20       | 1          | NULL         |
 | cats&dogs&rabbits        | \w+&    | 1        | 2          | dogs&        |
 | cats&dogs&rabbits        | \w+&    | 2        | 3          | NULL         |
 +--------------------------+---------+----------+------------+--------------*/
```

### `REGEXP_EXTRACT_GROUPS`

```sql
REGEXP_EXTRACT_GROUPS(value, regexp)
```

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
> **Note:** To provide feedback or request support for this feature, send an email to [bigquery-sql-preview-support@googlegroups.com](mailto:bigquery-sql-preview-support@googlegroups.com).

**Description**

Returns a `STRUCT` where each field contains a substring from `value` that
matches a capturing group in the [re2 regular expression](https://github.com/google/re2/wiki/Syntax),
`regexp`. The function returns the substrings from the first place in `value`
where the *entire* `regexp` pattern matches.

**Details**

This function is similar to [`REGEXP_EXTRACT`](#regexp_extract), but it returns a
`STRUCT` with a field for each capturing group in the `regexp`.

The `regexp` must contain at least one capturing group. The fields in the
returned `STRUCT` correspond to these capturing groups:

- If a capturing group is named (for example, `(?<name>...)` or `(?P<name>...)`), the corresponding `STRUCT` field will have that name. Both syntaxes are equivalent.
- If a capturing group is unnamed, the corresponding `STRUCT` field is anonymous. These fields can be accessed by their 0-based position in the `STRUCT`.
- The order of fields in the `STRUCT` matches the order of the capturing groups in `regexp` from left to right.

Returns `NULL` if `value` is `NULL` or if the overall `regexp` pattern doesn't
match at all. If a specific capturing group doesn't match (for example, if it's
part of an alternation or is optional), the corresponding `STRUCT` field is
`NULL`.

Returns an error if:

- The `regexp` is invalid.
- The `regexp` is not a string literal.
- The `regexp` has no capturing groups.
- A capturing group name is not a valid `STRUCT` field name (for example, starts with a digit or contains spaces). Valid names consist of letters, numbers, and underscores, and must start with a letter or underscore.
- The same capturing group name is used more than once (case-insensitive).

**Return type**

`STRUCT<...>`

The fields of the `STRUCT` are generally `STRING` (or `BYTES` if the inputs are
`BYTES`). However, fields can be [auto-casted](#auto-casting) to other types.

**Examples**

Extract unnamed groups:

```sql
SELECT REGEXP_EXTRACT_GROUPS('abc123xyz', r'([a-z]+)([0-9]+)([a-z]+)') AS result

/*---------------------------------+
 | result                          |
 +---------------------------------+
 | {abc, 123, xyz}                 |
 +---------------------------------*/
```

Extract named groups:

```sql
SELECT REGEXP_EXTRACT_GROUPS('2025-09-10', r'(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})') AS result

/*----------------------------------------------+
 | result                                       |
 +----------------------------------------------+
 | {2025 year, 09 month, 10 day}                |
 +----------------------------------------------*/
```

**Expand STRUCT fields into columns**

Because `REGEXP_EXTRACT_GROUPS` returns a `STRUCT`, you can use the `.*` operator
in the `SELECT` list to expand the fields of the `STRUCT` into separate columns.
Expanding `STRUCT` fields into columns is particularly useful when all capturing
groups are named.

```sql
SELECT REGEXP_EXTRACT_GROUPS('PROD-WIDGET-1234', r'(?<env>\w+)-(?<product>\w+)-(?<id>\d+)').*

/*-------+-----------+------+
 | env   | product   | id   |
 +-------+-----------+------+
 | PROD  | WIDGET    | 1234 |
 +-------+-----------+------*/
```

Mix of named and unnamed groups:

```sql
SELECT REGEXP_EXTRACT_GROUPS('id:123', r'(?<key>[a-z]+):([0-9]+)') AS result

/*-----------------------+
 | result                |
 +-----------------------+
 | {id key, 123}         |
 +-----------------------*/
```

No match returns `NULL`:

```sql
SELECT REGEXP_EXTRACT_GROUPS('abc', r'(\d+)') AS result

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/
```

Optional groups and empty matches:

```sql
WITH inputs AS (
  SELECT 'id:123:extra' AS t UNION ALL
  SELECT 'id:123:' AS t UNION ALL
  SELECT 'id:123' AS t
)
SELECT
  t,
  REGEXP_EXTRACT_GROUPS(t, r'(?<key>\w+):(?<val>\w+)(?::(?<opt>\w*))?') AS result
FROM inputs;

/*-----------------+--------------------------------------+
 | t               | result                               |
 +-----------------+--------------------------------------+
 | id:123:extra    | {id key, 123 val, extra opt}         |
 | id:123:         | {id key, 123 val,  opt}              |
 | id:123          | {id key, 123 val, NULL opt}          |
 +-----------------+--------------------------------------*/
```

Note that in the second row, the optional group `opt` matches an empty string,
which is different from the third row where the group doesn't match at all and
results in `NULL`.

Nested groups:

```sql
SELECT REGEXP_EXTRACT_GROUPS('a=b=c', r'(\w+)=((\w+)=\w+)') AS result

/*-----------------------+
 | result                |
 +-----------------------+
 | {a, b=c, b}           |
 +-----------------------*/
```

Alternation with different groups:

```sql
WITH inputs AS (
  SELECT 'config_id=123' AS t UNION ALL
  SELECT 'option_name=ABC' AS t
)
SELECT
  t,
  REGEXP_EXTRACT_GROUPS(t, r'config_id=(?<id>\d+)|option_name=(?<name>\w+)') AS result
FROM inputs;

/*-----------------+--------------------------+
 | t               | result                   |
 +-----------------+--------------------------+
 | config_id=123   | {123 id, NULL name}      |
 | option_name=ABC | {NULL id, ABC name}      |
 +-----------------+--------------------------*/
```

The `STRUCT` result contains fields for all named capturing groups across all
alternatives in the regular expression. In each row, only the fields
corresponding to the alternative that matched are populated. Other fields are
`NULL`.

###### Auto-casting

You can automatically cast the captured substring to a specific type by
suffixing the capturing group name with a double underscore (`__`) followed by
the type name.

Any type that can be cast from `STRING` (or `BYTES` for the `BYTES` version
of the function) is supported. Type names are case-insensitive.

The field name in the resulting `STRUCT` will have the `__TYPE` suffix removed.

If the captured substring can't be cast to the specified type, an error is
returned. This includes casting an empty string to a numeric or boolean type.
If the captured substring is `NULL` (due to an optional group not matching), the
cast result is also `NULL`.

**Examples of auto-casting**

```sql
SELECT REGEXP_EXTRACT_GROUPS('val=0x1a', r'val=(?<val__INT64>0x[0-9a-fA-F]+)') AS result

/*-------------+
 | result      |
 +-------------+
 | {26 val}    |
 +-------------*/
```

Auto-casted values in expressions with Pipe syntax:

```sql
FROM UNNEST(['02:30:10', '01:02:03']) AS time_str
|> EXTEND REGEXP_EXTRACT_GROUPS(time_str, r'(?<h__INT64>\d{2}):(?<m__INT64>\d{2}):(?<s__INT64>\d{2})').*
|> SELECT time_str, h * 3600 + m * 60 + s AS total_seconds

/*----------+---------------+
 | time_str | total_seconds |
 +----------+---------------+
 | 02:30:10 | 9010          |
 | 01:02:03 | 3723          |
 +----------+---------------*/
```

Expand auto-casted fields into columns:

```sql
SELECT REGEXP_EXTRACT_GROUPS('2025-09-10', r'(?<year__INT64>\d{4})-(?<month__INT64>\d{2})-(?<day__INT64>\d{2})').*

/*--------+---------+-------+
 | year   | month   | day   |
 +--------+---------+-------+
 | 2025   | 9       | 10    |
 +--------+---------+-------*/
```

Cast failure:

```sql
-- Error: Bad INT64 value
SELECT REGEXP_EXTRACT_GROUPS('ID: ABC', r'ID: (?<item_id__INT64>\w+)')
```

Cast failure with empty string:

```sql
-- Error: Bad INT64 value
SELECT REGEXP_EXTRACT_GROUPS('ID: ', r'ID: (?<item_id__INT64>\d*)')
```

Workaround for empty string cast failure by making the group optional:

```sql
SELECT REGEXP_EXTRACT_GROUPS('ID: ', r'ID: (?<item_id__INT64>\d+)?') AS result

/*-----------------+
 | result          |
 +-----------------+
 | {NULL item_id}  |
 +-----------------*/
```

### `REGEXP_EXTRACT_ALL`

```sql
REGEXP_EXTRACT_ALL(value, regexp)
```

**Description**

Returns an array of all substrings of `value` that match the
[re2 regular expression](https://github.com/google/re2/wiki/Syntax), `regexp`. Returns an empty array
if there is no match.

If the regular expression contains a capturing group (`(...)`), the function
returns an array of substrings that are matched by the capturing group.

The `REGEXP_EXTRACT_ALL` function only returns non-overlapping matches. For
example, using this function to extract `ana` from `banana` returns only one
substring, not two.

When a capturing group is present, this non-overlapping rule applies to the
*entire substring* matched by the whole regular expression, not just the part
within the capturing group. The search for any subsequent match begins
*after* the end of the entire substring that satisfied the previous match. In
the examples that follow, the second example illustrates this behavior with the
pattern `r'\d(\d)\d'`.

Returns an error if:

- The regular expression is invalid
- The regular expression has more than one capturing group

**Return type**

`ARRAY<STRING>` or `ARRAY<BYTES>`

**Examples**

```sql
SELECT REGEXP_EXTRACT_ALL('Try `func(x)` or `func(y)`', '`(.+?)`') AS example

/*--------------------+
 | example            |
 +--------------------+
 | [func(x), func(y)] |
 +--------------------*/
```

The following example demonstrates non-overlapping matches with a capturing
group:

```sql
SELECT REGEXP_EXTRACT_ALL('123456', r'\d(\d)\d') AS example;

/*-----------+
 | example   |
 +-----------+
 | ['2', '5'] |
 +-----------*/
```

The pattern `r'\d(\d)\d'` matches `'123'` and captures `'2'`. The next
search starts after `'3'`, and then it matches `'456'` and captures `'5'`.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- The official page is split into 2 files at section boundaries; this is part 1.
- Corrected from the official docs: The result table has a column named `result`, but the select item has no alias. `AS result` is added, as in the neighboring examples.
- Corrected from the official docs: The result tables for the `Recipes` queries spell `Bluberry pancakes` and `Blueberry samon`, but the `WITH Recipes` setup on the same page defines `Blueberry pancakes` and `Blueberry salmon`. The result values are changed to match the setup, and the table borders are re-padded.
- Corrected from the official docs: The function list says `CODE_POINTS_TO_STRING` takes extended ASCII code points, but its description on this page says it takes Unicode code points and the example uses values such as 1024. The summary is changed to "Unicode".
- Corrected from the official docs: the precision row says integer values shorter than the precision are padded with trailing zeros. They are padded on the left: the GoogleSQL compliance tests (google/zetasql commit 762ca7a16f2b, `googlesql/compliance/functions_testlib_format_integral.cc`) expect `FORMAT('%.3d', 5)` to return `005` and `FORMAT('%.4X', 1)` to return `0001`, as in C `printf`. The text is changed to leading zeros.
- Corrected from the official docs: the precision row lists `%u`, `%a` and `%A`, which are not in the Format specifiers table on this page; the same section says an invalid format specifier produces an error. The three specifiers are removed from the row.
- Caution: the example writes non-ASCII characters directly inside a bytes literal (`b'абвгд'`). A bytes literal holds the UTF-8 bytes of its source text: the GoogleSQL parser accepts any bytes in a bytes literal and checks UTF-8 only in string literals (google/zetasql commit 762ca7a16f2b, `googlesql/parser/testdata/literals_structurally_invalid.test`, case "Structurally invalid bytes string is OK."), which matches the published result. `CAST('абвгд' AS BYTES)` produces the same value without depending on how the query text is encoded.

## Related

- [Index of this directory](./README.md)
- [String functions (part 2 of 2)](./string_functions-2.md)

---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions
---

# String functions (part 2 of 2)

## Signature / Usage

### `REGEXP_INSTR`

Adapted (not in the official docs): Moved the comma inside the brackets of the optional `occurrence_position`.

```sql
REGEXP_INSTR(source_value, regexp [, position[, occurrence[, occurrence_position]]])
```

**Description**

Returns the lowest 1-based position of a regular expression, `regexp`, in
`source_value`. `source_value` and `regexp` must be the same type, either
`STRING` or `BYTES`.

If `position` is specified, the search starts at this position in
`source_value`, otherwise it starts at `1`, which is the beginning of
`source_value`. `position` is of type `INT64` and must be positive.

If `occurrence` is specified, the search returns the position of a specific
instance of `regexp` in `source_value`. If not specified, `occurrence` defaults
to `1` and returns the position of the first occurrence. For `occurrence` \> 1,
the function searches for the next, non-overlapping occurrence.
`occurrence` is of type `INT64` and must be positive.

You can optionally use `occurrence_position` to specify where a position
in relation to an `occurrence` starts. Your choices are:

- `0`: Returns the start position of `occurrence`.
- `1`: Returns the end position of `occurrence` + `1`. If the end of the occurrence is at the end of `source_value`, `LENGTH(source_value) + 1` is returned.

Returns `0` if:

- No match is found.
- If `occurrence` is greater than the number of matches found.
- If `position` is greater than the length of `source_value`.
- The regular expression is empty.

Returns `NULL` if:

- `position` is `NULL`.
- `occurrence` is `NULL`.

Returns an error if:

- `position` is `0` or negative.
- `occurrence` is `0` or negative.
- `occurrence_position` is neither `0` nor `1`.
- The regular expression is invalid.
- The regular expression has more than one capturing group.

**Return type**

`INT64`

**Examples**

```sql
SELECT
  REGEXP_INSTR('ab@cd-ef',  '@[^-]*') AS instr_a,
  REGEXP_INSTR('ab@d-ef',   '@[^-]*') AS instr_b,
  REGEXP_INSTR('abc@cd-ef', '@[^-]*') AS instr_c,
  REGEXP_INSTR('abc-ef',    '@[^-]*') AS instr_d,

/*---------------------------------------+
 | instr_a | instr_b | instr_c | instr_d |
 +---------------------------------------+
 | 3       | 3       | 4       | 0       |
 +---------------------------------------*/
```

```sql
SELECT
  REGEXP_INSTR('a@cd-ef b@cd-ef', '@[^-]*', 1) AS instr_a,
  REGEXP_INSTR('a@cd-ef b@cd-ef', '@[^-]*', 2) AS instr_b,
  REGEXP_INSTR('a@cd-ef b@cd-ef', '@[^-]*', 3) AS instr_c,
  REGEXP_INSTR('a@cd-ef b@cd-ef', '@[^-]*', 4) AS instr_d,

/*---------------------------------------+
 | instr_a | instr_b | instr_c | instr_d |
 +---------------------------------------+
 | 2       | 2       | 10      | 10      |
 +---------------------------------------*/
```

```sql
SELECT
  REGEXP_INSTR('a@cd-ef b@cd-ef c@cd-ef', '@[^-]*', 1, 1) AS instr_a,
  REGEXP_INSTR('a@cd-ef b@cd-ef c@cd-ef', '@[^-]*', 1, 2) AS instr_b,
  REGEXP_INSTR('a@cd-ef b@cd-ef c@cd-ef', '@[^-]*', 1, 3) AS instr_c

/*-----------------------------+
 | instr_a | instr_b | instr_c |
 +-----------------------------+
 | 2       | 10      | 18      |
 +-----------------------------*/
```

```sql
SELECT
  REGEXP_INSTR('a@cd-ef', '@[^-]*', 1, 1, 0) AS instr_a,
  REGEXP_INSTR('a@cd-ef', '@[^-]*', 1, 1, 1) AS instr_b

/*-------------------+
 | instr_a | instr_b |
 +-------------------+
 | 2       | 5       |
 +-------------------*/
```

### `REGEXP_REPLACE`

```sql
REGEXP_REPLACE(value, regexp, replacement)
```

**Description**

Returns a `STRING` where all substrings of `value` that
match regular expression `regexp` are replaced with `replacement`.

You can use backslashed-escaped digits (\\1 to \\9) within the `replacement`
argument to insert text matching the corresponding parenthesized group in the
`regexp` pattern. Use \\0 to refer to the entire matching text.

To add a backslash in your regular expression, you must first escape it. For
example, `SELECT REGEXP_REPLACE('abc', 'b(.)', 'X\\1');` returns `aXc`. You can
also use [raw strings](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#string_and_bytes_literals) to remove one layer of
escaping, for example `SELECT REGEXP_REPLACE('abc', 'b(.)', r'X\1');`.

The `REGEXP_REPLACE` function only replaces non-overlapping matches. For
example, replacing `ana` within `banana` results in only one replacement, not
two.

If the `regexp` argument isn't a valid regular expression, this function
returns an error.

> [!NOTE]
> **Note:** GoogleSQL provides regular expression support using the [re2](https://github.com/google/re2/wiki/Syntax) library; see that documentation for its regular expression syntax.

**Return type**

`STRING` or `BYTES`

**Examples**

```sql
SELECT REGEXP_REPLACE('Jane Doe', r'^([\p{L}\x27-]+)\s+([\p{L}\x27-]+)$', r'\2, \1') AS formatted_name

/*----------------+
 | formatted_name |
 +----------------+
 | Doe, Jane      |
 +----------------*/
```

### `REGEXP_SUBSTR`

```sql
REGEXP_SUBSTR(value, regexp[, position[, occurrence]])
```

**Description**

Synonym for [REGEXP_EXTRACT](string_functions-1.md#regexp_extract).

**Return type**

`STRING` or `BYTES`

**Examples**

```sql
WITH example AS
(SELECT 'Hello World Helloo' AS value, 'H?ello+' AS regex, 1 AS position, 1 AS
occurrence
)
SELECT value, regex, position, occurrence, REGEXP_SUBSTR(value, regex,
position, occurrence) AS regexp_value FROM example;

/*--------------------+---------+----------+------------+--------------+
 | value              | regex   | position | occurrence | regexp_value |
 +--------------------+---------+----------+------------+--------------+
 | Hello World Helloo | H?ello+ | 1        | 1          | Hello        |
 +--------------------+---------+----------+------------+--------------*/
```

### `REPEAT`

```sql
REPEAT(original_value, repetitions)
```

**Description**

Returns a `STRING` or `BYTES` value that consists of `original_value`, repeated.
The `repetitions` parameter specifies the number of times to repeat
`original_value`. Returns `NULL` if either `original_value` or `repetitions`
are `NULL`.

This function returns an error if the `repetitions` value is negative.

**Return type**

`STRING` or `BYTES`

**Examples**

```sql
SELECT REPEAT('abc', 3) AS results

/*-----------+
 | results   |
 |-----------|
 | abcabcabc |
 +-----------*/
```

```sql
SELECT REPEAT('abc', NULL) AS results

/*---------+
 | results |
 |---------|
 | NULL    |
 +---------*/
```

```sql
SELECT REPEAT(NULL, 3) AS results

/*---------+
 | results |
 |---------|
 | NULL    |
 +---------*/
```

### `REPLACE`

```sql
REPLACE(original_value, from_pattern, to_pattern)
```

**Description**

Replaces all occurrences of `from_pattern` with `to_pattern` in
`original_value`. If `from_pattern` is empty, no replacement is made.

This function supports specifying [collation](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/collation-concepts).

**Return type**

`STRING` or `BYTES`

**Examples**

```sql
WITH desserts AS
  (SELECT 'apple pie' as dessert
  UNION ALL
  SELECT 'blackberry pie' as dessert
  UNION ALL
  SELECT 'cherry pie' as dessert)

SELECT
  REPLACE (dessert, 'pie', 'cobbler') as example
FROM desserts;

/*--------------------+
 | example            |
 +--------------------+
 | apple cobbler      |
 | blackberry cobbler |
 | cherry cobbler     |
 +--------------------*/
```

### `REVERSE`

```sql
REVERSE(value)
```

**Description**

Returns the reverse of the input `STRING` or `BYTES`.

**Return type**

`STRING` or `BYTES`

**Examples**

```sql
SELECT REVERSE('abc') AS results

/*---------+
 | results |
 +---------+
 | cba     |
 +---------*/
```

```sql
SELECT FORMAT('%T', REVERSE(b'1a3')) AS results

/*---------+
 | results |
 +---------+
 | b"3a1"  |
 +---------*/
```

### `RIGHT`

```sql
RIGHT(value, length)
```

**Description**

Returns a `STRING` or `BYTES` value that consists of the specified
number of rightmost characters or bytes from `value`. The `length` is an
`INT64` that specifies the length of the returned
value. If `value` is `BYTES`, `length` is the number of rightmost bytes to
return. If `value` is `STRING`, `length` is the number of rightmost characters
to return.

If `length` is 0, an empty `STRING` or `BYTES` value will be
returned. If `length` is negative, an error will be returned. If `length`
exceeds the number of characters or bytes from `value`, the original `value`
will be returned.

**Return type**

`STRING` or `BYTES`

**Examples**

```sql
SELECT 'apple' AS example, RIGHT('apple', 3) AS right_example

/*---------+---------------+
 | example | right_example |
 +---------+---------------+
 | apple   | ple           |
 +---------+---------------*/
```

```sql
SELECT b'apple' AS example, RIGHT(b'apple', 3) AS right_example

-- Note that the result of RIGHT is of type BYTES, displayed as a base64-encoded string.
/*----------+---------------+
 | example  | right_example |
 +----------+---------------+
 | YXBwbGU= | cGxl          |
 +----------+---------------*/
```

### `RPAD`

```sql
RPAD(original_value, return_length[, pattern])
```

**Description**

Returns a `STRING` or `BYTES` value that consists of `original_value` appended
with `pattern`. The `return_length` parameter is an
`INT64` that specifies the length of the
returned value. If `original_value` is `BYTES`,
`return_length` is the number of bytes. If `original_value` is `STRING`,
`return_length` is the number of characters.

The default value of `pattern` is a blank space.

Both `original_value` and `pattern` must be the same data type.

If `return_length` is less than or equal to the `original_value` length, this
function returns the `original_value` value, truncated to the value of
`return_length`. For example, `RPAD('hello world', 7);` returns `'hello w'`.

If `original_value`, `return_length`, or `pattern` is `NULL`, this function
returns `NULL`.

This function returns an error if:

- `return_length` is negative
- `pattern` is empty

**Return type**

`STRING` or `BYTES`

**Examples**

```sql
SELECT FORMAT('%T', RPAD('c', 5)) AS results

/*---------+
 | results |
 +---------+
 | "c    " |
 +---------*/
```

```sql
SELECT RPAD('b', 5, 'a') AS results

/*---------+
 | results |
 +---------+
 | baaaa   |
 +---------*/
```

```sql
SELECT RPAD('abc', 10, 'ghd') AS results

/*------------+
 | results    |
 +------------+
 | abcghdghdg |
 +------------*/
```

```sql
SELECT RPAD('abc', 2, 'd') AS results

/*---------+
 | results |
 +---------+
 | ab      |
 +---------*/
```

```sql
SELECT FORMAT('%T', RPAD(b'abc', 10, b'ghd')) AS results

/*---------------+
 | results       |
 +---------------+
 | b"abcghdghdg" |
 +---------------*/
```

### `RTRIM`

```sql
RTRIM(value1[, value2])
```

**Description**

Identical to [TRIM](#trim), but only removes trailing characters.

**Return type**

`STRING` or `BYTES`

**Examples**

```sql
SELECT RTRIM('***apple***', '*') AS example

/*-----------+
 | example   |
 +-----------+
 | ***apple  |
 +-----------*/
```

```sql
SELECT RTRIM('applexxz', 'xyz') AS example

/*---------+
 | example |
 +---------+
 | apple   |
 +---------*/
```

### `SAFE_CONVERT_BYTES_TO_STRING`

```sql
SAFE_CONVERT_BYTES_TO_STRING(value)
```

**Description**

Converts a sequence of `BYTES` to a `STRING`. Any invalid UTF-8 characters are
replaced with the Unicode replacement character, `U+FFFD`.

**Return type**

`STRING`

**Examples**

The following statement returns the Unicode replacement character, �.

```sql
SELECT SAFE_CONVERT_BYTES_TO_STRING(b'\xc2') as safe_convert;
```

### `SOUNDEX`

```sql
SOUNDEX(value)
```

**Description**

Returns a `STRING` that represents the
[Soundex](https://en.wikipedia.org/wiki/Soundex) code for `value`.

SOUNDEX produces a phonetic representation of a string. It indexes words by
sound, as pronounced in English. It's typically used to help determine whether
two strings, such as the family names *Levine* and *Lavine* , or the words *to*
and *too*, have similar English-language pronunciation.

The result of the SOUNDEX consists of a letter followed by 3 digits. Non-latin
characters are ignored. If the remaining string is empty after removing
non-Latin characters, an empty `STRING` is returned.

**Return type**

`STRING`

**Examples**

```sql
SELECT 'Ashcraft' AS value, SOUNDEX('Ashcraft') AS soundex

/*----------------------+---------+
 | value                | soundex |
 +----------------------+---------+
 | Ashcraft             | A261    |
 +----------------------+---------*/
```

### `SPLIT`

```sql
SPLIT(value[, delimiter])
```

**Description**

Splits a `STRING` or `BYTES` value, using a delimiter. The `delimiter` argument
must be a literal character or sequence of characters. You can't split with a
regular expression.

For `STRING`, the default delimiter is the comma `,`.

For `BYTES`, you must specify a delimiter.

Splitting on an empty delimiter produces an array of UTF-8 characters for
`STRING` values, and an array of `BYTES` for `BYTES` values.

Splitting an empty `STRING` returns an
`ARRAY` with a single empty
`STRING`.

This function supports specifying [collation](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/collation-concepts).

**Return type**

`ARRAY<STRING>` or `ARRAY<BYTES>`

**Examples**

```sql
WITH letters AS
  (SELECT '' as letter_group
  UNION ALL
  SELECT 'a' as letter_group
  UNION ALL
  SELECT 'b c d' as letter_group)

SELECT SPLIT(letter_group, ' ') as example
FROM letters;

/*----------------------+
 | example              |
 +----------------------+
 | []                   |
 | [a]                  |
 | [b, c, d]            |
 +----------------------*/
```

### `STARTS_WITH`

```sql
STARTS_WITH(value, prefix)
```

**Description**

Takes two `STRING` or `BYTES` values. Returns `TRUE` if `prefix` is a
prefix of `value`.

This function supports specifying [collation](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/collation-concepts).

**Return type**

`BOOL`

**Examples**

```sql
SELECT STARTS_WITH('bar', 'b') AS example

/*---------+
 | example |
 +---------+
 |    True |
 +---------*/
```

### `STRPOS`

```sql
STRPOS(value, subvalue)
```

**Description**

Takes two `STRING` or `BYTES` values. Returns the 1-based position of the first
occurrence of `subvalue` inside `value`. Returns `0` if `subvalue` isn't found.

This function supports specifying [collation](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/collation-concepts).

**Return type**

`INT64`

**Examples**

```sql
SELECT STRPOS('foo@example.com', '@') AS example

/*---------+
 | example |
 +---------+
 |       4 |
 +---------*/
```

### `SUBSTR`

```sql
SUBSTR(value, position[, length])
```

**Description**

Gets a portion (substring) of the supplied `STRING` or `BYTES` value.

The `position` argument is an integer specifying the starting position of the
substring.

- If `position` is `1`, the substring starts from the first character or byte.
- If `position` is `0` or less than `-LENGTH(value)`, `position` is set to `1`, and the substring starts from the first character or byte.
- If `position` is greater than the length of `value`, the function produces an empty substring.
- If `position` is negative, the function counts from the end of `value`, with `-1` indicating the last character or byte.

The `length` argument specifies the maximum number of characters or bytes to
return.

- If `length` isn't specified, the function produces a substring that starts at the specified position and ends at the last character or byte of `value`.
- If `length` is `0`, the function produces an empty substring.
- If `length` is negative, the function produces an error.
- The returned substring may be shorter than `length`, for example, when `length` exceeds the length of `value`, or when the starting position of the substring plus `length` is greater than the length of `value`.

**Return type**

`STRING` or `BYTES`

**Examples**

```sql
SELECT SUBSTR('apple', 2) AS example

/*---------+
 | example |
 +---------+
 | pple    |
 +---------*/
```

```sql
SELECT SUBSTR('apple', 2, 2) AS example

/*---------+
 | example |
 +---------+
 | pp      |
 +---------*/
```

```sql
SELECT SUBSTR('apple', -2) AS example

/*---------+
 | example |
 +---------+
 | le      |
 +---------*/
```

```sql
SELECT SUBSTR('apple', 1, 123) AS example

/*---------+
 | example |
 +---------+
 | apple   |
 +---------*/
```

```sql
SELECT SUBSTR('apple', 123) AS example

/*---------+
 | example |
 +---------+
 |         |
 +---------*/
```

```sql
SELECT SUBSTR('apple', 123, 5) AS example

/*---------+
 | example |
 +---------+
 |         |
 +---------*/
```

### `SUBSTRING`

```sql
SUBSTRING(value, position[, length])
```

Alias for [`SUBSTR`](#substr).

### `TO_BASE32`

```sql
TO_BASE32(bytes_expr)
```

**Description**

Converts a sequence of `BYTES` into a base32-encoded `STRING`. To convert a
base32-encoded `STRING` into `BYTES`, use [FROM_BASE32](string_functions-1.md#from_base32).

**Return type**

`STRING`

**Example**

```sql
SELECT TO_BASE32(b'abcde\xFF') AS base32_string;

/*------------------+
 | base32_string    |
 +------------------+
 | MFRGGZDF74====== |
 +------------------*/
```

### `TO_BASE64`

```sql
TO_BASE64(bytes_expr)
```

**Description**

Converts a sequence of `BYTES` into a base64-encoded `STRING`. To convert a
base64-encoded `STRING` into `BYTES`, use [FROM_BASE64](string_functions-1.md#from_base64).

There are several base64 encodings in common use that vary in exactly which
alphabet of 65 ASCII characters are used to encode the 64 digits and padding.
See [RFC 4648](https://tools.ietf.org/html/rfc4648#section-4) for details. This
function adds padding and uses the alphabet `[A-Za-z0-9+/=]`.

**Return type**

`STRING`

**Example**

```sql
SELECT TO_BASE64(b'\377\340') AS base64_string;

/*---------------+
 | base64_string |
 +---------------+
 | /+A=          |
 +---------------*/
```

To work with an encoding using a different base64 alphabet, you might need to
compose `TO_BASE64` with the `REPLACE` function. For instance, the
`base64url` url-safe and filename-safe encoding commonly used in web programming
uses `-_=` as the last characters rather than `+/=`. To encode a
`base64url`-encoded string, replace `+` and `/` with `-` and `_` respectively.

```sql
SELECT REPLACE(REPLACE(TO_BASE64(b'\377\340'), '+', '-'), '/', '_') as websafe_base64;

/*----------------+
 | websafe_base64 |
 +----------------+
 | _-A=           |
 +----------------*/
```

### `TO_CODE_POINTS`

```sql
TO_CODE_POINTS(value)
```

**Description**

Takes a `STRING` or `BYTES` value and returns an array of `INT64` values that
represent code points or extended ASCII character values.

- If `value` is a `STRING`, each element in the returned array represents a [code point](https://en.wikipedia.org/wiki/Code_point). Each code point falls within the range of \[0, 0xD7FF\] and \[0xE000, 0x10FFFF\].
- If `value` is `BYTES`, each element in the array is an extended ASCII character value in the range of \[0, 255\].

To convert from an array of code points to a `STRING` or `BYTES`, see
[CODE_POINTS_TO_STRING](string_functions-1.md#code_points_to_string) or
[CODE_POINTS_TO_BYTES](string_functions-1.md#code_points_to_bytes).

**Return type**

`ARRAY<INT64>`

**Examples**

The following examples get the code points for each element in an array of
words.

```sql
SELECT
  'foo' AS word,
  TO_CODE_POINTS('foo') AS code_points

/*---------+------------------------------------+
 | word    | code_points                        |
 +---------+------------------------------------+
 | foo     | [102, 111, 111]                    |
 +---------+------------------------------------*/
```

```sql
SELECT
  'bar' AS word,
  TO_CODE_POINTS('bar') AS code_points

/*---------+------------------------------------+
 | word    | code_points                        |
 +---------+------------------------------------+
 | bar     | [98, 97, 114]                      |
 +---------+------------------------------------*/
```

```sql
SELECT
  'baz' AS word,
  TO_CODE_POINTS('baz') AS code_points

/*---------+------------------------------------+
 | word    | code_points                        |
 +---------+------------------------------------+
 | baz     | [98, 97, 122]                      |
 +---------+------------------------------------*/
```

```sql
SELECT
  'giraffe' AS word,
  TO_CODE_POINTS('giraffe') AS code_points

/*---------+------------------------------------+
 | word    | code_points                        |
 +---------+------------------------------------+
 | giraffe | [103, 105, 114, 97, 102, 102, 101] |
 +---------+------------------------------------*/
```

```sql
SELECT
  'llama' AS word,
  TO_CODE_POINTS('llama') AS code_points

/*---------+------------------------------------+
 | word    | code_points                        |
 +---------+------------------------------------+
 | llama   | [108, 108, 97, 109, 97]            |
 +---------+------------------------------------*/
```

The following examples convert integer representations of `BYTES` to their
corresponding ASCII character values.

```sql
SELECT
  b'\x66\x6f\x6f' AS bytes_value,
  TO_CODE_POINTS(b'\x66\x6f\x6f') AS bytes_value_as_integer

/*------------------+------------------------+
 | bytes_value      | bytes_value_as_integer |
 +------------------+------------------------+
 | foo              | [102, 111, 111]        |
 +------------------+------------------------*/
```

```sql
SELECT
  b'\x00\x01\x10\xff' AS bytes_value,
  TO_CODE_POINTS(b'\x00\x01\x10\xff') AS bytes_value_as_integer

/*------------------+------------------------+
 | bytes_value      | bytes_value_as_integer |
 +------------------+------------------------+
 | \x00\x01\x10\xff | [0, 1, 16, 255]        |
 +------------------+------------------------*/
```

The following example demonstrates the difference between a `BYTES` result and a
`STRING` result. Notice that the character `Ā` is represented as a two-byte
Unicode sequence. As a result, the `BYTES` version of `TO_CODE_POINTS` returns
an array with two elements, while the `STRING` version returns an array with a
single element.

```sql
SELECT TO_CODE_POINTS(b'Ā') AS b_result, TO_CODE_POINTS('Ā') AS s_result;

/*------------+----------+
 | b_result   | s_result |
 +------------+----------+
 | [196, 128] | [256]    |
 +------------+----------*/
```

### `TO_HEX`

```sql
TO_HEX(bytes)
```

**Description**

Converts a sequence of `BYTES` into a hexadecimal `STRING`. Converts each byte
in the `STRING` as two hexadecimal characters in the range
`(0..9, a..f)`. To convert a hexadecimal-encoded
`STRING` to `BYTES`, use [FROM_HEX](string_functions-1.md#from_hex).

**Return type**

`STRING`

**Example**

```sql
SELECT
  b'\x00\x01\x02\x03\xAA\xEE\xEF\xFF' AS byte_string,
  TO_HEX(b'\x00\x01\x02\x03\xAA\xEE\xEF\xFF') AS hex_string

/*----------------------------------+------------------+
 | byte_string                      | hex_string       |
 +----------------------------------+------------------+
 | \x00\x01\x02\x03\xaa\xee\xef\xff | 00010203aaeeefff |
 +----------------------------------+------------------*/
```

### `TRANSLATE`

```sql
TRANSLATE(expression, source_characters, target_characters)
```

**Description**

In `expression`, replaces each character in `source_characters` with the
corresponding character in `target_characters`. All inputs must be the same
type, either `STRING` or `BYTES`.

- Each character in `expression` is translated at most once.
- A character in `expression` that isn't present in `source_characters` is left unchanged in `expression`.
- A character in `source_characters` without a corresponding character in `target_characters` is omitted from the result.
- A duplicate character in `source_characters` results in an error.

**Return type**

`STRING` or `BYTES`

**Examples**

```sql
SELECT TRANSLATE('This is a cookie', 'sco', 'zku') AS translate

/*------------------+
 | translate        |
 +------------------+
 | Thiz iz a kuukie |
 +------------------*/
```

### `TRIM`

```sql
TRIM(value_to_trim[, set_of_characters_to_remove])
```

**Description**

Takes a `STRING` or `BYTES` value to trim.

If the value to trim is a `STRING`, removes from this value all leading and
trailing Unicode code points in `set_of_characters_to_remove`.
The set of code points is optional. If it isn't specified, all
whitespace characters are removed from the beginning and end of the
value to trim.

If the value to trim is `BYTES`, removes from this value all leading and
trailing bytes in `set_of_characters_to_remove`. The set of bytes is required.

**Return type**

- `STRING` if `value_to_trim` is a `STRING` value.
- `BYTES` if `value_to_trim` is a `BYTES` value.

**Examples**

In the following example, all leading and trailing whitespace characters are
removed from `item` because `set_of_characters_to_remove` isn't specified.

```sql
SELECT CONCAT('#', TRIM( '   apple   '), '#') AS example

/*----------+
 | example  |
 +----------+
 | #apple#  |
 +----------*/
```

In the following example, all leading and trailing `*` characters are removed
from '***apple***'.

```sql
SELECT TRIM('***apple***', '*') AS example

/*---------+
 | example |
 +---------+
 | apple   |
 +---------*/
```

In the following example, all leading and trailing `x`, `y`, and `z` characters
are removed from 'xzxapplexxy'.

```sql
SELECT TRIM('xzxapplexxy', 'xyz') as example

/*---------+
 | example |
 +---------+
 | apple   |
 +---------*/
```

In the following example, examine how `TRIM` interprets characters as
Unicode code-points. If your trailing character set contains a combining
diacritic mark over a particular letter, `TRIM` might strip the
same diacritic mark from a different letter.

Adapted (not in the official docs): kept the combining ring above (U+030A) after the leading `Ū` in the result of column `d`.

```sql
SELECT
  TRIM('abaW̊', 'Y̊') AS a,
  TRIM('W̊aba', 'Y̊') AS b,
  TRIM('abaŪ̊', 'Y̊') AS c,
  TRIM('Ū̊aba', 'Y̊') AS d

/*------+------+------+------+
 | a    | b    | c    | d    |
 +------+------+------+------+
 | abaW | W̊aba | abaŪ | Ū̊aba |
 +------+------+------+------*/
```

In the following example, all leading and trailing `b'n'`, `b'a'`, `b'\xab'`
bytes are removed from `item`.

Adapted (not in the official docs): Added the missing `AS item` alias to the first select item.

```sql
SELECT b'apple' AS item, TRIM(b'apple', b'na\xab') AS example

-- Note that the result of TRIM is of type BYTES, displayed as a base64-encoded string.
/*----------------------+------------------+
 | item                 | example          |
 +----------------------+------------------+
 | YXBwbGU=             | cHBsZQ==         |
 +----------------------+------------------*/
```

### `UNICODE`

```sql
UNICODE(value)
```

**Description**

Returns the Unicode [code point](https://en.wikipedia.org/wiki/Code_point) for the first character in
`value`. Returns `0` if `value` is empty, or if the resulting Unicode code
point is `0`.

**Return type**

`INT64`

**Examples**

```sql
SELECT UNICODE('âbcd') as A, UNICODE('â') as B, UNICODE('') as C, UNICODE(NULL) as D;

/*-------+-------+-------+-------+
 | A     | B     | C     | D     |
 +-------+-------+-------+-------+
 | 226   | 226   | 0     | NULL  |
 +-------+-------+-------+-------*/
```

### `UPPER`

```sql
UPPER(value)
```

**Description**

For `STRING` arguments, returns the original string with all alphabetic
characters in uppercase. Mapping between uppercase and lowercase is done
according to the
[Unicode Character Database](http://unicode.org/ucd/)
without taking into account language-specific mappings.

For `BYTES` arguments, the argument is treated as ASCII text, with all bytes
greater than 127 left intact.

**Return type**

`STRING` or `BYTES`

**Examples**

```sql
SELECT UPPER('foo') AS example

/*---------+
 | example |
 +---------+
 | FOO     |
 +---------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- The official page is split into 2 files at section boundaries; this is part 2.
- Corrected from the official docs: The syntax writes `occurrence, [occurrence_position]`, which leaves a trailing comma when `occurrence_position` is omitted. The comma is moved inside the brackets, matching the examples on this page that pass `occurrence, occurrence_position` as plain arguments.
- Corrected from the official docs: The first select item has no alias, but the text and the result table header call that column `item`. `AS item` is added.
- Corrected from the official docs: in the combining-mark `TRIM` example, column `d` trims `'Ū̊aba'` (U+016A, then U+030A, then `aba`) with the set `'Y̊'`. The first character `Ū` is not in the set, so nothing is removed from the start, and the last character `a` is not in the set either; the published result `Ūaba` drops the U+030A inside the string. Column `b` of the same example keeps the ring in `W̊aba` for the same reason. The result is changed to `Ū̊aba`.
- Caution: the example writes non-ASCII characters directly inside a bytes literal (`b'Ā'`). A bytes literal holds the UTF-8 bytes of its source text: the GoogleSQL parser accepts any bytes in a bytes literal and checks UTF-8 only in string literals (google/zetasql commit 762ca7a16f2b, `googlesql/parser/testdata/literals_structurally_invalid.test`, case "Structurally invalid bytes string is OK."), which matches the published result. `CAST('Ā' AS BYTES)` produces the same value without depending on how the query text is encoded.

## Related

- [Index of this directory](./README.md)
- [String functions (part 1 of 2)](./string_functions-1.md)

---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bit_functions
---

# Bit functions

## Signature / Usage

GoogleSQL for BigQuery supports the following bit functions.

### Function list

| Name | Summary |
|---|---|
| [`BIT_AND`](aggregate_functions.md#bit_and) | Performs a bitwise AND operation on an expression. For more information, see [Aggregate functions](aggregate_functions.md). |
| [`BIT_COUNT`](#bit_count) | Gets the number of bits that are set in an input expression. |
| [`BIT_OR`](aggregate_functions.md#bit_or) | Performs a bitwise OR operation on an expression. For more information, see [Aggregate functions](aggregate_functions.md). |
| [`BIT_XOR`](aggregate_functions.md#bit_xor) | Performs a bitwise XOR operation on an expression. For more information, see [Aggregate functions](aggregate_functions.md). |

### `BIT_COUNT`

```sql
BIT_COUNT(expression)
```

**Description**

The input, `expression`, must be an
integer or `BYTES`.

Returns the number of bits that are set in the input `expression`.
For signed integers, this is the number of bits in two's complement form.

**Return Data Type**

`INT64`

**Example**

```sql
SELECT a, BIT_COUNT(a) AS a_bits, FORMAT("%T", b) as b, BIT_COUNT(b) AS b_bits
FROM UNNEST([
  STRUCT(0 AS a, b'' AS b), (0, b'\x00'), (5, b'\x05'), (8, b'\x00\x08'),
  (0xFFFF, b'\xFF\xFF'), (-2, b'\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFE'),
  (-1, b'\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF'),
  (NULL, b'\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF')
]) AS x;

/*-------+--------+---------------------------------------------+--------+
 | a     | a_bits | b                                           | b_bits |
 +-------+--------+---------------------------------------------+--------+
 | 0     | 0      | b""                                         | 0      |
 | 0     | 0      | b"\x00"                                     | 0      |
 | 5     | 2      | b"\x05"                                     | 2      |
 | 8     | 1      | b"\x00\x08"                                 | 1      |
 | 65535 | 16     | b"\xff\xff"                                 | 16     |
 | -2    | 63     | b"\xff\xff\xff\xff\xff\xff\xff\xfe"         | 63     |
 | -1    | 64     | b"\xff\xff\xff\xff\xff\xff\xff\xff"         | 64     |
 | NULL  | NULL   | b"\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff" | 80     |
 +-------+--------+---------------------------------------------+--------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bit_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

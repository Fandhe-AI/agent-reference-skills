---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/utility-functions
---

# Utility functions

## Signature / Usage

GoogleSQL for BigQuery supports the following utility functions.

### Function list

| Name | Summary |
|---|---|
| [`GENERATE_UUID`](#generate_uuid) | Produces a random universally unique identifier (UUID) as a `STRING` value. |
| [`TYPEOF`](#typeof) | Gets the name of the data type for an expression. |

### `GENERATE_UUID`

```sql
GENERATE_UUID()
```

**Description**

Returns a random universally unique identifier (UUID) as a `STRING`.
The returned `STRING` consists of 32 hexadecimal
digits in five groups separated by hyphens in the form 8-4-4-4-12. The
hexadecimal digits represent 122 random bits and 6 fixed bits, in compliance
with [RFC 4122 section 4.4](https://tools.ietf.org/html/rfc4122#section-4.4).
The returned `STRING` is lowercase.

**Return Data Type**

STRING

**Example**

The following query generates a random UUID.

```sql
SELECT GENERATE_UUID() AS uuid;

/*--------------------------------------+
 | uuid                                 |
 +--------------------------------------+
 | 4192bff0-e1e0-43ce-a4db-912808c32493 |
 +--------------------------------------*/
```

### `TYPEOF`

```sql
TYPEOF(expression)
```

**Description**

Takes an expression and gets the name of the data type for that
expression.

**Return type**

`STRING`

**Examples**

The following example produces the name of the data type for the expression
passed into the `TYPEOF` function. When `NULL` is passed in, the
[supertype](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_rules#supertypes), `INT64`, is produced.

```sql
SELECT
  TYPEOF(NULL) AS A,
  TYPEOF('hello') AS B,
  TYPEOF(12+1) AS C,
  TYPEOF(4.7) AS D

/*-------+--------+-------+--------+
 | A     | B      | C     | D      |
 +-------+--------+-------+--------+
 | INT64 | STRING | INT64 | FLOAT64 |
 +-------+--------+-------+--------*/
```

The following example produces the name of the data type for field `y` in a
struct.

```sql
SELECT
  TYPEOF(STRUCT<x INT64, y STRING>(25, 'apples')) AS struct_type,
  TYPEOF(STRUCT<x INT64, y STRING>(25, 'apples').y) AS field_type;

/*---------------------------+------------+
 | struct_type               | field_type |
 +---------------------------+------------+
 | STRUCT<x INT64, y STRING> | STRING     |
 +---------------------------+------------*/
```

The following example produces the name of the data type for elements in an
array.

```sql
SELECT
  TYPEOF(ARRAY<INT64>[25, 32]) AS array_type,
  TYPEOF(ARRAY<INT64>[25, 32][0]) AS element_type;

/*--------------+--------------+
 | array_type   | element_type |
 +--------------+--------------+
 | ARRAY<INT64> | INT64        |
 +--------------+--------------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/utility-functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

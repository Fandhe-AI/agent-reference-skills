---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/debugging-statements
---

# Debugging statements

## Signature / Usage

GoogleSQL for BigQuery supports the following debugging statements.

### `ASSERT`

```text
ASSERT expression [AS description]
```

**Description**

Evaluates `expression`.

If `expression` evaluates to `TRUE`, the statement returns successfully
without any result.

If `expression` evaluates to `FALSE` or `NULL`, the statement generates an
error. If `AS description` is present, `description` will appear in the error
message.

`expression` must evaluate to a `BOOL`.

`description` must be a `STRING` literal.

An `ASSERT` statement is billed in the same way as the query
`SELECT expression`, except that the result of an `ASSERT` statement is never
cached.

**Examples**

The following examples assert that the data source contains more than a specific
number of rows.

```sql
-- This query succeeds and no error is produced.
ASSERT (
  (SELECT COUNT(*) > 5 FROM UNNEST([1, 2, 3, 4, 5, 6]))
) AS 'Table must contain more than 5 rows.';
```

```sql
-- Error: Table must contain more than 10 rows.
ASSERT (
  (SELECT COUNT(*) > 10 FROM UNNEST([1, 2, 3, 4, 5, 6]))
) AS 'Table must contain more than 10 rows.';
```

The following examples assert that the data source contains a particular value.

```sql
-- This query succeeds and no error is produced.
ASSERT
  EXISTS(
    (SELECT X FROM UNNEST([7877, 7879, 7883, 7901, 7907]) AS X WHERE X = 7907))
AS 'Column X must contain the value 7907.';
```

```sql
-- Error: Column X must contain the value 7919.
ASSERT
  EXISTS(
    (SELECT X FROM UNNEST([7877, 7879, 7883, 7901, 7907]) AS X WHERE X = 7919))
AS 'Column X must contain the value 7919';
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/debugging-statements (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

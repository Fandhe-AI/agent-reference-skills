---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-hash-bucketize
---

# The ML.HASH_BUCKETIZE function

## Signature / Usage

This document describes the `ML.HASH_BUCKETIZE` function, which lets you
convert a string expression to a deterministic hash and then bucketize it by the
modulo value of that hash.

You can use this function with models that support
[manual feature preprocessing](https://docs.cloud.google.com/bigquery/docs/manual-preprocessing). For more
information, see the following documents:

- [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey)
- [Contribution analysis user journey](https://docs.cloud.google.com/bigquery/docs/contribution-analysis#contribution_analysis_user_journey)

### Syntax

```sql
ML.HASH_BUCKETIZE(string_expression, hash_bucket_size)
```

#### Arguments

`ML.HASH_BUCKETIZE` takes the following arguments:

- `string_expression`: the `STRING` expression to bucketize.
- `hash_bucket_size`: an `INT64` value that specifies the number of buckets to create. This value must be greater than or equal to `0`. If `hash_bucket_size` equals `0`, the function only hashes the string without bucketizing the hashed value.

### Output

`ML.HASH_BUCKETIZE` returns an `INT64` value that identifies the bucket.

### Example

The following example bucketizes string expressions into three buckets:

```sql
SELECT
  f, ML.HASH_BUCKETIZE(f, 3) AS bucket
FROM UNNEST(['a', 'b', 'c', 'd']) AS f;
```

The output looks similar to the following:

```text
+---+--------+
| f | bucket |
+---+--------+
| a |   0    |
+---+--------+
| b |   1    |
+---+--------+
| c |   1    |
+---+--------+
| d |   2    |
+------------+
```

### What's next

- For information about feature preprocessing, see [Feature preprocessing overview](https://docs.cloud.google.com/bigquery/docs/preprocess-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-hash-bucketize (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

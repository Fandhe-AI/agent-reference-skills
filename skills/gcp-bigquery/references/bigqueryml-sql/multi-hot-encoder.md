---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-multi-hot-encoder
---

# The ML.MULTI_HOT_ENCODER function

## Signature / Usage

This document describes the `ML.MULTI_HOT_ENCODER` function, which lets you
encode a string array expression by using a
[multi-hot](https://docs.cloud.google.com/bigquery/docs/auto-preprocessing#feature-transform)
encoding scheme.

The encoding vocabulary is sorted alphabetically. `NULL` values and categories
that aren't in the vocabulary are encoded with an `index` value of `0`.

When used in the
[`TRANSFORM` clause](create.md#transform),
the vocabulary calculated during training, along with the top *k* and frequency
threshold values that you specified, are automatically used in prediction.

You can use this function with models that support
[manual feature preprocessing](https://docs.cloud.google.com/bigquery/docs/manual-preprocessing). For more
information, see the following documents:

- [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey)
- [Contribution analysis user journey](https://docs.cloud.google.com/bigquery/docs/contribution-analysis#contribution_analysis_user_journey)

### Syntax

```sql
ML.MULTI_HOT_ENCODER(array_expression [, top_k] [, frequency_threshold]) OVER()
```

#### Arguments

`ML.MULTI_HOT_ENCODER` takes the following arguments:

- `array_expression`: the `ARRAY<STRING>` expression to encode.
- `top_k`: an `INT64` value that specifies the number of categories included in the encoding vocabulary. The function selects the `top_k` most frequent categories in the data and uses those; categories below this threshold are encoded to `0`. This value must be less than `1,000,000` to avoid problems due to high dimensionality. The default value is `32,000`.
- `frequency_threshold`: an `INT64` value that limits the categories included in the encoding vocabulary based on category frequency. The function uses categories whose frequency is greater than or equal to `frequency_threshold`; categories below this threshold are encoded to `0`. The default value is `5`.

### Output

`ML.MULTI_HOT_ENCODER` returns an array of struct values in the form `ARRAY<STRUCT<INT64, FLOAT64>>`. The first element in the struct provides the
index of the encoded string expression, and the second element provides the
value of the encoded string expression.

### Example

The following example performs multi-hot encoding on a set of string array
expressions. It limits the encoding vocabulary to the three categories that
occur the most frequently in the data and that also occur one or more times.

```sql
SELECT f[OFFSET(0)] AS f0, ML.MULTI_HOT_ENCODER(f, 3, 1) OVER () AS output
FROM
  (
    SELECT ['a', 'b', 'b', 'c', NULL] AS f
    UNION ALL
    SELECT ['c', 'c', 'd', 'd', NULL] AS f
  )
ORDER BY f[OFFSET(0)];
```

The output looks similar to the following:

```text
+------+-----------------------------+
|  f0  | output.index | output.value |
+------+--------------+--------------+
|  a   |  1           |  1.0         |
|      |  2           |  1.0         |
|      |  3           |  1.0         |
|      |  0           |  1.0         |
|  c   |  3           |  1.0         |
|      |  0           |  1.0         |
+------+-----------------------------+
```

### What's next

- For information about feature preprocessing, see [Feature preprocessing overview](https://docs.cloud.google.com/bigquery/docs/preprocess-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-multi-hot-encoder (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

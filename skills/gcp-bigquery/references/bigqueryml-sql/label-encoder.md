---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-label-encoder
---

# The ML.LABEL_ENCODER function

## Signature / Usage

This document describes the `ML.LABEL_ENCODER` function, which you can use to
encode a string expression to an `INT64` value in `[0, <number of categories>]`.

The encoding vocabulary is sorted alphabetically. `NULL` values and categories
that aren't in the vocabulary are encoded to `0`.

When used in the
[`TRANSFORM` clause](create.md#transform),
the vocabulary values calculated during training, along
with the top *k* and frequency threshold values that you specified, are
automatically used in prediction.

You can use this function with models that support
[manual feature preprocessing](https://docs.cloud.google.com/bigquery/docs/manual-preprocessing). For more
information, see the following documents:

- [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey)
- [Contribution analysis user journey](https://docs.cloud.google.com/bigquery/docs/contribution-analysis#contribution_analysis_user_journey)

### Syntax

```sql
ML.LABEL_ENCODER(string_expression [, top_k] [, frequency_threshold]) OVER()
```

`ML.LABEL_ENCODER` takes the following arguments:

- `string_expression`: the `STRING` expression to encode.
- `top_k`: an `INT64` value that specifies the number of categories included in the encoding vocabulary. The function selects the `top_k` most frequent categories in the data and uses those; categories below this threshold are encoded to `0`. This value must be less than `1,000,000` to avoid problems due to high dimensionality. The default value is `32,000`.
- `frequency_threshold`: an `INT64` value that limits the categories included in the encoding vocabulary based on category frequency. The function uses categories whose frequency is greater than or equal to `frequency_threshold`; categories below this threshold are encoded to `0`. The default value is `5`.

### Output

`ML.LABEL_ENCODER` returns an `INT64` value that represents the encoded
string expression.

### Example

The following example performs label encoding on a set of string expressions.
It limits the encoding vocabulary to the two categories that occur the most
frequently in the data and that also occur two or more times.

```sql
SELECT f, ML.LABEL_ENCODER(f, 2, 2) OVER () AS output
FROM UNNEST([NULL, 'a', 'b', 'b', 'c', 'c', 'c', 'd', 'd']) AS f
ORDER BY f;
```

The output looks similar to the following:

```text
+------+--------+
|  f   | output |
+------+--------+
| NULL |      0 |
| a    |      0 |
| b    |      1 |
| b    |      1 |
| c    |      2 |
| c    |      2 |
| c    |      2 |
| d    |      0 |
| d    |      0 |
+------+--------+
```

### What's next

- For information about feature preprocessing, see [Feature preprocessing overview](https://docs.cloud.google.com/bigquery/docs/preprocess-overview).
- For information about the supported SQL statements and functions for each

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-label-encoder (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

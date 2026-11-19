---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-arima-coefficients
---

# The ML.ARIMA_COEFFICIENTS function

## Signature / Usage

This document describes the `ML.ARIMA_COEFFICIENTS` function, which lets you
see the ARIMA coefficients and the weights of the external regressors for
`ARIMA_PLUS` and `ARIMA_PLUS_XREG` time series models.

### Syntax

```sql
ML.ARIMA_COEFFICIENTS(
  MODEL `PROJECT_ID.DATASET.MODEL`
)
```

#### Arguments

`ML.ARIMA_COEFFICIENTS` takes the following arguments:

- `PROJECT_ID`: your project ID.
- `DATASET`: the BigQuery dataset that contains the model.
- `MODEL`: the name of the model.

### Output

`ML.ARIMA_COEFFICIENTS` returns the following columns:

- `time_series_id_col` or `time_series_id_cols`: a value that contains the identifiers of a time series. `time_series_id_col` can be an `INT64` or `STRING` value. `time_series_id_cols` can be an `ARRAY<INT64>` or `ARRAY<STRING>` value. Only present when forecasting multiple time series simultaneously. The column names and types are inherited from the `TIME_SERIES_ID_COL` option as specified in the model creation query.
- `ar_coefficients`: an `ARRAY<FLOAT64>` value that contains the autoregressive coefficients, which corresponds to non-seasonal p.
- `ma_coefficients`: an `ARRAY<FLOAT64>` value that contains the moving-average coefficients, which corresponds to non-seasonal q.
- `intercept_or_drift`: a `FLOAT64` value that contains the constant term of the ARIMA model. By definition, the constant term is called `intercept` when non-seasonal d is `0`, and `drift` when non-seasonal d is `1`. `intercept_or_drift` is always `0` when non-seasonal d is `2`.
- `processed_input`: a `STRING` value that contains the name of the model feature input column. The value of this column matches the name of the feature column provided in the [`query_statement` clause](create.md#query_statement) that was used when the model was trained.
- `weight`: when the `processed_input` value is numerical, `weight` contains a `FLOAT64` value and the `category_weights` column contains `NULL` values. When the `processed_input` value is non-numerical and has been converted to dummy encoding, the `weight` column is `NULL` and the `category_weights` column contains the category names and weights for each category.
- `category_weights.category`: a `STRING` value that contains the category name if the `processed_input` value is non-numeric.
- `category_weights.weight`: a `FLOAT64` that contains the category's weight if the `processed_input` value is non-numeric.

> [!NOTE]
> **Note:** For trained `ARIMA_PLUS` models, this function returns the ARIMA coefficients for all time series, in ascending order of the `time_series_id_col` or `time_series_id_cols` value.

### Example

The following example retrieves the model coefficients information from
the model `mydataset.mymodel` in your default project:

```sql
SELECT
  *
FROM
  ML.ARIMA_COEFFICIENTS(MODEL `mydataset.mymodel`)
```

### What's next

- For information about model weights support in BigQuery ML, see [BigQuery ML model weights overview](https://docs.cloud.google.com/bigquery/docs/weights-overview).
- For more information about supported SQL statements and functions for time series forecasting models, see [End-to-end user journeys for time series forecasting models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-forecast).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-arima-coefficients (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

---
source: https://docs.cloud.google.com/bigquery/docs/bqml-introduction
---

# Introduction to ML in BigQuery

BigQuery ML lets you create and run machine learning (ML) models by using GoogleSQL queries or the Google Cloud console. Models are stored in BigQuery datasets, similar to tables and views. BigQuery ML also gives access to Agent Platform models (formerly Vertex AI) and Cloud AI APIs for tasks such as text generation or translation.

## Signature / Usage

### Ways to work with BigQuery ML

- The Google Cloud console UI to work with models (Preview).
- The Google Cloud console query editor (SQL).
- The bq command-line tool.
- The BigQuery REST API.
- Integrated Colab Enterprise notebooks in BigQuery.
- External tools such as a Jupyter notebook or a business intelligence platform.

### Create an internally trained model

```sql
CREATE OR REPLACE MODEL `bqml_tutorial.sample_model`
OPTIONS(model_type='logistic_reg') AS
SELECT
IF(totals.transactions IS NULL, 0, 1) AS label,
IFNULL(device.operatingSystem, "") AS os,
device.isMobile AS is_mobile,
IFNULL(geoNetwork.country, "") AS country,
IFNULL(totals.pageviews, 0) AS pageviews
FROM
`bigquery-public-data.google_analytics_sample.ga_sessions_*`
WHERE
_TABLE_SUFFIX BETWEEN '20160801' AND '20170630'
```

## Options / Props

### Supported model categories

| Category | Model types | Notes |
|----------|-------------|-------|
| Internally trained | Contribution analysis, linear regression, logistic regression, K-means, matrix factorization, PCA, time series (`ARIMA_PLUS`, `ARIMA_PLUS_XREG`) | Linear regression labels cannot be positive infinity, negative infinity or NaN. Logistic regression labels can have up to 50 unique values. K-means is unsupervised: no labels or split data needed. |
| Externally trained (trained in Agent Platform) | Deep neural network (DNN), Wide & Deep, Autoencoder, Boosted trees (XGBoost based), Random forest, AutoML | Dry run of `CREATE MODEL` is not possible. |
| Remote models | Models deployed to Agent Platform, referenced by HTTPS endpoint | `CREATE MODEL` for remote models processes no bytes and incurs no BigQuery charges. |
| Imported models | ONNX, TensorFlow, TensorFlow Lite, XGBoost (imported from Cloud Storage) | `CREATE MODEL` for imported models processes no bytes and incurs no BigQuery charges. |

### Other facts

| Topic | Detail |
|-------|--------|
| Time series | TimesFM (Preview, used through the `AI.FORECAST` function), `ARIMA_PLUS` and `ARIMA_PLUS_XREG` for forecasting and anomaly detection |
| Edition limitation | BigQuery ML isn't available in the Standard edition. Some features may be unavailable with reservations of certain editions. |
| Regions | Same regions as BigQuery (see BigQuery ML locations) |
| Datasets | A model can use data from multiple BigQuery datasets for training and prediction |
| Pricing | Charged for compute used to train models and query models, plus model storage. Remote model queries also incur Agent Platform charges. Queries against models always run in BigQuery. |
| Quotas | BigQuery ML-specific limits plus the query job quotas apply to `CREATE MODEL` and BigQuery ML functions |

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/bqml-introduction (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- The source page has no code block. Snippet taken from https://docs.cloud.google.com/bigquery/docs/create-machine-learning-model. The query reads a public sample dataset and is billed by bytes processed.
- Dry run: you can dry run `CREATE MODEL` for internally trained models to estimate data processed; you can't for externally trained models.
- BigQuery ML models can be registered to the Agent Platform Model Registry; remote models call Agent Platform models from BigQuery. The Gemini Developer API and the `google-genai` SDK are in `google-gemini-api`.
- Pricing amounts are not copied; see https://cloud.google.com/bigquery/pricing#bqml.

## Related

- [create-machine-learning-model.md](./create-machine-learning-model.md)
- [inference-overview.md](./inference-overview.md)
- [hp-tuning-overview.md](./hp-tuning-overview.md)
- [managing-models-vertex.md](./managing-models-vertex.md)
- [bigquery-ml-remote-model-tutorial.md](./bigquery-ml-remote-model-tutorial.md)

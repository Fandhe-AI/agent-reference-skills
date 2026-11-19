---
source: https://docs.cloud.google.com/bigquery/docs/inference-overview
---

# Model inference overview

Inference in BigQuery ML runs data points through ML models to calculate outputs such as numerical scores. Batch prediction uses the `ML.PREDICT` function with BigQuery ML trained, imported or remote models; online prediction is better served through Agent Platform.

## Signature / Usage

### Batch prediction with `ML.PREDICT`

```sql
SELECT
country,
SUM(predicted_label) as total_predicted_purchases
FROM
ML.PREDICT(MODEL `bqml_tutorial.sample_model`, (
SELECT
IFNULL(device.operatingSystem, "") AS os,
device.isMobile AS is_mobile,
IFNULL(totals.pageviews, 0) AS pageviews,
IFNULL(geoNetwork.country, "") AS country
FROM
`bigquery-public-data.google_analytics_sample.ga_sessions_*`
WHERE
_TABLE_SUFFIX BETWEEN '20170701' AND '20170801'))
GROUP BY country
ORDER BY total_predicted_purchases DESC
LIMIT 10
```

## Options / Props

### `ML.PREDICT` with BigQuery ML trained models

| Model category | Model types | What `ML.PREDICT` does |
|----------------|-------------|------------------------|
| Supervised learning | Linear and logistic regression, Boosted trees, Random forest, Deep Neural Networks, Wide-and-Deep, AutoML Tables | Predict the label: a numerical value for regression, a categorical value for classification |
| Unsupervised learning | K-means | Assign the cluster to the entity |
| Unsupervised learning | PCA | Apply dimensionality reduction by transforming the entity into the space spanned by the eigenvectors |
| Unsupervised learning | Autoencoder | Transform the entity into the embedded space |

### Inference approaches

| Approach | Where inference runs | Model types / use |
|----------|----------------------|-------------------|
| Imported models | In BigQuery, using BigQuery data | ONNX (PyTorch, scikit-learn and others), TensorFlow, TensorFlow Lite, XGBoost; supervised or unsupervised |
| Remote models | In Agent Platform, using BigQuery data | Large models needing GPU hardware; created with `CREATE MODEL` and queried with `ML.PREDICT` |
| Batch inference in Agent Platform | Agent Platform batch prediction with a BigQuery table as input | Register the model to the Model Registry; only via the Agent Platform API with `InstanceConfig.instanceType` set to `object` |
| Online prediction | Agent Platform endpoints | BigQuery ML inference is optimized for large-scale batch use; register models in Agent Platform for faster online prediction, or export them to Cloud Storage |

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/inference-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- The source page has no code block. Snippet taken from https://docs.cloud.google.com/bigquery/docs/create-machine-learning-model (reads a public sample dataset; billed by bytes processed).
- BigQuery ML has built-in batch prediction without Agent Platform. Remote models call Agent Platform from BigQuery; the Gemini Developer API and `google-genai` SDK are in `google-gemini-api`.
- Tutorials named in the source: predictions with imported TensorFlow models, scikit-learn models in ONNX format, PyTorch models in ONNX format, and remote models on Agent Platform.

## Related

- [bigquery-ml-remote-model-tutorial.md](./bigquery-ml-remote-model-tutorial.md)
- [managing-models-vertex.md](./managing-models-vertex.md)
- [bqml-introduction.md](./bqml-introduction.md)

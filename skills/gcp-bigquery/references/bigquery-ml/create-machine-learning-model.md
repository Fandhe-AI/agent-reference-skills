---
source: https://docs.cloud.google.com/bigquery/docs/create-machine-learning-model
---

# Create a machine learning model in BigQuery ML by using SQL

Tutorial that trains a binary logistic regression model on the Google Analytics sample dataset to predict whether a website visitor makes a transaction, then evaluates it with `ML.EVALUATE` and predicts with `ML.PREDICT`. BigQuery ML automatically splits the input data into training and evaluation sets to avoid overfitting.

## Signature / Usage

### Create a dataset

```bash
bq mk --dataset \
  --location=US \
  --description "BigQuery ML tutorial dataset." \
  bqml_tutorial
```

```bash
bq ls
```

### Create a logistic regression model

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

### Evaluate the model

```sql
SELECT
*
FROM
ML.EVALUATE(MODEL `bqml_tutorial.sample_model`, (
SELECT
IF(totals.transactions IS NULL, 0, 1) AS label,
IFNULL(device.operatingSystem, "") AS os,
device.isMobile AS is_mobile,
IFNULL(geoNetwork.country, "") AS country,
IFNULL(totals.pageviews, 0) AS pageviews
FROM
`bigquery-public-data.google_analytics_sample.ga_sessions_*`
WHERE
_TABLE_SUFFIX BETWEEN '20170701' AND '20170801'))
```

### Predict purchases by country

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

### Predict purchases per user

```sql
SELECT
fullVisitorId,
SUM(predicted_label) as total_predicted_purchases
FROM
ML.PREDICT(MODEL `bqml_tutorial.sample_model`, (
SELECT
IFNULL(device.operatingSystem, "") AS os,
device.isMobile AS is_mobile,
IFNULL(totals.pageviews, 0) AS pageviews,
IFNULL(geoNetwork.country, "") AS country,
fullVisitorId
FROM
`bigquery-public-data.google_analytics_sample.ga_sessions_*`
WHERE
_TABLE_SUFFIX BETWEEN '20170701' AND '20170801'))
GROUP BY fullVisitorId
ORDER BY total_predicted_purchases DESC
LIMIT 10
```

## Options / Props

### Required roles

| Role | ID |
|------|----|
| BigQuery Data Editor | `roles/bigquery.dataEditor` |
| BigQuery User | `roles/bigquery.user` |

### `ML.EVALUATE` output columns (logistic regression)

| Column | Meaning |
|--------|---------|
| `precision` | How often the model was correct when predicting the positive class |
| `recall` | Out of all possible positive labels, how many the model identified |
| `accuracy` | Fraction of predictions the model got right |
| `f1_score` | Harmonic average of precision and recall; best value 1, worst 0 |
| `log_loss` | Loss function used in logistic regression |
| `roc_auc` | Area under the ROC curve |

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/create-machine-learning-model (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- `CREATE OR REPLACE MODEL` replaces an existing model of the same name. Try the tutorial in a disposable dataset (`bqml_tutorial`, location `US`); the source cleans up by deleting the dataset or project.
- The `label` alias is an alternative to the `input_label_cols=` option. `ML.PREDICT` names the output column `predicted_<label_column_name>`.
- Training takes several minutes. The queries scan the public `ga_sessions_*` tables and are billed by bytes processed. `_TABLE_SUFFIX` limits the tables scanned; training uses 2016-08-01 to 2017-06-30, evaluation and prediction use 2017-07-01 to 2017-08-01.
- Training loss and evaluation loss are shown in the console Training tab, or with the `ML.TRAINING_INFO` function.
- The source also shows Console, API (`datasets.insert`) and BigQuery DataFrames (Python) variants. The DataFrames samples were omitted: the source samples use undefined placeholders (`your_model_id`) and the evaluate sample has a misspelled argument (`evaluateodel_id`).

## Related

- [bqml-introduction.md](./bqml-introduction.md)
- [inference-overview.md](./inference-overview.md)
- [hp-tuning-overview.md](./hp-tuning-overview.md)

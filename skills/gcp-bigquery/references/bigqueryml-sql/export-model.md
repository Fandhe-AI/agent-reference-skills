---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-export-model
---

# The EXPORT MODEL statement

## Signature / Usage

To export an existing model from BigQuery ML to
[Cloud Storage](https://docs.cloud.google.com/storage/docs), use the `EXPORT MODEL`
statement.

For more information about supported model types, formats, and limitations, see
[Export models](https://docs.cloud.google.com/bigquery/docs/exporting-models).

For more information about supported SQL statements and functions for exportable
models, see the following documents:

- [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey)
- [End-to-end user journeys for imported models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-import)

### Syntax

The following is the syntax of `EXPORT MODEL` for a regular model that is not generated from BigQuery ML hyperparameter tuning.

```sql
EXPORT MODEL MODEL_NAME [OPTIONS(URI = STRING_VALUE)]
```

- `MODEL_NAME` is the name of the BigQuery ML
  model you're exporting. If you are exporting a model in another project,
  you must specify the project, dataset, and model in the following format,
  including backticks:

  ```sql
  `PROJECT.DATASET.MODEL`
  ```

  For example, `` `myproject.mydataset.mymodel` ``.

  If the model name does not exist in the dataset, the following error is
  returned:

  `Error: Not found: Model myproject:mydataset.mymodel`
- `STRING_VALUE` is the [URI of a Cloud Storage](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage#gcs-uri) bucket where the model
  is exported. This option is required for the `EXPORT MODEL` statement. For
  example:

  ```sql
  URI = 'gs://bucket/path/to/saved_model/'
  ```

For a model that is generated from BigQuery ML hyperparameter tuning,
`EXPORT MODEL` can also export an individual trial to a destination URI. For example:

```sql
EXPORT MODEL MODEL_NAME [OPTIONS(URI = STRING_VALUE [, TRIAL_ID = INT_VALUE])]
```

- `INT_VALUE` is the numeric ID of the exporting trial.
  For example:

  ```sql
  TRIAL_ID = 12
  ```

- If `TRIAL_ID` is not specified, then the optimal trial is exported by default.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-export-model (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of 4 of the 5 code blocks is taken from the rendered page, because the twin shortens the dashes in result-table borders (the other one has no matching block on the rendered page and is kept as in the twin). The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

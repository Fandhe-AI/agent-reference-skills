---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-alter-model
---

# The ALTER MODEL statement

## Signature / Usage

To update a model in BigQuery, use the BigQuery ML `ALTER
MODEL` statement.

For more information about supported SQL statements and functions for different
model types, see the following documents:

- [End-to-end user journeys for generative AI models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-genai)
- [End-to-end user journeys for time series forecasting models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-forecast)
- [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey)
- [End-to-end user journeys for imported models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-import)

### `ALTER MODEL` syntax

```sql
ALTER MODEL [IF EXISTS]
`PROJECT_ID.DATASET.MODEL`
SET OPTIONS
  (
    [, vertex_ai_model_id = VERTEX_AI_MODEL_ID]
    [, expiration_timestamp = EXPIRATION_TIMESTAMP]
    [, kms_key_name = KMS_KEY_NAME]
    [, description = DESCRIPTION]
    [, labels = LABELS]
    [, deploy_model = DEPLOY_MODEL]
    [, endpoint_idle_ttl = ENDPOINT_IDLE_TTL]
  );
```

#### Arguments

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the dataset that contains the resource.
- `MODEL`: the name of the model you're creating or
  replacing. The model name must be unique in the dataset: no other model or
  table can have the same name. The model name must follow the same naming rules
  as a BigQuery table. A model name can:

  - Contain up to 1,024 characters
  - Contain letters (upper or lower case), numbers, and underscores

  `MODEL` is case-sensitive.

  If you don't have a default project configured, then you must prepend the
  project ID to the model name in the following format, including backticks:

  \`\[PROJECT_ID\].\[DATASET\].\[MODEL\]\`

  For example, \`myproject.mydataset.mymodel\`.
- `VERTEX_AI_MODEL_ID`:
  a `STRING` value that specifies
  the Gemini Enterprise Agent Platform model ID to register the model with. To learn more, see
  [Register an existing BigQuery ML model to the Model Registry](https://docs.cloud.google.com/bigquery/docs/managing-models-vertex#add-existing).

- `EXPIRATION_TIMESTAMP`:
  a `TIMESTAMP` value that specifies when this model expires. If the model is an
  [open model that BigQuery manages in Agent Platform](create-remote-model-open.md#automatically-deployed-models),
  all Agent Platform resources associated with the model are deleted
  when the model expires.

- `KMS_KEY_NAME`:
  a `STRING` value that specifies the name of the Cloud KMS key used to
  encrypt the model.

- `DESCRIPTION`:
  a `STRING` value that provides a description of the model.

- `LABELS`:
  an `ARRAY<STRUCT<STRING, STRING>>` value that specifies any labels for the
  model as `key,value` pairs.

- `DEPLOY_MODEL`: a `BOOL` value
  that determines the model's deployment status in Gemini Enterprise Agent Platform. You can
  use this option to control costs by undeploying or redeploying the model
  as needed. We recommend undeploying an unused Gemini Enterprise Agent Platform endpoint,
  because otherwise the endpoint continues to generate charges for the compute
  resources that it uses, even when it is idle. For more information on
  Agent Platform compute pricing, see
  [Prediction and explanation](https://cloud.google.com/vertex-ai/pricing#prediction-prices).

  You can only use this option with an
  [open model that BigQuery manages in Agent Platform](create-remote-model-open.md#automatically-deployed-models).

  If the model was previously undeployed, setting this option to `TRUE`
  redeploys the model to an Agent Platform endpoint. If the model
  is already deployed, this operation has no effect. Model redeployment
  requires a "cold start" period while the endpoint resources are provisioned.
  The cold start period can take up to 30 minutes, depending on the size of the
  model and the number of
  [machine replicas](create-remote-model-open.md#max_replica_count)
  specified for the model.

  Setting this option to `FALSE` undeploys the model from an Agent Platform endpoint. If the model is already undeployed, this
  operation has no effect.
- `ENDPOINT_IDLE_TTL`:
  an `INTERVAL` value that specifies the duration of inactivity after which the
  model is automatically undeployed from the Agent Platform endpoint.
  You can only use this option with an
  [open model that BigQuery manages in Agent Platform](create-remote-model-open.md#automatically-deployed-models).

  To enable automatic undeployment, specify an
  [interval literal](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#interval_literals)
  value between 390 minutes (6.5 hours) and 7 days. For example, specify
  `INTERVAL 8 HOUR` to have the model undeployed after 8 hours of idleness.
  The default value is 390 minutes (6.5 hours).

  Model inactivity is defined as the amount of time that has passed
  since the any of the following operations were performed on the model:
  - Running the [`CREATE MODEL` statement](create-remote-model-open.md).
  - Running the `ALTER MODEL` statement with the `DEPLOY_MODEL` argument set to `TRUE`.
  - Sending an inference request to the model endpoint. For example, by running the [`AI.GENERATE_EMBEDDING`](ai-generate-embedding.md) or [`AI.GENERATE_TEXT`](ai-generate-text.md) function.

  Each of these operations resets the inactivity timer to zero. The reset is
  triggered at the start of the BigQuery job that performs the
  operation.

  After the model is undeployed, inference requests sent to the model return
  an error. The BigQuery model object remains unchanged,
  including model metadata. To use the model for inference again, you must
  redeploy it by running the `ALTER MODEL` statement on the model and
  setting the `DEPLOY_MODEL` option to `TRUE`.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-alter-model (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)

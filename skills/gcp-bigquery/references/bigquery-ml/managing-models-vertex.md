---
source: https://docs.cloud.google.com/bigquery/docs/managing-models-vertex
---

# Manage BigQuery ML models in Agent Platform

You can register BigQuery ML models with the Agent Platform (Vertex AI) Model Registry to version, evaluate and deploy them for online prediction from one interface, without exporting them and without a serving container. All model types can be registered, but deployment is limited for some types.

## Signature / Usage

### Register at creation time

Adapted (not in the official docs): wrapped the options in `OPTIONS(...)` and added `AS SELECT ...` with a placeholder training table, because `CREATE MODEL` requires both for a k-means model.

```sql
CREATE OR REPLACE MODEL `mydataset.my_kmeans_model`
  OPTIONS(
    MODEL_TYPE = 'KMEANS',
    MODEL_REGISTRY = 'VERTEX_AI',
    VERTEX_AI_MODEL_ID = 'customer_clustering')
AS SELECT * FROM `mydataset.customer_features`;
```

### Register an existing model

```sql
ALTER MODEL IF EXISTS mymodel SET OPTIONS (vertex_ai_model_id='my_vertex_ai_model_id');
```

```bash
  bq update --model --vertex_ai_model_id 'my_vertex_ai_model_id' myproject:mydataset.mymodel
```

Adapted (not in the official docs): added quotes and closed the brackets so the request body is valid JSON.

```json
{
  "trainingRuns": [
    {
      "vertexAiModelId": "my_vertex_ai_model_id"
    }
  ]
}
```

Send it to the `models.patch` REST method.

## Options / Props

### `CREATE MODEL` options for registration

| Option | Description |
|--------|-------------|
| `MODEL_REGISTRY` | Register the model to the Model Registry (`'VERTEX_AI'`) |
| `VERTEX_AI_MODEL_ID` | Model ID in the Model Registry. Each BigQuery ML model can only be registered to one model ID. |
| `VERTEX_AI_MODEL_VERSION_ALIASES` | One or more version aliases to streamline deployment, manage models and enable Vertex Explainable AI |

### Limitations and locations

| Topic | Detail |
|-------|--------|
| Remote models | Can't be registered |
| Registered but not deployable | Imported XGBoost models, `ARIMA_PLUS`, `ARIMA_PLUS_XREG` |
| US multi-region BigQuery ML model | Becomes a regional Agent Platform model in `us-central1` |
| EU multi-region BigQuery ML model | Becomes a regional Agent Platform model in `europe-west4` |
| Single-region models | No change |
| Required role | Agent Platform Administrator (`roles/aiplatform.admin`) on the project to register models |
| Required API | Agent Platform API (`aiplatform.googleapis.com`) enabled |

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/managing-models-vertex (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: the original k-means example was `CREATE OR REPLACE MODEL ... MODEL_TYPE = 'KMEANS', MODEL_REGISTRY = 'VERTEX_AI', VERTEX_AI_MODEL_ID = 'customer_clustering';` without `OPTIONS(...)` or a query. The original `models.patch` body used an unquoted value and unbalanced braces.
- The first model registered under a model ID is version 1; registering more models with the same ID adds versions. Creating or replacing a BigQuery ML model whose name is already registered deletes and replaces that registry version (for example replacing `model2` replaces version 2, and the registry then shows versions 1 and 3).
- Once registered, `VERTEX_AI_MODEL_ID` can't be changed. Delete and recreate the model (incurs re-training cost), or copy the model and use `ALTER MODEL` on the copy.
- Deleting a BigQuery ML model removes it from the Model Registry. A model deployed to an endpoint must first be undeployed in the Model Registry. Delete models only after confirming they are disposable.
- Registration from the console (Registry tab, Register button) is Preview. The source also shows Console steps for registering an existing model.
- This page covers Agent Platform (Vertex AI) managing BigQuery ML models; the Gemini Developer API and `google-genai` SDK are in `google-gemini-api`.

## Related

- [inference-overview.md](./inference-overview.md)
- [bigquery-ml-remote-model-tutorial.md](./bigquery-ml-remote-model-tutorial.md)
- [bqml-introduction.md](./bqml-introduction.md)

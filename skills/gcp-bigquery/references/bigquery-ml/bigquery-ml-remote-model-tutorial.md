---
source: https://docs.cloud.google.com/bigquery/docs/bigquery-ml-remote-model-tutorial
---

# Make predictions with remote models on Agent Platform

Tutorial that imports a pretrained TensorFlow sentiment model into the Agent Platform Model Registry, deploys it to an endpoint, creates a Cloud resource connection, registers it in BigQuery as a remote model with `CREATE MODEL ... REMOTE WITH CONNECTION`, and queries it with `ML.PREDICT`. Remote models suit models too large to import and a single inference point for online, batch and micro-batch use.

## Signature / Usage

### Create the dataset

```bash
bq mk --dataset \
  --location=US \
  --description "BigQuery ML tutorial dataset." \
  bqml_tutorial
```

### Create the Cloud resource connection

```bash
bq mk --connection --location=US --project_id=PROJECT_ID \
    --connection_type=CLOUD_RESOURCE bqml_tutorial
```

```bash
bq show --connection PROJECT_ID.us.bqml_tutorial
```

Grant the connection's service account the Agent Platform User role (`roles/aiplatform.user`) in the project that hosts the endpoint.

### Create the remote model

```sql
CREATE OR REPLACE MODEL `PROJECT_ID.bqml_tutorial.bert_sentiment`
INPUT (text STRING)
OUTPUT(scores ARRAY<FLOAT64>)
REMOTE WITH CONNECTION `PROJECT_ID.us.bqml_tutorial`
OPTIONS(ENDPOINT = 'https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/endpoints/ENDPOINT_ID')
```

Adapted (not in the official docs): passed the statement through a quoted heredoc, because the source's double-quoted string makes bash run the backticks as command substitution.

```bash
bq query --use_legacy_sql=false <<'EOF'
CREATE OR REPLACE MODEL `PROJECT_ID.bqml_tutorial.bert_sentiment`
INPUT (text STRING)
OUTPUT(scores ARRAY<FLOAT64>)
REMOTE WITH CONNECTION `PROJECT_ID.us.bqml_tutorial`
OPTIONS(ENDPOINT = 'https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/endpoints/ENDPOINT_ID')
EOF
```

```bash
bq ls -m bqml_tutorial
```

### Predict

```sql
SELECT *
FROM ML.PREDICT (
    MODEL `PROJECT_ID.bqml_tutorial.bert_sentiment`,
    (
        SELECT review as text
        FROM `bigquery-public-data.imdb.reviews`
        LIMIT 10000
    )
)
```

```bash
bq query --use_legacy_sql=false \
'SELECT *
FROM ML.PREDICT (
MODEL `PROJECT_ID.bqml_tutorial.bert_sentiment`,
  (
    SELECT review as text
    FROM `bigquery-public-data.imdb.reviews`
    LIMIT 10000
  )
)'
```

## Options / Props

### Required roles on the project

| Role | ID |
|------|----|
| BigQuery Studio Admin | `roles/bigquery.studioAdmin` |
| Agent Platform User | `roles/aiplatform.user` |
| BigQuery Connection Admin | `roles/bigquery.connectionAdmin` |

### Tutorial settings

| Item | Value |
|------|-------|
| APIs to enable | BigQuery, Vertex AI (`aiplatform.googleapis.com`), Cloud Storage, BigQuery Connection |
| Model artifacts | `gs://cloud-samples-data/bigquery/ml/remote_model_tutorial/` (`US` multi-region) |
| Model Registry import | Name `bert_sentiment`, region `us-central1`, prebuilt container TensorFlow 2.15, accelerator GPU |
| Endpoint | Name `bert sentiment endpoint`, minimum compute nodes `1`, machine type `n1-standard-2` |
| Connection | Type `CLOUD_RESOURCE`, location `US`, ID `bqml_tutorial` |
| Default batch size | 128 instances per request |

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/bigquery-ml-remote-model-tutorial (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: the original `bq query` for `CREATE OR REPLACE MODEL` was `bq query --use_legacy_sql=false "CREATE OR REPLACE MODEL `PROJECT_ID...` ..."` in double quotes, where backticks run as shell command substitution.
- In a multi-region (`US`, `EU`) dataset a remote model can only connect to an endpoint deployed in a region within the same multi-region. The connection must be in the same project as the endpoint, otherwise the error is "does not have the permission to access resource". Input and output field names and types must exactly match the endpoint model (here `STRING` input, `ARRAY<FLOAT64>` output).
- Production: set a maximum number of compute nodes to enable autoscaling. If `bq mk --connection` fails with a `--connection_type` flag error, update the Google Cloud SDK.
- Remote models call Agent Platform models from BigQuery; the Gemini Developer API and `google-genai` SDK are in `google-gemini-api`. The Cloud Storage bucket and the endpoint's own configuration are covered by their own products.
- Billable components: BigQuery, BigQuery ML, Agent Platform. The `ML.PREDICT` query sends 10,000 rows to the endpoint. Clean up by deleting the model, dataset, endpoint (undeploy first), registry model and connection; the source also shows project deletion (`gcloud projects delete`), omitted here because it is irreversible. Try the tutorial in a disposable project.
- The source also shows Console steps for each stage.

## Related

- [inference-overview.md](./inference-overview.md)
- [managing-models-vertex.md](./managing-models-vertex.md)
- [bqml-introduction.md](./bqml-introduction.md)

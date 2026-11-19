---
source: https://docs.cloud.google.com/bigquery/docs/generate-text
---

# Generate text by using the AI.GENERATE_TEXT function

Create a BigQuery ML remote model that represents a Gemini Enterprise Agent Platform model, then use it with the `AI.GENERATE_TEXT` function to generate text from standard table (text) or object table (unstructured) input. Supported remote models: Gemini (generally available or preview), Anthropic Claude, Llama, Mistral AI, and supported open models.

## Signature / Usage

### Create a dataset and a Cloud resource connection

Create the connection in the same location as the dataset.

```bash
bq --location=LOCATION mk -d DATASET_ID
```

```bash
bq ls
```

```sql
CREATE CONNECTION [IF NOT EXISTS] `CONNECTION_NAME`
OPTIONS (
  connection_type = "CLOUD_RESOURCE",
  friendly_name = "FRIENDLY_NAME",
  description = "DESCRIPTION"
  );
```

```bash
bq mk --connection --location=REGION --project_id=PROJECT_ID \
    --connection_type=CLOUD_RESOURCE CONNECTION_ID
```

```bash
bq show --connection PROJECT_ID.REGION.CONNECTION_ID
```

### Grant the Agent Platform User role to the connection's service account

Grant in the project named in the endpoint URL, or (when the endpoint is a model name) in the project where you create the remote model. Granting in a different project returns `bqcx-1234567890-wxyz@gcp-sa-bigquery-condel.iam.gserviceaccount.com does not have the permission to access resource`.

```bash
gcloud projects add-iam-policy-binding 'PROJECT_NUMBER' --member='serviceAccount:MEMBER' --role='roles/aiplatform.user' --condition=None
```

### Create a remote model

```sql
CREATE OR REPLACE MODEL
`PROJECT_ID.DATASET_ID.MODEL_NAME`
REMOTE WITH CONNECTION {DEFAULT | `PROJECT_ID.REGION.CONNECTION_ID`}
OPTIONS (ENDPOINT = 'ENDPOINT');
```

New open model (deployed automatically by `CREATE MODEL`):

```sql
CREATE OR REPLACE MODEL
`PROJECT_ID.DATASET_ID.MODEL_NAME`
REMOTE WITH CONNECTION {DEFAULT | `PROJECT_ID.REGION.CONNECTION_ID`}
OPTIONS (
  {HUGGING_FACE_MODEL_ID = 'HUGGING_FACE_MODEL_ID' |
     MODEL_GARDEN_MODEL_NAME = 'MODEL_GARDEN_MODEL_NAME'}
  [, HUGGING_FACE_TOKEN = 'HUGGING_FACE_TOKEN' ]
  [, MACHINE_TYPE = 'MACHINE_TYPE' ]
  [, MIN_REPLICA_COUNT = MIN_REPLICA_COUNT ]
  [, MAX_REPLICA_COUNT = MAX_REPLICA_COUNT ]
  [, RESERVATION_AFFINITY_TYPE = {'NO_RESERVATION' | 'ANY_RESERVATION' | 'SPECIFIC_RESERVATION'} ]
  [, RESERVATION_AFFINITY_KEY = 'compute.googleapis.com/reservation-name' ]
  [, RESERVATION_AFFINITY_VALUES = RESERVATION_AFFINITY_VALUES ]
  [, ENDPOINT_IDLE_TTL = ENDPOINT_IDLE_TTL ]
);
```

Already deployed open model:

```sql
CREATE OR REPLACE MODEL
`PROJECT_ID.DATASET_ID.MODEL_NAME`
REMOTE WITH CONNECTION {DEFAULT | `PROJECT_ID.REGION.CONNECTION_ID`}
OPTIONS (
  ENDPOINT = 'https://ENDPOINT_REGION-aiplatform.googleapis.com/v1/projects/ENDPOINT_PROJECT_ID/locations/ENDPOINT_REGION/endpoints/ENDPOINT_ID'
);
```

### Generate text from standard table data (Gemini)

```sql
SELECT *
FROM AI.GENERATE_TEXT(
  MODEL `PROJECT_ID.DATASET_ID.MODEL_NAME`,
  {TABLE PROJECT_ID.DATASET_ID.TABLE_NAME | (PROMPT_QUERY)},
  STRUCT(
  {
    {
      [MAX_OUTPUT_TOKENS AS max_output_tokens]
      [, TOP_P AS top_p]
      [, TEMPERATURE AS temperature]
      [, STOP_SEQUENCES AS stop_sequences]
      [, GROUND_WITH_GOOGLE_SEARCH AS ground_with_google_search]
      [, SAFETY_SETTINGS AS safety_settings]
    }
    |
    [, MODEL_PARAMS AS model_params]
  }
  [, REQUEST_TYPE AS request_type])
);
```

```sql
SELECT *
FROM
  AI.GENERATE_TEXT(
    MODEL `mydataset.text_model`,
    TABLE mydataset.prompts,
    STRUCT(
      100 AS max_output_tokens, 0.5 AS top_p,
      TRUE AS ground_with_google_search,
      [STRUCT('HARM_CATEGORY_HATE_SPEECH' AS category,
        'BLOCK_LOW_AND_ABOVE' AS threshold),
      STRUCT('HARM_CATEGORY_DANGEROUS_CONTENT' AS category,
        'BLOCK_MEDIUM_AND_ABOVE' AS threshold)] AS safety_settings));
```

### Claude (standard table)

```sql
SELECT *
FROM AI.GENERATE_TEXT(
  MODEL `PROJECT_ID.DATASET_ID.MODEL_NAME`,
  {TABLE PROJECT_ID.DATASET_ID.TABLE_NAME | (PROMPT_QUERY)},
  STRUCT(
  {
    {
      [MAX_OUTPUT_TOKENS AS max_output_tokens]
      [, TOP_K AS top_k]
      [, TOP_P AS top_p]
    }
    |
    [, MODEL_PARAMS AS model_params]
  })
);
```

### Generate text from object table data (Gemini)

```sql
SELECT *
FROM AI.GENERATE_TEXT(
MODEL `PROJECT_ID.DATASET.MODEL`,
{ TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) },
STRUCT(
  PROMPT AS prompt
  {
    {
      [, MAX_OUTPUT_TOKENS AS max_output_tokens]
      [, TOP_P AS top_p]
      [, TEMPERATURE AS temperature]
      [, STOP_SEQUENCES AS stop_sequences]
      [, SAFETY_SETTINGS AS safety_settings]
    }
    |
    [, MODEL_PARAMS AS model_params]
  })
);
```

```sql
SELECT * FROM
  AI.GENERATE_TEXT(
    MODEL `mydataset.audio_model`,
    TABLE `mydataset.feedback`,
      STRUCT('What is the content of this audio clip, translated into Spanish?' AS PROMPT));
```

## Options / Props

### Required roles

| Task | Role |
|---|---|
| Create and use datasets, tables, models | BigQuery Data Editor (`roles/bigquery.dataEditor`) on the project |
| Create, delegate, and use connections | BigQuery Connections Admin (`roles/bigquery.connectionsAdmin`) on the project |
| Create and set a default connection as part of `CREATE MODEL` (no default connection configured) | BigQuery Admin (`roles/bigquery.admin`) on the project |
| Grant permissions to the connection's service account | Project IAM Admin (`roles/resourcemanager.projectIamAdmin`) on the project containing the Agent Platform endpoint |
| Object table bucket in a different project than the endpoint | Storage Admin (`roles/storage.admin`) on the bucket |
| Create BigQuery jobs | BigQuery Job User (`roles/bigquery.jobUser`) on the project |
| Connection service account (remote model and object table connection) | Agent Platform User (`roles/aiplatform.user`) |

Permissions: `bigquery.datasets.create`, `bigquery.connections.*`, `resourcemanager.projects.getIamPolicy`, `resourcemanager.projects.setIamPolicy`, `bigquery.jobs.create`, `bigquery.models.create`, `bigquery.models.getData`, `bigquery.models.updateData`, `bigquery.models.updateMetadata`. Enabling APIs (BigQuery, BigQuery Connection, Agent Platform) needs `serviceusage.services.enable`.

### Open model `CREATE MODEL` options

| Option | Description |
|---|---|
| `HUGGING_FACE_MODEL_ID` | `provider_name/model_name`, for example `deepseek-ai/DeepSeek-R1` |
| `MODEL_GARDEN_MODEL_NAME` | `publishers/publisher/models/model_name@model_version`, for example `publishers/openai/models/gpt-oss@gpt-oss-120b` |
| `HUGGING_FACE_TOKEN` | Hugging Face User Access Token with at least `read` role; only with `HUGGING_FACE_MODEL_ID`; required for gated or private models |
| `MACHINE_TYPE` | Machine type for the Agent Platform deployment; default is the Model Garden default for the model |
| `MIN_REPLICA_COUNT` | `INT64` in `[1, 4096]`; default `1` |
| `MAX_REPLICA_COUNT` | `INT64` in `[1, 4096]`; default is `MIN_REPLICA_COUNT` |
| `RESERVATION_AFFINITY_TYPE` | `NO_RESERVATION` (same as not specifying), `ANY_RESERVATION`, `SPECIFIC_RESERVATION` |
| `RESERVATION_AFFINITY_KEY` | `compute.googleapis.com/reservation-name`; required with `SPECIFIC_RESERVATION` |
| `RESERVATION_AFFINITY_VALUES` | `ARRAY<STRING>` of `projects/myproject/zones/reservation_zone/reservations/reservation_name`; required with `SPECIFIC_RESERVATION` |
| `ENDPOINT_IDLE_TTL` | `INTERVAL` from 390 minutes (6.5 hours) to 7 days; default 390 minutes. Undeploys the model after that idle time |

`ANY_RESERVATION` only uses VMs matching `MACHINE_TYPE`; a single-region dataset needs a reservation in the same region, the `US` multi-region needs `us-central1`, and the `EU` multi-region needs `europe-west4`. With insufficient capacity, on-demand VMs are provisioned. `SPECIFIC_RESERVATION` fails if the reservation lacks capacity. Only reservations shared with Agent Platform can be used.

### `AI.GENERATE_TEXT` argument ranges by model family

| Argument | Gemini | Claude | Llama / Mistral AI | Open models |
|---|---|---|---|---|
| `MAX_OUTPUT_TOKENS` | `[1,8192]`, default `128` | `[1,4096]`, default `128` | `[1,4096]`, default `128` | `[1,4096]`, model decides if unset |
| `TEMPERATURE` | `[0.0,1.0]`, default `0` | not supported | `[0.0,1.0]`, default `0` | `[0.0,1.0]`, model decides if unset |
| `TOP_P` | `[0.0,1.0]`, default `0.95` | `[0.0,1.0]`, model decides if unset | `[0.0,1.0]`, default `0.95` | `[0.0,1.0]`, model decides if unset |
| `TOP_K` | not listed | `[1,40]`, model decides if unset | not listed | `[1,40]`, model decides if unset |
| `STOP_SEQUENCES` | `ARRAY<STRING>`, default empty | not listed | `ARRAY<STRING>`, default empty | not listed |

### Gemini-only arguments

| Argument | Description |
|---|---|
| `GROUND_WITH_GOOGLE_SEARCH` | `BOOL`, default `FALSE`; when `TRUE`, adds a `grounding_result` column with sources |
| `SAFETY_SETTINGS` | `ARRAY<STRUCT<STRING AS category, STRING AS threshold>>`; each category once; default threshold `BLOCK_MEDIUM_AND_ABOVE`. Categories: `HARM_CATEGORY_HATE_SPEECH`, `HARM_CATEGORY_DANGEROUS_CONTENT`, `HARM_CATEGORY_HARASSMENT`, `HARM_CATEGORY_SEXUALLY_EXPLICIT`. Thresholds: `BLOCK_NONE` (Restricted), `BLOCK_LOW_AND_ABOVE`, `BLOCK_MEDIUM_AND_ABOVE` (Default), `BLOCK_ONLY_HIGH`, `HARM_BLOCK_THRESHOLD_UNSPECIFIED` |
| `REQUEST_TYPE` | `DEDICATED` (Provisioned Throughput only; error `Provisioned throughput is not purchased or is not active` if unavailable), `SHARED` (dynamic shared quota only), `UNSPECIFIED` (default; Provisioned Throughput first, overflow to DSQ, or DSQ only if none purchased) |
| `MODEL_PARAMS` | JSON string conforming to the `generateContent` request body, except `contents[]`; if set, no parameter may also be in the top-level struct |

### Object table arguments

| Argument | Description |
|---|---|
| `PROMPT` | `STRING`; must be fewer than 16,000 tokens (about four characters per token; 100 tokens is about 60-80 words) |
| `MAX_OUTPUT_TOKENS` | `[1,8192]`, default `1024` |
| `TOP_P` | `[0.0,1.0]`, default `0.95` |
| `TEMPERATURE` | `[0.0,1.0]`, default `0` |
| `QUERY_STATEMENT` | May only use `WHERE` and `ORDER BY` clauses |

## Notes

- Warning: `CREATE OR REPLACE MODEL` replaces an existing model with the same name; try the steps on a disposable dataset first.
- Permissive grants in the source: the BigQuery Admin role (`roles/bigquery.admin`) is only needed to create a default connection inside `CREATE MODEL`, and Project IAM Admin / Storage Admin are broad roles; use narrower scopes where you can. `HUGGING_FACE_TOKEN` is a credential written inside the `CREATE MODEL` statement, so it appears in the query text and job history.
- Prompt tables need a column named `prompt` (alias another column if needed). Avoid `LIMIT` and `OFFSET` in the prompt query: all input is processed first and then the limit is applied.
- The object table's Cloud Storage bucket must be in the same project where the model is created and `AI.GENERATE_TEXT` is called. A remote model based on a Gemini 2.5 model incurs charges for the thinking process.
- Partner models (Anthropic Claude, Llama, Mistral AI) must be enabled in the Agent Platform Model Garden (**Enable**, accept the terms) before use. Llama endpoints use the form `openapi/<publisher_name>/<model_name>`, for example `openapi/meta/llama-3.1-405b-instruct-maas`. For supported Gemini models you can specify the global endpoint to improve availability.
- The connection type to choose in the Console is **Vertex AI remote models, remote functions, BigLake and Spanner (Cloud Resource)**. The `--connection_type=CLOUD_RESOURCE` flag error `Flags parsing error: flag --connection_type=CLOUD_RESOURCE: value should be one of...` means the Google Cloud SDK needs updating.
- The `ENDPOINT_IDLE_TTL` timer resets on `CREATE MODEL`, `ALTER MODEL ... DEPLOY_MODEL = TRUE`, and inference requests; after undeploy, inference returns an error until you redeploy with `ALTER MODEL` and `DEPLOY_MODEL` set to `TRUE`.
- The source also shows the Console, Python, Node.js, Java and Terraform forms of connection creation, Mistral AI and open-model syntax with the same structure as above, and further examples. The Terraform and Console steps are omitted here.
- These are calls to Vertex AI (Agent Platform) models from BigQuery; the Gemini Developer API and the `google-genai` SDK are in `google-gemini-api`.
- Source: https://docs.cloud.google.com/bigquery/docs/generate-text (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [generative-ai-overview.md](./generative-ai-overview.md)
- [vector-search-intro.md](./vector-search-intro.md)

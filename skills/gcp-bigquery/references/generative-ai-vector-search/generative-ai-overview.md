---
source: https://docs.cloud.google.com/bigquery/docs/generative-ai-overview
---

# Generative AI overview

Generative AI functions analyze natural language and unstructured data directly in BigQuery by applying pre-trained Gemini Enterprise Agent Platform models, to extract structured data, generate embeddings, and classify text or images without building complex pipelines.

## Signature / Usage

### Inspect the full Agent Platform request and response

After enabling request-response logging in Agent Platform, query the logging table by job ID prefix:

```sql
SELECT *
FROM `my_project.my_dataset.request_response_logging`
WHERE JSON_VALUE(full_request, '$.labels.bigquery_job_id_prefix') = 'bquxjob_123456...';
```

### Fully qualified multi-regional endpoint formats

- `https://aiplatform.us.rep.googleapis.com/v1/projects/PROJECT_ID/locations/us/publishers/google/models/MODEL_ID`
- `https://aiplatform.eu.rep.googleapis.com/v1/projects/PROJECT_ID/locations/eu/publishers/google/models/MODEL_ID`
- `https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/MODEL_ID`

## Options / Props

### Function categories

| Category | Functions | Notes |
|---|---|---|
| General-purpose | `AI.GENERATE`, `AI.GENERATE_TEXT` (table-valued, over a remote model), `AI.GENERATE_TABLE` (table-valued, over a remote model), `AI.GENERATE_BOOL`, `AI.GENERATE_DOUBLE`, `AI.GENERATE_INT` | Full control and transparency over model, prompt, and parameters. Output includes status and full model response (may include safety rating or citations) |
| Managed | `AI.IF`, `AI.SCORE`, `AI.CLASSIFY`, `AI.AGG` | Streamlined syntax, optimized for cost and quality. Return a scalar (`BOOL`, `FLOAT64`, `STRING`) without model status. With optimized mode they scale to millions or billions of rows |
| Utility | `AI.COUNT_TOKENS` | Estimates input tokens before you run a query |
| Task-specific | Cloud AI APIs | Natural language processing, machine translation, document processing, audio transcription, computer vision |
| Embeddings | `AI.EMBED`, `AI.GENERATE_EMBEDDING` | See the vector search introduction |

### Managed functions

| Function | Purpose |
|---|---|
| `AI.IF` | Filter text or multimodal data (for example in `WHERE` or `JOIN`) based on a prompt |
| `AI.SCORE` | Rate inputs based on a prompt to rank rows; use in `ORDER BY` for top K |
| `AI.CLASSIFY` | Classify text into user-defined categories; use in `GROUP BY` |
| `AI.AGG` | Aggregate input based on natural language instructions |

### Supported models (Locations section)

| Model |
|---|
| `gemini-4-hydrogen` |
| `gemini-4-carbon` |
| `gemini-4-argon` |
| `gemini-3.8-flash` |
| `gemini-3.7-flash` |
| `gemini-3.6-flash` |
| `gemini-3.5-flash-lite` |
| `gemini-3.5-flash` |
| `gemini-3.1-flash-lite` |

### Endpoint selection for short model names (for example `gemini-3.5-flash`)

| Query runs in | Endpoint used |
|---|---|
| `us` region, or any single region in the US | `us` |
| `eu` region, or any single region in the EU other than `europe-west2` or `europe-west6` | `eu` |
| All other locations, including `europe-west2` and `europe-west6` | `global` |

### Token counts (Job information pane)

| Count | Meaning |
|---|---|
| Input token count | Total input tokens to all generative AI functions called in the query |
| Output token count | Total tokens across all candidate responses |
| Thought token count | Tokens that were part of the model's generated thoughts, if applicable |
| Cache token count | Input tokens that were implicitly cached by the query |

## Notes

- Agent Platform supports only multi-regional endpoints for the listed models; regional endpoints aren't supported. If a query runs in `asia-south1`, use the fully qualified global endpoint name.
- Supported locations for text generation and embedding models vary by model type and version; see the BigQuery locations page (remote models section).
- Optimized mode for `AI.IF` and `AI.CLASSIFY` trains a lightweight, distilled model on a sample of your data and uses it for inference on most rows, avoiding an LLM call per row.
- VPC Service Controls limitation: inside a perimeter, AI functions can't process `ObjectRef` values that use delegated access (signed HTTPS URL). The function writes `INVALID_ARGUMENT: HTTP links are not supported for requests restricted by VPCSC.` to the `status` field. The `ref` column of an object table always uses the object table's connection as authorizer, so passing it inside a perimeter always returns this error; pass a single-argument `OBJ.MAKE_REF(uri)` value instead (direct access).
- Pricing: you pay for the compute used to run queries against models; remote models call Agent Platform, so Agent Platform charges also apply (see BigQuery ML pricing).
- Cost tracking: in Cloud Billing reports filter by service Vertex AI, then by label key `bigquery_job_id_prefix` with the job ID as value (first 63 characters, lowercase). Some charges can take up to 24 hours to appear.
- Request-response logging must be enabled separately for each foundation model and region in Agent Platform. To log queries that run in `us`, specify `us-central1`; for `eu`, specify `europe-west4`.
- Error handling: row-level errors such as `RESOURCE_EXHAUSTED` return `NULL` for that row. `AI.IF`, `AI.CLASSIFY`, and `AI.SCORE` support `max_error_ratio` (default `1.0`; lower it, for example `0.2`, so the query fails instead of succeeding with partial failures). Error ratio = failed rows / total rows processed by the model. A `LIMIT` is applied after the model processes a batch, so the visible `NULL` share can exceed `max_error_ratio`. Partial failures return a warning; see **Gen AI function errors** in **Job information**.
- These functions call Vertex AI (Agent Platform) models from BigQuery; the Gemini Developer API and the `google-genai` SDK are in `google-gemini-api`.
- Source: https://docs.cloud.google.com/bigquery/docs/generative-ai-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [generate-text.md](./generate-text.md)
- [vector-search-intro.md](./vector-search-intro.md)
- [ai-introduction.md](./ai-introduction.md)

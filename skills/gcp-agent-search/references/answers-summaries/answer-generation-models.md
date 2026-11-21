---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/answer-generation-models
---

# Answer generation model versions and lifecycle

Agent Search offers multiple model versions for generating answers, selectable when using search summaries and answers and follow-ups. When you set a model specification, the API uses that model to generate answers.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/get-search-summaries: a search request that specifies `preview` as the model version.

```bash
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
"https://discoveryengine.googleapis.com/v1/projects/exampleproject/locations/global/collections/default_collection/dataStores/exampledatastore/servingConfigs/default_search:search" \
-d '{
  "query": "what is bigquery",
  "contentSearchSpec": {
    "summarySpec": {
      "modelSpec": {
        "version": "preview"
      }
    }
  }
}'
```

## Options / Props

### Model versions

| Model version | Description | Context window | Discontinuation date |
|---------------|-------------|----------------|----------------------|
| `stable` | The default model choice if the model version is not set. The `stable` model specification points to `gemini-3.5-flash/answer_gen/v1`. The model designated as `stable` changes periodically as new models and versions become available. | 128K | N/A |
| `gemini-3.1-pro-preview/answer_gen/v1` | The `gemini-3.1-pro-preview` model. | 128K | N/A |
| `gemini-3-flash-preview/answer_gen/v1` | The `gemini-3-flash-preview` model. | 128K | N/A |
| `gemini-3.5-flash/answer_gen/v1` | The `gemini-3.5-flash` model. | 128K | N/A |

## Notes

- Agent Search uses two types of models: Gemini Enterprise Agent Platform LLM models tested on question answering tasks, and Agent Search models based on Agent Platform LLM models and further trained for question answering.
- Agent Search models share the same discontinuation date as their base Agent Platform LLM models. The base LLM model is available for six months after the release date of the next version of the model, according to the Model versions and lifecycle page. Leave enough time to migrate to new models before the discontinuation dates.
- The latest Gemini models might not be available for use with this API.
- For quality and latency reasons, the 128K context window is smaller than allowed elsewhere for these models.
- The streaming answer method supports only Gemini models ([stream-answer.md](./stream-answer.md)).
- Former names: Agent Search was Vertex AI Search (API still Discovery Engine); Agent Platform was Vertex AI.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/answer-generation-models (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/get-search-summaries (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [get-search-summaries.md](./get-search-summaries.md)
- [stream-answer.md](./stream-answer.md)

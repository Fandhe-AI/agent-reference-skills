---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/answer-generation-models
---

# Answer generation model versions and lifecycle

Agent Search offers multiple model versions for generating answers, selectable when using search summaries and answers and follow-ups. When you set a model specification, the API uses that model to generate answers.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/get-search-summaries: a search request that specifies `preview` as the model version.

Adapted (not in the official docs): added `"summaryResultCount": 3` to `summarySpec` and `"extractiveContentSpec": { "maxExtractiveAnswerCount" : 1}` to `contentSearchSpec`, the values of the source's own summary example, because the source's summary procedure says a summary request "specifies values for `summaryResultCount` and `maxExtractiveAnswerCount`"; the model version and every other field are unchanged. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell.

```bash
( set +x; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl --fail-with-body -X POST \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
"https://discoveryengine.googleapis.com/v1/projects/exampleproject/locations/global/collections/default_collection/dataStores/exampledatastore/servingConfigs/default_search:search" \
-d '{
  "query": "what is bigquery",
  "contentSearchSpec": {
    "summarySpec": {
      "summaryResultCount": 3,
      "modelSpec": {
        "version": "preview"
      }
    },
    "extractiveContentSpec": { "maxExtractiveAnswerCount" : 1}
  }
}' )
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
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell.
- The example above uses `preview`, which this table does not list. The search summaries page (get-search-summaries, see Snippet taken from) says "You can specify `stable`, `preview`, or a specific model version by name." and "`preview` points to the latest Gemini model for question and answering."; use a model version from the table to pin a specific model.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/answer-generation-models (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the source's model-version example sends only `"summarySpec": {"modelSpec": {"version": "preview"}}`, while the same page says "to get a summary, you must also get extractive answers with your search results" and "To get a search summary, follow these steps: 1. Submit a search request that includes `contentSearchSpec.summarySpec` and specifies values for `summaryResultCount` and `maxExtractiveAnswerCount`." Its own summary example uses `"summaryResultCount": 3` and `"extractiveContentSpec": { "maxExtractiveAnswerCount" : 1}`, so the example adds those two values. The `discoveryengine.v1` Discovery document describes `summaryResultCount` only as "The number of top results to generate the summary from." and does not say what happens when it is unset.
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/get-search-summaries (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [get-search-summaries.md](./get-search-summaries.md)
- [stream-answer.md](./stream-answer.md)

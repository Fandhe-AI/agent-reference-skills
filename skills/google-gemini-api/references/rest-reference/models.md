---
source: https://ai.google.dev/api/models
---

# Models (models.get / models.list)

REST reference for retrieving and listing models (`models.get`, `models.list`), the `Model` resource, and the `predict` / `predictLongRunning` methods.

## Signature / Usage

```text
GET  https://generativelanguage.googleapis.com/v1beta/{name=models/*}
GET  https://generativelanguage.googleapis.com/v1beta/models
POST https://generativelanguage.googleapis.com/v1beta/{model=models/*}:predict
POST https://generativelanguage.googleapis.com/v1beta/{model=models/*}:predictLongRunning
```

```python
from google import genai

client = genai.Client()
model_info = client.models.get(model="gemini-3.8-flash")
print(model_info)
```

```python
from google import genai

client = genai.Client()

print("List of models that support generateContent:\n")
for m in client.models.list():
  for action in m.supported_actions:
    if action == "generateContent":
      print(m.name)
```

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models" \
    -H "x-goog-api-key: ${GEMINI_API_KEY}"
```

## Options / Props

| Method | Parameter | Type | Description |
|------|------|------|-------------|
| models.get | name (path) | string | Required. The resource name of the model. Must match a name returned by `models.list`. Format: `models/{model}`. Request body must be empty. |
| models.list | pageSize (query) | integer | Maximum number of `Models` per page. If unspecified, 50 models are returned per page; at most 1000 per page. |
| models.list | pageToken (query) | string | Page token received from a previous `models.list` call. All other parameters must match the call that provided the token. |
| models.predict | model (path) | string | Required. Format: `models/{model}`. |
| models.predict | instances[] | value | Required. The instances that are the input to the prediction call. |
| models.predict | parameters | value | Optional. The parameters that govern the prediction call. |
| models.predict | labels | map (key: string, value: string) | Optional. User-defined metadata labels (see generate-content.md). |
| models.predictLongRunning | model (path) | string | Required. The name of the model for prediction. |
| models.predictLongRunning | instances[] / parameters / labels | as above | Same as `predict`. |
| models.predictLongRunning | webhookConfig.uris[] | string | Optional. If set, these webhook URIs will be used for webhook events instead of the registered webhooks. |

`Model` resource fields:

| Name | Type | Description |
|------|------|-------------|
| name | string | Required. Format `models/{model}`, naming convention `{baseModelId}-{version}`. |
| baseModelId | string | Required. The name of the base model, pass this to the generation request. |
| version | string | Required. The major version of the model. |
| displayName | string | Human-readable name, up to 128 characters. |
| description | string | A short description of the model. |
| inputTokenLimit | integer | Maximum number of input tokens allowed for this model. |
| outputTokenLimit | integer | Maximum number of output tokens available for this model. |
| supportedGenerationMethods[] | string | Supported generation methods, as Pascal case strings such as `generateMessage` and `generateContent`. |
| thinking | boolean | Whether the model supports thinking. |
| temperature | number | Default randomness; range `[0.0, maxTemperature]`. |
| maxTemperature | number | The maximum temperature this model can use. |
| topP | number | Nucleus sampling default. |
| topK | integer | Top-k sampling default. If empty, the model doesn't use top-k sampling and `topK` isn't allowed as a generation parameter. |

JSON representation of the `models.list` response:

```json
{ "models": [ { "...": "Model" } ], "nextPageToken": "string" }
```

(`nextPageToken` omitted means no more pages.)

## Notes

- Availability: v1beta. The endpoints on this page are listed under v1beta; the api-versions table (migration/api-versions.md) also marks the Models API as available in v1. `predict` returns `{ "predictions": [ value ] }`; `predictLongRunning` returns an `Operation` (see the Batch API reference). The overview page links these as the Imagen (image) and Veo (video) generation endpoints.
- The Python SDK exposes the `supportedGenerationMethods` list as `supported_actions` in the source example.
- The source shell examples end with a stray `pan>.sh` fragment after `$GEMINI_API_KEY`, omitted here.
- The list-models curl quotes the URL and sends the key as an `x-goog-api-key` header; the source passes an unquoted `?key=$GEMINI_API_KEY`, which fails under zsh globbing.
- Docs fetched 2026-10-16.

## Related

- [Generating content](./generate-content.md)
- [Batch API](./batch.md)
- [Counting tokens](./tokens.md)

---
source: https://ai.google.dev/api/embeddings
---

# Embeddings (models.embedContent / batchEmbedContents)

REST reference for generating embedding vectors: `models.embedContent`, `models.batchEmbedContents` (synchronous batch), and `models.asyncBatchEmbedContent` (long-running batch), plus `EmbedContentConfig`, `TaskType`, and the batch data models.

## Signature / Usage

```text
POST https://generativelanguage.googleapis.com/v1beta/{model=models/*}:embedContent
POST https://generativelanguage.googleapis.com/v1beta/{model=models/*}:batchEmbedContents
POST https://generativelanguage.googleapis.com/v1beta/{batch.model=models/*}:asyncBatchEmbedContent
```

Python:

```python
from google import genai
from google.genai import types

client = genai.Client()
text = "Hello World!"
result = client.models.embed_content(
    model="gemini-embedding-001",
    contents=text,
    config=types.EmbedContentConfig(output_dimensionality=10),
)
print(result.embeddings)
```

Node.js:

```javascript
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
const text = 'Hello World!';
const result = await ai.models.embedContent({
  model: 'gemini-embedding-001',
  contents: text,
  config: {outputDimensionality: 10},
});
console.log(result.embeddings);
```

Shell:

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent" \
-H "x-goog-api-key: $GEMINI_API_KEY" \
-H 'Content-Type: application/json' \
-d '{"model": "models/gemini-embedding-001",
     "content": {
     "parts":[{
     "text": "What is the meaning of life?"}]}
    }'
```

## Options / Props

`embedContent` request body:

| Name | Type | Description |
|------|------|-------------|
| model (path) | string | Required. Format `models/{model}`. |
| content | object (Content) | Required. The content to embed. Only the `parts.text` fields will be counted. |
| taskType (deprecated) | enum (TaskType) | Deprecated: use `EmbedContentConfig.task_type` instead. Not supported on `models/embedding-001`. |
| title (deprecated) | string | Deprecated: use `EmbedContentConfig.title` instead. Only applicable when TaskType is `RETRIEVAL_DOCUMENT`. |
| outputDimensionality (deprecated) | integer | Deprecated: use `EmbedContentConfig.output_dimensionality` instead. Excess values are truncated from the end. Cannot be set with `models/embedding-001`. |
| embedContentConfig | object (EmbedContentConfig) | Optional. Configuration for the request. |

`EmbedContentConfig` fields: `title` (string), `taskType` (enum), `autoTruncate` (boolean; silently truncate input longer than the maximum sequence length), `outputDimensionality` (integer), `documentOcr` (boolean; enable OCR for document content), `audioTrackExtraction` (boolean; extract audio from video content).

`TaskType` values: `TASK_TYPE_UNSPECIFIED`, `RETRIEVAL_QUERY`, `RETRIEVAL_DOCUMENT`, `SEMANTIC_SIMILARITY`, `CLASSIFICATION`, `CLUSTERING`, `QUESTION_ANSWERING`, `FACT_VERIFICATION`, `CODE_RETRIEVAL_QUERY`.

Other methods:

| Method | Request | Response |
|------|------|-------------|
| batchEmbedContents | `requests[]` (EmbedContentRequest, required; the model in each must match `BatchEmbedContentsRequest.model`) | `embeddings[]` (ContentEmbedding, in request order), `usageMetadata` |
| asyncBatchEmbedContent | `batch.*`: `displayName` (required), `inputConfig` (required: `fileName` or inlined `requests`), `priority` (optional string; higher value processed first, negatives allowed, default 0), `webhookConfig.uris[]` (optional); output-only: `name` (`batches/{batchId}`), `output`, `createTime`, `endTime`, `updateTime`, `batchStats`, `state` | `Operation` |

Response data models:

| Model | Fields |
|------|------|
| EmbedContentResponse | `embedding` (ContentEmbedding), `usageMetadata` |
| ContentEmbedding | `values[]` (number; "for 3P users only and will not be populated for 1P calls"), `shape[]` (integer) |
| EmbeddingUsageMetadata | `promptTokenCount`, `promptTokenDetails[]` |
| EmbedContentBatchOutput | union: `responsesFile` (JSONL file of `EmbedContentResponse`, same order as input) or `inlinedResponses` |
| EmbedContentBatchStats | `requestCount`, `successfulRequestCount`, `failedRequestCount`, `pendingRequestCount` |

## Notes

- Availability: v1beta. The batch variants are covered with the Batch API reference for `Operation` and `BatchState`.
- The source page states: "the Gemini Embedding model is only intended to transform the format of your input data into a numerical representation", and that users retain responsibility for the data they input and the resulting embeddings (Prohibited Use Policy and Terms of Service apply).
- Distinct from embeddings in other providers (openai-api-core) and from vector storage (upstash Vector, fandhe-db): this page generates vectors only; it stores nothing.
- Docs fetched 2026-10-16.

## Related

- [Batch API](./batch.md)
- [Models](./models.md)
- [File Search Stores](./file-search-stores.md)

---
source: https://ai.google.dev/gemini-api/docs/batch-api
---

# Batch API

The Gemini Batch API processes large volumes of requests asynchronously at 50% of the standard cost. Target turnaround is 24 hours, but in the majority of cases it is much quicker.

## Signature / Usage

```python
from google import genai
from google.genai import types

client = genai.Client()

# A list of dictionaries, where each is a GenerateContentRequest
inline_requests = [
    {
        'contents': [{
            'parts': [{'text': 'Tell me a one-sentence joke.'}],
            'role': 'user'
        }]
    },
    {
        'contents': [{
            'parts': [{'text': 'Why is the sky blue?'}],
            'role': 'user'
        }]
    }
]

inline_batch_job = client.batches.create(
    model="gemini-3.8-flash",
    src=inline_requests,
    config={
        'display_name': "inlined-requests-job-1",
    },
)

print(f"Created batch job: {inline_batch_job.name}")
```

```javascript
import {GoogleGenAI} from '@google/genai';

const ai = new GoogleGenAI({});

const inlinedRequests = [
    {
        contents: [{
            parts: [{text: 'Tell me a one-sentence joke.'}],
            role: 'user'
        }]
    },
    {
        contents: [{
            parts: [{'text': 'Why is the sky blue?'}],
            role: 'user'
        }]
    }
]

const response = await ai.batches.create({
    model: 'gemini-3.8-flash',
    src: inlinedRequests,
    config: {
        displayName: 'inlined-requests-job-1',
    }
});

console.log(response);
```

```bash
curl https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:batchGenerateContent \
-H "x-goog-api-key: $GEMINI_API_KEY" \
-X POST \
-H "Content-Type:application/json" \
-d '{
    "batch": {
        "display_name": "my-batch-requests",
        "input_config": {
            "requests": {
                "requests": [
                    {
                        "request": {"contents": [{"parts": [{"text": "Describe the process of photosynthesis."}]}]},
                        "metadata": {
                            "key": "request-1"
                        }
                    }
                ]
            }
        }
    }
}'
```

Input file (JSONL, uploaded with the File API), then create the job from the uploaded file name:

```json
{"key": "request-1", "request": {"contents": [{"parts": [{"text": "Describe the process of photosynthesis."}]}], "generation_config": {"temperature": 0.7}}}
{"key": "request-2", "request": {"contents": [{"parts": [{"text": "What are the main ingredients in a Margherita pizza?"}]}]}}
```

```python
file_batch_job = client.batches.create(
    model="gemini-3.8-flash",
    src=uploaded_file.name,
    config={
        'display_name': "file-upload-job-1",
    },
)
```

Monitor, retrieve, list, cancel, delete:

```python
batch_job = client.batches.get(name=job_name)
if batch_job.state.name == 'JOB_STATE_SUCCEEDED':
    if batch_job.dest and batch_job.dest.file_name:
        file_content = client.files.download(file=batch_job.dest.file_name)
    elif batch_job.dest and batch_job.dest.inlined_responses:
        for inline_response in batch_job.dest.inlined_responses:
            if inline_response.response:
                print(inline_response.response.text)
            elif inline_response.error:
                print(f"Error: {inline_response.error}")

batch_jobs = client.batches.list()
client.batches.cancel(name=batch_job_to_cancel.name)
client.batches.delete(name=batch_job_to_delete.name)
```

```bash
# REST: list / cancel / delete
BATCH_NAME="batches/123456" # Your batch job name

curl "https://generativelanguage.googleapis.com/v1beta/batches" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}"

curl -X POST "https://generativelanguage.googleapis.com/v1beta/${BATCH_NAME}:cancel" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}"

curl -X DELETE "https://generativelanguage.googleapis.com/v1beta/${BATCH_NAME}" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}"
```

## Options / Props

Submission methods:

| Method | Description |
|--------|-------------|
| Inline requests | List of `GenerateContentRequest` objects in the creation request; for smaller batches keeping total request size under 20MB. Output is a list of `inlineResponse` objects |
| Input file | JSONL file, one `{"key": ..., "request": ...}` object per line, uploaded with the File API (max 2GB). Output is a JSONL file where each line is a `GenerateContentResponse` or a status object. Recommended for larger requests |

Job states:

| State | Description |
|-------|-------------|
| `JOB_STATE_PENDING` | Created and waiting to be processed |
| `JOB_STATE_RUNNING` | In progress |
| `JOB_STATE_SUCCEEDED` | Completed successfully; results can be retrieved |
| `JOB_STATE_FAILED` | Failed; check the error details |
| `JOB_STATE_CANCELLED` | Cancelled by the user |
| `JOB_STATE_EXPIRED` | Running or pending for more than 48 hours; no results. Resubmit or split into smaller batches |

## Notes

- Availability: the page states the feature "is currently only available with the generateContent API". REST examples use `/v1beta/`. Interactions API tier options (Flex / Priority) are separate pages.
- Batch embeddings: use `batches.create_embeddings` with the embeddings model (inline or input file); inline embedding results are in `batch_job.dest.inlined_embed_content_responses`.
- Each request can carry the same configuration as a standard request (temperature, system instructions, tools such as Google Search, other modalities); uploaded files can be referenced from the JSONL.
- Results are stored and available for download for 6 weeks by default, then permanently deleted.
- Technical details: priced at 50% of the standard interactive API cost; target SLO 24 hours; context caching is supported by specifying the `cached_content` resource name per request (cache hits billed at standard context caching rates).
- Best practices: use input files for large requests (2GB per file); check `batchStats` `failedRequestCount` after completion; creation is not idempotent (the same request twice creates two jobs); break up very large batches.
- Polling alternative: subscribe to `batch.succeeded` / `batch.failed` with webhooks (see webhooks.md).
- Rate limits for batch (concurrent requests, file size, enqueued tokens per model) are in rate-limits.md.
- Distinct from other skills: Anthropic Message Batches (anthropic-api-core) and OpenAI Batch / webhooks (openai-api-core) are different APIs; webhooks here are not stripe or inngest webhooks.
- The page notes the OpenAI compatibility layer supports Batch API (see the OpenAI Compatibility page).
- The source page's REST cancel example omits `-X POST` and uses an unbraced `$BATCH_NAME:cancel` (zsh parses `:c` as a modifier); this page uses `-X POST` and `"${BATCH_NAME}:cancel"` per the batches.cancel API reference (POST `v1beta/{name=batches/*}:cancel`).
- The API reference lists the batch resource state enum as `BATCH_STATE_*`, while the guide and SDK examples use `JOB_STATE_*`; compare against the values your client actually returns.
- The Webhooks page describes `batch.expired` with a 24h timeframe, while this page defines `JOB_STATE_EXPIRED` as pending or running for more than 48 hours.
- In the Python snippets `job_name`, `uploaded_file`, `batch_job_to_cancel` and `batch_job_to_delete` are placeholders from earlier steps (job creation, File API upload); the inline-response error branch follows the source page.
- Docs fetched 2026-10-16.

## Related

- [flex-inference](./flex-inference.md)
- [webhooks](./webhooks.md)
- [rate-limits](./rate-limits.md)
- [pricing](./pricing.md)

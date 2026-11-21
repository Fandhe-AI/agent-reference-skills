---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/stream-answer
---

# Stream an answer

The streaming answer method (`streamAnswer`) has most of the features of the `answer` method plus streaming: the generated answer is broken into multiple parts that are sent in sequence. Streaming is useful for long answers because it reduces the appearance of latency.

## Signature / Usage

### Stream an answer (REST)

This basic command shows the required input only; the options are left at their defaults. Typically each response contains one sentence of the answer.

```bash
curl -X POST -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  "https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/collections/default_collection/engines/APP_ID/servingConfigs/default_search:streamAnswer" \
  -d '{
        "query": { "text": "QUERY"}
      }'
```

## Options / Props

### Placeholders

| Name | Description |
|------|-------------|
| `PROJECT_ID` | The ID of your Google Cloud project. |
| `APP_ID` | The ID of the Agent Search app that you want to query. |
| `QUERY` | A free-text string that contains the question or search query. For example, "Which database is faster, bigquery or spanner?". |

### Limitations compared with the answer method

| Limitation | Detail |
|------------|--------|
| Rephrase steps | The number of rephrase steps is one. You can't disable rephrasing, nor can you change the maximum number of steps. |
| Models | Only Gemini models can be used with the streaming answer method. |

## Notes

- In the source's example, the answer appears in a series of JSON outputs. The final output is given the state `SUCCEEDED` and includes the complete answer; the earlier outputs in the example carry `"state": "STREAMING"` (the source does not define that value further).
- The `steps` and `references` streaming responses might appear before the `answerText` responses, but this is not always the case. If you parse the output, don't assume that `steps` and `references` come before `answerText`.
- The same options as the `answer` method apply, except for the limitations above. Streaming can also be used with follow-up sessions.
- For streaming with agentic retrieval, see the "Stream answers using agentic retrieval" page ([agentic-retrieval-stream-answer.md](./agentic-retrieval-stream-answer.md)).
- Former name: Agent Search was Vertex AI Search; the API is still Discovery Engine (`discoveryengine.googleapis.com`).
- The source also shows a long example response, which is omitted here.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/stream-answer (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [agentic-retrieval-stream-answer.md](./agentic-retrieval-stream-answer.md)
- [answer-generation-models.md](./answer-generation-models.md)

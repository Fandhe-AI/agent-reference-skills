---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/stream-answer
---

# Stream an answer

The streaming answer method (`streamAnswer`) has most of the features of the `answer` method plus streaming: the generated answer is broken into multiple parts that are sent in sequence. Streaming is useful for long answers because it reduces the appearance of latency.

## Signature / Usage

### Stream an answer (REST)

This basic command shows the required input only; the options are left at their defaults. Typically each response contains one sentence of the answer.

Run the command by itself and type the query text on one line at the prompt; `jq` (required) encodes `QUERY` as a JSON string. A line that follows the command in the same paste or script is read as the query.

Adapted (not in the official docs): the request body is built with `jq -n --arg query "$QUERY" '{...}'` from the text read by `IFS= read -r QUERY` and sent on standard input with `--data @-`, instead of putting `"QUERY"` inside the single-quoted `-d '{...}'` argument, so apostrophes, double quotes and backslashes in the query cannot break the shell quoting or the JSON; every other field is unchanged.

```bash
IFS= read -r QUERY && jq -n --arg query "$QUERY" '{
        "query": { "text": $query}
      }' |
curl -X POST -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  "https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/collections/default_collection/engines/APP_ID/servingConfigs/default_search:streamAnswer" \
  --data @-
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
- Corrected from the official docs: the source writes the query placeholder inside the single-quoted `curl -d '{...}'` body (`"text": "QUERY"`). Replacing it with a query that contains an apostrophe ends the shell quoting, and a query with `"`, `\` or a line break makes the JSON invalid, so the body is built with `jq --arg` from standard input and sent with `--data @-`.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/stream-answer (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [agentic-retrieval-stream-answer.md](./agentic-retrieval-stream-answer.md)
- [answer-generation-models.md](./answer-generation-models.md)

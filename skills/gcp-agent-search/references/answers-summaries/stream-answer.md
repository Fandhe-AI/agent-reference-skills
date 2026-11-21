---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/stream-answer
---

# Stream an answer

The streaming answer method (`streamAnswer`) has most of the features of the `answer` method plus streaming: the generated answer is broken into multiple parts that are sent in sequence. Streaming is useful for long answers because it reduces the appearance of latency.

## Signature / Usage

### Stream an answer (REST)

This basic command shows the required input only; the options are left at their defaults. Typically each response contains one sentence of the answer.

Run the command by itself and type the query text on one line at the prompt; `jq` (required) encodes `QUERY` as a JSON string, and nothing is sent if the input ends first or the line is empty. A line that follows the command in the same paste or script is read as the query.

Adapted (not in the official docs): the request body is built with `jq -n --arg query "$QUERY" '{...}'` from the text read by `IFS= read -r QUERY`, rejected with `[ -n ... ]` when empty, and sent on standard input with `--data @-`, instead of putting `"QUERY"` inside the single-quoted `-d '{...}'` argument, so apostrophes, double quotes and backslashes in the query cannot break the shell quoting or the JSON; every other field is unchanged. The body is built in its own step (`BODY=$(jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error stops the command before `curl` runs. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--no-buffer` prints streamed chunks as they arrive. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset TOKEN` at its start also drops an `export` of that variable in your shell, so the new value is not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; IFS= read -r QUERY && [ -n "$QUERY" ] && BODY=$(jq -n --arg query "$QUERY" '{
        "query": { "text": $query}
      }') &&
TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
printf '%s' "$BODY" |
curl -q --fail-with-body --no-buffer -X POST -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
  -H "Content-Type: application/json" \
  "https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/collections/default_collection/engines/APP_ID/servingConfigs/default_search:streamAnswer" \
  --data @- )
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
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell. `unset TOKEN` at its start also drops an `export` of that variable in the calling shell, so the value is not put in the environment of `curl` and the other commands.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/stream-answer (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: every `curl` call starts with `-q`, because the curl manual says for `-q, --disable` "If used as the first parameter on the command line, the curlrc config file is not read or used." (`man curl`, curl 8.7.1); without it, a `trace` or `trace-ascii` line in `.curlrc` writes the request headers, including the token or API key, to a file (checked with curl 8.7.1 against a local 127.0.0.1 server).
- Adapted from the official docs: the subshell starts with `set +a` because it inherits `set -a` from the calling shell. With it on, in bash "Each variable or function that is created or modified is given the export attribute and marked for export to the environment of subsequent commands." (`man bash`, GNU bash 5.3.9), and in zsh "All parameters subsequently defined are automatically exported." (`ALL_EXPORT`, `man zshoptions`, zsh 5.9), so `TOKEN`, `API_KEY` or `BODY` would reach the environment of `curl` and `jq`.

## Related

- [agentic-retrieval-stream-answer.md](./agentic-retrieval-stream-answer.md)
- [answer-generation-models.md](./answer-generation-models.md)

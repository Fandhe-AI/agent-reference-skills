---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/agentic-retrieval-stream-answer
---

# Stream answers using agentic retrieval

Agentic retrieval with the `streamAnswer` method enables multi-pass retrieval (for example across several data stores, plus tools such as Google Search and Google Maps), multi-turn follow-ups on blended search apps, and custom query classification. It adds some complexity in return for more control over results.

## Signature / Usage

### Set up a reasoning engine for multi-turn sessions

To persist conversation context across turns, create an Agent Runtime instance (also called a reasoning engine) on Gemini Enterprise Agent Platform, with the Agent Engine REST API or the Agent Development Kit. Its resource name has this format and is passed as `reasoningEngine`:

```text
projects/PROJECT_NUMBER/locations/LOCATION_ID/reasoningEngines/REASONING_ENGINE_ID
```

Grant `roles/aiplatform.reasoningEngineServiceAgent` to the Discovery Engine service account so the streaming answer backend can create, read and append events to sessions on your behalf (the source defines `PROJECT_NUMBER` as the number of the project that hosts the reasoning engine; these steps assume that the Agent Search app and the reasoning engine are in the same project, see Notes):

```text
service-PROJECT_NUMBER@gcp-sa-discoveryengine.iam.gserviceaccount.com
```

### Optional: set up a custom AI-mode app

By default agentic retrieval uses the predefined Google answer agent, which classifies queries into `DEFAULT_ANSWER_SEEKING` and `DO_NOT_ANSWER`. To add intents (frames) and tools, create the engine through the `engines.create` REST method with an `engine_config.answer_agent` block. The source gives only the structure of that configuration, in protobuf text format with snake_case field names ("The configuration is structured as follows:"); it is not a REST request body. In the `engines.create` REST request the engine ID is passed as the `engineId` query parameter (`.../collections/default_collection/engines?engineId=ENGINE_ID`) and the body is an `Engine` JSON object with camelCase field names (for example `displayName`), but the JSON form of the `engine_config.answer_agent` fields is not documented in the source or in the Discovery documents (see Notes). For help designing or registering a custom AI-mode app, the source says to contact support. `engines.create` returns a long-running operation: send requests to the new engine only after that operation (its `name` as `OPERATION_NAME`) shows `"done": true` without an `error` field, polled as in "Poll an operation (REST)" on the long-running operations page of this skill (`references/agent-search-overview-setup/long-running-operations.md`).

```text
engine {
 name: "YOUR_AI_MODE_ENGINE"
 display_name: "YOUR_AI_MODE_ENGINE_DISPLAY_NAME"
 engine_config {
   answer_agent {
     frames {
       vertical_intent: "YOUR_CUSTOM_INTENT"
       vertical_intent_prompt {
         instructions: "Instructions for when to classify a user query as YOUR_CUSTOM_INTENT."
       }
       initial_prompt {
         instructions: "Instructions for the agent on how to process a user query classified as YOUR_CUSTOM_INTENT."
         tools {
           discovery_engine_search_tool_config {
             serving_config: "YOUR_SEARCH_SERVING_CONFIG_1"
             page_size: 10
           }
           tool_description: "This tool can help search corpus 1."
         }
         tools {
           discovery_engine_search_tool_config {
             serving_config: "YOUR_SEARCH_SERVING_CONFIG_2"
             page_size: 10
           }
           tool_description: "This tool can help search corpus 2."
         }
       }
     }
   }
 }
}
engine_id: "SAMPLE_MULTI_SEARCH_RETRIEVAL"
```

Route requests through the engine's `default_agent_answer` serving config:

```text
projects/*/locations/*/collections/*/engines/YOUR_AI_MODE_ENGINE/servingConfigs/default_agent_answer
```

### Stream an answer using agentic retrieval

Run the command by itself and type the query text, then `USER_PSEUDO_ID`, on one line each; `jq` (required) encodes both as JSON strings, and nothing is sent if the input ends first or a line is empty. A line that follows the command in the same paste or script is read as the query.

Adapted (not in the official docs): the request body is built with `printf '%s\n' ... | jq -Rn '[inputs] as [...] | {...}'` from the text read by `IFS= read -r QUERY`, rejected with `[ -n ... ]` when empty, and sent on standard input with `--data @-`, instead of putting `"QUERY"` and `"USER_PSEUDO_ID"` inside the single-quoted `-d '{...}'` argument, so apostrophes, double quotes and backslashes in the query cannot break the shell quoting or the JSON; every other field is unchanged. `printf` is a shell builtin, so these values reach `jq` on standard input, not in its arguments (the process list). The body is built in its own step (`BODY=$(... | jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error stops the command before `curl` runs. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--no-buffer` prints streamed chunks as they arrive. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN QUERY USER_PSEUDO_ID BODY; IFS= read -r QUERY && IFS= read -r USER_PSEUDO_ID && [ -n "$QUERY" ] && [ -n "$USER_PSEUDO_ID" ] && BODY=$(printf '%s\n' "$QUERY" "$USER_PSEUDO_ID" |
jq -Rn '[inputs] as [$query, $user_pseudo_id] | {
        "query": { "text": $query },
        "session": "SESSION",
        "enableAgentInvocation": true,
        "userPseudoId": $user_pseudo_id,
        "reasoningEngine": "projects/PROJECT_NUMBER/locations/LOCATION_ID/reasoningEngines/REASONING_ENGINE_ID"
      }') &&
TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
printf '%s' "$BODY" |
curl -q --fail-with-body --no-buffer -X POST -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
  -H "Content-Type: application/json" \
  "https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/collections/default_collection/engines/APP_ID/servingConfigs/SERVING_CONFIG_ID:streamAnswer" \
  --data @- )
```

## Options / Props

### Ways to enable agentic retrieval

| Way | Description |
|-----|-------------|
| Predefined Google answer agent | For an existing Agent Search app, set `enable_agent_invocation=true` in API requests; the existing search serving config is kept (`SERVING_CONFIG_ID` = `default_search`). |
| Custom AI-mode app | Create an app with a `default_agent_answer` serving config (also called the custom AI-mode engine; "app" and "engine" are interchangeable). |

### Placeholders

| Name | Description |
|------|-------------|
| `PROJECT_ID` | The ID of your Google Cloud project. |
| `APP_ID` | The ID of the Agent Search app that you want to query. |
| `SERVING_CONFIG_ID` | `default_agent_answer` for a custom AI-mode app; `default_search` for the predefined Google answer agent. |
| `PROJECT_NUMBER` | The number of the project that hosts the reasoning engine. |
| `QUERY` | A free-text string that contains the question or search query. |
| `SESSION` | The session resource name from the previous turn's response (for example `projects/PROJECT_ID/locations/global/collections/default_collection/engines/APP_ID/sessions/SESSION_ID`); `-` (a hyphen) if not continuing a conversation. |
| `USER_PSEUDO_ID` | A unique identifier used for tracking the visitor. |
| `LOCATION_ID` | The location of your reasoning engine, for example `us-central1`. |
| `REASONING_ENGINE_ID` | The ID of the Agent Engine instance you created. |

### Fields missing from the REST reference (allowlisted)

| Field | Type | Description |
|-------|------|-------------|
| `enableAgentInvocation` (request) | boolean | `true` switches to agentic processing with the existing search serving config. Optional when you specify an `answer_agent` serving config with a custom AI-mode app. |
| `reasoningEngine` (request) | string | Resource name of the Agent Runtime that hosts the agent sessions: `projects/*/locations/*/reasoningEngines/*`. |
| `queries` (`Answer.Reference`, response) | repeated string | The queries the agent issued to produce the reference. |

### Quotas consumed by Agent Runtime sessions

| Quota | Description |
|-------|-------------|
| `aiplatform.googleapis.com/session_write_requests` | Create, delete or update Agent Runtime sessions per minute. |
| `aiplatform.googleapis.com/session_event_append_requests` | Append event to Agent Runtime sessions per minute. |

## Notes

- Availability: "GA with allowlist". Access to agentic retrieval with the stream answers method is available to select Google Cloud customers; contact your Google Cloud sales representative. The allowlisted feature needs a preview Discovery Engine SDK obtained through support, different from the generally available client libraries; the source shows a Python sample against `discoveryengine_v1alpha` (`stream_answer_query`), which is omitted here.
- Project of the service agent: this source uses one `PROJECT_NUMBER` both in the Discovery Engine service agent address (`service-PROJECT_NUMBER@gcp-sa-discoveryengine.iam.gserviceaccount.com`) and in the reasoning engine name, and defines it as "the number of the project that hosts the reasoning engine"; its Python sample builds the app, serving config and reasoning engine names from the same `PROJECT_ID`, so it assumes the Agent Search app and the reasoning engine are in the same project. The official docs don't describe a setup where the app and the reasoning engine are in different projects (which service agent to grant, and on which project), so this page covers only the same-project setup.
- Suspected inconsistency left as in the source: the Python sample sets `LOCATION = "global"` and reuses it in the reasoning engine path, while the REST text says the reasoning engine location is for example `us-central1`. Verify the location before use.
- Because of the allowlist, the `streamAnswer` REST reference doesn't show `enableAgentInvocation` or `reasoningEngine`; the `discoveryengine.v1` Discovery document does not list them as request fields either.
- Without agentic retrieval, multi-turn search works only with single data store apps. Sessions backed by Agent Runtime consume Agent Platform API quotas (see the Agent Engine quotas page).
- The Session service REST and RPC APIs don't support `create` or `update`; `list`, `get` and `delete` are supported.
- This page is about Google's Agent Search, ADK and Agent Runtime, not Claude Code, the Claude Agent SDK or OpenAI Agents.
- Former names: Agent Search was Vertex AI Search (API still Discovery Engine); Agent Runtime was Vertex AI Agent Engine.
- The source also shows a long example response in protobuf text format, which is omitted.
- The custom AI-mode configuration above is copied as the source writes it (a `protobuf` block in the source, `engine { ... }` followed by `engine_id: "SAMPLE_MULTI_SEARCH_RETRIEVAL"`). The `discoveryengine` `v1`, `v1beta` and `v1alpha` Discovery documents have no `engineConfig`, `answerAgent` or frame fields on `Engine` (its configuration fields there are `chatEngineConfig`, `searchEngineConfig`, `mediaRecommendationEngineConfig` and others), so no JSON request body for this configuration can be verified and none is shown. The `engines.create` method of the `v1` Discovery document takes `engineId` as a required query parameter ("Required. The ID to use for the Engine, which will become the final component of the Engine's resource name.") and marks `displayName` and `solutionType` as required `Engine` fields; the source's structure does not set `solutionType`.
- Corrected from the official docs: the source writes the query placeholder inside the single-quoted `curl -d '{...}'` body (`"text": "QUERY"`). Replacing it with a query that contains an apostrophe ends the shell quoting, and a query with `"`, `\` or a line break makes the JSON invalid, so the body is built with `jq -Rn` from the values, which the `printf` builtin writes to its standard input (not its arguments), and sent with `--data @-` (`man jq` 1.7.1: `--raw-input / -R` "each line of text is passed to the filter as a string"; `inputs` "Outputs all remaining inputs, one by one.").
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell. `unset` at its start also drops an `export` of the variables it sets in the calling shell, so their values are not put in the environment of `curl` and the other commands.
- Adapted from the official docs: added the wait for the engine's creation operation before it is used; `engines.create` returns `GoogleLongrunningOperation` in the `discoveryengine.v1` Discovery document.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/agentic-retrieval-stream-answer (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: every `curl` call starts with `-q`, because the curl manual says for `-q, --disable` "If used as the first parameter on the command line, the curlrc config file is not read or used." (`man curl`, curl 8.7.1); without it, a `trace` or `trace-ascii` line in `.curlrc` writes the request headers, including the token or API key, to a file (checked with curl 8.7.1 against a local 127.0.0.1 server).
- Adapted from the official docs: the subshell starts with `set +a` because it inherits `set -a` from the calling shell. With it on, in bash "Each variable or function that is created or modified is given the export attribute and marked for export to the environment of subsequent commands." (`man bash`, GNU bash 5.3.9), and in zsh "All parameters subsequently defined are automatically exported." (`ALL_EXPORT`, `man zshoptions`, zsh 5.9), so `TOKEN`, `API_KEY` or `BODY` would reach the environment of `curl` and `jq`.

## Related

- [stream-answer.md](./stream-answer.md)
- [answer-generation-models.md](./answer-generation-models.md)

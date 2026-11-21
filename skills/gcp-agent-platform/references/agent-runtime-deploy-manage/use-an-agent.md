---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-agent
---

# Use an Agent on Agent Runtime

How to query agents: through the Agent Platform SDK (same code locally or deployed), through the agent's underlying API on `localhost` or on the deployed `reasoningEngines` endpoint, or in the Google Cloud console Playground (ADK agents).

## Signature / Usage

### Call a deployed ADK API server through the underlying API

For an ADK API server deployed from a Dockerfile or container image, invoke `/api/run` (single response). Both calls below use an existing session: `"s_abc"` is a placeholder. First create a session with the ADK API server route `POST /apps/{app_name}/users/{user_id}/sessions` (called through the same `/api/` prefix, that is `.../reasoningEngines/RESOURCE_ID/api/apps/my_sample_agent/users/u_123/sessions`, with the same `appName` and `userId` as the run request), then replace `s_abc` with the `id` of the returned session:

These calls are for single-user use (not in the official docs): the caller chooses `userId` in the session path and in the run request, and IAM permission to call the runtime does not prove that the caller is that user or owns the session. In an API that several users share, derive the user ID on the server side from the authenticated principal, and check that the session belongs to that user before you create, run or stream in it. Grant the permissions that call the runtime (such as `aiplatform.reasoningEngines.query`) and the `aiplatform.sessions.*` permissions only to that backend's service identity, not to end users, so that every call goes through the check; besides `roles/aiplatform.user`, `roles/aiplatform.viewer` and the basic `roles/viewer` also contain `aiplatform.reasoningEngines.query` (IAM roles-permissions page for `aiplatform`).

These REST requests send the access token of the gcloud CLI's active account (`gcloud auth print-access-token` without `ACCOUNT`: "If not specified, the current active account will be used."), not the Application Default Credentials (ADC) that the SDK examples use. Run `gcloud auth login` and check the active account with `gcloud auth list` ("shows which account is active"), or use `gcloud auth application-default print-access-token` ("print an access token for your current Application Default Credentials") in its place to send the ADC token (gcloud 593.0.0 help).

Adapted (not in the official docs): added `--fail-with-body`, so an HTTP error makes `curl` exit non-zero instead of looking like success. The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments; `-q` comes first so that curl does not read `.curlrc`, and the command runs in a subshell that starts with `set +x` and `set +a`, so shell tracing does not print the token, it is not exported to `curl`, and `TOKEN` does not stay in your shell.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/api/run -d '{
  "appName": "my_sample_agent",
  "userId": "u_123",
  "sessionId": "s_abc",
  "newMessage": {
    "role": "user",
    "parts": [{"text": "What is the capital of France?"}]
  }
}' )
```

and `/api/run_sse` (streaming), which takes the same caller-chosen `userId` and `sessionId`; the same single-user limit and the same server-side checks apply:

Adapted (not in the official docs): added `--fail-with-body`, so an HTTP error makes `curl` exit non-zero instead of looking like success, and `--no-buffer`, so the server-sent events are printed as they arrive. The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments; `-q` comes first so that curl does not read `.curlrc`, and the command runs in a subshell that starts with `set +x` and `set +a`, so shell tracing does not print the token, it is not exported to `curl`, and `TOKEN` does not stay in your shell.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body --no-buffer \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/api/run_sse -d '{
  "appName": "my_sample_agent",
  "userId": "u_123",
  "sessionId": "s_abc",
  "newMessage": {
    "role": "user",
    "parts": [{"text": "What is the weather in New York?"}]
  },
  "streaming": true
}' )
```

## Options / Props

### Framework-specific usage guides

| Framework | Description |
|---|---|
| [Agent Development Kit (ADK)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-adk-agent) | Designed based on Google's internal best practices for developers building AI applications or teams needing to rapidly prototype and deploy robust agent-based solutions. |
| [Agent2Agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-a2a-agent) (preview) | The [Agent2Agent (A2A) protocol](https://a2a-protocol.org/) is an open standard designed to enable seamless communication and collaboration between AI agents. |
| [LangChain](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langchain-agent) | Easier to use for basic use cases because of its predefined configurations and abstractions. |
| [LangGraph](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langgraph-agent) | Graph-based approach to defining workflows, with advanced human-in-the-loop and rewind/replay capabilities. |
| [AG2 (formerly AutoGen)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-ag2-agent) | AG2 provides multi-agent conversation framework as a high-level abstraction for building LLM workflows. |
| [LlamaIndex](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-llamaindex-agent) (preview) | LlamaIndex's query pipeline offers a high-level interface for creating Retrieval-Augmented Generation (RAG) workflows. |
| [Custom](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-custom-agent) | Agents that were developed and deployed without the use of a framework-specific template. |
| [Runtime contract](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/runtime-contract) | HTTP API specification for custom container-based agents. |

### Playground support

| Framework | Chat with agent | View sessions |
|---|---|---|
| ADK | Supported | Supported. Requires agent to implement [Agent Platform Sessions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions) for persistency. |
| Agent2Agent (A2A) | Supported. Requires agent to implement [Agent Platform Sessions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions) for persistency. | Supported. Requires agent to use Agent Platform Sessions, and the agent must send the `user_id` value as part of the context object. For an example on how to pass the `user_id` value as part of the agent executor, see the [Get started with A2A](https://colab.sandbox.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/agents/agent_engine/tutorial_a2a_on_agent_engine.ipynb#scrollTo=R-d-VhZi7RIM) notebook. |

## Notes

- Endpoint patterns:
  - Agent served on localhost: `http://localhost:PORT_NUMBER/API_PATH` (`PORT_NUMBER` is the listening port, for example `8080`; `API_PATH` is the endpoint path such as ADK `run` or `run_sse`)
  - Deployed agent: `https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/api/API_PATH` (the form of the source's `curl` examples above)
- With the Agent Platform SDK, query code is the same whether the agent runs locally or deployed; the supported operations vary by framework.
- The deployed endpoint is equivalent to replacing the localhost base URL with the deployed agent base URL. For custom containers, endpoints and request / response structures are defined by the runtime contract.
- Source inconsistency: the source's generic endpoint pattern is `https://LOCATION-aiplatform.googleapis.com/reasoningEngines/v1/projects/PROJECT_NUMBER/locations/LOCATION/reasoningEngines/RESOURCE_ID/api/API_PATH` (an extra `/reasoningEngines` before `/v1`, and `PROJECT_NUMBER` while its variable list names `PROJECT_ID`), but its own `curl` examples call `https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/api/run`. The pattern above follows the `curl` examples, which use the same `v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID` prefix as the `reasoningEngines` methods of the `aiplatform.v1` Discovery document (the `/api/...` suffix itself is not in the Discovery document).
- Sessions: the source's examples pass a fixed `sessionId` (`s_abc`) and do not show creating it. In google-adk 2.15.0 (`google/adk/cli/api_server.py`, `_register_production_endpoints`), `POST /apps/{app_name}/users/{user_id}/sessions` creates a session (the request body is optional; `session_id` defaults to "a random session ID") and returns it, and `/run` and `/run_sse` answer 404 "Session not found" for an unknown `session_id` unless the server was started with `auto_create_session` (default `False` in `google/adk/cli/fast_api.py`). The `POST /apps/{app_name}/users/{user_id}/sessions/{session_id}` variant is marked deprecated ("Please use create_session instead"). The `/api/` prefix for this route follows the source's `.../api/API_PATH` pattern; the source does not show it for sessions.
- `LOCATION` is the region where the agent is deployed (see the Agent Platform locations page).
- Playground (console): open Agent Platform Deployments, select the runtime, open the **Playground** tab, type a message, or click **New Session**. If OpenTelemetry traces are enabled you can view **Trace**, **Event** (graph of invoked APIs), **State** and **Sessions**.
- The source also shows the console steps in detail.
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-agent (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: the source's `curl` commands have no `--fail-with-body`.
- Adapted from the official docs: the `/api/run_sse` `curl` has no `--no-buffer` (`-N`, "Disable buffering of the output stream" in `curl --help all`); without it, curl buffers its output and the streamed events can appear late.
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `-q` is the first argument because for `-q, --disable` the manual says "If used as the first parameter on the command line, the curlrc config file is not read or used.", so a `trace` line in `.curlrc` cannot write the headers to a file. The subshell starts with `set +x` (no tracing of the token) and `set +a` (an inherited `set -a` would export `TOKEN` to `curl`), and `unset` at its start also drops an inherited `export TOKEN`; `TOKEN` does not stay in the calling shell.

## Related

- [deploy-an-agent.md](./deploy-an-agent.md)
- [manage-deployed-agents.md](./manage-deployed-agents.md)
- [runtime-contract.md](./runtime-contract.md)

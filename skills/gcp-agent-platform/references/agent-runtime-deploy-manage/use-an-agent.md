---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-agent
---

# Use an Agent on Agent Runtime

How to query agents: through the Agent Platform SDK (same code locally or deployed), through the agent's underlying API on `localhost` or on the deployed `reasoningEngines` endpoint, or in the Google Cloud console Playground (ADK agents).

## Signature / Usage

### Call a deployed ADK API server through the underlying API

For an ADK API server deployed from a Dockerfile or container image, invoke `/api/run` (single response):

```bash
curl \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/api/run -d '{
  "appName": "my_sample_agent",
  "userId": "u_123",
  "sessionId": "s_abc",
  "newMessage": {
    "role": "user",
    "parts": [{"text": "What is the capital of France?"}]
  }
}'
```

and `/api/run_sse` (streaming):

```bash
curl \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
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
}'
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
  - Deployed agent: `https://LOCATION-aiplatform.googleapis.com/reasoningEngines/v1/projects/PROJECT_NUMBER/locations/LOCATION/reasoningEngines/RESOURCE_ID/api/API_PATH`
- With the Agent Platform SDK, query code is the same whether the agent runs locally or deployed; the supported operations vary by framework.
- The deployed endpoint is equivalent to replacing the localhost base URL with the deployed agent base URL. For custom containers, endpoints and request / response structures are defined by the runtime contract. The twin's endpoint pattern uses `PROJECT_NUMBER` while the variable list names `PROJECT_ID`; the curl examples use `PROJECT_ID` with `/v1/projects/.../reasoningEngines/RESOURCE_ID/api/...`.
- `LOCATION` is the region where the agent is deployed (see the Agent Platform locations page).
- Playground (console): open Agent Platform Deployments, select the runtime, open the **Playground** tab, type a message, or click **New Session**. If OpenTelemetry traces are enabled you can view **Trace**, **Event** (graph of invoked APIs), **State** and **Sessions**.
- The source also shows the console steps in detail.
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-agent (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-an-agent.md](./deploy-an-agent.md)
- [manage-deployed-agents.md](./manage-deployed-agents.md)
- [runtime-contract.md](./runtime-contract.md)

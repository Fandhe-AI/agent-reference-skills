---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime
---

# Agent Runtime overview

Agent Runtime (formerly Vertex AI Agent Engine) is a fully managed, opinionated runtime to deploy, operate and scale agentic applications without managing infrastructure. You can deploy and scale agents with end-to-end management, customize the container image with build-time installation scripts, use VPC-SC compliance with authentication and IAM configuration, access models and tools such as function calling, and deploy agents built with different languages and frameworks or the Agent2Agent open protocol.

## Signature / Usage

### Deploy an agent object (snippet)

`client` is the `vertexai.Client` and `app` the `agent_engines.AdkApp` created in the Install and initialize and Develop the agent steps of [quickstart-adk.md](./quickstart-adk.md); the official quickstart defines them in earlier blocks.

Adapted (not in the official docs): `"STAGING_BUCKET"` is written as `"gs://BUCKET_NAME"` (the bucket from [Create a staging bucket](setup.md#create-a-staging-bucket)), because google-cloud-aiplatform 2.10.0 rejects a value without the prefix (Notes).

```python
from vertexai import types

remote_agent = client.agent_engines.create(
    agent=app,
    config={
        "requirements": ["google-cloud-aiplatform[agent_engines,adk]"],
        "staging_bucket": "gs://BUCKET_NAME",
        "identity_type": types.IdentityType.AGENT_IDENTITY,
    }
)
```

### Workflow

1. Set up the environment (Google Cloud project, latest Agent Platform SDK for Python).
2. Develop an agent that can be deployed on Agent Runtime.
3. Deploy the agent on the Agent Runtime managed runtime.
4. Use the agent: query it by sending an API request.
5. Manage and delete deployed agents.

## Options / Props

### Framework support levels

| Support level | Agent frameworks |
|---|---|
| **Custom template** : You can adapt a custom template to support deployment to Agent Runtime from your framework. For deploying custom containers, see the [Runtime contract](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/runtime-contract). | [CrewAI](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/evaluating_crewai_agent_engine_customized_template.ipynb), [custom frameworks](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent) |
| **Agent Platform SDK integration**: Agent Runtime provides managed templates per framework in the Agent Platform SDK and documentation. | [LangChain](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-langchain-agent), [LangGraph](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-langgraph-agent), [AG2](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-ag2-agent), [LlamaIndex](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-llamaindex-agent) |
| **Full integration**: Features are integrated to work across the framework, Agent Runtime, and broader Google Cloud ecosystem. | [Agent Development Kit (ADK)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-adk-agent) - **Python** : Deploy using the [`adk` CLI](https://adk.dev/api-reference/cli/#adk-deploy-agent-engine). - **Go** : Deploy using the [`adkgo` CLI](https://github.com/google/adk-go). |

## Notes

- Any language and framework is supported as long as the agent can be containerized and conforms to the runtime contract.
- Deployment forms:
  - From a container image: Deploy a container image directly from Artifact Registry.
  - From a Dockerfile: Provide a `Dockerfile` with your source files; Agent Runtime builds and deploys the image.
- SDK module rename (version 2.0.1 of the Agent Platform SDK): `vertexai.agent_engines` was refactored into individual modules (`client.runtimes`, `client.sessions`, `client.sandboxes`, `client.memory_banks`) under the standalone `google-cloud-agentplatform` package (`agentplatform`); the Agent Runtime SDK migration guide covers moving from `vertexai.agent_engines` to `agentplatform.Client().runtimes`.
- Snippet taken from https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/quickstart-adk (the overview has no code block); `client` and `app` are created in the quickstart's earlier steps. It uses the `vertexai` client form; version 2.0.1 of the Agent Platform SDK refactored `agent_engines` into client-based modules (see the module rename bullets above).
- Because the name of Agent Runtime changed over time, the resource in the REST API reference is `ReasoningEngine` (`projects.locations.reasoningEngines`), kept for backwards compatibility.
- The Agents CLI (https://google.github.io/agents-cli/) is the unified CLI and skill set for the Agent Development Lifecycle: scaffold, evaluate, deploy, publish, observe. It provides agent templates (ReAct, RAG, multi-agent), an interactive playground, Terraform-based infrastructure, Cloud Build CI/CD pipelines, and Cloud Trace and Cloud Logging support.
- Agent2Agent (A2A) multi-agent support is labeled preview in the use-cases table.
- The client-based SDK aligns with ADK and the Google Gen AI SDK (`google-genai`) type representations, scopes project and location per client (`client = agentplatform.Client(project=..., location=...)`), and keeps a lightweight package while generative AI modules move to `google-genai`.
- Supported regions: https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-locations. Quota: https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-quotas. Pricing: https://cloud.google.com/products/gemini-enterprise-agent-platform/pricing.
- Migration guides: https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/sdk-migration and https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/python-sdk/sdk-migration.
- The source also lists an end-to-end use-case table (notebooks and blog posts) that is not reproduced here.
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: the source writes `"staging_bucket": "STAGING_BUCKET"` (defined as "Cloud Storage bucket prefixed by `gs://`"). In google-cloud-aiplatform 2.10.0, `client.agent_engines.create` calls `_validate_staging_bucket_or_raise` (`vertexai/_genai/_agent_engines_utils.py`), which raises `ValueError` unless the value starts with `gs://`.

## Related

- [setup.md](./setup.md)
- [quickstart-adk.md](./quickstart-adk.md)
- [create-an-adk-agent.md](./create-an-adk-agent.md)
- [create-a-custom-agent.md](./create-a-custom-agent.md)

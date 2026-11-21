---
source: https://docs.cloud.google.com/gemini/enterprise/docs/invoke-agent-streamassist
---

# Invoke a registered agent with streamAssist

To call a specific registered agent of a Gemini Enterprise app (formerly Agentspace), supply the optional `agentsSpec` field in a `streamAssist` REST request or client library call. The assistant routes the query directly to that agent and preserves session context across turns. The agent list is served on `v1alpha`; the `streamAssist` call itself uses `v1`.

## Signature / Usage

### Find the app ID (engine) and location

The `ENGINE_ID` segment of the engine `name` is the `APP_ID` required in the call.

Adapted (not in the official docs): the hostname is `ENDPOINT_LOCATION-discoveryengine.googleapis.com` instead of the source's `LOCATION-discoveryengine.googleapis.com`, so that the resource path keeps `locations/LOCATION` (for example `locations/global`) while the host follows the source's rule for `global` apps (`discoveryengine.googleapis.com`; see the placeholder table).

```bash
curl -X GET \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
"https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/collections/default_collection/engines"
```

### Find the agent ID

The `agentId` is the final segment of the agent's full resource name:

```text
projects/{project}/locations/{location}/collections/{collection}/engines/{engine}/assistants/{assistant}/agents/{AGENT_ID}
```

List the registered agents on the `v1alpha` endpoint:

Adapted (not in the official docs): the hostname is `ENDPOINT_LOCATION-discoveryengine.googleapis.com` instead of the source's `LOCATION-discoveryengine.googleapis.com`, so that the resource path keeps `locations/LOCATION` (for example `locations/global`) while the host follows the source's rule for `global` apps (`discoveryengine.googleapis.com`; see the placeholder table).

```bash
curl -X GET \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
"https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1alpha/projects/PROJECT_ID/locations/LOCATION/collections/default_collection/engines/APP_ID/assistants/default_assistant/agents"
```

### Request body

```json
{
  "query": {
    "text": "QUERY_TEXT"
  },
  "session": "SESSION_RESOURCE_NAME",
  "agentsSpec": {
    "agentSpecs": [
      {
        "agentId": "AGENT_ID"
      }
    ]
  }
}
```

### Call streamAssist (REST)

Adapted (not in the official docs): the hostname is `ENDPOINT_LOCATION-discoveryengine.googleapis.com` instead of the source's `LOCATION-discoveryengine.googleapis.com`, so that the resource path keeps `locations/LOCATION` (for example `locations/global`) while the host follows the source's rule for `global` apps (`discoveryengine.googleapis.com`; see the placeholder table).

```bash
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
"https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/collections/default_collection/engines/APP_ID/assistants/default_assistant:streamAssist" \
  -d '{
    "query": {
      "text": "List all contact cards."
    },
    "agentsSpec": {
      "agentSpecs": [
        {
          "agentId": "AGENT_ID"
        }
      ]
    }
  }'
```

### Call streamAssist (Python)

Adapted (not in the official docs): the loop also skips replies whose `grounded_content.content.thought` is true, as the sample's own comment says (`AssistantContent.thought` in the `discoveryengine` `v1` Discovery document: "Optional. Indicates if the part is thought from the model.").

```python
# Install library: pip install google-cloud-discoveryengine
from google.api_core.client_options import ClientOptions
from google.cloud import discoveryengine_v1 as discoveryengine

# TODO(developer): Replace placeholder values with your project and agent details.
project_id = "PROJECT_ID"
location = "LOCATION"          # For example: "us", "eu", or "global"
engine_id = "APP_ID"
agent_id = "AGENT_ID"          # The numeric agent ID
query_text = "List all contact cards."

client_options = (
    ClientOptions(api_endpoint=f"{location}-discoveryengine.googleapis.com")
    if location != "global"
    else None
)
client = discoveryengine.AssistantServiceClient(client_options=client_options)

assistant_path = client.assistant_path(
    project=project_id,
    location=location,
    collection="default_collection",
    engine=engine_id,
    assistant="default_assistant",
)

request = discoveryengine.StreamAssistRequest(
    name=assistant_path,
    query=discoveryengine.Query(text=query_text),
    agents_spec=discoveryengine.StreamAssistRequest.AgentsSpec(
        agent_specs=[
            discoveryengine.StreamAssistRequest.AgentsSpec.AgentSpec(
                agent_id=agent_id,
            )
        ]
    ),
)

for response in client.stream_assist(request=request):
    for reply in response.answer.replies:
        # Filter out model reasoning fragments (thought: true)
        if hasattr(reply, "grounded_content") and reply.grounded_content.content and not reply.grounded_content.content.thought:
            print(reply.grounded_content.content.text, end="", flush=True)

print()
```

### Continue the conversation in the same session

Pass the `session` string from `sessionInfo` of the previous response.

Adapted (not in the official docs): the hostname is `ENDPOINT_LOCATION-discoveryengine.googleapis.com` instead of the source's `LOCATION-discoveryengine.googleapis.com`, so that the resource path keeps `locations/LOCATION` (for example `locations/global`) while the host follows the source's rule for `global` apps (`discoveryengine.googleapis.com`; see the placeholder table).

```bash
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
"https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/collections/default_collection/engines/APP_ID/assistants/default_assistant:streamAssist" \
  -d '{
    "session": "projects/PROJECT_ID/locations/LOCATION/collections/default_collection/engines/APP_ID/sessions/SESSION_ID",
    "query": {
      "text": "Who is John Doe?"
    },
    "agentsSpec": {
      "agentSpecs": [
        {
          "agentId": "AGENT_ID"
        }
      ]
    }
  }'
```

## Options / Props

### At a glance

| Specification | Details |
|---|---|
| API method | `projects.locations.collections.engines.assistants.streamAssist` |
| Endpoint versions | `v1alpha` for discovering agent IDs; `v1` for calling `streamAssist` |
| Key parameter | `agentsSpec.agentSpecs[].agentId` |
| Supported agent types | Core Assistant, Deep Research, Workflow Builder chat agents (formerly low-code), and Workflow Builder workflows |
| Required IAM permission | `discoveryengine.assistants.assist` |
| Required OAuth scope | `https://www.googleapis.com/auth/cloud-platform` |

### Placeholders

| Placeholder | Description |
|---|---|
| `ENDPOINT_LOCATION` | The location prefix of the hostname (added; see Notes): `us` or `eu`. If your app resides in the `global` location, omit the location prefix from the hostname: send the request to `https://discoveryengine.googleapis.com/...` instead of `https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/...`. |
| `LOCATION` | The multi-region of the app in the resource path (`locations/LOCATION`): `global`, `us`, or `eu`. The hostname uses `ENDPOINT_LOCATION` (see Notes for the source's wording). |
| `PROJECT_ID` | Your Google Cloud project ID. |
| `APP_ID` | Your Gemini Enterprise engine ID. |
| `AGENT_ID` | The numeric agent ID. |

### Request fields

| Field | Type | Description |
|---|---|---|
| `agentsSpec` | object, optional | Specification of agents used to serve the request. |
| `agentsSpec.agentSpecs[]` | array, optional | A list of agent specifications. You can specify multiple agents in this array. |
| `agentsSpec.agentSpecs[].agentId` | string, required within the spec | The ID identifying the registered agent resource. Must conform to RFC-1034 with a maximum length of 63 characters. |

### Response elements

| Element | Description |
|---|---|
| `answer.replies[].groundedContent.content.text` | Incremental response text; concatenate fragments in receipt order. |
| `"thought": true` fragments | The model's internal reasoning; filter out when presenting the final output. |
| `answer.state` | Progresses from `IN_PROGRESS` to `SUCCEEDED` (answer generated), `SKIPPED` (query ignored or bypassed; inspect `assistSkippedReasons`, for example `NON_ASSIST_SEEKING_QUERY_IGNORED` for brief greetings) or `FAILED` (execution error). |
| `sessionInfo.session`, `assistToken` | In the terminal chunk: the session resource name and an `assistToken`. |

### Troubleshooting

| Symptom | Likely cause | Resolution |
|---|---|---|
| HTTP 404 when listing agents | Calling `agents` on the `v1` or `v1beta` endpoint. | Send the list request to the `v1alpha` endpoint instead. |
| Response appears generic despite setting `agentsSpec` | Invalid numeric `agentId`, or the query is too generic to trigger domain behavior. | Confirm the exact numeric ID from the `v1alpha` agent list; send a domain-specific query; check response text for agent-specific wording. |
| No error returned, but target agent did not execute | Malformed `agentId` caused a silent fallback to default orchestration. | Verify that the `agentId` consists of digits only and exactly matches an ID from the registry list. |
| Response state returns `SKIPPED` | Input evaluated as a non-assist-seeking query (such as a brief greeting). | Send a substantive task query; inspect `assistSkippedReasons` in the response payload. |
| `HTTP 401` or `HTTP 403 Permission Denied` | Missing OAuth scope, insufficient IAM role, or missing quota project header. | Verify the caller has `discoveryengine.assistants.assist`; ensure OAuth scope includes `cloud-platform`; add `-H "X-Goog-User-Project: PROJECT_ID"` if using ADC. |
| `HTTP 403` with `Only the agent owner or an admin can run a draft of this agent.` | The workflow has never been published, and the caller isn't its owner or an admin. | Publish the workflow in Workflow Builder and share it with the caller. |
| `HTTP 403` with `User does not have permission to access the Agent.` | The workflow isn't shared with the caller. | Share the workflow with the caller. |
| Workflow behaves like an older version | The call runs the published version, not unpublished changes in Workflow Builder. | Publish the workflow. |
| Workflow call ends with `answer.state` `FAILED` and an `INTERNAL` error | The workflow has a manual trigger plus another trigger, or more than one manual trigger. | Keep a single manual trigger. |

## Notes

- Before you begin: enable the Discovery Engine API (`discoveryengine.googleapis.com`); the principal needs a role granting `discoveryengine.assistants.assist`, such as Discovery Engine Editor (`roles/discoveryengine.editor`) or Gemini Enterprise Admin (`roles/discoveryengine.agentspaceAdmin`); the app (engine) must exist and contain at least one registered agent; with Application Default Credentials send the quota project header `-H "X-Goog-User-Project: PROJECT_ID"`.
- The source says: "`LOCATION` : The multi-region for both the hostname and resource path (`global`, `us`, or `eu`). If your app resides in the `global` location, omit the location prefix from the hostname (`discoveryengine.googleapis.com`)." The engine ID typically has a numeric suffix (for example `my-app_1234567890`).
- Registered agents use a long numeric ID (for example `15492003793394502655`). The `agents` collection is served only on `v1alpha`; listing it on `v1` or `v1beta` returns HTTP `404 Not Found`. Each agent resource has `name`, `displayName`, `state` (such as `ENABLED` or `PRIVATE`) and a definition object (such as `a2aAgentDefinition`, `lowCodeAgentDefinition` or `workflowAgentDefinition`).
- If the `session` field is omitted or the session ID is `-`, the API generates a new, isolated session.
- Calling a workflow: send the same request with the workflow's ID as `agentId`; each call starts a manual run. The published version runs (unpublished changes do not affect callers; a never-published workflow runs its draft). The owner and admins can call it; other users can call a published workflow after it is shared with them; only the owner or an admin can call a never-published workflow (others get `HTTP 403`). The workflow must have exactly one manual trigger. You cannot set the manual trigger's input variables through `streamAssist`: a required input makes the run fail even with a default value, optional inputs are empty and defaults are not applied; the query text is passed to the workflow's LLM nodes.
- Limitations: A2A or ADK agents registered to a Gemini Enterprise app are not supported through `streamAssist` (call an A2A agent through its registry A2A endpoint instead: https://docs.cloud.google.com/gemini/enterprise/docs/invoke-agent-a2a). `streamAssist` is optimized for conversational queries and read-only retrieval over connectors; programmatic execution of mutative tools and actions (such as email drafting, calendar event creation or chat messaging) is not supported and may result in silent failures or ungrounded execution loops. If an agent relies on internal connectors or data stores (such as Document Q&A agents), invoking it without configured data sources returns a "no data sources configured" response rather than an API error.
- Corrected from the official docs: the REST examples write the host as `"https://LOCATION-discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/..."` (and `/v1alpha/` for the agent list), with the same `LOCATION` in the host and the path. Substituting `global` gives `global-discoveryengine.googleapis.com`, which contradicts the source's own instruction to omit the prefix for `global` apps (as the Python sample does with `if location != "global"`). The host prefix is the separate placeholder `ENDPOINT_LOCATION`.
- Corrected from the official docs: the Python sample's comment says "Filter out model reasoning fragments (thought: true)", but the source's condition is `if hasattr(reply, "grounded_content") and reply.grounded_content.content:`, which prints thought fragments too. The condition adds `and not reply.grounded_content.content.thought` (`AssistantContent.thought` in the `discoveryengine` `v1` Discovery document; `google-cloud-discoveryengine` is not pinned for this skill set, so the attribute name follows the REST field `thought`).
- The twin's REST call and Python blocks end with a whitespace-only line, which is omitted here. The Python sample uses the `google-cloud-discoveryengine` client library (`discoveryengine_v1`).
- Source inconsistency (global host): for a `global` app (`ENDPOINT_LOCATION` = `global` on those pages), the Gemini Enterprise pages on app IAM policies and ADK / A2A agent registration show example commands with `https://global-discoveryengine.googleapis.com/...`, while this page says "If your app resides in the `global` location, omit the location prefix from the hostname (`discoveryengine.googleapis.com`)." The `discoveryengine` `v1` / `v1beta` / `v1alpha` Discovery documents give the `rootUrl` `https://discoveryengine.googleapis.com/`. This page follows its own source rule: `ENDPOINT_LOCATION` is `us` or `eu`, and a `global` app uses `discoveryengine.googleapis.com` (see the Corrected line above); the other pages keep their `global-` form as written.
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/invoke-agent-streamassist (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [register-and-manage-an-a2a-agent.md](./register-and-manage-an-a2a-agent.md)
- [register-and-manage-an-adk-agent.md](./register-and-manage-an-adk-agent.md)
- [share-custom-agents.md](./share-custom-agents.md)

---
source: https://docs.cloud.google.com/gemini/enterprise/docs/register-and-manage-an-adk-agent
---

# Register and manage an ADK agent in Gemini Enterprise

Administrators register Agent Development Kit (ADK) agents that are deployed on Agent Runtime (formerly Vertex AI Agent Engine) with a Gemini Enterprise app (formerly Agentspace), so that end users can use them in the Gemini Enterprise web app. The Agent Runtime service processes the agent queries. This page covers authorization resources, registration, listing, viewing, updating and deleting through the Discovery Engine REST API (`v1alpha`).

## Signature / Usage

### Resource path of the Agent Runtime agent

In this path `PROJECT_ID` and `LOCATION` are the project and the region of the Agent Runtime agent, which can differ from the Gemini Enterprise app's project and multi-region (the REST examples below write them as `RUNTIME_PROJECT_ID` and `RESOURCE_LOCATION`).

```text
projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID
```

### Authorization URI template (optional authorization)

```text
https://accounts.google.com/o/oauth2/v2/auth?client_id=OAUTH_CLIENT_ID&redirect_uri=https%3A%2F%2Fvertexaisearch.cloud.google.com%2Fstatic%2Foauth%2Foauth.html&scope=YOUR_CUSTOM_SCOPES&include_granted_scopes=true&response_type=code&access_type=offline&prompt=consent
```

### Add an authorization resource (optional)

Needed only if the agent must access Google Cloud resources on behalf of a user. The example reads the OAuth client secret without echo, builds the JSON body with `jq` from standard input and sends it to `curl` on standard input, so the secret does not appear in the shell history or in any process argument (requires `jq`). Run the `read` line on its own first and type the secret, then run the rest of the block.

Adapted (not in the official docs): instead of writing `"clientSecret": "OAUTH_CLIENT_SECRET"` in the `curl -d` argument, the secret is read with `read -rs`, piped by the `printf` builtin into `jq -Rs` (which places it as `"clientSecret": .`) and the body is sent with `curl ... --data @-`; `unset` clears the variable afterwards. The URL, headers and every other body field are unchanged.

```bash
read -rs OAUTH_CLIENT_SECRET
printf '%s' "$OAUTH_CLIENT_SECRET" | jq -Rs '{
      "name": "projects/PROJECT_NUMBER/locations/LOCATION/authorizations/AUTH_ID",
      "serverSideOauth2": {
         "clientId": "OAUTH_CLIENT_ID",
         "clientSecret": .,
         "authorizationUri": "OAUTH_AUTH_URI",
         "tokenUri": "OAUTH_TOKEN_URI"
      }
   }' | curl -X POST \
   -H "Authorization: Bearer $(gcloud auth print-access-token)" \
   -H "Content-Type: application/json" \
   -H "X-Goog-User-Project: PROJECT_ID" \
   "https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1alpha/projects/PROJECT_NUMBER/locations/LOCATION/authorizations?authorizationId=AUTH_ID" \
   --data @-
unset OAUTH_CLIENT_SECRET
```

### Register an ADK agent

Adapted (not in the official docs): the two `locations/global` segments (the engine path in the URL and the `toolAuthorizations` entry) are replaced with `locations/LOCATION`, so the request names the app and the authorization resource in the location where they were created; with `LOCATION` = `global` the request is the same as the source's. The project in the `reasoningEngine` value is the separate placeholder `RUNTIME_PROJECT_ID` (the source writes `PROJECT_ID`, the same placeholder as the app's project in the URL), because the Agent Runtime agent can be hosted in a different project.

```bash
   curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      -H "X-Goog-User-Project: PROJECT_ID" \
      "https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1alpha/projects/PROJECT_ID/locations/LOCATION/collections/default_collection/engines/APP_ID/assistants/default_assistant/agents" \
      -d '{
         "displayName": "DISPLAY_NAME",
         "description": "DESCRIPTION",
         "icon": {
            "uri": "ICON_URI"
         },
         "adkAgentDefinition": {
            "provisionedReasoningEngine": {
               "reasoningEngine": "projects/RUNTIME_PROJECT_ID/locations/RESOURCE_LOCATION/reasoningEngines/RESOURCE_ID"
            }
         },
         "authorizationConfig": {
            "toolAuthorizations": [
               "projects/PROJECT_NUMBER/locations/LOCATION/authorizations/AUTH_ID"
            ]
         }
      }'
```

### List agents connected to an app

```bash
curl -X GET \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
"https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1alpha/projects/PROJECT_ID/locations/LOCATION/collections/default_collection/engines/APP_ID/assistants/default_assistant/agents"
```

If the agent is not prebuilt by Google, the response includes a `name` field whose last path segment is the Agent ID:

```text
{
"name": "projects/123456/locations/global/collections/default_collection/engines/my-app/assistants/default_assistant/agents/12345678901234567890",
...
}
```

### View the details of an ADK agent

```bash
curl -X GET \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
"https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1alpha/projects/PROJECT_ID/locations/LOCATION/collections/default_collection/engines/APP_ID/assistants/default_assistant/agents/AGENT_ID"
```

### Update an ADK agent

Adapted (not in the official docs): the `reasoningEngine` string, which the source breaks across lines inside the quotes (`.../reasoningEngine` / `s/RESOURCE_ID"`), is joined into one line, and the trailing comma after the `provisionedReasoningEngine` object is removed, so the body is valid JSON. The project in the `reasoningEngine` value is the separate placeholder `RUNTIME_PROJECT_ID` (the source writes `PROJECT_ID`, the same placeholder as the `X-Goog-User-Project` header), because the Agent Runtime agent can be hosted in a different project.

```bash
curl -X PATCH \
   -H "Authorization: Bearer $(gcloud auth print-access-token)" \
   -H "Content-Type: application/json" \
   -H "X-Goog-User-Project: PROJECT_ID" \
   "https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1alpha/AGENT_RESOURCE_NAME" \
   -d '{
         "displayName": "DISPLAY_NAME",
         "description": "DESCRIPTION",
         "adkAgentDefinition": {
         "provisionedReasoningEngine": {
            "reasoningEngine":
            "projects/RUNTIME_PROJECT_ID/locations/RESOURCE_LOCATION/reasoningEngines/RESOURCE_ID"
         }
      }
   }'
```

### Delete an ADK agent

```bash
curl -X DELETE \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
"https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1alpha/projects/PROJECT_ID/locations/LOCATION/collections/default_collection/engines/APP_ID/assistants/default_assistant/agents/AGENT_ID"
```

## Options / Props

### Agent governance

| Agent governance | Description |
|---|---|
| Secure communication | The connection between Agent Runtime and Gemini Enterprise is compliant with VPC Service Controls (VPC-SC), ensuring secure data exchange. |
| Cross-project agent support | You can connect ADK agents hosted in a different Google Cloud project. Gemini Enterprise uses Google Cloud's secure private networking for these cross-project connections. |
| Personalized interactions | ADK agents receive the user's email address from Gemini Enterprise, so agents can recognize individual users and personalize responses based on identity and permissions. |

### Placeholders

| Placeholder | Description |
|---|---|
| `ENDPOINT_LOCATION` | The multi-region for the API request: `us` (US multi-region), `eu` (EU multi-region) or `global` (Global location). For the `global` host form, see Notes. |
| `LOCATION` | The multi-region of the app / data store: `global`, `us` or `eu`. |
| `PROJECT_ID` / `PROJECT_NUMBER` | The ID / number of the Google Cloud project. |
| `APP_ID` | The unique identifier of the Gemini Enterprise app. |
| `AUTH_ID` | The ID of the authorization resource (an arbitrary alphanumeric ID that you define; referenced later when registering an agent that requires OAuth). |
| `ICON_URI` | The public URI of the icon; alternatively pass Base64-encoded image file contents and use `icon.content`. |
| `RESOURCE_ID` | The ID of the Agent Runtime endpoint where the ADK agent is deployed. |
| `RUNTIME_PROJECT_ID` | The ID of the Google Cloud project that hosts the Agent Runtime agent (added; see Notes). Same as `PROJECT_ID` when the agent and the app are in the same project. |
| `RESOURCE_LOCATION` | The cloud location of the Agent Runtime endpoint. |
| `AGENT_ID` | The ID of the agent, found by listing the agents connected to the app. |
| `AGENT_RESOURCE_NAME` | The resource name of the agent registration to update. |

### Agent Runtime location compatibility

| Gemini Enterprise app location | Allowed Agent Runtime location(s) |
|---|---|
| `global` | Any supported Google Cloud region |
| `us` | Any region starting with `us-`, such as `us-central1` or `us-east4` |
| `eu` | Any region starting with `europe-`, such as `europe-west1` or `europe-west3` |

### Authorization URI parameters

| Parameter | Value or action |
|---|---|
| `client_id` | The `client_id` found in the downloaded OAuth client JSON. |
| `redirect_uri` | Must be `https://vertexaisearch.cloud.google.com/static/oauth/oauth.html`. |
| `scope` | The Google API scopes the app needs; separate multiple scopes with a space (`%20` in the URL). |
| `include_granted_scopes` | Must be `true`. |
| `response_type` | Must be `code`. |
| `access_type` | `offline`, to receive a refresh token. |
| `prompt` | `consent`, so the user is always shown a consent screen. |

## Notes

- Requirements: the Gemini Enterprise Admin role (`roles/discoveryengine.agentspaceAdmin`), the Discovery Engine API enabled (the API behind Agent Search and Gemini Enterprise keeps the name Discovery Engine), an existing Gemini Enterprise app, and an ADK agent hosted on Agent Runtime. The agent must be hosted and maintained on Agent Runtime to work in Gemini Enterprise. If the ADK agent is hosted in a different Google Cloud project than the Gemini Enterprise app, you must grant the necessary permissions first: https://docs.cloud.google.com/gemini/enterprise/docs/configure-cross-project-adk-agents.
- Agent Runtime ML processing terms apply to registered agents (see Agent Runtime limitations on the Gemini Enterprise locations page).
- Model Armor: to secure ADK agents, developers must configure Model Armor using the REST API within the agent's application code. The Model Armor settings in the Google Cloud console for Gemini Enterprise do not automatically protect ADK agents.
- Optional authorization: create an OAuth client ID (application type Web application) with the authorized redirect URIs `https://vertexaisearch.cloud.google.com/oauth-redirect` and `https://vertexaisearch.cloud.google.com/static/oauth/oauth.html`, then download the JSON (Client ID, Authorization URI, Token URI, Client secret). The authorization resource carries a client secret: store it securely and do not commit it.
- Quota: registering an agent consumes one unit of the project's pooled daily agent creation quota (`discoveryengine.googleapis.com/agents_tier_enterprise_regional`). Quota follows the Gemini Enterprise Standard licenses (1 creation per user per day, pooled) or Plus licenses (10 per user per day, pooled) distributed to the project; Frontline licenses provide 0 creation quota. Each `agents.create` call counts, so scripts or CI/CD pipelines registering an agent across many apps can hit `HTTP 429 RESOURCE_EXHAUSTED: Agent creation quota exceeded`.
- Update: "You can update all fields during the agent registration. However, the following fields must be updated:" `displayName`, `description` and `reasoningEngine` (as the source writes it). `DISPLAY_NAME` and `DESCRIPTION` are marked required in the placeholder list.
- Corrected from the official docs: the source's register example writes `.../locations/global/collections/default_collection/engines/APP_ID/assistants/default_assistant/agents` and `"projects/PROJECT_NUMBER/locations/global/authorizations/AUTH_ID"` while its host is `ENDPOINT_LOCATION-discoveryengine.googleapis.com` with `us` / `eu` / `global`. The same source creates the authorization resource as `"name": "projects/PROJECT_NUMBER/locations/LOCATION/authorizations/AUTH_ID"` and lists, views and deletes agents of the same app at `.../locations/LOCATION/collections/default_collection/engines/APP_ID/assistants/default_assistant/agents`; the A2A registration page registers at the same path with `locations/LOCATION` and references `"agentAuthorization": "projects/PROJECT_ID/locations/LOCATION/authorizations/AUTH_ID"`. The example above therefore uses `locations/LOCATION` in both places.
- Corrected from the official docs: the register and update examples write `"reasoningEngine": "projects/PROJECT_ID/locations/RESOURCE_LOCATION/reasoningEngines/RESOURCE_ID"` and define `PROJECT_ID` as "the ID of your Google Cloud project", the same placeholder as the app's project in the register URL and the `X-Goog-User-Project` header. The same source says "You can connect ADK agents hosted in a different Google Cloud" project and "If your ADK agent is hosted in a different Google Cloud project than your Gemini Enterprise app, you must grant necessary permissions." The examples therefore use `RUNTIME_PROJECT_ID` for the Agent Runtime project; the source does not name a separate placeholder.
- Adapted from the official docs: the source's authorization request writes `"clientSecret": "OAUTH_CLIENT_SECRET"` inside the `curl -d '{...}'` argument, so the real secret would land in the shell history and in the process arguments of `curl`. The example reads it with `read -rs`, builds the body with `jq -Rs` from standard input and sends it with `--data @-` (tested with `jq` 1.7.1: the resulting body equals the source's body with the secret substituted, including quotes, backslashes and `$` in the secret).
- Calling the agent: the streamAssist page states "A2A or ADK agents registered to a Gemini Enterprise app are not supported through `streamAssist`." (https://docs.cloud.google.com/gemini/enterprise/docs/invoke-agent-streamassist); a registered ADK agent is used from the Gemini Enterprise web app.
- Delete removes the agent registration from the app; try it in a disposable project first. The source's example result is a long-running-style response `{"name": ".../operations/delete-agent-12345678901234567890", "done": true}`.
- Corrected from the official docs: the source's PATCH example splits the string `"projects/PROJECT_ID/locations/RESOURCE_LOCATION/reasoningEngine` / `s/RESOURCE_ID"` across two lines (a raw line break inside a JSON string is invalid) and leaves a trailing comma (`},` before the closing brace). The `discoveryengine.v1alpha` Discovery document gives the format `projects/{project}/locations/{location}/reasoningEngines/{reasoning_engine}`; the body above joins the string to that form and removes the comma, keeping the source's other lines and indentation.
- API version: all agent endpoints on this page use `v1alpha` (the Discovery Engine Discovery document defines `adkAgentDefinition.provisionedReasoningEngine.reasoningEngine`, `authorizationConfig.toolAuthorizations` and `serverSideOauth2` in `v1alpha`).
- Best practices for latency and reliability: minimize sequential multi-agent hops and redundant summarization (wrap sub-agents with `AgentTool(..., skip_summarization=True)` when the parent does not need to re-summarize); configure `min_instances`, `resource_limits` (`cpu` and `memory`) and `container_concurrency` when deploying to Agent Runtime; pin the same versions of `google-adk`, `google-cloud-aiplatform` and `cloudpickle` in the deployment `requirements` as in the local build; use the `global` endpoint (or Provisioned Throughput) for Gemini model calls on Vertex AI and set explicit connection timeouts and bounded retries on external tool calls.
- Agents are Google ADK / Agent Runtime agents, not Claude Code or Agent SDK agents.
- The source also shows Console steps for registering, updating and the authorization form, and a sample `fun_facts` agent in the `adk-samples` repository.
- Source inconsistency (global host): for `ENDPOINT_LOCATION` = `global`, the Gemini Enterprise pages on app IAM policies and ADK / A2A agent registration show example commands with `https://global-discoveryengine.googleapis.com/...`, while the streamAssist page says "If your app resides in the `global` location, omit the location prefix from the hostname (`discoveryengine.googleapis.com`)." The `discoveryengine` `v1` / `v1beta` / `v1alpha` Discovery documents give the `rootUrl` `https://discoveryengine.googleapis.com/`. Both forms are kept as written. `ENDPOINT_LOCATION` (or the `LOCATION` prefix of the host) sets only the hostname; the `locations/...` segment of the resource path is a separate value.
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/register-and-manage-an-adk-agent (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [register-and-manage-an-a2a-agent.md](./register-and-manage-an-a2a-agent.md)
- [share-custom-agents.md](./share-custom-agents.md)
- [import-govern-agent-registry.md](./import-govern-agent-registry.md)

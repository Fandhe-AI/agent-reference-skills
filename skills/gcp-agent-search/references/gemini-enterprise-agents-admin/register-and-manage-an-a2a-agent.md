---
source: https://docs.cloud.google.com/gemini/enterprise/docs/register-and-manage-an-a2a-agent
---

# Register and manage an A2A agent in Gemini Enterprise

Preview. Administrators connect agents built with the Agent2Agent (A2A) Protocol and hosted on any platform to a Gemini Enterprise app (formerly Agentspace), making them available in the Gemini Enterprise web app. This page covers prerequisites, how Gemini Enterprise authenticates with the agent (Cloud Run IAM header, end-user OAuth 2.0, 3-legged OAuth with Agent Identity auth manager), securing the endpoint with Apigee, and registration through the Discovery Engine REST API (`v1alpha`).

## Signature / Usage

### Grant Cloud Run Invoker to the Discovery Engine service agent

Needed if the A2A agent is hosted on Cloud Run, uses a default `.run.app` URL directly, and requires authentication (not when Cloud Run is behind Apigee, a load balancer or a custom domain).

Adapted (not in the official docs): the source wraps the placeholders in `<var>` tags inside the command; they are plain upper-case placeholders here. The source grants the role on the whole project with `gcloud projects add-iam-policy-binding PROJECT_ID`, which lets the service agent invoke every Cloud Run service in the project; the command is scoped to the agent's Cloud Run service with `gcloud run services add-iam-policy-binding SERVICE_NAME --project=PROJECT_ID --region=REGION` (gcloud 593.0.0 help; `--project` keeps the source's `PROJECT_ID`), where `SERVICE_NAME` is the Cloud Run service that hosts the agent and `REGION` its region (see the Cloud Run Invoker placeholders table).

```bash
gcloud run services add-iam-policy-binding SERVICE_NAME \
   --project="PROJECT_ID" \
   --region="REGION" \
   --member="serviceAccount:service-PROJECT_NUMBER@gcp-sa-discoveryengine.iam.gserviceaccount.com" \
   --role="roles/run.invoker"
```

### Agent card JSON (Console)

```json
{
  "protocolVersion": "0.3",
  "name": "Hello World Agent",
  "description": "Just a hello world agent",
  "url": "https://example.com/myagent",
  "iconUrl": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTkiIGhlaWdodD0iOTkiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOmdyYXk7IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0zMyAwaDMzdjMzSDMzeiBNMCAzM2gzM3YzM0gweiBNNjYgMzNoMzN2MzNINjZ6IE0zMyA2NmgzM3YzM0gzM3oiIGZpbGw9ImJsdWUiLz48L3N2Zz4=",
  "version": "1.0.0",
  "capabilities": {
  },
  "skills": [
    {
      "id": "data-analysis",
      "name": "Data Analysis",
      "description": "Data analysis",
      "tags": []
    }
  ],
  "defaultInputModes": [
    "text/plain"
  ],
  "defaultOutputModes": [
    "text/plain"
  ]
}
```

### Register an A2A agent (REST)

Uses the `agents.create` method (`v1alpha`) with the required fields only.

```bash
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1alpha/projects/PROJECT_ID/locations/LOCATION/collections/default_collection/engines/APP_ID/assistants/default_assistant/agents \
-d '
{
  "name": "AGENT_NAME",
  "displayName": "AGENT_DISPLAY_NAME",
  "description": "AGENT_DESCRIPTION",
  "a2aAgentDefinition": {
    "jsonAgentCard": "{\"protocolVersion\":\"PROTOCOLVERSION\",\"name\":\"AGENT_NAME\",\"description\":\"AGENT_DESCRIPTION\",\"url\":\"AGENT_URL\",\"version\":\"AGENT_VERSION\",\"defaultInputModes\":[\"INPUT_MODE\"],\"defaultOutputModes\":[\"OUTPUT_MODE\"],\"capabilities\":{ CAPABILITIES },\"skills\":[SKILLS]}"
  },
  "authorizationConfig": {
    "agentAuthorization": "projects/PROJECT_ID/locations/LOCATION/authorizations/AUTH_ID"
  }
}
'
```

### Show author and contact information (optional)

Add the agent metadata extension to `capabilities.extensions` of the agent card JSON (inside the escaped `jsonAgentCard` string in REST).

```json
{
  "capabilities": {
    "extensions": [
      {
        "uri": "https://www.googleapis.com/gemini-enterprise/a2a/extensions/agent_metadata/v1",
        "params": {
          "authorName": "Example Team",
          "contactEmail": "agent-support@example.com"
        }
      }
    ]
  }
}
```

### 3-legged OAuth with Agent Identity auth manager (ADK + A2A on Agent Runtime)

An ADK A2A agent that uses `GcpAuthProviderScheme` with `McpToolset` to authenticate to an MCP server on behalf of the user:

```python
from a2a.types import AgentInterface, AgentSkill
from a2a.utils.constants import PROTOCOL_VERSION_0_3, PROTOCOL_VERSION_1_0, TransportProtocol
from google.adk.a2a.executor.a2a_agent_executor import A2aAgentExecutor
from google.adk.agents import LlmAgent
from google.adk.artifacts.in_memory_artifact_service import InMemoryArtifactService
from google.adk.auth.credential_manager import CredentialManager
from google.adk.integrations.agent_identity import GcpAuthProvider, GcpAuthProviderScheme
from google.adk.memory.in_memory_memory_service import InMemoryMemoryService
from google.adk.runners import Runner
from google.adk.sessions.in_memory_session_service import InMemorySessionService
from google.adk.tools.mcp_tool.mcp_session_manager import StreamableHTTPConnectionParams
from google.adk.tools.mcp_tool.mcp_toolset import McpToolset
from vertexai.agent_engines.templates.a2a import A2aAgent, create_agent_card

# Redirect URI for Gemini Enterprise user validation
CONTINUE_URI = "https://vertexaisearch.cloud.google.com/validateUserId"

auth_scheme = GcpAuthProviderScheme(
    name="projects/`PROJECT_ID`/locations/`LOCATION`/authProviders/`AUTH_PROVIDER_NAME`",
    scopes=["`OAUTH_SCOPE`"],
    continue_uri=CONTINUE_URI,
)

mcp_tools = McpToolset(
    connection_params=StreamableHTTPConnectionParams(
        url="`https://YOUR_MCP_SERVER_URL`"
    ),
    auth_scheme=auth_scheme,
)

# Alternatively, if your MCP server is registered in Agent Registry
# with an outbound auth provider binding, use AgentRegistry.get_mcp_toolset:
# from google.adk.integrations.agent_registry import AgentRegistry
# registry = AgentRegistry(project_id="`PROJECT_ID`", location="`LOCATION`")
# mcp_tools = registry.get_mcp_toolset(
#     mcp_server_name="projects/`PROJECT_ID`/locations/`LOCATION`/mcpServers/`MCP_SERVER_ID`",
#     continue_uri=CONTINUE_URI,
# )

adk_agent = LlmAgent(
    model="gemini-2.5-flash",
    name="`AGENT_NAME`",
    description="`AGENT_DESCRIPTION`",
    instruction="`AGENT_INSTRUCTIONS`",
    tools=[mcp_tools],
)

def build_runner() -> Runner:
    # Register GcpAuthProvider inside the deployed worker process
    CredentialManager.register_auth_provider(GcpAuthProvider())
    return Runner(
        app_name=adk_agent.name,
        agent=adk_agent,
        artifact_service=InMemoryArtifactService(),
        session_service=InMemorySessionService(),
        memory_service=InMemoryMemoryService(),
    )

agent_card = create_agent_card(
    agent_name="`AGENT_DISPLAY_NAME`",
    description="`AGENT_DESCRIPTION`",
    skills=[
        AgentSkill(
            id="`SKILL_ID`",
            name="`SKILL_NAME`",
            description="`SKILL_DESCRIPTION`",
            tags=[],
        )
    ],
)

agent_card.supported_interfaces = [
    AgentInterface(
        protocol_binding=TransportProtocol.HTTP_JSON,
        protocol_version=PROTOCOL_VERSION_1_0,
        url="",
    ),
    AgentInterface(
        protocol_binding=TransportProtocol.HTTP_JSON,
        protocol_version=PROTOCOL_VERSION_0_3,
        url="",
    ),
]

a2a_agent = A2aAgent(
    agent_card=agent_card,
    agent_executor_builder=lambda: A2aAgentExecutor(runner=build_runner),
)
```

Deploy to Agent Runtime with `identity_type=types.IdentityType.AGENT_IDENTITY`.

Adapted (not in the official docs): the source wraps the placeholders in `<var>` tags inside the code; they are plain upper-case placeholders here.

```python
import vertexai
from vertexai import types

client = vertexai.Client(
    project="PROJECT_ID",
    location="LOCATION",
    http_options=dict(api_version="v1beta1"),
)

remote_a2a_agent = client.agent_engines.create(
    agent=a2a_agent,
    config={
        "display_name": "AGENT_DISPLAY_NAME",
        "identity_type": types.IdentityType.AGENT_IDENTITY,
        "requirements": [
            "a2a-sdk[http-server]>=1.0.0",
            "google-cloud-aiplatform[agent_engines,adk]>=1.156.0",
            "google-adk[a2a,agent-identity,mcp]>2.7.1",
            "google-genai",
            "httpx",
        ],
    },
)
```

Then grant the Agent Identity User role on the auth provider to the deployed agent's SPIFFE principal.

Adapted (not in the official docs): the source wraps the placeholders in `<var>` tags inside the command; they are plain upper-case placeholders here.

```bash
gcloud agent-identity auth-providers add-iam-policy-binding AUTH_PROVIDER_NAME \
    --project="PROJECT_ID" \
    --location="LOCATION" \
    --role="roles/agentidentity.user" \
    --member="principal://agents.global.org-ORGANIZATION_ID.system.id.goog/resources/aiplatform/projects/PROJECT_NUMBER/locations/LOCATION/reasoningEngines/ENGINE_ID"
```

## Options / Props

### Authentication headers sent by Gemini Enterprise

| Header | Description |
|---|---|
| `X-Serverless-Authorization` | Service-to-service IAM authentication for Cloud Run: Gemini Enterprise generates a Google-signed OIDC ID token for the Discovery Engine service agent (`service-PROJECT_NUMBER@gcp-sa-discoveryengine.iam.gserviceaccount.com`) with the agent URL as audience. Sent only when the agent URL is a default `.run.app` URL; not sent for Apigee, a load balancer or a custom domain. Cloud Run consumes it to verify `roles/run.invoker`. |
| `Authorization` | End-user OAuth 2.0 access or ID token (for example `Bearer USER_OAUTH_TOKEN`), sent when OAuth 2.0 credentials are configured for the agent. Cloud Run forwards it to the container. For A2A agents hosted on Agent Runtime, an OAuth 2.0 authorization resource with the `https://www.googleapis.com/auth/cloud-platform` scope lets Gemini Enterprise authenticate to the Agent Runtime endpoint on behalf of the user. |

### Agent metadata extension `params` (both optional)

| Parameter | Description |
|---|---|
| `authorName` | The name of the person, team or company that built the agent. Shown as **By AUTHOR_NAME** in the agent gallery (only when the agent has no owner name of its own) and as **Author** in the **Agent Info** dialog. Names that contain the word "Google" are not shown. |
| `contactEmail` | An email address where users can reach the author; shown as **Contact** in the **Agent Info** dialog. |

### Cloud Run Invoker placeholders

| Placeholder | Description |
|---|---|
| `SERVICE_NAME` | The Cloud Run service that hosts the A2A agent (added; see Notes). |
| `REGION` | The region of that Cloud Run service (added; see Notes). |

### Register request placeholders

| Placeholder | Description |
|---|---|
| `ENDPOINT_LOCATION` | The multi-region for the API request: `us`, `eu` or `global`. For the `global` host form, see Notes. |
| `LOCATION` | The multi-region of the data store / app: `global`, `us` or `eu`. |
| `APP_ID` | The ID of the app with which to register the agent. |
| `AGENT_NAME` | The unique identifier for the agent. |
| `PROTOCOLVERSION` | The A2A protocol version the agent supports. |
| `AGENT_URL` | The endpoint URL of the agent. |
| `INPUT_MODE` / `OUTPUT_MODE` | Default input / output media type, for example `text/plain`, `application/json` or `image/png`. |
| `CAPABILITIES` | A JSON object of supported A2A features, for example `\"streaming\": true` or `\"pushNotifications\": false`. |
| `SKILLS` | A list of `AgentSkill` objects the agent offers. The example already has the array brackets (`"skills":[SKILLS]`), so replace `SKILLS` with the comma-separated objects only, not with a JSON array. |
| `AUTH_ID` | The authorization resource ID created earlier (`authorizationConfig.agentAuthorization`). |

## Notes

- Preview: this feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms; Pre-GA features are available "as is" and might have limited support.
- Prerequisites: the Gemini Enterprise Admin role, the Discovery Engine API enabled, an existing Gemini Enterprise app, and an agent that uses the A2A protocol that you host and maintain. Gemini Enterprise supports the A2A v0.3 streaming mechanism; if you use A2A v1.0.0 or later, use the SDK compatibility packages (for example `a2acompat/a2av0` for Go or `a2a.compat.v0_3` for Python).
- Model Armor: to secure A2A agents, developers must configure Model Armor using the REST API within the agent's application code. The Model Armor settings in the Google Cloud console for Gemini Enterprise do not automatically protect A2A agents.
- Agent Gateway: traffic to A2A agents added through this method does not go through Agent Gateway, and Agent Gateway policies do not apply.
- The `roles/run.invoker` binding above lets the Discovery Engine service agent of that project invoke the agent's Cloud Run service; it is set on that one service, not on the project.
- Corrected from the official docs: the source writes `gcloud projects add-iam-policy-binding <var>PROJECT_ID</var> \` with `--member="serviceAccount:service-<var>PROJECT_NUMBER</var>@gcp-sa-discoveryengine.iam.gserviceaccount.com"` and `--role="roles/run.invoker"`. A project-level binding is inherited by every Cloud Run service in the project, so the command is changed to `gcloud run services add-iam-policy-binding SERVICE_NAME --project="PROJECT_ID" --region="REGION"` with the same member and role (synopsis from the gcloud 593.0.0 help: `gcloud run services add-iam-policy-binding SERVICE --member=PRINCIPAL --role=ROLE [--region=REGION]`).
- `roles/agentidentity.user` (Agent Identity User) is written as in the source; it is not listed in the IAM roles reference pages generated for this skill set, and the gcloud 593.0.0 help for `gcloud agent-identity auth-providers add-iam-policy-binding` uses the same role ID in its example.
- Corrected from the official docs: the source writes placeholders inside the two `gcloud` commands and the Python client example as `<var>PROJECT_ID</var>` (and similar) HTML tags. In the `bash` commands an unquoted `<var>` is parsed as an input redirection, so the tags break the command; in the Python example they are only string content, and they are removed there because the source's own placeholder lists name the same placeholders bare (`PROJECT_ID`, `LOCATION`, `AGENT_DISPLAY_NAME`).
- Securing the endpoint: Gemini Enterprise does not use the `securitySchemes` and `security` fields of the agent card to authenticate, does not support the `apiKey` security scheme, and cannot add static API keys or custom header values to requests. With an Apigee API proxy the proxy receives the end-user `Authorization` token but not `X-Serverless-Authorization`: configure OAuth 2.0 for the agent (required), set the agent card `url` to the proxy URL, and validate the token in the proxy (VerifyJWT policy for signed JWT access tokens from third-party providers; for Google OAuth 2.0 `ya29...` opaque tokens use a ServiceCallout policy to call `https://oauth2.googleapis.com/tokeninfo` and verify `aud` and `scope`).
- 3LO flow: when the agent returns an `adk_request_credential` interrupt (`TASK_STATE_AUTH_REQUIRED`), the web app prompts the user, the auth provider redirects to `https://vertexaisearch.cloud.google.com/validateUserId`, and Gemini Enterprise resumes the conversation. Auth provider settings: add the callback redirect URI `https://agentidentitycredentials.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/authProviders/AUTH_PROVIDER_NAME/oauthcallback` to the OAuth client (plus `https://vertexaisearch.cloud.google.com/oauth-redirect` if the client is reused for the agent authorization resource) and set the continue URI to `https://vertexaisearch.cloud.google.com/validateUserId`.
- 3LO agent code requirements: include `a2a-sdk[http-server]>=1.0.0`, `google-cloud-aiplatform[agent_engines,adk]>=1.156.0` and `google-adk[a2a,agent-identity,mcp]>2.7.1`; set `continue_uri` to the validation endpoint; call `CredentialManager.register_auth_provider(GcpAuthProvider())` inside the runner builder function; use the built-in `A2aAgentExecutor` (not a custom executor that only checks `event.is_final_response()`); append an `AgentInterface` with `protocol_version=PROTOCOL_VERSION_0_3` and `protocol_binding=TransportProtocol.HTTP_JSON` to `agent_card.supported_interfaces`. After deployment, register the agent via **Custom agent via A2A** or via Agent Registry import with an OAuth 2.0 authorization resource using the `cloud-platform` scope.
- Authorization resource (optional; when the agent must access Google Cloud resources on behalf of a user): create an OAuth client ID (Web application) with the authorized redirect URIs `https://vertexaisearch.cloud.google.com/oauth-redirect` and `https://vertexaisearch.cloud.google.com/static/oauth/oauth.html`, then register it with `POST https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1alpha/projects/PROJECT_NUMBER/locations/LOCATION/authorizations?authorizationId=AUTH_ID` and a `serverSideOauth2` object (`clientId`, `clientSecret`, `authorizationUri`, `tokenUri`); that request is omitted here. The registration references it through `authorizationConfig.agentAuthorization`. If the agent is hosted on Agent Runtime, create the authorization with the `cloud-platform` scope (for example `&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloud-platform`).
- Quota: registering an agent consumes one unit of the project's pooled daily agent creation quota (`discoveryengine.googleapis.com/agents_tier_enterprise_regional`): 1 creation per user per day (pooled) per Standard license, 10 per user per day (pooled) per Plus license, 0 for Frontline licenses. Multi-app rollouts can hit `HTTP 429 RESOURCE_EXHAUSTED: Agent creation quota exceeded`.
- The source also documents list (`GET .../assistants/default_assistant/agents`), view (`GET .../agents/AGENT_ID`), update (`agents.patch`: `PATCH .../agents/AGENT_ID` with the same body fields as the register request) and delete (`DELETE .../agents/AGENT_ID`) on `v1alpha`; those blocks are omitted. Delete removes the registration, so try it in a disposable project first. The source also shows Console steps, example command results and an `AuthenticatedFunctionTool` variant of the Python example.
- The source's `agents.create` example is tagged `console` in the twin; the fence above is tagged `bash`. The agent card JSON capabilities example `"capabilities": {\n  }` is copied as written.
- Distance: this is Google's A2A / Agent Runtime integration, not Claude Code or OpenAI Agents.
- Source inconsistency (global host): for `ENDPOINT_LOCATION` = `global`, the Gemini Enterprise pages on app IAM policies and ADK / A2A agent registration show example commands with `https://global-discoveryengine.googleapis.com/...`, while the streamAssist page says "If your app resides in the `global` location, omit the location prefix from the hostname (`discoveryengine.googleapis.com`)." The `discoveryengine` `v1` / `v1beta` / `v1alpha` Discovery documents give the `rootUrl` `https://discoveryengine.googleapis.com/`. Both forms are kept as written. `ENDPOINT_LOCATION` (or the `LOCATION` prefix of the host) sets only the hostname; the `locations/...` segment of the resource path is a separate value.
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/register-and-manage-an-a2a-agent (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [register-and-manage-an-adk-agent.md](./register-and-manage-an-adk-agent.md)
- [import-govern-agent-registry.md](./import-govern-agent-registry.md)
- [share-custom-agents.md](./share-custom-agents.md)
- [invoke-agent-streamassist.md](./invoke-agent-streamassist.md)

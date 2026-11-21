---
source: https://docs.cloud.google.com/gemini/enterprise/docs/import-govern-agent-registry
---

# Import and govern A2A agents from Agent Registry

A Gemini Enterprise administrator can add an A2A agent from Agent Registry to a Gemini Enterprise app (formerly Agentspace) and apply access control policies to the agent traffic through Agent Gateway to enforce egress governance. Agent Registry is a centralized, queryable catalog for discovering, tracking and managing A2A agents, endpoints and MCP servers; its agents can run on Agent Runtime, Cloud Run or Google Kubernetes Engine (GKE), or be built in Google products such as Google Workspace.

## Signature / Usage

The source has no code of its own for this page (the import is a Console flow). To see which agents are registered in Agent Registry in the region that matches the app (see the region alignment table):

```bash
gcloud agent-registry agents list --location=us-central1
```

Console flow to import: Gemini Enterprise page > app > **Agents** > **+ Add agent** > **Agents from Agent Registry** > **Add** > pick the agent > **Add agent** > review > **Next** > **Skip & Finish** (public agent or runtime permission already exists) or enter provider credentials > **Finish**. Then, under **User permissions** for the agent, **Add user** and assign the **Agent User** role to a user, a group or all users.

## Options / Props

### Region alignment of app, gateway and registry

| Gemini Enterprise app location | Agent Gateway location | Agent Registry location |
|---|---|---|
| `global` | `us-central1` | `us-central1` |
| `us` | `us-central1` | `us-central1` |
| `eu` | `europe-west1` | `europe-west1` |

### Provider credentials (when permission is not already in place)

| Field | Description |
|---|---|
| Client ID | The unique identifier of the OAuth application registered with your identity provider to represent Gemini Enterprise. |
| Client secret | The confidential key associated with that OAuth application. |
| Authorization URL | The URL users use to authorize Gemini Enterprise to access the agent. The OAuth app must have the redirect URI `https://vertexaisearch.cloud.google.com/oauth-redirect`. |
| Token URL | The endpoint used to exchange the authorization code for an access token (for a Google-hosted agent, `https://oauth2.googleapis.com/token`). |
| Scopes | A space-separated list of scopes that Gemini Enterprise requests during user authorization (for example `https://www.googleapis.com/auth/cloud-platform`); they must be sufficient to let the user sign in and use the agent. |
| PKCE verification enabled | Select if Proof Key for Code Exchange is required by the agent. |
| Use HTTP Basic authentication | Send the client ID and client secret in the HTTP `Authorization` header (Basic) instead of the token request body; some OAuth providers require this. |

## Notes

- Requirements: the Gemini Enterprise Admin role; a gateway set up to route Gemini Enterprise traffic through Agent Gateway (https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-ge-deploy); the A2A agent registered in Agent Registry with a valid Agent Card that follows the A2A 0.3.0 specification and explicitly sets `protocolVersion` to `0.3.0`.
- Supported connectivity through Agent Gateway: public network routing (public internet to externally reachable A2A endpoints, through a gateway deployed with or without a connectivity template `AgentConnectivityTemplate`) and private network routing (internal VPC networks to private A2A endpoints, through a gateway deployed with an `AgentConnectivityTemplate`, a Private Service Connect interface (PSC-I) and Cloud DNS peering). In both cases the target endpoint must use TLS/HTTPS backed by a publicly or privately trusted certificate authority; endpoints with a private CA or self-signed certificate need a Certificate Manager `TrustConfig` resource configured in the connectivity template.
- Regional constraints: Agent Registry and Agent Gateway resources are project-and-region-specific. The app must bind only to an Agent Gateway in an allowed region, and that gateway must be associated with an Agent Registry in the same region (for example an app in the US region must use a gateway configured with a US-regional registry, not a global one).
- Limitations: agents can be discovered and imported only if the registry is associated with the Agent Gateway set up for the app; governance policies apply only to agents in that single registry; direct communication between Gemini Enterprise agents, or between a Gemini Enterprise agent and a Gemini Enterprise data connector (including MCP-based connectors such as the custom MCP server), does not trigger Agent Gateway policy enforcement.
- Data exposure: when end users can access an agent imported from Agent Registry, their query string (which may be rewritten from prior conversation context) and tool parameters may be sent to the agent, and to any tools or MCP servers the agent invokes, and those systems may be able to link this data with the user's identity; that data is subject to the agent provider's Terms of Service and Privacy Policy.
- Egress governance: with Agent Gateway you can apply semantic and IAM control policies to egress agent traffic, defining allow and deny rules that restrict an agent's access to specific Agent Registry entries. Create IAM agent policies (https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/assign-identity-iam) or configure semantic governance policies (https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance).
- If the A2A agent also uses Agent Identity auth manager for 3-legged OAuth, see the 3LO section of the A2A registration page.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/agent-registry/agents/list (gcloud 593.0.0 help). The A2A registration page's agent card example writes `"protocolVersion": "0.3"`, while this page requires `0.3.0`, so it is not reused here.
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/import-govern-agent-registry (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [register-and-manage-an-a2a-agent.md](./register-and-manage-an-a2a-agent.md)
- [share-custom-agents.md](./share-custom-agents.md)

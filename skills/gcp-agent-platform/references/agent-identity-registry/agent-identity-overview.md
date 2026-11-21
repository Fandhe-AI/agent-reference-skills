---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-identity-overview
---

# Agent Identity overview

Agent Identity provides a strongly attested, cryptographic identity for each agent, based on the SPIFFE standard. With it, an agent can authenticate to MCP servers, Google Cloud resources, endpoints and other agents, either on its own behalf or on behalf of an end user. It uses the agent's own credential and the Agent Identity auth manager, which creates and manages *auth providers* (the configurations used to acquire, manage and secure API keys, OAuth client IDs, OAuth client secrets and delegated end-user OAuth tokens).

Unlike service accounts, agent identities are not shared by multiple workloads by default, can't be impersonated, and don't allow developers to generate long-lived service account keys. Access tokens generated for Google Cloud are cryptographically bound to the agent's unique X.509 certificates to prevent token theft.

Agent Identity works with Agent Registry and Agent Gateway: Agent Identity provisions cryptographic identities and manages credentials, Agent Registry catalogs the tools and destinations in your environment, and Agent Gateway enforces access policies and inspects network traffic when agents call those destinations.

Services that support Agent Identity: Gemini Enterprise Agent Platform Runtime (*Agent Runtime*), Gemini Enterprise, Cloud Run and Google Kubernetes Engine.

## Signature / Usage

### Grant a role to an agent identity (Agent Runtime example)

```bash
gcloud projects add-iam-policy-binding PROJECT_NUMBER \
    --member="principal://agents.global.org-ORGANIZATION_ID.system.id.goog/resources/aiplatform/projects/PROJECT_NUMBER/locations/LOCATION/reasoningEngines/PARENT_AGENT_ENGINE_ID" \
    --role="roles/agentregistry.viewer"
```

### Identifier formats

- SPIFFE ID: `spiffe://TRUST_DOMAIN/resources/SERVICE/RESOURCE_PATH`
- Principal identifier in an IAM allow policy: `principal://TRUST_DOMAIN/resources/SERVICE/RESOURCE_PATH`
- Example SPIFFE ID: `spiffe://agents.global.org-123456789012.system.id.goog/resources/aiplatform/projects/9876543210/locations/us-central1/reasoningEngines/my-test-agent`
- Vertex AI Agent Engine (organization): `principal://agents.global.org-123456789012.system.id.goog/resources/aiplatform/projects/9876543210/locations/us-central1/reasoningEngines/my-test-agent`
- Vertex AI Agent Engine (project without an organization): `principal://agents.global.proj-9876543210.system.id.goog/resources/aiplatform/projects/9876543210/locations/us-central1/reasoningEngines/my-test-agent`
- Gemini Enterprise: `principal://agents.global.org-123456789012.system.id.goog/resources/discoveryengine/projects/9876543210/locations/global/collections/default_collection/engines/my-test-agent`

### Default CA certificate endpoints

- All regions: `https://www.gstatic.com/gcp_default_ca_certs/default_ca_certs.pem`
- Per region: `https://www.gstatic.com/gcp_default_ca_certs/REGION/public_cert.pem` for a supported region (for example `us-east1`)

## Options / Props

### Authentication models

| Authority | Authentication method | Target resource | Use case and solution |
|---|---|---|---|
| **User-delegated authority** | OAuth 2.0 (3-legged) | External tools and services | When an agent acts on behalf of a specific user (for example, to access a user's Jira tasks or GitHub repositories). You configure a 3-legged OAuth auth provider in Agent Identity auth manager to manage user consent and tokens. |
| **Agent's own authority** | Cloud-based identity (Agent Identity) | Google Cloud services | When an agent hosted on Google Cloud needs to access other Google Cloud services using its own identity. |
| **Agent's own authority** | Cloud-based identity (OIDC ID tokens) | External tools and services | When an agent hosted on Google Cloud needs to authenticate to external backends, custom APIs, or third-party cloud platforms using its own identity and OpenID Connect (OIDC) identity federation. |
| **Agent's own authority** | OAuth 2.0 (2-legged) | External tools and services | Recommended for machine-to-machine authentication with external services that support OAuth. You configure a 2-legged OAuth auth provider in Agent Identity auth manager to handle client credentials and access tokens. |
| **Agent's own authority** | API key | External tools and services | For external services that require a cryptographic key or password for authentication. You configure an API key auth provider in Agent Identity auth manager to help securely store and manage the keys. |
| **Agent's own authority** | HTTP basic auth | External tools and services | Uses plaintext passwords. This method is **not recommended**. You can store passwords similar to an API key. |

### Identifier parts

| Name | Description |
|---|---|
| `TRUST_DOMAIN` | Projects in an organization: `agents.global.org-ORGANIZATION_ID.system.id.goog`. Projects without an organization: `agents.global.proj-PROJECT_NUMBER.system.id.goog`. |
| `SERVICE` | The short name of the Google Cloud service (for example, `aiplatform` or `discoveryengine`). |
| `RESOURCE_PATH` | The full path to the resource that hosts the agent. |

## Notes

- Agent identity lifecycle: deleting an agent doesn't remove the IAM bindings that reference its principal; they stay as inactive grants and you must remove them manually when decommissioning. The identity derives from the hosting resource ID (such as the `reasoningEngines` resource ID), so a replacement agent, even with the same display name and code, gets a new principal and needs new grants.
- Credentials: X.509 certificates, Google Cloud access tokens and OIDC ID tokens are supported. The X.509 certificate is auto-provisioned and managed on the agent, chains up to a Google-managed root CA, and is valid for 24 hours (Google Cloud keeps it current automatically). By default agents use mTLS with X.509 certificates for direct calls to Google Cloud APIs; across Agent Gateway they also use Demonstrating Proof of Possession (DPoP), creating double-bound credentials (mTLS for first-party access to the gateway, DPoP beyond it).
- Auth manager: a centralized credentials vault and authentication broker for outbound tool authentication. Access is governed by IAM, the agent authenticates to it with its own SPIFFE ID, and all end-user access events are attributable to that ID. It automates OAuth credential acquisition (user sign-in and consent dialog) and allows revocation.
- Security and governance: integrates with IAM allow and deny policies, Principal Access Boundary (PAB, evaluated on outbound calls; an agent subject to PAB can only reach the resources named in those policies), VPC Service Controls and audit logging. A Google-managed Context-Aware Access policy enforces mTLS and DPoP token binding by default so certificate-bound tokens can't be replayed outside their runtime. `agentidentity.googleapis.com` and `agentidentitycredentials.googleapis.com` can be added to a service perimeter; clients must then route requests through the Restricted VIP (`restricted.googleapis.com`). Agent identities can be used as principals in VPC Service Controls ingress and egress rules.
- How it works: on deployment Google Cloud assigns a unique SPIFFE identity and X.509 certificate; to reach Google Cloud services the agent requests a bound access token, to reach external tools it requests an OIDC ID token or retrieves stored credentials (API keys, OAuth tokens) from an auth provider through the auth manager.
- Limitation: you cannot grant agent identities Cloud Storage legacy bucket roles (for example, `storage.legacyBucketReader`).
- Cross-cloud Kubernetes workloads (Amazon EKS, AKS, Red Hat OpenShift) can use Agent Gateway for cross-cloud (Limited Preview) with Workload Identity Federation: pods project Kubernetes Service Account OIDC tokens and exchange them for Google Cloud Agent Identity tokens.
- The Vertex AI Agent Engine names in the examples are the former name of Agent Runtime.
- The Agent Identity API REST reference is in `gcp-foundation`.
- Snippet taken from https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-identity-overview (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [identity-delegation-architecture.md](./identity-delegation-architecture.md)
- [agent-identity.md](./agent-identity.md)
- [overview.md](./overview.md)

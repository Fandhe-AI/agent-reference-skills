---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/identity-delegation-architecture
---

# Identity delegation architecture

To enforce trust boundaries across human users, autonomous workloads and external tools without relying on service account impersonation, Agent Identity uses a three-identity delegation framework: user identity, agent identity and delegated identity. The user identity establishes caller context during ingress, the agent identity authenticates the workload within the runtime boundary, and the delegated identity combines both authorities when the agent accesses downstream services on behalf of the user.

## Signature / Usage

### The three identity contexts

- **User identity:** The initiating end user's identity, authenticated through standard OAuth 2.0 or OpenID Connect (OIDC) with Google Identity or a federated workforce identity provider (IdP).
- **Agent identity:** The deployed agent's unique, cryptographically attested SPIFFE identity and auto-provisioned X.509 certificate, representing the agent acting on its own authority.
- **Delegated identity:** The combined authority context when the agent acts on behalf of the initiating human user using scoped 3-legged OAuth (3LO) credentials brokered by Agent Identity auth manager.

### How identities propagate across trust boundaries

1. **Client-to-Agent ingress boundary (user identity):** The human user authenticates to the client application using an OAuth 2.0 or OIDC token. When traffic enters through Agent Gateway (in `CLIENT_TO_AGENT` ingress mode), the gateway authenticates the incoming user credentials and inspects prompts (only when a `CONTENT_AUTHZ` authorization policy is attached to the gateway; without one, inbound requests pass through uninspected, and the policy blocks only in enforcement mode, not audit (dry-run) mode); the user context is forwarded to the runtime. Which setting authorizes each user to invoke the target agent is not confirmed (see below).
2. **Agent runtime and credential brokering (agent identity):** Inside the isolated runtime environment, the agent operates under its own SPIFFE agent identity with an auto-rotated 24-hour X.509 certificate. When the agent needs credentials for downstream tools, it authenticates to Agent Identity auth manager using its agent identity.
3. **Autonomous egress path (agent identity):** When the agent calls Google Cloud APIs or machine-to-machine endpoints on its own authority, it authenticates using certificate-bound tokens enforced by mutual TLS (mTLS) and Demonstrating Proof of Possession (DPoP), OIDC ID tokens, or 2-legged OAuth (2LO) credentials from the auth manager. IAM allow and deny policies, Principal Access Boundary (PAB) policies, and Context-Aware Access policies evaluate the request strictly against the agent identity.
4. **User-delegated egress path (delegated identity):** When the agent calls user-scoped Model Context Protocol (MCP) servers or third-party APIs on behalf of the human user, the auth manager brokers a consented 3LO user token representing the delegated identity. Outbound calls are governed by both the agent's egress policies and the delegating user's permissions and consented OAuth scopes, and audit logs record both the agent identity and the user identity.

Per-user invocation authorization on the `CLIENT_TO_AGENT` path: which component and which setting provide it is not confirmed in the official docs. Confirmed: in Client-to-Agent mode the gateway "acts as a frontend policy enforcement point, authenticating incoming user credentials and inspecting prompts" (Agent Gateway overview); Client-to-Agent gateways "don't adopt a default-deny policy", and a `CONTENT_AUTHZ` authorization policy, such as Model Armor or a semantic governance policy, "is optional, and inbound requests pass through if no authorization policy is attached" (set-up-agent-gateway.md in the agent-gateway-governance category). Creating the gateway or attaching a content policy does not by itself authorize each user; confirm separately how your deployment authorizes callers.

### Example: IAM deny policy applied to agent identities

The YAML below is the content of one deny rule, not a complete policy: in an IAM v2 deny policy, `deniedPrincipals` and `deniedPermissions` are fields of `rules[].denyRule` (Discovery `iam.v2`: `GoogleIamV2Policy.rules` is a list of `GoogleIamV2PolicyRule`, whose `denyRule` field is a `GoogleIamV2DenyRule` with `deniedPrincipals` and `deniedPermissions`), as the full deny policy JSON on the agent identity page also shows (`rules` → `denyRule` → `deniedPrincipals` / `deniedPermissions`). Put these two fields under `rules[].denyRule` in a policy file (JSON or YAML) and create the policy on an attachment point with `gcloud iam policies create POLICY_ID --attachment-point=ATTACHMENT_POINT --kind=denypolicies --policy-file=POLICY_FILE` (gcloud 593.0.0 help; its example attachment point is `cloudresourcemanager.googleapis.com/projects/123`). The attachment point is the full resource name of the resource the policy is attached to; for organizations and folders, use the numeric ID in the full resource name (Discovery `iam.v2`, `policies.createPolicy` `parent`).

```yaml
deniedPrincipals:
  - principalSet://agents.global.org-ORGANIZATION_ID.system.id.goog/*
deniedPermissions:
  - aiplatform.googleapis.com/reasoningEngines.create
  - aiplatform.googleapis.com/reasoningEngines.delete
  - aiplatform.googleapis.com/reasoningEngines.update
```

## Options / Props

### Identity layer comparison

| Identity layer | Principal and credential type | Trust boundary and policy enforcement | Audit log attribution |
|---|---|---|---|
| **User identity** | Initiating end user (Google Account or workforce identity principal) authenticated with an OAuth 2.0 or OIDC token. | **Client-to-Agent (ingress):** Agent Gateway authenticates incoming user credentials and inspects prompts (only when a `CONTENT_AUTHZ` authorization policy is attached to the gateway; without one, inbound requests pass through uninspected, and the policy blocks only in enforcement mode, not audit (dry-run) mode); per-user invocation authorization is not confirmed (see Signature / Usage). | Logs the human user identity as the caller invoking the agent endpoint. |
| **Agent identity** | Autonomous agent workload (agent identity principal) authenticated with a SPIFFE X.509 certificate (mTLS and DPoP), OIDC ID token, or 2LO credential or API key from the auth manager. | **Agent-to-Anywhere (egress):** IAM allow, deny, Principal Access Boundary, and Context-Aware Access policies enforce which Google Cloud resources, auth providers, and external endpoints the agent can reach on its own authority. | Logs the agent's unique SPIFFE principal as the acting identity. |
| **Delegated identity** | Agent identity acting on behalf of the consenting human user (Google Account or workforce identity principal) using a scoped 3LO access token brokered by Agent Identity auth manager. | **Agent-to-Anywhere (egress):** Enforces least-privilege intersection---the call must satisfy both the agent's outbound governance policies and the delegating user's permissions and consented OAuth scopes. | Records dual attribution, capturing both the agent's SPIFFE identity and the delegating human user. |

## Notes

- The source includes an architecture diagram (not reproduced) mapping the three identities across ingress, runtime and egress trust boundaries.
- Adapted from the official docs: step 1 said "When traffic enters through Agent Gateway (in `CLIENT_TO_AGENT` ingress mode), the authorization policies attached to Agent Gateway verify the user identity to confirm that the user is authorized to invoke the target agent and forward the verified user context to the runtime.", and the User identity row said "Agent Gateway authorization policies verify whether the user can invoke the agent and initiate a session." Both are rewritten to what the other gateway pages confirm: https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview (Modes) and https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway (Configure access control policies).
- Snippet taken from https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity
- The delegation page itself has no code; the deny policy YAML comes from the agent identity page. It denies every agent identity in the organization the listed permissions; adapt the scope before use and try it in a disposable project first. It is the source's fragment as written: only the `denyRule` fields, without the enclosing `rules` list (see the sentence before it).
- The Agent Identity API REST reference is in `gcp-foundation`.
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/identity-delegation-architecture (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [agent-identity-overview.md](./agent-identity-overview.md)
- [agent-identity.md](./agent-identity.md)

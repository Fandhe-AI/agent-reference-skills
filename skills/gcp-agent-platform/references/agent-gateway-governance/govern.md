---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern
---

# Agent Platform governance overview

Governance in Gemini Enterprise Agent Platform ("Agent Platform") is the framework for discovering, securing and auditing AI agents and their infrastructure at scale, both in Google Cloud and on Kubernetes clusters outside Google Cloud (via Agent Gateway for cross-cloud, Limited Preview). It combines Agent Identity, Agent Registry, policies, Agent Gateway and agent observability.

## Signature / Usage

### Recommended order of configuration

1. Provision Agent Identities (workload identities, SPIFFE IDs) for your agents.
2. Register destinations (tools, MCP servers, endpoints, agents) in Agent Registry.
3. Configure IAM policies that grant agent identities access to essential platform APIs and registered destinations.
4. Configure Model Armor templates (prompt injections, jailbreaks, sensitive data leaks).
5. Configure Semantic governance policies (natural language constraints on tool usage).
6. Deploy Agent Gateway and monitor traffic. If any control runs in audit mode, query Cloud Logging for a consolidated "would have been blocked" report before switching to active enforcement.

### Audit-mode (dry-run) switches

For the IAM step, select **Audit-only** in the Google Cloud console or set `iamEnforcementMode: "DRY_RUN"` in the authorization extension `metadata` block. Snippet taken from https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway (authorization extension with the dry-run field):

```bash
cat >iap-request-authz-extension.yaml <<EOF
name: AUTHORIZATION_EXTENSION_NAME
service: iap.googleapis.com
failOpen: false
timeout: 1s
metadata:
  iapPolicyVersion: "V2"
  iamEnforcementMode: "DRY_RUN"
EOF
```

## Notes

- Core governance components:
  - Agent Identity (Who made the request?): Assigns a unique, secure ID (a SPIFFE ID) to each agent, used for authentication, access control and auditing. Secured by default with Context-Aware Access (mTLS and DPoP).
  - Agent Registry (What destinations are approved?): Central directory of approved agents, tools, MCP servers and endpoints (such as essential Google Cloud APIs). Agent Gateway uses it to check permissions before allowing connections.
  - Policies (What actions are permitted?): Control which agents can reach specific resources and what content may pass through.
  - Agent Gateway (Where are policies enforced?): Main entry and exit point for client-to-agent and agent-to-anywhere network traffic; applies security and governance policies.
  - Agent observability (What happened?): Agent Gateway exports network-layer telemetry for all agent interactions to Agent Observability.
- Policy types:
  - IAM Unified Access Policies: Access rules that link an agent's identity to approved tools and endpoints in Agent Registry. By default all connections are blocked unless an explicit IAM policy grants access.
  - Model Armor: Content security filters attached to gateways. Scans user prompts and tool responses in real time (prompt injection, sensitive data leaks, harmful content).
  - Semantic governance policies: Plain-language rules that control how agents use tools, enforced at runtime (for example, preventing unsafe combinations of tools).
  - Token management policies: Monitor and attribute LLM token usage and enforce shared token budgets across agents and applications.
  - Custom authorization engines: Custom authorization extensions that delegate authorization decisions to third-party systems by using Service Extensions.
- Audit-mode metadata fields:
  - IAM (IAP): audit (dry-run): `iamEnforcementMode: "DRY_RUN"` in the authorization extension `metadata` block, or **Audit-only** in the console; enforcement: Select **Enforce policies** in the console (writes `iamEnforcementMode: "ENFORCED"` when creating a gateway, or removes `iamEnforcementMode` when updating an existing gateway), or remove `iamEnforcementMode`
  - Model Armor: audit (dry-run): `enforcement_type: "INSPECT_ONLY"`; enforcement: `enforcement_type: "INSPECT_AND_BLOCK"`
  - Semantic governance: audit (dry-run): `sgpEnforcementMode: "DRY_RUN"`; enforcement: Remove `sgpEnforcementMode` (or set it to `"ENFORCE"`)
- All policy types are enforced internally through authorization policies or extension bindings managed through Service Extensions.
- Support for token management policies and extension bindings is "coming soon"; features and timing are subject to change (early-access sign-up is offered by the source).
- Agent Gateway for cross-cloud (Kubernetes clusters outside Google Cloud) is Limited Preview.
- The source page also links to Agent Registry, Agent Identity, sharing an agent, safety, agent relationship topology, cross-cloud setup, Agent Runtime routing, delegating authorization, monitoring, troubleshooting, Model Armor configuration and several codelabs and a whitepaper; those pages are not part of this category page.
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway (retrieved 2026-11-21)

## Related

- [agent-gateway-overview.md](./agent-gateway-overview.md)
- [set-up-agent-gateway.md](./set-up-agent-gateway.md)
- [iam-overview-uap.md](./iam-overview-uap.md)
- [semantic-governance-overview.md](./semantic-governance-overview.md)
